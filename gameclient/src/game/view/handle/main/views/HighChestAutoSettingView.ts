import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { CheckBoxCtl, ICheckBoxSkin } from "../../../../../frame/view/CheckBoxCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { BaseCfg } from "../../../../static/json/data/BaseCfg";
import { ActivityModel } from "../../huodong/ActivityModel";
import { EActivityType } from "../../huodong/model/EActivityType";
import { IListData, SelectListCtl } from "../ctl/SelectListCtl";
import { MainView } from "../MainView";
import { MainModel } from "../model/MainModel";
import { RedEnum } from "../model/RedEnum";
import { RedUpdateModel } from "../model/RedUpdateModel";
import { BoxAutoVo } from "../vos/AutoBoxVo";
import { QuickQua } from "./QuickSettingView";

/**数据配置数据结构体 */
export class HighAutoAttrCfg implements IListData{
    count:number;

    /**属性id 0的时候代表任意属性 -1代表无*/
    attrid:number;
    color:string = "FBF0BB";
    
    /**无效的选项 */
    public get doNotCheck(){
        return this.attrid == -1;
    }

    public get txt():string{
        if(this.count){
            return this.count.toString();
        }
        // return this.attrid == 0 ? E.getLang("Anything") : MainModel.Ins.getAttrNameIdByID(this.attrid);
        if(this.attrid == 0){
            return  E.getLang("Anything");
        }else if(this.attrid == -1){
            return "无";
        }
        return  MainModel.Ins.getAttrNameIdByID(this.attrid);
    }
    constructor(attrId: number = 0) {
        this.attrid = attrId;
    }
}
// 1:玩家等级解锁
// 2：月卡
// 3：终身卡
export enum EBoxAutoType{
    Lv = 1,
    Month = 2,
    Year = 3,
    /**Vip */
    Vip = 4,
}
enum EErrStatus{
    Lv = 0,
    Month = 1,
    Year = 2,
    Null = 3
}
export class CountAutoCfg implements IListData {
    public errStatus:EErrStatus;
    public cfg:Configs.t_Box_Auto_dat;
    /**选择批次数量 */
    count: number;

    color: string = "FBF0BB";
    public get txt(): string {
        return this.count+"倍";
    }

    public get boxMag(){
        if(this.cfg){
            return this.cfg.f_BoxMag;
        }
        return 1;
    }

    public get condition(){
        if(this.cfg){
            let s = "";
            let sign = "";
            if (this.cfg.f_p1 != 0) {
                s = `Lv.${this.cfg.f_p1}`
                sign = "+";
            }
            if(this.cfg.f_UnlockType == EBoxAutoType.Month){
                s+= sign + "月卡";
            }else if(this.cfg.f_UnlockType == EBoxAutoType.Year){
                s+= sign + "终身卡";
            }
            return s;
        }else{
            return "";
        }
    }

    /**是否锁定中 */
    public get locked(){
        let lv = MainModel.Ins.mRoleData.lv;
        if (this.cfg) {
            if (this.cfg.f_UnlockType == EBoxAutoType.Lv) {
                if (lv < this.cfg.f_p1) {
                    this.errStatus = EErrStatus.Lv;
                    return true;
                }
            } else if (this.cfg.f_UnlockType == EBoxAutoType.Month) {

                // if(MainModel.Ins.monthTest != undefined){
                //     this.errStatus = EErrStatus.Month;
                //     return MainModel.Ins.monthTest;
                // }

                if (!MainModel.Ins.isMonthCanUsed) {
                    this.errStatus = EErrStatus.Month;
                    return true;
                }
            } else if (this.cfg.f_UnlockType == EBoxAutoType.Year) {
                if (!MainModel.Ins.isYearCanUsed) {
                    this.errStatus = EErrStatus.Year;
                    return true;
                }
            }
            if (lv < this.cfg.f_p1) {
                this.errStatus = EErrStatus.Lv;
                return true;
            }
        }
        this.errStatus = EErrStatus.Null;
    }

