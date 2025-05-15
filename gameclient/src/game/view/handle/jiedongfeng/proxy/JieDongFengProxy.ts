import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class NewplayerAttributeProxy extends BaseCfg{
    private static _ins:NewplayerAttributeProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new NewplayerAttributeProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Newplayer_Attribute";
    }

    public getListByType(type:number):Configs.t_Newplayer_Attribute_dat[]{
        let arr = [];
        for(let i:number=0;i<this.List.length;i++){
            if(this.List[i].f_attrtype == type){
                arr.push(this.List[i]);
            }
        }
        return arr;
    }
}