import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { CheckBoxCtl, ICheckBoxSkin } from "../../../../../frame/view/CheckBoxCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { RecruitChief_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { SimpleEffect } from "../../avatar/SimpleEffect";
import { DotManager } from "../../common/DotManager";
import { FuJiangFeastModel } from "../../fujiangfeast/FuJiangFeastModel";
import { VipModel, VipType } from "../../huodong/model/VipModel";
import { ValCtl } from "../../main/ctl/ValLisCtl";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainModel } from "../../main/model/MainModel";
import { ECellType } from "../../main/vos/ECellType";
import { ItemVo } from "../../main/vos/ItemVo";
import { NewPlayerFujiangFeastModel } from "../../newplayerfeast/NewPlayerFeastModel";
import { EClientType } from "../../sdk/ClientType";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { FuJiangModel } from "../model/FuJiangModel";
import { FuJiangConfigProxy, FuJiangDrawExpProxy } from "../proxy/FuJiangProxy";
import { FuJiangHDView1 } from "./FuJiangHDView1";

export class FuJiangChouKaView extends ViewBase{
    private _ui:ui.views.fujiang.ui_fujiangChouKaViewUI;
    protected mMask = true;
    protected mMainSnapshot = true;
    private _eff:SimpleEffect;
    private _effSX:SimpleEffect;
    private _effDL1:SimpleEffect;
    private _effDL2:SimpleEffect;

    // private timeCtl:TimeCtl;

    private _checkBoxCtl:CheckBoxCtl;
    private _checkBoxCtl1:CheckBoxCtl;

    protected onAddLoadRes() {
        this.addAtlas('fujiang.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.fujiang.ui_fujiangChouKaViewUI;
            this._ui.btn_zm1.visible = false;

            this.bindClose(this._ui.btn_close);
            ButtonCtl.Create(this._ui.btn_gl,new Laya.Handler(this,this.onBtnGLClick));
            ButtonCtl.Create(this._ui.btn_add1,new Laya.Handler(this,this.onBtnAdd1Click));
            ButtonCtl.Create(this._ui.btn_add2,new Laya.Handler(this,this.onBtnAdd2Click));
            // ButtonCtl.Create(this._ui.btn_zm1,new Laya.Handler(this,this.onBtnZM1Click));
            ButtonCtl.Create(this._ui.btn_zm2,new Laya.Handler(this,this.onBtnZM2Click));
            ButtonCtl.Create(this._ui.btn_zm3,new Laya.Handler(this,this.onBtnZM3Click));
            ButtonCtl.Create(this._ui.btn_tip,new Laya.Handler(this,this.onBtnTipClick));

            // this.timeCtl = new TimeCtl(this._ui.lab_time);

            ValCtl.Create(this._ui.lab_m1,this._ui.img_m1,ECellType.GOLD);
            ValCtl.Create(this._ui.lab_m2,this._ui.img_m2,ECellType.JunLingZhuang);

            this._eff = new SimpleEffect(this._ui.sp, `o/spine/cardfly/cardfly`,0,0,1.0);
            this._effSX = new SimpleEffect(this._ui.sp1, `o/spine/cardstone/cardstone`,0,0,1.0);
            this._effDL1 = new SimpleEffect(this._ui.sp2, `o/spine/cardlab/cardlab`);
            this._effDL2 = new SimpleEffect(this._ui.sp3, `o/spine/cardlab/cardlab`);

            this._checkBoxCtl = new CheckBoxCtl({bg:this._ui.bg,gou:this._ui.gou} as ICheckBoxSkin);
            this._checkBoxCtl.selected = false;

            this._checkBoxCtl1 = new CheckBoxCtl({bg:this._ui.ck,gou:this._ui.gou1} as ICheckBoxSkin);
            this._checkBoxCtl1.selectHander = new Laya.Handler(this,this.onSelectHander);
            this._checkBoxCtl1.selected = false;
        }
    }

    private onSelectHander(){
        this.updataZKView();
    }

    private _isFree:boolean;
    protected onInit(): void {
        if(initConfig.clienttype == EClientType.Discount){
            let FuJiangAuto = VipModel.Ins.getVipTQByType(VipType.FuJiangAuto);
            if(FuJiangAuto == -1){
                this._ui.bg.visible = this._ui.tips1.visible = false;
            }else{
                this._ui.bg.visible = this._ui.tips1.visible = true;
            }
        }else{
            this._ui.bg.visible = this._ui.tips1.visible = true;
        }

        // FuJiangModel.Ins.on(FuJiangModel.FUJIANG_UPDATA,this,this.onUpdataView);
        FuJiangModel.Ins.on(FuJiangModel.FUJIANG_ZHAOMU_UPDATA,this,this.onZMView);
        FuJiangModel.Ins.on(FuJiangModel.CHOUKA_LEVEL,this,this.updataLevel);
        this._isPlay = false;
        this.updataView();
        this._effSX.play(0,true);
        this._effDL1.play(0,true);
        this._effDL2.play(0,true);
    }

