import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { SocketMgr } from "../../../../network/SocketMgr";
import { JustWatchPlayer_req, stChatPlayer } from "../../../../network/protocols/BaseProto";
import { ChengHaoModel } from "../../chenghao/model/ChengHaoModel";
import { MainModel } from "../../main/model/MainModel";
import { EClientType } from "../../sdk/ClientType";
import { ChatModel } from "../model/ChatModel";

export class ChatOtherItem extends ui.views.chat.ui_chatOtherItemUI{

    constructor() {
        super();
        this.on(Laya.Event.DISPLAY, this, this.onDisplay);
        this.on(Laya.Event.UNDISPLAY, this, this.onUnDisplay);

        ButtonCtl.Create(this.bg,new Laya.Handler(this,this.onBgClick),false);
    }

    private onBgClick(){
        if(this._data){
            ChatModel.Ins.isChat = true;
            let req: JustWatchPlayer_req = new JustWatchPlayer_req();
            req.playerId = this._data.playerId;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private onDisplay(){

    }

    private onUnDisplay(){

    }

    private _data:stChatPlayer;
    public setData(value:stChatPlayer){
        if(!value)return;
        this._data = value;
        // 
        MainModel.Ins.setTTHead(this.icon, MainModel.Ins.convertHead(value.headUrl));
        this.lab_name.text = value.name;
        this.img_title.skin = ChengHaoModel.Ins.getTitleImg(value.titleId);
        this.img_title.x = this.lab_name.x + this.lab_name.textField.textWidth + 2;

        this.lab.text = value.chat;
        this.img_bg.width = this.lab.textField.textWidth + 32;
        this.img_bg.height = this.lab.textField.textHeight + 28;

        if(initConfig.clienttype == EClientType.Discount){
            this.sp.visible = true;
            this.sp.x = this.img_title.x + (this.img_title.width * this.img_title.scaleX) - 8;
            this.lab_vip.text = "VIP" + value.vip;
            this.lab_vip1.text = value.vip.toString();
        }else{
            this.sp.visible = false;
        }
    }
}