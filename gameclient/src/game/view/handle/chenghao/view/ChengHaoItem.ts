import { ui } from "../../../../../ui/layaMaxUI";
import {DotManager} from "../../common/DotManager";
import { ChengHaoModel } from "../model/ChengHaoModel";

export class ChengHaoItem extends ui.views.chenghao.ui_chenghaoItemUI{

    constructor() {
        super();
        this.on(Laya.Event.CLICK,this,this.onClick);
        this.on(Laya.Event.DISPLAY, this, this.onDisplay);
        this.on(Laya.Event.UNDISPLAY, this, this.onUnDisplay);
    }

    private onDisplay(){
        ChengHaoModel.Ins.on(ChengHaoModel.SELECT_CH,this,this.onSelect);
    }

    private onUnDisplay(){
        ChengHaoModel.Ins.off(ChengHaoModel.SELECT_CH,this,this.onSelect);
    }

    private onSelect(){
        if(this._data){
            if(this._data.f_titleid == ChengHaoModel.Ins.selectCh){
                this.img_sel.visible = true;
            }else{
                this.img_sel.visible = false;
            }
        }
    }

    private onClick(){
        if(this._data){
            if(ChengHaoModel.Ins.selectCh != this._data.f_titleid){
                ChengHaoModel.Ins.selectCh = this._data.f_titleid;
                let ind = ChengHaoModel.Ins.newTitleList.findIndex(ele => ele.titleId === this._data.f_titleid);
                if(ind != -1){
                    if(ChengHaoModel.Ins.newTitleList[ind].isSelect == false){
                        ChengHaoModel.Ins.newTitleList[ind].isSelect = true;
                        DotManager.removeDot(this);
                    }
                }
                ChengHaoModel.Ins.event(ChengHaoModel.SELECT_CH);
            }
        }
    }

    private _data:Configs.t_Title_Lists_dat;
    public setData(value:Configs.t_Title_Lists_dat){
        if(!value)return;
        this._data = value;
        if(this._data.f_titleid == ChengHaoModel.Ins.selectCh){
            this.img_sel.visible = true;
        }else{
            this.img_sel.visible = false;
        }
        let index = ChengHaoModel.Ins.titleList.findIndex(ele => ele.titleId == value.f_titleid);
        if(index == -1){
            this.img.gray = this.bg.gray = true;
        }else{
            this.img.gray = this.bg.gray = false;
        }
        this.img.skin = "o/title/" + value.f_titlePic;
        let ind = ChengHaoModel.Ins.newTitleList.findIndex(ele => ele.titleId === value.f_titleid);
        if(ind != -1){
            if(ChengHaoModel.Ins.newTitleList[ind].isSelect == false){
                DotManager.addDot(this);
            }else{
                DotManager.removeDot(this);
            }
        }else{
            DotManager.removeDot(this);
        }
    }
}