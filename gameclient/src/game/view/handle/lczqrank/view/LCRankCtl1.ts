import { ui } from "../../../../../ui/layaMaxUI";
import { SocketMgr } from "../../../../network/SocketMgr";
import { StarWatchPlayerInfo_req, WatchSkyRank_req, stSkyRank } from "../../../../network/protocols/BaseProto";
import { FuJiangStarCtl } from "../../fujiang/view/ctl/FuJiangStarCtl";
import { PetListProxy } from "../../lingchong/proxy/LingChongProxy";
import { MainModel } from "../../main/model/MainModel";
import { QualityUtils } from "../../main/vos/QualityUtils";
import { IconUtils } from "../../zuoqi/vos/IconUtils";

export class LCRankCtl1{
    protected _ui:ui.views.lczqrank.lczqRankItem1UI;
    private _starCtl:FuJiangStarCtl;

    constructor(skin:ui.views.lczqrank.lczqRankItem1UI) {
        this._ui = skin;
        // this._ui.bg1.on(Laya.Event.CLICK,this,this.onClick);
        this._ui.quality.on(Laya.Event.CLICK,this,this.onClick1);
        this._starCtl = new FuJiangStarCtl(this._ui.star);
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
                req.type = 2;
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

        let cfg = PetListProxy.Ins.getCfgById(this._data.id);
        this._ui.quality.skin = IconUtils.getQuaIcon(cfg.f_petquality);
        this._ui.icon1.skin = PetListProxy.Ins.getPetIconById(cfg.f_petid);
        this._ui.lab_lv.text = "Lv." + this._data.level;
        this._starCtl.setStar(this._data.star);
        this._ui.lab_name.text = cfg.f_petname;
        this._ui.lab_name.color = QualityUtils.getQuaColor(cfg.f_petquality);
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