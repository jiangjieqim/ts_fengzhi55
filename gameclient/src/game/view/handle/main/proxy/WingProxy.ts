import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { BaseCfg } from "../../../../static/json/data/BaseCfg";
import { IAttrItem, INextLevelData, ILevelListItem, ISpecialAttrItem, IWing, IWingUpgradeAttrSkin, IWingUpgradeAttrListItem, IWingSpecialAttrSkin, IWingListItem, IWingTreasureAttrItem } from "../interface/IWing";
import { ItemViewFactory } from "../model/ItemViewFactory";
import { MainModel } from "../model/MainModel";
import { ItemVo } from "../vos/ItemVo";
import { attrConvert } from "../vos/MainRoleVo"

export class WingIdProxy extends BaseCfg{
    public GetTabelName() {
        return "t_Wing_ID"
    }
    private static _ins: WingIdProxy;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new WingIdProxy();
        }
        return this._ins;
    }

    /**
     * 根据翅膀id获取翅膀名称
     * @param wingId 翅膀id
     * @returns 翅膀名称
     */
    public getWingName(wingId: number): string {
        let _l = this.List;
        const cfg: Configs.t_Wing_ID_dat = _l.find(o => o.f_id === wingId);
        if (!cfg) {
            throw new Error(`缺少翅膀#${wingId}的配置`);
        }
        return cfg.f_Wing;
    }

    /**
     * 获取翅膀的总属性值列表
     * @param wingId 翅膀id
     * @param level 翅膀等级数
     * @param stage 翅膀阶数
     * @returns 
     */
    public getWingUpgradeAttrList(wingId: number, level: number, stage: number): IAttrItem[] {
        // 除了4种基础属性，其他属性值放大了10000倍（保持整数）
        // 翅膀的初始属性值列表
        const initAttrList: IAttrItem[] = WingInitProxy.Ins.getWingInitAttrList(wingId);
        // 配置的阶和对应等级的关系列表
        const levelList: ILevelListItem[] = WingExpProxy.Ins.getLevelList();
        // 阶数和等级数对应的总等级数
        const accLevel: number = levelList.filter(o => o.stage < stage).reduce((sum, o) => sum += o.maxLevel, 0) + level;
        // 总等级数对应的属性值列表
        const levelAttrList = WingUpgradeProxy.Ins.getWingLevelAttrList(accLevel);
        // 阶数对应的属性值列表
        const stageAttrList = WingEffectValueProxy.Ins.getWingStageAttrList(wingId, stage);
        // 计算初始、总等级、阶数计算的总属性值列表
        const totalList = [...initAttrList, ...levelAttrList, ...stageAttrList];
        const attrIds = [...new Set(totalList.map(o => o.id))];
        const attrList =  attrIds.map(id => {
            const value = totalList.filter(o => o.id === id).reduce((sum, o) => sum += o.value, 0);
            return { id, value };
        });
        return attrList.sort((a, b) => a.id - b.id);
    }

    public getWingAttrList(wingId: number, level: number, stage: number, treasureStage: number): IAttrItem[] {
        const upgradeAttrList = this.getWingUpgradeAttrList(wingId, level, stage);
        const treasureAttrList = WingTreasureUpgradeProxy.Ins.getTreasureAttrList(treasureStage);
        // 计算初始、总等级、阶数计算的总属性值列表
        const totalList = [...upgradeAttrList, ...treasureAttrList];
        const attrIds = [...new Set(totalList.map(o => o.id))];
        const attrList =  attrIds.map(id => {
            const value = totalList.filter(o => o.id === id).reduce((sum, o) => sum += o.value, 0);
            return { id, value };
        });
        return attrList.sort((a, b) => a.id - b.id);
    }

    public getConfigWingList(): IWing[] {
        let _l: Configs.t_Wing_ID_dat[]  = this.List;
        return _l.filter(o => Number(o.f_id))
            .map(o => ({ 
                wingId: Number(o.f_id),
                wingName: o.f_Wing,
                priceItemVo: Number(o.f_WingPrice) === 0 
                    ? undefined 
                    : ItemViewFactory.convertItemList(o.f_WingPrice)[0] 
            }));
    }
}

