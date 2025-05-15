import { AvatarFactory } from "../view/handle/avatar/AvatarFactory";
import { AvatarMonsterView } from "../view/handle/avatar/AvatarMonsterView";
import { EAvatarDir } from "../view/handle/avatar/AvatarView";
import { MainModel } from "../view/handle/main/model/MainModel";
import { War3Config } from "../war3/War3Config";
import { IGameAdapter } from "./IGameAdapter";

/**魔兽 */
export class War3Adapter implements IGameAdapter {
    heroAnim:string = "uicage";
    adventureCreateMonster(dir?: EAvatarDir, rideid?: number, wingid?: number, showBlood?: boolean, imageID?: number) {
        return AvatarFactory.createFightMonsterAvatar(dir, rideid, wingid, showBlood, War3Config.MonsterImageId);
    }
    get leadImageId(){
        return War3Config.MainImageId;
    }
    randomSkin(_avatar:AvatarMonsterView){
        if(_avatar){
            let imageId:number = MainModel.Ins.randomImageID;
            LogSys.Log(`随机一个皮肤,更新imageId:${imageId}`);
            _avatar.refreshImageID(imageId);
        }
    }
    updatedummuSkin(img:Laya.Image,url:string){
        //魔兽不处理
    }
    setHeroAnimPosY(spr:Laya.Sprite,y:number):void{
		//魔兽不处理
    }
    getHeroAnimIndex(index:number):number{
        return index - 15;
    }
}