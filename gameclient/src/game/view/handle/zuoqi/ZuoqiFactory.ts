import { stRideVo } from "../../../network/protocols/BaseProto";
import { Mount_ListProxy } from "./vos/ZuoqiProxy";
import { ZuoqiVo } from "./vos/ZuoqiVo";
function getQua(vo:stRideVo) {
    return Mount_ListProxy.Ins.getCfg(vo.id).f_Quality;
}
export class ZuoqiFactory {
    public static createZuoQiVo(cell:stRideVo){
        let _vo:ZuoqiVo = new ZuoqiVo();
        _vo.curVo = cell;
        return _vo;
    }
    /**星级排序 */
    private static sortStar(a:stRideVo,b:stRideVo){
        if(a.star > b.star){
            return -1;
        }
        else if(a.star < b.star){
            return 1;
        }
        return 0;
    }
    /**等级排序 */
    private static sortLv(a:stRideVo,b:stRideVo){
        if(a.lv > b.lv){
            return -1;
        }
        else if(a.lv < b.lv){
            return 1;
        }
        return 0;
    }
    /**品质排序 */
    private static sortQua(a:stRideVo,b:stRideVo){
        let aq = ZuoqiFactory.getQua(a);
        let bq = ZuoqiFactory.getQua(b);
        if(aq > bq){
            return -1;
        }
        else if(aq < bq){
            return 1;
        }
        return 0;
    }
    
    private static getQua(vo:stRideVo) {
        return Mount_ListProxy.Ins.getCfg(vo.id).f_Quality;
    }

    // private static sortFunc(a:stRideVo,b:stRideVo){
    //     if(a.star > b.star){
    //         let aq = ZuoqiFactory.getQua(a);
    //         let bq = ZuoqiFactory.getQua(b);
    //         if(aq < bq){
    //             return 1;
    //         }
    //         return -1;
    //     }else if(a.star < b.star){
    //         let aq = ZuoqiFactory.getQua(a);
    //         let bq = ZuoqiFactory.getQua(b);
    //         if(aq > bq){
    //             return -1;
    //         }
    //         return 1;
    //     }
    //     return 0;
    // }
    // 等级>星级
    private static sortLvStarFunc(a:stRideVo,b:stRideVo){
        if(a.lv > b.lv){
            if(a.star < b.star){
                return 1;
            }
            return -1;
        }else if(a.lv < b.lv){
            if(a.star > b.star){
                return -1;
            }
            return 1;
        }
        return 0;
    }

    //lv star qua
    
    public static sortList(l:stRideVo[]){
/*
        l = l.sort(this.sortLv);
        let lvMaps = {};
        for (let i = 0; i < l.length; i++) {
            let cell:stRideVo = l[i];
            let lv = cell.lv;
            if(!lvMaps[lv]){
                lvMaps[lv] = [];
            }
            lvMaps[lv].push(cell);
        }

        let rl = [];
        for(let c in lvMaps){
            let arr:stRideVo[] = lvMaps[c];
            arr = arr.sort(this.sortFunc);
            lvMaps[c] = arr;
            rl=rl.concat(arr);
        }
        return rl.reverse();
        */

        
        /**稀有度>等级>星级 */

        //稀有度
        l = l.sort(this.sortQua);

        let quaMap = {};
        for (let i = 0; i < l.length; i++) {
            let cell:stRideVo = l[i];
            let qua = getQua(cell);
            if(!quaMap[qua]){
                quaMap[qua] = [];
            }
            quaMap[qua].push(cell);
        }

        for(let c in quaMap){
            let arr:stRideVo[] = quaMap[c];//同稀有度

            arr =  arr.sort(this.sortLv);

            let lvMaps = {};
            for(let i = 0;i < arr.length;i++){
                let cell:stRideVo = arr[i];
                if(!lvMaps[cell.lv]){
                    lvMaps[cell.lv] = [];
                }
                lvMaps[cell.lv].push(cell);

            }

            for(let v in lvMaps){
                let arrlv = lvMaps[v];
                arrlv = arrlv.sort(this.sortStar);

            }
        }
        let _maxQua:number = Mount_ListProxy.Ins.maxQua;
        let a = [];
        for(let i = 1;i <= _maxQua;i++){
            let m = quaMap[i];
            if(m){
                a.push(m);
            }
        }
        a = a.reverse();
        let b = [];
        for(let i = 0;i < a.length;i++){
            b = b.concat(a[i]);
        }
        return b;
    }
}