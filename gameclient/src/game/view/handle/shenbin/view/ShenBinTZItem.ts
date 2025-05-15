import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { SocketMgr } from "../../../../network/SocketMgr";
import { ArtifactSuit_req, stArtifact, stArtifactSuit } from "../../../../network/protocols/BaseProto";
import { DotManager } from "../../common/DotManager";
import { MainModel } from "../../main/model/MainModel";
import { ItemProxy } from "../../main/proxy/ItemProxy";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { ShenBinModel } from "../model/ShenBinModel";
import { ArtifactComboAttributeProxy, ShenBinComboProxy, ShenBinExpProxy, ShenBinListProxy } from "../proxy/ShenBinProxy";

export class ShenBinTZItem extends ui.views.shenbin.ui_shenbinTZItemUI{
    constructor(){
        super();

        this.list.itemRender = ui.views.shenbin.ui_shenbinTZItem1UI;
        this.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);

        this.list1.itemRender = ui.views.shenbin.ui_shenbinTZItem2UI;
        this.list1.renderHandler = new Laya.Handler(this,this.onRenderHandler1);

        ButtonCtl.Create(this.btn, new Laya.Handler(this, this.onBtnClick));
    }

    private onBtnClick(){
        if(this._data){
            let req:ArtifactSuit_req = new ArtifactSuit_req;
            req.fid = this._data.fid;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private onRenderHandler(item:ui.views.shenbin.ui_shenbinTZItem1UI){
        let data:stArtifact = ShenBinModel.Ins.dataList.find(ele => ele.artifactId == parseInt(item.dataSource));
        let cfg = ShenBinListProxy.Ins.getCfgById(data.artifactId);
        item.lab_name.text = cfg.f_ArtifactName;
        let ecfg = ShenBinExpProxy.Ins.getCfgByQuaAndLv(cfg.f_ArtifactQua,data.level);
        let eNextcfg = ShenBinExpProxy.Ins.getCfgByQuaAndLv(cfg.f_ArtifactQua,data.level + 1);
        let icfg = ItemProxy.Ins.getCfg(cfg.f_itemId);
        item.icon.skin = IconUtils.getIconByCfgId(icfg.f_itemid);
        item.quality.skin = IconUtils.getQuaIcon(icfg.f_qua);
        item.lab_lv.text = "lv." + data.level;
        if(eNextcfg){
            let icfg = ItemProxy.Ins.getCfg(cfg.f_itemId);
            let num = MainModel.Ins.mRoleData.getVal(icfg.f_itemid);
            item.lab_num.visible = true;
            item.lab_num.text = "碎片" + num + "/" + ecfg.f_pieces;
            item.lab_mj.visible = false;
        }else{
            item.lab_num.visible = false;
            item.lab_mj.visible = true;
        }
    }

    private onRenderHandler1(item:ui.views.shenbin.ui_shenbinTZItem2UI,index:number){
        let arr = item.dataSource.f_Attr.split(":");
        let lv = parseInt(item.dataSource.f_ComboLevel);
        let id = parseInt(arr[0]);
        let val = attrConvert(id,parseInt(arr[1]));
        let st = MainModel.Ins.getAttrNameIdByID(id) + "+" + val;
        if(index == 0){
            item.lab.text = "全部激活  " + st;
        }else{
            item.lab.text = `激活达到${lv}级  ` + st;
        }
        if(this._data.currentLevel > lv){
            item.lab.color = "#92918D";
        }else if(this._data.currentLevel == lv){
            item.lab.color = "#4D9DCE";
        }else if(this._data.activeLevel >= lv){
            item.lab.color = "#4F8E3F";
        }else{
            item.lab.color = "#92918D";
        }
        
    }

    private _data:stArtifactSuit;
    public setData(value:stArtifactSuit){
        if(!value)return;
        this._data = value;
        let cfg:Configs.t_Artifact_Combo_dat = ShenBinComboProxy.Ins.GetDataById(value.fid);
        this.lab_name.text = cfg.f_ComboName + `(${ShenBinModel.Ins.getTZSt(cfg.f_Artifactid)})`;
        this.list.array = cfg.f_Artifactid.split("|");
        this.lab_lv.text = "Lv." + ShenBinModel.Ins.getTZLv(cfg.f_Artifactid);

        let attArr = ArtifactComboAttributeProxy.Ins.getCfgById(value.fid);
        this.list1.array = attArr;
        DotManager.removeDot(this.btn);
        if(value.state == 1){
            this.btn.mouseEnabled = true;
            this.btn.skin = "remote/common/base/anniu_blue1.png";
            this.lab.text = "激活";
            DotManager.addDot(this.btn);
        }else{
            this.btn.mouseEnabled = false;
            this.btn.skin = "remote/common/base/anniu_grey.png";
            if(value.currentLevel >= parseInt(attArr[attArr.length - 1].f_ComboLevel)){
                this.lab.text = "已上限";
            }else{
                this.lab.text = "激活";
            }
        }
    }
}