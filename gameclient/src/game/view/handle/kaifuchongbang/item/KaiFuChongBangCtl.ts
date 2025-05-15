import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ui } from "../../../../../ui/layaMaxUI";
import { SocketMgr } from "../../../../network/SocketMgr";
import { CommonWatchPlayerInfo_req, stPeakJjcAvatar } from "../../../../network/protocols/BaseProto";
import { AvatarFactory } from "../../avatar/AvatarFactory";
import { AvatarView, EAvatarDir } from "../../avatar/AvatarView";
import { FontClipCtl } from "../../avatar/ctl/FontClipCtl";
import { FontCtlFactory } from "../../avatar/ctl/FontCtlFactory";
import { ChengHaoModel } from "../../chenghao/model/ChengHaoModel";
import { MainModel } from "../../main/model/MainModel";
import { AdventureLevelProxy } from "../../main/proxy/AdventureLevelProxy";
import { KaiFuChongBangModel } from "../model/KaiFuChongBangModel";


export class KaiFuChongBangCtl{
    protected _ui:ui.views.kaifuchongbang.ui_KaiFuChongBangitemUI;
    private _plusCtl: FontClipCtl;

    private avatar: AvatarView;

    constructor(skin:ui.views.kaifuchongbang.ui_KaiFuChongBangitemUI) {
        this._ui = skin;
        this._plusCtl = FontCtlFactory.createPlus();
        this._ui.on(Laya.Event.CLICK,this,this.onClickHanlder);
        this._ui.on(Laya.Event.DISPLAY,this,this.onAdd);
        this._ui.on(Laya.Event.UNDISPLAY,this,this.onRemove);
    }

    private onAdd(){

    }

    private onRemove(){
        this.clearAvatar();
    }

    private onClickHanlder(){
        if (this._data) {
            let vo = KaiFuChongBangModel.Ins.rankList.find(ele => ele.ranking == this._data.rank);
            if (vo) {
                if(vo.accountId != MainModel.Ins.mRoleData.mPlayer.AccountId){
                    let req: CommonWatchPlayerInfo_req = new CommonWatchPlayerInfo_req();
                    req.accountId = vo.accountId;
                    req.type = 1;
                    SocketMgr.Ins.SendMessageBin(req);
                }
            }
        }
    }

    private _data:stPeakJjcAvatar;
    public setData(value:stPeakJjcAvatar){
        if(value){
            this._ui.visible = true;
            this._data = value;
            this._ui.icon1.skin = "remote/main/main/dfjjc_mc" + this._data.rank + ".png";
            this._ui.titleImg.skin = ChengHaoModel.Ins.getTitleImg(this._data.titleid);
            let vo = KaiFuChongBangModel.Ins.rankList.find(ele => ele.ranking == this._data.rank);
            if(vo){
                this._ui.lab.text = AdventureLevelProxy.Ins.getAdventureTaskName(vo.commonNum);
                this._ui.nameTf.text = vo.nickName;
                let v = StringUtil.val2Atlas(vo.plus);
                this._plusCtl.setValue(this._ui.plugs,v);
            }else{
                this._ui.lab.text = "";
                this._ui.nameTf.text = "";
                this._plusCtl.setValue(this._ui.plugs,"");
            }
            this.clearAvatar();
            this.avatar = AvatarFactory.createAvatarByStSkin(this._data.enemySkin);
            this.avatar.dir = EAvatarDir.Right;
            this._ui.avatarCon.addChild(this.avatar);
        }else{
            this._ui.visible = false;
            this.clearAvatar();
        }
    }

    private clearAvatar(){
        if (this.avatar) {
            this.avatar.dispose();
            this.avatar = null;
        }
    }
}