import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { MainModel } from "../../main/model/MainModel";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { FuJiangModel } from "../model/FuJiangModel";
import { FuJiangListProxy } from "../proxy/FuJiangProxy";

export class FuJiangAttrView1 extends ViewBase{
    private _ui:ui.views.fujiang.ui_fujiangAttrView1UI;
    protected mMask = true;
    protected mMainSnapshot = true;

    protected onAddLoadRes() {}

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.fujiang.ui_fujiangAttrView1UI;

            this.bindClose(this._ui.btn_close);

            this._ui.list1.itemRender = ui.views.fujiang.ui_fujiangAttrItem8UI;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onRenderHandler1);
        }
    }

    private onRenderHandler1(item:ui.views.fujiang.ui_fujiangAttrItem8UI){
        let id = parseInt(item.dataSource.split(":")[0]);
        let val = parseInt(item.dataSource.split(":")[1]);
        val = val + FuJiangModel.Ins.getFZFJJCAttr(id);
        item.tf1.text = MainModel.Ins.getAttrNameIdByID(id) + ":";
        item.valTf.text = attrConvert(id,val);

        let idd;
        switch (id) {
            case 10026:
                idd = 10002;
                break;
            case 10027:
                idd = 10003;
                break;
            case 10028:
                idd = 10004;
                break;
            case 10029:
                idd = 10005;
                break;
        }
        let val1 = MainModel.Ins.mRoleData.getVal(idd);
        item.lab.text = "主角当前" + MainModel.Ins.getAttrNameIdByID(id) + ":" + val1;
        let val2 = val1 * (val / 10000);
        item.lab1.text = "+" + Math.floor(val2);
    }

    protected onInit(): void {
        let cCfg = FuJiangListProxy.Ins.getCfgById(this.Data.cheifId);
        this._ui.list1.array = cCfg.f_inherit.split("|");
    }

    protected onExit(): void {
        
    }
}