import { AvatarBaseView } from "../../avatar/AvatarBaseView";
import { AvatarFactory } from "../../avatar/AvatarFactory";
import { EAvatarAnim } from "../../avatar/vos/EAvatarAnim";
import { MainModel } from "../../main/model/MainModel";
import { EEquipType } from "../../main/vos/ECellType";

export class TwoAvatar{
    
    protected avatar:AvatarBaseView;
    private horse:AvatarBaseView;
    private _horseVis:boolean = true;
    public wingId:number;
    public rideId:number;
    public avatarCon:Laya.Sprite;

    public dispose(){
        if(this.avatar){
            this.avatar.dispose();
            this.avatar = null;
        }
        if(this.horse){
            this.horse.dispose();
            this.horse = null;
        }
    }

    public refreshSkin(){
        if(this.avatar){
            this.avatar.wingId = this.wingId;
            this.avatar.rideId = this.rideId;
            this.avatar.refreshSkin();
        }
        if(this.horse && this.rideId > 0){
            this.horse.wingId = this.wingId;
            this.horse.rideId = this.rideId;
            this.horse.refreshSkin();
        }
    }

    public resetEmpty(){
        this.horseVis = false;
    }

    public updateSkin(equipType:number,equipStyle:number){
        let _avatar = this.avatar;
        if(!this.avatar.bHorseSkel && equipType == EEquipType.ZuoQi){
            if(equipStyle!=0){
                this.horseVis = true;
                _avatar = this.horse;
            }
        }else{
            this.horseVis = false;
        }
        if(_avatar){
            _avatar.updateSkin(equipType,equipStyle);
        }
    }

    public init() {
        let equipList = MainModel.Ins.getEquipList();
        if (this.rideId > 0) {
            this.avatar = AvatarFactory.createBaseMainAvatar(equipList, this.rideId, this.wingId);
        } else {
            this.avatar = AvatarFactory.createBaseMainAvatar(equipList,this.rideId,this.wingId);
            this.horse = AvatarFactory.createBaseMainAvatar(equipList,1,this.wingId);
        }
        if(this.horse){
            this.avatarCon.addChild(this.horse);
        }
        this.avatarCon.addChild(this.avatar);
        this.horseVis = false;
    }

    private set horseVis(val: boolean) {
        // if (this.horse) {
        //     this.horse.play(EAvatarAnim.NormalStand);
        // }
        // if (this.avatar) {
        //     this.avatar.play(EAvatarAnim.NormalStand);
        // }


        if(this._horseVis == val){
            return;
        }
        
        this._horseVis = val;
        if (this.horse) {
            //     this.horse.removeSelf();
            this.horse.visible = false;
        }
        if (this.avatar) {
            // this.avatar.removeSelf();
            this.avatar.visible = false;
        }
        if (val) {
            this.avatar.stop();
            if(this.horse){
                this.horse.play(EAvatarAnim.NormalStand);
                this.horse.visible = true;
            }
        }
        else {
            if (this.horse) {
                this.horse.stop();
            }
            this.avatar.visible = true;
            this.avatar.play(EAvatarAnim.NormalStand);
        }
    }

}