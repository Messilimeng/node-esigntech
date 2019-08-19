const expect = require('chai').expect;
const { eSignApi } = require('./init')
const stringRandom = require('string-random');

describe('test.organizations.js', function () {

    var orgId = '';
    var sealId='';
    it('Organizations_Create', async function () {

        let data = {
            "creator": "ca49e5963314418796fb682473d79919",
            "idNumber": "320830199009161634",
            "idType": "CRED_ORG_USCC",
            "name": "colsoft1212",
            "thirdPartyUserId": stringRandom()
        }
        let rest = await eSignApi.Organizations_Create(data)
        console.log(rest)
        orgId = rest.data.orgId
        expect(rest).to.be.include.keys('code')

    });
    it('Organizations_Modfiy', async function () {

        var data = {
            "idNumber": "320830199009161634",
            "idType": "CRED_ORG_USCC",
            "name": "colsoft11"
        }
        let rest = await eSignApi.Organizations_Modfiy(orgId, data)
        console.log(rest)
        expect(rest).to.be.include.keys('code')
    });

    it('Organizations_Get', async function () {
        let rest = await eSignApi.Organizations_Get(orgId)
        console.log(rest)
        expect(rest).to.be.include.keys('code')
    })

    it('Organizations_DeleteByOrgId', async function () {
        let rest = await eSignApi.Organizations_DeleteByOrgId(orgId)
        console.log(rest)
        expect(rest).to.be.include.keys('code')
    })

    it('Organizations_CreateOfficialTemplate', async function () {

        var data = {
            "alias": "企业星型印章",
            "central": "STAR",
            "color": "RED",
            "height": 100,
            "width": 50,
            "htext": "签宝",
            "qtext": "苏州卡乐夫信息科技有限公司",
            "type": "TEMPLATE_ROUND"
        }
        let rest = await eSignApi.Organizations_CreateOfficialTemplate(orgId,data)
        console.log(rest)
        sealId = rest.data.sealId
        expect(rest).to.be.include.keys('code')
    })

    it('Organizations_SealsGet', async function () {
        let rest = await eSignApi.Organizations_SealsGet(orgId,1,10)
        console.log(JSON.stringify(rest))
        expect(rest).to.be.include.keys('code')
    })

    it('Organizations_SealsDeleteById', async function () {
        let rest = await eSignApi.Organizations_SealsDeleteById(orgId,sealId)
        console.log(rest)
        expect(rest).to.be.include.keys('code')
    })
});