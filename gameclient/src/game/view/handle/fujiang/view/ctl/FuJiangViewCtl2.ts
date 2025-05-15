import {StringUtil} from "../../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../../ui/layaMaxUI";
import { E } from "../../../../../G";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { stChief } from "../../../../../network/protocols/BaseProto";
import { FontClipCtl } from "../../../avatar/ctl/FontClipCtl";
import { FontCtlFactory } from "../../../avatar/ctl/FontCtlFactory";
import { DotManager } from "../../../common/DotManager";
import { ValCtl } from "../../../main/ctl/ValLisCtl";
import { EquipmentQualityProxy } from "../../../main/model/EquipmentProxy";
import { MainModel } from "../../../main/model/MainModel";
import { ECellType } from "../../../main/vos/ECellType";
import { attrConvert } from "../../../main/vos/MainRoleVo";
import { FuJiangModel } from "../../model/FuJiangModel";
import { FuJiangListProxy, FuJiangLvProxy, FuJiangSupportInheritProxy } from "../../proxy/FuJiangProxy";
import { FuJiangItem12 } from "../item/FuJiangItem12";
import { FuJiangZZItem } from "../item/FuJiangZZItem";

export class FuJiangViewCtl2{
    protected _ui:ui.views.fujiang.ui_fujiangView2UI;
    private _plusCtl: FontClipCtl;

    constructor(skin:ui.views.fujiang.ui_fujiangView2UI) {
        this._ui = skin;

        this._ui.on(Laya.Event.DISPLAY,this,this.onAdd);
        this._ui.on(Laya.Event.UNDISPLAY,this,this.onRemove);

        ValCtl.Create(this._ui.lab1,this._ui.img2,ECellType.FuJiangLv);

        this._plusCtl = FontCtlFactory.createPlus();

        ButtonCtl.Create(this._ui.img_qua,new Laya.Handler(this,this.onTXClick),false);
        ButtonCtl.Create(this._ui.switchBtn,new Laya.Handler(this,this.onBtnSwitchClick));

        this._ui.list.itemRender = FuJiangItem12;
        this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);

        this._ui.list4.itemRender = ui.views.fujiang.ui_fujiangAttrItemUI;
        this._ui.list4.renderHandler = new Laya.Handler(this,this.onRenderHandler4);
    }

    public onAdd(){
        FuJiangModel.Ins.on(FuJiangModel.FUJIANG_UPDATA,this,this.updataView);
        // MainModel.Ins.on(MainEvent.ValChangeCell,this,this.onUpdateMoney);
        this.updataView();
    }

    public onRemove(){
        FuJiangModel.Ins.off(FuJiangModel.FUJIANG_UPDATA,this,this.updataView);
        // MainModel.Ins.off(MainEvent.ValChangeCell,this,this.onUpdateMoney);
    }

    private onTXClick(){
        if(this._data){
            E.ViewMgr.Open(EViewType.FuJiangPY,null,this._data);
        }
    }

    private onBtnSwitchClick(){
        if(this._data){
            E.ViewMgr.Open(EViewType.FuJiangAttrView1,null,this._data);
        }
    }

    private onRenderHandler(item:FuJiangItem12){
        item.setData(item.dataSource);
    }

    private onRenderHandler4(item:ui.views.fujiang.ui_fujiangAttrItemUI){
        let id = parseInt(item.dataSource.id);
        let val = parseInt(item.dataSource.value);
        item.tf1.text = MainModel.Ins.getAttrNameIdByID(id) + ":";
        item.valTf.text = attrConvert(id,val);
        item.lab.visible = false;
    }

    private _data:stChief;
    public updataView(){
        let val = MainModel.Ins.mRoleData.getVal(ECellType.FuJiangLv);
        this._ui.lab1.text = StringUtil.val2m(val);

        this._data = FuJiangModel.Ins.getZJFJData();
        if(this._data){
            this._ui.sp.visible = true;
            this._ui.sp2.visible = false;
            this._ui.lab_zz.visible = true;
            let len = FuJiangSupportInheritProxy.Ins.List.length;
            this._ui.lab_zz.text = "助战副将(" + FuJiangModel.Ins.getFZFJArr().length  + "/" + len + ")";
            this._ui.list.visible = true;
            this._ui.list4.array = this._data.attrs;
            this.updataFJ();
        }else{
            this._ui.sp.visible = false;
            this._ui.sp2.visible = true;
            this._ui.lab_zz.visible = false;
            this._ui.list.visible = false;
        }
        this._ui.list.array = FuJiangSupportInheritProxy.Ins.List;
    }

    private updataFJ(){
        if(!this._data)return;
        let cCfg = FuJiangListProxy.Ins.getCfgById(this._data.cheifId);
        this._ui.img_qua.skin = FuJiangListProxy.Ins.getQuaSkin(cCfg.f_cheifQuality);
        this._ui.img.skin = FuJiangListProxy.Ins.getFuJiangSkin(cCfg.f_cheifid);
        this._ui.lab_lv.text = "Lv." + this._data.level;
        this._ui.lab_name.text = cCfg.f_cheif;
        this._ui.lab_name.color = "#" + EquipmentQualityProxy.Ins.getByQua(cCfg.f_cheifQuality).f_chiefcolor;
        this._ui.lab_snum.text = "x" + this._data.star;
        let v = StringUtil.val2Atlas(this._data.cheifFight);
        this._plusCtl.setValue(this._ui.plusCon,v);
        
        DotManager.removeDot(this._ui.img_qua);
        let nextCfg = FuJiangLvProxy.Ins.getCfgByLv(this._data.level + 1);
        if(nextCfg){
            let n = FuJiangModel.Ins.getShowLv(this._data.level);
            if(n){
                DotManager.addDot(this._ui.img_qua,15,-10);
            }else{
                if(FuJiangModel.Ins.isStarRedTip(this._data.cheifId,this._data.star)){
                    DotManager.addDot(this._ui.img_qua,15,-10);
                }
            }
        }
    }

    // private updataAttr(){
    //     if(!this._data)return;
    //     let cCfg = FuJiangListProxy.Ins.getCfgById(this._data.cheifId);

    //     let array = FuJiangModel.Ins.getFZFJTXAttrArr();
    //     let attrArr = cCfg.f_specialattrinit.split("|");
    //     let starArr = cCfg.f_specialunlock.split("|");
    //     for(let j:number=0;j<attrArr.length;j++){
    //         if(this._data.star >= parseInt(starArr[j])){
    //             let id = parseInt(attrArr[j].split(":")[0]);
    //             let val = parseInt(attrArr[j].split(":")[1]);
    
    //             let lvSt = cCfg.f_specialupgrade.split("|")[j];
    //             let starSt = cCfg.f_specialupstar.split("|")[j];
    //             let lvNum: number = parseInt(lvSt.split(":")[1]) * (this._data.level - 1);
    //             let starNum: number = parseInt(starSt.split(":")[1]) * (this._data.star - 1);
    
    //             val = val + lvNum + starNum;
    //             let cell = new stEquipAttr();
    //             cell.id = id;
    //             cell.value = val;
    //             array.push(cell);
    //         }
    //     }
    // }

    // private onUpdateMoney(id:number){
    //     if(id == ECellType.FuJiangLv){
    //         this._ui.list.array = FuJiangModel.Ins.getSZNoList();
    //     }
    // }
}