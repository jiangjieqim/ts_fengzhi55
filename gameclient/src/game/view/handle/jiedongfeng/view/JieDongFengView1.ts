import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { MainModel } from "../../main/model/MainModel";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { JieDongFengModel } from "../model/JieDongFengModel";
import { NewplayerAttributeProxy } from "../proxy/JieDongFengProxy";

export class JieDongFengView1 extends ViewBase{
    private _ui:ui.views.jiedoufeng.ui_jiedoufengview1UI;
    protected mMask = true; 
    protected mMainSnapshot = true;

    protected onAddLoadRes() {
        this.addAtlas("jiedongfeng.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.jiedoufeng.ui_jiedoufengview1UI;
            this.bindClose(this._ui.close1);
            ButtonCtl.Create(this._ui.btn,new Laya.Handler(this,this.onBtnClick));

            this._ui.list.itemRender = ui.views.jiedoufeng.ui_jiedoufengitem1UI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);
            this._ui.list.selectEnable = true;
        }
    }

    private onBtnClick(){
        let cfg = this._ui.list.selectedItem;
        JieDongFengModel.Ins.setSelectId(cfg.f_attrtype,cfg.f_id);
        JieDongFengModel.Ins.event(JieDongFengModel.UpdataView);
        this.Close();
    }

    private onRenderHandler(item:ui.views.jiedoufeng.ui_jiedoufengitem1UI,index:number){
        if(index == this._ui.list.selectedIndex){
            item.img_xz.visible = true;
        }else{
            item.img_xz.visible = false;
        }
        let cfg = item.dataSource;
        item.img.skin = "o/adattr/" + cfg.f_icon;
        let arr = cfg.f_attribute.split(":");
        item.nameTf.text = MainModel.Ins.getAttrNameIdByID(parseInt(arr[0])) + ":" + attrConvert(parseInt(arr[0]),parseInt(arr[1]));
    }

    protected onInit(): void {
        this._ui.list.array = NewplayerAttributeProxy.Ins.getListByType(this.Data);
        this._ui.list.selectedIndex = 0;
    }

    protected onExit(): void {
        
    }
}