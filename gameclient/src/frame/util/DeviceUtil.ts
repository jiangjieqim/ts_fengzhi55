import { LogSys } from "../log/LogSys";

/**设备工具类*/
export class DeviceUtil {

    /**打印设备信息*/
    public static PrintDeviceInfo() {
        if (navigator) {
            let agentStr = navigator.userAgent;

            let start = agentStr.indexOf("(");
            let end = agentStr.indexOf(")");

            if (start < 0 || end < 0 || end < start) {
                return;
            }

            let infoStr = agentStr.substring(start + 1, end);

            let device: string, system: string, version: string;
            let infos = infoStr.split(";");
            if (infos.length == 3) {
                //如果是三个的话， 可能是android的， 那么第三个是设备号
                device = infos[2];
                //第二个是系统号和版本
                let system_info = infos[1].split(" ");
                if (system_info.length >= 2) {
                    system = system_info[1];
                    version = system_info[2];
                }
            } else if (infos.length == 2) {
                system = infos[0];
                device = infos[0];
                version = infos[1];
            } else {
                system = navigator.platform;
                device = navigator.platform;
                version = infoStr;
            }
            LogSys.Info(system, device, version);
        }
    }

}