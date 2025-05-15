import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EMsgBoxType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { RideMissionLingQu_req, RideStorgeUp_req } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import {DotManager} from "../../common/DotManager";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { ZuoQiEvent } from "../vos/ZuoQiEvent";
import { Mount_MissionProxy } from "../vos/ZuoqiProxy";
import { ZuoQiModel } from "../ZuoqiModel";
import { ZuoQiYunShuItemView } from "./ZuoQiYunShuItemView";

// 坐骑运输
export class ZuoQiYunShunView extends ViewBase{
    private _ui:ui.views.zuoqi.ui_zuoqi_yunshuUI;
    private model:ZuoQiModel;
    private progressWidth:number = 0;
    protected mMask:boolean = true;
    protected autoFree = true;
    private yijianshouqubtnCtl:ButtonCtl;
    protected onAddLoadRes(): void{
        this.addAtlas("zuoqi.atlas");
    }
    protected onExit(): void{
        this.model.off(ZuoQiEvent.StorgeUpdate,this,this.updateView);
        this.model.off(ZuoQiEvent.DispathMission,this,this.onDispathMission);
        this.model.off(ZuoQiEvent.RedUpdate,this,this.onRedUpdate);
    }
    protected onFirstInit(): void{
        if(!this.UI){
            this.model = ZuoQiModel.Ins;
            this.UI = this._ui = new ui.views.zuoqi.ui_zuoqi_yunshuUI();
            this.progressWidth = this._ui.progress.width;
            this._ui.list1.itemRender = ZuoQiYunShuItemView;
            this._ui.list1.vScrollBarSkin = " ";
            this._ui.list1.array = [];
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onZuoQiItemHandler);
            this.yijianshouqubtnCtl = ButtonCtl.Create(this._ui.yijianshouqubtn,new Laya.Handler(this,this.onLingQuHandler));
            this.btnList.push(
            ButtonCtl.Create(this._ui.close1,new Laya.Handler(this,this.Close)),
            ButtonCtl.Create(this._ui.kuorongbtn,new Laya.Handler(this,this.onKuoRongHandler))
            );
        }
    }
    private onRedUpdate(){
        if(this.model.isFoodFull){
            DotManager.addDot(this.yijianshouqubtnCtl.skin);
        }else{
            DotManager.removeDot(this.yijianshouqubtnCtl.skin);
        }
    }
    /**扩容 */
    private onKuoRongHandler() {
        E.ViewMgr.ShowMsgBox(EMsgBoxType.OkOrCancel, E.LangMgr.getLang("UseItem", this.model.mStorageUpgradePrice.cntName), new Laya.Handler(this, this.onRideStorgeUp));
    }

    private onRideStorgeUp(){
        SocketMgr.Ins.SendMessageBin(new RideStorgeUp_req());
    }

    /**一键领取*/
    private onLingQuHandler(){
        SocketMgr.Ins.SendMessageBin(new RideMissionLingQu_req());
    }

    private onZuoQiItemHandler(item:ZuoQiYunShuItemView,index:number){
        item.setData(item.dataSource);
    }

    /**初始化*/
    protected onInit(): void{
        this._ui.list1.array = Mount_MissionProxy.Ins.List;
        this._ui.list1.scrollTo(0);
        this._ui.list1.refresh();
        this.model.on(ZuoQiEvent.StorgeUpdate,this,this.updateView);
        this.model.on(ZuoQiEvent.DispathMission,this,this.onDispathMission);
        this.model.on(ZuoQiEvent.RedUpdate,this,this.onRedUpdate);
        this.onRedUpdate();
        this.updateView();
    }

    private onDispathMission(){
        this._ui.list1.refresh();
        ItemViewFactory.renderItemSlots(this._ui.itemContainer,this.model.serverTransitReward);
    }

    private updateView(){
        this._ui.storgeTf.text = this.model.food + "/" + this.model.foodTotal;
        this._ui.progress.width = this.progressWidth*(this.model.food / this.model.foodTotal);
        this.onDispathMission();
    }
}