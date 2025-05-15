import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import {TimeUtil} from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { CheckBoxCtl, ICheckBoxSkin } from "../../../../../frame/view/CheckBoxCtl";
import { TabControl } from "../../../../../frame/view/TabControl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { BlessingAuto_req, BlessingLevel_req, BlessingOnce_req, stCellValue, stItem } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import { AvatarFactory } from "../../avatar/AvatarFactory";
import { AvatarMainView } from "../../avatar/AvatarMainView";
// import { SpineFontTexture } from "../../avatar/ctl/SpineFontTexture";
import { SimpleEffect } from "../../avatar/SimpleEffect";
import { EAvatarAnim } from "../../avatar/vos/EAvatarAnim";
import {DotManager} from "../../common/DotManager";
import { ActivityModel } from "../../huodong/ActivityModel";
import { ActivityEvent } from "../../huodong/model/ActivityEvent";
import { ValCtl } from "../../main/ctl/ValLisCtl";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { ItemProxy } from "../../main/proxy/ItemProxy";
import { GridItemCtl } from "../../main/views/grid/GridItemCtl";
import { GridItemView } from "../../main/views/grid/GridItemView";
import { GridItemVo } from "../../main/views/grid/GridItemVo";
import { Sell2Spine } from "../../main/views/Sell2Spine";
import { ECellType } from "../../main/vos/ECellType";
import { XianShiLiBaoModel, XianShiLiBaoType } from "../../xianshilibao/model/XianShiLiBaoModel";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { HuYouModel } from "../model/HuYouModel";
import { HuYouCfgProxy, HuYouGetStageProxy, HuYouQualityProxy, HuYouShopProxy, HuYouSlotProxy } from "../proxy/HuYouProxy";
import { HuYouDuiHuanItem } from "./HuYouDuiHuanItem";

/* @Author: tsy
 * @Date: 2023-02-17 11:46:55
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-07-03 15:15:09
*/

export class HuYouQuickBtn1 extends ui.views.fuyou.ui_zhuanhuaItem1UI{
    public cfg:any;
}

export class HuYouView extends ViewBase{
    private _ui:ui.views.fuyou.ui_cifuUI;
    protected mMask = true;
    protected isClearTimer = false;
    protected autoFree = true;
    private tabsCtl:TabControl;
    private tabList: any;
    private _checkBoxCtl:CheckBoxCtl;
    private timeCtl:TimeCtl;
    private curIndex:number;
    private btnlist:HuYouQuickBtn1[];

    private _item1:GridItemCtl;
    private _item2:GridItemCtl;
    private _item3:GridItemCtl;
    private _item4:GridItemCtl;
    private _item5:GridItemCtl;
    private _item6:GridItemCtl;
    private _item7:GridItemCtl;
    private _item8:GridItemCtl;

    private _eff1:SimpleEffect;
    private _eff2:SimpleEffect;
    private _eff3:SimpleEffect;
    private _eff4:SimpleEffect;
    private _eff5:SimpleEffect;
    private _eff6:SimpleEffect;
    private _avatar:AvatarMainView;

    // private _fyEff:SimpleEffect;
    // private _spCtl:SpineFontTexture;
    // private _gyCtl:SpineFontTexture;

    private _animCtl:Sell2Spine;

    private get packUid(): number {
        return this._ui.qifu.visible ? 20 : 21;
    }

