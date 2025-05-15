import { BaseModel } from "../../../../frame/util/ctl/BaseModel";
import { JjcBuyFightCnt_revc, PeakJjcBuyFightCnt_revc, stCellValue, stJjcPlayer } from "../../../network/protocols/BaseProto";
import { EFuncDef } from "../main/model/EFuncDef";
import { MainModel } from "../main/model/MainModel";
import { TaskModel } from "../main/model/TaskModel";
import { JjcEvent } from "./vos/JjcEvent";
import { EJjcRewadShow } from "./vos/JjcType";

export abstract class JJC_BaseModel extends BaseModel{
    protected tempPlayerId:number = 0;
    public fightBuyRevc:PeakJjcBuyFightCnt_revc;
    protected funcId:EFuncDef;
    public mDropRed:boolean = false;
    public preRewardList:stCellValue[] = [];
    protected _ownerPlayer: stJjcPlayer;
    public selfScore:number = 0;
    public initMsg(): void{
    }
    public get mRed(){
        if (TaskModel.Ins.isFuncOpen(this.funcId)) {
        return  this.getRedByType(EJjcRewadShow.Day) || 
                this.getRedByType(EJjcRewadShow.Week) ||
                this.mFightRed ||
            this.mDropRed //名次下降提醒
        }
    }
    abstract get mFightRed(): boolean;
    abstract getRedByType(type: EJjcRewadShow): boolean;  
    /**初始化重置数据 */
    public onInitCallBack():void{
        this.preRewardList =  [];
        this._ownerPlayer = null;
        this.selfScore = 0;
    }
    protected  onJjcBuyFightCntRevc(revc:PeakJjcBuyFightCnt_revc|JjcBuyFightCnt_revc) {
        // if(this.fightBuyRevc && revc.buyCnt > this.fightBuyRevc.buyCnt){
        // this.event(JjcEvent.BuyCountSucceed);
        // }
        this.fightBuyRevc = revc;
        this.event(JjcEvent.BuyFightCntUpdate);
        if(this.tempPlayerId!=0){
            this.fight(this.tempPlayerId);
            this.tempPlayerId = 0;
        }
    }
    public fight(id) {

    }

    public get plus(){
        //MainModel.Ins.mRoleData.plus; //FuJiangModel.Ins.getFightNum();
        return MainModel.Ins.mRoleData.plus;
    }

    public updateRed() {
        this.event(JjcEvent.RedUpdate);
        MainModel.Ins.updateJJC_Red();
    }
    public get hasScore(){
        return MainModel.Ins.getIsShowScore(this.funcId);
    }

}