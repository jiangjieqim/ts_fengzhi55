import {StringUtil} from "../../../../frame/util/StringUtil";
import { ui } from "../../../../ui/layaMaxUI";
import { E } from "../../../G";
import { JustWatchPlayer_req, PeakJjcAvatar_req, PeakWatchPlayerInfo_req, stPeakJjcAvatar, WatchPlayerInfo_req } from "../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../network/SocketMgr";
import { AvatarFactory } from "../avatar/AvatarFactory";
import { AvatarView, EAvatarDir } from "../avatar/AvatarView";
import { FontClipCtl } from "../avatar/ctl/FontClipCtl";
import { FontCtlFactory } from "../avatar/ctl/FontCtlFactory";
import { ChengHaoModel } from "../chenghao/model/ChengHaoModel";
import { JjcMainView } from "../jjc/views/JjcMainView";
import { JjcEvent } from "../jjc/vos/JjcEvent";
import { MainModel } from "../main/model/MainModel";
import { PeakJjcModel } from "./model/PeakJjcModel";

export class PeakShowAvatarCtl {
    skin: ui.views.peakjjc.ui_peak_main_avatarUI;
    /**玩家id */
    accountId:number=0;
    public mouseEnable:boolean = true;
    private _plusCtl: FontClipCtl;
    private avatar: AvatarView;
    private vo: stPeakJjcAvatar;
    public refresh(vo: stPeakJjcAvatar) {
        this.vo = vo;
        let skin = this.skin;
        if (vo) {
            this.skin.visible = true;
            skin.nameTf.text = vo.name;
            skin.titleImg.skin = ChengHaoModel.Ins.getTitleImg(vo.titleid);
            skin.icon1.skin = `remote/jjc/dfjjc_mc${vo.rank}.png`;

            let plusView = skin.plugs;
            let val = StringUtil.val2Atlas(vo.plus);
            if(plusView instanceof Laya.Label){
                let label:Laya.Label = (plusView as Laya.Label);
                label.text = val;
            }else{
                if(vo.plus){
                    skin.plus_con.visible = true;
                    if (!this._plusCtl) {
                        this._plusCtl = FontCtlFactory.createPlus();
                    }
                    this._plusCtl.setValue(skin.plugs,val);
                }else{
                    skin.plus_con.visible = false;
                }
            }
            if (this.avatar) {
                this.avatar.dispose();
                this.avatar = null;
            }
            this.avatar = AvatarFactory.createAvatarByStSkin(vo.enemySkin);
            this.avatar.dir = EAvatarDir.Right;
            skin.avatarCon.addChild(this.avatar);
        }else{
            this.skin.visible = false;
            this.releaseRes();
        }
        if(this.mouseEnable){
            this.initClick();
        }
    }
    dispose(){
        this.refresh(null);
        this.accountId = null;
    }
    private initClick(){
        let con = this.skin.clickPart;
        this.skin.hitArea = new Laya.Rectangle(con.x,con.y,con.width,con.height);
        this.skin.on(Laya.Event.CLICK,this,this.onClickHanlder);
    }

    private onClickHanlder(){
        if(this.accountId){
            MainModel.Ins.showPlayer(this.accountId,0);
            return;
        }

        let model = PeakJjcModel.Ins;
        if(this.vo){
            let cell = model.playerList[this.vo.rank - 1];
            MainModel.Ins.showPlayer(cell.accountId,cell.id);
        }
    }

    releaseRes() {
        if (this.avatar) {
            this.avatar.dispose();
            this.avatar = null;
        }
    }
}

export class PeakJjcView extends JjcMainView {
    private _avatarShowList:PeakShowAvatarCtl[] = [];
    private skin:ui.views.peakjjc.ui_jjc_mainUI;
    protected custInit(){
        this.model = PeakJjcModel.Ins;
        this.UI = this._ui = new ui.views.peakjjc.ui_jjc_mainUI();
        this._ui.tf6.text = "";
        let skin:ui.views.peakjjc.ui_jjc_mainUI = this._ui as any;
        this.skin = skin;
        skin.tf9.text = E.getLang("dfjjc01");
        this._avatarShowList = [];
        for(let i = 0;i < 3;i++){
            let cell = new PeakShowAvatarCtl();
            cell.skin = this.skin[`avatar${i}`];
            this._avatarShowList.push(cell);
        }
    }

    protected onExit(){
        super.onExit();
        for(let i = 0;i < this._avatarShowList.length;i++){
            this._avatarShowList[i].refresh(null);
        }
    }

    // protected onInit(){
    // super.onInit();       
    // }
    private initAvatarShow(){
        for(let i = 0;i < this._avatarShowList.length;i++){
            this._avatarShowList[i].skin.visible = false;
        }
    }

    protected onRefreshList(){
        super.onRefreshList();
        this.initAvatarShow();
        this.model.once(JjcEvent.RankShowAvatar,this,this.onRankShowAvatar);
        let req: PeakJjcAvatar_req = new PeakJjcAvatar_req();
        SocketMgr.Ins.SendMessageBin(req);
    
        
    }

    protected get showList(){
        let l = this.model.playerList;
        let result = [];
        for(let i = 3;i < l.length;i++){
            result.push(l[i]);
        }
        return result;
    }

    private onRankShowAvatar(){
        let _model:PeakJjcModel = PeakJjcModel.Ins;
        let l = _model.rankAvatarlist;
        for(let i = 0;i < this._avatarShowList.length;i++){
            let vo = l[i];
            this._avatarShowList[i].refresh(vo);
        }
    }
}