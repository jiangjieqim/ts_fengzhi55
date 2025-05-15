import { ColorUtil } from "../../../../../../frame/util/ColorUtil";
import { ui } from "../../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { E } from "../../../../../G";
import { stAllianceWarLife, stSkin } from "../../../../../network/protocols/BaseProto";
import { AvatarFactory } from "../../../avatar/AvatarFactory";
import { AvatarView, EAvatarDir } from '../../../avatar/AvatarView';
import { EAttrType } from "../../../main/vos/ECellType";
import { AllianceFightModel } from "../../model/AllianceFightModel";
import { AllianceWarSixBossProxy } from "../../proxy/AllianceFightProxy";

export class BossAvatarCtl {
    skin: ui.views.allianceFight.ui_allianceFightBossAvatarUI;
    public mouseEnable:boolean = true;
    //private _plusCtl: FontClipCtl;
    private avatar: AvatarView;
    public bossId: number;
    public refresh(bossId: number) {
        this.bossId = bossId;
        let skin = this.skin;
        if (bossId) {
            const cfg = AllianceWarSixBossProxy.Ins.GetDataById(bossId) as Configs.t_Alliance_War_SixBoss_dat;
            this.skin.visible = true;
            skin.nameTf.text = cfg.f_name;
            if (this.avatar) {
                this.avatar.dispose();
                this.avatar = null;
            }
            // 设置boss皮肤
            const bossSkin: stSkin = new stSkin();
            bossSkin.f_HeadID = cfg.f_HeadID;
            bossSkin.f_WeaponID = cfg.f_WeaponID;
            bossSkin.f_ShieldID = cfg.f_ShieldID;
            bossSkin.f_WingID = cfg.f_WingID;
            bossSkin.f_MountID = cfg.f_MountID;
            bossSkin.f_BodyID = cfg.f_BodyID;

            this.avatar = AvatarFactory.createAvatarByStSkin(bossSkin);
            this.avatar.dir = EAvatarDir.Left;
            skin.avatarCon.addChild(this.avatar);
        }else{
            this.skin.visible = false;
            this.releaseRes();
        }
        if(this.mouseEnable){
            this.initClick();
        }
    }

    public refreshBlood(vo: stAllianceWarLife) {
        // 设置血条
        if (!vo) return;
        let skin = this.skin;
        if (vo.life > 0) {
            const conf = AllianceWarSixBossProxy.Ins.GetDataById(vo.id) as Configs.t_Alliance_War_SixBoss_dat;
            const bossTotalLife = AllianceFightModel.Ins.parseAttrList(conf.f_attribute).find(o => o.equipAttrId === EAttrType.Life)?.attrValue || 0;
            const percent = vo.life / bossTotalLife;
            const bloodWidth = Math.round((skin.bg.width - 4) * percent);
            if (skin.b1 && skin.b2) {
                skin.b1.width = bloodWidth;
                skin.b2.width = bloodWidth;
            }
            this.setFilterNull();
        } else {
            skin.b1.width = skin.b2.width = 0;
            this.setFilterGray();
        }
    }

    private initClick(){
        let con = this.skin.clickPart;
        this.skin.hitArea = new Laya.Rectangle(con.x,con.y,con.width,con.height);
        this.skin.on(Laya.Event.CLICK,this,this.onClickHanlder);
    }

    private onClickHanlder(){
        console.log(111);
        E.ViewMgr.Open(EViewType.AllianceFightBossDetailView, null, this.bossId);
    }

    releaseRes() {
        if (this.avatar) {
            this.avatar.dispose();
            this.avatar = null;
        }
    }

    setFilterGray() {
        this.skin.avatarCon.filters = ColorUtil.CreateColorFilter(1);
        this.skin.win_tf.visible = true;
    }

    setFilterNull() {
        this.skin.avatarCon.filters = null;
        this.skin.win_tf.visible = false;
    }
}