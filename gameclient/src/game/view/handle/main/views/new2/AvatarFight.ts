import { RandomUtil } from "../../../../../../frame/util/RandomUtil";
import { E } from "../../../../../G";
import { stEquipItem } from "../../../../../network/protocols/BaseProto";
import { uint64 } from "../../../../../network/protocols/uint64";
import { BaseCfg } from "../../../../../static/json/data/BaseCfg";
import { AvatarFactory } from "../../../avatar/AvatarFactory";
import { AvatarMainCtl } from "../../../avatar/AvatarMainCtl";
import { AvatarMainView } from "../../../avatar/AvatarMainView";
import { AvatarFightVo, AvatarMonsterView } from "../../../avatar/AvatarMonsterView";
import { EAvatarDir, EBloodParent } from "../../../avatar/AvatarView";
import { ItemPopSkel } from "../../../avatar/spine/ItemPopSkel";
import { SpineUtil } from "../../../avatar/spine/SpineManager";
import { EAnimEvent, EAvatarAnim } from "../../../avatar/vos/EAvatarAnim";
import { LingChongModel } from "../../../lingchong/model/LingChongModel";
import { IChestLv } from "../../interface/Interface";
import { Enemy_ImageProxy } from "../../model/AdventureProxy";
import { EOpenChest, ESetEquipDateSource } from "../../model/ChestAutoPolicy";
import { EquipmentQualityProxy } from "../../model/EquipmentProxy";
import { ItemViewFactory } from "../../model/ItemViewFactory";
import { MainEvent } from "../../model/MainEvent";
import { MainModel } from "../../model/MainModel";
import { EAttrType, ECellType } from "../../vos/ECellType";
import { EquipItemVo } from "../../vos/EquipItemVo";
import { ChestAnimSpine } from "../ChestAnimSpine";
// export enum EAutoFightType{
//     /**战斗状态 */
//     Fight = 1,
//     /**非战斗状态 */
//     Stand = 2,
// }
interface IAvatarFightSkin extends Laya.Sprite{
    pet:Laya.Sprite;
    role:Laya.Sprite;
    role1:Laya.Sprite;
}

class t_BoxRangle{
    start:number;
    end:number;
}

export class t_Box_AnimationRate extends BaseCfg {
    GetTabelName() {
        return "t_Box_AnimationRate";
    }
    private _dataList:t_BoxRangle[];
    private static _ins: t_Box_AnimationRate;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Box_AnimationRate();
        }
        return this._ins;
    }

    getRandomVal(){
        if(!this._dataList){
            this._dataList = [];
            let l = this.List;
            let v=0;
            // let a = Math.random()*10000;
            for(let i = 0;i < l.length;i++){
                let cfg:Configs.t_Box_AnimationRate_dat = l[i];
                let pre:Configs.t_Box_AnimationRate_dat = l[i-1];
                // if(cfg.f_animRate)
                let old = v;
                v+=cfg.f_animRate;
                let vo = new t_BoxRangle();
                if(!pre){
                    vo.start = old;
                    vo.end = v-1;
                }
                else{
                    vo.start = old;
                    if(i < l.length - 1){
                        vo.end = v-1;
                    }else{
                        vo.end = v;
                    }
                }
                this._dataList.push(vo);
            }
        }

        let val = Math.random() * 10000;
        // console.log(this._dataList);
        let index:number = 0;
        for(let i = 0;i < this._dataList.length;i++){
            let vo = this._dataList[i];
            if(val >= vo.start && val < vo.end){
                index = i;
            }
        }

        let cfg:Configs.t_Box_AnimationRate_dat = this.List[index];
        return cfg.f_animindex;
    }
}
/** 动作来源*/
enum EAnimSource{
    /**怪物死亡 */
    Die = "Die",
    /**怪物重置*/
    ResetAvatar = "resetAvatar"
}
export class AvatarFight{
    /**是否在战斗中 */
    isFight:boolean = false;

    animCtl:ChestAnimSpine;

    // type:EAutoFightType = EAutoFightType.Stand;
    _ui:IAvatarFightSkin;
    private _icon:string = "";
    /**售卖回调 */
    private _sellBack:Laya.Handler;
    private _oldVo:EquipItemVo;
    private _newVo:EquipItemVo;
    private _pet:AvatarMonsterView;
    /**敌方 */
    private _avatar:AvatarMonsterView;
    private _atkVal:number = 1;
    private mainCtl:IAvatarMainCtl = new AvatarMainCtl();
    // private _equipList:uint64[] = [];

