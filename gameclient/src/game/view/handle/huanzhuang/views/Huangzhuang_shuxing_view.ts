import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { MainModel } from "../../main/model/MainModel";
import { attrConvert } from "../../main/vos/MainRoleVo";
/**属性展示 */
export class Huangzhuang_shuxing_view extends ViewBase {
    private _ui:ui.views.huanzhuang.ui_huangzhuang_shuxing_viewUI;
    protected mMask: boolean = true;
    protected autoFree = true;
    protected onAddLoadRes(): void { }
    protected onExit(): void { }
    protected onFirstInit(): void { 
        if(!this.UI){
            this.UI = this._ui = new ui.views.huanzhuang.ui_huangzhuang_shuxing_viewUI();
            this.bindClose(this._ui.close1);
            this._ui.list1.itemRender = ui.views.main.ui_main_attrUI;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onAttrHandler);
        }
    }
    private onAttrHandler(skin: ui.views.main.ui_main_attrUI){
        let arr = (skin.dataSource as string).split(":");
        let id = parseInt(arr[0]);
        let val = attrConvert(id,parseInt(arr[1]));
        skin.tf1.text = MainModel.Ins.getAttrNameIdByID(id);
        skin.valTf.text =  val;
        skin.upimg.visible = false;
    }
    protected onInit(): void { 
        // let l:number[] = HuanZhuangModel.Ins.suitList;
        // let str = "";
        // for (let i = 0; i < l.length; i++) {
        //     let id: number = l[i];
        //     if (id) {
        //         let cfg: Configs.t_Custom_Costumes_dat = t_Custom_CostumesProxy.Ins.GetDataById(id);
        //         str += cfg.f_SuitID + "|";
        //     }
        // }
        // if(str.length > 0){
        //     str = str.substr(0,str.length -1);
        // }
        // let arr:string[] = PlayerVoFactory.mergeAttr(str);
        this._ui.list1.array = this.Data;//arr;
        this._ui.list1.scrollTo(0);
    }
}