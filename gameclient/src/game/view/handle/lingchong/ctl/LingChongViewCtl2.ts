import { LogSys } from "../../../../../frame/log/LogSys";
import { BaseModel } from "../../../../../frame/util/ctl/BaseModel";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { CheckBoxCtl, ICheckBoxSkin } from "../../../../../frame/view/CheckBoxCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EPageType, EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { MSGID } from "../../../../network/MSGID";
import { PetFusion_req, PetFusion_revc, stPet } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { AvatarFactory } from "../../avatar/AvatarFactory";
import { AvatarView } from "../../avatar/AvatarView";
import { SimpleEffect } from "../../avatar/SimpleEffect";
import { FuJiangStarCtl } from "../../fujiang/view/ctl/FuJiangStarCtl";
import { System_RefreshTimeProxy } from "../../huodong/model/ActivityProxy";
import { ESystemRefreshTime } from "../../huodong/model/enum/ESystemRefreshTime";
import { VipModel, VipType } from "../../huodong/model/VipModel";
import { IListData, SelectListCtl } from "../../main/ctl/SelectListCtl";
import { ValCtl } from "../../main/ctl/ValLisCtl";
import { EquipmentQualityProxy } from "../../main/model/EquipmentProxy";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { EQuickMsg } from "../../main/model/QuickMsgVo";
import { QuickQua } from "../../main/views/QuickSettingView";
import { ECellType } from "../../main/vos/ECellType";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { EClientType } from "../../sdk/ClientType";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { LingChongModel } from "../model/LingChongModel";
// import { ZuoQiModel } from "../../zuoqi/ZuoqiModel";
import { PetListProxy, PetQualityProxy, PetSkillClientProxy, t_Pet_Fusion_Rate } from "../proxy/LingChongProxy";
/**融合宠物数据 */
// class Rh_PetVo{
// pet:stPet;
// selected:boolean;
// }

export class LingChongRH_Model extends BaseModel{
    /**选择的一键品质状态 */
    quaSel:boolean;
    /**延迟的时间(毫秒) */
    public DEALY_TIME:number = 1000;
    /**融合成功 */
    public static EVENT_UPDATE_FUSION:string = "EVENT_SUCCEED_FUSION";
    public selIdList:number[] = [];
    private static _ins:LingChongRH_Model;
    public view:LingChongViewCtl2;
    public autoView:LingChongAutoHCTip;
    public isAuto:boolean = false;;
    public static get Ins(){
        if(!this._ins){
            this._ins = new LingChongRH_Model();
        }
        return this._ins;
    }
    public getList():IListData[]{
        let arr:IListData[] = [];

        let l = PetQualityProxy.Ins.List;
        let vo = new QuickQua();
        vo.f_id = 0;
        vo.txt = E.getLang("all");
        vo.color = "ffffff";
        arr.push(vo);
        for (let i = 0; i < l.length-1; i++) {
            let cfg: Configs.t_Pet_Quality_dat = l[i];
            let vo = new QuickQua();
            vo.f_id = cfg.f_id;
            vo.color = EquipmentQualityProxy.Ins.getByQua(cfg.f_quality).f_Color;
            vo.txt = cfg.f_qualityname;
            arr.push(vo);
        }
        return arr;
    }
    /**有属性的宠物 不可以融合 */
    public needCheckRh(pet:stPet) {
        // if (!this._data) return;
        // if (_selectList.length == 0) return;
        let flag = false;
        // for (let i: number = 0; i < _selectList.length; i++) {
        if (pet.petLevel) {
            flag = true;
        }
        if (pet.petStar) {
            flag = true;
        }
        let num = 0;
        let talents = pet.petTalents;
        for (let j: number = 0; j < talents.length; j++) {
            num += talents[j].talentLevel;
        }
        if (num > talents.length) {
            flag = true;
        }
        // }
        // if (flag) {
            // MainModel.Ins.queryMsg("选择灵宠已升级、觉醒或升星!升星后只返还部分养成素材,是否确认升星？", 0, 0, EQuickMsg.NULL, );
        // } else {
            // return true;
        // }
        return flag;
    }

