import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { SimpleEffect } from "../../avatar/SimpleEffect";
import { DotManager } from "../../common/DotManager";
import { t_Pack_FirstPay_Skin } from "../../libao/proxy/LiBaoProxy";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainModel } from "../../main/model/MainModel";
import { IMaskSlotItemSkin } from "../../main/views/RewardCtl";
import { ESub_type, ItemVo } from "../../main/vos/ItemVo";
import { MainBaseVo } from "../../main/vos/MainBaseVo";
import { ActivityModel } from "../ActivityModel";
import { EActivityLingQu, EActivityType } from "../model/EActivityType";

export class SkinItem extends ui.views.libao.ui_skinItemUI{
    private eff:Laya.Sprite[] = [];
    constructor(){
        super();
    }
    private newEffect(index:number){
        let con = new Laya.Sprite();
        let item:Laya.Sprite = this['item' + (index+1)];
        let eff: SimpleEffect = new SimpleEffect(con, "o/spine/eflibao/eflibao",item.width/2 , item.height/2, 1,true);
        eff.play(0, true);
        item.addChild(con);
        return con;
    }
    effect(v: boolean,index:number) {
        if(v){
            if(!this.eff[index]){
                let con = this.newEffect(index);
                this.eff[index] = con;
            }
        }
        if(this.eff[index]){
            this.eff[index].visible = v;
        }
    }
}



/**皮肤礼包 */
export class SkinPackage{
    // mEffect:boolean = true;//是否使用特效
    private list1:Laya.List;
    constructor(){
    }

    init(list1:Laya.List){
        this.list1 = list1;
        this.list1.itemRender = SkinItem;
        this.list1.renderHandler = new Laya.Handler(this,this.onRenderHandler);
    }

    // private onItemUndisplay(eff:SimpleEffect){
    //     console.log(Math.random() + " sss");
    //     eff.dispose();
    // }
    get activityType(){
        return MainModel.Ins.newPay.activityType;
    }
    private onBtnClick(){
        // const pack = ActivityModel.Ins.getByUid(this.packUid);
        let vo = ActivityModel.Ins.getVo(this.activityType);//EActivityType.SkinLiBao
        if (!vo) return;
        // const notBuy = vo.dataList.every(o => o.param1 === EActivityLingQu.Nothing);
        // if (notBuy) {
        // const activity = t_Pack_ControllerProxy.Ins.getByUID(vo.uid);
        // ActivityModel.Ins.recharge(vo.cfg.f_PriceID);
        // } else {
        // ActivityModel.Ins.lingQu(vo.uid, 0);
        // }
        ActivityModel.Ins.lingQu(vo.uid, 0);
    }

    private onRenderHandler(item:SkinItem,index:number){
        // item.effect = false;

        let cfg:Configs.t_Pack_FirstPay_Skin_dat = item.dataSource;
        const arr = cfg.f_items_client.split('|');
        let status:EActivityLingQu = EActivityLingQu.YiLingQu;

        let _activityVo = ActivityModel.Ins.getVo(this.activityType);
        // _activityVo = null;
        if(!_activityVo){

        }else{
            const dataList = ActivityModel.Ins.getByUid(_activityVo.uid).dataList;
            let cell = dataList.find(o=>o.id == cfg.f_id);
            if(cell){
                status = cell.param1;
            }
        }
        // let status:EActivityLingQu = cell.param1;
        const rewarded = /*dataList.find(o => o.id === cfg.f_id)?.param1*/ status === EActivityLingQu.YiLingQu;
        for (let i = 1; i <= arr.length; i++) {
            // const [itemId, count] = arr[i - 1].split('-').map(Number);
            let a1 = arr[i-1].split("-");
            let itemId:number = parseInt(a1[0]);
            let count:number = parseInt(a1[1]);
            let itemSkin:IMaskSlotItemSkin = item[`item${i}`];
            if (rewarded) {
                // 已领取
                itemSkin.maskbg.visible = true;
                itemSkin.gouImg.visible = true;
            } else {
                // 未领取
                itemSkin.maskbg.visible = false;
                itemSkin.gouImg.visible = false;
            }
            let vo = new ItemVo();
            vo.cfgId = itemId;
            vo.count = count;
            ItemViewFactory.refreshSlot(itemSkin.slot,vo,status != EActivityLingQu.KeLingQu);

            if(vo.cfg.f_sub_type == ESub_type.ClientEffect){
                item.effect(true,i-1);
            }
            else{
                item.effect(false,i-1);
            }
            // itemSkin.on(Laya.Event.UNDISPLAY,this,this.onItemUndisplay,[eff]);
        }
        let id = index + 1;
        let desc:string = E.getLang(id == 1 ? "djtlq": "djtlq2", StringUtil.NumToWord(id));
        let hasRed:boolean = false;
        if(status == EActivityLingQu.KeLingQu){
            desc = E.getLang("clickcanlingqu");
            hasRed = true;
            item.on(Laya.Event.CLICK,this,this.onBtnClick);
        }else{
            if(status == EActivityLingQu.YiLingQu){
                desc = E.getLang("LingQu2");
            }
            item.off(Laya.Event.CLICK,this,this.onBtnClick);
        }
        // if(debug) desc += " "+status;
        item.lab.text = desc;
        if(hasRed){
            DotManager.addDot(item)
        } else{
            DotManager.removeDot(item);
        }
    }

    dispose(){

    }

    refresh(){
        if(this.list1){
            this.list1.array = t_Pack_FirstPay_Skin.Ins.List;
        }
    }
}