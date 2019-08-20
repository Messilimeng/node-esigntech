
 
[e签宝是专业的全生态电子签名服务商。基于实名身份，为用户提供在线电子签章／签名服务的平台，并且为企业用户提供电子签名、电子合同管理、数据存证和法律维权等服务。](https://www.esign.cn)

## Installation

```bash
npm install esigntech --save
```
## Usage

###  获取access_token
#### 请求access_token时需携带appid和app_secrect，示例： 代码示例:
#### 支持 redis 存储 token
#### 测试环境时候使用 boole isdebug  (true /false )  测试是为true 正式环境用false
#### development  https://smlopenapi.esign.cn/  
#### product https://openapi.esign.cn/
```js

const fs = require('fs')
let api =  require('esigntech')
let eSignApi = new api('appid', 'app_secrect', async function () {
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

}, isdebug)
```

## 4.1. 个人账号

### 个人账号创建

Account_Create
```js
let data = {
    "email": "xxxx@qq.com",
    "idNumber": "111130199009161634",
    "idType": "CRED_PSN_CH_IDCARD",
    "mobile": "18011111111",
    "name": "王小丫章",
    "thirdPartyUserId": thirdPartyUserId
}
let rest = await eSignApi.Account_Create(data)
```

### 个人账号修改
Account_Modfiy
```js
let data = {
    "email": "5364030004@qq.com",
    "idNumber": "111130199009161634",
    "idType": "CRED_PSN_CH_IDCARD",
    "mobile": "18011111111",
    "name": "messi",
    "thirdPartyUserId": thirdPartyUserId
}
let rest = await eSignApi.Account_Modfiy(accountId,data)
```
### 查询个人账号

Account_Get
```js
let rest = await eSignApi.Account_Get(accountId)
```

### 注销个人账号
Account_DeleteByThirdId
```js
let rest = await eSignApi.Account_DeleteByThirdId(ThirdId)
```

## 4.2. 机构账号

### 机构账号创建
Organizations_Create
```js
let data = {
    "creator": "ca49e5963314418796fb682473d79919",
    "idNumber": "32083019900916xxxx",
    "idType": "CRED_ORG_USCC",
    "name": "colsoft1212",
    "thirdPartyUserId": stringRandom()
}
let rest = await eSignApi.Organizations_Create(data)
```

###  机构账号修改
Organizations_Modfiy
```js
var data = {
    "idNumber": "32083019900916xxxx",
    "idType": "CRED_ORG_USCC",
    "name": "esign"
}
let rest = await eSignApi.Organizations_Modfiy(orgId, data)
```

### 查询机构账号
Organizations_Get
```js
let rest = await eSignApi.Organizations_Get(orgId)
```

### 注销机构账号
Organizations_DeleteByOrgId
```js
let rest = await eSignApi.Organizations_DeleteByOrgId(orgId)
```

## 4.3. 签署授权（账号静默签署权限管理）

### 设置静默签署

SignAuth_Setting
```js
let accountId="969c282a943948afa199a75bc6c0c84b";
let data = {
    "deadline": "2050-04-01 12:00:00"
}
let rest = await eSignApi.SignAuth_Setting(accountId,data)
```

### 撤消静默签署
SignAuth_Cancel
```js
let accountId="969c282a943948afa199a75bc6c0c84b";
let rest = await eSignApi.SignAuth_Cancel(accountId)
```

## 5.1. 文件管理

### 通过上传方式创建文件

Files_getUploadUrl
```js
let fileurl = 'thirdpartdoc.pdf'
let indf = await eSignApi.readFileInfo(fileurl)
let contentMd5 = await eSignApi.readFileMd5(fileurl)
let data = {
    "contentMd5": contentMd5,
    "contentType": "application/octet-stream",
    "convert2Pdf": false,
    "fileName": "thirdpartdoc.pdf",
    "fileSize": indf.size
}
let rest = await eSignApi.Files_getUploadUrl(data)
fileid = rest.data.fileId
uploadUrl = rest.data.uploadUrl
```

### 文件流上传方法
Files_Upload
```js
let fileurl = 'thirdpartdoc.pdf'
var data = {
    contentType: "application/octet-stream",
    uploadUrl: uploadUrl,
    contentMd5: contentMd5,
    buffer: fs.createReadStream(fileurl)
}
let rest = await eSignApi.Files_Upload(data)
```

### 通过模板创建文件
Fils_CreateByTemplate
```js
let data={
    "name":"模板文件ten",
    "simpleFormFields":{
        "甲方:":"测试甲方",
        "乙方:":"测试乙方"
    },
    "templateId":"b470d1753cf94f57bb253655c4fc2f7c"
}
let rest = await eSignApi.Fils_CreateByTemplate(data)
```
### 文件添加数字水印
Fils_BatchAddWatermark
```js
var param = {
"files": [
    {
        "fileId": fileid,
        "watermarkInfo": {
            "contentType": 3,
            "content": "水印文字",
            "fontSize": 10,
            "fontName": "simsun",
            "vmModel": 1,
            "lineWidths": 3,
            "alpha": 100,
            "strength": 250,
            "imageHeight": 400,
            "imageWidth": 400,
            "scaling": 100,
            "rotationAngle": 0
        },
        "posBean": {
            "posPage": "1-10,20",
            "posX": 11.5,
            "posY": 200
        }
    }
],
"notifyUrl": "",
"thirdOrderNo": ""
}
let rest = await eSignApi.Fils_BatchAddWatermark(param)
```
### 获取文件下载地址
Files_getAddress
```js
let rest = await eSignApi.Files_getAddress(fileid)
```

## 5.2. 模板管理

### 通过上传方式创建模板
DocTemplates_createByUploadUrl
```js
let fileurl = '6666.pdf'
let contentMd5 = await eSignApi.readFileMd5(fileurl)
let data = {
    "contentMd5": contentMd5,
    "contentType": "application/octet-stream",
    "convert2Pdf": true,
    "fileName": "6666.pdf",
}
let rest = await eSignApi.DocTemplates_createByUploadUrl(data)
templateId = rest.data.templateId
uploadUrl = rest.data.uploadUrl
```

### 添加输入项组件
DocTemplates_CreateComponents
```js
let templateId =  '7bd12b7cb64f441ca5d71bc614ec899c'
var data={
    "structComponents":[
        {
            "id":"",
            "key":"key0021",
            "type":1,
            "context":{
                "label":"身份证号码",
                "limit":"yyyy-MM-dd",
                "required":true,
                "style":{
                    "font":1,
                    "fontSize":11,
                    "textColor":"#000000",
                    "width":11.11,
                    "height":11.11
                },
                "pos":{
                    "x":11.11,
                    "y":11.11,
                    "page":1
                }
            }
        }
    ]
}
let rest = await eSignApi.DocTemplates_CreateComponents(templateId,data)
ids = rest.data.toString()
```
### 删除输入项组件
DocTemplates_DeleteComponents
```js
let rest = await eSignApi.DocTemplates_DeleteComponents(templateId,ids)
```

### 查询模板详情
DocTemplates_GetComponents
```js
let rest = await eSignApi.DocTemplates_GetComponents(templateId)
```

## 5.3 文件流上传方法
```js
let fileurl = 'thirdpartdoc.pdf'
var data = {
    contentType: "application/octet-stream",
    uploadUrl: uploadUrl,
    contentMd5: contentMd5,
    buffer: fs.createReadStream(fileurl)
}
let rest = await eSignApi.Files_Upload(data)
```

## 6.1. 印章创建

### 创建个人模板印章

Account_SealsCreatePersonalTemplate
```js
var data ={
    "alias": "红色四方形印章",
    "color": "RED",
    "height": 100,
    "type": "SQUARE",
    "width": 100
}
let rest = await eSignApi.Account_SealsCreatePersonalTemplate(accountId,data)
sealId = rest.data.sealId
fileKey = rest.data.fileKey
```

### 创建机构模板印章
Organizations_CreateOfficialTemplate
```js
var data = {
    "alias": "企业星型印章",
    "central": "STAR",
    "color": "RED",
    "height": 100,
    "width": 50,
    "htext": "签宝",
    "qtext": "杭州天谷信息科技有限公司",
    "type": "TEMPLATE_ROUND"
}
let rest = await eSignApi.Organizations_CreateOfficialTemplate(orgId,data)
sealId = rest.data.sealId
```
### 创建个人/机构图片印章

Account_SealsGet
```js
let rest = await eSignApi.Account_SealsGet(accountId OR orgId,1,10)
```

## 6.2. 查询印章列表
### 查询个人印章
Account_SealsGet
```js
let rest = await eSignApi.Account_SealsGet(accountId,1,10)
```

### 查询机构印章
Organizations_SealsGet
```js
let rest = await eSignApi.Organizations_SealsGet(orgId,1,10)
```
## 6.3. 删除印章

### 删除个人印章
Account_SealsDeleteById
```js
let rest = await eSignApi.Account_SealsDeleteById(accountId,sealId)
```

### 删除机构印章
Organizations_SealsDeleteById
```js
let rest = await eSignApi.Organizations_SealsDeleteById(orgId,sealId)
```

## 7.1. 签署流程

### 签署流程创建
SignFlows_Create
```js
var data = {
    "autoArchive": false,
    "businessScene": "合同名称",
    "configInfo": {
        "noticeDeveloperUrl": "http://127.0.0.1:9110/notice",
        "noticeType": "1,2",
        "redirectUrl": "http://127.0.0.1:8110/h5/forword",
        "signPlatform": "1"
    },
    "contractRemind": 360,
    "contractValidity": 1592386042000,
    "signValidity": 1592386042000,
    "initiatorAccountId":accountId,
    "initiatorAuthorizedAccountId": accountId
}
let rest = await eSignApi.SignFlows_Create(data)
flowId = rest.data.flowId
```

### 签署流程查询
SignFlows_Get
```js
let rest = await eSignApi.SignFlows_Get(flowId)
```

### 签署流程开启
SignFlows_Start
```js
let rest = await eSignApi.SignFlows_Start(flowId, {})
```

### 签署流程撤销
```js
var data = {
    "revokeReason": "合同有误"
}
let rest = await eSignApi.SignFlows_Revoke(flowId, data)
```
### 签署流程归档
SignFlows_Archive
```js
let rest = await eSignApi.SignFlows_Archive(flowId, {})
```

## 7.2. 流程文档

### 流程文档添加
SignFlows_CreateDocuments
```js
var data = {
    "docs": [
        {
            "encryption": 0,
            "fileId": fileid,
            "fileName": "第一份合同.pdf",
            "filePassword": ""
        }
    ]
}
let rest = await eSignApi.SignFlows_CreateDocuments(flowId, data)
```
### 流程文档删除
```js
let rest = await eSignApi.SignFlows_DeleteDocuments(flowId, fileIds)
```

### 流程文档下载
SignFlows_GetDocuments
```js
let rest = await eSignApi.SignFlows_GetDocuments(flowId)
```
## 7.3. 流程附件
### 流程附件列表
SignFlows_GetAttachments
```js
let rest = await eSignApi.SignFlows_GetAttachments(flowId)
```
### 流程附件添加
SignFlows_CreateAttachments
```js
var data = {
    "attachments": [
        {
            "attachmentName": "第一份附件.pdf",
            "fileId": fileid
        }
    ]
}

let rest = await eSignApi.SignFlows_CreateAttachments(flowId, data)
```
### 流程附件删除
SignFlows_DeteleAttachments
```js
let rest = await eSignApi.SignFlows_DeteleAttachments(flowId, fileIds)
```
## 7.4. 流程签署区


### 查询签署区列表
SignFlows_GetSignfields
```js
let rest = await eSignApi.SignFlows_GetSignfields(flowId, accountId)
```

### 添加平台自动盖章签署区
```js
SignFlows_CreateSignfieldsPlatformSign
var data = {
    "signfields": [
        {
            "fileId": fileid,
            "order": 1,
            "posBean": {
                "posPage": "1",
                "posX": 158.72531,
                "posY": 431.05658
            },
            "sealId":sealId,
            "signType": 1
        }
    ]
}
let rest = await eSignApi.SignFlows_CreateSignfieldsPlatformSign(flowId, data)
```

### 添加签署方自动盖章签署区
SignFlows_CreateSignfieldsAutoSign
```js
var data = {
    "signfields": [
        {
            "fileId": fileid,
            "authorizedAccountId": accountId,
            "order": 1,
            "posBean": {
                "posPage": "1",
                "posX": 158.72531,
                "posY": 431.05658
            },
            "sealId": sealId,
            "signType": 1
        }
    ]
}
let rest = await eSignApi.SignFlows_CreateSignfieldsAutoSign(flowId, data)
```

### 添加手动盖章签署区
SignFlows_CreateSignfieldsHandSign
```js
var data ={
    "signfields":[
        {
            "signerAccountId":accountId,
            "authorizedAccountId":accountId,
            "actorIndentityType":2,
            "fileId":fileid,
            "order":1,
            "assignedPosbean":true,
            "posBean":{
                "posPage":"1",
                "posX":158.72531,
                "posY":431.05658
            },
            "sealType":"0",
            "sealId":"0123",
            "signType":1
        }
    ]
}
let rest = await eSignApi.SignFlows_CreateSignfieldsHandSign(flowId, data)
```

### 删除签署区
```js
let rest = await eSignApi.SignFlows_DeleteSignfields(flowId)
```
## 7.5. 流程签署人
### 流程签署人列表
SignFlows_GetSigners
```js
 let rest = await eSignApi.SignFlows_GetSigners(flowId)
 ```
### 流程签署人催签

SignFlows_SignersRushsign
```js
var data ={
    "accountId": "",
    "noticeTypes": "1,2",
    "rushsignAccountId": accountId
}
let rest = await eSignApi.SignFlows_SignersRushsign(flowId, data)
```
### 获取签署地址
```js
let rest = await eSignApi.SignFlows_ExecuteUrl(flowId)
```



## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)