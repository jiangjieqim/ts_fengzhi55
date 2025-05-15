import { StringUtil } from "../../../../../frame/util/StringUtil";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { PetExtract_req, stPet } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { VipModel, VipType } from "../../huodong/model/VipModel";
import { EFuncDef } from "../../main/model/EFuncDef";
import { MainModel } from "../../main/model/MainModel";
import { TaskModel } from "../../main/model/TaskModel";
import { ECellType } from "../../main/vos/ECellType";
import { PlayerVoFactory } from "../../main/vos/PlayerVoFactory";
import { EClientType } from "../../sdk/ClientType";
import { PetConfigProxy, PetListProxy, PetQualityProxy, PetSkillClientProxy } from "../proxy/LingChongProxy";

export class LingChongModel extends Laya.EventDispatcher{
    private static _ins: LingChongModel;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new LingChongModel();
        }
        return this._ins;
    } 

    public static Updata_LingChong:string = "Updata_LingChong";
    public static Updata_ChouKa:string = "Updata_ChouKa";
    public static UPDATA_NEW_XM:string = "UPDATA_NEW_XM";
    public static UPDATA_EQUIP_XM:string = "UPDATA_EQUIP_XM";
    public static UPDATA_LEVEL_XM:string = "UPDATA_LEVEL_XM";
    public static UPDATA_XM_LOCK:string = "UPDATA_XM_LOCK";
    public static REMOVE_LingChong:string = "REMOVE_LingChong";

    public nextFreeUnix:number;//下次可免费招募副将的时间戳
    public freeCount:number;//剩余免费招募次数
    public baoDi:number;//抽取保底剩余
    public petDataList:stPet[];//宠物列表
    public xmLockIds:number[];
    public slstate:number;

    public ckList:number[][] = [];
    public ckList1:number[][] = [];

    public isRedTip(){
        if(!TaskModel.Ins.isFuncOpen(EFuncDef.LingChong)){
            return false;
        }
        if(!this.petDataList){
            return false;
        }
        if(this.isFreeRedTip()){
            return true;
        }
        return false;
    }

    public isFreeRedTip(){
        if(this.freeCount){
            return true;
        }
        return false;
    }

    public getSkillLv(star:number){
        return star + 1;
    }

    public getPetListByType(type:number){
        let array = [];
        let arr = PetListProxy.Ins.List;
        for(let i:number=0;i<arr.length;i++){
            if(type == 0 || type == arr[i].f_pettype){
                array.push(arr[i]);
            }
        }
        return array;
    }

    public getSZPetData():stPet{
        if(this.petDataList){
            return this.petDataList.find(ele => ele.onBattle == 1);
        }
        return null;
    }

    public getAttrArr(id:number,lv:number,star:number){
        let cfg:Configs.t_Pet_List_dat = PetListProxy.Ins.getCfgById(id);
        let qCfg = PetQualityProxy.Ins.getCfgById(cfg.f_petquality);
        let str = qCfg.f_initivalue + "|";
        let attArr = qCfg.f_upgradevalue.split("|");
        for(let i:number=0;i<attArr.length;i++){
            let arr = attArr[i].split(":");
            str += arr[0] + ":" + parseInt(arr[1]) * lv + "|";
        }
        attArr = qCfg.f_upstarvalue.split("|");
        for(let i:number=0;i<attArr.length;i++){
            let arr = attArr[i].split(":");
            str += arr[0] + ":" + parseInt(arr[1]) * star + "|";
        }

        if(str.length > 0){
            str = str.substr(0,str.length -1);
        }
        return PlayerVoFactory.mergeAttr(str);
    }

    public petSort(a:stPet,b:stPet){
        let aCfg:Configs.t_Pet_List_dat = PetListProxy.Ins.getByPetID(a.petId);//PetListProxy.Ins.GetDataById(a.petId);
        let bCfg:Configs.t_Pet_List_dat = PetListProxy.Ins.getByPetID(b.petId);//PetListProxy.Ins.GetDataById(b.petId);
        if(aCfg.f_petquality > bCfg.f_petquality){
            return -1;
        }else if(aCfg.f_petquality < bCfg.f_petquality){
            return 1;
        }else{
            if(a.petStar > b.petStar){
                return -1;
            }else if(a.petStar < b.petStar){
                return 1;
            }else{
                if(a.petLevel > b.petLevel){
                    return -1;
                }else if(a.petLevel < b.petLevel){
                    return 1;
                }else {
                    if(a.petId > b.petId){
                        return 1;
                    }else if(a.petId < b.petId){
                        return -1;
                    }else{
                        return 0;
                    }
                }
            }
        }
    }

    public getSkillDec(id:number,lv:number){
        let sCfg = PetSkillClientProxy.Ins.getCfgById(id);
        let arr = sCfg.f_initvalue.split("|");
        let arr1 = sCfg.f_valuenum.split("|");
        let arr2 = [];
        for(let i:number=0;i<arr.length;i++){
            let num = (parseInt(arr[i]) + (parseInt(arr1[i]) * (lv - 1))) / 100;
            arr2.push(num + "%");
        }
        return StringUtil.format(sCfg.f_skillintro,arr2);
    }

    public _sel:boolean = false;
    public _bo:boolean = false;
    public getPetAction(sel:boolean,type: number,bo:boolean = false) {
        if(type != 1){
            this._sel = sel;
            this._bo = bo;
        }
        let req: PetExtract_req = new PetExtract_req();
        if (sel) {
            req.itemId = ECellType.GOLD;
            req.type = type;
            SocketMgr.Ins.SendMessageBin(req);
        } else {
            let num: number = MainModel.Ins.mRoleData.getVal(ECellType.LingChouZM);
            let cfg = PetConfigProxy.Ins.List[0];
            if (num >= parseInt(cfg.f_singleprice.split("-")[1])) {
                req.itemId = ECellType.LingChouZM;
                req.type = type;
                SocketMgr.Ins.SendMessageBin(req);
            } else {
                E.ViewMgr.Open(EViewType.LingChongGMView);
            }
        }
    }

    public isBagMax(num:number){
        let len;
        if(initConfig.clienttype == EClientType.Discount){
            len = VipModel.Ins.getVipTQByType(VipType.PetBag);
        }else{
            len = PetConfigProxy.Ins.List[0].f_bagmax;
        }
        if(LingChongModel.Ins.petDataList.length + num > len){
            return true;
        }
        return false;
    }
}