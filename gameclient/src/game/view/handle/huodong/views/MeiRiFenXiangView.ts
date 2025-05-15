import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { ShareReward_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { EFuncDef } from "../../main/model/EFuncDef";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { ItemVo } from "../../main/vos/ItemVo";
import { System_RefreshTimeProxy } from "../model/ActivityProxy";

//每日分享主界面
export class MeiRiFenXiangView extends ViewBase{
    private _ui:ui.views.huodong.ui_daily_shareUI;
    protected mMask = true;
    protected autoFree = true;
    protected  onAddLoadRes(){
        this.addAtlas('huodong.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.huodong.ui_daily_shareUI;
            this.bindClose(this._ui.btn_close);

            this.btnList.push(ButtonCtl.Create(this._ui.btn_mf,new Laya.Handler(this,this.onBtnClick)));

            this._ui.list.itemRender = ui.views.main.ui_slot_itemUI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onItemHandler);
            this.onShareReward();
        }
    }

    protected onInit(){
        let arr = System_RefreshTimeProxy.Ins.GetDataById(59).f_SystemConfig.split("|");
        this._ui.list.array = arr;
        MainModel.Ins.on(MainEvent.WxOnShow,this,this.onWxOnShow);
        MainModel.Ins.on(MainEvent.ShareReward,this,this.onShareReward);
        MainModel.Ins.on(MainEvent.ShareSuccess,this,this.onWxOnShow);
        this.onShareReward();
    }

    private onWxOnShow() {
        const req = new ShareReward_req();
        req.funcId = EFuncDef.FenXiang;
        req.type = 0;
        SocketMgr.Ins.SendMessageBin(req);
    }

    protected onExit(){
        MainModel.Ins.off(MainEvent.WxOnShow,this,this.onWxOnShow);
        MainModel.Ins.off(MainEvent.ShareReward,this,this.onShareReward);
        MainModel.Ins.off(MainEvent.ShareSuccess,this,this.onWxOnShow);
    }

    private onItemHandler(item:ui.views.main.ui_slot_itemUI){
        let vo = new ItemVo();
        vo.cfgId = parseInt(item.dataSource.split("-")[0]);
        vo.count = parseInt(item.dataSource.split("-")[1]);
        ItemViewFactory.refreshSlot(item,vo);
    }

    private onBtnClick(){
        const data = MainModel.Ins.shareReward;
        const d = data.dataList.find(o => o.funcId === EFuncDef.FenXiang);
        if (!d) return;
        switch (d.state) {
            case 0:
                E.sdk.goShareData('');
                break;
            case 2:
                const req = new ShareReward_req();
                req.funcId = EFuncDef.FenXiang;
                req.type = 1;
                SocketMgr.Ins.SendMessageBin(req);
                break;
        }
    }

    private onShareReward() {
        const data = MainModel.Ins.shareReward;
        const d = data.dataList.find(o => o.funcId === EFuncDef.FenXiang);
        let state = d.state || 0;
        let txt = '';
        switch (state) {
            case 0:
                txt = '分享';
                this._ui.btn_mf.disabled = false;
                break;
            case 1:
                txt = '已领取';
                this._ui.btn_mf.disabled = true;
                break;
            case 2:
                txt = '领取';
                this._ui.btn_mf.disabled = false;
                break;
        }
        this._ui.fx_tf.text = txt;
    }
}