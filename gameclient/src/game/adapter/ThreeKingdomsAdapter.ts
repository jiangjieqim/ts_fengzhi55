import { RandomUtil } from "../../frame/util/RandomUtil";
import { AvatarFactory } from "../view/handle/avatar/AvatarFactory";
import { AvatarMonsterView } from "../view/handle/avatar/AvatarMonsterView";
import { EAvatarDir } from "../view/handle/avatar/AvatarView";
import { Enemy_ImageProxy } from "../view/handle/main/model/AdventureProxy";
import { IGameAdapter } from "./IGameAdapter";

/**戳爆三国 */
export class ThreeKingdomsAdapter implements IGameAdapter {
    heroAnim:string = "hero1";
    adventureCreateMonster(dir?: EAvatarDir, rideid?: number, wingid?: number, showBlood?: boolean, imageID?: number) {
        return AvatarFactory.createFightMonsterAvatar(dir, rideid, wingid, showBlood, imageID);
    }
    leadImageId:number = 0;
    randomSkin(_avatar:AvatarMonsterView){
        //这里使用每次都构建的方式创建角色,这样兼容性比较好
        let ran:number = RandomUtil.RandomRoundInt(1,60);
        let cfg = Enemy_ImageProxy.Ins.getCfg(ran);
        if(_avatar){
            LogSys.Log("随机一个皮肤,更新:"+JSON.stringify(cfg));
            _avatar.mSkin = Enemy_ImageProxy.Ins.toTSkin(cfg);
        }
    }
    updatedummuSkin(img:Laya.Image,url:string){
        img.skin = url;
    }
    setHeroAnimPosY(spr:Laya.Sprite,y:number):void{
        spr.y = y;
    }
    getHeroAnimIndex(index:number):number{
        return index;
    }
}