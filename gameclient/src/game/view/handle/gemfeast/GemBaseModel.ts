import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { TimeUtil } from "../../../../frame/util/TimeUtil";
import { E } from "../../../G";
import { stActivityRecord } from "../../../network/protocols/BaseProto";
import { BaoShiCfgProxy } from "../baoshi/proxy/BaoShiProxy";
import { DuanWuEvent } from "../duanwu/DuanWuEvent";
import { EDuanWuLingquStatus, EDuanWuPackageStatus } from "../duanwu/DuanWuModel";
import { t_Alternation_GemScore, t_Alternation_MountPack, t_Alternation_Recharge } from "../duanwu/DuanWuProxy";
import { DuanwuSlotVo } from "../duanwu/views/DuanWuLeichongItemView";
import { DuanWuLogMsgVo } from "../duanwu/vos/DuanWuLogMsgVo";
import { FuJiangListProxy } from "../fujiang/proxy/FuJiangProxy";
import { ActivityModel } from "../huodong/ActivityModel";
import { System_RefreshTimeProxy } from "../huodong/model/ActivityProxy";
import { EActivityType } from "../huodong/model/EActivityType";
import { PetListProxy } from "../lingchong/proxy/LingChongProxy";
import { EFuncDef } from "../main/model/EFuncDef";
import { EquipmentQualityProxy } from "../main/model/EquipmentProxy";
import { ItemViewFactory } from "../main/model/ItemViewFactory";
import { MainEvent } from "../main/model/MainEvent";
import { MainModel } from "../main/model/MainModel";
import { ItemProxy } from "../main/proxy/ItemProxy";
import { QualityUtils } from "../main/vos/QualityUtils";
import { ShenBinListProxy } from "../shenbin/proxy/ShenBinProxy";
import { Mount_ListProxy } from "../zuoqi/vos/ZuoqiProxy";
import { EFeastType, IActivityNums, IFeastInitVo } from "./EFeastType";
export class FeastLogMessage{
    desc:string;
    name:string;
    color:string;
    convert(_data:stActivityRecord,hasTime:boolean){
        if(hasTime){
            let space:string = "";
            let timeStr:string = "";
            if(hasTime){
                space = "    ";
                timeStr = TimeUtil.timestamtoTime1(_data.time,"-"," ",":",false);
            }
            this.desc = timeStr + space + this.desc;
            this.name = space + this.name;
        }
    }
}
export abstract class GemBaseModel extends BaseModel {
    public static ConvertMsg(type:EFeastType,_data:stActivityRecord,hasTime:boolean = false){

        let msg:FeastLogMessage = new FeastLogMessage();
        if(type == EFeastType.Ride){
            msg.desc = _data.nickName + E.getLang("duanwu01");
            let _mountCfg:Configs.t_Mount_List_dat = Mount_ListProxy.Ins.getCfg(_data.id);
            msg.color = QualityUtils.getQuaColor(_mountCfg.f_Quality);
            msg.name = _mountCfg.f_MountName;
        }else if(type == EFeastType.Gem){
            let cfg:Configs.t_Gem_List_dat = BaoShiCfgProxy.Ins.getCfgById(_data.id);
            msg.desc = _data.nickName + E.getLang("get");
            let color = QualityUtils.getQuaColor(t_Alternation_GemScore.Ins.getByLevel(_data.level).f_GemColor);
            msg.color = color;
            msg.name =  "Lv."+_data.level + cfg.f_GemAttr + E.getLang("gem");
        }else if(type == EFeastType.FuJiang){
            msg.desc = _data.nickName + E.getLang("fj01");
            let _heroCfg = FuJiangListProxy.Ins.getCfgById(_data.id);
            msg.color = "#" + EquipmentQualityProxy.Ins.getByQua(_heroCfg.f_cheifQuality).f_chiefcolor;
            msg.name = _heroCfg.f_cheif;
        }
        else if(type == EFeastType.Pet){
            let petCfg:Configs.t_Pet_List_dat = PetListProxy.Ins.getCfgById(_data.id);
            msg.desc = _data.nickName + E.getLang("pet06");
            msg.color= "#" + EquipmentQualityProxy.Ins.getByQua(petCfg.f_petquality).f_Color;
            msg.name = petCfg.f_petname;
        }
        else if(type == EFeastType.ShenBin){
            let sbCfg:Configs.t_Item_dat = ItemProxy.Ins.getCfg(_data.id);
            msg.desc = _data.nickName + E.getLang("shenbinglibao1");
            msg.color= "#" + EquipmentQualityProxy.Ins.getByQua(sbCfg.f_qua).f_Color;
            msg.name = main.itemName(sbCfg.f_name);
        }
        msg.convert(_data,hasTime);
        return msg;
    }

