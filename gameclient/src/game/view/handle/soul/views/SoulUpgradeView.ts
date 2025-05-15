import { LogSys } from "../../../../../frame/log/LogSys";
import { CheckBox2Ctl } from "../../../../../frame/util/ctl/CheckBox2Ctl";
import { StringUtil } from "../../../../../frame/util/StringUtil";
import { ButtonCtl } from "../../../../../frame/view/ButtonCtl";
import { IProgressCtlSkin, ProgressCtl } from "../../../../../frame/view/ProgressCtl";
import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { SpiritUpgrade_req, stEquipAttr, stSpirit } from "../../../../network/protocols/BaseProto";
import { SocketMgr } from "../../../../network/SocketMgr";
import { FontClipCtl } from "../../avatar/ctl/FontClipCtl";
import { FontCtlFactory } from "../../avatar/ctl/FontCtlFactory";
import { t_Spirit_Config, t_Spirit_Quality } from "../../herohouse/model/GymProxy";
import { MainModel } from "../../main/model/MainModel";
import { t_Power_level } from "../../main/proxy/t_Power_level";
import { attrConvert } from "../../main/vos/MainRoleVo";
import { SoulEvent } from "../model/SoulEvent";
import { SoulModel } from "../model/SoulModel";
import { t_Spirit_Attribute_Fixed, t_Spirit_ExpUpgrade } from "../model/SoulProxy";
import { SoulIconItemCtl } from "./SoulIconItem";
import { SoulSelUpgradeVo, SoulUpgradeItem } from "./SoulUpgradeItem";

export interface IAttrSkin extends Laya.Sprite{
    attrtf: Laya.Label;
    valtf: Laya.Label;
    dataSource;
}

interface IAttkSoulUpdate extends IAttrSkin{
    addtf:Laya.Label;
    randomTf:Laya.Label;
}

class SoulRandomVo{

}

export class SoulAttrCtl{
    public mLeft:boolean = false;
    public view:SoulUpgradeView;
    private attrList:any[] = [];

    constructor(con:Laya.Sprite){
        for(let i = 0;i < con.numChildren;i++){
            this.attrList.push(con.getChildAt(i) as IAttrSkin);
        }
    }

    private setRandomVis(cell:IAttkSoulUpdate,vis:boolean){
        if(cell.randomTf){
            cell.randomTf.visible = vis;
        }
    }

    public set attr(l: stEquipAttr[] | SoulRandomVo[]) {
        for(let i = 0;i < this.attrList.length;i++){
            let cell:IAttkSoulUpdate = this.attrList[i];
            let v = l[i];
            this.setRandomVis(cell,false);
            if(v){
                cell.visible = true;

                if (v instanceof stEquipAttr) {
                    cell.attrtf.text = MainModel.Ins.getAttrNameIdByID(v.id);
                    cell.valtf.text = attrConvert(v.id, v.value);

                    // cell.randomTf.visible = false;
                    if (this.view) {
                        if (this.view.curLv == this.view.newLv) {
                            cell.valtf.right = 0;
                            cell.addtf.text = "";
                        } else {

                            if (this.mLeft) {
                                cell.addtf.text = "   (+" + this.view.attrAddMap[v.id] + ")";//"+3";
                            } else {
                                cell.addtf.text = "";
                                // cell.randomTf.visible = true;
                            }
                            cell.valtf.right = cell.addtf.textField.width;
                        }
                        // cell.randomTf.visible = 
                    }
                }else if(v instanceof SoulRandomVo){
                    cell.attrtf.text = "";
                    cell.valtf.text = "";
                    cell.addtf.text = "";
                    this.setRandomVis(cell,true);
                }
            } else {
                cell.visible = false;
            }
        }
    }

    // public static updateView(leftCtl:SoulAttrCtl,rightCtl:SoulAttrCtl,
    //     attrList:stEquipAttr[]){
    //     let normalAttr = [];
    //     let randomAttr = [];
    //     for(let i = 0;i < attrList.length;i++){
    //         let _attrVo = attrList[i];
    //         if(t_Spirit_Attribute_Random.Ins.isRandomAttrId(_attrVo.id)){
    //             randomAttr.push(_attrVo);
    //         }else{
    //             normalAttr.push(_attrVo);
    //         }
    //     }
    //     leftCtl.attr = normalAttr;
    //     rightCtl.attr = randomAttr;
    // }
}

