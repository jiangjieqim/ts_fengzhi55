import {StringUtil} from "../../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { RowMoveBaseNode, ScrollPanelControl } from "../../../../../../frame/view/ScrollPanelControl";
import {ViewBase} from "../../../../../../frame/view/ViewBase";
import { ui } from "../../../../../../ui/layaMaxUI";
import { FontClipCtl } from "../../../avatar/ctl/FontClipCtl";
import { FontCtlFactory } from "../../../avatar/ctl/FontCtlFactory";
import { EquipmentQualityProxy } from "../../../main/model/EquipmentProxy";
import { MainModel } from "../../../main/model/MainModel";
import { attrConvert } from "../../../main/vos/MainRoleVo";
import { QualityUtils } from "../../../main/vos/QualityUtils";
import { ZuoQiModel } from "../../ZuoqiModel";
import { ZuoQiEvent } from "../../vos/ZuoQiEvent";
import { MountConfigProxy, Mount_ListProxy, Mount_ValueProxy } from "../../vos/ZuoqiProxy";
import { ZuoQiTJItem } from "./ZuoQiTJItem";
import { ZuoQiTJItemCtl } from "./ZuoQiTJItemCtl";

class ZuoqiTJLabel extends RowMoveBaseNode{
    protected clsKey:string = "ZuoqiTJLabel";
    protected createNode (index){
        let _skin:ui.views.zuoqi.ui_zuoqiTJLabelUI = Laya.Pool.getItemByClass(this.clsKey,ui.views.zuoqi.ui_zuoqiTJLabelUI);
        let vo = this.list[index];
        
        let ecfg: Configs.t_EquipmentQuality_dat = EquipmentQualityProxy.Ins.GetDataById(vo);
        let qcfg = MountConfigProxy.Ins.getByQualityID(vo);
        _skin.lab.text = "[" + ecfg.f_EquipmentLevel + "坐骑]";
        _skin.y = this.y;
        return _skin;
    }
}

class ZuoqiTJItem extends RowMoveBaseNode {
    protected clsKey: string = "ZuoqiTJItem";
    protected createNode(index) {
        let _skin: ZuoQiTJItem = Laya.Pool.getItemByClass(this.clsKey, ZuoQiTJItem);
        _skin.ctl.setData(this.list[index].f_MountID);
        _skin.x = index * _skin.width;
        _skin.y = this.y;
        return _skin;
    }
}

export class ZuoQiTJView extends ViewBase{
    private _ui:ui.views.zuoqi.ui_zuoqiTJViewUI;
    protected mMask = true;
    protected mMainSnapshot:boolean = true;

    private itemCtl:ZuoQiTJItemCtl;
    private _plusCtl:FontClipCtl;
    private _panelCtl: ScrollPanelControl = new ScrollPanelControl();

    protected onAddLoadRes() {
        this.addAtlas('zuoqi.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.zuoqi.ui_zuoqiTJViewUI;
            this.bindClose(this._ui.close1);

            this.itemCtl = new ZuoQiTJItemCtl(this._ui.item);

            this._panelCtl.init(this._ui.panel);
            this._plusCtl = FontCtlFactory.createPlus();

            this._ui.list.itemRender = ui.views.zuoqi.ui_zuoqiTJAttrItemUI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onItemRendler);
            this._ui.list1.itemRender = ui.views.zuoqi.ui_zuoqiTJAttrItemUI;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onItemRendler1);

