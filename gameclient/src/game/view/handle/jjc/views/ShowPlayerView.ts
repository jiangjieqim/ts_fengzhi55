import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { stEquipItem, stRideInfo, WatchPlayerInfo_revc } from "../../../../network/protocols/BaseProto";
import { AvatarFactory } from "../../avatar/AvatarFactory";
import { AvatarView } from "../../avatar/AvatarView";
import { FontClipCtl } from "../../avatar/ctl/FontClipCtl";
import { FontCtlFactory } from "../../avatar/ctl/FontCtlFactory";
import { ChatModel } from "../../chat/model/ChatModel";
import { ChengHaoModel } from "../../chenghao/model/ChengHaoModel";
import { FuJiangStarCtl } from "../../fujiang/view/ctl/FuJiangStarCtl";
import { PetListProxy } from "../../lingchong/proxy/LingChongProxy";
import { DateFactory } from "../../main/model/DateFactory";
import { MainModel } from "../../main/model/MainModel";
import { ItemProxy } from "../../main/proxy/ItemProxy";
import { DetailShowVo } from "../../main/views/Attr_detailedView";
import { EquipItemView } from "../../main/views/EquipItemView";
import { WingItemView } from "../../main/views/WingItemView";
import { ZuoQiSlotCtl } from "../../main/views/ZuoQiSlotCtl";
import { EEquipType } from "../../main/vos/ECellType";
import { EquipItemVo } from "../../main/vos/EquipItemVo";
import { PlayerVoCtl, PlayerVoFactory } from "../../main/vos/PlayerVoFactory";
import { ShenBinListProxy } from "../../shenbin/proxy/ShenBinProxy";
import { IZuoqiTipsData } from "../../zuoqi/views/ZuoQiTipsView";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { ZuoqiVo } from "../../zuoqi/vos/ZuoqiVo";
import { ZuoqiFactory } from "../../zuoqi/ZuoqiFactory";

export class ShowPlayerView extends ViewBase {
    public avatar:AvatarView;
    protected autoFree = true;
    private _ui: ui.views.jjc.ui_jjc_player_infoUI;
    private _plusCtl: FontClipCtl;
    private playerData: WatchPlayerInfo_revc;
    private _equipList: (EquipItemView | WingItemView)[];
    private wingItem: WingItemView;
    private attrViewList:ui.views.main.ui_main_attrUI[];
    private _playerVoCtl: PlayerVoCtl = new PlayerVoCtl();
    private _detailData:DetailShowVo;
    private _zuoqiSlot:ZuoQiSlotCtl;
    private _starCtl:FuJiangStarCtl;

    protected mMask: boolean = true;

    protected onAddLoadRes(): void {
        this.addAtlas('lingchong.atlas');
    }
    
