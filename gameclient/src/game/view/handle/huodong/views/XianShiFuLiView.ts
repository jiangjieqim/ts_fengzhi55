import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { ELayerType } from "../../../../layer/LayerMgr";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { ItemVo } from "../../main/vos/ItemVo";
import { EShopPayType } from "../../shop/proxy/shopProxy";
import { ActivityModel } from "../ActivityModel";
import { ActivityEvent } from "../model/ActivityEvent";
import { IPriceItem, t_Purchase_PriceProxy } from "../model/ActivityProxy";
import { PackEjectProxy } from "../model/ActivityProxy2";
import { ESkinRateBtn, RateBtn01Ctl, RateBtnUtils } from "./RateBtn01Ctl";
import { XianShiFuLiCtl } from "./XianShiFuLiCtl";

export class XianShiFuLiView extends ViewBase {
    private _ui: ui.views.huodong.ui_xianshifuli_viewUI;
    protected mMask = true;
    protected autoFree = true;
    protected mMainSnapshot = true;
    private _timeCtl:TimeCtl;
    private purchaseId: number;
    private btn1Ctl:ButtonCtl;
    private rateCtl:RateBtn01Ctl;
    private _ctl0:XianShiFuLiCtl;
    private _ctl1:XianShiFuLiCtl;
    private _ctl2:XianShiFuLiCtl;
    private _ctl3:XianShiFuLiCtl;
    private _ctl4:XianShiFuLiCtl;
    private _curBtnCtl:ButtonCtl;
    constructor(viewType: EViewType/*, viewPath: string*/,  layerType: ELayerType) {
        super(viewType, layerType);
    }

