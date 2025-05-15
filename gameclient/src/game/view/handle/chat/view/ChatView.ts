import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { RowMoveBaseNode, ScrollPanelControl } from "../../../../../frame/view/ScrollPanelControl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { SocketMgr } from "../../../../network/SocketMgr";
import { WorldChat_req } from "../../../../network/protocols/BaseProto";
import { AllianceModel } from "../../alliance/model/AllianceModel";
import { System_RefreshTimeProxy } from "../../huodong/model/ActivityProxy";
import { LiBaoModel } from "../../libao/model/LiBaoModel";
import { MainModel } from "../../main/model/MainModel";
import { ChatMyItem } from "../item/ChatMyItem";
import { ChatOtherItem } from "../item/ChatOtherItem";
import { ChatTimeItem } from "../item/ChatTimeItem";
import { ChatModel } from "../model/ChatModel";
import { ChatConfigProxy } from "../proxy/ChatProxy";

class ChatTimeItemNode extends RowMoveBaseNode {
    protected clsKey: string = "ChatTimeItemNode";
    protected createNode(index) {
        let _skin: ChatTimeItem = Laya.Pool.getItemByClass(this.clsKey, ChatTimeItem);
        _skin.setData(this.list[index]);
        _skin.y = this.y;
        return _skin;
    }
}

class ChatMyItemNode extends RowMoveBaseNode {
    protected clsKey: string = "ChatMyItemNode";
    protected createNode(index) {
        let _skin: ChatMyItem = Laya.Pool.getItemByClass(this.clsKey, ChatMyItem);
        _skin.setData(this.list[index].data);
        _skin.height = this.list[index].h;
        _skin.y = this.y;
        return _skin;
    }
}

class ChatOtherItemNode extends RowMoveBaseNode {
    protected clsKey: string = "ChatOtherItemNode";
    protected createNode(index) {
        let _skin: ChatOtherItem = Laya.Pool.getItemByClass(this.clsKey, ChatOtherItem);
        _skin.setData(this.list[index].data);
        _skin.height = this.list[index].h;
        _skin.y = this.y;
        return _skin;
    }
}

export class ChatView extends ViewBase{
    private _ui:ui.views.chat.ui_chatViewUI;
    protected mMask = true;
    protected mMainSnapshot = true;

    private _panelCtl: ScrollPanelControl = new ScrollPanelControl();

