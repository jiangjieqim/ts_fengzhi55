import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { IWingData } from "../interface/IWing";
import { ItemViewFactory } from "../model/ItemViewFactory";
import { WingIdProxy } from "../proxy/WingProxy";

/**
 * 翅膀装备格子
 */
export class WingItemView{

    /**
     * 装备数据
     */

    private skin:ui.views.main.ui_main_zhuangbeiUI;
    private wingData: IWingData;

    constructor(skin:ui.views.main.ui_main_zhuangbeiUI){
        this.skin = skin;
        this.skin.redimg.visible = false;
        this.skin.on(Laya.Event.CLICK,this,this.onClickHandler);
    }

    private onClickHandler() {
        if (this.wingData.wingId) {
            E.ViewMgr.Open(EViewType.WingInfo, null, this.wingData);
        }
    }

    public setData(wingData: IWingData) {
        if(!wingData)return;
        this.wingData = wingData;
        this.clear();
        if(wingData.wingId){
            this.skin.typename.text = "";
            this.skin.tf1.text = "Lv." + wingData.level;
            const wingId = wingData.wingId;
            if (!wingData.wingName) {
                wingData.wingName = WingIdProxy.Ins.getWingName(wingId);
            }
            this.skin.icon.skin = ItemViewFactory.getWingIcon(wingId);
            this.skin.quality.skin = IconUtils.getQuaIcon(4);
        }else{
            this.skin.typename.text = "翅膀";
            this.skin.tf1.text = "";
            this.skin.icon.skin = "";
            this.skin.quality.skin = "remote/common/base/duigoukuang.png";
        }

        // if(wingData && wingData.wingId) {
        //     const wingId = wingData.wingId;
        //     if (!wingData.wingName) {
        //         wingData.wingName = WingIdProxy.Ins.getWingName(wingId);
        //     }
        //     this.wingData = wingData;
        //     this.skin.icon.visible = false;
            // this.skin.wingLeftIcon.skin = ItemViewFactory.getWingIcon(wingId);
            // this.skin.wingRightIcon.skin = ItemViewFactory.getWingIcon(wingId);
        //     this.skin.bg2.visible = true;
            
        // }
    }

    public clear() {
        
    }
}