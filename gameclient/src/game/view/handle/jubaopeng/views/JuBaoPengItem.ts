import { LogSys } from "../../../../../frame/log/LogSys";
import {StringUtil} from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { FundReward_req } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import { ELingQuStatus } from "../../huodong/model/EActivityType";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { IFundDataCfg } from "../proxys/TreasureProxy";
import { TreasureModel } from "../TreasureModel";
import { JuBaoPengSlotView, TreasureSlotVo } from "./JuBaoPengSlotView";
export class Jubaopeng_itemView extends ui.views.huodong.ui_jubaopeng_itemUI{
    private data: IFundDataCfg;
    private cfg:Configs.t_Fund_dat;
    private getLingquCtl:ButtonCtl;
    private initPosY:number = 0;
    private curTime:number = 0;
    public _status: ELingQuStatus;
    constructor(){
        super();
        this.getLingquCtl = new ButtonCtl(this.lingquBtn, new Laya.Handler(this, this.onLingQuHandler));
        this.initPosY = this.lingquBtn.y;
    }

    private lingquAction(){
        if(!this.model.isOpen){
            E.ViewMgr.ShowMidError(E.getLang("activityend"));
            return;
        }
        if(this.curTime!=0 && Laya.timer.currTimer < this.curTime + 1000){
            // LogSys.LogColor("time illegal ! ---> used play "+(Laya.timer.currTimer - this.curTime));
            return;
        }
        this.curTime = Laya.timer.currTimer;

        let req = new FundReward_req();
        req.f_id = this.data.f_id;
        req.id = this.cfg.f_id;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onLingQuHandler() {
       this.lingquAction();
    }

    public setData(cfg:Configs.t_Fund_dat,data: IFundDataCfg) {
        this.cfg = cfg;
        this.data = data;
        let rewards = data.f_FundReward;
        this.dayTf.text = E.getLang("huodong02",StringUtil.toChinesNum(data.f_Day));
        if(E.Debug){
            // this.dayTf.text+="-----" + cfg.f_id + "," + data.f_id;
        }
        ///////////////////////////////////////////////////////////////////
        this.getLingquCtl.visible = false;
        this.getLingquCtl.grayMouseDisable = false;
        this.lingquTf.text = E.getLang("LingQu");
        let _status: ELingQuStatus = ELingQuStatus.NotCanLingQu;
        if (this.model.isBuyed(cfg.f_id)) {
            this.getLingquCtl.visible = true;

            _status = this.model.getStatus(cfg.f_id, data.f_id);

            if (_status == ELingQuStatus.CanLLingQu) {
            
            }
            else if(_status == ELingQuStatus.IsLingQu){
                this.lingquTf.text = E.getLang("LingQu2");
                this.getLingquCtl.grayMouseDisable = true;
            }
            else if(_status == ELingQuStatus.NotCanLingQu){
                //无法领取
                this.getLingquCtl.grayMouseDisable = true;
            }
        }else{
            //未购买
        }
        this._status = _status;
        let itemArr = rewards.split("|");
        let gap: number = 10;
        let mWidth:number = 100;

        let rewardList:TreasureSlotVo[] = [];
        for(let i = 0;i < itemArr.length;i++){
            rewardList.push(TreasureSlotVo.createVo(itemArr[i],_status == ELingQuStatus.IsLingQu));
        }

        ItemViewFactory.renderItemSlots(this.rewardCon, rewardList, gap, 1, "left",JuBaoPengSlotView,"JuBaoPengSlotView");
        let offsetx = this.rewardCon.x;
        let ow = offsetx * 2 + (itemArr.length * (mWidth + gap)) - gap;
        this.width = ow;
        this.getLingquCtl.setpos((this.width - this.lingquBtn.width) / 2, this.initPosY);

        if(this.getLingquCtl.visible){
            this.rewardCon.y = 113;
        }else{
            this.rewardCon.y = 149;
        }

        if(this.model.getStatus(this.cfg.f_id,data.f_id) == ELingQuStatus.CanLLingQu){
            this.redImg.visible = true;
        }else{
            this.redImg.visible = false;
        }
    }

    private get model(){
        return TreasureModel.ins;
    }
}