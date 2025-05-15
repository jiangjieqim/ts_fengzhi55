import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { SocketMgr } from "../../../../network/SocketMgr";
import { PetHandleNewTalent_req, PetHandleNewTalent_revc, PetNewTalent_req, PetUpgradeTalent_req, stPet } from "../../../../network/protocols/BaseProto";
import { AvatarFactory } from "../../avatar/AvatarFactory";
import { AvatarMonsterView } from "../../avatar/AvatarMonsterView";
import { EAvatarDir } from "../../avatar/AvatarView";
import { EAvatarAnim } from "../../avatar/vos/EAvatarAnim";
import { FuJiangStarCtl } from "../../fujiang/view/ctl/FuJiangStarCtl";
import { ValCtl } from "../../main/ctl/ValLisCtl";
import { MainModel } from "../../main/model/MainModel";
import { ECellType } from "../../main/vos/ECellType";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { LingChongModel } from "../model/LingChongModel";
import { PetListProxy, PetQualityProxy, PetTalentProxy } from "../proxy/LingChongProxy";
import { LingChongXMItem1 } from "./item/LingChongXMItem1";
import { EClientType } from "../../sdk/ClientType";
import { System_RefreshTimeProxy } from "../../huodong/model/ActivityProxy";

export class LingChongXMView extends ViewBase{
    private _ui:ui.views.lingchong.ui_lingchongXMJXViewUI;
    protected mMask = true;
    protected mMainSnapshot = true;

    private _starCtl:FuJiangStarCtl;
    private _btnTHCtl:ButtonCtl;

