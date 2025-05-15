import { StringUtil } from "../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../frame/view/ButtonCtl";
import { ui } from "../../../../ui/layaMaxUI";
import { SocketMgr } from "../../../network/SocketMgr";
import { NewPlayerFeastTask_req, stNewPlayerTask } from "../../../network/protocols/BaseProto";
import { DotManager } from "../common/DotManager";
import { AlternationRookieTaskProxy } from "../libao/proxy/LiBaoProxy";
import { ItemViewFactory } from "../main/model/ItemViewFactory";

export class NewPlayerTaskItem extends ui.views.huodong.ui_newplayerfeast_package_itemUI{
    constructor() {
        super();
        this.chongzhiBtn.visible = false;
        ButtonCtl.Create(this.lingquBtn,new Laya.Handler(this,this.onBtnClick));
    }

    private onBtnClick(){
        if(!this._data)return;
        let req:NewPlayerFeastTask_req = new NewPlayerFeastTask_req;
        req.id = this._data.id;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private _data:stNewPlayerTask;
    public setData(value:stNewPlayerTask){
        if(!value)return;
        this._data = value;
        let cfg = AlternationRookieTaskProxy.Ins.getCfgById(value.id);
        this.tf01.text = StringUtil.format(cfg.f_TaskContent,[cfg.f_TaskTarget]);
        ItemViewFactory.renderItemSlots(this.rewardCon, cfg.f_task,10,1,"left");
        this.tf02.text = "(" + value.nums + "/" + cfg.f_TaskTarget + ")";
        this.redimg.visible = false;
        if(value.status == 1){
            this.tf03.text = "已领取";
            this.lingquBtn.disabled = true;
        }else if(value.status == 0){
            this.tf03.text = "领取";
            this.lingquBtn.disabled = true;
        }else if(value.status == 2){
            this.tf03.text = "领取";
            this.lingquBtn.disabled = false;
            this.redimg.visible = true;
        }
    }
}