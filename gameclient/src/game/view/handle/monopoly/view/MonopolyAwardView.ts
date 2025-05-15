import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { stMonopolyMapInfo } from "../../../../network/protocols/BaseProto";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MonopolyMapProxy, MonopolyRoundRewardsProxy } from "../proxy/MonopolyProxy";

export class MonopolyAwardView extends ViewBase{
    private _ui:ui.views.monopoly.ui_MonopolyAwardViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree:boolean = true;

    protected onAddLoadRes() {
        this.addAtlas("monopoly.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.monopoly.ui_MonopolyAwardViewUI;
            this.bindClose(this._ui.close1);
            this.btnList.push(
                // ButtonCtl.Create(this._ui.btn,new Laya.Handler(this,this.onBtnClick))
            );

            this._ui.list.itemRender = ui.views.monopoly.ui_MonopolyAwardItemUI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRender);
        }
    }

    private onRender(item:ui.views.monopoly.ui_MonopolyAwardItemUI,index:number){
        if(index >= this._arr.length - 1){
            item.lab.text = `10圈游历后重复奖励`;
        }else{
            item.lab.text = `进行${item.dataSource.f_Round}圈游历`;
        }
        ItemViewFactory.renderItemSlots(item.rewardList,item.dataSource.f_RoundRewards,10,0.8,"right");
    }

    private _data:stMonopolyMapInfo;
    private _arr;
    protected onInit(): void {
        this._data = this.Data;
        let cfg:Configs.t_Monopoly_Map_dat = MonopolyMapProxy.Ins.GetDataById(this._data.fid);
        this._arr = MonopolyRoundRewardsProxy.Ins.getListByEventAndArea(cfg.f_EventType,cfg.f_AreaID);
        this._ui.list.array = this._arr;
    }

    protected onExit(): void {
        
    }
}