import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { CheckBoxCtl, ICheckBoxSkin } from "../../../../../frame/view/CheckBoxCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { SocketMgr } from "../../../../network/SocketMgr";
import { OpenArtifactBox_req, PetExtract_req } from "../../../../network/protocols/BaseProto";
import { SimpleEffect } from "../../avatar/SimpleEffect";
import { DuanWuView } from "../../duanwu/views/DuanWuView";
import { EFeastType } from "../../gemfeast/EFeastType";
import { GemFeastModel } from "../../gemfeast/GemFeastModel";
import { LingChongModel } from "../../lingchong/model/LingChongModel";
import { ItemUpdateCtl } from "../../main/ctl/ItemUpdateCtl";
import { EFuncDef } from "../../main/model/EFuncDef";
import { MainModel } from "../../main/model/MainModel";
import { ItemProxy } from "../../main/proxy/ItemProxy";
import { ECellType } from "../../main/vos/ECellType";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { ShenBinCfgProxy, ShenBinListProxy } from "../proxy/ShenBinProxy";
import { ShenBinCtl } from "../view/ShenBinCtl";
import { ShenBinModel } from "./ShenBinModel";

export class ShenBinFeastView extends DuanWuView{
    private skin:ui.views.shenbingfeast.ui_shenbing_feastUI;
    private _checkBoxCtl:CheckBoxCtl;
    private _checkBoxCtl1:CheckBoxCtl;

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
    private _eff:SimpleEffect;
    
    protected bindModel(){
        this.model = ShenBinFeastModel.Ins;
    }
    protected initUI(){
        this.UI = this._ui = new ui.views.shenbingfeast.ui_shenbing_feastUI();

        ItemUpdateCtl.Create(this._ui.goldtf,ECellType.GOLD);
        this._ui.yuanbaoicon.skin = IconUtils.getIconByCfgId(ECellType.GOLD);

        ItemUpdateCtl.Create(this._ui.labbb,ECellType.ShenTie);
        this._ui.imggg.skin = IconUtils.getIconByCfgId(ECellType.ShenTie);

        ItemUpdateCtl.Create(this._ui.juanzhoutf,ECellType.ShenBinCP);
        this._ui.juanzhouicon.skin = IconUtils.getIconByCfgId(ECellType.ShenBinCP);

        this.skin = this._ui as ui.views.shenbingfeast.ui_shenbing_feastUI;

        for(let i:number = 1;i<21;i++){
            this["_shenBinCtl" + i] = new ShenBinCtl(this.skin["item" + i]);
        }
        this._eff = new SimpleEffect(this.skin.sp,`o/spine/sweapon2/sweapon2`,40,250);
        ButtonCtl.Create(this._ui.btn,new Laya.Handler(this,this.onBtnClick));

        this._checkBoxCtl = new CheckBoxCtl({bg:this.skin.ck,gou:this.skin.gou} as ICheckBoxSkin);
        this._checkBoxCtl.selectHander = new Laya.Handler(this,this.onSelectHander);
        this._checkBoxCtl.selected = false;

        this._checkBoxCtl1 = new CheckBoxCtl({bg:this.skin.ck1,gou:this.skin.gou1} as ICheckBoxSkin);
        this._checkBoxCtl1.selectHander = new Laya.Handler(this,this.onSelectHander1);
        this._checkBoxCtl1.selected = false;

        this.skin.rewardCon.visible = false;

        this.skin.zhekouImg.mouseEnabled = false;
        this.updataMoney();
    }

    private onSelectHander(){
        if(this._isAuto){
            this._checkBoxCtl.selected = true;
            this.setAuto(false);
            E.ViewMgr.ShowMidError("已关闭连续锻造");//显示错误提示
        }
    }

    private onSelectHander1(){
        this.updataMoney();
        if(this._isAuto){
            this.setAuto(false);
            E.ViewMgr.ShowMidError("已关闭连续锻造");//显示错误提示
        }
    }

    private updataMoney(){
        let cfg:Configs.t_Artifact_Config_dat = ShenBinCfgProxy.Ins.List[0];
        let id;
        let num;
        let _now:number;
        if(this._checkBoxCtl1.selected){
            id = parseInt(cfg.f_PreCost_Money.split("-")[0]);
            num = parseInt(cfg.f_PreCost_Money.split("-")[1]);
            _now = num;
            this.skin.zhekouImg.visible = false;
        }else{
            id = parseInt(cfg.f_PreCost.split("-")[0]);
            num = parseInt(cfg.f_PreCost.split("-")[1]);
            this.skin.zhekouImg.visible = true;
            _now = parseInt(cfg.f_PreCost_discount.split("-")[1]);
            let a = (_now / num * 10).toFixed(0);
            this.skin.zhekouTf.text =  E.getLang("limitdiscount",a);
        }
        this.skin.img_m.skin = IconUtils.getIconByCfgId(id);
        this.skin.lab_money.text = _now + "";
     }
    protected onAddLoadRes(): void {
        this.addAtlas("duanwu.atlas");
        this.addAtlas("shenbingfeast.atlas"); 
        this.addAtlas('shenbin.atlas');
    }

