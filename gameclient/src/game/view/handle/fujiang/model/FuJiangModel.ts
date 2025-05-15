import { MathUtil } from "../../../../../frame/util/MathUtil";
import { stChief, stEquipAttr, stItem, stMountRelation, stRecruitChief, stSkin, stTrammelsChief } from "../../../../network/protocols/BaseProto";
import { System_RefreshTimeProxy } from "../../huodong/model/ActivityProxy";
import { HuYouModel } from "../../huyou/model/HuYouModel";
import { EFuncDef } from "../../main/model/EFuncDef";
import { EServerVersion, MainModel } from "../../main/model/MainModel";
import { TaskModel } from "../../main/model/TaskModel";
import { ItemProxy } from "../../main/proxy/ItemProxy";
import { ECellType } from "../../main/vos/ECellType";
import { FuJiangCollConProxy, FuJiangEquipAttrProxy, FuJiangFYSlotProxy, FuJiangFlagUpgradeProxy, FuJiangListProxy, FuJiangLvProxy, FuJiangSkinProxy, FuJiangSlotProxy, FuJiangStarProxy, FuJiangStarValueProxy, FuJiangSupportInheritProxy, FuJiangTrammelsChiefProxy } from "../proxy/FuJiangProxy";

export class FuJiangModel extends Laya.EventDispatcher{
    private static _ins: FuJiangModel;
    
    public static get Ins() {
        if (!this._ins) {
            this._ins = new FuJiangModel();
        }
        return this._ins;
    } 

    public static fjXY = [{x:533,y:40},{x:432,y:286},{x:297,y:400},
        {x:282,y:40},{x:161,y:286},{x:39,y:400}];
    public static fjZorder = [40,50,60,10,20,30];

    public static FUJIANG_UPDATA:string = "FUJIANG_UPDATA";//更新
    public static FUJIANG_ZHAOMU_UPDATA:string = "FUJIANG_ZHAOMU_UPDATA";//招募
    public static SELECT_FUJIANG:string = "SELECT_FUJIANG";//选择武将
    public static FUJIANG_SHIQI_UPDATA:string = "FUJIANG_SHIQI_UPDATA";//势气
    public static FUJIANG_MOUNT_UPDATA:string = "FUJIANG_MOUNT_UPDATA";//坐骑
    public static FUJIANG_ZM_DH:string = "FUJIANG_ZM_DH";//招募动画
    public static FUJIANG_ZM_DH_OK:string = "FUJIANG_ZM_DH_OK";//招募动画完成
    public static FUJIANG_STAR:string = "FUJIANG_STAR";//副将升星
    public static FUJIANG_JIBAN:string = "FUJIANG_JIBAN";//副将羁绊
    public static SELECT_JB_POS:string = "SELECT_JB_POS";

    public static FLAG_LIST:string = "FLAG_LIST";
    public static FLAG_ID:string = "FLAG_ID";
    public static FLAG_LEVEL:string = "FLAG_LEVEL";
    
    public static CHOUKA_LEVEL:string = "CHOUKA_LEVEL";

    public fujiangSelectIndex:number = 0;
    public fujiangList:stChief[];//拥有的副将列表
    public changefjList:stChief[];//拥有的副将列表
    public nextFreeUnix:number;//下次可免费招募副将的时间戳
    public freeCount:number;//剩余免费招募次数
    public recruitChief:stRecruitChief[];
    public moraleRewardNum:number;
    public mountRelationList:stMountRelation[] = [];//副将与坐骑的绑定关系(坐骑初始化和坐骑变化的时候推送)

    public oldStar:number;
    public oldAllStar:number;
    public oldStarArr:any;

    public zmNum:number;
    public quaList = [1,4,5,6,8,9]; 
    public playNum:number;
    public jbDataList:stTrammelsChief[];
    public jbPos:number;

    public isPlayStarAni:boolean;
    public isNewServer:number;

    public flagList:number[];
    public flagId:number;
    public flagSerial:number;
    public flagFight:number;

    public drawLevel:number;
    public curDrawExp:number;

    public _bo:boolean = false;
    public _itemID:number;

