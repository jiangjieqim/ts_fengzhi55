import { ui } from "../../../../../../ui/layaMaxUI";
import { WatchPlayerInfo_revc, stSpiritArena } from "../../../../../network/protocols/BaseProto";
import { MainModel } from "../../../main/model/MainModel";
import { attrConvert } from "../../../main/vos/MainRoleVo";
import { PlayerVoFactory } from "../../../main/vos/PlayerVoFactory";
import { SoulModel } from "../../../soul/model/SoulModel";
import { t_Spirit_Attribute_Fixed, t_Spirit_Position } from "../../../soul/model/SoulProxy";
import { f_headViewUpdate } from "../../../soul/views/SoulIconItem";
import { SoulTopItemCtl } from "../../../soul/views/SoulTopItemCtl";

export class JjcAttrViewCtl7{
    protected skin:ui.views.jjcAttr.ui_jjc_attrView7UI;

    private _attrID = [10002,10003,10004,10005];

    constructor(skin:ui.views.jjcAttr.ui_jjc_attrView7UI) {
        this.skin = skin;

        this.skin.list1.itemRender = ui.views.jjcAttr.ui_jjc_attrItem1UI;
        this.skin.list1.renderHandler = new Laya.Handler(this,this.onAttrItemHandler);
        this.skin.list2.itemRender = ui.views.jjcAttr.ui_jjc_attrItem1UI;
        this.skin.list2.renderHandler = new Laya.Handler(this,this.onAttrItemHandler1);

        this.skin.list3.itemRender = ui.views.jjcAttr.ui_jjc_attrItem1UI;
        this.skin.list3.renderHandler = new Laya.Handler(this,this.onAttrItemHandler1);
        this.skin.list4.itemRender = ui.views.jjcAttr.ui_jjc_attrItem1UI;
        this.skin.list4.renderHandler = new Laya.Handler(this,this.onAttrItemHandler1);
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

    public setData(value:WatchPlayerInfo_revc){
        this.setOtherInfo(value.Spirit);
        this.setMyInfo();
    }

    private _list;
    private setOtherInfo(data:stSpiritArena){
        for(let i:number = 0;i < 4; i++){
            let posCfg:Configs.t_Spirit_Position_dat = t_Spirit_Position.Ins.getByPos(i + 1);
            let vo = data.spiritInfo.find(ele => ele.pos == i + 1);
            if(vo){
                this.skin["item_" + i].tf1.visible = false;
                this.skin["item_" + i].icon.visible = true;
                f_headViewUpdate(this.skin["item_" + i].icon,t_Spirit_Attribute_Fixed.Ins.getCfgBySpiritID(vo.spiritId).f_SpiritIconID);
                this.skin["item_" + i].lvTf.visible = true;
                if(vo.level > 0){
                    this.skin["item_" + i].lvTf.text = "+"+vo.level.toString();
                }else{
                    this.skin["item_" + i].lvTf.text = "";
                }
                let cfg = t_Spirit_Attribute_Fixed.Ins.GetDataById(vo.spiritId)
                this.skin["item_" + i].bgicon.skin = SoulModel.Ins.getIcon(cfg.f_SpiritQuality);
            }else{
                this.skin["item_" + i].tf1.visible = true;
                this.skin["item_" + i].tf1.text = posCfg.f_PositionName;
                this.skin["item_" + i].icon.visible = false;
                this.skin["item_" + i].lvTf.visible = false;
                this.skin["item_" + i].bgicon.skin = SoulModel.Ins.getIcon(0);
            }
            this.skin["item_" + i].bgicon.rotation = SoulModel.Ins.getRot(i + 1);
        }

        let arr = [];
        let arr1 = [];
        for(let i:number=0;i<data.attrList.length;i++){
            if(this._attrID.indexOf(data.attrList[i].id) != -1){
                arr.push(data.attrList[i]);
            }else{
                arr1.push(data.attrList[i]);
            }
        }
        this._list = arr;
        this.skin.list3.array = arr;
        this.skin.list4.array = arr1;
    }

    private topItemlist:SoulTopItemCtl[];
    private setMyInfo(){
        this.topItemlist = [];
        for(let i = 0;i < 4;i++){
            this.topItemlist.push(new SoulTopItemCtl(this.skin['item'+i],i+1,false));
        }
        for(let i = 0;i < this.topItemlist.length;i++){
            this.topItemlist[i].refreshView(false);
        }
        this.skin.list1.array = SoulModel.Ins.getAllBaseAttr();
        this.skin.list2.array = SoulModel.Ins.getAllRandomAttr();
    }
}