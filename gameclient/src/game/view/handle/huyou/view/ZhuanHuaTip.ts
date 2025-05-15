import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { BlessingConvert_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { ItemProxy } from "../../main/proxy/ItemProxy";
import { HuYouModel } from "../model/HuYouModel";
import { HuYouQualityProxy } from "../proxy/HuYouProxy";

/* @Author: tsy
 * @Date: 2023-02-20 16:16:08
 * @Last Modified by: tsy
 * @Last Modified time: 2023-02-28 16:25:47
*/
export class HuYouQuickBtn extends ui.views.fuyou.ui_zhuanhuaItemUI{
    public cfg:Configs.t_Blessing_Soul_Quality_dat;
}

export class ZhuanHuanTip extends ViewBase{
    protected autoFree = true;
    private _ui:ui.views.fuyou.ui_zhuanhuaUI;
    protected mMask = true;
    private curIndex:number = 0;
    private btnlist:HuYouQuickBtn[] = [];
    private cfglist:Configs.t_Blessing_Soul_Quality_dat[] = [];

    protected onAddLoadRes() {
        
    }

    protected onFirstInit(){
        if(!this.UI){
            this.cfglist = [];
            this.btnlist = [];
            this.UI = this._ui = new ui.views.fuyou.ui_zhuanhuaUI; 
            this.bindClose(this._ui.close1);
            this.btnList.push(ButtonCtl.Create(this._ui.startBtn,new Laya.Handler(this,this.onStartHandler)));
            this._ui.maskbg.on(Laya.Event.CLICK,this,this.Close);
            this.initSelectUI();
            this._ui.listcontainer.visible = false;
        }
    }

    private onStartHandler() {
        let list = [];
        let cfgg = this.cfglist[this.curIndex];
        let bagList = HuYouModel.Ins.getBagList(HuYouModel.BagEnmu.noSort_FY);
        for(let i:number=0;i<bagList.length;i++){
            let cfg = ItemProxy.Ins.getCfg(bagList[i].id);
            if(cfg.f_qua <= cfgg.f_QualityID){
                list.push(bagList[i].uid);
            }
        }
        let req:BlessingConvert_req = new BlessingConvert_req();
        req.datalist = list;
        SocketMgr.Ins.SendMessageBin(req);
        this.Close();
    }

    private initSelectUI(){
        let size = 5;
        let cnt = HuYouQualityProxy.Ins.getListQuaByType(1).length;
        let cellHeight = 0;
        for(let i = cnt-1;i >= 0;i--){
            let cfg:Configs.t_Blessing_Soul_Quality_dat =  HuYouQualityProxy.Ins.GetDataById(i+1);
            let _item:HuYouQuickBtn = new HuYouQuickBtn();
            _item.y = (cnt-i - 1) * _item.height + size;
            _item.x = size;
            this._ui.listcontainer.addChild(_item);
            cellHeight = _item.height;
            _item.cfg = cfg;
            this.updateCell(_item.tf,cfg);
            _item.btn.clickHandler = new Laya.Handler(this,this.onItemClickHandler,[cfg,cnt - i - 1]);
            this.btnlist.push(_item);
            this.cfglist.push(cfg);
        }

        this.curIndex = this.cfglist.length - 1;
        this._ui.listcontainer.height = cnt * cellHeight + size * 2;
        this._ui.listcontainer.y = this._ui.listarea.y - this._ui.listcontainer.height;

        this._ui.listarea.on(Laya.Event.CLICK,this,this.onAreaHander);
    }

    private updateCell(label:Laya.Label,cfg:Configs.t_Blessing_Soul_Quality_dat){
        label.text = cfg.f_SoulQualityName + "的及以下";
        label.color = `#${cfg.f_Color}`;
    }

    private onItemClickHandler( cfg:Configs.t_Blessing_Soul_Quality_dat,_index:number){
        this._ui.listcontainer.visible = false;
        this.selectIndex(_index);
    }

    private selectIndex(index:number){
        let cfg;
        for(let i = 0;i < this.btnlist.length;i++){
            let cell = this.btnlist[i];
            if(index == i){
                cfg = cell.cfg;
                break;
            }
        }
        if(cfg){
            this.curIndex = index;
            this.updateCell(this._ui.listtf,cfg);
        }
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

    protected onInit() {
        this._ui.listcontainer.visible = false;
        this._ui.sanjiao.rotation = 0;
        this.selectIndex(this.curIndex);
    }

    protected onExit() {
    }
}