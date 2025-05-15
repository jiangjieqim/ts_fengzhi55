import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { CheckBoxCtl, ICheckBoxSkin } from "../../../../../frame/view/CheckBoxCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { PetExtract_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { DuanWuView } from "../../duanwu/views/DuanWuView";
import { EFeastType } from "../../gemfeast/EFeastType";
import { GemFeastModel } from "../../gemfeast/GemFeastModel";
import { EActivityType } from "../../huodong/model/EActivityType";
import { ItemUpdateCtl } from "../../main/ctl/ItemUpdateCtl";
import { EFuncDef } from "../../main/model/EFuncDef";
import { ECellType } from "../../main/vos/ECellType";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { PetConfigProxy } from "../proxy/LingChongProxy";
import { LingChongModel } from "./LingChongModel";
export class LingChongFeastView extends DuanWuView{
    private skin:ui.views.lingchongfeast.ui_lingchong_feastUI;
    private _checkBoxCtl:CheckBoxCtl;
    private readonly timeDelay:number = 300;
    protected bindModel(){
        this.model = LingChongFeastModel.Ins;
    }
    protected initUI(){
        this.UI = this._ui = new ui.views.lingchongfeast.ui_lingchong_feastUI();

        this._ui.desctf.text = E.getLang("pet02");
        ItemUpdateCtl.Create(this._ui.goldtf,ECellType.GOLD);
        this._ui.yuanbaoicon.skin = IconUtils.getIconByCfgId(ECellType.GOLD);

        ItemUpdateCtl.Create(this._ui.juanzhoutf,ECellType.LingChouZM);
        this._ui.juanzhouicon.skin = IconUtils.getIconByCfgId(ECellType.LingChouZM);

        
        this.skin = this._ui as ui.views.lingchongfeast.ui_lingchong_feastUI
        this._checkBoxCtl = new CheckBoxCtl({bg:this.skin.ck,gou:this.skin.gou} as ICheckBoxSkin);
        this._checkBoxCtl.selectHander = new Laya.Handler(this,this.onSelectHander);
        this._checkBoxCtl.selected = true;

        this.skin.zhekouImg.mouseEnabled = false;
        ButtonCtl.CreateBtn(this.skin.xunzaoBtn,this,this.oneHandler);
        ButtonCtl.CreateBtn(this.skin.threeBtn,this,this.threeHandler);
        this.updataMoney();
    }

    protected onInit(){
        super.onInit();
        LingChongModel.Ins.on(LingChongModel.Updata_ChouKa,this,this.onLingChongEvt);
        this.onLingChongEvt();
    }

    private onLingChongEvt(){
        this.updataMoney();
    }

    protected onExit(){
        super.onExit();
        LingChongModel.Ins.off(LingChongModel.Updata_ChouKa,this,this.onLingChongEvt);
    }

    private _time:number;

    private threeHandler(){
        if (Laya.timer.currTimer - this._time < this.timeDelay) {
            return;
        }
        this._time = Laya.timer.currTimer;
        LingChongModel.Ins.getPetAction(this._checkBoxCtl.selected,2);
    }

    private oneHandler() {
        if (Laya.timer.currTimer - this._time < this.timeDelay) {
            return;
        }
        this._time = Laya.timer.currTimer;
        let req: PetExtract_req = new PetExtract_req();
        if (LingChongModel.Ins.freeCount) {
            req.itemId = 0;
            req.type = 1;
            SocketMgr.Ins.SendMessageBin(req);
        } else {
            LingChongModel.Ins.getPetAction(this._checkBoxCtl.selected,1);
        }
    }
    private onSelectHander(){
        this.updataMoney();
    }
    private updataMoney(){
        let cfg:Configs.t_Pet_Config_dat = PetConfigProxy.Ins.List[0];
        let id;
        let num;
        let num1;
        let _now:number;
        if(this._checkBoxCtl.selected){
            id = parseInt(cfg.f_singlepricegold.split("-")[0]);
            num = parseInt(cfg.f_singlepricegold.split("-")[1]);
            num1 = parseInt(cfg.f_triplepricegold.split("-")[1]);//三抽
            if(this.model.packId == EActivityType.DuanWu){
                this.skin.zhekouImg.visible = true;
                _now = parseInt(cfg.f_Discount.split("-")[1]);
                let a = (_now / num1 * 10).toFixed(0);
                this.skin.zhekouTf.text =  E.getLang("limitdiscount",a);
                this.skin.oldGoldTf.text = E.getLang("oldprice") + num1;
            }else{
                this.skin.zhekouImg.visible = false;
                _now = num1;
            }
        }else{
            id = parseInt(cfg.f_singleprice.split("-")[0]);
            num = parseInt(cfg.f_singleprice.split("-")[1]);
            num1 = parseInt(cfg.f_tripleprice.split("-")[1]); 
            _now = num1;
            this.skin.zhekouImg.visible = false;
        }
        if(LingChongModel.Ins.isFreeRedTip()){
            //免费次数
            this.skin.ybicon.skin = "";
            this.skin.ybtf1.text = "";
            this.skin.xunzhaotf.visible = false;
            this.skin.freeTf.visible = true;
        }else{
            this.skin.xunzhaotf.visible = true;
            this.skin.ybicon.skin = IconUtils.getIconByCfgId(id);
            this.skin.ybtf1.text = num + "";
            this.skin.freeTf.visible = false;
        }
        this.skin.rightYuanBaoIcon.skin = IconUtils.getIconByCfgId(id);
        this.skin.threeTf.text = _now + "";
     }
    protected onAddLoadRes(): void {
        // this.addAtlas("fujiang.atlas");
        this.addAtlas("duanwu.atlas");
        this.addAtlas("lingchongfeast.atlas"); 
    }
    protected onBtnTipClick(){
        if(this.model.packId == EActivityType.DuanWu){
            E.ViewMgr.openHelpView("petfeasttitle","petfeastdesc");
        }else{
            E.ViewMgr.openHelpView("petfeasttitle1","petfeastdesc1");
        }
    }
}

/**灵宠盛宴 */
export class LingChongFeastModel extends GemFeastModel {

    public funcType: EFuncDef = EFuncDef.PetFeast;
    public subType: number = EFeastType.Pet;
    public packageTitleStr: string = "pet04";
    public rankTitleStr: string = "pet05";
    public rankBotStr:string = "pet_desc";
    public rank_desc:string = "pet_title|pet_read";
    protected initUI(){
        this.Reg(new LingChongFeastView(EViewType.PetFeast));
    }

    private static _ins2: LingChongFeastModel;
    public static get Ins() {
        if (!this._ins2) {
            this._ins2 = new LingChongFeastModel();
        }
        return this._ins2;
    }
}