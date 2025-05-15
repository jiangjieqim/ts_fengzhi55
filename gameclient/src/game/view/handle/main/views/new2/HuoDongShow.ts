import { StringUtil } from "../../../../../../frame/util/StringUtil";
import { ui } from "../../../../../../ui/layaMaxUI";
import { EMsgBoxType } from "../../../../../common/defines/EnumDefine";
import { E } from "../../../../../G";
import { MainView } from "../../MainView";
import { MainModel } from "../../model/MainModel";
import { MainIconProxy } from "../../proxy/FuncProxy";
import { FuncSmallIcon, EButtonStyle } from "../icon/FuncSmallIcon";

/**展开子菜单 */
export class HuoDongShow extends ui.views.main.ui_huodong_itemUI{
    private _testSpr:Laya.Sprite;
    private static FuncSmallSmallIcon:string = "FuncSmallSmallIcon";

    private clearLeftRight(){
        while(this.mainIconList.length){
            let cell:FuncSmallIcon = this.mainIconList.shift();
            cell.dispose();
            Laya.Pool.recover(HuoDongShow.FuncSmallSmallIcon,cell);
        }
    }
    private readonly maxRow:number = 4;
    private mainIconList:FuncSmallIcon[] = [];
    // private _cfgList:Configs.t_MainIcon_dat[];
    private clickSpr:Laya.Sprite = new Laya.Sprite();
    private bg:Laya.Sprite = new Laya.Sprite();
    private sortHandler(a:Configs.t_MainIcon_dat,b:Configs.t_MainIcon_dat){
        if(a.f_pos < b.f_pos){
            return -1;
        }
        else if(a.f_pos > b.f_pos){
            return 1;
        }
        return 0;
    }
    private getCfgList(id:number): Configs.t_MainIcon_dat[] {
        // if(!_cfgList){
        let _cfgList = [];
        let l = MainIconProxy.Ins.List;
        for (let i = 0; i < l.length; i++) {
            let cfg: Configs.t_MainIcon_dat = l[i];
            if (cfg.f_Uiexpand == id) {
                _cfgList.push(cfg);
            }
        }
        _cfgList = _cfgList.sort(this.sortHandler);

        return _cfgList;
    }
    constructor(){
        super();
        this.clickSpr.on(Laya.Event.CLICK,this,this.onClick);
        this.bg.on(Laya.Event.CLICK,this,this.onBg1Click);
    }
    private onBg1Click(){

    }
    private onClick(){
        this.removeSelf();
    }

    private getList(id:number):Configs.t_MainIcon_dat[]{
        let l = this.getCfgList(id);
        let res = [];
        let ids:string = "";
        for(let i = 0;i < l.length;i++){
            let cfg = l[i];
            if(cfg.f_pos){
                cfg = MainModel.Ins.cfgByPos(cfg.f_pos);
                if(cfg){
                    res.push(cfg);
                }
            }else{
                ids += cfg.f_id + ",";
            }
        }

        if(debug && !StringUtil.IsNullOrEmpty(ids)){
            E.ViewMgr.ShowMsgBox(EMsgBoxType.OnlyOk,"t_MainIcon_dat f_pos is 0:--->f_id "+ids );
        }
        return res;
    }

    private onLaterHandler(){
        if(this.parent.destroyed){
            return;
        }
        let uiPos = (this.parent as Laya.Sprite).localToGlobal(new Laya.Point(this.x,this.y));
        this.clickSpr.x = -uiPos.x;
        this.clickSpr.y = -uiPos.y;
        this.hitArea = new Laya.Rectangle(-uiPos.x,-uiPos.y,Laya.stage.width,Laya.stage.height);
        this.clickSpr.width = Laya.stage.width;
        this.clickSpr.height = Laya.stage.height;
        if(debug){
            this.clickSpr.graphics.clear();
            this.clickSpr.graphics.drawRect(0,0,this.clickSpr.width-1,this.clickSpr.height-1,null,"#0000ff",2);
            // this.clickSpr.alpha = 0.5;
        }
    }

    public show(funcId:number,id:number){
        let main:MainView = MainModel.Ins.mainView;
        if(main){
            let cell = main.getByFuncId(funcId) as Laya.Sprite;
            let pos = (cell.parent as Laya.Sprite).localToGlobal(new Laya.Point(cell.x,cell.y));
            main.UI.addChild(this);
            const offsetVal:number = 100;//间隔
            let res = this.getList(id);

            this.width = Math.min(this.maxRow, res.length) * offsetVal;

            // if(E.Debug){
            // this.graphics.drawRect(-uiPos.x,-uiPos.y,Laya.stage.width-2,Laya.stage.height-2,null,"#00ff00",4);
            // }
            this.addChildAt(this.clickSpr,0);

            this.con1.addChild(this.bg);

            this.clearLeftRight();
            // let l = this.getCfgList(id);
            let offsetX:number = 0;
            let offsetY:number = -offsetVal;
            let index:number = 0;
            for(let i = 0;i < res.length;i++){
                let cfg = res[i];
                // cfg = MainModel.Ins.cfgByPos(cfg.f_pos);
                // if(cfg){

                let item = Laya.Pool.getItemByClass(HuoDongShow.FuncSmallSmallIcon,FuncSmallIcon);
                this.mainIconList.push(item);
                item.initSkin(ui.views.main.ui_main_bottom_small_iconUI);
                this.con1.addChild(item.skin);
                if (index % this.maxRow == 0) {
                    offsetX = 10;
                    offsetY += offsetVal;
                } else {
                    offsetX += offsetVal;
                }
                index++;

                item.refresh(item.skin as any,parseInt(cfg.f_funid),EButtonStyle.Pos,offsetX, offsetY);
                // if(E.Debug){
                //     item.skin.graphics.clear();
                //     item.skin.graphics.drawRect(0,0,item.skin.width,item.skin.height,null,"#ff0000",1);
                // }
            }
            this.height = Math.ceil(this.mainIconList.length / this.maxRow) * offsetVal;
            this.bg1.x = -39;
            this.bg1.y = -45;
            this.bg1.width = this.width + 70;
            this.bg1.height = this.height + 100;
            this.bg.hitArea = new Laya.Rectangle(0, 0, this.width, this.height);

            if (cell instanceof ui.views.main.ui_main_icon_09UI) {//顶部按钮
                let offset_w:number = 30;
                let ox = pos.x - main.UI.x + main.UI.width / 2;
                if(ox + this.width + offset_w> main.UI.width){
                    ox = main.UI.width - this.width - offset_w;
                }
                let offset_start_x:number = 40;
                if(ox - offset_start_x < 0){
                    ox = offset_start_x;
                }

                this.x = ox;
                this.y = pos.y - main.UI.y + main.UI.height / 2 + cell.height + 50;
            } else {
                this.x = main.UI.width - this.width - 30;//pos.x - main.UI.x + main.UI.width / 2 - this.width;
                this.y = pos.y - main.UI.y + main.UI.height / 2 - this.height + 100;
            }

            // this.bg.graphics.clear();
            // this.bg.alpha = 0.5;
            // this.bg.graphics.drawRect(0,0,this.width,this.height,"#00ff00");
            
            if(debug){
                if(!this._testSpr){
                    this._testSpr = new Laya.Sprite();
                    this.addChild(this._testSpr);
                }
                this._testSpr.graphics.clear();
                this._testSpr.graphics.drawRect(0,0,this.width,this.height,null,"#ff0000",1);
            }

            Laya.timer.callLater(this,this.onLaterHandler);
        }
    }
}