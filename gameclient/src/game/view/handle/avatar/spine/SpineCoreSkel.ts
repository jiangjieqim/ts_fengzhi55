import { EEquipType } from "../../main/vos/ECellType";
import { BaseSpineCoreSkel } from "./BaseSpineCoreSkel";
import { ESpineSlotId } from "./SpineManager";
/**获取插槽id */
function getSlotID(type:EEquipType){
    switch(type){
        case EEquipType.Barde:
            return ESpineSlotId.BODY;
        case EEquipType.Casque:
            return ESpineSlotId.HEAD;
        case EEquipType.Weapon:
            return ESpineSlotId.WEAPON;
        case EEquipType.Shield:
            return ESpineSlotId.SHIELD;
        case EEquipType.Shoe:
            return ESpineSlotId.FOOT1;
        case EEquipType.Wing:
            return ESpineSlotId.WING1;
    }
    // console.warn("getSlotID:"+type);
}

/**spine 内核控制类 */
export class SpineCoreSkel extends BaseSpineCoreSkel {
    // public static animRate:number = 1.0;
   
    
    /**设置部位皮肤 */
    public setSlot(type:EEquipType,val:number){
        let slot = getSlotID(type);
        if(!slot){
            // LogSys.Warn("type " + type + " is null!");
            // if(E.Debug){
            // console.error("type " + type + " is null!");
            // }
            // return;
        }else{
            let url = "";
            if (slot == ESpineSlotId.SHIELD || slot == ESpineSlotId.WEAPON) {
                url = `o/item/${type}_${val}.png`;
            } else {
                url = `o/equip/hero_${val}.png`;
            }
            this.loadProxy.pushSkin(slot, url);
            this.loadProxy.load();
        }
    }

    /**设置坐骑皮肤 */
    public setHorseSkin(rideId: number) {
        let slotList: string[] = [
            ESpineSlotId.HTAIL,
            ESpineSlotId.HBODY,
            ESpineSlotId.HNECK,
            ESpineSlotId.HFOOT2,
            ESpineSlotId.HFOOT1,
            ESpineSlotId.HHEAD,
            ESpineSlotId.HFOOT2_2,
            ESpineSlotId.HFOOT1_2,
        ];
        let url: string = `o/horse_spine/horse_${rideId}.png`;
        for (let i = 0; i < slotList.length; i++) {
            this.loadProxy.pushSkin(slotList[i], url);
        }
        this.loadProxy.load();
    }

    /**设置翅膀皮肤,wing = 0的时候为透明的翅膀,即没有翅膀 */
    public setWingSkin(wing: number) {
        this.loadProxy.pushSkin(ESpineSlotId.WING1, `o/item/13_${wing}.png`);
        this.loadProxy.pushSkin(ESpineSlotId.WING2, `o/item/13_${wing}.png`);
        this.loadProxy.load();
    }
}

// export class SpineCore extends Laya.EventDispatcher
// {
//     private loadProxy:SpineLoadManager = new SpineLoadManager();

//      /**基础骨架 */
//      public baseSkel:Laya.SpineSkeleton;

//      private baseTemplet:Laya.SpineTemplet;
//     //  private callBack:Laya.Handler;
//      constructor(url){
//          super();
//         //  this.callBack = callBack;
//          let _templet: Laya.SpineTemplet = new Laya.SpineTemplet(Laya.SpineVersion.v3_8);
//          _templet.loadAni(url);
//          this.baseTemplet = _templet;
//          _templet.once(Laya.Event.COMPLETE, this, this.onCompleteHandler);
//      }
 
//      private onCompleteHandler(){
//          let _templet:Laya.SpineTemplet = this.baseTemplet;
//          if(_templet){
//             //添加到舞台
//             let skel:Laya.SpineSkeleton = _templet.buildArmature();
//             this.baseSkel = skel;
//             //  this.callBack.run();
//             this.loadProxy.skel = skel;
//             /*
//             this.loadProxy.pushSkin(ESpineSlotId.HEAD, `o/equip/hero_${Math.floor(Math.random()*29) + 1}.png`);
//             this.loadProxy.pushSkin(ESpineSlotId.BODY,`o/equip/hero_${Math.floor(Math.random()*29) + 1}.png`);

//             this.loadProxy.pushSkin(ESpineSlotId.SHIELD, `o/item/12_${Math.floor(Math.random()*29) + 1}.png`);
//             this.loadProxy.pushSkin(ESpineSlotId.WEAPON, `o/item/9_${Math.floor(Math.random()*29) + 1}.png`);

//             this.loadProxy.load();
//             // Laya.stage.addChild(skel);
//             // skel.x = Laya.stage.width/2;
//             // skel.y = Laya.stage.height/2;
//             skel.play(Math.floor(skel.getAnimNum() * Math.random()),true);
//             */
//             this.event(Laya.Event.COMPLETE);
//         }
//      }

//        /**替换坐骑皮肤 */
//     private setHorseSkin(rideId:number){
//         let slotList:string[] = [
            
//             // ESpineSlotId.HFOOT1_2,
//             // ESpineSlotId.HFOOT2_2,
//             ESpineSlotId.HTAIL,
//             // ESpineSlotId.FOOT_M,
//             ESpineSlotId.HBODY,
//             ESpineSlotId.HNECK,
//             ESpineSlotId.HFOOT2,
//             ESpineSlotId.HFOOT1,
//             ESpineSlotId.HHEAD,
//    			ESpineSlotId.HFOOT2_2,
//     		ESpineSlotId.HFOOT1_2,
//             // ESpineSlotId.DAOGUANG2,
//         ];
//         let url:string = `o/horse_spine/horse_${rideId}.png`;
//         for(let i = 0;i < slotList.length;i++){
//             this.loadProxy.pushSkin(slotList[i], url);
//         }
//     }

//     /**替换翅膀皮肤 */
//     private setWingSkin(wing:number){
//         this.loadProxy.pushSkin(ESpineSlotId.WING1, `o/item/13_${wing}.png`);
//         this.loadProxy.pushSkin(ESpineSlotId.WING2, `o/item/13_${wing}.png`);
//     }
// }
