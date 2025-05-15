import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EMsgBoxType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { MountRefinementReplace_req, MountRefinement_req, stMountRefinement } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { BaseCfg } from "../../../../static/json/data/BaseCfg";
import { FontClipCtl } from "../../avatar/ctl/FontClipCtl";
import { FontCtlFactory } from "../../avatar/ctl/FontCtlFactory";
import { EquipmentQualityProxy } from "../../main/model/EquipmentProxy";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { ZuoQiEvent } from "../vos/ZuoQiEvent";
import { MountConfigProxy } from "../vos/ZuoqiProxy";
import { ZuoqiVo } from "../vos/ZuoqiVo";
import { WashNeedReqVo, ZuoQiModel } from "../ZuoqiModel";
import { ZuoQiSlotView } from "./ZuoQiSlotView";
import { ZuoQiWashLeftItemView, ZuoQiWashRightItemView } from "./ZuoQiWashItemView";

class t_Mount_Refinement_AttributeQuality extends BaseCfg{
    public GetTabelName(){
        return "t_Mount_Refinement_AttributeQuality";
    }
    private static _ins:t_Mount_Refinement_AttributeQuality;
    public static get Ins(){
        if(!this._ins){
            this._ins = new t_Mount_Refinement_AttributeQuality();
        }
        return this._ins;
    }
}

/**洗髓 */
export class ZuoqiWashView extends ViewBase {
    private maxQua:number = 7;
    private model:ZuoQiModel;
    private _zqVo:ZuoqiVo;
    protected mMask: boolean = true;
    private _ui: ui.views.zuoqi.ui_zuoqi_wash_viewUI;
    private slotView: ZuoQiSlotView;
    private _plusCtl: FontClipCtl;
    private result:WashNeedReqVo;
    protected onAddLoadRes(): void {
        this.addAtlas("zuoqi.atlas");
    }
    protected onExit(): void {
        // this.model.rideVo.lockedList = [];
        // this._zqVo.lockedList = [];
        for(let i = 0;i < this._ui.list1.length;i++){
            let cell:ZuoQiWashLeftItemView = this._ui.list1.getCell(i) as any;
            if(cell.curData  && cell.isLocked){
                cell.lockStyle = true;
            }
        }
        this.model.off(ZuoQiEvent.MountRefinement,this,this.onRefreshEvt);
        MainModel.Ins.off(MainEvent.ValChange,this,this.onValChange);
    }
    protected onFirstInit(): void {
        if (!this._ui) {
            this.model = ZuoQiModel.Ins;
            this.UI = this._ui = new ui.views.zuoqi.ui_zuoqi_wash_viewUI();
            this.bindClose(this._ui.close1);
            this.slotView = new ZuoQiSlotView(this._ui.slot0);
            ButtonCtl.CreateBtn(this._ui.switchBtn, this, this.onSwitchHandler);
            ButtonCtl.CreateBtn(this._ui.washBtn, this, this.onWashHandler);
            this._plusCtl = FontCtlFactory.createPlus();
            this._ui.list1.itemRender = ZuoQiWashLeftItemView;
            this._ui.list1.renderHandler = new Laya.Handler(this, this.onItemRender);

            this._ui.list2.itemRender = ZuoQiWashRightItemView;
            this._ui.list2.renderHandler = new Laya.Handler(this, this.onItemRender);
            this._ui.showDeccList.itemRender = ui.views.zuoqi.ui_zuoqi_attr_showUI;
            this._ui.showDeccList.renderHandler = new Laya.Handler(this,this.onAttrShow);
            this._ui.showDeccList.array = t_Mount_Refinement_AttributeQuality.Ins.List;
            
            ButtonCtl.CreateBtn(this._ui.helpbtn,this,this.onHelpEvt);
        }
    }

    private onAttrShow(item:ui.views.zuoqi.ui_zuoqi_attr_showUI){
        let cfg:Configs.t_Mount_Refinement_AttributeQuality_dat = item.dataSource;
        let arr:string[] = cfg.f_QualityShow.split("|");
        // f_Qualityrange.split("|");
        item.valTf.text = `${StringUtil.toPercent(arr[0])}~${StringUtil.toPercent(arr[1])}`;
        item.valTf.color = "#"+EquipmentQualityProxy.Ins.getByQua(cfg.f_QualityID).f_Color;
    }
    private onHelpEvt(){
        E.ViewMgr.openHelpView("mount_6","mount_5");
    }

