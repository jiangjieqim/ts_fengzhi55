import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
// import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { GemBuy_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
// import { BaoShiShopProxy } from "../../baoshi/proxy/BaoShiProxy";
import { t_Alternation_Gem_Config } from "../../duanwu/DuanWuProxy";
import { DuanWuView } from "../../duanwu/views/DuanWuView";
// import { DuanWuView } from "../../duanwu/views/DuanWuView";
import { ItemUpdateCtl } from "../../main/ctl/ItemUpdateCtl";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { ECellType } from "../../main/vos/ECellType";
import { ItemVo } from "../../main/vos/ItemVo";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { GemFeastModel } from "../GemFeastModel";

class GemItemCtl {
    //private _buyCfg: Configs.t_Gem_Shop_dat;
    private skin: ui.views.gemfeast.ui_gemfeast_item2UI;
    private cfg: { num: number, rewards: string; truePrice: number };
    constructor(skin: ui.views.gemfeast.ui_gemfeast_item2UI, key: string) {
        this.skin = skin;
        const conf = t_Alternation_Gem_Config.Ins.GetDataById(1);
        this.cfg = {
            num: key === 'f_drawgemtriple' ? 3 : 1,
            rewards: conf[key],
            truePrice: key === 'f_drawgemtriple' ? conf['f_trueprice'] : 0
        };
        /**
        购买该类宝石消耗的优先级（t_Gem_Shop中的f_id）
        2|1：先显示2，2不够时再显示1
         */
        this.skin.on(Laya.Event.DISPLAY,this,this.onDisplay);    
        this.skin.on(Laya.Event.UNDISPLAY,this,this.onUndisplay);
        ButtonCtl.CreateBtn(this.skin.btn1,this,this.onBuyHandler);
    }

    private onBuyHandler(){
        //test
        // E.ViewMgr.Open(EViewType.BaoShiGMView,null,this._buyCfg);
        let req = new GemBuy_req();
        req.type = 1;
        req.id = 0;
        req.num = this.cfg.num;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onDisplay(){
        MainModel.Ins.on(MainEvent.ValChange,this,this.onUpadteMoney);
        this.onUpadteMoney();
    }

    // private isEnough(_gemCfg: Configs.t_Gem_Shop_dat) {
    //     let discount: number = _gemCfg.f_Discount / 10000;
    //     let itemVo: ItemVo = ItemViewFactory.convertItem(_gemCfg.f_price);
    //     let val = itemVo.count * discount;
    //     let have:number = MainModel.Ins.mRoleData.getVal(itemVo.cfgId);
    //     return have >= val;
    // }

    private onUpadteMoney() {
        //let arr = this.cfg.rewards.split("|");
        // let _curGemCfg: Configs.t_Gem_Shop_dat;
        // for (let i = 0; i < arr.length; i++) {
        //     let o = parseInt(arr[i]);
        //     let _gemCfg: Configs.t_Gem_Shop_dat = BaoShiShopProxy.Ins.GetDataById(o);
        //     // let itemVo:ItemVo = ItemViewFactory.convertItem(gemCfg.f_price);
        //     // if(MainModel.Ins.isItemEnoughSt(_gemCfg.f_price)){
        //     if(this.isEnough(_gemCfg)){
        //         _curGemCfg = _gemCfg;
        //         break;
        //     }
        // }
        // if(!_curGemCfg){
        //     let o = parseInt(arr[arr.length -1]);
        //     let _gemCfg:Configs.t_Gem_Shop_dat = BaoShiShopProxy.Ins.GetDataById(o);
        //     _curGemCfg = _gemCfg;
        // }

        
        let itemVo:ItemVo = ItemViewFactory.convertItem(this.cfg.rewards);
        let discount:number =  this.cfg.truePrice ? (itemVo.count / this.cfg.truePrice)  : 1;

        if(discount >= 1){
            this.skin.zhekouImg.visible = false;
        }else{
            this.skin.zhekouImg.visible = true;
            this.skin.zhekouTf.text = E.getLang("limitdiscount",(discount * 10).toFixed(0));
            this.skin.oldGoldTf.text = E.getLang("oldprice") + this.cfg.truePrice;//原价
        }

        this.skin.countTf.text = itemVo.count + '';
        this.skin.moneyIcon.skin = itemVo.getIcon();

        // 
        ///////////////////////////////
        // let _resultItemVo = ItemViewFactory.convertItem(`${_curGemCfg.f_itemid}-1`);
        // this.skin.tf1.text = _resultItemVo.getName();
        this.skin.tf1.text = E.getLang("gemLottery", this.cfg.num);
        //ItemViewFactory.refreshSlot(this.skin.slot,_resultItemVo);
        //this._buyCfg = _curGemCfg;
    }
    private onUndisplay(){
        MainModel.Ins.off(MainEvent.ValChange,this,this.onUpadteMoney);
    }
}

/**宝石盛宴视图 */
export class GemFeastView2 extends DuanWuView {
    private gemList:GemItemCtl[] = [];
    protected initSkin(){
        this.UI = this._ui = new ui.views.gemfeast.ui_gemfeast_main2UI();
        this._ui.desctf.text = E.getLang("gemfeast01");
        this.gemList.push(
            new GemItemCtl(this._ui.item20,'f_drawgemsingle'),
            new GemItemCtl(this._ui.item21,'f_drawgemtriple')
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
        E.ViewMgr.openHelpView("gemfeasttitle","gemfeastdesc");
    }
}