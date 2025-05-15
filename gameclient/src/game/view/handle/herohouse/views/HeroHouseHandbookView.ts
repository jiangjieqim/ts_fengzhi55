import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { TabCommonCtl } from "../../../../../frame/view/TabCommonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { GymBond_req } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import {DotManager} from "../../common/DotManager";
import { MainModel } from "../../main/model/MainModel";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { HeroHouseModel } from "../HeroHouseModel";
import { EGymHeroFetterStatus } from "../model/EGymType";
import { GymEvent } from "../model/GymEvent";
import { t_Gym_NPC_Bond, t_Gym_NPC_List, t_Gym_NPC_Quality } from "../model/GymProxy";
/**武将头像渲染视图 */
class HeroCellCtl{
    private cfg:Configs.t_Gym_NPC_List_dat;
    private skin:ui.views.hero_house.ui_hero_house_handbook_cellUI;
    constructor(skin:ui.views.hero_house.ui_hero_house_handbook_cellUI){
        this.skin = skin;
        skin.on(Laya.Event.CLICK,this,this.onClickHandler);
    }
    private onClickHandler(){
        E.ViewMgr.Open(EViewType.HeroHouseShow,null,this.cfg);
    }

    public set visible(v:boolean){
        this.skin.visible = v;
    }

    public set heroId(id:number){
        let name = ""
        if(E.Debug){
            name = id.toString();
        }
        let heroCfg:Configs.t_Gym_NPC_List_dat = t_Gym_NPC_List.Ins.getByHeroID(id);
        this.cfg = heroCfg;
        this.skin.icon.skin = HeroHouseModel.Ins.getHeroIcon(heroCfg.f_iconid);
        this.skin.nameTf.text  = heroCfg.f_name + name;
        this.skin.nameTf.color = HeroHouseModel.Ins.getColorByHeroID(heroCfg.f_HeroID);
        if(HeroHouseModel.Ins.isHeroOpen(id)){
            this.skin.lockimg.visible = false;
        }else{
            this.skin.lockimg.visible = true;
        }
    }
}

/**名将录item */
class HeroHouseHandbookItemView extends ui.views.hero_house.ui_hero_house_handbook_itemUI{
    private cellList:HeroCellCtl[] = [];
    private cfg:Configs.t_Gym_NPC_Bond_dat;
    private activityCtl:ButtonCtl;
    constructor(){
        super();
        for(let i = 0;i < 5;i++){
            this.cellList.push(new HeroCellCtl(this[`a${i}`]));
        }
        this.activityCtl = ButtonCtl.CreateBtn(this.activityBtn,this,this.onActivityHandler);
        this.on(Laya.Event.DISPLAY,this,this.onDisplay);
        this.on(Laya.Event.UNDISPLAY,this,this.onUnDisplay);

    }

    private onDisplay(){
        HeroHouseModel.Ins.on(GymEvent.BondUpadte,this,this.refresh);
    }

    private onUnDisplay(){
        HeroHouseModel.Ins.off(GymEvent.BondUpadte,this,this.refresh);
    }

