import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { EViewType } from "../../../common/defines/EnumDefine";
import { E } from "../../../G";
import { MSGID } from "../../../network/MSGID";
import { GetFuncGuide_revc, stFuncGuide } from "../../../network/protocols/BaseProto";
import { EFuncDef } from "../main/model/EFuncDef";
import { MainEvent } from "../main/model/MainEvent";
import { MainModel } from "../main/model/MainModel";
import { t_Func_Guide } from "../main/proxy/t_Func_Guide";
import { ZhengTuView } from "./ZhengTuView";

/*0不可领取 1已领取 2可领取*/
export enum EZhengTuStatus {
    Not = 0,
    YiLingQu = 1,
    KeLingQu = 2,
}

export class ZhengTuModel extends BaseModel {
    private static _ins: ZhengTuModel;
    public dataList: stFuncGuide[] = [];
    public static EVENT_UPDATE: string = "EVENT_UPDATE";
    public static get Ins() {
        if (!this._ins) {
            this._ins = new ZhengTuModel();
        }
        return this._ins;
    }

    public cfgList: Configs.t_Func_Guide_dat[] = [];
    private sortHandler(a: Configs.t_Func_Guide_dat, b: Configs.t_Func_Guide_dat) {
        let a1 = t_Func_Guide.Ins.f_sort(a);
        let b1 = t_Func_Guide.Ins.f_sort(b);
        if (a1 < b1) {
            return -1;
        } else if (a1 > b1) {
            return 1;
        }
        return 0;
    }
    public onInitCallBack(): void {
        this.dataList = [];
    }

    rebuild(){
        this.cfgList = t_Func_Guide.Ins.List.sort(this.sortHandler);
    }

    public initMsg(): void {
        this.Reg(new ZhengTuView(EViewType.ZhengTu));
        E.MsgMgr.AddMsg(MSGID.GetFuncGuide, this.onGetFuncGuide, this);
    }

    /**都领取了就不显示了 */
    private onGetFuncGuide(revc: GetFuncGuide_revc) {
        let datalist = revc.dataList;
        for (let i = 0; i < datalist.length; i++) {
            let cell = datalist[i];
            this.updateDataList(cell);
        }
        this.update();
    }
    private updateDataList(cell: stFuncGuide) {
        let find = this.dataList.find(item => item.id == cell.id);
        if (find) {
            find.intervalTask = cell.intervalTask;
            find.state = cell.state;
        } else {
            this.dataList.push(cell);
        }
    }

    private update(){
        this.updateRed();
        this.event(ZhengTuModel.EVENT_UPDATE);
        MainModel.Ins.event(MainEvent.EventMainUpdateView);
    }
    public getStatus(f_id: number): stFuncGuide {
        let find = this.dataList.find(item => item.id == f_id);
        if (find) {
            return find;
        }
        let vo = new stFuncGuide();
        vo.intervalTask = 0;
        vo.id = f_id;
        vo.state = EZhengTuStatus.Not;
        this.dataList.push(vo);
        return vo;
    }
    public get isOpen() {
        let l = this.dataList;
        for (let i = 0; i < l.length; i++) {
            let cell = l[i];
            if (cell.state == EZhengTuStatus.KeLingQu || cell.state == EZhengTuStatus.Not) {
                return true;
            }
        }
        return false;
    }
    /**是否有红点 */
    private get hasRed(){
        let l = this.dataList;
        for (let i = 0; i < l.length; i++) {
            let cell = l[i];
            if (cell.state == EZhengTuStatus.KeLingQu) {
                return true;
            }
        }
    }

    public updateRed(){
        MainModel.Ins.funcSetRed(EFuncDef.ZhengTu,this.hasRed);
    }

}