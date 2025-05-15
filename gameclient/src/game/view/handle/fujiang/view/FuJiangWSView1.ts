import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import {SocketMgr} from "../../../../network/SocketMgr";
import { ChiefAssist_req, ChiefLosslessReplacement_req, stChief } from "../../../../network/protocols/BaseProto";
import { FuJiangItemCtl1 } from "./ctl/FuJiangItemCtl1";

export class FuJiangWSView1 extends ViewBase{
    private _ui:ui.views.fujiang.ui_fujiangWSView1UI;
    protected mMask = true;
    protected mMainSnapshot = true;

    private _itemCtl:FuJiangItemCtl1;
    private _itemCtl1:FuJiangItemCtl1;

    protected onAddLoadRes() {
        this.addAtlas('fujiang.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.fujiang.ui_fujiangWSView1UI;
            this.bindClose(this._ui.btn_close);

            ButtonCtl.Create(this._ui.btn_qx,new Laya.Handler(this,this.onBtnQXClick));
            ButtonCtl.Create(this._ui.btn_qd,new Laya.Handler(this,this.onBtnQDClick));

            this._itemCtl = new FuJiangItemCtl1(this._ui.item);
            this._itemCtl1 = new FuJiangItemCtl1(this._ui.item1);
        }
    }

    private _type:number;
    private _index:number;
    private _data:stChief;
    private _data1:stChief;
    protected onInit(): void {
        this._type = this.Data[0];
        this._data = this.Data[1];
        this._data1 = this.Data[2];
        this._index = this.Data[3];
        this._itemCtl.setData(this._data);
        this._itemCtl1.setData(this._data1);
    }

    protected onExit(): void {
        
    }

    private onBtnQXClick(){
        this.Close();
    }

    private onBtnQDClick(){
        if(this._type == 1){
            let req:ChiefLosslessReplacement_req = new ChiefLosslessReplacement_req;
            req.cheifId = this._data.cheifId;
            req.cheifReplaceId = this._data1.cheifId;
            SocketMgr.Ins.SendMessageBin(req);
        }else if(this._type == 2){
            let req:ChiefAssist_req = new ChiefAssist_req;
            req.assistId = this._index;
            req.cheifId = this._data1.cheifId;
            SocketMgr.Ins.SendMessageBin(req);
        }
        this.Close();
        E.ViewMgr.Close(EViewType.FuJiangCK);
    }
}