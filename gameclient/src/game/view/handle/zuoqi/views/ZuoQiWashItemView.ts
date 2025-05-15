import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { stMountRefinement } from "../../../../network/protocols/BaseProto";
import { EquipmentQualityProxy } from "../../main/model/EquipmentProxy";
import { MainModel } from "../../main/model/MainModel";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { ZuoqiVo } from "../vos/ZuoqiVo";
import { ZuoqiWashView } from "./ZuoqiWashView";

class ZuoQiWashItemView extends ui.views.zuoqi.ui_zuoqi_wash_item_attrUI{
    protected isOld:boolean = true;
    protected _data:stMountRefinement;
    protected lockedCtl:ButtonCtl;
    private defaultColor:string;
    public get curData():stMountRefinement{
        return this._data;
    }
    constructor(){
        super();
        this.defaultColor = this.valTf.color;
        this.lockedCtl = ButtonCtl.CreateBtn(this.locked,this,this.onLockHandler);
        this.lockedCtl.visible = false;
    }
    protected onLockHandler(){
        
    }
    public refresh(vo:ZuoqiVo){
        this._data = this.dataSource;
        this.mColor = EquipmentQualityProxy.Ins.getByQuaDefault(this.defaultColor,this._data.quality);
        
        this.nametf.text = MainModel.Ins.getAttrNameIdByID(this._data.id);
        //if(E.Debug){
        //   this.nametf.text = this._data.id + "";
        //}
        let ext = attrConvert(this._data.id,this._data.valueExtra);
        this.valTf.text = `${attrConvert(this._data.id,this._data.value)} (+${ext})`;
    }

    private set mColor(v:string){
        this.valTf.color = v;
        this.nametf.color = v;
    }
}
/////////////////////////////////////////////////////////////////////////////////////
export class ZuoQiWashLeftItemView extends ZuoQiWashItemView{
    // private model:ZuoQiModel;
    // public index:number;
    private washView:ZuoqiWashView;
    private rideVo:ZuoqiVo;
    constructor(){ 
        super();
        // this.model = ZuoQiModel.Ins;
        this.washView = E.ViewMgr.Get(EViewType.MountWash) as ZuoqiWashView;
        this.lockStyle = true;
    }

    public refresh(vo:ZuoqiVo){
        super.refresh(vo);
        this.lockedCtl.visible = false;

        this.rideVo = vo;//this.model.rideVo;

        // && this.index+1 <= G.gameData.washLockCount
        if(this.isOld){
            if(this.rideVo.mWashLock){
                this.lockedCtl.visible = true;
                // let islocked = this.rideVo.isLocked(this._data.id);
                // this.lockStyle = !islocked;
            }
        }
    }

    public set lockStyle(v: boolean) {
        // this.lockedCtl.gray = v;
        if (v) {
            this.locked.skin = "remote/zuoqi/zqyh_lock_1.png"//解锁中 灰态
        } else {
            this.locked.skin = "remote/zuoqi/zqyh_lock.png";//锁定中 高亮
        }
    }

    /**是否已经高亮锁定中 */
    public get isLocked() {
        return this.locked.skin == "remote/zuoqi/zqyh_lock.png";
    }

    /**点击锁定icon */
    protected onLockHandler() {
        if(this.washView.hasCancel){
            return;
        }
        if (this.rideVo.mWashLock) {
            /*
            if (this.rideVo.isLocked(this._data.id)) {
                this.rideVo.delLockAttrId(this._data.id);
            } else {

                if (this.rideVo.testLocking(1)) {
                    this.rideVo.setLockAttrId(this._data.id);
                } else {
                    E.ViewMgr.ShowMidError(E.getLang("mount_3"));//无法锁定
                }
            }
            this.washView.onRefreshEvt();
            */



            if (!this.isLocked && this.washView.isCanLock ||
                this.isLocked) 
            {
                this.lockStyle = this.isLocked;
                this.washView.onRefreshEvt();
            } else {
                E.ViewMgr.ShowMidError(E.getLang("mount_3"));//无法锁定
            }
        }
    }
}
/**右边属性列表 */
export class ZuoQiWashRightItemView extends ZuoQiWashLeftItemView {
    protected isOld:boolean = false;
}