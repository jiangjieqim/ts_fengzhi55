import { LogSys } from "../../../../../frame/log/LogSys";
import { BaseModel } from "../../../../../frame/util/ctl/BaseModel";
import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { MSGID } from "../../../../network/MSGID";
import { LabourBaodiLeft_revc, LabourCapsuleToys_revc, LabourItemRedChange_revc, LabourShopChange_revc, LabourShopFreeChange_revc, LabourShopInit_revc, LabourTicket_revc, stLabourCapsuleToys, stLabourItemRed, stLabourShop } from "../../../../network/protocols/BaseProto";
import { ActivityModel } from "../../huodong/ActivityModel";
import { EActivityType } from "../../huodong/model/EActivityType";
import { EFuncDef } from "../../main/model/EFuncDef";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { LabordayExchange } from "../views/LabordayExchange";
import { LabordayMainView } from "../views/LabordayMainView";
import { LabordayPackageView } from "../views/LabordayPackageView";
import { ChildrenPackageView, ChildrenShopView, ChildrenView, LabordayShopView, LuckPackageView, LuckShopView, LuckView, MidAutumnPackageView, MidAutumnShopView, MidAutumnView, SummerPackageView, SummerShopView, SummerView, YuanXiaoPackageView, YuanXiaoShopView, YuanXiaoView } from "../views/LabordayShopView";
import { LabordayShowReward } from "../views/LabordayShowReward";
import { MidAutumnShopView1 } from "../views/MidAutumnShopView1";
import { EModelLabordayType, t_Labour_Config, t_Labour_Config_item, t_Labour_Pack } from "./LabordayProxy";

export abstract class LabordayBaseModel extends BaseModel {
    /**劳动商店的文本 */
    markTitle:string;
    /**劳动礼包文本*/
    packTitle:string;
    /***标题美术字 */
    imgTitle:string;
    mainDesc:string;
    protected redKey: string;
    public get pieces():number{
        return t_Labour_Config.Ins.getByType(this.type).f_shopicon;
    }
    public get pieces1():number{
        return t_Labour_Config.Ins.getByType(this.type).f_shopicon_1;
    }
    public get coin():number{
        return t_Labour_Config.Ins.getByType(this.type).f_mainicon;
    }
    public abstract descid:string;
    public abstract type: EModelLabordayType;
    public funcid:EFuncDef;
    /**活动类型 */
    public activteType:EActivityType = EActivityType.Laborday;
    public f_p2:number;
    /**更新五一活动 */
    public static EVENT_SHOP_UPDATE: string = "EVENT_SHOP_UPDATE";
    /**更新扭蛋奖励 */
    public static EVENT_TOY_UPDATE: string = "EVENT_TOY_UPDATE";
    /**数量更新 */
    public static EVENT_TICKET_COUNT: string = "EVENT_TICKET_COUNT";
    /**物品数量 */
    public static EVENT_ITEM_RED_CHANGE: string = "EVENT_ITEM_RED_CHANGE";

    public static EVENT_PROTECT_CHANGE: string = "EVENT_BAODI_CHANGE";
    protected _shopList: stLabourShop[] = [];
    protected shopDatalist:stLabourShop[] = [];
    public curReward: stLabourCapsuleToys;
    public redDatalist: stLabourItemRed[] = [];
    public ticketCount: number = 0;
    public leftCount: number = 0;
    public initMsg(): void {
        this.regUI();

        E.MsgMgr.AddMsg(MSGID.LabourShopInit, this.onLabourShopInit, this);
        E.MsgMgr.AddMsg(MSGID.LabourShopChange, this.onLabourShopChange, this);
        E.MsgMgr.AddMsg(MSGID.LabourCapsuleToys, this.onLabourCapsuleToys, this);
        E.MsgMgr.AddMsg(MSGID.LabourTicket, this.onLabourTicket, this);
        E.MsgMgr.AddMsg(MSGID.LabourItemRedChange, this.onLabourItemRedChange, this);
        E.MsgMgr.AddMsg(MSGID.LabourBaodiLeft, this.onLabourBaodiLeft, this);
        E.MsgMgr.AddMsg(MSGID.LabourShopFreeChange, this.LabourShopFreeChange, this);

        MainModel.Ins.on(MainEvent.ValChange, this, this.updateRed);
    }

