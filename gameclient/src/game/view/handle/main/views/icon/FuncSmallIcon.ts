import { StringUtil } from "../../../../../../frame/util/StringUtil";
import { TimeUtil } from "../../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { E } from "../../../../../G";
import { DotManager } from "../../../common/DotManager";
import { ActivityModel } from "../../../huodong/ActivityModel";
import { EActivityType } from "../../../huodong/model/EActivityType";
import { MainView } from "../../MainView";
import { EFuncDef } from "../../model/EFuncDef";
import { MainEvent } from "../../model/MainEvent";
import { MainModel } from "../../model/MainModel";
import { FuncProxy, MainIconProxy } from "../../proxy/FuncProxy";

export interface IFuncSmallIconSkin extends ISmallIcon{
    // bg: Laya.Image;
    // icon: Laya.Image;
    // tf: Laya.Label;
    // dot:Laya.Image;
}

interface ISmallIcon extends Laya.Sprite{
    dot:Laya.Image;
    icon:Laya.Image;
    bg:Laya.Image;
    tf:Laya.Label;
    ////////////////////////
    bg2:Laya.Image;
    tf2:Laya.Label;
}

/**按钮样式 */ 
export enum EButtonStyle{
    /**中间 */
    Mid = 1,
    /**底部 */
    Bottom = 2,
    /**坐标 */
    Pos = 3,
}
export interface IBaseSmallIcon extends Laya.Sprite{
    dot:Laya.Image;
    icon:Laya.Image;
    bg:Laya.Image;
    tf:Laya.Label;
}

export class FuncSmallIcon {
    public used:boolean  = false;
    public isOpen:boolean = false;
    // public tf1Dc:DrawCallNode;
    public btnStyle:EButtonStyle;

    /**有标识坐标的按钮 0代表没有定位*/
    public pos:number = 0;
    public skin: ISmallIcon;
    public funcId:number;
    ///////////////////////////////////////////////////////////////////////
    private funcCfg:Configs.t_Func_dat;
    btnCtl:ButtonCtl;
    // private _name:string;
    private cfg:Configs.t_MainIcon_dat;
    private _testTF:Laya.Label;
    // private redDc:DrawCallNode;
    /**子功能id */
    private _checkSubFuncList:number[] = [];
    // private offsetX:number;
    // private offsetY:number;
    private _debugTF:Laya.Label;
    constructor() 
    {
        // this.model = MainModel.Ins;
        // this.refresh(name,funcType,btnStyle);
    }
    public initSkin(cls){
        this.skin = new cls();// new ui.views.main.ui_main_bottom_iconUI() as any;
        this.statusLabel = "";
        this.onDisplay();
    }
    public refresh(name:string|Laya.View, funcType: EFuncDef, btnStyle: EButtonStyle,x:number=undefined,y:number=undefined){
        let skin;
        if(name instanceof Laya.View){
            skin = name;
        }else{
            skin = (E.ViewMgr.Get(EViewType.Main) as MainView).UI[name];
        }
        // this._name = name;
        let pos = 0;
        let cfg = MainIconProxy.Ins.getCfgByFuncid(funcType);

        if(cfg && btnStyle == EButtonStyle.Pos){
            pos = cfg.f_pos;
            // console.log(`==>${this._name} x=${skin.x} y=${skin.y}`);
        }
        // let layer:Laya.Sprite = MainModel.Ins.mainView.labelLayer;
        // if(btnStyle == EButtonStyle.Bottom){
        // layer = MainModel.Ins.mainView._ui.botRedLayer;
        // }
        // this.tf1Dc = MainModel.Ins.getDcNode(skin.tf,layer);
        // this.tf1Dc.initX = skin.x;
        // this.tf1Dc.initY = skin.y;
        
        this.skin = skin;
        DebugUtil.draw(this.skin);
        if(debug){
            if(!this._debugTF){
                this._debugTF = new Laya.Label();
                this._debugTF.fontSize = 18;
                this._debugTF.color = "#ff0000";
            }
            this.skin.addChild(this._debugTF);
            this._debugTF.text = funcType.toString();
        }
        this.pos = pos;
        this.btnStyle = btnStyle;

        let btnEffect = true;

        // MainModel.Ins.mainView._ui.redlayer1

        /*
        this.redDc = MainModel.Ins.getDcNode((skin as IFuncSmallIconSkin).dot,layer,EViewType.Main+'-'+name,null,DrawCallNode.TYPE_DOT);
        this.redDc.initX = skin.x;
        this.redDc.initY = skin.y;
        this.redDc.visible = false;
        */
        let btn:IFuncSmallIconSkin = skin;
        if(btn.dot){
            btn.dot.visible = false;
        }

        if(btnStyle == EButtonStyle.Bottom){
            //底部按钮

            btnEffect = false;
            this.selected = false;

        }

        let btnCon = this.skin["btnCon"];
        if(!btnCon){
            btnCon = this.skin;
        }
        this.btnCtl = ButtonCtl.CreateBtn(btnCon, this, this.onClickHandler, btnEffect);
        if(btnStyle == EButtonStyle.Mid){
            this.btnCtl.setpos(x,y);
        }
        skin.on(Laya.Event.DISPLAY,this,this.onDisplay);
        skin.on(Laya.Event.UNDISPLAY,this,this.onUnDisplay);
        this._checkSubFuncList = [];
        if(cfg && cfg.f_ui_id){
            this._checkSubFuncList = MainIconProxy.Ins.getFuncListByF_ui_id(cfg.f_ui_id);
        }

        this.setData(funcType);
        if(x!=undefined){
            this.setPos(x,y);
        }
        // if(debug){
        //     let spr = new Laya.Sprite();
        //     this.skin.addChild(spr);
        //     spr.mouseThrough = true;
        //     spr.graphics.drawRect(0,0,this.skin.width,this.skin.height,null,"#00ff00",1);
        // }
        this.update();
    }

