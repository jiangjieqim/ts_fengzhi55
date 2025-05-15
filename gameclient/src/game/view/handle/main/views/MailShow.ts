import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { RowMoveBaseNode, ScrollPanelControl } from "../../../../../frame/view/ScrollPanelControl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { MailList_req, stCellValue, stMail } from "../../../../network/protocols/BaseProto";
import {SocketMgr} from "../../../../network/SocketMgr";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { EMailReqType, EMailStatus, MainModel } from "../model/MainModel";
import { ItemProxy } from "../proxy/ItemProxy";
import { ItemVo } from "../vos/ItemVo";

class MailSlotItem{
    private itemVo:ItemVo;
    public skin:ui.views.mail.mail_slot_itemUI;
    constructor(skin:ui.views.mail.mail_slot_itemUI){
        this.skin = skin;
        this.skin.on(Laya.Event.CLICK,this,this.onSlotClickHandler);
    }
    private onSlotClickHandler(e:Laya.Event) {
        let _vo:ItemVo = this.itemVo;
        if(_vo.cfg){
            e.stopPropagation();
            MainModel.Ins.showSmallTips(_vo.getName(), _vo.getDesc(), this.skin);
        }
    }

    public refresh(item:stCellValue,isLingqu:boolean){
        if(item){
            this.itemVo = new ItemVo();
            this.itemVo.cfgId = item.id;
            this.itemVo.count = item.count;
            this.skin.visible = true;
            this.skin.yilingquStatus.visible = isLingqu;
            let cfg = ItemProxy.Ins.getCfg(item.id);
            if (cfg) {
                let qua = cfg.f_qua;
                this.skin.quality.skin = IconUtils.getQuaIcon(qua);
            } else {
                this.skin.quality.skin = "";
            }
            this.skin.icon.skin = IconUtils.getIconByCfgId(item.id);//IconUtils.getIcon(item.id);
            this.skin.tf1.text = item.count + "";//"×" + 
        } else {
            this.skin.visible = false;
        }
    }
}
let descClsKey:string = "DescTfNode";
class DescTfNode extends RowMoveBaseNode{
    protected clsKey:string = descClsKey;
    protected createNode (index){
        let _skin: ui.views.mail.mail_tf_contentUI = Laya.Pool.getItemByClass(this.clsKey, ui.views.mail.mail_tf_contentUI);
        let _data = this.list[index];
        _skin.descTf.text = _data;
        _skin.height = _skin.descTf.textField.textHeight;
        _skin.x= 0 ;
        _skin.y = this.y;
        return _skin;
    }
}
export class MailShow extends ViewBase {

    protected onAddLoadRes(): void { }
    protected onExit(): void {

    }
    protected mMask:boolean = true;
    private slotList: MailSlotItem[] = [];
    private gap:number;
    private _data: stMail;
    private _ui: ui.views.mail.mailshowUI;
    private linqubtnCtl:ButtonCtl;
    private delbtnCtl:ButtonCtl;
    private scrollView:ScrollPanelControl;
    protected autoFree:boolean = true;;
    protected onFirstInit(): void {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.mail.mailshowUI();
            this.slotList = [];
            for(let i = 0;i < 4;i++){
                this.slotList.push(new MailSlotItem(this._ui['item'+i]));
            }
            this.setMouseBg(this._ui.bg1);
            this.bindClose(this._ui.close1);
            this.gap = this._ui.item1.x-this._ui.item0.x - this._ui.item1.width;
            this.linqubtnCtl = new ButtonCtl(this._ui.linqubtn,new Laya.Handler(this,this.onLingQuClickHandler));
            this.delbtnCtl = new ButtonCtl(this._ui.delbtn,new Laya.Handler(this,this.onDelHandler));

            this.scrollView = new ScrollPanelControl();
            this.scrollView.init(this._ui.panel1);6
            this.btnList.push(this.linqubtnCtl,this.delbtnCtl);
        }
    }

    /**删除 */
    private onDelHandler(){
        this.onDel();
        this.Close();
    }

    /**领取 */
    private onLingQuClickHandler(){
        this.onLingqu();
        this.Close();
    }

    private onLingqu(){
        let req = new MailList_req();
        req.type = EMailReqType.LingQuOrRead;
        req.uid = this._data.uid;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private onDel(){
        let req = new MailList_req();
        req.type = EMailReqType.Del;
        req.uid = this._data.uid;
        SocketMgr.Ins.SendMessageBin(req);
    }

    private setRead(){
        if(this._data.state == EMailStatus.notRead){
           this.onLingqu();
        }
    }
    getTfHeight(str:string){
        let _skin: ui.views.mail.mail_tf_contentUI = Laya.Pool.getItemByClass(descClsKey, ui.views.mail.mail_tf_contentUI);
        _skin.descTf.text = str;
        let h:number = _skin.descTf.textField.textHeight;
        Laya.Pool.recover(descClsKey,_skin);
        return h;
    }
    protected onInit(): void {

        this.delbtnCtl.visible = false;
        this.linqubtnCtl.visible = false;

        ////////////////////////////////////////
        this._data = this.Data;

        this.setRead();

        this._ui.title2.text = this._data.title;
        // this._ui.descTf.text = this._data.content;

        this.scrollView.clear();
        let str = this._data.content;
        this.scrollView.split([str],DescTfNode,this.getTfHeight(str));
        this.scrollView.end();

        for(let i = 0;i < this.slotList.length;i++){
            let slot = this.slotList[i];
            slot.refresh(this._data.itemlist[i],this._data.state == EMailStatus.isLingqued);
        }
        this.onLayout(this._data.itemlist.length);

        switch(this._data.state){
            case EMailStatus.isLingqued:
                this.delbtnCtl.visible = true;
                break;
            case EMailStatus.notLingqu:
                this.linqubtnCtl.visible = true;
                break;
        }
    }

    private onLayout(count: number) {
        if(count > 4){
            count = 4;
        }
        if (count > 0) {
            let offsetW: number = this._ui.item0.width + this.gap;
            let centerX = this._ui.width / 2;
            let w =  (count * offsetW- this.gap)/2;
            let x = centerX - w;
            // let x: number = this._ui.width - (count * offsetW - this.gap);
            for (let i = 0; i < count; i++) {
                let cellSkin =  this.slotList[i];
                if(cellSkin){
                    cellSkin.skin.x = x + offsetW * i;
                }
            }
        }
    }
}