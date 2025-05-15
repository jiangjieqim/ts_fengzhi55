import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { stCellValue, stJjcPlayer } from "../../../../network/protocols/BaseProto";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainModel } from "../../main/model/MainModel";
import { EQuickMsg } from "../../main/model/QuickMsgVo";
import { ECellType } from "../../main/vos/ECellType";
import { EJjcType, IJJC_Model } from "../../peakjjc/model/IJjcInterface";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { Arena_BuyTicket } from "../proxy/JjcProxy";
import { JjcHeadCtl } from "./JjcHeadCtl";

/**挑战itemRender */
export class JjcFightItemView extends ui.views.jjc.ui_jjc_fight_itemUI{
    private _headCtl:JjcHeadCtl;
    // private _plugCtl: FontClipCtl;
    private model:IJJC_Model;
    private fightCtl:ButtonCtl;
    private _data:stJjcPlayer;
    onBuyEndHandler: Function;
    constructor(){
        super();
        this._headCtl = new JjcHeadCtl(this.head,this.plusCon,this.nametf,this.rankImg,this.mingcitf,this.img_title);
        this.fightCtl = new ButtonCtl(this.tiaozhanbtn,new Laya.Handler(this,this.onFightHandler));
    }

    /**挑战 */
    private onFightHandler(){
        if(this.model.fightTotalCnt <= 0){
            let cfg = Arena_BuyTicket.Ins.getCfgByTime(this.model.hasAlreadyBuyCnt+1);
            MainModel.Ins.queryMsg(E.LangMgr.getLang("JjcBuy"), ECellType.GOLD, parseInt(cfg.f_Price.split("-")[1]), 
                                EQuickMsg.JJC, new Laya.Handler(this, this.buyEndHandler));
            return;
        }
        this.fight();
    }

    private buyEndHandler(selected:boolean){
        // this.model.once(JjcEvent.BuyCountSucceed,this,this.onBuySucceedHandler);
        this.model.buyFightTime(this._data.id);
    }

    private fight(){
        // let req:JjcFight_req = new JjcFight_req();
        // req.playerId = this._data.id;
        // SocketMgr.Ins.SendMessageBin(req);
        this.model.fight(this._data.id);
    }

    // private onBuySucceedHandler(){
    // this.fight();
    // }



    public setData(data:stJjcPlayer,_model:IJJC_Model){
        this.model = _model;
        this.shuye.visible = false;
        this.yb1.visible = false;
        this._data = data;
        /////////////////////////////////////
        this._headCtl.updateView(data);

        //////////////////////////////////////////////////////
        // if(_model.getType() == EJjcType.JJC){
        ItemViewFactory.setJJC_score(this,data,_model.getType());
        // }
        let v0 = this.reward[0];
        if(v0){
            this.yb1.visible = true;
            let itemId:number = v0.id;//this.model.curCfg.f_itemid;
            this.yb1.skin = IconUtils.getIconByCfgId(itemId);
            this.tf5.text = StringUtil.val2m(v0.count);
        }else{
            this.tf5.text = "";
        }
        let v1 = this.reward[1];
        if(v1){
            this.shuye.visible = true;
            this.shuye.skin = IconUtils.getIcon(v1.id);
            this.shuyetf.text = StringUtil.val2m(v1.count);
        }else{
            this.shuyetf.text = "";
        }

        this.refreshReward();
    }
    private get reward(){
        return this.model.preRewardList;
    }
    private refreshReward(){
        let _rewardList = this.reward;//this.model.succeedRewardList;
        let tflist = [this.tf5,this.shuyetf];
        for(let i = 0;i < tflist.length;i++){
            let tf = tflist[i];
            let vo:stCellValue = _rewardList[i];
            if(vo){
                tf.text = vo.count.toString();
            }else{
                tf.text = "";
            }
        }
    }
}