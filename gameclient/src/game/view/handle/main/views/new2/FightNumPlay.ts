import { ViewBase } from "../../../../../../frame/view/ViewBase";
import { ui } from "../../../../../../ui/layaMaxUI";
import { EPageType } from "../../../../../common/defines/EnumDefine";
import { FontClipCtl } from "../../../avatar/ctl/FontClipCtl";
import { FontCtlFactory } from "../../../avatar/ctl/FontCtlFactory";
import { System_RefreshTimeProxy } from "../../../huodong/model/ActivityProxy";
import { ESystemRefreshTime } from "../../../huodong/model/enum/ESystemRefreshTime";
import { MainModel } from "../../model/MainModel";
export interface IPlusAnimVo{
    start:number;
    end:number;
    cur:number;
    startTime:number;
}
/**中间的战斗动画 */
export class FightNumPlay extends ViewBase{
    protected checkGuide:boolean = false;
    public PageType: EPageType = EPageType.None;
    private useMS:number = 1000;//消失的时间
    private readonly PLAY_COUNT:number = 100;//变化的次数
    private consumeTime:number;//每次消耗的时间
    private subplus:number = 0;
    private _vo:IPlusAnimVo;
    private _plusCtl:FontClipCtl;
    protected _ui:ui.views.main.maincell.ui_fight_num_playUI;
    protected onAddLoadRes(): void {
    }
    protected onExit(): void {
    }
    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.main.maincell.ui_fight_num_playUI();
            this._plusCtl = FontCtlFactory.createPlus(1.0);
        }
    }
    protected onInit(): void {
        this.useMS = System_RefreshTimeProxy.Ins.getNumberVal(ESystemRefreshTime.PlusAnimTimeMs);
        this._vo = this.Data;
        this._vo.startTime = Laya.timer.currTimer;
        this.subplus = Math.ceil((this._vo.end - this._vo.start)/this.PLAY_COUNT);
        this.consumeTime = this.useMS / this.PLAY_COUNT;
        this._vo.cur = this._vo.start;
        this.updatePlus();
        Laya.timer.once(this.consumeTime,this,this.onFrame);        
    }

    private onFrame(){
        if(this._vo.cur+this.subplus >= this._vo.end){
            this._vo.cur = this._vo.end;
            this.updatePlus();
            Laya.timer.once(200, this, this.Close);
        }else{
            this._vo.cur += this.subplus;
            this.updatePlus();
            Laya.timer.once(this.consumeTime,this,this.onFrame);
        }
    }

    protected Close(){
        super.Close();
        LogSys.Log(`FightNumPlay use time ${Laya.timer.currTimer - this._vo.startTime} ms`);
        Laya.timer.once(100,this,this.onEnd);
    }

    private onEnd(){
        MainModel.Ins.plusplay.action();
    }

    private updatePlus(){
        this._plusCtl.setValue(this._ui.plusCon,this._vo.cur+"");
    }

}