import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { Reward_revc, stCellValue, stEquipItem, stSkinStyle, stSpirit } from "../../../../network/protocols/BaseProto";
import { HuYouIconProxy } from "../../huyou/proxy/HuYouProxy";
import { SoulModel } from "../../soul/model/SoulModel";
import { t_Spirit_Attribute_Fixed } from "../../soul/model/SoulProxy";
import { f_headViewUpdate } from "../../soul/views/SoulIconItem";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { DateFactory } from "../model/DateFactory";
import { Equipment_DIY_Proxy } from "../model/EquipmentProxy";
import { ItemViewFactory } from "../model/ItemViewFactory";
import { MainModel } from "../model/MainModel";
import { ItemProxy } from "../proxy/ItemProxy";
import { EquipItemVo } from "../vos/EquipItemVo";
import { ItemVo } from "../vos/ItemVo";
export enum ERewardShowVoType{
    /**item */
    Item = 0,
    /**装备 */
    Euqip = 1,
    /**福源 */
    FuYuan = 2,
    /**战魂 */
    Soul = 3,
    /**换装 */
    HeroStyle = 4,
    /**可使用的物品 */
    UseItem = 5,
}
export class RewardShowVo{
    public type:ERewardShowVoType;
    public data;//:number|stCellValue;
}

export interface IBaseSlotItemSkin extends Laya.EventDispatcher{
    quality:Laya.Image;
    icon:Laya.Image;
    tf1:Laya.Label;
    lab_name:Laya.Label;
}

export interface IMaskSlotItemSkin extends Laya.Sprite{
    maskbg:Laya.Image;
    gouImg:Laya.Image;
    slot;
}

export interface ISlotItemSkin extends IBaseSlotItemSkin{
    bigicon:Laya.Image;
    soulIcon:ui.views.soul.ui_soul_small_iconUI;
    centerTf:Laya.Label;
}
export class RewardItemGetViewCtl{
    private static slotClick(cell: RewardShowVo,skin){
        switch (cell.type) {
            case ERewardShowVoType.Item:
            case ERewardShowVoType.UseItem:
                let _vo:ItemVo = DateFactory.createItemList([cell.data])[0];
                MainModel.Ins.showSmallTips(_vo.getName(), _vo.getDesc(), skin);
                break;
            case ERewardShowVoType.Euqip:
                let _evo:stEquipItem = cell.data;
                let _cVo:EquipItemVo = DateFactory.createEquipItemVo(_evo);
                E.ViewMgr.Open(EViewType.EquipTips, null, _cVo);
                break;
            case ERewardShowVoType.FuYuan:
                let cfg = ItemProxy.Ins.getCfg(cell.data.itemId);
                MainModel.Ins.showSmallTips(main.itemName(cfg.f_name), main.itemName(cfg.f_info), skin);
                break;
            case ERewardShowVoType.HeroStyle:
                break;
        }
    }
    private static onSlotClickHandler(cell:RewardShowVo,skin,e:Laya.Event){
        e.stopPropagation();
        // let cell: RewardShowVo = this.dataSource;
        this.slotClick(cell,skin);
    }

    static refresh(skin:ISlotItemSkin,cell:RewardShowVo,flag:boolean){
        skin.on(Laya.Event.CLICK, this, this.onSlotClickHandler,[cell,skin]);

        // this.quality.rotation = 0;
        if(skin.bigicon){
            skin.bigicon.skin = "";
        }
        skin.quality.skin = "";
        skin.icon.skin = "";
        if(skin.soulIcon){
            skin.soulIcon.visible = false;
        }
        skin.tf1.text = "";
        if(skin.centerTf){
            skin.centerTf.text = "";
        }
        if (skin.lab_name) {
            skin.lab_name.text = "";
            skin.lab_name.visible = flag;
        }
        switch (cell.type) {
            case ERewardShowVoType.Item:
            case ERewardShowVoType.UseItem:
                let vo:ItemVo = DateFactory.createItemList([cell.data])[0];
                skin.icon.skin = vo.getIcon();
                skin.tf1.text = vo.count.toString();
                skin.quality.skin = vo.quaIcon();
                // this._curData = vo;
                if (flag && skin.lab_name) skin.lab_name.text = vo.getName();
                break;
            case ERewardShowVoType.Euqip:
                let _evo:stEquipItem = cell.data;
                let _cVo:EquipItemVo = DateFactory.createEquipItemVo(_evo);
                skin.tf1.text = IconUtils.str2Lv(_cVo.equipVo.level);
                skin.quality.skin = _cVo.getQualityIcon();
                skin.icon.skin = _cVo.getIcon();
                // this._curData = _cVo;
                if (flag && skin.lab_name) skin.lab_name.text = _cVo.getName();
                break;
            case ERewardShowVoType.FuYuan:
                let cfg = HuYouIconProxy.Ins.getCfgByIdAndAttr(cell.data.itemId,cell.data.data.attrList[0].id);
                skin.icon.skin = `o/bless/${cfg.f_icon}`;
                skin.tf1.text = "1";
                skin.quality.skin = `remote/common/base/jiangli.png`;
                break;
            case ERewardShowVoType.Soul:
                let _cell:stSpirit = cell.data;
                skin.bigicon.skin = SoulModel.Ins.getIcon(_cell.qualityId);
                skin.bigicon.rotation = SoulModel.Ins.getRot(_cell.pos);
                skin.quality.skin = "";
                // this.tf1.text = 'Lv.'+_cell.level;
                skin.centerTf.text = "+" + _cell.level;
                // f_headViewUpdate()
                // = `o/spirits/${_cell.spiritId}.png`;
                skin.soulIcon.visible = true;
                let sCfg:Configs.t_Spirit_Attribute_Fixed_dat = t_Spirit_Attribute_Fixed.Ins.getCfgBySpiritID(_cell.spiritId);
                f_headViewUpdate(skin.soulIcon,sCfg.f_SpiritIconID);
                if (flag && skin.lab_name) skin.lab_name.text = sCfg.f_SpiritName;
                break;

            case ERewardShowVoType.HeroStyle:
                let _data:stSkinStyle = cell.data;
                let part = _data.part;
                let style = _data.style;
                let qua = _data.qua||0;
                skin.icon.skin = ItemViewFactory.getEquipIcon(part, style);
                skin.tf1.text = "";
                let quaSkin = IconUtils.getQuaIcon(qua);
                skin.quality.skin = quaSkin;
                // console.log(_data);
                break;
            default:
                LogSys.Error("not find..."+cell.type);
                break;
        }
    }
}

