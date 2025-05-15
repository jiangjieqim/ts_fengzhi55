import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../../ui/layaMaxUI";
import { HeroHouseModel, IHeroTask } from "../../HeroHouseModel";
import { EFacilityType } from "../../model/EGymType";

export interface IHeroUpLevelBase{
    refresh();
}

/**
 * 演武台升级接口View基础类
 */
export abstract class HeroUpLevelBase {
    /**
     * 设备 id
     */
    public type: EFacilityType;
    public abstract get container():Laya.Sprite;
    protected model:HeroHouseModel;
    protected skin: ui.views.hero_house.ui_hero_house_level_upUI;
    public breakBtnCtl:ButtonCtl;

    // private _vo:HeroFacilitiesVo;
    constructor(){
        this.model = HeroHouseModel.Ins;
    }
    /**突破 */
    protected onTuPoHandler() {
        this.levelUp();
    }
    public refresh(): void{
        this.skin.switchLvContainer.visible = false;
        this.skin.tupo_task.visible = false;
        this.skin.topcon.visible = true;
        this.skin.t2.text = "当前等级: "+this.vo.showLv;
        if(this.vo.isFullLv){
            this.skin.t3.text = "";
            this.skin.arrow1.visible = false;
        }else{
            this.skin.t3.text = "下一等级: " + (this.vo.showLv + 1);
            this.skin.arrow1.visible = true;
        }
        this.breakBtnCtl.data = this.vo;
    }

    public set visible(v:boolean){
        if(this.container.visible!=v){
            this.container.visible = v;
        }
    }
    /**升级 */
    protected levelUp(){
        // let req = new GymUpgrade_req();
        // req.id = this.vo.id;
        // SocketMgr.Ins.SendMessageBin(req);
        this.model.levelUp(this.vo);
    }

    public get visible(){
        return this.container.visible;
    }
    
    public get vo(){
        // if(!this._vo){
        return  HeroHouseModel.Ins.facilitList.find(item => item.type == this.type);
        // }
        // return this._vo;
    }

    protected updateTupo(result:IHeroTask){
        
        this.skin.topcon.visible = false;
        this.skin.yanwutai.visible = false;
        this.skin.tupo_task.visible = true;
        this.skin.taskDesc.text = result.taskDesc;
        this.skin.tupomoney.visible = false;

        if(result.taskNotComplete){
            this.breakBtnCtl.grayMouseDisable = false;
        }else{
            this.breakBtnCtl.grayMouseDisable = true;
        }
    }
}