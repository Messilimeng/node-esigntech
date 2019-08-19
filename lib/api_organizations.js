
const { postJSON, getJSON, deleteJSON, putJSON } = require('./util');
/**
 *接口地址： /v1/organizations/createByThirdPartyUserId
 *请求方式： POST
 *接口描述：
 *对接方调用本接口在e签宝平台中创建机构账号，后续有关该机构的所有操作都需使用该机构的accountId。如提供机构证件信息，则将根据提供的机构证件信息申请数字证书。
 *创建机构账号前需要先创建一个个人账号并通过本接口传给服务器，该个人账号将作为该机构签署的经办人，代表企业完成实名认证和意愿认证，并完成签署操作。
 *请求参数
 * 
 */
exports.Organizations_Create = async function (param) {
    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + 'v1/organizations/createByThirdPartyUserId';
    var opts = postJSON(param, this.appid, accessToken)
    console.log(url)
    console.log(opts)
    return this.request(url, opts);
};

/**
（1）按照账号ID修改
接口地址： /v1/organizations/{orgId}
请求方式： PUT
接口描述： 对接方调用本接口在e签宝平台中使用账号id更新机构账号，如变更名称后，则系统根据变更后的信息自动申请新数字证书， 如账号已实名则会变更为未实名状态
 */
exports.Organizations_Modfiy = async function (orgId, param) {
    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + 'v1/organizations/' + orgId;
    var opts = putJSON(param, this.appid, accessToken)
    return this.request(url, opts);
};

/**
 * 
（1）按照账号ID查询
接口地址： /v1/organizations/{orgId}
请求方式： GET
接口描述： 使用创建账号返回的账号id查询机构账号。
 */
exports.Organizations_Get = async function (orgId) {
    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + 'v1/organizations/' + orgId;
    var opts = getJSON(this.appid, accessToken)
    return this.request(url, opts);
};

/***
 * 
（1）按照账号ID注销
接口地址： /v1/organizations/{orgId}
请求方式： DELETE
接口描述： 通过账号id注销e签宝平台的机构账号，注销后的账号不能再发起签署，已发起的流程也无法继续签署
*/
exports.Organizations_DeleteByOrgId = async function (orgId) {
    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + 'v1/organizations/' + orgId;
    var opts = deleteJSON(this.appid, accessToken)
    return this.request(url, opts);
};

/**
 * 创建机构模板印章
 * 接口地址 /v1/organizations/{orgId}/seals/officialtemplate
 * 请求方式 POST
 * 接口描述 通过模版参数，创建机构印章
 */

exports.Organizations_CreateOfficialTemplate = async function (orgId, param) {

    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + 'v1/organizations/' + orgId + '/seals/officialtemplate';
    var opts = postJSON(param, this.appid, accessToken)
    return this.request(url, opts);
}

/**
 * 查询机构印章
 * 接口地址 /v1/organizations/{orgId}/seals
 * 请求方式 GET
 * 接口描述 查询机构所有印章
 */

exports.Organizations_SealsGet = async function (orgId, offset, size) {

    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + 'v1/organizations/' + orgId + '/seals?offset=' + offset + '&size=' + size;
    var opts = getJSON(this.appid, accessToken)
    return this.request(url, opts);
}


/**
 * 删除机构印章
 * 删除机构印章
 * 接口地址 /v1/organizations/{orgId}/seals/{sealId}
 * 请求方式 DELETE
 * 接口描述 删除指定机构印章，被标记为默认章的印章不允许删除
 */

exports.Organizations_SealsDeleteById = async function (orgId, sealId) {
    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + `v1/organizations/${orgId}/seals/${sealId}`;
    var opts = deleteJSON(this.appid, accessToken)
    return this.request(url, opts);
};