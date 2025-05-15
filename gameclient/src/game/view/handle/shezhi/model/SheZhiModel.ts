import { E } from "../../../../G";
import { stDingYue, stServerItem } from "../../../../network/protocols/BaseProto";

export class SheZhiModel extends Laya.EventDispatcher{
    private static _ins: SheZhiModel;

    public serverZu:number;//有多少组服务器
    public serverItems:stServerItem[];//区服列表详情
    public dingyueList:stDingYue[];
    public dyType:number;
    public bcState:number;

    public static UPDATA_VIEW:string = "UPDATA_VIEW";
    public static UPDATA_VIEW_ITEM:string = "UPDATA_VIEW_ITEM";
    public static UPDATA_MAIN_VIEW:string = "UPDATA_MAIN_VIEW";

    public static get Ins() {
        if (!this._ins) {
            this._ins = new SheZhiModel();
        }
        return this._ins;
    } 

    public setCopy(value:string){
        let input = Laya.Browser.document.createElement("input");
        input.value = value;
        Laya.Browser.document.body.appendChild(input);
        input.select();
        input.setSelectionRange(0, input.value.length);
        Laya.Browser.document.execCommand('Copy');
        Laya.Browser.document.body.removeChild(input);
        // navigator.clipboard.writeText(value);
    }

    // window.location.reload()刷新当前页面
    // window.parent.location.reload()刷新父亲对象（用于框架）
    // opener.location.reload()刷新父窗口对象（用于单开窗口）
    // top.location.reload()刷新最顶端对象（用于多开窗口）
    // window.location.reload()是刷新当前窗口，可传参数true，表示不走缓存，从服务端重新获取数据
    // 使用window.parent.location.reload()相当于按F5页面刷新，整个页面都会刷新
    // window可以省略
    public reload(){
        E.ViewMgr.ShowMidError("修复成功");
        if(typeof Laya.Browser.window.location.reload == "function"){
            Laya.Browser.window.location.reload();
        }
    }
}