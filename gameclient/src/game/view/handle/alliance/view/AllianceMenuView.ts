import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { EPageType } from "../../../../common/defines/EnumDefine";
import { MainModel } from "../../main/model/MainModel";
import { AllianceManage, AllianceModel, AlliancePosition, IMenu } from "../model/AllianceModel";
import { MenuItem } from "./item/MenuItem";



/**
 * 同盟查看菜单
 */
export class AllianceMenuView extends ViewBase{
    private _ui:ui.views.alliance.ui_alliance_menuUI;
    protected mMask = true;
    protected autoFree:boolean = true;
    
    protected maskAlpha = 0.1;
    private _data: IMenu;
    protected _tempPos:Laya.Point;
    public PageType: EPageType = EPageType.None;

    protected  onAddLoadRes(){
        this.addAtlas('alliance.atlas');
    }

    protected onFirstInit(){
        if(!this.UI){
            this.UI = this._ui = new ui.views.alliance.ui_alliance_menuUI;
            DebugUtil.draw(this._ui);
        }
    }

    private resetMenuItems(playerId: number, playerPosition: AlliancePosition, myPosition: AlliancePosition) {
        const parent = this._ui.paimngBg;
        // 移除菜单项
        while (parent.numChildren > 0) {
            parent.removeChildAt(0);
        }
        // 根据权限重新设置菜单
        let arr: AllianceManage[] = [];
        switch (myPosition) {
            case AlliancePosition.Normal:
                arr = [AllianceManage.Impeach];
                break;
            case AlliancePosition.VicePresident:
                arr = [AllianceManage.Impeach, AllianceManage.KickOut];
                break;
            case AlliancePosition.President:
                arr = [AllianceManage.AppointVicePresident, AllianceManage.AppointPresident, AllianceManage.KickOut, AllianceManage.Demotion];
                break;
        }
        if (playerPosition === AlliancePosition.President) {
            // 盟主不能被踢出、降为普通成员
            arr = arr.filter(o => [AllianceManage.KickOut, AllianceManage.Demotion].indexOf(o) === -1);
        } else {
            if (playerPosition === AlliancePosition.VicePresident) {
                if (myPosition === AlliancePosition.VicePresident) {
                    // 副盟主对副盟主只能查看玩家
                    arr = [];
                }
            } else {
                // 非副盟主不能被降为普通成员
                arr = arr.filter(o => o !== AllianceManage.Demotion);
            }
            // 非盟主不能被弹劾
            arr = arr.filter(o => o !== AllianceManage.Impeach);
        }
        const curPlayerId = MainModel.Ins.mRoleData.mPlayer.AccountId;
        if (playerId === curPlayerId) {
            // 是自己，只能退出
            arr = [AllianceManage.Quit];
        } else {
            // 不是自己，可以查看玩家信息
            arr.push(AllianceManage.WatchPlayer);
        }
        const height = 58;
        parent.height = this._ui.height = arr.length * height;
        for (let i = 0; i < arr.length; i++) {
            const manage = arr[i];
            const menu = new MenuItem();
            menu.setData({ playerId, manageType: manage });
            menu.x = 0;
            menu.y =  i * height;
            if (i === arr.length - 1) {
                menu.line.visible = false;
            }
            parent.addChild(menu);
        }
    }

    public setData(_data: IMenu){
        Laya.timer.callLater(this,this.onLayer,[_data]);
    }

    private onLayer(_data:IMenu){
        //if (!this._data || (_data.position !== this._data.position)) {
            // 更新菜单项
            const position = AllianceModel.Ins.position;
            const playerPosition = _data.position;
            this.resetMenuItems(_data.playerId, playerPosition, position);

        //}
        this._data = _data;


        let offset: number = 20;
        let t:Laya.Sprite = _data.target;

        // this._ui.img.height = this._ui.desc.textField.height + this._ui.desc.y + offset;
        // this._ui.height = this._ui.img.height;
        let pos = (t.parent as Laya.Sprite).localToGlobal(new Laya.Point((t as Laya.Sprite).x,(t as Laya.Sprite).y));
        this._tempPos = pos;
        this.SetCenter();
    }

    protected SetCenter(): void {
        if(this._tempPos){
            //this._ui.x = this._tempPos.x + this._ui.width / 2;
            // this._ui.x = this._data.target.width;
            // this._ui.y = this._tempPos.y - this._ui.height / 2;
            let pos = new Laya.Point(0,0);
            let btn = this._data.target.getChildByName("manage_btn") as Laya.Image;
            if(btn){
                pos.x = btn.x;
                pos.y = btn.y;
            }
            this._ui.x = this._tempPos.x + pos.x;
            this._ui.y = this._tempPos.y + pos.y;
        }
    }

    protected onInit(){
        this.setData(this.Data);
    }

    protected onExit(){
    }
}