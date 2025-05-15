import {StringUtil} from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { stEquipAttr } from "../../../../network/protocols/BaseProto";
import { MainModel } from "../../main/model/MainModel";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { HeroHouseModel } from "../HeroHouseModel";
import { EGymAction } from "../model/EGymType";
import { GymInviteVo } from "../model/GymInviteVo";
import { t_Gym_NPC_List, t_Gym_NPC_Type } from "../model/GymProxy";

/**
 * 武将说明参考
 */
export class HeroHouseReadView extends ViewBase {
    protected mMask:boolean = true;
    private tf:Laya.Label;
    private model: HeroHouseModel;
    private _ui: ui.views.hero_house.ui_hero_house_readUI;
    private vo:GymInviteVo;
    protected onAddLoadRes(): void { }
    protected onExit(): void { 
        this.model.autoCtl.cur = null;
    }
    protected onFirstInit(): void {
        if (!this.UI) {
            this.model = HeroHouseModel.Ins;
            this.UI = this._ui = new ui.views.hero_house.ui_hero_house_readUI();
            ButtonCtl.CreateBtn(this._ui.ywBtn, this, this.onForgetHandler);
            ButtonCtl.CreateBtn(this._ui.jiChengBtn, this, this.onInheritHandler);

            ButtonCtl.CreateBtn(this._ui.failOk, this, this.failOkHandler);
            ButtonCtl.CreateBtn(this._ui.jiyuanLingqu, this, this.jiyuanLingquHandler);

            // this.tf.color = "#ff0000";
            // this.tf.fontSize = 32;
            // this.tf.width = this._ui.width;
            // this._ui.addChild(this.tf);
            this._ui.jiyuanDescTf.text = "";//E.getLang("GymRead");
            this._ui.failDescTf.text = E.getLang("GymFail");

            // let bg1 = new Laya.Sprite();
            // bg1.graphics.drawRect(0,0,this._ui.width,this._ui.height,"#000000");
            // this._ui.addChildAt(bg1,0);
            // bg1.alpha = 0.75;
            // this.addBlackBg();
        }
    }

    /**刷新属性 */
    private refrashAttr(l:stEquipAttr[]){
        let arr = [this._ui.tf2,this._ui.tf3];
        for(let i = 0;i < arr.length;i++){
            let tf:Laya.Label = arr[i];
            if(i < l.length){
                let cell = l[i];
                let val:string = attrConvert(cell.id,cell.value);
                tf.text = `${MainModel.Ins.getAttrNameIdByID(cell.id)}: ${val}`;
            }else{
                tf.text = "";
            }
        }
    }

    /**算了 */
    private failOkHandler() {
        this.doForget();
        this.Close();
    }

    /**机缘领取 */
    private jiyuanLingquHandler(){
        this.doForget();
        this.Close();
    }

    /**遗忘 */
    private onForgetHandler() {
        this.doForget();
        this.Close();
    }

    private doForget(){
        this.model.forget(this.model.firstVo);
    }

    /**继承 */
    private onInheritHandler() {
        let heroType:number = this.vo.heroCfg.f_HeroType;
        if(this.model.hasEmpty(heroType)){
            this.model.equip(this.vo.uid);

        }else{
            E.ViewMgr.Open(EViewType.HeroHouseSwicth,null,this.vo);
        }
        this.Close();
    }


    public onRefreshHandler(){
        let vo = this.model.firstVo;
        this.vo = vo;
        if (vo) {
            if(E.Debug){
                // console.log(vo);
                // LogSys.Log(`${vo.toCellString()},###########  演武是否完成:${vo.isTimeEnd}`);
                if(!this.tf){
                    this.tf = new Laya.Label();
                    this.tf.color = "#ffffff";
                    this.tf.fontSize = 24;
                    this._ui.addChild(this.tf);
                }
                this.tf.text = `uid:${vo.uid} heroType:${vo.heroCfg.f_HeroType}`;
            }
            switch (vo.mData.result) {
                case EGymAction.Live:
                    //演武完走人 无任何奖励
                    this._ui.getNewJiYuan.visible = false;
                    this._ui.getFail.visible = true;
                    this._ui.getNewHero.visible = false;
                    break;
                case EGymAction.ShowInherit:
                    //获得新武魂 继承遗忘
                    this._ui.getNewJiYuan.visible = false;
                    this._ui.getFail.visible = false;
                    this._ui.getNewHero.visible = true;

                    let _heroCfg:Configs.t_Gym_NPC_List_dat = t_Gym_NPC_List.Ins.getByHeroID(vo.mData.heroId);
                    this._ui.nameTf.text = _heroCfg.f_name;
                    this._ui.nameTf.color = this.model.getColorByQua(_heroCfg.f_HeroQuality);
                    this._ui.finishTf.text =  this.model.getDegreeDesc(vo.degree);

                    let _typeCfg: Configs.t_Gym_NPC_Type_dat = t_Gym_NPC_Type.Ins.getByType(_heroCfg.f_HeroType);
                    this._ui.tf0.text = "类别:" + _typeCfg.f_Typename;
                    this._ui.tf1.text = "地区:" + HeroHouseModel.Ins.getRegion(_heroCfg.f_HeroID);
     
                    this._ui.quality1.skin = IconUtils.getQuaIcon(_heroCfg.f_HeroQuality);
                    this._ui.icon1.skin = HeroHouseModel.Ins.getHeroIcon(_heroCfg.f_iconid);

                    this.refrashAttr(vo.attrlist);
                    let _rewardItem2 = vo.rewardItem;

                    this._ui.tqIcon.skin = IconUtils.getIconByCfgId(_rewardItem2.id);
                    this._ui.tf4.text = StringUtil.val2m(_rewardItem2.count);

                    // this._ui.newIcon.skin = 
                    break;
                case EGymAction.ShowReward:
                    //银币奖励
                    this._ui.getNewJiYuan.visible = true;
                    let _heroCfg1:Configs.t_Gym_NPC_List_dat = t_Gym_NPC_List.Ins.getByHeroID(vo.mData.heroId);
                    this._ui.quality1.skin = IconUtils.getQuaIcon(_heroCfg1.f_HeroQuality);
                    this._ui.icon2.skin = HeroHouseModel.Ins.getHeroIcon(_heroCfg1.f_iconid);
                    this._ui.getFail.visible = false;
                    this._ui.getNewHero.visible = false;

                    let _rewardItem = vo.rewardItem;

                    this._ui.moneyIcon.skin = IconUtils.getIconByCfgId(_rewardItem.id);
                    this._ui.moneyTf.text = StringUtil.val2m(_rewardItem.count);

                    this._ui.jiyuanDescTf.text = _heroCfg1.f_info;

                    break;
            }
        }else{
            // console.log("无数据了.....");
        }
    }

    protected onInit(): void {
        this.onRefreshHandler();
    }
}
