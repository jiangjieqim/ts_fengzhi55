import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { EMsgBoxType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { stActivityCell } from "../../../../network/protocols/BaseProto";
import { MoneyCtl } from "../../main/ctl/MoneyCtl";
import { EGameColor } from "../../main/model/EGameColor";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainModel } from "../../main/model/MainModel";
import { ECellType } from "../../main/vos/ECellType";
import { ItemVo } from "../../main/vos/ItemVo";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { ActivityModel } from "../ActivityModel";
import { t_Pack_Shop_MartProxy, t_Pack_Shop_Mart_ConfigProxy } from "./ActivityProxy";
import { ActivityVo } from "./ActivityVo";
import { EActivityType } from "./EActivityType";
import { BaseXingFuKuanghuanCtl } from "./KaiXiangDajiCtl";

class ZheKouItemRenderCtl {
    private skin: ui.views.huodong.ui_zhekoushangdian_itemUI;
    private cfg: Configs.t_Pack_Shop_Market_dat;
    private _activityVo: ActivityVo;
    private _needItem:ItemVo;
    constructor(skin: ui.views.huodong.ui_zhekoushangdian_itemUI) {
        this.skin = skin;
        this.skin.on(Laya.Event.CLICK,this,this.onClickHandler);
    }

    private onClickHandler(){
        ActivityModel.Ins.buySomething(this._activityVo,this.cfg.f_id,this._needItem);
    }
    private set showRed(v:boolean){
        // this.skin.redimg.visible = v;
    }
    public setData(data, _activityVo: ActivityVo) {
        if(data){
            let cfg:Configs.t_Pack_Shop_Market_dat = data;
            this.cfg = cfg;
            this._activityVo = _activityVo;
            this.skin.visible = true;
            this.showRed = false;
            let _itemVo:ItemVo = ItemViewFactory.convertItemList(cfg.f_Goods)[0];
            this.skin.tf1.text = _itemVo.getName();
            ItemViewFactory.refreshSlot(this.skin.slot,_itemVo,false);
            if(cfg.f_Discount == 0){
                this.skin.zhekouImg.skin = "";
            }else{
                this.skin.zhekouImg.skin = `remote/huodong/zhekou_${cfg.f_Discount}.png`;
            }
            this.skin.saleOutBg.visible = false;

            let _needItem: ItemVo = ItemViewFactory.convertItemList(cfg.f_price)[0];
            this._needItem = _needItem;
            if (_needItem.count == 0) {
                this.skin.needmoney.text = E.getLang("Free");
                this.skin.needmoney.color = EGameColor.GREED;
                this.skin.needicon.visible = false;
            } else {
                this.skin.needmoney.text = _needItem.count.toString();
                this.skin.needicon.visible = true;
                this.skin.needicon.skin = IconUtils.getIconByCfgId(_needItem.cfgId)
                if(_needItem.count > MainModel.Ins.mRoleData.getVal(_needItem.cfgId)){
                    this.skin.needmoney.color = EGameColor.RED;
                }else{
                    this.skin.needmoney.color = EGameColor.NORMAL_YELLOW;
                }
            }
            let _serverBuyTime:number = 0;
            if(_activityVo){
                _serverBuyTime = _activityVo.getParam1(cfg.f_id);
            }
            if(_serverBuyTime >=cfg.f_BuyTimes){
                this.skin.saleOutBg.visible = true;
            }else{
                this.skin.saleOutBg.visible = false;
            }
        }else{
            this.skin.visible = false;
        }
    }
}

class ZhouKaiBigItem extends ui.views.huodong.ui_zhekoushangdian_item1UI{
    private itemList:ZheKouItemRenderCtl[] = [];
    constructor(){
        super();
        for(let i = 0;i < 3;i++){
            this.itemList.push(new ZheKouItemRenderCtl(this["item"+i]));
        }
    }
    public refreshView(_vo:ActivityVo){
        let arr = this.dataSource;
        for(let i = 0;i < this.itemList.length;i++){
            let _data = arr[i];
            let cell:ZheKouItemRenderCtl = this.itemList[i];
            cell.setData(_data,_vo);
        }
    }
}


/**开箱大吉-折扣商店 t_Pack_Shop_Mart*/
export class ZheKouShopCtl extends BaseXingFuKuanghuanCtl{
    public skin:ui.views.huodong.ui_zhekoushangdian_viewUI;
    protected activityType:EActivityType = EActivityType.Pack_Shop_Mart;
    private _moneyCtl:MoneyCtl;
    private _itemVo:ItemVo;
    constructor(){
        super();
    }
    public onFirstInit(){
        super.onFirstInit();
        this.skin.list1.itemRender = ZhouKaiBigItem;
        this.skin.list1.renderHandler = new Laya.Handler(this,this.onItemHandler);
        ButtonCtl.CreateBtn(this.skin.btn1,this,this.onRefreshHandler);
        this._moneyCtl = new MoneyCtl(this.skin.moneyTf,ECellType.GOLD);
        this.skin.moneyicon.skin = IconUtils.getIconByCfgId(ECellType.GOLD);
        // this.skin.moneyCon.mouseEnabled = false;
        // this.skin.needicon.mouseEnabled = false;
    }

    /**刷新 */
    private onRefreshHandler(){
        if(this._activityVo){
            E.ViewMgr.ShowMsgBox(EMsgBoxType.OkOrCancel,E.LangMgr.getLang("AreYouPayRefresh",this._itemVo.cntName),new Laya.Handler(this,this.okHandler));
        }
    }
    private okHandler(){
        ActivityModel.Ins.lingQu(this._activityVo.uid,0);
    }

    public onInit(){
        super.onInit();
        this._moneyCtl.init();
        this.onUpdateView();
        this.skin.list1.scrollTo(0);
    }

    private onItemHandler(item:ZhouKaiBigItem){
        item.refreshView(this._activityVo);
    }

    public onExit(){
        super.onExit();
        this._moneyCtl.exit();
    }
    private getNewList(arr:Configs.t_Pack_Shop_Market_dat[]){
        if(!this._activityVo.vo){
            return [];
        }
        let l = [];
        let nl:stActivityCell[] = this._activityVo.vo.datalist||[];
        for(let i = 0;i < arr.length;i++){
            let cell:Configs.t_Pack_Shop_Market_dat = arr[i];
            let item = nl.find(item=>item.id == cell.f_id);
            if(item){
                l.push(cell);
            }
        }
        return l;
    }
    protected onUpdateView(){
        
        if(!this._activityVo){
            return;
        }
        //活动数据更新
        let arr = this.getNewList(t_Pack_Shop_MartProxy.Ins.List);
        let groupList = [];
        let _maxCnt = 3;
        let la = [];
        for(let i = 0;i < arr.length;i++){
            let cell = arr[i];
            if(i % _maxCnt == 0){
                la = [];
                groupList.push(la);
            }
            groupList[groupList.length - 1].push(cell);
        }
        this.skin.list1.array = groupList;
        this.skin.list1.refresh();
        let cfg:Configs.t_Pack_Shop_Market_Config_dat = t_Pack_Shop_Mart_ConfigProxy.Ins.GetDataById(1);
        let _itemVo:ItemVo = ItemViewFactory.convertItemList(cfg.f_RefreshPrice)[0];
        this._itemVo = _itemVo;
        this.skin.needicon.skin = _itemVo.getIcon();
        this.skin.tf2.text = _itemVo.count.toString();
    }
}