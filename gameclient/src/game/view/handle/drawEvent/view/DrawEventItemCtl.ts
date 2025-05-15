import { ui } from "../../../../../ui/layaMaxUI";
import { stDrawEventRewardInfo } from "../../../../network/protocols/BaseProto";
import { SimpleEffect } from "../../avatar/SimpleEffect";
import { MainModel } from "../../main/model/MainModel";
import { ItemVo } from "../../main/vos/ItemVo";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { DrawEventModel } from "../model/DrawEventModel";

export class DrawEventItemCtl{
    protected _ui:ui.views.drawEvent.ui_DrawEventItemUI;
    private _eff:SimpleEffect;
    private _eff1:SimpleEffect;

    constructor(skin:ui.views.drawEvent.ui_DrawEventItemUI) {
        this._ui = skin;
        this._ui.gou.mouseEnabled = false;
        this._ui.on(Laya.Event.DISPLAY,this,this.onAdd);
        this._ui.on(Laya.Event.UNDISPLAY,this,this.onRemove);
    }
    
    private onAdd(){
        DrawEventModel.Ins.on(DrawEventModel.PLAY_EFF,this,this.onPlay);
        this._ui.icon.on(Laya.Event.CLICK,this,this.onClick);
        this._eff = new SimpleEffect(this._ui.sp, `o/spine/uidenlong/uidenlong`);
        this._eff.play(0,true);
    }
    
    private onRemove(){
        DrawEventModel.Ins.off(DrawEventModel.PLAY_EFF,this,this.onPlay);
        this._ui.icon.off(Laya.Event.CLICK,this,this.onClick);
        if(this._eff)this._eff.dispose();
        if(this._eff1)this._eff1.dispose();
    }

    private onPlay(){
        if(!this._eff1){
            this._eff1 = new SimpleEffect(this._ui.sp1, `o/spine/uidenlonglight/uidenlonglight`);
        }
        this._eff1.play(0,false,this,this.onEndEff);
    }

    private onEndEff(){
        DrawEventModel.Ins.event(DrawEventModel.END_EFF);
    }

    private onClick(e:Laya.Event){
        if(this._data){
            e.stopPropagation();
            let itemVo:ItemVo = new ItemVo();
            itemVo.cfgId = parseInt(this._data.f_Rewards.split("-")[0]);
            itemVo.count = parseInt(this._data.f_Rewards.split("-")[1]);
            MainModel.Ins.showSmallTips(itemVo.getName(), itemVo.getDesc(), this._ui.icon);
        }
    }

    private _data:Configs.t_DrawEvent_Rewards_dat;
    public setData(value:Configs.t_DrawEvent_Rewards_dat,flag:boolean = true,flag1:boolean = true){
        if(!value)return;
        this._data = value;
        this._ui.sp1.visible = flag;
        let st = value.f_Rewards;
        let id = parseInt(st.split("-")[0]);
        let count = parseInt(st.split("-")[1]);
        this._ui.icon.skin = IconUtils.getIconByCfgId(id);
        this._ui.lab.text = count + "";
        if(value.f_RewardsType == 3){
            let data:stDrawEventRewardInfo = DrawEventModel.Ins.rewardList.find(ele => ele.fid == value.f_id);
            if(data.state == 2){
                if(!flag1){
                    this._ui.gou.visible = false;
                }else{
                    this._ui.gou.visible = true;
                }
            }else{
                this._ui.gou.visible = false;
            }
        }else{
            this._ui.gou.visible = false;
        }
    }
}