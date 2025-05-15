import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { CheckBoxCtl, ICheckBoxSkin } from "../../../../../frame/view/CheckBoxCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { SocketMgr } from "../../../../network/SocketMgr";
import { PetExtract_req } from "../../../../network/protocols/BaseProto";
import { DotManager } from "../../common/DotManager";
import { ValCtl } from "../../main/ctl/ValLisCtl";
import { EquipmentQualityProxy } from "../../main/model/EquipmentProxy";
import { ECellType } from "../../main/vos/ECellType";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { LingChongModel } from "../model/LingChongModel";
import { PetConfigProxy } from "../proxy/LingChongProxy";
import { LingChongFeastModel } from "../model/LingChongFeastModel";
import { RedEnum } from "../../main/model/RedEnum";
import { RedUpdateModel } from "../../main/model/RedUpdateModel";
import { VipModel, VipType } from "../../huodong/model/VipModel";
import { EClientType } from "../../sdk/ClientType";

export class LingChongViewCtl3{
    protected _ui:ui.views.lingchong.ui_lingchongZHViewUI;

    private _timeCtl:TimeCtl;
    private _checkBoxCtl:CheckBoxCtl;
    private _checkBoxCtl1:CheckBoxCtl;
    private _checkBoxCtl2:CheckBoxCtl;

    constructor(skin:ui.views.lingchong.ui_lingchongZHViewUI) {
        this._ui = skin;

        this._ui.on(Laya.Event.DISPLAY,this,this.onAdd);
        this._ui.on(Laya.Event.UNDISPLAY,this,this.onRemove);

        ButtonCtl.Create(this._ui.btn_add1,new Laya.Handler(this,this.onBtnAdd1Click));
        ButtonCtl.Create(this._ui.btn_add2,new Laya.Handler(this,this.onBtnAdd2Click));

        ButtonCtl.Create(this._ui.tips,new Laya.Handler(this,this.onBtnTipClick));
        ButtonCtl.Create(this._ui.xunzaoBtn,new Laya.Handler(this,this.onBtnCQClick));
        ButtonCtl.Create(this._ui.xunzaoBtn1,new Laya.Handler(this,this.onBtnCQ1Click));
        ButtonCtl.Create(this._ui.btn_tj,new Laya.Handler(this,this.onBtnTJClick));

        ValCtl.Create(this._ui.lab_m1,this._ui.img_m1,ECellType.GOLD);
        ValCtl.Create(this._ui.lab_m2,this._ui.img_m2,ECellType.LingChouZM);

        this._timeCtl = new TimeCtl(this._ui.timetf);

        this._checkBoxCtl = new CheckBoxCtl({bg:this._ui.bg,gou:this._ui.gou} as ICheckBoxSkin);
        this._checkBoxCtl.selectHander = new Laya.Handler(this,this.onSelectHander);
        this._checkBoxCtl.selected = false;

        this._checkBoxCtl1 = new CheckBoxCtl({bg:this._ui.bg_1,gou:this._ui.gou_1} as ICheckBoxSkin);
        this._checkBoxCtl1.selected = false;

        this._checkBoxCtl2 = new CheckBoxCtl({bg:this._ui.bg_2,gou:this._ui.gou_2} as ICheckBoxSkin);
        this._checkBoxCtl2.selectHander = new Laya.Handler(this,this.onSelectHander2);

        this._ui.zhekouImg.mouseEnabled = false;
    }

    private onSelectHander(){
        this.updataMoney();
    }

    private onSelectHander2(){
        if(this._checkBoxCtl2.selected){
            RedUpdateModel.Ins.save(RedEnum.LINGCHONG_SHILIAN,1);
        }else{
            RedUpdateModel.Ins.save(RedEnum.LINGCHONG_SHILIAN,0);
        }
        this.updataMoney();
    }

    private onBtnTipClick(){
        E.ViewMgr.openHelpView("petCKTitle","petCKDec");
    }

    private onBtnAdd1Click(){
        E.ViewMgr.Open(EViewType.Shop);
    }

    private onBtnAdd2Click(){
        E.ViewMgr.Open(EViewType.LingChongGMView);
    }

    private _time:number;
    private onBtnCQClick(){
        if (Laya.timer.currTimer - this._time < 300) {
            return;
        }
        this._time = Laya.timer.currTimer;
        let req: PetExtract_req = new PetExtract_req;
        if (LingChongModel.Ins.freeCount) {
            req.itemId = 0;
            req.type = 1;
            SocketMgr.Ins.SendMessageBin(req);
        } else {
            LingChongModel.Ins.getPetAction(this._checkBoxCtl.selected,1,this._checkBoxCtl1.selected);
        }
    }

    private onBtnCQ1Click(){
        if (Laya.timer.currTimer - this._time < 300) {
            return;
        }
        this._time = Laya.timer.currTimer;
        if(this._checkBoxCtl2.selected){
            LingChongModel.Ins.getPetAction(this._checkBoxCtl.selected,3,this._checkBoxCtl1.selected);
        }else{
            LingChongModel.Ins.getPetAction(this._checkBoxCtl.selected,2,this._checkBoxCtl1.selected);
        }
    }

    private onBtnTJClick(){
        E.ViewMgr.Open(EViewType.LingChongTJView);
    }

