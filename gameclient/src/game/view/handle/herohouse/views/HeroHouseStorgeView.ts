import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { ItemVo } from "../../main/vos/ItemVo";
import { HeroHouseModel } from "../HeroHouseModel";
import { HeroHouseMainView } from "./HeroHouseMainView";
import { HeroHouseStorgeItemView } from "./HeroHouseStorgeItemView";
export class HeroItemSelVo{
    /**是否是无限数量 */
    infinite:boolean;
    itemVo:ItemVo;
    index:number;
    public get itemId(){
        return this.itemVo.cfgId;
    }
}

/**武馆仓库 */
export class HeroHouseStorgeView extends ViewBase {
    private _ui:ui.views.hero_house.ui_hero_house_storgeUI;
    private _dataList:HeroItemSelVo[];

    protected mMask:boolean = true;
    protected onAddLoadRes(): void { }
    protected onExit(): void { }
    protected selBtnCtl:ButtonCtl;
    protected onFirstInit(): void { 
        if(!this.UI){
            this.UI = this._ui = new ui.views.hero_house.ui_hero_house_storgeUI();
            this.bindClose(this._ui.close1);
            this.selBtnCtl = ButtonCtl.CreateBtn(this._ui.qichenBtn, this, this.onSelectHandler);

            this._ui.list1.itemRender = HeroHouseStorgeItemView;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onItemHandler);
        }
    }

    private onItemHandler(item:HeroHouseStorgeItemView){
        item.refresh();
    }

    private onSelectHandler(){
        this.Close();
    }

    public refreshSelView(index: number) {
        let l = this._dataList;
        for (let i = 0; i < l.length; i++) {
            let cell = l[i];
            let v:boolean = false;
            if (cell.index == index) {
                v = true;
            } 
            if(v){
                HeroHouseModel.Ins.curStorgeItemId = cell.itemId;
            }
        }
        this._ui.list1.refresh();
        let view:HeroHouseMainView = E.ViewMgr.Get(EViewType.HeroHouse) as HeroHouseMainView;
        view.onUpdatePopView();
    }

    protected onInit(): void {
        this._dataList = HeroHouseModel.Ins.getStorgeList();
        this._ui.list1.array = this._dataList;
        this._ui.list1.scrollTo(0);
    }
}