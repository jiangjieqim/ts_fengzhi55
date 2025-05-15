import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { stCellValue, stEquipAttr, stEquipItem, stJjcPlayer, stMountRelation } from "../../../../network/protocols/BaseProto";
import { HuanZhuangModel } from "../../huanzhuang/HuanZhuangModel";
import { JjcFactory } from "../../jjc/JjcFactory";
import { JjcHeadCtl } from "../../jjc/views/JjcHeadCtl";
import { EJjcType } from "../../peakjjc/model/IJjcInterface";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { ZuoqiVo } from "../../zuoqi/vos/ZuoqiVo";
import { ZuoQiModel } from "../../zuoqi/ZuoqiModel";
import { BaseSlotItemView, SoltItemView, SoltItemView2 } from "../views/icon/SoltItemView";
import { EAttrType, EEquipType } from "../vos/ECellType";
import { EquipItemVo } from "../vos/EquipItemVo";
import { ItemVo } from "../vos/ItemVo";
import { EServerVersion, MainModel } from "./MainModel";

export interface IItemCfg
{
    id:number;
    count:number;
}

export interface IJJC_PlayerItem{
    mingcitf:Laya.Label;
    rankImg:Laya.Image;
    jifen:Laya.Image;
    jifenTf:Laya.Label;
}
export class ItemViewFactory{
    // private static soltItemKey:string  = "soltItem";



    private static createSoltItem(cls,key:string){
        // let cell:SoltItemView = Laya.Pool.getItemByClass(this.soltItemKey,SoltItemView);
        let cell = Laya.Pool.getItemByClass(key, cls);
        return cell;
    }

    public static parseItem(str:string){
        let l = [];
        let a = str.split("|");
        for (let i = 0; i < a.length; i++) {
            let arr = a[i].split("-");
            let item = {} as IItemCfg;
            item.id = parseInt(arr[0]);
            item.count = parseInt(arr[1]);
            l.push(item);
        }
        if(l.length > 1){
            return l;
        }
        else if(l.length == 1){
            return l[0];
        }
        return [];
    }

    //横向布局居中
    private static CenterLayout(container:Laya.Sprite,cellW:number,gap:number,row:number){
        let allw:number;
        allw = container.numChildren * (cellW + gap) - gap;
        let offset = allw/2;

        if(row == -1){
            row = Number.MAX_VALUE;
            offset = allw/2;
        }else{
            offset = (row * (cellW + gap))/2 - gap;
        }
        let _resetIndex:number = 0;
        let oy:number = 0;
        for(let i = 0;i < container.numChildren;i++){
            let cell:Laya.Sprite = container.getChildAt(i) as Laya.Sprite;
            cell.x = _resetIndex * (cellW + gap) - offset;//i * (cellW + gap) - offset;
            cell.y = oy;
            //cellW = cell.width;
            _resetIndex++;
            if(_resetIndex >= row){
                _resetIndex = 0;
                oy += (cellW + gap);
            }
        }
    }

    private static LeftLayout(container:Laya.Sprite,cellW:number,gap:number,row:number){
        // let allw:number = container.numChildren * (cellW + gap) - gap;
        let offset = 0;//allw/2;
        if(row == -1){
            row = Number.MAX_VALUE;
        }
        let _resetIndex:number = 0;
        let oy:number = 0;

        for(let i = 0;i < container.numChildren;i++){
            let cell = container.getChildAt(i) as Laya.Sprite;
            cell.x = _resetIndex * (cellW + gap) - offset;
            cell.y = oy;
            _resetIndex++;
            if(_resetIndex >= row){
                _resetIndex = 0;
                oy += (cellW + gap);
            }
        }
    }
    
    private static RightLayout(container:Laya.Sprite,cellW:number,gap:number){
        let allw:number = container.numChildren * (cellW + gap) - gap;
        let offset = -allw;
        for(let i = 0;i < container.numChildren;i++){
            let cell = container.getChildAt(i) as Laya.Sprite;
            cell.x = i * (cellW + gap) + offset;
        }
    }

    public static clear(container:Laya.Sprite,sign:string){
        while(container.numChildren){
            let cell = container.getChildAt(0);
            Laya.Pool.recover(sign,cell);
            cell.removeSelf();
        }
    }

