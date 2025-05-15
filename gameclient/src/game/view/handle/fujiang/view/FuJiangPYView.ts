import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { TabControl } from "../../../../../frame/view/TabControl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { CheifChangeSkin_req, CheifEquipUp_req, CheifStarUp_req, CheifUpgrade_req, ChiefAssist_req, ChiefIntoBattle_req, stChief, stEquipAttr, stSkin } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { AvatarFactory } from "../../avatar/AvatarFactory";
import { AvatarMonsterView } from "../../avatar/AvatarMonsterView";
import { EAvatarDir } from "../../avatar/AvatarView";
import { FontClipCtl } from "../../avatar/ctl/FontClipCtl";
import { FontCtlFactory } from "../../avatar/ctl/FontCtlFactory";
import { EAvatarAnim } from "../../avatar/vos/EAvatarAnim";
import {DotManager} from "../../common/DotManager";
import { System_RefreshTimeProxy } from "../../huodong/model/ActivityProxy";
import { ValCtl } from "../../main/ctl/ValLisCtl";
import { EquipmentQualityProxy } from "../../main/model/EquipmentProxy";
import { MainModel } from "../../main/model/MainModel";
import { t_Platform } from "../../main/proxy/t_Platform";
import { ECellType } from "../../main/vos/ECellType";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { XianShiLiBaoModel, XianShiLiBaoType } from "../../xianshilibao/model/XianShiLiBaoModel";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { FuJiangModel } from "../model/FuJiangModel";
import { FuJiangClasProxy, FuJiangEquipSortProxy, FuJiangListProxy, FuJiangLvProxy, FuJiangSkillProxy, FuJiangSkinProxy, FuJiangStarProxy, FuJiangStarValueProxy, FuJiangSupportInheritProxy } from "../proxy/FuJiangProxy";
import { FuJiangStarCtl } from "./ctl/FuJiangStarCtl";
import { FuJiangItem10 } from "./item/FuJiangItem10";
import { FuJiangItem3 } from "./item/FuJiangItem3";
import { FuJiangItem7 } from "./item/FuJiangItem7";

export class FuJiangPYView extends ViewBase{
    private _ui:ui.views.fujiang.ui_fujiangPYViewUI;
    protected mMask = true;
    protected mMainSnapshot = true; 

    private tabsCtl:TabControl;
    private tabList: any;

    private _plusCtl: FontClipCtl;

    private _avatar:AvatarMonsterView;

    // private _skillctl1:FuJiangSkillCtl;
    // private _skillctl2:FuJiangSkillCtl;
    // private _skillctl3:FuJiangSkillCtl;
    // private _skillctl4:FuJiangSkillCtl;


