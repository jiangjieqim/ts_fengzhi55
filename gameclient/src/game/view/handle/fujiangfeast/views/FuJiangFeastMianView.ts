import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { CheckBoxCtl, ICheckBoxSkin } from "../../../../../frame/view/CheckBoxCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { RecruitChief_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { DuanWuView } from "../../duanwu/views/DuanWuView";
import { FuJiangModel } from "../../fujiang/model/FuJiangModel";
import { FuJiangConfigProxy } from "../../fujiang/proxy/FuJiangProxy";
import { ItemUpdateCtl } from "../../main/ctl/ItemUpdateCtl";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainModel } from "../../main/model/MainModel";
import { ECellType } from "../../main/vos/ECellType";
import { ItemVo } from "../../main/vos/ItemVo";
import { FuJiangFeastModel } from "../FuJiangFeastModel";
/**副将盛宴 */
export class FuJiangFeastMianView extends DuanWuView{
    private skin:ui.views.fujiangfeast.ui_fujiangfeast_mainUI;
    private cfg:Configs.t_Chief_draw_config_dat;
    private _checkBoxCtl:CheckBoxCtl;

    protected bindModel(){
        this.model = FuJiangFeastModel.Ins;
    }
    protected initUI(){
        // this.model = FuJiangFeastModel.Ins;
        this.UI = this._ui = new ui.views.fujiangfeast.ui_fujiangfeast_mainUI();
        this.skin = this._ui;
        this._ui.desctf.text = E.getLang("fujiangfeast01");

        ItemUpdateCtl.Create(this._ui.juanzhoutf,ECellType.JunLingZhuang);
        ItemUpdateCtl.Create(this._ui.goldtf,ECellType.GOLD);
        
        this.cfg = FuJiangConfigProxy.Ins.List[0];

        ButtonCtl.CreateBtn(this._ui.xunzaoBtn,this,this.oneGetHandler);
        ButtonCtl.CreateBtn(this._ui.threeBtn,this,this.tenGetHandler);
        ButtonCtl.CreateBtn(this._ui.juanzhou,this,this.onBuy);

        this._checkBoxCtl = new CheckBoxCtl({bg:this.skin.ck,gou:this.skin.gou} as ICheckBoxSkin);
        this._checkBoxCtl.selectHander = new Laya.Handler(this,this.onSelectHander);
        this._checkBoxCtl.selected = true;
        this.updataView();
    }

    private onSelectHander(){
        this.updataView();
    }

    private _zk10:ItemVo;
    private _zk35:ItemVo;
    private updataView(){
        let _ten;
        let _35;
        if(!this._checkBoxCtl.selected){
            _ten = ItemViewFactory.convertItem(this.cfg.f_drawten);
            this._zk10 = ItemViewFactory.convertItem(this.cfg.f_FeastDiscount);
            _35 = ItemViewFactory.convertItem(this.cfg.f_drawmulti);
            this._zk35 = ItemViewFactory.convertItem(this.cfg.f_Drawsinglediscount);
        }else{
            _ten = ItemViewFactory.convertItem(this.cfg.f_drawten_gold);
            this._zk10 = ItemViewFactory.convertItem(this.cfg.f_FeastDiscount_gold);
            _35 = ItemViewFactory.convertItem(this.cfg.f_drawmulti_gold);
            this._zk35 = ItemViewFactory.convertItem(this.cfg.f_Drawsinglediscount_gold);
        }
       
        this.skin.ybicon.skin = _ten.getIcon();
        this.skin.ybtf1.text = this._zk10.count + "";
        this.skin.oldTf1.text = _ten.count + "";
        this.skin.zhekouTf1.text = E.getLang("limitdiscount",this.cfg.f_discountvalue);
       
        this.skin.rightYuanBaoIcon.skin = _35.getIcon();
        this.skin.threeTf.text = this._zk35.count + "";
        this.skin.oldTf.text = _35.count+"";
        this.skin.zhekouTf.text =  E.getLang("limitdiscount",this.cfg.f_discountvalue);
    }

    private onBuy(){
        E.ViewMgr.Open(EViewType.FuJiangGouMai);
    }

    private chouqu(type:number){
        // FuJiangModel.Ins.freeCount = value.freeCount;
        // FuJiangModel.Ins.event(FuJiangModel.FUJIANG_UPDATA);
        FuJiangModel.Ins.zmNum = type;
        let req:RecruitChief_req = new RecruitChief_req();
        req.itemId = this._zk10.cfg.f_itemid;
        req.type = type;
        SocketMgr.Ins.SendMessageBin(req);
    }
    protected onInit(){
        super.onInit();
        // FuJiangModel.Ins.on(FuJiangModel.FUJIANG_UPDATA, this, this.onUpdateEvt);
        FuJiangModel.Ins.on(FuJiangModel.FUJIANG_ZHAOMU_UPDATA, this, this.openFuJiangHuoDe);
        // this.onUpdateEvt();
    }

    // private onUpdateEvt() {
    //     let freeCount: number = FuJiangModel.Ins.freeCount;
    //     this.skin.xunzhaotf.text = freeCount > 0 ? E.getLang("fjbtn2", StringUtil.toChinesNum(freeCount)) : E.getLang("fjbtn1");
    // }

    protected onExit() {
        super.onExit();
        FuJiangModel.Ins.off(FuJiangModel.FUJIANG_ZHAOMU_UPDATA, this, this.openFuJiangHuoDe);
        // FuJiangModel.Ins.off(FuJiangModel.FUJIANG_UPDATA, this, this.onUpdateEvt);
    }
    protected openFuJiangHuoDe() {
        if(FuJiangModel.Ins.zmNum == 1){
            E.ViewMgr.Open(EViewType.FuJiangHuoDe,null,[FuJiangModel.Ins.getIndexEff(),this._zk10]);
        }else if(FuJiangModel.Ins.zmNum == 2){
            E.ViewMgr.Open(EViewType.FuJiangHDView1,null,this._zk35);
        }
    }
    private tenGetHandler(){
        if(!this._checkBoxCtl.selected){
            if(!MainModel.Ins.isItemEnoughSt(this.cfg.f_Drawsinglediscount)){
                this.onBuy();
                return;
            }
        }
        this.chouqu(2);
    }

    private oneGetHandler(){
        if(!this._checkBoxCtl.selected){
            if(!MainModel.Ins.isItemEnoughSt(this.cfg.f_FeastDiscount)){
                this.onBuy();
                return;
            }
        }
        this.chouqu(1);
    }

    protected onAddLoadRes(): void {
        this.addAtlas("fujiang.atlas");
        this.addAtlas("duanwu.atlas");
        this.addAtlas("fujiangfeast.atlas"); 
    }

    protected onBtnTipClick(){
        E.ViewMgr.openHelpView("fjfeasttitle","fjfeastdesc");
    }
}