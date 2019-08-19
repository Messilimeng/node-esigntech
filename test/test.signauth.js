const expect = require('chai').expect;
const {eSignApi} = require('./init')

describe('test.signauth.js', function () {
    
    it('SignAuth_Setting', async function () {
        let accountId="969c282a943948afa199a75bc6c0c84b";
        let data = {
            "deadline": "2050-04-01 12:00:00"
        }
        let rest = await eSignApi.SignAuth_Setting(accountId,data)
        console.log(rest)
        expect(rest).to.be.include.keys('code')
       
    });
    
    it('SignAuth_Cancel', async function () {
        let accountId="969c282a943948afa199a75bc6c0c84b";
        let rest = await eSignApi.SignAuth_Cancel(accountId)
        console.log(rest)
        accountId= rest.data.accountId
        expect(rest).to.be.include.keys('code')
       
    });
});