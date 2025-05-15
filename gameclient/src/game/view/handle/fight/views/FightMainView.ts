import { LogSys } from "../../../../../frame/log/LogSys";
import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { AnimConfig, HrefUtils } from "../../../../../InitConfig";
import { ui } from "../../../../../ui/layaMaxUI";
import { EMsgBoxType, EViewType } from "../../../../common/defines/EnumDefine";
import { Callback } from "../../../../event/Callback";
import { E } from "../../../../G";
import { FightEnd_req, JjcFight_revc, stFightPet, stFightRole, stFightVo } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { BaseCfg } from "../../../../static/json/data/BaseCfg";
import { AllianceModel } from "../../alliance/model/AllianceModel";
import { AvatarConfig } from "../../avatar/AvatarConfig";
import { AvatarEvent } from "../../avatar/AvatarEvent";
import { AvatarFactory } from "../../avatar/AvatarFactory";
import { AvatarMonsterView } from "../../avatar/AvatarMonsterView";
import { AvatarView, EAvatarDir } from "../../avatar/AvatarView";
import { FontClipCtl } from "../../avatar/ctl/FontClipCtl";
import { FontCtlFactory } from "../../avatar/ctl/FontCtlFactory";
import { FightModelVer2 } from "../../avatar/FightModelVer2";
import { EAvatarAnim } from "../../avatar/vos/EAvatarAnim";
import { FightMonsterModel } from "../../fight_monster/vos/FightMonsterModel";
import { System_RefreshTimeProxy } from "../../huodong/model/ActivityProxy";
import { KangJiXiongShouModel } from "../../kangjixiongshou/model/KangJiXiongShouModel";
import { EFuncDef } from "../../main/model/EFuncDef";
import { MainModel } from "../../main/model/MainModel";
import { RedEnum } from "../../main/model/RedEnum";
import { RedUpdateModel } from "../../main/model/RedUpdateModel";
import { FuncProxy } from "../../main/proxy/FuncProxy";
import { ECellType, EFightType } from "../../main/vos/ECellType";
import { NewAdventureModel } from "../../maoxian2/NewAdventureModel";
import { getJjcModel } from "../../peakjjc/model/IJjcInterface";
import { ZuoQiModel } from "../../zuoqi/ZuoqiModel";
import { IFightResult } from "../vos/FightVo";

class UiCell{
    uiType:EViewType;
    data;
}

export class t_Battle_config extends BaseCfg{
    public GetTabelName():string{
        return "t_Battle_config";
    }
    private static _ins:t_Battle_config;
    public static get Ins(){
        if(!this._ins){
            this._ins = new t_Battle_config();
        }
        return this._ins;
    }
}

class t_TeamFight_Score extends BaseCfg {
    public GetTabelName(): string {
        return "t_TeamFight_Score";
    }
    private static _ins: t_TeamFight_Score;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_TeamFight_Score();
        }
        return this._ins;
    }
    public getVal(val:number){
        let l = this.List;
        if(val == 0){
            return 0
        }
        
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_TeamFight_Score_dat = l[i];
            let next:Configs.t_TeamFight_Score_dat = l[i+1];
            if(next){
                if(val >= cfg.f_Damage && val < next.f_Damage){
                    return i;
                }
            }
        }
        return l.length -1;
    }
}


/**
 * 战斗主场景
 **/
export class FightMainView extends ViewBase{
    private _ui:ui.views.maoxian.ui_fightUI;
    protected mMask:boolean = true;
    protected mMaskClick = false;
    protected autoFree = true;
    
    // private ownerAvatar:AvatarView;
    // private enemyAvatar:AvatarMonsterView;
    //敌我的目标移动终点
    // private ownerX:number;
    // private enemyX:number;
    // private offsetY:number;
    // private curW:number;
    private model:MainModel;
    private _ownerCtl:FontClipCtl;
    private _enemyCtl:FontClipCtl;
    private _cnCtl:FontClipCtl;//中文
    private bigBossAvatar:AvatarMonsterView;
    private _cacheList:UiCell[] = [];
    private maxSideCount:number = 0;
    /**加速 */
    private quickCtl:ButtonCtl;
    private skipCtl:ButtonCtl;
    // private skelLoaded:boolean = false;
    // private moveDis:number;
    // private enemyVo:stFightRole;
    // private selfVo:stFightRole;
    //当前的战斗数据
    protected _curData:IFightResult;
    /**是否是多人战斗 */
    private multFight:boolean = false;
    private roundHandler:Laya.Handler = new Laya.Handler(this,this.onRonundCallBack);
    private fight:FightModelVer2;
    private delayTime:number = 0;
    private avatarList:AvatarView[] = [];
    private mushPosArr:string[] = [];
    private bloodWidth:number = 0;
    private curBloodVal:number;
    private unlockLv:number;//解锁等级
    // private readonly _maxSpeed:number = 2;//加速倍率
    private _tempList: AvatarView[] = [];

