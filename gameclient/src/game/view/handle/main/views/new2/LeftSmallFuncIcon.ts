import { DrawCallButtonCtl } from "../../../../../../frame/view/DrawCallButtonCtl";
import { E } from "../../../../../G";
import { EFuncDef } from "../../model/EFuncDef";
import { MainModel } from "../../model/MainModel";
import { TaskModel } from "../../model/TaskModel";
import { FuncProxy } from "../../proxy/FuncProxy";
/**设置按钮 */ 
export class SettingBtn extends DrawCallButtonCtl {
    protected redImg:Laya.Image;
    funcid:EFuncDef;
    // public funcid:EFuncDef;
    constructor(skin:ILiebiaoSubSkin,url:string="",text:string="",click:Laya.Handler=null) {
        // this._ui.btn_yxq.redimg
        // skin: Laya.Image, redImg: Laya.Image
        super(skin, click);
        skin.bg.skin = url;//"remote/main/main/sz.png";
        skin.tf.text = text//"设置";
        // this.clickHandler = new Laya.Handler(this,this.onClick);
        this.redImg = skin.redimg;

        skin.on(Laya.Event.DISPLAY, this, this.onDisplay);
        skin.on(Laya.Event.UNDISPLAY, this, this.onUnDisplay);
    }

    protected onDisplay() {
    }
    protected onUnDisplay() {
    }

    set redFlag(v:boolean){
        this.redImg.visible = v;
    }
    get isOpen(){
        if(this.funcid){
            return MainModel.Ins.isOpenAllByFuncid(this.funcid+"");
        }
        return true;
    }
}
export interface ILiebiaoSubSkin extends Laya.Sprite {
    bg: Laya.Image;
    redimg: Laya.Image;
    tf: Laya.Label;
}
/**基础按钮 */
export class LeftSmallFuncIcon extends SettingBtn{
    protected funcID:EFuncDef;
    private cfg:Configs.t_Func_dat;
    constructor(skin:ILiebiaoSubSkin,funcID:EFuncDef){
        super(skin);
        this.funcID = funcID;
        this.cfg = FuncProxy.Ins.getCfgByFuncId(this.funcID);
        skin.bg.skin = `remote/main/main/${this.cfg.f_sub_icon}`;
        skin.tf.text = this.cfg.f_name;
        skin.redimg.visible = false;
        this.clickHandler = new Laya.Handler(this,this.onClick);
    }
    private onClick(){
        E.ViewMgr.OpenByFuncid(this.funcID);
    }

    get isOpen(){
        return TaskModel.Ins.isFuncOpen(this.funcID);
    }
}