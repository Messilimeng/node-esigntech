const { postJSON, getJSON, deleteJSON, putJSON } = require('./util');

/**
 * @param http://open.esign.cn/docs/wk/%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3/%E7%AD%BE%E7%BD%B2%E6%9C%8D%E5%8A%A1API/%E7%AD%BE%E7%BD%B2%E6%B5%81%E7%A8%8B%E5%88%9B%E5%BB%BA.html
 * // 签署流程创建
 * // 接口地址 /v1/signflows
 * // 请求方式 POST
 * // 接口描述 创建签署流程
 */

exports.SignFlows_Create = async function (param) {

    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + `v1/signflows`;
    var opts = postJSON(param, this.appid, accessToken)
    return this.request(url, opts);
}

/**
 * // 签署流程查询
 * // 签署流程查询
 * // 接口地址 /v1/signflows/{flowId}
 * // 请求方式 GET
 * // 接口描述 查询签署流程的详细信息，包括流程配置、签署状态等。
 */
exports.SignFlows_Get = async function (flowId) {

    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + `v1/signflows/${flowId}`;
    var opts = getJSON(this.appid, accessToken)
    return this.request(url, opts);
}



// 签署流程开启
// 接口地址 /v1/signflows/{flowId}/start
// 请求方式 PUT
// 接口描述 开启签署流程，开启后流程文档不可再添加或修改文档，签署任务会自动按照设置开始流转。流程开启后，归档前，可随时追加签署区（指定签署人的签署信息）
exports.SignFlows_Start = async function (flowId,param) {

    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + `v1/signflows/${flowId}/start`;
    var opts = putJSON(param, this.appid, accessToken)
    return this.request(url, opts);
}


/**
 * // 签署流程撤销
// 签署流程撤销
// 接口地址 /v1/signflows/{flowId}/revoke
// 请求方式 PUT
// 接口描述 撤销签署流程，撤销后流程中止，所有签署无效。
 */
exports.SignFlows_Revoke = async function (flowId, param) {

    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + `v1/signflows/${flowId}/revoke`;
    var opts = putJSON(param, this.appid, accessToken)
    return this.request(url, opts);
}


/**
 * // 签署流程归档
// 签署流程归档
// 接口地址 /v1/signflows/{flowId}/archive
// 请求方式 PUT
// 接口描述 手动归档签署流程，归档后所有资源均不可修改。
// 归档前签署流程中的所有签署人必须都签署完成。如创建流程时设置了自动归档，则无需调用本接口，签署完成后系统会自动调用。
 */

exports.SignFlows_Archive = async function (flowId, param) {

    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + `v1/signflows/${flowId}/archive`;
    var opts = putJSON(param, this.appid, accessToken)
    return this.request(url, opts);
}

// 流程文档添加
// 流程文档添加
// 接口地址 /v1/signflows/{flowId}/documents
// 请求方式 POST
// 接口描述 向流程中添加待签署文档，文档必须先用文档管理接口创建，创建方式请参见文件管理接口文档。已经开启的流程不能再添加签署文档.

exports.SignFlows_CreateDocuments = async function (flowId, param) {

    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + `v1/signflows/${flowId}/documents`;
    var opts = postJSON(param, this.appid, accessToken)
    return this.request(url, opts);
}

// 流程文档删除
// 接口地址 /v1/signflows/{flowId}/documents
// 请求方式 DELETE
// 接口描述 删除流程中指定的文档，流程开启后不可删除。

exports.SignFlows_DeleteDocuments = async function (flowId,fileIds) {

    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + `v1/signflows/${flowId}/documents?fileIds=`+fileIds;
    var opts = deleteJSON(this.appid, accessToken)
    return this.request(url, opts);
}

// 流程文档下载
// 接口地址 /v1/signflows/{flowId}/documents
// 请求方式 GET
// 接口描述 流程归档后，查询和下载签署后的文件。

exports.SignFlows_GetDocuments = async function (flowId) {

    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + `v1/signflows/${flowId}/documents`;
    var opts = getJSON(this.appid, accessToken)
    return this.request(url, opts);
}

// 流程附件列表
// 接口地址 /v1/signflows/{flowId}/attachments
// 请求方式 GET
// 接口描述 查询流程关联的所有附件。

exports.SignFlows_GetAttachments = async function (flowId) {

    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + `v1/signflows/${flowId}/attachments`;
    var opts = getJSON(this.appid, accessToken)
    return this.request(url, opts);
}

// 流程附件添加
// 接口地址 /v1/signflows/{flowId}/attachments
// 请求方式 POST
// 接口描述 为流程添加附件, 附件必须先用文档管理接口创建，附件无需签署，只作为签署过程中的参考，比如录音、视频, 图片, 文档等。

exports.SignFlows_CreateAttachments = async function (flowId, param) {
    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + `v1/signflows/${flowId}/attachments`;
    var opts = postJSON(param, this.appid, accessToken)
    return this.request(url, opts);
}

// 流程附件删除
// 接口地址 /v1/signflows/{flowId}/attachments
// 请求方式 DELETE
// 接口描述 从流程中删除附件，流程开启前可以随意删除，流程开启后只能增加不能删除。