    /**
     * t_System_RefreshTime 公告最大数目配置 
     * 默认的配置	宝石公告最多显示条数								    
    */
    protected maxConfigId:number = 35;
    protected funcType:EFuncDef;
     
    /**礼包title纹理 */
    // public bg4Img:string = "";
    /**获取排行榜 */
    public abstract requestRank();
    /**累充 */
    public abstract requstLeiChong(id:number);
    /**请求日志 */
    public abstract requstMsg();
    public rank_desc:string;
    /**
     *  活动类型 坐骑盛宴 宝石盛宴
     */
    public subType: EFeastType;
    // public titleStr:string;
    public packageTitleStr:string;
    public rankTitleStr:string;
    public rankBotStr:string;
    public leichongTitle:string = "leichongjiangli";
    public rankTitleStr1:string = "";
    /////////////////////////////////////////////////////
    /**数据 */
    public data: IFeastInitVo;
    /**已经累计充值的(分) */
    public get totalCnt(){
        return this.data ? this.data.totalCnt : 0;
    }
    public get titleStr(){
        switch(this.subType){
            case EFeastType.Ride:
                return "ridetitle01";
            case EFeastType.Gem:
                return "gemtitle01";
            case EFeastType.FuJiang:
                return "gjtitle01";
            case EFeastType.Pet:
                return "pet03";
            case EFeastType.ShenBin:
                return "shenbinglibao";
        }
    }
    
    public get titleSkin(){
        if(this.packId == EActivityType.NewPlayerFeast){
            return `remote/duanwu/t${this.subType}.png`;
        }
        switch(this.subType){
            case EFeastType.Ride:
                return "remote/duanwu/zqsy.png";
            case EFeastType.Gem:
                return "remote/gemfeast/bssy.png";
            case EFeastType.FuJiang:
                return "remote/fujiangfeast/fjsy.png";
            case EFeastType.Pet:
                return "remote/lingchongfeast/lcsy.png";
            case EFeastType.ShenBin:
                return "remote/shenbingfeast/bssy.png";
        }
    }

    public get bg4Img(){
        switch(this.subType){
            case EFeastType.Ride:
                return "remote/duanwu/zqlb.png";
            case EFeastType.Gem:
                return "remote/duanwu/bslb.png";
            case EFeastType.FuJiang:
                return "remote/fujiangfeast/fjlb.png";
            case EFeastType.Pet:
                return "remote/lingchongfeast/lclb.png";
            case EFeastType.ShenBin:
                return "remote/shenbingfeast/bslb.png";
        }
    }
    public serDataList: stActivityRecord[] = [];
    public rankData: IActivityNums;

    public initMsg(): void {

    }
    public onInitCallBack(): void {
        this.data = null;
        this.rankData = null;
        this.serDataList = [];
    }
    ///////////////////////////////////////////////////////////////////
    public packId:EActivityType = EActivityType.DuanWu;
    public get activityVo(){
        let _activityVo = ActivityModel.Ins.getVoByP2(this.packId,this.subType);
        return _activityVo;
    }

    /**活动是否开启 */
    public get isOpen(){
        if(this.data){
            let vo = this.activityVo;
            return vo && vo.isOpen;
        }
    }
    private sortTime(a:stActivityRecord,b:stActivityRecord){
        if(a.time < b.time){
            return -1;
        }
        else if(a.time > a.time){
            return 1;
        }
        return 0;
    }

    public get packcfgList(){
        return t_Alternation_MountPack.Ins.getListByType(this.subType);
    }
    
