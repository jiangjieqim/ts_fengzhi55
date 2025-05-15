/* @Author: tsy
 * @Date: 2023-03-01 10:34:02
 * @Last Modified by: tsy
 * @Last Modified time: 2023-04-04 14:23:34
*/
import { TimeUtil } from "../../../../../../frame/util/TimeUtil";
import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ui } from "../../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import { E } from "../../../../../G";
import { HandleStationRevenge_req, stStationHandleLog } from "../../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../../network/SocketMgr";
import { IconUtils } from "../../../zuoqi/vos/IconUtils";
import { PaoShangView } from "../PaoShangView";

export class PaoShangRiZhiItem extends ui.views.paoshang.ui_rizhiItemUI{
    constructor() {
        super();
        ButtonCtl.Create(this.btn,new Laya.Handler(this,this.onClick));
    }

    private onClick(){
        if(this._data){
            let req:HandleStationRevenge_req = new HandleStationRevenge_req();
            req.logId = this._data.logId;
            SocketMgr.Ins.SendMessageBin(req);
            let view:PaoShangView = E.ViewMgr.Get(EViewType.PAOSHANG) as PaoShangView;
            if(view ){
                view.setList();
            }
            E.ViewMgr.Close(EViewType.PAOSHANGRIZHI);
        }
    }

    private _data:stStationHandleLog;
    public setData(value:stStationHandleLog){
        if(!value)return;
        this._data = value;
        this.icon.skin = value.headUrl;
        let color;
        if(value.isWho == 1){//玩家向对方破坏、掠夺  2对方向玩家破坏、掠夺
            this.txt1.text = "你从";
            this.txt2.text = value.nickName + "的商队";
            color = "#22A01C";
            this.btn.visible = false;
        }else{
            this.txt1.text = value.nickName + "从";
            this.txt2.text = "你的商队";
            color = "#E83232";
            this.btn.visible = true;
        }
        if(value.flag == 1){//1破坏 2掠夺
            this.txt3.text = "破坏了"
            this.txt4.x = this.txt3.x + this.txt3.width + 2;
            this.txt4.text = "你的马车";
            this.txt4.color = color;
        }else{
            this.txt3.text = "掠夺了"
            this.txt4.x = this.txt3.x + this.txt3.width + 2;
            this.txt4.text = "[" + value.rewards[0].count + "个" + IconUtils.getNameByID(value.rewards[0].id) + "]";
            this.txt4.color = color;
        }
        this.txt_time.text = TimeUtil.getTimeShow(TimeUtil.serverTime - value.logUnix) + "前";
    }
}