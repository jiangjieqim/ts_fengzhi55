import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { HuYouAttrNameProxy } from "../../huyou/proxy/HuYouProxy";
import { MainModel } from "../../main/model/MainModel";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { PlayerVoFactory } from "../../main/vos/PlayerVoFactory";

export class JjcHYTip extends ViewBase{
    private _ui:ui.views.jjc.ui_jjc_hyTipUI;
    protected mMask = true;
    protected autoFree = true;

    protected  onAddLoadRes(){
        
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.jjc.ui_jjc_hyTipUI;
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
        let list = this.Data.attrList;
        let str = "";
        let arr:Configs.t_Blessing_Attribute_Name_dat[] = HuYouAttrNameProxy.Ins.List;
        for(let ele of arr){
            let vo = list.find(item => item.id == parseInt(ele.f_AttributeID));
            if(vo){
                str += vo.id + ":" + vo.value + "|";
            }else{
                str += ele.f_AttributeID + ":" + 0 + "|";
            }
        }
        if(str.length > 0){
            str = str.substr(0,str.length -1);
        }
        let array:string[] = PlayerVoFactory.mergeAttr(str);
        this._ui.list1.array = array;
    }

    protected onExit(): void {
        
    }
}