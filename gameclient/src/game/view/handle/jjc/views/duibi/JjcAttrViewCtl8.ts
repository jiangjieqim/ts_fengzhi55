import { ui } from "../../../../../../ui/layaMaxUI";
import { WatchPlayerInfo_revc, stEquipAttr, stPet } from "../../../../../network/protocols/BaseProto";
import { FuJiangStarCtl } from "../../../fujiang/view/ctl/FuJiangStarCtl";
import { LingChongModel } from "../../../lingchong/model/LingChongModel";
import { PetListProxy, PetSkillClientProxy } from "../../../lingchong/proxy/LingChongProxy";
import { LingChongXMItem } from "../../../lingchong/view/item/LingChongXMItem";
import { MainModel } from "../../../main/model/MainModel";
import { attrConvert } from "../../../main/vos/MainRoleVo";
import { PlayerVoFactory } from "../../../main/vos/PlayerVoFactory";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";

export class JjcAttrViewCtl8{
    protected skin:ui.views.jjcAttr.ui_jjc_attrView8UI;

    private _starMyCtl:FuJiangStarCtl;
    private _starOtherCtl:FuJiangStarCtl;

    constructor(skin:ui.views.jjcAttr.ui_jjc_attrView8UI) {
        this.skin = skin;

        this._starMyCtl = new FuJiangStarCtl(this.skin.item.star);
        this.skin.list_attr.itemRender = ui.views.jjcAttr.ui_jjc_attrItem1UI;
        this.skin.list_attr.renderHandler = new Laya.Handler(this,this.onRenderHandller1);
        this.skin.list_xm.itemRender = LingChongXMItem;
        this.skin.list_xm.renderHandler = new Laya.Handler(this,this.onRenderHandler);

        this._starOtherCtl = new FuJiangStarCtl(this.skin.item1.star);
        this.skin.list_attr1.itemRender = ui.views.jjcAttr.ui_jjc_attrItem1UI;
        this.skin.list_attr1.renderHandler = new Laya.Handler(this,this.onRenderHandller2);
        this.skin.list_xm1.itemRender = LingChongXMItem;
        this.skin.list_xm1.renderHandler = new Laya.Handler(this,this.onRenderHandler);
    }

    
    private onRenderHandler(item:LingChongXMItem,index:number){
        item.setData(item.dataSource,index);
    }

    private onRenderHandller1(item:ui.views.jjcAttr.ui_jjc_attrItem1UI){
        let id = parseInt(item.dataSource.split(":")[0]);
        let val = parseInt(item.dataSource.split(":")[1]);
        item.tf1.text = MainModel.Ins.getAttrNameIdByID(id) + ":";
        item.valTf.text = attrConvert(id,val);

        let val1 = PlayerVoFactory.getEquipVal(this._list,id);
        if(val > val1){
            item.upimg.skin = `remote/common/base/green.png`;
        }else if(val < val1){
            item.upimg.skin = `remote/common/base/red.png`;
        }else{
            item.upimg.skin = "";
        }
    }

    private onRenderHandller2(item:ui.views.jjcAttr.ui_jjc_attrItem1UI){
        let id = parseInt(item.dataSource.id);
        let val = parseInt(item.dataSource.value);
        item.tf1.text = MainModel.Ins.getAttrNameIdByID(id) + ":";
        item.valTf.text = attrConvert(id,val);
        item.upimg.visible = false;
    }

    public setData(value:WatchPlayerInfo_revc){
        let myData = LingChongModel.Ins.getSZPetData();
        if(myData){
            this.setMyData(myData);
        }else{
            this.skin.item.visible = false;
            this.skin.lab_name.text = "";
            this.skin.list_attr.array = [];
            this.skin.list_xm.array = [];
            this.skin.item_jn.visible = false;
            this.skin.panel.visible = false;
        }

        if(value.petInfo.length){
            this.setOtherData(value.petInfo[0]);
        }else{
            this.skin.item1.visible = false;
            this.skin.lab_name1.text = "";
            this.skin.list_attr1.array = [];
            this.skin.list_xm1.array = [];
            this.skin.item_jn1.visible = false;
            this.skin.panel1.visible = false;
        }
    }

