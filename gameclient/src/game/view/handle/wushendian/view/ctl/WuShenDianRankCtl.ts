import {StringUtil} from "../../../../../../frame/util/StringUtil";
import { ui } from "../../../../../../ui/layaMaxUI";
import { StarWatchPlayerInfo_req, stPalacePlayer } from "../../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../../network/SocketMgr";
import { FontClipCtl } from "../../../avatar/ctl/FontClipCtl";
import { FontCtlFactory } from "../../../avatar/ctl/FontCtlFactory";
import { ChengHaoModel } from "../../../chenghao/model/ChengHaoModel";
import { MainModel } from "../../../main/model/MainModel";

export class WuShenDianRankCtl {
    protected _ui:ui.views.wushendian.ui_wushendianRankItemUI;
    private _plusCtl: FontClipCtl;

    constructor(skin:ui.views.wushendian.ui_wushendianRankItemUI) {
        this._ui = skin;
        this._ui.bg1.on(Laya.Event.CLICK,this,this.onClick);
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

    private _data:stPalacePlayer;
    public setData(value:stPalacePlayer,type:number = 1){
        if(!value)return;
        this._data = value;
        if(this._data.rank == 1 || this._data.rank == 2 || this._data.rank == 3){
            this._ui.sp.visible = false;
            this._ui.paiming.skin = "remote/main/main/dfjjc_mc" + this._data.rank + ".png";
        }else{
            this._ui.sp.visible = true;
            this._ui.paiming.skin = "";
            if(this._data.rank <= 0){
                this._ui.mingcitf.text = "未上榜";
            }else{
                if(this._data.rank <= 100){
                    this._ui.mingcitf.text = this._data.rank + "";
                }else{
                    this._ui.mingcitf.text = "100+";
                }
            }
        }
        MainModel.Ins.setTTHead(this._ui.icon,MainModel.Ins.convertHead(this._data.headUrl));
        this._ui.nameTf.text = this._data.name;
        this._ui.lab_qf.text = "(" + this._data.severName + ")";
        this._ui.img_title.skin = ChengHaoModel.Ins.getTitleImg(this._data.titleId);
        let v = StringUtil.val2Atlas(this._data.plus);
        this._plusCtl.setValue(this._ui.plusCon,v);
        this._ui.lab_gk.text = this._data.palaceLevel + "关";
        this._ui.lab_hh.text = this._data.accRound + "回合";

        if(type == 1){
            this._ui.bg.skin = "remote/wushendian/dfjjc_xs.png";
        }else{
            this._ui.bg.skin = "remote/wushendian/dfjjc_xszj.png";
        }
    }
}