    private static clearSolt(container:Laya.Sprite,key:string){
        this.clear(container,key);
    }

    public static attrSortHandler(a:stEquipAttr,b:stEquipAttr){
        if(a.id < b.id){
            return -1;
        }else if(a.id >b.id){
            return 1;
        }
        return 0;
    }

    public static convertItemList(str: string): ItemVo[] {
        let arr: string[] = str.split("|");
        let _l: ItemVo[] = [];
        if (str != "") {
            for (let i = 0; i < arr.length; i++) {
                let cell: string[] = arr[i].split("-");
                let _itemVo: ItemVo = new ItemVo();
                _itemVo.cfgId = parseInt(cell[0]);
                _itemVo.count = parseInt(cell[1]);
                _l.push(_itemVo)
            }
        }
        return _l;
    }
    
    public static convertItem(str: string): ItemVo {
       return this.convertItemList(str)[0];
    }

    public static convertCellList(str: string): stCellValue[] {
        let arr: string[] = str.split("|");
        let _l: stCellValue[] = [];
        if (str != "") {
            for (let i = 0; i < arr.length; i++) {
                let cell: string[] = arr[i].split("-");
                let _itemVo:stCellValue = new stCellValue();
                _itemVo.id = parseInt(cell[0]);
                _itemVo.count = parseInt(cell[1]);
                _l.push(_itemVo)
            }
        }
        return _l;
    }

    /**
     * 奖励渲染
     * @param con 奖励容器
     * @param str 物品字符传20202-1|22929-2
     * @param gap 间隔
     * @param scale 缩放
     * @param align "left" "center" "right" 默认居中
     * @param cls 格子视图类
     * @param key 格子key
     * @param row -1代表不换行
     */
    public static renderItemSlots(con:Laya.Sprite,str:string|any[],gap:number = 10,
        scale:number = 1,align:string = "center",cls:any = SoltItemView,key:string="SoltItemView",row:number = -1)   //100  ,w:number = 100 soltItem
    {
        this.clearSolt(con,key);
        let itemList = [];
        if(typeof str == "string"){
           itemList = this.convertItemList(str);
        }else{
            
            for (let i = 0; i < str.length; i++) {
                let v: stCellValue = str[i];
                if (v instanceof stCellValue || 
                    str[i].hasOwnProperty('id') && str[i].hasOwnProperty('count')) 
                {
                    let cell = new ItemVo();
                    cell.cfgId = v.id;
                    cell.count = v.count;
                    itemList.push(cell);
                }else{
                    itemList.push(v);
                }
            }
        }
        // let w:number  = 100;
        let width:number = 0;
        for(let i = 0;i < itemList.length;i++){
            let item:BaseSlotItemView = this.createSoltItem(cls,key) as BaseSlotItemView;
            let skin = item;
            skin.scaleX = skin.scaleY = scale;
            item.setData(itemList[i]);
            con.addChild(skin as Laya.Sprite);
            width = skin.width;
        }
        align = align || "left";
        let w = width;
        if(align == "center"){
            this.CenterLayout(con,w*scale,gap,row);
        }else if(align == "left"){
            this.LeftLayout(con,w*scale,gap,row);
        }else if(align == "right"){
            this.RightLayout(con,w*scale,gap);
        }
        // DebugUtil.draw(con);
    }

    public static rebuildAttr(l:stEquipAttr[]){
        l =  l.sort(this.attrSortHandler);
        let r = [];
        for(let i = 0;i < 8;i++){
            r.push("empty");
        }
        let baseAttr = [EAttrType.Speed,EAttrType.Life,EAttrType.Attack,EAttrType.Defense];
        let n = 0;
        let m = 1;
        for(let i = 0;i < l.length;i++){
            let cell=l[i];
            if(baseAttr.indexOf(cell.id)!=-1){
                r[n] = cell;
                n+=2;
            }
            else{
                r[m] = cell;
                m+=2;
            }
        }
        while(typeof r[r.length]=="string"){
            r.pop();
        }
        return r;
    }

    public static getIcon(vo:stEquipItem){
        if(vo){
            return this.getEquipIcon(vo.type,vo.equipStyle);
        }
        return "";
    }

