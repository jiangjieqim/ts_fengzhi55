import { stChatPlayer } from "../../../../network/protocols/BaseProto";

export class ChatModel extends Laya.EventDispatcher{
    private static _ins: ChatModel;
    
    public static get Ins() {
        if (!this._ins) {
            this._ins = new ChatModel();
        }
        return this._ins;
    } 

    public isChat:boolean = false;

    public static UPDATA_VIEW:string = "UPDATA_VIEW";
    public static UPDATA_MAIN_VIEW:string = "UPDATA_MAIN_VIEW";

    public chatKQList:stChatPlayer[];
    public chatLeagueList:stChatPlayer[];
    public chatWorldList:stChatPlayer[];

    public setList(value:stChatPlayer[]){
        this.chatKQList = [];
        this.chatLeagueList = [];
        this.chatWorldList = [];
        for(let i:number=0;i<value.length;i++){
            if(value[i].type == 1){
                this.chatKQList.push(value[i]);
            }else if(value[i].type == 2){
                this.chatLeagueList.push(value[i]);
            }else if(value[i].type == 3){
                this.chatWorldList.push(value[i]);
            }
        }
    }
}