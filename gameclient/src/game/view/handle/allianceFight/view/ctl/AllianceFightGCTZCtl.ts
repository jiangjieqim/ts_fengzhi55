import { StringUtil } from "../../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../../ui/layaMaxUI";
import { E } from "../../../../../G";
import { EMsgBoxType } from "../../../../../common/defines/EnumDefine";
import { SocketMgr } from "../../../../../network/SocketMgr";
import { AllianceWarCityEvent_req, stAllianceWarCityContent, stAllianceWarCityTakeOver } from "../../../../../network/protocols/BaseProto";
import { AllianceModel } from "../../../alliance/model/AllianceModel";
import { AvatarFactory } from "../../../avatar/AvatarFactory";
import { AvatarView, EAvatarDir } from "../../../avatar/AvatarView";
import { FontClipCtl } from "../../../avatar/ctl/FontClipCtl";
import { FontCtlFactory } from "../../../avatar/ctl/FontCtlFactory";
import { ChengHaoModel } from "../../../chenghao/model/ChengHaoModel";
import { MainModel } from "../../../main/model/MainModel";
import { AllianceFightModel } from "../../model/AllianceFightModel";

export class AllianceFightGCTZCtl{
    protected skin:ui.views.allianceFight.ui_allianceFightGCTZItemUI;
    private avatar: AvatarView;
    private _plusCtl: FontClipCtl;

    constructor(skin:ui.views.allianceFight.ui_allianceFightGCTZItemUI) {
        this.skin = skin;
        this._plusCtl = FontCtlFactory.createPlus();
        this.skin.on(Laya.Event.DISPLAY,this,this.onAdd);
        this.skin.on(Laya.Event.UNDISPLAY,this,this.onRemove);
        ButtonCtl.CreateBtn(this.skin.btn_zl,this,this.onBtnZLClick);
        ButtonCtl.CreateBtn(this.skin.btn_tz,this,this.onBtnTZClick);
    }

    private onBtnZLClick(){
        if(this._cfg){
            let req:AllianceWarCityEvent_req = new AllianceWarCityEvent_req;
            req.flag = 0;
            req.cityType = this._cfg.f_CityType;
            req.baseNum = this._cfg.f_BaseNum;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private onBtnTZClick() {
        if (this._data && AllianceModel.Ins.alliance && this._cfg) {
            if (AllianceModel.Ins.alliance.name === this._data.allianceName) {
                E.ViewMgr.ShowMsgBox(
                    EMsgBoxType.OkOrCancel,
                    "当前挑战的目标为我方同盟成员\n确定要挑战吗？",
                    new Laya.Handler(this, () => {
                        this.sendCmd();
                    })
                );
                return;
            }
        }
        if(this._cfg){
            this.sendCmd();
        }
    }

    private sendCmd(){
        let req: AllianceWarCityEvent_req = new AllianceWarCityEvent_req;
        req.flag = 1;
        req.cityType = this._cfg.f_CityType;
        req.baseNum = this._cfg.f_BaseNum;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onAdd(){
       
    }

    private onRemove(){
        this.clearAvatar();
    }

    private _cfg:Configs.t_Alliance_War_BasePoint_dat;
    private _data:stAllianceWarCityContent;
    public setData(value:stAllianceWarCityContent,cfg:Configs.t_Alliance_War_BasePoint_dat){
        this._cfg = cfg;
        this._data = value;
        this.skin.bg1.skin = `remote/allianceFight/${cfg.f_UI1}.png`;
        this.skin.bg2.skin = `remote/allianceFight/${cfg.f_UI2}.png`;
        this.skin.bg3.skin = `remote/allianceFight/${cfg.f_UI3}.png`;
        if(!value){
            this.skin.sp1.visible = true;
            this.skin.sp2.visible = false;
            this.skin.lab1.text = cfg.f_BaseNum + "号据点";
            this.skin.lab_time.text = cfg.f_GetPoint + "点/秒";

            let flag:boolean = false;
            for(let i:number=0;i<AllianceFightModel.Ins.takeOverList.length;i++){
                let vo = AllianceFightModel.Ins.takeOverList[i];
                if(vo.cityType == cfg.f_CityType && vo.baseNum == cfg.f_BaseNum){
                    if(vo.firsted){
                        flag = true;
                        break;
                    }
                }
            }

            if(flag){
                this.skin.lab2.text = "";
            }else{
                this.skin.lab2.text = "首次占领+" + cfg.f_FirstRewards + "点";
            }

            this.skin.btn_zl.visible = true;
            this.skin.lab_zl.text = "占领";
            this.skin.btn_zl.disabled = false; 
            this.skin.btn_tz.visible = false;
            this.clearAvatar();
        }else{
            this.skin.sp1.visible = false;
            this.skin.sp2.visible = true;
            this.skin.lab_time1.text = cfg.f_GetPoint + "点/秒";
            this.skin.lab_tmname.text = "同盟:" + value.allianceName;
            this.skin.img_title.skin = ChengHaoModel.Ins.getTitleImg(value.titleid);
            this.skin.b1.width = value.life / value.lifeTotal * 109;
            this.clearAvatar();
            this.avatar = AvatarFactory.createAvatarByStSkin(value.enemySkin);
            this.avatar.dir = EAvatarDir.Right;
            this.skin.sp.addChild(this.avatar);
            let v = StringUtil.val2Atlas(value.plus);
            this._plusCtl.setValue(this.skin.toplug,v);
            this.skin.lab_name.text = value.name + "(" + value.serverName + ")";
            this.skin.lab3.text = "已占领:" + StringUtil.minuteFormat(value.seconds);
            this.skin.lab4.text = "+" + value.points + "点";

            if(value.playerId == MainModel.Ins.mRoleData.mPlayer.AccountId){
                this.skin.btn_zl.visible = true;
                this.skin.btn_zl.disabled = true; 
                this.skin.lab_zl.text = "已占领";
                this.skin.btn_tz.visible = false;
            }else{
                this.skin.btn_zl.visible = false;
                this.skin.btn_tz.visible = true;
            }
        }
    }

    private clearAvatar(){
        if (this.avatar) {
            this.avatar.dispose();
            this.avatar = null;
        }
    }
}