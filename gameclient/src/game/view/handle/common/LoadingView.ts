import mUI = ui.views.common.ui_loadingUI;

import { ViewBase } from "../../../../frame/view/ViewBase";
import { ui } from "../../../../ui/layaMaxUI";
import { EPageType } from "../../../common/defines/EnumDefine";
import { E } from "../../../G";
import { ResPath } from "../../../resouce/ResPath";
export class LoadingVo{
    start:number;
    end:number
    /**使用的时间 */
    duration:number;
    callBack:Laya.Handler;
}
/**加载页面*/
export class LoadingView extends ViewBase  {
    protected checkGuide:boolean = false;
    //#region 静态
    public PageType: EPageType = EPageType.None;
    // private static tips_cn: string[] = [];
    // private static tips_en: string[] = [];

    //#endregion

    //#region 实例
    private _ui: mUI;

    //#region 抽象方法实现
    protected onEnter() {

    }
    protected onExit() {
        E.taLoginTrack("loadingcomplete");
        // console.log("loading完成")
    }
    protected onFirstInit() {
        if(!this.UI){
            this.UI = this._ui = new mUI();
        }
    }

    protected onInit() {

        E.taLoginTrack("startloading");
        // console.log("显示加载界面")
        this.initUI();

        if(this.Data instanceof LoadingVo){
            let vo:LoadingVo = this.Data;
            this.playAnim(vo);
        }
    }

    protected onAddLoadRes() {
        this.addRes(ResPath.View.Loading, Laya.Loader.JSON);
        // this.addRes(ResPath.Atlas.Main_Loading, Laya.Loader.ATLAS);
        // this.addRes(ResPath.Atlas.Anim_Loading, Laya.Loader.ATLAS);
        this.addAtlas("loadingnew.atlas");
    }

    /**添加事件监听 */
    protected onAddEventListener() {

    }

    protected onChangeLanguage() {

    }
    //#endregion

    private _flag:boolean;
    // private _prog: number = 0;
    private _curVal:number = 0;
    /**进度刷新
     * @param num 进度值 0-1
    */
    public UpdateProgress(num: number) {
        this._curVal = num;
        // console.log("num:::::::" + num);
        // this._prog = MathUtil.Clamp(num, 0, 1.0);
        // console.log("_prog:::::::" + this._prog);

        //刷新
        // this._ui.img_prog_fill.x = this._prog * this._ui.img_prog_fill.width;
        // this._ui.box_ani.x = MathUtil.Clamp(this._ui.img_prog_fill.x, 0, this._ui.img_prog_fill.width - this._ui.box_ani.width);
        // this._ui.lbl_prog_percent.changeText(NumberUtil.ToInt(this._prog * 100) + "%");

        let showKedu:boolean = true;
        let flag:boolean = true;
        this._ui.progressTf.text = Math.floor(num * 100).toString()+"%";
        if (num > 0 && num <= 1) {
            if((num*100 > 50) && !this._flag){
                E.taLoginTrack("loading50");
                // console.log("loading50");
                this._flag = true;
            }
            this._ui.progressSkinBg.width = this._ui.progressSkin.width * num;
            this._ui.kedu.x = this._ui.progressSkinBg.width - this._ui.kedu.width;
            // this._ui.progressSkinBg.visible = true;
            // this._ui.kedu.visible = true;
        }else if(num <= 0){
            // this._ui.progressSkinBg.visible = false;
            // this._ui.kedu.visible = false;
            showKedu = false;
        }else{
            this._ui.progressSkinBg.width = this._ui.progressSkin.width;
            this._ui.kedu.x = this._ui.progressSkinBg.width - this._ui.kedu.width;
        }
        if(showKedu){
            this._ui.progressSkinBg.visible = true;
            this._ui.kedu.visible = true;
        }else{
            this._ui.progressSkinBg.visible = false;
            this._ui.kedu.visible = false;
        }
    }

    private initUI() {

        // this._ui.img_prog_fill.x = 0;
        // this._ui.box_ani.x = 0;
        // this._ui.lbl_prog_percent.changeText("0%");

        // LoadingView.tips_cn = [];

        // t_tips_help.Ins.List.forEach(dat => {
        //     ListUtil.Add(LoadingView.tips_cn, dat.f_text_cn);
        //     ListUtil.Add(LoadingView.tips_en, dat.f_text_en);
        // });

        // this.randShowTip();
        // Laya.timer.loop(1000, this, () => {
        //     this.randShowTip();
        // });

    }
    private _tween:Laya.Tween = new Laya.Tween();
    // private progressVal:number = 0;
    /**播放进度条动画 */
    public playAnim(vo:LoadingVo){
        let start:number = vo.start;
        let end:number = vo.end;
        let complete:Laya.Handler = vo.callBack;
        let  duration:number=vo.duration;
        this._tween.clear();
        this.curVal = start;
        this._tween.to(this,{curVal:end},duration,null,complete);
    }

    public set curVal(val:number){
        this.UpdateProgress(val);
    }

    public get curVal(){
        return this._curVal;
    }

    // private curTipIdx: number = 0;
    // private randTipIdx: number = 0;
    // private randShowTip() {
    //     let tmptips: string[] = [];
    //     if (E.LangMgr.IsChinese)
    //         tmptips = LoadingView.tips_cn;
    //     else
    //         tmptips = LoadingView.tips_en;
    //     if (tmptips == null || tmptips.length == 0) return;
    //     this.randTipIdx = RandomUtil.RandomRoundInt(0, tmptips.length);
    //     if (this.curTipIdx == this.randTipIdx) {
    //         this.randTipIdx += 1;
    //         if (this.randTipIdx == tmptips.length - 1) this.randTipIdx = 0;
    //         this.curTipIdx = this.randTipIdx;
    //     }
    //     // this._ui.lbl_tip.changeText(tmptips[this.curTipIdx]);
    // }
}