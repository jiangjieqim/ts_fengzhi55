// import { uint64 } from "../network/protocols/uint64";
// window["uint64"] = uint64;
// export let ByteCfg = window["ByteCfg"];

// let TypeDef = {
//     string:1,
//     uint32:2,
//     uint:3,
//     ulong:4,
//     int:5,
//     float:6,
//     byte:7,
//     long:8,
//     ushort:9,
//     array:10
// }

// /**
//  * 计算单个字段占用长度
//  */
// function getCellFiledLen(type){
//     switch(type){
//         case TypeDef.byte://byte
//             return 1;
//         case TypeDef.string://string
//         case TypeDef.ushort://ushort
//             return 2;
//         case TypeDef.int://int
//         case TypeDef.uint32://uint32
//         case TypeDef.uint://uint
//         case TypeDef.float://float
//             return 4;
//         case TypeDef.ulong://ulong
//         case TypeDef.long://long
//             return 8;
//         case TypeDef.array://array
//             return 2;
//         default:
//             throw "getCellFiledLen "+type;
//     }
//     return;
// }
// function objDispose(obj){
//     (obj.bs as Laya.Byte).clear();

//     for(let o in obj.localOffsetMap){
//         delete obj.localOffsetMap[o];
//     }
//     delete obj.localOffsetMap;
//     delete obj.strlist;
//     delete obj.fmap;
//     delete obj.fieldList;
//     delete obj.bs;
//     delete obj.typeList;
//     delete obj.tabelName;
// }
// function parse(bs) {
//     let obj = {
//         dataStart : 0,//数据起始pos
//         bs : bs,    //Byte
//         fieldList:[],
//         typeList:[],
//         fmap:[],//局部字段偏移
//         len:0,//数据列表长度
//         oneCellLen:0,//一条数据的偏移长度
//         strlist:[],
//         localOffsetMap:{},//字段局部偏移
//         tabelName:"",
//     };
//     bs.pos = 0;

//     let strpos = bs.readUint32();//字符串起始坐标
//     // console.log(strpos);
//     let dataPos = bs.readUint16();//数据起始坐标

//     let tabelName = bs.readUTFString();
//     obj.tabelName = tabelName;
//     // console.log('parse tabelName '+tabelName,'len ' + bs.length,'strpos',strpos,"dataPos",dataPos);

//     // console.log(tabelName);
//     let filedLen = bs.readByte();

//     // console.log("filedLen", filedLen);
//     let fieldList = [];//字段名
//     let typeList = [];//类型数组

//     for (let i = 0; i < filedLen; i++) {
//         let filed = bs.readUTFString();
//         fieldList.push(filed);
//     }
//     // console.log('fieldList', fieldList);

//     obj.fieldList = fieldList;

//     for (let i = 0; i < filedLen; i++) {
//         let type = bs.readByte();
//         typeList.push(type);
//     }
//     obj.typeList = typeList;
//     // console.log('typeList', typeList);
//     let fmap = [];
//     let oneCellLen = 0;//一条数据的偏移长度
//     for(let i = 0;i < typeList.length;i++){
//         fmap.push(oneCellLen);
//         let a = getCellFiledLen(typeList[i]);
//         // console.log(i,"a:",a);
//         oneCellLen+=a;
//     }
//     obj.len = bs.readUint32();//数据列表长度
//     obj.fmap = fmap;
//     obj.dataStart = dataPos;
//     bs.pos = strpos;
//     let strlist = obj.strlist;
    


//     let strlen = bs.readUint32();
    
//     for(let i = 0;i < strlen;i++){
//         // console.log(i,",>>>>>>>>>>>>>>>",strlen,bs.length,bs.pos,strlist);
//         strlist.push(bs.readUTFString());

//     }
//     for(let n= 0;n < fieldList.length;n++){
//         // let localIndex = obj.fieldList.indexOf(fieldList[n]);//字段索引
//         let localOffset = obj.fmap[n];
//         obj.localOffsetMap[fieldList[n]]=localOffset;
//     }