    private onItemRender(item: ZuoQiWashLeftItemView|ZuoQiWashRightItemView,index:number) {
        item.refresh(this._zqVo);

        //隐藏掉相同的属性
        if(item instanceof ZuoQiWashRightItemView){
            // item.graphics.clear();
            // item.graphics.drawRect(0,0,item.width,item.height,null,"#ff0000",1); 
            let vo:stMountRefinement = item.dataSource;
            let leftData = this._zqVo.equipVo.mountAttrList[index];
            if(leftData && vo && vo.id == leftData.id && vo.value == leftData.value){
                item.visible = false;
            }else{
                item.visible = true;
            }
        }
    }

// 1 替换的时候判断左边的词条是否有品质大于等于7的弹出"当前洗髓词条稀有度过高\n是否确认替换?"

// 2洗髓 （右边有属性的时候 判断右边的有没有大于=7 的） 右面空的时候 不用判断。

    /**替换 */
    private onSwitchHandler(){
        // if(this._zqVo.lockedList.length > 0){
        // E.ViewMgr.ShowMidError(E.getLang("mount_4"));
        // "mount_4":"请先解除锁定再替换",
        // return;
        // }

        let tips:boolean;
        // if(this._zqVo.washList.length < 0){
        // }else{
            for(let i = 0;i < this._zqVo.equipVo.mountAttrList.length;i++){
                let cell = this._zqVo.equipVo.mountAttrList[i];

                if(!this.isLocked(cell.id) && cell.quality >= this.maxQua){
                    tips = true;
                }
            }
        // }
        if(tips){
            E.ViewMgr.ShowMsgBox(EMsgBoxType.OkOrCancel,E.getLang("mount_8"),new Laya.Handler(this,this.onSwitch));
        }else{
            this.onSwitch();
        }
    }

