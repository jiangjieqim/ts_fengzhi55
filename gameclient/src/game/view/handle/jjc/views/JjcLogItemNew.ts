import { GeometryUtil } from "../../../../../frame/util/GeometryUtil";
import { StringUtil } from "../../../../../frame/util/StringUtil";
import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { stJjcLog } from "../../../../network/protocols/BaseProto";
import { FontClipCtl } from "../../avatar/ctl/FontClipCtl";
import { FontCtlFactory } from "../../avatar/ctl/FontCtlFactory";
import { EServerVersion, MainModel } from "../../main/model/MainModel";
import { EJjcType, IJJC_Model } from "../../peakjjc/model/IJjcInterface";
/**竞技场积分 */
export class JjcLogItemNew extends ui.views.jjc.ui_jjc_log_new_item_viewUI{
    private _vo:stJjcLog;
    private _plugCtl: FontClipCtl;
    constructor(){
        super();
        this._plugCtl = FontCtlFactory.createPlus();

        let _maskTemp = new Laya.Sprite();
        GeometryUtil.drawRoundRect(_maskTemp.graphics, 0, 0, this.head.icon.width, this.head.icon.height,10, "#ff0000");
        this.head.icon.mask = _maskTemp;        
    }
    public refresh(model:IJJC_Model){
        this._vo = this.dataSource;
        let _vo = this._vo;
        this.nametf.text = this._vo.playerName;

        let rankStr:string = E.getLang("JjcRank");
        this.jifen.visible = false;
        if(model.getType() == EJjcType.JJC && MainModel.Ins.serverVer == EServerVersion.Version_1){
            this.jifen.visible = true;
            rankStr = "";
        }

        // 是否发起者 1 是 0 否
        let isWin: boolean = _vo.win == 1;
        if (_vo.atk) {
            if (_vo.changeVal <= 0) {

            } else {

            }
        }else{

            if (_vo.changeVal > 0) {

            } else {

            }
        }

        this.time1.text = TimeUtil.timesMonthDay(_vo.time);

        this.setWin(isWin);
       
        this._plugCtl.setValue(this.plusCon, StringUtil.val2Atlas(_vo.plus));

        let _color: string = "#22A01C";
        if (isWin) {
            rankStr += "+" + _vo.changeVal;
        } else {
            rankStr += "-" + Math.abs(_vo.changeVal);
            _color = "#E73A38";
        }
        this.paiming.text = rankStr;
        this.paiming.color = _color;

        this.head.titleIcon.visible = false;
        this.head.lvtf.visible = false;
        MainModel.Ins.setTTHead(this.head.icon,MainModel.Ins.convertHead(_vo.headUrl));
    }

    private setWin(v:boolean){
        this.succeed2.visible = this.succeed1.visible = false;
        this.lose1.visible = this.lose2.visible = false;
        if(v){
            this.succeed2.visible = this.succeed1.visible = true;    
        }else{
            this.lose1.visible = this.lose2.visible = true;
        }
    }
}