import {StringUtil} from "../../../../../frame/util/StringUtil";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { stSkin } from "../../../../network/protocols/BaseProto";
import { AvatarFactory } from "../../avatar/AvatarFactory";
import { AvatarView, EAvatarDir } from "../../avatar/AvatarView";
import { FontClipCtl } from "../../avatar/ctl/FontClipCtl";
import { FontCtlFactory } from "../../avatar/ctl/FontCtlFactory";
import { EAvatarAnim } from "../../avatar/vos/EAvatarAnim";
import { EquipmentQualityProxy } from "../../main/model/EquipmentProxy";
import { MainModel } from "../../main/model/MainModel";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { FuJiangModel } from "../model/FuJiangModel";
import { FuJiangClasProxy, FuJiangListProxy, FuJiangLvProxy, FuJiangSkillLvProxy, FuJiangSkillProxy, FuJiangStarProxy, FuJiangStarValueProxy } from "../proxy/FuJiangProxy";
import { FuJiangSkillCtl } from "./ctl/FuJiangSkillCtl";
import { FuJiangStarCtl } from "./ctl/FuJiangStarCtl";

export class FuJiangXQView extends ViewBase{
    private _ui:ui.views.fujiang.ui_fujiangXQViewUI;
    protected mMask = true;
    protected mMainSnapshot = true;

    private _plusCtl: FontClipCtl;
    private _avatar:AvatarView;
    private _skillctl1:FuJiangSkillCtl;
    private _skillctl2:FuJiangSkillCtl;
    private _skillctl3:FuJiangSkillCtl;
    private _skillctl4:FuJiangSkillCtl;