    protected onFirstInit() {
        if(!this.UI){
            
            this.UI = this._ui = new ui.views.maoxian.ui_fightUI();
            this.maxSideCount = AvatarFactory.maxSideCount;
            this.delayTime = t_Battle_config.Ins.GetDataById(1).f_timedelay;

            this.bloodWidth = this._ui.blood1.width;

            this.unlockLv = parseInt(System_RefreshTimeProxy.Ins.getVal(46));

            if(initConfig.unlockLv){
                this.unlockLv = initConfig.unlockLv;
            }
            this.model = MainModel.Ins;
            this._ownerCtl = FontCtlFactory.createPlus();
            this._enemyCtl = FontCtlFactory.createPlus();
            // this._ui.rightPlayer.removeSelf()
            // this._ui.leftplayer.removeSelf();

            this._cnCtl = new FontClipCtl(`remote/maoxian/c`);
            // this._ui.bg.hitArea = new Laya.Rectangle(0,0,this._ui.width,this._ui.height);
            this._ui.bg.on(Laya.Event.CLICK,this,this.onbgClick);
            // this._ui.skinTf.on(Laya.Event.CLICK,this,this.onSkipUp);
            // this.ownerX = this._ui.owner.x;
            // this.enemyX = this._ui.enemy.x;
            // this.curW = this._ui.width;
            // this.offsetY = this._ui.owner.y;
            this.onRonundCallBack();
            let sprmask:Laya.Sprite = new Laya.Sprite();
            sprmask.graphics.drawRect(0,0,this.UI.width,this.UI.height,null,"#000000");
            sprmask.alpha = 0.1;
            sprmask.on(Laya.Event.CLICK,this,this.onbgClick);
            this.UI.addChild(sprmask);
            // let fight:IFightModel = FightModel.Ins;
            // if(HrefUtils.getVal("fight")){
            // }
            // fight = FightModelVer2.Ins;
            this.fight = FightModelVer2.Ins;

            this.quickCtl = ButtonCtl.CreateBtn(this._ui.quickBtn,this,this.onQuickHandler);
            //this.quickCtl.visible = false;
            this.skipCtl = ButtonCtl.CreateBtn(this._ui.skipBtn,this,this.onStopFight);

            let cfg:Configs.t_Func_dat = FuncProxy.Ins.getCfgByFuncId(EFuncDef.Expedition);
            // if(cfg.f_close){
            // this.quickCtl.visible = this.skipCtl.visible = false;
            // }
            // if(HrefUtils.getVal("openall")){
            // this.quickCtl.visible = this.skipCtl.visible = true;
            // }
            if(HrefUtils.getVal("skip") == 1){
                this.skipCtl.visible = true;
            }else{
                this.skipCtl.visible = false;
            }
            if(E.Debug){
                let showTest:Laya.Sprite = new Laya.Sprite();
                this._ui.addChild(showTest);
                for(let i = 0;i < 6;i++){
                    let spr:Laya.Sprite = this._ui['a'+i];
                    // spr.graphics.clear();

                    showTest.graphics.drawCircle(spr.x,spr.y,3,null,"#00ff00");
    
                    spr = this._ui['d'+i];
                    // spr.graphics.clear();
                    showTest.graphics.drawCircle(spr.x,spr.y,3,null,"#00ff00");
                }
            }
    

            // console.log(AvatarFactory.posList);

            // if(E.Debug){
            //     let btn = new Laya.Image();
            //     btn.width = 100;
            //     btn.height = 50;
            //     btn.hitArea = new Laya.Rectangle(0,0,100,50);
            //     btn.skin = `remote/common/base/az_jdt.png`;
            //     btn.x = 100;
            //     btn.y = Laya.stage.height/2;
            //     this._ui.bg.addChild(btn);
            //     btn.on(Laya.Event.CLICK,this,this.onTest);
            // }
        }
    }

