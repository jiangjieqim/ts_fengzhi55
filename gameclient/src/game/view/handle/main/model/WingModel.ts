import { BaseModel } from "../../../../../frame/util/ctl/BaseModel";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { stCellValue, stWingUpgradeInfo, WearedWingData_revc, WingList_revc, wingTreasureStage_revc } from "../../../../network/protocols/BaseProto";
import {DotManager} from "../../common/DotManager";
import { IWingData, IWingUpgradeAttrListItem } from "../interface/IWing";
import { MainView } from "../MainView";
import { WingConfigProxy, WingExpProxy, WingIdProxy } from "../proxy/WingProxy";
import { WingExchangeView } from "../views/WingExchangeView";
import { WingInfoView } from "../views/WingInfoView";
import { WingLevelView } from "../views/WingLevelView";
import { WingStageView } from "../views/WingStageView";
import { WingTreasureView } from "../views/WingTreasureView";
import { ItemVo } from "../vos/ItemVo";
import { EFuncDef } from "./EFuncDef";
import { GameconfigProxy } from "./EquipmentProxy";
import { MainModel } from "./MainModel";
import { TaskModel } from "./TaskModel";

export class WingModel extends BaseModel {

    /**红点刷新 */
    public static EventRedRefresh:string = "EventRedRefresh";

