import { StringUtil } from "../../../../../frame/util/StringUtil";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { SelectServerIDReq_req, ServerListReq_req, ServerNumReq_req, stServerItem } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import { EFuncDef } from "../../main/model/EFuncDef";
import { MainModel } from "../../main/model/MainModel";
import { TaskModel } from "../../main/model/TaskModel";
import { SheZhiModel } from "../model/SheZhiModel";
import { QuFuItem } from "./item/QuFuItem";
import { QuFuItem1 } from "./item/QuFuItem1";
import { QuFuUtils } from "./QuFuUtils";

export class QuFuView extends ViewBase{
    private _ui:ui.views.shezhi.ui_qufuUI;
    protected mMask = true; 

    protected onAddLoadRes() {
        this.addAtlas('shezhi.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.shezhi.ui_qufuUI;
            this.bindClose(this._ui.close1);

            this._ui.list.itemRender = QuFuItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onItemRender);
            this._ui.list.selectEnable = true;
            this._ui.list.selectHandler = new Laya.Handler(this,this.onSelectHandler);

            this._ui.list1.itemRender = QuFuItem1;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onItemRender1);
            this._ui.list1.selectEnable = true;
            this._ui.list1.selectHandler = new Laya.Handler(this,this.onSelectHandler1);
        }
    }

    protected onInit() {
        SheZhiModel.Ins.on(SheZhiModel.UPDATA_VIEW,this,this.upDataView);
        SheZhiModel.Ins.on(SheZhiModel.UPDATA_VIEW_ITEM,this,this.upDataViewItem);
        let req:ServerNumReq_req = new ServerNumReq_req;
        SocketMgr.Ins.SendMessageBin(req);
    }

    protected onExit() {
        this._ui.list.selectedIndex = -1;
        this._ui.list1.selectedIndex = -1;
        SheZhiModel.Ins.off(SheZhiModel.UPDATA_VIEW,this,this.upDataView);
        SheZhiModel.Ins.off(SheZhiModel.UPDATA_VIEW_ITEM,this,this.upDataViewItem);
    }

    private onItemRender1(item:QuFuItem1,index:number){
        let data:stServerItem = item.dataSource;
        QuFuUtils.updateLabe(item,data);
        if(data.serverID == MainModel.Ins.mRoleData.serverId){
            item.img_sel.visible = true;
        }else{
            item.img_sel.visible = false;
        }
    }

    private onSelectHandler1(index:number){
        if(index == -1){return};
        if(this._ui.list1.array[index].serverID != MainModel.Ins.mRoleData.serverId){
            MainModel.Ins.queryMsg("是否切换服务器?",0,0,0,new Laya.Handler(this,this.onQHHandler,[this._ui.list1.array[index].serverID]));
        }
        this._ui.list1.selectedIndex = -1;
    }

    private onQHHandler(serverID:number){
        let req:SelectServerIDReq_req = new SelectServerIDReq_req;
        req.serverID = serverID;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onItemRender(item:QuFuItem,index:number){
        let data = item.dataSource;
        item.lab_name.text = data.name;
        if(data.isSelect){
            item.img.visible = true;
        }else{
            item.img.visible = false;
        }
    }

    private onSelectHandler(index:number){
        if(index == -1){return};
        for(let i:number=0;i<this._ui.list.array.length;i++){
            if(index == i){
                this._ui.list.array[i].isSelect = true;
            }else{
                this._ui.list.array[i].isSelect = false;
            }
        }
        this._ui.list.refresh();
       
        let req:ServerListReq_req = new ServerListReq_req;
        req.serverZuID = this._ui.list.array[index].id;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private upDataView(){
        let arr = [];
        arr.push({name:"推荐",isSelect:false,id:10000});
        arr.push({name:"我的角色",isSelect:false,id:20000});
        for(let i:number = SheZhiModel.Ins.serverZu;i > 0;i--){
            let st = (i*20-20+1) + "-" + i*20 + "服";
            arr.push({name:st,isSelect:false,id:i});
        }
        this._ui.list.array = arr;
        this._ui.list.selectedIndex = 0;
    }

    private upDataViewItem(){
        this._ui.list1.array = SheZhiModel.Ins.serverItems;
    }
}