    private onTest(){
        // MainModel.Ins.fightLock[EFightType.Adventure] = 0;
        MainModel.Ins.fightAdventure(NewAdventureModel.Ins.adventureData.adventureId);
    }
    private onStopFight(){
        this.fight.stop();
    }
    private onQuickHandler(){
        if(!MainModel.Ins.isMonthCanUsed && (this.model.mPlayinfo && this.model.mRoleData.lv < this.unlockLv)){
            E.ViewMgr.ShowMidError(E.getLang("openlimit",this.unlockLv));
            return;
        }

        this.model.fightAnimScale++;
        if(this.model.fightAnimScale > MainModel.Ins.maxFightSpeed){
            this.model.fightAnimScale = 1;
        }
        AnimConfig.AnimScale = this.model.fightAnimScale;
        this.updateQuick();
    }

    private updateQuick() {
        //if (this.multFight) {
            let val: number = this.model.fightAnimScale;
            RedUpdateModel.Ins.save(RedEnum.FIGHT_ANIM_SCALE, this.model.fightAnimScale);
            AnimConfig.AnimScale = this.model.fightAnimScale;

            // this._ui.quickTf.text = `${E.getLang("fight01")}x${val}`;
            let roles: AvatarView[] = this.fight.roles;
            for (let i = 0; i < roles.length; i++) {
                let avatar = roles[i];
                avatar.coreSpine.playbackRate(val);
            }
            this._ui.sppedImg.skin = `remote/maoxian/az_anniu_x${val}.png`;
        //}
    }

    // private onSkipUp(){
        // this.Close();
        // E.ViewMgr.Open(EViewType.FightJieSuan,null,this._curData);
        // FightModel.Ins.stop();
    // }
    
    private onbgClick(){
        if(this._ui.skinTf.visible){
            // console.log("dasda");
            // FightModel.Ins.stop();
            // this.fight.stop();
            this.onStopFight();
        }

        let sub = this.fight.subTime;
        
        if(this.fight.lastTime!=0 && sub >= 2000){
            E.ViewMgr.Close(EViewType.FightMain);
            if(E.Debug){
                // E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk,"client to close Fight...");
                console.error(Date.now()+" client to close Fight...");
            }
        }
        LogSys.Log("lastTime:" + this.fight.lastTime+" your exit... " + sub);
    }

    private addUiCell(uiType:EViewType,data?){
        let cell = new UiCell();
        cell.uiType = uiType;
        cell.data = data;
        this._cacheList.push(cell);
    }

    protected onExit() {
        //Laya.Resource.destroyUnusedResources();
        this.clearScene();
        this.releaseRes();
        spineRes.GC();

        let _fightEnd:FightEnd_req = new FightEnd_req();
        _fightEnd.fight_type = this._curData.type;//EFightType.Adventure;
        SocketMgr.Ins.SendMessageBin(_fightEnd);
        MainModel.Ins.mainView.avatarFight && MainModel.Ins.mainView.avatarFight.onInit();
    }

    private releaseRes(){
        E.ViewMgr.Open(EViewType.Main,Callback.Create(this,this.checkUI));
        /*
        while(this._cacheList.length){
            let cell = this._cacheList.shift();
            E.ViewMgr.Open(cell.uiType,null,cell.data);
        }
        */
        // this.checkUI();
        // MainModel.Ins.addMainAvatar();
        // Laya.Resource.destroyUnusedResources();
    }


    private checkUI(){
        if(this._cacheList.length>0){
            let cell = this._cacheList.shift();
            E.ViewMgr.Open(cell.uiType,Callback.Create(this,this.checkUI),cell.data);
        }
    }

    clearScene(){
        AvatarFactory.clearEffect();
        AnimConfig.AnimScale = 1.0;//重置
        while(this.avatarList.length > 0){
            let cell = this.avatarList.pop();
            cell.dispose();
            cell = null;
        }
        if(this.bigBossAvatar){
            this.bigBossAvatar.dispose();
            this.bigBossAvatar = null;
        }
    }

    protected onAddLoadRes() {
        this.addAtlas("maoxian.atlas");
        this.addImg(`remote/maoxian/scene.png`);
    }
    protected onAddEventListener() {

    }

    protected onEnter() {

    }

