import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { MainEvent } from "../model/MainEvent";
import { MainModel } from "../model/MainModel";
import { ChestAnimSpine } from "./ChestAnimSpine";

export class AnimSetting{
    curAnim:ChestAnimSpine;
    imgurl:string;
    spineurl:string;
    bgURL:string;
    index:number;
    public get desc():string{
        let arr = E.getLang("boxdesc").split("|");
        return arr[this.index];
    }
    constructor(imgurl:string,spineurl:string,bg:string,index:number){
        this.imgurl = imgurl;//`remote/shezhi/${imgurl}`;
        this.spineurl = spineurl;
        this.bgURL = bg;//`remote/main/main/${bg}`;
        this.index = index
    }
}

class LRCtl{
    private _ui:ui.views.shezhi.ui_openboxUI;

    public index:number;
    private leftBtnCtl:ButtonCtl;
    private rightBtnCtl:ButtonCtl;
    private model:MainModel;
    private nametf:Laya.Label;

    bg:Laya.Image;
    leftCtl:ButtonCtl;
    rightCtl:ButtonCtl;
    okCtl:ButtonCtl;
    tf:Laya.Label;
    constructor(left1:Laya.Image,right1:Laya.Image,okBtn:Laya.Image,tf:Laya.Label,nametf:Laya.Label,ui:ui.views.shezhi.ui_openboxUI){
        this.model = MainModel.Ins;
        this._ui = ui;
        this.nametf = nametf;
        this.tf = tf;
        this.leftBtnCtl = ButtonCtl.CreateBtn(left1,this,this.onLeftHandler);
        this.rightBtnCtl = ButtonCtl.CreateBtn(right1,this,this.onRightHandler);
        this.okCtl = ButtonCtl.CreateBtn(okBtn,this,this.onOkHandler);
    }

    private refreshArrow(){
        // this.model.isClickAnimIndex = this.index;
        // RedUpdateModel.Ins.save(RedEnum.ANIM_SET,this.model.DEFAULT_ANIM_INDEX);
        this.updateEvt();
    }

    private updateEvt(){
        this.model.event(MainEvent.UPDATE_NEW_PLAYER);
        this.model.event(MainEvent.SWITCH_ANIM);
        this.model.event(MainEvent.MailRed);
    }

    private onOkHandler(){
        this.refreshArrow();
        // RedUpdateModel.Ins.save(RedEnum.ANIM_SET,this.index);
        this.model.animIndex = this.index;
        this.updateEvt();
        E.ViewMgr.Close(EViewType.BoxAnimSet);
        E.ViewMgr.Close(EViewType.SheZhiView);
    }

    private clear(){
        this.model.isNewRole = false;
        this.model.event(MainEvent.UPDATE_NEW_PLAYER);
    }

    private onLeftHandler(){
        if(this.index>0){
            // this.model.animIndex--;
            this.index--;
        }else{
            this.index = this.model.animSettingList.length-1;
        }
        this.refresh();
        this.clear();
        this.refreshArrow();
    }

    private onRightHandler(){
        if(this.index<this.model.animSettingList.length-1){
            // this.model.animIndex++;
            this.index++;
        }else{
            this.index = 0;
        }
        this.refresh();
        this.refreshArrow();
    }

    private refresh(){
        this.updateView();
    }

    public updateView(){
        // this.leftBtnCtl.visible = false;
        // this.rightBtnCtl.visible = false;
        let index = this.index;
        if(index == 0){
            // this.rightBtnCtl.visible = true;
        }else if(index == this.model.animSettingList.length - 1){
            // this.leftBtnCtl.visible = true;
        }else{
            // this.leftBtnCtl.visible = true;
            // this.rightBtnCtl.visible = true;
        }
        let vo = this.model.animSettingList[index];
        this.bg.skin = `${vo.imgurl}`;
        if(this.model.animIndex == index){
            // this.okCtl.visible = false;
            // this.tf.visible = true;
            this.okCtl.grayMouseDisable = true;

            this.tf.text = E.getLang("selected");
        }else{
            // this.okCtl.visible = true;
            // this.tf.visible = false;
            this.okCtl.grayMouseDisable = false;
            
            this.tf.text = E.getLang("ok");
        }
        this.nametf.text = vo.desc;
    
        ///////////////////////////////////////////
        this._ui.l_red.visible = false;
        this._ui.redImg1.visible = false;

        let _hasRed:boolean = false;
        if (this.model.boxSettingRed) {
            if (this.index == this.model.DEFAULT_ANIM_INDEX && MainModel.Ins.isKotoWBuy) {
                _hasRed = true;
                // this._ui.redImg1.visible = false;
            }else{
                // this._ui.redImg1.visible = true;
            }
        } else {
            // this._ui.redImg1.visible = false;
        }


        if(_hasRed){
            // this._ui.l_red.visible = true;
            //修改一下主题的逻辑，如果买量不是磕头的，主题的红点就不用出现
            this._ui.r_red.visible = true;
        }else{
            this._ui.r_red.visible = false;
        }
    }
}

export class BoxSetAnimView extends ViewBase {
    private lr:LRCtl;
    private model:MainModel;
    private _ui:ui.views.shezhi.ui_openboxUI;
    protected mMask:boolean = true;
   
    protected onAddLoadRes(): void { }
    protected onExit(): void { }
    protected onFirstInit(): void { 
        if(!this.UI){
            this.model = MainModel.Ins;
            this.UI = this._ui = new ui.views.shezhi.ui_openboxUI();
            this.bindClose(this._ui.close1);
            this.lr = new LRCtl(this._ui.rightbtn,this._ui.leftbtn,this._ui.okbtn,this._ui.tf,this._ui.nametf,this._ui);
            this.lr.bg = this._ui.bg1;
        }
    }

    protected onInit(): void {
        this.lr.index = this.model.animIndex;
        this.lr.updateView();
    }
}