    protected onAddLoadRes() {
        this.addAtlas("lingchong.atlas");
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.lingchong.ui_lingchongXMJXViewUI;
            this.bindClose(this._ui.btn_close);

            ValCtl.Create(this._ui.goldtf,this._ui.yuanbaoicon,ECellType.LingChouXM);
            ValCtl.Create(this._ui.goldtf1,this._ui.yuanbaoicon1,ECellType.GOLD);

            ButtonCtl.Create(this._ui.btn_tj,new Laya.Handler(this,this.onBtnTJClick));
            ButtonCtl.Create(this._ui.btn_jx,new Laya.Handler(this,this.onBtnJXClick));
            ButtonCtl.Create(this._ui.btn_lv,new Laya.Handler(this,this.onBtnLVClick));
            ButtonCtl.Create(this._ui.btn_fq,new Laya.Handler(this,this.onBtnFQClick));
            this._btnTHCtl = ButtonCtl.Create(this._ui.btn_th,new Laya.Handler(this,this.onBtnTHClick));

            this._ui.quality.on(Laya.Event.CLICK,this,this.onBtnQClick);

            this._starCtl = new FuJiangStarCtl(this._ui.star);

            this._ui.list_xm.itemRender = LingChongXMItem1;
            this._ui.list_xm.renderHandler = new Laya.Handler(this,this.onRenderHandler);
            
            if(initConfig.clienttype == EClientType.Discount){
            // if(System_RefreshTimeProxy.Ins.showpet){
                this._ui.addbtn.visible = false;
            }
        }
    }

    private onBtnTJClick(){
        E.ViewMgr.Open(EViewType.LingChongXMTJView);
    }

    private onBtnJXClick(){
        if(this._isPlay)return;
        if(!this._data)return;
        let req:PetNewTalent_req = new PetNewTalent_req;
        req.petSerialNum = this._data.petSerialNum;
        req.lockTalentIds = LingChongModel.Ins.xmLockIds;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onBtnLVClick(){
        if(this._isPlay)return;
        if(!this._data)return;
        let req:PetUpgradeTalent_req = new PetUpgradeTalent_req;
        req.petSerialNum = this._data.petSerialNum;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onBtnFQClick(){
        if(this._isPlay)return;
        if(!this._data)return;
        let req:PetHandleNewTalent_req = new PetHandleNewTalent_req;
        req.petSerialNum = this._data.petSerialNum;
        req.type = 2;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private _type:number;
    private onBtnTHClick(){
        if(this._isPlay)return;
        if(!this._data)return;
        let req:PetHandleNewTalent_req = new PetHandleNewTalent_req;
        req.petSerialNum = this._data.petSerialNum;
        req.type = this._type;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private _dec:string;
    private onBtnQClick(e:Laya.Event){
        if(this._dec){
            e.stopPropagation();
            MainModel.Ins.showSmallTips("", this._dec , e.target);
        }
    }

    private onRenderHandler(item:LingChongXMItem1,index:number){
        item.setData(item.dataSource,index,this._data);
    }

    private _data:stPet;
    protected onInit(): void {
        LingChongModel.Ins.on(LingChongModel.UPDATA_NEW_XM,this,this.onUpdataView);
        LingChongModel.Ins.on(LingChongModel.UPDATA_LEVEL_XM,this,this.onUpdataView);
        LingChongModel.Ins.on(LingChongModel.UPDATA_EQUIP_XM,this,this.onEquipUpdataView);
        LingChongModel.Ins.on(LingChongModel.UPDATA_XM_LOCK,this,this.onUpdataLab1View);
        this._isPlay = false;
        this._data = this.Data;
        this.creatAvatar();
        this.updataView();
    }

    protected onExit(): void {
        LingChongModel.Ins.off(LingChongModel.UPDATA_LEVEL_XM,this,this.onUpdataView);
        LingChongModel.Ins.off(LingChongModel.UPDATA_LEVEL_XM,this,this.onUpdataView);
        LingChongModel.Ins.off(LingChongModel.UPDATA_EQUIP_XM,this,this.onEquipUpdataView);
        LingChongModel.Ins.off(LingChongModel.UPDATA_XM_LOCK,this,this.onUpdataLab1View);
        if(this._avatar){
            this._avatar.dispose();
            this._avatar = null;
        }
        Laya.Tween.clearAll(this._ui.tImg);
    }

    private onUpdataView(){
        if(!this._data)return;
        this._data = LingChongModel.Ins.petDataList.find(ele => ele.petSerialNum == this._data.petSerialNum);
        this.updataView();
    }

    private onEquipUpdataView(revc:PetHandleNewTalent_revc){
        if(!this._data)return;
        this._data = LingChongModel.Ins.petDataList.find(ele => ele.petSerialNum == this._data.petSerialNum);
        if(revc.type == 2){
            this.updataView();
        }else{
            this.playTween(revc.idx);
        }
    }

    private playTween(index:number){
        this._isPlay = true;
        this._ui.tImg.visible = true;
        let listX = this._ui.list_xm.x + index * 91;
        let xx = listX + 60;
        let yy = 465;
        Laya.Tween.to(this._ui.tImg,{x:xx,y:yy,scaleX: 0.8, scaleY: 0.8},300,null,Laya.Handler.create(this,this.onTweenComplete));
    }

    private _isPlay:boolean;
    private onTweenComplete(){
        this._isPlay = false;
        this.updataView();
    }

    private updataView(){
        if(!this._data)return;
        this._ui.tImg.visible = false;
        let cfg:Configs.t_Pet_List_dat = PetListProxy.Ins.getCfgById(this._data.petId);
        this._ui.lab_name.text = cfg.f_petname;
        this._ui.lab_lv.text = "Lv." + this._data.petLevel;
        this._starCtl.setStar(this._data.petStar);
        this._ui.tab.img.skin = `remote/lingchong/tj${cfg.f_pettype}.png`;
        this._ui.tab.img2.visible = false;

        LingChongModel.Ins.xmLockIds = [];
        let array = [];
        let xmlv:number = 0;
        for(let i:number=0;i<cfg.f_talentslot;i++){
            if(this._data.petTalents[i]){
                array.push({data:this._data.petTalents[i]});
                xmlv += this._data.petTalents[i].talentLevel;
                if(this._data.petTalents[i].lock){
                    LingChongModel.Ins.xmLockIds.push(this._data.petTalents[i].talentId);
                }
            }else{
                array.push({data:null});
            }
        }

        this._ui.list_xm.array = array;
        this._ui.list_xm.x = (this._ui.box.width - array.length * 91) * 0.5;

        let qCfg = PetQualityProxy.Ins.getCfgById(cfg.f_petquality);
        if(this._data.petTalentIdToDo){
            this._ui.sp_th.visible = true;
            this._ui.sp_xm.visible = false;
            let tCfg:Configs.t_Pet_Talent_List_dat = PetTalentProxy.Ins.getCfgById(this._data.petTalentIdToDo);
            let tid = parseInt(tCfg.f_attr.split(":")[0]);
            let tval = parseInt(tCfg.f_attr.split(":")[1]) * 1;
            this._ui.quality.skin = IconUtils.getQuaIcon(tCfg.f_quality);
            this._ui.lab_attr.text = MainModel.Ins.getAttrNameIdByID(tid);
            this._dec = MainModel.Ins.getAttrNameIdByID(tid) + ":" + attrConvert(tid,tval);

            this._ui.tImg.x = 280;
            this._ui.tImg.y = 656;
            this._ui.tImg.scaleX = this._ui.tImg.scaleY = 1;
            this._ui.tImg.skin = IconUtils.getQuaIcon(tCfg.f_quality);
            this._ui.tlab.text = MainModel.Ins.getAttrNameIdByID(tid);
            if(this._data.petTalents.length < cfg.f_talentslot){
                this._ui.lab_th.text = "装备";
                this._ui.lab_thdec.text = "点击装备获得新的血脉天赋";
                this._type = 0;
                this._ui.btn_fq.visible = false;
                this._btnTHCtl.setpos(142,241);
            }else{
                this._ui.lab_th.text = "替换";
                this._ui.lab_thdec.text = "点击替换会随机替换一条血脉天赋，并继承等级";
                this._type = 1;
                this._ui.btn_fq.visible = true;
                this._btnTHCtl.setpos(291,241);
            }
        }else{
            this._ui.sp_th.visible = false;
            this._ui.sp_xm.visible = true;
            this.onUpdataLab1View();

            let val1 = parseInt(qCfg.f_bloodupcost.split("-")[1]);
            let addNum = parseInt(qCfg.f_bloodpreupcost.split("-")[1]);
            let xNum = val1 + (xmlv - this._data.petTalents.length) * addNum;
            this._ui.lab2.text = xNum + "";
            if(this._data.petTalents.length < cfg.f_talentslot){
                this._ui.sp_btn1.x = 147;
                this._ui.sp_btn2.visible = false;
                this._ui.lab_sz.visible = false;
                this._ui.sp_lab.visible = false;
            }else{
                this._ui.sp_lab.visible = true;
                this._ui.sp_btn1.x = 0;
                let allNum = 0;
                let num = 0;
                for(let i:number=0;i<this._data.petTalents.length;i++){
                    let cfg = PetTalentProxy.Ins.getCfgById(this._data.petTalents[i].talentId);
                    allNum += cfg.f_maxlevel;
                    num += this._data.petTalents[i].talentLevel;
                }
                if(num >= allNum){
                    this._ui.lab_sz.visible = true;
                    this._ui.sp_btn2.visible = false;
                }else{
                    this._ui.lab_sz.visible = false;
                    this._ui.sp_btn2.visible = true;
                }
            }
        }
    }

    private onUpdataLab1View(){
        if(!this._data)return;
        let cfg:Configs.t_Pet_List_dat = PetListProxy.Ins.getCfgById(this._data.petId);
        let qCfg = PetQualityProxy.Ins.getCfgById(cfg.f_petquality);
        let id = parseInt(qCfg.f_bloodgetcost.split("-")[0]);
        let val = parseInt(qCfg.f_bloodgetcost.split("-")[1]);
        this._ui.img1.skin = this._ui.img2.skin = IconUtils.getIconByCfgId(id);
        val = val * (LingChongModel.Ins.xmLockIds.length + 1);
        this._ui.lab1.text = val + "";

        if(LingChongModel.Ins.xmLockIds.length){
            this._ui.img1.x = 0;
            this._ui.lab1.x = 31;
            let arr = qCfg.f_bloodlockcost.split("|");
            let value = arr[LingChongModel.Ins.xmLockIds.length - 1];
            let id1 = parseInt(value.split("-")[0]);
            let val1 = parseInt(value.split("-")[1]);
            this._ui.img3.skin = IconUtils.getIconByCfgId(id1);
            this._ui.lab3.text = val1 + "";
        }else{
            this._ui.img1.x = 85;
            this._ui.lab1.x = 114;
            this._ui.img3.skin = ""
            this._ui.lab3.text = "";
        }
    }

    private _avatar:AvatarMonsterView;
    private creatAvatar(){
        if(!this._data)return;
        let cfg = PetListProxy.Ins.getCfgById(this._data.petId);
        if(this._avatar){
            this._avatar.dispose();
            this._avatar = null;
        }
        this._avatar = AvatarFactory.createPet(cfg.f_petid);
        this._avatar.play(EAvatarAnim.HandBookStand);
        this._avatar.dir = EAvatarDir.Left;
        this._ui.avatr.addChild(this._avatar);
    }
}
