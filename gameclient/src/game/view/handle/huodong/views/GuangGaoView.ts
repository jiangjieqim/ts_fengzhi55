import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { AdWatchDone_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { GuaJiModel } from "../../guaji/model/GuaJiModel";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { t_Platform } from "../../main/proxy/t_Platform";
import { ItemVo } from "../../main/vos/ItemVo";
import { System_RefreshTimeProxy } from "../model/ActivityProxy";

//宝石主界面
export class GuangGaoView extends ViewBase{
    private _ui:ui.views.huodong.ui_guanggaoUI;
    protected mMask = true;
    protected autoFree:boolean = true;
    private timeCtl:TimeCtl;
    private mf_ctl:ButtonCtl;
    private tq_ctl:ButtonCtl;
    protected  onAddLoadRes(){
        this.addAtlas('huodong.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.huodong.ui_guanggaoUI;
            this.bindClose(this._ui.btn_close);

            this.mf_ctl=ButtonCtl.Create(this._ui.btn_mf,new Laya.Handler(this,this.onBtnClick));
            this.tq_ctl=ButtonCtl.Create(this._ui.img_tq,new Laya.Handler(this,this.onBtnTQClick));

            this.timeCtl = new TimeCtl(this._ui.timeTf);

            this._ui.list.itemRender = ui.views.main.ui_slot_itemUI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onItemHandler);

            if(t_Platform.Ins.isHideAdImg){
                this.tq_ctl.visible = false;
                this.UI.height -= this._ui.img_tq.height;
            }
        }
    }

    private onBtnTQClick(){
        E.ViewMgr.Open(EViewType.ZhongShenKa);
    }

    protected onInit(){
        GuaJiModel.Ins.on(GuaJiModel.UPDATA_CD_TIME,this,this.upDataView);
        this.upDataView();
        let arr = System_RefreshTimeProxy.Ins.GetDataById(15).f_SystemConfig.split("|");
        this._ui.list.array = arr;
    }

    protected onExit(){
        GuaJiModel.Ins.off(GuaJiModel.UPDATA_CD_TIME,this,this.upDataView);
        this.timeCtl.stop();
        this.mf_ctl.dispose();
        this.tq_ctl.dispose();
    }

    private onItemHandler(item:ui.views.main.ui_slot_itemUI){
        let vo = new ItemVo();
        vo.cfgId = parseInt(item.dataSource.split("-")[0]);
        vo.count = parseInt(item.dataSource.split("-")[1]);
        ItemViewFactory.refreshSlot(item,vo);
    }

    private onBtnClick(){
        let cfg = GuaJiModel.Ins.getstAdCdByType(GuaJiModel.CDEnmu.GuangGao);
        let num = parseInt(System_RefreshTimeProxy.Ins.GetDataById(16).f_SystemConfig) - cfg.times;
        if(num == 0){
            E.ViewMgr.ShowMidError("今日观看已达上限,请明日再来");//显示错误提示
            return;
        }
        E.sendTrack("ad_watch",{type:"guanggao"});
        E.sdk.lookVideo((type: 0 | 1 | 2) => {
            console.log('type: ', type);
            switch(type) {
                case 0:
                    // ⽤户未看完取消
                    break;
                case 1:
                    // ⽤户看完⼴告
                    E.sendTrack("ad_finish",{type:"guanggao"});
                    let req:AdWatchDone_req = new AdWatchDone_req;
                    req.pos = GuaJiModel.CDEnmu.GuangGao;
                    SocketMgr.Ins.SendMessageBin(req);
                    this.Close();
                    break;
                case 2:
                    // 拉取⼴告错误
                    break;
            }
        });
    }

    private upDataView(){
        let cfg = GuaJiModel.Ins.getstAdCdByType(GuaJiModel.CDEnmu.GuangGao);
        let num = parseInt(System_RefreshTimeProxy.Ins.GetDataById(16).f_SystemConfig) - cfg.times;
        this._ui.lab_cs.text = "剩余" + num + "次";
        if(num){
            let time = cfg.endUnix - TimeUtil.serverTime;
            if(time > 0){//有倒计时
                this._ui.btn_mf.disabled = true;
                this._ui.lab_name1.visible = true;
                this._ui.timeTf.visible = true;
                this._ui.img.visible = true;
                this.timeCtl.start(time,new Laya.Handler(this,this.onUpdateTime),new Laya.Handler(this,this.endTime));
            }else{
                this.timeCtl.stop();
                this.endTime();
            }
        }else{
            this._ui.btn_mf.disabled = true;
            this._ui.lab_name1.visible = false;
            this._ui.timeTf.visible = false;
            this._ui.img.visible = false;
            this.timeCtl.stop();
        }
    }

    private onUpdateTime(){
        let time_str = TimeUtil.subTime(this.timeCtl.tickVal);
        this.timeCtl.setText(time_str);
    }

    private endTime(){
        this._ui.btn_mf.disabled = false;
        this._ui.lab_name1.visible = false;
        this._ui.timeTf.visible = false;
        this._ui.img.visible = false;
    }
}