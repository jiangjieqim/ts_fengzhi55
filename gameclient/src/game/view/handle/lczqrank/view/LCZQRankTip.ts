import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { stPet, stEquipAttr, WatchSkyRank_revc } from "../../../../network/protocols/BaseProto";
import { FontClipCtl } from "../../avatar/ctl/FontClipCtl";
import { FontCtlFactory } from "../../avatar/ctl/FontCtlFactory";
import { ChengHaoModel } from "../../chenghao/model/ChengHaoModel";
import { FuJiangStarCtl } from "../../fujiang/view/ctl/FuJiangStarCtl";
import { LingChongModel } from "../../lingchong/model/LingChongModel";
import { PetListProxy, PetSkillClientProxy } from "../../lingchong/proxy/LingChongProxy";
import { LingChongXMItem } from "../../lingchong/view/item/LingChongXMItem";
import { MainModel } from "../../main/model/MainModel";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { PlayerVoFactory } from "../../main/vos/PlayerVoFactory";
import { IconUtils } from "../../zuoqi/vos/IconUtils";

export class LCZQRankTip extends ViewBase{
    private _ui:ui.views.lczqrank.lczqRankTipUI;
    protected mMask = true; 
    protected mMainSnapshot = true;

    private _plusCtl: FontClipCtl;
    private _plusCtl1: FontClipCtl;

    private _starMyCtl:FuJiangStarCtl;
    private _starOtherCtl:FuJiangStarCtl;

    protected onAddLoadRes() {
        this.addAtlas('lingchong.atlas');
        this.addAtlas('jjcAttr.atlas');
    }

    protected onFirstInit(): void {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.lczqrank.lczqRankTipUI;

            this.bindClose(this._ui.btn_close);
            this._plusCtl = FontCtlFactory.createPlus();
            this._plusCtl1 = FontCtlFactory.createPlus();

            this._starMyCtl = new FuJiangStarCtl(this._ui.item.star);
            this._ui.list_attr.itemRender = ui.views.jjcAttr.ui_jjc_attrItem1UI;
            this._ui.list_attr.renderHandler = new Laya.Handler(this, this.onRenderHandller1);
            this._ui.list_xm.itemRender = LingChongXMItem;
            this._ui.list_xm.renderHandler = new Laya.Handler(this, this.onRenderHandler);

            this._starOtherCtl = new FuJiangStarCtl(this._ui.item1.star);
            this._ui.list_attr1.itemRender = ui.views.jjcAttr.ui_jjc_attrItem1UI;
            this._ui.list_attr1.renderHandler = new Laya.Handler(this, this.onRenderHandller2);
            this._ui.list_xm1.itemRender = LingChongXMItem;
            this._ui.list_xm1.renderHandler = new Laya.Handler(this, this.onRenderHandler);
        }
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

    protected onInit(): void {
        // this._ui.icon.skin = MainModel.Ins.mRoleData.headUrl;
        MainModel.Ins.setTTHead(this._ui.icon,MainModel.Ins.mRoleData.headUrl);
        this._ui.nameTF.text = MainModel.Ins.mRoleData.getName();
        this._ui.lab.text = "(" + MainModel.Ins.mRoleData.serverName + ")";
        this._ui.img_title.skin = ChengHaoModel.Ins.getTitleImg(ChengHaoModel.Ins.wearedTitleId);
        let v = StringUtil.val2Atlas(MainModel.Ins.mRoleData.getBattleValue());
        this._plusCtl.setValue(this._ui.plusCon,v);

        let data:WatchSkyRank_revc = this.Data;
        MainModel.Ins.setTTHead(this._ui.icon1,MainModel.Ins.convertHead(data.HeadUrl));
        this._ui.nameTF1.text = data.NickName;
        this._ui.lab1.text = "(" + data.serverName + ")";
        this._ui.img_title1.skin = ChengHaoModel.Ins.getTitleImg(data.titleId);
        let vv = StringUtil.val2Atlas(data.plus);
        this._plusCtl1.setValue(this._ui.plusCon1,vv);

        this.updataView(data);
    }

    protected onExit(): void {
        
    }

