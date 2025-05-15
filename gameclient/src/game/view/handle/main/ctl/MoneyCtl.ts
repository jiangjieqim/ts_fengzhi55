import {StringUtil} from "../../../../../frame/util/StringUtil";
import { MainEvent } from "../model/MainEvent";
import { MainModel } from "../model/MainModel";
import { ECellType } from "../vos/ECellType";

export class MoneyCtl{
    private tf:Laya.Label;
    private _itemId:ECellType;
    constructor(tf:Laya.Label,itemId:ECellType){
        this.tf = tf;
        this._itemId = itemId;
    }
    public init(){
        MainModel.Ins.on(MainEvent.ValChange,this,this.onUpdateView);
        this.onUpdateView();
    }

    private onUpdateView(){
        let val = MainModel.Ins.mRoleData.getVal(this._itemId)
        this.tf.text = StringUtil.val2m(val);
    }

    public exit(){
        MainModel.Ins.off(MainEvent.ValChange,this,this.onUpdateView);
    }
}

// export class MoneyCtlV2{
//     private tf:Laya.Label;
//     constructor(tf:Laya.Label){
//         this.tf = tf;
//         this.tf.on(Laya.Event.DISPLAY,this,this.onDisplay);
//         this.tf.on(Laya.Event.UNDISPLAY,this,this.onUnDisplay);
//         this.onUpdateView();
//     }
//     private onDisplay(){
//         MainModel.Ins.on(MainEvent.ValChange,this,this.onUpdateView);
//     }
//     private onUnDisplay(){
//         this.exit();
//     }
//     private onUpdateView(){
//         this.tf.text = StringUtil.val2m(MainModel.Ins.mRoleData.gold);
//     }

//     private exit(){
//         MainModel.Ins.off(MainEvent.ValChange,this,this.onUpdateView);
//     }
// }