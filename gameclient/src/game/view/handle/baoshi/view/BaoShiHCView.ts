import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { TabControl } from "../../../../../frame/view/TabControl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { GemHandler_req, GemHandler_revc, stGem, stGemItem } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { ItemUpdateCtl } from "../../main/ctl/ItemUpdateCtl";
import { SelectListCtl } from "../../main/ctl/SelectListCtl";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainModel } from "../../main/model/MainModel";
import { EQuickMsg } from "../../main/model/QuickMsgVo";
import { RedEnum } from "../../main/model/RedEnum";
import { RedUpdateModel } from "../../main/model/RedUpdateModel";
import { ECellType } from "../../main/vos/ECellType";
import { ItemVo } from "../../main/vos/ItemVo";
import { XianShiLiBaoModel, XianShiLiBaoType } from "../../xianshilibao/model/XianShiLiBaoModel";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { BaoShiModel } from "../model/BaoShiModel";
import { BaoShiLvProxy, BaoShiSelProxy, BaoShiTransformProxy } from "../proxy/BaoShiProxy";
import { BaoShiItemCtl } from "./ctl/BaoShiItemCtl";
import { BaoShiItem } from "./item/BaoShiItem";

//宝石主界面
export class BaoShiHCView extends ViewBase{
    private _ui:ui.views.baoshi.ui_baoshiHCViewUI;
    protected mMask = true;
    protected autoFree = true;
    private tabsCtl:TabControl;
    private tabList: any;
    public ctl1: SelectListCtl = new SelectListCtl();
    public ctl2: SelectListCtl = new SelectListCtl();
    public ctl3: SelectListCtl = new SelectListCtl();

