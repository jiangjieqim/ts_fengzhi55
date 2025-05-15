import { stArtifact, stArtifactLog, stArtifactPack, stArtifactSuit, stCellValue } from "../../../../network/protocols/BaseProto";
import { EFuncDef } from "../../main/model/EFuncDef";
import { MainModel } from "../../main/model/MainModel";
import { TaskModel } from "../../main/model/TaskModel";
import { ItemProxy } from "../../main/proxy/ItemProxy";
import { ShenBinExpProxy, ShenBinListProxy, ShenBinPackProxy } from "../proxy/ShenBinProxy";

export class ShenBinModel extends Laya.EventDispatcher{
    private static _ins:ShenBinModel;
    public static get Ins(){
        if(!this._ins){
            this._ins = new ShenBinModel();
        }
        return this._ins;
    }

    public static UPDATA_SHENBIN:string = "UPDATA_SHENBIN";
    public static UPDATA_LOGVIEW:string = "UPDATA_LOGVIEW";
    public static UPDATA_PACK:string = "UPDATA_PACK";
    public static OPEN_ITEM:string = "OPEN_ITEM";
    public static OPEN_ITEMLIST:string = "OPEN_ITEMLIST";
    public static PLAY_EFFECT:string = "PLAY_EFFECT";
    public static PLAY_TENEFFECT:string = "PLAY_TENEFFECT";
    public static UPDATA_TZ:string = "UPDATA_TZ";

    public dataList:stArtifact[];
    public dataLogList:stArtifactLog[];
    public openItem:stCellValue;
    public openItemList:stCellValue[];
    public dataPackList:stArtifactPack[];
    public tzList:stArtifactSuit[];

    public isDotMain(){
        if(TaskModel.Ins.isFuncOpen(EFuncDef.Confraternity)){
            if(ShenBinModel.Ins.isFreeDot() || ShenBinModel.Ins.isLvDot() || this.isTZRedTip()){
                return true;
            }
        }
        return false;
    }

    public isFreeDot(){
        if(ShenBinModel.Ins.dataPackList){
            let arr = ShenBinPackProxy.Ins.List;
            for(let i:number=0;i<arr.length;i++){
                if(arr[i].f_PurchaseID == 0){
                    let vo = ShenBinModel.Ins.dataPackList.find(ele => ele.id == arr[i].f_id);
                    if(vo && vo.num == 0){
                        return true;
                    }
                }
            }
        }
        return false;
    }

    public isLvDot(){
        if(this.dataList){
            for(let i:number=0;i<this.dataList.length;i++){
                let cfg = ShenBinListProxy.Ins.getCfgById(this.dataList[i].artifactId);
                let ecfg = ShenBinExpProxy.Ins.getCfgByQuaAndLv(cfg.f_ArtifactQua,this.dataList[i].level);
                let eNextcfg = ShenBinExpProxy.Ins.getCfgByQuaAndLv(cfg.f_ArtifactQua,this.dataList[i].level + 1);
                if(eNextcfg){
                    let icfg = ItemProxy.Ins.getCfg(cfg.f_itemId);
                    let num = MainModel.Ins.mRoleData.getVal(icfg.f_itemid);
                    if(num >= parseInt(ecfg.f_pieces)){
                        return true;
                    }
                }
            }
        }
        return false;
    }

    public isTZRedTip(){
        if(!this.tzList){
            return false;
        }
        for(let i:number=0;i<this.tzList.length;i++){
            if(this.tzList[i].state == 1){
                return true;
            }
        }
        return false;
    }

    public getTZSt(st:string){
        let arr = st.split("|");
        let num = 0;
        for(let i:number=0;i<arr.length;i++){
            let data:stArtifact = ShenBinModel.Ins.dataList.find(ele => ele.artifactId == parseInt(arr[i]));
            if(data && data.level){
                num ++;
            }
        }
        return num + "/" + arr.length;
    }

    public getTZLv(st:string){
        let arr = st.split("|");
        let num = 99999;
        for(let i:number=0;i<arr.length;i++){
            let data:stArtifact = ShenBinModel.Ins.dataList.find(ele => ele.artifactId == parseInt(arr[i]));
            if(data){
                num = Math.min(num,data.level);
            }
        }
        return num;
    }
}