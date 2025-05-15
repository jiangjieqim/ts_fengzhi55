import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { MainEvent } from "../model/MainEvent";
import { MainModel } from "../model/MainModel";
import { AdventureBossProxy } from "../proxy/AdventureBossProxy";
import { YeWaiItemViewNew } from "./YeWaiItemViewNew";

export class YeWaiBossView extends ViewBase{
    private model:MainModel;
    private _ui:ui.views.maoxian.ui_yewaiBossViewUI;
    protected mMask:boolean = true;
    protected autoFree = true;
    protected onExit(): void{
        this.model.off(MainEvent.AdventureBossUpdate,this,this.onRefreshHandler);
        // MainModel.Ins.mainMask = false;
    }
    protected onFirstInit(): void{
        if(!this.UI){
            this.model = MainModel.Ins;
            this.UI = this._ui = new ui.views.maoxian.ui_yewaiBossViewUI();
            this._ui.list1.itemRender = YeWaiItemViewNew;//YeWaiItemView;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onRenderHandler);
            this._ui.list1.vScrollBarSkin = " ";
            this.btnList.push(ButtonCtl.Create(this._ui.close1,new Laya.Handler(this,this.Close)));
        }
    }

    private onRenderHandler(item:YeWaiItemViewNew,index:number){
        item.setData(item.dataSource);
    }
    protected mMainSnapshot = true;
    protected onInit(): void{
        // MainModel.Ins.mainMask = true;
        this.model.on(MainEvent.AdventureBossUpdate,this,this.onRefreshHandler);
        this.onRefreshHandler();
        this._ui.list1.scrollTo(this.fightIndex);
    }

    private get fightIndex(){
        let l = AdventureBossProxy.Ins.List;
        let lv = this.model.mRoleData.lv;
        let _curId = this.model.adventureBossData.f_id;
        let nextCfg:Configs.t_Adventure_Boss_dat = AdventureBossProxy.Ins.getNext(_curId);
        
        for(let i = 0;i < l.length;i++){
            let _cfg:Configs.t_Adventure_Boss_dat = l[i];
            if(lv < _cfg.f_OpenLimit){

            }else{
                if (nextCfg && nextCfg.f_id == _cfg.f_id) {
                    //显示挑战按钮
                    return i;
                }else{
                    if (_curId == _cfg.f_id) {
                        // this._saoDan.visible = true;
                        //扫荡
                        return i;
                    } else if (_curId > _cfg.f_id) {
                        // this.tipsLabel = `已击败`;
                    }else{
                        // this.tipsLabel = `未开启`;
                    }
                } 
            }
        }
        return 0;
    }

    private onRefreshHandler(){
        let l = AdventureBossProxy.Ins.List;
        this._ui.list1.array = l;
    }

    protected onAddLoadRes(): void{
        this.addAtlas("maoxian.atlas");
        this.addAtlas("maoxian2.atlas");
    }

}