    private itemCzCtl:BaoShiItemCtl;
    private itemBzCtl:BaoShiItemCtl;
    private itemHcCtl:BaoShiItemCtl;
    private itemHc1Ctl:BaoShiItemCtl;
    private itemHc2Ctl:BaoShiItemCtl;
    private itemHc3Ctl:BaoShiItemCtl;
    private needItems:ItemVo[];
    protected  onAddLoadRes(){
        this.addAtlas('baoshi.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.baoshi.ui_baoshiHCViewUI;
            this.bindClose(this._ui.btn_close);

            const tabsSkin = [this._ui.tab1,this._ui.tab2,this._ui.tab3];
            this.tabList = ["合成","重铸","变质"];
            this.tabsCtl = new TabControl();
            this.tabsCtl.init(tabsSkin, new Laya.Handler(this,this.onTabSelectHandler), new Laya.Handler(this, this.itemTabHandler));
            this.btnList.push(
            ButtonCtl.Create(this._ui.btn_bz,new Laya.Handler(this,this.onBtnBZClick)),
            ButtonCtl.Create(this._ui.btn_cz,new Laya.Handler(this,this.onBtnCZClick)),
            ButtonCtl.Create(this._ui.btn_hc,new Laya.Handler(this,this.onBtnHCClick)),
            ButtonCtl.Create(this._ui.btn_xq,new Laya.Handler(this,this.onBtnXQClick)),
            ButtonCtl.Create(this._ui.btn_dh,new Laya.Handler(this,this.onBtnHDClick))
            )
            let arr = BaoShiModel.Ins.getBaoShiSelArr();
            this.ctl1.init(this._ui.sanjiao1, this._ui.listarea1, this._ui.listcontainer1, this._ui.listtf1,
                ui.views.baoshi.ui_baoshiSelectItemUI, arr[0]);
    
            this.ctl2.init(this._ui.sanjiao2, this._ui.listarea2, this._ui.listcontainer2, this._ui.listtf2,
                ui.views.baoshi.ui_baoshiSelectItemUI, arr[1]);
    
            this.ctl3.init(this._ui.sanjiao3, this._ui.listarea3, this._ui.listcontainer3, this._ui.listtf3,
                ui.views.baoshi.ui_baoshiSelectItemUI, arr[2]);

            this.ctl1.selectHandler = new Laya.Handler(this,this.onSelectHandler);
            this.ctl2.selectHandler = new Laya.Handler(this,this.onSelectHandler);
            this.ctl3.selectHandler = new Laya.Handler(this,this.onSelectHandler);

            this._ui.list.itemRender = BaoShiItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onItemRender);
            this._ui.list.selectEnable = true;
            this._ui.list.selectHandler = new Laya.Handler(this,this.onListSelectHandler);

            this.itemCzCtl = new BaoShiItemCtl(this._ui.item_cz);
            this.itemBzCtl = new BaoShiItemCtl(this._ui.item_bz);
            this.itemHcCtl = new BaoShiItemCtl(this._ui.item_hc);
            this.itemHc1Ctl = new BaoShiItemCtl(this._ui.item_hc1);
            this.itemHc2Ctl = new BaoShiItemCtl(this._ui.item_hc2);
            this.itemHc3Ctl = new BaoShiItemCtl(this._ui.item_hc3);

            ItemUpdateCtl.Create(this._ui.juanzhoutf,ECellType.GemPiece);
            ItemUpdateCtl.Create(this._ui.goldtf,ECellType.GOLD);
            this._ui.juanzhouicon.skin = IconUtils.getIconByCfgId(ECellType.GemPiece);
        }
    }

    protected onInit(){
        BaoShiModel.Ins.on(BaoShiModel.BAOSHI_HC,this,this.onUpdataView);
        this.setAuto(false);
        this.ctl1.selectIndex(0);
        this.ctl2.selectIndex(0);
        this.ctl3.selectIndex(0);
        this.tabsCtl.selectIndex = 0;
    }

    protected onExit(){
        BaoShiModel.Ins.off(BaoShiModel.BAOSHI_HC,this,this.onUpdataView);
        this.setBZView();
        this.setCZView();
        this.setHCView();
        if(this._isAuto){
            this.setAuto(false);
            E.ViewMgr.ShowMidError("自动合成已关闭");//显示错误提示
        }
    }

    //自动合成
    private _isAuto:boolean;
    private onBtnHDClick(){
        if(this._isAuto){
            this.setAuto(false);
            E.ViewMgr.ShowMidError("自动合成已关闭");//显示错误提示
            return;
        }
        E.ViewMgr.Open(EViewType.BaoShiAutoHCView);
    }

    public setAuto(bo:boolean){
        this._isAuto = bo;
        if(this._isAuto){
            this.sendCmd();
        }else{
            Laya.timer.clear(this,this.sendCmd);
        }
    }

    private sendCmd(){
        let arr = this.getHCArr();
        if(arr.length){
            this.setHc(arr,false);
            if(this._hcData1 && this._hcData2 && this._hcData3){
                let req:GemHandler_req = new GemHandler_req;
                req.type = 1;
                req.uids = [this._hcData1.uid,this._hcData2.uid,this._hcData3.uid];
                SocketMgr.Ins.SendMessageBin(req);
            }
        }else{
            this.setAuto(false);
            E.ViewMgr.ShowMidError("没有可自动合成的宝石");//显示错误提示
        }
    }

    //一键放入
    private onBtnXQClick(){
        if(this._isAuto){
            this.setAuto(false);
            E.ViewMgr.ShowMidError("自动合成已关闭");//显示错误提示
            return;
        }
        let arr = this.getHCArr(false);
        if(arr.length){
            this.setHc(arr,true);
        }else{
            E.ViewMgr.ShowMidError("没有可一键放入的宝石");//显示错误提示
        }
    }

    private setHc(arr,flag:boolean){
        this._hcData1 = arr[0];
        this._hcData2 = arr[1];
        this._hcData3 = arr[2];
        this.setHCView(false,null,flag);
        for(let i:number=0;i<this._ui.list.array.length;i++){
            if(this._ui.list.array[i].data.uid.toNumber() == this._hcData1.uid.toNumber() || 
                this._ui.list.array[i].data.uid.toNumber() == this._hcData2.uid.toNumber() ||
                this._ui.list.array[i].data.uid.toNumber() == this._hcData3.uid.toNumber()){
                    this._ui.list.array[i].isSelect = true;
            }else{
                this._ui.list.array[i].isSelect = false;
            }
        }
        this._ui.list.refresh();
    }

    private getHCArr(flag:boolean = true){
        if(!this._ui.list.array)return;
        let arr = BaoShiModel.Ins.getBagListBy(this.ctl1.curIndex,
            this.ctl2.curIndex,this.ctl3.curIndex);

        let fid;
        let vo = RedUpdateModel.Ins.getByID(RedEnum.BaoShiAutoHC);
        if (vo) {
            fid = vo.type;
        } else {
            fid = 1;
        }
        let lv = BaoShiSelProxy.Ins.GetDataById(fid).f_gemselect;
        let array = [];
        let map = [];
        for(let i:number = 0; i<arr.length;i++){
            if(flag){
                if(arr[i].level > lv){
                    continue;
                }
            }
            if(!map[arr[i].level]){
                map[arr[i].level] = [];
            }
            map[arr[i].level].push(arr[i]);
        }
        let maxLv = BaoShiLvProxy.Ins.maxLv;
        for(let i:number = maxLv - 1 ;i > 0;i--){
            if(map[i] && map[i].length >= 3){
                array.push(map[i][0]);
                array.push(map[i][1]);
                array.push(map[i][2]);
                break;
            }
        }
        return array;
    }

    //合成
    private onBtnHCClick(){
        if(this._isAuto){
            this.setAuto(false);
            E.ViewMgr.ShowMidError("自动合成已关闭");//显示错误提示
            return;
        }
        if(this._hcData1 && this._hcData2 && this._hcData3){
            let req:GemHandler_req = new GemHandler_req;
            req.type = 1;
            req.uids = [this._hcData1.uid,this._hcData2.uid,this._hcData3.uid];
            SocketMgr.Ins.SendMessageBin(req);
            XianShiLiBaoModel.Ins.sendCmd(XianShiLiBaoType.Gem);
        }
    }

    //重铸
    private onBtnCZClick(){
        if(this._czData){
            // let cfg = BaoShiTransformProxy.Ins.getCfgByLv(this._czData.level);
            // parseInt(cfg.f_Price.split("-")[1])
            // MainModel.Ins.queryMsg("进行重铸", this.needItem.cfgId,this.needItem.count , 
            //     EQuickMsg.BaoShiCZ, new Laya.Handler(this, this.onBtnCZHandler));
            let arr = this.needItems.map(o => ({ moneyCfgId: o.cfgId, moneyVal: o.count }));
            MainModel.Ins.queryMsgs("进行重铸", arr , 
                EQuickMsg.BaoShiCZ, new Laya.Handler(this, this.onBtnCZHandler));
        }
    }

    private onBtnCZHandler(){
        let req:GemHandler_req = new GemHandler_req;
        req.type = 2;
        //req.itemId = this.needItem.cfgId;
        req.uids = [this._czData.uid];
        req.items = this.needItems.map(item => {
            const o = new stGemItem();
            o.itemId = item.cfgId;
            o.num = item.count;
            return o;
        });
        SocketMgr.Ins.SendMessageBin(req);
    }

    //变质
    private onBtnBZClick(){
        if(this._bzData){
            let cfg = BaoShiTransformProxy.Ins.getCfgByLv(this._bzData.level);
            // MainModel.Ins.queryMsg("进行变质", /*ECellType.GOLD, parseInt(cfg.f_Price.split("-")[1])*/this.needItem.cfgId,this.needItem.count, 
            //     EQuickMsg.BaoShiBZ, new Laya.Handler(this, this.onBtnBZHandler));
            let arr = this.needItems.map(o => ({ moneyCfgId: o.cfgId, moneyVal: o.count }));
            MainModel.Ins.queryMsgs("进行变质", arr, 
                EQuickMsg.BaoShiBZ, new Laya.Handler(this, this.onBtnBZHandler));
        }
    }

    private onBtnBZHandler(){
        let req:GemHandler_req = new GemHandler_req;
        req.type = 3;
        //req.itemId = this.needItem.cfgId;
        req.items = this.needItems.map(item => {
            const o = new stGemItem();
            o.itemId = item.cfgId;
            o.num = item.count;
            return o;
        });
        req.uids = [this._bzData.uid];
        SocketMgr.Ins.SendMessageBin(req);
    }

    //合成宝石返回
    private onUpdataView(value:GemHandler_revc){
        if(value.type == 1){
            this.setHCView(true,value.handlerAfter);
            let arr = BaoShiModel.Ins.getBagListBy(this.ctl1.curIndex,
                this.ctl2.curIndex,this.ctl3.curIndex);
            let array = [];
            for(let i:number=0;i<arr.length;i++){
                array.push({data:arr[i],isSelect:false});
            }
            this._ui.list.array = array;
            E.ViewMgr.ShowMidOk("合成成功");
            if(this._isAuto){
                Laya.timer.once(1500,this,this.sendCmd);
            }
        }else if(value.type == 2){
            this.setCZView(value.handlerAfter);
            let index = this._ui.list.array.findIndex(ele => ele.data.uid.toNumber() == value.handlerAfter.uid.toNumber());
            this._ui.list.array[index].data = value.handlerAfter;
            this._ui.list.refresh();
            E.ViewMgr.ShowMidOk("重铸成功");
        }else if(value.type == 3){
            this.setBZView(value.handlerAfter);
            let index = this._ui.list.array.findIndex(ele => ele.data.uid.toNumber() == value.handlerAfter.uid.toNumber());
            this._ui.list.array[index].data = value.handlerAfter;
            this._ui.list.refresh();
            E.ViewMgr.ShowMidOk("变质成功");
        }
        this.updateUseItem();
    }

    //设置重铸
    private _czData:stGem;
    private setCZView(value:stGem = null){
        if(value){
            this._czData = value;
            this.itemCzCtl.setData(value,false,true,true,false);
        }else{
            this._czData = null;
            this.itemCzCtl.setDataNull();
        }
        this.setCZBtn();
    }

    //设置变质
    private _bzData:stGem;
    private setBZView(value:stGem = null){
        if(value){
            this._bzData = value;
            this.itemBzCtl.setData(value,false,true,true,false);
        }else{
            this._bzData = null;
            this.itemBzCtl.setDataNull();
        }
        this.setBZBtn();
    }

    //设置合成
    private _hcData:stGem;
    private _hcData1:stGem;
    private _hcData2:stGem;
    private _hcData3:stGem;
    private setHCView(flag:boolean = true,data:stGem = null,bo:boolean = true){
        if(flag){
            this._hcData1 = this._hcData2 = this._hcData3 = null;
        }
        if(data && data.id){
            this.itemHcCtl.setData(data,false,true,true,false);
        }else{
            this.itemHcCtl.setDataNull();
        }
        if(this._hcData1){
            this.itemHc1Ctl.setData(this._hcData1,false,true,true,false);
        }else{
            this.itemHc1Ctl.setDataNull();
        }
        if(this._hcData2){
            this.itemHc2Ctl.setData(this._hcData2,false,true,true,false);
        }else{
            this.itemHc2Ctl.setDataNull();
        }
        if(this._hcData3){
            this.itemHc3Ctl.setData(this._hcData3,false,true,true,false);
        }else{
            this.itemHc3Ctl.setDataNull();
        }
        this.setHCBtn(bo);
    }

    //list选择
    private onListSelectHandler(index:number){
        if(index == -1){return};
        if(this.tabsCtl.selectIndex == 0){
            let maxLv = BaoShiLvProxy.Ins.maxLv;
            if(this._ui.list.array[index].data.level >= maxLv){
                return;
            }
            if(this._hcData1 && this._hcData1.uid.toNumber() == this._ui.list.array[index].data.uid.toNumber()){
                this._hcData1 = null;
                this.setHCView(false);
                this._ui.list.array[index].isSelect = !this._ui.list.array[index].isSelect;
                this._ui.list.refresh();
                this._ui.list.selectedIndex = -1;
                return;
            }
            if(this._hcData2 && this._hcData2.uid.toNumber() == this._ui.list.array[index].data.uid.toNumber()){
                this._hcData2 = null;
                this.setHCView(false);
                this._ui.list.array[index].isSelect = !this._ui.list.array[index].isSelect;
                this._ui.list.refresh();
                this._ui.list.selectedIndex = -1;
                return;
            }
            if(this._hcData3 && this._hcData3.uid.toNumber() == this._ui.list.array[index].data.uid.toNumber()){
                this._hcData3 = null;
                this.setHCView(false);
                this._ui.list.array[index].isSelect = !this._ui.list.array[index].isSelect;
                this._ui.list.refresh();
                this._ui.list.selectedIndex = -1;
                return;
            }

            if(this._hcData1 && this._hcData2 && this._hcData3){
               return;
            }

            let lv:number = 0;
            if(this._hcData1){
                lv = this._hcData1.level;
            }
            if(this._hcData2){
                lv = this._hcData2.level;
            }
            if(this._hcData3){
                lv = this._hcData3.level;
            }

            if(lv == 0 || this._ui.list.array[index].data.level == lv){
                if(!this._hcData1){
                    this._hcData1 = this._ui.list.array[index].data;
                    this.setHCView(false);
                    this._ui.list.array[index].isSelect = !this._ui.list.array[index].isSelect;
                    this._ui.list.refresh();
                    this._ui.list.selectedIndex = -1;
                    return;
                }
                if(!this._hcData2){
                    this._hcData2 = this._ui.list.array[index].data;
                    this.setHCView(false);
                    this._ui.list.array[index].isSelect = !this._ui.list.array[index].isSelect;
                    this._ui.list.refresh();
                    this._ui.list.selectedIndex = -1;
                    return;
                }
                if(!this._hcData3){
                    this._hcData3 = this._ui.list.array[index].data;
                    this.setHCView(false);
                    this._ui.list.array[index].isSelect = !this._ui.list.array[index].isSelect;
                    this._ui.list.refresh();
                    this._ui.list.selectedIndex = -1;
                    return;
                }
            }else{
                E.ViewMgr.ShowMidError("请放置相同等级宝石");//显示错误提示
                this._ui.list.selectedIndex = -1;
                return;
            }
        }else if(this.tabsCtl.selectIndex == 1){
            //重铸
            if(this._ui.list.array[index].data.level < 4){
                E.ViewMgr.ShowMidError("需要4级才可重铸");//显示错误提示
                this._ui.list.selectedIndex = -1;
                return;
            }
            if(this._czData){
                if(this._czData == this._ui.list.array[index].data){
                    this.setCZView();
                }else{
                    this._ui.list.selectedIndex = -1;
                    return;
                }
            }else{
                this.setCZView(this._ui.list.array[index].data);
            }
            let cfg = BaoShiTransformProxy.Ins.getCfgByLv(this._ui.list.array[index].data.level);
            
            this._ui.lab_money.text = cfg.f_Price.split("-")[1];
        }else if(this.tabsCtl.selectIndex == 2){
            //变质
            if(this._ui.list.array[index].data.level < 4){
                E.ViewMgr.ShowMidError("需要4级才可变质");//显示错误提示
                this._ui.list.selectedIndex = -1;
                return;
            }
            if(this._bzData){
                if(this._bzData == this._ui.list.array[index].data){
                    this.setBZView();
                }else{
                    this._ui.list.selectedIndex = -1;
                    return;
                }
            }else{
                this.setBZView(this._ui.list.array[index].data);
            }
            let cfg = BaoShiTransformProxy.Ins.getCfgByLv(this._ui.list.array[index].data.level);
            this._ui.lab_money.text = cfg.f_Price.split("-")[1];
        }
        this.updateUseItem()

        this._ui.list.array[index].isSelect = !this._ui.list.array[index].isSelect;
        this._ui.list.refresh();
        this._ui.list.selectedIndex = -1;
    }

    private updateUseItem(){
        this._ui.zhekouImg.visible = false;
        if (this._ui.img_money4.visible) {
            if (this.tabsCtl.selectIndex == 1 || this.tabsCtl.selectIndex == 2) {
                // let _selIndex:number = this._ui.list.selectedIndex;
                // if(_selIndex == -1){
                //     return;
                // }
                // this._ui.list.array[_selIndex].data.level
                let _lv:number;
                if(this._bzData){
                    _lv = this._bzData.level;
                }else if(this._czData){
                    _lv = this._czData.level;
                }else{
                    return;
                }
                let cfg = BaoShiTransformProxy.Ins.getCfgByLv(_lv);

                //let isEnough = MainModel.Ins.isItemEnoughSt(cfg.f_gempiece);
                let needItems:ItemVo[] = [];
                // 优先道具
                const [itemId1, itemCount1] = cfg.f_gempiece.split('-').map(Number);
                // 货币
                const [itemId2] = cfg.f_Price.split('-').map(Number);
                const itemCount11 = MainModel.Ins.getItemVo(itemId1).count;
                if (itemCount11 >= itemCount1) {
                    // 优先道具够用
                    needItems = [ItemViewFactory.convertItem(cfg.f_gempiece)];
                } else {
                    // 优先道具数量不够
                    if (itemCount11) {
                        needItems = [ItemViewFactory.convertItem(`${itemId1}-${itemCount11}`)];
                    }
                    // 道具 * 1 = 货币 * 100
                    const needItem = ItemViewFactory.convertItem(`${itemId2}-${(itemCount1 - itemCount11) * 100}`);
                    if(MainModel.Ins.isGemOpen){
                        let f_Discount = cfg.f_Discount / 10000;
                        if (f_Discount < 1) {
                            //let cfg:Configs.t_Gem_Transform_dat = BaoShiTransformProxy.Ins.getCfgByLv(this._czData.level);
                            let price = needItem.count;
                            this._ui.zhekouImg.visible = true;
                            this._ui.oldGoldTf.text = E.getLang("oldprice") + price;
                            let a = (cfg.f_Discount / 1000).toFixed(0);
                            this._ui.zhekouTf.text = E.getLang("limitdiscount", a);
                            needItem.count = price * f_Discount;
                            // this._ui.lab_money.text = price * f_Discount + "";
                        }
                    }
                    needItems.push(needItem);
                }
                const arr = [
                    { img: this._ui.img_money4, tf: this._ui.lab_money },
                    { img: this._ui.img_money05, tf: this._ui.lab_money05 },
                ];
                for (let i = 0; i < arr.length; i++) {
                    const item = arr[i];
                    const img = item.img;
                    const tf = item.tf;
                    if (needItems[i]) {
                        tf.text = needItems[i].count + "";
                        img.skin = needItems[i].getIcon();
                        tf.visible = true;
                        img.visible = true;
                    } else {
                        tf.visible = false;
                        img.visible = false;
                    }
                }

                this.needItems = needItems;
            }
        }
    }

    private onItemRender(item:BaoShiItem){
        item.ctl.setData(item.dataSource.data,false,false,true,item.dataSource.isSelect);
    }

    private onSelectHandler(){
        Laya.timer.callLater(this,this.selectHandler);
    }

    //宝石选择
    private selectHandler(){
        this._ui.zhekouImg.visible = false;
        if(this._isAuto){
            this.setAuto(false);
            E.ViewMgr.ShowMidError("自动合成已关闭");//显示错误提示
        }
        let arr = BaoShiModel.Ins.getBagListBy(this.ctl1.curIndex,
            this.ctl2.curIndex,this.ctl3.curIndex);
        let array = [];
        for(let i:number=0;i<arr.length;i++){
            array.push({data:arr[i],isSelect:false});
        }
        this._ui.list.array = array;

        if(this.tabsCtl.selectIndex == 0){
            this.setHCView();
        }else if(this.tabsCtl.selectIndex == 1){
            this.setCZView();
        }else if(this.tabsCtl.selectIndex == 2){
            this.setBZView();
        }
    }

    private setHCBtn(flag:boolean = true){
        // 
        if(flag){
            this._ui.img_money4.visible = this._ui.lab_money.visible = false;
            this._ui.img_money05.visible = this._ui.lab_money05.visible = false;
            if(this._hcData1 && this._hcData2 && this._hcData3){
                this._ui.btn_hc.disabled = false;
            }else{
                this._ui.btn_hc.disabled = true;
            }
        }
    }

    private setCZBtn(){
        if(this._czData){
            this._ui.img_money4.visible = this._ui.lab_money.visible = true;
            this._ui.img_money05.visible = this._ui.lab_money05.visible = true;
            this._ui.btn_cz.disabled = false;
        }else{
            this._ui.img_money4.visible = this._ui.lab_money.visible = false;
            this._ui.img_money05.visible = this._ui.lab_money05.visible = false;
            this._ui.btn_cz.disabled = true;
        }
    }

    private setBZBtn(){
        if(this._bzData){
            this._ui.img_money4.visible = this._ui.lab_money.visible = true;
            this._ui.img_money05.visible = this._ui.lab_money05.visible = true;
            this._ui.btn_bz.disabled = false;
        }else{
            this._ui.img_money4.visible = this._ui.lab_money.visible = false;
            this._ui.img_money05.visible = this._ui.lab_money05.visible = false;
            this._ui.btn_bz.disabled = true;
        }
    }

    //tab选择
    private onTabSelectHandler(v:number){
        this._ui.zhekouImg.visible = false;
        switch(v){
            case 0:
                this._ui.box_hc.visible = true;
                this._ui.box_cz.visible = false;
                this._ui.box_bz.visible = false;
                this.setHCView();
                break;
            case 1:
                this._ui.box_hc.visible = false;
                this._ui.box_cz.visible = true;
                this._ui.box_bz.visible = false;
                this.setCZView();
                break;
            case 2:
                this._ui.box_hc.visible = false;
                this._ui.box_cz.visible = false;
                this._ui.box_bz.visible = true;
                this.setBZView();
                break;
       }
       if(this._ui.list.array){
            for(let i:number=0;i<this._ui.list.array.length;i++){
                this._ui.list.array[i].isSelect = false;
            }
            this._ui.list.refresh();
       }
       if(this._isAuto){
            this.setAuto(false);
            E.ViewMgr.ShowMidError("自动合成已关闭");//显示错误提示
        }
    }

    private itemTabHandler(tabSkin, index: number, sel: boolean, data){
        let skin: ui.views.baoshi.ui_tabUI = tabSkin;
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
    
}