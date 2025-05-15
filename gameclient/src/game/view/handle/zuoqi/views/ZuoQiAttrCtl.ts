import {StringUtil} from "../../../../../frame/util/StringUtil";
import { ui } from "../../../../../ui/layaMaxUI";
import { stEquipAttr } from "../../../../network/protocols/BaseProto";
import { FontClipCtl } from "../../avatar/ctl/FontClipCtl";
import { FontCtlFactory } from "../../avatar/ctl/FontCtlFactory";
import { FuJiangItem9 } from "../../fujiang/view/item/FuJiangItem9";
import { EquipmentQualityProxy } from "../../main/model/EquipmentProxy";
import { MainModel } from "../../main/model/MainModel";
import { EquipAttrSkinProxy } from "../../main/views/EquipAttrSkinProxy";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { Mount_ListProxy, Mount_ValueProxy, RideAttr } from "../vos/ZuoqiProxy";
import { ZuoqiVo } from "../vos/ZuoqiVo";
import { ZuoQiAttrView } from "./ZuoQiAttrView";

export class EquipAttrShow{
    /**属性id */
	public id:number;
    /**属性值 */
	public value:number;
    /**是否锁定中 */
    public lock:boolean = false;
    /**几星解锁 */
    public lockStar:number;
}

export class AttrCtl{
    public skin:ui.views.main.ui_main_zuoqi_attrUI;
    private def:string;
    constructor(){
    }
    public refresh(vo:ZuoqiVo){
        this.def = this.skin.tf1.color;

        let _attrVo: stEquipAttr = this.skin.dataSource;
        EquipAttrSkinProxy.setDataThan(this.skin,_attrVo);
        let qua = vo.getAttrQua(_attrVo.id);
        this.mColor = EquipmentQualityProxy.Ins.getByQuaDefault(this.def, qua);
    }

    private set mColor(v:string){
        this.skin.tf1.color = v;
        this.skin.valTf.color = v;
    }
}

class AttrItemUI extends ui.views.main.ui_main_zuoqi_attrUI {
    // ui.views.main.ui_main_attrUI{
    private ctl: AttrCtl;
    public refresh(vo: ZuoqiVo) {
        if (!this.ctl) {
            this.ctl = new AttrCtl();
            this.ctl.skin = this;
        }
        this.ctl.refresh(vo);
    }
}

class FuJiangAttrItemUI extends ui.views.fujiang.ui_fujiangAttrItem2UI {
    private def:string;
    constructor(){
        super();
        this.def = this.tf1.color; 
    }
    public refresh(vo:ZuoqiVo){
        let _attrVo: stEquipAttr = this.dataSource;
        let qua = vo.getAttrQua(_attrVo.id);
        this.mColor = EquipmentQualityProxy.Ins.getByQuaDefault(this.def, qua);
        this.tf1.text =  MainModel.Ins.getAttrNameIdByID(_attrVo.id);
        this.valTf.text = attrConvert(_attrVo.id,_attrVo.value);
    }

    private set mColor(v:string){
        this.tf1.color = v;
        this.valTf.color = v;
    }
}

interface IMountTipsSkin{
    high_nametf:Laya.Label;
    high_desctf:Laya.Label;
}

/**坐骑tip控制器 */
export class ZuoQiAttrCtl {
    private leftList:Laya.List;
    private rightList:Laya.List;
    private specLvUplist:Laya.List;
    private specList:Laya.List;
    private nameTf:Laya.Label;
    private quaTf:Laya.Label;
    private plusCon:Laya.Sprite;
    private _plusCtl:FontClipCtl;
    private baseAttrList:number[];
    private zuoqiVo:ZuoqiVo;

    skin:IMountTipsSkin;
    /**
     * 
     * @param leftList 
     * @param rightList 
     * @param specLvUplist 
     * @param specList 
     * @param nameTf 
     * @param quaTf 
     * @param plusCon 
     * @param type 0 坐骑
     * @param type1 0 坐骑
     */
    constructor(
        leftList:Laya.List,
        rightList:Laya.List,
        specLvUplist:Laya.List,
        specList:Laya.List,
        nameTf:Laya.Label,quaTf:Laya.Label,plusCon:Laya.Sprite,type:number=0,type1:number=0,cls?:any)
    {
        let baseAttrList:number[] = Mount_ValueProxy.Ins.getAttrList();
        this.baseAttrList = baseAttrList;
        if(type == 0){
            //坐骑
            leftList.itemRender = cls || AttrItemUI;
            leftList.renderHandler = new Laya.Handler(this,this.onAttrItemHandler);
            rightList.itemRender = cls || AttrItemUI;
            rightList.renderHandler = new Laya.Handler(this,this.onAttrItemHandler);
        }else{
            //副将
            leftList.itemRender = FuJiangAttrItemUI;
            leftList.renderHandler = new Laya.Handler(this,this.onAttrItemHandler1);
            rightList.itemRender = FuJiangAttrItemUI;
            rightList.renderHandler = new Laya.Handler(this,this.onAttrItemHandler1);
        }
        
        if(specLvUplist){
            if(type1 == 0){
                specLvUplist.itemRender = ZuoQiAttrView;
                specLvUplist.renderHandler = new Laya.Handler(this,this.onLvUpSpeaiclAttr);
            }else{
                specLvUplist.itemRender = FuJiangItem9;
                specLvUplist.renderHandler = new Laya.Handler(this,this.onLvUpSpeaiclAttr1);
            }
        }
        if(specList){
            specList.itemRender = ui.views.zuoqi.ui_zuoqi_spec_attr1UI;
            specList.renderHandler = new Laya.Handler(this,this.onSpeclHandler);
        }


        this.specLvUplist = specLvUplist;
        this.leftList = leftList;
        this.rightList = rightList;
        this.specList = specList;

        this.nameTf = nameTf;
        this.quaTf = quaTf;
        this.plusCon = plusCon;
        this._plusCtl = FontCtlFactory.createPlus();
    }