    constructor(cfg:Configs.t_Box_Auto_dat = null) {
        this.cfg = cfg;
        if(cfg){
            this.count = this.cfg.f_BoxMag;
        }else{
            this.count = 1;
        }
    }
}

class HighListCtl{
    private cls = ui.views.main.ui_high_quick_setting_list_attrUI;
    public sel:SelectListCtl = new SelectListCtl();
    private _ui:ui.views.main.ui_quick_combox_list01UI;
    constructor(skin:ui.views.main.ui_quick_combox_list01UI,datalist:IListData[],maxCount:number,type:RedEnum){
        this._ui = skin;
        this.resetIndex(type,datalist);
        this.sel.mCompose = true;
        this.sel.dirBottom = true;
        this.sel.maxColCount = maxCount;
        this.sel.selectHandler = new Laya.Handler(this,this.onSel);
        this.refresh(datalist);
    }

    private resetIndex(type,datalist:IListData[]){
        let v1:any = type;
        let o = RedUpdateModel.Ins.getByID(v1);
        if(o){
            // let auto = MainModel.Ins.boxAutoVo;
            // let index:number = auto.getIndexByAttrId(cfg,o.type);
            // this.sel.curIndex = index;
            this.sel.curIndex = o.type;
        }else{
            //默认选择最后一条
            this.sel.curIndex = datalist.length - 1;
        }
    }
    private onSel(){
        let view:HighChestAutoSettingView = E.ViewMgr.Get(EViewType.HighAutoChest) as HighChestAutoSettingView;
        if(view.IsShow()){
            view.uploadData();
        }
    }

    public refresh(datalist:IListData[]){
        this.sel.init(this._ui.sj0,this._ui.listarea0,this._ui.listcon0,this._ui.tf0,this.cls,datalist,"ui_high_quick_setting_list_attrUI");
        this.sel.refresh();
    }

}

class NumListCtl{
    protected cls = ui.views.main.ui_high_quick_num_setting_list_attrUI;
    public sel:SelectListCtl = new SelectListCtl();
    private _ui:ui.views.main.ui_quick_combox_list01UI;
    constructor(skin:ui.views.main.ui_quick_combox_list01UI,datalist:IListData[],maxColCount:number){
        this.sel.curIndex = MainModel.Ins.boxAutoVo.boxCountIndex;
        this.sel.itemHandler = new Laya.Handler(this,this.onItemRender);
        this.sel.checkHandler = new Laya.Handler(this,this.checkHandler);
        this.sel.maxColCount = maxColCount;
        this.sel.selectHandler = new Laya.Handler(this,this.onSel);
        this.sel.clickCallBack = new Laya.Handler(this,this.onClick);
        this._ui = skin;
        this.sel.mCompose = true;
        this.sel.dirBottom = true;
        this.refresh(datalist);
    }

    private onClick(index:number){
        // console.log(index);
        let view:MainView = E.ViewMgr.Get(EViewType.Main) as MainView;
        view.skin.setdot.visible = false;
    }
    private onSel(){
        let view:HighChestAutoSettingView = E.ViewMgr.Get(EViewType.HighAutoChest) as HighChestAutoSettingView;
        if(view.IsShow()){
            view.uploadData();
        }
    }

    private onItemRender(item:ui.views.main.ui_high_quick_num_setting_list_attrUI){
        let cfg:CountAutoCfg = item.dataSource;
        //3倍 锁  lv.80+终身卡
        item.tf.text = cfg.txt;
        item.tf2.text = cfg.condition;
        item.lockimg.visible = cfg.locked;   
    }
    private checkHandler(index:number):boolean{
        let cfg:CountAutoCfg = this.sel.curDataList[index];
        if(cfg.locked){
            let err = E.getLang("carderr").split("|")[cfg.errStatus];
            E.ViewMgr.ShowMidError(err);
            this.sel.close();
            return false;
        }
        return true;
    }
    public refresh(datalist:IListData[]){
        this.sel.init(this._ui.sj0,this._ui.listarea0,this._ui.listcon0,this._ui.tf0,this.cls,datalist,"ui_high_quick_num_setting_list_attr");
        this.sel.refresh();
    }
}

