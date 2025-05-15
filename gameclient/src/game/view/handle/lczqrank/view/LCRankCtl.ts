import { ui } from "../../../../../ui/layaMaxUI";
import { SocketMgr } from "../../../../network/SocketMgr";
import { WatchSkyRank_req, stSkyRank } from "../../../../network/protocols/BaseProto";
import { AvatarFactory } from "../../avatar/AvatarFactory";
import { AvatarMonsterView } from "../../avatar/AvatarMonsterView";
import { EAvatarDir } from "../../avatar/AvatarView";
import { EAvatarAnim } from "../../avatar/vos/EAvatarAnim";
import { FuJiangStarCtl } from "../../fujiang/view/ctl/FuJiangStarCtl";
import { PetListProxy } from "../../lingchong/proxy/LingChongProxy";
import { MainModel } from "../../main/model/MainModel";

export class LCRankCtl{
    protected _ui:ui.views.lczqrank.lczqRankItemUI;
    private _starCtl:FuJiangStarCtl;

    constructor(skin:ui.views.lczqrank.lczqRankItemUI) {
        this._ui = skin;
        this._ui.on(Laya.Event.CLICK,this,this.onClickHanlder);
        this._ui.on(Laya.Event.DISPLAY,this,this.onAdd);
        this._ui.on(Laya.Event.UNDISPLAY,this,this.onRemove);

        this._starCtl = new FuJiangStarCtl(this._ui.star);
        this._ui.avatarCon.y = this._ui.avatarCon.y - 40;
    }

    private onAdd(){

    }

    private onRemove(){
        this.clearAvatar();
    }

    private onClickHanlder(){
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
    public setData(value:stSkyRank){
        if(value){
            this._ui.visible = true;
            this._data = value;
            this._ui.icon1.skin = "remote/main/main/dfjjc_mc" + this._data.ranking + ".png";
            this._ui.nameTf.text = this._data.serverName + " " + this._data.nickName;
            this._starCtl.setStar(this._data.star);
            this._starCtl.centerX2();

            this.creatAvatar();
        }else{
            this._ui.visible = false;
            this.clearAvatar();
        }
    }

    private _avatar:AvatarMonsterView;
    private creatAvatar(){
        if(!this._data)return;
        let cfg = PetListProxy.Ins.getCfgById(this._data.id);
        if(this._avatar){
            this._avatar.dispose();
            this._avatar = null;
        }
        this._avatar = AvatarFactory.createPet(cfg.f_petid);
        this._avatar.play(EAvatarAnim.HandBookStand);
        this._avatar.dir = EAvatarDir.Left
        this._ui.avatarCon.addChild(this._avatar);
    }

    private clearAvatar(){
        if (this._avatar) {
            this._avatar.dispose();
            this._avatar = null;
        }
    }
}