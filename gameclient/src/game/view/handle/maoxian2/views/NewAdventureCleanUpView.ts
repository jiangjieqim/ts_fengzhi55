import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { NewAdventureFight_req } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainModel } from "../../main/model/MainModel";
import { AdventureLevelProxy } from "../../main/proxy/AdventureLevelProxy";
import {SoltItemView } from "../../main/views/icon/SoltItemView";
import { SoulModel } from "../../soul/model/SoulModel";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { CleanUpVo } from "../model/CleanUpVo";
import { ENewAdventure } from "../model/ENewAdventure";
import { NewAdventureModel } from "../NewAdventureModel";
import { NewAdverntRewardSmallIcon } from "./NewAdventureItemVIew";

export interface IClearUpItem{
    adverntRewardQuas:number[];
    rewardStr:string;
    levelId:number;
}

/**扫荡奖励 */
export class NewAdventureCleanUpView extends ViewBase {
    private levelId:number;
    protected autoFree = true;
    private _ui:ui.views.maoxian2.ui_maoxian2_saodan_viewUI;
    private cfg:Configs.t_Adventure_Level_dat;
    protected onAddLoadRes(): void { 
        // this.addAtlas("maoxian2.atlas")
    }
    protected onExit(): void { }
    protected mMask:boolean = true;
    private cleanUpVo:CleanUpVo;
    private saodanBtnCtl:ButtonCtl;
    private levelvo:IClearUpItem;
    protected onFirstInit(): void { 
        if(!this.UI){
            this.UI = this._ui = new ui.views.maoxian2.ui_maoxian2_saodan_viewUI();
            this.setMouseBg(this._ui.bg1);
            this.bindClose(this._ui.close1);
            this.saodanBtnCtl=ButtonCtl.CreateBtn(this._ui.saodanBtn,this,this.onSaoDan);
            this.btnList.push(ButtonCtl.CreateBtn(this._ui.freeBtn,this,this.onFreeHandler));
        }
    }
    private onFreeHandler(){
        this.onSaoDan();
    }
    private onSaoDan(){
        if (SoulModel.Ins.getNotExcludeWears().length >= NewAdventureModel.Ins.cleanUpVo.storageMax) {
            E.ViewMgr.ShowMidLabel(E.getLang("saodanFull"));//战魂到达的上限
            return;
        }
        if(!this.cleanUpVo.mFree && !MainModel.Ins.isItemEnoughSt(this.cleanUpVo.needStr,true)){
            return;
        }
        //扫荡
        let req =new NewAdventureFight_req();
        req.type = ENewAdventure.CleanUp;
        req.adventureId = this.levelId;
        SocketMgr.Ins.SendMessageBin(req);
        this.Close();
    }
    protected onInit(): void { 

        let _clearVo:IClearUpItem = this.Data;

        let levelId = _clearVo.levelId || 5;
        this.levelId = levelId;
        let cleanUpVo = NewAdventureModel.Ins.cleanUpVo;
        this.cleanUpVo = cleanUpVo;
        this.cfg = AdventureLevelProxy.Ins.getByLevelId(levelId);

        // let _soltItem = "soltItem";
        ItemViewFactory.clear(this._ui.imgCon,NewAdverntRewardSmallIcon.Sign);
        ItemViewFactory.clear(this._ui.rewardCon,"SoltItemView");

        if(_clearVo.rewardStr){
            ItemViewFactory.renderItemSlots(this._ui.rewardCon,this.cfg.f_ChapterReward,null,1.0,"center",SoltItemView,"SoltItemView");
        }else if(_clearVo.adverntRewardQuas){
            ItemViewFactory.renderItemSlots(this._ui.imgCon,_clearVo.adverntRewardQuas,null,1.0,"center",NewAdverntRewardSmallIcon,NewAdverntRewardSmallIcon.Sign);
        }

        // this.cfg.f_ChapterReward     f_LevelReward1

        let sub = cleanUpVo.subCount;
        
        this._ui.tf6.text = `今日剩余${sub}次 (明日刷新)`;
        
        if(cleanUpVo.mFree){
            this._ui.freeCon.visible = true;
            this._ui.saodan.visible = false;
        }else{
            this._ui.freeCon.visible = false;
            this._ui.saodan.visible = true;
            this._ui.moneyIcon.skin = IconUtils.getIconByCfgId(cleanUpVo.needItemCfgId);
            this._ui.moneyTf.text = cleanUpVo.needMoneyVal+'';
        }
        if(sub <= 0){
            this.saodanBtnCtl.grayMouseDisable = true;
        }else{
            this.saodanBtnCtl.grayMouseDisable = false;
        }
    }
}