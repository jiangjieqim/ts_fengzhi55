import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { DrawEventModel } from "../model/DrawEventModel";
import { DrawEventItem } from "./DrawEventItem";

export class DrawEventView2 extends ViewBase{
    private _ui:ui.views.drawEvent.ui_DrawEventView2UI;
    protected mMask = true; 
    protected mMainSnapshot = true;

    protected onAddLoadRes() {
        this.addAtlas("drawEvent.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.drawEvent.ui_DrawEventView2UI;
            this.bindClose(this._ui.close1);

            this._ui.list.itemRender = DrawEventItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onItemRendler);
        }
    }

    private onItemRendler(item:DrawEventItem){
        item.setData(item.dataSource);
    }

    protected onInit(): void {
        DrawEventModel.Ins.on(DrawEventModel.UPDATA_VIEW_LINQUAWARD,this,this.onLQUpdataView);
        this.onLQUpdataView()
        this._ui.lab.text = DrawEventModel.Ins.count + "次";
    }

    protected onExit(): void {
        DrawEventModel.Ins.off(DrawEventModel.UPDATA_VIEW_LINQUAWARD,this,this.onLQUpdataView);
    }

    private onLQUpdataView(){
        let arr = [];
        let arr1 = [];
        let arr2 = [];
        for(let i:number=0;i<DrawEventModel.Ins.cumulateRewardList.length;i++){
            let vo = DrawEventModel.Ins.cumulateRewardList[i];
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