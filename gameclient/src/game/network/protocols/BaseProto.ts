import { uint64 } from "./uint64";

/*游戏GM
item 1 100 元宝100(支持负数item 1 -200)
货币类型1:元宝 2:铜钱 3:宝箱 4:经验值

修改属性
gm('attr 10004 111212');

修改开服时间
gm('server 时间戳秒');

延迟1s发送协议
delay 1000

================================================================================================
完成任务
task zu
gm增加了修改任务状态的功能，第一个数字表示任务id，第二个数字表示任务状态，1：未完成，2：已完成。
将任务31修改为已完成：
gm('task 31 2');
注意：只能修改任务状态（间接影响到功能开放），如果完成过任务32发放了翅膀，回退到之前的任务并不会收回翅膀。
================================================================================================

充值
recharge id
 
修改服务器时间
settime 20220110230000

跳跃到指定关卡
skipstep 1

经验值(增加1000值,之后要将数据库中的level值改掉)
exp 1000

解锁套装
gm('suit');

武馆邀请指定武将（已武将id 1 吕布为例 ）
gm('hero 1');

武馆解锁全部羁绊
gm('bond');

神兵1升级到19级
gm('shenbing 19 1')

所有神兵升级到19级
gm('shenbing 19')

竞技场挑战玩家id是10371的用户
gm('jjc 10371')

将冒险关卡改到114：
gm('maoxian 114')
 协议id:1000*/
export class Gm_req{
public protoid:number = 1000
	/*GM字符串*/
	public datas:string;

public write(b){
let len;
b.writeUTFString(this.datas||"");

}
	constructor(){}
}/*心跳请求 协议id:1001*/
export class Heartbeat_req{
public protoid:number = 1001
public write(b){
let len;

}
	constructor(){}
}/*心跳返回 协议id:1002*/
export class Heartbeat_revc{
public protoid:number = 1002
public read(b){
let len;

}
	constructor(){}
}/*踢出通知 协议id:1003*/
export class Kick_revc{
public protoid:number = 1003
	/*踢出原因  
    AccountDuplicate = 0,//同名账号登录*/
	public reason:number;

public read(b){
let len;
this.reason=b.readUint8()

}
	constructor(){}
}/*通用功能错误码 协议id:1004*/
export class Err_revc{
public protoid:number = 1004
	/*
        //错误码,描述,配置到\Project1\Excel\t_Err.xlsx中
    */
	public reason:number;

public read(b){
let len;
this.reason=b.readUint16()

}
	constructor(){}
}/*返回玩家等级信息,初始化之前返回 协议id:1005*/
export class PlayerLevel_revc{
public protoid:number = 1005
	/*玩家当前等级*/
	public level:number;

public read(b){
let len;
this.level=b.readUint16()

}
	constructor(){}
}/*返回玩家当前等级下的经验值,初始化之前返回 协议id:1006*/
export class PlayerCurExp_revc{
public protoid:number = 1006
	/*当前等级下的经验值*/
	public curLevelExp:number;

public read(b){
let len;
this.curLevelExp=b.readUint32()

}
	constructor(){}
}/*玩家注册请求 协议id:3001*/
export class WebClientRegist_req{
public protoid:number = 3001
	/*平台类型*/
	public pid:number;

	/*账号id*/
	public account:string;

	/*账号密码*/
	public password:string;

public write(b){
let len;
b.writeUint8(this.pid);
b.writeUTFString(this.account||"");
b.writeUTFString(this.password||"");

}
	constructor(){}
}/*玩家注册返回 协议id:3002*/
export class WebClientRegist_revc{
public protoid:number = 3002
	/*错误码 Success = 0//注册成功Failed = 1,//注册失败AlreadyExist = 2,//该账号已经存在*/
	public errorID:number;

	/*
    平台类型 
    
    Internal = 0,内部登录 
    WxMini = 1,微信小游戏*/
	public pid:number;

public read(b){
let len;
this.errorID=b.readUint8()
this.pid=b.readUint8()

}
	constructor(){}
}/*玩家登录请求 协议id:3003*/
export class WebClientLogin_req{
public protoid:number = 3003
	/*平台类型*/
	public pid:number;

	/*账号id*/
	public account:string;

	/*账号密码*/
	public password:string;

	/*设备ID*/
	public sceneid:string;

	/*微信openid,非微信传空字符串*/
	public openid:string;

public write(b){
let len;
b.writeUint8(this.pid);
b.writeUTFString(this.account||"");
b.writeUTFString(this.password||"");
b.writeUTFString(this.sceneid||"");
b.writeUTFString(this.openid||"");

}
	constructor(){}
}/*玩家登录返回 协议id:3004*/
export class WebClientLogin_revc{
public protoid:number = 3004
	/*错误码
            Success = 0,//登录成功
            Failed = 1,//登录失败
            AccountStopUseing = 2,//账号停用中
            NoAccount = 3,//账号不存在
            PasswordError = 4,//密码错误
    */
	public errorID:number;

	/*服务配置信息*/
	public serverConfig:stServerConfig=new stServerConfig();

	/*玩家数据*/
	public playerData:stPlayerData=new stPlayerData();

	/*玩家基础信息*/
	public BaseInfo:stPlayerBaseInfo=new stPlayerBaseInfo();

	/*0老角色 1新角色*/
	public newRole:number;

public read(b){
let len;
this.errorID=b.readUint8()
this.serverConfig.read(b);
this.playerData.read(b);
this.BaseInfo.read(b);
this.newRole=b.readUint8()

}
	constructor(){}
}export class stServerConfig{
	/*心跳间隔毫秒*/
	public HeartMillisecond:number;

	/*服务器时间(秒)*/
	public ServerTime:uint64=new uint64();

	/*开服时间戳,没有传0*/
	public openTime:uint64=new uint64();

public write(b){
let len;
b.writeUint32(this.HeartMillisecond);
this.ServerTime.write(b);
this.openTime.write(b);

}
public read(b){
let len;
this.HeartMillisecond=b.readUint32()
this.ServerTime.read(b);
this.openTime.read(b);

}
	constructor(){}
}export class stPlayerData{
	/*账号*/
	public Account:string;

	/*角色昵称*/
	public NickName:string;

	/*账号ID*/
	public AccountId:number;

	/*头像*/
	public HeadUrl:string;

	/*区服id*/
	public serverId:number;

	/*区服名称*/
	public serverName:string;

	/*区服冠名*/
	public naming:string;

public write(b){
let len;
b.writeUTFString(this.Account||"");
b.writeUTFString(this.NickName||"");
b.writeUint32(this.AccountId);
b.writeUTFString(this.HeadUrl||"");
b.writeUint32(this.serverId);
b.writeUTFString(this.serverName||"");
b.writeUTFString(this.naming||"");

}
public read(b){
let len;
this.Account=b.readUTFString()
this.NickName=b.readUTFString()
this.AccountId=b.readUint32()
this.HeadUrl=b.readUTFString()
this.serverId=b.readUint32()
this.serverName=b.readUTFString()
this.naming=b.readUTFString()

}
	constructor(){}
}export class stPlayerBaseInfo{
	/*基础信息*/
	public moneyInfo:stCellValue[];

	/*初始化的装备信息*/
	public equipItem:stEquipItem[];

	/*宝箱抽取的CD时间(秒)，不允许CD时间内重复抽取*/
	public boxCdTime:number;

	/*玩家是否满足vip条件，0不满足 1满足*/
	public isVip:number;

public write(b){
let len;

this.moneyInfo=this.moneyInfo||[];
len = this.moneyInfo.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.moneyInfo[i].write(b);
}

this.equipItem=this.equipItem||[];
len = this.equipItem.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.equipItem[i].write(b);
}
b.writeUint32(this.boxCdTime);
b.writeUint8(this.isVip);

}
public read(b){
let len;
this.moneyInfo=this.moneyInfo||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stCellValue()
item.read(b);
this.moneyInfo.push(item);

}
this.equipItem=this.equipItem||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stEquipItem()
item.read(b);
this.equipItem.push(item);

}
this.boxCdTime=b.readUint32()
this.isVip=b.readUint8()

}
	constructor(){}
}export class stPropItem{
	/*道具id*/
	public id:number;

	/*道具数量*/
	public count:number;

public write(b){
let len;
b.writeUint32(this.id);
b.writeUint32(this.count);

}
public read(b){
let len;
this.id=b.readUint32()
this.count=b.readUint32()

}
	constructor(){}
}export class stCellValue{
	/*货币类型1:元宝 2:铜钱 3:宝箱卷 4:战斗力 5:经验值 (配置表 t_ExpValue.xlsx) 
    10002   速度
    10003	生命
    10004	攻击
    10005	防御
*/
	public id:number;

	/*数量*/
	public count:number;

public write(b){
let len;
b.writeUint16(this.id);
b.writeUint32(this.count);

}
public read(b){
let len;
this.id=b.readUint16()
this.count=b.readUint32()

}
	constructor(){}
}export class stEquipAttr{
	/*属性类型id 读取t_EffectValue.xlsx和t_EquipmentValue.xlsx*/
	public id:number;

	/*属性值t_EquipmentValue.xlsx*/
	public value:number;

public write(b){
let len;
b.writeUint16(this.id);
b.writeUint32(this.value);

}
public read(b){
let len;
this.id=b.readUint16()
this.value=b.readUint32()

}
	constructor(){}
}export class stEquipItem{
	/*装备类型读取t_EquipmentID.xlsx的f_id*/
	public type:number;

	/*装备流水号id*/
	public uid:uint64=new uint64();

	/*level*/
	public level:number;

	/*quality*/
	public quality:number;

	/*1穿戴着 2未穿戴*/
	public wearable:number;

	/*当前装备的战斗力*/
	public plus:number;

	/*装备的样式 type为14(equipStyle代表坐骑ID) */
	public equipStyle:number;

	/*属性列表*/
	public attrList:stEquipAttr[];

	/*属性列表1*/
	public attrList1:stEquipAttr[];

	/*坐骑洗髓信息(用于替换attrList中相同属性id)*/
	public mountAttrList:stMountRefinement[];

public write(b){
let len;
b.writeUint8(this.type);
this.uid.write(b);
b.writeUint16(this.level);
b.writeUint16(this.quality);
b.writeUint8(this.wearable);
b.writeUint32(this.plus);
b.writeUint8(this.equipStyle);

this.attrList=this.attrList||[];
len = this.attrList.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.attrList[i].write(b);
}

this.attrList1=this.attrList1||[];
len = this.attrList1.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.attrList1[i].write(b);
}

this.mountAttrList=this.mountAttrList||[];
len = this.mountAttrList.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.mountAttrList[i].write(b);
}

}
public read(b){
let len;
this.type=b.readUint8()
this.uid.read(b);
this.level=b.readUint16()
this.quality=b.readUint16()
this.wearable=b.readUint8()
this.plus=b.readUint32()
this.equipStyle=b.readUint8()
this.attrList=this.attrList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stEquipAttr()
item.read(b);
this.attrList.push(item);

}
this.attrList1=this.attrList1||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stEquipAttr()
item.read(b);
this.attrList1.push(item);

}
this.mountAttrList=this.mountAttrList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stMountRefinement()
item.read(b);
this.mountAttrList.push(item);

}

}
	constructor(){}
}export class stWingUpgradeInfo{
	/*翅膀属性id*/
	public id:number;

	/*当前属性值*/
	public now:number;

	/*下一等级、阶级属性值*/
	public next:number;

public write(b){
let len;
b.writeUint32(this.id);
b.writeUint32(this.now);
b.writeUint32(this.next);

}
public read(b){
let len;
this.id=b.readUint32()
this.now=b.readUint32()
this.next=b.readUint32()

}
	constructor(){}
}export class stWingItem{
	/*翅膀的等级数据*/
	public wingInfoData:stWingInfo=new stWingInfo();

	/*翅膀id（t_Wing_ID的f_id）*/
	public wingId:number;

	/*翅膀总战斗力*/
	public wingPower:number;

	/*翅膀等级属性列表*/
	public levelAttrList:stWingUpgradeInfo[];

	/*翅膀阶级属性列表*/
	public stageAttrList:stWingUpgradeInfo[];

public write(b){
let len;
this.wingInfoData.write(b);
b.writeUint8(this.wingId);
b.writeUint32(this.wingPower);

this.levelAttrList=this.levelAttrList||[];
len = this.levelAttrList.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.levelAttrList[i].write(b);
}

this.stageAttrList=this.stageAttrList||[];
len = this.stageAttrList.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.stageAttrList[i].write(b);
}

}
public read(b){
let len;
this.wingInfoData.read(b);
this.wingId=b.readUint8()
this.wingPower=b.readUint32()
this.levelAttrList=this.levelAttrList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stWingUpgradeInfo()
item.read(b);
this.levelAttrList.push(item);

}
this.stageAttrList=this.stageAttrList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stWingUpgradeInfo()
item.read(b);
this.stageAttrList.push(item);

}

}
	constructor(){}
}export class stWingInfo{
	/*翅膀的等级*/
	public wingLevel:number;

	/*翅膀的阶级*/
	public wingStage:number;

public write(b){
let len;
b.writeUint16(this.wingLevel);
b.writeUint8(this.wingStage);

}
public read(b){
let len;
this.wingLevel=b.readUint16()
this.wingStage=b.readUint8()

}
	constructor(){}
}/*兑换装备请求 协议id:3005*/
export class ExchangeEquip_req{
public protoid:number = 3005
public write(b){
let len;

}
	constructor(){}
}/*兑换装备返回 协议id:3006*/
export class ExchangeEquip_revc{
public protoid:number = 3006
	/*错误码
                                                Success = 0 成功 
                                                NotEnough = 1 卷轴不足 
                                                CdNotEnough  = 2 CD时间不足*/
	public errorID:number;

	/*抽取到的装备,失败的时候数量是0*/
	public equipItemList:stEquipItem[];

public read(b){
let len;
this.errorID=b.readUint8()
this.equipItemList=this.equipItemList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stEquipItem()
item.read(b);
this.equipItemList.push(item);

}

}
	constructor(){}
}/*装备变化 协议id:3007*/
export class EquipChange_revc{
public protoid:number = 3007
	/*1.装备属性变化的时候 2.新增装备的时候*/
	public equipItem:stEquipItem[];

	/*0默认类型和原先一样处理, 1替换对应穿在身上装备的属性等级..*/
	public type:number;

public read(b){
let len;
this.equipItem=this.equipItem||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stEquipItem()
item.read(b);
this.equipItem.push(item);

}
this.type=b.readUint8()

}
	constructor(){}
}/*操作装备 协议id:3008*/
export class ActionEquip_req{
public protoid:number = 3008
	/*类型 0 出售 ,1 装备*/
	public type:number;

	/*装备流水号ID*/
	public value:uint64=new uint64();

public write(b){
let len;
b.writeUint8(this.type);
this.value.write(b);

}
	constructor(){}
}/*只推送变化的值 协议id:3009*/
export class ValChanel_revc{
public protoid:number = 3009
	/*数据列表*/
	public itemList:stCellValue[];

public read(b){
let len;
this.itemList=this.itemList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stCellValue()
item.read(b);
this.itemList.push(item);

}

}
	constructor(){}
}/*初始化后通知 协议id:3010*/
export class Init_revc{
public protoid:number = 3010
public read(b){
let len;

}
	constructor(){}
}/*宝箱升级请求 协议id:3011*/
export class ChestUpLevel_req{
public protoid:number = 3011
public write(b){
let len;

}
	constructor(){}
}/*宝箱的信息 协议id:3012*/
export class ChestInfoUpdate_revc{
public protoid:number = 3012
	/*宝箱等级，影响抽取的宝箱概率*/
	public boxlv:number;

	/*  升级中的时候:下次升级的时间戳,
                                                未升级中的时候:0*/
	public time:number;

	/*当前的升级的档位索引0号索引为起始*/
	public pos:number;

public read(b){
let len;
this.boxlv=b.readUint16()
this.time=b.readFloat64()
this.pos=b.readUint8()

}
	constructor(){}
}/*宝箱的升级 协议id:3013*/
export class ChestUpLevel_revc{
public protoid:number = 3013
	/*1 铜钱不足 2 升级CD未结束 3 加速卷不足*/
	public type:number;

public read(b){
let len;
this.type=b.readUint8()

}
	constructor(){}
}export class stFightActionLog{
	/*技能id*/
	public skillId:number;

	/*pos站位*/
	public pos:number;

	/*回合数*/
	public round:number;

	/*变化类型 0还原 1修改*/
	public type:number;

	/*属性id*/
	public attrId:number;

	/*属性变化前的值*/
	public oldVal:number;

	/*属性变化量*/
	public newVal:number;

	/*0表示属性变化量是负值 1表示属性变化量是正值*/
	public addType:number;

public write(b){
let len;
b.writeUint16(this.skillId);
b.writeUint8(this.pos);
b.writeUint16(this.round);
b.writeUint8(this.type);
b.writeUint16(this.attrId);
b.writeUint32(this.oldVal);
b.writeUint32(this.newVal);
b.writeUint8(this.addType);

}
public read(b){
let len;
this.skillId=b.readUint16()
this.pos=b.readUint8()
this.round=b.readUint16()
this.type=b.readUint8()
this.attrId=b.readUint16()
this.oldVal=b.readUint32()
this.newVal=b.readUint32()
this.addType=b.readUint8()

}
	constructor(){}
}/*战斗宠物结构体*/
export class stFightPet{
	/*pos站位*/
	public pos:number;

	/*宠物id*/
	public petId:number;

public write(b){
let len;
b.writeUint8(this.pos);
b.writeUint16(this.petId);

}
public read(b){
let len;
this.pos=b.readUint8()
this.petId=b.readUint16()

}
	constructor(){}
}export class stFightData{
	/*播放战斗动作的角色站位*/
	public target:number;

	/*加减血、移动数值等*/
	public val:number;

public write(b){
let len;
b.writeUint8(this.target);
b.writeUint32(this.val);

}
public read(b){
let len;
this.target=b.readUint8()
this.val=b.readUint32()

}
	constructor(){}
}export class stFightAction{
	/*动作类型
        1 普通攻击 --->攻击对方的动作
        2 吸血     ---> val 10 触发了加血10
        3 暴击     ---> 暴击发起者
        4 受击闪避 ---> 被动触发了闪避
        5 受击动作 ---> 受到普攻0 受到暴击1 受到眩晕2
        6 受击减血 ---> val 100 减血100 skillId=10000代表受击减血由暴击造成（t_Skill_List配置）
        7 备用
        8 移动 0回到自己的位置 1冲向对方阵地
        9 回合数 --> val 1 第一回合
        10 死亡
        11 恢复
        12 特效  val 1 连击 2反击(发起者) 3增益 4减益
        13 站立待机不动
        14 复活

        ////////////////////////////////////////////
        废弃的类型
        15 技能开始 val代表技能id
        16 技能结束 val代表技能id
        17 神兵 val代表神兵id
        18 死亡开始
        19 死亡结束
        ////////////////////////////////////////////
        
        20 技能
        21 宠物攻击动作
        22 buff开始（val 1雷击 2冰冻 3中毒 4灼烧 5石化）
        23 buff结束
        24 格挡
        25 远程普通攻击
        26 远程暴击
    */
	public type:number;

	/*技能id（没有技能传0）*/
	public skillId:number;

	/*有skillId时，表示技能所有者pos站位，其他情况传0*/
	public pos:number;

	/*播放战斗动作的角色信息列表*/
	public targetList:stFightData[];

public write(b){
let len;
b.writeUint8(this.type);
b.writeUint32(this.skillId);
b.writeUint8(this.pos);

this.targetList=this.targetList||[];
len = this.targetList.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.targetList[i].write(b);
}

}
public read(b){
let len;
this.type=b.readUint8()
this.skillId=b.readUint32()
this.pos=b.readUint8()
this.targetList=this.targetList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stFightData()
item.read(b);
this.targetList.push(item);

}

}
	constructor(){}
}/*形象*/
export class stSkin{
	/*头部ID*/
	public f_HeadID:number;

	/*武器ID*/
	public f_WeaponID:number;

	/*盾ID*/
	public f_ShieldID:number;

	/*翅膀ID*/
	public f_WingID:number;

	/*马ID*/
	public f_MountID:number;

	/*身体ID*/
	public f_BodyID:number;

	/*远程攻击弹道，0表示非远程攻击*/
	public f_BulletPic:number;

public write(b){
let len;
b.writeUint16(this.f_HeadID);
b.writeUint16(this.f_WeaponID);
b.writeUint16(this.f_ShieldID);
b.writeUint16(this.f_WingID);
b.writeUint16(this.f_MountID);
b.writeUint16(this.f_BodyID);
b.writeUint16(this.f_BulletPic);

}
public read(b){
let len;
this.f_HeadID=b.readUint16()
this.f_WeaponID=b.readUint16()
this.f_ShieldID=b.readUint16()
this.f_WingID=b.readUint16()
this.f_MountID=b.readUint16()
this.f_BodyID=b.readUint16()
this.f_BulletPic=b.readUint16()

}
	constructor(){}
}/*战斗角色信息结构体*/
export class stFightRole{
	/*总血量*/
	public blood:number;

	/*初始化血量*/
	public init_blood:number;

	/*形象*/
	public skin:stSkin=new stSkin();

	/*战斗力*/
	public plus:number;

	/*站位（1-6）0代表是单人战斗*/
	public pos:number;

	/*等级*/
	public level:number;

	/*星级*/
	public star:number;

	/*名称*/
	public name:string;

public write(b){
let len;
b.writeUint32(this.blood);
b.writeUint32(this.init_blood);
this.skin.write(b);
b.writeUint32(this.plus);
b.writeUint8(this.pos);
b.writeUint16(this.level);
b.writeUint16(this.star);
b.writeUTFString(this.name||"");

}
public read(b){
let len;
this.blood=b.readUint32()
this.init_blood=b.readUint32()
this.skin.read(b);
this.plus=b.readUint32()
this.pos=b.readUint8()
this.level=b.readUint16()
this.star=b.readUint16()
this.name=b.readUTFString()

}
	constructor(){}
}/*战斗结构体*/
export class stFightVo{
	/*赢家的索引号,站位索引号 0:己方 1敌方*/
	public owner:number;

	/*己方的主角pos*/
	public ownerpos:number;

	/*战斗结果列表*/
	public itemList:stFightAction[];

	/*战斗结果日志列表*/
	public logList:stFightActionLog[];

	/*奖励数据列表*/
	public rewardList:stCellValue[];

	/*角色信息列表*/
	public roleList:stFightRole[];

	/*宠物信息列表*/
	public petList:stFightPet[];

public write(b){
let len;
b.writeUint8(this.owner);
b.writeUint8(this.ownerpos);

this.itemList=this.itemList||[];
len = this.itemList.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.itemList[i].write(b);
}

this.logList=this.logList||[];
len = this.logList.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.logList[i].write(b);
}

this.rewardList=this.rewardList||[];
len = this.rewardList.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.rewardList[i].write(b);
}

this.roleList=this.roleList||[];
len = this.roleList.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.roleList[i].write(b);
}

this.petList=this.petList||[];
len = this.petList.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.petList[i].write(b);
}

}
public read(b){
let len;
this.owner=b.readUint8()
this.ownerpos=b.readUint8()
this.itemList=this.itemList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stFightAction()
item.read(b);
this.itemList.push(item);

}
this.logList=this.logList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stFightActionLog()
item.read(b);
this.logList.push(item);

}
this.rewardList=this.rewardList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stCellValue()
item.read(b);
this.rewardList.push(item);

}
this.roleList=this.roleList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stFightRole()
item.read(b);
this.roleList.push(item);

}
this.petList=this.petList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stFightPet()
item.read(b);
this.petList.push(item);

}

}
	constructor(){}
}/*战斗结果 协议id:3014*/
export class FightResult_revc{
public protoid:number = 3014
	/*战斗类型 1冒险战斗*/
	public fight_type:number;

	/*战斗数据*/
	public fightVo:stFightVo=new stFightVo();

public read(b){
let len;
this.fight_type=b.readUint8()
this.fightVo.read(b);

}
	constructor(){}
}/*冒险战斗请求（返回3014） 协议id:3015*/
export class FightStart_req{
public protoid:number = 3015
	/*t_Conquest_Value的f_id*/
	public id:number;

public write(b){
let len;
b.writeUint32(this.id);

}
	constructor(){}
}/*删除道具,删除装备 协议id:3016*/
export class ItemDel_revc{
public protoid:number = 3016
	/*删除列表*/
	public delList:uint64[];

public read(b){
let len;
this.delList=this.delList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new uint64()
item.read(b);
this.delList.push(item);

}

}
	constructor(){}
}/*售卖成功后返回 协议id:3017*/
export class Sell_revc{
public protoid:number = 3017
	/*成功0 失败原因1*/
	public errorID:number;

	/*物品流水号*/
	public value:uint64=new uint64();

	/*售卖变化的值变量*/
	public itemList:stCellValue[];

public read(b){
let len;
this.errorID=b.readUint8()
this.value.read(b);
this.itemList=this.itemList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stCellValue()
item.read(b);
this.itemList.push(item);

}

}
	constructor(){}
}/*任务请求 协议id:3018*/
export class Task_req{
public protoid:number = 3018
public write(b){
let len;

}
	constructor(){}
}export class Task_revc{
public protoid:number = 3019
	/*任务id*/
	public id:number;

	/*任务状态 0 未接取 1 进行中 2 已完成 3 任务全部完成*/
	public status:number;

	/*任务数据*/
	public datalist:number[];

public read(b){
let len;
this.id=b.readUint16()
this.status=b.readUint8()
this.datalist=this.datalist||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.datalist.push(b.readUint32())
}

}
	constructor(){}
}export class Adventure_revc{
public protoid:number = 3020
	/*当前进行中的关卡id*/
	public id:number;

	/*当前关卡中的怪物战斗力*/
	public plus:number;

	/*已经领取了的关卡id(章节奖励),未领取任何章节关卡的时候为0*/
	public rewardId:number;

public read(b){
let len;
this.id=b.readUint16()
this.plus=b.readUint32()
this.rewardId=b.readUint32()

}
	constructor(){}
}/*关卡请求 协议id:3021*/
export class Adventure_req{
public protoid:number = 3021
public write(b){
let len;

}
	constructor(){}
}/*战斗结束 协议id:3022*/
export class FightEnd_req{
public protoid:number = 3022
	/*战斗类型 1冒险战斗 2boss副本 3boss扫荡 4任务类型奖励 5竞技场战斗类型 13征战 14星星争夺战 15鏖战凶兽 16武神殿 17宠物融合 18凶兽入侵（同盟副本）19赤壁大战（同盟战斗）20抗击凶兽*/
	public fight_type:number;

public write(b){
let len;
b.writeUint8(this.fight_type);

}
	constructor(){}
}/*测试战斗属性 协议id:3023*/
export class DebugFightVal_revc{
public protoid:number = 3023
	/*t_Enemy_Value配置id*/
	public id:number;

	/*属性列表*/
	public attrList:stEquipAttr[];

public read(b){
let len;
this.id=b.readUint32()
this.attrList=this.attrList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stEquipAttr()
item.read(b);
this.attrList.push(item);

}

}
	constructor(){}
}/*领取奖励 协议id:3024*/
export class Reward_req{
public protoid:number = 3024
	/*类型 1 冒险章节奖励 4 任务类型奖励 5 新版冒险章节奖励 6 大乱斗奖励 7 武馆月卡礼包*/
	public type:number;

public write(b){
let len;
b.writeUint8(this.type);

}
	constructor(){}
}/*换装形象*/
export class stSkinStyle{
	/*undefined*/
	public qua:number;

	/*undefined*/
	public part:number;

	/*undefined*/
	public style:number;

public write(b){
let len;
b.writeUint8(this.qua);
b.writeUint16(this.part);
b.writeUint16(this.style);

}
public read(b){
let len;
this.qua=b.readUint8()
this.part=b.readUint16()
this.style=b.readUint16()

}
	constructor(){}
}/*领取奖励 失败返回通用错误码 协议id:3025*/
export class Reward_revc{
public protoid:number = 3025
	/*类型0 默认通用类型  1 冒险章节奖励 2 野外boss奖励 3 boss扫荡奖励 4 任务类型奖励 5 坐骑领奖 6 挂机奖励 7 快速挂机奖励 8 新版冒险章节奖励 9 大乱斗奖励 10 武馆月卡礼包 11 5秒自动关闭 13征战 14星星争夺战 15鏖战凶兽 16武神殿 17宠物融合 18凶兽入侵（同盟副本）19赤壁大战（同盟战斗）20抗击凶兽
     17融合*/
	public type:number;

	/*奖励数据列表*/
	public rewardList:stCellValue[];

	/*装备列表*/
	public equipList:stEquipItem[];

	/*换装列表*/
	public partList:stSkinStyle[];

public read(b){
let len;
this.type=b.readUint8()
this.rewardList=this.rewardList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stCellValue()
item.read(b);
this.rewardList.push(item);

}
this.equipList=this.equipList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stEquipItem()
item.read(b);
this.equipList.push(item);

}
this.partList=this.partList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stSkinStyle()
item.read(b);
this.partList.push(item);

}

}
	constructor(){}
}/*委托抽宝箱协议 协议id:3026*/
export class ExchangeEquipProxy_req{
public protoid:number = 3026
public write(b){
let len;

}
	constructor(){}
}export class Adventure_Boss_req{
public protoid:number = 3027
	/*Adventure_Boss的f_id*/
	public f_id:number;

	/*1 挑战 2 扫荡*/
	public type:number;

public write(b){
let len;
b.writeUint32(this.f_id);
b.writeUint8(this.type);

}
	constructor(){}
}export class Adventure_Boss_revc{
public protoid:number = 3028
	/*Adventure_Boss的f_id 当前已经通关的id*/
	public f_id:number;

	/*当前已经扫荡了第几次*/
	public cnt:number;

public read(b){
let len;
this.f_id=b.readUint32()
this.cnt=b.readUint8()

}
	constructor(){}
}/*抽卡 协议id:3029*/
export class GetRide_req{
public protoid:number = 3029
	/*抽奖使用的道具ID 0免费抽 1元宝抽 19坐骑券抽*/
	public itemId:number;

	/*1 单抽 2 三连抽 3 十连抽*/
	public type:number;

public write(b){
let len;
b.writeUint16(this.itemId);
b.writeUint8(this.type);

}
	constructor(){}
}export class stRewardRideVo{
	/*类型:0 坐骑类型 1 item类型*/
	public type:number;

	/*坐骑id*/
	public rideid:number;

	/*坐骑转化的物品id*/
	public itemid:number;

	/*物品数量*/
	public count:number;

public write(b){
let len;
b.writeUint8(this.type);
b.writeUint16(this.rideid);
b.writeUint16(this.itemid);
b.writeUint16(this.count);

}
public read(b){
let len;
this.type=b.readUint8()
this.rideid=b.readUint16()
this.itemid=b.readUint16()
this.count=b.readUint16()

}
	constructor(){}
}export class stRideVo{
	/*坐骑id*/
	public id:number;

	/*坐骑等级*/
	public lv:number;

	/*坐骑star*/
	public star:number;

public write(b){
let len;
b.writeUint16(this.id);
b.writeUint16(this.lv);
b.writeUint16(this.star);

}
public read(b){
let len;
this.id=b.readUint16()
this.lv=b.readUint16()
this.star=b.readUint16()

}
	constructor(){}
}/*坐骑的关联关系*/
export class stMountRelation{
	/*坐骑id*/
	public mountId:number;

	/*副将id 对应t_Chief_List.xlsx的f_cheifid,主角的则为0,-1没人骑着它 >0是副将*/
	public cheifId:number;

	/*当前坐骑的装备属性信息*/
	public equipItem:stEquipItem=new stEquipItem();

	/*0洗髓不可锁定,1洗髓可以锁定属性*/
	public canLock:number;

	/*坐骑洗髓生成新属性的列表*/
	public refinements:stMountRefinement[];

public write(b){
let len;
b.writeUint16(this.mountId);
b.writeFloat64(this.cheifId);
this.equipItem.write(b);
b.writeUint8(this.canLock);

this.refinements=this.refinements||[];
len = this.refinements.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.refinements[i].write(b);
}

}
public read(b){
let len;
this.mountId=b.readUint16()
this.cheifId=b.readFloat64()
this.equipItem.read(b);
this.canLock=b.readUint8()
this.refinements=this.refinements||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stMountRefinement()
item.read(b);
this.refinements.push(item);

}

}
	constructor(){}
}/*抽卡 协议id:3030*/
export class GetRide_revc{
public protoid:number = 3030
	/*1 单抽 2 三连抽 3 十连抽*/
	public type:number;

	/*坐骑列表 数据列表*/
	public rideList:stRewardRideVo[];

public read(b){
let len;
this.type=b.readUint8()
this.rideList=this.rideList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stRewardRideVo()
item.read(b);
this.rideList.push(item);

}

}
	constructor(){}
}/*坐骑信息 协议id:3031*/
export class RideInfo_revc{
public protoid:number = 3031
	/*坐骑列表*/
	public mlist:stRideVo[];

public read(b){
let len;
this.mlist=this.mlist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stRideVo()
item.read(b);
this.mlist.push(item);

}

}
	constructor(){}
}/*坐骑升级 协议id:3032*/
export class RideLv_req{
public protoid:number = 3032
	/*坐骑id*/
	public id:number;

	/*坐骑一次性升多少级*/
	public cnt:number;

public write(b){
let len;
b.writeUint16(this.id);
b.writeUint16(this.cnt);

}
	constructor(){}
}/*坐骑升级 协议id:3033*/
export class RideLv_revc{
public protoid:number = 3033
	/*坐骑id*/
	public id:number;

	/*等级*/
	public lv:number;

public read(b){
let len;
this.id=b.readUint16()
this.lv=b.readUint16()

}
	constructor(){}
}/*坐骑升星 协议id:3034*/
export class RideQua_req{
public protoid:number = 3034
	/*坐骑id*/
	public id:number;

public write(b){
let len;
b.writeUint16(this.id);

}
	constructor(){}
}/*坐骑升星 协议id:3035*/
export class RideQua_revc{
public protoid:number = 3035
	/*坐骑id*/
	public id:number;

	/*星级*/
	public star:number;

public read(b){
let len;
this.id=b.readUint16()
this.star=b.readUint16()

}
	constructor(){}
}export class stRideMissionVo{
	/*坐骑mission id*/
	public id:number;

	/*坐骑id*/
	public rideId:number;

	/*运输结束时间戳*/
	public time:number;

public write(b){
let len;
b.writeUint16(this.id);
b.writeUint16(this.rideId);
b.writeUint32(this.time);

}
public read(b){
let len;
this.id=b.readUint16()
this.rideId=b.readUint16()
this.time=b.readUint32()

}
	constructor(){}
}export class stRideReq{
	/*坐骑id*/
	public rideId:number;

	/*坐骑任务id*/
	public missionId:number;

public write(b){
let len;
b.writeUint16(this.rideId);
b.writeUint16(this.missionId);

}
public read(b){
let len;
this.rideId=b.readUint16()
this.missionId=b.readUint16()

}
	constructor(){}
}/*坐骑运输 协议id:3036*/
export class RideMission_req{
public protoid:number = 3036
	/*数据列表*/
	public rideList:stRideReq[];

public write(b){
let len;

this.rideList=this.rideList||[];
len = this.rideList.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.rideList[i].write(b);
}

}
	constructor(){}
}/*坐骑运输 协议id:3037*/
export class RideMission_revc{
public protoid:number = 3037
	/*数据列表*/
	public rideList:stRideMissionVo[];

public read(b){
let len;
this.rideList=this.rideList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stRideMissionVo()
item.read(b);
this.rideList.push(item);

}

}
	constructor(){}
}/*粮仓升级 协议id:3039*/
export class RideStorgeUp_req{
public protoid:number = 3039
public write(b){
let len;

}
	constructor(){}
}/*粮仓升级 协议id:3040*/
export class RideStorgeUp_revc{
public protoid:number = 3040
	/*粮仓容量总值*/
	public total:number;

public read(b){
let len;
this.total=b.readUint32()

}
	constructor(){}
}/*玩家拥有的翅膀id列表 协议id:3041*/
export class WingList_revc{
public protoid:number = 3041
	/*wingId列表*/
	public list:number[];

public read(b){
let len;
this.list=this.list||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.list.push(b.readUint8())
}

}
	constructor(){}
}/*坐骑信息 协议id:3042*/
export class RideOwnerInfo_revc{
public protoid:number = 3042
	/*骑乘中的坐骑*/
	public equipItem:stEquipItem=new stEquipItem();

public read(b){
let len;
this.equipItem.read(b);

}
	constructor(){}
}/*坐骑次数信息 协议id:3043*/
export class RideOwnerCnt_revc{
public protoid:number = 3043
	/*单抽坐骑已经抽取的次数*/
	public cnt:number;

public read(b){
let len;
this.cnt=b.readUint32()

}
	constructor(){}
}/*坐骑骑乘 协议id:3045*/
export class RideUpdate_req{
public protoid:number = 3045
	/*需要骑乘的坐骑id*/
	public id:number;

public write(b){
let len;
b.writeUint16(this.id);

}
	constructor(){}
}/*坐骑解锁的地址列表 协议id:3046*/
export class RideMissionList_revc{
public protoid:number = 3046
	/*坐骑解锁的地址列表*/
	public rideList:number[];

public read(b){
let len;
this.rideList=this.rideList||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.rideList.push(b.readUint32())
}

}
	constructor(){}
}/*坐骑解锁的地址列表 协议id:3047*/
export class RideMissionList_req{
public protoid:number = 3047
	/*解锁的mission id*/
	public id:number;

public write(b){
let len;
b.writeUint16(this.id);

}
	constructor(){}
}/*坐骑运输奖励领取 协议id:3048*/
export class RideMissionLingQu_req{
public protoid:number = 3048
public write(b){
let len;

}
	constructor(){}
}/*坐骑运输取消 协议id:3049*/
export class RideMissionDel_req{
public protoid:number = 3049
	/*mission id*/
	public id:number;

public write(b){
let len;
b.writeUint16(this.id);

}
	constructor(){}
}/*粮仓中的数据更新 协议id:3050*/
export class RideMissionData_revc{
public protoid:number = 3050
	/*数据列表*/
	public itemList:stCellValue[];

public read(b){
let len;
this.itemList=this.itemList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stCellValue()
item.read(b);
this.itemList.push(item);

}

}
	constructor(){}
}/*翅膀升级 协议id:3051*/
export class WingLevelUp_req{
public protoid:number = 3051
	/*一次升多少级*/
	public cnt:number;

public write(b){
let len;
b.writeUint16(this.cnt);

}
	constructor(){}
}/*玩家装备上的翅膀信息 协议id:3052*/
export class WearedWingData_revc{
public protoid:number = 3052
	/*翅膀的信息*/
	public wingData:stWingItem=new stWingItem();

public read(b){
let len;
this.wingData.read(b);

}
	constructor(){}
}/*更换翅膀 协议id:3053*/
export class WingExchange_req{
public protoid:number = 3053
	/*翅膀id（t_Wing_ID的f_id）*/
	public wingId:number;

public write(b){
let len;
b.writeUint8(this.wingId);

}
	constructor(){}
}/*升级后翅膀的等级信息 协议id:3054*/
export class WingInfo_revc{
public protoid:number = 3054
	/*翅膀的等级信息*/
	public wingInfo:stWingInfo=new stWingInfo();

public read(b){
let len;
this.wingInfo.read(b);

}
	constructor(){}
}/*请求玩家的翅膀id列表 协议id:3055*/
export class GetWingList_req{
public protoid:number = 3055
public write(b){
let len;

}
	constructor(){}
}/*坐骑任务结束请求 协议id:3056*/
export class RideMissionTimeEnd_req{
public protoid:number = 3056
public write(b){
let len;

}
	constructor(){}
}/*翅膀宝物升级 协议id:3057*/
export class wingTreasureUpgrade_req{
public protoid:number = 3057
public write(b){
let len;

}
	constructor(){}
}/*翅膀宝物等级 协议id:3058*/
export class wingTreasureStage_revc{
public protoid:number = 3058
	/*翅膀宝物的等级(t_Wing_Treasure_Upgrade的f_id)*/
	public stage:number;

	/*错误码 Success = 0//正常 Failed = 1,//升级/升阶失败*/
	public errorID:number;

	/*翅膀宝物战斗力*/
	public treasurePower:number;

public read(b){
let len;
this.stage=b.readUint16()
this.errorID=b.readUint8()
this.treasurePower=b.readUint32()

}
	constructor(){}
}/*竞技场玩家列表数据*/
export class stJjcPlayer{
	/*玩家或机器人流水号id*/
	public id:number;

	/*玩家头像*/
	public headUrl:string;

	/*玩家名字*/
	public name:string;

	/*玩家等级*/
	public lv:number;

	/*战斗力*/
	public plus:number;

	/*排名*/
	public rank:number;

	/*玩家角色ID*/
	public accountId:number;

	/*称号id*/
	public titleId:number;

	/*积分,只有3525中isNew是1时候才读*/
	public score:number;

public write(b){
let len;
b.writeUint32(this.id);
b.writeUTFString(this.headUrl||"");
b.writeUTFString(this.name||"");
b.writeUint16(this.lv);
b.writeUint32(this.plus);
b.writeUint16(this.rank);
b.writeUint32(this.accountId);
b.writeUint8(this.titleId);
b.writeUint32(this.score);

}
public read(b){
let len;
this.id=b.readUint32()
this.headUrl=b.readUTFString()
this.name=b.readUTFString()
this.lv=b.readUint16()
this.plus=b.readUint32()
this.rank=b.readUint16()
this.accountId=b.readUint32()
this.titleId=b.readUint8()
this.score=b.readUint32()

}
	constructor(){}
}/*获取竞技场列表 协议id:3059*/
export class JjcList_req{
public protoid:number = 3059
public write(b){
let len;

}
	constructor(){}
}/*获取竞技场列表 协议id:3060*/
export class JjcList_revc{
public protoid:number = 3060
	/*玩家列表*/
	public playerList:stJjcPlayer[];

public read(b){
let len;
this.playerList=this.playerList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stJjcPlayer()
item.read(b);
this.playerList.push(item);

}

}
	constructor(){}
}/*获取竞技场挑战列表 协议id:3061*/
export class JjcRefreshList_req{
public protoid:number = 3061
public write(b){
let len;

}
	constructor(){}
}/*获取竞技场挑战列表 3061的时候需要处理) 协议id:3062*/
export class JjcRefreshList_revc{
public protoid:number = 3062
	/*玩家列表*/
	public playerList:stJjcPlayer[];

public read(b){
let len;
this.playerList=this.playerList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stJjcPlayer()
item.read(b);
this.playerList.push(item);

}

}
	constructor(){}
}/*竞技场个人信息 协议id:3065*/
export class JjcInfo_revc{
public protoid:number = 3065
	/*挑战次数自动刷新的时间戳*/
	public fightRefreshTime:number;

public read(b){
let len;
this.fightRefreshTime=b.readUint32()

}
	constructor(){}
}/*竞技场战斗 协议id:3066*/
export class JjcFight_req{
public protoid:number = 3066
	/*玩家id*/
	public playerId:number;

public write(b){
let len;
b.writeUint32(this.playerId);

}
	constructor(){}
}/*竞技场战斗结果 协议id:3067*/
export class JjcFight_revc{
public protoid:number = 3067
	/*0竞技场 1巅峰竞技场 2星星争夺战 3积分制竞技场*/
	public type:number;

	/*战斗数据*/
	public fightVo:stFightVo=new stFightVo();

	/*1赢 0输*/
	public win:number;

	/*名次变化值 失败为0*/
	public upval:number;

	/*敌方名次或星星变化 type=2的时候显示敌方星星减少数量*/
	public downval:number;

	/*敌方信息*/
	public enemyInfo:stJjcPlayer=new stJjcPlayer();

public read(b){
let len;
this.type=b.readUint8()
this.fightVo.read(b);
this.win=b.readUint8()
this.upval=b.readInt16()
this.downval=b.readInt16()
this.enemyInfo.read(b);

}
	constructor(){}
}/*竞技场战斗日志数据结构*/
export class stJjcLog{
	/*时间戳*/
	public time:number;

	/*是否发起者 1 是 0 否*/
	public atk:number;

	/*玩家名*/
	public playerName:string;

	/*自己的排名/自己的积分*/
	public rank:number;

	/*变化的排名/变化的积分*/
	public changeVal:number;

	/*headUrl*/
	public headUrl:string;

	/*战斗力*/
	public plus:number;

	/*是否打赢 0输了 1赢了*/
	public win:number;

public write(b){
let len;
b.writeUint32(this.time);
b.writeUint8(this.atk);
b.writeUTFString(this.playerName||"");
b.writeUint16(this.rank);
b.writeInt16(this.changeVal);
b.writeUTFString(this.headUrl||"");
b.writeUint32(this.plus);
b.writeUint8(this.win);

}
public read(b){
let len;
this.time=b.readUint32()
this.atk=b.readUint8()
this.playerName=b.readUTFString()
this.rank=b.readUint16()
this.changeVal=b.readInt16()
this.headUrl=b.readUTFString()
this.plus=b.readUint32()
this.win=b.readUint8()

}
	constructor(){}
}/*竞技场战斗日志 协议id:3068*/
export class JjcFightLog_req{
public protoid:number = 3068
public write(b){
let len;

}
	constructor(){}
}/*竞技场战斗日志 协议id:3069*/
export class JjcFightLog_revc{
public protoid:number = 3069
	/*日志列表*/
	public loglist:stJjcLog[];

public read(b){
let len;
this.loglist=this.loglist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stJjcLog()
item.read(b);
this.loglist.push(item);

}

}
	constructor(){}
}/*获取玩家信息 协议id:3070*/
export class WatchPlayerInfo_req{
public protoid:number = 3070
	/*玩家id*/
	public playerId:number;

public write(b){
let len;
b.writeUint32(this.playerId);

}
	constructor(){}
}/*当前坐骑信息*/
export class stRideInfo{
	/*坐骑基础信息*/
	public baseInfo:stRideVo=new stRideVo();

	/*属性信息*/
	public attr:stEquipItem[];

public write(b){
let len;
this.baseInfo.write(b);

this.attr=this.attr||[];
len = this.attr.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.attr[i].write(b);
}

}
public read(b){
let len;
this.baseInfo.read(b);
this.attr=this.attr||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stEquipItem()
item.read(b);
this.attr.push(item);

}

}
	constructor(){}
}/*当前翅膀信息*/
export class stWing{
	/*翅膀id*/
	public wingId:number;

	/*翅膀*/
	public stage:number;

	/*翅膀level*/
	public level:number;

	/*翅膀treasureStage*/
	public treasureStage:number;

	/*翅膀战斗力*/
	public power:number;

public write(b){
let len;
b.writeUint32(this.wingId);
b.writeUint32(this.stage);
b.writeUint32(this.level);
b.writeUint32(this.treasureStage);
b.writeUint32(this.power);

}
public read(b){
let len;
this.wingId=b.readUint32()
this.stage=b.readUint32()
this.level=b.readUint32()
this.treasureStage=b.readUint32()
this.power=b.readUint32()

}
	constructor(){}
}/*竞技场当前法阵信息*/
export class stGemArena{
	/*当前法阵id*/
	public formationId:number;

	/*宝石信息*/
	public Gem:stGem[];

public write(b){
let len;
b.writeUint8(this.formationId);

this.Gem=this.Gem||[];
len = this.Gem.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.Gem[i].write(b);
}

}
public read(b){
let len;
this.formationId=b.readUint8()
this.Gem=this.Gem||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stGem()
item.read(b);
this.Gem.push(item);

}

}
	constructor(){}
}/*竞技场当前战魂信息*/
export class stSpiritInfo{
	/*战魂的id*/
	public spiritId:number;

	/*战魂的位置*/
	public pos:number;

	/*战魂的等级*/
	public level:number;

public write(b){
let len;
b.writeUint8(this.spiritId);
b.writeUint8(this.pos);
b.writeUint8(this.level);

}
public read(b){
let len;
this.spiritId=b.readUint8()
this.pos=b.readUint8()
this.level=b.readUint8()

}
	constructor(){}
}/*竞技场当前战魂信息*/
export class stSpiritArena{
	/*战魂的信息*/
	public spiritInfo:stSpiritInfo[];

	/*战魂随机属性列表*/
	public attrList:stEquipAttr[];

public write(b){
let len;

this.spiritInfo=this.spiritInfo||[];
len = this.spiritInfo.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.spiritInfo[i].write(b);
}

this.attrList=this.attrList||[];
len = this.attrList.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.attrList[i].write(b);
}

}
public read(b){
let len;
this.spiritInfo=this.spiritInfo||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stSpiritInfo()
item.read(b);
this.spiritInfo.push(item);

}
this.attrList=this.attrList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stEquipAttr()
item.read(b);
this.attrList.push(item);

}

}
	constructor(){}
}/*竞技场当前武馆信息*/
export class stGymArena{
	/*武馆场馆属性列表*/
	public gymAttrList:stEquipAttr[];

	/*武馆神识属性列表*/
	public roomAttrList:stEquipAttr[];

public write(b){
let len;

this.gymAttrList=this.gymAttrList||[];
len = this.gymAttrList.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.gymAttrList[i].write(b);
}

this.roomAttrList=this.roomAttrList||[];
len = this.roomAttrList.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.roomAttrList[i].write(b);
}

}
public read(b){
let len;
this.gymAttrList=this.gymAttrList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stEquipAttr()
item.read(b);
this.gymAttrList.push(item);

}
this.roomAttrList=this.roomAttrList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stEquipAttr()
item.read(b);
this.roomAttrList.push(item);

}

}
	constructor(){}
}/*竞技场当前福佑信息*/
export class stBlessingArena{
	/*装备的哪些福佑信息*/
	public attrList:stEquipAttr[];

public write(b){
let len;

this.attrList=this.attrList||[];
len = this.attrList.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.attrList[i].write(b);
}

}
public read(b){
let len;
this.attrList=this.attrList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stEquipAttr()
item.read(b);
this.attrList.push(item);

}

}
	constructor(){}
}/*获取玩家信息 协议id:3071*/
export class WatchPlayerInfo_revc{
public protoid:number = 3071
	/*角色昵称*/
	public NickName:string;

	/*头像*/
	public HeadUrl:string;

	/*等级*/
	public Level:number;

	/*竞技场对手形象*/
	public PlayerSkin:stSkin=new stSkin();

	/*基础信息*/
	public moneyInfo:stCellValue[];

	/*初始化的装备信息*/
	public equipItem:stEquipItem[];

	/*翅膀*/
	public wing:stWing=new stWing();

	/*坐骑*/
	public ride:stRideInfo[];

	/*竞技场的当前排名*/
	public rank:number;

	/*宝石信息*/
	public Gem:stGemArena=new stGemArena();

	/*神兵信息(只有一条,没有为空)*/
	public Artifact:stArtifact[];

	/*战魂信息*/
	public Spirit:stSpiritArena=new stSpiritArena();

	/*武馆信息*/
	public Gym:stGymArena=new stGymArena();

	/*福佑信息*/
	public Blessing:stBlessingArena=new stBlessingArena();

	/*福佑穿戴中背包的道具信息*/
	public bagInfo:stItem[];

	/*福佑背包中装备属性信息*/
	public bagInfoAttr:stItemEquipAttr[];

	/*称号*/
	public titleId:number;

	/*玩家上阵的宠物信息(只有一条,没有为空)*/
	public petInfo:stPet[];

public read(b){
let len;
this.NickName=b.readUTFString()
this.HeadUrl=b.readUTFString()
this.Level=b.readUint16()
this.PlayerSkin.read(b);
this.moneyInfo=this.moneyInfo||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stCellValue()
item.read(b);
this.moneyInfo.push(item);

}
this.equipItem=this.equipItem||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stEquipItem()
item.read(b);
this.equipItem.push(item);

}
this.wing.read(b);
this.ride=this.ride||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stRideInfo()
item.read(b);
this.ride.push(item);

}
this.rank=b.readUint16()
this.Gem.read(b);
this.Artifact=this.Artifact||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stArtifact()
item.read(b);
this.Artifact.push(item);

}
this.Spirit.read(b);
this.Gym.read(b);
this.Blessing.read(b);
this.bagInfo=this.bagInfo||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stItem()
item.read(b);
this.bagInfo.push(item);

}
this.bagInfoAttr=this.bagInfoAttr||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stItemEquipAttr()
item.read(b);
this.bagInfoAttr.push(item);

}
this.titleId=b.readUint8()
this.petInfo=this.petInfo||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stPet()
item.read(b);
this.petInfo.push(item);

}

}
	constructor(){}
}/*竞技场领取,返回3025 0通用类型,3073 协议id:3072*/
export class JjcRewardGain_req{
public protoid:number = 3072
	/*0日奖励,1周奖励*/
	public type:number;

public write(b){
let len;
b.writeUint8(this.type);

}
	constructor(){}
}/*竞技场领取 协议id:3073*/
export class JjcRewardGain_revc{
public protoid:number = 3073
	/*日奖励 0不可领取 1可领取*/
	public day:number;

public read(b){
let len;
this.day=b.readUint8()

}
	constructor(){}
}/*获取竞技场列表,只推送列表中变化推送 协议id:3074*/
export class JjcListChange_revc{
public protoid:number = 3074
	/*玩家列表*/
	public playerList:stJjcPlayer[];

public read(b){
let len;
this.playerList=this.playerList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stJjcPlayer()
item.read(b);
this.playerList.push(item);

}

}
	constructor(){}
}/*购买挑战次数 协议id:3075*/
export class JjcBuyFightCnt_req{
public protoid:number = 3075
public write(b){
let len;

}
	constructor(){}
}/*购买挑战次数 协议id:3076*/
export class JjcBuyFightCnt_revc{
public protoid:number = 3076
	/*剩余免费次数*/
	public freeCnt:number;

	/*总共拥有的次数*/
	public totalCnt:number;

	/*已经购买了的次数(即当前挑战券总剩余)*/
	public buyCnt:number;

public read(b){
let len;
this.freeCnt=b.readUint32()
this.totalCnt=b.readUint32()
this.buyCnt=b.readUint32()

}
	constructor(){}
}/*金币更新 协议id:3077*/
export class JjcMoneyUpdate_revc{
public protoid:number = 3077
	/*当日已经获得金币*/
	public moneyVal:number;

public read(b){
let len;
this.moneyVal=b.readUint32()

}
	constructor(){}
}/*竞技场开启,关闭 协议id:3078*/
export class JjcOpen_revc{
public protoid:number = 3078
	/*0关闭 1开启*/
	public open:number;

public read(b){
let len;
this.open=b.readUint8()

}
	constructor(){}
}/*当前排名变化 协议id:3079*/
export class JjcRankChange_revc{
public protoid:number = 3079
	/*当天排名*/
	public rank:number;

public read(b){
let len;
this.rank=b.readUint16()

}
	constructor(){}
}/*状态结构*/
export class stTipsVo{
	/*类型 1 竞技场购买提醒 (重置为0的时间读配置表 重置的时候主动推送更新)*/
	public type:number;

	/*状态0,1*/
	public open:number;

public write(b){
let len;
b.writeUint8(this.type);
b.writeUint8(this.open);

}
public read(b){
let len;
this.type=b.readUint8()
this.open=b.readUint8()

}
	constructor(){}
}/*tips状态 协议id:3080*/
export class TipsVoList_revc{
public protoid:number = 3080
	/*列表*/
	public datalist:stTipsVo[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stTipsVo()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*tips状态 协议id:3081*/
export class TipsVoList_req{
public protoid:number = 3081
	/*状态值*/
	public data:stTipsVo=new stTipsVo();

public write(b){
let len;
this.data.write(b);

}
	constructor(){}
}export class stShopItem{
	/*商品fid*/
	public fid:number;

	/*0不可购买 1可购买*/
	public state:number;

public write(b){
let len;
b.writeUint8(this.fid);
b.writeUint8(this.state);

}
public read(b){
let len;
this.fid=b.readUint8()
this.state=b.readUint8()

}
	constructor(){}
}/*用虚拟货币购买商品 协议id:3082*/
export class BuyItem_req{
public protoid:number = 3082
	/*配置表中购买项的id*/
	public fid:number;

	/*类型 1 商城*/
	public type:number;

	/*购买数量*/
	public count:number;

public write(b){
let len;
b.writeUint16(this.fid);
b.writeUint8(this.type);
b.writeUint16(this.count);

}
	constructor(){}
}/*虚拟货币购买结果 协议id:3083*/
export class BuyItemResult_revc{
public protoid:number = 3083
	/*商品购买情况*/
	public data:stShopItem=new stShopItem();

public read(b){
let len;
this.data.read(b);

}
	constructor(){}
}export class stActivityStatus{
	/*流水号*/
	public uid:number;

	/*1开启 0关闭*/
	public status:number;

public write(b){
let len;
b.writeUint16(this.uid);
b.writeUint8(this.status);

}
public read(b){
let len;
this.uid=b.readUint16()
this.status=b.readUint8()

}
	constructor(){}
}export class stActivityCell{
	/*主功能对于的配置表id*/
	public id:number;

	/* 
    默认:
    参数 0不可领取 1已领取 2可领取 

    ///////////////////////////////////////////////
    Pack_Shop_Mart = 8,         //集市
    MeiRiLiBao = 4,             //每日礼包(日常礼包)
    活动类型是 	Pack_Supply = 10,//骑士补的时候
    活动类型是 TeHuiLiBao = 11,  //特惠礼包
    活动类型是  = 18,  //劳动节礼包

    代表已经购买了几次

    /////////////////////////////////////////////
    宝箱成长礼包(类型3),
    角色成长礼包(类型12)

    0不可领取(没达到条件) 1已领取(a奖励已领取 未充值) 2可领取(a奖励可领取 未充值) 3充值已领取(都领取了) 4充值了一个未领取 5充值了两个都没有领取

    ///////////////////////////////////////////////
    活动pack_id = 37,         //每日商城

    0代表未购买 >0代表已购买
    /////////////////////////////////////////////

    套餐活动
    0未满足解锁条件不可购买 1已充值已领取 2满足条件待充值 3子活动先购买套餐不可购买

    打包活动(一键购买)
    0不可以购买 1可购买

    */
	public param1:number;

public write(b){
let len;
b.writeUint16(this.id);
b.writeUint8(this.param1);

}
public read(b){
let len;
this.id=b.readUint16()
this.param1=b.readUint8()

}
	constructor(){}
}export class stActivity{
	/*流水号*/
	public uid:number;

	/*活动开始时间*/
	public starttime:number;

	/*活动结束时间 无结束为0*/
	public endtime:number;

	/*列表*/
	public datalist:stActivityCell[];

public write(b){
let len;
b.writeUint16(this.uid);
b.writeUint32(this.starttime);
b.writeUint32(this.endtime);

this.datalist=this.datalist||[];
len = this.datalist.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.datalist[i].write(b);
}

}
public read(b){
let len;
this.uid=b.readUint16()
this.starttime=b.readUint32()
this.endtime=b.readUint32()
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stActivityCell()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*活动列表 初始化一次 只发1已领取 2可领取 协议id:3084*/
export class ActivityList_revc{
public protoid:number = 3084
	/*列表*/
	public datalist:stActivity[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stActivity()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*活动数据变化的时候推送变量 或者活动数据主动变化的时候 协议id:3085*/
export class ActivityChange_revc{
public protoid:number = 3085
	/*0 代表只更新某一条,1 的代表整个datalist*/
	public type:number;

	/*列表*/
	public datalist:stActivity[];

public read(b){
let len;
this.type=b.readUint8()
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stActivity()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*活动状态数据列表,活动开启关闭变化的时候需要推送 协议id:3086*/
export class ActivityStatus_revc{
public protoid:number = 3086
	/*列表*/
	public datalist:stActivityStatus[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stActivityStatus()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*领取 协议id:3087*/
export class ActivityAction_req{
public protoid:number = 3087
	/*流水号*/
	public uid:number;

	/*功能对于的配置表id
            Pack_Shop_Mart = 8,//集市 刷新传0

    */
	public id:number;

	/*额外信息参数(字符串为了后期扩展),默认未空。
        pack_id = 28,每日转盘从广告过来传1，领取双倍奖励
    */
	public extra:string;

public write(b){
let len;
b.writeUint16(this.uid);
b.writeUint16(this.id);
b.writeUTFString(this.extra||"");

}
	constructor(){}
}export class stActivityRed{
	/*流水号*/
	public uid:number;

	/*功能对应的配置表id*/
	public id:number;

	/*红点 0无 1有红点*/
	public red:number;

public write(b){
let len;
b.writeUint16(this.uid);
b.writeUint16(this.id);
b.writeUint8(this.red);

}
public read(b){
let len;
this.uid=b.readUint16()
this.id=b.readUint16()
this.red=b.readUint8()

}
	constructor(){}
}/*红点列表 初始化时候的红点列表 只推送red=1的数据 协议id:3088*/
export class ActivityRedListInit_req{
public protoid:number = 3088
	/*列表*/
	public datalist:stActivityRed[];

public write(b){
let len;

this.datalist=this.datalist||[];
len = this.datalist.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.datalist[i].write(b);
}

}
	constructor(){}
}/*红点列表 红点变化时候推送 协议id:3089*/
export class ActivityRedListChange_revc{
public protoid:number = 3089
	/*列表*/
	public datalist:stActivityRed[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stActivityRed()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*三国集市刷新 协议id:3092*/
export class SaoMarkRefresh_req{
public protoid:number = 3092
	/*流水号*/
	public uid:number;

public write(b){
let len;
b.writeUint16(this.uid);

}
	constructor(){}
}/*购买翅膀 协议id:3093*/
export class BuyWing_req{
public protoid:number = 3093
	/*翅膀id*/
	public wingId:number;

public write(b){
let len;
b.writeUint8(this.wingId);

}
	constructor(){}
}/*订单请求 协议id:3094*/
export class RechargeBill_req{
public protoid:number = 3094
	/*充值表id*/
	public id:number;

public write(b){
let len;
b.writeUint32(this.id);

}
	constructor(){}
}/*订单请求 协议id:3095*/
export class RechargeBill_revc{
public protoid:number = 3095
	/*充值表id*/
	public id:number;

	/*签名*/
	public val:string;

public read(b){
let len;
this.id=b.readUint32()
this.val=b.readUTFString()

}
	constructor(){}
}/*换装请求 协议id:3096*/
export class reloadEquip_req{
public protoid:number = 3096
	/*equipStyle*/
	public type:number;

	/*装备形象id t_Equipment_Assets_ID t_Enemy_Image,id=0的时候重置为未换装时候的装备*/
	public id:number;

public write(b){
let len;
b.writeUint8(this.type);
b.writeUint8(this.id);

}
	constructor(){}
}export class stReloadEquip{
	/*EEquipType装备类型*/
	public type:number;

	/*形象id列表 列表中索引0的为未换装前的形象id*/
	public dataList:number[];

public write(b){
let len;
b.writeUint8(this.type);

this.dataList=this.dataList||[];
len = this.dataList.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
b.writeUint8(this.dataList[i]);
}

}
public read(b){
let len;
this.type=b.readUint8()
this.dataList=this.dataList||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.dataList.push(b.readUint8())
}

}
	constructor(){}
}/*换装列表（全部） 协议id:3097*/
export class reloadEquip_revc{
public protoid:number = 3097
	/*列表 */
	public datalist:stReloadEquip[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stReloadEquip()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*激活中的套装列表 协议id:3098*/
export class suitEquipList_revc{
public protoid:number = 3098
	/*套装列表 t_Custom_Costumes的f_Costumesid*/
	public datalist:number[];

public read(b){
let len;
this.datalist=this.datalist||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.datalist.push(b.readUint16())
}

}
	constructor(){}
}/*激活中的套装 协议id:3099*/
export class suitEquip_req{
public protoid:number = 3099
	/*套装列表 t_Custom_Costumes的f_Costumesid*/
	public id:number;

public write(b){
let len;
b.writeUint16(this.id);

}
	constructor(){}
}/*弹出窗口的的操作 协议id:3101*/
export class popWin_req{
public protoid:number = 3101
	/*流水号*/
	public uid:number;

public write(b){
let len;
b.writeUint16(this.uid);

}
	constructor(){}
}export class stPopWin{
	/*流水号 对应配置表t_Pack_Controller的f_id*/
	public uid:number;

	/*0 ,下次可弹窗的时间 根据充值时间计算*/
	public time:number;

	/*0隐藏icon 1显示icon*/
	public iconStatus:number;

	/*icon执行隐藏的时候的时间戳
                                                      充值成功到账icon直接消失 未充值等10分钟消失锁其他的 3101*/
	public iconHideTime:number;

public write(b){
let len;
b.writeUint16(this.uid);
b.writeUint32(this.time);
b.writeUint8(this.iconStatus);
b.writeUint32(this.iconHideTime);

}
public read(b){
let len;
this.uid=b.readUint16()
this.time=b.readUint32()
this.iconStatus=b.readUint8()
this.iconHideTime=b.readUint32()

}
	constructor(){}
}/*弹出窗口的的操作 协议id:3102*/
export class popWin_revc{
public protoid:number = 3102
	/*列表,列表中最后一条就是最近操作的一条数据*/
	public datalist:stPopWin[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stPopWin()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}export class stStyle{
	/*部位id 装备类型*/
	public id:number;

	/*样式*/
	public style:number;

public write(b){
let len;
b.writeUint8(this.id);
b.writeUint16(this.style);

}
public read(b){
let len;
this.id=b.readUint8()
this.style=b.readUint16()

}
	constructor(){}
}/*形象更新 3010初始化的全来一次 列表中style的值不会是0 协议id:3103*/
export class StyleUpdate_revc{
public protoid:number = 3103
	/*列表*/
	public datalist:stStyle[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stStyle()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*换装列表请求 返回 3097列表所有数据 协议id:3104*/
export class GetEquipSkinList_req{
public protoid:number = 3104
public write(b){
let len;

}
	constructor(){}
}/*商场现金购买过的商品f_id列表 协议id:3105*/
export class ShopBoughtItems_revc{
public protoid:number = 3105
	/*列表*/
	public datalist:stShopItem[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stShopItem()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*使用道具 协议id:3106*/
export class UseItem_req{
public protoid:number = 3106
	/*使用场景0通用场景 1神识 2宝箱*/
	public type:number;

	/*物品列表*/
	public itemlist:stCellValue[];

public write(b){
let len;
b.writeUint8(this.type);

this.itemlist=this.itemlist||[];
len = this.itemlist.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.itemlist[i].write(b);
}

}
	constructor(){}
}/*道具不足 协议id:3107*/
export class ItemNotEnoughCode_revc{
public protoid:number = 3107
	/*t_item配置的f_itemid*/
	public id:number;

public read(b){
let len;
this.id=b.readUint32()

}
	constructor(){}
}/*已经使用了多少宝箱的数量,3010之前推一次,之后有变化推送一次 协议id:3108*/
export class BoxUsedCount_revc{
public protoid:number = 3108
	/*数量*/
	public val:number;

public read(b){
let len;
this.val=b.readUint32()

}
	constructor(){}
}/*武馆信息 协议id:3109*/
export class GymInfo_revc{
public protoid:number = 3109
	/*当前已经所在的id t_Gym_Map配置*/
	public curMapId:number;

	/*解锁的最高mapid t_Gym_Map配置*/
	public mapId:number;

public read(b){
let len;
this.curMapId=b.readUint8()
this.mapId=b.readUint8()

}
	constructor(){}
}/*武馆-解锁地区 3109更新 协议id:3110*/
export class GymLock_req{
public protoid:number = 3110
public write(b){
let len;

}
	constructor(){}
}/*武馆-前往地区 3109更新 协议id:3111*/
export class GymGoto_req{
public protoid:number = 3111
	/*地区id t_Gym_Map配置*/
	public mapId:number;

public write(b){
let len;
b.writeUint8(this.mapId);

}
	constructor(){}
}/*武馆-邀请 协议id:3112*/
export class GymInvite_req{
public protoid:number = 3112
	/*邀请函物品id（23-自动恢复的邀请函，100-玩家购买的邀请函）*/
	public invitionIds:number[];

	/*信物列表*/
	public itemIds:number[];

	/*1邀请一人 2邀请五人*/
	public type:number;

public write(b){
let len;

this.invitionIds=this.invitionIds||[];
len = this.invitionIds.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
b.writeUint8(this.invitionIds[i]);
}

this.itemIds=this.itemIds||[];
len = this.itemIds.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
b.writeUint32(this.itemIds[i]);
}
b.writeUint8(this.type);

}
	constructor(){}
}/*武馆-邀请数据*/
export class stGymInvite{
	/*状态 0 演武完走人 1 演武完展示传承界面 2 演武完展示领取奖励界面*/
	public result:number;

	/*0 江湖人士 1 英雄*/
	public type:number;

	/*英雄id*/
	public heroId:number;

	/*结束时间戳(毫秒)*/
	public endtime:uint64=new uint64();

	/*传承物品*/
	public item:stGymEquip=new stGymEquip();

	/*加速时间，0表示没有加速(毫秒)*/
	public speedUpTime:number;

public write(b){
let len;
b.writeUint8(this.result);
b.writeUint8(this.type);
b.writeUint8(this.heroId);
this.endtime.write(b);
this.item.write(b);
b.writeUint32(this.speedUpTime);

}
public read(b){
let len;
this.result=b.readUint8()
this.type=b.readUint8()
this.heroId=b.readUint8()
this.endtime.read(b);
this.item.read(b);
this.speedUpTime=b.readUint32()

}
	constructor(){}
}export class stGymEquip{
	/*0-江湖人士 1-将领型 2-巾帼型 3-君主型 4-谋士型*/
	public heroType:number;

	/*英雄id t_Gym_NPC_MiscList表中的f_MiscNPCID  注意：江湖人士中的隐世高手也有heroId*/
	public heroId:number;

	/*流水号id*/
	public uid:number;

	/*奖励物品列表 传承道具和悟性道具*/
	public itemlist:stCellValue[];

	/*属性列表*/
	public attrList:stEquipAttr[];

	/*完整度*/
	public degree:number;

public write(b){
let len;
b.writeUint8(this.heroType);
b.writeUint8(this.heroId);
b.writeUint32(this.uid);

this.itemlist=this.itemlist||[];
len = this.itemlist.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.itemlist[i].write(b);
}

this.attrList=this.attrList||[];
len = this.attrList.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.attrList[i].write(b);
}
b.writeUint16(this.degree);

}
public read(b){
let len;
this.heroType=b.readUint8()
this.heroId=b.readUint8()
this.uid=b.readUint32()
this.itemlist=this.itemlist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stCellValue()
item.read(b);
this.itemlist.push(item);

}
this.attrList=this.attrList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stEquipAttr()
item.read(b);
this.attrList.push(item);

}
this.degree=b.readUint16()

}
	constructor(){}
}/*武馆-邀请返回气泡 协议id:3113*/
export class GymInvite_revc{
public protoid:number = 3113
	/*列表 失败数组长度为0*/
	public itemlist:stGymInvite[];

public read(b){
let len;
this.itemlist=this.itemlist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stGymInvite()
item.read(b);
this.itemlist.push(item);

}

}
	constructor(){}
}/*武馆-遗忘 演武完直接走掉、武将遗忘、江湖人士打赏都走 协议id:3114*/
export class GymForgetEquip_req{
public protoid:number = 3114
	/*流水号id*/
	public uid:number;

public write(b){
let len;
b.writeUint32(this.uid);

}
	constructor(){}
}/*武馆-替换 协议id:3115*/
export class GymSwicthEquip_req{
public protoid:number = 3115
	/*被换的流水号id*/
	public oldUid:number;

	/*需要被换流水号id*/
	public newUid:number;

public write(b){
let len;
b.writeUint32(this.oldUid);
b.writeUint32(this.newUid);

}
	constructor(){}
}/*武馆-神识信息 3010推送一次 协议id:3116*/
export class GymEquipInit_revc{
public protoid:number = 3116
	/*列表*/
	public datalist:stGymEquip[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stGymEquip()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*武馆-神识信息 改变推送 协议id:3117*/
export class GymEquipChange_revc{
public protoid:number = 3117
	/*列表*/
	public datalist:stGymEquip[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stGymEquip()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*竞技场 协议id:3118*/
export class JjcSucceedReward_revc{
public protoid:number = 3118
	/*战斗奖励类型 0竞技场(巅峰竞技有自己的协议) 1星星争夺战*/
	public type:number;

	/*挑战成功的时候可以获得的奖品列表*/
	public succeedRewardList:stCellValue[];

public read(b){
let len;
this.type=b.readUint8()
this.succeedRewardList=this.succeedRewardList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stCellValue()
item.read(b);
this.succeedRewardList.push(item);

}

}
	constructor(){}
}/*竞技场剩余刷新的次数,初始化及其变化推送 协议id:3119*/
export class JjcSurplusRefreshCount_revc{
public protoid:number = 3119
	/*次数*/
	public val:number;

public read(b){
let len;
this.val=b.readUint8()

}
	constructor(){}
}/*手动竞技场挑战列表 协议id:3120*/
export class JjcActiveRefresh_req{
public protoid:number = 3120
public write(b){
let len;

}
	constructor(){}
}/*获取竞技场周排名信息 协议id:3121*/
export class JjcWeekInfo_req{
public protoid:number = 3121
public write(b){
let len;

}
	constructor(){}
}/*获取竞技场周排名信息 协议id:3122*/
export class JjcWeekInfo_revc{
public protoid:number = 3122
	/*当前周排名 无排名就是0,
                                            -1的的时候，客户端不处理当前的排名*/
	public rank:number;

	/*0不可领 1可领取 2已领取*/
	public rewardStatus:number;

public read(b){
let len;
this.rank=b.readFloat64()
this.rewardStatus=b.readUint8()

}
	constructor(){}
}export class stGymUpgradeInfo{
	/*设备id*/
	public id:number;

	/*各设备表的f_id*/
	public fid:number;

	/*设施升级完成的任务数（仅升级演武台需要）*/
	public taskVal:number;

public write(b){
let len;
b.writeUint8(this.id);
b.writeUint8(this.fid);
b.writeUint16(this.taskVal);

}
public read(b){
let len;
this.id=b.readUint8()
this.fid=b.readUint8()
this.taskVal=b.readUint16()

}
	constructor(){}
}/*武馆设备的等级信息列表（在初始化3010前推一次，其他变化推3125） 协议id:3123*/
export class GymFacilityList_revc{
public protoid:number = 3123
	/*列表*/
	public datalist:stGymUpgradeInfo[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stGymUpgradeInfo()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*武馆升级设备 协议id:3124*/
export class GymUpgrade_req{
public protoid:number = 3124
	/*设备id*/
	public id:number;

public write(b){
let len;
b.writeUint8(this.id);

}
	constructor(){}
}/*武馆升级设备 协议id:3125*/
export class GymUpgrade_revc{
public protoid:number = 3125
	/*设备升级后的等级信息*/
	public upgradeInfo:stGymUpgradeInfo=new stGymUpgradeInfo();

public read(b){
let len;
this.upgradeInfo.read(b);

}
	constructor(){}
}/*武馆-遗忘 武馆-替换引起的气泡删除3113操作 协议id:3126*/
export class GymForgetEquip_revc{
public protoid:number = 3126
	/*流水号id*/
	public uid:number;

public read(b){
let len;
this.uid=b.readUint32()

}
	constructor(){}
}/*拉取活动信息 返回3085 协议id:3127*/
export class ActivityGetInfo_req{
public protoid:number = 3127
	/*流水号id*/
	public uid:number;

public write(b){
let len;
b.writeUint32(this.uid);

}
	constructor(){}
}/*武馆神识升级 协议id:3129*/
export class GymRoomUpgrade_req{
public protoid:number = 3129
public write(b){
let len;

}
	constructor(){}
}/*武馆神识等级 协议id:3130*/
export class GymRoomLevel_revc{
public protoid:number = 3130
	/*神识的格子数量起始为0*/
	public level:number;

	/*第六个格子升级结束时间戳，没有传0*/
	public time:number;

public read(b){
let len;
this.level=b.readUint8()
this.time=b.readUint32()

}
	constructor(){}
}export class stGymFacilityRefinementInfo{
	/*洗练词条的穿戴状态 1穿戴着 2未穿戴*/
	public wearable:number;

	/*属性列表*/
	public attrList:stEquipAttr[];

public write(b){
let len;
b.writeUint8(this.wearable);

this.attrList=this.attrList||[];
len = this.attrList.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.attrList[i].write(b);
}

}
public read(b){
let len;
this.wearable=b.readUint8()
this.attrList=this.attrList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stEquipAttr()
item.read(b);
this.attrList.push(item);

}

}
	constructor(){}
}export class stGymFacilityRefinement{
	/*设备id*/
	public id:number;

	/*洗练词条列表*/
	public datalist:stGymFacilityRefinementInfo[];

public write(b){
let len;
b.writeUint8(this.id);

this.datalist=this.datalist||[];
len = this.datalist.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.datalist[i].write(b);
}

}
public read(b){
let len;
this.id=b.readUint8()
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stGymFacilityRefinementInfo()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*武馆设施洗练列表（在初始化3010前推一次，其他变化推3133） 协议id:3131*/
export class GymFacilityRefinementList_revc{
public protoid:number = 3131
	/*设施洗练列表*/
	public datalist:stGymFacilityRefinement[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stGymFacilityRefinement()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*武馆设施洗练 协议id:3132*/
export class GymFacilityRefinement_req{
public protoid:number = 3132
	/*操作类型 1洗练 2替换*/
	public type:number;

	/*t_Gym_refinement_Config.xlsx 使用f_CostType数组索引中哪个道具进行洗练 可用参数0,1*/
	public usetype:number;

	/*设备id*/
	public id:number;

public write(b){
let len;
b.writeUint8(this.type);
b.writeUint8(this.usetype);
b.writeUint8(this.id);

}
	constructor(){}
}/*武馆设施洗练 协议id:3133*/
export class GymFacilityRefinement_revc{
public protoid:number = 3133
	/*设施洗练列表 替换则数组长度未0*/
	public datalist:stGymFacilityRefinement[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stGymFacilityRefinement()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}export class stGymMission{
	/*t_Gym_Mission_List表f_id*/
	public fid:number;

	/*任务完成数量*/
	public count:number;

	/*奖励领取状态 0未领取 1已领取*/
	public rewardStatus:number;

public write(b){
let len;
b.writeUint32(this.fid);
b.writeUint16(this.count);
b.writeUint8(this.rewardStatus);

}
public read(b){
let len;
this.fid=b.readUint32()
this.count=b.readUint16()
this.rewardStatus=b.readUint8()

}
	constructor(){}
}/*武馆任务列表（在初始化3010前、和刷新任务时推，其他变化推3135） 协议id:3134*/
export class GymMissionList_revc{
public protoid:number = 3134
	/*任务列表*/
	public datalist:stGymMission[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stGymMission()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*武馆任务变化（任务数量、奖励领取状态） 协议id:3135*/
export class GymMissionUpdate_revc{
public protoid:number = 3135
	/*变化后任务*/
	public datalist:stGymMission[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stGymMission()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*领取武馆任务奖励（返回3135） 协议id:3136*/
export class GymMissionReward_req{
public protoid:number = 3136
	/*t_Gym_Mission_List表f_id*/
	public fid:number;

public write(b){
let len;
b.writeUint32(this.fid);

}
	constructor(){}
}/*用刷新券刷新单项任务（返回3266） 协议id:3137*/
export class GymMissionRefresh_req{
public protoid:number = 3137
	/*t_Gym_Mission_List表f_id*/
	public fid:number;

	/*任务的索引*/
	public index:number;

public write(b){
let len;
b.writeUint32(this.fid);
b.writeUint8(this.index);

}
	constructor(){}
}/*福佑最高等级返回的奖励 协议id:3154*/
export class BlessingMaxLevelRewards_revc{
public protoid:number = 3154
	/*item表的id*/
	public id:number;

	/*item物品等级*/
	public level:number;

	/*福佑最高等级返回的奖励内容*/
	public rewards:stItemEquipAttr[];

public read(b){
let len;
this.id=b.readUint32()
this.level=b.readUint16()
this.rewards=this.rewards||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stItemEquipAttr()
item.read(b);
this.rewards.push(item);

}

}
	constructor(){}
}/*获取当前福佑的等级,返回3161 协议id:3155*/
export class BlessingLevel_req{
public protoid:number = 3155
public write(b){
let len;

}
	constructor(){}
}/*物品数据*/
export class stItem{
	/*背包类型 0无序的福佑背包 1有序福佑装备背包*/
	public type:number;

	/*道具的流水号*/
	public uid:uint64=new uint64();

	/*item表的id*/
	public id:number;

	/*item物品等级*/
	public level:number;

	/*位置,0标识不需要位置,大于0 说明是背包中的位置*/
	public pos:number;

	/*0往原先列表里面增加数据 1更新数据*/
	public actionType:number;

	/*道具数量*/
	public count:number;

	/*副将id 对应t_Chief_List.xlsx的f_cheifid*/
	public cheifId:number;

public write(b){
let len;
b.writeUint8(this.type);
this.uid.write(b);
b.writeUint32(this.id);
b.writeUint16(this.level);
b.writeUint16(this.pos);
b.writeUint8(this.actionType);
b.writeUint16(this.count);
b.writeUint16(this.cheifId);

}
public read(b){
let len;
this.type=b.readUint8()
this.uid.read(b);
this.id=b.readUint32()
this.level=b.readUint16()
this.pos=b.readUint16()
this.actionType=b.readUint8()
this.count=b.readUint16()
this.cheifId=b.readUint16()

}
	constructor(){}
}/*物品数据装备属性*/
export class stItemEquipAttr{
	/*道具的流水号*/
	public uid:uint64=new uint64();

	/*属性列表*/
	public attrList:stEquipAttr[];

public write(b){
let len;
this.uid.write(b);

this.attrList=this.attrList||[];
len = this.attrList.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.attrList[i].write(b);
}

}
public read(b){
let len;
this.uid.read(b);
this.attrList=this.attrList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stEquipAttr()
item.read(b);
this.attrList.push(item);

}

}
	constructor(){}
}/*删除背包物品*/
export class stItemRem{
	/*道具的流水号*/
	public uid:uint64=new uint64();

	/*背包类型 0无序的福佑背包 1有序福佑装备背包*/
	public type:number;

public write(b){
let len;
this.uid.write(b);
b.writeUint8(this.type);

}
public read(b){
let len;
this.uid.read(b);
this.type=b.readUint8()

}
	constructor(){}
}/*自动福佑请求 协议id:3157*/
export class BlessingAuto_req{
public protoid:number = 3157
	/*品质 item*/
	public qua:number;

	/*是否自动转化 0否; 1 是*/
	public isFlag:number;

	/*是否使用元宝 0 否; 1是*/
	public isPay:number;

public write(b){
let len;
b.writeUint8(this.qua);
b.writeUint8(this.isFlag);
b.writeUint8(this.isPay);

}
	constructor(){}
}/*福佑初始化 协议id:3158*/
export class BlessingInit_revc{
public protoid:number = 3158
	/*福佑每个背包的道具信息*/
	public bagInfo:stItem[];

	/*福佑背包中装备属性信息*/
	public bagInfoAttr:stItemEquipAttr[];

	/*还有多久可以免费使用*/
	public startTime:number;

	/*当前福佑的等级*/
	public level:number;

	/*剩余免费次数*/
	public count:number;

public read(b){
let len;
this.bagInfo=this.bagInfo||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stItem()
item.read(b);
this.bagInfo.push(item);

}
this.bagInfoAttr=this.bagInfoAttr||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stItemEquipAttr()
item.read(b);
this.bagInfoAttr.push(item);

}
this.startTime=b.readUint32()
this.level=b.readUint8()
this.count=b.readUint8()

}
	constructor(){}
}/*福佑变化 协议id:3159*/
export class BlessingChange_revc{
public protoid:number = 3159
	/*福佑每个背包的道具信息*/
	public bagInfo:stItem[];

	/*福佑背包中装备属性信息*/
	public bagInfoAttr:stItemEquipAttr[];

	/*还有多久可以免费使用*/
	public startTime:number;

	/*剩余免费次数*/
	public count:number;

public read(b){
let len;
this.bagInfo=this.bagInfo||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stItem()
item.read(b);
this.bagInfo.push(item);

}
this.bagInfoAttr=this.bagInfoAttr||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stItemEquipAttr()
item.read(b);
this.bagInfoAttr.push(item);

}
this.startTime=b.readUint32()
this.count=b.readUint8()

}
	constructor(){}
}/*单次福佑请求 协议id:3160*/
export class BlessingOnce_req{
public protoid:number = 3160
	/*是否使用元宝 0 否; 1是*/
	public isPay:number;

public write(b){
let len;
b.writeUint8(this.isPay);

}
	constructor(){}
}/*福佑结果 协议id:3161*/
export class BlessingRes_revc{
public protoid:number = 3161
	/*当前福佑的等级*/
	public level:number;

public read(b){
let len;
this.level=b.readUint8()

}
	constructor(){}
}/*转化福佑道具 协议id:3162*/
export class BlessingConvert_req{
public protoid:number = 3162
	/*需要转化的道具序列号*/
	public datalist:uint64[];

public write(b){
let len;

this.datalist=this.datalist||[];
len = this.datalist.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.datalist[i].write(b);
}

}
	constructor(){}
}/*福佑装备的穿戴 返回3159 协议id:3163*/
export class BlessingWear_req{
public protoid:number = 3163
	/*目标背包的类型*/
	public type:number;

	/*位置,穿的时候传位置,脱的时候传0*/
	public pos:number;

	/*操作物品的流水号*/
	public uid:uint64=new uint64();

	/*副将id 对应t_Chief_List.xlsx的f_cheifid*/
	public cheifId:number;

public write(b){
let len;
b.writeUint8(this.type);
b.writeUint16(this.pos);
this.uid.write(b);
b.writeUint16(this.cheifId);

}
	constructor(){}
}/*移除操作的返回 协议id:3164*/
export class BlessingItemRemove_revc{
public protoid:number = 3164
	/*删除背包信息,可以是多个*/
	public datalist:stItemRem[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stItemRem()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*福佑装备状态位更新 协议id:3165*/
export class BlessingSlotStatus_revc{
public protoid:number = 3165
	/*福佑背包的状态 0代表未解锁 1代表解锁*/
	public status:number;

public read(b){
let len;
this.status=b.readUint8()

}
	constructor(){}
}/*升级福佑道具 返回 3159 协议id:3166*/
export class BlessingLevelUp_req{
public protoid:number = 3166
	/*物品的流水号*/
	public uid:uint64=new uint64();

public write(b){
let len;
this.uid.write(b);

}
	constructor(){}
}/*福佑商城id 返回 3159 协议id:3167*/
export class BlessingShop_req{
public protoid:number = 3167
	/*商城id*/
	public id:number;

public write(b){
let len;
b.writeUint32(this.id);

}
	constructor(){}
}/*武馆商城购买(返回3025) 协议id:3168*/
export class GymShop_req{
public protoid:number = 3168
	/*t_Gym_Shop表f_id*/
	public fid:number;

public write(b){
let len;
b.writeUint32(this.fid);

}
	constructor(){}
}/*拉取列表 协议id:3169*/
export class GymInviteGetList_req{
public protoid:number = 3169
public write(b){
let len;

}
	constructor(){}
}/*解锁武将信息*/
export class stGymNpc{
	/*已解锁的武将id(t_Gym_NPC_List表的f_HeroID)*/
	public id:number;

	/*最高完整度*/
	public degree:number;

public write(b){
let len;
b.writeUint16(this.id);
b.writeUint16(this.degree);

}
public read(b){
let len;
this.id=b.readUint16()
this.degree=b.readUint16()

}
	constructor(){}
}/*武馆拉取羁绊列表(在初始化3010前推，其他变化推3172、3173） 协议id:3170*/
export class GymBondListInit_revc{
public protoid:number = 3170
	/*已激活的羁绊f_id(t_Gym_NPC_Bond表)*/
	public activedFids:number[];

	/*已解锁的武将id(t_Gym_NPC_List表的f_HeroID)*/
	public npcIds:stGymNpc[];

public read(b){
let len;
this.activedFids=this.activedFids||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.activedFids.push(b.readUint32())
}
this.npcIds=this.npcIds||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stGymNpc()
item.read(b);
this.npcIds.push(item);

}

}
	constructor(){}
}/*武馆激活羁绊 协议id:3171*/
export class GymBond_req{
public protoid:number = 3171
	/*激活的羁绊f_id(t_Gym_NPC_Bond表)*/
	public fid:number;

public write(b){
let len;
b.writeUint32(this.fid);

}
	constructor(){}
}/*武馆激活羁绊 协议id:3172*/
export class GymBondChange_revc{
public protoid:number = 3172
	/*激活的羁绊f_id(t_Gym_NPC_Bond表)*/
	public fid:number;

public read(b){
let len;
this.fid=b.readUint32()

}
	constructor(){}
}/*武馆激活武将 协议id:3173*/
export class GymBondNpcChange_revc{
public protoid:number = 3173
	/*解锁的武将id(t_Gym_NPC_List表的f_HeroID)*/
	public npcId:stGymNpc=new stGymNpc();

public read(b){
let len;
this.npcId.read(b);

}
	constructor(){}
}/*武馆邀请券恢复时间 协议id:3175*/
export class GymInvitation_req{
public protoid:number = 3175
public write(b){
let len;

}
	constructor(){}
}/*武馆邀请券恢复时间 协议id:3176*/
export class GymInvitation_revc{
public protoid:number = 3176
	/*下一次邀请券恢复时间戳，没有传0*/
	public nextRefreshTime:number;

public read(b){
let len;
this.nextRefreshTime=b.readUint32()

}
	constructor(){}
}/*武馆任务定时刷新 协议id:3177*/
export class GymMissionCronRefresh_req{
public protoid:number = 3177
public write(b){
let len;

}
	constructor(){}
}/*武馆场馆属性汇总（主界面） 协议id:3178*/
export class GymFacilitySummary_revc{
public protoid:number = 3178
	/*属性列表*/
	public attrList:stEquipAttr[];

public read(b){
let len;
this.attrList=this.attrList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stEquipAttr()
item.read(b);
this.attrList.push(item);

}

}
	constructor(){}
}/*武馆武魂属性汇总（主界面） 协议id:3179*/
export class GymRoomSummary_revc{
public protoid:number = 3179
	/*属性列表*/
	public attrList:stEquipAttr[];

public read(b){
let len;
this.attrList=this.attrList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stEquipAttr()
item.read(b);
this.attrList.push(item);

}

}
	constructor(){}
}/*地图任务解锁数据*/
export class stGymMapTasks{
	/*任务类型id*/
	public taskTypeId:number;

	/*参数数据*/
	public param:number;

public write(b){
let len;
b.writeUint32(this.taskTypeId);
b.writeUint32(this.param);

}
public read(b){
let len;
this.taskTypeId=b.readUint32()
this.param=b.readUint32()

}
	constructor(){}
}/*武馆地图任务解锁数据 协议id:3180*/
export class GymMapTasks_revc{
public protoid:number = 3180
	/*列表*/
	public list:stGymMapTasks[];

public read(b){
let len;
this.list=this.list||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stGymMapTasks()
item.read(b);
this.list.push(item);

}

}
	constructor(){}
}/*挂机主界面信息结构体*/
export class stAfk{
	/*挂机等级*/
	public level:number;

	/*挂机开始时间*/
	public startUnix:uint64=new uint64();

	/*挂机结束时间*/
	public endUnix:uint64=new uint64();

	/*待领取的奖励数据列表*/
	public rewardList:stCellValue[];

public write(b){
let len;
b.writeUint8(this.level);
this.startUnix.write(b);
this.endUnix.write(b);

this.rewardList=this.rewardList||[];
len = this.rewardList.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.rewardList[i].write(b);
}

}
public read(b){
let len;
this.level=b.readUint8()
this.startUnix.read(b);
this.endUnix.read(b);
this.rewardList=this.rewardList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stCellValue()
item.read(b);
this.rewardList.push(item);

}

}
	constructor(){}
}/*挂机主界面信息结构体*/
export class stAfkFast{
	/*快速侦察，看视频次数*/
	public fastAfkVideoNum:number;

	/*快速侦察，元宝购买次数*/
	public fastAfkBuyNum:number;

public write(b){
let len;
b.writeUint8(this.fastAfkVideoNum);
b.writeUint8(this.fastAfkBuyNum);

}
public read(b){
let len;
this.fastAfkVideoNum=b.readUint8()
this.fastAfkBuyNum=b.readUint8()

}
	constructor(){}
}/*挂机被邀请者结构体*/
export class stAfkInvitee{
	/*被邀请者头像*/
	public portrait:string;

	/*被邀请者过期时间*/
	public endUnix:number;

public write(b){
let len;
b.writeUTFString(this.portrait||"");
b.writeUint32(this.endUnix);

}
public read(b){
let len;
this.portrait=b.readUTFString()
this.endUnix=b.readUint32()

}
	constructor(){}
}/*挂机初始化（3010前推一次, 3234请求时返回） 协议id:3181*/
export class AfkInit_revc{
public protoid:number = 3181
	/*挂机主界面信息*/
	public mianData:stAfk=new stAfk();

	/*挂机快速挂机信息*/
	public fastData:stAfkFast=new stAfkFast();

	/*被邀请者列表*/
	public inviteeData:stAfkInvitee[];

	/*购买礼包过期时间*/
	public packEndUnix:number;

public read(b){
let len;
this.mianData.read(b);
this.fastData.read(b);
this.inviteeData=this.inviteeData||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stAfkInvitee()
item.read(b);
this.inviteeData.push(item);

}
this.packEndUnix=b.readUint32()

}
	constructor(){}
}/*挂机主界面信息变化 协议id:3182*/
export class AfkUpdate_revc{
public protoid:number = 3182
	/*挂机主界面信息*/
	public data:stAfk=new stAfk();

public read(b){
let len;
this.data.read(b);

}
	constructor(){}
}/*快速挂机信息变化 协议id:3183*/
export class AfkFastUpdate_revc{
public protoid:number = 3183
	/*快速挂机信息*/
	public data:stAfkFast=new stAfkFast();

public read(b){
let len;
this.data.read(b);

}
	constructor(){}
}/*挂机邀请信息变化 协议id:3184*/
export class AfkInviteeUpdate_revc{
public protoid:number = 3184
	/*被邀请者列表*/
	public inviteeList:stAfkInvitee[];

	/*挂机结束时间*/
	public endUnix:uint64=new uint64();

public read(b){
let len;
this.inviteeList=this.inviteeList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stAfkInvitee()
item.read(b);
this.inviteeList.push(item);

}
this.endUnix.read(b);

}
	constructor(){}
}/*挂机领取奖励（返回3182、3025） 协议id:3185*/
export class AfkReward_req{
public protoid:number = 3185
public write(b){
let len;

}
	constructor(){}
}/*快速挂机（返回3183） 协议id:3186*/
export class AfkFast_req{
public protoid:number = 3186
	/*0看视频，1使用元宝购买*/
	public type:number;

public write(b){
let len;
b.writeUint8(this.type);

}
	constructor(){}
}/*挂机邀请购买（返回3190） 协议id:3187*/
export class AfkInviteeBuy_req{
public protoid:number = 3187
public write(b){
let len;

}
	constructor(){}
}/*一个挂机结算周期结束（返回3182） 协议id:3188*/
export class AfkRewardTimeUp_req{
public protoid:number = 3188
public write(b){
let len;

}
	constructor(){}
}/*被邀请者过期（返回3184） 协议id:3189*/
export class AfkInviteeTimeUp_req{
public protoid:number = 3189
public write(b){
let len;

}
	constructor(){}
}/*挂机礼包信息变化 协议id:3190*/
export class AfkPackUpdate_revc{
public protoid:number = 3190
	/*购买礼包过期时间*/
	public packEndUnix:number;

	/*挂机结束时间*/
	public endUnix:uint64=new uint64();

public read(b){
let len;
this.packEndUnix=b.readUint32()
this.endUnix.read(b);

}
	constructor(){}
}/*邀请其他玩家（返回3184） 协议id:3191*/
export class AfkInvite_req{
public protoid:number = 3191
	/*邀请者账号ID*/
	public inviterId:number;

public write(b){
let len;
b.writeUint32(this.inviterId);

}
	constructor(){}
}/*挂机礼包到期（返回3190） 协议id:3192*/
export class AfkPackTimeUp_req{
public protoid:number = 3192
public write(b){
let len;

}
	constructor(){}
}/*单个商队详情*/
export class stItemStation{
	/*商队马车的位置*/
	public pos:number;

	/*商队的流水号ID*/
	public id:number;

	/*商队的任务ID,对应t_Station_Mission_List.xlsx中f_MissionID*/
	public missionId:number;

	/*商队状态 1货物抵达状态 2货物出发中 3被破坏 4空闲 5未解锁*/
	public state:number;

	/*商队任务的结束时间戳*/
	public endUnix:number;

	/*破坏结束时间戳*/
	public destoryEndUnix:number;

	/*被掠夺次数*/
	public count:number;

	/*掠夺,破坏状态 0不可掠夺不可破坏 1可掠夺 2可破坏*/
	public handlerState:number;

public write(b){
let len;
b.writeUint8(this.pos);
b.writeUint32(this.id);
b.writeUint8(this.missionId);
b.writeUint8(this.state);
b.writeUint32(this.endUnix);
b.writeUint32(this.destoryEndUnix);
b.writeUint8(this.count);
b.writeUint8(this.handlerState);

}
public read(b){
let len;
this.pos=b.readUint8()
this.id=b.readUint32()
this.missionId=b.readUint8()
this.state=b.readUint8()
this.endUnix=b.readUint32()
this.destoryEndUnix=b.readUint32()
this.count=b.readUint8()
this.handlerState=b.readUint8()

}
	constructor(){}
}/*跑商初始化（3010前推一次） 协议id:3193*/
export class StationInit_revc{
public protoid:number = 3193
	/*通行证上限*/
	public passports:number;

	/*购买了哪些通行证,对应t_Station_SlotOpen.xlsx的f_id*/
	public buyIds:number[];

	/*商队列表*/
	public datalist:stItemStation[];

	/*商队空闲马车数量*/
	public freeStationNum:number;

public read(b){
let len;
this.passports=b.readUint16()
this.buyIds=this.buyIds||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.buyIds.push(b.readUint8())
}
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stItemStation()
item.read(b);
this.datalist.push(item);

}
this.freeStationNum=b.readUint8()

}
	constructor(){}
}/*跑商数据变化或打开跑商界面时候返回,打开跑商界面协议是3207 协议id:3194*/
export class StationMainChange_revc{
public protoid:number = 3194
	/*商队列表*/
	public datalist:stItemStation[];

	/*通行证最近一次回复的时间戳*/
	public endUnix:number;

	/*商队空闲马车数量*/
	public freeStationNum:number;

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stItemStation()
item.read(b);
this.datalist.push(item);

}
this.endUnix=b.readUint32()
this.freeStationNum=b.readUint8()

}
	constructor(){}
}/*跑商领取奖励 协议id:3195*/
export class StationRewards_req{
public protoid:number = 3195
	/*对应stItemStation中的id,返回3025通用奖励协议+3194+道具变化*/
	public id:number;

public write(b){
let len;
b.writeUint32(this.id);

}
	constructor(){}
}/*升级跑商通行证上限 协议id:3196*/
export class UpgradePassportSlot_req{
public protoid:number = 3196
public write(b){
let len;

}
	constructor(){}
}/*升级跑商通行证上限返回 协议id:3197*/
export class UpgradePassportSlot_revc{
public protoid:number = 3197
	/*通行证上限*/
	public passports:number;

public read(b){
let len;
this.passports=b.readUint16()

}
	constructor(){}
}/*点击委派到委派页面,返回3201 协议id:3198*/
export class DelegatePage_req{
public protoid:number = 3198
public write(b){
let len;

}
	constructor(){}
}/*委派界面刷新任务,返回3201 协议id:3199*/
export class FreshMission_req{
public protoid:number = 3199
public write(b){
let len;

}
	constructor(){}
}/*任务详情*/
export class stMission{
	/*委派任务id,对应t_Station_Mission_List.xlsx中f_MissionID*/
	public missionId:number;

	/*是否出发 0未出发，1已出发*/
	public type:number;

	/*坐骑任务的流水号(全局唯一)*/
	public uid:uint64=new uint64();

public write(b){
let len;
b.writeUint8(this.missionId);
b.writeUint8(this.type);
this.uid.write(b);

}
public read(b){
let len;
this.missionId=b.readUint8()
this.type=b.readUint8()
this.uid.read(b);

}
	constructor(){}
}/*点击委派按钮或刷新委派任务返回 协议id:3201*/
export class MissionList_revc{
public protoid:number = 3201
	/*委派任务list*/
	public missionList:stMission[];

	/*商队马车总数*/
	public totalStationNum:number;

	/*商队空闲马车数量*/
	public freeStationNum:number;

	/*刷新任务次数*/
	public freshTimes:number;

	/*距离下次自动刷新的还有多少秒*/
	public nextRefreshTime:number;

	/*刷新的CD时间,单位s*/
	public cd:number;

public read(b){
let len;
this.missionList=this.missionList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stMission()
item.read(b);
this.missionList.push(item);

}
this.totalStationNum=b.readUint8()
this.freeStationNum=b.readUint8()
this.freshTimes=b.readUint8()
this.nextRefreshTime=b.readUint32()
this.cd=b.readUint16()

}
	constructor(){}
}/*一键触发委派任务,返回 3194 + 3201 协议id:3202*/
export class DoMissions_req{
public protoid:number = 3202
	/*uid 任务流水号*/
	public missionIds:uint64[];

public write(b){
let len;

this.missionIds=this.missionIds||[];
len = this.missionIds.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.missionIds[i].write(b);
}

}
	constructor(){}
}/*新版冒险挑战关卡数据*/
export class stNewAdventure{
	/*待挑战关卡id（t_Adventure_Level的f_Levelid）*/
	public adventureId:number;

	/*待挑战关卡中的怪物战斗力*/
	public plus:number;

	/*已领取章节奖励的关卡id（t_Adventure_Level的f_Levelid）*/
	public rewardAdventureIds:number[];

public write(b){
let len;
b.writeUint16(this.adventureId);
b.writeUint32(this.plus);

this.rewardAdventureIds=this.rewardAdventureIds||[];
len = this.rewardAdventureIds.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
b.writeUint16(this.rewardAdventureIds[i]);
}

}
public read(b){
let len;
this.adventureId=b.readUint16()
this.plus=b.readUint32()
this.rewardAdventureIds=this.rewardAdventureIds||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.rewardAdventureIds.push(b.readUint16())
}

}
	constructor(){}
}/*新版冒险主界面信息（初始化3010） 协议id:3203*/
export class NewAdventureInit_revc{
public protoid:number = 3203
	/*待挑战关卡数据*/
	public adventureData:stNewAdventure=new stNewAdventure();

	/*当前已经扫荡了第几次*/
	public cnt:number;

public read(b){
let len;
this.adventureData.read(b);
this.cnt=b.readUint8()

}
	constructor(){}
}/*新版冒险挑战扫荡 协议id:3204*/
export class NewAdventureFight_req{
public protoid:number = 3204
	/*关卡id（t_Adventure_Level的f_Levelid）*/
	public adventureId:number;

	/*1 挑战 2 扫荡 3 领取章节奖励（返回3230）*/
	public type:number;

public write(b){
let len;
b.writeUint32(this.adventureId);
b.writeUint8(this.type);

}
	constructor(){}
}/*新版冒险关卡变化 协议id:3205*/
export class NewAdventureUpdate_revc{
public protoid:number = 3205
	/*待挑战关卡数据*/
	public adventureData:stNewAdventure=new stNewAdventure();

public read(b){
let len;
this.adventureData.read(b);

}
	constructor(){}
}/*新版冒险扫荡次数变化 协议id:3206*/
export class NewAdventureCtnUpdate_revc{
public protoid:number = 3206
	/*当前已经扫荡了第几次*/
	public cnt:number;

public read(b){
let len;
this.cnt=b.readUint8()

}
	constructor(){}
}/*打开跑商车队界面,返回3194 协议id:3207*/
export class OpenStation_req{
public protoid:number = 3207
public write(b){
let len;

}
	constructor(){}
}/*跑商定时请求恢复通行证类似恢复体力,通行证满的时候停止请求 协议id:3208*/
export class RecoverPassport_req{
public protoid:number = 3208
public write(b){
let len;

}
	constructor(){}
}/*打开跑商车搜寻附近车队 协议id:3209*/
export class OpenStationNearBy_req{
public protoid:number = 3209
public write(b){
let len;

}
	constructor(){}
}/*打开跑商车搜寻附近车队返回+3529(先发) 协议id:3210*/
export class OpenStationNearBy_revc{
public protoid:number = 3210
	/*今日掠夺数量*/
	public pillages:number;

	/*今日破坏获得的通行证个数*/
	public passportsFromDestory:number;

	/*刷新的CD时间,单位s*/
	public cd:number;

	/*搜索附近商队车队返回列表*/
	public datalist:stStationNearBy[];

public read(b){
let len;
this.pillages=b.readUint8()
this.passportsFromDestory=b.readUint8()
this.cd=b.readUint16()
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stStationNearBy()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*刷新跑商车附近车队,返回3210 协议id:3211*/
export class FreshStationNearBy_req{
public protoid:number = 3211
public write(b){
let len;

}
	constructor(){}
}/*附近驿站详情*/
export class stStationNearBy{
	/*玩家角色ID,可以是机器人的ID*/
	public playerId:number;

	/*是否真实玩家, 1是则上面playerId是真实玩家ID, 0否上面playerId则为机器人ID*/
	public isRealPlayer:number;

	/*附近人的昵称*/
	public nickName:string;

	/*附近人的头像*/
	public headUrl:string;

	/*商队的总个数*/
	public totalNum:number;

	/*商队进行中的个数*/
	public underwayNum:number;

	/*商队详情*/
	public datalist:stItemStation[];

public write(b){
let len;
b.writeUint32(this.playerId);
b.writeUint8(this.isRealPlayer);
b.writeUTFString(this.nickName||"");
b.writeUTFString(this.headUrl||"");
b.writeUint8(this.totalNum);
b.writeUint8(this.underwayNum);

this.datalist=this.datalist||[];
len = this.datalist.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.datalist[i].write(b);
}

}
public read(b){
let len;
this.playerId=b.readUint32()
this.isRealPlayer=b.readUint8()
this.nickName=b.readUTFString()
this.headUrl=b.readUTFString()
this.totalNum=b.readUint8()
this.underwayNum=b.readUint8()
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stItemStation()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*前往掠夺、破坏单个附近商队,返回3213 协议id:3212*/
export class StationNearByDetail_req{
public protoid:number = 3212
	/*玩家角色ID,可以是机器人的ID, stStationNearBy里的数据*/
	public playerId:number;

	/*是否真实玩家, 1是则上面playerId是真实玩家ID, 0否上面playerId则为机器人ID,stStationNearBy里的数据*/
	public isRealPlayer:number;

	/*1附近的人，2标记的人，3复仇的人*/
	public type:number;

public write(b){
let len;
b.writeUint32(this.playerId);
b.writeUint8(this.isRealPlayer);
b.writeUint8(this.type);

}
	constructor(){}
}/*通用商队列表变化,用于查看附近商队,复仇... 协议id:3213*/
export class StationOtherChange_revc{
public protoid:number = 3213
	/*商队列表*/
	public datalist:stItemStation[];

	/*其他玩家名字*/
	public name:string;

	/*0 未标记，1已标记*/
	public flag:number;

	/*玩家角色ID,可以是机器人的ID, stStationNearBy里的数据*/
	public playerId:number;

	/*是否真实玩家, 1是则上面playerId是真实玩家ID, 0否上面playerId则为机器人ID,stStationNearBy里的数据*/
	public isRealPlayer:number;

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stItemStation()
item.read(b);
this.datalist.push(item);

}
this.name=b.readUTFString()
this.flag=b.readUint8()
this.playerId=b.readUint32()
this.isRealPlayer=b.readUint8()

}
	constructor(){}
}/*操作(破坏、掠夺)附近的马商车队,返回3213 协议id:3214*/
export class HandleStationNearBy_req{
public protoid:number = 3214
	/*1掠夺 2破坏*/
	public flag:number;

	/*对应stItemStation中的id*/
	public id:number;

public write(b){
let len;
b.writeUint8(this.flag);
b.writeUint32(this.id);

}
	constructor(){}
}/*标记单个附近商队 协议id:3215*/
export class RemarkStationNearBy_req{
public protoid:number = 3215
	/*玩家角色ID,可以是机器人的ID*/
	public playerId:number;

	/*是否真实玩家, 1是则上面playerId是真实玩家ID, 0否上面playerId则为机器人ID*/
	public isRealPlayer:number;

public write(b){
let len;
b.writeUint32(this.playerId);
b.writeUint8(this.isRealPlayer);

}
	constructor(){}
}/*查看标记的商队列表 协议id:3216*/
export class RemarkStationList_req{
public protoid:number = 3216
public write(b){
let len;

}
	constructor(){}
}/*查看标记的商队列表 协议id:3217*/
export class RemarkStationList_revc{
public protoid:number = 3217
	/*查看标记名单返回的列表,列表最多10条全部返回*/
	public datalist:stStationNearBy[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stStationNearBy()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*删除标记附近商队,返回3217 协议id:3218*/
export class RemRemarkStationNearBy_req{
public protoid:number = 3218
	/*玩家角色ID,可以是机器人的ID*/
	public playerId:number;

	/*是否真实玩家, 1是则上面playerId是真实玩家ID, 0否上面playerId则为机器人ID*/
	public isRealPlayer:number;

public write(b){
let len;
b.writeUint32(this.playerId);
b.writeUint8(this.isRealPlayer);

}
	constructor(){}
}/*查看当前玩家商队(破坏、掠夺)日志 协议id:3219*/
export class HandleStationLogs_req{
public protoid:number = 3219
public write(b){
let len;

}
	constructor(){}
}/*返回当前玩家商队(破坏、掠夺)日志 协议id:3220*/
export class HandleStationLogs_revc{
public protoid:number = 3220
	/*商队(破坏、掠夺)日志*/
	public datalist:stStationHandleLog[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stStationHandleLog()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*跑商操作日志*/
export class stStationHandleLog{
	/*跑商日志的ID*/
	public logId:number;

	/*玩家角色ID,可以是机器人的ID*/
	public playerId:number;

	/*是否真实玩家, 1是则上面playerId是真实玩家ID, 0否上面playerId则为机器人ID*/
	public isRealPlayer:number;

	/*附近人的昵称*/
	public nickName:string;

	/*附近人的头像*/
	public headUrl:string;

	/*1破坏 2掠夺*/
	public flag:number;

	/*1玩家向对方破坏、掠夺  2对方向玩家破坏、掠夺*/
	public isWho:number;

	/*记录产生的时间戳*/
	public logUnix:number;

	/*掠夺或破坏的得到的内容*/
	public rewards:stCellValue[];

public write(b){
let len;
b.writeUint32(this.logId);
b.writeUint32(this.playerId);
b.writeUint8(this.isRealPlayer);
b.writeUTFString(this.nickName||"");
b.writeUTFString(this.headUrl||"");
b.writeUint8(this.flag);
b.writeUint8(this.isWho);
b.writeUint32(this.logUnix);

this.rewards=this.rewards||[];
len = this.rewards.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.rewards[i].write(b);
}

}
public read(b){
let len;
this.logId=b.readUint32()
this.playerId=b.readUint32()
this.isRealPlayer=b.readUint8()
this.nickName=b.readUTFString()
this.headUrl=b.readUTFString()
this.flag=b.readUint8()
this.isWho=b.readUint8()
this.logUnix=b.readUint32()
this.rewards=this.rewards||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stCellValue()
item.read(b);
this.rewards.push(item);

}

}
	constructor(){}
}/*商队复仇,返回3213其他商队列表 协议id:3221*/
export class HandleStationRevenge_req{
public protoid:number = 3221
	/*跑商日志的ID,对应stStationHandleLog中logId*/
	public logId:number;

public write(b){
let len;
b.writeUint32(this.logId);

}
	constructor(){}
}/*跑商购买车队,返回3194 协议id:3222*/
export class StationBySlot_req{
public protoid:number = 3222
	/*对应t_Station_SlotOpen.xlsx的f_id, 若f_SlotOpen为空则不是购买的*/
	public id:number;

public write(b){
let len;
b.writeUint8(this.id);

}
	constructor(){}
}/*战魂主界面信息结构体*/
export class stSpirit{
	/*战魂流水号id*/
	public uid:number;

	/*战魂id*/
	public spiritId:number;

	/*位置1-4，1一号位*/
	public pos:number;

	/*是否已装备 1已装备 2未装备*/
	public wearable:number;

	/*战魂稀有度*/
	public qualityId:number;

	/*战魂等级*/
	public level:number;

	/*战魂经验值*/
	public exp:number;

	/*战魂随机属性列表*/
	public attrList:stEquipAttr[];

public write(b){
let len;
b.writeUint32(this.uid);
b.writeUint8(this.spiritId);
b.writeUint8(this.pos);
b.writeUint8(this.wearable);
b.writeUint8(this.qualityId);
b.writeUint8(this.level);
b.writeUint32(this.exp);

this.attrList=this.attrList||[];
len = this.attrList.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.attrList[i].write(b);
}

}
public read(b){
let len;
this.uid=b.readUint32()
this.spiritId=b.readUint8()
this.pos=b.readUint8()
this.wearable=b.readUint8()
this.qualityId=b.readUint8()
this.level=b.readUint8()
this.exp=b.readUint32()
this.attrList=this.attrList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stEquipAttr()
item.read(b);
this.attrList.push(item);

}

}
	constructor(){}
}/*玩家的战魂列表(仅初始化3010前推一次) 协议id:3223*/
export class SpiritList_revc{
public protoid:number = 3223
	/*玩家的战魂列表*/
	public spiritList:stSpirit[];

public read(b){
let len;
this.spiritList=this.spiritList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stSpirit()
item.read(b);
this.spiritList.push(item);

}

}
	constructor(){}
}/*战魂一键操作，返回3225 协议id:3224*/
export class SpiritQuickWear_req{
public protoid:number = 3224
	/*1一键装备 0一键卸下*/
	public type:number;

public write(b){
let len;
b.writeUint8(this.type);

}
	constructor(){}
}/*战魂列表增加或修改部分 协议id:3225*/
export class SpiritListUpdate_revc{
public protoid:number = 3225
	/*增加或修改的战魂列表*/
	public spiritList:stSpirit[];

public read(b){
let len;
this.spiritList=this.spiritList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stSpirit()
item.read(b);
this.spiritList.push(item);

}

}
	constructor(){}
}/*战魂列表删除部分 协议id:3226*/
export class SpiritListDel_revc{
public protoid:number = 3226
	/*删除的战魂uid列表*/
	public datalist:number[];

public read(b){
let len;
this.datalist=this.datalist||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.datalist.push(b.readUint32())
}

}
	constructor(){}
}/*战魂强化（返回3225、3226） 协议id:3227*/
export class SpiritUpgrade_req{
public protoid:number = 3227
	/*被强化的战魂流水号uid*/
	public uid:number;

	/*用于强化的战魂uid列表*/
	public datalist:number[];

public write(b){
let len;
b.writeUint32(this.uid);

this.datalist=this.datalist||[];
len = this.datalist.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
b.writeUint32(this.datalist[i]);
}

}
	constructor(){}
}/*战魂装备或替换（返回3225） 协议id:3228*/
export class SpiritWear_req{
public protoid:number = 3228
	/*被替换战魂流水号uid（无替换的时候传0）*/
	public oldUid:number;

	/*装备上的战魂流水号uid*/
	public newUid:number;

public write(b){
let len;
b.writeUint32(this.oldUid);
b.writeUint32(this.newUid);

}
	constructor(){}
}/*战魂卸下（返回3225） 协议id:3229*/
export class SpiritUnwear_req{
public protoid:number = 3229
	/*卸下的战魂流水号uid*/
	public uid:number;

public write(b){
let len;
b.writeUint32(this.uid);

}
	constructor(){}
}/*新版冒险章节奖励 协议id:3230*/
export class NewAdventureRewardUpdate_revc{
public protoid:number = 3230
	/*已领取章节奖励的关卡id（t_Adventure_Level的f_Levelid）*/
	public rewardAdventureIds:number[];

public read(b){
let len;
this.rewardAdventureIds=this.rewardAdventureIds||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.rewardAdventureIds.push(b.readUint16())
}

}
	constructor(){}
}/*玩家每日跑商的数据如掠夺数量,破坏获得的通行证之类 协议id:3231*/
export class StationDaliyInfo_revc{
public protoid:number = 3231
	/*今日掠夺数量*/
	public pillages:number;

	/*今日破坏获得的通行证个数*/
	public passportsFromDestory:number;

public read(b){
let len;
this.pillages=b.readUint8()
this.passportsFromDestory=b.readUint8()

}
	constructor(){}
}/*跑商升级车队个数,可以是购买,可以是等级提升,可以是月卡,终身卡 协议id:3232*/
export class StationBuy_req{
public protoid:number = 3232
	/*对应t_Station_SlotOpen.xlsx中的f_id*/
	public id:number;

public write(b){
let len;
b.writeUint8(this.id);

}
	constructor(){}
}/*跑商升级车队个数,可以是购买,可以是等级提升,可以是月卡,终身卡 协议id:3233*/
export class StationBuy_revc{
public protoid:number = 3233
	/*购买了哪些通行证,对应t_Station_SlotOpen.xlsx的f_id*/
	public buyIds:number[];

	/*商队空闲马车数量*/
	public freeStationNum:number;

public read(b){
let len;
this.buyIds=this.buyIds||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.buyIds.push(b.readUint8())
}
this.freeStationNum=b.readUint8()

}
	constructor(){}
}/*挂机刷新主界面信息（返回3181） 协议id:3234*/
export class AfkRefresh_req{
public protoid:number = 3234
public write(b){
let len;

}
	constructor(){}
}/*充值服务器到帐成功后发送 协议id:3235*/
export class PurchasePriceSucceed_revc{
public protoid:number = 3235
	/*充值表t_Purchase_Price fid*/
	public f_id:number;

public read(b){
let len;
this.f_id=b.readUint32()

}
	constructor(){}
}/*大乱斗战斗结果结构体*/
export class stSmashFightLang{
	/*话术类型 t_Smash_Script表的f_SeverType*/
	public type:number;

	/*战斗结果数据*/
	public lang:string;

public write(b){
let len;
b.writeUint8(this.type);
b.writeUTFString(this.lang||"");

}
public read(b){
let len;
this.type=b.readUint8()
this.lang=b.readUTFString()

}
	constructor(){}
}/*大乱斗战斗结果结构体*/
export class stSmashFight{
	/*话术类型 t_Smash_Script表的f_id*/
	public type:number;

	/*战斗结果数据*/
	public langList:stSmashFightLang[];

public write(b){
let len;
b.writeUint8(this.type);

this.langList=this.langList||[];
len = this.langList.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.langList[i].write(b);
}

}
public read(b){
let len;
this.type=b.readUint8()
this.langList=this.langList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stSmashFightLang()
item.read(b);
this.langList.push(item);

}

}
	constructor(){}
}/*大乱斗前三强结构体*/
export class stSmashTopWinner{
	/*名次*/
	public position:number;

	/*昵称*/
	public name:string;

	/*头像*/
	public portrait:string;

	/*连胜场数*/
	public streakTimes:number;

	/*玩家等级*/
	public level:number;

	/*称号id*/
	public titleId:number;

public write(b){
let len;
b.writeUint8(this.position);
b.writeUTFString(this.name||"");
b.writeUTFString(this.portrait||"");
b.writeUint8(this.streakTimes);
b.writeUint16(this.level);
b.writeUint8(this.titleId);

}
public read(b){
let len;
this.position=b.readUint8()
this.name=b.readUTFString()
this.portrait=b.readUTFString()
this.streakTimes=b.readUint8()
this.level=b.readUint16()
this.titleId=b.readUint8()

}
	constructor(){}
}/*大乱斗当前玩家的战斗结果*/
export class stSmashFightResult{
	/*连胜场数*/
	public streakTimes:number;

	/*总胜场数*/
	public winTimes:number;

	/*战斗奖励列表（领取走3024，返回3025）*/
	public rewardList:stCellValue[];

	/*在线额外奖励列表*/
	public onlineRewardList:stCellValue[];

public write(b){
let len;
b.writeUint8(this.streakTimes);
b.writeUint8(this.winTimes);

this.rewardList=this.rewardList||[];
len = this.rewardList.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.rewardList[i].write(b);
}

this.onlineRewardList=this.onlineRewardList||[];
len = this.onlineRewardList.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.onlineRewardList[i].write(b);
}

}
public read(b){
let len;
this.streakTimes=b.readUint8()
this.winTimes=b.readUint8()
this.rewardList=this.rewardList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stCellValue()
item.read(b);
this.rewardList.push(item);

}
this.onlineRewardList=this.onlineRewardList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stCellValue()
item.read(b);
this.onlineRewardList.push(item);

}

}
	constructor(){}
}/*大乱斗初始化信息（3010前推） 协议id:3236*/
export class SmashInit_revc{
public protoid:number = 3236
	/*是否报名 0 未报名 1已报名*/
	public isEnroll:number;

	/*是否有可以的领取的奖励 0 没有 1有*/
	public isReward:number;

	/*活动状态 1报名阶段 2战斗阶段 3结束阶段 4报名结束战斗前，当这个状态变化的时候后端主动推送3236*/
	public openType:number;

	/*当前大乱斗战斗结果列表*/
	public smashFightList:stSmashFight[];

	/*当前大乱斗前三强信息列表*/
	public smashTopWinnerList:stSmashTopWinner[];

	/*当前玩家的战斗情况*/
	public fightResult:stSmashFightResult=new stSmashFightResult();

	/*需要客户端向后端请求的时间戳*/
	public time:number;

	/*跨服起始、结束服务器id，不跨服传空数组*/
	public crossServers:number[];

	/*跨服大乱斗的开始时间戳（开服时间+跨服大乱斗开启天数）*/
	public crossTime:number;

public read(b){
let len;
this.isEnroll=b.readUint8()
this.isReward=b.readUint8()
this.openType=b.readUint8()
this.smashFightList=this.smashFightList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stSmashFight()
item.read(b);
this.smashFightList.push(item);

}
this.smashTopWinnerList=this.smashTopWinnerList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stSmashTopWinner()
item.read(b);
this.smashTopWinnerList.push(item);

}
this.fightResult.read(b);
this.time=b.readUint32()
this.crossServers=this.crossServers||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.crossServers.push(b.readUint16())
}
this.crossTime=b.readUint32()

}
	constructor(){}
}/*大乱斗报名（返回3238） 协议id:3237*/
export class SmashEnroll_req{
public protoid:number = 3237
public write(b){
let len;

}
	constructor(){}
}/*大乱斗报名成功（失败走错误码） 协议id:3238*/
export class SmashEnroll_revc{
public protoid:number = 3238
public read(b){
let len;

}
	constructor(){}
}/*打开大乱斗界面请求（返回3236） 协议id:3239*/
export class SmashFightOpenReq_req{
public protoid:number = 3239
public write(b){
let len;

}
	constructor(){}
}/*前端向后端请求数据（返回3241） 协议id:3240*/
export class SmashFightUpdataRep_req{
public protoid:number = 3240
	/*大乱斗轮次（0表示第一轮）*/
	public round:number;

public write(b){
let len;
b.writeUint8(this.round);

}
	constructor(){}
}/*大乱斗数据更新 协议id:3241*/
export class SmashUpdate_revc{
public protoid:number = 3241
	/*当前大乱斗战斗结果列表*/
	public smashFightList:stSmashFight[];

	/*当前大乱斗前三强信息列表*/
	public smashTopWinnerList:stSmashTopWinner[];

	/*当前玩家的战斗情况*/
	public fightResult:stSmashFightResult=new stSmashFightResult();

	/*需要客户端向后端请求的时间戳*/
	public time:number;

public read(b){
let len;
this.smashFightList=this.smashFightList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stSmashFight()
item.read(b);
this.smashFightList.push(item);

}
this.smashTopWinnerList=this.smashTopWinnerList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stSmashTopWinner()
item.read(b);
this.smashTopWinnerList.push(item);

}
this.fightResult.read(b);
this.time=b.readUint32()

}
	constructor(){}
}/*区服详情*/
export class stServerItem{
	/*区服名称*/
	public serverName:string;

	/*区服冠名*/
	public naming:string;

	/*区服ID*/
	public serverID:number;

	/*区服状态 1爆满 2畅通 3维护*/
	public serverState:number;

	/*是否是新服*/
	public isNew:number;

	/*区服下角色等级 0标识没有角色*/
	public roleLevel:number;

	/*玩家名*/
	public roleName:string;

public write(b){
let len;
b.writeUTFString(this.serverName||"");
b.writeUTFString(this.naming||"");
b.writeUint32(this.serverID);
b.writeUint8(this.serverState);
b.writeUint8(this.isNew);
b.writeUint8(this.roleLevel);
b.writeUTFString(this.roleName||"");

}
public read(b){
let len;
this.serverName=b.readUTFString()
this.naming=b.readUTFString()
this.serverID=b.readUint32()
this.serverState=b.readUint8()
this.isNew=b.readUint8()
this.roleLevel=b.readUint8()
this.roleName=b.readUTFString()

}
	constructor(){}
}/*游戏内请求区服多少组 协议id:3242*/
export class ServerNumReq_req{
public protoid:number = 3242
public write(b){
let len;

}
	constructor(){}
}/*游戏内请求区服多少组返回 协议id:3243*/
export class ServerNumRevc_revc{
public protoid:number = 3243
	/*有多少组服务器*/
	public serverZu:number;

public read(b){
let len;
this.serverZu=b.readUint8()

}
	constructor(){}
}/*当前组的服务器列表 协议id:3244*/
export class ServerListReq_req{
public protoid:number = 3244
	/*服务器组ID 推荐ID：10000，我的角色：20000*/
	public serverZuID:number;

public write(b){
let len;
b.writeUint16(this.serverZuID);

}
	constructor(){}
}/*当前组的服务器列表返回 协议id:3245*/
export class ServerListRevc_revc{
public protoid:number = 3245
	/*区服列表详情*/
	public serverItems:stServerItem[];

public read(b){
let len;
this.serverItems=this.serverItems||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stServerItem()
item.read(b);
this.serverItems.push(item);

}

}
	constructor(){}
}/*切换服务器 协议id:3246*/
export class SelectServerIDReq_req{
public protoid:number = 3246
	/*服务器ID*/
	public serverID:number;

public write(b){
let len;
b.writeUint32(this.serverID);

}
	constructor(){}
}/*切换服务器返回 协议id:3247*/
export class SelectServerIDRevc_revc{
public protoid:number = 3247
	/*1切换服务器成功*/
	public ret:number;

public read(b){
let len;
this.ret=b.readUint8()

}
	constructor(){}
}/*大乱斗活动状态变化 协议id:3248*/
export class SmashStateUpdate_revc{
public protoid:number = 3248
	/*活动状态 1报名阶段 2战斗阶段 3结束阶段 4报名结束战斗前，当这个状态变化的时候后端主动推送3236*/
	public openType:number;

public read(b){
let len;
this.openType=b.readUint8()

}
	constructor(){}
}/*大乱斗每轮战斗结束（服务器主动推给客户端） 协议id:3249*/
export class SmashFight_revc{
public protoid:number = 3249
	/*大乱斗轮次（0表示第一轮）*/
	public round:number;

public read(b){
let len;
this.round=b.readUint8()

}
	constructor(){}
}/*通用功能成功信息 协议id:3250*/
export class Success_revc{
public protoid:number = 3250
	/*
        //成功消息码,描述,配置到\Project1\Excel\t_Err_Sucess.xlsx中
    */
	public reason:number;

public read(b){
let len;
this.reason=b.readUint16()

}
	constructor(){}
}/*福源自动转化item通知 协议id:3251*/
export class BlessingAutoZH_revc_revc{
public protoid:number = 3251
	/*获得的奖励列表*/
	public rewardList:stCellValue[];

public read(b){
let len;
this.rewardList=this.rewardList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stCellValue()
item.read(b);
this.rewardList.push(item);

}

}
	constructor(){}
}/*微信登录 协议id:3252*/
export class wxLogin_req{
public protoid:number = 3252
	/*微信小游戏appid*/
	public appid:string;

	/*微信用户openid*/
	public openid:string;

	/*数数distinctId*/
	public distinctId:string;

	/*选服http请求返回的token*/
	public token:string;

	/*0 不是断线重连 1 是断线重连*/
	public type:number;

	/*微信场景码,没有传0*/
	public scene:number;

	/*邀请者的玩家id，没有传0*/
	public inviterId:number;

	/*渠道id，没有传0*/
	public tunnelId:number;

public write(b){
let len;
b.writeUTFString(this.appid||"");
b.writeUTFString(this.openid||"");
b.writeUTFString(this.distinctId||"");
b.writeUTFString(this.token||"");
b.writeUint8(this.type);
b.writeUint16(this.scene);
b.writeUint32(this.inviterId);
b.writeUint32(this.tunnelId);

}
	constructor(){}
}/*微信登录 协议id:3253*/
export class wxPlayerInfo_req{
public protoid:number = 3253
	/*微信昵称*/
	public nickName:string;

	/*微信头像*/
	public portrait:string;

public write(b){
let len;
b.writeUTFString(this.nickName||"");
b.writeUTFString(this.portrait||"");

}
	constructor(){}
}/*订阅消息结构体*/
export class stDingYue{
	/*t_Setting_Subscribe f_id*/
	public id:number;

	/*0关闭 1 打开*/
	public type:number;

public write(b){
let len;
b.writeUint8(this.id);
b.writeUint8(this.type);

}
public read(b){
let len;
this.id=b.readUint8()
this.type=b.readUint8()

}
	constructor(){}
}/*订阅状态 协议id:3254*/
export class DingYueReq_req{
public protoid:number = 3254
public write(b){
let len;

}
	constructor(){}
}/*订阅状态服务器返回 协议id:3255*/
export class DingYueRevc_revc{
public protoid:number = 3255
	/*游戏更新 0关闭 1 打开*/
	public type:number;

	/*订阅消息*/
	public dyList:stDingYue[];

public read(b){
let len;
this.type=b.readUint8()
this.dyList=this.dyList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stDingYue()
item.read(b);
this.dyList.push(item);

}

}
	constructor(){}
}/*订阅状态选择 协议id:3256*/
export class DingYueSelectReq_req{
public protoid:number = 3256
	/*t_Setting_Subscribe f_id*/
	public id:number;

	/*0关闭 1 打开*/
	public type:number;

public write(b){
let len;
b.writeUint8(this.id);
b.writeUint8(this.type);

}
	constructor(){}
}/*订阅状态选择服务器返回 协议id:3257*/
export class DingYueSelectRevc_revc{
public protoid:number = 3257
	/*t_Setting_Subscribe f_id*/
	public id:number;

	/*0关闭 1 打开*/
	public type:number;

public read(b){
let len;
this.id=b.readUint8()
this.type=b.readUint8()

}
	constructor(){}
}/*配置文件hash 协议id:3258*/
export class ConfigHash_revc{
public protoid:number = 3258
	/*值*/
	public val:string;

public read(b){
let len;
this.val=b.readUTFString()

}
	constructor(){}
}/*武馆礼包（3010前推，数据变化时也推） 协议id:3259*/
export class GymPack_revc{
public protoid:number = 3259
	/*是否可领取 0不可领取 1可领取*/
	public type:number;

	/*剩余有效天数*/
	public day:number;

	/*是否是试用*/
	public tryout:number;

public read(b){
let len;
this.type=b.readUint8()
this.day=b.readUint16()
this.tryout=b.readUint8()

}
	constructor(){}
}/*换装变化列表 协议id:3260*/
export class reloadEquipUpdate_revc{
public protoid:number = 3260
	/*列表 */
	public datalist:stReloadEquip[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stReloadEquip()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*周奖励的结算时间 协议id:3261*/
export class weeklyReward_revc{
public protoid:number = 3261
	/*周奖励的结算时间戳*/
	public time:number;

public read(b){
let len;
this.time=b.readUint32()

}
	constructor(){}
}/*服务器版本号 协议id:3262*/
export class ServerVersion_revc{
public protoid:number = 3262
	/*版本号*/
	public val:string;

public read(b){
let len;
this.val=b.readUTFString()

}
	constructor(){}
}/*邮件结构体*/
export class stMail{
	/*邮件id*/
	public uid:number;

	/*邮件标题*/
	public title:string;

	/*邮件内容*/
	public content:string;

	/*邮件模板id 非0的就用模板*/
	public templateId:number;

	/*模板参数*/
	public params:string[];

	/*可领取的物品列表*/
	public itemlist:stCellValue[];

	/*邮件状态 0未读 1已读 2未领取 3已领取 4已删除*/
	public state:number;

	/*发布时间戳*/
	public time:number;

public write(b){
let len;
b.writeUint32(this.uid);
b.writeUTFString(this.title||"");
b.writeUTFString(this.content||"");
b.writeUint16(this.templateId);

this.params=this.params||[];
len = this.params.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
b.writeUTFString(this.params[i]||"");
}

this.itemlist=this.itemlist||[];
len = this.itemlist.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.itemlist[i].write(b);
}
b.writeUint8(this.state);
b.writeUint32(this.time);

}
public read(b){
let len;
this.uid=b.readUint32()
this.title=b.readUTFString()
this.content=b.readUTFString()
this.templateId=b.readUint16()
this.params=this.params||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.params.push(b.readUTFString())
}
this.itemlist=this.itemlist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stCellValue()
item.read(b);
this.itemlist.push(item);

}
this.state=b.readUint8()
this.time=b.readUint32()

}
	constructor(){}
}/*邮件红点（3010前和游戏中收到新邮件时都推） 协议id:3263*/
export class MailRed_revc{
public protoid:number = 3263
	/*红点 0无 1有红点*/
	public red:number;

public read(b){
let len;
this.red=b.readUint8()

}
	constructor(){}
}/*邮件列表（返回3265） 协议id:3264*/
export class MailList_req{
public protoid:number = 3264
	/*邮件id（删除已读、一键领取时传0）*/
	public uid:number;

	/*0返回邮件列表 1已读或领取 2删除*/
	public type:number;

public write(b){
let len;
b.writeUint32(this.uid);
b.writeUint8(this.type);

}
	constructor(){}
}/*邮件列表 协议id:3265*/
export class MailList_revc{
public protoid:number = 3265
	/*邮件列表*/
	public datalist:stMail[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stMail()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*武馆刷新单个任务返回 协议id:3266*/
export class GymMissionRefreshUpdate_revc{
public protoid:number = 3266
	/*任务的索引*/
	public index:number;

	/*刷新后的任务*/
	public mission:stGymMission=new stGymMission();

public read(b){
let len;
this.index=b.readUint8()
this.mission.read(b);

}
	constructor(){}
}/*红点结构体*/
export class stRedDot{
	/*红点类型,或者红点的值*/
	public type:number;

	/*红点id*/
	public id:number;

public write(b){
let len;
b.writeUint32(this.type);
b.writeUint16(this.id);

}
public read(b){
let len;
this.type=b.readUint32()
this.id=b.readUint16()

}
	constructor(){}
}/*红点列表 上线的时候有且只有一次推送 协议id:3267*/
export class RedDotUpdate_revc{
public protoid:number = 3267
	/*列表*/
	public datalist:stRedDot[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stRedDot()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*红点更新、添加 协议id:3268*/
export class RedDotUpdate_req{
public protoid:number = 3268
	/*列表*/
	public datalist:stRedDot[];

public write(b){
let len;

this.datalist=this.datalist||[];
len = this.datalist.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.datalist[i].write(b);
}

}
	constructor(){}
}/*红点删除 协议id:3269*/
export class RedDotDel_req{
public protoid:number = 3269
	/*列表*/
	public datalist:number[];

public write(b){
let len;

this.datalist=this.datalist||[];
len = this.datalist.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
b.writeUint16(this.datalist[i]);
}

}
	constructor(){}
}/*GM有返回的推送 协议id:3270*/
export class GmResult_revc{
public protoid:number = 3270
	/*GM字符串*/
	public result:string;

public read(b){
let len;
this.result=b.readUTFString()

}
	constructor(){}
}/*cd时间详情*/
export class stAdCd{
	/*广告位置 1宝箱升级,2快速挂机,3武馆,4免费元宝 ,...待扩展*/
	public pos:number;

	/*广告cd结束的时间戳,0标识没有看*/
	public endUnix:number;

	/*今日看广告次数（免费元宝使用，其他情况传0）*/
	public times:number;

public write(b){
let len;
b.writeUint8(this.pos);
b.writeUint32(this.endUnix);
b.writeUint8(this.times);

}
public read(b){
let len;
this.pos=b.readUint8()
this.endUnix=b.readUint32()
this.times=b.readUint8()

}
	constructor(){}
}/*广告的cd时间,初始化的时候返回 协议id:3271*/
export class AdCdInit_revc{
public protoid:number = 3271
	/*cd列表*/
	public datalist:stAdCd[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stAdCd()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*广告的cd时间,改变的时候返回 协议id:3272*/
export class AdCdChange_revc{
public protoid:number = 3272
	/*cd列表*/
	public datalist:stAdCd[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stAdCd()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*广告看完后请求 协议id:3273*/
export class AdWatchDone_req{
public protoid:number = 3273
	/*广告位置 1宝箱升级,2快速挂机,3武馆,4免费元宝,5鏖战凶兽,6抗击凶兽*/
	public pos:number;

public write(b){
let len;
b.writeUint8(this.pos);

}
	constructor(){}
}/*当其他玩家在竞技场战斗导致你的名次下降的时候 协议id:3274*/
export class JjcRankDrop_revc{
public protoid:number = 3274
	/*当前的排名*/
	public rank:number;

public read(b){
let len;
this.rank=b.readUint16()

}
	constructor(){}
}/*当前是否可以签 协议id:3275*/
export class SignStatus_revc{
public protoid:number = 3275
	/*0 不可签 1可签*/
	public val:number;

	/*0 老服签到 1新服签到*/
	public isNew:number;

public read(b){
let len;
this.val=b.readUint8()
this.isNew=b.readUint8()

}
	constructor(){}
}/*当前是否可以签 协议id:3276*/
export class SignStatus_req{
public protoid:number = 3276
public write(b){
let len;

}
	constructor(){}
}/*月卡是否可以领取 协议id:3277*/
export class MonthCard_revc{
public protoid:number = 3277
	/*0不可领 1可领 2已领*/
	public val:number;

	/*剩余多少天*/
	public subday:number;

public read(b){
let len;
this.val=b.readUint8()
this.subday=b.readUint16()

}
	constructor(){}
}/*月卡领取 协议id:3278*/
export class MonthCardGet_req{
public protoid:number = 3278
public write(b){
let len;

}
	constructor(){}
}/*终身卡是否可以领取 协议id:3279*/
export class AllLifeCard_revc{
public protoid:number = 3279
	/*0不可领 1可领 2已领*/
	public val:number;

public read(b){
let len;
this.val=b.readUint8()

}
	constructor(){}
}/*终身卡领取 协议id:3280*/
export class AllLifeCardGet_req{
public protoid:number = 3280
public write(b){
let len;

}
	constructor(){}
}/*宝石的详情*/
export class stGem{
	/*存放的地方 0即宝石背包,大于0即存放的法阵id,对应t_Gem_Formation_List.xlsx的f_Formationid*/
	public type:number;

	/*宝石的流水号*/
	public uid:uint64=new uint64();

	/*宝石id,对应t_Gem_List.xlsx的f_Gemid*/
	public id:number;

	/*宝石等级,对应t_Gem_Attribute.xlsx的f_GemLevel*/
	public level:number;

	/*位置,0标识不需要位置,大于0 是法阵中的位置*/
	public pos:number;

public write(b){
let len;
b.writeUint8(this.type);
this.uid.write(b);
b.writeUint8(this.id);
b.writeUint16(this.level);
b.writeUint16(this.pos);

}
public read(b){
let len;
this.type=b.readUint8()
this.uid.read(b);
this.id=b.readUint8()
this.level=b.readUint16()
this.pos=b.readUint16()

}
	constructor(){}
}/*宝石的命脉*/
export class stGemLifeBlood{
	/*命脉的id*/
	public id:number;

	/*命脉的状态 0未解锁 1已解锁未激活 2已解锁已激活*/
	public state:number;

public write(b){
let len;
b.writeUint16(this.id);
b.writeUint8(this.state);

}
public read(b){
let len;
this.id=b.readUint16()
this.state=b.readUint8()

}
	constructor(){}
}/*珠宝初始化协议 协议id:3281*/
export class GemInit_revc{
public protoid:number = 3281
	/*当前玩家拥有的宝石信息*/
	public datalist:stGem[];

	/*当前玩家拥有的法阵ids,对应t_Gem_Formation_List.xlsx的f_Formationid*/
	public formationIds:number[];

	/*当前默认的法阵id*/
	public defaultFormationId:number;

	/*下次可免费获得宝石的时间戳,变化走3545*/
	public nextFreeUnix:number;

	/*剩余免费获得宝石次数,变化走3545*/
	public freeCount:number;

	/*当前玩家拥有的宝石命脉信息,变化走3685*/
	public lifeBloodList:stGemLifeBlood[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stGem()
item.read(b);
this.datalist.push(item);

}
this.formationIds=this.formationIds||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.formationIds.push(b.readUint8())
}
this.defaultFormationId=b.readUint8()
this.nextFreeUnix=b.readUint32()
this.freeCount=b.readUint8()
this.lifeBloodList=this.lifeBloodList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stGemLifeBlood()
item.read(b);
this.lifeBloodList.push(item);

}

}
	constructor(){}
}/*购买宝石,走宝石变化协议 协议id:3282*/
export class GemBuy_req{
public protoid:number = 3282
	/*类型 0原来逻辑 1宝石盛宴逻辑 (id=0 num=1单抽 num=3三连抽)*/
	public type:number;

	/*t_Gem_Shop.xlsx的f_id*/
	public id:number;

	/*购买个数*/
	public num:number;

public write(b){
let len;
b.writeUint8(this.type);
b.writeUint8(this.id);
b.writeUint16(this.num);

}
	constructor(){}
}/*购买宝石成功 协议id:3283*/
export class GemBuy_revc{
public protoid:number = 3283
public read(b){
let len;

}
	constructor(){}
}/*宝石消耗传的道具信息*/
export class stGemItem{
	/*道具ID*/
	public itemId:number;

	/*道具的数量*/
	public num:number;

public write(b){
let len;
b.writeUint16(this.itemId);
b.writeUint16(this.num);

}
public read(b){
let len;
this.itemId=b.readUint16()
this.num=b.readUint16()

}
	constructor(){}
}/*处理宝石,返回3293+3285 协议id:3284*/
export class GemHandler_req{
public protoid:number = 3284
	/*操作类型 1合成 2重铸 3变质*/
	public type:number;

	/*宝石的流水号*/
	public uids:uint64[];

	/*(弃用走下面items)使用道具ID 1合成传0 2重铸传1或317 3变质传1或317*/
	public itemId:number;

	/*使用道具IDS 1合成传空 2重铸传1或317的ID+数量 3变质传1或317的ID+数量*/
	public items:stGemItem[];

public write(b){
let len;
b.writeUint8(this.type);

this.uids=this.uids||[];
len = this.uids.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.uids[i].write(b);
}
b.writeUint16(this.itemId);

this.items=this.items||[];
len = this.items.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.items[i].write(b);
}

}
	constructor(){}
}/*宝石变化返回 协议id:3285*/
export class GemChange_revc{
public protoid:number = 3285
	/*背包的变化信息,可以是多个(操作购买，法阵、合成、重铸、变质时候用到)*/
	public datalist:stGem[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stGem()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*移除操作的返回 协议id:3286*/
export class GemRemove_revc{
public protoid:number = 3286
	/*删除背包信息,可以是多个*/
	public datalist:uint64[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new uint64()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*法阵穿戴 协议id:3287*/
export class GemFormationWear_req{
public protoid:number = 3287
	/*目标背包的类型,只能传0或当前的背包类型*/
	public type:number;

	/*位置,穿的时候传1,脱的时候传0*/
	public pos:number;

	/*操作物品的流水号*/
	public uid:uint64=new uint64();

public write(b){
let len;
b.writeUint8(this.type);
b.writeUint16(this.pos);
this.uid.write(b);

}
	constructor(){}
}/*购买宝石法阵 协议id:3288*/
export class GemFormationBuy_req{
public protoid:number = 3288
	/*t_Gem_Formation_List.xlsx的f_id*/
	public id:number;

public write(b){
let len;
b.writeUint8(this.id);

}
	constructor(){}
}/*购买宝石法阵返回 协议id:3289*/
export class GemFormationBuy_revc{
public protoid:number = 3289
	/*t_Gem_Formation_List.xlsx的f_id*/
	public datalist:number[];

public read(b){
let len;
this.datalist=this.datalist||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.datalist.push(b.readUint8())
}

}
	constructor(){}
}/*切换法阵 协议id:3290*/
export class GemFormationChange_req{
public protoid:number = 3290
	/*t_Gem_Formation_List.xlsx的f_id*/
	public id:number;

public write(b){
let len;
b.writeUint8(this.id);

}
	constructor(){}
}/*切换法阵返回 协议id:3291*/
export class GemFormationChange_revc{
public protoid:number = 3291
	/*当前的法阵id*/
	public defaultFormationId:number;

public read(b){
let len;
this.defaultFormationId=b.readUint8()

}
	constructor(){}
}/*公告结构体*/
export class stNotice{
	/*公告流水号*/
	public uid:number;

	/*公告类型（1弹出公告 3跑马灯）*/
	public type:number;

	/*弹出公告频率 1强弹（进入游戏时弹出）2不强弹（进入游戏时不弹出，用户点击公告按钮时弹出）*/
	public frequent:number;

	/*公告标题*/
	public title:string;

	/*公告内容*/
	public content:string;

	/*模板id*/
	public templateId:number;

	/*模板参数*/
	public params:string[];

	/*发布时间戳*/
	public time:number;

public write(b){
let len;
b.writeUint32(this.uid);
b.writeUint8(this.type);
b.writeUint8(this.frequent);
b.writeUTFString(this.title||"");
b.writeUTFString(this.content||"");
b.writeUint8(this.templateId);

this.params=this.params||[];
len = this.params.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
b.writeUTFString(this.params[i]||"");
}
b.writeUint32(this.time);

}
public read(b){
let len;
this.uid=b.readUint32()
this.type=b.readUint8()
this.frequent=b.readUint8()
this.title=b.readUTFString()
this.content=b.readUTFString()
this.templateId=b.readUint8()
this.params=this.params||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.params.push(b.readUTFString())
}
this.time=b.readUint32()

}
	constructor(){}
}/*公告列表（3010前推，游戏中会主动推跑马灯公告） 协议id:3292*/
export class NoticeList_revc{
public protoid:number = 3292
	/*公告列表*/
	public datalist:stNotice[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stNotice()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*处理宝石返回(主要标记哪个宝石) 协议id:3293*/
export class GemHandler_revc{
public protoid:number = 3293
	/*操作类型 1合成 2重铸 3变质*/
	public type:number;

	/*背包的变化信息,可以是多个(操作购买，法阵、合成、重铸、变质时候用到)*/
	public handlerAfter:stGem=new stGem();

public read(b){
let len;
this.type=b.readUint8()
this.handlerAfter.read(b);

}
	constructor(){}
}/*神兵结构体*/
export class stArtifact{
	/*神兵id（t_Artifact_List表的f_Artifactid）*/
	public artifactId:number;

	/*神兵等级*/
	public level:number;

	/*是否已装备 1已装备 2未装备*/
	public wearable:number;

public write(b){
let len;
b.writeUint8(this.artifactId);
b.writeUint8(this.level);
b.writeUint8(this.wearable);

}
public read(b){
let len;
this.artifactId=b.readUint8()
this.level=b.readUint8()
this.wearable=b.readUint8()

}
	constructor(){}
}/*神兵列表（3010前推，碎片数量通过3004的moneyInfo，3009获取） 协议id:3294*/
export class ArtifactList_revc{
public protoid:number = 3294
	/*神兵列表*/
	public datalist:stArtifact[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stArtifact()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*开神兵宝箱（返回3296，3009） 协议id:3295*/
export class OpenArtifactBox_req{
public protoid:number = 3295
	/*0标识按原先逻辑 1标识在神兵盛宴中使用元宝来锻造*/
	public flag:number;

	/*0抽1次 1十连抽*/
	public type:number;

public write(b){
let len;
b.writeUint8(this.flag);
b.writeUint8(this.type);

}
	constructor(){}
}/*开神兵宝箱 协议id:3296*/
export class OpenArtifactBox_revc{
public protoid:number = 3296
	/*开出的物品数据*/
	public itemlist:stCellValue[];

public read(b){
let len;
this.itemlist=this.itemlist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stCellValue()
item.read(b);
this.itemlist.push(item);

}

}
	constructor(){}
}/*神兵升级(合成)、穿戴（返回3298） 协议id:3297*/
export class ArtifactHandler_req{
public protoid:number = 3297
	/*1升级 2穿戴*/
	public type:number;

	/*神兵的itemId（t_item表的f_itemid）*/
	public itemId:number;

public write(b){
let len;
b.writeUint8(this.type);
b.writeUint8(this.itemId);

}
	constructor(){}
}/*神兵变化 协议id:3298*/
export class ArtifactUpdate_revc{
public protoid:number = 3298
	/*神兵列表的变化量*/
	public datalist:stArtifact[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stArtifact()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*神兵开箱日志结构体*/
export class stArtifactLog{
	/*物品数据*/
	public item:stCellValue=new stCellValue();

	/*unix时间戳*/
	public time:number;

public write(b){
let len;
this.item.write(b);
b.writeUint32(this.time);

}
public read(b){
let len;
this.item.read(b);
this.time=b.readUint32()

}
	constructor(){}
}/*神兵开箱日志 协议id:3299*/
export class ArtifactLogList_req{
public protoid:number = 3299
public write(b){
let len;

}
	constructor(){}
}/*神兵开箱日志 协议id:3300*/
export class ArtifactLogList_revc{
public protoid:number = 3300
	/*神兵开箱日志列表*/
	public datalist:stArtifactLog[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stArtifactLog()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*五一劳动节免费领取 协议id:3301*/
export class LabourPackGet_req{
public protoid:number = 3301
	/*t_Labour_Pack.xlsx中的f_id, f_PurchaseID=0的*/
	public id:number;

	/*类型 0五一劳动节 1六一儿童节*/
	public type:number;

public write(b){
let len;
b.writeUint8(this.id);
b.writeUint8(this.type);

}
	constructor(){}
}/*五一劳动付费礼包,返回3095 协议id:3302*/
export class LabourPackBuy_req{
public protoid:number = 3302
	/*充值表id*/
	public id:number;

	/*类型 0五一劳动节 1六一儿童节*/
	public type:number;

public write(b){
let len;
b.writeUint32(this.id);
b.writeUint8(this.type);

}
	constructor(){}
}/*五一劳动节日扭蛋 协议id:3303*/
export class LabourCapsuleToys_req{
public protoid:number = 3303
	/*类型 0五一劳动节 1六一儿童节*/
	public type:number;

public write(b){
let len;
b.writeUint8(this.type);

}
	constructor(){}
}/*五一劳动节活跃券兑换 协议id:3304*/
export class LabourExchange_req{
public protoid:number = 3304
	/*类型 0五一劳动节 1六一儿童节*/
	public type:number;

public write(b){
let len;
b.writeUint8(this.type);

}
	constructor(){}
}/*五一劳动节商城兑换 协议id:3305*/
export class LabourShop_req{
public protoid:number = 3305
	/*t_Labour_Shop.xlsx的f_id*/
	public id:number;

	/*类型 0五一劳动节 1六一儿童节*/
	public type:number;

public write(b){
let len;
b.writeUint8(this.id);
b.writeUint8(this.type);

}
	constructor(){}
}/*劳动节shop的结构体*/
export class stLabourShop{
	/*t_Labour_Shop.xlsx的f_id*/
	public id:number;

	/*当前id购买的次数*/
	public num:number;

public write(b){
let len;
b.writeUint8(this.id);
b.writeUint8(this.num);

}
public read(b){
let len;
this.id=b.readUint8()
this.num=b.readUint8()

}
	constructor(){}
}/*劳动节抽奖获得的红色的信息*/
export class stLabourItemRed{
	/*t_Labour_Config_item.xlsx的f_id*/
	public id:number;

	/*对应item获得的个数*/
	public num:number;

public write(b){
let len;
b.writeUint8(this.id);
b.writeUint8(this.num);

}
public read(b){
let len;
this.id=b.readUint8()
this.num=b.readUint8()

}
	constructor(){}
}/*五一劳动节商城兑换初始化返回(随着礼包的开启一起返回) 协议id:3306*/
export class LabourShopInit_revc{
public protoid:number = 3306
	/*t_Labour_Shop.xlsx里面每个商品的购买次数*/
	public datalist:stLabourShop[];

	/*t_Labour_Shop_free.xlsx里面每个商品的购买次数, 变化走3549*/
	public datalistFree:stLabourShop[];

	/*每日通过开宝箱获得的活跃券个数*/
	public todayTicketNum:number;

	/*劳动节期间内红色品质获取的信息*/
	public redDatalist:stLabourItemRed[];

	/*劳动节期抽蛋保底剩余*/
	public baodi:number;

	/*类型 0五一劳动节 1六一儿童节*/
	public type:number;

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stLabourShop()
item.read(b);
this.datalist.push(item);

}
this.datalistFree=this.datalistFree||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stLabourShop()
item.read(b);
this.datalistFree.push(item);

}
this.todayTicketNum=b.readUint8()
this.redDatalist=this.redDatalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stLabourItemRed()
item.read(b);
this.redDatalist.push(item);

}
this.baodi=b.readUint8()
this.type=b.readUint8()

}
	constructor(){}
}/*五一劳动节商城购买后返回次数变化 协议id:3307*/
export class LabourShopChange_revc{
public protoid:number = 3307
	/*t_Labour_Shop.xlsx里面每个商品的购买次数(一般情况下只有一条)*/
	public datalist:stLabourShop[];

	/*类型 0五一劳动节 1六一儿童节*/
	public type:number;

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stLabourShop()
item.read(b);
this.datalist.push(item);

}
this.type=b.readUint8()

}
	constructor(){}
}/*神兵结构体*/
export class stArtifactPack{
	/*t_Artifact_pack.xlsx的f_id*/
	public id:number;

	/*当前id购买的次数*/
	public num:number;

public write(b){
let len;
b.writeUint8(this.id);
b.writeUint8(this.num);

}
public read(b){
let len;
this.id=b.readUint8()
this.num=b.readUint8()

}
	constructor(){}
}/*神兵礼包购买情况（3010前推） 协议id:3308*/
export class ArtifactPackList_revc{
public protoid:number = 3308
	/*t_Artifact_pack.xlsx里面每个商品的购买次数*/
	public datalist:stArtifactPack[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stArtifactPack()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*购买神兵礼包后更新（购买次数） 协议id:3309*/
export class ArtifactPackUpdate_revc{
public protoid:number = 3309
	/*更新后的礼包项数据（一般情况下只有一条）*/
	public datalist:stArtifactPack[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stArtifactPack()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*领取免费的神兵礼包 协议id:3310*/
export class ArtifactPack_req{
public protoid:number = 3310
	/*t_Artifact_pack.xlsx的f_id*/
	public id:number;

public write(b){
let len;
b.writeUint8(this.id);

}
	constructor(){}
}/*五一劳动节日扭蛋结构体*/
export class stLabourCapsuleToys{
	/*类型 0 物品 1坐骑*/
	public type:number;

	/*itemid 或者是坐骑id*/
	public id:number;

	/*数量*/
	public count:number;

public write(b){
let len;
b.writeUint8(this.type);
b.writeUint32(this.id);
b.writeUint32(this.count);

}
public read(b){
let len;
this.type=b.readUint8()
this.id=b.readUint32()
this.count=b.readUint32()

}
	constructor(){}
}/*五一劳动节日扭蛋 协议id:3311*/
export class LabourCapsuleToys_revc{
public protoid:number = 3311
	/*列表*/
	public datalist:stLabourCapsuleToys[];

	/*类型 0五一劳动节 1六一儿童节*/
	public type:number;

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stLabourCapsuleToys()
item.read(b);
this.datalist.push(item);

}
this.type=b.readUint8()

}
	constructor(){}
}/*劳动节期间每日获取到的活跃券 协议id:3312*/
export class LabourTicket_revc{
public protoid:number = 3312
	/*每日通过开宝箱获得的活跃券个数*/
	public num:number;

	/*类型 0五一劳动节 1六一儿童节*/
	public type:number;

public read(b){
let len;
this.num=b.readUint8()
this.type=b.readUint8()

}
	constructor(){}
}/*劳动节期间获得红色品质物品个数变化 协议id:3313*/
export class LabourItemRedChange_revc{
public protoid:number = 3313
	/*劳动节期间内红色品质获取的信息*/
	public redDatalist:stLabourItemRed[];

	/*类型 0五一劳动节 1六一儿童节*/
	public type:number;

public read(b){
let len;
this.redDatalist=this.redDatalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stLabourItemRed()
item.read(b);
this.redDatalist.push(item);

}
this.type=b.readUint8()

}
	constructor(){}
}/*劳动节期抽蛋保底剩余,即还有多少次那么一定出红色品质物品 协议id:3314*/
export class LabourBaodiLeft_revc{
public protoid:number = 3314
	/*劳动节期抽蛋保底剩余*/
	public baodi:number;

	/*类型 0五一劳动节 1六一儿童节*/
	public type:number;

public read(b){
let len;
this.baodi=b.readUint8()
this.type=b.readUint8()

}
	constructor(){}
}/*获取最新的道具数量（返回3009） 协议id:3315*/
export class refreshItems_req{
public protoid:number = 3315
	/*物品id（t_Item.xlsx的f_itemid）*/
	public items:number[];

public write(b){
let len;

this.items=this.items||[];
len = this.items.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
b.writeUint8(this.items[i]);
}

}
	constructor(){}
}/*日奖励的结算时间(周六21:00后是下周一的结算时间,周日没有日奖励) 协议id:3316*/
export class dailyReward_revc{
public protoid:number = 3316
	/*日奖励的结算时间戳*/
	public time:number;

public read(b){
let len;
this.time=b.readUint32()

}
	constructor(){}
}/*高级委托开宝箱 协议id:3317*/
export class BoxAuto_req{
public protoid:number = 3317
	/*消耗宝箱券数量*/
	public boxNum:number;

public write(b){
let len;
b.writeUint8(this.boxNum);

}
	constructor(){}
}/*高级委托开宝箱（3010前推，状态发生变化时推） 协议id:3318*/
export class BoxAuto_revc{
public protoid:number = 3318
	/*0未开放 1开放*/
	public open:number;

	/*玩家可选择的最高倍率*/
	public rate:number;

public read(b){
let len;
this.open=b.readUint8()
this.rate=b.readUint8()

}
	constructor(){}
}/*获取巅峰竞技场列表 协议id:3319*/
export class PeakJjcList_req{
public protoid:number = 3319
public write(b){
let len;

}
	constructor(){}
}/*获取巅峰竞技场列表 协议id:3320*/
export class PeakJjcList_revc{
public protoid:number = 3320
	/*玩家列表*/
	public playerList:stJjcPlayer[];

public read(b){
let len;
this.playerList=this.playerList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stJjcPlayer()
item.read(b);
this.playerList.push(item);

}

}
	constructor(){}
}/*获取巅峰竞技场挑战列表 协议id:3321*/
export class PeakJjcRefreshList_req{
public protoid:number = 3321
public write(b){
let len;

}
	constructor(){}
}/*获取巅峰竞技场挑战列表 3061的时候需要处理) 协议id:3322*/
export class PeakJjcRefreshList_revc{
public protoid:number = 3322
	/*玩家列表*/
	public playerList:stJjcPlayer[];

public read(b){
let len;
this.playerList=this.playerList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stJjcPlayer()
item.read(b);
this.playerList.push(item);

}

}
	constructor(){}
}/*巅峰竞技场个人信息 协议id:3323*/
export class PeakJjcInfo_revc{
public protoid:number = 3323
	/*挑战次数自动刷新的时间戳*/
	public fightRefreshTime:number;

	/*当日已经获得红羽数量*/
	public redFeatherVal:number;

public read(b){
let len;
this.fightRefreshTime=b.readUint32()
this.redFeatherVal=b.readUint32()

}
	constructor(){}
}/*巅峰竞技场战斗 协议id:3324*/
export class PeakJjcFight_req{
public protoid:number = 3324
	/*玩家在巅峰竞技场的流水号(即巅峰竞技场的自增id)*/
	public playerId:number;

public write(b){
let len;
b.writeUint32(this.playerId);

}
	constructor(){}
}/*竞技场战斗日志 协议id:3326*/
export class PeakJjcFightLog_req{
public protoid:number = 3326
public write(b){
let len;

}
	constructor(){}
}/*竞技场战斗日志 协议id:3327*/
export class PeakJjcFightLog_revc{
public protoid:number = 3327
	/*日志列表*/
	public loglist:stJjcLog[];

public read(b){
let len;
this.loglist=this.loglist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stJjcLog()
item.read(b);
this.loglist.push(item);

}

}
	constructor(){}
}/*获取巅峰竞技场玩家信息 协议id:3328*/
export class PeakWatchPlayerInfo_req{
public protoid:number = 3328
	/*玩家在巅峰竞技场的流水号(即巅峰竞技场的自增id)*/
	public playerId:number;

public write(b){
let len;
b.writeUint32(this.playerId);

}
	constructor(){}
}/*获取巅峰竞技场玩家信息(弃用,与竞技场用同一个3071) 协议id:3329*/
export class PeakWatchPlayerInfo_revc{
public protoid:number = 3329
	/*角色昵称*/
	public NickName:string;

	/*头像*/
	public HeadUrl:string;

	/*等级*/
	public Level:number;

	/*竞技场对手形象*/
	public PlayerSkin:stSkin=new stSkin();

	/*基础信息*/
	public moneyInfo:stCellValue[];

	/*初始化的装备信息*/
	public equipItem:stEquipItem[];

	/*翅膀*/
	public wing:stWing=new stWing();

	/*坐骑*/
	public ride:stRideInfo[];

	/*竞技场的当前排名*/
	public rank:number;

	/*宝石信息*/
	public Gem:stGemArena=new stGemArena();

	/*神兵信息(只有一条,没有为空)*/
	public Artifact:stArtifact[];

	/*战魂信息*/
	public Spirit:stSpiritArena=new stSpiritArena();

	/*武馆信息*/
	public Gym:stGymArena=new stGymArena();

	/*福佑信息*/
	public Blessing:stBlessingArena=new stBlessingArena();

public read(b){
let len;
this.NickName=b.readUTFString()
this.HeadUrl=b.readUTFString()
this.Level=b.readUint16()
this.PlayerSkin.read(b);
this.moneyInfo=this.moneyInfo||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stCellValue()
item.read(b);
this.moneyInfo.push(item);

}
this.equipItem=this.equipItem||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stEquipItem()
item.read(b);
this.equipItem.push(item);

}
this.wing.read(b);
this.ride=this.ride||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stRideInfo()
item.read(b);
this.ride.push(item);

}
this.rank=b.readUint16()
this.Gem.read(b);
this.Artifact=this.Artifact||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stArtifact()
item.read(b);
this.Artifact.push(item);

}
this.Spirit.read(b);
this.Gym.read(b);
this.Blessing.read(b);

}
	constructor(){}
}/*竞技场领取,返回3025 0通用类型,3331 协议id:3330*/
export class PeakJjcRewardGain_req{
public protoid:number = 3330
	/*0日奖励,1周奖励*/
	public type:number;

public write(b){
let len;
b.writeUint8(this.type);

}
	constructor(){}
}/*竞技场领取 协议id:3331*/
export class PeakJjcRewardGain_revc{
public protoid:number = 3331
	/*日奖励 0不可领取 1可领取*/
	public day:number;

public read(b){
let len;
this.day=b.readUint8()

}
	constructor(){}
}/*获取巅峰竞技场列表,只推送列表中变化推送 协议id:3332*/
export class PeakJjcListChange_revc{
public protoid:number = 3332
	/*玩家列表*/
	public playerList:stJjcPlayer[];

public read(b){
let len;
this.playerList=this.playerList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stJjcPlayer()
item.read(b);
this.playerList.push(item);

}

}
	constructor(){}
}/*巅峰竞技场购买挑战次数 协议id:3333*/
export class PeakJjcBuyFightCnt_req{
public protoid:number = 3333
public write(b){
let len;

}
	constructor(){}
}/*巅峰竞技场购买挑战次数 协议id:3334*/
export class PeakJjcBuyFightCnt_revc{
public protoid:number = 3334
	/*剩余免费次数*/
	public freeCnt:number;

	/*总共拥有的次数*/
	public totalCnt:number;

	/*已经购买了的次数(对巅峰竞技场无用,巅峰竞技场可以无限买,价格都一样)*/
	public buyCnt:number;

public read(b){
let len;
this.freeCnt=b.readUint32()
this.totalCnt=b.readUint32()
this.buyCnt=b.readUint32()

}
	constructor(){}
}/*竞技场开启,关闭 协议id:3335*/
export class PeakJjcOpen_revc{
public protoid:number = 3335
	/*0关闭 1开启*/
	public open:number;

public read(b){
let len;
this.open=b.readUint8()

}
	constructor(){}
}/*巅峰竞技场当前排名变化 协议id:3336*/
export class PeakJjcRankChange_revc{
public protoid:number = 3336
	/*当天排名*/
	public rank:number;

public read(b){
let len;
this.rank=b.readUint16()

}
	constructor(){}
}/*周奖励的结算时间 协议id:3337*/
export class PeakJjcWeeklyRewardUnix_revc{
public protoid:number = 3337
	/*周奖励的结算时间戳*/
	public time:number;

public read(b){
let len;
this.time=b.readUint32()

}
	constructor(){}
}/*日奖励的结算时间(周六21:00后是下周一的结算时间,周日没有日奖励) 协议id:3338*/
export class PeakJjcDailyRewardUnix_revc{
public protoid:number = 3338
	/*日奖励的结算时间戳*/
	public time:number;

public read(b){
let len;
this.time=b.readUint32()

}
	constructor(){}
}/*巅峰竞技场,类比原竞技场3118 协议id:3339*/
export class PeakJjcSucceedReward_revc{
public protoid:number = 3339
	/*挑战成功的时候可以获得的奖品列表*/
	public succeedRewardList:stCellValue[];

public read(b){
let len;
this.succeedRewardList=this.succeedRewardList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stCellValue()
item.read(b);
this.succeedRewardList.push(item);

}

}
	constructor(){}
}/*竞技场剩余刷新的次数,初始化及其变化推送,类比原竞技场3119 协议id:3340*/
export class PeakJjcSurplusRefreshCount_revc{
public protoid:number = 3340
	/*次数*/
	public val:number;

public read(b){
let len;
this.val=b.readUint8()

}
	constructor(){}
}/*手动竞技场挑战列表,类比原竞技场3120 协议id:3341*/
export class PeakJjcActiveRefresh_req{
public protoid:number = 3341
public write(b){
let len;

}
	constructor(){}
}/*获取竞技场周排名信息,类比原竞技场3121 协议id:3342*/
export class PeakJjcWeekInfo_req{
public protoid:number = 3342
public write(b){
let len;

}
	constructor(){}
}/*获取竞技场周排名信息,类比原竞技场3122 协议id:3343*/
export class PeakJjcWeekInfo_revc{
public protoid:number = 3343
	/*当前周排名 无排名就是0,
                                            -1的的时候，客户端不处理当前的排名*/
	public rank:number;

	/*0不可领 1可领取 2已领取*/
	public rewardStatus:number;

public read(b){
let len;
this.rank=b.readFloat64()
this.rewardStatus=b.readUint8()

}
	constructor(){}
}/*称号信息*/
export class stTitleInfo{
	/*t_Title_Lists.xlsx表f_titleid*/
	public titleId:number;

	/*称号到期时间戳，没有传0*/
	public endTime:number;

public write(b){
let len;
b.writeUint8(this.titleId);
b.writeUint32(this.endTime);

}
public read(b){
let len;
this.titleId=b.readUint8()
this.endTime=b.readUint32()

}
	constructor(){}
}/*玩家称号信息（3010前推） 协议id:3344*/
export class TitleInfo_revc{
public protoid:number = 3344
	/*玩家称号id列表(t_Title_Lists.xlsx表f_titleid)*/
	public titleList:stTitleInfo[];

	/*玩家当前穿戴的称号id*/
	public wearedTitleId:number;

	/*奖励状态 0没有奖励 1奖励未领取*/
	public state:number;

public read(b){
let len;
this.titleList=this.titleList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stTitleInfo()
item.read(b);
this.titleList.push(item);

}
this.wearedTitleId=b.readUint8()
this.state=b.readUint8()

}
	constructor(){}
}/*玩家新解锁的称号列表（解锁新称号时推） 协议id:3345*/
export class TitleUpdate_revc{
public protoid:number = 3345
	/*新称号变化量*/
	public titleList:stTitleInfo[];

public read(b){
let len;
this.titleList=this.titleList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stTitleInfo()
item.read(b);
this.titleList.push(item);

}

}
	constructor(){}
}/*领取称号奖励（返回3347） 协议id:3346*/
export class TitleReward_req{
public protoid:number = 3346
public write(b){
let len;

}
	constructor(){}
}/*领取称号奖励 协议id:3347*/
export class TitleReward_revc{
public protoid:number = 3347
	/*玩家当前进行中的称号id*/
	public titleId:number;

	/*奖励状态 0没有奖励 1奖励未领取*/
	public state:number;

	/*称号任务的完成进度更新*/
	public vals:number[];

public read(b){
let len;
this.titleId=b.readUint8()
this.state=b.readUint8()
this.vals=this.vals||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.vals.push(b.readUint32())
}

}
	constructor(){}
}/*换称号（返回3349） 协议id:3348*/
export class TitleChange_req{
public protoid:number = 3348
	/*换上的称号id*/
	public titleId:number;

public write(b){
let len;
b.writeUint8(this.titleId);

}
	constructor(){}
}/*换称号 协议id:3349*/
export class TitleChange_revc{
public protoid:number = 3349
	/*换上的称号id*/
	public titleId:number;

public read(b){
let len;
this.titleId=b.readUint8()

}
	constructor(){}
}/*打开称号界面（返回3353） 协议id:3350*/
export class TitleRefresh_req{
public protoid:number = 3350
public write(b){
let len;

}
	constructor(){}
}/*称号到期时推 协议id:3351*/
export class TitleExpire_revc{
public protoid:number = 3351
	/*玩家过期的称号id列表(t_Title_Lists.xlsx表f_titleid)*/
	public titleList:stTitleInfo[];

public read(b){
let len;
this.titleList=this.titleList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stTitleInfo()
item.read(b);
this.titleList.push(item);

}

}
	constructor(){}
}/*称号奖励领取状态变化时推 协议id:3352*/
export class TitleStateUpdate_revc{
public protoid:number = 3352
	/*奖励状态 0没有奖励 1奖励未领取*/
	public state:number;

public read(b){
let len;
this.state=b.readUint8()

}
	constructor(){}
}/*打开称号界面返回 协议id:3353*/
export class TitleRefresh_revc{
public protoid:number = 3353
	/*玩家当前进行中的称号id*/
	public titleId:number;

	/*奖励状态 0没有奖励 1奖励未领取*/
	public state:number;

	/*称号任务的完成进度更新*/
	public vals:number[];

public read(b){
let len;
this.titleId=b.readUint8()
this.state=b.readUint8()
this.vals=this.vals||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.vals.push(b.readUint32())
}

}
	constructor(){}
}/*红点添加 或者 修改 协议id:3354*/
export class RedMod_req{
public protoid:number = 3354
	/*列表*/
	public datalist:stRedDot[];

public write(b){
let len;

this.datalist=this.datalist||[];
len = this.datalist.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.datalist[i].write(b);
}

}
	constructor(){}
}/*红羽更新 协议id:3355*/
export class PeakJjcMoneyUpdate_revc{
public protoid:number = 3355
	/*当日已经获得红羽*/
	public moneyVal:number;

public read(b){
let len;
this.moneyVal=b.readUint32()

}
	constructor(){}
}/*形象更新结构体*/
export class stPeakJjcAvatar{
	/*名字*/
	public name:string;

	/*称号id*/
	public titleid:number;

	/*战斗力*/
	public plus:number;

	/*排名*/
	public rank:number;

	/*形象*/
	public enemySkin:stSkin=new stSkin();

public write(b){
let len;
b.writeUTFString(this.name||"");
b.writeUint32(this.titleid);
b.writeUint32(this.plus);
b.writeUint8(this.rank);
this.enemySkin.write(b);

}
public read(b){
let len;
this.name=b.readUTFString()
this.titleid=b.readUint32()
this.plus=b.readUint32()
this.rank=b.readUint8()
this.enemySkin.read(b);

}
	constructor(){}
}/*前3名形象更新 协议id:3356*/
export class PeakJjcAvatar_req{
public protoid:number = 3356
public write(b){
let len;

}
	constructor(){}
}/*前3名形象更新 协议id:3357*/
export class PeakJjcAvatar_revc{
public protoid:number = 3357
	/*列表*/
	public datalist:stPeakJjcAvatar[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stPeakJjcAvatar()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*坐骑返乡请求,返回3031和装备变化协议 协议id:3358*/
export class MountReturn_req{
public protoid:number = 3358
	/*坐骑id*/
	public id:number;

public write(b){
let len;
b.writeUint16(this.id);

}
	constructor(){}
}/*坐骑返乡能返回多少道具 协议id:3359*/
export class MountReturnPreView_req{
public protoid:number = 3359
	/*坐骑id*/
	public id:number;

public write(b){
let len;
b.writeUint16(this.id);

}
	constructor(){}
}/*坐骑返乡能返回多少道具 协议id:3360*/
export class MountReturnPreView_revc{
public protoid:number = 3360
	/*奖励数据列表*/
	public rewardList:stCellValue[];

public read(b){
let len;
this.rewardList=this.rewardList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stCellValue()
item.read(b);
this.rewardList.push(item);

}

}
	constructor(){}
}/*坐骑洗髓属性*/
export class stMountRefinement{
	/*属性类型id 读取t_EffectValue.xlsx和t_EquipmentValue.xlsx*/
	public id:number;

	/*属性值t_EquipmentValue.xlsx*/
	public value:number;

	/*属性类型,没有则为0,对应t_Mount_Refinement_Attributerange.xlsx*/
	public quality:number;

	/*属性值额外加成(万分比)*/
	public valueExtra:number;

public write(b){
let len;
b.writeUint16(this.id);
b.writeUint32(this.value);
b.writeUint8(this.quality);
b.writeUint32(this.valueExtra);

}
public read(b){
let len;
this.id=b.readUint16()
this.value=b.readUint32()
this.quality=b.readUint8()
this.valueExtra=b.readUint32()

}
	constructor(){}
}/*坐骑洗髓请求 协议id:3361*/
export class MountRefinement_req{
public protoid:number = 3361
	/*坐骑id*/
	public id:number;

	/*锁定的属性列表*/
	public fixedIds:number[];

	/*洗髓的消耗道具id > 0*/
	public refinementItem:number;

public write(b){
let len;
b.writeUint16(this.id);

this.fixedIds=this.fixedIds||[];
len = this.fixedIds.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
b.writeUint16(this.fixedIds[i]);
}
b.writeUint16(this.refinementItem);

}
	constructor(){}
}/*坐骑洗髓请求 协议id:3362*/
export class MountRefinement_revc{
public protoid:number = 3362
	/*坐骑id*/
	public id:number;

	/*坐骑洗髓生成新属性的列表*/
	public refinements:stMountRefinement[];

public read(b){
let len;
this.id=b.readUint16()
this.refinements=this.refinements||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stMountRefinement()
item.read(b);
this.refinements.push(item);

}

}
	constructor(){}
}/*坐骑洗髓请求替换 协议id:3363*/
export class MountRefinementReplace_req{
public protoid:number = 3363
	/*0 替换 1清空*/
	public status:number;

	/*坐骑id*/
	public id:number;

public write(b){
let len;
b.writeUint8(this.status);
b.writeUint16(this.id);

}
	constructor(){}
}/*坐骑洗髓是否可以锁定属性 协议id:3364*/
export class MountRefinementLock_revc{
public protoid:number = 3364
	/*坐骑id*/
	public id:number;

	/*0不可锁定,1可以锁定属性*/
	public canLock:number;

public read(b){
let len;
this.id=b.readUint16()
this.canLock=b.readUint8()

}
	constructor(){}
}/*坐骑返乡成功 协议id:3365*/
export class MountReturn_revc{
public protoid:number = 3365
public read(b){
let len;

}
	constructor(){}
}/*巅峰竞技场开放时间戳 协议id:3366*/
export class PeakJjcOpenUnix_revc{
public protoid:number = 3366
	/*巅峰竞技场开放时间戳,0标识未开放,大于当前时间戳也标识未开放*/
	public time:number;

public read(b){
let len;
this.time=b.readUint32()

}
	constructor(){}
}/*竞技场下次挑战成功的奖励预览 协议id:3367*/
export class JjcRewardPreview_revc{
public protoid:number = 3367
	/*竞技场类型 0普通竞技场 1巅峰竞技场*/
	public type:number;

	/*奖励数据列表*/
	public rewardList:stCellValue[];

public read(b){
let len;
this.type=b.readUint8()
this.rewardList=this.rewardList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stCellValue()
item.read(b);
this.rewardList.push(item);

}

}
	constructor(){}
}/*副将的结构体*/
export class stChief{
	/*副将id 对应t_Chief_List.xlsx的f_cheifid*/
	public cheifId:number;

	/*副将的等级*/
	public level:number;

	/*副将的星级*/
	public star:number;

	/*是否上阵  1是 0否*/
	public onBattle:number;

	/*上阵中的位置 未上阵是0*/
	public pos:number;

	/*1副将 0角色(cheifId=0)*/
	public isChief:number;

	/*副将的战力(主页面显示的战力=人物战力+副将战力),战力变化是3375*/
	public cheifFight:number;

	/*副将的装备信息,isChief=0此项为空*/
	public equips:stChiefEquip[];

	/*副将的技能信息,isChief=0此项为空*/
	public skills:stChiefSkill[];

	/*副将属性列表*/
	public attrs:stEquipAttr[];

	/*当前皮肤ID*/
	public skinId:number;

	/*副将皮肤列表*/
	public skinIds:number[];

	/*是否为辅助副将 0不是，>0则标识在t_Chief_Support_Inherit.xlsx的f_id*/
	public assistId:number;

public write(b){
let len;
b.writeUint16(this.cheifId);
b.writeUint16(this.level);
b.writeUint8(this.star);
b.writeUint8(this.onBattle);
b.writeUint8(this.pos);
b.writeUint8(this.isChief);
b.writeUint32(this.cheifFight);

this.equips=this.equips||[];
len = this.equips.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.equips[i].write(b);
}

this.skills=this.skills||[];
len = this.skills.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.skills[i].write(b);
}

this.attrs=this.attrs||[];
len = this.attrs.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.attrs[i].write(b);
}
b.writeUint16(this.skinId);

this.skinIds=this.skinIds||[];
len = this.skinIds.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
b.writeUint16(this.skinIds[i]);
}
b.writeUint8(this.assistId);

}
public read(b){
let len;
this.cheifId=b.readUint16()
this.level=b.readUint16()
this.star=b.readUint8()
this.onBattle=b.readUint8()
this.pos=b.readUint8()
this.isChief=b.readUint8()
this.cheifFight=b.readUint32()
this.equips=this.equips||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stChiefEquip()
item.read(b);
this.equips.push(item);

}
this.skills=this.skills||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stChiefSkill()
item.read(b);
this.skills.push(item);

}
this.attrs=this.attrs||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stEquipAttr()
item.read(b);
this.attrs.push(item);

}
this.skinId=b.readUint16()
this.skinIds=this.skinIds||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.skinIds.push(b.readUint16())
}
this.assistId=b.readUint8()

}
	constructor(){}
}/*副将装备信息结构体*/
export class stChiefEquip{
	/*副将装备部位*/
	public partId:number;

	/*副将装备星级*/
	public equipStar:number;

	/*副将装备等级*/
	public equipLevel:number;

public write(b){
let len;
b.writeUint8(this.partId);
b.writeUint16(this.equipStar);
b.writeUint16(this.equipLevel);

}
public read(b){
let len;
this.partId=b.readUint8()
this.equipStar=b.readUint16()
this.equipLevel=b.readUint16()

}
	constructor(){}
}/*副将技能信息结构体*/
export class stChiefSkill{
	/*(弃用)副将技能id, 1技能1 2技能2(前后端技能不匹配,使用槽位来匹配技能)*/
	public skillId:number;

	/*副将技能槽位,1即1号技能...*/
	public skillPos:number;

	/*技能等级(默认1级)*/
	public skillLevel:number;

public write(b){
let len;
b.writeUint8(this.skillId);
b.writeUint8(this.skillPos);
b.writeUint16(this.skillLevel);

}
public read(b){
let len;
this.skillId=b.readUint8()
this.skillPos=b.readUint8()
this.skillLevel=b.readUint16()

}
	constructor(){}
}/*副将初始化的协议 协议id:3368*/
export class ChiefInit_revc{
public protoid:number = 3368
	/*拥有的副将列表*/
	public dataList:stChief[];

	/*下次可免费招募副将的时间戳*/
	public nextFreeUnix:number;

	/*剩余免费招募次数*/
	public freeCount:number;

	/*士气奖励当前剩余数量*/
	public moraleRewardNum:number;

	/*0老服 1新服*/
	public isNewServer:number;

	/*拥有的战旗列表,变化走3566*/
	public flagList:number[];

	/*当前选择的是哪个战旗,变化走3568*/
	public flag:number;

	/*战旗升级的序列号信息,变化走3570*/
	public flagSerial:number;

	/*战旗的战力*/
	public flagFight:number;

	/*副将抽取等级,变化走3589*/
	public drawLevel:number;

	/*当前副将抽取等级下的经验值,变化走3589*/
	public curDrawExp:number;

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stChief()
item.read(b);
this.dataList.push(item);

}
this.nextFreeUnix=b.readUint32()
this.freeCount=b.readUint8()
this.moraleRewardNum=b.readUint16()
this.isNewServer=b.readUint8()
this.flagList=this.flagList||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.flagList.push(b.readUint8())
}
this.flag=b.readUint8()
this.flagSerial=b.readUint16()
this.flagFight=b.readUint32()
this.drawLevel=b.readUint8()
this.curDrawExp=b.readUint32()

}
	constructor(){}
}/*副将主页面数据变动 协议id:3369*/
export class ChiefMainChange_revc{
public protoid:number = 3369
	/*副将列表变量*/
	public dataList:stChief[];

	/*下次可免费招募副将的时间戳*/
	public nextFreeUnix:number;

	/*剩余免费招募次数*/
	public freeCount:number;

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stChief()
item.read(b);
this.dataList.push(item);

}
this.nextFreeUnix=b.readUint32()
this.freeCount=b.readUint8()

}
	constructor(){}
}export class stRecruitChief{
	/*类型:0 副将类型 1 item类型*/
	public type:number;

	/*副将ID*/
	public cheifId:number;

	/*副将转化的物品id*/
	public itemId:number;

	/*物品数量*/
	public count:number;

public write(b){
let len;
b.writeUint8(this.type);
b.writeUint16(this.cheifId);
b.writeUint16(this.itemId);
b.writeUint16(this.count);

}
public read(b){
let len;
this.type=b.readUint8()
this.cheifId=b.readUint16()
this.itemId=b.readUint16()
this.count=b.readUint16()

}
	constructor(){}
}/*招募副将,返回3371和3369 协议id:3370*/
export class RecruitChief_req{
public protoid:number = 3370
	/*0招募单个的免费抽 1使用元宝抽 293使用军令状抽*/
	public itemId:number;

	/*0招募单个 1招募10个 2招募35个*/
	public type:number;

public write(b){
let len;
b.writeUint16(this.itemId);
b.writeUint8(this.type);

}
	constructor(){}
}/*招募副将 协议id:3371*/
export class RecruitChief_revc{
public protoid:number = 3371
	/*招募副将返回的列表*/
	public dataList:stRecruitChief[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stRecruitChief()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*副将上下阵 协议id:3372*/
export class ChiefIntoBattle_req{
public protoid:number = 3372
	/*副将id 对应t_Chief_List.xlsx的f_cheifid*/
	public cheifId:number;

	/*类型 1上阵(包括在阵中移动位置) 0下阵*/
	public type:number;

	/*位置 下阵传0*/
	public pos:number;

	/*1副将 0角色(cheifId=0,角色不可以下阵)*/
	public isChief:number;

public write(b){
let len;
b.writeUint16(this.cheifId);
b.writeUint8(this.type);
b.writeUint8(this.pos);
b.writeUint8(this.isChief);

}
	constructor(){}
}/*购买军令状 协议id:3373*/
export class BuyMilitaryPledge_req{
public protoid:number = 3373
	/*购买军令状的个数*/
	public num:number;

public write(b){
let len;
b.writeUint32(this.num);

}
	constructor(){}
}/*购买军令状成功返回 协议id:3374*/
export class BuyMilitaryPledge_revc{
public protoid:number = 3374
public read(b){
let len;

}
	constructor(){}
}/*副将战力变化 协议id:3375*/
export class CheifFightChange_revc{
public protoid:number = 3375
	/*副将的战力*/
	public cheifFight:number;

public read(b){
let len;
this.cheifFight=b.readUint32()

}
	constructor(){}
}/*副将提升等级,返回3369 协议id:3376*/
export class CheifUpgrade_req{
public protoid:number = 3376
	/*副将id 对应t_Chief_List.xlsx的f_cheifid*/
	public cheifId:number;

	/*提升等级类型  0升1级,1升10级*/
	public type:number;

	/*一次性升多少级,若cnt=0则按type参数升级, cnt>0则服务端不会用到type参数*/
	public cnt:number;

public write(b){
let len;
b.writeUint16(this.cheifId);
b.writeUint8(this.type);
b.writeUint16(this.cnt);

}
	constructor(){}
}/*副将提升星级,返回3369和3376和3390 协议id:3377*/
export class CheifStarUp_req{
public protoid:number = 3377
	/*副将id 对应t_Chief_List.xlsx的f_cheifid*/
	public cheifId:number;

	/*提升多少星级(副将可以升多少星)*/
	public num:number;

public write(b){
let len;
b.writeUint16(this.cheifId);
b.writeUint16(this.num);

}
	constructor(){}
}/*副将提升装备等级 协议id:3378*/
export class CheifEquipUp_req{
public protoid:number = 3378
	/*副将id 对应t_Chief_List.xlsx的f_cheifid*/
	public cheifId:number;

	/*装备部位id, 若为0则一键提升*/
	public partId:number;

	/*当partId>0时候使用, 0升1级 1升10级*/
	public type:number;

public write(b){
let len;
b.writeUint16(this.cheifId);
b.writeUint8(this.partId);
b.writeUint8(this.type);

}
	constructor(){}
}/*副将装备变为初始1级,返回3369和3025 协议id:3379*/
export class CheifReturn_req{
public protoid:number = 3379
	/*副将id 对应t_Chief_List.xlsx的f_cheifid*/
	public cheifId:number;

	/*类型 0即副将等级变为初始值 1副将装备等级变为初始值 2副将技能等级变为初始值*/
	public type:number;

public write(b){
let len;
b.writeUint16(this.cheifId);
b.writeUint8(this.type);

}
	constructor(){}
}/*提升副将的技能等级,返回3369 协议id:3380*/
export class CheifSkillUp_req{
public protoid:number = 3380
	/*副将id 对应t_Chief_List.xlsx的f_cheifid*/
	public cheifId:number;

	/*(弃用)技能id 1技能1  2技能2*/
	public skillId:number;

	/*副将技能槽位,1即1号技能...*/
	public skillPos:number;

public write(b){
let len;
b.writeUint16(this.cheifId);
b.writeUint8(this.skillId);
b.writeUint8(this.skillPos);

}
	constructor(){}
}/*副将领取士气奖励 协议id:3381*/
export class CheifMoraleReward_req{
public protoid:number = 3381
public write(b){
let len;

}
	constructor(){}
}/*副将领取士气奖励 协议id:3382*/
export class CheifMoraleReward_revc{
public protoid:number = 3382
	/*士气奖励当前剩余数量*/
	public moraleRewardNum:number;

public read(b){
let len;
this.moraleRewardNum=b.readUint16()

}
	constructor(){}
}export class stInvitationTopPlayer{
	/*玩家等级*/
	public level:number;

	/*玩家昵称*/
	public name:string;

	/*玩家头像*/
	public portrait:string;

public write(b){
let len;
b.writeUint16(this.level);
b.writeUTFString(this.name||"");
b.writeUTFString(this.portrait||"");

}
public read(b){
let len;
this.level=b.readUint16()
this.name=b.readUTFString()
this.portrait=b.readUTFString()

}
	constructor(){}
}export class stInvitationInfo{
	/*t_Invitation表f_id*/
	public fid:number;

	/*奖励领取状态 1可领取 2已领取*/
	public state:number;

public write(b){
let len;
b.writeUint8(this.fid);
b.writeUint8(this.state);

}
public read(b){
let len;
this.fid=b.readUint8()
this.state=b.readUint8()

}
	constructor(){}
}export class stActivationInfo{
	/*t_Invitation_Value表f_id*/
	public fid:number;

	/*激活状态 1可激活 2已激活*/
	public state:number;

public write(b){
let len;
b.writeUint8(this.fid);
b.writeUint8(this.state);

}
public read(b){
let len;
this.fid=b.readUint8()
this.state=b.readUint8()

}
	constructor(){}
}/*邀请活动红点（3010前发，有可领取奖励时发） 协议id:3383*/
export class InvitationRed_revc{
public protoid:number = 3383
	/*0没有 1有*/
	public red:number;

public read(b){
let len;
this.red=b.readUint8()

}
	constructor(){}
}/*打开邀请活动界面时发（返回3385） 协议id:3384*/
export class Invitation_req{
public protoid:number = 3384
public write(b){
let len;

}
	constructor(){}
}/*邀请活动信息 协议id:3385*/
export class Invitation_revc{
public protoid:number = 3385
	/*已邀请的总人数*/
	public inviteNum:number;

	/*邀请玩家的等级前5名信息*/
	public topList:stInvitationTopPlayer[];

	/*邀请列表*/
	public invitationList:stInvitationInfo[];

	/*激活列表*/
	public activationList:stActivationInfo[];

public read(b){
let len;
this.inviteNum=b.readUint8()
this.topList=this.topList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stInvitationTopPlayer()
item.read(b);
this.topList.push(item);

}
this.invitationList=this.invitationList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stInvitationInfo()
item.read(b);
this.invitationList.push(item);

}
this.activationList=this.activationList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stActivationInfo()
item.read(b);
this.activationList.push(item);

}

}
	constructor(){}
}/*邀请领取奖励（返回3388） 协议id:3386*/
export class InvitationGetReward_req{
public protoid:number = 3386
	/*t_Invitation表f_id*/
	public fid:number;

public write(b){
let len;
b.writeUint8(this.fid);

}
	constructor(){}
}/*邀请激活（返回3389） 协议id:3387*/
export class InvitationGetActivation_req{
public protoid:number = 3387
	/*t_Invitation表f_id*/
	public fid:number;

public write(b){
let len;
b.writeUint8(this.fid);

}
	constructor(){}
}/*邀请列表更新 协议id:3388*/
export class InvitationUpdate_revc{
public protoid:number = 3388
	/*邀请列表变化量*/
	public invitationList:stInvitationInfo[];

public read(b){
let len;
this.invitationList=this.invitationList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stInvitationInfo()
item.read(b);
this.invitationList.push(item);

}

}
	constructor(){}
}/*激活列表更新 协议id:3389*/
export class InvitationActivationUpdate_revc{
public protoid:number = 3389
	/*激活列表变化量*/
	public activationList:stActivationInfo[];

public read(b){
let len;
this.activationList=this.activationList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stActivationInfo()
item.read(b);
this.activationList.push(item);

}

}
	constructor(){}
}/*副将提升星级 协议id:3390*/
export class CheifStarUp_revc{
public protoid:number = 3390
	/*副将id 对应t_Chief_List.xlsx的f_cheifid*/
	public cheifId:number;

	/*副将提升了多少星级*/
	public num:number;

public read(b){
let len;
this.cheifId=b.readUint16()
this.num=b.readUint16()

}
	constructor(){}
}/*副将与坐骑的绑定关系(坐骑初始化和坐骑变化的时候推送) 协议id:3391*/
export class MountChief_revc{
public protoid:number = 3391
	/*副将与坐骑的绑定关系*/
	public dataList:stMountRelation[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stMountRelation()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*副将更换坐骑(不能切换到角色坐骑) 协议id:3392*/
export class MountChiefChange_req{
public protoid:number = 3392
	/*副将id 对应t_Chief_List.xlsx的f_cheifid*/
	public cheifId:number;

	/*坐骑id*/
	public mountId:number;

public write(b){
let len;
b.writeUint16(this.cheifId);
b.writeUint16(this.mountId);

}
	constructor(){}
}export class stFundReward{
	/*是否可领取 0不可领取 1可领取 2已领取*/
	public state:number;

	/*t_FundOne,t_FundTwo,t_FundThree的f_id*/
	public f_id:number;

public write(b){
let len;
b.writeUint8(this.state);
b.writeUint8(this.f_id);

}
public read(b){
let len;
this.state=b.readUint8()
this.f_id=b.readUint8()

}
	constructor(){}
}export class stFund{
	/*t_Fund.xlsx的id*/
	public id:number;

	/*是否可购买 0不可购买 1可购买*/
	public canBuy:number;

	/*基金礼包的领取列表*/
	public dataList:stFundReward[];

public write(b){
let len;
b.writeUint8(this.id);
b.writeUint8(this.canBuy);

this.dataList=this.dataList||[];
len = this.dataList.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.dataList[i].write(b);
}

}
public read(b){
let len;
this.id=b.readUint8()
this.canBuy=b.readUint8()
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stFundReward()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*基金初始化（3010前推，购买后推） 协议id:3393*/
export class FundInit_revc{
public protoid:number = 3393
	/*基金结束时间戳*/
	public endUnix:number;

	/*玩家已购买的基金领取列表*/
	public fundList:stFund[];

public read(b){
let len;
this.endUnix=b.readUint32()
this.fundList=this.fundList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stFund()
item.read(b);
this.fundList.push(item);

}

}
	constructor(){}
}/*跨天刷新（返回3393） 协议id:3394*/
export class FundRefresh_req{
public protoid:number = 3394
public write(b){
let len;

}
	constructor(){}
}/*领取基金奖励（返回3396） 协议id:3395*/
export class FundReward_req{
public protoid:number = 3395
	/*t_Fund.xlsx中id*/
	public id:number;

	/*t_FundOne,t_FundTwo,t_FundThree的f_id*/
	public f_id:number;

public write(b){
let len;
b.writeUint8(this.id);
b.writeUint8(this.f_id);

}
	constructor(){}
}/*领取基金奖励 协议id:3396*/
export class FundReward_revc{
public protoid:number = 3396
	/*更新后的基金奖励领取信息*/
	public updatedFundData:stFund=new stFund();

public read(b){
let len;
this.updatedFundData.read(b);

}
	constructor(){}
}/*副将无损换将 协议id:3398*/
export class ChiefLosslessReplacement_req{
public protoid:number = 3398
	/*副将id(当前阵中的) 对应t_Chief_List.xlsx的f_cheifid*/
	public cheifId:number;

	/*副将id(替换目标待无损换的副将id) 对应t_Chief_List.xlsx的f_cheifid*/
	public cheifReplaceId:number;

public write(b){
let len;
b.writeUint16(this.cheifId);
b.writeUint16(this.cheifReplaceId);

}
	constructor(){}
}/*副将无损换将成功返回 协议id:3399*/
export class ChiefLosslessReplacement_revc{
public protoid:number = 3399
public read(b){
let len;

}
	constructor(){}
}/*获取服务器时间戳 协议id:3400*/
export class GetServerTimeMS_req{
public protoid:number = 3400
public write(b){
let len;

}
	constructor(){}
}/*获取服务器时间戳 协议id:3401*/
export class GetServerTimeMS_revc{
public protoid:number = 3401
	/*服务器时间(毫秒)*/
	public serverTime:uint64=new uint64();

public read(b){
let len;
this.serverTime.read(b);

}
	constructor(){}
}export class stMountRecord{
	/*玩家id*/
	public playerId:number;

	/*玩家昵称带区服*/
	public nickName:string;

	/*坐骑id*/
	public mountId:number;

	/*记录流水号(唯一),角色自己抽奖记录此时序列号=0*/
	public recordSerial:number;

	/*坐骑抽取的时间戳*/
	public time:number;

public write(b){
let len;
b.writeUint32(this.playerId);
b.writeUTFString(this.nickName||"");
b.writeUint16(this.mountId);
b.writeUint32(this.recordSerial);
b.writeUint32(this.time);

}
public read(b){
let len;
this.playerId=b.readUint32()
this.nickName=b.readUTFString()
this.mountId=b.readUint16()
this.recordSerial=b.readUint32()
this.time=b.readUint32()

}
	constructor(){}
}export class stMountNum{
	/*玩家id*/
	public playerId:number;

	/*玩家昵称带区服*/
	public nickName:string;

	/*头像*/
	public headUrl:string;

	/*名次*/
	public ranking:number;

	/*抽取次数*/
	public num:number;

	/*称号id*/
	public titleId:number;

	/*玩家等级*/
	public playerLevel:number;

public write(b){
let len;
b.writeUint32(this.playerId);
b.writeUTFString(this.nickName||"");
b.writeUTFString(this.headUrl||"");
b.writeUint32(this.ranking);
b.writeUint32(this.num);
b.writeUint16(this.titleId);
b.writeUint16(this.playerLevel);

}
public read(b){
let len;
this.playerId=b.readUint32()
this.nickName=b.readUTFString()
this.headUrl=b.readUTFString()
this.ranking=b.readUint32()
this.num=b.readUint32()
this.titleId=b.readUint16()
this.playerLevel=b.readUint16()

}
	constructor(){}
}/*坐骑盛宴初始化(与坐骑盛宴礼包活动一起开放) 协议id:3402*/
export class MountFeastInit_revc{
public protoid:number = 3402
	/*自己的抽奖记录(最多给最新100条),增量协议3405*/
	public selfRecords:stMountRecord[];

	/*活动期间内的累计充值,单位分*/
	public totalCnt:number;

	/*已领取的t_Alternation_Recharge.xlsx的f_id(活动期间内累充的金额奖励)*/
	public rewardList:number[];

public read(b){
let len;
this.selfRecords=this.selfRecords||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stMountRecord()
item.read(b);
this.selfRecords.push(item);

}
this.totalCnt=b.readUint32()
this.rewardList=this.rewardList||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.rewardList.push(b.readUint16())
}

}
	constructor(){}
}/*坐骑盛宴获取坐骑抽取记录(全服) 协议id:3403*/
export class MountFeastRecords_req{
public protoid:number = 3403
	/*上一次抽奖记录的序列号,0则给全量,>0则获取比当前序列号大的增量*/
	public recordSerial:number;

public write(b){
let len;
b.writeUint32(this.recordSerial);

}
	constructor(){}
}/*坐骑盛宴获取坐骑抽取记录(全服) 协议id:3404*/
export class MountFeastRecords_revc{
public protoid:number = 3404
	/*全服抽奖记录(最多给最新100条)*/
	public dataList:stMountRecord[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stMountRecord()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*坐骑盛宴自己抽取记录的增量 协议id:3405*/
export class MountFeastSelfRecords_revc{
public protoid:number = 3405
	/*角色自己抽奖记录增量*/
	public dataList:stMountRecord[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stMountRecord()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*坐骑盛宴获取坐骑抽取记录请求,返回3406为空的时候请求 协议id:3406*/
export class MountFeastNums_req{
public protoid:number = 3406
public write(b){
let len;

}
	constructor(){}
}/*坐骑盛宴获取坐骑抽取记录 协议id:3407*/
export class MountFeastNums_revc{
public protoid:number = 3407
	/*抽取次数前200名列表*/
	public dataList:stMountNum[];

	/*当前玩家自己抽取次数+排名 长度=0则没有,最大长度为1*/
	public self:stMountNum[];

	/*前3名形象*/
	public top3:stPeakJjcAvatar[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stMountNum()
item.read(b);
this.dataList.push(item);

}
this.self=this.self||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stMountNum()
item.read(b);
this.self.push(item);

}
this.top3=this.top3||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stPeakJjcAvatar()
item.read(b);
this.top3.push(item);

}

}
	constructor(){}
}/*坐骑盛宴累充奖励请求 协议id:3408*/
export class MountFeastTotalCntReward_req{
public protoid:number = 3408
	/*t_Alternation_Recharge.xlsx的f_id*/
	public id:number;

public write(b){
let len;
b.writeUint16(this.id);

}
	constructor(){}
}/*坐骑盛宴累充奖励返回 协议id:3409*/
export class MountFeastTotalCntReward_revc{
public protoid:number = 3409
	/*已领取的t_Alternation_Recharge.xlsx的f_id(全量)*/
	public dataList:number[];

public read(b){
let len;
this.dataList=this.dataList||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.dataList.push(b.readUint16())
}

}
	constructor(){}
}/*坐骑盛宴累充金额变量 协议id:3410*/
export class MountFeastTotalCnt_revc{
public protoid:number = 3410
	/*活动期间内的累计充值单位分(变化后的总值)*/
	public totalCnt:number;

public read(b){
let len;
this.totalCnt=b.readUint32()

}
	constructor(){}
}/*征战（3010前推） 协议id:3411*/
export class Conquest_revc{
public protoid:number = 3411
	/*玩家当前所在的关卡id（t_Conquest_Value.xlsx表的f_id）*/
	public fid:number;

	/*章节奖励是否领取，0没有章节奖励 1章节奖励未领取 2已领取（已通关）*/
	public state:number;

public read(b){
let len;
this.fid=b.readUint16()
this.state=b.readUint8()

}
	constructor(){}
}/*征战领取章节奖励（返回3411） 协议id:3412*/
export class ConquestChapterReward_req{
public protoid:number = 3412
public write(b){
let len;

}
	constructor(){}
}/*征战战斗（返回3014） 协议id:3413*/
export class ConquestFight_req{
public protoid:number = 3413
public write(b){
let len;

}
	constructor(){}
}export class stSilkBag{
	/*星星争夺战锦囊id,对应t_Star_PocketTips.xlsx的f_id*/
	public id:number;

	/*锦囊中f_ParaType=1的结束时间戳,其他都标识数量*/
	public val:number;

public write(b){
let len;
b.writeUint8(this.id);
b.writeUint32(this.val);

}
public read(b){
let len;
this.id=b.readUint8()
this.val=b.readUint32()

}
	constructor(){}
}export class stStarBattleEnemy{
	/*玩家id*/
	public accountId:number;

	/*星星争夺战刷新到对手的形象,数组数量=1*/
	public skin:stPeakJjcAvatar[];

	/*当前拥有的锦囊信息*/
	public silkBags:stSilkBag[];

	/*玩家当前星星数量*/
	public starNum:number;

public write(b){
let len;
b.writeUint32(this.accountId);

this.skin=this.skin||[];
len = this.skin.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.skin[i].write(b);
}

this.silkBags=this.silkBags||[];
len = this.silkBags.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.silkBags[i].write(b);
}
b.writeUint32(this.starNum);

}
public read(b){
let len;
this.accountId=b.readUint32()
this.skin=this.skin||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stPeakJjcAvatar()
item.read(b);
this.skin.push(item);

}
this.silkBags=this.silkBags||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stSilkBag()
item.read(b);
this.silkBags.push(item);

}
this.starNum=b.readUint32()

}
	constructor(){}
}/*星星争夺战初始化协议 协议id:3414*/
export class StarBattleInit_revc{
public protoid:number = 3414
	/*上一次转盘所在的位置，对应t_Star_Wheel.xlsx的f_id,位置变化走3420*/
	public wheelNum:number;

	/*钥匙下次恢复的时间戳,0标识钥匙数量是满的,时间变化走3416*/
	public keyRecoveryUnix:number;

	/*玩家角色当前的排行,排名变化走3424*/
	public ranking:number;

	/*玩家当前星星数量,数量变化3425*/
	public starNum:number;

	/*星星争夺战排名奖励,长度最多1, 长度为0标识已领取,奖励领取走3418*/
	public rewardList:stCellValue[];

	/*当前拥有的锦囊信息,变化走3427*/
	public silkBags:stSilkBag[];

	/*奖励 0不可领取 1可领取,变化走3433*/
	public rankRewardState:number;

	/*上个结算时间的排名 0显示无排名*/
	public rankingSettle:number;

	/*星星争夺战商品购买的数量,变化走3436(废弃不用)*/
	public dataList:stStarGoods[];

public read(b){
let len;
this.wheelNum=b.readUint8()
this.keyRecoveryUnix=b.readUint32()
this.ranking=b.readUint32()
this.starNum=b.readUint32()
this.rewardList=this.rewardList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stCellValue()
item.read(b);
this.rewardList.push(item);

}
this.silkBags=this.silkBags||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stSilkBag()
item.read(b);
this.silkBags.push(item);

}
this.rankRewardState=b.readUint8()
this.rankingSettle=b.readUint32()
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stStarGoods()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*星星争夺战恢复钥匙(不用,后端主动推) 协议id:3415*/
export class StarBattleKeyRecovery_req{
public protoid:number = 3415
public write(b){
let len;

}
	constructor(){}
}/*星星争夺战恢复钥匙 协议id:3416*/
export class StarBattleKeyRecovery_revc{
public protoid:number = 3416
	/*钥匙下次恢复的时间戳,0标识钥匙数量是满的*/
	public keyRecoveryUnix:number;

public read(b){
let len;
this.keyRecoveryUnix=b.readUint32()

}
	constructor(){}
}/*星星争夺战领取奖励 协议id:3417*/
export class StarBattleReward_req{
public protoid:number = 3417
public write(b){
let len;

}
	constructor(){}
}/*星星争夺战领取奖励 协议id:3418*/
export class StarBattleReward_revc{
public protoid:number = 3418
	/*领取成功返回空数组*/
	public rewardList:stCellValue[];

public read(b){
let len;
this.rewardList=this.rewardList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stCellValue()
item.read(b);
this.rewardList.push(item);

}

}
	constructor(){}
}/*星星争夺战转动转盘 协议id:3419*/
export class TurnWheel_req{
public protoid:number = 3419
public write(b){
let len;

}
	constructor(){}
}/*星星争夺战转动转盘,奖励提示使用3024类型传14来获取延迟奖励 协议id:3420*/
export class TurnWheel_revc{
public protoid:number = 3420
	/*上一次转盘所在的位置，对应t_Star_Wheel.xlsx的f_id*/
	public wheelNum:number;

public read(b){
let len;
this.wheelNum=b.readUint8()

}
	constructor(){}
}/*星星争夺战获取挑战对手列表 协议id:3421*/
export class StarBattleEnemys_req{
public protoid:number = 3421
	/*0表示从转盘打开 1刷新对手*/
	public type:number;

public write(b){
let len;
b.writeUint8(this.type);

}
	constructor(){}
}/*星星争夺战获取挑战对手列表 协议id:3422*/
export class StarBattleEnemys_revc{
public protoid:number = 3422
	/*0表示从转盘打开 1刷新对手*/
	public type:number;

	/*刷新对手的列表*/
	public dataList:stStarBattleEnemy[];

public read(b){
let len;
this.type=b.readUint8()
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stStarBattleEnemy()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*星星争夺战pk对手(复仇也走相同),返回竞技场通用战斗协议3067+3424 协议id:3423*/
export class StarBattleFight_req{
public protoid:number = 3423
	/*玩家id*/
	public accountId:number;

public write(b){
let len;
b.writeUint32(this.accountId);

}
	constructor(){}
}/*星星争夺战pk对手后排名变化 协议id:3424*/
export class StarBattleFight_revc{
public protoid:number = 3424
	/*玩家角色当前的排行*/
	public ranking:number;

	/*获得星星数量的百分比,默认是15,当敌方有空城计锦囊时候是10*/
	public starPercent:number;

public read(b){
let len;
this.ranking=b.readUint32()
this.starPercent=b.readUint8()

}
	constructor(){}
}/*星星争夺战当前玩家星星数量变化 协议id:3425*/
export class StarNumChange_revc{
public protoid:number = 3425
	/*玩家当前星星数量(变化后的总量)*/
	public starNum:number;

public read(b){
let len;
this.starNum=b.readUint32()

}
	constructor(){}
}/*星星争夺战处理锦囊 协议id:3426*/
export class SilkBagHandler_req{
public protoid:number = 3426
	/*1购买锦囊,0删除锦囊*/
	public type:number;

	/*星星争夺战锦囊的id,对应t_Star_PocketTips.xlsx的f_id*/
	public id:number;

public write(b){
let len;
b.writeUint8(this.type);
b.writeUint16(this.id);

}
	constructor(){}
}/*星星争夺战锦囊变化 协议id:3427*/
export class SilkBagHandler_revc{
public protoid:number = 3427
	/*当前拥有的锦囊信息*/
	public silkBags:stSilkBag[];

public read(b){
let len;
this.silkBags=this.silkBags||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stSilkBag()
item.read(b);
this.silkBags.push(item);

}

}
	constructor(){}
}/*星星争夺战战斗日志数据结构*/
export class stStarBattleLog{
	/*玩家角色id*/
	public accountId:number;

	/*时间戳*/
	public time:number;

	/*是否发起者 1 是 0 否*/
	public atk:number;

	/*玩家名*/
	public playerName:string;

	/*变化的星星数量*/
	public changeVal:number;

	/*headUrl*/
	public headUrl:string;

	/*战斗力*/
	public plus:number;

	/*是否打赢 0输了 1赢了*/
	public win:number;

	/*玩家的星星数量*/
	public starNum:number;

public write(b){
let len;
b.writeUint32(this.accountId);
b.writeUint32(this.time);
b.writeUint8(this.atk);
b.writeUTFString(this.playerName||"");
b.writeInt16(this.changeVal);
b.writeUTFString(this.headUrl||"");
b.writeUint32(this.plus);
b.writeUint8(this.win);
b.writeUint32(this.starNum);

}
public read(b){
let len;
this.accountId=b.readUint32()
this.time=b.readUint32()
this.atk=b.readUint8()
this.playerName=b.readUTFString()
this.changeVal=b.readInt16()
this.headUrl=b.readUTFString()
this.plus=b.readUint32()
this.win=b.readUint8()
this.starNum=b.readUint32()

}
	constructor(){}
}/*星星争夺战日志 协议id:3428*/
export class StarBattleLog_req{
public protoid:number = 3428
public write(b){
let len;

}
	constructor(){}
}/*星星争夺战日志 协议id:3429*/
export class StarBattleLog_revc{
public protoid:number = 3429
	/*星星争夺战日志列表*/
	public dataList:stStarBattleLog[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stStarBattleLog()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}export class stStarRank{
	/*玩家角色id*/
	public accountId:number;

	/*玩家昵称不带区服*/
	public nickName:string;

	/*区服名称*/
	public serverName:string;

	/*区服冠名*/
	public naming:string;

	/*头像*/
	public headUrl:string;

	/*名次*/
	public ranking:number;

	/*星星数量*/
	public starNum:number;

	/*称号id*/
	public titleId:number;

	/*玩家等级*/
	public playerLevel:number;

	/*战斗力*/
	public plus:number;

public write(b){
let len;
b.writeUint32(this.accountId);
b.writeUTFString(this.nickName||"");
b.writeUTFString(this.serverName||"");
b.writeUTFString(this.naming||"");
b.writeUTFString(this.headUrl||"");
b.writeUint32(this.ranking);
b.writeUint32(this.starNum);
b.writeUint16(this.titleId);
b.writeUint16(this.playerLevel);
b.writeUint32(this.plus);

}
public read(b){
let len;
this.accountId=b.readUint32()
this.nickName=b.readUTFString()
this.serverName=b.readUTFString()
this.naming=b.readUTFString()
this.headUrl=b.readUTFString()
this.ranking=b.readUint32()
this.starNum=b.readUint32()
this.titleId=b.readUint16()
this.playerLevel=b.readUint16()
this.plus=b.readUint32()

}
	constructor(){}
}/*星星争夺战排行榜请求 协议id:3430*/
export class StarBattleRank_req{
public protoid:number = 3430
public write(b){
let len;

}
	constructor(){}
}/*星星争夺战排行榜请求 协议id:3431*/
export class StarBattleRank_revc{
public protoid:number = 3431
	/*星星争夺战前50名的信息*/
	public dataList:stStarRank[];

	/*当前玩家自己在星星争夺战的排名 长度=0则没有,最大长度为1*/
	public self:stStarRank[];

	/*前3名形象*/
	public top3:stPeakJjcAvatar[];

	/*奖励时间戳*/
	public rewardUnix:number;

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stStarRank()
item.read(b);
this.dataList.push(item);

}
this.self=this.self||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stStarRank()
item.read(b);
this.self.push(item);

}
this.top3=this.top3||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stPeakJjcAvatar()
item.read(b);
this.top3.push(item);

}
this.rewardUnix=b.readUint32()

}
	constructor(){}
}/*星星争夺战排行榜奖励领取 协议id:3432*/
export class StarBattleRankReward_req{
public protoid:number = 3432
public write(b){
let len;

}
	constructor(){}
}/*星星争夺战排行榜奖励领取 协议id:3433*/
export class StarBattleRankReward_revc{
public protoid:number = 3433
	/*奖励 0不可领取 1可领取*/
	public rewardState:number;

public read(b){
let len;
this.rewardState=b.readUint8()

}
	constructor(){}
}/*获取玩家信息,与竞技场用同一个3071 协议id:3434*/
export class StarWatchPlayerInfo_req{
public protoid:number = 3434
	/*玩家的角色ID*/
	public accountId:number;

public write(b){
let len;
b.writeUint32(this.accountId);

}
	constructor(){}
}export class stStarGoods{
	/*星星争夺战商店的物品id对应t_Star_Shop.xlsx的f_goodsid*/
	public goodsId:number;

	/*商品购买的数量*/
	public num:number;

public write(b){
let len;
b.writeUint16(this.goodsId);
b.writeUint16(this.num);

}
public read(b){
let len;
this.goodsId=b.readUint16()
this.num=b.readUint16()

}
	constructor(){}
}/*星星争夺战商店兑换 协议id:3435*/
export class StarShopBuy_req{
public protoid:number = 3435
	/*购买的数量*/
	public num:number;

	/*商品对应的商店ID*/
	public goodsId:number;

public write(b){
let len;
b.writeUint32(this.num);
b.writeUint16(this.goodsId);

}
	constructor(){}
}/*星星争夺战商店兑换 协议id:3436*/
export class StarShopBuy_revc{
public protoid:number = 3436
	/*单个商品购买数量的变化*/
	public dataList:stStarGoods[];

	/*商店物品刷新的时间戳*/
	public goodsFreshUnix:number;

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stStarGoods()
item.read(b);
this.dataList.push(item);

}
this.goodsFreshUnix=b.readUint32()

}
	constructor(){}
}export class stActivityRecord{
	/*玩家id*/
	public playerId:number;

	/*玩家昵称带区服*/
	public nickName:string;

	/*坐骑id、宝石id...*/
	public id:number;

	/*坐骑等级、宝石等级...*/
	public level:number;

	/*记录流水号(唯一),角色自己抽奖记录此时序列号=0*/
	public recordSerial:number;

	/*坐骑抽取的时间戳*/
	public time:number;

public write(b){
let len;
b.writeUint32(this.playerId);
b.writeUTFString(this.nickName||"");
b.writeUint32(this.id);
b.writeUint16(this.level);
b.writeUint32(this.recordSerial);
b.writeUint32(this.time);

}
public read(b){
let len;
this.playerId=b.readUint32()
this.nickName=b.readUTFString()
this.id=b.readUint32()
this.level=b.readUint16()
this.recordSerial=b.readUint32()
this.time=b.readUint32()

}
	constructor(){}
}export class stActivityNum{
	/*玩家id*/
	public playerId:number;

	/*玩家昵称带区服*/
	public nickName:string;

	/*头像*/
	public headUrl:string;

	/*名次*/
	public ranking:number;

	/*次数*/
	public num:number;

	/*称号id*/
	public titleId:number;

	/*玩家等级*/
	public playerLevel:number;

public write(b){
let len;
b.writeUint32(this.playerId);
b.writeUTFString(this.nickName||"");
b.writeUTFString(this.headUrl||"");
b.writeUint32(this.ranking);
b.writeUint32(this.num);
b.writeUint16(this.titleId);
b.writeUint16(this.playerLevel);

}
public read(b){
let len;
this.playerId=b.readUint32()
this.nickName=b.readUTFString()
this.headUrl=b.readUTFString()
this.ranking=b.readUint32()
this.num=b.readUint32()
this.titleId=b.readUint16()
this.playerLevel=b.readUint16()

}
	constructor(){}
}/*活动初始化(与活动礼包礼包活动一起开放) 协议id:3437*/
export class ActivityInit_revc{
public protoid:number = 3437
	/*1坐骑盛宴 2宝石盛宴...*/
	public type:number;

	/*自己的抽奖记录(最多给最新100条)*/
	public selfRecords:stActivityRecord[];

	/*活动期间内的累计充值,单位分*/
	public totalCnt:number;

	/*已领取的t_Alternation_Recharge.xlsx的f_id(活动期间内累充的金额奖励)*/
	public rewardList:number[];

public read(b){
let len;
this.type=b.readUint8()
this.selfRecords=this.selfRecords||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stActivityRecord()
item.read(b);
this.selfRecords.push(item);

}
this.totalCnt=b.readUint32()
this.rewardList=this.rewardList||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.rewardList.push(b.readUint16())
}

}
	constructor(){}
}/*活动抽取或获得记录(全服) 协议id:3438*/
export class ActivityRecords_req{
public protoid:number = 3438
	/*0非新人盛宴 1新人盛宴*/
	public isNewPlayer:number;

	/*1坐骑盛宴 2宝石盛宴...*/
	public type:number;

	/*上一次抽奖记录的序列号,0则给全量,>0则获取比当前序列号大的增量*/
	public recordSerial:number;

public write(b){
let len;
b.writeUint8(this.isNewPlayer);
b.writeUint8(this.type);
b.writeUint32(this.recordSerial);

}
	constructor(){}
}/*活动抽取或获得记录(全服) 协议id:3439*/
export class ActivityRecords_revc{
public protoid:number = 3439
	/*0非新人盛宴 1新人盛宴*/
	public isNewPlayer:number;

	/*1坐骑盛宴 2宝石盛宴...*/
	public type:number;

	/*全服抽奖或获取记录(最多给最新100条)*/
	public dataList:stActivityRecord[];

public read(b){
let len;
this.isNewPlayer=b.readUint8()
this.type=b.readUint8()
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stActivityRecord()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*活动自己抽取或获得记录的增量 协议id:3440*/
export class ActivitySelfRecords_revc{
public protoid:number = 3440
	/*1坐骑盛宴 2宝石盛宴...*/
	public type:number;

	/*角色自己抽奖记录增量*/
	public dataList:stActivityRecord[];

public read(b){
let len;
this.type=b.readUint8()
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stActivityRecord()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*活动抽取或获得记录请求 协议id:3441*/
export class ActivityNums_req{
public protoid:number = 3441
	/*0非新人盛宴 1新人盛宴*/
	public isNewPlayer:number;

	/*1坐骑盛宴 2宝石盛宴...*/
	public type:number;

public write(b){
let len;
b.writeUint8(this.isNewPlayer);
b.writeUint8(this.type);

}
	constructor(){}
}/*活动获取坐骑抽取记录 协议id:3442*/
export class ActivityNums_revc{
public protoid:number = 3442
	/*0非新人盛宴 1新人盛宴*/
	public isNewPlayer:number;

	/*1坐骑盛宴 2宝石盛宴...*/
	public type:number;

	/*抽取次数前200名列表*/
	public dataList:stActivityNum[];

	/*当前玩家自己抽取次数+排名 长度=0则没有,最大长度为1*/
	public self:stActivityNum[];

	/*前3名形象*/
	public top3:stPeakJjcAvatar[];

public read(b){
let len;
this.isNewPlayer=b.readUint8()
this.type=b.readUint8()
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stActivityNum()
item.read(b);
this.dataList.push(item);

}
this.self=this.self||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stActivityNum()
item.read(b);
this.self.push(item);

}
this.top3=this.top3||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stPeakJjcAvatar()
item.read(b);
this.top3.push(item);

}

}
	constructor(){}
}/*活动累充奖励请求 协议id:3443*/
export class ActivityTotalCntReward_req{
public protoid:number = 3443
	/*1坐骑盛宴 2宝石盛宴...*/
	public type:number;

	/*t_Alternation_Recharge.xlsx的f_id*/
	public id:number;

public write(b){
let len;
b.writeUint8(this.type);
b.writeUint16(this.id);

}
	constructor(){}
}/*活动累充奖励返回 协议id:3444*/
export class ActivityTotalCntReward_revc{
public protoid:number = 3444
	/*1坐骑盛宴 2宝石盛宴...*/
	public type:number;

	/*已领取的t_Alternation_Recharge.xlsx的f_id(全量)*/
	public dataList:number[];

public read(b){
let len;
this.type=b.readUint8()
this.dataList=this.dataList||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.dataList.push(b.readUint16())
}

}
	constructor(){}
}/*活动累充金额变量 协议id:3445*/
export class ActivityTotalCnt_revc{
public protoid:number = 3445
	/*1坐骑盛宴 2宝石盛宴...*/
	public type:number;

	/*活动期间内的累计充值单位分(变化后的总值)*/
	public totalCnt:number;

public read(b){
let len;
this.type=b.readUint8()
this.totalCnt=b.readUint32()

}
	constructor(){}
}/*鏖战凶兽初始化（3010前发） 协议id:3446*/
export class TeamFightInit_revc{
public protoid:number = 3446
	/*凶兽id（t_TeamFight_BossPokedex的f_BossID）*/
	public bossId:number;

	/*今日免费打怪次数*/
	public freeNum:number;

	/*今日使用元宝打怪次数*/
	public buyNum:number;

	/*今日看广告打怪次数*/
	public adNum:number;

	/*本周累积伤害值*/
	public accHarm:uint64=new uint64();

	/*玩家已领取的伤害奖励id（t_TeamFight_Reward的f_id）*/
	public harmRewardFid:number;

	/*玩家的排名*/
	public ranking:number;

	/*玩家上次结算周排名奖励时的排名*/
	public lastRanking:number;

	/*周排名奖励领取状态 0无奖励 1未领取 2已领取*/
	public rankRewardState:number;

	/*奖励结算时间戳*/
	public closeUnix:number;

public read(b){
let len;
this.bossId=b.readUint8()
this.freeNum=b.readUint8()
this.buyNum=b.readUint8()
this.adNum=b.readUint8()
this.accHarm.read(b);
this.harmRewardFid=b.readUint8()
this.ranking=b.readUint16()
this.lastRanking=b.readUint16()
this.rankRewardState=b.readUint8()
this.closeUnix=b.readUint32()

}
	constructor(){}
}/*鏖战玩家列表数据*/
export class stTeamFightPlayer{
	/*玩家头像*/
	public headUrl:string;

	/*玩家名字*/
	public name:string;

	/*玩家等级*/
	public lv:number;

	/*战斗力*/
	public plus:number;

	/*排名*/
	public rank:number;

	/*玩家角色ID*/
	public accountId:number;

	/*称号id*/
	public titleId:number;

	/*本周累积伤害值*/
	public accHarm:uint64=new uint64();

public write(b){
let len;
b.writeUTFString(this.headUrl||"");
b.writeUTFString(this.name||"");
b.writeUint16(this.lv);
b.writeUint32(this.plus);
b.writeUint16(this.rank);
b.writeUint32(this.accountId);
b.writeUint8(this.titleId);
this.accHarm.write(b);

}
public read(b){
let len;
this.headUrl=b.readUTFString()
this.name=b.readUTFString()
this.lv=b.readUint16()
this.plus=b.readUint32()
this.rank=b.readUint16()
this.accountId=b.readUint32()
this.titleId=b.readUint8()
this.accHarm.read(b);

}
	constructor(){}
}/*鏖战凶兽排行榜 协议id:3447*/
export class TeamFightRankList_revc{
public protoid:number = 3447
	/*玩家战斗力（主将+副将）*/
	public plus:number;

	/*鏖战凶兽排行榜*/
	public dataList:stTeamFightPlayer[];

public read(b){
let len;
this.plus=b.readUint32()
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stTeamFightPlayer()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*鏖战凶兽领取伤害奖励（返回3449） 协议id:3448*/
export class TeamFightHarmReward_req{
public protoid:number = 3448
public write(b){
let len;

}
	constructor(){}
}/*鏖战凶兽领取伤害奖励 协议id:3449*/
export class TeamFightHarmReward_revc{
public protoid:number = 3449
	/*玩家已领取的伤害奖励id（t_TeamFight_Reward的f_id）*/
	public harmRewardFid:number;

public read(b){
let len;
this.harmRewardFid=b.readUint8()

}
	constructor(){}
}/*鏖战凶兽领取排行榜周奖励（返回3451） 协议id:3450*/
export class TeamFightRankReward_req{
public protoid:number = 3450
public write(b){
let len;

}
	constructor(){}
}/*鏖战凶兽领取排行榜周奖励 协议id:3451*/
export class TeamFightRankReward_revc{
public protoid:number = 3451
	/*排行周经理领取状态 0无奖励 1未领取 2已领取*/
	public rankRewardState:number;

public read(b){
let len;
this.rankRewardState=b.readUint8()

}
	constructor(){}
}/*鏖战凶兽战斗请求（返回3453） 协议id:3452*/
export class TeamFight_req{
public protoid:number = 3452
	/*1免费挑战 2用元宝挑战（看广告挑战，用3273请求）*/
	public type:number;

public write(b){
let len;
b.writeUint8(this.type);

}
	constructor(){}
}/*鏖战凶兽战斗 协议id:3453*/
export class TeamFight_revc{
public protoid:number = 3453
	/*今日免费打怪次数*/
	public freeNum:number;

	/*今日使用元宝打怪次数*/
	public buyNum:number;

	/*今日看广告打怪次数*/
	public adNum:number;

	/*本周累积伤害值*/
	public accHarm:uint64=new uint64();

	/*玩家的排名*/
	public ranking:number;

	/*本局战斗的总伤害值*/
	public totalHarm:number;

public read(b){
let len;
this.freeNum=b.readUint8()
this.buyNum=b.readUint8()
this.adNum=b.readUint8()
this.accHarm.read(b);
this.ranking=b.readUint16()
this.totalHarm=b.readUint32()

}
	constructor(){}
}/*鏖战凶兽排行榜 协议id:3454*/
export class TeamFightRankList_req{
public protoid:number = 3454
public write(b){
let len;

}
	constructor(){}
}/*鏖战凶兽挑战次数 协议id:3455*/
export class TeamFightNum_revc{
public protoid:number = 3455
	/*今日免费打怪次数*/
	public freeNum:number;

	/*今日使用元宝打怪次数*/
	public buyNum:number;

	/*今日看广告打怪次数*/
	public adNum:number;

public read(b){
let len;
this.freeNum=b.readUint8()
this.buyNum=b.readUint8()
this.adNum=b.readUint8()

}
	constructor(){}
}/*副将更换皮肤,返回3369 协议id:3456*/
export class CheifChangeSkin_req{
public protoid:number = 3456
	/*副将id 对应t_Chief_List.xlsx的f_cheifid*/
	public cheifId:number;

	/*皮肤Id*/
	public skinId:number;

public write(b){
let len;
b.writeUint16(this.cheifId);
b.writeUint16(this.skinId);

}
	constructor(){}
}/*兑换码（错误返回1004错误码，正确返回3009，3025） 协议id:3457*/
export class RedemptionCode_req{
public protoid:number = 3457
	/*兑换码*/
	public code:string;

public write(b){
let len;
b.writeUTFString(this.code||"");

}
	constructor(){}
}/*星星争夺战突袭战,返回星星争夺战的战斗协议 协议id:3458*/
export class StarStrike_req{
public protoid:number = 3458
public write(b){
let len;

}
	constructor(){}
}/*武神殿敌人信息*/
export class stPalaceEnemy{
	/*敌人id(t_Palace_Enemy.xlsx表f_EnemyID)*/
	public enemyId:number;

	/*敌人星级*/
	public star:number;

	/*敌人等级*/
	public level:number;

	/*敌人品质*/
	public quality:number;

public write(b){
let len;
b.writeUint8(this.enemyId);
b.writeUint8(this.star);
b.writeUint16(this.level);
b.writeUint8(this.quality);

}
public read(b){
let len;
this.enemyId=b.readUint8()
this.star=b.readUint8()
this.level=b.readUint16()
this.quality=b.readUint8()

}
	constructor(){}
}/*武神殿信息（3010前发） 协议id:3459*/
export class PalaceInit_revc{
public protoid:number = 3459
	/*玩家当前挑战关卡id*/
	public id:number;

	/*当前关卡的敌人信息列表*/
	public enemyList:stPalaceEnemy[];

	/*敌人总战力*/
	public power:number;

	/*属性id（阵容特性）*/
	public attrList:number[];

	/*玩家当前的排名*/
	public ranking:number;

	/*玩家上次结算排名奖励时的排名*/
	public lastRanking:number;

	/*周排名奖励领取状态 0无奖励 1未领取 2已领取*/
	public rankRewardState:number;

	/*神魂列表*/
	public buffList:stPalaceBuff[];

	/*已解锁的全部核心神魂列表（t_Palace_Data_Buff.xlsx的f_id，当栏位上没有神魂时传0）*/
	public coreBuffList:number[];

	/*0不是首通 1是首通*/
	public state:number;

	/*0未通关 1已通关*/
	public clear:number;

public read(b){
let len;
this.id=b.readUint8()
this.enemyList=this.enemyList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stPalaceEnemy()
item.read(b);
this.enemyList.push(item);

}
this.power=b.readUint32()
this.attrList=this.attrList||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.attrList.push(b.readUint16())
}
this.ranking=b.readUint16()
this.lastRanking=b.readUint16()
this.rankRewardState=b.readUint8()
this.buffList=this.buffList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stPalaceBuff()
item.read(b);
this.buffList.push(item);

}
this.coreBuffList=this.coreBuffList||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.coreBuffList.push(b.readUint8())
}
this.state=b.readUint8()
this.clear=b.readUint8()

}
	constructor(){}
}/*武神殿重置（返回3459） 协议id:3460*/
export class PalaceReset_req{
public protoid:number = 3460
public write(b){
let len;

}
	constructor(){}
}/*武神殿挑战（返回3462或3014） 协议id:3461*/
export class PalaceFight_req{
public protoid:number = 3461
	/*0挑战 1继续挑战*/
	public type:number;

public write(b){
let len;
b.writeUint8(this.type);

}
	constructor(){}
}/*武神殿敌人信息*/
export class stPalaceBuff{
	/*t_Palace_DataType.xlsx的f_id(当栏位上没有神魂时传0)*/
	public buffId:number;

	/*buff当前数值(当栏位上没有神魂时传0)*/
	public val:number;

	/*已选择次数(当栏位上没有神魂时传0)*/
	public times:number;

	/*增加的buff数值（在选择buff时有值，其他情况为0）*/
	public addVal:number;

	/*神魂品质*/
	public quality:number;

public write(b){
let len;
b.writeUint8(this.buffId);
b.writeUint32(this.val);
b.writeUint8(this.times);
b.writeUint32(this.addVal);
b.writeUint8(this.quality);

}
public read(b){
let len;
this.buffId=b.readUint8()
this.val=b.readUint32()
this.times=b.readUint8()
this.addVal=b.readUint32()
this.quality=b.readUint8()

}
	constructor(){}
}/*武神殿神魂选择列表 协议id:3462*/
export class PalaceChooseBuff_revc{
public protoid:number = 3462
	/*神魂列表*/
	public buffList:stPalaceBuff[];

	/*玩家刷新神魂的次数*/
	public refreshTimes:number;

public read(b){
let len;
this.buffList=this.buffList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stPalaceBuff()
item.read(b);
this.buffList.push(item);

}
this.refreshTimes=b.readUint8()

}
	constructor(){}
}/*武神殿选择神魂（返回3464，3466或3014） 协议id:3463*/
export class PalaceChooseBuff_req{
public protoid:number = 3463
	/*t_Palace_DataType.xlsx的f_id*/
	public buffId:number;

public write(b){
let len;
b.writeUint8(this.buffId);

}
	constructor(){}
}/*武神殿玩家当前的神魂列表 协议id:3464*/
export class PalaceBuffList_revc{
public protoid:number = 3464
	/*已解锁的全部神魂列表*/
	public buffList:stPalaceBuff[];

public read(b){
let len;
this.buffList=this.buffList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stPalaceBuff()
item.read(b);
this.buffList.push(item);

}

}
	constructor(){}
}/*武神殿刷新神魂选择列表（返回3462） 协议id:3465*/
export class PalaceRefreshBuff_req{
public protoid:number = 3465
public write(b){
let len;

}
	constructor(){}
}/*武神殿核心神魂选择列表 协议id:3466*/
export class PalaceChooseCoreBuff_revc{
public protoid:number = 3466
	/*核心神魂列表（t_Palace_Data_Buff.xlsx的f_id）*/
	public coreBuffList:number[];

public read(b){
let len;
this.coreBuffList=this.coreBuffList||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.coreBuffList.push(b.readUint8())
}

}
	constructor(){}
}/*武神殿选择核心神魂（返回3468、或3014） 协议id:3467*/
export class PalaceChooseCoreBuff_req{
public protoid:number = 3467
	/*t_Palace_Data_Buff.xlsx的f_id*/
	public coreBuffId:number;

public write(b){
let len;
b.writeUint8(this.coreBuffId);

}
	constructor(){}
}/*武神殿玩家当前的神魂列表 协议id:3468*/
export class PalaceCoreBuffList_revc{
public protoid:number = 3468
	/*已解锁的全部核心神魂列表（t_Palace_Data_Buff.xlsx的f_id，当栏位上没有神魂时传0）*/
	public coreBuffList:number[];

public read(b){
let len;
this.coreBuffList=this.coreBuffList||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.coreBuffList.push(b.readUint8())
}

}
	constructor(){}
}/*武神殿排行榜数据*/
export class stPalacePlayer{
	/*服务器名字*/
	public severName:string;

	/*玩家头像*/
	public headUrl:string;

	/*玩家名字*/
	public name:string;

	/*玩家等级*/
	public lv:number;

	/*战斗力*/
	public plus:number;

	/*排名*/
	public rank:number;

	/*玩家角色ID*/
	public accountId:number;

	/*称号id*/
	public titleId:number;

	/*已过关卡数*/
	public palaceLevel:number;

	/*累计回合数*/
	public accRound:number;

public write(b){
let len;
b.writeUTFString(this.severName||"");
b.writeUTFString(this.headUrl||"");
b.writeUTFString(this.name||"");
b.writeUint16(this.lv);
b.writeUint32(this.plus);
b.writeUint16(this.rank);
b.writeUint32(this.accountId);
b.writeUint8(this.titleId);
b.writeUint8(this.palaceLevel);
b.writeUint32(this.accRound);

}
public read(b){
let len;
this.severName=b.readUTFString()
this.headUrl=b.readUTFString()
this.name=b.readUTFString()
this.lv=b.readUint16()
this.plus=b.readUint32()
this.rank=b.readUint16()
this.accountId=b.readUint32()
this.titleId=b.readUint8()
this.palaceLevel=b.readUint8()
this.accRound=b.readUint32()

}
	constructor(){}
}/*武神殿排行榜 协议id:3469*/
export class PalaceRankList_req{
public protoid:number = 3469
public write(b){
let len;

}
	constructor(){}
}/*武神殿排行榜 协议id:3470*/
export class PalaceRankList_revc{
public protoid:number = 3470
	/*武神殿排行榜*/
	public dataList:stPalacePlayer[];

	/*玩家的排行榜数据*/
	public data:stPalacePlayer=new stPalacePlayer();

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stPalacePlayer()
item.read(b);
this.dataList.push(item);

}
this.data.read(b);

}
	constructor(){}
}/*领取武神殿排行奖励（返回3472） 协议id:3471*/
export class PalaceReward_req{
public protoid:number = 3471
public write(b){
let len;

}
	constructor(){}
}/*领取武神殿排行奖励 协议id:3472*/
export class PalaceReward_revc{
public protoid:number = 3472
	/*周排名奖励排名*/
	public lastRanking:number;

	/*周排名奖励领取状态 0无奖励 1未领取 2已领取*/
	public rankRewardState:number;

public read(b){
let len;
this.lastRanking=b.readUint16()
this.rankRewardState=b.readUint8()

}
	constructor(){}
}/*更新玩家的武神殿排行数据（玩家挑战成功时，和3014一起返回） 协议id:3473*/
export class PalaceUpdateRanking_revc{
public protoid:number = 3473
	/*玩家当前挑战关卡id*/
	public id:number;

	/*当前关卡的敌人信息列表*/
	public enemyList:stPalaceEnemy[];

	/*敌人总战力*/
	public power:number;

	/*属性id（阵容特性）*/
	public attrList:number[];

	/*玩家当前的排名*/
	public ranking:number;

	/*0不是首通 1是首通*/
	public state:number;

	/*0未通关 1已通关*/
	public clear:number;

public read(b){
let len;
this.id=b.readUint8()
this.enemyList=this.enemyList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stPalaceEnemy()
item.read(b);
this.enemyList.push(item);

}
this.power=b.readUint32()
this.attrList=this.attrList||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.attrList.push(b.readUint16())
}
this.ranking=b.readUint16()
this.state=b.readUint8()
this.clear=b.readUint8()

}
	constructor(){}
}/*武神殿商店已购买项*/
export class stPalaceShopItem{
	/*物品id（t_Palace_Shop.xlsx表的f_id）*/
	public fid:number;

	/*已购买的次数*/
	public buyNum:number;

public write(b){
let len;
b.writeUint8(this.fid);
b.writeUint8(this.buyNum);

}
public read(b){
let len;
this.fid=b.readUint8()
this.buyNum=b.readUint8()

}
	constructor(){}
}/*武神殿商店（3010前发） 协议id:3474*/
export class PalaceShop_revc{
public protoid:number = 3474
	/*武神殿商店已购买过的商品列表*/
	public itemList:stPalaceShopItem[];

	/*商店刷新时间戳*/
	public shopRefreshUnix:number;

	/*本周获取得神魂碎片数量*/
	public itemNum:number;

public read(b){
let len;
this.itemList=this.itemList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stPalaceShopItem()
item.read(b);
this.itemList.push(item);

}
this.shopRefreshUnix=b.readUint32()
this.itemNum=b.readUint16()

}
	constructor(){}
}/*武神殿商店购买成功后返回 协议id:3475*/
export class PalaceShopUpdate_revc{
public protoid:number = 3475
	/*武神殿商店已购买过的商品信息（变化量）*/
	public item:stPalaceShopItem=new stPalaceShopItem();

public read(b){
let len;
this.item.read(b);

}
	constructor(){}
}/*武神殿结果buff栏位（返回3464或3468） 协议id:3476*/
export class PalaceUnlockBuff_req{
public protoid:number = 3476
	/*0神魂 1核心神魂*/
	public type:number;

public write(b){
let len;
b.writeUint8(this.type);

}
	constructor(){}
}/*武神殿商店更新（返回3474） 协议id:3477*/
export class PalaceUpdateShop_req{
public protoid:number = 3477
public write(b){
let len;

}
	constructor(){}
}/*获取武神殿时间戳（打开武神殿时请求，返回3479） 协议id:3478*/
export class PalaceRefresh_req{
public protoid:number = 3478
public write(b){
let len;

}
	constructor(){}
}/*获取武神殿时间戳 协议id:3479*/
export class PalaceRefresh_revc{
public protoid:number = 3479
	/*关卡刷新时间戳*/
	public refreshUnix:number;

	/*奖励发放时间戳*/
	public rewardUnix:number;

public read(b){
let len;
this.refreshUnix=b.readUint32()
this.rewardUnix=b.readUint32()

}
	constructor(){}
}/*武神殿商店购买 协议id:3480*/
export class PalaceShop_req{
public protoid:number = 3480
	/*购买的物品id（t_Palace_Shop.xlsx表的f_id）*/
	public fid:number;

public write(b){
let len;
b.writeUint8(this.fid);

}
	constructor(){}
}/*成长礼包解锁信息 协议id:3481*/
export class GrowPackUnlock_revc{
public protoid:number = 3481
	/*解锁的礼包ID数组(非礼包流水号)*/
	public dataList:number[];

public read(b){
let len;
this.dataList=this.dataList||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.dataList.push(b.readUint8())
}

}
	constructor(){}
}/*打开星星争夺战商店,返回3436 协议id:3482*/
export class StarShopOpen_req{
public protoid:number = 3482
public write(b){
let len;

}
	constructor(){}
}/*每日转盘活动设置大奖 协议id:3483*/
export class DailyWheelBigPrize_req{
public protoid:number = 3483
	/*每日大奖选择的道具id*/
	public itemId:number;

public write(b){
let len;
b.writeUint16(this.itemId);

}
	constructor(){}
}/*每日转盘活动设置大奖 协议id:3484*/
export class DailyWheelBigPrize_revc{
public protoid:number = 3484
	/*每日大奖选择的道具id*/
	public itemId:number;

public read(b){
let len;
this.itemId=b.readUint16()

}
	constructor(){}
}/*每日转盘转动 协议id:3485*/
export class DailyWheelTurn_req{
public protoid:number = 3485
	/*是否是广告免费转动转盘 0否 1是*/
	public ad:number;

public write(b){
let len;
b.writeUint8(this.ad);

}
	constructor(){}
}/*每日转盘转动(奖励领取情况走礼包协议) 协议id:3486*/
export class DailyWheelTurn_revc{
public protoid:number = 3486
	/*转盘所在的位置*/
	public pos:number;

public read(b){
let len;
this.pos=b.readUint8()

}
	constructor(){}
}/*免广告月卡是否可以领取 协议id:3487*/
export class AdFreeCard_revc{
public protoid:number = 3487
	/*0不可领 1可领 2已领*/
	public val:number;

	/*剩余多少天*/
	public subday:number;

public read(b){
let len;
this.val=b.readUint8()
this.subday=b.readUint16()

}
	constructor(){}
}/*免广告月卡领取 协议id:3488*/
export class AdFreeCardGet_req{
public protoid:number = 3488
public write(b){
let len;

}
	constructor(){}
}export class stCommonRank{
	/*玩家角色id*/
	public accountId:number;

	/*玩家昵称不带区服*/
	public nickName:string;

	/*区服名称*/
	public serverName:string;

	/*头像*/
	public headUrl:string;

	/*名次*/
	public ranking:number;

	/*对应在各个功能中的数据*/
	public commonNum:number;

	/*称号id*/
	public titleId:number;

	/*玩家等级*/
	public playerLevel:number;

	/*战斗力*/
	public plus:number;

public write(b){
let len;
b.writeUint32(this.accountId);
b.writeUTFString(this.nickName||"");
b.writeUTFString(this.serverName||"");
b.writeUTFString(this.headUrl||"");
b.writeUint32(this.ranking);
b.writeUint32(this.commonNum);
b.writeUint16(this.titleId);
b.writeUint16(this.playerLevel);
b.writeUint32(this.plus);

}
public read(b){
let len;
this.accountId=b.readUint32()
this.nickName=b.readUTFString()
this.serverName=b.readUTFString()
this.headUrl=b.readUTFString()
this.ranking=b.readUint32()
this.commonNum=b.readUint32()
this.titleId=b.readUint16()
this.playerLevel=b.readUint16()
this.plus=b.readUint32()

}
	constructor(){}
}/*冒险开服冲榜请求 协议id:3489*/
export class OpenServerAdventureRank_req{
public protoid:number = 3489
public write(b){
let len;

}
	constructor(){}
}/*冒险开服冲榜响应(结束时间根据礼包流水号id=37的时间) 协议id:3490*/
export class OpenServerAdventureRank_revc{
public protoid:number = 3490
	/*开服冲榜前50名的信息*/
	public dataList:stCommonRank[];

	/*当前玩家自己在开服冲榜的排名 长度=0则没有,最大长度为1*/
	public self:stCommonRank[];

	/*前3名形象*/
	public top3:stPeakJjcAvatar[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stCommonRank()
item.read(b);
this.dataList.push(item);

}
this.self=this.self||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stCommonRank()
item.read(b);
this.self.push(item);

}
this.top3=this.top3||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stPeakJjcAvatar()
item.read(b);
this.top3.push(item);

}

}
	constructor(){}
}/*获取玩家信息,与竞技场用同一个3071 协议id:3491*/
export class CommonWatchPlayerInfo_req{
public protoid:number = 3491
	/*玩家的角色ID*/
	public accountId:number;

	/*1 新服冲榜*/
	public type:number;

public write(b){
let len;
b.writeUint32(this.accountId);
b.writeUint8(this.type);

}
	constructor(){}
}/*积天好礼活动开启后玩家的累计支付金额 协议id:3492*/
export class OpenServerAccPaid_revc{
public protoid:number = 3492
	/*总支付金额（分）*/
	public accPaid:number;

	/*今日支付金额（分）*/
	public accDailyPaid:number;

public read(b){
let len;
this.accPaid=b.readUint32()
this.accDailyPaid=b.readUint32()

}
	constructor(){}
}/*借东风开服属性 协议id:3493*/
export class NewPlayerAttr_req{
public protoid:number = 3493
	/*借东风的类型,对应t_Newplayer_Attribute.xlsx的f_attrtype*/
	public type:number;

	/*借东风的id,对应t_Newplayer_Attribute.xlsx的f_id*/
	public id:number;

public write(b){
let len;
b.writeUint8(this.type);
b.writeUint8(this.id);

}
	constructor(){}
}export class stNewPlayerAttr{
	/*借东风的id,对应t_Newplayer_Attribute.xlsx的f_id*/
	public id:number;

	/*借东风的类型,对应t_Newplayer_Attribute.xlsx的f_attrtype*/
	public type:number;

	/*当前属性的结束时间戳*/
	public endUnix:number;

public write(b){
let len;
b.writeUint8(this.id);
b.writeUint8(this.type);
b.writeUint32(this.endUnix);

}
public read(b){
let len;
this.id=b.readUint8()
this.type=b.readUint8()
this.endUnix=b.readUint32()

}
	constructor(){}
}/*借东风开服属性 协议id:3494*/
export class NewPlayerAttr_revc{
public protoid:number = 3494
	/*借东风开服属性列表*/
	public dataList:stNewPlayerAttr[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stNewPlayerAttr()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}export class stTrammelsChief{
	/*副将羁绊fid（t_Trammels_Chief表的f_id，空位时传0）*/
	public id:number;

	/*0未解锁 1已解锁*/
	public state:number;

	/*位置0-2*/
	public pos:number;

public write(b){
let len;
b.writeUint8(this.id);
b.writeUint8(this.state);
b.writeUint8(this.pos);

}
public read(b){
let len;
this.id=b.readUint8()
this.state=b.readUint8()
this.pos=b.readUint8()

}
	constructor(){}
}/*玩家已解锁的副将羁绊列表（初始化推） 协议id:3495*/
export class TrammelsChiefInit_revc{
public protoid:number = 3495
	/*玩家已装备的副将羁绊*/
	public dataList:stTrammelsChief[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stTrammelsChief()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*玩家装备副将羁绊（返回3497） 协议id:3496*/
export class TrammelsChief_req{
public protoid:number = 3496
	/*副将羁绊fid（t_Trammels_Chief表的f_id，卸下时传0）*/
	public id:number;

	/*位置0-2*/
	public pos:number;

public write(b){
let len;
b.writeUint8(this.id);
b.writeUint8(this.pos);

}
	constructor(){}
}/*玩家装备副将羁绊 协议id:3497*/
export class TrammelsChief_revc{
public protoid:number = 3497
	/*玩家要装备上的副将羁绊信息*/
	public data:stTrammelsChief=new stTrammelsChief();

public read(b){
let len;
this.data.read(b);

}
	constructor(){}
}/*玩家解锁副将羁绊格子（返回3497） 协议id:3498*/
export class TrammelsChiefUnlock_req{
public protoid:number = 3498
public write(b){
let len;

}
	constructor(){}
}export class stPet{
	/*宠物序列号(唯一)*/
	public petSerialNum:number;

	/*宠物ID,对应t_Pet_List.xlsx的f_id*/
	public petId:number;

	/*宠物等级*/
	public petLevel:number;

	/*宠物星级,宠物技能等级=星级+1*/
	public petStar:number;

	/*同源升星后剩余的升星数量*/
	public petStarSurplus:number;

	/*宠物血脉觉醒*/
	public petTalents:stPetTalent[];

	/*血脉觉醒中未替换或未放弃的天赋id*/
	public petTalentIdToDo:number;

	/*是否上阵 0否 1是*/
	public onBattle:number;

public write(b){
let len;
b.writeUint32(this.petSerialNum);
b.writeUint8(this.petId);
b.writeUint16(this.petLevel);
b.writeUint8(this.petStar);
b.writeUint16(this.petStarSurplus);

this.petTalents=this.petTalents||[];
len = this.petTalents.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.petTalents[i].write(b);
}
b.writeUint8(this.petTalentIdToDo);
b.writeUint8(this.onBattle);

}
public read(b){
let len;
this.petSerialNum=b.readUint32()
this.petId=b.readUint8()
this.petLevel=b.readUint16()
this.petStar=b.readUint8()
this.petStarSurplus=b.readUint16()
this.petTalents=this.petTalents||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stPetTalent()
item.read(b);
this.petTalents.push(item);

}
this.petTalentIdToDo=b.readUint8()
this.onBattle=b.readUint8()

}
	constructor(){}
}export class stPetSkill{
	/*宠物技能ID,对应t_Pet_List的f_skillid*/
	public skillId:number;

	/*宠物技能等级,默认0级*/
	public skillLevel:number;

public write(b){
let len;
b.writeUint8(this.skillId);
b.writeUint8(this.skillLevel);

}
public read(b){
let len;
this.skillId=b.readUint8()
this.skillLevel=b.readUint8()

}
	constructor(){}
}export class stPetTalent{
	/*血脉觉醒ID,对应t_Pet_Talent_List.xlsx的f_id*/
	public talentId:number;

	/*血脉觉醒等级*/
	public talentLevel:number;

	/*血脉觉醒的锁定状态 0未锁定 1锁定*/
	public lock:number;

public write(b){
let len;
b.writeUint8(this.talentId);
b.writeUint8(this.talentLevel);
b.writeUint8(this.lock);

}
public read(b){
let len;
this.talentId=b.readUint8()
this.talentLevel=b.readUint8()
this.lock=b.readUint8()

}
	constructor(){}
}/*宠物初始化协议 协议id:3499*/
export class PetInit_revc{
public protoid:number = 3499
	/*下次可免费招募副将的时间戳*/
	public nextFreeUnix:number;

	/*剩余免费招募次数*/
	public freeCount:number;

	/*抽取保底剩余*/
	public baoDi:number;

	/*抽取列表*/
	public dataList:stPet[];

public read(b){
let len;
this.nextFreeUnix=b.readUint32()
this.freeCount=b.readUint8()
this.baoDi=b.readUint8()
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stPet()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*购买唤灵笛 协议id:3500*/
export class PetBuyFlute_req{
public protoid:number = 3500
	/*购买唤灵笛的个数*/
	public num:number;

public write(b){
let len;
b.writeUint32(this.num);

}
	constructor(){}
}/*购买唤灵笛成功返回 协议id:3501*/
export class PetBuyFlute_revc{
public protoid:number = 3501
public read(b){
let len;

}
	constructor(){}
}/*抽取宠物,返回3515+3503 协议id:3502*/
export class PetExtract_req{
public protoid:number = 3502
	/*抽取宠物道具ID,0标识免费抽*/
	public itemId:number;

	/*抽取类型 1单抽 2三连抽 3十连抽*/
	public type:number;

public write(b){
let len;
b.writeUint16(this.itemId);
b.writeUint8(this.type);

}
	constructor(){}
}/*宠物变化 协议id:3503*/
export class PetChange_revc{
public protoid:number = 3503
	/*宠物变化列表(非全量)*/
	public dataList:stPet[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stPet()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*免费抽取宠物信息变化 协议id:3504*/
export class PetFreeChange_revc{
public protoid:number = 3504
	/*下次可免费招募副将的时间戳*/
	public nextFreeUnix:number;

	/*剩余免费招募次数*/
	public freeCount:number;

public read(b){
let len;
this.nextFreeUnix=b.readUint32()
this.freeCount=b.readUint8()

}
	constructor(){}
}/*宠物保底变化 协议id:3505*/
export class PetBaoDiChange_revc{
public protoid:number = 3505
	/*抽取保底剩余*/
	public baoDi:number;

public read(b){
let len;
this.baoDi=b.readUint8()

}
	constructor(){}
}/*宠物上阵,成功后返回3503 协议id:3506*/
export class PetOnBattle_req{
public protoid:number = 3506
	/*宠物序列号*/
	public petSerialNum:number;

public write(b){
let len;
b.writeUint32(this.petSerialNum);

}
	constructor(){}
}/*宠物重置,返回3503 协议id:3507*/
export class PetRebirth_req{
public protoid:number = 3507
	/*宠物序列号*/
	public petSerialNum:number;

public write(b){
let len;
b.writeUint32(this.petSerialNum);

}
	constructor(){}
}/*宠物升级,返回3503 协议id:3508*/
export class PetUpgradeLevel_req{
public protoid:number = 3508
	/*宠物序列号*/
	public petSerialNum:number;

	/*宠物一次性升多少级*/
	public cnt:number;

public write(b){
let len;
b.writeUint32(this.petSerialNum);
b.writeUint16(this.cnt);

}
	constructor(){}
}/*宠物升星,返回3510+3503 协议id:3509*/
export class PetUpgradeStar_req{
public protoid:number = 3509
	/*待升星的宠物序列号*/
	public petSerialNum:number;

	/*其他相同品质的宠物序列号*/
	public sameQuaPetSerialNums:number[];

	/*0 使用相同品质宠物升星 1使用相同品质道具升星*/
	public type:number;

public write(b){
let len;
b.writeUint32(this.petSerialNum);

this.sameQuaPetSerialNums=this.sameQuaPetSerialNums||[];
len = this.sameQuaPetSerialNums.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
b.writeUint32(this.sameQuaPetSerialNums[i]);
}
b.writeUint8(this.type);

}
	constructor(){}
}/*删除宠物 协议id:3510*/
export class PetRemove_revc{
public protoid:number = 3510
	/*被删除的宠物序列号*/
	public petSerialNums:number[];

public read(b){
let len;
this.petSerialNums=this.petSerialNums||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.petSerialNums.push(b.readUint32())
}

}
	constructor(){}
}/*获取新的血脉觉醒,返回3503+3519 协议id:3511*/
export class PetNewTalent_req{
public protoid:number = 3511
	/*宠物序列号*/
	public petSerialNum:number;

	/*锁定的血脉觉醒IDS*/
	public lockTalentIds:number[];

public write(b){
let len;
b.writeUint32(this.petSerialNum);

this.lockTalentIds=this.lockTalentIds||[];
len = this.lockTalentIds.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
b.writeUint8(this.lockTalentIds[i]);
}

}
	constructor(){}
}/*处理血脉觉醒,返回3503+3513 协议id:3512*/
export class PetHandleNewTalent_req{
public protoid:number = 3512
	/*宠物序列号*/
	public petSerialNum:number;

	/*0装备 1替换 2放弃*/
	public type:number;

public write(b){
let len;
b.writeUint32(this.petSerialNum);
b.writeUint8(this.type);

}
	constructor(){}
}/*处理血脉觉醒 协议id:3513*/
export class PetHandleNewTalent_revc{
public protoid:number = 3513
	/*0装备 1替换 时候返回petTalents所在的索引位置, 2放弃时候不需要操作*/
	public idx:number;

	/*0装备 1替换 2放弃*/
	public type:number;

public read(b){
let len;
this.idx=b.readUint8()
this.type=b.readUint8()

}
	constructor(){}
}/*血脉提升,返回3503+3518 协议id:3514*/
export class PetUpgradeTalent_req{
public protoid:number = 3514
	/*宠物序列号*/
	public petSerialNum:number;

public write(b){
let len;
b.writeUint32(this.petSerialNum);

}
	constructor(){}
}/*抽取宠物成功 协议id:3515*/
export class PetExtractSuccess_revc{
public protoid:number = 3515
	/*抽到的宠物IDS*/
	public petIds:number[];

	/*抽取类型 1单抽 2三连抽 3十连抽*/
	public type:number;

public read(b){
let len;
this.petIds=this.petIds||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.petIds.push(b.readUint8())
}
this.type=b.readUint8()

}
	constructor(){}
}/*宠物融合结果 协议id:3516*/
export class PetFusion_revc{
public protoid:number = 3516
	/*0失败 1成功*/
	public result:number;

	/*成功: 宠物序列号(唯一) 失败:0*/
	public petSerialNums:number[];

	/*奖励数据列表*/
	public rewardList:stCellValue[];

public read(b){
let len;
this.result=b.readUint8()
this.petSerialNums=this.petSerialNums||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.petSerialNums.push(b.readUint32())
}
this.rewardList=this.rewardList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stCellValue()
item.read(b);
this.rewardList.push(item);

}

}
	constructor(){}
}/*宠物融合结果 协议id:3517*/
export class PetFusion_req{
public protoid:number = 3517
	/*0手动 1自动*/
	public isAuto:number;

	/*宠物融合的序列号petSerialNum*/
	public datalist:number[];

	/*一键融合的稀有度，会融合稀有度<=fusionQuality的宠物*/
	public fusionQuality:number;

public write(b){
let len;
b.writeUint8(this.isAuto);

this.datalist=this.datalist||[];
len = this.datalist.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
b.writeUint32(this.datalist[i]);
}
b.writeUint8(this.fusionQuality);

}
	constructor(){}
}/*血脉提升,返回3503 协议id:3518*/
export class PetUpgradeTalent_revc{
public protoid:number = 3518
	/*返回提升petTalents所在的索引位置*/
	public idx:number;

public read(b){
let len;
this.idx=b.readUint8()

}
	constructor(){}
}/*获取新的血脉觉醒,返回3503 协议id:3519*/
export class PetNewTalent_revc{
public protoid:number = 3519
public read(b){
let len;

}
	constructor(){}
}/*新人盛宴的活动列表 协议id:3520*/
export class NewPlayerFeast_revc{
public protoid:number = 3520
	/*新人盛宴的礼包序列号*/
	public serialNums:number[];

	/*新人盛宴展示的开始时间*/
	public feastBeginUnix:number;

	/*新人盛宴展示的结束时间*/
	public feastEndUnix:number;

public read(b){
let len;
this.serialNums=this.serialNums||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.serialNums.push(b.readUint16())
}
this.feastBeginUnix=b.readUint32()
this.feastEndUnix=b.readUint32()

}
	constructor(){}
}/*新人盛宴活动自己抽取或获得记录的增量(初始化推全量,后续都推增量) 协议id:3521*/
export class NewPlayerFeastSelfRecords_revc{
public protoid:number = 3521
	/*1坐骑盛宴 2宝石盛宴...*/
	public type:number;

	/*角色自己抽奖记录增量*/
	public dataList:stActivityRecord[];

public read(b){
let len;
this.type=b.readUint8()
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stActivityRecord()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}export class stNewFeast{
	/*新人盛宴对应积分领取的奖励的id*/
	public id:number;

	/*0不可领取 1已领取 2可领取*/
	public status:number;

public write(b){
let len;
b.writeUint8(this.id);
b.writeUint8(this.status);

}
public read(b){
let len;
this.id=b.readUint8()
this.status=b.readUint8()

}
	constructor(){}
}/*新人盛宴积分奖励领取情况(初始化推全量,后续推变量) 协议id:3522*/
export class NewPlayerFeastRewards_revc{
public protoid:number = 3522
	/*1坐骑盛宴 2宝石盛宴...*/
	public type:number;

	/*新人盛宴积分奖励领取情况*/
	public dataList:stNewFeast[];

public read(b){
let len;
this.type=b.readUint8()
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stNewFeast()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*新人盛宴中积分(坐骑即抽取次数...) 协议id:3523*/
export class NewPlayerFeastScore_revc{
public protoid:number = 3523
	/*1坐骑盛宴 2宝石盛宴...*/
	public type:number;

	/*新人盛宴中积分*/
	public score:number;

public read(b){
let len;
this.type=b.readUint8()
this.score=b.readUint32()

}
	constructor(){}
}/*新人盛宴中积分奖励领取,返回3522 协议id:3524*/
export class NewPlayerFeastScoreDraw_req{
public protoid:number = 3524
	/*1坐骑盛宴 2宝石盛宴...*/
	public type:number;

	/*新人盛宴对应积分领取的奖励的id*/
	public id:number;

public write(b){
let len;
b.writeUint8(this.type);
b.writeUint8(this.id);

}
	constructor(){}
}/*是否是新服(登录时候第一个发) 协议id:3525*/
export class NewServer_revc{
public protoid:number = 3525
	/*0旧服逻辑  1新的v1版本*/
	public isNew:number;

public read(b){
let len;
this.isNew=b.readUint8()

}
	constructor(){}
}/*竞技场积分更新 协议id:3526*/
export class JjcScoreUpdate_revc{
public protoid:number = 3526
	/*竞技场的个人积分*/
	public val:number;

public read(b){
let len;
this.val=b.readUint32()

}
	constructor(){}
}export class stPetFusionBaoDi{
	/*宠物稀有度*/
	public quality:number;

	/*保底次数*/
	public baoDi:number;

public write(b){
let len;
b.writeUint8(this.quality);
b.writeUint8(this.baoDi);

}
public read(b){
let len;
this.quality=b.readUint8()
this.baoDi=b.readUint8()

}
	constructor(){}
}/*宠物融合保底（初始化时返回，发生变化时返回全部） 协议id:3527*/
export class PetFusionBaoDi_revc{
public protoid:number = 3527
	/*宠物融合保底列表*/
	public dataList:stPetFusionBaoDi[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stPetFusionBaoDi()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*跑商新的掠夺信息定时恢复,返回3529 协议id:3528*/
export class StationPillagesNew_req{
public protoid:number = 3528
public write(b){
let len;

}
	constructor(){}
}/*跑商新的掠夺信息 协议id:3529*/
export class StationPillagesNew_revc{
public protoid:number = 3529
	/*当前剩余可掠夺的数量*/
	public pillagesNew:number;

	/*下次刷新的时间戳,0表示已满*/
	public nextRecoverUnix:number;

public read(b){
let len;
this.pillagesNew=b.readUint8()
this.nextRecoverUnix=b.readUint32()

}
	constructor(){}
}export class stFuncGuide{
	/*对应t_Func_Guide.xlsx的f_id*/
	public id:number;

	/*距离id任务还有多少个*/
	public intervalTask:number;

	/*0不可领取 1已领取 2可领取*/
	public state:number;

public write(b){
let len;
b.writeUint8(this.id);
b.writeUint16(this.intervalTask);
b.writeUint8(this.state);

}
public read(b){
let len;
this.id=b.readUint8()
this.intervalTask=b.readUint16()
this.state=b.readUint8()

}
	constructor(){}
}/*领取开启任务的奖励 协议id:3530*/
export class GetFuncGuide_req{
public protoid:number = 3530
	/*对应t_Func_Guide.xlsx的f_id*/
	public id:number;

public write(b){
let len;
b.writeUint8(this.id);

}
	constructor(){}
}/*领取开启任务的奖励,初始化、任务变化发全量,领取发变量 协议id:3531*/
export class GetFuncGuide_revc{
public protoid:number = 3531
	/*列表*/
	public dataList:stFuncGuide[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stFuncGuide()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*普通委托开宝箱功能是否开启 协议id:3532*/
export class BoxCommitState_revc{
public protoid:number = 3532
	/*0未开启 1已开启*/
	public state:number;

public read(b){
let len;
this.state=b.readUint8()

}
	constructor(){}
}/*宠物萃取,返回宠物删除3510 协议id:3533*/
export class PetDecompose_req{
public protoid:number = 3533
	/*宠物序列号*/
	public petSerialNum:number;

public write(b){
let len;
b.writeUint32(this.petSerialNum);

}
	constructor(){}
}/*玩家所有累充金额(上线的时候发一次，变化的时候发一次) 协议id:3534*/
export class PlayerTotalCnt_revc{
public protoid:number = 3534
	/*玩家所有累计充值单位分(变化后的总值)*/
	public totalCnt:number;

public read(b){
let len;
this.totalCnt=b.readUint32()

}
	constructor(){}
}export class stSevenTask{
	/*7日狂欢的fid,对应t_SevenDays_Task.xlsx的f_id*/
	public id:number;

	/*7日狂欢的fid完成次数*/
	public nums:number;

	/*0不可领取 1已领取 2可领取*/
	public status:number;

public write(b){
let len;
b.writeUint8(this.id);
b.writeUint16(this.nums);
b.writeUint8(this.status);

}
public read(b){
let len;
this.id=b.readUint8()
this.nums=b.readUint16()
this.status=b.readUint8()

}
	constructor(){}
}/*7日狂欢任务完成及领取情况(初始化全量,后续变量) 协议id:3535*/
export class SevenTask_revc{
public protoid:number = 3535
	/*0初始化全量 1变量*/
	public flag:number;

	/*开服第几天*/
	public num:number;

	/*列表*/
	public dataList:stSevenTask[];

public read(b){
let len;
this.flag=b.readUint8()
this.num=b.readUint16()
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stSevenTask()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*7日狂欢领取了哪些积分奖励(全量) 协议id:3536*/
export class SevenScore_revc{
public protoid:number = 3536
	/*领取了的积分奖励列表,对应t_SevenDays_StageRewards.xlsx的id*/
	public dataList:number[];

public read(b){
let len;
this.dataList=this.dataList||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.dataList.push(b.readUint8())
}

}
	constructor(){}
}/*7日狂欢领取task奖励或积分奖励，task奖励返回3535,积分返回3536 协议id:3537*/
export class SevenEvent_req{
public protoid:number = 3537
	/*1task奖励 2积分奖励*/
	public type:number;

	/*task则对应对应t_SevenDays_Task.xlsx的f_id, 积分对应t_SevenDays_StageRewards.xlsx的id*/
	public id:number;

public write(b){
let len;
b.writeUint8(this.type);
b.writeUint8(this.id);

}
	constructor(){}
}/*开宝箱替换装备结束（作为替换装备的最后一条协议） 协议id:3538*/
export class SellEquipFinish_revc{
public protoid:number = 3538
public read(b){
let len;

}
	constructor(){}
}/*领取礼包（每日分享、添加到桌面） 协议id:3539*/
export class ShareReward_req{
public protoid:number = 3539
	/*功能id（t_Func表的f_FunctionID）*/
	public funcId:number;

	/*0获得奖励 1领取奖励*/
	public type:number;

public write(b){
let len;
b.writeUint16(this.funcId);
b.writeUint8(this.type);

}
	constructor(){}
}export class stShareReward{
	/*功能id（t_Func表的f_FunctionID）*/
	public funcId:number;

	/*0奖励未激活 1已领取 2可领取 3功能未开启*/
	public state:number;

public write(b){
let len;
b.writeUint16(this.funcId);
b.writeUint8(this.state);

}
public read(b){
let len;
this.funcId=b.readUint16()
this.state=b.readUint8()

}
	constructor(){}
}/*每日分享、添加到桌面礼包领取情况（初始化3010前推，变化时推） 协议id:3540*/
export class ShareReward_revc{
public protoid:number = 3540
	/*列表*/
	public dataList:stShareReward[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stShareReward()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}export class stBoxExtraItem{
	/*对应t_Box_ExtraItem.xlsx的f_id*/
	public id:number;

	/*当日获得该id的次数*/
	public num:number;

public write(b){
let len;
b.writeUint8(this.id);
b.writeUint16(this.num);

}
public read(b){
let len;
this.id=b.readUint8()
this.num=b.readUint16()

}
	constructor(){}
}/*宝箱开出额外道具信息（初始化3010前推全量） 协议id:3541*/
export class BoxExtraItemInit_revc{
public protoid:number = 3541
	/*列表*/
	public dataList:stBoxExtraItem[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stBoxExtraItem()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*宝箱开出额外道具信息变化 协议id:3542*/
export class BoxExtraItemChange_revc{
public protoid:number = 3542
	/*列表*/
	public dataList:stBoxExtraItem[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stBoxExtraItem()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*领取游戏圈礼包 协议id:3543*/
export class ClubReward_req{
public protoid:number = 3543
	/*t_System_Community.xlsx表f_id*/
	public id:number;

	/*0获得奖励 1领取奖励*/
	public type:number;

public write(b){
let len;
b.writeUint8(this.id);
b.writeUint8(this.type);

}
	constructor(){}
}export class stClubReward{
	/*t_System_Community.xlsx表f_id*/
	public id:number;

	/*任务完成数*/
	public num:number;

	/*0奖励未激活 1已领取 2可领取 3功能未开启*/
	public state:number;

public write(b){
let len;
b.writeUint8(this.id);
b.writeUint8(this.num);
b.writeUint8(this.state);

}
public read(b){
let len;
this.id=b.readUint8()
this.num=b.readUint8()
this.state=b.readUint8()

}
	constructor(){}
}/*领取游戏圈礼包领取情况（初始化3010前推，变化时推） 协议id:3544*/
export class ClubReward_revc{
public protoid:number = 3544
	/*列表*/
	public dataList:stClubReward[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stClubReward()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*免费抽取宝石信息变化 协议id:3545*/
export class GemFreeChange_revc{
public protoid:number = 3545
	/*下次可免费领取宝石的时间戳*/
	public nextFreeUnix:number;

	/*剩余免费领取次数*/
	public freeCount:number;

public read(b){
let len;
this.nextFreeUnix=b.readUint32()
this.freeCount=b.readUint8()

}
	constructor(){}
}export class stDailyShopWeekCard{
	/*对应t_Pack_Daily_Shop_WeekCard.xlsx的f_id*/
	public id:number;

	/*剩余多少天,0标识没购买或已过期*/
	public subday:number;

public write(b){
let len;
b.writeUint8(this.id);
b.writeUint16(this.subday);

}
public read(b){
let len;
this.id=b.readUint8()
this.subday=b.readUint16()

}
	constructor(){}
}/*折扣商店周卡信息 协议id:3546*/
export class DailyShopWeekCard_revc{
public protoid:number = 3546
	/*列表*/
	public dataList:stDailyShopWeekCard[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stDailyShopWeekCard()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}export class stNewPlayerTask{
	/*新人盛宴的fid,t_Alternation_Rookie_Task.xlsx的f_id*/
	public id:number;

	/*新人盛宴的fid完成次数*/
	public nums:number;

	/*0不可领取 1已领取 2可领取*/
	public status:number;

public write(b){
let len;
b.writeUint8(this.id);
b.writeUint16(this.nums);
b.writeUint8(this.status);

}
public read(b){
let len;
this.id=b.readUint8()
this.nums=b.readUint16()
this.status=b.readUint8()

}
	constructor(){}
}/*新人盛宴任务完成及领取情况(初始化全量,后续变量) 协议id:3547*/
export class NewPlayerFeastTask_revc{
public protoid:number = 3547
	/*列表*/
	public dataList:stNewPlayerTask[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stNewPlayerTask()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*领取新人盛宴任务 协议id:3548*/
export class NewPlayerFeastTask_req{
public protoid:number = 3548
	/*t_Alternation_Rookie_Task.xlsx表f_id*/
	public id:number;

public write(b){
let len;
b.writeUint8(this.id);

}
	constructor(){}
}/*五一劳动节免费商城购买后返回次数变化 协议id:3549*/
export class LabourShopFreeChange_revc{
public protoid:number = 3549
	/*t_Labour_Shop_Free.xlsx里面每个商品的购买次数(一般情况下只有一条)*/
	public datalist:stLabourShop[];

	/*类型 0五一劳动节 1六一儿童节 3双节*/
	public type:number;

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stLabourShop()
item.read(b);
this.datalist.push(item);

}
this.type=b.readUint8()

}
	constructor(){}
}/*五一劳动节免费商城兑换 协议id:3550*/
export class LabourShopFree_req{
public protoid:number = 3550
	/*t_Labour_Shop_Free.xlsx的f_id*/
	public id:number;

	/*类型 0五一劳动节 1六一儿童节 3双节*/
	public type:number;

public write(b){
let len;
b.writeUint8(this.id);
b.writeUint8(this.type);

}
	constructor(){}
}export class stChatPlayer{
	/*序列号*/
	public uid:number;

	/*玩家头像*/
	public headUrl:string;

	/*玩家名字*/
	public name:string;

	/*玩家角色ID*/
	public playerId:number;

	/*称号id*/
	public titleId:number;

	/*时间戳*/
	public unix:number;

	/*聊天内容*/
	public chat:string;

	/*表情id（默认0，表示没表情）*/
	public emojiId:number;

	/*类型 1跨服 2同盟 3世界*/
	public type:number;

	/*vip等级t_VIP.xlsx表的f_VIPRank*/
	public vip:number;

public write(b){
let len;
b.writeUint32(this.uid);
b.writeUTFString(this.headUrl||"");
b.writeUTFString(this.name||"");
b.writeUint32(this.playerId);
b.writeUint8(this.titleId);
b.writeUint32(this.unix);
b.writeUTFString(this.chat||"");
b.writeUint8(this.emojiId);
b.writeUint8(this.type);
b.writeUint8(this.vip);

}
public read(b){
let len;
this.uid=b.readUint32()
this.headUrl=b.readUTFString()
this.name=b.readUTFString()
this.playerId=b.readUint32()
this.titleId=b.readUint8()
this.unix=b.readUint32()
this.chat=b.readUTFString()
this.emojiId=b.readUint8()
this.type=b.readUint8()
this.vip=b.readUint8()

}
	constructor(){}
}/*世界聊天列表（3010前推，全部量，最多50条） 协议id:3551*/
export class WorldChatList_revc{
public protoid:number = 3551
	/**/
	public datalist:stChatPlayer[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stChatPlayer()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*世界聊天列表变化量（有新消息时主动推，收到3553时返回） 协议id:3552*/
export class WorldChatListChange_revc{
public protoid:number = 3552
	/**/
	public datalist:stChatPlayer[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stChatPlayer()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*发起世界聊天（返回3552） 协议id:3553*/
export class WorldChat_req{
public protoid:number = 3553
	/*聊天内容*/
	public chat:string;

	/*表情id（默认0，表示没表情）*/
	public emojiId:number;

	/*类型 1跨服 2同盟 3世界*/
	public type:number;

public write(b){
let len;
b.writeUTFString(this.chat||"");
b.writeUint8(this.emojiId);
b.writeUint8(this.type);

}
	constructor(){}
}export class stAlliance{
	/*同盟id*/
	public uid:number;

	/*同盟名称*/
	public name:string;

	/*同盟公告*/
	public notice:string;

	/*入盟等级*/
	public playerLevel:number;

	/*当前成员数*/
	public num:number;

	/*0需要申请加入 1自动加入*/
	public auto:number;

	/*是否在随机同盟列表中显示（0不在随机列表中显示，1在随机列表中显示）*/
	public show:number;

	/*排名*/
	public rank:number;

public write(b){
let len;
b.writeUint32(this.uid);
b.writeUTFString(this.name||"");
b.writeUTFString(this.notice||"");
b.writeUint16(this.playerLevel);
b.writeUint8(this.num);
b.writeUint8(this.auto);
b.writeUint8(this.show);
b.writeUint8(this.rank);

}
public read(b){
let len;
this.uid=b.readUint32()
this.name=b.readUTFString()
this.notice=b.readUTFString()
this.playerLevel=b.readUint16()
this.num=b.readUint8()
this.auto=b.readUint8()
this.show=b.readUint8()
this.rank=b.readUint8()

}
	constructor(){}
}export class stAlliancePlayer{
	/*序列号*/
	public uid:number;

	/*玩家头像*/
	public headUrl:string;

	/*玩家名字*/
	public name:string;

	/*玩家角色等级*/
	public playerLevel:number;

	/*玩家角色ID*/
	public playerId:number;

	/*称号id*/
	public titleId:number;

	/*职位，0普通成员 1副会长 2会长*/
	public position:number;

	/*是否活跃（0非活跃 1活跃）*/
	public isActive:number;

	/*战斗力*/
	public plus:number;

public write(b){
let len;
b.writeUint32(this.uid);
b.writeUTFString(this.headUrl||"");
b.writeUTFString(this.name||"");
b.writeUint16(this.playerLevel);
b.writeUint32(this.playerId);
b.writeUint8(this.titleId);
b.writeUint8(this.position);
b.writeUint8(this.isActive);
b.writeUint32(this.plus);

}
public read(b){
let len;
this.uid=b.readUint32()
this.headUrl=b.readUTFString()
this.name=b.readUTFString()
this.playerLevel=b.readUint16()
this.playerId=b.readUint32()
this.titleId=b.readUint8()
this.position=b.readUint8()
this.isActive=b.readUint8()
this.plus=b.readUint32()

}
	constructor(){}
}/*获取、刷新同盟列表（返回3555） 协议id:3554*/
export class AllianceList_req{
public protoid:number = 3554
public write(b){
let len;

}
	constructor(){}
}/*同盟列表（3010前推，没有加入的同盟时推） 协议id:3555*/
export class AllianceList_revc{
public protoid:number = 3555
	/*同盟列表*/
	public datalist:stAlliance[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stAlliance()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*玩家所属的同盟信息（3010前推，有加入的同盟时推） 协议id:3556*/
export class AllianceInfo_revc{
public protoid:number = 3556
	/*同盟信息*/
	public info:stAlliance=new stAlliance();

public read(b){
let len;
this.info.read(b);

}
	constructor(){}
}/*同盟的所有成员列表（3010前推，有加入的同盟时推） 协议id:3557*/
export class AlliancePlayerList_revc{
public protoid:number = 3557
	/*同盟的成员列表*/
	public playerList:stAlliancePlayer[];

public read(b){
let len;
this.playerList=this.playerList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stAlliancePlayer()
item.read(b);
this.playerList.push(item);

}

}
	constructor(){}
}/*加入/退出/解散同盟（加入返回3556、3557，退出、解散返回3555） 协议id:3558*/
export class AllianceJoin_req{
public protoid:number = 3558
	/*操作类型，0退出 1加入 2解散*/
	public type:number;

	/*同盟id*/
	public uid:number;

public write(b){
let len;
b.writeUint8(this.type);
b.writeUint32(this.uid);

}
	constructor(){}
}/*同盟成员管理（返回3557） 协议id:3559*/
export class AlliancePlayerManage_req{
public protoid:number = 3559
	/*被管理的玩家id*/
	public playerId:number;

	/*管理类型，1任命副会长 2转让会长 3踢出 4同意加入 5弹劾 6降级为普通成员*/
	public type:number;

public write(b){
let len;
b.writeUint32(this.playerId);
b.writeUint8(this.type);

}
	constructor(){}
}/*修改同盟参数（返回3556） 协议id:3560*/
export class AllianceSet_req{
public protoid:number = 3560
	/*等级限制*/
	public level:number;

	/*同盟设置 0手动 1自动*/
	public join:number;

	/*搜索限制 0隐藏 1公开*/
	public search:number;

public write(b){
let len;
b.writeUint16(this.level);
b.writeUint8(this.join);
b.writeUint8(this.search);

}
	constructor(){}
}/*创建同盟（返回3556） 协议id:3561*/
export class AllianceCreate_req{
public protoid:number = 3561
	/*同盟名称*/
	public name:string;

public write(b){
let len;
b.writeUTFString(this.name||"");

}
	constructor(){}
}/*同盟申请加入列表 协议id:3562*/
export class AllianceApplyList_revc{
public protoid:number = 3562
	/*申请入盟的玩家列表*/
	public datalist:stAlliancePlayer[];

public read(b){
let len;
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stAlliancePlayer()
item.read(b);
this.datalist.push(item);

}

}
	constructor(){}
}/*打开副将首页请求,主要用于检查是否已经重置了玩家数据 协议id:3563*/
export class CheifOnOpen_req{
public protoid:number = 3563
public write(b){
let len;

}
	constructor(){}
}/*辅助副将上下 协议id:3564*/
export class ChiefAssist_req{
public protoid:number = 3564
	/*副将id 对应t_Chief_List.xlsx的f_cheifid*/
	public cheifId:number;

	/*下来传0 其他t_Chief_Support_Inherit.xlsx中的f_id*/
	public assistId:number;

public write(b){
let len;
b.writeUint16(this.cheifId);
b.writeUint8(this.assistId);

}
	constructor(){}
}/*购买副将战旗 协议id:3565*/
export class ChiefBuyFlag_req{
public protoid:number = 3565
	/*战旗id 对应t_Chief_Flag_List.xlsx的f_id*/
	public id:number;

public write(b){
let len;
b.writeUint8(this.id);

}
	constructor(){}
}/*购买副将战旗 协议id:3566*/
export class ChiefBuyFlag_revc{
public protoid:number = 3566
	/*战旗数量不多,这里是全量 对应t_Chief_Flag_List.xlsx的f_id*/
	public dataList:number[];

public read(b){
let len;
this.dataList=this.dataList||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.dataList.push(b.readUint8())
}

}
	constructor(){}
}/*更换副将战旗 协议id:3567*/
export class ChiefChangeFlag_req{
public protoid:number = 3567
	/*战旗id 对应t_Chief_Flag_List.xlsx的f_id*/
	public id:number;

public write(b){
let len;
b.writeUint8(this.id);

}
	constructor(){}
}/*更换副将战旗 协议id:3568*/
export class ChiefChangeFlag_revc{
public protoid:number = 3568
	/*当前选择的战旗id 对应t_Chief_Flag_List.xlsx的f_id*/
	public id:number;

	/*战旗的战力*/
	public flagFight:number;

public read(b){
let len;
this.id=b.readUint8()
this.flagFight=b.readUint32()

}
	constructor(){}
}/*升级副将战旗(战旗的等级是共享的) 协议id:3569*/
export class ChiefUpgradeFlag_req{
public protoid:number = 3569
	/*一次升多少级*/
	public cnt:number;

public write(b){
let len;
b.writeUint16(this.cnt);

}
	constructor(){}
}/*升级副将战旗(战旗的等级是共享的) 协议id:3570*/
export class ChiefUpgradeFlag_revc{
public protoid:number = 3570
	/*当前战旗所在的序列号ID 对应t_Chief_Flag_List.xlsx.xlsx的f_id*/
	public flagSerial:number;

	/*战旗的战力*/
	public flagFight:number;

public read(b){
let len;
this.flagSerial=b.readUint16()
this.flagFight=b.readUint32()

}
	constructor(){}
}/*同盟搜索（返回3572） 协议id:3571*/
export class AllianceSearch_req{
public protoid:number = 3571
	/*搜索内容（同盟名称全程或同盟id）*/
	public value:string;

public write(b){
let len;
b.writeUTFString(this.value||"");

}
	constructor(){}
}/*搜索到的同盟信息 协议id:3572*/
export class AllianceSearch_revc{
public protoid:number = 3572
	/*同盟信息*/
	public info:stAlliance=new stAlliance();

public read(b){
let len;
this.info.read(b);

}
	constructor(){}
}/*获取同盟申请加入的列表（返回3562） 协议id:3573*/
export class AllianceApplyList_req{
public protoid:number = 3573
public write(b){
let len;

}
	constructor(){}
}export class stCheifStarUp{
	/*副将id 对应t_Chief_List.xlsx的f_cheifid*/
	public cheifId:number;

	/*提升多少星级(副将可以升多少星)*/
	public num:number;

public write(b){
let len;
b.writeUint16(this.cheifId);
b.writeUint16(this.num);

}
public read(b){
let len;
this.cheifId=b.readUint16()
this.num=b.readUint16()

}
	constructor(){}
}/*批量副将提升星级,返回3369和3376和3390和3584 协议id:3574*/
export class CheifStarUpMulti_req{
public protoid:number = 3574
	/*批量提高副将星级的列表*/
	public dataList:stCheifStarUp[];

public write(b){
let len;

this.dataList=this.dataList||[];
len = this.dataList.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.dataList[i].write(b);
}

}
	constructor(){}
}/*同盟副本（凶兽入侵）初始化（3010前发） 协议id:3575*/
export class AllianceBossInit_revc{
public protoid:number = 3575
	/*凶兽id（t_TeamFight_BossPokedex的f_BossID）*/
	public bossId:number;

	/*今日已挑战的次数*/
	public fightNum:number;

	/*本周同盟排名*/
	public ranking:number;

	/*上次结算的同盟排名*/
	public lastRanking:number;

	/*上次结算的同盟排名奖励领取状态 0无奖励 1未领取 2已领取*/
	public rankRewardState:number;

	/*本周同盟排名结算时间戳*/
	public closeUnix:number;

public read(b){
let len;
this.bossId=b.readUint8()
this.fightNum=b.readUint8()
this.ranking=b.readUint16()
this.lastRanking=b.readUint16()
this.rankRewardState=b.readUint8()
this.closeUnix=b.readUint32()

}
	constructor(){}
}/*同盟内排行榜列表数据*/
export class stAllianceInnerRankPlayer{
	/*职位，0普通成员 1副会长 2会长*/
	public position:number;

	/*玩家头像*/
	public headUrl:string;

	/*玩家名字*/
	public name:string;

	/*玩家等级*/
	public lv:number;

	/*战斗力*/
	public plus:number;

	/*排名*/
	public rank:number;

	/*玩家角色ID*/
	public accountId:number;

	/*称号id*/
	public titleId:number;

	/*本周累积伤害值*/
	public accHarm:uint64=new uint64();

	/*区服名称*/
	public serverName:string;

public write(b){
let len;
b.writeUint8(this.position);
b.writeUTFString(this.headUrl||"");
b.writeUTFString(this.name||"");
b.writeUint16(this.lv);
b.writeUint32(this.plus);
b.writeUint16(this.rank);
b.writeUint32(this.accountId);
b.writeUint8(this.titleId);
this.accHarm.write(b);
b.writeUTFString(this.serverName||"");

}
public read(b){
let len;
this.position=b.readUint8()
this.headUrl=b.readUTFString()
this.name=b.readUTFString()
this.lv=b.readUint16()
this.plus=b.readUint32()
this.rank=b.readUint16()
this.accountId=b.readUint32()
this.titleId=b.readUint8()
this.accHarm.read(b);
this.serverName=b.readUTFString()

}
	constructor(){}
}/*同盟副本总排行榜列表数据*/
export class stAllianceBossRank{
	/*排名*/
	public rank:number;

	/*同盟id*/
	public uid:number;

	/*同盟名字*/
	public name:string;

	/*本周同盟总累积伤害值*/
	public accHarm:uint64=new uint64();

	/*同盟人数*/
	public num:number;

public write(b){
let len;
b.writeUint16(this.rank);
b.writeUint32(this.uid);
b.writeUTFString(this.name||"");
this.accHarm.write(b);
b.writeUint8(this.num);

}
public read(b){
let len;
this.rank=b.readUint16()
this.uid=b.readUint32()
this.name=b.readUTFString()
this.accHarm.read(b);
this.num=b.readUint8()

}
	constructor(){}
}/*同盟副本（凶兽入侵）总排行榜 协议id:3576*/
export class AllianceBossRankList_req{
public protoid:number = 3576
public write(b){
let len;

}
	constructor(){}
}/*同盟副本（凶兽入侵）总排行榜 协议id:3577*/
export class AllianceBossRankList_revc{
public protoid:number = 3577
	/*本盟的排名*/
	public rank:number;

	/*本盟本周累积伤害值*/
	public accHarm:uint64=new uint64();

	/*排行榜列表*/
	public dataList:stAllianceBossRank[];

public read(b){
let len;
this.rank=b.readUint16()
this.accHarm.read(b);
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stAllianceBossRank()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*同盟副本（凶兽入侵）盟内排行榜 协议id:3578*/
export class AllianceInnerRankList_req{
public protoid:number = 3578
public write(b){
let len;

}
	constructor(){}
}/*同盟副本（凶兽入侵）盟内排行榜 协议id:3579*/
export class AllianceInnerRankList_revc{
public protoid:number = 3579
	/*排行榜列表*/
	public dataList:stAllianceInnerRankPlayer[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stAllianceInnerRankPlayer()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*同盟刷新成员列表 协议id:3580*/
export class AllianceMember_req{
public protoid:number = 3580
	/*0玩家当前所在联盟 非0指定联盟id的成员列表*/
	public allianceId:number;

public write(b){
let len;
b.writeUint32(this.allianceId);

}
	constructor(){}
}/*同盟副本（凶兽入侵）领取排行榜周奖励 协议id:3581*/
export class AllianceRankReward_revc{
public protoid:number = 3581
	/*排行周经理领取状态 0无奖励 1未领取 2已领取*/
	public rankRewardState:number;

public read(b){
let len;
this.rankRewardState=b.readUint8()

}
	constructor(){}
}/*同盟副本（凶兽入侵）战斗 协议id:3582*/
export class AllianceBossFight_req{
public protoid:number = 3582
public write(b){
let len;

}
	constructor(){}
}/*同盟副本（凶兽入侵）挑战次数 协议id:3583*/
export class AllianceBossFight_revc{
public protoid:number = 3583
	/*今日已挑战的次数*/
	public fightNum:number;

public read(b){
let len;
this.fightNum=b.readUint8()

}
	constructor(){}
}/*批量副将提升星级成功 协议id:3584*/
export class CheifStarUpMulti_revc{
public protoid:number = 3584
public read(b){
let len;

}
	constructor(){}
}export class stSkyRank{
	/*玩家角色id*/
	public accountId:number;

	/*玩家昵称不带区服*/
	public nickName:string;

	/*区服名称*/
	public serverName:string;

	/*区服冠名*/
	public naming:string;

	/*头像*/
	public headUrl:string;

	/*名次*/
	public ranking:number;

	/*宠物、坐骑ID*/
	public id:number;

	/*宠物、坐骑星级*/
	public star:number;

	/*宠物、坐骑等级*/
	public level:number;

	/*战斗力*/
	public plus:number;

	/*序列号查看详情时候发过来，坐骑对应的坐骑ID,宠物对应的是宠物序列号*/
	public serialNum:number;

public write(b){
let len;
b.writeUint32(this.accountId);
b.writeUTFString(this.nickName||"");
b.writeUTFString(this.serverName||"");
b.writeUTFString(this.naming||"");
b.writeUTFString(this.headUrl||"");
b.writeUint32(this.ranking);
b.writeUint32(this.id);
b.writeUint16(this.star);
b.writeUint16(this.level);
b.writeUint32(this.plus);
b.writeUint32(this.serialNum);

}
public read(b){
let len;
this.accountId=b.readUint32()
this.nickName=b.readUTFString()
this.serverName=b.readUTFString()
this.naming=b.readUTFString()
this.headUrl=b.readUTFString()
this.ranking=b.readUint32()
this.id=b.readUint32()
this.star=b.readUint16()
this.level=b.readUint16()
this.plus=b.readUint32()
this.serialNum=b.readUint32()

}
	constructor(){}
}/*乱世天榜排行榜请求 协议id:3585*/
export class SkyRank_req{
public protoid:number = 3585
	/*类型 1坐骑 2宠物*/
	public type:number;

public write(b){
let len;
b.writeUint8(this.type);

}
	constructor(){}
}/*乱世天榜排行榜请求 协议id:3586*/
export class SkyRank_revc{
public protoid:number = 3586
	/*类型 1坐骑 2宠物*/
	public type:number;

	/*星星争夺战前50名的信息*/
	public dataList:stSkyRank[];

	/*当前玩家自己在星星争夺战的排名 长度=0则没有,最大长度为1*/
	public self:stSkyRank[];

public read(b){
let len;
this.type=b.readUint8()
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stSkyRank()
item.read(b);
this.dataList.push(item);

}
this.self=this.self||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stSkyRank()
item.read(b);
this.self.push(item);

}

}
	constructor(){}
}/*乱世排行查看玩家 协议id:3587*/
export class WatchSkyRank_req{
public protoid:number = 3587
	/*玩家的角色ID*/
	public accountId:number;

	/*坐骑对应的坐骑ID,宠物对应的是宠物序列号*/
	public serialNum:number;

	/*类型 1坐骑 2宠物*/
	public type:number;

public write(b){
let len;
b.writeUint32(this.accountId);
b.writeUint32(this.serialNum);
b.writeUint8(this.type);

}
	constructor(){}
}/*乱世排行查看玩家 协议id:3588*/
export class WatchSkyRank_revc{
public protoid:number = 3588
	/*角色昵称*/
	public NickName:string;

	/*头像*/
	public HeadUrl:string;

	/*区服名称*/
	public serverName:string;

	/*等级*/
	public Level:number;

	/*战斗力*/
	public plus:number;

	/*称号*/
	public titleId:number;

	/*类型 1坐骑 2宠物*/
	public type:number;

	/*查看的坐骑信息(只有一条,没有为空)*/
	public ride:stRideInfo[];

	/*查看的宠物信息(只有一条,没有为空)*/
	public petInfo:stPet[];

public read(b){
let len;
this.NickName=b.readUTFString()
this.HeadUrl=b.readUTFString()
this.serverName=b.readUTFString()
this.Level=b.readUint16()
this.plus=b.readUint32()
this.titleId=b.readUint8()
this.type=b.readUint8()
this.ride=this.ride||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stRideInfo()
item.read(b);
this.ride.push(item);

}
this.petInfo=this.petInfo||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stPet()
item.read(b);
this.petInfo.push(item);

}

}
	constructor(){}
}/*副将抽取等级变化 协议id:3589*/
export class DrawLevelChange_revc{
public protoid:number = 3589
	/*副将抽取等级*/
	public drawLevel:number;

	/*当前副将抽取等级下的经验值*/
	public curDrawExp:number;

public read(b){
let len;
this.drawLevel=b.readUint8()
this.curDrawExp=b.readUint32()

}
	constructor(){}
}/*活动累充金额与累充奖励领取相关 协议id:3590*/
export class TotalCntInit_revc{
public protoid:number = 3590
	/*活动类型 1万圣节*/
	public type:number;

	/*活动期间内的累计充值(单位分),变化走3593*/
	public totalCnt:number;

	/*活动期间内累充的金额奖励f_id(全量,变化走3592)
        1 t_Halloween_Purchase
        */
	public rewardList:number[];

public read(b){
let len;
this.type=b.readUint8()
this.totalCnt=b.readUint32()
this.rewardList=this.rewardList||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.rewardList.push(b.readUint16())
}

}
	constructor(){}
}/*累充奖励请求 协议id:3591*/
export class TotalCntReward_req{
public protoid:number = 3591
	/*活动类型 1万圣节*/
	public type:number;

	/*对应不同活动的累充奖励f_id*/
	public id:number;

public write(b){
let len;
b.writeUint8(this.type);
b.writeUint16(this.id);

}
	constructor(){}
}/*累充奖励已领取返回 协议id:3592*/
export class TotalCntReward_revc{
public protoid:number = 3592
	/*活动类型 1万圣节*/
	public type:number;

	/*(全量)*/
	public dataList:number[];

public read(b){
let len;
this.type=b.readUint8()
this.dataList=this.dataList||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.dataList.push(b.readUint16())
}

}
	constructor(){}
}/*累充金额变化后值 协议id:3593*/
export class TotalCntChange_revc{
public protoid:number = 3593
	/*活动类型 1万圣节*/
	public type:number;

	/*活动期间内的累计充值单位分(变化后的总值)*/
	public totalCnt:number;

public read(b){
let len;
this.type=b.readUint8()
this.totalCnt=b.readUint32()

}
	constructor(){}
}/*宠物聚灵兑换（返回3009和3025） 协议id:3594*/
export class PetSoulExchange_req{
public protoid:number = 3594
	/*兑换项的fid*/
	public fid:number;

public write(b){
let len;
b.writeUint8(this.fid);

}
	constructor(){}
}export class stPromotion{
	/*任务ID,对应对应t_Upsatage_Task.xlsx的f_id*/
	public taskId:number;

	/*任务内容,当任务类型=2时此时只会为0和1,0标识未完成,1标识已完成。其他都是标识数量*/
	public taskContent:number;

	/*当前奖励是否已领取 0未领取 1已领取*/
	public rewardStatus:number;

public write(b){
let len;
b.writeUint16(this.taskId);
b.writeUint16(this.taskContent);
b.writeUint8(this.rewardStatus);

}
public read(b){
let len;
this.taskId=b.readUint16()
this.taskContent=b.readUint16()
this.rewardStatus=b.readUint8()

}
	constructor(){}
}/*晋升初始化 协议id:3595*/
export class PromotionInit_revc{
public protoid:number = 3595
	/*当前玩家的晋升等级,对应t_Upstage_Rank.xlsx的f_id*/
	public promotionLevel:number;

	/*当前晋升等级下任务和奖励的达成与领取情况*/
	public dataList:stPromotion[];

public read(b){
let len;
this.promotionLevel=b.readUint8()
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stPromotion()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*晋升成功变化 协议id:3596*/
export class PromotionUgraded_revc{
public protoid:number = 3596
	/*当前玩家的晋升等级,对应t_Upstage_Rank.xlsx的f_id*/
	public promotionLevel:number;

	/*当前晋升等级下任务和奖励的达成与领取情况*/
	public dataList:stPromotion[];

public read(b){
let len;
this.promotionLevel=b.readUint8()
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stPromotion()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*晋升任务、奖励相关发生变化 协议id:3597*/
export class PromotionDataChange_revc{
public protoid:number = 3597
	/*当前晋升等级下任务和奖励的达成与领取情况*/
	public dataList:stPromotion[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stPromotion()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*领取晋升任务奖励,变化走3597 协议id:3598*/
export class PromotionReward_req{
public protoid:number = 3598
	/*任务ID,对应对应t_Upsatage_Task.xlsx的f_id*/
	public taskId:number;

public write(b){
let len;
b.writeUint16(this.taskId);

}
	constructor(){}
}/*晋升,晋升成功返回3596 协议id:3599*/
export class Promotion_req{
public protoid:number = 3599
public write(b){
let len;

}
	constructor(){}
}/*同盟内排行榜列表数据*/
export class stAllianceShop{
	/*t_Alliance_Shop.xlsx的f_id*/
	public fid:number;

	/*已购买次数*/
	public count:number;

public write(b){
let len;
b.writeUint8(this.fid);
b.writeUint8(this.count);

}
public read(b){
let len;
this.fid=b.readUint8()
this.count=b.readUint8()

}
	constructor(){}
}/*同盟商店购买 协议id:3600*/
export class AllianceShop_req{
public protoid:number = 3600
	/*t_Alliance_Shop.xlsx的f_id*/
	public fid:number;

public write(b){
let len;
b.writeUint8(this.fid);

}
	constructor(){}
}/*同盟商店购买 协议id:3601*/
export class AllianceShop_revc{
public protoid:number = 3601
	/*购买后的次数*/
	public data:stAllianceShop=new stAllianceShop();

public read(b){
let len;
this.data.read(b);

}
	constructor(){}
}/*同盟商店今日购买的商品信息（3010前发） 协议id:3602*/
export class AllianceShopInit_revc{
public protoid:number = 3602
	/*购买的商品列表*/
	public dataList:stAllianceShop[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stAllianceShop()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*微信头像授权(3010前推，状态变化时推) 协议id:3603*/
export class WxAuthInfo_revc{
public protoid:number = 3603
	/*按钮是否显示（0不显示 1显示）*/
	public show:number;

public read(b){
let len;
this.show=b.readUint8()

}
	constructor(){}
}/*微信头像授权 协议id:3604*/
export class WxAuthInfo_req{
public protoid:number = 3604
public write(b){
let len;

}
	constructor(){}
}/*修改同盟或公告（返回3556） 协议id:3605*/
export class AllianceSetWord_req{
public protoid:number = 3605
	/*1同盟公告 2改名字*/
	public type:number;

	/*要修改的值*/
	public value:string;

public write(b){
let len;
b.writeUint8(this.type);
b.writeUTFString(this.value||"");

}
	constructor(){}
}/*查看玩家信息（返回3071） 协议id:3606*/
export class JustWatchPlayer_req{
public protoid:number = 3606
	/*玩家id*/
	public playerId:number;

public write(b){
let len;
b.writeUint32(this.playerId);

}
	constructor(){}
}/*同盟加入冷却时间 协议id:3607*/
export class AllianceJoinWait_revc{
public protoid:number = 3607
	/*多少秒后才能加入*/
	public seconds:number;

public read(b){
let len;
this.seconds=b.readUint32()

}
	constructor(){}
}export class stAllianceWarTime{
	/*1赤壁大战报名时间 2赤壁大战活动时间 3奖励关卡活动时间 4当前周报名时间 5当前周活动时间 6当前周奖励关卡时间*/
	public type:number;

	/*开始时间戳,若state=0则是下次的开始时间戳*/
	public beginUnix:number;

	/*结束时间戳*/
	public endUnix:number;

	/*
        type=1赤壁大战报名(0报名已关闭 1可以报名) 
        type=2赤壁大战活动(0活动未开启 1活动进行中)
        type=3奖励关卡活动(0活动未开启 1活动进行中)
        type=4当前周报名(不需要管状态)
        type=5当前周活动(不需要管状态) 
        type=6当前周奖励关卡(不需要管状态)*/
	public state:number;

public write(b){
let len;
b.writeUint8(this.type);
b.writeUint32(this.beginUnix);
b.writeUint32(this.endUnix);
b.writeUint8(this.state);

}
public read(b){
let len;
this.type=b.readUint8()
this.beginUnix=b.readUint32()
this.endUnix=b.readUint32()
this.state=b.readUint8()

}
	constructor(){}
}/*赤壁大战初始化协议+3611是否报名成功（3010前发）,若活动开始则额外有3616,3612,奖励活动开始则有.. 协议id:3608*/
export class AllianceWarInit_revc{
public protoid:number = 3608
	/*赤壁大战报名时间、赤壁大战、奖励关卡活动时间*/
	public times:stAllianceWarTime[];

	/*同盟分组内排行,0标识没有排名,变化走3690*/
	public allianceRank:number;

	/*客户端状态*/
	public clientState:number;

public read(b){
let len;
this.times=this.times||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stAllianceWarTime()
item.read(b);
this.times.push(item);

}
this.allianceRank=b.readUint8()
this.clientState=b.readUint8()

}
	constructor(){}
}/*赤壁大战时间的变化 协议id:3609*/
export class AllianceWarTimeChange_revc{
public protoid:number = 3609
	/*赤壁大战报名时间、赤壁大战、奖励关卡活动时间*/
	public times:stAllianceWarTime[];

	/*客户端状态*/
	public clientState:number;

public read(b){
let len;
this.times=this.times||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stAllianceWarTime()
item.read(b);
this.times.push(item);

}
this.clientState=b.readUint8()

}
	constructor(){}
}/*赤壁大战报名 协议id:3610*/
export class AllianceWarSignUp_req{
public protoid:number = 3610
public write(b){
let len;

}
	constructor(){}
}/*赤壁大战报名(报名成功返回,失败不返回) 协议id:3611*/
export class AllianceWarSignUp_revc{
public protoid:number = 3611
public read(b){
let len;

}
	constructor(){}
}/*赤壁大战体力变化 协议id:3612*/
export class AllianceWarPsChange_revc{
public protoid:number = 3612
	/*玩家体力*/
	public ps:number;

	/*玩家体力恢复时间戳*/
	public unix:number;

public read(b){
let len;
this.ps=b.readUint8()
this.unix=b.readUint32()

}
	constructor(){}
}/*点击打开活动 协议id:3613*/
export class AllianceWarEnterActivity_req{
public protoid:number = 3613
	/*1标识是过五关斩六将(返回3612,3616) 2据点活动(返回3612,3616) 3奖励关卡*/
	public type:number;

public write(b){
let len;
b.writeUint8(this.type);

}
	constructor(){}
}export class stAllianceWarLife{
	/*bossID*/
	public id:number;

	/*血量*/
	public life:number;

public write(b){
let len;
b.writeUint32(this.id);
b.writeUint32(this.life);

}
public read(b){
let len;
this.id=b.readUint32()
this.life=b.readUint32()

}
	constructor(){}
}/*查看赤壁大战敌人血量(boss) 协议id:3614*/
export class AllianceWarEnemyLife_req{
public protoid:number = 3614
	/*bossID(bossId=0则返回所有boss血量)*/
	public id:number;

public write(b){
let len;
b.writeUint32(this.id);

}
	constructor(){}
}/*主题类型 协议id:3615*/
export class GameStyle_req{
public protoid:number = 3615
	/*1战鼓 2磕头 */
	public type:number;

public write(b){
let len;
b.writeUint8(this.type);

}
	constructor(){}
}/*赤壁大战敌人血量及血量变化后的值 协议id:3616*/
export class AllianceWarEnemyLife_revc{
public protoid:number = 3616
	/*赤壁大战boss或玩家的血量信息*/
	public dataList:stAllianceWarLife[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stAllianceWarLife()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*赤壁大战挑战boss(返回3612+3616) 协议id:3617*/
export class AllianceWarFight_req{
public protoid:number = 3617
	/*bossID*/
	public id:number;

public write(b){
let len;
b.writeUint32(this.id);

}
	constructor(){}
}/*获取开出的装备将可能获取的品质 协议id:3618*/
export class GetChestQua_req{
public protoid:number = 3618
	/*倍率*/
	public rate:number;

public write(b){
let len;
b.writeUint8(this.rate);

}
	constructor(){}
}/*获取开出的装备将可能获取的品质 协议id:3619*/
export class GetChestQua_revc{
public protoid:number = 3619
	/*品质值*/
	public val:number;

public read(b){
let len;
this.val=b.readUint8()

}
	constructor(){}
}export class stAllianceWarCityPreview{
	/*城池编号*/
	public cityType:number;

	/*哪些据点编号有人占领*/
	public baseNums:number[];

public write(b){
let len;
b.writeUint8(this.cityType);

this.baseNums=this.baseNums||[];
len = this.baseNums.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
b.writeUint8(this.baseNums[i]);
}

}
public read(b){
let len;
this.cityType=b.readUint8()
this.baseNums=this.baseNums||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.baseNums.push(b.readUint8())
}

}
	constructor(){}
}export class stAllianceWarCityContent{
	/*城池编号*/
	public cityType:number;

	/*据点编号*/
	public baseNum:number;

	/*占据点的玩家ID*/
	public playerId:number;

	/*玩家总血量*/
	public lifeTotal:number;

	/*玩家剩余血量*/
	public life:number;

	/*名字*/
	public name:string;

	/*区服名称*/
	public serverName:string;

	/*同盟名称*/
	public allianceName:string;

	/*称号id*/
	public titleid:number;

	/*战斗力*/
	public plus:number;

	/*形象*/
	public enemySkin:stSkin=new stSkin();

	/*占领的时长(秒)*/
	public seconds:number;

	/*获得的功勋*/
	public points:number;

public write(b){
let len;
b.writeUint8(this.cityType);
b.writeUint8(this.baseNum);
b.writeUint32(this.playerId);
b.writeUint32(this.lifeTotal);
b.writeUint32(this.life);
b.writeUTFString(this.name||"");
b.writeUTFString(this.serverName||"");
b.writeUTFString(this.allianceName||"");
b.writeUint32(this.titleid);
b.writeUint32(this.plus);
this.enemySkin.write(b);
b.writeUint32(this.seconds);
b.writeUint32(this.points);

}
public read(b){
let len;
this.cityType=b.readUint8()
this.baseNum=b.readUint8()
this.playerId=b.readUint32()
this.lifeTotal=b.readUint32()
this.life=b.readUint32()
this.name=b.readUTFString()
this.serverName=b.readUTFString()
this.allianceName=b.readUTFString()
this.titleid=b.readUint32()
this.plus=b.readUint32()
this.enemySkin.read(b);
this.seconds=b.readUint32()
this.points=b.readUint32()

}
	constructor(){}
}/*城池被占领预览(点击进入第二关页面) 协议id:3620*/
export class AllianceWarCityPreview_revc{
public protoid:number = 3620
	/*城池被占领预览*/
	public dataList:stAllianceWarCityPreview[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stAllianceWarCityPreview()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*查看城池被占领详情(返回3622) 协议id:3621*/
export class AllianceWarCityDetail_req{
public protoid:number = 3621
	/*城池编号*/
	public cityType:number;

public write(b){
let len;
b.writeUint8(this.cityType);

}
	constructor(){}
}export class stAllianceWarCityTakeOver{
	/*城池编号*/
	public cityType:number;

	/*据点编号*/
	public baseNum:number;

	/*首次是否已被占领 0否 1是*/
	public firsted:number;

public write(b){
let len;
b.writeUint8(this.cityType);
b.writeUint8(this.baseNum);
b.writeUint8(this.firsted);

}
public read(b){
let len;
this.cityType=b.readUint8()
this.baseNum=b.readUint8()
this.firsted=b.readUint8()

}
	constructor(){}
}/*查看城池被占领详情 协议id:3622*/
export class AllianceWarCityDetail_revc{
public protoid:number = 3622
	/*城池被占领详情*/
	public dataList:stAllianceWarCityContent[];

	/*判断城池内据点是否已被首次占领*/
	public takeOverList:stAllianceWarCityTakeOver[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stAllianceWarCityContent()
item.read(b);
this.dataList.push(item);

}
this.takeOverList=this.takeOverList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stAllianceWarCityTakeOver()
item.read(b);
this.takeOverList.push(item);

}

}
	constructor(){}
}/*城池内操作,返回3622+3620 协议id:3623*/
export class AllianceWarCityEvent_req{
public protoid:number = 3623
	/*0占领 1挑战*/
	public flag:number;

	/*城池编号*/
	public cityType:number;

	/*城池据点编号*/
	public baseNum:number;

public write(b){
let len;
b.writeUint8(this.flag);
b.writeUint8(this.cityType);
b.writeUint8(this.baseNum);

}
	constructor(){}
}/*城池内刷新占领预览及占据详情 协议id:3624*/
export class AllianceWarCityFresh_req{
public protoid:number = 3624
	/*0属性占领预览 1刷新城池占领详情(0返回3620  1返回3622)*/
	public flag:number;

	/*城池编号 flag=0的时候城池编号传0*/
	public cityType:number;

public write(b){
let len;
b.writeUint8(this.flag);
b.writeUint8(this.cityType);

}
	constructor(){}
}/*奖励关卡结束请求,返回3691+3025... 协议id:3625*/
export class AllianceWarBounsEnd_req{
public protoid:number = 3625
	/*敲鼓的总次数*/
	public num:number;

public write(b){
let len;
b.writeUint32(this.num);

}
	constructor(){}
}/*赤壁大战查看boss的伤害信息 协议id:3626*/
export class AllianceWarBossDamage_req{
public protoid:number = 3626
	/*bossID*/
	public id:number;

public write(b){
let len;
b.writeUint32(this.id);

}
	constructor(){}
}export class stBossDamage{
	/*伤害排名*/
	public rank:number;

	/*玩家的名字*/
	public nickName:string;

	/*玩家的等级*/
	public level:number;

	/*头像*/
	public headUrl:string;

	/*称号id*/
	public titleid:number;

	/*战斗力*/
	public plus:number;

	/*玩家当前boss的伤害量的万分比5069即50.69%*/
	public damagePercent:number;

	/*玩家当前boss的伤害量*/
	public damage:number;

public write(b){
let len;
b.writeUint32(this.rank);
b.writeUTFString(this.nickName||"");
b.writeUint16(this.level);
b.writeUTFString(this.headUrl||"");
b.writeUint32(this.titleid);
b.writeUint32(this.plus);
b.writeUint16(this.damagePercent);
b.writeUint32(this.damage);

}
public read(b){
let len;
this.rank=b.readUint32()
this.nickName=b.readUTFString()
this.level=b.readUint16()
this.headUrl=b.readUTFString()
this.titleid=b.readUint32()
this.plus=b.readUint32()
this.damagePercent=b.readUint16()
this.damage=b.readUint32()

}
	constructor(){}
}/*赤壁大战查看boss的伤害信息 协议id:3627*/
export class AllianceWarBossDamage_revc{
public protoid:number = 3627
	/*伤害详情*/
	public dataList:stBossDamage[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stBossDamage()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*赤壁大战据点日志 协议id:3628*/
export class AllianceWarCityLog_req{
public protoid:number = 3628
public write(b){
let len;

}
	constructor(){}
}export class stAllianceWarCityLog{
	/*主动发起方的玩家ID*/
	public playerId:number;

	/*主动发起方的玩家名称*/
	public nickName:string;

	/*主动发起方的头像*/
	public headUrl:string;

	/*主动发起方的同盟名称*/
	public allianceName:string;

	/*t_Alliance_War_BasePoint.xlsx的f_id*/
	public cityFID:number;

	/*1占领 2挑战未成功 3挑战成功后占领*/
	public action:number;

	/*被挑战方的玩家ID(只有action>=2)*/
	public playerIdDefend:number;

	/*被挑战方的玩家名称(只有action>=2)*/
	public nickNameDefend:string;

	/*被挑战方的同盟名称(只有action>=2)*/
	public allianceNameDefend:string;

	/*被挑战方的剩余血量万分比如5098即50.98%(只有action>=2)*/
	public lifeDefendPercent:number;

	/*时间发生的时间戳*/
	public unix:number;

public write(b){
let len;
b.writeUint32(this.playerId);
b.writeUTFString(this.nickName||"");
b.writeUTFString(this.headUrl||"");
b.writeUTFString(this.allianceName||"");
b.writeUint16(this.cityFID);
b.writeUint8(this.action);
b.writeUint32(this.playerIdDefend);
b.writeUTFString(this.nickNameDefend||"");
b.writeUTFString(this.allianceNameDefend||"");
b.writeUint16(this.lifeDefendPercent);
b.writeUint32(this.unix);

}
public read(b){
let len;
this.playerId=b.readUint32()
this.nickName=b.readUTFString()
this.headUrl=b.readUTFString()
this.allianceName=b.readUTFString()
this.cityFID=b.readUint16()
this.action=b.readUint8()
this.playerIdDefend=b.readUint32()
this.nickNameDefend=b.readUTFString()
this.allianceNameDefend=b.readUTFString()
this.lifeDefendPercent=b.readUint16()
this.unix=b.readUint32()

}
	constructor(){}
}/*赤壁大战据点日志 协议id:3629*/
export class AllianceWarCityLog_revc{
public protoid:number = 3629
	/*日志列表*/
	public dataList:stAllianceWarCityLog[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stAllianceWarCityLog()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}export class stAllianceWarAllianceRank{
	/*联盟id*/
	public uid:number;

	/*排名*/
	public rank:number;

	/*联盟名称*/
	public name:string;

	/*当前占领的据点数量*/
	public baseNum:number;

	/*占领点数*/
	public point:number;

public write(b){
let len;
b.writeUint32(this.uid);
b.writeUint32(this.rank);
b.writeUTFString(this.name||"");
b.writeUint16(this.baseNum);
b.writeUint32(this.point);

}
public read(b){
let len;
this.uid=b.readUint32()
this.rank=b.readUint32()
this.name=b.readUTFString()
this.baseNum=b.readUint16()
this.point=b.readUint32()

}
	constructor(){}
}/*赤壁大战排行榜-联盟排行 协议id:3630*/
export class AllianceWarAllianceRank_req{
public protoid:number = 3630
public write(b){
let len;

}
	constructor(){}
}/*赤壁大战排行榜-联盟排行 协议id:3631*/
export class AllianceWarAllianceRank_revc{
public protoid:number = 3631
	/*联盟排行*/
	public dataList:stAllianceWarAllianceRank[];

	/*玩家所在联盟的联盟排行*/
	public my:stAllianceWarAllianceRank=new stAllianceWarAllianceRank();

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stAllianceWarAllianceRank()
item.read(b);
this.dataList.push(item);

}
this.my.read(b);

}
	constructor(){}
}export class stAllianceWarInnerRank{
	/*伤害排名(若rank=0则标识没上榜)*/
	public rank:number;

	/*玩家的名字*/
	public nickName:string;

	/*玩家的等级*/
	public level:number;

	/*头像*/
	public headUrl:string;

	/*称号id*/
	public titleid:number;

	/*战斗力*/
	public plus:number;

	/*占领点数*/
	public point:number;

	/*玩家id*/
	public playerId:number;

public write(b){
let len;
b.writeUint32(this.rank);
b.writeUTFString(this.nickName||"");
b.writeUint16(this.level);
b.writeUTFString(this.headUrl||"");
b.writeUint32(this.titleid);
b.writeUint32(this.plus);
b.writeUint32(this.point);
b.writeUint32(this.playerId);

}
public read(b){
let len;
this.rank=b.readUint32()
this.nickName=b.readUTFString()
this.level=b.readUint16()
this.headUrl=b.readUTFString()
this.titleid=b.readUint32()
this.plus=b.readUint32()
this.point=b.readUint32()
this.playerId=b.readUint32()

}
	constructor(){}
}/*赤壁大战排行榜-盟内排行 协议id:3632*/
export class AllianceWarInnerRank_req{
public protoid:number = 3632
public write(b){
let len;

}
	constructor(){}
}/*赤壁大战排行榜-盟内排行 协议id:3633*/
export class AllianceWarInnerRank_revc{
public protoid:number = 3633
	/*盟内排行*/
	public dataList:stAllianceWarInnerRank[];

	/*玩家的盟内排行*/
	public my:stAllianceWarInnerRank=new stAllianceWarInnerRank();

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stAllianceWarInnerRank()
item.read(b);
this.dataList.push(item);

}
this.my.read(b);

}
	constructor(){}
}export class stAllianceWarRewardRank{
	/*伤害排名(若rank=0)*/
	public rank:number;

	/*玩家的名字*/
	public nickName:string;

	/*玩家的等级*/
	public level:number;

	/*头像*/
	public headUrl:string;

	/*称号id*/
	public titleid:number;

	/*战斗力*/
	public plus:number;

	/*敲击次数*/
	public count:number;

	/*玩家id*/
	public playerId:number;

public write(b){
let len;
b.writeUint32(this.rank);
b.writeUTFString(this.nickName||"");
b.writeUint16(this.level);
b.writeUTFString(this.headUrl||"");
b.writeUint32(this.titleid);
b.writeUint32(this.plus);
b.writeUint32(this.count);
b.writeUint32(this.playerId);

}
public read(b){
let len;
this.rank=b.readUint32()
this.nickName=b.readUTFString()
this.level=b.readUint16()
this.headUrl=b.readUTFString()
this.titleid=b.readUint32()
this.plus=b.readUint32()
this.count=b.readUint32()
this.playerId=b.readUint32()

}
	constructor(){}
}/*赤壁大战排行榜-特殊排行 协议id:3634*/
export class AllianceWarRewardRank_req{
public protoid:number = 3634
public write(b){
let len;

}
	constructor(){}
}/*赤壁大战排行榜-特殊排行 协议id:3635*/
export class AllianceWarRewardRank_revc{
public protoid:number = 3635
	/*特殊排行*/
	public dataList:stAllianceWarRewardRank[];

	/*当前玩家的特殊排行*/
	public my:stAllianceWarRewardRank=new stAllianceWarRewardRank();

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stAllianceWarRewardRank()
item.read(b);
this.dataList.push(item);

}
this.my.read(b);

}
	constructor(){}
}/*赤壁大战获取排行奖励 协议id:3636*/
export class AllianceWarGetRankReward_req{
public protoid:number = 3636
	/*1获取同盟分组内排行奖励 2获取同盟内排行奖励*/
	public flag:number;

public write(b){
let len;
b.writeUint8(this.flag);

}
	constructor(){}
}/*赤壁大战获取排行奖励 协议id:3637*/
export class AllianceWarGetRankReward_revc{
public protoid:number = 3637
	/*1获取同盟分组内排行奖励 2获取同盟内排行奖励*/
	public flag:number;

	/*0不可领 1可领 2已领*/
	public state:number;

public read(b){
let len;
this.flag=b.readUint8()
this.state=b.readUint8()

}
	constructor(){}
}/*战令积分（3010初始化前推，积分更新时推） 协议id:3638*/
export class BattlePass_revc{
public protoid:number = 3638
	/*玩家当前的战令月卡积分*/
	public monthPoint:number;

	/*玩家当前的战令周卡积分*/
	public weekPoint:number;

public read(b){
let len;
this.monthPoint=b.readUint32()
this.weekPoint=b.readUint32()

}
	constructor(){}
}export class stBattlePassCard{
	/*f_id*/
	public fid:number;

	/*0(都没有领取) 1(普通奖励已领取) 2(奖励全部领取)*/
	public state:number;

public write(b){
let len;
b.writeUint32(this.fid);
b.writeUint8(this.state);

}
public read(b){
let len;
this.fid=b.readUint32()
this.state=b.readUint8()

}
	constructor(){}
}/*战令月卡数据（3010初始化前推） 协议id:3639*/
export class BattlePassMonth_revc{
public protoid:number = 3639
	/*玩家的战令月卡所有奖励数据*/
	public dataList:stBattlePassCard[];

	/*0未购买 1已购买*/
	public paid:number;

	/*展示第几轮的奖励*/
	public round:number;

	/*活动重置时间戳（秒）*/
	public endUnix:number;

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stBattlePassCard()
item.read(b);
this.dataList.push(item);

}
this.paid=b.readUint8()
this.round=b.readUint8()
this.endUnix=b.readUint32()

}
	constructor(){}
}/*战令周卡数据（3010初始化前推） 协议id:3640*/
export class BattlePassWeek_revc{
public protoid:number = 3640
	/*玩家的战令周卡所有奖励数据*/
	public dataList:stBattlePassCard[];

	/*0未购买 1已购买*/
	public paid:number;

	/*展示第几轮的奖励*/
	public round:number;

	/*活动重置时间戳（秒）*/
	public endUnix:number;

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stBattlePassCard()
item.read(b);
this.dataList.push(item);

}
this.paid=b.readUint8()
this.round=b.readUint8()
this.endUnix=b.readUint32()

}
	constructor(){}
}/*战令一键领取奖励（返回3645或3646） 协议id:3641*/
export class BattlePassReward_req{
public protoid:number = 3641
	/*1月卡奖励 2周卡奖励*/
	public type:number;

public write(b){
let len;
b.writeUint8(this.type);

}
	constructor(){}
}export class stBattlePassTask{
	/*战令任务f_id*/
	public fid:number;

	/*完成的次数*/
	public count:number;

	/*任务状态，0进行中，1已完成，2已领取*/
	public state:number;

public write(b){
let len;
b.writeUint32(this.fid);
b.writeUint16(this.count);
b.writeUint8(this.state);

}
public read(b){
let len;
this.fid=b.readUint32()
this.count=b.readUint16()
this.state=b.readUint8()

}
	constructor(){}
}/*战令任务数据（仅3010初始化前推） 协议id:3642*/
export class BattlePassTask_revc{
public protoid:number = 3642
	/*玩家所有的任务数据*/
	public dataList:stBattlePassTask[];

	/*任务重置时间戳（秒）*/
	public endUnix:number;

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stBattlePassTask()
item.read(b);
this.dataList.push(item);

}
this.endUnix=b.readUint32()

}
	constructor(){}
}/*战令更新单个任务数据 协议id:3643*/
export class BattlePassTaskUpdate_revc{
public protoid:number = 3643
	/*玩家的任务数据*/
	public data:stBattlePassTask=new stBattlePassTask();

public read(b){
let len;
this.data.read(b);

}
	constructor(){}
}export class stBattlePassPack{
	/*战令礼包f_id*/
	public fid:number;

	/*当天是否购买，0未购买 1已购买*/
	public paid:number;

public write(b){
let len;
b.writeUint32(this.fid);
b.writeUint8(this.paid);

}
public read(b){
let len;
this.fid=b.readUint32()
this.paid=b.readUint8()

}
	constructor(){}
}/*战令礼包（3010初始化前推，数据变化时推） 协议id:3644*/
export class BattlePassPack_revc{
public protoid:number = 3644
	/*待领取的次数（客户端显示的数字）*/
	public buyNum:number;

	/*礼包重置时间戳（秒）*/
	public endUnix:number;

	/*免费奖励是否领取，0未领取 1已领取*/
	public freeState:number;

	/*玩家购买礼包的数据*/
	public dataList:stBattlePassPack[];

public read(b){
let len;
this.buyNum=b.readUint16()
this.endUnix=b.readUint32()
this.freeState=b.readUint8()
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stBattlePassPack()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*战令更新月卡奖励领取状态（月卡数据更新时推） 协议id:3645*/
export class BattlePassMonthUpdate_revc{
public protoid:number = 3645
	/*玩家的战令月卡所有奖励数据*/
	public dataList:stBattlePassCard[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stBattlePassCard()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*战令更新周卡奖励领取状态（周卡数据更新时推） 协议id:3646*/
export class BattlePassWeekUpdate_revc{
public protoid:number = 3646
	/*玩家的战令周卡所有奖励数据*/
	public dataList:stBattlePassCard[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stBattlePassCard()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*战令领取任务奖励（返回3638和3643） 协议id:3647*/
export class BattlePassTask_req{
public protoid:number = 3647
	/*领取任务奖励的f_id*/
	public fid:number;

public write(b){
let len;
b.writeUint32(this.fid);

}
	constructor(){}
}/*战令领取礼包免费奖励（返回3649） 协议id:3648*/
export class BattlePassPackFree_req{
public protoid:number = 3648
public write(b){
let len;

}
	constructor(){}
}/*战令领取礼包免费奖励 协议id:3649*/
export class BattlePassPackFree_revc{
public protoid:number = 3649
	/*免费奖励是否领取，0未领取 1已领取*/
	public freeState:number;

public read(b){
let len;
this.freeState=b.readUint8()

}
	constructor(){}
}/*战令领取累计购买奖励（返回3651） 协议id:3650*/
export class BattlePassPackAccTimes_req{
public protoid:number = 3650
public write(b){
let len;

}
	constructor(){}
}/*战令领取累计购买奖励 协议id:3651*/
export class BattlePassPackAccTimes_revc{
public protoid:number = 3651
	/*待领取的次数（客户端显示的数字）*/
	public buyNum:number;

public read(b){
let len;
this.buyNum=b.readUint16()

}
	constructor(){}
}/*战令购买礼包后更新（购买礼包后，返回3651、3652） 协议id:3652*/
export class BattlePassPackUpdate_revc{
public protoid:number = 3652
	/*玩家购买礼包后更新的数据*/
	public data:stBattlePassPack=new stBattlePassPack();

public read(b){
let len;
this.data.read(b);

}
	constructor(){}
}/*主题类型 协议id:3653*/
export class GameStyle_revc{
public protoid:number = 3653
	/*0无主题 1战鼓 2磕头*/
	public type:number;

public read(b){
let len;
this.type=b.readUint8()

}
	constructor(){}
}/*新跨服分组,初始化的时候返回 协议id:3654*/
export class NewCrossGroup_revc{
public protoid:number = 3654
	/*新的跨服分组id,0标识未跨服*/
	public newCrossGroupId:number;

	/*新的跨服分组开始的区服ID*/
	public serverIdBegin:number;

	/*新的跨服分组结束的区服ID*/
	public serverIdEnd:number;

public read(b){
let len;
this.newCrossGroupId=b.readUint32()
this.serverIdBegin=b.readUint32()
this.serverIdEnd=b.readUint32()

}
	constructor(){}
}export class stDailyEventTask{
	/*摸金校尉任务f_id*/
	public fid:number;

	/*完成的次数*/
	public count:number;

	/*任务状态，0进行中，1已完成，2已领取*/
	public state:number;

public write(b){
let len;
b.writeUint32(this.fid);
b.writeUint16(this.count);
b.writeUint8(this.state);

}
public read(b){
let len;
this.fid=b.readUint32()
this.count=b.readUint16()
this.state=b.readUint8()

}
	constructor(){}
}/*摸金校尉初始化（3010前推，服务器时间刷新时推） 协议id:3655*/
export class DailyEventInit_revc{
public protoid:number = 3655
	/*摸金校尉任务列表（表里配置的全部）*/
	public taskList:stDailyEventTask[];

	/*任务重置时间戳（秒）*/
	public taskEndUnix:number;

public read(b){
let len;
this.taskList=this.taskList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stDailyEventTask()
item.read(b);
this.taskList.push(item);

}
this.taskEndUnix=b.readUint32()

}
	constructor(){}
}/*摸金校尉任务更新（任务数据变化时返回） 协议id:3656*/
export class DailyEventTaskUpdate_revc{
public protoid:number = 3656
	/*摸金校尉任务列表（变化量）*/
	public taskList:stDailyEventTask[];

public read(b){
let len;
this.taskList=this.taskList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stDailyEventTask()
item.read(b);
this.taskList.push(item);

}

}
	constructor(){}
}/*摸金校尉领取任务奖励（返回3656） 协议id:3657*/
export class DailyEventTask_req{
public protoid:number = 3657
	/*摸金校尉任务f_id*/
	public fid:number;

public write(b){
let len;
b.writeUint32(this.fid);

}
	constructor(){}
}/*摸金校尉寻龙（返回3660） 协议id:3658*/
export class DailyEventSearch_req{
public protoid:number = 3658
	/*1单次寻龙 2十连寻龙*/
	public type:number;

	/*位置（t_DailyEvent_Position的f_id）*/
	public position:number;

public write(b){
let len;
b.writeUint8(this.type);
b.writeUint8(this.position);

}
	constructor(){}
}export class stDailyEvent{
	/*1基础时间 2稀有事件 3无事发生*/
	public type:number;

	/*奖励信息*/
	public rewardList:stCellValue[];

public write(b){
let len;
b.writeUint8(this.type);

this.rewardList=this.rewardList||[];
len = this.rewardList.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.rewardList[i].write(b);
}

}
public read(b){
let len;
this.type=b.readUint8()
this.rewardList=this.rewardList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stCellValue()
item.read(b);
this.rewardList.push(item);

}

}
	constructor(){}
}/*摸金校尉寻龙 协议id:3659*/
export class DailyEventSearch_revc{
public protoid:number = 3659
	/*寻龙结果*/
	public dataList:stDailyEvent[];

	/*位置（t_DailyEvent_Position的f_id）*/
	public position:number;

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stDailyEvent()
item.read(b);
this.dataList.push(item);

}
this.position=b.readUint8()

}
	constructor(){}
}export class stMonopolyMapInfo{
	/*地图f_id（t_Monopoly_Map）*/
	public fid:number;

	/*玩家当前所在第几个格子（起点是0）*/
	public num:number;

	/*玩家已游历圈数*/
	public count:number;

	/*地图是否解锁 0未解锁 1已解锁*/
	public type:number;

public write(b){
let len;
b.writeUint32(this.fid);
b.writeUint16(this.num);
b.writeUint16(this.count);
b.writeUint8(this.type);

}
public read(b){
let len;
this.fid=b.readUint32()
this.num=b.readUint16()
this.count=b.readUint16()
this.type=b.readUint8()

}
	constructor(){}
}export class stMonopolyTask{
	/*大富翁任务f_id*/
	public fid:number;

	/*完成的次数*/
	public count:number;

	/*任务状态，0进行中，1已完成，2已领取*/
	public state:number;

public write(b){
let len;
b.writeUint32(this.fid);
b.writeUint16(this.count);
b.writeUint8(this.state);

}
public read(b){
let len;
this.fid=b.readUint32()
this.count=b.readUint16()
this.state=b.readUint8()

}
	constructor(){}
}export class stMonopolyPack{
	/*大富翁礼包f_id*/
	public fid:number;

	/*购买/免费领取次数*/
	public count:number;

public write(b){
let len;
b.writeUint32(this.fid);
b.writeUint8(this.count);

}
public read(b){
let len;
this.fid=b.readUint32()
this.count=b.readUint8()

}
	constructor(){}
}/*大富翁初始化数据(3010前推，活动开始推) 协议id:3660*/
export class MonopolyInit_revc{
public protoid:number = 3660
	/*当前开启的活动子id（t_Pack_Controller的f_p2，1主公游历）*/
	public type:number;

	/*玩家游历地图数据（全部地图的数据）*/
	public mapList:stMonopolyMapInfo[];

	/*大富翁任务列表（全部量）*/
	public taskList:stMonopolyTask[];

	/*玩家购买礼包的数据*/
	public packList:stMonopolyPack[];

	/*任务/礼包的刷新时间戳（秒）*/
	public refreshUnix:number;

	/*活动结束时间戳（秒）*/
	public endUnix:number;

public read(b){
let len;
this.type=b.readUint16()
this.mapList=this.mapList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stMonopolyMapInfo()
item.read(b);
this.mapList.push(item);

}
this.taskList=this.taskList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stMonopolyTask()
item.read(b);
this.taskList.push(item);

}
this.packList=this.packList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stMonopolyPack()
item.read(b);
this.packList.push(item);

}
this.refreshUnix=b.readUint32()
this.endUnix=b.readUint32()

}
	constructor(){}
}/*大富翁投色子（返回3662） 协议id:3661*/
export class MonopolyGo_req{
public protoid:number = 3661
	/*地图f_id*/
	public mapId:number;

public write(b){
let len;
b.writeUint32(this.mapId);

}
	constructor(){}
}/*大富翁投色子 协议id:3662*/
export class MonopolyMapUpdate_revc{
public protoid:number = 3662
	/*更新后的地图数据（全部量）*/
	public mapList:stMonopolyMapInfo[];

public read(b){
let len;
this.mapList=this.mapList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stMonopolyMapInfo()
item.read(b);
this.mapList.push(item);

}

}
	constructor(){}
}/*大富翁任务更新（任务数据变化时返回） 协议id:3663*/
export class MonopolyTaskUpdate_revc{
public protoid:number = 3663
	/*大富翁任务列表（变化量）*/
	public taskList:stMonopolyTask[];

public read(b){
let len;
this.taskList=this.taskList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stMonopolyTask()
item.read(b);
this.taskList.push(item);

}

}
	constructor(){}
}/*大富翁领取任务奖励（返回3663） 协议id:3664*/
export class MonopolyTask_req{
public protoid:number = 3664
	/*大富翁任务f_id*/
	public fid:number;

public write(b){
let len;
b.writeUint32(this.fid);

}
	constructor(){}
}/*大富翁领取免费、看广告礼包（返回3666） 协议id:3665*/
export class MonopolyPack_req{
public protoid:number = 3665
	/*大富翁礼包f_id*/
	public fid:number;

public write(b){
let len;
b.writeUint32(this.fid);

}
	constructor(){}
}/*大富翁礼包数据更新 协议id:3666*/
export class MonopolyPackUpdate_revc{
public protoid:number = 3666
	/*玩家购买礼包的数据（变化量）*/
	public data:stMonopolyPack=new stMonopolyPack();

public read(b){
let len;
this.data.read(b);

}
	constructor(){}
}/*大富翁获取掷色子奖励协议（返回3025） 协议id:3667*/
export class MonopolyReward_req{
public protoid:number = 3667
	/*1格子奖励 2圈数奖励*/
	public type:number;

public write(b){
let len;
b.writeUint8(this.type);

}
	constructor(){}
}export class stDrawEventRewardInfo{
	/*大奖f_id（t_DrawEvent_Rewards）*/
	public fid:number;

	/*1可选择 2已抽取 3未解锁*/
	public state:number;

public write(b){
let len;
b.writeUint32(this.fid);
b.writeUint8(this.state);

}
public read(b){
let len;
this.fid=b.readUint32()
this.state=b.readUint8()

}
	constructor(){}
}export class stDrawEventCumulateRewardInfo{
	/*大奖f_id（t_DrawEvent_Rewards）*/
	public fid:number;

	/*0不可领取 1已领取 2可领取*/
	public state:number;

public write(b){
let len;
b.writeUint32(this.fid);
b.writeUint8(this.state);

}
public read(b){
let len;
this.fid=b.readUint32()
this.state=b.readUint8()

}
	constructor(){}
}export class stDrawEventTask{
	/*元旦活动任务f_id*/
	public fid:number;

	/*完成的次数*/
	public count:number;

	/*任务状态，0进行中，1已完成，2已领取*/
	public state:number;

public write(b){
let len;
b.writeUint32(this.fid);
b.writeUint16(this.count);
b.writeUint8(this.state);

}
public read(b){
let len;
this.fid=b.readUint32()
this.count=b.readUint16()
this.state=b.readUint8()

}
	constructor(){}
}export class stDrawEventPack{
	/*元旦活动礼包f_id*/
	public fid:number;

	/*购买/免费领取次数*/
	public count:number;

public write(b){
let len;
b.writeUint32(this.fid);
b.writeUint8(this.count);

}
public read(b){
let len;
this.fid=b.readUint32()
this.count=b.readUint8()

}
	constructor(){}
}/*元旦活动初始化数据(3010前推，活动开始推) 协议id:3668*/
export class DrawEventInit_revc{
public protoid:number = 3668
	/*玩家当前选择的大奖fid*/
	public rewardFid:number;

	/*当前开启的活动子id（t_Pack_Controller的f_p2）*/
	public type:number;

	/*玩家累计抽取次数*/
	public count:number;

	/*福运值*/
	public fuYunCount:number;

	/*玩家的奖励数据（全部量）*/
	public rewardList:stDrawEventRewardInfo[];

	/*玩家的累计奖励数据（全部量）*/
	public cumulateRewardList:stDrawEventCumulateRewardInfo[];

	/*元旦活动任务列表（全部量）*/
	public taskList:stDrawEventTask[];

	/*玩家购买礼包的数据*/
	public packList:stDrawEventPack[];

	/*任务/礼包的刷新时间戳（秒）*/
	public refreshUnix:number;

	/*活动结束时间戳（秒）*/
	public endUnix:number;

public read(b){
let len;
this.rewardFid=b.readUint32()
this.type=b.readUint16()
this.count=b.readUint32()
this.fuYunCount=b.readUint32()
this.rewardList=this.rewardList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stDrawEventRewardInfo()
item.read(b);
this.rewardList.push(item);

}
this.cumulateRewardList=this.cumulateRewardList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stDrawEventCumulateRewardInfo()
item.read(b);
this.cumulateRewardList.push(item);

}
this.taskList=this.taskList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stDrawEventTask()
item.read(b);
this.taskList.push(item);

}
this.packList=this.packList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stDrawEventPack()
item.read(b);
this.packList.push(item);

}
this.refreshUnix=b.readUint32()
this.endUnix=b.readUint32()

}
	constructor(){}
}/*元旦活动选择大奖（返回3670） 协议id:3669*/
export class DrawEventChoose_req{
public protoid:number = 3669
	/*大奖f_id（t_DrawEvent_Rewards）*/
	public fid:number;

public write(b){
let len;
b.writeUint32(this.fid);

}
	constructor(){}
}/*元旦活动选择大奖 协议id:3670*/
export class DrawEventChoose_revc{
public protoid:number = 3670
	/*大奖f_id（t_DrawEvent_Rewards）*/
	public fid:number;

public read(b){
let len;
this.fid=b.readUint32()

}
	constructor(){}
}/*元旦活动抽奖（返回3672） 协议id:3671*/
export class DrawEvent_req{
public protoid:number = 3671
	/*1抽一次 2十连抽*/
	public type:number;

public write(b){
let len;
b.writeUint8(this.type);

}
	constructor(){}
}/*元旦活动抽奖 协议id:3672*/
export class DrawEventRewardUpdate_revc{
public protoid:number = 3672
	/*更新后的奖励数据（全部量）*/
	public rewardList:stDrawEventRewardInfo[];

	/*玩家累计抽取次数*/
	public count:number;

	/*福运值*/
	public fuYunCount:number;

	/*玩家的累计奖励数据（全部量）*/
	public cumulateRewardList:stDrawEventCumulateRewardInfo[];

public read(b){
let len;
this.rewardList=this.rewardList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stDrawEventRewardInfo()
item.read(b);
this.rewardList.push(item);

}
this.count=b.readUint32()
this.fuYunCount=b.readUint32()
this.cumulateRewardList=this.cumulateRewardList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stDrawEventCumulateRewardInfo()
item.read(b);
this.cumulateRewardList.push(item);

}

}
	constructor(){}
}/*元旦活动任务更新（任务数据变化时返回） 协议id:3673*/
export class DrawEventTaskUpdate_revc{
public protoid:number = 3673
	/*元旦活动任务列表（变化量）*/
	public taskList:stDrawEventTask[];

public read(b){
let len;
this.taskList=this.taskList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stDrawEventTask()
item.read(b);
this.taskList.push(item);

}

}
	constructor(){}
}/*元旦活动领取任务奖励（返回3673） 协议id:3674*/
export class DrawEventTask_req{
public protoid:number = 3674
	/*元旦活动任务f_id*/
	public fid:number;

public write(b){
let len;
b.writeUint32(this.fid);

}
	constructor(){}
}/*元旦活动领取免费、看广告礼包（返回3676） 协议id:3675*/
export class DrawEventPack_req{
public protoid:number = 3675
	/*元旦活动礼包f_id*/
	public fid:number;

public write(b){
let len;
b.writeUint32(this.fid);

}
	constructor(){}
}/*元旦活动礼包数据更新 协议id:3676*/
export class DrawEventPack_revc{
public protoid:number = 3676
	/*玩家购买礼包的数据（变化量）*/
	public data:stDrawEventPack=new stDrawEventPack();

public read(b){
let len;
this.data.read(b);

}
	constructor(){}
}/*元旦活动领取累计奖励 协议id:3677*/
export class DrawEventCumulateReward_req{
public protoid:number = 3677
	/*累计奖励的f_id*/
	public fid:number;

public write(b){
let len;
b.writeUint8(this.fid);

}
	constructor(){}
}/*元旦活动领取累计奖励 协议id:3678*/
export class DrawEventCumulateReward_revc{
public protoid:number = 3678
	/*玩家的累计奖励数据（变化量）*/
	public cumulateRewardList:stDrawEventCumulateRewardInfo[];

public read(b){
let len;
this.cumulateRewardList=this.cumulateRewardList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stDrawEventCumulateRewardInfo()
item.read(b);
this.cumulateRewardList.push(item);

}

}
	constructor(){}
}/*元旦活动获取奖励协议（返回3025） 协议id:3679*/
export class DrawEventReward_req{
public protoid:number = 3679
public write(b){
let len;

}
	constructor(){}
}export class stArtifactSuit{
	/*神兵套装的f_id*/
	public fid:number;

	/*神兵套装状态 0不可激活 1可激活 2已激活*/
	public state:number;

	/*神兵套装当前激活的等级（未激活时为0）*/
	public currentLevel:number;

	/*神兵套装可以被激活的等级*/
	public activeLevel:number;

public write(b){
let len;
b.writeUint32(this.fid);
b.writeUint8(this.state);
b.writeUint8(this.currentLevel);
b.writeUint8(this.activeLevel);

}
public read(b){
let len;
this.fid=b.readUint32()
this.state=b.readUint8()
this.currentLevel=b.readUint8()
this.activeLevel=b.readUint8()

}
	constructor(){}
}/*神兵套装数据（3010前发） 协议id:3680*/
export class ArtifactSuitInit_revc{
public protoid:number = 3680
	/*神兵套装数据（全部量）*/
	public dataList:stArtifactSuit[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stArtifactSuit()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*神兵套装激活（返回3682） 协议id:3681*/
export class ArtifactSuit_req{
public protoid:number = 3681
	/*神兵套装的f_id*/
	public fid:number;

public write(b){
let len;
b.writeUint32(this.fid);

}
	constructor(){}
}/*神兵套装数据更新（激活时推，状态发生变化时主动推） 协议id:3682*/
export class ArtifactSuitUpdate_revc{
public protoid:number = 3682
	/*神兵套装数据（变化量，有可能重复推）*/
	public dataList:stArtifactSuit[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stArtifactSuit()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*宝石血脉激活 协议id:3684*/
export class GemLifeBlood_req{
public protoid:number = 3684
	/*0激活单个, 1一键激活*/
	public flag:number;

public write(b){
let len;
b.writeUint8(this.flag);

}
	constructor(){}
}/*宝石血脉变化 协议id:3685*/
export class GemLifeBlood_revc{
public protoid:number = 3685
	/*当前玩家拥有的宝石命脉信息*/
	public lifeBloodList:stGemLifeBlood[];

public read(b){
let len;
this.lifeBloodList=this.lifeBloodList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stGemLifeBlood()
item.read(b);
this.lifeBloodList.push(item);

}

}
	constructor(){}
}/*赤壁大战是否开启成功(打开赤壁大战时候返回) 协议id:3686*/
export class AllianceWarCan_revc{
public protoid:number = 3686
	/*0开启失败 1开启成功*/
	public state:number;

public read(b){
let len;
this.state=b.readUint8()

}
	constructor(){}
}/*赤壁大战过五关斩六将中玩家的伤害 协议id:3687*/
export class AllianceWarPlayerDamage_revc{
public protoid:number = 3687
	/*过五关斩六将的bossID*/
	public bossId:number;

	/*玩家的伤害*/
	public damage:number;

public read(b){
let len;
this.bossId=b.readUint8()
this.damage=b.readUint32()

}
	constructor(){}
}/*赤壁大战过奖励关卡同盟内玩家形象 协议id:3688*/
export class AllianceWarSkins_revc{
public protoid:number = 3688
	/*同盟内的玩家形象*/
	public dataList:stSkin[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stSkin()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*获取上一次同盟排行 协议id:3689*/
export class AllianceWarRank_req{
public protoid:number = 3689
public write(b){
let len;

}
	constructor(){}
}/*上一次同盟排行返回 协议id:3690*/
export class AllianceWarRank_revc{
public protoid:number = 3690
	/*0标识没有排名*/
	public rank:number;

public read(b){
let len;
this.rank=b.readUint8()

}
	constructor(){}
}/*奖励关卡结束请求 协议id:3691*/
export class AllianceWarBounsEnd_revc{
public protoid:number = 3691
	/*敲鼓的总次数*/
	public num:number;

	/*奖励数据列表*/
	public rewardList:stCellValue[];

public read(b){
let len;
this.num=b.readUint32()
this.rewardList=this.rewardList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stCellValue()
item.read(b);
this.rewardList.push(item);

}

}
	constructor(){}
}export class stNamingReward{
	/*冠名奖励的id*/
	public id:number;

	/*0不可领取 1已领取 2可领取*/
	public state:number;

public write(b){
let len;
b.writeUint8(this.id);
b.writeUint8(this.state);

}
public read(b){
let len;
this.id=b.readUint8()
this.state=b.readUint8()

}
	constructor(){}
}/*服务器冠名初始化 协议id:3692*/
export class NamingInit_revc{
public protoid:number = 3692
	/*首日充值金额单位分*/
	public firstDayCharge:number;

	/*冠名奖励状态*/
	public dataList:stNamingReward[];

	/*是否可以冠名 0否 1可以*/
	public canNamed:number;

	/*冠名次数,先按是否可以冠名为基准,若canNamed=0则namedTimes无论是什么数字都视为0*/
	public namedTimes:number;

	/*冠名结束时间戳,0即没有*/
	public namedEndUnix:number;

	/*首日活动结束时间戳*/
	public firstDayEndUnix:number;

public read(b){
let len;
this.firstDayCharge=b.readUint32()
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stNamingReward()
item.read(b);
this.dataList.push(item);

}
this.canNamed=b.readUint8()
this.namedTimes=b.readUint8()
this.namedEndUnix=b.readUint32()
this.firstDayEndUnix=b.readUint32()

}
	constructor(){}
}/*首日充值变化 协议id:3693*/
export class FirstDayCharge_revc{
public protoid:number = 3693
	/*首日充值金额变化,单位分*/
	public cnt:number;

public read(b){
let len;
this.cnt=b.readUint32()

}
	constructor(){}
}/*冠名奖励变化 协议id:3694*/
export class NamingReward_revc{
public protoid:number = 3694
	/*冠名奖励状态*/
	public dataList:stNamingReward[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stNamingReward()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*是否可以冠名信息变化 协议id:3695*/
export class NameingChange_revc{
public protoid:number = 3695
	/*是否可以冠名*/
	public canNamed:number;

	/*冠名次数,先按是否可以冠名为基准*/
	public namedTimes:number;

	/*冠名结束时间戳,0即没有*/
	public namedEndUnix:number;

public read(b){
let len;
this.canNamed=b.readUint8()
this.namedTimes=b.readUint8()
this.namedEndUnix=b.readUint32()

}
	constructor(){}
}/*冠名奖励变化,返回3694+3025 协议id:3696*/
export class GetNamingReward_req{
public protoid:number = 3696
	/*1首充奖励 2区服奖励*/
	public flag:number;

public write(b){
let len;
b.writeUint8(this.flag);

}
	constructor(){}
}/*冠名区服 协议id:3697*/
export class NameingServer_req{
public protoid:number = 3697
	/*区服名称*/
	public serverName:string;

public write(b){
let len;
b.writeUTFString(this.serverName||"");

}
	constructor(){}
}/*冠名区服 协议id:3698*/
export class NameingServer_revc{
public protoid:number = 3698
	/*区服ID*/
	public serverId:number;

	/*区服冠名*/
	public naming:string;

public read(b){
let len;
this.serverId=b.readUint32()
this.naming=b.readUTFString()

}
	constructor(){}
}/*冠名充值排行 协议id:3699*/
export class NamingChargeRank_req{
public protoid:number = 3699
	/*1首日返回3695 2区服返回3696*/
	public flag:number;

public write(b){
let len;
b.writeUint8(this.flag);

}
	constructor(){}
}export class stNamingRank{
	/*名次*/
	public ranking:number;

	/*玩家角色id*/
	public accountId:number;

	/*玩家昵称不带区服*/
	public nickName:string;

	/*头像*/
	public headUrl:string;

	/*玩家等级*/
	public playerLevel:number;

	/*称号id*/
	public titleId:number;

	/*战斗力*/
	public plus:number;

public write(b){
let len;
b.writeUint32(this.ranking);
b.writeUint32(this.accountId);
b.writeUTFString(this.nickName||"");
b.writeUTFString(this.headUrl||"");
b.writeUint16(this.playerLevel);
b.writeUint16(this.titleId);
b.writeUint32(this.plus);

}
public read(b){
let len;
this.ranking=b.readUint32()
this.accountId=b.readUint32()
this.nickName=b.readUTFString()
this.headUrl=b.readUTFString()
this.playerLevel=b.readUint16()
this.titleId=b.readUint16()
this.plus=b.readUint32()

}
	constructor(){}
}/*冠名首日(首位满足条件的玩家信息) 协议id:3700*/
export class NamingChargeRankFirstDay_revc{
public protoid:number = 3700
	/*首日满足条件的,最大长度1,若为0则标识没有满足条件的*/
	public dataList:stNamingRank[];

	/*第一名形象*/
	public top1:stPeakJjcAvatar[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stNamingRank()
item.read(b);
this.dataList.push(item);

}
this.top1=this.top1||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stPeakJjcAvatar()
item.read(b);
this.top1.push(item);

}

}
	constructor(){}
}/*冠名区服充值排行榜 协议id:3701*/
export class NamingChargeRank_revc{
public protoid:number = 3701
	/*冠名充值排行前50名*/
	public dataList:stNamingRank[];

	/*当前玩家自己在区服的排名 长度=0则没有,最大长度为1*/
	public self:stNamingRank[];

	/*前3名形象*/
	public top3:stPeakJjcAvatar[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stNamingRank()
item.read(b);
this.dataList.push(item);

}
this.self=this.self||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stNamingRank()
item.read(b);
this.self.push(item);

}
this.top3=this.top3||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stPeakJjcAvatar()
item.read(b);
this.top3.push(item);

}

}
	constructor(){}
}/*奖励关卡结束请求 协议id:3703*/
export class AllianceWarBounsCan_revc{
public protoid:number = 3703
	/*0可以打开 1已打过 2没资格 3不在奖励关卡时间内*/
	public code:number;

public read(b){
let len;
this.code=b.readUint8()

}
	constructor(){}
}/*赤壁大战获取排行奖励状态,返回3637 协议id:3704*/
export class AllianceWarGetRankRewardState_req{
public protoid:number = 3704
public write(b){
let len;

}
	constructor(){}
}export class stSpringFestivalRewardInfo{
	/*联盟总威望奖励f_id*/
	public fid:number;

	/*0不可领取 1已领取 2可领取*/
	public state:number;

public write(b){
let len;
b.writeUint32(this.fid);
b.writeUint8(this.state);

}
public read(b){
let len;
this.fid=b.readUint32()
this.state=b.readUint8()

}
	constructor(){}
}export class stSpringFestivalTask{
	/*春节活动任务f_id*/
	public fid:number;

	/*完成的次数*/
	public count:number;

	/*任务状态，0进行中，1已完成，2已领取*/
	public state:number;

public write(b){
let len;
b.writeUint32(this.fid);
b.writeUint32(this.count);
b.writeUint8(this.state);

}
public read(b){
let len;
this.fid=b.readUint32()
this.count=b.readUint32()
this.state=b.readUint8()

}
	constructor(){}
}export class stSpringFestivalPack{
	/*春节活动礼包f_id*/
	public fid:number;

	/*购买/免费领取次数*/
	public count:number;

public write(b){
let len;
b.writeUint32(this.fid);
b.writeUint8(this.count);

}
public read(b){
let len;
this.fid=b.readUint32()
this.count=b.readUint8()

}
	constructor(){}
}export class stSpringFestivalShop{
	/*春节活动商店物品f_id*/
	public fid:number;

	/*购买/免费领取次数*/
	public count:number;

public write(b){
let len;
b.writeUint32(this.fid);
b.writeUint8(this.count);

}
public read(b){
let len;
this.fid=b.readUint32()
this.count=b.readUint8()

}
	constructor(){}
}export class stSpringFestivalAllianceRank{
	/*联盟id*/
	public uid:number;

	/*排名*/
	public rank:number;

	/*联盟名称*/
	public name:string;

	/*联盟总威望值*/
	public prestige:number;

public write(b){
let len;
b.writeUint32(this.uid);
b.writeUint32(this.rank);
b.writeUTFString(this.name||"");
b.writeUint32(this.prestige);

}
public read(b){
let len;
this.uid=b.readUint32()
this.rank=b.readUint32()
this.name=b.readUTFString()
this.prestige=b.readUint32()

}
	constructor(){}
}/*春节活动初始化数据（3010前推） 协议id:3705*/
export class SpringFestivalInit_revc{
public protoid:number = 3705
	/*联盟id*/
	public allianceId:number;

	/*联盟总威望值（变化时发3723，玩家个人的威望及变化发3009）*/
	public prestige:number;

	/*玩家是否可参与春节活动*/
	public canJoin:number;

	/*是否报名 0未报名 1已报名*/
	public isEnroll:number;

	/*联盟总威望奖励（全部量）*/
	public rewardList:stSpringFestivalRewardInfo[];

	/*春节活动任务（全部量）*/
	public taskList:stSpringFestivalTask[];

	/*春节活动礼包（全部量）*/
	public packList:stSpringFestivalPack[];

	/*商店购买商品数据（全部量）*/
	public shopList:stSpringFestivalShop[];

	/*玩家所在联盟的威望排行*/
	public rank:number;

	/*威望排行奖励领取状态（0不可领取 1已领取 2可领取）*/
	public state:number;

	/*活动结束时间戳*/
	public endunix:number;

	/*领奖结束时间戳*/
	public rewardEndunix:number;

public read(b){
let len;
this.allianceId=b.readUint32()
this.prestige=b.readUint32()
this.canJoin=b.readUint8()
this.isEnroll=b.readUint8()
this.rewardList=this.rewardList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stSpringFestivalRewardInfo()
item.read(b);
this.rewardList.push(item);

}
this.taskList=this.taskList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stSpringFestivalTask()
item.read(b);
this.taskList.push(item);

}
this.packList=this.packList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stSpringFestivalPack()
item.read(b);
this.packList.push(item);

}
this.shopList=this.shopList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stSpringFestivalShop()
item.read(b);
this.shopList.push(item);

}
this.rank=b.readUint16()
this.state=b.readUint8()
this.endunix=b.readUint32()
this.rewardEndunix=b.readUint32()

}
	constructor(){}
}/*是否可参与春节活动（返回3707） 协议id:3706*/
export class SpringFestivalCanJoin_req{
public protoid:number = 3706
public write(b){
let len;

}
	constructor(){}
}/*是否可参与春节活动（不可参与时会返回错误码） 协议id:3707*/
export class SpringFestivalCanJoin_revc{
public protoid:number = 3707
	/*0活动关闭 1可报名 2活动结束可领奖*/
	public canJoin:number;

public read(b){
let len;
this.canJoin=b.readUint8()

}
	constructor(){}
}/*春节活动报名（返回3709） 协议id:3708*/
export class SpringFestivalEnroll_req{
public protoid:number = 3708
public write(b){
let len;

}
	constructor(){}
}/*春节活动报名（不可报名时会返回错误码） 协议id:3709*/
export class SpringFestivalEnroll_revc{
public protoid:number = 3709
	/*是否报名 0未报名 1已报名*/
	public isEnroll:number;

public read(b){
let len;
this.isEnroll=b.readUint8()

}
	constructor(){}
}/*春节活动点烟花（返回3025和3009） 协议id:3710*/
export class SpringFestivalFire_req{
public protoid:number = 3710
	/*点烟花的道具ID*/
	public itemId:number;

	/*道具数量*/
	public count:number;

public write(b){
let len;
b.writeUint32(this.itemId);
b.writeUint32(this.count);

}
	constructor(){}
}/*春节活动任务更新（任务数据变化时返回） 协议id:3711*/
export class SpringFestivalTaskUpdate_revc{
public protoid:number = 3711
	/*元旦活动任务列表（变化量）*/
	public taskList:stSpringFestivalTask[];

public read(b){
let len;
this.taskList=this.taskList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stSpringFestivalTask()
item.read(b);
this.taskList.push(item);

}

}
	constructor(){}
}/*春节活动领取任务奖励（返回3711） 协议id:3712*/
export class SpringFestivalTask_req{
public protoid:number = 3712
	/*春节活动任务f_id*/
	public fid:number;

public write(b){
let len;
b.writeUint32(this.fid);

}
	constructor(){}
}/*春节活动领取免费、看广告礼包（返回3714） 协议id:3713*/
export class SpringFestivalPack_req{
public protoid:number = 3713
	/*春节活动礼包f_id*/
	public fid:number;

public write(b){
let len;
b.writeUint32(this.fid);

}
	constructor(){}
}/*春节活动礼包数据更新 协议id:3714*/
export class SpringFestivalPack_revc{
public protoid:number = 3714
	/*玩家购买礼包的数据（变化量）*/
	public data:stSpringFestivalPack=new stSpringFestivalPack();

public read(b){
let len;
this.data.read(b);

}
	constructor(){}
}/*春节活动领取联盟总威望奖励（返回3716） 协议id:3715*/
export class SpringFestivalReward_req{
public protoid:number = 3715
	/*联盟总威望奖励的f_id*/
	public fid:number;

public write(b){
let len;
b.writeUint8(this.fid);

}
	constructor(){}
}/*春节活动联盟总威望奖励 协议id:3716*/
export class SpringFestivalReward_revc{
public protoid:number = 3716
	/*玩家的联盟总威望奖励数据（变化量）*/
	public rewardList:stSpringFestivalRewardInfo[];

public read(b){
let len;
this.rewardList=this.rewardList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stSpringFestivalRewardInfo()
item.read(b);
this.rewardList.push(item);

}

}
	constructor(){}
}/*春节活动联盟排行（返回3718） 协议id:3717*/
export class SpringFestivalAllianceRank_req{
public protoid:number = 3717
public write(b){
let len;

}
	constructor(){}
}/*春节活动联盟排行 协议id:3718*/
export class SpringFestivalAllianceRank_revc{
public protoid:number = 3718
	/*春节活动联盟排行数据*/
	public rankList:stSpringFestivalAllianceRank[];

	/*玩家所在联盟的威望排行*/
	public rank:number;

public read(b){
let len;
this.rankList=this.rankList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stSpringFestivalAllianceRank()
item.read(b);
this.rankList.push(item);

}
this.rank=b.readUint16()

}
	constructor(){}
}/*领取春节活动联盟奖励（返回3720） 协议id:3719*/
export class SpringFestivalAllianceRankReward_req{
public protoid:number = 3719
public write(b){
let len;

}
	constructor(){}
}/*领取春节活动联盟奖励（领取奖励时返回，排名奖励结算完后主动推送） 协议id:3720*/
export class SpringFestivalAllianceRankReward_revc{
public protoid:number = 3720
	/*威望排行奖励领取状态（0不可领取 1已领取 2可领取）*/
	public state:number;

public read(b){
let len;
this.state=b.readUint8()

}
	constructor(){}
}/*春节活动商店购买免费商品（返回3722） 协议id:3721*/
export class SpringFestivalShop_req{
public protoid:number = 3721
	/*春节活动商店物品f_id*/
	public fid:number;

	/*春节活动商店物品购买数量*/
	public count:number;

public write(b){
let len;
b.writeUint16(this.fid);
b.writeUint16(this.count);

}
	constructor(){}
}/*春节活动商店购买商品 协议id:3722*/
export class SpringFestivalShop_revc{
public protoid:number = 3722
	/*商店购买商品数据（变化量）*/
	public shopList:stSpringFestivalShop[];

public read(b){
let len;
this.shopList=this.shopList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stSpringFestivalShop()
item.read(b);
this.shopList.push(item);

}

}
	constructor(){}
}/*春节活动联盟总威望值（联盟总威望值变化时发送） 协议id:3723*/
export class SpringFestivalPrestige_revc{
public protoid:number = 3723
	/*联盟总威望值*/
	public prestige:number;

public read(b){
let len;
this.prestige=b.readUint32()

}
	constructor(){}
}/*获取侧边栏奖励 协议id:3724*/
export class SideBarReward_req{
public protoid:number = 3724
public write(b){
let len;

}
	constructor(){}
}/*侧边栏奖励状态状态(3010之前也会返回) 协议id:3725*/
export class SideBarReward_revc{
public protoid:number = 3725
	/*0不可领  1可以领*/
	public state:number;

public read(b){
let len;
this.state=b.readUint8()

}
	constructor(){}
}/*春节活动点烟花 协议id:3726*/
export class SpringFestivalFire_revc{
public protoid:number = 3726
	/*点烟花的道具ID*/
	public itemId:number;

public read(b){
let len;
this.itemId=b.readUint32()

}
	constructor(){}
}export class stWarcraftSkin{
	/*类型 1角色外观 2翅膀外观 3坐骑外观*/
	public type:number;

	/*当前穿戴的皮肤id（t_Image_List的f_ImageID或f_SkinID）*/
	public skinId:number;

	/*玩家已解锁的皮肤id（t_Image_List的f_ImageID或f_SkinID）*/
	public skinIds:number[];

public write(b){
let len;
b.writeUint8(this.type);
b.writeUint32(this.skinId);

this.skinIds=this.skinIds||[];
len = this.skinIds.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
b.writeUint32(this.skinIds[i]);
}

}
public read(b){
let len;
this.type=b.readUint8()
this.skinId=b.readUint32()
this.skinIds=this.skinIds||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.skinIds.push(b.readUint32())
}

}
	constructor(){}
}export class stWarcraftAttr{
	/*玩家皮肤属性id(t_Image_Attribute的f_id)*/
	public fid:number;

	/*属性状态 0不可激活 1可激活 2已激活*/
	public state:number;

public write(b){
let len;
b.writeUint32(this.fid);
b.writeUint8(this.state);

}
public read(b){
let len;
this.fid=b.readUint32()
this.state=b.readUint8()

}
	constructor(){}
}/*魔兽换装（初始化3010前推） 协议id:3727*/
export class WarcraftSkinInit_revc{
public protoid:number = 3727
	/*玩家的皮肤列表*/
	public skinList:stWarcraftSkin[];

	/*玩家的属性列表*/
	public attrList:stWarcraftAttr[];

public read(b){
let len;
this.skinList=this.skinList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stWarcraftSkin()
item.read(b);
this.skinList.push(item);

}
this.attrList=this.attrList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stWarcraftAttr()
item.read(b);
this.attrList.push(item);

}

}
	constructor(){}
}/*魔兽换装（返回3729） 协议id:3728*/
export class WarcraftSkin_req{
public protoid:number = 3728
	/*类型 1角色外观 2翅膀外观 3坐骑外观*/
	public type:number;

	/*t_Image_List的f_ImageID或f_SkinID*/
	public fid:number;

public write(b){
let len;
b.writeUint8(this.type);
b.writeUint32(this.fid);

}
	constructor(){}
}/*魔兽换装 协议id:3729*/
export class WarcraftSkin_revc{
public protoid:number = 3729
	/*类型 1角色外观 2翅膀外观 3坐骑外观*/
	public type:number;

	/*玩家当前穿戴的皮肤id（t_Image_List的f_ImageID或f_SkinID）*/
	public skinId:number;

public read(b){
let len;
this.type=b.readUint8()
this.skinId=b.readUint32()

}
	constructor(){}
}/*魔兽换装解锁新皮肤 协议id:3730*/
export class WarcraftSkinListUpdate_revc{
public protoid:number = 3730
	/*类型 1角色外观 2翅膀外观 3坐骑外观*/
	public type:number;

	/*玩家解锁的皮肤id变化量（t_Image_List的f_ImageID或f_SkinID）*/
	public skinIds:number[];

public read(b){
let len;
this.type=b.readUint8()
this.skinIds=this.skinIds||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.skinIds.push(b.readUint32())
}

}
	constructor(){}
}/*魔兽换装激活皮肤属性 协议id:3731*/
export class WarcraftAttrListUpdate_revc{
public protoid:number = 3731
	/*玩家已激活的属性列表（变化量）*/
	public attrList:stWarcraftAttr[];

public read(b){
let len;
this.attrList=this.attrList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stWarcraftAttr()
item.read(b);
this.attrList.push(item);

}

}
	constructor(){}
}/*魔兽换装激活皮肤属性（返回3731） 协议id:3732*/
export class WarcraftSkinAttr_req{
public protoid:number = 3732
	/*t_Image_Attribute的f_id*/
	public fid:number;

public write(b){
let len;
b.writeUint32(this.fid);

}
	constructor(){}
}export class stMountShop{
	/*对应t_Mount_shop.xlsx的f_id*/
	public id:number;

	/*对应商品购买的个数*/
	public cnt:number;

public write(b){
let len;
b.writeUint8(this.id);
b.writeUint32(this.cnt);

}
public read(b){
let len;
this.id=b.readUint8()
this.cnt=b.readUint32()

}
	constructor(){}
}/*坐骑商城商品购买初始化协议 协议id:3733*/
export class MountShopGoodsInit_revc{
public protoid:number = 3733
	/*坐骑商城购买数量*/
	public dataList:stMountShop[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stMountShop()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*坐骑商城购买 协议id:3734*/
export class MountShop_req{
public protoid:number = 3734
	/*对应t_Mount_shop.xlsx的f_id*/
	public id:number;

	/*商品购买的个数*/
	public cnt:number;

public write(b){
let len;
b.writeUint8(this.id);
b.writeUint32(this.cnt);

}
	constructor(){}
}/*坐骑商城购买成功 协议id:3735*/
export class MountShop_revc{
public protoid:number = 3735
public read(b){
let len;

}
	constructor(){}
}/*坐骑商城商品购买数量变化协议 协议id:3736*/
export class MountShopGoods_revc{
public protoid:number = 3736
	/*坐骑商城购买数量变化*/
	public dataList:stMountShop[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stMountShop()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*0.1新的弹出窗口的的操作 协议id:3737*/
export class popWinDiscount_req{
public protoid:number = 3737
	/*流水号*/
	public uid:number;

public write(b){
let len;
b.writeUint16(this.uid);

}
	constructor(){}
}export class stPopWinDiscount{
	/*流水号 对应配置表t_Pack_Controller的f_id*/
	public uid:number;

	/*当前弹窗有没有开 0关闭 1开启*/
	public popWinState:number;

	/*0.1新弹出礼包的子ID,确定当前所在的档位*/
	public popId:number;

	/*下次可弹窗的时间,若为0标识当前可以弹*/
	public cdEndUnix:number;

	/*当前弹出礼包重置时间即弹出礼包结束时间*/
	public popWinRestUnix:number;

	/*弹出礼包状态 0不可购买 1可购买 2已购买*/
	public packState:number;

public write(b){
let len;
b.writeUint16(this.uid);
b.writeUint16(this.popWinState);
b.writeUint16(this.popId);
b.writeUint32(this.cdEndUnix);
b.writeUint32(this.popWinRestUnix);
b.writeUint8(this.packState);

}
public read(b){
let len;
this.uid=b.readUint16()
this.popWinState=b.readUint16()
this.popId=b.readUint16()
this.cdEndUnix=b.readUint32()
this.popWinRestUnix=b.readUint32()
this.packState=b.readUint8()

}
	constructor(){}
}/*0.1弹出窗口的全量数据(初始化及变化时候推送) 协议id:3738*/
export class popWinDiscount_revc{
public protoid:number = 3738
	/*列表,列表中最后一条就是最近操作的一条数据*/
	public dataList:stPopWinDiscount[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stPopWinDiscount()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*八阵图格子结构体*/
export class stSkillTreeLattice{
	/*格子id(t_SkillTree_LatticeAttribute表fid)*/
	public latticeId:number;

	/*格子激活的道具id（阴阳鱼、符箓） 0表示格子未激活*/
	public itemId:number;

public write(b){
let len;
b.writeUint16(this.latticeId);
b.writeUint32(this.itemId);

}
public read(b){
let len;
this.latticeId=b.readUint16()
this.itemId=b.readUint32()

}
	constructor(){}
}/*八阵图结构体*/
export class stSkillTreeGraph{
	/*八阵图id（t_SkillTree_Graph表f_id）*/
	public uid:number;

	/*是否被解锁 0未解锁 1可解锁 2已解锁 */
	public state:number;

	/*格子列表*/
	public latticeList:stSkillTreeLattice[];

public write(b){
let len;
b.writeUint16(this.uid);
b.writeUint8(this.state);

this.latticeList=this.latticeList||[];
len = this.latticeList.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.latticeList[i].write(b);
}

}
public read(b){
let len;
this.uid=b.readUint16()
this.state=b.readUint8()
this.latticeList=this.latticeList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stSkillTreeLattice()
item.read(b);
this.latticeList.push(item);

}

}
	constructor(){}
}/*八阵图符箓结构体*/
export class stSkillTreeSpell{
	/*符箓id(t_SkillTree_Spell表fid)*/
	public spellId:number;

	/*是否被激活 0不可激活 1可激活 2已激活 */
	public state:number;

	/*符箓等级*/
	public level:number;

public write(b){
let len;
b.writeUint16(this.spellId);
b.writeUint8(this.state);
b.writeUint16(this.level);

}
public read(b){
let len;
this.spellId=b.readUint16()
this.state=b.readUint8()
this.level=b.readUint16()

}
	constructor(){}
}/*八阵图初始化 协议id:3739*/
export class SkillTreeInit_revc{
public protoid:number = 3739
	/*符箓列表（全部量）*/
	public spellList:stSkillTreeSpell[];

	/*阵图列表（全部量）*/
	public graphList:stSkillTreeGraph[];

public read(b){
let len;
this.spellList=this.spellList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stSkillTreeSpell()
item.read(b);
this.spellList.push(item);

}
this.graphList=this.graphList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stSkillTreeGraph()
item.read(b);
this.graphList.push(item);

}

}
	constructor(){}
}/*八阵图解锁阵图（返回SkillTreeGraphUpdate） 协议id:3740*/
export class SkillTreeBuyGraph_req{
public protoid:number = 3740
	/*八阵图id（t_SkillTree_Graph表f_id）*/
	public uid:number;

public write(b){
let len;
b.writeUint16(this.uid);

}
	constructor(){}
}/*八阵图解锁阵图 协议id:3741*/
export class SkillTreeGraphUpdate_revc{
public protoid:number = 3741
	/*阵图列表（变化量）*/
	public graphList:stSkillTreeGraph[];

public read(b){
let len;
this.graphList=this.graphList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stSkillTreeGraph()
item.read(b);
this.graphList.push(item);

}

}
	constructor(){}
}/*八阵图点亮格子、替换符箓（返回SkillTreeGraphUpdate） 协议id:3742*/
export class SkillTreeLit_req{
public protoid:number = 3742
	/*八阵图id（t_SkillTree_Graph表f_id）*/
	public latticeId:number;

	/*点亮天元/替换符箓时传符箓的itemId 其他传0*/
	public itemId:number;

public write(b){
let len;
b.writeUint16(this.latticeId);
b.writeUint32(this.itemId);

}
	constructor(){}
}/*八阵图重置 协议id:3743*/
export class SkillTreeResetGraph_req{
public protoid:number = 3743
	/*八阵图id（t_SkillTree_Graph表f_id）*/
	public uid:number;

	/*1重置（返回SkillTreeGraphUpdate） 2回收*/
	public type:number;

public write(b){
let len;
b.writeUint16(this.uid);
b.writeUint8(this.type);

}
	constructor(){}
}/*八阵图升级符箓 协议id:3744*/
export class SkillTreeUpgradeSpell_req{
public protoid:number = 3744
	/*升级符箓的itemId*/
	public itemId:number;

public write(b){
let len;
b.writeUint32(this.itemId);

}
	constructor(){}
}/*功能多次抽卡开启状态 协议id:3745*/
export class MulTimes_revc{
public protoid:number = 3745
	/*1坐骑10连抽 2抽取10连抽*/
	public type:number;

	/*0未开启 1已开启*/
	public state:number;

public read(b){
let len;
this.type=b.readUint8()
this.state=b.readUint8()

}
	constructor(){}
}/*宝石批量合成 协议id:3746*/
export class Gemsynthetic_req{
public protoid:number = 3746
	/*宝石等级*/
	public level:number;

public write(b){
let len;
b.writeUint8(this.level);

}
	constructor(){}
}export class stTimeCommon{
	/*1每日周礼包 2每日月礼包*/
	public flag:number;

	/*开始时间 无开始0*/
	public starttime:number;

	/*结束时间 无结束为0*/
	public endtime:number;

public write(b){
let len;
b.writeUint8(this.flag);
b.writeUint32(this.starttime);
b.writeUint32(this.endtime);

}
public read(b){
let len;
this.flag=b.readUint8()
this.starttime=b.readUint32()
this.endtime=b.readUint32()

}
	constructor(){}
}/*每日礼包周和月的时间 协议id:3747*/
export class DailyPackTimes_revc{
public protoid:number = 3747
	/*时间详情*/
	public dataList:stTimeCommon[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stTimeCommon()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*首冲礼包和皮肤礼包是否拆分 协议id:3748*/
export class FirstPaySplit_revc{
public protoid:number = 3748
	/*0未拆分 1已拆分*/
	public flag:number;

public read(b){
let len;
this.flag=b.readUint8()

}
	constructor(){}
}export class stVipPrivilege{
	/*玩家当前的vip等级fid(t_VIP表f_id)*/
	public fid:number;

	/*0不可领取 1已领取 2可领取*/
	public state:number;

public write(b){
let len;
b.writeUint16(this.fid);
b.writeUint8(this.state);

}
public read(b){
let len;
this.fid=b.readUint16()
this.state=b.readUint8()

}
	constructor(){}
}/*vip特权数据（3010前推） 协议id:3749*/
export class VipPrivilegeInit_revc{
public protoid:number = 3749
	/*玩家当前的vip等级fid(t_VIP表f_id)*/
	public fid:number;

	/*vip奖励数据*/
	public datalist:stVipPrivilege[];

	/*玩家已消耗代金券的数量*/
	public num:number;

public read(b){
let len;
this.fid=b.readUint16()
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stVipPrivilege()
item.read(b);
this.datalist.push(item);

}
this.num=b.readUint32()

}
	constructor(){}
}/*领取vip特权奖励（返回3751） 协议id:3750*/
export class VipPrivilegeReward_req{
public protoid:number = 3750
	/*玩家当前的vip等级fid(t_VIP表f_id)*/
	public fid:number;

public write(b){
let len;
b.writeUint16(this.fid);

}
	constructor(){}
}/*更新vip特权数据（领取奖励后推，玩家vip等级变化时推, 玩家已消耗代金券的数量变化时推） 协议id:3751*/
export class VipPrivilegeUpdate_revc{
public protoid:number = 3751
	/*玩家当前的vip等级fid(t_VIP表f_id)*/
	public fid:number;

	/*vip数据(全部量)*/
	public datalist:stVipPrivilege[];

	/*玩家已消耗代金券的数量*/
	public num:number;

public read(b){
let len;
this.fid=b.readUint16()
this.datalist=this.datalist||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stVipPrivilege()
item.read(b);
this.datalist.push(item);

}
this.num=b.readUint32()

}
	constructor(){}
}/*修改玩家昵称（返回3753、3754） 协议id:3752*/
export class NicknameModify_req{
public protoid:number = 3752
	/*玩家要修改的昵称*/
	public name:string;

public write(b){
let len;
b.writeUTFString(this.name||"");

}
	constructor(){}
}/*3010初始化前推，修改昵称后推 协议id:3753*/
export class NicknameModify_revc{
public protoid:number = 3753
	/*0玩家未修改过昵称 1玩家修改过昵称*/
	public state:number;

public read(b){
let len;
this.state=b.readUint8()

}
	constructor(){}
}/*玩家修改昵称成功后返回 协议id:3754*/
export class NicknameModifySuccess_revc{
public protoid:number = 3754
	/*玩家修改后的昵称*/
	public name:string;

public read(b){
let len;
this.name=b.readUTFString()

}
	constructor(){}
}export class stEasyPay{
	/*t_Purchase_EasyPay.xlsx的f_id*/
	public id:number;

	/*一键礼包可以购买的充值id*/
	public dataList:number[];

public write(b){
let len;
b.writeUint8(this.id);

this.dataList=this.dataList||[];
len = this.dataList.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
b.writeUint16(this.dataList[i]);
}

}
public read(b){
let len;
this.id=b.readUint8()
this.dataList=this.dataList||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.dataList.push(b.readUint16())
}

}
	constructor(){}
}/*一键礼包可以买的详情 协议id:3755*/
export class EasyPayList_revc{
public protoid:number = 3755
	/*一键礼包可购买详情*/
	public dataList:stEasyPay[];

public read(b){
let len;
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stEasyPay()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*抗击凶兽（3010初始化前发） 协议id:3756*/
export class RecurringBossInit_revc{
public protoid:number = 3756
	/*凶兽id（t_TeamFight_BossPokedex的f_BossID）*/
	public bossId:number;

	/*活动结束时间戳*/
	public endunix:number;

	/*今日免费打怪次数*/
	public freeNum:number;

	/*今日使用元宝打怪次数*/
	public buyNum:number;

	/*今日看广告打怪次数*/
	public adNum:number;

public read(b){
let len;
this.bossId=b.readUint8()
this.endunix=b.readUint32()
this.freeNum=b.readUint8()
this.buyNum=b.readUint8()
this.adNum=b.readUint8()

}
	constructor(){}
}/*抗击凶兽战斗请求（返回3758） 协议id:3757*/
export class RecurringBossFight_req{
public protoid:number = 3757
	/*1免费挑战 2用元宝挑战（看广告挑战，用3273请求）*/
	public type:number;

public write(b){
let len;
b.writeUint8(this.type);

}
	constructor(){}
}/*抗击凶兽（挑战次数发生变化时发） 协议id:3758*/
export class RecurringBossUpdate_revc{
public protoid:number = 3758
	/*本局战斗的总伤害值*/
	public totalHarm:number;

	/*今日免费打怪次数*/
	public freeNum:number;

	/*今日使用元宝打怪次数*/
	public buyNum:number;

	/*今日看广告打怪次数*/
	public adNum:number;

public read(b){
let len;
this.totalHarm=b.readUint32()
this.freeNum=b.readUint8()
this.buyNum=b.readUint8()
this.adNum=b.readUint8()

}
	constructor(){}
}export class stOptionalGift{
	/*自选礼包的fid*/
	public id:number;

	/*选择的道具列表*/
	public items:stOptionalItem[];

public write(b){
let len;
b.writeUint8(this.id);

this.items=this.items||[];
len = this.items.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.items[i].write(b);
}

}
public read(b){
let len;
this.id=b.readUint8()
this.items=this.items||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stOptionalItem()
item.read(b);
this.items.push(item);

}

}
	constructor(){}
}export class stOptionalItem{
	/*自选道具所在的奖励上索引位置*/
	public itemIdx:number;

	/*道具所在格子位置*/
	public pos:number;

public write(b){
let len;
b.writeUint8(this.itemIdx);
b.writeUint8(this.pos);

}
public read(b){
let len;
this.itemIdx=b.readUint8()
this.pos=b.readUint8()

}
	constructor(){}
}/*自选礼包数据信息(初始化或变化的时候推送) 协议id:3759*/
export class OptionalGift_revc{
public protoid:number = 3759
	/*0全量数据(初始化或每日刷新推送) 1增量或变量数据(设置或改变推送)*/
	public type:number;

	/*自选礼包数据*/
	public dataList:stOptionalGift[];

public read(b){
let len;
this.type=b.readUint8()
this.dataList=this.dataList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stOptionalGift()
item.read(b);
this.dataList.push(item);

}

}
	constructor(){}
}/*设置或更新自选礼包 协议id:3760*/
export class OptionalGift_req{
public protoid:number = 3760
	/*自选礼包数据*/
	public dataList:stOptionalGift[];

public write(b){
let len;

this.dataList=this.dataList||[];
len = this.dataList.length;
b.writeInt32(len);
for(let i = 0;i < len;i++){
this.dataList[i].write(b);
}

}
	constructor(){}
}export class stGeXuQiPaoTask{
	/*割须弃袍任务f_id*/
	public fid:number;

	/*完成的次数*/
	public count:number;

	/*任务状态，0进行中，1已完成，2已领取*/
	public state:number;

public write(b){
let len;
b.writeUint32(this.fid);
b.writeUint32(this.count);
b.writeUint8(this.state);

}
public read(b){
let len;
this.fid=b.readUint32()
this.count=b.readUint32()
this.state=b.readUint8()

}
	constructor(){}
}export class stGeXuQiPaoPack{
	/*割须弃袍礼包f_id*/
	public fid:number;

	/*购买/免费领取次数*/
	public count:number;

public write(b){
let len;
b.writeUint32(this.fid);
b.writeUint8(this.count);

}
public read(b){
let len;
this.fid=b.readUint32()
this.count=b.readUint8()

}
	constructor(){}
}export class stGeXuQiPaoShop{
	/*割须弃袍商店物品f_id*/
	public fid:number;

	/*购买/免费领取次数*/
	public count:number;

public write(b){
let len;
b.writeUint32(this.fid);
b.writeUint8(this.count);

}
public read(b){
let len;
this.fid=b.readUint32()
this.count=b.readUint8()

}
	constructor(){}
}/*割须弃袍初始化数据（3010前推） 协议id:3761*/
export class GeXuQiPaoInit_revc{
public protoid:number = 3761
	/*割须弃袍任务（全部量）*/
	public taskList:stGeXuQiPaoTask[];

	/*割须弃袍礼包（全部量）*/
	public packList:stGeXuQiPaoPack[];

	/*商店购买商品数据（全部量）*/
	public shopList:stGeXuQiPaoShop[];

	/*任务/礼包的刷新时间戳（秒）*/
	public refreshUnix:number;

	/*活动结束时间戳（秒）*/
	public endUnix:number;

public read(b){
let len;
this.taskList=this.taskList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stGeXuQiPaoTask()
item.read(b);
this.taskList.push(item);

}
this.packList=this.packList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stGeXuQiPaoPack()
item.read(b);
this.packList.push(item);

}
this.shopList=this.shopList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stGeXuQiPaoShop()
item.read(b);
this.shopList.push(item);

}
this.refreshUnix=b.readUint32()
this.endUnix=b.readUint32()

}
	constructor(){}
}/*割须弃袍任务更新（任务数据变化时返回） 协议id:3762*/
export class GeXuQiPaoTask_revc{
public protoid:number = 3762
	/*元旦活动任务列表（变化量）*/
	public taskList:stGeXuQiPaoTask[];

public read(b){
let len;
this.taskList=this.taskList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stGeXuQiPaoTask()
item.read(b);
this.taskList.push(item);

}

}
	constructor(){}
}/*割须弃袍领取任务奖励（返回3762） 协议id:3763*/
export class GeXuQiPaoTask_req{
public protoid:number = 3763
	/*割须弃袍任务f_id*/
	public fid:number;

public write(b){
let len;
b.writeUint32(this.fid);

}
	constructor(){}
}/*割须弃袍领取免费、看广告礼包（返回3765） 协议id:3764*/
export class GeXuQiPaoPack_req{
public protoid:number = 3764
	/*割须弃袍礼包f_id*/
	public fid:number;

public write(b){
let len;
b.writeUint32(this.fid);

}
	constructor(){}
}/*割须弃袍礼包数据更新 协议id:3765*/
export class GeXuQiPaoPack_revc{
public protoid:number = 3765
	/*玩家购买礼包的数据（变化量）*/
	public data:stGeXuQiPaoPack=new stGeXuQiPaoPack();

public read(b){
let len;
this.data.read(b);

}
	constructor(){}
}/*割须弃袍商店购买免费商品（返回3765） 协议id:3766*/
export class GeXuQiPaoShop_req{
public protoid:number = 3766
	/*割须弃袍商店物品f_id*/
	public fid:number;

	/*割须弃袍商店物品购买数量*/
	public count:number;

public write(b){
let len;
b.writeUint16(this.fid);
b.writeUint16(this.count);

}
	constructor(){}
}/*割须弃袍商店购买商品 协议id:3767*/
export class GeXuQiPaoShop_revc{
public protoid:number = 3767
	/*商店购买商品数据（变化量）*/
	public shopList:stGeXuQiPaoShop[];

public read(b){
let len;
this.shopList=this.shopList||[];

len = b.readInt32();
for(let i = 0;i < len;i++){
let item = new stGeXuQiPaoShop()
item.read(b);
this.shopList.push(item);

}

}
	constructor(){}
}/*割须弃袍追击（返回3770） 协议id:3768*/
export class GeXuQiPaoZhuiJi_req{
public protoid:number = 3768
	/*0单抽 1十连抽*/
	public type:number;

public write(b){
let len;
b.writeUint8(this.type);

}
	constructor(){}
}/*获取奖励 协议id:3769*/
export class GetRewardFromCache_req{
public protoid:number = 3769
	/*1割须弃袍追击*/
	public type:number;

public write(b){
let len;
b.writeUint8(this.type);

}
	constructor(){}
}/*割须弃袍追击 协议id:3770*/
export class GeXuQiPaoZhuiJi_revc{
public protoid:number = 3770
	/*抽中的随机fid t_RecurringActivity_DrawEvent_RewardRate表f_id*/
	public datalist:number[];

public read(b){
let len;
this.datalist=this.datalist||[];
len = b.readInt32();
for(let i = 0;i < len;i++){
this.datalist.push(b.readUint32())
}

}
	constructor(){}
}