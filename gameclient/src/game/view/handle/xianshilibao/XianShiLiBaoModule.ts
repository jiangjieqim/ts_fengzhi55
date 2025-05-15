import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { E } from "../../../G";
import { EViewType } from "../../../common/defines/EnumDefine";
import { MSGID } from "../../../network/MSGID";
import { popWinDiscount_revc } from "../../../network/protocols/BaseProto";
import { XianShiLiBaoModel } from "./model/XianShiLiBaoModel";
import { XianShiLiBaoView } from "./view/XianShiLiBaoView";
import { ELabodayType } from "../laborday/views/LabordayShopView";
import { ELayerType } from "../../../layer/LayerMgr";

export class XianShiLiBaoModule extends BaseModel{
    private static _ins:XianShiLiBaoModule;
    public static get ins(){
        if(!this._ins){
            this._ins = new XianShiLiBaoModule();
        }
        return this._ins;
    }

    public onInitCallBack():void{
        
    }

    public initMsg(): void {
        this.Reg(new XianShiLiBaoView(EViewType.XianShiLiBaoView,ELayerType.subFrameLayer));

        E.MsgMgr.AddMsg(MSGID.popWinDiscount, this.popWinDiscount,this);
    }

    private popWinDiscount(value:popWinDiscount_revc){
        for(let i:number=0;i<value.dataList.length;i++){
            let index = XianShiLiBaoModel.Ins.dataList.findIndex(ele => ele.uid == value.dataList[i].uid);
            if(index != -1){
                XianShiLiBaoModel.Ins.dataList[index] = value.dataList[i];
            }else{
                XianShiLiBaoModel.Ins.dataList.push(value.dataList[i]);
            }
        }
        XianShiLiBaoModel.Ins.event(XianShiLiBaoModel.UPDATA_VIEW);
    }
}