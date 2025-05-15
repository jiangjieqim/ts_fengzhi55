import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import {SocketMgr} from "../../../../network/SocketMgr";
import { MountChiefChange_req } from "../../../../network/protocols/BaseProto";
import { ZuoqiFactory } from "../../zuoqi/ZuoqiFactory";
import { ZuoQiModel } from "../../zuoqi/ZuoqiModel";
import { FuJiangModel } from "../model/FuJiangModel";
import { FuJiangItem8 } from "./item/FuJiangItem8";


/**坐骑仓库 */
export class FuJiangMountCKView extends ViewBase{
    private _ui:ui.views.fujiang.ui_fujiangMountCKViewUI;
    private model:ZuoQiModel;
    protected mMask:boolean = true;
    protected autoFree = true;
    
    public selectRideId:number;//选择的坐骑id

    protected onAddLoadRes(): void{
        
    }
    protected onExit(): void{
        this.selectRideId = undefined;
    }
    protected onFirstInit(): void{
        if(!this.UI){
            this.model = ZuoQiModel.Ins;
            this.UI = this._ui = new ui.views.fujiang.ui_fujiangMountCKViewUI();
            this._ui.list1.itemRender  = FuJiangItem8;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onItemRender);
            this._ui.list1.array = [];
            this.btnList.push(
            ButtonCtl.Create(this._ui.qichenBtn,new Laya.Handler(this,this.onRideHandler)),
            ButtonCtl.Create(this._ui.close1,new Laya.Handler(this,this.Close))
            );
        }
    }

    /**骑乘 */
    private onRideHandler() {
        if (this.selectRideId != undefined) {
            let cheifId = this.Data;
            if(cheifId){
                let cfg = FuJiangModel.Ins.getMountDataByCheifId(cheifId);
                if(cfg && cfg.mountId == this.selectRideId){
                    E.ViewMgr.ShowMidError("已骑乘当前坐骑")//语言包
                    return;
                }
                let req:MountChiefChange_req = new MountChiefChange_req;
                req.cheifId = cheifId;
                req.mountId = this.selectRideId;
                SocketMgr.Ins.SendMessageBin(req);
            }else{
                if (this.model.rideVo.rideId == this.selectRideId) {
                    E.ViewMgr.ShowMidError("已骑乘当前坐骑")//语言包
                    return;
                } else {
                    this.model.rideUpdate(this.selectRideId);
                }
            }
        }
        this.Close();
    }

    private onItemRender(item:FuJiangItem8,index:number){
        item.setData(item.dataSource);
    }

    public refreshView() {
        this._ui.list1.refresh();
    }
    
    /**初始化*/
    protected onInit(): void {
        let l = ZuoqiFactory.sortList(this.model.storgeList);
        this._ui.list1.array = l;
        this._ui.list1.scrollTo(0);
        this.refreshView();
    }
}