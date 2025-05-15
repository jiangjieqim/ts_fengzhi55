import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { ActivityModel } from "../ActivityModel";
import { ActivityEvent } from "../model/ActivityEvent";
import { ActivityVo } from "../model/ActivityVo";
import { EActivityType } from "../model/EActivityType";
import { QianDaoItemCtl } from "../model/QianDaoItemCtl";
/**签到基类 */
export abstract class QianDaoBaseView extends ViewBase{
    protected autoFree:boolean = true;
    protected abstract activityType:EActivityType;
    protected abstract cfgList:any[];
    protected abstract initUI();
    protected _ui: ui.views.huodong.ui_qiriqiandaoviewUI|ui.views.huodong.ui_qiriqiandaoview_newUI;

    protected mMask:boolean = true;
    private _model:ActivityModel;
    private _activityVo:ActivityVo;
    private _itemList: QianDaoItemCtl[] = [];
    private qiandaoBtnCtl:ButtonCtl;
    /**添加加载资源 */
    protected onAddLoadRes(): void { 
        this.addAtlas("huodong.atlas");
    }
    /**离开处理 */
    protected onExit(): void { 
        this._model.off(ActivityEvent.UpdateData,this,this.refreshView);
        MainModel.Ins.off(MainEvent.SignStatus,this,this.refreshView);
    }
    /**这里在加载完资源后调用-建议只处理资源相关的逻辑*/
    protected onFirstInit(): void {
        if (!this.UI) {
            this._model = ActivityModel.Ins;
            // this.UI = this._ui = new ui.views.huodong.ui_qiriqiandaoviewUI();
            this.initUI();
            this._itemList = [];
            for (let i = 0; i < 7; i++) {
                let _itemSkin = this._ui["item" + i];
                let _ctl: QianDaoItemCtl = new QianDaoItemCtl(_itemSkin);
                this._itemList.push(_ctl);
            }
            this.bindClose(this._ui.close1);
            this.qiandaoBtnCtl = ButtonCtl.Create(this._ui.qiandaoBtn,new Laya.Handler(this,this.onQianDaoHandler));
            this._ui.clickImg.alpha = 0.05;
            this._ui.clickImg.on(Laya.Event.CLICK,this,this.onCloseHandler);
            DebugUtil.draw(this._ui.clickImg);
            this.setMouseBg(this._ui.bg1);
        }
    }

    /**签到 */
    private onQianDaoHandler() {
        if(!this._activityVo){
            return;
        }
        this._model.lingQu(this._activityVo.uid, 0);
    }
    protected mMainSnapshot = true;
    /**初始化*/
    protected onInit(): void {
        // MainModel.Ins.mainMask = true;
        this._model.on(ActivityEvent.UpdateData,this,this.refreshView);
        MainModel.Ins.on(MainEvent.SignStatus,this,this.refreshView);
        this.refreshView();
    }
    private refreshView() {
        this._ui.yijingqiandao.visible = false;
        this.qiandaoBtnCtl.visible = false;

        this._activityVo = this._model.getVo(this.activityType);
        let l = this.cfgList;
        for (let i = 0; i < l.length; i++) {
            let cell = l[i];
            let _itemView = this._itemList[i];
            _itemView.setData(cell,this._activityVo);
        }

        if(MainModel.Ins.sign.signType == 0){
            this._ui.yijingqiandao.visible = true;
        }else{
            this.qiandaoBtnCtl.visible = true;
        }
    }
}