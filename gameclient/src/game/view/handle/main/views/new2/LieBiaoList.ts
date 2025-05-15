import { DrawCallButtonCtl } from "../../../../../../frame/view/DrawCallButtonCtl";
import { PlatformConfig } from "../../../../../../InitConfig";
import { ui } from "../../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { E } from "../../../../../G";
import { getPosSize } from "../../../sdk/ISdk";
import { ISdkBaseButton, SdkButtonMgr } from "../../../sdk/SdkButtonMgr";
import { YaoQingModel } from "../../../yaoqing/model/YaoQingModel";
import { EFuncDef } from "../../model/EFuncDef";
import { MainEvent } from "../../model/MainEvent";
import { MainModel } from "../../model/MainModel";
import { MainIconProxy } from "../../proxy/FuncProxy";
import { EButtonStyle, FuncSmallIcon, IBaseSmallIcon } from "../icon/FuncSmallIcon";
import { ILiebiaoSubSkin, SettingBtn } from "./LeftSmallFuncIcon";

class LeftMidIcon extends ui.views.main.ui_little_iconUI implements IBaseSmallIcon{
    get dot(){
        return this.redimg;
    }
    get icon(){
        return this.bg;
    }
}
/**朋友圈 */
/*
class FriendsBtn extends DrawCallButtonCtl {
    private model: MainModel;
    private redImg:Laya.Image;
    constructor(skin:ILiebiaoSubSkin) {
        // this._ui.btn_yxq.redimg
        // skin: Laya.Image, redImg: Laya.Image
        super(skin, null,null);
        skin.bg.skin = "remote/main/main/sgxd2.png";
        skin.tf.text = E.getLang("pengyouquan");
        this.clickHandler = new Laya.Handler(this,this.onClick);
        this.redImg = skin.redimg;
        this.model = MainModel.Ins;

        skin.on(Laya.Event.DISPLAY, this, this.onDisplay);
        skin.on(Laya.Event.UNDISPLAY, this, this.onUnDisplay);
    }

    private onClick(){
        if(TaskModel.Ins.isFuncOpen(EFuncDef.YouXiQuan,true)){
            E.ViewMgr.Open(EViewType.YouXiQuanLiBaoView);
        }
    }

    private onDisplay() {
        this.model.on(MainEvent.YXQRed, this, this.onYXQRed);
        this.onYXQRed();
    }
    private onUnDisplay() {
        this.model.off(MainEvent.YXQRed, this, this.onYXQRed);
    }

    public onYXQRed() {
        this.redImg.visible = this.model.yxqRed;
    }
}
*/

// 邮件按钮
class EmailBtn extends SettingBtn{
    private model: MainModel;

    constructor(skin:ILiebiaoSubSkin){
        super(skin,"remote/main/main/yj.png",E.getLang("email"),null);
        this.model = MainModel.Ins;
        this.clickHandler = new Laya.Handler(this,this.onClick);
    }
    private onClick(){
        E.ViewMgr.Open(EViewType.Mail);
    }
    protected onDisplay() {
        this.model.on(MainEvent.MailRed, this, this.updateRed);
        this.updateRed();
    }
    protected onUnDisplay() {
        this.model.off(MainEvent.MailRed, this, this.updateRed);
    }
    public updateRed() {
        this.redImg.visible = this.model.bMailRed;
    }
}

// remote/main/main/gzh.png
// /**客服  公众号*/
// class ClientBtn extends SettingBtn{
//     private funcID:EFuncDef = EFuncDef.CustomerServer;
//     private cfg:Configs.t_Func_dat;
//     constructor(skin:ILiebiaoSubSkin){
//         // vo.icon = `remote/main/main/${icon}`;/
//         super(skin);//"remote/main/main/gzh.png","",null
//         this.cfg = FuncProxy.Ins.getCfgByFuncId(this.funcID);
//         skin.bg.skin = `remote/main/main/${this.cfg.f_sub_icon}`;
//         skin.tf.text = this.cfg.f_name;
//         skin.redimg.visible = false;
//         this.clickHandler = new Laya.Handler(this,this.onClick);
//     }
//     private onClick(){
//         // E.ViewMgr.Open(EViewType.GZHVIEW);
//         E.ViewMgr.OpenByFuncid(this.funcID);
//     }
// }


