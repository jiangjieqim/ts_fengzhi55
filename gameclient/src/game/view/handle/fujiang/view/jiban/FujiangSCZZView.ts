import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../../frame/view/ViewBase";
import { ui } from "../../../../../../ui/layaMaxUI";
import { E } from "../../../../../G";
import { MainModel } from "../../../main/model/MainModel";
import { attrConvert } from "../../../main/vos/MainRoleVo";
import { FuJiangModel } from "../../model/FuJiangModel";
import { FuJiangTrammelsStageProxy } from "../../proxy/FuJiangProxy";

export class FujiangSCZZView extends ViewBase{
    private _ui:ui.views.fujiang.ui_fujiangSCZZViewUI;
    protected mMask = true;
    protected mMainSnapshot = true;

    protected onAddLoadRes() {
        this.addAtlas('fujiang.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.fujiang.ui_fujiangSCZZViewUI;
            this.bindClose(this._ui.close1);
            ButtonCtl.Create(this._ui.btn,new Laya.Handler(this,this.onBtnClick));

            this._ui.list.itemRender = ui.views.fujiang.ui_fujiangSCZZItemUI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);
        }
    }

    private onBtnClick(){
        E.ViewMgr.openHelpView("sczzTitle","sczzDec");
    }

    private onRenderHandler(item:ui.views.fujiang.ui_fujiangSCZZItemUI,index:number){
        if(index == this._index){
            item.bg.visible = true;
        }else{
            item.bg.visible = false;
        }
        let cfg:Configs.t_Trammels_Stage_dat = item.dataSource;
        item.lab_name.text = "总等级达到" + cfg.f_Level + "级";
        let arr = cfg.f_Attribute.split("|");
        for(let i:number=0;i<arr.length;i++){
            let id = parseInt(arr[i].split(":")[0]);
            let val = parseInt(arr[i].split(":")[1]);
            item["lab"+(i+1)].text = MainModel.Ins.getAttrNameIdByID(id) + "+" + attrConvert(id,val);
        }
    }

    private _index:number;
    protected onInit(): void {
        let arr = FuJiangModel.Ins.getSZNoList();
        let lv = 0;
        for(let i:number=0;i<arr.length;i++){
            lv += arr[i].level;
        }
        
        this._index = FuJiangTrammelsStageProxy.Ins.getCfgByLv(lv);
        this._ui.lab_lv.text = lv + "";
        this._ui.list.array = FuJiangTrammelsStageProxy.Ins.List;
        if(this._index > -1){
            this._ui.list.scrollTo(this._index);
        }else{
            this._ui.list.scrollTo(0);
        }
    }

    protected onExit(): void {
        
    }
}