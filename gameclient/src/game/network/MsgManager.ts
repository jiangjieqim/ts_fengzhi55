import { LogSys } from "../../frame/log/LogSys";
import { BaseModel } from "../../frame/util/ctl/BaseModel";
import { Callback } from "../event/Callback";
import { EventID } from "../event/EventID";
import { E } from "../G";
import { AllianceModule } from "../view/handle/alliance/AllianceModule";
import { AllianceFightModule } from "../view/handle/allianceFight/AllianceFightModule";
import { BaoShiModule } from "../view/handle/baoshi/BaoShiModule";
import { ChatModule } from "../view/handle/chat/ChatModule";
import { ChengHaoModule } from "../view/handle/chenghao/ChengHaoModule";
import { CombopackModel } from "../view/handle/combopack/CombopackModel";
import { DaLuanDouModule } from "../view/handle/daluandou/DaLuanDouModule";
import { DrawEventModule } from "../view/handle/drawEvent/DrawEventModule";
import { DuanWuModel } from "../view/handle/duanwu/DuanWuModel";
import { FightMonsterModel } from "../view/handle/fight_monster/vos/FightMonsterModel";
import { FuJiangModule } from "../view/handle/fujiang/FuJiangModule";
import { FuJiangFeastModel } from "../view/handle/fujiangfeast/FuJiangFeastModel";
import { GemFeastModel } from "../view/handle/gemfeast/GemFeastModel";
import { GeXuQiPaoModule } from "../view/handle/gexuqipao/GeXuQiPaoModule";
import { GuaJiModule } from "../view/handle/guaji/GuaJiModule";
import { HeroHouseModel } from "../view/handle/herohouse/HeroHouseModel";
import { HuanZhuangModel } from "../view/handle/huanzhuang/HuanZhuangModel";
import { ActivityModel } from "../view/handle/huodong/ActivityModel";
import { HuYouModule } from "../view/handle/huyou/HuYouModule";
import { JieDongFengModule } from "../view/handle/jiedongfeng/JieDongFengModule";
import { JinShengModule } from "../view/handle/jinsheng/JinShengModule";
import { JiShaoChengDuoModel } from "../view/handle/jishaochengduo/JiShaoChengDuoModel";
import { JjcModel } from "../view/handle/jjc/JjcModel";
import { TreasureModel } from "../view/handle/jubaopeng/TreasureModel";
import { KaiFuChongBangModule } from "../view/handle/kaifuchongbang/KaiFuChongBangModule";
import { KangJiXiongShouModule } from "../view/handle/kangjixiongshou/KangJiXiongShouModule";
import { ChildrenModel, LabordayModel, LuckModel, MidAutumnModel, SummerModel, YuanXiaoModel } from "../view/handle/laborday/model/LabordayBaseModel";
import { LCZQRankModule } from "../view/handle/lczqrank/LCZQRankModule";
import { LiBaoModule } from "../view/handle/libao/LiBaoModule";
import { LingChongRH_Model } from "../view/handle/lingchong/ctl/LingChongViewCtl2";
import { LingChongModule } from "../view/handle/lingchong/LingChongModule";
import { LingChongFeastModel } from "../view/handle/lingchong/model/LingChongFeastModel";
import { JjzmlModel } from "../view/handle/main/model/JjzmlModel";
import { MainModel } from "../view/handle/main/model/MainModel";
import { WingModel } from "../view/handle/main/model/WingModel";
import { NewAdventureModel } from "../view/handle/maoxian2/NewAdventureModel";
import { MeiRiZhuanPanModule } from "../view/handle/meirizhuanpan/MeiRiZhuanPanModule";
import { MoJinXiaoWeiModule } from "../view/handle/mojinxiaowei/MoJinXiaoWeiModule";
import { MonopolyModule } from "../view/handle/monopoly/MonopolyModule";
import { NamingChargeModel } from "../view/handle/naming_charge/NamingChargeModel";
import { NewPlayerFeastModel, NewPlayerFujiangFeastModel, NewPlayerGemFeastModel, NewPlayerPetFeastModel, NewPlayerRideFeastModel } from "../view/handle/newplayerfeast/NewPlayerFeastModel";
import { PaoShangModule } from "../view/handle/paoshang/PaoShangModule";
import { PeakJjcModel } from "../view/handle/peakjjc/model/PeakJjcModel";
import { ServerTaskModule } from "../view/handle/serverTask/ServerTaskModule";
import { ShenBinFeastModel } from "../view/handle/shenbin/model/ShenBinFeastModel";
import { ShenBinModule } from "../view/handle/shenbin/ShenBinModule";
import { SheZhiModule } from "../view/handle/shezhi/SheZhiModule";
import { ShopModel } from "../view/handle/shop/ShopModel";
import { SoulModel } from "../view/handle/soul/model/SoulModel";
import { SpringFestivalModule } from "../view/handle/springFestival/SpringFestivalModule";
import { WanShengJieModule } from "../view/handle/wanshengjie/WanShengJieModule";
import { WowHuanZhuangModule } from "../view/handle/wowhuanzhuang/WowHuanZhuangModule";
import { WuShenDianModule } from "../view/handle/wushendian/WuShenDianModule";
import { XianShiLiBaoModule } from "../view/handle/xianshilibao/XianShiLiBaoModule";
import { XXZDZModule } from "../view/handle/xxzdz/XXZDZModule";
import { YaoQingModule } from "../view/handle/yaoqing/YaoQingModule";
import { ZhanLingModule } from "../view/handle/zhanling/ZhanLingModule";
import { ZhengTuModel } from "../view/handle/zhengtu/ZhengTuModel";
import { ZiXuanLiBaoModule } from "../view/handle/zixuanlibao/ZiXuanLiBaoModule";
import { ZuoQiModel } from "../view/handle/zuoqi/ZuoqiModel";
import { LoginClient } from "./clients/LoginClient";
import { MSGID } from "./MSGID";