exports.SignFlows_DeteleAttachments = async function (flowId,fileIds) {
    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + `v1/signflows/${flowId}/attachments?fileIds=`+fileIds;
    var opts = deleteJSON(this.appid, accessToken)
    return this.request(url, opts);
}


// 查询签署区列表
// 接口地址 /v1/signflows/{flowId}/signfields
// 请求方式 GET
// 接口描述 查询流程签署区列表，可以查询指定指定id或者签署人所属的签署区

exports.SignFlows_GetSignfields = async function (flowId,accountId) {
    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + `v1/signflows/${flowId}/signfields?accountId=`+accountId;
    var opts = getJSON(this.appid, accessToken)
    return this.request(url, opts);
}

// 添加平台自动盖章签署区
// 接口地址 /v1/signflows/{flowId}/signfields/platformSign
// 请求方式 POST
// 接口描述 向指定流程中创建签署区，每个签署区视为一个任务，系统会自动按照流程流转。 签署区的添加必须在签署文档添加之后, 签署区信息内部包含签署文档信息（平台自动签无需指定签署人信息，默认签署人是对接的企业）。
// 签署区创建完成，流程开启后，系统将自动完成“对接平台自动盖章签署区”的盖章，对接平台可全程无感完成本次签署。

exports.SignFlows_CreateSignfieldsPlatformSign = async function (flowId, param) {
    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + `v1/signflows/${flowId}/signfields/platformSign`;
    var opts = postJSON(param, this.appid, accessToken)
    return this.request(url, opts);
}

// 添加签署方自动盖章签署区
// 接口地址 /v1/signflows/{flowId}/signfields/autoSign
// 请求方式 POST
// 接口描述 向指定流程中创建签署区，每个签署区视为一个任务，系统会自动按照流程流转。 
// 签署区的添加必须在签署文档添加之后, 签署区信息内部包含签署人、签署文档信息。 签署区创建完成，流程开启后，系统将自动完成“用户自动盖章签署区”的盖章。用户可全程无感完成本次签署。创建签署方自动盖章签署区前，需确定已完成账号静默签署授权 。
// 签署方自动盖章的合同不符合电子签名法中对可靠的要求，仅适用于对法律效力要求不高的场景，或由对接平台方自行校验真实身份和真实意愿。

exports.SignFlows_CreateSignfieldsAutoSign = async function (flowId, param) {

    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + `v1/signflows/${flowId}/signfields/autoSign`;
    var opts = postJSON(param, this.appid, accessToken)
    return this.request(url, opts);
}

// 添加手动盖章签署区
// 接口地址 /v1/signflows/{flowId}/signfields/handSign
// 请求方式 POST
// 接口描述 向指定流程中创建签署区，每个签署区视为一个任务，系统会自动按照流程流转。 签署区的添加必须在签署文档添加之后, 签署区信息内部包含签署文档信息.
// 签署区创建完成，流程开启后，通过获取签署地址接口，可获取用户手动签署链接，通过此链接可打开文件签署页面，进行人工确认签署。

exports.SignFlows_CreateSignfieldsHandSign = async function (flowId, param) {

    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + `v1/signflows/${flowId}/signfields/handSign`;
    var opts = postJSON(param, this.appid, accessToken)
    return this.request(url, opts);
}

// 删除签署区
// 接口地址 /v1/signflows/{flowId}/signfields
// 请求方式 DELETE
// 接口描述 删除指定id的签署区，只能删除未签署状态的签署区

exports.SignFlows_DeleteSignfields = async function (flowId) {

    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + `v1/signflows/${flowId}/signfields`;
    var opts = deleteJSON(this.appid, accessToken)
    return this.request(url, opts);
}

/**
 * // 流程签署人列表
// 接口地址 /v1/signflows/{flowId}/signers
// 请求方式 GET
// 接口描述 查询流程所有签署人列表。
 */

exports.SignFlows_GetSigners = async function (flowId) {
    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + `v1/signflows/${flowId}/signers`;
    var opts = getJSON(this.appid, accessToken)
    return this.request(url, opts);
}
/**
 * 
// 流程签署人催签
// 接口地址 /v1/signflows/{flowId}/signers/rushsign
// 请求方式 PUT
// 接口描述 向当前轮到签署但还未签署的签署人发送催签提醒, 支持指定签署人发送催签提醒。
//  被催签人accoutId是非必填的，该参数为空时，系统将向所有待签的签署人发送签署通知。
 */

exports.SignFlows_SignersRushsign = async function (flowId, param) {
    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + `v1/signflows/${flowId}/signers/rushsign`;
    var opts = putJSON(param, this.appid, accessToken)
    return this.request(url, opts);
}

/**
 * // 获取签署地址
// 接口地址 /v1/signflows/{flowId}/executeUrl
// 请求方式 GET
// 接口描述 流程开启后，获取指定签署人的签署链接地址，如仅传入签署人账号id，则获取的签署任务链接仅包含本人的签署任务；
// 如同时签署人账号id+机构id，则获取的签署任务链接包含企业与个人的签署任务
 */

exports.SignFlows_ExecuteUrl = async function (flowId,accountId,organizeId="") {
    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + `v1/signflows/${flowId}/executeUrl?accountId=${accountId}`+ (organizeId==""?"":("&organizeId="+organizeId));
    var opts = getJSON(this.appid, accessToken)
    return this.request(url, opts);
}