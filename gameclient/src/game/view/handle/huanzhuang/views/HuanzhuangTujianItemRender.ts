import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { suitEquip_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { DotManager } from "../../common/DotManager";
import { MainModel } from "../../main/model/MainModel";
import { EEquipType } from "../../main/vos/ECellType";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { HuanZhuangModel } from "../HuanZhuangModel";
import { HuanZhuangEvent } from "../vos/HuanZhuangEvent";
import { HuanZhuangVo } from "../vos/HuanZhuangVo";
export class HuanzhuangItemShowVo{
    type:number;
    val:number;
}

class HuanZhuanTuJianIcon {
    private skin: ui.views.huanzhuang.ui_huanzhuang_bot_itemUI;
    public locked:boolean = false;
    constructor(skin: ui.views.huanzhuang.ui_huanzhuang_bot_itemUI) {
        this.skin = skin;
        this.skin.sel.visible = false;
        this.skin.lockimg.visible = false;
        this.skin.ck.visible = false;
    }

    public setData(type: EEquipType, equipStyle: number) {
        let str = `${type}_${equipStyle}`;
        let s = "";
        if (equipStyle == 0) {
            this.skin.icon.skin = "";
        } else {
            if (type == EEquipType.ZuoQi) {
                s = IconUtils.getHorseIcon(equipStyle);
            } else {
                s = `o/item/${str}.png`;
            }
        }
        this.skin.icon.skin = s;

        let unlockList = HuanZhuangModel.Ins.unlockList;
        let findItem:HuanZhuangVo = unlockList.find(item=>item.equipType == type && item.equipStyle == equipStyle);
        if(!findItem){
            this.skin.lockimg.visible = true;
            this.skin.icon.gray = true;
            this.locked = true;
        }else{
            this.skin.lockimg.visible = false;
            this.skin.icon.gray = false;
            this.locked = false;
        }
    }

    public set visible(v:boolean){
        this.skin.visible = v;
    }
}


export class HuanzhuangTujianItemRender extends ui.views.huanzhuang.ui_huangzhuangtujian_itemUI {
    private cfg: Configs.t_Custom_Costumes_dat;
    private _ctlList: HuanZhuanTuJianIcon[] = [];
    private btnCtl:ButtonCtl;
    constructor() {
        super();
        for (let i = 0; i < 6; i++) {
            this._ctlList.push(new HuanZhuanTuJianIcon(this['item' + i]));
        }
        this.btnCtl=ButtonCtl.CreateBtn(this.jihuoBtn, this, this.onJiHuoHandler);
        //DotManager.addDot(this.btnCtl.skin);
        this.on(Laya.Event.DISPLAY,this,this.onDisplay);
        this.on(Laya.Event.UNDISPLAY,this,this.onUnDisplay);
    }
    private onDisplay(){
        HuanZhuangModel.Ins.on(HuanZhuangEvent.SuitUpdate,this,this.onSuitUpdate);

    }
    private onUnDisplay(){
        HuanZhuangModel.Ins.off(HuanZhuangEvent.SuitUpdate,this,this.onSuitUpdate);
    }
    /**激活 */
    private onJiHuoHandler() {
        let req:suitEquip_req = new suitEquip_req();
        req.id = this.cfg.f_Costumesid;
        SocketMgr.Ins.SendMessageBin(req);
    }
    private onSuitUpdate(){
        if(this.cfg){
            this.refreshView();
        }
    }

    private set enableTex(v:boolean){
        if(v){
            this.lefttf1.color = "#54EDFF";
            this.lefttf1.strokeColor = "#2B8AC7";
        }else{
            this.lefttf1.color = "#FBFAF8";
            this.lefttf1.strokeColor = "#90501F";
        }
    }

    public refreshView() {
        this.cfg = this.dataSource;
        if(this.cfg == null) {
            return;
        }
        let typeList:EEquipType[] = [EEquipType.Casque,EEquipType.Barde,EEquipType.Weapon,EEquipType.Shield,EEquipType.ZuoQi,EEquipType.Wing];
        let l = [];
        for(let i = 0;i < typeList.length;i++){
            let type = typeList[i];
            let val = this.cfg["f_" + type];
            if (val) {
                let vo = new HuanzhuangItemShowVo();
                vo.type = type;
                vo.val = parseInt(val);
                l.push(vo);
            }
        }
        let lockedNum = 0;
        let allItemNum = 0;
        for(let i = 0;i < this._ctlList.length;i++){
            let ctl:HuanZhuanTuJianIcon = this._ctlList[i];
            let vo:HuanzhuangItemShowVo = l[i];
            // let _type:EEquipType = typeList[i];
            // ctl.setData(_type,this.cfg["f_"+_type]);            
            if(vo){
                ctl.setData(vo.type,vo.val);
                ctl.visible = true;
                allItemNum++;
                if(ctl.locked){
                    lockedNum++;
                }
            }else{
                ctl.visible = false;
            }
        }

        this.righttf1.text = "";
        this.btnCtl.visible = false;
        if(HuanZhuangModel.Ins.isSuitUnLock(this.cfg.f_Costumesid)){
            // this.btnCtl.grayMouseDisable = true;
            // this.tf1.text = "已激活";
            
            this.righttf1.text = "已激活";

            // this.lefttf1.color = "#54EDFF";
            // this.lefttf1.strokeColor = "#2B8AC7";
            this.enableTex = true;
        }else{
            if(allItemNum - lockedNum < allItemNum){
                // this.btnCtl.grayMouseDisable = true;
                // this.tf1.text = "未激活";
                this.enableTex = false;
                this.righttf1.text = "未激活";
            }else{
                //等待激活
                this.btnCtl.visible = true;
                this.btnCtl.grayMouseDisable = false;
                this.tf1.text = "激活";
                this.enableTex = false;
            }
        }
        this.titleTf.text = this.cfg.f_Name + "(" + (allItemNum - lockedNum) + "/" + allItemNum + ")";

        this.lefttf1.text = this.attrStr;
    }

    private get attrStr() {
        let str = this.cfg.f_SuitID;
        if (StringUtil.IsNullOrEmpty(str)) {
            return ""
        }
        let arr = str.split("|");
        let out: string = "";
        for (let i = 0; i < arr.length; i++) {
            let a = arr[i].split(":");
            let id: number = parseInt(a[0]);
            let v: number = parseInt(a[1]);
            let val = attrConvert(id, v);
            out += `${MainModel.Ins.getAttrNameIdByID(id)} ${val}  `;
        }
        return out;
    }
}