class RemoteMsgVo{
    msgId:MSGID;
    remoteList:Callback[] = [];
    clear(){
        this.msgId = null;
        this.remoteList = [];
    }
    invoke(data){
        for(let i = 0;i < this.remoteList.length;i++){
            let cell = this.remoteList[i];
            cell.Invoke(data);
        }
    }

    push(callback: Function, that?: any){
        this.remoteList.push(Callback.Create(that,callback));
    }
}
interface IMSG_revc{
    msgId:number;
    data;
}
/**消息管理器
 * -处理Socket消息的派发与接收
*/
export class MsgManager {
    //TODO:后面需要把消息处理方法 也放到归类里

    //#region 静态

    //#endregion

    //#region 实例

    // private _msgDic: Dictionary<MSGID, Callback> = new Dictionary<MSGID, Callback>();//监听消息字典
    private _msgList:RemoteMsgVo[] = [];
    private _hasInit: boolean = false;
    private _moduleList:BaseModel[] = [];
    constructor() { }
    public LabordayList:any[] = [];
    public Init(): boolean {
        if (this._hasInit) return false;
        this._hasInit = true;

        this.LabordayList.push(
            ChildrenModel.Ins,
            LabordayModel.Ins,
            SummerModel.Ins,
            MidAutumnModel.Ins,
            LuckModel.Ins,
            YuanXiaoModel.Ins
        );

        //#region 根据相应模块进行拆分
        // LoginClient.Ins.initMsg();
        // MainModel.Ins.initMsg();
        // ZuoQiModel.Ins.initMsg();
        let _moduleList = [
            LoginClient.Ins,
            MainModel.Ins,
            ZuoQiModel.Ins,
            JjcModel.Ins,
            PeakJjcModel.Ins,
            ShopModel.Ins,
            ActivityModel.Ins,
            HuanZhuangModel.Ins,
            HeroHouseModel.Ins,
            HuYouModule.ins,
            PaoShangModule.ins,
            GuaJiModule.ins,
            NewAdventureModel.Ins,
            SoulModel.Ins,
            SheZhiModule.ins,
            DaLuanDouModule.ins,
            BaoShiModule.ins,
            WingModel.Ins,
            ShenBinModule.ins,
            ChengHaoModule.ins,
            FuJiangModule.ins,
            YaoQingModule.ins,
            TreasureModel.ins,
            DuanWuModel.Ins,
            GemFeastModel.Ins,
            FuJiangFeastModel.Ins,
            XXZDZModule.ins,
            FightMonsterModel.Ins,
            WuShenDianModule.ins,
            JjzmlModel.Ins,
            MeiRiZhuanPanModule.ins,
            KaiFuChongBangModule.ins,
            JiShaoChengDuoModel.Ins,
            JieDongFengModule.ins,
            LingChongModule.ins,
            LingChongRH_Model.Ins,
            NewPlayerFeastModel.Ins,
            ZhengTuModel.Ins,
            NewPlayerGemFeastModel.Ins,
            NewPlayerRideFeastModel.Ins,
            NewPlayerFujiangFeastModel.Ins,
            LingChongFeastModel.Ins,
            LiBaoModule.ins,
            ServerTaskModule.ins,
            ShenBinFeastModel.Ins,
            LCZQRankModule.ins,
            WanShengJieModule.ins,
 			JinShengModule.ins,
			AllianceModule.ins,
            ChatModule.ins,
            AllianceFightModule.ins,
            NewPlayerPetFeastModel.Ins,
            ZhanLingModule.ins,
            MoJinXiaoWeiModule.ins,
            MonopolyModule.ins,
            DrawEventModule.ins,
            NamingChargeModel.Ins,
            CombopackModel.Ins,
            SpringFestivalModule.ins,
            WowHuanZhuangModule.ins,
            XianShiLiBaoModule.ins,
            KangJiXiongShouModule.ins,
            ZiXuanLiBaoModule.ins,
            GeXuQiPaoModule.ins
        ];

        _moduleList =_moduleList.concat(this.LabordayList);


        this._moduleList = _moduleList;
        for(let i = 0;i < _moduleList.length;i++){
            let _base:BaseModel = _moduleList[i];
            // _base.onInitCallBack();
            _base.initMsg();
        }
        //#endregion

        E.EventMgr.on(EventID.WEBSOCKET_MESSAGE, this, this.socketMessageHandler);

        return true;
    }