export class RewardItemGetView extends ui.views.main.ui_slot_item_rewardUI {
    // private _curData;
    // private ctl = new RewardItemGetViewCtl();
    constructor(){
        super();
        // this.on(Laya.Event.CLICK, this, this.onSlotClickHandler);
    }
    // private onSlotClickHandler(e:Laya.Event){
    //     e.stopPropagation();
    //     let cell: RewardShowVo = this.dataSource;
    //     this.ctl.slotClick(cell,this);
    // }
    public refreshView(flag:boolean = true) {
        // let cell: RewardShowVo = this.dataSource;
        // this.ctl.refresh(this,cell,flag);
        RewardItemGetViewCtl.refresh(this,this.dataSource,flag);
    }
}
export class RewardCtl{
    private list1:Laya.List;
    private _cellW:number;
    get cellW(){
        if(!this._cellW){
            let skin = new RewardItemGetView();
            this._cellW = skin.width;
            skin.destroy();
        }
        return this._cellW;
    }
    private oldHeight:number;
    constructor(list1:Laya.List){
        this.list1 = list1;
        this.oldHeight = list1.height;
        this.list1.itemRender = RewardItemGetView;
        this.list1.renderHandler = new Laya.Handler(this,this.onItemHandler);
    }
    private onItemHandler(item:RewardItemGetView){
        item.refreshView();
    }

    public setData(_datalist:RewardShowVo[],maxCount:number){
        this.list1.array = _datalist;
        let sp = this.list1.spaceX;
        // let gap = 100 + sp;
        // this.list1.x = (parent.width - _datalist.length * gap) / 2 - sp;
        // this.list1.width = gap * _datalist.length - sp;

        let _rowCount: number = maxCount;
        let w: number = this.cellW;//110;
        let oneW:number = w + sp;
        let len: number = _datalist.length;
        if (len <= _rowCount) {
            this.list1.width = len * oneW - sp;
            this.list1.height = w + w/2;
        } else if (len > _rowCount && len <= _rowCount * 2){
            this.list1.width = oneW * _rowCount - sp;
            this.list1.height = (w + this.list1.spaceX) * 2-this.list1.spaceY + w/2;
        }else{
            this.list1.width = oneW * _rowCount - sp;
            this.list1.height = this.oldHeight;
        }
        this.list1.scrollTo(0);
        //DebugUtil.draw(this.list1);
    }
}

export class RewardFactory{
    /**构建奖励 */
    public static createBy_Reward_revc(_curData:Reward_revc){
        let _datalist:RewardShowVo[] = [];
        for(let i = 0;i < _curData.rewardList.length;i++){
            let _vo = new RewardShowVo();
            _vo.data = _curData.rewardList[i];
            _vo.type = ERewardShowVoType.Item;
            _datalist.push(_vo);
        }
        for(let i = 0;i < _curData.equipList.length;i++){
            let _vo = new RewardShowVo();
            _vo.data = _curData.equipList[i];
            _vo.type = ERewardShowVoType.Euqip;
            _datalist.push(_vo);
        }
        for(let i = 0;i < _curData.partList.length;i++){
            let _vo = new RewardShowVo();
            _vo.data = _curData.partList[i];
            _vo.type = ERewardShowVoType.HeroStyle;
            _datalist.push(_vo);
        }
        return _datalist;
    }

    /**
     * 新人飞跃礼包
     */
    public static createBy_newPlayerCfg(cfg:Configs.t_Pack_NewPlayer_dat){
        let _datalist:RewardShowVo[] = [];
        let items:stCellValue[] = ItemViewFactory.convertCellList(cfg.f_Item);
        for(let i = 0;i < items.length;i++){
            let _vo = new RewardShowVo();
            _vo.data = items[i];
            _vo.type = ERewardShowVoType.Item;
            _datalist.push(_vo);
        }
        let l: stEquipItem[] = [];
        if(cfg.f_EquipmentDIY){
            l.push(Equipment_DIY_Proxy.Ins.createByFid(cfg.f_EquipmentDIY));
            for(let i = 0;i < l.length;i++){
                let _vo = new RewardShowVo();
                _vo.data = l[i];
                _vo.type = ERewardShowVoType.Euqip;
                _datalist.push(_vo);
            }
        }
        return _datalist;
    }

}