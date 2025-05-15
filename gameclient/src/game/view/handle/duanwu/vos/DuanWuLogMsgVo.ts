import { stActivityRecord } from "../../../../network/protocols/BaseProto";
import { EFeastType } from "../../gemfeast/EFeastType";

export class DuanWuLogMsgVo{
    subType:EFeastType;
    time:number;
    msgs:stActivityRecord[] = [];
}