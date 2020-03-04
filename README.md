## 一个基于express的极简的上传文件的案例
# 开始
npm i && npm start

默认3000端口

访问localhost:3000

# 说明
上传基于配置 conf/upload.conf.js

默认配置
``` javascript
{
    // 需要的目录,如果没有会自动创建
    must_dirs: {
        // 上传目录
        upload: 'upload/',
        // 临时解压目录
        compress_tmp: 'compress_tmp/',
        // 临时上传目录
        upload_tmp: 'upload_tmp/',
    },
    // 允许上传的文件类型 zip, tar, tgz, gzip
    accept_files: {
        'application/zip': 'zip',
        'application/x-tar': 'tar',
        'application/x-compressed': 'tgz',
        'application/x-gzip': 'gzip'
    },
    // 文件内必须包含的文件
    must_file: ['conf.json', 'README.md'],
    // 文件大小限制 1M
    max_size: 1 * 1024 * 1024
}
```

上传会对conf.json做简单的校验，必需字段(暂定)
``` javascript
[
    'title',
    'desc',
    'type',
    'username',
    'link',
    'createrHooks'
]
```
