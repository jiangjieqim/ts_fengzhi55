import { ui } from "../../../../../../ui/layaMaxUI";
import { DotManager } from "../../../common/DotManager";
import { System_RefreshTimeProxy } from "../../../huodong/model/ActivityProxy";
import { EFuncDef } from "../../model/EFuncDef";
import { MainEvent } from "../../model/MainEvent";
import { MainModel } from "../../model/MainModel";
import { MainIconProxy } from "../../proxy/FuncProxy";
import { EButtonStyle, FuncSmallIcon } from "../icon/FuncSmallIcon";
import { MainTimeCtl } from "../icon/MainTimeCtl";
import { MainIconListBase } from "./MainIconListBase";

/**顶部按钮 */
export class TopBtnList extends MainIconListBase{
    
    private arrowBtn:Laya.Sprite;
    protected cellGap:number = 40;
    /**一排最多几个按钮 */
    protected minRow: number = 6;
    /**按钮容器 */
    con: Laya.Sprite;
    private _iconCfgList: Configs.t_MainIcon_dat[] = [];
    /**缩放为0.9倍的小按钮 */
    private static FuncSmallIconKey09: string = "FuncSmallIcon09";
    private curIconList: FuncSmallIcon[];
    /**一行最小的按钮数量 */

    init() {
        this.curIconList = [];
        let l1 = MainIconProxy.Ins.List;
        for (let i = 0; i < l1.length; i++) {
            let cfg: Configs.t_MainIcon_dat = l1[i];
            if (cfg.f_pos && !cfg.f_Uiexpand) {
                this._iconCfgList.push(cfg);
            }
        }
        this._iconCfgList.sort(this.f_posSortHandler);
        MainModel.Ins.on(MainEvent.FuncSmallIconUpdate,this,this.onRedUpdate);
    }

    private onRedUpdate(){
        this.refresh();
    }

    /**最多的按钮数量 */
    get maxCount(){
        return parseInt(System_RefreshTimeProxy.Ins.getNumberVal(70));
    }

    bindBtn(btn:Laya.Image){
        this.arrowBtn = btn;
        btn.on(Laya.Event.CLICK,this,this.onRightClick);
        DebugUtil.draw(btn);
    }

    /**小箭头的按钮点击事件 */
    private onRightClick(){
        // this.rightBtn.scaleX = -1*this.rightBtn.scaleX;
        this.btnDir = -1 * this.btnDir;
        this.refresh();
    }

    /**设置按钮的方向 */
    private set btnDir(v:number){
        this.arrowBtn.scaleX = v;

    }

    /**-1缩着 1展开着 */
    private get btnDir(){
        return this.arrowBtn.scaleX;
    }

    /**刷新 */
    refresh() {
        Laya.timer.callLater(this,this.onUpdate);
    }

    private _timeCtl:MainTimeCtl;
    private onUpdate(){
        while (this.curIconList.length) {
            let cell = this.curIconList.pop();
            Laya.Pool.recover(TopBtnList.FuncSmallIconKey09,cell);
            cell.dispose();
        }
        let sx = this.cellGap;
        let sy: number = 0;
        let row: number = 0;
        let cellHeight: number;


        // topbtn_con
        let openCount:number = 0;
        let maxW:number = 0;
        for (let i = 0; i < this._iconCfgList.length; i++) { 
            let cfg = this._iconCfgList[i];
            if(openCount >= this.maxCount && this.btnDir==-1){
                
            }else if (this.isOpen(cfg)) {
                openCount++;
                if (row >= this.minRow) {
                    row = 0;
                    sx = this.cellGap;
                    sy += cellHeight;
                }
                let item = Laya.Pool.getItemByClass(TopBtnList.FuncSmallIconKey09, FuncSmallIcon);
                this.curIconList.push(item);
                item.initSkin(ui.views.main.ui_main_icon_09UI);
                cellHeight = item.skin.height + this.cellGap;
                item.refresh(item.skin as any, parseInt(cfg.f_funid), EButtonStyle.Pos, sx, sy);
                if(item.skin["timeCtl"]){
                    if(parseInt(cfg.f_funid) == EFuncDef.xianshilibao){
                        item.skin["timeCtl"].visible = true;
                        let ctl:MainTimeCtl = new MainTimeCtl(item.skin["timeCtl"]);
                        ctl.setTime();
                    }else{
                        item.skin["timeCtl"].visible = false;
                    }
                }
                this.con.addChild(item.skin);
                sx += item.skin.width + this.cellGap;
                row++;
                if(sx >= maxW){
                    maxW = sx;
                }
            }
        }

        DebugUtil.draw(this.con,"#ff0000",maxW,cellHeight);

        this.con.x = this.arrowBtn.x - maxW - this.arrowBtn.width;

        let fid = this.updateArrowBtnRed();
        if(fid){
            DotManager.addDot(this.arrowBtn);
        }else{
            DotManager.removeDot(this.arrowBtn);
        }
        DebugUtil.drawTF(this.arrowBtn,fid,"#00ff00");
    }

    /**功能是否开启了 */
    private isOpen(cfg: Configs.t_MainIcon_dat) {
        return cfg && MainModel.Ins.isOpenAllByFuncid(cfg.f_funid) && MainModel.Ins.isSubOpen(cfg);
    }

    private updateArrowBtnRed(){
        // let openCount:number = 0;

        let l = [];
        for (let i = 0; i < this._iconCfgList.length; i++) { 
            let cfg:Configs.t_MainIcon_dat = this._iconCfgList[i];
            if(this.isOpen(cfg)){
                // openCount++;
                l.push(cfg)
            }
            // if ( openCount < this.maxCount) {
            // }else if(this.isOpen(cfg)){             
            //     openCount++;
            //     l.push(cfg);
            // }
        }
        let _newList = [];
        while(l.length > this.maxCount){
            _newList.push(l.pop());
        }
        for(let i = 0;i < _newList.length;i++){
            let cfg = _newList[i];
            if (main.hasRedMainCfg(cfg.f_id)) {
                return cfg.f_funid;
            }
        }
        return 0;
    }

    getByFuncId(funcId:number){
        let l = this.curIconList;
        for(let i = 0;i < l.length;i++){
            let cell = l[i];
            if(cell.funcId ==  funcId){
                return cell.skin;
            }
        }
    }
}