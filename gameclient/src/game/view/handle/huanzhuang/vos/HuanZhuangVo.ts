import { ItemViewFactory } from "../../main/model/ItemViewFactory";
import { MainModel } from "../../main/model/MainModel";
import { EEquipType } from "../../main/vos/ECellType";
import { EquipItemVo } from "../../main/vos/EquipItemVo";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { ZuoQiModel } from "../../zuoqi/ZuoqiModel";
/**装备数据 */
export class HuanZhuangVo{
    /**
     * 自定义的icon
     */
    public iconURL:string;
    public pos:number;
    /**服务器的序列索引 */
    public serverIndex:number;
    public equipType:EEquipType;//装备类型
    public equipStyle:number;// 样式

    // public getEquipStyle(){
    // return MainModel.Ins.getIdByStyle(this.equipType);
    // }

    public locked:number;//是否已经锁定
    public selected:boolean = false;//是否为选择状态
    /**当前的装备 */
    public getIcon(){
        if(this.iconURL){
            return this.iconURL;
        }
        //`remote/huanzhuang/wu.png`;
        if(this.equipType == EEquipType.ZuoQi){
            return IconUtils.getHorseIcon(this.equipStyle);
        }
        return ItemViewFactory.getEquipIcon(this.equipType,this.equipStyle);
    }
    /**默认的样式 */
    public defaultStyle() {
        let cell: EquipItemVo = MainModel.Ins.getWearable(this.equipType);
        if (cell && cell.equipVo) {
            return cell.equipVo.equipStyle;
        }
        if(this.equipType == EEquipType.Wing){
            let windId:number = MainModel.Ins.wingId;
            return windId;
        }else if(this.equipType == EEquipType.ZuoQi){
            let rideId:number = ZuoQiModel.Ins.rideVo.mainid;
            return rideId;
        }
        return 0;
    }
}