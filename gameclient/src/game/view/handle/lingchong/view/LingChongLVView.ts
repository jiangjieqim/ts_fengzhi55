import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { SocketMgr } from "../../../../network/SocketMgr";
import { PetUpgradeLevel_req, stPet } from "../../../../network/protocols/BaseProto";
import { AvatarFactory } from "../../avatar/AvatarFactory";
import { AvatarMonsterView } from "../../avatar/AvatarMonsterView";
import { EAvatarDir } from "../../avatar/AvatarView";
import { EAvatarAnim } from "../../avatar/vos/EAvatarAnim";
import { FuJiangStarCtl } from "../../fujiang/view/ctl/FuJiangStarCtl";
import { EGameColor } from "../../main/model/EGameColor";
import { MainModel } from "../../main/model/MainModel";
import { t_Platform } from "../../main/proxy/t_Platform";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { XianShiLiBaoModel, XianShiLiBaoType } from "../../xianshilibao/model/XianShiLiBaoModel";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { LingChongModel } from "../model/LingChongModel";
import { PetListProxy, PetQualityProxy, PetUpGradeProxy } from "../proxy/LingChongProxy";

export class LingChongLVView extends ViewBase{
    private _ui:ui.views.lingchong.ui_lingchongLvViewUI;
    protected mMask = true;
    protected mMainSnapshot = true;

    private _starCtl:FuJiangStarCtl;

    protected onAddLoadRes() {}

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.lingchong.ui_lingchongLvViewUI;
            this.bindClose(this._ui.btn_close);

            ButtonCtl.Create(this._ui.btn_lv,new Laya.Handler(this,this.onBtnLVClick));

            this._starCtl = new FuJiangStarCtl(this._ui.star);

            this._ui.list_attr.itemRender = ui.views.lingchong.ui_lingchongAttrItemUI;
            this._ui.list_attr.renderHandler = new Laya.Handler(this,this.onRenderHandller1);

            if(t_Platform.Ins.isOneLvUp){
                this._ui.labb.text = "一键升级";
            }else{
                this._ui.labb.text = "升级";
            }
        }
    }

    private onRenderHandller1(item:ui.views.lingchong.ui_lingchongAttrItemUI){
        let id = parseInt(item.dataSource.split(":")[0]);
        let val = parseInt(item.dataSource.split(":")[1]);
        item.tf1.text = MainModel.Ins.getAttrNameIdByID(id) + ":";
        item.valTf.text = attrConvert(id,val);
    }

    private onBtnLVClick(){
        if(this._data){
            let req:PetUpgradeLevel_req = new PetUpgradeLevel_req;
            req.petSerialNum = this._data.petSerialNum;
            if(t_Platform.Ins.isOneLvUp){
                req.cnt = this._lvNum;
            }
            SocketMgr.Ins.SendMessageBin(req);
            XianShiLiBaoModel.Ins.sendCmd(XianShiLiBaoType.Pet);
        }
    }

    private _data:stPet;
    protected onInit(): void {
        LingChongModel.Ins.on(LingChongModel.Updata_LingChong,this,this.onUpdataView);
        this._data = this.Data;
        this.creatAvatar();
        this.updataView();
    }

    protected onExit(): void {
        LingChongModel.Ins.off(LingChongModel.Updata_LingChong,this,this.onUpdataView);
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

    private _lvNum:number;
    private updataView(){
        if(!this._data)return;
        let cfg:Configs.t_Pet_List_dat = PetListProxy.Ins.getCfgById(this._data.petId);
        let qCfg = PetQualityProxy.Ins.getCfgById(cfg.f_petquality);
        this._ui.lab_name.text = cfg.f_petname;
        this._ui.lab_lv.text = "Lv." + this._data.petLevel;
        this._starCtl.setStar(this._data.petStar);
        this._ui.lab_maxLv.text = "Lv." + qCfg.f_maxlevel;
        this._ui.list_attr.array = LingChongModel.Ins.getAttrArr(this._data.petId,this._data.petLevel,this._data.petStar);
        this._ui.tab.img.skin = `remote/lingchong/tj${cfg.f_pettype}.png`;
        this._ui.tab.img2.visible = false;

        if(this._data.petLevel >= qCfg.f_maxlevel){
            this._ui.addbtn.visible = false;
            this._ui.btn_lv.visible = false;
            this._ui.lab_sz.visible = true;
        }else{
            this._ui.addbtn.visible = true;
            this._ui.btn_lv.visible = true;
            this._ui.lab_sz.visible = false;
            let id;
            let xNum;
            let val;
            if(t_Platform.Ins.isOneLvUp){
                let uCfg:Configs.t_Pet_UpGrade_dat = PetUpGradeProxy.Ins.getCfgByQuaAndLv(cfg.f_petquality,this._data.petLevel);
                id = parseInt(uCfg.f_LevelConsume.split("-")[0]);
                val = MainModel.Ins.mRoleData.getVal(id);
                xNum = parseInt(uCfg.f_LevelConsume.split("-")[1]);
                this._lvNum = 0;
            }else{
                id = parseInt(qCfg.f_initicost.split("-")[0]);
                val = MainModel.Ins.mRoleData.getVal(id);
                let num = parseInt(qCfg.f_initicost.split("-")[1]);
                let addNum = parseInt(qCfg.f_preupgrade.split("-")[1]);
                xNum = num + this._data.petLevel * addNum;
                this._lvNum = 0;
                let count = 0;
                for (let i: number = this._data.petLevel; i < qCfg.f_maxlevel; i++) {
                    count += num + i * addNum;
                    if (val >= count) {
                        this._lvNum++;
                    } else {
                        break;
                    }
                }
            }
            this._ui.yuanbaoicon.skin = IconUtils.getIconByCfgId(id);
            this._ui.goldtf.text = StringUtil.val3m(val);
            this._ui.lab_x.text = "/"  + xNum;
            if(val >= xNum){
                this._ui.goldtf.color = EGameColor.GREED;
            }else{
                this._ui.goldtf.color = EGameColor.NotEnough;
            }
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
        this._avatar.dir = EAvatarDir.Left
        this._ui.avatr.addChild(this._avatar);
    }
}