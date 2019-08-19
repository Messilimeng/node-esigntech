'use strict';
const httpx = require('httpx');
const liburl = require('url');


class eSignApi {

    //应用ID
    // 4438770539
    // 应用名称
    // 卡乐夫测试
    // APP KEY
    // c0a5d6f2c16929b062dfc9a712a5e63a
    /**
     *  @param {String} appid 在公众平台上申请得到的appid
     * @param {String} appsecret 在公众平台上申请得到的app secret
     * @param {AsyncFunction} getToken 可选的。获取全局token对象的方法，多进程模式部署时需在意
     * @param {AsyncFunction} saveToken 可选的。保存全局token对象的方法，多进程模式部署时需在意
     */
    constructor(appid, appsecret, getToken, saveToken, deugger = false) {
        this.appid = appid;
        this.appsecret = appsecret;
        this.getToken = getToken || async function () {
            return this.store;
        };
        this.saveToken = saveToken || async function (token) {
            this.store = token;
            if (process.env.NODE_ENV === 'production') {
                console.warn('Don\'t save token in memory, when cluster or multi-computer!');
            }
        };
        this.saveToken = saveToken || async function (token) {
            this.store = token;
            if (process.env.NODE_ENV === 'production') {
                console.warn('Don\'t save token in memory, when cluster or multi-computer!');
            }
        };
        this.prefix = deugger ? 'https://smlopenapi.esign.cn/' : 'https://openapi.esign.cn/';

    }

    /**
     * 设置urllib的hook
     */
    async request(url, opts, retry) {
        if (typeof retry === 'undefined') {
            retry = 3;
        }
        var options = {};
        Object.assign(options, this.defaults);
        opts || (opts = {});
        var keys = Object.keys(opts);
        for (var i = 0; i < keys.length; i++) {
            var key = keys[i];
            if (key !== 'headers') {
                options[key] = opts[key];
            } else {
                if (opts.headers) {
                    options.headers = options.headers || {};
                    Object.assign(options.headers, opts.headers);
                }
            }
        }
        var res = await httpx.request(url, options);

        if (res.statusCode < 200 || res.statusCode > 204) {
            var err = new Error(`url: ${url}, status code: ${res.statusCode}`);
            err.name = 'eSignAPIError';
            throw err;
        }

        var buffer = await httpx.read(res);
        var contentType = res.headers['content-type'] || '';
        if (contentType.indexOf('application/json') !== -1) {
            var data;
            try {
                data = JSON.parse(buffer);
            } catch (ex) {
                let err = new Error('JSON.parse error. buffer is ' + buffer.toString());
                err.name = 'eSignAPIError';
                throw err;
            }
            if (data.code === 401 && retry > 0) {
                // 销毁已过期的token
                await this.saveToken(null);
                let token = await this.getAccessToken();
                let urlobj = liburl.parse(url, true);

                if (urlobj.query && urlobj.query.access_token) {
                    urlobj.query.access_token = token.accessToken;
                    delete urlobj.search;
                }

                return this.request(liburl.format(urlobj), opts, retry - 1);
            }

            return data;
        }

        return buffer;
    }
    /**
     * 
     * e签宝API服务使用OAuth2.0的客户端鉴权方式，所有api访问前需要先获取access_token, 
     * 再携带access_token访问具体的业务API。在只需访问自身资源情况下，
     * 可只使用client_credentials模式，存在跨应用使用的情况下，
     * 需使用Authorization Code模式。 详细鉴权原理参考 https://tools.ietf.org/html/rfc6749
     */
    async getAccessToken() {
        var url = this.prefix + 'v1/oauth2/access_token?appId=' + this.appid + '&secret=' + this.appsecret + '&grantType=client_credentials';
        var rest = await this.request(url);
        // 过期时间，因网络延迟等，将实际过期时间提前10秒，以防止临界点
        var expireTime = rest.data.expiresIn;
        var token = new AccessToken(rest.data.token, expireTime);
        await this.saveToken(token);
        return token;
    }
    /*!
    * 需要access token的接口调用如果采用preRequest进行封装后，就可以直接调用。
    * 无需依赖 getAccessToken 为前置调用。
    * 应用开发者无需直接调用此API。
    * Examples:
    * ```
    * await api.ensureAccessToken();
    * ```
    */
    async ensureAccessToken() {
        // 调用用户传入的获取token的异步方法，获得token之后使用（并缓存它）。
        var token = await this.getToken();
        var accessToken;
        if (token && (accessToken = new AccessToken(token.accessToken, token.expireTime)).isValid()) {
            return accessToken;
        }
        return this.getAccessToken();
    }
    /**
     * 刷新token
     * 
     */
    async refreshToken() {

        var url = this.prefix + 'v1/oauth2/refresh_token?appId=' + this.appid + '&secret=' + this.appsecret + '&grantType=client_credentials';
        var rest = await this.request(url);
        // 过期时间，因网络延迟等，将实际过期时间提前10秒，以防止临界点
        var expireTime = rest.data.expiresIn;
        var token = new AccessToken(rest.data.token, expireTime);
        await this.saveToken(token);
        return token;
    }

}

class AccessToken {
    constructor(accessToken, expireTime) {
        this.accessToken = accessToken;
        this.expireTime = expireTime;
    }

    /*!
     * 检查AccessToken是否有效，检查规则为当前时间和过期时间进行对比 * Examples:
     * ```
     * token.isValid();
     * ```
     */
    isValid() {
        return !!this.accessToken && Date.now() < this.expireTime;
    }
}

/**
* 用于支持对象合并。将对象合并到API.prototype上，使得能够支持扩展
* Examples:
* ```
* // 媒体管理（上传、下载）
* API.mixin(require('./lib/api_media'));
* ```
* @param {Object} obj 要合并的对象
*/
eSignApi.mixin = function (obj) {
    for (var key in obj) {
        if (eSignApi.prototype.hasOwnProperty(key)) {
            throw new Error('Don\'t allow override existed prototype method. method: ' + key);
        }
        eSignApi.prototype[key] = obj[key];
    }
};

eSignApi.AccessToken = AccessToken;

module.exports = eSignApi;