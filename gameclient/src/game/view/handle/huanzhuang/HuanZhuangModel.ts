import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { EViewType } from "../../../common/defines/EnumDefine";
import { E, G } from "../../../G";
import { MSGID } from "../../../network/MSGID";
import { reloadEquipUpdate_revc, reloadEquip_revc, stReloadEquip, stStyle, StyleUpdate_revc, suitEquipList_revc } from "../../../network/protocols/BaseProto";
import { t_Custom_CostumesProxy } from "../huodong/model/ActivityProxy";
import { EFuncDef } from "../main/model/EFuncDef";
import { MainModel } from "../main/model/MainModel";
import { RedEnum } from "../main/model/RedEnum";
import { RedUpdateModel } from "../main/model/RedUpdateModel";
import { TaskModel } from "../main/model/TaskModel";
import { EEquipType } from "../main/vos/ECellType";
import { PlayerVoFactory } from "../main/vos/PlayerVoFactory";
import { HuanZhuangEvent } from "./vos/HuanZhuangEvent";
import { HuanZhuangVo } from "./vos/HuanZhuangVo";

/**换装模块 */
export class HuanZhuangModel extends BaseModel{
    public dataList:stReloadEquip[] = [];
    /**已经解锁的套装id列表*/
    public suitList:number[] = [];
    /**当前幻化的角色形象 */
    public styleList:stStyle[] = [];
    /**已经解锁的装备列表 */
    public unlockList:HuanZhuangVo[] = [];
    private static _ins:HuanZhuangModel;
    
    public static get Ins(){
        if(!this._ins){
            this._ins = new HuanZhuangModel();
        }
        return this._ins;
    }
    public initMsg(): void{
        E.MsgMgr.AddMsg(MSGID.ReloadEquipRevc, this.onReloadEquipRevc,this);
        E.MsgMgr.AddMsg(MSGID.SuitEquipListRevc, this.onSuitEquipListRevc,this);
        E.MsgMgr.AddMsg(MSGID.StyleUpdate, this.onStyleUpdate,this);
        E.MsgMgr.AddMsg(MSGID.ReloadEquipUpdate,this.onReloadEquipUpdate,this);
        RedUpdateModel.Ins.on(RedUpdateModel.UPDATA,this,this.refreshRed);
    }

    /**设置红点 */
    set redDot(v: boolean) {
        if (TaskModel.Ins.isFuncOpen(EFuncDef.SwitchStyle)) {
            // if (v) {
            // DotManager.addMainDot("icon0");
            // } else {
            // DotManager.remMainDot("icon0");
            // }
            MainModel.Ins.funcSetRed(EFuncDef.SwitchStyle,v);
        }
    }

    private onReloadEquipUpdate(revc: reloadEquipUpdate_revc) {
        let result: stReloadEquip[] = revc.datalist;
        // console.log("================onReloadEquipUpdate:",revc.datalist);
        for (let i = 0; i < result.length; i++) {
            let cell = result[i];
            let _findCell = this.dataList.find(item => item.type == cell.type);
            if (_findCell) {
                for (let n = 0; n < cell.dataList.length; n++) {
                    let val = cell.dataList[n];
                    _findCell.dataList.push(val);
                    let isOpen:boolean = true;
                    if(cell.type == EEquipType.ZuoQi && !TaskModel.Ins.isFuncOpen(EFuncDef.Ride)){
                        isOpen = false;
                    }
                    else if(cell.type == EEquipType.Wing && !TaskModel.Ins.isFuncOpen(EFuncDef.Wing)){
                        isOpen = false;
                    }
                    if(isOpen){
                        RedUpdateModel.Ins.saveEquipRed(cell.type,val);
                    }
                }
            }
        }
        this.refreshData();

        //弹出效果
        if (MainModel.Ins.isInitAlready) {
            let l = t_Custom_CostumesProxy.Ins.List;
            for(let i = 0;i < l.length;i++){
                let cfg:Configs.t_Custom_Costumes_dat = l[i];
                let val = RedUpdateModel.Ins.getValByID(RedEnum.SUIT_ID + cfg.f_Costumesid);
                if(val == 0 && this.isCanActive(cfg)){
                    E.ViewMgr.Open(EViewType.UnlockEquip,null,cfg.f_Costumesid);
                    break;
                }
            }
        }
    }
    public onInitCallBack():void{
        this.dataList = [];
        this.styleList = [];
        this.suitList = [];
    }
    /**激活了的套装id列表 */
    private onSuitEquipListRevc(revc:suitEquipList_revc){
        // let newId:number = 0;
        // for(let i = 0;i < revc.datalist.length;i++){
        //     let id = revc.datalist[i];
        //     if(this.suitList.indexOf(id)==-1){
        //         newId = id;
        //         break;
        //     }
        // }
        this.suitList = revc.datalist;
        this.refreshRed();
        this.event(HuanZhuangEvent.SuitUpdate);
        
        // if (MainModel.Ins.isInitAlready && newId > 0) {
        //     E.ViewMgr.Open(EViewType.UnlockEquip,null,newId);
        // }
    }