    protected onAddLoadRes() {
        this.addAtlas('fujiang.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.fujiang.ui_fujiangPYViewUI;
            this.bindClose(this._ui.btn_close);

            ButtonCtl.Create(this._ui.btn_l,new Laya.Handler(this,this.onBtnLeftClick));
            ButtonCtl.Create(this._ui.btn_r,new Laya.Handler(this,this.onBtnRightClick));
            ButtonCtl.Create(this._ui.btn_cz,new Laya.Handler(this,this.onBtnCZClick));
            ButtonCtl.Create(this._ui.btn_lv,new Laya.Handler(this,this.onBtnLVClick));
            ButtonCtl.Create(this._ui.btn_yjsj,new Laya.Handler(this,this.onBtnYJSJClick));
            ButtonCtl.Create(this._ui.btn_yjcs,new Laya.Handler(this,this.onBtnYJCSClick));
            ButtonCtl.Create(this._ui.btn_add,new Laya.Handler(this,this.onBtnAddClick));
            ButtonCtl.Create(this._ui.btn_yssx,new Laya.Handler(this,this.onBtnYssxClick));
            ButtonCtl.Create(this._ui.btn_pf,new Laya.Handler(this,this.onBtnPFClick));
            ButtonCtl.Create(this._ui.btn_cs,new Laya.Handler(this,this.onBtnCSClick));
            ButtonCtl.Create(this._ui.btn_sz,new Laya.Handler(this,this.onBtnSZClick));

            ValCtl.Create(this._ui.lv_lab,this._ui.lv_img,ECellType.FuJiangLv);
            ValCtl.Create(this._ui.equip_lb1,this._ui.equip_img1,ECellType.FuJiangEquipStar);
            ValCtl.Create(this._ui.equip_lb2,this._ui.equip_img2,ECellType.FuJiangEquipLv);
            ValCtl.Create(this._ui.skill_lab1,this._ui.skill_img1,ECellType.FuJiangSkill2);
            ValCtl.Create(this._ui.skill_lab2,this._ui.skill_img2,ECellType.FuJiangSkill1);

            this._ui.tab2.visible = false;
            this._ui.sp22.visible = false;
            const tabsSkin = [this._ui.tab1,this._ui.tab3,this._ui.tab4,this._ui.tab5];
            this.tabList = ["属性","升星","技能","皮肤"];
            this.tabsCtl  = new TabControl();
            this.tabsCtl.init(tabsSkin, new Laya.Handler(this,this.onTabSelectHandler), new Laya.Handler(this, this.itemTabHandler));

            this._plusCtl = FontCtlFactory.createPlus();

            // this._skillctl1 = new FuJiangSkillCtl(this._ui.item_jn1);
            // this._skillctl2 = new FuJiangSkillCtl(this._ui.item_jn2);
            // this._skillctl3 = new FuJiangSkillCtl(this._ui.item_jn3);
            // this._skillctl4 = new FuJiangSkillCtl(this._ui.item_jn4);

            this._ui.list4.itemRender = ui.views.fujiang.ui_fujiangAttrItemUI;
            this._ui.list4.renderHandler = new Laya.Handler(this,this.onRenderHandler4);
            this._ui.list5.itemRender = ui.views.fujiang.ui_fujiangAttrItemUI;
            this._ui.list5.renderHandler = new Laya.Handler(this,this.onRenderHandler5);

            this._ui.list6.itemRender = ui.views.fujiang.ui_fujiangAttrItemUI;
            this._ui.list6.renderHandler = new Laya.Handler(this,this.onRenderHandler6);
            this._ui.list7.itemRender = ui.views.fujiang.ui_fujiangAttrItemUI;
            this._ui.list7.renderHandler = new Laya.Handler(this,this.onRenderHandler5);

            this._ui.list1.itemRender = FuJiangItem3;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onRenderHandler1);

            this._ui.list2.itemRender = ui.views.fujiang.ui_fujiangAttrItem1UI;
            this._ui.list2.renderHandler = new Laya.Handler(this,this.onRenderHandler2);

            this._ui.list.itemRender = FuJiangItem7;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);

