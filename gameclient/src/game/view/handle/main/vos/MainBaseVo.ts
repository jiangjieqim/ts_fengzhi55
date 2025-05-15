import { ChestInfoUpdate_revc, stPlayerBaseInfo, stPlayerData } from "../../../../network/protocols/BaseProto";

export class MainBaseVo{
    /**账号信息 */
    public mPlayer: stPlayerData;
    /**装备道具信息 */
    public mBaseInfo: stPlayerBaseInfo;
    /**宝箱数据*/
    protected chestData:ChestInfoUpdate_revc;
    
    AccountId:number;
    NickName:string;
    serverId:number;
    /**服务器名或者是别名 */
    serverName:string;
}