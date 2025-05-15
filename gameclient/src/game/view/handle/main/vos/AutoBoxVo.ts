import { stEquipAttr } from "../../../../network/protocols/BaseProto";
import { System_RefreshTimeProxy } from "../../huodong/model/ActivityProxy";
import { VipModel } from "../../huodong/model/VipModel";
import { MainModel } from "../model/MainModel";
import { RedEnum } from "../model/RedEnum";
import { ISaveData, RedUpdateModel } from "../model/RedUpdateModel";
import { Box_AutoProxy } from "../proxy/Box_AutoProxy";
import { CountAutoCfg, EBoxAutoType, t_Box_filter } from "../views/HighChestAutoSettingView";

enum EAutoErrCode{
    /**无 */
    None = 0,
    /**停止 */
    Stop = 1,
    /**继续 */
    GoOn = 2,
}

interface IBox_Auto_dat{
    /*id*/
     f_id:number;
    /*任务id*/
     f_TaskID:number;
    /*宝箱倍率*/
     f_BoxMag:number;
    /*解锁类型*/
     f_UnlockType:number;
    /*参数*/
     f_p1:number;
}
/**自动开宝箱结构体
 * 纵向4条是或
 * 横向是和
 */
export class BoxAutoVo{
    public togetherCkVal:boolean = false;//同时
    // public orCkVal:boolean = true;//或

    /**默认选择品质所有 */
    // public qua_f_id:number;
    /**需要终止的属性 */
    // public attrIds0:number[] = [];
    // public attrIds1:number[] = [];
    
    /**宝箱委托时候的扣除的宝箱卷数量 去读配置表t_Box_Auto.xlsx中的倍率*/
    // public boxAutoUseCount:number;

    /**
     * 是否开启检测 '战力高于当前装备'   的时候停止
     */
    public get mCheckPlusHigh(): boolean{
        let n = RedUpdateModel.Ins.getByID(RedEnum.BOX_PLUS);
        if(n){
            return n.type == 1;
        }
        return true;
    }
	/**1默认不勾选 非1默认勾选*/
    private get defaultAttrCk(){
        return parseInt(System_RefreshTimeProxy.Ins.getVal(92)) == 1 ? false :true;
    }

    public set mCheckPlusHigh(v:boolean){
        RedUpdateModel.Ins.save(RedEnum.BOX_PLUS,v ? 1:0);
    }

    // private _countDataList: CountAutoCfg[];
    public get boxNumCfgList(): CountAutoCfg[] {
        // if (!this._countDataList) {
        // let __countDataList = [];
        let list1: Configs.t_Box_Auto_dat[] = Box_AutoProxy.Ins.List;
        let _countDataList: CountAutoCfg[] = [];
        _countDataList.push(new CountAutoCfg());
        for (let i = 0; i < list1.length; i++) {
            let cfg = list1[i];
            _countDataList.push(new CountAutoCfg(cfg));
        }
        let nextFid = list1[list1.length - 1].f_id + 1;
        // __countDataList = _countDataList;
        // }

        //vip 
        let arr = VipModel.Ins.getVipTQByType3();
        for (let i = 0; i < arr.length; i++) {
            let cfg = {} as IBox_Auto_dat;
            cfg.f_id = nextFid + i;
            cfg.f_p1 = 0;
            cfg.f_UnlockType = EBoxAutoType.Vip;
            cfg.f_BoxMag = parseInt(arr[i]);
            _countDataList.push(new CountAutoCfg(cfg));
        }

        // __countDataList = _countDataList;
        return _countDataList;
        // return this._countDataList;
    }

    public get boxAutoUseCount():number{
        let vo = this.boxNumCfgList[this.boxCountIndex];
        if(vo.locked){
            return this.boxNumCfgList[0].boxMag;
        }
        if(vo){
            return vo.boxMag;
        }
        return this.boxNumCfgList[0].boxMag;
    }

    public reset(){
        this.togetherCkVal = false;
    }
    public get isOpen(){
        return MainModel.Ins.boxAuto.open == 1;
    }

    private hasAttr(l:stEquipAttr[],attrid:number){
        for(let i:number = 0;i < l.length;i++){
            if(attrid == l[i].id){
                return true;
            }
        }
    }

    // private isNeedCheck(id: RedEnum) {
    //     let arr1: RedEnum[] = [RedEnum.BOX_ATTR_0, RedEnum.BOX_ATTR_1, RedEnum.BOX_ATTR_2, RedEnum.BOX_ATTR_3];
    //     let index = arr1.indexOf(id);
    //     let cfg: Configs.t_Box_filter_dat = t_Box_filter.Ins.List[index];
    //     let o = RedUpdateModel.Ins.getByID(id as any);
    //     if (o) {
    //         let selIndex = o.type;

    //     }
    // }