    //获得上阵的list(带主角)
    public getSZList(){
        let arr = [];
        for(let i:number=0;i<this.fujiangList.length;i++){
            if(this.fujiangList[i].pos){
                arr.push(this.fujiangList[i]);
            }
        }
        return arr;
    }

    //获得上阵的list(不带主角)
    public getSZNoList(){
        let arr = [];
        for(let i:number=0;i<this.fujiangList.length;i++){
            if(this.fujiangList[i].isChief == 1){
                if(this.fujiangList[i].pos){
                    arr.push(this.fujiangList[i]);
                }
            }
        }
        arr.sort((a,b)=>{
            return a.pos - b.pos;
        });
        return arr;
    }

    //获得上阵的位置
    public getSZPos(){
        let lv = MainModel.Ins.mRoleData.lv;
        let lvv:number;
        for(let i:number=1;i<7;i++){
            let cfg = FuJiangSlotProxy.Ins.getCfgById(i);
            if(cfg.f_pos_available){
                if(MainModel.Ins.serverVer == EServerVersion.Version_1){
                    lvv = cfg.f_unlocklevel_v1;
                }else{
                    if(this.isNewServer){
                        lvv = cfg.f_unlocklevelnew;
                    }else{
                        lvv = cfg.f_unlocklevel;
                    }
                }
                if(lv >= lvv){
                    let data = this.getFuJiangCfgByPos(i);
                    if(!data){
                        return i;
                    }
                }
            }
        }
        return 0;
    }

    public getFuJiangCfgById(id:number){
        if(!this.fujiangList){
            return null;
        }
        for(let i:number=0;i<this.fujiangList.length;i++){
            if(this.fujiangList[i].cheifId == id){
                return this.fujiangList[i];
            }
        }
        return null;
    }

    public getFuJiangCfgByPos(pos:number){
        for(let i:number=0;i<this.fujiangList.length;i++){
            if(this.fujiangList[i].pos && this.fujiangList[i].pos == pos){
                return this.fujiangList[i];
            }
        }
        return null;
    }

    public getFuJiangSkin(id:number,skinId:number = 0):stSkin{
        let skinID;
        if(skinId > 0){
            skinID = skinId;
        }else{
            let cfg = this.getFuJiangCfgById(id);
            if(cfg){
                skinID = cfg.skinId;
            }else{
                let cCfg = FuJiangListProxy.Ins.getCfgById(id);
                skinID = cCfg.f_equipId;
            }
        }
        let sCfg = FuJiangSkinProxy.Ins.getCfgById(skinID);
        let skin:stSkin = new stSkin();
        skin.f_HeadID = sCfg.f_equipmentid;
        skin.f_WeaponID = sCfg.f_equipmentid;
        skin.f_ShieldID = sCfg.f_equipmentid;
        skin.f_BodyID = sCfg.f_equipmentid;
        return skin;
    }

    public getFuJiangList(type:number = 0){
        let arr = [];
        let i:number;
        for(i=0; i<this.fujiangList.length; i++){
            if(this.fujiangList[i].isChief == 1){
                let cfg = FuJiangListProxy.Ins.getCfgById(this.fujiangList[i].cheifId);
                if(type == 0 || type == cfg.f_country){
                    arr.push(this.fujiangList[i]);
                }
            }
        }
        arr.sort(this.onSort);
        return arr;
    }

    private onSort(a:stChief,b:stChief){
        let aCfg = FuJiangListProxy.Ins.getCfgById(a.cheifId);
        let bCfg = FuJiangListProxy.Ins.getCfgById(b.cheifId);
        if(aCfg.f_cheifQuality > bCfg.f_cheifQuality){
            return -1;
        }else if(aCfg.f_cheifQuality < bCfg.f_cheifQuality){
            return 1;
        }else{
            if(aCfg.f_id > bCfg.f_id){
                return 1;
            }else if(aCfg.f_id < bCfg.f_id){
                return -1;
            }else{
                return 0;
            }
        }
    }

    public getFightNum(){
        let num:number = 0;
        if(this.fujiangList){
            for(let i:number=0;i<this.fujiangList.length;i++){
                if(this.fujiangList[i].isChief == 1){
                    if(this.fujiangList[i].pos){
                        num += this.fujiangList[i].cheifFight;
                    }
                }
            }
        }
        return num + MainModel.Ins.mRoleData.getBattleValue();
    }

