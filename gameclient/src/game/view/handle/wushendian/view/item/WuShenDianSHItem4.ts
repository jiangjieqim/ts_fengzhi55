import { ui } from "../../../../../../ui/layaMaxUI";
import {SocketMgr} from "../../../../../network/SocketMgr";
import { PalaceUnlockBuff_req } from "../../../../../network/protocols/BaseProto";
import { MainModel } from "../../../main/model/MainModel";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";
import { WuShenDianModel } from "../../model/WuShenDianModel";
import { WuShenDianConfigProxy, WuShenDianCoreBuffProxy } from "../../proxy/WuShenDianProxy";

export class WuShenDianSHItem4 extends ui.views.wushendian.ui_wushendianSHItem4UI{
    constructor() {
        super();

        this.icon.on(Laya.Event.CLICK,this,this.onIconClick);
        this.img_suo.on(Laya.Event.CLICK,this,this.onImgClick);
    }

    private onIconClick(e:Laya.Event){
        e.stopPropagation();
        if(this._data){
            MainModel.Ins.showSmallTips("", this._data.f_CorebuffName + " " + this._data.f_demension, e.target);
        }
    }

    private onImgClick(){
        let len = parseInt(WuShenDianConfigProxy.Ins.GetDataById(1).f_CoreBuffMinMax.split("|")[0]);
        let num = WuShenDianModel.Ins.coreBuffList.length - len;
        let st = WuShenDianConfigProxy.Ins.GetDataById(1).f_CoreLatticeLnit;
        let id = parseInt(st.split("-")[0]);
        let count = parseInt(st.split("-")[1]);
        let cou = count;
        for(let i:number = 0; i < num;i++){
            cou = cou * 2; 
        }
        MainModel.Ins.queryMsg("解锁核心神魂格吗",id,cou,0,new Laya.Handler(this,this.onClickHandler));
    }

    private onClickHandler(){
        let req:PalaceUnlockBuff_req = new PalaceUnlockBuff_req;
        req.type = 1;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private _data:Configs.t_Palace_Data_CoreBuff_dat;
    public setData(value:any){
        if(!value)return;
        if(value.suo == 1){
            this.img_suo.visible = true;
            this.img_qua.visible = false;
            this._data = null;
        }else{
            this.img_suo.visible = false;
            this.img_qua.visible = true;
            if(value.data){
                this._data = WuShenDianCoreBuffProxy.Ins.GetDataById(value.data);
                this.img_qua.skin = IconUtils.getQuaIcon(this._data.f_ColorID);
                this.icon.skin = "o/Palace/" + this._data.f_Icon + ".png";
            }else{
                this.img_qua.skin = "";
                this.icon.skin = "";
                this._data = null;
            }
        }
    }
}