//     // console.log("oneCell",oneCellLen);
//     obj.oneCellLen = oneCellLen;
//     return obj;
// }
// function getv(obj,type,pos,localOffset){
//     let bs = obj.bs;
//     bs.pos = pos + localOffset;
//     switch(type){
//         case TypeDef.string:
//             let index = bs.readUint16();
//             let s = obj.strlist[index];
//             return s;
//         case TypeDef.uint32:
//             return bs.readUint32();
//         case TypeDef.uint:
//             return bs.readUint32();
//         case TypeDef.ulong:
//             let high1 = bs.readUint32();
//             let low1 = bs.readUint32();
//             return new uint64(low1,high1);
//         case TypeDef.int:
//             return bs.readInt32();
//         case TypeDef.float:
//             return bs.readFloat32();
//         case TypeDef.byte:
//             return bs.readByte();
//         case TypeDef.long:
//             let high = bs.readUint32();
//             let low = bs.readUint32();
//             return new uint64(low,high,false);
//         case TypeDef.ushort:
//             return bs.readUint16();
//         case TypeDef.array:
//             let index1 = bs.readUint16();
//             let s1 = obj.strlist[index1];
//             let arr = s1.split(",");
//             if(s1.length == 0){
//                 return [];
//             }else{
//                 let nums = [];
//                 for(let n = 0;n < arr.length;n++){
//                     nums.push(parseFloat(arr[n]));
//                 }
//                 return nums;
//             }
//         default:
//             let err = "ByteCfg getv ,type:"+type;
//             console.log("......................"+err);
//             throw err;
//     }
// }

// /**
//  * 构造一个数据节点
//  */
// function parseNode(obj,pos1,key?,value?){
//     let bs = obj.bs;
//     let fieldList = obj.fieldList;
//     let start = pos1;
//     bs.pos = start;
//     let objValue = new Object();
//     for(let i = 0;i < fieldList.length;i++){
//         let field = fieldList[i];
//         if(field == key){
//             objValue[field] = value;
//         }else{
//             let localOffset = obj.localOffsetMap[field];
//             let localIndex = obj.fieldList.indexOf(field);//字段索引
//             let type = obj.typeList[localIndex];
//             let v = getv(obj,type,pos1,localOffset);
//             objValue[field] = v;
//         }
//     }
//     return objValue;
// }
// /**
//  * 根据键值获取节点数据
//  */
// function getValueByKey(obj,key,v){
//     let localIndex = obj.fieldList.indexOf(key);//字段索引
//     let type = obj.typeList[localIndex];
//     // console.log(localIndex);
//     let localOffset = obj.localOffsetMap[key];//obj.fmap[localIndex];
//     let bs = obj.bs;
//     // bs.pos = 0;
//     let start = obj.dataStart;
//     bs.pos = start;
//     for(let i = 0;i < obj.len;i++){
//         let pos = start + i * obj.oneCellLen;
//         let curV = getv(obj,type,pos,localOffset);

//         //判断是否相同
//         let isEquals = false;
//         if(type == TypeDef.ulong || type == TypeDef.long){
//             // if(curV.equals(v)){
//             if(curV.toString()==v.toString()){
//                 isEquals = true;
//             }
//         }else if(curV == v){
//             isEquals = true;
//         }

//         if(isEquals){
//             return parseNode(obj,pos,key,v);
//         }
//     }
// }

// /**
//  * 根据键值获取节点数据
//  */
// function getAllValueByKey(obj,key){
//     let result = [];
//     let localIndex = obj.fieldList.indexOf(key);//字段索引
//     let type = obj.typeList[localIndex];
//     // console.log(localIndex);
//     let localOffset = obj.localOffsetMap[key];//obj.fmap[localIndex];
//     let bs = obj.bs;
//     // bs.pos = 0;
//     let start = obj.dataStart;
//     bs.pos = start;