    private findMsgVo(list1:DuanWuLogMsgVo[],time:number){
        for(let i = 0;i < list1.length;i++){
            if(list1[i].time == time){
                return list1[i];
            }
        }
    }
    public get selfList(){
        if(this.data){
            return this.data.selfRecords || [];
        }
        return [];
    }
    public get myMSG(){
        let list1:DuanWuLogMsgVo[] = [];
        let selfList = this.selfList || [];
        selfList=selfList.sort(this.sortTime);
        for(let i = 0;i < selfList.length;i++){
            let cell = selfList[i];
            let fo = this.findMsgVo(list1,cell.time);
            if(!fo){
                fo = new DuanWuLogMsgVo();
                fo.subType = this.subType;
                fo.time = cell.time;
                list1.push(fo);
            }
            fo.msgs.push(cell);
        }
        return list1;
    }
    /**坐骑礼包(或者宝石礼包)的免费是否可以领取 */
    public get isFreeCanLingQu() {
        let listdata = t_Alternation_MountPack.Ins.List;
        for (let i = 0; i < listdata.length; i++) {
            let cfg: Configs.t_Alternation_MountPack_dat = listdata[i];
            if (cfg.f_PackType == this.subType) {
                if (!cfg.f_PurchaseID) {
                    let time: number = this.getPackageTimes(cfg.f_id);
                    if (time >= cfg.f_BuyTimes) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        }
    }
    
    public getPackageTimes(id:number){
        let vo = this.activityVo;
        if(vo){
            return vo.getParam1(id);
        }
        return 0;
    }
    public convertData(cfg:Configs.t_Alternation_Rank_dat){
        let itemList = ItemViewFactory.convertItemList(cfg.f_Rewarditem);
        let dataList = [];
        for(let i = 0;i < itemList.length;i++){
            let vo = new DuanwuSlotVo();
            vo.itemVo = itemList[i];
            dataList.push(vo);
        }
        if(cfg.f_RewardTitle){
            let vo = new DuanwuSlotVo();
            vo.titleId = cfg.f_RewardTitle;
            dataList.push(vo);
        }
        return dataList;
    }
    /**累计充值的是否有奖励可以领取 */
    public get leijiCanLingQu() {
        let l = t_Alternation_Recharge.Ins.List;
        for (let i = 0; i < l.length; i++) {
            let cfg: Configs.t_Alternation_Recharge_dat = l[i];
            if (cfg.f_ActivityType == this.subType) {
                let status = this.getLeiChongStatus(cfg);
                if (status == EDuanWuLingquStatus.CanLingQu) {
                    return true;
                }
            }
        }
    }
    
    private isLeiChongLingqu(id:number){
        let list1 = this.data.rewardList;
        return list1.indexOf(id) != -1;
    }
    public getLeiChongStatus(cfg:Configs.t_Alternation_Recharge_dat){
        let status:EDuanWuLingquStatus = EDuanWuLingquStatus.Not;
        if(this.data){
            if(this.isLeiChongLingqu(cfg.f_id)){
                status = EDuanWuLingquStatus.IsLingQued;
            }else{
                if(this.totalCnt < cfg.f_PackName ){
                    status = EDuanWuLingquStatus.Not;
                }else{
                    status = EDuanWuLingquStatus.CanLingQu;
                }
            }
        }
        return status;
    }

    
    public getPackageStatus(cfg: Configs.t_Alternation_MountPack_dat): EDuanWuPackageStatus {
        let time: number = this.getPackageTimes(cfg.f_id);
        if (time >= cfg.f_BuyTimes) {
            return EDuanWuPackageStatus.Not;
        } else {
            return EDuanWuPackageStatus.Normal;
        }
    }

    public packageLingqu(id:number){
        let vo = this.activityVo;
        if(vo){
            ActivityModel.Ins.lingQu(vo.uid,id);
        }else{
            E.ViewMgr.ShowMidError(E.getLang("activityend"));
        }
    }
    
    public get maxRecordSerial(){
        // if(this.data){
           let l = this.serDataList;
            if(l && l.length > 0){
                return l[l.length - 1].recordSerial;
            }
        // }
        return 0;
    }
    
    public getRankInfo(rank:number){
        let l = this.rankData.dataList;
        for(let i = 0;i < l.length;i++){
            let cell = l[i];
            if(cell.ranking == rank){
                return cell;
            }
        }
    }
    public updateRed() {
        if (this.isOpen) {
            MainModel.Ins.funcSetRed(this.funcType, this.leijiCanLingQu || this.isFreeCanLingQu);
            MainModel.Ins.event(MainEvent.NewPlayerFeastRed_Update);
        }
    }
    private _maxCount:number;
    /**消息最大数量 */
    private get maxCount(){
        if(!this._maxCount){
            this._maxCount = parseInt(System_RefreshTimeProxy.Ins.getVal(this.maxConfigId));
        }
        return this._maxCount;
    }

    protected updateTotal(val:number){
        this.data.totalCnt = val;
        this.updateRed();
        this.event(DuanWuEvent.MoneyUpdate);
    }

    protected updateReward(rewardList:number[]){
        this.data.rewardList = rewardList;
        // this.data.rewardList = revc.dataList;
        this.updateRed();
        this.event(DuanWuEvent.MoneyUpdate);
    }

    protected upadteMsg(result:stActivityRecord[]){
        let l = result.reverse();
        this.serDataList = this.serDataList.concat(l);
        while(this.serDataList.length > this.maxCount){
            this.serDataList.shift();
        }
        if(l.length > 0){
            this.event(DuanWuEvent.MSGUpdate);
        }
    }

}