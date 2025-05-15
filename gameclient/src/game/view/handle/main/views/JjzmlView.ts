import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { ActivityModel } from "../../huodong/ActivityModel";
import { ActivityEvent } from "../../huodong/model/ActivityEvent";
import { ActivityVo } from "../../huodong/model/ActivityVo";
import { EActivityLingQu, EActivityType } from "../../huodong/model/EActivityType";
import { ItemViewFactory } from "../model/ItemViewFactory";
import { JjzmlModel, t_Pack_Attendance_Chief } from "../model/JjzmlModel";
import { MainModel } from "../model/MainModel";
import { RedUpdateModel } from "../model/RedUpdateModel";
import { ItemVo } from "../vos/ItemVo";
class JjzmlItemCtl{
    private skin:ui.views.jjzml.ui_jjzml_itemUI;
    private _itemVo:ItemVo;
    constructor(skin:ui.views.jjzml.ui_jjzml_itemUI){
        this.skin = skin;
        this.skin.on(Laya.Event.CLICK,this,this.onTips);
    }
    private onTips(e:Laya.Event){
        e.stopPropagation();
        MainModel.Ins.showSmallTips(this._itemVo.getName(), this._itemVo.getDesc(), this.skin);
    }
    public setData(vo:ActivityVo,cfg: Configs.t_Pack_Attendance_Chief_dat) {
        if (vo) {
            this.skin.isGetImg.visible = false;
            this.skin.bg0.visible = false;

            this.skin.tf1.text = E.LangMgr.getLang("QianDao1", StringUtil.toChinesNum(cfg.f_Days));
            let itemVo = ItemViewFactory.convertItem(cfg.f_Item);
            this._itemVo = itemVo;
            this.skin.icon1.skin = itemVo.getIcon();
            this.skin.countTf.text = itemVo.count + "";
            let _status:EActivityLingQu = vo.getParam1(cfg.f_id);
            // if(E.Debug){
            // this.skin.countTf.text += "--->" + _status;
            // }
            switch(_status){
                case EActivityLingQu.Nothing:
                    break;
                case EActivityLingQu.KeLingQu:
                    this.skin.bg0.visible = true;
                    break;
                case EActivityLingQu.YiLingQu:
                    this.skin.isGetImg.visible = true;
                    break;
            }
        }
    }
    dispose(){
        this.skin.off(Laya.Event.CLICK,this,this.onTips);
    }
}
export class JjzmlView extends ViewBase {
    private _ui:ui.views.jjzml.ui_jjzml_mainUI;
    private _signCtl:ButtonCtl;
    private itemList:JjzmlItemCtl[]=[];
    private model:JjzmlModel;
    private _vo:ActivityVo;
    protected autoFree = true;
    protected onAddLoadRes(): void { 
        this.addAtlas("jjzml.atlas");
    }
    protected onExit(): void { 
        ActivityModel.Ins.off(ActivityEvent.UpdateData,this,this.onRefresh);
        while(this.itemList.length){
            let cell = this.itemList.pop();
            cell.dispose();
        }
    }
    protected onFirstInit(): void { 
        if(!this.UI){
            this.model = JjzmlModel.Ins;
            this.mMask = true;
            this.UI = this._ui = new ui.views.jjzml.ui_jjzml_mainUI();
            this.bindClose(this._ui.close1);
            this._signCtl = ButtonCtl.CreateBtn(this._ui.btn1,this,this.onQianDaoHandler);
            this.itemList = [];
            for(let i = 0;i < this._ui.rewardCon.numChildren;i++){
                this.itemList.push(new JjzmlItemCtl(this._ui.rewardCon.getChildAt(i) as ui.views.jjzml.ui_jjzml_itemUI));
            }
            this._ui.tf2.visible = false;
            RedUpdateModel.Ins.addRedImg(this._ui.btn1);
        }
    }

    private onQianDaoHandler(){
        if(!this.model.isOpen){
            E.ViewMgr.ShowMidError(E.getLang("activityend"));
            return;
        }
        ActivityModel.Ins.lingQu(this._vo.uid,0);
    }
    protected onInit(): void {
        ActivityModel.Ins.on(ActivityEvent.UpdateData,this,this.onRefresh);
        this.onRefresh();
    }

    private onRefresh() {
        this._vo = ActivityModel.Ins.getVo(EActivityType.JJZML);
        if (this._vo) {
            let list1 = t_Pack_Attendance_Chief.Ins.List;
            for (let i = 0; i < list1.length; i++) {
                let cell = this.itemList[i];
                cell.setData(this._vo, list1[i]);
            }
            if (this._vo.hasKeLingQu()) {
                this._signCtl.visible = true;
                this._ui.tf2.visible = false;
            } else {
                this._signCtl.visible = false;
                this._ui.tf2.visible = true;
            }
        }
    }
}