            this._ui.list_pf.itemRender = FuJiangItem10;
            this._ui.list_pf.renderHandler = new Laya.Handler(this,this.onRenderHandler10);
            this._ui.list_pf.selectEnable = true;
        }
    }

    private itemTabHandler(tabSkin, index: number, sel: boolean, data){
        let skin: ui.views.fujiang.ui_tab1UI = tabSkin;
        skin.lab.text = this.tabList[index];
        if (sel) {
            skin.img1.visible = false;
            skin.img2.visible = true;
            skin.lab.color = "#90501F";
        } else {
            skin.img1.visible = true;
            skin.img2.visible = false;
            skin.lab.color = "#FCEABE";
        }
    }

    private onTabSelectHandler(v:number){
        if(v == -1)return;
        for(let i:number=0;i<4;i++){
            if(i == v){
                this._ui["sp" + (i + 1)].visible = true;
            }else{
                this._ui["sp" + (i + 1)].visible = false;
            }
        }
        this._ui.lv_box.visible = false;
        this._ui.equip_box1.visible = this._ui.equip_box2.visible = false;
        this._ui.skill_box1.visible = this._ui.skill_box2.visible = false;
        if(v == 0){
            this._ui.lv_box.visible = true;
        }else if(v == 2){
            this._ui.skill_box1.visible = this._ui.skill_box2.visible = true;
        }
        if(this._data && this._avatar){
            let cCfg = FuJiangListProxy.Ins.getCfgById(this._data.cheifId);
            let pfArr = cCfg.f_chiefskin.split("|");
            let index = pfArr.indexOf(this._data.skinId.toString());
            this._ui.list_pf.selectedIndex = index;
        }
    }

    private onBtnCZClick(){
        if(this._data){
            if(this._data.level <= 1){
                E.ViewMgr.ShowMidError("已是最低等级");
                return;
            }
            E.ViewMgr.Open(EViewType.FuJiangCZ,null,[this._data,0]);
        }
    }

    private onBtnLeftClick(){
        this._index--;
        this.setBtn();
    }

    private onBtnRightClick(){
        this._index++;
        this.setBtn();
    }

    private _data:stChief;
    private _index:number;
    protected onInit(): void {
        FuJiangModel.Ins.on(FuJiangModel.FUJIANG_UPDATA,this,this.onUpdataView);
        let arr = FuJiangModel.Ins.getFuJiangList();
        this._index = arr.findIndex(ele => ele.cheifId === this.Data.cheifId);
        this.setBtn();
        this.tabsCtl.selectIndex = 0;
    }

    protected onExit(): void {
        FuJiangModel.Ins.off(FuJiangModel.FUJIANG_UPDATA,this,this.onUpdataView);
        this.tabsCtl.selectIndex = -1;
        if(this._avatar){
            this._avatar.dispose();
            this._avatar = null;
        }
    }

    private setBtn(){
        let arr = FuJiangModel.Ins.getFuJiangList();
        this._data = arr[this._index];
        if(!this._data)return;
        this.updataView();
        let cCfg = FuJiangListProxy.Ins.getCfgById(this._data.cheifId);
        let pfArr = cCfg.f_chiefskin.split("|");
        let index = pfArr.indexOf(this._data.skinId.toString());
        this._ui.list_pf.selectedIndex = index;
        if(arr.length == 1){
            this._ui.btn_l.visible = false;
            this._ui.btn_r.visible = false;
        }else{
            if(this._index == 0){
                this._ui.btn_l.visible = false;
                this._ui.btn_r.visible = true;
            }else if(this._index == arr.length - 1){
                this._ui.btn_l.visible = true;
                this._ui.btn_r.visible = false;
            }else{
                this._ui.btn_l.visible = true;
                this._ui.btn_r.visible = true;
            }
        }
    }

    private onUpdataView(){
        let arr = FuJiangModel.Ins.getFuJiangList();
        this._data = arr[this._index];
        if(!this._data)return;
        this.updataView();
    }

    private _type:number;
    private updataView(){
        let cCfg = FuJiangListProxy.Ins.getCfgById(this._data.cheifId);
        let qCfg = EquipmentQualityProxy.Ins.getByQua(cCfg.f_cheifQuality);
        this._ui.lab_name.text = cCfg.f_cheif;
        this._ui.lab_qua.text = qCfg.f_chiefinfo;
        this._ui.lab_name.color = this._ui.lab_qua.color = "#" + qCfg.f_chiefcolor;
        this._ui.lab_lv.text = "Lv." + this._data.level;
        let v = StringUtil.val2Atlas(this._data.cheifFight);
        this._plusCtl.setValue(this._ui.plusCon,v);
        this._ui.img_zy.skin = FuJiangListProxy.Ins.getProfessionSkin(cCfg.f_cheifClass);
        this._ui.lab_zy.text = FuJiangClasProxy.Ins.getCfgByPre(cCfg.f_cheifClass).f_chiefclass;
        let skin:stSkin = FuJiangModel.Ins.getFuJiangSkin(cCfg.f_cheifid);
        if(!this._avatar){
            this._avatar = AvatarFactory.createAvatarByStSkin(skin,EAvatarAnim.NormalStand,EAvatarDir.Right);
            this._avatar.scale(1.1,1.1);
            this._ui.sp.addChild(this._avatar);
        }else{
            this._avatar.mSkin = skin;
        }

        // for(let i:number = 1;i < 5; i++){
        //     let cfg = FuJiangSkillProxy.Ins.getCfgById(this._data.cheifId);
        //     let arr = cfg["f_clientskill" + i].split("|");
        //     let flag = false;
        //     for(let j:number=0;j<arr.length;j++){
        //         if(parseInt(arr[j]) > 0){
        //             flag = true;
        //             break;
        //         }
        //     }
        //     if(flag){
        //         this._ui["item_jn" + i].visible = true;
        //         let skillCfg = this._data.skills.find(ele => ele.skillPos == i);
        //         let lv = 1;
        //         if(skillCfg){
        //             lv = skillCfg.skillLevel;
        //         }
        //         this["_skillctl" + i].setData(this._data.cheifId,i,lv,this._data.star);
        //     }else{
        //         this._ui["item_jn" + i].visible = false;
        //     }
        // }

        this._ui.img_sz.visible = false;
        this._ui.lab_sz1.text = "上阵";
        this._type = 0;
        if(this._data.pos){
            this._ui.img_sz.visible = true;
            this._ui.lab_sz.text = "已上阵";
            this._ui.lab_sz1.text = "下阵";
            this._type = 1;
        }else{
            if(this._data.assistId){
                this._ui.img_sz.visible = true;
                this._ui.lab_sz.text = "已助阵";
                this._ui.lab_sz1.text = "下阵";
                this._type = 2;
            }
        }

        if(this._data.pos){
            this._ui.img_plusCon.visible = true;
        }else{
            this._ui.img_plusCon.visible = false;
        }

        this.updataSXView();
        // this.updataZBView();
        this.updataStarView();
        this.updataSkillView();
        this.updataSkinView();
    }

    //*************************************************************属性 *************************************/
    private onRenderHandler4(item:ui.views.fujiang.ui_fujiangAttrItemUI){
        let id = parseInt(item.dataSource.id);
        let val = parseInt(item.dataSource.value);
        item.tf1.text = MainModel.Ins.getAttrNameIdByID(id) + ":";
        item.valTf.text = attrConvert(id,val);
        item.lab.visible = false;
    }

    private onRenderHandler5(item:ui.views.fujiang.ui_fujiangAttrItemUI,index:number){
        item.tf1.color = item.valTf.color = "#FB5AFB";
        let id = parseInt(item.dataSource.split(":")[0]);
        let val = parseInt(item.dataSource.split(":")[1]);

        let cCfg = FuJiangListProxy.Ins.getCfgById(this._data.cheifId);
        let lvSt = cCfg.f_specialupgrade.split("|")[index];
        let starSt = cCfg.f_specialupstar.split("|")[index];
        let lvNum:number = parseInt(lvSt.split(":")[1]) * (this._data.level - 1);
        let starNum:number = parseInt(starSt.split(":")[1]) * (this._data.star - 1);

        val = val + lvNum + starNum;
        item.tf1.text = MainModel.Ins.getAttrNameIdByID(id) + ":";

        let starLv = parseInt(cCfg.f_specialunlock.split("|")[index]);
        if(this._data.star >= starLv){
            item.tf1.color = item.valTf.color = "#FB5AFB";
            item.valTf.text = attrConvert(id,val);
            item.lab.visible = false;
        }else{
            item.tf1.color = item.valTf.color = "#D3D3D3";
            item.valTf.text = attrConvert(id,val);
            item.lab.visible = true;
            item.lab.text = "(" + starLv + "星)";
        }
    }

    private onRenderHandler6(item:ui.views.fujiang.ui_fujiangAttrItemUI){
        item.lab.visible = false;
        let id = parseInt(item.dataSource.split(":")[0]);
        let val = parseInt(item.dataSource.split(":")[1]);
        item.tf1.text = MainModel.Ins.getAttrNameIdByID(id) + ":";
        item.valTf.text = attrConvert(id,val);
    }

    private _lvType:number;
    private updataSXView(){
        this._ui.lab_num.color = "#FFEEC2";

        DotManager.removeDot(this._ui.tab1);
        DotManager.removeDot(this._ui.btn_lv);
        let nextCfg = FuJiangLvProxy.Ins.getCfgByLv(this._data.level + 1);
        let cfg = FuJiangLvProxy.Ins.getCfgByLv(this._data.level);
        if(!nextCfg){
            this._ui.lab_ma.visible = true;
            this._ui.btn_lv.visible = false;
        }else{
            this._ui.lab_ma.visible = false;
            this._ui.btn_lv.visible = true;
            this._ui.img1.skin = IconUtils.getIconByCfgId(ECellType.FuJiangLv);

            if (t_Platform.Ins.isOneLvUp) {
                this._lvType = 0;
                this._ui.lab_num.text = cfg.f_upgradecost.split("-")[1];
                this._ui.lab.text = "一键升级";
                let val = MainModel.Ins.mRoleData.getVal(ECellType.FuJiangLv);
                if (val < parseInt(cfg.f_upgradecost.split("-")[1])) {
                    this._ui.lab_num.color = "#D02525";
                }

                this._lvNum = 0;
                let count = 0;
                for (let i: number = this._data.level; i < FuJiangLvProxy.Ins.maxLv; i++) {
                    let nnn = parseInt(System_RefreshTimeProxy.Ins.getVal(94));
                    if (nnn == 1) {
                        if (i >= MainModel.Ins.mRoleData.lv) {
                            break;
                        }
                    }
                    let cc = FuJiangLvProxy.Ins.getCfgByLv(i);
                    count += parseInt(cc.f_upgradecost.split("-")[1]);
                    if (val >= count) {
                        this._lvNum++;
                    } else {
                        break;
                    }
                }
            } else {
                let n = FuJiangModel.Ins.getShowLv(this._data.level);
                if (n) {
                    this._lvType = 1;
                    this._ui.lab_num.text = n + "";
                    this._ui.lab.text = "升十级";
                    DotManager.addDot(this._ui.tab1, 15, -10);
                    DotManager.addDot(this._ui.btn_lv, 15, -10);
                } else {
                    this._lvType = 0;
                    this._ui.lab_num.text = cfg.f_upgradecost.split("-")[1];
                    this._ui.lab.text = "升级";
                    let val = MainModel.Ins.mRoleData.getVal(ECellType.FuJiangLv);
                    if (val < parseInt(cfg.f_upgradecost.split("-")[1])) {
                        this._ui.lab_num.color = "#D02525";
                    }
                }
            }
        }

        let cCfg = FuJiangListProxy.Ins.getCfgById(this._data.cheifId);
        if(this._data.pos){
            this._ui.spp1.visible = true;
            this._ui.spp2.visible = false;
            this._ui.list4.array = this._data.attrs;
            this._ui.list5.array = cCfg.f_specialattrinit.split("|");
        }else{
            this._ui.spp1.visible = false;
            this._ui.spp2.visible = true;
            this._ui.list6.array = cCfg.f_inherit.split("|");
            this._ui.list7.array = cCfg.f_specialattrinit.split("|");
        }
        
    }

    private _lvNum:number;
    private onBtnLVClick(){
        if(this._data){
            let req:CheifUpgrade_req = new CheifUpgrade_req;
            req.cheifId = this._data.cheifId;
            req.type = this._lvType;
            if(t_Platform.Ins.isOneLvUp){
                req.cnt = this._lvNum;
            }
            SocketMgr.Ins.SendMessageBin(req);
            XianShiLiBaoModel.Ins.sendCmd(XianShiLiBaoType.Fujing);
        }
    }

    //*************************************************************装备 *************************************/
    private onRenderHandler1(item:FuJiangItem3){
        item.setData(item.dataSource);
    }

    private updataZBView(){
        let arr = FuJiangEquipSortProxy.Ins.List;
        let array = [];
        for(let i:number=0;i<arr.length;i++){
            let vo = this._data.equips.find(ele => ele.partId === arr[i].f_Equipmentsort);
            let obj:any = {};
            obj.id = this._data.cheifId;
            obj.data = vo;
            array.push(obj);
        }
        this._ui.list1.array = array;
    }

    private onBtnYJSJClick(){
        if(this._data){
            let req:CheifEquipUp_req = new CheifEquipUp_req;
            req.cheifId = this._data.cheifId;
            req.partId = 0;
            req.type = 0;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private onBtnYJCSClick(){
        if(this._data){
            let star:number = 1;
            let lv:number = 1;
            for(let i:number=0;i<this._data.equips.length;i++){
                star = Math.max(star,this._data.equips[i].equipStar);
                lv = Math.max(lv,this._data.equips[i].equipLevel);
            }
            if(star == 1 && lv == 1){
                E.ViewMgr.ShowMidError("已是最低等级");
                return;
            }
            E.ViewMgr.Open(EViewType.FuJiangCZ,null,[this._data,1]);
        }
    }

    //************************************************************* 升星 *************************************/
    private onBtnAddClick(){
        E.ViewMgr.Open(EViewType.FuJiangChouKa);
    }

    private onBtnYssxClick(){
        if(!this._data){
            return;
        }
        let cfg = FuJiangListProxy.Ins.getCfgById(this._data.cheifId);
        let starCfg = FuJiangStarProxy.Ins.getCfgByStar(this._data.star);
        if(!MainModel.Ins.isItemEnough(cfg.f_piecesid,starCfg.f_upstarcost_new,true)){
            return;
        }
        FuJiangModel.Ins.oldStar = this._data.star;
        FuJiangModel.Ins.oldAllStar = FuJiangModel.Ins.getAllStarNum();
        let req:CheifStarUp_req = new CheifStarUp_req;
        req.cheifId = this._data.cheifId;
        req.num = 1;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onRenderHandler2(item:ui.views.fujiang.ui_fujiangAttrItem1UI){
        let id = parseInt(item.dataSource.id);
        let val = parseInt(item.dataSource.value);
        item.tf1.text = MainModel.Ins.getAttrNameIdByID(id) + ":";
        item.valTf.text = "+" + attrConvert(id,val);
    }

    private updataStarView() {
        this._ui.lab_snum.text = "x" + this._data.star;
        let nStarCfg = FuJiangStarProxy.Ins.getCfgByStar(this._data.star + 1);
        if (nStarCfg) {
            this._ui.sp_srat.visible = true;
            this._ui.lab_maxstar.visible = false;
            this._ui.img_xx.x = 144;
            let starCfg = FuJiangStarProxy.Ins.getCfgByStar(this._data.star);
            let cfg = FuJiangListProxy.Ins.getCfgById(this._data.cheifId);
            let val = MainModel.Ins.mRoleData.getVal(cfg.f_piecesid);
            this._ui.lab_snum1.text = "x" + nStarCfg.f_starid;
            let arr = [];
            for(let i:number=0;i<FuJiangStarValueProxy.Ins.List.length;i++){
                let arrid = FuJiangStarValueProxy.Ins.List[i].f_attrid;
                let val = FuJiangModel.Ins.getStarAttr(this._data.cheifId,arrid,this._data.level,this._data.star);
                let val1 = FuJiangModel.Ins.getStarAttr(this._data.cheifId,arrid,this._data.level,nStarCfg.f_starid);
                let data:stEquipAttr = new stEquipAttr;
                data.id = arrid;
                data.value = val1 - val;
                arr.push(data);
            }
            this._ui.list2.array = arr;

            this._ui.img_qua1.skin = FuJiangListProxy.Ins.getQuaSkin(cfg.f_cheifQuality);
            // this._ui.img_qua2.skin = FuJiangListProxy.Ins.getQuaSkin1(cfg.f_cheifQuality);
            this._ui.img_icon.skin = IconUtils.getIconByCfgId(cfg.f_piecesid);
            this._ui.lab_spname.text = IconUtils.getNameByID(cfg.f_piecesid);
            this._ui.lab_pro.text = val + "/" + starCfg.f_upstarcost_new;
            let s = val / starCfg.f_upstarcost_new;
            if(s >= 1){
                s = 1;
            }
            this._ui.pro.width = s * 209;

            if(starCfg.f_isupstage_new){
                this._ui.lab_starName.text = "升阶";
            }else{
                this._ui.lab_starName.text = "升星";
            }
        } else {
            this._ui.sp_srat.visible = false;
            this._ui.lab_maxstar.visible = true;
            this._ui.img_xx.x = 304;
        }

        if(FuJiangModel.Ins.isStarRedTip(this._data.cheifId,this._data.star)){
            DotManager.addDot(this._ui.btn_yssx,15,-10);
            DotManager.addDot(this._ui.tab3,15,-10);
        }else{
            DotManager.removeDot(this._ui.btn_yssx);
            DotManager.removeDot(this._ui.tab3);
        }
    }

    //************************************************************* 技能 *************************************/
    private onRenderHandler(item:FuJiangItem7,index:number){
        item.setData(index + 1,this._data,item.dataSource);
    }

    private updataSkillView(){
        let cfg = FuJiangSkillProxy.Ins.getCfgById(this._data.cheifId);
        let arr1 = cfg.f_starpoint.split("|");
        let index;
        for (let i: number = 0; i < arr1.length; i++) {
            let arr2 = arr1[i].split("-");
            if (this._data.star >= parseInt(arr2[0]) && this._data.star <= parseInt(arr2[1])) {
                index = i;
                break;
            }
        }

        let array = [];
        for (let i: number = 1; i < 5; i++) {
            let arr = cfg["f_clientskill" + i].split("|");
            if(parseInt(arr[index]) > 0){
                array.push(parseInt(arr[index]));
            }else{
                for(let j:number=0;j<arr.length;j++){
                    if(parseInt(arr[j]) > 0){
                        array.push(parseInt(arr[j]));
                        break;
                    }
                }
            }
        }
        this._ui.list.array = array;
    }

    //************************************************************* 皮肤 *************************************/
    private onRenderHandler10(item:FuJiangItem10,index:number){
        let id = parseInt(item.dataSource);
        item.setData(id,this._data.cheifId,index,this._ui.list_pf.selectedIndex);

        if(index == this._ui.list_pf.selectedIndex){
            let data:Configs.t_Chief_Skin_List_dat = FuJiangSkinProxy.Ins.getCfgById(id);
            let cfg = FuJiangModel.Ins.getFuJiangCfgById(this._data.cheifId);
            if(cfg.skinId == data.f_skinid){
                this._ui.btn_pf.visible = false;
                this._ui.lab_pf.visible = true;
            }else{
                this._ui.lab_pf.visible = false;
                this._ui.btn_pf.visible = true;
                if(cfg.skinIds.indexOf(data.f_skinid) != -1){
                    this._ui.btn_pf.disabled = false;
                }else{
                    this._ui.btn_pf.disabled = true;
                }
            }
            let skin: stSkin = FuJiangModel.Ins.getFuJiangSkin(1,data.f_skinid);
            if (this._avatar) {
                this._avatar.mSkin = skin;
            }
        }
    }

    public updataSkinView(){
        let cfg = FuJiangListProxy.Ins.getCfgById(this._data.cheifId);
        this._ui.list_pf.array = cfg.f_chiefskin.split("|");
    }

    private onBtnPFClick(){
        let data:Configs.t_Chief_Skin_List_dat = FuJiangSkinProxy.Ins.getCfgById(parseInt(this._ui.list_pf.selectedItem));
        if(data){
            let req:CheifChangeSkin_req = new CheifChangeSkin_req;
            req.cheifId = this._data.cheifId;
            req.skinId = data.f_skinid;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private onBtnCSClick(){
        if(this._data){
            let flag = false;
            for(let i:number=0;i<this._data.skills.length;i++){
                if(this._data.skills[i].skillLevel > 1){
                    flag = true;
                    break;
                }
            }
            if(!flag){
                E.ViewMgr.ShowMidError("没有技能可以重生");
                return;
            }
            E.ViewMgr.Open(EViewType.FuJiangCZ,null,[this._data,2]);
        }
    }

    private onBtnSZClick(){
        if (this._type == 1) {//主战下阵
            let req: ChiefIntoBattle_req = new ChiefIntoBattle_req;
            req.type = 0;
            req.pos = 0;
            req.isChief = this._data.isChief;
            req.cheifId = this._data.cheifId;
            SocketMgr.Ins.SendMessageBin(req);
        } else if (this._type == 2) {//助战下阵
            let req: ChiefAssist_req = new ChiefAssist_req;
            req.assistId = 0;
            req.cheifId = this._data.cheifId;
            SocketMgr.Ins.SendMessageBin(req);
        } else {
            let index1 = FuJiangModel.Ins.getSZPos();
            if (index1) {//主战上阵
                let req: ChiefIntoBattle_req = new ChiefIntoBattle_req;
                req.type = 1;
                req.pos = index1;
                req.isChief = this._data.isChief;
                req.cheifId = this._data.cheifId;
                SocketMgr.Ins.SendMessageBin(req);
            } else {
                let index2 = this.getzzIndex();
                if(index2){//助战上阵
                    let req:ChiefAssist_req = new ChiefAssist_req;
                    req.assistId = index2;
                    req.cheifId = this._data.cheifId;
                    SocketMgr.Ins.SendMessageBin(req);
                }else{
                    E.ViewMgr.ShowMidError("上阵人数已满");
                }
            }
        }
    }

    private getzzIndex(){
        let arr = FuJiangSupportInheritProxy.Ins.List;
        for(let i:number = 0;i<arr.length;i++){
            let data = FuJiangModel.Ins.getFuJiangByAssid(arr[i].f_id);
            if(!data){
                return arr[i].f_id;
            }
        }
        return 0;
    }
}