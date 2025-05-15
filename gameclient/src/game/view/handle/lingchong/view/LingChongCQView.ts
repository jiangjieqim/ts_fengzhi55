import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { SocketMgr } from "../../../../network/SocketMgr";
import { PetDecompose_req, stPet } from "../../../../network/protocols/BaseProto";
import { FuJiangStarCtl } from "../../fujiang/view/ctl/FuJiangStarCtl";
import { IListData, SelectListCtl } from "../../main/ctl/SelectListCtl";
import { EquipmentQualityProxy } from "../../main/model/EquipmentProxy";
import { MainModel } from "../../main/model/MainModel";
import { EQuickMsg } from "../../main/model/QuickMsgVo";
import { QuickQua } from "../../main/views/QuickSettingView";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { LingChongModel } from "../model/LingChongModel";
import { PetListProxy, PetQualityProxy } from "../proxy/LingChongProxy";
import { LingChongItem2 } from "./item/LingChongItem2";

export class LingChongCQView extends ViewBase{
    private _ui:ui.views.lingchong.ui_lingchongCuiQuViewUI;
    protected mMask = true;
    protected mMainSnapshot = true;

    private selCtl: SelectListCtl = new SelectListCtl();
    private _selectData:stPet;
    private _starCtl:FuJiangStarCtl;

    protected onAddLoadRes() {}

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.lingchong.ui_lingchongCuiQuViewUI;
            this.bindClose(this._ui.btn_close);

            ButtonCtl.Create(this._ui.btn_cq,new Laya.Handler(this,this.onBtnCQClick));
            ButtonCtl.Create(this._ui.btn_tip,new Laya.Handler(this,this.onBtnTipClick));

            this.selCtl.dirBottom = true;
            this.selCtl.mCompose = true;

            this.selCtl.init(this._ui.qualist.sj0, this._ui.qualist.listarea0, this._ui.qualist.listcon0, this._ui.qualist.tf0, ui.views.lingchong.ui_lingchong_list_attrUI, this.getList());
            this.selCtl.selectHandler = new Laya.Handler(this, this.onQuaSelHandler);

            this._ui.list.itemRender = LingChongItem2;
            this._ui.list.renderHandler = new Laya.Handler(this,this.itemHadnler);
            this._ui.list.selectEnable = true;
            this._ui.list.selectHandler = new Laya.Handler(this,this.onSelectHandller);

            this._starCtl = new FuJiangStarCtl(this._ui.item.star);
        }
    }

    private onBtnTipClick(){
        E.ViewMgr.openHelpView("petCQTitle","petCQDec");
    }

    private onBtnCQClick(){
        if(!this._selectData)return;
        let flag = false;
        if (this._selectData.petLevel) {
            flag = true;
        }
        if (this._selectData.petStar) {
            flag = true;
        }
        let num = 0;
        let talents = this._selectData.petTalents;
        for (let j: number = 0; j < talents.length; j++) {
            num += talents[j].talentLevel;
        }
        if (num > talents.length) {
            flag = true;
        }
        if (flag) {
            MainModel.Ins.queryMsg("选择灵宠已升级、觉醒或升星!萃取后只返还部分养成素材,是否确认萃取？", 0, 0, EQuickMsg.NULL, new Laya.Handler(this, this.sendCmd));
        } else {
            this.sendCmd();
        }
    }

    private sendCmd(){
        let req:PetDecompose_req = new PetDecompose_req;
        req.petSerialNum = this._selectData.petSerialNum;
        SocketMgr.Ins.SendMessageBin(req);
    }

    public getList():IListData[]{
        let arr:IListData[] = [];

        let l = PetQualityProxy.Ins.List;
        let vo = new QuickQua();
        vo.f_id = 0;
        vo.txt = E.getLang("all");
        vo.color = "ffffff";
        arr.push(vo);
        for (let i = 0; i < l.length; i++) {
            let cfg: Configs.t_Pet_Quality_dat = l[i];
            let vo = new QuickQua();
            vo.f_id = cfg.f_id;
            vo.color = EquipmentQualityProxy.Ins.getByQua(cfg.f_quality).f_Color;
            vo.txt = cfg.f_qualityname;
            arr.push(vo);
        }
        return arr;
    }

    private onQuaSelHandler(){
        let quaCfg:QuickQua = this.selCtl.selectVo;
        LingChongModel.Ins.petDataList.sort(LingChongModel.Ins.petSort);
        let l = this.getPetListByQua(quaCfg.f_id);
        this._ui.list.array = l;
        this._ui.list.scrollTo(0);
    }

    private getPetListByQua(qua:number){
        let petList:stPet[] = [];
        let l = LingChongModel.Ins.petDataList;
        if(qua == 0){
            for(let i = 0;i < l.length;i++){
                let cell = l[i];
                if(cell.onBattle){
                
                }else{
                    petList.push(cell);
                }
            }
        } else {
            for (let i = 0; i < l.length; i++) {
                let cell = l[i];
                if (cell.onBattle) {

                } else {
                    let cfg: Configs.t_Pet_List_dat = PetListProxy.Ins.getCfgById(cell.petId);
                    if (cfg.f_petquality == qua) {
                        petList.push(cell)
                    }
                }
            }
        }
        return petList;
    }

    private itemHadnler(item:LingChongItem2,index:number){
        if(this._selectData && this._selectData == item.dataSource){
            item.setData(item.dataSource,true);
        }else{
            item.setData(item.dataSource,false);
        }
    }

    private onSelectHandller(index:number){
        if(index == -1)return;
        let data = this._ui.list.array[index];
        if(this._selectData && this._selectData == data){
            this._selectData = null;
        }else{
            this._selectData = data;
        }
        this.updataItem();
        this._ui.list.selectedIndex = -1;
    }

    private updataItem(){
        if (this._selectData) {
            this._ui.item.visible = true;
            let cfg: Configs.t_Pet_List_dat = PetListProxy.Ins.getCfgById(this._selectData.petId);
            this._ui.item.quality.skin = IconUtils.getQuaIcon(cfg.f_petquality);
            this._ui.item.icon.skin = PetListProxy.Ins.getPetIconById(cfg.f_petid);
            this._ui.item.lab_lv.text = "Lv." + this._selectData.petLevel;
            if (this._selectData.petStar) {
                this._ui.item.sp.visible = true;
                this._ui.item.star.visible = true;
                this._starCtl.setStar(this._selectData.petStar);
            } else {
                this._ui.item.sp.visible = false;
                this._ui.item.star.visible = false;
            }
            this._ui.item.tab.visible = true;
            this._ui.item.tab.img.skin = `remote/lingchong/tj${cfg.f_pettype}.png`;
            this._ui.item.tab.img2.visible = false;
            this._ui.item.mask1.visible = this._ui.item.gou1.visible = false;
        } else {
            this._ui.item.visible = false;
        }
    }

    protected onInit(): void {
        LingChongModel.Ins.on(LingChongModel.REMOVE_LingChong,this,this.onUpdataView);
        this.selCtl.selectIndex(0);
        this._selectData = null;
        this.updataItem();
    }

    private onUpdataView(){
        this._selectData = null;
        this.updataItem();
        this.onQuaSelHandler();
    }

    protected onExit(): void {
        LingChongModel.Ins.off(LingChongModel.REMOVE_LingChong,this,this.onUpdataView);
        this._ui.list.selectedIndex == -1;
    }
}