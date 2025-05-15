import { HrefUtils } from "../../../../../InitConfig";
import { ui } from "../../../../../ui/layaMaxUI";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { ZuoqiVo } from "../../zuoqi/vos/ZuoqiVo";
import { EquipmentIDProxy } from "../model/EquipmentProxy";
import { ItemViewFactory } from "../model/ItemViewFactory";
import { EEquipType } from "../vos/ECellType";

/**设置星星 */
export function f_setStar(headSkin:ui.views.zuoqi.ui_zuoqi_storge_itemUI,v:number){
/*
    let l:Laya.Image[] = [
        headSkin.s0,
        headSkin.s1,
        headSkin.s2,
        headSkin.s3,
        headSkin.s4,
        headSkin.s5,
    ];
    let _oneStar:Laya.Image = headSkin.s0;
    let _w = _oneStar.width * _oneStar.scaleX;
    for(let i = 0;i < l.length;i++){
        let _star = l[i];
        if(i < v){
            _star.visible = true;
        }else{
            _star.visible = false;
        }
    }
    headSkin.stars.x = (headSkin.width - _w * v) / 2;
*/
    // v = HrefUtils.getVal("star")||v;

    ItemViewFactory.setStar(headSkin.stars,v,v);
    if(v > 0){
        headSkin.starbg.visible  = true;
    }else{
        headSkin.starbg.visible  = false;
    }
}

/**坐骑格子控制器 */
export class ZuoQiSlotCtl{
    /**是否是主角 */
    // public isMain:boolean = false;
    public mData:ZuoqiVo;
    public clickHandler:Laya.Handler;
    private skin:ui.views.zuoqi.ui_zuoqi_storge_itemUI;

    private _mSelected:boolean = true;
    private _mCk:boolean  = true;
    private get vo():ZuoqiVo{
        return this.mData;
    }
    constructor(skin:ui.views.zuoqi.ui_zuoqi_storge_itemUI|ui.views.fujiang.ui_fujiangItem9UI,_mouseClick:boolean = false){
        this.skin = skin;
        this.mSelected = false;
        this.mCkSelected = false;
        if(_mouseClick){
            this.skin.on(Laya.Event.CLICK, this, this.onClickHandler);
        }
    }
    protected set star(v:number){
        f_setStar(this.skin,v);
    }
    private onClickHandler() {
        if(this.clickHandler){
            this.clickHandler.runWith(this.vo);
        }
    }
    public set mCkSelected(v:boolean){
        if(this._mCk != v){
            this.skin.ck.visible = v;
            this._mCk = v;
        }
    }
    public set mSelected(v:boolean){
        if(this._mSelected != v){
            this.skin.sel.visible = v;
            this._mSelected = v;
        }
    }

    public empty(){
        this.skin.typename.text = "";
        this.skin.icon.skin = "";
        this.skin.tf1.text = "";
        this.skin.qua.skin = "";
        this.star = 0;
        this.skin.bg.visible = true;
    }

    public refresh() {
        this.skin.icon.skin = "";
        this.skin.tf1.text = "";
        this.skin.starbg.visible  = false;
        this.skin.bg.visible = false;
        ///////////////////////////////////////
        if (!this.vo || this.vo && this.vo.isEmpty) {
            this.star = 0;
            this.skin.qua.skin = IconUtils.Bg;
            let cfg: Configs.t_EquipmentID_dat = EquipmentIDProxy.Ins.GetDataById(EEquipType.ZuoQi);
            if (cfg) {
                this.skin.typename.text = cfg.f_name;
            }
        } else {

            let str = "";
            
            // if (DebugData.debug) str += "-"+ this.vo.quality + "*" + this.vo.lv + "*" + this.vo.starLv + "";

            this.skin.typename.text = "";
            let _icon:string;
            // if(this.isMain){
                // _icon = IconUtils.getHorseIcon(this.vo.mainid);
            // }else{
            _icon = this.vo.getIcon();
            // }
            this.skin.icon.skin = _icon;
            this.skin.tf1.text = IconUtils.str2Lv(this.vo.lv)+str;
            this.skin.qua.skin = this.vo.getQualityIcon();
            this.star = this.vo.starLv;
        }
    }
}