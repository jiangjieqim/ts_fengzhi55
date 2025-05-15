import { BaseModel } from "../../../../../frame/util/ctl/BaseModel";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { MSGID } from "../../../../network/MSGID";
import { SpiritListDel_revc, SpiritListUpdate_revc, SpiritList_revc, stEquipAttr, stSpirit } from "../../../../network/protocols/BaseProto";
import { DotManager } from "../../common/DotManager";
import { EFuncDef } from "../../main/model/EFuncDef";
import { MainModel } from "../../main/model/MainModel";
import { TaskModel } from "../../main/model/TaskModel";
import { ERewardShowVoType } from "../../main/views/RewardCtl";
import { RewardGetData } from "../../main/views/RewardGetView";
import { EWearableType } from "../../main/vos/ECellType";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { PlayerVoFactory } from "../../main/vos/PlayerVoFactory";
import { NewAdventureModel } from "../../maoxian2/NewAdventureModel";
import { SoulCompareTipsView } from "../views/SoulCompareTipsView";
import { SoulMainView } from "../views/SoulMainView";
import { SoulSuitTipsView } from "../views/SoulSuitView";
import { SoulTipsView } from "../views/SoulTipsView";
import { IAttrSkin, SoulUpgradeView } from "../views/SoulUpgradeView";
import { SoulEvent } from "./SoulEvent";
import { t_Spirit_Attribute_Fixed, t_Spirit_ExpUpgrade } from "./SoulProxy";
import { SoulVo } from "./SoulVo";

export class SoulModel extends BaseModel {

    private static _ins: SoulModel;

    // private spiritList:stSpirit[] = [];
    public soulVoList:SoulVo[] = [];
    public static get Ins() {
        if (!this._ins) {
            this._ins = new SoulModel();
        }
        return this._ins;
    }
    public onInitCallBack():void{

    }
    public initMsg(): void{
        this.Reg(new SoulMainView(EViewType.Soul));
        this.Reg(new SoulTipsView(EViewType.SoulTips));
        this.Reg(new SoulUpgradeView(EViewType.SoulUpgrade));
        this.Reg(new SoulCompareTipsView(EViewType.SoulCompareTip));
        this.Reg(new SoulSuitTipsView(EViewType.SoulSuitTips));
        E.MsgMgr.AddMsg(MSGID.SpiritList, this.onSpiritList, this);
        E.MsgMgr.AddMsg(MSGID.SpiritListUpdate, this.onSpiritListUpdate, this);
        E.MsgMgr.AddMsg(MSGID.SpiritListDel, this.onSpiritListDel, this);
    }
    public getByUid(uid:number){
        // let cell = this.spiritList.find(item=>item.uid == uid);
        // return cell;
        let cell = this.getSoulByUid(uid);
        if(cell){
            return cell.vo;
        }
    }
    public isLvFull(_vo:stSpirit){
        return t_Spirit_ExpUpgrade.Ins.isFull(_vo.level,_vo.qualityId);
    }
    private onSpiritList(revc:SpiritList_revc){
        this.soulVoList = [];
        let spiritList = revc.spiritList;
        for(let i = 0;i < spiritList.length;i++){
            let vo = new SoulVo();
            let cell = spiritList[i];
            vo.vo = cell;
            vo.parse();
            this.soulVoList.push(vo);
            // console.log(vo,vo.pos);
        }

    }
    /**该位置是否有战魂穿戴中 ,有就返回穿戴中的战魂*/
    public getWear(pos:number):stSpirit{
        let l = this.soulVoList;
        for(let i = 0;i < l.length;i++){
            let cell = l[i];
            if(cell.vo.pos == pos && cell.vo.wearable == EWearableType.Wearable){
                return cell.vo;
            }
        }
    }

    /**获取穿戴部位上的装备 */
    public getWearableByPos(pos:number) {
        // let cell = this.soulVoList.find(item=>item.vo.pos == pos && item.vo.wearable == EWearableType.Wearable);
        let l = this.soulVoList;
        for(let i = 0;i < l.length;i++){
            let cell = l[i];
            if(cell.vo.pos == pos && cell.vo.wearable == EWearableType.Wearable){
                return cell;
            }
        }
        // console.log("not find",pos);
    }

