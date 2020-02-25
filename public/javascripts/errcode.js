module.exports = {
    'SUCCESS': {// 成功
        errno: 1000,
        errmsg: 'upload success'
    },
    'NO-FILE': {// 上传为空
        errno: 1001,
        errmsg: 'no File'
    },
    'FILE-TYPE': {// 文件类型校验失败
        errno: 1002,
        errmsg: 'only accept zip/tar/tgz/gzip'
    },
    'FILE-LIMIT': {// 文件大小校验失败
        errno: 1003,
        errmsg: 'max size 1M'
    },
    'FILE-NO-STANDARD': {// 文件不规范(少文件)
        errno: 1004,
        errmsg: 'file no standard'
    },
    'JSON-ILLEGAL': {// conf.json parse失败
        errno: 1005,
        errmsg: 'conf.json illegal'
    },
    'JSON-PARAMS-ERR': {// 文件参数缺失
        errno: 1006,
        errmsg: 'params err'
    }
}
