import { GeometryUtil } from "../../../../../frame/util/GeometryUtil";
import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { JjcFight_revc, stJjcPlayer } from "../../../../network/protocols/BaseProto";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainModel } from "../../main/model/MainModel";
import { getJjcModel, IJJC_Model } from "../../peakjjc/model/IJjcInterface";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { IFightResult } from "../vos/FightVo";
import { SucceedPlay } from "./SucceedPlay";

interface IScoreItemSkin{
    icon: Laya.Image;
    bg1: Laya.Image;
    lvtf: Laya.Label;
    nameTf: Laya.Label;
    score_tf1: Laya.Label;
    score_tf2:Laya.Label;
}

class ScoreHeadCtl{
    private skin:IScoreItemSkin;
    constructor(skin:IScoreItemSkin){
        this.skin = skin;
        let _maskTemp = new Laya.Sprite();
        GeometryUtil.drawRoundRect(_maskTemp.graphics, 0, 0, this.skin.icon.width, this.skin.icon.height,10, "#ff0000");
        this.skin.icon.mask = _maskTemp;
    }

    public setData(data:stJjcPlayer) { 
        MainModel.Ins.setTTHead(this.skin.icon, MainModel.Ins.convertHead(data.headUrl));
        this.skin.nameTf.text = StringUtil.convertName(data.name);
        this.skin.lvtf.text = IconUtils.str2Lv(data.lv);
        this.skin.score_tf1.text = data.score + "";
    }

    public setVal(str:string){
        
        if(str.substr(0,1)=="+"){
            this.skin.score_tf2.color = "#65C923";
        }else{
            this.skin.score_tf2.color = "#E73C3A";
        }
        this.skin.score_tf2.text = "(" + str + ")";
        this.skin.score_tf2.x = this.skin.score_tf1.x + this.skin.score_tf1.textField.textWidth;
    }
}

/**积分竞技场结算面板 */
export class ScoreJjcJieSuanView extends ViewBase {
    private model: IJJC_Model;
    private succeed:SucceedPlay;

    private _ui: ui.views.jjc.ui_score_jjc_succeedUI;
    private _itemCtl0: ScoreHeadCtl;
    private _itemCtl1: ScoreHeadCtl;
    protected onAddLoadRes(): void {
        this.addAtlas("jjc.atlas")
    }
    protected onExit(): void { }
    protected onFirstInit(): void {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.jjc.ui_score_jjc_succeedUI();
            this.UI.on(Laya.Event.CLICK,this,this.onClickAllHandler);

            this.mMask = true;
            this._itemCtl0 = new ScoreHeadCtl(this._ui.item0);
            this._itemCtl1 = new ScoreHeadCtl(this._ui.item1);
            this.succeed = new SucceedPlay(this._ui.effectCon);
        }
    }
    protected onInit(): void {
        let _data:IFightResult = this.Data;
        let serverData:JjcFight_revc = _data.extData;
        
        this.model = getJjcModel(serverData.type);

        if(serverData.win  == 0){
            //失败
            this._ui.succeed.visible = false;
            this._ui.fail.visible = true;
            this.succeed.visible = false;
            this.succeed.stop();

            this._itemCtl0.setData(this.model.ownerPlayer);
            this._itemCtl1.setData(serverData.enemyInfo);
            // self - upval
            // +0
            this._itemCtl0.setVal("-"+serverData.upval);
            this._itemCtl1.setVal("+"+serverData.upval);
        }
        else{
            //成功
            this._ui.fail.visible = false;
            this._ui.succeed.visible = true;
            this.succeed.visible = true;
            this.succeed.start();

            this._itemCtl0.setData(this.model.ownerPlayer);
            this._itemCtl1.setData(serverData.enemyInfo);
            if(_data.fightVo.rewardList.length > 0){
                this._ui.harmtitle.visible = true;
            }else{
                this._ui.harmtitle.visible = false;
            }
            ItemViewFactory.renderItemSlots(this._ui.rewardcontainer,this.model.succeedRewardList);

            // self + upval
            // -0
            this._itemCtl0.setVal("+"+serverData.upval);
            this._itemCtl1.setVal("-"+serverData.upval);

        }
    }

    private onClickAllHandler(){
        this.succeed.stop();
        MainModel.Ins.jiesuanEnd(this.Data);
        this.Close();
    }

    protected onMaskClose(){
        this.onClickAllHandler();
    }
}