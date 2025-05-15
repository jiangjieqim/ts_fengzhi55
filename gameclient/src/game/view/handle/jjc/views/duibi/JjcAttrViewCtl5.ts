import { ui } from "../../../../../../ui/layaMaxUI";
import { stEquipAttr, WatchPlayerInfo_revc } from "../../../../../network/protocols/BaseProto";
import { EquipmentQualityProxy } from "../../../main/model/EquipmentProxy";
import { MainModel } from "../../../main/model/MainModel";
import { f_setStar } from "../../../main/views/ZuoQiSlotCtl";
import { attrConvert } from "../../../main/vos/MainRoleVo";
import { PlayerVoFactory } from "../../../main/vos/PlayerVoFactory";
import { QualityUtils } from "../../../main/vos/QualityUtils";
import { ZuoQiAttrCtl } from "../../../zuoqi/views/ZuoQiAttrCtl";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";
import { Mount_ListProxy, Mount_ValueProxy, RideAttr } from "../../../zuoqi/vos/ZuoqiProxy";
import { ZuoQiModel } from "../../../zuoqi/ZuoqiModel";

export class JjcAttrViewCtl5{
    protected skin:ui.views.jjcAttr.ui_jjc_attrView5UI;
    private value:WatchPlayerInfo_revc;
    private defaultColor:string = "#F9F0BB";
    constructor(skin:ui.views.jjcAttr.ui_jjc_attrView5UI) {
        this.skin = skin;

        this.skin.list1.itemRender = ui.views.jjcAttr.ui_jjc_attrItem1UI;
        this.skin.list1.renderHandler = new Laya.Handler(this,this.onAttrItemHandler);
        this.skin.list3.itemRender = ui.views.jjcAttr.ui_jjc_attrItem1UI;
        this.skin.list3.renderHandler = new Laya.Handler(this,this.onSelfMountAttr);

        this.skin.list4.itemRender = ui.views.jjcAttr.ui_jjc_attrItem1UI;
        this.skin.list4.renderHandler = new Laya.Handler(this,this.onAttrItemHandler1);
        this.skin.list6.itemRender = ui.views.jjcAttr.ui_jjc_attrItem1UI;
        this.skin.list6.renderHandler = new Laya.Handler(this,this.onOtherMountAttr);

        this.skin.list2.itemRender = ui.views.jjcAttr.ui_jjc_attrItem1UI;
        this.skin.list2.renderHandler = new Laya.Handler(this,this.onAttrItemHandler2);
        this.skin.list5.itemRender = ui.views.jjcAttr.ui_jjc_attrItem1UI;
        this.skin.list5.renderHandler = new Laya.Handler(this,this.onAttrItemHandler2);
    }
    /**他人坐骑 */
    private onOtherMountAttr(item:ui.views.jjcAttr.ui_jjc_attrItem1UI){
        this.refreshAttr(item);
        item.upimg.visible = false;
        let id = parseInt(item.dataSource.id);
        let value = this.value;
        if(value.ride && value.ride.length > 0 && value.ride[0].attr && value.ride[0].attr.length > 0){
            let equipVo = value.ride[0].attr[0];
            let qua = ZuoQiModel.Ins.getAttrQua(equipVo,id);
            this.updataCellView(item,qua);
        }
    }
    /**个人坐骑 */
    private onSelfMountAttr(item:ui.views.jjcAttr.ui_jjc_attrItem1UI){
        this.refreshAttr(item);
        item.upimg.visible = false;
        let id = parseInt(item.dataSource.id);
        let qua = ZuoQiModel.Ins.rideVo.getAttrQua(id);
        this.updataCellView(item,qua);
    }
    private updataCellView(item:ui.views.jjcAttr.ui_jjc_attrItem1UI,qua:number){
        let mColor = EquipmentQualityProxy.Ins.getByQuaDefault(this.defaultColor, qua);
        item.tf1.color = item.valTf.color = mColor;
    }
    private refreshAttr(item:ui.views.jjcAttr.ui_jjc_attrItem1UI){
        let id = parseInt(item.dataSource.id);
        let val = parseInt(item.dataSource.value);
        item.tf1.text = MainModel.Ins.getAttrNameIdByID(id) + ":";
        item.valTf.text = attrConvert(id,val);

        let val1 = PlayerVoFactory.getEquipVal(this._list,id);
        if(val > val1){
            item.upimg.skin = `remote/common/base/green.png`;
        }else if(val < val1){
            item.upimg.skin = `remote/common/base/red.png`;
        }else{
            item.upimg.skin = "";
        }
        item.tf1.color = item.valTf.color = this.defaultColor;
    }

    private onAttrItemHandler(item:ui.views.jjcAttr.ui_jjc_attrItem1UI){
        this.refreshAttr(item);
    }

    private onAttrItemHandler1(item:ui.views.jjcAttr.ui_jjc_attrItem1UI){
        let id = parseInt(item.dataSource.id);
        let val = parseInt(item.dataSource.value);
        item.tf1.text = MainModel.Ins.getAttrNameIdByID(id) + ":";
        item.valTf.text = attrConvert(id,val);
        item.upimg.visible = false;
    }

