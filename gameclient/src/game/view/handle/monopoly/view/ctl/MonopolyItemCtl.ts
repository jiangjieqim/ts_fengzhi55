import { ui } from "../../../../../../ui/layaMaxUI";
import { E } from "../../../../../G";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { stMonopolyMapInfo } from "../../../../../network/protocols/BaseProto";
import { ItemViewFactory } from "../../../main/model/ItemViewFactory";
import { ItemVo } from "../../../main/vos/ItemVo";
import { MonopolyModel } from "../../model/MonopolyModel";
import { MonopolyMapProxy } from "../../proxy/MonopolyProxy";

export class MonopolyItemCtl{
    protected _ui:ui.views.monopoly.ui_MonopolyItemUI;

    constructor(skin:ui.views.monopoly.ui_MonopolyItemUI) {
        this._ui = skin;
        this._ui.on(Laya.Event.DISPLAY,this,this.onAdd);
        this._ui.on(Laya.Event.UNDISPLAY,this,this.onRemove);
    }
    
    private onAdd(){
        this._ui.on(Laya.Event.CLICK,this,this.onClick);
    }
    
    private onRemove(){
        this._ui.off(Laya.Event.CLICK,this,this.onClick);
    }

    private onClick(){
        if(this._data){
            if(this._data.type){
                E.ViewMgr.Open(EViewType.MonopolyView,null,this._data);
            }else{
                E.ViewMgr.ShowMidError("未解锁");
            }
        }
    }

    private _data:stMonopolyMapInfo;
    public setData(value:stMonopolyMapInfo){
        if(!value)return;
        this._data = value;
        let cfg:Configs.t_Monopoly_Map_dat = MonopolyMapProxy.Ins.GetDataById(value.fid);
        this._ui.img.skin = `remote/monopoly/${cfg.f_Res}`;
        this._ui.lab.text = cfg.f_AreaName;
        if(value.type){
            this._ui.img.gray = false;
            this._ui.lab1.text = "已解锁";
        }else{
            this._ui.img.gray = true;
            let lastCfg:Configs.t_Monopoly_Map_dat = MonopolyMapProxy.Ins.GetDataById(cfg.f_id - 1);
            let lastData = MonopolyModel.Ins.mapList.find(ele => ele.fid === cfg.f_id - 1);
            this._ui.lab1.text = `需游历${lastCfg.f_AreaName}${lastData.count}/${cfg.f_UnlockCondi}圈`;
        }
        let itemVo:ItemVo = new ItemVo();
        itemVo.cfgId = parseInt(cfg.f_BigRewards.split("-")[0]);
        itemVo.count = parseInt(cfg.f_BigRewards.split("-")[1]);
        ItemViewFactory.refreshSlot(this._ui.slot,itemVo);
    }
}