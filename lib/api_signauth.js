const { postJSON, getJSON, deleteJSON, putJSON } = require('./util');

/**
 * 设置静默签署
接口地址 /v1/signAuth/{accountId}
请求方式 POST
接口描述 静默签署授权
 */

exports.SignAuth_Setting = async function (accountId, param) {
    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + 'v1/signAuth/' + accountId;
    var opts = postJSON(param, this.appid, accessToken)
    return this.request(url, opts);
};

/**
撤消静默签署
接口地址 /v1/signAuth/{accountId}
请求方式 DELETE
接口描述 取消静默签署授权
 */
exports.SignAuth_Cancel = async function (accountId) {
    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + 'v1/signAuth/' + accountId;
    var opts = deleteJSON(this.appid, accessToken)
    return this.request(url, opts);
};
