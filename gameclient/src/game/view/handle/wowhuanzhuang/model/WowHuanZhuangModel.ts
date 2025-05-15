import { stWarcraftAttr, stWarcraftSkin } from "../../../../network/protocols/BaseProto";

export class SkinEnum{
    public static Character:number = 1;//角色
    public static Flag:number = 2;//战旗
    public static Halo:number = 3;//光环
}

export class WowHuanZhuangModel extends Laya.EventDispatcher{
    private static _ins: WowHuanZhuangModel;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new WowHuanZhuangModel();
        }
        return this._ins;
    } 

    public skinList:stWarcraftSkin[];//玩家的皮肤列表
    public attrList:stWarcraftAttr[];//玩家的属性列表

    public static UPDATA_SKINID:string = "UPDATA_SKINID";//更新穿戴的skinID
    public static UPDATA_ALL_SKINID:string = "UPDATA_ALL_SKINID";//更新获得的skinID
    public static UPDATA_ATTR:string = "UPDATA_ATTR";

    //获得穿戴的皮肤ID 
    public getSkinIDByType(type:SkinEnum){
        for(let i:number=0;i<WowHuanZhuangModel.Ins.skinList.length;i++){
            if(WowHuanZhuangModel.Ins.skinList[i].type == type){
                return WowHuanZhuangModel.Ins.skinList[i].skinId;
            }
        }
        return 0;
    }

    //获得解锁的皮肤ID 
    public getSkinIDsByType(type:SkinEnum){
        for(let i:number=0;i<WowHuanZhuangModel.Ins.skinList.length;i++){
            if(WowHuanZhuangModel.Ins.skinList[i].type == type){
                return WowHuanZhuangModel.Ins.skinList[i].skinIds;
            }
        }
        return [];
    }
}