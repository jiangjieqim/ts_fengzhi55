import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { SocketMgr } from "../../../../network/SocketMgr";
import { PetUpgradeStar_req, stPet } from "../../../../network/protocols/BaseProto";
import { AvatarFactory } from "../../avatar/AvatarFactory";
import { AvatarMonsterView } from "../../avatar/AvatarMonsterView";
import { EAvatarDir } from "../../avatar/AvatarView";
import { EAvatarAnim } from "../../avatar/vos/EAvatarAnim";
import { FuJiangStarCtl } from "../../fujiang/view/ctl/FuJiangStarCtl";
import { EGameColor } from "../../main/model/EGameColor";
import { MainModel } from "../../main/model/MainModel";
import { EQuickMsg } from "../../main/model/QuickMsgVo";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { EClientType } from "../../sdk/ClientType";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { LingChongModel } from "../model/LingChongModel";
import { PetListProxy, PetQualityProxy, PetSkillClientProxy, PetUpStarProxy } from "../proxy/LingChongProxy";
import { LingChongStarItem } from "./item/LingChongStarItem";

export class LingChongStarView extends ViewBase{
    private _ui:ui.views.lingchong.ui_lingchongStarViewUI;
    protected mMask = true;
    protected mMainSnapshot = true;

    private _starCtl:FuJiangStarCtl;
    private _selectList:stPet[];

    protected onAddLoadRes() {}

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.lingchong.ui_lingchongStarViewUI;
            this.bindClose(this._ui.btn_close);

            ButtonCtl.Create(this._ui.btn_star,new Laya.Handler(this,this.onBtnStarClick));
            ButtonCtl.Create(this._ui.btn_star1,new Laya.Handler(this,this.onBtnStar1Click));

            this._starCtl = new FuJiangStarCtl(this._ui.star);

