import { ui } from "../../../../../ui/layaMaxUI";
import { SimpleEffect } from "../../avatar/SimpleEffect";
import { EquipmentQualityProxy } from "../../main/model/EquipmentProxy";
import { ZuoQiModel } from "../../zuoqi/ZuoqiModel";
import { PetListProxy } from "../proxy/LingChongProxy";

export class LingChongFangPaiItemCtl {
    public skin:ui.views.lingchong.ui_lingchongFPItemUI;

    private _data:number;
    private readonly useTime:number = 250;
    private iconTween:Laya.Tween;
    private bgTween:Laya.Tween;
    /**恭喜获得 */
    private horsecard:SimpleEffect;
    constructor(skin: ui.views.lingchong.ui_lingchongFPItemUI) {
        this.skin = skin;
        this.iconTween = new Laya.Tween();
        this.bgTween = new Laya.Tween();
        this.skin.bg.alpha = 0.0;
        this.clearUI();
    }

    private clearUI(){
        this.skin.icon11.visible = false;
    }

    public set visible(v:boolean){
        this.skin.visible = v;
    }

    public set data(v: number) {
        if (v) {
            this._data = v;
            this.clearUI();
            this.iconTween.clear();
            this.bgTween.clear();
            this.playHorseCard();
        }
    }

    private playHorseCard(){
        if(!this.horsecard){
            this.horsecard = new SimpleEffect(this.skin, "o/spine/horsecard2/horsecard", this.skin.width >> 1, this.skin.height >> 1);
        }
        this.horsecard.play(0,false,this,this.onPlayHorseCardComplete,null,true);
    
    }

    private onPlayHorseCardComplete(){
        if(this.skin.destroyed){
            LogSys.Warn("LingChongFangPaiItemCtl skin is destroyed");
            return;
        }
        this.refresh();
        this.skin.icon11.visible = true;
        this.skin.icon.alpha = 0;
        this.iconTween.to(this.skin.icon, { alpha: 1.0 }, this.useTime, null, new Laya.Handler(this, this.onComplete));
    }

    private getQua(qua: number) {
        let l: string[] = ZuoQiModel.Ins.cards;

        let icon = l[qua-1];
        if(!icon){
            return l[l.length-1];
        }
        return icon;
        // return ZuoQiModel.Ins.convertImage(qua);
    }

    private refresh(){
        let cfg:Configs.t_Pet_List_dat=PetListProxy.Ins.getCfgById(this._data);
        this.skin.nametf.text = cfg.f_petname;
        this.skin.nametf.color = "#" + EquipmentQualityProxy.Ins.getByQua(cfg.f_petquality).f_Color;
        this.skin.img.skin = `remote/lingchong/tj${cfg.f_pettype}.png`;
        let icon = `remote/lingchong/${this.getQua(cfg.f_petquality)}.png`;
        this.skin.icon.skin = icon;
        this.skin.horseIcon.skin = PetListProxy.Ins.getPetIconById(this._data);
    }

    private onComplete(){
        
    }
}