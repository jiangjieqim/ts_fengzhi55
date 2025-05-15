import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { SocketMgr } from "../../../../network/SocketMgr";
import { ActivityAction_req } from "../../../../network/protocols/BaseProto";
import { ActivityModel } from "../../huodong/ActivityModel";
import { EActivityType } from "../../huodong/model/EActivityType";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { ItemVo } from "../../main/vos/ItemVo";
import { MeiRiZhuanPanModel } from "../model/MeiRiZhuanPanModel";
import { WheelRewardsProxy } from "../proxy/MeiRiZhuanPanProxy";
import { t_Platform } from "../../main/proxy/t_Platform";

export class MeiRiZhuanPanTip2 extends ViewBase{
    private _ui:ui.views.meirizhuanpan.ui_meirizhuanpan2UI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    private _btnCtl:ButtonCtl;
    private _btn1Ctl:ButtonCtl;
    protected onAddLoadRes() {
        this.addAtlas("meirizhuanpan.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.meirizhuanpan.ui_meirizhuanpan2UI;
            this.bindClose(this._ui.close1);
            this._btnCtl = ButtonCtl.Create(this._ui.btn,new Laya.Handler(this,this.onBtnQDClick));
            this._btn1Ctl =ButtonCtl.Create(this._ui.btn1,new Laya.Handler(this,this.onBtn1QDClick));
        }
    }

    private onBtnQDClick(){
        let vo = ActivityModel.Ins.getVo(EActivityType.DayZhuanPan);
        if(!vo)return;
        let req: ActivityAction_req = new ActivityAction_req;
        req.uid = vo.cfg.f_id;
        SocketMgr.Ins.SendMessageBin(req);
        this.Close();
    }

    private onBtn1QDClick(){
        let vo = ActivityModel.Ins.getVo(EActivityType.DayZhuanPan);
        if(!vo)return;
        E.sendTrack("ad_watch",{type:"zhuanpan_sb"});
        E.sdk.lookVideo((type: 0 | 1 | 2) => {
            switch(type) {
                case 0:
                    // ⽤户未看完取消
                    break;
                case 1:
                    // ⽤户看完⼴告
                    E.sendTrack("ad_finish",{type:"zhuanpan_sb"});
                    let req: ActivityAction_req = new ActivityAction_req;
                    req.uid = vo.cfg.f_id;
                    req.extra = "1";
                    SocketMgr.Ins.SendMessageBin(req);
                    this.Close();
                    break;
                case 2:
                    // 拉取⼴告错误
                    break;
            }
        });
    }

    protected onInit(): void {
        let st;
        let cfg:Configs.t_Wheel_Rewards_dat = WheelRewardsProxy.Ins.List.find(ele => ele.f_id === this.Data);
        if(!cfg)return;
        if(cfg.f_ischoose == 1){
            let arr = cfg.f_Rewards.split("|");
            for(let i:number=0;i<arr.length;i++){
                let id = parseInt(arr[i].split("-")[0]);
                if(id == MeiRiZhuanPanModel.Ins.setItemId){
                    st = arr[i];
                    break;
                }
            }
        }else{
            st = cfg.f_Rewards;
        }
        let vo:ItemVo = new ItemVo;
        vo.cfgId = parseInt(st.split("-")[0]);
        vo.count = parseInt(st.split("-")[1]);
        ItemViewFactory.refreshSlot(this._ui.item,vo);
        this._ui.lab.text = vo.count + "";
        if(cfg.f_isad == 1 && !t_Platform.Ins.isADclose){
            this._ui.btn1.visible = true;
            this._btnCtl.setpos(58,332);
            this._ui.lab_title.visible = true;
        }else{
            this._ui.btn1.visible = false;
            this._btnCtl.setpos(185,332);
            this._ui.lab_title.visible = false;
        }
    }

    protected onExit(): void {
        
    }
}