import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { AllianceWarBounsProxy } from "../proxy/AllianceFightProxy";

export class AllianceFightAwardView2 extends ViewBase{
    private _ui:ui.views.allianceFight.ui_allianceFightAwardView2UI;
    protected autoFree: boolean = true;
    protected mMask = true;
    protected mMainSnapshot = true;

    protected onAddLoadRes() {
        this.addAtlas('allianceFight.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.allianceFight.ui_allianceFightAwardView2UI;
            this.bindClose(this._ui.close1);
            this.btnList.push(
                ButtonCtl.Create(this._ui.btn1,new Laya.Handler(this,this.onBtn1Click),false),
                ButtonCtl.Create(this._ui.btn2,new Laya.Handler(this,this.onBtn2Click),false),
                ButtonCtl.Create(this._ui.btn3,new Laya.Handler(this,this.onBtn3Click),false),
            );

            this._ui.list.itemRender = ui.views.allianceFight.ui_allianceFightAwardItemUI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);
        }
    }

    private onRenderHandler(item:ui.views.allianceFight.ui_allianceFightAwardItemUI){
        item.lab.text = item.dataSource.f_ClickTimes;
        ItemViewFactory.renderItemSlots(item.sp,item.dataSource.f_Rewards,10,0.8,"right");
    }

    private onBtn1Click(){
        let arr = AllianceWarBounsProxy.Ins.getCfgByRank(1);
        this._ui.list.array = arr;
        this._ui.btn1.skin = "remote/alliance/anniu_2.png";
        this._ui.btn2.skin = this._ui.btn3.skin = "remote/alliance/anniu_1.png";
    }

    private onBtn2Click(){
        let arr = AllianceWarBounsProxy.Ins.getCfgByRank(2);
        this._ui.list.array = arr;
        this._ui.btn2.skin = "remote/alliance/anniu_2.png";
        this._ui.btn1.skin = this._ui.btn3.skin = "remote/alliance/anniu_1.png";
    }

    private onBtn3Click(){
        let arr = AllianceWarBounsProxy.Ins.getCfgByRank(3);
        this._ui.list.array = arr;
        this._ui.btn3.skin = "remote/alliance/anniu_2.png";
        this._ui.btn1.skin = this._ui.btn2.skin = "remote/alliance/anniu_1.png";
    }

    protected onInit(): void {
        this.onBtn1Click();
        let arr = AllianceWarBounsProxy.Ins.getCfgByRank(1);
        this._ui.lab_tab1.text =  arr[0].f_BounsName;
        arr = AllianceWarBounsProxy.Ins.getCfgByRank(2);
        this._ui.lab_tab2.text =  arr[0].f_BounsName;
        arr = AllianceWarBounsProxy.Ins.getCfgByRank(3);
        this._ui.lab_tab3.text =  arr[0].f_BounsName;
    }

    protected onExit(): void {
        
    }
}