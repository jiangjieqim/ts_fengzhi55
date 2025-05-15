export class GeometryUtil {
    private static GetCross(p1: Laya.Point, p2: Laya.Point, p: Laya.Point) {
        return (p2.x - p1.x) * (p.y - p1.y) - (p.x - p1.x) * (p2.y - p1.y);
    }

    public static isPointInRect(p1: Laya.Point, p2: Laya.Point, p3: Laya.Point, p4: Laya.Point, p: Laya.Point){
        let isPointIn = this.GetCross(p1, p2, p) * this.GetCross(p3, p4, p) >= 0 && this.GetCross(p2, p3, p) * this.GetCross(p4, p1, p) >= 0;
        return isPointIn;
    }

    /**
     * 绘画圆角矩形
     * @param	graghics 	Graghics对象
     * @param	x			开始绘制的x轴位置
     * @param	y			开始绘制的y轴位置
     * @param	width		矩形宽
     * @param	height		矩形高
     * @param	roundRadius	圆角半径
     * @param	fillColor	填充颜色
     * @param	borderColor	边框填充颜色
     * @param	borderWidth 边框大小
     * @return DrawPathCmd 对象
     */
    public static drawRoundRect(graghics:Laya.Graphics, x:number, y:number, width:number, height:number, roundRadius:number, fillColor:string, borderColor:string = null, borderWidth:Number = 0) {
        var paths = [];
        paths.push(["moveTo", roundRadius, 0]);
        paths.push(["lineTo", width - roundRadius, 0]);
        paths.push(["arcTo", width, 0, width, roundRadius, roundRadius]);
        paths.push(["lineTo", width, height - roundRadius]);
        paths.push(["arcTo", width, height, width - roundRadius, height, roundRadius]);
        paths.push(["lineTo", roundRadius, height]);
        paths.push(["arcTo", 0, height, 0, height - roundRadius, roundRadius]);
        paths.push(["lineTo", 0, roundRadius]);
        paths.push(["arcTo", 0, 0, roundRadius, 0, roundRadius]);
        paths.push(["closePath"]);
        var brush:Object = { fillStyle:fillColor };
        var pen:Object = { strokeStyle:borderColor, lineWidth:borderWidth };
        return graghics.drawPath(x, y, paths, brush, pen);
    }
}