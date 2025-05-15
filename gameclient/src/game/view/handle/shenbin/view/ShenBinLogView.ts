import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import {SocketMgr} from "../../../../network/SocketMgr";
import { ArtifactLogList_req } from "../../../../network/protocols/BaseProto";
import { ShenBinModel } from "../model/ShenBinModel";
import { ShenBinLogItem } from "./ShenBinLogItem";

export class ShenBinLogView extends ViewBase{
    private _ui:ui.views.shenbin.ui_shenbinLogViewUI;
    protected mMask: boolean = true;
    protected mMainSnapshot: boolean = true;

    protected onAddLoadRes(): void {
        this.addAtlas('shenbin.atlas');
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.shenbin.ui_shenbinLogViewUI;
            this.bindClose(this._ui.close1);

            this._ui.list.itemRender = ShenBinLogItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onItemRender);
        }
    }

    protected onInit(): void {
        ShenBinModel.Ins.on(ShenBinModel.UPDATA_LOGVIEW,this,this.upDataView);
        let req:ArtifactLogList_req = new ArtifactLogList_req;
        SocketMgr.Ins.SendMessageBin(req);
    }

    protected onExit(): void {
        ShenBinModel.Ins.off(ShenBinModel.UPDATA_LOGVIEW,this,this.upDataView);
    }

    private onItemRender(item:ShenBinLogItem){
        item.setData(item.dataSource);
    }

    private upDataView(){
        this._ui.list.array = ShenBinModel.Ins.dataLogList;
    }
}