    public getListSel():IListData[]{
        let arr:IListData[] = [];

        let l = PetQualityProxy.Ins.List;
        // let vo = new QuickQua();
        // vo.f_id = 0;
        // vo.txt = E.getLang("all");
        // vo.color = "ffffff";
        // arr.push(vo);
        for (let i = 0; i < l.length-1; i++) {
            let cfg: Configs.t_Pet_Quality_dat = l[i];
            let vo = new QuickQua();
            vo.f_id = cfg.f_id;
            vo.color = EquipmentQualityProxy.Ins.getByQua(cfg.f_quality).f_Color;
            vo.txt = cfg.f_qualityname + E.getLang("petDec6");
            arr.push(vo);
        }
        return arr;
    }
    public initMsg(): void{
        this.Reg(new LingChongSucceed(EViewType.LingChongRH_Succeed));//,ELayerType.alertLayer
        this.Reg(new LingChongAutoHCTip(EViewType.LingChongAutoRh));
        E.MsgMgr.AddMsg(MSGID.PetFusion_revc,this.onPetFusion_revc,this);

        // let arr:stPet[] = [];
        // for(let i = 0;i < 3;i++){
        //     let pet1 = new stPet();
        //     pet1.petId = i*10+1;
        //     pet1.petSerialNum = i + 1;
        //     pet1.petLevel = 2;
        //     pet1.petStar = i+1;
        //     pet1.petTalents = [];
        //     pet1.petTalentIdToDo = 0;
        //     pet1.onBattle = 1;
        //     arr.push(pet1);
        // }
        // let pet1 = new stPet();
        // pet1.petId = 1;
        // pet1.petSerialNum = 1000 + 1;
        // pet1.petLevel = 30;
        // pet1.petStar = 1;
        // pet1.petTalents = [];
        // pet1.petTalentIdToDo = 0;
        // pet1.onBattle = 1;
        // arr.push(pet1);
        // this.petList = arr;
        // PetFusion_revc
        if(Laya.Utils.getQueryString("fast") == "1"){
            this.DEALY_TIME=1;
        }
    }
    /**融合成功/失败 */
    private onPetFusion_revc(revc:PetFusion_revc) {
        let result:number = revc.result;
        // if(result){
            // let id = revc.petSerialNum;
            // let _petVo = this.petList.find(item=>item.petSerialNum == id);
            // if(_petVo){
                // E.ViewMgr.Open(EViewType.LingChongRH_Succeed,null,_petVo);
                // this.openSucceedResult(_petVo);
            // }
        // }else{
            //失败
            // E.ViewMgr.ShowMidError(E.getLang("petDec4"));
        // }

        if(result){
			E.ViewMgr.ShowMidOk(E.getLang("end_synthesis"));
        }
        this.openSucceedResult(revc);
        this.event(LingChongRH_Model.EVENT_UPDATE_FUSION,[result]);
    }

    private openSucceedResult(_Data:PetFusion_revc){
        if(this.quaSel){
            return;
        }
        let type = EViewType.LingChongRH_Succeed;
        if(E.ViewMgr.isOpenReg(type)){
            let view:LingChongSucceed = E.ViewMgr.Get(type) as LingChongSucceed;
            // view.refreshView(_Data);
            view.refreshView(_Data);
        }else{
            E.ViewMgr.Open(type,null,_Data);
        }
    }

    // private later() {
    //     this.view.refreshAuto();
    // }
    public get petList():stPet[]{
        return LingChongModel.Ins.petDataList || [];
    }
    public onInitCallBack(){
        // this.petList = [];
        this.quaSel = false;
        this.clearSelIds();
        this.isAuto = false;
    }
    public isSelect(id:number){
        return this.selIdList.indexOf(id) >=0;
    }
    public setSelect(id:number){
        let index:number = this.selIdList.indexOf(id);
        if(index == -1){
            this.selIdList.push(id);
        }
    }

    public canPushByQua(id:number){
        if(this.selIdList.length<=0){
            return true;
        }
        let useID = this.selIdList[this.setSelect.length-1];

        let cell = this.petList.find(item=>item.petSerialNum == useID);
        if(cell){
            // cell.petId
            let cfg = PetListProxy.Ins.getCfgById(cell.petId);
            let cell2 = this.petList.find(item=>item.petSerialNum == id);
            let cfg2 = PetListProxy.Ins.getCfgById(cell2.petId);
            return cfg.f_petquality == cfg2.f_petquality;
        }
    }
    
    public clearSelIds(){
        this.selIdList = [];
    }
    public delSelect(id:number){
        let index:number = this.selIdList.indexOf(id);
        if(index >=0){
            this.selIdList.splice(index,1);
        }
    }
}
/**恭喜获得 / 失败 */
class LingChongSucceed extends ViewBase {
    public PageType: EPageType = EPageType.None;
    private _ui:ui.views.lingchong.ui_lingchong_RH_succeedUI;
    private _vo:stPet;
    private model:LingChongRH_Model;
    private _petAvatar:AvatarView;
    protected onAddLoadRes(): void { }
    protected onExit(): void {
        this.disposeAvatar();
    }
    private congratulatEffect:SimpleEffect;

