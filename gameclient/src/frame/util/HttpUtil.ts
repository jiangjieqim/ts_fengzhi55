import { E } from "../../game/G";
import { LogSys } from "../log/LogSys";

export class HttpUtil{
    private static err(_url:string,errData){
        E.sendTrack("HttpRequest", { error: errData, val: _url});
    }
    private static complete(callBack:Laya.Handler,data){
        callBack.runWith(data);
    }
    public static httpGet(url,callBack:Laya.Handler){
		let http:Laya.HttpRequest = new Laya.HttpRequest();
		http.once(Laya.Event.COMPLETE,this,this.complete,[callBack]);
        LogSys.Log(url);
		http.send(url,null,"get");
        http.once(Laya.Event.ERROR,this,this.err,[url]);
    }
    public static httpPost(url,data: any,callBack:Laya.Handler){
		let http:Laya.HttpRequest = new Laya.HttpRequest();
		http.once(Laya.Event.COMPLETE,this,this.complete,[callBack]);
        LogSys.Log(url);
		http.send(url,data,"post");
        http.once(Laya.Event.ERROR,this,this.err,[url]);
    }
}