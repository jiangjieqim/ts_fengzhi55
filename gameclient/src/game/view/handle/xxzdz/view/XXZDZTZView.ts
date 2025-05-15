import {StringUtil} from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import {SocketMgr} from "../../../../network/SocketMgr";
import { StarBattleEnemys_req } from "../../../../network/protocols/BaseProto";
import { ValCtl } from "../../main/ctl/ValLisCtl";
import { MainModel } from "../../main/model/MainModel";
import { EQuickMsg } from "../../main/model/QuickMsgVo";
import { ECellType } from "../../main/vos/ECellType";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { XXZDZModel } from "../model/XXZDZModel";
import { StarConfigProxy } from "../proxy/xxzdxProxy";
import { XXZDZItem4 } from "./item/XXZDZItem4";

export class XXZDZTZView extends ViewBase{
    private _ui:ui.views.xxzdz.ui_xxzdzTZViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree = true;

    protected onAddLoadRes() {
        this.addAtlas("xxzdz.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.xxzdz.ui_xxzdzTZViewUI;
            this.bindClose(this._ui.btn_close);

            ValCtl.Create(this._ui.lab2,this._ui.img,ECellType.BaoZi);
            this.btnList.push(
            ButtonCtl.Create(this._ui.btn_qd,new Laya.Handler(this,this.onBtnQDClick)),
            ButtonCtl.Create(this._ui.btn_tip,new Laya.Handler(this,this.onBtnTipClick))
            )
            this._ui.list.itemRender = XXZDZItem4;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onItemRender);
        }
    }

    private onBtnTipClick(){
        E.ViewMgr.openHelpView("xxzdzTZTitle","xxzdzTZDec");
    }

    private onItemRender(item:XXZDZItem4){
        item.setData(item.dataSource);
    }

    private onBtnQDClick(){
        let arr = StarConfigProxy.Ins.GetDataById(1).f_refreshcost.split("-");
        MainModel.Ins.queryMsg("刷新对手",parseInt(arr[0]),parseInt(arr[1]),EQuickMsg.XXZDZ,new Laya.Handler(this,this.onClickHandler));
    }

    private onClickHandler(){
        let st = StarConfigProxy.Ins.GetDataById(1).f_refreshcost;
        if(MainModel.Ins.isItemEnoughSt(st,true)){
            let req:StarBattleEnemys_req = new StarBattleEnemys_req;
            req.type = 1;
            SocketMgr.Ins.SendMessageBin(req); 
        }
    }

    protected onInit(): void {
        XXZDZModel.Ins.on(XXZDZModel.UPDATA_TIAOZHAN_VIEW,this,this.onUpdataView);

        let req:StarBattleEnemys_req = new StarBattleEnemys_req;
        req.type = 0;
        SocketMgr.Ins.SendMessageBin(req);

        let val = MainModel.Ins.mRoleData.getVal(ECellType.BaoZi);
        this._ui.lab2.text = StringUtil.val2m(val);
        this._ui.img.skin = IconUtils.getIconByCfgId(ECellType.BaoZi);

        let arr = StarConfigProxy.Ins.GetDataById(1).f_refreshcost.split("-");
        this._ui.img2.skin = IconUtils.getIconByCfgId(parseInt(arr[0]));
        this._ui.nameTf.text = arr[1];
    }

    protected onExit(): void {
        XXZDZModel.Ins.on(XXZDZModel.UPDATA_TIAOZHAN_VIEW,this,this.onUpdataView);
    }

    private onUpdataView(){
        this._ui.list.array = XXZDZModel.Ins.starBEList;
    }
}