    protected regUI(){
        this.funcid = EFuncDef.Laborday;
        this.Reg(new LabordayMainView(EViewType.Laborday));
        this.Reg(new LabordayShowReward(EViewType.LabordayReward));
        this.Reg(new LabordayShopView(EViewType.LabordayShop));
        this.Reg(new LabordayPackageView(EViewType.LabordayPackage));
        this.Reg(new LabordayExchange(EViewType.LabordayExchange));
    }
    public onInitCallBack(): void {
        this._shopList = [];
        this.curReward = null;
        this.redDatalist = [];
        this.leftCount = 0;
        this.shopDatalist = [];
    }
    /**购买成功 */
    private onLabourShopChange(revc: LabourShopChange_revc) {
        if (revc.type == this.type) {
            let l = revc.datalist;
            for (let i = 0; i < l.length; i++) {
                let cell = l[i];
                let a = this._shopList.find(o => o.id == cell.id);
                if (a) {
                    a.num = cell.num;
                } else {
                    this._shopList.push(cell);
                }
            }

            this.event(LabordayBaseModel.EVENT_SHOP_UPDATE);
        }
    }

    private onLabourBaodiLeft(revc: LabourBaodiLeft_revc) {
        if (revc.type == this.type) {
            this.leftCount = revc.baodi;
            LogSys.Log("revc.baodi:"+revc.baodi);
            this.event(LabordayBaseModel.EVENT_PROTECT_CHANGE);
        }
    }

    private LabourShopFreeChange(value:LabourShopFreeChange_revc){
        if (value.type == this.type) {
            let l = value.datalist;
            for (let i = 0; i < l.length; i++) {
                let cell = l[i];
                let a = this.shopDatalist.find(o => o.id == cell.id);
                if (a) {
                    a.num = cell.num;
                } else {
                    this.shopDatalist.push(cell);
                }
            }

            this.event(LabordayBaseModel.EVENT_SHOP_UPDATE);
        }
    }

    private onLabourItemRedChange(revc: LabourItemRedChange_revc) {
        if (revc.type == this.type) {

            // this.redDatalist = revc.redDatalist;
            for (let i = 0; i < revc.redDatalist.length; i++) {
                let cell = revc.redDatalist[i];
                let o1 = this.redDatalist.find(o => o.id == cell.id);
                if (o1) {
                    o1.num = cell.num;
                } else {
                    this.redDatalist.push(cell);
                }
            }
            this.event(LabordayBaseModel.EVENT_ITEM_RED_CHANGE);
        }
    }

    private onLabourTicket(revc: LabourTicket_revc) {
        if (revc.type == this.type) {
            this.ticketCount = revc.num;
            this.event(LabordayBaseModel.EVENT_TICKET_COUNT);
        }
    }
    private onLabourCapsuleToys(revc: LabourCapsuleToys_revc) {
        if (revc.type == this.type) {
            this.curReward = revc.datalist[0];
            this.event(LabordayBaseModel.EVENT_TOY_UPDATE);
        }
    }


    private onLabourShopInit(revc: LabourShopInit_revc) {
        if (revc.type == this.type) {
            this.redDatalist = revc.redDatalist;
            this._shopList = revc.datalist;
            this.shopDatalist = revc.datalistFree;
            this.leftCount = revc.baodi;
            LogSys.Log("onLabourShopInit revc.baodi:"+revc.baodi);
            this.ticketCount = revc.todayTicketNum;
        }
    }
    public updateRed() {
        // let redKey: string = this.redKey;
        let red:boolean = false;
        if (this.isOpen) {
            if (this.freePackage || this.mExchange) {
                // DotManager.addMainDot(redKey);
                red = true;
            } else {
                // DotManager.remMainDot(redKey);
            }
        } else {
            // DotManager.remMainDot(redKey);
        }
        MainModel.Ins.funcSetRed(this.funcid,red);
    }

