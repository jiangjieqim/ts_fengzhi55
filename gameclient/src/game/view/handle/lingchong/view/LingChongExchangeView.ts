import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { PetSoulExchange_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { EGameColor } from "../../main/model/EGameColor";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { ItemVo } from "../../main/vos/ItemVo";
import { t_Pet_Fusion_Protection } from "../proxy/LingChongProxy";

class  LingChongExchangeItemView extends ui.views.lingchong.ui_lingchongExchangeItemUI{
    private _cfg:Configs.t_Pet_Fusion_Protection_dat;
    private price:ItemVo;
    private exchangeItem:ItemVo;
    constructor(){
        super();
        DebugUtil.draw(this);
        DebugUtil.draw(this.moneyIcon);
        this.on(Laya.Event.CLICK,this,this.onClickHandler);
    }
    private onClickHandler(){
        MainModel.Ins.buyItem(this.price,this.exchangeItem,new Laya.Handler(this,this.onOkHandler),null,true);
    }

    private onOkHandler(){
        let req = new PetSoulExchange_req();
        req.fid = this._cfg.f_id;
        SocketMgr.Ins.SendMessageBin(req);
    }
    refresh(){
        this._cfg = this.dataSource;
        let price:ItemVo = ItemViewFactory.convertItem(this._cfg.f_price);
        this.price = price;
        this.moneyIcon.skin = price.getIcon();
        let haveCount:number = MainModel.Ins.mRoleData.getVal(this.price.cfgId);
        this.moneyNumLabel.text =  haveCount+"/"+price.count;
        if(haveCount >= this.price.count){
            this.moneyNumLabel.color = "#ffeec2";
        }else{
            this.moneyNumLabel.color = EGameColor.RED;
        }

        let exchangeItem = ItemViewFactory.convertItem(this._cfg.f_exchangeitem);
        this.exchangeItem = exchangeItem;
        this.iconBg.skin = exchangeItem.quaIcon();
        this.countLabel.text = exchangeItem.count + "";
        this.icon.skin = exchangeItem.getIcon();
        this.itemNameLabel.text = this.exchangeItem.getName();
    }
}

export class LingChongExchangeView extends ViewBase{
    private _ui:ui.views.lingchong.ui_lingchongExchangeUI;
    protected mMask = true;
    protected  onAddLoadRes(): void{}
    protected  onExit(): void{
        MainModel.Ins.off(MainEvent.ValChange,this,this.onUpdateView);
    }
    protected  onFirstInit(): void{
        if(!this.UI){
            this.UI = this._ui = new ui.views.lingchong.ui_lingchongExchangeUI();
            this.bindClose(this._ui.btn_close);
            this._ui.list1.itemRender = LingChongExchangeItemView;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onItemRender);
        }
    }
    private onItemRender(item:LingChongExchangeItemView){
        item.refresh();
    }
    protected  onInit(): void{
        MainModel.Ins.on(MainEvent.ValChange,this,this.onUpdateView);
        this.onUpdateView();
    }

    private onUpdateView(){
        this._ui.list1.array = t_Pet_Fusion_Protection.Ins.List;
        this._ui.list1.scrollTo(0);
    }

}