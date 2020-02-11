const fs = require('fs');

const express = require('express');
const router = express.Router();
const multer = require('multer');

const UPLOAD_TMP_PATH = 'upload_tmp/';
const upload = multer({ dest: UPLOAD_TMP_PATH });

/* POST upload */
router.post('/', upload.any(), function (req, res, next) {
    if (!req.files.length) {
        res.end(JSON.stringify({
            message: 'no File'
        }));
        return;
    }
    console.log(req.files[0]);// 文件信息
    let originFileName = `./upload/${Date.now()}-${req.files[0].originalname}`;
    fs.readFile(req.files[0].path, function (err, data) {
        fs.writeFile(originFileName, data, function (err) {
            if (err) {
                console.log(err);
            } else {
                fs.readdirSync(UPLOAD_TMP_PATH).map((file) => {
                    fs.unlink(`${UPLOAD_TMP_PATH}/${file}`, (err) => {
                        if (err) {
                            console.log('delete tmp file err===', err);
                        } else {
                            console.log('delete tmp file ok');
                        }
                    });
                });
                res.end(JSON.stringify({
                    message: 'File uploaded successfully',
                    filename: req.files[0].originalname
                }));
            }
        });
    });
});

module.exports = router;
