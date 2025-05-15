import { TimeUtil } from "../../../../../frame/util/TimeUtil";
import { stCellValue, stGymInvite } from "../../../../network/protocols/BaseProto";
import { uint64 } from "../../../../network/protocols/uint64";
import { HeroHouseModel } from "../HeroHouseModel";
import { AvatarAnimStatus } from "../views/herostage/AvatarAnimStatus";
import { EGymAction, EGymHeroType, EGymLingQu } from "./EGymType";
import { GymEvent } from "./GymEvent";
import { t_Gym_NPC_Anim, t_Gym_NPC_Image, t_Gym_NPC_List, t_Gym_NPC_Quality, t_Gym_NPC_Talk } from "./GymProxy";
export class GymSkinVo {
    /**演武的形象 */
    imgCfg:Configs.t_Gym_NPC_Image_dat;

    /**稀有度 */
    quaCfg:Configs.t_Gym_NPC_Quality_dat;

    /**稀有度值 */
    public get qua(){
        return this.quaCfg.f_id;
    }

    /**动作 0-1000|1-2000-0.5|5-2000 */
    public action:string = "";

    /**结束时间戳 */
    public endTime:uint64;
    public animTotalTime:number;
    /**减少的的时间 毫秒 */
    speedUpTime:number;
    private getTotalTime(str:string) {
        let l = str.split("|");
        let time: number = 0;
        for (let i = 0; i < l.length; i++) {
            let cell = l[i].split("-");
            time += parseInt(cell[1]);
        }
        return time/1000;
    }
    public parse() {
        let anim:string[] = this.quaCfg.f_Anim.split("|");//7-1|6-1|5-1
        // t_Gym_NPC_Anim
        let animStr = "";
        for(let i = 0;i < anim.length;i++){
            let cell = anim[i].split("-");
            let id:number = parseInt(cell[0]);
            let count:number = parseInt(cell[1]);
            for(let n = 0;n < count;n++){
                let cfg:Configs.t_Gym_NPC_Anim_dat = t_Gym_NPC_Anim.Ins.GetDataById(id);
                animStr += cfg.f_anim + "|";
            }
        }
        if(animStr.length > 0){
            animStr = animStr.substr(0,animStr.length-1);
        }
        this.action = animStr;
        this.animTotalTime = this.getTotalTime(animStr);
        // LogSys.Log("action"+this.action+" 动画总时长:"+this.animTotalTime);
    }
}

/**武将演武数据VO */
export class GymInviteVo{
    private skinVo:GymSkinVo;
    /**剩余的倒计时秒 */
    private _curTicket:number;

    private _vo:stGymInvite;

    public get mData(){
        return this._vo;
    }

    constructor(vo:stGymInvite){
        this._vo = vo;
        // this._vo.result = 0;
        let _sub:number = this.subTime;
        if(_sub > 0){
            this._curTicket = Math.ceil(_sub / 1000);
            this.onTimeRefresh();
        }
    }

    public getTalk(type:AvatarAnimStatus){
        let skinvo= this.getSkinVo();
        let id:string;
        switch(this._vo.result){
            case EGymAction.Live:
                if(type == AvatarAnimStatus.Attack_Talk || 
                    type == AvatarAnimStatus.StrongAttack_Talk ||
                    type == AvatarAnimStatus.Idle_Talk) {
                    id = skinvo.imgCfg.f_TalkID;
                } else if (type == AvatarAnimStatus.Idle_End_Talk) {
                    id = skinvo.imgCfg.f_TalkLostID;
                }
                break;
            case EGymAction.ShowInherit:
            case EGymAction.ShowReward:
                if(type == AvatarAnimStatus.Attack_Talk || 
                    type == AvatarAnimStatus.StrongAttack_Talk ||
                    type == AvatarAnimStatus.Idle_Talk){
                    id = skinvo.imgCfg.f_TalkID; 
                }else if(type == AvatarAnimStatus.Idle_End_Talk){
                    id = skinvo.imgCfg.f_TalkWinID;
                }
                break;
        }
        if (id) {
            let arr = id.split('-');
            let index = Math.floor(Math.random()*arr.length);
            let talkId = parseInt(arr[index]);
            let cfg: Configs.t_Gym_NPC_Talk_dat = t_Gym_NPC_Talk.Ins.GetDataById(talkId);
            if(cfg){
                return cfg.f_Content == "" ? "talk fid:" + cfg.f_id : cfg.f_Content;
            }
            return "talkId:" + talkId;
        }
        // else if(id == 0){
        //     return "talk fid=0";
        // }
        return "";
    }

    private onTimeRefresh(){
        if(this._curTicket >= 0){
            Laya.timer.once(1000,this,this.onTimeRefresh);
            // LogSys.Log("sub : heroid "+this._vo.heroId+" ticket:"+this._curTicket);
            this._curTicket--;
        }else{
            //end
            // console.log("FightAnimPlayEnd:",this._vo);
            HeroHouseModel.Ins.updateRed();
            HeroHouseModel.Ins.event(GymEvent.FightAnimPlayEnd);
        }
    }