    public getShowLv(lv:number){
        let nnn = parseInt(System_RefreshTimeProxy.Ins.getVal(94));
        if(nnn == 1){
            if(MainModel.Ins.mRoleData.lv - lv < 10){
                return 0;
            }
        }
        let num:number = 0;
        let num1:number = 0;
        let val = MainModel.Ins.mRoleData.getVal(ECellType.FuJiangLv);
        for(let i:number=0;i<10;i++){
            let cc = FuJiangLvProxy.Ins.getCfgByLv(lv + i);
            if(cc){
                num += parseInt(cc.f_upgradecost.split("-")[1]);
                if(val >= num){
                    num1 ++;
                }
            }
        }
        if(num1 >= 10){
            return num;
        }
        return 0;
    }

    public getAllStarNum(){
        let num = 0;
        for(let i:number=0;i<this.fujiangList.length;i++){
            num += this.fujiangList[i].star;
        }
        return num;
    }

    public getStarAttr(cheifId:number,arrId:number,lv:number,starLv:number):number{
        let cfg = FuJiangListProxy.Ins.getCfgById(cheifId);
        let attCfg = FuJiangStarValueProxy.Ins.getCfgByAttid(arrId);

        let starweight = attCfg.f_starweight / 10000;
        let equipweight = attCfg.f_equipweight / 10000;
        let zy = parseInt(attCfg["f_" + cfg.f_cheifClass]) / 10000;

        let val = (lv*attCfg.f_levelweight+cfg.f_cheifQuality*attCfg.f_quaweight)*
        (cfg.f_cheifQuality*equipweight)*(1+(starLv*starweight))*(1+zy);
        return val = Math.ceil(val);
    }

    public getMountDataByCheifId(cheifId:number){
        return this.mountRelationList.find(ele => ele.cheifId == cheifId);
    }

    public getMountDataByMountId(mountId:number){
        return this.mountRelationList.find(ele => ele.mountId == mountId);
    }

    public isZeroMount(){
        for(let i:number=0;i<this.mountRelationList.length;i++){
            if(this.mountRelationList[i].cheifId == -1){
                return true;
            }
        }
        return false;
    }

    public getEquipShowLv(equipStar:number,equipLevel:number){
        let numm = FuJiangEquipAttrProxy.Ins.getListByStar(equipStar).length;
        if(numm - equipLevel < 10){
            return 0;
        }
        let num:number = 0;
        let num1:number = 0;
        let val = MainModel.Ins.mRoleData.getVal(ECellType.FuJiangEquipLv);
        for(let i:number=0;i<10;i++){
            let cc = FuJiangEquipAttrProxy.Ins.getCfgByStarAndLv(equipStar,equipLevel + i);
            if(cc){
                num += parseInt(cc.f_upgradecost.split("-")[1]);
                if(val >= num){
                    num1 ++;
                }
            }
        }
        if(num1 >= 10){
            return num;
        }
        return 0;
    }

    public getIndexEff(){
        let indexEff:number = 0;
        let qua = 0;
        for(let i:number=0;i<FuJiangModel.Ins.recruitChief.length;i++){
            if(FuJiangModel.Ins.recruitChief[i].cheifId){
                let cfg = FuJiangListProxy.Ins.getCfgById(FuJiangModel.Ins.recruitChief[i].cheifId);
                qua = Math.max(qua,cfg.f_cheifQuality); 
            }
        }
        if(qua){
            let index = FuJiangModel.Ins.quaList.findIndex(ele => ele == qua) + 1;
            if(index == 6){
                let ran = MathUtil.RangeInt(0,1);
                if(ran == 0){
                    indexEff = 6;
                }else{
                    indexEff = 7;
                }
            }else{
                indexEff = index;
            }
        }else{
            indexEff = 1;
        }
        return indexEff;
    }

    //副将羁绊是否激活
    public isFJJBJH(cfg:Configs.t_Trammels_Chief_dat){
        let fjArr = cfg.f_ChiefID.split("|");
        let num = 0;
        for (let j: number = 0; j < fjArr.length; j++) {
            let fjCfg = FuJiangModel.Ins.getFuJiangCfgById(parseInt(fjArr[j]));
            if (fjCfg) {
                num += 1;
            }
        }
        if (num >= fjArr.length) {
            return true;
        }
        return false;
    }