    private onSpeclHandler(item:ui.views.zuoqi.ui_zuoqi_spec_attr1UI,index:number){
        let attrVo:RideAttr = item.dataSource;
        item.tf1.text = MainModel.Ins.getAttrNameIdByID(attrVo.id);
        item.valTf.text = attrConvert(attrVo.id,attrVo.value);
        item.tf1.color = item.valTf.color = ZuoQiAttrCtl.getColor(attrVo.f_UnlockVal);
    }

    public static getColor(f_UnlockVal: number) {
        return f_UnlockVal > Mount_ListProxy.Ins.wakeStar ? "#FCF03F" : "#EE61D9";
    }

    private getAttrVal(rideId:number,star:number,stAttr:stEquipAttr,index:number){
        /*
        // attrList:stEquipAttr[]
        let l =  attrList;
        for(let i = 0;i < l.length;i++){
            let cell:stEquipAttr = l[i];
            if(cell.id == stAttr.id){
                // return cell.value;
                let obj:EquipAttrShow = new EquipAttrShow();
                obj.id = stAttr.id;
                obj.value = stAttr.value;
                obj.lock = false;
                return obj;
            }
        }
        */
        let obj:EquipAttrShow = new EquipAttrShow();
        obj.id = stAttr.id;
        obj.value = stAttr.value;
        obj.lockStar = Mount_ListProxy.Ins.getUnLockStar(rideId,index);
        obj.lock = star < obj.lockStar;
        return obj;//stAttr.value;
    }

    private onLvUpSpeaiclAttr(item:ZuoQiAttrView){
        item.setData(item.dataSource);
    }

    private onLvUpSpeaiclAttr1(item:FuJiangItem9){
        item.setData(item.dataSource);
    }

    private onAttrItemHandler(skin:AttrItemUI){
        skin.refresh(this.zuoqiVo);
    }

    private onAttrItemHandler1(skin:FuJiangAttrItemUI){
        skin.refresh(this.zuoqiVo);
    }

    private getBase(l:stEquipAttr[]){
        let rs = [];
        for(let i = 0;i < l.length;i++){
            if(this.baseAttrList.indexOf(l[i].id)!=-1){
                rs.push(l[i]);
            }
        }
        return rs;
    }

    private getOther(l:stEquipAttr[]){
        let rs = [];
        for(let i = 0;i < l.length;i++){
            if(this.baseAttrList.indexOf(l[i].id)==-1){
                rs.push(l[i]);
            }
        }
        return rs;
    }
    private updateDesc(){
        if(this.skin && this.skin.high_desctf && this.skin.high_nametf){
            let zuoqiVo = this.zuoqiVo;
            this.skin.high_desctf.visible = this.skin.high_nametf.visible = false;
            let lv = zuoqiVo.starLv;
            let minlv = 7;
            if(lv >= minlv && zuoqiVo.quality >= 11){

                let cfg = Mount_ListProxy.Ins.getCfg(zuoqiVo.rideId);
                if(cfg && cfg.f_7StarSkill){
                    this.skin.high_desctf.visible = this.skin.high_nametf.visible = true;
                    let index = lv - minlv;
                    let arr = cfg.f_7StarSkill.split(";");
                    let name = arr[index].split("|")[0];
                    let dec = arr[index].split("|")[1];
                    this.skin.high_nametf.text = name != "" ? (name + "：") : "";
                    this.skin.high_desctf.text = dec;

                    this.skin.high_desctf.x = this.skin.high_nametf.x + this.skin.high_nametf.textField.width;
                }
            }
        }
    }
    public refresh(zuoqiVo:ZuoqiVo){
        this.zuoqiVo = zuoqiVo;
        let color = zuoqiVo.getQuaColor();
        this.updateDesc();
        let rideId:number = zuoqiVo.rideId;
        this.nameTf.text = zuoqiVo.getName();
        this.quaTf.text = zuoqiVo.getQuaText();
        this.nameTf.color = color;
        this.quaTf.color = color;
        this._plusCtl.setValue(this.plusCon,StringUtil.val2Atlas(zuoqiVo.plus||0));
        
        let attr: stEquipAttr[] = zuoqiVo.equipVo.attrList||[];

        this.leftList.array = this.getBase(attr);
        this.rightList.array = this.getOther(attr);

        if(this.specLvUplist){
            let configAttrs: stEquipAttr[] = Mount_ListProxy.Ins.getSpeaicelAttr(rideId);
            let _attrShowList: EquipAttrShow[] = [];
            for (let i = 0; i < configAttrs.length; i++) {
                let cell = configAttrs[i];
                let obj = this.getAttrVal(zuoqiVo.rideId, zuoqiVo.starLv,cell,i);
                //zuoqiVo.equipVo.attrList1
                _attrShowList.push(obj);
            }
            this.specLvUplist.array = _attrShowList;
        }
        if(this.specList){
            let attrList = Mount_ListProxy.Ins.getRideSpeclAttr(zuoqiVo.rideId,zuoqiVo.starLv);
            this.specList.array = attrList;//zuoqiVo.equipVo.attrList1;
        }
    }
}