/**强化 */
export class SoulUpgradeView extends ViewBase {
    /**预览的等级 */
    public newLv: number;
    /**当前等级 */
    public curLv: number;

    public attrAddMap = {};
    /**满级需要的经验值 */
    private maxVal: number = 0;

    /**传奇稀有度 */
    protected readonly quaMaxId:number = 3;
    private uid:number;
    // private curCell:stSpirit;
    private dataList:SoulSelUpgradeVo[] = [];
    protected mMask:boolean = true;
    private _ui: ui.views.soul.ui_soul_qianghuaUI;
    private leftCtl:SoulAttrCtl;
    private rightCtl:SoulAttrCtl;
    protected onAddLoadRes(): void { }
    protected onExit(): void {
        SoulModel.Ins.off(SoulEvent.UpdateData,this,this.refreshView);
     }
    protected checkCtl:CheckBox2Ctl;
    private iconCtl:SoulIconItemCtl;
    private progressCtl:ProgressCtl;
    private curVo:stSpirit;
    private _plusCtl: FontClipCtl;
    private _plusCtl2: FontClipCtl;

    protected onFirstInit(): void {
        if (!this.UI) {
            this.UI = this._ui = new ui.views.soul.ui_soul_qianghuaUI();
            this.bindClose(this._ui.close1);
            // this._ui.yijianzhuanbei
            this._ui.list2.itemRender = SoulUpgradeItem;
            this._ui.list2.renderHandler = new Laya.Handler(this,this.onItemHandler);
            ButtonCtl.CreateBtn(this._ui.okbtn,this,this.onQianHua);
            ButtonCtl.CreateBtn(this._ui.yijianzhuanbei,this,this.yijianHandler);
            // this._ui.checkbox01.tf.text = E.getLang("soul2");

            this._plusCtl = FontCtlFactory.createPlus();
            this._plusCtl2 = FontCtlFactory.createPlus();

            let checkCtl:CheckBox2Ctl = new CheckBox2Ctl(this._ui.checkbox01,E.getLang("soul2"));
            checkCtl.selectHander = new Laya.Handler(this,this.onSelectHandler);
            this.checkCtl = checkCtl;

            this.iconCtl = new SoulIconItemCtl(this._ui.item);
            this.iconCtl.levelTfVisible = false;

            // this.iconCtl.mouseEnable = false;
            this.progressCtl = new ProgressCtl({bg:this._ui.progressBg} as IProgressCtlSkin);

            // this.bindAttrList(this._ui.left1);
            // this.bindAttrList(this._ui.right1);
            this.leftCtl = new SoulAttrCtl(this._ui.left1);
            this.leftCtl.view = this;
            this.leftCtl.mLeft = true;

            this.rightCtl = new SoulAttrCtl(this._ui.right1);
            this.rightCtl.view = this;
            this._ui.tf5.text = E.getLang("soul6");

        }
    }
    
    /**是否可以吞噬 */
    public canSwallow(curData:SoulSelUpgradeVo){
          let afterExp = 0;
          if(!curData.sel){
              //未选择的情况
              let maxVal = this.maxVal;
              if(afterExp >= maxVal){
                  return;
              }else{
                  //所有已经选择了的战魂+被升级的战魂的经验
                  let allexp = this.computeExp() + this.curVo.exp;
                  let cellExpVal = curData.computeExp();//吞噬此战魂将获得多少经验
                  afterExp = cellExpVal + allexp;
                  if(allexp < maxVal){

                  }else{
                      if( afterExp >= maxVal){
                          return;
                      }
                  }
              }
          }else{
              //有选择的时候去选操作
            //   afterExp =  this.computeExp();
          }
          return true;
    }


    private onSelectHandler(){
        // console.log(this.checkCtl.selected);
    }

    private onItemHandler(item:SoulUpgradeItem){
        item.refreshView();
    }
    
