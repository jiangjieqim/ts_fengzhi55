import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E, G } from "../../../../G";
import { AvatarFactory } from "../../avatar/AvatarFactory";
import { AvatarView } from "../../avatar/AvatarView";
import { DotManager } from "../../common/DotManager";
import { ActivityModel } from "../../huodong/ActivityModel";
import { ActivityEvent } from "../../huodong/model/ActivityEvent";
import { EPopWinID } from "../../huodong/model/EActivityType";
import { EFuncDef } from "../../main/model/EFuncDef";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { TaskModel } from "../../main/model/TaskModel";
import { ChestProgressCtl } from "../../main/views/ChestProgressView";
import { EClientType } from "../../sdk/ClientType";
import { XianShiLiBaoModel, XianShiLiBaoType } from "../../xianshilibao/model/XianShiLiBaoModel";
import { ZuoQiLvResult, ZuoQiQuaResult } from "../vos/EZuoQi";
import { IconUtils } from "../vos/IconUtils";
import { ZuoQiEvent } from "../vos/ZuoQiEvent";
import { MountConfigProxy, Mount_ListProxy } from "../vos/ZuoqiProxy";
import { ZuoqiVo } from "../vos/ZuoqiVo";
import { ZuoQiModel } from "../ZuoqiModel";
import { ZuoQiAttrCtl } from "./ZuoQiAttrCtl";

export class ZuoQiMainView extends ViewBase{
    protected autoFree:boolean = true;
    protected mMainSnapshot = true;

    private _ui:ui.views.zuoqi.ui_zuoqi_mainUI;
    private model:ZuoQiModel;
    // private slotView:ZuoQiSlotView;
    private _progressCtl:ChestProgressCtl;
    private _attrZuoqi:ZuoQiAttrCtl;
    // private _lvResult:ZuoQiLvResult;
    private yunshubtnCtl:ButtonCtl;
    private zuoqichouBtnCtl:ButtonCtl;
    // private mDrawcallTest:boolean = true;
    private mountId:number;
    private avatar:AvatarView;
    private backHomeCtl:ButtonCtl;
    private washAttrBtnCtl:ButtonCtl;
    private zuoSkinCtl:ZuoqiMainCtl;

    // 弹出礼包uid
    private packUid: number = 16;

    private get zuoqiData():ZuoqiVo{
        return this.Data;
    }

    private get zuoqiId(){
        return this.zuoqiData.rideId;
    }
    protected mMask:boolean = true;

    protected onAddLoadRes(): void{
        this.addAtlas("zuoqi.atlas");
        this.addAtlas('huodong.atlas');
    }
    protected onExit(): void{
        // if(this.mDrawcallTest) E.ViewMgr.Open(EViewType.Main);
        MainModel.Ins.off(MainEvent.ValChange,this,this.onValChangeEvt);
        this.model.off(ZuoQiEvent.UpdateInfoEvt,this,this.onValChangeEvt);
        this.model.off(ZuoQiEvent.RedUpdate,this,this.onRedUpdate);
        ActivityModel.Ins.off(ActivityEvent.PopWinUpdate,this,ActivityModel.Ins.onPop);
        this.avatar.dispose();
        this.avatar = null;
        this.mountId = 0;
    }
    protected onFirstInit(): void{
        if(!this.UI){
            this.model = ZuoQiModel.Ins;
            this.UI = this._ui = new ui.views.zuoqi.ui_zuoqi_mainUI();
            this.zuoSkinCtl = new ZuoqiMainCtl(this._ui);
            // this.slotView = new ZuoQiSlotView(this._ui.slot0);
            this.btnList.push(
                ButtonCtl.Create(this._ui.close1,new Laya.Handler(this,this.Close)),
                ButtonCtl.Create(this._ui.switchBtn,new Laya.Handler(this,this.onSwitchHandler)),
                ButtonCtl.Create(this._ui.shengxingBtn,new Laya.Handler(this,this.onQuaUp)),
                ButtonCtl.Create(this._ui.zuoqicankuBtn,new Laya.Handler(this,this.storgeHandler)),
                ButtonCtl.Create(this._ui.btn_xslb,new Laya.Handler(this,this.onBtnXslbClick))
            );
            this.yunshubtnCtl = ButtonCtl.Create(this._ui.yunshubtn,new Laya.Handler(this,this.onTransportHandler));
            this.zuoqichouBtnCtl = ButtonCtl.Create(this._ui.zuoqichouBtn,new Laya.Handler(this,this.onChouka));
            this._attrZuoqi = new ZuoQiAttrCtl(this._ui.listleft,this._ui.listright,this._ui.list2,null,this._ui.nameTf,this._ui.quaTf,this._ui.plusCon);
            this._attrZuoqi.skin = this._ui;
            this.btnList.push(this.yunshubtnCtl,this.zuoqichouBtnCtl);
        }
    }

    private onBtnXslbClick(){
        ActivityModel.Ins.diamondEject(this.packUid);
    }

