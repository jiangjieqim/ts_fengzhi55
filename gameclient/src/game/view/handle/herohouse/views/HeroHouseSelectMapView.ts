import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { GymGoto_req, GymLock_req } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import { HeroHouseModel, HeroHouseTaskVo } from "../HeroHouseModel";
import { GymEvent } from "../model/GymEvent";
import { t_Gym_Map } from "../model/GymProxy";
class MapSel{
    sel:boolean;
    cfg:Configs.t_Gym_Map_dat;
    index:number;
}
/**地图条件 */
export class MapCondition{
    task:string;
    passId:number;
}

class MapSelectItem extends ui.views.hero_house.ui_hero_house_map_bot_item_viewUI{
    public vo:MapSel;
    constructor(){
        super();
        this.on(Laya.Event.CLICK,this,this.onSelectHandler);
    }

    private onSelectHandler(){
        let mapView:HeroHouseSelectMapView = E.ViewMgr.Get(EViewType.HeroHouseMapSel) as HeroHouseSelectMapView;
        let l = mapView.mapDataList;
        for(let i = 0;i < l.length;i++){
            let cell = l[i];
            if(cell.index == this.vo.index){
                cell.sel = true;
            }else{
                cell.sel = false;
            }
        }
        mapView.refreshView();
        // console.log(this.vo);
    }

}

/**
 * 地图选择
 */
