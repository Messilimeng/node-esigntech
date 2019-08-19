
const { postJSON, getJSON, deleteJSON, putJSON } = require('./util');
/**
 * 接口地址： /v1/accounts/createByThirdPartyUserId
 * 请求方式： POST
 * 接口描述：对接方调用本接口在e签宝平台中创建个人账号，后续有关该用户的所有操作都需使用该用户的accountId。如提供用户证件信息，则将根据提供的用户证件信息申请数字证书。
 * 请求参数：
 * 
 *  http://open.esign.cn/docs/wk/%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3/%E7%AD%BE%E7%BD%B2%E6%96%B9%E4%BF%A1%E6%81%AFAPI/%E4%B8%AA%E4%BA%BA%E8%B4%A6%E5%8F%B7%E5%88%9B%E5%BB%BA.html
 */
exports.Account_Create = async function (param) {
    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + 'v1/accounts/createByThirdPartyUserId';
    var opts = postJSON(param, this.appid, accessToken)
    return this.request(url, opts);
};

/**
 * （1）按照账号ID修改
 * 接口地址： /v1/accounts/{accountId}
 * 请求方式： PUT
 * 接口描述： 对接方调用本接口在e签宝平台中使用账号id更新个人账号，如变更姓名，则系统根据变更后的身份信息自动申请新数字证书， 如账号已实名则会变更为未实名状态。
 */
exports.Account_Modfiy = async function (accountId, param) {
    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + 'v1/accounts/' + accountId;
    var opts = putJSON(param, this.appid, accessToken)
    return this.request(url, opts);
};

/**
 * 
 *（1）按照账号ID查询
 * 接口地址： /v1/accounts/{accountId}
 * 请求方式： GET
 * 接口描述： 使用创建账号返回的账号id查询用户的账号。
 */
exports.Account_Get = async function (accountId) {
    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + 'v1/accounts/' + accountId;
    var opts = getJSON(this.appid, accessToken)
    return this.request(url, opts);
};

/***
 * 
* （1）按照账号ID注销
* 接口地址： /v1/accounts/{accountId}
* 请求方式： DELETE
* 接口描述：
* 通过账号id注销e签宝平台的个人账号
* 注销后的账号不能再发起签署，已发起的流程也无法继续签署
*/
exports.Account_DeleteByThirdId = async function (ThirdId) {
    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + 'v1/accounts/deleteByThirdId?thirdPartyUserId=' + ThirdId;
    var opts = deleteJSON(this.appid, accessToken)
    return this.request(url, opts);
};

/**
 * 创建个人模板印章
 *  接口地址 /v1/accounts/{accountId}/seals/personaltemplate
 *  请求方式 POST
 *  接口描述 通过模版参数，创建个人印章
 */

exports.Account_SealsCreatePersonalTemplate = async function (accountId, param) {

    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + 'v1/accounts/' + accountId + '/seals/personaltemplate';
    var opts = postJSON(param, this.appid, accessToken)
    return this.request(url, opts);
}

/**
 * 查询个人印章
 *接口地址 /v1/accounts/{accountId}/seals
 *请求方式 GET
 *接口描述 查询个人所有印章
 */

exports.Account_SealsGet = async function (accountId, offset, size) {

    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + 'v1/accounts/' + accountId + '/seals?offset=' + offset + '&size=' + size;
    var opts = getJSON(this.appid, accessToken)
    return this.request(url, opts);
}

/**
 * 删除个人印章
 *  接口地址 /v1/accounts/{accountId}/seals/{sealId}
 *  请求方式 DELETE
 *  接口描述 删除指定个人印章，被标记为默认章的印章不允许删除
 */

exports.Account_SealsDeleteById = async function (accountId,sealId) {
    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + `v1/accounts/${accountId}/seals/${sealId}`;
    var opts = deleteJSON(this.appid, accessToken)
    return this.request(url, opts);
};


/**
 * 创建个人/机构图片印章
 * 创建个人/机构图片印章
 * 接口地址 /v1/accounts/{accountId}/seals/image
 * 请求方式 POST
 * 接口描述 创建个人/机构图片印章
 */
exports.Account_SealsCreateImage = async function (accountId, param) {
    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + 'v1/accounts/' + accountId + '/seals/image';
    var opts = postJSON(param, this.appid, accessToken)
    console.log(opts)
    console.log(url)
    return this.request(url, opts);
}


