(function (exports) {
    'use strict';

    let TypeDef = {
        string: 1,
        uint32: 2,
        uint: 3,
        ulong: 4,
        int: 5,
        float: 6,
        byte: 7,
        long: 8,
        ushort: 9,
        array: 10,
        arraystring: 11
    };
    function getCellFiledLen(type) {
        switch (type) {
            case TypeDef.byte:
                return 1;
            case TypeDef.string:
            case TypeDef.ushort:
                return 2;
            case TypeDef.int:
            case TypeDef.uint32:
            case TypeDef.uint:
            case TypeDef.float:
                return 4;
            case TypeDef.ulong:
            case TypeDef.long:
                return 8;
            case TypeDef.array:
            case TypeDef.arraystring:
                return 2;
            default:
                throw "getCellFiledLen " + type;
        }
        return;
    }
    function objDispose(obj) {
        obj.bs.clear();
        for (let o in obj.localOffsetMap) {
            delete obj.localOffsetMap[o];
        }
        delete obj.localOffsetMap;
        delete obj.strlist;
        delete obj.fmap;
        delete obj.fieldList;
        delete obj.bs;
        delete obj.typeList;
        delete obj.tabelName;
    }
    function parse(bs) {
        let obj = {
            dataStart: 0,
            bs: bs,
            fieldList: [],
            typeList: [],
            fmap: [],
            len: 0,
            oneCellLen: 0,
            strlist: [],
            localOffsetMap: {},
            tabelName: "",
        };
        bs.pos = 0;
        let strpos = bs.readUint32();
        let dataPos = bs.readUint16();
        let tabelName = bs.readUTFString();
        obj.tabelName = tabelName;
        let filedLen = bs.readByte();
        let fieldList = [];
        let typeList = [];
        for (let i = 0; i < filedLen; i++) {
            let filed = bs.readUTFString();
            fieldList.push(filed);
        }
        obj.fieldList = fieldList;
        for (let i = 0; i < filedLen; i++) {
            let type = bs.readByte();
            typeList.push(type);
        }
        obj.typeList = typeList;
        let fmap = [];
        let oneCellLen = 0;
        for (let i = 0; i < typeList.length; i++) {
            fmap.push(oneCellLen);
            let a = getCellFiledLen(typeList[i]);
            oneCellLen += a;
        }
        obj.len = bs.readUint32();
        obj.fmap = fmap;
        obj.dataStart = dataPos;
        bs.pos = strpos;
        let strlist = obj.strlist;
        let strlen = bs.readUint32();
        for (let i = 0; i < strlen; i++) {
            strlist.push(bs.readUTFString());
        }
        for (let n = 0; n < fieldList.length; n++) {
            let localOffset = obj.fmap[n];
            obj.localOffsetMap[fieldList[n]] = localOffset;
        }
        obj.oneCellLen = oneCellLen;
        return obj;
    }
    function getv(obj, type, pos, localOffset) {
        let bs = obj.bs;
        bs.pos = pos + localOffset;
        switch (type) {
            case TypeDef.string:
                let index = bs.readUint16();
                let s = obj.strlist[index];
                return s;
            case TypeDef.uint32:
                return bs.readUint32();
            case TypeDef.uint:
                return bs.readUint32();
            case TypeDef.ulong:
                let high1 = bs.readUint32();
                let low1 = bs.readUint32();
                return new ByteCfg.uint64(low1, high1);
            case TypeDef.int:
                return bs.readInt32();
            case TypeDef.float:
                return bs.readFloat32();
            case TypeDef.byte:
                return bs.readByte();
            case TypeDef.long:
                let high = bs.readUint32();
                let low = bs.readUint32();
                return new ByteCfg.uint64(low, high, false);
            case TypeDef.ushort:
                return bs.readUint16();
            case TypeDef.array:
            case TypeDef.arraystring:
                let index1 = bs.readUint16();
                let s1 = obj.strlist[index1];
                let arr = s1.split(",");
                if (s1.length == 0) {
                    return [];
                }
                else {
                    let nums = [];
                    for (let n = 0; n < arr.length; n++) {
                        if (type == TypeDef.array) {
                            nums.push(parseFloat(arr[n]));
                        }
                        else if (type == TypeDef.arraystring) {
                            nums.push(arr[n]);
                        }
                    }
                    return nums;
                }
            default:
                let err = "ByteCfg getv ,type:" + type;
                console.error("......................" + err);
                throw err;
        }
    }
    function parseNode(obj, pos1, key, value) {
        let bs = obj.bs;
        let fieldList = obj.fieldList;
        let start = pos1;
        bs.pos = start;
        let objValue = new Object();
        for (let i = 0; i < fieldList.length; i++) {
            let field = fieldList[i];
            if (field == key) {
                objValue[field] = value;
            }
            else {
                let localOffset = obj.localOffsetMap[field];
                let localIndex = obj.fieldList.indexOf(field);
                let type = obj.typeList[localIndex];
                let v = getv(obj, type, pos1, localOffset);
                objValue[field] = v;
            }
        }
        return objValue;
    }
    function getValueByKey(obj, key, v) {
        let localIndex = obj.fieldList.indexOf(key);
        let type = obj.typeList[localIndex];
        let localOffset = obj.localOffsetMap[key];
        let bs = obj.bs;
        let start = obj.dataStart;
        bs.pos = start;
        for (let i = 0; i < obj.len; i++) {
            let pos = start + i * obj.oneCellLen;
            let curV = getv(obj, type, pos, localOffset);
            let isEquals = false;
            if (type == TypeDef.ulong || type == TypeDef.long) {
                if (curV.toString() == v.toString()) {
                    isEquals = true;
                }
            }
            else if (curV == v) {
                isEquals = true;
            }
            if (isEquals) {
                return parseNode(obj, pos, key, v);
            }
        }
    }
    function getAllValueByKey(obj, key) {
        let result = [];
        let localIndex = obj.fieldList.indexOf(key);
        let type = obj.typeList[localIndex];
        let localOffset = obj.localOffsetMap[key];
        let bs = obj.bs;
        let start = obj.dataStart;
        bs.pos = start;
        for (let i = 0; i < obj.len; i++) {
            let pos = start + i * obj.oneCellLen;
            let curV = getv(obj, type, pos, localOffset);
            result.push(curV);
        }
        return result;
    }
    function getAllCallByKey(obj, that, callback) {
        let bs = obj.bs;
        let start = obj.dataStart;
        bs.pos = start;
        for (let i = 0; i < obj.len; i++) {
            let pos = start + i * obj.oneCellLen;
            let node = parseNode(obj, pos);
            if (callback.call(that, node)) {
                return true;
            }
        }
    }
    function parseAll(obj) {
        let bs = obj.bs;
        let start = obj.dataStart;
        bs.pos = start;
        let list1 = [];
        for (let i = 0; i < obj.len; i++) {
            let pos = start + i * obj.oneCellLen;
            list1.push(parseNode(obj, pos));
        }
        return list1;
    }
    class ByteCfg {
        init(bs) {
            this.b = bs;
            this.b.pos = 0;
            this.obj = parse(this.b);
            this.tableName = this.obj.tabelName;
        }
        getKv(key, v) {
            return getValueByKey(this.obj, key, v);
        }
        getAllByKey(key) {
            return getAllValueByKey(this.obj, key);
        }
        initDataMap() {
            if (!ByteCfg.indexKEY) {
                throw "indexKEY maybe is (f_id)";
            }
            if (!ByteCfg.uint64) {
                throw `uint64 is not def,you can use (ByteCfg.uint64 = 1;) or (ByteCfg.uint64=uint64)`;
            }
            this._mDataMap = {};
            this.list1 = parseAll(this.obj);
            for (let i = 0; i < this.list1.length; i++) {
                let node = this.list1[i];
                this._mDataMap[node[ByteCfg.indexKEY]] = node;
            }
            this.b.clear();
        }
        getAllCallByKey(that, func) {
            getAllCallByKey(this.obj, that, func);
        }
        get mDataMap() {
            if (!this._mDataMap) {
                this.initDataMap();
            }
            return this._mDataMap;
        }
        dispose() {
            objDispose(this.obj);
            delete this.obj;
            if (this.list1) {
                for (let o in this.list1) {
                    delete this.list1[o];
                }
                delete this.list1;
            }
            if (this._mDataMap) {
                for (let o in this._mDataMap) {
                    delete this._mDataMap[o];
                }
                delete this._mDataMap;
            }
            delete this.tableName;
            delete this.b;
        }
    }

    exports.ByteCfg = ByteCfg;

    return exports;

}(window));
