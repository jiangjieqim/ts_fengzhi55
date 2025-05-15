import { StringUtil } from "../../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../../ui/layaMaxUI";
import { E } from "../../../../../G";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { SocketMgr } from "../../../../../network/SocketMgr";
import { ChiefUpgradeFlag_req } from "../../../../../network/protocols/BaseProto";
import { FontClipCtl } from "../../../avatar/ctl/FontClipCtl";
import { FontCtlFactory } from "../../../avatar/ctl/FontCtlFactory";
import { DotManager } from "../../../common/DotManager";
import { ValCtl } from "../../../main/ctl/ValLisCtl";
import { MainModel } from "../../../main/model/MainModel";
import { t_Platform } from "../../../main/proxy/t_Platform";
import { ECellType } from "../../../main/vos/ECellType";
import { attrConvert } from "../../../main/vos/MainRoleVo";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";
import { FuJiangModel } from "../../model/FuJiangModel";
import { FuJiangFlagListProxy, FuJiangFlagUpgradeProxy } from "../../proxy/FuJiangProxy";

export class FuJiangViewCtl33{
    protected _ui:ui.views.fujiang.ui_fujiangView33UI;

    private _plusCtl: FontClipCtl;

    constructor(skin:ui.views.fujiang.ui_fujiangView33UI) {
        this._ui = skin;

        this._ui.on(Laya.Event.DISPLAY,this,this.onAdd);
        this._ui.on(Laya.Event.UNDISPLAY,this,this.onRemove);

        ValCtl.Create(this._ui.lab1,this._ui.img1,ECellType.FuJiangEquipLv);
        ValCtl.Create(this._ui.lab2,this._ui.img2,ECellType.FuJiangEquipStar);

        ButtonCtl.Create(this._ui.shengxingBtn,new Laya.Handler(this,this.onBtnSXClick));
        ButtonCtl.Create(this._ui.exchangeBtn,new Laya.Handler(this,this.onBtnGHClick));

        this._plusCtl = FontCtlFactory.createPlus();

        this._ui.list.itemRender = ui.views.fujiang.ui_fujiangAttrItem11UI;
        this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);
        this._ui.list1.itemRender = ui.views.fujiang.ui_fujiangAttrItem11UI;
        this._ui.list1.renderHandler = new Laya.Handler(this,this.onRenderHandler1);
        this._ui.list2.itemRender = ui.views.fujiang.ui_fujiangAttrItem11UI;
        this._ui.list2.renderHandler = new Laya.Handler(this,this.onRenderHandler2);
    }

    public onAdd(){
        FuJiangModel.Ins.on(FuJiangModel.FLAG_ID,this,this.updataView);
        FuJiangModel.Ins.on(FuJiangModel.FLAG_LEVEL,this,this.updataView);
        this.updataView();
    }

    public onRemove(){
        FuJiangModel.Ins.off(FuJiangModel.FLAG_ID,this,this.updataView);
        FuJiangModel.Ins.off(FuJiangModel.FLAG_LEVEL,this,this.updataView);
    }

    private _lvNum:number;
    private onBtnSXClick(){
        let req:ChiefUpgradeFlag_req = new ChiefUpgradeFlag_req;
        if(t_Platform.Ins.isOneLvUp && this._uCfg.f_flag_isupstage != 1){
            req.cnt = this._lvNum;
        }
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onBtnGHClick(){
        E.ViewMgr.Open(EViewType.FuJIiangZQGHView);
    }

    private onRenderHandler(item:ui.views.fujiang.ui_fujiangAttrItem11UI,index:number){
        let id = parseInt(item.dataSource.split(":")[0]);
        let val = parseInt(item.dataSource.split(":")[1]);

        let lvSt = this._cfg.f_flag_upgrade.split("|")[index];
        let lv = this._uCfg.f_id - this._uCfg.f_flagstage;
        let lvNum:number = parseInt(lvSt.split(":")[1]) * (lv - 1);

        let val1 = val + lvNum;
        item.tf1.text = MainModel.Ins.getAttrNameIdByID(id) + ":";
        item.valTf1.text = attrConvert(id,val1);

        if(this._uCfg.f_flag_isupstage){
            item.upimg.visible = item.valTf2.visible = false;
        }else{
            if(this._nextuCfg){
                item.upimg.visible = item.valTf2.visible = true;
                let lvNum1:number = parseInt(lvSt.split(":")[1]) * lv;
                let val2 = val + lvNum1;
                item.valTf2.text = attrConvert(id,val2);
            }else{
                item.upimg.visible = item.valTf2.visible = false;
            }
        }
    }

    private onRenderHandler1(item:ui.views.fujiang.ui_fujiangAttrItem11UI,index:number){
        let id = parseInt(item.dataSource.split(":")[0]);
        let val = parseInt(item.dataSource.split(":")[1]);

        let lvSt = this._cfg.f_flag_defence_upgrade.split("|")[index];
        let lvNum:number = parseInt(lvSt.split(":")[1]) * (this._uCfg.f_flagstage - 1);

        let val1 = val + lvNum;
        item.tf1.text = MainModel.Ins.getAttrNameIdByID(id) + ":";
        item.valTf1.text = attrConvert(id,val1);

        if(!this._uCfg.f_flag_isupstage){
            item.upimg.visible = item.valTf2.visible = false;
        }else{
            if(this._nextuCfg){
                item.upimg.visible = item.valTf2.visible = true;
                let lvNum1:number = parseInt(lvSt.split(":")[1]) * this._uCfg.f_flagstage;
                let val2 = val + lvNum1;
                item.valTf2.text = attrConvert(id,val2);
            }else{
                item.upimg.visible = item.valTf2.visible = false;
            }
        }
    }

    private onRenderHandler2(item:ui.views.fujiang.ui_fujiangAttrItem11UI,index:number){
        let id = parseInt(item.dataSource.split(":")[0]);
        let val = parseInt(item.dataSource.split(":")[1]);

        let lvSt = this._cfg.f_flag_defence_upgrade_dentifty.split("|")[index];
        let lvNum:number = parseInt(lvSt.split(":")[1]) * (this._uCfg.f_flagstage - 1);

        let val1 = val + lvNum;
        item.tf1.text = MainModel.Ins.getAttrNameIdByID(id) + ":";
        item.valTf1.text = attrConvert(id,val1);

        if(!this._uCfg.f_flag_isupstage){
            item.upimg.visible = item.valTf2.visible = false;
        }else{
            if(this._nextuCfg){
                item.upimg.visible = item.valTf2.visible = true;
                let lvNum1:number = parseInt(lvSt.split(":")[1]) * this._uCfg.f_flagstage;
                let val2 = val + lvNum1;
                item.valTf2.text = attrConvert(id,val2);
            }else{
                item.upimg.visible = item.valTf2.visible = false;
            }
        }
    }

    private _cfg:Configs.t_Chief_Flag_List_dat;
    private _uCfg:Configs.t_Chief_Flag_Upgrade_dat;
    private _nextuCfg:Configs.t_Chief_Flag_Upgrade_dat;
    private updataView(){
        this._cfg = FuJiangFlagListProxy.Ins.getCfgById(FuJiangModel.Ins.flagId);
        this._uCfg = FuJiangFlagUpgradeProxy.Ins.getCfgById(FuJiangModel.Ins.flagSerial);
        this._nextuCfg = FuJiangFlagUpgradeProxy.Ins.getCfgById(FuJiangModel.Ins.flagSerial + 1);
        this._ui.icon.skin = FuJiangFlagListProxy.Ins.getFlagIcon(this._cfg.f_id);
        this._ui.lab_name.text = this._cfg.f_flag;
        this._ui.lab_lv.text = this._uCfg.f_flagstage + "阶" + this._uCfg.f_flaglevel + "级";
        let v = StringUtil.val2Atlas(FuJiangModel.Ins.flagFight);
        this._plusCtl.setValue(this._ui.plusCon,v);

        this._ui.list.array = this._cfg.f_flag_initi.split("|");
        this._ui.list1.array = this._cfg.f_flag_defence.split("|");
        if(this._cfg.f_flag_defence_dentifty != ""){
            this._ui.list2.array = this._cfg.f_flag_defence_dentifty.split("|");
        }else{
            this._ui.list2.array = [];
        }

        if(this._uCfg.f_flag_isupstage){
            this._ui.lab_dec.text = "";
            this._ui.shengxintf.text = "升阶";
        }else{
            let arr = FuJiangFlagUpgradeProxy.Ins.getListByJJ(this._uCfg.f_flagstage);
            this._ui.lab_dec.text = "再升" + (arr.length - this._uCfg.f_flaglevel)  + "级可进阶";
            let id = parseInt(this._uCfg.f_flag_upgrade.split("-")[0]);
            let num = MainModel.Ins.mRoleData.getVal(id);
            if(t_Platform.Ins.isOneLvUp){
                this._ui.shengxintf.text = "一键升级";
                let len = arr[arr.length - 1].f_id;
                this._lvNum = 0;
                let count = 0;
                for (let i: number = this._uCfg.f_id; i < len; i++) {
                    let cc = FuJiangFlagUpgradeProxy.Ins.getCfgById(i);
                    count += parseInt(cc.f_flag_upgrade.split("-")[1]);
                    if (num >= count) {
                        this._lvNum++;
                    } else {
                        break;
                    }
                }
            }else{
                this._ui.shengxintf.text = "升级";
            }
        }

        DotManager.removeDot(this._ui.shengxingBtn);
        if(this._nextuCfg){
            this._ui.sp.visible = true;
            this._ui.lab_max.visible = false;
            let id = parseInt(this._uCfg.f_flag_upgrade.split("-")[0]);
            let val = parseInt(this._uCfg.f_flag_upgrade.split("-")[1]);
            this._ui.icon1.skin = IconUtils.getIconByCfgId(id);
            let num = MainModel.Ins.mRoleData.getVal(id);
            this._ui.lab11.text = num + "";
            if(num >= val){
                this._ui.lab11.color = "#1BD24B";
                DotManager.addDot(this._ui.shengxingBtn);
            }else{
                this._ui.lab11.color = "#ff0000";
            }
            this._ui.lab22.text = "/" + val;
            this._ui.lab22.x = this._ui.lab11.x + this._ui.lab11.textField.width;
            this._ui.img11.width = this._ui.lab11.textField.width + this._ui.lab22.textField.width + 50;
        }else{
            this._ui.sp.visible = false;
            this._ui.lab_max.visible = true;
        }
    }
}