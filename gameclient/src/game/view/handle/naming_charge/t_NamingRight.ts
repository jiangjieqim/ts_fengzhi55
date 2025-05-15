import { BaseCfg } from "../../../static/json/data/BaseCfg";

export class t_NamingRight extends BaseCfg{
    public GetTabelName(): string {
        return "t_NamingRight";
    }

    getByType(type:number):Configs.t_NamingRight_dat{
        let l:Configs.t_NamingRight_dat[] = this.List;
        let cell = l.find(o=>o.f_Type == type);
        return cell;
    }
}