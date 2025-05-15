import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { HrefUtils } from "../../../../../InitConfig";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { DaLuanDouModel } from "../../daluandou/model/DaLuanDouModel";
import { JjcModel } from "../../jjc/JjcModel";
import { JjcEvent } from "../../jjc/vos/JjcEvent";
import { IJJC_Model } from "../../peakjjc/model/IJjcInterface";
import { PeakJjcModel } from "../../peakjjc/model/PeakJjcModel";
import { WuShenDianModel } from "../../wushendian/model/WuShenDianModel";
import { XXZDZModel } from "../../xxzdz/model/XXZDZModel";
import { MainView } from "../MainView";
import { EFuncDef } from "../model/EFuncDef";
import { MainEvent } from "../model/MainEvent";
import { MainModel } from "../model/MainModel";
import { TaskModel } from "../model/TaskModel";
import { FuncProxy } from "../proxy/FuncProxy";

export class MainBottomPopIconVo{
    funcid:number;
    icon:string;
    txt:string;

    public get isClose(){
        if(HrefUtils.getVal("disable_f_close")){
            return false;
        }
        let cfg:Configs.t_Func_dat = FuncProxy.Ins.getCfgByFuncId(this.funcid);
        return cfg.f_close == 1;
    }
}

// export class JJC_IconCell extends ui.views.main.ui_main_bottom_itemUI{
//     private _vo:MainBottomPopIconVo;
//     private model:IJJC_Model;
//     constructor(){
//         super();
//     }
//     public set data(v:MainBottomPopIconVo){
//         this._vo = v;
//         switch(v.funcid){
//             case EFuncDef.DF_jjc:
//                 this.model = PeakJjcModel.Ins;
//                 break;
//             case EFuncDef.Jjc:
//                 this.model = JjcModel.Ins;
//                 break;
//             default:
//                 throw Error("please check it!");
//                 // this.model = MainModel.Ins as ;
//                 // break;
//         }
//         this.model.on(JjcEvent.RedUpdate,this,this.onRed);
//         this.onRed();
//     }

//     private onRed(){
//         this.dot_red.visible = this.model.mRed;
//     }

//     public dispose(){
//         if(this.model){
//             this.model.off(JjcEvent.RedUpdate,this,this.onRed);
//         }
//     }
// }

export class SmallIconCtl{
    public skin:ui.views.main.ui_main_bottom_itemUI;
    public vo:MainBottomPopIconVo;
    public btnCtl:ButtonCtl;

    private jjcModel:IJJC_Model;
    private mainModel:MainModel;
    private _xxzdzModel:XXZDZModel;
    private _wsdModel:WuShenDianModel;
    private _daluanDou:DaLuanDouModel;
    private clsKey:string = "ui_main_bottom_itemUI";
    private onClickHandler(){
        let vo:MainBottomPopIconVo = this.vo;
        let funcid = vo.funcid;
        if(!TaskModel.Ins.isFuncOpen(funcid,true)){
            return;
        }
        let cfg:Configs.t_Func_dat = FuncProxy.Ins.getCfgByFid(funcid);
        if(cfg && cfg.f_viewType){
            E.ViewMgr.Open(cfg.f_viewType);
        }
        let mainView:MainView = E.ViewMgr.Get(EViewType.Main) as MainView;
        mainView.botIconView.hide();
    }

    private onRefresh(){
        this.data = this.vo;
    }

    public set data(v:MainBottomPopIconVo){
        MainModel.Ins.on(MainEvent.EventMainUpdateView,this,this.onRefresh);
        this.vo = v;
        this.skin = Laya.Pool.getItemByClass(this.clsKey,ui.views.main.ui_main_bottom_itemUI);
        this.skin.dataSource = v.funcid;
        DebugUtil.drawTF(this.skin,v.funcid.toString())
        if(!this.btnCtl){
            this.btnCtl = ButtonCtl.CreateBtn(this.skin,this,this.onClickHandler);
        }
        if(TaskModel.Ins.isFuncOpen(v.funcid)){ //MainModel.Ins.isOpenByFuncId(v.funcid.toString()) && 
            this.skin.icon1.gray = false;
            this.skin.tf.gray = false;
        }else{
            this.skin.icon1.gray = true;
            this.skin.tf.gray = true;
        }
        this.clear();
        this.skin.on(Laya.Event.UNDISPLAY,this,this.onUndisplay);
        switch(v.funcid){
            case EFuncDef.DF_jjc:
                this.jjcModel = PeakJjcModel.Ins;
                this.jjcModel.on(JjcEvent.RedUpdate,this,this.onRed);
                break;
            case EFuncDef.Jjc:
                this.jjcModel = JjcModel.Ins;
                this.jjcModel.on(JjcEvent.RedUpdate,this,this.onRed);
                break;
            case EFuncDef.YeWaiBoss:
                this.mainModel = MainModel.Ins;
                this.mainModel.on(MainEvent.AdventureBossUpdate,this,this.onRed);
                break;
            case EFuncDef.XXZDZ:
                this._xxzdzModel = XXZDZModel.Ins;
                this._xxzdzModel.on(XXZDZModel.RED_TIP,this,this.onRed);
                break;
            case EFuncDef.WuShenDian:
                this._wsdModel = WuShenDianModel.Ins;
                this._wsdModel.on(WuShenDianModel.RED_TIP,this,this.onRed);
                break;
            case EFuncDef.DaLuanDou:
                this._daluanDou = DaLuanDouModel.Ins;
                this._daluanDou.on(DaLuanDouModel.DA_LUAN_DOU_RED,this,this.onRed);
                break;
            default:
                // throw Error("please check it!");
                // this.model = MainModel.Ins as ;
                break;
        }
        this.onRed();
    }
    private clear(){
        if(this.jjcModel){
            this.jjcModel.off(JjcEvent.RedUpdate,this,this.onRed);
            this.jjcModel = null;
        }
        if(this.mainModel){
            this.mainModel.off(MainEvent.AdventureBossUpdate,this,this.onRed);
            this.mainModel = null;
        }
        if(this._xxzdzModel){
            this._xxzdzModel.off(XXZDZModel.RED_TIP,this,this.onRed);
            this._xxzdzModel = null;
        }
        if(this._wsdModel){
            this._wsdModel.off(XXZDZModel.RED_TIP,this,this.onRed);
            this._wsdModel = null;
        }
        if(this._daluanDou){
            this._daluanDou.off(DaLuanDouModel.DA_LUAN_DOU_RED,this,this.onRed);
            this._daluanDou = null;
        }
        this.skin.dot_red.visible = false;
    }
    private onUndisplay(){
        MainModel.Ins.off(MainEvent.EventMainUpdateView,this,this.onRefresh);
        this.skin.off(Laya.Event.UNDISPLAY,this,this.onUndisplay);
        Laya.Pool.recover(this.clsKey,this.skin);
        this.vo = null;
    }

