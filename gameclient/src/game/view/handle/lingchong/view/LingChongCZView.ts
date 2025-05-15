import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { SocketMgr } from "../../../../network/SocketMgr";
import { PetRebirth_req, stCellValue, stPet } from "../../../../network/protocols/BaseProto";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { EClientType } from "../../sdk/ClientType";
import { PetListProxy, PetQualityProxy, PetUpGradeProxy, PetUpStarProxy } from "../proxy/LingChongProxy";

export class LingChongCZView extends ViewBase{
    private _ui:ui.views.lingchong.ui_lingchongCZViewUI;
    protected mMask = true;
    protected mMainSnapshot = true;

    protected onAddLoadRes() {}

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.lingchong.ui_lingchongCZViewUI;
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
            let req:PetRebirth_req = new PetRebirth_req;
            req.petSerialNum = this._data.petSerialNum;
            SocketMgr.Ins.SendMessageBin(req);
            this.Close();
        }
    }

    private _data:stPet;
    protected onInit(): void {
        this._data = this.Data;
        let arr = [];
        let m = {};
        this._ui.lab.text = E.getLang("petDec1");
        let cfg = PetListProxy.Ins.getCfgById(this._data.petId);
        let qCfg = PetQualityProxy.Ins.getCfgById(cfg.f_petquality);
        if(this._data.petLevel){
            if(initConfig.clienttype == EClientType.Discount){
                for(let i:number= 0;i<this._data.petLevel;i++){
                    let upcfg = PetUpGradeProxy.Ins.getCfgByQuaAndLv(cfg.f_petquality,i);
                    let id = parseInt(upcfg.f_LevelConsume.split("-")[0]);
                    let val = parseInt(upcfg.f_LevelConsume.split("-")[1]);
                    if(!m[id]){
                        m[id] = new stCellValue();
                        m[id].id = id;
                        m[id].count = 0;
                        arr.push(m[id]);
                    }
                    m[id].count += val;
                }
            }else{
                let id = parseInt(qCfg.f_initicost.split("-")[0]);
                let num = parseInt(qCfg.f_initicost.split("-")[1]);
                let addNum = parseInt(qCfg.f_preupgrade.split("-")[1]);
                let val = num * this._data.petLevel;
                let tmpLevelTimes = 0;
                for (let i = 0; i < this._data.petLevel; i++) {
                    tmpLevelTimes += i;
                }
                let vval = tmpLevelTimes * addNum;
                let cv:stCellValue = new stCellValue;
                cv.id = id;
                cv.count = val + vval;
                arr.push(cv);
            }
        }

        let lv = 0;
        for(let i:number=0;i<this._data.petTalents.length;i++){
            lv += this._data.petTalents[i].talentLevel;
        }
        let addLv = lv - this._data.petTalents.length;
        if(addLv > 0){
            let id1 = parseInt(qCfg.f_bloodupcost.split("-")[0]);
            let num1 = parseInt(qCfg.f_bloodupcost.split("-")[1]);
            let addNum1 = parseInt(qCfg.f_bloodpreupcost.split("-")[1]);
            let val1 = num1 * addLv;
            let tmpLevelTimes1 = 0;
            for (let i = 0; i < addLv; i++) {
                tmpLevelTimes1 += i;
            }
            let vval1 = tmpLevelTimes1 * addNum1;
            let cv1:stCellValue = new stCellValue;
            cv1.id = id1;
            cv1.count = val1 + vval1;
            arr.push(cv1);
        }

        if(this._data.petStar){
            if(initConfig.clienttype == EClientType.Discount){
                for(let i:number= 0;i<this._data.petStar;i++){
                    let starCfg = PetUpStarProxy.Ins.getCfgByQuaAndStar(cfg.f_petquality,i);
                    let id = parseInt(starCfg.f_StarConsume.split("-")[0]);
                    let val = parseInt(starCfg.f_StarConsume.split("-")[1]);
                    if(!m[id]){
                        m[id] = new stCellValue();
                        m[id].id = id;
                        m[id].count = this._data.petStarSurplus;
                        arr.push(m[id]);
                    }
                    m[id].count += val;
                }
            }else{
                let id2 = parseInt(qCfg.f_upstarcost.split("-")[0]);
                let num2 = parseInt(qCfg.f_upstarcost.split("-")[1]);
                let cv2:stCellValue = new stCellValue;
                cv2.id = id2;
                cv2.count = num2 * this._data.petStar;
                arr.push(cv2);
            }
        }
       
        ItemViewFactory.renderItemSlots(this._ui.rewardCon,arr);
    }

    protected onExit(): void {
        
    }
}