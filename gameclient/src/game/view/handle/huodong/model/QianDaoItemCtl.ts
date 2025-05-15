import {StringUtil} from "../../../../../frame/util/StringUtil";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainModel } from "../../main/model/MainModel";
import { ItemVo } from "../../main/vos/ItemVo";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { Mount_ListProxy } from "../../zuoqi/vos/ZuoqiProxy";
import { ActivityModel } from "../ActivityModel";
import { EQianDaoRewardsType } from "./ActivityProxy";
import { ActivityVo } from "./ActivityVo";
import { EActivityLingQu } from "./EActivityType";



interface IQianDaoSkin extends Laya.Sprite{
    bg:Laya.Image;
    nametf:Laya.Label;
    mask1:Laya.Image;
    gou:Laya.Image;

}
interface IQianDaoSkin1 extends IQianDaoSkin{
    cntTf:Laya.Label;
    icon:Laya.Image;
}
interface IQianDaoSkin2 extends IQianDaoSkin{
    iconCon:Laya.Sprite;
}
export class QianDaoItemCtl {
    private skin:IQianDaoSkin;
    private _activityVo:ActivityVo;
    private _model:ActivityModel;
    private cfg: Configs.t_Pack_Attendance_dat;
    private itemVo:ItemVo;
    private _mountCfg:Configs.t_Mount_List_dat;

    // ui.views.huodong.ui_qiandao_itemUI | ui.views.huodong.ui_qiandao_horseUI
    constructor(skin:IQianDaoSkin) {
        this.skin = skin;
        this._model = ActivityModel.Ins;
        skin.on(Laya.Event.CLICK,this,this.onClickHandler);
    }

    private onClickHandler(e: Laya.Event) {
        e.stopPropagation();
        if (this.itemVo) {
            MainModel.Ins.showSmallTips(this.itemVo.getName(), this.itemVo.getDesc(), this.skin);
        }else if(this._mountCfg){
            MainModel.Ins.showSmallTips(this._mountCfg.f_MountName, this._mountCfg.f_MountName, this.skin);
        }
    }

    public setData(cfg: Configs.t_Pack_Attendance_dat, _activityVo: ActivityVo) {
        this._activityVo = _activityVo;
        this.cfg = cfg;

        if(this.skin.destroyed){
            return;
        }

        if(this.skin.nametf){
            this.skin.nametf.text = E.LangMgr.getLang("QianDao1",StringUtil.toChinesNum(this.cfg.f_Days));
        }
        let _maskBg1:Laya.Image = this.skin.mask1;
        let _gouImg:Laya.Image = this.skin.gou;;
        if(this.skin instanceof  ui.views.huodong.ui_qiandao_itemUI || this.skin instanceof ui.views.huodong.ui_qiandao_horseUI){
            if (cfg.f_RewardsType == EQianDaoRewardsType.Item) {
                // let itemSkin = this.skin;
                // _maskBg1 = itemSkin.mask1;
                // _gouImg = itemSkin.gou;
                this.updateItem(this.skin as any);

            } else {
                // let houreSkin = this.skin;
                // _maskBg1 = houreSkin.mask1;
                // _gouImg = houreSkin.gou;

                this.updateHorse(this.skin as any);
            }
        }
        else if(this.skin instanceof ui.views.huodong.ui_qiandao_item2UI){
            this.updateView2(this.skin as any);
        }

        //////////////////////////////////
        //  clear
        _maskBg1.visible = false;
        _gouImg.visible  = false;

        //////////////////////////////////

        let _status = EActivityLingQu.Nothing;
        if(_activityVo){
            _status = _activityVo.getParam1(cfg.f_id);
        }
        switch(_status){
            case EActivityLingQu.Nothing:
                _maskBg1.visible = false;
                _gouImg.visible  = false;
                this.skin.bg.skin = "remote/huodong/lanwei_lan.png";
                this.nameColor = "#FFEEC2";
                break;

            case EActivityLingQu.KeLingQu:
                _gouImg.visible = false;
                _maskBg1.visible = false;
                this.skin.bg.skin = "remote/huodong/lanwei_huang.png";
                this.nameColor = "#8e3b34";
                break;

            case EActivityLingQu.YiLingQu:
                this.skin.bg.skin = "remote/huodong/lanwei_lan.png";
                _gouImg.visible = true;
                _maskBg1.visible = true;
                this.nameColor = "#FFEEC2";
                break;
        }

    }

    private updateView2(skin:IQianDaoSkin2){
        let itemScale:number = 0.65;
        skin.width = 100 * itemScale * this.cfg.f_Item.split("|").length + 30;
        ItemViewFactory.renderItemSlots(skin.iconCon,this.cfg.f_Item,2,itemScale);
        skin.iconCon.x = skin.width/2;
    }

    private set nameColor(color:string){
        if(this.skin.nametf){
            this.skin.nametf.color = color;
        }
    }

    private updateItem(_skin:IQianDaoSkin1) {
        // let _skin: ui.views.huodong.ui_qiandao_itemUI = this.skin;
        let itemVo:ItemVo = ItemViewFactory.convertItemList(this.cfg.f_Item)[0];
        this.itemVo = itemVo;
        _skin.icon.skin  = IconUtils.getIconByCfgId(itemVo.cfgId);
        _skin.cntTf.text = itemVo.count.toString();
    }

    private updateHorse(_skin: IQianDaoSkin1) {
        // let _skin: ui.views.huodong.ui_qiandao_horseUI = this.skin;
        let _mountCfg:Configs.t_Mount_List_dat = Mount_ListProxy.Ins.getCfg(parseInt(this.cfg.f_Item));
        this._mountCfg = _mountCfg;
        _skin.icon.skin = IconUtils.getHorseIcon(_mountCfg.f_MountID);
    }
}