    public onAdd(){
        let vo = RedUpdateModel.Ins.getByID(RedEnum.LINGCHONG_SHILIAN);
        if (vo && vo.type == 1) {
            this._checkBoxCtl2.selected = true;
        }else{
            this._checkBoxCtl2.selected = false;
        }

        if(initConfig.clienttype == EClientType.Discount){
            let Pet10 = VipModel.Ins.getVipTQByType(VipType.Pet10);
            let PetAtuo = VipModel.Ins.getVipTQByType(VipType.PetAtuo);
            if(Pet10 == -1){
                this._ui.bg_2.visible = this._ui.lab_2.visible = false;
                if(PetAtuo == -1){
                    this._ui.bg_1.visible = this._ui.lab_1.visible = false;
                }else{
                    this._ui.bg_1.visible = this._ui.lab_1.visible = true;
                    this._ui.bg_1.x = 371;
                    this._ui.lab_1.x = 408;
                }
            }else{
                this._ui.bg_2.visible = this._ui.lab_2.visible = true;
                if(PetAtuo == -1){
                    this._ui.bg_1.visible = this._ui.lab_1.visible = false;
                    this._ui.bg_2.x = 371;
                    this._ui.lab_2.x = 408;
                }else{
                    this._ui.bg_1.visible = this._ui.lab_1.visible = true;
                    this._ui.bg_1.x = 454;
                    this._ui.lab_1.x = 491;
                    this._ui.bg_2.x = 299;
                    this._ui.lab_2.x = 336;
                }
            }
        }else{
            this._ui.bg_1.visible = this._ui.lab_1.visible = true;
            this._ui.bg_2.visible = this._ui.lab_2.visible = false;
            this._ui.bg_1.x = 371;
            this._ui.lab_1.x = 408;
        }

        LingChongModel.Ins.on(LingChongModel.Updata_ChouKa,this,this.updataView);
        this.updataView();
    }

    public onRemove(){
        LingChongModel.Ins.off(LingChongModel.Updata_ChouKa,this,this.updataView);
        this._timeCtl.stop();
    }

    private updataView(){
        let qua = PetConfigProxy.Ins.List[0].f_protectquality;
        let name = EquipmentQualityProxy.Ins.getByQua(qua).f_EquipmentLevel;
        this._ui.lab_num.text = `再抽取${LingChongModel.Ins.baoDi}次后必出${name}灵宠`;
        this.updataMoney();

        DotManager.removeDot(this._ui.xunzaoBtn);
        if(LingChongModel.Ins.freeCount){
            const free = PetConfigProxy.Ins.List[0].f_freetime;
            this._ui.freetf.text = E.LangMgr.getLang('mfcq', free - LingChongModel.Ins.freeCount, free);
            this.endTime();
        }else{
            this._ui.freetf.text = '';
            this._ui.img_yb1.visible = this._ui.lab_yb1.visible = true;
            this._ui.xunzhaotf.text = "抽取一次";
            let time = LingChongModel.Ins.nextFreeUnix - TimeUtil.serverTime;
            if (time > 0) {
                this._timeCtl.start(time, new Laya.Handler(this, this.onUpdateTime), new Laya.Handler(this, this.endTime));
            } else {
                this.endTime();
            }
        }
    }

    private onUpdateTime(){
        let time_str = TimeUtil.subTime(this._timeCtl.tickVal) + "后免费";
        this._timeCtl.setText(time_str);
     }

     private endTime(){
        this._ui.img_yb1.visible = this._ui.lab_yb1.visible = false;
        this._timeCtl.setText("");
        this._timeCtl.stop();
        DotManager.addDot(this._ui.xunzaoBtn);
     }

     private updataMoney(){
        let cfg:Configs.t_Pet_Config_dat = PetConfigProxy.Ins.List[0];
        let id;
        let num;
        let _now:number;//当前的价格
        let num1;
        this._ui.zhekouImg.visible = false;
        if(this._checkBoxCtl2.selected){
            num1 = parseInt(cfg.f_Tenpricegold.split("-")[1]);//三抽
            this._ui.lab1.text = "抽取十次";
        }else{
            num1 = parseInt(cfg.f_triplepricegold.split("-")[1]);//三抽
            this._ui.lab1.text = "抽取三次";
        }
        if(this._checkBoxCtl.selected){
            if(LingChongFeastModel.Ins.isOpen){// || NewPlayerPetFeastModel.Ins.isOpen){
                this._ui.zhekouImg.visible = true;
                if(this._checkBoxCtl2.selected){
                    _now = parseInt(cfg.f_TenpricegoldDiscount.split("-")[1]);
                }else{
                    _now = parseInt(cfg.f_Discount.split("-")[1]);
                }
                let a = (_now / num1 * 10).toFixed(0);
                this._ui.zhekouTf.text =  E.getLang("limitdiscount",a);
                this._ui.oldGoldTf.text = E.getLang("oldprice") + num1;
            }else{
                _now = num1;
            }
            id = parseInt(cfg.f_singlepricegold.split("-")[0]);
            num = parseInt(cfg.f_singlepricegold.split("-")[1]);
        }else{
            id = parseInt(cfg.f_singleprice.split("-")[0]);
            num = parseInt(cfg.f_singleprice.split("-")[1]);
            if(this._checkBoxCtl2.selected){
                _now = parseInt(cfg.f_Tenprice.split("-")[1]);
            }else{
                _now = parseInt(cfg.f_tripleprice.split("-")[1]);
            }
        }
        this._ui.img_yb1.skin = this._ui.img_yb2.skin = IconUtils.getIconByCfgId(id);
        this._ui.lab_yb1.text = num + "";
        this._ui.lab_yb2.text = _now + "";
     }
}