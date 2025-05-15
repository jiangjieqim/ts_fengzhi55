import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { stSkin } from "../../../../network/protocols/BaseProto";
import { AvatarFactory } from "../../avatar/AvatarFactory";
import { AvatarMonsterView } from "../../avatar/AvatarMonsterView";
import { EAvatarDir } from "../../avatar/AvatarView";
import { SimpleEffect } from "../../avatar/SimpleEffect";
import { t_Custom_CostumesProxy } from "../../huodong/model/ActivityProxy";
import { MainModel } from "../../main/model/MainModel";
import { RedEnum } from "../../main/model/RedEnum";
import { RedUpdateModel } from "../../main/model/RedUpdateModel";
import { EEquipType } from "../../main/vos/ECellType";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { HuanzhuangItemShowVo } from "./HuanzhuangTujianItemRender";
/**副将恭喜获得 */
export class UnLockView extends ViewBase {
    private _ui: ui.views.main.ui_unlock_heroUI;
    private qua:number;
    private _avatar:AvatarMonsterView;
    private congratulatEffect:SimpleEffect;
    protected onAddLoadRes(): void { }
    protected onExit(): void { 
        this.disposeAvatar();
    }
    protected onFirstInit(): void {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.main.ui_unlock_heroUI();
            this.mMask = true;
            this.mClickAnyAreaClose = true;
            this._ui.list1.itemRender = ui.views.main.ui_slot_itemUI;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onItemHender);
        }
    }
    /**恭喜获得 */
    private playCongratulatEffect() {
        if (!this.congratulatEffect) {
            this.congratulatEffect = new SimpleEffect(this._ui.gxCon, "o/spine/gxjq/gxjq");
        }
        // congratulatEffect.playEndDisplse(0)
        this.congratulatEffect.play(0, false, this, this.onPlayEnd, null, true);
    }
    private onPlayEnd() {

    }
    private disposeAvatar(){
        if(this._avatar){
            this._avatar.dispose();
            this._avatar = null;
        }
    }
    private onItemHender(item:ui.views.main.ui_slot_itemUI){
        item.tf1.visible = false;
        let vo:HuanzhuangItemShowVo = item.dataSource;
        let str = `${vo.type}_${vo.val}`;
        item.icon.skin = `o/item/${str}.png`;
        item.quality.skin = IconUtils.getQuaIcon(this.qua);
    }
    protected onInit(): void {
        let suitid:number = this.Data;
        let cfg = t_Custom_CostumesProxy.Ins.getByCostumesid(suitid);
        this.qua =   cfg.f_equipQuality;
        let typeList:EEquipType[] = [EEquipType.Casque,EEquipType.Barde,EEquipType.Weapon,EEquipType.Shield,EEquipType.ZuoQi,EEquipType.Wing];
        let l = [];
        for(let i = 0;i < typeList.length;i++){
            let type = typeList[i];
            let val = cfg["f_" + type];
            if (val) {
                let vo = new HuanzhuangItemShowVo();
                vo.type = type;
                vo.val = parseInt(val);
                l.push(vo);
            }
        }
        this._ui.list1.array = l;
        this.disposeAvatar();
        let _skinVo:stSkin = new stSkin();
        _skinVo.f_HeadID = cfg.f_2;
        _skinVo.f_BodyID = cfg.f_5;
        _skinVo.f_WeaponID = cfg.f_9;
        _skinVo.f_ShieldID = cfg.f_12;
        this._avatar = AvatarFactory.createFightMonsterAvatar(EAvatarDir.Left,0,0,false,MainModel.Ins.randomImageID);
        this._avatar.mSkin = _skinVo;
        this._ui.heroCon.addChild(this._avatar);
        this._ui.heroName.text = cfg.f_Name+E.getLang("suit01");
        this.playCongratulatEffect();
        RedUpdateModel.Ins.save(RedEnum.SUIT_ID + suitid,1);
    }
}