import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { MainModel } from "../../main/model/MainModel";
import { attrConvert } from "../../main/vos/MainRoleVo";

export class JjcWGTip extends ViewBase{
    private _ui:ui.views.jjc.ui_jjc_wgTipUI;
    protected mMask = true;
    protected autoFree = true;
    protected  onAddLoadRes(){
        
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.jjc.ui_jjc_wgTipUI;
            this.bindClose(this._ui.close1);

            this._ui.list1.itemRender = ui.views.hero_house.ui_hero_house_attr1UI;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onRenderAttrHandler);

            this._ui.list2.itemRender = ui.views.hero_house.ui_hero_house_attr1UI;
            this._ui.list2.renderHandler = new Laya.Handler(this,this.onRenderAttrHandler);
        }
    }

    private onRenderAttrHandler(skin:ui.views.hero_house.ui_hero_house_attr1UI){
        skin.tf1.text = MainModel.Ins.getAttrNameIdByID(skin.dataSource.id);
        skin.valTf.text = attrConvert(skin.dataSource.id,skin.dataSource.value);
    }

    protected onInit(): void {
        this._ui.list1.array = this.Data.gymAttrList;
        this._ui.list2.array = this.Data.roomAttrList;
    }

    protected onExit(): void {
        
    }
}