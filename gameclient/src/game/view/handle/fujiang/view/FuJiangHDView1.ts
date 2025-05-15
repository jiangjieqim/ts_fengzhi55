import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { SocketMgr } from "../../../../network/SocketMgr";
import { RecruitChief_req } from "../../../../network/protocols/BaseProto";
import { SimpleEffect } from "../../avatar/SimpleEffect";
import { MainModel } from "../../main/model/MainModel";
import { ItemProxy } from "../../main/proxy/ItemProxy";
import { ItemVo } from "../../main/vos/ItemVo";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { FuJiangModel } from "../model/FuJiangModel";
import { FuJiangListProxy } from "../proxy/FuJiangProxy";

export class FuJiangHDView1 extends ViewBase{
    private _ui:ui.views.fujiang.ui_fujiangHDView1UI;
    protected mMask = true;
    protected mMainSnapshot = true;

    private _eff:SimpleEffect;

    protected onAddLoadRes() {
        this.addAtlas('fujiang.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.fujiang.ui_fujiangHDView1UI;

            ButtonCtl.Create(this._ui.btn_qd,new Laya.Handler(this,this.onBtnQDClick));
            ButtonCtl.Create(this._ui.btn_ok,new Laya.Handler(this,this.onBtnOKClick));
            ButtonCtl.Create(this._ui.xunzaoBtn, new Laya.Handler(this, this.btnClick));

            this._eff = new SimpleEffect(this._ui.sp1, `o/spine/cardgongxi/cardgongxi`);
            this._ui.panel.mouseEnabled = false;
        }
    }

    private btnClick(){
        FuJiangModel.Ins._bo = false;
        this._ui.sp.visible = false;
    }

    private onBtnQDClick(){
        this.Close();
    }

