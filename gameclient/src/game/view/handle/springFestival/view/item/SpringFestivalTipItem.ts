import { ui } from "../../../../../../ui/layaMaxUI";
import { SimpleEffect } from "../../../avatar/SimpleEffect";
import { MainModel } from "../../../main/model/MainModel";
import { ItemVo } from "../../../main/vos/ItemVo";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";
import { SFConfigProxy } from "../../proxy/SpringFestivalProxy";

export class SpringFestivalTipItem extends ui.views.springFestival.ui_springFestivalTipItemUI{
    constructor(){
        super();
        this.on(Laya.Event.DISPLAY,this,this.onAdd);
        this.on(Laya.Event.UNDISPLAY,this,this.onRemove);
    }

    private onAdd(){
        this.on(Laya.Event.CLICK, this, this.onSlotClickHandler);
    }

    private onRemove(){
        this.off(Laya.Event.CLICK, this, this.onSlotClickHandler);
        if(this._eff){
            this._eff.dispose();
            this._eff = null;
        }
    }

    private onSlotClickHandler(e:Laya.Event){
        e.stopPropagation();
        MainModel.Ins.showSmallTips(this._vo.getName(), this._vo.getDesc(), this);
    }

    private _vo:ItemVo;
    private _eff:SimpleEffect;
    public setData(value:number,index:number){
        if(!value)return;
        this._vo = new ItemVo;
        this._vo.cfgId = value;
        this._vo.count = 1;
        this.icon.skin = IconUtils.getIconByCfgId(this._vo.cfgId);
        this.quality.skin = IconUtils.getQuaIcon(this._vo.cfg.f_qua);

        this._eff = new SimpleEffect(this.sp, `o/spine/efxinshou/efxinshou`,8,8,1.0);
        let ind = SFConfigProxy.Ins.GetDataById(1).f_ItemEffect.split("|")[index];
        this._eff.play(parseInt(ind),true);
    }
}