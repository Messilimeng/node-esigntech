const expect = require('chai').expect;
const {eSignApi} = require('./init')
const { readFileMd5} = require('../lib/util.js')
const fs = require('fs')
describe('test.docTemplates.js', function () {
    let templateId;
    let ids;
    let uploadUrl;
    let contentMd5
    it('DocTemplates_createByUploadUrl', async function () {
        let fileurl = '6666.pdf'
        contentMd5 = await readFileMd5(fileurl)
        console.log('md5 ' + contentMd5)
        let data = {
            "contentMd5": contentMd5,
            "contentType": "application/octet-stream",
            "convert2Pdf": true,
            "fileName": "6666.pdf",
        }
        let rest = await eSignApi.DocTemplates_createByUploadUrl(data)
        console.log(rest)
        templateId = rest.data.templateId
        uploadUrl = rest.data.uploadUrl
        expect(rest).to.be.include.keys('code')
       
    });

    it('Files_Upload', async function () {

        let fileurl = '6666.pdf'
        var data = {
            contentType: "application/octet-stream",
            uploadUrl: uploadUrl,
            contentMd5: contentMd5,
            buffer: fs.createReadStream(fileurl)
        }
        let rest = await eSignApi.Files_Upload(data)
        console.log(rest)
        expect(rest).to.be.include.keys('errCode')
    });

      
    it('DocTemplates_GetComponents', async function () {
        console.log(templateId)
        let rest = await eSignApi.DocTemplates_GetComponents(templateId)
        console.log(rest)
        expect(rest).to.be.include.keys('code')
    });

    it('DocTemplates_CreateComponents', async function () {
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
        console.log(rest)
        ids = rest.data.toString()
        expect(rest).to.be.include.keys('code')
       
    });

 
    it('DocTemplates_DeleteComponents', async function () {
        let rest = await eSignApi.DocTemplates_DeleteComponents(templateId,ids)
        console.log(rest)
        expect(rest).to.be.include.keys('code')
   
    });
  
});