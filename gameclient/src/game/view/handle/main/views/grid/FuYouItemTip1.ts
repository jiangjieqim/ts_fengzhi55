import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../../frame/view/ViewBase";
import { ui } from "../../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { E } from "../../../../../G";
import { BlessingConvert_req } from "../../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../../network/SocketMgr";
import { HuYouModel } from "../../../huyou/model/HuYouModel";
import { HuYouView } from "../../../huyou/view/HuYouView";
import { GridItemCtl } from "./GridItemCtl";
import { GridItemVo } from "./GridItemVo";

/* @Author: tsy
 * @Date: 2023-02-21 11:51:48
 * @Last Modified by: tsy
 * @Last Modified time: 2023-03-20 13:31:22
*/
export class FuYouItemTip1 extends ViewBase{
    protected mMask = true;
    protected autoFree = true;
    private _ui:ui.views.fuyou.ui_cifuLevel1UI;
    private _item1:GridItemCtl;

    protected onAddLoadRes() {
        this.addAtlas('fuyou.atlas');
    }

    protected onFirstInit() {
        if(!this.UI){
            this.UI = this._ui = new ui.views.fuyou.ui_cifuLevel1UI();
            this.bindClose(this._ui.close1);
            this._ui.maskbg.on(Laya.Event.CLICK,this,this.Close);
            this.btnList.push(ButtonCtl.Create(this._ui.btn_zh,new Laya.Handler(this,this.onBtnZhClick)));
            this._item1 = new GridItemCtl(this._ui.item);
        }
    }

    protected onInit() {
       this.updateView();
    }

    protected onExit() {
    }

    private onBtnZhClick(){
        let view:HuYouView = E.ViewMgr.Get(EViewType.CIFU) as HuYouView;
        if(view){
            if(HuYouModel.Ins.isAuto){
                view.setAuto(false);
                E.ViewMgr.ShowMidError(E.getLang("HuYou_tips1"));
                return;
            }
            if(view.isPlay){
                E.ViewMgr.ShowMidError(E.getLang("正在祈福中"));
                return;
            }
        }
        let req:BlessingConvert_req = new BlessingConvert_req();
        req.datalist = [(this.Data as GridItemVo).uid];
        SocketMgr.Ins.SendMessageBin(req);
        this.Close();
    }

    private updateView(){
        this._item1.setBagData(this.Data);
        this._ui.txt_name.text = (this.Data as GridItemVo).getName();
        this._ui.txt_name.color = (this.Data as GridItemVo).getQua();
        this._ui.txt_level.text = (this.Data as GridItemVo).getDec();
    }
}