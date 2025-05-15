import { stGem, stGemLifeBlood } from "../../../../network/protocols/BaseProto";
import { System_RefreshTimeProxy } from "../../huodong/model/ActivityProxy";
import { EFuncDef } from "../../main/model/EFuncDef";
import { MainModel } from "../../main/model/MainModel";
import { TaskModel } from "../../main/model/TaskModel";
import { PlayerVoFactory } from "../../main/vos/PlayerVoFactory";
import { BaoShiCfgProxy, BaoShiLvProxy, BaoShiSelProxy, FaZhengListProxy, FaZhengProxy } from "../proxy/BaoShiProxy";
import { BaoShiSelVo } from "../view/ctl/BaoShiSelectCtl";

export class BaoShiModel extends Laya.EventDispatcher{
    private static _ins:BaoShiModel;
    public static get Ins(){
        if(!this._ins){
            this._ins = new BaoShiModel();
        }
        return this._ins;
    }

    //0即宝石背包,大于0即存放的法阵id
    public static BagEnmu = {
        noSort_FY:0,
        sort_FY:1
    }

    public static BAOSHI_UPDATA:string = "BAOSHI_UPDATA";
    public static BAOSHI_HC:string = "BAOSHI_HC";
    public static FAZHENG_UPDATA:string = "FAZHENG_UPDATA";
    public static DEFFAZHENG_UPDATA:string = "DEFFAZHENG_UPDATA";
    public static SELECT_MID:string = "SELECT_MID";
    public static GemFreeChange:string = "GemFreeChange";
    public static lifeBloodChange:string = "lifeBloodChange";

    public gemList:stGem[];//当前玩家拥有的宝石信息
    public mationIdList:number[];//当前玩家拥有的法阵ids,对应t_Gem_Formation_List.xlsx的f_Formationid
    public mationId:number;//当前默认的法阵id
    public selectMid:number;//选中的法阵id
    public autoHCLv:number;
    public freeNum:number = 0;//免费领取次数
    public lifeBloodList:stGemLifeBlood[];

    public isResDot(){
        if (TaskModel.Ins.isFuncOpen(EFuncDef.Gem)) {
            if(this.isDHRedTip() || this.isXMRedTip()){
                return true;
            }
        }
        return false;
    }

    public isDHRedTip(){
        let arr = System_RefreshTimeProxy.Ins.getVal(18).split("|");
        for (let i: number = 0; i < arr.length; i++) {
            let num = MainModel.Ins.mRoleData.getVal(parseInt(arr[i]));
            if (num > 0) {
                return true;
            }
        }
        return false;
    }

    public isXMRedTip(){
        if(!this.lifeBloodList){
            return false;
        }
        for(let i:number=0;i<this.lifeBloodList.length;i++){
            if(this.lifeBloodList[i].state == 1){
                return true;
            }
        }
        return false;
    }

    public getBagListBy(lv:number = 0,type:number = 0,xz:number = 0){
        let arr = [];
        for(let i:number=0;i<this.gemList.length;i++){
            if(this.gemList[i].type == 0){
                let cfg = BaoShiCfgProxy.Ins.getCfgById(this.gemList[i].id);
                if(xz == 0 || cfg.f_GemShape == xz){
                    if(type == 0 || cfg.f_GemColor == type){
                        if(lv == 0 || this.gemList[i].level == lv){
                            arr.push(this.gemList[i]);
                        }
                    }
                }
            }
        }
        arr.sort(this.onSort);
        return arr;
    }

    private onSort(a:stGem,b:stGem):number{
        if(a.level > b.level){
            return -1;
        }else if(a.level < b.level){
            return 1;
        }else{
            let cfga = BaoShiCfgProxy.Ins.getCfgById(a.id);
            let cfgb = BaoShiCfgProxy.Ins.getCfgById(b.id);
            if(cfga.f_GemColor > cfgb.f_GemColor){
                return 1;
            }else if(cfga.f_GemColor < cfgb.f_GemColor){
                return -1;
            }else{
                return 0;
            }
        }
    }

    public getEquipList(){
        let arr = [];
        for(let i:number=0;i<this.gemList.length;i++){
            if(this.gemList[i].type != 0){
                arr.push(this.gemList[i]);
            }
        }
        return arr;
    }

