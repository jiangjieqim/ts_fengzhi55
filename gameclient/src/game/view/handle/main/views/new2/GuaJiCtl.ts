import { RandomUtil } from "../../../../../../frame/util/RandomUtil";
import { AvatarFactory } from "../../../avatar/AvatarFactory";
import { AvatarMainCtl } from "../../../avatar/AvatarMainCtl";
import { AvatarMainView } from "../../../avatar/AvatarMainView";
import { AvatarMonsterView } from "../../../avatar/AvatarMonsterView";
import { EAvatarDir } from "../../../avatar/AvatarView";
import { EAvatarAnim } from "../../../avatar/vos/EAvatarAnim";
import { GuaJiCfgProxy } from "../../../guaji/proxy/GuaJiProxy";
import { LingChongModel } from "../../../lingchong/model/LingChongModel";
import { Enemy_ImageProxy } from "../../model/AdventureProxy";
import { MainModel } from "../../model/MainModel";

interface IGuaJiSkin {
    img_m: Laya.Image;
    img_m1: Laya.Image;
    role1: Laya.Sprite;
    role: Laya.Sprite;
    pet:Laya.Sprite;
}
/**探险挂机组件 */
export class GuaJiCtl {
    private mainCtl:IAvatarMainCtl = new AvatarMainCtl();
    private readonly useTime:number = 26800;//动作播放的时间
    private get myAvatar():AvatarMainView{
        return this.mainCtl.mAvatar;
    }
    private _avatar:AvatarMonsterView;
    private _pet:AvatarMonsterView;
    private _tw1:Laya.Tween;
    private _tw2:Laya.Tween;
    private _ui:IGuaJiSkin;

    constructor(skin: IGuaJiSkin) {
        this._ui = skin;
        this.mainCtl.con = skin.role;
        this._tw1 = new Laya.Tween();
        this._tw2 = new Laya.Tween();
    }

    public onInit() {
        this.onExit();
        this.tween1();

        LingChongModel.Ins.on(LingChongModel.Updata_LingChong,this,this.onUpdatePetView);

        this.initMainAvatar();
        this.onUpdatePetView();

        ///////////////////////////////////////////////////////////////
        this._avatar = AvatarFactory.createFightMonsterAvatar(EAvatarDir.Left,0,0,false,0);//MainModel.Ins.randomImageID
        this._avatar.reset();
        this._ui.role1.addChild(this._avatar);
        Laya.timer.once(2000,this,this.avatarMove);
    }

    private onUpdatePetView(){
        this.disposePet();
        this.createPet();
    }

    private initMainAvatar(){
        // this.myAvatar = AvatarFactory.getStandHorseMainAvatar(); //AvatarFactory.getFightMainAvatar(EAvatarDir.Right,0,MainModel.Ins.wingId,false);
        this.mainCtl.create(new Laya.Handler(this,this.initCallBack));
        // this._ui.role.addChild(this.myAvatar);
    }

    private initCallBack(){
        this.myAvatar.reset();
        this.myAvatar.dir = EAvatarDir.Right;
        this.myAvatar.play(EAvatarAnim.Move);
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

    private avatarMove(){
        let ran:number = RandomUtil.RandomRoundInt(1,60);
        let cfg = Enemy_ImageProxy.Ins.getCfg(ran);
        if(this._avatar){
            this._avatar.mSkin = Enemy_ImageProxy.Ins.toTSkin(cfg);
            this._avatar.visible = true;
            this._avatar.moveX(-200,2000,Laya.Handler.create(this,this.moveAvEnd),EAvatarAnim.NormalStand);
            this._avatar.play(EAvatarAnim.NormalStand);
        }
    }
    private moveAvEnd(){
        let offX = this._ui.role1.x - this._ui.role.x;
        if(this.myAvatar){
            this._avatar.play(EAvatarAnim.Stand);
            this.myAvatar.moveX(offX - 310,500,Laya.Handler.create(this,this.moveEnd),EAvatarAnim.Move);
        }
        this._tw1.pause();
        this._tw2.pause();
    }
    private moveEnd(){
        if(!this.myAvatar)return;
        this.myAvatar.playOnce(EAvatarAnim.Attack, this, this.onAttackEnd);
    }
    private tween1(){
        this._ui.img_m.x = 0;
        this._ui.img_m1.x = this._ui.img_m1.width - 1;
        this._tw1.to(this._ui.img_m,{x:-this._ui.img_m.width},this.useTime,null,Laya.Handler.create(this,this.onTween1,[this._ui.img_m.width - 1,0]));
        this._tw2.to(this._ui.img_m1,{x:0},this.useTime,null,Laya.Handler.create(this,this.onTween2,[0,-this._ui.img_m.width]));
    }

    private onTween1(wid:number,xx:number){
        this._ui.img_m.x = wid;
        this._tw1.to(this._ui.img_m,{x:xx},this.useTime,null,Laya.Handler.create(this,this.onTween1,[0,-this._ui.img_m.width]));
    }

    private onTween2(wid:number,xx:number){
        this._ui.img_m1.x = wid;
        this._tw2.to(this._ui.img_m1,{x:xx},this.useTime,null,Laya.Handler.create(this,this.onTween2,[this._ui.img_m.width - 1,0]));
    }

    private onAttackEnd(){
        if(!this.myAvatar)return;
        this.myAvatar.playOnce(EAvatarAnim.Attack2, this, this.onAttackEnd1);
        this.onDie();
        // Laya.timer.once(1,this,this.onDie);
    }
    private onDie(){
        if(this._avatar){
            this._avatar.playOnce(EAvatarAnim.Die, this, this.onAttackEnd2);
        }
    }
    private onAttackEnd1(){
        if(!this.myAvatar)return;
        this.myAvatar.play(EAvatarAnim.Stand);
    }

    private onAttackEnd2(){
        if(this._avatar){
            this._tw1.resume();
            this._tw2.resume();
            this._avatar.stop();
            this._avatar.visible = false;
            this._avatar.setPos(0,0);
            if(this.myAvatar){
                this.myAvatar.moveX(0,100);
            }
            this.myAvatar.play(EAvatarAnim.Move);
            let tt = GuaJiCfgProxy.Ins.GetDataById(1).f_EnemyCD * 1000;
            Laya.timer.once(tt,this,this.avatarMove);
        }
    }

    private disposeMyAvatar(){
        // if(this.myAvatar){
        //     this.myAvatar.dispose();
        //     this.myAvatar = null;
        // }
        this.mainCtl.free();
    }

    onExit() {
        LingChongModel.Ins.off(LingChongModel.Updata_LingChong, this, this.onUpdatePetView);

        Laya.timer.clear(this, this.avatarMove);
        if (this._avatar) {
            this._avatar.dispose();
            this._avatar = null;
        }
        this.disposePet();
        this.disposeMyAvatar();

        Laya.Tween.clearAll(this._ui.img_m);
        Laya.Tween.clearAll(this._ui.img_m1);
        this._tw1.clear();
        this._tw2.clear();
    }

    private disposePet(){
        if(this._pet){
            this._pet.dispose();
            this._pet = null;
          }
    }
}