import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { PetTalentProxy } from "../proxy/LingChongProxy";
import { LingChongXMTJItem } from "./item/LingChongXMTJItem";

export class LingChongXMTJView extends ViewBase{
    private _ui:ui.views.lingchong.ui_lingchongXMTJViewUI;
    protected mMask = true;
    protected mMainSnapshot = true;

    protected onAddLoadRes() {
        this.addAtlas("lingchong.atlas");
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.lingchong.ui_lingchongXMTJViewUI;
            this.bindClose(this._ui.btn_close);

            this._ui.list.itemRender = LingChongXMTJItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);
        }
    }

    private onRenderHandler(item:LingChongXMTJItem){
        item.setData(item.dataSource);
    }

    protected onInit(): void {
        let arr = PetTalentProxy.Ins.List.sort(this.onSort);
        this._ui.list.array = arr;
    }

    private onSort(a:Configs.t_Pet_Talent_List_dat,b:Configs.t_Pet_Talent_List_dat){
        if(a.f_quality > b.f_quality){
            return -1;
        }else if(a.f_quality < b.f_quality){
            return 1;
        }else{
            if(a.f_talentid > b.f_talentid){
                return 1;
            }else if(a.f_talentid < b.f_talentid){
                return -1;
            }else{
                return 0;
            }
        }
    }

    protected onExit(): void {
        
    }
}