    /**主角 */
    private get myAvatar():AvatarMainView{
        return this.mainCtl.mAvatar;
    }
    // private _uidList:string[] = [];
    /**
     * 1保存装备数据
     * 2开始战斗
     */
    saveEquip(_old:EquipItemVo,_new:EquipItemVo){

        if(this.isFight){
            return;
        }
        this.isFight = true;

        this._oldVo = _old;
        this._newVo = _new;

        this.setAvatarAttr(_new.equipVo);

        this.updateView()
    }

    private updateView(){
        if(this.myAvatar && this._avatar){
            if(this.myAvatar.x == 0){
                this.startFight();
            }else{
                this.myAtk();
            }
        }
    }

    private setAvatarAttr(equipVo:stEquipItem,source?:ESetEquipDateSource){
        // this.updateSkin();
        let qua = equipVo.quality;
        // 当前攻击力*开到的装备稀有度当前系数*随机值
        let atk:number = MainModel.Ins.mRoleData.getVal(EAttrType.Attack);
        this._atkVal = atk;

        let lv = MainModel.Ins.mRoleData.getChestData().boxlv;
        let cfglv:IChestLv =  MainModel.Ins.getChestLvCfg(lv);
        let curList = cfglv.curInfo.f_Quality_Client.split("|");
        let index = 0;
        for(let i = 0;i < curList.length;i++){
            let arr = curList[i].split("-");
            if(parseInt(arr[0])==qua){
                index = i;
            }
        }
        let qua1 = index + 1;
        let cfg = EquipmentQualityProxy.Ins.GetDataById(qua1);
        // EquipmentQualityProxy.Ins.getByQua(qua);
        let arr = cfg.f_openvaluerd.split("|");
        let start = parseInt(arr[0]);
        let sub = parseInt(arr[1]) - start;

        let cur = (start + Math.random() * sub)/10000;

        let blood = Math.ceil(atk * qua1 * cur);
        this.resetAvatarBloodAndUID(blood,equipVo.uid,source);
        // DebugUtil.drawTF(this._ui,"blood:"+blood + " qua:" + qua + " atk:" + atk,"#0000ff");
        // this.updateSkin();
    }

    /**1.设置一个装备开始播放动画 
     * 2.动画完成之后发送售卖协议卖掉装备 */
    animSell(vo:stEquipItem,callBack:Laya.Handler,source:ESetEquipDateSource){
        this._sellBack = callBack;
        this.setAvatarAttr(vo,source);
        this.startFight();
    }

    // private onChestProxy(value){
    //     if(value){
    //         MainModel.Ins.ClickChest();
    //     }
    // }
    private onBoxUsed(){

    }
    public onInit() {
        this.mainCtl.con = this._ui.role;
        this.onExit();
        LingChongModel.Ins.on(LingChongModel.Updata_LingChong,this,this.onUpdatePetView);
        // MainModel.Ins.on(MainEvent.ChestProxy,this,this.onChestProxy);
        MainModel.Ins.on(MainEvent.BoxUsed,this,this.onBoxUsed);
        MainModel.Ins.on(MainEvent.FightAvatarAnim,this,this.playAnim);

        this.initMainAvatar();
        this.onUpdatePetView();

        ///////////////////////////////////////////////////////////////
        if(!this._avatar){
            this._avatar = AvatarFactory.createFightMonsterAvatar(EAvatarDir.Left,0,0,true,0);//MainModel.Ins.randomImageID
        }
        this._avatar.bloodParentType = EBloodParent.Self;
        this._avatar.blood.reverse();
        this._avatar.blood.setInit(100,100);
        this.resetAvatarPos();
        // this.resetAvatar(100,null);
        this._ui.role1.addChild(this._avatar);
        this.updateSkin();
        
        this.myAvatar.on(Laya.Event.LABEL,this,this.onAvatarLabel);
        MainModel.Ins.on(MainEvent.EquipViewClose,this,this.onEquipClose);
        MainModel.Ins.on(MainEvent.SellSucceed,this,this.onSellSucceed);

        Laya.timer.frameLoop(1,this,this.onFrameEvt);
    }

