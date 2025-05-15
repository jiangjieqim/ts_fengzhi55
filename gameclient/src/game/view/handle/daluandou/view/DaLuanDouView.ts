import { MRichText } from "../../../../../frame/util/RichLabelUtil";
import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { Reward_req, SmashEnroll_req, SmashFightOpenReq_req, SmashFightUpdataRep_req, stSmashFightLang } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { FontClipCtl } from "../../avatar/ctl/FontClipCtl";
import { ChengHaoModel } from "../../chenghao/model/ChengHaoModel";
import { DotManager } from "../../common/DotManager";
import { MainModel } from "../../main/model/MainModel";
import { EFightType } from "../../main/vos/ECellType";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { DaLuanDouModel } from "../model/DaLuanDouModel";
import { DaLuanDouProxy } from "../proxy/DaLuanDouProxy";
import { ChatLineUI } from "./ChatLineUI";

export class DaLuanDouView extends ViewBase{
    private _ui:ui.views.daluandou.ui_daluandouUI;
    protected mMask = true;
    protected autoFree = true;
    protected mMainSnapshot = true;
    private _ctl1:FontClipCtl;
    private _ctl2:FontClipCtl;
    private _ctl3:FontClipCtl;

    private _ctl_1:FontClipCtl;
    private _ctl_2:FontClipCtl;

    private _richText:MRichText;

    protected onAddLoadRes() {
        this.addAtlas('daluandou.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.daluandou.ui_daluandouUI;
            this.bindClose(this._ui.close1);
            this.btnList.push(
            ButtonCtl.Create(this._ui.btn_bm,new Laya.Handler(this,this.onBtnBMClick)),
            ButtonCtl.Create(this._ui.btn_lq,new Laya.Handler(this,this.onBtnLQClick)));
            
            this._ctl1 = new FontClipCtl(IconUtils.dldAtlasPrefix);
            this._ctl2 = new FontClipCtl(IconUtils.dldAtlasPrefix);
            this._ctl3 = new FontClipCtl(IconUtils.dldAtlasPrefix);

            this._ctl_1 = new FontClipCtl(IconUtils.dldAtlasPrefix);
            this._ctl_2 = new FontClipCtl(IconUtils.dldAtlasPrefix);

            //聊天内容条目容器
			this._ui.panel_dec.vScrollBarSkin = "";//滚动条隐藏
			this._ui.panel_dec.vScrollBar.isVertical = true;//滚动条的方向为垂直滚动
			this._ui.panel_dec.vScrollBar.elasticBackTime = 100;//设置橡皮筋回弹时间
			this._ui.panel_dec.vScrollBar.elasticDistance = 10;//设置橡皮筋回弹距离
        }
    }

    protected onInit() {
        this._chatMsgTotalHeight = 0;
        this._ui.panel.scrollTo(0,0);
        DaLuanDouModel.Ins.on(DaLuanDouModel.UPDATA_VIEW,this,this.onUpdataView);
        DaLuanDouModel.Ins.on(DaLuanDouModel.UPDATA_VIEW_BM,this,this.onUpdataViewBM);
        DaLuanDouModel.Ins.on(DaLuanDouModel.UPDATA_VIEW_SEVER,this,this.onUpdataViewServer);
        let req:SmashFightOpenReq_req = new SmashFightOpenReq_req();
        SocketMgr.Ins.SendMessageBin(req);
    }

    protected onExit() {
        DaLuanDouModel.Ins.off(DaLuanDouModel.UPDATA_VIEW,this,this.onUpdataView);
        DaLuanDouModel.Ins.off(DaLuanDouModel.UPDATA_VIEW_BM,this,this.onUpdataViewBM);
        DaLuanDouModel.Ins.off(DaLuanDouModel.UPDATA_VIEW_SEVER,this,this.onUpdataViewServer);
    }

