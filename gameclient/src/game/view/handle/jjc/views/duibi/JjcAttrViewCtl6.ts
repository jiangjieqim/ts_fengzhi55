import { ui } from "../../../../../../ui/layaMaxUI";
import { WatchPlayerInfo_revc } from "../../../../../network/protocols/BaseProto";
import { ItemViewFactory } from "../../../main/model/ItemViewFactory";
import { MainModel } from "../../../main/model/MainModel";
import { WingModel } from "../../../main/model/WingModel";
import { WingIdProxy } from "../../../main/proxy/WingProxy";
import { attrConvert } from "../../../main/vos/MainRoleVo";
import { PlayerVoFactory } from "../../../main/vos/PlayerVoFactory";

export class JjcAttrViewCtl6{
    protected skin:ui.views.jjcAttr.ui_jjc_attrView6UI;
    constructor(skin:ui.views.jjcAttr.ui_jjc_attrView6UI) {
        this.skin = skin;

        this.skin.list.itemRender = ui.views.jjcAttr.ui_jjc_attrItem1UI;
        this.skin.list.renderHandler = new Laya.Handler(this,this.onAttrItemHandler);
        this.skin.list1.itemRender = ui.views.jjcAttr.ui_jjc_attrItem1UI;
        this.skin.list1.renderHandler = new Laya.Handler(this,this.onAttrItemHandler1);
    }

    private onAttrItemHandler(item:ui.views.jjcAttr.ui_jjc_attrItem1UI){
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
    }

    private onAttrItemHandler1(item:ui.views.jjcAttr.ui_jjc_attrItem1UI){
        let id = parseInt(item.dataSource.id);
        let val = parseInt(item.dataSource.value);
        item.tf1.text = MainModel.Ins.getAttrNameIdByID(id) + ":";
        item.valTf.text = attrConvert(id,val);
        item.upimg.visible = false;
    }

    private _list;
    public setData(value:WatchPlayerInfo_revc){
        if(value.wing && value.wing.wingId){
            this.skin.lab_name1.text = WingIdProxy.Ins.getWingName(value.wing.wingId);
            this.skin.wingLevelText1.text = `${value.wing.stage}阶${value.wing.level}级`;
            this.skin.wingbox1.visible = true;
            this.skin.wingbox1.bg1.visible = this.skin.wingbox1.bg2.visible = this.skin.wingbox1.icon.visible = false;
            this.skin.wingbox1.wingLeftIcon.skin = ItemViewFactory.getWingIcon(value.wing.wingId);
            this.skin.wingbox1.wingRightIcon.skin = ItemViewFactory.getWingIcon(value.wing.wingId);

            this._list = WingIdProxy.Ins.getWingAttrList(value.wing.wingId, value.wing.level, value.wing.stage
                , value.wing.treasureStage);
            this.skin.list1.array = this._list;
        }else{
            this.skin.lab_name1.text = "";
            this.skin.wingLevelText1.text = "";
            this.skin.wingbox1.visible = false;
            this.skin.list1.array = [];
        }

        if(WingModel.Ins.wingId){
            this.skin.lab_name.text = WingModel.Ins.wingName;
            this.skin.wingLevelText.text = `${WingModel.Ins.stage}阶${WingModel.Ins.level}级`;
            this.skin.wingbox.visible = true;
            this.skin.wingbox.bg1.visible = this.skin.wingbox.bg2.visible = this.skin.wingbox.icon.visible = false;
            this.skin.wingbox.wingLeftIcon.skin = ItemViewFactory.getWingIcon(WingModel.Ins.wingId);
            this.skin.wingbox.wingRightIcon.skin = ItemViewFactory.getWingIcon(WingModel.Ins.wingId);

            const attrList = WingIdProxy.Ins.getWingAttrList(WingModel.Ins.wingId, WingModel.Ins.level, WingModel.Ins.stage
                , WingModel.Ins.treasureStage);
            this.skin.list.array = attrList;
        }else{
            this.skin.lab_name.text = "";
            this.skin.wingLevelText.text = "";
            this.skin.wingbox.visible = false;
            this.skin.list.array = [];
        }
    }
}