    private onAttrItemHandler2(item:ui.views.jjcAttr.ui_jjc_attrItem1UI){
        let attrVo:RideAttr = item.dataSource;

        let id = attrVo.id;
        let val = attrVo.value;
        item.tf1.text = MainModel.Ins.getAttrNameIdByID(id) + ":";
        item.valTf.text = attrConvert(id,val);
        item.upimg.visible = false;

        // item.tf1.color = "#CF47CA";
        // item.valTf.color = "#CF47CA";
        item.tf1.color = item.valTf.color = ZuoQiAttrCtl.getColor(attrVo.f_UnlockVal);
    }

    private _list;
    public setData(value:WatchPlayerInfo_revc){
        this.value = value;
        this.skin.slot2.sel.visible = this.skin.slot2.ck.visible = this.skin.slot2.typename.visible = false;
        if(value.ride.length && value.ride[0].baseInfo){
            this.skin.slot2.visible = true;
            this.skin.slot2.icon.skin = IconUtils.getHorseIcon(value.ride[0].baseInfo.id);
            this.skin.slot2.tf1.text = IconUtils.str2Lv(value.ride[0].baseInfo.lv);
            let cfg = Mount_ListProxy.Ins.getCfg(value.ride[0].baseInfo.id);
            this.skin.slot2.qua.skin = IconUtils.getQuaIcon(cfg.f_Quality);
            f_setStar(this.skin.slot2,value.ride[0].baseInfo.star);

            let ecfg: Configs.t_EquipmentQuality_dat = EquipmentQualityProxy.Ins.GetDataById(cfg.f_Quality);
            let color = QualityUtils.getQuaColor(cfg.f_Quality);
            this.skin.nameTf1.text = cfg.f_MountName;
            this.skin.quaTf1.text = ecfg.f_EquipmentLevel;
            this.skin.nameTf1.color = color;
            this.skin.quaTf1.color = color;

            let attr: stEquipAttr[] = value.ride[0].attr[0].attrList||[];
            this._list = this.getBase(attr);
            this.skin.list4.array = this._list;
            this.skin.list6.array = this.getOther(attr);
            //右边属性
            let _rideVo = value.ride[0];
            this.skin.list5.array = Mount_ListProxy.Ins.getRideSpeclAttr(_rideVo.baseInfo.id, _rideVo.baseInfo.star);
            // value.ride[0].attr[0].attrList1;
        }else{
            this.skin.slot2.visible = false;
            this.skin.nameTf1.text = "";
            this.skin.quaTf1.text = "";
            this.skin.list4.array = [];
            this.skin.list5.array = [];
            this.skin.list6.array = [];
        }

        this.skin.slot1.sel.visible = this.skin.slot1.ck.visible = this.skin.slot1.typename.visible = false;
        if(ZuoQiModel.Ins.rideVo && ZuoQiModel.Ins.rideVo.equipVo){
            this.skin.slot1.visible = true;
            this.skin.slot1.icon.skin = IconUtils.getHorseIcon(ZuoQiModel.Ins.rideVo.rideId);
            this.skin.slot1.tf1.text = IconUtils.str2Lv(ZuoQiModel.Ins.rideVo.lv);
            this.skin.slot1.qua.skin = IconUtils.getQuaIcon(ZuoQiModel.Ins.rideVo.quality);
            let zuoqiVo = ZuoQiModel.Ins.rideVo;

            f_setStar(this.skin.slot1,zuoqiVo.starLv);

            let cfg = Mount_ListProxy.Ins.getCfg(ZuoQiModel.Ins.rideVo.rideId);
            let ecfg: Configs.t_EquipmentQuality_dat = EquipmentQualityProxy.Ins.GetDataById(cfg.f_Quality);
            let color = QualityUtils.getQuaColor(cfg.f_Quality);
            this.skin.nameTf.text = cfg.f_MountName;
            this.skin.quaTf.text = ecfg.f_EquipmentLevel;
            this.skin.nameTf.color = color;
            this.skin.quaTf.color = color;

            let attr: stEquipAttr[] = ZuoQiModel.Ins.rideVo.equipVo.attrList||[];
            this.skin.list1.array = this.getBase(attr);
            this.skin.list3.array = this.getOther(attr);
            //左边属性
            this.skin.list2.array = Mount_ListProxy.Ins.getRideSpeclAttr(zuoqiVo.rideId,zuoqiVo.starLv);
            //ZuoQiModel.Ins.rideVo.equipVo.attrList1;
        }else{
            this.skin.slot1.visible = false;
            this.skin.nameTf.text = "";
            this.skin.quaTf.text = "";
            this.skin.list1.array = [];
            this.skin.list2.array = [];
            this.skin.list3.array = [];
        }
    }

    private getBase(l:stEquipAttr[]){
        let rs = [];
        let baseAttrList:number[] = Mount_ValueProxy.Ins.getAttrList();
        for(let i = 0;i < l.length;i++){
            if(baseAttrList.indexOf(l[i].id)!=-1){
                rs.push(l[i]);
            }
        }
        return rs;
    }

    private getOther(l:stEquipAttr[]){
        let rs = [];
        let baseAttrList:number[] = Mount_ValueProxy.Ins.getAttrList();
        for(let i = 0;i < l.length;i++){
            if(baseAttrList.indexOf(l[i].id)==-1){
                rs.push(l[i]);
            }
        }
        return rs;
    }
}