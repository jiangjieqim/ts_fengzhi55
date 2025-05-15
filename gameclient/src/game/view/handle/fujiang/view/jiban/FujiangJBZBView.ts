import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../../frame/view/ViewBase";
import { ui } from "../../../../../../ui/layaMaxUI";
import { SocketMgr } from "../../../../../network/SocketMgr";
import { TrammelsChief_req } from "../../../../../network/protocols/BaseProto";
import { FuJiangModel } from "../../model/FuJiangModel";
import { FujiangJBZBItem } from "./FujiangJBZBItem";

export class FujiangJBZBView extends ViewBase{
    private _ui:ui.views.fujiang.ui_fujiangZBJBViewUI;
    protected mMask = true;
    protected mMainSnapshot = true;

    protected onAddLoadRes() {
        this.addAtlas('fujiang.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.fujiang.ui_fujiangZBJBViewUI;
            this.bindClose(this._ui.close1);
            ButtonCtl.Create(this._ui.btn_qx,new Laya.Handler(this,this.onBtnQXClick));
            ButtonCtl.Create(this._ui.btn_qd,new Laya.Handler(this,this.onBtnQDClick));

            this._ui.list.itemRender = FujiangJBZBItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);
        }
    }

    private onBtnQXClick(){
        this.Close();
    }

    private onBtnQDClick(){
        let req:TrammelsChief_req = new TrammelsChief_req;
        req.id = parseInt(this.Data);
        req.pos = FuJiangModel.Ins.jbPos;
        SocketMgr.Ins.SendMessageBin(req);
        this.Close();
    }

    private onRenderHandler(item:FujiangJBZBItem){
        item.setData(item.dataSource);
    }

    protected onInit(): void {
        FuJiangModel.Ins.on(FuJiangModel.SELECT_JB_POS,this,this.setBtn);

        FuJiangModel.Ins.jbPos = 0;
        for(let i:number=0;i<FuJiangModel.Ins.jbDataList.length;i++){
            let vo = FuJiangModel.Ins.jbDataList[i];
            if(vo.state && vo.id == 0){
                FuJiangModel.Ins.jbPos = i;
                break;
            }
        }
        this._ui.list.array = FuJiangModel.Ins.jbDataList;
        this.setBtn();
    }

    protected onExit(): void {
        FuJiangModel.Ins.off(FuJiangModel.SELECT_JB_POS,this,this.setBtn);
    }

    private setBtn(){
        let vo = FuJiangModel.Ins.jbDataList.find(ele => ele.pos == FuJiangModel.Ins.jbPos);
        if(vo.id){
            this._ui.lab_qd.text = "替换";
        }else{
            this._ui.lab_qd.text = "装备";
        }
    }
}