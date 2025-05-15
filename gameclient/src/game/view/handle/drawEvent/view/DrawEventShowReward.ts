import { RowMoveBaseNode, ScrollPanelControl } from "../../../../../frame/view/ScrollPanelControl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainModel } from "../../main/model/MainModel";
import { ItemVo } from "../../main/vos/ItemVo";
import { DrawEventModel } from "../model/DrawEventModel";
import { DrawEventRateProxy, DrawEventRewardsProxy } from "../proxy/DrawEventProxy";

let keyCls:string = "DrawEventNodeSkin";
let nodeKey:string = "DrawEventCellItem";
let rowMax:number = 4;
class DrawEventItemShowSkin extends ui.views.drawEvent.ui_DrawEventItem4UI{

}

class DrawEventCellItem extends ui.views.drawEvent.ui_DrawEventItem3UI{
    public cfg:Configs.t_DrawEvent_Rewards_dat;
    constructor(){
        super();
        this.on(Laya.Event.CLICK, this, this.onSlotClickHandler);
    }
    private onSlotClickHandler(e:Laya.Event) {
        if(!this.cfg){
            return;
        }
        e.stopPropagation();
        let _vo = ItemViewFactory.convertItem(this.cfg.f_Rewards);
        MainModel.Ins.showSmallTips(_vo.getName(), _vo.getDesc(), this);
    }
    public reset() {
        this.cfg = null;
    }
}

export class DrawEventConfigQua{
    type:number;
    rate:number;
    cfgList:Configs.t_DrawEvent_Rewards_dat[];
}

class DrawEventNode extends RowMoveBaseNode{
    protected clsKey:string = keyCls;
    protected createNode (index){
        let _skin:DrawEventItemShowSkin = Laya.Pool.getItemByClass(this.clsKey, DrawEventItemShowSkin);
        let data:DrawEventConfigQua = this.list[index];
        
        if(data.type == 1){
            _skin.tf1.text = E.getLang("drawEvent1");
        }else{
            _skin.tf1.text = E.getLang("drawEvent2");
        }
        _skin.gailvTf.text = E.getLang("labordayrate") + parseFloat((data.rate / 100).toFixed(2))+"%";
        
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
            let cell:DrawEventCellItem = Laya.Pool.getItemByClass(this.clsKey, DrawEventCellItem);
            cell.reset();
            let cfg:Configs.t_DrawEvent_Rewards_dat = data.cfgList[i];
            cell.cfg = cfg;
            let _itemVo:ItemVo = ItemViewFactory.convertItem(cfg.f_Rewards);
            cell.icon.skin = _itemVo.getIcon();
            cell.tf1.text = _itemVo.count.toString();
            cell.quality.skin = _itemVo.quaIcon();
            cell.cntTf.text = "";

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
        let _skin:DrawEventItemShowSkin = Laya.Pool.getItemByClass(keyCls, DrawEventItemShowSkin);
        let cell:DrawEventCellItem = Laya.Pool.getItemByClass(nodeKey, DrawEventCellItem);
        return _skin.con1.y + cell.height * Math.ceil(count / rowMax);
    }
}

export class DrawEventShowReward extends ViewBase {
    private _panelCtl: ScrollPanelControl = new ScrollPanelControl();

    protected mMask:boolean = true;
    private _ui:ui.views.laborday.ui_layorday_rewardUI;
    protected onAddLoadRes(): void { }
    protected onExit(): void { }
    protected onFirstInit(): void { 
        if(!this.UI){
            this.UI = this._ui = new ui.views.drawEvent.ui_DrawEventView3UI;
            this.bindClose(this._ui.close1);
            this._panelCtl.init(this._ui.panel1);
        }
    }
    protected onInit(): void {
        this._panelCtl.clear();
        let arr = DrawEventRewardsProxy.Ins.getListByType(DrawEventModel.Ins.type);
        let array = [];
        for(let i:number=1;i<3;i++){
            let vo:DrawEventConfigQua = new DrawEventConfigQua;
            vo.type = i;
            vo.rate = DrawEventRateProxy.Ins.getCfgByType(DrawEventModel.Ins.type,i).f_DrawRate;
            vo.cfgList = [];
            for(let j:number=0;j<arr.length;j++){
                if(arr[j].f_RewardsType == i){
                    vo.cfgList.push(arr[j]);
                }
            }
            array.push(vo);
        }

        for(let i = 0;i < array.length;i++){
            let data = array[i];
            let h =  DrawEventNode.getHeight(data.cfgList.length);
            this._panelCtl.split([data],DrawEventNode,h);
        }
        this._panelCtl.end();
    }
}