import { stNewPlayerAttr } from "../../../../network/protocols/BaseProto";
import { EFuncDef } from "../../main/model/EFuncDef";
import { MainModel } from "../../main/model/MainModel";
import { RedEnum } from "../../main/model/RedEnum";

export class JieDongFengModel extends Laya.EventDispatcher{
    private static _ins: JieDongFengModel;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new JieDongFengModel();
        }
        return this._ins;
    } 

    public static UpdataView:string = "UpdataView";

    public dataList:any[];
    public setDataList(value:stNewPlayerAttr[]){
        if(!this.dataList){
            this.dataList = [];
            for(let i:number=0;i<3;i++){
                let obj:any = {};
                obj.type = i + 1;
                let vo = value.find(ele => ele.type == (i + 1));
                if(vo){
                    obj.data = vo;
                    obj.selectId = vo.id;
                }else{
                    obj.data = null;
                    obj.selectId = 0;
                }
                this.dataList.push(obj);
            }
        }else{
            for(let i:number=0;i<value.length;i++){
                let index = this.dataList.findIndex(ele => ele.type == value[i].type);
                if(index != -1){
                    this.dataList[index].data = value[i];
                    this.dataList[index].selectId = value[i].id;
                }
            }
        }
    }

    public setSelectId(type:number,id:number){
        let vo = this.dataList.find(ele => ele.type == type);
        if(vo){
            vo.selectId = id;
        }
    }

    public isRedTip(){
        if(MainModel.Ins.isOpenByFuncId(EFuncDef.JieDongFeng.toString())){
            return MainModel.Ins.needRed(RedEnum.RED_JieDongFeng);
        }
    }
}