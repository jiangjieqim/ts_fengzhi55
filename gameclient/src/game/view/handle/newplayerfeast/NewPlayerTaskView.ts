import { ViewBase } from "../../../../frame/view/ViewBase";
import { ui } from "../../../../ui/layaMaxUI";
import { stNewPlayerTask } from "../../../network/protocols/BaseProto";
import { AlternationRookieTaskProxy } from "../libao/proxy/LiBaoProxy";
import { NewPlayerBaseFeastModel, NewPlayerFeastModel } from "./NewPlayerFeastModel";
import { NewPlayerTaskItem } from "./NewPlayerTaskItem";


export class NewPlayerTaskView extends ViewBase {
    private _ui: ui.views.huodong.ui_newplayerfeast_packageUI;
    private model:NewPlayerBaseFeastModel;
    protected onAddLoadRes(): void {
        this.addAtlas("huodong.atlas");
        this.addAtlas("duanwu.atlas");
    }

    protected onFirstInit(): void { 
        if(!this.UI){
            this.UI = this._ui = new ui.views.huodong.ui_newplayerfeast_packageUI();
            this.mMask = true;
            this._ui.tf1.text = "庆典任务";
            this._ui.tf2.visible = this._ui.tf3.visible = false;
            this.bindClose(this._ui.close1);
            this._ui.list1.itemRender = NewPlayerTaskItem;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onRenderHandler);
        }
    }

    protected onInit(): void {
        NewPlayerFeastModel.Ins.on(NewPlayerFeastModel.UPDATA_TASK,this,this.updataView);
        this.model = this.Data;
        this.updataView();
    }

    protected onExit(): void { 
        NewPlayerFeastModel.Ins.off(NewPlayerFeastModel.UPDATA_TASK,this,this.updataView);
    }

    private onRenderHandler(item:NewPlayerTaskItem){
        item.setData(item.dataSource);
    }

    private updataView(){
        let arrr = NewPlayerFeastModel.Ins.getTaskListBySubType(this.model.subType);
        let arr1 = [];
        let arr2 = [];
        let arr3 = [];
        for(let i:number=0;i<arrr.length;i++){
            switch(arrr[i].status){//0不可领取 1已领取 2可领取
                case 2:
                    arr1.push(arrr[i]);
                    break;
                case 0:
                    arr2.push(arrr[i]);
                    break;
                case 1:
                    arr3.push(arrr[i]);
                    break;
            } 
        }
        arr1 = arr1.sort(this.onSort);
        arr2 = arr2.sort(this.onSort);
        arr3 = arr3.sort(this.onSort);
        this._ui.list1.array = arr1.concat(arr2.concat(arr3));
    }

    private onSort(a:stNewPlayerTask,b:stNewPlayerTask){
        let aa =  AlternationRookieTaskProxy.Ins.getCfgById(a.id);
        let bb =  AlternationRookieTaskProxy.Ins.getCfgById(b.id);
        return aa.f_id - bb.f_id;
    }
}
