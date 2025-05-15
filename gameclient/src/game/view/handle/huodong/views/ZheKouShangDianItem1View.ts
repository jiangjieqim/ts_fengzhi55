import { ui } from "../../../../../ui/layaMaxUI";
import { stActivityCell } from "../../../../network/protocols/BaseProto";
import { ZheKouShangDianCtl } from "../model/ZheKouShangDianCtl";

export class ZheKouShangDianItem1View extends ui.views.huodong.ui_zhekoushangdian_item1UI {
    private ctls: ZheKouShangDianCtl[] = [];
    constructor(){
        super();
        this.ctls = new Array(3).fill(0).map((o, i) => new ZheKouShangDianCtl(this[`item${i}`]));
    }

    public setData(datas: stActivityCell[]){
        for (let i = 0; i < 3; i++) {
            const skinKey = `item${i}`;
            if (datas[i]) {
                const ctl: ZheKouShangDianCtl = this.ctls[i];
                ctl.setData(datas[i]);
            } else {
                this[skinKey].visible = false;
            }
        }
    }
}