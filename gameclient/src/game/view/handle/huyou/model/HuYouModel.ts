
import { BlessingChange_revc, stEquipAttr, stItem, stItemEquipAttr, stItemRem } from "../../../../network/protocols/BaseProto";
import { uint64 } from "../../../../network/protocols/uint64";
import { EFuncDef } from "../../main/model/EFuncDef";
import { TaskModel } from "../../main/model/TaskModel";
import { PlayerVoFactory } from "../../main/vos/PlayerVoFactory";
import { HuYouAttrNameProxy, HuYouSlotProxy } from "../proxy/HuYouProxy";

/* @Author: tsy
 * @Date: 2023-02-17 11:45:22
 * @Last Modified by: tsy
 * @Last Modified time: 2023-03-21 13:30:47
*/
export class HuYouModel extends Laya.EventDispatcher{
    private static _ins: HuYouModel;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new HuYouModel();
        }
        return this._ins;
    } 

    public bagList:any;

    public static UPDATA_VIEW:string = "UPDATA_VIEW";
    public static UPDATA_VIEW_Level:string = "UPDATA_VIEW_Level";
    public static UPDATA_VIEW_Item:string = "UPDATA_VIEW_Item";
    public static UPDATA_AUTO:string = "UPDATA_AUTO";
    public bagSoulInfoAttr:stItemEquipAttr[];
    public startTime:number;
    public level:number;
    public freeCount:number;
    public isAuto:boolean;
    // tabSelIndex:number = -1;
    public wtSelect1:boolean;
    public wtSelect2:boolean;
    public wtQua:number;

    public static BagEnmu = {
        noSort_FY:0,//0无序的福佑背包
        sort_FY:1,//1有序福佑装备背包
    }

    public getAttr(uid:uint64):stEquipAttr{
        for(let ele in this.bagSoulInfoAttr){
            if(this.bagSoulInfoAttr[ele]){
                if(uid.equals(this.bagSoulInfoAttr[ele].uid)){
                    return this.bagSoulInfoAttr[ele].attrList[0];
                }
            }
        }
    }

    //获得已装备福源相同属性的位置
    public getEquipSameSoulPos(attrID:number,cheifId:number){
        let arr = this.getBagList(HuYouModel.BagEnmu.sort_FY,cheifId);
        for(let ele of arr){
            let attr = this.getAttr(ele.uid);
            if(attrID == attr.id){
                return ele.pos;
            }
        }
        return -1;
    }

    //获得有序背包的属性
    private getSortBagAttList(cheifId:number){
        let list = [];
        let arr = this.getBagList(HuYouModel.BagEnmu.sort_FY,cheifId);
        for(let ele of arr){
            list.push(this.getAttr(ele.uid))
        }
        return list;
    }

    public getSuitAttrShow(cheifId:number = 0){
        let str = "";
        let arr:Configs.t_Blessing_Attribute_Name_dat[] = HuYouAttrNameProxy.Ins.List;
        let list = this.getSortBagAttList(cheifId);
        for(let ele of arr){
            let vo = list.find(item => item.id == parseInt(ele.f_AttributeID));
            if(vo){
                str += vo.id + ":" + vo.value + "|";
            }else{
                str += ele.f_AttributeID + ":" + 0 + "|";
            }
        }
        if(str.length > 0){
            str = str.substr(0,str.length -1);
        }
        let array:string[] = PlayerVoFactory.mergeAttr(str);
        return array;
    }

    public initBag(value:any){
        this.bagList = {};
        for(let ele of value){
            if(!this.bagList[ele.type]){
                this.bagList[ele.type] = [];
            }
            this.bagList[ele.type].push(ele);
        }
    }

    public updataPushBag(value:BlessingChange_revc){
        if(value.bagInfo.length){
            for(let i:number=0;i<value.bagInfo.length;i++){
                let bagVo = value.bagInfo[i];
                if(!this.bagList[bagVo.type]){
                    this.bagList[bagVo.type] = [];
                }
                if(bagVo.actionType == 0){
                    this.bagList[bagVo.type].push(bagVo);
                    if(value.bagInfoAttr[i]){
                        this.bagSoulInfoAttr.push(value.bagInfoAttr[i]);
                    }
                }else if(bagVo.actionType == 1){
                    let index = this.bagList[bagVo.type].findIndex(item => (item as stItem).uid.equals(bagVo.uid));
                    if(index != -1){
                        this.bagList[bagVo.type][index] = bagVo;
                    }
                    index = this.bagSoulInfoAttr.findIndex(item => (item as stItemEquipAttr).uid.equals(value.bagInfoAttr[i].uid));
                    if(index != -1){
                        this.bagSoulInfoAttr[index] = value.bagInfoAttr[i];
                    }
                }
            }
        }
    }

    public updataDelBag(value:stItemRem[]){
        for(let ele of value){
            let index:number = this.bagList[ele.type].findIndex(item => (item as stItem).uid.equals(ele.uid));
            if(index != -1){
                this.bagList[ele.type].splice(index,1);
            }
            index = this.bagSoulInfoAttr.findIndex(item => (item as stItemEquipAttr).uid.equals(ele.uid));
            if(index != -1){
                this.bagSoulInfoAttr.splice(index,1);
            }
        }
    } 

    public getBagList(type:number,cheifId:number = 0):stItem[]{
        if(!this.bagList){
            return [];
        }
        if(!this.bagList[type]){
            return [];
        }
        if(type == HuYouModel.BagEnmu.noSort_FY){
            return this.bagList[type];
        }
        let array = [];
        let arr = this.bagList[type];
        for(let ele of arr){
            if(ele.cheifId == cheifId){
                array.push(ele);
            }
        }
        return array;
    }

    public isDotMain(){
        if(TaskModel.Ins.isFuncOpen(EFuncDef.CiFu)){
            if(this.isDotFree() || this.isDotEquipAll()){
                return true;
            }
        }
        return false;
    }   

    public isDotEquipAll(cheifId:number = 0){
        for(let i:number = 1;i < 9; i++){
            if(this.isDotEquip(i,cheifId)){
                return true;
            }
        }
        return false;
    }

    public isDotFree(){
        if(this.freeCount){
            return true;
        }
        return false;
    }

    public isDotEquip(index:number,cheifId:number = 0){
        let soltNum = HuYouSlotProxy.Ins.getSlotNum();
        if(soltNum >= index){
            let array:stItem[] = this.getBagList(HuYouModel.BagEnmu.noSort_FY,cheifId);//背包数据
            let arr:stItem[] = this.getBagList(HuYouModel.BagEnmu.sort_FY,cheifId);//装备数据
            let idx = arr.findIndex(item => (item as stItem).pos == index);//当前位置有没有装备
            if(array.length > 0 && idx == -1){
                return true;
            }
            // for(let i:number=0;i<array.length;i++){
            //     let attr = HuYouModel.Ins.getAttr(array[i].uid);//背包属性
            //     let pos = HuYouModel.Ins.getEquipSameSoulPos(attr.id);//相同属性位置
            //     if(pos != -1){
            //         if(pos == index){
            //             if(idx != -1){
            //                 let att:stEquipAttr = this.getAttr(arr[idx].uid);//装备上的属性值
            //                 if(attr.value > att.value){
            //                     return true;
            //                 }
            //             }else{
            //                 return true;
            //             }
            //         }
            //     }else{
            //         if(idx == -1){
            //             return true;
            //         }
            //     }
                
            // }
        }
        return false;
    }

}