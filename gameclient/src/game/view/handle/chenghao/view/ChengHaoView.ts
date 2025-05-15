import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import {StringUtil} from "../../../../../frame/util/StringUtil";
import {TimeUtil} from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { RowMoveBaseNode, ScrollPanelControl } from "../../../../../frame/view/ScrollPanelControl";
import { TabControl } from "../../../../../frame/view/TabControl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { TitleChange_req, TitleRefresh_req, TitleReward_req } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import { t_Txt_Config } from "../../../../static/StaticDataMgr";
import {DotManager} from "../../common/DotManager";
import { TriangleHideCtl } from "../../main/ctl/TriangleHideCtl";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainModel } from "../../main/model/MainModel";
import { AdventureLevelProxy } from "../../main/proxy/AdventureLevelProxy";
import { ItemVo } from "../../main/vos/ItemVo";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { PlayerVoFactory } from "../../main/vos/PlayerVoFactory";
import { ChengHaoModel } from "../model/ChengHaoModel";
import { ChengHaoListProxy, ChengHaoTaskProxy, ChengHaoTaskTypeProxy } from "../proxy/ChengHaoProxy";
import { ChengHaoItem } from "./ChengHaoItem";

class ChengHaoPanLabel extends RowMoveBaseNode{
    protected clsKey:string = "ChengHaoPanLabel";
    protected createNode (index){
        let _skin:ui.views.chenghao.ui_chenghaoItem1UI = Laya.Pool.getItemByClass(this.clsKey,ui.views.chenghao.ui_chenghaoItem1UI);
        let vo = this.list[index];
        _skin.lab1.text = vo.split("|")[0];
        _skin.lab.text = vo.split("|")[1];
        _skin.y = this.y;
        return _skin;
    }
}

class ChengHaoPanItem extends RowMoveBaseNode {
    protected clsKey: string = "ChengHaoPanItem";
    protected createNode(index) {
        let vo = this.list[index];
        let _skin: ChengHaoItem = Laya.Pool.getItemByClass(this.clsKey, ChengHaoItem);
        _skin.setData(vo);
        _skin.y = this.y;
        return _skin;
    }
}

export class ChengHaoView extends ViewBase{
    private _ui:ui.views.chenghao.ui_chenghaoUI;
    protected mMask = true;
    protected mMainSnapshot = true;

    private tabsCtl:TabControl;
    private tabList: any;
    private _panelCtl: ScrollPanelControl = new ScrollPanelControl();
    private rightCtl:TriangleHideCtl;

    private timeCtl:TimeCtl;

    protected onAddLoadRes() {
        this.addAtlas('chenghao.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.chenghao.ui_chenghaoUI;
            this.bindClose(this._ui.btn_close);

            const tabsSkin = [this._ui.tab1,this._ui.tab2];
            this.tabList = ["称号","荣耀"];
            this.tabsCtl  = new TabControl();
            this.tabsCtl.init(tabsSkin, new Laya.Handler(this,this.onTabSelectHandler), new Laya.Handler(this, this.itemTabHandler));

            this._panelCtl.init(this._ui.panel);

            ButtonCtl.Create(this._ui.btn_tip,new Laya.Handler(this,this.onBtnTipClick));
            ButtonCtl.Create(this._ui.btn_pd,new Laya.Handler(this,this.onBtnPDClick));
            ButtonCtl.Create(this._ui.btn_lq,new Laya.Handler(this,this.onBtnLQClick));

            this._ui.list.itemRender = ui.views.chenghao.ui_chenghaoAttrItemUI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);
            this._ui.list1.itemRender = ui.views.chenghao.ui_chenghaoAttrItemUI;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onRenderHandler1);

            this._ui.list3.itemRender = ui.views.chenghao.ui_chenghaoItem2UI;
            this._ui.list3.renderHandler = new Laya.Handler(this,this.onRenderHandler3);

            this._ui.list4.itemRender = ui.views.main.ui_slot_itemUI;
            this._ui.list4.renderHandler = new Laya.Handler(this,this.onRenderHandler4);

            this.timeCtl = new TimeCtl(this._ui.lab_djs);

