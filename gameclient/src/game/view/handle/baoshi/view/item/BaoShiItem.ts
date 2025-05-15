/* @Author: tsy
 * @Date: 2023-02-20 11:52:33
 * @Last Modified by: tsy
 * @Last Modified time: 2023-02-21 19:49:51
*/

import { ui } from "../../../../../../ui/layaMaxUI";
import { BaoShiItemCtl } from "../ctl/BaoShiItemCtl";

/**
 * 宝石格子
 */
export class BaoShiItem extends  ui.views.baoshi.ui_baoshiItemUI{
    public ctl:BaoShiItemCtl;
    constructor(){
        super();
        this.ctl = new BaoShiItemCtl(this);
    }
}