    private updateHeadView() {
        
        this._ownerCtl.setValue(this._ui.ownerFight,StringUtil.val2Atlas(this.model.mRoleData.getVal(ECellType.BATTLE)));
        let plus = this.getEnemyPlus(this._curData.fightVo);
        this._enemyCtl.setValue(this._ui.enemyFight,StringUtil.val2Atlas(plus),"right");
    }
    /**获取战斗力 */
    private getEnemyPlus(vo:stFightVo){
        let plus:number = 0;
        for(let i = 0;i < vo.roleList.length;i++){
            let cell = vo.roleList[i];
            if(cell.pos > AvatarConfig.LeftPosMax){
                plus+=cell.plus;
            }
        }
        return plus;
    }

    private rebuildPosList(type:EFightType){
        AvatarFactory.posList = [];
        let posList = AvatarFactory.posList;
        for(let i = 0;i < this.maxSideCount;i++){
            let cell:Laya.Sprite = this._ui["a"+(i+1)];
            posList.push(new Laya.Point(cell.x,cell.y));
        }
        for(let i = 0;i < this.maxSideCount;i++){
            let cell:Laya.Sprite = this._ui["d"+(i+1)];
            posList.push(new Laya.Point(cell.x,cell.y));
        }
        if(this.mushPosArr.indexOf(type.toString())>=0){
            //单人站立坐标
            posList[5] = new Laya.Point(this._ui.a0.x,this._ui.a0.y);
            posList[11] = new Laya.Point(this._ui.d0.x,this._ui.d0.y);
            this.multFight = false;
        }else{
            //多人站位样式
            this.multFight = true;
        }
        // console.log(1);
        AvatarFactory.posList[AvatarFactory.POS_LEFT_PET-1] = new Laya.Point(this._ui.pet0.x,this._ui.pet0.y);
        AvatarFactory.posList[AvatarFactory.POS_RIGHT_PET-1] = new Laya.Point(this._ui.pet1.x,this._ui.pet1.y);
    }
    private onSortByPosition(a:AvatarView,b:AvatarView){
        if(a.y < b.y){
            return -1;
        }
        else if(a.y > b.y){
            return 1;
        }
        return 0;
    }

    private createPet(_petVo: stFightPet) :AvatarMonsterView{
        // let petPosList: Laya.Sprite[] = [this._ui.pet0, this._ui.pet1];
        if(Laya.Utils.getQueryString("petid")){
            _petVo.petId = parseInt(Laya.Utils.getQueryString("petid"));
        }

        //创建宠物
        let _pet = AvatarFactory.createPet(_petVo.petId, false);
        _pet.play(EAvatarAnim.Stand);
        _pet.vo = _petVo;
        let dir: EAvatarDir = EAvatarDir.Right;
        // let pos: number = 0;
        if (_petVo.pos == AvatarFactory.POS_RIGHT_PET) {
            dir = EAvatarDir.Left;
            // pos = 1;
        }
        _pet.dir = dir
        // let _ref = AvatarFactory.posList[_petVo.pos-1];
        // _pet.setPos(_ref.x, _ref.y);
        let offsetW:number = AvatarFactory.MOVE_POS;
        if(_petVo.pos == AvatarFactory.POS_RIGHT_PET){
            offsetW *=-1;
        }
        // let _posSprite:Laya.Sprite = this._ui[`${sign}${pos}`];
        //起始坐标
        let curPos:Laya.Point = AvatarFactory.posList[_petVo.pos-1];

        //结束坐标
        let endPos:Laya.Point = new Laya.Point(curPos.x,curPos.y);

        //设置起始坐标
        _pet.setPos(endPos.x + offsetW, endPos.y);
        
        this.container.addChild(_pet);
        this._tempList.push(_pet);
        this.avatarList.push(_pet);
        return _pet;
    }

    private createNormalAvatar(dir: EAvatarDir = EAvatarDir.Left,rideid: number,wingid:number,imageID:number){
        return AvatarFactory.createFightMonsterAvatar(dir,rideid,wingid,true,imageID);
    }

    private createAvatar(roleVo:stFightRole):AvatarMonsterView{
        if(roleVo.pos == AvatarFactory.POS_RIGHT_PET || roleVo.pos == AvatarFactory.POS_LEFT_PET){
            if(E.Debug){
                E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk,"roleList pet->" + roleVo.pos);
            }
            return;
        }
        let skin = roleVo.skin;
        let isBigBoss:boolean = false;

