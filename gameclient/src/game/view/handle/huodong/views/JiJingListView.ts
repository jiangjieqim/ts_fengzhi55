import { RowMoveBaseNode, ScrollPanelControl } from "../../../../../frame/view/ScrollPanelControl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { BaseCfg } from "../../../../static/json/data/BaseCfg";
import { DotManager } from "../../common/DotManager";
import { EFuncDef } from "../../main/model/EFuncDef";
import { MainEvent } from "../../main/model/MainEvent";
import { MainModel } from "../../main/model/MainModel";
import { TaskModel } from "../../main/model/TaskModel";
import { FuncProxy } from "../../main/proxy/FuncProxy";
import { ActivityModel } from "../ActivityModel";
import { ActivityEvent } from "../model/ActivityEvent";
import { ECardLingqu } from "./YueKaView";

class t_CharacterBorn extends BaseCfg{
    public GetTabelName():string{
        return "t_CharacterBorn";
    }
    private static _ins:t_CharacterBorn;
    public static get Ins(){
        if(!this._ins){
            this._ins = new t_CharacterBorn();
        }
        return this._ins;
    }
}

interface ICardSkin extends Laya.Sprite{
    icon:Laya.Image;
}

class CcjijingItem extends RowMoveBaseNode{
    private skin:ICardSkin
    protected clsKey:string =  "CcjijingItem";
    private _yueKa:ui.views.huodong.ui_ccjj_yuka_itemUI;
    private _zhongshen:ui.views.huodong.ui_zhongshen_item_viewUI;
    private _tequan:ui.views.huodong.ui_ccjj_tequan_item_viewUI;
    private onClick(cfg:Configs.t_CharacterBorn_dat,e:Laya.Event){
        ActivityModel.Ins.openFunc(cfg.f_activityType, cfg.f_uitype);
    }
    
    private layoutMonthUI(){
        this._yueKa.dattf.x = this._yueKa.img1.x + this._yueKa.img1.width;
        this._yueKa.img2.x = this._yueKa.dattf.x + this._yueKa.dattf.textField.width;
        let w = this._yueKa.img2.width + this._yueKa.img1.width + this._yueKa.dattf.textField.width;
        this._yueKa.subcon.x = (307 - w)/2;
    }
    private layoutTeQuanUI(){
        this._tequan.dattf1.x = this._tequan.img11.x + this._tequan.img11.width;
        this._tequan.img22.x = this._tequan.dattf1.x + this._tequan.dattf1.textField.width;
        let w = this._tequan.img22.width + this._tequan.img11.width + this._tequan.dattf1.textField.width;
        this._tequan.subcon1.x = (307 - w)/2;
    }
    private upDataTeQuanKa(){
        if(this.skin.destroyed){
            return;
        }
        this._tequan.img_tq.visible = false;
        this._tequan.subcon1.visible = false;
        let _curData = MainModel.Ins.teQuanKaCard;
        if(_curData){
            if (_curData.val == ECardLingqu.Nothing) {
                this._tequan.img_tq.visible = true;
            }
            else if (_curData.val == ECardLingqu.CanGet ||
                _curData.val == ECardLingqu.AlreadyGet
                ) 
            {
                this._tequan.subcon1.visible = true;
                this._tequan.dattf1.text = _curData.subday + "";
                this.layoutTeQuanUI();
            }

            if(_curData.val == ECardLingqu.CanGet){
                // DotManager.addDot(this._ui.tequanitem)
                this.addRed();
            }else{
                DotManager.removeDot(this.skin);
            }
        }
    }
    private onMonthrefreshView(){
        if(this.skin.destroyed){
            return;
        }
        this._yueKa.yueka2.visible = false;
        this._yueKa.subcon.visible = false;
        let _curData = MainModel.Ins.monthCard;
        if(_curData){
            if (_curData.val == ECardLingqu.Nothing) {
                this._yueKa.yueka2.visible = true;
            }
            else if (_curData.val == ECardLingqu.CanGet ||
                _curData.val == ECardLingqu.AlreadyGet
                ) 
            {
                this._yueKa.subcon.visible = true;
                this._yueKa.dattf.text = _curData.subday + "";
                this.layoutMonthUI();
            }

            if(_curData.val == ECardLingqu.CanGet){
                this.addRed();
            }else{
                DotManager.removeDot(this.skin);
            }
        }
    }

