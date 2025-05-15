import { StringUtil } from "../../../../frame/util/StringUtil";
import { AnimConfig, HrefUtils } from "../../../../InitConfig";
import { stFightPet, stFightRole, stFightVo } from "../../../network/protocols/BaseProto";
import { PetListProxy } from "../lingchong/proxy/LingChongProxy";
import { Enemy_ImageProxy } from "../main/model/AdventureProxy";
import { AvatarConfig } from "./AvatarConfig";
import { AvatarFactory } from "./AvatarFactory";
import { AvatarView } from "./AvatarView";

/**
 * 二维向量归一化
 * @param x
 * @param y
 */
function normalize(x: number, y: number): number {
    return Math.sqrt(x * x + y * y);
}
function Rad2Deg(radian: number): number {
    return Laya.Utils.toAngle(radian);
}
function dot(x1: number, y1: number, x2: number, y2: number){
    let len1 = normalize(x1,y1);
    let len2 =  normalize(x2,y2);
    x1/=len1;
    y1/=len1;

    x2/=len2;
    y2/=len2;

    let d = x1*x2 + y1*y2;
    return d;
}
/**
    * 返回两向量夹角
    * @param x1
    * @param y1
    * @param x2
    * @param y2
    */
function vectorAngle(x1: number, y1: number, x2: number, y2: number): number {
    if (x1 == x2 && y1 == y2) {
        return;
    }
    var cosAngle = (x1 * x2 + y1 * y2) / (normalize(x1, y1) * normalize(x2, y2));
    var aCosAngle = Math.acos(cosAngle);
    var angle = Rad2Deg(aCosAngle);

    let d1 = dot(x1, y1, x2, y2);
    let d2 = dot(x1, y1, 0, -1);
    // console.log('dot:', d1, d2);
    if (d1 > 0 && d2 > 0 || d1 < 0 && d2 > 0) {
        angle = -angle;
    }
    return angle;
}

/**子弹对象 */
export class ShootAvatar extends Laya.Image{
    private get flyTime():number{
        return AnimConfig.ShootTime / AnimConfig.AnimScale;
    }
    private _tween:Laya.Tween;
    private curURL:string;
    private readonly OFFSET_Y:number = 60;
    constructor(){
        super();
        this.anchorX = 0.5;
        this.anchorY = 0.5;
    }

    // public move(id:number,sx:number,sy:number,ex:number,ey:number){
    //     // this.once(Laya.Event.COMPLETE,this,()=>{})
    //     this.skin = `o/bullet/${id}.png`;
    //     this.startMove(sx,sy,ex,ey);
    // }

    private startMove(sx:number,sy:number,ex:number,ey:number){
        this.x = sx;
        this.y = sy;
        let a = vectorAngle(ex - this.x, ey - this.y, 1, 0);
        this.rotation = a;
        if(this._tween){
            this._tween.clear();
        }else{
            this._tween = new Laya.Tween();
        }
        this._tween.to(this,{x:ex,y:ey},this.flyTime,null,new Laya.Handler(this,this.onCompleteHander));//Laya.Ease.circIn
    }

    public moveAvatar(id:number,pet:AvatarView,cur1:AvatarView){
        let shoot = HrefUtils.getVal("shootres");
        if(shoot){
            id = shoot;
        }
        this.curURL = `o/bullet/${id}.png`;
        Laya.loader.load(this.curURL,new Laya.Handler(this,this.onComplete,[pet,cur1]));
    }

    private onComplete(avatar:AvatarView,cur1:AvatarView){
        this.skin = this.curURL;
        let ox:number = 0;
        let oy:number = 0;
        let posType:number = 0;
        let pos:string;
        if(avatar.vo instanceof stFightPet)
        {
            let petVo:stFightPet = avatar.vo as stFightPet;
            let petCfg = PetListProxy.Ins.getCfgById(petVo.petId);
            pos = petCfg.f_attackpos;
            posType = petVo.pos;
        }else if(avatar.vo instanceof stFightRole || avatar.vo && typeof avatar.vo.pos == "number"){
            let avatarVo:stFightRole = avatar.vo as stFightRole;
            posType = avatarVo.pos;
            // Enemy_ImageProxy.Ins.getCfg(avatarVo.)
        }
        if(StringUtil.IsNullOrEmpty(pos)){
            pos = "100|100";
        }
        if(pos){
            // if(pos == ""){
            // pos = "100|100";
            // }
            let arr = pos.split("|");
            ox = parseInt(arr[0]);
            oy = parseInt(arr[1]);
        }
        let a:number = 1;
        // if(posType == AvatarFactory.POS_RIGHT_PET){
        if(posType > AvatarConfig.LeftPosMax){
            a = -1;
        }
        this.startMove(avatar.x + ox*a,avatar.y - oy,cur1.x,cur1.y-this.OFFSET_Y);
    }

    private onCompleteHander(){
        // this.dispose();
        // this.removeSelf();
        this.destroy();
    }
}