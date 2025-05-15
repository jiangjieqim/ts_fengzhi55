import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { stSpirit } from "../../../../network/protocols/BaseProto";
import { t_Spirit_Config, t_Spirit_ExpCost } from "../../herohouse/model/GymProxy";
import { SoulVo } from "../model/SoulVo";
import { SoulIconItemCtl } from "./SoulIconItem";
import { SoulUpgradeView } from "./SoulUpgradeView";
export class SoulSelUpgradeVo{
    /**是否选择中 */
    public sel:boolean;

    public data:SoulVo;

    /**计算单个个战魂吞噬后可以获得的经验 */
    public computeExp(){
        let cell:stSpirit = this.data.vo;
        // 50(curExp)* t_Spirit_Config.f_SpiritUpgradeLost + t_Spirit_ExpCost.f_SpiritExp
        let f_SpiritUpgradeLost:number = (t_Spirit_Config.Ins.GetDataById(1) as Configs.t_Spirit_Config_dat).f_SpiritUpgradeLost;
        let f_SpiritExp:number = t_Spirit_ExpCost.Ins.getByQua(cell.qualityId).f_SpiritExp;
        return Math.floor(this.data.totalExp * (f_SpiritUpgradeLost / 100) + f_SpiritExp);
    }
}

/**强化格子 */
export class SoulUpgradeItem extends ui.views.soul.ui_soul_iconUI{
    public curData:SoulSelUpgradeVo;
    private vo:SoulVo;

    protected ctl:SoulIconItemCtl;

    constructor(){
        super();
        this.ctl = new SoulIconItemCtl(this);
        this.ctl.clickHandler = new Laya.Handler(this,this.onClickHandler);
    }
    protected onClickHandler(){
        let view:SoulUpgradeView = E.ViewMgr.Get(EViewType.SoulUpgrade) as SoulUpgradeView;

        // let afterExp = 0;
        // if(!this.curData.sel){
        //     // canClick = false;
        //     //未选择的情况
        //     let maxVal = view.maxVal;
        //     if(afterExp >= maxVal){
        //         return;
        //     }else{
        //         // canClick = true;
        //         //所有已经选择了的战魂+被升级的战魂的经验
        //         let allexp = view.computeExp() + view.curVo.exp;
        //         let cellExpVal = this.curData.computeExp();//吞噬此战魂将获得多少经验
        //         afterExp = cellExpVal + allexp;
        //         if(allexp < maxVal){
        //         }else{
        //             if( afterExp >= maxVal){
        //                 return;
        //             }
        //         }
        //         // if(allexp + cellExpVal < maxVal){
        //         // canSel = true;
        //         // }else{
        //         // 
        //         // }
        //     }
        // }else{
        //     // canClick = true;
        //     //有选择的时候去选操作
        //     afterExp =  view.computeExp();
        // }

        if(view.canSwallow(this.curData)){
            view.selectSoulItem(this.curData.data.vo.uid);
        }
    }

    public refreshView() {
        this.curData = this.dataSource;
        this.vo = this.curData.data;
        this.ctl.updateCell(this.vo.vo);        
        this.jiao.visible = this.curData.sel;
    }
}