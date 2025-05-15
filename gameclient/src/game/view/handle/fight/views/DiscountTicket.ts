import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { t_Platform } from "../../main/proxy/t_Platform";
import { EFightType } from "../../main/vos/ECellType";
import { NewAdventureModel } from "../../maoxian2/NewAdventureModel";

export class DiscountTicket extends Laya.Script {
    private ui: ui.views.maoxian.ui_fight_jiesuanUI;
    type: EFightType;
    onAwake() {
        this.ui = this.owner as any;
    }
    onStart() {
        if (this.type == EFightType.Adventure) {
            let id: number = t_Platform.Ins.curCfg.f_AutoFight;
            if (id) {
                if (initConfig.debug_f_AutoFight) {
                    id = initConfig.debug_f_AutoFight;
                }
                if(Laya.Utils.getQueryString("debug_f_AutoFight")){
                    id = parseInt(Laya.Utils.getQueryString("debug_f_AutoFight"));
                }

                if (NewAdventureModel.Ins.adventureId > id) {
                    this._timeNum = 3;
                    this.updataTime();
                }
            }
        }
    }
    onDestroy() {
        this.clear();
    }

    private _timeNum: number;

    private updataTime() {
        if (this._timeNum <= 0) {
            this.clear();
            this.ui.goonBtn.event(Laya.Event.CLICK);//继续战斗
        } else {
            this.ui.goonTf.text = E.getLang("goonfight") + "(" + this._timeNum + ")";
            Laya.timer.once(1000, this, this.updataTime);
            this._timeNum--;
        }
    }

    private clear() {
        Laya.timer.clear(this, this.updataTime);
    }
}