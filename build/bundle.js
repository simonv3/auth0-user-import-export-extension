module.exports=function(e){var t={};function r(n){if(t[n])return t[n].exports;var o=t[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,r),o.l=!0,o.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:n})},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=16)}([function(e,t){e.exports=require("auth0-extension-tools@1.2.1")},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.JwksClient=void 0;var n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},o=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),i=p(r(4)),s=p(r(28)),a=(p(r(9)),p(r(10))),u=p(r(11)),c=r(29),l=r(30);function p(e){return e&&e.__esModule?e:{default:e}}t.JwksClient=function(){function e(t){var r=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.getSigningKey=function(e,t){r.logger("Fetching signing key for '"+e+"'"),r.getSigningKeys(function(n,o){if(n)return t(n);var i=o.find(function(t){return t.kid===e});return i?t(null,i):(r.logger("Unable to find a signing key that matches '"+e+"'"),t(new u.default("Unable to find a signing key that matches '"+e+"'")))})},this.options=n({rateLimit:!1,cache:!1,strictSsl:!0},t),this.logger=(0,i.default)("jwks"),this.options.rateLimit&&(this.getSigningKey=(0,l.rateLimitSigningKey)(this,t)),this.options.cache&&(this.getSigningKey=(0,l.cacheSigningKey)(this,t))}return o(e,[{key:"getKeys",value:function(e){var t=this;this.logger("Fetching keys from '"+this.options.jwksUri+"'"),(0,s.default)({json:!0,uri:this.options.jwksUri,strictSSL:this.options.strictSsl},function(r,n){return r||n.statusCode<200||n.statusCode>=300?(t.logger("Failure:",n&&n.body||r),e(n?new a.default(n.body&&(n.body.message||n.body)||n.statusMessage||"Http Error "+n.statusCode):r)):(t.logger("Keys:",n.body.keys),e(null,n.body.keys))})}},{key:"getSigningKeys",value:function(e){var t=this;this.getKeys(function(r,n){if(r)return e(r);if(!n||!n.length)return e(new a.default("The JWKS endpoint did not contain any keys"));var o=n.filter(function(e){return"sig"===e.use&&"RSA"===e.kty&&e.kid&&(e.x5c&&e.x5c.length||e.n&&e.e)}).map(function(e){return e.x5c&&e.x5c.length?{kid:e.kid,nbf:e.nbf,publicKey:(0,c.certToPEM)(e.x5c[0])}:{kid:e.kid,nbf:e.nbf,rsaPublicKey:(0,c.rsaPublicKeyToPEM)(e.n,e.e)}});return o.length?(t.logger("Signing Keys:",o),e(null,o)):e(new a.default("The JWKS endpoint did not contain any signing keys"))})}}]),e}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SigningKeyNotFoundError=t.JwksRateLimitError=t.JwksError=t.ArgumentError=void 0;var n=a(r(9)),o=a(r(10)),i=a(r(13)),s=a(r(11));function a(e){return e&&e.__esModule?e:{default:e}}t.ArgumentError=n.default,t.JwksError=o.default,t.JwksRateLimitError=i.default,t.SigningKeyNotFoundError=s.default},function(e,t,r){const n=r(17),o=r(5),i=r(20),s=r(49);e.exports.createServer=n.createServer,e.exports.urlHelpers=o,e.exports.middlewares=i,e.exports.routes=s},function(e,t){e.exports=require("debug")},function(e,t,r){const n=r(19),o=3,i=2,s=1,a=/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;e.exports.getBasePath=function(e){return t=e.originalUrl||"",r=e.path,(o=(o=n.parse(t).pathname||"").replace(r,"").replace(/^\/|\/$/g,"")).startsWith("/")||(o="/"+o),o.endsWith("/")||(o+="/"),o;var t,r,o},e.exports.getBaseUrl=function(e,t){var r=t;const o=n.parse(e.originalUrl||"").pathname||"";return n.format({protocol:r||"https",host:e.headers.host,pathname:o.replace(e.path,"").replace(/\/$/g,"")})},e.exports.getWebtaskUrl=function(e){const t=function(e){if(!e.container)return null;const t=e.container.replace(a,"\\$&"),r=e.jtn?e.jtn.replace(a,"\\$&"):"";if(e.url_format===s)return new RegExp("^/api/run/"+t+"/(?:"+r+"/?)?");if(e.url_format===i)return new RegExp("^/"+t+"/(?:"+r+"/?)?");if(e.url_format===o)return new RegExp("^/(?:"+r+"/?)?");throw new Error("Unsupported webtask URL format.")}(e.x_wt),r=e.url,u=e.url.replace(t,"/"),c=n.parse(u||"").pathname,l=e.x_wt&&e.x_wt.ectx&&e.x_wt.ectx.ISOLATED_DOMAIN||!1,p=n.parse(r||"").pathname||"";if(l){var d=n.format({protocol:"https",host:e.headers.host,pathname:p.replace(c,"").replace(/\/$/g,"")});0===d.indexOf("https://sandbox.it.auth0.com")?d=d.replace("https://sandbox.it.auth0.com/api/run/"+e.x_wt.container+"/","https://"+e.x_wt.container+".us.webtask.io/"):0===d.indexOf("https://sandbox-eu.it.auth0.com")?d=d.replace("https://sandbox-eu.it.auth0.com/api/run/"+e.x_wt.container+"/","https://"+e.x_wt.container+".eu.webtask.io/"):0===d.indexOf("https://sandbox-au.it.auth0.com")&&(d=d.replace("https://sandbox-au.it.auth0.com/api/run/"+e.x_wt.container+"/","https://"+e.x_wt.container+".au.webtask.io/"))}else wetaskUrl=p;return d}},function(e,t,r){"use strict";var n=r(22);function o(e){this.message=e}o.prototype=new Error,o.prototype.name="InvalidTokenError",e.exports=function(e,t){if("string"!=typeof e)throw new o("Invalid token specified");var r=!0===(t=t||{}).header?0:1;try{return JSON.parse(n(e.split(".")[r]))}catch(e){throw new o("Invalid token specified: "+e.message)}},e.exports.InvalidTokenError=o},function(e,t){e.exports=require("express-jwt")},function(e,t,r){"use strict";var n=r(24);e.exports=function(e,t,r){return function(o,i,s){for(var a=arguments.length,u=Array(a>3?a-3:0),c=3;c<a;c++)u[c-3]=arguments[c];var l=n(s);return!0===e||"function"==typeof e&&e.apply(void 0,[o,i,l].concat(u))?t.apply(void 0,[o,i,l].concat(u)):r?r.apply(void 0,[o,i,l].concat(u)):l()}}},function(e,t,r){"use strict";function n(e){Error.call(this,e),Error.captureStackTrace(this,this.constructor),this.name="ArgumentError",this.message=e}n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,e.exports=n},function(e,t,r){"use strict";function n(e){Error.call(this,e),Error.captureStackTrace(this,this.constructor),this.name="JwksError",this.message=e}n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,e.exports=n},function(e,t,r){"use strict";function n(e){Error.call(this,e),Error.captureStackTrace(this,this.constructor),this.name="SigningKeyNotFoundError",this.message=e}n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,e.exports=n},function(e,t){var r=function(e,t,r,n){if(this.bucketSize=e,this.tokensPerInterval=t,"string"==typeof r)switch(r){case"sec":case"second":this.interval=1e3;break;case"min":case"minute":this.interval=6e4;break;case"hr":case"hour":this.interval=36e5;break;case"day":this.interval=864e5}else this.interval=r;this.parentBucket=n,this.content=0,this.lastDrip=+new Date};r.prototype={bucketSize:1,tokensPerInterval:1,interval:1e3,parentBucket:null,content:0,lastDrip:0,removeTokens:function(e,t){var r=this;return this.bucketSize?e>this.bucketSize?(process.nextTick(t.bind(null,"Requested tokens "+e+" exceeds bucket size "+this.bucketSize,null)),!1):(this.drip(),e>this.content?n():this.parentBucket?this.parentBucket.removeTokens(e,function(o,i){return o?t(o,null):e>r.content?n():(r.content-=e,void t(null,Math.min(i,r.content)))}):(this.content-=e,process.nextTick(t.bind(null,null,this.content)),!0)):(process.nextTick(t.bind(null,null,e,Number.POSITIVE_INFINITY)),!0);function n(){var n=Math.ceil((e-r.content)*(r.interval/r.tokensPerInterval));return setTimeout(function(){r.removeTokens(e,t)},n),!1}},tryRemoveTokens:function(e){return!this.bucketSize||!(e>this.bucketSize)&&(this.drip(),!(e>this.content)&&(!(this.parentBucket&&!this.parent.tryRemoveTokens(e))&&(this.content-=e,!0)))},drip:function(){if(this.tokensPerInterval){var e=+new Date,t=Math.max(e-this.lastDrip,0);this.lastDrip=e;var r=t*(this.tokensPerInterval/this.interval);this.content=Math.min(this.content+r,this.bucketSize)}else this.content=this.bucketSize}},e.exports=r},function(e,t,r){"use strict";function n(e){Error.call(this,e),Error.captureStackTrace(this,this.constructor),this.name="JwksRateLimitError",this.message=e}n.prototype=Object.create(Error.prototype),n.prototype.constructor=n,e.exports=n},function(e,t){e.exports=require("express")},function(e,t,r){"use strict";e.exports=r(0).config()},function(e,t,r){"use strict";var n=r(3),o=r(55);e.exports=n.createServer(function(e){return console.log("Starting User Import/Export Extension - Version:",e("CLIENT_VERSION")),o(e)})},function(e,t,r){const n=r(0),o=r(18);e.exports.createServer=function(e){const t=n.createServer(e);var r=null;return o.fromExpress(function(e,n){return r||(r=t(e.webtaskContext)),r(e,n)})}},function(e,t){e.exports=require("webtask-tools")},function(e,t){e.exports=require("url")},function(e,t,r){e.exports.authenticateAdmins=r(21),e.exports.authenticateUsers=r(26),e.exports.requireAuthentication=r(44),e.exports.errorHandler=r(45),e.exports.managementApiClient=r(46),e.exports.validateHookToken=r(47),e.exports.webtaskConfig=r(48)},function(e,t,r){const n=r(6),o=r(7),i=r(0),s=r(8);e.exports=function(e){if(!e||"object"!=typeof e)throw new i.ArgumentError("Must provide the options");if(null===e.secret||void 0===e.secret)throw new i.ArgumentError("Must provide a valid secret");if("string"!=typeof e.secret||0===e.secret.length)throw new i.ArgumentError("The provided secret is invalid: "+e.secret);if(null===e.audience||void 0===e.audience)throw new i.ArgumentError("Must provide a valid secret");if("string"!=typeof e.audience||0===e.audience.length)throw new i.ArgumentError("The provided audience is invalid: "+e.audience);if(null===e.baseUrl||void 0===e.baseUrl)throw new i.ArgumentError("Must provide a valid base URL");if("string"!=typeof e.baseUrl||0===e.baseUrl.length)throw new i.ArgumentError("The provided base URL is invalid: "+e.baseUrl);const t=o({audience:e.audience,issuer:e.baseUrl,secret:e.secret,algorithms:["HS256"],credentialsRequired:e.credentialsRequired||!0});return function(r,n,o){t(r,n,function(t){return t?o(t):e.onLoginSuccess?e.onLoginSuccess(r,n,o):o()})}},e.exports.optional=function(t){const r=e.exports(t);return s(function(e){if(e&&e.headers&&e.headers.authorization&&0===e.headers.authorization.indexOf("Bearer "))try{const r=n(e.headers.authorization.split(" ")[1]);return r&&r.iss===t.baseUrl}catch(e){return!1}return!1},r)}},function(e,t,r){var n=r(23);e.exports=function(e){var t=e.replace(/-/g,"+").replace(/_/g,"/");switch(t.length%4){case 0:break;case 2:t+="==";break;case 3:t+="=";break;default:throw"Illegal base64url string!"}try{return function(e){return decodeURIComponent(n(e).replace(/(.)/g,function(e,t){var r=t.charCodeAt(0).toString(16).toUpperCase();return r.length<2&&(r="0"+r),"%"+r}))}(t)}catch(e){return n(t)}}},function(e,t){var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";function n(e){this.message=e}n.prototype=new Error,n.prototype.name="InvalidCharacterError",e.exports="undefined"!=typeof window&&window.atob&&window.atob.bind(window)||function(e){var t=String(e).replace(/=+$/,"");if(t.length%4==1)throw new n("'atob' failed: The string to be decoded is not correctly encoded.");for(var o,i,s=0,a=0,u="";i=t.charAt(a++);~i&&(o=s%4?64*o+i:i,s++%4)?u+=String.fromCharCode(255&o>>(-2*s&6)):0)i=r.indexOf(i);return u}},function(e,t,r){var n=r(25);function o(e){var t=function(){return t.called?t.value:(t.called=!0,t.value=e.apply(this,arguments))};return t.called=!1,t}function i(e){var t=function(){if(t.called)throw new Error(t.onceError);return t.called=!0,t.value=e.apply(this,arguments)},r=e.name||"Function wrapped with `once`";return t.onceError=r+" shouldn't be called more than once",t.called=!1,t}e.exports=n(o),e.exports.strict=n(i),o.proto=o(function(){Object.defineProperty(Function.prototype,"once",{value:function(){return o(this)},configurable:!0}),Object.defineProperty(Function.prototype,"onceStrict",{value:function(){return i(this)},configurable:!0})})},function(e,t){e.exports=require("wrappy")},function(e,t,r){const n=r(6),o=r(7),i=r(27),s=r(0),a=r(8),u=r(0).UnauthorizedError;e.exports=function(e){if(!e||"object"!=typeof e)throw new s.ArgumentError("Must provide the options");if(null===e.domain||void 0===e.domain)throw new s.ArgumentError("Must provide a valid domain");if("string"!=typeof e.domain||0===e.domain.length)throw new s.ArgumentError("The provided domain is invalid: "+e.domain);if(null===e.audience||void 0===e.audience)throw new s.ArgumentError("Must provide a valid audience");if("string"!=typeof e.audience||0===e.audience.length)throw new s.ArgumentError("The provided audience is invalid: "+e.audience);const t=o({secret:i.expressJwtSecret({cache:!0,rateLimit:!0,jwksRequestsPerMinute:5,jwksUri:"https://"+e.domain+"/.well-known/jwks.json",handleSigningKeyError:function(e,t){return e instanceof i.SigningKeyNotFoundError?t(new u("A token was provided with an invalid kid")):t(e)}}),audience:e.audience,issuer:"https://"+e.domain+"/",algorithms:["RS256"],credentialsRequired:e&&e.credentialsRequired||!0});return function(r,n,o){t(r,n,function(t){return t?o(t):e.onLoginSuccess?e.onLoginSuccess(r,n,o):o()})}},e.exports.optional=function(t){const r=e.exports(t);return a(function(e){if(e&&e.headers&&e.headers.authorization&&0===e.headers.authorization.indexOf("Bearer "))try{const r=n(e.headers.authorization.split(" ")[1]);return r&&r.iss==="https://"+t.domain+"/"}catch(e){return!1}return!1},r)}},function(e,t,r){"use strict";var n=r(1),o=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&(t[r]=e[r]);return t.default=e,t}(r(2)),i=r(41),s=r(42),a=r(43);e.exports=function(e){return new n.JwksClient(e)},e.exports.ArgumentError=o.ArgumentError,e.exports.JwksError=o.JwksError,e.exports.JwksRateLimitError=o.JwksRateLimitError,e.exports.SigningKeyNotFoundError=o.SigningKeyNotFoundError,e.exports.expressJwtSecret=s.expressJwtSecret,e.exports.hapiJwt2Key=i.hapiJwt2Key,e.exports.koaJwtSecret=a.koaJwtSecret},function(e,t){e.exports=require("request")},function(e,t,r){"use strict";function n(e){var t=e[0];return t<"0"||t>"7"?"00"+e:e}function o(e){var t=e.toString(16);return t.length%2?"0"+t:t}function i(e){if(e<=127)return o(e);var t=o(e);return o(128+t.length/2)+t}Object.defineProperty(t,"__esModule",{value:!0}),t.certToPEM=function(e){return e="-----BEGIN CERTIFICATE-----\n"+(e=e.match(/.{1,64}/g).join("\n"))+"\n-----END CERTIFICATE-----\n"},t.rsaPublicKeyToPEM=function(e,t){var r=new Buffer(e,"base64"),o=new Buffer(t,"base64"),s=n(r.toString("hex")),a=n(o.toString("hex")),u=s.length/2,c=a.length/2,l=i(u),p=i(c),d="30"+i(u+c+l.length/2+p.length/2+2)+"02"+l+s+"02"+p+a,h=new Buffer(d,"hex").toString("base64"),f="-----BEGIN RSA PUBLIC KEY-----\n";return f+=""+h.match(/.{1,64}/g).join("\n"),f+="\n-----END RSA PUBLIC KEY-----\n"}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.rateLimitSigningKey=t.cacheSigningKey=void 0;var n=i(r(31)),o=i(r(38));function i(e){return e&&e.__esModule?e:{default:e}}t.cacheSigningKey=n.default,t.rateLimitSigningKey=o.default},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:options,r=t.cacheMaxEntries,s=void 0===r?5:r,a=t.cacheMaxAge,u=void 0===a?(0,n.default)("10h"):a,c=(0,o.default)("jwks"),l=e.getSigningKey;return c("Configured caching of singing keys. Max: "+s+" / Age: "+u),(0,i.default)({load:function(e,t){l(e,function(r,n){return r?t(r):(c("Caching signing key for '"+e+"':",n),t(null,n))})},hash:function(e){return e},maxAge:u,max:s})};var n=s(r(32)),o=s(r(4)),i=s(r(33));function s(e){return e&&e.__esModule?e:{default:e}}},function(e,t){e.exports=require("ms")},function(e,t,r){const n=r(34),o=r(35),i=["max","maxAge","length","dispose","stale"],s=r(36),a=r(37);e.exports=function(e){const t=new n(o.pick(e,i)),r=e.load,u=e.hash,c=e.bypass,l=e.itemMaxAge,p=e.freeze,d=e.clone,h=new Map;if(e.disable)return o.extend(r,{del:f},e),r;function f(){const e=u.apply(this,arguments);t.del(e)}const g=function(){const e=a.apply(null,arguments),n=e.slice(0,-1),i=e.slice(-1).pop(),f=this;var g;if(c&&c.apply(f,n))return r.apply(f,e);g=0!==n.length||u?u.apply(f,n):"_";var m=t.get(g);if(m)return d?i.apply(null,[null].concat(m).map(o.cloneDeep)):i.apply(null,[null].concat(m));h.get(g)?h.get(g).push(i):(h.set(g,[]),r.apply(f,n.concat(function(e){const r=a.apply(null,arguments);if(!e){const e=r.slice(1);p&&r.forEach(s),l?t.set(g,e,l.apply(f,n.concat(e))):t.set(g,e)}const u=h.get(g).concat(i);h.delete(g),u.forEach(function(e){if(d)return e.apply(null,r.map(o.cloneDeep));e.apply(null,r)})})))};return g.keys=t.keys.bind(t),o.extend(g,{del:f},e),g},e.exports.sync=function(e){const t=new n(o.pick(e,i)),r=e.load,s=e.hash,a=e.disable,u=e.bypass,c=this,l=e.itemMaxAge;if(a)return r;const p=function(){var e=o.toArray(arguments);if(u&&u.apply(c,arguments))return r.apply(c,arguments);var n=s.apply(c,e),i=t.get(n);if(i)return i;const a=r.apply(c,e);return l?t.set(n,a,l.apply(c,e.concat([a]))):t.set(n,a),a};return p.keys=t.keys.bind(t),p}},function(e,t){e.exports=require("lru-cache")},function(e,t){e.exports=require("lodash")},function(e,t){e.exports=function e(t){return t&&(Object.freeze(t),Object.getOwnPropertyNames(t).forEach(function(r){!t.hasOwnProperty(r)||null===t[r]||"object"!=typeof t[r]&&"function"!=typeof t[r]||t[r].constructor===Buffer||Object.isFrozen(t[r])||e(t[r])})),t}},function(e,t){try{e.exports=Function("return function fargs(...rest){ return rest; }")()}catch(t){e.exports=function(){switch(arguments.length){case 1:return[arguments[0]];case 2:return[arguments[0],arguments[1]];case 3:return[arguments[0],arguments[1],arguments[2]];case 4:return[arguments[0],arguments[1],arguments[2],arguments[3]];case 5:return[arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]];case 6:return[arguments[0],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]];default:return Array.apply(null,arguments)}}}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){var t=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:options).jwksRequestsPerMinute,r=void 0===t?10:t,s=(0,n.default)("jwks"),a=e.getSigningKey,u=new o.RateLimiter(r,"minute",!0);return s("Configured rate limiting to JWKS endpoint at "+r+"/minute"),function(e,t){u.removeTokens(1,function(r,n){return r?t(r):(s("Requests to the JWKS endpoint available for the next minute:",n),n<0?(s("Too many requests to the JWKS endpoint"),t(new i.default("Too many requests to the JWKS endpoint"))):a(e,t))})}};var n=s(r(4)),o=r(39),i=s(r(13));function s(e){return e&&e.__esModule?e:{default:e}}},function(e,t,r){t.RateLimiter=r(40),t.TokenBucket=r(12)},function(e,t,r){var n=r(12),o=function(e,t,r){this.tokenBucket=new n(e,e,t,null),this.tokenBucket.content=e,this.curIntervalStart=+new Date,this.tokensThisInterval=0,this.fireImmediately=r};o.prototype={tokenBucket:null,curIntervalStart:0,tokensThisInterval:0,fireImmediately:!1,removeTokens:function(e,t){if(e>this.tokenBucket.bucketSize)return process.nextTick(t.bind(null,"Requested tokens "+e+" exceeds maximum tokens per interval "+this.tokenBucket.bucketSize,null)),!1;var r=this,n=Date.now();if(n-this.curIntervalStart>=this.tokenBucket.interval&&(this.curIntervalStart=n,this.tokensThisInterval=0),e>this.tokenBucket.tokensPerInterval-this.tokensThisInterval){if(this.fireImmediately)process.nextTick(t.bind(null,null,-1));else{var o=Math.ceil(this.curIntervalStart+this.tokenBucket.interval-n);setTimeout(function(){r.tokenBucket.removeTokens(e,i)},o)}return!1}return this.tokenBucket.removeTokens(e,i);function i(n,o){if(n)return t(n,null);r.tokensThisInterval+=e,t(null,o)}},tryRemoveTokens:function(e){if(e>this.tokenBucket.bucketSize)return!1;var t=Date.now();return t-this.curIntervalStart>=this.tokenBucket.interval&&(this.curIntervalStart=t,this.tokensThisInterval=0),!(e>this.tokenBucket.tokensPerInterval-this.tokensThisInterval)&&this.tokenBucket.tryRemoveTokens(e)},getTokensRemaining:function(){return this.tokenBucket.drip(),this.tokenBucket.content}},e.exports=o},function(e,t,r){"use strict";var n=r(2),o=r(1),i=function(e,t){return e&&"SigningKeyNotFoundError"===e.name?t(null,null,null):e?t(e,null,null):void 0};e.exports.hapiJwt2Key=function(e){if(null===e||void 0===e)throw new n.ArgumentError("An options object must be provided when initializing expressJwtSecret");var t=new o.JwksClient(e),r=e.handleSigningKeyError||i;return function(e,n){return e&&e.header?"RS256"!==e.header.alg?n(null,null,null):void t.getSigningKey(e.header.kid,function(e,t){return e?r(e,function(e){return n(e,null,null)}):n(null,t.publicKey||t.rsaPublicKey,t)}):n(null,null,null)}}},function(e,t,r){"use strict";var n=r(2),o=r(1),i=function(e,t){return e&&"SigningKeyNotFoundError"===e.name?t(null):e?t(e):void 0};e.exports.expressJwtSecret=function(e){if(null===e||void 0===e)throw new n.ArgumentError("An options object must be provided when initializing expressJwtSecret");var t=new o.JwksClient(e),r=e.handleSigningKeyError||i;return function(e,n,o,i){if(!n||"RS256"!==n.alg)return i(null,null);t.getSigningKey(n.kid,function(e,t){return e?r(e,function(e){return i(e,null)}):i(null,t.publicKey||t.rsaPublicKey)})}}},function(e,t,r){"use strict";var n=r(2),o=r(1);e.exports.koaJwtSecret=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(!e.jwksUri)throw new n.ArgumentError("No JWKS URI provided");var t=new o.JwksClient(e);return function(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=r.alg,o=r.kid;return new Promise(function(r,i){if("RS256"!==n)return i(new Error("Missing / invalid token algorithm"));t.getSigningKey(o,function(t,n){if(t)return e.handleSigningKeyError?e.handleSigningKeyError(t).then(i):i(t);r(n.publicKey||n.rsaPublicKey)})})}}},function(e,t,r){const n=r(0).UnauthorizedError;e.exports=function(e,t,r){return e.user?r():r(new n("Authentication required for this endpoint."))}},function(e,t,r){e.exports=function(e){return function(t,r,n,o){return e&&e(t),t&&t.status?(n.status(t.status),n.json({error:t.code||t.name,message:t.message||t.name})):(n.status(t.status||500),n.json({error:"InternalServerError",message:t.message||t.name}))}}},function(e,t,r){const n=r(0);e.exports=function(e){return function(t,r,o){const i=t,s=t.user&&t.user.access_token&&t.user.access_token.length?{domain:e.domain,accessToken:t.user.access_token}:e;n.managementApi.getClient(s).then(function(e){return i.auth0=e,o(),null}).catch(function(e){o(e)})}}},function(e,t,r){const n=r(0);e.exports=function(e,t,r){if(null===e||void 0===e)throw new n.ArgumentError("Must provide the domain");if("string"!=typeof e||0===e.length)throw new n.ArgumentError("The provided domain is invalid: "+e);if(null===t||void 0===t)throw new n.ArgumentError("Must provide the webtaskUrl");if("string"!=typeof t||0===t.length)throw new n.ArgumentError("The provided webtaskUrl is invalid: "+t);if(null===r||void 0===r)throw new n.ArgumentError("Must provide the extensionSecret");if("string"!=typeof r||0===r.length)throw new n.ArgumentError("The provided extensionSecret is invalid: "+r);return function(o){if(null===o||void 0===o)throw new n.ArgumentError("Must provide the hookPath");if("string"!=typeof o||0===o.length)throw new n.ArgumentError("The provided hookPath is invalid: "+o);return function(i,s,a){if(i.headers.authorization&&"Bearer"===i.headers.authorization.split(" ")[0]){const s=i.headers.authorization.split(" ")[1];try{if(n.validateHookToken(e,t,o,r,s))return a()}catch(e){return a(e)}}return a(new n.HookTokenError("Hook token missing for the call to: "+o))}}}},function(e,t,r){const n=r(0);e.exports=function(e){return function(t,r,o){return t.webtaskContext&&e.setProvider(n.configProvider.fromWebtaskContext(t.webtaskContext)),o()}}},function(e,t,r){e.exports.dashboardAdmins=r(50)},function(e,t,r){const n=r(14),o=r(51),i=r(52),s=r(0),a=r(5);e.exports=function(e){if(!e||"object"!=typeof e)throw new s.ArgumentError("Must provide the options");if(null===e.secret||void 0===e.secret)throw new s.ArgumentError("Must provide a valid secret");if("string"!=typeof e.secret||0===e.secret.length)throw new s.ArgumentError("The provided secret is invalid: "+e.secret);if(null===e.audience||void 0===e.audience)throw new s.ArgumentError("Must provide a valid secret");if("string"!=typeof e.audience||0===e.audience.length)throw new s.ArgumentError("The provided audience is invalid: "+e.audience);if(null===e.rta||void 0===e.rta)throw new s.ArgumentError("Must provide a valid rta");if("string"!=typeof e.rta||0===e.rta.length)throw new s.ArgumentError("The provided rta is invalid: "+e.rta);if(null===e.domain||void 0===e.domain)throw new s.ArgumentError("Must provide a valid domain");if("string"!=typeof e.domain||0===e.domain.length)throw new s.ArgumentError("The provided domain is invalid: "+e.domain);if(null===e.baseUrl||void 0===e.baseUrl)throw new s.ArgumentError("Must provide a valid base URL");if("string"!=typeof e.baseUrl||0===e.baseUrl.length)throw new s.ArgumentError("The provided base URL is invalid: "+e.baseUrl);if(null===e.clientName||void 0===e.clientName)throw new s.ArgumentError("Must provide a valid client name");if("string"!=typeof e.clientName||0===e.clientName.length)throw new s.ArgumentError("The provided client name is invalid: "+e.clientName);const t=e.stateKey||"state",r=e.urlPrefix||"",u=e.sessionStorageKey||"apiToken",c=n.Router();return c.get(r+"/login",function(n,i){const u=o.randomBytes(16).toString("hex");i.cookie(t,u);const c=new s.SessionManager(e.rta,e.domain,e.baseUrl).createAuthorizeUrl({redirectUri:a.getBaseUrl(n)+r+"/login/callback",scopes:e.scopes,expiration:e.expiration});i.redirect(c+"&state="+u)}),c.post(r+"/login/callback",i(),function(r,n,o){if(!r.cookies||r.cookies[t]!==r.body.state)return o(new s.ValidationError("Login failed. State mismatch."));return new s.SessionManager(e.rta,e.domain,e.baseUrl).create(r.body.id_token,r.body.access_token,{secret:e.secret,issuer:e.baseUrl,audience:e.audience}).then(function(e){n.header("Content-Type","text/html"),n.status(200).send('<html><head><script type="text/javascript">sessionStorage.setItem("'+u+'", "'+e+'");window.location.href = "'+a.getBaseUrl(r)+'";<\/script></head></html>')}).catch(function(e){o(e)})}),c.get(r+"/logout",function(t,r){const n=encodeURIComponent(a.getBaseUrl(t));r.header("Content-Type","text/html"),r.status(200).send('<html><head><script type="text/javascript">sessionStorage.removeItem("'+u+'");window.location.href = "https://'+e.rta+"/v2/logout/?returnTo="+n+"&client_id="+n+'";<\/script></head></html>')}),c.get("/.well-known/oauth2-client-configuration",function(t,n){n.header("Content-Type","application/json"),n.status(200).send({redirect_uris:[a.getBaseUrl(t)+r+"/login/callback"],client_name:e.clientName,post_logout_redirect_uris:[a.getBaseUrl(t)]})}),c}},function(e,t){e.exports=require("crypto")},function(e,t,r){"use strict";var n=r(53),o=r(54);function i(e){if("string"==typeof e&&"j:"===e.substr(0,2))try{return JSON.parse(e.slice(2))}catch(e){return}}function s(e){for(var t,r,n=Object.keys(e),o=0;o<n.length;o++)(r=i(e[t=n[o]]))&&(e[t]=r);return e}function a(e,t){if("string"==typeof e){if("s:"!==e.substr(0,2))return e;for(var r=!t||Array.isArray(t)?t||[]:[t],n=0;n<r.length;n++){var i=o.unsign(e.slice(2),r[n]);if(!1!==i)return i}return!1}}function u(e,t){for(var r,n,o,i=Object.keys(e),s=Object.create(null),u=0;u<i.length;u++)(o=e[n=i[u]])!==(r=a(o,t))&&(s[n]=r,delete e[n]);return s}e.exports=function(e,t){return function(r,o,i){if(r.cookies)return i();var a=r.headers.cookie,c=!e||Array.isArray(e)?e||[]:[e];if(r.secret=c[0],r.cookies=Object.create(null),r.signedCookies=Object.create(null),!a)return i();r.cookies=n.parse(a,t),0!==c.length&&(r.signedCookies=u(r.cookies,c),r.signedCookies=s(r.signedCookies)),r.cookies=s(r.cookies),i()}},e.exports.JSONCookie=i,e.exports.JSONCookies=s,e.exports.signedCookie=a,e.exports.signedCookies=u},function(e,t,r){"use strict";t.parse=function(e,t){if("string"!=typeof e)throw new TypeError("argument str must be a string");for(var r={},o=t||{},s=e.split(i),u=o.decode||n,c=0;c<s.length;c++){var l=s[c],p=l.indexOf("=");if(!(p<0)){var d=l.substr(0,p).trim(),h=l.substr(++p,l.length).trim();'"'==h[0]&&(h=h.slice(1,-1)),void 0==r[d]&&(r[d]=a(h,u))}}return r},t.serialize=function(e,t,r){var n=r||{},i=n.encode||o;if("function"!=typeof i)throw new TypeError("option encode is invalid");if(!s.test(e))throw new TypeError("argument name is invalid");var a=i(t);if(a&&!s.test(a))throw new TypeError("argument val is invalid");var u=e+"="+a;if(null!=n.maxAge){var c=n.maxAge-0;if(isNaN(c))throw new Error("maxAge should be a Number");u+="; Max-Age="+Math.floor(c)}if(n.domain){if(!s.test(n.domain))throw new TypeError("option domain is invalid");u+="; Domain="+n.domain}if(n.path){if(!s.test(n.path))throw new TypeError("option path is invalid");u+="; Path="+n.path}if(n.expires){if("function"!=typeof n.expires.toUTCString)throw new TypeError("option expires is invalid");u+="; Expires="+n.expires.toUTCString()}n.httpOnly&&(u+="; HttpOnly");n.secure&&(u+="; Secure");if(n.sameSite){var l="string"==typeof n.sameSite?n.sameSite.toLowerCase():n.sameSite;switch(l){case!0:u+="; SameSite=Strict";break;case"lax":u+="; SameSite=Lax";break;case"strict":u+="; SameSite=Strict";break;default:throw new TypeError("option sameSite is invalid")}}return u};var n=decodeURIComponent,o=encodeURIComponent,i=/; */,s=/^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;function a(e,t){try{return t(e)}catch(t){return e}}},function(e,t){e.exports=require("cookie-signature")},function(e,t,r){"use strict";var n=r(14),o=r(56),i=r(3),s=r(57),a=r(15),u=r(59),c=r(60);e.exports=function(e){a.setProvider(e);var t=n();return t.use(o.json()),t.use(o.urlencoded({extended:!1})),t.use("/meta",function(e,t){t.status(200).send(u)}),t.use(i.routes.dashboardAdmins({secret:a("EXTENSION_SECRET"),audience:"urn:user-import-export-extension",rta:a("AUTH0_RTA").replace("https://",""),domain:a("AUTH0_DOMAIN"),baseUrl:a("WT_URL"),clientName:"User Import / Export Extension",urlPrefix:"",sessionStorageKey:"user-import-export-extension:apiToken",scopes:"create:users read:users read:connections create:passwords_checking_job"})),t.get("*",c()),t.use(i.middlewares.errorHandler(s.error.bind(s))),t}},function(e,t){e.exports=require("body-parser")},function(e,t,r){"use strict";var n=r(58);n.emitErrs=!0;var o=new n.Logger({transports:[new n.transports.Console({timestamp:!0,level:"debug",handleExceptions:!0,json:!1,colorize:!0})],exitOnError:!1});e.exports=o,e.exports.stream={write:function(e){o.info(e.replace(/\n$/,""))}}},function(e,t){e.exports=require("winston")},function(e,t){e.exports={title:"DSA User Import / Export",name:"dsa-auth0-user-import-export",version:"2.3.1",author:"simon",useHashName:!1,description:"This DSA extension allows you to import/export users from/to your account.",type:"application",logoUrl:"https://cdn.rawgit.com/simonv3/auth0-user-import-export-extension/master/assets/logo.svg",initialUrlPath:"/login",docsUrl:"https://github.com/simonv3/auth0-user-import-export-extension/blob/master/README.md",repository:"https://github.com/simonv3/auth0-user-import-export-extension/",keywords:["auth0","extension"],auth0:{scopes:"create:users read:users read:connections create:passwords_checking_job"}}},function(e,t,r){"use strict";var n=r(61),o=r(15),i=r(3).urlHelpers;e.exports=function(){var e='\n    <!DOCTYPE html>\n    <html lang="en">\n    <head>\n      <title>DSA User Import / Export Dashboard</title>\n      <meta charset="UTF-8" />\n      <meta http-equiv="X-UA-Compatible" content="IE=Edge" />\n      <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n      <link rel="shortcut icon" href="https://cdn.auth0.com/styleguide/2.0.1/lib/logos/img/favicon.png">\n      <meta name="viewport" content="width=device-width, initial-scale=1">\n      <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/styles/zocial.min.css">\n      <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/manage/v0.3.973/css/index.min.css">\n      <link rel="stylesheet" type="text/css" href="https://cdn.auth0.com/styleguide/3.8.4/index.css">\n      <% if (assets.version) { %>\n        <link rel="stylesheet" type="text/css" href="//cdn.auth0.com/extensions/auth0-user-import-export/assets/auth0-user-import-export.ui.<%= assets.version %>.css">\n      <% } %>\n    </head>\n    <body>\n      <div id="app"></div>\n      <script type="text/javascript">window.config = <%- JSON.stringify(config) %>;<\/script>\n      <script type="text/javascript" src="//cdn.auth0.com/manage/v0.3.973/components/ZeroClipboard/ZeroClipboard.js"><\/script>\n      <script type="text/javascript" src="//cdn.auth0.com/manage/v0.3.973/js/bundle.js"><\/script>\n      <% if (assets.app) { %><script type="text/javascript" src="<%= assets.app %>"><\/script><% } %>\n      <% if (assets.version) { %>\n      <script type="text/javascript" src="//cdn.auth0.com/extensions/auth0-user-import-export/assets/auth0-user-import-export.ui.vendors.<%= assets.version %>.js"><\/script>\n      <script type="text/javascript" src="//cdn.auth0.com/extensions/auth0-user-import-export/assets/auth0-user-import-export.ui.<%= assets.version %>.js"><\/script>\n      <% } %>\n    </body>\n    </html>\n  ';return function(t,r){var s={HOSTING_ENV:o("HOSTING_ENV"),CLIENT_VERSION:"2.3.1",AUTH0_DOMAIN:o("AUTH0_DOMAIN"),BASE_URL:i.getBaseUrl(t),BASE_PATH:i.getBasePath(t)};0!==s.BASE_PATH.indexOf("/")&&(s.BASE_PATH="/"+s.BASE_PATH);return r.send(n.render(e,{config:s,assets:{version:"2.3.1"}}))}}},function(e,t){e.exports=require("ejs")}]);