    private onBtnBMClick(){
        let req:SmashEnroll_req = new SmashEnroll_req();
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onBtnLQClick(){
        let req:Reward_req = new Reward_req();
        req.type = EFightType.DLD;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onUpdataViewServer(){
        let req:SmashFightUpdataRep_req = new SmashFightUpdataRep_req;
        req.round = DaLuanDouModel.Ins.round;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onUpdataViewBM(){
        this._ui.lab_bm.text = "已报名";
        this._ui.btn_bm.mouseEnabled = false;
        DotManager.removeDot(this._ui.lab_bm);
    }

    private onUpdataView(value:number){
        let st = "";
        if(DaLuanDouModel.Ins.crossServers.length){
            let time =  DaLuanDouModel.Ins.startTime - TimeUtil.serverTime;
            if(time > 0){
                let num = Math.ceil(time / 86400);
                st = "\n\n6、跨服大乱斗将在" + num + "天后开启";
            }else{
                st = "\n\n6、本次大乱斗参与服务器为：" + DaLuanDouModel.Ins.crossServers[0] + "-" + 
                DaLuanDouModel.Ins.crossServers[1] + "服";
            }
        }
        this._ui.lab_dec.text = E.LangMgr.getLang("dldTip1") + st;

        let t1 = TimeUtil.serverTime - TimeUtil.curZeroTime - 3600 * 20;
        if(t1 >= 0){
            this._ui.lab_ss.text = "今日连杀排行"
        }else{
            this._ui.lab_ss.text = "昨日连杀排行"
        }
        for(let i:number=1;i<4;i++){
            let vo = DaLuanDouModel.Ins.smashTopWinnerList.find(ele => ele.position == i);
            if(vo){
                // this._ui["icon" + i].skin = MainModel.Ins.convertHead(vo.portrait);
                MainModel.Ins.setTTHead(this._ui["icon" + i], MainModel.Ins.convertHead(vo.portrait));

                this._ui["img_t_" + i].skin = ChengHaoModel.Ins.getTitleImg(vo.titleId);
                this._ui["Lvtf" + i].text = "lv" + vo.level;
                this._ui["name" + i].text = vo.name;
                this._ui["box_" + i].visible = true;
                this["_ctl" + i].setValue(this._ui["num" + i],vo.streakTimes.toString(),"middle");
            }else{
                this._ui["icon" + i].skin = "";
                this._ui["img_t_" + i].skin = "";
                this._ui["Lvtf" + i].text = "";
                this._ui["name" + i].text = "虚位以待";
                this._ui["box_" + i].visible = false;
            }
        }

        DotManager.removeDot(this._ui.lab_bm);
        if(DaLuanDouModel.Ins.isReward){
            if(DaLuanDouModel.Ins.openType == 1|| DaLuanDouModel.Ins.openType == 4){
                this._ui.panel.visible = true;
                this._ui.lab_title.text = "大乱斗规则";
                this._ui.panel_dec.visible = false;
            }else{
                if(DaLuanDouModel.Ins.smashFightList.length == 0){
                    this._ui.panel.visible = true;
                    this._ui.lab_title.text = "大乱斗规则";
                    this._ui.panel_dec.visible = false;
                }else{
                    this._ui.panel.visible = false;
                    this._ui.lab_title.text = "大乱斗战报";
                    this._ui.panel_dec.visible = true;
                    this.uodataPanelAll(value);
                }
            }
            this._ui.box1.visible = false;
            this._ui.box2.visible = true;
            this._ui.btn_lq.visible = true;
            this.setAward();
            DotManager.addDot(this._ui.btn_lq,20,-13);
        }else{
            DotManager.removeDot(this._ui.btn_lq);
            switch(DaLuanDouModel.Ins.openType){//活动状态 1报名阶段 2战斗阶段 3结束阶段 4报名结束战斗前
                case 1:
                    this._ui.box1.visible = true;
                    this._ui.box2.visible = false;
                    this._ui.panel.visible = true;
                    this._ui.lab_title.text = "大乱斗规则";
                    this._ui.panel_dec.visible = false;
                    if(DaLuanDouModel.Ins.isEnroll){//是否报名 0 未报名 1已报名
                        this._ui.lab_bm.text = "已报名";
                        this._ui.btn_bm.mouseEnabled = false;
                    }else{
                        this._ui.lab_bm.text = "报名";
                        this._ui.btn_bm.mouseEnabled = true;
                        DotManager.addDot(this._ui.lab_bm,20,-25);
                    }
                    this._ui.btn_lq.visible = false;
                    break;
                case 2:
                    if(DaLuanDouModel.Ins.isEnroll){
                        this._ui.panel.visible = false;
                        this._ui.lab_title.text = "大乱斗战报";
                        this._ui.panel_dec.visible = true;
                        this._ui.box1.visible = false;
                        this._ui.box2.visible = true;
                        this.setAward();
                        this.uodataPanelAll(value);
                        this._ui.btn_lq.visible = false;
                    }else{
                        this.setView();
                    }
                    break;
                case 3:
                    if(DaLuanDouModel.Ins.isEnroll){
                        this._ui.panel.visible = false;
                        this._ui.lab_title.text = "大乱斗战报";
                        this._ui.panel_dec.visible = true;
                        this._ui.box1.visible = false;
                        this._ui.box2.visible = true;
                        this.setAward();
                        this.uodataPanelAll(value);
                        this._ui.btn_lq.visible = true;
                    }else{
                        this.setView();
                    }
                    break;
                case 4:
                    this.setView();
                    break;
            }
        }
    }

    private setView(){
        this._ui.box1.visible = true;
        this._ui.box2.visible = false;
        this._ui.panel.visible = true;
        this._ui.lab_title.text = "大乱斗规则";
        this._ui.panel_dec.visible = false;
        this._ui.lab_bm.text = "报名结束";
        this._ui.btn_bm.mouseEnabled = false;
        this._ui.btn_lq.visible = false;
    }

    private setAward(){
        this._ctl_1.setValue(this._ui.sp1,DaLuanDouModel.Ins.fightResult.streakTimes.toString(),"middle");
        this._ctl_2.setValue(this._ui.sp2,DaLuanDouModel.Ins.fightResult.winTimes.toString(),"middle");
        this._ui.box_jl1.visible = this._ui.box_jl2.visible = false;
        for(let i:number=0;i<DaLuanDouModel.Ins.fightResult.rewardList.length;i++){
            this._ui["box_jl" + (i+1)].visible = true;
            this._ui["icon_" + (i+1)].skin = IconUtils.getIcon(DaLuanDouModel.Ins.fightResult.rewardList[i].id);
            this._ui["lab_num" + (i+1)].text = DaLuanDouModel.Ins.fightResult.rewardList[i].count + "";
        }
        if(DaLuanDouModel.Ins.fightResult.onlineRewardList.length > 0){
            this._ui.box_zx.visible = true;
            this._ui.icon_zx.skin = IconUtils.getIcon(DaLuanDouModel.Ins.fightResult.onlineRewardList[0].id);
            this._ui.lab_numzx.text = DaLuanDouModel.Ins.fightResult.onlineRewardList[0].count + "";
        }else{
            this._ui.box_zx.visible = false;
        }
        if(DaLuanDouModel.Ins.fightResult.rewardList.length == 1){
            this._ui.box_zx.y = this._ui.box_jl2.y;
        }else{
            this._ui.box_zx.y = 83;
        }
        if(DaLuanDouModel.Ins.isReward){
            this._ui.lab_lq.text = "领取";
            this._ui.btn_lq.mouseEnabled = true;
        }else{
            this._ui.lab_lq.text = "已领取";
            this._ui.btn_lq.mouseEnabled = false;
        }
    }

    private setPanel(type:number,langList:stSmashFightLang[]){
        let cfg = DaLuanDouProxy.Ins.GetDataById(type);
        let list = [];
        for(let i:number=0;i<langList.length;i++){
            let data = langList[i];
            if(data.type == 2 || data.type == 3 || data.type == 6){
                let array = data.lang.split("|");
                let st = "";
                for(let j:number=0;j<array.length;j++){
                    let arr = array[j].split("-");
                    st += "@" + arr[0] + "@" + + arr[1];
                }
                list.push(st);
            }else{
                list.push(data.lang);
            }
        }
        let chatStr = E.LangMgr.getLangArr(cfg.f_content ,list);
        let newChatStr = "";
        newChatStr += chatStr.replace(/@31@/g,"<img src='o/daluandou/31.png' style='width:24px;height:31px'></img>")
                .replace(/@3@/g,"<img src='o/daluandou/3.png' style='width:34px;height:30px'></img>")
				.replace(/@sl@/g,"<img src='o/daluandou/sl.png' style='width:42px;height:20px'></img>")
                .replace(/@lb@/g,"<img src='o/daluandou/lb.png' style='width:43px;height:21px'></img>")
        var chatLineUI:ChatLineUI = Laya.Pool.getItemByClass("chatLineUI",ChatLineUI);
        chatLineUI.init(newChatStr);
        this._ui.panel_dec.addChild(chatLineUI);
        chatLineUI.y = this._chatMsgTotalHeight;
        this._chatMsgTotalHeight += chatLineUI.height;

        this._ui.panel_dec.vScrollBar.max = this._ui.panel_dec.contentHeight;
        this._ui.panel_dec.vScrollBar.value = this._ui.panel_dec.vScrollBar.max;
    }

    private _chatMsgTotalHeight:number;
    private uodataPanelAll(value:number){
        if(value == 1){
            while(this._ui.panel_dec.numChildren){
                this._ui.panel_dec.removeChildAt(0);
            }
            this._chatMsgTotalHeight = 0;
            for(let i:number=0;i<DaLuanDouModel.Ins.smashFightList.length;i++){
                this.setPanel(DaLuanDouModel.Ins.smashFightList[i].type,DaLuanDouModel.Ins.smashFightList[i].langList);
            }
        }else{
            if(DaLuanDouModel.Ins.round == 0){
                while(this._ui.panel_dec.numChildren){
                    this._ui.panel_dec.removeChildAt(0);
                }
                this._chatMsgTotalHeight = 0;
            }
            let len = DaLuanDouModel.Ins.smashFightList.length;
            this.setPanel(DaLuanDouModel.Ins.smashFightList[len - 1].type,DaLuanDouModel.Ins.smashFightList[len - 1].langList);
        }
    }
}