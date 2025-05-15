import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { stGemArena } from "../../../../network/protocols/BaseProto";
import { BaoShiModel } from "../../baoshi/model/BaoShiModel";
import { FaZhengListProxy } from "../../baoshi/proxy/BaoShiProxy";
import { BaoShiAttrCtl } from "../../baoshi/view/ctl/BaoShiAttrCtl";
import { ItemProxy } from "../../main/proxy/ItemProxy";
import { IconUtils } from "../../zuoqi/vos/IconUtils";

export class JjcBSTip extends ViewBase{
    private _ui:ui.views.jjc.ui_jjc_bsTipUI;
    protected mMask = true;
    protected autoFree = true;
    private _baoshiAttrCtl:BaoShiAttrCtl;

    protected  onAddLoadRes(){
        
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.jjc.ui_jjc_bsTipUI;
            this.bindClose(this._ui.close1);
            this._baoshiAttrCtl = new BaoShiAttrCtl(this._ui.attr);
        }
    }

    protected onInit(): void {
        let data:stGemArena = this.Data;
        let cfg = FaZhengListProxy.Ins.getCfgById(data.formationId);
        let iCfg = ItemProxy.Ins.getCfg(cfg.f_itemid);
        this._ui.lab_name.text = main.itemName(iCfg.f_name);
        this._ui.quality.skin = IconUtils.getQuaIcon(iCfg.f_qua);
        this._ui.icon.skin = IconUtils.getIconByCfgId(cfg.f_itemid);
        this._ui.lab_fzsm.text = "法阵加成：" + BaoShiModel.Ins.getFZST(data.formationId);
        this._baoshiAttrCtl.setData(data.Gem,data.formationId);
    }

    protected onExit(): void {
        
    }
}