import {GeometryUtil} from "../../../../../../frame/util/GeometryUtil";
import { ui } from "../../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { E } from "../../../../../G";
import { ChiefIntoBattle_req, stChief, stSkin } from "../../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../../network/SocketMgr";
import { AvatarFactory } from "../../../avatar/AvatarFactory";
import { AvatarView, EAvatarDir } from "../../../avatar/AvatarView";
import { EAvatarAnim } from "../../../avatar/vos/EAvatarAnim";
import { EServerVersion, MainModel } from "../../../main/model/MainModel";
import { FuJiangModel } from "../../model/FuJiangModel";
import { FuJiangListProxy, FuJiangSlotProxy } from "../../proxy/FuJiangProxy";

export class FuJiangRoleCtl{
    protected _ui:ui.views.fujiang.ui_fujiangItemUI;

    private _avatar:AvatarView;

    constructor(skin:ui.views.fujiang.ui_fujiangItemUI) {
        this._ui = skin;

        this._ui.on(Laya.Event.DISPLAY,this,this.onAdd);
        this._ui.on(Laya.Event.UNDISPLAY,this,this.onRemove);
    }

    private onAdd(){
        
    }

    private onRemove(){
        if(this._avatar){
            this._avatar.dispose();
            this._avatar = null;
        }
        this.clear();
    }

    private _data:stChief;
    private _index:number;
    public setData(value:stChief){
        if(!value)return;
        this._data = value;
        this.clear();
        this._ui.on(Laya.Event.MOUSE_DOWN,this,this.onDown);
        if(FuJiangModel.Ins.changefjList){
            let index = FuJiangModel.Ins.changefjList.findIndex(item => item.cheifId == value.cheifId);
            if(index == -1){
                return;
            }
        }
        if(this._avatar){
            this._avatar.dispose();
            this._avatar = null;
        }
        if(value.isChief){
            let cCfg = FuJiangListProxy.Ins.getCfgById(value.cheifId);
            let skin:stSkin = FuJiangModel.Ins.getFuJiangSkin(cCfg.f_cheifid);
            let vo = FuJiangModel.Ins.getMountDataByCheifId(value.cheifId);
            if(vo){
                skin.f_MountID = vo.mountId;
            }
            this._avatar = AvatarFactory.createAvatarByStSkin(skin,EAvatarAnim.NormalStand,EAvatarDir.Right);
            this._ui.img.skin = FuJiangListProxy.Ins.getProfessionSkin(cCfg.f_cheifClass);
            this._ui.lab_lv.text = "Lv." + value.level;
            this._ui.lab_name.text = cCfg.f_cheif;
        }else{
            this._avatar = AvatarFactory.getStandNormalMainAvatar(EAvatarDir.Right);
            this._ui.img.skin = FuJiangListProxy.Ins.getProfessionSkin(5);
            this._ui.lab_lv.text = "Lv." + MainModel.Ins.mRoleData.lv;
            this._ui.lab_name.text = MainModel.Ins.mRoleData.NickName;
        }
        this._ui.sp.addChild(this._avatar);
        this._index = value.pos;
        this.rester();
    }

    private onDown(e:Laya.Event){
        Laya.stage.on(Laya.Event.MOUSE_UP,this,this.onUp);
        this._ui.zOrder = 100;
        this._ui.startDrag();
    }