    /**是否有免费礼包可以领取 */
    public get freePackage() {
        let _activityVo = ActivityModel.Ins.getVo(this.activteType);
        if (_activityVo && _activityVo.isOpen) {
            let l = _activityVo.dataList;
            for (let i = 0; i < l.length; i++) {
                let cell = l[i];
                let cfg: Configs.t_Labour_Pack_dat = t_Labour_Pack.Ins.GetDataById(cell.id);
                if (cfg.f_PurchaseID == 0) {
                    //免费礼包
                    if (cell.param1 == 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    /**活动是否开启 */
    public get isOpen() {
        if (MainModel.Ins.verify) {
            return false;
        }
        let _activityVo = ActivityModel.Ins.getVo(this.activteType);
        if (_activityVo && _activityVo.isOpen) {

            if (parseInt(_activityVo.cfg.f_p2) == this.type) {
                return true;
            }
        }
        return false;
    }

    /**是否可以兑换 */
    public get mExchange() {
        if (this.isOpen) {
            let cfg = t_Labour_Config.Ins.getByType(this.type);
            let lItem = ItemViewFactory.convertItem(cfg.f_exchangeCost1);
            let count: number = MainModel.Ins.mRoleData.getVal(lItem.cfgId);
            return count >= lItem.count;
        }
        return false;
    }

    public getLimitCount(fid: number) {
        let cell = this.redDatalist.find(o => o.id == fid);
        if (cell) {
            return cell.num;
        }
        return 0;
    }

    private _configItemList;
    private get configItems(){
        if(!this._configItemList){
            this._configItemList = t_Labour_Config_item.Ins.getListByType(this.type);
        }
        return this._configItemList;
    }

    public get mBuyFinish() {
        let qua: number = 8;
        let l = this.configItems;//t_Labour_Config_item.Ins.get;
        let allCount: number = 0;
        let itemList: number[] = [];
        for (let i = 0; i < l.length; i++) {
            let cfg: Configs.t_Labour_Config_item_dat = l[i];
            if (cfg.f_itemQua == qua) {
                allCount += cfg.f_GetTimes;
                itemList.push(cfg.f_id);
            }
        }
        let myCount: number = 0;
        if (this.redDatalist) {
            for (let i = 0; i < this.redDatalist.length; i++) {
                let cell = this.redDatalist[i];
                if (itemList.indexOf(cell.id) != -1) {
                    myCount += cell.num;
                }
            }
        }
        return myCount >= allCount;
    }


    /**获取已经购买了多少次 */
    public getBuyTime(fid: number) {
        let cell = this._shopList.find(o => o.id == fid);
        if (cell) {
            return cell.num;
        }
        return 0;
    }
    /**获得剩余时间 */
    public get subTime() {
        let _activityVo = ActivityModel.Ins.getVo(this.activteType);
        if (_activityVo && _activityVo.isOpen) {
            let sub: number = _activityVo.endTime - TimeUtil.serverTime;
            if (sub < 0) {
                sub = 0;
            }
            return sub;
        }
        return 0;
    }

    /**获取已经购买了多少次 */
    public getBuyTime1(fid: number) {
        let cell = this.shopDatalist.find(o => o.id == fid);
        if (cell) {
            return cell.num;
        }
        return 0;
    }
}

/**五一模块 */
export class LabordayModel extends LabordayBaseModel{
    private static _ins: LabordayModel;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new LabordayModel();
        }
        return this._ins;
    }
    public type:EModelLabordayType = EModelLabordayType.Laborday;
    protected redKey: string = "l22";
    // public pieces:number = ECellType.LabordayPoint;

    // public coin:number = ECellType.LabordayMoney;
    
    public descid:string = "labordaydesc";

    // public activteType:EActivityType = EActivityType.Laborday;
    /**五一类型 */
    // public f_p2:number = 0;
}
/**六一 */
export class ChildrenModel extends LabordayBaseModel
{
    private static _ins: ChildrenModel;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new ChildrenModel();
        }
        return this._ins;
    }

    protected redKey: string = "l23";
    public type:EModelLabordayType = EModelLabordayType.Children;
    public descid:string = "childrendesc";

    /**六一类型 */
    // public f_p2:number = 1;
    protected regUI(){
        this.funcid = EFuncDef.ChildrenHD;
        this.Reg(new ChildrenView(EViewType.Children));
        this.Reg(new ChildrenPackageView(EViewType.ChildPackage));
        this.Reg(new ChildrenShopView(EViewType.ChildrenShop));
    }
}

/**夏日 */
export class SummerModel extends LabordayBaseModel
{
    private static _ins: SummerModel;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new SummerModel();
        }
        return this._ins;
    }

    protected redKey: string = "l28";
    public type:EModelLabordayType = EModelLabordayType.Summer;
    public descid:string = "summerdesc";

    protected regUI(){
        this.funcid = EFuncDef.Summer;
        this.Reg(new SummerView(EViewType.Summer));
        this.Reg(new SummerPackageView(EViewType.SummerPackage));
        this.Reg(new SummerShopView(EViewType.SummerShop));
    }
}

