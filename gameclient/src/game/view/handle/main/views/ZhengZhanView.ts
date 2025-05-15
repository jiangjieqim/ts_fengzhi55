import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { ConquestChapterReward_req, ConquestFight_req, stSkin } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import { BaseCfg } from "../../../../static/json/data/BaseCfg";
import { FontClipCtl } from "../../avatar/ctl/FontClipCtl";
import { FontCtlFactory } from "../../avatar/ctl/FontCtlFactory";
import { Enemy_ImageProxy } from "../model/AdventureProxy";
import { EFuncDef } from "../model/EFuncDef";
import { ItemViewFactory } from "../model/ItemViewFactory";
import { MainEvent } from "../model/MainEvent";
import { EConquestType, MainModel } from "../model/MainModel";
import { FuncProxy } from "../proxy/FuncProxy";
import { ZhengZhanAvatarItem } from "./ZhengZhanAvatarItem";

export class t_Conquest_Value extends BaseCfg{
    public GetTabelName():string{
        return "t_Conquest_Value";
    }
    private static _ins: t_Conquest_Value;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Conquest_Value();
        }
        return this._ins;
    }
}
export class t_Conquest_EnemyValue extends BaseCfg{
    public GetTabelName():string{
        return "t_Conquest_EnemyValue";
    }
    private static _ins: t_Conquest_EnemyValue;
    public static get Ins() {
        if (!this._ins) {
            this._ins = new t_Conquest_EnemyValue();
        }
        return this._ins;
    }

    public getCfgByEnemyId(entmyId:number):Configs.t_Conquest_EnemyValue_dat{
        let l = this.List;
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_Conquest_EnemyValue_dat = l[i];
            if(cfg.f_EnemyID == entmyId){
                return cfg;
            }
        }
    }
}
class EnemyImageSkin{
    id:number;
    f_Enemyid:number;
    index:number;
}
/**征战 */
export class ZhengZhanView extends ViewBase {
    protected autoFree = true;
    private roleList:EnemyImageSkin[];// = [];
    private clsSkin:string = "ZhengZhanAvatarItem";
    private readonly maxCount:number = 10;
    private _ui: ui.views.zhangzhan.ui_zhengzhan_mainUI;
    private model:MainModel;
    private initWidth:number;
    private cfg:Configs.t_Conquest_Value_dat;
    private fightCtl:ButtonCtl;
    protected mMask: boolean = true;
    private _plusCtl:FontClipCtl;
    private _allPlus:number;
    protected onAddLoadRes(): void {
        this.addAtlas("zhengzhan.atlas");
    }
    protected onExit(): void {
        this.model.off(MainEvent.ConquestUpdate, this, this.updateView);
        this.clearAllAvatar();
    }

    private clearAllAvatar() {
        for (let i = 0; i < 6; i++) {
            // let pos = parseInt(_stationsStr[i]);
            let avatarCon: Laya.Sprite = this._ui['avatar' + i];
            if (avatarCon.numChildren > 0) {
                let item:ZhengZhanAvatarItem = avatarCon.getChildAt(0) as ZhengZhanAvatarItem;
                Laya.Pool.recover(this.clsSkin,item);
                item.dispose();

                // let avatar: AvatarMonsterView = avatarCon.getChildAt(0) as AvatarMonsterView;
                // avatar.dispose();
            }
        }
    }

    protected onFirstInit(): void {
        if (!this.UI) {
            this.model = MainModel.Ins;
            this.UI = this._ui = new ui.views.zhangzhan.ui_zhengzhan_mainUI();
            this.initWidth = this._ui.bg6.width;
            this.bindClose(this._ui.close1);
            this.fightCtl = ButtonCtl.CreateBtn(this._ui.tiaozhanBtn, this, this.onFightHandler);
            this._ui.tf3.on(Laya.Event.CLICK,this,this.onTipsHandler);
            this._ui.helpBtn.on(Laya.Event.CLICK,this,this.onTipsHandler);
            this._plusCtl = FontCtlFactory.createPlus();
            this._ui.title1.text = FuncProxy.Ins.getCfgByFuncId(EFuncDef.Expedition).f_name;
        }
    }

    /**阵容特性 */
    private onTipsHandler(e:Laya.Event) {
        e.stopPropagation();
        if(this.cfg){
            MainModel.Ins.showSmallTips("", this.cfg.f_Lineup, e.target,"rightbottom");
        }
    }
    private onFightHandler() {
        switch (this.model.conquestData.state) {
            case EConquestType.NotLingQu:
                let req1 = new ConquestChapterReward_req();
                SocketMgr.Ins.SendMessageBin(req1);
                break;
            case EConquestType.Zero:
                let req = new ConquestFight_req();
                SocketMgr.Ins.SendMessageBin(req);
                break;
        }
    }

