import {StringUtil} from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { TeamFightHarmReward_req } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { ItemVo } from "../../main/vos/ItemVo";
import { FightMonsterModel } from "../vos/FightMonsterModel";
import { t_TeamFight_Reward } from "../vos/t_TeamFight_Reward";

export enum ENodeType{
    First = 0,
    Last = 1,
    Mid  = 2,
}

interface IFighthardData{
    cfg:Configs.t_TeamFight_Reward_dat;
    preview:string;
}
/**格子 */
class FighthardSlot extends ui.views.fighthard.ui_fighthard_slotUI{
    public setData(data:IFighthardData){
        // let str:string = cfg.f_preview;
        let _itemVo:ItemVo = ItemViewFactory.convertItem(data.preview);
        ItemViewFactory.refreshSlot(this.slot,_itemVo);
        this.maskbg.visible = false;
        this.gou1.visible = this.gouImg.visible = false;
        if(FightMonsterModel.Ins.harmIsLingQu(data.cfg.f_id)){
            this.gou1.visible = this.gouImg.visible = true;
        }
    }
}

class FighthardDetailItemView extends ui.views.fighthard.ui_fighthard_detail_itemUI{
    private cfg:Configs.t_TeamFight_Reward_dat;
    private _curAccHarm:number;
    // private lingquCtl:ButtonCtl;
    /**达成伤害,是否已经激活 */
    private _isEnable:boolean;
    constructor(){
        super();
        this.maskbg.mouseEnabled = false;
        // this.lingquCtl=ButtonCtl.CreateBtn(this.lingquBtn,this,this.onLingquHandler);
        // this.lingquCtl.visible = false;
    }
    // private onLingquHandler(){ 
    // let req = new TeamFightHarmReward_req();
    // SocketMgr.Ins.SendMessageBin(req);
    // }
    public refresh(index: number) {
        this._isEnable = false;
        let _nodeType:ENodeType = ENodeType.Mid;
        let l = t_TeamFight_Reward.Ins.detailList;

        this.top_bg1.visible = this.top_bg0.visible = true;
        this.bot_bg1.visible = this.bot_bg0.visible = true;
        if(index == 0){
            this.top_bg1.visible = this.top_bg0.visible = false;
            _nodeType = ENodeType.First;
        }else if(index == l.length -1){
            this.bot_bg1.visible = this.bot_bg0.visible = false;
            _nodeType = ENodeType.Last;
        }else{
            //Mid
        }

        let _curAccHarm:number = FightMonsterModel.Ins.accHarm;
        this._curAccHarm = _curAccHarm;
        this.cfg = this.dataSource;
        let val:number = parseInt(this.cfg.f_Stalls);
        this.countTf.text = FightMonsterModel.Ins.strConvert(val); //StringUtil.val2m(val, false) + "";
        // if(E.Debug){
        // this.countTf.text += " f_id:" + this.cfg.f_id;
        // }
        let arr = this.cfg.f_preview.split("|");
        let itemlist:IFighthardData[] = [];
        for(let i = 0;i< arr.length;i++){
            let obj:IFighthardData = {} as IFighthardData;
            obj.preview = arr[i];
            obj.cfg = this.cfg;
            itemlist.push(obj);
        }
        ItemViewFactory.renderItemSlots(this.rewardCon,itemlist,10,1,"right",FighthardSlot,"FighthardSlot");

        // if(E.Debug){
        // this.countTf.text+="_"+this.cfg.f_id;
        // }

        this.bg2.visible = false;

        // if (_curAccHarm < val) {
        // this.top_bg1.visible = false;
        // this.bg2.visible = false;
        // }else{
        // this.bg2.visible = true;
        // }


        switch(_nodeType){
            case ENodeType.Last:
                let next = l[index-1];
                let nextVal1 = parseInt(next.f_Stalls);
                // console.log(val1);
                let cfg = l[index];
                // cfg.f_Stalls
                let curVal:number = parseInt(cfg.f_Stalls);
                this.updateValTop(curVal, curVal + (nextVal1 - curVal) / 2);
                break;
            case ENodeType.Mid:
                let pre = l[index+1];
                let preVal = parseInt(pre.f_Stalls);
                let cur = parseInt(l[index].f_Stalls);
                this.updateBot(preVal+(cur - preVal)/2,cur,_nodeType);

                let next2 = l[index - 1];
                let nextVal2 = parseInt(next2.f_Stalls);
                this.updateValTop(cur,(nextVal2 - cur)/2);
                break;
            case ENodeType.First:
                let pre1 = l[index+1];
                let preVal1 = parseInt(pre1.f_Stalls);
                let cur1 = parseInt(l[index].f_Stalls);
                if(this.updateBot(preVal1+(cur1 - preVal1)/2,cur1,_nodeType)){
                    this._isEnable = true;
                }
                break;
        }

        if(this._isEnable){
            // this.lingquCtl.grayMouseDisable = false;
            this.maskbg.visible = false;
        }else{
            // this.lingquCtl.grayMouseDisable = true;
            this.maskbg.visible = true;
        }
    }

