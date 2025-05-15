import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { Reward_req, stSkin } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import { AvatarFactory } from "../../avatar/AvatarFactory";
import { AvatarMonsterView } from "../../avatar/AvatarMonsterView";
import { EAvatarDir } from "../../avatar/AvatarView";
import { PlusCtl } from "../../avatar/ctl/PlusCtl";
import { EAvatarAnim } from "../../avatar/vos/EAvatarAnim";
import { Enemy_ImageProxy } from "../../main/model/AdventureProxy";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainModel } from "../../main/model/MainModel";
import { AdventureLevelProxy } from "../../main/proxy/AdventureLevelProxy";
import { EFightType } from "../../main/vos/ECellType";

export class FightOpenView extends ViewBase{
    protected autoFree = true;
    private _ui:ui.views.maoxian.ui_maoxianUI;
    protected mMask = true;
    private model:MainModel;
    private cfg:Configs.t_Adventure_Level_dat;
    private monsterView:AvatarMonsterView;
    private _plusCtl:PlusCtl = new PlusCtl();
    protected onFirstInit() {
        if(!this.UI){
            this.model = MainModel.Ins;
            this.UI = this._ui = new ui.views.maoxian.ui_maoxianUI();
            // this._ui.bg.on(Laya.Event.CLICK,this,this.bgHandler);
            this.btnList.push(
            ButtonCtl.Create(this._ui.fightbtn,new Laya.Handler(this,this.onFightHandler)),
            ButtonCtl.Create(this._ui.close1,new Laya.Handler(this,this.Close)),
            ButtonCtl.Create(this._ui.chapterBtn,new Laya.Handler(this,this.onLingqu))
            )
            this._ui.monsterTf.visible = false;
        }
    }

    private onLingqu(){
        let req:Reward_req = new Reward_req();
        req.type = EFightType.Adventure;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onFightHandler(){
        // console.log("开始战斗");
        // E.ViewMgr.Open(EViewType.FightMain);
        this.model.adventureEnter();
        // this.Close();
        // E.ViewMgr.openWait();
    }

    protected onExit() {
        if(this.monsterView){
            this.monsterView.stop();
        }
        this.monsterView.dispose();
        this.monsterView = null;
    }
    protected onAddLoadRes() {
        this.addAtlas("maoxian.atlas");
    }
    protected onAddEventListener() {

    }

    protected onEnter() {
    
    }
    protected onInit() {
       this.UpdateView();
    }

    public UpdateView(){
        this.cfg = this.model.adventureVo.curCfg;//AdventureProxy.Ins.getCfg(this.model.adventData.id);
        this._ui.guankaTf.text =  AdventureLevelProxy.Ins.getChapterName(this.cfg); //this.cfg.f_Chapter + this.cfg.f_ChapterID + "-" + this.cfg.f_unitid;
        // this._ui.plugs.value = this.model.adventureVo.revcData.plus.toString();
        this._plusCtl.setPlus(this._ui.plugs,this.model.adventureVo.revcData.plus);
        let _imgcfg:Configs.t_Enemy_Image_dat = Enemy_ImageProxy.Ins.getCfg(this.cfg.f_EnamyImage);
        let skin:stSkin = Enemy_ImageProxy.Ins.toTSkin(_imgcfg);
        //#####################################
        if(this.monsterView){
            this.monsterView.dispose();
        }
        this.monsterView = AvatarFactory.createFightMonsterAvatar(EAvatarDir.Left,_imgcfg.f_MountID,_imgcfg.f_WingID,false,_imgcfg.f_ImageID);
        this._ui.heroContainer.addChild(this.monsterView);
        this.monsterView.start();
        this.monsterView.play(EAvatarAnim.NormalStand);
        //#####################################

        this.monsterView.mSkin = skin;
        if(this.model.adventureVo.isChapterRewardFinished){
            this._ui.chapterBtn.visible = false;
            this._ui.iconContainer.visible = false;
        }else{
            this._ui.chapterBtn.visible = true;
            this._ui.iconContainer.visible = true;
            let nextCfg:Configs.t_Adventure_Level_dat = this.model.adventureVo.nextCfg;
            if(nextCfg){
                ItemViewFactory.renderItemSlots(this._ui.iconContainer,nextCfg.f_ChapterReward);
                let chapter = nextCfg.f_ChapterID + '-' + nextCfg.f_unitid;
                this._ui.chapterContentTf.text = `通过章节${chapter}后获得`;
            }else{
                ItemViewFactory.renderItemSlots(this._ui.iconContainer,"");
                this._ui.chapterContentTf.text = "";
            }
        }
        //关卡奖励
        ItemViewFactory.renderItemSlots(this._ui.tgContainer,this.cfg.f_LevelReward1);
    }
}