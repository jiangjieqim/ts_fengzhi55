import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { SimpleEffect } from "../../avatar/SimpleEffect";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { EquipmentIDProxy } from "../model/EquipmentProxy";
import { ItemViewFactory } from "../model/ItemViewFactory";
import { MainEvent } from "../model/MainEvent";
import { DrawCallNode, MainModel } from "../model/MainModel";
import { EEquipType } from "../vos/ECellType";
import { EquipItemVo } from "../vos/EquipItemVo";
/**装备格子视图接口 */
export interface IEquipItemSkin extends Laya.Sprite{
    quality: Laya.Image;//品质icon
    icon: Laya.Image;   //icon
    tf1: Laya.Label;//数量
    typename: Laya.Label;//种类文本
    redimg:Laya.Image;
}

/**
 * 装备格子
 */
export class EquipItemView{
    // public oldSkin:string;
    /**是否是换装 */
    public changeSkin:boolean = false;
    private hasRedCheck:boolean = false;
    private mEffect:number = 0;
    /**
     * 装备类型
     */
    public equipType:EEquipType = EEquipType.None;
    /**
     * 装备数据
     */
    private vo:EquipItemVo;
    private eff:SimpleEffect;
    public skin:IEquipItemSkin;
	/**当前的装备数据*/
    public get curVo():EquipItemVo{
        return this.vo;
    }
    private typeNameDcLabel:DrawCallNode;
    private lvDcLabel:DrawCallNode;
    // private iconDc:DrawCallNode;
    /**
     * 
     * @param skin 
     * @param equipType 
     * @param hasRedCheck 
     * @param mEffect 1 在更换的时候播放特效
     */
    constructor(skin:IEquipItemSkin,equipType:EEquipType=null,hasRedCheck:boolean = false,mEffect:number = 0){
        DebugUtil.draw(skin,"#ff00ff");
        this.mEffect = mEffect;
        this.hasRedCheck = hasRedCheck;
        this.skin = skin;
        this.equipType = equipType;
        this.skin.redimg.visible = false;
        if(skin instanceof Laya.EventDispatcher){
            this.mouseEnableSkin = skin;
        }
        if(this.mEffect){
            //主界面中的icon
            this.typeNameDcLabel = MainModel.Ins.getDcNode(skin.typename,MainModel.Ins.mainView.labelLayer)
            this.typeNameDcLabel.visible = true;
            skin.once(Laya.Event.DISPLAY,this,this.onDisplay);
            MainModel.Ins.on(MainEvent.EquipSlot,this,this.equipSlotLaterUpdate);            
        }
    }

    private equipSlotLaterUpdate(targetType:number){
        if(this.mEffect && this.equipType == targetType){
            // && this.vo && targetType == this.vo.equipVo.type){
            this.playAnim();
        }
    }

    private onDisplay(){
        
    }

    /**设置鼠标点击的皮肤 */    
    public set mouseEnableSkin(mSkin:Laya.EventDispatcher){
        mSkin.on(Laya.Event.CLICK,this,this.onClickHandler);
    }

    private onClickHandler() {
        if (this.vo) {
            E.ViewMgr.Open(EViewType.EquipTips, null, this.vo);
        }
    }

    /**换装的皮肤 */
    private get changeSkinIcon(){
        return ItemViewFactory.getHuanZhuangSkin(this.vo);
    }

    /**播放特效 */
    private playAnim(){
        if(!this.eff){
            this.eff = new SimpleEffect(this.skin, "o/spine/change/change", this.skin.width / 2, this.skin.height / 2);
        }
        this.eff.play(0,false);
    }

    public setData(vo:EquipItemVo){
        this.clear();

        // if(this.mEffect && vo && this.vo && EquipItemVo.diffCheck(vo,this.vo)){
        // LogSys.LogColor("diff:"+ this.vo.equipVo.type);
        // }

        this.vo = vo;
        if(vo){
            if(this.changeSkin){
                this.skin.icon.skin = this.changeSkinIcon;
            }else{
                this.skin.icon.skin = vo.getIcon();
            }
            this.typenameVis = false;
            this.skin.quality.skin = vo.getQualityIcon();
            if(this.skin.tf1){
                this.skin.tf1.visible = true;
                this.skin.tf1.text = IconUtils.str2Lv(vo.equipVo.level);
                this.lvVis = true;
            }
        }
        // this.onEquipSlot();
    }

    private set typenameVis(v:boolean){
        this.skin.typename.visible = v;
        if(this.typeNameDcLabel){
            this.typeNameDcLabel.visible = v;
        }
    }

    private set lvVis(v:boolean){
        this.skin.tf1.visible = v;
        if(this.lvDcLabel){
            this.lvDcLabel.visible = v;
        }
    }
    private clear() {
        this.skin.icon.skin = "";
        this.skin.quality.skin = "";//"remote/common/base/duigoukuang.png";
        if(this.skin.tf1){
            this.skin.tf1.visible = false;
            this.lvVis = false;
        }
        this.typenameVis = true;
        let cfg:Configs.t_EquipmentID_dat = EquipmentIDProxy.Ins.GetDataById(this.equipType);
        if(cfg){
            this.skin.typename.text = cfg.f_name;
        }else{
            this.skin.typename.text = "";
        }
    }
}