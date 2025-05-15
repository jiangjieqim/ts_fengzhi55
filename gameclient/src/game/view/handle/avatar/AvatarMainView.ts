import { HuanZhuangModel } from "../huanzhuang/HuanZhuangModel";
import { HuanZhuangEvent } from "../huanzhuang/vos/HuanZhuangEvent";
import { MainEvent } from "../main/model/MainEvent";
import { MainModel } from "../main/model/MainModel";
import { ZuoQiEvent } from "../zuoqi/vos/ZuoQiEvent";
import { ZuoQiModel } from "../zuoqi/ZuoqiModel";
import { AvatarMainSkinView } from "./AvatarBaseView";
/**
 * 主角
 */
export class AvatarMainView extends AvatarMainSkinView{
    private model:MainModel;
    private _zqModel:ZuoQiModel;
    private _showHorse:boolean;
    /**
     * @param showHorse 是否有马
     */
    constructor(showHorse:boolean = true){
        super();
        this._showHorse = showHorse;
        this._zqModel = ZuoQiModel.Ins;
        this.model = MainModel.Ins;
        this.equipList = this.model.getEquipList();
        if(showHorse){
            this.rideId = this._zqModel.rideVo.rideId;
        }
        this.wingId = this.model.wingId;
        this.initRes();
    }

    private onEquipChange(){
        this.refreshSkin();
    }

    public start(){
        super.start();
        if(this._showHorse){
            this._zqModel.on(ZuoQiEvent.RideOwnerInfoUpdate,this,this.onRideOwnerInfoUpdate);
        }
        this.model.on(MainEvent.EquipChange,this,this.onEquipChange);
        this.model.on(MainEvent.UpdateWingId,this,this.onWingUpdate);
        HuanZhuangModel.Ins.on(HuanZhuangEvent.UpdateStyle,this,this.onUpdateStyle);
        this.onHuanZhuanEvt();
    }

    private onUpdateStyle(){
        this.onHuanZhuanEvt();
    }
    private onHuanZhuanEvt(){
        this.onEquipChange();
        if(this._showHorse){
            this.onRideOwnerInfoUpdate();
        } 
        this.onWingUpdate();
    }
    /**坐骑更新 */
    private onRideOwnerInfoUpdate(){
        //let style = this.getOtherStyle(EEquipType.ZuoQi,this._zqModel.rideVo.rideId);
        this.updateRide(this._zqModel.rideVo.mainid);
    }
    protected removeAllLis(){
        if(this._showHorse){
            this._zqModel.off(ZuoQiEvent.RideOwnerInfoUpdate,this,this.onRideOwnerInfoUpdate);
        }
        this.model.off(MainEvent.EquipChange,this,this.onEquipChange);
        this.model.off(MainEvent.UpdateWingId,this,this.onWingUpdate);
        HuanZhuangModel.Ins.off(HuanZhuangEvent.UpdateStyle,this,this.onUpdateStyle);
    }
    // public stop(){
    //     super.stop();
    //     this.removeAllLis();
    // }

    private onWingUpdate(){
        this.updateWing(this.model.wingId);
    }
}