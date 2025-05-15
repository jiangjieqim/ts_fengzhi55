import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { stCellValue, stSkin, stWing } from "../../../../network/protocols/BaseProto";
import { AvatarBaseView } from "../../avatar/AvatarBaseView";
import { AvatarFactory } from "../../avatar/AvatarFactory";
import { ShowPlayerView } from "../../jjc/views/ShowPlayerView";
import { GameconfigProxy } from "../model/EquipmentProxy";
import { MainEvent } from "../model/MainEvent";
import { MainModel } from "../model/MainModel";
import { EAttrType } from "../vos/ECellType";
import { EquipBaseVo } from "../vos/EquipBaseVo";
import { PlayerVoFactory } from "../vos/PlayerVoFactory";

export class DetailShowVo{
    private _playerSkin:stSkin;
    public set playerSkin(v:stSkin){
        let vo = new stSkin();
        vo.f_BodyID = v.f_BodyID;
        vo.f_HeadID = v.f_HeadID;
        vo.f_MountID = 0;
        vo.f_ShieldID = v.f_ShieldID;
        vo.f_WeaponID = v.f_WeaponID;
        vo.f_WingID = v.f_WingID;
        this._playerSkin = vo;
    }
    public get playerSkin(){
        return this._playerSkin;
    }

    public moneyInfo:stCellValue[];
    public equipList:EquipBaseVo[];
    public rideId:number;
    public wing:stWing;
    public treasureStage:number;
    public accoutID:number;
}

/**
 * 属性详情
 */
export class Attr_detailedView extends ViewBase{
    private _ui:ui.views.main.ui_attr_detailedUI;
    protected mMask = true;
    // private model:MainModel;
    private moneyInfo:stCellValue[];
    private avatar:AvatarBaseView;
    private tf:Laya.Label;
    protected autoFree = true;
    protected onFirstInit() {
        if(!this.UI){
            // this.model = MainModel.Ins;
            this.UI = this._ui = new ui.views.main.ui_attr_detailedUI();
            this.btnList.push(
            new ButtonCtl(this._ui.close1,new Laya.Handler(this,this.onCloseHandler1)),
            new ButtonCtl(this._ui.shuxingDetail,new Laya.Handler(this,this.helpHandler))
            );
            this._ui.list1.itemRender = ui.views.main.ui_main_attrUI;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onAttrHandler);
        }
    }

    private onAttrHandler(skin: ui.views.main.ui_main_attrUI){
        let id = skin.dataSource;
        let val = PlayerVoFactory.getValString(this.moneyInfo,id);
        let a = "";
        if(debug){
            a =  "-"+id;
            skin.tf1.fontSize = 14;
        }
        skin.tf1.text = MainModel.Ins.getAttrNameIdByID(id) + a;
        skin.valTf.text =  val;
        skin.upimg.visible = false;
    }

    private helpHandler(){
        E.ViewMgr.openHelpView("AttrTitle","AttrDesc");
    }

    private onCloseHandler1(){
        E.ViewMgr.Close(this.ViewType);
    }
    protected onExit() {
        let view:ShowPlayerView = E.ViewMgr.Get(EViewType.ShowPlayer) as ShowPlayerView;
        if(view.IsShow()){
            view.addAvatar();
        }

        if(this.tf){
            this.tf.destroy(true);
            this.tf = null;
        }

        // MainModel.Ins.event(MainEvent.AddHero);
        if(this.avatar){
            this.avatar.dispose();
            this.avatar = null;
        }
    }
    protected onAddLoadRes() {
    }
    protected onAddEventListener() {

    }
    protected onEnter() {
    
    }
    private getVal(type:number){
        return (debug ? type.toString() + "-" : "") + PlayerVoFactory.getVal(this.moneyInfo, type);
    }

    protected onInit() {
        let detail:DetailShowVo = this.Data;
        this.moneyInfo = detail.moneyInfo;
        //this._ui.alpha = 0.25;
        this._ui.speedtf.text = this.getVal(EAttrType.Speed).toString();
        this._ui.lifeTf.text = this.getVal(EAttrType.Life).toString();
        this._ui.attTf.text = this.getVal(EAttrType.Attack).toString();
        this._ui.definedTf.text = this.getVal(EAttrType.Defense).toString();
        this._ui.list1.array = GameconfigProxy.Ins.gainList;

        if(debug){
            this._ui.speedtf.fontSize = this._ui.lifeTf.fontSize = this._ui.attTf.fontSize = this._ui.definedTf.fontSize = 20;
        }

        // if(E.Debug){
        //     if(!this.tf){
        //         this.tf = new Laya.Label();
        //         this.tf.fontSize = 25;
        //     }
        //     let l = [
        //         EAttrType.Speed,EAttrType.Life,EAttrType.Attack,EAttrType.Defense
        //     ]
        //     let str = "";
        //     for(let i = 0;i < l.length;i++){
        //         let id = l[i];
        //         str += id + MainModel.Ins.getAttrNameIdByID(id) + ",";
        //     }
        //     this.tf.text = str;
        //     this._ui.addChild(this.tf);
        //     this.tf.color = "#ffffff";
        // }

        if(detail.accoutID == MainModel.Ins.mRoleData.AccountId){
            this.avatar = AvatarFactory.getStandUiMainAvatar();
            this._ui.heroContainer.addChild(this.avatar);
        }else{
            let view:ShowPlayerView = E.ViewMgr.Get(EViewType.ShowPlayer) as ShowPlayerView;
            if(view.IsShow()){
                this._ui.heroContainer.addChild(view.avatar);
            }
        }
    }
}