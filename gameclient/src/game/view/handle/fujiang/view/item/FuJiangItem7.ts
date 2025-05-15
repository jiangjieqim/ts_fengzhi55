import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../../ui/layaMaxUI";
import { CheifSkillUp_req, stChief } from "../../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../../network/SocketMgr";
import { MainModel } from "../../../main/model/MainModel";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";
import { FuJiangSkillClientProxy, FuJiangSkillLvProxy, FuJiangSkillProxy } from "../../proxy/FuJiangProxy";
import { FuJiangSkillCtl } from "../ctl/FuJiangSkillCtl";

export class FuJiangItem7 extends ui.views.fujiang.ui_fujiangItem7UI{
    private _ctl:FuJiangSkillCtl;

    constructor() {
        super();
        ButtonCtl.Create(this.btn,new Laya.Handler(this,this.onBtnClick));
        this._ctl = new FuJiangSkillCtl(this.btn_skill);
    }

    private onBtnClick(){
        if(!this._data)return;
        let lvCfg = FuJiangSkillLvProxy.Ins.getCfgByLv(this._skillLv);
        if(!MainModel.Ins.isItemEnoughStArr(lvCfg.f_upgradeskillcost,true)){
            return;
        }
        let req:CheifSkillUp_req = new CheifSkillUp_req;
        req.cheifId = this._data.cheifId;
        req.skillPos = this._index;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private _index;
    private _skillLv:number;
    private _data:stChief;
    public setData(index:number,data:stChief,skillId:number){
        if(!data)return;
        this._data = data;
        this._index = index;
        let cfg = data.skills.find(ele => ele.skillPos == index);
        this._skillLv = 1;
        if(cfg){
            this._skillLv = cfg.skillLevel;
        }
        this._ctl.setData(data.cheifId,index,this._skillLv,data.star);
        if(cfg){
            this.lab_lv.text = "当前等级: lv" + this._skillLv;
            this.bg1.gray = false;
            this.lab_s.visible = this.sp_suo.visible = false;
            let skillCfg = FuJiangSkillClientProxy.Ins.getCfgById(skillId);
            let array = [];
            let arr = skillCfg.f_valuenum.split("|");
            for (let i: number = 0; i < arr.length; i++) {
                if (arr[i] != "" && arr[i] != "0") {
                    array.push(parseInt(arr[i]) * cfg.skillLevel);
                }
            }
            if(cfg.skillLevel >= FuJiangSkillLvProxy.Ins.maxLv){
                this.lab_max.visible = true;
                this.sp.visible = false;
            }else{
                this.lab_max.visible = false;
                this.sp.visible = true;
                let lvCfg = FuJiangSkillLvProxy.Ins.getCfgByLv(cfg.skillLevel);
                let arr = lvCfg.f_upgradeskillcost.split("|");
                let id = parseInt(arr[0].split("-")[0]);
                let val = parseInt(arr[0].split("-")[1]);
                let val1 = MainModel.Ins.mRoleData.getVal(id);
                this.img2.skin = IconUtils.getIconByCfgId(id);
                this.lab_num2.text = val + "";
                if(val1 < val){
                    this.lab_num2.color = "#D02525";
                }else{
                    this.lab_num2.color = "#FFEEC2";
                }
                if(arr.length == 1){
                    this.bg.width = 140;
                    this.img1.skin = "";
                    this.lab_num1.text = "";
                }else if(arr.length == 2){
                    this.bg.width = 280;
                    id = parseInt(arr[1].split("-")[0]);
                    val = parseInt(arr[1].split("-")[1]);
                    val1 = MainModel.Ins.mRoleData.getVal(id);
                    this.img1.skin = IconUtils.getIconByCfgId(id);
                    this.lab_num1.text = val + "";
                    if (val1 < val) {
                        this.lab_num1.color = "#D02525";
                    } else {
                        this.lab_num1.color = "#FFEEC2";
                    }
                }
            }
        }else{
            this.lab_lv.text = "";
            this.bg1.gray = this.lab_s.gray = true;
            this.lab_s.visible = this.sp_suo.visible = true;
            this.lab_max.visible = false;
            this.sp.visible = false;
            let ii;
            let scfg = FuJiangSkillProxy.Ins.getCfgById(data.cheifId);
            let arr = scfg["f_clientskill" + index].split("|");
            for(let i:number=0;i<arr.length;i++){
                if(parseInt(arr[i]) > 0){
                    ii = i;
                    break;
                }
            }
            let arr1 = scfg.f_starpoint.split("|");
            this.lab_s.text = "副将升星至" + parseInt(arr1[ii].split("-")[0]) + "星解锁技能";
        }
        
    }
}