    protected onAddLoadRes() {
        this.addAtlas('fuyou.atlas');
        this.addAtlas('huodong.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.fuyou.ui_cifuUI; 
            this.btnlist = [];
            this.bindClose(this._ui.close1);
            const tabsSkin = [this._ui.tab1,this._ui.tab2,this._ui.tab3];
            this.tabList = E.LangMgr.getLang("HuYouTab").split("|");

            this.tabsCtl = new TabControl();
            this.tabsCtl.init(tabsSkin, new Laya.Handler(this,this.onTabSelectHandler), new Laya.Handler(this, this.itemTabHandler));

            ValCtl.Create(this._ui.txt_money4,this._ui.img_money4,ECellType.GOLD);
            ValCtl.Create(this._ui.txt_money3,this._ui.img_money3,ECellType.QiYun);
            ValCtl.Create(this._ui.txt_money2,this._ui.img_money2,ECellType.DaoQi);
            ValCtl.Create(this._ui.txt_money1,this._ui.img_money1,ECellType.GouYu);
            this.btnList.push(
                ButtonCtl.Create(this._ui.btn_l,new Laya.Handler(this,this.onBtnLClick)),
                ButtonCtl.Create(this._ui.btn_r,new Laya.Handler(this,this.onBtnRClick)),
                ButtonCtl.Create(this._ui.levelUpBtn,new Laya.Handler(this,this.onBtnlevelUpClick)),
                ButtonCtl.Create(this._ui.tujianbtn,new Laya.Handler(this,this.onBtntujianbtnClick)),
                ButtonCtl.Create(this._ui.btn_shezhi,new Laya.Handler(this,this.onBtnSheZhiClick)),
                ButtonCtl.Create(this._ui.btn_attr,new Laya.Handler(this,this.onBtnAttrClick)),
                ButtonCtl.Create(this._ui.btn_xslb,new Laya.Handler(this,this.onBtnXslbClick))
            )
            this._checkBoxCtl = new CheckBoxCtl({bg:this._ui.ckbg,gou:this._ui.gou} as ICheckBoxSkin);
            this._checkBoxCtl.selectHander = new Laya.Handler(this,this.updataMoneyRes);

            this._ui.list.itemRender = GridItemView;
            this._ui.list.renderHandler = new Laya.Handler(this,this.itemRender);

            this._ui.list1.itemRender = GridItemView;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.itemRender1);

            this._ui.list2.itemRender = HuYouDuiHuanItem;
            this._ui.list2.renderHandler = new Laya.Handler(this,this.itemDuiHuanRender);

            this.timeCtl = new TimeCtl(this._ui.txt_time);

            for(let i:number = 1;i<9;i++){
                this["_item" + i] = new GridItemCtl(this._ui["item" + i]);
            }
            for(let i:number = 1;i<7;i++){
                this["_eff" + i] = new SimpleEffect(this._ui["box" + i],`o/spine/lantern2/lantern2`);
                this["_eff" + i].once(Laya.Event.COMPLETE,this,()=>{
                    this["_eff" + i].anim.container.x = 36;
                    this["_eff" + i].anim.container.y = 115;
                });
            }
            this.initSelectUI();
            this._ui.img_moneyIcon.skin = IconUtils.getIcon(31);
            for(let i:number=2;i<7;i++){
                this._ui["img" + i].visible = false;
            }

            // this._fyEff = new SimpleEffect(this._ui,`o/spine/sell/sell`,350,480);
            // this._fyEff.once(Laya.Event.COMPLETE,this,()=>{
            //     this._spCtl = new SpineFontTexture(this._fyEff.anim.avatar.templet,`o/spine/sell/sell`);
            //     this._gyCtl = new SpineFontTexture(this._fyEff.anim.avatar.templet,`o/spine/sell/sell`);
            // });

            let _animCtl = new Sell2Spine();
            _animCtl.load(`o/spine/sell2/sell2.skel`);
            _animCtl.once(Laya.Event.COMPLETE,this,this.onAnimCompleteHandler);
            this._animCtl = _animCtl;
        }
    }

    private onAnimCompleteHandler(){
        this._ui.addChild(this._animCtl.baseSkel);
        this._animCtl.baseSkel.pos(370,480);
    }

    private initSelectUI(){
        let size = 5;
        let cnt = HuYouQualityProxy.Ins.getListByType(1).length + 1;
        let cellHeight = 0;
        for(let i = cnt-1;i >= 0;i--){
            let _item:HuYouQuickBtn1 = new HuYouQuickBtn1();
            _item.y = (cnt-i - 1) * _item.height + size;
            _item.x = size;
            this._ui.listcontainer.addChild(_item);
            cellHeight = _item.height;
            let cfg:any;
            if(i == cnt-1){
                cfg = {};
                cfg.f_QualityID = 0;
                cfg.f_SoulQualityName = "全部";
                cfg.f_Color = "ffeec2";
            }else{
                cfg = HuYouQualityProxy.Ins.GetDataById(i+1);
            }
            _item.cfg = cfg;
            this.updateCell(_item.tf,cfg);
            _item.btn.clickHandler = new Laya.Handler(this,this.onItemClickHandler,[cfg,cnt - i - 1]);
            this.btnlist.push(_item);
        }

        this.curIndex = this.btnlist.length - 1;
        this._ui.listcontainer.height = cnt * cellHeight + size * 2;
        this._ui.listcontainer.y = this._ui.listarea.y - this._ui.listcontainer.height;

        this._ui.listarea.on(Laya.Event.CLICK,this,this.onAreaHander);
    }

    private updateCell(label:Laya.Label,cfg:any){
        label.text = cfg.f_SoulQualityName;
        label.color = `#${cfg.f_Color}`;
    }

    private onItemClickHandler( cfg:any,_index:number){
        this._ui.listcontainer.visible = false;
        this.selectIndex(_index);
    }

    private selectIndex(index:number){
        this.curIndex = index;
        this.updateCell(this._ui.listtf,this.btnlist[index].cfg);
        this.updataFuYou();
    }

    private onAreaHander(){
        this._ui.listcontainer.visible = !this._ui.listcontainer.visible;
        if(this._ui.listcontainer.visible){
            this._ui.sanjiao.rotation = 180;
        }
        else{
            this._ui.sanjiao.rotation = 0;
        }
    }
    
    private onTabSelectHandler(v:number){
        // HuYouModel.Ins.tabSelIndex = v;
        if(!this.isInit && HuYouModel.Ins.isAuto){
            this.setAuto(false);
            E.ViewMgr.ShowMidError(E.getLang("HuYou_tips1"));
        }
        this.isInit = false;

       switch(v){
            case 0:
                this._ui.qifu.visible = true;
                this._ui.fuyou.visible = false;
                this._ui.duihuan.visible = false;
                this._ui.gold1.visible = this._ui.gold2.visible = this._ui.gold3.visible = this._ui.gold4.visible = true;
                this._ui.gold1.x = 0;
                this._ui.gold2.x = 158;
                ActivityModel.Ins.onPop(this.packUid, this._ui.btn_xslb);
                break;
            case 1:
                this._ui.qifu.visible = false;
                this._ui.fuyou.visible = true;
                this._ui.duihuan.visible = false;
                this._ui.gold2.visible = true;
                this._ui.gold2.x = 483;
                this._ui.gold1.visible = this._ui.gold3.visible = this._ui.gold4.visible = false;
                ActivityModel.Ins.onPop(this.packUid, this._ui.btn_xslb);
                break;
            case 2:
                this._ui.qifu.visible = false;
                this._ui.fuyou.visible = false;
                this._ui.duihuan.visible = true;
                this._ui.gold1.visible = true;
                this._ui.gold1.x = 483;
                this._ui.gold2.visible = this._ui.gold3.visible = this._ui.gold4.visible = false;
                break;
       }
    }

    private itemTabHandler(tabSkin, index: number, sel: boolean, data){
        let skin: ui.views.fuyou.ui_tabUI = tabSkin;
        skin.txt.text = this.tabList[index];
        if (sel) {
            skin.img1.visible = false;
            skin.img2.visible = true;
            skin.txt.color = "#A1572F";
        } else {
            skin.img1.visible = true;
            skin.img2.visible = false;
            skin.txt.color = "#e4bb87";
        }
    }
    private isInit:boolean;
    protected onInit() {
        this.isInit = true;
        // MainModel.Ins.mainMask = true;
        // this.isPlay = false;
        // this.setAuto(false);

        if(!HuYouModel.Ins.isAuto){
            this.setAuto(false);
        }
        this._ui.txt_money1.text = MainModel.Ins.mRoleData.getVal(ECellType.GouYu) + "";
        this._ui.txt_money2.text = MainModel.Ins.mRoleData.getVal(ECellType.DaoQi) + "";
        this._ui.txt_money3.text = MainModel.Ins.mRoleData.getVal(ECellType.QiYun) + "";
        this._ui.txt_money4.text = MainModel.Ins.mRoleData.getVal(ECellType.GOLD) + "";
        Laya.stage.on(Laya.Event.MOUSE_UP,this,this.onStageUp);
        HuYouModel.Ins.on(HuYouModel.UPDATA_VIEW,this,this.updataView);
        HuYouModel.Ins.on(HuYouModel.UPDATA_VIEW_Level,this,this.updataViewLv1);
        HuYouModel.Ins.on(HuYouModel.UPDATA_VIEW_Item,this,this.updataViewItem);
        // 限时礼包按钮是否显示
        ActivityModel.Ins.on(ActivityEvent.PopWinUpdate,this,this.onPop);

        // if(HuYouModel.Ins.tabSelIndex == 0){
        // }else{
        this.tabsCtl.selectIndex = 0;
        // }
        this._checkBoxCtl.selected = false;
        for(let i:number = 1;i<9;i++){
            this._ui["img_liang" + i].visible = false;
        }
        this._ui.txt_dragdec.visible = false;
        this._ui.listcontainer.visible = false;
        this._ui.sanjiao.rotation = 0;
        this.curIndex = 0;
        this.selectIndex(this.curIndex);
        this.updataView();
        this.updataDuiHuan();

        // AvatarFactory.getAvatar()
        let _avatar: AvatarMainView = AvatarFactory.getStandUiMainAvatar();
        this._avatar = _avatar;
        this._ui.heroContainer.addChild(_avatar);

    }

    private onPop() {
        ActivityModel.Ins.onPop(this.packUid, this._ui.btn_xslb);
    }

    protected onExit() {
        Laya.stage.off(Laya.Event.MOUSE_UP,this,this.onStageUp);
        HuYouModel.Ins.off(HuYouModel.UPDATA_VIEW,this,this.updataView);
        HuYouModel.Ins.off(HuYouModel.UPDATA_VIEW_Level,this,this.updataViewLv1);
        HuYouModel.Ins.off(HuYouModel.UPDATA_VIEW_Item,this,this.updataViewItem);
        Laya.timer.clear(this,this.onUpdataViewItem);
        ActivityModel.Ins.off(ActivityEvent.PopWinUpdate,this,ActivityModel.Ins.onPop);
        this.timeCtl.stop();
        // this.setAuto(false);
        MainModel.Ins.event(MainEvent.AddHero);
        for(let i:number = 1;i<7;i++){
            this["_eff" + i].stop();
        }
        // this.isPlay = false;
        this._animCtl.stop();
        this._animCtl.baseSkel.visible = false;
        this._animCtl.dispose();
        // MainModel.Ins.mainMask = false;
        if(this._avatar){
            this._avatar.dispose();
            this._avatar = null;
        }
        // spineRes.GC();
    }
    protected mMainSnapshot = true;
    private getVal(l:stCellValue[],type:ECellType){
        for(let i = 0;i < l.length;i++){
            let cell = l[i];
            if(cell.id == type){
                return cell.count;
            }
        }
        return 0;
    }

    private updataViewItem(value:stCellValue[]){
        Laya.timer.once(1000,this,this.onUpdataViewItem,[value]);
    }

    private onUpdataViewItem(value:stCellValue[]){
        if (!this._ui.destroyed && this._animCtl.baseSkel) {

            let spNum = this.getVal(value,ECellType.DaoQi);
            let gyNum = this.getVal(value,ECellType.GouYu);
        
        
        /*
        if(this._spCtl){
            this._spCtl.setText("icon_13","+"+ spNum,"h");
        }
        if(gyNum > 0){
            if(this._gyCtl){
                this._gyCtl.setText("icon_13","+"+ gyNum,"h");
            }
            if(this._fyEff){
                this._fyEff.play(1);
            }
        }else{
            if(this._fyEff){
                this._fyEff.play(2);
            }
        }
        */
            this._animCtl.baseSkel.visible = true;
            this._animCtl.playHappy(spNum, gyNum);
        }
    }

    private onStageUp(){

    }

    private updataView(){
        this.updataQiFu();
        this.updataFuYou();
    }

    public isPlay:boolean;
    private updataViewLv(lv:number){
        this.isPlay = true;
        let index:number=0;
        if(HuYouModel.Ins.isAuto && HuYouModel.Ins.wtSelect2){
            if(lv >= 4){
                index = lv + 1;
                if(index > 6){
                    this.setSucc(lv);
                }else{
                    this._ui["bg" + index].visible = false;
                    this["_eff" + index].play(0,false,this,this.setSucc,[lv]);
                }
            }else{
                let len = 4 -lv;
                for(let i:number=0;i<len;i++){
                    this._ui["bg" + (i+lv+1)].visible = false;
                    if(i == len - 1){
                        this["_eff" + (i+lv+1)].play(0,false,this,this.setSucc,[i]);
                    }else{
                        this["_eff" + (i+lv+1)].play(0,false);
                    }
                }
            }
        }else if(!HuYouModel.Ins.isAuto && this._checkBoxCtl.selected){
            if(lv >= 4){
                index = lv + 1;
                if(index > 6){
                    this.setSucc(lv);
                }else{
                    this._ui["bg" + index].visible = false;
                    this["_eff" + index].play(0,false,this,this.setSucc,[lv]);
                }
            }else{
                let len = 4 -lv;
                for(let i:number=0;i<len;i++){
                    this._ui["bg" + (i+lv+1)].visible = false;
                    if(i == len - 1){
                        this["_eff" + (i+lv+1)].play(0,false,this,this.setSucc,[i]);
                    }else{
                        this["_eff" + (i+lv+1)].play(0,false);
                    }
                }
            }
        }else{
            index = lv + 1;
            if(index > 6){
                this.setSucc(lv);
            }else{
                this._ui["bg" + index].visible = false;
                this["_eff" + index].play(0,false,this,this.setSucc,[lv]);
            }
        }
    }

    private setSucc(lv:number){
        if(HuYouModel.Ins.level == 0){
            let len = lv+1;
            if(len > 6){
                len = 6;
            }
            for(let i:number=1;i<=len;i++){
                this._ui["bg" + i].visible = true;
                this["_eff" + i].play(2,false,this,this.effOK);
            }
        }else{
             this.effOK();
        }
    }

    private updataViewLv1(lv:number){
        this.isPlay = true;
        let type = 0;
        if(lv == 6){//满级播放大特效
            type = 2;
        }else if(HuYouModel.Ins.level > lv){//祈福成功
            type = 1;
        }else{//祈福失败
            type = 0;
        }
        let index = lv + 1;
        switch(type){
            case 0://祈福失败
                this._ui["bg" + index].visible = false;
                this["_eff" + index].play(2,false,this,this.effOK);
                for(let i:number = 1;i <= lv;i++){
                    this["_eff" + i].play(3,false);
                }
                break;
            case 1://祈福成功
                if(HuYouModel.Ins.isAuto && HuYouModel.Ins.wtSelect2){
                    if(lv >= 4){
                        this._ui["bg" + index].visible = false;
                        this["_eff" + index].play(0,false,this,this.effOK);
                    }else{
                        let len = 4 - lv;
                        for(let i:number=0;i<len;i++){
                            this._ui["bg" + (i+lv+1)].visible = false;
                            if(i == len - 1){
                                this["_eff" + (i+lv+1)].play(0,false,this,this.effOK,[i]);
                            }else{
                                this["_eff" + (i+lv+1)].play(0,false);
                            }
                        }
                    }
                }else if(!HuYouModel.Ins.isAuto && this._checkBoxCtl.selected){
                    if(lv >= 4){
                        this._ui["bg" + index].visible = false;
                        this["_eff" + index].play(0,false,this,this.effOK);
                    }else{
                        let len = 4 - lv;
                        for(let i:number=0;i<len;i++){
                            this._ui["bg" + (i+lv+1)].visible = false;
                            if(i == len - 1){
                                this["_eff" + (i+lv+1)].play(0,false,this,this.effOK,[i]);
                            }else{
                                this["_eff" + (i+lv+1)].play(0,false);
                            }
                        }
                    }
                }else{
                    this._ui["bg" + index].visible = false;
                    this["_eff" + index].play(0,false,this,this.effOK);
                }
                break;
            case 2://满级播放大特效
                for(let i:number = 1;i <= 6;i++){
                    this["_eff" + i].play(4,false,this,this.effOK);
                }
                break;
        }
        
        
    }

    private effOK(){
        this.isPlay = false;
        this.updataQiFu();
    }

    //***************************************************** 祈福 *****************************************/
    private itemRender(item:GridItemView){
        item.ctl.setBagData(item.dataSource,true,false,true);
    }

    private itemRender1(item:GridItemView){
        item.ctl.setBagData(item.dataSource,true,true,true);
    }

    private onBtnlevelUpClick(){
        if(HuYouModel.Ins.isAuto){
            this.setAuto(false);
            E.ViewMgr.ShowMidError(E.getLang("HuYou_tips1"));
            return;
        }
        if(this.isPlay){
            return;
        }
        XianShiLiBaoModel.Ins.sendCmd(XianShiLiBaoType.Qifu);
        if(this._checkBoxCtl.selected && HuYouModel.Ins.level < 4){
            let typeList = HuYouGetStageProxy.Ins.getListByType(1);
            if(!MainModel.Ins.isItemEnoughSt(typeList[0].f_UpgradeCost,true)){
                return;
            }
        }else{
            if(HuYouModel.Ins.freeCount <= 0){
                let typeList = HuYouGetStageProxy.Ins.getListByType(0);
                let cfg;
                for(let ele in typeList){
                    if(parseInt(typeList[ele].f_ItemID) == HuYouModel.Ins.level){
                        cfg = typeList[ele];
                        break;
                    }
                }
                if(cfg.f_UpgradeCost != ""){
                    if(!MainModel.Ins.isItemEnoughSt(cfg.f_UpgradeCost,true)){
                        return;
                    }
                }
            }
        }
        
        let req:BlessingOnce_req = new BlessingOnce_req();
        req.isPay = this._checkBoxCtl.selected ? 1:0;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onBtntujianbtnClick(){
        if(HuYouModel.Ins.isAuto){
            this.setAuto(false);
            E.ViewMgr.ShowMidError(E.getLang("HuYou_tips1"));
            return;
        }
        if(this.isPlay){
            E.ViewMgr.ShowMidError("正在祈福中");
            return;
        }
        E.ViewMgr.Open(EViewType.CIFU_ZHUANHUAN);
    }

    private onBtnSheZhiClick(){
        if(HuYouModel.Ins.isAuto){
            this.setAuto(false);
            E.ViewMgr.ShowMidError(E.getLang("HuYou_tips1"));
            return;
        }
        E.ViewMgr.Open(EViewType.CIFU_SHEZHI);
    }

    private onBtnAttrClick(){
        E.ViewMgr.Open(EViewType.AttrShow,null,HuYouModel.Ins.getSuitAttrShow());
    }

    private onBtnXslbClick(){
        ActivityModel.Ins.diamondEject(this.packUid);
    }

    private onBlessingLevel(){
        let req:BlessingLevel_req = new BlessingLevel_req();
        SocketMgr.Ins.SendMessageBin(req);
    }

    private updataQiFu(){
        if(!this.UI|| this.UI && this.UI.destroyed){
            return;
        }
        if(!this.isPlay){
            if(HuYouModel.Ins.level == 6){
                Laya.timer.once(500,this,this.onBlessingLevel);
            }
            for(let i:number=1;i<7;i++){
                if(HuYouModel.Ins.level >= i){
                    if(!this["_eff" + i].anim.isPlaying){
                        this["_eff" + i].play(1,true);
                    }
                    this._ui["bg" + i].visible = false;
                }else{
                    this["_eff" + i].stop();
                    this._ui["bg" + i].visible = true;
                }
            }
            // for(let i:number=2;i<7;i++){
            //     if(HuYouModel.Ins.level >= i){
            //         this._ui["img" + i].visible = true;
            //     }else{
            //         this._ui["img" + i].visible = false;
            //     }
            // }

            let list:GridItemVo[] = [];
            let len = HuYouCfgProxy.Ins.GetDataById(1).f_StorageMax;
            let bagList = HuYouModel.Ins.getBagList(HuYouModel.BagEnmu.noSort_FY);
            for(let i:number=0;i<len;i++){
                let vo = new GridItemVo();
                let data = bagList[i];
                if(data){
                    vo.isNull = false;
                    vo.init(data);
                }else{
                    vo.isNull = true;
                }
                list.push(vo);
            }
            this._ui.list.array = list;
            this._ui.txt_num2.text = bagList.length + "/" + len;
        }

        this.updataMoneyRes();

        if(HuYouModel.Ins.freeCount){
            DotManager.addDot(this._ui.tab1);
            DotManager.addDot(this._ui.levelUpBtn);
            this._ui.txt_time.text = "";
            this._ui.txt_freeNum.text = "免费次数" + HuYouModel.Ins.freeCount + "/" + HuYouCfgProxy.Ins.GetDataById(1).f_FreeTimes;
        }else{
            DotManager.removeDot(this._ui.levelUpBtn);
            DotManager.removeDot(this._ui.tab1);
            this._ui.txt_freeNum.text = "";
            this.refreshTime();
        }
    }

    private updataMoneyRes(){
        let typeList = HuYouGetStageProxy.Ins.getListByType(0);
        let cfg;
        for(let ele in typeList){
            if(parseInt(typeList[ele].f_ItemID) == HuYouModel.Ins.level){
                cfg = typeList[ele];
                break;
            }
        }
        this._ui.levelUpBtnLabel.x = 105;
        if(cfg.f_UpgradeCost == ""){
            this._ui.money3.text = "";
            this._ui.img_moneyIcon1.visible = false;
            this._ui.img_moneyIcon.visible = true;
        }else{
            if(HuYouModel.Ins.level < 4){
                if(this._checkBoxCtl.selected || HuYouModel.Ins.wtSelect2){
                    this._ui.img_moneyIcon1.visible = true;
                    this._ui.img_moneyIcon.visible = false;
                    cfg = HuYouGetStageProxy.Ins.getListByType(1)[0];
                    this._ui.money3.text = cfg.f_UpgradeCost.split("-")[1];
                }else{
                    if(HuYouModel.Ins.freeCount){
                        this._ui.money3.text = "";
                        this._ui.img_moneyIcon1.visible = false;
                        this._ui.img_moneyIcon.visible = false;
                        this._ui.levelUpBtnLabel.x = 63;
                    }else{
                        this._ui.money3.text = cfg.f_UpgradeCost.split("-")[1];
                        this._ui.img_moneyIcon1.visible = false;
                        this._ui.img_moneyIcon.visible = true;
                    }
                }
            }else{
                if(HuYouModel.Ins.freeCount){
                    this._ui.money3.text = "";
                    this._ui.img_moneyIcon1.visible = false;
                    this._ui.img_moneyIcon.visible = false;
                    this._ui.levelUpBtnLabel.x = 63;
                }else{
                    this._ui.money3.text = cfg.f_UpgradeCost.split("-")[1];
                    this._ui.img_moneyIcon1.visible = false;
                    this._ui.img_moneyIcon.visible = true;
                }
            }
        }
        typeList = HuYouGetStageProxy.Ins.getListByType(1);
        this._ui.txt_num.text = typeList[0].f_UpgradeCost.split("-")[1];
    }

    private refreshTime(){
        this.timeCtl.start(HuYouModel.Ins.startTime,new Laya.Handler(this,this.onUpdateTime),new Laya.Handler(this,this.refreshTime));
    }
    private onUpdateTime(){
        if(!this._ui.destroyed){
            let time_str = TimeUtil.subTime(this.timeCtl.tickVal);
            this.timeCtl.setText(time_str + E.getLang("TimeSub"));
        }
    }

    private onAutoHandler() {
        if(!this._ui.destroyed){
            this._ui.chilun.rotation += 1;
        }
    }

    public setAuto(v:boolean){
        HuYouModel.Ins.isAuto = v;
        if(v){
            if(!this._ui.destroyed){
                Laya.timer.frameLoop(1,this,this.onAutoHandler);
                this.setLabe("祈福中");
            }
            this.wtSendCmd();
        }else{
            Laya.timer.clear(this,this.onAutoHandler);
            Laya.timer.clear(this,this.wtSendCmd);
            HuYouModel.Ins.wtSelect1 = HuYouModel.Ins.wtSelect2 = false;
            if(!this._ui.destroyed){
                this.setLabe("祈福");
                this.updataMoneyRes();
            }
        }
        HuYouModel.Ins.event(HuYouModel.UPDATA_AUTO);
    }

    private setLabe(str:string){
        if(this._ui && !this._ui.destroyed){
            this._ui.levelUpBtnLabel.text = str;
        }
    }

    private wtSendCmd(){
        if(!HuYouModel.Ins.isAuto){
            Laya.timer.clear(this,this.wtSendCmd);
            return;
        }
        if(this.isPlay){
            Laya.timer.once(500,this,this.wtSendCmd);
            return;
        }
        let len = HuYouCfgProxy.Ins.GetDataById(1).f_StorageMax;
        let bagList = HuYouModel.Ins.getBagList(HuYouModel.BagEnmu.noSort_FY);
        if(bagList.length >= len){
            this.setAuto(false);
            E.ViewMgr.ShowMidError("福佑背包已满");
            return;
        }
        if(HuYouModel.Ins.wtSelect2 && HuYouModel.Ins.level < 4){
            let typeList = HuYouGetStageProxy.Ins.getListByType(1);
            if(!MainModel.Ins.isItemEnoughSt(typeList[0].f_UpgradeCost,true)){
                this.setAuto(false);
                return;
            }
        }else{
            if(HuYouModel.Ins.freeCount <= 0){
                let typeList = HuYouGetStageProxy.Ins.getListByType(0);
                let cfg;
                for(let ele in typeList){
                if(parseInt(typeList[ele].f_ItemID) == HuYouModel.Ins.level){
                        cfg = typeList[ele];
                        break;
                    }
                }
                if(cfg.f_UpgradeCost == ""){
                    // let req:BlessingAuto_req = new BlessingAuto_req();
                    // req.qua = HuYouModel.Ins.wtQua;
                    // req.isFlag = HuYouModel.Ins.wtSelect1 ? 1:0;
                    // req.isPay = HuYouModel.Ins.wtSelect2 ? 1:0;
                    // SocketMgr.Ins.SendMessageBin(req);
                    Laya.timer.once(500,this,this.wtSendCmd);
                    return;
                }
                if(!MainModel.Ins.isItemEnoughSt(cfg.f_UpgradeCost,true)){
                    this.setAuto(false);
                    return;
                }
            }
        }
        
        let req:BlessingAuto_req = new BlessingAuto_req();
        req.qua = HuYouModel.Ins.wtQua;
        req.isFlag = HuYouModel.Ins.wtSelect1 ? 1:0;
        req.isPay = HuYouModel.Ins.wtSelect2 ? 1:0;
        SocketMgr.Ins.SendMessageBin(req);
        Laya.timer.once(500,this,this.wtSendCmd);
    }

    //***************************************************** 福佑 *****************************************/
    
    private updataFuYou(){
        let soltNum = HuYouSlotProxy.Ins.getSlotNum();
        let equipList = HuYouModel.Ins.getBagList(HuYouModel.BagEnmu.sort_FY);
        for(let i:number = 1;i<9;i++){
            if(soltNum >= i){
                this._ui["suo" + i].visible = false;
            }else{
                this._ui["suo" + i].visible = true;
                this._ui["txt_suo" + i].text = "Lv." +  HuYouSlotProxy.Ins.getCfgByCount(i).f_PlayerLevel + "解锁";
            }
            if(equipList){
                let vo = equipList.find(item => (item as stItem).pos == i);
                if(vo){
                    let voo = new GridItemVo();
                    voo.isNull = false;
                    voo.init(vo);
                    (this["_item" + i] as GridItemCtl).setVisible(true);
                    (this["_item" + i] as GridItemCtl).setQuaVis(false);
                    (this["_item" + i] as GridItemCtl).setBagData(voo,true,true);
                    this._ui["img_line" + i].visible = true;
                    this._ui["txt_lv" + i].visible = true;
                    this._ui["txt_lv" + i].text = voo.getName() + " " + "lv." + voo.stItem.level;
                }else{
                    (this["_item" + i] as GridItemCtl).setVisible(false);
                    this._ui["img_line" + i].visible = false;
                    this._ui["txt_lv" + i].visible = false;
                }
            }else{
                (this["_item" + i] as GridItemCtl).setVisible(false);
                this._ui["img_line" + i].visible = false;
                this._ui["txt_lv" + i].visible = false;
            }

            if(HuYouModel.Ins.isDotEquip(i)){
                DotManager.addDot(this._ui["red"+ i],30,-10);
            }else{
                DotManager.removeDot(this._ui["red"+ i]);
            }
        }

        
        let list:GridItemVo[] = [];
        let len = HuYouCfgProxy.Ins.GetDataById(1).f_StorageMax;
        let qua = this.btnlist[this.curIndex].cfg.f_QualityID;
        let bagList = HuYouModel.Ins.getBagList(HuYouModel.BagEnmu.noSort_FY);
        let showList:stItem[];
        if(qua == 0){
            showList = bagList;
        }else{
            showList = [];
            for(let ele of bagList){
                let itemCfg = ItemProxy.Ins.getCfg(ele.id);
                if(qua == itemCfg.f_qua){
                    showList.push(ele);
                }
            }
        }
        for(let i:number=0;i<len;i++){
            let vo = new GridItemVo();
            let data = showList[i];
            if(data){
                vo.isNull = false;
                vo.init(data);
            }else{
                vo.isNull = true;
            }
            list.push(vo);
        }
        this._ui.list1.array = list;
        this._ui.list1.page = 0;
        this.setBtn();
        // this._ui.txt_num1.text = showList.length + "/" + len;

        if(HuYouModel.Ins.isDotEquipAll()){
            DotManager.addDot(this._ui.tab2);
        }else{
            DotManager.removeDot(this._ui.tab2);
        }
    }

    private onBtnLClick(){
        this._ui.list1.page --;
        this.setBtn();
    }

    private onBtnRClick(){
        this._ui.list1.page ++;
        this.setBtn();
    }

    private setBtn(){
        let index:number = this._ui.list1.page + 1;
        if(index <= 1){
            this._ui.btn_l.disabled = true;
        }else{
            this._ui.btn_l.disabled = false;
        }
        if(index >= this._ui.list1.totalPage){
            this._ui.btn_r.disabled = true;
        }else{
            this._ui.btn_r.disabled = false;
        }
        if(this._ui.list1.totalPage != 0){
            this._ui.lab_page.text = index + "/" + this._ui.list1.totalPage;
        }else{
            this._ui.lab_page.text = "1/1"
        }
    }

    //***************************************************** 兑换 *****************************************/
    private itemDuiHuanRender(item:HuYouDuiHuanItem){
        item.setData(item.dataSource);
    }

    private updataDuiHuan(){
        this._ui.list2.array = HuYouShopProxy.Ins.List;
    }
}