import { AvatarFactory } from "../../avatar/AvatarFactory";
import { MainModel } from "../../main/model/MainModel";
import { EEquipType } from "../../main/vos/ECellType";
import { TwoAvatar } from "./TwoAvatar";

export class NiceAvatarView extends TwoAvatar {
    public dispose() {
        if (this.avatar) {
            this.avatar.dispose();
            this.avatar = null;
        }
    }
    public refreshSkin(){
        if(this.avatar){
            this.avatar.wingId = this.wingId;
            this.avatar.rideId = this.rideId;
            this.avatar.refreshSkin();
        }
    }
    public updateSkin(equipType:EEquipType,equipStyle:number){
        if(equipType == EEquipType.ZuoQi){
            this.rideId = equipStyle;
        }else if(equipStyle == EEquipType.Wing){
            this.wingId = equipStyle;
        }
        this.dispose();
        this.init();
        this.avatar.updateSkin(equipType,equipStyle);
    }
    public resetEmpty(){
        
    }

    public init() {
        let equipList = MainModel.Ins.getEquipList();
        this.avatar = AvatarFactory.createBaseMainAvatar(equipList, this.rideId, this.wingId);
        this.avatarCon.addChild(this.avatar);
    }

}