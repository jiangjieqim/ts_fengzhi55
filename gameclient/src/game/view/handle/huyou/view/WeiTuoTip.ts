import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { CheckBoxCtl, ICheckBoxSkin } from "../../../../../frame/view/CheckBoxCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { RedEnum } from "../../main/model/RedEnum";
import { ISaveData, RedUpdateModel, RedUpdateUtils } from "../../main/model/RedUpdateModel";
import { HuYouModel } from "../model/HuYouModel";
import {  HuYouQualityProxy } from "../proxy/HuYouProxy";
import { HuYouView } from "./HuYouView";
import { HuYouQuickBtn } from "./ZhuanHuaTip";

/* @Author: tsy
 * @Date: 2023-02-20 16:16:08
 * @Last Modified by: tsy
 * @Last Modified time: 2023-02-27 17:54:35
*/

export class WeiTuoTip extends ViewBase{
    private _ui:ui.views.fuyou.ui_cifuAutoUI;
    protected autoFree = true;
    protected mMask = true;
    private curIndex:number = 0;
    private btnlist:HuYouQuickBtn[];
    private cfglist:Configs.t_Blessing_Soul_Quality_dat[] = [];

    private _checkBoxCtl1:CheckBoxCtl;
    private _checkBoxCtl2:CheckBoxCtl;

    protected onAddLoadRes() {
        
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.fuyou.ui_cifuAutoUI; 
            this.bindClose(this._ui.close1);
            this.btnlist = [];
            this.btnList.push(ButtonCtl.Create(this._ui.startBtn,new Laya.Handler(this,this.onStartHandler)));
            this._ui.maskbg.on(Laya.Event.CLICK,this,this.Close);

            this._checkBoxCtl1 = new CheckBoxCtl({bg:this._ui.bg,gou:this._ui.gou} as ICheckBoxSkin);
            this._checkBoxCtl2 = new CheckBoxCtl({bg:this._ui.ckbg,gou:this._ui.gou1} as ICheckBoxSkin);
            this._checkBoxCtl1.selectHander = new Laya.Handler(this,this.onSelectHander1);
            this._checkBoxCtl2.selectHander = new Laya.Handler(this,this.onSelectHander2);
            this.cfglist = [];
            this.initSelectUI();
        }
    }

    private onSelectHander1(){
        HuYouModel.Ins.wtSelect1 = this._checkBoxCtl1.selected;
        this.uploadConfig();
    }

    private onSelectHander2(){
        HuYouModel.Ins.wtSelect2 = this._checkBoxCtl2.selected;
        this.uploadConfig();
    }

    private onStartHandler() {
        let view:HuYouView = E.ViewMgr.Get(EViewType.CIFU) as HuYouView;
        view.setAuto(true);
        this.Close();
    }

    private initSelectUI(){
        let size = 5;
        let cnt = HuYouQualityProxy.Ins.getListByType(1).length;
        let cellHeight = 0;
        for(let i = cnt-1;i >= 0;i--){
            let _item:HuYouQuickBtn = new HuYouQuickBtn();
            _item.y = (cnt-i - 1) * _item.height + size;
            _item.x = size;
            this._ui.listcontainer.addChild(_item);
            cellHeight = _item.height;
            let cfg:Configs.t_Blessing_Soul_Quality_dat =  HuYouQualityProxy.Ins.GetDataById(i+1);
            _item.cfg = cfg;
            this.updateCell(_item.tf,cfg);
            _item.btn.clickHandler = new Laya.Handler(this,this.onItemClickHandler,[cfg,cnt - i - 1]);
            this.btnlist.push(_item);
            this.cfglist.push(cfg);
        }

        this.curIndex = this.cfglist.length - 1;
        this._ui.listcontainer.height = cnt * cellHeight + size * 2;
        this._ui.listcontainer.y = this._ui.listarea.y - this._ui.listcontainer.height;
        this._ui.listcontainer.visible = false;

        this._ui.listarea.on(Laya.Event.CLICK,this,this.onAreaHander);
    }

    private onSelCallBack(index:number){
        this.selectIndex(index);
    }

    private updateCell(label:Laya.Label,cfg:Configs.t_Blessing_Soul_Quality_dat){
        label.text = cfg.f_SoulQualityName + "的及以下";
        label.color = `#${cfg.f_Color}`;
    }

    private onItemClickHandler( cfg:Configs.t_Blessing_Soul_Quality_dat,_index:number){
        this._ui.listcontainer.visible = false;
        this.selectIndex(_index);
    }

    private selectIndex(index:number){
        let curIndex:number = 0;
        let cfg;
        for(let i = 0;i < this.btnlist.length;i++){
            let cell = this.btnlist[i];
            if(index == i){
                cfg = cell.cfg;
                break;
            }
        }
        if(cfg){
            curIndex = index;
            this.updateCell(this._ui.listtf,cfg);
        }
        this.curIndex = curIndex;
        HuYouModel.Ins.wtQua = this.cfglist[curIndex].f_QualityID;
        this.uploadConfig();
    }
    
    private uploadConfig(){
        let l1:ISaveData[] = [];
        RedUpdateUtils.push(l1,RedEnum.CIFU_CK1,this._checkBoxCtl1);
        RedUpdateUtils.push(l1,RedEnum.CIFU_CK2,this._checkBoxCtl2);
        RedUpdateUtils.push(l1,RedEnum.CIFU_QUA,this.curIndex);
        RedUpdateModel.Ins.saveArr(l1);
    }
    private onAreaHander(){
        this._ui.listcontainer.visible = !this._ui.listcontainer.visible;
        if(this._ui.listcontainer.visible){
            this._ui.sanjiao.rotation = 180;
        }
        else{
            this._ui.sanjiao.rotation = 0;
        }
    }

    protected onInit() {
        RedUpdateUtils.refreshByConfig(this._checkBoxCtl1,RedEnum.CIFU_CK1,false);
        RedUpdateUtils.refreshByConfig(this._checkBoxCtl2,RedEnum.CIFU_CK2,false);
        RedUpdateUtils.refreshByConfig(new Laya.Handler(this,this.onSelCallBack),RedEnum.CIFU_QUA,this.curIndex);

        this._ui.listcontainer.visible = false;
        this._ui.sanjiao.rotation = 0;
        // this.selectIndex(this.curIndex);

        HuYouModel.Ins.wtSelect1 = this._checkBoxCtl1.selected;
        HuYouModel.Ins.wtSelect2 = this._checkBoxCtl2.selected;
    }

    protected onExit() {
        
    }
}