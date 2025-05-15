import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { TabControl } from "../../../../../frame/view/TabControl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { FreshStationNearBy_req, OpenStationNearBy_req, RemarkStationList_req, StationPillagesNew_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { PaoShangModel } from "../model/PaoShangModel";
import { PaoShangCfgProxy } from "../proxy/PaoShangProxy";
import { PaoShangNearItem1 } from "./item/PaoShangNearItem1";
import { PaoShangNearItem2 } from "./item/PaoShangNearItem2";

/* @Author: tsy
 * @Date: 2023-03-01 14:21:21
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-08-23 15:01:34
*/
export class PaoShangNearView extends ViewBase {
    private _ui: ui.views.paoshang.ui_paoshangYZUI;
    protected mMask = true;

    private tabsCtl: TabControl;
    private tabList: any;

    private timeCtl1: TimeCtl;
    private timeCtl: TimeCtl;

    protected onAddLoadRes() {
        this.addAtlas('paoshang.atlas');
    }

    protected onFirstInit() {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.paoshang.ui_paoshangYZUI;
            this.bindClose(this._ui.close1);

            const tabsSkin = [this._ui.tab1, this._ui.tab2];
            this.tabList = ["附近商队", "标记名单"];
            this.tabsCtl  = new TabControl();
            this.tabsCtl.init(tabsSkin, new Laya.Handler(this, this.onTabSelectHandler), new Laya.Handler(this, this.itemTabHandler));

            ButtonCtl.Create(this._ui.btn, new Laya.Handler(this, this.onBtnClick));

            this._ui.list1.itemRender = PaoShangNearItem1;
            this._ui.list1.renderHandler = new Laya.Handler(this, this.itemRender1);

            this._ui.list2.itemRender = PaoShangNearItem2;
            this._ui.list2.renderHandler = new Laya.Handler(this, this.itemRender2);

            this.timeCtl1 = new TimeCtl(this._ui.lab_sx);
            this.timeCtl = new TimeCtl(this._ui.lab_time);
        }
    }

    protected onInit() {
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onStageUp);
        PaoShangModel.Ins.on(PaoShangModel.UPDATA_NEARVIEW, this, this.updataNearView);
        PaoShangModel.Ins.on(PaoShangModel.UPDATA_FRIENDVIEW, this, this.updataFriendView);
        PaoShangModel.Ins.on(PaoShangModel.UPDATA_RES, this, this.updataRes);
        this.tabsCtl.forceSelectIndex(0);
    }

    protected onExit() {
        Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onStageUp);
        PaoShangModel.Ins.off(PaoShangModel.UPDATA_NEARVIEW, this, this.updataNearView);
        PaoShangModel.Ins.off(PaoShangModel.UPDATA_FRIENDVIEW, this, this.updataFriendView);
        PaoShangModel.Ins.off(PaoShangModel.UPDATA_RES, this, this.updataRes);
        this.timeCtl.stop();
        this.timeCtl1.stop();
    }

    private onStageUp() {

    }

    private onBtnClick() {
        let req: FreshStationNearBy_req = new FreshStationNearBy_req();
        SocketMgr.Ins.SendMessageBin(req);
    }

    private itemRender1(item: PaoShangNearItem1) {
        item.setData(item.dataSource);
    }

    private itemRender2(item: PaoShangNearItem2) {
        item.setData(item.dataSource)
    }

    private onTabSelectHandler(v: number) {
        switch (v) {
            case 0:
                let req: OpenStationNearBy_req = new OpenStationNearBy_req();
                SocketMgr.Ins.SendMessageBin(req);
                break;
            case 1:
                let reqq: RemarkStationList_req = new RemarkStationList_req();
                SocketMgr.Ins.SendMessageBin(reqq);
                break;
        }
    }

    private itemTabHandler(tabSkin, index: number, sel: boolean, data) {
        let skin: ui.views.paoshang.ui_tabUI = tabSkin;
        skin.txt.text = this.tabList[index];
        if (sel) {
            skin.img1.visible = false;
            skin.img2.visible = true;
        } else {
            skin.img1.visible = true;
            skin.img2.visible = false;
        }
    }

    private updataNearView() {
        this.updataRes();
        if (PaoShangModel.Ins.nearCD) {
            this.timeCtl1.start(PaoShangModel.Ins.nearCD, new Laya.Handler(this, this.onUpdateTime1), new Laya.Handler(this, this.endTime1));
        } else {
            this.endTime1();
            this.timeCtl1.stop();
        }
        this._ui.list1.visible = true;
        this._ui.list1.array = PaoShangModel.Ins.nearDataList;
        this._ui.list2.visible = false;
        this._ui.list2.array = [];
        this._ui.btn.visible = true;
        this._ui.lab_f.visible = this._ui.lab_f_num.visible = false;
    }

    private onUpdateTime1() {
        let time_str = TimeUtil.subTime(this.timeCtl1.tickVal);
        this.timeCtl1.setText(time_str);
    }

    private endTime1() {
        this.timeCtl1.setText("刷新");
    }

    private updataFriendView() {
        this._ui.list1.visible = false;
        this._ui.list1.array = [];
        this._ui.list2.visible = true;
        this._ui.list2.array = PaoShangModel.Ins.friendDataList;
        this._ui.btn.visible = false;
        this._ui.lab_f.visible = this._ui.lab_f_num.visible = true;
        this._ui.lab_f_num.text = PaoShangModel.Ins.friendDataList.length + "/" + PaoShangCfgProxy.Ins.GetDataById(1).f_MarkListMax;
    }

    private updataRes() {
        if (PaoShangModel.Ins.nextRecoverUnix) {
            let t = PaoShangModel.Ins.nextRecoverUnix - TimeUtil.serverTime;
            if(t > 0){
                this.timeCtl.start(t, new Laya.Handler(this, this.onUpdateTime), new Laya.Handler(this, this.endTime));
            }
        } else {
            this.timeCtl.setText("");
            this.timeCtl.stop();
        }
        this._ui.tx1.text = PaoShangModel.Ins.pillagesNew + "/" + PaoShangCfgProxy.Ins.GetDataById(1).f_LootMax;
        this._ui.txt2.text = PaoShangModel.Ins.passportsFromDestory + "/" + PaoShangCfgProxy.Ins.GetDataById(1).f_DestoryMax;
    }

    private onUpdateTime() {
        let time_str = TimeUtil.subTime(this.timeCtl.tickVal);
        this.timeCtl.setText(time_str);
    }

    private endTime() {
        this.timeCtl.setText("");
        let req:StationPillagesNew_req = new StationPillagesNew_req;
        SocketMgr.Ins.SendMessageBin(req);
    }
}