    protected onExit(): void {
        // FuJiangModel.Ins.off(FuJiangModel.FUJIANG_UPDATA,this,this.onUpdataView);
        FuJiangModel.Ins.off(FuJiangModel.FUJIANG_ZHAOMU_UPDATA,this,this.onZMView);
        FuJiangModel.Ins.off(FuJiangModel.CHOUKA_LEVEL,this,this.updataLevel);
        // this.timeCtl.stop();
        if(this._eff){
            this._eff.stop();
        }
        if(this._effSX){
            this._effSX.stop();
        }
        if(this._effDL1){
            this._effDL1.stop();
        }
        if(this._effDL2){
            this._effDL2.stop();
        }
        this._isPlay = false;
    }

    private onZMView(){
        // if(this._checkBoxCtl.selected){
        //     if(FuJiangModel.Ins.zmNum == 1){
        //         E.ViewMgr.Open(EViewType.FuJiangHuoDe,null,[FuJiangModel.Ins.getIndexEff(),this._itemVo]);
        //     }else if(FuJiangModel.Ins.zmNum == 2){
        //         E.ViewMgr.Open(EViewType.FuJiangHDView1,null,this._itemVo);
        //     }
        // }else{
            // this._isPlay = true;
            // this.setEff();
        // }

        if (E.ViewMgr.IsOpen(EViewType.FuJiangHDView1)) {
            let view:FuJiangHDView1 = E.ViewMgr.Get(EViewType.FuJiangHDView1) as FuJiangHDView1;
            view.refresh();
        }else{
            this._isPlay = true;
            this.setEff();
        }
    }

    private updataLevel(){
        this._ui.lab_lv.text = "lv." + FuJiangModel.Ins.drawLevel;
        let cfg = FuJiangDrawExpProxy.Ins.getCfgById(FuJiangModel.Ins.drawLevel);
        let nextCfg = FuJiangDrawExpProxy.Ins.getCfgById(FuJiangModel.Ins.drawLevel + 1);
        if(nextCfg){
            this._ui.lab_exp.text = FuJiangModel.Ins.curDrawExp + "/" + cfg.f_exp;
            let w = FuJiangModel.Ins.curDrawExp / cfg.f_exp;
            this._ui.pro.width = w * 316;
        }else{
            this._ui.lab_exp.text = "已满级";
            this._ui.pro.width = 316;
        }
    }
    
    private _isPlay:boolean;
    private setEff(){
        if(FuJiangModel.Ins.zmNum == 1){
            this._eff.play(0,false,this,this.effEnd);
            this._ui.sp.x = 170;
            this._ui.sp.y = 956;
        }else{
            this._eff.play(1,false,this,this.effEnd);
            this._ui.sp.x = 510;
            this._ui.sp.y = 956;
        }
    }

    private effEnd(){
        this._effSX.play(FuJiangModel.Ins.getIndexEff(),false,this,this.effEndOpenView);
    }

    private effEndOpenView(){
        this._isPlay = false;
        this._effSX.play(0,true);
        Laya.timer.callLater(this,this.onLayer);
    }

    private onLayer(){
        if(this.IsShow()){
            if(FuJiangModel.Ins.zmNum == 1){
                E.ViewMgr.Open(EViewType.FuJiangHuoDe,null,[FuJiangModel.Ins.getIndexEff(),this._itemVo]);
            }else if(FuJiangModel.Ins.zmNum == 2){
                E.ViewMgr.Open(EViewType.FuJiangHDView1,null,this._itemVo);
            }
        }
    }