    /**更新皮肤 */
    private updateSkin(){
        // //这里使用每次都构建的方式创建角色,这样兼容性比较好
        // let ran:number = RandomUtil.RandomRoundInt(1,60);
        // let cfg = Enemy_ImageProxy.Ins.getCfg(ran);
        // if(this._avatar){
        //     LogSys.Log("更新皮肤:"+JSON.stringify(cfg));
        //     this._avatar.mSkin = Enemy_ImageProxy.Ins.toTSkin(cfg);
        // }
        E.gameAdapter.randomSkin(this._avatar);
    }

    /**帧循环 */
    private onFrameEvt(){
        if(debug){
            DebugUtil.drawTF(this._ui,`${this._avatar.blood.curBlood} / ${this._avatar.blood.maxBlood}`,"#ff0000");
        }
    }

    /**售卖成功 */
    private onSellSucceed(){
        this.resetAvatarPos();
    }
    private onEquipClose(){
        this.resetAvatarPos();
    }
    private finishList:string[] = [];
    private addUid(vo:EquipItemVo){
        if(vo && vo.equipVo){
            let uid = vo.equipVo.uid.toString();
            if(this.finishList.indexOf(uid)==-1){
                this.finishList.push(uid);
            }
        }
    }
    private itemSkel:ItemPopSkel;
    private onSpine1Complete(){
        this.itemSkel.skeleton.x = this._ui.width/2;
        this.itemSkel.skeleton.y = this._ui.height/2;
        this._ui.addChild(this.itemSkel.skeleton);
        SpineUtil.forEachSlot(this.itemSkel.skeleton);
        // itemSkel.setSlotSkin("icon_jy",'o/box128.png');
    }

    /**设置装备特效 */
    private onSetIcon(icon:string,that=null,func:Function=null){
        if(!this.itemSkel){
            let itemSkel = new ItemPopSkel();
            this.itemSkel = itemSkel;
        }
        this.itemSkel.once(Laya.Event.COMPLETE,this,this.onSpine1Complete);
        this.itemSkel.load("o/spine/sell2/sell2.skel");
        this.itemSkel.setSlotSkin("icon_jy",icon);//    'o/icon/274.png'
        // this.itemSkel.setSlotSkin("icon_jy3",icon);
        // this.itemSkel.setSlotSkin("icon_jb",icon);
        // this.itemSkel.setSlotSkin("icon_jb3",icon);

        this.itemSkel.play(0,that,func,null,true);
        // itemSkel.load("o/spine/glow01/glow01.skel");
        // D:\project1\Client\trunk\resource\o\spine\fuyuan\fuyuan.skel
    }
    clearData(){
        this._oldVo = null;
        this._newVo = null;
        this.isFight = false;
    }

    /**动画事件 */
    private onAvatarLabel(e){
        let animEvent:string = e.name;
        if(this._avatar){
            if (animEvent == EAnimEvent.Attack) {
                if(debug){
                    LogSys.Log(`攻击减少血 当前的血条值:${this._avatar.blood.curBlood} / ${this._avatar.blood.maxBlood}`);
                }
                this._avatar.playBlood(-this._atkVal);//伤血

                if (this._avatar.blood.curBlood <= 0) {
                    this._avatar.playOnce(EAvatarAnim.Die, this, this.onAvatarDie);
                    if (this._newVo) {
                        this._icon = this._newVo.getIcon();
                        MainModel.Ins.openEquipUI(this._oldVo, this._newVo);
                    }
                    // this.onSetIcon(this._icon);
                    this.addUid(this._newVo);
                    this.addUid(this._oldVo);

                    // this._oldVo = null;
                    // this._newVo = null;
                    // this.isFight = false;
                    this.clearData();
                    LogSys.Log(`当前的血条值 ${this._avatar.blood.curBlood} 怪物死亡`);
                }
            }
            else if (animEvent == EAnimEvent.HitAnim) {
                this._avatar.playOnce(EAvatarAnim.FightHit, this, this.onFightHit);
            }
        }
    }

    // /**是否已经死亡 */
    // private isReadyDie(){
    // }

    private onAvatarDie(){
        let useTime:number = 500;
        // this._avatar.alphaToZero(null,useTime);
        Laya.timer.once(useTime,this,this.onDie);
    }