export class WingInitProxy extends BaseCfg{
    public GetTabelName() {
        return "t_Wing_Init"
    }
    private static _ins: WingInitProxy;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new WingInitProxy();
        }
        return this._ins;
    }

    /**
     * 根据翅膀id获取翅膀初始属性值
     * @param wingId 翅膀id
     * @returns 翅膀初始属性值列表
     */
    public getWingInitAttrList(wingId: number): IAttrItem[] {
        let _l = this.List;
        const cfg: Configs.t_Wing_Init_dat = _l.find(o => o.f_id === wingId);
        if (!cfg) {
            throw new Error(`t_Wing_Init缺少翅膀#${wingId}的配置`);
        }
        const attrList = [];
        Object.keys(cfg).forEach(key => {
            if (/^f_\d{5}$/.test(key)) {
                const k = Number(key.replace('f_', ''));
                const val = Number(cfg[key]);
                attrList.push({ id: k, value: val });
            }
        });
        return attrList;
    }
}

export class WingUpgradeProxy extends BaseCfg{
    public GetTabelName() {
        return "t_Wing_Upgrade"
    }
    private static _ins: WingUpgradeProxy;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new WingUpgradeProxy();
        }
        return this._ins;
    }

    /**
     * 根据翅膀等级获取翅膀等级附加的基础属性
     * @param level 等级
     * @returns 翅膀等级附加的基础属性列表
     */
    public getWingLevelAttrList(accLevel: number): IAttrItem[] {
        let _l = this.List;
        const attrList = [];
        _l.forEach((cfg: Configs.t_Wing_Upgrade_dat) => {
            if (Number(cfg.f_attribute)) {
                const k = Number(cfg.f_attribute);
                const val = Number(cfg.f_UpgradeValue);
                attrList.push({ id: k, value: val * accLevel });
            }
        });
        return attrList;
    }
}

export class WingEffectValueProxy extends BaseCfg{
    public GetTabelName() {
        return "t_Wing_EffectValue"
    }
    private static _ins: WingEffectValueProxy;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new WingEffectValueProxy();
        }
        return this._ins;
    }

    /**
     * 根据翅膀id获取翅膀阶级附加的特殊属性列表
     * @param wingId 翅膀id
     * @returns 翅膀阶级附加的特殊属性列表
     */
    public getWingStageAttrList(wingId: number, stage: number): IAttrItem[] {
        let _l = this.List;
        const cfg: Configs.t_Wing_EffectValue_dat = _l.find(o => Number(o.f_WingID) === wingId);
        if (!cfg) {
            throw new Error(`t_Wing_EffectValue缺少翅膀#${wingId}的配置`);
        }
        const attrList = [];
        Object.keys(cfg).forEach(key => {
            if (/^f_\d{5}$/.test(key)) {
                const k = Number(key.replace('f_', ''));
                const val = Number(cfg[key]);
                attrList.push({ id: k, value: val * stage });
            }
        });
        return attrList;
    }

    public getWingStageConfigAttrList(wingId: number): IAttrItem[] {
        let _l = this.List;
        const cfg: Configs.t_Wing_EffectValue_dat = _l.find(o => Number(o.f_WingID) === wingId);
        if (!cfg) {
            throw new Error(`t_Wing_EffectValue缺少翅膀#${wingId}的配置`);
        }
        const attrList = [];
        Object.keys(cfg).forEach(key => {
            if (/^f_\d{5}$/.test(key)) {
                const k = Number(key.replace('f_', ''));
                const val = Number(cfg[key]);
                attrList.push({ id: k, value: val });
            }
        });
        return attrList;
    }
    
}

export class WingExpProxy extends BaseCfg{
    public GetTabelName() {
        return "t_Wing_Exp"
    }
    private static _ins: WingExpProxy;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new WingExpProxy();
        }
        return this._ins;
    }

    /**
     * 获取下一级的数据
     * @param level 等级数
     * @param stage 阶数
     * @returns 下一级的数据
     */
    public getNextLevelData(level: number, stage: number): INextLevelData {
        let _l: Configs.t_Wing_Exp_dat[] = this.List;
        if (!_l.length) {
            throw new Error(`t_Wing_Exp配置错误`);
        }
        const maxStage = Math.max(..._l.map(o => o.f_id), 1) - 1;
        if (stage > maxStage) {
            throw new Error(`t_Wing_Exp缺少stage#${stage}的配置`);
        }
        const maxLevel = _l.find(o => o.f_id - 1 === stage)?.f_Rank0 || 0;
        if (level > maxLevel) {
            throw new Error(`t_Wing_Exp缺少stage#${stage} level#${level}的配置`);
        }
        // 距离升阶还有多少级
        const restLevel = maxLevel - level;
        // restLevel为零时，表示当前处于升阶阶段
        // 升阶时，下一级是下一阶的第0级
        const nextLevel = restLevel ? level + 1 : 0;
        const nextStage =  Math.min(stage + 1, maxStage);
        const nextLevelStage = restLevel ? stage : nextStage;
        const nextStageLevel = 0;
        return {
            // 满级满阶
            isNextFinish: !restLevel && (stage === nextStage),
            restLevel,
            nextLevel,
            nextLevelStage,
            nextStage,
            nextStageLevel
        }
    }

    /**
     * 获取配置的阶和对应最高升级等级的列表
     * @returns 阶和对应最高升级等级的列表
     */
    public getLevelList(): ILevelListItem[] {
        let _l: Configs.t_Wing_Exp_dat[] = this.List;
        if (!_l.length) {
            throw new Error(`t_Wing_Exp配置错误`);
        }
        // 配置的有效数据
        const validateList: { stage, maxLevel }[] = _l.map(o => ({
            stage: o.f_id - 1,
            maxLevel: o.f_Rank0
        }));
        // 按stage升序排序
        return validateList.sort((a, b) => a.stage - b.stage);
    }
    
}

