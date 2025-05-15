import { ui } from "../../../../../../ui/layaMaxUI";
import { E } from "../../../../../G";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { stRideVo } from "../../../../../network/protocols/BaseProto";
import { ZuoQiSlotCtl } from "../../../main/views/ZuoQiSlotCtl";
import { ZuoqiFactory } from "../../../zuoqi/ZuoqiFactory";
import { ZuoQiModel } from "../../../zuoqi/ZuoqiModel";
import { ZuoqiBaseItem } from "../../../zuoqi/views/ZuoqiBaseItem";
import { ZuoqiStorgeView } from "../../../zuoqi/views/ZuoqiStorgeView";
import { FuJiangModel } from "../../model/FuJiangModel";
import { FuJiangListProxy } from "../../proxy/FuJiangProxy";
import { FuJiangMountCKView } from "../FuJiangMountCKView";

/**
 * 坐骑仓库item
 */
export class FuJiangItem8 extends ui.views.fujiang.ui_fujiangItem9UI {
    protected model:ZuoQiModel;
    protected data: stRideVo;
    protected ctl:ZuoQiSlotCtl;

    constructor() {
        super();
        this.model = ZuoQiModel.Ins;
        this.ctl = new ZuoQiSlotCtl(this,true);
        this.ctl.clickHandler = new Laya.Handler(this,this.onClickHandler);
    }
    protected onClickHandler(){
        let view:FuJiangMountCKView = E.ViewMgr.Get(EViewType.FuJiangMountCKView) as FuJiangMountCKView;
        if(view.selectRideId && view.selectRideId == this.data.id){
            view.selectRideId = undefined;
        }else{
            view.selectRideId = this.data.id;
        }
        view.refreshView();
    }
    public setData(data: stRideVo) {
        this.data = data;
        this.ctl.mData = ZuoqiFactory.createZuoQiVo(data);
        this.ctl.refresh();
        this.updateSelect();
        let vo = FuJiangModel.Ins.getMountDataByMountId(data.id);
        if(vo){
            if(vo.cheifId > 0){
                this.img.visible = true;
                this.lab_my.visible = false;
                this.img_role.visible = true;
                this.img_role.skin = FuJiangListProxy.Ins.getFuJiangSkin(vo.cheifId);
            }else if(vo.cheifId == 0){
                this.img.visible = true;
                this.lab_my.visible = true;
                this.img_role.visible = false;
            }else{
                this.img.visible = false;
            }
        }else{
            this.img.visible = false;
        }
    }
    protected updateSelect(){
        let view:FuJiangMountCKView = E.ViewMgr.Get(EViewType.FuJiangMountCKView) as FuJiangMountCKView;
        
        let _bo:boolean = false;
        if(view.selectRideId == this.data.id){
            _bo = true;
        }
        this.ctl.mSelected = _bo;
    }
}