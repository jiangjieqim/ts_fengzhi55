import {GeometryUtil} from "../../../../../../frame/util/GeometryUtil";
import { ui } from "../../../../../../ui/layaMaxUI";
import { E } from "../../../../../G";
import { EViewType } from "../../../../../common/defines/EnumDefine";
import {LayerMgr} from "../../../../../layer/LayerMgr";
import {SocketMgr} from "../../../../../network/SocketMgr";
import { GemFormationWear_req, stGem } from "../../../../../network/protocols/BaseProto";
import { MainEvent } from "../../../main/model/MainEvent";
import { MainModel } from "../../../main/model/MainModel";
import { attrConvert } from "../../../main/vos/MainRoleVo";
import { BaoShiModel } from "../../model/BaoShiModel";
import { BaoShiCfgProxy, BaoShiLvProxy, FaZhengProxy } from "../../proxy/BaoShiProxy";

//宝石属性view
export class BaoShiItemCtl{
    protected skin:ui.views.baoshi.ui_baoshiItemUI;
    private _vo:stGem;
    private _isDrag:boolean;
    private _isTip:boolean;

    constructor(skin:ui.views.baoshi.ui_baoshiItemUI) {
        this.skin = skin;
        this.skin.on(Laya.Event.DISPLAY,this,this.onAdd);
        this.skin.on(Laya.Event.UNDISPLAY,this,this.onRemove);
    }

    private onAdd(){
        MainModel.Ins.on(MainEvent.Open_Equip_switch_View,this,this.onOpen_Equip_switch_View);
    }

    private onRemove(){
        MainModel.Ins.on(MainEvent.Open_Equip_switch_View,this,this.onOpen_Equip_switch_View);
        this.clear();
    }

    public setVisible(bo:boolean){
        this.skin.visible = bo;
    }

    private onOpen_Equip_switch_View(){
        this.clearDrag();
    }

    private clear(){
        this._isDrag = false;
        this._isTip = false;
        this.skin.icon.skin = "";
        this.skin.tf1.text = "";
        this.skin.img.visible = false;
        this.skin.img2.visible = false;
        this.skin.maskArea.visible = this.skin.jiao.visible = false;
        this.skin.lab_name.text = "";
        this.clearDrag();
        this.skin.off(Laya.Event.CLICK,this,this.onClick);
        this.skin.off(Laya.Event.MOUSE_DOWN,this,this.onDown);
    }

    private clearDrag(){
        if(this._img){
            this._img.off(Laya.Event.MOUSE_UP,this,this.onUp);
            this._img.stopDrag();
            this._img.removeSelf();
            this._img = null;
        }
    }

    public setDataNull(){
        this.clear();
    }

    public setData(vo:stGem,isDrag:boolean,isTip:boolean,bgBo:boolean = true,flag:boolean = false,imgBo:boolean = true){
        this.clear();
        this._vo = vo;
        this._isDrag = isDrag;
        this._isTip = isTip;
        let cfg = BaoShiCfgProxy.Ins.getCfgById(vo.id);
        this.skin.icon.skin = BaoShiCfgProxy.Ins.getBaoShiIcon(cfg.f_gemicon);
        this.skin.tf1.text = "lv" + vo.level;
        this.skin.lab_name.text = cfg.f_GemAttr;
        this.skin.img.visible = imgBo;
        this.skin.img2.visible = !imgBo;
        this.skin.quality.visible = bgBo;
        this.skin.maskArea.visible = this.skin.jiao.visible = flag;
        if(this._isDrag){
            this.skin.on(Laya.Event.MOUSE_DOWN,this,this.onDown);
        }else{
            this.skin.off(Laya.Event.MOUSE_DOWN,this,this.onDown);
        }
        if(this._isTip){
            this.skin.on(Laya.Event.CLICK,this,this.onClick);
        }else{
            this.skin.off(Laya.Event.CLICK,this,this.onClick);
        }
    }

    private onClick(e:Laya.Event){
        e.stopPropagation();
        if(this._vo){
            let cfg = BaoShiCfgProxy.Ins.getCfgById(this._vo.id);
            let lCfg = BaoShiLvProxy.Ins.getCfgByIdAndLv(this._vo.id,this._vo.level);
            let arr = lCfg.f_GemAttr.split("-");
            let dec = cfg.f_GemAttr + "    " + attrConvert(arr[0],arr[1]);
            MainModel.Ins.showSmallTips(cfg.f_gemname,dec,this.skin.icon);
        }
    }

