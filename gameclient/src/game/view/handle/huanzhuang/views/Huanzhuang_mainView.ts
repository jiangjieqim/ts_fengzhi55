import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { reloadEquip_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { DotManager } from "../../common/DotManager";
import { EquipmentIDProxy } from "../../main/model/EquipmentProxy";
import { MainModel } from "../../main/model/MainModel";
import { RedUpdateModel } from "../../main/model/RedUpdateModel";
import { EEquipType, EWearableType } from "../../main/vos/ECellType";
import { EquipItemVo } from "../../main/vos/EquipItemVo";
import { ZuoQiModel } from "../../zuoqi/ZuoqiModel";
import { NiceAvatarView } from "../ctl/NiceAvatarView";
import { TwoAvatar } from "../ctl/TwoAvatar";
import { HuanZhuangModel } from "../HuanZhuangModel";
import { HuanZhuangEvent } from "../vos/HuanZhuangEvent";
import { HuanZhuangVo } from "../vos/HuanZhuangVo";
import { HuanZhuangSmallIconCtl } from "./HuanZhuangSmallIconCtl";
import { Huanzhuang_bot_itemRender } from "./Huanzhuang_bot_itemRender";
/**换装 */
export class Huanzhuang_mainView extends ViewBase {
    protected autoFree = true;
    private _ui: ui.views.huanzhuang.ui_huanzhuang_mainUI;
    private model: MainModel;
    private avatar: TwoAvatar;
    // private horseAvatar:AvatarBaseView;
    private _equipList:HuanZhuangSmallIconCtl[]=[];
    private _equipDataList:EquipItemVo[]=[];
    protected mMask: boolean = true;
    protected mMainSnapshot = true;
    private _huanHuaCtl:ButtonCtl;
    protected onAddLoadRes(): void {
        this.addAtlas("huanzhuang.atlas");
    }

    protected onExit(): void {
        // MainModel.Ins.mainMask = false;
        // MainModel.Ins.off(MainEvent.EquipChange,this,this.onEquipChange);
        HuanZhuangModel.Ins.off(HuanZhuangEvent.UpdateStyle,this,this.onEquipChange);
        HuanZhuangModel.Ins.off(HuanZhuangEvent.UnLockListUpdate,this,this.onEquipChange);
        RedUpdateModel.Ins.off(RedUpdateModel.UPDATA,this,this.onEquipChange);
        HuanZhuangModel.Ins.off(HuanZhuangEvent.SuitUpdate,this,this.onSuitChange);
        this.avatar.dispose();
        this.avatar = null;
        // if(this.horseAvatar){
        //     this.horseAvatar.dispose();
        //     this.horseAvatar = null;
        // }
    }

    /**初始化装备顶部格子控制器 */
    private addEquipItem(_equipType:EEquipType,index:number){
        let skin = this._ui["item" + index];
        // let ctl:EquipItemView = HuanzhuangUtils.CreateCtl(skin,_equipType);
        // ctl.changeSkin = true;
        let _ctl:HuanZhuangSmallIconCtl = new HuanZhuangSmallIconCtl();
        _ctl.equipType = _equipType;
        _ctl.skin = skin;
        _ctl.init();
        this._equipList.push(_ctl);
        skin.on(Laya.Event.CLICK,this,this.onTopClick,[_equipType,skin]);
    }

    private onTopClick(type:EEquipType,node:Laya.Sprite){
        let skin:ui.views.huanzhuang.ui_huanzhuang_itemUI = node as ui.views.huanzhuang.ui_huanzhuang_itemUI;
        if(skin.lockimg.visible){
            return;
        }
        this._ui.sel.x = node.x + node.width/2;
        this._ui.sel.y = node.y + node.height/2;
        this.refreshBotList(type);
    }

    private selByIndex(_dataList:HuanZhuangVo[],index:number){
        for(let i = 0;i <_dataList.length;i++){
            let cell:HuanZhuangVo = _dataList[i];
            // let id:number = HuanZhuangModel.Ins.getEquipStyle(cell.equipType);
            // if(cell.equipStyle == id){
            if(i == index){
                // _selectIndex = i;
                cell.selected = true;
            }else{
                cell.selected = false;
            }
        }
    }

    // private curType:EEquipType;
    /**更新底部的icon */
    private refreshBotList(type:EEquipType){
        // this.curType = type;
        let _dataList = HuanZhuangModel.Ins.getVoList(type);
        //###############################################################
        // let _selectIndex:number = 0;
        let styleValue = HuanZhuangModel.Ins.getEquipStyle(type);
        let selIndex = 0;
        if(styleValue == 0){
            selIndex = 0;
        }else{
            for(let i = 1;i <_dataList.length;i++){
                let cell:HuanZhuangVo = _dataList[i];
                if(cell.equipStyle == styleValue){
                    selIndex = i;
                }
            }
        }

        //选择已经穿戴中的装备
        /*
        for(let i = 0;i <_dataList.length;i++){
            let cell:HuanZhuangVo = _dataList[i];
            let id:number = HuanZhuangModel.Ins.getEquipStyle(cell.equipType);
            if(cell.equipStyle == id){
                _selectIndex = i;
                cell.selected = true;
            }else{
                cell.selected = false;
            }
        }
        */
        this.selByIndex(_dataList, selIndex);
        // this._ui.list1.array = _dataList;
        this._ui.list1.array = _dataList;
        // this._ui.list1.selectedIndex = -1;
        this._ui.list1.selectedIndex = selIndex;
        this._ui.list1.refresh();
        this._ui.list1.scrollTo(0);
        //###############################################################

        let _equipIdCfg: Configs.t_EquipmentID_dat = EquipmentIDProxy.Ins.GetDataById(type);
        this._ui.tf5.text = _equipIdCfg.f_name;
    }

    protected onFirstInit(): void {
        if (!this.UI) {
            this.model = MainModel.Ins;
            this.UI = this._ui = new ui.views.huanzhuang.ui_huanzhuang_mainUI();
            this.bindClose(this._ui.close1);
            this.btnList.push(
            ButtonCtl.CreateBtn(this._ui.tujianbtn, this, this.onTuJianHandler),
            ButtonCtl.CreateBtn(this._ui.shuxinbtn, this, this.onAttrHandler)
            );
            this._equipList = [];
            this._equipDataList = [];
            this.addEquipItem(EEquipType.Casque, 0);
            this.addEquipItem(EEquipType.Barde, 1);
            this.addEquipItem(EEquipType.Shield, 2);
            this.addEquipItem(EEquipType.ZuoQi, 3);
            this.addEquipItem(EEquipType.Wing, 4);
            this.addEquipItem(EEquipType.Weapon, 5);

            this._ui.list1.itemRender = Huanzhuang_bot_itemRender;
            this._ui.list1.renderHandler = new Laya.Handler(this, this.onHuanZhuangItemHandler);
            this._ui.list1.selectEnable = true;
            this._ui.list1.selectHandler = new Laya.Handler(this, this.onSelectHandler);

            this._huanHuaCtl = ButtonCtl.CreateBtn(this._ui.huanhuabtn, this, this.onHuanHuaHandler);
            this.btnList.push(this._huanHuaCtl);
        }
    }

    private onSelectHandler(index: number) {
        let selectVo:HuanZhuangVo;
        this.updateEquipIcon();
        ///////////////////////////////////////////////////
        // let _mLockEquipType:number = 0;
        for (let i = 0; i < this._ui.list1.array.length; i++) {
            let vo: HuanZhuangVo = this._ui.list1.array[i];
            if (i == index) {
                vo.selected = true;
                selectVo = vo;
            } else {
                vo.selected = false;
            }
        }

        //重置数据
        // this.avatar.wingId = MainModel.Ins.wingId;
        // this.avatar.rideId = ZuoQiModel.Ins.rideVo.mainid;
        this.avatar.refreshSkin();
        if(selectVo){
            let val = selectVo.equipStyle;
            if(!val){
                val = selectVo.defaultStyle();
            }
            this.avatar.updateSkin(selectVo.equipType, val);//更新皮肤
        }else{
            this.avatar.resetEmpty();
        }
        this.updateBotList();
        // console.log("onSelectHandler index:"+index);
    }

    /**更新底部列表 */
    private updateBotList(){
        this._ui.list1.refresh();
        this.updateBtn();
    }

    /**当前选择的Vo */
    private get curSelectVo(){
        for (let i = 0; i < this._ui.list1.array.length; i++) {
            let vo:HuanZhuangVo = this._ui.list1.array[i];
            if(vo.selected){
                return vo;
            }
        }
    }
    private set huanhuaMouseEnabel(v:boolean){
        this._huanHuaCtl.mouseEnable = v;
        this._huanHuaCtl.gray = !v;
    }

    /**更新按钮状态 */
    private updateBtn(){
        let selVo:HuanZhuangVo = this._ui.list1.selectedItem;
        let _equipStyle: number = HuanZhuangModel.Ins.getEquipStyle(selVo.equipType);

        if (selVo.locked) {
            this.huanhuaMouseEnabel = false;
            this._ui.tf6.text = "未获得";
        }else{
            if (_equipStyle == selVo.equipStyle) {
                this.huanhuaMouseEnabel = false;
                this._ui.tf6.text = "已幻化";
            } else {
                this.huanhuaMouseEnabel = true;
                this._ui.tf6.text = "幻化";
            }
        }
    }
    private onSuitChange(){
        if(HuanZhuangModel.Ins.hasSuitCanActive()){
            DotManager.addDot(this._ui.tujianbtn);
        }else{
            DotManager.removeDot(this._ui.tujianbtn);
        }
    }
    private playAnim(equipType:number){
        for(let i = 0;i < this._equipList.length;i++){
            let itemView:HuanZhuangSmallIconCtl = this._equipList[i];
            if(itemView.equipType == equipType){
                itemView.playAnim();
                break;
            }
        }
    }

    private onSucceed(_vo:HuanZhuangVo){
        E.ViewMgr.ShowMidLabel(E.LangMgr.getLang("HuanHuaSucceed"));
        this.playAnim(_vo.equipType);
    }
    /**幻化功能 */
    private onHuanHuaHandler() {
        let _vo = this.curSelectVo;
        if(_vo){
            HuanZhuangModel.Ins.once(HuanZhuangEvent.UpdateStyle,this,this.onSucceed,[_vo]);

            let req:reloadEquip_req = new reloadEquip_req();
            req.type = _vo.equipType;
            let val = _vo.equipStyle;
            // if(HuanZhuangModel.Ins.isFirstPos(_vo.equipType,_vo.equipStyle)){
            //     val = 0;
            // }
            req.id = val;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private onHuanZhuangItemHandler(item:Huanzhuang_bot_itemRender,index:number){
        item.refreshView(index);
    }

    /**更新顶部的装备icon */
    private updateEquipIcon(){
        for(let i = 0;i < this._equipList.length;i++){
            let itemView:HuanZhuangSmallIconCtl = this._equipList[i];
            let vo = this.getItemType(itemView.equipType);
            itemView.updateData(vo);
        }
    }

    private getSmallIconByEquipType(equipType:number){
        return this._equipList.find(item=>item.equipType == equipType);
    }

    private getItemType(type:number){
        return this._equipDataList.find(item =>item.equipVo.type == type && item.equipVo.wearable == EWearableType.Wearable);
    }

    /**换装图鉴 */
    private onTuJianHandler(){
        E.ViewMgr.Open(EViewType.HuanzhuangTuJian);
    }

    /**换装属性 */
    private onAttrHandler(){
        E.ViewMgr.Open(EViewType.AttrShow,null,HuanZhuangModel.Ins.suitAttrShow);
    }

    protected onInit(): void {
        // MainModel.Ins.mainMask = true;
        // let req:GetEquipSkinList_req = new GetEquipSkinList_req();
        // SocketMgr.Ins.SendMessageBin(req);
        
        // MainModel.Ins.on(MainEvent.EquipChange,this,this.onEquipChange);
        HuanZhuangModel.Ins.on(HuanZhuangEvent.UnLockListUpdate,this,this.onEquipChange);
        HuanZhuangModel.Ins.on(HuanZhuangEvent.SuitUpdate,this,this.onSuitChange);
        this.onSuitChange();
        HuanZhuangModel.Ins.on(HuanZhuangEvent.UpdateStyle,this,this.onEquipChange);
        RedUpdateModel.Ins.on(RedUpdateModel.UPDATA,this,this.onEquipChange);
        this.updateView();
        this.onTopClick(EEquipType.Casque,this._ui.item0);//默认选择帽子头盔
    }

    private onEquipChange(){
        this.updateView();
        this.updateBotList();
    }

    private updateView(){
        //更新人物形象
        this.updateAvatar();
        //刷新顶部的装备
        this.updateEquipIcon();
    }

    /**更新人物形象 */
    private updateAvatar(){
        let rideId:number = ZuoQiModel.Ins.rideVo.mainid;
        this.createByRideId(rideId);
    }

    private createByRideId(rideId:number){
        let windId:number = MainModel.Ins.wingId;
        let equipList = this.model.getEquipList();
        this._equipDataList = equipList;

        if (this.avatar) {
            this.avatar.dispose();
        }
        // this.avatar = AvatarFactory.createBaseMainAvatar(equipList,rideId,windId);
        // this._ui.avatarCon.addChild(this.avatar);
        this.avatar = new NiceAvatarView();
        this.avatar.avatarCon = this._ui.avatarCon;
        this.avatar.wingId = windId;
        this.avatar.rideId = rideId;
        this.avatar.init();
    }
    
}