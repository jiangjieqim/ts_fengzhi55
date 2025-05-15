import { stTitleInfo } from "../../../../network/protocols/BaseProto";
import { ChengHaoListProxy } from "../proxy/ChengHaoProxy";

export class ChengHaoModel extends Laya.EventDispatcher{
    private static _ins: ChengHaoModel;
    
    public static get Ins() {
        if (!this._ins) {
            this._ins = new ChengHaoModel();
        }
        return this._ins;
    } 

    public static UPDATA_CHENGHAO:string = "UPDATA_CHENGHAO";
    public static UPDATA_VIEW:string = "UPDATA_VIEW";
    public static SELECT_CH:string = "SELECT_CH";
    public static UPDATA_VIEW_AWARD:string = "UPDATA_VIEW_AWARD";

    public titleList:stTitleInfo[];
    public newTitleList:any = [];
    public wearedTitleId:number;//玩家当前穿戴的称号id
    public state:number;//奖励状态 0不可领取 1可以领取
    public taskTitleId:number;//任务进行中的称号id，都完成传0
    public vals:number[];
    public selectCh:number;

    public isRedTip(){
        if(this.isAwardRedTip() || this.isNewCHRedTip()){
            return true;
        }
        return false;
    }

    public isAwardRedTip(){
        if(this.state){
            return true;
        }
        return false;
    }

    public isNewCHRedTip(){
        for(let i:number=0;i<this.newTitleList.length;i++){
            if(this.newTitleList[i].isSelect == false){
                return true;
            }
        }
        return false;
    }

    public getTitleImg(id:number){
        let cfg = ChengHaoListProxy.Ins.getCfgByID(id);
        if(cfg){
            return "o/title/" + cfg.f_titlePic;
        }
        return "";
    }
}