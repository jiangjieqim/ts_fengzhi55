import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { SocketMgr } from "../../../../network/SocketMgr";
import { WarcraftSkinAttr_req } from "../../../../network/protocols/BaseProto";
import { AvatarFactory } from "../../avatar/AvatarFactory";
import { AvatarMonsterView } from "../../avatar/AvatarMonsterView";
import { MainModel } from "../../main/model/MainModel";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { WowHuanZhuangModel } from "../model/WowHuanZhuangModel";
import { WowHuanZhuangListProxy } from "../proxy/WowHuanZhuangProxy";

export class WowHuanZhuangItem extends ui.views.wowhuanzhuang.ui_wowhuangzhuangItem1UI{
    constructor(){
        super();

        this.on(Laya.Event.DISPLAY,this,this.onAdd);
        this.on(Laya.Event.UNDISPLAY,this,this.onRemove);

        this.list.itemRender = ui.views.wowhuanzhuang.ui_wowhuangzhuangItem2UI;
        this.list.renderHandler = new Laya.Handler(this,this.onItemHandler);

        ButtonCtl.Create(this.btn,new Laya.Handler(this,this.onClick));
    }

    private onClick(){
        if(this._data){
            let req:WarcraftSkinAttr_req = new WarcraftSkinAttr_req;
            req.fid = this._data.f_id;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private onAdd(){

    }

    private onRemove(){
        if(this._avatar){
            this._avatar.dispose();
            this._avatar = null;
        }
    }

    private onItemHandler(item:ui.views.wowhuanzhuang.ui_wowhuangzhuangItem2UI){
        let id = parseInt(item.dataSource.split(":")[0]);
        let val = parseInt(item.dataSource.split(":")[1]);
        item.lab.text = MainModel.Ins.getAttrNameIdByID(id) + ":" + attrConvert(id,val);
    }

    private _data:Configs.t_Image_Attribute_dat;
    public setData(value:Configs.t_Image_Attribute_dat){
        if(!value)return;
        this._data = value;
        let cfg:Configs.t_Image_List_dat = WowHuanZhuangListProxy.Ins.GetDataById(value.f_CharacterID);
        this.creatAvatar(cfg.f_ImageID);
        this.lab3.text = value.f_GetMethod;
        this.list.array = value.f_CharacterAttr.split("|");
        let data = WowHuanZhuangModel.Ins.attrList.find(ele => ele.fid == value.f_id);
        if(data.state == 0){
            this.btn.disabled = true;
            this.lab4.text = "激活";
        }else if(data.state == 1){
            this.btn.disabled = false;
            this.lab4.text = "激活";
        }else if(data.state == 2){
            this.btn.disabled = true;
            this.lab4.text = "已激活";
        } 
    }

    private _avatar:AvatarMonsterView;
    private creatAvatar(skinId:number){
        if(this._avatar){
            this._avatar.dispose();
            this._avatar = null;
        }
        
        this._avatar = AvatarFactory.createCharacter(skinId);
        this._avatar.scale(0.7,0.7);
        this.sp.addChild(this._avatar);
    }
}