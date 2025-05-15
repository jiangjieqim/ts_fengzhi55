import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { MainModel } from "../../main/model/MainModel";
import { ItemVo } from "../../main/vos/ItemVo";
import { HeroHouseModel } from "../HeroHouseModel";
import { HeroHouseStorgeView, HeroItemSelVo } from "./HeroHouseStorgeView";

/**
 * 物品道具格子
 */
export class  HeroHouseStorgeItemView extends ui.views.hero_house.ui_hero_house_storge_itemUI{
    private vo:HeroItemSelVo;
    constructor() {
        super();
        this.on(Laya.Event.CLICK,this,this.onClickHandler);
    }

    private onClickHandler(e:Laya.Event){
        e.stopPropagation();
        let view:HeroHouseStorgeView = E.ViewMgr.Get(EViewType.HeroHouseStorge) as HeroHouseStorgeView;
        let itemVo:ItemVo = this.vo.itemVo;
        MainModel.Ins.showSmallTips(itemVo.getName(), itemVo.getDesc(), this);
        view.refreshSelView(this.vo.index);
    }

    public refresh(){
        this.vo = this.dataSource;
        let itemVo:ItemVo = this.vo.itemVo;
        this.icon.skin = itemVo.getIcon();
        this.qua.skin = itemVo.quaIcon();
        if(this.vo.infinite){
            this.tf1.text = "";
            this.infiniteImg.visible = true;
        }else{
            this.tf1.text = itemVo.count + "";
            this.infiniteImg.visible = false;
        }
        this.updateSelectView();
    }

    private updateSelectView(){
        if(this.vo.itemId == HeroHouseModel.Ins.curStorgeItemId){
            this.sel.visible = true;
        }else{
            this.sel.visible = false;
        }
    }
}