    private onRedUpdate(){
        if(this.model.isFoodFull){
            DotManager.addDot(this.yunshubtnCtl.skin);
        }else{
            DotManager.removeDot(this.yunshubtnCtl.skin);
        }

        if(this.model.hasFreeTime){
            DotManager.addDot(this.zuoqichouBtnCtl.skin);
        }else{
            DotManager.removeDot(this.zuoqichouBtnCtl.skin);
        }
    }
    private storgeHandler(){
        E.ViewMgr.Open(EViewType.FuJiangMountCKView);
    }

    private onChouka(){
        E.ViewMgr.Open(EViewType.ZuoqiChouQu);
    }

    /**坐骑切换 */
    private onSwitchHandler(){
        E.ViewMgr.Open(EViewType.FuJiangMountCKView);
    }

    /**运输*/
    private onTransportHandler(){
        E.ViewMgr.Open(EViewType.ZuoqiYunShu);
    }


    /**坐骑升品 */
    private onQuaUp(){
        this.model.quaUp(this.zuoqiId);
    }

    private onValChangeEvt(){
        let result = this.model.getLvZuoqiNeed(this.zuoqiData);        
        if(!result){
            return;
        }
        this.zuoSkinCtl.refresh(result,this.zuoqiData,this._attrZuoqi);
        this.layoutView();
        this.showAvatar();
    }

    private layoutView(){
        let cx = 284;
        if(this._ui.starupg.visible && this._ui.lvupg.visible){
            this._ui.lvupg.x = 128;
            this._ui.starupg.x = 436;
        }else if(this._ui.starupg.visible){
            this._ui.starupg.x = cx;
        }else{
            this._ui.lvupg.x = cx;
        }
    }

    protected onInit(): void {
        this.model.on(ZuoQiEvent.UpdateInfoEvt, this, this.onValChangeEvt);
        this.model.on(ZuoQiEvent.RedUpdate, this, this.onRedUpdate);
        MainModel.Ins.on(MainEvent.ValChange, this, this.onValChangeEvt);
        // 限时礼包按钮是否显示
        ActivityModel.Ins.on(ActivityEvent.PopWinUpdate,this,ActivityModel.Ins.onPop, [this.packUid, this._ui.btn_xslb]);
        ActivityModel.Ins.onPop(this.packUid, this._ui.btn_xslb);
        this.onValChangeEvt();
        this.onRedUpdate();
    }