    public update(){

    }

    updateLogicVis(v:boolean){

    }

    /**按钮状态 */
    public set statusLabel(v: string) {
        if (this.skin.bg2) {
            if (v == "") {
                this.skin.bg2.visible = this.skin.tf2.visible = false;
            }else{
                this.skin.bg2.visible = this.skin.tf2.visible = true;
                this.skin.tf2.text = v;
            }
        }
    }
    public set selected(v: boolean) {
        this.skin.bg.visible = v;
    }

    /**重置坐标 */
    public setPos(x: number, y: number) {
        // this.btnCtl.setpos(x,y);
        this.skin.x = x;
        this.skin.y = y;
        // this.btnCtl.setpos(x,y);
        
        // this.tf1Dc.offsetX = x-this.tf1Dc.initX;
        // this.tf1Dc.offsetY = y-this.tf1Dc.initY;
        // this.tf1Dc.refreshPos();


        // console.log(`setPos---> ${this._name} x=${x} y=${y}`);
        
        /*
        if(this.redDc){
            this.redDc.offsetX = x - this.redDc.initX;
            this.redDc.offsetY = y - this.redDc.initY;
            this.redDc.refreshPos();
        }
        */
    }

    protected onDisplay() {
        // TaskModel.Ins.on(TaskModel.TaskChanged, this, this.refreshView);
        MainModel.Ins.on(MainEvent.FuncSmallIconUpdate,this,this.onRedUpdate);
        // this.skin.callLater(this.onLaterHandler,[this.dcLabel]);
    }

    // private onLaterHandler(dc:DrawCallNode){
    // dc.refresh();
    // }

