import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { E } from "../../../../../G";
import { stChief, stItem, stSkin } from "../../../../../network/protocols/BaseProto";
import { AvatarFactory } from "../../../avatar/AvatarFactory";
import { AvatarMonsterView } from "../../../avatar/AvatarMonsterView";
import { EAvatarDir } from "../../../avatar/AvatarView";
import { EAvatarAnim } from "../../../avatar/vos/EAvatarAnim";
import {DotManager} from "../../../common/DotManager";
import { HuYouModel } from "../../../huyou/model/HuYouModel";
import { HuYouQualityProxy, HuYouSlotProxy } from "../../../huyou/proxy/HuYouProxy";
import { HuYouQuickBtn1 } from "../../../huyou/view/HuYouView";
import { ValCtl } from "../../../main/ctl/ValLisCtl";
import { MainModel } from "../../../main/model/MainModel";
import { ItemProxy } from "../../../main/proxy/ItemProxy";
import { GridItemCtl } from "../../../main/views/grid/GridItemCtl";
import { GridItemView } from "../../../main/views/grid/GridItemView";
import { GridItemVo } from "../../../main/views/grid/GridItemVo";
import { ECellType } from "../../../main/vos/ECellType";
import { FuJiangModel } from "../../model/FuJiangModel";
import { FuJiangFYSlotProxy } from "../../proxy/FuJiangProxy";
import { FuJiangSelCtl } from "./FuJiangSelCtl";

export class FuJiangViewCtl5{
    protected _ui:ui.views.fujiang.ui_fujiangView5UI;

    private _selCtl:FuJiangSelCtl;
    private btnlist:HuYouQuickBtn1[] = [];
    private curIndex:number;

    private _item1:GridItemCtl;
    private _item2:GridItemCtl;
    private _item3:GridItemCtl;
    private _item4:GridItemCtl;
    private _item5:GridItemCtl;
    private _item6:GridItemCtl;
    private _item7:GridItemCtl;
    private _item8:GridItemCtl;

    private _avatar:AvatarMonsterView;

    constructor(skin:ui.views.fujiang.ui_fujiangView5UI) {
        this._ui = skin;

        this._ui.on(Laya.Event.DISPLAY,this,this.onAdd);
        this._ui.on(Laya.Event.UNDISPLAY,this,this.onRemove);

        ValCtl.Create(this._ui.lab2,this._ui.img2,ECellType.DaoQi);
        ButtonCtl.Create(this._ui.btn_l,new Laya.Handler(this,this.onBtnLClick));
        ButtonCtl.Create(this._ui.btn_r,new Laya.Handler(this,this.onBtnRClick));
        ButtonCtl.Create(this._ui.btn_attr,new Laya.Handler(this,this.onBtnAttrClick));
        ButtonCtl.Create(this._ui.btn_qf,new Laya.Handler(this,this.onBtnQFClick));
        this.initSelectUI();
        this._selCtl = new FuJiangSelCtl(this._ui.view);
        for(let i:number = 1;i<9;i++){
            this["_item" + i] = new GridItemCtl(this._ui["item" + i]);
            this._ui["txt_suo" + i].x = this._ui["txt_suo" + i].x - 25;
        }

        this._ui.list1.itemRender = GridItemView;
        this._ui.list1.renderHandler = new Laya.Handler(this,this.itemRender1);
    }

    private itemRender1(item:GridItemView){
        item.ctl.setBagData(item.dataSource,true,true,true,this._data.cheifId);
    }

    private initSelectUI(){
        let size = 5;
        let cnt = HuYouQualityProxy.Ins.getListByType(1).length + 1;
        let cellHeight = 0;
        for(let i = cnt-1;i >= 0;i--){
            let _item:HuYouQuickBtn1 = new HuYouQuickBtn1();
            _item.y = (cnt-i - 1) * _item.height + size;
            _item.x = size;
            this._ui.listcontainer.addChild(_item);
            cellHeight = _item.height;
            let cfg:any;
            if(i == cnt-1){
                cfg = {};
                cfg.f_QualityID = 0;
                cfg.f_SoulQualityName = "全部";
                cfg.f_Color = "ffeec2";
            }else{
                cfg = HuYouQualityProxy.Ins.GetDataById(i+1);
            }
            _item.cfg = cfg;
            this.updateCell(_item.tf,cfg);
            _item.btn.clickHandler = new Laya.Handler(this,this.onItemClickHandler,[cfg,cnt - i - 1]);
            this.btnlist.push(_item);
        }

        this.curIndex = this.btnlist.length - 1;
        this._ui.listcontainer.height = cnt * cellHeight + size * 2;
        this._ui.listcontainer.y = this._ui.listarea.y - this._ui.listcontainer.height;

        this._ui.listarea.on(Laya.Event.CLICK,this,this.onAreaHander);
    }

    private updateCell(label:Laya.Label,cfg:any){
        label.text = cfg.f_SoulQualityName;
        label.color = `#${cfg.f_Color}`;
    }

    private onItemClickHandler( cfg:any,_index:number){
        this._ui.listcontainer.visible = false;
        this.selectIndex(_index);
    }