    private updataView(value:WatchSkyRank_revc){
        let myData = LingChongModel.Ins.getSZPetData();
        if(myData){
            this.setMyData(myData);
        }else{
            this._ui.item.visible = false;
            this._ui.lab_name.text = "";
            this._ui.list_attr.array = [];
            this._ui.list_xm.array = [];
            this._ui.item_jn.visible = false;
            this._ui.panel.visible = false;
        }

        if(value.petInfo.length){
            this.setOtherData(value.petInfo[0]);
        }else{
            this._ui.item1.visible = false;
            this._ui.lab_name1.text = "";
            this._ui.list_attr1.array = [];
            this._ui.list_xm1.array = [];
            this._ui.item_jn1.visible = false;
            this._ui.panel1.visible = false;
        }
    }

    private setMyData(value:stPet){
        this._ui.item.visible = true;
        this._ui.item_jn.visible = true;
        this._ui.panel.visible = true;
        this._ui.item.jiao.visible = false;
        let cfg: Configs.t_Pet_List_dat = PetListProxy.Ins.getCfgById(value.petId);
        this._ui.item.quality.skin = IconUtils.getQuaIcon(cfg.f_petquality);
        this._ui.item.icon.skin = PetListProxy.Ins.getPetIconById(cfg.f_petid);
        this._ui.item.lab_lv.text = "Lv." + value.petLevel;
        this._ui.item.tab.img.skin = `remote/lingchong/tj${cfg.f_pettype}.png`;
        this._ui.item.tab.img2.visible = false;
        if (value.petStar) {
            this._ui.item.sp.visible = true;
            this._ui.item.star.visible = true;
            this._starMyCtl.setStar(value.petStar);
        } else {
            this._ui.item.sp.visible = false;
            this._ui.item.star.visible = false;
        }

        this._ui.lab_name.text = cfg.f_petname;
        this._ui.list_attr.array = LingChongModel.Ins.getAttrArr(value.petId,value.petLevel,value.petStar);
        let array = [];
        for(let i:number=0;i<value.petTalents.length;i++){
            array.push({data:value.petTalents[i]});
        }
        this._ui.list_xm.array = array;

        let sCfg = PetSkillClientProxy.Ins.getCfgById(cfg.f_petskillid);
        this._ui.item_jn.lab.text = sCfg.f_skillname;
        let lv = LingChongModel.Ins.getSkillLv(value.petStar);
        this._ui.item_jn.lab_lv.text = "Lv." + lv;
        this._ui.lab_jn.text = LingChongModel.Ins.getSkillDec(cfg.f_petskillid,lv);
    }

    private _list;
    private setOtherData(value:stPet){
        this._ui.item1.visible = true;
        this._ui.item_jn1.visible = true;
        this._ui.panel1.visible = true;
        this._ui.item1.jiao.visible = false;
        let cfg: Configs.t_Pet_List_dat = PetListProxy.Ins.getCfgById(value.petId);
        this._ui.item1.quality.skin = IconUtils.getQuaIcon(cfg.f_petquality);
        this._ui.item1.icon.skin = PetListProxy.Ins.getPetIconById(cfg.f_petid);
        this._ui.item1.lab_lv.text = "Lv." + value.petLevel;
        this._ui.item1.tab.img.skin = `remote/lingchong/tj${cfg.f_pettype}.png`;
        this._ui.item1.tab.img2.visible = false;
        if (value.petStar) {
            this._ui.item1.sp.visible = true;
            this._ui.item1.star.visible = true;
            this._starOtherCtl.setStar(value.petStar);
        } else {
            this._ui.item1.sp.visible = false;
            this._ui.item1.star.visible = false;
        }

        this._ui.lab_name1.text = cfg.f_petname;
        let list = LingChongModel.Ins.getAttrArr(value.petId,value.petLevel,value.petStar);
        this._list = [];
        for(let i:number=0;i<list.length;i++){
            let e:stEquipAttr = new stEquipAttr;
            e.id = parseInt(list[i].split(":")[0]);
            e.value = parseInt(list[i].split(":")[1]);
            this._list.push(e);
        }
        this._ui.list_attr1.array = this._list;
        let array = [];
        for(let i:number=0;i<value.petTalents.length;i++){
            array.push({data:value.petTalents[i]});
        }
        this._ui.list_xm1.array = array;

        let sCfg = PetSkillClientProxy.Ins.getCfgById(cfg.f_petskillid);
        this._ui.item_jn1.lab.text = sCfg.f_skillname;
        let lv = LingChongModel.Ins.getSkillLv(value.petStar);
        this._ui.item_jn1.lab_lv.text = "Lv." + lv;
        this._ui.lab_jn1.text = LingChongModel.Ins.getSkillDec(cfg.f_petskillid,lv);
    }
}