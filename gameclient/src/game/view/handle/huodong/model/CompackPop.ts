import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { MainModel } from "../../main/model/MainModel";
import { EClientType } from "../../sdk/ClientType";
import { ActivityModel } from "../ActivityModel";
import { EActivityType } from "./EActivityType";
/**套餐礼包 */
export class CompackPop{
    start(){
        let _pop:boolean = false;
        if(initConfig.clienttype == EClientType.Discount){
            let vo = ActivityModel.Ins.getVo(MainModel.Ins.newPay.activityType);            
            if(vo){
                let _cfgId = vo.getNewPlayerCfgId();
                let isMax:boolean = false;
                if(_cfgId == 0){
                    isMax = true;
                }

                if(isMax){
                    //新人礼包不可买了不弹出
                    //新人已经买完，===》检测套餐礼包
                    MainModel.Ins.discountPack.onComboPack();
                    return;
                }else{
                    _pop = true;
                }
            }
        }else{
            _pop = true;
        }
        if(_pop){
            E.ViewMgr.Open(EViewType.NewPlayPackage);
        }
    }

    /**新人礼包未买完*/
    get isNotBuyAll(){
        let vo = ActivityModel.Ins.getVo(MainModel.Ins.newPay.activityType);            
        if(vo){
            let _cfgId = vo.getNewPlayerCfgId();
            let isMax:boolean = false;
            if(_cfgId == 0){
                isMax = true;
            }
            if(isMax){
                //全部买完了
                return;
            }
            return true;
        }
    }
}