    private onQianHua(){
        let _upgradeList = [];
        for(let i = 0;i < this.dataList.length;i++){
            let cell = this.dataList[i];
            if(cell.sel){
                _upgradeList.push(cell.data.vo.uid);
            }
        }
        this.intensify(_upgradeList);
    }

    /**计算当前的经验值加上传入的战魂对象是否可以添加进入 */
    public computeExp(){
        // for(let i = 0;i < this.dataList.length;i++){
        //     let cell = this.dataList[i];
        //     if(cell.sel){
        //         _upgradeList.push(cell.data.vo.uid);
        //     }
        // }

        let maxVal = this.maxVal;
        let curVal = 0;
        for(let i = 0;i < this.dataList.length;i++){
            let cell = this.dataList[i];
            if(cell.sel){
                // _upgradeList.push(cell.data.vo.uid);
                curVal+=cell.computeExp();
            }
        }
        LogSys.Log("maxExp:"+maxVal+" exp:"+curVal);
        return curVal;
    }

    private intensify(_upgradeList: number[]) {
        let _vo = SoulModel.Ins.getByUid(this.uid);
        if(SoulModel.Ins.isLvFull(_vo)){
            E.ViewMgr.ShowMidError(E.getLang("soul5"));
            return;
        }
        if (_upgradeList.length > 0) {
            let req = new SpiritUpgrade_req();
            req.datalist = _upgradeList;
            req.uid = this.uid;
            SocketMgr.Ins.SendMessageBin(req);
        }
        if (_upgradeList.length == 0) {
            E.ViewMgr.ShowMidError(E.getLang("soul4"));
        }
    }
    /**选择了兽魂 */
    public selectSoulItem(uid:number){
        for(let i = 0;i < this.dataList.length;i++){
            let cell = this.dataList[i];
            if(cell.data.vo.uid == uid){
                cell.sel = !cell.sel;
            }
        }
        this.updateList();
    }

    private updateList(){
        this._ui.list2.refresh();
        this.computeExp();
        let _vo = this.curVo;
        LogSys.Log(">>lv:"+t_Spirit_ExpUpgrade.Ins.getLvByExp(_vo.qualityId,_vo.exp)+",exp:"+_vo.exp);
        // this.refreshView();
        this.updateViewList();
    }

    /**一键填充 */
    private yijianHandler(){
        let quaCfg:Configs.t_Spirit_Quality_dat = t_Spirit_Quality.Ins.GetDataById(this.quaMaxId);
        // let result = [];.
        for(let i = 0;i < this.dataList.length;i++){
            let cell = this.dataList[i];
            cell.sel = false;
        }
        for(let i = 0;i < this.dataList.length;i++){
            let cell = this.dataList[i];
            let _canPush:boolean = false;
            if(this.checkCtl.selected ){
                if(cell.data.vo.qualityId < quaCfg.f_QualityID){
                    // cell.sel = true;
                    _canPush = true;
                }
            }else{
                // cell.sel = true;
                _canPush = true;
            }
            if(_canPush && this.canSwallow(cell)){
                cell.sel = true;
            }
        }
        this.updateList();
    }