export class t_Box_filter extends BaseCfg{
    public GetTabelName():string{
        return "t_Box_filter";
    }
    
    private static _ins: t_Box_filter;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Box_filter();
        }
        return this._ins;
    }
}

class HighCheckBoxCtl extends CheckBoxCtl {
    constructor(skin: ICheckBoxSkin) {
        super(skin);
    }
}

// https://layaair.layabox.com/#/demo
/**高级宝箱委托 */
export class HighChestAutoSettingView extends ViewBase {
    private selCtl: SelectListCtl = new SelectListCtl();//品质选择的下拉列表
    /**高级委托 */
    private _ui: ui.views.main.ui_quick_setting_highUI;
    private startCtl: ButtonCtl;
    private ctlList:HighListCtl[] = [];
    private numCtl:NumListCtl;
    private ck0:CheckBoxCtl;
    private ck1:CheckBoxCtl;
    private plusCk:CheckBoxCtl;
    
    private togetherCk:CheckBoxCtl;//同时
    private orCk:CheckBoxCtl;//或
    private model:MainModel;
    protected mMask: boolean = true;

    // protected mMaskClick:boolean = true;
    protected onAddLoadRes(): void { 
        this.addAtlas("main/main.atlas");
    }
    protected onExit(): void {
        this.uploadData();
        SelectListCtl.closeAll();
    }

    protected onFirstInit(): void {
        if (!this.UI) {
            this.model = MainModel.Ins;
            this.UI = this._ui = new ui.views.main.ui_quick_setting_highUI();
            this.bindClose(this._ui.close1);
            this._ui.maskbg.on(Laya.Event.CLICK, this, this.Close);
            
            // this.createComboBox('remote/main/main/combobox.png');
            let group = t_Box_filter.Ins.List;

            let indexConfig:RedEnum[] = [RedEnum.BOX_ATTR_0,RedEnum.BOX_ATTR_1,RedEnum.BOX_ATTR_2,RedEnum.BOX_ATTR_3];
            for(let i = 0;i < 4;i++){
                let datalist1:HighAutoAttrCfg[] = [];
                let cfg:Configs.t_Box_filter_dat = group[i];
                let arr:string[] = cfg.f_filter1.split("|");
                datalist1.push(new HighAutoAttrCfg(0));//任意
                for(let n = 0;n < arr.length;n++){
                    datalist1.push(new HighAutoAttrCfg(parseInt(arr[n])));
                }
                datalist1.push(new HighAutoAttrCfg(-1));//无
                this.ctlList.push(new HighListCtl(this._ui["l"+i],datalist1,8,indexConfig[i]));
            }

            this.numCtl = new NumListCtl(this._ui.l4,[],6);
            this.refreshNum();
            this.startCtl = new ButtonCtl(this._ui.startBtn, new Laya.Handler(this, this.onStartHandler));
            this.setMouseBg(this._ui.bg2);
            this._ui.tips1.text = E.getLang("AutoHeroTips1");
            this._ui.tips2.text = E.getLang("AutoHeroTips2");

            this.ck0 = new HighCheckBoxCtl(this._ui.ck0);
            this.ck0.selectHander = new Laya.Handler(this,this.onSelHandler);
            this.ck0.selected = this.model.boxAutoVo.ck0;

            this.ck1 = new HighCheckBoxCtl(this._ui.ck1);
            this.ck1.selectHander = new Laya.Handler(this,this.onSelHandler);
            this.ck1.selected = this.model.boxAutoVo.ck1;
            /////////////////////////////////////////////////////////////////////////////////
            //同时
            this.togetherCk = new HighCheckBoxCtl(this._ui.tongshick);
            this.togetherCk.selectHander = new Laya.Handler(this,this.onTogetherHandler);
            //或
            this.orCk = new HighCheckBoxCtl(this._ui.huock);
            this.orCk.selectHander =  new Laya.Handler(this,this.onOrHandler);
            /////////////////////////////////////////////////////////////////////////////////
            this.plusCk = new CheckBoxCtl(this._ui.ck2);

            this.plusCk.selected = this.model.boxAutoVo.mCheckPlusHigh;
            this.plusCk.selectHander = new Laya.Handler(this,this.onPlusSelHandler);

            let btn5 = new ButtonCtl(this._ui._5btn,new Laya.Handler(this,this.onMonthHandler));
            let btn8 = new ButtonCtl(this._ui._8btn,new Laya.Handler(this,this.onYearHandler));

            if(MainModel.Ins.verify){
                btn5.visible = btn8.visible = false;
            }
        }
    }

