import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { PlatformConfig } from "../../../../../InitConfig";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { ShareReward_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { EFuncDef } from "../../main/model/EFuncDef";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { System_RefreshTimeProxy } from "../model/ActivityProxy";

//添加到桌面主界面
export class TianJiaZhuoMianView extends ViewBase{
    private _ui:ui.views.huodong.ui_add_deskUI;
    protected mMask = true;
    protected autoFree = true;
    protected  onAddLoadRes(){
        this.addAtlas('huodong.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.huodong.ui_add_deskUI;
            this.bindClose(this._ui.btn_close);
            this.btnList.push(
                ButtonCtl.Create(this._ui.btn_img,new Laya.Handler(this,this.onBtnClick)),
                ButtonCtl.Create(this._ui.btn_left,new Laya.Handler(this,this.onBtnLeftClick)),
                ButtonCtl.Create(this._ui.btn_right,new Laya.Handler(this,this.onBtnRightClick))
            )
            this._ui.txt1.text = E.getLang("tjzm1");
            this._ui.txt2.text = E.getLang("tjzm2");
            this._ui.bg21.visible = true;
            this._ui.bg22.visible = this._ui.bg23.visible = false;
            this._ui.dot1.skin = `remote/huodong/tjzm_y2.png`;
            this.setItem();
            this.onShareReward();
            if(initConfig.platform == PlatformConfig.DOU_YIN){
                this._ui.desk_img1.skin = "static/dy_tjzm_1.png";
                this._ui.desk_img2.skin = "static/dy_tjzm_2.png";
                this._ui.desk_img3.skin = "static/dy_tjzm_3.png";
            }
        }
    }

    private setItem() {
        const rewards = System_RefreshTimeProxy.Ins.GetDataById(60).f_SystemConfig;
        let _resultItemVo = ItemViewFactory.convertItem(rewards);
        ItemViewFactory.refreshSlot(this._ui.item,_resultItemVo);
    }

    protected onInit(){
        MainModel.Ins.on(MainEvent.WxOnShow,this,this.onWxOnShow);
        MainModel.Ins.on(MainEvent.ShareReward,this,this.onShareReward);
        this.onShareReward();
        this.checkScene();
    }

    private checkScene(){
        let sceneVal = E.sdk.scene;
        if (sceneVal) {
            this.onWxOnShow({ scene: sceneVal });
        }
    }

    private onWxOnShow(res) {
        if(E.sdk.isFromDesk(res)){
        // if (res && res['scene'] && ([1023, 1223].indexOf(res['scene']) !== -1)) {
            const req = new ShareReward_req();
            req.funcId = EFuncDef.TianJiaZhuoMian;
            req.type = 0;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    protected onExit(){
        MainModel.Ins.off(MainEvent.WxOnShow,this,this.onWxOnShow);
        MainModel.Ins.off(MainEvent.ShareReward,this,this.onShareReward);
    }

    private onBtnClick(){
        const data = MainModel.Ins.shareReward;
        const d = data.dataList.find(o => o.funcId === EFuncDef.TianJiaZhuoMian);
        if (!d || (d.state !== 2)) return;
        const req = new ShareReward_req();
        req.funcId = EFuncDef.TianJiaZhuoMian;
        req.type = 1;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onBtnLeftClick() {
        const arr = [this._ui.bg21, this._ui.bg22, this._ui.bg23];
        const dots = [this._ui.dot1, this._ui.dot2, this._ui.dot3];
        const index = arr.findIndex(o => o.visible);
        if (index === 0) return;
        arr[index].visible = false;
        dots[index].skin = `remote/huodong/tjzm_y1.png`;
        arr[index - 1].visible = true;
        dots[index - 1].skin = `remote/huodong/tjzm_y2.png`;
        if ((index - 1) === 0) {
            this._ui.txt2.visible = true;
        } else {
            this._ui.txt2.visible = false;
        }
    }

    private onBtnRightClick() {
        const arr = [this._ui.bg21, this._ui.bg22, this._ui.bg23];
        const dots = [this._ui.dot1, this._ui.dot2, this._ui.dot3];
        const index = arr.findIndex(o => o.visible);
        if (index === (arr.length - 1)) return;
        arr[index].visible = false;
        dots[index].skin = `remote/huodong/tjzm_y1.png`;
        arr[index + 1].visible = true;
        dots[index + 1].skin = `remote/huodong/tjzm_y2.png`;
        if ((index + 1) === 0) {
            this._ui.txt2.visible = true;
        } else {
            this._ui.txt2.visible = false;
        }
    }

    private onShareReward() {
        const data = MainModel.Ins.shareReward;
        let d = data.dataList.find(o => o.funcId === EFuncDef.TianJiaZhuoMian);
        let state = d?.state || 0;
        let txt = '';
        switch (state) {
            case 0:
                txt = '领取';
                this._ui.btn_img.disabled = true;
                break;
            case 1:
                txt = '已领取';
                this._ui.btn_img.disabled = true;
                break;
            case 2:
                txt = '领取';
                this._ui.btn_img.disabled = false;
                break;
        }
        this._ui.btn_tf.text = txt;
        // return state;
    }
}