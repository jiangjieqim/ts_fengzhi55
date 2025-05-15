import { MRichText } from "../../../../../frame/util/RichLabelUtil";
import { E } from "../../../../G";
import { ZipJson } from "../../../../static/ZipJson";

export class ChatLineUI extends Laya.Box{

    private _textfiled:Laya.HTMLDivElement;

    constructor(){
        super();
    }

    /** data:输入文本框chatInfo的文本内容**/
	public init(data:string):void
	{
		//初始化聊天单条内容的位置
		this.pos(0,0);
		//实例化HtmlDivElement,并添加到当前容器中
		if(this._textfiled == null){
			this._textfiled = new Laya.HTMLDivElement();
			this.addChild(this._textfiled);
		}
		//设置文本样式
		(Laya.HTMLStyle as any)._inheritProps.push('family');
		this._textfiled.width = 600;//文本宽945
        this._textfiled.style.family = ZipJson.BOLD;
        this._textfiled.style.lineHeight = 40;
		this._textfiled.style.color = "#9C5F3A";//文字颜色
		this._textfiled.style.fontSize = 22;//文字大小
		this._textfiled.style.leading = 10;
		// this._textfiled.style.valign = "middle";
		this._textfiled.style.align = "left";
		this._textfiled.innerHTML = data;
		this._textfiled.height = this._textfiled.contextHeight + 4;//文本实际内容距离文本上下各2像素间距

		// this._textfiled.width = 600;
		// this._textfiled.style.lineHeight = 40;
		// this._textfiled.style.leading = 10;
		// this._textfiled.style.align = "left"
		// this._textfiled.style.valign = "bottom";
		// let fontSize:number = 24;
        // let font = E.sdk.convertFont(ZipJson.BOLD);
		// let arr = data.split("&*&");
		// let st = "";
		// for(let i:number=0;i<arr.length;i++){
		// 	let r:MRichText = new MRichText();
		// 	r.SetColor("#9C5F3A");
        // 	r.SetFontSize(fontSize);
        // 	r.SetFontFamily(font);
        // 	r.SetStroke(0);
        // 	r.SetContent(arr[i]);
		// 	st += r.HTMLText;
		// }
		// this._textfiled.innerHTML = st;
		// this._textfiled.height = this._textfiled.contextHeight + 4;//文本实际内容距离文本上下各2像素间距
        // let r1:MRichText = new MRichText();
        // r1.SetColor("#9C5F3A");
        // r1.SetFontSize(fontSize);
        // r1.SetFontFamily(font);
        // r1.SetStroke(0);
        // r1.SetContent("都是十分士大夫十分的撒大苏打阿达阿达");

		// let r2:MRichText = new MRichText();
        // r2.SetColor("#00ff00");
        // r2.SetFontSize(fontSize);
        // r2.SetFontFamily(font);
        // r2.SetStroke(0);
        // r2.SetContent("都是十分士大夫十分<img src='o/daluandou/3.png' style='width:34px;height:30px'></img>");
		// this._textfiled.innerHTML = r1.HTMLText + r2.HTMLText;
		// this._textfiled.height = this._textfiled.contextHeight + 4;//文本实际内容距离文本上下各2像素间距
	}

	private createRichHtmlText(str:string,color:string){
        let fontSize:number = 26;
        let font = E.sdk.convertFont(ZipJson.BOLD);
        let r1:MRichText = new MRichText();
        r1.SetColor(color);
        r1.SetFontSize(fontSize);
        r1.SetFontFamily(font);
        r1.SetStroke(0);
        r1.SetContent(str);
        return r1.HTMLText;
    }

    public dispose():void{
		this.removeSelf();
	}
}