import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import {SocketMgr} from "../../../../network/SocketMgr";
import { ArtifactPack_req } from "../../../../network/protocols/BaseProto";
import {DotManager} from "../../common/DotManager";
import { ActivityModel } from "../../huodong/ActivityModel";
import { t_Purchase_PriceProxy } from "../../huodong/model/ActivityProxy";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { ItemVo } from "../../main/vos/ItemVo";
import { ShenBinModel } from "../model/ShenBinModel";
import { ESkinRateBtn, RateBtn01Ctl, RateBtnUtils } from "../../huodong/views/RateBtn01Ctl";
import { E } from "../../../../G";
import { EShopPayType } from "../../shop/proxy/shopProxy";

export class ShenBinLBItem extends ui.views.shenbin.ui_shenbingLBItemUI{
    private btnCtl:ButtonCtl;
    private rateCtl:RateBtn01Ctl;
    constructor(){
        super();

        this.list.itemRender = ui.views.main.ui_slot_itemUI;
        this.list.renderHandler = new Laya.Handler(this,this.onItemHandler);

        this.btnCtl = ButtonCtl.Create(this.btn,new Laya.Handler(this,this.onBtnClick));
        this.rateCtl = new RateBtn01Ctl(this.ratebtn,this,this.onBtnClick,ESkinRateBtn.Yellow);
    }

    private onBtnClick(){
        if(this._data){
            if(this._data.f_PurchaseID){
                ActivityModel.Ins.recharge(this._data.f_PurchaseID);
            }else{
                let rep:ArtifactPack_req = new ArtifactPack_req;
                rep.id = this._data.f_id;
                SocketMgr.Ins.SendMessageBin(rep);
            }
        }
    }

    private onItemHandler(item:ui.views.main.ui_slot_itemUI){
        let vo = new ItemVo();
        vo.cfgId = parseInt(item.dataSource.split("-")[0]);
        vo.count = parseInt(item.dataSource.split("-")[1]);
        ItemViewFactory.refreshSlot(item,vo);
    }

    private _data:Configs.t_Artifact_pack_dat;
    public setData(value:Configs.t_Artifact_pack_dat){
        if(!value)return;
        this._data = value;
        this.lab_name.text = value.f_name;
        this.list.array = value.f_Item.split("|");
        let vo = ShenBinModel.Ins.dataPackList.find(ele => ele.id == value.f_id);
        this.lab_num.text = vo.num + "/" + value.f_BuyTimes;

        let curBtn:ButtonCtl = this.btnCtl;
        //=======================================================================
        DotManager.removeDot(this.btnCtl.skin);
        DotManager.removeDot(this.rateCtl.btnCtl.skin);
        this.rateCtl.btnCtl.visible = false;
        //=======================================================================
        if(value.f_PurchaseID){
            let _purcCfg:Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(value.f_PurchaseID);
            this.tf1.text = _purcCfg.f_price/100 + "元";
            
            if(_purcCfg.f_isVoucher == EShopPayType.Voucher){
                this.rateCtl.cfg = _purcCfg;
                curBtn = this.rateCtl.btnCtl;
            }
            RateBtnUtils.Refresh(curBtn,this.btnCtl,this.rateCtl.btnCtl);
        }else{
            this.tf1.text = E.getLang("Free");
            if(vo.num == 0){
                DotManager.addDot(curBtn.skin,20,-10);
            }
        }
        if(vo.num >= value.f_BuyTimes){
            curBtn.grayMouseDisable = true;
        }else{
            curBtn.grayMouseDisable = false;
        }
    }
}