export class WingConfigProxy extends BaseCfg{
    public GetTabelName() {
        return "t_Wing_Config"
    }
    private static _ins: WingConfigProxy;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new WingConfigProxy();
        }
        return this._ins;
    }

    public getUpgradeItemList(stage: number): { levelList: ItemVo[], stageList: ItemVo[] } {
        let _l: Configs.t_Wing_Config_dat[] = this.List;
        const cfg = _l.find(o => Number(o.f_Rank) === stage);
        let levelList = [];
        let stageList = [];
        if (!cfg) {
            // 满级，或超了
            return { levelList, stageList };
        }
        levelList = ItemViewFactory.convertItemList(cfg.f_ItemIDLevel).sort((a, b) => a.cfgId - b.cfgId);
        stageList = ItemViewFactory.convertItemList(cfg.f_ItemIDRank).sort((a, b) => a.cfgId - b.cfgId);
        return { levelList, stageList };
    }
    
}

export class WingTreasureInitProxy extends BaseCfg{
    public GetTabelName() {
        return "t_Wing_Treasure_Init"
    }
    private static _ins: WingTreasureInitProxy;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new WingTreasureInitProxy();
        }
        return this._ins;
    }

    /**
     * 获取翅膀宝物升级的初始属性值列表
     * @returns 翅膀宝物升级的初始属性值列表
     */
    public getTreasureInitAttrList(): IAttrItem[] {
        let _l: Configs.t_Wing_Treasure_Init_dat[] = this.List;
        return _l.map(o => ({
            id: Number(o.f_TreasureEffect),
            value: Number(o.f_TreasureInit)
        })).filter(o => o.id).sort((a, b) => a.id - b.id);
    }
}

export class WingTreasureUpgradeProxy extends BaseCfg{
    public GetTabelName() {
        return "t_Wing_Treasure_Upgrade"
    }
    private static _ins: WingTreasureUpgradeProxy;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new WingTreasureUpgradeProxy();
        }
        return this._ins;
    }

    /**
     * 获取翅膀宝物等级对应的属性数据
     * @param stage 翅膀宝物等级
     * @returns 翅膀宝物等级对应的属性数据
     */
    public getTreasureAttrList(stage: number): IWingTreasureAttrItem[] {
        let _l: Configs.t_Wing_Treasure_Upgrade_dat[] = this.List;
        const initAttrList = WingTreasureInitProxy.Ins.getTreasureInitAttrList();
        const list = _l.filter(o => o.f_id <= stage).map(o => ({ idStr: o.f_TreasureEffect, value: Number(o.f_UpgradeValue) }));
        const attrs: string[] = list.map(o => o.idStr);
        return initAttrList.map(o => {
            const index = attrs.lastIndexOf(o.id.toString());
            return {
                id: o.id,
                value: list.filter(item => item.idStr.indexOf(o.id.toString()) !== -1).reduce((sum, cur) => sum += cur.value, 0),
                level: Math.floor((index + 1) / 7)
            }
        })
    }

    /**
     * 获取翅膀宝物升级属性配置的最大等级数
     * @returns 
     */
    public getMaxUpgradeStage(): number {
        return Math.max(...this.List.map(o => o.f_id));
    }
}

export class WingTreasureConfigProxy extends BaseCfg{
    public GetTabelName() {
        return "t_Wing_Treasure_Config"
    }
    private static _ins: WingTreasureConfigProxy;

    public static get Ins() {
        if (!this._ins) {
            this._ins = new WingTreasureConfigProxy();
        }
        return this._ins;
    }

