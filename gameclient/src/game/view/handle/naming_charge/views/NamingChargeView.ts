import { TimeCtlV2 } from "../../../../../frame/util/ctl/TimeCtlV2";
import { StringUtil } from "../../../../../frame/util/StringUtil";
import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { IProgressCtlSkin, ProgressCtl } from "../../../../../frame/view/ProgressCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { GetNamingReward_req, NamingChargeRank_req, stJjcPlayer, stNamingRank, stPeakJjcAvatar } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { DotManager } from "../../common/DotManager";
import { JjcOtherItemView } from "../../jjc/views/JjcOtherItemView";
import { LiBaoModel } from "../../libao/model/LiBaoModel";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { PeakShowAvatarCtl } from "../../peakjjc/PeakJjcView";
import { ENameDayType, ENameReward, NamingChargeModel } from "../NamingChargeModel";
import { NamingEvent } from "../NamingEvent";
enum EBtnType{
    Left = 0,
    Right = 1
}
interface IPlayerAccountId{
    accountId:number;
}
export class NamingChargeView extends ViewBase{
    private _avatarShowList:PeakShowAvatarCtl[] = [];
    private curType:ENameDayType;
    protected autoFree = true;
    protected mMask:boolean = true;
    private _ui:ui.views.naming_charge.ui_jianghuyoumingUI;
    private leftbtnCtl:ButtonCtl;
    private rightbtnCtl:ButtonCtl;
    private slot_clickCtl:ButtonCtl;
    private model:NamingChargeModel;
    private cfg: Configs.t_NamingRight_dat;
    private _progressCtl:ProgressCtl;
    private _timeCtl:TimeCtlV2;
    private sp1_lingqu_btnCtl:ButtonCtl;

    protected onAddLoadRes(): void {
        // throw new Error("Method not implemented.");
        this.addAtlas("jjc.atlas")
    }
    protected onExit(): void {
        // throw new Error("Method not implemented.");
        this.slot_clickCtl.dispose();
        this.rightbtnCtl.dispose();
        this.leftbtnCtl.dispose();
        this._progressCtl.dispose();
        this._timeCtl.dispose();
        for(let i = 0;i < this._avatarShowList.length;i++){
            this._avatarShowList[i].dispose();
        }
        this.model.off(NamingEvent.RankUpdate,this,this.onRankUpdate);
        this.sp1_lingqu_btnCtl.dispose();
        this.model.off(NamingEvent.RewardUpdate,this,this.onUpdateView);
        this.curType = ENameDayType.Null;
    }
    protected onFirstInit(): void {
        // throw new Error("Method not implemented.");
        if(!this.UI){
            this.model = NamingChargeModel.Ins;
            this.UI = this._ui = new ui.views.naming_charge.ui_jianghuyoumingUI();
            
            let progressSkin:IProgressCtlSkin = {} as IProgressCtlSkin;
            progressSkin.bg = this._ui.expv;
            this._progressCtl = new ProgressCtl(progressSkin);

            this._timeCtl = new TimeCtlV2(this._ui.timetf);

            this.leftbtnCtl = ButtonCtl.CreateBtn(this._ui.leftbtn,this,this.onLeftBtnClick,true,[EBtnType.Left]);
            this.rightbtnCtl = ButtonCtl.CreateBtn(this._ui.rightbtn,this,this.onLeftBtnClick,true,[EBtnType.Right]);
            this.slot_clickCtl = ButtonCtl.CreateBtn(this._ui.slot_click_rect, this, this.onSlotClick,false);
            this._ui.slot_click_rect.on(Laya.Event.CLICK,this,this.onSlotClick);
            this.bindClose(this._ui.close1);

            this._avatarShowList = [];
            for(let i = 0;i < 3;i++){
                let cell = new PeakShowAvatarCtl();
                cell.skin = this._ui[`avatar${i}`];
                this._avatarShowList.push(cell);
            }
            this.initAvatarShow();
            this.sp1_lingqu_btnCtl = ButtonCtl.CreateBtn(this._ui.sp1_lingqu_btn,this,this.onLingQuClickHander)
        
            //排行榜列表
            this._ui.list1.itemRender = JjcOtherItemView;
            this._ui.list1.vScrollBarSkin = " ";
            this._ui.list1.renderHandler = new Laya.Handler(this,this.JjcOtherItemHandler);
            this._ui.list1.array = [];

        }
    }



