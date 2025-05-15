import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ui } from "../../../../../ui/layaMaxUI";
import { SocketMgr } from "../../../../network/SocketMgr";
import { CommonWatchPlayerInfo_req, stCommonRank, stStarRank } from "../../../../network/protocols/BaseProto";
import { FontClipCtl } from "../../avatar/ctl/FontClipCtl";
import { FontCtlFactory } from "../../avatar/ctl/FontCtlFactory";
import { ChengHaoModel } from "../../chenghao/model/ChengHaoModel";
import { MainModel } from "../../main/model/MainModel";
import { AdventureLevelProxy } from "../../main/proxy/AdventureLevelProxy";

export class KaiFuChongBangCtl1{
    protected _ui:ui.views.kaifuchongbang.ui_KaiFuChongBangitem1UI;
    private _plusCtl: FontClipCtl;

    constructor(skin:ui.views.kaifuchongbang.ui_KaiFuChongBangitem1UI) {
        this._ui = skin;
        this._ui.bg1.on(Laya.Event.CLICK,this,this.onClick);
        this._plusCtl = FontCtlFactory.createPlus();
    }

    private onClick(){
        if (this._data) {
            if (this._data.accountId != MainModel.Ins.mRoleData.mPlayer.AccountId) {
                let req: CommonWatchPlayerInfo_req = new CommonWatchPlayerInfo_req();
                req.accountId = this._data.accountId;
                req.type = 1;
                SocketMgr.Ins.SendMessageBin(req);
            }
        }
    }

    private _data:stCommonRank;
    public setData(value:stCommonRank,type:number = 1){
        if(!value)return;
        this._data = value;
        if(this._data.ranking == 1 || this._data.ranking == 2 || this._data.ranking == 3){
            this._ui.sp.visible = false;
            this._ui.paiming.skin = "remote/main/main/dfjjc_mc" + this._data.ranking + ".png";
        }else{
            this._ui.sp.visible = true;
            this._ui.paiming.skin = "";
            if(this._data.ranking <= 200){
                this._ui.mingcitf.text = this._data.ranking + "";
            }else{
                this._ui.mingcitf.text = "200+";
            }
        }
        MainModel.Ins.setTTHead(this._ui.icon, MainModel.Ins.convertHead(this._data.headUrl));
        this._ui.nameTf.text = this._data.nickName;
        this._ui.img_title.skin = ChengHaoModel.Ins.getTitleImg(this._data.titleId);
        let v = StringUtil.val2Atlas(this._data.plus);
        this._plusCtl.setValue(this._ui.plusCon,v);
        this._ui.lab_num.text = AdventureLevelProxy.Ins.getAdventureTaskName(this._data.commonNum);

        if(type == 1){
            this._ui.bg.skin = "remote/kaifuchongbang/dfjjc_xs.png";
        }else{
            this._ui.bg.skin = "remote/kaifuchongbang/dfjjc_xszj.png";
        }
    }
}