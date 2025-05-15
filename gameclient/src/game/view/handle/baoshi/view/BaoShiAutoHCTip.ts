import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { CheckBoxCtl, ICheckBoxSkin } from "../../../../../frame/view/CheckBoxCtl";
import {ViewBase} from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EViewType } from "../../../../common/defines/EnumDefine";
import { E } from "../../../../G";
import { Gemsynthetic_req } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { VipModel, VipType } from "../../huodong/model/VipModel";
import { IListData, SelectListCtl } from "../../main/ctl/SelectListCtl";
import { RedEnum } from "../../main/model/RedEnum";
import { RedUpdateModel } from "../../main/model/RedUpdateModel";
import { QuickQua } from "../../main/views/QuickSettingView";
import { EClientType } from "../../sdk/ClientType";
import { BaoShiSelProxy } from "../proxy/BaoShiProxy";
import { BaoShiHCView } from "./BaoShiHCView";

export class BaoShiAutoHCTip extends ViewBase{
    private _ui:ui.views.baoshi.ui_baoshiAutoHCTipUI;
    protected mMask = true;
    protected autoFree = true;
    private selCtl: SelectListCtl
    ;// = new SelectListCtl();

    private _checkBoxCtl1:CheckBoxCtl;

    protected  onAddLoadRes(){}

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.baoshi.ui_baoshiAutoHCTipUI;
            this.bindClose(this._ui.btn_close);
            this.btnList.push(ButtonCtl.Create(this._ui.startBtn,new Laya.Handler(this,this.onBtnClick)));
            this.selCtl = new SelectListCtl();
            this.selCtl.dirBottom = true;
            this.selCtl.init(this._ui.sanjiao, this._ui.listarea, this._ui.listcontainer, this._ui.listtf,ui.views.main.ui_quick_setting_list_attrUI, this.getList());
            this.selCtl.selectHandler = new Laya.Handler(this,this.onQuaSelHandler);

            this._checkBoxCtl1 = new CheckBoxCtl({bg:this._ui.bg,gou:this._ui.gou} as ICheckBoxSkin);
            this._checkBoxCtl1.selected = false;
        }
    }

    private onBtnClick(){
        if(this._checkBoxCtl1.selected && initConfig.clienttype == EClientType.Discount){
            let fid;
            let vo = RedUpdateModel.Ins.getByID(RedEnum.BaoShiAutoHC);
            if (vo) {
                fid = vo.type;
            } else {
                fid = 1;
            }
            let cfg: Configs.t_Gem_Config_dat = BaoShiSelProxy.Ins.GetDataById(fid);
            let req:Gemsynthetic_req = new Gemsynthetic_req;
            req.level = cfg.f_gemselect;
            SocketMgr.Ins.SendMessageBin(req);
            this.Close();
        }else{
            let view:BaoShiHCView = E.ViewMgr.Get(EViewType.BaoShiHCView) as BaoShiHCView;
            if(view){
                view.setAuto(true);
                this.Close();
            }
        }
    }

    private getList():IListData[]{
        let arr:IListData[] = [];
            let l = BaoShiSelProxy.Ins.List;
            for (let i = 0; i < l.length; i++) {
                let cfg: Configs.t_Gem_Config_dat = l[i];
                if(cfg.f_gemselect){
                    let vo = new QuickQua();
                    vo.f_id = cfg.f_id;
                    vo.color = "FBF0BB";
                    vo.txt = cfg.f_gemselect + "级的及以下";
                    arr.push(vo);
                }
            }
        return arr;
    }

    private onQuaSelHandler(){
        let quaCfg:QuickQua = this.selCtl.selectVo;
        RedUpdateModel.Ins.save(RedEnum.BaoShiAutoHC,quaCfg.f_id);
    }

    private getSelIndex(){
        let fid;
        let vo = RedUpdateModel.Ins.getByID(RedEnum.BaoShiAutoHC);
        if(vo){
            fid = vo.type;
        }else{
            fid = 1;
        }
        let datalist = this.selCtl.curDataList;
        for(let i = 0;i < datalist.length;i++){
            let quaCfg:QuickQua = datalist[i];
            if(quaCfg.f_id == fid){
                return i;
            }
        }
        return 0;
    }

    protected onInit(): void {
        if(initConfig.clienttype == EClientType.Discount){
            let BaoShiYiJian = VipModel.Ins.getVipTQByType(VipType.BaoShiYiJian);
            if(BaoShiYiJian == -1){
                this._ui.bg.visible = this._ui.tips1.visible = false;
            }else{
                this._ui.bg.visible = this._ui.tips1.visible = true;
            }
        }else{
            this._ui.bg.visible = this._ui.tips1.visible = false;
        }
        let index:number = this.getSelIndex();
        this.selCtl.selectIndex(index);
    }

    protected onExit(): void {
        
    }
}