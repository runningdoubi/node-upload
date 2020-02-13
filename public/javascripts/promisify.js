/**
 * @file: promisify.js
 * @des: promise化异步api
 * @author: zhangjiaqi03
 * @date: 2020-02-13 12:46:24
 * @last modified by:   zhangjiaqi03
 * @last modified time: 2020-02-13 12:46:24
 */

var Promise = require('bluebird');

const fs = Promise.promisifyAll(require('fs'));

module.exports = {
    fs
}