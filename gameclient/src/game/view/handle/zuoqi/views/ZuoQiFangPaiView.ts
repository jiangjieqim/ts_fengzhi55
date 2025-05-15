import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { SocketMgr } from "../../../../network/SocketMgr";
import { GetRide_req, stRewardRideVo } from "../../../../network/protocols/BaseProto";
import { SimpleEffect } from "../../avatar/SimpleEffect";
import { MainModel } from "../../main/model/MainModel";
import { ZuoQiModel } from "../ZuoqiModel";
import { EZuoQi } from "../vos/EZuoQi";
import { IconUtils } from "../vos/IconUtils";
import { ZuoQiFangPaiItemCtl } from "./ZuoQiFangPaiItemCtl";
/**坐骑翻牌 */
export class ZuoQiFangPaiView extends ViewBase{
    private _ui:ui.views.zuoqi.ui_zuoqi_fangpaiUI;
    protected mMask:boolean = true;
    // private itemlist:stRewardRideVo[];
    private ctlList:ZuoQiFangPaiItemCtl[] = [];
    private oldW:number;
    private offsetX:number;
    private model:ZuoQiModel;
    protected autoFree = true;
    /**恭喜获得 */
    private congratulatEffect:SimpleEffect;
    protected onAddLoadRes(): void{
        this.addAtlas("zuoqi.atlas");
    }
    /**离开处理 */
    protected onExit(): void{
        // this.model.bCardShow = false;
        // this.model.leave();
        // this.updateRideView();
        for(let i = 0;i < this.ctlList.length;i++){
            this.ctlList[i].disposeSpine();
        }
        ZuoQiModel.Ins._bo = false;
        this._ui.tf1.visible = true;
    }
    /**这里在加载完资源后调用-建议只处理资源相关的逻辑*/
    protected onFirstInit(): void {
        if (!this.UI) {
            this.model = ZuoQiModel.Ins;
            this.UI = this._ui = new ui.views.zuoqi.ui_zuoqi_fangpaiUI();
            this.btnList.push(ButtonCtl.Create(this._ui.diban, new Laya.Handler(this, this.mClose)));
            ButtonCtl.Create(this._ui.xunzaoBtn, new Laya.Handler(this, this.btnClick));
            this.ctlList = [];
            for (let i = 0; i < 3; i++) {
                this.ctlList.push(new ZuoQiFangPaiItemCtl(this._ui["item" + i]));
            }
        }
    }

    private btnClick(){
        ZuoQiModel.Ins._bo = false;
        this._ui.sp.visible = false;
        this._ui.tf1.visible = true;
    }

    private mClose(){
        if (this.model.rideCacheList.length > 0) {
            this.refresh(this.model.rideCacheList.shift());
        }else{
            // this.Close();
            if(this._ui.tf1.visible){
                 E.ViewMgr.Close(this.ViewType);
            }else{
                
            }
        }
    }

    /**初始化*/
    protected onInit(): void{
        // this.model.bCardShow = true;

        // this.itemlist = this.Data;
        
        // if (this.itemlist.length == 1) {
        //     //单个坐骑的时候
        //     // this.ctlList[2].visible = true;
        //     for(let i = 0;i < this.ctlList.length;i++){
        //         let ctl:ZuoQiFangPaiItemCtl = this.ctlList[i];
        //         if(i == 1){
        //             //居中
        //             ctl.visible = true;
        //             ctl.data = this.itemlist[0];
        //         }
        //         else{
        //             ctl.visible = false;
        //         }
        //     }
        // }else{
        //     for (let i = 0; i < this.ctlList.length; i++) {
        //         let ctl: ZuoQiFangPaiItemCtl = this.ctlList[i];
        //         ctl.visible = true;
        //         let _data = this.itemlist[i];
        //         if(_data){
        //             ctl.visible = true;
        //         }else{
        //             ctl.visible = false;
        //         }
        //         ctl.data = _data;
        //     }
        // }
        
        // this.refresh(this.itemlist);
        this._ui.tf1.visible = false;
        if(ZuoQiModel.Ins._bo){
            this._ui.sp.visible = true;
        }else{
            this._ui.sp.visible = false;
        }
        this.updateRideView();
    }

    public refresh(itemlist:stRewardRideVo[]){
        this.updataMoney();
        if(!this.oldW){
            this.oldW = this.ctlList[0].skin.x + this.ctlList[0].skin.width;
            this.offsetX = this.ctlList[0].skin.x;
        }
        let count:number = 0;
        for (let i = 0; i < this.ctlList.length; i++) {
            let ctl: ZuoQiFangPaiItemCtl = this.ctlList[i];
            ctl.visible = true;
            let _data = itemlist[i];
            // w = ctl.skin.width;
            if (_data) {
                ctl.visible = true;
                count++;
            } else {
                ctl.visible = false;
            }
            ctl.data = _data;
        }
        let ox = (this._ui.width-count*this.oldW+this.offsetX)/2;
        
        for (let i = 0; i < this.ctlList.length; i++) {
            let ctl: ZuoQiFangPaiItemCtl = this.ctlList[i];
            if(ctl.skin.visible){
                ctl.skin.x = ox + i * this.oldW;
            }
        }
        // Laya.timer.clear(this,this.playCongratulatEffect);
        // Laya.timer.once(1000,this,this.playCongratulatEffect);
        this.playCongratulatEffect();
    }
    private updataMoney(){
        this._ui.moneyIcon.skin = IconUtils.getIconByCfgId(ZuoQiModel.Ins._itemID);
        this._ui.moneyNumLabel.text = StringUtil.val2m(MainModel.Ins.mRoleData.getVal(ZuoQiModel.Ins._itemID));
    }
    /**恭喜获得 */
    public playCongratulatEffect(){
        if(!this.congratulatEffect){
            this.congratulatEffect = new SimpleEffect(this._ui.effcon,"o/spine/cardgongxi/cardgongxi");
        }
        // congratulatEffect.playEndDisplse(0)
        this.congratulatEffect.play(0,false,this,this.onPlayEnd,null,true);
    }

    private onPlayEnd(){
        if (ZuoQiModel.Ins._bo) {
            Laya.timer.once(500,this,()=>{
                let req:GetRide_req = new GetRide_req();
                req.type = EZuoQi.Three;
                req.itemId = ZuoQiModel.Ins._itemID;
                SocketMgr.Ins.SendMessageBin(req);     
            });
        } else {
            this._ui.tf1.visible = true;
        }
    }

    public updateRideView(){
        if(this.model.rideCacheList.length>0){
            let cell = this.model.rideCacheList.shift();
            this.refresh(cell);
        }
    }
}