    private mergeList(l1:number[],l2:number[]){
        for(let i = 0;i < l2.length;i++){
            let val:number = l2[i];
            if(l1.indexOf(val)==-1){
                l1.push(val);
            }
        }
    }
    private refreshData(){
        let l:HuanZhuangVo[] = [];
        for(let i = 0;i < this.dataList.length;i++){
            let vo:stReloadEquip = this.dataList[i];
            for(let n = 0; n < vo.dataList.length;n++){
                let val:number = vo.dataList[n]
                let cell:HuanZhuangVo = new HuanZhuangVo();
                cell.serverIndex = n;
                cell.equipStyle = val;
                cell.equipType = vo.type;
                l.push(cell);
            }
        }
        this.unlockList = l;
        this.event(HuanZhuangEvent.UnLockListUpdate);
        // console.log(this.dataList);
        this.refreshRed();
    }

    public refreshRed(){
        //this.redDot = RedUpdateModel.Ins.localEquipList.length > 0 || this.hasSuitCanActive();
        let isRed = this.hasSuitCanActive();
        this.redDot = isRed;
    }
    updateRed(){
        this.refreshRed();
    }
    /**换装列表,上线会推送,有变化也会推送 初始化一次*/
    private onReloadEquipRevc(revc:reloadEquip_revc){
        let l1 = revc.datalist;
        // console.log(">>>>>>>>>>>>>>>>>>>> onReloadEquipRevc:",revc.datalist);
        for(let i = 0;i < l1.length;i++){
            let cell = l1[i];
            let vo = this.dataList.find(item=>item.type == cell.type);
            if(vo){
                this.mergeList(vo.dataList,cell.dataList); 
                // vo.dataList = cell.dataList;
            }else{
                this.dataList.push(cell);
            }
        }
        this.refreshData();
    }

    /**
     * 是否是第一个装备
     */
    public isFirstPos(equipType: EEquipType, equipVal: number) {
        let l = this.dataList;
        for (let i = 0; i < l.length; i++) {
            let cell = l[i];
            if (cell.type == equipType) {
                let index: number = cell.dataList.indexOf(equipVal);
                return index == 0;
            }
        }
    }

    private getMaxNum(equipType:EEquipType){
        if(equipType == EEquipType.Wing){
            return G.gameData.maxWing;
        }else if(equipType == EEquipType.ZuoQi){
            if (Laya.Utils.getQueryString("maxride")) return Laya.Utils.getQueryString("maxride");
            return G.gameData.maxRide;
        }
        return G.gameData.maxEquipStyle;
    }

    private hasStyleZero(l:HuanZhuangVo[],equipType:EEquipType){
        return l.find(cell=>cell.equipType == equipType && cell.equipStyle == 0) != undefined;
    }
    private sortHander(a:HuanZhuangVo,b:HuanZhuangVo){
        
        if(a.serverIndex < b.serverIndex ){
            return -1;
        }else if(a.serverIndex > b.serverIndex ){
            return 1;
        }
        return 0;
    }

    private sortByLocked(a:HuanZhuangVo,b:HuanZhuangVo){
        if(a.locked < b.locked){
            return -1;
        }else if(a.locked > b.locked){
            return 1;
        }
        return 0;
    }

    /**获取类型是equipType值的列表 */
    public getVoList(equipType:EEquipType){
        let _maxCnt = this.getMaxNum(equipType);//最大的位置
/*
        let l = this.unlockList;
        
        // for(let i = 0;i < _maxCnt;i++){
        //     let vo = new HuanZhuangVo();
        //     vo.equipType = equipType ;
        //     vo.equipStyle = i + 1;
        //     vo.locked = i > 5;
        //     vo.isOld = i == 0;
        //     l.push(vo);
        // }
        ////////////////////////////////////////////
        let rl:HuanZhuangVo[] = [];
        for(let i = 0;i < l.length;i++){
            let cell:HuanZhuangVo = l[i];
            if(cell.equipType == equipType && cell.equipStyle != 0){
                rl.push(cell);
            }
        }
        // if(rl.length <= 0){//补充没有装备的情况下
        if(!rl.find(cell=>cell.serverIndex == 0)){
            let vo = new HuanZhuangVo();
            vo.equipType = equipType;
            vo.equipStyle = 0;
            vo.locked = true;
            rl.push(vo);
        }
        // rl = rl.sort(this.sortHander);

        for(let i = 0;i < _maxCnt;i++){
            let equipStyle = i + 1;//样式从1开始
            let cell = rl.find(item => item.equipStyle == equipStyle);
            if(!cell){
                let vo = new HuanZhuangVo();
                vo.equipType = equipType;
                vo.equipStyle = equipStyle;
                vo.locked = true;
                rl.push(vo);
            }
        }
        if(E.Debug){
            console.log("####",this.dataList);
        }
        return rl;
*/
        let rl:HuanZhuangVo[] = [];

        for(let i = 0;i< _maxCnt;i++){
            let equipStyle = i + 1;//样式从1开始
            // this.dataList.find(cell=>cell.dataList)
            let o = this.haveEquipStyle(equipType,equipStyle);
            let vo = new HuanZhuangVo();
            vo.equipStyle = equipStyle;
            vo.equipType = equipType;
            if(o){
                vo.locked = 0;
            }else{
                vo.locked = 1;
            }
            rl.push(vo);
        }
        rl = rl.sort(this.sortByLocked);
        ////////////////////////////////////////////////////////////////
        // let style = this.getFirstEquipStyle(equipType);
        let vo = new HuanZhuangVo();
        vo.iconURL = `remote/huanzhuang/wu.png`;
        // if(style == 0){
            // let equipVo:EquipItemVo = MainModel.Ins.getWearable(equipType);
            // if(equipVo){
                // style = equipVo.equipVo.type;
            // }
        // }
        vo.equipStyle = 0;
        vo.equipType = equipType;
        let res:HuanZhuangVo[] = [];
        res.push(vo);
        res = res.concat(rl);
        return res;
    }

