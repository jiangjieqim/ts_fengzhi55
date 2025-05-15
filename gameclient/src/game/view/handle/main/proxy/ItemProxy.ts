import { BaseCfg } from "../../../../static/json/data/BaseCfg";
export class ItemProxy extends BaseCfg{
    public GetTabelName() {
        return "t_Item"
    }
    private static _ins: ItemProxy;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new ItemProxy();
        }
        return this._ins;
    }

    public getCfg(itemId:number):Configs.t_Item_dat{
        let _l = this.List;
        for(let i = 0;i < _l.length;i++){
            let cfg:Configs.t_Item_dat = _l[i];
            if(cfg.f_itemid == itemId){
                return cfg;
            }
        }
    }

    public getSubTypeList(subType:number){
        let itemIdList:number[] = [];
        let _l:Configs.t_Item_dat[] = this.List;
        _l.forEach(cfg=>{
            if(cfg.f_sub_type ==  subType){
                itemIdList.push(cfg.f_itemid);
            }
        });
        return itemIdList;
    }
}