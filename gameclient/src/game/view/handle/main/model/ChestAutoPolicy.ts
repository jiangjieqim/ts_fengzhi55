import { LogSys } from "../../../../../frame/log/LogSys";
import { E } from "../../../../G";
import { ExchangeEquip_revc, stEquipItem } from "../../../../network/protocols/BaseProto";
import { BoxAutoVo } from "../vos/AutoBoxVo";
import { EquipItemVo } from "../vos/EquipItemVo";
import { MainEvent } from "./MainEvent";
import { MainModel } from "./MainModel";

// export enum EChestSource{
    // Null = undefined,
    /**委托界面设置按钮点击的触发的,界面用户操作来源 */
    // UI_CLICK = 1,
// }

export enum ESetEquipDateSource{
    /**来自添加装备 */
    PushEquip = 1,
    /**来自点击操作 */
    ClickAutoBtn = 2,
}

export enum EOpenChest {
    Normal = 1,//普通模式
    Auto = 2,//委托模式
}

//宝箱的当前状态
export enum EChestOpenStatus {
    None = 0,//无状态
    GetBetterEquip=1,//获得一个更好的装备
    // IsPlaying,//动画播放中
}

/**开宝箱策略接口 */
export interface IChestAutoPolicy {
    type: EOpenChest;
    /**
     * 开始开宝箱
     */
    BeginChest(delay:boolean);
    /**
     * 宝箱抽取返回
     */
    ExchangeEquip(data: ExchangeEquip_revc);

    /** 开启一个界面 出售 或者 替换装备*/
    // openUiByEquipVo(cell: stEquipItem) ;
    BetterAction():boolean;

    /**操作状态 */
    status: EChestOpenStatus;

    /**终止操作 */
    Stop();
    /**宝箱动画是否播放中 */
    // isPlaying:boolean;
    /**委托之后开宝箱 */
    openChest(delay?:boolean);
    autoPop(cell:stEquipItem);
    animEndSell(cell:stEquipItem,source?:ESetEquipDateSource);
}

export class ChestPolicyBase {
    public status: EChestOpenStatus = EChestOpenStatus.None;
    public type: EOpenChest = EOpenChest.Normal;
    public isPlaying:boolean = false;

    protected get model() {
        return MainModel.Ins;
    }
    //动画播放结束
    public aniEnd(data: ExchangeEquip_revc) {

    }
    animEndSell(cell:stEquipItem){
        
    }
    openChest(delay:boolean = true){
    }
    public Stop(){

    }
    public BetterAction():boolean{
        return false;
    }
    public ExchangeEquip(data: ExchangeEquip_revc) {
        // LogSys.Log("ExchangeEquip errorID:" + data.errorID);
        switch (data.errorID) {
            case 0:
                // if (data.equipItemList.length > 0) {
                    // let cell: stEquipItem = data.equipItemList[0];
                    // this.openUiByEquipVo(cell);
                    // LogSys.Log("ExchangeEquip: type:" + cell.type + " qua:" + cell.quality);
                // }
                //成功
                // let qua = 1;
                let _equipVo;
                if(data.equipItemList.length > 0){
                    // qua = data.equipItemList[0].quality;
                    _equipVo = data.equipItemList[0];
                }
                this.model.PlayChestAnim(new Laya.Handler(this, this.aniEnd, [data]),_equipVo);
                break;
            case 1:
                //宝箱不足
                E.ViewMgr.ShowMidError(E.LangMgr.getLang("BoxNotEnough"));
                MainModel.Ins.discountPack.boxNotEnough();
                this.model.StopChestProxy(false);
                break;
            case 2:
                //CD时间未结束
                // E.ViewMgr.ShowMidError(E.LangMgr.getLang("CdNotEnough"));
                // this.model.StopChestProxy();
                break;
        }

    }
    /**
   * 根据获得的装备开启界面
   */
    public openUiByEquipVo(cell: stEquipItem) {
        this.model.openUiByEquipVo(cell);
    }
}
//普通模式开宝箱
export class ChestPolicy extends ChestPolicyBase implements IChestAutoPolicy {
    public type: EOpenChest = EOpenChest.Normal;

    public aniEnd(data: ExchangeEquip_revc) {
        if (data.equipItemList.length > 0) {
            let cell: stEquipItem = data.equipItemList[0];
            this.model.openUiByEquipVo(cell);
        }
    }
    autoPop(cell:stEquipItem){
        
    }
    public BeginChest(delay:boolean = true) {
        let cell: EquipItemVo = this.model.getNotWear();

        if (cell) {
            this.openUiByEquipVo(cell.equipVo);
        } else {
            this.model.timeCtl.start();//开始抽卡
        }
    }
}