    private setMyData(value:stPet){
        this.skin.item.visible = true;
        this.skin.item_jn.visible = true;
        this.skin.panel.visible = true;
        this.skin.item.jiao.visible = false;
        let cfg: Configs.t_Pet_List_dat = PetListProxy.Ins.getCfgById(value.petId);
        this.skin.item.quality.skin = IconUtils.getQuaIcon(cfg.f_petquality);
        this.skin.item.icon.skin = PetListProxy.Ins.getPetIconById(cfg.f_petid);
        this.skin.item.lab_lv.text = "Lv." + value.petLevel;
        this.skin.item.tab.img.skin = `remote/lingchong/tj${cfg.f_pettype}.png`;
        this.skin.item.tab.img2.visible = false;
        if (value.petStar) {
            this.skin.item.sp.visible = true;
            this.skin.item.star.visible = true;
            this._starMyCtl.setStar(value.petStar);
        } else {
            this.skin.item.sp.visible = false;
            this.skin.item.star.visible = false;
        }

        this.skin.lab_name.text = cfg.f_petname;
        this.skin.list_attr.array = LingChongModel.Ins.getAttrArr(value.petId,value.petLevel,value.petStar);
        let array = [];
        for(let i:number=0;i<value.petTalents.length;i++){
            array.push({data:value.petTalents[i]});
        }
        this.skin.list_xm.array = array;

        let sCfg = PetSkillClientProxy.Ins.getCfgById(cfg.f_petskillid);
        this.skin.item_jn.lab.text = sCfg.f_skillname;
        let lv = LingChongModel.Ins.getSkillLv(value.petStar);
        this.skin.item_jn.lab_lv.text = "Lv." + lv;
        this.skin.lab_jn.text = LingChongModel.Ins.getSkillDec(cfg.f_petskillid,lv);
    }

    private _list;
    private setOtherData(value:stPet){
        this.skin.item1.visible = true;
        this.skin.item_jn1.visible = true;
        this.skin.panel1.visible = true;
        this.skin.item1.jiao.visible = false;
        let cfg: Configs.t_Pet_List_dat = PetListProxy.Ins.getCfgById(value.petId);
        this.skin.item1.quality.skin = IconUtils.getQuaIcon(cfg.f_petquality);
        this.skin.item1.icon.skin = PetListProxy.Ins.getPetIconById(cfg.f_petid);
        this.skin.item1.lab_lv.text = "Lv." + value.petLevel;
        this.skin.item1.tab.img.skin = `remote/lingchong/tj${cfg.f_pettype}.png`;
        this.skin.item1.tab.img2.visible = false;
        if (value.petStar) {
            this.skin.item1.sp.visible = true;
            this.skin.item1.star.visible = true;
            this._starOtherCtl.setStar(value.petStar);
        } else {
            this.skin.item1.sp.visible = false;
            this.skin.item1.star.visible = false;
        }

        this.skin.lab_name1.text = cfg.f_petname;
        let list = LingChongModel.Ins.getAttrArr(value.petId,value.petLevel,value.petStar);
        this._list = [];
        for(let i:number=0;i<list.length;i++){
            let e:stEquipAttr = new stEquipAttr;
            e.id = parseInt(list[i].split(":")[0]);
            e.value = parseInt(list[i].split(":")[1]);
            this._list.push(e);
        }
        this.skin.list_attr1.array = this._list;
        let array = [];
        for(let i:number=0;i<value.petTalents.length;i++){
            array.push({data:value.petTalents[i]});
        }
        this.skin.list_xm1.array = array;

        let sCfg = PetSkillClientProxy.Ins.getCfgById(cfg.f_petskillid);
        this.skin.item_jn1.lab.text = sCfg.f_skillname;
        let lv = LingChongModel.Ins.getSkillLv(value.petStar);
        this.skin.item_jn1.lab_lv.text = "Lv." + lv;
        this.skin.lab_jn1.text = LingChongModel.Ins.getSkillDec(cfg.f_petskillid,lv);
    }
}