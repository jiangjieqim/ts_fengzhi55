import { ui } from "../../../../../../ui/layaMaxUI";
import { SimpleEffect } from "../../../avatar/SimpleEffect";
import { MainModel } from "../../../main/model/MainModel";
import { attrConvert } from "../../../main/vos/MainRoleVo";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";
import { LingChongModel } from "../../model/LingChongModel";
import { PetTalentProxy } from "../../proxy/LingChongProxy";

export class LingChongXMItem extends ui.views.lingchong.ui_lingchongXMItemUI{

    constructor() {
        super();
        this.on(Laya.Event.DISPLAY,this,this.onAdd);
        this.on(Laya.Event.UNDISPLAY,this,this.onRemove);
        this.on(Laya.Event.CLICK,this,this.onClick);
    }

    private onAdd(){
        LingChongModel.Ins.on(LingChongModel.UPDATA_LEVEL_XM,this,this.onUpdataView);
    }

    private onRemove(){
        LingChongModel.Ins.off(LingChongModel.UPDATA_LEVEL_XM,this,this.onUpdataView);
        if(this.eff){
            this.eff.stop();
        }
    }


    private eff:SimpleEffect;
    private playAnim(){
        if(!this.eff){
            this.eff = new SimpleEffect(this.sp, "o/spine/change/change", this.sp.width / 2 + 1, this.sp.height / 2 + 1);
        }
        this.eff.play(0,false,null,null,null,true);
    }

    private onUpdataView(index){
        if(this._index == index){
            this.playAnim();
        }
    }

    private onClick(e:Laya.Event){
        if(this._dec){
            e.stopPropagation();
            MainModel.Ins.showSmallTips("", this._dec , e.target);
        }
    }

    private _dec:string;
    private _index:number;
    public setData(value:any,index:number){
        if(!value)return;
        this._index = index;
        if(value.data){
            let data:Configs.t_Pet_Talent_List_dat = PetTalentProxy.Ins.getCfgById(value.data.talentId);
            let id = parseInt(data.f_attr.split(":")[0]);
            let val = parseInt(data.f_attr.split(":")[1]) * value.data.talentLevel;
            this.quality.skin = IconUtils.getQuaIcon(data.f_quality);
            this.lab.text = MainModel.Ins.getAttrNameIdByID(id);
            this.lab_lv.text = "Lv." + value.data.talentLevel;
            this._dec = MainModel.Ins.getAttrNameIdByID(id) + ":" + attrConvert(id,val);
            this.wh.visible = false;
        }else{
            this.wh.visible = true;
            this.quality.skin = "remote/common/base/jiangli1.png";
            this.lab.text = "";
            this.lab_lv.text = "";
            this._dec = "";
        }
       
    }
}