    public static getEquipIcon(type:number,equipStyle:number){
        let str = `${type}_${equipStyle}`;
        let s = `o/item/${str}.png`;
        return s;
    }

    public static getWingIcon(wingId: number){
        if(wingId){
            let str = `${EEquipType.Wing}_${wingId}`;
            let s2 = `o/item/${str}.png`;
            return s2;
        }
        return "";
    }

    public static getHuanZhuangSkin(vo:EquipItemVo){
        if(!vo){
            return "";
        }
        let _style = HuanZhuangModel.Ins.getEquipStyle(vo.equipVo.type);
        if (_style) {
            return ItemViewFactory.getEquipIcon(vo.equipVo.type, _style);
        }else{
            return vo.getIcon();//换装数据为0的时候的默认皮肤
        }
    }

    public static getResourceIcon(resourceId: number){
        if(resourceId){
            let s2 = `o/icon/${resourceId}.png`;
            return s2;
        }
        return "";
    }

    public static mergeItems(l:string[]){
        let _itemsMap = {};
        for(let i = 0;i < l.length;i++){
            let s:string = l[i];
            let itemVos:ItemVo[]= this.convertItemList(s);
            for(let n = 0;n <itemVos.length;n++){
                let cell = itemVos[n];
                if(!_itemsMap[cell.cfgId]){
                    _itemsMap[cell.cfgId] = 0;
                }
                _itemsMap[cell.cfgId] += cell.count;
            }
        }

        let str = "";
        for (let cfgid in _itemsMap) {
            str += `${cfgid}-${_itemsMap[cfgid]}|`
        }
        if (str.length > 0) {
            str = str.substr(0, str.length - 1);
        }
        return str;
    }
    
    /**
     * 刷新物品格子
     * @param slot 
     * @param itemVo 
     * @param mouseEnable 是否拥有鼠标点击事件
     */
    public static refreshSlot(slot:ui.views.main.ui_slot_itemUI,itemVo:ItemVo,mouseEnable:boolean = true){
        slot.icon.skin = IconUtils.getIconByCfgId(itemVo.cfgId);
        slot.tf1.text = itemVo.count.toString();
        slot.quality.skin = IconUtils.getQuaIcon(itemVo.cfg.f_qua);
        if(mouseEnable){
            slot.on(Laya.Event.CLICK, this, this.onSlotClickHandler,[slot,itemVo]);
        }else{
            slot.off(Laya.Event.CLICK, this, this.onSlotClickHandler);
        }
    }

    public static refreshSlot1(slot:ui.views.main.ui_slot_itemUI,skin:string,name:string,dec:string,mouseEnable:boolean = true){
        slot.icon.skin = skin;
        slot.tf1.text = ""
        slot.quality.skin = "";
        if(mouseEnable){
            slot.on(Laya.Event.CLICK, this, this.onSlotClickHandler1,[slot,name,dec]);
        }else{
            slot.off(Laya.Event.CLICK, this, this.onSlotClickHandler1);
        }
    }

    private static onSlotClickHandler1(slot:ui.views.main.ui_slot_itemUI,name:string,dec:string,e:Laya.Event) {
        e.stopPropagation();
        MainModel.Ins.showSmallTips(name, dec, slot);
    } 

    public static LayoutLabels(con:Laya.Sprite){
        let w:number = 0;
        for(let i = 0;i < con.numChildren;i++){
            let label:Laya.Label = con.getChildAt(i) as Laya.Label;
            label.x = w;
            w += label.textField.textWidth;
        }
    }

    private static onSlotClickHandler(slot:ui.views.main.ui_slot_itemUI,_vo:ItemVo,e:Laya.Event) {
        e.stopPropagation();
        MainModel.Ins.showSmallTips(_vo.getName(), _vo.getDesc(), slot);
    }
    
