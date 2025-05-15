export class ChestProgressCtl {
    private progcontainer: Laya.Image;
    private maxWidth: number;
    private curHeight: number;
    private maskList: Laya.Sprite[] = [];
    private clsKey: string = "MSprite";
    public blackWidth:number = 4;//细黑线的宽度
    public offsetSize:number = 0;//2;
    public constructor(progcontainer: Laya.Image) {
        this.progcontainer = progcontainer;
        this.curHeight = progcontainer.height;
        this.maxWidth = this.progcontainer.width;
    }

    public set visible(v:boolean){
        this.progcontainer.visible = v;
    }

    public setVal(cur: number, max: number) {
        // console.log("setval:",cur,max);
        this.clear();
        if(cur > max){
            cur = max;
        }
        if(max <= 0){
            this.progcontainer.width = 0;
            return;
        }
        let cellWidth = this.maxWidth / max;
        for (let i = 0; i < max - 1; i++) {
            let cell = Laya.Pool.getItemByClass(this.clsKey, Laya.Sprite);

            this.progcontainer.addChild(cell);
            cell.x = cellWidth * (i + 1);
            let size = this.offsetSize;
            cell.graphics.drawRect(-size, size, this.blackWidth, this.curHeight - size * 2, "#000000");
            this.progcontainer.addChild(cell);
            this.maskList.push(cell);
        }

        this.progcontainer.width = (cur / max) * this.maxWidth;
    }
    private clear() {
        while (this.maskList.length) {
            let cell = this.maskList.pop();
            cell.removeSelf();
            Laya.Pool.recover(this.clsKey, cell);
        }
    }
}