    //************************************************副将优化*****************************************/
    public getZJFJData(){
        if(this.fujiangList){
            for(let i:number=0;i<this.fujiangList.length;i++){
                if(this.fujiangList[i].isChief == 1){
                    if(this.fujiangList[i].pos){
                        return this.fujiangList[i];
                    }
                }
            }
        }
        return null;
    }

    public getFZFJArr(){
        let arr = [];
        if(this.fujiangList){
            for(let i:number=0;i<this.fujiangList.length;i++){
                if(this.fujiangList[i].isChief == 1){
                    if(this.fujiangList[i].assistId){
                        arr.push(this.fujiangList[i]);
                    }
                }
            }
        }
        return arr;
    }

    public getFuJiangByAssid(assid:number){
        return this.fujiangList.find(ele => ele.assistId == assid);
    }

    public getFZFJJCAttr(id:number){
        let num = 0;
        let arr = FuJiangSupportInheritProxy.Ins.List;
        for(let i:number=0;i<arr.length;i++){
            let data = this.getFuJiangByAssid(arr[i].f_id);
            if(data){
                let cCfg = FuJiangListProxy.Ins.getCfgById(data.cheifId);
                let attrArr = cCfg.f_inherit.split("|");
                for(let j:number=0;j<attrArr.length;j++){
                    let idd = parseInt(attrArr[j].split(":")[0]);
                    let val = parseInt(attrArr[j].split(":")[1]);
                    if(id == idd){
                        num += val * (arr[i].f_support / 10000);
                    }
                }
            }
        }
        return num;
    }

    public getFZFJTXAttrArr() {
        let array = [];
        let arr = FuJiangSupportInheritProxy.Ins.List;
        for (let i: number = 0; i < arr.length; i++) {
            let data = this.getFuJiangByAssid(arr[i].f_id);
            if(data){
                let cCfg = FuJiangListProxy.Ins.getCfgById(data.cheifId);
                let attrArr = cCfg.f_specialattrinit.split("|");
                let starArr = cCfg.f_specialunlock.split("|");
                for(let j:number=0;j<attrArr.length;j++){
                    if(data.star >= parseInt(starArr[j])){
                        let id = parseInt(attrArr[j].split(":")[0]);
                        let val = parseInt(attrArr[j].split(":")[1]);
            
                        let lvSt = cCfg.f_specialupgrade.split("|")[j];
                        let starSt = cCfg.f_specialupstar.split("|")[j];
                        let lvNum: number = parseInt(lvSt.split(":")[1]) * (data.level - 1);
                        let starNum: number = parseInt(starSt.split(":")[1]) * (data.star - 1);
            
                        val = val + lvNum + starNum;
                        val = val * (arr[i].f_support / 10000);
                        let cell = new stEquipAttr();
                        cell.id = id;
                        cell.value = val;
                        array.push(cell);
                    }
                }
            }
        }
        return array;
    }

    //************************************************红点*****************************************/
    public isFuJiangRedTip(){
        if(!TaskModel.Ins.isFuncOpen(EFuncDef.FuJiang)){
            return false;
        }
        if(!this.fujiangList){
            return false;
        }
        if(this.tab1RedTip() || this.tab2RedTip() || this.tab3RedTip() ||
            this.tab4RedTip() || this.tab5RedTip() || this.tab6RedTip()){
                return true;
        }
        return false;
    }

    //*********************************************** 布阵红点 *********************************/
    public tab1RedTip(){
        // if(this.isFreeRed()){
        //     return true;
        // }
        return false;
    }

    public isFreeRed(){
        // if(this.freeCount){
        //     return true;
        // }
        return false;
    }
    //*********************************************** 等级红点 *********************************/
    public tab2RedTip(){
        if(this.isLvRedTip() || this.isLvStarRedTip()){
            return true;
        }
        return false;
    }

    public isLvRedTip(){
        let arr = this.getSZNoList();
        for(let i:number=0;i<arr.length;i++){
            let n = FuJiangModel.Ins.getShowLv(arr[i].level);
            if(n){
                return true;
            }
        }
        return false;
    }