    private initSel(){
        this.selCtl.dirBottom = true;
        this.selCtl.init(this._ui.sanjiao, this._ui.listarea, this._ui.listcontainer, this._ui.listtf,ui.views.main.ui_quick_setting_list_attrUI, MainModel.Ins.chestQuaSelectConfigList);
        this.selCtl.selectHandler = new Laya.Handler(this,this.onQuaSelHandler);
    }

    private onTogetherHandler(){
        this.orCk.selected = !this.togetherCk.selected;
        this.onSelHandler();
    }
    private onOrHandler(){
        this.togetherCk.selected = !this.orCk.selected;
        this.onSelHandler();
    }
    private onPlusSelHandler(){
        this.model.boxAutoVo.mCheckPlusHigh = this.plusCk.selected;
    }

    private onQuaSelHandler(){
        let quaCfg:QuickQua = this.selCtl.selectVo;
        this.model.boxAutoVo.saveQua(quaCfg.f_id);
    }

    private onSelHandler(){
        this.uploadData();
    }
    private onMonthHandler(){
        ActivityModel.Ins.openFunc(EActivityType.t_Pack_MonthAndYear_Card,EViewType.YueKa);
    }
    private onYearHandler(){
        ActivityModel.Ins.openFunc(EActivityType.t_Pack_MonthAndYear_Card,EViewType.ZhongShenKa);
    }

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

    private initTogetherOr(){
        this.togetherCk.selected = this.model.boxAutoVo.togetherCkVal;
        this.orCk.selected = !this.model.boxAutoVo.togetherCkVal;
    }

    protected onInit(): void {
        this.initSel();
        this.initTogetherOr();
        let _index:number = this.getSelIndex();
        this.selCtl.selectIndex(_index);
        this.selCtl.refresh();

        this.refreshNum();
        this.plusCk.selected = this.model.boxAutoVo.mCheckPlusHigh;
    }
    private refreshNum(){
        if(this.numCtl){
            this.numCtl.refresh(this.model.boxAutoVo.boxNumCfgList);
        
            let vo:CountAutoCfg = this.numCtl.sel.selectVo;
            if(vo.locked){
                this.numCtl.sel.selectIndex(0);
            }
        }
    }

    /**上载数据 */
    public uploadData() {
        let vo: BoxAutoVo = this.model.boxAutoVo;
        if(this.numCtl){
            // vo.boxAutoUseCount = this.numCtl.sel.selectVo.count;
            vo.boxCountIndex = this.numCtl.sel.curIndex;
        }
        if(!this.plusCk){
            return;
        }

        vo.togetherCkVal = this.togetherCk.selected;

        vo.mCheckPlusHigh = this.plusCk.selected;

        let arr = [RedEnum.BOX_ATTR_0,RedEnum.BOX_ATTR_1,RedEnum.BOX_ATTR_2,RedEnum.BOX_ATTR_3];
        for(let i = 0;i < arr.length;i++){
            let id:number = arr[i];
            vo.uddateAttr(id,this.ctlList[i].sel.curIndex);
        }

        this.onQuaSelHandler();
        vo.ck0 = this.ck0.selected;
        vo.ck1 = this.ck1.selected;
        vo.upload();
    }

    /**开始委托 */
    private onStartHandler() {
        let curCfg:QuickQua = this.selCtl.selectVo;
        this.uploadData();
        //this.model.boxAutoVo.print();
        this.model.QuickStart(curCfg);
        this.Close();
    }

}