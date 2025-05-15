import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { E } from "../../../../../G";
import { stChief, stSkin } from "../../../../../network/protocols/BaseProto";
import { AvatarFactory } from "../../../avatar/AvatarFactory";
import { AvatarMonsterView } from "../../../avatar/AvatarMonsterView";
import { EAvatarAnim } from "../../../avatar/vos/EAvatarAnim";
import { DotManager } from "../../../common/DotManager";
import { MainEvent } from "../../../main/model/MainEvent";
import { MainModel } from "../../../main/model/MainModel";
import { ZuoQiAttrCtl } from "../../../zuoqi/views/ZuoQiAttrCtl";
import { ZuoqiMainCtl } from "../../../zuoqi/views/ZuoQiMainView";
import { ZuoqiVo } from "../../../zuoqi/vos/ZuoqiVo";
import { ZuoQiModel } from "../../../zuoqi/ZuoqiModel";
import { FuJiangModel } from "../../model/FuJiangModel";
import { FuJiangSelCtl } from "./FuJiangSelCtl";

export class FuJiangViewCtl4{
    protected _ui:ui.views.fujiang.ui_fujiangView4UI;
    // private _selCtl:FuJiangSelCtl;
    private _attrZuoqi:ZuoQiAttrCtl;
    private backHomeCtl:ButtonCtl;
    private avatar:AvatarMonsterView;
    // private _progressCtl:ChestProgressCtl;

    constructor(skin:ui.views.fujiang.ui_fujiangView4UI) {
        this._ui = skin;
        this.zuoSkinCtl = new ZuoqiMainCtl(this._ui);

        this._ui.on(Laya.Event.DISPLAY,this,this.onAdd);
        this._ui.on(Laya.Event.UNDISPLAY,this,this.onRemove);

        ButtonCtl.Create(this._ui.btn_ck,new Laya.Handler(this,this.storgeHandler));
        ButtonCtl.Create(this._ui.switchBtn,new Laya.Handler(this,this.storgeHandler));
        ButtonCtl.Create(this._ui.shengxingBtn,new Laya.Handler(this,this.onQuaUp));
        ButtonCtl.Create(this._ui.btn_cq,new Laya.Handler(this,this.onBtnCQClick));

        this._attrZuoqi = new ZuoQiAttrCtl(this._ui.listleft,this._ui.listright,this._ui.list2,null,this._ui.nameTf,this._ui.quaTf,this._ui.plusCon,1,1);
        this._attrZuoqi.skin = this._ui;
    }

    public onAdd(){
        // FuJiangModel.Ins.on(FuJiangModel.SELECT_FUJIANG,this,this.updataView);
        FuJiangModel.Ins.on(FuJiangModel.FUJIANG_MOUNT_UPDATA,this,this.onUpdataView);
        MainModel.Ins.on(MainEvent.ValChange, this, this.onUpdataView);
        this.onUpdataView();
        // this._selCtl.setData();
    }

    public onRemove(){
        // FuJiangModel.Ins.off(FuJiangModel.SELECT_FUJIANG,this,this.updataView);
        FuJiangModel.Ins.off(FuJiangModel.FUJIANG_MOUNT_UPDATA,this,this.onUpdataView);
        MainModel.Ins.off(MainEvent.ValChange, this, this.onUpdataView);
        // this._selCtl.onRemove();
        if(this.avatar){
            this.avatar.dispose();
            this.avatar = null;
        }
    }

    private storgeHandler(){
        if(this._data){
            E.ViewMgr.Open(EViewType.FuJiangMountCKView,null,this._data.cheifId);
        }else{
            E.ViewMgr.ShowMidError("请先上阵副将");//显示错误提示
        }
    }

    /**坐骑升品 */
    private onQuaUp(){
        ZuoQiModel.Ins.quaUp(this._mountVo.rideId);
    }

    private onBtnCQClick(){
        E.ViewMgr.Open(EViewType.ZuoqiChouQu);
    }

    private _data:stChief;
    private _mountVo:ZuoqiVo;
    private updataView(value: stChief) {
        // this._data = value;
        // this.onUpdataView();
    }
    private zuoSkinCtl:ZuoqiMainCtl;

    private onUpdataView(){
        this._data = FuJiangModel.Ins.getZJFJData();
        if(this._data){
            let data = FuJiangModel.Ins.getMountDataByCheifId(this._data.cheifId);
            if(data){
                this._mountVo = ZuoQiModel.Ins.getMountVoById(data.mountId);
                this._ui.sp.visible = true;
                this._ui.sp1.visible = false;
                let result = ZuoQiModel.Ins.getLvZuoqiNeed(this._mountVo);
                if(!result){
                    return;
                }
                this.zuoSkinCtl.refresh(result,this._mountVo,this._attrZuoqi);
                this.layoutView();
                this.showAvatar();
            }else{
                this._ui.sp.visible = false;
                this._ui.sp1.visible = true;
            }
            // this.setRedTip();
            if(FuJiangModel.Ins.isMountRedTip(this._data.cheifId)){
                DotManager.addDot(this._ui.btn_ck,15,-10);
            }else{
                DotManager.removeDot(this._ui.btn_ck);
            }
        }else{
            this._ui.sp.visible = false;
            this._ui.sp1.visible = true;
            DotManager.removeDot(this._ui.btn_ck);
        }
    }

    // private setRedTip(){
    //     let arr = FuJiangModel.Ins.getSZNoList();
    //     for(let i:number=0;i<arr.length;i++){
    //         if(FuJiangModel.Ins.isMountRedTip(arr[i].cheifId)){
    //             this._selCtl.addRedTip(i);
    //         }else{
    //             this._selCtl.remRedTip(i);
    //         }
    //     }
    // }

    private layoutView(){
        let cx = 225;
        if(this._ui.starupg.visible && this._ui.lvupg.visible){
            this._ui.lvupg.x = 105;
            this._ui.starupg.x = 367;
        }else if(this._ui.starupg.visible){
            this._ui.starupg.x = cx;
        }else{
            this._ui.lvupg.x = cx;
        }
    }

    private showAvatar() {
        /*
        let skin:stSkin = new stSkin();
        skin.f_MountID = this._mountVo.rideId;        
        if (!this.avatar) {
            this.avatar =  AvatarFactory.createAvatarByStSkin(skin,EAvatarAnim.None);
            this._ui.rideCon.addChild(this.avatar);
        }else{
            this.avatar.mSkin = skin;
        }
        */
        if (this.avatar) {
            this.avatar.dispose();
        }
        this.avatar = AvatarFactory.createRide(this._mountVo.rideId);
        this._ui.rideCon.addChild(this.avatar);
    }
}