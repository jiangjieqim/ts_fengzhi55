import { ETimeShowStyle, TimeCtlV2 } from "../../../../../frame/util/ctl/TimeCtlV2";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EPageType } from "../../../../common/defines/EnumDefine";
import { BlessingMaxLevelRewards_revc, Reward_revc, stCellValue, stSpirit, UseItem_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { LingChongRH_Model } from "../../lingchong/ctl/LingChongViewCtl2";
import { TriangleHideCtl } from "../ctl/TriangleHideCtl";
import { ERewardType } from "../vos/ECellType";
import { ERewardShowVoType, RewardCtl, RewardFactory, RewardShowVo } from "./RewardCtl";


// export class TriangeRewardCtl extends TriangleHideCtl{
//     public oneRow:number = 5;
//     public onChangeEvt() {
//         let gap = this._list.spaceY;
//         let h: number = this.cellSize * Math.ceil(this._list.array.length / this.oneRow)- gap;
//         if (h - this._list.scrollBar.value <= this._list.height) {
//             this._img.visible = false;
//         } else {
//             this._img.visible = true;
//         }
//     }
// }

export class RewardGetData{
    type:ERewardShowVoType;
    dataList;
}
/**需要使用的物品 */
export class RewardUseItem{
    itemList:stCellValue[];
}
export class RewardGetView extends ViewBase {
    protected autoFree = true;
    private readonly rowCount:number = 5;
    private tri:TriangleHideCtl;
    private _ui: ui.views.main.ui_reward_getUI;
    private _rewardCtl: RewardCtl;
    private _timeCtl:TimeCtlV2;
    private useBtnCtl:ButtonCtl;
    public PageType: EPageType = EPageType.None;
    private _curData;
    protected onExit() {
        this._timeCtl.stop();

        
    }
    public cacheList:any[] = [];
    protected onFirstInit() {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.main.ui_reward_getUI();
            this._ui.diban.on(Laya.Event.CLICK, this, this.onSkipHandler);
            this._rewardCtl = new RewardCtl(this._ui.list1);

            let tri = new TriangleHideCtl();
            tri.oneRow = this.rowCount;
            tri.bind(this._ui.list1,this._ui.sanjiao);
            this.tri = tri;
            this._timeCtl = new TimeCtlV2(this._ui.timetf1,"{0}秒后自动关闭");
            this._timeCtl.style = ETimeShowStyle.Second;
            this.useBtnCtl = ButtonCtl.CreateBtn(this._ui.useBtn,this,this.onUseHandler);
            this.useBtnCtl.visible = false;
            this._ui.skinTf.visible = false;
            // DebugUtil.draw(this._ui);
        }
    }
    private onUseHandler(){
        this.onSkipHandler();
    }
    private onSkipHandler() {
        if(this._curData instanceof RewardUseItem){
            let req = new UseItem_req();
            req.itemlist = this._curData.itemList;
            req.type = 0;
            SocketMgr.Ins.SendMessageBin(req);
        }
        if(this.cacheList.length > 0){
            let o = this.cacheList.shift();
            this.setData(o);
        }else{
            this.Close();
        }
    }
    protected SetCenter(){
        super.SetCenter();
        let pos = (this._ui.parent as Laya.Sprite).localToGlobal(new Laya.Point(this._ui.x,this._ui.y));
        // console.log("pos:"+pos);
        this._ui.hitArea = new Laya.Rectangle(-pos.x + this._ui.width / 2,-pos.y+this._ui.height / 2,Laya.stage.width,Laya.stage.height);
        this._ui.diban.hitArea = this._ui.hitArea;
        // this._ui.diban.height = Laya.stage.height;
        this._ui.bg1.height = Laya.stage.height;
        DebugUtil.draw(this._ui.diban,"#00ff00");
        DebugUtil.draw(this._ui,"#ff0000",Laya.stage.width + this._ui.width / 2,Laya.stage.height + this._ui.height / 2,-pos.x,-pos.y);
    }
    protected onAddLoadRes() {
        this.addAtlas("main/getreward.atlas");
    }

    private startTicket(){
        this._timeCtl.once(Laya.Event.COMPLETE,this,this.onSkipHandler);
        this._timeCtl.start(5);
    }

    public setData(_data){
        let _curData: Reward_revc|BlessingMaxLevelRewards_revc|RewardGetData|RewardUseItem  = _data
        // this.Data;
        // let rewardList:stCellValue[] = _curData.rewardList;
        // ItemViewFactory.renderItemSlots(this._ui.rewardContainer,rewardList);
        this.useBtnCtl.visible = false;
        this._ui.skinTf.visible = false;

        if(!_curData){
            return;
        }
        this._curData = _curData;
        this._timeCtl.stop();

        let _datalist:RewardShowVo[];
        if(_curData instanceof Reward_revc){
            this._ui.skinTf.visible = true;

            _datalist = RewardFactory.createBy_Reward_revc(_curData);

            let _cellReward: Reward_revc = _curData;
            if (_cellReward.type == ERewardType.Ticket) {
                this.startTicket();
            }
            // else if (_cellReward.type == ERewardType.PetFusion) {
            //     let rh: LingChongRH_Model = LingChongRH_Model.Ins;
            //     if (rh.isAuto) {
            //         Laya.timer.once(rh.DEALY_TIME, this, this.Close);
            //     }
            // }

        }else if(_curData instanceof BlessingMaxLevelRewards_revc){
            // let s:BlessingMaxLevelRewards_revc = _curData; 
            this._ui.skinTf.visible = true;

            _datalist = [];
            for(let i = 0;i < _curData.rewards.length;i++){
                let _vo = new RewardShowVo();
                _vo.data = {data:_curData.rewards[i],itemId:_curData.id,level:_curData.level};
                _vo.type = ERewardShowVoType.FuYuan;
                _datalist.push(_vo);
            }
        }
        else if(_curData instanceof RewardGetData){

            _datalist = [];
            let type = _curData.type;
            let l:stSpirit[] = _curData.dataList;
            for(let i = 0;i < l.length;i++){
                let cell = l[i];
                let _vo = new RewardShowVo();
                _vo.data = cell;
                _vo.type = type;
                _datalist.push(_vo);
            }
        }
        else if(_curData instanceof RewardUseItem){
            _datalist = [];
            let l:stCellValue[] = _curData.itemList;
            for(let i = 0;i < l.length;i++){
                let cell = l[i];
                let _vo = new RewardShowVo();
                _vo.data = cell;
                _vo.type = ERewardShowVoType.UseItem;
                _datalist.push(_vo);
            }
            this.useBtnCtl.visible = true;
        }
        this._rewardCtl.setData(_datalist,this.rowCount);
        this.tri.onChangeEvt();
    }

    protected onInit() {
        this.setData(this.Data);
    }
}