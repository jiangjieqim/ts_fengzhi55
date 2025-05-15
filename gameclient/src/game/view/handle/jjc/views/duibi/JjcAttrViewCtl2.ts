import { ui } from "../../../../../../ui/layaMaxUI";
import { WatchPlayerInfo_revc } from "../../../../../network/protocols/BaseProto";
import { FontClipCtl } from "../../../avatar/ctl/FontClipCtl";
import { FontCtlFactory } from "../../../avatar/ctl/FontCtlFactory";
import { GameconfigProxy } from "../../../main/model/EquipmentProxy";
import { MainModel } from "../../../main/model/MainModel";
import { attrConvert } from "../../../main/vos/MainRoleVo";
import { PlayerVoFactory } from "../../../main/vos/PlayerVoFactory";

export class JjcAttrViewCtl2{
    protected skin:ui.views.jjcAttr.ui_jjc_attrView2UI;

    constructor(skin:ui.views.jjcAttr.ui_jjc_attrView2UI) {
        this.skin = skin;

        this.skin.list.itemRender = ui.views.jjcAttr.ui_jjc_attrItem1UI;
        this.skin.list.renderHandler = new Laya.Handler(this,this.onAttrHandler);
        this.skin.list1.itemRender = ui.views.jjcAttr.ui_jjc_attrItem1UI;
        this.skin.list1.renderHandler = new Laya.Handler(this,this.onAttrHandler1);
    }

    private onAttrHandler(item:ui.views.jjcAttr.ui_jjc_attrItem1UI){
        let id = parseInt(item.dataSource);
        let val = PlayerVoFactory.getEquipVal(this._list,id);
        item.tf1.text = MainModel.Ins.getAttrNameIdByID(id) + ":";
        item.valTf.text = attrConvert(id,val);

        let val1 = PlayerVoFactory.getEquipVal(this._list1,id);
        if(val > val1){
            item.upimg.skin = `remote/common/base/green.png`;
        }else if(val < val1){
            item.upimg.skin = `remote/common/base/red.png`;
        }else{
            item.upimg.skin = "";
        }
    }

    private onAttrHandler1(item:ui.views.jjcAttr.ui_jjc_attrItem1UI){
        let id = parseInt(item.dataSource);
        let val = PlayerVoFactory.getEquipVal(this._list1,id);
        item.tf1.text = MainModel.Ins.getAttrNameIdByID(id) + ":";
        item.valTf.text = attrConvert(id,val);
        item.upimg.visible = false;
    }

    private _list;
    private _list1;
    public setData(value:WatchPlayerInfo_revc){
        let arr = value.equipItem;
        let array = [];
        for(let i:number=0;i<arr.length;i++){
            array = array.concat(arr[i].attrList);
        }
        this._list1 = PlayerVoFactory.mergeAttrSt(array);
        this.skin.list1.array = GameconfigProxy.Ins.getJjcList();

        arr = MainModel.Ins.mPlayinfo.equipItem;
        array = [];
        for(let i:number=0;i<arr.length;i++){
            array = array.concat(arr[i].attrList);
        }
        this._list = PlayerVoFactory.mergeAttrSt(array);
        this.skin.list.array = GameconfigProxy.Ins.getJjcList();

       
    }
}