    private showAvatar() {
        let _zqVo: ZuoqiVo = this.zuoqiData;
        if (this.mountId != _zqVo.rideId) {
            this.mountId = _zqVo.rideId;
            if (this.avatar) {
                this.avatar.dispose();
            }
            this.avatar = AvatarFactory.createRide(_zqVo.rideId);
            this._ui.rideCon.addChild(this.avatar);
        }
    }

}
export interface IZuoqiSkin{
    isLvFullTf:Laya.Label;
    tf1:Laya.Label;
    lvupg;
    liangcaotf:Laya.Label;
    liangcaonexttf;
    liangcaoIcon:Laya.Image;
    yanchengtf:Laya.Label;
    starupg:Laya.Image;
    starcon:Laya.Sprite;
    itemImg0;
    itemImg1;
    iconShouHun:Laya.Image;
    shengxintf:Laya.Label;
    limtTf:Laya.Label;
    iconItem;
    rtf1;
    rtf2;
    rtf3;
    rtf4;
    progress;
    backBtn;
    washAttrBtn;
    shengjiBtn;
    progcontainer;
    shenjiTf:Laya.Label;
}
export class ZuoqiMainCtl{
    private _ui:IZuoqiSkin;
    private model:ZuoQiModel;
    private zuoqiData:ZuoqiVo;
    private backHomeCtl:ButtonCtl;
    private washAttrBtnCtl:ButtonCtl;
    private _progressCtl:ChestProgressCtl;
    constructor(_ui:IZuoqiSkin){
        this._ui = _ui;
        this.model = ZuoQiModel.Ins;
        this.backHomeCtl = ButtonCtl.CreateBtn(this._ui.backBtn,this,this.onBackHome);
        this.washAttrBtnCtl = ButtonCtl.CreateBtn(this._ui.washAttrBtn,this,this.onWashHandler);
        ButtonCtl.Create(this._ui.shengjiBtn,new Laya.Handler(this,this.onLevelUp));
        this._progressCtl = new ChestProgressCtl(this._ui.progcontainer);
        this._ui.liangcaonexttf.color = "#A55E1B";

        if(initConfig.clienttype == EClientType.Discount){
            _ui.shenjiTf.text = E.getLang("onelvup");
        }else{
            _ui.shenjiTf.text = E.getLang("lvup");
        }

    }
    /**需要升多少级别 */
    private get needLv(){
        return initConfig.clienttype == EClientType.Discount ? this.model.calLv(this.zuoqiData) : 0;
    }
    /**坐骑升级 */
    private onLevelUp(){
        // if(this._lvResult.status == ZuoQiLvResult.NOT_ENOUGH){
        //     ActivityModel.Ins.popWin(EPopWinID.LiangCaoNotEnough);
        // }
        this.model.lvUp(this.zuoqiData.rideId,this.needLv);
        ActivityModel.Ins.runEnough(EPopWinID.HorseFood);
        XianShiLiBaoModel.Ins.sendCmd(XianShiLiBaoType.Mount);
    }
    private onWashHandler(){
        if(TaskModel.Ins.isFuncOpen(EFuncDef.Mount_Wash,true)){
            let lv = G.gameData.mountWashMaxLv
            if(this.zuoqiData.lv < lv){
                E.ViewMgr.ShowMidError(E.getLang("mount_1",lv));
            }else{
                E.ViewMgr.Open(EViewType.MountWash,null,this.zuoqiData.rideId);
            }
        }
    }
    private onBackHome() {
        E.ViewMgr.Open(EViewType.BackHome,null,this.zuoqiData);
    }
    public refresh(result:ZuoQiLvResult,_zqVo:ZuoqiVo,_attrZuoqi:ZuoQiAttrCtl)
    {
        this.zuoqiData = _zqVo;
        // let _zqVo:ZuoqiVo = this.zuoqiData;

        let _quaConfig:Configs.t_Mount_Config_dat =  MountConfigProxy.Ins.getByQualityID(_zqVo.quality);
        this._ui.isLvFullTf.visible = false;
 
        // this.slotView.setData(_zqVo);
        this._ui.tf1.text = "Lv."+_zqVo.lv;
        //等级
        if(result.isMax){
            this._ui.lvupg.visible = false;
        }else{
            this._ui.lvupg.visible = true;
            this._ui.liangcaotf.text = StringUtil.val2m(result.have);
            this._ui.liangcaonexttf.text = "/"+result.need;
            this._ui.liangcaonexttf.x = this._ui.liangcaotf.x + this._ui.liangcaotf.textField.width;
            if(result.have  >= result.need ){
                this._ui.liangcaotf.color = "#1BD24B";
            }else{
                this._ui.liangcaotf.color = "#ff0000";
            }
            this._ui.liangcaoIcon.skin = IconUtils.getIconByCfgId(result.needItemid);
        }
        this._progressCtl.blackWidth = 2;
        this._progressCtl.setVal(result.stepVal,result.stepMax);
        this._ui.yanchengtf.text =  result.step.toString();
        //=========================================================================================================
        //星级
        let _zqqua: ZuoQiQuaResult = this.model.getQuaLvNeed(_zqVo);
        ItemViewFactory.setStar(this._ui.starcon,_zqVo.starLv,_zqqua.f_MaxStar);
        if (_zqqua.isMax) {
            //最大星级
            this._ui.starupg.visible = false;
        } else {
            this._ui.starupg.visible = true;
            let btnName = E.getLang("ride02");//升星
            this._ui.itemImg1.visible = false;

            // let hasHigh:boolean = false;
            // if(_quaConfig.f_AwakeCost7){
            //     //红马
            //     if (_zqVo.starLv >= Mount_ListProxy.Ins.wakeStar) {
            //         hasHigh = true;
            //         btnName = E.getLang("ride01");//觉醒
            //     }
            // }

            if(_zqqua.hasHigh){
                btnName = E.getLang("ride01");//觉醒

                //需要显示觉醒道具
                this._ui.itemImg0.x = -76;
                this._ui.itemImg1.visible = true;
                let arr = _zqqua.highItem.split("|")//_quaConfig[`f_AwakeCost${(_zqVo.starLv + 1)}`].split("|");
                ItemViewFactory.updateRideStar(this._ui.iconShouHun,this._ui.rtf1,this._ui.rtf2,arr[1]);
                ItemViewFactory.updateRideStar(this._ui.iconItem,this._ui.rtf3,this._ui.rtf4,arr[0]);
            }else{
                this._ui.itemImg0.x = 20;
                ItemViewFactory.updateRideStar(this._ui.iconShouHun,this._ui.rtf1,this._ui.rtf2,_zqqua.needItem);//_quaConfig.f_UpgradeStar
            }
            this._ui.shengxintf.text = btnName;
        }
        _attrZuoqi.refresh(_zqVo);

        let cfg: Configs.t_Mount_Config_dat = MountConfigProxy.Ins.getByQualityID(_zqVo.quality);
        this._ui.limtTf.text = E.getLang("zuoqilvlimit",cfg.f_MaxLevel);
        this.backHomeCtl.grayMouseDisable = !_zqVo.mBackHome;


        if(result.isMax && _zqqua.isMax){
            //星级和等级都满级了
            this._ui.isLvFullTf.visible = true;
            this._ui.progress.visible = false;
        }else{
            this._ui.progress.visible = true;
        }
    }
}