    public refreshView() {
        // MainModel.Ins.isOpenByFuncId(this.funcId.toString())
        // if (TaskModel.Ins.isFuncOpen(this.funcId)) {
        //     this.setData(this.funcId);
        //     this.skin.visible = true;
        // }else{
        //     this.skin.visible = false;
        // }
        this.setData(this.funcId);
    }
    protected onUnDisplay(){
        // TaskModel.Ins.off(TaskModel.TaskChanged,this,this.refreshView);
        MainModel.Ins.off(MainEvent.FuncSmallIconUpdate,this,this.onRedUpdate);
    }
    private onClickHandler(){
        if(MainModel.Ins.taLBId.indexOf(this.funcId) != -1){
            if(E.ta){
                let time = TimeUtil.timestamtoTime(TimeUtil.serverTimeMS);
                E.ta.userSetOnce({first_pack:time});
                E.ta.userSetOnce({first_pack_id:this.funcId});
                E.sendTrack("pack_click");
            }
        }

        if(this.funcCfg && this.funcCfg.f_hide_red){
            MainModel.Ins.funcSetRed(this.funcCfg.f_FunctionID,false);//首次打开的时候关闭掉红点
        }
        /////////////////////////////////////////////////////////////////   更新新人礼包的红点
        if(this.funcId ==  MainModel.Ins.newPay.newPlayerfuncId){   //EFuncDef.NewPlayer
            // && !MainModel.Ins.firstRechargeRed
            let _activityVo = ActivityModel.Ins.getVo(MainModel.Ins.newPay.activityType);    //EActivityType.t_Pack_NewPlayer
            if (_activityVo) {
                let _cfgId = _activityVo.getNewPlayerCfgId();
                if(_cfgId){
                    if(MainModel.Ins.newPlayerCloseRedList.indexOf(_cfgId)==-1)
                    {
                        MainModel.Ins.newPlayerCloseRedList.push(_cfgId);
                        MainModel.Ins.updateNewPlayerRed();
                    }
                }
            }
            //close red
        }
        /////////////////////////////////////////////////////////////////
        if(this.funcId == EFuncDef.Vip){
            ActivityModel.Ins.openFunc(EActivityType.VIP,EViewType.MeiRiLiBao,3);
            return;
        }
        E.ViewMgr.OpenByFuncid(this.funcId);
    }

    midEmptyStatus(){
        this.funcId = 0;
        let skin = this.skin;
        skin.dot.visible = false;
        skin.tf2.visible = skin.bg2.visible = false;
        skin.icon.skin = `remote/main/main/weikaifang.png`;
        skin.tf.text = "";
    }

    private onRedUpdate() {
        if (this.cfg) {
            // if (this.btnStyle == EButtonStyle.Pos || this.btnStyle == EButtonStyle.Mid) {
                // if()
                // if(mainCfg && mainCfg.f_Uiexpand){
                //     let func = MainIconProxy.Ins.getCfgByF_ui_id(mainCfg.f_Uiexpand);
                //     if(func){
                //         this.funcSetRed(parseInt(func.f_funid),status);
                //     }
                // }

                let red:boolean = false;
                if(this._checkSubFuncList.length){
                    for(let i = 0;i < this._checkSubFuncList.length;i++){
                        let funcId:number = this._checkSubFuncList[i];
                        if (MainModel.Ins.getHasRed(funcId)) {
                            red = true;
                            break;
                        }
                    }
                }else{
                   
                }

                if(!red){
                    if (MainModel.Ins.getHasRed(this.funcId)) {
                        red = true;
                    }
                }


                let x:number = 0;
                let y:number = 20;
                if(this.btnStyle == EButtonStyle.Pos){
                    x = 20;
                    y = 0;
                }
                if(this.btnStyle == EButtonStyle.Mid){
                    x = 0;
                    y = 0;
                }

                if(red){
                    DotManager.addDot(this.skin, x,y);
                }else{
                    DotManager.removeDot(this.skin);
                }
                DebugUtil.drawTF(this.skin,this.funcId + "," + (red ? 1 : 0));
            // }
        }
    }
    private getName(cfg: Configs.t_Func_dat){
        if(MainModel.Ins.isVerify(cfg) && cfg.f_ts_name){
            return cfg.f_ts_name;
        }
        // if(!cfg){
        // LogSys.Warn(1);
        // }
        if(!StringUtil.IsNullOrEmpty(cfg.f_outsidename) && this.btnStyle == EButtonStyle.Bottom){
            return cfg.f_outsidename;
        }
        return cfg.f_name;
    }
    // private clear(){
    // DotManager.removeDot(this.skin);
    // }


