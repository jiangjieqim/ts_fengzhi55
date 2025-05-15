import { TimeCtlV2 } from "../../../../../frame/util/ctl/TimeCtlV2";
import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { DotManager } from "../../common/DotManager";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { ActivityModel } from "../ActivityModel";
import { ActivityEvent } from "../model/ActivityEvent";
import { ActivityVo } from "../model/ActivityVo";
import { EActivityType } from "../model/EActivityType";
import { ECardLingqu } from "./YueKaView";
class EveryDayTime{
    protected _timeCtl: TimeCtlV2;
    private tf:Laya.Label;
    private _vo: ActivityVo;
    public exit(){
        ActivityModel.Ins.off(ActivityEvent.UpdateData, this, this.updateView);
        this._timeCtl.stop();
    }
    public init(tf: Laya.Label) {
        this.tf = tf;
        ActivityModel.Ins.on(ActivityEvent.UpdateData, this, this.updateView);
        if (!this._timeCtl) {
            this._timeCtl = new TimeCtlV2(this.tf, "{0}");
        }
        this._vo = ActivityModel.Ins.getVo(EActivityType.EveryDayBorn);
        if (!this._vo) {
            this.tf.text = "";
        } else {
            this.updateTime();
        }

    }
    private updateView() {
        this.updateTime();
    }
    private updateTime() {
        this._vo = ActivityModel.Ins.getVo(EActivityType.EveryDayBorn);
        this._timeCtl.once(Laya.Event.COMPLETE, this, this.onTimeComplete);
        let sec = this._vo.endTime - TimeUtil.serverTime;
        if (sec < 0) {
            this.tf.text = "";
        } else {
            this._timeCtl.start(sec);
        }
    }

    private onTimeComplete() {
        this.tf.text = "";
        Laya.timer.once(3000,this,this.updateTime);
        // this.updateTime();
    }
}
// ui_libao_gongnenglist
export class LiBaoGongNengJiHeView extends ViewBase {
    private _ui: ui.views.huodong.ui_libao_gongnenglistUI;
    protected mMask: boolean = true;
    protected mMainSnapshot = true;
    protected autoFree:boolean = true;
    // private everyTime: EveryDayTime = new EveryDayTime();
    /**添加加载资源 */
    protected onAddLoadRes(): void {
        this.addAtlas("huodong.atlas");
    }
    /**离开处理 */
    protected onExit(): void {
        // ActivityModel.Ins.off(ActivityEvent.UpdateData,this,this.onRedHandler);
        MainModel.Ins.off(MainEvent.MonthUpdate,this,this.onMonthrefreshView);
        MainModel.Ins.off(MainEvent.AllLifeUpdate,this,this.onAllLifeRefresh);
        MainModel.Ins.off(MainEvent.Updata_TeQuanKa,this,this.upDataTeQuanKa);
        // MainModel.Ins.mainMask = false;
        // this.everyTime.exit();
    }
    /**这里在加载完资源后调用-建议只处理资源相关的逻辑*/
    protected onFirstInit(): void {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.huodong.ui_libao_gongnenglistUI();
            // ButtonCtl.CreateBtn(this._ui.meirilibaoItem, this, this.meiRiLiBao);
            this.btnList.push(
                ButtonCtl.CreateBtn(this._ui.yuekaItem, this, this.onYueKa),
                ButtonCtl.CreateBtn(this._ui.zhongshenkaItem, this, this.onZhongShen),
                ButtonCtl.CreateBtn(this._ui.tequanitem, this, this.onTeQuanClick)
            );
            this.bindClose(this._ui.close1);

            this._ui.subcon1.visible = false;
        }
    }

    /**每日礼包 */
    private meiRiLiBao() {
        ActivityModel.Ins.openFunc(EActivityType.EveryDayBorn,EViewType.MeiRiLiBao);
    }

    /**月卡 */
    private onYueKa() {
        ActivityModel.Ins.openFunc(EActivityType.t_Pack_MonthAndYear_Card,EViewType.YueKa);
    }

    /**终生卡 */
    private onZhongShen() {
        ActivityModel.Ins.openFunc(EActivityType.t_Pack_MonthAndYear_Card,EViewType.ZhongShenKa);
    }

    private onTeQuanClick(){
        ActivityModel.Ins.openFunc(EActivityType.TeQuanKa,EViewType.TeQuanKaView);
    }