    public checkWingTreasureFullLevel(treasureStage: number): boolean {
        // 宝物境界对应的最大级数
        const fullRankStage: number = this.List.filter(o => !isNaN(o.f_TreasureRank)).map(o => o.f_TreasureRank).length * 7;
        // 宝物升级属性配置的最大级数
        const fullUpgradeStage: number = WingTreasureUpgradeProxy.Ins.getMaxUpgradeStage();
        return treasureStage >= Math.min(fullRankStage, fullUpgradeStage);
    }

    public getTreasurResources(rank: number): ItemVo[] {
        let _l: Configs.t_Wing_Treasure_Config_dat[] = this.List;
        const cfg = _l.find(o => Number(o.f_TreasureRank) === rank);
        if (!cfg) {
            throw new Error(`t_Wing_Treasure_Config缺少境界#${rank}的配置`);
        }
        return ItemViewFactory.convertItemList(cfg.f_Item).sort((a, b) => a.cfgId - b.cfgId);
    }

    /**
     * 获取翅膀宝物等级对应的升级升级成功率
     * @param rank 翅膀宝物的境界
     */
    public getTreasureUpgradeRateStr(rank: number): string {
        let _l: Configs.t_Wing_Treasure_Config_dat[] = this.List;
        const cfg = _l.find(o => o.f_TreasureRank === rank);
        if (!cfg) {
            throw new Error(`t_Wing_Treasure_Config缺少境界#${rank}的配置`);
        }
        return parseFloat((cfg.f_Rank1 / 10000).toFixed(2)) + '%';
    }
}

export class WingUpdateAttrSkinProxy {

    //有两属性可以比较的情况
    public static setDataThan(skin: IWingUpgradeAttrSkin, attrVo: IWingUpgradeAttrListItem) {
        let model = MainModel.Ins;
        skin.tf1.text = model.getAttrNameIdByID(attrVo.id);
        skin.valTf1.text = attrConvert(attrVo.id,attrVo.now);
        if (attrVo.next && (attrVo.now !== attrVo.next)) {
            skin.upimg.visible = true;
            skin.valTf2.text = attrConvert(attrVo.id,attrVo.next);
        } else {
            skin.upimg.visible = false;
            skin.valTf2.text = '';
        }
    }

    public static setDataThan2(skin: IWingSpecialAttrSkin, attrVo: ISpecialAttrItem) {
        let model = MainModel.Ins;
        if (!attrVo) {
            skin.tf1.text = '';
            skin.valTf.text = '';
            return;
        }
        if (attrVo.title) {
            skin.tf1.text = attrVo.title;
        } else {
            skin.tf1.text = model.getAttrNameIdByID(attrVo.id);
        }
        if (attrVo.addValue) {
            const valText = attrConvert(attrVo.id, attrVo.value).replace('%', '');
            const totalText = attrConvert(attrVo.id, attrVo.value + attrVo.addValue);
            const addValText = attrConvert(attrVo.id, attrVo.addValue).replace('%', '');
            skin.valTf.text = `${totalText}(${valText}+${addValText})`;
        } else {
            const valText = attrConvert(attrVo.id, attrVo.value);
            skin.valTf.text = `${valText}`;
        }
        //skin.valTf.x = skin.upimg.x - skin.valTf.textField.displayWidth - 7;
    }

    public static setWingListItem(skin: ui.views.wing.ui_main_chibang2UI, itemVo: IWingListItem) {
        const wingId = itemVo.wingId;
        const selected = itemVo.selected;
        const locked = itemVo.locked;
        const weared = itemVo.weared;
        skin.wingLeftIcon.skin = ItemViewFactory.getWingIcon(wingId);
        skin.wingRightIcon.skin = ItemViewFactory.getWingIcon(wingId);
        if (selected !== undefined) {
            skin.selectedView.visible = selected ? true : false;
            skin.selectedBg.visible = selected ? true : false;
        }
        if (locked !== undefined) {
            skin.lockView.visible = locked ? true : false;
        }
        if (weared !== undefined) {
            skin.wearedIcon.visible = weared ? true : false;
        }
    }

    public static setWingInfoAttrItem(skin: ui.views.wing.ui_wing_attr2UI, attrVo: ISpecialAttrItem | 'empty') {
        let model = MainModel.Ins;
        if (attrVo === 'empty') {
            skin.tf1.text = '';
            skin.valTf.text = '';
            skin.visible = false;
        } else {
            skin.tf1.text = model.getAttrNameIdByID(attrVo.id);
            skin.valTf.text = attrConvert(attrVo.id,attrVo.value);
        }
    }
}