/**邀请按钮 */
export class YaoQingBtn extends SettingBtn{
    constructor(skin:ILiebiaoSubSkin){
        super(skin,"remote/main/main/yq.png",E.getLang("yaoqinglb"),null);
        this.funcid = EFuncDef.YaoQing;
        this.clickHandler = new Laya.Handler(this,this.onYQHandler);
    }
    private onYQHandler(){
        // if(TaskModel.Ins.isFuncOpen(EFuncDef.YaoQing,true)){
        //     E.ViewMgr.Open(EViewType.YaoQing);
        // }
        MainModel.Ins.openFunc(this.funcid);
    }
    protected onDisplay() {
        YaoQingModel.Ins.on(YaoQingModel.UPDATA_RED, this, this.onRedUpdate);
        this.onRedUpdate();
    }
    protected onUnDisplay() {
        YaoQingModel.Ins.off(YaoQingModel.UPDATA_RED, this, this.onRedUpdate);
    }

    private onRedUpdate() {
        this.redFlag = YaoQingModel.Ins.YQRed;
    }
}

// interface IOutsideButton{
    // visible:boolean;
// }

/**抖音客服 */
class DouyinClientButton extends FuncSmallIcon{
    private douyinBtn:ISdkBaseButton;
    updateLogicVis(v:boolean){
        // console.log("updateLogicVis:",v,this.douyinBtn);
        
        if(this.douyinBtn){
            // this.douyinBtn.destroy();
            // this.douyinBtn = null;
            this.douyinBtn.hide();
        }
        if(v){
            if(this.douyinBtn){
                this.douyinBtn.show();
            }else{
                Laya.timer.frameLoop(1,this,this.checkSkin);
            }
        }
    }

    private checkSkin(){
        if(this.skin.parent){
            Laya.timer.clear(this,this.checkSkin);
            let o = getPosSize(this.skin);
            if(!this.douyinBtn){
                this.douyinBtn = SdkButtonMgr.createClientButton(o);
            }
            this.douyinBtn.show();
        }else{
            // console.log("run..................");
            // LogSys.Warn("RUN checkSkin");
        }
    }

}

export class LeftLieBiao{
    private midIcons:FuncSmallIcon[] = [];
    private midbtnCon:Laya.Sprite = new Laya.Sprite();
    /**按钮上下间隔 */
    private readonly cellGap:number = 90;
    /**邀请按钮 */
    yaoqingBtn:SettingBtn;

    /**朋友圈按钮 */
    // friendBtn:FriendsBtn;
    /**设置按钮 */
    settingBtn:SettingBtn;
    /**邮件按钮 */
    mailBtn:EmailBtn;
    /**客服按钮 */
    // clientBtn:SettingBtn;
    /**分享 */
    btn_daily_share:SettingBtn;
    /**添加桌面 */
    btn_tjzm:SettingBtn;
    /**分享到群*/
    btn_group_share:SettingBtn;
    get visible(){
        return this.con.visible;
    }

    set visible(v:boolean){
        this.con.visible = v;
    }

    private con:Laya.Sprite;
    private model:MainModel;
    private _skinCls;
    private btnList:DrawCallButtonCtl[] = [];
    // private _outSideSkin:IOutsideButton;
    private onResSort(a:Configs.t_MainIcon_dat,b:Configs.t_MainIcon_dat){
        if(a.f_mid_left_pos > b.f_mid_left_pos){
            return -1;
        }
        else if(a.f_mid_left_pos < b.f_mid_left_pos){
            return 1;
        }
        return 0;
    }

    refresh(){
        let _count:number = 0;
        for(let i = 0;i < this.midIcons.length;i++){
            let icon = this.midIcons[i]
            icon.refreshView();
            if(icon.isOpen){
                icon.btnCtl.setpos(_count*this.cellGap,0);
                _count++;
            }
        }
    }

    private setLeftMid(v:boolean){
        this.midbtnCon.visible = v;
        this.updateSdkButton();
    }

    updateSdkButton(){
        let v = this.midbtnCon.visible;
        if(E.ViewMgr.HasFrameOpenExcept([EViewType.Main])){
            v = false;
        } 
        for(let i = 0;i < this.midIcons.length;i++){
            let icon = this.midIcons[i]
            icon.updateLogicVis(v);
        }
    }