    /**更新底部 */
    private updateBot(start:number,end:number,type:ENodeType){
        if(this._curAccHarm >= start && this._curAccHarm < end){
            this.bot_bg1.visible = true;
            let h:number = this.height/2;
            let all = end - start;
            let val = this._curAccHarm - start;
            this.bot_bg1.width = h * val / all;
            this.bot_bg1.y = h + h - this.bot_bg1.width;
        }else if(this._curAccHarm < start){
            this.bot_bg1.visible = false;
        }else{
            this.bg2.visible = true;
            this.bot_bg1.visible = true;
            this.bot_bg1.y = this.height/2;
            this.bot_bg1.width = this.height / 2;
            return true; 
        }
    }

    /**更新顶部 
     * 
     *  __
     * |  |
     * |  |
     * |  |
    */
    private updateValTop(start:number,end:number){
        if(this._curAccHarm < start){
            this.top_bg1.visible = false;
        }else if(this._curAccHarm >= start && this._curAccHarm < end){
            this.top_bg1.visible = true;
            let p = (this._curAccHarm-start)/(end - start)
            this.top_bg1.width = this.height / 2 * p;
        }else{
            this.bg2.visible = true;
            this._isEnable = true;
            this.top_bg1.visible = true;
            this.top_bg1.width = this.height / 2;
        }
    }
}

/**鏖战详情 */
export class FighthardDetailView extends ViewBase{
    private model:FightMonsterModel;
    private _ui:ui.views.fighthard.ui_fighthard_detail_viewUI;
    protected mMask:boolean = true;
    protected  onAddLoadRes(): void{}
    protected  onExit(): void{}
    protected lingquCtl:ButtonCtl;
    protected  onFirstInit(): void{
        if(!this.UI){
            this.model = FightMonsterModel.Ins;
            this.UI = this._ui = new ui.views.fighthard.ui_fighthard_detail_viewUI();
            this.bindClose(this._ui.close1);
            this.lingquCtl=ButtonCtl.CreateBtn(this._ui.lingquBtn,this,this.onLingquHandler);
            this._ui.list1.itemRender = FighthardDetailItemView;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onDetailHandler);
        } 
    }

    private onDetailHandler(item:FighthardDetailItemView,index:number){
        item.refresh(index);
    }

    private onLingquHandler(){
        let req = new TeamFightHarmReward_req();
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onDetailEvt() {
        let fid = t_TeamFight_Reward.Ins.getCurFid(this.model.data.accHarm).f_id;
        // if (this.model.data.harmRewardFid == 0) {
        // this.lingquCtl.grayMouseDisable = true;
        // } else {

        if (this.model.data.accHarm!=0 && this.model.data.harmRewardFid < fid) {
            this.lingquCtl.grayMouseDisable = false;
        } else {
            this.lingquCtl.grayMouseDisable = true;
        }
        // }
        this._ui.list1.refresh();
    }
    protected  onInit(): void{
        let l = t_TeamFight_Reward.Ins.detailList;
        this._ui.list1.array = l;
        // let val = this.model.accHarm;
        // let _index:number = l.length - 1;
        // for(let i = l.length;i >=0;i-- ){
        //     let cfg = l[i-1];
        //     let next = l[i-2];
        //     if(next){
        //         if(val >= parseInt(cfg.f_Stalls) && val < parseInt(cfg.f_Stalls)){
        //             _index = i;
        //         }
        //     }
        // }
        // if(val > this.model.accHarm){
        //     _index = 0;
        // }

        this._ui.list1.scrollTo(l.length - 1);
        this.model.on(FightMonsterModel.EVENT_DETAIL,this,this.onDetailEvt);
        this.onDetailEvt();
    }
}