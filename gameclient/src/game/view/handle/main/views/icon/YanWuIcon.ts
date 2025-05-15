import { HeroHouseModel } from "../../../herohouse/HeroHouseModel";
import { GymEvent } from "../../../herohouse/model/GymEvent";
import { HuYouModel } from "../../../huyou/model/HuYouModel";
import { EFuncDef } from "../../model/EFuncDef";
import { MainViewConf } from "../new2/MainViewConf";
import { EButtonStyle, FuncSmallIcon } from "./FuncSmallIcon";
/**演武 */
export class YanWuIcon extends FuncSmallIcon{
    private _heroModel:HeroHouseModel;
    constructor(){
        super();
        this.refresh(new MainViewConf.iconCls(),EFuncDef.HeroHouse,EButtonStyle.Mid);
        this._heroModel = HeroHouseModel.Ins;
        this._heroModel.on(GymEvent.FightAnimPlayEnd,this,this.onFightAnimPlayEnd);
        this._heroModel.on(GymEvent.InvitePopUpdate,this,this.onFightAnimPlayEnd);
        this._heroModel.on(GymEvent.RemovePop,this,this.onFightAnimPlayEnd);
        this.onFightAnimPlayEnd();
    }

    private onFightAnimPlayEnd(){
        Laya.timer.once(100,this,this.upDataView);
    }
    private upDataView(){
        let str = this._heroModel.animInviteVo ? "演武中": "";
        // console.log("onFightAnimPlayEnd>>>"+str);
        this.statusLabel = str;
    }

    public update(){
        this.onFightAnimPlayEnd();
    }
}
/**赐福 */
export class CiFuIcon extends FuncSmallIcon{
    constructor(){
        super();
        this.refresh(new MainViewConf.iconCls(),EFuncDef.CiFu,EButtonStyle.Mid);
        HuYouModel.Ins.on(HuYouModel.UPDATA_AUTO,this,this.onUpdateEvt);  
        HuYouModel.Ins.on(HuYouModel.UPDATA_VIEW,this,this.onUpdateEvt);
    }
    private onUpdateEvt(){
        let v = HuYouModel.Ins.isAuto;
        this.statusLabel = v ? "祈福中": "";
    }
    public update(){
        this.onUpdateEvt();
    }
}