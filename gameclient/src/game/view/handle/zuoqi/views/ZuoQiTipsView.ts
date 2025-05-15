import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import {DotManager} from "../../common/DotManager";
import { ZuoQiEvent } from "../vos/ZuoQiEvent";
import { ZuoqiVo } from "../vos/ZuoqiVo";
import { ZuoQiModel } from "../ZuoqiModel";
import { AttrCtl, ZuoQiAttrCtl } from "./ZuoQiAttrCtl";
import { ZuoQiSlotView } from "./ZuoQiSlotView";
export interface IZuoqiTipsData{
    zqData:ZuoqiVo;
    showEnter:boolean;
}
class AttrItemTipsUI extends ui.views.main.ui_main_zuoqi_attr2UI {
    private ctl: AttrCtl;
    public refresh(vo: ZuoqiVo) {
        if (!this.ctl) {
            this.ctl = new AttrCtl();
            this.ctl.skin = this;
        }
        this.ctl.refresh(vo);
    }
}
export class ZuoQiTipsView extends ViewBase{
    private _attrCtl:ZuoQiAttrCtl;
    private _ui:ui.views.zuoqi.ui_zuoqi_tipsUI;
    protected mMask:boolean = true;
    private slotView:ZuoQiSlotView;
    private _enterCtl:ButtonCtl;
    private zqData:ZuoqiVo;
    private model:ZuoQiModel;
    protected autoFree = true;
    protected onAddLoadRes(): void{
        this.addAtlas("zuoqi.atlas");
    }
    protected onExit(): void{
        this.model.off(ZuoQiEvent.RedUpdate,this,this.onRedUpdate);
    }
    protected onFirstInit(): void{
        if(!this.UI){
            this.model = ZuoQiModel.Ins;
            this.UI = this._ui = new ui.views.zuoqi.ui_zuoqi_tipsUI();
            this.btnList.push(ButtonCtl.Create(this._ui.close1,new Laya.Handler(this,this.Close)));
            this._enterCtl = ButtonCtl.Create(this._ui.enterBtn,new Laya.Handler(this,this.onEnterGame));
            this.btnList.push(this._enterCtl);
            this._ui.tf3.visible = false;
            this.slotView = new ZuoQiSlotView(this._ui.slot1);
            this._attrCtl = new ZuoQiAttrCtl(this._ui.listleft,this._ui.listright,
                null,this._ui.list2,this._ui.nameTf,this._ui.quaTf,this._ui.plusCon,0,0,AttrItemTipsUI);
        }
    }
  
    private onEnterGame(){
        E.ViewMgr.Open(EViewType.ZuoqiMain,null,this.zqData);
        this.Close();
    }

    /**初始化*/
    protected onInit(): void{
        this.model.on(ZuoQiEvent.RedUpdate,this,this.onRedUpdate);
        let _data:IZuoqiTipsData = this.Data;
        this.zqData = _data.zqData;
        this._enterCtl.visible = _data.showEnter;
        this.slotView.setData(this.zqData);
        this._attrCtl.refresh(this.zqData);
        if( this.zqData.equipVo.attrList1.length <=0){
            this._ui.tf3.visible = false;
        }else{
            this._ui.tf3.visible = true;
        }
        this.onRedUpdate();
    }
    private onRedUpdate(){
        if(this.model.hasRed){
            DotManager.addDot(this._enterCtl.skin);
        }else{
            DotManager.removeDot(this._enterCtl.skin);
        }
    }
}