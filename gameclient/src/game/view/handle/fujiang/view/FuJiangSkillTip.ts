import {StringUtil} from "../../../../../frame/util/StringUtil";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { FuJiangSkillClientProxy, FuJiangSkillLvProxy } from "../proxy/FuJiangProxy";

export class FuJiangSkillTip extends ViewBase{
    private _ui:ui.views.fujiang.ui_fujiangJNTipUI;
    protected mMask = true;
    protected mMainSnapshot = true;

    protected onAddLoadRes() {
        this.addAtlas('fujiang.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.fujiang.ui_fujiangJNTipUI;
        }
    }

    private _offY:number = 18;
    protected onInit(): void {
        let skillId = this.Data[0];
        let skillLv = this.Data[1];
        let skillStar = this.Data[2];
        let skillCfg = FuJiangSkillClientProxy.Ins.getCfgById(skillId);
        this._ui.lab_name.text = skillCfg.f_skillname + " lv." + skillLv;
        if (skillStar) {
            this._ui.lab_js.text = "(解锁星级:" + skillStar + "星)";
        } else {
            this._ui.lab_js.text = "";
        }
        let array = [];
        let nArray = [];
        let arr = skillCfg.f_valuenum.split("|");
        let arrJC = skillCfg.f_initvalue.split("|");
        let st = "";
        for (let i: number = 0; i < arr.length; i++) {
            if (arr[i] != "" && arr[i] != "0") {
                let num = parseInt(arrJC[i]);
                let numadd = parseInt(arr[i]);
                st = ( num + numadd * (skillLv - 1)) / 100 + "%"; 
                array.push(st);
                st = ( num + numadd * skillLv) / 100 + "%"; 
                nArray.push(st);
            }
        }
        this._ui.lab_dec.text = StringUtil.format(skillCfg.f_skillintro, array);

        let offY;
        if(skillLv >= FuJiangSkillLvProxy.Ins.maxLv){
            this._ui.lab_next.visible = false;
            this._ui.lab_nextdec.text = "";
            offY = this._ui.lab_dec.y + this._ui.lab_dec.textField.textHeight + this._offY;
        }else{
            this._ui.lab_next.visible = true;
            this._ui.lab_nextdec.text = StringUtil.format(skillCfg.f_skillintro, nArray);
            
            this._ui.lab_next.y = this._ui.lab_dec.y + this._ui.lab_dec.textField.textHeight + this._offY;
            this._ui.lab_nextdec.y = this._ui.lab_next.y + this._ui.lab_next.textField.textHeight + this._offY;

            offY = this._ui.lab_nextdec.y + this._ui.lab_nextdec.textField.textHeight + this._offY;
        }

        if(skillCfg.f_upskillinfo == ""){
            this._ui.lab_jh.visible = false;
            this._ui.lab_jhjs.text = "";
            this._ui.lab_jhdec.text = "";

            this._ui.bg.height = offY;
        }else{
            this._ui.lab_jh.visible = true;
            this._ui.lab_jhjs.text = "(解锁星级:" + skillCfg.f_upskillunlock + "星)";
            this._ui.lab_jhdec.text = skillCfg.f_upskillinfo;

            this._ui.lab_jh.y = offY + this._offY;
            this._ui.lab_jhjs.y = offY + this._offY + 5;
            this._ui.lab_jhdec.y = this._ui.lab_jh.y + this._ui.lab_jh.textField.textHeight + this._offY;
            this._ui.bg.height = this._ui.lab_jhdec.y + this._ui.lab_jhdec.textField.textHeight + this._offY;
        }
    }

    protected onExit(): void {
        
    }
}