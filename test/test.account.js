const expect = require('chai').expect;
const {eSignApi} = require('./init')
const stringRandom = require('string-random');

describe('account', function () {
    let accountId;
    let thirdPartyUserId = stringRandom()
    let sealId;
    let fileKey;
    it('Account_Create', async function () {
        let data = {
            "email": "5364030003@qq.com",
            "idNumber": "320830199009161634",
            "idType": "CRED_PSN_CH_IDCARD",
            "mobile": "13073309327",
            "name": "廖朝阳章",
            "thirdPartyUserId": thirdPartyUserId
        }
        console.log("thirdPartyUserId "+thirdPartyUserId)
        let rest = await eSignApi.Account_Create(data)
        console.log(rest)
        accountId= rest.data.accountId
        expect(rest).to.be.include.keys('code')
       
    });

    // it('Account_Get', async function () {
    //     let rest = await eSignApi.Account_Get('8ad45b2c34114629ba0214c0f7302b70')
    //     console.log(rest)
    //     expect(rest).to.be.include.keys('code')
       
    // });

    // it('Account_Modfiy', async function () {
    //     let data = {
    //         "email": "5364030004@qq.com",
    //         "idNumber": "320830199009161634",
    //         "idType": "CRED_PSN_CH_IDCARD",
    //         "mobile": "13073309327",
    //         "name": "messi",
    //         "thirdPartyUserId": thirdPartyUserId
    //     }
    //     let rest = await eSignApi.Account_Modfiy(accountId,data)
    //     console.log(rest)
    //     expect(rest).to.be.include.keys('code')
   
    // });
    // it('Account_DeleteByThirdId', async function () {
    //     let ThirdId = thirdPartyUserId
    //     let rest = await eSignApi.Account_DeleteByThirdId(ThirdId)
    //     console.log(rest)
    //     expect(rest).to.be.include.keys('code')
    // });

    // it('Account_DeleteSealsById',async function(){
    //     let rest = await eSignApi.Account_DeleteSealsById(accountId,sealId)
    //     console.log(rest)
    //     expect(rest).to.be.include.keys('code')
    // })

    it('Account_SealsCreatePersonalTemplate',async function(){

        var param ={
            "alias": "红色四方形印章",
            "color": "RED",
            "height": 100,
            "type": "SQUARE",
            "width": 100
        }
        let rest = await eSignApi.Account_SealsCreatePersonalTemplate(accountId,param)
        console.log(rest)
        sealId = rest.data.sealId
        fileKey = rest.data.fileKey
        expect(rest).to.be.include.keys('code')
    })
    
    it('Account_SealsGet',async function(){
        let rest = await eSignApi.Account_SealsGet(accountId,1,10)
        console.log(JSON.stringify(rest))
        expect(rest).to.be.include.keys('code')
    })
    
    // it('Account_SealsDeleteById',async function(){
    //     let rest = await eSignApi.Account_SealsDeleteById(accountId,sealId)
    //     console.log(rest)
    //     expect(rest).to.be.include.keys('code')
    // })

    // it('Account_SealsCreateImage',async function(){
    //     var data ={
    //         "alias": "李蒙印章",
    //         "data": fileKey,
    //         "height": 100,
    //         "width": 100,
    //         "type": "FILEKEY"
    //     }
    //     let rest = await eSignApi.Account_SealsCreateImage(accountId,data)
    //     console.log(rest)
    //     expect(rest).to.be.include.keys('code')
    // })
});


