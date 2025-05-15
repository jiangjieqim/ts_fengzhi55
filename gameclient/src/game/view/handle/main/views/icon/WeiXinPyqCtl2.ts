import { ui } from "../../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { E, IWeiXin } from "../../../../../G";
import { System_RefreshTimeProxy } from "../../../huodong/model/ActivityProxy";
import { getPosSize, ISizePos } from "../../../sdk/ISdk";
import { SdkButtonMgr } from "../../../sdk/SdkButtonMgr";
import { EFuncDef } from "../../model/EFuncDef";
import { MainEvent } from "../../model/MainEvent";
import { MainModel } from "../../model/MainModel";
import { MainBotIconCtl } from "./MainBotIconCtl";
interface IWxBtn{
    show();
    hide();
}
// interface ISizePos{
//     x,y,w,h;
// }


export class WeiXinNormal2 extends MainBotIconCtl{
    private _skin:ui.views.main.ui_little_iconUI;
    public setSkin(skin:ui.views.main.ui_little_iconUI){
        this._skin = skin;
        this._skin.redimg.visible = false;
        this._skin.bg.skin = `remote/main/main/pyq.png`;
        this._skin.tf.text = E.getLang("pyq01");
        this._skin.on(Laya.Event.CLICK,this,this.onPyq);
        this.onRedUpdate();
    }

    private onPyq(){
        E.ViewMgr.Open(EViewType.GameGroup);
        MainModel.Ins.event(MainEvent.MailRed);
    }
    public onVisible(v:boolean){
        if(v){
            MainModel.Ins.on(MainEvent.FuncSmallIconUpdate,this,this.onRedUpdate);
            this.onRedUpdate();
        }else{
            MainModel.Ins.off(MainEvent.FuncSmallIconUpdate,this,this.onRedUpdate);
        }
    }
    private onRedUpdate(){
        this._skin.redimg.visible = MainModel.Ins.getHasRed(EFuncDef.GameCirle);
    }
}
export class WeiXinNormalStyle2 extends MainBotIconCtl{
    private _skin:Laya.Image;
    private btnCtl:WeiXinPyqCtl2;
    public setSkin(skin:Laya.Image){
        this._skin = skin;
        // this._skin.redimg.visible = false;
        // this._skin.bg.skin = `remote/main/main/pyq.png`;
        // this._skin.tf.text = E.getLang("pyq01");
        this.btnCtl = new WeiXinPyqCtl2();
        this.btnCtl.setSkin(this._skin);
        // this.onRedUpdate();
    }

    public onVisible(v:boolean){
        this.btnCtl.onVisible(v);
        // if(v){
        // MainModel.Ins.on(MainEvent.FuncSmallIconUpdate,this,this.onRedUpdate);
        // }else{
        // MainModel.Ins.off(MainEvent.FuncSmallIconUpdate,this,this.onRedUpdate);
        // }
    }
    // private onRedUpdate(){
    //     this._skin.redimg.visible = MainModel.Ins.getHasRed(EFuncDef.GameCirle);
    // }
}
/**朋友圈按钮控制器 */
export class WeiXinPyqCtl2 extends MainBotIconCtl{
    // private percent:number;
    // private _skin:ui.views.main.ui_little_iconUI;
    private wxbtn:IWxBtn;
    private wx:IWeiXin;
    private _skin:Laya.Sprite;
    public setSkin(skin:Laya.Sprite){
        this._skin = skin;
        // this._skin = skin;
        // this._skin.redimg.visible = false;
        // this._skin.bg.skin = `remote/main/main/pyq.png`;
        // this._skin.tf.text = E.getLang("pyq01");
        this.wx = E.wx;
        if(E.Debug){
            this._skin.graphics.drawRect(0,0,this._skin.width,this._skin.height,null,0xff0000);
        }
        if(!this.wx){
            this._skin.on(Laya.Event.CLICK,this,this.onPyq);
        }
    }
    public onVisible(v:boolean){
        if(v){
            this.onDisplay();
        }else{
            this.onUnDisplay();
        }
    }
    private createWxBtn() {
        if (this.wx) {
            let o = getPosSize(this._skin);
            let openLink = System_RefreshTimeProxy.Ins.getVal(39);
            // let btn = this.wx['createGameClubButton']({
            //     // icon: 'green',
            //     hasRedDot:false,
            //     image: "empty.png",
            //     style: {
            //         left: o.x,
            //         top:  o.y,
            //         width: o.w,
            //         height: o.h,
            //         //backgroundColor:"#ff0000"
            //         // backgroundColor:"",//透明
            //         // color:"#ffffff",
            //     },
            //     openlink: openLink//'L9cxDf_hEiSV_iDnlJhKf0I8k03m0Aa1uJ_sY3lM0TrAffSJCA6-lq3KkSCIqicsSy1RBFeWNmZzthqDTd4k9swJYgyQjfmEB79VpV3vDUbg923pNDC6Ekr6jwvhEURD7'
            // });
            this.wxbtn = SdkButtonMgr.createGameClub(o, openLink);//btn;
        }
    }

    private onDisplay(){
        // console.log("show...");
        let wx = this.wx;
        if(wx){            
            if(!this.wxbtn){
                this.createWxBtn();
            }
            this.wxbtn.show();
        }
    }

    private onUnDisplay(){
        if(this.wxbtn){
            this.wxbtn.hide();
        }
        // console.log("hide...");
    }

    private onPyq(e:Laya.Event){
        if(!this.wx){
            // Laya.Browser.window.location.href = `https://game.weixin.qq.com/cgi-bin/h5/static/appcenter/circle_detail.html?tid=401263260#wechat_redirect`;
            E.ViewMgr.ShowMidError("请切换到微信环境下");
        }
        // console.log("pyq...",e.target);        
        // let p = this._skin.width / Laya.stage.width;//比率
        // console.log(p);
        // let px = Laya.stage.width/pos.x;
        // let px

        // console.log()



        
    }
}