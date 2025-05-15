import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { WatchPlayerInfo_revc, WatchSkyRank_revc, stEquipAttr } from "../../../../network/protocols/BaseProto";
import { FontClipCtl } from "../../avatar/ctl/FontClipCtl";
import { FontCtlFactory } from "../../avatar/ctl/FontCtlFactory";
import { ChengHaoModel } from "../../chenghao/model/ChengHaoModel";
import { EquipmentQualityProxy } from "../../main/model/EquipmentProxy";
import { MainModel } from "../../main/model/MainModel";
import { f_setStar } from "../../main/views/ZuoQiSlotCtl";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { PlayerVoFactory } from "../../main/vos/PlayerVoFactory";
import { QualityUtils } from "../../main/vos/QualityUtils";
import { ZuoQiModel } from "../../zuoqi/ZuoqiModel";
import { ZuoQiAttrCtl } from "../../zuoqi/views/ZuoQiAttrCtl";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { Mount_ListProxy, Mount_ValueProxy, RideAttr } from "../../zuoqi/vos/ZuoqiProxy";

export class LCZQRankTip1 extends ViewBase{
    private _ui:ui.views.lczqrank.lczqRankTip1UI;
    protected mMask = true; 
    protected mMainSnapshot = true;

    private _plusCtl: FontClipCtl;
    private _plusCtl1: FontClipCtl;

    protected onAddLoadRes() {
        this.addAtlas('jjcAttr.atlas');
    }

    protected onFirstInit(): void {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.lczqrank.lczqRankTip1UI;

            this.bindClose(this._ui.btn_close);
            this._plusCtl = FontCtlFactory.createPlus();
            this._plusCtl1 = FontCtlFactory.createPlus();

            this._ui.list1.itemRender = ui.views.jjcAttr.ui_jjc_attrItem1UI;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onAttrItemHandler);
            this._ui.list3.itemRender = ui.views.jjcAttr.ui_jjc_attrItem1UI;
            this._ui.list3.renderHandler = new Laya.Handler(this,this.onSelfMountAttr);
    
            this._ui.list4.itemRender = ui.views.jjcAttr.ui_jjc_attrItem1UI;
            this._ui.list4.renderHandler = new Laya.Handler(this,this.onAttrItemHandler1);
            this._ui.list6.itemRender = ui.views.jjcAttr.ui_jjc_attrItem1UI;
            this._ui.list6.renderHandler = new Laya.Handler(this,this.onOtherMountAttr);
    
