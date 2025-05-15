import { TimeCtlV2 } from "../../../../../frame/util/ctl/TimeCtlV2";
import {StringUtil} from "../../../../../frame/util/StringUtil";
import {TimeUtil} from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { CheckBoxCtl, ICheckBoxSkin } from "../../../../../frame/view/CheckBoxCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { GetRide_req } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import {DotManager} from "../../common/DotManager";
import { DuanWuModel } from "../../duanwu/DuanWuModel";
import { ActivityModel } from "../../huodong/ActivityModel";
import { ActivityEvent } from "../../huodong/model/ActivityEvent";
import { VipModel, VipType } from "../../huodong/model/VipModel";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { RedEnum } from "../../main/model/RedEnum";
import { RedUpdateModel } from "../../main/model/RedUpdateModel";
import { ECellType } from "../../main/vos/ECellType";
import { EClientType } from "../../sdk/ClientType";
import { EZuoQi, ZuoqiChouQuResult } from "../vos/EZuoQi";
import { IconUtils } from "../vos/IconUtils";
import { ZuoQiEvent } from "../vos/ZuoQiEvent";
import { ZuoQiModel } from "../ZuoqiModel";

class ZuoqiJuanCtl{
    private _itemId:number = 0; 
    private img:Laya.Image;
    private tf:Laya.Label;
    private bHorseItem:boolean = false;
    // private count:number;
    public type:EZuoQi;
    constructor(img:Laya.Image,tf:Laya.Label){
        this.img = img;
        this.tf = tf;
    }
    public action(itemId:number,bo:boolean){
        if(this.type != EZuoQi.Once ){
            ZuoQiModel.Ins._bo = bo;
            ZuoQiModel.Ins._itemID = itemId;
        }
        let req:GetRide_req = new GetRide_req();
        req.type = this.type;
        req.itemId = itemId;
        SocketMgr.Ins.SendMessageBin(req);     
    }
    public get itemId(){
        return this._itemId;
    }
    /**
     * @param goldNeed 元宝需要的数量
     * @param horseItemNeed 坐骑卷需要的数量
     */
    public refresh(goldNeed:number,horseItemNeed:number,type:EZuoQi){
        this.type = type;
        if(!this.img.visible){
            return;
        }
        let id = ECellType.HorseItemId;

        let have = MainModel.Ins.mRoleData.getVal(id);

        if(have >= horseItemNeed){
            //使用道具
            
            this.img.skin = IconUtils.getIconByCfgId(id);
            this.tf.text = horseItemNeed.toString();
            this.bHorseItem = true;
            this._itemId = id;
        }else{
            //使用元宝
            let goldCfgId:number = ECellType.GOLD;
            this.bHorseItem = false;
            this.img.skin = IconUtils.getIconByCfgId(goldCfgId);
            this.tf.text = goldNeed + "";
            this._itemId = goldCfgId; 
            let have = MainModel.Ins.mRoleData.gold;
            if(have < goldNeed){
                this.tf.color = "#ff0000";
            }else{
                this.tf.color = "#F9F0BB";
            }
        }
    }

    public set visible(v:boolean){
        this.img.visible = this.tf.visible = v;
    }
}

export class ZuoQiChouQuView extends ViewBase{
    protected uiBgCloseClick:boolean = true;
    protected autoFree:boolean = true;
    private _ui:ui.views.zuoqi.ui_zuoqi_chouquUI;
    // private cfg:Configs.t_Mount_Gacha_dat;
    private model:ZuoQiModel;
    protected mMask:boolean = true;
    private _timeCtl:TimeCtlV2;
    private _result:ZuoqiChouQuResult;
    
