import {StringUtil} from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { FontClipCtl } from "../../avatar/ctl/FontClipCtl";
import { FontCtlFactory } from "../../avatar/ctl/FontCtlFactory";
import { t_Spirit_Quality } from "../../herohouse/model/GymProxy";
import { t_Power_level } from "../../main/proxy/t_Power_level";
import { SoulTopItemCtl } from "../views/SoulTopItemCtl";
import { IAttrSkin, SoulAttrCtl } from "../views/SoulUpgradeView";
import { ESoulFunc, SoulTipVo } from "./ESoulFunc";
import { SoulModel } from "./SoulModel";
import { t_Spirit_Attribute_Bond, t_Spirit_Attribute_Fixed, t_Spirit_Position } from "./SoulProxy";

export class SoulTipsCtl{
    private _ui:ui.views.soul.ui_soul_tips_itemUI;
    private equipBtnCtl:ButtonCtl;
    private qianhuaBtnCtl:ButtonCtl;
    private unloadBtnCtl:ButtonCtl;
    private topCtl:SoulTopItemCtl;
    private switchBtnCtl:ButtonCtl;
    private cell:SoulTipVo;
    private  type:EViewType;
    private normalCtl:SoulAttrCtl;
    private randomCtl:SoulAttrCtl;
    private _attr2:IAttrSkin;
    private _attr4:IAttrSkin;
    private _plusCtl: FontClipCtl;
    constructor(skin:ui.views.soul.ui_soul_tips_itemUI,type:EViewType){
        this.type = type;
        this._ui = skin;
        this._attr2  = this._ui.cellAttr2;
        this._attr4  = this._ui.cellAttr4;
        this._plusCtl = FontCtlFactory.createPlus();

        this.equipBtnCtl = ButtonCtl.CreateBtn(this._ui.equipBtn, this, this.equipBtnHandler);
        this.qianhuaBtnCtl = ButtonCtl.CreateBtn(this._ui.qianhuaBtn, this, this.qianhuanHandler);
        this.unloadBtnCtl = ButtonCtl.CreateBtn(this._ui.uploadBtn,this,this.unloadHandler);
        this.switchBtnCtl = ButtonCtl.CreateBtn(this._ui.switchBtn,this,this.onSwitchHandler);

        this.topCtl = new SoulTopItemCtl(this._ui.item);

        this.normalCtl = new SoulAttrCtl(this._ui.attr0);
        this.randomCtl = new SoulAttrCtl(this._ui.attr1);
    }

    private Close() {
        E.ViewMgr.Close(this.type);
    }

     /**替换 */
     private onSwitchHandler(){
        this.equipBtnHandler();
    }
    /**装备 */
    private equipBtnHandler() {
        this.cell.equip();
        this.Close();
    }
    /**强化 */
    private qianhuanHandler(){
        this.cell.intensify();
        this.Close();
    }
    /**卸下 */
    private unloadHandler(){
        this.cell.unload();
        this.Close();
    }
    public refreshView(_cell: SoulTipVo): void {
        this.cell = _cell;
        this.equipBtnCtl.visible = false;
        this.switchBtnCtl.visible = false;
        this.unloadBtnCtl.visible = false;
        this.qianhuaBtnCtl.visible = false;
        this._ui.curTxt.visible = false;//当前装备
        
        let type: ESoulFunc[] = _cell.type;

        for(let i = 0;i < type.length;i++){
            let _type = type[i];
            switch (_type) {
                case ESoulFunc.Equip:
                    this.equipBtnCtl.visible = true;
                    break;
                case ESoulFunc.Unload:
                    this.unloadBtnCtl.visible = true;
                    break;
                case ESoulFunc.Swicth:
                    this.switchBtnCtl.visible = true;
                    break;
                case ESoulFunc.Intensify:
                    this.qianhuaBtnCtl.visible = true;
                    break;
            }
        }

        if(type.length > 0){
            this._ui.close1.visible = true;
        }else{
            this._ui.curTxt.visible = true;
            this._ui.close1.visible = false;
        }

        let cfg: Configs.t_Spirit_Attribute_Fixed_dat = (t_Spirit_Attribute_Fixed.Ins.getCfgBySpiritID(_cell.vo.spiritId));
        this._ui.nameTf.text = cfg.f_SpiritName;
        let cfgQua = t_Spirit_Quality.Ins.getCfgByQua(cfg.f_SpiritQuality);
        this._ui.nameTf.color = "#" + cfgQua.f_SpiritColor;

        // SoulAttrCtl.updateView(this.normalCtl, this.randomCtl, _cell.vo.attrList);
        this.randomCtl.attr = _cell.vo.attrList;
        let baseAttr = SoulModel.Ins.getSoulByUid(_cell.vo.uid).baseAttr;
        this.normalCtl.attr = baseAttr;

        let plusVal = t_Power_level.Ins.calculatePlus(baseAttr)
        this._plusCtl.setValue(this._ui.plusCon,StringUtil.val2Atlas(plusVal));

        this.topCtl.updateView(_cell.vo);
        let posCfg: Configs.t_Spirit_Position_dat = t_Spirit_Position.Ins.getByPos(_cell.vo.pos);

        this._ui.tf1.text = posCfg.f_PositionName;
        let bondCfg:Configs.t_Spirit_Attribute_Bond_dat = t_Spirit_Attribute_Bond.Ins.getBySpiritID(_cell.vo.spiritId);
        SoulModel.Ins.updateAttr(this._attr2,bondCfg.f_TwoPiece);
        SoulModel.Ins.updateAttr(this._attr4,bondCfg.f_FourPiece);

        if(_cell.enableHold){
            let unlockCount = SoulModel.Ins.getUnlockCountBySpiritId(_cell.vo.spiritId);
            this._ui.kong2.visible = unlockCount >= 2;
            this._ui.kong4.visible = unlockCount >= 4;
        }else{
            this._ui.kong2.visible = false;
            this._ui.kong4.visible = false;
        }
    }
}