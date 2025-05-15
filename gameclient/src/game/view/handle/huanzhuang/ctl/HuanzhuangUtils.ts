import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { IdleAbility } from "../../../../systems/ability/abilitys/IdleAbility";
import { EquipmentIDProxy } from "../../main/model/EquipmentProxy";
import { EquipItemView, IEquipItemSkin } from "../../main/views/EquipItemView";
import { EEquipType } from "../../main/vos/ECellType";
import { EquipItemVo } from "../../main/vos/EquipItemVo";
/**换装工具类 */
export class HuanzhuangUtils {
    public static CreateCtl(skin: ui.views.huanzhuang.ui_huanzhuang_itemUI, equipType: EEquipType) {
        skin.redimg.visible = false;
        skin.tf1.visible = false;
        let equipSkin: IEquipItemSkin = {} as IEquipItemSkin;
        equipSkin.icon = skin.icon;
        equipSkin.quality = skin.bg1;
        // equipSkin.tf1 = skin.cntTf;

        equipSkin.typename = skin.tf1;
        let ctl = new EquipItemView(equipSkin, equipType);
        // ctl.mouseEnableSkin = skin;
        return ctl;
    }
}