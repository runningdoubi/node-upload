const express = require('express');
const router = express.Router();
const fs = require('fs');

const {
  must_dirs: {
      upload: UPLOAD_PATH,
  }
} = require('../conf/upload.conf');

/* GET home page. */
router.get('/', function(req, res, next) {
  let files = fs.readdirSync(UPLOAD_PATH);
  res.render('index', { files });
});

module.exports = router;
