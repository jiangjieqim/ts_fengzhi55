import {TimeUtil} from "../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { stRideVo } from "../../../../network/protocols/BaseProto";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { IconUtils } from "../vos/IconUtils";
import { ZuoqiFactory } from "../ZuoqiFactory";
import { ZuoQiModel } from "../ZuoqiModel";
import { ZuoqiBaseItem } from "./ZuoqiBaseItem";
class  ZuoQiMissionRenderView extends ZuoqiBaseItem{
    
    protected onClickHandler(){
        let view:ZuoQiMissionView = E.ViewMgr.Get(EViewType.ZuoqiMission) as ZuoQiMissionView;
        view.upadteSelect(this.data.id);
    }
    
    public setData(data: stRideVo) {
        super.setData(data);
        let view:ZuoQiMissionView = E.ViewMgr.Get(EViewType.ZuoqiMission) as ZuoQiMissionView;
        if(view.selectIdsList.indexOf(data.id)!=-1){
            this.sel.visible = true;
        }else{
            this.sel.visible = false;
        }
    }
}
/**上方的选择列表 */
class ZuoQiMissionTopRenderView extends ZuoqiBaseItem {

    public setData(data: stRideVo) {
        if (typeof data == "string" && data == IconUtils.Empty) {
            this.ctl.empty();
        } else {
            super.setData(data);
        }
    }
}

/**坐骑派遣 */
export class ZuoQiMissionView extends ViewBase{
    private _ui:ui.views.zuoqi.ui_zuoqi_yunshu_selUI;
    private model:ZuoQiModel;
    protected autoFree = true;
    protected mMask:boolean = true;
    private cfg:Configs.t_Mount_Mission_dat;
    public selectIdsList:number[] =[];//选择的马匹
    private _dispatchMaxCnt:number = 3;//最多上阵的马匹数量
    protected onAddLoadRes(): void{
        this.addAtlas("zuoqi.atlas");
    }
    public upadteSelect(id:number){
        let index:number = this.selectIdsList.indexOf(id);
        if(index !=-1){
            this.selectIdsList.splice(index,1);
        }else{
            if(this.selectIdsList.length >= this._dispatchMaxCnt){
                this.selectIdsList.shift();
            }

            this.selectIdsList.push(id);
        }
        this._ui.list2.refresh();
        ///////////////////////////////////////////////////////
        let l = [];
        for(let i = 0;i < this.selectIdsList.length;i++){
            l.push(this.model.getRideVo(this.selectIdsList[i]));
        }
        for(let i = this.selectIdsList.length;i < this._dispatchMaxCnt;i++){
            l.push(IconUtils.Empty);
        }
        this._ui.list1.array = l;
        this.updateDispatchBtn();
    }

    protected onExit(): void{
        this.selectIdsList = [];
    }
    protected onFirstInit(): void{
        if(!this.UI){
            this.UI = this._ui = new ui.views.zuoqi.ui_zuoqi_yunshu_selUI();
            this.model = ZuoQiModel.Ins;
            this._ui.list2.vScrollBarSkin = " ";
            this._ui.list2.itemRender = ZuoQiMissionRenderView;
            this._ui.list2.renderHandler = new Laya.Handler(this,this.onRenderHandler);
            this._ui.list2.array = [];
            this.btnList.push(ButtonCtl.Create(this._ui.paiqianbtn,new Laya.Handler(this,this.onPaiQian)));
            this.bindClose(this._ui.close1);
            // this._ui.list1.vScrollBarSkin = " ";
            this._ui.list1.itemRender = ZuoQiMissionTopRenderView;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onMissionView);
            this._ui.list1.array = [];
        }
    }

    private onMissionView(item:ZuoQiMissionTopRenderView){
        item.setData(item.dataSource);
    }

    /**派遣 */
    private onPaiQian(){
        if(this.selectIdsList.length >= this._dispatchMaxCnt){
            this.model.mission(this.cfg.f_id,this.selectIdsList);
        }
        this.Close();
    }

    private onRenderHandler(item:ZuoQiMissionRenderView){
        item.setData(item.dataSource);
    }

    protected onInit(): void {
        let cfg: Configs.t_Mount_Mission_dat = this.Data;
        this.cfg = cfg;
        this._ui.nameTf.text = cfg.f_PlaceName;
        this._dispatchMaxCnt = cfg.f_MountNum;
        // + Math.floor(Math.random() * 2);
        
        this._ui.tf1.text = E.LangMgr.getLang("DispathReward",TimeUtil.timeFormatStr(cfg.f_MissionTime,true));

        ItemViewFactory.renderItemSlots(this._ui.itemContriner,cfg.f_PlaceReward);
        /////////////////////////////////////////////////////////////////////////////
        let l = this.model.freeRideList(cfg.f_PlaceQuality);
        this._ui.list2.array = ZuoqiFactory.sortList(l);
        this._ui.list2.scrollTo(0);

        let _dataList = [];
        for (let i = 0; i < this._dispatchMaxCnt; i++) {
            _dataList.push(IconUtils.Empty);
        }
        this._ui.list1.width = this._dispatchMaxCnt * (125 + this._ui.list1.spaceX);
        this._ui.list1.array = _dataList;
        this.updateDispatchBtn();
    }

    /**更新派遣的按钮 */
    private updateDispatchBtn(){
        this._ui.paiqianbtn.visible = this.selectIdsList.length >= this._dispatchMaxCnt;
    }

}