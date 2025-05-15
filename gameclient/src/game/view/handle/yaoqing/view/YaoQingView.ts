import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import {SocketMgr} from "../../../../network/SocketMgr";
import { Invitation_req, stActivationInfo, stInvitationInfo } from "../../../../network/protocols/BaseProto";
import {DotManager} from "../../common/DotManager";
import { MainModel } from "../../main/model/MainModel";
import { YaoQingModel } from "../model/YaoQingModel";
import { YaoQingInProxy, YaoQingValueProxy } from "../proxy/YaoQingProxy";
import { YaoQingItem } from "./YaoQingItem";
import { YaoQingItem1 } from "./YaoQingItem1";

export class YaoQingView extends ViewBase{
    private _ui:ui.views.yaoqing.ui_yaoqingViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    protected autoFree = true;
    protected onAddLoadRes() {}

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.yaoqing.ui_yaoqingViewUI;
            this.bindClose(this._ui.btn_close);

            this._ui.list1.itemRender = YaoQingItem;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onRenderHandler);

            this._ui.list.itemRender = YaoQingItem1;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler1);
            this.btnList.push(
            ButtonCtl.Create(this._ui.btn,new Laya.Handler(this,this.onBtnClick)),
            ButtonCtl.Create(this._ui.btn_yq,new Laya.Handler(this,this.onBtnYQClick)));
        }
    }

    protected onInit(): void {
        YaoQingModel.Ins.on(YaoQingModel.UPDATA_VIEW,this,this.onUpdataView);
        let req:Invitation_req = new Invitation_req;
        SocketMgr.Ins.SendMessageBin(req);
        // YaoQingModel.Ins.inviteNum = 1;
        // YaoQingModel.Ins.topList = [];
        // let aa:stInvitationInfo = new stInvitationInfo;
        // aa.fid = 1;
        // aa.state = 1;
        // YaoQingModel.Ins.invitationList = [aa];
        // let bb:stActivationInfo = new stActivationInfo;
        // bb.fid = 1;
        // bb.state = 1;
        // YaoQingModel.Ins.activationList = [bb];
        // this.onUpdataView();
    }

    protected onExit(): void {
        YaoQingModel.Ins.off(YaoQingModel.UPDATA_VIEW,this,this.onUpdataView);
    }

    private onBtnClick(){
        E.ViewMgr.Open(EViewType.YaoQingXQ);
    }

    private onBtnYQClick(){
        E.sdk.goShareData('inviterId=' + MainModel.Ins.mRoleData.AccountId);
    }

    private onRenderHandler(item:YaoQingItem){
        item.setData(item.dataSource);
    }

    private onRenderHandler1(item:YaoQingItem1){
        item.setData(item.dataSource);
    }

    private onUpdataView(){
        let arr1 = [];
        let arr2 = [];
        let array = [];
        let i:number;
        for(i=0;i<YaoQingInProxy.Ins.List.length;i++){
            let data = YaoQingModel.Ins.invitationList.find(ele => ele.fid == YaoQingInProxy.Ins.List[i].f_id);
            if(data && data.state == 2){
                arr2.push(YaoQingInProxy.Ins.List[i]);
            }else{
                arr1.push(YaoQingInProxy.Ins.List[i]);
            }
        }
        
        arr1.sort((a,b)=>{
            return a.f_id - b.f_id;
        });
        arr2.sort((a,b)=>{
            return a.f_id - b.f_id;
        });
        for(i=0;i<arr1.length;i++){
            array.push(arr1[i]);
        }
        for(i=0;i<arr2.length;i++){
            array.push(arr2[i]);
        }
        this._ui.list.array = array;


        let arr = [];
        let len = YaoQingValueProxy.Ins.List.length;
        for(i=0;i<len;i++){
            if(YaoQingModel.Ins.topList[i]){
                arr.push({data:YaoQingModel.Ins.topList[i]});
            }else{
                arr.push({data:null});
            }
        }
        this._ui.list1.array = arr;

        let flag = false;
        for(i=0;i<YaoQingModel.Ins.activationList.length;i++){
            if(YaoQingModel.Ins.activationList[i].state == 1){
                flag = true;
                break;
            }
        }
        if(flag){
            DotManager.addDot(this._ui.btn,16,-12);
        }else{
            DotManager.removeDot(this._ui.btn);
        }
    }
}