    /**剩余的时间(毫秒) */
    public get subTime():number{
        let cell: stGymInvite = this._vo;
        let serverTime = TimeUtil.serverTimeMS;
        let sub = cell.endtime.toNumber() - serverTime;
        if(sub < 0){
            sub  = 0;
        }
        return sub;
    }

    /**形象数据 演武动画需要的数据*/
    public getSkinVo() {
        /**武将稀有度 */
        // let qua:number = 0;

        let quaCfg:Configs.t_Gym_NPC_Quality_dat;
        let imgCfg:Configs.t_Gym_NPC_Image_dat;
        if (!this.skinVo) {
            this.skinVo = new GymSkinVo();
            // t_Gym_NPC_Image
            let cell: stGymInvite = this._vo;
            let heroCfg:Configs.t_Gym_NPC_List_dat;
            switch (cell.type) {
                case EGymHeroType.Field:
                    // let l = t_Gym_NPC_MiscList.Ins.List;
                    // let miscCfg: Configs.t_Gym_NPC_MiscList_dat = l.find(item => (item as Configs.t_Gym_NPC_MiscList_dat).f_MiscNPCID == cell.npcId)
                    // heroCfg = t_Gym_NPC_List.Ins.getByHeroID(miscCfg.f_HeroID);
                    heroCfg = t_Gym_NPC_List.Ins.getByHeroID(cell.heroId);
                    quaCfg=t_Gym_NPC_Quality.Ins.getByQua(heroCfg.f_HeroQuality);

                    let imglist = t_Gym_NPC_Image.Ins.List;
                    imgCfg = imglist.find(item=>(item as Configs.t_Gym_NPC_Image_dat).f_NPCID == cell.heroId);
                    
                    break;
                case EGymHeroType.Hero:
                    heroCfg = t_Gym_NPC_List.Ins.getByHeroID(cell.heroId);
                    let heroType: number = heroCfg.f_HeroType;
                    quaCfg=t_Gym_NPC_Quality.Ins.getByQua(heroCfg.f_HeroQuality);
                    imgCfg = t_Gym_NPC_Image.Ins.getCfgByTypeID(heroType);
                    break;
                default:


                    break;
            }
            // console.log(">>>",this.getName(cell.type),imgCfg,quaCfg);
            this.skinVo.imgCfg = imgCfg;
            this.skinVo.quaCfg = quaCfg;
            this.skinVo.endTime = this._vo.endtime;
            this.skinVo.speedUpTime = this._vo.speedUpTime;
            this.skinVo.parse();
        }
        return this.skinVo;
    }

    private getName(type:number){
        switch(type){
            case EGymHeroType.Field:
                return "江湖人士";
            case EGymHeroType.Hero:
                return "英雄";
        }
        return type;
    }
    
    public get fullName(){
        let name = this.getName(this._vo.type).toString();
        let id = this.id;
        if(this._vo.type == EGymHeroType.Field){
            return `${name} npcid:${id}`
        }
        return `${name} heroid:${id}`
    }
    public get endtime(){
        return this._vo.endtime;
    }

    private get id(){
        // return this._vo.type == EGymHeroType.Field ? this._vo.npcId : this._vo.heroId;
        return this._vo.heroId;
    }

    /**演武动画是否已经结束 */
    public get isTimeEnd(){
        if(this.endtime.toNumber() <= TimeUtil.serverTimeMS){
            return true;//结束
        }
        return false;//未结束
    }
    public toCellString() {
        let cell: stGymInvite = this._vo;
        let str = "";
        switch (cell.result) {
            case 0:
                str = "演武完走人";
                break;
            case 1:
                str = "演武完展示传承界面";
                break;
            case 2:
                str = "演武完展示领取奖励界面";
                break;
        }

        let sub = cell.endtime.toNumber() - TimeUtil.serverTimeMS;
        if(sub < 0){
            sub  = 0;
        }
        let endStr = TimeUtil.timeToStr(cell.endtime.toNumber()/1000);
        return `uid:${cell.item.uid}\t${this.getName(cell.type)}\t${str} heroid:${cell.heroId} result:${cell.result} ${str} 剩余时间:${sub}毫秒,结束时间戳:${endStr}`;
    }
    /**领取的状态 */
    public get rewardStatus(){
        let vo = this._vo;
        let sub = vo.endtime.toNumber() - TimeUtil.serverTimeMS;
        if(sub < 0){
            return EGymLingQu.CanLingqu;
        }
        return EGymLingQu.NormalIsAnim;
    }

    public get rewardItem(): stCellValue {
        let l = this._vo.item.itemlist;
        if (l.length > 0) {
            let cell = l[l.length - 1];
            return cell;
        }
    }

    public get uid(){
        return this.mData.item.uid;
    }

    /**武将完整完整度 */
    public get degree(){
        // let val = 8000;
        // return val/10000 * 100;
        return this._vo.item.degree;
    }

    public get attrlist(){
        return this._vo.item.attrList;
    }

    /**
     * 武将配置
     */
    public get heroCfg():Configs.t_Gym_NPC_List_dat{
        let _heroCfg:Configs.t_Gym_NPC_List_dat = t_Gym_NPC_List.Ins.getByHeroID(this.mData.heroId);
        return _heroCfg;
    }

    public dispose(){
        Laya.timer.clear(this,this.onTimeRefresh);
    }
}