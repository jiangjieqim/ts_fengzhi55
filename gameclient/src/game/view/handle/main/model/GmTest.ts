import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { EMsgBoxType, EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { ActivityStatus_revc, OpenStation_req, OptionalGift_req, stActivityStatus, stCellValue, stMail, stOptionalGift, stOptionalItem } from "../../../../network/protocols/BaseProto";
import { uint64 } from "../../../../network/protocols/uint64";
import { SocketMgr } from "../../../../network/SocketMgr";
import { BaseCfg } from "../../../../static/json/data/BaseCfg";
import { SpineTemplateCache } from "../../avatar/spine/SpineTemplateCache";
import { SpineEffectManager } from "../../avatar/SpineEffectManager";
import { ActivityModel } from "../../huodong/ActivityModel";
import { FightTest } from "../../jjc/FightTest";
import { ItemProxy } from "../proxy/ItemProxy";
import { TaskProxy } from "../proxy/TaskProxy";
import { IPlusAnimVo } from "../views/new2/FightNumPlay";
import { RewardUseItem } from "../views/RewardGetView";
import { EFuncDef } from "./EFuncDef";
import { MainEvent } from "./MainEvent";
import { MainModel } from "./MainModel";
import { RedEnum } from "./RedEnum";
import { ISaveData, RedUpdateModel } from "./RedUpdateModel";

function createBtn(that,func,color:string = "#ff0000",y:number = 0,label:string=null){
    let btn = new Laya.Sprite();
    btn.width = btn.height = 100;
    btn.graphics.drawRect(0,0,btn.width,btn.height,color,"#000000",2);
    btn.alpha = 0.25;
    btn.hitArea = new Laya.Rectangle(0,0,btn.width,btn.height);
    btn.on(Laya.Event.CLICK,that,func);
    btn.y = y;
    if(label){
        let txt = new Laya.Text();
        txt.text = label;
        txt.fontSize = 24;
        btn.addChild(txt);
    }
    return btn;
}
class t_Test extends BaseCfg{
    public GetTabelName():string{
        return "t_Test";
    }

}

function ttOpenSider(){
    window['tt'].navigateToScene({
        scene: "sidebar",
        success: (res) => {
            console.log("navigate to scene success");
            // 跳转成功回调逻辑
        },
        fail: (res) => {
            console.log("navigate to scene fail: ", res);
            // 跳转失败回调逻辑
        },
    });
    
}


export function rebuildStatShow() {

    
    Laya.Stat['_StatRender'].createUIPre = function
        createUIPre(x, y) {
        var pixel = Laya.Browser.pixelRatio;
        let StatUI = Laya.Stat['_StatRender'];
        let that = StatUI;

        that._width = pixel * 360;
        that._vx = pixel * 120;
        that._height = pixel * (that['_view'].length * 12 + 3 * pixel) + 4;
        StatUI._fontSize = 12 * pixel;
        for (var i = 0; i < that._view.length; i++) {
            that._view[i].x = 4;
            that._view[i].y = i * StatUI._fontSize + 2 * pixel;
        }
        if (!that._canvas) {
            that._canvas = new Laya.HTMLCanvas(true);
            that._canvas.size(that._width, that._height);
            that._ctx = that._canvas.getContext('2d');
            that._ctx.textBaseline = "top";
            that._ctx.font = StatUI._fontSize + "px Arial";
            that._canvas.source.style.cssText = "pointer-events:none;background:rgba(150,150,150,0.5);z-index:100000;position: absolute;direction:ltr;left:" + x + "px;top:" + y + "px;width:" + (that._width / pixel) + "px;height:" + (that._height / pixel) + "px;";
        }
        if (!Laya.Browser.onKGMiniGame) {
            Laya.Browser.container.appendChild(that._canvas.source);
        }
        that._first = true;
        that.loop();
        that._first = false;
    }

    // let su = Laya.StatUI;
    Laya.Stat['_StatRender'].show = function
        show(x = 0, y = 0) {
        let that = Laya.Stat['_StatRender'];
        if (!Laya.Browser._isMiniGame && !Laya.Render.isConchApp)
            that['_useCanvas'] = true;
        that['_show'] = true;
        Laya.Stat['_fpsData'].length = 60;
        that['_view'][0] = { title: "FPS(WebGL)", value: "_fpsStr", color: "yellow", units: "int" };
        that['_view'][1] = { title: "Sprite", value: "_spriteStr", color: "white", units: "int" };
        that['_view'][2] = { title: "RenderBatches", value: "renderBatches", color: "red", units: "int" };
        that['_view'][3] = { title: "SavedRenderBatches", value: "savedRenderBatches", color: "white", units: "int" };
        that['_view'][4] = { title: "CPU", value: "cpuMemory", color: "yellow", units: "int" };// units: "M" "K" "int"
        that['_view'][5] = { title: "GPU", value: "gpuMemory", color: "yellow", units: "int" };
        that['_view'][6] = { title: "Shader", value: "shaderCall", color: "white", units: "int" };
        that['_view'][7] = { title: "Canvas", value: "_canvasStr", color: "white", units: "int" };
        if (Laya.Render.is3DMode) {
            that['_view'][0].title = "FPS(3D)";
            that['_view'][8] = { title: "TriFaces", value: "trianglesFaces", color: "white", units: "int" };
            that['_view'][9] = { title: "FrustumCulling", value: "frustumCulling", color: "white", units: "int" };
            that['_view'][10] = { title: "OctreeNodeCulling", value: "octreeNodeCulling", color: "white", units: "int" };
        }
        if (that['_useCanvas']) {
            that['createUIPre'](x, y);
        }
        else
            that['createUI'](x, y);
        that.enable();
    }
}
function iterate(obj) {
    var res = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            res.push(key + ': ' + obj[key]);
    }
    return res;
}