    private onRed(){
        if(this.jjcModel){
            this.skin.dot_red.visible = this.jjcModel.mRed;
            return;
        }
        if(this.mainModel){
            this.skin.dot_red.visible = this.mainModel.mYewaiBossRed;
            return;
        }
        if(this._xxzdzModel){
            this.skin.dot_red.visible = this._xxzdzModel.isRedTip();
            return;
        }
        if(this._wsdModel){
            this.skin.dot_red.visible = this._wsdModel.isRedTip();
            return;
        }
        if (this._daluanDou) {
            this.skin.dot_red.visible = this._daluanDou.isDotMain();
            return;
        }
        this.skin.dot_red.visible = MainModel.Ins.getHasRed(this.vo.funcid);
    }
}

export class MainBottomPopView extends ui.views.main.ui_main_bottom_popUI{
    public bg:Laya.Image;
    private ctrList:SmallIconCtl[] = [];
    private bg1Offset:number;
    constructor(){
        super();
        this.bg1Offset = this.bg1.height - this.bg2.height;
        if(this['close1']){
            this['close1'].on(Laya.Event.MOUSE_DOWN,this,this.onClickHandler);
        }
        // DebugUtil.draw(this)
    }
    private onClickHandler(){
        this.hide();
    }
    
    public hide(){
        this.removeSelf();
        this.bg.visible = false;
        E.yinDaoMgr.removeYD();
        E.localGuideMgr.removeYD();
    }

    public showList(l:MainBottomPopIconVo[]){
        let key = "SmallIconCtl";
        while(this.con1.numChildren > 0){
            let cell = this.ctrList.shift();
            cell.skin.removeSelf();
            Laya.Pool.recover(key,cell);
            // cell.dispose();
        }
        let allHeight = 0;
        let _curIndex:number = 0;
        let cellW:number = 0;
        for (let i = 0; i < l.length; i++) {
            let vo = l[i];
            if (!vo.isClose) {
                let item = Laya.Pool.getItemByClass(key, SmallIconCtl);
                this.ctrList.push(item);
                item.data = vo;
                this.con1.addChild(item.skin);
                item.skin.tf.text = vo.txt;
                cellW = item.skin.width;
                // item.skin.dataSource = vo;
                item.skin.icon1.skin = vo.icon;
                // item.skin.on(Laya.Event.CLICK, this, this.onBtnClick, [item]);
                // item.skin.y = _curIndex * item.skin.height;
                item.btnCtl.setpos(0,_curIndex * item.skin.height);
                _curIndex++;
                this.con1.addChild(item.skin);
                allHeight += item.skin.height;
            }

            this.con1.x = (this.width- cellW)/2;
        }

        this.bg2.height = allHeight;
        this.bg1.height = this.bg1Offset + allHeight;
        this.height = this.bg2.y + this.bg2.height;
        this.hitArea = new Laya.Rectangle(0,0,this.width,this.height);

        Laya.timer.callLater(this,this.onShow);
    }

    private onShow(){
        E.yinDaoMgr.removeTS();
        E.yinDaoMgr.removeYD();
        E.yinDaoMgr.showYD(EViewType.Main);

        E.localGuideMgr.removeTS();
        E.localGuideMgr.showYD(EViewType.Main);

        DebugUtil.draw(this,"#00ff00",this.width,this.showHeight);
    }

    public set maskbg(img:Laya.Image){
        this.bg = img;
        img.on(Laya.Event.CLICK,this,this.hide);
    }

    public get showHeight(){
        return this.height;
    }
}