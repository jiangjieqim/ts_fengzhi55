import { TabControl } from "./TabControl";
import { TabSkinCtl } from "./TabSkinCtl";

export class TabCommonCtl {
    protected _tabSkinCtl: TabSkinCtl;
    public tabsCtl: TabControl = new TabControl();
    /**横向最多的节点数量 */
    public horizontalMax:number = 0;
    public init(cls: any, tabCon: Laya.Sprite, key: string,
        that, onSelectHandler: Function, itemTabHandler: Function) {

        this._tabSkinCtl = TabSkinCtl.Create(cls, key, tabCon);
        this._tabSkinCtl.maxCount = this.horizontalMax;
        this.tabsCtl = TabControl.Create(that, onSelectHandler, itemTabHandler);
    }

    public refresh(dataList, selectIndex: number) {
        this._tabSkinCtl.getItemList(this.tabsCtl, dataList, selectIndex);
    }
    public get selectIndex(){
        return this.tabsCtl.selectIndex;
    }

    public udpateView(){
        this._tabSkinCtl.updateTabsView();
    }
}

/**非对象池船舰的tab页签 */
export class NoTabClassCommonCtl extends TabCommonCtl{
    public init2( tabCon: Laya.Sprite,that, onSelectHandler: Function, itemTabHandler: Function,gap:number=0) {
        this._tabSkinCtl = TabSkinCtl.Create(null, null, tabCon,gap);
        this._tabSkinCtl.maxCount = this.horizontalMax;
        this.tabsCtl = TabControl.Create(that, onSelectHandler, itemTabHandler);
    }
}