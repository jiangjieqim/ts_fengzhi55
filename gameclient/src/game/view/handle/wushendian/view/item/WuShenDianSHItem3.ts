import { ui } from "../../../../../../ui/layaMaxUI";
import {SocketMgr} from "../../../../../network/SocketMgr";
import { PalaceUnlockBuff_req, stPalaceBuff } from "../../../../../network/protocols/BaseProto";
import { MainModel } from "../../../main/model/MainModel";
import { attrConvert } from "../../../main/vos/MainRoleVo";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";
import { WuShenDianModel } from "../../model/WuShenDianModel";
import { WuShenDianConfigProxy, WuShenDianDataTypeProxy } from "../../proxy/WuShenDianProxy";

export class WuShenDianSHItem3 extends ui.views.wushendian.ui_wushendianSHItem3UI{
    constructor() {
        super();
        this.icon.on(Laya.Event.CLICK,this,this.onIconClick);
        this.img_suo.on(Laya.Event.CLICK,this,this.onImgClick);
    }

    private onIconClick(e:Laya.Event){
        e.stopPropagation();
        if(this._data){
            let cfg = WuShenDianDataTypeProxy.Ins.GetDataById(this._data.buffId);
            let id = cfg.f_AttributeID;
            let val = this._data.val;
            let st = MainModel.Ins.getAttrNameIdByID(id) + ": +";
            st += attrConvert(id, val);
            MainModel.Ins.showSmallTips("", st, e.target);
        }
    }

    private onImgClick(){
        let len = parseInt(WuShenDianConfigProxy.Ins.GetDataById(1).f_BuffMinMax.split("|")[0]);
        let num = WuShenDianModel.Ins.buffList.length - len;
        let st = WuShenDianConfigProxy.Ins.GetDataById(1).f_LatticeInit;
        let id = parseInt(st.split("-")[0]);
        let count = parseInt(st.split("-")[1]);
        let cou = count;
        for(let i:number = 0; i < num;i++){
            cou = cou * 2; 
        }
        MainModel.Ins.queryMsg("解锁神魂格吗",id,cou,0,new Laya.Handler(this,this.onClickHandler));
    }

    private onClickHandler(){
        let req:PalaceUnlockBuff_req = new PalaceUnlockBuff_req;
        req.type = 0;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private _data:stPalaceBuff;
    public setData(value:any){
        if(!value)return;
        if(value.suo == 1){
            this.img_suo.visible = true;
            this.sp.visible = false;
            this._data = null;
        }else{
            this.img_suo.visible = false;
            this.sp.visible = true;

            this._data = value.data;
            if(this._data.buffId){
                let cfg = WuShenDianDataTypeProxy.Ins.GetDataById(this._data.buffId);
                this.img_qua.skin = IconUtils.getQuaIcon(cfg.f_ColorID);
                this.icon.skin = "o/Palace/" + cfg.f_Icon + ".png";
            }else{
                this.img_qua.skin = "";
                this.icon.skin = "";
            }

            for(let i:number = 1;i < 9; i++){
                if(this._data.times >= i){
                    this["sp" + i].visible = true;
                }else{
                    this["sp" + i].visible = false;
                }
            }
        }
    }
}