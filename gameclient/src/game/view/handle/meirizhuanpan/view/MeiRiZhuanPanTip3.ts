import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { SocketMgr } from "../../../../network/SocketMgr";
import { DailyWheelBigPrize_req } from "../../../../network/protocols/BaseProto";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { ItemVo } from "../../main/vos/ItemVo";
import { WheelRewardsProxy } from "../proxy/MeiRiZhuanPanProxy";

export class MeiRiZhuanPanTip3 extends ViewBase{
    private _ui:ui.views.meirizhuanpan.ui_meirizhuanpan3UI;
    protected mMask = true; 
    protected mMainSnapshot = true;

    protected onAddLoadRes() {
        this.addAtlas("meirizhuanpan.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.meirizhuanpan.ui_meirizhuanpan3UI;
            this.bindClose(this._ui.close1);
            this._ui.list.itemRender = ui.views.meirizhuanpan.ui_meirizhuanItemUI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onItemRendler);
            this._ui.list.selectEnable = true;

            ButtonCtl.Create(this._ui.btn,new Laya.Handler(this,this.onBtnClick));
        }
    }

    private onItemRendler(item:ui.views.meirizhuanpan.ui_meirizhuanItemUI,index:number){
        let vo:ItemVo = new ItemVo;
        vo.cfgId = parseInt(item.dataSource.split("-")[0]);
        vo.count = parseInt(item.dataSource.split("-")[1]);
        ItemViewFactory.refreshSlot(item.item,vo,false);
        item.lab.text = vo.getName();
        if(index == this._ui.list.selectedIndex){
            item.img_xz.visible = true;
        }else{
            item.img_xz.visible = false;
        }
    }

    private onBtnClick(){
        let req:DailyWheelBigPrize_req = new DailyWheelBigPrize_req;
        let id = parseInt(this._ui.list.selectedItem.split("-")[0]);
        req.itemId = id;
        SocketMgr.Ins.SendMessageBin(req);
        this.Close();
    }

    protected onInit(): void {
        let arr = WheelRewardsProxy.Ins.List;
        let array = [];
        for(let i:number=0;i<arr.length;i++){
            if(arr[i].f_ischoose == 1){
                array = arr[i].f_Rewards.split("|");
                break;
            }
        }
        this._ui.list.array = array;
        this._ui.list.selectedIndex = 0;
    }

    protected onExit(): void {
        
    }
}