    /**离开处理 */
    protected onExit(): void {
        this.avatar.dispose();
    }
    /**这里在加载完资源后调用-建议只处理资源相关的逻辑*/
    protected onFirstInit(): void {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.jjc.ui_jjc_player_infoUI();
            this._ui.centerBg.on(Laya.Event.CLICK, this, this.onClickHandler);
            this.bindClose(this._ui.close1);
            this._plusCtl = FontCtlFactory.createPlus();
            this._equipList = [];
            this._equipList.push(
                new EquipItemView(this._ui.item0, EEquipType.Shoulder),
                new EquipItemView(this._ui.item1, EEquipType.Casque),
                new EquipItemView(this._ui.item2, EEquipType.Necklace),
                new EquipItemView(this._ui.item3, EEquipType.Wrister),
                new EquipItemView(this._ui.item4, EEquipType.Barde),
                new EquipItemView(this._ui.item5, EEquipType.Gloves),
                new EquipItemView(this._ui.item6, EEquipType.Waistband),
                new EquipItemView(this._ui.item7, EEquipType.Trousers),
                new EquipItemView(this._ui.item8, EEquipType.Weapon),
                new EquipItemView(this._ui.item9, EEquipType.Ornament),
                new EquipItemView(this._ui.item10, EEquipType.Shoe),
                new EquipItemView(this._ui.item11, EEquipType.Shield),

                // new EquipItemView(this._ui.item12, EEquipType.ZuoQi),
                // new EquipItemView(this._ui.item13, EEquipType.None),
                // new EquipItemView(this._ui.item14, EEquipType.None),
                // new EquipItemView(this._ui.item15, EEquipType.None),
                // new EquipItemView(this._ui.item16, EEquipType.None),
                // new EquipItemView(this._ui.item17, EEquipType.None),
            );
            this.wingItem = new WingItemView(this._ui.item_wing);
            let l = [];
            for(let i = 0;i < 10;i++){
                l.push(this._ui['attr' + i]);
            }
            this.attrViewList = l;

            // ButtonCtl.Create(this._ui.bottombtn1,new Laya.Handler(this,this.onDetailHandler));
            this.btnList.push(
                ButtonCtl.Create(this._ui.tipsclick,new Laya.Handler(this,this.onDetailHandler),false),
                ButtonCtl.Create(this._ui.img_bs2,new Laya.Handler(this,this.onBtnBSHandler),false),
                ButtonCtl.Create(this._ui.img_hy2,new Laya.Handler(this,this.onBtnHYHandler),false),
                ButtonCtl.Create(this._ui.img_wg2,new Laya.Handler(this,this.onBtnWGHandler),false),
                ButtonCtl.Create(this._ui.img_zh2,new Laya.Handler(this,this.onBtnZHHandler),false),
                ButtonCtl.Create(this._ui.item_sb,new Laya.Handler(this,this.onBtnSBHandler),false),
                ButtonCtl.Create(this._ui.btn_attr,new Laya.Handler(this,this.onBtnAttrHandler)),
                ButtonCtl.Create(this._ui.item_lq,new Laya.Handler(this,this.onBtnLQHandler),false)
            );
            this._zuoqiSlot = new ZuoQiSlotCtl(this._ui.zuoqi,true);
            this._zuoqiSlot.clickHandler = new Laya.Handler(this,this.onZuoqiClick);

            this._starCtl = new FuJiangStarCtl(this._ui.item_lq.star);
        }
    }

    private onZuoqiClick(vo:ZuoqiVo){
        if(vo && !vo.isEmpty){
            E.ViewMgr.Open(EViewType.ZuoqiTips, null, {zqData:vo} as IZuoqiTipsData);
        }
    }

    private onDetailHandler(){
        E.ViewMgr.Open(EViewType.Attr_detailed,null,this._detailData);
    }

    private onBtnBSHandler(){
        if(this.playerData && this.playerData.Gem.formationId){
            E.ViewMgr.Open(EViewType.JJCBSTIP, null,this.playerData.Gem);
        }
    }

    private onBtnHYHandler(){
        if(this.playerData && this.playerData.Blessing){
            E.ViewMgr.Open(EViewType.JJCHYTIP, null,this.playerData.Blessing);
        }
    }

    private onBtnWGHandler(){
        if(this.playerData && this.playerData.Gym){
            E.ViewMgr.Open(EViewType.JJCWGTIP, null,this.playerData.Gym);
        }
    }

    private onBtnZHHandler(){
        if(this.playerData && this.playerData.Spirit){
            E.ViewMgr.Open(EViewType.JJCZHTIP, null,this.playerData.Spirit);
        }
    }

    private onBtnSBHandler(){
        if(this.playerData && this.playerData.Artifact.length){
            E.ViewMgr.Open(EViewType.JJCSBTIP, null,this.playerData.Artifact);
        }
    }

    private onBtnLQHandler(){
        if(this.playerData && this.playerData.petInfo.length){
            E.ViewMgr.Open(EViewType.jjcLCTip, null,this.playerData.petInfo);
        }
    }

    private onBtnAttrHandler(){
        if(this.playerData){
            E.ViewMgr.Open(EViewType.JJCDBTIP, null,this.playerData);
        }
    }

    private updateEquip() {
        let _equipItems:stEquipItem[] = this.playerData.equipItem;
        let _resList:EquipItemVo[] = DateFactory.createEquipList(_equipItems);
        for (let i = 0; i < this._equipList.length; i++) {
            let itemView: EquipItemView | WingItemView = this._equipList[i];
            if (itemView instanceof EquipItemView) {
                itemView.setData(PlayerVoFactory.getEquipVoByType(_resList,itemView.equipType));
            }
        }
    }

    private onClickHandler() {

    }

    //更新属性
    public updateMainAttr() {
        return PlayerVoFactory.fillAttrView(this.attrViewList,new Laya.Handler(this,this.getValByType));
    }

    private getValByType(type:number){
        return PlayerVoFactory.getValString(this.playerData.moneyInfo,type) //MainModel.Ins.mRoleData.getValString(type);
    }

    /**初始化*/
    protected onInit(): void {
        this.playerData = this.Data;
        console.log("this.playerData>>>",this.Data);

        this._playerVoCtl.moneyInfo = this.playerData.moneyInfo;
        this._playerVoCtl.equipItem = this.playerData.equipItem;

        let _player: WatchPlayerInfo_revc = this.playerData;
        this._ui.nameTF.text = _player.NickName;
        MainModel.Ins.setTTHead(this._ui.headImg, MainModel.Ins.convertHead(_player.HeadUrl)); 
        let vv = StringUtil.val2Atlas(this._playerVoCtl.plus);
        this._plusCtl.setValue(this._ui.plusCon, vv);
        this._ui.paihangtf.text = _player.rank.toString();
        this._ui.lvtf.text = IconUtils.str2Lv(_player.Level);//IconUtils.str2Lv(this._playerVoCtl.lv);
        this._ui.img_title.skin = ChengHaoModel.Ins.getTitleImg(_player.titleId);
        this.updateEquip();
        this.updateMainAttr();

        let detail:DetailShowVo = new DetailShowVo();
        detail.moneyInfo = this.playerData.moneyInfo;
        detail.wing = this.playerData.wing;
        detail.equipList = DateFactory.createEquipList(this.playerData.equipItem);
        detail.playerSkin = this.playerData.PlayerSkin;
        this._detailData = detail;
        detail.accoutID = 0;

        // this.avatar = AvatarFactory.createBaseAvatar(detail.equipList,detail.rideId,detail.wing.wingId);
        this.avatar = AvatarFactory.createAvatarByStSkin(detail.playerSkin);

        this.addAvatar();
        
        if(this.playerData.ride.length > 0){
            let _rideVo:stRideInfo = this.playerData.ride[0];
            let _zuoqiVo:ZuoqiVo = ZuoqiFactory.createZuoQiVo(_rideVo.baseInfo);
            if(_rideVo.attr.length > 0){
                _zuoqiVo.equipVo = _rideVo.attr[0];
            }
            this._zuoqiSlot.mData = _zuoqiVo;
        }else{
            this._zuoqiSlot.mData = null;
        }
        this._zuoqiSlot.refresh();
        let wing = this.playerData.wing;
        this.wingItem.setData({ wingId: wing.wingId, stage: wing.stage || 0, level: wing.level || 0, treasureStage: wing.treasureStage || 0, isOwner: false, wingFightCapacity: wing.power });

        if(this.playerData.Gem.formationId){
            this._ui.img_bs1.visible = false;
            this._ui.img_bs2.visible = true;
        }else{
            this._ui.img_bs1.visible = true;
            this._ui.img_bs2.visible = false;
        }

        if(this.playerData.Gym.gymAttrList.length == 0 && this.playerData.Gym.roomAttrList.length == 0){
            this._ui.img_wg1.visible = true;
            this._ui.img_wg2.visible = false;
        }else{
            this._ui.img_wg1.visible = false;
            this._ui.img_wg2.visible = true;
        }

        if(this.playerData.Blessing.attrList.length == 0){
            this._ui.img_hy1.visible = true;
            this._ui.img_hy2.visible = false;
        }else{
            this._ui.img_hy1.visible = false;
            this._ui.img_hy2.visible = true;
        }

        if(this.playerData.Spirit.attrList.length == 0){
            this._ui.img_zh1.visible = true;
            this._ui.img_zh2.visible = false;
        }else{
            this._ui.img_zh1.visible = false;
            this._ui.img_zh2.visible = true;
        }

        if(this.playerData.Artifact.length){
            this._ui.item_sb.visible = true;
            this._ui.img_sb1.visible = false;
            this._ui.item_sb.bg.visible = false;
            this._ui.item_sb.redimg.visible = false;
            this._ui.item_sb.typename.visible = false;
            let sbcfg = ShenBinListProxy.Ins.getCfgById(this.playerData.Artifact[0].artifactId);
            let isbcfg = ItemProxy.Ins.getCfg(sbcfg.f_itemId);
            this._ui.item_sb.quality.skin = IconUtils.getQuaIcon(isbcfg.f_qua);
            this._ui.item_sb.icon.skin = IconUtils.getIconByCfgId(isbcfg.f_itemid);
            this._ui.item_sb.tf1.text = "lv." + this.playerData.Artifact[0].level;
        }else{
            this._ui.item_sb.visible = false;
            this._ui.img_sb1.visible = true;
        }

        if(this.playerData.petInfo.length){
            this._ui.img_lq1.visible = false;
            this._ui.item_lq.visible = true;

            this._ui.item_lq.jiao.visible = false;
            let cfg: Configs.t_Pet_List_dat = PetListProxy.Ins.getCfgById(this.playerData.petInfo[0].petId);
            this._ui.item_lq.quality.skin = IconUtils.getQuaIcon(cfg.f_petquality);
            this._ui.item_lq.icon.skin = PetListProxy.Ins.getPetIconById(cfg.f_petid);
            this._ui.item_lq.lab_lv.text = "Lv." + this.playerData.petInfo[0].petLevel;
            this._ui.item_lq.tab.img.skin = `remote/lingchong/tj${cfg.f_pettype}.png`;
            this._ui.item_lq.tab.img2.visible = false;
            if (this.playerData.petInfo[0].petStar) {
                this._ui.item_lq.sp.visible = true;
                this._ui.item_lq.star.visible = true;
                this._starCtl.setStar(this.playerData.petInfo[0].petStar);
            } else {
                this._ui.item_lq.sp.visible = false;
                this._ui.item_lq.star.visible = false;
            }
        }else{
            this._ui.img_lq1.visible = true;
            this._ui.item_lq.visible = false;
        }
        if (this.playerData.rank === 0) {
            this._ui.tf2.visible = this._ui.paihangtf.visible = false;
        } else {
            this._ui.tf2.visible = this._ui.paihangtf.visible = true;
            if(ChatModel.Ins.isChat){
                this._ui.tf2.visible = this._ui.paihangtf.visible = false;
            }else{
                this._ui.tf2.visible = this._ui.paihangtf.visible = true;
            }
        }
        ChatModel.Ins.isChat = false;
    }

    public addAvatar(){
        this._ui.heroCon.addChild(this.avatar);
    }
}