    private onBtnOKClick(){
        if(this._itemVo.cfg.f_itemid == 293){
            if(!MainModel.Ins.isItemEnough(this._itemVo.cfg.f_itemid,this._itemVo.count)){
                E.ViewMgr.Open(EViewType.FuJiangGouMai);
                return;
            }
        }

        if(MainModel.Ins.isItemEnough(this._itemVo.cfg.f_itemid,this._itemVo.count,true)){
            this.Close();
            let req:RecruitChief_req = new RecruitChief_req;
            req.itemId = this._itemVo.cfg.f_itemid;
            req.type = FuJiangModel.Ins.zmNum;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private _itemVo:ItemVo;
    protected onInit(): void {
        this._itemVo = this.Data;
        this._num = 0;
        this.removeItem();
        this._ui.btn_qd.visible = this._ui.btn_ok.visible = false;
        this._eff.play(0,false,this,this.effEnd);
        if(FuJiangModel.Ins._bo){
            this._ui.sp.visible = true;
            this.updataMoney();
        }else{
            this._ui.sp.visible = false;
        }
    }

    private removeItem(){
        while(this._ui.panel.numChildren){
            let item = this._ui.panel.getChildAt(0);
            Laya.Pool.recover("ui_fujiangItem8UI", item);
            item.removeSelf();
        }
    }

    protected onExit(): void {
        if(this._eff){
            this._eff.stop();
        }
        // Laya.Tween.clearAll(this._ui.panel.vScrollBar);
        FuJiangModel.Ins._bo = false;
    }

    private effEnd(){
        this.updataView();
    }

    private updataMoney(){
        this._ui.moneyIcon.skin = IconUtils.getIconByCfgId(FuJiangModel.Ins._itemID);
        this._ui.moneyNumLabel.text = StringUtil.val2m(MainModel.Ins.mRoleData.getVal(FuJiangModel.Ins._itemID));
    }

    public refresh(){
        this._num = 0;
        // this._ui.panel.mouseEnabled = false;
        this.removeItem();
        this.updataView();
        Laya.timer.callLater(this,this.updataMoney);
    }

    private _num:number;
    private updataView(){

        // for(let i:number=0;i<35;i++){
        //     let xx = i % 4;
        //     let yy = Math.floor(i / 4);
        //     let item:ui.views.fujiang.ui_fujiangItem8UI = new ui.views.fujiang.ui_fujiangItem8UI;
        //     item.x = xx * 180;
        //     item.y = yy * 224 + 30;
        //     this._ui.panel.addChild(item);
        // }
        // Laya.Tween.to(this._ui.panel.vScrollBar,{value:2100},3900,null,Laya.Handler.create(this,this.onTweenComplete));
        // return;

        if(this._num >= 35){
            Laya.timer.once(300,this,this.updataView1);
            return;
        }
        // if(this._num == 16 ){
        //     Laya.Tween.to(this._ui.panel.vScrollBar,{value:2100},3600,null,Laya.Handler.create(this,this.onTweenComplete));
        // }
        let xx = this._num % 6;
        let yy = Math.floor(this._num / 6);
        let item:ui.views.fujiang.ui_fujiangItem8UI = Laya.Pool.getItemByClass("ui_fujiangItem8UI",ui.views.fujiang.ui_fujiangItem8UI);
        item.scale(0.7,0.7);
        this.setItem(item);
        item.x = xx * 116;
        item.y = yy * 156;
        this._ui.panel.addChild(item);
        this._num ++;
        Laya.timer.once(30,this,this.updataView);
    }

    private setItem(item:ui.views.fujiang.ui_fujiangItem8UI){
        let cfg = FuJiangModel.Ins.recruitChief[this._num];
        if(cfg.cheifId){
            let fjCfg = FuJiangListProxy.Ins.getCfgById(cfg.cheifId);
            item.img_qua.skin = FuJiangListProxy.Ins.getQuaSkin(fjCfg.f_cheifQuality);
            item.img.skin = FuJiangListProxy.Ins.getFuJiangSkin(fjCfg.f_cheifid);
            item.img_qua1.skin = "";
            item.img_s.visible = false;
            item.lab.text = "";
            item.lab_name.text = fjCfg.f_cheif;
            if(cfg.itemId){
                item.sp_new.visible = false;
                let iCfg = ItemProxy.Ins.getCfg(cfg.itemId);
                item.img11.skin = IconUtils.getIconByCfgId(cfg.itemId);
                item.lab11.visible = true;
                item.lab_num.text = cfg.count + "";
            }else{
                item.sp_new.visible = true;
                item.img11.skin = "";
                item.lab11.visible = false;
                item.lab_num.text = "";
            }
        }else{
            let iCfg = ItemProxy.Ins.getCfg(cfg.itemId);
            let qua = iCfg.f_qua;
            if(qua == 3 || qua == 4 || qua == 5){
                qua += 1;
            }
            item.img_qua.skin = FuJiangListProxy.Ins.getQuaSkin(qua);
            item.img.skin = "";
            item.img_qua1.skin = IconUtils.getIconByCfgId(cfg.itemId);
            item.img_s.visible = true;
            item.lab.text = "x" + cfg.count;
            item.lab_name.text = main.itemName(iCfg.f_name);
            item.sp_new.visible = false;
            item.img11.skin = "";
            item.lab11.visible = false;
            item.lab_num.text = "";
        }
    }
    
    private updataView1(){
        if(FuJiangModel.Ins._bo){
            if(!MainModel.Ins.isItemEnough(this._itemVo.cfg.f_itemid,this._itemVo.count,true)){
                this.showOK();
                FuJiangModel.Ins._bo = false;
                this._ui.sp.visible = false;
                return;
            }
            let req: RecruitChief_req = new RecruitChief_req;
            req.itemId = FuJiangModel.Ins._itemID;
            req.type = 2;
            SocketMgr.Ins.SendMessageBin(req);
        }else{
           this.showOK();
        }
    }

    private showOK(){
        this._ui.btn_qd.visible = this._ui.btn_ok.visible = true;
        // this._ui.panel.vScrollBar.value = 2100;
        // Laya.Tween.clearAll(this._ui.panel.vScrollBar);
        // this._ui.panel.mouseEnabled = true;
    }

    private onTweenComplete(){
        
    }
}