    protected onFirstInit(): void {
        if(!this.UI){
            this.model = LingChongRH_Model.Ins;
            this.UI = this._ui = new ui.views.lingchong.ui_lingchong_RH_succeedUI();
            this.mMask = true;
            this.mClickAnyAreaClose = true;
            this._ui.list1.itemRender = ui.views.lingchong.ui_lingchong_attr1UI;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onRenderHandler);
        }
    }
    private playCongratulatEffect(){
        if(!this.congratulatEffect){
            this.congratulatEffect = new SimpleEffect(this._ui.effcon,"o/spine/cardgongxi/cardgongxi");
        }
        this.congratulatEffect.play(0,false,this,this.onPlayEnd,null,true);
    }
    private onPlayEnd(){
        // this._ui.tf1.visible = true;
    }
    private onRenderHandler(item:ui.views.lingchong.ui_lingchong_attr1UI) {
        let data:string = item.dataSource;
        let arr = data.split(":");
        let id = parseInt(arr[0]);
        let val = parseInt(arr[1]);
        item.nameTf.text = MainModel.Ins.getAttrNameIdByID(id) + ":";
        item.valTf.text = attrConvert(id,val);
    }
    private disposeAvatar(){
        if(this._petAvatar){
            this._petAvatar.dispose();
            this._petAvatar = null;
        }
    }
    protected onInit(): void {
        this.refreshView(this.Data);
    }

    public refreshView(_serverData:PetFusion_revc){
        this._ui.succeed.visible = false;
        this._ui.fail.visible = false;
        // this.Data = _serverData;

        // if(this.Data instanceof stPet){
        if(_serverData.result){

            let id = _serverData.petSerialNums[0];
            let _petVo = this.model.petList.find(item=>item.petSerialNum == id);
            if(!_petVo){
                // E.ViewMgr.Open(EViewType.LingChongRH_Succeed,null,_petVo);
                // this.openSucceedResult(_petVo);
                return;
            }
            this._vo = _petVo;
            this._ui.succeed.visible = true;

            this.disposeAvatar();
            this._petAvatar = AvatarFactory.createPet(this._vo.petId);
            this._ui.ani.addChild(this._petAvatar);
            let cfg = PetListProxy.Ins.getCfgById(this._vo.petId);
            let sCfg = PetSkillClientProxy.Ins.getCfgById(cfg.f_petskillid);
            // let qCfg = PetQualityProxy.Ins.getCfgById(cfg.f_petquality);

            this._ui.skillTf.text = sCfg.f_skillname;
            // let lv = //LingChongModel.Ins.getSkillLv(qCfg.f_maxstar);
            let skillLv:number = LingChongModel.Ins.getSkillLv(this._vo.petStar)
            this._ui.lvTf.text = "Lv." + skillLv;// this._vo.petLevel;
            this._ui.nametf.text = cfg.f_petname;
            this._ui.nametf.color = "#"+EquipmentQualityProxy.Ins.getByQua(cfg.f_petquality).f_Color;
            // let arr = sCfg.f_initvalue.split("|");
            // let arr1 = sCfg.f_valuenum.split("|");
            // let arr2 = [];
            // for(let i:number=0;i<arr.length;i++){
            //     let num = (parseInt(arr[i]) + (parseInt(arr1[i]) * (skillLv-1))) / 100;
            //     arr2.push(num + "%");
            // }
            this._ui.desctf.text =LingChongModel.Ins.getSkillDec(cfg.f_petskillid,skillLv);
            //  StringUtil.format(sCfg.f_skillintro,arr2);

            this._ui.tf2.text = E.getLang("petDec3",cfg.f_talentslot);
            // `血脉天赋数量上限${cfg.f_talentslot}个`;

            let attrlist = LingChongModel.Ins.getAttrArr(cfg.f_petid,this._vo.petLevel,this._vo.petStar);
            this._ui.list1.array = attrlist;
            this.playCongratulatEffect();
 
            //展示奖励
            // let listdata = ItemViewFactory.convertCellList("3-2000|343-1");
            ItemViewFactory.renderItemSlots(this._ui.rewardCon,_serverData.rewardList);
        }else{
            this._ui.fail.visible = true;
            ItemViewFactory.renderItemSlots(this._ui.reward,_serverData.rewardList);
        }
        if(this.model.isAuto){
            Laya.timer.once(this.model.DEALY_TIME,this,this.onGoonHander);
        }
    }
    private onGoonHander(){
        this.model.view.refreshAuto();
    }
}
class LingChongRhItem extends ui.views.lingchong.ui_lingchongRHItemUI{
    private vo:stPet;
    private model:LingChongRH_Model;
    private ctl:LingChongItemCtl;

    constructor(){
        super();
        this.ctl = new LingChongItemCtl(this,ELingChongSkin.Normal);
        this.model = LingChongRH_Model.Ins;
    }