        let dir;
        if(roleVo.pos > this.maxSideCount){
            // AvatarFactory.createFightMonsterAvatar(EAvatarDir.Left,
            dir = EAvatarDir.Left;
        }else{
            dir = EAvatarDir.Right;
        }
        let _avatar:AvatarMonsterView;
        if(this._curData.fightVo.ownerpos == roleVo.pos && roleVo.pos <= this.maxSideCount){//主角
            // _avatar.rideId = ZuoQiModel.Ins.rideVo.rideId;
            // _avatar.wingId = MainModel.Ins.wingId;
            _avatar = this.createNormalAvatar(dir,ZuoQiModel.Ins.rideVo.mainid,MainModel.Ins.wingId,E.gameAdapter.leadImageId);
            _avatar.mSkin = AvatarFactory.createMainSkin();
        }else{
            if(roleVo.pos <= this.maxSideCount){

            }else{
                //敌方
                if([EFightType.BigBoss, EFightType.BossFight,EFightType.kangjixiongshou].indexOf(this._curData.type) !== -1){
                    isBigBoss = true;
                    _avatar = this.bigBossAvatar;
                }
            }

            if(!isBigBoss){
                //非BOSS怪物创建
                _avatar = this.createNormalAvatar(dir,skin.f_MountID,skin.f_WingID,MainModel.Ins.randomImageID);
                _avatar.mSkin = roleVo.skin;
            }
        }

        if(roleVo.pos <= this.maxSideCount){
            if(_avatar.blood){
                _avatar.blood.reverse();
            }
        }
        _avatar.blood.setHeadTxt(roleVo);
        _avatar.vo = roleVo;
        _avatar.reset();
        _avatar.isBoss = isBigBoss;

        let offsetW:number = AvatarFactory.MOVE_POS;
        if(roleVo.pos > AvatarFactory.maxSideCount){
            offsetW *=-1;
            // pos-=6;
        }
        // let _posSprite:Laya.Sprite = this._ui[`${sign}${pos}`];
        //起始坐标
        let curPos:Laya.Point = AvatarFactory.posList[roleVo.pos-1];

        //结束坐标
        let endPos:Laya.Point = new Laya.Point(curPos.x,curPos.y);

