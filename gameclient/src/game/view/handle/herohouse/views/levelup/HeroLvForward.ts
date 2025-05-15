import {StringUtil} from "../../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { CheckBoxCtl, ICheckBoxSkin } from "../../../../../../frame/view/CheckBoxCtl";
import { ui } from "../../../../../../ui/layaMaxUI";
import { EMsgBoxType } from "../../../../../common/defines/EnumDefine";
import { E } from "../../../../../G";
import { stEquipAttr } from "../../../../../network/protocols/BaseProto";
import { ValLabelCtl } from "../../../main/ctl/ValLabelCtl";
import { ItemViewFactory } from "../../../main/model/ItemViewFactory";
import { MainModel } from "../../../main/model/MainModel";
import { ItemVo } from "../../../main/vos/ItemVo";
import { attrConvert } from "../../../main/vos/MainRoleVo";
import { HeroHouseModel, IHeroTask } from "../../HeroHouseModel";
import { GymEvent } from "../../model/GymEvent";
import { t_Gym_refinement_AttributeRange } from "../../model/GymProxy";
import { HeroBetterResult, HeroLevelShowAttr } from "../../model/HeroBetterModelCtl";
import { WashResult } from "../../model/WashResult";
import { HeroUpLevelBase, IHeroUpLevelBase } from "./HeroUpLevelBase";
/**战鼓 t_Gym_Facility_Drum 进阶突破 */
export class HeroLvForward extends HeroUpLevelBase implements IHeroUpLevelBase {
    // private _type:EFacilityType;
    private washCtlCk:CheckBoxCtl;
    private washBtnCtl:ButtonCtl;
    constructor(skin: ui.views.hero_house.ui_hero_house_level_upUI) {
        super();
        this.skin = skin;
        // this.skin.bg3.visible = false;
        ButtonCtl.CreateBtn(this.skin.jingjieBtn, this, this.onLevelUpHandlers);
        ButtonCtl.CreateBtn(this.skin.switchBtn,this,this.onSwitchHandle);

        this.skin.jingjielist.itemRender = ui.views.hero_house.ui_hero_house_level_up_attrUI;
        this.skin.jingjielist.renderHandler = new Laya.Handler(this,this.onRenderHandler);

        let _ckSkin = {bg:this.skin.bg,gou:this.skin.gou,content:this.skin.content} as ICheckBoxSkin;
        this.washCtlCk =new CheckBoxCtl(_ckSkin);// E.getLang("UseGold")
        this.washCtlCk.selectHander = new Laya.Handler(this,this.onWashSelectHandler);
        this.washBtnCtl = ButtonCtl.CreateBtn(this.skin.washBtn1,this,this.onWashHandler);

        this.skin.left1.itemRender = ui.views.hero_house.ui_hero_house_level_up_switch_attrUI;
        this.skin.left1.renderHandler = new Laya.Handler(this,this.onAttrHandler);

        this.skin.right1.itemRender = ui.views.hero_house.ui_hero_house_level_up_switch_attrUI;
        this.skin.right1.renderHandler = new Laya.Handler(this,this.onAttrHandler);
        this.skin.on(Laya.Event.DISPLAY,this,this.onDisplay);
        this.skin.on(Laya.Event.UNDISPLAY,this,this.onUnDisplay);
        // this.tupoBtnCtl=ButtonCtl.CreateBtn(this.skin.tupoBtn, this, this.onTuPoHandler);
    }

    private onDisplay(){
        this.model.on(GymEvent.WashSucceed,this,this.onWashSucceed);
    }
    private onUnDisplay(){
        this.model.off(GymEvent.WashSucceed,this,this.onWashSucceed);
    }
    private onWashSucceed(){
        this.refresh();
    }

    private onSwitchOk(){
        this.model.switchId(this.type);
    }

    /**
     * 替换
     */
    private onSwitchHandle(){
        if (this.isShowTips(this.model.wash.leftAttr)) {
            E.ViewMgr.ShowMsgBox(EMsgBoxType.OkOrCancel,E.getLang("wash01"),new Laya.Handler(this,this.onSwitchOk));
        }else{
            this.onSwitchOk();
        }
    }

    private onAttrHandler(cell:ui.views.hero_house.ui_hero_house_level_up_switch_attrUI){
        let attr:stEquipAttr = cell.dataSource;
        cell.tf1.text = MainModel.Ins.getAttrNameIdByID(attr.id);
        cell.tf2.text = attrConvert(attr.id,attr.value);
        cell.tf1.color = cell.tf2.color = t_Gym_refinement_AttributeRange.Ins.getColor(attr.id,attr.value);
    }

    private onWashSelectHandler(){
        this.updateUseView();
    }

