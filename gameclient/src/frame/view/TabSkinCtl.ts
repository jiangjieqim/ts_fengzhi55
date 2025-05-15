import { TabControl } from "./TabControl";

export interface ITabSkin {
    bg1: Laya.Image;
    tf: Laya.Label;
    redimg: Laya.Image;
}

export class TabSkinCtl {
    /**tab控制器 */
    // public tabCtl: TabControl;// = new TabControl();
    /**皮肤类 */
    public skinCls;
    public skinKey:string;
    public con:Laya.Sprite;
    public gap:number = 0;
    public skinList:any[];

    private itemList = [];

    public maxCount:number = 0;
    // private selIndex:number;
    private dataList;
    private tabCtl:TabControl;
    public refresh(){
        this.getItemList(this.tabCtl,this.dataList,this.tabCtl.selectIndex);
    }
    public updateTabsView(){
        this.updateTabs(this.tabCtl,this.dataList);
    }
    private updateTabs(tabCtl:TabControl,dataList:any[]){
        this.tabCtl = tabCtl;
        // this.selIndex = selIndex;
        this.dataList = dataList;
        if(!this.con){
            return;
        }
        while(this.con.numChildren){
            // !this.skinCls ||!
            if(this.skinKey){
                Laya.Pool.recover(this.skinKey,this.con.getChildAt(0));
            }
            this.con.getChildAt(0).removeSelf();
        }
        while(this.itemList.length){
            this.itemList.pop();
        }
        let index:number = 0;
        let line:number = -1;
        
        for(let i = 0;i < dataList.length;i++){
            // let _data = dataList[i];
            let itemSkin;
            if(this.skinCls && this.skinKey){
                itemSkin = Laya.Pool.getItemByClass(this.skinKey,this.skinCls);
            }else{
                itemSkin = this.skinList[i];
            }
            let _item = itemSkin as Laya.Sprite;
            this.con.addChild(_item);
            if (this.maxCount != 0) {
                if (i % this.maxCount == 0) {
                    index = 0;
                    line++;
                }
            }else{
                line = 0;
            }
            _item.x = index * (_item.width + this.gap);
            _item.y = line * _item.height;
            if(debug){
                DebugUtil.draw(_item);
            }
            index++;
            _item.on(Laya.Event.CLICK,tabCtl,tabCtl.onItemClick,[i]);

            this.itemList.push(_item);
        }
        tabCtl.items = this.itemList;
        tabCtl.setData(dataList);
    }

    public getItemList(tabCtl:TabControl,dataList:any[],selIndex:number){
        this.updateTabs(tabCtl,dataList);
        tabCtl.forceSelectIndex(selIndex);
    }

    private static skinkey = {};

    public static Create(skinCls, skinKey: string, _con: Laya.Sprite, gap: number = 10) {
        let _isGet = false;
        if (skinKey) {
            for (let o in this.skinkey) {
                if (this.skinkey[o] == skinCls) {
                    _isGet = true;
                }
            }
            if (!_isGet) {

            }
        }
        let  _skinList;
        if (!skinCls) {
             _skinList = [];
            for(let i = 0;i < _con.numChildren;i++){
                 _skinList.push(_con.getChildAt(i));
            }
        }
        let ctl = new TabSkinCtl();
        ctl.skinList =  _skinList;
        ctl.con = _con;
        ctl.gap = gap;
        ctl.skinCls = skinCls;
        ctl.skinKey =skinKey;
        return ctl;
    }

}

// let t = new (<any>ui)["AnimatorViewUI"]();