    public reset(){
        for(let i = 0;i < this._moduleList.length;i++){
            let _base:BaseModel = this._moduleList[i];
            _base.onInitCallBack();
        }
    }

    public Clear() {
        // this._msgDic.Clear();
        while(this._msgList.length){
            let cell = this._msgList.shift();
            cell.clear();
        }
    }

    public AddMsg(msgid: MSGID, callback: Function, caller?: any) {
        this.addMsg(msgid, callback, caller);
    }

    //消息
    private socketMessageHandler(msg: IMSG_revc): void {
        // if (this._msgDic.Value(msg.msgId))
        //     this._msgDic.Value(msg.msgId).Invoke(msg.data);
        for(let i = 0;i < this._msgList.length;i++){
            let cell = this._msgList[i];
            if(cell.msgId == msg.msgId){
                cell.invoke(msg.data);
            }
        }
    }

    /**注册监听 */
    private addMsg(msgid: MSGID, callback: Function, that?: any) {
        /*
        if (this._msgDic.Value(msgid)) {
            console.warn("repeat add msgid:" + msgid);
            return;
        }
        this._msgDic.Add(msgid, Callback.Create(that, callback));
        */
        let _find:boolean = false;
        let _obj:RemoteMsgVo;
        for(let i = 0;i < this._msgList.length;i++){
            let cell = this._msgList[i];
            if(cell.msgId == msgid){
                LogSys.Warn("repeat add msgid:" + msgid);
                _obj = cell;
                _find = true;
                break;
            }
        }
        if(!_obj){
            _obj = new RemoteMsgVo();
            _obj.msgId = msgid;
            this._msgList.push(_obj);
        }
        _obj.push(callback,that);
    }


    //#endregion
}