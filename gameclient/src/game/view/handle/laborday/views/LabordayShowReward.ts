import { RowMoveBaseNode, ScrollPanelControl } from "../../../../../frame/view/ScrollPanelControl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { EquipmentQualityProxy } from "../../main/model/EquipmentProxy";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainModel } from "../../main/model/MainModel";
import { ItemVo } from "../../main/vos/ItemVo";
import { LabourZuoqiTipsVo } from "../../zuoqi/views/ZuoqiTipsShop";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { Mount_ListProxy } from "../../zuoqi/vos/ZuoqiProxy";
import { getModelLaborDay, LabordayBaseModel } from "../model/LabordayBaseModel";
import { EModelLabordayType, LabourConfigQua, t_Labour_Config_item, t_Labour_Config_Rate } from "../model/LabordayProxy";
let keyCls:string = "LabordayNodeSkin";
let nodeKey:string = "LabordayCellItem";
let rowMax:number = 4;
class LaboradyItemShowSkin extends ui.views.laborday.ui_layorday_reward_itemUI{

}

class LabordayCellItem extends ui.views.laborday.ui_layorday_reward_cell_showUI{
    // public _vo:ItemVo;
    // public horseCfg:Configs.t_Mount_List_dat;
    public cfg:Configs.t_Labour_Config_item_dat;
    constructor(){
        super();
        this.on(Laya.Event.CLICK, this, this.onSlotClickHandler);
    }
    private onSlotClickHandler(e:Laya.Event) {
        if(!this.cfg){
            return;
        }
        
        if(this.cfg.f_itemtype == 0){
            e.stopPropagation();
            let _vo = ItemViewFactory.convertItem(this.cfg.f_item);
            MainModel.Ins.showSmallTips(_vo.getName(), _vo.getDesc(), this);
        }else if(this.cfg.f_itemtype == 1){
            //坐骑
            let _tipsVo:LabourZuoqiTipsVo = new LabourZuoqiTipsVo(this.cfg.f_MountTips)
            E.ViewMgr.Open(EViewType.RideBuyTips,null,_tipsVo);
        }
    }
    public reset() {
        this.cfg = null;
    }
}

class LabordayNode extends RowMoveBaseNode{
    protected clsKey:string = keyCls;
    protected createNode (index){
        let _skin:LaboradyItemShowSkin = Laya.Pool.getItemByClass(this.clsKey, LaboradyItemShowSkin);
        let data:LabourConfigQua = this.list[index];
        
        _skin.tf1.text = E.getLang("labordayqua",EquipmentQualityProxy.Ins.getByQua(data.qua).f_EquipmentLevel);
        let rate = t_Labour_Config_Rate.Ins.getRate(data.qua);
        _skin.gailvTf.text = E.getLang("labordayrate")+ parseFloat((rate/100).toFixed(2))+"%";
        while(_skin.con1.numChildren){
            let cell = _skin.con1.getChildAt(0);
            cell.removeSelf();
            Laya.Pool.recover(nodeKey,cell);
        }

        let max:number = rowMax;
        let ox:number = 0;
        let oy:number = 0;
        let height:number = 0;
        for(let i = 0;i < data.cfgList.length;i++){
            let cell:LabordayCellItem = Laya.Pool.getItemByClass(this.clsKey, LabordayCellItem);
            cell.reset();
            let cfg:Configs.t_Labour_Config_item_dat = data.cfgList[i];
            cell.cfg = cfg;
            if(cfg.f_itemtype == 1){
                //坐骑
                let horseCfg:Configs.t_Mount_List_dat = Mount_ListProxy.Ins.getCfg(parseInt(cfg.f_item));
                cell.icon.skin = IconUtils.getHorseIcon(horseCfg.f_MountID);
                cell.tf1.text = "";
                cell.quality.skin = IconUtils.getQuaIcon(horseCfg.f_Quality);
            }else{
                let _itemVo:ItemVo = ItemViewFactory.convertItem(cfg.f_item);
                cell.icon.skin = _itemVo.getIcon();
                cell.tf1.text = _itemVo.count.toString();
                cell.quality.skin = IconUtils.getQuaIcon(cfg.f_itemQua);
                // _itemVo.quaIcon();
            }

            if(cfg.f_GetTimes){
                // data.type == 
                let model:LabordayBaseModel = getModelLaborDay(data.type);
                let hasCount:number = model.getLimitCount(cfg.f_id);
                cell.cntTf.text = E.getLang("xiangliang") + `${hasCount}/${cfg.f_GetTimes}`;
            }else{
                cell.cntTf.text = "不限量";
            }
  
            if(i % max == 0){
                ox = 0;
                oy += cell.height;
            }

            cell.x = ox;
            cell.y = oy - cell.height;

            ox += cell.width;
            height = cell.y+cell.height;
            _skin.con1.addChild(cell);
        }
        _skin.bg1.height =  height + 35;
        _skin.hitArea = new Laya.Rectangle(0,0,_skin.bg1.width,_skin.bg1.height+_skin.bg1.y);
        _skin.y = this.y;
        return _skin;
    }

    public static getHeight(count:number){
        let _skin:LaboradyItemShowSkin = Laya.Pool.getItemByClass(keyCls, LaboradyItemShowSkin);
        let cell:LabordayCellItem = Laya.Pool.getItemByClass(nodeKey, LabordayCellItem);
        return _skin.con1.y + cell.height * Math.ceil(count / rowMax);
    }
}

/**奖励预览 */
export class LabordayShowReward extends ViewBase {
    private _panelCtl: ScrollPanelControl = new ScrollPanelControl();

    protected mMask:boolean = true;
    private _ui:ui.views.laborday.ui_layorday_rewardUI;
    protected onAddLoadRes(): void { }
    protected onExit(): void { }
    protected onFirstInit(): void { 
        if(!this.UI){
            this.UI = this._ui = new ui.views.laborday.ui_layorday_rewardUI();
            this.bindClose(this._ui.close1);
            this._panelCtl.init(this._ui.panel1);
        }
    }
    protected onInit(): void {
        this._panelCtl.clear();
        let type:EModelLabordayType = this.Data;
        let quaList = t_Labour_Config_item.Ins.quaList(type);
        for(let i = 0;i < quaList.length;i++){
            let data = quaList[i];
            let h =  LabordayNode.getHeight(data.cfgList.length);
            this._panelCtl.split([data],LabordayNode,h);
        }
        this._panelCtl.end();
    }
}