    // 翅膀属性加成的属性id
    public static wingAttrs  = [10012, 10013, 10014, 10015, 10016, 10017];
    private static _ins: WingModel;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new WingModel();
        }
        return this._ins;
    }
    public onInitCallBack():void{
        this.wingId = undefined
        this.level  = undefined;
        this.stage = undefined;
        this.wingName = undefined;
        this.playerWingIds = [];
        this.treasureStage = undefined;
        this.wingFightCapacity = undefined;
        this.wingTreasureFightCapacity = undefined;
    }
    public wingId: number;
    public level: number;
    public stage: number;
    public wingName: string;
    public playerWingIds: number[] = [];
    public treasureStage: number;
    public type:string;// 'LEVEL' | 'STAGE' | 'TREASURE' | 'EXCHANGE'
    public wingFightCapacity: number = 0; // 翅膀总战斗力
    public wingTreasureFightCapacity: number = 0; // 翅膀宝物战斗力
    public wingLevelAttrs: stWingUpgradeInfo[] = [];
    public wingStageAttrs: stWingUpgradeInfo[] = [];

    public initMsg(): void{

    }

    public onWearedWingDataRevc(data:WearedWingData_revc){
        // console.log('onWearedWingDataRevc', data);
        const wingId = data.wingData.wingId;
        const level = data.wingData.wingInfoData.wingLevel;
        const stage = data.wingData.wingInfoData.wingStage;
        const wingName = WingIdProxy.Ins.getWingName(wingId);
        MainModel.Ins.wingId = wingId;
        this.wingId = wingId;
        this.level = level;
        this.stage = stage;
        this.wingName = wingName;
        this.wingFightCapacity = data.wingData.wingPower;
        this.wingLevelAttrs = data.wingData.levelAttrList;
        this.wingStageAttrs = data.wingData.stageAttrList;
        this.refreshWingView();
        this.updateRed();
    }
    /**翅膀功能是否开启 */
    // public isOpen(){
    // return this.wingId != undefined;
    // }

    public updateRed() {
        if (TaskModel.Ins.isFuncOpen(EFuncDef.Wing)) {
            if (this.mLevelUp) {
                DotManager.addMainDot("icon3", -20, -5);
            } else {
                DotManager.remMainDot("icon3");
            }
            this.event(WingModel.EventRedRefresh);
        }
    }
    /**
     * 是否可以升级
     */
    public get mLevelUp(){
        // let wingId:number = this.wingId;
        const levelData = WingExpProxy.Ins.getNextLevelData(this.level, this.stage);
        const stage = this.stage;
        
        if (levelData.restLevel) {
            // 当前是升级，预览升下一阶的信息
            // 按钮灰掉
            // this._ui.stageUpBtn.gray = true;
            //ok
            const itemListData:{ levelList: ItemVo[], stageList: ItemVo[] } = WingConfigProxy.Ins.getUpgradeItemList(stage);
            const itemList = itemListData.levelList;

            // console.log(itemList);
            for(let i = 0;i < itemList.length;i++){
                let cell = itemList[i];
                if(MainModel.Ins.mRoleData.getVal(cell.cfgId) < cell.count){
                    return false;
                }
            }
            return true;

        }
    }

    /**
     * 翅膀数据变化后，更新界面
     */
    private refreshWingView(){
        const infoView = E.ViewMgr.Get(EViewType.WingInfo) as WingInfoView;
        const levelView = E.ViewMgr.Get(EViewType.WingMainLevel) as WingLevelView;
        const stageView = E.ViewMgr.Get(EViewType.WingMainStage) as WingStageView;
        const exchangeView = E.ViewMgr.Get(EViewType.WingExchange) as WingExchangeView;
        const treasureView = E.ViewMgr.Get(EViewType.WingTreasure) as WingTreasureView;
        const mainView = E.ViewMgr.Get(EViewType.Main) as MainView;
        if (infoView.IsShow()) {
            // 更新翅膀信息界面
            infoView.refresh(true);
        }
        const level = this.level;
        const stage = this.stage;
        const levelData = WingExpProxy.Ins.getNextLevelData(level, stage);
        if (levelView.IsShow()) {
            if (!levelData.restLevel) {
                // 切换到升阶界面
                E.ViewMgr.Close(EViewType.WingMainLevel);
                E.ViewMgr.Open(EViewType.WingMainStage);
            } else {
                // 更新翅膀升级界面
                levelView.refresh();
                if (stageView.IsShow()) {
                    stageView.refresh();
                }
            }

        } else if (stageView.IsShow()) {
            if (levelData.restLevel) {
                // 切换到升级界面
                E.ViewMgr.Close(EViewType.WingMainStage);
                E.ViewMgr.Open(EViewType.WingMainLevel);
            } else {
                // 更新翅膀升阶界面
                stageView.refresh();
                if (levelView.IsShow()) {
                    levelView.refresh();
                }
            }
        }
        if (exchangeView.IsShow()) {
            // 更新替换翅膀界面
            exchangeView.refresh();
        }
        if (treasureView.IsShow()) {
            // 更新翅膀宝物升级界面
            treasureView.refresh();
        }
        if (mainView.IsShow()) {
            // 更新主界面装备区的翅膀
            mainView.updateWingItem();
        }
        this.showTips();
    }

    private showTips() {
        const type = this.type;
        if (!type) return;
        switch (type) {
            case 'LEVEL':
                E.ViewMgr.ShowMidOk('升级成功');
                break;
            case 'STAGE': 
                E.ViewMgr.ShowMidOk('升阶成功');
                break;
            case 'EXCHANGE':
                E.ViewMgr.ShowMidOk('更换成功');
                break;
        }
    }

    private getWingTreasureUpgradeName(treasureStage: number) {
       return treasureStage % 7 ? '升级' : '突破';
    }

    public onWingListRevc(data:WingList_revc){
        console.log('onWingListRevc', data);
        this.playerWingIds = data.list || [];
        const exchangeView = E.ViewMgr.Get(EViewType.WingExchange) as WingExchangeView;
        if (exchangeView.IsShow()) {
            exchangeView.refresh();
            E.ViewMgr.ShowMidOk('购买成功');
        } else {
            E.ViewMgr.Open(EViewType.WingExchange, null);
        }
        
    }

    public onWingTreasureRevc(data: wingTreasureStage_revc) {
        // console.log(data);
        const stage = this.treasureStage;
        this.treasureStage = data.stage;
        this.wingTreasureFightCapacity = data.treasurePower;
        this.refreshWingView();
        if (!WingModel.Ins.type) return;

        if (E.ViewMgr.IsOpen(EViewType.WingTreasure)) {
            const upgradeName = this.getWingTreasureUpgradeName(stage + 1);
            if (data.errorID) {
                E.ViewMgr.ShowMidError(`${upgradeName}失败`);
            } else {
                E.ViewMgr.ShowMidOk(`${upgradeName}成功`);
            }
        }else{
            //LogSys.Log("==================>初始化 onWingTreasureRevc");
        }
    }

    public showPlayerWingInfo(data: IWingData) {
        const wingId = data.wingId;
        const wingName = WingIdProxy.Ins.getWingName(wingId);
        E.ViewMgr.Open(EViewType.WingInfo, null, { ...data, wingName });
    }

    public getOwnerWingData(): IWingData {
        const wingId = WingModel.Ins.wingId;
        const level = WingModel.Ins.level;
        const stage = WingModel.Ins.stage;
        const treasureStage = WingModel.Ins.treasureStage;
        const wingName = WingModel.Ins.wingName;
        const wingFightCapacity = WingModel.Ins.wingFightCapacity;
        const wingTreasureFightCapacity = WingModel.Ins.wingTreasureFightCapacity;
        return {
            wingId,
            level,
            stage,
            treasureStage,
            isOwner: true,
            wingName,
            wingFightCapacity,
            wingTreasureFightCapacity
        }
    }
}