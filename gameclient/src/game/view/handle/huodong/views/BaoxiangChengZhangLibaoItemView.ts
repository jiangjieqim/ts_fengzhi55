import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { ActivityModel } from "../ActivityModel";
import { ActivityVo } from "../model/ActivityVo";
import { ChengZhanItemCtl } from "../model/ChengZhanItemCtl";
import { EActivityLingQu, EActivityType } from "../model/EActivityType";
/**
 * 配置接口
 */
export interface IChengZhangCfg {
    /*id*/
    f_id: number;
    /*宝箱等级 角色等级*/
    f_Level: number;
    /*未付费领取*/
    f_NumberFree: string;
    /*付费领取*/
    f_NumberNotFree: string;
    f_itemid:string;
    f_rewardstype:number;
    f_taskText?:string;
}

export interface IBornLibaoItem{
    lbg:Laya.Image;
    rbg:Laya.Image;
    jindutiaotop?:Laya.Image;
    jindutiaobot?:Laya.Image;
    bg2:Laya.Image;
    openstat:Laya.Image;
    bg3?:Laya.Image;
    lvtf?:Laya.Label;
    lingquBtn:Laya.Image;
    tf1:Laya.Label;
    item0:ui.views.huodong.ui_baoxiang_chengzhang_slot_itemUI;
    item1:ui.views.huodong.ui_baoxiang_chengzhang_slot_itemUI;
    maskbg:Laya.Image;
    tasktf?:Laya.Label;
}
/**角色成长礼包,宝箱成长礼包控制器 */
class BornLibaoItemCtl{
    private skin:IBornLibaoItem;
    private cfg:Configs.t_Pack_ChaGrow_dat;
    private _itemCtl0:ChengZhanItemCtl;
    private _itemCtl1:ChengZhanItemCtl;
    private model:ActivityModel;
    private _activityVo:ActivityVo;
    /**按钮 */
    private lqCtl:ButtonCtl;
    private _status:EActivityLingQu;
    constructor(skin:IBornLibaoItem){
        this.skin = skin;
        this.model = ActivityModel.Ins;
        this.lqCtl=ButtonCtl.CreateBtn(this.skin.lingquBtn,this,this.onLingQuHandler);
        this._itemCtl0 = new ChengZhanItemCtl(this.skin.item0);
        this._itemCtl1 = new ChengZhanItemCtl(this.skin.item1);
    }

      /**领取 */
    private onLingQuHandler(){
        let _status = this._status;
        switch(_status){
            case EActivityLingQu.YiLingQu:
                this.pay();
                break;
            default:
                this.model.lingQu(this._activityVo.uid,this.cfg.f_id);
                break;
        }
    }

    private pay(){
        if(this._activityVo){
            ActivityModel.Ins.recharge(this._activityVo.priceID);
        }
    }

    /**显示竖条 */
    private set showStat(v:boolean){
        if (this.skin.jindutiaotop) this.skin.jindutiaotop.visible = v;
        this.skin.openstat.visible = v;
        if (this.skin.jindutiaotop) this.skin.jindutiaotop.visible = v;
        if (this.skin.jindutiaobot) this.skin.jindutiaobot.visible = v;
    }

    private clearUI(){
        this.showStat = false;
        this.skin.maskbg.visible = false;
    }