    // /**当前使用的样式 */
    // public getSelectStyle(equipType:number){
    // //    return this.getFirstEquipStyle(equipType);
    //     let o = this.styleList.find(cell=>cell.id== equipType);
    //     if(o){
    //         return o.style;
    //     }
    //     return 0;
    // }

    private getFirstEquipStyle(type:number){
        let o = this.dataList.find(cell=>cell.type == type);
        if(o){
            return o.dataList[0];
        }
        return 0;
    }

    public isCanActive(cfg:Configs.t_Custom_Costumes_dat){
        if(this.isSuitUnLock(cfg.f_Costumesid)){

        }else{
            let typeList:EEquipType[] = [EEquipType.Casque,EEquipType.Barde,EEquipType.Weapon,EEquipType.Shield,EEquipType.ZuoQi,EEquipType.Wing];
            for(let i = 0;i < typeList.length;i++){
                let type = typeList[i];
                let val = cfg["f_" + type];
                if (val) {
                    let findItem:HuanZhuangVo = this.unlockList.find(item=>item.equipType == type && item.equipStyle == val);
                    if(!findItem){
                        return false;
                    }
                }
            }   
            return true;
        }
    }

    private haveEquipStyle(type:number,equipStyle:number){
        let o = this.dataList.find(cell=>cell.type == type);
        if(o){
            let k1 = o.dataList.find(o1=>o1 == equipStyle);
            return k1!=undefined;
        }
    }

    /**获取幻化之后的当前形象id */
    public getEquipStyle(type:number){
        for(let i = 0;i <  this.styleList.length;i++){
            let skin:stStyle = this.styleList[i];
            if(skin.id == type){
                return skin.style;
            }
        }
        return 0;
    }

    /**该套装是否已经激活 */
    public isSuitUnLock(id:number){
        return this.suitList.indexOf(id) != -1;
    }

    /**更新用户 */
    private updateStyleList(l:stStyle[]){
        for(let i  = 0;i < l.length;i++){
            let cell:stStyle = l[i];
            let a = this.styleList.find(st => st.id == cell.id);
            if(a){
                a.style = cell.style;
            }else{
                this.styleList.push(cell);
            }
        }
    }

    /**幻化成功的时候更新 ,初始化的时候更新*/
    private onStyleUpdate(revc:StyleUpdate_revc){
        this.updateStyleList(revc.datalist);
        this.event(HuanZhuangEvent.UpdateStyle);
    }

    public get suitAttrShow(){
        let l:number[] = HuanZhuangModel.Ins.suitList;
        let str = "";
        for (let i = 0; i < l.length; i++) {
            let id: number = l[i];
            if (id) {
                let cfg: Configs.t_Custom_Costumes_dat = t_Custom_CostumesProxy.Ins.GetDataById(id);
                str += cfg.f_SuitID + "|";
            }
        }
        if(str.length > 0){
            str = str.substr(0,str.length -1);
        }
        let arr:string[] = PlayerVoFactory.mergeAttr(str);
        return arr;
    }
    public isCellCanActive(l:Configs.t_Custom_Costumes_dat[]){
        for(let i = 0;i < l.length;i++){
            if(this.isCanActive(l[i])){
                return true;
            }
        }
        return false;
    }

    /**是否有套装可以激活 */
    public hasSuitCanActive(){
        let qualist:number[] = t_Custom_CostumesProxy.Ins.qua;
        for(let i = 0;i < qualist.length;i++){
            let data = qualist[i];
            let l = t_Custom_CostumesProxy.Ins.mapList[data];
            if(this.isCellCanActive(l)){
                return true;
            }
        }
        return false;
    }
}