    /**获取容器中的间隔 */
    public static gapAndClear(con: Laya.Sprite): number {
        let _ls: Laya.Sprite[] = [];
        for (let i = 0; i < con.numChildren; i++) {
            let spr = con.getChildAt(i) as Laya.Sprite;
            _ls.push(spr);
        }
        let _gap: number = 0;
        if (_ls.length >= 2) {
            _gap = Math.abs(_ls[_ls.length - 1].x - _ls[_ls.length - 2].x) - _ls[_ls.length - 1].width;
        }
        while (con.numChildren > 0) {
            con.getChildAt(0).removeSelf();
        }
        return _gap;
    }
    /**创建坐骑Vo */
    public static createRideVo(cell:stMountRelation){
        let vo:ZuoqiVo = new ZuoqiVo();
        vo.equipVo = cell.equipItem;
        vo.washList = cell.refinements;
        vo.washCanLock = cell.canLock;
        vo.curVo = ZuoQiModel.Ins.getRideVo(cell.mountId);
        return vo;
    }
    public static updateRideStar(img:Laya.Image,ownTf:Laya.Label,needTf:Laya.Label,str:string){
        let itemVo = ItemViewFactory.convertItem(str);
        img.skin = itemVo.getIcon();

        let have = MainModel.Ins.mRoleData.getVal(itemVo.cfgId);

        ownTf.text = StringUtil.val2m(have).toString();
        if (have >= itemVo.count) {
            ownTf.color = "#A55E1B";//"#1BD24B";
        } else {
            ownTf.color = "#ff0000";
        }
        needTf.color = "#A55E1B";
        needTf.text = "/" + itemVo.count.toString();
        needTf.x = ownTf.x + ownTf.textField.width;
    }
    public static setJJC_score(skin: IJJC_PlayerItem,data: stJjcPlayer,type:EJjcType) {
        
        let _rankVal = data.rank;

        skin.jifen.visible = false;
        if (type == EJjcType.JJC && MainModel.Ins.serverVer == EServerVersion.Version_1) {
            // skin.mingcitf.visible = false;
            skin.mingcitf.text = "";
            skin.rankImg.visible = false;
            skin.jifen.visible = true;
            skin.jifenTf.text = data.score + "";
        } else {
            // skin.mingcitf.visible = true;
            // if (_rankVal <= JjcHeadCtl.maxRank) {
            //     skin.mingcitf.text = "";
            //     skin.rankImg.visible = true;
            //     skin.rankImg.skin = JjcFactory.getRankImg(_rankVal);
            // }
            // else {
            //     skin.rankImg.visible = false;
            //     skin.mingcitf.text = _rankVal + "";
            // }
        }
    }

    public static setStar(con: Laya.Sprite, curStar: number, maxStar: number ,isCenX:boolean = true,se:number = 1) {
        // let maxStar:number = 6;
        // protected setStar(v:number,maxStar:number){
        // let l:Laya.Image[] = [
        //     this._ui.s0,
        //     this._ui.s1,
        //     this._ui.s2,
        //     this._ui.s3,
        //     this._ui.s4,
        //     this._ui.s5,
        // ];

        let normal1 = [`remote/common/base/star.png`, `remote/common/base/star_1.png`];
        let high1 = [`remote/common/base/star_2.png`, `remote/common/base/star_3.png`];

        let curArr = [];
        const MaxVal: number = 6;
        if (maxStar > MaxVal ) {

            if( curStar > MaxVal){
                curArr = high1;
                maxStar -= MaxVal;
                curStar -= MaxVal;
            }else{
                curArr = normal1;
                maxStar = MaxVal;
            }
        } else {
            curArr = normal1;
        }

        let l: Laya.Image[] = [];
        for (let i = 0; i < con.numChildren; i++) {
            l.push(con.getChildAt(i) as Laya.Image);
        }
        let item = l[0];
        // let parent:Laya.Sprite = item.parent as Laya.Sprite;
        let cellWidth: number = item.width;

        for (let i = 0; i < l.length; i++) {
            let _star = l[i];
            if (i < maxStar) {
                if (i < curStar) {
                    _star.skin = curArr[0];
                } else {
                    _star.skin = curArr[1];
                }
                _star.visible = true;
            } else {
                // _star.skin = "";
                _star.visible = false;
            }
            _star.x = i * _star.width;
        }
        if(isCenX){
            if(se == 1){
                con.x = ((con.parent as Laya.Sprite).width - maxStar * cellWidth) / 2;
            }else{
                con.x = (con.parent as Laya.Sprite).width/2 -  maxStar * cellWidth/2 * se;
            }
        }
        
        // console.log(parent.x);
    }
}