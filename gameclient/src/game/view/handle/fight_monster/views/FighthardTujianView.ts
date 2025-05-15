import { ViewBase } from "../../../../../frame/view/ViewBase";
import { ui } from "../../../../../ui/layaMaxUI";
import { E } from "../../../../G";
import { AvatarFactory } from "../../avatar/AvatarFactory";
import { AvatarView } from "../../avatar/AvatarView";
import { EAvatarAnim } from "../../avatar/vos/EAvatarAnim";
import { MainModel } from "../../main/model/MainModel";
import { IconUtils } from "../../zuoqi/vos/IconUtils";
import { t_TeamFight_BossAttribute, t_TeamFight_BossPokedex, t_TeamFight_BossSkill } from "../vos/t_TeamFight_Reward";
class FighthardAvatarItem extends ui.views.fighthard.ui_fighthard_avatarUI{
    private cfg:Configs.t_TeamFight_BossAttribute_dat;
    refresh(){
        this.cfg = this.dataSource;
        this.qua.skin = IconUtils.getQuaIcon(this.cfg.f_BossQuality);
        // if(this.cfg.f_PokedexOn)

        if(t_TeamFight_BossPokedex.Ins.isPokedexOn(this.cfg.f_BossID)){
            this.icon.skin = `o/boss/${this.cfg.f_BossID}.png`;
        }else{
            this.icon.skin = `remote/main/main/weikaifang.png`;
        }
        this.tf1.text = this.cfg.f_BossName;
    }
}
class FighthardCirle extends ui.views.fighthard.ui_fight_hard_cirleUI{
    private cfg:Configs.t_TeamFight_BossSkill_dat;
    constructor(){
        super();
        this.on(Laya.Event.CLICK,this,this.onClickHandler);
    }
    private onClickHandler(e:Laya.Event){
        e.stopPropagation();
        MainModel.Ins.showSmallTips(this.cfg.f_SkillName, this.cfg.f_SkillDes, this);
    }
    refresh(){
        let cfg:Configs.t_TeamFight_BossSkill_dat = this.dataSource;
        this.cfg = cfg;
        this.tf.text = cfg.f_SkillName;
    }
}
export class FighthardTujianView extends ViewBase {
    private _avatar:AvatarView;

    private _ui:ui.views.fighthard.ui_fighthardtujianUI;
    protected mMask:boolean = true;
    private oldIndex:number;
    protected onAddLoadRes(): void { }
    protected onExit(): void {
        this._ui.list1.selectedIndex = -1;
        this.disposeAvatar();
     }
    protected onFirstInit(): void { 
        if(!this.UI){
            this.UI = this._ui = new ui.views.fighthard.ui_fighthardtujianUI();
            this.bindClose(this._ui.close1);
            this._ui.list1.itemRender = FighthardAvatarItem;
            this._ui.list1.renderHandler = new Laya.Handler(this,this.onItemRender);
            this._ui.list1.selectEnable = true;
            this._ui.list1.selectHandler = new Laya.Handler(this,this.onSelectHandler);

            this._ui.list2.itemRender = FighthardCirle;
            this._ui.list2.renderHandler = new Laya.Handler(this,this.onList2Handler);
            this._ui.avatarCon.scaleX = this._ui.avatarCon.scaleY = 0.5;
        }
    }
    private onList2Handler(item:FighthardCirle){
        item.refresh();
    }
    private disposeAvatar(){
        if(this._avatar){
            this._avatar.dispose();
            this._avatar = null;
        }
    }
    private onSelectHandler(index:number){
        let _attrCfg:Configs.t_TeamFight_BossAttribute_dat = t_TeamFight_BossAttribute.Ins.List[index];
        if(!_attrCfg){
            return;
        }
        if(!t_TeamFight_BossPokedex.Ins.isPokedexOn(_attrCfg.f_BossID)){
            this._ui.list1.selectedIndex = this.oldIndex;
            E.ViewMgr.ShowMidError(E.getLang("please_wait"));
            return;
        }

        if(index >=0){
            this.oldIndex = index;
            let cfg:Configs.t_TeamFight_BossAttribute_dat = t_TeamFight_BossAttribute.Ins.List[index];
            if (this._avatar && this._avatar.vo == cfg) {

            } else {
                this.disposeAvatar();
                let key = cfg.f_Res;
                this._avatar = AvatarFactory.createBossMonster(`o/spine/${key}/${key}`);
                this._avatar.vo = cfg;
                this._avatar.play(EAvatarAnim.NormalStand);
                this._ui.avatarCon.addChild(this._avatar);
                this._ui.tf3.text = cfg.f_BossChar;
                this._ui.list2.array = t_TeamFight_BossSkill.Ins.getSkillList(cfg.f_BossID);
                this._ui.nametf.text = cfg.f_BossName;
            }
        }
    }

    private onItemRender(item: FighthardAvatarItem, index: number) {
        item.refresh();
        if(this._ui.list1.selectedIndex == index){
            item.sel.visible = true;
        }else{
            item.sel.visible = false;
        }
    }
    protected onInit(): void {
        let _openIndex:number = 0;
        let l = t_TeamFight_BossAttribute.Ins.List;
        for(let i = 0;i < l.length;i++){
            let cfg:Configs.t_TeamFight_BossAttribute_dat = l[i];
            if(t_TeamFight_BossPokedex.Ins.isPokedexOn(cfg.f_BossID)){
                _openIndex = i;
                break;
            }
        }
        this.oldIndex = _openIndex;
        this._ui.list1.array = l;//[l[3]];
        this._ui.list1.selectedIndex = _openIndex;
    }
}