            this._ui.list.itemRender = LingChongStarItem;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandller);
            this._ui.list.selectEnable = true;
            this._ui.list.selectHandler = new Laya.Handler(this,this.onSelectHandller);

            this._ui.list_attr.itemRender = ui.views.lingchong.ui_lingchongAttrItem1UI;
            this._ui.list_attr.renderHandler = new Laya.Handler(this,this.onRenderHandller1);
        }
    }

    private onRenderHandller(item:LingChongStarItem){
        let index = this._selectList.findIndex(ele => ele == item.dataSource);
        if(index != -1){
            item.setData(item.dataSource,true);
        }else{
            item.setData(item.dataSource,false);
        }
    }

    private onSelectHandller(index:number){
        if(index == -1)return;
        if(!this._data)return;
        if(!this._qCfg)return;
        let num = this._data.petStar + this._selectStarNum;
        let indexx = this._selectList.findIndex(ele => ele == this._ui.list.array[index]);
        if(num >= this._qCfg.f_maxstar){
            if(indexx == -1){
                return;
            }
        }
        if(indexx == -1){
            this._selectList.push(this._ui.list.array[index]);
        }else{
            this._selectList.splice(indexx,1);
        }
        this._selectStarNum = this.getStarNum();
        num = this._data.petStar + this._selectStarNum;
        this._ui.list.refresh();
        this._ui.list_attr.refresh();
        this._ui.list.selectedIndex = -1;
        if(num >= this._qCfg.f_maxstar){
            this._starCtl.setStar(this._qCfg.f_maxstar);
        }else{
            this._starCtl.setStar(num);
        }
        this.setSkillView(this._data.petStar,this._selectStarNum);
        this.updataStarBtn();
    }

    private onRenderHandller1(item:ui.views.lingchong.ui_lingchongAttrItem1UI){
        let id = parseInt(item.dataSource.split(":")[0]);
        let val = parseInt(item.dataSource.split(":")[1]);
        item.tf1.text = MainModel.Ins.getAttrNameIdByID(id) + ":";
        item.valTf.text = attrConvert(id,val);
        if(this._selectStarNum){
            if(this._qCfg){
                let arr = this._qCfg.f_upstarvalue.split("|");
                let addVal = 0;
                for(let i:number=0;i<arr.length;i++){
                    let idd = parseInt(arr[i].split(":")[0]);
                    if(idd == id){
                        addVal = parseInt(arr[i].split(":")[1]);
                        break;
                    }
                }
                if(addVal){
                    item.valTf1.text = "(+" + attrConvert(id,addVal * this._selectStarNum) + ")";
                }else{
                    item.valTf1.text = "";
                }
            }
        }else{
            item.valTf1.text = "";
        }
    }

    private _selectStarNum;
    private getStarNum(){
        let num = 0;
        if(initConfig.clienttype == EClientType.Discount){
            for(let i:number=0;i<this._selectList.length;i++){
                num += this._selectList[i].petStarSurplus + 1;
                for(let j:number= 0;j<this._selectList[i].petStar;j++){
                    let starCfg = PetUpStarProxy.Ins.getCfgByQuaAndStar(this._qCfg.f_quality,j);
                    num += parseInt(starCfg.f_StarConsume.split("-")[1]);
                }
            }
            num += this._data.petStarSurplus;
            let num1:number = 0;
            for(let i:number = this._data.petStar;i<this._qCfg.f_maxstar;i++){
                let cfg:Configs.t_Pet_UpStar_dat = PetUpStarProxy.Ins.getCfgByQuaAndStar(this._qCfg.f_quality,i);
                if(num >= parseInt(cfg.f_StarConsume2)){
                    num -= parseInt(cfg.f_StarConsume2);
                    num1 ++;
                }
            }
            return num1;
        }else{
            for(let i:number=0;i<this._selectList.length;i++){
                num += this._selectList[i].petStar + 1;
            }
            return num;
        }
    }

    private onBtnStarClick() {
        if (!this._data) return;
        if (this._selectList.length == 0) return;
        let flag = false;
        for (let i: number = 0; i < this._selectList.length; i++) {
            if (this._selectList[i].petLevel) {
                flag = true;
            }
            if (this._selectList[i].petStar) {
                flag = true;
            }
            let num = 0;
            let talents = this._selectList[i].petTalents;
            for (let j: number = 0; j < talents.length; j++) {
                num += talents[j].talentLevel;
            }
            if (num > talents.length) {
                flag = true;
            }
        }
        if (flag) {
            MainModel.Ins.queryMsg("选择灵宠已升级、觉醒或升星!升星后只返还部分养成素材,是否确认升星？", 0, 0, EQuickMsg.NULL, new Laya.Handler(this, this.sendCmd));
        } else {
            this.sendCmd();
        }
    }

    private onBtnStar1Click(){
        let req:PetUpgradeStar_req = new PetUpgradeStar_req;
        req.petSerialNum = this._data.petSerialNum;
        req.sameQuaPetSerialNums = [];
        req.type = 1;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private sendCmd(){
        let array = [];
        for(let i:number=0;i<this._selectList.length;i++){
            array.push(this._selectList[i].petSerialNum);
        }
        let req:PetUpgradeStar_req = new PetUpgradeStar_req;
        req.petSerialNum = this._data.petSerialNum;
        req.sameQuaPetSerialNums = array;
        req.type = 0;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private _data:stPet;
    private _qCfg:Configs.t_Pet_Quality_dat;
    protected onInit(): void {
        LingChongModel.Ins.on(LingChongModel.Updata_LingChong,this,this.onUpdataView);
        this._data = this.Data;
        this.creatAvatar();
        this.updataView();
    }

    protected onExit(): void {
        LingChongModel.Ins.off(LingChongModel.Updata_LingChong,this,this.onUpdataView);
        this._ui.list.selectedIndex = -1;
        if(this._avatar){
            this._avatar.dispose();
            this._avatar = null;
        }
    }

    private onUpdataView(){
        if(!this._data)return;
        this._data = LingChongModel.Ins.petDataList.find(ele => ele.petSerialNum == this._data.petSerialNum);
        this.updataView();
    }

    private updataView(){
        if(!this._data)return;
        this._selectList = [];
        let cfg:Configs.t_Pet_List_dat = PetListProxy.Ins.getCfgById(this._data.petId);
        this._qCfg = PetQualityProxy.Ins.getCfgById(cfg.f_petquality);
        this._ui.lab_name.text = cfg.f_petname;
        this._ui.lab_lv.text = "Lv." + this._data.petLevel;
        this._starCtl.setStar(this._data.petStar);
        this._ui.tab.img.skin = `remote/lingchong/tj${cfg.f_pettype}.png`;
        this._ui.tab.img2.visible = false;

        let arr = LingChongModel.Ins.petDataList.sort(LingChongModel.Ins.petSort);
        let array = [];
        for (let i: number = 0; i < arr.length; i++) {
            if(arr[i].petSerialNum == this._data.petSerialNum){
                continue;
            }
            if(arr[i].onBattle){
                continue;
            }
            if(arr[i].petId == this._data.petId){
                array.push(arr[i]);
            }
        }
        this._ui.list.array = array;

        this._selectStarNum = this.getStarNum();
        this._ui.list_attr.array = LingChongModel.Ins.getAttrArr(this._data.petId,this._data.petLevel,this._data.petStar);

        this.setSkillView(this._data.petStar);
        if(this._data.petStar >= this._qCfg.f_maxstar){
            this._ui.lab_sz.visible = true;
            this._ui.btn_star.visible = false;
            this._ui.lab_sz1.visible = true;
            this._ui.btn_star1.visible = false;
            this._ui.addbtn.visible = false;
            this._ui.sp.visible = false;
        }else{
            this._ui.lab_sz.visible = false;
            this._ui.btn_star.visible = true;
            this._ui.lab_sz1.visible = false;
            this._ui.btn_star1.visible = true;
            this._ui.addbtn.visible = true;

            let qCfg = PetQualityProxy.Ins.getCfgById(cfg.f_petquality);
            let id;
            let num;
            if(initConfig.clienttype == EClientType.Discount){
                let uCfg:Configs.t_Pet_UpStar_dat = PetUpStarProxy.Ins.getCfgByQuaAndStar(cfg.f_petquality,this._data.petStar);
                id = parseInt(uCfg.f_StarConsume.split("-")[0]);
                num = parseInt(uCfg.f_StarConsume.split("-")[1]);
            }else{
                id = parseInt(qCfg.f_upstarcost.split("-")[0]);
                num = parseInt(qCfg.f_upstarcost.split("-")[1]);
            }
            let val = MainModel.Ins.mRoleData.getVal(id);
            this._ui.yuanbaoicon.skin = IconUtils.getIconByCfgId(id);
            this._ui.goldtf.text = StringUtil.val3m(val);
            this._ui.lab_x.text = "/"  + num;
            if(val >= num){
                this._ui.goldtf.color = EGameColor.GREED;
            }else{
                this._ui.goldtf.color = EGameColor.NotEnough;
            }
            if(initConfig.clienttype == EClientType.Discount){
                this._ui.sp.visible = true;
            }else{
                this._ui.sp.visible = false;
            }
            this.updataStarBtn();
        }
    }

    private updataStarBtn(){
        if(initConfig.clienttype == EClientType.Discount){
            let num = this._data.petStarSurplus;
            for (let i: number = 0; i < this._selectList.length; i++) {
                num += this._selectList[i].petStarSurplus + 1;
                for(let j:number= 0;j<this._selectList[i].petStar;j++){
                    let starCfg = PetUpStarProxy.Ins.getCfgByQuaAndStar(this._qCfg.f_quality,j);
                    num += parseInt(starCfg.f_StarConsume.split("-")[1]);
                }
            }
            let cfg:Configs.t_Pet_UpStar_dat = PetUpStarProxy.Ins.getCfgByQuaAndStar(this._qCfg.f_quality,this._data.petStar);
            this._ui.lab_jdt.text = num + "/" + cfg.f_StarConsume2;
            let wd = num / parseInt(cfg.f_StarConsume2);
            if(wd > 1){
                wd = 1;
            }
            this._ui.img_jdt.width = wd * 326;
            if(this.getStarNum() >= 1){
                this._ui.btn_star.disabled = false;
            }else{
                this._ui.btn_star.disabled = true;
            }
        }else{
            if(this._selectList.length == 0){
                this._ui.btn_star.disabled = true;
            }else{
                this._ui.btn_star.disabled = false;
            }
        }
    }

    private setSkillView(star:number,add:number = 0){
        if(!this._data)return;
        if(!this._qCfg)return;
        let addStar = star + add;
        if(addStar > this._qCfg.f_maxstar){
            addStar = this._qCfg.f_maxstar;
            add = this._qCfg.f_maxstar - star;
        }
        if(add){
            this._ui.valTf1.text = "技能等级+" + add;
            this._ui.item_jn.lab_lv.color = "#24C6FF";
        }else{
            this._ui.valTf1.text = "";
            this._ui.item_jn.lab_lv.color = "#FFEBD2";
        }
        let cfg:Configs.t_Pet_List_dat = PetListProxy.Ins.getCfgById(this._data.petId);
        let sCfg = PetSkillClientProxy.Ins.getCfgById(cfg.f_petskillid);
        this._ui.item_jn.lab.text = sCfg.f_skillname;
        let lv = LingChongModel.Ins.getSkillLv(addStar);
        this._ui.item_jn.lab_lv.text = "Lv." + lv;
        this._ui.lab_jn.text = LingChongModel.Ins.getSkillDec(cfg.f_petskillid,lv);
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