    private initMidBtn(){
        let l:Configs.t_MainIcon_dat[] = MainIconProxy.Ins.List;
        let res:Configs.t_MainIcon_dat[] = [];
        for(let i = 0;i < l.length;i++){
            let cfg = l[i];
            if(cfg.f_mid_left_pos){
                res.push(cfg);
            }
        }
        res = res.sort(this.onResSort);
        for(let i = 0;i <res.length;i++){
            let cfg = res[i];
            if(this.model.isOpenAllByFuncid(cfg.f_funid)){
                let _skin = new LeftMidIcon();

                let _cls;
                switch(parseInt(cfg.f_funid)){
                    case EFuncDef.DouYinClient:
                        _cls = DouyinClientButton;
                        break;
                    default:
                        _cls = FuncSmallIcon;
                        break;
                }
                let icon:FuncSmallIcon = new _cls();
                icon.refresh(_skin,parseInt(cfg.f_funid),EButtonStyle.Pos);
                this.midbtnCon.addChild(_skin);
                // _skin.x = i * this.cellGap;
                // icon.refreshView();
                this.midIcons.push(icon);
            }
        }
    }
    init(con:Laya.Sprite,leftCon:Laya.Sprite){
        this.model = MainModel.Ins;
        // if(debug){
        // this.midbtnCon.graphics.drawRect(0,0,300,100,"#ff0000");
        // }
        leftCon.addChildAt(this.midbtnCon,0);
        this.initMidBtn();
        this.con = con;
        let _skinCls = ui.views.main.ui_little_iconUI;
        this._skinCls = _skinCls;

        //外部皮肤
        // let _outSideSkin = new _skinCls();
        // leftCon.addChildAt(_outSideSkin,0);
        // _outSideSkin.x = this.cellGap;

        // this._outSideSkin = _outSideSkin;
        // let outSide:DrawCallButtonCtl;
        // let inSideBtn:DrawCallButtonCtl;
        // let yaoqing = false;//true 邀请在外面
        // if(yaoqing){
        //     this.friendBtn = new FriendsBtn(new _skinCls());
        //     this.yaoqingBtn = new YaoQingBtn(_outSideSkin);
        //     inSideBtn = this.friendBtn;
        //     outSide = this.yaoqingBtn;
        // }else{
        // this.friendBtn = new FriendsBtn(_outSideSkin);
        this.yaoqingBtn = new YaoQingBtn(new _skinCls());
        // inSideBtn = this.yaoqingBtn;
        // outSide = this.friendBtn;
        // }
        this.settingBtn = new SettingBtn(new _skinCls(),"remote/main/main/sz.png",E.getLang("setting"),new Laya.Handler(this,this.onBtnSZClick));
        this.mailBtn = new EmailBtn(new _skinCls());
        // this.clientBtn = new LeftSmallFuncIcon(new _skinCls,EFuncDef.CustomerServer);

        this.btnList.push(
            this.yaoqingBtn,
            this.settingBtn,
            this.mailBtn,
            // this.clientBtn
            );

        
        this.createBottomBtns();

        //////////////////////////////////////////////////////////////
        this.updateBtnPos();
        // this.yaoqingBtn.setpos(this.con.x + this.cellGap, this.con.y - this.cellGap);
        MainModel.Ins.on(MainEvent.UpdateListView,this,this.updateBtnPos);
    }

    private updateBtnPos(){
        let cellGap:number = this.cellGap;
        let firstCount:number = 4;
        let indexpos:number = 0;
        for(let i = 0;i < firstCount;i++){
            let btn:DrawCallButtonCtl = this.btnList[i];
            if(btn && btn.isOpen){
                let x = (indexpos + 1) * cellGap;
                let y =  -1 * cellGap;
                btn.setpos(x,y);
                this.con.addChild(btn.skin);

                if(indexpos == 0){
                    //根据第一个按钮设置外部的按钮坐标
                    // outSide.setpos(x+this.con.x,y + this.con.y);
                    this.midbtnCon.x = x + this.con.x;
                    this.midbtnCon.y = y + this.con.y;
                }
                indexpos++;
            }
        }
        let index:number = 0;
        for(let i = firstCount;i < this.btnList.length;i++){
            let btn:DrawCallButtonCtl = this.btnList[i];
            if(btn && btn.isOpen){
                btn.visible = true;
                btn.setpos(index * cellGap, -2 * cellGap);
                this.con.addChild(btn.skin);
                index++;
            }else{
                btn.visible = false;
            }
        }
    }