    private showDebug(){
        if(E.Debug){
            if(!this._testTF){
                this._testTF = new Laya.Label();
                this._testTF.fontSize = 18;
                this._testTF.color = "#00ff00";
                this._testTF.stroke = 2;
                this._testTF.strokeColor = "#000000";
                let _conSpr:Laya.Sprite = new Laya.Sprite();
                this.skin.addChild(_conSpr);
                _conSpr.graphics.drawCircle(0,0,5,"#00ffff");
            }
            this.skin.addChild(this._testTF);
            this._testTF.text = this.cfg.f_funid + "";//"[" + this.cfg.f_funid.toString() + "][" + this._name + "]";
            // this.skin.tf.text += `[${this._name}]`;
        }
    }
    private isOpenByFuncid(funcId:number){
        // let isOpen = TaskModel.Ins.isFuncOpen(funcId);
        // if(isOpen){
        //     isOpen = MainModel.Ins.isOpenByFuncId(funcId.toString());
        // }
        // return isOpen;
        return MainModel.Ins.isOpenAllByFuncid(funcId.toString());
    }
    private setData(funcType: EFuncDef) {
        // this.clear();

        let cfg = MainIconProxy.Ins.getCfgByFuncid(funcType);
        let funcCfg = FuncProxy.Ins.getCfgByFid(funcType);
        this.funcCfg = funcCfg;
        this.cfg = cfg;
        
        this.skin.tf.text = this.getName(funcCfg);

        this.funcId = parseInt(cfg.f_funid);

        let iconVal:string = "";
        let isOpen:boolean = false;
        if(this._checkSubFuncList.length){
            for(let i = 0;i< this._checkSubFuncList.length;i++){
                let funid = this._checkSubFuncList[i];
                if(this.isOpenByFuncid(funid)){
                    isOpen = true;
                    break;
                }
            }
        }else{
            // isOpen = this.isOpenByFuncid(this.funcId);
        }

        if(!isOpen){
            isOpen = this.isOpenByFuncid(this.funcId);
        }

        let vis:boolean = true;
        if(this.btnStyle == EButtonStyle.Mid){
            //中间的按钮,翅膀,换装

            let iconArr = cfg.f_icon.split(".");
            let a = iconArr[0]
            let icon = isOpen ? a : `${a}_1`;
            iconVal = `remote/main/main/${icon}.png`;
        }else if(this.btnStyle == EButtonStyle.Bottom){
            /**底部按钮 冒险*/

            let arr = cfg.f_icon.split(".");
            let _icon2:string = "";
            if(isOpen){
                _icon2 = arr[0]+"."+"png";
            }else{
                _icon2 = arr[0]+"_1."+"png";
            }
            iconVal = `remote/main/main/${_icon2}`;
            // this.skin.icon.gray = !isOpen;
        
        }else if(this.btnStyle == EButtonStyle.Pos){
            /**坐标定义的按钮,签到 */

            // this.skin.visible = isOpen;
            vis = isOpen;
            iconVal = `remote/main/main/${cfg.f_icon}`;
            
        }
        this.skin.icon.skin = iconVal;
        this.visible = vis;
        this.isOpen = isOpen;
        // if(HrefUtils.getVal("openall")){
        // this.isOpen = true;
        // this.visible = true;
        // }
        this.onRedUpdate();
        // this.skin.visible = isOpen;
    }

    public midReset(){
        this.skin.dot.visible = true;
        this.skin.tf2.visible = this.skin.bg2.visible = true;
    }

    public set visible(v:boolean){
        this.skin.visible = v;
        // if(this.tf1Dc){
        //     this.tf1Dc.visible = v;
        // }
    }

    public dispose(){
        this._checkSubFuncList = [];
        this.onUnDisplay();
        this.skin.removeSelf();
    }
}