    private updateViewList(){
        let cell = SoulModel.Ins.getSoulByUid(this.uid);

        let _vo:stSpirit = cell.vo;//SoulModel.Ins.getByUid(this.uid);

        let _addExp:number = this.computeExp();
        let _nowExp = _addExp + _vo.exp;

        let lv = t_Spirit_ExpUpgrade.Ins.getLvByExp(_vo.qualityId, _nowExp);
        this.newLv = lv;
        this.curLv =  t_Spirit_ExpUpgrade.Ins.getLvByExp(_vo.qualityId, _vo.exp);

        if(this.newLv > this.curLv){
            this._ui.bg11.visible = true;
            this._ui.addTf.text = "Lv."+this.newLv;
            this._ui.img5.visible = true;
            this._ui.img4.visible = true;
        }else{
            this._ui.bg11.visible = false;
            this._ui.addTf.text = "";
            this._ui.img5.visible = false;
            this._ui.img4.visible = false;
        }

        this.curVo = _vo;
        this.attrAddMap = cell.getOffsetVal(this.newLv);
        
        let maxVal = t_Spirit_ExpUpgrade.Ins.getMaxByQua(_vo.qualityId);//满级的经验
        this.maxVal = maxVal;
        this.iconCtl.updateCell(_vo);
        
        this._ui.lvtf.text = "Lv." + this.curLv;

        let cfg:Configs.t_Spirit_Attribute_Fixed_dat = (t_Spirit_Attribute_Fixed.Ins.getCfgBySpiritID(_vo.spiritId));
        this._ui.namftf.text = cfg.f_SpiritName;
/*
        if(SoulModel.Ins.isLvFull(_vo)){
            this._ui.progressTf.text = E.getLang("FullLv");
            this.progressCtl.value = 1;
        }else{
            let maxVal:number = t_Spirit_ExpUpgrade.Ins.getMaxExp(_vo.level,_vo.qualityId);
            this._ui.progressTf.text = `${_vo.exp}/${maxVal}`;
            this.progressCtl.value = _vo.exp/maxVal;
        }
*/
        if(_nowExp >= maxVal){
            this._ui.progressTf.text = E.getLang("FullLv");
            this.progressCtl.value = 1;
        }else{
            let maxVal: number = t_Spirit_ExpUpgrade.Ins.getMaxExp(lv, _vo.qualityId);
            this._ui.progressTf.text = `${_nowExp}/${maxVal}`;
            this.progressCtl.value = _nowExp / maxVal;
        }
        // SoulAttrCtl.updateView(this.leftCtl,this.rightCtl,_vo.attrList);
        let attrList = SoulModel.Ins.getSoulByUid(_vo.uid).baseAttr;
        let count:number = t_Spirit_Config.Ins.getRandomCount(this.newLv);
        let textList:SoulRandomVo[] = [];
        if(_vo.exp >= maxVal){
            
        }else{
            if(this.curLv >= 9){

            }else{
                for(let i = _vo.attrList.length;i < count;i++){
                    if(textList.length < 3){
                        textList.push(new SoulRandomVo());
                    }
                }
            }
        }
        let newList:stEquipAttr[]|SoulRandomVo[] = [];
        newList=newList.concat(_vo.attrList);
        newList=newList.concat(textList);
        this.rightCtl.attr = newList;
        /////////////////////////////////////////////////////////////////////////////////////
        this.leftCtl.attr = attrList;//基础属性
        let plusVal = t_Power_level.Ins.calculatePlus(attrList);
        this._plusCtl.setValue(this._ui.plusCon1,StringUtil.val2Atlas(plusVal));

        // let plusVal2 = t_Power_level.Ins.calculatePlus(attrList);
        let plusVal2 = this.newPlus(attrList);
        this._plusCtl2.setValue(this._ui.plusCon2,StringUtil.val2Atlas(plusVal2));
    }


     private newPlus(attrList:stEquipAttr[]){
         let l:stEquipAttr[] = [];
         for(let i = 0;i < attrList.length;i++){
             let o = attrList[i];
             let curVal = this.attrAddMap[o.id];
             if(curVal){
                 let cell = new stEquipAttr();
                 cell.id = o.id;
                 cell.value = o.value + curVal;
                 l.push(cell);
             }
         }
         let plus = t_Power_level.Ins.calculatePlus(l);
         return plus;
     }


    private refreshView(){
        let l = SoulModel.Ins.getNotExcludeWearList(this.uid);
        let result = [];
        for(let i = 0;i < l.length;i++){
            let cell = new SoulSelUpgradeVo();
            cell.data = l[i];
            cell.sel = false;
            result.push(cell);
        }
        this.dataList = result;
        this._ui.list2.array = result;
        this._ui.list2.scrollTo(0);
        this.updateViewList();
    }

    protected onInit(): void {
        this.maxVal = 0;
        // this.overVal = 0;
        this.uid = this.Data;
        SoulModel.Ins.on(SoulEvent.UpdateData,this,this.refreshView);
        this.refreshView();
    }
}