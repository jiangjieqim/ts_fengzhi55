import { ui } from "../../../../../../ui/layaMaxUI";
import { stPalaceEnemy, stSkin } from "../../../../../network/protocols/BaseProto";
import { AvatarFactory } from "../../../avatar/AvatarFactory";
import { AvatarMonsterView } from "../../../avatar/AvatarMonsterView";
import { EAvatarAnim } from "../../../avatar/vos/EAvatarAnim";
import { FuJiangStarCtl } from "../../../fujiang/view/ctl/FuJiangStarCtl";
import { Enemy_ImageProxy } from "../../../main/model/AdventureProxy";
import { EquipmentQualityProxy } from "../../../main/model/EquipmentProxy";
import { MainModel, EServerVersion } from "../../../main/model/MainModel";
import { WuShenDianEnemyProxy } from "../../proxy/WuShenDianProxy";

export class WuShenDianAvatrItem extends ui.views.wushendian.ui_wushendianItemUI{
    private _starCtl:FuJiangStarCtl;
    private _avatar:AvatarMonsterView;
    private skinVo:stSkin;
    private index:number;
    constructor() {
        super();
        this._starCtl = new FuJiangStarCtl(this.item);
        this.on(Laya.Event.DISPLAY,this,this.onAdd);
        this.on(Laya.Event.UNDISPLAY,this,this.onRemove);
    }

    private onAdd(){

    }

    private onRemove(){
        this.clearAvatar();
    }

    public setData(value:stPalaceEnemy,index:number){
        if(!value)return;
        if(MainModel.Ins.serverVer == EServerVersion.Version_1){
            if(index == 4){
                this.visible = true;
                this._starCtl.setStar(value.star);
                this._starCtl.centerX();
                let cfg = WuShenDianEnemyProxy.Ins.GetDataById(value.enemyId);
                this.lab_name.text = "Lv." + value.level + " " + cfg.f_EnemyName;
                this.lab_name.color = "#" + EquipmentQualityProxy.Ins.getByQua(value.quality).f_Color;
        
                let ecfg: Configs.t_Enemy_Image_dat = Enemy_ImageProxy.Ins.getCfg(cfg.f_EnemyImage);
                let skinVo = new stSkin();
                skinVo.f_BodyID = ecfg.f_BodyID;
                skinVo.f_HeadID = ecfg.f_HeadID;
                skinVo.f_MountID = ecfg.f_MountID;
                skinVo.f_ShieldID = ecfg.f_ShieldID;
                skinVo.f_WeaponID = ecfg.f_WeaponID;
                skinVo.f_WingID = ecfg.f_WingID;
                this.skinVo = skinVo;
                this.index = index;
            }else{
                this.visible = false;
            }
        }else{
            this.visible = true;
            this._starCtl.setStar(value.star);
            this._starCtl.centerX();
            let cfg = WuShenDianEnemyProxy.Ins.GetDataById(value.enemyId);
            this.lab_name.text = "Lv." + value.level + " " + cfg.f_EnemyName;
            this.lab_name.color = "#" + EquipmentQualityProxy.Ins.getByQua(value.quality).f_Color;

            let ecfg: Configs.t_Enemy_Image_dat = Enemy_ImageProxy.Ins.getCfg(cfg.f_EnemyImage);
            let skinVo = new stSkin();
            skinVo.f_BodyID = ecfg.f_BodyID;
            skinVo.f_HeadID = ecfg.f_HeadID;
            skinVo.f_MountID = ecfg.f_MountID;
            skinVo.f_ShieldID = ecfg.f_ShieldID;
            skinVo.f_WeaponID = ecfg.f_WeaponID;
            skinVo.f_WingID = ecfg.f_WingID;
            this.skinVo = skinVo;
            this.index = index;
        }
       
    }

    public createAvatar(){
        if(this._avatar && this._avatar.isSkinEqual(this.skinVo)){
            return;
        }

        this.clearAvatar();
        this._avatar = AvatarFactory.createAvatarByStSkin(this.skinVo, EAvatarAnim.NormalStand);
        this.sp.addChild(this._avatar);
        if(this.index == 4){
            this._avatar.scaleX = this._avatar.scaleY = 1.2;
        }else{
            this._avatar.scaleX = this._avatar.scaleY = 1;
        }
    }

    private clearAvatar(){
        if(this._avatar){
            this._avatar.dispose();
            this._avatar = null;
        }
    }
}