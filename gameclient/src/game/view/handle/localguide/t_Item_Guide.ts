import { BaseCfg } from "../../../static/json/data/BaseCfg";

export class t_Item_Guide extends BaseCfg{
    public typeList:number[];
    public itemList:any;
    public GetTabelName(): string {
        return "t_Item_Guide";
    }
    private static _ins: t_Item_Guide;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Item_Guide();
        }
        return this._ins;
    }

    constructor(){
        super();
        this.rebuild();
    }
    rebuild(){
        this.typeList = [];
        this.itemList = [];
        let l = this.List;
        for(let i = 0;i  < l.length;i++){
            let cfg:Configs.t_Item_Guide_dat = l[i];
            let id:number = parseInt(cfg.f_GuidePosition.split("-")[0]);
            if(this.typeList.indexOf(id) == -1){
                this.typeList.push(id);
            }
            let itemId:number = cfg.f_ItemID;
            if(!this.itemList[itemId]){
                this.itemList[itemId] = [];
            }
            this.itemList[itemId].push(cfg);
        }
    }
}