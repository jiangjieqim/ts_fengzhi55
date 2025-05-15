import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { CheckBoxCtl, ICheckBoxSkin } from "../../../../../frame/view/CheckBoxCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import {SocketMgr} from "../../../../network/SocketMgr";
import { OpenArtifactBox_req } from "../../../../network/protocols/BaseProto";
import { SimpleEffect } from "../../avatar/SimpleEffect";
import {DotManager} from "../../common/DotManager";
import { VipModel, VipType } from "../../huodong/model/VipModel";
import { ValCtl } from "../../main/ctl/ValLisCtl";
import { MainModel } from "../../main/model/MainModel";
import { RedEnum } from "../../main/model/RedEnum";
import { RedUpdateModel } from "../../main/model/RedUpdateModel";
import { ItemProxy } from "../../main/proxy/ItemProxy";
import { ECellType } from "../../main/vos/ECellType";
import { EClientType } from "../../sdk/ClientType";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { ShenBinFeastModel } from "../model/ShenBinFeastModel";
import { ShenBinModel } from "../model/ShenBinModel";
import { ShenBinCfgProxy, ShenBinListProxy } from "../proxy/ShenBinProxy";
import { ShenBinAttrItem } from "./ShenBinAttrItem";
import { ShenBinCtl } from "./ShenBinCtl";

export class ShenBinView extends ViewBase{
    private _ui:ui.views.shenbin.ui_shenbinViewUI;
    protected mMask: boolean = true;
    protected mMainSnapshot: boolean = true;
    protected autoFree = true;
    private _shenBinCtl1:ShenBinCtl;
    private _shenBinCtl2:ShenBinCtl;
    private _shenBinCtl3:ShenBinCtl;
    private _shenBinCtl4:ShenBinCtl;
    private _shenBinCtl5:ShenBinCtl;
    private _shenBinCtl6:ShenBinCtl;
    private _shenBinCtl7:ShenBinCtl;
    private _shenBinCtl8:ShenBinCtl;
    private _shenBinCtl9:ShenBinCtl;
    private _shenBinCtl10:ShenBinCtl;
    private _shenBinCtl11:ShenBinCtl;
    private _shenBinCtl12:ShenBinCtl;
    private _shenBinCtl13:ShenBinCtl;
    private _shenBinCtl14:ShenBinCtl;
    private _shenBinCtl15:ShenBinCtl;
    private _shenBinCtl16:ShenBinCtl;
    private _shenBinCtl17:ShenBinCtl;
    private _shenBinCtl18:ShenBinCtl;
    private _shenBinCtl19:ShenBinCtl;
    private _shenBinCtl20:ShenBinCtl;

    private _checkCtl:CheckBoxCtl;
    private _checkCtl1:CheckBoxCtl;
    private _checkCtl2:CheckBoxCtl;
    private _eff:SimpleEffect;

