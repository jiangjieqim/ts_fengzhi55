import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EMsgBoxType } from "../../../../common/defines/EnumDefine";
import { SocketMgr } from "../../../../network/SocketMgr";
import { ChiefBuyFlag_req, ChiefChangeFlag_req } from "../../../../network/protocols/BaseProto";
import { System_RefreshTimeProxy } from "../../huodong/model/ActivityProxy";
import { MainModel } from "../../main/model/MainModel";
import { t_Platform } from "../../main/proxy/t_Platform";
import { ItemVo } from "../../main/vos/ItemVo";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { FuJiangModel } from "../model/FuJiangModel";
import { FuJiangFlagListProxy, FuJiangFlagUpgradeProxy } from "../proxy/FuJiangProxy";

export class FuJIiangZQGHView extends ViewBase{
    private _ui:ui.views.fujiang.ui_fujiangZQGHViewUI;
    protected mMask = true;
    protected mMainSnapshot = true;
    private _gmCtl:ButtonCtl;
    private _yjgmCtl:ButtonCtl;

    protected onAddLoadRes() {
        this.addAtlas('fujiang.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.fujiang.ui_fujiangZQGHViewUI;
            this.bindClose(this._ui.btn_close);

            ButtonCtl.Create(this._ui.btn_qx,new Laya.Handler(this,this.onBtnXCClick));
            this._gmCtl = ButtonCtl.Create(this._ui.btn_gm,new Laya.Handler(this,this.onBtnGMClick));
            this._yjgmCtl = ButtonCtl.Create(this._ui.btn_yjgm,new Laya.Handler(this,this.onBtnYJGMClick));

            this._ui.list.itemRender = ui.views.fujiang.ui_fujiangAttrItem9UI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);

            this._ui.list1.itemRender = ui.views.fujiang.ui_fujiangZQItemUI;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onRenderHandler1);
            this._ui.list1.selectEnable = true;
        }
    }

    private onBtnXCClick(){
        let cfg = this._ui.list1.selectedItem;
        if(cfg){
            let req:ChiefChangeFlag_req = new ChiefChangeFlag_req;
            req.id = cfg.f_id;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private onBtnGMClick(){
        let cfg:Configs.t_Chief_Flag_List_dat = this._ui.list1.selectedItem;
        if(cfg){
            let vo:ItemVo = new ItemVo;
            vo.cfgId = parseInt(cfg.f_flagprice.split("-")[0]);
            vo.count = parseInt(cfg.f_flagprice.split("-")[1]);
            E.ViewMgr.ShowMsgBox(
                EMsgBoxType.OkOrCancel,
                `确定使用${vo.count}个${vo.getName()}购买?`,
                new Laya.Handler(this, () => {
                    let req:ChiefBuyFlag_req = new ChiefBuyFlag_req;
                    req.id = cfg.f_id;
                    SocketMgr.Ins.SendMessageBin(req);
                })
            );
        }
    }

    private onBtnYJGMClick(){
        E.ViewMgr.ShowMsgBox(
            EMsgBoxType.OkOrCancel,
            "是否花费" + this._ui.lab_num.text +"元宝一键购买全部战旗？",
            new Laya.Handler(this, () => {
                let req:ChiefBuyFlag_req = new ChiefBuyFlag_req;
                req.id = 0;
                SocketMgr.Ins.SendMessageBin(req);
            })
        );
    }

    private onRenderHandler(item:ui.views.fujiang.ui_fujiangAttrItem9UI,index:number){
        item.tf1.color = item.valTf.color = "#FB5AFB";
        let id = parseInt(item.dataSource.split(":")[0]);
        let val = parseInt(item.dataSource.split(":")[1]);

        let cfg = this._ui.list1.selectedItem;
        let uCfg = FuJiangFlagUpgradeProxy.Ins.getCfgById(FuJiangModel.Ins.flagSerial);
        let lvSt = cfg.f_flag_defence_upgrade_dentifty.split("|")[index];
        let lvNum:number = parseInt(lvSt.split(":")[1]) * (uCfg.f_flagstage - 1);

        let val1 = val + lvNum;
        item.tf1.text = MainModel.Ins.getAttrNameIdByID(id) + ":";
        item.valTf.text = attrConvert(id,val1);
    }

    private onRenderHandler1(item:ui.views.fujiang.ui_fujiangZQItemUI,index:number){
        if(this._ui.list1.selectedIndex == -1)return;
        let cfg:Configs.t_Chief_Flag_List_dat = item.dataSource;
        item.icon.skin = FuJiangFlagListProxy.Ins.getFlagIcon(cfg.f_id);
        if(cfg.f_id == FuJiangModel.Ins.flagId){
            item.ck.visible = true;
        }else{
            item.ck.visible = false;
        }
        if(FuJiangModel.Ins.flagList.indexOf(cfg.f_id) == -1){
            item.lockMask.visible = true;
        }else{
            item.lockMask.visible = false;
        }

        if(index == this._ui.list1.selectedIndex){
            item.sel.visible = true;
            this._ui.icon.skin = FuJiangFlagListProxy.Ins.getFlagIcon(cfg.f_id);
            this._ui.lab_name.text = cfg.f_flag;
            if(cfg.f_flag_defence_dentifty != ""){
                this._ui.list.array = cfg.f_flag_defence_dentifty.split("|");
            }else{
                this._ui.list.array = [];
            }
            
            this._ui.btn_gm.visible = false;
            this._ui.btn_yjgm.visible = false;
            if(cfg.f_id == FuJiangModel.Ins.flagId){
                this._ui.lab_sel.visible = true;
                this._ui.btn_qx.visible = false;
            }else{
                this._ui.lab_sel.visible = false;
                if(FuJiangModel.Ins.flagList.indexOf(cfg.f_id) == -1){
                    this._ui.btn_qx.visible = false;
                    if(t_Platform.Ins.isOneLvUp){
                        this._ui.btn_yjgm.visible = true;
                        this._ui.btn_gm.visible = true;
                        this._gmCtl.setpos(96,732);
                        this._yjgmCtl.setpos(328,732);
                        let arr = FuJiangFlagListProxy.Ins.List;
                        let num:number = 0;
                        let id:number = 0;
                        for(let i:number=0;i<arr.length;i++){
                            if(FuJiangModel.Ins.flagList.indexOf(arr[i].f_id) == -1){
                                id = parseInt(arr[i].f_flagprice.split("-")[0]);
                                num += parseInt(arr[i].f_flagprice.split("-")[1]);
                            }
                        }
                        let nnn = parseInt(System_RefreshTimeProxy.Ins.getVal(86));
                        this._ui.lab_num.text = num * nnn / 100 + "";
                        this._ui.lab_num1.text = num + "";
                        this._ui.img1.skin = IconUtils.getIconByCfgId(id);
                    }else{
                        this._ui.btn_gm.visible = true;
                        this._gmCtl.setpos(189,732);
                    }
                }else{
                    this._ui.btn_qx.visible = true;
                }
            }
        }else{
            item.sel.visible = false;
        }
    }

    protected onInit(): void {
        FuJiangModel.Ins.on(FuJiangModel.FLAG_LIST,this,this.onupdataView);
        FuJiangModel.Ins.on(FuJiangModel.FLAG_ID,this,this.onupdataView);
        this.updataView();
        
    }

    protected onExit(): void {
        FuJiangModel.Ins.off(FuJiangModel.FLAG_LIST,this,this.onupdataView);
        FuJiangModel.Ins.off(FuJiangModel.FLAG_ID,this,this.onupdataView);
        this._ui.list1.selectedIndex = -1;
    }

    private onupdataView(){
        this._ui.list1.refresh();
    }

    private updataView(){
        let arr = FuJiangFlagListProxy.Ins.List;
        this._ui.list1.array = arr;
        let index = 0;
        for(let i:number=0;i<arr.length;i++){
            if(arr[i].f_id == FuJiangModel.Ins.flagId){
                index = i;
                break;
            }
        }
        this._ui.list1.selectedIndex = index;
    }
}