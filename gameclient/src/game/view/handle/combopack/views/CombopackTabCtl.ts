export interface ICombopackTabSkin extends Laya.Sprite{
    bg: Laya.Image;
    tf: Laya.Label;
}
export class CombopackTabCtl{
    private selStyle:string[];
    private unSelStyle:string[];
    private list1:ICombopackTabSkin[] = [];
    private callBack:Function;
    private _index:number;
    private that;
    add(skin:ICombopackTabSkin,label:string){
        DebugUtil.draw(skin);
        skin.tf.text = label;
        skin.on(Laya.Event.CLICK,this,this.onClickHandler);
        this.list1.push(skin)
    }

    private onClickHandler(e: Laya.Event) {
        let index = (this.list1 as Laya.Sprite[]).indexOf(e.target);
        this._index = index;
        this.selectIndex = index;
    }
    getNodeByIndex(i:number){
        return this.list1[i];
    }
    set selectIndex(value: number) {
        this._index = value;
        // this.list1[value].event(Laya.Event.CLICK);
        for (let i = 0; i < this.list1.length; i++) {
            let cell = this.list1[i];
            let cur: string[];
            if (i == value) {
                cur = this.selStyle;
            }else{
                cur = this.unSelStyle;
            }
            if(cur){
                cell.bg.skin = cur[0];
                cell.tf.color = cur[1];
            }
        }
        if(this.callBack){
            this.callBack.call(this.that,value);
        }
    }

    get selectIndex(){
        return this._index;
    }

    dispose(){
        while(this.list1.length){
            let cell = this.list1.shift();
            cell.off(Laya.Event.CLICK,this,this.onClickHandler);
        }
        this.callBack = null;
        this.that = null;
    }

    pushStyle(sel:string[],unSel:string[]){
        this.selStyle = sel;
        this.unSelStyle = unSel;
    }

    bind(callBack:Function,that){
        this.callBack = callBack;
        this.that = that;
    }

}