    private addRed(){
        DotManager.addDot(this.skin,-30);
    }

    free(){
        super.free();
        MainModel.Ins.off(MainEvent.MonthUpdate,this,this.onMonthrefreshView);
        MainModel.Ins.off(MainEvent.AllLifeUpdate,this,this.onAllLifeRefresh);
        MainModel.Ins.off(MainEvent.Updata_TeQuanKa,this,this.upDataTeQuanKa);
    }
      /**终生卡 */
      private onAllLifeRefresh(){
        if(this.skin.destroyed){
            return;
        }
        let _curData = MainModel.Ins.allLife;
        if(_curData){
            this._zhongshen.zhongshengka.visible = false;
            this._zhongshen.zhongshenglingqu.visible = false;
            if (_curData.val == ECardLingqu.Nothing) {
                this._zhongshen.zhongshengka.visible = true;
            }else{
                this._zhongshen.zhongshenglingqu.visible = true;
            }

            if(_curData.val == ECardLingqu.CanGet){
                this.addRed();
            }else{
                DotManager.removeDot(this.skin);
            }
        }
    }

    protected createNode (index){
        let skin:ICardSkin;
        let _skin:ui.views.huodong.ui_ccjj_item_viewUI = Laya.Pool.getItemByClass(this.clsKey,ui.views.huodong.ui_ccjj_item_viewUI);
        skin = _skin;
        this.skin = _skin;
        let cfg:Configs.t_CharacterBorn_dat = this.list[index];
        _skin.yueka.visible = false;
        _skin.zhongshen.visible = false;
        _skin.tequan.visible = false;
        this._yueKa = _skin.yueka;
        this._zhongshen = _skin.zhongshen;

        if(cfg.f_uitype == EViewType.YueKa){
            //月卡
            _skin.yueka.visible = true;
            MainModel.Ins.on(MainEvent.MonthUpdate,this,this.onMonthrefreshView);
            this.onMonthrefreshView();
        }
        else if(cfg.f_uitype == EViewType.ZhongShenKa){
            //终生卡
            _skin.zhongshen.visible = true;
            MainModel.Ins.on(MainEvent.AllLifeUpdate,this,this.onAllLifeRefresh);
            this.onAllLifeRefresh();
        }
        else if(cfg.f_uitype == EViewType.TeQuanKaView){
            _skin.tequan.visible = true;
            this._tequan = _skin.tequan;
            MainModel.Ins.on(MainEvent.Updata_TeQuanKa,this,this.upDataTeQuanKa);
            this.upDataTeQuanKa();
        }
        else{
            let packId:number =  cfg.f_activityType;
            const item = ActivityModel.Ins.getVo(packId);
            if (ActivityModel.Ins.hasBoxBorn(packId, item)) {            
                this.addRed();
            }else{
                DotManager.removeDot(_skin);
            }
            skin = _skin;
        }            
        skin.x = index * skin.width;
        skin.y = this.y;
        DebugUtil.draw(skin);
        skin.on(Laya.Event.CLICK,this,this.onClick,[cfg]);
        skin.icon.skin = cfg.f_icon;
        return skin;
    }
}


export class JiJingListView extends ViewBase{
    private _ui: ui.views.huodong.ui_ccjj_listUI;
    protected mMask: boolean = true;
    protected mMainSnapshot = true;
    protected autoFree:boolean = true;
    // private btnList:ButtonCtl[] = [];
    private scrollView:ScrollPanelControl;
    protected onAddLoadRes(): void {
        this.addAtlas("huodong.atlas");
    }