    public refreshView(_activityVo:ActivityVo,activityType:EActivityType,dataSource,isPay:boolean){
        this.clearUI();

        this._activityVo = _activityVo;
        let _cfg:IChengZhangCfg  = dataSource;
        let _status:EActivityLingQu = EActivityLingQu.Nothing;
        
        
        if(_activityVo){
            _status = _activityVo.getParam1(_cfg.f_id);
        }

        this._status = _status;

        // let ss:Configs.t_Pack_BoxGrow_dat
        //Configs.t_Pack_ChaGrow_dat

        this.cfg = _cfg;
        
        if(this.model.isChengZhangOrJueSeUnLock(activityType,_cfg.f_id)){
            // this.skin.maskbg.visible = false;
            // this.skin.jindutiaobot.visible = true;
            // this.skin.jindutiaotop.visible = true;
        }else{
            // this.skin.maskbg.visible = true;
            // this.skin.jindutiaobot.visible = false;
            // this.skin.jindutiaotop.visible = false;
        }

        
        switch(_status){
            case EActivityLingQu.Nothing:
                //0 条件未达成的情况 不可领取
                this.skin.maskbg.visible = true;
                this.disableBtn = true;
                this.skin.tf1.text = "不可领取";
                break;

            case EActivityLingQu.KeLingQu:
                // 2 未充值 可领取
                this.disableBtn = false;
                this.skin.tf1.text = "领取";
                this.showStat = true;
                break;
            
            case EActivityLingQu.YiLingQu:
                //1 未充值 已领取
                this.disableBtn = false;
                this.skin.tf1.text = "继续领取";
                this.showStat = true;
                break;
            case EActivityLingQu.ChongZhiYiLingQu:
                //3 充值已领取
                this.disableBtn = true;
                this.skin.tf1.text = "已领取";
                this.showStat = true;
                break;
            case EActivityLingQu.ChongZhiWeiLingQu:
                //4 充值未领取
                this.disableBtn = false;
                this.skin.tf1.text = "领取";
                this.showStat = true;
                break;

            case EActivityLingQu.ChongZhiAllNotLing:
                this.disableBtn = false;
                this.skin.tf1.text = "领取";
                this.showStat = true;
                break;
        }
        ////////////////////////////////////////////////////////
        if (this.skin.lvtf) this.skin.lvtf.text = IconUtils.str2Lv(_cfg.f_Level);
        this._itemCtl0.updateData(ItemViewFactory.convertItemList(_cfg.f_NumberFree)[0],true,_status,isPay);
        this._itemCtl1.updateData(ItemViewFactory.convertItemList(_cfg.f_NumberNotFree)[0],false,_status,isPay);
        if (this.skin.tasktf) this.skin.tasktf.text = _cfg.f_taskText
    }

    private set disableBtn(v){
        this.lqCtl.gray = v;
        this.lqCtl.mouseEnable = !v;
    }
}

export interface IBornItem extends Laya.View{
    ctl:BornLibaoItemCtl;
}

/**
 * 宝箱成长礼包item 
 */
export class BaoxiangChengZhangLibaoItemView extends ui.views.huodong.ui_baoxiang_chengzhang_itemUI{
    public ctl:BornLibaoItemCtl;
    constructor(){
        super();
        this.ctl = new BornLibaoItemCtl(this);
    }
}
/**
 * 角色成长礼包item
 */
export class RoleLibaoItemView extends ui.views.huodong.ui_juesechengzhang_item2UI{
    public ctl:BornLibaoItemCtl;
    constructor(){
        super();
        this.ctl = new BornLibaoItemCtl(this);
    }
}
/**
 * 坐骑成长礼包item
 */
export class ZuoqiLibaoItemView extends ui.views.huodong.ui_mount_chengzhang_itemUI{
    public ctl:BornLibaoItemCtl;
    constructor(){
        super();
        this.ctl = new BornLibaoItemCtl(this);
    }
}
/**
 * 灵宠成长礼包item
 */
export class LingchongLibaoItemView extends ui.views.huodong.ui_pet_chengzhang_itemUI{
    public ctl:BornLibaoItemCtl;
    constructor(){
        super();
        this.ctl = new BornLibaoItemCtl(this);
    }
}
/**
 * 宝石成长礼包item
 */
export class BaoshiLibaoItemView extends ui.views.huodong.ui_gem_chengzhang_itemUI{
    public ctl:BornLibaoItemCtl;
    constructor(){
        super();
        this.ctl = new BornLibaoItemCtl(this);
    }
}
