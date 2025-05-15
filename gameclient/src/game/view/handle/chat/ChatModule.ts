import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { E } from "../../../G";
import { EViewType } from "../../../common/defines/EnumDefine";
import { MSGID } from "../../../network/MSGID";
import { WorldChatListChange_revc, WorldChatList_revc } from "../../../network/protocols/BaseProto";
import { ChatModel } from "./model/ChatModel";
import { ChatConfigProxy } from "./proxy/ChatProxy";
import { ChatView } from "./view/ChatView";

export class ChatModule extends BaseModel{
    private static _ins:ChatModule;
    public static get ins(){
        if(!this._ins){
            this._ins = new ChatModule();
        }
        return this._ins;
    }
    public onInitCallBack():void{
        ChatModel.Ins.chatKQList = [];
        ChatModel.Ins.chatLeagueList = [];
        ChatModel.Ins.chatWorldList = [];
    }

    public initMsg(){
        this.Reg(new ChatView(EViewType.ChatView));

        E.MsgMgr.AddMsg(MSGID.WorldChatList, this.WorldChatList,this);
        E.MsgMgr.AddMsg(MSGID.WorldChatListChange, this.WorldChatListChange,this);
    }

    //世界聊天列表（3010前推，全部量，最多50条）
    private WorldChatList(value:WorldChatList_revc){
        ChatModel.Ins.setList(value.datalist);
    }

    //世界聊天列表变化量（有新消息时主动推，收到3553时返回）
    private WorldChatListChange(value:WorldChatListChange_revc){
        let cfg = ChatConfigProxy.Ins.getCfg();
        for(let i:number=0;i<value.datalist.length;i++){
            if(value.datalist[i].type == 1){
                if(ChatModel.Ins.chatKQList.length >= cfg.f_maxmessage){
                    ChatModel.Ins.chatKQList.shift();
                }
                ChatModel.Ins.chatKQList.push(value.datalist[i]);
            }else if(value.datalist[i].type == 2){
                if(ChatModel.Ins.chatLeagueList.length >= cfg.f_maxmessage){
                    ChatModel.Ins.chatLeagueList.shift();
                }
                ChatModel.Ins.chatLeagueList.push(value.datalist[i]);
            }else if(value.datalist[i].type == 3){
                if(ChatModel.Ins.chatWorldList.length >= cfg.f_maxmessage){
                    ChatModel.Ins.chatWorldList.shift();
                }
                ChatModel.Ins.chatWorldList.push(value.datalist[i]);
                ChatModel.Ins.event(ChatModel.UPDATA_MAIN_VIEW,ChatModel.Ins.chatWorldList[ChatModel.Ins.chatWorldList.length - 1]);
            }
        }
        ChatModel.Ins.event(ChatModel.UPDATA_VIEW);
    }
}