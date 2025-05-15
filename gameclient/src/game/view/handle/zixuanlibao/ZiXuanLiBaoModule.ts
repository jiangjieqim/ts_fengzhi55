import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { E } from "../../../G";
import { EViewType } from "../../../common/defines/EnumDefine";
import { MSGID } from "../../../network/MSGID";
import { OptionalGift_revc } from "../../../network/protocols/BaseProto";
import { ActivityModel } from "../huodong/ActivityModel";
import { ActivityEvent } from "../huodong/model/ActivityEvent";
import { EFuncDef } from "../main/model/EFuncDef";
import { MainEvent } from "../main/model/MainEvent";
import { MainModel } from "../main/model/MainModel";
import { ZiXuanLiBaoModel } from "./model/ZiXuanLiBaoModel";
import { ZiXuanLiBaoView } from "./view/ZiXuanLiBaoView";
import { ZiXuanLiBaoView1 } from "./view/ZiXuanLiBaoView1";

export class ZiXuanLiBaoModule extends BaseModel{
    private static _ins:ZiXuanLiBaoModule;
    public static get ins(){
        if(!this._ins){
            this._ins = new ZiXuanLiBaoModule();
        }
        return this._ins;
    }

    public onInitCallBack():void{
        
    }

    public initMsg(): void {
        MainModel.Ins.on(MainEvent.MainViewInit,this,this.onMainViewInit);
        ActivityModel.Ins.on(ActivityEvent.UpdateData,this,this.onMainViewInit);

        this.Reg(new ZiXuanLiBaoView(EViewType.ZiXuanLiBaoView));
        this.Reg(new ZiXuanLiBaoView1(EViewType.ZiXuanLiBaoView1));

        E.MsgMgr.AddMsg(MSGID.OptionalGift, this.OptionalGift,this);
    }

    private onMainViewInit() {
        Laya.timer.callLater(this, this.setDot);
    }

    private setDot() {
        if (ZiXuanLiBaoModel.Ins.isRedTip()) {
            MainModel.Ins.funcSetRed(EFuncDef.zixuanlibao, true);
        }else {
            MainModel.Ins.funcSetRed(EFuncDef.zixuanlibao, false);
        }
    }

    private OptionalGift(value:OptionalGift_revc){
        if(value.type == 0){
            ZiXuanLiBaoModel.Ins.dataList = value.dataList;
        }else if(value.type == 1){
            for(let i:number=0;i<value.dataList.length;i++){
                let index = ZiXuanLiBaoModel.Ins.dataList.findIndex(ele => ele.id == value.dataList[i].id);
                if(index != -1){
                    ZiXuanLiBaoModel.Ins.dataList[index] = value.dataList[i];
                }
            }
        }
        this.onMainViewInit();
        ZiXuanLiBaoModel.Ins.event(ZiXuanLiBaoModel.UPDATA_VIEW);
    }
}