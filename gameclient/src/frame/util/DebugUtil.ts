import { StringUtil } from "./StringUtil";

export class DebugUtil {

    public static draw(p: Laya.Sprite, color: string = "#00ff00",w?:number,h?:number,x:number = 0,y:number = 0,full:boolean = false) {
        if (debug && p) {
            this.realDraw(p,color,w,h,x,y,full);
        }
    }

    public static realDraw(p: Laya.Sprite, color: string = "#00ff00",w?:number,h?:number,x:number = 0,y:number = 0,full:boolean = false){
        let keyName:string = "debugspr";
        if(p.getChildByName(keyName)){
            p.getChildByName(keyName).removeSelf();
        }
        let spr = new Laya.Sprite();
        spr.name = keyName;
        spr.mouseThrough = true;
        spr.width = p.width;
        spr.height = p.height;
        spr.graphics.clear();
        let offset = 2;
        spr.graphics.drawRect(x + offset, y + offset, (w || p.width) - offset * 2, (h || p.height) - offset * 2, !full?null:color, color, 1);
        spr.alpha = full ? 0.5 : 1;
        p.addChild(spr);
    }

    public static drawCross(p: Laya.Sprite, x: number = 0, y: number = 0, _size: number = 10,_color:string = "#0000ff") {
        if (debug) {
            let con = new Laya.Sprite();
            let size: number = _size;
            con.graphics.clear();
            con.graphics.drawLine(x - size, y, x + size, y, _color);
            con.graphics.drawLine(x, y - size, x, y + size, _color);
            p.addChild(con);
        }
    }
    public static drawTF(view: Laya.Sprite, content: string,color:string="#ff0000") {
        if (debug) {
            let key = "debugTf";
            view.getChildByName(key);
            if (view.getChildByName(key)) {
                view.getChildByName(key).removeSelf();
            }
            
            if(StringUtil.IsNullOrEmpty(content)){
                return;
            }

            let lb = new Laya.Label();
            lb.stroke = 2;
            lb.strokeColor = "#000000";
            lb.color = color;
            view.addChild(lb);
            lb.name = key;
            lb.fontSize = 18;
            lb.text = content;

            // if(!this._uidtf){
            //     this._uidtf = new Laya.Label();
            //     this._uidtf.color = "#ff0000";
            //     this.addChild(this._uidtf);
            // }
            // this._uidtf.text = e.uniqueId || "";
        }
    }
}