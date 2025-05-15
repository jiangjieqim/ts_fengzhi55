import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { SimpleEffect } from "../../avatar/SimpleEffect";
import { MainModel } from "../../main/model/MainModel";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { JinShengModel } from "../model/JinShengModel";
import { UpstageRankProxy } from "../proxy/JinShengProxy";

export class JinShengView1 extends ViewBase{
    private _ui:ui.views.jinsheng.ui_jinshengView1UI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree = true;
    private _eff:SimpleEffect;

    protected onAddLoadRes() {
        this.addAtlas("jinsheng.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.jinsheng.ui_jinshengView1UI;

            this._ui.list.itemRender = ui.views.jinsheng.ui_jinshengItemUI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);

            this._ui.list1.itemRender = ui.views.jinsheng.ui_jinshengItemUI;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onRenderHandler1);
            this._ui.sp.y = 10;
        }
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

    protected onInit(): void {
        this._ui.spV.visible = this._ui.spV1.visible = false;
        if(!this._eff){
            this._eff = new SimpleEffect(this._ui.sp,`o/spine/succeed/shengli`);
        }
        this._eff.play(4,false,this,this.effEnd);
        this.updataView();
        Laya.timer.once(500,this,this.updataView1);
    }

    protected onExit(): void {
        if(this._eff){
            this._eff.dispose();
            this._eff = null;
        }
        Laya.timer.clear(this,this.updataView1);
    }

    private updataView(){
        let cfg:Configs.t_Upstage_Rank_dat = UpstageRankProxy.Ins.getCfgByID(JinShengModel.Ins.promotionLevel - 1);
        this._ui.lab.text = cfg.f_name;
        this._ui.labb.text = cfg.f_namestage;
        this._ui.list.array = cfg.f_attr.split("|");

        let nextCfg:Configs.t_Upstage_Rank_dat = UpstageRankProxy.Ins.getCfgByID(JinShengModel.Ins.promotionLevel);
        this._ui.lab1.text = nextCfg.f_name;
        this._ui.labb1.text = nextCfg.f_namestage;
        this._ui.list1.array = nextCfg.f_attr.split("|");
    }

    private effEnd(){
        if(this._eff){
            this._eff.play(5,true);
        }
    }

    private updataView1(){
        this._ui.spV.visible = this._ui.spV1.visible = true;
    }

}