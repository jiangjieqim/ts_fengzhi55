import { E } from "../../../../G";
import { EFuncDef } from "../../main/model/EFuncDef";
import { MainModel } from "../../main/model/MainModel";
import { IEquipItemSkin } from "../../main/views/EquipItemView";
import { HeroHouseModel } from "../HeroHouseModel";
import { GymEvent } from "./GymEvent";

export class HeroMainIconCtl {
    private mSkin:IEquipItemSkin;
    private model:HeroHouseModel; 
    constructor(mSkin:IEquipItemSkin) {
        this.model = HeroHouseModel.Ins;
        this.mSkin = mSkin;
        MainModel.Ins.bindBtn(mSkin, E.LangMgr.getLang("HeroHouse"),EFuncDef.HeroHouse);        
        this.model.on(GymEvent.FightAnimPlayEnd,this,this.onUpdateView);
        this.model.on(GymEvent.InvitePopUpdate,this,this.onUpdateView);
        this.model.on(GymEvent.RemovePop,this,this.onUpdateView);
        this.onUpdateView();
    }
    private onUpdateView(){
        let cell = this.model.popInfo;
        let red:boolean = false;
        if(cell.finishCount > 0){
            red = true;
        }
        this.mSkin.redimg.visible = red;
    }
}