    private selectIndex(index:number){
        this.curIndex = index;
        this.updateCell(this._ui.listtf,this.btnlist[index].cfg);
        this.updataFuYou();
        this._ui.list1.page = 0;
        this.setBtn();
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

    public onAdd(){
        FuJiangModel.Ins.on(FuJiangModel.SELECT_FUJIANG,this,this.updataView);
        HuYouModel.Ins.on(HuYouModel.UPDATA_VIEW,this,this.onUpdataFuYou);
        this._ui.txt_dragdec.visible = false;
        this._ui.lab2.text = MainModel.Ins.mRoleData.getVal(ECellType.DaoQi) + "";
        for(let i:number = 1;i<9;i++){
            this._ui["img_liang" + i].visible = false;
        }
        this._ui.listcontainer.visible = false;
        this._ui.sanjiao.rotation = 0;
        this.curIndex = 0;
        this._selCtl.setData();
    }

    public onRemove(){
        FuJiangModel.Ins.off(FuJiangModel.SELECT_FUJIANG,this,this.updataView);
        HuYouModel.Ins.off(HuYouModel.UPDATA_VIEW,this,this.onUpdataFuYou);
        this._selCtl.onRemove();
        if(this._avatar){
            this._avatar.dispose();
            this._avatar = null;
        }
    }

    private _data:stChief;
    private updataView(value: stChief) {
        this._data = value;
        this.selectIndex(this.curIndex);
    }

    private onUpdataFuYou(){
        this.updataFuYou();
        this.setBtn();
    }

    private updataFuYou(){
        if(!this._data)return;
        let soltNum = FuJiangFYSlotProxy.Ins.getSlotNum(this._data.cheifId);
        let equipList = HuYouModel.Ins.getBagList(HuYouModel.BagEnmu.sort_FY,this._data.cheifId);

        let skin:stSkin = FuJiangModel.Ins.getFuJiangSkin(this._data.cheifId);
        if(!this._avatar){
            this._avatar = AvatarFactory.createAvatarByStSkin(skin,EAvatarAnim.NormalStand,EAvatarDir.Right);
            this._avatar.scale(1.1,1.1);
            this._ui.heroContainer.addChild(this._avatar);
        }else{
            this._avatar.mSkin = skin;
        }

        for(let i:number = 1;i<9;i++){
            if(soltNum >= i){
                this._ui["suo" + i].visible = false;
            }else{
                this._ui["suo" + i].visible = true;
                this._ui["txt_suo" + i].text = "副将" +  FuJiangFYSlotProxy.Ins.getCfgByCount(i) + "级解锁";
            }
            if(equipList){
                let vo = equipList.find(item => (item as stItem).pos == i);
                if(vo){
                    let voo = new GridItemVo();
                    voo.isNull = false;
                    voo.init(vo);
                    (this["_item" + i] as GridItemCtl).setVisible(true);
                    (this["_item" + i] as GridItemCtl).setQuaVis(false);
                    (this["_item" + i] as GridItemCtl).setBagData(voo,true,true,false,this._data.cheifId);
                    this._ui["img_line" + i].visible = true;
                    this._ui["txt_lv" + i].visible = true;
                    this._ui["txt_lv" + i].text = voo.getName() + " " + "lv." + voo.stItem.level;
                }else{
                    (this["_item" + i] as GridItemCtl).setVisible(false);
                    this._ui["img_line" + i].visible = false;
                    this._ui["txt_lv" + i].visible = false;
                }
            }else{
                (this["_item" + i] as GridItemCtl).setVisible(false);
                this._ui["img_line" + i].visible = false;
                this._ui["txt_lv" + i].visible = false;
            }

            if(FuJiangModel.Ins.isDotEquip(i,this._data.cheifId)){
                DotManager.addDot(this._ui["red"+ i],30,-10);
            }else{
                DotManager.removeDot(this._ui["red"+ i]);
            }
        }
        this.updataList();
        this.setRedTip();
    }
    
    private setRedTip(){
        let arr = FuJiangModel.Ins.getSZNoList();
        for(let i:number=0;i<arr.length;i++){
            if(FuJiangModel.Ins.isDotEquipOne(arr[i].cheifId)){
                this._selCtl.addRedTip(i);
            }else{
                this._selCtl.remRedTip(i);
            }
        }
    }

    private onBtnAttrClick(){
        E.ViewMgr.Open(EViewType.AttrShow,null,HuYouModel.Ins.getSuitAttrShow(this._data.cheifId));
    }

    private onBtnQFClick(){
        E.ViewMgr.Open(EViewType.CIFU);
    }

    private onBtnLClick(){
        this._ui.list1.page --;
        this.setBtn();
    }

    private onBtnRClick(){
        this._ui.list1.page ++;
        this.setBtn();
    }

    private setBtn(){
        let index:number = this._ui.list1.page + 1;
        if(index <= 1){
            this._ui.btn_l.disabled = true;
        }else{
            this._ui.btn_l.disabled = false;
        }
        if(index >= this._ui.list1.totalPage){
            this._ui.btn_r.disabled = true;
        }else{
            this._ui.btn_r.disabled = false;
        }
        if(this._ui.list1.totalPage != 0){
            this._ui.lab_page.text = index + "/" + this._ui.list1.totalPage;
        }else{
            this._ui.lab_page.text = "1/1"
        }
    }

    private updataList(){
        let list:GridItemVo[] = [];
        // let len = HuYouCfgProxy.Ins.GetDataById(1).f_StorageMax;
        let qua = this.btnlist[this.curIndex].cfg.f_QualityID;
        let bagList = HuYouModel.Ins.getBagList(HuYouModel.BagEnmu.noSort_FY,this._data.cheifId);
        let showList:stItem[];
        if(qua == 0){
            showList = bagList;
        }else{
            showList = [];
            for(let ele of bagList){
                let itemCfg = ItemProxy.Ins.getCfg(ele.id);
                if(qua == itemCfg.f_qua){
                    showList.push(ele);
                }
            }
        }

        for(let i:number=0;i<showList.length;i++){
            let vo = new GridItemVo();
            vo.isNull = false;
            vo.init(showList[i]);
            list.push(vo);
        }
        this._ui.list1.array = list;
    }
}