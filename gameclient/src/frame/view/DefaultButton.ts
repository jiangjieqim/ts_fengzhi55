import { ButtonCtl } from "./ButtonCtl";

export class DefaultButton extends Laya.Image {
    constructor(clickHandler: Laya.Handler) {
        super();
        this.skin = `remote/common/base/anniu_green.png`;
        let btnCtl = new ButtonCtl(this, clickHandler);
        this.sizeGrid = "15,15,15,15";
        this.width = 150;
        this.height = 70;
    }
}

export class ButtonSkin extends Laya.Button{
    constructor(name:string = "",clickHandler:Laya.Handler = null,x:number = 0,y:number = 0){
        super();
        // if(fill){            
            this.width = 100;
            this.height = 50;
            // this.graphics.drawRect(0,0,this.width,this.height,"#ffffff");
            this.graphics.drawRect(0,0,this.width,this.height,null,"#ff0000",1);
            // this.alpha = 0.5;
        // }else{
            // this.skin = `remote/common/base/anniu_green.png`;//"comp/button.png";
        // }
        this.state = 1;
        this.label = name;
        this.labelSize*=2;
        // this.labelColors = "#ffffff";
        // this.labelStroke = 1;
        // this.labelStrokeColor = "#000000";
        this.clickHandler = clickHandler;
        this.x = x;
        this.y = y;
    }
}