    /**怪物死亡 */
    private onDie(){
        // this.resetAvatar(100,null);
        if(this._sellBack){
            // 售卖回调
            if(this._sellBack.args && this._sellBack.args.length > 0){
                this._icon = ItemViewFactory.getIcon((this._sellBack.args[0] as stEquipItem));
            }

            this._sellBack.run();
            this._sellBack = null;
            LogSys.Log("卖掉之后回调!!!");
        }
        this.playStand(EAnimSource.Die);
        this.updateSkin();
    }
    /**重置血条和装备UID */
    private resetAvatarBloodAndUID(hp:number,uid:uint64,source:ESetEquipDateSource){
        let vo = new AvatarFightVo();
        vo.hp = hp;
        vo.uid = uid;
        if(this._avatar){
            // this._avatar.reset();
         

            if( source == ESetEquipDateSource.PushEquip ||
                source == ESetEquipDateSource.ClickAutoBtn
                ){
                
            }else{
                if(debug){
                    LogSys.Log(`来源${source} ---->当前的血条值 ${this._avatar.blood.curBlood} / ${this._avatar.blood.maxBlood} --> 重置血条${vo.hp}/${vo.hp}`);
                }
                this._avatar.fightVo = vo;
                this._avatar.blood.setInit(vo.hp,vo.hp);
            }
            // DebugUtil.drawTF(this._avatar,uid.toString());
        }
        else{
            LogSys.Error("your avatar is null!");
        }
        // this._avatar.play(EAvatarAnim.Stand);
        // this.playStand(EAnimSource.ResetAvatar);
    }

    private onFightHit(){
        this.playStand("hit");
    }

    private playStand(source:string){
        if(this._avatar){
            this._avatar.play(EAvatarAnim.Stand);
            LogSys.Log("设置stand " + source);
            if(source == EAnimSource.Die || source == EAnimSource.ResetAvatar){
                this.resetAvatarPos();
            }
        }
    }

    /**重置敌方坐标,并且从外部进入 */
    private resetAvatarPos(){
        if(this._avatar){
            let offsetX:number = -150;
            if(this._avatar.blood.percent == 1 && this._avatar.blood.isShow && this._avatar.x == offsetX ||
                this._avatar.isMoving)
            {
                return;
            }
            this._avatar.reset(0,0);
            this._avatar.moveX(offsetX,1000);
        }
    }

    private initMainAvatar(){
        // this.mainCtl.free();
        this.mainCtl.create(new Laya.Handler(this,this.initCallBack));
    }

    private initCallBack(){
        this.myAvatar.reset();
        this.myAvatar.dir = EAvatarDir.Right;
        this.myAvatar.play(EAvatarAnim.Stand);
        this.myAvatar.on(Laya.Event.LABEL,this,this.onAvatarLabel);
    }

    /**销毁敌人的Avatar*/
    private disoiseEnemyAvatar(){
        if(this._avatar){
            this._avatar.dispose();
            this._avatar = null;
        }
    }

    onExit(){
        this.disoiseEnemyAvatar();

        Laya.timer.clear(this,this.onFrameEvt);
        LingChongModel.Ins.off(LingChongModel.Updata_LingChong, this, this.onUpdatePetView);
        MainModel.Ins.off(MainEvent.EquipViewClose,this,this.onEquipClose);
        // MainModel.Ins.off(MainEvent.ChestProxy,this,this.onChestProxy);
        MainModel.Ins.off(MainEvent.BoxUsed,this,this.onBoxUsed);
        MainModel.Ins.off(MainEvent.SellSucceed,this,this.onSellSucceed);
        MainModel.Ins.off(MainEvent.FightAvatarAnim,this,this.playAnim);
        this.disposePet();
        this.disposeMyAvatar();
    }
    private onUpdatePetView(){
        this.disposePet();
        this.createPet();
    }
    private createPet() {
        let myData = LingChongModel.Ins.getSZPetData();
        if (myData) {
            let petId: number = myData.petId;
            let _pet = AvatarFactory.createPet(petId, false);
            _pet.play(EAvatarAnim.Stand);
            let dir: EAvatarDir = EAvatarDir.Right;
            _pet.dir = dir;
            this._ui.pet.addChild(_pet);
            this._pet = _pet;
        }
    }
    private disposeMyAvatar(){
        // this.mainCtl.free();
        if(this.myAvatar){
            this.myAvatar.off(Laya.Event.LABEL,this,this.onAvatarLabel);
        }
    }

