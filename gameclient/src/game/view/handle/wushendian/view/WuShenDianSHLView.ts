import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { WuShenDianModel } from "../model/WuShenDianModel";
import { WuShenDianConfigProxy } from "../proxy/WuShenDianProxy";
import { WuShenDianSHItem3 } from "./item/WuShenDianSHItem3";
import { WuShenDianSHItem4 } from "./item/WuShenDianSHItem4";

export class WuShenDianSHLView extends ViewBase{
    private _ui:ui.views.wushendian.ui_wushendianSHLViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree = true;
    protected onAddLoadRes() {
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.wushendian.ui_wushendianSHLViewUI;

            this.bindClose(this._ui.close1);

            this._ui.list2.itemRender = WuShenDianSHItem3;
            this._ui.list2.renderHandler = new Laya.Handler(this,this.onRenderHandler);

            this._ui.list3.itemRender = WuShenDianSHItem4;
            this._ui.list3.renderHandler = new Laya.Handler(this,this.onRenderHandler1);
        }
    }

    protected onInit(): void {
        WuShenDianModel.Ins.on(WuShenDianModel.UPDATA_SHENHUN_VIEW,this,this.updataView);
        this.updataView();
    }

    protected onExit(): void {
        WuShenDianModel.Ins.off(WuShenDianModel.UPDATA_SHENHUN_VIEW,this,this.updataView);
    }

    private onRenderHandler(item:WuShenDianSHItem3){
        item.setData(item.dataSource);
    }

    private onRenderHandler1(item:WuShenDianSHItem4){
        item.setData(item.dataSource);
    }

    private updataView(){
        let arr = [];
        let len = parseInt(WuShenDianConfigProxy.Ins.GetDataById(1).f_BuffMinMax.split("|")[1]);
        for(let i:number=0;i<len;i++){
            let obj:any = {};
            if(WuShenDianModel.Ins.buffList[i]){
                obj.data = WuShenDianModel.Ins.buffList[i];
                obj.suo = 0;
                arr.push(obj);
            }else{
                obj.data = null;
                obj.suo = 1;
                arr.push(obj);
            }
        }
        this._ui.list2.array = arr;

        arr = [];
        len = parseInt(WuShenDianConfigProxy.Ins.GetDataById(1).f_CoreBuffMinMax.split("|")[1]);
        for(let i:number=0;i<len;i++){
            let obj:any = {};
            if(WuShenDianModel.Ins.coreBuffList[i] != null){
                obj.data = WuShenDianModel.Ins.coreBuffList[i];
                obj.suo = 0;
                arr.push(obj);
            }else{
                obj.data = null;
                obj.suo = 1;
                arr.push(obj);
            }
        }
        this._ui.list3.array = arr;
    }
}