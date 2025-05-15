import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EMsgBoxType, EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { GymSwicthEquip_req, stEquipAttr } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import { HeroHouseModel } from "../HeroHouseModel";
import { GymSlotViewVo } from "../model/GymInnerRoomSlotVo";
import { GymInviteVo } from "../model/GymInviteVo";
import { t_Gym_NPC_Type } from "../model/GymProxy";

interface IHeroItemCtlSkin{
     tf1:Laya.Label;
     tf2:Laya.Label;
     tf3:Laya.Label;
     tf4:Laya.Label;
     img:Laya.Image;
     nametf:Laya.Label;
}

class HeroItemCtl{
    private tf1:Laya.Label;
    private tf2:Laya.Label;
    private tf3:Laya.Label;
    private tf4:Laya.Label;
    private img:Laya.Image;
    private nametf:Laya.Label;
    constructor(skin:IHeroItemCtlSkin){
        this.tf1 = skin.tf1;
        this.tf2 = skin.tf2;
        this.tf3 = skin.tf3;
        this.tf4 = skin.tf4;
        this.nametf = skin.nametf;
        this.img = skin.img;
    }
    private updateHero(heroCfg:Configs.t_Gym_NPC_List_dat){
        this.tf1.text = "地区:" + HeroHouseModel.Ins.getRegion(heroCfg.f_HeroID) + '';
    }
    public refresh(heroCfg:Configs.t_Gym_NPC_List_dat,attrs:stEquipAttr[],degree:number){
        if(heroCfg){
            this.updateHero(heroCfg);
        }
        // 完整度
        this.tf2.text = HeroHouseModel.Ins.getDegreeDesc(degree);
        HeroHouseModel.Ins.refreshAttrView([this.tf3, this.tf4],this.img,this.nametf,attrs,heroCfg.f_HeroID);
    }
}

/**神识的item */
class HeroSwicthItem extends ui.views.hero_house.ui_hero_house_switch_equip_itemUI{
    private vo:GymSlotViewVo;
    private ctl:HeroItemCtl;
    private heroCfg:Configs.t_Gym_NPC_List_dat;
    constructor(){
        super();
        this.on(Laya.Event.CLICK, this, this.onClickHandler);
        this.emptyTf.visible = false;
        this.sel.visible = false;
        this.ctl = new HeroItemCtl(this);
    }

    private onClickHandler() {
        if (!this.vo.locked) {
            this.vo.mSelect = true;
            let view:HeroHouseSwitchView = E.ViewMgr.Get(EViewType.HeroHouseSwicth) as HeroHouseSwitchView;
            view.refreshList();
            if(!this.vo.isEmpty){
                E.ViewMgr.ShowMsgBox(EMsgBoxType.OkOrCancel, E.getLang("HeroAsk", this.heroCfg.f_name),new Laya.Handler(this,this.okHandler));
            }
        }
    }

    private okHandler(){
        let view:HeroHouseSwitchView = E.ViewMgr.Get(EViewType.HeroHouseSwicth) as HeroHouseSwitchView;

        let req:GymSwicthEquip_req = new GymSwicthEquip_req();
        req.oldUid = this.vo.equipVo.uid;
        req.newUid = view.curData.uid;//新的uid
        SocketMgr.Ins.SendMessageBin(req);

        // if(E.ViewMgr.IsOpen(EViewType.HeroHouseSwicth)){
        E.ViewMgr.Close(EViewType.HeroHouseSwicth);
        // }
    }
    public refresh() {
        let vo: GymSlotViewVo = this.dataSource;
        this.vo = vo;
        this.emptyTf.visible = false;
        this.sel.visible = vo.mSelect;
        if (vo.locked) {
            //锁定状态
            this.lockimg.visible = true;
            this.unlock.visible = false;
            let lv = HeroHouseModel.Ins.convertShowLv(vo.unlockLevel);
            this.lockTfDesc.text = E.getLang("ss01",lv);//`神识Lv.${}解锁`;
        } else {

            if (vo.isEmpty) {
                //无装备
                this.lockimg.visible = false;
                this.unlock.visible = false;
                this.emptyTf.visible = true;

            } else {
                //有装备
                this.lockimg.visible = false;
                this.unlock.visible = true;

                let heroCfg = vo.heroCfg;
                this.heroCfg = heroCfg;

                this.ctl.refresh(heroCfg,vo.attrs,vo.degree);

                if(E.Debug){
                    this.nametf.text+=" uid:"+vo.equipVo.uid;
                }
            }
        }
    }
}

class MySelfHeroSwicthItemCtl{
    private ctl:HeroItemCtl;
    skin:ui.views.hero_house.ui_hero_house_switch_equip_itemUI;
    constructor(skin:ui.views.hero_house.ui_hero_house_switch_equip_itemUI){ 
        this.skin = skin;
        skin.lockimg.visible = false;
        skin.sel.visible = false;
        skin.emptyTf.visible = false;
        this.ctl= new HeroItemCtl(skin);
    }

    public refresh(_data:GymInviteVo){

        this.ctl.refresh(_data.heroCfg,_data.attrlist,_data.degree);
        if(E.Debug){
            this.skin.nametf.text+=" uid:"+_data.uid;
        }
    }
}

/**名将录 替换界面 神识替换界面*/
export class HeroHouseSwitchView extends ViewBase {
    private _ui: ui.views.hero_house.ui_hero_house_switch_equipUI;
    private _model: HeroHouseModel;
    private _mData: GymInviteVo;
    private _selfView:MySelfHeroSwicthItemCtl;
    protected mMask: boolean = true;

    public get curData():GymInviteVo{
        return this._mData;
    }

    protected onAddLoadRes(): void {
    }
    protected onExit(): void {
    }
    protected onFirstInit(): void {
        if (!this.UI) {
            this._model = HeroHouseModel.Ins;
            this.UI = this._ui = new ui.views.hero_house.ui_hero_house_switch_equipUI();
            this._selfView = new MySelfHeroSwicthItemCtl(this._ui.newget);
            this._ui.list1.renderHandler = new Laya.Handler(this, this.onRenderHandler);
            this._ui.list1.itemRender = HeroSwicthItem;
        }
    }

    protected onCloseHandler(){
        super.onCloseHandler();
        this._model.openPop();
    }

    private onRenderHandler(cell:HeroSwicthItem){
        cell.refresh();
    }

    public refreshList(){
        this._ui.list1.refresh();
    }

    protected onInit(): void {
        this._mData = this.Data;
        let _heroCfg = this._mData.heroCfg;
        this._selfView.refresh(this._mData);
        let count = this._model.getUnlockCount(_heroCfg.f_HeroType);

        let equipList = this._model.getEquipListByType(_heroCfg.f_HeroType);

        let _typeCfg: Configs.t_Gym_NPC_Type_dat = t_Gym_NPC_Type.Ins.getByType(_heroCfg.f_HeroType);
        this._ui.tf1.text = "类别:" + _typeCfg.f_Typename;
        this._ui.tf2.text = "数量:" + equipList.length + "/" + count;// 已经放置的/已解锁的格子数

        this._ui.list1.array = this._model.buildSlotViewListVo(_heroCfg.f_HeroType);
        this._ui.list1.scrollTo(0); 
    }

    // public get newUid(){
    //     return this._mData.uid;
    // }
}