    protected onBtnTipClick(){
        E.ViewMgr.openHelpView("shenbinfeasttitle","shenbinfeastdesc");
    }

    //************************************************************************* */
    protected onInit(): void {
        super.onInit();
        ShenBinModel.Ins.on(ShenBinModel.OPEN_ITEM,this,this.onOpenItem);
        this._eff.play(0);
        this.updataView();
        this.iconInit();
    }

    protected onExit(): void {
        super.onExit();
        ShenBinModel.Ins.off(ShenBinModel.OPEN_ITEM,this,this.onOpenItem);
        this.setAuto(false);
        this._isPlay = false;
        if(this._eff){
            this._eff.stop();
        }
        this.iconInit();
        Laya.timer.clear(this,this.onIconTween);
        Laya.Tween.clearAll(this.skin.icon);
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
        if(this._checkBoxCtl.selected){
            this.setAuto(true);
            return;
        }
        let req:OpenArtifactBox_req = new OpenArtifactBox_req;
        if(this._checkBoxCtl1.selected){
            req.flag = 1;
        }else{
            req.flag = 0;
        }
        SocketMgr.Ins.SendMessageBin(req);
    }

    private updataView(){
        for(let i:number = 0; i<ShenBinModel.Ins.dataList.length;i++){
            this["_shenBinCtl" + (i+1)].setData(ShenBinModel.Ins.dataList[i]);
        }
    }

    private sendCmd(){
        if(!this._isAuto){
            Laya.timer.clear(this,this.sendCmd);
            return;
        }
        let cfg:Configs.t_Artifact_Config_dat = ShenBinCfgProxy.Ins.List[0];
        if(this._checkBoxCtl1.selected){
            if(!MainModel.Ins.isItemEnoughSt(cfg.f_PreCost_Money,true)){
                if(this._isAuto){
                    this.setAuto(false);
                }
                return;
            }
            let req:OpenArtifactBox_req = new OpenArtifactBox_req;
            req.flag = 1;
            SocketMgr.Ins.SendMessageBin(req);
            Laya.timer.once(900,this,this.sendCmd);
        }else{
            if(!MainModel.Ins.isItemEnoughSt(cfg.f_PreCost_discount,true)){
                if(this._isAuto){
                    this.setAuto(false);
                }
                return;
            }
            let req:OpenArtifactBox_req = new OpenArtifactBox_req;
            req.flag = 0;
            SocketMgr.Ins.SendMessageBin(req);
            Laya.timer.once(900,this,this.sendCmd);
        }
    }

    private iconInit(){
        this.skin.icon.x = 337;
        this.skin.icon.y = 778;
        this.skin.icon.visible = false;
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
            xx = 260 - 20;
            yy = 104 - 50;
            flag = false;
        }else if(ShenBinModel.Ins.openItem.id == ECellType.ShenBinCP){
            xx = 413 - 20;
            yy = 104 - 50;
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
            xx = this._ui["item" + index].x + 100;
            yy = this._ui["item" + index].y + 100;
            flag = true;
        }
        this.skin.icon.skin = IconUtils.getIconByCfgId(ShenBinModel.Ins.openItem.id);
        this.skin.icon.visible = true;
        Laya.Tween.to(this.skin.icon,{x:xx,y:yy},150,null,Laya.Handler.create(this,this.onTweenComplete,[flag]));
    }

    private onTweenComplete(flag:boolean){
        this._isPlay = false;
        this.iconInit();
        if(flag){
            ShenBinModel.Ins.event(ShenBinModel.PLAY_EFFECT);
        }
    }
}

/**神兵盛宴 */
export class ShenBinFeastModel extends GemFeastModel {
    public funcType: EFuncDef = EFuncDef.ShenBinSY;
    public subType: number = EFeastType.ShenBin;
    public packageTitleStr: string = "shenbinglibao2";
    public rankTitleStr: string = "shenbinglibao3";
    public rankBotStr:string = "shenbinglibao_desc";
    public rank_desc:string = "shenbinglibao_title|shenbinglibao_read";
    protected initUI(){
        this.Reg(new ShenBinFeastView(EViewType.ShenBinFeast));
    }

    private static _ins2: ShenBinFeastModel;
    public static get Ins() {
        if (!this._ins2) {
            this._ins2 = new ShenBinFeastModel();
        }
        return this._ins2;
    }
}