import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../../ui/layaMaxUI";
import { E } from "../../../../../G";
import { stPet, stPetTalent } from "../../../../../network/protocols/BaseProto";
import { SimpleEffect } from "../../../avatar/SimpleEffect";
import { MainModel } from "../../../main/model/MainModel";
import { attrConvert } from "../../../main/vos/MainRoleVo";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";
import { LingChongModel } from "../../model/LingChongModel";
import { PetListProxy, PetTalentProxy } from "../../proxy/LingChongProxy";

export class LingChongXMItem1 extends ui.views.lingchong.ui_lingchongXMItem1UI{

    constructor() {
        super();
        this.on(Laya.Event.DISPLAY,this,this.onAdd);
        this.on(Laya.Event.UNDISPLAY,this,this.onRemove);
        this.quality.on(Laya.Event.CLICK,this,this.onClick);
        ButtonCtl.Create(this.img_lock,new Laya.Handler(this,this.onBtnLockClick));
    }

    private onAdd(){
        LingChongModel.Ins.on(LingChongModel.UPDATA_LEVEL_XM,this,this.onUpdataView);
    }

    private onRemove(){
        LingChongModel.Ins.off(LingChongModel.UPDATA_LEVEL_XM,this,this.onUpdataView);
        if(this.eff){
            this.eff.stop();
        }
    }

    private onBtnLockClick(){
        if(this._data){
            if(this._data.petTalentIdToDo){
                E.ViewMgr.ShowMidError("请先处理当前血脉天赋");//显示错误提示
                return;
            }
            if(this._data1){
                let index = LingChongModel.Ins.xmLockIds.indexOf(this._data1.talentId);
                if(index == -1){
                    let cfg:Configs.t_Pet_List_dat = PetListProxy.Ins.getCfgById(this._data.petId);
                    if(LingChongModel.Ins.xmLockIds.length >= cfg.f_talentslot - 1){
                        E.ViewMgr.ShowMidError("不能全部锁定");//显示错误提示
                        return;
                    }else{
                        LingChongModel.Ins.xmLockIds.push(this._data1.talentId);
                        this.img_lock.skin = "remote/lingchong/lock_1.png";
                    }
                }else{
                    LingChongModel.Ins.xmLockIds.splice(index,1);
                    this.img_lock.skin = "remote/lingchong/lock_2.png";
                }
            }
            LingChongModel.Ins.event(LingChongModel.UPDATA_XM_LOCK);
        }
    }

    private eff:SimpleEffect;
    private playAnim(){
        if(!this.eff){
            this.eff = new SimpleEffect(this.sp, "o/spine/change/change", this.sp.width / 2 + 1, this.sp.height / 2 + 1);
        }
        this.eff.play(0,false,null,null,null,true);
    }

    private onUpdataView(index){
        if(this._index == index){
            this.playAnim();
        }
    }

    private onClick(e:Laya.Event){
        if(this._dec){
            e.stopPropagation();
            MainModel.Ins.showSmallTips("", this._dec , e.target);
        }
    }

    private _dec:string;
    private _index:number;
    private _data:stPet;
    private _data1:stPetTalent;
    public setData(value:any,index:number,value1:stPet){
        if(!value)return;
        this._data = value1;
        this._data1 = value.data;
        this._index = index;
        if(value.data){
            let data:Configs.t_Pet_Talent_List_dat = PetTalentProxy.Ins.getCfgById(value.data.talentId);
            let id = parseInt(data.f_attr.split(":")[0]);
            let val = parseInt(data.f_attr.split(":")[1]) * value.data.talentLevel;
            this.quality.skin = IconUtils.getQuaIcon(data.f_quality);
            this.lab.text = MainModel.Ins.getAttrNameIdByID(id);
            this.lab_lv.text = "Lv." + value.data.talentLevel;
            this._dec = MainModel.Ins.getAttrNameIdByID(id) + ":" + attrConvert(id,val);
            this.wh.visible = false;

            let cfg:Configs.t_Pet_List_dat = PetListProxy.Ins.getCfgById(this._data.petId);
            if(this._data.petTalents.length >= cfg.f_talentslot){
                this.img_lock.visible = true;
                if(value.data.lock){
                    this.img_lock.skin = "remote/lingchong/lock_1.png";
                }else{
                    this.img_lock.skin = "remote/lingchong/lock_2.png";
                }
            }else{
                this.img_lock.visible = false;
            }
        }else{
            this.wh.visible = true;
            this.quality.skin = "remote/common/base/jiangli1.png";
            this.lab.text = "";
            this.lab_lv.text = "";
            this._dec = "";
            this.img_lock.visible = false;
        }
       
    }
}