import { SimpleEffect } from "../../avatar/SimpleEffect";

export class SucceedPlay extends SimpleEffect{
    constructor(container:Laya.Sprite){
        super(container,`o/spine/succeed/shengli`);
        this.autoPlay = true;
        // this.once(Laya.Event.COMPLETE,this,this.oCompleteHandler);
    }
    // private oCompleteHandler(){
        // console.log("animNum:",this.anim.animNum);
        // this.play(0,false,this,this.onCloseEnd);
    // }
    public start(){
        // if(this.isLoaded){
        //     this.anim.playOnce(0,this,this.onCloseEnd);
        // }else{
        //     this.curAnim = 0;
        //     this.needPlay = true;
        // }
        
        // this.anim.playOnce(0,this,this.onCloseEnd);  
        // this.playOnce(0,this,this.onCloseEnd); 
        // this.play(0,false,this,this.onCloseEnd);

        this.play(0,false,this,this.onCloseEnd);

    }
    private onCloseEnd(){
        this.play(1,true);
        // console.log("play end!");
    }
    public set visible(v:boolean){
        this.container.visible = v;
    }
}