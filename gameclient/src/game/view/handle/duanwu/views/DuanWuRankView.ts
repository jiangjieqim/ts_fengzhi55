import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import {TimeUtil} from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { stMountNum } from "../../../../network/protocols/BaseProto";
import { ChengHaoListProxy } from "../../chenghao/proxy/ChengHaoProxy";
import { EFeastType } from "../../gemfeast/EFeastType";
import { GemBaseModel } from "../../gemfeast/GemBaseModel";
import { MainModel } from "../../main/model/MainModel";
import { PeakShowAvatarCtl } from "../../peakjjc/PeakJjcView";
import { DuanWuEvent } from "../DuanWuEvent";
import { DuanWuRankitemView } from "./DuanWuRankitemView";
/**端午节抽卡排行榜 */
export class DuanWuRankView extends ViewBase {

    protected mMask:boolean = true;
    private model:GemBaseModel;
    private _avatarShowList:PeakShowAvatarCtl[] = [];
    private _ui: ui.views.duanwu.ui_duanwu_rankUI;
    private timeCtl:TimeCtl;
    private helpBtn:ButtonCtl;
    protected onAddLoadRes(): void { 
        this.addAtlas("jjc.atlas");
    }
    protected onExit(): void { 
        this.model.off(DuanWuEvent.RankUpdate,this,this.onRankUpdate);
        this.clearUI();
    }
    private clearUI(){
        this._ui.list1.array = [];
        for(let i = 0;i < this._avatarShowList.length;i++){
            this._avatarShowList[i].refresh(null);
        }
        this._ui.owner.visible = false;
    }
    protected onFirstInit(): void {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.duanwu.ui_duanwu_rankUI();
            this.timeCtl = new TimeCtl(this._ui.timetf);
            this.bindClose(this._ui.close1);
            ButtonCtl.CreateBtn(this._ui.rewardBtn,this,this.onRewardHandler);
            for(let i = 0;i < 3;i++){
                let cell = new PeakShowAvatarCtl();
                cell.mouseEnable = false;
                cell.skin = this._ui[`avatar${i}`];
                this._avatarShowList.push(cell);
            }
            this._ui.list1.itemRender = DuanWuRankitemView;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onDuanWuRankitemHander);
            // this._ui.descTf.text = E.getLang("duanwu06");
            this.helpBtn = ButtonCtl.CreateBtn(this._ui.help,this,this.onHelpHandler);
        }
    }
    private onHelpHandler(){
        let arr = this.model.rank_desc.split("|");
        E.ViewMgr.openHelpView(arr[0],arr[1]);
    }
    private setTime(){
        let _activityVo =  this.model.activityVo;
        if(_activityVo){
            this.timeCtl.start(_activityVo.endTime - TimeUtil.serverTime,new Laya.Handler(this,this.onUpdateTime),new Laya.Handler(this,this.onEnd));
        }
    }
    private onUpdateTime(ticket:number){
        let _s:string = TimeUtil.subTime(ticket);
        this._ui.timetf.text = _s;
    }
    private onEnd(){
        this._ui.timetf.text = "";
    }

    private onDuanWuRankitemHander(item:DuanWuRankitemView){
        item.refresh();
    }
    /**显示avatar */
    private onRankShowAvatar(){
        for(let i = 0;i < this._avatarShowList.length;i++){
            this._avatarShowList[i].skin.visible = false;
        }
        let l = this.model.rankData.top3;
        for(let i = 0;i < this._avatarShowList.length;i++){
            let vo = l[i];
            if(vo){
                let rankInfo = this.model.getRankInfo(vo.rank);
                vo.name = rankInfo.nickName;
                vo.plus = rankInfo.num;
            }
            this._avatarShowList[i].refresh(vo);//设置形象信息
        }
    }
    /**排名奖励 */
    private onRewardHandler(){
        E.ViewMgr.Open(EViewType.DuanWuRewardShow,null,this.Data);
    }

    protected onInit(): void {
        this.model = this.Data;

        switch(this.model.subType){
            case EFeastType.FuJiang:
                this._ui.bg4.skin = "remote/fujiangfeast/zqcbphb.png";
                break;
            case EFeastType.Pet:
                this._ui.bg4.skin = "remote/lingchongfeast/lccb.png";
                break;
            case EFeastType.ShenBin:
                this._ui.bg4.skin = "remote/shenbingfeast/bshdcbbg.png";
                break;
            default:
                this._ui.bg4.skin = "remote/duanwu/zqcbphb.png";
                break;
        }

        this._ui.descTf.text = E.getLang(this.model.rankBotStr);
        this._ui.tf1.text = E.getLang(this.model.rankTitleStr);
        if(this.model.rankTitleStr1 != ""){
            this._ui.tf1.text = E.getLang(this.model.rankTitleStr1);
        }
        this.model.on(DuanWuEvent.RankUpdate,this,this.onRankUpdate);
        if(this.model.rank_desc){
            this.helpBtn.visible = true; 
        }else{
            this.helpBtn.visible = false;
        }
        this.setTime();
        // let req = new MountFeastNums_req();
        // SocketMgr.Ins.SendMessageBin(req);
        this.clearUI();
        this.model.requestRank();
    }

    protected get showList(){
        let l = this.model.rankData.dataList;   
        let result = [];
        for(let i = 3;i < l.length;i++){
            result.push(l[i]);
        }
        return result;
    }

    private onRankUpdate(){
        this.onRankShowAvatar();
        this._ui.list1.array = this.showList;
        this._ui.list1.scrollTo(0);

        //自己的
        this.refreshSelfView(this._ui.owner);
    }

    private refreshSelfView(skin: ui.views.duanwu.ui_duanwu_rank_owner_itemUI) {
        if (this.model.rankData && this.model.rankData.self) {
            skin.visible = true;
            let selfData: stMountNum = this.model.rankData.self[0];
            if (selfData.ranking == 0) {
                skin.paiming.visible = false;
                skin.mingcitf.text = E.getLang("duanwu03");
            } else {
                skin.paiming.visible = true;
                let maxCont: number = 200;//parseInt(System_RefreshTimeProxy.Ins.getVal(32));
                if (selfData.ranking > maxCont) {
                    skin.mingcitf.text = maxCont + "+";
                    skin.paiming.visible = false;
                } else {
                    skin.mingcitf.text = selfData.ranking + "";
                    skin.paiming.visible = true;
                }
            }
            MainModel.Ins.setTTHead(skin.head.icon, MainModel.Ins.convertHead(selfData.headUrl));
            skin.head.titleIcon.visible = false;
            skin.nametf.text = selfData.nickName;
            skin.countTf.text = selfData.num + "";

            skin.head.lvtf.text = "Lv." + selfData.playerLevel;
            skin.img_title.skin = ChengHaoListProxy.Ins.getIcon(selfData.titleId);
        }
    }
}