    protected onFirstInit() {
        if(!this.UI){
            this.UI = this._ui = new ui.views.huodong.ui_xianshifuli_viewUI;
            this.btn1Ctl = ButtonCtl.Create(this._ui.btn1,new Laya.Handler(this,this.onEnterHandler));
            this.btnList.push(
                ButtonCtl.Create(this._ui.close1,new Laya.Handler(this,this.onCloseHandler1)),
                this.btn1Ctl
            );
            this.rateCtl = new RateBtn01Ctl(this._ui.ratebtn,this,this.onEnterHandler,ESkinRateBtn.Yellow);
            this._ui.timeTf.text = "";
            this._timeCtl = new TimeCtl(this._ui.timeTf);

            this._ui.list.itemRender = ui.views.main.ui_slot_itemUI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onItemHandler);

            for(let i:number = 1;i<4;i++){
                this._ui["item" + i].on(Laya.Event.CLICK,this,this.onIconClick,[i]);
                this._ui["item" + i].visible = false;   
            }

            for(let i:number = 0;i<5;i++){
                this["_ctl" + i] = new XianShiFuLiCtl(this._ui["item" + i]);
            }
            this._ui.lab2.visible = false;
        }
    }

    private _isPlay:boolean;
    private onIconClick(value){
        let popArr = ActivityModel.Ins.getPopShowArr();
        if(value == 3){
            this._index++;
            this._isPlay = true;
            this._ui.img_l.visible = false;
            if(this._ui.item1.visible){
                this.setTween(1,1,false);
            }
            if(popArr[this._index + 1]){
                this.setTween(4,1,false);
            }
            this.setTween(2,1,false);
            this.setTween(3,1,true);
        }else if(value == 1){
            this._index--;
            this._isPlay = true;
            this._ui.img_l.visible = false;
            if(this._ui.item3.visible){
                this.setTween(3,2,false);
            }
            if(popArr[this._index - 1]){
                this.setTween(0,2,false);
            }
            this.setTween(1,2,false);
            this.setTween(2,2,true);
        }
    }

    private setTween(index:number,type:number,flag:boolean){
        let item = new ui.views.huodong.ui_xianshifuli_itemUI;
        item.x = this._ui["item" + index].x;
        item.y = this._ui["item" + index].y;
        item.scaleX = this._ui["item" + index].scaleX;   
        item.scaleY = this._ui["item" + index].scaleY;
        item.icon2.skin = this._ui["item" + index].icon2.skin;
        item.img_b2.skin = this._ui["item" + index].img_b2.skin;
        item.lab2.text = this._ui["item" + index].lab2.text;
        this._ui.panel.addChild(item);
        this._ui["item" + index].visible = false;

        let ii:number = 0;
        if(type == 1){
            ii = index - 1;
        }else{
            ii = index + 1;
        }
        let xx = this._ui["item" + ii].x;
        let yy = this._ui["item" + ii].y;
        let sx = this._ui["item" + ii].scaleX;
        let sy = this._ui["item" + ii].scaleY;
        Laya.Tween.to(item,{x:xx,y:yy,scaleX:sx,scaleY:sy},500,null,Laya.Handler.create(this,this.onTweenEnd,[item,flag]));
    }

    private onTweenEnd(item:ui.views.huodong.ui_xianshifuli_itemUI,flag:boolean){
        if(item){
            item.removeSelf();
            item = null;
        }
        if(flag){
            this.updateView();
        }
    }

    private onItemHandler(item:ui.views.main.ui_slot_itemUI){
        // item.refreshView();
        let vo = new ItemVo();
        vo.cfgId = item.dataSource.id;
        vo.count = item.dataSource.count;
        ItemViewFactory.refreshSlot(item,vo);
    }

    private updateView(){
        this._isPlay = false;
        this._ui.img_l.visible = true;
        let popArr = ActivityModel.Ins.getPopShowArr();
        if(popArr.length == 0){
            // this.Close();
            return;
        }
        if(popArr[this._index - 2]){
            this._ctl0.setData(this._index - 2);
        }
        if(popArr[this._index - 1]){
            this._ui.item1.visible = true;
            this._ctl1.setData(this._index - 1);
        }else{
            this._ui.item1.visible = false;
        }

        if(popArr[this._index + 2]){
            this._ctl4.setData(this._index + 2);
        }
        if(popArr[this._index + 1]){
            this._ui.item3.visible = true;
            this._ctl3.setData(this._index + 1);
        }else{
            this._ui.item3.visible = false;
        }

        this._ui.item2.visible = true;
        this._ctl2.setData(this._index);

        let vo = popArr[this._index];
        let activityVo = ActivityModel.Ins.getByUid(vo.uid);
        const config = PackEjectProxy.Ins.getRewardConf(parseInt(activityVo.eject_f_id));
        const purchaseId = config.purchaseId;
        let arr = config.cellValues;
        this._ui.list.array = arr;
        this._ui.list.width = (arr.length * 100) + (arr.length - 1) * this._ui.list.spaceX;
        this.purchaseId = purchaseId;
        const priceItem: IPriceItem = t_Purchase_PriceProxy.Ins.getPriceItemById(purchaseId);
        const price = parseFloat((priceItem.price / 100).toFixed(2));
        this._ui.tf1.text = `${price}元购买`;
        //==============================================================================
        this._curBtnCtl = this.btn1Ctl;
        let _purcCfg:Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(purchaseId);
        if(_purcCfg.f_isVoucher == EShopPayType.Voucher){
            this._curBtnCtl = this.rateCtl.btnCtl;
            this.rateCtl.cfg = _purcCfg;
        }
        RateBtnUtils.Refresh(this._curBtnCtl,this.btn1Ctl,this.rateCtl.btnCtl);
        //==============================================================================
        // let v = ActivityModel.Ins.getByUid(vo.uid);
        // const cfg = PackEjectProxy.Ins.getCfgByFid(parseInt(v.eject_f_id));
        // this._ui.lab_lb.text = cfg.f_packname;
        // this._ui.btn1.disabled = false;

        this._curBtnCtl.grayMouseDisable = false;
        let timeEnd = ActivityModel.Ins.getPopWinHideTime(activityVo.uid);
        if(timeEnd){
            this._timeCtl.start(timeEnd - TimeUtil.serverTime,new Laya.Handler(this,this.onUpdateTime),new Laya.Handler(this,this.endTime));
        }else{
            this.endTime();
            this._timeCtl.stop();
        }
    }

    private onUpdateTime(){
        let time_str = TimeUtil.subTime(this._timeCtl.tickVal);
        this._timeCtl.setText(time_str);
    }

    private endTime() {
        this._timeCtl.setText("已结束");
        // this._ui.btn1.disabled = true;
        if(this._curBtnCtl){
            this._curBtnCtl.grayMouseDisable = true;
        }
    }

    private onEnterHandler() {
        if(this._isPlay){
            return;
        }
        ActivityModel.Ins.recharge(this.purchaseId);
    }

    private onCloseHandler1(){
        E.ViewMgr.Close(this.ViewType);
    }

    protected onAddLoadRes() {
        this.addAtlas('huodong.atlas');
    }

    protected onExit() {
        ActivityModel.Ins.off(ActivityEvent.PopWinUpdate,this,this.onCheckClose);
        MainModel.Ins.off(MainEvent.Reward_revcUpdate,this,this.onUpdateView);
        this._timeCtl.stop();
    }

    private onCheckClose(){
        let arr = ActivityModel.Ins.getPopShowArr();
        if(arr.length <=0){
            this.Close();
        }
        this.updateView();
    }

    private _index:number;
    protected onInit() {
        ActivityModel.Ins.on(ActivityEvent.PopWinUpdate,this,this.onCheckClose);
        MainModel.Ins.on(MainEvent.Reward_revcUpdate,this,this.onUpdateView);
        if(this.Data){
            let arr = ActivityModel.Ins.getPopShowArr();
            this._index = arr.findIndex(o => o.uid === this.Data);
        }else{
            this._index = ActivityModel.Ins.getPopShowIndex();
        }
        this.updateView();
    }

    private onUpdateView(){
        this._index = ActivityModel.Ins.getPopShowIndex();
        this.updateView();
    }
}