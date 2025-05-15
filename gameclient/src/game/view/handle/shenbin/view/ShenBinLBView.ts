import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EActivityUid } from "../../huodong/model/EActivityUid";
import { AutoRateBtn } from "../../huodong/views/AutoRateBtn";
import { ValCtl } from "../../main/ctl/ValLisCtl";
import { MainModel } from "../../main/model/MainModel";
import { ECellType } from "../../main/vos/ECellType";
import { EClientType } from "../../sdk/ClientType";
import { ShenBinModel } from "../model/ShenBinModel";
import { ShenBinPackProxy } from "../proxy/ShenBinProxy";
import { ShenBinLBItem } from "./ShenBinLBItem";

export class ShenBinLBView extends ViewBase{
    protected uiBgCloseClick:boolean = true;
    private _ui:ui.views.shenbin.ui_shenbingLBViewUI;
    protected mMask: boolean = true;
    protected mMainSnapshot: boolean = true;
    private _autoBtn:AutoRateBtn;

    protected onAddLoadRes(): void {
        this.addAtlas('shenbin.atlas');
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.shenbin.ui_shenbingLBViewUI;
            this.bindClose(this._ui.btn_close);
            ValCtl.Create(this._ui.txt_money2,this._ui.img_money2,ECellType.GOLD);
            // ButtonCtl.CreateBtn(this._ui.bg,this,()=>{
            //     console.log(1111);
            // })
            this.setMouseBg(this._ui.bg);
            this._ui.list.itemRender = ShenBinLBItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onItemRender);
        }
    }

    protected onInit(): void {
        ShenBinModel.Ins.on(ShenBinModel.UPDATA_PACK,this,this.upDataView);
        this._ui.txt_money2.text = MainModel.Ins.mRoleData.getVal(ECellType.GOLD) + "";
        this.upDataView();
        this.initAutoBtn();
    }
    private initAutoBtn(){
        this._autoBtn=AutoRateBtn.Create(this._ui,EActivityUid.ShenBinPackage);
        if (initConfig.clienttype == EClientType.Discount) {
            this._ui.list.height = 800;
        } else {
            this._ui.list.height = 932;
        }
    }

    protected onExit(): void {
        ShenBinModel.Ins.off(ShenBinModel.UPDATA_PACK,this,this.upDataView);
        if(this._autoBtn){
            this._autoBtn.dispose();
        }
    }

    private onItemRender(item:ShenBinLBItem){
        item.setData(item.dataSource);
    }

    private upDataView(){
        this._ui.list.array = ShenBinPackProxy.Ins.List;
    }
}