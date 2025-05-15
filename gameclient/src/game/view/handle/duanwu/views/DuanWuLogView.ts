import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { RowMoveBaseNode, ScrollPanelControl } from "../../../../../frame/view/ScrollPanelControl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { BaoShiCfgProxy } from "../../baoshi/proxy/BaoShiProxy";
import { FuJiangListProxy } from "../../fujiang/proxy/FuJiangProxy";
import { EFeastType } from "../../gemfeast/EFeastType";
import { GemBaseModel } from "../../gemfeast/GemBaseModel";
import { PetListProxy } from "../../lingchong/proxy/LingChongProxy";
import { EquipmentQualityProxy } from "../../main/model/EquipmentProxy";
import { QualityUtils } from "../../main/vos/QualityUtils";
import { Mount_ListProxy } from "../../zuoqi/vos/ZuoqiProxy";
import { t_Alternation_GemScore } from "../DuanWuProxy";
import { DuanWuLogMsgVo } from "../vos/DuanWuLogMsgVo";
class MsgCellView extends ui.views.duanwu.ui_duanwu_reward_log_item_viewUI{
    private skinKey:string = "duanwu_txt_cellUI";
    public realHeight:number;
    refresh(){
        while(this.txtCon.numChildren){
            let cell = this.txtCon.getChildAt(0);
            Laya.Pool.recover(this.skinKey,cell);
            cell.removeSelf();
        }
        let data:DuanWuLogMsgVo = this.dataSource;


        let bgHeight:number = 0;
        for(let i = 0;i < data.msgs.length;i++){
            let cellSkin:ui.views.duanwu.ui_duanwu_txt_cellUI = Laya.Pool.getItemByClass(this.skinKey,ui.views.duanwu.ui_duanwu_txt_cellUI);
            // this['t'+i];
            let _data = data.msgs[i];
            // if(_data){
            // let space:string = "    ";
            cellSkin.visible = true;
            // let name = MainModel.Ins.mRoleData.NickName + "(" + MainModel.Ins.mRoleData.serverName + ")";

            // let timeStr = TimeUtil.timestamtoTime1(_data.time,"-"," ",":",false);

            // if(data.subType == EFeastType.Ride){
            //     cellSkin.tf0.text =  timeStr + space + E.getLang("duanwu02");
            //     let _mountCfg:Configs.t_Mount_List_dat = Mount_ListProxy.Ins.getCfg(_data.id);
            //     cellSkin.tf1.color = QualityUtils.getQuaColor(_mountCfg.f_Quality);
            //     cellSkin.tf1.text = space + _mountCfg.f_MountName;
            // }else if(data.subType == EFeastType.Gem){
            //     cellSkin.tf0.text = timeStr + space + E.getLang("get");
            //     let cfg:Configs.t_Gem_List_dat = BaoShiCfgProxy.Ins.getCfgById(_data.id);
            //     let color = QualityUtils.getQuaColor(t_Alternation_GemScore.Ins.getByLevel(_data.level).f_GemColor);
            //     cellSkin.tf1.color = color;
            //     cellSkin.tf1.text = space + "Lv." + _data.level + cfg.f_GemAttr + "宝石";// + cfg.f_gemname;
            // }
            // else if (data.subType == EFeastType.FuJiang) {
            //     let _heroCfg = FuJiangListProxy.Ins.getCfgById(_data.id);
            //     let color = "#"+EquipmentQualityProxy.Ins.getByQua(_heroCfg.f_cheifQuality).f_chiefcolor
            //     cellSkin.tf0.text = timeStr + space + E.getLang("fj01");
            //     cellSkin.tf1.color = color;
            //     cellSkin.tf1.text = space + _heroCfg.f_cheif;
            // }
            // else if(data.subType == EFeastType.Pet){
            //     let petCfg:Configs.t_Pet_List_dat = PetListProxy.Ins.getCfgById(_data.id);
            //     cellSkin.tf0.text = timeStr + space + E.getLang("pet06");
            //     cellSkin.tf1.color = "#" + EquipmentQualityProxy.Ins.getByQua(petCfg.f_petquality).f_Color;
            //     cellSkin.tf1.text = space + petCfg.f_petname;
            // }

            let msg = GemBaseModel.ConvertMsg(data.subType,_data,true);
            cellSkin.tf0.text = msg.desc;
            cellSkin.tf1.text = msg.name;
            cellSkin.tf1.color = msg.color;

            cellSkin.tf1.x = + cellSkin.tf0.x + cellSkin.tf0.textField.width;
            this.txtCon.addChild(cellSkin);
            cellSkin.y = i * cellSkin.height;
            bgHeight += cellSkin.height;
            // }else{
            // cellSkin.visible = false;
            // }
        }
        this.realHeight = bgHeight;
        this.bg1.height = bgHeight;
    }
}
class DuanWuNodeItem extends RowMoveBaseNode{
    protected clsKey:string = "MsgCellView";

    protected createNode (index){
        let _skin:MsgCellView = Laya.Pool.getItemByClass(this.clsKey, MsgCellView);
        _skin.dataSource = this.list[index];
        _skin.refresh();
        _skin.height = _skin.realHeight;
        _skin.y = this.y;
        return _skin;
    }
}

/**端午节日志 */
export class DuanWuLogView extends ViewBase {
    private cellHeight: number = 0;
    protected mMask: boolean = true;
    private model: GemBaseModel;
    private _panelCtl: ScrollPanelControl = new ScrollPanelControl();
    private _ui: ui.views.duanwu.ui_duanwu_reward_log_viewUI;
    protected onAddLoadRes(): void { }
    protected onExit(): void { }
    protected onFirstInit(): void {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.duanwu.ui_duanwu_reward_log_viewUI();
            // this.model = DuanWuModel.Ins;
            this.bindClose(this._ui.close1);
            this._panelCtl.init(this._ui.panel1);

            let temp:Laya.View = new ui.views.duanwu.ui_duanwu_txt_cellUI();
            this.cellHeight = temp.height;
            temp.destroy();
        }
    }
    protected onInit(): void {
        this.model = this.Data;
        this._panelCtl.clear();
        let dataList = this.model.myMSG;
        for(let i = 0;i < dataList.length;i++){
            let o = dataList[i];
            let h = o.msgs.length * this.cellHeight;
            this._panelCtl.split([o],DuanWuNodeItem,h,10);
        }
        this._panelCtl.endLast();
     }
}