    private leftCtl:ZuoqiJuanCtl;
    private rightCtl:ZuoqiJuanCtl;
    private freeCtl:ButtonCtl;
    private huodongCtl:ButtonCtl;
    private _checkBoxCtl1:CheckBoxCtl;
    private _checkBoxCtl2:CheckBoxCtl;
    protected onAddLoadRes(): void{
        this.addAtlas("zuoqi.atlas");
    }
    /**离开处理 */
    protected onExit(): void{
        this._timeCtl.stop();
        this._timeCtl.off(Laya.Event.COMPLETE,this,this.onTimeComplete);
        MainModel.Ins.off(MainEvent.ValChange,this,this.updateMoney);
        this.model.off(ZuoQiEvent.TimeChange,this,this.updateMoney);
        ActivityModel.Ins.off(ActivityEvent.OpenCloseStatusUpdate,this,this.onACtivityEvt)
    }
    /**这里在加载完资源后调用-建议只处理资源相关的逻辑*/
    protected onFirstInit(): void{
        if(!this.UI){
            this.model = ZuoQiModel.Ins;
            this.UI = this._ui = new ui.views.zuoqi.ui_zuoqi_chouquUI();
            this.setMouseBg(this._ui.bg1);
            this.freeCtl = ButtonCtl.Create(this._ui.xunzaoBtn,new Laya.Handler(this,this.onOnceChou));
            this.btnList.push(
                ButtonCtl.Create(this._ui.threeBtn,new Laya.Handler(this,this.onThreeChou)),
                ButtonCtl.Create(this._ui.close1,new Laya.Handler(this,this.Close)),
                ButtonCtl.Create(this._ui.addbtn,new Laya.Handler(this,this.onAddGold),false),
                ButtonCtl.Create(this._ui.tips,new Laya.Handler(this,this.onTipsHandler)),
                ButtonCtl.Create(this._ui.btn_tj,new Laya.Handler(this,this.onBtnTJHandler)),
                ButtonCtl.Create(this._ui.btn_dh,new Laya.Handler(this,this.onBtnDHHandler))
            );
            this.huodongCtl = ButtonCtl.CreateBtn(this._ui.huodongbtn,this,this.gotoHuoDong);
            this.btnList.push(this.huodongCtl,this.freeCtl);
            
            this._timeCtl = new TimeCtlV2(this._ui.timetf,"{0}"+E.LangMgr.getLang("TimeSub"));
            this.leftCtl = new ZuoqiJuanCtl(this._ui.ybicon,this._ui.ybtf1);
            this.leftCtl.type = EZuoQi.Once;
            this.rightCtl = new ZuoqiJuanCtl(this._ui.rightYuanBaoIcon,this._ui.threeTf);

            this._checkBoxCtl1 = new CheckBoxCtl({bg:this._ui.bg_1,gou:this._ui.gou_1} as ICheckBoxSkin);
            this._checkBoxCtl1.selected = false;

            this._checkBoxCtl2 = new CheckBoxCtl({bg:this._ui.bg_2,gou:this._ui.gou_2} as ICheckBoxSkin);
            this._checkBoxCtl2.selectHander = new Laya.Handler(this,this.onselectHander);
        }
    }

    private onselectHander(){
        if(this._checkBoxCtl2.selected){
            RedUpdateModel.Ins.save(RedEnum.ZUOQI_SHILIAN,1);
        }else{
            RedUpdateModel.Ins.save(RedEnum.ZUOQI_SHILIAN,0);
        }
        this.updateMoney();
    }

    private gotoHuoDong(){
        DuanWuModel.Ins.open();
        this.Close();
    }

    private onTimeComplete(){
        this._ui.timetf.text = "";
    }
    private onTipsHandler(){
        E.ViewMgr.openHelpView("ZuoQiTitle","ZuoQiDesc");
    }

    private onBtnTJHandler(){
        E.ViewMgr.Open(EViewType.zuoqitujian);
    }

    private onBtnDHHandler(){
        E.ViewMgr.Open(EViewType.ZuoQiShopView);
    }

    private onAddGold(){
        MainModel.Ins.openGold();
    }

    /**抽一次 */
    private onOnceChou(){
        let itemId:number = 0;
        if(!this.model.hasFreeTime){
            itemId = this.leftCtl.itemId;
        }
        this.leftCtl.action(itemId,this._checkBoxCtl1.selected);
    }

    /**三抽 */
    private onThreeChou(){
        this.rightCtl.action(this.rightCtl.itemId,this._checkBoxCtl1.selected);
    }

