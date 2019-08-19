

const { postJSON, getJSON} = require('./util');
/**
 * 
 * // 通过上传方式创建文件
* // 接口地址 /v1/files/getUploadUrl
* // 请求方式 POST
* // 接口描述
* // 1.e签宝采用文件直传的方式完成用户文件的上传。对接方通过该接口获取文件上传的授权地址，上传方法请参考：文件流上传方法
* // 2.上传签署流程中需要的文件，包括签署文件和附件，目前签署文件仅支持pdf，附件支持pdf、png、jpg、jpeg
 */

exports.Files_getUploadUrl = async function (param) {

    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + 'v1/files/getUploadUrl';
    var opts = postJSON(param, this.appid, accessToken)
    return this.request(url, opts);
}


/**
 * 
// 通过模板创建文件
// 接口地址 /v1/files/createByTemplate
// 请求方式 POST
// 接口描述 基于文件模板生成待签文件用于后续文件，该文件可用用于签署，也可作为附件。通过模版创建文件前，需完成模版创建及组件添加。文件模板只能使用通过接口进行模板管理。
 */
exports.Files_createByTemplate = async function (param) {
    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + 'v1/files/createByTemplate';
    var opts = postJSON(param, this.appid, accessToken)
    return this.request(url, opts);
}

/**
 * // 文件添加数字水印
// 接口地址 /v1/files/batchAddWatermark
// 请求方式 POST
// 接口描述 批量文件添加数字水印，一份文件一次仅可添加一种样式的数字水印，建议文件中不要存在大量图片，因数字水印图片默认放在文件图片下方，使用数字水印APP扫描时，图片区域会看不到水印信息。
// （如数字水印图片放在图片上方，则文件打印后，图片上方会显示出数字水印图片，起不到防伪作用，因此默认放在文件图片下方），打印时必须彩打，对硬件的要求：彩色打印机精度越高越好，推荐最高分辨率1200*1200dpi以上；
//纸张质量越好，效果越好；彩色打印机墨盒尽可能保证原墨；打印时，选项中必须勾选”打印背景和图像”。
 */
exports.Files_batchAddWatermark = async function (param) {
    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + 'v1/files/batchAddWatermark';
    var opts = postJSON(param, this.appid, accessToken)
    return this.request(url, opts);
}

/**
 * 
 * // 获取文件下载地址
// 接口地址 /v1/files/{fileId}
// 请求方式 GET
// 接口描述 获取文件信息
 */

exports.Files_getAddress = async function (fileId) {

    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + 'v1/files/' + fileId;
    var opts = getJSON(this.appid, accessToken)
    return this.request(url, opts);
}

/**
 * 文件流上传方法
文件流上传方法
接口地址： 获取文件直传地址接口获取到的uploadUrl
接口描述：
使用获取文件直传地址接口获取到的uploadUrl进行文件流上传
上传使用HTTP PUT方式上传
上传时需要在HTTP Header中增加字段Content-MD5和Content-Type，字段值与获取文件直传地址接口中contentMd5和contentType值保持一致，否则会出现错误码为403的错误。
请求参数：
1.Content-MD5：base64编码的文件MD5 2.Content-Type：文件MIME类型 3.HTTP BODY：待上传文件的二进制字节流
 */
exports.Files_Upload = async function (param) {

    const { accessToken } = await this.ensureAccessToken();
    var url = param.uploadUrl;
    var opts = {
        method: 'PUT',
        data: param.buffer,
        headers: {
            'Content-Type': param.contentType,
            'Content-MD5': param.contentMd5,
            'X-Tsign-Open-App-Id': this.appid,
            'X-Tsign-Open-Token': accessToken
        }
    };
    return this.request(url, opts);
}

/**
 * 通过模板创建文件
接口地址 /v1/files/createByTemplate
请求方式 POST
接口描述 基于文件模板生成待签文件用于后续文件，该文件可用用于签署，也可作为附件。通过模版创建文件前，需完成模版创建及组件添加。文件模板只能使用通过接口进行模板管理
 */
exports.Fils_CreateByTemplate = async function (param) {
    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + 'v1/files/createByTemplate';
    var opts = postJSON(param, this.appid, accessToken)
    return this.request(url, opts);
}

/**
 * 文件添加数字水印
接口地址 /v1/files/batchAddWatermark
请求方式 POST
接口描述 批量文件添加数字水印，一份文件一次仅可添加一种样式的数字水印，建议文件中不要存在大量图片，因数字水印图片默认放在文件图片下方，使用数字水印APP扫描时，图片区域会看不到水印信息。
 （如数字水印图片放在图片上方，则文件打印后，图片上方会显示出数字水印图片，起不到防伪作用，因此默认放在文件图片下方），打印时必须彩打，
 对硬件的要求：彩色打印机精度越高越好，推荐最高分辨率1200*1200dpi以上；纸张质量越好，效果越好；彩色打印机墨盒尽可能保证原墨；打印时，选项中必须勾选”打印背景和图像”。
 */
exports.Fils_BatchAddWatermark = async function (param) {
    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + 'v1/files/batchAddWatermark';
    var opts = postJSON(param, this.appid, accessToken)
    return this.request(url, opts);
}