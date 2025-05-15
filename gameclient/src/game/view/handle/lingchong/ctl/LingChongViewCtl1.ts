import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { SocketMgr } from "../../../../network/SocketMgr";
import { PetOnBattle_req, stPet } from "../../../../network/protocols/BaseProto";
import { AvatarFactory } from "../../avatar/AvatarFactory";
import { AvatarMonsterView } from "../../avatar/AvatarMonsterView";
import { EAvatarDir } from "../../avatar/AvatarView";
import { EAvatarAnim } from "../../avatar/vos/EAvatarAnim";
import { FuJiangStarCtl } from "../../fujiang/view/ctl/FuJiangStarCtl";
import { VipModel, VipType } from "../../huodong/model/VipModel";
import { EquipmentQualityProxy } from "../../main/model/EquipmentProxy";
import { MainModel } from "../../main/model/MainModel";
import { t_Platform } from "../../main/proxy/t_Platform";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { EClientType } from "../../sdk/ClientType";
import { LingChongModel } from "../model/LingChongModel";
import { PetConfigProxy, PetListProxy, PetSkillClientProxy } from "../proxy/LingChongProxy";
import { LingChongItem } from "../view/item/LingChongItem";
import { LingChongXMItem } from "../view/item/LingChongXMItem";

export class LingChongViewCtl1{
    protected _ui:ui.views.lingchong.ui_lingchongPYViewUI;

    private _starCtl:FuJiangStarCtl;

    constructor(skin:ui.views.lingchong.ui_lingchongPYViewUI) {
        this._ui = skin;

        this._ui.on(Laya.Event.DISPLAY,this,this.onAdd);
        this._ui.on(Laya.Event.UNDISPLAY,this,this.onRemove);

        ButtonCtl.Create(this._ui.btn_cz,new Laya.Handler(this,this.onBtnCZClick));
        ButtonCtl.Create(this._ui.btn_sz,new Laya.Handler(this,this.onBtnSZClick));
        ButtonCtl.Create(this._ui.btn_lv,new Laya.Handler(this,this.onBtnLvClick));
        ButtonCtl.Create(this._ui.btn_star,new Laya.Handler(this,this.onBtnStarClick));
        ButtonCtl.Create(this._ui.btn_xm,new Laya.Handler(this,this.onBtnXMClick));

        this._ui.list_lc.itemRender = LingChongItem;
        this._ui.list_lc.renderHandler = new Laya.Handler(this,this.onRenderHandler);
        this._ui.list_lc.selectEnable = true;

        this._ui.list_xm.itemRender = LingChongXMItem;
        this._ui.list_xm.renderHandler = new Laya.Handler(this,this.onXMRenderHandler);

        this._ui.list_attr.itemRender = ui.views.lingchong.ui_lingchongAttrItemUI;
        this._ui.list_attr.renderHandler = new Laya.Handler(this,this.onRenderHandller1);

        this._starCtl = new FuJiangStarCtl(this._ui.star);

        if(t_Platform.Ins.isOneLvUp){
            this._ui.lab_qd.text = "一键升级";
        }else{
            this._ui.lab_qd.text = "升级";
        }
    }

    private _index;
    private onRenderHandler(item:LingChongItem,index:number){
        if(index == -1)return;

        let flag = false;
        if(this._ui.list_lc.selectedIndex == index){
            let data = item.dataSource.data;
            if(data == null){
                this._ui.list_lc.selectedIndex = this._index;
                return;
            }
            this._index = this._ui.list_lc.selectedIndex;
            flag = true;
            this.updataView();
        }
        item.setData(item.dataSource,flag);
    }

    private onXMRenderHandler(item:LingChongXMItem,index:number){
        item.setData(item.dataSource,index);
    }
    
    private onRenderHandller1(item:ui.views.lingchong.ui_lingchongAttrItemUI){
        let id = parseInt(item.dataSource.split(":")[0]);
        let val = parseInt(item.dataSource.split(":")[1]);
        item.tf1.text = MainModel.Ins.getAttrNameIdByID(id) + ":";
        item.valTf.text = attrConvert(id,val);
    }

    private onBtnCZClick(){
        if (!this._data)return;
        let lv = 0;
        for (let i: number = 0; i < this._data.petTalents.length; i++) {
            lv += this._data.petTalents[i].talentLevel;
        }
        if (this._data.petLevel == 0 && lv <= this._data.petTalents.length && this._data.petStar == 0) {
            E.ViewMgr.ShowMidError("灵宠没有养成资源可以返还");//显示错误提示
            return;
        }
        E.ViewMgr.Open(EViewType.LingChongCZView, null, this._data);
    }

