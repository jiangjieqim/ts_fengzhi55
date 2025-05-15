import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { RowMoveBaseNode } from "../../../../../frame/view/ScrollPanelControl";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { NewAdventureFight_req, stSkin } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { AvatarFactory } from "../../avatar/AvatarFactory";
import { AvatarMonsterView } from "../../avatar/AvatarMonsterView";
import { EAvatarDir } from "../../avatar/AvatarView";
import { PlusCtl } from "../../avatar/ctl/PlusCtl";
import { EAvatarAnim } from "../../avatar/vos/EAvatarAnim";
import { DotManager } from "../../common/DotManager";
import { t_Spirit_Quality } from "../../herohouse/model/GymProxy";
import { Enemy_ImageProxy } from "../../main/model/AdventureProxy";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainModel } from "../../main/model/MainModel";
import { SoltItemView, SoltItemView2 } from "../../main/views/icon/SoltItemView";
import { f_headViewUpdate } from "../../soul/views/SoulIconItem";
import { ENewAdventure } from "../model/ENewAdventure";
import { NewAdventureEvent } from "../model/NewAdventureEvent";
import { NewAdventureModel } from "../NewAdventureModel";
import { IClearUpItem } from "./NewAdventureCleanUpView";
import { AdventureItemVo, EAdventureItemType } from "./NewAdventureMainView";
export interface IGetFromPool{
    getFromPool():Laya.Sprite;
}
export class NewAdverntRewardSmallIcon extends ui.views.main.ui_slot_item2UI{
    public static Sign:string = "NewAdverntRewardSmallIcon";
    private _curQua:number;
    constructor(){
        super();
        this.tf1.text = "";    
        this.on(Laya.Event.CLICK,this,this.onClickHandler);
    }

    private onClickHandler(e:Laya.Event){
        e.stopPropagation();
        let cfg:Configs.t_Spirit_Quality_dat = t_Spirit_Quality.Ins.GetDataById(this._curQua);
        MainModel.Ins.showSmallTips(cfg.f_QualityName, cfg.f_desc, this);
    }

    public setData(_curQua:number){
        this._curQua = _curQua;
        let cfg:Configs.t_Spirit_Quality_dat = t_Spirit_Quality.Ins.GetDataById(_curQua);
        let _imgSt = `o/spirits/${cfg.f_IconAdress}`;
        this.icon.skin = _imgSt;
    }
}
/**可扫荡的skin */
export class NewAdventureItemView0 extends ui.views.maoxian2.ui_maoxian2_item0UI {
    private lingquCtl:ButtonCtl;
    private saodanbtnCtl:ButtonCtl;//可扫荡的按钮
    // private imgs:Laya.Image[];
    private _clearVo:IClearUpItem;
    public vo:AdventureItemVo;
    constructor(){
        super();
        // this.graphics.drawRect(0,0,this.width,this.height,null,"#ff0000",1);

        this.init();
    }
    private init(){
        this.lingquCtl = ButtonCtl.CreateBtn(this.lingquBtn,this,this.onLingQu);
        this.saodanbtnCtl = ButtonCtl.CreateBtn(this.saodanbtn,this,this.onSaoDan);
        DotManager.addDot(this.lingquBtn);

        // let imgs:Laya.Image[] = [];

        // for(let i = 0;i < 3;i++){
        //     let img:Laya.Image = this["img"+i];
        //     img.on(Laya.Event.CLICK,this,this.onClickHandler);
        //     imgs.push(img);
        // }
        // this.imgs = imgs;

        this.yitongguan.visible = false;
    }

    private updateClearBtn(){
        /*
        if (this.saodanbtnCtl.visible) {
            if (NewAdventureModel.Ins.cleanUpVo.mFree) {
                DotManager.addDot(this.saodanbtn);
            }
            else {
                DotManager.removeDot(this.saodanbtn);
            }
        }
        */
    }


    /**扫荡 */
    private onSaoDan(){
        E.ViewMgr.Open(EViewType.NewAdventureCleanUp,null,this._clearVo);
    }

    // private onClickHandler(e:Laya.Event){
    //     let cfg:Configs.t_Spirit_Quality_dat = (e.target as Laya.Image).dataSource;
    //     MainModel.Ins.showSmallTips(cfg.f_QualityName, cfg.f_desc, e.target);
    // }
    /**领取 */
    private onLingQu(){
        let req = new NewAdventureFight_req();
        req.type = ENewAdventure.Get;
        req.adventureId = this.vo.levelId;
        SocketMgr.Ins.SendMessageBin(req);
    }
    // private showLittleIcon(){
        // this._clearVo.imgList = this.vo.quaShow;
        //this.littleCon.visible = true;
        // let qua:number[] = this.vo.quaShow;
        // for(let i = 0;i < this.imgs.length;i++){
        //     let img= this.imgs[i];
        //     let _curQua = qua[i];
        //     if(_curQua!=undefined){
        //         img.visible = true;
        //         let cfg:Configs.t_Spirit_Quality_dat = t_Spirit_Quality.Ins.GetDataById(_curQua);
        //         img.dataSource = cfg;
        //         let _imgSt = `o/spirits/${cfg.f_IconAdress}`;
        //         img.skin = _imgSt;
        //         this._clearVo.imgList.push(_curQua);
        //     }else{
        //         img.visible = false;
        //     }
        // }
    // }
    public clear(){
        ItemViewFactory.clear(this.rewardCon2,NewAdverntRewardSmallIcon.Sign);
        ItemViewFactory.clear(this.rewardCon,"SoltItemView2");
    }

