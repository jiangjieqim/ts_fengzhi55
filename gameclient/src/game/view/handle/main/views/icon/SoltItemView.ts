import { ui } from "../../../../../../ui/layaMaxUI";
import { MainModel } from "../../model/MainModel";
import { ItemVo } from "../../vos/ItemVo";
export class BaseSlotItemView extends Laya.Sprite{
    public setData(data) {
    }
}
interface ISlotSkin extends Laya.EventDispatcher{
    quality: Laya.Image;
    icon: Laya.Image;
    tf1: Laya.Label;
}
export class ItemSlotCtl extends Laya.EventDispatcher{
    // public custClickHandler:Laya.Handler;
    private _vo:ItemVo;
    private skin;
    constructor(skin:ISlotSkin){
        super();
        skin.on(Laya.Event.CLICK,this,this.onClickHandler);
        this.skin = skin;
    }
    private onClickHandler(e:Laya.Event){
        e.stopPropagation();
        this.event(Laya.Event.CLICK);
        if(!this._vo){
            return;
        }
        MainModel.Ins.showSmallTips(this._vo.getName(),this._vo.getDesc(),this.skin);
    }
    public setData(_vo:ItemVo){
        this._vo = _vo;
        if(!this._vo){
            return;
        }
        if(this.skin.quality){
            this.skin.quality.skin = _vo.quaIcon();
        }
        this.skin.icon.skin = _vo.getIcon();
        this.skin.tf1.text = _vo.count.toString();
    }
    dispose(){
        this._vo = null;
        this.skin.off(Laya.Event.CLICK,this,this.onClickHandler);
        this.skin = null;
    }
}

export class SoltItemView extends ui.views.main.ui_slot_itemUI{
    private ctl:ItemSlotCtl;
    constructor(){
        super();
        this.ctl = new ItemSlotCtl(this);
    }
    public setData(_vo:ItemVo){
        this.ctl.setData(_vo);
    }
}

export class SoltItemView3 extends ui.views.main.ui_slot_item3UI{
    private ctl:ItemSlotCtl;
    constructor(){
        super();
        this.ctl = new ItemSlotCtl(this);
    }
    public setData(_vo:ItemVo){
        this.ctl.setData(_vo);
        this.nameTf.text = _vo.getName();
    }
}

/**69*69小icon格子 */
export class SoltItemView2 extends ui.views.main.ui_slot_item2UI{
    private ctl:ItemSlotCtl;
    constructor(){
        super();
        this.ctl = new ItemSlotCtl(this);
    }
    public setData(_vo:ItemVo){
        this.ctl.setData(_vo);
    }
}

// /**冒险中的奖励预览 */
// export class NewAdventureSlotImg extends Laya.Image{
//     constructor(){
//         super();
//         this.width = this.height = 100;
//         this.on(Laya.Event.CLICK,this,this.onClickHandler);
//     }
//     public setData(_curQua:number){
//         let cfg:Configs.t_Spirit_Quality_dat = t_Spirit_Quality.Ins.GetDataById(_curQua);
//         this.dataSource = cfg;
//         let _imgSt = `o/spirits/${cfg.f_IconAdress}`;
//         this.skin = _imgSt;
//     }

//     private onClickHandler(e:Laya.Event){
//         let cfg:Configs.t_Spirit_Quality_dat = (e.target as Laya.Image).dataSource;
//         MainModel.Ins.showSmallTips(cfg.f_QualityName, cfg.f_desc, e.target);
//     }

// }