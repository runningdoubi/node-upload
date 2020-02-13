const express = require('express');
const router = express.Router();
const fs = require('fs');

const UPLOAD_PATH = 'upload/';
/* GET home page. */
router.get('/', function(req, res, next) {
  let files = fs.readdirSync(UPLOAD_PATH);
  res.render('index', { files });
});

module.exports = router;