    /**初始化*/
    protected onInit(): void{
        let vo = RedUpdateModel.Ins.getByID(RedEnum.ZUOQI_SHILIAN);
        if (vo && vo.type == 1) {
            this._checkBoxCtl2.selected = true;
            this.rightCtl.type = EZuoQi.Ten;
        }else{
            this._checkBoxCtl2.selected = false;
            this.rightCtl.type = EZuoQi.Three;
        }

        if(initConfig.clienttype == EClientType.Discount){
            let Mount10 = VipModel.Ins.getVipTQByType(VipType.Mount10);
            let MountAuto = VipModel.Ins.getVipTQByType(VipType.MountAuto);
            if(Mount10 == -1){
                this._ui.bg_2.visible = this._ui.lab_2.visible = false;
                if(MountAuto == -1){
                    this._ui.bg_1.visible = this._ui.lab_1.visible = false;
                }else{
                    this._ui.bg_1.visible = this._ui.lab_1.visible = true;
                    this._ui.bg_1.x = 373;
                    this._ui.lab_1.x = 412;
                }
            }else{
                this._ui.bg_2.visible = this._ui.lab_2.visible = true;
                if(MountAuto == -1){
                    this._ui.bg_1.visible = this._ui.lab_1.visible = false;
                    this._ui.bg_2.x = 373;
                    this._ui.lab_2.x = 412;
                }else{
                    this._ui.bg_1.visible = this._ui.lab_1.visible = true;
                    this._ui.bg_1.x = 436;
                    this._ui.lab_1.x = 472;
                    this._ui.bg_2.x = 284;
                    this._ui.lab_2.x = 319;
                }
            }
        }else{
            this._ui.bg_1.visible = this._ui.lab_1.visible = true;
            this._ui.bg_2.visible = this._ui.lab_2.visible = false;
            this._ui.bg_1.x = 373;
            this._ui.lab_1.x = 412;
        }

        MainModel.Ins.on(MainEvent.ValChange,this,this.updateMoney);
        this.model.on(ZuoQiEvent.TimeChange,this,this.updateMoney);
        ActivityModel.Ins.on(ActivityEvent.OpenCloseStatusUpdate,this,this.onACtivityEvt)
        this.updateMoney();
    }

    private onACtivityEvt(){
        this.updateMoney();
    }

    private onUpdateJuan(){
        this._ui.juanzhoutf.text = StringUtil.val2m(MainModel.Ins.mRoleData.getVal(ECellType.HorseItemId));
    }

    private updateMoney(){
        let _result:ZuoqiChouQuResult = this.model.getSubTime();
        this._result = _result;

        this.onUpdateJuan();

        if(this.model.hasFreeTime){
            this.onTimeComplete();
            //  this._timeCtl.stop();
            this._ui.ybtf1.text = "";
            //免费
            this._ui.ybicon.visible = false;
            this._ui.xunzhaotf.text = E.LangMgr.getLang("Free");
            this.leftCtl.visible = false;
            DotManager.addDot(this.freeCtl.skin);
        }else{
            this.leftCtl.visible = true;
            this._ui.ybicon.visible = true;
            this._ui.xunzhaotf.text = E.LangMgr.getLang("FindOnce");//寻找一次

            this._timeCtl.once(Laya.Event.COMPLETE,this,this.onTimeComplete);
            this._timeCtl.start(_result.time-TimeUtil.serverTime);
            // this._ui.ybtf1.text = _result.freeItemVo.count + "";//左边免费按钮的文本
            this.leftCtl.refresh(_result.freeItemVo.count,1,EZuoQi.Once);
            DotManager.removeDot(this.freeCtl.skin);
        }
        this._ui.goldtf.text = StringUtil.val2m(MainModel.Ins.mRoleData.gold);

        if(this._result.isShowDiscount){
            this._ui.zhekouImg.visible = true;
        }else{
            this._ui.zhekouImg.visible = false;
        }
        if(this._checkBoxCtl2.selected){
            this.rightCtl.refresh(_result.tenNeedCount,10,EZuoQi.Ten);
            this._ui.xunbao3Btn.text = "寻找十次";
        }else{
            this.rightCtl.refresh(_result.threeNeedCount,3,EZuoQi.Three);
            this._ui.xunbao3Btn.text = "寻找三次";
        }
        if(_result.isShowDiscount){
            if(this._checkBoxCtl2.selected){
                this._ui.oldGoldTf.text = E.getLang("oldprice")+`${_result.tenOldCount}`;
            }else{
                this._ui.oldGoldTf.text = E.getLang("oldprice")+`${_result.threeOldCount}`;
            }
            this._ui.zhekouTf.text = E.getLang("limitdiscount",_result.discount);
        }
        if(DuanWuModel.Ins.isOpen){
            this.huodongCtl.visible = true;
        }else{
            this.huodongCtl.visible = false;
        }

    }
}