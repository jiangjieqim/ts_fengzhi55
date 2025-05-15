import { ui } from "../../../../../ui/layaMaxUI";
import { stChatPlayer } from "../../../../network/protocols/BaseProto";
import { ChengHaoModel } from "../../chenghao/model/ChengHaoModel";
import { MainModel } from "../../main/model/MainModel";
import { EClientType } from "../../sdk/ClientType";

export class ChatMyItem extends ui.views.chat.ui_chatMyItemUI{

    constructor() {
        super();
        this.on(Laya.Event.DISPLAY, this, this.onDisplay);
        this.on(Laya.Event.UNDISPLAY, this, this.onUnDisplay);
    }

    private onDisplay(){

    }

    private onUnDisplay(){

    }

    public setData(value:stChatPlayer){
        if(!value)return;
        MainModel.Ins.setTTHead(this.icon, MainModel.Ins.convertHead(value.headUrl))
        this.img_title.skin = ChengHaoModel.Ins.getTitleImg(value.titleId);

        this.lab.text = value.chat;
        this.img_bg.width = this.lab.textField.textWidth + 32;
        this.img_bg.height = this.lab.textField.textHeight + 28;

        if(this.lab.textField.textHeight > (this.lab.fontSize + this.lab.leading)){
            this.lab.align = "left";
            this.lab.x = 15;
        }else{
            this.lab.align = "right";
            this.lab.x = 6;
        }

        if(initConfig.clienttype == EClientType.Discount){
            this.sp.visible = true;
            this.lab_vip.text = "VIP" + value.vip;
            this.lab_vip1.text = value.vip.toString();
        }else{
            this.sp.visible = false;
        }
    }
}