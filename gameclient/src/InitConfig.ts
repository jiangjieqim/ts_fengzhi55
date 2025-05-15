import { E } from "./game/G";
import { ILoginCode } from "./game/view/handle/login/LoginViewNew";
export class PlatformConfig{
    /**开发 */
    static Dev: number = 0;
    /**微信 */
    static WeiXin: number = 1;
    /**公司戳爆0.1 */
    static CB1: number = 2;
    /**抖音 */
    static DOU_YIN: number = 3;
    /**8U */
    static BaU: number = 4;
    /**War3 魔兽*/
    static War3:number = 5;
    /**美团 */
    static MEITUAN:number = 6;
    /**微信0.1折扣 */
    static WEIXIN_DISCOUNT:number = 7;
}

export class InitConfig {

    /**微信入口返回 */
    public static wxLoginResult:ILoginCode;

    private static asset:string;
    private static server_ip:string;
    private static res:string;
    private static ui:string;
    // public static selectIp:string;
    /*
    "asset":"http://127.0.0.1:9001/jjq/game/resource/",
    */
    public static getAsset() { 
        /*
        if (!this.asset && this.isExist()) {
            this.asset = initConfig.asset;//window["initConfig"]["asset"];
        }
        if(Laya.Utils.getQueryString("local_asset")){
            let s = this.asset;
            let arr = s.split("/");
            s = s.replace(arr[2],`127.0.0.1:8001`);
            this.asset = s;
        }
        if(Laya.Utils.getQueryString("asset")){
            return Laya.Utils.getQueryString("asset");
        }
        return this.asset || "";
        */
        if (!this.asset) {
            this.asset = initConfig.asset;//window["initConfig"]["asset"];
        }
        if (Laya.Utils.getQueryString("asset")) {
            return Laya.Utils.getQueryString("asset");
        }
        if (this.asset && this.asset.indexOf("http") == -1) {
            return `http://${window.location.host}${this.asset}`;
        }

        return this.asset || "";
    }

    // /**平台类型值 */
    // public static getPlatform():number{
    //     let p = HrefUtils.getHref("platform");
    //     if(p){
    //         return parseInt(p);
    //     }
    //     return initConfig.platform || PlatformConfig.Dev;
    // }
    
    /**盛也后台接口 */
    public static getSyURL(){
        // let url = HrefUtils.getHref("sy_url");
        // if(url){
        // return url;
        // }
        return initConfig.sy_url;
    }
    public static getOther(){
        return this.getAsset() + "o/";
    }

    // public static getRes() {
    //     if(!this.res && this.isExist()){
    //         return (this.getAsset() || "")+"res/";
    //     }
    //     return this.res || "";
    // }

    public static get tcp() {
        // if (window["initConfig"]) {
        // return window["initConfig"]["tcp"];
        // }
        if(initConfig){
            return initConfig.tcp;
        }
    }

    public static get frameRate(){
        if (initConfig) {
            return initConfig.frameRate || "fast";
        }
    }

    public static getServerIp() {
        // if(this.selectIp){
        //     return "ws://"+this.selectIp;
        // }
        // let debugIP = HrefUtils.getHref("ip");
        // if(debugIP){
        //     if(debugIP == "0"){
        //         return `ws://101.132.177.145:8500`;
        //     }
        //     return "ws://192.168.0."+debugIP+":"+HrefUtils.getHref("port");
        // }
        let url = HrefUtils.getHref("url");
        if(url){
            return "ws://"+url;
        }

        if(this.wxLoginResult){
            return this.wxLoginResult.result.tcp;
        }

        if(!this.server_ip && this.isExist()){
            this.server_ip = initConfig.server_ip;//window["initConfig"]["server_ip"];
        }
        return this.server_ip;
    }
    private static isExist(){
        // if(window && window["initConfig"]){
        if(initConfig){
            return true;
        }
    }

    public static getUI() {
        // if (!this.ui && this.isExist()) {
        //     if (this.getAsset().length > 0) {
        //         this.ui = this.getAsset() + "ui/";
        //     }
        // }
        // return this.ui || "";
        return "";
    }

    public static getUI2() {
        if (!this.ui && this.isExist()) {
            if (this.getAsset().length > 0) {
                this.ui = this.getAsset();
            }
        }
        return this.ui || "";
    }

    // /**
    //  * 是否是json格式的配置
    //  */
    // public static get isJson(){
    //     if(window && window["initConfig"] &&  window["initConfig"]['json']==true){
    //         return true;
    //     }
    // }

     /**
     * 是否是json格式的配置
     */
    // public static get DEBUG(){
    //     if(window && window["initConfig"] &&  window["initConfig"]['DEBUG']==true){
    //         return true;
    //     }
    // }
}

export class HrefUtils{
    /**
     * 获取html参数
     * "http://127.0.0.1:9001/jjq/game/trunk/gameclient/bin/index.html?amaDebug=1"
        getHref("amaDebug")//result "1"
     */
    public static getHref(string): string {
        if (!E.wx && window.location && window.location.search) {
            let reg = new RegExp("(^|&)" + string + "=([^&]*)(&|$)");
            let r = window.location.search.substr(1).match(reg);
            if (r) {
                return decodeURI(r[2]);
            }
        }
    }
    public static getVal(string): number {
        if (!E.wx && window.location && window.location.search) {

            let reg = new RegExp("(^|&)" + string + "=([^&]*)(&|$)");
            let r = window.location.search.substr(1).match(reg);
            if (r) {
                return parseFloat(decodeURI(r[2]));
            }
        }
    }
}
export class AnimConfig {
    public static openQuick:boolean = false;
    public static AnimScale:number = 1;
    /**抬手结束到射击到对象的时间(毫秒) 0.46666666865348816*/
    public static ShootTime:number = 466;
}