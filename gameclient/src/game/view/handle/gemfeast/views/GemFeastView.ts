import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { BaoShiShopProxy } from "../../baoshi/proxy/BaoShiProxy";
import { t_Gem_Shop_Activity } from "../../duanwu/DuanWuProxy";
import { DuanWuView } from "../../duanwu/views/DuanWuView";
import { EActivityType } from "../../huodong/model/EActivityType";
import { ItemUpdateCtl } from "../../main/ctl/ItemUpdateCtl";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { ECellType } from "../../main/vos/ECellType";
import { ItemVo } from "../../main/vos/ItemVo";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { GemFeastModel } from "../GemFeastModel";

class GemItemCtl {
    private _buyCfg: Configs.t_Gem_Shop_dat;
    private skin: ui.views.gemfeast.ui_gemfeast_itemUI;
    private cfg: Configs.t_Gem_Shop_Activity_dat;
    constructor(skin: ui.views.gemfeast.ui_gemfeast_itemUI, id: number) {
        this.skin = skin;
        this.cfg = t_Gem_Shop_Activity.Ins.GetDataById(id);
        /**
        购买该类宝石消耗的优先级（t_Gem_Shop中的f_id）
        2|1：先显示2，2不够时再显示1
         */
        this.skin.on(Laya.Event.DISPLAY,this,this.onDisplay);    
        this.skin.on(Laya.Event.UNDISPLAY,this,this.onUndisplay);
        ButtonCtl.CreateBtn(this.skin.btn1,this,this.onBuyHandler);
    }

    private onBuyHandler(){
        E.ViewMgr.Open(EViewType.BaoShiGMView,null,this._buyCfg);
    }

    private onDisplay(){
        MainModel.Ins.on(MainEvent.ValChange,this,this.onUpadteMoney);
        this.onUpadteMoney();
    }

    private isEnough(_gemCfg: Configs.t_Gem_Shop_dat) {
        let discount: number = _gemCfg.f_Discount / 10000;
        let itemVo: ItemVo = ItemViewFactory.convertItem(_gemCfg.f_price);
        let val = itemVo.count * discount;
        let have:number = MainModel.Ins.mRoleData.getVal(itemVo.cfgId);
        return have >= val;
    }

    private onUpadteMoney() {
        let arr = this.cfg.f_PricePriority.split("|");
        let _curGemCfg: Configs.t_Gem_Shop_dat;
        for (let i = 0; i < arr.length; i++) {
            let o = parseInt(arr[i]);
            let _gemCfg: Configs.t_Gem_Shop_dat = BaoShiShopProxy.Ins.GetDataById(o);
            // let itemVo:ItemVo = ItemViewFactory.convertItem(gemCfg.f_price);
            // if(MainModel.Ins.isItemEnoughSt(_gemCfg.f_price)){
            if(this.isEnough(_gemCfg)){
                _curGemCfg = _gemCfg;
                break;
            }
        }
        if(!_curGemCfg){
            let o = parseInt(arr[arr.length -1]);
            let _gemCfg:Configs.t_Gem_Shop_dat = BaoShiShopProxy.Ins.GetDataById(o);
            _curGemCfg = _gemCfg;
        }

        let discount:number = 1//_curGemCfg.f_Discount / 10000;
        let itemVo:ItemVo = ItemViewFactory.convertItem(_curGemCfg.f_price);

        if(discount >= 1){
            this.skin.zhekouImg.visible = false;
        }else{
            this.skin.zhekouImg.visible = true;
            let a = (_curGemCfg.f_Discount / 1000).toFixed(0);
            this.skin.zhekouTf.text = E.getLang("limitdiscount",a);
            this.skin.oldGoldTf.text = E.getLang("oldprice") + itemVo.count;//原价
        }

        this.skin.countTf.text = itemVo.count * discount + "";
        this.skin.moneyIcon.skin = itemVo.getIcon();

        // 
        ///////////////////////////////
        let _resultItemVo = ItemViewFactory.convertItem(`${_curGemCfg.f_itemid}-1`);
        this.skin.tf1.text = _resultItemVo.getName();
        ItemViewFactory.refreshSlot(this.skin.slot,_resultItemVo);
        this._buyCfg = _curGemCfg;
    }
    private onUndisplay(){
        MainModel.Ins.off(MainEvent.ValChange,this,this.onUpadteMoney);
    }
}

/**宝石盛宴视图 */
export class GemFeastView extends DuanWuView {
    private gemList:GemItemCtl[] = [];
    protected initSkin(){
        this.UI = this._ui = new ui.views.gemfeast.ui_gemfeast_mainUI();
        this._ui.desctf.text = E.getLang("gemfeast01");
        this.gemList.push(
            new GemItemCtl(this._ui.item0,1),
            new GemItemCtl(this._ui.item1,2)
        );
        ItemUpdateCtl.Create(this._ui.juanzhou2Tf,ECellType.BaoShiQuan);
        this._ui.juanzhouicon2.skin = IconUtils.getIconByCfgId(ECellType.BaoShiQuan);
        ItemUpdateCtl.Create(this._ui.juanzhoutf,ECellType.BaoShiQuanG);
        this._ui.juanzhouicon.skin = IconUtils.getIconByCfgId(ECellType.BaoShiQuanG);
        ItemUpdateCtl.Create(this._ui.goldtf,ECellType.GOLD);
    }
    protected bindModel(){
        this.model = GemFeastModel.Ins;
    }
    protected initUI(){
        // this.model = GemFeastModel.Ins;
        this.initSkin();
    }
    protected onAddLoadRes(): void { 
        this.addAtlas("duanwu.atlas");
        this.addAtlas("gemfeast.atlas"); 
    }
    protected onBtnTipClick(){
        if(this.model.packId == EActivityType.DuanWu){
            E.ViewMgr.openHelpView("gemfeasttitle","gemfeastdesc");
        }else{
            E.ViewMgr.openHelpView("gemfeasttitle1","gemfeastdesc1");
        }
    }
}