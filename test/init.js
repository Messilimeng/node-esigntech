const api = require('../index.js')
const fs = require('fs')
let eSignApi = new api('4438770539', 'c0a5d6f2c16929b062dfc9a712a5e63a', async function () {
    return new Promise(function (resovle, reject) {
        fs.readFile('../access_token.txt', 'utf8', function (err, txt) {
            if (err) { return reject(err); }
            resovle(JSON.parse(txt));
        });
    })
}, async function (token) {
    return new Promise(function (resovle, reject) {
        fs.writeFile('../access_token.txt', JSON.stringify(token), function (err) {
            if (err) reject(err)
            resovle()
        });
    })

}, true)

exports.eSignApi = eSignApi