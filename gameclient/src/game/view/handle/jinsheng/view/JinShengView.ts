import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { SocketMgr } from "../../../../network/SocketMgr";
import { Promotion_req } from "../../../../network/protocols/BaseProto";
import { ExpValueProxy } from "../../../../static/json/data/ExpValueProxy";
import { DotManager } from "../../common/DotManager";
import { MainModel } from "../../main/model/MainModel";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { JinShengModel } from "../model/JinShengModel";
import { UpstageRankProxy } from "../proxy/JinShengProxy";
import { JinShengItem } from "./JinShengItem";

export class JinShengView extends ViewBase{
    private _ui:ui.views.jinsheng.ui_jinshengViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;

    protected onAddLoadRes() {
        this.addAtlas("jinsheng.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.jinsheng.ui_jinshengViewUI;
            this.bindClose(this._ui.close1);
            ButtonCtl.Create(this._ui.btn,new Laya.Handler(this,this.onBtnClick));

            this._ui.list.itemRender = ui.views.jinsheng.ui_jinshengItemUI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);

            this._ui.list1.itemRender = ui.views.jinsheng.ui_jinshengItemUI;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onRenderHandler1);

            this._ui.list2.itemRender = JinShengItem;
            this._ui.list2.renderHandler = new Laya.Handler(this,this.onRenderHandler2);
        }
    }

    private onBtnClick(){
        let req:Promotion_req = new Promotion_req;
        SocketMgr.Ins.SendMessageBin(req);
    }

    protected onInit(): void {
        JinShengModel.Ins.on(JinShengModel.Updata_View,this,this.onUpdataView);
        this.updataView();
    }

    protected onExit(): void {
        JinShengModel.Ins.off(JinShengModel.Updata_View,this,this.onUpdataView);
    }

    private onUpdataView(){
        this.updataView();
    }

    private onRenderHandler(item:ui.views.jinsheng.ui_jinshengItemUI){
        let id = parseInt(item.dataSource.split(":")[0]);
        let val = parseInt(item.dataSource.split(":")[1]);
        item.lab.text = MainModel.Ins.getAttrNameIdByID(id) + ":";
        item.lab1.text = attrConvert(id,val);
    }

    private onRenderHandler1(item:ui.views.jinsheng.ui_jinshengItemUI){
        item.lab.color = item.lab1.color = "#53915A";
        let id = parseInt(item.dataSource.split(":")[0]);
        let val = parseInt(item.dataSource.split(":")[1]);
        item.lab.text = MainModel.Ins.getAttrNameIdByID(id) + ":";
        item.lab1.text = attrConvert(id,val);
    }

    private onRenderHandler2(item:JinShengItem){
        item.setData(item.dataSource);
    }

    private updataView(){
        let cfg:Configs.t_Upstage_Rank_dat = UpstageRankProxy.Ins.getCfgByID(JinShengModel.Ins.promotionLevel);
        this._ui.lab.text = cfg.f_name;
        this._ui.labb.text = cfg.f_namestage;
        this._ui.lab_lv.text = cfg.f_maxlevel + "";
        this._ui.list.array = cfg.f_attr.split("|");

        let nextCfg:Configs.t_Upstage_Rank_dat = UpstageRankProxy.Ins.getCfgByID(JinShengModel.Ins.promotionLevel + 1);
        if(nextCfg){
            this._ui.spV.x = 66;
            this._ui.spV1.visible = this._ui.spV2.visible = true;
            this._ui.lab_max.visible = false;

            this._ui.lab1.text = nextCfg.f_name;
            this._ui.labb1.text = nextCfg.f_namestage;
            this._ui.lab_lv1.text = nextCfg.f_maxlevel + "";
            this._ui.list1.array = nextCfg.f_attr.split("|");

            this._ui.list2.array = JinShengModel.Ins.promotionList;

            let cfg: Configs.t_ExpValue_dat = ExpValueProxy.Ins.getBylv(MainModel.Ins.lv);
            if (cfg) {
                this._ui.lab2.text = MainModel.Ins.exp + "/" + cfg.f_ExpValue;
                let val = MainModel.Ins.exp / cfg.f_ExpValue;
                if (val > 1) val = 1;
                this._ui.pro.width = val * 600;
            }
        }else{
            this._ui.spV.x = 236;
            this._ui.spV1.visible = this._ui.spV2.visible = false;
            this._ui.lab_max.visible = true;
        }

        if(JinShengModel.Ins.isJSRedTip()){
            DotManager.addDot(this._ui.btn);
        }else{
            DotManager.removeDot(this._ui.btn);
        }
    }
}