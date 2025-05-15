import { PetListProxy } from "../../lingchong/proxy/LingChongProxy";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { ItemProxy } from "../../main/proxy/ItemProxy";
import { ESub_type } from "../../main/vos/ItemVo";

export class IconUtils{
    // public static readonly EmptyBg:string = "remote/common/base/jiangli.png";//默认背景
    public static readonly Empty:string = "empty";
    public static readonly effect:string = `o/spine/effect2/effect2`;//特效
    public static readonly plusAtlasPrefix:string = `remote/main/main/z`;//战斗数字
    public static readonly dldAtlasPrefix:string = `remote/daluandou/ls_`;//大乱斗数字
    public static readonly afAtlasPrefix:string = `remote/allianceFight/a`;//联盟战
    public static readonly DefaultEmpty:string = "remote/main/main/zhuangbeikuang_1.png";
    public static readonly Bg:string = `remote/common/base/shuxingkuang.png`;
    public static readonly numAtlasPrefix:string = `remote/num/k_`;//数字
    public static readonly fulleffect:string = `o/spine/boxstage/boxstage`;//全屏特效
    public static readonly defaultIcon:string = "remote/common/base/jiangli1.png";
    
    /**坐骑id */
    public static getHorseIcon(id:number){
        return `o/horse/${id}.png`;
    }
    public static getQuaIcon(qua:number){
        qua = qua || 0;
        if(qua == 0){
            return this.DefaultEmpty;
        }
       return `remote/main/main/zhuangbeikuang_${qua}.png`;
    }

    public static getIcon(icon:string|number){
        if(typeof icon == "string"){
            if(icon.indexOf("|")!=-1){
                let arr = icon.split("|");
                return `o/icon/${arr[main.skinStyle - 1]}.png`;
            }
        }
        return `o/icon/${icon}.png`;
        // return this.getIconByCfgId(itemid);
    }

    public static getNameByID(itemID:number){
        let _cfg = ItemProxy.Ins.getCfg(itemID);
        if(_cfg){
            return main.itemName(_cfg.f_name);
        }
        return "";
    }

    public static convert(_cfg:Configs.t_Item_dat){
        if(_cfg.f_sub_type == ESub_type.EquipSwitch){
            let arr = _cfg.f_p1.split("|");
            return ItemViewFactory.getEquipIcon(parseInt(arr[0]),parseInt(arr[1]));
        }
        else if(_cfg.f_sub_type == ESub_type.Pet){
            let petcfg = PetListProxy.Ins.getCfgById(parseInt( _cfg.f_p1));
            return PetListProxy.Ins.getPetIconById(petcfg.f_petid);
        }
    }

    public static getIconByCfgId(_itemId:number){
        let _cfg:Configs.t_Item_dat = ItemProxy.Ins.getCfg(_itemId);
        if(_cfg){
            let icon:string = _cfg.f_icon;
            let icon1 = this.convert(_cfg);
            if(icon1){
                return icon1;
            }else if(icon == ""){
                icon = _itemId.toString();
            }
             return this.getIcon(icon);
            // return `o/icon/${icon}.png`;
        }
        return "";
    }
    public static str2Lv(lv:number){
        return "Lv." + lv;
    }
}