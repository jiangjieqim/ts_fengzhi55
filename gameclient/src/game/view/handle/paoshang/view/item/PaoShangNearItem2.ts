import { ColorUtil } from "../../../../../../frame/util/ColorUtil";
import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { E } from "../../../../../G";
import { RemRemarkStationNearBy_req, StationNearByDetail_req, stItemStation, stStationNearBy } from "../../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../../network/SocketMgr";
import { MainModel } from "../../../main/model/MainModel";
import { EQuickMsg } from "../../../main/model/QuickMsgVo";
import { PaoShangModel } from "../../model/PaoShangModel";
import { PaoShangMissionListProxy } from "../../proxy/PaoShangProxy";
import { PaoShangView } from "../PaoShangView";

export class PaoShangNearItem2 extends ui.views.paoshang.ui_paoshangYZItem2UI{
    constructor() {
        super();

        this.list.itemRender = ui.views.paoshang.ui_paoshangYZItem3UI;
        this.list.renderHandler = new Laya.Handler(this,this.itemRender);
        ButtonCtl.Create(this.btn,new Laya.Handler(this,this.onClick));
        ButtonCtl.Create(this.btn_del,new Laya.Handler(this,this.onDelClick));
    }

    private onClick(){
        let req:StationNearByDetail_req = new StationNearByDetail_req();
        req.isRealPlayer = this._data.isRealPlayer;
        req.playerId = this._data.playerId;
        req.type = 2;
        SocketMgr.Ins.SendMessageBin(req);
        let view:PaoShangView = E.ViewMgr.Get(EViewType.PAOSHANG) as PaoShangView;
        if(view ){
            view.setList();
        }
        E.ViewMgr.Close(EViewType.PAOSHANGNEAR);
    }

    private onDelClick(){
        MainModel.Ins.queryMsg("是否确定删除该标记?",0,0,EQuickMsg.PaoShangDel,new Laya.Handler(this,this.onDelHandler));
    }

    private onDelHandler(){
        let req:RemRemarkStationNearBy_req = new RemRemarkStationNearBy_req();
        req.isRealPlayer = this._data.isRealPlayer;
        req.playerId = this._data.playerId;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private itemRender(item:ui.views.paoshang.ui_paoshangYZItem3UI){
        let data = item.dataSource as stItemStation;
        let cfg = PaoShangMissionListProxy.Ins.getCfgByMissionID(data.missionId);
        switch(data.state){
            case 1:
                item.img_tou.visible = false;
                item.box1.visible = true;
                item.icon.skin = PaoShangModel.Ins.getStationIcon(data.missionId);
                item.box.visible = false;
                break;
            case 2:
                item.img_tou.visible = true;
                item.box1.visible = true;
                item.icon.skin = PaoShangModel.Ins.getStationIcon(data.missionId);
                item.box.visible = false;
                break;
            case 3:
                item.img_tou.visible = false;
                item.box1.visible = false;
                item.box.visible = true;
                item.icon3.skin = PaoShangModel.Ins.getStationIcon(data.missionId);
                break;
        }
        item.img_tou.filters = item.img_mc1.filters = item.icon.filters = item.img_mc2.filters = item.icon3.filters = [];
        switch(data.handlerState){
            case 0:
                item.img_bg.visible = false;
                item.txt.text = "";
                item.img_tou.filters = item.img_mc1.filters = item.icon.filters 
                = item.img_mc2.filters = item.icon3.filters = ColorUtil.CreateColorFilter(1);
                break;
            case 1:
                item.img_bg.visible = true;
                item.txt.text = "可掠夺";
                break;
            case 2:
                item.img_bg.visible = true;
                item.txt.text = "可破坏";
                break;
        }
    }

    private _data:stStationNearBy;
    public setData(value:stStationNearBy){
        if(!value)return;
        this._data = value;
        this.icon.skin = value.headUrl;
        this.txt_name.text = value.nickName;
        this.txt_num.text = value.underwayNum + "/" + value.totalNum;
        value.datalist.sort((a,b)=>{
            if(a.handlerState > b.handlerState){
                return -1;
            }else if(a.handlerState < b.handlerState){
                return 1;
            }else{
                return 0;
            }
        });
        this.list.array = value.datalist;
    }
}