    private onSwitch(){
        let req = new MountRefinementReplace_req();
        req.status = 0;
        req.id = this._zqVo.rideId;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private isNeedTips(){
        // if(this._zqVo.washList.length < 0){
        // }else{
            for(let i = 0;i < this._zqVo.washList.length;i++){
                let cell = this._zqVo.washList[i];
                if(cell.quality >= this.maxQua && !this.isLocked(cell.id)){
                    return true;
                }
            }
        // }
    }

    /**取消/洗髓 */
    private onWashHandler(){
        if(this.hasCancel){
            let req = new MountRefinementReplace_req();
            req.id = this._zqVo.rideId;
            req.status = 1;
            SocketMgr.Ins.SendMessageBin(req);
        }else{
            if(this.isNeedTips()){
                E.ViewMgr.ShowMsgBox(EMsgBoxType.OkOrCancel,E.getLang("mount_7"),new Laya.Handler(this,this.okWash));
            }else{
                this.okWash();
            }
        }
    }

    private get fixedIds(){
        let len = this._ui.list1.length;
        // let lockedCount:number = 0;
        let ids:number[] = [];
        for(let i = 0;i < len;i++){
            let cell:ZuoQiWashLeftItemView = this._ui.list1.getCell(i) as any;
            if(cell.curData  && cell.isLocked){
                // lockedCount++;
                ids.push(cell.curData.id);
            }
        }
        // return lockedCount;
        return ids;
    }

    private okWash(){
        let req = new MountRefinement_req();
        req.id = this._zqVo.rideId;
        req.fixedIds = this.fixedIds;
        // let vo = this.model.getWashNeedItemId();
        req.refinementItem = this.result.refinementItem;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private find(washList:stMountRefinement[],id:number){
        for(let i = 0;i < washList.length;i++){
            if(washList[i].id == id){
                return washList[i];
            }
        }
    }

    private isLocked(id:number){
        let len = this._ui.list1.length;
        for(let i = 0;i < len;i++){
            let cell:ZuoQiWashLeftItemView = this._ui.list1.getCell(i) as any;
            if(cell.curData && cell.curData.id == id && cell.isLocked){         
                return true;
            }
        }
    }


    private buildAttr(mountAttrList:stMountRefinement[],washList:stMountRefinement[]){
        for(let i = 0;i < mountAttrList.length;i++){
            let cell = mountAttrList[i];
            if(this.isLocked(cell.id)){
                let f = this.find(washList,cell.id);
                if(f){
                    let fIndex = washList.indexOf(f);
                    // switch i,findex
                    if(fIndex != i){
                        let temp = f;
                        let a = washList[i];
                        washList[i] = temp;
                        washList[fIndex] = a;
                    }
                }

            }
        }
        return washList;
    }
    private get lockedCount(){
        let len = this._ui.list1.length;
        let lockedCount:number = 0;
        for(let i = 0;i < len;i++){
            let cell:ZuoQiWashLeftItemView = this._ui.list1.getCell(i) as any;
            if(cell.isLocked){
                lockedCount++;
            }
        }
        return lockedCount;
    }
    public get isCanLock(){
        if(this.lockedCount + 1 == this._ui.list1.length){
            return false;
        }else{
            return true;
        }
    }

    /**有取消按钮 */
    public get hasCancel(){
        return this._zqVo && this._zqVo.washList.length > 0
    }

    public onRefreshEvt(){
        this._zqVo = this.model.getMountVoById(this.Data);

        this.slotView.setData(this._zqVo);

        let _zqVo = this._zqVo;
        let color = _zqVo.getQuaColor();
        this._ui.nameTf.text = _zqVo.getName();
        this._ui.quaTf.text = _zqVo.getQuaText();
        this._ui.nameTf.color = color;
        this._ui.quaTf.color = color;
        this._plusCtl.setValue(this._ui.plusCon,StringUtil.val2Atlas(_zqVo.plus||0));

        let l1 = _zqVo.equipVo.mountAttrList;//.sort(this.sortHandler);
        this._ui.list1.array =  l1;

        // this._ui.list1.refresh();
        
        let rightWashs:stMountRefinement[] = this.buildAttr(l1,_zqVo.washList);
        this._ui.list2.array = rightWashs;//this.newAttr(l1,_zqVo.washList);//this.convertAttr(_zqVo.washList);
        if(this.hasCancel){
            //有可以替换的属性
            this._ui.tipsTf.visible = false;
            this._ui.switchBtn.visible = true;// 显示替换按钮
            this._ui.washCon.x = 369;
            this._ui.valTf.text = E.getLang("Cancel");//显示取消按钮
            this._ui.goldicon.visible = this._ui.goldTf.visible = false;
        }else{
            //洗髓
            this._ui.valTf.text = E.getLang("mount_6");
            this._ui.goldicon.visible = this._ui.goldTf.visible = true;
            this._ui.tipsTf.visible = true;
            this._ui.switchBtn.visible = false;//隐藏替换按钮
            this._ui.washCon.x = 215;
        }
        this.result = this.model.getWashNeedItemId(this._zqVo.quality,this.lockedCount);

        let _needItem = this.result.itemVo;
        this._ui.goldicon.skin = _needItem.getIcon();
        this._ui.goldTf.text = _needItem.count.toString();
        this.onValChange();
    }
    protected onInit(): void {
        this._zqVo = this.model.getMountVoById(this.Data);
        this.model.on(ZuoQiEvent.MountRefinement,this,this.onRefreshEvt);
        MainModel.Ins.on(MainEvent.ValChange,this,this.onValChange);
        this.onRefreshEvt();
    }

    private onValChange(){
        let qua:number = this._zqVo.quality;
        let cfg: Configs.t_Mount_Config_dat = MountConfigProxy.Ins.getByQualityID(qua);
        let arr:string[] = cfg.f_Refinement.split(";");
        let itemid = parseInt(arr[0].split("-")[0]);
        let goldId = parseInt(arr[1].split("-")[0]);
        MainModel.Ins.setItem(this._ui.yuanbaoIcon,this._ui.yuanbaoTf,itemid);
        MainModel.Ins.setItem(this._ui.needItemIcon,this._ui.needitemTf,goldId);
    }
}