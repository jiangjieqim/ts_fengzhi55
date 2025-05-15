import {GeometryUtil} from "../../../../../frame/util/GeometryUtil";
import {StringUtil} from "../../../../../frame/util/StringUtil";
import { ui } from "../../../../../ui/layaMaxUI";
import { EMsgBoxType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { JjcFight_revc, stJjcPlayer } from "../../../../network/protocols/BaseProto";
import { FontClipCtl } from "../../avatar/ctl/FontClipCtl";
import { FontCtlFactory } from "../../avatar/ctl/FontCtlFactory";
import { ChengHaoModel } from "../../chenghao/model/ChengHaoModel";
import { EFightResultView } from "../../fight/views/FightJieSuanView";
import { MainModel } from "../../main/model/MainModel";
import { ECellType } from "../../main/vos/ECellType";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { JjcFactory } from "../JjcFactory";

export class JjcHeadCtl{
    private data:stJjcPlayer;
    private icon:Laya.Image;
    private titleIcon:Laya.Image;
    private lvtf:Laya.Label;
    private _plugCtl: FontClipCtl;
    private nametf:Laya.Label;
    private plusCon:Laya.Sprite;
    private mcImg:Laya.Image;
    private mcTf:Laya.Label;
    private img_title:Laya.Image;
    public static readonly maxRank:number = 3;
    private img_xx:Laya.Image;
    private icon_xx:Laya.Image;
    private lab_xx:Laya.Label;

    constructor(skin:ui.views.jjc.ui_jjc_headitemUI,
        plusCon:Laya.Sprite,nametf:Laya.Label,mcImg:Laya.Image,mcTf:Laya.Label,imgTitle:Laya.Image = null,
        img_xx:Laya.Image = null,icon_xx:Laya.Image = null,lab_xx:Laya.Label = null)
    {
        
        this.nametf = nametf;
        this.plusCon = plusCon;
        this.icon = skin.icon;
        this.img_title = imgTitle;
        this.img_xx = img_xx;
        this.icon_xx = icon_xx;
        this.lab_xx = lab_xx;

        let _maskTemp = new Laya.Sprite();
        GeometryUtil.drawRoundRect(_maskTemp.graphics, 0, 0, this.icon.width, this.icon.height,10, "#ff0000");
        this.icon.mask = _maskTemp;

        this.titleIcon = skin.titleIcon;
        this.lvtf = skin.lvtf;
        this.mcImg = mcImg;
        this.mcTf = mcTf;
        if(plusCon){
            this._plugCtl = FontCtlFactory.createPlus();
        }
        skin.on(Laya.Event.CLICK,this,this.onClickHandler);
    }
    
    private onClickHandler(){
        MainModel.Ins.showPlayer(this.data.accountId,this.data.id);
        // E.ViewMgr.Open(EViewType.ShowPlayer,null,JjcModel.Ins.getShowPlayerInfo());
    }

    public updateView(data:stJjcPlayer,type:number = EFightResultView.JJC,data1:JjcFight_revc = null){
        this.data = data;
        this.titleIcon.skin = "";
        this.lvtf.text = IconUtils.str2Lv(data.lv);
        // this.icon.skin = MainModel.Ins.convertHead(data.headUrl);
        MainModel.Ins.setTTHead(this.icon,MainModel.Ins.convertHead(data.headUrl));
        let _rankVal:number = data.rank;
        if(this.img_title){
            this.img_title.skin = ChengHaoModel.Ins.getTitleImg(data.titleId);
        }
        // if(data.plus){
            if(this._plugCtl){
                let v = StringUtil.val2Atlas(data.plus);
                this._plugCtl.setValue(this.plusCon,v);
            }
        // }else{
        // }

        if(this.nametf){
            this.nametf.text = StringUtil.convertName(data.name);
            if(E.Debug && StringUtil.IsNullOrEmpty(data.name)){
                E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk,"name字段值为空 "+JSON.stringify(data));
            }
        }
        if(type == EFightResultView.JJC){
            if (_rankVal <= JjcHeadCtl.maxRank) {
                this.mcTf.text = "";
                this.mcImg.visible = true;
                this.mcImg.skin = JjcFactory.getRankImg(_rankVal);
            }
            else {
                this.mcImg.visible = false;
                this.mcTf.text = _rankVal + "";
            }
        }else if(type == EFightResultView.XXZDZ){
            this.mcTf.text = "";
            this.mcImg.visible = false;
        }

        if(type == EFightResultView.JJC){
            if(this.img_xx){
                this.img_xx.visible = false;
            }
        }else if(type == EFightResultView.XXZDZ){
            this.img_xx.visible = true;
            this.icon_xx.skin = IconUtils.getIconByCfgId(ECellType.XingXing);
            if(data.accountId == MainModel.Ins.mRoleData.AccountId){
                this.lab_xx.text = "+" + data1.upval;
            }else{
                this.lab_xx.text = "-" + data1.downval;
            }
        }
    }
}