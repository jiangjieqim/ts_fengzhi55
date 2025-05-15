import { EMsgBoxType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { BaseCfg } from "../../../../static/json/data/BaseCfg";

export class ChengHaoListProxy extends BaseCfg{
    private static _ins:ChengHaoListProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new ChengHaoListProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Title_Lists";
    }

    public getCfgByID(titleId:number):Configs.t_Title_Lists_dat{
        return this.List.find(item => item.f_titleid == titleId);
    }

    public getSmallIcon(titleId:number){
        if(titleId == 0){
            return "";
        }
        let str = this.getCfgByID(titleId).f_titlePic;
        let icon = `o/smalltitle/${str}`;
        if(str == ""){
            E.ViewMgr.ShowDebugError(`table t_Title_Lists titleId:${titleId} 's f_titlePic is empty!`)
        }
        if(str == ""){
            return "";
        }
        return icon;
    }
    public getIcon(titleId:number){
        if(titleId == 0){
            return "";
        }
        return `o/title/${this.getCfgByID(titleId).f_titlePic}`;
    }
}

export class ChengHaoTaskProxy extends BaseCfg{
    private static _ins:ChengHaoTaskProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new ChengHaoTaskProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Title_Task";
    }

    public getCfgByID(id:number):Configs.t_Title_Task_dat{
        return this.List.find(item => item.f_titleid == id);
    }
}

export class ChengHaoTaskTypeProxy extends BaseCfg{
    private static _ins:ChengHaoTaskTypeProxy;

    public static get Ins(){
        if(!this._ins){
            this._ins = new ChengHaoTaskTypeProxy();
        }
        return this._ins;
    }

    public GetTabelName(): string {
        return "t_Title_Task_Type";
    }

    public getCfgByID(id:number):Configs.t_Title_Task_Type_dat{
        return this.List.find(item => item.f_typeid == id);
    }
}