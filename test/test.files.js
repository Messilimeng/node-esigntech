const expect = require('chai').expect;
const { eSignApi } = require('./init')
const { readFileMd5, readFileInfo } = require('../lib/util.js')
const fs = require('fs')

describe('test.files.js', function () {

    var fileid = "";
    var uploadUrl;
    var contentMd5 = "";
    it('Files_getUploadUrl', async function () {

        let fileurl = 'thirdpartdoc.pdf'
        let indf = await readFileInfo(fileurl)
        let md5 = await readFileMd5(fileurl)
        contentMd5 = md5
        console.log('md5 ' + contentMd5)
        let data = {
            "contentMd5": md5,
            "contentType": "application/octet-stream",
            "convert2Pdf": false,
            "fileName": "thirdpartdoc.pdf",
            "fileSize": indf.size
        }
        let rest = await eSignApi.Files_getUploadUrl(data)
        console.log(rest)
        fileid = rest.data.fileId
        uploadUrl = rest.data.uploadUrl
        expect(rest).to.be.include.keys('code')

    });
    it('Files_Upload', async function () {

        let fileurl = 'thirdpartdoc.pdf'
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

    it('Files_getAddress', async function () {
        let rest = await eSignApi.Files_getAddress(fileid)
        console.log(rest)
        expect(rest).to.be.include.keys('code')
    })

    // it('Fils_BatchAddWatermark', async function () {
    //     var param = {
    //         "files": [
    //             {
    //                 "fileId": fileid,
    //                 "watermarkInfo": {
    //                     "contentType": 3,
    //                     "content": "水印文字",
    //                     "fontSize": 10,
    //                     "fontName": "simsun",
    //                     "vmModel": 1,
    //                     "lineWidths": 3,
    //                     "alpha": 100,
    //                     "strength": 250,
    //                     "imageHeight": 400,
    //                     "imageWidth": 400,
    //                     "scaling": 100,
    //                     "rotationAngle": 0
    //                 },
    //                 "posBean": {
    //                     "posPage": "1-10,20",
    //                     "posX": 11.5,
    //                     "posY": 200
    //                 }
    //             }
    //         ],
    //         "notifyUrl": "",
    //         "thirdOrderNo": ""
    //     }
    //     let rest = await eSignApi.Fils_BatchAddWatermark(param)
    //     console.log(rest)
    //     expect(rest).to.be.include.keys('code')
    // })

    // it('Fils_CreateByTemplate',async function(){

    //     let data={
    //         "name":"模板文件ten",
    //         "simpleFormFields":{
    //             "甲方:":"测试甲方",
    //             "乙方:":"测试乙方"
    //         },
    //         "templateId":"b470d1753cf94f57bb253655c4fc2f7c"
    //     }
    //     let rest = await eSignApi.Fils_CreateByTemplate(data)
    //     console.log(rest)
    //     expect(rest).to.be.include.keys('code')
    // })

});