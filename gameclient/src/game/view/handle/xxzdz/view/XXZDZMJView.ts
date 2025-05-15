import {StringUtil} from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { ValCtl } from "../../main/ctl/ValLisCtl";
import { MainModel } from "../../main/model/MainModel";
import { ECellType } from "../../main/vos/ECellType";
import { XXZDZModel } from "../model/XXZDZModel";
import { StarPocketTipsProxy } from "../proxy/xxzdxProxy";
import { jnctl } from "./ctl/jnctl";
import { XXZDZItem } from "./item/XXZDZItem";

export class XXZDZMJView extends ViewBase{
    private _ui:ui.views.xxzdz.ui_xxzdzMJViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree = true;

    private _jnctl1:jnctl;
    private _jnctl2:jnctl;
    private _jnctl3:jnctl;

    protected onAddLoadRes() {
        this.addAtlas("xxzdz.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.xxzdz.ui_xxzdzMJViewUI;
            this.bindClose(this._ui.btn_close);

            ValCtl.Create(this._ui.lab2,this._ui.img2,ECellType.JingNang);
            this.btnList.push(ButtonCtl.Create(this._ui.btn_tip,new Laya.Handler(this,this.onBtnTipClick)));

            this._jnctl1 = new jnctl(this._ui.item1);
            this._jnctl2 = new jnctl(this._ui.item2);
            this._jnctl3 = new jnctl(this._ui.item3);

            this._ui.list.itemRender = XXZDZItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onItemRender);
        }
    }

    private onBtnTipClick(){
        E.ViewMgr.openHelpView("xxzdzJNTitle","xxzdzJNDec");
    }

    protected onInit(): void {
        let val = MainModel.Ins.mRoleData.getVal(ECellType.JingNang);
        this._ui.lab2.text = StringUtil.val2m(val);
        XXZDZModel.Ins.on(XXZDZModel.UPDATA_VIEW,this,this.updataView);
        this.updataView();
    }

    protected onExit(): void {
        XXZDZModel.Ins.off(XXZDZModel.UPDATA_VIEW,this,this.updataView);
    }

    private onItemRender(item:XXZDZItem){
        item.setData(item.dataSource);
    }

    private updataView(){
        for(let i:number=0;i<3;i++){
            let obj:any = {};
            if(XXZDZModel.Ins.silkBags[i]){
                obj.data = XXZDZModel.Ins.silkBags[i];
                let cfg:Configs.t_Star_PocketTips_dat = StarPocketTipsProxy.Ins.GetDataById(XXZDZModel.Ins.silkBags[i].id);
                this._ui["lab_name" + (i + 1)].text = cfg.f_TipsName;
            }else{
                obj.data = null;
                this._ui["lab_name" + (i + 1)].text = "";
            }
            this["_jnctl" + (i + 1)].setData(obj,false,false);
        }

        this._ui.list.array = StarPocketTipsProxy.Ins.List;
    }
}