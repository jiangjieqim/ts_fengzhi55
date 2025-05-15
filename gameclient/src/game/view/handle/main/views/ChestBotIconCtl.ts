import { stEquipItem } from "../../../../network/protocols/BaseProto";
import { ItemViewFactory } from "../model/ItemViewFactory";
import { MainModel } from "../model/MainModel";
import { EChestSpineAnim } from "./ChestAnimSpine";

export class ChestBotIconCtl {
    private _icon:Laya.Image;
    private oldY:number;//初始化位置
    private targetPosY:number;//目标位置
    get icon(): Laya.Image{
        return this._icon;
    }
    set icon(v:Laya.Image){
        this._icon = v;
        this.targetPosY = this._icon.y;
        this.oldY = this.targetPosY + 40;
    }
    // public chestAnim: ChestAnimBaseView;
    
    private equipTween: Laya.Tween;
    private readonly useTime: number = 250;
    private _timer: Laya.Timer;
    private hideIcon() {
        this.equipTween.to(this.icon, { alpha: 0 }, this.useTime / 2);
        this.clearTime();
    }

    private onCheckTime() {
        let model:MainModel = MainModel.Ins;
        let curAnim = model.animSettingList[model.animIndex].curAnim.anim.curIndex; //this.chestAnim.anim.curIndex;
        // LogSys.Log("当前动作:"+curAnim);
        if (this.icon.alpha != 0 && curAnim == EChestSpineAnim.Open) {
            this.clearTime();
        }
        else if (curAnim == EChestSpineAnim.Close) {
            if (this.icon.alpha != 0) {
                // LogSys.Log("BUG 隐藏icon");
                // E.ViewMgr.ShowMidError("BUG 隐藏icon");

                // this.hideIcon();
                if (this.equipTween) {
                    this.equipTween.clear();
                }
                this.icon.alpha = 0.0;
                this.clearTime();
            }
        }
    }
    private clearTime() {
        if (this._timer) {
            this._timer.clear(this, this.onCheckTime);
        }
    }
    public update(equip: stEquipItem) {
        if (this.equipTween) {
            this.equipTween.clear();
        } else {
            this.equipTween = new Laya.Tween();
        }
        if (!this._timer) {
            this._timer = new Laya.Timer(true);
        }
        if (!equip) {
            this.hideIcon();
        } else {
            let icon = ItemViewFactory.getIcon(equip);

            if (icon != "") {
                this.icon.skin = icon;
                this.icon.alpha = 0;
                this.icon.y = this.oldY;
                this.equipTween.to(this.icon, { y: this.targetPosY, alpha: 0.65 }, this.useTime);
                this._timer.frameLoop(1, this, this.onCheckTime);
            }
        }
    }
}