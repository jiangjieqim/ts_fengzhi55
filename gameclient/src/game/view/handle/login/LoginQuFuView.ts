import { HrefUtils, InitConfig } from "../../../../InitConfig";
import { HttpUtil } from "../../../../frame/util/HttpUtil";
import {ViewBase} from "../../../../frame/view/ViewBase";
import { ui } from "../../../../ui/layaMaxUI";
import { E } from "../../../G";
import { Version } from "../../../Version";
import { EViewType } from "../../../common/defines/EnumDefine";
import { MainModel } from "../main/model/MainModel";
import { LoginViewNew } from "./LoginViewNew";
import { stServerItem } from "../../../network/protocols/BaseProto";
import { QuFuUtils } from "../shezhi/view/QuFuUtils";

export class LoginQuFuView extends ViewBase{
    private _ui:ui.views.login.ui_loginQuFuViewUI;
    protected mMask = true; 
    protected checkGuide:boolean = false;
    protected onAddLoadRes() {
        
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.login.ui_loginQuFuViewUI;
            this.bindClose(this._ui.close1);

            this._ui.list.itemRender = ui.views.login.ui_loginQuFuItemUI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onItemRender);
            this._ui.list.selectEnable = true;
            this._ui.list.selectHandler = new Laya.Handler(this,this.onSelectHandler);

            this._ui.list1.itemRender = ui.views.login.ui_loginQuFuItem1UI;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onItemRender1);
            this._ui.list1.selectEnable = true;
            this._ui.list1.selectHandler = new Laya.Handler(this,this.onSelectHandler1);
        }
    }

    protected onInit() {
        this._ui.list.array = this._ui.list1.array = [];
        this.upDataView();
    }

    protected onExit() {
        this._ui.list.selectedIndex = -1;
        this._ui.list1.selectedIndex = -1;
    }

    private onItemRender1(item:ui.views.login.ui_loginQuFuItem1UI,index:number){
        let data:stServerItem = item.dataSource;
        QuFuUtils.updateLabe(item,data);
        if(data.serverID == MainModel.Ins.serverID){
            item.img_sel.visible = true;
        }else{
            item.img_sel.visible = false;
        }
    }

    private _serverState:number;
    private _serverID:number;
    private _serverIsNew:number;
    private _serverName:string;
    private onSelectHandler1(index:number){
        if(index == -1){return};

        this._serverState = this._ui.list1.array[index].serverState;
        this._serverID = this._ui.list1.array[index].serverID;
        this._serverIsNew = this._ui.list1.array[index].isNew;
        this._serverName = this._ui.list1.array[index].serverName;

        HttpUtil.httpGet(`${InitConfig.getSyURL()}/server/appoint?appid=${E.sdk.getAppId()}&openid=${this.getOpenId()}
        &ver=${this.getVer()}&server_id=${this._ui.list1.array[index].serverID}`, new Laya.Handler(this, this.onSelServerHandler));
        this._ui.list1.selectedIndex = -1;
    }

    private onSelServerHandler(data: string){
        let obj = JSON.parse(data);
        if (obj.code == 0) {
            MainModel.Ins.serverState = this._serverState;
            MainModel.Ins.serverID = this._serverID;
            MainModel.Ins.serverIsNew = this._serverIsNew;
            MainModel.Ins.serverName = this._serverName;
            let view:LoginViewNew = E.ViewMgr.Get(EViewType.LoginNew) as LoginViewNew;
            if(view){
                view.updataServer();
            }
            this.Close();
        }
    }

    private onItemRender(item:ui.views.login.ui_loginQuFuItemUI,index:number){
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
       
        HttpUtil.httpGet(`${InitConfig.getSyURL()}/server/list?appid=${E.sdk.getAppId()}&openid=${this.getOpenId()}
        &ver=${this.getVer()}&serverZuID=${this._ui.list.array[index].id}`, new Laya.Handler(this, this.onSelServerZuHandler));
    }

    private onSelServerZuHandler(data: string){
        let obj = JSON.parse(data);
        if (obj.code == 0) {
            this._ui.list1.array = obj.result;
        }
    }

    private getOpenId(){
        let openId: string;
        let user = HrefUtils.getHref("user");
        if (user) {
            openId = user;
        } else {
            openId = E.sdk.getOpenId();
        }
        return openId;
    }

    private getVer(){
        return E.ver;
    //     let ver = Version.curValue
    //     if (HrefUtils.getHref("ver")) {
    //         ver = HrefUtils.getHref("ver");
    //     }
    //     if (initConfig.ver) {
    //         ver = initConfig.ver;
    //     }
    //     if(initConfig.littlegame){
    //         return ver + Version.SIGN;
    //     }
    //     return ver;
    }

    private upDataView(){
        let arr = [];
        arr.push({name:"推荐",isSelect:false,id:10000});
        arr.push({name:"我的角色",isSelect:false,id:20000});
        for(let i:number = MainModel.Ins.serverZu;i > 0;i--){
            let st = (i*20-20+1) + "-" + i*20 + "服";
            arr.push({name:st,isSelect:false,id:i});
        }
        this._ui.list.array = arr;
        this._ui.list.selectedIndex = 0;
    }
}