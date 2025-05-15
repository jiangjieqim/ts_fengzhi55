import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { SimpleEffect } from "../../avatar/SimpleEffect";
import { MainModel } from "../../main/model/MainModel";
import { ItemProxy } from "../../main/proxy/ItemProxy";
import { ECellType } from "../../main/vos/ECellType";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { LingChongFangPaiItemCtl } from "../ctl/LingChongFangPaiItemCtl";
import { LingChongFeastModel } from "../model/LingChongFeastModel";
import { LingChongModel } from "../model/LingChongModel";
import { PetConfigProxy } from "../proxy/LingChongProxy";
/**坐骑翻牌 */
export class LingChongFanPaiView1 extends ViewBase{
    private _ui:ui.views.lingchong.ui_lingchongFPView1UI;
    protected mMask:boolean = true;
    private ctlList:LingChongFangPaiItemCtl[] = [];
    private oldW:number;
    private offsetX:number;
    private model:LingChongModel;
    /**恭喜获得 */
    private congratulatEffect:SimpleEffect;

    protected onAddLoadRes(): void{
        this.addAtlas("lingchong.atlas");
    }
    /**离开处理 */
    protected onExit(): void{
        this._ui.tf1.visible = true;
        LingChongModel.Ins._sel = LingChongModel.Ins._bo = false;
    }

    /**这里在加载完资源后调用-建议只处理资源相关的逻辑*/
    protected onFirstInit(): void {
        if (!this.UI) {
            this.model = LingChongModel.Ins;
            this.UI = this._ui = new ui.views.lingchong.ui_lingchongFPView1UI();
            ButtonCtl.Create(this._ui.diban, new Laya.Handler(this, this.mClose));
            ButtonCtl.Create(this._ui.xunzaoBtn, new Laya.Handler(this, this.btnClick));
            for (let i = 0; i < 10; i++) {
                this.ctlList.push(new LingChongFangPaiItemCtl(this._ui["item" + i]));
            }
            this._ui.effcon.visible = false;
        }
    }

    private mClose(){
        if (this.model.ckList1.length > 0) {
            this.refresh(this.model.ckList1.shift());
        }else{
            if(this._ui.tf1.visible){
                E.ViewMgr.Close(this.ViewType);
            }else{
                
            }
        }
    }

    private btnClick(){
        LingChongModel.Ins._bo = false;
        this._ui.sp.visible = false;
        this._ui.tf1.visible = true;
    }

    /**初始化*/
    protected onInit(): void{
        this._ui.tf1.visible = false;
        if(LingChongModel.Ins._bo){
            this._ui.sp.visible = true;
        }else{
            this._ui.sp.visible = false;
        }
        this.updateRideView();
    }

    public refresh(itemlist:number[]){
        this.updataMoney();
        for (let i = 0; i < this.ctlList.length; i++) {
            let ctl: LingChongFangPaiItemCtl = this.ctlList[i];
            ctl.visible = true;
            let _data = itemlist[i];
            if (_data) {
                ctl.visible = true;
            } else {
                ctl.visible = false;
            }
            ctl.data = _data;
        }
        this.playCongratulatEffect();
    }
    /**恭喜获得 */
    public playCongratulatEffect(){
        if(!this.congratulatEffect){
            this.congratulatEffect = new SimpleEffect(this._ui.effcon,"o/spine/cardgongxi/cardgongxi");
        }
        this.congratulatEffect.play(0,false,this,this.onPlayEnd,null,true);
    }

    private updataMoney(){
        let id:number;
        if(LingChongModel.Ins._sel){
            id = ECellType.GOLD;
        }else{
            id = ECellType.LingChouZM;
        }
        this._ui.moneyIcon.skin = IconUtils.getIconByCfgId(id);
        this._ui.moneyNumLabel.text = StringUtil.val2m(MainModel.Ins.mRoleData.getVal(id));
    }

    private onPlayEnd() {
        if (LingChongModel.Ins._bo) {
            Laya.timer.once(500,this,()=>{
                if (!LingChongModel.Ins.isBagMax(10)) {
                    LingChongModel.Ins.getPetAction(LingChongModel.Ins._sel,3,LingChongModel.Ins._bo);
                }else{
                    this._ui.sp.visible = false;
                    this._ui.tf1.visible = true;
                    E.ViewMgr.ShowMidError("背包空间不足");//显示错误提示
                }
            });
        } else {
            this._ui.tf1.visible = true;
        }
    }

    private isMoney(){
        let cfg = PetConfigProxy.Ins.List[0];
        let id;
        let _now:number;//当前的价格
        let num1 = parseInt(cfg.f_triplepricegold.split("-")[1]);//三抽
        if(LingChongModel.Ins._sel){
            if(LingChongFeastModel.Ins.isOpen){// || NewPlayerPetFeastModel.Ins.isOpen){
                _now = parseInt(cfg.f_Discount.split("-")[1]);
            }else{
                _now = num1;
            }
            id = parseInt(cfg.f_singlepricegold.split("-")[0]);
        }else{
            id = parseInt(cfg.f_singleprice.split("-")[0]);
            _now = parseInt(cfg.f_tripleprice.split("-")[1]);
        }
        let num = MainModel.Ins.mRoleData.getVal(id);
        if(num >= _now){
            return true;
        }
        let itemCfg:Configs.t_Item_dat = ItemProxy.Ins.getCfg(id);
        E.ViewMgr.ShowMidError(`${main.itemName(itemCfg.f_name)}`+E.getLang("NotEnough"));
        return false;
    }

    public updateRideView(){
        if(this.model.ckList1.length>0){
            let cell = this.model.ckList1.shift();
            this.refresh(cell);
        }
    }
}