        //设置起始坐标
        _avatar.setPos(endPos.x + offsetW, endPos.y);
        _avatar.play(EAvatarAnim.Stand);
        // if(_avatar instanceof AvatarMonsterView){
        if(_avatar.blood){
            // _avatar.blood.bloodVal = roleVo.blood;
            _avatar.blood.setInit(roleVo.init_blood,roleVo.blood);
        }
        // }
        _avatar.refreshSkin();
        // this.container.addChild(_avatar);//添加到舞台
        this._tempList.push(_avatar);
        if(_avatar.isBoss){
            _avatar.setPos(endPos.x,endPos.y);
            _avatar.on(AvatarEvent.UPDATA_BLOOD,this,this.updateBossBloodEvt);
            _avatar.play(EAvatarAnim.InAnim,this,this.onMoveEnd,[_avatar]);
            if(_avatar.blood){
                _avatar.blood.bgVisible  = false;
            }
            Laya.timer.callLater(this,()=>{
                _avatar.event(Laya.Event.COMPLETE);
            })
        }else{

        }
        _avatar.die = false;
        this.avatarList.push(_avatar);
        DebugUtil.drawTF(_avatar,roleVo.pos+"","#ffff00");
        return _avatar;
    }
    private actionRun(){
        this.rebuildPosList(this._curData.type);
        this.updateQuick();

        if(this.multFight){
            this.quickCtl.visible = true;
            if(MainModel.Ins.mRoleData.lv >= this.unlockLv){
                this.quickCtl.gray = false;
            }else{
                this.quickCtl.gray = true;
            }
        }else{
            //this.quickCtl.visible = false;
        }
        
        if(E.ViewMgr.IsOpen(EViewType.NewAdventureMain)){
            // this._cacheList.push(EViewType.NewAdventureMain);
            this.addUiCell(EViewType.NewAdventureMain);
            E.ViewMgr.Close(EViewType.NewAdventureMain);   
        }
        if(E.ViewMgr.IsOpen(EViewType.JjcMain)){
            this.addUiCell(EViewType.JjcMain);
            E.ViewMgr.Close(EViewType.JjcMain);   
        }
        if(E.ViewMgr.IsOpen(EViewType.XXZDZView)){
            this.addUiCell(EViewType.XXZDZView);
            E.ViewMgr.Close(EViewType.XXZDZView);   
        }
        if(E.ViewMgr.IsOpen(EViewType.WuShenDianView)){
            this.addUiCell(EViewType.WuShenDianView);
            E.ViewMgr.Close(EViewType.WuShenDianView);   
        }
        if(E.ViewMgr.IsOpen(EViewType.JjcFight)){
            let jjc_model;
            if(this._curData.type == EFightType.Jjc){
                let _jjcExtData:JjcFight_revc = this._curData.extData;
                jjc_model = getJjcModel(_jjcExtData.type);
            }
            this.addUiCell(EViewType.JjcFight,jjc_model);
            E.ViewMgr.Close(EViewType.JjcFight);
        }
        if (E.ViewMgr.IsOpen(EViewType.YeWaiBoss)) {
            this.addUiCell(EViewType.YeWaiBoss);
            E.ViewMgr.Close(EViewType.YeWaiBoss);
        }
        E.ViewMgr.Close(EViewType.Main);
        //////////////////////////////////////////////////////////////////

        if(this._curData.type == EFightType.Jjc){
            this.updateHeadView();

            let _jjcExtData:JjcFight_revc = this._curData.extData;
            
            // console.log("jjc ====>"+_jjcExtData.type);
            
            //this._ui.righticon.skin = MainModel.Ins.convertHead(_jjcExtData.enemyInfo.headUrl);
            //this._ui.ownerIcon.skin = MainModel.Ins.mRoleData.headUrl;

            MainModel.Ins.setTTHead(this._ui.righticon,MainModel.Ins.convertHead(_jjcExtData.enemyInfo.headUrl))
            MainModel.Ins.setTTHead(this._ui.ownerIcon,MainModel.Ins.mRoleData.headUrl);

            this._ui.leftplayer.visible = this._ui.rightPlayer.visible = true;
        }else{
            this._ui.leftplayer.visible = this._ui.rightPlayer.visible = false;
        }

        this.onRonundCallBack();
        let fightVo = this._curData.fightVo;
        ///////////////////////////////////////////////////////////////////////
        this._tempList = [];
        let _fightRoleList = [];

        for(let i = 0;i < fightVo.petList.length;i++){
            let _petVo:stFightPet = fightVo.petList[i];
            // this.createPet(_petVo);
            _fightRoleList.push(_petVo);
        }
        ///////////////////////////////////////////////////////////////////////
        for(let i = 0;i < fightVo.roleList.length;i++){
            let roleVo:stFightRole = fightVo.roleList[i];
            // this.createAvatar(roleVo);
            _fightRoleList.push(roleVo);
        }
        this._fightRoleList = _fightRoleList;



        //同步模式
        if(initConfig.sync || Laya.Utils.getQueryString("sync")){
            this.syncLoad();
        }else{
            //分帧异步
            // Laya.timer.frameLoop(1,this,this.startLoad);
            this.startLoad();
        }
    }

    private syncLoad() {
        while (this._fightRoleList.length) {
            let cell = this._fightRoleList.shift();
            this.createFightAvatar(cell);
        }
        this.next();
    }

    private _fightRoleList: any[];
    private startLoad() {
        if(this._fightRoleList.length){
            let cell:any = this._fightRoleList.shift();
            LogSys.Log("================> start load...!" + JSON.stringify(cell));
            this.createFightAvatar(cell);
        }else{
            Laya.timer.clear(this,this.startLoad);
            this.next();
            // Laya.timer.once(3000,this,this.next);
        }
    }

    private createFightAvatar(cell){
        let _avatar:AvatarMonsterView;
        if(cell instanceof stFightPet || cell.petId){
            _avatar = this.createPet(cell);
        }else{
            _avatar = this.createAvatar(cell);
        }
        _avatar.once(Laya.Event.COMPLETE,this,this.startLoad);
        return _avatar;
    }
    /**开始移动 */
    private startMove(_avatar:AvatarView){
        let roleVo = _avatar.vo;
        if(_avatar.isBoss){

        }else{
            let curPos:Laya.Point = AvatarFactory.posList[roleVo.pos-1];
            if(curPos){
                let endPos:Laya.Point = new Laya.Point(curPos.x,curPos.y);
                // let time = this.delayTime;//入场时间
                _avatar.moveX(endPos.x,this.delayTime,new Laya.Handler(this,this.onMoveEnd,[_avatar]),EAvatarAnim.Move);
            }
        }
    }

    private next(){
        this._tempList = this._tempList.sort(this.onSortByPosition);
        for(let i = 0;i < this._tempList.length;i++){
            let _avatar:AvatarView = this._tempList[i];
            if(_avatar.vo.petId){

            }else{
                this.container.addChild(_avatar);
            }
            this.startMove(_avatar);
        }
        Laya.timer.once(this.delayTime,this,this.startFight);
    }

    protected onInit() {
        // this._curData = this.Data;
        MainModel.Ins.mainView.avatarFight && MainModel.Ins.mainView.avatarFight.onExit();

        this.fight.init();
        this.mushPosArr = System_RefreshTimeProxy.Ins.getVal(33).split("|");
        this.refreshFightView(this.Data);
    }

    public refreshFightView(_data:IFightResult){
        this._curData = _data;
        // this.model.disposeMainAvatar();
        this.curBloodVal = 0;
        this._ui.bloodbg.visible = false;
        if(EFightType.BossFight === this._curData.type){
            this.updateBossBloodEvt(0);
            this.bigBossAvatar = AllianceModel.Ins.getBossMonster(this,this.actionRun);
        }else if(EFightType.BigBoss === this._curData.type){
            this.updateBossBloodEvt(0);
            this.bigBossAvatar = FightMonsterModel.Ins.getBossMonster(this,this.actionRun);
        }else if(EFightType.kangjixiongshou === this._curData.type){
            this.updateBossBloodEvt(0);
            this.bigBossAvatar = KangJiXiongShouModel.Ins.getBossMonster(this,this.actionRun);
        }
        else{
            this.actionRun();
        }
    }

    private updateBossBloodEvt(blood:number){
        this._ui.bloodbg.visible = true;
        this.curBloodVal+=blood;
        let index = t_TeamFight_Score.Ins.getVal(this.curBloodVal);
        let cfg = t_TeamFight_Score.Ins.List[index];
        this._ui.bloodStatus.skin = `remote/maoxian/az_${cfg.f_Score}.png`;
        let next:Configs.t_TeamFight_Score_dat = t_TeamFight_Score.Ins.List[index+1];
        let v = 1;
        let nextVal:number;
        if(next){
            nextVal = next.f_Damage;
        }else{
            nextVal = cfg.f_Damage;
        }
        v = this.curBloodVal / nextVal;
        if(v > 1){
            v = 1;
        }
        // console.log("=============>"+v);
        this._ui.blood1.width = v * this.bloodWidth;
        this._ui.bloodTf.text = this.curBloodVal + "/" + nextVal;
    }

    private onMoveEnd(avatar:AvatarView) {
        avatar.play(EAvatarAnim.Stand);
    }

    public get container(){
        return this._ui.avatarcon;
    }
    private startFight(){
        let l = AvatarFactory.createBystFightAction(this._curData.fightVo.itemList);
        this.fight.start(this.avatarList,l,new Laya.Handler(this,()=>{
            this._ui.skinTf.visible = false;
            //战斗结算
            MainModel.Ins.fightJieSuan(this._curData);
        }),this.roundHandler);
    }

    private onRonundCallBack(val:number = 1){
        // console.log("当前回合数:"+val);
        // val = Math.floor(100*Math.random());
        // val = 1;
        let str = StringUtil.toChinesNum(val);
        // this._ui.huiheFc.value = str;//StringUtil.NumToWord(val);
        // console.log("###",val,str);
        this._cnCtl.setCn(this._ui.huiheFc,str);
        this._ui.huiheFc.x = this._ui.diimg.x + this._ui.diimg.width;
        this._ui.hui1.x = this._ui.huiheFc.x + this._cnCtl.mWidth;
        
        let _useCount:number = 0;
        if(this.multFight){
            _useCount = 3;
        }else{
            _useCount = 5;
        }
        
        this._ui.skinTf.visible = val >= _useCount;

        if (initConfig.skip || HrefUtils.getVal("skip")) {
            this._ui.skinTf.visible = true;
        }

    }

}