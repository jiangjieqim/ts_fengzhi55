import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { ZuoqiFactory } from "../ZuoqiFactory";
import { ZuoQiModel } from "../ZuoqiModel";
import { ZuoqiStorgeItem } from "./ZuoqiStorgeItem";

/**坐骑仓库 */
export class ZuoqiStorgeView extends ViewBase{
    private _ui:ui.views.zuoqi.ui_zuoqi_storgeUI;
    private model:ZuoQiModel;
    private _ridingBtnCtl:ButtonCtl;
    protected mMask:boolean = true;
    protected autoFree = true;
    public selectRideId:number;//选择的坐骑id

    protected onAddLoadRes(): void{
        this.addAtlas("zuoqi.atlas");
    }
    protected onExit(): void{
        this.selectRideId = undefined;
    }
    protected onFirstInit(): void{
        if(!this.UI){
            this.model = ZuoQiModel.Ins;
            this.UI = this._ui = new ui.views.zuoqi.ui_zuoqi_storgeUI();
            this.btnList.push(ButtonCtl.Create(this._ui.close1,new Laya.Handler(this,this.Close)));
            this._ridingBtnCtl = ButtonCtl.Create(this._ui.qichenBtn,new Laya.Handler(this,this.onRideHandler));
            this._ui.list1.itemRender  = ZuoqiStorgeItem;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onItemRender);
            this._ui.list1.array = [];
        }
    }

    private onItemRender(item:ZuoqiStorgeItem,index:number){
        item.setData(item.dataSource);
    }

    public refreshView() {
        this._ui.list1.refresh();
        this.updateRiding();
    }

    private updateRiding(){
        let v:boolean = false;
        if(this.selectRideId == undefined){

        }else{
            if(this.model.rideVo.rideId == this.selectRideId){

            }else{
                v = true;
            }
        }
        // this._ridingBtnCtl.visible = v;
    }

    /**骑乘 */
    private onRideHandler() {
        if (this.selectRideId != undefined) {
            if (this.model.rideVo.rideId == this.selectRideId) {
                //已经骑乘中,不在发送坐骑骑乘的请求
            } else {
                this.model.rideUpdate(this.selectRideId);
            }
        }
        this.Close();
    }

    /**初始化*/
    protected onInit(): void {
        let l = ZuoqiFactory.sortList(this.model.storgeList);
        this._ui.list1.array = l;
        this._ui.list1.scrollTo(0);
        this.refreshView();
    }
}