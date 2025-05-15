import { PlatformConfig } from "../../../../../InitConfig";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { stSpirit } from "../../../../network/protocols/BaseProto";
import { ESoulFunc, SoulTipVo } from "../model/ESoulFunc";
import { SoulModel } from "../model/SoulModel";
import { t_Spirit_Attribute_Fixed } from "../model/SoulProxy";
import { SoulVo } from "../model/SoulVo";
import { SoulCompareVo } from "./SoulCompareTipsView";

export function f_headViewUpdate(skin:ui.views.soul.ui_soul_small_iconUI,id:number){
    // if(debug && initConfig.platform == PlatformConfig.War3 && id!=0) id = 104;

    skin.icon.skin = id == 0 ? "": `o/equip/hero_${id}.png`;//icon;
    if(!skin.icon.mask){
        if(initConfig.platform == PlatformConfig.War3){

        }else{
            let spr = new Laya.Sprite();
            // let scale:number = skin.icon.scaleX;
            spr.graphics.drawCircle(64, 62, 46, "#ff0000");//43,46            64,62,46 
            skin.icon.mask = spr;
            if (debug) {
                let test = new Laya.Sprite();
                test.graphics.drawCircle(64, 62, 46, null, "#00ff00")
                skin.icon.addChild(test);
            }
        }
    }
}

/**战魂小格子 */
export class SoulIconItem extends ui.views.soul.ui_soul_iconUI {
    private _cell:SoulVo;
    // private _mtf:Laya.Label;
    protected ctl:SoulIconItemCtl;

    constructor() {
        super();
        this.ctl = new SoulIconItemCtl(this);
        this.ctl.clickHandler = new Laya.Handler(this,this.onClickHandler);
    }

    public refreshView(index:number) {
        let _cell:SoulVo = this.dataSource;
        this._cell = _cell;
        if(_cell.isEmpty){
            // this.icon.skin = "";
            f_headViewUpdate(this.headPortrait,0);
            this.lvTf.text = "";//index.toString();
            this.bgicon.visible = false;
        }else{
            this.ctl.updateCell(this._cell.vo);
        }
        // if(!this._mtf){
        //     this._mtf = LabelUtil.create("#ffffff");
        //     this.addChild(this._mtf);
        // }
        // this._mtf.text = index.toString();
        DebugUtil.draw(this);
    }

    private onClickHandler(){
        if(this._cell.isEmpty){
            return;
        }
        let wearVo = SoulModel.Ins.getWear(this._cell.vo.pos);
        if(wearVo){

            let cell = new SoulCompareVo();
            cell.leftVo = new SoulTipVo();
            cell.leftVo.type = [];
            cell.leftVo.vo = wearVo;

            cell.rightVo = new SoulTipVo();
            cell.rightVo.enableHold = false;
            cell.rightVo.type.push(
                ESoulFunc.Swicth,ESoulFunc.Intensify
            );
            cell.rightVo.vo = this._cell.vo;

            E.ViewMgr.Open(EViewType.SoulCompareTip,null,cell);

        }else{
            let cell = new SoulTipVo();
            cell.type.push(ESoulFunc.Equip,ESoulFunc.Intensify);
            cell.vo = this._cell.vo;
            E.ViewMgr.Open(EViewType.SoulTips,null,cell);
        }
    }
}
export class SoulIconItemCtl{    
    private skin:ui.views.soul.ui_soul_iconUI;
    private vo: stSpirit;
    public clickHandler:Laya.Handler;
    constructor(skin:ui.views.soul.ui_soul_iconUI){
        this.skin = skin;
        // this.skin.bgicon.visible = false;
        this.skin.jiao.visible = false;
        this.skin.maskArea.visible = false;
        this.skin.on(Laya.Event.CLICK,this,this.onClickHandler);
    }

    private onClickHandler(){
        if(this.clickHandler){
            this.clickHandler.run();
        }
    }

    public updateCell(vo: stSpirit) {
        this.vo = vo;
        // this.skin.headPortrait.head.skin = 
        f_headViewUpdate(this.skin.headPortrait,t_Spirit_Attribute_Fixed.Ins.getCfgBySpiritID(this.vo.spiritId).f_SpiritIconID);
        if (this.skin.lvTf.visible) {
            if (this.vo.level > 0) {
                this.skin.lvTf.text = "+" + this.vo.level.toString();
            } else {
                this.skin.lvTf.text = "";
            }
        }
        this.skin.bgicon.visible = true;
        this.skin.bgicon.skin = SoulModel.Ins.getIcon(vo.qualityId);
        this.skin.bgicon.rotation = SoulModel.Ins.getRot(vo.pos);
    }

    public set levelTfVisible(v: boolean) {
        this.skin.lvTf.visible = v;
    }
}