module.exports = {
    'SUCCESS': {
        err: 1000,
        errmsg: 'upload success'
    },
    'NO-FILE': {// 上传为空
        err: 1001,
        errmsg: 'no File'
    },
    'FILE-TYPE': {// 文件类型校验
        err: 1002,
        errmsg: 'only accept zip'
    },
    'FILE-LIMIT': {// 文件大小校验
        err: 1003,
        errmsg: 'max size 1M'
    },
    'FILE-NO-STANDARD': {// 文件不规范
        err: 1004,
        errmsg: 'file no standard'
    }
}
