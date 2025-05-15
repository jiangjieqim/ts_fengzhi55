import {StringUtil} from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { ChengHaoListProxy } from "../../chenghao/proxy/ChengHaoProxy";
import { GemBaseModel } from "../../gemfeast/GemBaseModel";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainModel } from "../../main/model/MainModel";
import { t_Platform } from "../../main/proxy/t_Platform";
import { ItemSlotCtl } from "../../main/views/icon/SoltItemView";
import { ItemVo } from "../../main/vos/ItemVo";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { EDuanWuLingquStatus } from "../DuanWuModel";
export class DuanwuSlotVo{
    itemVo:ItemVo;
    titleId:number;
}

/**奖励展示 */
export class DuanWuLeichongSlotItemView extends ui.views.main.ui_slot_itemUI{
    private ctl:ItemSlotCtl;
    private vo:DuanwuSlotVo;
    constructor(){
        super();
        this.ctl = new ItemSlotCtl(this);
    }
    public setData(vo:DuanwuSlotVo){
        this.vo = vo;
        this.ctl.offAll(Laya.Event.CLICK);
        this.ctl.setData(vo.itemVo);
        if(vo.titleId){
            this.icon.skin = ChengHaoListProxy.Ins.getSmallIcon(vo.titleId);
            this.tf1.text = "";
            this.quality.skin = IconUtils.getQuaIcon(5);
            this.ctl.on(Laya.Event.CLICK,this,this.onTipsHandler);
        }
    }
    private onTipsHandler(){
        let cfg:Configs.t_Title_Lists_dat = ChengHaoListProxy.Ins.getCfgByID(this.vo.titleId);
        MainModel.Ins.showSmallTips(cfg.f_TitleName,cfg.f_titleDec,this);
    }
}

/**累充item */
export class DuanWuLeichongItemView extends ui.views.duanwu.ui_duanwu_leichong_itemUI{
    cfg:Configs.t_Alternation_Recharge_dat;
    private status:EDuanWuLingquStatus;
    private lingquCtl:ButtonCtl;
    private model:GemBaseModel;
    constructor(){
        super();
        // this.model = DuanWuModel.Ins;
        this.lingquCtl = ButtonCtl.CreateBtn(this.lingquBtn,this,this.onLingQu);
        this.zhekouimg.visible = false;
        this.chongzhiBtn.visible = false;
    }
    private onLingQu(){
        if(this.status == EDuanWuLingquStatus.CanLingQu){
            this.model.requstLeiChong(this.cfg.f_id);
        }
    }
    public refresh(model:GemBaseModel){
        this.model = model;
        // this.tf05.visible = false;
        this.lingquCtl.visible = false;
        this.lingquCtl.grayMouseDisable = true;
        this.redimg.visible = false;
        ///////////////////////////////////////////////////////
        this.cfg = this.dataSource;
        this.status = this.model.getLeiChongStatus(this.cfg);
        if(t_Platform.Ins.isFeastUI){
            this.tf01.text = E.getLang("leiji2",StringUtil.moneyCv(this.cfg.f_PackName));
        }else{
            this.tf01.text = E.getLang("leiji",StringUtil.moneyCv(this.cfg.f_PackName));
        }

        let itemList = ItemViewFactory.convertItemList(this.cfg.f_Rewarditem);
        let dataList = [];
        for(let i = 0;i < itemList.length;i++){
            let vo = new DuanwuSlotVo();
            vo.itemVo = itemList[i];
            dataList.push(vo);
        }
        if(this.cfg.f_RewardTitle){
            let vo = new DuanwuSlotVo();
            vo.titleId = this.cfg.f_RewardTitle;
            dataList.push(vo);
        }
        ItemViewFactory.renderItemSlots(this.rewardCon,dataList,10,0.8,"left",DuanWuLeichongSlotItemView,"DuanWuLeichongSlotItemView");
        this.tf02.text = `(${StringUtil.moneyCv(this.model.data.totalCnt)}/${StringUtil.moneyCv(this.cfg.f_PackName)})`;
    
        switch(this.status){
            case EDuanWuLingquStatus.CanLingQu:
                this.tf03.text = E.getLang("LingQu");
                this.lingquCtl.visible = true;
                this.lingquCtl.grayMouseDisable = false;
                this.redimg.visible = true;
                break;
            case EDuanWuLingquStatus.IsLingQued:
                this.tf03.text = E.getLang("LingQu2");
                this.lingquCtl.visible = true;
                this.lingquCtl.grayMouseDisable = true;
                break;
            case EDuanWuLingquStatus.Not:
                // this.tf05.visible = true;
                this.tf03.text = E.getLang("LingQu");
                this.lingquCtl.visible = true;
                this.lingquCtl.grayMouseDisable = true;
                break;
        }
    }
}