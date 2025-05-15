import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { stSpiritArena } from "../../../../network/protocols/BaseProto";
import { MainModel } from "../../main/model/MainModel";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { SoulModel } from "../../soul/model/SoulModel";
import { t_Spirit_Attribute_Fixed, t_Spirit_Position } from "../../soul/model/SoulProxy";
import { f_headViewUpdate } from "../../soul/views/SoulIconItem";

export class JjcZHTip extends ViewBase{
    private _ui:ui.views.jjc.ui_jjc_zhTipUI;
    protected mMask = true;
    protected autoFree = true;

    private _attrID = [10002,10003,10004,10005];

    protected  onAddLoadRes(){
        
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.jjc.ui_jjc_zhTipUI;
            this.bindClose(this._ui.close1);

            this._ui.list1.itemRender = ui.views.soul.ui_soul_attr_itemUI;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onRenderAttrHandler);

            this._ui.list2.itemRender = ui.views.soul.ui_soul_attr_itemUI;
            this._ui.list2.renderHandler = new Laya.Handler(this,this.onRenderAttrHandler);
        }
    }

    private onRenderAttrHandler(skin:ui.views.soul.ui_soul_attr_itemUI){
        skin.attrtf.text = MainModel.Ins.getAttrNameIdByID(skin.dataSource.id);
        skin.valtf.text = attrConvert(skin.dataSource.id,skin.dataSource.value);
    }

    protected onInit(): void {
        let data:stSpiritArena = this.Data;
        for(let i:number = 0;i < 4; i++){
            let posCfg:Configs.t_Spirit_Position_dat = t_Spirit_Position.Ins.getByPos(i + 1);
            let vo = data.spiritInfo.find(ele => ele.pos == i + 1);
            if(vo){
                this._ui["item" + i].tf1.visible = false;
                this._ui["item" + i].icon.visible = true;
                f_headViewUpdate(this._ui["item" + i].icon,t_Spirit_Attribute_Fixed.Ins.getCfgBySpiritID(vo.spiritId).f_SpiritIconID);
                this._ui["item" + i].lvTf.visible = true;
                if(vo.level > 0){
                    this._ui["item" + i].lvTf.text = "+"+vo.level.toString();
                }else{
                    this._ui["item" + i].lvTf.text = "";
                }
                let cfg = t_Spirit_Attribute_Fixed.Ins.GetDataById(vo.spiritId)
                this._ui["item" + i].bgicon.skin = SoulModel.Ins.getIcon(cfg.f_SpiritQuality);
            }else{
                this._ui["item" + i].tf1.visible = true;
                this._ui["item" + i].tf1.text = posCfg.f_PositionName;
                this._ui["item" + i].icon.visible = false;
                this._ui["item" + i].lvTf.visible = false;
                this._ui["item" + i].bgicon.skin = SoulModel.Ins.getIcon(0);
            }
            this._ui["item" + i].bgicon.rotation = SoulModel.Ins.getRot(i + 1);
        }

        let arr = [];
        let arr1 = [];
        for(let i:number=0;i<data.attrList.length;i++){
            if(this._attrID.indexOf(data.attrList[i].id) != -1){
                arr.push(data.attrList[i]);
            }else{
                arr1.push(data.attrList[i]);
            }
        }
        this._ui.list1.array = arr;
        this._ui.list2.array = arr1;
    }

    protected onExit(): void {
        
    }
}