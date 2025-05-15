import { ui } from "../../../../../../ui/layaMaxUI";
import { PaoShangTaskItemCtl } from "./PaoShangTaskItemCtl";

/* @Author: tsy
 * @Date: 2023-02-28 11:50:46
 * @Last Modified by: tsy
 * @Last Modified time: 2023-02-28 11:58:32
*/
export class PaoShangTaskItem extends ui.views.paoshang.ui_paoshangTaskItemUI{
    public ctl:PaoShangTaskItemCtl;
    constructor(){
        super();
        this.ctl = new PaoShangTaskItemCtl(this);
    }
}