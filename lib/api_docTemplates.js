
const { postJSON, getJSON, deleteJSON, putJSON } = require('./util');
/**
 * 通过上传方式创建模板
接口地址：/v1/docTemplates/createByUploadUrl
接口描述：通过文件直传地址创建模板，创建模板后上传文件，上传方法请参考：文件流上传方法
请求方式: POST
请求参数:
参数名	参数类型	必选	类型	说明
contentMd5	body	是	string	模板文件md5值
contentType	body	是	string	目标文件的MIME类型
fileName	body	是	string	文件名称，必须带扩展名如:.pdf,.doc,.docx
convert2Pdf	body	是	boolean	是否需要转成pdf，如果模板文件为.doc/.docx 传true，为pdf传false
请求示例：

POST https://openapi.esign.cn/v1/docTemplates/createByUploadUrl
{
    "contentMd5":"cTNpB5QZ8fAP9jScrV8teA==",
    "contentType":"application/octet-stream",
    "fileName":"测试模板.docx",
    "convert2Pdf":true
 }
响应参数：

参数名	类型	说明
templateId	string	模板id
uploadUrl	string	文件直传地址，需要用此上传地址使用put方式上传文件，只有文件上传后模板才可用
响应示例：

 {
    "code": 0,
    "data": {
        "templateId": "adfadfadfweweafadfadfa",
        "uploadUrl": "https://esignoss.oss-cn-hangzhou.aliyuncs.com/1111563786/5d45dc91-470b-41dd-8e6f-9663ee9641db/%E6%89%B9%E9%87%8F%E5%AF%BC%E5%85%A5-%E9%94%99%E8%AF%AF%E6%95%B0%E6%8D%AE.xls?Expires=1559294245&OSSAccessKeyId=LTAIdvHfiVrzDKbE&Signature=hBEuUHAC7TVxzRIr/BihG1m3QEQ%3D"
    },
    "message": "成功"
}
 */

 exports.DocTemplates_createByUploadUrl = async function(param){

    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + 'v1/docTemplates/createByUploadUrl';
    var opts = postJSON(param, this.appid, accessToken)
    return this.request(url, opts);
 }
 /**
  * 添加输入项组件
    接口描述：保存文件模板输入项组件，添加组件前需先上传文件
    接口地址：/v1/docTemplates/{templateId}/components
    请求方式: POST
  */

 exports.DocTemplates_CreateComponents = async function(templateId,param){

    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + 'v1/docTemplates/'+templateId+'/components';
    var opts = postJSON(param, this.appid, accessToken)
    return this.request(url, opts);
 }

 /**
  * 
  * 删除输入项组件
  * 接口描述：删除文件模板输入项组件
  * 接口地址：/v1/docTemplates/{templateId}/components/{ids}
  * 请求方式: DELETE
  */

 exports.DocTemplates_DeleteComponents = async function(templateId,ids){

    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + 'v1/docTemplates/'+templateId+'/components/'+ids;
    var opts = deleteJSON(this.appid, accessToken)
    return this.request(url, opts);
 }

 /**
  * 
  * 查询模板详情
  * 简要描述：查询模板详情，包括文件模板基本信息和输入项组件信息
  *  接口地址：/v1/docTemplates/{templateId}
  *  请求方式: GET
  */
 exports.DocTemplates_GetComponents = async function(templateId){

    const { accessToken } = await this.ensureAccessToken();
    var url = this.prefix + 'v1/docTemplates/'+templateId;
    var opts = getJSON(this.appid, accessToken)
    return this.request(url, opts);
 }
 