    public refreshView(){
        let _clearVo = {} as IClearUpItem;
        this._clearVo = _clearVo;
        _clearVo.levelId = this.vo.levelId;
        this.updateClearBtn();
        this.nametf.text = this.vo.chapterName; 
        // this.icon.skin = this.vo.headimg;
        f_headViewUpdate(this.icon,this.vo.cfg.f_headIcon);
        this.littleCon.visible = false;
        this.saodanbtnCtl.visible = false;
        this.lingquCtl.visible = false;
        this.clear();

        let isSweep:boolean = false;
        if(this.vo.type == EAdventureItemType.Clearance){
            //已经通关了
            // this.yitongguan.visible = false;
            // this.saodanbtnCtl.visible = true;
            isSweep = true;
        }else if(this.vo.type == EAdventureItemType.Pre){
            // this.yitongguan.visible = false;
            if (this.vo.bCleanUp) {
                isSweep = true;
            } else {
                //显示领取按钮
                _clearVo.rewardStr = this.vo.cfg.f_ChapterReward;

                ItemViewFactory.renderItemSlots(this.rewardCon,this.vo.cfg.f_ChapterReward,0,1,"left",SoltItemView2,"SoltItemView2");
                this.lingquCtl.visible = true;
            }
        }
        if(isSweep){
        // if (this.vo.mCompleteCheck){
            //不在最后章节,但是已经完成所有的关卡
            // this.yitongguan.visible = true;
        // } else {
            //可扫荡状态的时候显示
            this._clearVo.adverntRewardQuas = this.vo.quaShow;
            //显示扫荡按钮
            this.yitongguan.visible = false;
            this.saodanbtnCtl.visible = true;
            ItemViewFactory.renderItemSlots(this.rewardCon2, this.vo.quaShow, 0, 1, "left",NewAdverntRewardSmallIcon, NewAdverntRewardSmallIcon.Sign);
        // }
        }
    }
}
/**已经通关 '可扫荡' 或者显示'已通关'的情况 */
export class NewAdventureItemView extends RowMoveBaseNode{
    public static getFromPool(){
        let skin = Laya.Pool.getItemByClass("NewAdventureItemView0", NewAdventureItemView0);
        return skin;
    }

    protected clsKey: string = "NewAdventureItemView0";

    private skin:NewAdventureItemView0;

    protected createNode(index) {
        let skin: NewAdventureItemView0 = Laya.Pool.getItemByClass(this.clsKey, NewAdventureItemView0);
        this.skin = skin;
        skin.vo = this.list[index];
        skin.refreshView();

        // let skin = new Laya.Sprite();
        // skin.graphics.drawRect(0,0,100,150,null,"#ff0000",1);
        DebugUtil.drawTF(this.skin,skin.vo.levelId.toString());
        skin.y = this.y;
        return skin;
    }
    protected clear(){
        super.clear();
        if(this.skin){
            this.skin.clear();
        }
    }
}

/**当前挑战中的skin */
class CurNewAdventureItemViewSkin extends ui.views.maoxian2.ui_maoxian2_item1UI{
    public vo:AdventureItemVo;

    private tiaozhanBtnCtl:ButtonCtl;
    private monsterView:AvatarMonsterView;
    private _plusCtl:PlusCtl = new PlusCtl();
    private init(){
        if(!this.tiaozhanBtnCtl){
            this.tiaozhanBtnCtl = ButtonCtl.CreateBtn(this.tiaozhanBtn,this,this.onFightHandler);

            this.on(Laya.Event.DISPLAY,this,this.onDisplay);
            this.on(Laya.Event.UNDISPLAY,this,this.onUnDisplay);
            NewAdventureModel.Ins.on(NewAdventureEvent.DisposeAvatar,this,this.disposeAvatar);
        }
    }
    private onDisplay(){
        if(this.monsterView){
            this.monsterView.play(EAvatarAnim.NormalStand);
        }
    }

    private onUnDisplay() {
        if (this.monsterView) {
            this.monsterView.stop();
        }
    }
    
