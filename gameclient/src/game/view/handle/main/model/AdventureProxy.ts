import { stSkin } from "../../../../network/protocols/BaseProto";
import { BaseCfg } from "../../../../static/json/data/BaseCfg";

// export class AdventureProxy extends BaseCfg{
//     private static _ins:AdventureProxy;

//     public static get Ins(){
//         if(!this._ins){
//             this._ins = new AdventureProxy();
//         }
//         return this._ins;
//     }
//     public GetTabelName():string{
//         return "t_Adventure_Level";
//     }

    // public getCfg(id:number){
    //     let _l:Configs.t_Adventure_Level_dat[] = this.List;
    //     for(let i = 0;i < _l.length;i++){
    //         let cfg:Configs.t_Adventure_Level_dat = _l[i];
    //         if(cfg.f_Levelid ==  id){
    //             return cfg;
    //         }
    //     }
    // }
// }

export class Enemy_ImageProxy extends BaseCfg{
    private static _ins:Enemy_ImageProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new Enemy_ImageProxy();
        }
        return this._ins;
    }
    public GetTabelName():string{
        return "t_Enemy_Image";
    }

    public getCfg(id:number){
        let _l:Configs.t_Enemy_Image_dat[] = this.List;
        for(let i = 0;i < _l.length;i++){
            let cfg:Configs.t_Enemy_Image_dat = _l[i];
            if(cfg.f_EnemyID ==  id){
                return cfg;
            }
        }
    }

    public toTSkin(cfg:Configs.t_Enemy_Image_dat){
        let skin:stSkin = new stSkin();
        skin.f_HeadID = cfg.f_HeadID;
        skin.f_WeaponID = cfg.f_WeaponID;
        skin.f_ShieldID = cfg.f_ShieldID;
        skin.f_WingID = cfg.f_WingID;
        skin.f_MountID = cfg.f_MountID;
        skin.f_BodyID = cfg.f_BodyID;
        return skin;
    }
}