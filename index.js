'use strict';

const API = require('./lib/api_common');
/**
 * 4.1. 个人账号
 */
API.mixin(require('./lib/api_account'));

/**
 * 4.2. 机构账号
 */
API.mixin(require('./lib/api_organizations'));

/**
 * 文件模板API
 */
API.mixin(require('./lib/api_files'));

/**
 * 4.3. 签署授权（账号静默签署权限管理）
 */
API.mixin(require('./lib/api_signauth'));

/**
 * 5.2. 模板管理
 */
API.mixin(require('./lib/api_docTemplates'));

// /**
//  * 6.1. 印章创建
//  */

// API.mixin(require('./lib/api_seals'));

/**
 * 7.1. 签署流程
 */
API.mixin(require('./lib/api_signflows'));

API.mixin(require('./lib/util'));

module.exports = API;