    private _img:Laya.Image;
    private onDown(e:Laya.Event){
        if(this._vo){
            e.stopPropagation();
            this._img = new Laya.Image();
            let cfg = BaoShiCfgProxy.Ins.getCfgById(this._vo.id);
            this._img.skin = BaoShiCfgProxy.Ins.getBaoShiIcon(cfg.f_gemicon);
            this._img.x = Laya.stage.mouseX - this._img.width * 0.5;
            this._img.y = Laya.stage.mouseY - this._img.height * 0.5;
            this._img.on(Laya.Event.MOUSE_UP,this,this.onUp);
            LayerMgr.Ins.frameLayer.addChild(this._img);
            this._img.startDrag();
            // this._dragTime = Laya.timer.currTimer;
            let view:ui.views.baoshi.ui_baoshiXQViewUI = E.ViewMgr.Get(EViewType.BaoShiXQView).UI as ui.views.baoshi.ui_baoshiXQViewUI;
            let arr = FaZhengProxy.Ins.getCfgById(BaoShiModel.Ins.mationId);
            for(let i:number = 0;i<arr.length;i++){
                if(arr[i].f_GemColor == cfg.f_GemColor){
                    view.view_bs["ts" + (i + 1)].visible = true;
                }
            }
         }
     }

    private onUp(e:Laya.Event){
        if(!this._img){
            return;
        }
        let imgX:number = this._img.x;
        let imgY:number = this._img.y;
        let imgW:number = this._img.width;
        let imgH:number = this._img.height;
        this.clearDrag();
        let view:ui.views.baoshi.ui_baoshiXQViewUI = E.ViewMgr.Get(EViewType.BaoShiXQView).UI as ui.views.baoshi.ui_baoshiXQViewUI;
        for(let i:number = 1;i<13;i++){
            view.view_bs["ts" + i].visible = false;
        }
        // if(Laya.timer.currTimer - this._dragTime <= 200){
        //     // this.clearDrag();
        //     E.ViewMgr.Open(EViewType.CIFU_ITEMTIP,null,this._vo);
        //     return;
        // }
        let p:Laya.Point = new Laya.Point(imgX + imgW*0.5,imgY + imgH*0.5);
        let bagX:number = (view.img_dragBg.parent as Laya.Sprite).localToGlobal(new Laya.Point(view.img_dragBg.x,view.img_dragBg.y)).x;
        let bagY:number = (view.img_dragBg.parent as Laya.Sprite).localToGlobal(new Laya.Point(view.img_dragBg.x,view.img_dragBg.y)).y;

        let p1:Laya.Point = new Laya.Point(bagX,bagY + view.img_dragBg.height);//左下顶点
        let p2:Laya.Point = new Laya.Point(bagX,bagY);//左上顶点
        let p3:Laya.Point = new Laya.Point(bagX + view.img_dragBg.width,bagY);//右上顶点
        let p4:Laya.Point = new Laya.Point(bagX + view.img_dragBg.width , bagY + view.img_dragBg.height);//右下顶点
        let bo = GeometryUtil.isPointInRect(p1,p2,p3,p4,p);
        if(bo){
            if(this._vo.type != BaoShiModel.BagEnmu.noSort_FY){//不是从背包到背包
                let req:GemFormationWear_req = new GemFormationWear_req();
                req.type = BaoShiModel.BagEnmu.noSort_FY;
                req.pos = 0;
                req.uid = this._vo.uid;
                SocketMgr.Ins.SendMessageBin(req);
            }
            return;
        }

        let index:number=0;
        for(let i:number=1;i<13;i++){
            let img = view["view_bs"]["img_" + i];
            let xx = img.parent.localToGlobal(new Laya.Point(img.x,img.y)).x;
            let yy = img.parent.localToGlobal(new Laya.Point(img.x,img.y)).y;
            let x = xx - imgX;
            let y = yy - imgY;
            let len = Math.sqrt(Math.pow(x,2) + Math.pow(y,2));
            if(len <= 40){
                index = i;
            }
        }
        if(index > 0){
            if(this._vo.pos != index){
                let req:GemFormationWear_req = new GemFormationWear_req();
                req.type = BaoShiModel.BagEnmu.sort_FY;
                req.pos = index;
                req.uid = this._vo.uid;
                SocketMgr.Ins.SendMessageBin(req);
            }
        }
    }
}