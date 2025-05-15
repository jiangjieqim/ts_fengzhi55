import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { E } from "../../../../../G";
import { StationBuy_req } from "../../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../../network/SocketMgr";

/* @Author: tsy
 * @Date: 2023-02-28 10:19:54
 * @Last Modified by: tsy
 * @Last Modified time: 2023-03-06 15:26:27
*/
export class PaoShangJSItem extends ui.views.paoshang.ui_paoshangJSItemUI{
    constructor() {
        super();

        ButtonCtl.Create(this.btn,new Laya.Handler(this,this.onClick));
    }

    private onClick(){
        if(this._data.f_Enable == 1){
            let req:StationBuy_req = new StationBuy_req();
            req.id = this._data.f_id;
            SocketMgr.Ins.SendMessageBin(req);
        }else if(this._data.f_Enable == 2){
            E.ViewMgr.Open(EViewType.YueKa);
        }else if(this._data.f_Enable == 3){
            E.ViewMgr.Open(EViewType.ZhongShenKa);
        }
    }

    private _data:Configs.t_Station_SlotOpen_dat;
    public setData(value:Configs.t_Station_SlotOpen_dat){
        if(!value)return;
        this._data = value;
        switch(value.f_Enable){
            case 1:
                this.img2.visible = this.img3.visible = false;
                this.img1.visible = true;
                this.txt.text = "花费" + value.f_SlotOpen.split("-")[1];
                break;
            case 2:
                this.img1.visible = this.img3.visible = false;
                this.img2.visible = true;
                break;
            case 3:
                this.img1.visible = this.img2.visible = false;
                this.img3.visible = true;
                break;
        }
    }
}