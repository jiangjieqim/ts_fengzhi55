import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { TabControl } from "../../../../../frame/view/TabControl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { AvatarFactory } from "../../avatar/AvatarFactory";
import { AvatarMonsterView } from "../../avatar/AvatarMonsterView";
import { EAvatarDir } from "../../avatar/AvatarView";
import { EAvatarAnim } from "../../avatar/vos/EAvatarAnim";
import { FuJiangStarCtl } from "../../fujiang/view/ctl/FuJiangStarCtl";
import { EquipmentQualityProxy } from "../../main/model/EquipmentProxy";
import { MainModel } from "../../main/model/MainModel";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { LingChongModel } from "../model/LingChongModel";
import { PetQualityProxy, PetSkillClientProxy } from "../proxy/LingChongProxy";
import { LingChongTJItem } from "./item/LingChongTJItem";

export class LingChongTJView extends ViewBase{
    private _ui:ui.views.lingchong.ui_lingchongTJViewUI;
    protected mMask = true;
    protected mMainSnapshot = true;

    private _avatar:AvatarMonsterView;

    private tabsCtl:TabControl;

    private _starCtl:FuJiangStarCtl;

    protected onAddLoadRes() {
        this.addAtlas("lingchong.atlas");
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.lingchong.ui_lingchongTJViewUI;
            this.bindClose(this._ui.btn_close);

            let tabsSkin = [];
            for(let i:number=0;i<11;i++){
                this._ui["tab" + i].img.skin = `remote/lingchong/tj${i}.png`;
                tabsSkin.push(this._ui["tab" + i]);
            }
            this.tabsCtl  = new TabControl();
            this.tabsCtl.init(tabsSkin, new Laya.Handler(this,this.onTabSelectHandler), new Laya.Handler(this, this.itemTabHandler));

            this._ui.list_lc.itemRender = LingChongTJItem;
            this._ui.list_lc.renderHandler = new Laya.Handler(this,this.onRenderHandller);
            this._ui.list_lc.selectEnable = true;

            this._ui.list_attr.itemRender = ui.views.lingchong.ui_lingchongAttrItemUI;
            this._ui.list_attr.renderHandler = new Laya.Handler(this,this.onRenderHandller1);

            this._starCtl = new FuJiangStarCtl(this._ui.star);

            ButtonCtl.Create(this._ui.btn_tj,new Laya.Handler(this,this.onBtnTJClick));
        }
    }

    private onBtnTJClick(){
        E.ViewMgr.Open(EViewType.LingChongXMTJView);
    }

    private itemTabHandler(tabSkin, index: number, sel: boolean, data){
        let skin: ui.views.lingchong.ui_tab1UI = tabSkin;
        if (sel) {
            skin.img2.visible = true;
        } else {
            skin.img2.visible = false;
        }
    }

    private onTabSelectHandler(v:number){
        if(v == -1)return;
        let arr = LingChongModel.Ins.getPetListByType(v);
        arr = arr.sort(this.onSort);
        this._ui.list_lc.array = arr;
        this._ui.list_lc.selectedIndex = 0;
    }

    private onSort(a:Configs.t_Pet_List_dat,b:Configs.t_Pet_List_dat){
        if(a.f_petquality > b.f_petquality){
            return -1;
        }else if(a.f_petquality < b.f_petquality){
            return 1;
        }else{
            if(a.f_petid > b.f_petid){
                return 1;
            }else if(a.f_petid < b.f_petid){
                return -1;
            }else{
                return 0;
            }
        }
    }

    private onRenderHandller(item:LingChongTJItem,index:number){
        let bo:boolean;
        if(this._ui.list_lc.selectedIndex == index){
            bo = true;
            this.updataView();
        }else{
            bo = false;
        }
        item.setData(item.dataSource,bo);
    }

    private onRenderHandller1(item:ui.views.lingchong.ui_lingchongAttrItemUI){
        let id = parseInt(item.dataSource.split(":")[0]);
        let val = parseInt(item.dataSource.split(":")[1]);
        item.tf1.text = MainModel.Ins.getAttrNameIdByID(id) + ":";
        item.valTf.text = attrConvert(id,val);
    }

    protected onInit(): void {
        this._petanimid = 0;
        this.tabsCtl.selectIndex = 0;
    } 

    protected onExit(): void {
        this.tabsCtl.selectIndex = -1;
        if(this._avatar){
            this._avatar.dispose();
            this._avatar = null;
        }
    }

    private updataView(){
        this.creatAvatar();
        let cfg:Configs.t_Pet_List_dat = this._ui.list_lc.selectedItem;
        let qCfg = PetQualityProxy.Ins.getCfgById(cfg.f_petquality);
        this._ui.lab_name.text = cfg.f_petname;
        this._ui.lab_name.color = "#" + EquipmentQualityProxy.Ins.getByQua(cfg.f_petquality).f_Color;
        this._ui.lab_lv.text = "Lv." + qCfg.f_maxlevel;
        this._starCtl.setStar(qCfg.f_maxstar);
        this._ui.valTf1.text = `血脉天赋数量上限${cfg.f_talentslot}个`;
        this._ui.tab.img.skin = `remote/lingchong/tj${cfg.f_pettype}.png`;
        this._ui.tab.img2.visible = false;

        let sCfg = PetSkillClientProxy.Ins.getCfgById(cfg.f_petskillid);
        this._ui.item_jn.lab.text = sCfg.f_skillname;
        let lv = LingChongModel.Ins.getSkillLv(qCfg.f_maxstar);
        this._ui.item_jn.lab_lv.text = "Lv." + lv;
        this._ui.lab_jn.text = LingChongModel.Ins.getSkillDec(cfg.f_petskillid,lv);

        this._ui.list_attr.array = LingChongModel.Ins.getAttrArr(cfg.f_petid,qCfg.f_maxlevel,qCfg.f_maxstar);
    }

    private _petanimid:number;
    private creatAvatar(){
        let cfg = this._ui.list_lc.selectedItem;
        if(this._petanimid == cfg.f_petanimid){
            return;
        }
        if(this._avatar){
            this._avatar.dispose();
            this._avatar = null;
        }
        if(cfg){
            this._avatar = AvatarFactory.createPet(cfg.f_petid);
            this._petanimid = cfg.f_petanimid;
            this._avatar.play(EAvatarAnim.HandBookStand);
            this._avatar.dir = EAvatarDir.Left;
            this._ui.avatr.addChild(this._avatar);
        }
    }
}