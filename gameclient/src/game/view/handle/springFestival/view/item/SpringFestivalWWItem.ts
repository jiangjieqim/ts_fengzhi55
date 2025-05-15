import { ui } from "../../../../../../ui/layaMaxUI";
import { E } from "../../../../../G";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { stSpringFestivalRewardInfo } from "../../../../../network/protocols/BaseProto";
import { DotManager } from "../../../common/DotManager";
import { SpringFestivalModel } from "../../model/SpringFestivalModel";
import { SFStageRewardsProxy } from "../../proxy/SpringFestivalProxy";

export class SpringFestivalWWItem extends ui.views.springFestival.ui_springFestivalWWItemUI{
    constructor(){
        super();
        this.sp.on(Laya.Event.CLICK,this,this.onClick);
    }

    private onClick(){
        if(SpringFestivalModel.Ins.getIsEnroll()){
            E.ViewMgr.Open(EViewType.SpringFestivalWWView);
        }
    }

    public setData(value:Configs.t_Event_2024Spring_StageRewards_dat,index:number){
        this.zOrder = 100 - index;
        this.lab.text = "第" + value.f_stage + "阶段";
        this.lab1.text = value.f_Value + "";
        let num:number = 0;
        let val:number = 0;
        if(index == 0){
            num = SpringFestivalModel.Ins.prestige;
            val = value.f_Value;
        }else{
            num = SpringFestivalModel.Ins.prestige - SFStageRewardsProxy.Ins.List[index - 1].f_Value;
            val = value.f_Value - SFStageRewardsProxy.Ins.List[index - 1].f_Value;
        }
        if(num <= 0)num = 0;
        let count = num / val;
        if(count >= 1)count = 1;
        this.pro.width = count * 89; 

        if(SpringFestivalModel.Ins.prestige >= value.f_Value){
            this.img.skin = "remote/springFestival/redpacket.png";
        }else{
            this.img.skin = "remote/springFestival/whitepacket.png";
        }

        let vo:stSpringFestivalRewardInfo = SpringFestivalModel.Ins.rewardList.find(ele => ele.fid == value.f_id);
        if(vo.state == 2){
            DotManager.addDot(this.sp);
        }else{
            DotManager.removeDot(this.sp);
        }
    }
}