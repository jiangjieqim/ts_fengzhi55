import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../../ui/layaMaxUI";
import { E } from "../../../../../G";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { stChief, stChiefSkill } from "../../../../../network/protocols/BaseProto";
import { FuJiangModel } from "../../model/FuJiangModel";
import { FuJiangSkillClientProxy, FuJiangSkillProxy } from "../../proxy/FuJiangProxy";

export class FuJiangSkillCtl{
    protected _ui:ui.views.fujiang.ui_fujiangJNItemUI;

    constructor(skin:ui.views.fujiang.ui_fujiangJNItemUI) {
        this._ui = skin;

        this._ui.on(Laya.Event.DISPLAY,this,this.onAdd);
        this._ui.on(Laya.Event.UNDISPLAY,this,this.onRemove);

        ButtonCtl.Create(this._ui.btn,new Laya.Handler(this,this.onBtnSkillClick),false);
    }

    private onAdd(){
        
    }

    private onRemove(){
        
    }

    private onBtnSkillClick(){
        E.ViewMgr.Open(EViewType.FuJiangSkillTip,null,[this._skillId,this._skillLv,this._skillStar]);
    }

    private _skillId;
    private _skillLv;
    private _skillStar;
    public setData(id:number,index:number,lv:number,star:number){
        this._skillLv = lv;
        this._skillStar = 0;
        let cfg = FuJiangSkillProxy.Ins.getCfgById(id);
        let arr1 = cfg.f_starpoint.split("|");
        let ind;
        for(let i:number=0;i<arr1.length;i++){
            let arr2 = arr1[i].split("-");
            if(star >= parseInt(arr2[0]) && star <= parseInt(arr2[1])){
                ind = i;
                break;
            }
        }

        let arr = cfg["f_clientskill" + index].split("|");
        if(parseInt(arr[ind]) > 0){
            this._skillId = parseInt(arr[ind]);
            this._ui.lab_lv.text = "lv." + lv;
            this._ui.lv_xx.text = "";
            this._ui.btn.gray = false;
        }else{
            let ii;
            for(let i:number=0;i<arr.length;i++){
                if(parseInt(arr[i]) > 0){
                    this._skillId = parseInt(arr[i]);
                    ii = i;
                    break;
                }
            }
            this._ui.lab_lv.text = "";
            this._skillStar = parseInt(arr1[ii].split("-")[0]);
            this._ui.lv_xx.text = this._skillStar + "星";
            this._ui.btn.gray = true;
        }

        let skillCfg = FuJiangSkillClientProxy.Ins.getCfgById(this._skillId);
        this._ui.lab.text = skillCfg.f_skillname;
    }
}