            this._ui.list2.itemRender = ui.views.jjcAttr.ui_jjc_attrItem1UI;
            this._ui.list2.renderHandler = new Laya.Handler(this,this.onAttrItemHandler2);
            this._ui.list5.itemRender = ui.views.jjcAttr.ui_jjc_attrItem1UI;
            this._ui.list5.renderHandler = new Laya.Handler(this,this.onAttrItemHandler2);
        }
    }

    /**他人坐骑 */
    private onOtherMountAttr(item:ui.views.jjcAttr.ui_jjc_attrItem1UI){
        this.refreshAttr(item);
        item.upimg.visible = false;
        let id = parseInt(item.dataSource.id);
        let value = this.Data;
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
        let mColor = EquipmentQualityProxy.Ins.getByQuaDefault("#F9F0BB", qua);
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
        item.tf1.color = item.valTf.color = "#F9F0BB";
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

        item.tf1.color = item.valTf.color = ZuoQiAttrCtl.getColor(attrVo.f_UnlockVal);
    }

    protected onInit(): void {
        // this._ui.icon.skin = MainModel.Ins.mRoleData.headUrl;
        MainModel.Ins.setTTHead(this._ui.icon,MainModel.Ins.mRoleData.headUrl);
        this._ui.nameTF.text = MainModel.Ins.mRoleData.getName();
        this._ui.lab.text = "(" + MainModel.Ins.mRoleData.serverName + ")";
        this._ui.img_title.skin = ChengHaoModel.Ins.getTitleImg(ChengHaoModel.Ins.wearedTitleId);
        let v = StringUtil.val2Atlas(MainModel.Ins.mRoleData.getBattleValue());
        this._plusCtl.setValue(this._ui.plusCon,v);

        let data:WatchSkyRank_revc = this.Data;
        MainModel.Ins.setTTHead(this._ui.icon1, MainModel.Ins.convertHead(data.HeadUrl));
        this._ui.nameTF1.text = data.NickName;
        this._ui.lab1.text = "(" + data.serverName + ")";
        this._ui.img_title1.skin = ChengHaoModel.Ins.getTitleImg(data.titleId);
        let vv = StringUtil.val2Atlas(data.plus);
        this._plusCtl1.setValue(this._ui.plusCon1,vv);

        this.updataView(data);
    }

    protected onExit(): void {
        
    }

    private _list;
    public updataView(value:WatchSkyRank_revc){
        this._ui.slot2.sel.visible = this._ui.slot2.ck.visible = this._ui.slot2.typename.visible = false;
        if(value.ride.length && value.ride[0].baseInfo){
            this._ui.slot2.visible = true;
            this._ui.slot2.icon.skin = IconUtils.getHorseIcon(value.ride[0].baseInfo.id);
            this._ui.slot2.tf1.text = IconUtils.str2Lv(value.ride[0].baseInfo.lv);
            let cfg = Mount_ListProxy.Ins.getCfg(value.ride[0].baseInfo.id);
            this._ui.slot2.qua.skin = IconUtils.getQuaIcon(cfg.f_Quality);
            f_setStar(this._ui.slot2,value.ride[0].baseInfo.star);

            let ecfg: Configs.t_EquipmentQuality_dat = EquipmentQualityProxy.Ins.GetDataById(cfg.f_Quality);
            let color = QualityUtils.getQuaColor(cfg.f_Quality);
            this._ui.nameTf1.text = cfg.f_MountName;
            this._ui.quaTf1.text = ecfg.f_EquipmentLevel;
            this._ui.nameTf1.color = color;
            this._ui.quaTf1.color = color;

            let attr: stEquipAttr[] = value.ride[0].attr[0].attrList||[];
            this._list = this.getBase(attr);
            this._ui.list4.array = this._list;
            this._ui.list6.array = this.getOther(attr);
            //右边属性
            let _rideVo = value.ride[0];
            this._ui.list5.array = Mount_ListProxy.Ins.getRideSpeclAttr(_rideVo.baseInfo.id, _rideVo.baseInfo.star);
            // value.ride[0].attr[0].attrList1;
        }else{
            this._ui.slot2.visible = false;
            this._ui.nameTf1.text = "";
            this._ui.quaTf1.text = "";
            this._ui.list4.array = [];
            this._ui.list5.array = [];
            this._ui.list6.array = [];
        }

        this._ui.slot1.sel.visible = this._ui.slot1.ck.visible = this._ui.slot1.typename.visible = false;
        if(ZuoQiModel.Ins.rideVo && ZuoQiModel.Ins.rideVo.equipVo){
            this._ui.slot1.visible = true;
            this._ui.slot1.icon.skin = IconUtils.getHorseIcon(ZuoQiModel.Ins.rideVo.rideId);
            this._ui.slot1.tf1.text = IconUtils.str2Lv(ZuoQiModel.Ins.rideVo.lv);
            this._ui.slot1.qua.skin = IconUtils.getQuaIcon(ZuoQiModel.Ins.rideVo.quality);
            let zuoqiVo = ZuoQiModel.Ins.rideVo;

            f_setStar(this._ui.slot1,zuoqiVo.starLv);

            let cfg = Mount_ListProxy.Ins.getCfg(ZuoQiModel.Ins.rideVo.rideId);
            let ecfg: Configs.t_EquipmentQuality_dat = EquipmentQualityProxy.Ins.GetDataById(cfg.f_Quality);
            let color = QualityUtils.getQuaColor(cfg.f_Quality);
            this._ui.nameTf.text = cfg.f_MountName;
            this._ui.quaTf.text = ecfg.f_EquipmentLevel;
            this._ui.nameTf.color = color;
            this._ui.quaTf.color = color;

            let attr: stEquipAttr[] = ZuoQiModel.Ins.rideVo.equipVo.attrList||[];
            this._ui.list1.array = this.getBase(attr);
            this._ui.list3.array = this.getOther(attr);
            //左边属性
            this._ui.list2.array = Mount_ListProxy.Ins.getRideSpeclAttr(zuoqiVo.rideId,zuoqiVo.starLv);
            //ZuoQiModel.Ins.rideVo.equipVo.attrList1;
        }else{
            this._ui.slot1.visible = false;
            this._ui.nameTf.text = "";
            this._ui.quaTf.text = "";
            this._ui.list1.array = [];
            this._ui.list2.array = [];
            this._ui.list3.array = [];
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