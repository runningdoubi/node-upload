/**
 * @file: upload.conf.js
 * @des: upload 配置文件
 * @author: zhangjiaqi03
 * @date: 2020-02-28 21:44:31
 * @last modified by:   zhangjiaqi03
 * @last modified time: 2020-02-28 21:44:31
 */

module.exports = {
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
