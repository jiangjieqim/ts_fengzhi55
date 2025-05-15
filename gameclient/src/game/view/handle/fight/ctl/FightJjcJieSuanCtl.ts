import { ui } from "../../../../../ui/layaMaxUI";
import { JjcFight_revc, stCellValue, stJjcPlayer } from "../../../../network/protocols/BaseProto";
import { JjcFactory } from "../../jjc/JjcFactory";
import { JjcHeadCtl } from "../../jjc/views/JjcHeadCtl";
import { EFuncDef } from "../../main/model/EFuncDef";
import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { TaskModel } from "../../main/model/TaskModel";
import { getJjcModel, IJJC_Model } from "../../peakjjc/model/IJjcInterface";
import { XXZDZModel } from "../../xxzdz/model/XXZDZModel";
import { EFightResultView, FightJieSuanView } from "../views/FightJieSuanView";
import { SucceedPlay } from "../views/SucceedPlay";

class FightJjcItemCtl{
    /**动画播放的时间 */
    public static readonly PlayTime:number = 1000;

    public skin:ui.views.jjc.ui_jjc_jiesuan_item_viewUI;
    private headCtl:JjcHeadCtl;
    private oldY:number = 0;
    private _oldScale:number = 0;
    private tween:Laya.Tween;
    constructor(skin:ui.views.jjc.ui_jjc_jiesuan_item_viewUI){
        this.skin = skin;
        this.oldY = skin.y;
        this._oldScale = skin.scaleX;
        // this.otherY = otherY;
        this.tween = new Laya.Tween();
        this.headCtl = new JjcHeadCtl(this.skin.head,this.skin.plus,this.skin.nametf,this.skin.paiming,this.skin.paimingtf,null,
            this.skin.img_xx,this.skin.icon_xx,this.skin.lab_xx);
    }

    public setData(data:stJjcPlayer,type,data1:JjcFight_revc){
        this.headCtl.updateView(data,type,data1);
    }

    public reset(){
        this.skin.y = this.oldY;
        this.skin.scaleX = this.skin.scaleY = this._oldScale;
    }

    public playAnim(targetY:number,scale:number){
        this.reset();

        // let scale = this.skin.scaleX == 1 ? 0.8:1;
        this.tween.clear();
        this.tween.to(this.skin,{y:targetY,scaleX:scale,scaleY:scale},FightJjcItemCtl.PlayTime,Laya.Ease.strongInOut);
    }

    public set win(v:boolean){
        if(v){
            this.skin.statusIcon.skin = `remote/jjc/win.png`;
        }else{
            this.skin.statusIcon.skin = `remote/jjc/lose.png`;
        }
    }
}

export class FightJjcJieSuanCtl{
    private view:FightJieSuanView;
    private _topv:FightJjcItemCtl;
    private _bottomv:FightJjcItemCtl;
    private model:IJJC_Model;
    private initWinY:number = 0;
    private initLoseY:number = 0;
    public succeed:SucceedPlay;
    public needTime:number = 0;
    constructor(view:FightJieSuanView){
        // this.model = JjcModel.Ins;
        this.view = view;
        this.initWinY = view._ui.winplayer.y;
        this.initLoseY = view._ui.loseplayer.y;
        this._topv = new FightJjcItemCtl(this.view._ui.winplayer);
        this._bottomv = new FightJjcItemCtl(this.view._ui.loseplayer);
    }

    public setData(data:JjcFight_revc,type:EFightResultView){
        this.model = getJjcModel(data.type);
        this.needTime = 0;
        if(data.win == 0){
            //失败
            this.view._ui.succeed.visible = false;
            this.view._ui.fail.visible = true;
            this.succeed.visible = false;
            this.succeed.stop();
            if(TaskModel.Ins.isFuncOpen(EFuncDef.Ride)){
                this.view._ui.lab1.visible = true;
                this.view._ui.lock1.visible = false;
            }else{
                this.view._ui.lab1.visible = false;
                this.view._ui.lock1.visible = true;
            }
            if(TaskModel.Ins.isFuncOpen(EFuncDef.CiFu)){
                this.view._ui.lab2.visible = true;
                this.view._ui.lock2.visible = false;
            }else{
                this.view._ui.lab2.visible = false;
                this.view._ui.lock2.visible = true;
            }
        }else{
            this.succeed.visible = true;
            this.succeed.start();
            this.view._ui.jjcsucceed.visible = true;
            
            if(data.upval > 0 && type != EFightResultView.XXZDZ){
                
                let y1 = this.initWinY;
                let y2 = this.initLoseY;
                // this._topv.reset();
                // this._bottomv.reset();
                this._bottomv.win = true;
                this._topv.win = false;
                this._bottomv.setData(this.model.ownerPlayer,type,data);
                let _enemyInfo:stJjcPlayer = JjcFactory.newStJjcPlayer(data.enemyInfo);
                _enemyInfo.rank+=data.upval;
                this._topv.setData(_enemyInfo,type,data);

                this._topv.skin.y = y1;
                this._topv.skin.scaleX = this._topv.skin.scaleY =1;
                this._topv.playAnim(y2,0.9);

                this._bottomv.skin.y = y1;
                this._bottomv.skin.scaleX = this._bottomv.skin.scaleY = 0.9;
                this._bottomv.playAnim(y1,1);
                // this._bottomv.playAnim();
                this.needTime = FightJjcItemCtl.PlayTime;
                
            }else{
                //赢者
                this._topv.setData(this.model.ownerPlayer,type,data);
                this._topv.win = true;
                this._topv.reset();
                //败者
                this._bottomv.setData(data.enemyInfo,type,data);
                this._bottomv.win = false;
                this._bottomv.reset();
            }
            let rewardList: stCellValue[] = this.model.succeedRewardList;
            this.view._ui.tf2.visible = rewardList.length > 0;
            ItemViewFactory.renderItemSlots(this.view._ui.rewardCon, rewardList, 50, 1, "center");

            if(type == EFightResultView.JJC){
                this.view._ui.img0.visible = true;
                this.view._ui.jjcuplv.text = data.upval.toString();
                this.view._ui.lab_xx.visible = this.view._ui.lab_xx1.visible = false;
            }else if(type == 2){
                this.view._ui.img0.visible = false;
                this.view._ui.lab_xx.visible = this.view._ui.lab_xx1.visible = true;
                this.view._ui.lab_xx1.text = XXZDZModel.Ins.starPercent + "%";
            }
        }
    }
}