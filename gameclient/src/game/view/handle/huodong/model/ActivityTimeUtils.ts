/*
1|3  开服3天后开启 
2|2022-12-23-00-00-00 具体的时间
3|1-2-3 每周1,2,3开启
4|9:00:00 每天9点开启
5|3:00:00 开服时间3点开始 f_time_end 一个循环的持续天数 
*/

import {TimeUtil} from "../../../../../frame/util/TimeUtil";
export interface IActivityTime{
    start:number;
    end:number;
}
export class ActivityTimeUtils{
    public static readonly OneDay:number = 86400;
    /**
     * 转化成时间戳 
     */
    public static getTime(cfg:Configs.t_Pack_Controller_dat){
        let _start_str:string = cfg.f_time_start;
        //
        const oneDay = 86400;
        let _timeVo:IActivityTime = {} as IActivityTime;
        _timeVo.end = 0;
        let arr = _start_str.split("|");
        let type = parseInt(arr[0]);
        let _openTime = TimeUtil.openTime.toNumber()/1000;

        let val = parseInt(arr[1]);
        let time = 0;
        switch(type){
            case 1:
                // 1|3  开服3天后开启
                time = TimeUtil.getZeroSecond(_openTime);
                time += (val - 1) * oneDay;
                _timeVo.start = time;

                if(cfg.f_time_end){
                    _timeVo.end = time + oneDay * parseInt(cfg.f_time_end);
                }
                return _timeVo;
            case 5:
                // 5|3:00:00 开服时间3点开始 f_time_end 一个循环的持续天数
                // let _loopTime = parseInt(arr[1]);

                this.getLoopEndTime(_timeVo,_openTime,parseInt(cfg.f_time_end));
                // time =  _openTime + TimeUtil.toSecond(arr[1]);
                // _timeVo.start = time;
                // _timeVo.end = time + parseInt(cfg.f_time_end) * oneDay;
                return _timeVo;
            default:
                throw Error("time类型未实现");
        }
    }

    private static getLoopEndTime(_timeVo:IActivityTime,_openTime:number,day:number){
        let alltime = ActivityTimeUtils.OneDay * day;//一个循环的时间秒
        let sub = (TimeUtil.serverTime - _openTime) / alltime;
        let a = Math.floor(sub);
        let start = _openTime + a * alltime;
        _timeVo.start = start;
        _timeVo.end = _timeVo.start + alltime;
        // console.log(sub);
    }
}