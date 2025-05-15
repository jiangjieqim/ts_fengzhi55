import { ui } from "../../../../../ui/layaMaxUI";
import { stSkin } from "../../../../network/protocols/BaseProto";
import { AvatarConfig } from "../../avatar/AvatarConfig";
import { AvatarFactory } from "../../avatar/AvatarFactory";
import { AvatarMonsterView } from "../../avatar/AvatarMonsterView";
import { AvatarView } from "../../avatar/AvatarView";
import { EAvatarAnim } from "../../avatar/vos/EAvatarAnim";
import { FuJiangStarCtl } from "../../fujiang/view/ctl/FuJiangStarCtl";
import { EquipmentQualityProxy } from "../model/EquipmentProxy";
/**角色视图容器 */
export class ZhengZhanAvatarItem extends ui.views.zhangzhan.ui_zhengzhan_avatarUI{
    private avatar:AvatarMonsterView;
    private starCtl:FuJiangStarCtl;
    constructor(){
        super();
        this.starCtl = new FuJiangStarCtl(this.starItem);
    }
    public refresh(val:stSkin,cfg:Configs.t_Conquest_EnemyValue_dat){
        this.clear();
        this.avatar = AvatarFactory.createAvatarByStSkin(val, EAvatarAnim.NormalStand);
        this.avatarCon.addChild(this.avatar);
        this.starCtl.setStar(cfg.f_EnemyStar);
        this.starCtl.centerX();
        this.nameTf.text = "Lv."+cfg.f_EnemyLv + " " + cfg.f_Stations;
        this.nameTf.color = "#"+EquipmentQualityProxy.Ins.getByQua(cfg.f_EnemyImage).f_Color;
    
        if(this.avatar.bHorseSkel){
            this.con1.y = -AvatarConfig.hasHorseHeight;
        }else{
            this.con1.y = -AvatarConfig.normalHeight;
        }
    }
    private clear(){
        if(this.avatar){
            this.avatar.dispose();
            this.avatar = null;
        }
    }

    public dispose(){
        this.clear();
        this.removeSelf();
    }
}