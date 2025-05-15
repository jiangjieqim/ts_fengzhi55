import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { Adventure_Boss_req } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import {DotManager} from "../../common/DotManager";
import { ItemViewFactory } from "../model/ItemViewFactory";
import { MainModel } from "../model/MainModel";
import { AdventureBossProxy } from "../proxy/AdventureBossProxy";
import { SoltItemView2 } from "./icon/SoltItemView";
/**野外boss item */
export class YeWaiItemViewNew extends ui.views.maoxian.ui_maoxian2_item11UI {
    private _saoDan: ButtonCtl;
    private _tiaozhan: ButtonCtl;
    private model: MainModel;
    private _cfg:Configs.t_Adventure_Boss_dat;

    constructor() {
        super();
        this.model = MainModel.Ins;

        this._saoDan = ButtonCtl.Create(this.saodanbtn, new Laya.Handler(this, this.onSaoDanHandler));
        this._tiaozhan = ButtonCtl.Create(this.challenge, new Laya.Handler(this, this.onTiaozhan));
        // this.yitongguantf.autoSize = true;
    }

    private onSaoDanHandler() {
        //扫荡
        if (this.model.isCanSweep) {
            E.ViewMgr.Open(EViewType.YeWaiSweep);
        } else {
            E.ViewMgr.ShowMidLabel(E.LangMgr.getLang("SweepTimeNotEnough"));
        }
    }
    private onTiaozhan(){
        let req:Adventure_Boss_req = new Adventure_Boss_req();
        req.type = 1;
        req.f_id = this._cfg.f_id;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private set tipsLabel(str:string){
        this.yitongguantf.text = str;
    }

    public setData(_cfg:Configs.t_Adventure_Boss_dat){
        this._cfg = _cfg;
        this._saoDan.visible = false;
        // this.yijibai.visible = false;
        this._tiaozhan.visible = false;
        // this._notOpen.visible = false;

        ////////////////////////////////////////////////////////
        let _curId = this.model.adventureBossData.f_id;
        let nextCfg:Configs.t_Adventure_Boss_dat = AdventureBossProxy.Ins.getNext(_curId);
        
        this.nametf.text = _cfg.f_BossName;
        this.yitongguan.visible = false;
        this.tipsLabel = "";
        this.unlockTf.text = "";

        // this.slot.setData(_cfg.f_FirstRewards);
        
        let showSaoDan:boolean  = false;
        let lv = this.model.mRoleData.lv;
        if(lv < _cfg.f_OpenLimit){

            // this._notOpen.visible = true;
            this.unlockTf.text = `解锁等级:${_cfg.f_OpenLimit}`;

            // this.tf4.text = `解锁等级:${_cfg.f_OpenLimit}`;
            // this.tf3.text = ``;
        } else {

            if (nextCfg && nextCfg.f_id == _cfg.f_id) {
                this._tiaozhan.visible = true;
            } else {

                if (_curId == _cfg.f_id) {
                    // if(this.model.adventureBossData.cnt 
                    this._saoDan.visible = true;
                    showSaoDan = true;
                } else if (_curId > _cfg.f_id) {
                    // this.yijibai.visible = true;
                    this.tipsLabel = `已击败`;
                }else{
                    // this._notOpen.visible = true;
                    // this.tf4.text = ``;
                    this.tipsLabel = `未开启`;
                }
            }
        }
        let itemStr:string = "";
        if (showSaoDan) {
            let cfg: Configs.t_Adventure_Boss_dat = AdventureBossProxy.Ins.GetDataById(this.model.adventureBossData.f_id);
            itemStr = cfg.f_RaidsReward;
        } else {
            itemStr = _cfg.f_FirstRewards;
        }
        ItemViewFactory.renderItemSlots(this.rewardCon, itemStr, null, 1.0, "left", SoltItemView2, "SoltItemView2");
        if(this.yitongguantf.text.length > 0 || this.unlockTf.text.length > 0){
            this.yitongguan.visible = true;
        }else{
            this.yitongguan.visible = false;
        }

        if (this._saoDan.visible) {
            if(MainModel.Ins.hasFreeYeWaiRed){
                DotManager.addDot(this._saoDan.skin);
            }else{
                DotManager.removeDot(this._saoDan.skin);
            }
        }
    }
}