/*
    private onRedHandler(){
        let _everyDay = ActivityModel.Ins.getVo(EActivityType.EveryDayBorn);
        if(ActivityModel.Ins.hasDailyListRed(_everyDay) || MainModel.Ins.isZKWCRedTip()){
            DotManager.addDot(this._ui.meirilibaoItem);
        }else{
            DotManager.removeDot(this._ui.meirilibaoItem);
        }
    }
*/
    /**初始化*/
    protected onInit(): void {
        // MainModel.Ins.mainMask = true;
        // ActivityModel.Ins.on(ActivityEvent.UpdateData,this,this.onRedHandler);
        MainModel.Ins.on(MainEvent.MonthUpdate,this,this.onMonthrefreshView);
        MainModel.Ins.on(MainEvent.AllLifeUpdate,this,this.onAllLifeRefresh);
        MainModel.Ins.on(MainEvent.Updata_TeQuanKa,this,this.upDataTeQuanKa);

        // this.everyTime.init(this._ui.meiriTimeTf);

        this.onMonthrefreshView();
        this.onAllLifeRefresh();
        // this.onRedHandler();
        this.upDataTeQuanKa();
    }

    /**终生卡 */
    private onAllLifeRefresh(){
        // zhongshengka
        let _curData = MainModel.Ins.allLife;
        if(_curData){
            this._ui.zhongshengka.visible = false;
            this._ui.zhongshenglingqu.visible = false;
            if (_curData.val == ECardLingqu.Nothing) {
                this._ui.zhongshengka.visible = true;
            }else{
                this._ui.zhongshenglingqu.visible = true;
            }

            if(_curData.val == ECardLingqu.CanGet){
                DotManager.addDot(this._ui.zhongshenkaItem)
            }else{
                DotManager.removeDot(this._ui.zhongshenkaItem);
            }
        }
    }

    /**月卡 */
    private onMonthrefreshView(){
        this._ui.yueka2.visible = false;
        this._ui.subcon.visible = false;
        let _curData = MainModel.Ins.monthCard;
        if(_curData){
            if (_curData.val == ECardLingqu.Nothing) {
                this._ui.yueka2.visible = true;
            }
            else if (_curData.val == ECardLingqu.CanGet ||
                _curData.val == ECardLingqu.AlreadyGet
                ) 
            {
                this._ui.subcon.visible = true;
                this._ui.dattf.text = _curData.subday + "";
                this.layoutMonthUI();
            }

            if(_curData.val == ECardLingqu.CanGet){
                DotManager.addDot(this._ui.yuekaItem)
            }else{
                DotManager.removeDot(this._ui.yuekaItem);
            }
        }
    }

    private layoutMonthUI(){
        this._ui.dattf.x = this._ui.img1.x + this._ui.img1.width;
        this._ui.img2.x = this._ui.dattf.x + this._ui.dattf.textField.width;
        let w = this._ui.img2.width + this._ui.img1.width + this._ui.dattf.textField.width;
        this._ui.subcon.x = (307 - w)/2;
    }

    private upDataTeQuanKa(){
        this._ui.img_tq.visible = false;
        this._ui.subcon1.visible = false;
        let _curData = MainModel.Ins.teQuanKaCard;
        if(_curData){
            if (_curData.val == ECardLingqu.Nothing) {
                this._ui.img_tq.visible = true;
            }
            else if (_curData.val == ECardLingqu.CanGet ||
                _curData.val == ECardLingqu.AlreadyGet
                ) 
            {
                this._ui.subcon1.visible = true;
                this._ui.dattf1.text = _curData.subday + "";
                this.layoutTeQuanUI();
            }

            if(_curData.val == ECardLingqu.CanGet){
                DotManager.addDot(this._ui.tequanitem)
            }else{
                DotManager.removeDot(this._ui.tequanitem);
            }
        }
    }

    private layoutTeQuanUI(){
        this._ui.dattf1.x = this._ui.img11.x + this._ui.img11.width;
        this._ui.img22.x = this._ui.dattf1.x + this._ui.dattf1.textField.width;
        let w = this._ui.img22.width + this._ui.img11.width + this._ui.dattf1.textField.width;
        this._ui.subcon1.x = (307 - w)/2;
    }
}