    private _cfgOne;
    // private _cfgTen;
    // private _cfg35;
    private updataView(){
        this._ui.lab_m1.text = MainModel.Ins.mRoleData.getVal(ECellType.GOLD) + "";
        this._ui.lab_m2.text = MainModel.Ins.mRoleData.getVal(ECellType.JunLingZhuang) + "";

        this._cfgOne = FuJiangConfigProxy.Ins.List[0].f_drawsingle;
        this._ui.icon1.skin = IconUtils.getIconByCfgId(this._cfgOne.split("-")[0]);
        this._ui.lab1.text = this._cfgOne.split("-")[1];

        // this._cfgTen = FuJiangConfigProxy.Ins.List[0].f_drawten;
        // this._ui.icon2.skin = IconUtils.getIconByCfgId(this._cfgTen.split("-")[0]);
        // this._ui.lab3.text = this._cfgTen.split("-")[1];

        // this._cfg35 = FuJiangConfigProxy.Ins.List[0].f_drawmulti;
        // this._ui.icon22.skin = IconUtils.getIconByCfgId(this._cfg35.split("-")[0]);
        // this._ui.lab33.text = this._cfg35.split("-")[1];
        // this.onUpdataView();
        this.updataZKView();
        this.updataLevel();
    }

    // private onUpdataView(){
    //     let time = FuJiangModel.Ins.nextFreeUnix - TimeUtil.serverTime;
    //     if(time > 0){
    //         this._isFree = false;
    //         this._ui.lab2.text = "招募一次";
    //         this.timeCtl.start(time,new Laya.Handler(this,this.onUpdateTime),new Laya.Handler(this,this.endTime));
    //     }else{
    //         this.endTime();
    //     }
    //     if(FuJiangModel.Ins.isFreeRed()){
    //         DotManager.addDot(this._ui.btn_zm1,-30);
    //     }else{
    //         DotManager.removeDot(this._ui.btn_zm1);
    //     }
    // }

    private updataZKView(){
        let cfg:Configs.t_Chief_draw_config_dat = FuJiangConfigProxy.Ins.List[0];
        let tenNum;
        let num;

        if(this._checkBoxCtl1.selected){
            tenNum = parseInt(cfg.f_drawten_gold.split("-")[1]);
            num = parseInt(cfg.f_FeastDiscount_gold.split("-")[1]);
            this._ui.icon2.skin = IconUtils.getIconByCfgId(parseInt(cfg.f_drawten_gold.split("-")[0]));
        }else{
            tenNum = parseInt(cfg.f_drawten.split("-")[1]);
            num = parseInt(cfg.f_FeastDiscount.split("-")[1]);
            this._ui.icon2.skin = IconUtils.getIconByCfgId(parseInt(cfg.f_drawten.split("-")[0]));
        }

        if(FuJiangFeastModel.Ins.isOpen || NewPlayerFujiangFeastModel.Ins.isOpen){
            this._ui.zhekouImg.visible = true;
            this._ui.zhekouTf.text = `限时${cfg.f_discountvalue}折`;
            this._ui.lab3.text = num + "";
            this._ui.oldTf.visible = this._ui.line1.visible = true;
            this._ui.oldTf.text = tenNum + "";
        }else{
            this._ui.zhekouImg.visible = false;
            this._ui.oldTf.visible = this._ui.line1.visible = false;
            this._ui.lab3.text = tenNum + "";
        }

        let val;
        let val1;
        if(this._checkBoxCtl1.selected){
            val = parseInt(cfg.f_drawmulti_gold.split("-")[1]);
            val1 = parseInt(cfg.f_Drawsinglediscount_gold.split("-")[1]);
            this._ui.icon22.skin = IconUtils.getIconByCfgId(parseInt(cfg.f_drawmulti_gold.split("-")[0]));
        }else{
            val = parseInt(cfg.f_drawmulti.split("-")[1]);
            val1 = parseInt(cfg.f_Drawsinglediscount.split("-")[1]);
            this._ui.icon22.skin = IconUtils.getIconByCfgId(parseInt(cfg.f_drawmulti.split("-")[0]));
        }
        if(FuJiangFeastModel.Ins.isOpen || NewPlayerFujiangFeastModel.Ins.isOpen){
            this._ui.zhekouImg1.visible = true;
            this._ui.zhekouTf1.text = `限时${cfg.f_discountvalue}折`;
            this._ui.lab33.text = val1 + "";
            this._ui.oldTf1.visible = this._ui.line11.visible = true;
            this._ui.oldTf1.text = val + "";
        }else{
            this._ui.zhekouImg1.visible = false;
            this._ui.oldTf1.visible = this._ui.line11.visible = false;
            this._ui.lab33.text = val + "";
        }
    }

    // private onUpdateTime(){
    //     let time_str = TimeUtil.subTime(this.timeCtl.tickVal) + "后免费";
    //     this.timeCtl.setText(time_str);
    //  }

    //  private endTime(){
    //     this._isFree = true;
    //     this._ui.lab2.text = "免费一次";
    //     this.timeCtl.setText("");
    //     this.timeCtl.stop();
    //  }