            this._ui.btn_tip.on(Laya.Event.CLICK,this,this.onTipClick);
        }
    }

    private onTipClick(e:Laya.Event){
        e.stopPropagation();
        let arr = this._cfg.f_7StarSkill.split(";");
        let name = arr[1].split("|")[0];
        let dec = arr[1].split("|")[1];
        MainModel.Ins.showSmallTips(name, dec, this._ui.btn_tip);
    }

    protected onInit(): void {
        ZuoQiModel.Ins.on(ZuoQiEvent.TJSELECT,this,this.onSelect);
        ZuoQiModel.Ins.tjSelectId = 27;
        this.updataView();
        this.refreshPanel();
    }

    protected onExit(): void {
        ZuoQiModel.Ins.off(ZuoQiEvent.TJSELECT,this,this.onSelect);
    }

    private onSelect(){
        this.updataView();
    }

    private onItemRendler(item:ui.views.zuoqi.ui_zuoqiTJAttrItemUI){
        item.tf1.text = item.dataSource.name;
        item.valTf.text = item.dataSource.value;
    }

    private onItemRendler1(item:ui.views.zuoqi.ui_zuoqiTJAttrItemUI){
        item.tf1.text = item.dataSource.name;
        item.tf1.color = "#CF47CA";
        item.valTf.text = item.dataSource.value;
        item.valTf.color = "#CF47CA";
    }

    private _cfg:Configs.t_Mount_List_dat;
    private updataView(){
        this.itemCtl.setData(ZuoQiModel.Ins.tjSelectId,true);
        this._cfg = Mount_ListProxy.Ins.getCfg(ZuoQiModel.Ins.tjSelectId);
        let ecfg: Configs.t_EquipmentQuality_dat = EquipmentQualityProxy.Ins.GetDataById(this._cfg.f_Quality);
        let qcfg = MountConfigProxy.Ins.getByQualityID(this._cfg.f_Quality);
        let color = QualityUtils.getQuaColor(this._cfg.f_Quality);
        if(this._cfg.f_Quality >= 11){
            this._ui.lab_1.visible = this._ui.lab_2.visible = this._ui.btn_tip.visible = true;
            this._ui.lab_2.text = this._cfg.f_SkillName;
        }else{
            this._ui.lab_1.visible = this._ui.lab_2.visible = this._ui.btn_tip.visible = false;
        }
        this._ui.nameTf.text = this._cfg.f_MountName;
        this._ui.quaTf.text = ecfg.f_EquipmentLevel;
        this._ui.nameTf.color = color;
        this._ui.quaTf.color = color;
        this._ui.lab_lv.text = "等级上限" + qcfg.f_MaxLevel + "级";

        let array = [];
        let num = 0;
        for(let i:number=0;i<Mount_ValueProxy.Ins.List.length;i++){
            let data = Mount_ValueProxy.Ins.List[i];
            if(this._cfg.f_Quality >= 11){
                if(!data.f_isQuality){
                    continue;
                }
            }else{
                if(data.f_isQuality){
                    continue;
                }
            }
            let obj:any = {};
            let starweight = data.f_starweight / 10000;
            obj.name = MainModel.Ins.getAttrNameIdByID(data.f_attr_id) + ":";
            let value = (qcfg.f_MaxLevel*data.f_levelweight + this._cfg.f_Quality*data.f_quaweight)*(4*(1+((qcfg.f_MaxStar-1)*starweight)));
            value = value + qcfg.f_MaxLevel * this._cfg.f_Quality * data.f_adjustweight;
            value = Math.ceil(value);
            obj.value = attrConvert(data.f_attr_id,value) + "";
            array.push(obj);
            if(data.f_attr_id == 10003){
                num += value * 0.5;
            }else if(data.f_attr_id == 10004){
                num += value * 2;
            }else if(data.f_attr_id == 10005){
                num += value * 6;
            }
        }
        this._ui.list.array = array;
        this._plusCtl.setValue(this._ui.plusCon,StringUtil.val2Atlas(num));

        let arr = [];
        if(this._cfg.f_Skill1){
            let obj:any = {};
            obj.name = MainModel.Ins.getAttrNameIdByID(this._cfg.f_Skill1) + ":";
            obj.value = attrConvert(this._cfg.f_Skill1,this._cfg.f_Skill1Value) + "";
            arr.push(obj);
        }
        if(this._cfg.f_Skill2){
            let obj:any = {};
            obj.name = MainModel.Ins.getAttrNameIdByID(this._cfg.f_Skill2) + ":";
            obj.value = attrConvert(this._cfg.f_Skill2,this._cfg.f_Skill2Value) + "";
            arr.push(obj);
        }
        if(this._cfg.f_Skill3){
            let obj:any = {};
            obj.name = MainModel.Ins.getAttrNameIdByID(this._cfg.f_Skill3) + ":";
            obj.value = attrConvert(this._cfg.f_Skill3,this._cfg.f_Skill3Value) + "";
            arr.push(obj);
        }
        if(this._cfg.f_Skill4){
            let obj:any = {};
            obj.name = MainModel.Ins.getAttrNameIdByID(this._cfg.f_Skill4) + ":";
            obj.value = attrConvert(this._cfg.f_Skill4,this._cfg.f_Skill4Value) + "";
            arr.push(obj);
        }
        if(this._cfg.f_Skill5){
            let obj:any = {};
            obj.name = MainModel.Ins.getAttrNameIdByID(this._cfg.f_Skill5) + ":";
            obj.value = attrConvert(this._cfg.f_Skill5,this._cfg.f_Skill5Value) + "";
            arr.push(obj);
        }
        this._ui.list1.array = arr;

        this._ui.lab_tj.text = "通过" + this._cfg.f_getmethodinfo;
    }

    private refreshPanel(){
        let arr = this.getDataList();

        this._panelCtl.clear();
        for(let i = 0;i < arr.length;i++){
            if(arr[i].qua != ""){
                this._panelCtl.split([arr[i].qua],ZuoqiTJLabel,28);
            }else{
                this._panelCtl.split(arr[i].list,ZuoqiTJItem,120,0,5);
            }
        }
        this._panelCtl.end();
    }

    private getDataList(){
        let fzmap = {};
        let array = [];
        let arr = Mount_ListProxy.Ins.List;
        for(let i:number=0;i<arr.length;i++){
            if(!fzmap[arr[i].f_Quality]){
                fzmap[arr[i].f_Quality] = [];
            }
            fzmap[arr[i].f_Quality].push(arr[i]);
        }

        for (let ele in fzmap){
            let voo:any = {};
            voo.qua = "";
            voo.list = fzmap[ele];
            array.unshift(voo);
            let vo:any = {};
            vo.qua = parseInt(ele);
            vo.list = [];
            array.unshift(vo);
        }
        return array;
    }
}