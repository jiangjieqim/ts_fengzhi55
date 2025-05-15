import { StringUtil } from "../../../../../frame/util/StringUtil";
import { stCellValue } from "../../../../network/protocols/BaseProto";
import { ExpValueProxy, IExpCfg } from "../../../../static/json/data/ExpValueProxy";
import { DataFactoryTest } from "../model/DataFactoryTest";
import { GameconfigProxy } from "../model/EquipmentProxy";
import { MainModel } from "../model/MainModel";
import { ItemProxy } from "../proxy/ItemProxy";
import { EAttrType, ECellType } from "./ECellType";
import { ItemVo } from "./ItemVo";
import { MainBaseVo } from "./MainBaseVo";
import { PlayerVoFactory } from "./PlayerVoFactory";


/**
 * 属性转化
 */
export function attrConvert(id:number,count:number){
    let proxy:GameconfigProxy = GameconfigProxy.Ins;
    let cfg:Configs.t_gameconfig_dat = proxy.GetDataById(id);
    if(cfg){
        if(cfg.f_per == 1){
            return (count / 100).toFixed(2) + "%";
        }
        return count.toString();
    }
    return count.toString();
}

/**
 * 主角数据
 */
export class MainRoleVo extends MainBaseVo{
    /**登录的天数 */
    login_count:number;

    /**进入次数 */
    enter_count:number;

    /**当前的用户头像 */
    public get headUrl(){
        return MainModel.Ins.convertHead(this.mPlayer.HeadUrl);
    }

    /**
     * 宝箱的抽取的CD时间
     */
    public getChestCDTime(){
        if(this.mBaseInfo){
            return this.mBaseInfo.boxCdTime;
        }
        return 0;
    }

    public getVal(type: ECellType|EAttrType) {
        return PlayerVoFactory.getVal(this.moneyInfo,type);
    }
    /**战斗力 */
    public get plus() {
        return this.getVal(ECellType.BATTLE);
    }

    /**经验 */
    // public get exp(){
    // return this.getVal(ECellType.EXP);
    // return MainModel.Ins.exp;
    // }

    /**宝箱个数 */
    public get boxCnt(){
        return this.getVal(ECellType.BOX);
    }

    /**铜钱 */
    public get copper(){
        return this.getVal(ECellType.COPPER_MONEY);
    }

    /**钻石 元宝*/
    public get gold(){
        return this.getVal(ECellType.GOLD);
    }
    
    /**邀请函数量 */
    public get inviteCount(){
        return this.getVal(ECellType.HeroInvite) + this.getVal(ECellType.HighHeroInvite);
    }

    /**当前的玩家等级 */
    public get lv(){
        // let _exp = this.exp;
        // let cfg:IExpCfg = ExpValueProxy.Ins.getLvCfg(_exp);
        // return cfg.lv;
        return MainModel.Ins.lv;
    }

    // public getValString(type:number){
    //     let mBaseInfo = this.mBaseInfo;
    //     if (mBaseInfo) {
    //         return PlayerVoFactory.getValString(mBaseInfo.moneyInfo,type);
    //     }
    // }

    public get moneyInfo(){
        return this.mBaseInfo && this.mBaseInfo.moneyInfo;
    }

    /**
     * 设置玩家属性(改值或者添值)
     */
    public setAttr(type:EAttrType,val:number){
        let mBaseInfo = this.mBaseInfo;
        if(mBaseInfo){
            let moneyList: stCellValue[] = mBaseInfo.moneyInfo;
            if(moneyList){
                let b = false;
                for (let i = 0; i < moneyList.length; i++) {
                    let _cell = moneyList[i];
                    if (_cell.id == type) {
                        // return money.count;
                        _cell.count = val;
                        b = true;
                        break;
                    }
                }
                if(!b){
                    let cellVo = new stCellValue()
                    cellVo.id = type;
                    cellVo.count = val;
                    moneyList.push(cellVo);
                }
            }
        }
    }

    /**
     * 战斗力
     */
    public getBattleValue(){
        return this.getVal(ECellType.BATTLE);
    }

    public getName() {
        if (this.mPlayer) {
            // if(StringUtil.IsNullOrEmpty(this.mPlayer.NickName)){
            // return this.mPlayer.Account;
            // }    
            return StringUtil.convertName(this.mPlayer.NickName);
        }
        return "";
    }

    public getChestData(){
        if(!this.chestData){
            return DataFactoryTest.createTestChestData(1,41,0);//TimeUtil.serverTimeSecond() + 20;
        }
        return this.chestData;
    }

    /**宝箱等级 */
    public get boxlv(){
        return this.getChestData().boxlv;
    }

    public setChestData(v){
        this.chestData = v;
    }

    public getItemVoListBySubtype(subType:number):ItemVo[]{
        let l:ItemVo[] = [];
        let itemIdList:number[] = ItemProxy.Ins.getSubTypeList(subType);
        for(let i = 0;i < itemIdList.length;i++){
            let id = itemIdList[i];
            let count = this.getVal(id);
            if (count > 0) {
                let itemVo = new ItemVo();
                itemVo.cfgId = id;
                itemVo.count = count;
                l.push(itemVo);
            }
        }
        return l;
    }
}