    public getAttrListByType(value:stGem[],type:number,fzId:number):string[]{
        let arr = [];
        for(let i:number=0;i<value.length;i++){
            let cfg = BaoShiCfgProxy.Ins.getCfgById(value[i].id);
            if(cfg.f_GemColor == type){
                arr.push(value[i]);
            }
        }

        let str = "";
        for(let ele of arr){
            let attrCfg = BaoShiLvProxy.Ins.getCfgByIdAndLv(ele.id,ele.level);
            let attArr = attrCfg.f_GemAttr.split("-");
            str += attArr[0] + ":" + attArr[1] + "|";
        }
        if(str.length > 0){
            str = str.substr(0,str.length -1);
        }
        let array:string[] = PlayerVoFactory.mergeAttr(str);

        let array1 = [];
        let fzCfg = FaZhengListProxy.Ins.getCfgById(fzId);
        for(let i:number=0;i<array.length;i++){
            if(fzCfg.f_add != ""){
                let addArr = fzCfg.f_add.split("|");
                let tt = 0;
                let addTT = 0;
                for(let i:number=0;i<addArr.length;i++){
                    let ar = addArr[i].split("-");
                    if(parseInt(ar[0]) == type){
                        tt = parseInt(ar[0]);
                        addTT = parseInt(ar[1]);
                    }
                }
                if(tt){
                    let arr = array[i].split(":");
                    let adda = BaoShiCfgProxy.Ins.getAttrArrByType(tt);
                    if(adda.indexOf(arr[0]) != -1){
                        let addVal = parseInt(arr[1]) * (addTT / 10000 );
                        let st = arr[0] + ":" + arr[1] + ":" + addVal;
                        array1.push(st);
                    }
                }else{
                    array1.push(array[i]);
                }
            }else{
                array1.push(array[i]);
            }   
        }
        return array1;
    }

    public getAttrListByType1(value:stGem[],type:number,fzId:number):string[]{
        let arr = [];
        for(let i:number=0;i<value.length;i++){
            let cfg = BaoShiCfgProxy.Ins.getCfgById(value[i].id);
            if(cfg.f_GemColor == type){
                arr.push(value[i]);
            }
        }

        let array = [];
        for(let ele of arr){
            let attrCfg = BaoShiLvProxy.Ins.getCfgByIdAndLv(ele.id,ele.level);
            let attArr = attrCfg.f_GemAttr.split("-");
            let str = attArr[0] + ":" + attArr[1] + ":" + ele.level;
            array.push(str);
        }

        let array1 = [];
        let fzCfg = FaZhengListProxy.Ins.getCfgById(fzId);
        for(let i:number=0;i<array.length;i++){
            if(fzCfg.f_add != ""){
                let addArr = fzCfg.f_add.split("|");
                let tt = 0;
                let addTT = 0;
                for(let i:number=0;i<addArr.length;i++){
                    let ar = addArr[i].split("-");
                    if(parseInt(ar[0]) == type){
                        tt = parseInt(ar[0]);
                        addTT = parseInt(ar[1]);
                    }
                }
                if(tt){
                    let arr = array[i].split(":");
                    let adda = BaoShiCfgProxy.Ins.getAttrArrByType(tt);
                    if(adda.indexOf(arr[0]) != -1){
                        let addVal = parseInt(arr[1]) * (addTT / 10000 );
                        let st = arr[0] + ":" + arr[1] + ":" + arr[2] + ":" + addVal;
                        array1.push(st);
                    }
                }else{
                    array1.push(array[i]);
                }
            }else{
                array1.push(array[i]);
            }   
        }
        return array1;
    }

    public getFZST(fzid:number){
        let st = "";
        let fzCfg = FaZhengListProxy.Ins.getCfgById(fzid);
        if(fzCfg.f_add != ""){
            let attrArr = fzCfg.f_add.split("|");
            for(let i:number=0;i<attrArr.length;i++){
                let arr = attrArr[i].split("-");
                st += BaoShiCfgProxy.Ins.getNameByType(parseInt(arr[0])) + "宝石提供的属性增加" + parseInt(arr[1]) / 100 + "%" + "    ";
            }
        }else{
            st = "无";
        }
        return st;
    }

    public getBaoShiSelArr(){
        let arr1 = [];
         let arr2 = [];
        let arr3 = [];
        let arr = BaoShiSelProxy.Ins.List;
        for(let i:number=0;i<arr.length;i++){
            if(arr[i].f_gemlevel != ""){
                let vo = new BaoShiSelVo();
                vo.color = "fff1d5";
                vo.txt = arr[i].f_gemlevel.split("-")[1];
                arr1.push(vo);
            }
            if(arr[i].f_GemColor != ""){
                let vo = new BaoShiSelVo();
                vo.color = "fff1d5";
                vo.txt = arr[i].f_GemColor.split("-")[1];
                arr2.push(vo);
            }
            if(arr[i].f_GemShape != ""){
                let vo = new BaoShiSelVo();
                vo.color = "fff1d5";
                vo.txt = arr[i].f_GemShape.split("-")[1];
                arr3.push(vo);
            }   
        }
        return [arr1,arr2,arr3];
    }

    public getGMLv(){
        let num = 999;
        let arr = BaoShiModel.Ins.getEquipList();
        if(arr.length >= 12){
            for(let i:number=0;i<arr.length;i++){
                num = Math.min(num,arr[i].level);
            }
        }else{
            num = 0;
        }
        return num;
    }
}
