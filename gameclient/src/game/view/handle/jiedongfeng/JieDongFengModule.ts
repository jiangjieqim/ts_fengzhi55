import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { E } from "../../../G";
import { EViewType } from "../../../common/defines/EnumDefine";
import { MSGID } from "../../../network/MSGID";
import { NewPlayerAttr_revc } from "../../../network/protocols/BaseProto";
import { ActivityModel } from "../huodong/ActivityModel";
import { ActivityEvent } from "../huodong/model/ActivityEvent";
import { EFuncDef } from "../main/model/EFuncDef";
import { MainEvent } from "../main/model/MainEvent";
import { MainModel } from "../main/model/MainModel";
import { RedUpdateModel } from "../main/model/RedUpdateModel";
import { JieDongFengModel } from "./model/JieDongFengModel";
import { JieDongFengView } from "./view/JieDongFengView";
import { JieDongFengView1 } from "./view/JieDongFengView1";

export class JieDongFengModule extends BaseModel{
    private static _ins:JieDongFengModule;
    public static get ins(){
        if(!this._ins){
            this._ins = new JieDongFengModule();
        }
        return this._ins;
    }
    public onInitCallBack():void{
        JieDongFengModel.Ins.dataList = null;
    }

    public initMsg(): void {
        MainModel.Ins.on(MainEvent.MainViewInit,this,this.onMainViewInit);
        ActivityModel.Ins.on(ActivityEvent.UpdateData,this,this.onMainViewInit);
        RedUpdateModel.Ins.on(RedUpdateModel.UPDATA,this,this.onMainViewInit);

        this.Reg(new JieDongFengView(EViewType.JieDongFengView));
        this.Reg(new JieDongFengView1(EViewType.JieDongFengView1));

        E.MsgMgr.AddMsg(MSGID.NewPlayerAttr, this.NewPlayerAttr,this);
    }

    private onMainViewInit(){
        Laya.timer.callLater(this,this.setDot);
    }

    private setDot(){
        if(JieDongFengModel.Ins.isRedTip()){
            MainModel.Ins.funcSetRed(EFuncDef.JieDongFeng,true);
        }else{
            MainModel.Ins.funcSetRed(EFuncDef.JieDongFeng,false);
        }
    }

    private NewPlayerAttr(value:NewPlayerAttr_revc){
        JieDongFengModel.Ins.setDataList(value.dataList);
        JieDongFengModel.Ins.event(JieDongFengModel.UpdataView);
    }
}