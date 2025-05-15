import { CheckBoxCtl } from "../../../../../frame/view/CheckBoxCtl";
import { RowMoveBaseNode } from "../../../../../frame/view/ScrollPanelControl";
import { TriangleScrollPanelControl } from "../../../../../frame/view/TriangleScrollPanelControl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { stNotice } from "../../../../network/protocols/BaseProto";
import { NoticePopTipSelVo } from "../model/MainModel";
const mClsKey:string = "NoticeNodeView";

export class PopNoticeVo{
    dataList:stNotice[];
    noticeSel:NoticePopTipSelVo;
}


class NoticeNodeView extends RowMoveBaseNode{

    protected clsKey:string = mClsKey;
    protected createNode (index){
        let _skin:ui.views.main.ui_notice_itemUI = Laya.Pool.getItemByClass(this.clsKey,ui.views.main.ui_notice_itemUI);
        let vo:stNotice = this.list[index];
        
        // let _typeCfg: Configs.t_Gym_NPC_Type_dat = t_Gym_NPC_Type.Ins.getByType(vo.heroType);
        // this._ui.tf1.text = "类别:" + _typeCfg.f_Typename;
        // _skin.tf1.text = _typeCfg.f_Typename + " :" + vo.count + "/" + vo.maxCount;
        // _skin.tf1.text = this.list[index];
        _skin.titleTf.text = vo.title;
        _skin.descTf.text = vo.content;
        _skin.height = _skin.descTf.y + _skin.descTf.textField.height;
        _skin.y = this.y;
        return _skin;
    }

    public static getHeight(vo:stNotice){
        let _skin:ui.views.main.ui_notice_itemUI = Laya.Pool.getItemByClass(mClsKey,ui.views.main.ui_notice_itemUI);
        _skin.descTf.text = vo.content;
        return _skin.descTf.y + _skin.descTf.textField.height;
    }
}

/**大公告 */
export class NoticePopView extends ViewBase {

    protected mMask:boolean = true;
    private curData:PopNoticeVo;
    private _ui:ui.views.main.ui_pop_noticeUI;
    private _curList:stNotice[] = [];
    private _panelCtl: TriangleScrollPanelControl = new TriangleScrollPanelControl();
    private _ckCtl:CheckBoxCtl;
    protected onAddLoadRes(): void { 
        this.addAtlas("main/main.atlas");
    }
    protected onExit(): void { }
    
    protected onFirstInit(): void { 
        if(!this.UI){
            this.UI = this._ui = new ui.views.main.ui_pop_noticeUI();
            this._panelCtl.init(this._ui.panel1);
            this._panelCtl.setTriangleIcon(this._ui.sanjiao);
            let _ckSkin = this._ui.ckTips;//{bg:this.skin.bg,gou:this.skin.gou,content:this.skin.content} as ICheckBoxSkin;
            this._ckCtl = new CheckBoxCtl(_ckSkin);
            this._ckCtl.selectHander = new Laya.Handler(this,this.onCkSel);
            this._ui.ckTips.content.text = E.getLang("todaytip");
            this.bindClose(this._ui.close1);
        }
    }

    private onCkSel(){
        this.curData.noticeSel.sel = this._ckCtl.selected;
        // LogSys.Log();
    }

    protected onInit(): void {
        this.curData = this.Data;
        this._curList = this.curData.dataList;
        this._panelCtl.clear();
        for(let i = 0;i < this._curList.length;i++){
            let cell = this._curList[i];
            let h = NoticeNodeView.getHeight(cell);
            this._panelCtl.split([cell],NoticeNodeView,h,20);
        }
        this._panelCtl.end();

        if(this.curData.noticeSel){
            this._ckCtl.visible = true;
            this._ckCtl.selected = this.curData.noticeSel.sel;
        }else{
            this._ckCtl.visible = false;
        }
    }
}