    /**获取未穿戴的列表 */
    public getNotExcludeWearList(uid:number):SoulVo[]{
        let l = this.soulVoList;
        let _result = [];
        for(let i = 0;i  < l.length;i++){
            let cell = l[i];
            if (cell.vo.wearable != EWearableType.Wearable && uid != cell.vo.uid) {
                _result.push(cell);
            }
        }
        return _result;
    }
    /**获取未穿戴的列表 */
    public getNotExcludeWears(){
        let l = this.soulVoList;
        let _result = [];
        for(let i = 0;i  < l.length;i++){
            let cell = l[i];
            if (cell.vo.wearable != EWearableType.Wearable) {
                _result.push(cell);
            }
        }
        return _result;
    }

    
    /**战魂魂背包是否已满 是否可以一键卸下 */
    public isPackageFullCanUpload(){
        let l = this.soulVoList;
        return l.length > NewAdventureModel.Ins.cleanUpVo.storageMax;
    }

    /**未穿戴的 */
    public getListByPos(pos:number):SoulVo[]{
        let l = [];
        for (let i = 0; i < this.soulVoList.length; i++) {
            let cell = this.soulVoList[i];
            if (cell.vo.wearable == EWearableType.Not) {
                if (cell.vo.pos == pos || pos == 0) {
                    l.push(cell);
                }
            }
        }
        return l;
    }

    /**该部位是有装备可以 */
    public getHasCanWear(pos:number):boolean{
        for (let i = 0; i < this.soulVoList.length; i++) {
            let cell = this.soulVoList[i];
            if (cell.vo.wearable == EWearableType.Not) {
                if (cell.vo.pos == pos) {
                    return true;
                }
            }
        }
        return false;
    }
	/**是否有红点*/
    private get hasRed() {
        for(let i = 0;i < 4;i++){
            let pos:number = i + 1;
            if(this.getWearableByPos(pos)){
                
            }else{
                if(this.getHasCanWear(pos)){
                    return true;
                }
            }
        }
        return false;
    }

    public updateRed() {
        if (TaskModel.Ins.isFuncOpen(EFuncDef.Soul)) {
            if (this.hasRed) {
                DotManager.addMainDot("icon1", -20, -5);
            } else {
                DotManager.remMainDot("icon1");
            }
        }
    }

    private onSpiritListUpdate(revc: SpiritListUpdate_revc) {
        let _newList:stSpirit[] = [];
        for (let n = 0; n < revc.spiritList.length; n++) {
            let item = revc.spiritList[n];
            let find: boolean = false;
            for (let i = 0; i < this.soulVoList.length; i++) {
                let cell = this.soulVoList[i];
                if (cell.vo.uid == item.uid) {
                    this.soulVoList[i].vo = item;
                    find = true;
                    //更新
                    // let cell2 = this.getSoulByUid(cell.uid);
                    // if(cell2){
                        // cell2.vo = item;
                        // cell2.parse();
                    // }
                    this.soulVoList[i].parse();
                }
            }
            if (!find) {
                //新增
                // this.spiritList.push(item);
                _newList.push(item);

                let _curVo = new SoulVo();
                _curVo.vo = item;
                _curVo.parse();
                this.soulVoList.push(_curVo);
            }
        }

        if(_newList.length > 0){
            let rewardVo = new RewardGetData();
            rewardVo.dataList = _newList;
            rewardVo.type = ERewardShowVoType.Soul;
            // E.ViewMgr.Open(EViewType.GetReward,null,rewardVo);
            E.ViewMgr.openReward(rewardVo);
        }
        this.event(SoulEvent.UpdateData);
        this.updateRed();
    }

    public getSoulByUid(uid){
        let l = this.soulVoList;
        for(let i = 0;i < l.length;i++){
            if(l[i].vo.uid == uid){
                return l[i];
            }
        }
    }

