import { ButtonCtl } from "../../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../../frame/view/ViewBase";
import { ui } from "../../../../../../ui/layaMaxUI";
import { E } from "../../../../../G";
import { SideBarReward_req } from "../../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../../network/SocketMgr";
import { System_RefreshTimeProxy } from "../../../huodong/model/ActivityProxy";
import { SubscribeModel, SubscribeID } from "../../../sdk/douyin/SubscribeModel";
import { ItemViewFactory } from "../../model/ItemViewFactory";
import { MainModel } from "../../model/MainModel";
import { SoltItemView3 } from "../icon/SoltItemView";
/**抖音侧边栏 */
export class DouyinSiderView extends ViewBase{
    protected mMask:boolean = true;
    protected autoFree:boolean = true;
    private _ui:ui.views.main.ui_cebianlangUI;
    private enterCbBtnCtl:ButtonCtl;
    private lingqubtnCtl:ButtonCtl;

    protected onAddLoadRes(): void {
        // throw new Error("Method not implemented.");
    }
    protected onExit(): void {
        // throw new Error("Method not implemented.");
        this.enterCbBtnCtl.dispose();
        this.lingqubtnCtl.dispose();
    }
    protected onFirstInit(): void {
        // throw new Error("Method not implemented.");
        if(!this.UI){
            this.UI = this._ui = new ui.views.main.ui_cebianlangUI();
            this.bindClose(this._ui.btn_close);

            // let arr = str.split("|");
            // let itemVo = ItemViewFactory.convertItem(arr[0]);
            // this._ui.moneyTf.text = itemVo.count + "";
            // this._ui.mineyIcon.skin = itemVo.getIcon();

            this.enterCbBtnCtl = ButtonCtl.CreateBtn(this._ui.enterCbBtn,this,this.onEnterHandler);
            this.lingqubtnCtl = ButtonCtl.CreateBtn(this._ui.lingqubtn,this,this.onLingQuHandler);

            this.enterCbBtnCtl.visible = false;
            this.lingqubtnCtl.visible = false;

            /*
            this._ui.gamenameTf.text = E.getLang("douyinname");
            this._ui.icon1.skin = `static/gameloog.png`;
            */
            //奖励内容
            let str:string = System_RefreshTimeProxy.Ins.getVal(82);
            ItemViewFactory.renderItemSlots(this._ui.rewardCon,str,50,1,"center",SoltItemView3,"SoltItemView3");
        }
    }

    /**进入侧边栏 */
    private onEnterHandler(){
        SubscribeModel.Ins.mouseupSaveID(SubscribeID.SIDER_POS);
    }

    private onLingQuHandler(){
        let req = new SideBarReward_req();
        SocketMgr.Ins.SendMessageBin(req);
        this.Close();
    }

    protected onInit(): void {
        // throw new Error("Method not implemented.");
        if(MainModel.Ins.canBarStatusLingQu && E.sdk.isFromSidebarCard){
            this.lingqubtnCtl.visible = true;
        }else{
            this.enterCbBtnCtl.visible = true;
        }

    }
    
}