import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { TabCommonCtl } from "../../../../../frame/view/TabCommonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { PlatformConfig } from "../../../../../InitConfig";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { SpiritQuickWear_req, stEquipAttr } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import { TriangleHideCtl } from "../../main/ctl/TriangleHideCtl";
import { MainModel } from "../../main/model/MainModel";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { NewAdventureModel } from "../../maoxian2/NewAdventureModel";
import { SoulEvent } from "../model/SoulEvent";
import { SoulModel } from "../model/SoulModel";
import { t_Spirit_Position } from "../model/SoulProxy";
import { SoulVo } from "../model/SoulVo";
import { SoulIconItem } from "./SoulIconItem";
import { SoulSuitView } from "./SoulSuitView";
import { SoulTopItemCtl } from "./SoulTopItemCtl";
import { IAttrSkin } from "./SoulUpgradeView";

export class SoulMainView extends ViewBase {
    private _tabCtl:TabCommonCtl = new TabCommonCtl();
    private _ui: ui.views.soul.ui_soul_viewUI;
    private rightCtl:TriangleHideCtl;
    protected mMask:boolean = true;
    protected onAddLoadRes(): void {
        this.addAtlas("soul.atlas");
        if(initConfig.platform == PlatformConfig.War3){
            this.addAtlas("wowhuanzhuang.atlas");
        }
    }
    protected autoFree = true;
    private onekeyCtl:ButtonCtl;
    private uploadCtl:ButtonCtl;
    private topItemlist:SoulTopItemCtl[];
    protected onExit(): void { 
        SoulModel.Ins.off(SoulEvent.UpdateData,this,this.onUpdateDataView);
        // MainModel.Ins.mainMask = false;
        this.rightCtl.dispose();
    }
    protected onFirstInit(): void {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.soul.ui_soul_viewUI();
            this.bindClose(this._ui.close1);
            this._tabCtl.init(ui.views.soul.ui_soul_tab_itemUI,
                this._ui.tabCon,'ui_soul_tab_itemUI',this,this.onSelectHandler,this.itemTabHandler);
        
            this.onekeyCtl = ButtonCtl.CreateBtn(this._ui.yijianzhuanbei,this,this.onOneKey);
            this.uploadCtl = ButtonCtl.CreateBtn(this._ui.yijianxiexia,this,this.onUpload);
            this.btnList.push(this.onekeyCtl,this.uploadCtl);

            let itemlist:SoulTopItemCtl[] = [];
            for(let i = 0;i < 4;i++){
                itemlist.push(new SoulTopItemCtl(this._ui['item'+i],i+1));
            }
            this.topItemlist = itemlist;

            this._ui.list4.itemRender = SoulIconItem;
            this._ui.list4.renderHandler = new Laya.Handler(this,this.onSoulItemHandler);

            this._ui.list1.itemRender = ui.views.soul.ui_soul_attr_itemUI;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onRenderAttrHandler);

            this._ui.list2.itemRender = ui.views.soul.ui_soul_attr_itemUI;
            this._ui.list2.renderHandler = new Laya.Handler(this,this.onRenderAttrHandler);
        
            this._ui.list3.itemRender = SoulSuitView;
            this._ui.list3.renderHandler = new Laya.Handler(this,this.onSuitRender);
            
            let rightCtl = new TriangleHideCtl();
            this.rightCtl = rightCtl;
            rightCtl.bind(this._ui.list2,this._ui.downIcon);
        }
    }

    private onSuitRender(item:SoulSuitView){
        item.refreshView();
    }
    private onRenderAttrHandler(skin:IAttrSkin){
        let cell:stEquipAttr = skin.dataSource;
        skin.attrtf.text = MainModel.Ins.getAttrNameIdByID(cell.id);
        skin.valtf.text = attrConvert(cell.id,cell.value);
        DebugUtil.draw(skin);
    }

    private onSoulItemHandler(cell:SoulIconItem,index:number){
        cell.refreshView(index);
    }

    /**
     * 一键穿戴
     */
    private onOneKey(){
        let req = new SpiritQuickWear_req();
        req.type = 1;
        SocketMgr.Ins.SendMessageBin(req);
    }

    /**一键卸下 */
    private onUpload(){
        if(SoulModel.Ins.isPackageFullCanUpload()){
            E.ViewMgr.ShowMidLabel(E.getLang("saodanFull"));
            return;
        }

        let req = new SpiritQuickWear_req();
        req.type = 0;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private itemTabHandler(tabSkin:ui.views.soul.ui_soul_tab_itemUI,index:number,sel:boolean,data:Configs.t_Spirit_Position_dat){
        tabSkin.tf1.text = data.f_PositionName;
        if(sel){
            tabSkin.tf1.color = `#90501F`;
            tabSkin.bg1.visible = true;
            tabSkin.bg2.visible = false;

        }else{
            tabSkin.tf1.color = `#FCEABE`;
            tabSkin.bg1.visible = false;
            tabSkin.bg2.visible = true;
        }
    }

    private updateSelectView(){
        let cfg:Configs.t_Spirit_Position_dat = t_Spirit_Position.Ins.List[this._tabCtl.selectIndex];
        let dataList = SoulModel.Ins.getListByPos(cfg.f_Position);
        let max = NewAdventureModel.Ins.cleanUpVo.storageMax;
        let sub = max - dataList.length;
        for(let i = 0;i < sub;i++){
            let empty:SoulVo = new SoulVo();
            empty.isEmpty = true;
            dataList.push(empty);
        }
        this._ui.list4.array = dataList;
    }

    private onSelectHandler(index:number){
        this._ui.countTf.visible = index == 0;
        this.updateSelectView();
        this._ui.list4.scrollTo(0);
    }

    private updateView(){
        /**top */
        for(let i = 0;i < this.topItemlist.length;i++){
            this.topItemlist[i].refreshView();
        }

        this.updateSelectView();
        this._ui.countTf.text = `${SoulModel.Ins.getNotExcludeWears().length}/${NewAdventureModel.Ins.cleanUpVo.storageMax}`;

        this._ui.list1.array = SoulModel.Ins.getAllBaseAttr();

        let randomList = SoulModel.Ins.getAllRandomAttr();
        this._ui.list2.array = randomList;
        this._ui.list2.scrollTo(0);
        this.rightCtl.onChangeEvt();

        let dataList =  SoulModel.Ins.getWeardIds();
        this._ui.list3.array = dataList;
        this._ui.list3.scrollTo(0);

        if(dataList.length > 0){
            this._ui.midcon.visible = true;
            this._ui.botcon.y = 750;
            this._ui.list4.height = 209;
            this._ui.bg11.height = 304;
            if(this._ui['bg12']){
                this._ui['bg12'].height = 305;
            }
        }else{
            this._ui.midcon.visible = false;
            this._ui.botcon.y = 465;
            this._ui.list4.height = 489;
            this._ui.bg11.height = 593;
            if(this._ui['bg12']){
                this._ui['bg12'].height = 601;
            }
        }
    }
    protected mMainSnapshot = true;
    protected onInit(): void { 
        // MainModel.Ins.mainMask = true;
        SoulModel.Ins.on(SoulEvent.UpdateData,this,this.onUpdateDataView);
        this._tabCtl.refresh(t_Spirit_Position.Ins.List,0);
        this.updateView();
    }
    private onUpdateDataView(){
        this.updateView();
    }
}