    private isStopNow(l:stEquipAttr[],id:RedEnum):EAutoErrCode{
        
        let arr1:RedEnum[] = [RedEnum.BOX_ATTR_0,RedEnum.BOX_ATTR_1,RedEnum.BOX_ATTR_2,RedEnum.BOX_ATTR_3];
        let index = arr1.indexOf(id);

        let group = t_Box_filter.Ins.List;

        let cfg:Configs.t_Box_filter_dat = group[index];
        let arr:string[] = cfg.f_filter1.split("|");
        
        //当前选择的索引
        let selIndex = 0;
        let o = RedUpdateModel.Ins.getByID(id as any);
        if(o){
            selIndex = o.type;
        }
        //val 属性id
        let val;
        if(selIndex == 0){
            val = 0;
        }else{
            val = parseInt(arr[selIndex-1]);
        }
        if(val == 0){
            //任意
            for(let i = 0;i < arr.length;i++){
                let id = parseInt(arr[i]);
                if(this.hasAttr(l,id)){
                    return EAutoErrCode.Stop;
                }
            }
        }else if(isNaN(val)){
            return EAutoErrCode.None;
        }
        else{
            if(this.hasAttr(l,val)){
                return EAutoErrCode.Stop;
            }
        }
        return EAutoErrCode.GoOn;
    }

    private check(l:stEquipAttr[],arr:RedEnum[]){
        let s0:EAutoErrCode = this.isStopNow(l,arr[0]);
        let s1:EAutoErrCode = this.isStopNow(l,arr[1]);
        if( s0 == EAutoErrCode.None && s1 == EAutoErrCode.Stop ||
            s0 == EAutoErrCode.Stop && s1 == EAutoErrCode.None ||
            s0 == EAutoErrCode.Stop && s1 == EAutoErrCode.Stop ||
            s0 == EAutoErrCode.None && s1 == EAutoErrCode.None

            )
        {
                return true;
        }
    }

    /**检查属性是否需要停止 */
    public checkAttrIsCanStop(l:stEquipAttr[]){
        if(this.ck0){
            if(this.check(l,[RedEnum.BOX_ATTR_0,RedEnum.BOX_ATTR_1])){
                return true;
            }
        }
        if(this.ck1){
            if(this.check(l,[RedEnum.BOX_ATTR_2,RedEnum.BOX_ATTR_3])){
                return true;
            }
        }
        return false;
    }

    public get attrCk(){
        return this.ck0 || this.ck1;
    }    

    public print(){
    }

    /**上传状态 */
    public upload() {
        let cm: RedUpdateModel = RedUpdateModel.Ins;

        let l1:ISaveData[] = [];
        l1.push({ id: RedEnum.BOX_QUA, val: this.getQua_f_id() } as ISaveData);

        let arr = [RedEnum.BOX_ATTR_0,RedEnum.BOX_ATTR_1,RedEnum.BOX_ATTR_2,RedEnum.BOX_ATTR_3];
        for(let i = 0;i < arr.length;i++){
            let v:any = arr[i];
            let o = RedUpdateModel.Ins.getByID(v);
            let out:number = 0;
            if(o){
                out = o.type;
            }
            l1 = l1.concat({id:v,val:out} as ISaveData);
        }
        l1.push({ id: RedEnum.BOX_PLUS, val: this.mCheckPlusHigh ? 1 : 0 } as ISaveData);
        l1.push({id :RedEnum.BOX_NUM_INDEX,val:this.getBoxNumIndex()} as ISaveData);

        l1.push({id :RedEnum.BOX_CK0,val:this.ck0 ? 1: 0} as ISaveData);
        l1.push({id :RedEnum.BOX_CK1,val:this.ck1 ? 1: 0} as ISaveData);
        
        cm.saveArr(l1);
    }

    public uddateAttr(id, val) {
        RedUpdateModel.Ins.save(id, val);
    }

    public get boxCountIndex(): number {
        return this.getBoxNumIndex();
    }

    public set boxCountIndex(v: number) {
        RedUpdateModel.Ins.save(RedEnum.BOX_NUM_INDEX, v);
    }

    public getBoxNumIndex() {
        let n = RedUpdateModel.Ins.getByID(RedEnum.BOX_NUM_INDEX);
        let boxindex = 0;
        if (n) {
            boxindex = n.type;
        }
        return boxindex;
    }

    public getQua_f_id(){
        let vo = RedUpdateModel.Ins.getByID(RedEnum.BOX_QUA);
        if(vo){
            return vo.type;
        }
        return 1;
    }

    public saveQua(val){
        RedUpdateModel.Ins.save(RedEnum.BOX_QUA,val);
    }

    public initData(){
    }
    public getIndexByAttrId(cfg:Configs.t_Box_filter_dat,attrId:number){
        // let group = t_Box_filter.Ins.List;
        // let cfg:Configs.t_Box_filter_dat  = group[index];
        if(!cfg){
            return 0;
        }
        let arr: string[] = cfg.f_filter1.split("|");
        let i = arr.indexOf(attrId.toString());
        if (i != -1) {
            return i + 1;
        }
        return 0;
    }
    /**第一行的两条属性 */
    public get ck0() {
        let o = RedUpdateModel.Ins.getByID(RedEnum.BOX_CK0);
        if (o) {
            return o.type == 1;
        }
        return this.defaultAttrCk;
    }

    public set ck0(v: boolean) {
        RedUpdateModel.Ins.save(RedEnum.BOX_CK0, v ? 1 : 0);
    }
    /**第二行的两条属性 */
    public get ck1() {
        let o = RedUpdateModel.Ins.getByID(RedEnum.BOX_CK1);
        if (o) {
            return o.type == 1;
        }
        return this.defaultAttrCk;
    }

    public set ck1(v: boolean) {
        RedUpdateModel.Ins.save(RedEnum.BOX_CK1, v ? 1 : 0);
    }
}