    protected onAddLoadRes() {
        this.addAtlas('chat.atlas');
        this.addAtlas("jjc.atlas");
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.chat.ui_chatViewUI;
            this.bindClose(this._ui.close1);
            
            this._ui.input.maxChars = ChatConfigProxy.Ins.getCfg().f_maxcount;
            this._panelCtl.init(this._ui.panel);

            ButtonCtl.Create(this._ui.img_kq,new Laya.Handler(this,this.onBtnKQClick),false);
            ButtonCtl.Create(this._ui.img_tm,new Laya.Handler(this,this.onBtnLeagueClick),false);
            ButtonCtl.Create(this._ui.img_sj,new Laya.Handler(this,this.onBtnWorldClick),false);
            ButtonCtl.Create(this._ui.btn,new Laya.Handler(this,this.onBtnClick));

            // this._ui.img_tm.visible = false;
            // btn.setpos(234,47);
        }
    }

    protected onInit(): void {
        this._type = 0;
        this._isEnter = false;
        ChatModel.Ins.on(ChatModel.UPDATA_VIEW,this,this.onUpdataView);
        this.onBtnWorldClick();
    }

    protected onExit(): void {
        ChatModel.Ins.off(ChatModel.UPDATA_VIEW,this,this.onUpdataView);
    }

    private onUpdataView(){
        if(this._isEnter){
            this.updataView();
            this._isEnter = false;
        }else{
            if(this._ui.panel.vScrollBar.value >= this._ui.panel.vScrollBar.max){
                this.updataView();
            }else{
                this.updataView(false);
            }
        }
    }

    private _time:number = 0;
    private _isEnter:boolean;
    private onBtnClick(){
        let time: number = ChatConfigProxy.Ins.getCfg().f_pertextCD * 1000;
        if (Laya.timer.currTimer - this._time < time) {
            E.ViewMgr.ShowMidError("发送太快 请稍后再试");
            return;
        }
        this._time = Laya.timer.currTimer;
        let req: WorldChat_req = new WorldChat_req;
        req.chat = this._ui.input.textField.text;
        req.emojiId = 0;
        req.type = this._type;
        SocketMgr.Ins.SendMessageBin(req);
        this._ui.input.text = "";
        this._isEnter = true;
    }

    private _type:number;
    private onBtnKQClick(){
        if(this._type == 1)return;
        this._ui.img_kq.skin = "remote/chat/sj.png";
        this._ui.lab_kq.color = "#F2E1C2";

        this._ui.img_tm.skin = "remote/chat/tm.png"
        this._ui.lab_tm.color = "#B1723D";

        this._ui.img_sj.skin = "remote/chat/tm.png"
        this._ui.lab_sj.color = "#B1723D";

        this._ui.input.prompt = "点击输入内容";

        this._type = 1;
        this.updataView();
    }

    private onBtnWorldClick(){
        if(this._type == 3)return;
        this._ui.img_sj.skin = "remote/chat/sj.png";
        this._ui.lab_sj.color = "#F2E1C2";

        this._ui.img_kq.skin = "remote/chat/tm.png"
        this._ui.lab_kq.color = "#B1723D";

        this._ui.img_tm.skin = "remote/chat/tm.png"
        this._ui.lab_tm.color = "#B1723D";

        let cny = System_RefreshTimeProxy.Ins.getVal(80);
        if(cny == ""){
            this._ui.input.prompt = "点击输入内容";
        }else{
            let num = LiBaoModel.Ins.PlayerTotalCnt;
            if(num >= parseInt(cny)){
                this._ui.input.prompt = "点击输入内容";
            }else{
                this._ui.input.prompt = E.getLang("naming_charge_15",(num/100)+"/"+(parseInt(cny)/100));
            }
        }

        this._type = 3;
        this.updataView();
    }

    private onBtnLeagueClick(){
        if (!AllianceModel.Ins.alliance) {
            E.ViewMgr.ShowMidError("请先加入联盟");
            return;
        }
        if(this._type == 2)return;
        this._ui.img_tm.skin = "remote/chat/sj.png";
        this._ui.lab_tm.color = "#F2E1C2";

        this._ui.img_kq.skin = "remote/chat/tm.png"
        this._ui.lab_kq.color = "#B1723D";

        this._ui.img_sj.skin = "remote/chat/tm.png"
        this._ui.lab_sj.color = "#B1723D";

        this._ui.input.prompt = "点击输入内容";

        this._type = 2;
        this.updataView();
    }

    private updataView(flag:boolean = true){
        let arr = this.getList();
        this._panelCtl.clear();
        let hh = 0;
        for(let i = 0;i < arr.length;i++){
            let type = arr[i].type;
            let data = arr[i].data;
            if (type == 1) {
                hh = 22;
                this._panelCtl.split([data], ChatTimeItemNode, 22,20);
            } else if(type == 2){
                let h = this.getHeight(data.chat);
                hh = h;
                this._panelCtl.split([{data:data,h:h}], ChatMyItemNode, h ,20);
            }else if(type == 3){
                let h = this.getHeight(data.chat);
                hh = h;
                this._panelCtl.split([{data:data,h:h}], ChatOtherItemNode, h,20);
            }
        }
        Laya.timer.callLater(this,()=>{
            if(flag){
                this._panelCtl.endLast();
            }else{
                this._panelCtl.end(this._panelCtl.getScrollValue() - (hh + 20));
            }
        });
    }

    private getHeight(st:string){
        let num = 106;
        this._ui.lab.text = st;
        let h = (this._ui.lab.fontSize + this._ui.lab.leading);
        let hh = 36;
        if(this._ui.lab.textField.textHeight <= h){
            num = num + hh*0;
        }else if(this._ui.lab.textField.textHeight <= h * 2){
            num = num + hh*1;
        }else if(this._ui.lab.textField.textHeight <= h * 3){
            num = num + hh*2;
        }else if(this._ui.lab.textField.textHeight <= h * 4){
            num = num + hh*3;
        }
        return num;
    }

    private getList(){
        let arr;
        if(this._type == 1){
            arr = ChatModel.Ins.chatKQList;
        }else if(this._type == 2){
            arr = ChatModel.Ins.chatLeagueList;
        }else if(this._type == 3){
            arr = ChatModel.Ins.chatWorldList;
        }

        let array = [];
        let cfg = ChatConfigProxy.Ins.getCfg();
        for(let i:number=0;i<arr.length;i++){
            let obj:any = {};
            if(i == 0){
                obj.type = 1;
                obj.data = arr[i].unix;
                array.push(obj);

                obj = {};
                if(arr[i].playerId == MainModel.Ins.mRoleData.mPlayer.AccountId){
                    obj.type = 2;
                    obj.data = arr[i];
                    array.push(obj);
                }else{
                    obj.type = 3;
                    obj.data = arr[i];
                    array.push(obj);
                }
            }else{
                if (arr[i].unix - arr[i - 1].unix > cfg.f_timestage) {
                    obj.type = 1;
                    obj.data = arr[i].unix;
                    array.push(obj);

                    obj = {};
                    if (arr[i].playerId == MainModel.Ins.mRoleData.mPlayer.AccountId) {
                        obj.type = 2;
                        obj.data = arr[i];
                        array.push(obj);
                    } else {
                        obj.type = 3;
                        obj.data = arr[i];
                        array.push(obj);
                    }
                } else{
                    if (arr[i].playerId == MainModel.Ins.mRoleData.mPlayer.AccountId) {
                        obj.type = 2;
                        obj.data = arr[i];
                        array.push(obj);
                    } else {
                        obj.type = 3;
                        obj.data = arr[i];
                        array.push(obj);
                    }
                }
            }
        }
        return array;
    }

}