/**中秋 */
export class MidAutumnModel extends LabordayBaseModel
{
    private static _ins: MidAutumnModel;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new MidAutumnModel();
        }
        return this._ins;
    }

    protected redKey: string = "l28";
    public type:EModelLabordayType = EModelLabordayType.midAutumn;
    public descid:string = "midautumndesc";

    protected regUI(){
        this.funcid = EFuncDef.midAutumn;
        this.Reg(new MidAutumnView(EViewType.midAutumn));
        this.Reg(new MidAutumnPackageView(EViewType.midAutumnPackage));
        this.Reg(new MidAutumnShopView(EViewType.midAutumnrenShop));
        this.Reg(new MidAutumnShopView1(EViewType.midAutumnrenShop1));
    }
}

/**幸运扭蛋 */
export class LuckModel extends LabordayBaseModel{
    funcid = EFuncDef.Luck;
    descid:string = "luckdesc";
    type: EModelLabordayType = EModelLabordayType.luck;
    markTitle:string = "扭蛋商店";
    packTitle:string = "扭蛋礼包";
    // title1
    mainDesc:string = "每次抽取必得10个幸运勋章";
    imgTitle:string = "remote/laborday/xynd.png";
    protected regUI(){
        this.Reg(new LuckView(EViewType.Luck));
        this.Reg(new LuckPackageView(EViewType.LuckPackage));
        this.Reg(new LuckShopView(EViewType.LuckShop));
    }
    private static _ins: LuckModel;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new LuckModel();
        }
        return this._ins;
    }
}

/**元宵 */
export class YuanXiaoModel extends LabordayBaseModel
{
    private static _ins: YuanXiaoModel;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new YuanXiaoModel();
        }
        return this._ins;
    }

    // protected redKey: string = "l28";
    public type:EModelLabordayType = EModelLabordayType.yuanxiao;
    public descid:string = "yuanxiaodesc";

    protected regUI(){
        this.funcid = EFuncDef.yuanxiao;
        this.Reg(new YuanXiaoView(EViewType.yuanxiao));
        this.Reg(new YuanXiaoPackageView(EViewType.yuanxiaoPackage));
        this.Reg(new YuanXiaoShopView(EViewType.yuanxiaoShop));
    }
}

export function getModelLaborDay(type:EModelLabordayType):LabordayBaseModel{
    switch(type){
        case EModelLabordayType.Laborday:
            return LabordayModel.Ins;
        case EModelLabordayType.Children:
            return ChildrenModel.Ins;
        case EModelLabordayType.Summer:
            return SummerModel.Ins;
        case EModelLabordayType.midAutumn:
            return MidAutumnModel.Ins;
        case EModelLabordayType.luck:
            return LuckModel.Ins;
        case EModelLabordayType.yuanxiao:
            return YuanXiaoModel.Ins;
        default:
            throw Error("please set model!");
    }
}