import { ui } from "../../../../../../ui/layaMaxUI";
import { stSkin } from "../../../../../network/protocols/BaseProto";
import { AvatarFactory } from "../../../avatar/AvatarFactory";
import { AvatarView, EAvatarDir } from "../../../avatar/AvatarView";
import { EAvatarAnim } from "../../../avatar/vos/EAvatarAnim";
import { Enemy_ImageProxy } from "../../../main/model/AdventureProxy";
import { FuJiangModel } from "../../model/FuJiangModel";
import { FuJiangListProxy } from "../../proxy/FuJiangProxy";

export class FuJiangSelCtl{
    protected _ui:ui.views.fujiang.ui_fujiangListUI;

    private _avatar1:AvatarView;
    private _avatar2:AvatarView;
    private _avatar3:AvatarView;
    private _avatar4:AvatarView;
    private _avatar5:AvatarView;

    constructor(skin:ui.views.fujiang.ui_fujiangListUI) {
        this._ui = skin;

        this._ui.on(Laya.Event.DISPLAY,this,this.onAdd);
        this._ui.on(Laya.Event.UNDISPLAY,this,this.onRemove);

        this._ui.list.itemRender = ui.views.fujiang.ui_fujiangItem4UI;
        this._ui.list.renderHandler = new Laya.Handler(this,this.onRenderhandler);
        this._ui.list.selectEnable = true;
    }

    public onAdd(){
        
    }

    public onRemove(){
        for(let i:number=0;i<5;i++){
            if(this["_avatar" + (i+1)]){
                this["_avatar" + (i+1)].dispose();
                this["_avatar" + (i+1)] = null;
            }
        }
    }

    private onRenderhandler(item:ui.views.fujiang.ui_fujiangItem4UI,index:number){
        if(this._ui.list.selectedIndex == index){
            item.sp1.visible = true;
            FuJiangModel.Ins.fujiangSelectIndex = index;
            FuJiangModel.Ins.event(FuJiangModel.SELECT_FUJIANG,item.dataSource);
        }else{
            item.sp1.visible = false;
        }

        if(!this["_avatar" + (index+1)]){
            let skin:stSkin = FuJiangModel.Ins.getFuJiangSkin(item.dataSource.cheifId);
            this["_avatar" + (index+1)] = AvatarFactory.createAvatarByStSkin(skin,EAvatarAnim.NormalStand,EAvatarDir.Right);
            this["_avatar" + (index+1)].scale(1.1,1.1);
            item.sp.addChild(this["_avatar" + (index+1)]);
        }
    }

    public setData(){
        let arr = FuJiangModel.Ins.getSZNoList();
        this._ui.list.array = arr;
        if(arr.length >= FuJiangModel.Ins.fujiangSelectIndex + 1){
            this._ui.list.selectedIndex = FuJiangModel.Ins.fujiangSelectIndex;
        }else{
            this._ui.list.selectedIndex = 0;
        }
        for(let i:number=0;i<5;i++){
            this._ui["dot" + (i + 1)].visible = false;
        }
    }

    public addRedTip(index:number){
        this._ui["dot" + (index + 1)].visible = true;
    }

    public remRedTip(index:number){
        this._ui["dot" + (index + 1)].visible = false;
    }
}