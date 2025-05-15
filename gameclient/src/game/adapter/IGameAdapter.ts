import { AvatarMonsterView } from "../view/handle/avatar/AvatarMonsterView";
import { EAvatarDir } from "../view/handle/avatar/AvatarView";
/**
 * 用于魔兽,戳爆三国的适配
 */
export interface IGameAdapter {
    /**冒险展示中的怪物形象 */
    adventureCreateMonster(dir?: EAvatarDir, rideid?: number, wingid?: number, showBlood?: boolean, imageID?: number);
    /**主角的外观ID */
    leadImageId:number;
    /**随机外观 */
    randomSkin(avatar:AvatarMonsterView);
    /**更新假人 */
    updatedummuSkin(img:Laya.Image,url:string):void;
    /**设置武馆动画容器坐标 */
    setHeroAnimPosY(spr:Laya.Sprite,y:number):void;
    /**武馆动作 */
    heroAnim:string;
    /**动作索引转化 */
    // heroAnimOffset:number;
    getHeroAnimIndex(index:number):number;
}