import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { MountReturnPreView_req, MountReturn_req, stCellValue } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainModel } from "../../main/model/MainModel";
import { ItemVo } from "../../main/vos/ItemVo";
import { IconUtils } from "../vos/IconUtils";
import { ZuoQiEvent } from "../vos/ZuoQiEvent";
import { MountConfigProxy } from "../vos/ZuoqiProxy";
import { ZuoqiVo } from "../vos/ZuoqiVo";
import { ZuoQiModel } from "../ZuoqiModel";
import { ZuoQiSlotView } from "./ZuoQiSlotView";

export class ZuoqiBackView extends ViewBase {
    protected mMask:boolean = true;
    private _ui: ui.views.zuoqi.ui_zuoqi_back_viewUI;
    private slotView:ZuoQiSlotView;
    private _zqVo:ZuoqiVo;
    private model:ZuoQiModel;
    private cfg: Configs.t_Mount_Config_dat;
    protected onAddLoadRes(): void {
        this.addAtlas("zuoqi.atlas");
    }
    protected onExit(): void { }
    protected onFirstInit(): void { 
        if(!this._ui){
            this.model = ZuoQiModel.Ins;
            this.UI = this._ui = new ui.views.zuoqi.ui_zuoqi_back_viewUI();
            this.bindClose(this._ui.close1);
            this.slotView = new ZuoQiSlotView(this._ui.slot0);
            ButtonCtl.CreateBtn(this._ui.washBtn,this,this.onWashHandler);
            ButtonCtl.CreateBtn(this._ui.canelBtn,this,this.Close);
        }
    }
    private onWashHandler(){
        if(this.cfg){
            if(MainModel.Ins.isItemEnoughSt(this.cfg.f_Ruturn,true)){
                this.model.once(ZuoQiEvent.ReturnMountSucceed,this,this.Close);
                let req = new MountReturn_req();
                req.id = this._zqVo.rideId;
                SocketMgr.Ins.SendMessageBin(req);
            }
        }
    }
    protected onInit(): void {
        this._zqVo = this.Data; 
        this.slotView.setData(this._zqVo);
        this._ui.nameTf.text = this._zqVo.getName();
        this._ui.nameTf.color = this._zqVo.getQuaColor();

        let qua: number = this._zqVo.quality;//品质
        let cfg: Configs.t_Mount_Config_dat = MountConfigProxy.Ins.getByQualityID(qua);
        this.cfg = cfg;
        if(cfg){
            // 消耗元宝
            let _itemVo:ItemVo = ItemViewFactory.convertItem(cfg.f_Ruturn);
            this._ui.goldicon.skin = _itemVo.getIcon();
            this._ui.goldTf.text = StringUtil.val2m(_itemVo.count);
        }

        this.model.once(ZuoQiEvent.ReturnPreView,this,this.showAttr);
        let req = new MountReturnPreView_req();
        req.id = this._zqVo.rideId;
        SocketMgr.Ins.SendMessageBin(req);
    }
    
    private showAttr() {
        let _list1:stCellValue[] = this.model.preRewardList;    //_list1.pop();
        this._ui.icon2.visible = false;
        this._ui.tf2.visible = false;
        this._ui.icon4.visible = this._ui.tf4.visible = false;

        this._ui.icon1.skin = IconUtils.getIconByCfgId(_list1[0].id);
        this._ui.tf1.text = StringUtil.val2m(_list1[0].count);

        if (_list1.length > 1) {
            this._ui.icon2.visible = true;
            this._ui.tf2.visible = true;

            this._ui.icon2.skin = IconUtils.getIconByCfgId(_list1[1].id);
            this._ui.tf2.text = StringUtil.val2m(_list1[1].count);

            let _item2:stCellValue = _list1[2];
            if(_item2){
                this._ui.icon4.visible = this._ui.tf4.visible = true;
                this._ui.icon4.skin = IconUtils.getIconByCfgId(_item2.id);
                this._ui.tf4.text = StringUtil.val2m(_item2.count);
            }
        }
        //layout
        this.layoutView(_list1.length)
    }

    private layoutView(itemCount:number){
        let w  = this._ui.icon1.width+this._ui.tf1.textField.width + this._ui.tf0.textField.width;
        if(itemCount > 1){
            w += this._ui.icon2.width+this._ui.tf2.textField.width;
        }
        if(this._ui.icon4.visible){
            w += this._ui.tf4.textField.width +  this._ui.icon4.width;
        }
        let ox = (this._ui.width - w)/2;
        // let ox = 0;
        this._ui.tf0.x = ox;
        this._ui.icon1.x = this._ui.tf0.x + this._ui.tf0.textField.width;
        this._ui.tf1.x = this._ui.icon1.x + this._ui.icon1.width;
        this._ui.icon2.x = this._ui.tf1.x + this._ui.tf1.textField.width;
        this._ui.tf2.x = this._ui.icon2.x + this._ui.icon2.width;
        this._ui.icon4.x = this._ui.tf2.x + this._ui.tf2.textField.width;
        this._ui.tf4.x = this._ui.icon4.x + this._ui.icon4.width;
        // if(E.Debug){
        //     let s = new Laya.Sprite();
        //     this._ui.addChild(s);
        //     s.graphics.drawRect(0,0,w,4,null,"#ff0000",1)
        //     s.y = this._ui.tf0.y;
        // }
    }
}