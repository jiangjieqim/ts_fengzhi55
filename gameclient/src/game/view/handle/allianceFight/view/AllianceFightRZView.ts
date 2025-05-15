import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { SocketMgr } from "../../../../network/SocketMgr";
import { AllianceWarCityLog_req, stAllianceWarCityLog } from "../../../../network/protocols/BaseProto";
import { MainModel } from "../../main/model/MainModel";
import { AllianceFightModel } from "../model/AllianceFightModel";
import { AllianceWarBasePointProxy, AllianceWarCityProxy } from "../proxy/AllianceFightProxy";

export class AllianceFightRZView extends ViewBase{
    private _ui:ui.views.allianceFight.ui_allianceFightRZViewUI;
    protected mMask = true;
    protected mMainSnapshot = true;

    protected onAddLoadRes() {
        this.addAtlas('allianceFight.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.allianceFight.ui_allianceFightRZViewUI;
            this.bindClose(this._ui.close1);

            this._ui.list.itemRender = ui.views.allianceFight.ui_allianceFightRZItemUI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);
        }
    }

    private onRenderHandler(item:ui.views.allianceFight.ui_allianceFightRZItemUI){
        let data:stAllianceWarCityLog = item.dataSource;
        // item.icon.skin = MainModel.Ins.convertHead(data.headUrl);
        MainModel.Ins.setTTHead(item.icon,MainModel.Ins.convertHead(data.headUrl));
        item.lab_time.text = TimeUtil.getTimeShow(TimeUtil.serverTime - data.unix) + "前";
        let bcfg:Configs.t_Alliance_War_BasePoint_dat = AllianceWarBasePointProxy.Ins.GetDataById(data.cityFID);
        let ccfg:Configs.t_Alliance_War_City_dat = AllianceWarCityProxy.Ins.getCfgByType(bcfg.f_CityType);;
        if(data.playerId == MainModel.Ins.mRoleData.mPlayer.AccountId){
            switch(data.action){
                case 1:
                    item.sp.visible = true;
                    item.sp1.visible = item.sp2.visible = item.sp3.visible = item.sp4.visible = false;
                    item.lab.text = "[" + ccfg.f_cityname + "]" + bcfg.f_BaseNum + "号据点";
                    break;
                case 2:
                    item.sp1.visible = true;
                    item.sp.visible = item.sp2.visible = item.sp3.visible = item.sp4.visible = false;
                    item.lab1.text = data.allianceNameDefend + "联盟 " + data.nickNameDefend + "所在的";
                    item.lab2.text = "[" + ccfg.f_cityname + "]" + bcfg.f_BaseNum + "号据点";
                    item.lab3.text = "剩余血量" + data.lifeDefendPercent / 100 + "%";
                    break;
                case 3:
                    item.sp2.visible = true;
                    item.sp.visible = item.sp1.visible = item.sp3.visible = item.sp4.visible = false;
                    item.lab4.text = data.allianceNameDefend + "联盟 " + data.nickNameDefend;
                    item.lab5.text = "[" + ccfg.f_cityname + "]" + bcfg.f_BaseNum + "号据点";
                    break;
            }
        }else{
            switch(data.action){
                case 2:
                    item.sp3.visible = true;
                    item.sp.visible = item.sp1.visible = item.sp2.visible = item.sp4.visible = false;
                    item.lab6.text = data.allianceName + "联盟 " + data.nickName + " 击败了你";
                    item.lab7.text = "[" + ccfg.f_cityname + "]" + bcfg.f_BaseNum + "号据点";
                    break;
                case 3:
                    item.sp4.visible = true;
                    item.sp.visible = item.sp1.visible = item.sp2.visible = item.sp3.visible = false;
                    item.lab8.text = data.allianceName + "联盟 " + data.nickName + " 攻击了你所在的";
                    item.lab9.text = "[" + ccfg.f_cityname + "]" + bcfg.f_BaseNum + "号据点";
                    item.lab10.text = "剩余血量" + data.lifeDefendPercent / 100 + "%";
                    break;
            }
        }
    }

    protected onInit(): void {
        AllianceFightModel.Ins.on(AllianceFightModel.UPDATE_LOG,this,this.onUpdataView);
        let req:AllianceWarCityLog_req = new AllianceWarCityLog_req;
        SocketMgr.Ins.SendMessageBin(req);
    }

    protected onExit(): void {
        AllianceFightModel.Ins.off(AllianceFightModel.UPDATE_LOG,this,this.onUpdataView);
    }

    private onUpdataView(){
        this._ui.list.array = AllianceFightModel.Ins.logList;
    }
}