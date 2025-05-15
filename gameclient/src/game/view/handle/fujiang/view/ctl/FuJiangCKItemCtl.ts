import { ui } from "../../../../../../ui/layaMaxUI";
import { stRecruitChief } from "../../../../../network/protocols/BaseProto";
import { SimpleEffect } from "../../../avatar/SimpleEffect";
import { ItemProxy } from "../../../main/proxy/ItemProxy";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";
import { FuJiangModel } from "../../model/FuJiangModel";
import { FuJiangListProxy } from "../../proxy/FuJiangProxy";

export class FuJiangCKItemCtl{
    protected _ui:ui.views.fujiang.ui_fujiangItem8UI;

    constructor(skin:ui.views.fujiang.ui_fujiangItem8UI) {
        this._ui = skin;
        this._ui.on(Laya.Event.DISPLAY,this,this.onAdd);
        this._ui.on(Laya.Event.UNDISPLAY,this,this.onRemove);
    }

    private onAdd(){
        FuJiangModel.Ins.on(FuJiangModel.FUJIANG_ZM_DH,this,this.onDHOK);
    }

    private onRemove(){
        FuJiangModel.Ins.off(FuJiangModel.FUJIANG_ZM_DH,this,this.onDHOK);
        if(this._eff){
            this._eff.dispose();
            this._eff = null;
        }
    }

    private _eff:SimpleEffect;
    public setEffOne(index:number){
        this._isTen = false;
        this._ui.sp1.visible = false;
        this._eff = new SimpleEffect(this._ui.sp, `o/spine/cardxiyou${index}/cardxiyou${index}`);
        this._eff.play(0,false,this,this.effEndOne2);
    }

    private effEndOne1(){
        this._eff.play(1,false,this,this.effEndOne2);
    }

    private effEndOne2(){
        this._eff.play(2,false,this,this.effEndOne3);
    }

    private effEndOne3(){
        this._eff.play(3,false,this,this.effEndOne4);
        this._ui.sp1.visible = true;
    }

    private effEndOne4(){
        this._eff.play(4,true);
        if(this._isTen){
            FuJiangModel.Ins.playNum++;
            if(FuJiangModel.Ins.playNum >= 10){
                FuJiangModel.Ins.event(FuJiangModel.FUJIANG_ZM_DH_OK);
            }else{
                FuJiangModel.Ins.event(FuJiangModel.FUJIANG_ZM_DH);
            }
        }else{
            FuJiangModel.Ins.event(FuJiangModel.FUJIANG_ZM_DH_OK);
        }
    }

    private onDHOK(){
        if(FuJiangModel.Ins.playNum == 2){
            if(this._pos == 3 || this._pos == 4 || this._pos == 5){
                this._eff.play(2,false,this,this.effEndOne3);
            }
        }else if(FuJiangModel.Ins.playNum == 5){
            if(this._pos == 6 || this._pos == 7 || this._pos == 8){
                this._eff.play(2,false,this,this.effEndOne3);
            }
        }else if(FuJiangModel.Ins.playNum == 8){
            if(this._pos == 9 || this._pos == 10){
                this._eff.play(2,false,this,this.effEndOne3);
            }
        }
    }

    //********************************************************************************************************** */
    private _pos;
    private _isTen:boolean;
    public setEffTen(index:number,pos:number){
        this._isTen = true;
        this._pos = pos;
        this._ui.sp1.visible = false;
        this._eff = new SimpleEffect(this._ui.sp, `o/spine/cardxiyou${index}/cardxiyou${index}`);
        this._eff.play(0,false,this,this.effEndTen1);
    }

    private effEndTen1(){
        if(this._pos == 1 || this._pos == 2){
            this._eff.play(2,false,this,this.effEndOne3);
        }
    }

    public setData(cfg:stRecruitChief){
        this._pos = 0;
        FuJiangModel.Ins.playNum = 0;
        if(cfg.cheifId){
            let fjCfg = FuJiangListProxy.Ins.getCfgById(cfg.cheifId);
            this._ui.img_qua.skin = FuJiangListProxy.Ins.getQuaSkin(fjCfg.f_cheifQuality);
            this._ui.img.skin = FuJiangListProxy.Ins.getFuJiangSkin(fjCfg.f_cheifid);
            this._ui.img_qua1.skin = "";
            this._ui.img_s.visible = false;
            this._ui.lab.text = "";
            this._ui.lab_name.text = fjCfg.f_cheif;
            if(cfg.itemId){
                this._ui.sp_new.visible = false;
                let iCfg = ItemProxy.Ins.getCfg(cfg.itemId);
                this._ui.img11.skin = IconUtils.getIconByCfgId(cfg.itemId);
                this._ui.lab11.visible = true;
                this._ui.lab_num.text = cfg.count + "";
            }else{
                this._ui.sp_new.visible = true;
                this._ui.img11.skin = "";
                this._ui.lab11.visible = false;
                this._ui.lab_num.text = "";
            }
        }else{
            let iCfg = ItemProxy.Ins.getCfg(cfg.itemId);
            let qua = iCfg.f_qua;
            if(qua == 3 || qua == 4 || qua == 5){
                qua += 1;
            }
            this._ui.img_qua.skin = FuJiangListProxy.Ins.getQuaSkin(qua);
            this._ui.img.skin = "";
            this._ui.img_qua1.skin = IconUtils.getIconByCfgId(cfg.itemId);
            this._ui.img_s.visible = true;
            this._ui.lab.text = "x" + cfg.count;
            this._ui.lab_name.text = main.itemName(iCfg.f_name);
            this._ui.sp_new.visible = false;
            this._ui.img11.skin = "";
            this._ui.lab11.visible = false;
            this._ui.lab_num.text = "";
        }
        
    }
}