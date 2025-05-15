import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { Adventure_Boss_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { MainModel } from "../model/MainModel";
import { AdventureBossProxy } from "../proxy/AdventureBossProxy";
import { SmallItemIcon } from "./SmallItemIcon";

export class YeWaiItemView extends ui.views.maoxian.ui_bossYeWaiItemUI{
    private _saoDan:ButtonCtl;
    private _tiaozhan:ButtonCtl;
    private _notOpen:ButtonCtl;
    private slot:SmallItemIcon;
    private model:MainModel;
    private _cfg:Configs.t_Adventure_Boss_dat;
    constructor(){
        super();
        this._saoDan = ButtonCtl.Create(this.saoDanBtn,new Laya.Handler(this,this.onSaoDanHandler));
        this._tiaozhan = ButtonCtl.Create(this.tiaozhanBtn,new Laya.Handler(this,this.onTiaozhan));
        this._notOpen = ButtonCtl.Create(this.weikaifangBtn,new Laya.Handler(this,this.onWeiKaifang));
        this._notOpen.mouseEnable = false;
        this.slot = new SmallItemIcon(this.item0);
        this.model = MainModel.Ins;
    }

    private onWeiKaifang(){

    }

    private onTiaozhan(){
        let req:Adventure_Boss_req = new Adventure_Boss_req();
        req.type = 1;
        req.f_id = this._cfg.f_id;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onSaoDanHandler(){
        //扫荡
        if(this.model.isCanSweep){
            E.ViewMgr.Open(EViewType.YeWaiSweep);
        }else{
            E.ViewMgr.ShowMidLabel(E.LangMgr.getLang("SweepTimeNotEnough"));
        }
    }

    public setData(_cfg:Configs.t_Adventure_Boss_dat){
        this._cfg = _cfg;
        this._saoDan.visible = false;
        this.yijibai.visible = false;
        this._tiaozhan.visible = false;
        this._notOpen.visible = false;

        ////////////////////////////////////////////////////////
        let _curId = this.model.adventureBossData.f_id;
        let nextCfg:Configs.t_Adventure_Boss_dat = AdventureBossProxy.Ins.getNext(_curId);
        
        this.nameTf.text = _cfg.f_BossName;
        this.slot.setData(_cfg.f_FirstRewards);
        let lv = this.model.mRoleData.lv;
        if(lv < _cfg.f_OpenLimit){
            this._notOpen.visible = true;
            this.tf4.text = `解锁等级:${_cfg.f_OpenLimit}`;
            this.tf3.text = ``;
        } else {

            if (nextCfg && nextCfg.f_id == _cfg.f_id) {
                this.tiaozhanBtn.visible = true;
            } else {

                if (_curId == _cfg.f_id) {
                    // if(this.model.adventureBossData.cnt 
                    this._saoDan.visible = true;
                } else if (_curId > _cfg.f_id) {
                    this.yijibai.visible = true;
                }else{
                    this._notOpen.visible = true;
                    this.tf4.text = ``;
                    this.tf3.text = `未开启`;
                }
            }
        }
    }
}