    refresh(){
        this.plus.visible = false;

        let vo:stPet = this.dataSource;
        this.vo = vo;
        this.ctl.refresh(vo);
    }
}
enum ELingChongSkin{
    Top = 0,
    Normal = 1
}
class LingChongItemCtl {
    public vo:stPet;
    private skin:ui.views.lingchong.ui_lingchongRHItemUI;
    private starCtl:FuJiangStarCtl;
    private skinType:ELingChongSkin;
    private model:LingChongRH_Model;
    constructor(skin:ui.views.lingchong.ui_lingchongRHItemUI,skinType:ELingChongSkin){
        this.model = LingChongRH_Model.Ins;
        this.skinType = skinType;
        this.skin = skin;
        this.starCtl = new FuJiangStarCtl(this.skin.star);
        this.skin.on(Laya.Event.CLICK,this,this.onClickHandler);
    }

    private onClickHandler(e:Laya.Event){
        if(this.skinType == ELingChongSkin.Normal){
            let sel = !this.model.isSelect(this.vo.petSerialNum);
            if(sel){
                if(this.model.view.selList.length >= 2){
                    return;
                }
            }
            if(sel){
                if(this.model.canPushByQua(this.vo.petSerialNum)){
                    this.model.setSelect(this.vo.petSerialNum);
                }else{
                    E.ViewMgr.ShowMidError(E.getLang("petDec10"));
                    return;
                }
            }
            else{
                this.model.delSelect(this.vo.petSerialNum);
            }
            this.model.view.refreshList(this.vo,sel);
        }else if(this.skinType == ELingChongSkin.Top){
            if(this.vo){
                this.model.delSelect(this.vo.petSerialNum);
                this.model.view.refreshList(this.vo,false);
            }
        }
    }

    refresh(vo:stPet){
        this.vo = vo;
        this.skin.mask1.visible = false;
        this.skin.gou1.visible = false;
        this.skin.lab_lv.visible = false;
        this.skin.icon.visible = false;
        this.skin.plus.visible = false;
        this.skin.starBg.visible = false;
        if(vo){
            this.skin.star.visible = true;
            if(vo.petStar){
                this.skin.starBg.visible = true;
            }
            this.starCtl.setStar(vo.petStar);
            // this.starCtl.centerX2();
            let cfg = PetListProxy.Ins.getCfgById(vo.petId);
            this.skin.icon.visible = true;
            this.skin.icon.skin = PetListProxy.Ins.getPetIconById(vo.petId);
            this.skin.quality.skin = IconUtils.getQuaIcon(cfg.f_petquality);
            this.skin.lab_lv.visible = true;
            this.skin.lab_lv.text = `Lv.${vo.petLevel}`;
            if (this.skinType == ELingChongSkin.Normal) {
                if (this.model.isSelect(this.vo.petSerialNum)) {
                    this.skin.mask1.visible = true;
                    this.skin.gou1.visible = true;
                }
            }
            this.skin.tab.visible = true;
            this.skin.tab.img.skin = `remote/lingchong/tj${cfg.f_pettype}.png`;
            this.skin.tab.img2.visible = false;
        }else{
            this.skin.plus.visible = true;
            this.skin.star.visible = false;
            this.skin.quality.skin = `remote/common/base/jiangli1.png`;
            this.skin.tab.visible = false;
        }
    }

    public refreshSkin(){
        if(this.vo && !this.model.isSelect(this.vo.petSerialNum)){
            this.refresh(null);
        }
    }
}
export class LingChongViewCtl2 {

