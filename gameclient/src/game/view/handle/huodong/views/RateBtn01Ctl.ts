import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { MainModel } from "../../main/model/MainModel";
import { t_Platform } from "../../main/proxy/t_Platform";
import { ShopProxy } from "../../shop/proxy/shopProxy";
/**皮肤样式 */
export enum ESkinRateBtn{
    Red = 1,
    Yellow = 2,
    Blue = 3,
}

/**按钮工具类 */
export class RateBtnUtils{
    static Refresh(btn:ButtonCtl,oldBtn:ButtonCtl,newBtn:ButtonCtl){
        if(btn == oldBtn){
            oldBtn.visible = true;
            newBtn.visible = false;
        }else{
            oldBtn.visible = false;
            newBtn.visible = true;
        }
    }
}

export class RateBtn01Ctl {
    // private get bServerEasyPay(){
    //     return MainModel.Ins.bServerEasyPay;
    // }
    private _cfg: Configs.t_Purchase_Price_dat;

    private _skin: ui.views.huodong.ui_01rate_btnUI;
    btnCtl: ButtonCtl;
    constructor(skin: ui.views.huodong.ui_01rate_btnUI, that, func: Function, type: ESkinRateBtn, bo: boolean = false) {
        this._skin = skin;
        this.btnCtl = ButtonCtl.CreateBtn(skin, that, func);
        skin.lab_qg.visible = bo;
        skin.yellowbg.visible = false;
        skin.bg.visible = false;
        skin.hot_img.visible = false;
        switch(type){
            case ESkinRateBtn.Red:
                skin.bg.visible = true;
                skin.hot_img.visible = true;
                skin.bg.skin = `remote/common/base/anniu_red.png`;
                break;
            case ESkinRateBtn.Yellow:
                skin.yellowbg.visible = true;
                break;
            case ESkinRateBtn.Blue:
                skin.bg.visible = true;
                skin.bg.skin = `remote/common/base/anniu_blue1.png`;
                break;
        }
    }

    dispose(){
        this.btnCtl.dispose();
    }

    set visible(v:boolean){
        this._skin.visible = v;
    }

    set cfg(_cfg:Configs.t_Purchase_Price_dat){
        this._cfg = _cfg;
        if(_cfg){
            this._skin.zh_img.visible = true;
            if(t_Platform.Ins.dispriceHide){
                //隐藏原价划线
                this._skin.real_tf.visible = false;
            }else{
                this._skin.real_tf.visible = true;
                this._skin.real_tf.text = StringUtil.moneyCv(_cfg.f_price) + E.getLang("CNY");
            }
            // let money: number = 0;
            let money = MainModel.Ins.getEasyPayMoneyVal(_cfg);
            
            this._skin.tf1.text = money + E.getLang("CNY");
        }
    }

    get cfg(){
        return this._cfg;
    }

    set lbText(v:string){
        this._skin.zh_img.visible = false;
        this._skin.real_tf.visible = false;
        this._skin.tf1.text = v;
    }
}