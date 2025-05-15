import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { stChief } from "../../../../network/protocols/BaseProto";
import { MainModel } from "../../main/model/MainModel";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { FuJiangListProxy } from "../proxy/FuJiangProxy";

export class FuJiangAttrView extends ViewBase{
    private _ui:ui.views.fujiang.ui_fujiangAttrViewUI;
    protected mMask = true;
    protected mMainSnapshot = true;

    protected onAddLoadRes() {}

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.fujiang.ui_fujiangAttrViewUI;

            this.bindClose(this._ui.close1);

            this._ui.list4.itemRender = ui.views.fujiang.ui_fujiangAttrItemUI;
            this._ui.list4.renderHandler = new Laya.Handler(this,this.onRenderHandler4);
            this._ui.list5.itemRender = ui.views.fujiang.ui_fujiangAttrItemUI;
            this._ui.list5.renderHandler = new Laya.Handler(this,this.onRenderHandler5);
        }
    }

    private _data:stChief;
    protected onInit(): void {
        this._data = this.Data;
        let cCfg = FuJiangListProxy.Ins.getCfgById(this._data.cheifId);
        this._ui.list4.array = this._data.attrs;
        this._ui.list5.array = cCfg.f_specialattrinit.split("|");
    }

    protected onExit(): void {
        
    }

    private onRenderHandler4(item:ui.views.fujiang.ui_fujiangAttrItemUI){
        let id = parseInt(item.dataSource.id);
        let val = parseInt(item.dataSource.value);
        item.tf1.text = MainModel.Ins.getAttrNameIdByID(id) + ":";
        item.valTf.text = attrConvert(id,val);
        item.lab.visible = false;
    }

    private onRenderHandler5(item:ui.views.fujiang.ui_fujiangAttrItemUI,index:number){
        item.tf1.color = item.valTf.color = "#FB5AFB";
        let id = parseInt(item.dataSource.split(":")[0]);
        let val = parseInt(item.dataSource.split(":")[1]);

        let cCfg = FuJiangListProxy.Ins.getCfgById(this._data.cheifId);
        let lvSt = cCfg.f_specialupgrade.split("|")[index];
        let starSt = cCfg.f_specialupstar.split("|")[index];
        let lvNum:number = parseInt(lvSt.split(":")[1]) * (this._data.level - 1);
        let starNum:number = parseInt(starSt.split(":")[1]) * (this._data.star - 1);

        val = val + lvNum + starNum;
        item.tf1.text = MainModel.Ins.getAttrNameIdByID(id) + ":";

        let starLv = parseInt(cCfg.f_specialunlock.split("|")[index]);
        if(this._data.star >= starLv){
            item.tf1.color = item.valTf.color = "#FB5AFB";
            item.valTf.text = attrConvert(id,val);
            item.lab.visible = false;
        }else{
            item.tf1.color = item.valTf.color = "#D3D3D3";
            item.valTf.text = attrConvert(id,val);
            item.lab.visible = true;
            item.lab.text = "(" + starLv + "星)";
        }
    }
}