            let rightCtl = new TriangleHideCtl();
            rightCtl.oneRow = 2;
            this.rightCtl = rightCtl;
            rightCtl.bind(this._ui.list1,this._ui.sj);
        }
    }

    private onRenderHandler(item:ui.views.chenghao.ui_chenghaoAttrItemUI){
        let id = parseInt(item.dataSource.split(":")[0]);
        let val = parseInt(item.dataSource.split(":")[1]);
        item.tf1.text = MainModel.Ins.getAttrNameIdByID(id) + ":";
        item.valTf.text = attrConvert(id,val);
    }

    private onRenderHandler1(item:ui.views.chenghao.ui_chenghaoAttrItemUI){
        let id = parseInt(item.dataSource.split(":")[0]);
        let val = parseInt(item.dataSource.split(":")[1]);
        item.tf1.text = MainModel.Ins.getAttrNameIdByID(id) + ":";
        item.valTf.text = attrConvert(id,val);
    }

    private onBtnTipClick(){
        E.ViewMgr.openHelpView("chenghaoTitle","chenghaoDec");
    }

    private onBtnPDClick(){
        let req:TitleChange_req = new TitleChange_req;
        req.titleId = ChengHaoModel.Ins.selectCh;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onTabSelectHandler(v:number){
       switch(v){
            case 0:
                this._ui.chenghao.visible = true;
                this._ui.rongyao.visible = false;
                break;
            case 1:
                this._ui.chenghao.visible = false;
                this._ui.rongyao.visible = true;
                break;
       }
       this._ui.title.text = this.tabList[v];
    }

    private itemTabHandler(tabSkin, index: number, sel: boolean, data){
        let skin: ui.views.chenghao.ui_tabUI = tabSkin;
        skin.txt.text = this.tabList[index];
        if (sel) {
            skin.img1.visible = false;
            skin.img2.visible = true;
            skin.txt.color = "#A1572F";
        } else {
            skin.img1.visible = true;
            skin.img2.visible = false;
            skin.txt.color = "#e4bb87";
        }
    }

    protected onInit(): void {
        ChengHaoModel.Ins.on(ChengHaoModel.SELECT_CH,this,this.onUpdataSelCH);
        ChengHaoModel.Ins.on(ChengHaoModel.UPDATA_CHENGHAO,this,this.onUpdataCH);
        ChengHaoModel.Ins.on(ChengHaoModel.UPDATA_VIEW,this,this.updataView);
        ChengHaoModel.Ins.on(ChengHaoModel.UPDATA_VIEW_AWARD,this,this.updataRongYaoView);
        this.tabsCtl.selectIndex = 0;
        ChengHaoModel.Ins.selectCh = ChengHaoModel.Ins.titleList[0].titleId;//ChengHaoModel.Ins.wearedTitleId;
         let req:TitleRefresh_req = new TitleRefresh_req;
        SocketMgr.Ins.SendMessageBin(req);
    }

    protected onExit(): void {
        ChengHaoModel.Ins.off(ChengHaoModel.SELECT_CH,this,this.onUpdataSelCH);
        ChengHaoModel.Ins.off(ChengHaoModel.UPDATA_CHENGHAO,this,this.onUpdataCH);
        ChengHaoModel.Ins.off(ChengHaoModel.UPDATA_VIEW,this,this.updataView);
        ChengHaoModel.Ins.off(ChengHaoModel.UPDATA_VIEW_AWARD,this,this.updataRongYaoView);
        this.timeCtl.stop();
    }

    private onUpdataCH(){
        this._ui.lab_pd.visible = true;
        this._ui.btn_pd.visible = false;
        this._ui.img_ch.skin = MainModel.Ins.getTitleImg();
    }

    private onUpdataSelCH(){
        if(ChengHaoModel.Ins.isNewCHRedTip()){
            DotManager.addDot(this._ui.tab1);
        }else{
            DotManager.removeDot(this._ui.tab1);
        }
        let cfg = ChengHaoListProxy.Ins.getCfgByID(ChengHaoModel.Ins.selectCh);
        if(cfg.f_titleAttribute){
            this._ui.list.array = cfg.f_titleAttribute.split("|");
        }else{
            this._ui.list.array = [];
        }
        this._ui.lab_tj.text = cfg.f_titleDec;
        let index = ChengHaoModel.Ins.titleList.findIndex(ele => ele.titleId == ChengHaoModel.Ins.selectCh);
        if(index == -1){
            this._ui.btn_pd.visible = false;
            this._ui.lab_pd.visible = false;
            this.timeCtl.stop();
            this.endTime();
            if(cfg.f_titleduration){
                this._ui.lab_time.text = "获得后有效期" + cfg.f_titleduration + "天";
            }else{
                this._ui.lab_time.text = "";
            }
        }else{
            this._ui.lab_time.text = "";
            if(ChengHaoModel.Ins.selectCh == ChengHaoModel.Ins.wearedTitleId){
                this._ui.lab_pd.visible = true;
                this._ui.btn_pd.visible = false;
            }else{
                this._ui.lab_pd.visible = false;
                this._ui.btn_pd.visible = true;
            }
            if(cfg.f_titleduration){
                let time = ChengHaoModel.Ins.titleList[index].endTime - TimeUtil.serverTime;
                if(time > 0){
                    this.timeCtl.start(time,new Laya.Handler(this,this.onUpdateTime),new Laya.Handler(this,this.endTime));
                }else{
                    this.timeCtl.stop();
                    this.endTime();
                }
            }else{
                this.timeCtl.stop();
                this.endTime();
            }
        }
    }

    private onUpdateTime(){
        let time_str = TimeUtil.subTime(this.timeCtl.tickVal);
        this.timeCtl.setText(time_str + "后消失");
    }

    private endTime(){
        this._ui.lab_djs.text = "";
    }

    private updataView(){
        this.updataChengHaoView();
        this.updataRongYaoView();
    }

    private updataChengHaoView(){
        this.refreshPanel();
        this.onUpdataSelCH();
        this._ui.img_ch.skin = MainModel.Ins.getTitleImg();

        let str = "";
        for(let i:number=0;i<ChengHaoModel.Ins.titleList.length;i++){
            let cfg = ChengHaoListProxy.Ins.getCfgByID(ChengHaoModel.Ins.titleList[i].titleId);
            if(cfg.f_titleAttribute){
                let arr = cfg.f_titleAttribute.split("|");
                for(let j:number=0;j<arr.length;j++){
                    let attArr = arr[j].split("-");
                    str += attArr[0] + ":" + attArr[1] + "|";
                }
            }
        }

        if(str.length > 0){
            str = str.substr(0,str.length -1);
        }
        let array:string[] = PlayerVoFactory.mergeAttr(str);
        this._ui.list1.array = array;
        this._ui.list1.scrollTo(0);
        this.rightCtl.onChangeEvt();
    }

    private refreshPanel(){
        let arr = this.getDataList();

        this._panelCtl.clear();
        for(let i = 0;i < arr.length;i++){
            if(arr[i].lab != ""){
                this._panelCtl.split([arr[i].lab],ChengHaoPanLabel,38);
            }else{
                this._panelCtl.split(arr[i].list,ChengHaoPanItem,82,-10);
            }
        }
        this._panelCtl.end();
    }

    private getDataList(){
        let array = [];
        let arr1 = [];
        let arr2 = [];
        let arr = ChengHaoListProxy.Ins.List;
        for(let i:number=0;i<arr.length;i++){
            let index = ChengHaoModel.Ins.titleList.findIndex(ele => ele.titleId == arr[i].f_titleid);
            if(index != -1){
                arr1.push(arr[i]);
            }else{
                arr2.push(arr[i]);
            }
        }
        let vo:any = {};
        vo.lab = "已获得|(" + arr1.length + "/" + arr.length + ")";
        vo.list = [];
        array.push(vo);
        vo = {};
        vo.lab = "";
        vo.list = arr1;
        array.push(vo);
        vo = {};
        vo.lab = "未获得|(" + arr2.length + "/" + arr.length + ")";
        vo.list = [];
        array.push(vo);
        vo = {};
        vo.lab = "";
        vo.list = arr2;
        array.push(vo);
        return array;
    }
    
    //**********************************************************荣耀***********************************************/
    private onRenderHandler3(item:ui.views.chenghao.ui_chenghaoItem2UI){
        let id = parseInt(item.dataSource.cfg.split("-")[0]);
        let val = parseInt(item.dataSource.cfg.split("-")[1]);
        let cfg = ChengHaoTaskTypeProxy.Ins.getCfgByID(id);
        let str = "";
        if(cfg.f_IsCh == 1){
            str = StringUtil.toChinesNum(val);
        }else if(cfg.f_IsCh == 2){
            str = AdventureLevelProxy.Ins.getAdventureTaskName(val);
        }else{
            str = val.toString();
        }
        item.lab.text = t_Txt_Config.Ins.replace(StringUtil.format(cfg.f_TitleName,str));
        let count;
        if(parseInt(item.dataSource.val) >= val){
            count = val;
        }else{
            count = parseInt(item.dataSource.val);
        }
        item.lab_num.text = count + "/" + val;

        let t = count / val;
        if(t > 1){
            t = 1;
        }
        item.pro.width = t * 527;
    }

    private onRenderHandler4(item:ui.views.main.ui_slot_itemUI){
        let vo = new ItemVo();
        vo.cfgId = parseInt(item.dataSource.split("-")[0]);
        vo.count = parseInt(item.dataSource.split("-")[1]);
        ItemViewFactory.refreshSlot(item,vo);
    }

    private onBtnLQClick(){
        let req:TitleReward_req = new TitleReward_req;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private updataRongYaoView(){
        if(ChengHaoModel.Ins.isNewCHRedTip()){
            DotManager.addDot(this._ui.tab1);
        }else{
            DotManager.removeDot(this._ui.tab1);
        }
        if(ChengHaoModel.Ins.isAwardRedTip()){
            DotManager.addDot(this._ui.tab2);
        }else{
            DotManager.removeDot(this._ui.tab2);
        }
        if(ChengHaoModel.Ins.taskTitleId == 0){
            this._ui.sp_rw.visible = true;
            this._ui.sp_renwu.visible = false;
            let c = ChengHaoTaskProxy.Ins.List[ChengHaoTaskProxy.Ins.List.length - 1];
            let cc = ChengHaoListProxy.Ins.getCfgByID(c.f_titleid);
            if(cc){
                this._ui.img_ch2.skin = "o/title/" + cc.f_titlePic;
            }
        }else{
            this._ui.sp_rw.visible = false;
            this._ui.sp_renwu.visible = true;

            let cfg = ChengHaoTaskProxy.Ins.getCfgByID(ChengHaoModel.Ins.taskTitleId);
            let arr = cfg.f_titlesubtask.split("|");
            let array = [];
            let num = 0;
            for(let i:number=0;i<arr.length;i++){
                let obj:any = {};
                obj.cfg = arr[i];
                obj.val = ChengHaoModel.Ins.vals[i];
                array.push(obj);

                let val = arr[i].split("-")[1];
                if(ChengHaoModel.Ins.vals[i] >= parseInt(val)){
                    num ++;
                }
            }
            this._ui.list3.array = array;

            this._ui.img_st1.visible = this._ui.img_st2.visible = this._ui.img_st3.visible = false;
            for(let i:number=0;i<num;i++){
                this._ui["img_st" + (i + 1)].visible = true;
            }

            this._ui.list4.array = cfg.f_taskrewards.split("|");

            let chcfg = ChengHaoListProxy.Ins.getCfgByID(ChengHaoModel.Ins.taskTitleId);
            this._ui.img_ch1.skin = "o/title/" + chcfg.f_titlePic;
            let tcfg = ChengHaoListProxy.Ins.getCfgByID(cfg.f_titleshow);
            if(tcfg){
                this._ui.img_ch2.skin = "o/title/" + tcfg.f_titlePic;
            }

            if(ChengHaoModel.Ins.state){
                this._ui.btn_lq.disabled = false;
                DotManager.addDot(this._ui.btn_lq);
            }else{
                this._ui.btn_lq.disabled = true;
                DotManager.removeDot(this._ui.btn_lq);
            }
        }
    }
}