    private onSpiritListDel(revc:SpiritListDel_revc){
        // console.log(revc);
        let l = revc.datalist;
        for(let i = 0;i < l.length;i++){
            let delUid = l[i];
            this.del(delUid);
        }
        this.event(SoulEvent.UpdateData);
        this.updateRed();
    }

    private del(uid:number){
        // let cell = this.soulVoList.find(item=>item.uid == uid);
        // if(cell){
        //     let index = this.spiritList.indexOf(cell);
        //     this.spiritList.splice(index,1);
        // }
        let cell2 = this.getSoulByUid(uid);
        if(cell2){
            let index = this.soulVoList.indexOf(cell2);
            this.soulVoList.splice(index,1);
        }
    }

    /**获取该战魂解锁的数量 */
    public getUnlockCountBySpiritId(spiritId:number){
        let l = this.soulVoList;
        let count:number = 0;
        for(let i = 0;i  < l.length;i++){
            let cell = l[i];
            if(cell.vo.spiritId == spiritId && cell.vo.wearable == EWearableType.Wearable){
                count++;
            }
        }
        return count;
    }
    public getBaseAttr(spiritId:number,lv:number){
        let cfg:Configs.t_Spirit_Attribute_Fixed_dat = t_Spirit_Attribute_Fixed.Ins.getCfgBySpiritID(spiritId);
        let index = lv - 1;
        let attr:stEquipAttr[] = [];
        let lineArr = cfg.f_PerksNumber.split("|");
        let quaArr = cfg.f_QualityName.split("|");
        for(let i = 0;i < quaArr.length;i++){
            let val = 0;
            if(index >= 0){
                val = parseInt(lineArr[i].split(":")[1]);
            }
            let a = quaArr[i].split(":");
            let id = parseInt(a[0]);
            let curVal = parseInt(a[1]) + val * (index < 0 ? 0 : index);
            let vAttr = new stEquipAttr();
            vAttr.id = id;
            vAttr.value = curVal;
            attr.push(vAttr);
        }
        return attr;
    }

    /**基础属性总值 */
    public getAllBaseAttr(){
        let l = this.soulVoList;
        let r = [];
        for(let i = 0;i < l.length;i++){
            let cell = l[i];
            if(cell.vo.wearable == EWearableType.Wearable){
                r = r.concat(cell.baseAttr);
            }
        }
        r = PlayerVoFactory.mergeAttrSt(r);
        return r;
    }
    /**随机属性总值 */
    public getAllRandomAttr(){
        let l = this.soulVoList;
        let r = [];
        for(let i = 0;i < l.length;i++){
            let cell = l[i];
            if(cell.vo.wearable == EWearableType.Wearable){
                r = r.concat(cell.vo.attrList);
            }
        }
        r = PlayerVoFactory.mergeAttrSt(r);
        return r;
    }
    
    public updateAttr(skin:IAttrSkin,str:string){
        let arr = str.split(":");
        let id = parseInt(arr[0]);
        let val = parseInt(arr[1]);
        skin.attrtf.text = MainModel.Ins.getAttrNameIdByID(id);
        skin.valtf.text = attrConvert(id,val);
    }

    /**获取已经穿戴中的套装spiritId */
    public getWeardIds(){
        let spiritIds:number[] = [];
        let l = this.soulVoList;
        for(let i = 0;i < l.length;i++){
            let cell = l[i];
            if(cell.vo.wearable == EWearableType.Wearable){
                if(spiritIds.indexOf(cell.vo.spiritId)==-1){
                    spiritIds.push(cell.vo.spiritId);
                }
            }
        }
        return spiritIds;
    }

    public getRot(pos){
        let r = 0;
        switch(pos){
            case 1:
                r = 46;
                break;
            case 2:
                r = 134;
                break;
            case 3:
                r = 313;
                break;
            case 4:
                r = 226;
                break;
         
        }
        return r;
    }
    public getIcon(qua:number){
        // qua = Math.floor(Math.random()*4);
        let arr = ["zhk","zhdj_l","zhdj_z","zhdj_j"];
        let icon = arr[qua];
        return `remote/main/main/${icon}.png`;
    }
}