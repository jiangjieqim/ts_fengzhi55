import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { WuShenDianCoreBuffProxy, WuShenDianDataTypeProxy } from "../proxy/WuShenDianProxy";
import { ShenHunCtl } from "./ctl/ShenHunCtl";

export class WuShenDianTJView extends ViewBase{
    private _ui:ui.views.wushendian.ui_wushendianTJViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree = true;
    private _ctl1:ShenHunCtl;
    private _ctl2:ShenHunCtl;
    private _ctl3:ShenHunCtl;

    protected onAddLoadRes() {
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.wushendian.ui_wushendianTJViewUI;
            this.bindClose(this._ui.close1);

            this._ui.list.itemRender = ui.views.wushendian.ui_wushendianTJItemUI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onItemRender);
            this._ui.list.selectEnable = true;
            this._ui.list.array = WuShenDianDataTypeProxy.Ins.List;

            this._ctl1 = new ShenHunCtl(this._ui.item1);
            this._ctl2 = new ShenHunCtl(this._ui.item2);
            this._ctl3 = new ShenHunCtl(this._ui.item3);
        }
    }

    protected onInit(): void {
        this._ui.list.selectedIndex = 0;
    }

    protected onExit(): void {
        
    }

    private onItemRender(item:ui.views.wushendian.ui_wushendianTJItemUI,index:number){
        let cfg:Configs.t_Palace_DataType_dat = item.dataSource;
        item.img_qua.skin = IconUtils.getQuaIcon(cfg.f_ColorID);
        item.icon.skin = "o/Palace/" + cfg.f_Icon + ".png";
        item.lab_name.text = cfg.f_TypeName;

        if(index == this._ui.list.selectedIndex){
            this._ctl1.setData(cfg.f_ColorID,cfg.f_Icon,cfg.f_TypeName);

            let arr = WuShenDianCoreBuffProxy.Ins.getListByType(cfg.f_CoreBuffType);
            this._ctl2.setData(arr[0].f_ColorID,arr[0].f_Icon,arr[0].f_CorebuffName);
            this._ui.lab_dec1.text = arr[0].f_Corebuffdes;

            this._ctl3.setData(arr[1].f_ColorID,arr[1].f_Icon,arr[1].f_CorebuffName);
            this._ui.lab_dec2.text = arr[1].f_Corebuffdes;

            item.img_sel.visible = true;
        }else{
            item.img_sel.visible = false;
        }
    }
}