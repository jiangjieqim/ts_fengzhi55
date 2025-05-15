import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { TabControl } from "../../../../../frame/view/TabControl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { SocketMgr } from "../../../../network/SocketMgr";
import { OpenServerAdventureRank_req } from "../../../../network/protocols/BaseProto";
import { DotManager } from "../../common/DotManager";
import { ActivityModel } from "../../huodong/ActivityModel";
import { ActivityEvent } from "../../huodong/model/ActivityEvent";
import { ActivityVo } from "../../huodong/model/ActivityVo";
import { EActivityType } from "../../huodong/model/EActivityType";
import { KaiFuChongBangCtl } from "../item/KaiFuChongBangCtl";
import { KaiFuChongBangCtl1 } from "../item/KaiFuChongBangCtl1";
import { KaiFuChongBangItem1 } from "../item/KaiFuChongBangItem1";
import { KaiFuChongBangItem2 } from "../item/KaiFuChongBangItem2";
import { KaiFuChongBangItem3 } from "../item/KaiFuChongBangItem3";
import { KaiFuChongBangModel } from "../model/KaiFuChongBangModel";
import { KFCBAdvantureRewardProxy } from "../proxy/KaiFuChongBangProxy";

export class KaiFuChongBangView extends ViewBase{
    private _ui:ui.views.kaifuchongbang.ui_KaiFuChongBangViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;

    // private tabsCtl:TabControl = new TabControl();
    // private tabList: any;

    private _activityVo:ActivityVo;

    private _timeCtl:TimeCtl;

    private _item:KaiFuChongBangCtl1;

    private _item1:KaiFuChongBangCtl;
    private _item2:KaiFuChongBangCtl;
    private _item3:KaiFuChongBangCtl;

