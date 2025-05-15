import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { TabControl } from "../../../../../../frame/view/TabControl";
import { ui } from "../../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { E } from "../../../../../G";
import { CheifMoraleReward_req, CheifStarUpMulti_req, stCheifStarUp } from "../../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../../network/SocketMgr";
import { SimpleEffect } from "../../../avatar/SimpleEffect";
import {DotManager} from "../../../common/DotManager";
import { MainModel } from "../../../main/model/MainModel";
import { FuJiangModel } from "../../model/FuJiangModel";
import { FuJiangCollConProxy, FuJiangListProxy, FuJiangStarProxy } from "../../proxy/FuJiangProxy";
import { FuJiangItem6 } from "../item/FuJiangItem6";

export class FuJiangViewCtl6{
    protected _ui:ui.views.fujiang.ui_fujiangView6UI;

    private tabsCtl:TabControl;
    private tabList: any;

    constructor(skin:ui.views.fujiang.ui_fujiangView6UI) {
        this._ui = skin;

        this._ui.on(Laya.Event.DISPLAY,this,this.onAdd);
        this._ui.on(Laya.Event.UNDISPLAY,this,this.onRemove);

        const tabsSkin = [this._ui.tab1,this._ui.tab2,this._ui.tab3,this._ui.tab4,this._ui.tab5,this._ui.tab6,this._ui.tab7];
        this.tabList = ["全部","一般","精良","稀有","史诗","天赐","神铸"];
        this.tabsCtl  = new TabControl();
        this.tabsCtl.init(tabsSkin, new Laya.Handler(this,this.onTabSelectHandler), new Laya.Handler(this, this.itemTabHandler));

        this._ui.list.itemRender = FuJiangItem6;
        this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);

        ButtonCtl.Create(this._ui.btn_lq,new Laya.Handler(this,this.onBtnLQClick));
        ButtonCtl.Create(this._ui.btn,new Laya.Handler(this,this.onBtnClick));
        ButtonCtl.Create(this._ui.btn_jb,new Laya.Handler(this,this.onBtnJBClick));
        ButtonCtl.Create(this._ui.btn_sx,new Laya.Handler(this,this.onBtnSXClick));

