import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { SocketMgr } from "../../../../network/SocketMgr";
import { OptionalGift_req, stOptionalGift, stOptionalItem } from "../../../../network/protocols/BaseProto";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { ZiXuanLiBaoModel } from "../model/ZiXuanLiBaoModel";

export class ZiXuanLiBaoView1 extends ViewBase{
    private _ui:ui.views.zixuanlibao.ui_zixuanlibaoView1UI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree = true;

    protected onAddLoadRes() {
        this.addAtlas("zixuanlibao.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.zixuanlibao.ui_zixuanlibaoView1UI;
            this.bindClose(this._ui.btn_close);

            this.btnList.push(
                ButtonCtl.Create(this._ui.btn_qx,new Laya.Handler(this,this.onBtnQXClick)),
                ButtonCtl.Create(this._ui.btn_qr,new Laya.Handler(this,this.onBtnQRClick))
             )

            this._ui.sp_1.on(Laya.Event.CLICK,this,this.onClick1);
            this._ui.sp_2.on(Laya.Event.CLICK,this,this.onClick2);

            this._ui.list.itemRender = ui.views.main.ui_slot_itemUI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);
            this._ui.list.selectEnable = true;
        }
    }

    private onRenderHandler(item:ui.views.main.ui_slot_itemUI,index:number){
        let itemVo = ItemViewFactory.convertItemList(item.dataSource)[0];
        ItemViewFactory.refreshSlot(item, itemVo);
        if(index == this._ui.list.selectedIndex){
            this._ui["item" + this._indexItem].quality.visible = false;
            this._ui["item" + this._indexItem].item.visible = true;
            let st = this.cfg["f_OptionalReward" + this._indexItem].split("|")[index];
            let itemVo = ItemViewFactory.convertItemList(st)[0];
            ItemViewFactory.refreshSlot(this._ui["item" + this._indexItem].item, itemVo);
            let ii = this._vo.items.findIndex(ele => ele.pos == this._indexItem);
            if(ii != -1){
                this._vo.items[ii].itemIdx = index;
            }else{
                let vo:stOptionalItem = new stOptionalItem();
                vo.pos = this._indexItem;
                vo.itemIdx = index;
                this._vo.items.push(vo);
            }
        }
    }

    private onBtnQXClick(){
        this.Close();
    }

    private onBtnQRClick(){
        if(this._vo.items.length == 0){
            E.ViewMgr.ShowMidError("请选择道具");
            return;
        }
        let req:OptionalGift_req = new OptionalGift_req;
        let cell = new stOptionalGift();
        cell.id = this._vo.id;
        let items = [];
        for(let i:number=0;i<this._vo.items.length;i++){
            let item:stOptionalItem = new stOptionalItem();
            item.itemIdx = this._vo.items[i].itemIdx;
            item.pos = this._vo.items[i].pos;
            items.push(item);
        }
        cell.items = items;
        req.dataList = [cell];
        SocketMgr.Ins.SendMessageBin(req);
        this.Close();
    }

    private onClick1(){
        this._ui.img1.visible = true;
        this._ui.img2.visible = false;
        this._indexItem = 1;
        this._ui.list.selectedIndex = -1;
        this._ui.list.array = this.cfg.f_OptionalReward1.split("|");
    }

    private onClick2(){
        this._ui.img1.visible = false;
        this._ui.img2.visible = true;
        this._indexItem = 2;
        this._ui.list.selectedIndex = -1;
        this._ui.list.array = this.cfg.f_OptionalReward2.split("|");
    }

    private cfg:Configs.t_RecurringActivity_OptionalPack_dat;
    private _indexItem:number;
    private _vo:stOptionalGift;
    protected onInit(): void {
        this.cfg = this.Data;
        this._ui.img1.visible = true;
        this._ui.img2.visible = false;
        this._indexItem = 1;
        this._ui.list.array = this.cfg.f_OptionalReward1.split("|");

        let value = ZiXuanLiBaoModel.Ins.dataList.find(ele => ele.id == this.cfg.f_id);
        this._vo = JSON.parse(JSON.stringify(value));

        let voo = this._vo.items.find(ele => ele.pos == 1);
        if (voo) {
            this._ui.item1.quality.visible = false;
            this._ui.item1.item.visible = true;
            let st = this.cfg.f_OptionalReward1.split("|")[voo.itemIdx];
            let itemVo = ItemViewFactory.convertItemList(st)[0];
            ItemViewFactory.refreshSlot(this._ui.item1.item, itemVo);
        } else {
            this._ui.item1.quality.visible = true;
            this._ui.item1.item.visible = false;
        }

        if(this.cfg.f_OptionalReward2 == ""){
            this._ui.sp2.visible = false;
            this._ui.sp1.x = 257;
        }else{
            this._ui.sp2.visible = true;
            this._ui.sp1.x = 187;

            voo = this._vo.items.find(ele => ele.pos == 2);
            if (voo) {
                this._ui.item2.quality.visible = false;
                this._ui.item2.item.visible = true;
                let st = this.cfg.f_OptionalReward2.split("|")[voo.itemIdx];
                let itemVo = ItemViewFactory.convertItemList(st)[0];
                ItemViewFactory.refreshSlot(this._ui.item2.item, itemVo);
            } else {
                this._ui.item2.quality.visible = true;
                this._ui.item2.item.visible = false;
            }
        }
    }

    protected onExit(): void {
        
    }
}