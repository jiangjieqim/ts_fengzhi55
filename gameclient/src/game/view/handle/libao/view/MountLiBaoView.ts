import { StringUtil } from "../../../../../frame/util/StringUtil";
import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { TimeCtl } from "../../../../../frame/util/ctl/TimeCtl";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { stSkin } from "../../../../network/protocols/BaseProto";
import { AvatarFactory } from "../../avatar/AvatarFactory";
import { AvatarMonsterView } from "../../avatar/AvatarMonsterView";
import { ActivityModel } from "../../huodong/ActivityModel";
import { t_Purchase_PriceProxy } from "../../huodong/model/ActivityProxy";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { ItemVo } from "../../main/vos/ItemVo";
import { LiBaoZSProxy } from "../proxy/LiBaoProxy";

export class MountLiBaoView extends ViewBase{
    private _ui:ui.views.libao.ui_mountLiBaoViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;

    private _timeCtl:TimeCtl;

    protected onAddLoadRes(): void {
        this.addAtlas("libao.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.libao.ui_mountLiBaoViewUI;
            this.bindClose(this._ui.btn_close);

            ButtonCtl.Create(this._ui.btn,new Laya.Handler(this,this.onBtnClick));

            this._ui.list.itemRender = ui.views.libao.ui_liBaoItemUI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);

            this._timeCtl = new TimeCtl(this._ui.time1);
        }
    }

    private onBtnClick(){
        if(!this._data)return;
        ActivityModel.Ins.recharge(this._data.f_PurchaseID);
    }

    protected onInit(): void {
        this.updataView();
    }

    protected onExit(): void {
        if(this.avatar){
            this.avatar.dispose();
            this.avatar = null;
        }
        Laya.timer.clear(this,this.showAvatar);
        this._timeCtl.stop();
    }

    private onRenderHandler(item:ui.views.libao.ui_liBaoItemUI){
        let vo = new ItemVo();
        vo.cfgId = parseInt(item.dataSource.split("-")[0]);
        vo.count = parseInt(item.dataSource.split("-")[1]);
        ItemViewFactory.refreshSlot(item.item,vo);
        item.lab.text = vo.getName();
    }

    private _num;
    private _data:Configs.t_Pack_NewPlayer_Mount_dat;
    private updataView(){
        this._data = LiBaoZSProxy.Ins.getCfgByType(1);
        if(!this._data)return;
        this._ui.list.array = this._data.f_Item.split("|");
        this._ui.lab.text = this._data.f_trueprice + "元";
        let purCfg: Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(this._data.f_PurchaseID);
        this._ui.lab1.text = StringUtil.moneyCv(purCfg.f_price) + "元抢购";

        this._num = 0;
        this.showAvatar();
        Laya.timer.loop(2000,this,this.showAvatar);

        let vo = ActivityModel.Ins.getByUid(49);
        if(!vo)return;
        let time = vo.vo.endtime - TimeUtil.serverTime;
        if (time > 0) {
            this._timeCtl.start(time, new Laya.Handler(this, this.onUpdateTime), new Laya.Handler(this, this.endTime));
        } else {
            this.endTime();
            this._timeCtl.stop();
        }
    }

    private onUpdateTime() {
        let time_str = TimeUtil.subTime(this._timeCtl.tickVal);
        this._timeCtl.setText(time_str);
    }

    private endTime() {
        this._timeCtl.setText("");
    }

    private avatar:AvatarMonsterView;
    private showAvatar() {
        if(!this._data)return;
        let arr = this._data.f_ranID.split("|");
        if(this._num >= arr.length){
            this._num = 0;
        }
        let id = parseInt(arr[this._num]);
        if(!this.avatar){
            this.avatar = AvatarFactory.createRide(id);
            this._ui.sp.addChild(this.avatar);
            this.avatar.scale(2,2);
        }else{
            let skin:stSkin = new stSkin();
            skin.f_MountID = id;
            this.avatar.mSkin = skin;
        }
        this._num++;
    }
}