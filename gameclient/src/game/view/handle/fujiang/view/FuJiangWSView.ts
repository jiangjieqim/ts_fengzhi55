import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import {SocketMgr} from "../../../../network/SocketMgr";
import { ChiefIntoBattle_req, stChief } from "../../../../network/protocols/BaseProto";
import { FuJiangModel } from "../model/FuJiangModel";
import { FuJiangItemCtl1 } from "./ctl/FuJiangItemCtl1";

export class FuJiangWSView extends ViewBase{
    private _ui:ui.views.fujiang.ui_fujiangWSViewUI;
    protected mMask = true;
    protected mMainSnapshot = true;

    private _itemCtl:FuJiangItemCtl1;

    protected onAddLoadRes() {
        this.addAtlas('fujiang.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.fujiang.ui_fujiangWSViewUI;
            this.bindClose(this._ui.btn_close);

            ButtonCtl.Create(this._ui.btn_xc,new Laya.Handler(this,this.onBtnXCClick));
            ButtonCtl.Create(this._ui.btn_hj,new Laya.Handler(this,this.onBtnHJClick));

            this._itemCtl = new FuJiangItemCtl1(this._ui.item);
        }
    }

    protected onInit(): void {
        this._data = this.Data;
        this._itemCtl.setData(this._data);
    }

    protected onExit(): void {
        
    }

    private _data:stChief;
    private onBtnXCClick(){
        // let arr = FuJiangModel.Ins.getSZNoList();
        // if(arr.length == 1){
        //     E.ViewMgr.ShowMidError("不能下阵所有副将");//显示错误提示
        //     return;
        // }
        let req:ChiefIntoBattle_req = new ChiefIntoBattle_req;
        req.type = 0;
        req.pos = 0;
        req.isChief = this._data.isChief;
        req.cheifId = this._data.cheifId;
        SocketMgr.Ins.SendMessageBin(req);
        this.Close();
    }

    private onBtnHJClick(){
        this.Close();
        E.ViewMgr.Open(EViewType.FuJiangCK,null,[1,this._data]);
    }
}