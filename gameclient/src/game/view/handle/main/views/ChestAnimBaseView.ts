// import { EViewType } from "../../../../common/defines/EnumDefine";
// import { E } from "../../../../G";
import { BaseAnimSpine } from "../../avatar/BaseAnimSpine";
import { EChestAnimStatus } from "../vos/ECellType";
// import { MainView } from "../MainView";
// import { EChestAnimStatus } from "../vos/ECellType";

export class ChestAnimBaseView {
    public anim:BaseAnimSpine = new BaseAnimSpine(false);
    /**
     * 当前的宝箱的状态
     */
    // public mStatus: EChestAnimStatus = EChestAnimStatus.Close;
    private _mStatus:number;
    public set mStatus(v:EChestAnimStatus){
        // LogSys.Log("set mStatus:" + v);
        // let view:MainView = E.ViewMgr.Get(EViewType.Main) as MainView;
        let view = main.mainView;
        if (v == EChestAnimStatus.Close) {
            if (view) {
                view.UpdateEquipSmallIcon(null);
            }
        } else {
            // let model: MainModel = MainModel.Ins;
            //     let cell: EquipItemVo = model.getNotWear();
            //     if (cell) {
            //         view.UpdateEquipSmallIcon(cell.equipVo);
            //     } else {
            //         view.UpdateEquipSmallIcon(null);
            //     }
        }
        this._mStatus = v;
    }
    public get mStatus():EChestAnimStatus{
        return this._mStatus;
    }
    protected endHandler: Laya.Handler;
    constructor() {
    }

    public Play(_endHandler?: Laya.Handler,qua:number = 1) {

    }

    public get duration():number{
        return 0;
    }

    public get isPlaying() {
        return false;
    }

    protected onAnimEnd() {

    }

    public updateAnim(b:boolean) {

    }

    public Stop() {
    }
}