    private updateProgress(_step:number){
        this._ui.progressTf.text = `${_step}/${this.maxCount}`;
        this._ui.bg6.width = this.initWidth * (_step / this.maxCount);
    }

    private onCreateList(vo:EnemyImageSkin){
        // for (let i = 0; i < _skinList.length; i++) {
            // let pos = parseInt(_stationsStr[i]);
            let avatarCon: Laya.Sprite = this._ui['avatar' + vo.index];
            let f_Enemyid:number = vo.f_Enemyid;//parseInt(f_EnemyidArr[i]);
            let _skinVo: stSkin;
            if (!f_Enemyid) {
                //站位为空
                // if (avatarCon.numChildren > 0) {
                //     avatar = avatarCon.getChildAt(0) as AvatarMonsterView;
                //     avatar.visible = false;
                // }
            } else {
                let _imgcfg: Configs.t_Enemy_Image_dat = Enemy_ImageProxy.Ins.getCfg(vo.id);
                _skinVo = new stSkin();
                _skinVo.f_BodyID = _imgcfg.f_BodyID;
                _skinVo.f_HeadID = _imgcfg.f_HeadID;

                _skinVo.f_MountID =  _imgcfg.f_MountID;//Math.random()>0.5 ? _imgcfg.f_MountID : 1;
                _skinVo.f_ShieldID = _imgcfg.f_ShieldID;
                _skinVo.f_WeaponID = _imgcfg.f_WeaponID;
                _skinVo.f_WingID = _imgcfg.f_WingID;

                let item = Laya.Pool.getItemByClass(this.clsSkin,ZhengZhanAvatarItem);
                let cfg:Configs.t_Conquest_EnemyValue_dat = t_Conquest_EnemyValue.Ins.getCfgByEnemyId(f_Enemyid);
                this._allPlus += cfg.f_EnemyPower;
                item.refresh(_skinVo,cfg);             
                avatarCon.addChild(item);
            }
        // }
    }
    private onCreateRole(){
        if(this.roleList.length > 0){
            let cell = this.roleList.shift();
            this.onCreateList(cell);
        }else{
            Laya.timer.clear(this,this.onCreateRole);
            this.next();
        }
    }
    private updateView(){
        if (this.model.conquestData) {
            this.clearAllAvatar();
            this.cfg = t_Conquest_Value.Ins.GetDataById(this.model.conquestData.fid);
            let arr = this.cfg.f_Level.split("-");//arr[1]

            this._ui.tf2.text = this.cfg.f_LevelName;
            this._ui.tf4.text = E.getLang("zhengzhan01", this.cfg.f_Level);
            
            // let f_Stations = this.cfg.f_Stations;
            // let _stationsStr: string[] = f_Stations.split("|");
            let _skinList: string[] = this.cfg.f_EnemyImage.split("|");
            let f_EnemyidArr:string[] = this.cfg.f_Enemyid.split("|");

            let l:EnemyImageSkin[] = [];
            for(let i = 0;i < _skinList.length;i++){
                let cell = new EnemyImageSkin();
                cell.index = i;
                cell.id = parseInt(_skinList[i]);
                cell.f_Enemyid = parseInt(f_EnemyidArr[i]);
                l.push(cell);
            }
            this.roleList = l;
            // let _allPlus:number = 0;
            this._allPlus = 0;

            Laya.timer.frameLoop(1,this,this.onCreateRole);

            this._ui.box1.skin = `remote/zhengzhan/chest.png`;
            let _rewardStr:string = this.cfg.f_LevelReward;
            let _step:number = parseInt(arr[1]) - 1;
            switch(this.model.conquestData.state)
            {
                case EConquestType.IsLingQu:
                    //已领取 灰色
                    this.fightCtl.grayMouseDisable = true;
                    this._ui.tf6.text = E.getLang("LingQu2");
                    break;
                case EConquestType.NotLingQu:
                    this._ui.box1.skin = `remote/zhengzhan/chest_1.png`;
                    this.fightCtl.grayMouseDisable = false;
                    this._ui.tf6.text = E.getLang("LingQu");
                    _rewardStr = this.cfg.f_StageReward;
                    _step = this.maxCount;
                    break;
                case EConquestType.Zero:
                    this.fightCtl.grayMouseDisable = false;
                    this._ui.tf6.text = E.getLang("zhengzhan02");
                    break;
            }
            this.updateProgress(_step);
            ItemViewFactory.renderItemSlots(this._ui.rewardCon, _rewardStr, 10, 1, "center");
        }
    }

    private next(){
        this._plusCtl.setValue(this._ui.toplug, this._allPlus.toString());
    }

    protected onInit(): void {
        this.model.on(MainEvent.ConquestUpdate,this,this.updateView);
        this.updateView();
    }
}