    // private _isAuto:boolean = false;
    private readonly MAX_COUNT:number = 2;
    protected _ui: ui.views.lingchong.ui_lingchongRHViewUI;
    private topList:LingChongItemCtl[] = [];
    private selCtl: SelectListCtl = new SelectListCtl();
    private skin: ui.views.lingchong.ui_lingchongRHViewUI;
    private model:LingChongRH_Model;
    private tf:Laya.Label;
    private exchangeBtnCtl:ButtonCtl;
    constructor(skin: ui.views.lingchong.ui_lingchongRHViewUI) {
        this.skin = skin;       
        this.model = LingChongRH_Model.Ins;
        this.model.view = this;
        this._ui = skin;
        for(let i = 0;i < 2;i++){
            let item = new LingChongItemCtl(skin['item'+i],ELingChongSkin.Top);
            this.topList.push(item);
        }
        this._ui.on(Laya.Event.DISPLAY, this, this.onAdd);
        this._ui.on(Laya.Event.UNDISPLAY, this, this.onRemove);
        ButtonCtl.CreateBtn(skin.tujian,this,this.onTuJian);
        ButtonCtl.CreateBtn(skin.zidongrh,this,this.onAutoHandle);
        ButtonCtl.CreateBtn(skin.ronghe,this,this.onRongHe);
        ButtonCtl.CreateBtn(skin.btn_cq,this,this.onCuiQU);
        ValCtl.Create(this._ui.moneyTf,this._ui.moneyIcon,ECellType.LingChongSMJH);
        this.skin.descTf.text = E.getLang("petDec7");
        this.selCtl.dirBottom = true;
        this.selCtl.mCompose = true;

        this.selCtl.init(skin.qualist.sj0, skin.qualist.listarea0, skin.qualist.listcon0, skin.qualist.tf0,ui.views.lingchong.ui_lingchong_list_attrUI, this.model.getList());
        this.selCtl.selectHandler = new Laya.Handler(this,this.onQuaSelHandler);

        skin.list1.itemRender = LingChongRhItem;
        skin.list1.renderHandler = new Laya.Handler(this,this.itemHadnler);

        ButtonCtl.CreateBtn(skin.yijianfang,this,this.onYiJiangHandler);
        // if(debug){
        //     this.tf = new Laya.Label();
        //     this.tf.fontSize = 24;
        //     this.tf.color = "#ffffff";
        //     this.tf.stroke = 2;
        //     this.tf.strokeColor = "#000000";
        //     skin.addChild(this.tf);
        //     Laya.timer.frameLoop(1,this,this.onFrameLoop);
        // }

        this.exchangeBtnCtl = ButtonCtl.CreateBtn(this._ui.exchangeBtn,this,this.onExchangeEvt);

        if(System_RefreshTimeProxy.Ins.showpet){
            this.exchangeBtnCtl.visible = false;
        }

        if(initConfig.clienttype == EClientType.Discount){
            this._ui.moneyCon.visible = false;
        }
    }

    private onExchangeEvt(){
        E.ViewMgr.Open(EViewType.LingChongExchange);
    }
    // private onFrameLoop() {
    //     this.tf.text = "auto:"+this.model.isAuto;
    // }

    /**融合 */
    private onRongHe(){
        let ids:number[] = [];
        let needAlert:boolean;
        for (let i = 0; i < this.topList.length; i++) {
            let vo = this.topList[i].vo;
            if (vo) {
                ids.push(vo.petSerialNum);
                if (this.model.needCheckRh(vo)) {
                    needAlert = true;
                }
            }
        }
        if(needAlert){
            MainModel.Ins.queryMsg(E.getLang("petDec11"), 0, 0, EQuickMsg.NULL, new Laya.Handler(this, this.okRongHe,[ids]));
        }else{
            this.okRongHe(ids);
        }
    }

    private onCuiQU(){
        E.ViewMgr.Open(EViewType.LingChongCQView);
    }

    private okRongHe(ids:number[]){
        if(ids.length >= 2){
            this.model.quaSel = false;
            let req = new PetFusion_req();
            req.isAuto = this.model.isAuto ? 1 : 0;
            req.datalist = ids;
            SocketMgr.Ins.SendMessageBin(req);
        } 
    }
    private onAutoHandle(){
        this.clearRongHeUI();
        E.ViewMgr.Open(EViewType.LingChongAutoRh);
    }
    // private onSortHandler(a:stPet,b:stPet){
    //     let cfg1 = PetListProxy.Ins.getCfgById(a.petId);
    //     let cfg2 = PetListProxy.Ins.getCfgById(b.petId);
    //     if(cfg1.f_petquality < cfg2.f_petquality){
    //         return -1;
    //     }
    //     else if(cfg1.f_petquality > cfg2.f_petquality){
    //         return 1;
    //     }
    //     return 0;
    // }
    private action(resList:stPet[]) {
        let petMap = {};
        const maxCount:number = this.MAX_COUNT;
        for (let i = resList.length-1; i >= 0; i--) {
            let cell = resList[i];
            // cell.petId
            let cfg:Configs.t_Pet_List_dat = PetListProxy.Ins.getCfgById(cell.petId);
            if(!petMap[cfg.f_petquality]){
                petMap[cfg.f_petquality] = [];
            }
            petMap[cfg.f_petquality].push(cell);
        }
        let myArr:stPet[] = null;
        for(let qua in petMap){
            let petList:stPet[] = petMap[qua];
            if(petList.length >= maxCount){
                myArr = petList;
                break;
            }
        }
        return myArr;
    }

