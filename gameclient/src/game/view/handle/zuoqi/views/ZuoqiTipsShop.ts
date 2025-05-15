import {StringUtil} from "../../../../../frame/util/StringUtil";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { FontClipCtl } from "../../avatar/ctl/FontClipCtl";
import { FontCtlFactory } from "../../avatar/ctl/FontCtlFactory";
import { EquipmentQualityProxy } from "../../main/model/EquipmentProxy";
import { MainModel } from "../../main/model/MainModel";
import { f_setStar } from "../../main/views/ZuoQiSlotCtl";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { QualityUtils } from "../../main/vos/QualityUtils";
import { IconUtils } from "../vos/IconUtils";
import { MountConfigProxy, Mount_ListProxy } from "../vos/ZuoqiProxy";

// 坐骑id|战斗力|星级|等级|生命值|攻击力|防御力|随机属性|2星专属属性|4星专属属性|6星专属属性
// 19|755232|6|450|10003:103680-10004:25920-10005:8592|10006:800-10027:1200-10021:4000
export class LabourZuoqiTipsVo {
    /**坐骑id */
    mountid: number;
    plus: number;
    star: number;
    lv: number;
    base: string[];
    sp: string[];
    //************************************ */
    qua:number;
    mountCfg:Configs.t_Mount_List_dat;
    maxLv:number;
    constructor(str: string) {
        let arr: string[] = str.split("|");
        this.mountid = parseInt(arr[0]);
        this.plus = parseInt(arr[1]);
        this.star = parseInt(arr[2]);
        this.lv = parseInt(arr[3]);
        this.base = arr[4].split("-");
        this.sp = arr[5].split("-");

        let cfg = Mount_ListProxy.Ins.getCfg(this.mountid);
        this.mountCfg = cfg;
        this.qua = cfg.f_Quality;

        let cfg2: Configs.t_Mount_Config_dat = MountConfigProxy.Ins.getByQualityID(this.qua);
        this.maxLv = cfg2.f_MaxLevel;
    }

    public quaTxt(){
        let cfg: Configs.t_EquipmentQuality_dat = EquipmentQualityProxy.Ins.GetDataById(this.qua);
        if(cfg){
            return cfg.f_EquipmentLevel;
        }
        return "";
    }
}

/**坐骑展示的tips */
export class ZuoqiTipsShop extends ViewBase {

    private _data: LabourZuoqiTipsVo;
    private _ui: ui.views.zuoqi.ui_zuoqi_tip2UI;
    private _plusCtl:FontClipCtl;
    protected mMask:boolean = true;
    protected onAddLoadRes(): void { }
    protected onExit(): void { }
    
    protected onFirstInit(): void {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.zuoqi.ui_zuoqi_tip2UI();
            this._plusCtl = FontCtlFactory.createPlus();
            this._ui.listleft.renderHandler = new Laya.Handler(this,this.onBaseMainAttr);
            this._ui.listleft.itemRender = ui.views.main.ui_main_attrUI;

            this._ui.list2.renderHandler = new Laya.Handler(this,this.onSpAtrrHandler);
            this._ui.list2.itemRender = ui.views.zuoqi.ui_zuoqi_spec_attr1UI;
            this.bindClose(this._ui.close1);
        }
    }

    private onBaseMainAttr(item:ui.views.main.ui_main_attrUI){
        let arr = item.dataSource.split(":");
        item.upimg.visible = false;
        let id:number = parseInt(arr[0]);
        item.tf1.text =  MainModel.Ins.getAttrNameIdByID(id);
        item.valTf.text = attrConvert(id,parseInt(arr[1]));
    }

    private onSpAtrrHandler(item:ui.views.zuoqi.ui_zuoqi_spec_attr1UI){
        let arr = item.dataSource.split(":");
        let id:number = parseInt(arr[0]);
        item.tf1.text =  MainModel.Ins.getAttrNameIdByID(id);
        item.valTf.text = attrConvert(id,parseInt(arr[1]));
    }

    protected onInit(): void {
        this._data = this.Data;
        this.updateHead(this._ui.slot1);
        this._ui.nameTf.text = this._data.mountCfg.f_MountName;
        this._ui.quaTf.text = this._data.quaTxt();
        this._ui.nameTf.color = this._ui.quaTf.color = QualityUtils.getQuaColor(this._data.qua);

        this._ui.lvuptf.text = E.getLang("zuoqilvlimit",this._data.maxLv);
        this._plusCtl.setValue(this._ui.plusCon, StringUtil.val2Atlas(this._data.plus));
        this._ui.listleft.array = this._data.base;
        this._ui.list2.array = this._data.sp;
    }

    private updateHead(headSkin: ui.views.zuoqi.ui_zuoqi_storge_itemUI) {
        headSkin.ck.visible = false;
        headSkin.sel.visible = false;
        f_setStar(headSkin, this._data.star);
        headSkin.typename.text = "";
        headSkin.tf1.text = "Lv." + this._data.lv;
        headSkin.icon.skin = IconUtils.getHorseIcon(this._data.mountid);
        headSkin.qua.skin = IconUtils.getQuaIcon(this._data.qua);
    }
}