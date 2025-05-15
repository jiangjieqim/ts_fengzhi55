import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { ArtifactHandler_req, stArtifact } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import { EServerVersion, MainModel } from "../../main/model/MainModel";
import { EQuickMsg } from "../../main/model/QuickMsgVo";
import { ItemProxy } from "../../main/proxy/ItemProxy";
import { ECellType } from "../../main/vos/ECellType";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { ShenBinModel } from "../model/ShenBinModel";
import { ShenBinExpProxy, ShenBinListProxy } from "../proxy/ShenBinProxy";

export class ShenBinLvView extends ViewBase{
    private _ui:ui.views.shenbin.ui_shenbinLvViewUI;
    protected mMask: boolean = true;
    protected mMainSnapshot: boolean = true;
    private _btnLvCtl:ButtonCtl;
    
    protected onAddLoadRes(): void {
        this.addAtlas('shenbin.atlas');
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.shenbin.ui_shenbinLvViewUI;
            this.bindClose(this._ui.close1);

            ButtonCtl.Create(this._ui.btn_cd,new Laya.Handler(this,this.onBtnCDClick));
            this._btnLvCtl = ButtonCtl.Create(this._ui.btn_lv,new Laya.Handler(this,this.onBtnLvClick));
        }
    }

    protected onInit(): void {
        ShenBinModel.Ins.on(ShenBinModel.UPDATA_SHENBIN,this,this.onupdataView);
        this._data = this.Data;
        this.updataView();
    }

    protected onExit(): void {
        ShenBinModel.Ins.off(ShenBinModel.UPDATA_SHENBIN,this,this.onupdataView);
    }

    private onupdataView(){
        let index = ShenBinModel.Ins.dataList.findIndex(ele => ele.artifactId === this._data.artifactId);
        this._data = ShenBinModel.Ins.dataList[index];
        this.updataView();
    }

    private onBtnLvClick(){
        if(this._data){
            if(this._num >= this._needNum){
                this.sendCmd();
                return;
            }else{
                if((this._num + this._wnNum) >= this._needNum){
                    let num = this._needNum - this._num;
                    MainModel.Ins.queryMsg("进行升级", ECellType.ShenBinCP, num, 
                        EQuickMsg.ShenBinLv, new Laya.Handler(this, this.sendCmd));
                }else{
                    E.ViewMgr.ShowMidError("神兵碎片不足");//显示错误提示
                }
            }
        }
    }

    private sendCmd(){
        let cfg = ShenBinListProxy.Ins.getCfgById(this._data.artifactId);
        let req:ArtifactHandler_req = new ArtifactHandler_req;
        req.type = 1;
        req.itemId = cfg.f_itemId;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onBtnCDClick(){
        if(this._data){
            if(this._data.level){
                let cfg = ShenBinListProxy.Ins.getCfgById(this._data.artifactId);
                let req:ArtifactHandler_req = new ArtifactHandler_req;
                req.type = 2;
                req.itemId = cfg.f_itemId;
                SocketMgr.Ins.SendMessageBin(req);
            }else{
                E.ViewMgr.ShowMidError("请先激活神兵");//显示错误提示
            }
        }
    }

    private _data:stArtifact;
    private _num:number;
    private _wnNum:number;
    private _needNum:number;
    private updataView(){
        let cfg = ShenBinListProxy.Ins.getCfgById(this._data.artifactId);
        let icfg = ItemProxy.Ins.getCfg(cfg.f_itemId);
        let ecfg = ShenBinExpProxy.Ins.getCfgByQuaAndLv(cfg.f_ArtifactQua,this._data.level);
        let eNextCfg = ShenBinExpProxy.Ins.getCfgByQuaAndLv(cfg.f_ArtifactQua,this._data.level + 1);
        this._num = MainModel.Ins.mRoleData.getVal(icfg.f_itemid);
        this._wnNum = MainModel.Ins.mRoleData.getVal(ECellType.ShenBinCP);
        this._needNum = ecfg.f_pieces;

        this._ui.lab_name.text = cfg.f_ArtifactName;
        this._ui.icon.skin = IconUtils.getIconByCfgId(icfg.f_itemid);
        this._ui.quality.skin = IconUtils.getQuaIcon(icfg.f_qua);
        this._ui.lab_l.text = "lv." + this._data.level;

        if(MainModel.Ins.serverVer == EServerVersion.Version_1){
            this._ui.lab_dec.text = StringUtil.format(cfg.f_Comment_v1,this.getAttr(this._data.level));
        }else{
            this._ui.lab_dec.text = StringUtil.format(cfg.f_Comment,this.getAttr(this._data.level));
        }
        if(eNextCfg){
            this._ui.lab_next.visible = true;
            this._ui.lab_dec1.visible = true;
            if(MainModel.Ins.serverVer == EServerVersion.Version_1){
                this._ui.lab_dec1.text = StringUtil.format(cfg.f_Comment_v1,this.getAttr(this._data.level + 1));
            }else{
                this._ui.lab_dec1.text = StringUtil.format(cfg.f_Comment,this.getAttr(this._data.level + 1));
            }
        }else{
            this._ui.lab_next.visible = false;
            this._ui.lab_dec1.visible = false;
        }
       
        let t = this._num / this._needNum;
        if(t > 1){
            t = 1;
        }
        this._ui.pro.width = t * 373;
        this._ui.lab_time2.text = this._num + "/" + this._needNum;
        if(this._data.level == 0){
            this._ui.btn_lv.disabled = false;
            this._ui.lab_lv.text = "激活";
            this._ui.btn_cd.visible = false;
            this._btnLvCtl.setpos(183,510);
        }else {
            if(this._data.wearable == 1){
                this._ui.btn_cd.visible = false;
                this._btnLvCtl.setpos(183,510);
            }else{
                this._ui.btn_cd.visible = true;
                this._btnLvCtl.setpos(310,510);
            }
            if(!eNextCfg){
                this._ui.lab_lv.text = "已满级";
                this._ui.btn_lv.disabled = true;
                this._ui.lab_time2.text = "已满级";
                this._ui.pro.width = 373;
            }else{
                this._ui.lab_lv.text = "升级";
                this._ui.btn_lv.disabled = false;
            }
        }
    }

    private getAttr(lv:number){
        if(lv == 0){
            lv = 0;
        }else{
            lv -= 1;
        }
        let st = "";
        let cfg = ShenBinListProxy.Ins.getCfgById(this._data.artifactId);

        let array = [];
        let arr;
        let arr1;
        if(MainModel.Ins.serverVer == EServerVersion.Version_1){
            arr = cfg.f_initVal_v1.split("|");
            arr1 = cfg.f_parameter_v1.split("|");
        }else{
            arr = cfg.f_initVal.split("|");
            arr1 = cfg.f_parameter.split("|");
        }
        for(let i:number=0;i<arr.length;i++){
            let v = parseInt(arr[i]) + parseInt(arr1[i]) * lv;
            if(cfg.f_ispercent){
                st = (v / 100) + "%";
            }else{
                st = v + "";
            }
            array.push(st);
        }
        return array;
    }
}