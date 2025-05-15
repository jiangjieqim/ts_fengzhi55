import { ViewBase } from "../../../../../../frame/view/ViewBase";
import { ui } from "../../../../../../ui/layaMaxUI";
import { MainModel } from "../../../main/model/MainModel";
import { attrConvert } from "../../../main/vos/MainRoleVo";
import { FuJiangModel } from "../../model/FuJiangModel";
import { FuJiangTrammelsChiefProxy } from "../../proxy/FuJiangProxy";

export class FujiangJBSXView extends ViewBase{
    private _ui:ui.views.fujiang.ui_fujiangJBSXViewUI;
    protected mMask = true;
    protected mMainSnapshot = true;

    protected onAddLoadRes() {
        this.addAtlas('fujiang.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.fujiang.ui_fujiangJBSXViewUI;
            this.bindClose(this._ui.btn_close);

            this._ui.list.itemRender = ui.views.fujiang.ui_fujiangAttrItem6UI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);
        }
    }

    private onRenderHandler(item:ui.views.fujiang.ui_fujiangAttrItem6UI){
        let id = parseInt(item.dataSource.split(":")[0]);
        let val = parseInt(item.dataSource.split(":")[1]);
        item.tf1.text = MainModel.Ins.getAttrNameIdByID(id) + ":";
        item.valTf.text = attrConvert(id,val);
    }

    protected onInit(): void {
        let arr = [];
        for(let i:number=0;i<FuJiangModel.Ins.jbDataList.length;i++){
            if(FuJiangModel.Ins.jbDataList[i].id){
                let cfg = FuJiangTrammelsChiefProxy.Ins.GetDataById(FuJiangModel.Ins.jbDataList[i].id);
                let attrArr = cfg.f_Attribute.split(":");
                let fjArr = cfg.f_ChiefID.split("|");
                let star = 0;
                for(let j:number=0;j<fjArr.length;j++){
                    let fjCfg = FuJiangModel.Ins.getFuJiangCfgById(parseInt(fjArr[j]));
                    if(fjCfg){
                        star += fjCfg.star;
                    }
                }
                let val = parseInt(attrArr[1]);
                val += star * cfg.f_Upgrade;
                arr.push(attrArr[0] + ":" + val);
            }
        }
        this._ui.list.array = arr;
    }

    protected onExit(): void {
        
    }
}