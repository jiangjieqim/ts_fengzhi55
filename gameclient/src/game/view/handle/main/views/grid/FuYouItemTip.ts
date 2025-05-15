import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../../frame/view/ViewBase";
import { ui } from "../../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { E } from "../../../../../G";
import { BlessingConvert_req, BlessingLevelUp_req, stItem } from "../../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../../network/SocketMgr";
import { HuYouModel } from "../../../huyou/model/HuYouModel";
import { HuYouQualityProxy, HuYouSoulExpProxy } from "../../../huyou/proxy/HuYouProxy";
import { HuYouView } from "../../../huyou/view/HuYouView";
import { XianShiLiBaoModel, XianShiLiBaoType } from "../../../xianshilibao/model/XianShiLiBaoModel";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";
import { EGameColor } from "../../model/EGameColor";
import { MainModel } from "../../model/MainModel";
import { EQuickMsg } from "../../model/QuickMsgVo";
import { attrConvert } from "../../vos/MainRoleVo";
import { GridItemCtl } from "./GridItemCtl";
import { GridItemVo } from "./GridItemVo";

/* @Author: tsy
 * @Date: 2023-02-21 11:51:48
 * @Last Modified by: tsy
 * @Last Modified time: 2023-04-03 16:54:18
*/
export class FuYouItemTip extends ViewBase{
    protected mMask = true;
    private _ui:ui.views.fuyou.ui_cifuLevelUI;
    private _item1:GridItemCtl;
    protected autoFree = true;
    private btnLv:ButtonCtl;

    protected onAddLoadRes() {
        this.addAtlas('fuyou.atlas');
    }

    protected onFirstInit() {
        if(!this.UI){
            this.UI = this._ui = new ui.views.fuyou.ui_cifuLevelUI();
            this.bindClose(this._ui.close1);
            this._ui.maskbg.on(Laya.Event.CLICK,this,this.Close);
            this.btnLv = ButtonCtl.Create(this._ui.btn_lv,new Laya.Handler(this,this.onBtnLvClick));
            
            this.btnList.push(ButtonCtl.Create(this._ui.btn_zh,new Laya.Handler(this,this.onBtnZhClick)));
            this.btnList.push(this.btnLv);

            this._item1 = new GridItemCtl(this._ui.item);
        }
    }

    protected onInit() {
        HuYouModel.Ins.on(HuYouModel.UPDATA_VIEW,this,this.updateView1);
       this.updateView();
    }

    protected onExit() {
        HuYouModel.Ins.off(HuYouModel.UPDATA_VIEW,this,this.updateView1);
    }

    private onBtnLvClick(){
        XianShiLiBaoModel.Ins.sendCmd(XianShiLiBaoType.Fuyuan);
        if(!MainModel.Ins.isItemEnoughSt(this._lvCfg[this._quaCfg.f_QualityField],true)){
            return;
        }
        let req:BlessingLevelUp_req = new BlessingLevelUp_req();
        req.uid = (this.Data as GridItemVo).uid;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onBtnZhClick(){
        if((this.Data as GridItemVo).stItem.pos){
            MainModel.Ins.queryMsg("是否转化该福源?",0,0,EQuickMsg.FuYuanZH,new Laya.Handler(this,this.sendCmd));
            return;
        }
        this.sendCmd();
    }

    private sendCmd(){
        let view:HuYouView = E.ViewMgr.Get(EViewType.CIFU) as HuYouView;
        if(view){
            if(HuYouModel.Ins.isAuto){
                view.setAuto(false);
                E.ViewMgr.ShowMidError(E.getLang("HuYou_tips1"));
                return;
            }
            if(view.isPlay){
                E.ViewMgr.ShowMidError(E.getLang("正在祈福中"));
                return;
            }
        }
        let req:BlessingConvert_req = new BlessingConvert_req();
        req.datalist = [(this.Data as GridItemVo).uid];
        SocketMgr.Ins.SendMessageBin(req);
        this.Close();
    }

    private updateView1(){
        let bagList = HuYouModel.Ins.getBagList(HuYouModel.BagEnmu.noSort_FY,(this.Data as GridItemVo).cheifId);
        let vo = bagList.find(item => (item as stItem).uid.equals((this.Data as GridItemVo).uid));
        if(vo){
            (this.Data as GridItemVo).stItem.level = vo.level;
        }else{
            bagList = HuYouModel.Ins.getBagList(HuYouModel.BagEnmu.sort_FY,(this.Data as GridItemVo).cheifId);
            vo = bagList.find(item => (item as stItem).uid.equals((this.Data as GridItemVo).uid));
            (this.Data as GridItemVo).stItem.level = vo.level;
        }
        this.updateView();
    }

    private _lvCfg:Configs.t_Blessing_Soul_Exp_dat;
    private _quaCfg:Configs.t_Blessing_Soul_Quality_dat;
    private updateView(){
        this._item1.setBagData(this.Data);
        let cfg = HuYouQualityProxy.Ins.getCfgByQua((this.Data as GridItemVo).itemCfg.f_qua);
        this._ui.txt_name.text = (this.Data as GridItemVo).getName() + ` (${cfg.f_SoulQualityName})`;
        this._ui.txt_name.color = (this.Data as GridItemVo).getQua();
        this._ui.txt_level.text = "Lv." + (this.Data as GridItemVo).stItem.level;
        let attr = HuYouModel.Ins.getAttr((this.Data as GridItemVo).uid);
        this._ui.txt1.text = MainModel.Ins.getAttrNameIdByID(attr.id) + ":";
        this._ui.txt2.text =  attrConvert(attr.id,attr.value) + "";

        this._lvCfg = HuYouSoulExpProxy.Ins.getCfgByLv((this.Data as GridItemVo).stItem.level + 1);
        this._quaCfg = HuYouQualityProxy.Ins.getCfgByItemID((this.Data as GridItemVo).itemID);
        if(this._lvCfg){
            this._ui.gold3.visible = true;
            let id = this._lvCfg[this._quaCfg.f_QualityField].split("-")[0];
            this._ui.img_money3.skin = IconUtils.getIcon(id);
            this._ui.img_tt.skin = IconUtils.getIcon(id);
            let nextCount = this._lvCfg[this._quaCfg.f_QualityField].split("-")[1];
            let count = MainModel.Ins.mRoleData.getVal(id);
            this._ui.txt_money1.text = count + "";
            this._ui.txt_money2.text = "/" +  nextCount;
            if(count >= nextCount){
                this._ui.txt_money1.color = EGameColor.GREED;
            }else{
                this._ui.txt_money1.color = EGameColor.NotEnough;
            }
            this._ui.txt_sj.text = "升级";
            this.btnLv.mouseEnable = true;
        }else{
            this._ui.txt_sj.text = "已满级";
            this.btnLv.mouseEnable = false;
            this._ui.gold3.visible = false;
            let lvCfg = HuYouSoulExpProxy.Ins.getCfgByLv((this.Data as GridItemVo).stItem.level);
            let idd = lvCfg[this._quaCfg.f_QualityField].split("-")[0];
            this._ui.img_tt.skin = IconUtils.getIcon(idd);
        }
        
    }
}