    /**创建底部按钮*/
    private createBotLittleBtn(
        url:string,
        name:string,
        // handler:Laya.Handler,
        funcid:EFuncDef
        )
    {
        let btnCtl = new SettingBtn(new this._skinCls(),url,name,new Laya.Handler(this,this.onOpenFunc,[funcid]));
        btnCtl.funcid = funcid;
        btnCtl.redFlag = false;
        this.btnList.push(btnCtl);
        return btnCtl;
    }

    private onOpenFunc(funcid:EFuncDef){
        this.model.openFunc(funcid);
    }

    private createBottomBtns(){
        this.createBotLittleBtn(`remote/main/main/ch_rk.png`,E.getLang("ch01"),EFuncDef.chenghao);//称号
        this.btn_daily_share = this.createBotLittleBtn(`remote/main/main/fx.png`,E.getLang("fx"),EFuncDef.FenXiang );//分享
        // this.btn_tjzm = this.createBotLittleBtn(`remote/main/main/tjzm.png`,E.getLang("tjzm"),EFuncDef.TianJiaZhuoMian);//添加桌面
        this.btn_group_share = this.createBotLittleBtn(`remote/main/main/fxdq.png`,E.getLang("fxdq"),EFuncDef.GroupShare);//分享到群
        // this.createBotLittleBtn(`remote/main/main/gzh.png`,E.getLang("client"),EFuncDef.Client);//客服
    }
    // private onTitleImgClick(){
    //     this.model.openFunc(EFuncDef.chenghao);
    // }
    
    // private onDailyShareClick(){
    //     this.model.openFunc(EFuncDef.FenXiang);
    // }

    // private onTianJiaZhuoMianClick(){
    //     this.model.openFunc(EFuncDef.TianJiaZhuoMian);
    // }

    // private onGroupShareClick() {
    //     this.model.openFunc(EFuncDef.GroupShare);
    // }

    private onBtnSZClick(){
        E.ViewMgr.Open(EViewType.SheZhiView);
    }
    /**
     * @param v true展开按钮列表
     */ 
    set openStatus(v:boolean){
        this.setLeftMid(!v);

        // this.settingBtn.visible = this.clientBtn.visible = this.mailBtn.visible = v;
        for(let i  = 0;i < this.btnList.length;i++){
            let btn = this.btnList[i];
            if(btn.isOpen){
                btn.visible = v;
            }else{
                btn.visible = false;
            }
        }
        if(v){
            this.updateRed();
        }

        // let funcCfg = FuncProxy.Ins.getCfgByFid(EFuncDef.GameCirle);
        // if(MainModel.Ins.isVerify(funcCfg) || FuncProxy.Ins.getClose(funcCfg)){
        //     this._outSideSkin.visible = false;
        // }else{
        //     this._outSideSkin.visible = !v;
        // }
    }

    updateRed(){
        this.refresh();
        this.mailBtn.updateRed();
        if(MainModel.Ins.boxSettingRed){
            this.settingBtn.redFlag =  true;
        }else{
            this.settingBtn.redFlag = false;
        }

        const data = MainModel.Ins.shareReward;
        if(data){
            const arr = [
                { ui: this.btn_daily_share, funcId: EFuncDef.FenXiang },
                { ui: this.btn_group_share, funcId: EFuncDef.GroupShare }
            ];
            // if(initConfig.platform != PlatformConfig.MEITUAN){
                // arr.push({ ui: this.btn_tjzm, funcId: EFuncDef.TianJiaZhuoMian });
            // }else{
                //美团的添加桌面不从后台判断
            // }

            for (const item of arr) {
                const btn = item.ui;
                const funcId = item.funcId;
                const d = data.dataList.find(o => o.funcId === funcId);
                if (d && (d.state !== 3) && MainModel.Ins.isOpenAllByFuncid(btn.funcid+"")) {
                    // 0未激活 1已领取 2可领取 3功能未开启
                    btn.visible = true;

                    if (d.state === 2) {
                        btn.redFlag = true;
                    } else {
                        btn.redFlag = false;
                    }
                } else {
                    btn.visible = false;
                }
            }
        }
    }


}