//     for(let i = 0;i < obj.len;i++){
//         let pos = start + i * obj.oneCellLen;
//         let curV = getv(obj,type,pos,localOffset);

//         //判断是否相同
//         // let isEquals = false;
//         // if(type == TypeDef.ulong || type == TypeDef.long){
//             // if(curV.equals(v)){
//             // if(curV.toString()==v.toString()){
//             //     isEquals = true;
//             // }
//         // }else if(curV == v){
//             // isEquals = true;
//         // }

//         // if(isEquals){
//             // return parseNode(obj,pos,key,v);
//         // }
//         result.push(curV);
//     }
//     return result;
// }


// /**
//  * for each
//  */
// function getAllCallByKey(obj,that,callback:Function){
//     // let result = [];
//     // let localIndex = obj.fieldList.indexOf(key);//字段索引
//     // let type = obj.typeList[localIndex];
//     // console.log(localIndex);
//     // let localOffset = obj.localOffsetMap[key];//obj.fmap[localIndex];
//     let bs = obj.bs;
//     // bs.pos = 0;
//     let start = obj.dataStart;
//     bs.pos = start;

//     for(let i = 0;i < obj.len;i++){
//         let pos = start + i * obj.oneCellLen;
//         let node = parseNode(obj,pos);
       
//         // if(callback.Invoke(node)){
//         if(callback.call(that,node)){
//            return true; 
//         }
//     }
// }



// /**
//  * 解析所有
//  */
// function parseAll(obj){
//     let bs = obj.bs;
//     // bs.pos = 0;
//     let start = obj.dataStart;
//     bs.pos = start;
//     let list1 = [];
//     for(let i = 0;i < obj.len;i++){
//         let pos = start + i * obj.oneCellLen;
//         list1.push(parseNode(obj,pos));
//     }
//     return list1;
// }

// export class ByteCfg{
//     public static indexKEY:string;
//     /**表名 */
//     public tableName:string;
//     /**键值数据 */
//     public _mDataMap;
//     /**列表 */
//     public list1;

//     private b:Laya.Byte;

//     private obj;

//     constructor(bs:Laya.Byte){
//         this.b = bs;
//         this.b.pos = 0;
//         // let strpos = bs.readUint32();//字符串起始坐标
//         // let dataPos = bs.readUint16();//数据起始坐标
//         // this.tableName = bs.readUTFString();
//         // console.log('tabelName:['+this.tabelName+']');
//         // console.log(this.tabelName);
//         this.obj = parse(this.b);
//         this.tableName = this.obj.tabelName;
//     }

//     public getKv(key:string,v){
//         return getValueByKey(this.obj,key,v);
//     }

//     public getAllByKey(key:string){
//         return getAllValueByKey(this.obj,key);
//     }

//     private initDataMap():void{
//         if(!ByteCfg.indexKEY){
//             throw "indexKEY maybe is (f_id)";
//         }
//         this._mDataMap = {};
//         // console.log("parse all:["+this.tableName+']');
//         this.list1 = parseAll(this.obj);
//         for(let i = 0;i < this.list1.length;i++){
//             let node =  this.list1[i];
            
//             this._mDataMap[node[ByteCfg.indexKEY]] = node;//待优化,读取得时候才解析
//         }
//         this.b.clear();
//     }

//     public getAllCallByKey(that,func:Function){
//         getAllCallByKey(this.obj,that,func);
//     }

//     public get mDataMap(){
//         if(!this._mDataMap){
//             this.initDataMap();
//         }
//         return this._mDataMap;
//     }
//     /**销毁 */
//     public dispose(){
//         objDispose(this.obj);
//         delete this.obj;
//         if(this.list1){
//             for(let o in this.list1){
//                 delete this.list1[o];
//             }
//             // this.list1.length = 0;
//             delete this.list1;
//         }
//         if(this._mDataMap){
//             for(let o in this._mDataMap){
//                 delete this._mDataMap[o];
//             }
//             delete this._mDataMap;
//         }
//         delete this.tableName;
//         delete this.b;
//     }
// }