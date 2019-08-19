'use strict';
const crypto = require('crypto')
const fs = require('fs')
/*!
 * 对提交参数一层封装，当POST JSON，并且结果也为JSON时使用 */
exports.postJSON = function (data, appid, token) {
  if (!appid || !token) {
    return {
      dataType: 'json',
      method: 'POST',
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    };
  }
  return {
    dataType: 'json',
    method: 'POST',
    data: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Tsign-Open-App-Id': appid,
      'X-Tsign-Open-Token': token
    }
  };
};

exports.getJSON = function (appid, token) {
  return {
    dataType: 'json',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Tsign-Open-App-Id': appid,
      'X-Tsign-Open-Token': token
    }
  };
};

exports.deleteJSON = function (appid, token) {
  return {
    dataType: 'json',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Tsign-Open-App-Id': appid,
      'X-Tsign-Open-Token': token
    }
  };
};


exports.putJSON = function (param, appid, token) {
  return {
    dataType: 'json',
    method: 'PUT',
    data: JSON.stringify(param),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-Tsign-Open-App-Id': appid,
      'X-Tsign-Open-Token': token
    }
  };
};

exports.readFileMd5 = (url) => {
  return new Promise((reslove) => {
    let md5sum = crypto.createHash('md5');
    let stream = fs.createReadStream(url);
    stream.on('data', function (chunk) {
      md5sum.update(chunk);
    });
    stream.on('end', function () {
      let fileMd5 = md5sum.digest('base64');
      reslove(fileMd5);
    })
  })
}

exports.readFileInfo = (url) => {
  return new Promise((reslove) => {
    fs.stat(url, function (err, stats) {
      if (err) {
        throw err;
      }
      reslove(stats)
    });
  })
}

