import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class ChatConfigProxy extends BaseCfg{
    private static _ins:ChatConfigProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new ChatConfigProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Chat_Config";
    }

    public getCfg():Configs.t_Chat_Config_dat{
        return this.List[0];
    }
}