    protected onAddLoadRes() {
        this.addAtlas("jjc.atlas");
        this.addAtlas("kaifuchongbang.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.kaifuchongbang.ui_KaiFuChongBangViewUI;
            this.bindClose(this._ui.btn_close);
            ButtonCtl.Create(this._ui.btn_rank,new Laya.Handler(this,this.onBtnRankClick));

            this._ui.tab1.visible = this._ui.tab2.visible = this._ui.tab3.visible = false;
            this._ui.view2.visible = false;
            this._ui.view3.visible = false;
            // const tabsSkin = [this._ui.tab1,this._ui.tab2,this._ui.tab3];
            // this.tabList = ["开服排行","冲关奖励","助力礼包"];
            // this.tabsCtl.init(tabsSkin, new Laya.Handler(this,this.onTabSelectHandler), new Laya.Handler(this, this.itemTabHandler));

            this._timeCtl = new TimeCtl(this._ui.timetf);

            this._ui.list.itemRender = KaiFuChongBangItem2;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onItemHandler);

            this._ui.list_lb.itemRender = KaiFuChongBangItem3;
            this._ui.list_lb.renderHandler = new Laya.Handler(this,this.onItemHandler1);

            this._item = new KaiFuChongBangCtl1(this._ui.item);
            this._item1 = new KaiFuChongBangCtl(this._ui.item2);
            this._item2 = new KaiFuChongBangCtl(this._ui.item1);
            this._item3 = new KaiFuChongBangCtl(this._ui.item3);

            this._ui.list_rank.itemRender = KaiFuChongBangItem1;
            this._ui.list_rank.renderHandler = new Laya.Handler(this,this.onItemRender);
        }
    }

    // private itemTabHandler(tabSkin, index: number, sel: boolean, data){
    //     let skin: ui.views.fujiang.ui_mTabUI = tabSkin;
    //     skin.lab.text = this.tabList[index];
    //     if (sel) {
    //         skin.img1.visible = true;
    //         skin.img2.visible = false;
    //         skin.lab.color = "#BE7641";
    //     } else {
    //         skin.img1.visible = false;
    //         skin.img2.visible = true;
    //         skin.lab.color = "#FFEFC5";
    //     }
    // }

    // private onTabSelectHandler(v:number){
    //     switch(v){
    //         case 0:
    //             this._ui.view1.visible = true;
    //             this._ui.view2.visible = false;
    //             this._ui.view3.visible = false;
    //             break;
    //         case 1:
    //             this._ui.view1.visible = false;
    //             this._ui.view2.visible = true;
    //             this._ui.view3.visible = false;
    //             break;
    //         case 2:
    //             this._ui.view1.visible = false;
    //             this._ui.view2.visible = false;
    //             this._ui.view3.visible = true;
    //             break;
    //    }
    // }

    protected onInit(): void {
        ActivityModel.Ins.on(ActivityEvent.UpdateData,this,this.updataView);
        KaiFuChongBangModel.Ins.on(KaiFuChongBangModel.UpdataView_Rank,this,this.updataView);
        // this.tabsCtl.selectIndex = 0;
        let req:OpenServerAdventureRank_req = new OpenServerAdventureRank_req;
        SocketMgr.Ins.SendMessageBin(req);
    }

    protected onExit(): void {
        ActivityModel.Ins.off(ActivityEvent.UpdateData,this,this.updataView);
        KaiFuChongBangModel.Ins.off(KaiFuChongBangModel.UpdataView_Rank,this,this.updataView);
        this._timeCtl.stop();
    }

    private updataView(){
        this._activityVo = ActivityModel.Ins.getVo(EActivityType.KaiFuChongBang);
        if(!this._activityVo)return;
        let time = this._activityVo.vo.endtime - TimeUtil.serverTime;
        if (time > 0) {
            this._timeCtl.start(time, new Laya.Handler(this, this.onUpdateTime), new Laya.Handler(this, this.endTime));
        } else {
            this.endTime();
            this._timeCtl.stop();
        }
        if(KaiFuChongBangModel.Ins.isGuanKaRedTip()){
            DotManager.addDot(this._ui.tab2);
        }else{
            DotManager.removeDot(this._ui.tab2);
        }
        this.updataRankView();
        this.updataVGView();
        this.updataLBView();
    }

    private onUpdateTime() {
        let time_str = TimeUtil.subTime(this._timeCtl.tickVal);
        this._timeCtl.setText(time_str);
    }

    private endTime() {
        this._timeCtl.setText("");
    }

    //************************************************************** 排行 *****************************************/
    private updataRankView(){
        let arr = [];
        for(let i:number=0;i<KaiFuChongBangModel.Ins.rankList.length;i++){
            if(KaiFuChongBangModel.Ins.rankList[i].ranking > 3){
                arr.push(KaiFuChongBangModel.Ins.rankList[i]);
            }
        }
        this._ui.list_rank.array = arr;
        if(KaiFuChongBangModel.Ins.self.length){
            this._ui.item.visible = true;
            this._item.setData(KaiFuChongBangModel.Ins.self[0],2);
        }else{
            this._ui.item.visible = false;
        }

        for(let i:number=0;i<3;i++){
            if(KaiFuChongBangModel.Ins.top3[i]){
                this["_item" + (i+1)].setData(KaiFuChongBangModel.Ins.top3[i]);
            }else{
                this["_item" + (i+1)].setData(null);
            }
        }
    }

    private onItemRender(item:KaiFuChongBangItem1){
        item.ctl.setData(item.dataSource);
    }

    private onBtnRankClick(){
        E.ViewMgr.Open(EViewType.KaiFuChongBangAwardView);
    }

    //************************************************************** 冲关 *****************************************/
    private updataVGView(){
        let array = [];
        let arr = KFCBAdvantureRewardProxy.Ins.List;
        for(let i:number=0;i<arr.length;i++){
            if(arr[i].f_Type == 1){
                array.push(arr[i]);
            }
        }
        this._ui.list.array = array;
    }

    private onItemHandler(item:KaiFuChongBangItem2){
        item.setData(item.dataSource);
    }

    //************************************************************** 礼包 *****************************************/
    private updataLBView(){
        let array = [];
        let arr = KFCBAdvantureRewardProxy.Ins.List;
        for(let i:number=0;i<arr.length;i++){
            if(arr[i].f_Type == 2){
                array.push(arr[i]);
            }
        }
        this._ui.list_lb.array = array;
    }

    private onItemHandler1(item:KaiFuChongBangItem3){
        item.setData(item.dataSource);
    }
}