    private onBtnGLClick(){
        if(this._isPlay){
            return;
        }
        E.ViewMgr.openHelpView("fujiangTitle","fujiangDec");
    }

    private onBtnAdd1Click(){
        if(this._isPlay){
            return;
        }
        E.ViewMgr.Open(EViewType.Shop);
    }

    private onBtnAdd2Click(){
        if(this._isPlay){
            return;
        }
        E.ViewMgr.Open(EViewType.FuJiangGouMai);
    }

    // private onBtnZM1Click(){
    //     if(this._isPlay){
    //         return;
    //     }
    //     if(this._isFree){
    //         FuJiangModel.Ins.zmNum = 0;
    //         this.sendCmd(FuJiangModel.Ins.zmNum);
    //     }else{
    //         let num:number = MainModel.Ins.mRoleData.getVal(ECellType.JunLingZhuang);
    //         if(num >= parseInt(this._cfgOne.split("-")[1])){
    //             FuJiangModel.Ins.zmNum = 0;
    //             this.sendCmd(FuJiangModel.Ins.zmNum);
    //         }else{
    //             E.ViewMgr.Open(EViewType.FuJiangGouMai);
    //         }
    //     }
    // }

    private _itemVo:ItemVo;
    private onBtnZM2Click(){
        if(this._isPlay){
            return;
        }
        let cfg:Configs.t_Chief_draw_config_dat = FuJiangConfigProxy.Ins.List[0];
        if(FuJiangFeastModel.Ins.isOpen || NewPlayerFujiangFeastModel.Ins.isOpen){
            if(this._checkBoxCtl1.selected){
                this._itemVo = ItemViewFactory.convertItem(cfg.f_FeastDiscount_gold);
            }else{
                this._itemVo = ItemViewFactory.convertItem(cfg.f_FeastDiscount);
            }
        }else{
            if(this._checkBoxCtl1.selected){
                this._itemVo = ItemViewFactory.convertItem(cfg.f_drawten_gold);
            }else{
                this._itemVo = ItemViewFactory.convertItem(cfg.f_drawten);
            }
        }

        if(this._itemVo.cfg.f_itemid == 293){
            if(!MainModel.Ins.isItemEnough(this._itemVo.cfg.f_itemid,this._itemVo.count)){
                E.ViewMgr.Open(EViewType.FuJiangGouMai);
                return;
            }
        }

        if(MainModel.Ins.isItemEnough(this._itemVo.cfg.f_itemid,this._itemVo.count),true){
            FuJiangModel.Ins.zmNum = 1;
            this.sendCmd(FuJiangModel.Ins.zmNum);
        }
    }

    private onBtnTipClick(){
        E.ViewMgr.Open(EViewType.FuJiangGLTip);
    }

    private onBtnZM3Click(){
        if(this._isPlay){
            return;
        }

        let cfg:Configs.t_Chief_draw_config_dat = FuJiangConfigProxy.Ins.List[0];
        if(FuJiangFeastModel.Ins.isOpen || NewPlayerFujiangFeastModel.Ins.isOpen){
            if(this._checkBoxCtl1.selected){
                this._itemVo = ItemViewFactory.convertItem(cfg.f_Drawsinglediscount_gold);
            }else{
                this._itemVo = ItemViewFactory.convertItem(cfg.f_Drawsinglediscount);
            }
        }else{
            if(this._checkBoxCtl1.selected){
                this._itemVo = ItemViewFactory.convertItem(cfg.f_drawmulti_gold);
            }else{
                this._itemVo = ItemViewFactory.convertItem(cfg.f_drawmulti);
            }
        }

        if(this._itemVo.cfg.f_itemid == 293){
            if(!MainModel.Ins.isItemEnough(this._itemVo.cfg.f_itemid,this._itemVo.count)){
                E.ViewMgr.Open(EViewType.FuJiangGouMai);
                return;
            }
        }

        if(MainModel.Ins.isItemEnough(this._itemVo.cfg.f_itemid,this._itemVo.count),true){
            FuJiangModel.Ins.zmNum = 2;
            this.sendCmd(FuJiangModel.Ins.zmNum);
        }
    }

    private sendCmd(type:number){
        if(type == 2){
            FuJiangModel.Ins._bo = this._checkBoxCtl.selected;
            FuJiangModel.Ins._itemID = this._itemVo.cfg.f_itemid;
        }
        let req:RecruitChief_req = new RecruitChief_req;
        req.itemId = this._itemVo.cfg.f_itemid;
        req.type = type;
        SocketMgr.Ins.SendMessageBin(req);
    }
}