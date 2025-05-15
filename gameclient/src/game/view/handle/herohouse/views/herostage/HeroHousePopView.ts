import { ui } from "../../../../../../ui/layaMaxUI";

export class HeroHousePopView extends ui.views.hero_house.ui_hero_house_pop_viewUI {
    constructor() {
        super();
    }
    //我师傅是常山赵子龙
    public set desc(v: string) {
        this.qipaoTf.text = v;
        let w = this.qipaoTf.textField.textWidth;
        if (w < this.width) {
            w = this.width;
        }
        this.qipao.width = w;
        let h = this.qipaoTf.textField.textHeight;
        // if (h < this.height) {
        // h = this.height;
        // }else{
        // h += 20;
        // }
        h+=20;
        if (h < this.height) {
            h = this.height;
        }
        this.qipao.height = h;
    }
}