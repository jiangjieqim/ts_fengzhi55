import { ui } from "../../../../../ui/layaMaxUI";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { ItemVo } from "../../main/vos/ItemVo";
import { EActivityLingQu, EActivityType } from "./EActivityType";

/**成长礼包iem控制器 */
export class ChengZhanItemCtl{
    private skin:ui.views.huodong.ui_baoxiang_chengzhang_slot_itemUI;
    constructor(_skin:ui.views.huodong.ui_baoxiang_chengzhang_slot_itemUI){
        this.skin = _skin;
    }
    private clear(){

        // this.skin.visible = false;

        this.skin.gouImg.visible = false;
        this.skin.maskbg.visible = false;
        this.skin.lock.visible = false;
    }
    public updateData(itemVo:ItemVo,left:boolean,_status:EActivityLingQu,isPay:boolean){
        this.clear();
        ItemViewFactory.refreshSlot(this.skin.slot,itemVo);

        switch(_status){
            case EActivityLingQu.Nothing:
                if(left){

                }else{
                    if(isPay){
                        
                    }else{
                        this.skin.lock.visible = true;
                    }
                }


                this.skin.maskbg.visible = true;
                break;
            case EActivityLingQu.YiLingQu:
                if(left){
                    this.skin.maskbg.visible = true;
                    this.skin.gouImg.visible = true;
                }else{
                    this.skin.lock.visible = true;
                }
                break;
            case EActivityLingQu.KeLingQu:
                if(left){
                    
                }else{
                    this.skin.lock.visible = true;
                }
                break

            case EActivityLingQu.ChongZhiWeiLingQu:
                if(left){
                    this.skin.maskbg.visible = true;
                    this.skin.gouImg.visible = true;
                }else{
                    // this.skin.lock.visible = true;
                }
                break;

            case EActivityLingQu.ChongZhiYiLingQu:
                this.skin.maskbg.visible = true;
                this.skin.gouImg.visible = true;
                break;

            case EActivityLingQu.ChongZhiAllNotLing:
                // this.skin.maskbg.visible = true;
                // this.skin.gouImg.visible = true;
                break;
        }
    }
}
