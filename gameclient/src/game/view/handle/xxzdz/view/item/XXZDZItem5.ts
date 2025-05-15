import { StringUtil } from "../../../../../../frame/util/StringUtil";
import { TimeUtil } from "../../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { E } from "../../../../../G";
import { StarBattleFight_req, stStarBattleLog } from "../../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../../network/SocketMgr";
import { FontClipCtl } from "../../../avatar/ctl/FontClipCtl";
import { FontCtlFactory } from "../../../avatar/ctl/FontCtlFactory";
import { MainModel } from "../../../main/model/MainModel";
import { ECellType } from "../../../main/vos/ECellType";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";
import { StarConfigProxy } from "../../proxy/xxzdxProxy";

export class XXZDZItem5 extends ui.views.xxzdz.ui_xxzdzItem5UI{

    private _plusCtl: FontClipCtl;

    constructor() {
        super();
        this._plusCtl = FontCtlFactory.createPlus();

        ButtonCtl.Create(this.btn_qd,new Laya.Handler(this,this.onBtnQDClick));
    }

    private onBtnQDClick(){
        if(this._data){
            let st = StarConfigProxy.Ins.GetDataById(1).f_precost;
            if(MainModel.Ins.isItemEnoughSt(st,true)){
                let req:StarBattleFight_req = new StarBattleFight_req;
                req.accountId = this._data.accountId;
                SocketMgr.Ins.SendMessageBin(req);
                E.ViewMgr.Close(EViewType.XXZDZRankView);
                E.ViewMgr.Close(EViewType.XXZDZRZView);
            }
        }
    }

    private _data:stStarBattleLog;
    public setData(value:stStarBattleLog){
        if(!value)return;
        this._data = value;
        if(value.win){
            this.img.skin = "remote/xxzdz/winbg.png";
            this.img1.skin = "remote/xxzdz/win.png";
            this.lab_star.text = "星星+" + value.changeVal;
            this.lab_star.color = "#28A121";
            this.btn_qd.visible = false;
        }else{
            this.img.skin = "remote/xxzdz/lose_1.png"
            this.img1.skin = "remote/xxzdz/lose.png";
            this.lab_star.text = "星星-" + value.changeVal;
            this.lab_star.color = "#f41501";
            this.btn_qd.visible = true;
            this.img4.skin = IconUtils.getIconByCfgId(ECellType.BaoZi);
            this.lab_num.text = StarConfigProxy.Ins.GetDataById(1).f_precost.split("-")[1];
        }
        this.icon.skin = value.headUrl;
        this.img2.skin = IconUtils.getIconByCfgId(ECellType.XingXing);
        this.lab.text = value.starNum + "";
        this.nameTf.text = value.playerName;
        let v = StringUtil.val2Atlas(value.plus);
        this._plusCtl.setValue(this.plusCon,v);
        this.lab_time.text = TimeUtil.getTimeShow(TimeUtil.serverTime - value.time) + "前";
    }
}