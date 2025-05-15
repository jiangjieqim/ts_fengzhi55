import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { E } from "../../../G";
import { EViewType } from "../../../common/defines/EnumDefine";
import { MSGID } from "../../../network/MSGID";
import { WarcraftAttrListUpdate_revc, WarcraftSkinInit_revc, WarcraftSkinListUpdate_revc, WarcraftSkin_revc } from "../../../network/protocols/BaseProto";
import { WowHuanZhuangModel } from "./model/WowHuanZhuangModel";
import { WowHuanZhuangView } from "./view/WowHuanZhuangView";
import { WowHuanZhuangView1 } from "./view/WowHuanZhuangView1";

export class WowHuanZhuangModule extends BaseModel{
    private static _ins:WowHuanZhuangModule;
    public static get ins(){
        if(!this._ins){
            this._ins = new WowHuanZhuangModule();
        }
        return this._ins;
    }
    public onInitCallBack():void{

    }

    public initMsg(){
        this.Reg(new WowHuanZhuangView(EViewType.WowHuanZhuangView));
        this.Reg(new WowHuanZhuangView1(EViewType.WowHuanZhuangView1));
 
        E.MsgMgr.AddMsg(MSGID.WarcraftSkinInit, this.WarcraftSkinInit,this);
        E.MsgMgr.AddMsg(MSGID.WarcraftSkin, this.WarcraftSkin,this);
        E.MsgMgr.AddMsg(MSGID.WarcraftSkinListUpdate, this.WarcraftSkinListUpdate,this);
        E.MsgMgr.AddMsg(MSGID.WarcraftAttrListUpdate, this.WarcraftAttrListUpdate,this);
    }

    //魔兽换装（初始化3010前推）
    private WarcraftSkinInit(value:WarcraftSkinInit_revc){
        WowHuanZhuangModel.Ins.skinList = value.skinList;
        WowHuanZhuangModel.Ins.attrList = value.attrList;
    }

    //魔兽换装
    private WarcraftSkin(value:WarcraftSkin_revc){
        for(let i:number=0;i<WowHuanZhuangModel.Ins.skinList.length;i++){
            if(WowHuanZhuangModel.Ins.skinList[i].type == value.type){
                WowHuanZhuangModel.Ins.skinList[i].skinId = value.skinId;
                break;
            }
        }
        WowHuanZhuangModel.Ins.event(WowHuanZhuangModel.UPDATA_SKINID);
    }

    //魔兽换装解锁新皮肤
    private WarcraftSkinListUpdate(value:WarcraftSkinListUpdate_revc){
        for(let i:number=0;i<WowHuanZhuangModel.Ins.skinList.length;i++){
            if(WowHuanZhuangModel.Ins.skinList[i].type == value.type){
                WowHuanZhuangModel.Ins.skinList[i].skinIds = WowHuanZhuangModel.Ins.skinList[i].skinIds.concat(value.skinIds);
                break;
            }
        }
        WowHuanZhuangModel.Ins.event(WowHuanZhuangModel.UPDATA_ALL_SKINID);
    }

    //魔兽换装激活皮肤属性
    private WarcraftAttrListUpdate(value:WarcraftAttrListUpdate_revc){
        for(let i:number=0;i<value.attrList.length;i++){
            let index = WowHuanZhuangModel.Ins.attrList.findIndex(ele => ele.fid == value.attrList[i].fid);
            if(index != -1){
                WowHuanZhuangModel.Ins.attrList[index] = value.attrList[i];
            }
        }
        WowHuanZhuangModel.Ins.event(WowHuanZhuangModel.UPDATA_ATTR);
    }
}