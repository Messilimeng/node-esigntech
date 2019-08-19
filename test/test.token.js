const expect = require('chai').expect;
const {eSignApi} = require('./init')
describe('token', function () {
    it('getAccessToken', async function () {
        let data = await eSignApi.getAccessToken()
        console.log(data)
        expect(data).to.be.include.keys('accessToken')
    });
});


