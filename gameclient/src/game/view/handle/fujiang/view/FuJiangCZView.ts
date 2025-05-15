import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import {SocketMgr} from "../../../../network/SocketMgr";
import { CheifReturn_req, stCellValue, stChief } from "../../../../network/protocols/BaseProto";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { FuJiangEquipAttrProxy, FuJiangLvProxy, FuJiangSkillLvProxy } from "../proxy/FuJiangProxy";

export class FuJiangCZView extends ViewBase{
    private _ui:ui.views.fujiang.ui_fujiangCZViewUI;
    protected mMask = true;
    protected mMainSnapshot = true;

    protected onAddLoadRes() {}

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.fujiang.ui_fujiangCZViewUI;
            this.bindClose(this._ui.btn_close);

            ButtonCtl.Create(this._ui.btn_qx,new Laya.Handler(this,this.onBtnQXClick));
            ButtonCtl.Create(this._ui.btn_qd,new Laya.Handler(this,this.onBtnQDClick));
        }
    }

    private onBtnQXClick(){
        this.Close();
    }

    private onBtnQDClick(){
        if(this._data){
            let req:CheifReturn_req = new CheifReturn_req;
            req.cheifId = this._data.cheifId;
            req.type = this._type;
            SocketMgr.Ins.SendMessageBin(req);
            this.Close();
        }
    }

    private _data:stChief;
    private _type:number;
    protected onInit(): void {
        this._data = this.Data[0];
        this._type = this.Data[1];
        let arr = [];
        let m = {};
        if(this._type == 0){
            this._ui.lab.text = "返还全部养成资源，副将等级重置为1级";
            for(let i:number= 1;i<this._data.level;i++){
                let cfg = FuJiangLvProxy.Ins.getCfgByLv(i);
                let id = parseInt(cfg.f_upgradecost.split("-")[0]);
                let val = parseInt(cfg.f_upgradecost.split("-")[1]);
                if(!m[id]){
                    m[id] = new stCellValue();
                    m[id].id = id;
                    m[id].count = 0;
                    arr.push(m[id]);
                }
                m[id].count += val;
            }
        }else if(this._type == 1){
            this._ui.lab.text = "返还全部养成资源，副将全部装备重置为1级";
            for(let i:number=0;i<this._data.equips.length;i++){
                let aCfg = FuJiangEquipAttrProxy.Ins.getCfgByStarAndLv(this._data.equips[i].equipStar,this._data.equips[i].equipLevel);
                let len = aCfg.f_id;
                for(let j:number = 1;j<len;j++){
                    let ccfg = FuJiangEquipAttrProxy.Ins.getCfgByID(j);
                    // let cfg = ccfg["f_position" + this._data.equips[i].partId];
                    let array = ccfg.f_upgradecost.split("-");
                    let id = parseInt(array[0]);
                    let val = parseInt(array[1]);
                    if(!m[id]){
                        m[id] = new stCellValue();
                        m[id].id = id;
                        m[id].count = 0;
                        arr.push(m[id]);
                    }
                    m[id].count += val;
                }
            }
        }else if(this._type == 2){
            this._ui.lab.text = "返还全部养成资源，副将技能等级重置为1级";
            for(let i:number=0;i<this._data.skills.length;i++){
                let len = this._data.skills[i].skillLevel;
                for(let j:number = 1;j<len;j++){
                    let lvCfg = FuJiangSkillLvProxy.Ins.getCfgByLv(j);
                    let skillArr = lvCfg.f_upgradeskillcost.split("|");
                    for(let n:number=0;n<skillArr.length;n++){
                        let array = skillArr[n].split("-");
                        let id = parseInt(array[0]);
                        let val = parseInt(array[1]);
                        if(!m[id]){
                            m[id] = new stCellValue();
                            m[id].id = id;
                            m[id].count = 0;
                            arr.push(m[id]);
                        }
                        m[id].count += val;
                    }
                }
            }
        }

        ItemViewFactory.renderItemSlots(this._ui.rewardCon,arr);
    }

    protected onExit(): void {
        
    }
}