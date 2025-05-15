import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { CheckBoxCtl } from "../../../../../../frame/view/CheckBoxCtl";
import {ViewBase} from "../../../../../../frame/view/ViewBase";
import { ui } from "../../../../../../ui/layaMaxUI";
import { E } from "../../../../../G";
import { IListData, SelectListCtl } from "../../../main/ctl/SelectListCtl";
import { RedEnum } from "../../../main/model/RedEnum";
import { ISaveData, RedUpdateModel, RedUpdateUtils } from "../../../main/model/RedUpdateModel";
import { EInviteType, HeroHouseModel } from "../../HeroHouseModel";
import { EGymRoleType } from "../../model/EGymType";
import { t_Gym_NPC_Quality } from "../../model/GymProxy";
export class HeroSelQua implements IListData{
    color:string;
    txt:string;
    f_id:number;
}
/**武馆委托 */
export class HeroHouseWeiTuoView extends ViewBase {
    protected mMask: boolean = true;

    private _ui: ui.views.hero_house.ui_hero_house_weituo_viewUI;
    private ckCtl0: CheckBoxCtl;
    private ckCtl1: CheckBoxCtl;
    private ck2: CheckBoxCtl;
    protected onAddLoadRes(): void { }
    protected onExit(): void {
        // this.uploadConfig();
    }

    private uploadConfig(){
        let l1:ISaveData[] = [];
        RedUpdateUtils.push(l1,RedEnum.HERO_AUTO_CK2,this.ck2);
        RedUpdateUtils.push(l1,RedEnum.HERO_AUTO_CK1,this.ckCtl1);
        RedUpdateUtils.push(l1,RedEnum.HERO_AUTO_CK0,this.ckCtl0);
        RedUpdateUtils.push(l1,RedEnum.HERO_AUTO_QUA,this.selectCtl);
        RedUpdateModel.Ins.saveArr(l1);
    }

    private selectCtl: SelectListCtl = new SelectListCtl();
    protected onFirstInit(): void {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.hero_house.ui_hero_house_weituo_viewUI();
            this.bindClose(this._ui.close1);
            ButtonCtl.CreateBtn(this._ui.startBtn, this, this.onStartHandler);

            let arr = E.getLang("GymWeiTuo").split("|");
            // this._ui.ck0
            this.ckCtl0 = new CheckBoxCtl(this._ui.ck0, arr[0]);
            this.ckCtl0.selectHander = new Laya.Handler(this, this.onSelectHandler);
            this.ckCtl1 = new CheckBoxCtl(this._ui.ck1, arr[1]);
            this.ckCtl1.selectHander = new Laya.Handler(this, this.onSelectHandler);
            let ck2 = new CheckBoxCtl(this._ui.ck2, arr[2]);
            ck2.selectHander = new Laya.Handler(this, this.onSelectHandler);
            this.ck2 = ck2;

 

            this.initSelView();
        }
    }

    private initSelView() {
        let listData: HeroSelQua[] = [];
        let l = t_Gym_NPC_Quality.Ins.List;
        for (let i = l.length-1; i >= 0; i--) {
            let _cfg: Configs.t_Gym_NPC_Quality_dat = l[i];
            if (_cfg.f_id != EGymRoleType.Beggar) {
                let vo = new HeroSelQua();
                vo.color = _cfg.f_Color;
                vo.txt = _cfg.f_name;
                vo.f_id = _cfg.f_id;
                listData.push(vo);
            }
        }
        listData.reverse();
        this.selectCtl.init(this._ui.sanjiao, this._ui.listarea, this._ui.listcontainer, this._ui.listtf,
            ui.views.main.ui_quick_setting_list_attrUI, listData);
        this.selectCtl.selectHandler = new Laya.Handler(this,this.onSelectHandler);

    }
    private onSelectHandler() {
        // console.log(this.ck2.selected, this.ckCtl0.selected, this.ckCtl1.selected);
        // console.log(this.selectCtl.selectVo);
        this.uploadConfig();
    }

    private onStartHandler() {
        let cur = HeroHouseModel.Ins.autoCtl.uiVo;
        if(this.ck2.selected){
            cur.qua = (this.selectCtl.selectVo as Configs.t_Gym_NPC_Quality_dat).f_id;
        }else{
            cur.qua = null;
        }

        cur.bSmriti = this.ckCtl0.selected;
        cur.bNewHero = this.ckCtl1.selected;
        if(HeroHouseModel.Ins.canInvite(EInviteType.One,true)){
            HeroHouseModel.Ins.autoCtl.setAuto(true);
        }
        this.Close();
    }
    protected onInit(): void {
        RedUpdateUtils.refreshByConfig(this.ckCtl0,RedEnum.HERO_AUTO_CK0,true);
        RedUpdateUtils.refreshByConfig(this.ckCtl1,RedEnum.HERO_AUTO_CK1,true);
        RedUpdateUtils.refreshByConfig(this.ck2,RedEnum.HERO_AUTO_CK2,true);
        RedUpdateUtils.refreshByConfig(this.selectCtl,RedEnum.HERO_AUTO_QUA,0);

        let cur:number = this.selectCtl.curIndex;
        this.selectCtl.selectIndex(cur);
    }
}