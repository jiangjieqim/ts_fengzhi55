import {StringUtil} from "../../../../../../frame/util/StringUtil";
import { ui } from "../../../../../../ui/layaMaxUI";
import { WatchPlayerInfo_revc } from "../../../../../network/protocols/BaseProto";
import { AvatarFactory } from "../../../avatar/AvatarFactory";
import { AvatarView, EAvatarDir } from "../../../avatar/AvatarView";
import { FontClipCtl } from "../../../avatar/ctl/FontClipCtl";
import { FontCtlFactory } from "../../../avatar/ctl/FontCtlFactory";
import { GameconfigProxy } from "../../../main/model/EquipmentProxy";
import { MainModel } from "../../../main/model/MainModel";
import { ECellType } from "../../../main/vos/ECellType";
import { PlayerVoFactory } from "../../../main/vos/PlayerVoFactory";

export class JjcAttrViewCtl1{
    protected skin:ui.views.jjcAttr.ui_jjc_attrView1UI;

    private _myAvatar:AvatarView;
    private _otAvatar:AvatarView;
    private _plusCtl: FontClipCtl;
    private _plusCtl1: FontClipCtl;

    constructor(skin:ui.views.jjcAttr.ui_jjc_attrView1UI) {
        this.skin = skin;

        this.skin.on(Laya.Event.DISPLAY,this,this.onAdd);
        this.skin.on(Laya.Event.UNDISPLAY,this,this.onRemove);

        this._plusCtl = FontCtlFactory.createPlus();
        this._plusCtl1 = FontCtlFactory.createPlus();

        this.skin.list.itemRender = ui.views.jjcAttr.ui_jjc_attrItem1UI;
        this.skin.list.renderHandler = new Laya.Handler(this,this.onAttrHandler);

        this.skin.list1.itemRender = ui.views.jjcAttr.ui_jjc_attrItem1UI;
        this.skin.list1.renderHandler = new Laya.Handler(this,this.onAttrHandler1);
    }

    private onAdd(){
        
    }

    private onRemove(){
        if(this._myAvatar){
            this._myAvatar.dispose();
            this._myAvatar = null;
        }
        if(this._otAvatar){
            this._otAvatar.dispose();
            this._otAvatar = null;
        }
    }

    private onAttrHandler(item:ui.views.jjcAttr.ui_jjc_attrItem1UI){
        let val = PlayerVoFactory.getValString(MainModel.Ins.mPlayinfo.moneyInfo,parseInt(item.dataSource));
        item.tf1.text = MainModel.Ins.getAttrNameIdByID(parseInt(item.dataSource));
        item.valTf.text =  val;

        let num = PlayerVoFactory.getVal(MainModel.Ins.mPlayinfo.moneyInfo,parseInt(item.dataSource));
        let num1 = PlayerVoFactory.getVal(this._data.moneyInfo,parseInt(item.dataSource));
        if(num > num1){
            item.upimg.skin = `remote/common/base/green.png`;
        }else if(num < num1){
            item.upimg.skin = `remote/common/base/red.png`;
        }else{
            item.upimg.skin = "";
        }
    }

    private onAttrHandler1(item:ui.views.jjcAttr.ui_jjc_attrItem1UI){
        let val = PlayerVoFactory.getValString(this._data.moneyInfo,parseInt(item.dataSource));
        item.tf1.text = MainModel.Ins.getAttrNameIdByID(parseInt(item.dataSource));
        item.valTf.text =  val;
        item.upimg.visible = false;
    }

    private _data:WatchPlayerInfo_revc;
    public setData(value:WatchPlayerInfo_revc){
        if(!value)return;
        this._data = value;
        if(!this._myAvatar){
            // this._myAvatar = AvatarFactory.createBaseAvatar(DateFactory.createEquipList(MainModel.Ins.mPlayinfo.equipItem),
            // ZuoQiModel.Ins.rideVo.rideId,MainModel.Ins.wingId,EAvatarDir.Right);
            // this._myAvatar.reset();
            // this._myAvatar.play(EAvatarAnim.NormalStand);
            
            this._myAvatar = AvatarFactory.getStandNormalMainAvatar(EAvatarDir.Right);

            this.skin.heroCon.addChild(this._myAvatar);
        }

        if(!this._otAvatar){
            let ride = 0;
            if(value.ride.length){
                ride = value.ride[0].baseInfo.id;
            }
            let wingId = 0;
            if(value.wing){
                wingId = value.wing.wingId;
            }
            // this._otAvatar = AvatarFactory.createBaseAvatar(DateFactory.createEquipList(value.equipItem),ride,wingId);
            // this._otAvatar.reset();
            // this._otAvatar.play(EAvatarAnim.NormalStand);
            this._otAvatar = AvatarFactory.createAvatarByStSkin(value.PlayerSkin);
            this.skin.heroCon1.addChild(this._otAvatar);
        }

        let n = MainModel.Ins.mRoleData.getBattleValue();
        let v = StringUtil.val2Atlas(n);
        this._plusCtl.setValue(this.skin.plusCon,v);

        let num = PlayerVoFactory.getVal(value.moneyInfo,ECellType.BATTLE);
        let vv = StringUtil.val2Atlas(num);
        this._plusCtl1.setValue(this.skin.plusCon1, vv);

        this.skin.list.array = GameconfigProxy.Ins.getJjcList();
        this.skin.list1.array = GameconfigProxy.Ins.getJjcList();
    }
}