    /**检查当前品质下是否有可以融合的宠物 */
    public isCanRongHeByQua():boolean {
        let l = this.skin.list1.array;
        let resList: stPet[] = [];
        for (let i = 0; i < l.length; i++) {
            let vo: stPet = this.skin.list1.array[i];
            if (this.model.needCheckRh(vo)) {

            } else {
                let cfg: Configs.t_Pet_List_dat = PetListProxy.Ins.getCfgById(vo.petId);
                if (cfg.f_petquality <= this.model.autoView.quality) {
                    resList.push(vo);
                }
            }
        }
        if (resList.length < this.MAX_COUNT) {
            return false;
        }
        return true;
    }

    /**没有可以一键放入的宠物 */
    private err() {
        if(this.model.isAuto){
            E.ViewMgr.ShowMidError(E.getLang("petDec8"));
        }else{
            E.ViewMgr.ShowMidError(E.getLang("petDec2"));
        }
        this.setAuto(false);
    }
    /**一键放入 */
    private onYiJiangHandler(){
        let id1 = 0;
        let id2 = 0;
        if(this.topList[0].vo){
            id1 = this.topList[0].vo.petSerialNum;
        }
        if(this.topList[1].vo){
            id2 = this.topList[1].vo.petSerialNum;
        }
        let l = this.skin.list1.array;

        if(id1 == 0 && id2 == 0){
            //空
            let resList:stPet[] = [];
            for(let i = 0;i < l.length;i++){
                let vo:stPet = this.skin.list1.array[i];
                if (this.model.needCheckRh(vo)) {

                } else {
                    if (this.model.isAuto) {
                        let cfg: Configs.t_Pet_List_dat = PetListProxy.Ins.getCfgById(vo.petId);
                        if (cfg.f_petquality <= this.model.autoView.quality) {
                            resList.push(vo);
                        }
                    } else {
                        resList.push(vo);
                    }
                }
            }
            // resList = resList.sort(this.onSortHandler);
            if (resList.length < this.MAX_COUNT) {
                this.err();
            } else {
                let myArr = this.action(resList);
                if (myArr) {
                    for (let i = 0; i < this.MAX_COUNT; i++) {
                        let cell = myArr[i];
                        this.model.setSelect(cell.petSerialNum);
                        this.topList[i].refresh(cell);
                    }
                    this.skin.list1.refresh();
                } else {
                    this.err();
                }
            }
        }else if(id1!=0 && id2!=0){
            this.err();
        }else{
            //有一个位置
            let id=0;
            let index;
            if(id1){
                id = id1;
                index = 1;
            }
            if(id2){
                id = id2;
                index = 0;    
            }
            let petVo = this.model.petList.find(item=>item.petSerialNum == id);
            if(petVo){
                let cfg1 = PetListProxy.Ins.getCfgById(petVo.petId);
                let resList:stPet[] = [];
                for (let i = 0; i < l.length; i++) {
                    let vo: stPet = this.skin.list1.array[i];
                    if (this.model.needCheckRh(vo)) {

                    } else {
                        if (this.model.isSelect(vo.petSerialNum)) {

                        } else {
                            let cfg = PetListProxy.Ins.getCfgById(vo.petId);
                            if (cfg.f_petquality == cfg1.f_petquality) {
                                resList.push(vo);
                            }
                        }
                    }
                }
                if(resList.length > 0){
                    let cell = resList[0];
                    this.model.setSelect(cell.petSerialNum);
                    this.topList[index].refresh(cell);
                    this.skin.list1.refresh();
                }else{
                    // E.ViewMgr.ShowMidError(E.getLang("petDec2"));
                    this.err();
                }
            }
        }
        this.updateSucceedProbability();
    }

    private itemHadnler(item:LingChongRhItem){
        item.refresh();
    }
    
    public refreshList(vo:stPet,sel:boolean){
        this.skin.list1.refresh();
        if(sel){
            let item = this.getCanUse();
            if(item){
                item.refresh(vo);
            }
        }else{
            for (let i = 0; i < this.topList.length; i++) {
                let item = this.topList[i];
                if(item.vo && item.vo.petSerialNum == vo.petSerialNum){
                    item.refresh(null);
                }
                // item.refreshSkin();
            }
        }
        this.updateSucceedProbability();
    }

    private getCanUse() {
        for (let i = 0; i < this.topList.length; i++) {
            let item = this.topList[i];
            // item.refresh(l[i]);
            if(!item.vo){
                return item;
            }
        }
    }

    public get selList(){
        let l = [];
        for(let i = 0;i < this.skin.list1.array.length;i++){
            let vo:stPet = this.skin.list1.array[i];
            if(this.model.isSelect(vo.petSerialNum) ){
                l.push(vo);
            }
        }
        return l;
    }

