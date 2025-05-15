import { ui } from "../../../../ui/layaMaxUI";
import { E } from "../../../G";
import { t_Txt_Config } from "../../../static/StaticDataMgr";

export class YinDaoView1 extends ui.views.yindao.YinDaoView1UI{
    protected mMaskClick = false;

    public setLab(cfg:Configs.t_Tasks_Guide_dat){
        this.lab_name.text = t_Txt_Config.Ins.replace(cfg.f_info);
        let sname = cfg.f_audio;
        if (sname) {
            E.AudioMgr.StopSound();
            E.AudioMgr.PlaySound1(sname);
        }
    }
}