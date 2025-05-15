import { ui } from "../../../../../ui/layaMaxUI";
import { stJjcPlayer } from "../../../../network/protocols/BaseProto";
import { JjcHeadCtl } from "./JjcHeadCtl";

export class JjcOtherItemView extends ui.views.jjc.ui_jjc_other_item1UI {
    private _data: stJjcPlayer;
    private _headCtl: JjcHeadCtl;
    constructor() {
        super();
        this._headCtl = new JjcHeadCtl(this.head,this.plusCon,this.nametf,this.paiming,this.mingcitf,this.img_title);
    }
    /**
     * @param data 
     * @param hasScore 是否显示积分
     */
    public setData(data: stJjcPlayer,hasScore:boolean) {
        this._data = data;
        this._headCtl.updateView(data);
        this.plug_spr.visible = data.plus > 0;
        if (data.rank > 3) {
            this.paimngBg.skin = `remote/jjc/paimingkuang.png`;//remote/jjc/paimingkuang.png
        } else {
            this.paimngBg.skin = `remote/jjc/paiming_${data.rank}_kuang.png`;
        }
        // this.parCon.scaleX = this.parCon.scaleY = data.rank  == 1 ? 1.05 : 1.0; 

        // if(data.rank == 1){
            // this.parCon.x = this.parCon.y = 0;
            // this.parCon.scaleX = this.parCon.scaleY = 1;//.05;
        // }else{
            // this.parCon.x = this.parCon.y = 14;
            // this.parCon.scaleX = this.parCon.scaleY = 1;
        // }
        if(hasScore){
            this.jifenImg.visible = true;
            this.jftf.visible = true;
            this.jftf.text = data.score + "";
        }else{
            this.jifenImg.visible = false;
            this.jftf.visible = false;
        }
    }
}