    /**激活 */
    private onActivityHandler(){
        let req:GymBond_req = new GymBond_req();
        req.fid = this.cfg.f_id;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private buildAttr(l1:string[]){
        let s = "";
        for(let i = 0;i < l1.length;i++){
            let arr = l1[i].split(":");
            let id = parseInt(arr[0]);
            let val = parseInt(arr[1]);
            let v =  attrConvert(id,val);
            s += `${MainModel.Ins.getAttrNameIdByID(id)}${v} `;
        }
        return s;
    }

    public refresh(){
        let cfg:Configs.t_Gym_NPC_Bond_dat = this.dataSource;
        if(!cfg){
            return;
        }
        this.cfg = cfg;
        this.titleTf.text = cfg.f_BondName+"";
        this.titleTf.color = HeroHouseModel.Ins.getColorByQua(cfg.f_BondQuality);
        let arr = cfg.f_NpcIds.split("|");
        this.refreshHeroList(arr);
        this.lefttf1.text = this.buildAttr(cfg.f_bondAttr.split("|"));

        this.daishoujitf.visible = false;//待收集
        this.righttf1.visible = false;   //已激活
        this.activityCtl.visible = false;//激活按钮
        let status = HeroHouseModel.Ins.getFetterStatus(cfg.f_id);

        DotManager.removeDot(this);
        switch(status){
            case EGymHeroFetterStatus.CanActivied:
                this.activityCtl.visible = true;
                DotManager.addDot(this);
                break;
            case EGymHeroFetterStatus.Finished:
                this.righttf1.visible = true;
                break;
            case EGymHeroFetterStatus.WaitFind:
                this.daishoujitf.visible = true;
                break;
        }
        
    }

    private refreshHeroList(heroIdList:string[]){
        for(let i = 0;i < this.cellList.length;i++){
            let cell= this.cellList[i];
            let _heroId =  parseInt(heroIdList[i]);
            if(isNaN(_heroId)){
                cell.visible = false;
            }else{
                cell.visible = true;
                cell.heroId = _heroId;
            }
        }
    }
}


/**
 * 名将录
 */
export class HeroHouseHandbookView extends ViewBase {
    private _ui:ui.views.hero_house.ui_hero_house_handbookUI;
    private _tanCommon:TabCommonCtl = new TabCommonCtl();
    private model:HeroHouseModel;
    // private have:number = 0;
    // private total:number = 0;
    private _qua:number = 0;
    private quaList:number[] = [];
    // private cfgList:Configs.t_Gym_NPC_Bond_dat[];
    protected onAddLoadRes(): void { }
    protected onExit(): void { 
        HeroHouseModel.Ins.off(GymEvent.BondUpadte,this,this.onUpdateTop);
        HeroHouseModel.Ins.off(GymEvent.RedUpdate,this,this.onRedUpdate);
        // E.ViewMgr.Open(EViewType.HeroHouse);
    }
    protected mMask:boolean = true;
    protected onFirstInit(): void { 
        if(!this.UI){
            this.model = HeroHouseModel.Ins;
            this.UI = this._ui = new ui.views.hero_house.ui_hero_house_handbookUI();
            this._tanCommon.init(ui.views.hero_house.ui_hero_house_tab_itemUI,this._ui.tabCon,"ui_hero_house_tab_itemUI",this,this.onSelectHandler,this.itemTabHandler);
            this.bindClose(this._ui.close1);

            this._ui.list.itemRender = HeroHouseHandbookItemView;
            this._ui.list.renderHandler = new Laya.Handler(this,this.itemHandler);

            ButtonCtl.CreateBtn(this._ui.attrBtn,this,this.onAttrOpen);
        }
    }

    private onAttrOpen(){
        this.model.showAttr();
    }

    private itemHandler(item:HeroHouseHandbookItemView){
        item.refresh();
    }

    private onSelectHandler(index:number){
        let _qua = this.quaList[index];
        this._qua = _qua;
        let l1 = t_Gym_NPC_Bond.Ins.getListByQua(_qua);
        // this.cfgList = l1;
        this._ui.list.array = l1;
        this._ui.list.scrollTo(0);
        // this._ui.tf1.text =  t_Gym_NPC_Quality.Ins.getByQua(_qua).f_NPCQuality;
        // this._ui.tf1.color = HeroHouseModel.Ins.getColorByQua(_qua);
        // this._ui.tf1.text = "";

        // this.have = this.model.getBookOpenCount(_qua);
        // this.total = l1.length;
        this.onUpdateTop();
    }
    
    private itemTabHandler(tabSkin:ui.views.hero_house.ui_hero_house_tab_itemUI,index:number,sel:boolean,data:number){
        if(!sel){
            tabSkin.bg2.visible = true;
            tabSkin.bg1.visible = false;
            tabSkin.tf1.y = 10;
        }else{
            //选中
            tabSkin.bg2.visible = false;
            tabSkin.bg1.visible = true;
            tabSkin.tf1.y = 14;
        }
        let cfg:Configs.t_Gym_NPC_Quality_dat = t_Gym_NPC_Quality.Ins.getByQua(data);

        tabSkin.tf1.text = cfg.f_NPCQuality;//index.toString();
        tabSkin.tf1.color = `#${cfg.f_Color}`;
    
        if(HeroHouseModel.Ins.hasQuaHandBookRed(data)){
            DotManager.addDot(tabSkin);
        }else{
            DotManager.removeDot(tabSkin);
        }
    }

    private onUpdateTop(){
        let l1 = t_Gym_NPC_Bond.Ins.getListByQua(this._qua);
        let have = this.model.getBookOpenCount(this._qua);
        this._ui.tf3.text = E.LangMgr.getLang("ShoujiJindu",have,l1.length);
    }
    private onRedUpdate(){
        this._tanCommon.udpateView();
        this._ui.list.refresh();
    }
    protected onInit(): void {
        // E.ViewMgr.Close(EViewType.HeroHouse);
        MainModel.Ins.mainMask = true;
        HeroHouseModel.Ins.on(GymEvent.RedUpdate,this,this.onRedUpdate);
        HeroHouseModel.Ins.on(GymEvent.BondUpadte,this,this.onUpdateTop);
        this.quaList = t_Gym_NPC_Bond.Ins.quaList;
        this._tanCommon.refresh(this.quaList,0);
    }
}