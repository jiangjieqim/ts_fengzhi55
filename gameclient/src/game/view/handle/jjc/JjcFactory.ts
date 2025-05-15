import { stJjcPlayer } from "../../../network/protocols/BaseProto";
import { MainModel } from "../main/model/MainModel";

export class JjcFactory{
    public static getRankImg(val:number){
        if(val > 0){
            return `remote/jjc/paiming_${val}.png`;
        }
        return "";
    }

    public static refreshRank(rankTf:Laya.Label,img:Laya.Image,rank:number){
        if(rank<=3){
            rankTf.text = "";
            img.skin = this.getRankImg(rank);
            img.visible = true;
        }else{
            img.visible = false;
            rankTf.text = rank.toString();
        }
    }

    public static newStJjcPlayer(cell:stJjcPlayer){
        let dest:stJjcPlayer = new stJjcPlayer();
        dest.headUrl = MainModel.Ins.convertHead(cell.headUrl);
        dest.id = cell.id;
        dest.name = cell.name;
        dest.lv = cell.lv;
        dest.plus = cell.plus;
        dest.rank = cell.rank;
        return dest;
    }

    public static initTest(){
        // let model:JjcModel = JjcModel.Ins;
        // let l = [];
        // for (let i = 0; i < 100; i++) {
        //     let vo: stJjcPlayer = new stJjcPlayer();
        //     vo.headUrl = "";
        //     vo.id = 0;
        //     vo.lv = 2;
        //     vo.name = 'name'+i;
        //     vo.plus = i*1000;
        //     vo.rank = i + 1;
        //     l.push(vo);
        // }
        // model.playerList = l;
        // //////////////////////////////
        // model.fightPlayers = [];
        // for (let i = 0; i < 5; i++) {
        //     let vo: stJjcPlayer = new stJjcPlayer();
        //     vo.headUrl = "";
        //     vo.id = 0;
        //     vo.lv = 2;
        //     vo.name = 'name'+i;
        //     vo.plus = i*1000;
        //     vo.rank = i + 1;
        //     model.fightPlayers.push(vo);
        // }
        // //////////////////////////////
        // model.todayRank = 1;
        // model.baseInfo = new JjcInfo_revc();
        // model.baseInfo.weekRank = 2;
        // model.baseInfo.buyCnt = 3;
        // model.baseInfo.succeedRewardList = [];
        // let cellVo:stCellValue = new stCellValue();
        // cellVo.id = ECellType.COPPER_MONEY;
        // cellVo.count = 200;
        // model.baseInfo.succeedRewardList.push(cellVo);
        // cellVo = new stCellValue();
        // cellVo.id = ECellType.GOLD;
        // cellVo.count = 200;
        // model.baseInfo.succeedRewardList.push(cellVo);

        // model.baseInfo.totalCnt = 5;

        // model.baseInfo.endTime = TimeUtil.serverTime + 3600*24*7*1.5;

        // model.baseInfo.moneyVal = 20;
        ////////////////////////////////////////
    
        // model.ownerPlayer = model;

        // model.refreshInfo = new JjcRefreshFightCnt_revc();
        // model.refreshInfo.subCnt = 2;
        // model.refreshInfo.time = TimeUtil.serverTime + 3600 * 24;//(window["hour"] || 1);
        
        // model.loglist = [];
        // for(let i = 0;i < 10;i++){
        //     let _logItem:stJjcLog = new stJjcLog();
        //     _logItem.time = TimeUtil.serverTime;
        //     _logItem.playerName = "playerName_"+i.toString();
        //     _logItem.atk = i;
        //     _logItem.changeVal = (i-0.5)*10;
        //     _logItem.rank = i * 10;
        //     model.loglist.push(_logItem);
        // }

        // model.fightBuyRevc = new JjcBuyFightCnt_revc();
        // model.fightBuyRevc.totalCnt = 10;
        // model.fightBuyRevc.freeCnt = 5;
        // // window['subtime'] = TimeUtil.subTime;

        // model.moneyDataRevc = new JjcMoneyUpdate_revc();
        // model.moneyDataRevc.moneyVal = 100;
    }
    

}