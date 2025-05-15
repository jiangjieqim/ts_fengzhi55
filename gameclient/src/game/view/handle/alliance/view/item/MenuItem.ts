import { ui } from "../../../../../../ui/layaMaxUI";
import {SocketMgr} from "../../../../../network/SocketMgr";
import { AllianceJoin_req, AlliancePlayerManage_req, JustWatchPlayer_req, WatchPlayerInfo_req } from "../../../../../network/protocols/BaseProto";
import { AllianceJoin, AllianceManage, AllianceModel } from "../../model/AllianceModel";
import { E } from "../../../../../G";
import { EMsgBoxType, EViewType } from "../../../../../common/defines/EnumDefine";

interface IData {
    playerId: number;
    manageType: AllianceManage;
}

export class MenuItem extends ui.views.alliance.ui_alliance_menu_itemUI {
    constructor() {
        super();
        this.on(Laya.Event.CLICK,this,this.onMenuClick);
    }

    private _data: IData;

    private onMenuClick() {
        if (!this._data) return;
        const alliance = AllianceModel.Ins.alliance;
        if (!alliance) return;
        let req: any = new AlliancePlayerManage_req();
        req.playerId = this._data.playerId;
        switch (this._data.manageType) {
            case AllianceManage.WatchPlayer:
                req = new JustWatchPlayer_req;
                req.playerId = this._data.playerId;
                break;
            case AllianceManage.Quit:
                E.ViewMgr.ShowMsgBox(EMsgBoxType.OkOrCancel, E.LangMgr.getLang("AllianceQuitWords"), new Laya.Handler(this, this.doJoin, [AllianceJoin.Quit]));
                return;
            case AllianceManage.AppointPresident:
                req.type = this._data.manageType;
                E.ViewMgr.ShowMsgBox(EMsgBoxType.OkOrCancel, E.LangMgr.getLang("AllianceAppointPresidentWords"), new Laya.Handler(this, this.doManage, [req]));
                return;
            default:
                req.type = this._data.manageType;
        }
        SocketMgr.Ins.SendMessageBin(req);
        if (E.ViewMgr.isOpenReg(EViewType.AllianceMenuView)) {
            E.ViewMgr.Close(EViewType.AllianceMenuView);
        }
    }

    private doJoin(type: AllianceJoin) {
        const alliance = AllianceModel.Ins.alliance;
        if (!alliance) return;
        const req = new AllianceJoin_req;
        req.type = type;
        req.uid = alliance.uid;
        SocketMgr.Ins.SendMessageBin(req);
        if (E.ViewMgr.isOpenReg(EViewType.AllianceMenuView)) {
            E.ViewMgr.Close(EViewType.AllianceMenuView);
        }
    }

    private doManage(req: AlliancePlayerManage_req) {
        if (req) SocketMgr.Ins.SendMessageBin(req);
        if (E.ViewMgr.isOpenReg(EViewType.AllianceMenuView)) {
            E.ViewMgr.Close(EViewType.AllianceMenuView);
        }
    }

    public setData(value: IData){
        if(!value)return;
        this._data = value;
        let text: string = '';
        switch (value.manageType) {
            case AllianceManage.WatchPlayer:
                text = E.getLang('AllianceWatchPlayer');
                break;
            case AllianceManage.AppointVicePresident:
                text = E.getLang('AllianceAppointVicePresident');
                break;
            case AllianceManage.AppointPresident:
                text = E.getLang('AllianceAppointPresident');
                break;
            case AllianceManage.KickOut:
                text = E.getLang('AllianceKickOut');
                break;
            case AllianceManage.Impeach:
                text = E.getLang('AllianceImpeach');
                break;
            case AllianceManage.Demotion:
                text = E.getLang('AllianceDemotion');
                break;
            case AllianceManage.Quit:
                text = E.getLang('AllianceQuit');
                break;
        }
        this.item_tf.text = text;
    }
}