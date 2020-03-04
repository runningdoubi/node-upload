const express = require('express');
const router = express.Router();
const multer = require('multer');
const compressing = require('compressing');
const { fs } = require('../public/javascripts/promisify');

const ERR_CODE = require('../public/javascripts/errcode');

const {
    must_dirs: {
        upload: UPLOAD_PATH,
        compress_tmp: COMPRESS_TMP_PATH,
        upload_tmp: UPLOAD_TMP_PATH
    },
    accept_files: ACCEPT_FILES,
    must_file: MUST_FILE,
    max_size: MAX_SIZE
} = require('../conf/upload.conf');

const upload = multer({ dest: UPLOAD_TMP_PATH });

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
    // 解压文件
    compressing[ACCEPT_FILES[file.mimetype]].uncompress(file.path, COMPRESS_TMP_PATH)
        .then(() => {
            console.log('解压成功');
            // 必需文件校验
            let checkFile = MUST_FILE.map(file => {
                if (!fs.existsSync(`${COMPRESS_TMP_PATH}${file}`)) {
                    res.send(ERR_CODE['FILE-NO-STANDARD'](file));
                    return false;
                }
                return true;
            });
            if (checkFile.includes(false)) {
                clearAllTmpDir();
                return;
            }
            // 文件参数检验 todo
            let content = fs.readFileSync(`${COMPRESS_TMP_PATH}conf.json`, 'utf-8');
            let contentObj = JSON.parse(content);
            try {
                let checkResult = checkParams(contentObj);
                if (checkResult) {
                    res.send(checkResult);
                    clearAllTmpDir();
                    return;
                }
            } catch (e) {
                res.send(ERR_CODE['JSON-ILLEGAL']);
                clearAllTmpDir();
                return;
            }

            // 校验通过，开始保存文件，清除临时解压文件
            let dirName = `${parseInt(Date.now() / 1000)}-${contentObj.username}`;
            // 创建目录
            fs.mkdirSync(`${UPLOAD_PATH}${dirName}`, { recursive: true });
            // 拷贝文件
            MUST_FILE.map(file => {
                fs.copyFileSync(`${COMPRESS_TMP_PATH}${file}`, `${UPLOAD_PATH}${dirName}/${file}`);
            });
            clearAllTmpDir();
            res.send(ERR_CODE['SUCCESS']);
        })
        .catch(e => {
            console.log('解压失败===', e);
        });
});
// 清空所有临时文件
function clearAllTmpDir() {
    clearDir(COMPRESS_TMP_PATH);
    clearDir(UPLOAD_TMP_PATH);
}
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
// 校验conf.json中参数
function checkParams(contentObj) {
    if (!contentObj.title) {
        return ERR_CODE['JSON-PARAMS-ERR']('title');
    }
    if (!contentObj.desc) {
        return ERR_CODE['JSON-PARAMS-ERR']('desc');
    }
    if (!contentObj.type) {
        return ERR_CODE['JSON-PARAMS-ERR']('type');
    }
    if (!contentObj.username) {
        return ERR_CODE['JSON-PARAMS-ERR']('username');
    }
    if (!contentObj.link) {
        return ERR_CODE['JSON-PARAMS-ERR']('link');
    }
    if (!contentObj.createrHooks) {
        return ERR_CODE['JSON-PARAMS-ERR']('createrHooks');
    }
    return null;
}
module.exports = router;
