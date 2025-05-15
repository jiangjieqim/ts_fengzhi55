import {StringUtil} from "../../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../../ui/layaMaxUI";
import { E } from "../../../../../G";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import {SocketMgr} from "../../../../../network/SocketMgr";
import { StarBattleFight_req, stStarBattleEnemy } from "../../../../../network/protocols/BaseProto";
import { AvatarFactory } from "../../../avatar/AvatarFactory";
import { AvatarView, EAvatarDir } from "../../../avatar/AvatarView";
import { FontClipCtl } from "../../../avatar/ctl/FontClipCtl";
import { FontCtlFactory } from "../../../avatar/ctl/FontCtlFactory";
import { MainModel } from "../../../main/model/MainModel";
import { ECellType } from "../../../main/vos/ECellType";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";
import { StarConfigProxy, StarPocketTipsProxy } from "../../proxy/xxzdxProxy";

export class XXZDZItem4 extends ui.views.xxzdz.ui_xxzdzItem4UI{
    private _plusCtl: FontClipCtl;
    private avatar: AvatarView;

    constructor() {
        super();
        this._plusCtl = FontCtlFactory.createPlus();

        ButtonCtl.Create(this.btn_qd,new Laya.Handler(this,this.onBtnQDClick));
        for(let i:number = 1;i<4;i++){
            this["img" + i].on(Laya.Event.CLICK,this,this.onClick,[i]);
        }
        this.on(Laya.Event.DISPLAY,this,this.onAdd);
        this.on(Laya.Event.UNDISPLAY,this,this.onRemove);
    }

    private onClick(index:number,e:Laya.Event){
        e.stopPropagation();
        let cfg = StarPocketTipsProxy.Ins.GetDataById(this._data.silkBags[index - 1].id);
        if(cfg){
            MainModel.Ins.showSmallTips(cfg.f_TipsName, cfg.f_TipsTips, this["img" + index]);
        }
    }

    private onAdd(){

    }

    private onRemove(){
        this.clearAvatar();
    }

    private onBtnQDClick(){
        if(this._data){
            let st = StarConfigProxy.Ins.GetDataById(1).f_precost;
            if(MainModel.Ins.isItemEnoughSt(st,true)){
                E.ViewMgr.Close(EViewType.XXZDZTZView);
                let req:StarBattleFight_req = new StarBattleFight_req;
                req.accountId = this._data.accountId;
                SocketMgr.Ins.SendMessageBin(req); 
            }
        }
    }

    private clearAvatar(){
        if (this.avatar) {
            this.avatar.dispose();
            this.avatar = null;
        }
    }

    private _data:stStarBattleEnemy;
    public setData(value:stStarBattleEnemy){
        if(!value)return;
        this._data = value;
        let data = this._data.skin[0];
        this.nameTf.text = data.name;
        let v = StringUtil.val2Atlas(data.plus);
        this._plusCtl.setValue(this.plugs,v);
        this.clearAvatar();
        this.avatar = AvatarFactory.createAvatarByStSkin(data.enemySkin);
        this.avatar.dir = EAvatarDir.Right;
        this.avatarCon.addChild(this.avatar);

        let arr = StarConfigProxy.Ins.GetDataById(1).f_precost.split("-");
        this.icon1.skin = IconUtils.getIconByCfgId(parseInt(arr[0]));
        this.lab_num.text = arr[1];

        this.icon.skin = IconUtils.getIconByCfgId(ECellType.XingXing);
        this.lab.text = this._data.starNum + "";

        for(let i:number=0;i<3;i++){
            if(this._data.silkBags[i]){
                this["item" + (i + 1)].visible = true;
                let cfg = StarPocketTipsProxy.Ins.GetDataById(this._data.silkBags[i].id);
                this["img" + (i + 1)].skin = `o/star/${cfg.f_Tipsicon}`;
            }else{
                this["item" + (i + 1)].visible = false;
            }
        }
        this.sp.width = 56 * this._data.silkBags.length;
        this.sp.x = (200 - this.sp.width) / 2;
    }
}