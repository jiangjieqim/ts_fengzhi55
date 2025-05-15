import { stPromotion } from "../../../../network/protocols/BaseProto";
import { ExpValueProxy } from "../../../../static/json/data/ExpValueProxy";
import { MainModel } from "../../main/model/MainModel";
import { UpstageRankProxy, UpstageTaskProxy } from "../proxy/JinShengProxy";

export class JinShengModel extends Laya.EventDispatcher{
    private static _ins: JinShengModel;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new JinShengModel();
        }
        return this._ins;
    } 

    public promotionLevel:number;
    public promotionList:stPromotion[];

    public static Updata_View:string = "Updata_View";

    public isRedTip(){
        if(this.isJSRedTip() || this.isLQRedTip()){
            return true;
        }
        return false;
    }

    public isJSRedTip(){
        let nextCfg:Configs.t_Upstage_Rank_dat = UpstageRankProxy.Ins.getCfgByID(this.promotionLevel + 1);
        if(nextCfg){
            let num = 0;
            for(let i:number=0;i<this.promotionList.length;i++){
                if(this.promotionList[i].rewardStatus == 1){
                    num++;
                }
            }
            if(num >= this.promotionList.length){
                let cfg:Configs.t_Upstage_Rank_dat = UpstageRankProxy.Ins.getCfgByID(this.promotionLevel);
                if(MainModel.Ins.lv > cfg.f_maxlevel){
                    return true;
                }
                let expCfg: Configs.t_ExpValue_dat = ExpValueProxy.Ins.getBylv(MainModel.Ins.lv);
                if(expCfg && MainModel.Ins.exp >= expCfg.f_ExpValue){
                    return true;
                }
            }
        }
        return false;
    }

    public isLQRedTip(){
        let nextCfg:Configs.t_Upstage_Rank_dat = UpstageRankProxy.Ins.getCfgByID(this.promotionLevel + 1);
        if(nextCfg){
            for(let i:number=0;i<this.promotionList.length;i++){
                let value:stPromotion = this.promotionList[i];
                if(value.rewardStatus == 0){
                    let cfg = UpstageTaskProxy.Ins.getCfgByID(value.taskId);
                    if(cfg.f_tasktype == 2){
                        if(value.taskContent == 1){
                            return true;
                        }
                    }else{
                        if(value.taskContent >= cfg.f_taskcontact){
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }
}