    private disposeAvatar(){
        if(this.monsterView){
            this.monsterView.dispose();
            this.monsterView = null;
        }
    }
    constructor() {
        super();
        this.init();
    }
    /**挑战 */
    private onFightHandler(){
        NewAdventureModel.Ins.adventureId = this.vo.levelId;

        // let req =new NewAdventureFight_req();
        // req.type = ENewAdventure.Fight;
        // req.adventureId = this.vo.levelId;
        // SocketMgr.Ins.SendMessageBin(req);

        MainModel.Ins.fightAdventure(this.vo.levelId);
    }
    public refreshView(){
        
        this.titleTf.text = this.vo.titleName;
        this.tf1.text = this.vo.clearanceDesc;
        this.tf2.text = this.vo.heroName;
        this.tf3.text = E.getLang("maoxian2_text2");
        ItemViewFactory.LayoutLabels(this.desctf);

        // let sign:string = "SoltItemView2";
        ItemViewFactory.renderItemSlots(this.rewardCon,this.vo.cfg.f_LevelReward1,10,1,"left",SoltItemView,"SoltItemView");

        /////////////////////////////////////////////////////////////
        let _imgcfg:Configs.t_Enemy_Image_dat = Enemy_ImageProxy.Ins.getCfg(this.vo.cfg.f_EnamyImage);

        // console.log("new..............." + JSON.stringify(_imgcfg));

        // if (NewAdventureModel.Ins.oldLvId != this.vo.levelId) {
        //     NewAdventureModel.Ins.oldLvId = this.vo.levelId;
        // }else{
        //     LogSys.Error("is already set...");
        // }
        this.createMonster(_imgcfg);
        /////////////////////////////////////////////////////////////
        this._plusCtl.setPlus(this.toplug,NewAdventureModel.Ins.adventureData.plus);
    }

    private createMonster(_imgcfg:Configs.t_Enemy_Image_dat){
        this.disposeAvatar();
        this.monsterView = E.gameAdapter.adventureCreateMonster(EAvatarDir.Left, _imgcfg.f_MountID, _imgcfg.f_WingID, false,_imgcfg.f_ImageID);
        // AvatarFactory.createFightMonsterAvatar(EAvatarDir.Left, _imgcfg.f_MountID, _imgcfg.f_WingID, false,_imgcfg.f_ImageID);
        
        this.heroCon.addChild(this.monsterView);
        this.monsterView.start();
        this.monsterView.play(EAvatarAnim.NormalStand);
        let monsterSkin: stSkin = Enemy_ImageProxy.Ins.toTSkin(_imgcfg);
        this.monsterView.mSkin = monsterSkin;
    }
}

/**当前的选项卡*/
export class CurNewAdventureItemView extends RowMoveBaseNode{
    public static SignKey:string = "CurNewAdventureItemView";

    public static getFromPool(){
        let skin = Laya.Pool.getItemByClass(CurNewAdventureItemView.SignKey, CurNewAdventureItemViewSkin);
        return skin;
    }
    protected clsKey: string = CurNewAdventureItemView.SignKey;

    private skin:CurNewAdventureItemViewSkin;

    protected createNode(index) {
        let skin:CurNewAdventureItemViewSkin=Laya.Pool.getItemByClass(this.clsKey, CurNewAdventureItemViewSkin);
        this.skin = skin;
        this.skin.vo = this.list[index];
        this.skin.refreshView();
        skin.y = this.y;
        return skin;
    }

}

/**未解锁的skin*/
class  LockNewAdventureItemViewSkin extends ui.views.maoxian2.ui_maoxian2_item2UI{
    public vo:AdventureItemVo;
    constructor() {
        super();
    }
    public refershView(){
        // let lock:boolean = !this.vo.bClearance;
        // this.icon.skin = this.vo.headimg;
        f_headViewUpdate(this.icon,this.vo.cfg.f_headIcon);
        if(this.vo.type == EAdventureItemType.Next){
            this.lock.visible  = true;
            this.unlock.visible = false;
            this.tf1.text = this.vo.chapterName;
        }
        // else if(this.vo.type == EAdventureItemType.Clearance){
        //     this.lock.visible  = false;
        //     this.unlock.visible = true;
        //     this.nulockNameTf.text = this.vo.titleName;
        // }
    }
}

/**未解锁的 */
export class LockNewAdventureItemView extends RowMoveBaseNode {

    public static getFromPool(){
        let skin = Laya.Pool.getItemByClass("LockNewAdventureItemView", LockNewAdventureItemViewSkin);
        return skin;
    }
    protected clsKey: string = "LockNewAdventureItemView";
    private skin:LockNewAdventureItemViewSkin;
    protected createNode(index) {
        let skin:LockNewAdventureItemViewSkin=Laya.Pool.getItemByClass(this.clsKey,LockNewAdventureItemViewSkin);
        this.skin = skin;
        skin.y = this.y;
        this.skin.vo = this.list[index];
        this.skin.refershView();
        return skin;
    }
}