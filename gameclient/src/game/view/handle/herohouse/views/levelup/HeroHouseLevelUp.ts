import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { TabControl } from "../../../../../../frame/view/TabControl";
import {ViewBase} from "../../../../../../frame/view/ViewBase";
import { ui } from "../../../../../../ui/layaMaxUI";
import { HeroHouseModel } from "../../HeroHouseModel";
import { EFacilityType } from "../../model/EGymType";
import { GymEvent } from "../../model/GymEvent";
import { HeroFacilitiesVo } from "../../model/HeroFacilitiesVo";
import { HeroLittleIconCtl } from "./HeroLittleIconCtl";
import { HeroLvForward } from "./HeroLvForward";
import { YanWuLevelUp } from "./YanWuLevelUP";

//#region 武馆进阶
export class HeroHouseLevelUp extends ViewBase {
    // private _yw:YanWuLevelUP;
    // private _itemViewList:HeroUpLevelBase[] = [];
    private _ui: ui.views.hero_house.ui_hero_house_level_upUI;
    private model: HeroHouseModel;
    private vo: HeroFacilitiesVo;
    private itemList: HeroLittleIconCtl[] = [];
    private _tabsCtl:TabControl = new TabControl();
    private labelArr:string[] = ["强化","洗练"];
    protected mMask: boolean = true;
    protected onAddLoadRes(): void { }
    private ywView:YanWuLevelUp;
    private otherView:HeroLvForward;
    protected onExit(): void {
        this.model.off(GymEvent.FacilitiesUpdate, this, this.onRefreshView);
    }

    protected onFirstInit(): void {
        if (!this.UI) {
            this.model = HeroHouseModel.Ins;
            this.UI = this._ui = new ui.views.hero_house.ui_hero_house_level_upUI();
            this.bindClose(this._ui.close1);
            // let t0:ITabControlSkin = {img:this._ui.qianhuaBtn,tf:this._ui.tf4} as ITabControlSkin;
            // let t1:ITabControlSkin = {img:this._ui.washBtn,tf:this._ui.tf5} as ITabControlSkin;

            this._tabsCtl.init([this._ui.qianhuaBtn,this._ui.washBtn],new Laya.Handler(this,this.onSelectHandler),new Laya.Handler(this,this.onTabItem))
            this._tabsCtl.setData(this.labelArr);

            // ButtonCtl.CreateBtn(this._ui.qianhuaBtn, this, this.onQiangHua);
            // ButtonCtl.CreateBtn(this._ui.washBtn, this, this.onWashHandler);

            this.itemList = [];
            for (let i = 0; i < 5; i++) {
                let cell = new HeroLittleIconCtl(this._ui["item" + i]);
                cell.vo = this.model.facilitList[i];
                this.itemList.push(cell);
            }
            let breakBtnCtl:ButtonCtl = ButtonCtl.CreateBtn(this._ui.tupoBtn,this,this.tupoHandler);
            this.ywView = new YanWuLevelUp(this._ui);
            this.ywView.breakBtnCtl = breakBtnCtl;

            this.otherView = new HeroLvForward(this._ui);
            this.otherView.breakBtnCtl = breakBtnCtl;

        }
    }

    private tupoHandler(data:HeroFacilitiesVo){
        this.model.levelUp(data);
    }

    private onTabItem(img:Laya.Image,i,sel,data) {
        if (sel) {
            img.skin = "remote/main/main/anniu_2.png";
        } else {
            img.skin = "remote/main/main/anniu_1.png";
        }
        let labels:Laya.Label[] = [this._ui.tf4,this._ui.tf5];
        labels[i].text = data;
    }
    
    private onSelectHandler(index:number) {
        this.model.selLevelTabIndex = index;
        let type = this.model.selLevelUpType;
        if(type != EFacilityType.Fight){
            this.otherView.type = type;
            this.otherView.refresh();
        }
    }

    protected onInit(): void {
        this.model.on(GymEvent.FacilitiesUpdate, this, this.onRefreshView);
        this.onRefreshView();
       
        this._tabsCtl.selectIndex = this.model.selLevelTabIndex;
    }

    private clearView() {
        this._ui.jingjie.visible = false;
        this._ui.tupo_task.visible = false;
        this._ui.xilianswitch.visible = false;
        this._ui.yanwutai.visible = false;  //演武台
    }

    public onRefreshView() {

        this.clearView();
        this.updateBottom();
        let type: EFacilityType = this.model.selLevelUpType;

        // let itemView:HeroUpLevelBase = this._itemViewList.find(item=>item.type == type);
        if(type == EFacilityType.Fight){
            this.ywView.visible = true;
            this.ywView.refresh();
            this.otherView.visible = false;
        }else{
            this.ywView.visible = false;
            this.otherView.visible = true;
            this.otherView.type = type;
            this.otherView.refresh();
        }
        if(type == EFacilityType.Fight){
            this._tabsCtl.visible = false;
        }else{
            this._tabsCtl.visible = true;
        }

        this.vo = this.model.facilitList.find(item => item.type == type);
        let _vo = this.vo;
        if (_vo) {
            _vo.setIcon(this._ui.icon);
            this._ui.nameTf.text = _vo.name;
            this._ui.lvTf.text = "Lv."+_vo.curLv;
        }else{
            // console.log(type);
        }
    }

    public updateBottomSel() {
        for(let i = 0;i < this.itemList.length;i++){
            let cell = this.itemList[i];
            cell.updateSelect();
        }
    }

    /**更新底部选择按钮 */
    private updateBottom() {
        // this.itemList.forEach(cell=>{
        //     cell.refreshView();
        // })

        for(let i = 0;i < this.itemList.length;i++){
            let cell = this.itemList[i];
            cell.vo = this.model.facilitList[i];
            cell.refreshView();
        }

    }
}
//#endregion