import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { AddSubCtl } from "../../../../../frame/view/AddSubCtl";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { HrefUtils } from "../../../../../InitConfig";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { stCellValue, UseItem_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { ItemViewFactory } from "../model/ItemViewFactory";
import { MainModel } from "../model/MainModel";
import { ItemProxy } from "../proxy/ItemProxy";
import { EUseItemScene } from "../vos/ECellType";
import { ItemVo } from "../vos/ItemVo";

export class QuickViewVo{
    /**物品配置id */
    itemId:number;
    /**场景类型 */
    sceneType:EUseItemScene;

    /**下一级升级的时间戳 */
    lvTime:number;

    public getDesc(curVal:number){
        let cfg: Configs.t_Item_dat = ItemProxy.Ins.getCfg(this.itemId);
        switch(this.sceneType){
            default:
                let _time:number = parseInt(cfg.f_p1);
                
                let sec = curVal * _time;
                // let str: string = TimeUtil.subTime(sec);
                let str:string = TimeUtil.timeFormatStr(sec,true);
                return E.getLang("CanFastTime") + " " + str;   //可加速时间
        }
    }

    /**单个物品的可以加速的时间 */
    public get useRefreshTime(){
        let cfg: Configs.t_Item_dat = ItemProxy.Ins.getCfg(this.itemId);
        switch(this.sceneType){
            default:
                let _time:number = parseInt(cfg.f_p1);
                return _time;
        }
    }

    public get haveItemCount(){
        return MainModel.Ins.mRoleData.getVal(this.itemId);
    }

    private mushUse(curVal:number){
        if(MainModel.Ins.isItemEnoughSt(`${this.itemId}-${curVal}`,true)){
            let req:UseItem_req = new UseItem_req();
            req.type = this.sceneType;
            req.itemlist = [];
            let _cell:stCellValue = new stCellValue();
            _cell.id = this.itemId;
            _cell.count = curVal;
            req.itemlist.push(_cell);
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    public useItem(curVal:number){
        switch(this.sceneType){
            case EUseItemScene.Chest://宝箱加速
                if(curVal > 1){
                    this.mushUse(curVal);
                }else{
                    MainModel.Ins.levelUpChest();
                }
                break;
            default:
                this.mushUse(curVal);
                break;
        }
    }
}

/**快速使用 */
export class ChestQuickUseView extends ViewBase {
    protected itemId:number;
    
    protected mMask:boolean = true;
    
    private _ui: ui.views.main.ui_chest_quick_useUI;
    private _ctl:AddSubCtl;
    private itemCfg:Configs.t_Item_dat;
    private _vo:QuickViewVo;
    protected onAddLoadRes(): void { }
    protected onExit(): void { }
    protected autoFree = true;
    private maxBtnCtl:ButtonCtl;
    protected onFirstInit(): void {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.main.ui_chest_quick_useUI();
            this.bindClose(this._ui.close1);
            this._ctl = new AddSubCtl(this._ui.addBtn,this._ui.subBtn,this._ui.cntTf);

            this._ctl.callBack = new Laya.Handler(this,this.onUpdateHandler);
            this.btnList.push(
            ButtonCtl.CreateBtn(this._ui.okBtn,this,this.onOkHandler),
            ButtonCtl.CreateBtn(this._ui.cancelBtn,this,this.Close)
            );
            this.maxBtnCtl = ButtonCtl.CreateBtn(this._ui.maxBtn, this, this.onMaxHandler);
            this.maxBtnCtl.visible = HrefUtils.getVal("maxbtn") == 1;//隐藏max按钮
            this.btnList.push(this.maxBtnCtl);
        }
    }
    private onMaxHandler(){
        this._ctl.setValue(this._vo.haveItemCount);
    }
    private onOkHandler() {
        this._vo.useItem(this._ctl.curVal);
        this.Close();
    }
    private onUpdateHandler() {
        this._ui.tf3.text = this._vo.getDesc(this._ctl.curVal);
    }
    protected onInit(): void {
        let _vo:QuickViewVo = this.Data;
        this._vo = _vo;
        this.itemId = _vo.itemId;
        let cfg: Configs.t_Item_dat = ItemProxy.Ins.getCfg(this.itemId);
        this.itemCfg = cfg;
        let haveItem:ItemVo = MainModel.Ins.getItemVo(cfg.f_itemid);
        ItemViewFactory.refreshSlot(this._ui.slot,haveItem);

        this._ui.nameTf.text = main.itemName(cfg.f_name);

        //使用加速券时，打开默认就是最高可使用的数量，数量够的情况下，就直接默认多少张，如果不够，就显示最多可使用数量
        if(this._vo.sceneType == EUseItemScene.Chest||
            this._vo.sceneType == EUseItemScene.Knowledge
            ){
            //宝箱升级
            let useRefreshTime = _vo.useRefreshTime;
            let needCount:number = Math.ceil((_vo.lvTime -TimeUtil.serverTime)  / useRefreshTime);
            // console.log(`需要的数量needCount: ${needCount}`);
            if(haveItem.count < needCount){
                this._ctl.maxVal = haveItem.count;
                this._ctl.setValue(haveItem.count);
            }else{
                this._ctl.maxVal = needCount;
                this._ctl.setValue(needCount);
            }
            this._ctl.refreshSkin();
        }else{
            this._ctl.maxVal = MainModel.Ins.mRoleData.getVal(this.itemId);
            this._ctl.reset();
        }
    }
}