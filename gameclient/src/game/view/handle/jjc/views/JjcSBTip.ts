import { StringUtil } from "../../../../../frame/util/StringUtil";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { stArtifact } from "../../../../network/protocols/BaseProto";
import { EServerVersion, MainModel } from "../../main/model/MainModel";
import { ItemProxy } from "../../main/proxy/ItemProxy";
import { ShenBinListProxy } from "../../shenbin/proxy/ShenBinProxy";
import { IconUtils } from "../../zuoqi/vos/IconUtils";

export class JjcSBTip extends ViewBase{
    private _ui:ui.views.jjc.ui_jjcsbTipUI;
    protected mMask = true;
    protected autoFree = true;
    protected  onAddLoadRes(){
        
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.jjc.ui_jjcsbTipUI;
            this.bindClose(this._ui.close1);

        }
    }

    protected onInit(): void {
        let data:stArtifact = this.Data[0];
        let cfg = ShenBinListProxy.Ins.getCfgById(data.artifactId);
        let icfg = ItemProxy.Ins.getCfg(cfg.f_itemId);
        this._ui.lab_name.text = cfg.f_ArtifactName;
        this._ui.icon.skin = IconUtils.getIconByCfgId(icfg.f_itemid);
        this._ui.quality.skin = IconUtils.getQuaIcon(icfg.f_qua);
        this._ui.lab_l.text = "lv." + data.level;
        if(MainModel.Ins.serverVer == EServerVersion.Version_1){
            this._ui.lab_dec.text = StringUtil.format(cfg.f_Comment_v1,this.getAttr(data.level,data.artifactId));
        }else{
            this._ui.lab_dec.text = StringUtil.format(cfg.f_Comment,this.getAttr(data.level,data.artifactId));
        }
    }

    private getAttr(lv:number,id:number){
        if(lv == 0){
            lv = 0;
        }else{
            lv -= 1;
        }
        let st = "";
        let cfg = ShenBinListProxy.Ins.getCfgById(id);
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

    protected onExit(): void {
        
    }
}