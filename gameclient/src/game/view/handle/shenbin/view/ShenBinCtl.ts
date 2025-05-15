import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { stArtifact } from "../../../../network/protocols/BaseProto";
import { SimpleEffect } from "../../avatar/SimpleEffect";
import { DotManager } from "../../common/DotManager";
import { MainModel } from "../../main/model/MainModel";
import { ItemProxy } from "../../main/proxy/ItemProxy";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { ShenBinModel } from "../model/ShenBinModel";
import { ShenBinExpProxy, ShenBinListProxy } from "../proxy/ShenBinProxy";

export class ShenBinCtl{
    protected skin:ui.views.shenbin.ui_shenbinItemUI;

    constructor(skin:ui.views.shenbin.ui_shenbinItemUI) {
        this.skin = skin;
        this.skin.on(Laya.Event.CLICK,this,this.onClick);
        this.skin.on(Laya.Event.DISPLAY,this,this.onAdd);
        this.skin.on(Laya.Event.UNDISPLAY,this,this.onRemove);
    }

    private onAdd(){
        ShenBinModel.Ins.on(ShenBinModel.UPDATA_SHENBIN,this,this.onupdataView);
        ShenBinModel.Ins.on(ShenBinModel.PLAY_EFFECT,this,this.onPlayEffect);
        ShenBinModel.Ins.on(ShenBinModel.PLAY_TENEFFECT,this,this.onPlaytENEffect);
    }

    private onRemove(){
        ShenBinModel.Ins.off(ShenBinModel.UPDATA_SHENBIN,this,this.onupdataView);
        ShenBinModel.Ins.off(ShenBinModel.PLAY_EFFECT,this,this.onPlayEffect);
        ShenBinModel.Ins.off(ShenBinModel.PLAY_TENEFFECT,this,this.onPlaytENEffect);
        if(this.eff){
            this.eff.stop();
        }
    }

    private onPlayEffect(){
        if(this._data){
            let cfg = ShenBinListProxy.Ins.getCfgById(this._data.artifactId);
            if(cfg.f_itemId == ShenBinModel.Ins.openItem.id){
                let ecfg = ShenBinExpProxy.Ins.getCfgByQuaAndLv(cfg.f_ArtifactQua,this._data.level);
                let num = MainModel.Ins.mRoleData.getVal(cfg.f_itemId);
                this.skin.lab_num.text = num + "/" + ecfg.f_pieces;
                this.playAnim();
                if(num >= parseInt(ecfg.f_pieces)){
                    DotManager.addDot(this.skin,5,0);
                }else{
                    DotManager.removeDot(this.skin);
                }
            }
        }
    }

    private onPlaytENEffect(id:Number){
        if(this._data){
            let cfg = ShenBinListProxy.Ins.getCfgById(this._data.artifactId);
            if(cfg.f_itemId == id){
                let ecfg = ShenBinExpProxy.Ins.getCfgByQuaAndLv(cfg.f_ArtifactQua,this._data.level);
                let num = MainModel.Ins.mRoleData.getVal(cfg.f_itemId);
                this.skin.lab_num.text = num + "/" + ecfg.f_pieces;
                this.playAnim();
                if(num >= parseInt(ecfg.f_pieces)){
                    DotManager.addDot(this.skin,5,0);
                }else{
                    DotManager.removeDot(this.skin);
                }
            }
        }
    }

    private eff:SimpleEffect;
    private playAnim(){
        if(!this.eff){
            this.eff = new SimpleEffect(this.skin, "o/spine/change/change", this.skin.icon.width / 2 + 11, this.skin.icon.height / 2 + 16);
        }
        this.eff.play(0,false);
    }

    private onClick(){
        if(this._data){
            E.ViewMgr.Open(EViewType.ShenBinLv,null,this._data);
        }
    }

    private onupdataView(){
        if(this._data){
            let index = ShenBinModel.Ins.dataList.findIndex(ele => ele.artifactId === this._data.artifactId);
            this._data = ShenBinModel.Ins.dataList[index];
            this.updataView();
        }
    }

    private _data:stArtifact;
    public setData(value:stArtifact){
        if(!value)return;
        let index = ShenBinModel.Ins.dataList.findIndex(ele => ele.artifactId === value.artifactId);
        this._data = ShenBinModel.Ins.dataList[index];
        this.updataView();
    }

    private updataView(){
        if(this._data.wearable == 1){
            this.skin.img.visible = true;
        }else{
            this.skin.img.visible = false;
        }
        let cfg = ShenBinListProxy.Ins.getCfgById(this._data.artifactId);
        let ecfg = ShenBinExpProxy.Ins.getCfgByQuaAndLv(cfg.f_ArtifactQua,this._data.level);
        let eNextcfg = ShenBinExpProxy.Ins.getCfgByQuaAndLv(cfg.f_ArtifactQua,this._data.level + 1);
        let icfg = ItemProxy.Ins.getCfg(cfg.f_itemId);
        this.skin.icon.skin = IconUtils.getIconByCfgId(icfg.f_itemid);
        this.skin.quality.skin = IconUtils.getQuaIcon(icfg.f_qua);
        this.skin.lab_lv.text = "lv." + this._data.level;
        DotManager.removeDot(this.skin);
        if(eNextcfg){
            let icfg = ItemProxy.Ins.getCfg(cfg.f_itemId);
            let num = MainModel.Ins.mRoleData.getVal(icfg.f_itemid);
            this.skin.lab_num.text = num + "/" + ecfg.f_pieces;
            this.skin.lab_sp.visible = this.skin.lab_num.visible = true;
            this.skin.lab_mj.visible = false;
            if(num >= parseInt(ecfg.f_pieces)){
                DotManager.addDot(this.skin,5,0);
            }
        }else{
            this.skin.lab_sp.visible = this.skin.lab_num.visible = false;
            this.skin.lab_mj.visible = true;
        }
    }
}