        this._ui.sp.x = this._ui.sp.x + 7;
        this._ui.sp.y = this._ui.sp.y - 32;
    }

    private onBtnJBClick(){
        E.ViewMgr.Open(EViewType.FujiangJBView);
    }

    private onBtnSXClick(){
        FuJiangModel.Ins.oldStarArr = [];
        for(let i:number=0;i<this._array.length;i++){
            if(this._array[i].val){
                FuJiangModel.Ins.oldStarArr.push(this._array[i]);
            }
        }
        if(FuJiangModel.Ins.oldStarArr.length > 0){
            let arr:stCheifStarUp[] = [];
            for(let i:number=0;i<FuJiangModel.Ins.oldStarArr.length;i++){
                let data:stCheifStarUp = new stCheifStarUp;
                data.cheifId = FuJiangModel.Ins.oldStarArr[i].cfg.f_cheifid;
                data.num = FuJiangModel.Ins.oldStarArr[i].val;
                arr.push(data);
            }
            let req:CheifStarUpMulti_req = new CheifStarUpMulti_req;
            req.dataList = arr;
            SocketMgr.Ins.SendMessageBin(req);
        }
    }

    private itemTabHandler(tabSkin, index: number, sel: boolean, data){
        let skin: ui.views.fujiang.ui_tabUI = tabSkin;
        skin.lab_name.text = this.tabList[index];
        switch (index) {
            case 0:
                skin.lab_name.color = "#FCEABE";
                break;
            case 1:
                skin.lab_name.color = "#ededed";
                break;
            case 2:
                skin.lab_name.color = "#5ea6ff";
                break;
            case 3:
                skin.lab_name.color = "#c060f7";
                break;
            case 4:
                skin.lab_name.color = "#fff43d";
                break;
            case 5:
                skin.lab_name.color = "#f83535";
                break;
            case 6:
                skin.lab_name.color = "#1cf2ff";
                break;
        }
        if (sel) {
            skin.img1.visible = true;
            skin.img2.visible = false;
        } else {
            skin.img1.visible = false;
            skin.img2.visible = true;
        }
    }

    private _array;
    private onTabSelectHandler(v:number){
        if(v == -1)return;
        this._array = [];
        let array = [];
        let arr = [];
        let arr1 = [];
        for(let i:number=0;i<FuJiangListProxy.Ins.List.length;i++){
            let cfg = FuJiangListProxy.Ins.List[i];
            if(v == 0 || cfg.f_country == v){
                let nowNum:number = 0;
                let data = FuJiangModel.Ins.getFuJiangCfgById(cfg.f_cheifid);
                if(data){
                    nowNum = data.star;
                }else{
                    nowNum = 0;
                }
                let obj:any = {};
                if(nowNum >= FuJiangStarProxy.Ins.maxLv){
                    obj.cfg = cfg;
                    obj.val = 0;
                    obj.nowNum = nowNum;
                    arr.push(obj);
                    continue;
                }

                let lvNum: number = -1;
                let num = 0;
                let val = MainModel.Ins.mRoleData.getVal(cfg.f_piecesid);
                let starArr = FuJiangStarProxy.Ins.List;
                for (let j: number = nowNum; j < starArr.length; j++) {
                    num += starArr[j].f_upstarcost_new;
                    if (val < num) {
                        lvNum = j;
                        break;
                    }
                }
                if(lvNum == -1){
                    lvNum = FuJiangStarProxy.Ins.maxLv;
                }
                
                if(lvNum - nowNum > 0){
                    obj.cfg = cfg;
                    obj.val = lvNum - nowNum;
                    obj.nowNum = nowNum;
                    array.push(obj);
                }else{
                    if(data){
                        obj.cfg = cfg;
                        obj.val = 0;
                        obj.nowNum = nowNum;
                        arr.push(obj);
                    }else{
                        obj.cfg = cfg;
                        obj.val = 0;
                        obj.nowNum = nowNum;
                        arr1.push(obj);
                    }
                }
            }
        }
        array.sort(this.onSort1);
        arr.sort(this.onSort1);
        arr1.sort(this.onSort1);
        this._array = array.concat(arr.concat(arr1));;
        this._ui.list.array = this._array;

        if(FuJiangModel.Ins.isTJStarRedTip(v)){
            DotManager.addDot(this._ui.btn_sx,10,-10);
        }else{
            DotManager.removeDot(this._ui.btn_sx);
        }
    }

    public onSort1(a:any,b:any){
        let aCfg:Configs.t_Chief_List_dat = a.cfg;
        let bCfg:Configs.t_Chief_List_dat = b.cfg;
        if(aCfg.f_cheifQuality > bCfg.f_cheifQuality){
            return -1;
        }else if(aCfg.f_cheifQuality < bCfg.f_cheifQuality){
            return 1;
        }else{
            if(aCfg.f_id > bCfg.f_id){
                return 1;
            }else if(aCfg.f_id < bCfg.f_id){
                return -1;
            }else{
                return 0;
            }
        }
    }

    public onAdd(){
        FuJiangModel.Ins.on(FuJiangModel.FUJIANG_UPDATA,this,this.onUpdataView);
        FuJiangModel.Ins.on(FuJiangModel.FUJIANG_SHIQI_UPDATA,this,this.updataPro);
        FuJiangModel.Ins.on(FuJiangModel.FUJIANG_STAR,this,this.starAni);
        FuJiangModel.Ins.on(FuJiangModel.FUJIANG_JIBAN,this,this.setJBRedTip);
        this.tabsCtl.selectIndex = 0;
        this.updataView();
    }

    public onRemove(){
        FuJiangModel.Ins.off(FuJiangModel.FUJIANG_UPDATA,this,this.onUpdataView);
        FuJiangModel.Ins.off(FuJiangModel.FUJIANG_SHIQI_UPDATA,this,this.updataPro);
        FuJiangModel.Ins.off(FuJiangModel.FUJIANG_STAR,this,this.starAni);
        FuJiangModel.Ins.off(FuJiangModel.FUJIANG_JIBAN,this,this.setJBRedTip);
        this.tabsCtl.selectIndex = -1;
        FuJiangModel.Ins.isPlayStarAni = false;
    }

    private _cheifId:number;
    private _num:number;
    private _numAll:number;
    private starAni(cheifId:number){
        FuJiangModel.Ins.isPlayStarAni = true;
        this._cheifId = cheifId;
        let vo = FuJiangModel.Ins.getFuJiangCfgById(this._cheifId);
        this._numAll = vo.star - FuJiangModel.Ins.oldStar;
        this._num = 0;
        for(let i:number=0;i<this._numAll;i++){
            Laya.timer.once(i * 300,this,this.platEff,null,false);
        }
    }

    private platEff(){
        let ani:SimpleEffect = new SimpleEffect(this._ui.sp, `o/spine/shengxing/shengxing`);
        ani.play(0,false,this,this.effEnd,[ani]);
    }

    private effEnd(ani:SimpleEffect){
        if(ani){
            ani.dispose();
            ani = null;
        }
        this._num ++;
        if(this._num == this._numAll){
            FuJiangModel.Ins.isPlayStarAni = false;
            E.ViewMgr.Open(EViewType.FuJiangStar,null,this._cheifId);
        }
    }

    private onBtnLQClick(){
        let req:CheifMoraleReward_req = new CheifMoraleReward_req;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onBtnClick(){
        E.ViewMgr.Open(EViewType.FuJiangSQTip);
    }

    private onRenderHandler(item:FuJiangItem6,index:number){
        item.setData(item.dataSource);
    }

    private updataView(){
        this.updataPro();
        this.setJBRedTip();
    }

    private onUpdataView(){
        this.onTabSelectHandler(this.tabsCtl.selectIndex);
        this.updataPro();
        this.setJBRedTip();
    }

    private updataPro(){
        let num = FuJiangCollConProxy.Ins.GetDataById(1).f_starlevel;
        this._ui.lab_num.text = FuJiangModel.Ins.getAllStarNum() + "";
        this._ui.lab_dec.text = "每集齐" + num + "颗星可获得奖励";
        this._ui.lab_pro.text = FuJiangModel.Ins.moraleRewardNum + "/" + num;
        if(FuJiangModel.Ins.isAwardRedTip()){
            this._ui.btn_lq.skin = "remote/fujiang/fj_bx_1.png";
            this._ui.btn_lq.mouseEnabled = true;
            this._ui.pro.width = 544;
            DotManager.addDot(this._ui.btn_lq,0,5);
        }else{
            this._ui.btn_lq.skin = "remote/fujiang/fj_bx.png";
            this._ui.btn_lq.mouseEnabled = false;
            this._ui.pro.width = FuJiangModel.Ins.moraleRewardNum / num * 544;
            DotManager.removeDot(this._ui.btn_lq);
        }

        for(let i:number=0;i<7;i++){
            if(FuJiangModel.Ins.isTJStarRedTip(i)){
                DotManager.addDot(this._ui["tab" + (i + 1)],10,-10);
            }else{
                DotManager.removeDot(this._ui["tab" + (i + 1)]);
            }
        }
    }

    private setJBRedTip(){
        if(FuJiangModel.Ins.isFJJBRedTip()){
            DotManager.addDot(this._ui.btn_jb,15,-15);
        }else{
            DotManager.removeDot(this._ui.btn_jb);
        }
    }
}