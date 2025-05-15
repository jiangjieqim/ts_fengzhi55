import {StringUtil} from "../../../../../frame/util/StringUtil";
import {TimeUtil} from "../../../../../frame/util/TimeUtil";
import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { TabControl } from "../../../../../frame/view/TabControl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import {SocketMgr} from "../../../../network/SocketMgr";
import { PalaceUpdateShop_req } from "../../../../network/protocols/BaseProto";
import { ValCtl } from "../../main/ctl/ValLisCtl";
import { MainModel } from "../../main/model/MainModel";
import { ECellType } from "../../main/vos/ECellType";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { WuShenDianModel } from "../model/WuShenDianModel";
import { WuShenDianConfigProxy, WuShenDianShopProxy } from "../proxy/WuShenDianProxy";
import { WuShenDianShopItem } from "./item/WuShenDianShopItem";

export class WuShenDianShopView extends ViewBase{
    private _ui:ui.views.wushendian.ui_wushendianShopViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree = true;
    private _timeCtl:TimeCtl;

    private tabsCtl:TabControl;
    private tabList: any;

    protected onAddLoadRes() {
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.wushendian.ui_wushendianShopViewUI;
            this.bindClose(this._ui.btn_close);

            this._ui.list.itemRender = WuShenDianShopItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onItemRender);

            ValCtl.Create(this._ui.lab2,this._ui.img2,ECellType.ShenHun);

            this._timeCtl = new TimeCtl(this._ui.time1);

            const tabsSkin = [this._ui.tab1,this._ui.tab2];
            this.tabList = ["道具商店","副将商店"];
            this.tabsCtl  = new TabControl();
            this.tabsCtl.init(tabsSkin, new Laya.Handler(this,this.onTabSelectHandler), new Laya.Handler(this, this.itemTabHandler));
        }
    }

    private itemTabHandler(tabSkin, index: number, sel: boolean, data){
        let skin: ui.views.wushendian.ui_tabUI = tabSkin;
        skin.lab_name.text = this.tabList[index];
        if (sel) {
            skin.img1.visible = false;
            skin.img2.visible = true;
        } else {
            skin.img1.visible = true;
            skin.img2.visible = false;
        }
    }

    private onTabSelectHandler(v:number){
        if(v == -1)return;
        this._ui.list.array = WuShenDianShopProxy.Ins.getListByType(v + 1);
    }

    protected onInit(): void {
        WuShenDianModel.Ins.on(WuShenDianModel.UPDATA_SHOP_VIEW,this,this.updataView);
        WuShenDianModel.Ins.on(WuShenDianModel.UPDATA_SHOPGM_VIEW,this,this.onUpdataView);
        let req:PalaceUpdateShop_req = new PalaceUpdateShop_req;
        SocketMgr.Ins.SendMessageBin(req);
    }

    protected onExit(): void {
        WuShenDianModel.Ins.off(WuShenDianModel.UPDATA_SHOP_VIEW,this,this.updataView);
        WuShenDianModel.Ins.off(WuShenDianModel.UPDATA_SHOPGM_VIEW,this,this.onUpdataView);
        this._timeCtl.stop();
        this.tabsCtl.selectIndex = -1;
    }

    private onItemRender(item:WuShenDianShopItem){
        item.setData(item.dataSource);
    }

    private updataView(){
        let val = MainModel.Ins.mRoleData.getVal(ECellType.ShenHun);
        this._ui.lab2.text = StringUtil.val2m(val);

        let time = WuShenDianModel.Ins.shopRefreshUnix - TimeUtil.serverTime;
        if (time > 0) {
            this._timeCtl.start(time, new Laya.Handler(this, this.onUpdateTime), new Laya.Handler(this, this.endTime));
        } else {
            this.endTime();
            this._timeCtl.stop();
        }

        this.tabsCtl.selectIndex = 0;

        this._ui.icon.skin = IconUtils.getIconByCfgId(ECellType.ShenHun);
        this._ui.lab_sx.text = WuShenDianModel.Ins.itemNum + "/" + WuShenDianConfigProxy.Ins.GetDataById(1).f_SoulpieceMax;
    }

    private onUpdateTime(){
        let time_str = TimeUtil.subTime(this._timeCtl.tickVal);
        this._timeCtl.setText(time_str);
     }

     private endTime(){
        this._timeCtl.setText("");
     }

    private onUpdataView(){
        this._ui.list.refresh();
    }
}