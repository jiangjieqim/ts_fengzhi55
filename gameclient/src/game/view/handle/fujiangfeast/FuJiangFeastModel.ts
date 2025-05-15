import { EFeastType } from "../gemfeast/EFeastType";
import { GemFeastModel } from "../gemfeast/GemFeastModel";
import { EFuncDef } from "../main/model/EFuncDef";
/**副将盛宴 */
export class FuJiangFeastModel extends GemFeastModel {
    // public titleStr: string = "gjtitle01";
    // public bg4Img: string = "remote/fujiangfeast/fjlb.png";

    public packageTitleStr: string = "gttitle02";
    public rankTitleStr: string = "gttitle03";
    public funcType: EFuncDef = EFuncDef.FuJiangFeast;
    public subType: number = EFeastType.FuJiang;
    public rankBotStr:string = "gtrank_desc";
    public rank_desc:string = "gtrank_title|gtrank_read";
    protected initUI(){
        // this.Reg(new FuJiangFeastMianView(EViewType.FuJiangFeast));
    }
    //////////////////////////////////////////////////////////////////////////////////
    private static _ins2: FuJiangFeastModel;
    public static get Ins() {
        if (!this._ins2) {
            
            this._ins2 = new FuJiangFeastModel();
        }
        return this._ins2;
    }
}