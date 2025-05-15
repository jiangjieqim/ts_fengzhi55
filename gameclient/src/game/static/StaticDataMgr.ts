
import { LogSys } from "../../frame/log/LogSys";
import { InitConfig } from "../../InitConfig";
import { E } from "../G";
import { MainModel } from "../view/handle/main/model/MainModel";
import { BaseCfg } from "./json/data/BaseCfg";
import { ZipJson } from "./ZipJson";
// export interface IGameJson{
// /**1是提审 */
// ts:string; 
// }
export interface Ijszip {
    files;
}
export class t_Txt_Config extends BaseCfg{
    GetTabelName(){
        return "t_Txt_Config";
    }
    private static _ins: t_Txt_Config;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Txt_Config();
        }
        return this._ins;
    }
    replaceAll(str,s,t){
        let index = str.indexOf(s)
        if(index == -1){
            return str;
        }
        str = str.replace(s,t);
        return this.replaceAll(str,s,t);
    }

    /**替换指定的文本 */
    replace(str:string){
        let index = MainModel.Ins.skinStyle - 1;
        if(index == 0){

            // if(str.indexOf("|")!=-1){
            //     return str.split("|")[index];
            // }
            return str;
        }
        let l:Configs.t_Txt_Config_dat[] = this.List;
        // if(MainModel.Ins.skinStyle)
        for(let i = 0;i < l.length;i++){
            let cfg = l[i];
            let arr = cfg.f_str.split("|");
            // str = str.replace()
            // let s = "/" + arr[0] + "/g";
            // str = str.replace(s,arr[index]);
            str = this.replaceAll(str,arr[0],arr[index]);
        }
        return str;
    }

}
// export let JSZip = window["JSZip"];
/**配置表数据管理器
 * -所有读取的配表数据都在这里声明一个实例进行缓存，统一走这里调用
*/
export class StaticDataMgr extends Laya.EventDispatcher{
    public jsonList: ZipJson[] = [];
    private bList: ByteCfg[] = [];

    private static _ins: StaticDataMgr;
    public static get Ins() {
        if (!this._ins) this._ins = new StaticDataMgr();
        return this._ins;
    }

    constructor() { 
        super();
    }

    private parseBs(bs: Laya.Byte) {
        let cnt = bs.readUint32();
        let list2 = [];
        for (let i = 0; i < cnt; i++) {
            // console.log("pos:",bs.pos);
            let len = bs.readUint32();
            let ns = new Laya.Byte();
            let ba = bs.readArrayBuffer(len);//bs.readUint8Array(bs.pos,len);//
            ns.writeArrayBuffer(ba);
            let b = new ByteCfg();
            b.init(ns);
            list2.push(b);
            // console.log(ns.length);
        }
        // if(HrefUtils.getHref("debug")=="1"){
            // console.log("parseBs:",cnt);
            // console.log(list2);
        // }
        this.bList = list2;
    }

    public getData(url) {
        let arr = url.split("/");
        let name = arr[arr.length - 1];
        let mName = name.split('.')[0];
        let node = this.haveName(mName);
        if (node) {
            return node;
        }
        for (let i = 0; i < this.jsonList.length; i++) {
            let jn: ZipJson = this.jsonList[i];
            if (jn.name == name) {
                return jn.getJson();
            }
        }
        return null;
    }

    private haveName(mName: string) {
        for (let i = 0; i < this.bList.length; i++) {
            let node:ByteCfg = this.bList[i];
            if (`cfg_${node.tableName}` == mName) {
                return node;
            }
        }
        return false;
    }
    public moduleJson:string;
    public gameJson:string;
    private uiBin:string = "";
    private allBin:string = "";
    // private hashURL:string = "";
    public hasVal:string = "";
    private onLoadComplete(){
        let all = Laya.loader.getRes(this.allBin);

        // let gj = Laya.loader.getRes(StaticDataMgr.Ins.gameJson);
        // MainModel.Ins.gamejsonData = gj;

        LogSys.Log("StaticDataMgr onLoadComplete...");

        let data = all;
        
        let zip: Ijszip = JSZip(all);
        let buffer = zip.files['all.bin'].asArrayBuffer();
        data = buffer;

        let hash = zip.files['hash'].asArrayBuffer();
        
        if(hash){
            let _hashBs = new Laya.Byte();
            _hashBs.endian = Laya.Byte.LITTLE_ENDIAN;
            _hashBs.writeArrayBuffer(hash);
            _hashBs.pos = 0;
            let _hashStr =  _hashBs.readUTFBytes();
            LogSys.Log("hash:"+_hashStr);
            this.hasVal = _hashStr;
        }
        for (let i in zip.files) {
            if (i.indexOf('.json') != -1) {
                this.jsonList.push(new ZipJson(i, zip.files[i]));
            }
        }
        // LogSys.Log(`### moduleCfg:[${JSON.stringify(LoadUtil.GetJson(this.moduleJson))}]`);
    
        let bs = new Laya.Byte();
        bs.endian = Laya.Byte.LITTLE_ENDIAN;
        bs.writeArrayBuffer(data);
        bs.pos = 0;
        this.parseBs(bs);

        //ui
        this.parseUI(this.uiBin);

        // let obj = Laya.Loader.getRes(this.gameJson);

        // this.hasVal = Laya.Loader.getRes(this.hashURL);
        // console.log(hash);

        this.event(Laya.Event.COMPLETE);

        E.MsgMgr.reset();
    }
    public langKey:string = "";

    public Init() {
        let asset: string = InitConfig.getAsset();
        this.allBin = E.all_bin+"?"+Math.random();
        this.uiBin = asset + `o/config/export/ui.bin` + "?" + Math.random();
        // this.hashURL = `${asset}o/config/export/hash?${E.randomKey}`;
        this.gameJson = asset + `o/config/game.json` + "?" + E.randomKey;
        this.langKey = "o/font/lang.json";//asset + "o/font/lang.json" + "?" + E.randomKey;

        // this.moduleJson = asset + "o/config/module.json";
        // { url: this.moduleJson, type: Laya.Loader.BUFFER },
        LogSys.Log("StaticDataMgr Init");
        // ResPath.Font.Lang + 
        let resList = [   { url: this.langKey, type: Laya.Loader.JSON },
            { url: this.allBin, type: Laya.Loader.BUFFER },
            { url: this.uiBin, type: Laya.Loader.BUFFER },
            { url: this.gameJson, type: Laya.Loader.JSON },
            // { url: this.hashURL, type: Laya.Loader.TEXT },
        ];
        Laya.loader.load(resList,new Laya.Handler(this, this.onLoadComplete));
    }

    //解析ui
    private parseUI(ui_path:string){
        let uifile = Laya.loader.getRes(ui_path);
        let zip: Ijszip = JSZip(uifile);
        for(let fileName in zip.files){
            let _zipfile = zip.files[fileName];
            if(_zipfile._data){
                let _zipJson:ZipJson =  new ZipJson(fileName, _zipfile);
                _zipJson.isUI = true;
                let basePath =  Laya.URL.basePath;
                let uiURL = `${basePath}views${fileName}`
                Laya.Loader.loadedMap[uiURL] = _zipJson.getJson();//设置资源池
            }
        }

        // console.log(1);
    }
}