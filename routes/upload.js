const express = require('express');
const router = express.Router();
const multer = require('multer');
const compressing = require('compressing');
const { fs } = require('../public/javascripts/promisify');

const ERR_CODE = require('../public/javascripts/errcode');

const UPLOAD_TMP_PATH = 'upload_tmp/';
const UPLOAD_PATH = 'upload/';
const COMPRESS_TMP_PATH = 'compress_tmp/';
const upload = multer({ dest: UPLOAD_TMP_PATH });

// 允许上传的文件类型
// zip, tar, tgz, gzip
const ACCEPT_FILES = {
    'application/zip': 'zip',
    'application/x-tar': 'tar',
    'application/x-compressed': 'tgz',
    'application/x-gzip': 'gzip'
};
// 文件内必须包含的文件
const MUST_FILE = ['conf.json', 'README.md'];
// 文件大小限制 1M
const MAX_SIZE = 1 * 1024 * 1024;
/* POST upload */
router.post('/', upload.any(), function (req, res, next) {
    if (!req.files.length) {
        res.send(ERR_CODE['NO-FILE']);
        return;
    }
    let file = req.files[0];
    console.log(req.files[0]);// 文件信息
    // 文件类型校验
    if (!ACCEPT_FILES[file.mimetype]) {
        res.send(ERR_CODE['FILE-TYPE']);
        return;
    }
    // 文件大小校验
    if (file.size > MAX_SIZE) {
        res.send(ERR_CODE['FILE-LIMIT']);
        return;
    }
    // 文件必填字段校验
    compressing[ACCEPT_FILES[file.mimetype]].uncompress(file.path, COMPRESS_TMP_PATH)
        .then(() => {
            console.log('解压成功');
            // 必需文件校验
            let checkFile = MUST_FILE.map(file => {
                if (!fs.existsSync(`${COMPRESS_TMP_PATH}${file}`)) {
                    res.send({
                        err: ERR_CODE['FILE-NO-STANDARD'].err,
                        errmsg: `${file} not found`
                    });
                    return false;
                }
                return true;
            });
            if (checkFile.includes(false)) {
                clearDir(COMPRESS_TMP_PATH);
                clearDir(UPLOAD_TMP_PATH);
                return;
            }
            // 文件参数检验 todo
            fs.readFileAsync(`${COMPRESS_TMP_PATH}conf.json`, 'utf-8').then(data => {
                let content = JSON.parse(data);
                console.log('data====', content.title);
            });
            // 校验通过，清除临时解压文件，开始保存文件
            clearDir(COMPRESS_TMP_PATH);
            let originFileName = `${UPLOAD_PATH}${Date.now()}-${file.originalname}`;
            fs.readFileAsync(file.path).then(data => {
                fs.writeFileAsync(originFileName, data).then(data => {
                    res.send(ERR_CODE['SUCCESS']);
                    clearDir(UPLOAD_TMP_PATH);
                }).catch(e => {
                    console.log(e);
                })
            }).catch(e => {
                console.log(e);
            })
        })
        .catch(e => {
            console.log('解压失败===', e);
        });
});

// 清空文件夹
function clearDir(path) {
    fs.readdirAsync(path).then(files => {
        files.map(file => {
            fs.unlink(`${path}${file}`, (err) => {
                if (err) {
                    console.log('delete tmp file err===', err);
                } else {
                    console.log('delete tmp file ok');
                }
            });
        })
    }).catch(e => {
        console.log(e);
    })
}

module.exports = router;
