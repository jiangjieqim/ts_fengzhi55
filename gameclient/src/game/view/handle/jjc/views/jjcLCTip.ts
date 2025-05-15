import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { stPet } from "../../../../network/protocols/BaseProto";
import { AvatarFactory } from "../../avatar/AvatarFactory";
import { AvatarMonsterView } from "../../avatar/AvatarMonsterView";
import { EAvatarDir } from "../../avatar/AvatarView";
import { EAvatarAnim } from "../../avatar/vos/EAvatarAnim";
import { FuJiangStarCtl } from "../../fujiang/view/ctl/FuJiangStarCtl";
import { LingChongModel } from "../../lingchong/model/LingChongModel";
import { PetListProxy, PetQualityProxy, PetSkillClientProxy } from "../../lingchong/proxy/LingChongProxy";
import { LingChongXMItem } from "../../lingchong/view/item/LingChongXMItem";
import { EquipmentQualityProxy } from "../../main/model/EquipmentProxy";
import { MainModel } from "../../main/model/MainModel";
import { attrConvert } from "../../main/vos/MainRoleVo";

export class jjcLCTip extends ViewBase{
    private _ui:ui.views.jjc.ui_jjclcTipUI;
    protected mMask = true;
    protected autoFree = true;

    private _avatar:AvatarMonsterView;
    private _starCtl:FuJiangStarCtl;

    protected  onAddLoadRes(){
        
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.jjc.ui_jjclcTipUI;
            this.bindClose(this._ui.btn_close);

            this._starCtl = new FuJiangStarCtl(this._ui.star);

            this._ui.list_xm.itemRender = LingChongXMItem;
            this._ui.list_xm.renderHandler = new Laya.Handler(this,this.onRenderHandler);

            this._ui.list_attr.itemRender = ui.views.lingchong.ui_lingchongAttrItemUI;
            this._ui.list_attr.renderHandler = new Laya.Handler(this,this.onRenderHandller1);
        }
    }

    private onRenderHandller1(item:ui.views.lingchong.ui_lingchongAttrItemUI){
        let id = parseInt(item.dataSource.split(":")[0]);
        let val = parseInt(item.dataSource.split(":")[1]);
        item.tf1.text = MainModel.Ins.getAttrNameIdByID(id) + ":";
        item.valTf.text = attrConvert(id,val);
    }

    private onRenderHandler(item:LingChongXMItem,index:number){
        item.setData(item.dataSource,index);
    }

    private _data:stPet;
    protected onInit(): void {
        this._data = this.Data[0];
        this.updataView();
    }

    protected onExit(): void {
        if(this._avatar){
            this._avatar.dispose();
            this._avatar = null;
        }
    }

    private updataView(){
        if(!this._data)return;
        let cfg:Configs.t_Pet_List_dat = PetListProxy.Ins.getCfgById(this._data.petId);
        this._ui.lab_name.text = cfg.f_petname;
        this._ui.lab_name.color = "#" + EquipmentQualityProxy.Ins.getByQua(cfg.f_petquality).f_Color;
        this._ui.lab_lv.text = "Lv." + this._data.petLevel;
        this._starCtl.setStar(this._data.petStar);
        this._ui.tab.img.skin = `remote/lingchong/tj${cfg.f_pettype}.png`;
        this._ui.tab.img2.visible = false;

        let sCfg = PetSkillClientProxy.Ins.getCfgById(cfg.f_petskillid);
        this._ui.item_jn.lab.text = sCfg.f_skillname;
        let lv = LingChongModel.Ins.getSkillLv(this._data.petStar);
        this._ui.item_jn.lab_lv.text = "Lv." + lv;
        this._ui.lab_jn.text = LingChongModel.Ins.getSkillDec(cfg.f_petskillid,lv);

        this._ui.list_attr.array = LingChongModel.Ins.getAttrArr(cfg.f_petid,this._data.petLevel,this._data.petStar);

        let array = [];
        for(let i:number=0;i<this._data.petTalents.length;i++){
            array.push({data:this._data.petTalents[i]});
        }
        this._ui.list_xm.array = array;
        this._ui.list_xm.x = (this._ui.box.width - array.length * 91) * 0.5;

        this._avatar = AvatarFactory.createPet(cfg.f_petid);
        this._avatar.play(EAvatarAnim.HandBookStand);
        this._avatar.dir = EAvatarDir.Left;
        this._ui.avatr.addChild(this._avatar);
    }
}