const expect = require('chai').expect;
const { eSignApi } = require('./init')

describe('test.signflows.js', function () {
    let flowId='';
    let fileid='50689d40118b473ca6faa02ce8fd9315'
    let sealId ='b5892182-6d04-4b83-bdc1-91e6bb76b019'
    let accountId ='a7932a0e55194dec934130ced5ba42e0'
    it("SignFlows_Create", async function () {
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
        console.log(JSON.stringify(rest))
        flowId = rest.data.flowId
        expect(rest).to.be.include.keys('code')
    })

    it("SignFlows_Get", async function () {

        let rest = await eSignApi.SignFlows_Get(flowId)
        console.log(JSON.stringify(rest))
        expect(rest).to.be.include.keys('code')
    })
    it("SignFlows_CreateDocuments", async function () {
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
        console.log(JSON.stringify(rest))
        expect(rest).to.be.include.keys('code')
    })
    it("SignFlows_Start", async function () {
        let rest = await eSignApi.SignFlows_Start(flowId, {})
        console.log(JSON.stringify(rest))
        expect(rest).to.be.include.keys('code')
    })
    it("SignFlows_Revoke", async function () {
        var data = {
            "revokeReason": "合同有误"
        }
        let rest = await eSignApi.SignFlows_Revoke(flowId, data)
        console.log(JSON.stringify(rest))
        expect(rest).to.be.include.keys('code')
    })
    it("SignFlows_Archive", async function () {
        let rest = await eSignApi.SignFlows_Archive(flowId, {})
        console.log(JSON.stringify(rest))
        expect(rest).to.be.include.keys('code')
    })
 
    
    it("SignFlows_GetDocuments", async function () {
        let rest = await eSignApi.SignFlows_GetDocuments(flowId)
        console.log(JSON.stringify(rest))
        expect(rest).to.be.include.keys('code')
    })

    it("SignFlows_DeleteDocuments", async function () {
        var fileIds
        let rest = await eSignApi.SignFlows_DeleteDocuments(flowId, fileIds)
        console.log(JSON.stringify(rest))
        expect(rest).to.be.include.keys('code')
    })

    it("SignFlows_GetAttachments", async function () {
        let rest = await eSignApi.SignFlows_GetAttachments(flowId)
        console.log(JSON.stringify(rest))
        expect(rest).to.be.include.keys('code')
    })
    it("SignFlows_CreateAttachments", async function () {
        var data = {
            "attachments": [
                {
                    "attachmentName": "第一份附件.pdf",
                    "fileId": fileid
                }
            ]
        }
        let rest = await eSignApi.SignFlows_CreateAttachments(flowId, data)
        console.log(JSON.stringify(rest))
        expect(rest).to.be.include.keys('code')
    })
    it("SignFlows_DeteleAttachments", async function () {

        let rest = await eSignApi.SignFlows_DeteleAttachments(flowId, fileIds)
        console.log(JSON.stringify(rest))
        expect(rest).to.be.include.keys('code')
    })
    it("SignFlows_GetSignfields", async function () {
        let rest = await eSignApi.SignFlows_GetSignfields(flowId, accountId)
        console.log(JSON.stringify(rest))
        expect(rest).to.be.include.keys('code')
    })
    it("SignFlows_CreateSignfieldsPlatformSign", async function () {
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
        console.log(JSON.stringify(rest))
        expect(rest).to.be.include.keys('code')
    })
    it("SignFlows_CreateSignfieldsAutoSign", async function () {
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
        console.log(JSON.stringify(rest))
        expect(rest).to.be.include.keys('code')
    })

    it("SignFlows_CreateSignfieldsHandSign", async function () {
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
        console.log(JSON.stringify(rest))
        expect(rest).to.be.include.keys('code')
    })
    it("SignFlows_DeleteSignfields", async function () {
        let rest = await eSignApi.SignFlows_DeleteSignfields(flowId)
        console.log(JSON.stringify(rest))
        expect(rest).to.be.include.keys('code')
    })
    it("SignFlows_GetSigners", async function () {
        let rest = await eSignApi.SignFlows_GetSigners(flowId)
        console.log(JSON.stringify(rest))
        expect(rest).to.be.include.keys('code')
    })
    it("SignFlows_SignersRushsign", async function () {
        var data ={
            "accountId": "",
            "noticeTypes": "1,2",
            "rushsignAccountId": accountId
        }
        let rest = await eSignApi.SignFlows_SignersRushsign(flowId, data)
        console.log(JSON.stringify(rest))
        expect(rest).to.be.include.keys('code')
    })
    it("SignFlows_ExecuteUrl", async function () {
        let rest = await eSignApi.SignFlows_ExecuteUrl(flowId)
        console.log(JSON.stringify(rest))
        expect(rest).to.be.include.keys('code')
    })
   
})