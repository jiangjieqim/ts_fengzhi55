import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { SpringFestivalModel } from "../model/SpringFestivalModel";
import { SpringFestivalWWItem1 } from "./item/SpringFestivalWWItem1";

export class SpringFestivalWWView extends ViewBase{
    private _ui:ui.views.springFestival.ui_springFestivalWWViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree:boolean = true;

    protected onAddLoadRes() {
        this.addAtlas("springFestival.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.springFestival.ui_springFestivalWWViewUI;

            this._ui.list.itemRender = SpringFestivalWWItem1;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRender);
        }
    }

    private onRender(item:SpringFestivalWWItem1){
        item.setData(item.dataSource);
    }

    protected onInit(): void {
        SpringFestivalModel.Ins.on(SpringFestivalModel.UPDATA_VIEW_REWARD,this,this.updataView);
        this.updataView();
    }

    protected onExit(): void {
        SpringFestivalModel.Ins.off(SpringFestivalModel.UPDATA_VIEW_REWARD,this,this.updataView);
    }

    private updataView(){
        let arr = [];
        let arr1 = [];
        let arr2 = [];
        for(let i:number=0;i<SpringFestivalModel.Ins.rewardList.length;i++){
            let vo = SpringFestivalModel.Ins.rewardList[i];
            if(vo.state == 2){
                arr.push(vo);
            }else if(vo.state == 0){
                arr1.push(vo);
            }else if(vo.state == 1){
                arr2.push(vo);
            }
        }
        this._ui.list.array = arr.concat(arr1.concat(arr2));
    }
}