let gm:Function;

export class GmTest {
    // public static maxTaskID:number = 0;
    // static debugVer:string = "2024-0314-1640";
    private cmdList:string[] = [];
    // private onTimeLoop(){
    //     if(this.cmdList.length > 0){
    //         MainModel.Ins.gm(this.cmdList.shift());
    //     }
    // }

    /**最大的任务id */
    public static maxTaskId(){
        let taskstr = "";
        let l1 = TaskProxy.Ins.taskList;
        for(let i = 0;i < l1.length;i++){
            taskstr+= l1[i] + " ";
        }
        let maxTaskId = l1[l1.length-1];
        // LogSys.Log(`gm('task ${maxTaskId} 2')\n`);
        // GmTest.maxTaskID = maxTaskId;
        return maxTaskId;
    }



    
    subday(day){
        let servertime = TimeUtil.openTime.toNumber()/1000 + day * 60 * 24 * 60;
        window['gm'](`server ${servertime}`);
    }

    /**
     * HrefUtils.getVal
     * boxNoAnim 无宝箱动画
     */
    constructor() {        
        // let u1 = new uint64(3020270757,392,true);
        // console.log(u1.toNumber());
        // let u2 = new uint64(1,0);
        // let n = u1.sub(u2).toNumber();
        // console.log(u1.toNumber());
        // console.log(u2.toNumber()-u1.toNumber());
        // let u3 = fromString('1678157633381',true);
        // console.log(u3);
        // console.log(new uint64(0xFFFFFFFF | 0, 0xFFFFFFFF | 0, true).toString());    18446744073709551615
        // Laya.timer.frameLoop(60,this,this.onTimeLoop);

        let cmdList = this.cmdList;
        let that = this;
        window["gm"] = function (str: string) {
            let arr = str.split(" ");
            let cmdName = arr[0];
            let p1 = arr[1];
            let p2 = arr[2];
            if(cmdName == "serverday"){
                that.subday(parseInt(p1));
                return;
            }else if(cmdName == "ui"){
                E.ViewMgr.Open(parseInt(p1));
                return;
            }else if(cmdName == "fight"){
                let name = arr[1];
                FightTest.load(name);
                return;
            }
            else if(cmdName == "funccheck"){
                console.log(MainModel.Ins.isOpenAllByFuncid(p1));
                return;
            }
            else if(cmdName == "act_status"){
                //gm("act_status 30 0")
                let revc = new ActivityStatus_revc();
                revc.datalist = [];
                let cell = new stActivityStatus();
                cell.uid = parseInt(p1);
                cell.status = parseInt(p2);
                revc.datalist.push(cell);
                ActivityModel.Ins.setStatus(revc);
                return;
            }
            else if(cmdName == "finishtask"){
                window["gm"](`task ${GmTest.maxTaskId()} 2`);
                return;
            }
            else if(cmdName == "debug_reward"){
                let o:RewardUseItem = new RewardUseItem();
                let l = [];
                let count = parseInt(p1) || 15;
                for(let  i = 0;i < count;i++){
                    let cell = new stCellValue();
                    cell.id = 1;
                    cell.count = i + 1;
                    l.push(cell);
                }
                o.itemList = l;
                E.ViewMgr.openReward(o);
                return;
            }
            else if(cmdName == "debug_pop"){
                MainModel.Ins['discountPack'].start();
                return;
            }
            else if(cmdName == "ad"){
                E.sdk.lookVideo((type: 0 | 1 | 2)=>{
                    console.log("========>",type);
                }); 
                return;
            }
            else if(cmdName == "debug_clear"){
                //清理客户端暂存数据
                RedUpdateModel.Ins.clearData();
                return;
            }
            else if(cmdName == "debug_nextdaytime"){
                let s = TimeUtil.getZeroSecond(TimeUtil.serverTime) + 3600*24 + 1;
                console.log(`time: ${s}`);
                return;
            }
            else if(cmdName == "debug_offset_time"){
                // TimeUtil.serverTimeV = new uint64(parseInt(p1));
                TimeUtil.setSubTime(parseInt(p1));
                return;
            }
            else if(cmdName == "debug_test"){
                RedUpdateModel.Ins.updateDiscountTime();
                return;
            }
            else if(cmdName == "debug_add_pop"){
                let count:number = RedUpdateModel.Ins.getValByID(RedEnum.DISCOUNT_POP_LOGIN_COUNT);
                RedUpdateModel.Ins.save(RedEnum.DISCOUNT_POP_LOGIN_COUNT,count+1);
                return;
            }
            else if(cmdName == "openui"){
                E.ViewMgr.Open(parseInt(p1),null,p2);
                return;
            }
            else if(cmdName == "version"){
                // E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk,GmTest.debugVer);
                return;
            }
            else if(cmdName == "openLvPop"){
                MainModel.Ins['openLvPop'](parseInt(p1));
                return;
            }
            else if(cmdName == "localguide"){
                E.localGuideMgr.setItemId(parseInt(p1));
                return;
            }
            else if(cmdName == "shortcut"){
                E.sdk.hasShortcut = true;
                MainModel.Ins.event(MainEvent.UpdateListView);
                return;
            }
            else if(cmdName == "plus"){
                // console.log(`func: ${MainModel.Ins.isOpenAllByFuncid(p1)}`);
                // let vo:IPlusAnimVo = {} as IPlusAnimVo;
                // vo.start = parseInt(p1);
                // vo.end = parseInt(p2);
                // E.ViewMgr.Open(EViewType.FightNumPlay,null,vo);

                // for(let i = 0;i < 10;i++){
                //     let vo:IPlusAnimVo = {} as IPlusAnimVo;
                //     vo.start = i * 10;
                //     vo.end = i * 100;
                //     MainModel.Ins.plusplay.setPlus(vo.start,vo.end);
                // }
                // return;
                
                let req:OptionalGift_req = new OptionalGift_req();
                let cell = new stOptionalGift();
                cell.id = 1;
                let items  = [];
                let item = new stOptionalItem();
                item.itemIdx = 0;
                item.pos = 0;
                items.push(item);
                cell.items = items;
                req.dataList = [cell];
                SocketMgr.Ins.SendMessageBin(req);
                return;
            }

            // else if(cmdName == "stop_localguide"){
                // E.localGuideMgr.stop();
                // return;
            // }

            console.log(str);
            MainModel.Ins.gm(str);

            // let arr = str.split(";");
            // this.cmdList = arr;
            // for(let i = 0;i < arr.length;i++){
            // cmdList.push(arr[i]);
            // }
        }

        window["item"] = function () {
            return ItemProxy.Ins.List;
        }
        window["effect"] = function(url){
            SpineEffectManager.Ins.playOnce(url,Laya.stage,Laya.stage.width/2,Laya.stage.height/2);
            // MainModel.Ins.mainView.playZhangHe();
        }

        let testCfg:t_Test;
        window["setred"] = function(funcid,v){
            // console.log("===>"+GmTest.maxTaskId());
            // if(!testCfg){
            //     testCfg = new t_Test();
            // }
            // let l = testCfg.List;
            // console.log(l);
            // HuanZhuangModel.Ins.redDot = v;
            MainModel.Ins.funcSetRed(funcid,v);
        }

        // 
        // window["openui"] = function(id){
        //     E.ViewMgr.Open(id)
        // }
        window["cfg"] = function (name) {
            if(name == "item")
                return ItemProxy.Ins.List;
            if(name == "task")
                return TaskProxy.Ins.List;
        }

        window["gc"] = function(){
            spineRes.GC();
        }

        if (debug) {
            rebuildStatShow();

            // let btn = createBtn(this,testFunc);
            // let btn2 = createBtn(this,()=>{
            //     window['ft']('1.json');
            // },"#00ff00",120,"1.json");
            let offsetY:number = 200;
            
            if(Laya.Utils.getQueryString("debug_btn")){
                let btn2 = createBtn(this,()=>{
                    // gm("fight 1");
                },"#00ff00",120+offsetY);

                let btn4 = createBtn(this,()=>{
                    // E.ViewMgr.Open(EViewType.ChatView);
                    // E.ViewMgr.Open(EViewType.ZiXuanLiBaoView);
                    ActivityModel.Ins.openFunc(4,EViewType.MeiRiLiBao,3);
                },"#0000ff");
                btn4.y = 220+ offsetY;
            
                if(Laya.Utils.getQueryString("mainview")){

                }else{
                    Laya.stage.frameLoop(60,this,()=>{
                        Laya.stage.addChild(btn2);
                        Laya.stage.addChild(btn4);
                    });
                }
            }
            
            // Laya.timer.callLater(this,()=>{
            //     E.ViewMgr.ShowMidError("dadjadjal");
            // });

            window["test1"] = function (v) {
                // AnimConfig.AnimScale = v;
                // E.ViewMgr.ShowMidLabel(Math.random()+"");
                // E.ViewMgr.Open(EViewType.QianDao);
                console.log("==========================================================")
                let l = SpineTemplateCache.Ins.tempList;
                for(let i = 0;i < l.length;i++){
                    let cell = l[i];
                    if(cell.used == false){
                        console.log(i + " " + cell.toString());
                    }else{
                        console.log("%c" +i + " " + cell.toString(),"color:red");
                    }
                }
            }
            // window["soundplay"] = function(url:string){
                // ActivityModel.Ins.showXinRenView();
                // E.AudioMgr.PlaySound1(url);//"drum.mp3"
            // }

            window['gm_help'] = function () {
                let file = `http://101.132.177.145:8001/Project1/Client/trunk/protos/GM.md`;
                Laya.loader.load(file, new Laya.Handler(this, () => {
                    console.log(Laya.loader.getRes(file));
                }), null, Laya.Loader.TEXT);
            }

            let that = this;
            window["tt1"] = function (){
                // this.inviationCtl.nextRefreshTime = revc.nextRefreshTime;
                // HeroHouseModel.Ins.inviationCtl.nextRefreshTime = 0;
                // E.sdk.lookVideo((type: 0 | 1 | 2) => {});
                // let monster = AvatarFactory.createFightMonsterAvatar();
                // Laya.stage.addChild(monster);
                // monster.setPos(Laya.stage.width/2,Laya.stage.height/2);
                // monster.play(EAvatarAnim.Attack,that,that.onPlayEnd,[1,2,monster]);
            
                // console.log(`当前版本是否为主线版本:`+(E.sdk.clienttype == EClientType.Main))
            }
        }
        gm = window["gm"];


        window["f"] = function () {
            window["gm"](`task ${GmTest.maxTaskId()} 2`);


            // attr 10002 999999;attr 10003 999999;attr 10004 999999;attr 10005 999999
            // window["gm"](`exp 10000`);
        }
        // window["ui"] = function(id){
            // E.ViewMgr.Open(id);
            // FightTest.fightByStr(MainModel.Ins.fightCMD);
        // }
        // window["val"] = function(type,subType){
            // EActivityType.DuanWu,this.subType
            // let vo =    ActivityModel.Ins.getVoByP2(type,subType);
            // console.log(vo);
        // }
        window['fight'] = function(name,type){
            FightTest.load(name,type);
        }
        window["load"] = function(v){
            if(v > 0) {
                E.ViewMgr.ShowLoading();
            }else{
                E.ViewMgr.Close(EViewType.Loading);
            }
        }
        
        window["red"] = function(funcId:EFuncDef,v:boolean){
            MainModel.Ins.funcSetRed(funcId,v);
        }
       
    }

 
}

// gm('attr 10002 999999;attr 10003 999999;attr 10004 999999;attr 10005 999999');