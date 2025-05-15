import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { EClientType } from "../../sdk/ClientType";
import { ActivityModel } from "../ActivityModel";
import { ActivityEvent } from "../model/ActivityEvent";
import { t_Purchase_PriceProxy } from "../model/ActivityProxy";
import { EActivityType } from "../model/EActivityType";
import { t_Purchase_EasyPay } from "../model/t_Purchase_EasyPay";
import { ESkinRateBtn, RateBtn01Ctl } from "./RateBtn01Ctl";

interface IAutoRateSkin extends Laya.View {
    disbtn: ui.views.huodong.ui_01rate_btnUI;
}
/**一键购买 */
export class AutoRateBtn {

    /**工厂方法创建 */
    public static Create(parent?: IAutoRateSkin, uid?: number) {
        return new AutoRateBtn(parent, uid);
    }

    private cfg: Configs.t_Purchase_Price_dat;
    private rate: RateBtn01Ctl;
    private btn: ui.views.huodong.ui_01rate_btnUI;
    /**活动流水号 */
    private uid: number;
    private easyCfg:Configs.t_Purchase_EasyPay_dat;

    getPurcCfg(cell:Configs.t_Purchase_EasyPay_dat){
        if(initConfig.clienttype == EClientType.Discount && cell && !cell.f_Close){
            return t_Purchase_PriceProxy.Ins.GetDataById(cell.f_Purchase);
        }
    }

    constructor(parent?: IAutoRateSkin, uid?: number) {
        if(parent){
            this.refresh(parent.disbtn,uid);
        }
    }

    refresh(btn: ui.views.huodong.ui_01rate_btnUI, uid: number,type:number=0){
        this.dispose();
        // let btn: ui.views.huodong.ui_01rate_btnUI = parent.disbtn;
        if(type){
            this.easyCfg = t_Purchase_EasyPay.Ins.getPurchaseCfgByType(uid,type);
        }else{
            this.easyCfg = t_Purchase_EasyPay.Ins.getPurchaseCfg(uid);
        }
        let cfg = this.getPurcCfg(this.easyCfg);


        if (btn) {
            if (!cfg) {
                btn.visible = false;//配置中没有
                return;
            }
            this.cfg = cfg;
            this.uid = uid;
            this.btn = btn;
            this.btn.lb.text = E.getLang("combopack03");
            this.rate = new RateBtn01Ctl(this.btn, this, this.onClickHandler, ESkinRateBtn.Yellow,true);
            // btn.on(Laya.Event.DISPLAY, this, this.onDisplay);
            // btn.on(Laya.Event.UNDISPLAY, this, this.onUnDisplay);

            ActivityModel.Ins.on(ActivityEvent.UpdateData,this,this.onRefresh);
            MainModel.Ins.on(MainEvent.OneClickPurchase,this,this.onRefresh);
            this.onInit();
        
			DebugUtil.drawTF(btn,this.cfg.f_id+"","#00ff00");
		}
    }

    private onClickHandler() {
        LogSys.Log(`your click purchase: ${this.cfg.f_id}`);
        ActivityModel.Ins.recharge(this.cfg.f_id);
    }

    // private onDisplay() {
    //     ActivityModel.Ins.on(ActivityEvent.UpdateData,this,this.onRefresh);
    //     this.onInit();
    // }
    // private onUnDisplay() {
    //     ActivityModel.Ins.off(ActivityEvent.UpdateData,this,this.onRefresh);
    // }


    private onRefresh(){
        this.onInit();
    }

    private onInit() {
        this.rate.cfg = this.cfg;
        let _vo = ActivityModel.Ins.getVo(EActivityType.OnePushPackage);
        if (_vo && this.easyCfg) {
            let status: number = _vo.getParam1(this.easyCfg.f_id);
            switch (status) {
                case 0:
                    this.rate.btnCtl.grayMouseDisable = true;
                    break;
                case 2:
                    this.rate.btnCtl.grayMouseDisable = false;
                    break;
            }
        }
    }

    dispose(){
        ActivityModel.Ins.off(ActivityEvent.UpdateData,this,this.onRefresh);
        MainModel.Ins.off(MainEvent.OneClickPurchase,this,this.onRefresh);
        if(this.rate){
            this.rate.dispose();
        }
    }
}