import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { ClubReward_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { WeiXinNormalStyle } from "../../main/views/icon/WeiXinPyqCtl";
import { WeiXinNormalStyle2 } from "../../main/views/icon/WeiXinPyqCtl2";
import { ItemVo } from "../../main/vos/ItemVo";
import { ActivityModel } from "../ActivityModel";
import { System_CommunityProxy, System_RefreshTimeProxy } from "../model/ActivityProxy";

const YouXiQuanMenu = [
    { txt: 'yxq' },
    { txt: 'wjq' },
    { txt: 'gzh' },
    { txt: 'sph' },
];

//游戏圈-公众号主界面
export class YouXiQuanLiBaoView extends ViewBase{
    private _ui:ui.views.huodong.ui_game_clubUI;
    private pyq1: WeiXinNormalStyle2;
    protected mMask = true;
    protected autoFree = true;
    protected  onAddLoadRes(){
        this.addAtlas('gameclub.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.huodong.ui_game_clubUI;
            this.bindClose(this._ui.btn_close);
            this._ui.list_menu.itemRender = ui.views.huodong.ui_game_club_menu_itemUI;
            this._ui.list_menu.renderHandler = new Laya.Handler(this,this.onItemHandler);
            this._ui.list_menu.array = YouXiQuanMenu;

            this._ui.list_join.itemRender = ui.views.main.ui_slot_itemUI;
            this._ui.list_join.renderHandler = new Laya.Handler(this,this.onRewardItemHandler);
            this._ui.list_join.array = System_CommunityProxy.Ins.getCfgById(1).f_taskrewards.split('|');
            this._ui.list_like.itemRender = ui.views.main.ui_slot_itemUI;
            this._ui.list_like.renderHandler = new Laya.Handler(this,this.onRewardItemHandler);
            this._ui.list_like.array = System_CommunityProxy.Ins.getCfgById(2).f_taskrewards.split('|');
            this._ui.list_publish.itemRender = ui.views.main.ui_slot_itemUI;
            this._ui.list_publish.renderHandler = new Laya.Handler(this,this.onRewardItemHandler);
            this._ui.list_publish.array = System_CommunityProxy.Ins.getCfgById(3).f_taskrewards.split('|');

            this.btnList.push(
                ButtonCtl.Create(this._ui.btn_join,new Laya.Handler(this,this.onBtnClick, [1])),
                ButtonCtl.Create(this._ui.btn_like,new Laya.Handler(this,this.onBtnClick, [2])),
                ButtonCtl.Create(this._ui.btn_publish,new Laya.Handler(this,this.onBtnClick, [3])),
                ButtonCtl.Create(this._ui.auth_btn,new Laya.Handler(this,this.onAuthClick))
            )
            const btns = [this._ui.btn_join, this._ui.btn_like, this._ui.btn_publish];
            btns.forEach(o => {
                o.disabled = true;
            });
            this.showPage(1);
            this._ui.auth_btn.visible = false;
        }
    }

    private onAuthClick() {
        E.sdk.getAuth((res) => {
            if (!res?.authSetting?.['scope.gameClubData']) {
                //E.ViewMgr.ShowMidError("游戏圈数据未授权成功2");
            }
        });
    }

    private onBtnClick(fid) {
        let req: ClubReward_req = new ClubReward_req();
        req.id = fid;
        req.type = 1;//0获得奖励 1领取奖励
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onRewardItemHandler(item:ui.views.main.ui_slot_itemUI, fid: number) {
        let vo = new ItemVo();
        vo.cfgId = parseInt(item.dataSource.split("-")[0]);
        vo.count = parseInt(item.dataSource.split("-")[1]);
        ItemViewFactory.refreshSlot(item,vo);
        item.scaleX = item.scaleY = 0.8;
    }

    private onItemHandler(item:ui.views.huodong.ui_game_club_menu_itemUI, index:number){
        const data = YouXiQuanMenu[index];
        item.fx_tf.text = E.getLang(data.txt);
        item.on(Laya.Event.CLICK,this,this.onClick, [index]);

    }

    private showPage(index: number) {
        for (let i = 1; i <= YouXiQuanMenu.length; i++) {
            this._ui[`group${i}`].visible = i === index ? true : false;
            const item = this._ui.list_menu.getCell(i - 1) as any;
            if (i === index) {
                item.fx_tf.color = '#9f540c';
                item.btn_mf.skin = `remote/gameclub/yq_1.png`;
            } else {
                item.fx_tf.color = '#ffffff';
                item.btn_mf.skin = `remote/gameclub/yq_2.png`;
            }
        }
    }

    private onClick(index) {
        this.showPage(index+1);
    }

    private setGameClubBtn() {
        if (ActivityModel.Ins.gameClubAuth) {
            this._ui.auth_btn.visible = false;
        } else {
            E.ViewMgr.ShowMidError("游戏圈数据未授权成功");
            this._ui.auth_btn.visible = true;
        }
        const arr = [
            { btn: this._ui.btn_join, fid: 1, key: 'join', txt: this._ui.join_tf, count: ActivityModel.Ins.gameClubData.join },
            { btn: this._ui.btn_like, fid: 2, key: 'like', txt: this._ui.like_tf, title: this._ui.title_like, count: ActivityModel.Ins.gameClubData.like },
            { btn: this._ui.btn_publish, fid: 3, key: 'publish', txt: this._ui.publish_tf, title: this._ui.title_publish, count: ActivityModel.Ins.gameClubData.publish },
        ];
        const revcDatas = MainModel.Ins.clubReward?.dataList;
        arr.forEach(item => {
            const revcData = revcDatas.find(o => o.id === item.fid);
            const cfg = System_CommunityProxy.Ins.getCfgById(item.fid);
            if (!revcDatas?.length || revcData.state === 3) {
                // 功能未开放
                item.btn.disabled = true;
            } else if (revcData.state === 1) {
                item.btn.disabled = true;
                item.txt.text = '已领取';
            } else {
                if (item.count >= cfg.f_taskvalue) {
                    // 任务达成，可领取
                    item.btn.disabled = false;
                } else {
                    // 任务未达成，不可领取
                    item.btn.disabled = true;
                }
                item.txt.text = '领取';
            }
            if (item.title) {
                item.title.text = E.LangMgr.getLang(item.key, cfg.f_taskvalue, item.count, cfg.f_taskvalue);
            }
        });
    }

    private onWxOnShow() {
        if (MainModel.Ins.clubReward?.dataList?.find(o => o.state !== 1)) {
            // 游戏圈礼包未领取时，需要跟新任务数据
            MainModel.Ins.getGameClubData();
        }
    }

    protected onInit(){
        MainModel.Ins.on(MainEvent.ClubReward,this,this.setGameClubBtn);
        MainModel.Ins.on(MainEvent.GameClubUpdate,this,this.setGameClubBtn);
        MainModel.Ins.on(MainEvent.WxOnShow,this,this.onWxOnShow);
        MainModel.Ins.getGameClubData();
      
    }

    protected onShow(){
        super.onShow();
        if (this.pyq1) {
            this.pyq1.onVisible(true);
        } else {
            Laya.timer.once(100, this, () => {
                this.createPyq();
            });
        }
    }

    protected onExit(){
        MainModel.Ins.off(MainEvent.ClubReward,this,this.setGameClubBtn);
        MainModel.Ins.off(MainEvent.GameClubUpdate,this,this.setGameClubBtn);
        MainModel.Ins.off(MainEvent.WxOnShow,this,this.onWxOnShow);
        if (this.pyq1) {
            this.pyq1.onVisible(false);
        }
    }

    /**朋友圈按钮 */
    private createPyq() {
        if (System_RefreshTimeProxy.Ins.getNumberVal(40)) {
            let pyq1: WeiXinNormalStyle2 = new WeiXinNormalStyle2();
            pyq1.setSkin(this._ui.btn);
            pyq1.onVisible(true);
            this.pyq1 = pyq1;
        } else {
            this._ui.btn.visible = false;
        }
    }
}