    protected onAddLoadRes() {
        this.addAtlas('fujiang.atlas');
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.fujiang.ui_fujiangXQViewUI;
            this.bindClose(this._ui.btn_close);

            this._ui.list6.itemRender = ui.views.fujiang.ui_fujiangAttrItemUI;
            this._ui.list6.renderHandler = new Laya.Handler(this,this.onRenderHandler);
            this._ui.list7.itemRender = ui.views.fujiang.ui_fujiangAttrItemUI;
            this._ui.list7.renderHandler = new Laya.Handler(this,this.onRenderHandler1);

            this._plusCtl = FontCtlFactory.createPlus();

            this._skillctl1 = new FuJiangSkillCtl(this._ui.item_jn1);
            this._skillctl2 = new FuJiangSkillCtl(this._ui.item_jn2);
            this._skillctl3 = new FuJiangSkillCtl(this._ui.item_jn3);
            this._skillctl4 = new FuJiangSkillCtl(this._ui.item_jn4);
        }
    }

    private onRenderHandler(item:ui.views.fujiang.ui_fujiangAttrItemUI){
        item.lab.visible = false;
        let id = parseInt(item.dataSource.split(":")[0]);
        let val = parseInt(item.dataSource.split(":")[1]);
        item.tf1.text = MainModel.Ins.getAttrNameIdByID(id) + ":";
        item.valTf.text = attrConvert(id,val);
    }

    private onRenderHandler1(item:ui.views.fujiang.ui_fujiangAttrItemUI,index:number){
        item.tf1.color = item.valTf.color = "#FB5AFB";
        let id = parseInt(item.dataSource.split(":")[0]);
        let val = parseInt(item.dataSource.split(":")[1]);

        let cCfg = FuJiangListProxy.Ins.getCfgById(this._data.f_cheifid);
        let lvSt = cCfg.f_specialupgrade.split("|")[index];
        let starSt = cCfg.f_specialupstar.split("|")[index];
        let lvNum:number = parseInt(lvSt.split(":")[1]) * (FuJiangLvProxy.Ins.maxLv - 1);
        let starNum:number = parseInt(starSt.split(":")[1]) * (FuJiangStarProxy.Ins.maxLv - 1);

        val = val + lvNum + starNum;
        item.tf1.text = MainModel.Ins.getAttrNameIdByID(id) + ":";

        item.tf1.color = item.valTf.color = "#FB5AFB";
        item.valTf.text = attrConvert(id,val);
        item.lab.visible = false;
    }

    private _data:Configs.t_Chief_List_dat;
    protected onInit(): void {
        this._data = this.Data;
        this.updataView();
    }

    protected onExit(): void {
        if(this._avatar){
            this._avatar.dispose();
            this._avatar = null;
        }
    }

    private updataView(){
        let cCfg = FuJiangListProxy.Ins.getCfgById(this._data.f_cheifid);
        let qCfg = EquipmentQualityProxy.Ins.getByQua(cCfg.f_cheifQuality);
        this._ui.lab_name.text = cCfg.f_cheif;
        this._ui.lab_qua.text = qCfg.f_chiefinfo;
        this._ui.lab_name.color = this._ui.lab_qua.color = "#" + qCfg.f_chiefcolor;
        this._ui.lab_lv.text = "Lv." + FuJiangLvProxy.Ins.maxLv;
        this._ui.img_zy.skin = FuJiangListProxy.Ins.getProfessionSkin(cCfg.f_cheifClass);
        let zyCfg = FuJiangClasProxy.Ins.getCfgByPre(cCfg.f_cheifClass);
        let stzy = zyCfg.f_chiefclass;
        this._ui.lab_zy.text = stzy;
        if(!this._avatar){
            let skin:stSkin = FuJiangModel.Ins.getFuJiangSkin(cCfg.f_cheifid);
            this._avatar = AvatarFactory.createAvatarByStSkin(skin,EAvatarAnim.NormalStand,EAvatarDir.Right);
            this._avatar.scale(1.1,1.1);
            this._ui.sp.addChild(this._avatar);
        }

        let ii = 0;
        for(let i:number = 1;i < 5; i++){
            let cfg = FuJiangSkillProxy.Ins.getCfgById(this._data.f_cheifid);
            let arr = cfg["f_clientskill" + i].split("|");
            let flag = false;
            for(let j:number=0;j<arr.length;j++){
                if(parseInt(arr[j]) > 0){
                    flag = true;
                    break;
                }
            }
            if(flag){
                ii ++;
                this._ui["item_jn" + i].visible = true;
                this["_skillctl" + i].setData(this._data.f_cheifid,i,FuJiangSkillLvProxy.Ins.maxLv,FuJiangStarProxy.Ins.maxLv);
            }else{
                this._ui["item_jn" + i].visible = false;
            }
        }

        if(ii == 2){
            this._ui.box.x = 168;
        }else if(ii == 3){
            this._ui.box.x = 85;
        }else{
            this._ui.box.x = 0;
        }

        this._ui.lab_snum.text = "x" + FuJiangStarProxy.Ins.maxLv;

        // let num = 0;
        // let arr = [];
        
        // for(let i:number=0;i<FuJiangStarValueProxy.Ins.List.length;i++){
        //     let arrid = FuJiangStarValueProxy.Ins.List[i].f_attrid;
        //     let val = FuJiangModel.Ins.getStarAttr(this._data.f_cheifid,arrid,FuJiangLvProxy.Ins.maxLv,FuJiangStarProxy.Ins.maxLv);
        //     let data:any = {};
        //     data.id = arrid;
        //     data.value = val;
        //     arr.push(data);

        //     if(arrid == 10003){
        //         num += val * 0.5;
        //     }else if(arrid == 10004){
        //         num += val * 2;
        //     }else if(arrid == 10005){
        //         num += val * 6;
        //     }
        // }
        this._ui.list6.array = cCfg.f_inherit.split("|");
        this._ui.list7.array = cCfg.f_specialattrinit.split("|");
        // let v = StringUtil.val2Atlas(num);
        // this._plusCtl.setValue(this._ui.plusCon,v);
        this._ui.img_plusCon.visible = false;
    }
}