    private updateUseView(){
        let wash:WashResult = this.model.wash;
        let _item:ItemVo;
        if(!this.washCtlCk.selected){
            _item = wash.lowitem;
        }else{
            _item = wash.highitem
        }
        ValLabelCtl.refresh(this.skin.tf10, _item.cfgId, _item.count, this.skin.yuanbao2);
    }

    private isShowTips(attr:stEquipAttr[]){
        for(let i = 0;i < attr.length;i++){
            let o = attr[i];
            let qua = t_Gym_refinement_AttributeRange.Ins.getQua(o.id,o.value)
            if(qua >= 6){
                return true;
            }
        }
    }

    private onWashOk(){
        this.model.washByID(this.type, this.washCtlCk.selected ? 1 : 0);
    }

    /**洗练 */
    private onWashHandler() {
        // LogSys.Log(this.washCtlCk.selected);
        if (this.model.wash.hasEnough(this.washCtlCk.selected)) {
            if (this.isShowTips(this.model.wash.rightAttr)) {
                E.ViewMgr.ShowMsgBox(EMsgBoxType.OkOrCancel,E.getLang("wash01"),new Laya.Handler(this,this.onWashOk));
            } else {
                this.onWashOk();
            }
        }
    }

    private onRenderHandler(item:ui.views.hero_house.ui_hero_house_level_up_attrUI){
        let cell: HeroLevelShowAttr = item.dataSource;
        let cur: stEquipAttr = cell.cur;
        let next: stEquipAttr = cell.next;

        item.attrTf.text = MainModel.Ins.getAttrNameIdByID(cur.id) + ":" + attrConvert(cur.id, cur.value);
        item.attrDesc.text = MainModel.Ins.getAttrDesc(cur.id);
        if(next){
            item.attrValTf.text = attrConvert(next.id,next.value);
        }else{
            item.attrValTf.text = "";
        }
    }

    private onLevelUpHandlers() {
        this.levelUp();
    }

    public get container(): Laya.Sprite {
        return this.skin.switchLvContainer;
    }

    private updateTopStr(_result:HeroBetterResult){
        this.skin.arrow1.visible = false;
        // let lv = this.vo.showLv;
        // this.skin.t2.text = "当前等级: "+ lv;
        this.skin.t2.text = "当前属性";
        if(_result.mFullLv){
            this.skin.t3.text = "";
            // this.skin.arrow1.visible = false;
        }else{
            // this.skin.t3.text = "下一等级: " + (lv + 1);
            this.skin.t3.text = "新属性";
            // this.skin.arrow1.visible = true;
        }
    }

    /**有没有替换按钮 */
    private set showSwitchBtn(v:boolean){
        // this.skin.washContainer.visible = v;
        this.skin.switchBtn.visible = v;
        if(v){
            this.skin.washContainer.x = 51;
        }else{
            this.skin.washContainer.x = 199;
        }
    }

    public refresh() {
        super.refresh();
        let _result: HeroBetterResult = this.model.better.getDrumByLv(this.vo.fid, this.vo.type);
        if(E.Debug){
            console.log(_result.toString());
        }
        this.updateTopStr(_result);
        if (this.model.selLevelTabIndex == 0) {

            if(!StringUtil.IsNullOrEmpty(_result.cfg.f_Task)){
                /**突破 */
                this.skin.switchLvContainer.visible = false;
                this.skin.tupo_task.visible = true
                // public task:IHeroTask = {} as IHeroTask;
                let task:IHeroTask = {} as IHeroTask;
                HeroHouseModel.Ins.buildTask(task,this.vo.id,_result.cfg.f_Task);
                this.updateTupo(task);
                
                let need1:ItemVo = ItemViewFactory.convertItem(_result.cost);
                if(need1){
                    this.skin.tupomoney.visible = true;
                    ValLabelCtl.refresh(this.skin.tf8, need1.cfgId, need1.count, this.skin.tupoicon);
                }
            } else {
                this.skin.switchLvContainer.visible = true;
                this.skin.tupo_task.visible = false;

                this.skin.xilianswitch.visible = false;
                this.skin.jingjie.visible = true;
                //进阶(强化)
                this.skin.jingjielist.array = _result.attrList;
                let need = ItemViewFactory.convertItem(_result.cost);
                ValLabelCtl.refresh(this.skin.yuanbaoCntTf, need.cfgId, need.count, this.skin.yuanbaoIcon);
            }
        } else {
            //洗练
            this.skin.switchLvContainer.visible = true;
            this.skin.xilianswitch.visible = true;
            this.skin.jingjie.visible = false;
            this.model.wash.getResult(this.type);
            this.updateUseView();

            
            this.skin.left1.array = this.model.wash.leftAttr;
            this.skin.right1.array = this.model.wash.rightAttr;
            if(this.model.wash.hasSwicth){
                this.skin.tf1.visible = false;
                this.showSwitchBtn = true;
            }else{
                this.skin.tf1.visible = true;
                this.showSwitchBtn = false;
            }
        }
    }
}