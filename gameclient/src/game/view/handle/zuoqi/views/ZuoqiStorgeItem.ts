import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { stRideVo } from "../../../../network/protocols/BaseProto";
import { ZuoqiBaseItem } from "./ZuoqiBaseItem";
import { ZuoqiStorgeView } from "./ZuoqiStorgeView";
/**
 * 坐骑仓库item
 */
export class ZuoqiStorgeItem extends ZuoqiBaseItem {
    constructor() {
        super();
    }
    protected onClickHandler(){
        let view:ZuoqiStorgeView = E.ViewMgr.Get(EViewType.ZuoqiStorge) as ZuoqiStorgeView;
        if(view.selectRideId && view.selectRideId == this.data.id){
            view.selectRideId = undefined;
        }else{
            view.selectRideId = this.data.id;
        }
        view.refreshView();
    }
    public setData(data: stRideVo) {
        super.setData(data);
        let _bo:boolean = false;
        if(this.model.rideVo.rideId == data.id){
            _bo = true;
        }
        this.ctl.mCkSelected = _bo;
        this.updateSelect();
    }
    protected updateSelect(){
        let view:ZuoqiStorgeView = E.ViewMgr.Get(EViewType.ZuoqiStorge) as ZuoqiStorgeView;
        
        let _bo:boolean = false;
        if(view.selectRideId == this.data.id){
            _bo = true;
        }
        this.ctl.mSelected = _bo;
    }
}