import { ui } from "../../../../ui/layaMaxUI";

export class LocalYinDaoView1 extends ui.views.yindao.YinDaoView1UI{
    protected mMaskClick = false;

    public setLab(cfg:Configs.t_Item_Guide_dat){
        this.lab_name.text = cfg.f_id + "";
        // this.lab_name.text = t_Txt_Config.Ins.replace(cfg.f_info);
        // let sname = cfg.f_audio;
        // if (sname) {
        // E.AudioMgr.StopSound();
        // E.AudioMgr.PlaySound1(sname);
        // }
    }
}