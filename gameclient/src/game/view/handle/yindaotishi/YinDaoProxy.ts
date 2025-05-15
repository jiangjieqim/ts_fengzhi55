import { BaseCfg } from "../../../static/json/data/BaseCfg";
import { MainModel } from "../main/model/MainModel";

export class YinDaoTaskProxy extends BaseCfg{
    private static _ins:YinDaoTaskProxy;
    public typeList:number[];
    public taskList:any;
    public static get Ins(){
        if(!this._ins){
            this._ins = new YinDaoTaskProxy();
        }
        return this._ins;
    }

    constructor(){
        super();
        this.rebuild();
    }

    rebuild(){
        this.typeList = [];
        this.taskList = {};
        for(let i:number=0;i<this.List.length;i++){
            let id:number = parseInt(this.List[i].f_GuidePosition.split("-")[0]);
            if(this.typeList.indexOf(id) == -1){
                this.typeList.push(id);
            }

            let taskId = MainModel.Ins.getTaskGuideCfg(this.List[i]);

            if(!this.taskList[taskId]){
                this.taskList[taskId] = [];
            }
            this.taskList[taskId].push(this.List[i]);
        }
        // console.log(this.taskList);
        // console.log("==>"+MainModel.Ins.tabelSuffix);
    }

    public getCfgByGID(gid:number):Configs.t_Tasks_Guide_dat{
        let l = this.List;
        return l.find(item => (item as Configs.t_Tasks_Guide_dat).f_GuideID == gid);
    }

    public GetTabelName(): string {
        return "t_Tasks_Guide";
    }


}