    protected onFirstInit(): void {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.huodong.ui_ccjj_listUI();
            this.bindClose(this._ui.close1);
            this.scrollView = new ScrollPanelControl();
            this.scrollView.init(this._ui.panel1);
            this._ui.tf2.text = FuncProxy.Ins.getCfgByFid(EFuncDef.JiJing).f_name;
            // E.getLang("superpackage");
            /*
            this._ui.zuoqi.visible = this._ui.lingchong.visible = this._ui.baoshi.visible = false;
            this.btnList.push(
                ButtonCtl.CreateBtn(this._ui.chengzhangitem, this, this.chengzhangLibao),
                ButtonCtl.CreateBtn(this._ui.baoxiangchengzhan, this, this.baoxianChegnzhan),
                ButtonCtl.CreateBtn(this._ui.zuoqi, this, this.zuoqiHandler),
                ButtonCtl.CreateBtn(this._ui.lingchong, this, this.lingchongHandler),
                ButtonCtl.CreateBtn(this._ui.baoshi, this, this.baoshiHandler)
            )
            */
        }
    }

    protected onInit(): void {
        ActivityModel.Ins.on(ActivityEvent.UpdateData,this,this.updataView);
        this.updataView();
    }

    protected onExit(): void {
        ActivityModel.Ins.off(ActivityEvent.UpdateData,this,this.updataView);
        // while(this.btnList.length){
        // let btn:ButtonCtl = this.btnList.pop();
        // btn.dispose();
        // }
    }

    // /**角色成长礼包 */
    // private chengzhangLibao() {
    //     ActivityModel.Ins.openFunc(EActivityType.RoleBorn, EViewType.JueSeChengZhang);
    // }

    // /**宝箱成长礼包 */
    // private baoxianChegnzhan() {
    //     ActivityModel.Ins.openFunc(EActivityType.BoxBorn, EViewType.BoxChengZhang);
    // }

    // /**坐骑成长礼包 */
    // private zuoqiHandler() {
    //     ActivityModel.Ins.openFunc(EActivityType.ZuoqiChengZhang, EViewType.ZuoqiChengZhangView);
    // }

    // /**灵宠成长礼包 */
    // private lingchongHandler() {
    //     ActivityModel.Ins.openFunc(EActivityType.LingchongChengZhang, EViewType.LingchongChengZhangView);
    // }

    // /**宝石成长礼包 */
    // private baoshiHandler() {
    //     ActivityModel.Ins.openFunc(EActivityType.BaoshiChengZhang, EViewType.BaoshiChengZhangView);
    // }

    private updataView(){
        /*
        const arr = [
            { packId: EActivityType.BoxBorn, ui: this._ui.baoxiangchengzhan },
            { packId: EActivityType.RoleBorn, ui: this._ui.chengzhangitem },
            { packId: EActivityType.ZuoqiChengZhang, ui: this._ui.zuoqi, funcId: EFuncDef.Ride },
            { packId: EActivityType.LingchongChengZhang, ui: this._ui.lingchong, funcId: EFuncDef.LingChong },
            { packId: EActivityType.BaoshiChengZhang, ui: this._ui.baoshi, funcId: EFuncDef.Gem },
        ];
        for (const o of arr) {
            const packId = o.packId;
            const _ui = o.ui;
            const funcId = o.funcId;
            const item = ActivityModel.Ins.getVo(packId);
            if (!_ui.visible && funcId) {
                const res = TaskModel.Ins.isFuncOpen(funcId, false);
                if (res) _ui.visible = true;
            }
            if (ActivityModel.Ins.hasBoxBorn(packId, item)) {
                DotManager.addDot(_ui);
            } else {
                DotManager.removeDot(_ui);
            }
        }
        */

        let l = t_CharacterBorn.Ins.List;
        let cfglist = [];
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_CharacterBorn_dat = l[i];
            if(cfg.f_open){
                let funcOpen:boolean = true;
                if(cfg.f_funcid){
                     if(!TaskModel.Ins.isFuncOpen(cfg.f_funcid, false)){
                        funcOpen = false;
                     }
                }
                if(funcOpen){
                    cfglist.push(cfg);
                }
            }
        }
        this.scrollView.clear();
        this.scrollView.split(cfglist,CcjijingItem,340,0,2);
        this.scrollView.end();
    }
}