//委托开宝箱
export class ChestAutoPolicy extends ChestPolicyBase implements IChestAutoPolicy {
    public type: EOpenChest = EOpenChest.Auto;

    private delayTime:number = 500;
    public aniEnd(data: ExchangeEquip_revc) {
        console.log("aniEnd onAniDelayHandler type:"+this.type+" status:"+this.status);
        Laya.timer.clear(this,this.onAniDelayHandler);
        Laya.timer.once(this.delayTime,this,this.onAniDelayHandler);
    }

    public Stop(){
        // console.log("clear onAniDelayHandler");
        this.model.off(MainEvent.SellSucceed,this,this.onSellSucceed);
        this.model.off(MainEvent.EquipChange,this,this.onEquipChange);
        Laya.timer.clear(this,this.onAniDelayHandler);
    }

    private onAniDelayHandler(){
        this.model.BeginChest();
    }
    // //删除成功继续开箱子
    // private delSucceed(arr: uint64[], l: uint64[]) {
    //     // console.log(curUid);
    //     // curUid: uint64
    //     for (let i = 0; i < l.length; i++) {
    //         let cell: uint64 = l[i];
    //         for (let n = 0; n < arr.length; n++) {
    //             let curUid = arr[n];
    //             if (cell.equals(curUid)) {
    //                 //删除成功,继续开箱子
    //                 // this.model.timeCtl.delayStart();
    //                 this.openChest();
    //             }
    //         }
    //     }
    // }

    private onSellSucceed(){
        this.openChest();
    }

    private onEquipChange(){
        this.openChest();
    }

    public BetterAction() {
        // if(this.isPlaying){
        // return false;
        // }
        // if (this.status == EChestOpenStatus.GetBetterEquip) {
            let _equip = this.model.getNotWear();
            if (_equip) {
                // let _oldEquip:EquipItemVo = this.model.getWearable(_equip.equipVo.type);
                this.openUiByEquipVo(_equip.equipVo);
                // let arr = [_equip.equipVo.uid,_oldEquip.equipVo.uid];
                // this.model.once(MainEvent.DelItems, this, this.delSucceed, [arr]);//_equip.equipVo.uid
                // this.model.once(MainEvent.SellSucceed,this,this.)
                this.model.once(MainEvent.SellSucceed,this,this.onSellSucceed);
                this.model.once(MainEvent.EquipChange,this,this.onEquipChange);
                return true;
            } else {
                LogSys.Log("未找到可替换或者出售的装备");
            }
        // }
        return false;
    }
    private log(cell: EquipItemVo,pre:string="")
    {
        LogSys.Log(pre + cell.equipVo.uid + "," + cell.getName()  +  ",type:"+ cell.equipVo.type + ",qua:" + cell.equipVo.quality)
    }

    public BeginChest(delay:boolean = true) {
        this.status = EChestOpenStatus.None;
        let _getEquip: EquipItemVo = this.model.getNotWear();    //获取没有穿的装备
        if(_getEquip){
            // console.log("beginChest: quality " + cell.equipVo.quality + ",f_id " + this.model.quickCfg.f_id);
        }
        else{
            // console.log("beginChest: empty");
        }
        //检测开箱委托状态
        if (_getEquip) {
            let cell = _getEquip.equipVo;
            this.autoPop(cell);
        } else {
            this.openChest(delay);
        }
    }

    autoPop(cell: stEquipItem) {
        let needPop = MainModel.Ins.isNeePop(cell);

        if (needPop) {
            //获得更好的装备需要弹窗
            this.status = EChestOpenStatus.GetBetterEquip;
            this.BetterAction();
        } else {
            // LogSys.Log("装备太差,卖了!"+_curUid.toString());
            this.animEndSell(cell);
        }   
    }

    /**动画结束之后卖掉 */
    animEndSell(cell:stEquipItem,source?:ESetEquipDateSource){
        if(this.model.mainView.avatarFight){
            this.model.mainView.avatarFight.animSell(cell,new Laya.Handler(this,this.onSellEnd,[cell]),source);
        }else{
            this.onSellEnd(cell);
        }
    }

    private onSellEnd(vo:stEquipItem){
        this.model.once(MainEvent.SellSucceed,this,this.onSellSucceed);
        this.model.sell(vo.uid);//售卖
    }


    /**委托之后的开箱操作 */
    openChest(delay:boolean = true){
        MainModel.Ins.event( MainEvent.FightAvatarAnim);
        this.status = EChestOpenStatus.None;
        if(delay){
            this.model.timeCtl.delayStart();
        }else{
            this.model.timeCtl.start();//开始抽卡
        }
    }
}