    /**更新成功率 */
    private updateSucceedProbability() {
        let petid = 0;
        for(let i = 0;i < this.topList.length;i++){
            let vo = this.topList[i].vo;
            if(vo){
                petid = vo.petId;
                break;
            }
        }
        let str:string;
        if(petid){
            let cfg =PetListProxy.Ins.getCfgById(petid);
            let pCfg = t_Pet_Fusion_Rate.Ins.getByLv(cfg.f_petquality + 1);
            if(pCfg){
                str = E.getLang("petDec5") + (pCfg.f_fusionrate_Client / 100) + "%";
            }
        }
        if(str){
            this._ui.succeedProbabilityTf.visible = true;
            this._ui.succeedProbabilityTf.text = str;
        }else{
            this._ui.succeedProbabilityTf.visible = false;
        }
        this.onPetTip();
    }

    private getPetListByQua(qua:number){
        let petList:stPet[] = [];
        let l = this.model.petList;
        if(qua == 0){
            for(let i = 0;i < l.length;i++){
                let cell = l[i];
                if(cell.onBattle){
                
                }else{
                    petList.push(cell);
                }
            }
        } else {
            for (let i = 0; i < l.length; i++) {
                let cell = l[i];
                if (cell.onBattle) {

                } else {
                    let cfg: Configs.t_Pet_List_dat = PetListProxy.Ins.getCfgById(cell.petId);
                    if (cfg.f_petquality == qua) {
                        petList.push(cell)
                    }
                }
            }
        }
        return petList;
    }
    private onQuaSelHandler(){
        let quaCfg:QuickQua = this.selCtl.selectVo;
        LingChongModel.Ins.petDataList.sort(LingChongModel.Ins.petSort);
        let l = this.getPetListByQua(quaCfg.f_id);
        this.skin.list1.array = l;
        this.skin.list1.scrollTo(0);
    }

    private onTuJian(){
        E.ViewMgr.Open(EViewType.LingChongTJView);
    }

    public onAdd() {
        this.selCtl.selectIndex(0);
        this.clearTop();
        this.model.on(LingChongRH_Model.EVENT_UPDATE_FUSION,this,this.onSucceedHandler);
        LingChongModel.Ins.on(LingChongModel.REMOVE_LingChong,this,this.onSucceedHandler);
        MainModel.Ins.on(MainEvent.EventPetFusionBaoDi,this,this.onPetTip);
        this.onPetTip();
    }

    private onPetTip(){
        let petid = 0;
        for(let i = 0;i < this.topList.length;i++){
            let vo = this.topList[i].vo;
            if(vo){
                petid = vo.petId;
                break;
            }
        }
        let str:string = "";
        if(petid){
            let cfg =PetListProxy.Ins.getCfgById(petid);
            let qua:number = cfg.f_petquality + 1;
            let pCfg = t_Pet_Fusion_Rate.Ins.getByLv(qua);
            if(pCfg){
                let quaName:string = EquipmentQualityProxy.Ins.getByQua(qua).f_EquipmentLevel;

                let baodi = MainModel.Ins.getLvByQuaPet(qua);
                if(baodi == null){

                }else{
                    if(baodi == 0){
                        str = E.getLang("pet08",quaName);
                    }else{
                        str = E.getLang("pet07")+baodi+E.getLang("pet09",quaName);      // E.getLang("pet07",baodi,quaName);
                        
                    }
                }
            }
        }
        this._ui.outTf.text = str;
    }

    private clearTop() {
        for(let i = 0;i < this.topList.length;i++){
            this.topList[i].refresh(null);
        }
        this._ui.succeedProbabilityTf.visible = false;
    }
    private clearRongHeUI() {
        this.model.clearSelIds();
        this.onQuaSelHandler();
        this.clearTop();
    }
    private onSucceedHandler(result:number) {
        this.clearRongHeUI();
        if(result == 0){
            Laya.timer.once(this.model.DEALY_TIME,this,this.refreshAuto);
        }
    }

    public onRemove() {
        this.setAuto(false);
        this.model.selIdList = [];
        this.model.off(LingChongRH_Model.EVENT_UPDATE_FUSION,this,this.onSucceedHandler);
        LingChongModel.Ins.off(LingChongModel.REMOVE_LingChong,this,this.onSucceedHandler);
        MainModel.Ins.off(MainEvent.EventPetFusionBaoDi,this,this.onPetTip);
    }

    public setAuto(v:boolean){
        this.model.isAuto = v;
        this.refreshAuto();
        if(v){
        }
        else{
            if(this.model.autoView){
                this.model.autoView.clearClickEvt();
            }
            E.ViewMgr.Close(EViewType.LingChongRH_Succeed);
        }
    }

    public refreshAuto() {
        if (this.model.isAuto) {
            LingChongModel.Ins.petDataList.sort(LingChongModel.Ins.petSort);
            let l = this.getPetListByQua(0);
            this.skin.list1.array = l;
            this.skin.list1.scrollTo(0);
            this.clearTop();
            this.onYiJiangHandler();
            this.onRongHe();
        }
    }
}

