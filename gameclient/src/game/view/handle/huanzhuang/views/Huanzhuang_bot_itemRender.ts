import { ui } from "../../../../../ui/layaMaxUI";
import { DotManager } from "../../common/DotManager";
import { RedUpdateModel } from "../../main/model/RedUpdateModel";
import { HuanZhuangVo } from "../vos/HuanZhuangVo";
/**换装底部的装备 */
export class Huanzhuang_bot_itemRender extends ui.views.huanzhuang.ui_huanzhuang_bot_itemUI{
    private vo:HuanZhuangVo;
    private tf:Laya.Label;
    constructor(){
        super();
        this.sel.visible = false;
        this.ck.visible = false;
        this.on(Laya.Event.CLICK,this,this.onClickHandler);
    }

    private onClickHandler(){
        // console.log(this.vo);
        if(this.vo){
            RedUpdateModel.Ins.delEquipRed(this.vo.equipType,this.vo.equipStyle);
        }
    }

    public refreshView(index: number) {
        let haveRed = false;
        this.vo = this.dataSource;
        let vo: HuanZhuangVo = this.vo;
        if (/*index > 0 &&*/ vo.locked) {
            this.lockimg.visible = true;
            this.icon.gray = true;
        } else {
            this.lockimg.visible = false;
            this.icon.gray = false;
            haveRed = RedUpdateModel.Ins.getEquipRed(this.vo.equipType,this.vo.equipStyle);
        }

        // if(E.Debug){
        //     if(!this.tf){
        //         this.tf = new Laya.Label();
        //         this.tf.fontSize = 24;
        //     }
        //     this.addChild(this.tf);
        //     this.tf.text = (vo.serverIndex||"") + "," +  vo.equipType +","  + vo.equipStyle;
        // }

        // this.noIcon.visible = vo.getNoIconShow();
        // if (index == 0) {
        // this.icon.skin = `remote/huanzhuang/wu.png`;
        // }else{
        this.icon.skin = vo.getIcon();
        // }
        this.sel.visible = this.vo.selected;
        // LogSys.Log("====>"+this.vo.pos+","+this.vo.selected);
        //#####################################################################
        // let val = HuanZhuangModel.Ins.getEquipStyle(vo.equipType);
        // this.graphics.clear();
        // if (val && val == vo.equipStyle) {
        //     this.graphics.drawRect(0, 0, this.width, this.height, "#ff0000", 1);//幻化的装备
        // }

        // if(haveRed){
        //     DotManager.addDot(this);
        // }else{
        //     DotManager.removeDot(this);
        // }

    }
}