    public isLvStarRedTip(){
        let arr = this.getSZNoList();
        arr = arr.concat(this.getFZFJArr());
        for(let i:number=0;i<arr.length;i++){
            if(this.isStarRedTip(arr[i].cheifId,arr[i].star)){
                return true;
            }
        }
        return false;
    }

    public isStarRedTip(cheifId:number,star:number){
        let nStarCfg = FuJiangStarProxy.Ins.getCfgByStar(star + 1);
        if(nStarCfg){
            let cfg = FuJiangListProxy.Ins.getCfgById(cheifId);
            let starCfg = FuJiangStarProxy.Ins.getCfgByStar(star);
            if(MainModel.Ins.isItemEnough(cfg.f_piecesid,starCfg.f_upstarcost_new)){
                return true;
            }
        }
        return false;
    }
    //*********************************************** 装备红点 *********************************/
    public tab3RedTip(){
        if(this.isZQLVRedTip()){
            return true;
        }
        return false;
    }

    
    public isZQLVRedTip(){
        let uCfg = FuJiangFlagUpgradeProxy.Ins.getCfgById(this.flagSerial);
        let nextUCfg = FuJiangFlagUpgradeProxy.Ins.getCfgById(this.flagSerial + 1);
        if(nextUCfg){
            if(MainModel.Ins.isItemEnoughSt(uCfg.f_flag_upgrade,false)){
                return true;
            }
        }
        return false;
    }

    public isEquipLvRedTipAll(){
        // let arr = this.getSZNoList();
        // for(let i:number=0;i<arr.length;i++){
        //     let data = arr[i].equips;
        //     for(let j:number=0;j<data.length;j++){
        //         if(this.isEquipLvRedTip(data[j].equipStar,data[j].equipLevel,data[j].partId)){
        //             return true;
        //         }
        //     }
        // }
        return false;
    }

    //单个武将
    public isEquipLvRedTipOne(cheifId:number){
        // let data = this.getFuJiangCfgById(cheifId);
        // if(data){
        //     for(let i:number=0;i<data.equips.length;i++){
        //         if(this.isEquipLvRedTip(data.equips[i].equipStar,data.equips[i].equipLevel,data.equips[i].partId)){
        //             return true;
        //         }
        //     }
        // }
        return false;
    }

    public isEquipLvRedTip(equipStar:number,equipLevel:number,partId:number){
        // let attrCfg = FuJiangEquipAttrProxy.Ins.getCfgByStarAndLv(equipStar,equipLevel);
        // let nextCfg = FuJiangEquipAttrProxy.Ins.getCfgByID(attrCfg.f_id + 1);
        // if(nextCfg){
        //     let attrSt = nextCfg["f_position" + partId];
        //     if(attrSt != ""){
        //         if(attrCfg.f_isupstage == 1){
        //             if(MainModel.Ins.isItemEnoughSt(attrCfg.f_upgradecost)){
        //                 return true;
        //             }
        //         }else{
        //             let n = this.getEquipShowLv(equipStar,equipLevel);
        //             if (n) {
        //                 return true;
        //             }
        //         }
        //     }
        // }
        return false;
    }
    //*********************************************** 坐骑红点 *********************************/
    public tab4RedTip(){
        // if(MainModel.Ins.serverVer == EServerVersion.Version_1){
        //     return false;
        // }
        if(this.isMountRedTipAll()){
            return true;
        }
        return false;
    }

    public isMountRedTipAll(){
        // if(MainModel.Ins.serverVer == EServerVersion.Version_1){
        //     return false;
        // }
        let arr = this.getSZNoList();
        for(let i:number=0;i<arr.length;i++){
            if(this.isMountRedTip(arr[i].cheifId)){
                return true;
            }
        }
        return false;
    }

    public isMountRedTip(cheifId:number){
        // if(MainModel.Ins.serverVer == EServerVersion.Version_1){
        //     return false;
        // }
        let vo = this.getMountDataByCheifId(cheifId);
        if(!vo){
            if(this.isZeroMount()){
                return true;
            }
        }
        return false;
    }
    //*********************************************** 福源红点 *********************************/
    public tab5RedTip(){
        // if(this.isDotEquipAll()){
        //     return true;
        // }
        return false;
    }

