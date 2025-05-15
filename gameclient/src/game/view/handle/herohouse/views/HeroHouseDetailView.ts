import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { RowMoveBaseNode, ScrollPanelControl } from "../../../../../frame/view/ScrollPanelControl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EMsgBoxType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { stGymEquip } from "../../../../network/protocols/BaseProto";
import { HeroHouseModel } from "../HeroHouseModel";
import { GymEvent } from "../model/GymEvent";
import { t_Gym_NPC_List, t_Gym_NPC_Type } from "../model/GymProxy";

class HeroDetailItemViewVo{
    public heroType:number = 0;
    public showLabel:boolean = false;
    /**
     * 已经拥有的数量
     */
    public count:number;

    /**
     * 当前的最大数量
     */
    public maxCount:number;

    public equipList:stGymEquip[]=[];
}

class HeroDetailLabel extends RowMoveBaseNode{
    protected clsKey:string = "HeroDetailLabel";
    protected createNode (index){
        let _skin:ui.views.hero_house.ui_hero_house_detailed_item_labeUI = Laya.Pool.getItemByClass(this.clsKey,ui.views.hero_house.ui_hero_house_detailed_item_labeUI);
        let vo:HeroDetailItemViewVo = this.list[index];
        
        let _typeCfg: Configs.t_Gym_NPC_Type_dat = t_Gym_NPC_Type.Ins.getByType(vo.heroType);
        // this._ui.tf1.text = "类别:" + _typeCfg.f_Typename;
        _skin.tf1.text = _typeCfg.f_Typename + " :" + vo.count + "/" + vo.maxCount;
        // _skin.tf1.text = this.list[index];
        _skin.y = this.y;
        return _skin;
    }
}

class HeroDetailItemRender extends ui.views.hero_house.ui_hero_house_detailed_itemUI{
    public vo:stGymEquip;
    constructor(){
        super();
        ButtonCtl.CreateBtn(this.yiwanbtn, this, this.onClickHandler);
    }

    private onClickHandler() {
        let heroCfg = t_Gym_NPC_List.Ins.getByHeroID(this.vo.heroId);
        E.ViewMgr.ShowMsgBox(EMsgBoxType.OkOrCancel, E.getLang("HeroDel", heroCfg.f_name), new Laya.Handler(this, this.okHandler));
    }

    private okHandler() {
        HeroHouseModel.Ins.del(this.vo.uid);
    }
}
class HeroDetailItem extends RowMoveBaseNode {
    protected clsKey: string = "HeroDetailItem";
    protected createNode(index) {
        let _skin: HeroDetailItemRender = Laya.Pool.getItemByClass(this.clsKey, HeroDetailItemRender);
        let vo: stGymEquip = this.list[index];
        _skin.vo = vo;
        if(vo.heroId == 0){
            _skin.emptyTf.visible = true;
            _skin.unlock.visible = false;
            _skin.yiwanbtn.visible = false;
        }else{
            _skin.emptyTf.visible = false;
            _skin.unlock.visible = true;
            _skin.yiwanbtn.visible = true;
            HeroHouseModel.Ins.refreshAttrView([_skin.tf1, _skin.tf2], _skin.img, _skin.nametf, vo.attrList, vo.heroId);
            _skin.tf3.text = HeroHouseModel.Ins.getDegreeDesc(vo.degree);
            if(E.Debug){
                _skin.nametf.text+=" uid:"+vo.uid;
            }
        }
        _skin.y = this.y;
        return _skin;
    }
}
/**神识详情界面 */
export class HeroHouseDetailView extends ViewBase {
    private _ui: ui.views.hero_house.ui_hero_house_detailedUI;
    private model: HeroHouseModel;
    protected onAddLoadRes(): void { }
    protected onExit(): void {
        this.model.off(GymEvent.RemovePop, this, this.onRemovePop);
    }
    protected mMask: boolean = true;
    private _panelCtl: ScrollPanelControl = new ScrollPanelControl();
    protected onFirstInit(): void {
        if (!this.UI) {
            this.model = HeroHouseModel.Ins;
            this.UI = this._ui = new ui.views.hero_house.ui_hero_house_detailedUI();
            this.bindClose(this._ui.close1);
            this._panelCtl.init(this._ui.panel1);
        }
    }

    protected onInit(): void {
        this.model.on(GymEvent.RemovePop,this,this.onRemovePop);
        this.refreshPanel();
    }

    private onRemovePop(){
        this.refreshPanel(this._panelCtl.getScrollValue());
    }

    private refreshPanel(y?:number){
        let _dataList = this.getDataList();
        this._panelCtl.clear();
        for(let i = 0;i < _dataList.length;i++){
            let vo:HeroDetailItemViewVo = _dataList[i];
            if(vo.showLabel){
                this._panelCtl.split([vo],HeroDetailLabel,50);
            }else{
                this._panelCtl.split(vo.equipList,HeroDetailItem,148);
            }
        }
        // this._panelCtl.split(["a","*************b","=======>c"],HeroDetailLabel,50);
        this._panelCtl.end(y);
    }


    private getDataList():HeroDetailItemViewVo[]{
        let l = this.model.equipList;
        let _heroTypeMap = {};
        for(let i = 0;i < l.length;i++){
            let cell = l[i];
            let type = cell.heroType;
            if(!_heroTypeMap[type]){
                _heroTypeMap[type] = [];
            }
            let temp:stGymEquip[] = _heroTypeMap[type];
            temp.push(cell);
        }
        ///////////////////////////////////////////////
        let rl = [];

        let cfg = HeroHouseModel.Ins.levelCtl.curSlot.cfg;
        let arr = cfg.f_Slots.split("|");
        for(let i = 0;i < arr.length;i++){
            let cell = arr[i];
            let a = cell.split("-");
            let heroType = parseInt(a[0]);
            let count:number = parseInt(a[1]);

            let equipList:stGymEquip[] = _heroTypeMap[heroType];
            equipList = equipList || [];

            let vo:HeroDetailItemViewVo = new HeroDetailItemViewVo();
            vo.heroType = heroType;
            vo.showLabel = true;
            vo.count = equipList.length;
            vo.maxCount = HeroHouseModel.Ins.getUnlockCount(vo.heroType);
            rl.push(vo);
       
            for(let n = 0;n < count;n++){
                let _voData:HeroDetailItemViewVo = new HeroDetailItemViewVo();
                _voData.heroType = heroType;
                let _equipVo = equipList[n];
                if(_equipVo){
                    _voData.equipList.push(_equipVo);
                }else{
                    let cell = new stGymEquip();
                    cell.heroId = 0;
                    _voData.equipList.push(cell);
                }
                rl.push(_voData);
            }

            // console.log(rl);
        }
/*
        for(let heroType in _heroTypeMap){
            let arr:stGymEquip[] = _heroTypeMap[heroType];
            // console.log(heroType,arr);
            
            let vo:HeroDetailItemViewVo = new HeroDetailItemViewVo();
            vo.heroType = parseInt(heroType);
            vo.showLabel = true;
            vo.count = arr.length;
            vo.maxCount = HeroHouseModel.Ins.getUnlockCount(vo.heroType);
            rl.push(vo);

            let _voData:HeroDetailItemViewVo = new HeroDetailItemViewVo();
            for(let i = 0;i < arr.length;i++){
                _voData.equipList.push(arr[i]);
            }
            rl.push(_voData);
        }
*/
        return rl;
    }

}