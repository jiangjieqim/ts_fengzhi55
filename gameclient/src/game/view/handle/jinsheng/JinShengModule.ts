import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { E } from "../../../G";
import { EViewType } from "../../../common/defines/EnumDefine";
import { MSGID } from "../../../network/MSGID";
import { PromotionDataChange_revc, PromotionInit_revc, PromotionUgraded_revc } from "../../../network/protocols/BaseProto";
import { EFuncDef } from "../main/model/EFuncDef";
import { MainEvent } from "../main/model/MainEvent";
import { MainModel } from "../main/model/MainModel";
import { JinShengModel } from "./model/JinShengModel";
import { JinShengView } from "./view/JinShengView";
import { JinShengView1 } from "./view/JinShengView1";

export class JinShengModule extends BaseModel{
    private static _ins:JinShengModule;
    public static get ins(){
        if(!this._ins){
            this._ins = new JinShengModule();
        }
        return this._ins;
    }

    public onInitCallBack():void{
        
    }

    public initMsg(): void {
        this.Reg(new JinShengView(EViewType.JinShengView));
        this.Reg(new JinShengView1(EViewType.JinShengView1));

        E.MsgMgr.AddMsg(MSGID.PromotionInit, this.PromotionInit,this);
        E.MsgMgr.AddMsg(MSGID.PromotionUgraded, this.PromotionUgraded,this);
        E.MsgMgr.AddMsg(MSGID.PromotionDataChange, this.PromotionDataChange,this);
    }

    //晋升初始化
    private PromotionInit(value:PromotionInit_revc){
        JinShengModel.Ins.promotionLevel = value.promotionLevel;
        JinShengModel.Ins.promotionList = value.dataList;
    }

    //晋升成功变化
    private PromotionUgraded(value:PromotionUgraded_revc){
        JinShengModel.Ins.promotionLevel = value.promotionLevel;
        JinShengModel.Ins.promotionList = value.dataList;
        JinShengModel.Ins.event(JinShengModel.Updata_View);
        E.ViewMgr.Open(EViewType.JinShengView1);
    }

    //晋升任务、奖励相关发生变化
    private PromotionDataChange(value:PromotionDataChange_revc){
        for(let i:number=0;i<value.dataList.length;i++){
            let index = JinShengModel.Ins.promotionList.findIndex(ele => ele.taskId == value.dataList[i].taskId);
            JinShengModel.Ins.promotionList[index] = value.dataList[i];
        }
        JinShengModel.Ins.event(JinShengModel.Updata_View);
    }
}