    private onBtnSZClick(){
        if (!this._data)return;
        let req:PetOnBattle_req = new PetOnBattle_req;
        req.petSerialNum = this._data.petSerialNum;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onBtnLvClick(){
        if (!this._data)return;
        E.ViewMgr.Open(EViewType.LingChongLVView, null, this._data);
    }

    private onBtnStarClick(){
        if (!this._data)return;
        E.ViewMgr.Open(EViewType.LingChongStarView, null, this._data);
    }

    private onBtnXMClick(){
        if (!this._data)return;
        E.ViewMgr.Open(EViewType.LingChongXMView, null, this._data);
    }

    public onAdd(){
        LingChongModel.Ins.on(LingChongModel.Updata_LingChong,this,this.onUpdataView);
        this._data = null;
        this._index = -1;
        this._updataIndex = -1;
        this._petanimid = 0;
        let arr = this.getList();
        this._ui.list_lc.array = arr;
        if(LingChongModel.Ins.petDataList.length){
            let indexx = 0;
            for(let i:number=0;i<arr.length;i++){
                if(arr[i].data && arr[i].data.onBattle){
                    indexx = i;
                    break;
                }
            }
            this._ui.list_lc.selectedIndex = indexx;
            this._ui.list_lc.scrollTo(indexx);
            this._ui.sp.visible = true;
            this._ui.sp_k.visible = this._ui.lab_k.visible = false;
        }else{
            this._ui.list_lc.selectedIndex = -1;
            this._ui.sp.visible = false;
            this._ui.sp_k.visible = this._ui.lab_k.visible = true;
        }
    }

    public onRemove(){
        LingChongModel.Ins.off(LingChongModel.Updata_LingChong,this,this.onUpdataView);
        this._ui.list_lc.selectedIndex = -1;
        if(this._avatar){
            this._avatar.dispose();
            this._avatar = null;
        }
    }

    private _updataIndex:number;
    private getList(){
        let arr = LingChongModel.Ins.petDataList.sort(LingChongModel.Ins.petSort);
        if(this._data){
            this._updataIndex = arr.findIndex(ele => ele.petSerialNum == this._data.petSerialNum);
        }
        let len;
        if(initConfig.clienttype == EClientType.Discount){
            len = VipModel.Ins.getVipTQByType(VipType.PetBag);
        }else{
            len = PetConfigProxy.Ins.List[0].f_bagmax;
        }
        let array = [];
        for(let i:number=0;i<len;i++){
            let obj:any = {};
            if(arr[i]){
                obj.data = arr[i];
            }else{
                obj.data = null;
            }
            array.push(obj);
        }
        return array;
    }

    private onUpdataView(){
        if(!this._data)return;
        this._ui.list_lc.array = this.getList();
        if(this._updataIndex != -1){
            this._ui.list_lc.selectedIndex = this._updataIndex;
        }
        this.updataView();
    }

    private _data:stPet;
    private updataView(){
        this._data = this._ui.list_lc.array[this._ui.list_lc.selectedIndex].data;
        if(!this._data)return;
        this.creatAvatar();
        let cfg:Configs.t_Pet_List_dat = PetListProxy.Ins.getCfgById(this._data.petId);
        this._ui.lab_name.text = cfg.f_petname;
        this._ui.lab_name.color = "#" + EquipmentQualityProxy.Ins.getByQua(cfg.f_petquality).f_Color;
        this._ui.lab_lv.text = "Lv." + this._data.petLevel;
        this._starCtl.setStar(this._data.petStar);
        this._ui.list_attr.array = LingChongModel.Ins.getAttrArr(cfg.f_petid,this._data.petLevel,this._data.petStar);
        this._ui.tab.img.skin = `remote/lingchong/tj${cfg.f_pettype}.png`;
        this._ui.tab.img2.visible = false;
        if(this._data.onBattle){
            this._ui.btn_sz.visible = false;
            this._ui.lab_sz.visible = true;
        }else{
            this._ui.btn_sz.visible = true;
            this._ui.lab_sz.visible = false;
        }

        let sCfg = PetSkillClientProxy.Ins.getCfgById(cfg.f_petskillid);
        this._ui.jnItem.lab.text = sCfg.f_skillname;
        let lv = LingChongModel.Ins.getSkillLv(this._data.petStar);
        this._ui.jnItem.lab_lv.text = "Lv." + lv;
        this._ui.lab_jn.text = LingChongModel.Ins.getSkillDec(cfg.f_petskillid,lv);

        let array = [];
        for(let i:number=0;i<this._data.petTalents.length;i++){
            array.push({data:this._data.petTalents[i]});
        }
        this._ui.list_xm.array = array;
    }

    private _avatar:AvatarMonsterView;
    private _petanimid:number;
    private creatAvatar(){
        if(!this._data)return;
        let cfg = PetListProxy.Ins.getCfgById(this._data.petId);
        if(this._petanimid == cfg.f_petanimid){
            return;
        }
        if(this._avatar){
            this._avatar.dispose();
            this._avatar = null;
        }
        this._avatar = AvatarFactory.createPet(cfg.f_petid);
        this._petanimid = cfg.f_petanimid;
        this._avatar.play(EAvatarAnim.HandBookStand);
        this._avatar.dir = EAvatarDir.Left;
        this._ui.avatr.addChild(this._avatar);
    }
}