export class TabCtl{
    public dataList:any[];
    public itemList:Laya.View[];
    private width:number;
    private _signKey:string;
    private _cls;
    private _selCallBack:Function;
    private _con:Laya.Sprite;
    private _that;
    private gap:number;
    private itemRenderCallBack:Function;
    private _selectIndex:number = 0;
    constructor(_cls,_signKey:string,con:Laya.Sprite,that,gap:number,itemRenderCallBack:Function,_selCallBack:Function){
        this._cls = _cls;
        this._signKey = _signKey;
        this._con = con;
        this._that = that;
        this.gap = gap;
        this._selCallBack = _selCallBack;
        this.itemRenderCallBack = itemRenderCallBack;
    }
    dispose(){
        this._selCallBack = null;
        this.itemRenderCallBack = null;
    }
    public set selectIndex(index:number){
        for(let i = 0;i < this._con.numChildren;i++){
            let cell = this._con.getChildAt(i);
            if(index == i ){
                this.onSelClick(cell);
            }
        }
    }
    public get selectIndex(){
        return this._selectIndex;
    }

    // public updateView(){
    //     this.selectIndex = this.selectIndex;
    // }
    public get curData(){
        return this.dataList[this.selectIndex];
    }
    public refresh(dataList:any[]){
        this.dataList = dataList;
        this.itemList = [];
        let con = this._con;
        let gap = this.gap;
        let that = this._that;
        while(con.numChildren>0){
            let cell = con.getChildAt(0);
            Laya.Pool.recover(this._signKey,cell);
            cell.removeSelf();
        }
        let cellW:number;
        for(let i = 0;i<dataList.length;i++){
            let data = dataList[i];
            let item:Laya.View = Laya.Pool.getItemByClass(this._signKey,this._cls);
            item.dataSource = data;
            item.on(Laya.Event.CLICK,this,this.onSelClick,[item]);
            if(this.itemRenderCallBack){
                this.itemRenderCallBack.call(that,item);
            }
            this.itemList.push(item);
            con.addChild(item);
            cellW = item.width+gap;
            item.x = i*cellW;
        }
        this.width = dataList.length * cellW - gap;
        if(this.width < 0){
            this.width = 0;
        }
        con.x = ((con.parent as Laya.Sprite).width - this.width) >> 1;
    }

    private onSelClick(view){
        for(let i = 0;i < this._con.numChildren;i++){
            let cell = this._con.getChildAt(i);
            let sel:boolean = cell == view;
            if(this._selCallBack){
                this._selCallBack.call(this._that,cell,sel);
            }
            if(sel){
                this._selectIndex = i;
            }
        }
    }
}