    private JjcOtherItemHandler(item:JjcOtherItemView,index:number) {
        item.setData(item.dataSource,false);
    }

    /** 领取*/
    private onLingQuClickHander(){
        let req = new GetNamingReward_req();
        req.flag = this.curType;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onSlotClick(){
        if(this.model.isCanGet(this.cfg.f_id)){
            this.onLingQuClickHander();
        }else{
            E.ViewMgr.Open(EViewType.NamingChargeReward,null,this.cfg);
        }
    }

    private initAvatarShow(){
        for(let i = 0;i < this._avatarShowList.length;i++){
            this._avatarShowList[i].skin.visible = false;
            this._ui["empty_img"+i].visible = false;
        }
    }

    private onUpdateView(){
        // this.onLeftBtnClick(this.curType - 1);
        this.updateCurView(this.curType)
    }

    /**按钮点击 */
    private onLeftBtnClick(type:EBtnType){
        let curType:ENameDayType = type + 1;
        if(curType == this.curType){
            return;
        }
        this.updateCurView(curType)  
    }
    private updateCurView(curType:ENameDayType){
        DotManager.removeDot(this._ui.leftbtn);
        DotManager.removeDot(this._ui.rightbtn);
        if(curType == ENameDayType.Region && !this.model.isRegionOpen){
            E.ViewMgr.ShowMidError(E.getLang("naming_charge_07"));
            return;
        }

        this.curType = curType;
        let cfg = this.model.proxyCfg.getByType(curType);
        this.cfg = cfg;
        this._ui.top_con_ttitle_tf.text = "";
        this.initAvatarShow();
        let subtime:number;
        switch(curType){
            case ENameDayType.FirstDay:
                //首日
                this._ui.sp0.visible = false;
                this.rightbtnCtl.bgSkin = `remote/main/main/anniu_2.png`;
                this.leftbtnCtl.bgSkin = `remote/main/main/anniu_1.png`;
                ItemViewFactory.renderItemSlots(this._ui.sp1_reward_con,this.cfg.f_Reward,10,1,"center",undefined,undefined,4);
                this._ui.sp1_tip1.text = E.getLang("naming_charge_03",StringUtil.moneyCv(this.cfg.f_RechargeLimit));
                
                if(this.model.isCanGet(this.cfg.f_id)){
                    this.sp1_lingqu_btnCtl.grayMouseDisable = false;
                }else{
                    this.sp1_lingqu_btnCtl.grayMouseDisable = true;
                }
                let v:number = this.model.firstDayCNY / this.cfg.f_RechargeLimit;
                if(v > 1){
                    v = 1;
                }
                this._ui.sp1_exp_bg.width = v * (this._ui.sp1_exp.width - 3);
                this._ui.sp1_exp_tf1.text = StringUtil.moneyCv(this.model.firstDayCNY) + "/" + StringUtil.moneyCv(this.cfg.f_RechargeLimit);
                subtime = this.model.initData.firstDayEndUnix - TimeUtil.serverTime;
                break;
            //==============================================================================
            case ENameDayType.Region:
                //区服
                this._ui.sp0.visible = true;

                this.leftbtnCtl.bgSkin = `remote/main/main/anniu_2.png`;
                this.rightbtnCtl.bgSkin = `remote/main/main/anniu_1.png`;
                let itemVo = ItemViewFactory.convertItem(cfg.f_Reward.split("|")[0]);
                ItemViewFactory.refreshSlot(this._ui.slot1,itemVo,false);
                if(this.model.isCanGet(this.cfg.f_id)){
                    DotManager.addDot(this._ui.slot1);
                }else{
                    DotManager.removeDot(this._ui.slot1);
                }
                this._ui.tips_tf.text = E.getLang("naming_charge_03",StringUtil.moneyCv(this.cfg.f_RechargeLimit));
                this._ui.item_name_tf.text = this.cfg.f_RewardName;
                let val = LiBaoModel.Ins.PlayerTotalCnt;
                this._progressCtl.value = val / this.cfg.f_RechargeLimit;
                this._ui.expTf.text = StringUtil.moneyCv(val) + "/" + StringUtil.moneyCv(this.cfg.f_RechargeLimit);

                subtime = this.model.initData.namedEndUnix - TimeUtil.serverTime;

                break;
        }
        this._ui.tf2.text = E.getLang("naming_charge_04");
        this._timeCtl.once(Laya.Event.COMPLETE, this, this.onTimeComplete);
        this._timeCtl.start(subtime);

        //请求排行榜
        let req = new NamingChargeRank_req();
        req.flag = this.curType;
        SocketMgr.Ins.SendMessageBin(req);

        this._ui.sp1.visible = ! this._ui.sp0.visible;

        //////////////////////////////////////////////////////////////
        if(this.model.getStatus(ENameDayType.FirstDay) == ENameReward.CanGet){
            DotManager.addDot(this._ui.leftbtn);
        }
        if(this.model.getStatus(ENameDayType.Region) == ENameReward.CanGet){
            DotManager.addDot(this._ui.rightbtn);
        }
    }



    private onTimeComplete(){
        this._ui.timetf.text = "";
        this._ui.tf2.text = "";
    }
    protected onInit(): void {
        // throw new Error("Method not implemented.");
        this.model.on(NamingEvent.RankUpdate,this,this.onRankUpdate);
        this.model.on(NamingEvent.RewardUpdate,this,this.onUpdateView);

        this.onLeftBtnClick(EBtnType.Left);
    }
    private convertToPlayerVo(vo:stNamingRank):stJjcPlayer{
        let _playerVo = new stJjcPlayer();
        _playerVo.id = 0;
        _playerVo.headUrl = vo.headUrl;
        _playerVo.name = vo.nickName;
        _playerVo.lv = vo.playerLevel;
        _playerVo.plus = vo.plus;
        _playerVo.rank = vo.ranking;
        _playerVo.accountId = vo.accountId;
        _playerVo.titleId = vo.titleId;
        return _playerVo;
    }
    /**排行榜数据 */
    private onRankUpdate(){
        let datalist:stPeakJjcAvatar[] = [];
        let playerList:IPlayerAccountId[] = [];

        this._ui.shouweidacheng_img.visible = false;
        let heroCount:number = 1;
        switch(this.cfg.f_Type){
            case ENameDayType.FirstDay:
                // datalist = this.model.firstDayData.dataList;
                datalist = this.model.firstDayData.top1;
                playerList = this.model.firstDayData.dataList;
                if(datalist.length > 0){
                    this._ui.shouweidacheng_img.visible = true;
                }else{
                    let money = StringUtil.moneyCv(this.cfg.f_RechargeLimit);
                    this._ui.top_con_ttitle_tf.text = E.getLang("naming_charge_06",money);
                }
                break;
            case ENameDayType.Region:
                heroCount = 3;
                datalist = this.model.rankData.top3;
                playerList = this.model.rankData.dataList;
                let showList:stJjcPlayer[] = [];
                for(let i = heroCount;i < this.model.rankData.dataList.length;i++){
                    let vo = this.model.rankData.dataList[i];
                    showList.push(this.convertToPlayerVo(vo));
                }
                this._ui.list1.array = showList;
                break;
        }
        ///////////////////////////////////////////////////////////////
        for(let i = 0;i < heroCount;i++){
            let vo = datalist[i];
            let _ctl = this._avatarShowList[i];
            _ctl.refresh(vo);
            let _accountVo:IPlayerAccountId = playerList[i];

            let empty_img:Laya.Image = this._ui["empty_img"+i];
            if(_accountVo){
                empty_img.visible = false;
                _ctl.accountId = _accountVo.accountId;
            }else{
                empty_img.visible = true;
            }
        }  
    }

}