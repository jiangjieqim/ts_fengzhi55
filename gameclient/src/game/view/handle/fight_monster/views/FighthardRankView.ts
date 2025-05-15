import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { stTeamFightPlayer, TeamFightRankList_req } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import { PlusCtl } from "../../avatar/ctl/PlusCtl";
import { ChengHaoListProxy } from "../../chenghao/proxy/ChengHaoProxy";
import { MainModel } from "../../main/model/MainModel";
import { FightMonsterModel } from "../vos/FightMonsterModel";

class RankItem extends ui.views.fighthard.ui_fighthard_rank_itemUI{
    private _plusCtl:PlusCtl = new PlusCtl();
    constructor(){
        super();
    }
    public refresh(){
        let _cellData:stTeamFightPlayer = this.dataSource;

        if(_cellData.rank <= 3){ 
            this.mingcitf.visible = false;
            this.paiming.skin = "remote/main/main/dfjjc_mc" + _cellData.rank + ".png";

        }else{
            this.paiming.skin = `remote/fighthard/dfjjc_mc.png`;
            this.mingcitf.visible = true;
            this.mingcitf.text = _cellData.rank + "";
        }

        this.head.titleIcon.visible = false;
        this.head.lvtf.text = 'Lv.' + _cellData.lv + "";
        // this.head.icon.skin = MainModel.Ins.convertHead(_cellData.headUrl);
        MainModel.Ins.setTTHead(this.head.icon,MainModel.Ins.convertHead(_cellData.headUrl));
        this.nametf.text = _cellData.name;
        this.img_title.skin =  ChengHaoListProxy.Ins.getIcon(_cellData.titleId);
        this._plusCtl.setPlus(this.toplug,_cellData.plus);
        this.countTf.text = _cellData.accHarm + "";
        // E.getLang("fihthard01") + ":" + StringUtil.val2m(
    }
}

/**鏖战排行榜 */
export class FighthardRankView extends ViewBase {
    protected mMask:boolean = true;
    private _ui:ui.views.fighthard.ui_fighthard_rankUI;
    private model:FightMonsterModel;
    private _plusCtl:PlusCtl = new PlusCtl();

    protected onAddLoadRes(): void { 
        this.addAtlas("jjc.atlas");

    }
    protected onExit(): void { 
        this.model.off(FightMonsterModel.EVENT_RANK_LIST,this,this.onRankUpdate);
    }
    protected onFirstInit(): void { 
        if(!this.UI){
            this.model = FightMonsterModel.Ins;
            this.UI = this._ui = new ui.views.fighthard.ui_fighthard_rankUI();
            this.bindClose(this._ui.close1);
            this._ui.list1.itemRender = RankItem;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onRankItem);
            this._ui.list1.array = [];
            ButtonCtl.CreateBtn(this._ui.rewardBtn,this,this.onRewardHandler);
        }
    }

    private onRankItem(item:RankItem){
        item.refresh();
    }

    private onRewardHandler(){
        E.ViewMgr.Open(EViewType.FighthardReward);
    }
    private updateSelf(item: ui.views.fighthard.ui_fighthard_rank_owner_itemUI) {
        let rankVal: number = this.model.data.ranking;

        if (rankVal == 0) {
            item.mingcitf.visible  = true;
            item.paiming.skin = "";
            item.mingcitf.text = E.getLang("fihthard04");
        } else {
            if (rankVal <= 3) {
                item.mingcitf.visible = false;
                item.paiming.skin = "remote/main/main/dfjjc_mc" + rankVal + ".png";
            } else {
                item.mingcitf.text = rankVal + "";
                item.paiming.skin = `remote/fighthard/dfjjc_mc.png`;
                item.mingcitf.visible = true;
                item.mingcitf.text = rankVal + "";
            }
        }

        item.head.titleIcon.visible = false;
        item.head.lvtf.text = 'Lv.' + MainModel.Ins.mRoleData.lv + "";

        // item.head.icon.skin = MainModel.Ins.mRoleData.headUrl;
        MainModel.Ins.setTTHead(item.head.icon, MainModel.Ins.mRoleData.headUrl);
        item.nametf.text = MainModel.Ins.mRoleData.getName();
        item.img_title.skin = MainModel.Ins.getTitleImg();
        item.countTf.text = this.model.data.accHarm + "";//E.getLang("fihthard01") + ":" + StringUtil.val2m(this.model.data.accHarm);
    }
    protected onInit(): void {
        this.updateSelf(this._ui.self);
        this.model.on(FightMonsterModel.EVENT_RANK_LIST,this,this.onRankUpdate);
        let req = new TeamFightRankList_req();
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onRankUpdate(){
        this._ui.list1.array = this.model.rankList;
        this._ui.list1.scrollTo(0);
        this._plusCtl.setPlus(this._ui.self.toplug,this.model.plus);
    }
}