    private onUp(e:Laya.Event){
        // console.log("onUponUponUponUponUp")
        // let imgX:number = (this._ui.parent as Laya.Sprite).localToGlobal(new Laya.Point(this._ui.x,this._ui.y)).x;
        // let imgY:number = (this._ui.parent as Laya.Sprite).localToGlobal(new Laya.Point(this._ui.x,this._ui.y)).y;
        // let xxx = Laya.stage.mouseX;
        // let yyy = Laya.stage.mouseY;
        // this.clearDrag();
        // let view:ui.views.fujiang.ui_fujiangViewUI = E.ViewMgr.Get(EViewType.FuJiang).UI as ui.views.fujiang.ui_fujiangViewUI;
        // let index:number=0;
        // for(let i:number=1;i<7;i++){
        //     let img = view["view1"]["img_" + i];
        //     let xx = img.parent.localToGlobal(new Laya.Point(img.x,img.y)).x;
        //     let yy = img.parent.localToGlobal(new Laya.Point(img.x,img.y)).y;
        //     let x = xx - xxx;
        //     let y = yy - yyy;
        //     let len = Math.sqrt(Math.pow(x,2) + Math.pow(y,2)) + 90;
        //     if(len <= 60){
        //         index = i;
        //     }
        //     console.log("len>>>>>>>>>>>>>>>",len)
        // }
        // console.log("index>>>>>>>>>>>>>>>>",index)
        // if(index > 0){
        //     if(this._index != index && index != 5){
               
        //     }
        // }

        this.clearDrag();
        let view:ui.views.fujiang.ui_fujiangViewUI = E.ViewMgr.Get(EViewType.FuJiang).UI as ui.views.fujiang.ui_fujiangViewUI;
        let imgX:number = Laya.stage.mouseX;
        let imgY:number = Laya.stage.mouseY;
        let imgW:number = 4;
        let imgH:number = 4;
        let index:number = 0;
        for(let i:number=1;i<7;i++){
            let img = view["view1"]["img_" + i];
            let p:Laya.Point = new Laya.Point(imgX + imgW*0.5,imgY + imgH*0.5);
            let bagX:number = (img.parent as Laya.Sprite).localToGlobal(new Laya.Point(img.x,img.y)).x;
            let bagY:number = (img.parent as Laya.Sprite).localToGlobal(new Laya.Point(img.x,img.y)).y;

            let p1:Laya.Point = new Laya.Point(bagX,bagY + img.height);//左下顶点
            let p2:Laya.Point = new Laya.Point(bagX,bagY);//左上顶点
            let p3:Laya.Point = new Laya.Point(bagX + img.width,bagY);//右上顶点
            let p4:Laya.Point = new Laya.Point(bagX + img.width , bagY + img.height);//右下顶点
            let bo = GeometryUtil.isPointInRect(p1,p2,p3,p4,p);
            if(bo){
                index = i;
                // console.log("index>>>>>>>>>>>>>",i);
                // break;
            }
        }
        if(index > 0){
            if(index == this._index){
                this.rester();
                if(this._data.isChief){
                    E.ViewMgr.Open(EViewType.FuJiangPY,null,this._data);
                }
            }else{
                let lvv:number;
                let lv = MainModel.Ins.mRoleData.lv;
                let sCfg = FuJiangSlotProxy.Ins.getCfgById(index);
                if(sCfg.f_pos_available){
                    if(MainModel.Ins.serverVer == EServerVersion.Version_1){
                        lvv = sCfg.f_unlocklevel_v1;
                    }else{
                        if(FuJiangModel.Ins.isNewServer){
                            lvv = sCfg.f_unlocklevelnew;
                        }else{
                            lvv = sCfg.f_unlocklevel;
                        }
                    }
                    if (lv < lvv) {
                        this.rester();
                    } else {
                        let req:ChiefIntoBattle_req = new ChiefIntoBattle_req;
                        req.type = 1;
                        req.pos = index;
                        req.isChief = this._data.isChief;
                        req.cheifId = this._data.cheifId;
                        SocketMgr.Ins.SendMessageBin(req);
                    }
                }else{
                    this.rester();
                }
            }
        }else{
           this.rester();
        }
    }

    private rester(){
        this._ui.x = FuJiangModel.fjXY[this._index - 1].x;
        this._ui.y = FuJiangModel.fjXY[this._index - 1].y;
        this._ui.zOrder = FuJiangModel.fjZorder[this._index - 1];
    }

    private clear(){
        this.clearDrag();
        this._ui.off(Laya.Event.MOUSE_DOWN,this,this.onDown);
    }

    private clearDrag(){
        this._ui.stopDrag();
        Laya.stage.off(Laya.Event.MOUSE_UP,this,this.onUp);
    }
}