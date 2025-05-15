
import {GuideData} from "./GuideData";

/**引导管理器 */
export class GuideMgr {

    private static _ins: GuideMgr = null;
    public static get Ins(): GuideMgr {
        if (this._ins == null) {
            this._ins = new GuideMgr();
        }
        return this._ins;
    }

    public get MineGuides(): GuideData[] {
        // return [new GuideData(GuideCfg.miner)];
        return [];
    }

}