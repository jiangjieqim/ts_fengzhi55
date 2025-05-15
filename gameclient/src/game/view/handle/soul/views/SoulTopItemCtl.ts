import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { stSpirit } from "../../../../network/protocols/BaseProto";
import {DotManager} from "../../common/DotManager";
import { ESoulFunc, SoulTipVo } from "../model/ESoulFunc";
import { SoulModel } from "../model/SoulModel";
import { t_Spirit_Attribute_Fixed, t_Spirit_Position } from "../model/SoulProxy";
import { f_headViewUpdate } from "./SoulIconItem";

export class SoulTopItemCtl{
    private skin:ui.views.soul.ui_soul_top_itemUI;
    private vo:stSpirit;
    private pos:number;

    constructor(skin:ui.views.soul.ui_soul_top_itemUI,pos:number=0,flag:boolean = true){
        this.skin = skin;
        this.pos = pos;
        if(pos && flag){
            this.skin.on(Laya.Event.CLICK,this,this.onClickHandler);
        }
    }

    private onClickHandler() {
        if (this.vo) {
            let cell = new SoulTipVo();
            cell.type.push(ESoulFunc.Unload, ESoulFunc.Intensify);
            cell.vo = this.vo;
            E.ViewMgr.Open(EViewType.SoulTips, null, cell);
        }
    }

    public refreshView(flag:boolean = true){
        let cell = SoulModel.Ins.getWearableByPos(this.pos);
        this.updateView(cell ? cell.vo : null,flag);
    }

    public updateView(vo:stSpirit,flag:boolean = true){
        this.vo = vo;
        let _iconPos:number = 0;
        let _qua:number = 0;
        DotManager.removeDot(this.skin);
        if(vo){
            this.skin.tf1.visible = false;
            this.skin.icon.visible = true;
            // this.skin.icon.skin = `o/spirits/${vo.spiritId}.png`;
            f_headViewUpdate(this.skin.icon,t_Spirit_Attribute_Fixed.Ins.getCfgBySpiritID(vo.spiritId).f_SpiritIconID);
            // t_Spirit_Attribute_Fixed.Ins.GetDataById(vo.spiritId);
            this.skin.lvTf.visible = true;
            if(vo.level > 0){
                this.skin.lvTf.text = "+"+vo.level.toString();
            }else{
                this.skin.lvTf.text = "";
            }
            _iconPos = vo.pos;
            _qua = vo.qualityId;
        }else{
            //未穿戴
            let posCfg:Configs.t_Spirit_Position_dat = t_Spirit_Position.Ins.getByPos(this.pos);
            this.skin.icon.visible = false;
            this.skin.tf1.visible = true;
            this.skin.tf1.text = posCfg.f_PositionName;
            this.skin.lvTf.visible = false;
            _iconPos = this.pos;

            if(SoulModel.Ins.getHasCanWear(this.pos) && flag){
                DotManager.addDot(this.skin);
            }
        }
        this.skin.bgicon.rotation = SoulModel.Ins.getRot(_iconPos);
        this.skin.bgicon.skin = SoulModel.Ins.getIcon(_qua);
    }
}