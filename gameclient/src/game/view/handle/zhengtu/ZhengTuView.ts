import { ButtonCtl } from "../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../frame/view/ViewBase";
import { ui } from "../../../../ui/layaMaxUI";
import { E } from "../../../G";
import { GetFuncGuide_req } from "../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../network/SocketMgr";
import { ItemViewFactory } from "../main/model/ItemViewFactory";
import { t_Func_Guide } from "../main/proxy/t_Func_Guide";
import { EZhengTuStatus, ZhengTuModel } from "./ZhengTuModel";
class ZhengTuItemView extends ui.views.zhengtu.ui_zhengtu_item_viewUI{
    private _cfg:Configs.t_Func_Guide_dat;
    private lingquCtl:ButtonCtl;
    private model:ZhengTuModel;
    constructor(){
        super();
        this.model = ZhengTuModel.Ins;
        this.lingquCtl = ButtonCtl.CreateBtn(this.lingqu,this,this.onLingqu);
        this.itemSlot.maskbg.mouseEnabled = false;
    }

    private onLingqu(){
        let req:GetFuncGuide_req = new GetFuncGuide_req();
        req.id = this._cfg.f_id;
        SocketMgr.Ins.SendMessageBin(req);
    }

    public refresh() {
        this._cfg = this.dataSource;
        let vo = this.model.getStatus(this._cfg.f_id);
        let _status = vo.state;
        let itemVo = ItemViewFactory.convertItem(this._cfg.f_rewards);
        ItemViewFactory.refreshSlot(this.itemSlot.slot,itemVo);
        this.itemSlot.maskbg.visible = false;
        this.redImg.visible = false;
        this.task_tf.visible = false;
        switch (_status) {
            case EZhengTuStatus.Not:
                // this.lingquCtl.grayMouseDisable = true;
                // this.tf1.text = E.getLang("LingQu");
                this.lingquCtl.visible = false;
                this.task_tf.visible = true;
                this.task_tf.text = E.getLang("zhengtu01",vo.intervalTask);
                break;
            case EZhengTuStatus.KeLingQu:
                this.lingquCtl.visible = true;
                this.lingquCtl.grayMouseDisable = false;
                this.tf1.text = E.getLang("LingQu");
                this.redImg.visible = true;
                break;
            case EZhengTuStatus.YiLingQu:
                this.lingquCtl.visible = true;
                this.lingquCtl.grayMouseDisable = true;
                this.tf1.text = E.getLang("LingQu2");
                this.itemSlot.maskbg.visible = true;
                break;
        }
        this.nameTf.text = t_Func_Guide.Ins.f_funcname(this._cfg);
        this.descTf.text = t_Func_Guide.Ins.f_funcdes(this._cfg);
        // o/zhengtu/7.png
        this.icon.skin =  `o/zhengtu/${t_Func_Guide.Ins.f_icon(this._cfg)}.png`;

    }
}
export class ZhengTuView extends ViewBase {
    protected autoFree:boolean = true;
    private _ui:ui.views.zhengtu.ui_zhengtu_viewUI;
    private model:ZhengTuModel;
    protected onAddLoadRes(): void { 
        this.addAtlas("zhengtu.atlas");
    }
    protected onExit(): void { }
    protected onFirstInit(): void { 
        if(!this.UI){
            this.model = ZhengTuModel.Ins;
            this.UI = this._ui = new ui.views.zhengtu.ui_zhengtu_viewUI();
            this.mMask = true;
            this.bindClose(this._ui.close1);
            this._ui.list1.itemRender = ZhengTuItemView;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onItemRender);
        }
    }
    private onItemRender(item:ZhengTuItemView){
        item.refresh();
    }

    protected onInit(): void { 
        this.model.on(ZhengTuModel.EVENT_UPDATE,this,this.onRefreshHandler);
        this._ui.list1.array = this.model.cfgList;
        this._ui.list1.scrollTo(0);
    }

    private onRefreshHandler(){
        this._ui.list1.refresh();
    }
}