export class HeroHouseSelectMapView extends ViewBase {
    public mapDataList:MapSel[];
    private model:HeroHouseModel;
    private _ui:ui.views.hero_house.ui_hero_house_map_sel_viewUI;
    private unlockCtl:ButtonCtl;
    private selectBtnCtl:ButtonCtl;
    private _mapSelVo:MapSel;
    protected onAddLoadRes(): void { }
    protected onExit(): void { 
        this.model.off(GymEvent.MapUdapate,this,this.onUpdateViewEvt);
    }
    protected onFirstInit(): void { 
        if(!this.UI){
            this.model = HeroHouseModel.Ins;
            this.UI = this._ui = new ui.views.hero_house.ui_hero_house_map_sel_viewUI;
            this._ui.list2.itemRender = MapSelectItem;
            this._ui.list2.renderHandler = new Laya.Handler(this,this.itemRender);
            // this._ui.list2.selectHandler = new Laya.Handler(this,this.onSelectHandler);
            this._ui.list2.selectEnable = true;
            this.bindClose(this._ui.close1);

            //任务
            this._ui.list1.itemRender = ui.views.hero_house.ui_hero_house_map_sel_item_viewUI;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onRenderHandler);

            this.unlockCtl = ButtonCtl.CreateBtn(this._ui.unlockBtn,this,this.onUnlockHandler);
            this.selectBtnCtl = ButtonCtl.CreateBtn(this._ui.selectBtn,this,this.onSelectMapHandler);
            this.addBlackBg(0.5);
        }
    }

    /**解锁 */
    private onUnlockHandler(){
        let req = new GymLock_req();
        SocketMgr.Ins.SendMessageBin(req);
    }

    /**显隐解锁条件标题 */
    private set bLockCondition(v: boolean) {
        this._ui.tf2.visible = v;
        this.bLockList = v;
    }

    /**解锁列表是否显示着 */
    private get bLockListShow() {
        return this._ui.list1.visible;
    }

    /**显隐解锁条件列表 */
    private set bLockList(v: boolean) {
        this._ui.list1.visible = v;
    }

    /**
     * 选择
     */
    private onSelectMapHandler() {
        let req = new GymGoto_req();
        req.mapId = this._mapSelVo.cfg.f_id;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onRenderHandler(item:ui.views.hero_house.ui_hero_house_map_sel_item_viewUI){
        let _data:MapCondition = item.dataSource;
        let cell:HeroHouseTaskVo = HeroHouseModel.Ins.getMapTaskDesc(_data);
        
        if(cell.empty){
            item.tf1.text = "";
        }else{
            item.tf1.text = cell.desc;
        }

        if(!cell.empty && cell.finished){
            item.gouimg.visible = true;
        }else{
            item.gouimg.visible = false;
        }
    }

    private itemRender(item:MapSelectItem){
        // let cfg:Configs.t_Gym_Map_dat = item.dataSource;
        let vo:MapSel = item.dataSource;
        item.vo = vo;
        if(vo.sel){
            item.selimg.visible = true;
        }else{
            item.selimg.visible = false;
        }
        
        if(HeroHouseModel.Ins.isMapLocked(vo.cfg.f_id)){
            item.lockimg1.visible = true;
        }else{
            item.lockimg1.visible = false;
        }
        item.icon.skin = this.model.getMapIcon(vo.cfg.f_Icon);//`remote/hero_house/${vo.cfg.f_Icon}.png`;
    }

    private getSelectVo():MapSel{
        let l = this.mapDataList;
        return l.find(item=>item.sel==true);
    }

    /**有任务未完成 */
    private hasNoFinished(cfg:Configs.t_Gym_Map_dat,l:MapCondition[]){
        for(let i = 0;i < l.length;i++){
            let cell:HeroHouseTaskVo = HeroHouseModel.Ins.getMapTaskDesc(l[i]);
            if(!cell.finished){
                return true;
            }
        }
    }

    public refreshView() {
        this._ui.list2.refresh();
        let selVo = this.getSelectVo();
        this._mapSelVo = selVo;
        this._ui.tf1.text = selVo.cfg.f_MapName;

        this._ui.qizhiIcon.skin = this.model.getMapIcon(selVo.cfg.f_Icon);//`remote/hero_house/flag_yang.png`;

        if (HeroHouseModel.Ins.isMapLocked(selVo.cfg.f_id)) {
            //锁定中
            this._ui.lockmask1.visible = true;

        } else {
            //已经解锁
            this._ui.lockmask1.visible = false;

        }
        this._ui.tf1.color = selVo.cfg.f_Color;

        let vo = selVo;
        //clear
        this._ui.img1.visible = false;
        this.unlockCtl.visible = false;
        this.selectBtnCtl.visible = false;
        this._ui.tf6.visible = false;
        this.bLockCondition = false;
        let hasDesc = false;

        //==========================

        if (HeroHouseModel.Ins.isSelMap(vo.cfg.f_id)) {
            this._ui.tf7.text = "当前区域";
            this._ui.img1.visible = true;
            // this.bLockList = true;
            hasDesc = true;
        } else if (this.model.isNextUnlock(vo.cfg.f_id)) {
            this.bLockCondition = true;
            this.unlockCtl.visible = true;//未解锁
           
        } else {
            if(this.model.info.mapId >= vo.cfg.f_id){
                // this._ui.list1.visible = true;
                this.selectBtnCtl.visible = true;
                hasDesc = true;
            }else{
                // this._ui.list1.visible = false;
                this._ui.tf6.visible = true;
                this._ui.tf6.text = "需解锁前置任务";
            }
        }
        let _mapConditions = [];

        if (this.bLockListShow) {
            //是否有解锁列表
            let condition: string[] = selVo.cfg.f_Condition.split("|");
            for(let i = 0;i < condition.length;i++){
                let cell = new MapCondition();
                cell.task = condition[i];
                _mapConditions.push(cell);
            }
            if(selVo.cfg.f_Adventure_Level){
                let cell = new MapCondition();
                cell.passId = selVo.cfg.f_Adventure_Level;
                _mapConditions.push(cell);
            }
        }
        this._ui.list1.array = _mapConditions;
        if(this.hasNoFinished(selVo.cfg,_mapConditions)){
            this._ui.tf5.text = "未解锁";
        }else{
            //任务都完成了 可以解锁
            this._ui.tf5.text = "解锁";
        }

        if(hasDesc){
            this._ui.titleTf1.visible = true;
            this._ui.heroInfoTf.text = selVo.cfg.f_Info;
        }else{
            this._ui.titleTf1.visible = false;
            this._ui.heroInfoTf.text = "";
        }
        
    }

    private onUpdateViewEvt(){
        this.refreshView();
    }

    private mapDataInit(){
        if(!this.mapDataList){
            this.mapDataList = [];
            let l = t_Gym_Map.Ins.List;
            for(let i =0;i < l.length;i++){
                let cell = l[i];
                let vo = new MapSel();
                vo.index = i;
                vo.cfg = cell;
                vo.sel = false;
                this.mapDataList.push(vo);
            }
        }
    }

    private get selectMapIndex(){
        let cell = this.mapDataList.find(item=> item.sel == true);
        return cell ? cell.index : 0;
    }

    private selectDefault(){
        let index:number = this.selectMapIndex;
        this.mapDataList[index].sel = true;
    }

    protected onInit(): void { 
        this.mapDataInit();
        this.model.on(GymEvent.MapUdapate,this,this.onUpdateViewEvt);
        this.selectDefault();
        this._ui.list2.array = this.mapDataList;
        this._ui.list2.scrollTo(0);
        this.refreshView();
    }
}