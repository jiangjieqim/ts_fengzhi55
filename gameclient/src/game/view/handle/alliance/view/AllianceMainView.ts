import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { InitConfig, PlatformConfig } from "../../../../../InitConfig";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { AllianceApplyList_req, AllianceBossRankList_req, AllianceInnerRankList_req, AllianceMember_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { AllianceFightModel } from "../../allianceFight/model/AllianceFightModel";
import { AllianceWarConfig } from "../../allianceFight/proxy/AllianceFightProxy";
import { DotManager } from "../../common/DotManager";
import { ValCtl } from "../../main/ctl/ValLisCtl";
import { ECellType } from "../../main/vos/ECellType";
import { SheZhiModel } from "../../shezhi/model/SheZhiModel";
import { AllianceModel, AlliancePosition } from "../model/AllianceModel";
import { AllianceCfgProxy } from "../proxy/AllianceProxy";
import { MemberItem } from "./item/MemberItem";
import { RankItem1 } from "./item/RankItem1";
import { ShopItem } from "./item/ShopItem";

/**
 * 同盟主页面
 */
export class AllianceMainView extends ViewBase{
    private _ui:ui.views.alliance.ui_allianceMainViewUI;
    protected mMask = true;
    protected autoFree:boolean = true;

    protected  onAddLoadRes(){
        this.addAtlas('alliance.atlas');
        this.addAtlas('huodong.atlas');
        this.addAtlas('jjc.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.alliance.ui_allianceMainViewUI;
            this.bindClose(this._ui.close1);
            ButtonCtl.CreateBtn(this._ui.set_btn,this,this.onSetHandler);
            ButtonCtl.CreateBtn(this._ui.edit_btn,this,this.onEditHandler);
            ButtonCtl.CreateBtn(this._ui.member_btn,this,this.onMemberHandler);
            ButtonCtl.CreateBtn(this._ui.boss_btn,this,this.onBossHandler);
            //ButtonCtl.CreateBtn(this._ui.rank_btn,this,this.onRankHandler);
            ButtonCtl.CreateBtn(this._ui.shop_btn,this,this.onShopHandler);
            ButtonCtl.CreateBtn(this._ui.apply_llist_btn,this,this.onApplyHandler);
            ButtonCtl.CreateBtn(this._ui.boss_fight_btn,this,this.onBossFightHandler);
            ButtonCtl.CreateBtn(this._ui.alliance_fight_btn,this,this.onAllianceFightHandler);
            
            ButtonCtl.CreateBtn(this._ui.copy_tf,this,this.onCopyHandler);

            this._ui.member_list.itemRender = MemberItem;
            this._ui.member_list.renderHandler = new Laya.Handler(this,this.onItemRender);
            this._ui.member_list.vScrollBarSkin = ' ';

            this._ui.shop_list.itemRender = ShopItem;
            this._ui.shop_list.renderHandler = new Laya.Handler(this,this.onShopItemRender);
            this._ui.shop_list.vScrollBarSkin = ' ';

            this._ui.rank_list.itemRender = RankItem1;
            this._ui.rank_list.renderHandler = new Laya.Handler(this,this.onRankRender);
            this._ui.rank_list.vScrollBarSkin = ' ';

            this._ui.apply_llist_btn.visible = false;
            this._ui.rank_btn.visible = false;

            ValCtl.Create(this._ui.lab0,this._ui.img0,ECellType.GreenDragonPiece);
            ValCtl.Create(this._ui.lab1,this._ui.img1,ECellType.AllianceLing);
            ValCtl.Create(this._ui.lab2,this._ui.img2,ECellType.Gongxun);

            this._ui.ranktf.visible = this._ui.rank_title_tf.visible = false;
        }
    }

    private onCopyHandler() {
        const alliance = AllianceModel.Ins.alliance;
        if (!alliance) return;
        const uid = alliance.uid.toString();
        // if(initConfig.platform == PlatformConfig.WeiXin){
        //     window["wx_ext"].syGetClipboardData(uid);
        // }else{
        //     SheZhiModel.Ins.setCopy(uid);
        // }
        // E.ViewMgr.ShowMidOk('复制成功');
        E.sdk.setCopy(uid);
    }

    private onBossFightHandler() {
        E.ViewMgr.Open(EViewType.AllianceBossView);
    }

    private onAllianceFightHandler() {
        AllianceFightModel.Ins.showMainPage();
    }

    private onApplyHandler() {
        E.ViewMgr.Open(EViewType.AllianceApplyView);
        let req = new AllianceApplyList_req;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onRankRender(item: RankItem1) {
        item.setData(item.dataSource);
    }

    private onItemRender(item: MemberItem) {
        item.setData(item.dataSource);
    }

    private onShopItemRender(item: ShopItem) {
        item.setData(item.dataSource);
    }

    private onSetHandler() {
        E.ViewMgr.Open(EViewType.AllianceEditView);
    }

    private onEditHandler() {
        E.ViewMgr.Open(EViewType.AllianceNoticeView);
    }

    private btnSelected(type: 'member' | 'boss' | 'rank' | 'shop') {
        const arr = [
            { type: 'member', ui: this._ui.member_btn, view: this._ui.member_block },
            { type: 'boss', ui: this._ui.boss_btn, view: this._ui.boss_block },
            { type: 'rank', ui: this._ui.rank_btn, view: this._ui.rank_block },
            { type: 'shop', ui: this._ui.shop_btn, view: this._ui.shop_block },
        ];
        for (const item of arr) {
            if (item.type === type) {
                item.ui.skin = 'remote/main/main/anniu_2.png';
                item.view.visible = true;
            } else {
                item.ui.skin = 'remote/main/main/anniu_1.png';
                item.view.visible = false;
            }
        }
    }

    /**
     * 赤壁大战报名红点
     */
    private updateRedDot() {
        if (AllianceModel.Ins.warRedState) {
            DotManager.addDot(this._ui.boss_btn);
            DotManager.addDot(this._ui.alliance_fight_btn);
        } else {
            DotManager.removeDot(this._ui.boss_btn);
            DotManager.removeDot(this._ui.alliance_fight_btn);
        }
    }

    private onMemberHandler() {
        this.btnSelected('member');
        AllianceModel.Ins.playerList = [];
        let req:AllianceMember_req = new AllianceMember_req;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onBossHandler() {
        this.btnSelected('boss');
    }

    private onRankHandler() {
        this.btnSelected('rank');
        let req:AllianceBossRankList_req = new AllianceBossRankList_req;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onShopHandler() {
        this.btnSelected('shop');
    }

    protected onInit(){
        AllianceModel.Ins.isMainViewOpened = true;
        this.onMemberHandler();
        AllianceModel.Ins.refreshShopList();
        this._ui.shop_list.array = AllianceModel.Ins.updatedShopCfgs;
        this._ui.member_list.array = AllianceModel.Ins.playerList;
        this.onAllianceUpdate();
        AllianceModel.Ins.on(AllianceModel.SHOP_UPDATE, this, this.onShopUpdate);
        AllianceModel.Ins.on(AllianceModel.BOSS_RANK_UPDATE, this, this.onBossRankUpdate);
        AllianceModel.Ins.on(AllianceModel.ALLIANCE_INFO_UPDATE, this, this.onAllianceUpdate);
        AllianceModel.Ins.on(AllianceModel.ALLIANCE_PLAYER_LIST_UPDATE, this, this.updatePlayerList);
        AllianceModel.Ins.on(AllianceModel.ALLIANCE_POSITION_UPDATE, this, this.updatePlayerPosition);
        AllianceModel.Ins.on(AllianceModel.UPDATE_BOSS_FIGHT_NUM, this, this.updateBossFightNum);
        AllianceModel.Ins.on(AllianceModel.UPDATE_WAR_RED, this, this.updateRedDot);
        this.updatePlayerPosition();
        this.updateBossFightNum();
        this.updateRedDot();
        this.updateEnrollTf();
    }

    private updateEnrollTf() {
        const conf = AllianceWarConfig.Ins.getCfg();
        const ranges = [Number(conf.f_ApplyStartDay), Number(conf.f_ApplyEndDay)];
        const days = [];
        for (const range of ranges) {
            if (range < 7) {
                days.push(TimeUtil.getDayString(range));
            } else {
                days.push(TimeUtil.getDayString(0));
            }
        }
        this._ui.enroll_tf.text = `报名时间：周${TimeUtil.getDayString(ranges[0])} ${conf.f_ApplyStartTime}到周${TimeUtil.getDayString(ranges[1])} ${conf.f_ApplyEndTime}`;
    }

    private updateBossFightNum() {
        const times = AllianceModel.Ins.bossFightNum;
        this._ui.fight_num_tf.text = E.getLang('AllianceFightWord') + times;
    }

    protected onAllianceUpdate() {
        const alliance = AllianceModel.Ins.alliance;
        if (!alliance) return;
        this._ui.name_tf.text = alliance.name;
        this._ui.idtf.text = alliance.uid + '';
        const maxNum = (AllianceCfgProxy.Ins.GetDataById(1) as Configs.t_Alliance_Config_dat).f_maxjoin;
        this._ui.numtf.text = alliance.num + '/' + maxNum;
        this._ui.ranktf.text = alliance.rank + '';
        this._ui.notice_tf.text = alliance.notice || E.getLang('NoAllianceNotice');
    }

    private onShopUpdate() {
        const updatedShopItem = AllianceModel.Ins.updatedShopItem;
        if (updatedShopItem) {
            const shopList = AllianceModel.Ins.shopList;
            const shopItem = shopList.find(o => o.fid === updatedShopItem.fid);
            if (shopItem) {
                shopItem.count = updatedShopItem.count;
            } else {
                shopList.push(updatedShopItem);
            }
            AllianceModel.Ins.shopList = shopList;
            AllianceModel.Ins.refreshShopList();
            this._ui.shop_list.array = AllianceModel.Ins.updatedShopCfgs;
        }
    }

    private onBossRankUpdate() {
        const value = AllianceModel.Ins.bossRankRevc;
        const alliance = AllianceModel.Ins.alliance;
        if (!value || !alliance) return;
        const maxNum = (AllianceCfgProxy.Ins.GetDataById(1) as Configs.t_Alliance_Config_dat).f_maxjoin;
        this._ui.my.ranktf.text = value.rank + '';
        this._ui.my.nametf.text = alliance.name;
        this._ui.my.leveltf.text = value.accHarm + '';
        this._ui.my.numtf.text = alliance.num + '/' + maxNum;
        this._ui.rank_list.array = AllianceModel.Ins.bossRankRevc.dataList;
    }

    private updatePlayerList() {
        this._ui.member_list.array = AllianceModel.Ins.playerList;
        const maxNum = (AllianceCfgProxy.Ins.GetDataById(1) as Configs.t_Alliance_Config_dat).f_maxjoin;
        this._ui.numtf.text = AllianceModel.Ins.playerList.length + '/' + maxNum;
    }

    private updatePlayerPosition() {
        const position = AllianceModel.Ins.position;
        if (position === undefined) return;
        if (position === AlliancePosition.Normal) {
            this._ui.edit_btn.visible = this._ui.set_btn.visible = this._ui.apply_llist_btn.visible = false;
        } else {
            this._ui.edit_btn.visible = this._ui.set_btn.visible = this._ui.apply_llist_btn.visible = true;
        }
    }

    protected onExit(){
        AllianceModel.Ins.isMainViewOpened = false;
        AllianceModel.Ins.off(AllianceModel.SHOP_UPDATE, this, this.onShopUpdate);
        AllianceModel.Ins.off(AllianceModel.BOSS_RANK_UPDATE, this, this.onBossRankUpdate);
        AllianceModel.Ins.off(AllianceModel.ALLIANCE_INFO_UPDATE, this, this.onAllianceUpdate);
        AllianceModel.Ins.off(AllianceModel.ALLIANCE_PLAYER_LIST_UPDATE, this, this.updatePlayerList);
        AllianceModel.Ins.off(AllianceModel.ALLIANCE_POSITION_UPDATE, this, this.updatePlayerPosition);
        AllianceModel.Ins.off(AllianceModel.UPDATE_BOSS_FIGHT_NUM, this, this.updateBossFightNum);
        AllianceModel.Ins.off(AllianceModel.UPDATE_WAR_RED, this, this.updateRedDot);
    }
}

