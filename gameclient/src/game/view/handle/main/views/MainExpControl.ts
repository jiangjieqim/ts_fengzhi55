import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { E } from "../../../../G";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { ExpValueProxy ,IExpCfg} from "../../../../static/json/data/ExpValueProxy";
import { DotManager } from "../../common/DotManager";
import { JinShengModel } from "../../jinsheng/model/JinShengModel";
import { UpstageRankProxy } from "../../jinsheng/proxy/JinShengProxy";
import { MainModel } from "../model/MainModel";

// import { ExpValueProxy, IExpCfg } from "../model/ExpValueProxy";

export class MainExpControl {
    private expbg: Laya.Image; private expv: Laya.Image; private tf: Laya.Label;private Lvtf: Laya.Label;
    private lab_js: Laya.Label;private lab_js1: Laya.Label;private btn_js: Laya.Image;
    constructor(_expbg: Laya.Image, _expv: Laya.Image, tf: Laya.Label,Lvtf:Laya.Label,
        lab_js:Laya.Label,lab_js1:Laya.Label,btn_js:Laya.Image) {
        this.expbg = _expbg;
        this.expv = _expv;
        this.tf = tf;
        this.Lvtf = Lvtf;
        this.lab_js = lab_js;
        this.lab_js1 = lab_js1;
        this.btn_js = btn_js;

        ButtonCtl.Create(this.btn_js,new Laya.Handler(this,this.onBtnJsClick));
        // this.lab_js.on(Laya.Event.CLICK,this,this.onBtnJsClick);
    }

    private onBtnJsClick(){
        E.ViewMgr.Open(EViewType.JinShengView);
    }

    public SetValue() {
        // v = 20087100000;
        // let cfg:IExpCfg = ExpValueProxy.Ins.expMap[MainModel.Ins.lv];
        // ExpValueProxy.Ins.getLvCfg(v);
        let cfg:Configs.t_ExpValue_dat = ExpValueProxy.Ins.getBylv(MainModel.Ins.lv);
        if(cfg){
            let v:number = MainModel.Ins.exp;
            // let _start = cfg.minExp;
            let val = v / cfg.f_ExpValue;
            if(val > 1) val = 1;
            this.Lvtf.text = "Lv. " + MainModel.Ins.lv;  //+cfg.lv.toString();
            this.tf.text =  v + "/" + cfg.f_ExpValue;
            this.SetProgress(val);
        }
    }

    private SetProgress(v) {
        this.expv.width = v * this.expbg.width;
    }

    public SetJS(){
        let cfg:Configs.t_Upstage_Rank_dat = UpstageRankProxy.Ins.getCfgByID(JinShengModel.Ins.promotionLevel);
        if(cfg){
            this.lab_js.text = cfg.f_name;
            this.lab_js1.text = cfg.f_namestage;
            if(JinShengModel.Ins.isRedTip()){
                DotManager.addDot(this.btn_js,10,-10);
            }else{
                DotManager.removeDot(this.btn_js);
            }
        }else{
            DotManager.removeDot(this.btn_js);
        }
    }
}