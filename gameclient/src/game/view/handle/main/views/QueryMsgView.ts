import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { CheckBoxCtl, ICheckBoxSkin } from "../../../../../frame/view/CheckBoxCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { EGameColor } from "../model/EGameColor";
import { MainModel } from "../model/MainModel";
import { EQuickMsg, QuickMsgVo } from "../model/QuickMsgVo";
export interface IQueryMsgData{
    /**货币值 */
    money:number;
    /**货币id */
    moneyCfgId:number;

    /**描述 */
    desc:string;

    /**是否选择中 */
    selected:boolean;

    /**选择回调 */
    callBack:Laya.Handler;

    type:EQuickMsg;
    chanelLab:string;
    okLab:string;
    moneyArr?: {
        /**货币值 */
        money:number;
        /**货币id */
        moneyCfgId:number;
    }[];
}

/**询问对话框 */
export class QueryMsgView extends ViewBase{

    private _ui:ui.views.common.ui_query_msgUI;
    private _checkBoxCtl:CheckBoxCtl;
    private _data:IQueryMsgData;
    protected mMask:boolean = true;
    /**添加加载资源 */
    protected  onAddLoadRes(): void{

    }
    /**离开处理 */
    protected  onExit(): void{
        this.onRefreshSel();
    }
    /**这里在加载完资源后调用-建议只处理资源相关的逻辑*/
    protected  onFirstInit(): void{
        if(!this.UI){
            this.UI = this._ui = new ui.views.common.ui_query_msgUI();
            this.bindClose(this._ui.close1);
            ButtonCtl.Create(this._ui.cancelBtn,new Laya.Handler(this,this.onCancelHandler));
            ButtonCtl.Create(this._ui.okBtn,new Laya.Handler(this,this.onOkHandler))
            this._checkBoxCtl = new CheckBoxCtl({bg:this._ui.ckbg,gou:this._ui.gou} as ICheckBoxSkin);
        }
    }

    private onOkHandler() {
        // console.log(this._checkBoxCtl.selected);
        if(this._data.callBack){
            this._data.callBack.runWith(this._checkBoxCtl.selected);
            this._data.callBack = null;
        }
        this.Close();
    }

    private onRefreshSel(){
        let cell = MainModel.Ins.quickMsgList.find(item=>item.type == this._data.type);
        if(cell){
            cell.selected = this._checkBoxCtl.selected;
        }else{
            let _vcell = new QuickMsgVo();
            _vcell.type = this._data.type;
            _vcell.selected = this._checkBoxCtl.selected;
            MainModel.Ins.quickMsgList.push(_vcell);
        }
    }

    private onCancelHandler() {
        this.Close();
    }

    /**初始化*/
    protected  onInit(): void{
        // this._ui.tf2.text = Math.random() > 0.5 ? "dashdjkashdkashdjk":"0";
        // this._ui.yuanbao.x= this._ui.tf2.x + this._ui.tf2.displayWidth;
        // this._ui.tf3.x = this._ui.yuanbao.x + this._ui.yuanbao.width;

        // this.layerOut([this._ui.tf1,this._ui.tf2,this._ui.yuanbao,this._ui.tf3]);

        let _data:IQueryMsgData = this.Data as IQueryMsgData;
        this._data = _data;
        this._checkBoxCtl.selected = _data.selected;
        this._ui.tf4.text = _data.chanelLab;
        this._ui.tf5.text = _data.okLab;
        if(_data.type == EQuickMsg.NULL){
            this._ui.ckbg.visible = this._ui.tf.visible = false;
        }else{
            this._ui.ckbg.visible = this._ui.tf.visible = true;
        }
        this._ui.yuanbao22.visible = false;
        this._ui.tf22.visible = false;
        if (_data.moneyArr && _data.moneyArr.length){
            this._ui.txtcon.visible = true;
            this._ui.txt.visible = false;
            this._ui.tf3.text = _data.desc || "";
            const arr = [
                { img: this._ui.yuanbao, tf: this._ui.tf2 },
                { img: this._ui.yuanbao22, tf: this._ui.tf22 },
            ];
            for (let i = 0; i <= 1; i++) {
                const img = arr[i].img;
                const tf = arr[i].tf;
                const item = _data.moneyArr[i];
                if (item) {
                    img.visible = true;
                    tf.visible = true;
                } else {
                    img.visible = false;
                    tf.visible = false;
                    continue;
                }
                
                img.skin = IconUtils.getIconByCfgId(item.moneyCfgId);
                
                tf.text = (item.money || 0).toString();
                tf.x = i === 0 ? (this._ui.tf1.x + this._ui.tf1.displayWidth) : (arr[i - 1].img.x + arr[i - 1].img.width * img.scaleX);
                if(MainModel.Ins.mRoleData.getVal(item.moneyCfgId) < item.money){
                    tf.color = EGameColor.NotEnough;
                }else{
                    tf.color = EGameColor.Normal1;
                }
                img.x= tf.x + tf.displayWidth;
            }
            const lastImg = arr[_data.moneyArr.length - 1].img;
            this._ui.tf3.x = lastImg.x + lastImg.width*lastImg.scaleX;
            let w = this._ui.tf3.x + this._ui.tf3.displayWidth;
            this._ui.txtcon.x = (this._ui.width-w)/2;
        }else if(_data.moneyCfgId){
            this._ui.txtcon.visible = true;
            this._ui.txt.visible = false;
            this._ui.yuanbao.skin = IconUtils.getIconByCfgId(_data.moneyCfgId);
            this._ui.tf3.text = _data.desc || "";
            this._ui.tf2.text = (_data.money || 0).toString();
            this._ui.tf2.x = this._ui.tf1.x + this._ui.tf1.displayWidth;
            if(MainModel.Ins.mRoleData.getVal(_data.moneyCfgId) < _data.money){
                this._ui.tf2.color = EGameColor.NotEnough;
            }else{
                this._ui.tf2.color = EGameColor.Normal1;
            }
            this._ui.yuanbao.x= this._ui.tf2.x + this._ui.tf2.displayWidth;
            this._ui.tf3.x = this._ui.yuanbao.x + this._ui.yuanbao.width*this._ui.yuanbao.scaleX;
            let w = this._ui.tf3.x + this._ui.tf3.displayWidth;
            this._ui.txtcon.x = (this._ui.width-w)/2;
        }else{
            this._ui.txtcon.visible = false;
            this._ui.txt.visible = true;
            this._ui.txt.text = _data.desc;
        }
    }

    // private layerOut(_nodelist:Laya.Sprite[]){
    //     let w:number = 0;
    //     for(let i = 0;i < _nodelist.length;i++){
    //         let node = _nodelist[i];
    //         if(node instanceof Laya.Label){
    //             w+=(node as Laya.Label).displayWidth;
    //         }else if(node instanceof Laya.Image){
    //             w+=(node as Laya.Image).width;
    //         }
    //         (node as Laya.Sprite).x=w;
    //     }
    // }

}