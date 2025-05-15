import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { AvatarFactory } from "../../avatar/AvatarFactory";
import { t_TeamFight_BossAttribute, t_TeamFight_Config } from "../../fight_monster/vos/t_TeamFight_Reward";

export class KangJiXiongShouModel extends Laya.EventDispatcher{
    private static _ins: KangJiXiongShouModel;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new KangJiXiongShouModel();
        }
        return this._ins;
    } 

    public static UPDATA_VIEW:string = "UPDATA_VIEW";

    public bossId:number;
    public endunix:number;
    public freeNum:number;//今日免费打怪次数
    public buyNum:number;//今日使用元宝打怪次数
    public adNum:number;//今日看广告打怪次数
    public totalHarm:number

    /**是否是免费 */
    public isFree() {
        let cfg = this.cfg;
        if (this.freeNum < cfg.f_FreeMax) {
            return true;
        }
        return false;
    }

    public get cfg(){
        return t_TeamFight_Config.Ins.cfg;
    }

    public get needGold(){
        let cfg = this.cfg;
        let val:number = parseInt(cfg.f_PurchaseInitial.split("-")[1]);
        return val + this.buyNum *  parseInt(cfg.f_PurchaseInc.split("-")[1]);
    }

    /**是否有广告次数 */
    public get hasADtime(){
        let cfg = this.cfg;
        if (this.adNum < cfg.f_MaxAD) {
            return true;
        }
        return false;
    }

    public get subTime() {
        let sub: number = this.endunix - TimeUtil.serverTime;
        return sub;
    }

    public getBossMonster(that?,func?){
        let cfg = t_TeamFight_BossAttribute.Ins.getByBossId(this.bossId);
        let key = cfg.f_Res;
        let url = `o/spine/${key}/${key}`;
        let _avatar = AvatarFactory.createBossMonster(url,that,func);
        return _avatar;
    }

    public get freeCount(){
        return this.cfg.f_FreeMax - this.freeNum;
    }

    public get adFreeCount(){
        return this.cfg.f_MaxAD - this.adNum;
    }
}