/**
 * 默认 非自动 点击关闭 
 * 自动中  1s 秒关闭 继续合成 只要有点击就停止
 * 点击上方icon下来
 */
class LingChongAutoHCTip extends ViewBase{
    private _ui:ui.views.lingchong.ui_lingchongAutoHCTipUI;
    protected mMask = true;
    private model:LingChongRH_Model;
    private selCtl: SelectListCtl = new SelectListCtl();
    private _checkBoxCtl1:CheckBoxCtl;

    protected  onAddLoadRes(){}

    protected onFirstInit(){
        if(!this.UI){
            this.model = LingChongRH_Model.Ins;
            this.model.autoView = this;
            this.UI = this._ui = new ui.views.lingchong.ui_lingchongAutoHCTipUI;
            this.bindClose(this._ui.btn_close);
            this.setMouseBg(this._ui.bg1);
            ButtonCtl.Create(this._ui.startBtn,new Laya.Handler(this,this.onBtnClick));

            this.selCtl.dirBottom = true;
            this.selCtl.init(this._ui.sanjiao, this._ui.listarea, this._ui.listcontainer, this._ui.listtf,ui.views.main.ui_quick_setting_list_attrUI, this.model.getListSel());
            this.selCtl.selectHandler = new Laya.Handler(this, this.onQuaSelHandler);
            this._ui.bg.alpha = 0.1;
            this.bindClose(this._ui.bg);

            this._checkBoxCtl1 = new CheckBoxCtl({ bg: this._ui.bg4, gou: this._ui.gou } as ICheckBoxSkin);
            this._checkBoxCtl1.visible = false;
            this._checkBoxCtl1.selected = false;
        }
    }

    private onBtnClick(){
        let view:LingChongViewCtl2 = this.model.view;
        // E.ViewMgr.Get(EViewType.BaoShiHCView) as BaoShiHCView;
        if(view){

            if(!view.isCanRongHeByQua()){
                E.ViewMgr.ShowMidError(E.getLang("pet01"));
                this.Close();
                return;
            }

            if(this._checkBoxCtl1.selected){
                let qua = this.model.autoView.quality;
                if(!PetQualityProxy.Ins.canSkinAnim(qua)){
                    E.ViewMgr.ShowMidError(E.getLang("peterr"));
                    return;
                }
                this.model.quaSel = this._checkBoxCtl1.selected;
                let req = new PetFusion_req();
                req.fusionQuality = qua;
                SocketMgr.Ins.SendMessageBin(req);
                // E.ViewMgr.ShowMidOk(E.getLang("end_synthesis"));
            }else{
                Laya.timer.callLater(this,this.addClick);
                view.setAuto(true);
            }
            this.Close();
        }
    }
    private addClick() {
        this._ui.on(Laya.Event.CLICK,this,this.onStageClick);
    }
    private onStageClick() {
        this.model.view.setAuto(false);
        LogSys.Log("onStageClick false");
    }

    public clearClickEvt(){
        this._ui.off(Laya.Event.CLICK,this,this.onStageClick);
    }

    private onQuaSelHandler(){
        let quaCfg:QuickQua = this.selCtl.selectVo;
        // RedUpdateModel.Ins.save(RedEnum.PET_RH_QUA,quaCfg.f_id);
    }

    /**该配置以下 */
    public get quality(){
        let quaCfg:QuickQua = this.selCtl.selectVo;
        let cfg:Configs.t_Pet_Quality_dat = PetQualityProxy.Ins.GetDataById(quaCfg.f_id);
        return cfg.f_quality;
    }

    private getSelIndex(){
        let fid = 1;
        // let vo = RedUpdateModel.Ins.getByID(RedEnum.PET_RH_QUA);
        // if(vo){
        // fid = vo.type;
        // }else{
        // fid = 1;
        // }
        let datalist = this.selCtl.curDataList;
        for(let i = 0;i < datalist.length;i++){
            let quaCfg:QuickQua = datalist[i];
            if(quaCfg.f_id == fid){
                return i;
            }
        }
        return 0;
    }

    protected onInit(): void {
        let vipEnable = VipModel.Ins.getVipTQByType(VipType.PetYiJian);
        if (System_RefreshTimeProxy.Ins.isEnable(ESystemRefreshTime.PetOneClickSynthesis) &&
            initConfig.clienttype == EClientType.Discount && vipEnable!=-1) {
            this._checkBoxCtl1.visible = true;
        } else {
            this._checkBoxCtl1.visible = false;
        }
        let index:number = this.getSelIndex();
        this.selCtl.selectIndex(index);
    }

    protected onExit(): void {
        
    }
}