import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EPageType } from "../../../../common/defines/EnumDefine";
import { stNotice } from "../../../../network/protocols/BaseProto";
import { BaseCfg } from "../../../../static/json/data/BaseCfg";
import { FuJiangListProxy } from "../../fujiang/proxy/FuJiangProxy";
import { HeroHouseModel } from "../../herohouse/HeroHouseModel";
import { t_Gym_NPC_List } from "../../herohouse/model/GymProxy";
import { System_RefreshTimeProxy } from "../../huodong/model/ActivityProxy";
import { t_Spirit_Attribute_Fixed } from "../../soul/model/SoulProxy";
import { Mount_ListProxy } from "../../zuoqi/vos/ZuoqiProxy";
import { EquipmentQualityProxy } from "../model/EquipmentProxy";
import { MainModel } from "../model/MainModel";
import { ItemProxy } from "../proxy/ItemProxy";
class t_Subtitle_Content extends BaseCfg{
    public GetTabelName():string{
        return "t_Subtitle_Content";
    }
    private static _ins: t_Subtitle_Content;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Subtitle_Content();
        }
        return this._ins;
    }
    public getContentTxt(f_subtitleid:number){
        let l = this.List;
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_Subtitle_Content_dat = l[i];
            if(cfg.f_subtitleid == f_subtitleid){
                return cfg;
            }
        }
    }
}
export enum ENoticeType{
    /**跑马灯 */
    PaoMaLight = 3,

    /**公告 */
    Notice = 1,

    /**游戏内部跑马灯 */
    GameRolling = 4,
}

export class RollingLampView extends ViewBase {
    public PageType:EPageType = EPageType.None;
    private _ui: ui.views.main.ui_paomaLightUI;
    private model:MainModel;
    private _time:number;
    private _stopTime:number;
    private tw:Laya.Tween = new Laya.Tween();
    protected onAddLoadRes(): void { 
        this.addAtlas("main/main.atlas");
    }
    protected onExit(): void { 
        this.resetX();
    }
    protected onFirstInit(): void {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.main.ui_paomaLightUI();
            this.model = MainModel.Ins;
            this._ui.paomaTf.cacheAs = "normal";

            let arr = System_RefreshTimeProxy.Ins.getVal(17).split("-");
            this._time = parseInt(arr[0]);
            this._stopTime = parseInt(arr[1]);
            this.resetX();
        }
    }

    private resetX(){
        this._ui.container.x = this._ui.width + 100;
    }
    protected onInit(): void { 
        // this._ui.paomalight.skin = "remote/main/main/tongyongduihuakuang_2.png";
        Laya.timer.clearAll(this);
        this.showNotice();
    }

    private showNotice(){
        if(this.model.pomaList.length <= 0){
            this.Close();
        }else{
            this.resetX();
            this.doAction();
            // Laya.timer.once(500,this,this.doAction);
        }
    }

    private doAction(){
        let cell:stNotice = this.model.pomaList.shift();
        if(cell.type == ENoticeType.GameRolling){
            let cfg = t_Subtitle_Content.Ins.getContentTxt(cell.templateId);
            if(cfg){

                switch(cfg.f_subtitleid){
                    case 2:
                        // {0}抽到了{1}品质福源，大道气运汇聚与此人
                        cell.params[1] = main.itemName(ItemProxy.Ins.getCfg( parseInt(cell.params[1])).f_name);
                        break;
                    case 4:
                        // 恭喜！{0}获得{1}稀有坐骑{2}，喜提宝驹
                        //{1}坐骑品质id{2}坐骑id
                        let f_Quality = "";
                        let cfg: Configs.t_EquipmentQuality_dat = EquipmentQualityProxy.Ins.GetDataById(parseInt(cell.params[1]));
                        if(cfg){
                            f_Quality = cfg.f_EquipmentLevel;
                        }
                        cell.params[1] = f_Quality;
                        /////////////////////////////////////////////////
                        let mountCfg:Configs.t_Mount_List_dat = Mount_ListProxy.Ins.getCfg(parseInt(cell.params[2]));
                        cell.params[2]=mountCfg.f_MountName;
                        break;
                        /*
                    case 5:
                        // {0}获得超稀有{1}战魂{2},真是欧皇在世
                        // {2}战魂f_SpiritID
                        let fixCfg:Configs.t_Spirit_Attribute_Fixed_dat = t_Spirit_Attribute_Fixed.Ins.getCfgBySpiritID(parseInt(cell.params[2]));
                        if(fixCfg){
                            cell.params[2] = fixCfg.f_SpiritName;
                        }
                        break;
                    case 6:
                        // {0}邀请到了{1}稀有武将{2},真是羡煞旁人
                        //{2}武将id
                        let herocfg:Configs.t_Gym_NPC_List_dat = t_Gym_NPC_List.Ins.getByHeroID(parseInt(cell.params[2]));
                        cell.params[2] = herocfg.f_name;
                        break;
                        */
                    case 11:
                        // {0}招募到了天蓝色副将{1}，他的实力又向前了一大步
                        // {1}副将id
                        let fjCfg = FuJiangListProxy.Ins.getCfgById(parseInt(cell.params[1]));
                        cell.params[1] =fjCfg.f_cheif;
                        break;
                }


                let str = StringUtil.format(cfg.f_subtitle,cell.params);
                this._ui.paomaTf.text = str;
            }else{
                this._ui.paomaTf.text = cell.templateId.toString();
            }
        }else{
            this._ui.paomaTf.text = cell.content;
        }
        this.tw.clear();
        this.tw.to(this._ui.container,{x:0},this._time,Laya.Ease.linearNone,new Laya.Handler(this,this.onMoveNext));
    }

    private onMoveNext(){
        Laya.timer.once(this._stopTime,this,this.next1);
    }

    private next1(){
        this.tw.to(this._ui.container,{x:-this._ui.width},this._time,Laya.Ease.linearNone,new Laya.Handler(this,this.onPlayEnd));
    }

    private onPlayEnd(){
        // Laya.timer.once(this._stopTime,this,this.showNotice);
        this.showNotice();
    }

    protected SetCenter(): void {
        // this.UI.anchorY =
        this.UI.anchorX =  0.5;
        this.UI.x = this.ViewParent.width >> 1;
        this.UI.y = MainModel.Ins.paomaGobalPos.y;
    }

}