    private disposePet(){
        if(this._pet){
            this._pet.dispose();
            this._pet = null;
          }
    }
    private curTime:number = 0;
    private isDoubleHit:boolean = false;
    /**延迟的时间 */
    private readonly delayTime:number = 1000;


    private isExistUid(_uid:string){
        for(let i = 0;i < this.finishList.length;i++){
            let uid = this.finishList[i];
            if(uid == _uid){
                return true;
            }
        }
    }

    private isDead(){
        let _equipVo:EquipItemVo = MainModel.Ins.getNotWear();
        if(_equipVo){
            let find:boolean = this.isExistUid(_equipVo.equipVo.uid.toString());
            // for(let i = 0;i < this.finishList.length;i++){
            //     let uid = this.finishList[i];
            //     if(uid == _equipVo.equipVo.uid.toString()){
            //         find = true;
            //         break;
            //     }
            // }
            if(find){
                // E.ViewMgr.ShowMidLabel(E.LangMgr.getLang(`WeiTuoTips`));//请先处理当前宝箱
                // MainModel.Ins.openUiByEquipVo(_equipVo.equipVo,true);
                return true;
            }
        }
    }
    private animIndex:number = 0;

    /**播放动画 */
    private playAnim(){
        this.animIndex++;
        let index = this.animIndex % 2;        
        this.animCtl.Play(null,index + 1);
    }

    /**点击按钮触发 */
    fight(){
        // let _equipVo:EquipItemVo = MainModel.Ins.getNotWear();
        // if(_equipVo){
        //     let find:boolean = false;
        //     for(let i = 0;i < this.finishList.length;i++){
        //         let uid = this.finishList[i];
        //         if(uid == _equipVo.equipVo.uid.toString()){
        //             find = true;
        //             break;
        //         }
        //     }
        //     if(find){
        //         // E.ViewMgr.ShowMidLabel(E.LangMgr.getLang(`WeiTuoTips`));//请先处理当前宝箱
        //         MainModel.Ins.openUiByEquipVo(_equipVo.equipVo,true);
        //         return;
        //     }
        // }
        let _equipVo:EquipItemVo = MainModel.Ins.getNotWear();
        if(_equipVo && this.isDead()){
            MainModel.Ins.openUiByEquipVo(_equipVo.equipVo,true);
            return;
        }

        if( this._avatar && this._avatar.blood.percent == 1){
            //满血状态 宝箱不足的情况
            if(!MainModel.Ins.isItemEnoughSt(`${ECellType.BOX}-1`,true)){
                MainModel.Ins.discountPack.boxNotEnough();
                return;
            }
        }
        this.playAnim();

        if(this.isFight){

        }else{
            MainModel.Ins.ClickChest();
        }

        if(this.myAvatar.x == 0){
            this.startFight();
        }else{
            let sub = Laya.timer.currTimer - this.curTime;
            if(sub < this.delayTime){
                this.isDoubleHit = true;
                Laya.timer.once(this.delayTime,this,this.freeDoubleHit);
            }else{
                this.curTime = Laya.timer.currTimer;
            }
        }
    }

    /**开始战斗 */
    startFight(){
        this.myAvatar.moveX(350, 100, new Laya.Handler(this, this.myAtk));
    }

    private freeDoubleHit(){
        this.isDoubleHit = false;
    }

    /**主角攻击了 */
    private myAtk() {
        if(this._avatar){
            let anim = t_Box_AnimationRate.Ins.getRandomVal();
            if(this._avatar.blood.curBlood < this._atkVal){
                anim = EAvatarAnim.FightLastAttck;
            }
            if(!this._avatar.blood.isShow){
                this.freeDoubleHit();
            }
            this.myAvatar.playOnce(anim, this, this.playEnd);
        }
    }

    /**攻击结束 */
    private playEnd() {
        if(MainModel.Ins.curChest.type == EOpenChest.Auto){
            if (this._avatar && this._avatar.blood.curBlood > 0) {
                this.myAtk();
                // LogSys.Log("goon fight!!!");
                return;
            }
        }
        if (this.isDoubleHit) {
            this.myAtk();
        } else {
            this.myAvatar.play(EAvatarAnim.Stand);
            this.myAvatar.moveX(0, 100);
        }
    }
}