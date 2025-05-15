import { ui } from "../../../../../../ui/layaMaxUI";
import { E } from "../../../../../G";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import {SocketMgr} from "../../../../../network/SocketMgr";
import { PalaceChooseCoreBuff_req, PalaceFight_req } from "../../../../../network/protocols/BaseProto";
import { MainModel } from "../../../main/model/MainModel";
import { EQuickMsg } from "../../../main/model/QuickMsgVo";
import { WuShenDianModel } from "../../model/WuShenDianModel";
import { WuShenDianConfigProxy, WuShenDianCoreBuffProxy } from "../../proxy/WuShenDianProxy";
import { ShenHunCtl } from "../ctl/ShenHunCtl";

export class WuShenDianSHItem2 extends ui.views.wushendian.ui_wushendianSHItem2UI{
    private _ctl1:ShenHunCtl;

    constructor() {
        super();
        this.on(Laya.Event.CLICK,this,this.onClick);

        this._ctl1 = new ShenHunCtl(this.item);
    }

    private onClick(){
        if(this._data){
            let flag = false;
            for(let i:number=0;i<WuShenDianModel.Ins.coreBuffList.length;i++){
                if(WuShenDianModel.Ins.coreBuffList[i] == 0){
                    flag = true;
                    break;
                }
            }
            if(flag){
                this.sendCmd();
            }else{
                let len = parseInt(WuShenDianConfigProxy.Ins.GetDataById(1).f_BuffMinMax.split("|")[1]);
                if(WuShenDianModel.Ins.buffList.length >= len){
                    MainModel.Ins.queryMsg("核心神魂数量已满，请继续挑战",0,0,EQuickMsg.ShenHun4,new Laya.Handler(this,this.sendCmd1),"返回","继续挑战");
                }else{
                    MainModel.Ins.queryMsg("核心神魂数量已达上限，请返回开启新的神魂格或放弃选择继续挑战",0,0,EQuickMsg.ShenHun3,new Laya.Handler(this,this.sendCmd1),"返回","继续挑战");
                }
            }
        }
    }

    private sendCmd(){
        let req:PalaceChooseCoreBuff_req = new PalaceChooseCoreBuff_req;
        req.coreBuffId = this._data.f_id;
        SocketMgr.Ins.SendMessageBin(req);
        E.ViewMgr.Close(EViewType.WuShenDianSHView);
    }

    private sendCmd1(){
        let req:PalaceFight_req = new PalaceFight_req;
        req.type = 1;
        SocketMgr.Ins.SendMessageBin(req);
        E.ViewMgr.Close(EViewType.WuShenDianSHView);
    }

    private _data:Configs.t_Palace_Data_CoreBuff_dat;
    public setData(value:number){
        if(!value)return;
        this._data = WuShenDianCoreBuffProxy.Ins.GetDataById(value);
        this._ctl1.setData(this._data.f_ColorID,this._data.f_Icon,this._data.f_CorebuffName);
        this.lab_dec1.text = this._data.f_Corebuffdes;
    }
}