    protected onAddLoadRes(): void {
        this.addAtlas('shenbin.atlas');
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.shenbin.ui_shenbinViewUI;
            this.bindClose(this._ui.btn_close);

            ValCtl.Create(this._ui.txt_money1,this._ui.img_money1,ECellType.ShenTie);
            ValCtl.Create(this._ui.txt_money2,this._ui.img_money2,ECellType.ShenBinCP);
            ValCtl.Create(this._ui.txt_money22,this._ui.img_money22,ECellType.GOLD);
            this.btnList.push(
                ButtonCtl.Create(this._ui.btn_tip,new Laya.Handler(this,this.onBtnTipClick)),
                ButtonCtl.Create(this._ui.btn,new Laya.Handler(this,this.onBtnClick)),
                ButtonCtl.Create(this._ui.lab_click,new Laya.Handler(this,this.onLabClick)),
                ButtonCtl.Create(this._ui.btn_lb,new Laya.Handler(this,this.onBtnLBClick)),
                ButtonCtl.Create(this._ui.btn_tz,new Laya.Handler(this,this.onBtnTZClick))
            );
            this._checkCtl = new CheckBoxCtl({bg:this._ui.ckbg,gou:this._ui.gou} as ICheckBoxSkin);
            this._checkCtl.selected = false;
            this._checkCtl.selectHander = new Laya.Handler(this,this.onCheckHandler);

            this._checkCtl1 = new CheckBoxCtl({bg:this._ui.ck1,gou:this._ui.gou1} as ICheckBoxSkin);
            this._checkCtl1.selected = false;
            this._checkCtl1.selectHander = new Laya.Handler(this,this.onCheckHandler1);

            this._checkCtl2 = new CheckBoxCtl({bg:this._ui.ckbg3,gou:this._ui.gou3} as ICheckBoxSkin);
            this._checkCtl2.selectHander = new Laya.Handler(this,this.onCheckHandler2);
    
    
            for(let i:number = 1;i<21;i++){
                this["_shenBinCtl" + i] = new ShenBinCtl(this._ui["item" + i]);
            }

            this._eff = new SimpleEffect(this._ui.sp,`o/spine/sweapon2/sweapon2`,40,250);

            this._ui.list_attr.itemRender = ShenBinAttrItem;
            this._ui.list_attr.renderHandler = new Laya.Handler(this,this.onRenderHandler);
        }
    }

    private onRenderHandler(item:ShenBinAttrItem){
        item.setData(item.dataSource);
    }

    protected onInit(): void {
        let vo = RedUpdateModel.Ins.getByID(RedEnum.SHEN_BIN_SHILIAN);
        if (vo && vo.type == 1) {
            this._checkCtl2.selected = true;
        }else{
            this._checkCtl2.selected = false;
        }
        if(initConfig.clienttype == EClientType.Discount){
            let ShenBin10 = VipModel.Ins.getVipTQByType(VipType.ShenBin10);
            if(ShenBin10 == -1){
                this._ui.ckbg3.visible = this._ui.lab_3.visible = false;
            }else{
                this._ui.ckbg3.visible = this._ui.lab_3.visible = true;
            }

            let ShenBinLianXu = VipModel.Ins.getVipTQByType(VipType.ShenBinLianXu);
            if(ShenBinLianXu == -1){
                this._ui.ckbg.visible = this._ui.tf1.visible = false;
            }else{
                this._ui.ckbg.visible = this._ui.tf1.visible = true;
            }
        }else{
            this._ui.ckbg3.visible = this._ui.lab_3.visible = true;
            this._ui.ckbg.visible = this._ui.tf1.visible = true;
        }

        ShenBinModel.Ins.on(ShenBinModel.OPEN_ITEM,this,this.onOpenItem);
        ShenBinModel.Ins.on(ShenBinModel.OPEN_ITEMLIST,this,this.onOpenItemList);
        ShenBinModel.Ins.on(ShenBinModel.UPDATA_PACK,this,this.setLBDot);
        ShenBinModel.Ins.on(ShenBinModel.UPDATA_SHENBIN,this,this.onupdataAttr);
        ShenBinModel.Ins.on(ShenBinModel.UPDATA_TZ,this,this.onTZRedTip);
        this._ui.txt_money1.text = MainModel.Ins.mRoleData.getVal(ECellType.ShenTie) + "";
        this._ui.txt_money2.text = MainModel.Ins.mRoleData.getVal(ECellType.ShenBinCP) + "";
        this._ui.txt_money22.text = MainModel.Ins.mRoleData.getVal(ECellType.GOLD) + "";
        this._eff.play(0);
        this.iconInit();
        this.iconTenInit();
        this.updataView();
        this.setLBDot();
        this.updataMoney();
        this.onTZRedTip();
    }

    private onTZRedTip(){
        if(ShenBinModel.Ins.isTZRedTip()){
            DotManager.addDot(this._ui.btn_tz,10,-10);
        }else{
            DotManager.removeDot(this._ui.btn_tz);
        }
    }

    private updataMoney() {
        let cfg: Configs.t_Artifact_Config_dat = ShenBinCfgProxy.Ins.List[0];
        if (ShenBinFeastModel.Ins.isOpen) {
            this._ui.ck1.visible = true;
            this._ui.tf2.visible = true;
            this._ui.ckbg.x = 234;
            this._ui.tf1.x = 279;

            let id;
            let num;
            let _now: number;
            if (this._checkCtl1.selected) {
                if (this._checkCtl2.selected) {
                    id = parseInt(cfg.f_TenCost_Money.split("-")[0]);
                    num = parseInt(cfg.f_TenCost_Money.split("-")[1]);
                } else {
                    id = parseInt(cfg.f_PreCost_Money.split("-")[0]);
                    num = parseInt(cfg.f_PreCost_Money.split("-")[1]);
                }
                _now = num;
                this._ui.zhekouImg.visible = false;
            } else {
                if (this._checkCtl2.selected) {
                    id = parseInt(cfg.f_PreCostTen.split("-")[0]);
                    num = parseInt(cfg.f_PreCostTen.split("-")[1]);
                    _now = parseInt(cfg.f_TenCost_discount.split("-")[1]);
                } else {
                    id = parseInt(cfg.f_PreCost.split("-")[0]);
                    num = parseInt(cfg.f_PreCost.split("-")[1]);
                    _now = parseInt(cfg.f_PreCost_discount.split("-")[1]);
                }
                this._ui.zhekouImg.visible = true;
                let a = (_now / num * 10).toFixed(0);
                this._ui.zhekouTf.text = E.getLang("limitdiscount", a);
            }
            this._ui.img_m.skin = IconUtils.getIconByCfgId(id);
            this._ui.lab_money.text = _now + "";
        } else {
            this._ui.zhekouImg.visible = false;
            this._ui.ck1.visible = false;
            this._ui.tf2.visible = false;
            this._ui.ckbg.x = 296;
            this._ui.tf1.x = 341;
            if (this._checkCtl2.selected) {
                this._ui.lab_money.text = cfg.f_PreCostTen.split("-")[1];
            } else {
                this._ui.lab_money.text = cfg.f_PreCost.split("-")[1];
            }
            this._ui.img_m.skin = IconUtils.getIconByCfgId(ECellType.ShenTie);
        }
    }

    private setLBDot(){
        if(ShenBinModel.Ins.isFreeDot()){
            DotManager.addDot(this._ui.btn_lb);
        }else{
            DotManager.removeDot(this._ui.btn_lb);
        }
    }

    protected onExit(): void {
        ShenBinModel.Ins.off(ShenBinModel.OPEN_ITEM,this,this.onOpenItem);
        ShenBinModel.Ins.off(ShenBinModel.OPEN_ITEMLIST,this,this.onOpenItemList);
        ShenBinModel.Ins.off(ShenBinModel.UPDATA_PACK,this,this.setLBDot);
        ShenBinModel.Ins.off(ShenBinModel.UPDATA_SHENBIN,this,this.onupdataAttr);
        ShenBinModel.Ins.off(ShenBinModel.UPDATA_TZ,this,this.onTZRedTip);
        this.setAuto(false);
        this._isPlay = false;
        if(this._eff){
            this._eff.stop();
        }
        this.iconInit();
        this.iconTenInit();
        Laya.timer.clear(this,this.onIconTween);
        Laya.Tween.clearAll(this._ui.icon);
    }

    private iconInit(){
        this._ui.icon.x = 322;
        this._ui.icon.y = 900;
        this._ui.icon.visible = false;
    }

    private iconTenInit(){
        for(let i:number=1;i<11;i++){
            this._ui["icon"+i].x = 322;
            this._ui["icon"+i].y = 900;
            this._ui["icon"+i].visible = false;
        }
    }

    private onOpenItem(){
        if(this._eff){
            this._isPlay = true;
            let cfg = ItemProxy.Ins.getCfg(ShenBinModel.Ins.openItem.id);
            let index:number = 0;
            if(cfg){
                switch(cfg.f_qua){
                    case 3:
                        index = 1;
                        break;
                    case 4:
                        index = 2;
                        break;
                    case 5:
                        index = 3;
                        break;
                    case 8:
                        index = 4;
                        break;
                    case 9:
                        index = 5;
                        break;

                }
            }
            this._eff.play(index,false,this,this.onPlayComplete);
            Laya.timer.once(350,this,this.onIconTween);
        }
    }

    private onPlayComplete(){
        if(this._eff){
            this._eff.play(0);
        }
    }

    private onIconTween(){
        let xx;
        let yy;
        let flag;
        if(ShenBinModel.Ins.openItem.id == ECellType.ShenTie){
            xx = this._ui.gold1.x - 20;
            yy = this._ui.gold1.y - 50;
            flag = false;
        }else if(ShenBinModel.Ins.openItem.id == ECellType.ShenBinCP){
            xx = this._ui.gold2.x - 20;
            yy = this._ui.gold2.y - 50;
            flag = false;
        }
        else{
            let index:number = 0;
            for(let i:number=0;i<ShenBinModel.Ins.dataList.length;i++){
                let cfg = ShenBinListProxy.Ins.getCfgById(ShenBinModel.Ins.dataList[i].artifactId);
                if(cfg.f_itemId == ShenBinModel.Ins.openItem.id){
                    index = i + 1;
                    break;
                }
            }
            // console.log("index>>>>>>>>",index)
            // console.log("ShenBinModel.Ins.openItem>>>>>>>>",ShenBinModel.Ins.openItem)
            xx = this._ui["item" + index].x + 11;
            yy = this._ui["item" + index].y + 16;
            flag = true;
        }
        this._ui.icon.skin = IconUtils.getIconByCfgId(ShenBinModel.Ins.openItem.id);
        this._ui.icon.visible = true;
        Laya.Tween.to(this._ui.icon,{x:xx,y:yy},150,null,Laya.Handler.create(this,this.onTweenComplete,[flag]));
    }

    private onTweenComplete(flag:boolean){
        this._isPlay = false;
        this.iconInit();
        if(flag){
            ShenBinModel.Ins.event(ShenBinModel.PLAY_EFFECT);
        }
    }

    private onCheckHandler(){
        if(this._isAuto){
            this._checkCtl.selected = true;
            this.setAuto(false);
            E.ViewMgr.ShowMidError("已关闭连续锻造");//显示错误提示
        }
    }

    private onCheckHandler1(){
        if(this._isAuto){
            this.setAuto(false);
            E.ViewMgr.ShowMidError("已关闭连续锻造");//显示错误提示
        }
        this.updataMoney();
    }

    private onCheckHandler2(){
        if(this._checkCtl2.selected){
            RedUpdateModel.Ins.save(RedEnum.SHEN_BIN_SHILIAN,1);
        }else{
            RedUpdateModel.Ins.save(RedEnum.SHEN_BIN_SHILIAN,0);
        }
        if(this._isAuto){
            this.setAuto(false);
            E.ViewMgr.ShowMidError("已关闭连续锻造");//显示错误提示
        }
        this.updataMoney();
    }

    private _isPlay:boolean;
    private onBtnClick(){
        if(this._isAuto){
            this.setAuto(false);
            E.ViewMgr.ShowMidError("已关闭连续锻造");//显示错误提示
            return;
        }
        if(this._isPlay){
            return;
        }
        if(this._checkCtl.selected){
            this.setAuto(true);
            return;
        }
        let req:OpenArtifactBox_req = new OpenArtifactBox_req;
        if(ShenBinFeastModel.Ins.isOpen){
            if(this._checkCtl1.selected){
                req.flag = 1;
            }else{
                req.flag = 0;
            }
        }else{
            req.flag = 0;
        }
        if(this._checkCtl2.selected){
            req.type = 1;
        }else{
            req.type = 0;
        }
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onLabClick(){
        E.ViewMgr.Open(EViewType.ShenBinLog);
    }

    private onBtnLBClick(){
        E.ViewMgr.Open(EViewType.ShenBinLB);
    }

    private onBtnTZClick(){
        E.ViewMgr.Open(EViewType.ShenBinTZView);
    }

    private _isAuto:boolean = false;
    public setAuto(v:boolean){
       this._isAuto = v;
        if(v){
            this.sendCmd();
        }else{
            Laya.timer.clear(this,this.sendCmd);
        }
    }

    private sendCmd(){
        if(!this._isAuto){
            Laya.timer.clear(this,this.sendCmd);
            return;
        }
        let cfg:Configs.t_Artifact_Config_dat = ShenBinCfgProxy.Ins.List[0];
        if(ShenBinFeastModel.Ins.isOpen){
            if(this._checkCtl1.selected){
                let st;
                if(this._checkCtl2.selected){
                    st = cfg.f_TenCost_Money;
                }else{
                    st = cfg.f_PreCost_Money;
                }
                if(!MainModel.Ins.isItemEnoughSt(st,true)){
                    if(this._isAuto){
                        this.setAuto(false);
                    }
                    return;
                }
                let req:OpenArtifactBox_req = new OpenArtifactBox_req;
                req.flag = 1;
                if(this._checkCtl2.selected){
                    req.type = 1;
                }else{
                    req.type = 0;
                }
                SocketMgr.Ins.SendMessageBin(req);
                Laya.timer.once(900,this,this.sendCmd);
            }else{
                let st;
                if(this._checkCtl2.selected){
                    st = cfg.f_TenCost_discount;
                }else{
                    st = cfg.f_PreCost_discount;
                }
                if(!MainModel.Ins.isItemEnoughSt(st,true)){
                    if(this._isAuto){
                        this.setAuto(false);
                    }
                    return;
                }
                let req:OpenArtifactBox_req = new OpenArtifactBox_req;
                if(this._checkCtl2.selected){
                    req.type = 1;
                }else{
                    req.type = 0;
                }
                req.flag = 0;
                SocketMgr.Ins.SendMessageBin(req);
                Laya.timer.once(900,this,this.sendCmd);
            }
        }else{
            let st;
            if (this._checkCtl2.selected) {
                st = cfg.f_PreCostTen;
            } else {
                st = cfg.f_PreCost;
            }
            if(!MainModel.Ins.isItemEnoughSt(st,true)){
                if(this._isAuto){
                    this.setAuto(false);
                }
                return;
            }
            let req:OpenArtifactBox_req = new OpenArtifactBox_req;
            if(this._checkCtl2.selected){
                req.type = 1;
            }else{
                req.type = 0;
            }
            req.flag = 0;
            SocketMgr.Ins.SendMessageBin(req);
            Laya.timer.once(900,this,this.sendCmd);
        }
    }

    private onBtnTipClick(){
        E.ViewMgr.openHelpView("ShenBinTitle","ShenBinDec");
    }

    private updataView(){
        for(let i:number = 0; i<ShenBinModel.Ins.dataList.length;i++){
            this["_shenBinCtl" + (i+1)].setData(ShenBinModel.Ins.dataList[i]);
        }
        this.onupdataAttr();
    }

    private onupdataAttr(){
        let arr = [{qua:1,lv:0},{qua:2,lv:0},{qua:3,lv:0},{qua:4,lv:0}];
        for(let i:number = 0; i<ShenBinModel.Ins.dataList.length;i++){
            let cfg = ShenBinListProxy.Ins.getCfgById(ShenBinModel.Ins.dataList[i].artifactId);
            for(let j:number=0;j<arr.length;j++){
                if(cfg.f_ArtifactQua == arr[j].qua){
                    arr[j].lv += ShenBinModel.Ins.dataList[i].level;
                }
            }
        }
        this._ui.list_attr.array = arr;
    }

    //*********************************************************** */
    private onOpenItemList(){
        if(this._eff){
            this._isPlay = true;
            let qua = 0;
            for(let i:number=0;i<10;i++){
                if(ShenBinModel.Ins.openItemList[i]){
                    let cfg = ItemProxy.Ins.getCfg(ShenBinModel.Ins.openItemList[i].id);
                    if(cfg){
                        qua = Math.max(qua,cfg.f_qua);
                    }
                }
            }
            
            let index:number = 0;
            switch(qua){
                case 3:
                    index = 1;
                    break;
                case 4:
                    index = 2;
                    break;
                case 5:
                    index = 3;
                    break;
                case 8:
                    index = 4;
                    break;
                case 9:
                    index = 5;
                    break;

            }
            this._eff.play(index,false,this,this.onPlayComplete);
            Laya.timer.once(350,this,this.onIconTenTween);
        }
    }

    private onIconTenTween(){
        for(let i:number=0;i<10;i++){
            if(ShenBinModel.Ins.openItemList[i]){
                let xx;
                let yy;
                let flag;
                if(ShenBinModel.Ins.openItemList[i].id == ECellType.ShenTie){
                    xx = this._ui.gold1.x - 20;
                    yy = this._ui.gold1.y - 50;
                    flag = false;
                }else if(ShenBinModel.Ins.openItemList[i].id == ECellType.ShenBinCP){
                    xx = this._ui.gold2.x - 20;
                    yy = this._ui.gold2.y - 50;
                    flag = false;
                }
                else{
                    let index:number = 0;
                    for(let j:number=0;j<ShenBinModel.Ins.dataList.length;j++){
                        let cfg = ShenBinListProxy.Ins.getCfgById(ShenBinModel.Ins.dataList[j].artifactId);
                        if(cfg.f_itemId == ShenBinModel.Ins.openItemList[i].id){
                            index = j + 1;
                            break;
                        }
                    }
                    // console.log("index>>>>>>>>",index)
                    // console.log("ShenBinModel.Ins.openItem>>>>>>>>",ShenBinModel.Ins.openItem)
                    xx = this._ui["item" + index].x + 11;
                    yy = this._ui["item" + index].y + 16;
                    flag = true;
                }
                this._ui["icon"+(i+1)].skin = IconUtils.getIconByCfgId(ShenBinModel.Ins.openItemList[i].id);
                this._ui["icon"+(i+1)].visible = true;
                Laya.Tween.to(this._ui["icon"+(i+1)],{x:xx,y:yy},150,null,Laya.Handler.create(this,this.onTweenTenComplete,[flag,ShenBinModel.Ins.openItemList[i].id,i]));
            }
        }
    }

    private onTweenTenComplete(flag:boolean,id:number,i:number){
        this._isPlay = false;
        this._ui["icon"+(i+1)].x = 322;
        this._ui["icon"+(i+1)].y = 900;
        this._ui["icon"+(i+1)].visible = false;
        if(flag){
            ShenBinModel.Ins.event(ShenBinModel.PLAY_TENEFFECT,id);
        }
    }
}