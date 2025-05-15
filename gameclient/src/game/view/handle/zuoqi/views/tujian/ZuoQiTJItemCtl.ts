import { ui } from "../../../../../../ui/layaMaxUI";
import { ZuoQiModel } from "../../ZuoqiModel";
import { IconUtils } from "../../vos/IconUtils";
import { ZuoQiEvent } from "../../vos/ZuoQiEvent";
import { MountConfigProxy, Mount_ListProxy } from "../../vos/ZuoqiProxy";
import { ItemViewFactory } from "../../../main/model/ItemViewFactory";

export class ZuoQiTJItemCtl{
    protected skin:ui.views.zuoqi.ui_zuoqiTJItemUI;
    constructor(skin:ui.views.zuoqi.ui_zuoqiTJItemUI) {
        this.skin = skin;
        this.skin.on(Laya.Event.DISPLAY,this,this.onAdd);
        this.skin.on(Laya.Event.UNDISPLAY,this,this.onRemove);
        this.skin.on(Laya.Event.CLICK,this,this.onClick);
    }

    private onClick(){
        ZuoQiModel.Ins.tjSelectId = this._data;
        ZuoQiModel.Ins.event(ZuoQiEvent.TJSELECT);
    }

    private onAdd(){
        ZuoQiModel.Ins.on(ZuoQiEvent.TJSELECT,this,this.onSelect);
    }

    private onRemove(){
        ZuoQiModel.Ins.off(ZuoQiEvent.TJSELECT,this,this.onSelect);
    }

    private onSelect(){
        if(this._flag){
            this.skin.sel.visible = false;
        }else{
            if(this._data == ZuoQiModel.Ins.tjSelectId){
                this.skin.sel.visible = true;
            }else{
                this.skin.sel.visible = false;
            }
        }
    }

    private _data:number;
    private _flag:boolean;
    public setData(id:number,flag:boolean = false){
        this._data = id;
        this._flag = flag;
        let cfg = Mount_ListProxy.Ins.getCfg(id);
        this.skin.qua.skin = IconUtils.getQuaIcon(cfg.f_Quality);
        this.skin.icon.skin = IconUtils.getHorseIcon(cfg.f_MountID);
        let qcfg = MountConfigProxy.Ins.getByQualityID(cfg.f_Quality);
        this.skin.tf1.text = IconUtils.str2Lv(qcfg.f_MaxLevel);
        // this.star = qcfg.f_MaxStar;
        let _statVal = qcfg.f_MaxStar;
        ItemViewFactory.setStar(this.skin.stars,_statVal,_statVal);
        if(this._flag){
            this.skin.sel.visible = false;
        }else{
            if(cfg.f_MountID == ZuoQiModel.Ins.tjSelectId){
                this.skin.sel.visible = true;
            }else{
                this.skin.sel.visible = false;
            }
        }
    }

    // protected set star(v:number){
    //     let l:Laya.Image[] = [
    //         this.skin.s0,
    //         this.skin.s1,
    //         this.skin.s2,
    //         this.skin.s3,
    //         this.skin.s4,
    //         this.skin.s5,
    //     ];
    //     let _oneStar:Laya.Image = this.skin.s0;
    //     let _w = _oneStar.width * _oneStar.scaleX;
    //     for(let i = 0;i < l.length;i++){
    //         let _star = l[i];
    //         if(i < v){
    //             _star.visible = true;
    //         }else{
    //             _star.visible = false;
    //         }
    //     }
    //     this.skin.stars.x = (this.skin.width - _w * v) / 2;
    //     if(v > 0){
    //         this.skin.starbg.visible  = true;
    //     }else{
    //         this.skin.starbg.visible  = false;
    //     }
    // }
}