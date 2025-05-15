import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { DotManager } from "../../common/DotManager";
import { ActivityModel } from "../../huodong/ActivityModel";
import { ActivityVo } from "../../huodong/model/ActivityVo";
import { EActivityType } from "../../huodong/model/EActivityType";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { AdventureLevelProxy } from "../../main/proxy/AdventureLevelProxy";
import { ItemVo } from "../../main/vos/ItemVo";

export class KaiFuChongBangItem2 extends ui.views.kaifuchongbang.ui_KaiFuChongBangitem2UI{
    constructor(){
        super();

        this.list.itemRender = ui.views.main.ui_slot_itemUI;
        this.list.renderHandler = new Laya.Handler(this,this.onItemHandler);

        ButtonCtl.Create(this.btn,new Laya.Handler(this,this.onBtnClick));
    }

    private onBtnClick(){
        if(this._activityVo && this._data){
            ActivityModel.Ins.lingQu(this._activityVo.uid, this._data.f_id);
        }
    }

    private onItemHandler(item:ui.views.main.ui_slot_itemUI){
        let vo = new ItemVo();
        vo.cfgId = parseInt(item.dataSource.split("-")[0]);
        vo.count = parseInt(item.dataSource.split("-")[1]);
        ItemViewFactory.refreshSlot(item,vo);
    }

    private _activityVo:ActivityVo;
    private _data:Configs.t_OpenServerActivity_AdvantureReward_dat;
    public setData(value:Configs.t_OpenServerActivity_AdvantureReward_dat){
        if(!value)return;
        this._data = value;
        this.lab.text = "通过冒险" + AdventureLevelProxy.Ins.getAdventureTaskName(value.f_LevelID);
        this.list.array = value.f_Reward.split("|");
        DotManager.removeDot(this.btn);
        this._activityVo = ActivityModel.Ins.getVo(EActivityType.KaiFuChongBang);
        if(this._activityVo){
            let voo = this._activityVo.vo.datalist.find(item => item.id == value.f_id);
            if(voo){
                if(voo.param1 == 1){
                    this.btn.disabled = true;
                    this.lab_btn.text = "已领取";
                }else if(voo.param1 == 2){
                    this.btn.disabled = false;
                    this.lab_btn.text = "领取";
                    DotManager.addDot(this.btn);
                }else if(voo.param1 == 0){
                    this.btn.disabled = true;
                    this.lab_btn.text = "领取";
                }
            }else{
                this.btn.disabled = true;
                this.lab_btn.text = "领取";
            }
        }else{
            this.btn.disabled = true;
            this.lab_btn.text = "领取";
        }
    }
}