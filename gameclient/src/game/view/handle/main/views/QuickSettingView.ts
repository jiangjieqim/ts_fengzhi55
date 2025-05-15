import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { IListData, SelectListCtl } from "../ctl/SelectListCtl";
import { EFuncDef } from "../model/EFuncDef";
import { MainModel } from "../model/MainModel";
import { FuncProxy } from "../proxy/FuncProxy";
import { BoxAutoVo } from "../vos/AutoBoxVo";
export class QuickQua implements IListData{
    color:string;
    txt:string;
    f_id:number;
}
export class QuickSettingView extends ViewBase{
    private _ui:ui.views.main.ui_quick_settingUI;
    private model:MainModel;
    private startCtl:ButtonCtl;
    // protected autoFree = true;
    // private curIndex:number = 0;
    // private cfglist:Configs.t_EquipmentQuality_dat[] = [];
    protected mMask:boolean = true;
    private selCtl: SelectListCtl;// = new SelectListCtl();
    private getSelIndex(){
        let quaid = this.model.boxAutoVo.getQua_f_id();
        let datalist = this.selCtl.curDataList;
        for(let i = 0;i < datalist.length;i++){
            let quaCfg:QuickQua = datalist[i];
            if(quaCfg.f_id == quaid){
                return i;
            }
        }
        return 0;
    }
    protected onFirstInit() {
        if(!this._ui){
            this.UI = this._ui = new ui.views.main.ui_quick_settingUI();
            this.model = MainModel.Ins;
            this.startCtl = new ButtonCtl(this._ui.startBtn,new Laya.Handler(this,this.onStartHandler));
            this.selCtl = new SelectListCtl();
            this.btnList.push(new ButtonCtl(this._ui.close1,new Laya.Handler(this,this.Close)));
            this._ui.maskbg.on(Laya.Event.CLICK,this,this.Close);
            //#################################################################
            // this._ui.bg.visible = this._ui.tips1.visible = false;
            // this.initSelectUI();
            
            let cfg = FuncProxy.Ins.getCfgByFuncId(EFuncDef.HideChestAuto);
            this._ui.tips2.text = FuncProxy.Ins.f_info(cfg);
            // this._ui.tips2.text = "";
        }
    }
    private initSelectUI(){
        this.selCtl.init(this._ui.sanjiao, this._ui.listarea, this._ui.listcontainer, this._ui.listtf,
            ui.views.main.ui_quick_setting_list_attrUI, MainModel.Ins.chestQuaSelectConfigList);
        this.selCtl.selectHandler = new Laya.Handler(this,this.onSelHandler);
    }
    private onSelHandler(){
        this.upload();
    }
    /**
     * 开始托管抽宝箱
     */
    private onStartHandler() {
        if(this.model.mRoleData.boxCnt){
            let curCfg = this.selCtl.selectVo;//this.cfglist[this.selCtl.curIndex];
            this.model.QuickStart(curCfg);
        }
        this.Close();
    }

    private upload(){
        let vo: BoxAutoVo = this.model.boxAutoVo;
        let quaCfg:QuickQua = this.selCtl.selectVo;
        // vo.qua_f_id = quaCfg.f_id;
        vo.saveQua(quaCfg.f_id);
        vo.upload();
    }

    protected onExit() {
        this.upload();
    }
    protected onAddLoadRes() {
        this.addAtlas("main/chest.atlas");
    }
    protected onAddEventListener() {

    }
    protected onEnter() {
    
    }
    protected onInit() {
        this.initSelectUI();
        // this.selCtl.selectIndex(this.selCtl.curIndex);
        let _index:number = this.getSelIndex();
        this.selCtl.selectIndex(_index);
        this.selCtl.refresh();
    }
}