import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { ActivityModel } from "../../huodong/ActivityModel";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { ItemVo } from "../../main/vos/ItemVo";
import { SkinLiBaoProxy } from "../proxy/LiBaoProxy";
import { t_Pack_ControllerProxy, t_Purchase_PriceProxy } from "../../huodong/model/ActivityProxy";
import { EActivityLingQu } from "../../huodong/model/EActivityType";
import { ActivityEvent } from "../../huodong/model/ActivityEvent";
import { EFuncDef } from "../../main/model/EFuncDef";
import { MainModel } from "../../main/model/MainModel";
import { EClientType } from "../../sdk/ClientType";
import { RateBtn01Ctl, ESkinRateBtn } from "../../huodong/views/RateBtn01Ctl";
/**皮肤礼包 */
export class SkinLiBaoView extends ViewBase{
    private _ui:ui.views.libao.ui_skinViewUI;
    protected mMask = true; 
    protected mMainSnapshot = true;
    private index = 0;
    private packUid = 52;
    protected autoFree = true;
    private rateCtl:RateBtn01Ctl;
    protected onAddLoadRes(): void {
        this.addAtlas("libao.atlas");
        this.addAtlas("huodong.atlas");
    }

    protected onFirstInit(): void {
        if(!this.UI){
            this.UI = this._ui = new ui.views.libao.ui_skinViewUI;
            this.bindClose(this._ui.btn_close);

            this.btnList.push(
                ButtonCtl.Create(this._ui.btn,new Laya.Handler(this,this.onBtnClick)),
                ButtonCtl.Create(this._ui.btn_lf,new Laya.Handler(this,this.onBtnLfClick)),
                ButtonCtl.Create(this._ui.btn_rt,new Laya.Handler(this,this.onBtnRtClick))
            );
            this._ui.list.itemRender = ui.views.libao.ui_skinItemUI;
            this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderHandler);
            this.showSkin();
            if(initConfig.clienttype== EClientType.Discount){
                this.rateCtl = new RateBtn01Ctl(this._ui.disbtn,this,this.onEnterHandler,ESkinRateBtn.Red);
            }
        }
    }

    private onEnterHandler(){
        const activity = t_Pack_ControllerProxy.Ins.getByUID(this.packUid);
        if(activity){
            ActivityModel.Ins.recharge(activity.f_PriceID);
        }
    }

    private onBtnClick(){
        const pack = ActivityModel.Ins.getByUid(this.packUid);
        if (!pack) return;
        const notBuy = pack.dataList.every(o => o.param1 === EActivityLingQu.Nothing);
        if (notBuy) {
            const activity = t_Pack_ControllerProxy.Ins.getByUID(this.packUid);
            ActivityModel.Ins.recharge(activity.f_PriceID);
        } else {
            ActivityModel.Ins.lingQu(this.packUid, 0);
        }
    }

    private showSkin() {
        const index = this.index;
        const arr = [
            { skin: this._ui.skin1, dot: this._ui.dot1 },
            { skin: this._ui.skin2, dot: this._ui.dot2 },
            { skin: this._ui.skin3, dot: this._ui.dot3 },
        ];
        if (index < 0 || index >= arr.length) return;
        for (let i = 0; i < arr.length; i++) {
            if (index === i) {
                arr[i].skin.visible = true;
                arr[i].dot.skin = `remote/libao/d_2.png`;
            } else {
                arr[i].skin.visible = false;
                arr[i].dot.skin = `remote/libao/d_1.png`;
            }
        }
    }

    private onBtnLfClick(){
        if (this.index > 0) {
            this.index--;
        } else {
            this.index = 2;
        }
        this.showSkin();
    }

    private onBtnRtClick(){
        if (this.index < 2) {
            this.index++;
        } else {
            this.index = 0;
        }
        this.showSkin();
    }

    protected onInit(): void {
        ActivityModel.Ins.on(ActivityEvent.UpdateData,this,this.updataView);
        this.updataView();
    }

    protected onExit(): void {
        ActivityModel.Ins.off(ActivityEvent.UpdateData,this,this.updataView);
        if(this.rateCtl){
            this.rateCtl.dispose();
            this.rateCtl = null;
        }
    }

    private onRenderHandler(item:ui.views.libao.ui_skinItemUI){
        const arr = item.dataSource.f_items_client.split('|');
        const dataList = ActivityModel.Ins.getByUid(this.packUid).dataList;
        const rewarded = dataList.find(o => o.id === item.dataSource.f_id)?.param1 === EActivityLingQu.YiLingQu;
        for (let i = 1; i <= arr.length; i++) {
            const [itemId, count] = arr[i - 1].split('-').map(Number);
            if (rewarded) {
                // 已领取
                item[`item${i}`].maskbg.visible = true;
                item[`item${i}`].gouImg.visible = true;
            } else {
                // 未领取
                item[`item${i}`].maskbg.visible = false;
                item[`item${i}`].gouImg.visible = false;
            }
            let vo = new ItemVo();
            vo.cfgId = itemId;
            vo.count = count;
            ItemViewFactory.refreshSlot(item[`item${i}`].slot,vo);
        }
        
        let id = item.dataSource.f_id;
        item.lab.text = E.getLang(id == 1 ? "djtlq": "djtlq2", StringUtil.NumToWord(id));
    }
    private updataView(){
        const pack = ActivityModel.Ins.getByUid(this.packUid);
        if (!pack) return;
        this._ui.list.array = SkinLiBaoProxy.Ins.List;
        const notBuy = pack.dataList.every(o => o.param1 === EActivityLingQu.Nothing);
        // 设置显示第几个皮肤图片
        const arr = pack.dataList.filter(o => [EActivityLingQu.KeLingQu, EActivityLingQu.YiLingQu].indexOf(o.param1) !== -1);
        if (arr.length) {
            const index = Math.max(...arr.map(o => o.id));
            if (index > 1) {
                this.index = index - 1;
                this.showSkin();
            }
        }
        // 红点
        if (pack.dataList.find(o => o.param1 === EActivityLingQu.KeLingQu)) {
            MainModel.Ins.funcSetRed(EFuncDef.SkinLiBao, true);
        } else {
            MainModel.Ins.funcSetRed(EFuncDef.SkinLiBao, false);
        }
        if(initConfig.clienttype == EClientType.Discount){
            this._ui.descImg.skin = `static/wenan_1.png`;
            if(notBuy){
                this._ui.btn.visible = false;
                this._ui.disbtn.visible = true;
                const activity = t_Pack_ControllerProxy.Ins.getByUID(this.packUid);
                if(activity){
                    let purCfg: Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(activity.f_PriceID);
                    this.rateCtl.cfg = purCfg;
                }
            }else{
                this._ui.btn.visible = true;
                this._ui.disbtn.visible = false;
                this.refreshBuyView(pack);
            }
        }else{
            this._ui.descImg.skin = `static/wenan_0.png`;
            this._ui.btn.visible = true;
            this._ui.disbtn.visible = false;
            if (notBuy) {
                // 未购买
                const activity = t_Pack_ControllerProxy.Ins.getByUID(this.packUid);
                let purCfg: Configs.t_Purchase_Price_dat = t_Purchase_PriceProxy.Ins.GetDataById(activity.f_PriceID);
                this._ui.lab1.text = E.getLang("scly", StringUtil.moneyCv(purCfg.f_price));
                this._ui.btn.skin = `remote/libao/anniu_red.png`;
                this._ui.btn.disabled = false;
            } else {
                // 已购买
                this.refreshBuyView(pack);
            }
        }
    }

    private refreshBuyView(pack){
        if (pack.dataList.find(o => o.param1 === EActivityLingQu.KeLingQu)) {
            this._ui.lab1.text = '领取';
            this._ui.btn.disabled = false;
        } else {
            this._ui.lab1.text = '已领取';
            this._ui.btn.disabled = true;
        }
        this._ui.btn.skin = `remote/common/base/anniu_blue1.png`;
    }
}