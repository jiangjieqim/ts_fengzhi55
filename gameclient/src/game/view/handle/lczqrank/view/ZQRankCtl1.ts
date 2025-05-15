import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ui } from "../../../../../ui/layaMaxUI";
import { SocketMgr } from "../../../../network/SocketMgr";
import { StarWatchPlayerInfo_req, WatchSkyRank_req, stSkyRank } from "../../../../network/protocols/BaseProto";
import { FontClipCtl } from "../../avatar/ctl/FontClipCtl";
import { FontCtlFactory } from "../../avatar/ctl/FontCtlFactory";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainModel } from "../../main/model/MainModel";
import { QualityUtils } from "../../main/vos/QualityUtils";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { Mount_ListProxy } from "../../zuoqi/vos/ZuoqiProxy";

export class ZQRankCtl1{
    protected _ui:ui.views.lczqrank.lczqRankItem3UI;
    private _plusCtl: FontClipCtl;

    constructor(skin:ui.views.lczqrank.lczqRankItem3UI) {
        this._ui = skin;
        // this._ui.bg1.on(Laya.Event.CLICK,this,this.onClick);
        this._ui.quality.on(Laya.Event.CLICK,this,this.onClick1);
        this._plusCtl = FontCtlFactory.createPlus();
    }

    private onClick(){
        if (this._data) {
            if (this._data.accountId != MainModel.Ins.mRoleData.mPlayer.AccountId) {
                let req: StarWatchPlayerInfo_req = new StarWatchPlayerInfo_req();
                req.accountId = this._data.accountId;
                SocketMgr.Ins.SendMessageBin(req);
            }
        }
    }

    private onClick1(){
        if (this._data) {
            if (this._data.accountId != MainModel.Ins.mRoleData.mPlayer.AccountId) {
                let req: WatchSkyRank_req = new WatchSkyRank_req();
                req.accountId = this._data.accountId;
                req.serialNum = this._data.serialNum;
                req.type = 1;
                SocketMgr.Ins.SendMessageBin(req);
            }
        }
    }

    private _data:stSkyRank;
    public setData(value:stSkyRank,type:number = 1){
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

        let cfg = Mount_ListProxy.Ins.getCfg(value.id);
        this._ui.quality.skin = IconUtils.getQuaIcon(cfg.f_Quality);
        this._ui.icon1.skin = IconUtils.getHorseIcon(cfg.f_MountID);
        this._ui.lab_lv.text = "Lv." + this._data.level;
        ItemViewFactory.setStar(this._ui.starcon,this._data.star,this._data.star,false);
        let v = StringUtil.val2Atlas(value.plus);
        this._plusCtl.setValue(this._ui.plusCon,v);
        this._ui.labname1.text = cfg.f_MountName;
        this._ui.labname1.color = QualityUtils.getQuaColor(cfg.f_Quality);

        MainModel.Ins.setTTHead(this._ui.icon,MainModel.Ins.convertHead(this._data.headUrl));
        this._ui.nameTf.text = this._data.nickName;
        this._ui.lab_qf.text = "(" + this._data.serverName + ")";

        if(type == 1){
            this._ui.bg.skin = "remote/lczqrank/dfjjc_xs.png";
        }else{
            this._ui.bg.skin = "remote/lczqrank/dfjjc_xszj.png";
        }
    }
}