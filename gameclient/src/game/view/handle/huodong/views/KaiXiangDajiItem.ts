import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainModel } from "../../main/model/MainModel";
import { ItemVo } from "../../main/vos/ItemVo";
import { ActivityModel } from "../ActivityModel";
import { ActivityVo } from "../model/ActivityVo";
import { EActivityLingQu, EActivityType } from "../model/EActivityType";
/**开服大礼itemRender */
export class KaiXiangDajiItem extends ui.views.huodong.ui_kaixiangdaji_itemUI {
    private itemVo: ItemVo;
    private lingquCtl:ButtonCtl;
    private _activityVo:ActivityVo;
    private _cfg: Configs.t_Pack_BoxEvent_dat;
    private jingduInitW:number;
    constructor() {
        super();
        this.jingduInitW = this.jingdu.width;
        this.lingquCtl = ButtonCtl.CreateBtn(this.lingqubtn,this,this.onLingquClickHandler);
    }

    /**领取 */
    private onLingquClickHandler(){
        if(this._activityVo){
            ActivityModel.Ins.lingQu(this._activityVo.uid,this._cfg.f_id);
        }
    }
    private set disableBtn(v){
        this.lingquCtl.gray = v;
        this.lingquCtl.mouseEnable = !v;
    }
    private setLvProgress(v:number,max:number){
        this.jindutf.text = v + "/" + max;
        v--;
        max--;
        let p = v / max;
        if (p <= 0) {
            this.jingdu.visible = false;
        } else {
            this.jingdu.visible = true;
            if (p > 1) {
                p = 1;
            }
            this.jingdu.width = this.jingduInitW * p;
        }
    }
    public refreshView(_activityVo:ActivityVo) {
        this._activityVo = _activityVo;
        let _cfg: Configs.t_Pack_BoxEvent_dat = this.dataSource;
        this._cfg = _cfg;
        if (_cfg.f_BoxUse) {
            this.nameTf.text = E.LangMgr.getLang("KaiXiang2", _cfg.f_BoxUse); //使用{0}个宝箱    
            this.setProgress(MainModel.Ins.boxUsedCount,_cfg.f_BoxUse);
        } else {
            this.nameTf.text = E.LangMgr.getLang("KaiXiang1", _cfg.f_BoxLevel); //宝箱达到{0}级
            this.setLvProgress(MainModel.Ins.mRoleData.boxlv,_cfg.f_BoxLevel);
        }

        let _itemVo: ItemVo = ItemViewFactory.convertItemList(_cfg.f_Item)[0];
        this.itemVo = _itemVo;
        ItemViewFactory.refreshSlot(this.slot, _itemVo);
        let _status = EActivityLingQu.Nothing;
        let uid:number = -1;
        if(_activityVo){
            _status = _activityVo.getParam1(_cfg.f_id);
            uid = _activityVo.uid;
        }
        // if(E.Debug){
        //     this.nameTf.text+=" uid:"+uid+" f_id:"+_cfg.f_id+" status:"+_status;
        // }
        this.tf1.text = E.getLang("LingQu");
        switch(_status){
            case EActivityLingQu.Nothing:
                this.disableBtn = true;
                break;

            case EActivityLingQu.KeLingQu:
                this.disableBtn = false;
                break;

            case EActivityLingQu.YiLingQu:
                this.tf1.text =  E.getLang("LingQu2");
                this.disableBtn = true;
                break;
        }
    }

    private setProgress(v:number,max:number){
        this.jindutf.text = v + "/" + max;
        let p = v / max;
        if (p <= 0) {
            this.jingdu.visible = false;
        } else {
            this.jingdu.visible = true;
            if (p > 1) {
                p = 1;
            }
            this.jingdu.width = this.jingduInitW * p;
        }
    }
}