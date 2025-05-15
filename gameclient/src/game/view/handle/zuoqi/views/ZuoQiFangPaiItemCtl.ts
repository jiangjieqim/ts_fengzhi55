import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { stRewardRideVo } from "../../../../network/protocols/BaseProto";
import { SimpleEffect } from "../../avatar/SimpleEffect";
import { IconUtils } from "../vos/IconUtils";
import { Mount_ListProxy } from "../vos/ZuoqiProxy";
import { ZuoQiModel } from "../ZuoqiModel";

export class ZuoQiFangPaiItemCtl {
    public skin:ui.views.zuoqi.ui_zuoqi_paiitemUI;

    private _data:stRewardRideVo;
    private readonly useTime:number = 250;
    private iconTween:Laya.Tween;
    private bgTween:Laya.Tween;
    /**恭喜获得 */
    private horsecard:SimpleEffect;
    constructor(skin: ui.views.zuoqi.ui_zuoqi_paiitemUI) {
        this.skin = skin;
        this.iconTween = new Laya.Tween();
        this.bgTween = new Laya.Tween();
        this.skin.bg.alpha = 0.0;
        this.clearUI();
    }

    private clearUI(){
        this.skin.icon11.visible = false;
        // this.skin.bg.alpha = 0.0;
    }

    public set visible(v:boolean){
        this.skin.visible = v;
    }

    public set data(v: stRewardRideVo) {
        if (v) {
            this._data = v;
            this.clearUI();
            this.iconTween.clear();
            this.bgTween.clear();
            this.playHorseCard();
        }
    }

    disposeSpine(){
        if(this.horsecard){
            this.horsecard.dispose();
        }
    }

    private playHorseCard(){
        this.disposeSpine();
        this.horsecard = new SimpleEffect(this.skin, "o/spine/horsecard/horsecard", this.skin.width >> 1, this.skin.height >> 1);
        this.horsecard.play(0,false,this,this.onPlayHorseCardComplete,null,true);    
    }

    private onPlayHorseCardComplete(){
        if(this.skin.destroyed){
            LogSys.Warn("ZuoQiFangPaiItemCtl skin is destroyed");
            return;
        }
        this.refresh();
        this.skin.icon11.visible = true;
        this.skin.icon.alpha = 0;
        // this.skin.bg.alpha = 1.0;
        this.iconTween.to(this.skin.icon, { alpha: 1.0 }, this.useTime, null, new Laya.Handler(this, this.onComplete));
        // this.bgTween.to(this.skin.bg, { alpha: 0.0 }, this.useTime);
    }

    private getQua(qua: number) {
        return ZuoQiModel.Ins.convertImage(qua);
    }

    private refresh(){
        this.skin.zhuanhuatf.visible = false;
        let cfg:Configs.t_Mount_List_dat=Mount_ListProxy.Ins.getCfg(this._data.rideid);
        this.skin.nametf.text = cfg.f_MountName;
        if(this._data.type == 1){
            //道具
            this.skin.tf1.visible = true;
            this.skin.zhuanhuatf.visible = true;
            this.skin.cntTf.text = this._data.count.toString();
            this.skin.tf1.text = E.LangMgr.getLang("IsHave");
            this.skin.icon1.skin = IconUtils.getIconByCfgId(this._data.itemid);
            // this.skin.nametf.text = "";
            // this.skin.horseIcon.skin = "";
        }else{
            //马匹
            this.skin.tf1.text = E.LangMgr.getLang("NewGet");
        }
        let icon =this.getQua(cfg.f_Quality);
        this.skin.icon.skin = icon;
        this.skin.horseIcon.skin=IconUtils.getHorseIcon(cfg.f_MountID);
    }

    private onComplete(){
        
    }
}