import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ui } from "../../../../../ui/layaMaxUI";
import { SocketMgr } from "../../../../network/SocketMgr";
import { StarWatchPlayerInfo_req, WatchSkyRank_req, stSkin, stSkyRank } from "../../../../network/protocols/BaseProto";
import { AvatarFactory } from "../../avatar/AvatarFactory";
import { AvatarMonsterView } from "../../avatar/AvatarMonsterView";
import { FontClipCtl } from "../../avatar/ctl/FontClipCtl";
import { FontCtlFactory } from "../../avatar/ctl/FontCtlFactory";
import { EAvatarAnim } from "../../avatar/vos/EAvatarAnim";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainModel } from "../../main/model/MainModel";

export class ZQRankCtl{
    protected _ui:ui.views.lczqrank.lczqRankItem2UI;
    private _plusCtl: FontClipCtl;

    constructor(skin:ui.views.lczqrank.lczqRankItem2UI) {
        this._ui = skin;
        this._ui.on(Laya.Event.CLICK,this,this.onClickHanlder);
        this._ui.on(Laya.Event.DISPLAY,this,this.onAdd);
        this._ui.on(Laya.Event.UNDISPLAY,this,this.onRemove);

        this._plusCtl = FontCtlFactory.createPlus();
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
                req.type = 1;
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
            ItemViewFactory.setStar(this._ui.starcon,this._data.star,this._data.star,true,0.7);
            let v = StringUtil.val2Atlas(value.plus);
            this._plusCtl.setValue(this._ui.plusCon,v);

            this.creatAvatar();
        }else{
            this._ui.visible = false;
            this.clearAvatar();
        }
    }

    private _avatar:AvatarMonsterView;
    private creatAvatar(){
        if(!this._data)return;
        let skin:stSkin = new stSkin();
        skin.f_MountID = this._data.id;
        if (!this._avatar) {
            this._avatar =  AvatarFactory.createAvatarByStSkin(skin,EAvatarAnim.None);
            this._ui.avatarCon.addChild(this._avatar);
        }else{
            this._avatar.mSkin = skin;
        }
    }

    private clearAvatar(){
        if (this._avatar) {
            this._avatar.dispose();
            this._avatar = null;
        }
    }
}