    public isDotEquipAll(){
        // let arr = this.getSZNoList();
        // for(let i:number=0;i<arr.length;i++){
        //     if(this.isDotEquipOne(arr[i].cheifId)){
        //         return true;
        //     }
        // }
        return false;
    }

    public isDotEquipOne(cheifId:number){
        // let soltNum = FuJiangFYSlotProxy.Ins.getSlotNum(cheifId);
        // for(let i:number=1;i<=soltNum;i++){
        //     let array:stItem[] = HuYouModel.Ins.getBagList(HuYouModel.BagEnmu.noSort_FY,cheifId);//背包数据
        //     let arr:stItem[] = HuYouModel.Ins.getBagList(HuYouModel.BagEnmu.sort_FY,cheifId);//装备数据
        //     let idx = arr.findIndex(item => (item as stItem).pos == i);//当前位置有没有装备
        //     if(array.length > 0 && idx == -1){
        //         return true;
        //     }
        // }
        return false;
    }

    public isDotEquip(index:number,cheifId:number){
        // let soltNum = FuJiangFYSlotProxy.Ins.getSlotNum(cheifId);
        // if(soltNum >= index){
        //     let array:stItem[] = HuYouModel.Ins.getBagList(HuYouModel.BagEnmu.noSort_FY,cheifId);//背包数据
        //     let arr:stItem[] = HuYouModel.Ins.getBagList(HuYouModel.BagEnmu.sort_FY,cheifId);//装备数据
        //     let idx = arr.findIndex(item => (item as stItem).pos == index);//当前位置有没有装备
        //     if(array.length > 0 && idx == -1){
        //         return true;
        //     }
        // }
        return false;
    }
     //*********************************************** 图鉴红点 *********************************/
     public tab6RedTip(){
        if(this.isAwardRedTip() || this.isTJStarRedTip() || this.isFJJBRedTip()){
            return true;
        }
        return false;
    }

    public isAwardRedTip(){
        let num = FuJiangCollConProxy.Ins.GetDataById(1).f_starlevel;
        if(this.moraleRewardNum >= num){
            return true;
        }
        return false;
    }

    public isTJStarRedTip(v:number=0){
        for(let i:number=0;i<FuJiangListProxy.Ins.List.length;i++){
            let cfg = FuJiangListProxy.Ins.List[i];
            if(v == 0 || cfg.f_country == v){
                let nowNum:number = 0;
                let data = FuJiangModel.Ins.getFuJiangCfgById(cfg.f_cheifid);
                if(data){
                    nowNum = data.star;
                }else{
                    nowNum = 0;
                }

                if(nowNum >= FuJiangStarProxy.Ins.maxLv){
                    continue;
                }

                let lvNum: number = -1;
                let num = 0;
                let val = MainModel.Ins.mRoleData.getVal(cfg.f_piecesid);
                let starArr = FuJiangStarProxy.Ins.List;
                for (let j: number = nowNum; j < starArr.length; j++) {
                    num += starArr[j].f_upstarcost_new;
                    if (val < num) {
                        lvNum = j;
                        break;
                    }
                }
                if(lvNum == -1){
                    lvNum = FuJiangStarProxy.Ins.maxLv;
                }
                if(lvNum - nowNum > 0){
                   return true;
                }
            }
        }
        return false;
    }

    public isFJJBRedTip(){
        if(!TaskModel.Ins.isFuncOpen(EFuncDef.FuJiangJB)){
            return false;
        }
        if(!FuJiangModel.Ins.jbDataList){
            return false;
        }

        let flag = false;
        for(let i:number=0;i<FuJiangModel.Ins.jbDataList.length;i++){
            let vo = FuJiangModel.Ins.jbDataList[i];
            if(vo.state && vo.id == 0){
                flag = true;
                break;
            }
        }

        if(!flag){
            return false;
        }

        let arr = FuJiangTrammelsChiefProxy.Ins.List;
        for(let i:number=0;i<arr.length;i++){
            if(this.isFJJBJH(arr[i])){
                let vo = FuJiangModel.Ins.jbDataList.find(ele => ele.id == arr[i].f_id); 
                if(!vo){
                    return true;
                }
            }
        }

        return false;
    }
}