import { ELogLevel, LogSys } from "../../../../frame/log/LogSys";
import { HrefUtils } from "../../../../InitConfig";
import { E } from "../../../G";
import { MSGID } from "../../../network/MSGID";
import { FightResult_revc, FightStart_req, JjcFight_revc, stFightAction } from "../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../network/SocketMgr";
import { AvatarFactory } from "../avatar/AvatarFactory";
import { ActivityModel } from "../huodong/ActivityModel";
import { MainModel } from "../main/model/MainModel";
import { EFightType } from "../main/vos/ECellType";
import { JjcModel } from "./JjcModel";

export class FightTest{
    public static flyMSG():boolean{
        if(E.Debug){
            return true;
        }
        return false;
    }

    // public static get nofightlog(){
    // return HrefUtils.getVal("nofightlog")==1;
    // }

    private static print(l: stFightAction[]) {
        let str = "";
        // let l: stFightAction[] = o.fightVo.itemList;
        for (let i = 0; i < l.length; i++) {
            let cell = l[i];
            // cell.type
            // + cell.owner + " " + (cell.owner == 0 ? "己方" : "敌方") 
            str += i + " "+ "-->" + 
                                "type:" + cell.type + "\t" + AvatarFactory.getAcName(cell) + "\n";
        }
        console.log(str);
    }


    public static test3085() {
        let s = `{"protoid":3085,"type":0,"datalist":[{"uid":24,"starttime":1684771140,"endtime":1685807940,"datalist":[{"id":8,"param1":1}]}]}`;
        ActivityModel.Ins.onActivityChangeRevc(JSON.parse(s));
    }

    public static fight(id:number){
        let req = new FightStart_req();
        req.id = id;
        SocketMgr.Ins.SendMessageBin(req)
    }

    public static f2(){
        // MainModel.Ins.onFightRevc(JSON.parse(s));
    }

    //击晕状态下依旧可以触发闪避
    public static jjc(){
        // let o:JjcFight_revc = JSON.parse(s);
        // return o;
        // JjcModel.Ins.onJjcFightRevc(o);
    }

    public static load(name:string,type:EFightType = EFightType.Adventure){
        if(name.indexOf(".json") == -1){
            name = name + ".json"; 
        }
        // AnimConfig.AnimScale = 0.25;
       

        // let o:FightResult_revc = JSON.parse("");

        // while(o.fightVo.itemList.length > 20){
        // o.fightVo.itemList.pop();
        // }

        // JjcModel.Ins.onJjcFightRevc(o);
        // MainModel.Ins.onFightRevc(o);


        Laya.loader.load(name,new Laya.Handler(this,()=>{
            let str = Laya.loader.getRes(name);
            // console.log(str);
            let o = JSON.parse(str);
            if(LogSys.CanLog(ELogLevel.LOG)){
                console.log(o);
            }
           
            if( o.protoid == MSGID.JjcFightRevc){
                JjcModel.Ins.onJjcFightRevc(o);
            }else{
                // while(o.fightVo.itemList.length >= 20){
                //     o.fightVo.itemList.pop();
                // }
                MainModel.Ins.onFightRevc(o);
            }
        }),null,Laya.Loader.TEXT);
    }

    public static fightByStr(str:string){
        let o:JjcFight_revc = JSON.parse(str);
        JjcModel.Ins.onJjcFightRevc(o);
    }

}