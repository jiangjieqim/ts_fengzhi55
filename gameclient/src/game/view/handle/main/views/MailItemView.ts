import {TimeUtil} from "../../../../../frame/util/TimeUtil";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { stMail } from "../../../../network/protocols/BaseProto";
import { EMailStatus } from "../model/MainModel";

export class MailItemView extends ui.views.mail.mallitemUI{
    private _data:stMail;
    constructor(){
        super();
        this.on(Laya.Event.CLICK,this,this.onClickHander);
    }

    private onClickHander(){
        E.ViewMgr.Open(EViewType.MailShow,null,this._data);
    }
    private clearUI(){
        this.newIcon.visible = false;
        this.lingquTf.visible = false;
        this.readIconed = false;
    }

    public refresh(){
        this.clearUI();
        this._data = this.dataSource;
        switch(this._data.state){
            case EMailStatus.notRead:
                this.newIcon.visible = true;
                break;
            case EMailStatus.isReaded:
                this.readIconed = true;
                break;
            case EMailStatus.isLingqued:
                this.readIconed = true;
                this.lingquTf.visible = true;
                break;
        }
        this.tf1.text = this._data.title;
        this.timetf.text = TimeUtil.timestamtoTime(this._data.time * 1000,"/");
    }

    /**
     * 设置已读状态
     */
    private set readIconed(v:boolean){
        if(v){
            this.statusIcon.skin = `remote/mail/youjian.png`;
        }else{
            this.statusIcon.skin = `remote/mail/youjian1.png`;
        }
    }
}