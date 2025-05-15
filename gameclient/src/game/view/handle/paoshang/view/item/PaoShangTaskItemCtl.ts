/* @Author: tsy
 * @Date: 2023-02-28 11:56:51
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2023-10-17 17:28:05
*/
import {ColorUtil} from "../../../../../../frame/util/ColorUtil";
import {TimeUtil} from "../../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../../ui/layaMaxUI";
import { E } from "../../../../../G";
import { DoMissions_req, stMission } from "../../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../../network/SocketMgr";
import {DotManager} from "../../../common/DotManager";
import { ItemViewFactory } from "../../../main/model/ItemViewFactory";
import { MainModel } from "../../../main/model/MainModel";
import { ECellType } from "../../../main/vos/ECellType";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";
import { PaoShangModel } from "../../model/PaoShangModel";
import { PaoShangMissionListProxy } from "../../proxy/PaoShangProxy";

export class PaoShangTaskItemCtl{
    private skin: ui.views.paoshang.ui_paoshangTaskItemUI;

    constructor(skin:ui.views.paoshang.ui_paoshangTaskItemUI) {
        this.skin = skin;
        this.skin.box1.visible = false;
        ButtonCtl.Create(this.skin.btn,new Laya.Handler(this,this.onClick));
    }
    
    private onClick(){
        if(this._data){
            // let num = MainModel.Ins.mRoleData.getVal(ECellType.BOX);
            // let cfg = PaoShangMissionListProxy.Ins.getCfgByMissionID(this._data.missionId);
            // if(num > 2000 && cfg.f_MissionType == 2){
            //     E.ViewMgr.ShowMidError("您的宝箱已经堆积如山");
            //     return;
            // }
            if(PaoShangModel.Ins.freeStationNum){
                let req:DoMissions_req = new DoMissions_req();
                req.missionIds = [this._data.uid];
                SocketMgr.Ins.SendMessageBin(req);
            }else{
                E.ViewMgr.ShowMidError(E.getLang("paoshangtips1"));
            }
        }
    }

    private _data:stMission;
    public setData(value:stMission){
        if(!value)return;
        this._data = value;
        if(value.type){
            this.skin.filters =  ColorUtil.CreateColorFilter(1);
            this.skin.lab_ycf.visible = true;
            this.skin.box.visible = false;
        }else{
            this.skin.box.visible = true;
            this.skin.lab_ycf.visible = false;
            this.skin.filters =  [];
        }
        let cfg = PaoShangMissionListProxy.Ins.getCfgByMissionID(value.missionId);
        let itemVo = ItemViewFactory.convertItemList(cfg.f_MissionRewards)[0];
        ItemViewFactory.refreshSlot(this.skin.item,itemVo);
        this.skin.txt_name.text = itemVo.getName();
        this.skin.txt_time.text = TimeUtil.getTimeShow(cfg.f_MissionTime);
        let arr = cfg.f_PassportCost.split("-");
        this.skin.img_icon.skin = IconUtils.getIconByCfgId(parseInt(arr[0]));
        this.skin.txt_num.text = arr[1];
        for(let i:number=1;i<=5;i++){
            if(i <= cfg.f_MissionQuality){
                this.skin["img_s" + i].visible = true;
            }else{
                this.skin["img_s" + i].visible = false;
            }
        }
        this.skin.box_star.x = (200 - cfg.f_MissionQuality * 25) * 0.5 - 5;

        if(PaoShangModel.Ins.isDotTXZ()){
            DotManager.addDot(this.skin.btn,20,-10);
        }else{
            DotManager.removeDot(this.skin.btn);
        }
    }
}
