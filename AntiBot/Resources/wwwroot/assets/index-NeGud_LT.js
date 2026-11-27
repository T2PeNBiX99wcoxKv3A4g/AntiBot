var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t,t.exports),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.for(`react.view_transition`),m=Symbol.iterator;function h(e){return typeof e!=`object`||!e?null:(e=m&&e[m]||e[`@@iterator`],typeof e==`function`?e:null)}var g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},_=Object.assign,v={};function y(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}y.prototype.isReactComponent={},y.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function b(){}b.prototype=y.prototype;function x(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}var S=x.prototype=new b;S.constructor=x,_(S,y.prototype),S.isPureReactComponent=!0;var C=Array.isArray;function ee(){}var w={H:null,A:null,T:null,S:null},te=Object.prototype.hasOwnProperty;function T(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function ne(e,t){return T(e.type,t,e.props)}function re(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function ie(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var ae=/\/+/g;function oe(e,t){return typeof e==`object`&&e&&e.key!=null?ie(``+e.key):t.toString(36)}function se(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(ee,ee):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function E(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,E(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+oe(e,0):a,C(o)?(i=``,c!=null&&(i=c.replace(ae,`$&/`)+`/`),E(o,r,i,``,function(e){return e})):o!=null&&(re(o)&&(o=ne(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(ae,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(C(e))for(var u=0;u<e.length;u++)a=e[u],s=l+oe(a,u),c+=E(a,r,i,s,o);else if(u=h(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+oe(a,u++),c+=E(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return E(se(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function ce(e,t,n){if(e==null)return e;var r=[],i=0;return E(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function le(e){if(e._status===-1){var t=e._result,n=t();n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t,n.status===void 0&&(n.status=`fulfilled`,n.value=t))},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t,n.status===void 0&&(n.status=`rejected`,n.reason=t))}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var ue=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)};function de(e){var t=w.T,n={};n.types=t===null?null:t.types,w.T=n;try{var r=e(),i=w.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(ee,ue)}catch(e){ue(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),w.T=t}}function fe(e){var t=w.T;if(t!==null){var n=t.types;n===null?t.types=[e]:n.indexOf(e)===-1&&n.push(e)}else de(fe.bind(null,e))}var pe={map:ce,forEach:function(e,t,n){ce(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ce(e,function(){t++}),t},toArray:function(e){return ce(e,function(e){return e})||[]},only:function(e){if(!re(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=pe,e.Component=y,e.Fragment=r,e.Profiler=a,e.PureComponent=x,e.StrictMode=i,e.Suspense=l,e.ViewTransition=p,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=w,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return w.H.useMemoCache(e)}},e.addTransitionType=fe,e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=_({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!te.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return T(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)te.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return T(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=re,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:le}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=de,e.unstable_useCacheRefresh=function(){return w.H.useCacheRefresh()},e.use=function(e){return w.H.use(e)},e.useActionState=function(e,t,n){return w.H.useActionState(e,t,n)},e.useCallback=function(e,t){return w.H.useCallback(e,t)},e.useContext=function(e){return w.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return w.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return w.H.useEffect(e,t)},e.useEffectEvent=function(e){return w.H.useEffectEvent(e)},e.useId=function(){return w.H.useId()},e.useImperativeHandle=function(e,t,n){return w.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return w.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return w.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return w.H.useMemo(e,t)},e.useOptimistic=function(e,t){return w.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return w.H.useReducer(e,t,n)},e.useRef=function(e){return w.H.useRef(e)},e.useState=function(e){return w.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return w.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return w.H.useTransition()},e.version=`19.3.1`})),u=o(((e,t)=>{t.exports=l()})),d=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m){if(n(c)!==null)m=!0,S||(S=!0,ne());else{var t=n(l);t!==null&&ae(x,t.startTime-e)}}}var S=!1,C=-1,ee=5,w=-1;function te(){return g?!0:!(e.unstable_now()-w<ee)}function T(){if(g=!1,S){var t=e.unstable_now();w=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&te());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&ae(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?ne():S=!1}}}var ne;if(typeof y==`function`)ne=function(){y(T)};else if(typeof MessageChannel<`u`){var re=new MessageChannel,ie=re.port2;re.port1.onmessage=T,ne=function(){ie.postMessage(null)}}else ne=function(){_(T,0)};function ae(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):ee=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,ae(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,ne()))),r},e.unstable_shouldYield=te,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),f=o(((e,t)=>{t.exports=d()})),p=o((e=>{var t=u();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`),o=Symbol.for(`react.recoverable`),s=Symbol.for(`react.optimistic_key`);function c(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:r===s?s:``+r,children:e,containerInfo:t,implementation:n}}var l=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.browser=function(e){return{$$typeof:o,_reason:e}},e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return c(e,t,null,r)},e.flushSync=function(e){var t=l.T,n=i.p;try{if(l.T=null,i.p=2,e)return e()}finally{l.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=d(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`){if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=d(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}}else t??i.d.M(e)}},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=d(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`){if(t){var n=d(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}else i.d.m(e)}},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return l.H.useFormState(e,t,n)},e.useFormStatus=function(){return l.H.useHostTransitionStatus()},e.version=`19.3.1`})),m=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=p()})),h=o((e=>{var t=f(),n=u(),r=m();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){for(var t=e,n=t;n&&!n.alternate;)t=n,t.flags&4098&&(e=t.return),n=t.return;for(;t.return;)t=t.return;return t.tag===3?e:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function d(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function p(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=p(e),t!==null)return t;e=e.sibling}return null}function h(e,t,n,r,i,a){for(;e!==null;){if((e.tag===5||e.tag===27||e.tag===6)&&n(e,r,i,a)||(e.tag!==22||e.memoizedState===null)&&(t||e.tag!==5&&e.tag!==27)&&h(e.child,t,n,r,i,a))return!0;e=e.sibling}return!1}function g(e){for(e=e.return;e!==null;){if(e.tag===3||e.tag===5||e.tag===27)return e;e=e.return}return null}function _(e){var t=!1;for(e=e.return;e!==null&&(e.tag===4&&(t=!0),e.tag!==3&&e.tag!==5&&e.tag!==27);)e=e.return;return t}function v(e){var t=[null,null],n=g(e);return n===null||y(t,e,n.child,{foundSelf:!1}),t}function y(e,t,n,r){for(;n!==null;){if(n===t)r.foundSelf=!0;else if(n.tag===5||n.tag===27||n.tag===6){if(r.foundSelf)return e[1]=n,!0;e[0]=n}else if((n.tag!==22||n.memoizedState===null)&&y(e,t,n.child,r))return!0;n=n.sibling}return!1}function b(e){switch(e.tag){case 5:case 27:case 6:return e.stateNode;case 3:return e.stateNode.containerInfo;default:throw Error(i(559))}}var x=null,S=null;function C(e,t,n){return e===n||e===t&&(x=e,!0)}function ee(e,t,n){return e===n?(S=e,!1):e===t&&(S!==null&&(x=e),!0)}function w(e){if(e===null)return null;do e=e===null?null:e.return;while(e&&e.tag!==5&&e.tag!==27&&e.tag!==3);return e||null}function te(e,t,n){for(var r=0,i=e;i;i=n(i))r++;i=0;for(var a=t;a;a=n(a))i++;for(;0<r-i;)e=n(e),r--;for(;0<i-r;)t=n(t),i--;for(;r--;){if(e===t||t!==null&&e===t.alternate)return e;e=n(e),t=n(t)}return null}var T=Object.assign,ne=Symbol.for(`react.element`),re=Symbol.for(`react.transitional.element`),ie=Symbol.for(`react.portal`),ae=Symbol.for(`react.fragment`),oe=Symbol.for(`react.strict_mode`),se=Symbol.for(`react.profiler`),E=Symbol.for(`react.consumer`),ce=Symbol.for(`react.context`),le=Symbol.for(`react.forward_ref`),ue=Symbol.for(`react.suspense`),de=Symbol.for(`react.suspense_list`),fe=Symbol.for(`react.memo`),pe=Symbol.for(`react.lazy`),me=Symbol.for(`react.activity`),he=Symbol.for(`react.legacy_hidden`),ge=Symbol.for(`react.memo_cache_sentinel`),_e=Symbol.for(`react.view_transition`),ve=Symbol.for(`react.recoverable`),D=Symbol.iterator;function ye(e){return typeof e!=`object`||!e?null:(e=D&&e[D]||e[`@@iterator`],typeof e==`function`?e:null)}var be=Symbol.for(`react.client.reference`);function xe(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===be?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case ae:return`Fragment`;case se:return`Profiler`;case oe:return`StrictMode`;case ue:return`Suspense`;case de:return`SuspenseList`;case me:return`Activity`;case _e:return`ViewTransition`}if(typeof e==`object`)switch(e.$$typeof){case ie:return`Portal`;case ce:return e.displayName||`Context`;case E:return(e._context.displayName||`Context`)+`.Consumer`;case le:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case fe:return t=e.displayName||null,t===null?xe(e.type)||`Memo`:t;case pe:t=e._payload,e=e._init;try{return xe(e(t))}catch{}}return null}var Se=Array.isArray,O=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,k=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,Ce={pending:!1,data:null,method:null,action:null},A=[],we=-1;function Te(e){return{current:e}}function Ee(e){0>we||(e.current=A[we],A[we]=null,we--)}function j(e,t){we++,A[we]=e.current,e.current=t}var De=Te(null),Oe=Te(null),ke=Te(null),Ae=Te(null);function je(e,t){switch(j(ke,t),j(Oe,e),j(De,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?up(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=up(t),e=dp(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}Ee(De),j(De,e)}function Me(){Ee(De),Ee(Oe),Ee(ke)}function Ne(e){var t=e.memoizedState;t!==null&&(sh._currentValue=t.memoizedState,j(Ae,e)),t=De.current;var n=dp(t,e.type);t!==n&&(j(Oe,e),j(De,n))}function Pe(e){Oe.current===e&&(Ee(De),Ee(Oe)),Ae.current===e&&(Ee(Ae),sh._currentValue=Ce)}var Fe,Ie;function Le(e){if(Fe===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);Fe=t&&t[1]||``,Ie=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+Fe+e+Ie}var Re=!1;function ze(e,t){if(!e||Re)return``;Re=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}n=!1;try{var i=Object.getOwnPropertyDescriptor(e.prototype,`props`);Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),n=!0,new e}finally{n&&(i===void 0?delete e.prototype.props:Object.defineProperty(e.prototype,"props",i))}}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{Re=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?Le(n):``}function Be(e,t){switch(e.tag){case 26:case 27:case 5:return Le(e.type);case 16:return Le(`Lazy`);case 13:return e.child!==t&&t!==null?Le(`Suspense Fallback`):Le(`Suspense`);case 19:return Le(`SuspenseList`);case 0:case 15:return ze(e.type,!1);case 11:return ze(e.type.render,!1);case 1:return ze(e.type,!0);case 31:return Le(`Activity`);case 30:return Le(`ViewTransition`);default:return``}}function Ve(e){try{var t=``,n=null;do t+=Be(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var He=Object.prototype.hasOwnProperty,Ue=t.unstable_scheduleCallback,We=t.unstable_cancelCallback,Ge=t.unstable_shouldYield,Ke=t.unstable_requestPaint,M=t.unstable_now,qe=t.unstable_getCurrentPriorityLevel,Je=t.unstable_ImmediatePriority,Ye=t.unstable_UserBlockingPriority,Xe=t.unstable_NormalPriority,Ze=t.unstable_LowPriority,Qe=t.unstable_IdlePriority,$e=t.log,et=t.unstable_setDisableYieldValue,tt=null,nt=null;function rt(e){if(typeof $e==`function`&&et(e),nt&&typeof nt.setStrictMode==`function`)try{nt.setStrictMode(tt,e)}catch{}}var N=Math.clz32?Math.clz32:ot,it=Math.log,at=Math.LN2;function ot(e){return e>>>=0,e===0?32:31-(it(e)/at|0)|0}var st=256,ct=262144,lt=4194304;function ut(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function dt(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=ut(n))):i=ut(o):i=ut(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=ut(n))):i=ut(o)):i=ut(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function ft(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function pt(e,t){t&8&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var r=31-N(n),i=1<<r;t|=e[r],n&=~i}return t}function mt(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ht(){var e=lt;return lt<<=1,!(lt&62914560)&&(lt=4194304),e}function gt(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function _t(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function vt(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-N(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&yt(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function yt(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-N(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function bt(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-N(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function xt(e,t){var n=t&-t;return n=n&42?1:P(n),(n&(e.suspendedLanes|t))===0?n:0}function P(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function St(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function F(){var e=k.p;return e===0?(e=window.event,e===void 0?32:Ch(e.type)):e}function Ct(e,t){var n=k.p;try{return k.p=e,t()}finally{k.p=n}}var wt=Math.random().toString(36).slice(2),Tt=`__reactFiber$`+wt,Et=`__reactProps$`+wt,Dt=`__reactContainer$`+wt,Ot=`__reactEvents$`+wt,kt=`__reactListeners$`+wt,At=`__reactHandles$`+wt,jt=`__reactResources$`+wt,Mt=`__reactMarker$`+wt,Nt=`__reactLoad$`+wt;function Pt(e){delete e[Tt],delete e[Et],delete e[kt],delete e[At]}function Ft(e){var t;if(t=e[Tt])return t;for(var n=e.parentNode;n;){if(t=n[Dt]||n[Tt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=fm(e);e!==null;){if(n=e[Tt])return n;e=fm(e)}return t}e=n,n=e.parentNode}return null}function It(e){if(e=e[Tt]||e[Dt]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Lt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function Rt(e){var t=e[jt];return t||=e[jt]={hoistableStyles:new Map,hoistableScripts:new Map},t}function zt(e){e[Mt]=!0}function Bt(e){e[Nt]=void 0}var Vt=new Set,Ht={};function Ut(e,t){Wt(e,t),Wt(e+`Capture`,t)}function Wt(e,t){for(Ht[e]=t,e=0;e<t.length;e++)Vt.add(t[e])}var Gt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Kt={},qt={};function Jt(e){return He.call(qt,e)?!0:He.call(Kt,e)?!1:Gt.test(e)?qt[e]=!0:(Kt[e]=!0,!1)}var I=!1;function Yt(){var e=I;return I=!1,e}function Xt(e,t,n){if(Jt(t)){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,n)}}}function Zt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,n)}}function Qt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,r)}}function L(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function $t(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function en(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function tn(e){if(!e._valueTracker){var t=$t(e)?`checked`:`value`;e._valueTracker=en(e,t,``+e[t])}}function nn(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=$t(e)?e.checked?`true`:`false`:e.value),e=r,e!==n&&(t.setValue(e),!0)}var rn=/[\n"\\]/g;function an(e){return e.replace(rn,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function on(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+L(t)):e.value!==``+L(t)&&(e.value=``+L(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):cn(e,L(n)):o===`number`&&e.value==t?cn(e,L(e.value)):cn(e,L(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+L(s):e.removeAttribute(`name`)}function sn(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){tn(e);return}n=n==null?``:``+L(n),t=t==null?n:``+L(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),tn(e)}function cn(e,t){e.defaultValue!==``+t&&(e.defaultValue=``+t)}function ln(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+L(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function un(e,t,n){t!=null&&(t=``+L(t),t!==e.value&&(e.value=t),n==null)?e.defaultValue!==t&&(e.defaultValue=t):e.defaultValue=n==null?``:``+L(n)}function dn(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(Se(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=L(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),tn(e)}function fn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var R=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function pn(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||R.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function mn(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``,I=!0);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&(pn(e,a,r),I=!0)}else for(var o in t)t.hasOwnProperty(o)&&pn(e,o,t[o])}function hn(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var gn=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`maskType`,`mask-type`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),_n=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function vn(e){return _n.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function yn(){}var bn=null;function xn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Sn=null,Cn=null;function wn(e){var t=It(e);if(t&&(e=t.stateNode)){var n=e[Et]||null;a:switch(e=t.stateNode,t.type){case`input`:if(on(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+an(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[Et]||null;if(!a)throw Error(i(90));on(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&nn(r)}break a;case`textarea`:un(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&ln(e,!!n.multiple,t,!1)}}}var Tn=!1;function En(e,t,n){if(Tn)return e(t,n);Tn=!0;try{return e(t)}finally{if(Tn=!1,(Sn!==null||Cn!==null)&&(zd(),Sn&&(t=Sn,e=Cn,Cn=Sn=null,wn(t),e)))for(t=0;t<e.length;t++)wn(e[t])}}function Dn(e,t){var n=e.stateNode;if(n===null)return null;var r=n[Et]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=e!==`button`&&e!==`input`&&e!==`select`&&e!==`textarea`),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var On=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,kn=!1;if(On)try{var An={};Object.defineProperty(An,"passive",{get:function(){kn=!0}}),window.addEventListener(`test`,An,An),window.removeEventListener(`test`,An,An)}catch{kn=!1}var jn=null,Mn=null,Nn=null;function Pn(){if(Nn)return Nn;var e,t=Mn,n=t.length,r,i=`value`in jn?jn.value:jn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return Nn=i.slice(e,1<r?1-r:void 0)}function Fn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function In(){return!0}function Ln(){return!1}function Rn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?In:Ln,this.isPropagationStopped=Ln,this}return T(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=In)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=In)},persist:function(){},isPersistent:In}),t}var zn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Bn=Rn(zn),Vn=T({},zn,{view:0,detail:0}),Hn=Rn(Vn),Un,Wn,Gn,Kn=T({},Vn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:rr,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Gn&&(Gn&&e.type===`mousemove`?(Un=e.screenX-Gn.screenX,Wn=e.screenY-Gn.screenY):Wn=Un=0,Gn=e),Un)},movementY:function(e){return`movementY`in e?e.movementY:Wn}}),qn=Rn(Kn),Jn=Rn(T({},Kn,{dataTransfer:0})),Yn=Rn(T({},Vn,{relatedTarget:0})),Xn=Rn(T({},zn,{animationName:0,elapsedTime:0,pseudoElement:0})),Zn=Rn(T({},zn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Qn=Rn(T({},zn,{data:0})),$n={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},er={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},tr={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function nr(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=tr[e])?!!t[e]:!1}function rr(){return nr}var ir=Rn(T({},Vn,{key:function(e){if(e.key){var t=$n[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=Fn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?er[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:rr,charCode:function(e){return e.type===`keypress`?Fn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?Fn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),ar=Rn(T({},Kn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),or=Rn(T({},zn,{submitter:0})),sr=Rn(T({},Vn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:rr})),cr=Rn(T({},zn,{propertyName:0,elapsedTime:0,pseudoElement:0})),lr=Rn(T({},Kn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),ur=Rn(T({},zn,{newState:0,oldState:0,source:0})),dr=[9,13,27,32],fr=On&&`CompositionEvent`in window,pr=null;On&&`documentMode`in document&&(pr=document.documentMode);var mr=On&&`TextEvent`in window&&!pr,hr=On&&(!fr||pr&&8<pr&&11>=pr),gr=` `,_r=!1;function vr(e,t){switch(e){case`keyup`:return dr.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function yr(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var br=!1;function xr(e,t){switch(e){case`compositionend`:return yr(t);case`keypress`:return t.which===32?(_r=!0,gr):null;case`textInput`:return e=t.data,e===gr&&_r?null:e;default:return null}}function Sr(e,t){if(br)return e===`compositionend`||!fr&&vr(e,t)?(e=Pn(),Nn=Mn=jn=null,br=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return hr&&t.locale!==`ko`?null:t.data;default:return null}}var Cr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function wr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!Cr[e.type]:t===`textarea`}function Tr(e,t,n,r){Sn?Cn?Cn.push(r):Cn=[r]:Sn=r,t=Jf(t,`onChange`),0<t.length&&(n=new Bn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var Er=null,Dr=null;function Or(e){Vf(e,0)}function kr(e){if(nn(Lt(e)))return e}function Ar(e,t){if(e===`change`)return t}var jr=!1;if(On){var Mr;if(On){var Nr=`oninput`in document;if(!Nr){var Pr=document.createElement(`div`);Pr.setAttribute(`oninput`,`return;`),Nr=typeof Pr.oninput==`function`}Mr=Nr}else Mr=!1;jr=Mr&&(!document.documentMode||9<document.documentMode)}function Fr(){Er&&(Er.detachEvent(`onpropertychange`,Ir),Dr=Er=null)}function Ir(e){if(e.propertyName===`value`&&kr(Dr)){var t=[];Tr(t,Dr,e,xn(e)),En(Or,t)}}function Lr(e,t,n){e===`focusin`?(Fr(),Er=t,Dr=n,Er.attachEvent(`onpropertychange`,Ir)):e===`focusout`&&Fr()}function Rr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return kr(Dr)}function zr(e,t){if(e===`click`)return kr(t)}function Br(e,t){if(e===`input`||e===`change`)return kr(t)}function Vr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Hr=typeof Object.is==`function`?Object.is:Vr;function Ur(e,t){if(Hr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!He.call(t,i)||!Hr(e[i],t[i]))return!1}return!0}function Wr(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}function Gr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Kr(e,t){var n=Gr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Gr(n)}}function qr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?qr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Jr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Wr(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Wr(e.document)}return t}function Yr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Xr=On&&`documentMode`in document&&11>=document.documentMode,Zr=null,Qr=null,$r=null,ei=!1;function ti(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ei||Zr==null||Zr!==Wr(r)||(r=Zr,`selectionStart`in r&&Yr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),$r&&Ur($r,r)||($r=r,r=Jf(Qr,`onSelect`),0<r.length&&(t=new Bn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Zr)))}function ni(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var ri={animationend:ni(`Animation`,`AnimationEnd`),animationiteration:ni(`Animation`,`AnimationIteration`),animationstart:ni(`Animation`,`AnimationStart`),transitionrun:ni(`Transition`,`TransitionRun`),transitionstart:ni(`Transition`,`TransitionStart`),transitioncancel:ni(`Transition`,`TransitionCancel`),transitionend:ni(`Transition`,`TransitionEnd`)},ii={},ai={};On&&(ai=document.createElement(`div`).style,`AnimationEvent`in window||(delete ri.animationend.animation,delete ri.animationiteration.animation,delete ri.animationstart.animation),`TransitionEvent`in window||delete ri.transitionend.transition);function oi(e){if(ii[e])return ii[e];if(!ri[e])return e;var t=ri[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in ai)return ii[e]=t[n];return e}var si=oi(`animationend`),ci=oi(`animationiteration`),li=oi(`animationstart`),ui=oi(`transitionrun`),di=oi(`transitionstart`),fi=oi(`transitioncancel`),pi=oi(`transitionend`),mi=new Map,hi=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);hi.push(`scrollEnd`);function gi(e,t){mi.set(e,t),Ut(t,[e])}var _i=0;function vi(e,t){if(e.name!=null&&e.name!==`auto`)return e.name;if(t.autoName!==null)return t.autoName;e=bd.identifierPrefix;var n=_i++;return e=`_`+e+`t_`+n.toString(32)+`_`,t.autoName=e}function yi(e){if(e==null||typeof e==`string`)return e;var t=null,n=Od;if(n!==null)for(var r=0;r<n.length;r++){var i=e[n[r]];if(i!=null){if(i===`none`)return`none`;t=t==null?i:t+(` `+i)}}return t??e.default}function bi(e,t){return e=yi(e),t=yi(t),t==null?e===`auto`?null:e:t===`auto`?null:t}var xi=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},z=[],Si=0,B=0;function Ci(){for(var e=Si,t=B=Si=0;t<e;){var n=z[t];z[t++]=null;var r=z[t];z[t++]=null;var i=z[t];z[t++]=null;var a=z[t];if(z[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&Di(n,i,a)}}function wi(e,t,n,r){z[Si++]=e,z[Si++]=t,z[Si++]=n,z[Si++]=r,B|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function Ti(e,t,n,r){return wi(e,t,n,r),Oi(e)}function Ei(e,t){return wi(e,null,null,t),Oi(e)}function Di(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-N(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function Oi(e){if(50<kd)throw kd=0,Ad=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var ki={};function Ai(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function ji(e,t,n,r){return new Ai(e,t,n,r)}function Mi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Ni(e,t){var n=e.alternate;return n===null?(n=ji(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&1206910976,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Pi(e,t){e.flags&=1206910978;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Fi(e,t,n,r,a,o){var s=0;if(r=e,typeof r==`function`)Mi(r)&&(s=1);else if(typeof r==`string`)s=qm(e,n,De.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(r){case me:return e=ji(31,n,t,a),e.elementType=me,e.lanes=o,e;case ae:return V(n.children,a,o,t);case oe:s=8,a|=24;break;case se:return e=ji(12,n,t,a|2),e.elementType=se,e.lanes=o,e;case ue:return e=ji(13,n,t,a),e.elementType=ue,e.lanes=o,e;case de:return e=ji(19,n,t,a),e.elementType=de,e.lanes=o,e;case he:case _e:return e=a|32,e=ji(30,n,t,e),e.elementType=_e,e.lanes=o,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof r==`object`&&r)switch(r.$$typeof){case ce:s=10;break a;case E:s=9;break a;case le:s=11;break a;case fe:s=14;break a;case pe:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=ji(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function V(e,t,n,r){return e=ji(7,e,r,t),e.lanes=n,e}function Ii(e,t,n){return e=ji(6,e,null,t),e.lanes=n,e}function Li(e){var t=ji(18,null,null,0);return t.stateNode=e,t}function Ri(e,t,n){return t=ji(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var zi=new WeakMap;function Bi(e,t){if(typeof e==`object`&&e){var n=zi.get(e);return n===void 0?(t={value:e,source:t,stack:Ve(t)},zi.set(e,t),t):n}return{value:e,source:t,stack:Ve(t)}}var Vi=[],Hi=0,Ui=null,Wi=0,Gi=[],Ki=0,qi=null,H=1,Ji=``;function Yi(e,t){Vi[Hi++]=Wi,Vi[Hi++]=Ui,Ui=e,Wi=t}function Xi(e,t,n){Gi[Ki++]=H,Gi[Ki++]=Ji,Gi[Ki++]=qi,qi=e;var r=H;e=Ji;var i=32-N(r)-1;r&=~(1<<i),n+=1;var a=32-N(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,H=1<<32-N(t)+i|n<<i|r,Ji=a+e}else H=1<<a|n<<i|r,Ji=e}function Zi(e){e.return!==null&&(Yi(e,1),Xi(e,1,0))}function Qi(e){for(;e===Ui;)Ui=Vi[--Hi],Vi[Hi]=null,Wi=Vi[--Hi],Vi[Hi]=null;for(;e===qi;)qi=Gi[--Ki],Gi[Ki]=null,Ji=Gi[--Ki],Gi[Ki]=null,H=Gi[--Ki],Gi[Ki]=null}function $i(e,t){Gi[Ki++]=H,Gi[Ki++]=Ji,Gi[Ki++]=qi,H=t.id,Ji=t.overflow,qi=e}var ea=null,U=null,W=!1,ta=null,na=!1,ra=Error(i(519));function ia(e){throw ua(Bi(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),ra}function aa(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[Tt]=e,t[Et]=r,n){case`dialog`:Q(`cancel`,t),Q(`close`,t);break;case`iframe`:case`object`:case`embed`:Q(`load`,t);break;case`video`:case`audio`:for(n=0;n<zf.length;n++)Q(zf[n],t);break;case`source`:Q(`error`,t);break;case`img`:case`image`:case`link`:Q(`error`,t),Q(`load`,t);break;case`details`:Q(`toggle`,t);break;case`input`:Q(`invalid`,t),sn(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Q(`invalid`,t);break;case`textarea`:Q(`invalid`,t),dn(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||ep(t.textContent,n)?(r.popover!=null&&(Q(`beforetoggle`,t),Q(`toggle`,t)),r.onScroll!=null&&Q(`scroll`,t),r.onScrollEnd!=null&&Q(`scrollend`,t),r.onClick!=null&&(t.onclick=yn),t=!0):t=!1,t||ia(e,!0)}function oa(e){for(ea=e.return;ea;)switch(ea.tag){case 5:case 31:case 13:na=!1;return;case 27:case 3:na=!0;return;default:ea=ea.return}}function sa(e){if(e!==ea)return!1;if(!W)return oa(e),W=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=n===`form`||n===`button`||pp(e.type,e.memoizedProps)),n=!n),n&&U&&ia(e),oa(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));U=dm(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));U=dm(e)}else t===27?(t=U,Sp(e.type)?(e=um,um=null,U=e):U=t):U=ea?lm(e.stateNode.nextSibling):null;return!0}function ca(){U=ea=null,W=!1}function la(){var e=ta;return e!==null&&(fd===null?fd=e:fd.push.apply(fd,e),ta=null),e}function ua(e){ta===null?ta=[e]:ta.push(e)}var da=Te(null),fa=null,pa=null;function ma(e,t,n){j(da,t._currentValue),t._currentValue=n}function ha(e){e._currentValue=da.current,Ee(da)}function ga(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function _a(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),ga(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),ga(s,n,e),s=null}else a.tag===13&&a.memoizedState!==null&&a.memoizedState.dehydrated===null?(a.lanes|=n,s=a.alternate,s!==null&&(s.lanes|=n),ga(a.return,n,e),s=a.child,s=s===null?null:s.sibling):s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function va(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;Hr(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===Ae.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[sh]:e.push(sh))}a=a.return}return e!==null&&_a(t,e,n,r),t.flags|=262144,e!==null}function ya(e){for(e=e.firstContext;e!==null;){if(!Hr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function ba(e){fa=e,pa=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function xa(e){return Ca(fa,e)}function Sa(e,t){return fa===null&&ba(e),Ca(e,t)}function Ca(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},pa===null){if(e===null)throw Error(i(308));pa=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else pa=pa.next=t;return n}var wa=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},Ta=t.unstable_scheduleCallback,Ea=t.unstable_NormalPriority,Da={$$typeof:ce,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Oa(){return{controller:new wa,data:new Map,refCount:0}}function ka(e){e.refCount--,e.refCount===0&&Ta(Ea,function(){e.controller.abort()})}function Aa(e,t){if(e.pendingLanes&4194048){var n=e.transitionTypes;for(n===null&&(n=e.transitionTypes=[]),e=0;e<t.length;e++){var r=t[e];n.indexOf(r)===-1&&n.push(r)}}}var ja=null;function Ma(e){var t=e.transitionTypes;return e.transitionTypes=null,t}var Na=null,Pa=0,Fa=0,Ia=null;function La(e,t){if(Na===null){var n=Na=[];Pa=0,Fa=Pf(),Ia={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return Pa++,t.then(Ra,Ra),t}function Ra(){if(--Pa===0&&(ja=null,Na!==null)){Ia!==null&&(Ia.status=`fulfilled`);var e=Na;Na=null,Fa=0,Ia=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function za(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var Ba=O.S;O.S=function(e,t){if(hd=M(),typeof t==`object`&&t&&typeof t.then==`function`&&La(e,t),ja!==null)for(var n=bf;n!==null;)Aa(n,ja),n=n.next;if(n=e.types,n!==null){for(var r=bf;r!==null;)Aa(r,n),r=r.next;if(Fa!==0){r=ja,r===null&&(r=ja=[]);for(var i=0;i<n.length;i++){var a=n[i];r.indexOf(a)===-1&&r.push(a)}}}Ba!==null&&Ba(e,t)};var Va=Te(null);function Ha(){var e=Va.current;return e===null?Qu.pooledCache:e}function Ua(e,t){t===null?j(Va,Va.current):j(Va,t.pool)}function Wa(){var e=Ha();return e===null?null:{parent:Da._currentValue,pool:e}}var Ga=Error(i(460)),Ka=Error(i(474)),qa=Error(i(542)),Ja={then:function(){}};function Ya(e){return e=e.status,e===`fulfilled`||e===`rejected`}function Xa(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(yn,yn),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,eo(e),e===void 0&&!(`reason`in t)?Error(i(600)):e;default:if(typeof t.status==`string`)t.then(yn,yn);else{if(e=Qu,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,eo(e),e}throw Qa=t,Ga}}function Za(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(Qa=e,Ga):e}}var Qa=null;function $a(){if(Qa===null)throw Error(i(459));var e=Qa;return Qa=null,e}function eo(e){if(e===Ga||e===qa)throw Error(i(483))}var to=null,no=0;function ro(e){var t=no;return no+=1,to===null&&(to=[]),Xa(to,e,t)}function io(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function ao(e,t){throw t.$$typeof===ne?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function oo(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=Ni(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=134217730,n):(r=r.index,r<n?(t.flags|=2,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=134217730),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=Ii(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===ae?(e=d(e,t,n.props.children,r,n.key),io(e,n),e):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===pe&&Za(i)===t.type)?(t=a(t,n.props),io(t,n),t.return=e,t):(t=Fi(n.type,n.key,n.props,null,e.mode,r),io(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=Ri(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=V(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=Ii(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case re:return n=Fi(t.type,t.key,t.props,null,e.mode,n),io(n,t),n.return=e,n;case ie:return t=Ri(t,e.mode,n),t.return=e,t;case pe:return t=Za(t),f(e,t,n)}if(Se(t)||ye(t))return t=V(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,ro(t),n);if(t.$$typeof===ce)return f(e,Sa(e,t),n);ao(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case re:return n.key===i?l(e,t,n,r):null;case ie:return n.key===i?u(e,t,n,r):null;case pe:return n=Za(n),p(e,t,n,r)}if(Se(n)||ye(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,ro(n),r);if(n.$$typeof===ce)return p(e,t,Sa(e,n),r);ao(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case re:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case ie:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case pe:return r=Za(r),m(e,t,n,r,i)}if(Se(r)||ye(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,ro(r),i);if(r.$$typeof===ce)return m(e,t,n,Sa(t,r),i);ao(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),W&&Yi(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return W&&Yi(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&(_=g.alternate,_!==null&&d.delete(_.key===null?h:_.key)),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),W&&Yi(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),W&&Yi(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return W&&Yi(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&(_=v.alternate,_!==null&&h.delete(_.key===null?g:_.key)),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),W&&Yi(a,g),u}function _(e,r,o,c){if(typeof o==`object`&&o&&o.type===ae&&o.key===null&&o.props.ref===void 0&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case re:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===ae){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),io(c,o),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===pe&&Za(l)===r.type){n(e,r.sibling),c=a(r,o.props),io(c,o),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}o.type===ae?(c=V(o.props.children,e.mode,c,o.key),io(c,o),c.return=e,e=c):(c=Fi(o.type,o.key,o.props,null,e.mode,c),io(c,o),c.return=e,e=c)}return s(e);case ie:a:{for(l=o.key;r!==null;){if(r.key===l){if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}c=Ri(o,e.mode,c),c.return=e,e=c}return s(e);case pe:return o=Za(o),_(e,r,o,c)}if(Se(o))return h(e,r,o,c);if(ye(o)){if(l=ye(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return _(e,r,ro(o),c);if(o.$$typeof===ce)return _(e,r,Sa(e,o),c);ao(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=Ii(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{no=0;var i=_(e,t,n,r);return to=null,i}catch(t){if(t===Ga||t===qa)throw t;var a=ji(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var so=oo(!0),co=oo(!1),lo=!1;function uo(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function fo(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function po(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function mo(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,J&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=Oi(e),Di(e,null,n),t}return wi(e,r,t,n),Oi(e)}function ho(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,bt(e,n)}}function go(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n}else e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var _o=!1;function vo(){if(_o){var e=Ia;if(e!==null)throw e}}function yo(e,t,n,r){_o=!1;var i=e.updateQueue;lo=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(X&f)===f:(r&f)===f){f!==0&&f===Fa&&(_o=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,h=s;f=t;var g=n;switch(h.tag){case 1:if(m=h.payload,typeof m==`function`){d=m.call(g,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=h.payload,f=typeof m==`function`?m.call(g,d,f):m,f==null)break a;d=T({},d,f);break a;case 2:lo=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),od|=o,e.lanes=o,e.memoizedState=d}}function bo(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function xo(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)bo(n[e],t)}var So=Te(null),Co=Te(0);function wo(e,t){e=id,j(Co,e),j(So,t),id=e|t.baseLanes}function To(){j(Co,id),j(So,So.current)}function Eo(){id=Co.current,Ee(So),Ee(Co)}var Do=Te(null),Oo=null;function ko(e){var t=e.alternate;j(Po,Po.current&1),j(Do,e),Oo===null&&(t===null||So.current!==null||t.memoizedState!==null)&&(Oo=e)}function Ao(e){j(Po,Po.current),j(Do,e),Oo===null&&(Oo=e)}function jo(e){e.tag===22?(j(Po,Po.current),j(Do,e),Oo===null&&(Oo=e)):Mo()}function Mo(){j(Po,Po.current),j(Do,Do.current)}function No(e){Ee(Do),Oo===e&&(Oo=null),Ee(Po)}var Po=Te(0);function Fo(e,t){j(Do,Do.current),j(Po,t)}function Io(e){Ee(Po),Ee(Do),Oo===e&&(Oo=null)}function Lo(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||om(n)||sm(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==`independent`){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Ro=0,G=null,zo=null,Bo=null,Vo=!1,Ho=!1,Uo=!1,Wo=0,Go=0,Ko=null,qo=0;function Jo(){throw Error(i(321))}function Yo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Hr(e[n],t[n]))return!1;return!0}function Xo(e,t,n,r,i,a){return Ro=a,G=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,O.H=e===null||e.memoizedState===null?fc:pc,Uo=!1,a=n(r,i),Uo=!1,Ho&&(a=Qo(t,n,r,i)),Zo(e),a}function Zo(e){O.H=dc;var t=zo!==null&&zo.next!==null;if(Ro=0,Bo=zo=G=null,Vo=!1,Go=0,Ko=null,t)throw Error(i(300));e===null||Ac||(e=e.dependencies,e!==null&&ya(e)&&(Ac=!0))}function Qo(e,t,n,r){G=e;var a=0;do{if(Ho&&(Ko=null),Go=0,Ho=!1,25<=a)throw Error(i(301));if(a+=1,Bo=zo=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}O.H=mc,o=t(n,r)}while(Ho);return o}function $o(){var e=O.H,t=e.useState()[0];return t=typeof t.then==`function`?os(t):t,e=e.useState()[0],(zo===null?null:zo.memoizedState)!==e&&(G.flags|=1024),t}function es(){var e=Wo!==0;return Wo=0,e}function ts(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function ns(e){if(Vo){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Vo=!1}Ro=0,Bo=zo=G=null,Ho=!1,Go=Wo=0,Ko=null}function rs(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Bo===null?G.memoizedState=Bo=e:Bo=Bo.next=e,Bo}function is(){if(zo===null){var e=G.alternate;e=e===null?null:e.memoizedState}else e=zo.next;var t=Bo===null?G.memoizedState:Bo.next;if(t!==null)Bo=t,zo=e;else{if(e===null)throw G.alternate===null?Error(i(467)):Error(i(310));zo=e,e={memoizedState:zo.memoizedState,baseState:zo.baseState,baseQueue:zo.baseQueue,queue:zo.queue,next:null},Bo===null?G.memoizedState=Bo=e:Bo=Bo.next=e}return Bo}function as(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function os(e){var t=Go;return Go+=1,Ko===null&&(Ko=[]),e=Xa(Ko,e,t),t=G,(Bo===null?t.memoizedState:Bo.next)===null&&(t=t.alternate,O.H=t===null||t.memoizedState===null?fc:pc),e}function ss(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return os(e);if(e.$$typeof===ve)return;if(e.$$typeof===ce)return xa(e)}throw Error(i(438,String(e)))}function cs(e){var t=null,n=G.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=G.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=as(),G.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=ge;return t.index++,n}function ls(e,t){return typeof t==`function`?t(e):t}function us(e){return ds(is(),zo,e)}function ds(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(Ro&f)===f:(X&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===Fa&&(d=!0);else if((Ro&p)===p){u=u.next,p===Fa&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,G.lanes|=p,od|=p;f=u.action,Uo&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,G.lanes|=f,od|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!Hr(o,e.memoizedState)&&(Ac=!0,d&&(n=Ia,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function fs(e){var t=is(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);Hr(o,t.memoizedState)||(Ac=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function ps(e,t,n){var r=G,a=is(),o=W;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!Hr((zo||a).memoizedState,n);if(s&&(a.memoizedState=n,Ac=!0),a=a.queue,Ls(gs.bind(null,r,a,e),[e]),e=a.getSnapshot!==t||s||Bo!==null&&!!(Bo.memoizedState.tag&1),Ms(e?9:8,{destroy:void 0},hs.bind(null,r,a,n,t),null),e){if(r.flags|=2048,Qu===null)throw Error(i(349));o||Ro&127||ms(r,t,n)}return n}function ms(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=G.updateQueue,t===null?(t=as(),G.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function hs(e,t,n,r){t.value=n,t.getSnapshot=r,_s(t)&&K(e)}function gs(e,t,n){return n(function(){_s(t)&&K(e)})}function _s(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Hr(e,n)}catch{return!0}}function K(e){var t=Ei(e,2);t!==null&&Pd(t,e,2)}function vs(e){var t=rs();if(typeof e==`function`){var n=e;if(e=n(),Uo){rt(!0);try{n()}finally{rt(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ls,lastRenderedState:e},t}function ys(e,t,n,r){return e.baseState=n,ds(e,zo,typeof r==`function`?r:ls)}function bs(e,t,n,r,a){if(cc(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};O.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,xs(t,o)):(o.next=n.next,t.pending=n.next=o)}}function xs(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=O.T,o={};o.types=a===null?null:a.types,O.T=o;try{var s=n(i,r),c=O.S;c!==null&&c(o,s),Ss(e,t,s)}catch(n){ws(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),O.T=a}}else try{a=n(i,r),Ss(e,t,a)}catch(n){ws(e,t,n)}}function Ss(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){Cs(e,t,n)},function(n){return ws(e,t,n)}):Cs(e,t,n)}function Cs(e,t,n){t.status=`fulfilled`,t.value=n,Ts(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,xs(e,n)))}function ws(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,Ts(t),t=t.next;while(t!==r)}e.action=null}function Ts(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Es(e,t){return t}function Ds(e,t){if(W){var n=Qu.formState;if(n!==null){a:{var r=G;if(W){if(U){b:{for(var i=U,a=na;i.nodeType!==8;)if(!a||(i=lm(i.nextSibling),i===null)){i=null;break b}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){U=lm(i.nextSibling),r=i.data===`F!`;break a}}ia(r)}r=!1}r&&(t=n[0])}}return n=rs(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Es,lastRenderedState:t},n.queue=r,n=ac.bind(null,G,r),r.dispatch=n,r=vs(!1),a=sc.bind(null,G,!1,r.queue),r=rs(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=bs.bind(null,G,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function Os(e){return ks(is(),zo,e)}function ks(e,t,n){if(t=ds(e,t,Es)[0],e=us(ls)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=os(t)}catch(e){throw e===Ga?qa:e}else r=t;t=is();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(G.flags|=2048,Ms(9,{destroy:void 0},As.bind(null,i,n),null)),[r,a,e]}function As(e,t){e.action=t}function js(e){var t=is(),n=zo;if(n!==null)return ks(t,n,e);is(),t=t.memoizedState,n=is();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function Ms(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=G.updateQueue,t===null&&(t=as(),G.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function Ns(){return is().memoizedState}function Ps(e,t,n,r){var i=rs();G.flags|=e,i.memoizedState=Ms(1|t,{destroy:void 0},n,r===void 0?null:r)}function Fs(e,t,n,r){var i=is();r=r===void 0?null:r;var a=i.memoizedState.inst;zo!==null&&r!==null&&Yo(r,zo.memoizedState.deps)?i.memoizedState=Ms(t,a,n,r):(G.flags|=e,i.memoizedState=Ms(1|t,a,n,r))}function Is(e,t){Ps(8390656,8,e,t)}function Ls(e,t){Fs(2048,8,e,t)}function Rs(e){G.flags|=4;var t=G.updateQueue;if(t===null)t=as(),G.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function zs(e){var t=is().memoizedState;return Rs({ref:t,nextImpl:e}),function(){if(J&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function Bs(e,t){return Fs(4,2,e,t)}function Vs(e,t){return Fs(4,4,e,t)}function Hs(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Us(e,t,n){n=n==null?null:n.concat([e]),Fs(4,4,Hs.bind(null,t,e),n)}function Ws(){}function Gs(e,t){var n=is();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&Yo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Ks(e,t){var n=is();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&Yo(t,r[1]))return r[0];if(r=e(),Uo){rt(!0);try{e()}finally{rt(!1)}}return n.memoizedState=[r,t],r}function qs(e,t,n){return n===void 0||Ro&1073741824&&!(X&261930)?e.memoizedState=t:(e.memoizedState=n,e=Md(),G.lanes|=e,od|=e,n)}function Js(e,t,n,r){return Hr(n,t)?n:So.current===null?!(Ro&106)||Ro&1073741824&&!(X&261930)?(Ac=!0,e.memoizedState=n):(e=Md(),G.lanes|=e,od|=e,t):(e=qs(e,n,r),Hr(e,t)||(Ac=!0),e)}function Ys(e,t,n,r,i){var a=k.p;k.p=a!==0&&8>a?a:8;var o=O.T,s={};s.types=o===null?null:o.types,O.T=s,sc(e,!1,t,n);try{var c=i(),l=O.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?oc(e,t,za(c,r),jd(e)):oc(e,t,r,jd(e))}catch(n){oc(e,t,{then:function(){},status:`rejected`,reason:n},jd())}finally{k.p=a,o!==null&&s.types!==null&&(o.types=s.types),O.T=o}}function Xs(){}function Zs(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=Qs(e).queue;Ys(e,a,t,Ce,n===null?Xs:function(){return $s(e),n(r)})}function Qs(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:Ce,baseState:Ce,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ls,lastRenderedState:Ce},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ls,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function $s(e){var t=Qs(e);t.next===null&&(t=e.alternate.memoizedState),oc(e,t.next.queue,{},jd())}function ec(){return xa(sh)}function tc(){return is().memoizedState}function nc(){return is().memoizedState}function rc(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=jd();e=po(n);var r=mo(t,e,n);r!==null&&(Pd(r,t,n),ho(r,t,n)),t={cache:Oa()},e.payload=t;return}t=t.return}}function ic(e,t,n){var r=jd();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},cc(e)?lc(t,n):(n=Ti(e,t,n,r),n!==null&&(Pd(n,e,r),uc(n,t,r)))}function ac(e,t,n){oc(e,t,n,jd())}function oc(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(cc(e))lc(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Hr(s,o))return wi(e,t,i,0),Qu===null&&Ci(),!1}catch{}if(n=Ti(e,t,i,r),n!==null)return Pd(n,e,r),uc(n,t,r),!0}return!1}function sc(e,t,n,r){if(r={lane:2,revertLane:Pf(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},cc(e)){if(t)throw Error(i(479))}else t=Ti(e,n,r,2),t!==null&&Pd(t,e,2)}function cc(e){var t=e.alternate;return e===G||t!==null&&t===G}function lc(e,t){Ho=Vo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function uc(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,bt(e,n)}}var dc={readContext:xa,use:ss,useCallback:Jo,useContext:Jo,useEffect:Jo,useImperativeHandle:Jo,useLayoutEffect:Jo,useInsertionEffect:Jo,useMemo:Jo,useReducer:Jo,useRef:Jo,useState:Jo,useDebugValue:Jo,useDeferredValue:Jo,useTransition:Jo,useSyncExternalStore:Jo,useId:Jo,useHostTransitionStatus:Jo,useFormState:Jo,useActionState:Jo,useOptimistic:Jo,useMemoCache:Jo,useCacheRefresh:Jo,useEffectEvent:Jo},fc={readContext:xa,use:ss,useCallback:function(e,t){return rs().memoizedState=[e,t===void 0?null:t],e},useContext:xa,useEffect:Is,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),Ps(4194308,4,Hs.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Ps(4194308,4,e,t)},useInsertionEffect:function(e,t){Ps(4,2,e,t)},useMemo:function(e,t){var n=rs();t=t===void 0?null:t;var r=e();if(Uo){rt(!0);try{e()}finally{rt(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=rs();if(n!==void 0){var i=n(t);if(Uo){rt(!0);try{n(t)}finally{rt(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=ic.bind(null,G,e),[r.memoizedState,e]},useRef:function(e){var t=rs();return e={current:e},t.memoizedState=e},useState:function(e){e=vs(e);var t=e.queue,n=ac.bind(null,G,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Ws,useDeferredValue:function(e,t){return qs(rs(),e,t)},useTransition:function(){var e=vs(!1);return e=Ys.bind(null,G,e.queue,!0,!1),rs().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=G,a=rs();if(W){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),Qu===null)throw Error(i(349));X&127||ms(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,Is(gs.bind(null,r,o,e),[e]),r.flags|=2048,Ms(9,{destroy:void 0},hs.bind(null,r,o,n,t),null),n},useId:function(){var e=rs(),t=Qu.identifierPrefix;if(W){var n=Ji,r=H;n=(r&~(1<<32-N(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=Wo++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=qo++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:ec,useFormState:Ds,useActionState:Ds,useOptimistic:function(e){var t=rs();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=sc.bind(null,G,!0,n),n.dispatch=t,[e,t]},useMemoCache:cs,useCacheRefresh:function(){return rs().memoizedState=rc.bind(null,G)},useEffectEvent:function(e){var t=rs(),n={impl:e};return t.memoizedState=n,function(){if(J&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},pc={readContext:xa,use:ss,useCallback:Gs,useContext:xa,useEffect:Ls,useImperativeHandle:Us,useInsertionEffect:Bs,useLayoutEffect:Vs,useMemo:Ks,useReducer:us,useRef:Ns,useState:function(){return us(ls)},useDebugValue:Ws,useDeferredValue:function(e,t){return Js(is(),zo.memoizedState,e,t)},useTransition:function(){var e=us(ls)[0],t=is().memoizedState;return[typeof e==`boolean`?e:os(e),t]},useSyncExternalStore:ps,useId:tc,useHostTransitionStatus:ec,useFormState:Os,useActionState:Os,useOptimistic:function(e,t){return ys(is(),zo,e,t)},useMemoCache:cs,useCacheRefresh:nc,useEffectEvent:zs},mc={readContext:xa,use:ss,useCallback:Gs,useContext:xa,useEffect:Ls,useImperativeHandle:Us,useInsertionEffect:Bs,useLayoutEffect:Vs,useMemo:Ks,useReducer:fs,useRef:Ns,useState:function(){return fs(ls)},useDebugValue:Ws,useDeferredValue:function(e,t){var n=is();return zo===null?qs(n,e,t):Js(n,zo.memoizedState,e,t)},useTransition:function(){var e=fs(ls)[0],t=is().memoizedState;return[typeof e==`boolean`?e:os(e),t]},useSyncExternalStore:ps,useId:tc,useHostTransitionStatus:ec,useFormState:js,useActionState:js,useOptimistic:function(e,t){var n=is();return zo===null?(n.baseState=e,[e,n.queue.dispatch]):ys(n,zo,e,t)},useMemoCache:cs,useCacheRefresh:nc,useEffectEvent:zs};function hc(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:T({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var gc={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=jd(),i=po(r);i.payload=t,n!=null&&(i.callback=n),t=mo(e,i,r),t!==null&&(Pd(t,e,r),ho(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=jd(),i=po(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=mo(e,i,r),t!==null&&(Pd(t,e,r),ho(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=jd(),r=po(n);r.tag=2,t!=null&&(r.callback=t),t=mo(e,r,n),t!==null&&(Pd(t,e,n),ho(t,e,n))}};function _c(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Ur(n,r)||!Ur(i,a):!0}function vc(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&gc.enqueueReplaceState(t,t.state,null)}function yc(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=T({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function bc(e){xi(e)}function xc(e){console.error(e)}function Sc(e){xi(e)}function Cc(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function wc(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function Tc(e,t,n){return n=po(n),n.tag=3,n.payload={element:null},n.callback=function(){Cc(e,t)},n}function Ec(e){return e=po(e),e.tag=3,e}function Dc(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){wc(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){wc(t,n,r),typeof i!=`function`&&(vd===null?vd=new Set([this]):vd.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function Oc(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&va(t,n,a,!0),n=Do.current,n!==null){switch(n.tag){case 31:case 13:case 19:return Oo===null?Kd():n.alternate===null&&ad===0&&(ad=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===Ja?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),mf(e,r,a)),!1;case 22:return n.flags|=65536,r===Ja?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),mf(e,r,a)),!1}throw Error(i(435,n.tag))}return mf(e,r,a),Kd(),!1}if(W)return t=Do.current,t===null?(r!==ra&&(t=Error(i(423),{cause:r}),ua(Bi(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=Bi(r,n),a=Tc(e.stateNode,r,a),go(e,a),ad!==4&&(ad=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==ra&&(e=Error(i(422),{cause:r}),ua(Bi(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=Bi(o,n),dd===null?dd=[o]:dd.push(o),ad!==4&&(ad=2),t===null)return!0;r=Bi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Tc(n.stateNode,r,e),go(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(vd===null||!vd.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Ec(a),Dc(a,e,n,r),go(n,a),!1;break;case 22:if(n.memoizedState!==null)return n.flags|=65536,!1}n=n.return}while(n!==null);return!1}var kc=Error(i(461)),Ac=!1;function jc(e,t,n,r){t.child=e===null?co(t,null,n,r):so(t,e.child,n,r)}function Mc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return ba(t),r=Xo(e,t,n,o,a,i),s=es(),e!==null&&!Ac?(ts(e,t,i),ol(e,t,i)):(W&&s&&Zi(t),t.flags|=1,jc(e,t,r,i),t.child)}function Nc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!Mi(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,Pc(e,t,a,r,i)):(e=Fi(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!sl(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Ur:n,n(o,r)&&e.ref===t.ref)return ol(e,t,i)}return t.flags|=1,e=Ni(a,r),e.ref=t.ref,e.return=t,t.child=e}function Pc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Ur(a,r)&&e.ref===t.ref){if(Ac=!1,t.pendingProps=r=a,sl(e,i))e.flags&131072&&(Ac=!0);else return t.lanes=e.lanes,ol(e,t,i)}}return Hc(e,t,n,r,i)}function Fc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return Lc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Ua(t,a===null?null:a.cachePool),a===null?To():wo(t,a),jo(t);else return r=t.lanes=536870912,Lc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&Ua(t,null),To(),Mo()):(Ua(t,a.cachePool),wo(t,a),Mo(),t.memoizedState=null);return jc(e,t,i,n),t.child}function Ic(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Lc(e,t,n,r,i){var a=Ha();return a=a===null?null:{parent:Da._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&Ua(t,null),To(),jo(t),e!==null&&va(e,t,r,!0),t.childLanes=i,null}function Rc(e,t){return t=Zc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function zc(e,t,n){return so(t,e.child,null,n),e=Rc(t,t.pendingProps),e.flags|=2,No(t),t.memoizedState=null,e}function Bc(e,t,n){var r=t.pendingProps,a=!!(t.flags&128);if(t.flags&=-129,e===null){if(W){if(r.mode===`hidden`)return e=Rc(t,r),t.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},Ic(null,e);if(Ao(t),(e=U)?(e=am(e,na),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:qi===null?null:{id:H,overflow:Ji},retryLane:536870912,hydrationErrors:null},n=Li(e),n.return=t,t.child=n,ea=t,U=null)):e=null,e===null)throw ia(t);return t.lanes=536870912,null}return Rc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(Ao(t),a){if(t.flags&256)t.flags&=-257,t=zc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558))}else if(Ac||va(e,t,n,!1),a=(n&e.childLanes)!==0,Ac||a){if(So.current===null){if(r=Qu,r!==null&&(s=xt(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,Ei(e,s),Pd(r,e,s),kc;Kd()}t=zc(e,t,n)}else e=o.treeContext,U=lm(s.nextSibling),ea=t,W=!0,ta=null,na=!1,e!==null&&$i(t,e),t=Rc(t,r),t.flags|=134221824;return t}return e=Ni(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Vc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function Hc(e,t,n,r,i){return ba(t),n=Xo(e,t,n,r,void 0,i),r=es(),e!==null&&!Ac?(ts(e,t,i),ol(e,t,i)):(W&&r&&Zi(t),t.flags|=1,jc(e,t,n,i),t.child)}function Uc(e,t,n,r,i,a){return ba(t),t.updateQueue=null,n=Qo(t,r,n,i),Zo(e),r=es(),e!==null&&!Ac?(ts(e,t,a),ol(e,t,a)):(W&&r&&Zi(t),t.flags|=1,jc(e,t,n,a),t.child)}function Wc(e,t,n,r,i){if(ba(t),t.stateNode===null){var a=ki,o=n.contextType;typeof o==`object`&&o&&(a=xa(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=gc,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},uo(t),o=n.contextType,a.context=typeof o==`object`&&o?xa(o):ki,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(hc(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&gc.enqueueReplaceState(a,a.state,null),yo(t,r,a,i),vo(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=yc(n,s);a.props=c;var l=a.context,u=n.contextType;o=ki,typeof u==`object`&&u&&(o=xa(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&vc(t,a,r,o),lo=!1;var f=t.memoizedState;a.state=f,yo(t,r,a,i),vo(),l=t.memoizedState,s||f!==l||lo?(typeof d==`function`&&(hc(t,n,d,r),l=t.memoizedState),(c=lo||_c(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,fo(e,t),o=t.memoizedProps,u=yc(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=ki,typeof l==`object`&&l&&(c=xa(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&vc(t,a,r,c),lo=!1,f=t.memoizedState,a.state=f,yo(t,r,a,i),vo();var p=t.memoizedState;o!==d||f!==p||lo||e!==null&&e.dependencies!==null&&ya(e.dependencies)?(typeof s==`function`&&(hc(t,n,s,r),p=t.memoizedState),(u=lo||_c(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&ya(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,Vc(e,t),r=!!(t.flags&128),a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=so(t,e.child,null,i),t.child=so(t,null,n,i)):jc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=ol(e,t,i),e}function Gc(e,t,n,r){return ca(),t.flags|=256,jc(e,t,n,r),t.child}var Kc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function qc(e){return{baseLanes:e,cachePool:Wa()}}function Jc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=ld),e}function Yc(e,t,n){var r=t.pendingProps,i=!1,a=!!(t.flags&128),o;if((o=a)||(o=e!==null&&e.memoizedState===null?!1:!!(Po.current&2)),o&&(i=!0,t.flags&=-129),o=!!(t.flags&32),t.flags&=-33,e===null){if(W){if(i?ko(t):Mo(),(e=U)?(e=am(e,na),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:qi===null?null:{id:H,overflow:Ji},retryLane:536870912,hydrationErrors:null},n=Li(e),n.return=t,t.child=n,ea=t,U=null)):e=null,e===null)throw ia(t);return t.lanes=sm(e)?32:536870912,null}return a=r.children,r=r.fallback,i?(Mo(),i=t.mode,a=Zc({mode:`hidden`,children:a},i),r=V(r,i,n,null),a.return=t,r.return=t,a.sibling=r,t.child=a,r=t.child,r.memoizedState=qc(n),r.childLanes=Jc(e,o,n),t.memoizedState=Kc,Ic(null,r)):(ko(t),Xc(t,a))}var s=e.memoizedState;if(s!==null){var c=s.dehydrated;if(c!==null)return $c(e,t,a,o,r,c,s,n)}return i?(Mo(),i=r.fallback,a=t.mode,s=e.child,c=s.sibling,r=Ni(s,{mode:`hidden`,children:r.children}),r.subtreeFlags=s.subtreeFlags&1206910976,c===null?(i=V(i,a,n,null),i.flags|=2):i=Ni(c,i),i.return=t,r.return=t,r.sibling=i,t.child=r,Ic(null,r),r=t.child,i=e.child.memoizedState,i===null?i=qc(n):(a=i.cachePool,a===null?a=Wa():(s=Da._currentValue,a=a.parent===s?a:{parent:s,pool:s}),i={baseLanes:i.baseLanes|n,cachePool:a}),r.memoizedState=i,r.childLanes=Jc(e,o,n),t.memoizedState=Kc,Ic(e.child,r)):(ko(t),n=e.child,e=n.sibling,n=Ni(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=n,t.memoizedState=null,n)}function Xc(e,t){return t=Zc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function Zc(e,t){return e=ji(22,e,null,t),e.lanes=0,e}function Qc(e,t,n){return so(t,e.child,null,n),e=Xc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function $c(e,t,n,r,a,o,s,c){if(n)return t.flags&256?(ko(t),t.flags&=-257,Qc(e,t,c)):t.memoizedState===null?(Mo(),o=a.fallback,s=t.mode,a=Zc({mode:`visible`,children:a.children},s),o=V(o,s,c,null),o.flags|=2,a.return=t,o.return=t,a.sibling=o,t.child=a,so(t,e.child,null,c),a=t.child,a.memoizedState=qc(c),a.childLanes=Jc(e,r,c),t.memoizedState=Kc,Ic(null,a)):(Mo(),t.child=e.child,t.flags|=128,null);if(ko(t),sm(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var l=r.dgst;return r=l,r!==``&&(a=Error(i(419)),a.stack=``,a.digest=r,ua({value:a,source:null,stack:null})),Qc(e,t,c)}if(Ac||va(e,t,c,!1),r=(c&e.childLanes)!==0,Ac||r){if(So.current!==null)return Qc(e,t,c);if(r=Qu,r!==null&&(a=xt(r,c),a!==0&&a!==s.retryLane))throw s.retryLane=a,Ei(e,a),Pd(r,e,a),kc;return om(o)||Kd(),Qc(e,t,c)}return om(o)?(t.flags|=192,t.child=e.child,null):(e=s.treeContext,U=lm(o.nextSibling),ea=t,W=!0,ta=null,na=!1,e!==null&&$i(t,e),t=Xc(t,a.children),t.flags|=134221824,t)}function el(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),ga(e.return,t,n)}function tl(e){for(var t=null;e!==null;){var n=e.alternate;n!==null&&Lo(n)===null&&(t=e),e=e.sibling}return t}function nl(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function rl(e){var t=e.child;for(e.child=null;t!==null;){var n=t.sibling;t.sibling=e.child,e.child=t,t=n}}function il(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=Po.current;if(t.flags&128)return Fo(t,o),null;var s=!!(o&2);if(s?(o=o&1|2,t.flags|=128):o&=1,Fo(t,o),i===`backwards`&&e!==null?(rl(e),jc(e,t,r,n),rl(e)):jc(e,t,r,n),r=W?Wi:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&el(e,n,t);else if(e.tag===19)el(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`backwards`:n=tl(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null,rl(t)),nl(t,!0,i,null,a,r);break;case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Lo(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}nl(t,!0,n,null,a,r);break;case`together`:nl(t,!1,null,null,void 0,r);break;case`independent`:t.memoizedState=null;break;default:n=tl(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),nl(t,!1,i,n,a,r)}return t.child}function al(e,t,n){var r=t.pendingProps;return ma(t,t.type,r.value),jc(e,t,r.children,n),t.child}function ol(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),od|=t.lanes,(n&t.childLanes)===0){if(e!==null){if(va(e,t,n,!1),(n&t.childLanes)===0)return null}else return null}if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=Ni(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Ni(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function sl(e,t){return(e.lanes&t)!==0||(e=e.dependencies,!!(e!==null&&ya(e)))}function cl(e,t,n){switch(t.tag){case 3:je(t,t.stateNode.containerInfo),ma(t,Da,e.memoizedState.cache),ca();break;case 27:case 5:Ne(t);break;case 4:je(t,t.stateNode.containerInfo);break;case 10:ma(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Ao(t),null;break;case 13:var r=t.memoizedState;if(r!==null){if(r.dehydrated!==null)return ko(t),t.flags|=128,null;r=va(e,t,n,!1);var i=t.child.childLanes;return r||(n&i)!==0?Yc(e,t,n):(ko(t),e=ol(e,t,n),e===null?null:e.sibling)}ko(t);break;case 19:if(t.flags&128)return il(e,t,n);if(i=!!(e.flags&128),r=(n&t.childLanes)!==0,r||=(va(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return il(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),Fo(t,Po.current),r)break;return null;case 22:return t.lanes=0,Fc(e,t,n,t.pendingProps);case 24:ma(t,Da,e.memoizedState.cache)}return ol(e,t,n)}function ll(e,t,n){if(e!==null){if(e.memoizedProps!==t.pendingProps)Ac=!0;else{if(!sl(e,n)&&!(t.flags&128))return Ac=!1,cl(e,t,n);Ac=!!(e.flags&131072)}}else Ac=!1,W&&t.flags&1048576&&Xi(t,Wi,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=Za(t.elementType),t.type=e,typeof e==`function`)Mi(e)?(r=yc(e,r),t.tag=1,t=Wc(null,t,e,r,n)):(t.tag=0,t=Hc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===le){t.tag=11,t=Mc(null,t,e,r,n);break a}if(a===fe){t.tag=14,t=Nc(null,t,e,r,n);break a}if(a===ce){t.tag=10,t.type=e,t=al(null,t,n);break a}}throw t=xe(e)||e,Error(i(306,t,``))}}return t;case 0:return Hc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=yc(r,t.pendingProps),Wc(e,t,r,a,n);case 3:a:{if(je(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,fo(e,t),yo(t,r,null,n);var s=t.memoizedState;if(r=s.cache,ma(t,Da,r),r!==o.cache&&_a(t,[Da],n,!0),vo(),r=s.element,o.isDehydrated){if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=Gc(e,t,r,n);break a}if(r!==a){a=Bi(Error(i(424)),t),ua(a),t=Gc(e,t,r,n);break a}switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(U=lm(e.firstChild),ea=t,W=!0,ta=null,na=!0,n=co(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|134221824,n=n.sibling}else{if(ca(),r===a){t=ol(e,t,n);break a}jc(e,t,r,n)}t=t.child}return t;case 26:return Vc(e,t),e===null?(n=Nm(t.type,null,t.pendingProps,null))?t.memoizedState=n:W||(t.stateNode=fp(t.type,t.pendingProps,ke.current,t)):t.memoizedState=Nm(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return Ne(t),e===null&&W&&(r=t.stateNode=hm(t.type,t.pendingProps,ke.current),ea=t,na=!0,a=U,Sp(t.type)?(um=a,U=lm(r.firstChild)):U=a),jc(e,t,t.pendingProps.children,n),Vc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&W&&((a=r=U)&&(r=rm(r,t.type,t.pendingProps,na),r===null?a=!1:(t.stateNode=r,ea=t,U=lm(r.firstChild),na=!1,a=!0)),a||ia(t)),Ne(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,pp(a,o)?r=null:s!==null&&pp(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=Xo(e,t,$o,null,null,n),sh._currentValue=a),Vc(e,t),jc(e,t,r,n),t.child;case 6:return e===null&&W&&((e=n=U)&&(n=im(n,t.pendingProps,na),n===null?e=!1:(t.stateNode=n,ea=t,U=null,e=!0)),e||ia(t)),null;case 13:return Yc(e,t,n);case 4:return je(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=so(t,null,r,n):jc(e,t,r,n),t.child;case 11:return Mc(e,t,t.type,t.pendingProps,n);case 7:return r=t.pendingProps,Vc(e,t),jc(e,t,r,n),t.child;case 8:return jc(e,t,t.pendingProps.children,n),t.child;case 12:return jc(e,t,t.pendingProps.children,n),t.child;case 10:return al(e,t,n);case 9:return a=t.type._context,r=t.pendingProps.children,ba(t),a=xa(a),r=r(a),t.flags|=1,jc(e,t,r,n),t.child;case 14:return Nc(e,t,t.type,t.pendingProps,n);case 15:return Pc(e,t,t.type,t.pendingProps,n);case 19:return il(e,t,n);case 31:return Bc(e,t,n);case 22:return Fc(e,t,n,t.pendingProps);case 24:return ba(t),r=xa(Da),e===null?(a=Ha(),a===null&&(a=Qu,o=Oa(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},uo(t),ma(t,Da,a)):((e.lanes&n)!==0&&(fo(e,t),yo(t,null,null,n),vo()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,ma(t,Da,r),r!==a.cache&&_a(t,[Da],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),ma(t,Da,r))),jc(e,t,t.pendingProps.children,n),t.child;case 30:return t.stateNode===null&&(t.stateNode={autoName:null,paired:null,clones:null,ref:null}),r=t.pendingProps,r.name!=null&&r.name!==`auto`?t.flags|=e===null?18882560:18874368:W&&Zi(t),e!==null&&e.memoizedProps.name!==r.name?t.flags|=4194816:Vc(e,t),jc(e,t,r.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function ul(e){e.flags|=4}function dl(e,t,n,r,i){var a;if((a=!!(e.mode&32))&&(a=n===null?Jm(t,r):Jm(t,r)&&(r.src!==n.src||r.srcSet!==n.srcSet)),a){if(e.flags|=16777216,(i&335544128)===i){if(e.stateNode.complete)e.flags|=8192;else if(Ud())e.flags|=8192;else throw Qa=Ja,Ka}}else e.flags&=-16777217}function fl(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Ym(t)){if(Ud())e.flags|=8192;else throw Qa=Ja,Ka}}function pl(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:ht(),e.lanes|=t,ud|=t)}function ml(e,t){if(!W)switch(e.tailMode){case`visible`:break;case`collapsed`:for(var n=e.tail,r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null;break;default:for(t=e.tail,n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null}}function hl(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&1206910976,r|=i.flags&1206910976,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function gl(e,t,n){var r=t.pendingProps;switch(Qi(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return hl(t),null;case 1:return hl(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),ha(Da),Me(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(sa(t)?ul(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,la())),hl(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(ul(t),o===null?(hl(t),dl(t,a,null,r,n)):(hl(t),fl(t,o))):o?o===e.memoizedState?(hl(t),t.flags&=-16777217):(ul(t),hl(t),fl(t,o)):(e=e.memoizedProps,e!==r&&ul(t),hl(t),dl(t,a,e,r,n)),null;case 27:if(Pe(t),n=ke.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&ul(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return hl(t),t.subtreeFlags&=-33554433,null}e=De.current,sa(t)?aa(t,e):(e=hm(a,r,n),t.stateNode=e,ul(t))}return hl(t),t.subtreeFlags&=-33554433,null;case 5:if(Pe(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&ul(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return hl(t),t.subtreeFlags&=-33554433,null}if(o=De.current,sa(t))aa(t,o);else{var s=lp(ke.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[Tt]=t,o[Et]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(np(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&ul(t)}}return hl(t),t.subtreeFlags&=-33554433,dl(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&ul(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=ke.current,sa(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=ea,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[Tt]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||ep(e.nodeValue,n)),e||ia(t,!0)}else e=lp(e).createTextNode(r),e[Tt]=t,t.stateNode=e}return hl(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=sa(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[Tt]=t}else ca(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;hl(t),e=!1}else n=la(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(No(t),t):(No(t),null);if(t.flags&128)throw Error(i(558))}return hl(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=sa(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[Tt]=t}else ca(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;hl(t),a=!1}else a=la(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(No(t),t):(No(t),null)}return No(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),pl(t,t.updateQueue),hl(t),null);case 4:return Me(),e===null&&Wf(t.stateNode.containerInfo),t.flags|=67108864,hl(t),null;case 10:return ha(t.type),hl(t),null;case 19:if(Io(t),r=t.memoizedState,r===null)return hl(t),null;if(a=!!(t.flags&128),o=r.rendering,o===null){if(a)ml(r,!1);else{if(ad!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=Lo(e),o!==null){for(t.flags|=128,ml(r,!1),e=o.updateQueue,t.updateQueue=e,pl(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)Pi(n,e),n=n.sibling;return Fo(t,Po.current&1|2),W&&Yi(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&M()>gd&&(t.flags|=128,a=!0,ml(r,!1),t.lanes=4194304)}}else{if(!a){if(e=Lo(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,pl(t,e),ml(r,!0),r.tail===null&&r.tailMode!==`collapsed`&&r.tailMode!==`visible`&&!o.alternate&&!W)return hl(t),null}else 2*M()-r.renderingStartTime>gd&&n!==536870912&&(t.flags|=128,a=!0,ml(r,!1),t.lanes=4194304)}r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}if(r.tail!==null){e=r.tail;a:{for(n=e;n!==null;){if(n.alternate!==null){n=!1;break a}n=n.sibling}n=!0}return r.rendering=e,r.tail=e.sibling,r.renderingStartTime=M(),e.sibling=null,o=Po.current,o=a?o&1|2:o&1,r.tailMode===`visible`||r.tailMode===`collapsed`||!n||W?Fo(t,o):(n=o,j(Do,t),j(Po,n),Oo===null&&(Oo=t)),W&&Yi(t,r.treeForkCount),e}return hl(t),null;case 22:case 23:return No(t),Eo(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(hl(t),t.subtreeFlags&6&&(t.flags|=8192)):hl(t),n=t.updateQueue,n!==null&&pl(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&Ee(Va),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),ha(Da),hl(t),null;case 25:return null;case 30:return t.flags|=33554432,hl(t),null}throw Error(i(156,t.tag))}function _l(e,t){switch(Qi(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ha(Da),Me(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Pe(t),null;case 31:if(t.memoizedState!==null){if(No(t),t.alternate===null)throw Error(i(340));ca()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(No(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));ca()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Io(t),e=t.flags,e&65536?(t.flags=e&-65537|128,e=t.memoizedState,e!==null&&(e.rendering=null,e.tail=null),t.flags|=4,t):null;case 4:return Me(),null;case 10:return ha(t.type),null;case 22:case 23:return No(t),Eo(),e!==null&&Ee(Va),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return ha(Da),null;case 25:return null;default:return null}}function vl(e,t){switch(Qi(t),t.tag){case 3:ha(Da),Me();break;case 26:case 27:case 5:Pe(t);break;case 4:Me();break;case 31:t.memoizedState!==null&&No(t);break;case 13:No(t);break;case 19:Io(t);break;case 10:ha(t.type);break;case 22:case 23:No(t),Eo(),e!==null&&Ee(Va);break;case 24:ha(Da)}}function yl(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Z(t,t.return,e)}}function bl(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Z(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Z(t,t.return,e)}}function xl(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{xo(t,n)}catch(t){Z(e,e.return,t)}}}function Sl(e,t,n){n.props=yc(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Z(e,t,n)}}function Cl(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:var i=e.stateNode,a=vi(e.memoizedProps,i);(i.ref===null||i.ref.name!==a)&&(i.ref=Pp(a)),r=i.ref;break;case 7:if(e.stateNode===null){var o=new Fp(e);h(e.child,!1,Qp,o,void 0,void 0),e.stateNode=o}r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Z(e,t,n)}}function wl(e,t){var n=e.ref,r=e.refCleanup;if(n!==null){if(typeof r==`function`)try{r()}catch(n){Z(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Z(e,t,n)}else n.current=null}}function Tl(e,t){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&t!==null)for(var n=0;n<t.length;n++)em(e.stateNode,t[n])}function El(e){for(var t=e.return;t!==null&&(kl(t)&&em(e.stateNode,t.stateNode),!Ol(t));)t=t.return}function Dl(e){for(var t=e.return;t!==null&&(kl(t)&&tm(e.stateNode,t.stateNode),!Ol(t));)t=t.return}function Ol(e){return e.tag===5||e.tag===3||e.tag===27}function kl(e){return e&&e.tag===7&&e.stateNode!==null}function Al(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Z(e,e.return,t)}}function jl(e,t,n){try{var r=e.stateNode;ip(r,e.type,n,t),r[Et]=t}catch(t){Z(e,e.return,t)}}function Ml(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Sp(e.type)||e.tag===4}function Nl(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Ml(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Sp(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Pl(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(i,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(i),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=yn)),Tl(e,r),I=!0;else if(i!==4&&(i===27&&(Tl(e,r),r=null,Sp(e.type)&&(n=e.stateNode,t=null)),e=e.child,e!==null))for(Pl(e,t,n,r),e=e.sibling;e!==null;)Pl(e,t,n,r),e=e.sibling}function Fl(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?n.insertBefore(i,t):n.appendChild(i),Tl(e,r),I=!0;else if(i!==4&&(i===27&&(Tl(e,r),r=null,Sp(e.type)&&(n=e.stateNode)),e=e.child,e!==null))for(Fl(e,t,n,r),e=e.sibling;e!==null;)Fl(e,t,n,r),e=e.sibling}function Il(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);np(t,r,n),t[Tt]=e,t[Et]=n}catch(t){Z(e,e.return,t)}}var Ll=!1,Rl=null;function zl(e){(e.tag===30||e.subtreeFlags&33554432)&&(Ll=!0)}var Bl=null;function Vl(){var e=Bl;return Bl=null,e}var Hl=0;function Ul(e,t,n,r,i){return Hl=0,Wl(e.child,t,n,r,i)}function Wl(e,t,n,r,i){for(var a=!1;e!==null;){if(e.tag===5){var o=e.stateNode;if(r!==null){var s=Op(o);r.push(s),s.view&&(a=!0)}else a||Op(o).view&&(a=!0);Ll=!0,Tp(o,Hl===0?t:t+`_`+Hl,n),Hl++}else e.tag===22&&e.memoizedState!==null||e.tag===30&&i||Wl(e.child,t,n,r,i)&&(a=!0);e=e.sibling}return a}function Gl(e,t){for(;e!==null;)e.tag===5?Ep(e.stateNode,e.memoizedProps):e.tag===22&&e.memoizedState!==null||e.tag===30&&t||Gl(e.child,t),e=e.sibling}function Kl(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(Kl(e),e.tag===30&&e.flags&18874368&&e.stateNode.paired)){var t=e.memoizedProps;if(t.name==null||t.name===`auto`)throw Error(i(544));var n=t.name;t=bi(t.default,t.share),t!==`none`&&(Ul(e,n,t,null,!1)||Gl(e.child,!1))}e=e.sibling}}function ql(e,t){if(e.tag===30){var n=e.stateNode,r=e.memoizedProps,i=vi(r,n),a=bi(r.default,n.paired?r.share:r.enter);a===`none`?Kl(e):Ul(e,i,a,null,!1)?(Kl(e),n.paired||t||Nd(e,r.onEnter)):Gl(e.child,!1)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)ql(e,t),e=e.sibling;else Kl(e)}function Jl(e){if(Rl!==null&&Rl.size!==0){var t=Rl;if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var n=e.memoizedProps,r=n.name;if(r!=null&&r!==`auto`){var i=t.get(r);if(i!==void 0){var a=bi(n.default,n.share);if(a!==`none`&&(Ul(e,r,a,null,!1)?(a=e.stateNode,i.paired=a,a.paired=i,Nd(e,n.onShare)):Gl(e.child,!1)),t.delete(r),t.size===0)break}}}Jl(e)}e=e.sibling}}}function Yl(e){if(e.tag===30){var t=e.memoizedProps,n=vi(t,e.stateNode),r=Rl===null?void 0:Rl.get(n),i=bi(t.default,r===void 0?t.exit:t.share);i!==`none`&&(Ul(e,n,i,null,!1)?r===void 0?Nd(e,t.onExit):(i=e.stateNode,r.paired=i,i.paired=r,Rl.delete(n),Nd(e,t.onShare)):Gl(e.child,!1)),Rl!==null&&Jl(e)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Yl(e),e=e.sibling;else Rl!==null&&Jl(e)}function Xl(e){for(e=e.child;e!==null;){if(e.tag===30){var t=e.memoizedProps,n=vi(t,e.stateNode);t=bi(t.default,t.update),e.flags&=-5,t!==`none`&&Ul(e,n,t,e.memoizedState=[],!1)}else e.subtreeFlags&33554432&&Xl(e);e=e.sibling}}function Zl(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var t=e.stateNode;t.paired!==null&&(t.paired=null,Gl(e.child,!1))}Zl(e)}e=e.sibling}}function Ql(e){if(e.tag===30)e.stateNode.paired=null,Gl(e.child,!1),Zl(e);else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Ql(e),e=e.sibling;else Zl(e)}function $l(e){for(e=e.child;e!==null;)e.tag===30?Gl(e.child,!1):e.subtreeFlags&33554432&&$l(e),e=e.sibling}function eu(e,t,n,r,i,a,o){for(var s=!1;t!==null;){if(t.tag===5){var c=t.stateNode;if(a!==null&&Hl<a.length){var l=a[Hl],u=Op(c);(l.view||u.view)&&(s=!0);var d;if(d=!(e.flags&4)){if(u.clip)d=!0;else{d=l.rect;var f=u.rect;d=d.y!==f.y||d.x!==f.x||d.height!==f.height||d.width!==f.width}}d&&(e.flags|=4),u.abs?u=!l.abs:(l=l.rect,u=u.rect,u=l.height!==u.height||l.width!==u.width),u&&(e.flags|=32)}else e.flags|=32;e.flags&4&&Tp(c,Hl===0?n:n+`_`+Hl,i),s&&e.flags&4||(Bl===null&&(Bl=[]),Bl.push(c,Hl===0?r:r+`_`+Hl,t.memoizedProps)),Hl++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&o?e.flags|=t.flags&32:eu(e,t.child,n,r,i,a,o)&&(s=!0));t=t.sibling}return s}function tu(e,t){for(e=e.child;e!==null;){if(e.tag===30){var n=e.memoizedProps,r=e.stateNode,i=vi(n,r),a=bi(n.default,n.update);if(t){r=r.clones;var o=r===null?null:r.map(kp)}else o=e.memoizedState,e.memoizedState=null;r=e;var s=e.child;Hl=0,i=eu(r,s,i,i,a,o,!1),e.flags&4&&i&&(t||Nd(e,n.onUpdate))}else e.subtreeFlags&33554432&&tu(e,t);e=e.sibling}}var nu=!1,q=!1,ru=!1,iu=!1,au=typeof WeakSet==`function`?WeakSet:Set,ou=null,su=!1,cu=!1,lu=!1,uu=!1;function du(e,t,n){if(e=e.containerInfo,sp=gh,e=Jr(e),Yr(e)){if(`selectionStart`in e)var r={start:e.selectionStart,end:e.selectionEnd};else a:{r=(r=e.ownerDocument)&&r.defaultView||window;var i=r.getSelection&&r.getSelection();if(i&&i.rangeCount!==0){r=i.anchorNode;var a=i.anchorOffset,o=i.focusNode;i=i.focusOffset;try{r.nodeType,o.nodeType}catch{r=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==r||a!==0&&f.nodeType!==3||(c=s+a),f!==o||i!==0&&f.nodeType!==3||(l=s+i),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===r&&++u===a&&(c=s),p===o&&++d===i&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}r=c===-1||l===-1?null:{start:c,end:l}}else r=null}r||={start:0,end:0}}else r=null;for(cp={focusedElem:e,selectionRange:r},gh=!1,n=(n&335544064)===n,ou=t,t=n?9270:1024;ou!==null;){if(e=ou,n&&(r=e.deletions,r!==null))for(a=0;a<r.length;a++)n&&Yl(r[a]);if(e.alternate===null&&e.flags&2)n&&zl(e),fu(n);else{if(e.tag===22){if(r=e.alternate,e.memoizedState!==null){r!==null&&r.memoizedState===null&&n&&Yl(r),fu(n);continue}if(r!==null&&r.memoizedState!==null){n&&zl(e),fu(n);continue}}r=e.child,(e.subtreeFlags&t)!==0&&r!==null?(r.return=e,ou=r):(n&&Xl(e),fu(n))}}Rl=null}function fu(e){for(;ou!==null;){var t=ou,n=e,r=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 15:break;case 1:if(a&1024&&r!==null){n=void 0,a=r.memoizedProps,r=r.memoizedState;var o=t.stateNode;try{var s=yc(t.type,a);n=o.getSnapshotBeforeUpdate(s,r),o.__reactInternalSnapshotBeforeUpdate=n}catch(e){Z(t,t.return,e)}}break;case 3:if(a&1024){if(r=t.stateNode.containerInfo,n=r.nodeType,n===9)nm(r);else if(n===1)switch(r.nodeName){case`HEAD`:case`HTML`:case`BODY`:nm(r);break;default:r.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:n&&r!==null&&(n=vi(r.memoizedProps,r.stateNode),a=t.memoizedProps,a=bi(a.default,a.update),a!==`none`&&Ul(r,n,a,r.memoizedState=[],!0));break;default:if(a&1024)throw Error(i(163))}if(r=t.sibling,r!==null){r.return=t.return,ou=r;break}ou=t.return}}function pu(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:Nu(e,n),r&4&&yl(5,n);break;case 1:if(Nu(e,n),r&4){if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Z(n,n.return,e)}else{var i=yc(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Z(n,n.return,e)}}}r&64&&xl(n),r&512&&Cl(n,n.return);break;case 3:if(Nu(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{xo(e,t)}catch(e){Z(n,n.return,e)}}break;case 27:t===null&&r&4&&Il(n);case 26:case 5:Nu(e,n),t===null&&r&4&&Al(n),r&512&&Cl(n,n.return);break;case 12:Nu(e,n);break;case 31:Nu(e,n),r&4&&Su(e,n);break;case 13:Nu(e,n),r&4&&Cu(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=_f.bind(null,n),cm(e,n))));break;case 22:if(r=n.memoizedState!==null||nu,!r){var a=t!==null&&t.memoizedState!==null||q;t=nu,i=q,nu=r,(q=a)&&!i?(r=2,n.subtreeFlags&8772&&(r|=1),Fu(e,n,r)):Nu(e,n),nu=t,q=i}break;case 30:Nu(e,n),r&512&&Cl(n,n.return);break;case 7:r&512&&Cl(n,n.return);default:Nu(e,n)}}function mu(e,t){for(e=e.child;e!==null;)hu(e,t),e=e.sibling}function hu(e,t){switch(e.tag){case 5:case 26:try{var n=e.stateNode;if(t){var r=n.style;typeof r.setProperty==`function`?r.setProperty(`display`,`none`,`important`):r.display=`none`}else{var i=e.stateNode,a=e.memoizedProps.style,o=a!=null&&a.hasOwnProperty(`display`)?a.display:null;i.style.display=o==null||typeof o==`boolean`?``:(``+o).trim()}}catch(t){Z(e,e.return,t)}gu(e,t);break;case 6:try{e.stateNode.nodeValue=t?``:e.memoizedProps,I=!0}catch(t){Z(e,e.return,t)}break;case 18:try{var s=e.stateNode;t?wp(s,!0):wp(e.stateNode,!1)}catch(t){Z(e,e.return,t)}break;case 22:case 23:e.memoizedState===null&&mu(e,t);break;default:mu(e,t)}}function gu(e,t){if(e.subtreeFlags&67108864)for(e=e.child;e!==null;){a:{var n=e,r=t;switch(n.tag){case 4:hu(n,r);break a;case 22:n.memoizedState===null&&gu(n,r);break a;default:gu(n,r)}}e=e.sibling}}function _u(e){var t=e.alternate;t!==null&&(e.alternate=null,_u(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Pt(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var vu=null,yu=!1;function bu(e,t,n){for(n=n.child;n!==null;)xu(e,t,n),n=n.sibling}function xu(e,t,n){if(nt&&typeof nt.onCommitFiberUnmount==`function`)try{nt.onCommitFiberUnmount(tt,n)}catch{}switch(n.tag){case 26:q||wl(n,t),bu(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&!q&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:q||wl(n,t),Dl(n);var r=vu,i=yu;Sp(n.type)&&(vu=n.stateNode,yu=!1),bu(e,t,n),gm(n.stateNode,n.type,n.memoizedProps),vu=r,yu=i;break;case 5:q||wl(n,t),Dl(n);case 6:if(n.tag===6&&Dl(n),r=vu,i=yu,vu=null,bu(e,t,n),vu=r,yu=i,vu!==null){if(yu)try{(vu.nodeType===9?vu.body:vu.nodeName===`HTML`?vu.ownerDocument.body:vu).removeChild(n.stateNode),I=!0}catch(e){Z(n,t,e)}else try{vu.removeChild(n.stateNode),I=!0}catch(e){Z(n,t,e)}}break;case 18:vu!==null&&(yu?(e=vu,Cp(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Hh(e)):Cp(vu,n.stateNode));break;case 4:r=vu,i=yu,vu=n.stateNode.containerInfo,yu=!0,bu(e,t,n),vu=r,yu=i;break;case 0:case 11:case 14:case 15:bl(2,n,t),q||bl(4,n,t),bu(e,t,n);break;case 1:q||(wl(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Sl(n,t,r)),bu(e,t,n);break;case 21:bu(e,t,n);break;case 22:q=(r=q)||n.memoizedState!==null,bu(e,t,n),q=r;break;case 30:wl(n,t),bu(e,t,n);break;case 7:q||wl(n,t),bu(e,t,n);break;default:bu(e,t,n)}}function Su(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Hh(e)}catch(e){Z(t,t.return,e)}}}function Cu(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Hh(e)}catch(e){Z(t,t.return,e)}}function wu(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new au),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new au),t;default:throw Error(i(435,e.tag))}}function Tu(e,t){var n=wu(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=vf.bind(null,e,t);t.then(r,r)}})}function Eu(e,t,n){var r=t.deletions;if(r!==null)for(var a=0;a<r.length;a++){var o=r[a],s=e,c=t,l=c;a:for(;l!==null;){switch(l.tag){case 27:if(Sp(l.type)){vu=l.stateNode,yu=!1;break a}break;case 5:vu=l.stateNode,yu=!1;break a;case 3:case 4:vu=l.stateNode.containerInfo,yu=!0;break a}l=l.return}if(vu===null)throw Error(i(160));xu(s,c,o),vu=null,yu=!1,s=o.alternate,s!==null&&(s.return=null),o.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Ou(t,e,n),t=t.sibling}var Du=null;function Ou(e,t,n){var r=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(a&4&&(r=e.updateQueue,r=r===null?null:r.events,r!==null))for(var o=0;o<r.length;o++){var s=r[o];s.ref.impl=s.nextImpl}Eu(t,e,n),ku(e),a&4&&(bl(3,e,e.return),yl(3,e),bl(5,e,e.return));break;case 1:Eu(t,e,n),ku(e),a&512&&(q||r===null||wl(r,r.return)),a&64&&nu&&(e=e.updateQueue,e!==null&&(t=e.callbacks,t!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?t:n.concat(t))));break;case 26:if(o=Du,Eu(t,e,n),ku(e),a&512&&(q||r===null||wl(r,r.return)),a&4){if(a=r===null?null:r.memoizedState,n=e.memoizedState,r===null){if(n===null){if(e.stateNode===null){if(nu)e.stateNode=fp(e.type,e.memoizedProps,t.containerInfo,e);else{a:{t=e.type,n=e.memoizedProps,a=o.ownerDocument||o;b:switch(t){case`title`:r=a.getElementsByTagName(`title`)[0],(!r||r[Mt]||r[Tt]||r.namespaceURI===`http://www.w3.org/2000/svg`||r.hasAttribute(`itemprop`))&&(r=a.createElement(t),a.head.insertBefore(r,a.querySelector(`head > title`))),np(r,t,n),r[Tt]=e,zt(r),t=r;break a;case`link`:if(o=Gm(`link`,`href`,a).get(t+(n.href||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&r.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&r.getAttribute(`title`)===(n.title==null?null:n.title)&&r.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){o.splice(s,1);break b}}r=a.createElement(t),np(r,t,n),a.head.appendChild(r);break;case`meta`:if(o=Gm(`meta`,`content`,a).get(t+(n.content||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`content`)===(n.content==null?null:``+n.content)&&r.getAttribute(`name`)===(n.name==null?null:n.name)&&r.getAttribute(`property`)===(n.property==null?null:n.property)&&r.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&r.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){o.splice(s,1);break b}}r=a.createElement(t),np(r,t,n),a.head.appendChild(r);break;default:throw Error(i(468,t))}r[Tt]=e,zt(r),t=r}e.stateNode=t}}else nu||Km(o,e.type,e.stateNode)}else e.stateNode=Bm(o,n,e.memoizedProps)}else a===n?n===null&&e.stateNode!==null&&jl(e,e.memoizedProps,r.memoizedProps):(a===null?(t=r.stateNode,t===null||q||t.parentNode.removeChild(t)):a.count--,n===null?nu||Km(o,e.type,e.stateNode):Bm(o,n,e.memoizedProps))}break;case 27:Eu(t,e,n),ku(e),a&512&&(q||r===null||wl(r,r.return)),r!==null&&a&4&&jl(e,e.memoizedProps,r.memoizedProps);break;case 5:if(o=ru,ru=!1,Eu(t,e,n),ru=o,ku(e),a&512&&(q||r===null||wl(r,r.return)),e.flags&32){t=e.stateNode;try{fn(t,``),I=!0}catch(t){Z(e,e.return,t)}}a&4&&e.stateNode!=null&&(t=e.memoizedProps,jl(e,t,r===null?t:r.memoizedProps)),a&1024&&(iu=!0);break;case 6:if(Eu(t,e,n),ku(e),a&4){if(e.stateNode===null)throw Error(i(162));t=e.memoizedProps,n=e.stateNode;try{n.nodeValue=t,I=!0}catch(t){Z(e,e.return,t)}}break;case 3:if(I=!1,Wm=null,o=Du,Du=bm(t.containerInfo),Eu(t,e,n),Du=o,ku(e),a&4&&r!==null&&r.memoizedState.isDehydrated)try{Hh(t.containerInfo)}catch(t){Z(e,e.return,t)}iu&&(iu=!1,Au(e)),I=!1;break;case 4:a=ru,ru=nu,r=Yt(),o=Du,Du=bm(e.stateNode.containerInfo),Eu(t,e,n),ku(e),Du=o,I&&cu&&(lu=!0),I=r,ru=a;break;case 12:Eu(t,e,n),ku(e);break;case 31:Eu(t,e,n),ku(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Tu(e,t)));break;case 13:Eu(t,e,n),ku(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(md=M()),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Tu(e,t)));break;case 22:o=e.memoizedState!==null,s=r!==null&&r.memoizedState!==null;var c=nu,l=q,u=ru;nu=c||o,ru=u||o,q=l||s,Eu(t,e,n),q=l,ru=u,nu=c,ku(e),a&8192&&(t=e.stateNode,t._visibility=o?t._visibility&-2:t._visibility|1,!o||r===null||s||nu||q||(t=s||q,n=nu,r=q,nu=o||nu,q=t,Pu(e,2),nu=n,q=r),!o&&ru||mu(e,o)),a&4&&(t=e.updateQueue,t!==null&&(n=t.retryQueue,n!==null&&(t.retryQueue=null,Tu(e,n))));break;case 19:Eu(t,e,n),ku(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Tu(e,t)));break;case 30:a&512&&(q||r===null||wl(r,r.return)),a=Yt(),o=cu,s=(n&335544064)===n,c=e.memoizedProps,cu=s&&bi(c.default,c.update)!==`none`,Eu(t,e,n),ku(e),s&&r!==null&&I&&(e.flags|=4),cu=o,I=a;break;case 21:break;case 7:a&512&&(q||r===null||wl(r,r.return)),r&&r.stateNode!==null&&(r.stateNode._fragmentFiber=e);default:Eu(t,e,n),ku(e)}}function ku(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Ml(r)){n=r;break}r=r.return}r=null;for(var a=e.return;a!==null;){if(kl(a)){var o=a.stateNode;r===null?r=[o]:r.push(o)}if(Ol(a))break;a=a.return}var s=r;if(n==null)throw Error(i(160));switch(n.tag){case 27:var c=n.stateNode;Fl(e,Nl(e),c,s);break;case 5:var l=n.stateNode;n.flags&32&&(fn(l,``),n.flags&=-33),Fl(e,Nl(e),l,s);break;case 3:case 4:var u=n.stateNode.containerInfo;Pl(e,Nl(e),u,s);break;default:throw Error(i(161))}}catch(t){Z(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Au(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Au(t),t.tag===5&&t.flags&1024&&(t=t.stateNode,gh=!0,t.reset(),gh=!1),e=e.sibling}}function ju(e,t){if(t.subtreeFlags&9270)for(t=t.child;t!==null;)Mu(t,e),t=t.sibling;else tu(t,!1)}function Mu(e,t){var n=e.alternate;if(n===null)ql(e,!1);else switch(e.tag){case 3:if(uu=su=!1,Vl(),ju(t,e),!su&&!lu){if(e=Bl,e!==null)for(var r=0;r<e.length;r+=3){n=e[r];var i=e[r+1];Ep(n,e[r+2]),n=n.ownerDocument.documentElement,n!==null&&n.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(`+i+`)`})}e=t.containerInfo,e=e.nodeType===9?e.documentElement:e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===``&&(e.style.viewTransitionName=`none`,e.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(root)`}),e.animate({width:[0,0],height:[0,0]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition`})),uu=!0}Bl=null;break;case 5:ju(t,e);break;case 4:r=su,su=!1,ju(t,e),su&&(lu=!0),su=r;break;case 22:e.memoizedState===null&&(n.memoizedState===null?ju(t,e):ql(e,!1));break;case 30:r=su,i=Vl(),su=!1,ju(t,e),su&&(e.flags|=4);var a=e.memoizedProps,o=e.stateNode;t=vi(a,o),o=vi(n.memoizedProps,o);var s=bi(a.default,a.update);s===`none`?t=!1:(a=n.memoizedState,n.memoizedState=null,n=e.child,Hl=0,t=eu(e,n,t,o,s,a,!0),Hl!==(a===null?0:a.length)&&(e.flags|=32)),e.flags&4&&t?(Nd(e,e.memoizedProps.onUpdate),Bl=i):i!==null&&(i.push.apply(i,Bl),Bl=i),su=e.flags&32?!0:r;break;default:ju(t,e)}}function Nu(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)pu(e,t.alternate,t),t=t.sibling}function Pu(e,t){for(e=e.child;e!==null;){var n=e,r=t;switch(n.tag){case 0:case 11:case 14:case 15:bl(4,n,n.return),Pu(n,r);break;case 1:wl(n,n.return);var i=n.stateNode;typeof i.componentWillUnmount==`function`&&Sl(n,n.return,i),Pu(n,r);break;case 27:r&2&&gm(n.stateNode,n.type,n.memoizedProps);case 5:wl(n,n.return),n.tag!==5&&n.tag!==27||Dl(n),Pu(n,r);break;case 6:Dl(n);break;case 26:wl(n,n.return),i=n.stateNode,n.memoizedState!==null||i===null||q||i.parentNode.removeChild(i),Pu(n,r);break;case 22:n.memoizedState===null&&Pu(n,r);break;case 30:wl(n,n.return),Pu(n,r);break;case 7:wl(n,n.return);default:Pu(n,r)}e=e.sibling}}function Fu(e,t,n){for(n=t.subtreeFlags&8772?n:n&-2,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags,s=!!(n&1);switch(a.tag){case 0:case 11:case 15:Fu(i,a,n),yl(4,a);break;case 1:if(Fu(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Z(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var c=r.stateNode;try{var l=i.shared.hiddenCallbacks;if(l!==null)for(i.shared.hiddenCallbacks=null,i=0;i<l.length;i++)bo(l[i],c)}catch(e){Z(r,r.return,e)}}s&&o&64&&xl(a),Cl(a,a.return);break;case 27:n&2&&Il(a);case 5:a.tag!==5&&a.tag!==27||El(a),Fu(i,a,n),s&&r===null&&o&4&&Al(a),Cl(a,a.return);break;case 6:El(a);break;case 26:c=a.stateNode,a.memoizedState!==null||c===null||nu||Km(bm(c.ownerDocument),a.type,c),Fu(i,a,n),s&&r===null&&o&4&&Al(a),Cl(a,a.return);break;case 12:Fu(i,a,n);break;case 31:Fu(i,a,n),s&&o&4&&Su(i,a);break;case 13:Fu(i,a,n),s&&o&4&&Cu(i,a);break;case 22:a.memoizedState===null&&Fu(i,a,n),Cl(a,a.return);break;case 30:Fu(i,a,n),Cl(a,a.return);break;case 7:Cl(a,a.return);default:Fu(i,a,n)}t=t.sibling}}function Iu(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&ka(n))}function Lu(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ka(e))}function Ru(e,t,n,r){var i=(n&335544064)===n;if(t.subtreeFlags&(i?10262:10256))for(t=t.child;t!==null;)zu(e,t,n,r),t=t.sibling;else i&&$l(t)}function zu(e,t,n,r){var i=(n&335544064)===n;i&&t.alternate===null&&t.return!==null&&t.return.alternate!==null&&Ql(t);var a=t.flags;switch(t.tag){case 0:case 11:case 15:Ru(e,t,n,r),a&2048&&yl(9,t);break;case 1:Ru(e,t,n,r);break;case 3:Ru(e,t,n,r),i&&uu&&(e=e.containerInfo,e=e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,e.style.viewTransitionName===`root`&&(e.style.viewTransitionName=``),e=e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===`none`&&(e.style.viewTransitionName=``)),a&2048&&(a=null,t.alternate!==null&&(a=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==a&&(t.refCount++,a!=null&&ka(a)));break;case 12:if(a&2048){Ru(e,t,n,r),a=t.stateNode;try{var o=t.memoizedProps,s=o.id,c=o.onPostCommit;typeof c==`function`&&c(s,t.alternate===null?`mount`:`update`,a.passiveEffectDuration,-0)}catch(e){Z(t,t.return,e)}}else Ru(e,t,n,r);break;case 31:Ru(e,t,n,r);break;case 13:Ru(e,t,n,r);break;case 23:break;case 22:o=t.stateNode,s=t.alternate,t.memoizedState===null?(i&&s!==null&&s.memoizedState!==null&&Ql(t),o._visibility&2?Ru(e,t,n,r):(o._visibility|=2,Bu(e,t,n,r,!!(t.subtreeFlags&10256)||!1))):(i&&s!==null&&s.memoizedState===null&&Ql(s),o._visibility&2?Ru(e,t,n,r):Vu(e,t)),a&2048&&Iu(s,t);break;case 24:Ru(e,t,n,r),a&2048&&Lu(t.alternate,t);break;case 30:i&&(a=t.alternate,a!==null&&(Gl(a.child,!0),Gl(t.child,!0))),Ru(e,t,n,r);break;default:Ru(e,t,n,r)}}function Bu(e,t,n,r,i){for(i&&=!!(t.subtreeFlags&10256)||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Bu(a,o,s,c,i),yl(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Bu(a,o,s,c,i)):u._visibility&2?Bu(a,o,s,c,i):Vu(a,o),i&&l&2048&&Iu(o.alternate,o);break;case 24:Bu(a,o,s,c,i),i&&l&2048&&Lu(o.alternate,o);break;default:Bu(a,o,s,c,i)}t=t.sibling}}function Vu(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Vu(n,r),i&2048&&Iu(r.alternate,r);break;case 24:Vu(n,r),i&2048&&Lu(r.alternate,r);break;default:Vu(n,r)}t=t.sibling}}var Hu=8192;function Uu(e,t,n){if(e.subtreeFlags&Hu)for(e=e.child;e!==null;)Wu(e,t,n),e=e.sibling}function Wu(e,t,n){switch(e.tag){case 26:Uu(e,t,n),e.flags&Hu&&(e.memoizedState===null?(e=e.stateNode,(t&335544128)===t&&Zm(n,e)):Qm(n,Du,e.memoizedState,e.memoizedProps));break;case 5:Uu(e,t,n),e.flags&Hu&&(e=e.stateNode,(t&335544128)===t&&Zm(n,e));break;case 3:case 4:var r=Du;Du=bm(e.stateNode.containerInfo),Uu(e,t,n),Du=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=Hu,Hu=16777216,Uu(e,t,n),Hu=r):Uu(e,t,n));break;case 30:if((e.flags&Hu)!==0&&(r=e.memoizedProps.name,r!=null&&r!==`auto`)){var i=e.stateNode;i.paired=null,Rl===null&&(Rl=new Map),Rl.set(r,i)}Uu(e,t,n);break;default:Uu(e,t,n)}}function Gu(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Ku(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];ou=r,Yu(r,e)}Gu(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)qu(e),e=e.sibling}function qu(e){switch(e.tag){case 0:case 11:case 15:Ku(e),e.flags&2048&&bl(9,e,e.return);break;case 3:Ku(e);break;case 12:Ku(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Ju(e)):Ku(e);break;default:Ku(e)}}function Ju(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];ou=r,Yu(r,e)}Gu(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:bl(8,t,t.return),Ju(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Ju(t));break;default:Ju(t)}e=e.sibling}}function Yu(e,t){for(;ou!==null;){var n=ou;switch(n.tag){case 0:case 11:case 15:bl(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:ka(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,ou=r;else a:for(n=e;ou!==null;){r=ou;var i=r.sibling,a=r.return;if(_u(r),r===n){ou=null;break a}if(i!==null){i.return=a,ou=i;break a}ou=a}}}var Xu={getCacheForType:function(e){var t=xa(Da),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return xa(Da).controller.signal}},Zu=typeof WeakMap==`function`?WeakMap:Map,J=0,Qu=null,Y=null,X=0,$u=0,ed=null,td=!1,nd=!1,rd=!1,id=0,ad=0,od=0,sd=0,cd=0,ld=0,ud=0,dd=null,fd=null,pd=!1,md=0,hd=0,gd=1/0,_d=null,vd=null,yd=0,bd=null,xd=null,Sd=0,Cd=0,wd=null,Td=null,Ed=null,Dd=null,Od=null,kd=0,Ad=null;function jd(){return J&2&&X!==0?X&-X:O.T===null?F():Pf()}function Md(){if(ld===0){if(!(X&536870912)||W){var e=ct;ct<<=1,!(ct&3932160)&&(ct=262144),ld=e}else ld=536870912}return e=Do.current,e!==null&&(e.flags|=32),ld}function Nd(e,t){if(t!=null){var n=e.stateNode,r=n.ref;r===null&&(r=n.ref=Pp(vi(e.memoizedProps,n))),Dd===null&&(Dd=[]),Dd.push(t.bind(null,r))}}function Pd(e,t,n){(e===Qu&&($u===2||$u===9)||e.cancelPendingCommit!==null)&&(Vd(e,0),Rd(e,X,ld,!1)),_t(e,n),J&2&&e===Qu||(e===Qu&&(!(J&2)&&(sd|=n),ad===4&&Rd(e,X,ld,!1)),Ef(e))}function Fd(e,t,n){if(J&6)throw Error(i(327));var r=!n&&!(t&127)&&(t&e.expiredLanes)===0||ft(e,t),a=r?Yd(e,t):qd(e,t,!0),o=r;do{if(a===0){nd&&!r&&Rd(e,t,0,!1);break}if(n=e.current.alternate,o&&!Ld(n))a=qd(e,t,!1),o=!1;else{if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=dd;var l=c.current.memoizedState.isDehydrated;if(l&&(Vd(c,s).flags|=256),s=qd(c,s,!1),s!==2&&s!==6){if(rd&&!l){c.errorRecoveryDisabledLanes|=o,sd|=o,a=4;break a}o=fd,fd=a,o!==null&&(fd===null?fd=o:fd.push.apply(fd,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){Vd(e,0),Rd(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t&&(t&62914560)!==t)break;case 6:Rd(r,t,ld,!td);break a;case 2:fd=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=md+300-M(),10<a)){if(Rd(r,t,ld,!td),dt(r,0,!0)!==0)break a;Sd=t,r.timeoutHandle=gp(Id.bind(null,r,n,fd,_d,pd,t,ld,sd,ud,td,o,`Throttled`,-0,0),a);break a}Id(r,n,fd,_d,pd,t,ld,sd,ud,td,o,null,-0,0)}break}}while(1);Ef(e)}function Id(e,t,n,r,i,a,o,s,c,l,u,d,f,p){e.timeoutHandle=-1;var m=t.subtreeFlags,h=(a&335544064)===a;d=null,(h||m&8192||(m&16785408)==16785408)&&(d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:yn},Rl=null,Wu(t,a,d),h&&(m=d,h=e.containerInfo,h=(h.nodeType===9?h:h.ownerDocument).__reactViewTransition,h!=null&&(m.count++,m.waitingForViewTransition=!0,m=nh.bind(m),h.finished.then(m,m))),m=(a&62914560)===a?md-M():(a&4194048)===a?hd-M():0,m=eh(d,m),m!==null)?(Sd=a,e.cancelPendingCommit=m(nf.bind(null,e,t,a,n,r,i,o,s,c,l,u,d,null,f,p)),Rd(e,a,o,!l)):nf(e,t,a,n,r,i,o,s,c,l,u,d)}function Ld(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Hr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Rd(e,t,n,r){t=pt(e,t),t&=~cd,t&=~sd,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-N(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&yt(e,n,t)}function zd(){return J&6?!0:(Df(0,!1),!1)}function Bd(){if(Y!==null){if($u===0)var e=Y.return;else e=Y,pa=fa=null,ns(e),to=null,no=0,e=Y;for(;e!==null;)vl(e.alternate,e),e=e.return;Y=null}}function Vd(e,t){var n=e.timeoutHandle;return n!==-1&&(e.timeoutHandle=-1,_p(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),Sd=0,Bd(),Qu=e,Y=n=Ni(e.current,null),X=t,$u=0,ed=null,td=!1,nd=ft(e,t),rd=!1,ud=ld=cd=sd=od=ad=0,fd=dd=null,pd=!1,id=pt(e,t),Ci(),n}function Hd(e,t){G=null,O.H=dc,t===Ga||t===qa?(t=$a(),$u=3):t===Ka?(t=$a(),$u=4):$u=t===kc?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,ed=t,Y===null&&(ad=1,Cc(e,Bi(t,e.current)))}function Ud(){var e=Do.current;return e===null?!0:(X&4194048)===X?Oo===null:(X&62914560)===X||X&536870912?e===Oo:!1}function Wd(){var e=O.H;return O.H=dc,e===null?dc:e}function Gd(){var e=O.A;return O.A=Xu,e}function Kd(){ad=4,td||(X&4194048)!==X&&Do.current!==null||(nd=!0),!(od&134217727)&&!(sd&134217727)||Qu===null||Rd(Qu,X,ld,!1)}function qd(e,t,n){var r=J;J|=2;var i=Wd(),a=Gd();(Qu!==e||X!==t)&&(_d=null,Vd(e,t)),t=!1;var o=ad;a:do try{if($u!==0&&Y!==null){var s=Y,c=ed;switch($u){case 8:Bd(),o=6;break a;case 3:case 2:case 9:case 6:Do.current===null&&(t=!0);var l=$u;if($u=0,ed=null,$d(e,s,c,l),n&&nd){o=0;break a}break;default:l=$u,$u=0,ed=null,$d(e,s,c,l)}}Jd(),o=ad;break}catch(t){Hd(e,t)}while(1);return t&&e.shellSuspendCounter++,pa=fa=null,J=r,O.H=i,O.A=a,Y===null&&(Qu=null,X=0,Ci()),o}function Jd(){for(;Y!==null;)Zd(Y)}function Yd(e,t){var n=J;J|=2;var r=Wd(),a=Gd();Qu!==e||X!==t?(_d=null,gd=M()+500,Vd(e,t)):nd=ft(e,t);a:do try{if($u!==0&&Y!==null){t=Y;var o=ed;b:switch($u){case 1:$u=0,ed=null,$d(e,t,o,1);break;case 2:case 9:if(Ya(o)){$u=0,ed=null,Qd(t);break}t=function(){$u!==2&&$u!==9||Qu!==e||($u=7),Ef(e)},o.then(t,t);break a;case 3:$u=7;break a;case 4:$u=5;break a;case 7:Ya(o)?($u=0,ed=null,Qd(t)):($u=0,ed=null,$d(e,t,o,7));break;case 5:var s=null;switch(Y.tag){case 26:s=Y.memoizedState;case 5:case 27:var c=Y;if(s?Ym(s):c.stateNode.complete){$u=0,ed=null;var l=c.sibling;if(l!==null)Y=l;else{var u=c.return;u===null?Y=null:(Y=u,ef(u))}break b}}$u=0,ed=null,$d(e,t,o,5);break;case 6:$u=0,ed=null,$d(e,t,o,6);break;case 8:Bd(),ad=6;break a;default:throw Error(i(462))}}Xd();break}catch(t){Hd(e,t)}while(1);return pa=fa=null,O.H=r,O.A=a,J=n,Y===null?(Qu=null,X=0,Ci(),ad):0}function Xd(){for(;Y!==null&&!Ge();)Zd(Y)}function Zd(e){var t=ll(e.alternate,e,id);e.memoizedProps=e.pendingProps,t===null?ef(e):Y=t}function Qd(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Uc(n,t,t.pendingProps,t.type,void 0,X);break;case 11:t=Uc(n,t,t.pendingProps,t.type.render,t.ref,X);break;case 5:ns(t);var r=t;r===ea&&(W?(oa(r),r.tag===5&&r.stateNode!=null&&(U=r.stateNode)):(oa(r),W=!0));default:vl(n,t),t=Y=Pi(t,id),t=ll(n,t,id)}e.memoizedProps=e.pendingProps,t===null?ef(e):Y=t}function $d(e,t,n,r){pa=fa=null,ns(t),to=null,no=0;var i=t.return;try{if(Oc(e,i,t,n,X)){ad=1,Cc(e,Bi(n,e.current)),Y=null;return}}catch(t){if(i!==null)throw Y=i,t;ad=1,Cc(e,Bi(n,e.current)),Y=null;return}t.flags&32768?(W||r===1?e=!0:nd||X&536870912?e=!1:(td=e=!0,(r===2||r===9||r===3||r===6)&&(r=Do.current,r!==null&&r.tag===13&&(r.flags|=16384))),tf(t,e)):ef(t)}function ef(e){var t=e;do{if(t.flags&32768){tf(t,td);return}e=t.return;var n=gl(t.alternate,t,id);if(n!==null){Y=n;return}if(t=t.sibling,t!==null){Y=t;return}Y=t=e}while(t!==null);ad===0&&(ad=5)}function tf(e,t){do{var n=_l(e.alternate,e);if(n!==null){n.flags&=32767,Y=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){Y=e;return}Y=e=n}while(e!==null);ad=6,Y=null}function nf(e,t,n,r,a,o,s,c,l,u,d,f){e.cancelPendingCommit=null;do df();while(yd!==0);if(J&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));e===Qu&&(Y=Qu=null,X=0),xd=t,bd=e,Sd=n,wd=a,Td=r,rf(e,t,n,s,c,l,f)}}function rf(e,t,n,r,i,a,o){var s=t.lanes|t.childLanes;if(Cd=s,s|=B,vt(e,n,s,r,i,a),Dd=null,(n&335544064)===n?(Od=Ma(e),r=10262):(Od=null,r=10256),(t.subtreeFlags&r)!==0||(t.flags&r)!==0?(e.callbackNode=null,e.callbackPriority=0,yf(Xe,function(){return ff(),null})):(e.callbackNode=null,e.callbackPriority=0),Ll=!1,r=!!(t.flags&13878),t.subtreeFlags&13878||r){r=O.T,O.T=null,i=k.p,k.p=2,a=J,J|=4;try{du(e,t,n)}finally{J=a,k.p=i,O.T=r}}yd=1,Ll?Ed=Mp(o,e.containerInfo,Od,sf,cf,of,lf,ff,af,null,null):(sf(),cf(),lf())}function af(e){if(yd!==0){var t=bd.onRecoverableError;t(e,{componentStack:null})}}function of(){yd===3&&(yd=0,Mu(xd,bd),yd=4)}function sf(){if(yd===1){yd=0;var e=bd,t=xd,n=Sd,r=!!(t.flags&13878);if(t.subtreeFlags&13878||r){r=O.T,O.T=null;var i=k.p;k.p=2;var a=J;J|=4;try{cu=lu=!1,Ou(t,e,n),n=cp;var o=Jr(e.containerInfo),s=n.focusedElem,c=n.selectionRange;if(o!==s&&s&&s.ownerDocument&&qr(s.ownerDocument.documentElement,s)){if(c!==null&&Yr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Kr(s,h),v=Kr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}gh=!!sp,cp=sp=null}finally{J=a,k.p=i,O.T=r}}e.current=t,yd=2}}function cf(){if(yd===2){yd=0;var e=bd,t=xd,n=!!(t.flags&8772);if(t.subtreeFlags&8772||n){n=O.T,O.T=null;var r=k.p;k.p=2;var i=J;J|=4;try{pu(e,t.alternate,t)}finally{J=i,k.p=r,O.T=n}}yd=3}}function lf(){if(yd===4||yd===3){yd=0;var e=Ed;Ed=null,Ke();var t=bd,n=xd,r=Sd,i=Td,a=(r&335544064)===r?10262:10256;if((n.subtreeFlags&a)!==0||(n.flags&a)!==0?yd=5:(yd=0,xd=bd=null,uf(t,t.pendingLanes)),a=t.pendingLanes,a===0&&(vd=null),St(r),n=n.stateNode,nt&&typeof nt.onCommitFiberRoot==`function`)try{nt.onCommitFiberRoot(tt,n,void 0,(n.current.flags&128)==128)}catch{}if(i!==null){n=O.T,a=k.p,k.p=2,O.T=null;try{for(var o=t.onRecoverableError,s=0;s<i.length;s++){var c=i[s];o(c.value,{componentStack:c.stack})}}finally{O.T=n,k.p=a}}if(i=Dd,o=Od,Od=null,i!==null&&(Dd=null,o===null&&(o=[]),e!==null))for(c=0;c<i.length;c++)n=(0,i[c])(o),n!==void 0&&e.finished.finally(n);Sd&3&&df(),Ef(t),a=t.pendingLanes,r&261930&&a&42?t===Ad?kd++:(kd=0,Ad=t):(kd=0,Ad=null),Df(0,!1)}}function uf(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,ka(t)))}function df(){return Ed!==null&&(Ed.skipTransition(),Ed=null),sf(),cf(),lf(),ff()}function ff(){if(yd!==5)return!1;var e=bd,t=Cd;Cd=0;var n=St(Sd),r=O.T,a=k.p;try{k.p=32>n?32:n,O.T=null,n=wd,wd=null;var o=bd,s=Sd;if(yd=0,xd=bd=null,Sd=0,J&6)throw Error(i(331));var c=J;if(J|=4,qu(o.current),zu(o,o.current,s,n),J=c,Df(0,!1),nt&&typeof nt.onPostCommitFiberRoot==`function`)try{nt.onPostCommitFiberRoot(tt,o)}catch{}return!0}finally{k.p=a,O.T=r,uf(e,t)}}function pf(e,t,n){t=Bi(n,t),t=Tc(e.stateNode,t,2),e=mo(e,t,2),e!==null&&(_t(e,2),Ef(e))}function Z(e,t,n){if(e.tag===3)pf(e,e,n);else for(;t!==null;){if(t.tag===3){pf(t,e,n);break}if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(vd===null||!vd.has(r))){e=Bi(n,e),n=Ec(2),r=mo(t,n,2),r!==null&&(Dc(n,r,t,e),_t(r,2),Ef(r));break}}t=t.return}}function mf(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Zu;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(rd=!0,i.add(n),e=hf.bind(null,e,t,n),t.then(e,e))}function hf(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,Qu===e&&(X&n)===n&&(ad===4||ad===3&&(X&62914560)===X&&300>M()-md?J&2?cd|=n:Vd(e,0):cd|=n,ud===X&&(ud=0)),Ef(e)}function gf(e,t){t===0&&(t=ht()),e=Ei(e,t),e!==null&&(_t(e,t),Ef(e))}function _f(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),gf(e,n)}function vf(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),gf(e,n)}function yf(e,t){return Ue(e,t)}var bf=null,xf=null,Sf=!1,Cf=!1,wf=!1,Tf=0;function Ef(e){e!==xf&&e.next===null&&(xf===null?bf=xf=e:xf=xf.next=e),Cf=!0,Sf||(Sf=!0,Nf())}function Df(e,t){if(!wf&&Cf){wf=!0;do for(var n=!1,r=bf;r!==null;){if(!t){if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-N(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,Mf(r,a))}else a=X,a=dt(r,r===Qu?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||ft(r,a)||(n=!0,Mf(r,a))}r=r.next}while(n);wf=!1}}function Of(){kf()}function kf(){Cf=Sf=!1;var e=0;Tf!==0&&hp()&&(e=Tf);for(var t=M(),n=null,r=bf;r!==null;){var i=r.next,a=Af(r,t);a===0?(r.next=null,n===null?bf=i:n.next=i,i===null&&(xf=n)):(n=r,(e!==0||a&3)&&(Cf=!0)),r=i}yd!==0&&yd!==5||Df(e,!1),Tf!==0&&(Tf=0)}function Af(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-N(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=mt(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=Qu,n=X,n=dt(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&($u===2||$u===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&We(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||ft(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&We(r),St(n)){case 2:case 8:n=Ye;break;case 32:n=Xe;break;case 268435456:n=Qe;break;default:n=Xe}return r=jf.bind(null,e),n=Ue(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&We(r),e.callbackPriority=2,e.callbackNode=null,2}function jf(e,t){if(yd!==0&&yd!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(df()&&e.callbackNode!==n)return null;var r=X;return r=dt(e,e===Qu?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(Fd(e,r,t),Af(e,M()),e.callbackNode!=null&&e.callbackNode===n?jf.bind(null,e):null)}function Mf(e,t){if(df())return null;Fd(e,t,!0)}function Nf(){bp(function(){J&6?Ue(Je,Of):kf()})}function Pf(){if(Tf===0){var e=Fa;e===0&&(e=st,st<<=1,!(st&261888)&&(st=256)),Tf=e}return Tf}function Ff(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:vn(e)}function If(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=Ff((i[Et]||null).action),o=r.submitter;o&&(t=(t=o[Et]||null)?Ff(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new Bn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(Tf!==0){var e=new FormData(i,o);Zs(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=new FormData(i,o),Zs(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var Lf=0;Lf<hi.length;Lf++){var Rf=hi[Lf];gi(Rf.toLowerCase(),`on`+(Rf[0].toUpperCase()+Rf.slice(1)))}gi(si,`onAnimationEnd`),gi(ci,`onAnimationIteration`),gi(li,`onAnimationStart`),gi(`dblclick`,`onDoubleClick`),gi(`focusin`,`onFocus`),gi(`focusout`,`onBlur`),gi(ui,`onTransitionRun`),gi(di,`onTransitionStart`),gi(fi,`onTransitionCancel`),gi(pi,`onTransitionEnd`),Wt(`onMouseEnter`,[`mouseout`,`mouseover`]),Wt(`onMouseLeave`,[`mouseout`,`mouseover`]),Wt(`onPointerEnter`,[`pointerout`,`pointerover`]),Wt(`onPointerLeave`,[`pointerout`,`pointerover`]),Ut(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),Ut(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),Ut(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),Ut(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),Ut(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),Ut(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var zf=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),Bf=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(zf));function Vf(e,t){t=!!(t&4);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){xi(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){xi(e)}i.currentTarget=null,a=c}}}}function Q(e,t){var n=t[Ot];n===void 0&&(n=t[Ot]=new Set);var r=e+`__bubble`;n.has(r)||(Gf(t,e,2,!1),n.add(r))}function Hf(e,t,n){var r=0;t&&(r|=4),Gf(n,e,r,t)}var Uf=`_reactListening`+Math.random().toString(36).slice(2);function Wf(e){if(!e[Uf]){e[Uf]=!0,Vt.forEach(function(t){t!==`selectionchange`&&(Bf.has(t)||Hf(t,!1,e),Hf(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Uf]||(t[Uf]=!0,Hf(`selectionchange`,!1,t))}}function Gf(e,t,n,r){switch(Ch(t)){case 2:var i=_h;break;case 8:i=vh;break;default:i=yh}n=i.bind(null,t,n,e),i=void 0,!kn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function Kf(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=Ft(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}En(function(){var r=a,i=xn(n),s=[];a:{var c=mi.get(e);if(c!==void 0){var l=Bn,u=e;switch(e){case`keypress`:if(Fn(n)===0)break a;case`keydown`:case`keyup`:l=ir;break;case`focusin`:u=`focus`,l=Yn;break;case`focusout`:u=`blur`,l=Yn;break;case`beforeblur`:case`afterblur`:l=Yn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=qn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=Jn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=sr;break;case si:case ci:case li:l=Xn;break;case pi:l=cr;break;case`scroll`:case`scrollend`:l=Hn;break;case`wheel`:l=lr;break;case`copy`:case`cut`:case`paste`:l=Zn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=ar;break;case`submit`:l=or;break;case`toggle`:case`beforetoggle`:l=ur}var d=!!(t&4),f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=Dn(m,p),g!=null&&d.push(qf(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(l=e===`mouseover`||e===`pointerover`,c=e===`mouseout`||e===`pointerout`,l&&n!==bn&&(u=n.relatedTarget||n.fromElement)&&(Ft(u)||u[Dt]))break a;(c||l)&&(u=i.window===i?i:(l=i.ownerDocument)?l.defaultView||l.parentWindow:window,c?(l=n.relatedTarget||n.toElement,c=r,l=l?Ft(l):null,l!==null&&(f=o(l),d=l.tag,l!==f||d!==5&&d!==27&&d!==6)&&(l=null)):(c=null,l=r),c!==l&&(d=qn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=ar,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=c==null?u:Lt(c),h=l==null?u:Lt(l),u=new d(g,m+`leave`,c,n,i),u.target=f,u.relatedTarget=h,g=null,Ft(i)===r&&(d=new d(p,m+`enter`,l,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,d=c&&l?te(c,l,Yf):null,c!==null&&Xf(s,u,c,d,!1),l!==null&&f!==null&&Xf(s,f,l,d,!0)))}a:{if(c=r?Lt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var _=Ar;else if(wr(c)){if(jr)_=Br;else{_=Rr;var v=Lr}}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&hn(r.elementType)&&(_=Ar):_=zr;if(_&&=_(e,r)){Tr(s,_,n,i);break a}v&&v(e,c,r)}switch(v=r?Lt(r):window,e){case`focusin`:(wr(v)||v.contentEditable===`true`)&&(Zr=v,Qr=r,$r=null);break;case`focusout`:$r=Qr=Zr=null;break;case`mousedown`:ei=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:ei=!1,ti(s,n,i);break;case`selectionchange`:if(Xr)break;case`keydown`:case`keyup`:ti(s,n,i)}var y;if(fr)b:{switch(e){case`compositionstart`:var b=`onCompositionStart`;break b;case`compositionend`:b=`onCompositionEnd`;break b;case`compositionupdate`:b=`onCompositionUpdate`;break b}b=void 0}else br?vr(e,n)&&(b=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(b=`onCompositionStart`);b&&(hr&&n.locale!==`ko`&&(br||b!==`onCompositionStart`?b===`onCompositionEnd`&&br&&(y=Pn()):(jn=i,Mn=`value`in jn?jn.value:jn.textContent,br=!0)),v=Jf(r,b),0<v.length&&(b=new Qn(b,e,null,n,i),s.push({event:b,listeners:v}),y?b.data=y:(y=yr(n),y!==null&&(b.data=y)))),(y=mr?xr(e,n):Sr(e,n))&&(b=Jf(r,`onBeforeInput`),0<b.length&&(v=new Qn(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:v,listeners:b}),v.data=y)),If(s,e,r,n,i)}Vf(s,t)})}function qf(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Jf(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=Dn(e,n),i!=null&&r.unshift(qf(e,i,a)),i=Dn(e,t),i!=null&&r.push(qf(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Yf(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Xf(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=Dn(n,a),l!=null&&o.unshift(qf(n,l,c))):i||(l=Dn(n,a),l!=null&&o.push(qf(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Zf=/\r\n?/g,Qf=/\u0000|\uFFFD/g;function $f(e){return(typeof e==`string`?e:``+e).replace(Zf,`
`).replace(Qf,``)}function ep(e,t){return t=$f(t),$f(e)===t}function $(e,t,n,r,a,o){switch(n){case`children`:if(typeof r==`string`)t===`body`||t===`textarea`&&r===``||fn(e,r);else if(typeof r==`number`||typeof r==`bigint`)t!==`body`&&fn(e,``+r);else return;break;case`className`:Zt(e,`class`,r);break;case`tabIndex`:Zt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:Zt(e,n,r);break;case`style`:mn(e,r,o);return;case`data`:if(t!==`object`){Zt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)||r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=vn(r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}if(typeof o==`function`&&(n===`formAction`?(t!==`input`&&$(e,t,`name`,a.name,a,null),$(e,t,`formEncType`,a.formEncType,a,null),$(e,t,`formMethod`,a.formMethod,a,null),$(e,t,`formTarget`,a.formTarget,a,null)):($(e,t,`encType`,a.encType,a,null),$(e,t,`method`,a.method,a,null),$(e,t,`target`,a.target,a,null))),r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=vn(r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=yn);return;case`onScroll`:r!=null&&Q(`scroll`,e);return;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=vn(r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`credentialless`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Q(`beforetoggle`,e),Q(`toggle`,e),Xt(e,`popover`,r);break;case`xlinkActuate`:Qt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:Qt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:Qt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:Qt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:Qt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:Qt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:Qt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:Qt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:Qt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Xt(e,`is`,r);break;case`innerText`:case`textContent`:return;default:if(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)n=gn.get(n)||n,Xt(e,n,r);else return}I=!0}function tp(e,t,n,r,a,o){switch(n){case`style`:mn(e,r,o);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`children`:if(typeof r==`string`)fn(e,r);else if(typeof r==`number`||typeof r==`bigint`)fn(e,``+r);else return;break;case`onScroll`:r!=null&&Q(`scroll`,e);return;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);return;case`onClick`:r!=null&&(e.onclick=yn);return;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:return;case`innerText`:case`textContent`:return;default:if(!Ht.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),o=n.slice(2,a?n.length-7:void 0),t=e[Et]||null,t=t==null?null:t[n],typeof t==`function`&&e.removeEventListener(o,t,a),typeof r==`function`)){typeof t!=`function`&&t!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(o,r,a);break a}I=!0,n in e?e[n]=r:!0===r?e.setAttribute(n,``):Xt(e,n,r)}return}I=!0}function np(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Q(`error`,e),Q(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,o,s,n,null)}}a&&$(e,t,`srcSet`,n.srcSet,n,null),r&&$(e,t,`src`,n.src,n,null);return;case`input`:Q(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:$(e,t,r,d,n,null)}}sn(e,o,c,l,u,s,a,!1);return;case`select`:for(a in Q(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:$(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&ln(e,!!r,n,!0):ln(e,!!r,t,!1);return;case`textarea`:for(s in Q(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:$(e,t,s,c,n,null)}dn(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:$(e,t,l,r,n,null)}return;case`dialog`:Q(`beforetoggle`,e),Q(`toggle`,e),Q(`cancel`,e),Q(`close`,e);break;case`iframe`:case`object`:Q(`load`,e);break;case`video`:case`audio`:for(r=0;r<zf.length;r++)Q(zf[r],e);break;case`image`:Q(`error`,e),Q(`load`,e);break;case`details`:Q(`toggle`,e);break;case`embed`:case`source`:case`link`:Q(`error`,e),Q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,u,r,n,null)}return;default:if(hn(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&tp(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&$(e,t,c,r,n,null))}var rp={};function ip(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||$(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:m!==f&&(I=!0),o=m;break;case`name`:m!==f&&(I=!0),a=m;break;case`checked`:m!==f&&(I=!0),u=m;break;case`defaultChecked`:m!==f&&(I=!0),d=m;break;case`value`:m!==f&&(I=!0),s=m;break;case`defaultValue`:m!==f&&(I=!0),c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&$(e,t,p,m,r,f)}}on(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||$(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:o!==l&&(I=!0),p=o;break;case`defaultValue`:o!==l&&(I=!0),c=o;break;case`multiple`:o!==l&&(I=!0),s=o;default:o!==l&&$(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?ln(e,!!n,n?[]:``,!1):ln(e,!!n,t,!0)):ln(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:$(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:a!==o&&(I=!0),p=a;break;case`defaultValue`:a!==o&&(I=!0),m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&$(e,t,s,a,r,o)}un(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:$(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:p!==m&&(I=!0),e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:$(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&$(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:$(e,t,u,p,r,m)}return;default:if(hn(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&tp(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||tp(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&$(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||$(e,t,f,p,r,m)}function ap(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function op(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&ap(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&ap(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var sp=null,cp=null;function lp(e){return e.nodeType===9?e:e.ownerDocument}function up(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function dp(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function fp(e,t,n,r){return n=lp(n).createElement(e),n[Tt]=r,n[Et]=t,np(n,e,t),zt(n),n}function pp(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var mp=null;function hp(){var e=window.event;return e&&e.type===`popstate`?e!==mp&&(mp=e,!0):(mp=null,!1)}var gp=typeof setTimeout==`function`?setTimeout:void 0,_p=typeof clearTimeout==`function`?clearTimeout:void 0,vp=typeof Promise==`function`?Promise:void 0,yp=typeof requestAnimationFrame==`function`?requestAnimationFrame:gp,bp=typeof queueMicrotask==`function`?queueMicrotask:vp===void 0?gp:function(e){return vp.resolve(null).then(e).catch(xp)};function xp(e){setTimeout(function(){throw e})}function Sp(e){return e===`head`}function Cp(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8){if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Hh(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)_m(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,_m(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[Mt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&_m(e.ownerDocument.body)}n=i}while(n);Hh(t)}function wp(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8){if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++}n=r}while(n)}function Tp(e,t,n){if(t=CSS.escape(t)===t?t:`r-`+btoa(t).replace(/=/g,``),e.style.viewTransitionName=t,n!=null&&(e.style.viewTransitionClass=n),n=getComputedStyle(e),n.display===`inline`){if(t=e.getClientRects(),t.length===1)var r=1;else for(var i=r=0;i<t.length;i++){var a=t[i];0<a.width&&0<a.height&&r++}r===1&&(e=e.style,e.display=t.length===1?`inline-block`:`block`,e.marginTop=`-`+n.paddingTop,e.marginBottom=`-`+n.paddingBottom)}}function Ep(e,t){e=e.style,t=t.style;var n=t==null?null:t.hasOwnProperty(`viewTransitionName`)?t.viewTransitionName:t.hasOwnProperty(`view-transition-name`)?t[`view-transition-name`]:null;e.viewTransitionName=n==null||typeof n==`boolean`?``:(``+n).trim(),n=t==null?null:t.hasOwnProperty(`viewTransitionClass`)?t.viewTransitionClass:t.hasOwnProperty(`view-transition-class`)?t[`view-transition-class`]:null,e.viewTransitionClass=n==null||typeof n==`boolean`?``:(``+n).trim(),e.display===`inline-block`&&(t==null?e.display=e.margin=``:(n=t.display,e.display=n==null||typeof n==`boolean`?``:n,n=t.margin,n==null?(n=t.hasOwnProperty(`marginTop`)?t.marginTop:t[`margin-top`],e.marginTop=n==null||typeof n==`boolean`?``:n,t=t.hasOwnProperty(`marginBottom`)?t.marginBottom:t[`margin-bottom`],e.marginBottom=t==null||typeof t==`boolean`?``:t):e.margin=n))}function Dp(e,t,n){return n=n.ownerDocument.defaultView,{rect:e,abs:t.position===`absolute`||t.position===`fixed`,clip:t.clipPath!==`none`||t.overflow!==`visible`||t.filter!==`none`||t.mask!==`none`||t.mask!==`none`||t.borderRadius!==`0px`,view:0<=e.bottom&&0<=e.right&&e.top<=n.innerHeight&&e.left<=n.innerWidth}}function Op(e){return Dp(e.getBoundingClientRect(),getComputedStyle(e),e)}function kp(e){var t=e.getBoundingClientRect();t=new DOMRect(t.x+2e4,t.y+2e4,t.width,t.height);var n=getComputedStyle(e);return Dp(t,n,e)}function Ap(e){return e.documentElement.clientHeight}function jp(e){this.addEventListener(`load`,e),this.addEventListener(`error`,e)}function Mp(e,t,n,r,i,a,o,s,c){var l=t.nodeType===9?t:t.ownerDocument;try{var u=l.startViewTransition({update:function(){var t=l.defaultView,n=t.navigation&&t.navigation.transition,o=l.fonts.status;r();var s=[];if(o===`loaded`&&(Ap(l),l.fonts.status===`loading`&&s.push(l.fonts.ready)),o=s.length,e!==null)for(var c=e.suspenseyImages,u=0,d=0;d<c.length;d++){var f=c[d];if(!f.complete){var p=f.getBoundingClientRect();if(0<p.bottom&&0<p.right&&p.top<t.innerHeight&&p.left<t.innerWidth){if(u+=Xm(f),u>$m){s.length=o;break}f=new Promise(jp.bind(f)),s.push(f)}}}if(0<s.length)return t=Promise.race([Promise.all(s),new Promise(function(e){return setTimeout(e,500)})]).then(i,i),(n?Promise.allSettled([n.finished,t]):t).then(a,a);if(i(),n)return n.finished.then(a,a);a()},types:n});l.__reactViewTransition=u;var d=[];return u.ready.then(function(){for(var e=l.documentElement.getAnimations({subtree:!0}),t=0;t<e.length;t++){var n=e[t],r=n.effect,i=r.pseudoElement;if(i!=null&&i.startsWith(`::view-transition`)){d.push(n),n=r.getKeyframes();for(var a=i=void 0,s=!0,c=0;c<n.length;c++){var u=n[c],f=u.width;if(i===void 0)i=f;else if(i!==f){s=!1;break}if(f=u.height,a===void 0)a=f;else if(a!==f){s=!1;break}delete u.width,delete u.height,u.transform===`none`&&delete u.transform}s&&i!==void 0&&a!==void 0&&(r.setKeyframes(n),s=getComputedStyle(r.target,r.pseudoElement),s.width!==i||s.height!==a)&&(s=n[0],s.width=i,s.height=a,s=n[n.length-1],s.width=i,s.height=a,r.setKeyframes(n))}}o()},function(e){l.__reactViewTransition===u&&(l.__reactViewTransition=null);try{if(typeof e==`object`&&e)switch(e.name){case`InvalidStateError`:(e.message===`View transition was skipped because document visibility state is hidden.`||e.message===`Skipping view transition because document visibility state has become hidden.`||e.message===`Skipping view transition because viewport size changed.`||e.message===`Transition was aborted because of invalid state`)&&(e=null)}e!==null&&c(e)}finally{r(),i(),o()}}),u.finished.finally(function(){for(var e=0;e<d.length;e++)d[e].cancel();l.__reactViewTransition===u&&(l.__reactViewTransition=null),s()}),u}catch{return r(),i(),o(),null}}function Np(e,t){this._scope=document.documentElement,this._selector=`::view-transition-`+e+`(`+t+`)`}Np.prototype.animate=function(e,t){return t=typeof t==`number`?{duration:t}:T({},t),t.pseudoElement=this._selector,this._scope.animate(e,t)},Np.prototype.getAnimations=function(){for(var e=this._scope,t=this._selector,n=e.getAnimations({subtree:!0}),r=[],i=0;i<n.length;i++){var a=n[i].effect;a!==null&&a.target===e&&a.pseudoElement===t&&r.push(n[i])}return r},Np.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function Pp(e){return{name:e,group:new Np(`group`,e),imagePair:new Np(`image-pair`,e),old:new Np(`old`,e),new:new Np(`new`,e)}}function Fp(e){this._fragmentFiber=e,this._observers=this._eventListeners=null}Fp.prototype.addEventListener=function(e,t,n){var r=null,i=null;if(!(n!=null&&typeof n!=`boolean`&&(r=n.signal||null,r!==null&&r.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var a=this._eventListeners;if(Bp(a,e,t,n)===-1){var o=this,s=t;n!=null&&typeof n!=`boolean`&&!0===n.once&&(s=function(r){o.removeEventListener(e,t,n),typeof t==`function`?t.call(this,r):t.handleEvent(r)}),r!==null&&(i=o.removeEventListener.bind(o,e,t,n),r.addEventListener(`abort`,i,{once:!0}),i=r.removeEventListener.bind(r,`abort`,i)),r=Rp(n),a.push({type:e,listener:t,optionsOrUseCapture:n,attachedListener:s,cleanup:i}),h(this._fragmentFiber.child,!1,Ip,e,s,r)}this._eventListeners=a}};function Ip(e,t,n,r){return b(e).addEventListener(t,n,r),!1}Fp.prototype.removeEventListener=function(e,t,n){var r=this._eventListeners;if(r!==null&&(t=Bp(r,e,t,n),t!==-1)){var i=r[t];n=i.attachedListener;var a=i.cleanup;i=Rp(i.optionsOrUseCapture),h(this._fragmentFiber.child,!1,Lp,e,n,i),r.splice(t,1),a!==null&&a()}};function Lp(e,t,n,r){return b(e).removeEventListener(t,n,r),!1}function Rp(e){return e!=null&&typeof e!=`boolean`&&(!0===e.once||e.signal instanceof AbortSignal)?{capture:e.capture,passive:e.passive}:e}function zp(e){return e==null?`c=0`:typeof e==`boolean`?`c=`+(e?`1`:`0`):`c=`+(e.capture?`1`:`0`)}function Bp(e,t,n,r){if(e.length===0)return-1;r=zp(r);for(var i=0;i<e.length;i++){var a=e[i];if(a.type===t&&a.listener===n&&zp(a.optionsOrUseCapture)===r)return i}return-1}Fp.prototype.dispatchEvent=function(e){var t=g(this._fragmentFiber);if(t===null)return!0;t=b(t);var n=this._eventListeners;if(n!==null&&0<n.length||!e.bubbles){var r=t.nodeType===9?t.createComment(``):document.createTextNode(``);if(n)for(var i=0;i<n.length;i++){var a=n[i];r.addEventListener(a.type,a.attachedListener,Rp(a.optionsOrUseCapture))}if(t.appendChild(r),e=r.dispatchEvent(e),n)for(i=0;i<n.length;i++)a=n[i],r.removeEventListener(a.type,a.attachedListener,Rp(a.optionsOrUseCapture));return t.removeChild(r),e}return t.dispatchEvent(e)},Fp.prototype.focus=function(e){h(this._fragmentFiber.child,!0,Vp,e,void 0,void 0)};function Vp(e,t){return e.tag!==6&&(e=b(e),pm(e,t))}Fp.prototype.focusLast=function(e){var t=[];h(this._fragmentFiber.child,!0,Hp,t,void 0,void 0);for(var n=t.length-1;0<=n&&!Vp(t[n],e);n--);};function Hp(e,t){return t.push(e),!1}Fp.prototype.blur=function(){var e=g(this._fragmentFiber);e!==null&&(e=b(e),e=lp(e).activeElement,e!==null&&h(this._fragmentFiber.child,!1,Up,e,void 0,void 0))};function Up(e,t){return e.tag!==6&&(e=b(e),e===t||e.contains(t)?(t.blur(),!0):!1)}Fp.prototype.observeUsing=function(e){this._observers===null&&(this._observers=new Set),this._observers.add(e),h(this._fragmentFiber.child,!1,Wp,e,void 0,void 0)};function Wp(e,t){return e.tag===6||(e=b(e),t.observe(e)),!1}Fp.prototype.unobserveUsing=function(e){var t=this._observers;if(t!==null&&t.has(e)){t.delete(e),h(this._fragmentFiber.child,!1,Gp,e,void 0,void 0);for(var n=t=0;n<Kp.length;n++){var r=Kp[n];r.fragmentInstance===this&&r.observer===e?e.unobserve(r.instance):Kp[t++]=r}Kp.length=t}};function Gp(e,t){return e.tag===6||(e=b(e),t.unobserve(e)),!1}var Kp=[],qp=!1;function Jp(e,t,n){Kp.push({fragmentInstance:e,observer:t,instance:n}),qp||(qp=!0,mm(function(){qp=!1;var e=Kp;Kp=[];for(var t=0;t<e.length;t++){var n=e[t];n.observer.unobserve(n.instance)}}))}Fp.prototype.getClientRects=function(){var e=[];return h(this._fragmentFiber.child,!1,Yp,e,void 0,void 0),e};function Yp(e,t){if(e.tag===6){e=e.stateNode;var n=e.ownerDocument.createRange();n.selectNodeContents(e),t.push.apply(t,n.getClientRects())}else e=b(e),t.push.apply(t,e.getClientRects());return!1}Fp.prototype.getRootNode=function(e){var t=g(this._fragmentFiber);return t===null?this:b(t).getRootNode(e)},Fp.prototype.compareDocumentPosition=function(e){var t=g(this._fragmentFiber);if(t===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var n=[];h(this._fragmentFiber.child,!1,Hp,n,void 0,void 0);var r=b(t);if(n.length===0){if(n=r,_(this._fragmentFiber)){a:{for(t=this._fragmentFiber.return;t!==null;){if(t.tag===4){t=t.stateNode.containerInfo;break a}if(t.tag===3||t.tag===5||t.tag===27)break;t=t.return}t=null}t!=null&&(n=t)}t=this._fragmentFiber;var i=r=n.compareDocumentPosition(e);return n===e?i=Node.DOCUMENT_POSITION_CONTAINS:r&Node.DOCUMENT_POSITION_CONTAINED_BY&&(n=v(t)[1],n===null?i=Node.DOCUMENT_POSITION_PRECEDING:(e=b(n).compareDocumentPosition(e),i=e===0||e&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),i|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}t=b(n[0]),i=b(n[n.length-1]);var a=_(this._fragmentFiber)?t.parentElement:r;if(a==null)return Node.DOCUMENT_POSITION_DISCONNECTED;r=a.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY,a=a.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_CONTAINED_BY;var o=t.compareDocumentPosition(e),s=i.compareDocumentPosition(e),c=o&Node.DOCUMENT_POSITION_CONTAINED_BY||s&Node.DOCUMENT_POSITION_CONTAINED_BY;return s=r&&a&&o&Node.DOCUMENT_POSITION_FOLLOWING&&s&Node.DOCUMENT_POSITION_PRECEDING,t=r&&t===e||a&&i===e||c||s?Node.DOCUMENT_POSITION_CONTAINED_BY:!r&&t===e||!a&&i===e?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:o,t&Node.DOCUMENT_POSITION_DISCONNECTED||t&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||Xp(t,this._fragmentFiber,n[0],n[n.length-1],e)?t:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function Xp(e,t,n,r,i){var a=Ft(i);if(e&Node.DOCUMENT_POSITION_CONTAINED_BY){if(n=!!a)a:{for(;a!==null;){if(a.tag===7&&(a===t||a.alternate===t)){n=!0;break a}a=a.return}n=!1}return n}if(e&Node.DOCUMENT_POSITION_CONTAINS){if(a===null)return a=i.ownerDocument,i===a||i===a.documentElement||i===a.body;a:{for(a=t,t=g(t);a!==null;){if(!(a.tag!==5&&a.tag!==3&&a.tag!==27||a!==t&&a.alternate!==t)){a=!0;break a}a=a.return}a=!1}return a}return e&Node.DOCUMENT_POSITION_PRECEDING?((t=!!a)&&!(t=a===n)&&(t=te(n,a,w),t===null?t=!1:(h(t,!0,C,a,n),a=x,x=null,t=a!==null)),t):e&Node.DOCUMENT_POSITION_FOLLOWING?((t=!!a)&&!(t=a===r)&&(t=te(r,a,w),t===null?t=!1:(h(t,!0,ee,a,r),a=x,S=x=null,t=a!==null)),t):!1}function Zp(e,t){var n=e.ownerDocument.createRange();n.selectNodeContents(e),e=n.getBoundingClientRect(),window.scrollTo(window.scrollX+e.left,t?window.scrollY+e.top:window.scrollY+e.bottom-window.innerHeight)}Fp.prototype.scrollIntoView=function(e){if(typeof e==`object`)throw Error(i(566));var t=[];h(this._fragmentFiber.child,!1,Hp,t,void 0,void 0);var n=!1!==e;if(t.length===0){var r=v(this._fragmentFiber);if(r=n?r[1]||r[0]||g(this._fragmentFiber):r[0]||r[1],r===null)return;if(r.tag===6){e=b(r),Zp(e,n);return}if(r=b(r),r.nodeType!==9){if(r.nodeType===11){n=`host`in r?r.host:null,n!==null&&n.scrollIntoView(e);return}r.scrollIntoView(e)}}for(r=n?t.length-1:0;r!==(n?-1:t.length);){var a=t[r];a.tag===6?(a=b(a),Zp(a,n)):b(a).scrollIntoView(e),r+=n?-1:1}};function Qp(e,t){return e=b(e),$p(e,t),!1}function $p(e,t){e.reactFragments??=new Set,e.reactFragments.add(t)}function em(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.addEventListener(i.type,i.attachedListener,Rp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){for(var r=0,i=0;i<Kp.length;i++){var a=Kp[i];(a.fragmentInstance!==t||a.observer!==n||a.instance!==e)&&(Kp[r++]=a)}Kp.length=r,n.observe(e)}),$p(e,t))}function tm(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.removeEventListener(i.type,i.attachedListener,Rp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){typeof n.rootMargin==`string`?Jp(t,n,e):n.unobserve(e)}),e.reactFragments!=null&&e.reactFragments.delete(t))}function nm(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:nm(n),Pt(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function rm(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r){if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e}else if(!e[Mt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=lm(e.nextSibling),e===null)break}return null}function im(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=lm(e.nextSibling),e===null))return null;return e}function am(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=lm(e.nextSibling),e===null))return null;return e}function om(e){return e.data===`$?`||e.data===`$~`}function sm(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function cm(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function lm(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var um=null;function dm(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return lm(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function fm(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function pm(e,t){function n(){r=!0}if(e.ownerDocument.activeElement===e)return!0;var r=!1;try{e.ownerDocument.addEventListener(`focus`,n,!0),(e.focus||HTMLElement.prototype.focus).call(e,t)}finally{e.ownerDocument.removeEventListener(`focus`,n,!0)}return r}function mm(e){yp(function(){yp(function(t){return e(t)})})}function hm(e,t,n){switch(t=lp(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function gm(e,t,n){for(var r in n){var i=n[r];n.hasOwnProperty(r)&&i!=null&&$(e,t,r,null,rp,i)}n.dangerouslySetInnerHTML!=null&&(e.textContent=``),e.onclick===yn&&(e.onclick=null),Pt(e)}function _m(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Pt(e)}var vm=new Map,ym=new Set;function bm(e){if(typeof e.getRootNode==`function`){var t=e.getRootNode();if(t.nodeType===9||t.nodeType===11)return t}return e.nodeType===9?e:e.ownerDocument}var xm=k.d;k.d={f:Sm,r:Cm,D:Em,C:Dm,L:Om,m:km,X:jm,S:Am,M:Mm};function Sm(){var e=xm.f(),t=zd();return e||t}function Cm(e){var t=It(e);t!==null&&t.tag===5&&t.type===`form`?$s(t):xm.r(e)}var wm=typeof document>`u`?null:document;function Tm(e,t,n){var r=wm;if(r&&typeof t==`string`&&t){var i=an(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),ym.has(i)||(ym.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),np(t,`link`,e),zt(t),r.head.appendChild(t)))}}function Em(e){xm.D(e),Tm(`dns-prefetch`,e,null)}function Dm(e,t){xm.C(e,t),Tm(`preconnect`,e,t)}function Om(e,t,n){xm.L(e,t,n);var r=wm;if(r&&e&&t){var i=`link[rel="preload"][as="`+an(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+an(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+an(n.imageSizes)+`"]`)):i+=`[href="`+an(e)+`"]`;var a=i;switch(t){case`style`:a=Pm(e);break;case`script`:a=Rm(e)}if(!(vm.has(a)||(e=T({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),vm.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(Fm(a))||t===`script`&&r.querySelector(zm(a))))){var o=r.createElement(`link`);np(o,`link`,e),t===`style`&&(o[Nt]=!0,o.onload=o.onerror=function(){Bt(o)}),zt(o),r.head.appendChild(o)}}}function km(e,t){xm.m(e,t);var n=wm;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+an(r)+`"][href="`+an(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Rm(e)}if(!vm.has(a)&&(e=T({rel:`modulepreload`,href:e},t),vm.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(zm(a)))return}r=n.createElement(`link`),np(r,`link`,e),zt(r),n.head.appendChild(r)}}}function Am(e,t,n){xm.S(e,t,n);var r=wm;if(r&&e){var i=Rt(r).hoistableStyles,a=Pm(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(Fm(a)))s.loading=5;else{e=T({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=vm.get(a))&&Hm(e,n);var c=o=r.createElement(`link`);zt(c),np(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Vm(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function jm(e,t){xm.X(e,t);var n=wm;if(n&&e){var r=Rt(n).hoistableScripts,i=Rm(e),a=r.get(i);a||(a=n.querySelector(zm(i)),a||(e=T({src:e,async:!0},t),(t=vm.get(i))&&Um(e,t),a=n.createElement(`script`),zt(a),np(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Mm(e,t){xm.M(e,t);var n=wm;if(n&&e){var r=Rt(n).hoistableScripts,i=Rm(e),a=r.get(i);a||(a=n.querySelector(zm(i)),a||(e=T({src:e,async:!0,type:`module`},t),(t=vm.get(i))&&Um(e,t),a=n.createElement(`script`),zt(a),np(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Nm(e,t,n,r){var a=(a=ke.current)?bm(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(n=Pm(n.href),t=Rt(a).hoistableStyles,r=t.get(n),r||(r={type:`style`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Pm(n.href);var o=Rt(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(Fm(e)))?o._p||(s.instance=o,s.state.loading=5):(o=vm.get(e),o||(o={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},vm.set(e,o)),Lm(a,e,o,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(n=Rm(n),t=Rt(a).hoistableScripts,r=t.get(n),r||(r={type:`script`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Pm(e){return`href="`+an(e)+`"`}function Fm(e){return`link[rel="stylesheet"][`+e+`]`}function Im(e){return T({},e,{"data-precedence":e.precedence,precedence:null})}function Lm(e,t,n,r){if(t=e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)){if(!0!==t[Nt]){r.loading=1;return}}else t=e.createElement(`link`),t[Nt]=!0,t.onload=t.onerror=Bt.bind(null,t),np(t,`link`,n),zt(t),e.head.appendChild(t);r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2})}function Rm(e){return`[src="`+an(e)+`"]`}function zm(e){return`script[async]`+e}function Bm(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+an(n.href)+`"]`);if(r)return t.instance=r,zt(r),r;var a=T({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),zt(r),np(r,`style`,a),Vm(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Pm(n.href);var o=e.querySelector(Fm(a));if(o)return t.state.loading|=4,t.instance=o,zt(o),o;r=Im(n),(a=vm.get(a))&&Hm(r,a),o=(e.ownerDocument||e).createElement(`link`),zt(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),np(o,`link`,r),t.state.loading|=4,Vm(o,n.precedence,e),t.instance=o;case`script`:return o=Rm(n.src),(a=e.querySelector(zm(o)))?(t.instance=a,zt(a),a):(r=n,(a=vm.get(o))&&(r=T({},n),Um(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),zt(a),np(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Vm(r,n.precedence,e));return t.instance}function Vm(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Hm(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function Um(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Wm=null;function Gm(e,t,n){if(Wm===null){var r=new Map,i=Wm=new Map;i.set(n,r)}else i=Wm,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[Mt]||a[Tt]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Km(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function qm(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Jm(e,t){return e===`img`&&t.src!=null&&t.src!==``&&t.onLoad==null&&t.loading!==`lazy`}function Ym(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Xm(e){return(e.width||100)*(e.height||100)*(typeof devicePixelRatio==`number`?devicePixelRatio:1)*.25}function Zm(e,t){typeof t.decode==`function`&&(e.imgCount++,t.complete||(e.imgBytes+=Xm(t),e.suspenseyImages.push(t)),e=rh.bind(e),t.decode().then(e,e))}function Qm(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Pm(r.href),a=t.querySelector(Fm(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=nh.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,zt(a);return}a=t.ownerDocument||t,r=Im(r),(i=vm.get(i))&&Hm(r,i),a=a.createElement(`link`),zt(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),np(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=nh.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var $m=0;function eh(e,t){return e.stylesheets&&e.count===0&&ah(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&ah(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&$m===0&&($m=62500*op());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&ah(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>$m?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function th(e){if(e.count===0&&(e.imgCount===0||!e.waitingForImages)){if(e.stylesheets)ah(e,e.stylesheets);else if(e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}}}function nh(){this.count--,th(this)}function rh(){this.imgCount--,th(this)}var ih=null;function ah(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,ih=new Map,t.forEach(oh,e),ih=null,nh.call(e))}function oh(e,t){if(!(t.state.loading&4)){var n=ih.get(e);if(n)var r=n.get(null);else{n=new Map,ih.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=nh.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var sh={$$typeof:ce,Provider:null,Consumer:null,_currentValue:Ce,_currentValue2:Ce,_threadCount:0};function ch(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=gt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=gt(0),this.hiddenUpdates=gt(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.transitionTypes=null,this.incompleteTransitions=new Map}function lh(e,t,n,r,i,a,o,s,c,l,u,d){return e=new ch(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=ji(3,null,null,t),e.current=a,a.stateNode=e,t=Oa(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},uo(a),e}function uh(e){return e?(e=ki,e):ki}function dh(e,t,n,r,i,a){i=uh(i),r.context===null?r.context=i:r.pendingContext=i,r=po(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=mo(e,r,t),n!==null&&(Pd(n,e,t),ho(n,e,t))}function fh(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ph(e,t){fh(e,t),(e=e.alternate)&&fh(e,t)}function mh(e){if(e.tag===13||e.tag===31){var t=Ei(e,67108864);t!==null&&Pd(t,e,67108864),ph(e,67108864)}}function hh(e){if(e.tag===13||e.tag===31){var t=jd();t=P(t);var n=Ei(e,t);n!==null&&Pd(n,e,t),ph(e,t)}}var gh=!0;function _h(e,t,n,r){var i=O.T;O.T=null;var a=k.p;try{k.p=2,yh(e,t,n,r)}finally{k.p=a,O.T=i}}function vh(e,t,n,r){var i=O.T;O.T=null;var a=k.p;try{k.p=8,yh(e,t,n,r)}finally{k.p=a,O.T=i}}function yh(e,t,n,r){if(gh){var i=bh(r);if(i===null)Kf(e,t,r,xh,n),Mh(e,r);else if(Ph(i,e,t,n,r))r.stopPropagation();else if(Mh(e,r),t&4&&-1<jh.indexOf(e)){for(;i!==null;){var a=It(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=ut(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-N(o);s.entanglements[1]|=c,o&=~c}Ef(a),!(J&6)&&(gd=M()+500,Df(0,!1))}}break;case 31:case 13:s=Ei(a,2),s!==null&&Pd(s,a,2),zd(),ph(a,2)}if(a=bh(r),a===null&&Kf(e,t,r,xh,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Kf(e,t,r,null,n)}}function bh(e){return e=xn(e),Sh(e)}var xh=null;function Sh(e){if(xh=null,e=Ft(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return xh=e,null}function Ch(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`fullscreenerror`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`resize`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(qe()){case Je:return 2;case Ye:return 8;case Xe:case Ze:return 32;case Qe:return 268435456;default:return 32}default:return 32}}var wh=!1,Th=null,Eh=null,Dh=null,Oh=new Map,kh=new Map,Ah=[],jh=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Mh(e,t){switch(e){case`focusin`:case`focusout`:Th=null;break;case`dragenter`:case`dragleave`:Eh=null;break;case`mouseover`:case`mouseout`:Dh=null;break;case`pointerover`:case`pointerout`:Oh.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:kh.delete(t.pointerId)}}function Nh(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=It(t),t!==null&&mh(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Ph(e,t,n,r,i){switch(t){case`focusin`:return Th=Nh(Th,e,t,n,r,i),!0;case`dragenter`:return Eh=Nh(Eh,e,t,n,r,i),!0;case`mouseover`:return Dh=Nh(Dh,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return Oh.set(a,Nh(Oh.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,kh.set(a,Nh(kh.get(a)||null,e,t,n,r,i)),!0}return!1}function Fh(e){var t=Ft(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,Ct(e.priority,function(){hh(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,Ct(e.priority,function(){hh(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ih(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=bh(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);bn=r,n.target.dispatchEvent(r),bn=null}else return t=It(n),t!==null&&mh(t),e.blockedOn=n,!1;t.shift()}return!0}function Lh(e,t,n){Ih(e)&&n.delete(t)}function Rh(){wh=!1,Th!==null&&Ih(Th)&&(Th=null),Eh!==null&&Ih(Eh)&&(Eh=null),Dh!==null&&Ih(Dh)&&(Dh=null),Oh.forEach(Lh),kh.forEach(Lh)}function zh(e,n){e.blockedOn===n&&(e.blockedOn=null,wh||(wh=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,Rh)))}var Bh=null;function Vh(e){Bh!==e&&(Bh=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){Bh===e&&(Bh=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(Sh(r||n)===null)continue;break}var a=It(n);a!==null&&(e.splice(t,3),t-=3,Zs(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Hh(e){function t(t){return zh(t,e)}Th!==null&&zh(Th,e),Eh!==null&&zh(Eh,e),Dh!==null&&zh(Dh,e),Oh.forEach(t),kh.forEach(t);for(var n=0;n<Ah.length;n++){var r=Ah[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<Ah.length&&(n=Ah[0],n.blockedOn===null);)Fh(n),n.blockedOn===null&&Ah.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[Et]||null;if(typeof a==`function`)o||Vh(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[Et]||null)s=o.formAction;else if(Sh(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Vh(n)}}}function Uh(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Wh(e){this._internalRoot=e}Gh.prototype.render=Wh.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;dh(n,jd(),e,t,null,null)},Gh.prototype.unmount=Wh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;dh(e.current,2,null,e,null,null),zd(),t[Dt]=null}};function Gh(e){this._internalRoot=e}Gh.prototype.unstable_scheduleHydration=function(e){if(e){var t=F();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Ah.length&&t!==0&&t<Ah[n].priority;n++);Ah.splice(n,0,e),n===0&&Fh(e)}};var Kh=n.version;if(Kh!==`19.3.1`)throw Error(i(527,Kh,`19.3.1`));k.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=d(t),e=e===null?null:p(e),e=e===null?null:e.stateNode,e};var qh={bundleType:0,version:`19.3.1`,rendererPackageName:`react-dom`,currentDispatcherRef:O,reconcilerVersion:`19.3.1`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var Jh=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Jh.isDisabled&&Jh.supportsFiber)try{tt=Jh.inject(qh),nt=Jh}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=bc,s=xc,c=Sc;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=lh(e,1,!1,null,null,n,r,null,o,s,c,Uh),e[Dt]=t.current,Wf(e),new Wh(t)}})),g=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=h()})),_=c(u(),1),v=g();function y(){return typeof window<`u`&&typeof window.external?.sendMessage==`function`}function b(e){return e instanceof Error?{name:e.name,message:e.message,stack:e.stack}:e}function x(e,t,n,r=`frontend`){if(y())window.external.sendMessage(JSON.stringify({type:`log.write`,payload:{level:e,message:t,source:r,context:n===void 0?void 0:b(n)}}));else{let r=e===`warn`?`warn`:e===`error`?`error`:`log`;n===void 0?console[r](t):console[r](t,n)}}function S(e){return{debug:(t,n)=>x(`debug`,t,n,e),info:(t,n)=>x(`info`,t,n,e),warn:(t,n)=>x(`warn`,t,n,e),error:(t,n)=>x(`error`,t,n,e)}}var C={...S(`frontend`),child:S},ee=15e3,w=new Set,te=new Map,T=!1,ne=0,re;function ie(){return typeof window<`u`&&typeof window.external?.sendMessage==`function`}function ae(){T||(T=!0,typeof window<`u`&&typeof window.external?.receiveMessage==`function`&&window.external.receiveMessage(e=>oe(e)))}function oe(e){let t;try{t=JSON.parse(e)}catch(t){x(`warn`,`Received a non-JSON message`,{rawMessage:e,error:t},`native`);return}let n=typeof t.id==`string`?t.id:void 0,r=n?te.get(n):void 0;n&&r&&(te.delete(n),clearTimeout(r.timeoutId),t.ok===!1?r.reject(Error(typeof t.error==`string`?t.error:`Native request failed.`)):r.resolve(t.data)),w.forEach(e=>{try{e(t)}catch(e){x(`error`,`Message handler threw`,{error:e},`native`)}})}function se(){if(re!==void 0)return;let e=()=>{if(!ie())return;let e=document.getElementById(`root`),t=e!==null&&e.childElementCount===0;window.external.sendMessage(JSON.stringify({type:`webview.heartbeat`,payload:{blank:t}}))};e(),re=setInterval(e,5e3)}var E={get available(){return ie()},send(e){ie()?(ae(),window.external.sendMessage(JSON.stringify(e)),e.type===`app.ready`&&se()):x(`debug`,`Bridge unavailable, dropping message`,{type:e.type},`native`)},request(e,t,n=ee){if(!ie())return Promise.reject(Error(`Native bridge is not available.`));ae();let r=`req-${++ne}-${Date.now()}`;return new Promise((i,a)=>{let o=setTimeout(()=>{te.delete(r),a(Error(`Native request '${e}' timed out after ${n}ms.`))},n);te.set(r,{resolve:i,reject:a,timeoutId:o}),window.external.sendMessage(JSON.stringify({type:e,id:r,payload:t}))})},on(e){return ae(),w.add(e),()=>w.delete(e)}},ce=1112886864,le=1,ue=32,de=new TextDecoder,fe=class{baseTask=null;options;constructor(e){this.options=e}base(){return E.available?(this.baseTask??=E.request(this.options.baseMessage).then(e=>{let t=e?.[this.options.baseField??`base`];return typeof t==`string`?t:``},()=>(this.baseTask=null,``)),this.baseTask):Promise.resolve(``)}reset(){this.baseTask=null}async readBlock(e,t){let n=await this.base();if(!n)throw Error(`The data server is not running.`);let r=await fetch(this.join(n,e),this.request(t));if(!r.ok)throw Error(`The data request failed (${r.status}).`);let i=await pe(await r.arrayBuffer()),a=Number(r.headers.get(`x-data-total`)??``);return Number.isFinite(a)&&a>=i.count&&(i.total=a),i}async bytes(e,t){let n=await this.response(e,t);return new Uint8Array(await n.arrayBuffer())}async url(e){let t=await this.base();if(!t)throw Error(`The data server is not running.`);return this.join(t,e)}image(e){return this.url(e)}async response(e,t){let n=await this.base();if(!n)throw Error(`The data server is not running.`);let r=await fetch(this.join(n,e),this.request(t));if(!r.ok)throw Error(`The data request failed (${r.status}).`);return r}request(e){return{cache:this.options.cache??`no-cache`,headers:this.options.headers,...e}}join(e,t){return`${e.replace(/\/+$/,``)}/${t.replace(/^\/+/,``)}`}};async function pe(e){let t=me(e),n=Array(t.count),r=0;for(let[e,i]of he(t))n[e]=i,t.count<2048||++r<2048||(r=0,await new Promise(e=>setTimeout(e,0)));return ge(t,n)}function me(e){let t=new DataView(e);if(e.byteLength<ue||t.getUint32(0,!0)!==ce)throw Error(`Not a data block.`);if(t.getUint16(4,!0)!==le)throw Error(`This build cannot read that data block.`);let n=t.getUint16(6,!0),r=t.getUint32(8,!0),i=t.getUint32(12,!0),a=t.getUint32(16,!0),o=t.getUint32(20,!0),s=t.getUint32(24,!0),c=ue,l=()=>{let n=t.getUint16(c,!0);c+=2;let r=de.decode(new Uint8Array(e,c,n));return c+=n,r},u=[];for(let e=0;e<i+a;e++)u.push(l());let d={};for(let e=0;e<o;e++){let e=l();d[e]=l()}return{view:t,kind:n,count:r,textColumns:i,numberColumns:a,names:u,meta:d,pool:new Uint8Array(e,e.byteLength-s,s),at:c}}function*he(e){let{view:t,names:n,textColumns:r,numberColumns:i,pool:a}=e,o=e.at,s=(e,t)=>de.decode(a.subarray(e,e+t));for(let a=0;a<e.count;a++){let e={};for(let i=0;i<r;i++)e[n[i]]=s(t.getUint32(o,!0),t.getUint16(o+4,!0)),o+=6;for(let a=0;a<i;a++)e[n[r+a]]=t.getFloat64(o,!0),o+=8;yield[a,e]}}function ge(e,t){return{kind:e.kind,meta:e.meta,columns:{text:e.names.slice(0,e.textColumns),number:e.names.slice(e.textColumns)},rows:t,count:e.count,total:e.count}}var _e=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),ve=o(((e,t)=>{t.exports=_e()})),D=ve();function ye(e){let t=new Map;for(let[n,r]of Object.entries(e)){let e=n.toLowerCase();t.has(e)||t.set(e,r)}return(e,n)=>{let r=t.get(e.toLowerCase())??e;return n?r.replace(/\{(\w+)}/g,(e,t)=>t in n?String(n[t]):e):r}}async function be(e){return E.available?await E.request(`i18n.get`,e?{locale:e}:void 0):{locale:`en`,strings:{},available:[`en`]}}var xe=(0,_.createContext)(ye({})),Se=(0,_.createContext)(`en`);function O(){return(0,_.useContext)(xe)}function k(){return(0,_.useContext)(Se)}var Ce=({children:e})=>{let[t,n]=(0,_.useState)(()=>ye({})),[r,i]=(0,_.useState)(`en`);return(0,_.useEffect)(()=>{let e=!1,t=async()=>{try{let t=await be();if(e)return;n(()=>ye(t.strings)),i(t.locale)}catch{}};t();let r=E.on(e=>{e.type===`settings.changed`&&t()});return()=>{e=!0,r()}},[]),(0,_.useEffect)(()=>{document.documentElement.lang=r},[r]),(0,D.jsx)(xe.Provider,{value:t,children:(0,D.jsx)(Se.Provider,{value:r,children:e})})},A=e=>E.send({type:e});function we(){let[e,t]=(0,_.useState)(!1);return(0,_.useEffect)(()=>{if(E.available)return E.on(e=>{if(e.type!==`window.state`)return;let n=e.data;typeof n?.maximized==`boolean`&&t(n.maximized)})},[]),{maximized:e,minimize:()=>A(`window.minimize`),toggleMaximize:()=>A(`window.toggleMaximize`),close:()=>A(`window.close`)}}function Te(){return{onMouseDown:()=>A(`window.drag`),onDoubleClick:()=>A(`window.toggleMaximize`)}}function Ee(){let[e,t]=(0,_.useState)(!1),{maximized:n}=we();return(0,_.useEffect)(()=>{if(!E.available)return;let e=!1;return E.request(`app.info`).then(n=>{e||t(n.rounded===!0)}).catch(()=>void 0),()=>{e=!0}},[]),(0,_.useEffect)(()=>{document.documentElement.classList.toggle(`window-rounded`,e)},[e]),e&&!n}var j=[[`top`,{top:0,left:8,right:8,height:5,cursor:`ns-resize`}],[`bottom`,{bottom:0,left:8,right:8,height:5,cursor:`ns-resize`}],[`left`,{top:8,bottom:8,left:0,width:5,cursor:`ew-resize`}],[`right`,{top:8,bottom:8,right:0,width:5,cursor:`ew-resize`}],[`topleft`,{top:0,left:0,width:10,height:10,cursor:`nwse-resize`}],[`topright`,{top:0,right:0,width:10,height:10,cursor:`nesw-resize`}],[`bottomleft`,{bottom:0,left:0,width:10,height:10,cursor:`nesw-resize`}],[`bottomright`,{bottom:0,right:0,width:10,height:10,cursor:`nwse-resize`}]];function De(){return(0,D.jsx)(D.Fragment,{children:j.map(([e,t])=>(0,D.jsx)(`div`,{onMouseDown:t=>{t.preventDefault(),E.send({type:`window.resize`,payload:{direction:e}})},style:{position:`fixed`,zIndex:1e3,...t}},e))})}async function Oe(){return await E.request(`settings.get`)}async function ke(e){return await E.request(`settings.save`,e)}async function Ae(){return await E.request(`settings.reset`)}var je=`(prefers-color-scheme: dark)`;function Me(e,t){return e===`system`?t?`dark`:`light`:e}function Ne(){return typeof window<`u`&&window.matchMedia(je).matches}function Pe(e){let[t,n]=(0,_.useState)(Ne);(0,_.useEffect)(()=>{let e=window.matchMedia(je),t=()=>n(e.matches);return t(),e.addEventListener(`change`,t),()=>e.removeEventListener(`change`,t)},[]);let r=Me(e,t);return(0,_.useEffect)(()=>{document.documentElement.dataset.theme=r},[r]),r}function Fe(e,t){this.v=e,this.k=t}function Ie(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function Le(e){if(Array.isArray(e))return e}function Re(e,t){var n=e==null?null:typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(n!=null){var r,i,a,o,s=[],c=!0,l=!1;try{if(a=(n=n.call(e)).next,t===0){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=a.call(n)).done)&&(s.push(r.value),s.length!==t);c=!0);}catch(e){l=!0,i=e}finally{try{if(!c&&n.return!=null&&(o=n.return(),Object(o)!==o))return}finally{if(l)throw i}}return s}}function ze(){throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function Be(e,t){return Le(e)||Re(e,t)||Ve(e,t)||ze()}function Ve(e,t){if(e){if(typeof e==`string`)return Ie(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?Ie(e,t):void 0}}function He(e){var t,n;function r(t,n){try{var a=e[t](n),o=a.value,s=o instanceof Fe;Promise.resolve(s?o.v:o).then(function(n){if(s){var c=t===`return`&&o.k?t:`next`;if(!o.k||n.done)return r(c,n);n=e[c](n).value}i(!!a.done,n)},function(e){r(`throw`,e)})}catch(e){i(2,e)}}function i(e,i){e===2?t.reject(i):t.resolve({value:i,done:e}),(t=t.next)?r(t.key,t.arg):n=null}this._invoke=function(e,i){return new Promise(function(a,o){var s={key:e,arg:i,resolve:a,reject:o,next:null};n?n=n.next=s:(t=n=s,r(e,i))})},typeof e.return!=`function`&&(this.return=void 0)}He.prototype[typeof Symbol==`function`&&Symbol.asyncIterator||`@@asyncIterator`]=function(){return this},He.prototype.next=function(e){return this._invoke(`next`,e)},He.prototype.throw=function(e){return this._invoke(`throw`,e)},He.prototype.return=function(e){return this._invoke(`return`,e)};var Ue=Object.entries,We=Object.setPrototypeOf,Ge=Object.isFrozen,Ke=Object.getPrototypeOf,M=Object.getOwnPropertyDescriptor,qe=Object.freeze,Je=Object.seal,Ye=Object.create,Xe=typeof Reflect<`u`&&Reflect,Ze=Xe.apply,Qe=Xe.construct;qe||=function(e){return e},Je||=function(e){return e},Ze||=function(e,t){var n=[...arguments].slice(2);return e.apply(t,n)},Qe||=function(e){return new e(...[...arguments].slice(1))};var $e=P(Array.prototype.forEach);Array.prototype.indexOf;var et=P(Array.prototype.lastIndexOf),tt=P(Array.prototype.pop),nt=P(Array.prototype.push),rt=P(Array.prototype.slice),N=P(Array.prototype.splice),it=Array.isArray,at=St(Set),ot=P(Set.prototype.add),st=P(Set.prototype.has),ct=P(String.prototype.toLowerCase),lt=P(String.prototype.toString),ut=P(String.prototype.match),dt=P(String.prototype.replace),ft=P(String.prototype.indexOf),pt=P(String.prototype.trim),mt=P(Number.prototype.toString),ht=P(Boolean.prototype.toString),gt=typeof BigInt>`u`?null:P(BigInt.prototype.toString),_t=typeof Symbol>`u`?null:P(Symbol.prototype.toString),vt=P(Object.prototype.hasOwnProperty),yt=P(Object.prototype.toString),bt=P(RegExp.prototype.test),xt=St(TypeError);function P(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);var n=[...arguments].slice(1);return Ze(e,t,n)}}function St(e){return function(){return Qe(e,[...arguments])}}function F(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:ct;if(We&&We(e,null),!it(t))return e;let r=t.length;for(;r--;){let i=t[r];if(typeof i==`string`){let e=n(i);e!==i&&(Ge(t)||(t[r]=e),i=e)}e[i]=!0}return e}function Ct(e){for(let t=0;t<e.length;t++)vt(e,t)||(e[t]=null);return e}function wt(e){let t=Ye(null);for(let r of Ue(e)){var n=Be(r,2);let i=n[0],a=n[1];vt(e,i)&&(t[i]=it(a)?Ct(a):a&&typeof a==`object`&&a.constructor===Object?wt(a):a)}return t}function Tt(e){switch(typeof e){case`string`:return e;case`number`:return mt(e);case`boolean`:return ht(e);case`bigint`:return gt?gt(e):`0`;case`symbol`:return _t?_t(e):`Symbol()`;case`undefined`:return yt(e);case`function`:case`object`:{if(e===null)return yt(e);let t=e,n=Et(t,`toString`);if(typeof n==`function`){let e=n(t);return typeof e==`string`?e:yt(e)}return yt(e)}default:return yt(e)}}function Et(e,t){for(;e!==null;){let n=M(e,t);if(n){if(n.get)return P(n.get);if(typeof n.value==`function`)return P(n.value)}e=Ke(e)}function n(){return null}return n}function Dt(e,t){for(;e!==null;){let n=M(e,t);if(n)return n.get?P(n.get):null;e=Ke(e)}return null}function Ot(e){try{return bt(e,``),!0}catch{return!1}}var kt=qe(`a.abbr.acronym.address.area.article.aside.audio.b.bdi.bdo.big.blink.blockquote.body.br.button.canvas.caption.center.cite.code.col.colgroup.content.data.datalist.dd.decorator.del.details.dfn.dialog.dir.div.dl.dt.element.em.fieldset.figcaption.figure.font.footer.form.h1.h2.h3.h4.h5.h6.head.header.hgroup.hr.html.i.img.input.ins.kbd.label.legend.li.main.map.mark.marquee.menu.menuitem.meter.nav.nobr.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.shadow.slot.small.source.spacer.span.strike.strong.style.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.track.tt.u.ul.var.video.wbr`.split(`.`)),At=qe(`svg.a.altglyph.altglyphdef.altglyphitem.animatecolor.animatemotion.animatetransform.circle.clippath.defs.desc.ellipse.enterkeyhint.exportparts.filter.font.g.glyph.glyphref.hkern.image.inputmode.line.lineargradient.marker.mask.metadata.mpath.part.path.pattern.polygon.polyline.radialgradient.rect.stop.style.switch.symbol.text.textpath.title.tref.tspan.view.vkern`.split(`.`)),jt=qe([`feBlend`,`feColorMatrix`,`feComponentTransfer`,`feComposite`,`feConvolveMatrix`,`feDiffuseLighting`,`feDisplacementMap`,`feDistantLight`,`feDropShadow`,`feFlood`,`feFuncA`,`feFuncB`,`feFuncG`,`feFuncR`,`feGaussianBlur`,`feImage`,`feMerge`,`feMergeNode`,`feMorphology`,`feOffset`,`fePointLight`,`feSpecularLighting`,`feSpotLight`,`feTile`,`feTurbulence`]),Mt=qe([`animate`,`color-profile`,`cursor`,`discard`,`font-face`,`font-face-format`,`font-face-name`,`font-face-src`,`font-face-uri`,`foreignobject`,`hatch`,`hatchpath`,`mesh`,`meshgradient`,`meshpatch`,`meshrow`,`missing-glyph`,`script`,`set`,`solidcolor`,`unknown`,`use`]),Nt=qe(`math.menclose.merror.mfenced.mfrac.mglyph.mi.mlabeledtr.mmultiscripts.mn.mo.mover.mpadded.mphantom.mroot.mrow.ms.mspace.msqrt.mstyle.msub.msup.msubsup.mtable.mtd.mtext.mtr.munder.munderover.mprescripts`.split(`.`)),Pt=qe([`maction`,`maligngroup`,`malignmark`,`mlongdiv`,`mscarries`,`mscarry`,`msgroup`,`mstack`,`msline`,`msrow`,`semantics`,`annotation`,`annotation-xml`,`mprescripts`,`none`]),Ft=qe([`#text`]),It=qe(`accept.action.align.alt.autocapitalize.autocomplete.autopictureinpicture.autoplay.background.bgcolor.border.capture.cellpadding.cellspacing.checked.cite.class.clear.color.cols.colspan.command.commandfor.controls.controlslist.coords.crossorigin.datetime.decoding.default.dir.disabled.disablepictureinpicture.disableremoteplayback.download.draggable.enctype.enterkeyhint.exportparts.face.for.headers.height.hidden.high.href.hreflang.id.inert.inputmode.integrity.ismap.kind.label.lang.list.loading.loop.low.max.maxlength.media.method.min.minlength.multiple.muted.name.nonce.noshade.novalidate.nowrap.open.optimum.part.pattern.placeholder.playsinline.popover.popovertarget.popovertargetaction.poster.preload.pubdate.radiogroup.readonly.rel.required.rev.reversed.role.rows.rowspan.spellcheck.scope.selected.shape.size.sizes.slot.span.srclang.start.src.srcset.step.style.summary.tabindex.title.translate.type.usemap.valign.value.width.wrap.xmlns`.split(`.`)),Lt=qe(`accent-height.accumulate.additive.alignment-baseline.amplitude.ascent.attributename.attributetype.azimuth.basefrequency.baseline-shift.begin.bias.by.class.clip.clippathunits.clip-path.clip-rule.color.color-interpolation.color-interpolation-filters.color-profile.color-rendering.cx.cy.d.dx.dy.diffuseconstant.direction.display.divisor.dominant-baseline.dur.edgemode.elevation.end.exponent.fill.fill-opacity.fill-rule.filter.filterunits.flood-color.flood-opacity.font-family.font-size.font-size-adjust.font-stretch.font-style.font-variant.font-weight.fx.fy.g1.g2.glyph-name.glyphref.gradientunits.gradienttransform.height.href.id.image-rendering.in.in2.intercept.k.k1.k2.k3.k4.kerning.keypoints.keysplines.keytimes.lang.lengthadjust.letter-spacing.kernelmatrix.kernelunitlength.lighting-color.local.marker-end.marker-mid.marker-start.markerheight.markerunits.markerwidth.maskcontentunits.maskunits.max.mask.mask-type.media.method.mode.min.name.numoctaves.offset.operator.opacity.order.orient.orientation.origin.overflow.paint-order.path.pathlength.patterncontentunits.patterntransform.patternunits.pointer-events.points.preservealpha.preserveaspectratio.primitiveunits.r.rx.ry.radius.refx.refy.repeatcount.repeatdur.restart.result.rotate.scale.seed.shape-rendering.slope.specularconstant.specularexponent.spreadmethod.startoffset.stddeviation.stitchtiles.stop-color.stop-opacity.stroke-dasharray.stroke-dashoffset.stroke-linecap.stroke-linejoin.stroke-miterlimit.stroke-opacity.stroke.stroke-width.style.surfacescale.systemlanguage.tabindex.tablevalues.targetx.targety.transform.transform-origin.text-anchor.text-decoration.text-orientation.text-rendering.textlength.type.u1.u2.unicode.values.vector-effect.viewbox.visibility.version.vert-adv-y.vert-origin-x.vert-origin-y.width.word-spacing.wrap.writing-mode.xchannelselector.ychannelselector.x.x1.x2.xmlns.y.y1.y2.z.zoomandpan`.split(`.`)),Rt=qe(`accent.accentunder.align.bevelled.close.columnalign.columnlines.columnspacing.columnspan.denomalign.depth.dir.display.displaystyle.encoding.fence.frame.height.href.id.largeop.length.linethickness.lquote.lspace.mathbackground.mathcolor.mathsize.mathvariant.maxsize.minsize.movablelimits.notation.numalign.open.rowalign.rowlines.rowspacing.rowspan.rspace.rquote.scriptlevel.scriptminsize.scriptsizemultiplier.selection.separator.separators.stretchy.subscriptshift.supscriptshift.symmetric.voffset.width.xmlns`.split(`.`)),zt=qe([`xlink:href`,`xml:id`,`xlink:title`,`xml:space`,`xmlns:xlink`]),Bt=Je(/{{[\w\W]*|^[\w\W]*}}/g),Vt=Je(/<%[\w\W]*|^[\w\W]*%>/g),Ht=Je(/\${[\w\W]*/g),Ut=Je(/^data-[\-\w.\u00B7-\uFFFF]+$/),Wt=Je(/^aria-[\-\w]+$/),Gt=Je(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Kt=Je(/^(?:\w+script|data):/i),qt=Je(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),Jt=Je(/^html$/i),I=Je(/^[a-z][.\w]*(-[.\w]+)+$/i),Yt=Je(/<[/\w!]/g),Xt=Je(/<[/\w]/g),Zt=Je(/<\/no(script|embed|frames)/i),Qt=Je(/\/>/i),L={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},$t=qe(F({},[`style`,`script`,`xmp`,`iframe`,`noembed`,`noframes`,`plaintext`,`noscript`])),en=function(){return typeof window>`u`?null:window},tn=function(e,t){if(typeof e!=`object`||typeof e.createPolicy!=`function`)return null;let n=null,r=`data-tt-policy-suffix`;t&&t.hasAttribute(r)&&(n=t.getAttribute(r));let i=`dompurify`+(n?`#`+n:``);try{return e.createPolicy(i,{createHTML(e){return e},createScriptURL(e){return e}})}catch{return console.warn(`TrustedTypes policy `+i+` could not be created.`),null}},nn=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},rn=function(e,t,n,r){return vt(e,t)&&it(e[t])?F(r.base?wt(r.base):{},e[t],r.transform):n},an=function(e,t,n){let r=vt(e,t)?e[t]:void 0;return r&&typeof r==`object`?wt(r):n()};function on(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:en(),t=e=>on(e);if(t.version=`3.4.17`,t.removed=[],!e||!e.document||e.document.nodeType!==L.document||!e.Element)return t.isSupported=!1,t;let n=e.document,r=n,i=r.currentScript;e.DocumentFragment;let a=e.HTMLTemplateElement,o=e.Node,s=e.Element,c=e.NodeFilter;e.NamedNodeMap===void 0&&(e.NamedNodeMap||e.MozNamedAttrMap),e.HTMLFormElement;let l=e.DOMParser,u=e.trustedTypes,d=s.prototype,f=Et(d,`cloneNode`),p=Et(d,`remove`),m=Et(d,`removeAttributeNode`),h=Et(d,`nextSibling`),g=Et(d,`childNodes`),_=Et(d,`parentNode`),v=Et(d,`shadowRoot`),y=Et(d,`attributes`),b=o&&o.prototype?Et(o.prototype,`nodeType`):null,x=o&&o.prototype?Et(o.prototype,`nodeName`):null,S=o&&o.prototype?Et(o.prototype,`ownerDocument`):null,C=function(e){return b?b(e):e.nodeType},ee=function(e){return x?x(e):e.nodeName},w=Dt(d,`namespaceURI`),te=function(e){return w?w(e):e.namespaceURI};if(typeof a==`function`){let e=n.createElement(`template`);e.content&&e.content.ownerDocument&&(n=e.content.ownerDocument)}let T,ne=``,re,ie=!1,ae=0,oe=function(){if(ae>0)throw xt(`A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.`)},se=function(e){oe(),ae++;try{return T.createHTML(e)}finally{ae--}},E=function(e){oe(),ae++;try{return T.createScriptURL(e)}finally{ae--}},ce=function(){return ie||=(re=tn(u,i),!0),re},le=n,ue=le.implementation,de=le.createNodeIterator,fe=le.createDocumentFragment,pe=le.getElementsByTagName,me=r.importNode,he=nn();t.isSupported=typeof Ue==`function`&&typeof _==`function`&&ue&&ue.createHTMLDocument!==void 0;let ge=Bt,_e=Vt,ve=Ht,D=Ut,ye=Wt,be=Kt,xe=qt,Se=I,O=Gt,k=null,Ce=F({},[...kt,...At,...jt,...Nt,...Ft]),A=null,we=F({},[...It,...Lt,...Rt,...zt]),Te=Object.seal(Ye(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),Ee=null,j=null,De=Object.seal(Ye(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Oe=!0,ke=!0,Ae=!1,je=!0,Me=!1,Ne=!0,Pe=!1,Fe=!1,Ie=null,Le=null,Re=!1,ze=!1,Be=!1,Ve=!1,He=!0,We=!1,Ge=`user-content-`,Ke=!0,M=!1,Xe=null,Ze={},Qe=null,mt=F({},`annotation-xml.audio.colgroup.desc.foreignobject.head.iframe.math.mi.mn.mo.ms.mtext.noembed.noframes.noscript.plaintext.script.selectedcontent.style.svg.template.thead.title.video.xmp`.split(`.`)),ht=null,gt=F({},[`audio`,`video`,`img`,`source`,`image`,`track`]),_t=null,yt=F({},[`alt`,`class`,`for`,`id`,`label`,`name`,`pattern`,`placeholder`,`role`,`summary`,`title`,`value`,`style`,`xmlns`]),P=`http://www.w3.org/1998/Math/MathML`,St=`http://www.w3.org/2000/svg`,Ct=`http://www.w3.org/1999/xhtml`,sn=Ct,cn=!1,ln=null,un=F({},[P,St,Ct],lt),dn=qe([`mi`,`mo`,`mn`,`ms`,`mtext`]),fn=F({},dn),R=qe([`annotation-xml`]),pn=F({},R),mn=F({},[`title`,`style`,`font`,`a`,`script`]),hn=null,gn=[`application/xhtml+xml`,`text/html`],_n=null,vn=null,yn=n.createElement(`form`),bn=function(e){return e instanceof RegExp||e instanceof Function},xn=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(vn&&vn===e)return;e&&typeof e==`object`||(e={}),e=wt(e),hn=gn.indexOf(e.PARSER_MEDIA_TYPE)===-1?`text/html`:e.PARSER_MEDIA_TYPE,_n=hn===`application/xhtml+xml`?lt:ct,k=rn(e,`ALLOWED_TAGS`,Ce,{transform:_n}),A=rn(e,`ALLOWED_ATTR`,we,{transform:_n}),ln=rn(e,`ALLOWED_NAMESPACES`,un,{transform:lt}),_t=rn(e,`ADD_URI_SAFE_ATTR`,yt,{transform:_n,base:yt}),ht=rn(e,`ADD_DATA_URI_TAGS`,gt,{transform:_n,base:gt}),Qe=rn(e,`FORBID_CONTENTS`,mt,{transform:_n}),Ee=rn(e,`FORBID_TAGS`,wt({}),{transform:_n}),j=rn(e,`FORBID_ATTR`,wt({}),{transform:_n}),Ze=vt(e,`USE_PROFILES`)?e.USE_PROFILES&&typeof e.USE_PROFILES==`object`?wt(e.USE_PROFILES):e.USE_PROFILES:!1,Oe=e.ALLOW_ARIA_ATTR!==!1,ke=e.ALLOW_DATA_ATTR!==!1,Ae=e.ALLOW_UNKNOWN_PROTOCOLS||!1,je=e.ALLOW_SELF_CLOSE_IN_ATTR!==!1,Me=e.SAFE_FOR_TEMPLATES||!1,Ne=e.SAFE_FOR_XML!==!1,Pe=e.WHOLE_DOCUMENT||!1,ze=e.RETURN_DOM||!1,Be=e.RETURN_DOM_FRAGMENT||!1,Ve=e.RETURN_TRUSTED_TYPE||!1,Re=e.FORCE_BODY||!1,He=e.SANITIZE_DOM!==!1,We=e.SANITIZE_NAMED_PROPS||!1,Ke=e.KEEP_CONTENT!==!1,M=e.IN_PLACE||!1,O=Ot(e.ALLOWED_URI_REGEXP)?e.ALLOWED_URI_REGEXP:Gt,sn=typeof e.NAMESPACE==`string`?e.NAMESPACE:Ct,fn=an(e,`MATHML_TEXT_INTEGRATION_POINTS`,()=>F({},dn)),pn=an(e,`HTML_INTEGRATION_POINTS`,()=>F({},R));let t=an(e,`CUSTOM_ELEMENT_HANDLING`,()=>Ye(null));if(Te=Ye(null),vt(t,`tagNameCheck`)&&bn(t.tagNameCheck)&&(Te.tagNameCheck=t.tagNameCheck),vt(t,`attributeNameCheck`)&&bn(t.attributeNameCheck)&&(Te.attributeNameCheck=t.attributeNameCheck),vt(t,`allowCustomizedBuiltInElements`)&&typeof t.allowCustomizedBuiltInElements==`boolean`&&(Te.allowCustomizedBuiltInElements=t.allowCustomizedBuiltInElements),Je(Te),Me&&(ke=!1),Be&&(ze=!0),Ze&&(k=F({},Ft),A=Ye(null),Ze.html===!0&&(F(k,kt),F(A,It)),Ze.svg===!0&&(F(k,At),F(A,Lt),F(A,zt)),Ze.svgFilters===!0&&(F(k,jt),F(A,Lt),F(A,zt)),Ze.mathMl===!0&&(F(k,Nt),F(A,Rt),F(A,zt))),De.tagCheck=null,De.attributeCheck=null,vt(e,`ADD_TAGS`)&&(typeof e.ADD_TAGS==`function`?De.tagCheck=e.ADD_TAGS:it(e.ADD_TAGS)&&(k===Ce&&(k=wt(k)),F(k,e.ADD_TAGS,_n))),vt(e,`ADD_ATTR`)&&(typeof e.ADD_ATTR==`function`?De.attributeCheck=e.ADD_ATTR:it(e.ADD_ATTR)&&(A===we&&(A=wt(A)),F(A,e.ADD_ATTR,_n))),vt(e,`ADD_FORBID_CONTENTS`)&&it(e.ADD_FORBID_CONTENTS)&&(Qe===mt&&(Qe=wt(Qe)),F(Qe,e.ADD_FORBID_CONTENTS,_n)),Ke&&(k[`#text`]=!0),Pe&&F(k,[`html`,`head`,`body`]),k.table&&(F(k,[`tbody`]),delete Ee.tbody),e.TRUSTED_TYPES_POLICY){if(typeof e.TRUSTED_TYPES_POLICY.createHTML!=`function`)throw xt(`TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.`);if(typeof e.TRUSTED_TYPES_POLICY.createScriptURL!=`function`)throw xt(`TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.`);let t=T;T=e.TRUSTED_TYPES_POLICY;try{ne=se(``)}catch(e){throw T=t,e}}else e.TRUSTED_TYPES_POLICY===null?(T=void 0,ne=``):(T===void 0&&(T=ce()),T&&typeof ne==`string`&&(ne=se(``)));qe&&qe(e),vn=e},Sn=F({},[...At,...jt,...Mt]),Cn=F({},[...Nt,...Pt]),wn=function(e,t,n){return t.namespaceURI===Ct?e===`svg`:t.namespaceURI===P?e===`svg`&&(n===`annotation-xml`||fn[n]):!!Sn[e]},Tn=function(e,t,n){return t.namespaceURI===Ct?e===`math`:t.namespaceURI===St?e===`math`&&pn[n]:!!Cn[e]},En=function(e,t,n){return t.namespaceURI===St&&!pn[n]||t.namespaceURI===P&&!fn[n]?!1:!Cn[e]&&(mn[e]||!Sn[e])},Dn=function(e){let t=te(e),n=ct(ee(e)),r=_(e),i,a;return r&&C(r)===L.element?(i={namespaceURI:te(r)},a=ct(ee(r))):(i={namespaceURI:sn},a=`template`),ln[t]?t===St?wn(n,i,a):t===P?Tn(n,i,a):t===Ct?En(n,i,a):!!(hn===`application/xhtml+xml`&&ln[t]):!1},On=function(e){nt(t.removed,{element:e});try{_(e).removeChild(e)}catch{if(p(e),!_(e))throw xt(`a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place`)}},kn=function(e,t,n){try{m(e,t)}catch{try{e.removeAttribute(n)}catch{}}},An=function(e){Pn(e);let t=g(e);t&&$e(rt(t),e=>{try{p(e)}catch{}});let n=C(e)===L.element?y(e):null;if(n)for(let t=n.length-1;t>=0;--t){let r=n[t],i=r&&r.name;typeof i==`string`&&kn(e,r,i)}},jn=function(e,n,r){if(!r)try{r=n.getAttributeNode(e)}catch{r=null}nt(t.removed,{attribute:r||null,from:n});try{r?m(n,r):n.removeAttribute(e)}catch{try{n.removeAttribute(e)}catch{}}if(e===`is`){if(ze||Be)try{On(n)}catch{}else try{n.setAttribute(e,``)}catch{}}},Mn=function(e){let t=y(e);if(t)for(let n=t.length-1;n>=0;--n){let r=t[n],i=r&&r.name;typeof i!=`string`||A[_n(i)]||kn(e,r,i)}},Nn=function(e,t){let n=arguments.length>2&&arguments[2]!==void 0&&arguments[2],r=[e];for(;r.length>0;){let e=r.pop();if(t(e)===!1)continue;if(n&&C(e)===L.element){let t=v(e);Yn(t)&&r.push(t)}let i=g(e);if(i)for(let e=i.length-1;e>=0;--e)r.push(i[e])}},Pn=function(e){Nn(e,e=>{C(e)===L.element&&Mn(e)})},Fn=function(e){let t=[];return Nn(e,e=>{t.push(e)},!0),t},In=function(e,t){let n=at();$e(Fn(e),e=>{C(e)===L.element&&ot(n,e)}),$e(t,e=>{C(e)===L.element&&!st(n,e)&&Mn(e)})},Ln=function(e,n){let r=!1;return $e(t.removed,t=>{t.element&&(r||=t.element===e,Pn(t.element))}),In(e,n),r},Rn=function(e,t){let n=Xe,r=null,i=()=>(r||(r=at(),$e(t,e=>{ot(r,e)})),r);for(let t=0;;t++){let r=Fn(e),a=[e],o=!1;if($e(r,e=>{C(e)===L.documentFragment?nt(a,e):!o&&!st(n,e)&&(o=st(i(),e))}),!o)return;if(t>=8)throw xt(`the tree kept changing during in-place sanitization; refusing to return it`);$e(a,(t,n)=>{zn(t,n>0,e,i())})}},zn=function(e,t,n,r){let i=Wn(e),a;for(;a=i.nextNode();)st(r,a)&&!st(Xe,a)&&(t&&Zn(he.uponSanitizeShadowNode,a,null),rr(a,n),ur(a,n),Yn(a.content)&&dr(a.content))},Bn=function(e){Xe&&ot(Xe,e)},Vn=function(e,t){return Ne?e===`patchsrc`||e===`for`&&t!==`label`&&t!==`output`:!1},Hn=function(e){Ne&&Nn(e,e=>{let t=C(e);if(t===L.processingInstruction||t===L.comment&&bt(Xt,e.data)){try{p(e)}catch{}return!1}if(t===L.element){let t=e,n=_n(ee(e));try{t.hasAttribute&&t.hasAttribute(`patchsrc`)&&t.removeAttribute(`patchsrc`),t.hasAttribute&&t.hasAttribute(`for`)&&Vn(`for`,n)&&t.removeAttribute(`for`)}catch{}}return!0})},Un=function(e){let t=null,r=null;if(Re)e=`<remove></remove>`+e;else{let t=ut(e,/^[\r\n\t ]+/);r=t&&t[0]}hn===`application/xhtml+xml`&&sn===Ct&&(e=`<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>`+e+`</body></html>`);let i=T?se(e):e;if(sn===Ct)try{t=new l().parseFromString(i,hn)}catch{}if(!t||!t.documentElement){t=ue.createDocument(sn,`template`,null);try{t.documentElement.innerHTML=cn?ne:i}catch{}}let a=t.body||t.documentElement;return e&&r&&a.insertBefore(n.createTextNode(r),a.childNodes[0]||null),sn===Ct?pe.call(t,Pe?`html`:`body`)[0]:Pe?t.documentElement:a},Wn=function(e){let t=S?S(e):e.ownerDocument;return de.call(t||e,e,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Gn=function(e){return e=dt(e,ge,` `),e=dt(e,_e,` `),e=dt(e,ve,` `),e},Kn=function(e){qn(e);let t=e.querySelectorAll?.call(e,`template`);t&&$e(t,e=>{Yn(e.content)&&Kn(e.content)})},qn=function(e){e.normalize();let t=S?S(e):e.ownerDocument,n=de.call(t||e,e,c.SHOW_TEXT|c.SHOW_COMMENT|c.SHOW_CDATA_SECTION|c.SHOW_PROCESSING_INSTRUCTION,null),r=n.nextNode();for(;r;)r.data=Gn(r.data),r=n.nextNode()},Jn=function(e){let t=x?x(e):null;return typeof t!=`string`||_n(t)!==`form`?!1:typeof e.nodeName!=`string`||typeof e.textContent!=`string`||typeof e.removeChild!=`function`||e.attributes!==y(e)||typeof e.removeAttribute!=`function`||typeof e.removeAttributeNode!=`function`||typeof e.getAttributeNode!=`function`||typeof e.setAttribute!=`function`||typeof e.namespaceURI!=`string`||typeof e.insertBefore!=`function`||typeof e.hasChildNodes!=`function`||e.nodeType!==b(e)||e.childNodes!==g(e)},Yn=function(e){if(!b||typeof e!=`object`||!e)return!1;try{return b(e)===L.documentFragment}catch{return!1}},Xn=function(e){if(!b||typeof e!=`object`||!e)return!1;try{return typeof b(e)==`number`}catch{return!1}};function Zn(e,n,r){e.length!==0&&$e(e,e=>{e.call(t,n,r,vn)})}let Qn=function(e,t){return!!(Ne&&e.hasChildNodes()&&!Xn(e.firstElementChild)&&bt(Yt,e.textContent)&&bt(Yt,e.innerHTML)||Ne&&$t[t]&&C(e)===L.element&&te(e)===Ct&&(Xn(e.firstElementChild)||typeof e.textContent==`string`&&bt(Yt,e.textContent))||e.nodeType===L.processingInstruction||Ne&&e.nodeType===L.comment&&bt(Xt,e.data))},$n=function(e,t){return e instanceof RegExp?bt(e,t):e instanceof Function&&!!e(t,...[...arguments].slice(2))},er=function(e,t,n){if(!Ee[t]&&or(t)&&$n(Te.tagNameCheck,t))return!1;if(Ke&&!Qe[t]&&!Qe[ct(t)]){let t=_(e),r=g(e);if(r&&t){let i=r.length;for(let a=i-1;a>=0;--a){let i=e===n?f(r[a],!0):r[a];t.insertBefore(i,h(e))}}}return On(e),!0},tr=function(e,t,n,r){return e.length===0?t:t===n||t===r?wt(t):t},nr=function(e,t){return e===t||_(e)!==null?!1:(M&&Pn(e),!0)},rr=function(e,n){if(Bn(e),Zn(he.beforeSanitizeElements,e,null),nr(e,n))return!0;if(Jn(e))return On(e),!0;let r=_n(ee(e));if(k=tr(he.uponSanitizeElement,k,Ce,Ie),Zn(he.uponSanitizeElement,e,{tagName:r,allowedTags:k}),nr(e,n))return!0;if(Qn(e,r))return On(e),!0;if(Ee[r]||!(De.tagCheck instanceof Function&&De.tagCheck(r))&&!k[r]){let t=er(e,r,n);return t===!1&&(Zn(he.afterSanitizeElements,e,null),nr(e,n))?!0:t}if(C(e)===L.element&&!Dn(e)||(r===`noscript`||r===`noembed`||r===`noframes`)&&bt(Zt,e.innerHTML))return On(e),!0;if(Me&&e.nodeType===L.text){let n=Gn(e.textContent);e.textContent!==n&&(nt(t.removed,{element:e.cloneNode()}),e.textContent=n)}return Zn(he.afterSanitizeElements,e,null),nr(e,n)},ir=function(e,t,r){if(j[t]||Vn(t,e)||He&&(t===`id`||t===`name`)&&(r in n||r in yn))return!1;let i=A[t]||De.attributeCheck instanceof Function&&De.attributeCheck(t,e);return ke&&bt(D,t)||Oe&&bt(ye,t)?!0:i?_t[t]||bt(O,dt(r,xe,``))||(t===`src`||t===`xlink:href`||t===`href`)&&e!==`script`&&ft(r,`data:`)===0&&ht[e]||Ae&&!bt(be,dt(r,xe,``))?!0:!r:or(e)&&$n(Te.tagNameCheck,e)&&$n(Te.attributeNameCheck,t,e)||t===`is`&&Te.allowCustomizedBuiltInElements&&$n(Te.tagNameCheck,r)},ar=F({},[`annotation-xml`,`color-profile`,`font-face`,`font-face-format`,`font-face-name`,`font-face-src`,`font-face-uri`,`missing-glyph`]),or=function(e){return!ar[ct(e)]&&bt(Se,e)},sr=function(e,t,n,r){if(T&&typeof u==`object`&&typeof u.getAttributeType==`function`&&!n)switch(u.getAttributeType(e,t)){case`TrustedHTML`:return se(r);case`TrustedScriptURL`:return E(r)}return r},cr=function(e,t,n,r){try{return n?e.setAttributeNS(n,t,r):e.setAttribute(t,r),!Jn(e)||(On(e),!1)}catch{return jn(t,e),!1}},lr=function(e,t){return Ne&&bt(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,t)?!0:ct(e)===`attributename`&&ut(t,`href`)!==null},ur=function(e,n){if(Zn(he.beforeSanitizeAttributes,e,null),nr(e,n))return;let r=e.attributes;if(!r||Jn(e))return;A=tr(he.uponSanitizeAttribute,A,we,Le);let i={attrName:``,attrValue:``,keepAttr:!0,allowedAttributes:A,forceKeepAttr:void 0},a=r.length,o=_n(e.nodeName);for(;a--;){let n=r[a],s=n.name,c=n.namespaceURI,l=n.value,u=_n(s),d=l,f=s===`value`?d:pt(d),p=!1;i.attrName=u,i.attrValue=f,i.keepAttr=!0,i.forceKeepAttr=void 0,Zn(he.uponSanitizeAttribute,e,i),f=i.attrValue,We&&(u===`id`||u===`name`)&&ft(f,Ge)!==0&&(jn(s,e,n),f=Ge+f,p=!0),lr(s,f)?jn(s,e,n):i.forceKeepAttr||(i.keepAttr?!je&&bt(Qt,f)?jn(s,e,n):(Me&&(f=Gn(f)),ir(o,u,f)?(f=sr(o,u,c,f),f!==d&&cr(e,s,c,f)&&p&&tt(t.removed)):jn(s,e,n)):jn(s,e,n))}Zn(he.afterSanitizeAttributes,e,null),nr(e,n)},dr=function(e){let t=null,n=Wn(e);for(Zn(he.beforeSanitizeShadowDOM,e,null);t=n.nextNode();)if(Zn(he.uponSanitizeShadowNode,t,null),rr(t,e),ur(t,e),Yn(t.content)&&dr(t.content),C(t)===L.element){let e=v(t);Yn(e)&&(fr(e),dr(e))}Me&&qn(e),Zn(he.afterSanitizeShadowDOM,e,null)},fr=function(e){let t=[{node:e,shadow:null}];for(;t.length>0;){let e=t.pop();if(e.shadow){dr(e.shadow);continue}let n=e.node,r=C(n)===L.element,i=g(n);if(i)for(let e=i.length-1;e>=0;--e)t.push({node:i[e],shadow:null});if(r){let e=x?x(n):null;if(typeof e==`string`&&_n(e)===`template`){let e=n.content;Yn(e)&&t.push({node:e,shadow:null})}}if(r){let e=v(n);Yn(e)&&t.push({node:null,shadow:e},{node:e,shadow:null})}}};return t.sanitize=function(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},i=null,a=null,o=null,s=null;if(cn=!e,cn&&(e=`<!-->`),typeof e!=`string`&&!Xn(e)&&(e=Tt(e),typeof e!=`string`))throw xt(`dirty is not a string, aborting`);if(!t.isSupported)return e;Fe?(k=Ie,A=Le):xn(n),(he.uponSanitizeElement.length>0||he.uponSanitizeAttribute.length>0)&&(k=wt(k)),he.uponSanitizeAttribute.length>0&&(A=wt(A)),t.removed=[];let c=M&&typeof e!=`string`&&Xn(e),l=[],u=Xe;if(c){Hn(e);let t=ee(e);if(typeof t==`string`){let n=_n(t);if(!k[n]||Ee[n])throw An(e),xt(`root node is forbidden and cannot be sanitized in-place`)}if(Jn(e))throw An(e),xt(`root node is clobbered and cannot be sanitized in-place`);l=Fn(e),Xe=at()}else if(Xn(e))i=Un(`<!---->`),a=i.ownerDocument.importNode(e,!0),a.nodeType===L.element&&a.nodeName===`BODY`||a.nodeName===`HTML`?i=a:i.appendChild(a),fr(i);else{if(!ze&&!Me&&!Pe&&e.indexOf(`<`)===-1)return T&&Ve?se(e):e;if(i=Un(e),!i)return ze?null:Ve?ne:``}i&&Re&&On(i.firstChild);let d=c?e:i;try{c&&fr(e);let t=Wn(d);for(;o=t.nextNode();)rr(o,d),ur(o,d),Yn(o.content)&&dr(o.content);c&&Rn(e,l)}catch(t){throw c&&(An(e),Ln(e,l)),t}finally{Xe=u}if(c){if(Ln(e,l))throw xt(`a node selected for removal could not be safely returned; refusing to sanitize in place`);return Me&&Kn(e),e}if(ze){if(Me&&Kn(i),Be)for(s=fe.call(i.ownerDocument);i.firstChild;)s.appendChild(i.firstChild);else s=i;return(A.shadowroot||A.shadowrootmode)&&(s=me.call(r,s,!0)),s}let f=Pe?i.outerHTML:i.innerHTML;return Pe&&k[`!doctype`]&&i.ownerDocument&&i.ownerDocument.doctype&&i.ownerDocument.doctype.name&&bt(Jt,i.ownerDocument.doctype.name)&&(f=`<!DOCTYPE `+i.ownerDocument.doctype.name+`>
`+f),Me&&(f=Gn(f)),T&&Ve?se(f):f},t.setConfig=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};xn(e),Fe=!0,Ie=k,Le=A},t.clearConfig=function(){vn=null,Fe=!1,Ie=null,Le=null,T=re,ne=``},t.isValidAttribute=function(e,t,n){vn||xn({});let r=_n(e),i=_n(t);return typeof n==`string`&&(lr(t,n)||!je&&bt(Qt,n))?!1:ir(r,i,n)},t.addHook=function(e,t){typeof t==`function`&&vt(he,e)&&nt(he[e],t)},t.removeHook=function(e,t){if(vt(he,e)){if(t!==void 0){let n=et(he[e],t);return n===-1?void 0:N(he[e],n,1)[0]}return tt(he[e])}},t.removeHooks=function(e){vt(he,e)&&(he[e]=[])},t.removeAllHooks=function(){he=nn()},t}var sn=on();function cn(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var ln=cn();function un(e){ln=e}var dn={exec:()=>null};function fn(e){let t=[];return n=>{let r=Math.max(0,Math.min(3,n-1)),i=t[r];return i||(i=e(r),t[r]=i),i}}function R(e,t=``){let n=typeof e==`string`?e:e.source,r={replace:(e,t)=>{let i=typeof t==`string`?t:t.source;return i=i.replace(mn.caret,`$1`),n=n.replace(e,i),r},getRegex:()=>new RegExp(n,t)};return r}var pn=((e=``)=>{try{return!!RegExp(`(?<=1)(?<!1)`+e)}catch{return!1}})(),mn={codeRemoveIndent:/^(?: {0,3}\t| {1,4})/gm,listInterruptsParagraph:/^ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,endingSpaceTabChar:/[ \t]$/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,leadingSpaceTab:/^[ \t]+/,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+)[ \t]*)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,blockquoteMarkerWhitespace:/^( {0,3}>)([ \t]+)/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\][ \t]+\S/,listReplaceTask:/^\[[ xX]\][ \t]+/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,numericCharacterReference:/&#(?:(\d{1,7})|[Xx]([A-Fa-f0-9]{1,6}));/,numericCharacterReferenceOrAmpersand:/&#(?:(\d{1,7})|[Xx]([A-Fa-f0-9]{1,6}));|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:fn(e=>RegExp(`^ {0,${e}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),hrRegex:fn(e=>RegExp(`^ {0,${e}}((?:-[ 	]*){3,}|(?:_[ 	]*){3,}|(?:\\*[ 	]*){3,})(?:\\n+|$)`)),fencesBeginRegex:fn(e=>RegExp(`^ {0,${e}}(?:\`\`\`|~~~)`)),headingBeginRegex:fn(e=>RegExp(`^ {0,${e}}#{1,6}(?:\\s|$)`)),pedanticHeadingBeginRegex:fn(e=>RegExp(`^ {0,${e}}#`)),htmlBeginRegex:fn(e=>RegExp(`^ {0,${e}}(?:</?(?:${kn})(?: +|$|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)`,`i`)),blockquoteBeginRegex:fn(e=>RegExp(`^ {0,${e}}>`)),nestedContainerMarkers:/^(?: {0,3}(?:(?:[*+-]|\d{1,9}[.)])[ \t]+|>[ \t]?))+/},hn=/^(?:[ \t]*(?:\n|$))+/,gn=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,_n=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}(?:(?=`)\1`*|(?=~)\1~*) *(?=\n|$)|$)/,vn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,yn=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,bn=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,xn=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |fences|blockquote|heading|hr|html|table))+?)\n {0,3}(=+|-+)[ \t]*(?:\n+|$)/,Sn=R(xn).replace(/bull/g,bn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}(?:\s|$)/).replace(/hr/g,/ {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,``).getRegex(),Cn=R(xn).replace(/bull/g,bn).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}(?:\s|$)/).replace(/hr/g,/ {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),wn=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/,Tn=/^[^\n]+/,En=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\\n]|\n(?![ \t]*\n))+/,Dn=R(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace(`label`,En).replace(`title`,/(?:"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\\n]|\n(?!\n))*'|\((?:\\[\s\S]|[^()\\])*\))/).getRegex(),On=R(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g,bn).getRegex(),kn=`address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul`,An=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,jn=R(`^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?:[ \\t]+|\\n|/?>|$)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!(?:script|pre|style|textarea)(?![a-z0-9-]))([a-z][a-z0-9-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</[a-z][a-z0-9-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))`,`i`).replace(`comment`,An).replace(`tag`,kn).replace(`attribute`,/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),Mn=e=>R(wn).replace(`hr`,vn).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`|lheading`,``).replace(`|table`,``).replace(`blockquote`,` {0,3}>`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace(`list`,e).replace(`html`,` {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)`).replace(`tag`,kn).getRegex(),Nn=Mn(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/),Pn=Mn(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/),Fn={blockquote:R(/^( {0,3}> ?(?:(?![ \t]*(?:\n|$))(paragraph)|[^\n]*)(?:\n|$))+/).replace(`paragraph`,Pn).getRegex(),code:gn,def:Dn,fences:_n,heading:yn,hr:vn,html:jn,lheading:Sn,list:On,newline:hn,paragraph:Nn,table:dn,text:Tn},In=R(`^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)`).replace(`hr`,vn).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`blockquote`,` {0,3}>`).replace(`code`,`(?: {4}| {0,3}	)[^\\n]`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace(`list`,` {0,3}(?:[*+-]|1[.)])[ \\t]`).replace(`html`,` {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)`).replace(`tag`,kn).getRegex(),Ln={...Fn,lheading:Cn,table:In,paragraph:R(wn).replace(`hr`,vn).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`|lheading`,``).replace(`table`,In).replace(`blockquote`,` {0,3}>`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace(`list`,` {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]`).replace(`html`,` {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)`).replace(`tag`,kn).getRegex()},Rn={...Fn,html:R(`^ *(?:comment(?: *\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1>(?: *\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?>(?: *\\n{2,}|\\s*$))`).replace(`comment`,An).replace(/tag/g,`(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b`).getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:dn,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:R(wn).replace(`hr`,vn).replace(`heading`,` *#{1,6} *[^
]`).replace(`lheading`,Sn).replace(`|table`,``).replace(`blockquote`,` {0,3}>`).replace(`|fences`,``).replace(`|list`,``).replace(`|html`,``).replace(`|tag`,``).getRegex()},zn=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,Bn=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,Vn=/^( {2,}|\\)\n(?!\s*$)[ \t]*/,Hn=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Un=/[\p{P}\p{S}]/u,Wn=/[\s\p{P}\p{S}]/u,Gn=/[^\s\p{P}\p{S}]/u,Kn=R(/^((?![*_])punctSpace)/,`u`).replace(/punctSpace/g,Wn).getRegex(),qn=/[\p{Pi}\p{Ps}"']/u,Jn=/(?!~)[\p{P}\p{S}]/u,Yn=/(?!~)[\s\p{P}\p{S}]/u,Xn=/(?:[^\s\p{P}\p{S}]|~)/u,Zn=R(/link|precode-code|html/,`g`).replace(`link`,/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace(`precode-`,pn?"(?<!`)()":"(^^|[^`])").replace(`code`,/(?<b>`+)[^`]+\k<b>(?!`)/).replace(`html`,/<(?! )[^<>]*?>/).getRegex(),Qn=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,$n=R(Qn,`u`).replace(/punct/g,Un).getRegex(),er=R(Qn,`u`).replace(/punct/g,Jn).getRegex(),tr=R(/^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/,`u`).replace(/openQuote/g,qn).replace(/punct/g,Un).getRegex(),nr=`^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)`,rr=R(nr,`gu`).replace(/notPunctSpace/g,Gn).replace(/punctSpace/g,Wn).replace(/punct/g,Un).getRegex(),ir=R(nr,`gu`).replace(/notPunctSpace/g,Xn).replace(/punctSpace/g,Yn).replace(/punct/g,Jn).getRegex(),ar=R(`^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)`,`gu`).replace(/notPunctSpace/g,Gn).replace(/punctSpace/g,Wn).replace(/punct/g,Un).getRegex(),or=R(`^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)`,`gu`).replace(/notPunctSpace/g,Gn).replace(/punctSpace/g,Wn).replace(/punct/g,Un).getRegex(),sr=R(`^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)`,`gu`).replace(/notPunctSpace/g,Gn).replace(/punctSpace/g,Wn).replace(/punct/g,Un).getRegex(),cr=R(/^~~?(?:((?!~)punct)|[^\s~])/,`u`).replace(/punct/g,Un).getRegex(),lr=R(`^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)`,`gu`).replace(/notPunctSpace/g,Gn).replace(/punctSpace/g,Wn).replace(/punct/g,Un).getRegex(),ur=R(/\\(punct)/,`gu`).replace(/punct/g,Un).getRegex(),dr=R(/(`+)(?:[^`]|[^`][\s\S]*?[^`])\1(?!`)|`+|\\(punct)/,`gu`).replace(/punct/g,Un).getRegex(),fr=R(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace(`scheme`,/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace(`email`,/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),pr=R(An).replace(`(?:-->|$)`,`-->`).getRegex(),mr=R(`^comment|^</[a-zA-Z][a-zA-Z0-9-]*\\s*>|^<[a-zA-Z][a-zA-Z0-9-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>`).replace(`comment`,pr).replace(`attribute`,/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),hr=/\[(?:\\[\s\S]|[^\[\]\\])*\]/,gr=R(/(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/).replace(`brackets`,hr).getRegex(),_r=R(/^!?\[(label)\]\([ \t\n]*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?[ \t\n]*\)/).replace(`label`,gr).replace(`href`,/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace(`title`,/"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'|\((?:\\[\s\S]|[^)\\])*\)/).getRegex(),vr=R(/^!?\[(label)\]\[(ref)\]/).replace(`label`,gr).replace(`ref`,En).getRegex(),yr=R(/^!?\[(ref)\](?:\[\])?/).replace(`ref`,En).getRegex(),br=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\]){1,999}/,xr=R(/(?:[^\[\]\\`]*(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\]))){0,999}?[^\[\]\\`]*?/).replace(`brackets`,hr).getRegex(),Sr=R(`reflink|nolink(?!\\()`,`g`).replace(`reflink`,R(/^!?\[(label)\]\[(ref)\]/).replace(`label`,xr).replace(`ref`,br).getRegex()).replace(`nolink`,R(/^!?\[(ref)\](?:\[\])?/).replace(`ref`,br).getRegex()).getRegex(),Cr=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,wr=R(/(?:mailto:email|xmpp:email(?:\/[A-Za-z0-9@.]+)?)/).replace(/email/g,/[A-Za-z0-9._+-]+@[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(),Tr={_backpedal:dn,anyPunctuation:ur,anyPunctuationOutsideCode:dr,autolink:fr,blockSkip:Zn,br:Vn,code:Bn,del:dn,delLDelim:dn,delRDelim:dn,emStrongLDelim:$n,emStrongRDelimAst:rr,emStrongRDelimUnd:or,escape:zn,link:_r,nolink:yr,punctuation:Kn,reflink:vr,reflinkSearch:Sr,tag:mr,text:Hn,url:dn},Er={...Tr,emStrongLDelim:tr,emStrongRDelimAst:ar,emStrongRDelimUnd:sr,link:R(/^!?\[(label)\]\((.*?)\)/).replace(`label`,gr).getRegex(),reflink:R(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace(`label`,gr).getRegex()},Dr={...Tr,emStrongRDelimAst:ir,emStrongLDelim:er,delLDelim:cr,delRDelim:lr,url:R(/^emailProtocol|^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace(`emailProtocol`,wr).replace(`protocol`,Cr).replace(`email`,/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:R(/^(?:[^a-zA-Z0-9](?=emailProtocol)|(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|wwwStart|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9](?=emailProtocol)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))))/).replace(`protocol`,Cr).replace(/emailProtocol/g,/(?:mailto|xmpp):/).replace(`wwwStart`,pn?`(?<![^\\s*_~(])www\\.`:`www\\.`).getRegex()},Or={...Dr,br:R(Vn).replace(`{2,}`,`*`).getRegex(),text:R(Dr.text).replace(`\\b_`,`\\b_| {2,}\\n`).replace(/\{2,\}/g,`*`).getRegex()},kr={normal:Fn,gfm:Ln,pedantic:Rn},Ar={normal:Tr,gfm:Dr,breaks:Or,pedantic:Er},jr={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`},Mr=e=>jr[e];function Nr(e,t){if(t){if(mn.escapeTest.test(e))return e.replace(mn.escapeReplace,Mr)}else if(mn.escapeTestNoEncode.test(e))return e.replace(mn.escapeReplaceNoEncode,Mr);return e}function Pr(e){return mn.numericCharacterReference.test(e)?e.replace(mn.numericCharacterReferenceOrAmpersand,(e,t,n)=>{if(t===void 0&&n===void 0)return`&amp;`;let r=t===void 0?Number.parseInt(n,16):Number.parseInt(t,10);return r===0||r>1114111||r>=55296&&r<=57343?`�`:r===38?`&amp;`:String.fromCodePoint(r)}):e}function Fr(e){try{e=encodeURI(e).replace(mn.percentDecode,`%`)}catch{return null}return e}function Ir(e,t){let n=e.replace(mn.findPipe,(e,t,n)=>{let r=!1,i=t;for(;--i>=0&&n[i]===`\\`;)r=!r;return r?`|`:` |`}).split(mn.splitPipe),r=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t){if(n.length>t)n.splice(t);else for(;n.length<t;)n.push(``)}for(;r<n.length;r++)n[r]=n[r].trim().replace(mn.slashPipe,`|`);return n}function Lr(e,t,n){let r=e.length;if(r===0)return``;let i=0;for(;i<r;){let a=e.charAt(r-i-1);if(a===t&&!n)i++;else if(a!==t&&n)i++;else break}return e.slice(0,r-i)}function Rr(e){let t=e.split(`
`),n=t.length-1;for(;n>=0&&mn.blankLine.test(t[n]);)n--;return t.length-n<=2?e:t.slice(0,n+1).join(`
`)}function zr(e){return e.trim().replace(mn.multipleSpaceGlobal,` `).toLowerCase().toUpperCase().toLowerCase()}function Br(e,t){if(e.indexOf(t[0])===-1&&e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]===`\\`)r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}var Vr=new WeakMap;function Hr(e){let t={"*":-1,_:-1},n=-1,r=e.length;for(let i=0;i<r;i++){let a=e[i];if(a!==`*`&&a!==`_`&&a!==`~`)continue;let o=i===0?`
`:e[i-1],s=i+1;for(;s<r&&e[s]===a;)s++;o!==` `&&o!==`	`&&o!==`
`&&o!==`\r`&&o!==`\f`&&(a===`~`?n=i:t[a]=i),i=s-1}return{maskedSrc:e,lastPossibleEmStrongCloserIndex:t,lastPossibleDelCloserIndex:n}}function Ur(e,t){let n=Hr(t),r=Vr.get(e);r?r.push(n):Vr.set(e,[n])}function Wr(e){let t=Vr.get(e);t&&(t.pop(),t.length===0&&Vr.delete(e))}function Gr(e,t,n){let r=Vr.get(e)?.at(-1);return r&&r.maskedSrc===t?r.lastPossibleEmStrongCloserIndex[n]:Hr(t).lastPossibleEmStrongCloserIndex[n]}function Kr(e,t){let n=Vr.get(e)?.at(-1);return n&&n.maskedSrc===t?n.lastPossibleDelCloserIndex:Hr(t).lastPossibleDelCloserIndex}function qr(e,t=0){let n=t,r=``;for(let t of e)if(t===`	`){let e=4-n%4;r+=` `.repeat(e),n+=e}else r+=t,n++;return r}function Jr(e,t,n,r,i){let a=t.href,o=t.title||null,s=e[1].replace(i.other.outputLinkReplace,`$1`),c=e[0].charAt(0)===`!`,l=r.state.inLink,u=r.state.linkEmitted,d=r.state.inRawBlock;r.state.inLink=!0,r.state.linkEmitted=!1;let f=r.inlineTokens(s),p=r.state.linkEmitted;if(r.state.linkEmitted=u,r.state.inLink=l,!c){if(p){r.state.inRawBlock=d;return}r.state.linkEmitted=!0}return{type:c?`image`:`link`,raw:n,href:a,title:o,text:s,tokens:f}}function Yr(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let i=r[1];return t.split(`
`).map(e=>{let t=e.match(n.other.beginningSpace);if(t===null)return e;let[r]=t;return e.slice(Math.min(r.length,i.length))}).join(`
`)}function Xr(e,t,n,r){if(!t.includes(`<`))return!1;for(let i=0;i<t.length;i++){if(t[i]===`\\`){i++;continue}if(t[i]==="`"){let e=r.inline.code.exec(t.slice(i));if(e){i+=e[0].length-1;continue}}if(t[i]!==`<`)continue;let a=e.slice(n+i),o=r.inline.tag.exec(a)||r.inline.autolink.exec(a);if(o){if(o[0].length>t.length-i)return!0;i+=o[0].length-1}}return!1}var Zr=class{options;rules;lexer;constructor(e){this.options=e||ln}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:`space`,raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let e=this.options.pedantic?t[0]:Rr(t[0]);return{type:`code`,raw:e,codeBlockStyle:`indented`,text:e.replace(this.rules.other.codeRemoveIndent,``)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let e=t[0],n=Yr(e,t[3]||``,this.rules);return{type:`code`,raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,`$1`):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let e=t[2].trim();if(this.rules.other.endingHash.test(e)){let t=Lr(e,`#`);(this.options.pedantic||!t||this.rules.other.endingSpaceTabChar.test(t))&&(e=t.trim())}return{type:`heading`,raw:Lr(t[0],`
`),depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:`hr`,raw:Lr(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let e=Lr(t[0],`
`).split(`
`),n=``,r=``,i=[];for(;e.length>0;){let t=!1,a=[],o=0;for(;o<e.length;o++)if(this.rules.other.blockquoteStart.test(e[o]))a.push(e[o]),t=!0;else if(!t)a.push(e[o]);else break;e=e.slice(o);let s=a.join(`
`),c=s.replace(this.rules.other.blockquoteMarkerWhitespace,(e,t,n)=>t+qr(n,t.length)).replace(this.rules.other.blockquoteSetextReplace,`
    $1`).replace(this.rules.other.blockquoteSetextReplace2,``);n=n?`${n}
${s}`:s,r=r?`${r}
${c}`:c;let l=this.lexer.state.top;if(this.lexer.state.top=!0,this.lexer.blockTokens(c,i,!0),this.lexer.state.top=l,e.length===0)break;let u=i.at(-1);if(u?.type===`code`||u?.type===`heading`||u?.type===`hr`||u?.type===`html`||u?.type===`table`)break;if(u?.type===`blockquote`){let t=u,a=e.join(`
`),o=t.raw+`
`+a.replace(this.rules.other.blockquoteSetextReplace2,``),s=this.blockquote(o);i[i.length-1]=s;let c=o.substring(s.raw.length).replace(/^\n/,``),l=c?c.split(`
`).length:0,d=l?e.slice(0,-l):e;if(d.length>0&&(n=`${n}
${d.join(`
`)}`),r=r.substring(0,r.length-t.text.length)+s.text,e=e.slice(d.length),e.length>0&&this.rules.other.blockquoteStart.test(e[0]))continue;break}if(u?.type===`list`){let t=u,a=t.raw+`
`+e.join(`
`),o=this.list(a);i[i.length-1]=o;let s=o.raw.length>t.raw.length?a.slice(t.raw.length+1,o.raw.length).split(`
`).length:0;if(s>0){let t=e.slice(0,s).join(`
`);n=`${n}
${t}`,r=`${r}
${t}`}e=e.slice(s)}}return{type:`blockquote`,raw:n,tokens:i,text:r}}}list(e){let t=this.rules.block.list.exec(e);if(t){if(!this.options.pedantic&&this.lexer.state.lastToken?.type===`text`&&!this.rules.other.listInterruptsParagraph.test(e))return;let n=e,r=()=>n.length-e.length,i=t[1].trim(),a=i.length>1,o={type:`list`,raw:``,ordered:a,start:a?+i.slice(0,-1):``,loose:!1,items:[]};i=a?`\\d{1,9}\\${i.slice(-1)}`:`\\${i}`,this.options.pedantic&&(i=a?i:`[*+-]`);let s=this.rules.other.listItemRegex(i),c=!1;for(;e;){let i=!1,a=``;if(!(t=s.exec(e))||this.rules.block.hr.test(e))break;let l=r();e=e.substring(t[0].length);let u=t[2].split(`
`,1)[0],d=t[1].length,f=this.options.pedantic?qr(u,d):u.replace(this.rules.other.leadingSpaceTab,e=>qr(e,d)),p=e.split(`
`,1)[0],m=!f.trim(),h=0;if(this.options.pedantic?(h=2,a=f.trimStart()):m?h=d+1:(h=f.search(this.rules.other.nonSpaceChar),h=h>4?1:h,a=f.slice(h),h+=d),m&&this.rules.other.blankLine.test(p)&&(e=e.substring(p.length+1),i=!0),!i){let t=this.rules.other.nextBulletRegex(h),n=this.rules.other.hrRegex(h),r=this.rules.other.fencesBeginRegex(h),i=this.options.pedantic?this.rules.other.pedanticHeadingBeginRegex(h):this.rules.other.headingBeginRegex(h),o=this.rules.other.htmlBeginRegex(h),s=this.rules.other.blockquoteBeginRegex(h),c=!1;for(;e;){let l=e.split(`
`,1)[0],u;if(p=l,this.options.pedantic?(p=p.replace(this.rules.other.listReplaceNesting,`  `),u=p):u=p.replace(this.rules.other.leadingSpaceTab,e=>qr(e)),r.test(p)||i.test(p)||o.test(p)||s.test(p)||t.test(p)||n.test(p))break;if(u.search(this.rules.other.nonSpaceChar)>=h||!p.trim())a+=`
`+u.slice(h),c=!1;else{if(m||f.replace(this.rules.other.tabCharGlobal,`    `).search(this.rules.other.nonSpaceChar)>=4||r.test(f)||i.test(f)||o.test(f)||n.test(f))break;if(!this.options.pedantic&&!c){let e=f.replace(this.rules.other.nestedContainerMarkers,``);if(this.rules.block.fences.test(e)||this.rules.block.heading.test(e)||this.rules.block.hr.test(e))break}let e=!this.options.pedantic&&/^ {0,3}(?:=+|-+) *$/.test(p)&&this.rules.block.lheading.test(`${f}
${p}`)?`    ${u.replace(/^ {0,3}/,``)}`:p;a+=`
`+e,c=!0}m=!p.trim(),e=e.substring(l.length+1),f=u.slice(h)}}let g=n.slice(l,r());o.loose||(c?o.loose=!0:this.rules.other.doubleBlankLine.test(g)&&(c=!0)),o.items.push({type:`list_item`,raw:g,task:!!this.options.gfm&&this.rules.other.listIsTask.test(a),loose:!1,text:a,tokens:[]})}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=n.slice(0,r()).trimEnd();for(let e of o.items)if(this.lexer.state.top=!1,e.tokens=this.lexer.blockTokens(e.text,[]),!o.loose){let t=e.tokens.filter(e=>e.type===`space`);o.loose=t.length>0&&t.some(e=>this.rules.other.anyLine.test(e.raw))}for(let e of o.items){let t=e.tokens[0];if(e.task&&(t?.type===`text`||t?.type===`paragraph`)){e.text=e.text.replace(this.rules.other.listReplaceTask,``),t.raw=t.raw.replace(this.rules.other.listReplaceTask,``),t.text=t.text.replace(this.rules.other.listReplaceTask,``);for(let e=this.lexer.inlineQueue.length-1;e>=0;e--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[e].src)){this.lexer.inlineQueue[e].src=this.lexer.inlineQueue[e].src.replace(this.rules.other.listReplaceTask,``);break}let n=this.rules.other.listTaskCheckbox.exec(e.raw);if(n){let t={type:`checkbox`,raw:n[0]+` `,checked:n[0]!==`[ ]`};e.checked=t.checked,o.loose?e.tokens[0]&&[`paragraph`,`text`].includes(e.tokens[0].type)&&`tokens`in e.tokens[0]&&e.tokens[0].tokens?(e.tokens[0].raw=t.raw+e.tokens[0].raw,e.tokens[0].text=t.raw+e.tokens[0].text,e.tokens[0].tokens.unshift(t)):e.tokens.unshift({type:`paragraph`,raw:t.raw,text:t.raw,tokens:[t]}):e.tokens.unshift(t)}}else e.task&&=!1}if(o.loose)for(let e of o.items){e.loose=!0;for(let t of e.tokens)t.type===`text`&&(t.type=`paragraph`)}return o}}html(e){let t=this.rules.block.html.exec(e);if(t){let e=Rr(t[0]);return{type:`html`,block:!0,raw:e,pre:t[1]===`pre`||t[1]===`script`||t[1]===`style`,text:e}}}def(e){let t=this.rules.block.def.exec(e);if(t){if(!this.rules.other.startAngleBracket.test(t[2])&&Br(t[2],`()`)!==-1)return;let e=zr(t[1]),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,`$1`).replace(this.rules.inline.anyPunctuation,`$1`):``,r=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,`$1`):t[3];return{type:`def`,tag:e,raw:Lr(t[0],`
`),href:n,title:r}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Ir(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,``).split(`|`),i=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,``).split(`
`):[],a={type:`table`,raw:Lr(t[0],`
`),header:[],align:[],rows:[]};if(n.length===r.length){for(let e of r)this.rules.other.tableAlignRight.test(e)?a.align.push(`right`):this.rules.other.tableAlignCenter.test(e)?a.align.push(`center`):this.rules.other.tableAlignLeft.test(e)?a.align.push(`left`):a.align.push(null);for(let e=0;e<n.length;e++)a.header.push({text:n[e],tokens:this.lexer.inline(n[e]),header:!0,align:a.align[e]});for(let e of i)a.rows.push(Ir(e,a.header.length).map((e,t)=>({text:e,tokens:this.lexer.inline(e),header:!1,align:a.align[t]})));return a}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t){let e=t[1].trim();return{type:`heading`,raw:Lr(t[0],`
`),depth:t[2].charAt(0)===`=`?1:2,text:e,tokens:this.lexer.inline(e)}}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let e=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:`paragraph`,raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:`text`,raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:`escape`,raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:`html`,raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){if(this.lexer.state.linkParenPossible===!1)return;let t=this.rules.inline.link.exec(e);if(t){let n=t[0].charAt(0)===`!`?2:1;if(!this.options.pedantic&&Xr(e,t[1],n,this.rules))return;let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let e=Lr(r.slice(0,-1),`\\`);if((r.length-e.length)%2==0)return}else{let e=Br(t[2],`()`);if(e===-2)return;if(e>-1){let n=(t[0].indexOf(`!`)===0?5:4)+t[1].length+e;t[2]=t[2].substring(0,e),t[0]=t[0].substring(0,n).trim(),t[3]=``}}let i=Lr(t[0].slice(0,-1),`\\`);if((t[0].length-i.length)%2==0)return;let a=t[2],o=``;if(this.options.pedantic){let e=this.rules.other.pedanticHrefTitle.exec(a);e&&(a=e[1],o=e[3])}else o=t[3]?t[3].slice(1,-1):``;return a=a.trim(),this.rules.other.startAngleBracket.test(a)&&(a=this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?a.slice(1):a.slice(1,-1)),Jr(t,{href:a&&a.replace(this.rules.inline.anyPunctuation,`$1`),title:o&&o.replace(this.rules.inline.anyPunctuation,`$1`)},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=n[0].charAt(0)===`!`?2:1;if(!this.options.pedantic&&Xr(e,n[1],r,this.rules))return;let i=t[zr(n[2]||n[1])];if(!i){let e=n[0].charAt(0);return{type:`text`,raw:e,text:e}}return Jr(n,i,n[0],this.lexer,this.rules)}}emStrong(e,t,n=``){let r=this.rules.inline.emStrongLDelim.exec(e);if(!r||!r[1]&&!r[2]&&!r[3]&&!r[4])return;let i=r[0][0],a=n===i,o=t.length-e.length,s=o;for(;!this.options.pedantic&&s>0&&t[s-1]===i;)s--;let c=[...t.slice(Math.max(0,s-2),s)].at(-1)??``,l=c===`*`||c===`_`||!!this.rules.inline.punctuation.exec(c);s<o&&(n=c);let u=s<o?l:n===`*`||n===`_`||!!this.rules.inline.punctuation.exec(n);if(r[4]&&n.match(this.rules.other.unicodeAlphaNumeric))return;let d=r[1]||r[3]||``;if(!d||!n||u){let n=[...r[0]].length-1,u,f,p=n,m=0,h=o-s+n,g=!this.options.pedantic&&!!c.trim()&&(!!d||i===`*`&&!l);if(i!==`*`&&i!==`_`)return;let _=i===`*`?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd,v=Gr(this,t,i),y=t.length-e.length+n;if(v<y)return;t=t.slice(-1*e.length+n);let b=v-y;for(_.lastIndex=0;(r=_.exec(t))!==null&&!(r.index>b);){if(u=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!u)continue;if(f=[...u].length,r[3]||r[4]){p+=f;continue}if(r[5]||r[6]||g){if(a&&(r[5]||r[6]))break;if(h%3&&!((h+f)%3)){m+=f;continue}}if(p-=f,p>0)continue;f=Math.min(f,f+p+m);let t=[...r[0]][0].length,i=e.slice(0,n+r.index+t+f);if(Math.min(n,f)%2){let e=i.slice(1,-1);return{type:`em`,raw:i,text:e,tokens:this.lexer.inlineTokens(e)}}let o=i.slice(2,-2);return{type:`strong`,raw:i,text:o,tokens:this.lexer.inlineTokens(o)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let e=t[2].replace(this.rules.other.newLineCharGlobal,` `),n=this.rules.other.nonSpaceChar.test(e),r=this.rules.other.startingSpaceChar.test(e)&&this.rules.other.endingSpaceChar.test(e);return n&&r&&(e=e.substring(1,e.length-1)),{type:`codespan`,raw:t[0],text:e}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:`br`,raw:t[0]}}del(e,t,n=``){let r=this.rules.inline.delLDelim.exec(e);if(r&&(!r[1]||!n||this.rules.inline.punctuation.exec(n))){let n=[...r[0]].length-1,i,a,o=n,s=this.rules.inline.delRDelim,c=Kr(this,t),l=t.length-e.length+n;if(c<l)return;t=t.slice(-1*e.length+n);let u=c-l;for(s.lastIndex=0;(r=s.exec(t))!==null&&!(r.index>u);){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i||(a=[...i].length,a!==n))continue;if(r[3]||r[4]){o+=a;continue}if(o-=a,o>0)continue;a=Math.min(a,a+o);let t=[...r[0]][0].length,s=e.slice(0,n+r.index+t+a),c=s.slice(n,-n);return{type:`del`,raw:s,text:c,tokens:this.lexer.inlineTokens(c)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let e,n;return t[2]===`@`?(e=t[1],n=`mailto:`+e):(e=t[1],n=e),{type:`link`,raw:t[0],text:e,href:n,autolink:!0,tokens:[{type:`text`,raw:e,text:e}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let e,n;if(t[2]===`@`)e=t[0],n=`mailto:`+e;else{let r;do r=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??``;while(r!==t[0]);e=t[0],n=t[1]===`www.`?`http://`+t[0]:t[0]}return{type:`link`,raw:t[0],text:e,href:n,autolink:!0,tokens:[{type:`text`,raw:e,text:e}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let e=this.lexer.state.inRawBlock;return{type:`text`,raw:t[0],text:e?t[0]:Pr(t[0]),escaped:e}}}},Qr=class e{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||ln,this.options.tokenizer=this.options.tokenizer||new Zr,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,linkEmitted:!1,linkParenPossible:!0,top:!0};let t={other:mn,block:kr.normal,inline:Ar.normal};this.options.pedantic?(t.block=kr.pedantic,t.inline=Ar.pedantic):this.options.gfm&&(t.block=kr.gfm,t.inline=this.options.breaks?Ar.breaks:Ar.gfm),this.tokenizer.rules=t}static get rules(){return{block:kr,inline:Ar}}static lex(t,n){return new e(n).lex(t)}static lexInline(t,n){return new e(n).inlineTokens(t)}lex(e){e=e.replace(mn.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let e=0;e<this.inlineQueue.length;e++){let t=this.inlineQueue[e];this.state.inRawBlock=!1,this.inlineTokens(t.src,t.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],n=!1){this.tokenizer.lexer=this;let r=this.state.lastToken;this.options.pedantic&&(e=e.replace(mn.tabCharGlobal,`    `).replace(mn.spaceLine,``));let i=1/0;for(;e;){if(e.length<i)i=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}this.state.lastToken=t.at(-1);let r;if(this.options.extensions?.block?.some(n=>(r=n.call({lexer:this},e,t))?(e=e.substring(r.raw.length),t.push(r),!0):!1))continue;if(r=this.tokenizer.space(e)){e=e.substring(r.raw.length);let n=t.at(-1);r.raw.length===1&&n!==void 0?n.raw+=`
`:t.push(r);continue}if(r=this.tokenizer.code(e)){e=e.substring(r.raw.length);let n=t.at(-1);n?.type===`paragraph`||n?.type===`text`?(n.raw+=(n.raw.endsWith(`
`)?``:`
`)+r.raw,n.text+=`
`+r.text,this.inlineQueue.at(-1).src=n.text):t.push(r);continue}if((r=this.tokenizer.fences(e))||(r=this.tokenizer.heading(e))||(r=this.tokenizer.hr(e))||(r=this.tokenizer.blockquote(e))||(r=this.tokenizer.list(e))||(r=this.tokenizer.html(e))){e=e.substring(r.raw.length),t.push(r);continue}if(r=this.tokenizer.def(e)){e=e.substring(r.raw.length);let n=t.at(-1);n?.type===`paragraph`||n?.type===`text`?(n.raw+=(n.raw.endsWith(`
`)?``:`
`)+r.raw,n.text+=`
`+r.raw,this.inlineQueue.at(-1).src=n.text):(this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title}),t.push(r));continue}if((r=this.tokenizer.table(e))||(r=this.tokenizer.lheading(e))){e=e.substring(r.raw.length),t.push(r);continue}let a=e;if(this.options.extensions?.startBlock){let t=1/0,n=e.slice(1),r;this.options.extensions.startBlock.forEach(e=>{r=e.call({lexer:this},n),typeof r==`number`&&r>=0&&(t=Math.min(t,r))}),t<1/0&&t>=0&&(a=e.substring(0,t+1))}if(this.state.top&&(r=this.tokenizer.paragraph(a))){let i=t.at(-1);n&&i?.type===`paragraph`?(i.raw+=(i.raw.endsWith(`
`)?``:`
`)+r.raw,i.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=i.text):t.push(r),n=a.length!==e.length,e=e.substring(r.raw.length)}else if(r=this.tokenizer.text(e)){e=e.substring(r.raw.length);let n=t.at(-1);n?.type===`text`?(n.raw+=(n.raw.endsWith(`
`)?``:`
`)+r.raw,n.text+=`
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=n.text):t.push(r)}else if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return this.state.top=!0,this.state.lastToken=r,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}linkInText(e){if(!e.includes(`[`))return!1;let t=this.tokenizer.rules.inline.link;for(let n of e.matchAll(this.tokenizer.rules.inline.blockSkip))if(t.test(n[0])&&e.charAt(n.index-1)!==`!`)return!0;for(let t of e.matchAll(this.tokenizer.rules.inline.reflinkSearch)){let e=t[0],n=e.lastIndexOf(`[`);if(e.charAt(0)!==`!`&&Object.hasOwn(this.tokens.links,zr(e.slice(n+1,-1)))&&!(n>1&&this.linkInText(e.slice(1,n-1))))return!0}return!1}inlineTokens(e,t=[]){this.tokenizer.lexer=this;let n=this.state.linkParenPossible;this.state.linkParenPossible=n&&e.includes(`)`);try{return this.#e(e,t)}finally{this.state.linkParenPossible=n}}#e(e,t){let n=e.includes(`*`)||e.includes(`_`)||e.includes(`~`)||this.options.hooks?.emStrongMask||this.tokenizer.emStrong!==Zr.prototype.emStrong||this.tokenizer.del!==Zr.prototype.del?this.#r(e):e;Ur(this.tokenizer,n);try{return this.#t(e,n,t)}finally{Wr(this.tokenizer)}}#t(e,t,n){let r=!1,i=``,a=1/0;for(;e;){if(e.length<a)a=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}r||(i=``),r=!1;let o;if(this.options.extensions?.inline?.some(t=>(o=t.call({lexer:this},e,n))?(e=e.substring(o.raw.length),n.push(o),!0):!1))continue;if((o=this.tokenizer.escape(e))||(o=this.tokenizer.tag(e))||(o=this.tokenizer.link(e))){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(o.raw.length);let t=n.at(-1);o.type===`text`&&t?.type===`text`?(t.raw+=o.raw,t.text+=o.text):n.push(o);continue}if((o=this.tokenizer.emStrong(e,t,i))||(o=this.tokenizer.codespan(e))||(o=this.tokenizer.br(e))||(o=this.tokenizer.del(e,t,i))||(o=this.tokenizer.autolink(e))||!this.state.inLink&&(o=this.tokenizer.url(e))){e=e.substring(o.raw.length),n.push(o);continue}let s=e;if(this.options.extensions?.startInline){let t=1/0,n=e.slice(1),r;this.options.extensions.startInline.forEach(e=>{r=e.call({lexer:this},n),typeof r==`number`&&r>=0&&(t=Math.min(t,r))}),t<1/0&&t>=0&&(s=e.substring(0,t+1))}if(o=this.tokenizer.inlineText(s)){e=e.substring(o.raw.length),o.raw.slice(-1)!==`_`&&(i=o.raw.slice(-1)),r=!0;let t=n.at(-1);t?.type===`text`?(t.raw+=o.raw,t.text+=o.text):n.push(o)}else if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return n}#n(e){let{blockSkip:t,tag:n,autolink:r}=this.tokenizer.rules.inline,i=``,a=0,o;for(t.lastIndex=0;o=t.exec(e);){let s=o.index+(o[2]?o[2].length:0),c=o.index+o[0].length;if(e.charAt(s)===`<`){let i=e.slice(s),a=n.exec(i)||r.exec(i);if(!a){t.lastIndex=s+1;continue}c=s+a[0].length,t.lastIndex=c}i+=e.slice(a,s)+`[`+`a`.repeat(c-s-2)+`]`,a=c}return i+e.slice(a)}#r(e){let t=e;if(this.tokens.links&&e.includes(`[`)){let e=this.tokenizer.rules.inline.reflinkSearch,n=t=>{let r=t.lastIndexOf(`[`);if(!Object.hasOwn(this.tokens.links,zr(t.slice(r+1,-1))))return t;if(r>1&&t.charAt(0)!==`!`){let i=t.slice(1,r-1);if(this.linkInText(i))return`[`+i.replace(e,n)+`][`+`a`.repeat(t.length-r-2)+`]`}return`[`+`a`.repeat(t.length-2)+`]`};t=t.replace(e,n)}return t=t.replace(this.tokenizer.rules.inline.anyPunctuationOutsideCode,(e,t,n)=>n?`+`.repeat(e.length):t?t+e.slice(t.length,-t.length).replace(/`/g,`+`)+t:e),t=this.#n(t),t=this.options.hooks?.emStrongMask?.call({lexer:this},t)??t,t}infiniteLoopError(e){let t=`Infinite loop on byte: `+e;if(this.options.silent)console.error(t);else throw Error(t)}},$r=class{options;parser;constructor(e){this.options=e||ln}space(e){return``}code({text:e,lang:t,escaped:n}){let r=(t||``).match(mn.notSpaceStart)?.[0],i=e?e.replace(mn.endingNewline,``)+`
`:``;return r?`<pre><code class="language-`+Nr(r)+`">`+(n?i:Nr(i,!0))+`</code></pre>
`:`<pre><code>`+(n?i:Nr(i,!0))+`</code></pre>
`}blockquote({tokens:e}){return`<blockquote>
${this.parser.parse(e)}</blockquote>
`}html({text:e}){return e}def(e){return``}heading({tokens:e,depth:t}){return`<h${t}>${this.parser.parseInline(e)}</h${t}>
`}hr(e){return`<hr>
`}list(e){let t=e.ordered,n=e.start,r=``;for(let t=0;t<e.items.length;t++){let n=e.items[t];r+=this.listitem(n)}let i=t?`ol`:`ul`,a=t&&n!==1?` start="`+n+`"`:``;return`<`+i+a+`>
`+r+`</`+i+`>
`}listitem(e){return`<li>${this.parser.parse(e.tokens)}</li>
`}checkbox({checked:e}){return`<input `+(e?`checked="" `:``)+`disabled="" type="checkbox"> `}paragraph({tokens:e}){return`<p>${this.parser.parseInline(e)}</p>
`}table(e){let t=``,n=``;for(let t=0;t<e.header.length;t++)n+=this.tablecell(e.header[t]);t+=this.tablerow({text:n});let r=``;for(let t=0;t<e.rows.length;t++){let i=e.rows[t];n=``;for(let e=0;e<i.length;e++)n+=this.tablecell(i[e]);r+=this.tablerow({text:n})}return r&&=`<tbody>${r}</tbody>`,`<table>
<thead>
`+t+`</thead>
`+r+`</table>
`}tablerow({text:e}){return`<tr>
${e}</tr>
`}tablecell(e){let t=this.parser.parseInline(e.tokens),n=e.header?`th`:`td`;return(e.align?`<${n} align="${e.align}">`:`<${n}>`)+t+`</${n}>
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Nr(e,!0)}</code>`}br(e){return`<br>`}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,text:n,tokens:r,autolink:i}){let a=i?Nr(n,!0):this.parser.parseInline(r),o=Fr(e);if(o===null)return a;e=Nr(o,i);let s=`<a href="`+e+`"`;return t&&(s+=` title="`+Nr(t)+`"`),s+=`>`+a+`</a>`,s}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let i=Fr(e);if(i===null)return Nr(n);e=i;let a=`<img src="${Nr(e)}" alt="${Nr(n)}"`;return t&&(a+=` title="${Nr(t)}"`),a+=`>`,a}text(e){return`tokens`in e&&e.tokens?this.parser.parseInline(e.tokens):`escaped`in e&&e.escaped?e.text:Nr(e.text)}},ei=class{parser;strong({text:e,tokens:t}){return t?this.parser.parseInline(t,this):e}em({text:e,tokens:t}){return t?this.parser.parseInline(t,this):e}codespan({text:e}){return e}del({text:e,tokens:t}){return t?this.parser.parseInline(t,this):e}html({text:e}){return e}text({text:e}){return e}link({text:e,tokens:t}){return t?this.parser.parseInline(t,this):e}image({text:e,tokens:t}){return t?this.parser.parseInline(t,this):e}br(){return`
`}checkbox({raw:e}){return e}},ti=class e{options;renderer;textRenderer;constructor(e){this.options=e||ln,this.options.renderer=this.options.renderer||new $r,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new ei,this.textRenderer.parser=this}static parse(t,n){return new e(n).parse(t)}static parseInline(t,n){return new e(n).parseInline(t)}parse(e){this.renderer.parser=this;let t=``;for(let n=0;n<e.length;n++){let r=e[n];if(this.options.extensions?.renderers?.[r.type]){let e=r,n=this.options.extensions.renderers[e.type].call({parser:this},e);if(n!==!1||![`space`,`hr`,`heading`,`code`,`table`,`blockquote`,`list`,`checkbox`,`html`,`def`,`paragraph`,`text`].includes(e.type)){t+=n===!1?``:n??``;continue}}let i=r;switch(i.type){case`space`:t+=this.renderer.space(i);break;case`hr`:t+=this.renderer.hr(i);break;case`heading`:t+=this.renderer.heading(i);break;case`code`:t+=this.renderer.code(i);break;case`table`:t+=this.renderer.table(i);break;case`blockquote`:t+=this.renderer.blockquote(i);break;case`list`:t+=this.renderer.list(i);break;case`checkbox`:t+=this.renderer.checkbox(i);break;case`html`:t+=this.renderer.html(i);break;case`def`:t+=this.renderer.def(i);break;case`paragraph`:t+=this.renderer.paragraph(i);break;case`text`:t+=this.renderer.text(i);break;default:{let e=`Token with "`+i.type+`" type was not found.`;if(this.options.silent)return console.error(e),``;throw Error(e)}}}return t}parseInline(e,t=this.renderer){this.renderer.parser=this;let n=``;for(let r=0;r<e.length;r++){let i=e[r];if(this.options.extensions?.renderers?.[i.type]){let e=this.options.extensions.renderers[i.type].call({parser:this},i);if(e!==!1||![`escape`,`html`,`link`,`image`,`checkbox`,`strong`,`em`,`codespan`,`br`,`del`,`text`].includes(i.type)){n+=e===!1?``:e??``;continue}}let a=i;switch(a.type){case`escape`:n+=t.text(a);break;case`html`:n+=t.html(a);break;case`link`:n+=t.link(a);break;case`image`:n+=t.image(a);break;case`checkbox`:n+=t.checkbox(a);break;case`strong`:n+=t.strong(a);break;case`em`:n+=t.em(a);break;case`codespan`:n+=t.codespan(a);break;case`br`:n+=t.br(a);break;case`del`:n+=t.del(a);break;case`text`:n+=t.text(a);break;default:{let e=`Token with "`+a.type+`" type was not found.`;if(this.options.silent)return console.error(e),``;throw Error(e)}}}return n}},ni=class{options;block;constructor(e){this.options=e||ln}static passThroughHooks=new Set([`preprocess`,`postprocess`,`processAllTokens`,`emStrongMask`]);static passThroughHooksRespectAsync=new Set([`preprocess`,`postprocess`,`processAllTokens`]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(e=this.block){return e?Qr.lex:Qr.lexInline}provideParser(e=this.block){return e?ti.parse:ti.parseInline}};function ri(e,t){if(Array.isArray(t))for(let n=0;n<t.length;n++)e.push(t[n]);else e.push(t)}var ii=new class{defaults=cn();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=ti;Renderer=$r;TextRenderer=ei;Lexer=Qr;Tokenizer=Zr;Hooks=ni;constructor(...e){this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(ri(n,t.call(this,r)),r.type){case`table`:{let e=r;for(let r of e.header)ri(n,this.walkTokens(r.tokens,t));for(let r of e.rows)for(let e of r)ri(n,this.walkTokens(e.tokens,t));break}case`list`:{let e=r;ri(n,this.walkTokens(e.items,t));break}default:{let e=r;this.defaults.extensions?.childTokens?.[e.type]?this.defaults.extensions.childTokens[e.type].forEach(r=>{let i=e[r].flat(1/0);ri(n,this.walkTokens(i,t))}):e.tokens&&ri(n,this.walkTokens(e.tokens,t))}}return n}use(...e){let t=this.defaults.extensions||{renderers:Object.create(null),childTokens:Object.create(null)};return e.forEach(e=>{let n={...e};if(n.async=this.defaults.async||n.async||!1,e.extensions&&(e.extensions.forEach(e=>{if(!e.name)throw Error(`extension name required`);if(`renderer`in e){let n=t.renderers[e.name];n?t.renderers[e.name]=function(...t){let r=e.renderer.apply(this,t);return r===!1&&(r=n.apply(this,t)),r}:t.renderers[e.name]=e.renderer}if(`tokenizer`in e){if(!e.level||e.level!==`block`&&e.level!==`inline`)throw Error(`extension level must be 'block' or 'inline'`);let n=t[e.level];n?n.unshift(e.tokenizer):t[e.level]=[e.tokenizer],e.start&&(e.level===`block`?t.startBlock?t.startBlock.push(e.start):t.startBlock=[e.start]:e.level===`inline`&&(t.startInline?t.startInline.push(e.start):t.startInline=[e.start]))}`childTokens`in e&&e.childTokens&&(t.childTokens[e.name]=e.childTokens)}),n.extensions=t),e.renderer){let t=this.defaults.renderer||new $r(this.defaults);for(let n in e.renderer){if(!(n in t))throw Error(`renderer '${n}' does not exist`);if([`options`,`parser`].includes(n))continue;let r=n,i=e.renderer[r],a=t[r];t[r]=(...e)=>{let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n===!1?``:n??``}}n.renderer=t}if(e.tokenizer){let t=this.defaults.tokenizer||new Zr(this.defaults);for(let n in e.tokenizer){if(!(n in t))throw Error(`tokenizer '${n}' does not exist`);if([`options`,`rules`,`lexer`].includes(n))continue;let r=n,i=e.tokenizer[r],a=t[r];t[r]=(...e)=>{let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n}}n.tokenizer=t}if(e.hooks){let t=this.defaults.hooks||new ni;for(let n in e.hooks){if(!(n in t))throw Error(`hook '${n}' does not exist`);if([`options`,`block`].includes(n))continue;let r=n,i=e.hooks[r],a=t[r];t[r]=ni.passThroughHooks.has(n)?e=>{if(t.options.async&&ni.passThroughHooksRespectAsync.has(n))return(async()=>{let n=await i.call(t,e);return a.call(t,n)})();let r=i.call(t,e);return a.call(t,r)}:(...e)=>{if(t.options.async)return(async()=>{let n=await i.apply(t,e);return n===!1&&(n=await a.apply(t,e)),n})();let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n}}n.hooks=t}if(e.walkTokens){let t=this.defaults.walkTokens,r=e.walkTokens;n.walkTokens=function(e){let n=[];return ri(n,r.call(this,e)),t&&ri(n,t.call(this,e)),n}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Qr.lex(e,t??this.defaults)}parser(e,t){return ti.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},i={...this.defaults,...r},a=this.onError(!!i.silent,!!i.async);if(this.defaults.async===!0&&r.async===!1)return a(Error(`marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise.`));if(typeof t>`u`||t===null)return a(Error(`marked(): input parameter is undefined or null`));if(typeof t!=`string`)return a(Error(`marked(): input parameter is of type `+Object.prototype.toString.call(t)+`, string expected`));if(i.hooks&&(i.hooks.options=i,i.hooks.block=e),i.async)return(async()=>{let n=i.hooks?await i.hooks.preprocess(t):t,r=await(i.hooks?await i.hooks.provideLexer(e):e?Qr.lex:Qr.lexInline)(n,i),a=i.hooks?await i.hooks.processAllTokens(r):r;i.walkTokens&&await Promise.all(this.walkTokens(a,i.walkTokens));let o=await(i.hooks?await i.hooks.provideParser(e):e?ti.parse:ti.parseInline)(a,i);return i.hooks?await i.hooks.postprocess(o):o})().catch(a);try{i.hooks&&(t=i.hooks.preprocess(t));let n=(i.hooks?i.hooks.provideLexer(e):e?Qr.lex:Qr.lexInline)(t,i);i.hooks&&(n=i.hooks.processAllTokens(n)),i.walkTokens&&this.walkTokens(n,i.walkTokens);let r=(i.hooks?i.hooks.provideParser(e):e?ti.parse:ti.parseInline)(n,i);return i.hooks&&(r=i.hooks.postprocess(r)),r}catch(e){return a(e)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let e=`<p>An error occurred:</p><pre>`+Nr(n.message+``,!0)+`</pre>`;return t?Promise.resolve(e):e}if(t)return Promise.reject(n);throw n}}};function ai(e,t){return ii.parse(e,t)}ai.options=ai.setOptions=function(e){return ii.setOptions(e),ai.defaults=ii.defaults,un(ai.defaults),ai},ai.getDefaults=cn,ai.defaults=ln;function oi(...e){return ii.use(...e),ai.defaults=ii.defaults,un(ai.defaults),ai}ai.use=oi,ai.walkTokens=function(e,t){return ii.walkTokens(e,t)},ai.parseInline=ii.parseInline,ai.Parser=ti,ai.parser=ti.parse,ai.Renderer=$r,ai.TextRenderer=ei,ai.Lexer=Qr,ai.lexer=Qr.lex,ai.Tokenizer=Zr,ai.Hooks=ni,ai.parse=ai,ai.options,ai.setOptions,ai.walkTokens,ai.parseInline,ti.parse,Qr.lex;function si({source:e,className:t}){let n=(0,_.useMemo)(()=>sn.sanitize(ai.parse(e,{async:!1,gfm:!0})),[e]);return(0,D.jsx)(`div`,{className:t,dangerouslySetInnerHTML:{__html:n}})}async function ci(){return E.available?await E.request(`app.info`):{version:`dev`,platform:`web`,logDirectory:``,rounded:!1,debug:!1}}async function li(){return E.available?await E.request(`app.startup`):{supported:!1,enabled:!1}}async function ui(e){return await E.request(`app.setStartup`,{enabled:e})}async function di(e){E.available?await E.request(`system.openUrl`,{url:e}):window.open(e,`_blank`,`noreferrer`)}async function fi(){E.available&&await xi(`update.openLogs`)}async function pi(e){E.available?await xi(`update.openRelease`):e&&window.open(e,`_blank`,`noreferrer`)}async function mi(){return E.available?await E.request(`update.status`)??null:null}async function hi(){return E.available?await E.request(`update.check`):{current:`dev`,latest:`dev`,available:!1}}async function gi(){return E.available?await E.request(`update.download`,void 0,3e4):{ok:!1,error:`The desktop host is not available.`}}async function _i(){await xi(`update.cancel`)}async function vi(){return E.available?await E.request(`update.install`,void 0,3e4):{ok:!1,error:`The desktop host is not available.`}}function yi(e){return E.on(t=>{t.type===`update.progress`&&e(t.data)})}function bi(e){return E.on(t=>{t.type===`update.changelog`&&e(t.data)})}async function xi(e,t,n=3e4){let r=await E.request(e,t,n);if(!r.ok)throw Error(r.error??`The action failed.`)}var z=`-ms-`,Si=`-moz-`,B=`-webkit-`,Ci=`comm`,wi=`rule`,Ti=`decl`,Ei=`@import`,Di=`@namespace`,Oi=`@keyframes`,ki=`@layer`,Ai=Math.abs,ji=String.fromCharCode,Mi=Object.assign;function Ni(e,t){return Li(e,0)^45?(((t<<2^Li(e,0))<<2^Li(e,1))<<2^Li(e,2))<<2^Li(e,3):0}function Pi(e){return e.trim()}function Fi(e,t){return(e=t.exec(e))?e[0]:e}function V(e,t,n){return e.replace(t,n)}function Ii(e,t,n){return e.indexOf(t,n)}function Li(e,t){return e.charCodeAt(t)|0}function Ri(e,t,n){return e.slice(t,n)}function zi(e){return e.length}function Bi(e){return e.length}function Vi(e,t){return t.push(e),e}function Hi(e,t){return e.map(t).join(``)}function Ui(e,t){return e.filter(function(e){return!Fi(e,t)})}var Wi=1,Gi=1,Ki=0,qi=0,H=0,Ji=``;function Yi(e,t,n,r,i,a,o,s){return{value:e,root:t,parent:n,type:r,props:i,children:a,line:Wi,column:Gi,length:o,return:``,siblings:s}}function Xi(e,t){return Mi(Yi(``,null,null,``,null,null,0,e.siblings),e,{length:-e.length},t)}function Zi(e){for(;e.root;)e=Xi(e.root,{children:[e]});Vi(e,e.siblings)}function Qi(){return H}function $i(){return H=qi>0?Li(Ji,--qi):0,Gi--,H===10&&(Gi=1,Wi--),H}function ea(){return H=qi<Ki?Li(Ji,qi++):0,Gi++,H===10&&(Gi=1,Wi++),H}function U(){return Li(Ji,qi)}function W(){return qi}function ta(e,t){return Ri(Ji,e,t)}function na(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function ra(e){return Wi=Gi=1,Ki=zi(Ji=e),qi=0,[]}function ia(e){return Ji=``,e}function aa(e){return Pi(ta(qi-1,ca(e===91?e+2:e===40?e+1:e)))}function oa(e){for(;(H=U())&&H<33;)ea();return na(e)>2||na(H)>3?``:` `}function sa(e,t){for(;--t&&ea()&&!(H<48||H>102||H>57&&H<65||H>70&&H<97););return ta(e,W()+(t<6&&U()==32&&ea()==32))}function ca(e){for(;ea();)switch(H){case e:return qi;case 34:case 39:e!==34&&e!==39&&ca(H);break;case 40:e===41&&ca(e);break;case 92:ea()}return qi}function la(e,t){for(;ea()&&e+H!==57&&(e+H!==84||U()!==47););return`/*`+ta(t,qi-1)+`*`+ji(e===47?e:ea())}function ua(e){for(;!na(U());)ea();return ta(e,qi)}function da(e){return ia(fa(``,null,null,null,[``],e=ra(e),0,[0],e))}function fa(e,t,n,r,i,a,o,s,c){for(var l=0,u=0,d=o,f=0,p=0,m=0,h=1,g=1,_=1,v=0,y=``,b=i,x=a,S=r,C=y;g;)switch(m=v,v=ea()){case 40:if(m!=108&&Li(C,d-1)==58){Ii(C+=V(aa(v),`&`,`&\f`),`&\f`,Ai(l?s[l-1]:0))!=-1&&(_=-1);break}case 34:case 39:case 91:C+=aa(v);break;case 9:case 10:case 13:case 32:C+=oa(m);break;case 92:C+=sa(W()-1,7);continue;case 47:switch(U()){case 42:case 47:Vi(ma(la(ea(),W()),t,n,c),c),(na(m||1)==5||na(U()||1)==5)&&zi(C)&&Ri(C,-1,void 0)!==` `&&(C+=` `);break;default:C+=`/`}break;case 123*h:s[l++]=zi(C)*_;case 125*h:case 59:case 0:switch(v){case 0:case 125:g=0;case 59+u:_==-1&&(C=V(C,/\f/g,``)),p>0&&(zi(C)-d||h===0&&m===47)&&Vi(p>32?ha(C+`;`,r,n,d-1,c):ha(V(C,` `,``)+`;`,r,n,d-2,c),c);break;case 59:C+=`;`;default:if(Vi(S=pa(C,t,n,l,u,i,s,y,b=[],x=[],d,a),a),v===123){if(u===0)fa(C,t,S,S,b,a,d,s,x);else{switch(f){case 99:if(Li(C,3)===110)break;case 108:if(Li(C,2)===97)break;default:u=0;case 100:case 109:case 115:}u?fa(e,S,S,r&&Vi(pa(e,S,S,0,0,i,s,y,i,b=[],d,x),x),i,x,d,s,r?b:x):fa(C,S,S,S,[``],x,0,s,x)}}}l=u=p=0,h=_=1,y=C=``,d=o;break;case 58:d=1+zi(C),p=m;default:if(h<1){if(v==123)--h;else if(v==125&&h++==0&&$i()==125)continue}switch(C+=ji(v),v*h){case 38:_=u>0?1:(C+=`\f`,-1);break;case 44:s[l++]=(zi(C)-1)*_,_=1;break;case 64:U()===45&&(C+=aa(ea())),f=U(),u=d=zi(y=C+=ua(W())),v++;break;case 45:m===45&&zi(C)==2&&(h=0)}}return a}function pa(e,t,n,r,i,a,o,s,c,l,u,d){for(var f=i-1,p=i===0?a:[``],m=Bi(p),h=0,g=0,_=0;h<r;++h)for(var v=0,y=Ri(e,f+1,f=Ai(g=o[h])),b=e;v<m;++v)(b=Pi(g>0?p[v]+` `+y:V(y,/&\f/g,p[v])))&&(c[_++]=b);return Yi(e,t,n,i===0?wi:s,c,l,u,d)}function ma(e,t,n,r){return Yi(e,t,n,Ci,ji(Qi()),Ri(e,2,-2),0,r)}function ha(e,t,n,r,i){return Yi(e,t,n,Ti,Ri(e,0,r),Ri(e,r+1,-1),r,i)}function ga(e,t,n){switch(Ni(e,t)){case 5103:return B+`print-`+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return B+e+e;case 4855:return B+e.replace(`add`,`source-over`).replace(`substract`,`source-out`).replace(`intersect`,`source-in`).replace(`exclude`,`xor`)+e;case 4789:return Si+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return B+e+Si+e+z+e+e;case 5936:switch(Li(e,t+11)){case 114:return B+e+z+V(e,/[svh]\w+-[tblr]{2}/,`tb`)+e;case 108:return B+e+z+V(e,/[svh]\w+-[tblr]{2}/,`tb-rl`)+e;case 45:return B+e+z+V(e,/[svh]\w+-[tblr]{2}/,`lr`)+e}case 6828:case 4268:case 2903:return B+e+z+e+e;case 6165:return B+e+z+`flex-`+e+e;case 5187:return B+e+V(e,/(\w+).+(:[^]+)/,B+`box-$1$2`+z+`flex-$1$2`)+e;case 5443:return B+e+z+`flex-item-`+V(e,/flex-|-self/g,``)+(Fi(e,/flex-|baseline/)?``:z+`grid-row-`+V(e,/flex-|-self/g,``))+e;case 4675:return B+e+z+`flex-line-pack`+V(e,/align-content|flex-|-self/g,``)+e;case 5548:return B+e+z+V(e,`shrink`,`negative`)+e;case 5292:return B+e+z+V(e,`basis`,`preferred-size`)+e;case 6060:return B+`box-`+V(e,`-grow`,``)+B+e+z+V(e,`grow`,`positive`)+e;case 4554:return B+V(e,/([^-])(transform)/g,`$1`+B+`$2`)+e;case 6187:return V(V(V(e,/(zoom-|grab)/,B+`$1`),/(image-set)/,B+`$1`),e,``)+e;case 5495:case 3959:return V(e,/(image-set\([^]*)/,B+"$1$`$1");case 4968:return V(V(e,/(.+:)(flex-)?(.*)/,B+`box-pack:$3`+z+`flex-pack:$3`),/space-between/,`justify`)+B+e+e;case 4200:if(!Fi(e,/flex-|baseline/))return z+`grid-column-align`+Ri(e,t)+e;break;case 2592:case 3360:return z+V(e,`template-`,``)+e;case 4384:case 3616:return n&&n.some(function(e,n){return t=n,Fi(e.props,/grid-\w+-end/)})?~Ii(e+(n=n[t].value),`span`,0)?e:z+V(e,`-start`,``)+e+z+`grid-row-span:`+(~Ii(n,`span`,0)?Fi(n,/\d+/):+Fi(n,/\d+/)-Fi(e,/\d+/))+`;`:z+V(e,`-start`,``)+e;case 4896:case 4128:return n&&n.some(function(e){return Fi(e.props,/grid-\w+-start/)})?e:z+V(V(e,`-end`,`-span`),`span `,``)+e;case 4095:case 3583:case 4068:case 2532:return V(e,/(.+)-inline(.+)/,B+`$1$2`)+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(zi(e)-1-t>6)switch(Li(e,t+1)){case 109:if(Li(e,t+4)!==45)break;case 102:return V(e,/(.+:)(.+)-([^]+)/,`$1`+B+`$2-$3$1`+Si+(Li(e,t+3)==108?`$3`:`$2-$3`))+e;case 115:return~Ii(e,`stretch`,0)?ga(V(e,`stretch`,`fill-available`),t,n)+e:e}break;case 5152:case 5920:return V(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(t,n,r,i,a,o,s){return z+n+`:`+r+s+(i?z+n+`-span:`+(a?o:+o-r)+s:``)+e});case 4949:if(Li(e,t+6)===121)return V(e,`:`,`:`+B)+e;break;case 6444:switch(Li(e,Li(e,14)===45?18:11)){case 120:return V(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,`$1`+B+(Li(e,14)===45?`inline-`:``)+`box$3$1`+B+`$2$3$1`+z+`$2box$3`)+e;case 100:return V(e,`:`,`:`+z)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return V(e,`scroll-`,`scroll-snap-`)+e}return e}function _a(e,t){for(var n=``,r=0;r<e.length;r++)n+=t(e[r],r,e,t)||``;return n}function va(e,t,n,r){switch(e.type){case ki:if(e.children.length)break;case Ei:case Di:case Ti:return e.return=e.return||e.value;case Ci:return``;case Oi:return e.return=e.value+`{`+_a(e.children,r)+`}`;case wi:if(!zi(e.value=e.props.join(`,`)))return``}return zi(n=_a(e.children,r))?e.return=e.value+`{`+n+`}`:``}function ya(e){var t=Bi(e);return function(n,r,i,a){for(var o=``,s=0;s<t;s++)o+=e[s](n,r,i,a)||``;return o}}function ba(e){return function(t){t.root||(t=t.return)&&e(t)}}function xa(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case Ti:e.return=ga(e.value,e.length,n);return;case Oi:return _a([Xi(e,{value:V(e.value,`@`,`@`+B)})],r);case wi:if(e.length)return Hi(n=e.props,function(t){switch(Fi(t,r=/(::plac\w+|:read-\w+)/)){case`:read-only`:case`:read-write`:Zi(Xi(e,{props:[V(t,/:(read-\w+)/,`:`+Si+`$1`)]})),Zi(Xi(e,{props:[t]})),Mi(e,{props:Ui(n,r)});break;case`::placeholder`:Zi(Xi(e,{props:[V(t,/:(plac\w+)/,`:`+B+`input-$1`)]})),Zi(Xi(e,{props:[V(t,/:(plac\w+)/,`:`+Si+`$1`)]})),Zi(Xi(e,{props:[V(t,/:(plac\w+)/,z+`input-$1`)]})),Zi(Xi(e,{props:[t]})),Mi(e,{props:Ui(n,r)})}return``})}}function Sa(e,...t){return Error(`An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#${e} for more information.${t.length>0?` Args: ${t.join(`, `)}`:``}`)}var Ca=typeof process<`u`&&({}.REACT_APP_SC_ATTR||{}.SC_ATTR)||`data-styled`,wa=`active`,Ta=`data-styled-version`,Ea=`6.6.0`,Da=`/*!sc*/
`,Oa=typeof window<`u`&&typeof document<`u`;if(!_.createContext)throw Sa(19);function ka(e){if(typeof process<`u`){let t={}[e];if(t!==void 0&&t!==``)return t!==`false`}}var Aa=!!(typeof SC_DISABLE_SPEEDY==`boolean`?SC_DISABLE_SPEEDY:ka(`REACT_APP_SC_DISABLE_SPEEDY`)??ka(`SC_DISABLE_SPEEDY`)??(typeof process<`u`&&!1)),ja=`sc-keyframes-`,Ma=new Map,Na=new Map,Pa=1,Fa=e=>{if(Ma.has(e))return Ma.get(e);for(;Na.has(Pa);)Pa++;let t=Pa++;return Ma.set(e,t),Na.set(t,e),t},Ia=e=>Na.get(e),La=(e,t)=>{Pa=t+1,Ma.set(e,t),Na.set(t,e)},Ra=Object.freeze([]),za=Object.freeze({});function Ba(e,t,n=za){return e.theme!==n.theme&&e.theme||t||n.theme}var Va=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Ha=/(^-|-$)/g;function Ua(e){return e.replace(Va,`-`).replace(Ha,``)}var Wa=/(a)(d)/gi,Ga=e=>String.fromCharCode(e+(e>25?39:97));function Ka(e){let t,n=``;for(t=Math.abs(e);t>52;t=t/52|0)n=Ga(t%52)+n;return(Ga(t%52)+n).replace(Wa,`$1-$2`)}var qa=5381,Ja=(e,t)=>{let n=t.length;for(;n;)e=33*e^t.charCodeAt(--n);return e},Ya=e=>Ja(qa,e);function Xa(e){return Ka(Ya(e)>>>0)}function Za(e){return e.displayName||e.name||`Component`}function Qa(e){return typeof e==`string`&&!0}function $a(e){return Qa(e)?`styled.${e}`:`Styled(${Za(e)})`}var eo=Symbol.for(`react.memo`),to=Symbol.for(`react.forward_ref`),no={contextType:!0,defaultProps:!0,displayName:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,propTypes:!0,type:!0},ro={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},io={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},ao={[to]:{$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},[eo]:io};function oo(e){return(`type`in(t=e)&&t.type.$$typeof)===eo?io:`$$typeof`in e?ao[e.$$typeof]:no;var t}var so=Object.defineProperty,co=Object.getOwnPropertyNames,lo=Object.getOwnPropertySymbols,uo=Object.getOwnPropertyDescriptor,fo=Object.getPrototypeOf,po=Object.prototype;function mo(e,t,n){if(typeof t!=`string`){let r=fo(t);r&&r!==po&&mo(e,r,n);let i=co(t).concat(lo(t)),a=oo(e),o=oo(t);for(let r=0;r<i.length;++r){let s=i[r];if(!(s in ro||n&&n[s]||o&&s in o||a&&s in a)){let n=uo(t,s);try{so(e,s,n)}catch{}}}}return e}function ho(e){return typeof e==`function`}var go=Symbol.for(`react.forward_ref`);function _o(e){return e!=null&&(typeof e==`object`||typeof e==`function`)&&e.$$typeof===go&&`styledComponentId`in e}function vo(e,t){return e&&t?e+` `+t:e||t||``}function yo(e,t){return e.join(t||``)}function bo(e){return typeof e==`object`&&!!e&&e.constructor.name===Object.name&&!(`props`in e&&e.$$typeof)}function xo(e,t,n=!1){if(!n&&!bo(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(let n=0;n<t.length;n++)e[n]=xo(e[n],t[n]);else if(bo(t))for(let n in t)e[n]=xo(e[n],t[n]);return e}function So(e,t){Object.defineProperty(e,"toString",{value:t})}var Co=class{constructor(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e,this._cGroup=0,this._cIndex=0}indexOfGroup(e){if(e===this._cGroup)return this._cIndex;let t=this._cIndex;if(e>this._cGroup)for(let n=this._cGroup;n<e;n++)t+=this.groupSizes[n];else for(let n=this._cGroup-1;n>=e;n--)t-=this.groupSizes[n];return this._cGroup=e,this._cIndex=t,t}insertRules(e,t){if(e>=this.groupSizes.length){let t=this.groupSizes,n=t.length,r=n;for(;e>=r;)if(r<<=1,r<0)throw Sa(16,`${e}`);this.groupSizes=new Uint32Array(r),this.groupSizes.set(t),this.length=r;for(let e=n;e<r;e++)this.groupSizes[e]=0}let n=this.indexOfGroup(e+1),r=0;for(let i=0,a=t.length;i<a;i++)this.tag.insertRule(n,t[i])&&(this.groupSizes[e]++,n++,r++);r>0&&this._cGroup>e&&(this._cIndex+=r)}clearGroup(e){if(e<this.length){let t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(let e=n;e<r;e++)this.tag.deleteRule(n);t>0&&this._cGroup>e&&(this._cIndex-=t)}}getGroup(e){let t=``;if(e>=this.length||this.groupSizes[e]===0)return t;let n=this.groupSizes[e],r=this.indexOfGroup(e),i=r+n;for(let e=r;e<i;e++)t+=this.tag.getRule(e)+Da;return t}},wo=`style[${Ca}][${Ta}="${Ea}"]`,To=RegExp(`^${Ca}\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)`),Eo=e=>typeof ShadowRoot<`u`&&e instanceof ShadowRoot||`host`in e&&e.nodeType===11,Do=e=>{if(!e)return document;if(Eo(e))return e;if(`getRootNode`in e){let t=e.getRootNode();if(Eo(t))return t}return document},Oo=(e,t,n)=>{let r=n.split(`,`),i;for(let n=0,a=r.length;n<a;n++)(i=r[n])&&e.registerName(t,i)},ko=(e,t)=>{let n=(t.textContent??``).split(Da),r=[];for(let t=0,i=n.length;t<i;t++){let i=n[t].trim();if(!i)continue;let a=i.match(To);if(a){let t=0|parseInt(a[1],10),n=a[2];t!==0&&(La(n,t),Oo(e,n,a[3]),e.getTag().insertRules(t,r)),r.length=0}else r.push(i)}},Ao=e=>{let t=Do(e.options.target).querySelectorAll(wo);for(let n=0,r=t.length;n<r;n++){let r=t[n];r&&r.getAttribute(Ca)!==wa&&(ko(e,r),r.parentNode&&r.parentNode.removeChild(r))}},jo=!1;function Mo(){if(!1!==jo)return jo;if(typeof document<`u`){let e=document.head.querySelector(`meta[property="csp-nonce"]`);if(e)return jo=e.nonce||e.getAttribute(`content`)||void 0;let t=document.head.querySelector(`meta[name="sc-nonce"]`);if(t)return jo=t.getAttribute(`content`)||void 0}return jo=typeof __webpack_nonce__<`u`?__webpack_nonce__:void 0}var No=(e,t)=>{if(typeof document>`u`)throw Sa(20);let n=document.head,r=e||n,i=document.createElement(`style`),a=(e=>{let t=Array.from(e.querySelectorAll(`style[${Ca}]`));return t[t.length-1]})(r),o=a===void 0?null:a.nextSibling;i.setAttribute(Ca,wa),i.setAttribute(Ta,Ea);let s=t||Mo();return s&&i.setAttribute(`nonce`,s),r.insertBefore(i,o),i},Po=class{constructor(e,t){this.element=No(e,t),this.element.appendChild(document.createTextNode(``)),this.sheet=(e=>{if(e.sheet)return e.sheet;let t=e.getRootNode().styleSheets??document.styleSheets;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(r.ownerNode===e)return r}throw Sa(17)})(this.element),this.length=0}insertRule(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch{return!1}}deleteRule(e){this.sheet.deleteRule(e),this.length--}getRule(e){let t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:``}},Fo=class{constructor(e,t){this.element=No(e,t),this.nodes=this.element.childNodes,this.length=0}insertRule(e,t){if(e<=this.length&&e>=0){let n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1}deleteRule(e){this.element.removeChild(this.nodes[e]),this.length--}getRule(e){return e<this.length?this.nodes[e].textContent:``}},Io=Oa,Lo={isServer:!Oa,useCSSOMInjection:!Aa},Ro=class e{static registerId(e){return Fa(e)}constructor(e=za,t={},n){this.options=Object.assign(Object.assign({},Lo),e),this.gs=t,this.keyframeIds=new Set,this.names=new Map(n),this.server=!!e.isServer,!this.server&&Oa&&Io&&(Io=!1,Ao(this)),So(this,()=>(e=>{let t=e.getTag(),{length:n}=t,r=``;for(let i=0;i<n;i++){let n=Ia(i);if(n===void 0)continue;let a=e.names.get(n);if(a===void 0||!a.size)continue;let o=t.getGroup(i);if(o.length===0)continue;let s=Ca+`.g`+i+`[id="`+n+`"]`,c=``;for(let e of a)e.length>0&&(c+=e+`,`);r+=o+s+`{content:"`+c+`"}/*!sc*/
`}return r})(this))}rehydrate(){!this.server&&Oa&&Ao(this)}reconstructWithOptions(t,n=!0){let r=new e(Object.assign(Object.assign({},this.options),t),this.gs,n&&this.names||void 0);return r.keyframeIds=new Set(this.keyframeIds),!this.server&&Oa&&t.target!==this.options.target&&Do(this.options.target)!==Do(t.target)&&Ao(r),r}allocateGSInstance(e){return this.gs[e]=(this.gs[e]||0)+1}getTag(){return this.tag||=(e=(({useCSSOMInjection:e,target:t,nonce:n})=>e?new Po(t,n):new Fo(t,n))(this.options),new Co(e));var e}hasNameForId(e,t){var n;return(n=this.names.get(e)?.has(t))!=null&&n}registerName(e,t){Fa(e),e.startsWith(ja)&&this.keyframeIds.add(e);let n=this.names.get(e);n?n.add(t):this.names.set(e,new Set([t]))}insertRules(e,t,n){this.registerName(e,t),this.getTag().insertRules(Fa(e),n)}clearNames(e){this.names.has(e)&&this.names.get(e).clear()}clearRules(e){this.getTag().clearGroup(Fa(e)),this.clearNames(e)}clearTag(){this.tag=void 0}},G=new WeakSet,zo={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexShrink:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function Bo(e,t){return t==null||typeof t==`boolean`||t===``?``:typeof t!=`number`||t===0||e in zo||e.startsWith(`--`)?String(t).trim():t+`px`}var Vo=47;function Ho(e){if(e.charCodeAt(0)===45&&e.charCodeAt(1)===45)return e;let t=``;for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);t+=r>=65&&r<=90?`-`+String.fromCharCode(r+32):e[n]}return t.startsWith(`ms-`)?`-`+t:t}var Uo=Symbol.for(`sc-keyframes`);function Wo(e){return typeof e==`object`&&!!e&&Uo in e}function Go(e){return ho(e)&&!(e.prototype&&e.prototype.isReactComponent)}var Ko=e=>e==null||!1===e||e===``,qo=Symbol.for(`react.client.reference`);function Jo(e){return e.$$typeof===qo}function Yo(e,t){for(let n in e){let r=e[n];e.hasOwnProperty(n)&&!Ko(r)&&(Array.isArray(r)&&G.has(r)||ho(r)?t.push(Ho(n)+`:`,r,`;`):bo(r)?(t.push(n+` {`),Yo(r,t),t.push(`}`)):t.push(Ho(n)+`: `+Bo(n,r)+`;`))}}function Xo(e,t,n,r,i=[]){if(Ko(e))return i;let a=typeof e;if(a===`string`)return i.push(e),i;if(a===`function`)return Jo(e)?i:Go(e)&&t?Xo(e(t),t,n,r,i):(i.push(e),i);if(Array.isArray(e)){for(let a=0;a<e.length;a++)Xo(e[a],t,n,r,i);return i}return _o(e)?(i.push(`.${e.styledComponentId}`),i):Wo(e)?(n?(e.inject(n,r),i.push(e.getName(r))):i.push(e),i):Jo(e)?i:bo(e)&&e.toString===Object.prototype.toString?(Yo(e,i),i):(i.push(e.toString()),i)}var Zo=Ya(Ea),Qo=class{constructor(e,t,n){this.rules=e,this.componentId=t,this.baseHash=Ja(Zo,t),this.baseStyle=n,Ro.registerId(t)}generateAndInjectStyles(e,t,n){let r=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n):``;{let i=``;for(let r=0;r<this.rules.length;r++){let a=this.rules[r];if(typeof a==`string`)i+=a;else if(a){if(Go(a)){let r=a(e);typeof r==`string`?i+=r:r!=null&&!1!==r&&(i+=yo(Xo(r,e,t,n)))}else i+=yo(Xo(a,e,t,n))}}if(i){this.dynamicNameCache||=new Map;let e=n.hash?n.hash+i:i,a=this.dynamicNameCache.get(e);if(!a){if(a=Ka(Ja(Ja(this.baseHash,n.hash),i)>>>0),this.dynamicNameCache.size>=200){let e=this.dynamicNameCache.keys().next().value;e!==void 0&&this.dynamicNameCache.delete(e)}this.dynamicNameCache.set(e,a)}if(!t.hasNameForId(this.componentId,a)){let e=n(i,`.`+a,void 0,this.componentId);t.insertRules(this.componentId,a,e)}r=vo(r,a)}}return r}},$o=/&/g;function es(e,t){let n=0;for(;--t>=0&&e.charCodeAt(t)===92;)n++;return!(1&~n)}function ts(e){let t=e.length,n=``,r=0,i=0,a=0,o=!1,s=!1;for(let c=0;c<t;c++){let l=e.charCodeAt(c);if(a!==0||o||l!==Vo||e.charCodeAt(c+1)!==42){if(o)l===42&&e.charCodeAt(c+1)===Vo&&(o=!1,c++);else if(l!==34&&l!==39||es(e,c)){if(a===0){if(l===123)i++;else if(l===125){if(i--,i<0){s=!0;let n=c+1;for(;n<t;){let t=e.charCodeAt(n);if(t===59||t===10)break;n++}n<t&&e.charCodeAt(n)===59&&n++,i=0,c=n-1,r=n;continue}i===0&&(n+=e.substring(r,c+1),r=c+1)}else l===59&&i===0&&(n+=e.substring(r,c+1),r=c+1)}}else a===0?a=l:a===l&&(a=0)}else o=!0,c++}return s||i!==0||a!==0?(r<t&&i===0&&a===0&&(n+=e.substring(r)),n):e}function ns(e,t){let n=t+` `,r=`,`+n;for(let i=0;i<e.length;i++){let a=e[i];if(a.type===`rule`){a.value=(n+a.value).replaceAll(`,`,r);let e=a.props,t=[];for(let r=0;r<e.length;r++)t[r]=n+e[r];a.props=t}Array.isArray(a.children)&&a.type!==`@keyframes`&&ns(a.children,t)}return e}function rs({options:e=za,plugins:t=Ra}=za){let n,r,i,a=(e,t,i)=>i.startsWith(r)&&i.endsWith(r)&&i.replaceAll(r,``).length>0?`.${n}`:e,o=t.slice();o.push(e=>{e.type===`rule`&&e.value.includes(`&`)&&(i||=RegExp(`\\${r}\\b`,`g`),e.props[0]=e.props[0].replace($o,r).replace(i,a))}),e.prefix&&o.push(xa),o.push(va);let s=[],c=ya(o.concat(ba(e=>s.push(e)))),l=(t,a=``,o=``,l=`&`)=>{n=l,r=a,i=void 0;let u=function(e){let t=e.indexOf(`//`)!==-1,n=e.indexOf(`}`)!==-1;if(!t&&!n)return e;if(!t)return ts(e);let r=e.length,i=``,a=0,o=0,s=0,c=0,l=0,u=!1;for(;o<r;){let t=e.charCodeAt(o);if(t!==34&&t!==39||es(e,o)){if(s===0){if(t===Vo&&o+1<r&&e.charCodeAt(o+1)===42){for(o+=2;o+1<r&&(e.charCodeAt(o)!==42||e.charCodeAt(o+1)!==Vo);)o++;o+=2}else if(t!==40){if(t!==41){if(c>0)o++;else if(t===42&&o+1<r&&e.charCodeAt(o+1)===Vo)i+=e.substring(a,o),o+=2,a=o,u=!0;else if(t===Vo&&o+1<r&&e.charCodeAt(o+1)===Vo){for(i+=e.substring(a,o);o<r&&e.charCodeAt(o)!==10;)o++;a=o,u=!0}else t===123?l++:t===125&&l--,o++}else c>0&&c--,o++}else c++,o++}else o++}else s===0?s=t:s===t&&(s=0),o++}return u?(a<r&&(i+=e.substring(a)),l===0?i:ts(i)):l===0?e:ts(e)}(t),d=da(o||a?o+` `+a+` { `+u+` }`:u);return e.namespace&&(d=ns(d,e.namespace)),s=[],_a(d,c),s},u=e,d=qa;for(let e=0;e<t.length;e++)t[e].name||Sa(15),d=Ja(d,t[e].name);return u!=null&&u.namespace&&(d=Ja(d,u.namespace)),u!=null&&u.prefix&&(d=Ja(d,`p`)),l.hash=d===qa?``:d.toString(),l}var is=new Ro,as=rs(),os=_.createContext({shouldForwardProp:void 0,styleSheet:is,stylis:as,stylisPlugins:void 0});os.Consumer;function ss(){return _.useContext(os)}var cs=_.createContext(void 0);cs.Consumer;var ls={};function us(e,t){let n=typeof e==`string`?Ua(e):`sc`;ls[n]=(ls[n]||0)+1;let r=n+`-`+Xa(Ea+n+ls[n]);return t?t+`-`+r:r}function ds(e,t,n){let r=_o(e),i=e,a=!Qa(e),{attrs:o=Ra,componentId:s=us(t.displayName,t.parentComponentId),displayName:c=$a(e)}=t,l=t.displayName&&t.componentId?Ua(t.displayName)+`-`+t.componentId:t.componentId||s,u=r&&i.attrs?i.attrs.concat(o).filter(Boolean):o,{shouldForwardProp:d}=t;if(r&&i.shouldForwardProp){let e=i.shouldForwardProp;if(t.shouldForwardProp){let n=t.shouldForwardProp;d=(t,r)=>e(t,r)&&n(t,r)}else d=e}let f=new Qo(n,l,r?i.componentStyle:void 0);function p(e,t){return function(e,t,n){let{attrs:r,componentStyle:i,defaultProps:a,foldedComponentIds:o,styledComponentId:s,target:c}=e,l=_.useContext(cs),u=ss(),d=e.shouldForwardProp||u.shouldForwardProp,f=Ba(t,l,a)||za,[p,m]=function(e,t,n){let r=Object.assign(Object.assign({},t),{className:void 0,theme:n}),i=null,a=e.length>1;for(let t=0;t<e.length;t++){let n=e[t],o=ho(n)?n(a?Object.assign({},r):r):n;for(let e in o)e===`className`?r.className=vo(r.className,o[e]):e===`style`?r.style=Object.assign(Object.assign({},r.style),o[e]):o[e]===void 0?e in r&&(r[e]!==void 0&&(i||=[]).push(e),r[e]=void 0):r[e]=o[e]}return`className`in t&&typeof t.className==`string`&&(r.className=vo(r.className,t.className)),[r,i]}(r,t,f),h=i.generateAndInjectStyles(p,u.styleSheet,u.stylis),g=p.as||c,v=Qa(g),y=function(e,t,n,r,i,a){let o={};for(let s in e)s[0]===`$`||s===`as`||s===`theme`&&e.theme===n||(s===`forwardedAs`?e.forwardedAs!==void 0&&(o.as=e.forwardedAs):e[s]===void 0?s===`className`||i||a!==null&&a.indexOf(s)!==-1||r&&!r(s,t)||(o[s]=void 0):r&&!r(s,t)||(o[s]=e[s]));return o}(p,g,f,d,v,m),b=vo(o,s);return h&&(b+=` `+h),p.className&&(b+=` `+p.className),y[v&&g.includes(`-`)?`class`:`className`]=b,n&&(y.ref=n),(0,_.createElement)(g,y)}(m,e,t)}p.displayName=c;let m=_.forwardRef(p);return m.attrs=u,m.componentStyle=f,m.displayName=c,m.shouldForwardProp=d,m.foldedComponentIds=r?vo(i.foldedComponentIds,i.styledComponentId):``,m.styledComponentId=l,m.target=r?i.target:e,Object.defineProperty(m,"defaultProps",{get(){return this._foldedDefaultProps},set(e){this._foldedDefaultProps=r?function(e,...t){for(let n of t)xo(e,n,!0);return e}({},i.defaultProps,e):e}}),So(m,()=>`.${m.styledComponentId}`),a&&mo(m,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),m}var fs=new Set(`a.abbr.address.area.article.aside.audio.b.bdi.bdo.blockquote.body.button.br.canvas.caption.cite.code.col.colgroup.data.datalist.dd.del.details.dfn.dialog.div.dl.dt.em.embed.fieldset.figcaption.figure.footer.form.h1.h2.h3.h4.h5.h6.header.hgroup.hr.html.i.iframe.img.input.ins.kbd.label.legend.li.main.map.mark.menu.meter.nav.object.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.slot.small.span.strong.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.u.ul.var.video.wbr.circle.clipPath.defs.ellipse.feBlend.feColorMatrix.feComponentTransfer.feComposite.feConvolveMatrix.feDiffuseLighting.feDisplacementMap.feDistantLight.feDropShadow.feFlood.feFuncA.feFuncB.feFuncG.feFuncR.feGaussianBlur.feImage.feMerge.feMergeNode.feMorphology.feOffset.fePointLight.feSpecularLighting.feSpotLight.feTile.feTurbulence.filter.foreignObject.g.image.line.linearGradient.marker.mask.path.pattern.polygon.polyline.radialGradient.rect.stop.svg.switch.symbol.text.textPath.tspan.use`.split(`.`));function ps(e,t){let n=[e[0]];for(let r=0,i=t.length;r<i;r+=1)n.push(t[r],e[r+1]);return n}var ms=e=>(G.add(e),e);function hs(e,...t){if(ho(e)||bo(e))return ms(Xo(ps(Ra,[e,...t])));let n=e;return t.length===0&&n.length===1&&typeof n[0]==`string`?Xo(n):ms(Xo(ps(n,t)))}function gs(e,t,n=za){if(!t)throw Sa(1,t);let r=(r,...i)=>e(t,n,hs(r,...i));return r.attrs=r=>gs(e,t,Object.assign(Object.assign({},n),{attrs:Array.prototype.concat(n.attrs,r).filter(Boolean)})),r.withConfig=r=>gs(e,t,Object.assign(Object.assign({},n),r)),r}var _s=e=>gs(ds,e),K=_s;fs.forEach(e=>{K[e]=_s(e)});var vs,ys=class{constructor(e,t){this[vs]=!0,this.inject=(e,t=as)=>{let n=this.getName(t);if(!e.hasNameForId(this.id,n)){let r=t(this.rules,n,`@keyframes`);e.insertRules(this.id,n,r)}},this.name=e,this.id=ja+e,this.rules=t,Fa(this.id),So(this,()=>{throw Sa(12,String(this.name))})}getName(e=as){return e.hash?this.name+Ka(e.hash>>>0):this.name}};function bs(e,...t){let n=yo(hs(e,...t));return new ys(Xa(n),n)}vs=Uo,`${Ca}`,`${Ca}`,`${Ca}`;function xs(e){return e===`light`||e===`dark`?e:`system`}async function Ss(){return await Oe()}async function Cs(e){return await ke(e)}async function ws(){return await Ae()}async function Ts(){return E.available?await E.request(`whitelist.people`):[]}async function Es(e,t){if(!E.available)return[];let n=await Ss(),r=n.whitelist.filter(t=>t!==e);return t&&r.push(e),(await Cs({...n,whitelist:r})).whitelist}var Ds=`https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/releases/latest`,Os=e=>({width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:1.8,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":!0});function ks({size:e=18}){return(0,D.jsxs)(`svg`,{...Os(e),children:[(0,D.jsx)(`path`,{d:`M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z`}),(0,D.jsx)(`path`,{d:`M14 3v5h5M8.5 13h7M8.5 17h4`})]})}function As({size:e=18}){return(0,D.jsxs)(`svg`,{...Os(e),children:[(0,D.jsx)(`path`,{d:`M4 7h16M4 17h16`}),(0,D.jsx)(`circle`,{cx:`9`,cy:`7`,r:`2`}),(0,D.jsx)(`circle`,{cx:`15`,cy:`17`,r:`2`})]})}function js({size:e=16}){return(0,D.jsxs)(`svg`,{...Os(e),children:[(0,D.jsx)(`circle`,{cx:`11`,cy:`11`,r:`6.5`}),(0,D.jsx)(`path`,{d:`m16 16 4.5 4.5`})]})}function Ms({size:e=16}){return(0,D.jsx)(`svg`,{...Os(e),children:(0,D.jsx)(`path`,{d:`M6 6l12 12M18 6 6 18`})})}function Ns({size:e=16}){return(0,D.jsx)(`svg`,{...Os(e),children:(0,D.jsx)(`path`,{d:`M4 7h16M9 7V5h6v2M6.5 7l1 13h9l1-13M10 11v5M14 11v5`})})}function Ps({size:e=16}){return(0,D.jsx)(`svg`,{...Os(e),children:(0,D.jsx)(`path`,{d:`M3 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z`})})}function Fs({size:e=16}){return(0,D.jsx)(`svg`,{...Os(e),children:(0,D.jsx)(`path`,{d:`M12 5v14M6 13l6 6 6-6`})})}function Is({size:e=18}){return(0,D.jsxs)(`svg`,{...Os(e),children:[(0,D.jsx)(`circle`,{cx:`9`,cy:`8`,r:`3.2`}),(0,D.jsx)(`path`,{d:`M3 19c0-3.3 2.7-5.6 6-5.6s6 2.3 6 5.6`}),(0,D.jsx)(`path`,{d:`M15.8 5.2a3.2 3.2 0 0 1 0 5.9M17.4 13.8c2.1.6 3.6 2.3 3.6 4.4`})]})}function Ls({size:e=16}){return(0,D.jsxs)(`svg`,{...Os(e),children:[(0,D.jsx)(`path`,{d:`M12 3v11M8 10l4 4 4-4`}),(0,D.jsx)(`path`,{d:`M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2`})]})}function Rs({size:e=18}){return(0,D.jsxs)(`svg`,{...Os(e),children:[(0,D.jsx)(`circle`,{cx:`12`,cy:`8`,r:`3.6`}),(0,D.jsx)(`path`,{d:`M4.5 20c0-3.9 3.4-6.6 7.5-6.6s7.5 2.7 7.5 6.6`})]})}function zs({size:e=18}){return(0,D.jsxs)(`svg`,{...Os(e),children:[(0,D.jsx)(`path`,{d:`M12 3l7 2.8v5.4c0 4.3-2.9 7.6-7 9.8-4.1-2.2-7-5.5-7-9.8V5.8z`}),(0,D.jsx)(`path`,{d:`m9.2 12.1 2 2 3.6-3.8`})]})}function Bs({size:e=18}){return(0,D.jsxs)(`svg`,{...Os(e),children:[(0,D.jsx)(`circle`,{cx:`8`,cy:`8`,r:`3.4`}),(0,D.jsx)(`path`,{d:`m10.6 10.6 8 8M15.5 15.5l2-2M18 18l2-2`})]})}function Vs({size:e=16}){return(0,D.jsxs)(`svg`,{...Os(e),children:[(0,D.jsx)(`path`,{d:`M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6z`}),(0,D.jsx)(`circle`,{cx:`12`,cy:`12`,r:`2.6`})]})}function Hs({size:e=16}){return(0,D.jsxs)(`svg`,{...Os(e),children:[(0,D.jsx)(`path`,{d:`M4 4l16 16`}),(0,D.jsx)(`path`,{d:`M9.9 5.2A10.7 10.7 0 0 1 12 5c6.1 0 9.5 7 9.5 7a16 16 0 0 1-3 3.6M6.2 7.3A16.6 16.6 0 0 0 2.5 12s3.4 7 9.5 7a10.4 10.4 0 0 0 4-.8`})]})}function Us({size:e=14}){return(0,D.jsxs)(`svg`,{...Os(e),children:[(0,D.jsx)(`rect`,{x:`5`,y:`10`,width:`14`,height:`10`,rx:`2`}),(0,D.jsx)(`path`,{d:`M8 10V7a4 4 0 0 1 8 0v3`})]})}function Ws({size:e=14}){return(0,D.jsxs)(`svg`,{...Os(e),children:[(0,D.jsx)(`path`,{d:`M14 4h6v6`}),(0,D.jsx)(`path`,{d:`M20 4l-9 9`}),(0,D.jsx)(`path`,{d:`M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6`})]})}function Gs({size:e=18}){return(0,D.jsxs)(`svg`,{...Os(e),children:[(0,D.jsx)(`path`,{d:`M6 9a6 6 0 0 1 12 0c0 4 1.5 5.5 2 6H4c.5-.5 2-2 2-6z`}),(0,D.jsx)(`path`,{d:`M10 19a2 2 0 0 0 4 0`})]})}function Ks({size:e=18}){return(0,D.jsxs)(`svg`,{...Os(e),children:[(0,D.jsx)(`rect`,{x:`4`,y:`8`,width:`16`,height:`11`,rx:`3`}),(0,D.jsx)(`path`,{d:`M12 8V5M9.5 5h5`}),(0,D.jsx)(`circle`,{cx:`9`,cy:`13`,r:`1.2`}),(0,D.jsx)(`circle`,{cx:`15`,cy:`13`,r:`1.2`}),(0,D.jsx)(`path`,{d:`M9.5 16.5h5`})]})}function qs({size:e=18}){return(0,D.jsxs)(`svg`,{...Os(e),children:[(0,D.jsx)(`path`,{d:`M4 6h2m3 0h11M4 12h2m3 0h11M4 18h2m3 0h7`}),(0,D.jsx)(`path`,{d:`m14.5 17.5 1.5 1.5 3-3`})]})}function Js({size:e=12}){return(0,D.jsxs)(`svg`,{...Os(e),children:[(0,D.jsx)(`circle`,{cx:`12`,cy:`12`,r:`9`}),(0,D.jsx)(`path`,{d:`M12 7.5v5.5`}),(0,D.jsx)(`path`,{d:`M12 16.5h.01`})]})}function Ys({size:e=16}){return(0,D.jsxs)(`svg`,{...Os(e),children:[(0,D.jsx)(`path`,{d:`M3 12a9 9 0 0 1 9-9c2.5 0 4.9 1 6.7 2.7L21 8`}),(0,D.jsx)(`path`,{d:`M21 3v5h-5`}),(0,D.jsx)(`path`,{d:`M21 12a9 9 0 0 1-9 9c-2.5 0-4.9-1-6.7-2.7L3 16`}),(0,D.jsx)(`path`,{d:`M8 16H3v5`})]})}var Xs=[{id:`logs`,label:`log_viewer`,icon:ks},{id:`instance`,label:`instance`,icon:Is},{id:`batch`,label:`batch_actions`,icon:qs},{id:`requests`,label:`friend_requests`,icon:Gs},{id:`operations`,label:`operations`,icon:zs},{id:`bots`,label:`bot_list`,icon:Ks},{id:`account`,label:`account`,icon:Rs},{id:`settings`,label:`settings`,icon:As}],Zs={id:`debug`,label:`debug`,icon:Js},Qs=bs`
    0%, 100% {
        box-shadow: 0 0 0 0 rgba(167, 139, 250, 0.45);
    }
    50% {
        box-shadow: 0 0 0 4px rgba(167, 139, 250, 0);
    }
`;function $s({page:e,onNavigate:t,status:n,debug:r}){let i=O(),a=r?[...Xs,Zs]:Xs;return(0,D.jsxs)(ec,{children:[(0,D.jsx)(tc,{children:a.map(({id:n,label:r,icon:a})=>(0,D.jsxs)(nc,{$active:e===n,onClick:()=>t(n),type:`button`,children:[(0,D.jsx)(a,{size:18}),(0,D.jsx)(`span`,{children:i(r)})]},n))}),(0,D.jsxs)(rc,{children:[(0,D.jsx)(ic,{children:i(`vr_chat`)}),(0,D.jsxs)(ac,{$active:n.running,children:[(0,D.jsx)(oc,{$active:n.running}),n.running?i(`running`):i(`not_running`)]})]})]})}var ec=K.aside`
    display: flex;
    flex-direction: column;
    gap: 22px;
    width: 218px;
    flex-shrink: 0;
    padding: 16px 14px 18px;
    background: var(--chrome-bg);
    border-right: 1px solid var(--border-color);
`,tc=K.nav`
    display: flex;
    flex-direction: column;
    gap: 3px;
`,nc=K.button`
    position: relative;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 10px;
    border: 1px solid transparent;
    border-radius: var(--radius-sm);
    background: ${({$active:e})=>e?`rgba(167, 139, 250, 0.12)`:`transparent`};
    color: ${({$active:e})=>e?`var(--text-primary)`:`var(--text-secondary)`};
    font: inherit;
    font-size: 13px;
    text-align: left;
    cursor: pointer;
    transition: background 120ms ease, border-color 120ms ease, color 120ms ease;

    /* A small bar grows beside the active item instead of the row jumping into place. */

    &::before {
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        width: 2px;
        height: 0;
        border-radius: 2px;
        background: var(--accent-primary);
        transform: translateY(-50%);
        transition: height 160ms cubic-bezier(0.22, 1, 0.36, 1);
    }

    ${({$active:e})=>e&&hs`
        &::before {
            height: 55%;
        }
    `}
    svg {
        color: ${({$active:e})=>e?`var(--accent-primary)`:`var(--text-muted)`};
        transition: color 120ms ease, transform 160ms cubic-bezier(0.22, 1, 0.36, 1);
        transform: scale(${({$active:e})=>e?1.08:1});
    }

    &:hover {
        background: var(--bg-card-hover);
        border-color: var(--border-color);
        color: var(--text-primary);

        svg {
            transform: scale(1.08);
        }
    }

    &:active {
        transform: scale(0.99);
    }

    &:focus-visible {
        outline: 2px solid var(--border-color-focus);
        outline-offset: 1px;
    }
`,rc=K.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: auto;
    padding: 12px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`,ic=K.span`
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
`,ac=K.div`
    display: flex;
    align-items: center;
    gap: 7px;
    font-family: var(--font-mono);
    font-size: 12px;
    color: ${({$active:e})=>e?`var(--text-primary)`:`var(--text-muted)`};
`,oc=K.span`
    width: 7px;
    height: 7px;
    flex-shrink: 0;
    border-radius: 50%;
    background: ${({$active:e})=>e?`var(--accent-primary)`:`var(--text-muted)`};
    animation: ${({$active:e})=>e?hs`${Qs} 2s ease-in-out infinite`:`none`};
`;function sc({size:e=20}){return(0,D.jsxs)(`svg`,{"aria-hidden":`true`,height:e,viewBox:`0 0 256 256`,width:e,children:[(0,D.jsx)(`defs`,{children:(0,D.jsxs)(`linearGradient`,{id:`brand-mark`,gradientUnits:`userSpaceOnUse`,x1:`8`,x2:`248`,y1:`8`,y2:`248`,children:[(0,D.jsx)(`stop`,{offset:`0`,stopColor:`#6366f1`}),(0,D.jsx)(`stop`,{offset:`1`,stopColor:`#a855f7`})]})}),(0,D.jsx)(`rect`,{fill:`url(#brand-mark)`,height:`240`,rx:`54`,width:`240`,x:`8`,y:`8`}),(0,D.jsx)(`circle`,{cx:`128`,cy:`98`,fill:`#f8fafc`,r:`40`}),(0,D.jsx)(`path`,{d:`M62 198c0-33.1 29.5-60 66-60s66 26.9 66 60z`,fill:`#f8fafc`}),(0,D.jsx)(`path`,{d:`M56 200 200 56`,stroke:`url(#brand-mark)`,strokeLinecap:`round`,strokeWidth:`18`})]})}function cc(){let e=O(),t=we(),n=Te();return(0,D.jsxs)(lc,{children:[(0,D.jsxs)(uc,{children:[(0,D.jsx)(sc,{size:19}),(0,D.jsx)(`strong`,{children:e(`anti_bot`)})]}),(0,D.jsx)(dc,{...n}),(0,D.jsxs)(fc,{children:[(0,D.jsx)(pc,{onClick:t.minimize,title:e(`minimize`),type:`button`,children:(0,D.jsx)(`svg`,{"aria-hidden":`true`,viewBox:`0 0 10 10`,children:(0,D.jsx)(`path`,{d:`M2 5h6`})})}),(0,D.jsx)(pc,{onClick:t.toggleMaximize,title:t.maximized?e(`restore`):e(`maximize`),type:`button`,children:t.maximized?(0,D.jsxs)(`svg`,{"aria-hidden":`true`,viewBox:`0 0 10 10`,children:[(0,D.jsx)(`rect`,{height:`6`,width:`6`,x:`3`,y:`1`}),(0,D.jsx)(`rect`,{height:`6`,width:`6`,x:`1`,y:`3`})]}):(0,D.jsx)(`svg`,{"aria-hidden":`true`,viewBox:`0 0 10 10`,children:(0,D.jsx)(`rect`,{height:`6`,width:`6`,x:`2`,y:`2`})})}),(0,D.jsx)(mc,{onClick:t.close,title:e(`close`),type:`button`,children:(0,D.jsx)(`svg`,{"aria-hidden":`true`,viewBox:`0 0 10 10`,children:(0,D.jsx)(`path`,{d:`m2 2 6 6M8 2 2 8`})})})]})]})}var lc=K.header`
    display: flex;
    align-items: stretch;
    height: 38px;
    flex-shrink: 0;
    background: var(--chrome-bg);
    border-bottom: 1px solid var(--border-color);
    user-select: none;
    -webkit-user-select: none;
`,uc=K.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 0 16px 0 12px;
    flex-shrink: 0;
    color: var(--text-primary);

    strong {
        font-size: 12.5px;
        font-weight: 600;
        letter-spacing: -0.01em;
    }
`,dc=K.div`
    flex: 1;
    min-width: 24px;
`,fc=K.div`
    display: flex;
    flex-shrink: 0;
`,pc=K.button`
    display: grid;
    place-items: center;
    width: 44px;
    height: 100%;
    border: 0;
    background: transparent;
    color: var(--text-secondary);
    cursor: pointer;
    transition: background 100ms ease, color 100ms ease;

    svg {
        width: 10px;
        height: 10px;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.2;
    }

    &:hover {
        background: rgba(167, 139, 250, 0.14);
        color: var(--text-primary);
    }

    &:focus-visible {
        outline: 2px solid var(--border-color-focus);
        outline-offset: -2px;
    }
`,mc=K(pc)`
    &:hover {
        background: #e81123;
        color: #fff;
    }
`,hc=new Set([`button`,`checkbox`,`color`,`file`,`hidden`,`image`,`radio`,`range`,`reset`,`submit`]);function gc(e){return e?e instanceof HTMLTextAreaElement?!0:e instanceof HTMLInputElement?!hc.has(e.type):e instanceof HTMLElement&&e.isContentEditable:!1}function _c(e){for(let t=e;t;t=t.parentElement)if(gc(t))return t;return null}function vc(e,t){let n=e instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(n,`value`)?.set?.call(e,t)}function yc(e,t){if(e.focus(),e.isContentEditable){document.execCommand(`insertText`,!1,t);return}let n=e,r=n.selectionStart??n.value.length,i=n.selectionEnd??r;vc(n,n.value.slice(0,r)+t+n.value.slice(i)),n.dispatchEvent(new Event(`input`,{bubbles:!0})),n.setSelectionRange(r+t.length,r+t.length)}function bc(){let e=O(),[t,n]=(0,_.useState)(null),[r,i]=(0,_.useState)(new Set),[a,o]=(0,_.useState)(``),s=(0,_.useRef)(0),c=e=>{o(e),window.clearTimeout(s.current),s.current=window.setTimeout(()=>o(``),1800)};(0,_.useEffect)(()=>{t?.userId&&Ss().then(e=>i(new Set(e.whitelist)),()=>{})},[t]),(0,_.useEffect)(()=>{let e=e=>{let t=e.target instanceof Element?e.target:null,r=window.getSelection()?.toString().trim()??``,i=t?.closest(`[data-user-id]`),a=_c(t)??_c(document.activeElement instanceof Element?document.activeElement:null);!r&&!i&&!a?n(null):(e.preventDefault(),n({x:Math.max(8,Math.min(e.clientX,window.innerWidth-240)),y:Math.max(8,Math.min(e.clientY,window.innerHeight-260)),selection:r,editable:a,userId:i?.dataset.userId??null}))};return document.addEventListener(`contextmenu`,e),()=>document.removeEventListener(`contextmenu`,e)},[]),(0,_.useEffect)(()=>{if(!t)return;let e=()=>n(null),r=e=>{e.key===`Escape`&&n(null)},i=()=>{document.hidden&&e()};return window.addEventListener(`click`,e),window.addEventListener(`scroll`,e,!0),window.addEventListener(`resize`,e),window.addEventListener(`keydown`,r),window.addEventListener(`blur`,e),document.addEventListener(`visibilitychange`,i),()=>{window.removeEventListener(`click`,e),window.removeEventListener(`scroll`,e,!0),window.removeEventListener(`resize`,e),window.removeEventListener(`keydown`,r),window.removeEventListener(`blur`,e),document.removeEventListener(`visibilitychange`,i)}},[t]),(0,_.useEffect)(()=>()=>window.clearTimeout(s.current),[]);let l=async t=>{n(null);try{await navigator.clipboard.writeText(t),c(e(`copied`))}catch{}},u=async e=>{n(null);try{let t=await navigator.clipboard.readText();t&&yc(e,t)}catch{}},d=async(t,r)=>{n(null);try{await Es(t,r),i(e=>{let n=new Set(e);return r?n.add(t):n.delete(t),n}),window.dispatchEvent(new CustomEvent(`antibot:whitelist`,{detail:{userId:t,whitelisted:r}})),c(e(r?`added_to_whitelist`:`removed_from_whitelist`))}catch{}},f=t?.userId?r.has(t.userId):!1;return(0,D.jsxs)(D.Fragment,{children:[t&&(0,D.jsxs)(xc,{style:{left:t.x,top:t.y},children:[t.selection&&(0,D.jsx)(Sc,{onClick:()=>void l(t.selection),type:`button`,children:e(`copy`)}),t.userId&&(0,D.jsx)(Sc,{onClick:()=>void l(t.userId),type:`button`,children:e(`copy_id`)}),t.userId&&(0,D.jsx)(Sc,{onClick:()=>void l(`https://vrchat.com/home/user/${t.userId}`),type:`button`,children:e(`copy_profile_url`)}),t.userId&&(0,D.jsx)(Sc,{onClick:()=>void d(t.userId,!f),type:`button`,children:e(f?`remove_from_whitelist`:`add_to_whitelist`)}),t.editable&&(0,D.jsx)(Sc,{onClick:()=>void u(t.editable),type:`button`,children:e(`paste`)})]}),a&&(0,D.jsx)(Cc,{children:a})]})}var xc=K.div`
    position: fixed;
    z-index: 2000;
    min-width: 210px;
    padding: 4px;
    border: 1px solid var(--border-color);
    border-radius: 10px;
    background: var(--bg-card);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(16px);
`,Sc=K.button`
    display: block;
    width: 100%;
    padding: 8px 10px;
    border: none;
    border-radius: 7px;
    background: none;
    color: var(--text-secondary);
    font: inherit;
    font-size: 12px;
    text-align: left;
    cursor: pointer;
    transition: background 120ms ease, color 120ms ease;

    &:hover {
        background: rgba(167, 139, 250, 0.16);
        color: var(--text-primary);
    }
`,Cc=K.div`
    position: fixed;
    left: 50%;
    bottom: 24px;
    z-index: 2001;
    transform: translateX(-50%);
    padding: 8px 14px;
    border: 1px solid rgba(74, 222, 128, 0.3);
    border-radius: 999px;
    background: rgba(20, 83, 45, 0.95);
    color: #86efac;
    font-size: 11px;
    pointer-events: none;
`,wc=new fe({baseMessage:`data.base`});function Tc(e){return wc.readBlock(e)}var Ec=C.child(`logs`),Dc=E.available,Oc={exists:!1,running:!1},kc=5e3,Ac=3e3,jc=0,Mc=-1,Nc={...Oc},Pc=!1,Fc=!1,Ic=null,Lc=1e3,Rc=0,zc=0;async function Bc(){if(!E.available)return{...Oc,lines:[]};try{Rc=Date.now();let e=await Kc(0,kc);return Mc=e.generation,jc=e.lines.at(-1)?.id??jc,Nc={exists:e.exists,running:e.running},{exists:e.exists,running:e.running,lines:e.lines}}catch(e){throw Ec.warn(`the log snapshot failed`,{error:String(e)}),e}}function Vc(e){return E.on(t=>{t.type===`log.changed`&&Hc(e)})}function Hc(e){Pc||Lc-(Date.now()-Rc)>0?Uc(e):(Rc=Date.now(),Pc=!0,Kc(jc,Ac).then(t=>{let n=Mc>=0&&t.generation!==Mc,r={exists:t.exists,running:t.running},i=r.exists!==Nc.exists||r.running!==Nc.running;Mc=t.generation,Nc=r,jc=t.lines.at(-1)?.id??jc,(n||i||t.lines.length!==0)&&e({...r,reset:n,lines:t.lines})},e=>{Ec.debug(`could not read the log page`,{error:String(e)})}).finally(()=>{if(Pc=!1,Fc&&Ic){let e=Ic;Fc=!1,Ic=null,Uc(e)}}))}function Uc(e){if(Fc=!0,Ic=e,zc)return;let t=Math.max(0,Lc-(Date.now()-Rc));zc=window.setTimeout(()=>{if(zc=0,!Fc||!Ic)return;let e=Ic;Fc=!1,Ic=null,Hc(e)},t)}async function Wc(){E.available&&await E.request(`log.openFolder`)}async function Gc(){return E.available?await E.request(`log.export`):{saved:!1,lines:0}}async function Kc(e,t){let n=await Tc(`/log?after=${Math.max(0,e)}&limit=${t}`);return{exists:n.meta.exists===`1`,running:n.meta.running===`1`,generation:Number(n.meta.generation??0),lines:n.rows.map(e=>({id:Number(e.id),time:String(e.time),level:String(e.level),message:String(e.message)}))}}var qc=3e3;function Jc(){let[e,t]=(0,_.useState)(Oc),[n,r]=(0,_.useState)([]),i=(0,_.useRef)(0),a=(0,_.useRef)(!1);return(0,_.useEffect)(()=>{let e=!1,n=Vc(n=>{e||(a.current=!0,t({exists:n.exists??!1,running:n.running??!1}),r(e=>Yc(e,n,i.current)))});return Bc().then(n=>{e||(a.current||t({exists:n.exists??!1,running:n.running??!1}),r(e=>Xc(e,n.lines,i.current)))},()=>{}),()=>{e=!0,n()}},[]),{status:e,lines:n,clear:()=>{i.current=n.at(-1)?.id??i.current,r([])}}}function Yc(e,t,n){if(t.reset)return t.lines.filter(e=>e.id>n).slice(-3e3);let r=e.at(-1)?.id??0,i=t.lines.filter(e=>e.id>r&&e.id>n);if(i.length===0)return e;let a=[...e,...i];return a.length>qc?a.slice(-3e3):a}function Xc(e,t,n){let r=e.at(-1)?.id??0,i=[...e,...t.filter(e=>e.id>r&&e.id>n)];return i.length>qc?i.slice(-3e3):i}var Zc={state:`loggedOut`,storage:`none`,twoFactorMethods:[],systemStorage:!1,systemStorageName:``,tpmStorage:!1,helloStorage:!1,softwareStorage:!1,storageChosen:!1,accounts:[],saved:[]};async function Qc(){return E.available?await E.request(`auth.state`):Zc}async function $c(e,t,n=!0,r=!0){return await E.request(`auth.login`,{username:e,password:t,rememberPassword:n,autoLogin:r},3e4)}async function el(e){return await E.request(`auth.login.saved`,{dir:e},12e4)}async function tl(e){return await E.request(`auth.saved.forget`,{dir:e},3e4)}async function nl(e,t){return await E.request(`auth.verify`,{method:e,code:t},3e4)}async function rl(e,t){return await E.request(`auth.unlock`,{password:e,dir:t},12e4)}async function il(e){return await E.request(`auth.switch`,{dir:e},12e4)}async function al(e){return await E.request(`auth.remove`,{dir:e},3e4)}async function ol(){return await E.request(`auth.signin.cancel`,void 0,15e3)}async function sl(e,t){return await E.request(`auth.storage.save`,{mode:e,password:t},3e4)}async function cl(){return await E.request(`auth.logout`,void 0,3e4)}async function ll(){return await E.request(`auth.device.start`,void 0,3e4)}async function ul(e){return await E.request(`auth.device.poll`,{deviceCode:e},3e4)}function dl(e){return E.on(t=>{t.type===`auth.changed`&&e(t.data)})}function fl(){let[e,t]=(0,_.useState)(Zc),[n,r]=(0,_.useState)(!1);return(0,_.useEffect)(()=>{let e=!1,n=dl(n=>{e||(t(n),r(!0))});return Qc().then(n=>{e||(t(n),r(!0))},()=>{e||r(!0)}),()=>{e=!0,n()}},[]),{auth:e,ready:n}}function pl({checked:e,onChange:t,title:n,hint:r,disabled:i=!1,requires:a}){return(0,D.jsxs)(ml,{children:[(0,D.jsxs)(hl,{children:[(0,D.jsx)(`input`,{checked:e,disabled:i,onChange:e=>t(e.target.checked),type:`checkbox`}),(0,D.jsx)(`span`,{children:n}),a&&(0,D.jsx)(_l,{children:a})]}),(0,D.jsx)(gl,{children:r})]})}var ml=K.label`
    display: flex;
    flex-direction: column;
    gap: 2px;
    cursor: pointer;
`,hl=K.span`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;

    input {
        accent-color: var(--accent-primary);
    }
`,gl=K.span`
    padding-left: 24px;
    font-size: 10.5px;
    color: var(--text-muted);
`,_l=K.span`
    padding: 1px 7px;
    border-radius: 999px;
    background: rgba(96, 165, 250, 0.14);
    color: #93c5fd;
    font-family: var(--font-mono);
    font-size: 9px;
`;function vl({initial:e,ready:t=!1,expired:n=!1}){let r=O(),[i,a]=(0,_.useState)(e??Zc),[o,s]=(0,_.useState)(t),[c,l]=(0,_.useState)(``),[u,d]=(0,_.useState)(!1),[f,p]=(0,_.useState)(!1),[m,h]=(0,_.useState)(!1),[g,v]=(0,_.useState)(null),[y,b]=(0,_.useState)(``);(0,_.useEffect)(()=>{let e=!1,t=dl(t=>{e||(a(t),s(!0))});return Qc().then(t=>{e||(a(t),s(!0))},()=>{e||s(!0)}),()=>{e=!0,t()}},[]);let x=i.state===`loggedIn`;(0,_.useEffect)(()=>{x&&p(!1)},[x]);let S=async e=>{d(!0),l(``);try{return a(await e()),!0}catch(e){return l(e instanceof Error?e.message:String(e)),!1}finally{d(!1)}},C=e=>S(()=>el(e.dir)),ee=i.accounts.length>0,w=f||!x&&i.state===`loggedOut`&&!ee,te=w||i.state===`twoFactor`||i.state===`locked`&&!m,T=async e=>{if(l(``),e.storage===`password`)b(``),v(e);else{d(!0);try{let t=await il(e.dir);if(t.needsPassword){b(``),v(e);return}if(t.needsLogin){l(t.error??``),p(!0);return}if(!t.ok||!t.auth){l(t.error??``);return}a(t.auth)}catch(e){l(e instanceof Error?e.message:String(e))}finally{d(!1)}}},ne=async(e,t)=>{b(``),d(!0);try{a(await rl(t,e.dir)),v(null)}catch(t){let n=t instanceof Error?t.message:String(t);b(n);let r=await Qc().catch(()=>null);r&&!r.accounts.some(t=>t.dir===e.dir&&t.stored)&&(a(r),b(``),v(null),l(n),p(!0))}finally{d(!1)}},re=async e=>{l(``),d(!0);try{a(await al(e.dir))}catch(e){l(e instanceof Error?e.message:String(e))}finally{d(!1)}},ie=async e=>{l(``),d(!0);try{a(await tl(e.dir))}catch(e){l(e instanceof Error?e.message:String(e))}finally{d(!1)}},ae=()=>{p(!1),l(``),ol().then(a,()=>{})};if(!o)return(0,D.jsx)(Pl,{$wide:!0});let oe;return oe=i.state===`locked`&&!m?(0,D.jsx)(wl,{auth:i,busy:u,error:c,run:S,onBrowse:ee?()=>h(!0):void 0}):i.state===`twoFactor`?(0,D.jsx)(Cl,{auth:i,busy:u,error:c,run:S,onCancel:ee?ae:void 0}):w?(0,D.jsx)(Sl,{auth:i,busy:u,error:c,onCancel:ee?ae:void 0,onForgetSaved:e=>void ie(e),onSignedIn:e=>{a(e),p(!1)},onSignInSaved:e=>void C(e),run:S}):(0,D.jsxs)(D.Fragment,{children:[x&&(0,D.jsx)(Tl,{auth:i,busy:u,error:c,run:S}),x&&(0,D.jsx)(kl,{auth:i,busy:u,error:c,run:S},i.user?.id),(0,D.jsx)(yl,{accounts:i.accounts,busy:u,onAdd:()=>{l(``),p(!0)},onRemove:e=>void re(e),onSwitch:e=>void T(e),signedIn:x}),c&&(0,D.jsx)(lu,{children:c})]}),(0,D.jsxs)(Pl,{$wide:te,children:[n&&(0,D.jsxs)(uu,{role:`alert`,children:[(0,D.jsx)(zs,{size:16}),(0,D.jsx)(`span`,{children:r(`vr_chat_session_expired_sign_in_again`)}),(0,D.jsx)(du,{disabled:u,onClick:()=>{l(``),p(!0)},type:`button`,children:r(`sign_in`)})]}),oe,g&&(0,D.jsx)(xl,{account:g,busy:u,error:y,onCancel:()=>{v(null),b(``)},onUnlock:e=>void ne(g,e)})]})}function yl({accounts:e,busy:t,signedIn:n,onAdd:r,onSwitch:i,onRemove:a}){let o=O();return(0,D.jsxs)(Il,{children:[(0,D.jsxs)(Yl,{children:[(0,D.jsx)(Is,{size:20}),(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`h2`,{children:o(`accounts`)}),(0,D.jsx)(`p`,{children:o(n?`switch_to_another_account_only_one_is_signed_in_at_a_time`:`pick_an_account_to_sign_in_with`)})]})]}),e.length>0&&(0,D.jsx)(yu,{children:e.map(e=>{let r=e.active&&n,s=()=>{!t&&!r&&i(e)};return(0,D.jsxs)(bu,{$active:e.active,$clickable:!r,"aria-current":r?`true`:void 0,onClick:s,onKeyDown:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),s())},role:r?void 0:`button`,tabIndex:r?void 0:0,children:[(0,D.jsx)(xu,{$src:e.avatar,children:e.avatar?null:e.name.slice(0,1).toUpperCase()}),(0,D.jsxs)(Su,{children:[(0,D.jsx)(`strong`,{children:e.name}),(0,D.jsx)(`span`,{children:o(Nl(e.storage))})]}),r?(0,D.jsx)(wu,{children:o(`signed_in`)}):(0,D.jsx)(Cu,{children:(0,D.jsx)(Ou,{"aria-label":o(`remove_account`),disabled:t,onClick:t=>{t.stopPropagation(),a(e)},type:`button`,children:(0,D.jsx)(Ns,{size:14})})})]},e.dir)})}),(0,D.jsx)(tu,{children:(0,D.jsx)(ru,{disabled:t,onClick:r,type:`button`,children:o(`add_account`)})})]})}function bl({accounts:e,busy:t,onSignIn:n,onForget:r}){let i=O();return(0,D.jsxs)(Il,{children:[(0,D.jsxs)(Yl,{children:[(0,D.jsx)(Bs,{size:20}),(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`h2`,{children:i(`saved_accounts`)}),(0,D.jsx)(`p`,{children:i(`press_an_account_to_sign_in_with_its_saved_password`)})]})]}),(0,D.jsx)(yu,{children:e.map(e=>(0,D.jsxs)(bu,{$active:!1,$clickable:!t,onClick:()=>{t||n(e)},onKeyDown:r=>{t||r.key!==`Enter`&&r.key!==` `||(r.preventDefault(),n(e))},role:`button`,tabIndex:0,children:[(0,D.jsx)(xu,{$src:e.avatar,children:e.avatar?null:e.name.slice(0,1).toUpperCase()}),(0,D.jsxs)(Su,{children:[(0,D.jsx)(`strong`,{children:e.name}),(0,D.jsx)(`span`,{children:e.autoLogin?i(`signs_in_automatically`):i(`manual_sign_in`)})]}),(0,D.jsx)(Cu,{children:(0,D.jsx)(Ou,{"aria-label":i(`forget_saved_password`),disabled:t,onClick:t=>{t.stopPropagation(),r(e)},title:i(`forget_saved_password`),type:`button`,children:(0,D.jsx)(Ns,{size:14})})})]},e.dir))})]})}function xl({account:e,busy:t,error:n,onUnlock:r,onCancel:i}){let a=O(),[o,s]=(0,_.useState)(``);return(0,D.jsx)(hu,{children:(0,D.jsxs)(gu,{"aria-modal":`true`,role:`dialog`,children:[(0,D.jsxs)(Yl,{children:[(0,D.jsx)(Bs,{size:20}),(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`h2`,{children:a(`unlock_name`,{name:e.name})}),(0,D.jsx)(`p`,{children:a(`the_session_was_encrypted_with_a_key_derived_from_your_password_it_is_never_stored_so_it_has_to_be_typed_again`)})]})]}),(0,D.jsxs)(Xl,{onSubmit:e=>{e.preventDefault(),r(o)},children:[(0,D.jsxs)(Zl,{children:[(0,D.jsx)($l,{htmlFor:`switch-password`,children:a(`password`)}),(0,D.jsx)(Ol,{autoComplete:`current-password`,autoFocus:!0,id:`switch-password`,onChange:s,value:o})]}),n&&(0,D.jsx)(lu,{children:n}),(0,D.jsxs)(tu,{children:[(0,D.jsx)(q,{disabled:t,type:`submit`,children:a(t?`unlocking`:`unlock`)}),(0,D.jsx)(ru,{disabled:t,onClick:i,type:`button`,children:a(`cancel`)})]})]})]})})}function Sl({auth:e,busy:t,error:n,run:r,onSignedIn:i,onSignInSaved:a,onForgetSaved:o,onCancel:s}){let c=O(),[l,u]=(0,_.useState)(``),[d,f]=(0,_.useState)(``),[p,m]=(0,_.useState)(!0),[h,g]=(0,_.useState)(!0);return(0,D.jsx)(Fl,{children:(0,D.jsxs)(Rl,{children:[e.saved.length>0&&(0,D.jsx)(bl,{accounts:e.saved,busy:t,onForget:o,onSignIn:a}),(0,D.jsxs)(zl,{children:[(0,D.jsxs)(Bl,{children:[(0,D.jsxs)(Vl,{children:[(0,D.jsx)(Hl,{children:(0,D.jsx)(Rs,{size:22})}),(0,D.jsx)(`h1`,{children:c(`sign_in_to_vr_chat`)}),(0,D.jsx)(`p`,{children:c(`use_your_vr_chat_account_or_scan_the_code_instead`)})]}),(0,D.jsxs)(Xl,{onSubmit:e=>{e.preventDefault(),r(()=>$c(l.trim(),d,p,p&&h))},children:[(0,D.jsxs)(Zl,{children:[(0,D.jsx)($l,{htmlFor:`username`,children:c(`username_or_email`)}),(0,D.jsx)(Dl,{onChange:u,value:l})]}),(0,D.jsxs)(Zl,{children:[(0,D.jsx)($l,{htmlFor:`password`,children:c(`password`)}),(0,D.jsx)(Ol,{autoComplete:`current-password`,id:`password`,onChange:f,value:d})]}),(0,D.jsxs)(Ql,{children:[(0,D.jsx)(pl,{checked:p,hint:c(`keeps_this_account_s_password_on_this_device_encrypted_by_the_os_or_the_tpm`),onChange:e=>{m(e),e||g(!1)},title:c(`remember_password`)}),(0,D.jsx)(pl,{checked:h,disabled:!p,hint:c(`signs_in_with_the_saved_password_when_the_session_expires_vr_chat_may_still_ask_for_a_two_factor_code`),onChange:g,title:c(`sign_in_automatically`)})]}),n&&(0,D.jsx)(lu,{children:n}),(0,D.jsx)(iu,{disabled:t,type:`submit`,children:c(t?`signing_in`:`sign_in`)}),s&&(0,D.jsx)(ou,{disabled:t,onClick:s,type:`button`,children:c(`cancel`)})]}),(0,D.jsx)(fu,{children:c(`signing_in_is_optional_without_it_anti_bot_only_reads_vr_chat_s_local_log_so_the_instance_list_can_be_inaccurate_and_player_details_are_unavailable`)})]}),(0,D.jsxs)(Ul,{children:[(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`h2`,{children:c(`or_scan_to_sign_in`)}),(0,D.jsx)(`p`,{children:c(`approve_it_in_the_vr_chat_app_the_password_never_reaches_anti_bot`)})]}),(0,D.jsx)(Al,{onSignedIn:i})]})]})]})})}function Cl({auth:e,busy:t,error:n,run:r,onCancel:i}){let a=O(),o=e.twoFactorMethods.length>0?e.twoFactorMethods:[`totp`,`otp`],[s,c]=(0,_.useState)(o[0]),[l,u]=(0,_.useState)(``);return(0,D.jsx)(Fl,{children:(0,D.jsxs)(Ll,{children:[(0,D.jsxs)(Yl,{children:[(0,D.jsx)(zs,{size:20}),(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`h2`,{children:a(`two_factor_authentication`)}),(0,D.jsx)(`p`,{children:a(`vr_chat_wants_a_second_factor_before_it_hands_over_the_session`)})]})]}),(0,D.jsx)(su,{children:o.map(e=>(0,D.jsx)(cu,{$active:s===e,onClick:()=>c(e),type:`button`,children:a(jl(e))},e))}),(0,D.jsxs)(Xl,{onSubmit:e=>{e.preventDefault();let t=l.trim(),n=s===`otp`&&/^\d{8}$/.test(t)?`${t.slice(0,4)}-${t.slice(4)}`:t;r(()=>nl(s,n))},children:[(0,D.jsxs)(Zl,{children:[(0,D.jsx)($l,{htmlFor:`code`,children:a(Ml(s))}),(0,D.jsx)(eu,{autoComplete:`one-time-code`,autoFocus:!0,id:`code`,inputMode:`numeric`,onChange:e=>u(e.target.value),placeholder:`123456`,value:l})]}),n&&(0,D.jsx)(lu,{children:n}),(0,D.jsx)(iu,{disabled:t,type:`submit`,children:a(t?`verifying`:`verify`)}),i&&(0,D.jsx)(ou,{disabled:t,onClick:i,type:`button`,children:a(`cancel`)})]})]})})}function wl({auth:e,busy:t,error:n,run:r,onBrowse:i}){let a=O(),[o,s]=(0,_.useState)(``),c=e.storage===`hello`;return(0,D.jsx)(Fl,{children:(0,D.jsxs)(Ll,{children:[(0,D.jsxs)(Yl,{children:[(0,D.jsx)(Bs,{size:20}),(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`h2`,{children:a(c?`unlock_with_windows_hello`:`unlock_the_saved_session`)}),(0,D.jsx)(`p`,{children:a(c?`the_session_is_protected_by_windows_hello_confirm_with_your_pin_fingerprint_or_face`:`the_session_was_encrypted_with_a_key_derived_from_your_password_it_is_never_stored_so_it_has_to_be_typed_again`)})]})]}),(0,D.jsxs)(Xl,{onSubmit:e=>{e.preventDefault(),r(()=>rl(c?``:o))},children:[!c&&(0,D.jsxs)(Zl,{children:[(0,D.jsx)($l,{htmlFor:`unlock-password`,children:a(`password`)}),(0,D.jsx)(Ol,{autoComplete:`current-password`,autoFocus:!0,id:`unlock-password`,onChange:s,value:o})]}),n&&(0,D.jsx)(lu,{children:n}),(0,D.jsx)(iu,{disabled:t,type:`submit`,children:a(t?`unlocking`:c?`unlock_with_windows_hello`:`unlock`)}),(0,D.jsx)(ou,{onClick:()=>void r(async()=>await sl(`none`)),type:`button`,children:a(`forget_it`)}),i&&(0,D.jsx)(ou,{disabled:t,onClick:i,type:`button`,children:a(`accounts`)})]})]})})}function Tl({auth:e,busy:t,error:n,run:r}){let i=O(),a=e.user,o=El(a.status);return(0,D.jsx)(D.Fragment,{children:(0,D.jsxs)(Il,{children:[(0,D.jsxs)(_u,{children:[(0,D.jsx)(vu,{$src:a.avatarUrl}),(0,D.jsxs)(Tu,{children:[(0,D.jsx)(`h2`,{children:a.displayName}),(0,D.jsxs)(Eu,{children:[o&&(0,D.jsx)(Du,{$color:o.color}),(0,D.jsx)(`p`,{children:a.statusDescription||i(o?o.labelKey:`signed_in_to_vr_chat`)})]}),e.expiresAt&&(0,D.jsx)(`p`,{children:i(`session_expires_date`,{date:new Date(e.expiresAt).toLocaleDateString()})})]}),(0,D.jsx)(au,{disabled:t,onClick:()=>void r(cl),type:`button`,children:i(`sign_out`)})]}),n&&(0,D.jsx)(lu,{children:n})]})})}function El(e){switch(e){case`active`:return{labelKey:`online`,color:`#4ade80`};case`join me`:return{labelKey:`join_me`,color:`#60a5fa`};case`ask me`:return{labelKey:`ask_me`,color:`#fbbf24`};case`busy`:return{labelKey:`busy`,color:`#f87171`};case`offline`:return{labelKey:`offline`,color:`#94a3b8`};default:return e&&e.length>0?{labelKey:e,color:`#94a3b8`}:null}}function Dl({value:e,onChange:t}){let n=O(),[r,i]=(0,_.useState)(!1);return(0,D.jsxs)(ku,{children:[(0,D.jsx)(eu,{autoComplete:`username`,id:`username`,onChange:e=>t(e.target.value),placeholder:n(`username`),type:r?`text`:`password`,value:e}),(0,D.jsx)(Au,{"aria-label":n(r?`hide_the_username`:`show_the_username`),onClick:()=>i(e=>!e),type:`button`,children:r?(0,D.jsx)(Hs,{size:14}):(0,D.jsx)(Vs,{size:14})})]})}function Ol({id:e,value:t,onChange:n,placeholder:r=`••••••••`,autoComplete:i,autoFocus:a}){let o=O(),[s,c]=(0,_.useState)(!1);return(0,D.jsxs)(ku,{children:[(0,D.jsx)(eu,{autoComplete:i,autoFocus:a,id:e,onChange:e=>n(e.target.value),placeholder:r,type:s?`text`:`password`,value:t}),(0,D.jsx)(Au,{"aria-label":o(s?`hide_password`:`show_password`),onClick:()=>c(e=>!e),type:`button`,children:s?(0,D.jsx)(Hs,{size:14}):(0,D.jsx)(Vs,{size:14})})]})}function kl({auth:e,busy:t,error:n,run:r}){let i=O(),a=e.systemStorage,o=e.systemStorageName||`System protection`,s=e.tpmStorage,c=e.helloStorage,l=e.softwareStorage,u=e.storage!==`none`,d=e.state===`loggedIn`,[f,p]=(0,_.useState)(!u&&!e.storageChosen),[m,h]=(0,_.useState)(u?e.storage:`none`),[g,v]=(0,_.useState)(``),[y,b]=(0,_.useState)(``),[x,S]=(0,_.useState)(``);(0,_.useEffect)(()=>{(u||e.storageChosen)&&p(!1)},[u,e.storageChosen]);let C=()=>{h(u?e.storage:`none`),v(``),b(``),S(``),p(!0)},ee=m!==e.storage||m===`password`&&g.length>0||!e.storageChosen;return f?(0,D.jsx)(hu,{children:(0,D.jsxs)(gu,{"aria-modal":`true`,role:`dialog`,children:[(0,D.jsxs)(Yl,{children:[(0,D.jsx)(zs,{size:20}),(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`h2`,{children:i(`keep_the_session_between_launches`)}),(0,D.jsx)(`p`,{children:i(`only_the_vr_chat_session_cookie_is_stored_never_your_password_every_mode_except_do_not_remember_encrypts_it_at_rest_the_difference_is_what_unlocks_it`)})]})]}),(0,D.jsxs)(ju,{children:[(0,D.jsxs)(Mu,{$active:m===`software`,$disabled:!l,onClick:()=>l&&h(`software`),type:`button`,children:[(0,D.jsxs)(Nu,{children:[(0,D.jsx)(`strong`,{children:i(`software_key`)}),(0,D.jsx)(Pu,{children:i(`obfuscation`)}),(0,D.jsx)(Iu,{$tone:`weak`,children:i(`weak`)}),(0,D.jsx)(Fu,{children:i(`linux`)})]}),(0,D.jsx)(`p`,{children:i(`aes_256_gcm_with_a_key_file_next_to_the_session_obfuscation_only_not_real_protection`)})]}),(0,D.jsxs)(Mu,{$active:m===`system`,$disabled:!a,onClick:()=>a&&h(`system`),type:`button`,children:[(0,D.jsxs)(Nu,{children:[(0,D.jsx)(`strong`,{children:o}),(0,D.jsx)(Pu,{children:i(`encrypted`)}),(0,D.jsx)(Iu,{$tone:`fair`,children:i(`fair`)}),(0,D.jsx)(Fu,{children:i(o===`Windows DPAPI`?`windows`:o===`System keyring`?`linux`:`windows_linux`)})]}),(0,D.jsx)(`p`,{children:i(o===`Windows DPAPI`?`encrypted_with_windows_dpapi_for_your_account_unlocks_automatically`:`held_in_the_desktop_keyring_unlocks_with_your_login_session`)})]}),(0,D.jsxs)(Mu,{$active:m===`tpm`,$disabled:!s,onClick:()=>s&&h(`tpm`),type:`button`,children:[(0,D.jsxs)(Nu,{children:[(0,D.jsx)(`strong`,{children:i(`tpm`)}),(0,D.jsx)(Pu,{children:i(`no_prompt`)}),(0,D.jsx)(Iu,{$tone:`good`,children:i(`good`)}),(0,D.jsx)(Fu,{children:i(`windows_linux`)})]}),(0,D.jsx)(`p`,{children:i(`aes_key_wrapped_by_this_machine_s_tpm_unlocks_automatically`)})]}),(0,D.jsxs)(Mu,{$active:m===`hello`,$disabled:!c,onClick:()=>c&&h(`hello`),type:`button`,children:[(0,D.jsxs)(Nu,{children:[(0,D.jsx)(`strong`,{children:i(`windows_hello`)}),(0,D.jsx)(Pu,{children:i(`pin_biometrics`)}),(0,D.jsx)(Iu,{$tone:`strong`,children:i(`strong`)}),(0,D.jsx)(Fu,{children:i(`windows`)})]}),(0,D.jsx)(`p`,{children:i(`windows_hello_confirms_it_is_you_before_unlocking`)})]}),(0,D.jsxs)(Mu,{$active:m===`password`,onClick:()=>h(`password`),type:`button`,children:[(0,D.jsxs)(Nu,{children:[(0,D.jsx)(`strong`,{children:i(`password`)}),(0,D.jsx)(Pu,{children:i(`asks_every_launch`)}),(0,D.jsx)(Iu,{$tone:`strong`,children:i(`strong`)}),(0,D.jsx)(Fu,{children:i(`windows_linux`)})]}),(0,D.jsx)(`p`,{children:i(`aes_256_gcm_with_a_key_derived_from_your_password_asked_each_launch`)})]}),(0,D.jsxs)(Mu,{$active:m===`none`,onClick:()=>h(`none`),type:`button`,children:[(0,D.jsxs)(Nu,{children:[(0,D.jsx)(`strong`,{children:i(`do_not_remember`)}),(0,D.jsx)(Pu,{children:i(`nothing_on_disk`)}),(0,D.jsx)(Iu,{$tone:`safest`,children:i(`safest`)}),(0,D.jsx)(Fu,{children:i(`windows_linux`)})]}),(0,D.jsx)(`p`,{children:i(`nothing_is_written_the_next_launch_signs_in_again`)})]})]}),m===`password`&&(0,D.jsxs)(Zl,{children:[(0,D.jsx)($l,{htmlFor:`storage-password`,children:i(`password_for_this_session`)}),(0,D.jsx)(Ol,{autoComplete:`current-password`,id:`storage-password`,onChange:v,value:g}),(0,D.jsx)(Ol,{autoComplete:`current-password`,onChange:b,placeholder:i(`repeat_the_password`),value:y})]}),(x||n)&&(0,D.jsx)(lu,{children:x||n}),(0,D.jsx)(tu,{children:(0,D.jsx)(q,{disabled:t||!d,onClick:()=>{if(!d)S(i(`sign_in_first`));else if(!ee)p(!1);else{if(m===`password`){if(g.length<1){S(i(`enter_the_password_that_unlocks_the_session`));return}if(g!==y){S(i(`the_passwords_do_not_match`));return}}S(``),r(()=>sl(m,m===`password`?g:void 0)).then(e=>{e&&(v(``),b(``),p(!1))})}},type:`button`,children:i(t?`saving`:`save`)})})]})}):(0,D.jsx)(Il,{children:(0,D.jsxs)(pu,{children:[(0,D.jsx)(mu,{children:i(`currently_storage`,{storage:i(Nl(e.storage))})}),(0,D.jsx)(ru,{onClick:C,type:`button`,children:i(`change_save_method`)})]})})}function Al({onSignedIn:e}){let t=O(),[n,r]=(0,_.useState)(null),[i,a]=(0,_.useState)(``),[o,s]=(0,_.useState)(!1),[c,l]=(0,_.useState)(!0),u=(0,_.useRef)(!1),d=(0,_.useCallback)(async()=>{if(!u.current){u.current=!0,a(``),s(!1),l(!0);try{r(await ll())}catch(e){a(e instanceof Error?e.message:String(e))}finally{u.current=!1,l(!1)}}},[]);(0,_.useEffect)(()=>{E.available?d():l(!1)},[d]),(0,_.useEffect)(()=>{if(!n)return;let t=!1,r=0,i=Math.max(n.interval,2)*1e3,o=Date.now()+Math.max(n.expiresIn,60)*1e3,c=async()=>{if(Date.now()>o)s(!0);else try{let o=await ul(n.deviceCode);if(t)return;if(o.approved&&o.auth){e(o.auth);return}let l=o.reason??`pending`;if(l===`expired_token`){s(!0);return}if(l===`slow_down`)i+=5e3;else if(l===`rate_limited`)i=Math.max(i,15e3);else if(l!==`pending`&&l!==`authorization_pending`){a(l);return}r=window.setTimeout(()=>void c(),i)}catch(e){t||a(e instanceof Error?e.message:String(e))}};return r=window.setTimeout(()=>void c(),i),()=>{t=!0,window.clearTimeout(r)}},[n,e]);let f=!!i||o;return(0,D.jsxs)(Wl,{children:[(0,D.jsx)(Gl,{$dim:!n||f,children:n?.qrDataUrl?(0,D.jsx)(zu,{alt:t(`device_sign_in`),src:n.qrDataUrl}):(0,D.jsx)(Kl,{children:t(c?`preparing_the_code`:`the_sign_in_code_is_unavailable`)})}),f?(0,D.jsxs)(ql,{children:[(0,D.jsx)(`span`,{children:i||t(`the_code_expired_start_again`)}),(0,D.jsx)(Jl,{onClick:()=>void d(),type:`button`,children:t(`try_again`)})]}):(0,D.jsx)(ql,{children:t(n?`waiting_for_approval`:`preparing_the_code`)}),n&&(0,D.jsx)(Bu,{children:(0,D.jsx)(`a`,{href:n.url,rel:`noreferrer`,target:`_blank`,children:t(`open_the_link_instead`)})})]})}function jl(e){switch(e){case`totp`:return`authenticator`;case`emailOtp`:return`email_code`;default:return`recovery_code`}}function Ml(e){switch(e){case`totp`:return`code_from_your_authenticator_app`;case`emailOtp`:return`code_vr_chat_emailed_you`;default:return`one_of_your_recovery_codes`}}function Nl(e){switch(e){case`password`:return`password_encrypted`;case`system`:return`system_protected`;case`tpm`:return`tpm_protected`;case`hello`:return`windows_hello`;case`software`:return`software_key`;default:return`not_stored`}}var Pl=K.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 16px;
    min-height: 0;
    max-width: ${({$wide:e})=>e?`none`:`720px`};
    overflow: auto;
`,Fl=K.div`
    display: flex;
    flex: 1;
    min-height: 0;
    padding: 12px 0;
    overflow: auto;
`,Il=K.section`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`,Ll=K(Il)`
    width: 100%;
    max-width: 420px;
    margin: auto;
`,Rl=K.div`
    display: flex;
    flex-direction: column;
    gap: 14px;
    width: 100%;
    max-width: 640px;
    margin: auto;
`,zl=K.section`
    display: grid;
    grid-template-columns: minmax(0, 1fr) 272px;
    width: 100%;
    max-width: 640px;
    margin: 0;
    overflow: hidden;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-lg);
    background: var(--bg-card);
    box-shadow: 0 28px 70px rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(10px);

    @media (max-width: 860px) {
        grid-template-columns: minmax(0, 1fr);
        max-width: 380px;
    }
`,Bl=K.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 30px 28px;
`,Vl=K.div`
    display: flex;
    flex-direction: column;
    gap: 10px;

    h1 {
        font-size: 20px;
        font-weight: 600;
        letter-spacing: -0.02em;
    }

    p {
        font-size: 12px;
        line-height: 1.55;
        color: var(--text-secondary);
    }
`,Hl=K.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: rgba(167, 139, 250, 0.14);
    color: var(--accent-primary);
`,Ul=K.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 30px 24px;
    border-left: 1px solid var(--border-color);
    background: rgba(255, 255, 255, 0.015);

    h2 {
        font-size: 13px;
        font-weight: 600;
    }

    p {
        margin-top: 4px;
        font-size: 11px;
        line-height: 1.5;
        color: var(--text-secondary);
    }

    @media (max-width: 860px) {
        border-left: 0;
        border-top: 1px solid var(--border-color);
    }
`,Wl=K.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
`,Gl=K.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 188px;
    aspect-ratio: 1;
    padding: 10px;
    border-radius: var(--radius-md);
    background: #fff;
    opacity: ${({$dim:e})=>e?.4:1};
    transition: opacity 0.15s ease;
`,Kl=K.span`
    padding: 0 10px;
    color: #4b5563;
    font-family: var(--font-mono);
    font-size: 10px;
    line-height: 1.5;
    text-align: center;
`,ql=K.p`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    flex-wrap: wrap;
    min-height: 16px;
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-muted);
    text-align: center;
`,Jl=K.button`
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--accent-primary);
    font: inherit;
    font-size: 10px;
    text-decoration: underline;
    cursor: pointer;
`,Yl=K.div`
    display: flex;
    gap: 12px;

    svg {
        flex-shrink: 0;
        margin-top: 2px;
        color: var(--accent-primary);
    }

    h2 {
        font-size: 15px;
        font-weight: 600;
    }

    p {
        margin-top: 4px;
        font-size: 12px;
        line-height: 1.5;
        color: var(--text-secondary);
    }
`,Xl=K.form`
    display: flex;
    flex-direction: column;
    gap: 12px;
`,Zl=K.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`,Ql=K.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 12px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: rgba(255, 255, 255, 0.015);
`,$l=K.label`
    font-size: 11px;
    color: var(--text-secondary);
`,eu=K.input`
    padding: 9px 11px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: var(--bg-primary);
    color: var(--text-primary);
    font: inherit;
    font-size: 13px;

    &:focus {
        outline: 2px solid var(--border-color-focus);
        outline-offset: 1px;
    }
`,tu=K.div`
    display: flex;
    align-items: center;
    gap: 10px;
`,nu=K.button`
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 8px 14px;
    border: 1px solid ${({$primary:e})=>e?`transparent`:`var(--border-color)`};
    border-radius: var(--radius-sm);
    background: ${({$primary:e})=>e?`var(--accent-primary)`:`transparent`};
    color: ${({$primary:e})=>e?`#0b0714`:`var(--text-primary)`};
    font: inherit;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;

    &:disabled {
        opacity: 0.5;
        cursor: default;
    }

    &:hover:not(:disabled) {
        background: ${({$primary:e})=>e?`var(--accent-primary)`:`var(--bg-card-hover)`};
    }
`,q=K(nu).attrs({$primary:!0})``,ru=K(nu).attrs({$primary:!1})``,iu=K(q)`
    justify-content: center;
    padding: 10px 14px;
`,au=K(ru)`
    margin-left: auto;
`,ou=K(ru)`
    align-self: center;
`,su=K.div`
    display: flex;
    gap: 8px;
`,cu=K.button`
    padding: 6px 11px;
    border: 1px solid ${({$active:e})=>e?`var(--accent-primary)`:`var(--border-color)`};
    border-radius: 999px;
    background: ${({$active:e})=>e?`rgba(167, 139, 250, 0.12)`:`transparent`};
    color: ${({$active:e})=>e?`var(--text-primary)`:`var(--text-secondary)`};
    font: inherit;
    font-size: 11px;
    cursor: pointer;
`,lu=K.p`
    font-size: 12px;
    color: #f87171;
`,uu=K.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
    padding: 10px 12px;
    border: 1px solid rgba(251, 191, 36, 0.32);
    border-radius: 10px;
    background: rgba(251, 191, 36, 0.08);
    color: #fbbf24;
    font-size: 12px;
    line-height: 1.4;

    svg {
        flex-shrink: 0;
    }
`,du=K(nu)`
    margin-left: auto;
    flex-shrink: 0;
    padding: 5px 10px;
    border-color: rgba(251, 191, 36, 0.45);
    color: #fbbf24;
    font-size: 11px;

    &:hover:not(:disabled) {
        background: rgba(251, 191, 36, 0.14);
    }
`,fu=K.p`
    font-size: 11px;
    line-height: 1.5;
    color: var(--text-muted);
`,pu=K.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 12px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: var(--bg-primary);
`,mu=K.span`
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-secondary);
`,hu=K.div`
    position: fixed;
    inset: 0;
    z-index: 30;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: rgba(6, 4, 12, 0.72);
    backdrop-filter: blur(3px);
`,gu=K.section`
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 100%;
    max-width: 620px;
    max-height: 100%;
    overflow-y: auto;
    padding: 20px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
`,_u=K.div`
    display: flex;
    align-items: center;
    gap: 16px;
`,vu=K.div`
    width: 64px;
    height: 64px;
    flex-shrink: 0;
    border-radius: 50%;
    background: var(--bg-primary) center / cover no-repeat;
    background-image: ${({$src:e})=>e?`url("${e}")`:`none`};
    box-shadow: inset 0 0 0 1px var(--border-color);
`,yu=K.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`,bu=K.div`
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 8px 10px;
    border: 1px solid ${({$active:e})=>e?`var(--accent-primary)`:`var(--border-color)`};
    border-radius: var(--radius-sm);
    background: ${({$active:e})=>e?`rgba(167, 139, 250, 0.08)`:`var(--bg-primary)`};
    cursor: ${({$clickable:e})=>e?`pointer`:`default`};

    ${({$clickable:e})=>e&&`
        &:hover {
            background: var(--bg-card-hover);
        }
    `}
    &:focus-visible {
        outline: 2px solid var(--border-color-focus);
        outline-offset: 1px;
    }
`,xu=K.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    flex-shrink: 0;
    border-radius: 50%;
    background: var(--bg-card) center / cover no-repeat;
    background-image: ${({$src:e})=>e?`url("${e}")`:`none`};
    box-shadow: inset 0 0 0 1px var(--border-color);
    font-size: 13px;
    font-weight: 600;
    color: var(--text-secondary);
`,Su=K.div`
    display: flex;
    flex-direction: column;
    gap: 1px;
    min-width: 0;

    strong {
        overflow: hidden;
        font-size: 13px;
        font-weight: 600;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    span {
        font-family: var(--font-mono);
        font-size: 10px;
        color: var(--text-muted);
    }
`,Cu=K.div`
    display: flex;
    align-items: center;
    gap: 6px;
    margin-left: auto;
`,wu=K.span`
    margin-left: auto;
    padding: 3px 9px;
    border-radius: 999px;
    background: rgba(167, 139, 250, 0.14);
    color: var(--accent-primary);
    font-family: var(--font-mono);
    font-size: 9px;
`,Tu=K.div`
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;

    h2 {
        font-size: 17px;
        font-weight: 600;
    }

    p {
        font-size: 12px;
        color: var(--text-secondary);
    }
`,Eu=K.div`
    display: flex;
    align-items: center;
    gap: 6px;
`,Du=K.span`
    width: 8px;
    height: 8px;
    flex-shrink: 0;
    border-radius: 50%;
    background: ${({$color:e})=>e};
    box-shadow: 0 0 6px ${({$color:e})=>e};
`,Ou=K.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    flex-shrink: 0;
    border: 0;
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--text-muted);
    cursor: pointer;

    &:hover {
        background: var(--bg-card-hover);
        color: var(--text-primary);
    }
`,ku=K.div`
    position: relative;
    display: flex;

    input {
        width: 100%;
        padding-right: 34px;
    }
`,Au=K(Ou)`
    position: absolute;
    top: 50%;
    right: 6px;
    transform: translateY(-50%);
`,ju=K.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`,Mu=K.button`
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding: 12px 14px;
    border: 1px solid ${({$active:e})=>e?`var(--accent-primary)`:`var(--border-color)`};
    border-radius: var(--radius-sm);
    background: ${({$active:e})=>e?`rgba(167, 139, 250, 0.08)`:`transparent`};
    color: var(--text-primary);
    font: inherit;
    text-align: left;
    cursor: ${({$disabled:e})=>e?`not-allowed`:`pointer`};
    opacity: ${({$disabled:e})=>e?.5:1};
    filter: ${({$disabled:e})=>e?`grayscale(1)`:`none`};

    p {
        font-size: 11px;
        line-height: 1.55;
        color: var(--text-secondary);
    }
`,Nu=K.div`
    display: flex;
    align-items: center;
    gap: 8px;

    strong {
        font-size: 12px;
        font-weight: 600;
    }
`,Pu=K.span`
    padding: 2px 7px;
    border-radius: 999px;
    background: var(--bg-primary);
    font-family: var(--font-mono);
    font-size: 9px;
    color: var(--text-muted);
`,Fu=K.span`
    margin-left: auto;
    padding: 2px 7px;
    border-radius: 999px;
    background: rgba(167, 139, 250, 0.12);
    color: var(--accent-primary);
    font-family: var(--font-mono);
    font-size: 9px;
`,Iu=K.span`
    padding: 2px 7px;
    border-radius: 999px;
    background: ${({$tone:e})=>Ru(e)};
    color: ${({$tone:e})=>Lu(e)};
    font-family: var(--font-mono);
    font-size: 9px;
`;function Lu(e){switch(e){case`weak`:return`#f87171`;case`fair`:return`#fb923c`;case`good`:return`#fbbf24`;case`strong`:return`#4ade80`;default:return`#60a5fa`}}function Ru(e){switch(e){case`weak`:return`rgba(248, 113, 113, 0.14)`;case`fair`:return`rgba(251, 146, 60, 0.14)`;case`good`:return`rgba(251, 191, 36, 0.14)`;case`strong`:return`rgba(74, 222, 128, 0.14)`;default:return`rgba(96, 165, 250, 0.14)`}}var zu=K.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`,Bu=K.div`
    max-width: 100%;
    overflow: hidden;

    a {
        font-family: var(--font-mono);
        font-size: 10px;
        color: var(--accent-primary);
        word-break: break-all;
    }
`,Vu={running:!1,world:``,instance:``,users:[]},Hu=1,Uu=2,Wu=4,Gu=8,Ku=16,qu=32;async function Ju(){return E.available?await Xu():Vu}function Yu(e){return E.on(t=>{t.type===`instance.changed`&&Xu().then(e,()=>{})})}async function Xu(){return Zu(await Tc(`/instance`))}function Zu(e){let t=e.meta;return{running:t.running===`1`,world:t.world??``,instance:t.instance??``,users:e.rows.map(e=>J(e)),source:t.source===`api`||t.source===`log`?t.source:void 0,worldName:t.worldName,userCount:Number(t.userCount??0),capacity:Number(t.capacity??0),worldId:t.worldId,worldThumbnail:t.worldThumbnail,instanceType:t.instanceType,instanceRegion:t.instanceRegion,instanceOwnerId:t.instanceOwnerId,instanceShortName:t.instanceShortName,instanceNumber:t.instanceNumber,instanceDisplayName:t.instanceDisplayName,instanceRestricted:t.instanceRestricted===`1`,instanceAgeGated:t.instanceAgeGated===`1`}}function J(e,t=``){let n=Number(e[`${t}flags`]??0),r=n=>String(e[t+n]??``);return{userId:r(`userId`),name:r(`name`),local:(n&Hu)!==0,joinedAt:r(`joined`),iconUrl:r(`icon`)||void 0,trust:r(`trust`)||void 0,status:r(`status`)||void 0,statusDescription:r(`statusText`)||void 0,pronouns:r(`pronouns`)||void 0,bio:r(`bio`)||void 0,dateJoined:r(`dateJoined`)||void 0,platform:r(`platform`)||void 0,avatarName:r(`avatarName`)||void 0,isRobot:(n&Wu)!==0,isFriend:(n&Uu)!==0,threat:Number(e[`${t}threat`]??0),threatReasons:Qu(r(`reasons`)),whitelisted:(n&Gu)!==0,profileLoaded:(n&Ku)!==0,avatarLoaded:(n&qu)!==0}}function Qu(e){return e?e.split(``).map(e=>{let[t,n,r]=e.split(`|`);return{text:t,weight:Number(n??0),detail:r||void 0}}):[]}async function Y(e,t){return await E.request(`user.describe`,{userId:e,displayName:t})}async function X(e){return E.available?(await E.request(`user.bio`,{userId:e})).bio??null:null}async function $u(e){if(!E.available)return{users:[],invalid:[]};try{let t=await wc.readBlock(`/batch-preview`,{method:`POST`,headers:{"Content-Type":`text/plain; charset=utf-8`},body:e});return{users:t.rows.map(e=>J(e)),invalid:ad(t.meta.invalid),error:od(t.meta.error)}}catch{return await E.request(`batch.parse`,{text:e},18e4)}}async function ed(e){return await E.request(`batch.run`,{userIds:e},3e4)}async function td(){await E.request(`batch.stop`)}async function nd(){if(!E.available)return{running:!1,done:0,total:0,failed:0,cancelled:!1,outcomes:[],actions:[]};try{let e=await wc.readBlock(`/batch-state`),t=e.meta;return{running:t.running===`1`,done:Number(t.done??0),total:Number(t.total??0),failed:Number(t.failed??0),cancelled:t.cancelled===`1`,error:od(t.error),outcomes:e.rows.map(e=>({userId:String(e.userId),ok:Number(e.ok)!==0,error:od(e.error)})),actions:ad(t.actions)}}catch{return await E.request(`batch.state`)}}function rd(e){return E.on(t=>{t.type===`batch.progress`&&e(t.data)})}function id(e){return E.on(t=>{if(t.type!==`batch.finished`)return;let n=t.data;nd().then(t=>e({cancelled:t.cancelled,done:t.done,total:t.total,failed:t.failed,error:t.error,outcomes:t.outcomes}),()=>e(n))})}function ad(e){let t=typeof e==`string`?e:``;return t.length>0?t.split(``):[]}function od(e){let t=typeof e==`string`?e:``;return t.length>0?t:void 0}function sd({signedIn:e,onSignIn:t}){let n=O(),[r,i]=(0,_.useState)(Vu),[a,o]=(0,_.useState)(null),[s,c]=(0,_.useState)(()=>Date.now()),l=(0,_.useRef)(!1);(0,_.useEffect)(()=>{let e=!1,t=Yu(t=>{e||(l.current=!0,i(t))});return Ju().then(t=>{!e&&!l.current&&i(t)},()=>{}),()=>{e=!0,t()}},[]),(0,_.useEffect)(()=>{let e=window.setInterval(()=>c(Date.now()),5e3);return()=>window.clearInterval(e)},[]),(0,_.useEffect)(()=>{let e=e=>{let t=e.detail;t&&i(e=>({...e,users:e.users.map(e=>e.userId===t.userId?{...e,whitelisted:t.whitelisted}:e)}))};return window.addEventListener(`antibot:whitelist`,e),()=>window.removeEventListener(`antibot:whitelist`,e)},[]);let{running:u,world:d,users:f,worldName:p,capacity:m,worldId:h=``,worldThumbnail:g,instanceType:v=``,instanceRegion:y=``,instanceNumber:b=``,instanceDisplayName:x=``,instanceRestricted:S=!1,instanceAgeGated:C=!1}=r,ee=pd(h,g),w=a?f.find(e=>e.userId===a)??null:null;return(0,D.jsxs)(xd,{children:[!e&&(0,D.jsxs)(Sd,{children:[(0,D.jsxs)(Cd,{children:[(0,D.jsx)(`strong`,{children:n(`not_signed_in`)}),(0,D.jsx)(`span`,{children:n(`only_vr_chat_s_local_log_is_read_the_player_list_and_instance_details_can_be_wrong_when_more_than_one_client_runs_and_status_platform_and_avatar_names_are_unavailable`)})]}),(0,D.jsx)(wd,{onClick:t,type:`button`,children:n(`sign_in`)})]}),Dc?u?(0,D.jsxs)(D.Fragment,{children:[(0,D.jsxs)(Td,{children:[(0,D.jsx)(Ed,{$src:ee,children:(0,D.jsxs)(Dd,{children:[(0,D.jsx)(kd,{children:n(`world`)}),(0,D.jsx)(Od,{$link:h.length>0,onClick:h?()=>void di(`https://vrchat.com/home/world/${h}`):void 0,title:h?n(`open_on_vrchat_com`):void 0,children:p||d||n(`key`)}),(0,D.jsx)(Ad,{children:(0,D.jsxs)(jd,{children:[y&&(0,D.jsx)(vd,{region:y,t:n}),S&&(0,D.jsx)(Us,{size:12}),C&&(0,D.jsx)(Md,{children:`18+`}),x||yd(v,n),` ⋅ #`,b||n(`key`)]})})]})}),(0,D.jsxs)(Fd,{children:[(0,D.jsx)(`strong`,{children:f.length}),(m??0)>0&&(0,D.jsx)(`span`,{children:n(`capacity_users`,{capacity:m??0})})]})]}),(0,D.jsxs)(Id,{children:[(0,D.jsxs)(Rd,{children:[(0,D.jsx)(`span`,{}),(0,D.jsx)(`span`,{children:n(`user`)}),(0,D.jsx)(`span`,{children:n(`trust`)}),(0,D.jsx)(`span`,{children:n(`pronouns`)}),(0,D.jsx)(`span`,{children:n(`status`)}),(0,D.jsx)(`span`,{children:n(`platform`)}),(0,D.jsx)(`span`,{title:n(`time_in_this_instance`),children:n(`time`)})]}),(0,D.jsx)(zd,{children:f.length===0?(0,D.jsx)(Of,{children:n(`no_players_in_this_instance_yet`)}):f.map(e=>(0,D.jsx)(cd,{user:e,now:s,onSelect:e=>o(e.userId)},e.userId))})]})]}):(0,D.jsx)(bd,{hint:n(`players_appear_here_as_vr_chat_writes_join_and_leave_lines_or_once_an_account_is_signed_in`),title:n(`vr_chat_is_not_running`)}):(0,D.jsx)(bd,{hint:n(`the_list_is_built_by_the_desktop_host`),title:n(`desktop_host_required`)}),w&&(0,D.jsx)(ld,{user:w,now:s,onClose:()=>o(null)})]})}function cd({user:e,now:t,onSelect:n,showTime:r=!0,timeLabel:i,dim:a=!1,tone:o,badge:s,trailing:c}){let l=O(),u=e.iconUrl??e.avatarUrl,d=md(e.status),f=e.threat??0,p=e.profileLoaded??!0,m=o??(e.local?`self`:e.whitelisted?`white`:f>0?`threat`:e.isFriend?`friend`:`none`);return(0,D.jsxs)(Gd,{$tone:m,$threat:f,$showTime:r,$dim:a,"data-user-id":e.userId,"data-whitelisted":e.whitelisted?`true`:`false`,onClick:()=>n(e),children:[(0,D.jsx)(Kd,{children:u?(0,D.jsx)(qd,{$src:u}):p?(0,D.jsx)(Xd,{children:e.name.slice(0,1)}):(0,D.jsx)(Yd,{})}),(0,D.jsx)(tf,{children:(0,D.jsxs)(nf,{children:[(0,D.jsx)(`span`,{title:[e.platform,e.dateJoined&&l(`joined_vr_chat_date`,{date:e.dateJoined})].filter(Boolean).join(` · `),children:e.name}),f>0&&(0,D.jsxs)(af,{$score:f,title:(e.threatReasons??[]).map(e=>`${l(e.text,e.detail?{days:e.detail,years:Math.floor(Number(e.detail)/365)}:void 0)} ${e.weight>0?`+`:``}${e.weight}`).join(` · `),children:[(0,D.jsx)(Js,{size:10}),f]}),s,e.local&&(0,D.jsx)(mf,{children:l(`you`)})]})}),(0,D.jsx)(Qd,{children:p?e.trust?(0,D.jsx)(Z,{$trust:e.trust,children:e.trust}):(0,D.jsx)(ef,{children:l(`key`)}):(0,D.jsx)(Zd,{})}),(0,D.jsx)($d,{children:p?e.pronouns?(0,D.jsx)(rf,{title:e.pronouns,children:e.pronouns}):(0,D.jsx)(ef,{children:l(`key`)}):(0,D.jsx)(Zd,{})}),(0,D.jsx)(uf,{title:e.statusDescription||void 0,children:p?d?(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(df,{$color:d.color}),(0,D.jsx)(`span`,{children:e.statusDescription||l(d.labelKey)})]}):(0,D.jsx)(ef,{children:l(`key`)}):(0,D.jsx)(Zd,{})}),(0,D.jsx)(pf,{title:hd(e.platform,l),children:p?gd(e.platform,l):(0,D.jsx)(Zd,{})}),r&&(0,D.jsx)(_f,{children:c??i??_d(e.joinedAt,t,l)})]})}function ld({user:e,now:t,onClose:n}){let r=O(),[i,a]=(0,_.useState)(e.bio);(0,_.useEffect)(()=>{let e=e=>{e.key===`Escape`&&n()};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[n]),(0,_.useEffect)(()=>{if(e.bio||e.userId.length===0){a(e.bio);return}let t=!1;return X(e.userId).then(e=>{!t&&e&&a(e)},()=>{}),()=>{t=!0}},[e.userId,e.bio]);let o=e.iconUrl??e.avatarUrl,s=md(e.status);return(0,D.jsx)(vf,{onClick:n,children:(0,D.jsxs)(yf,{"data-user-id":e.userId,"data-whitelisted":e.whitelisted?`true`:`false`,onClick:e=>e.stopPropagation(),children:[(0,D.jsx)(bf,{$src:o,children:!o&&e.name.slice(0,1).toUpperCase()}),(0,D.jsxs)(xf,{children:[(0,D.jsx)(`h2`,{children:e.name}),(0,D.jsxs)(Sf,{children:[e.trust&&(0,D.jsx)(Z,{$trust:e.trust,children:e.trust}),e.whitelisted&&(0,D.jsx)(lf,{children:r(`whitelisted`)}),e.local&&(0,D.jsx)(mf,{children:r(`you`)})]}),(0,D.jsxs)(Cf,{children:[(0,D.jsxs)(wf,{children:[(0,D.jsx)(`span`,{children:r(`profile`)}),(0,D.jsxs)(Tf,{onClick:()=>void di(`https://vrchat.com/home/user/${e.userId}`),title:r(`open_on_vrchat_com`),type:`button`,children:[(0,D.jsx)(Ws,{size:12}),r(`open_on_vrchat_com`)]})]}),(0,D.jsx)(fd,{status:s,text:e.statusDescription,t:r}),((e.threat??0)>0||(e.threatReasons?.length??0)>0)&&(0,D.jsxs)(wf,{children:[(0,D.jsx)(`span`,{children:r(`threat`)}),(0,D.jsxs)(of,{children:[(0,D.jsxs)(af,{$score:e.threat??0,children:[(0,D.jsx)(Js,{size:10}),e.threat??0]}),(0,D.jsx)(sf,{children:(e.threatReasons??[]).map(e=>(0,D.jsxs)(cf,{$up:e.weight>0,children:[r(e.text,e.detail?{days:e.detail,years:Math.floor(Number(e.detail)/365)}:void 0),(0,D.jsx)(`b`,{children:e.weight>0?`+${e.weight}`:e.weight})]},e.text))})]})]}),(0,D.jsx)(dd,{label:r(`pronouns`),value:e.pronouns||r(`key`)}),(0,D.jsx)(dd,{label:r(`platform`),value:gd(e.platform,r)}),e.joinedAt&&(0,D.jsx)(dd,{label:r(`in_this_instance`),value:_d(e.joinedAt,t,r)}),(0,D.jsx)(dd,{label:r(`avatar`),value:ud(e,r)}),(0,D.jsx)(dd,{label:r(`vr_chat_account_since`),value:e.dateJoined?new Date(e.dateJoined).toLocaleDateString():r(`key`)}),i&&(0,D.jsx)(Ef,{children:i})]})]}),(0,D.jsx)(Df,{onClick:n,type:`button`,children:`×`})]})})}function ud(e,t){return e.avatarName?e.avatarName:e.isRobot?t(`robot_default`):e.avatarLoaded??!1?t(`unknown`):t(`loading`)}function dd({label:e,value:t}){return(0,D.jsxs)(wf,{children:[(0,D.jsx)(`span`,{children:e}),(0,D.jsx)(`code`,{title:t,children:t})]})}function fd({status:e,text:t,t:n}){let r=t||n(e?e.labelKey:`key`);return(0,D.jsxs)(wf,{children:[(0,D.jsx)(`span`,{children:n(`status`)}),(0,D.jsxs)(ff,{title:r,children:[e&&(0,D.jsx)(df,{$color:e.color}),(0,D.jsx)(`code`,{children:r})]})]})}function pd(e,t){let n=(0,_.useRef)({worldId:``,url:``});return t?n.current={worldId:e,url:t}:n.current.worldId!==e&&(n.current={worldId:e,url:``}),n.current.url}function md(e){switch(e){case`active`:return{labelKey:`online`,color:`#4ade80`};case`join me`:return{labelKey:`join_me`,color:`#60a5fa`};case`ask me`:return{labelKey:`ask_me`,color:`#fbbf24`};case`busy`:return{labelKey:`busy`,color:`#f87171`};case`offline`:return{labelKey:`offline`,color:`#94a3b8`};default:return e&&e.length>0?{labelKey:e,color:`#94a3b8`}:null}}function hd(e,t){return e===`standalonewindows`?t(`pc_includes_both_desktop_and_pcvr_users_vr_chat_does_not_report_which_one`):void 0}function gd(e,t){switch(e){case`standalonewindows`:return t(`pc_vr`);case`android`:return t(`quest`);case`ios`:return t(`i_os`);default:return e&&e.length>0?e:t(`key`)}}function _d(e,t,n){if(!e)return n(`key`);let[r,i,a]=e.split(`:`).map(Number);if([r,i,a].some(Number.isNaN))return e;let o=new Date(t);o.setHours(r,i,a,0),o.getTime()>t&&o.setDate(o.getDate()-1);let s=Math.max(0,Math.floor((t-o.getTime())/1e3)),c=Math.floor(s/3600),l=Math.floor(s%3600/60);return c>0?n(`hours_h_minutes_m`,{hours:c,minutes:l}):n(`minutes_m`,{minutes:l})}function vd({region:e,t}){switch(e.toLowerCase()){case`jp`:return(0,D.jsx)(Nd,{title:t(`japan`),children:(0,D.jsxs)(`svg`,{viewBox:`0 0 30 20`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,D.jsx)(`rect`,{fill:`#fff`,height:`20`,width:`30`}),(0,D.jsx)(`circle`,{cx:`15`,cy:`10`,fill:`#bc002d`,r:`6`})]})});case`us`:case`use`:return(0,D.jsx)(Nd,{title:t(`united_states`),children:(0,D.jsxs)(`svg`,{viewBox:`0 0 30 20`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,D.jsx)(`rect`,{fill:`#fff`,height:`20`,width:`30`}),(0,D.jsx)(`path`,{d:`M0 0h30v1.54H0zM0 3.08h30v1.54H0zM0 6.15h30v1.54H0zM0 9.23h30v1.54H0zM0 12.31h30v1.54H0zM0 15.38h30v1.54H0zM0 18.46h30V20H0z`,fill:`#b22234`}),(0,D.jsx)(`rect`,{fill:`#3c3b6e`,height:`10.77`,width:`12.6`})]})});case`eu`:return(0,D.jsx)(Nd,{title:t(`europe`),children:(0,D.jsxs)(`svg`,{viewBox:`0 0 30 20`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,D.jsx)(`rect`,{fill:`#003399`,height:`20`,width:`30`}),Array.from({length:12},(e,t)=>{let n=t/12*Math.PI*2;return(0,D.jsx)(`circle`,{cx:15+Math.cos(n)*4.6,cy:10+Math.sin(n)*4.6,fill:`#ffcc00`,r:`0.9`},t)})]})});default:return(0,D.jsx)(Pd,{children:e.toUpperCase()})}}function yd(e,t){switch(e){case`public`:return t(`public`);case`friends`:return t(`friends`);case`friends+`:case`hidden`:return t(`friends_2`);case`invite`:case`private`:return t(`invite`);case`invite+`:return t(`invite_2`);case`group`:return t(`group`);default:if(e?.startsWith(`group:`)){let n=e.slice(6);return t(n===`public`?`group_public`:n===`plus`?`group_2`:`group_members`)}return e&&e.length>0?e:t(`instance`)}}function bd({title:e,hint:t,children:n}){return(0,D.jsxs)(kf,{children:[(0,D.jsx)(Is,{size:28}),(0,D.jsx)(`h2`,{children:e}),(0,D.jsx)(`p`,{children:t}),n]})}var xd=K.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 14px;
    min-height: 0;
`,Sd=K.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 12px 14px;
    border: 1px solid rgba(251, 191, 36, 0.35);
    border-radius: var(--radius-md);
    background: rgba(251, 191, 36, 0.08);
`,Cd=K.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;

    strong {
        font-size: 12px;
        color: #fbbf24;
    }

    span {
        font-size: 11px;
        line-height: 1.5;
        color: var(--text-secondary);
    }
`,wd=K.button`
    flex-shrink: 0;
    padding: 7px 12px;
    border: 1px solid rgba(251, 191, 36, 0.45);
    border-radius: var(--radius-sm);
    background: rgba(251, 191, 36, 0.12);
    color: #fbbf24;
    font: inherit;
    font-size: 11px;
    cursor: pointer;

    &:hover {
        background: rgba(251, 191, 36, 0.2);
    }
`,Td=K.section`
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    gap: 18px;
    overflow: hidden;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`,Ed=K.div`
    position: relative;
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 0;
    overflow: hidden;

    /* The thumbnail is the card's backdrop: full on the left, fading out before the middle. */

    &::before {
        content: "";
        position: absolute;
        inset: 0 auto 0 0;
        width: max(24%, 380px);
        background-image: ${({$src:e})=>e?`url("${e}")`:`none`};
        background-position: center;
        background-size: cover;
        opacity: 0.75;
        mask-image: linear-gradient(90deg, #000 0%, #000 45%, transparent 100%);
        -webkit-mask-image: linear-gradient(90deg, #000 0%, #000 45%, transparent 100%);
    }

    /* Keeps the text readable over the picture. */

    &::after {
        content: "";
        position: absolute;
        inset: 0 auto 0 0;
        width: max(40%, 560px);
        background: linear-gradient(90deg,
        var(--scrim-strong) 0%,
        var(--scrim-medium) 55%,
        var(--scrim-clear) 100%);
    }
`,Dd=K.div`
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
    padding: 14px 16px;
`,Od=K.h2`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 16px;
    font-weight: 600;
    letter-spacing: -0.01em;
    cursor: ${({$link:e})=>e?`pointer`:`default`};

    &:hover {
        color: ${({$link:e})=>e?`var(--accent-primary)`:`inherit`};
    }
`,kd=K.span`
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
`,Ad=K.div`
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
`,jd=K.span`
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 2px 8px;
    border: 1px solid var(--border-color);
    border-radius: 999px;
    background: transparent;
    color: var(--text-secondary);
    font-family: var(--font-mono);
    font-size: 10px;
`,Md=K.span`
    padding: 0 4px;
    border-radius: 3px;
    background: rgba(248, 113, 113, 0.16);
    color: #fca5a5;
    font-size: 9px;
`,Nd=K.span`
    display: inline-flex;
    width: 15px;
    height: 10px;
    flex-shrink: 0;
    border-radius: 2px;
    overflow: hidden;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.18);

    svg {
        display: block;
        width: 100%;
        height: 100%;
    }
`,Pd=K.span`
    font-family: var(--font-mono);
    font-size: 9px;
    color: var(--text-muted);
`,Fd=K.div`
    display: flex;
    align-items: baseline;
    justify-content: flex-end;
    align-self: center;
    gap: 7px;
    flex-shrink: 0;
    padding: 14px 18px;
    white-space: nowrap;
    font-family: var(--font-mono);

    strong {
        font-size: 22px;
        font-weight: 600;
        color: var(--accent-primary);
    }

    span {
        font-size: 12px;
        letter-spacing: 0.02em;
        color: var(--text-muted);
    }
`,Id=K.section`
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`,Ld=e=>e?`34px minmax(110px, 1.1fr) 0.7fr 0.9fr 1.6fr 0.8fr minmax(64px, 0.5fr)`:`34px minmax(110px, 1.1fr) 0.7fr 0.9fr 1.6fr 0.8fr`,Rd=K.div`
    display: grid;
    grid-template-columns: ${Ld(!0)};
    gap: 8px;
    padding: 10px 16px;
    border-bottom: 1px solid var(--border-color);
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.1em;
    text-transform: uppercase;

    span {
        white-space: nowrap;
    }

    span:nth-last-child(2) {
        text-align: center;
    }

    span:last-child {
        text-align: right;
    }
`,zd=K.div`
    flex: 1;
    min-height: 0;
    overflow-y: auto;
`;function Bd(e,t=!1){switch(e){case`self`:return t?`rgba(167, 139, 250, 0.16)`:`rgba(167, 139, 250, 0.09)`;case`friend`:return t?`rgba(255, 204, 0, 0.16)`:`rgba(255, 204, 0, 0.09)`;case`white`:return t?`rgba(255, 255, 255, 0.16)`:`rgba(255, 255, 255, 0.10)`;default:return t?`rgba(167, 139, 250, 0.06)`:`transparent`}}function Vd(e,t=!1){return`rgba(255, 0, 0, ${((Math.min(Math.max(e,0),100)/100)**1.8*.7+(t?.08:0)).toFixed(3)})`}function Hd(e,t=0){switch(e){case`self`:return`var(--accent-primary)`;case`friend`:return`#ffcc00`;case`white`:return`rgba(255, 255, 255, 0.5)`;case`threat`:return`rgba(255, 0, 0, ${(.1+Math.min(Math.max(t,0),100)/100*.9).toFixed(3)})`;default:return`transparent`}}function Ud(e){return`hsl(${(48-Math.max(0,Math.min(100,e))/100*48).toFixed(0)}, 92%, 62%)`}function Wd(e){return`hsla(${(48-Math.max(0,Math.min(100,e))/100*48).toFixed(0)}, 92%, 62%, 0.14)`}var Gd=K.div`
    display: grid;
    grid-template-columns: ${({$showTime:e})=>Ld(e)};
    gap: 8px;
    align-items: center;
    padding: 8px 16px;
    opacity: ${({$dim:e})=>e?.55:1};
    background: ${({$tone:e,$threat:t})=>e===`threat`?Vd(t):Bd(e)};
    border-left: 2px solid ${({$tone:e,$threat:t})=>Hd(e,t)};
    border-bottom: 1px solid var(--border-color);
    cursor: pointer;

    &:last-child {
        border-bottom: 0;
    }

    &:hover {
        background: ${({$tone:e,$threat:t})=>e===`threat`?Vd(t,!0):Bd(e,!0)};
    }
`,Kd=K.span`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`,qd=K.span`
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: var(--bg-primary) center / cover no-repeat;
    background-image: ${({$src:e})=>e?`url("${e}")`:`none`};
    box-shadow: inset 0 0 0 1px var(--border-color);
`,Jd=bs`
    0%, 100% {
        opacity: 0.25;
    }
    50% {
        opacity: 0.65;
    }
`,Yd=K.span`
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: var(--text-muted);
    animation: ${Jd} 1.4s ease-in-out infinite;
`,Xd=K.span`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: var(--bg-primary);
    box-shadow: inset 0 0 0 1px var(--border-color);
    color: var(--text-muted);
    font-size: 12px;
    font-weight: 600;
    text-transform: uppercase;
`,Zd=K.span`
    display: block;
    width: 62%;
    height: 8px;
    border-radius: 999px;
    background: var(--text-muted);
    animation: ${Jd} 1.4s ease-in-out infinite;
`,Qd=K.span`
    display: flex;
    align-items: center;
    min-width: 0;
`,$d=K.span`
    display: flex;
    align-items: center;
    min-width: 0;
    overflow: hidden;
`,ef=K.span`
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 10.5px;
`,tf=K.span`
    display: flex;
    align-items: center;
    gap: 9px;
    min-width: 0;
    font-size: 12.5px;
    font-weight: 500;
`,nf=K.span`
    display: flex;
    align-items: center;
    gap: 7px;
    min-width: 0;

    > span:first-child {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`,rf=K.span`
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    padding: 1px 6px;
    border-radius: 999px;
    background: rgba(96, 165, 250, 0.12);
    color: #93c5fd;
    font-family: var(--font-mono);
    font-size: 9px;
    text-overflow: ellipsis;
    white-space: nowrap;
`,af=K.span`
    display: inline-flex;
    align-items: center;
    gap: 3px;
    padding: 1px 6px;
    border-radius: 999px;
    background: ${({$score:e})=>Wd(e)};
    color: ${({$score:e})=>Ud(e)};
    font-family: var(--font-mono);
    font-size: 9px;
    font-weight: 600;
    white-space: nowrap;
`,of=K.div`
    display: flex;
    align-items: flex-start;
    gap: 8px;
    min-width: 0;
`,sf=K.div`
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    min-width: 0;
`,cf=K.span`
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 1px 7px;
    border-radius: 999px;
    background: ${({$up:e})=>e?`rgba(248, 113, 113, 0.16)`:`rgba(74, 222, 128, 0.16)`};
    color: ${({$up:e})=>e?`#fca5a5`:`#86efac`};
    font-family: var(--font-mono);
    font-size: 10px;
    line-height: 1.6;

    b {
        font-weight: 600;
    }
`,lf=K.span`
    padding: 1px 7px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.12);
    color: #fff;
    font-family: var(--font-mono);
    font-size: 9px;
`,uf=K.span`
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;
    font-size: 11px;
    color: var(--text-secondary);
    white-space: nowrap;

    span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`,df=K.span`
    width: 8px;
    height: 8px;
    flex-shrink: 0;
    border-radius: 50%;
    background: ${({$color:e})=>e};
    box-shadow: 0 0 6px ${({$color:e})=>e};
`,ff=K.div`
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;

    code {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`,pf=K.span`
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--text-secondary);
    font-size: 11px;
`,Z=K.span`
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    padding: 1px 6px;
    flex-shrink: 0;
    border-radius: 999px;
    background: ${({$trust:e})=>gf(e)};
    color: ${({$trust:e})=>hf(e)};
    font-family: var(--font-mono);
    font-size: 9px;
    text-overflow: ellipsis;
    white-space: nowrap;
`,mf=K.span`
    padding: 1px 6px;
    border-radius: 999px;
    background: rgba(167, 139, 250, 0.16);
    color: var(--accent-primary);
    font-family: var(--font-mono);
    font-size: 9px;
`;function hf(e){switch(e){case`Trusted User`:return`#c4b5fd`;case`Known User`:return`#93c5fd`;case`user`:return`#86efac`;case`new_user`:return`#fcd34d`;case`nuisance`:return`#fb7185`;default:return`#94a3b8`}}function gf(e){switch(e){case`Trusted User`:return`rgba(167, 139, 250, 0.16)`;case`Known User`:return`rgba(96, 165, 250, 0.16)`;case`user`:return`rgba(74, 222, 128, 0.14)`;case`new_user`:return`rgba(250, 204, 21, 0.14)`;case`nuisance`:return`rgba(251, 113, 133, 0.16)`;default:return`rgba(148, 163, 184, 0.14)`}}var _f=K.span`
    text-align: right;
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 10.5px;
`,vf=K.div`
    position: fixed;
    inset: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: rgba(6, 4, 12, 0.72);
    backdrop-filter: blur(3px);
`,yf=K.div`
    position: relative;
    display: flex;
    gap: 22px;
    width: 100%;
    max-width: 700px;
    max-height: 100%;
    overflow-y: auto;
    padding: 22px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.45);
`,bf=K.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 220px;
    height: 220px;
    flex-shrink: 0;
    border-radius: var(--radius-md);
    background: var(--bg-primary) center / cover no-repeat;
    background-image: ${({$src:e})=>e?`url("${e}")`:`none`};
    box-shadow: inset 0 0 0 1px var(--border-color);
    color: ${({$src:e})=>e?`transparent`:`var(--text-muted)`};
    font-size: 44px;
    font-weight: 600;
`,xf=K.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 0;

    h2 {
        font-size: 17px;
        font-weight: 600;
    }
`,Sf=K.div`
    display: flex;
    gap: 6px;
`,Cf=K.dl`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 4px;
`,wf=K.div`
    display: flex;
    flex-direction: column;
    gap: 2px;

    span {
        font-size: 9px;
        font-weight: 600;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        color: var(--text-muted);
    }

    code {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        color: var(--text-secondary);
        font-family: var(--font-mono);
        font-size: 11px;
        user-select: text;
    }
`,Tf=K.button`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    align-self: flex-start;
    padding: 4px 9px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--text-secondary);
    font: inherit;
    font-size: 10.5px;
    cursor: pointer;

    svg {
        flex-shrink: 0;
    }

    &:hover {
        border-color: var(--border-color-hover);
        color: var(--accent-primary);
    }
`,Ef=K.p`
    margin-top: 2px;
    padding: 8px 10px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: var(--bg-input);
    color: var(--text-secondary);
    font-size: 11px;
    line-height: 1.55;
    white-space: pre-wrap;
    overflow-wrap: anywhere;
    user-select: text;
`,Df=K.button`
    position: absolute;
    top: 10px;
    right: 10px;
    width: 26px;
    height: 26px;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: var(--text-muted);
    font-size: 18px;
    line-height: 1;
    cursor: pointer;

    &:hover {
        background: var(--bg-card-hover);
        color: var(--text-primary);
    }
`,Of=K.div`
    padding: 32px;
    text-align: center;
    color: var(--text-muted);
    font-size: 12px;
`,kf=K.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 30px;
    text-align: center;

    svg {
        color: var(--text-muted);
    }

    h2 {
        font-size: 14px;
        font-weight: 600;
    }

    p {
        max-width: 460px;
        font-size: 12px;
        line-height: 1.65;
        color: var(--text-muted);
    }
`;function Af({signedIn:e,onSignIn:t}){let n=O(),[r,i]=(0,_.useState)(``),[a,o]=(0,_.useState)([]),[s,c]=(0,_.useState)([]),[l,u]=(0,_.useState)(``),[d,f]=(0,_.useState)(!1),[p,m]=(0,_.useState)(!1),[h,g]=(0,_.useState)(!1),[v,y]=(0,_.useState)(0),[b,x]=(0,_.useState)(0),[S,C]=(0,_.useState)(0),[ee,w]=(0,_.useState)([]),[te,T]=(0,_.useState)(null),[ne,re]=(0,_.useState)(null),ie=Date.now();(0,_.useEffect)(()=>{let e=!1;nd().then(t=>{e||(g(t.running),y(t.done),x(t.total),C(t.failed),w(t.actions??[]),!t.running&&t.total>0&&T({cancelled:t.cancelled,done:t.done,total:t.total,failed:t.failed,error:t.error,outcomes:t.outcomes??[]}))},()=>{});let t=rd(e=>{g(e.running),y(e.done),x(e.total),C(e.failed)}),n=id(e=>{g(!1),m(!1),y(e.done),x(e.total),C(e.failed),T(e)});return()=>{e=!0,t(),n()}},[]);let ae=async()=>{f(!0),u(``),T(null),o([]),c([]),y(0),x(0),C(0),w([]);try{let e=await $u(r);o(e.users),c(e.invalid),e.error?u(e.error):e.users.length===0&&u(n(`no_valid_user_links_were_found`))}catch(e){u(e instanceof Error?e.message:String(e))}finally{f(!1)}},oe=async()=>{u(``),T(null);try{let e=await ed(a.map(e=>e.userId));if(!e.started){u(e.error??``);return}g(!0),y(0),x(e.total),C(0),w(e.actions??[])}catch(e){u(e instanceof Error?e.message:String(e))}},se=async()=>{m(!0);try{await td()}catch(e){u(e instanceof Error?e.message:String(e)),m(!1)}},E=b>0?Math.min(100,Math.round(v/b*100)):0;return(0,D.jsxs)(jf,{children:[!e&&(0,D.jsxs)(Gf,{children:[(0,D.jsxs)(Kf,{children:[(0,D.jsx)(`strong`,{children:n(`not_signed_in`)}),(0,D.jsx)(`span`,{children:n(`sign_in_first`)})]}),(0,D.jsx)(qf,{onClick:t,type:`button`,children:n(`sign_in`)})]}),(0,D.jsxs)(Mf,{children:[(0,D.jsxs)(Nf,{children:[(0,D.jsx)(qs,{size:20}),(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`h2`,{children:n(`batch_actions`)}),(0,D.jsx)(`p`,{children:n(`apply_the_moderation_actions_enabled_under_automatic_protection_to_a_list_of_vr_chat_users`)})]})]}),(0,D.jsx)(Pf,{disabled:d||h,onChange:e=>{i(e.target.value),o([]),c([]),T(null),u(``)},placeholder:`https://vrchat.com/home/user/usr_…
usr_…`,spellCheck:!1,value:r}),(0,D.jsxs)(Ff,{children:[(0,D.jsx)(Yf,{disabled:d||h||r.trim().length===0||!e,onClick:()=>void ae(),type:`button`,children:n(d?`parsing`:`parse_links`)}),(0,D.jsx)(Xf,{disabled:h||d||a.length===0||!e,onClick:()=>void oe(),type:`button`,children:n(`batch_block`)}),h&&(0,D.jsx)(Xf,{disabled:p,onClick:()=>void se(),type:`button`,children:n(`stop`)}),(0,D.jsx)(If,{children:n(`actions_follow_the_switches_under_automatic_protection`)})]}),l&&(0,D.jsx)(Lf,{children:l})]}),s.length>0&&(0,D.jsxs)(Mf,{children:[(0,D.jsxs)(Nf,{children:[(0,D.jsx)(Js,{size:18}),(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`h2`,{children:n(`invalid_lines`)}),(0,D.jsx)(`p`,{children:n(`these_lines_did_not_contain_a_user_link`)})]})]}),(0,D.jsx)(Rf,{children:s.map((e,t)=>(0,D.jsx)(`li`,{title:e,children:e},`${t}-${e}`))})]}),(h||b>0)&&(0,D.jsxs)(Mf,{children:[(0,D.jsxs)(zf,{children:[(0,D.jsx)(`span`,{children:n(`progress`)}),(0,D.jsxs)(`span`,{children:[v,` / `,b,S>0&&` · ${S} ${n(`failed`)}`]})]}),(0,D.jsx)(Bf,{children:(0,D.jsx)(Vf,{$percent:E})}),(0,D.jsxs)(Q,{children:[ee.length>0&&(0,D.jsx)(`span`,{children:ee.map(e=>n(e)).join(` · `)}),te&&!h&&(0,D.jsxs)(`span`,{children:[te.cancelled?n(`stopped`):n(`done`),te.error&&` · ${te.error}`]})]})]}),a.length>0&&(0,D.jsxs)(Hf,{children:[(0,D.jsxs)(Uf,{children:[(0,D.jsx)(`span`,{}),(0,D.jsx)(`span`,{children:n(`user`)}),(0,D.jsx)(`span`,{children:n(`trust`)}),(0,D.jsx)(`span`,{children:n(`pronouns`)}),(0,D.jsx)(`span`,{children:n(`status`)}),(0,D.jsx)(`span`,{children:n(`platform`)})]}),(0,D.jsx)(Wf,{children:a.map(e=>(0,D.jsx)(cd,{now:ie,onSelect:re,showTime:!1,user:e},e.userId))})]}),ne&&(0,D.jsx)(ld,{now:ie,onClose:()=>re(null),user:ne})]})}var jf=K.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 14px;
    min-height: 0;
`,Mf=K.section`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`,Nf=K.div`
    display: flex;
    align-items: flex-start;
    gap: 10px;

    svg {
        flex-shrink: 0;
        margin-top: 2px;
        color: var(--accent-primary);
    }

    h2 {
        font-size: 14px;
        font-weight: 600;
    }

    p {
        margin-top: 3px;
        font-size: 11px;
        line-height: 1.5;
        color: var(--text-secondary);
    }
`,Pf=K.textarea`
    width: 100%;
    min-height: 132px;
    padding: 10px 12px;
    resize: vertical;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: var(--bg-primary);
    color: var(--text-primary);
    font-family: var(--font-mono);
    font-size: 11px;
    line-height: 1.6;

    &:focus {
        outline: none;
        border-color: var(--border-color-focus);
    }

    &:disabled {
        opacity: 0.55;
    }
`,Ff=K.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
`,If=K.span`
    font-size: 11px;
    color: var(--text-muted);
`,Lf=K.p`
    font-size: 11px;
    line-height: 1.5;
    color: #f87171;
`,Rf=K.ul`
    max-height: 130px;
    margin: 0;
    padding: 0;
    overflow-y: auto;
    list-style: none;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-secondary);

    li {
        overflow: hidden;
        padding: 3px 0;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`,zf=K.div`
    display: flex;
    justify-content: space-between;
    gap: 12px;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-secondary);
`,Bf=K.div`
    height: 8px;
    overflow: hidden;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
`,Vf=K.div`
    width: ${({$percent:e})=>`${e}%`};
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, rgba(167, 139, 250, 0.7), var(--accent-primary));
    transition: width 220ms ease;
`,Q=K.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 8px;
    font-size: 11px;
    color: var(--text-muted);
`,Hf=K.section`
    display: flex;
    flex-direction: column;
    max-height: 48vh;
    min-height: 140px;
    overflow: hidden;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`,Uf=K.div`
    display: grid;
    grid-template-columns: ${Ld(!1)};
    gap: 8px;
    padding: 10px 16px;
    border-bottom: 1px solid var(--border-color);
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.1em;
    text-transform: uppercase;

    span {
        white-space: nowrap;
    }
`,Wf=K.div`
    flex: 1;
    min-height: 0;
    overflow-y: auto;
`,Gf=K.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 12px 14px;
    border: 1px solid rgba(251, 191, 36, 0.35);
    border-radius: var(--radius-md);
    background: rgba(251, 191, 36, 0.08);
`,Kf=K.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;

    strong {
        font-size: 12px;
        color: #fbbf24;
    }

    span {
        font-size: 11px;
        line-height: 1.5;
        color: var(--text-secondary);
    }
`,qf=K.button`
    flex-shrink: 0;
    padding: 7px 12px;
    border: 1px solid rgba(251, 191, 36, 0.45);
    border-radius: var(--radius-sm);
    background: rgba(251, 191, 36, 0.12);
    color: #fbbf24;
    font: inherit;
    font-size: 11px;
    font-weight: 600;
    cursor: pointer;

    &:hover {
        background: rgba(251, 191, 36, 0.2);
    }
`,Jf=K.button`
    padding: 8px 14px;
    border: 1px solid ${({$primary:e})=>e?`transparent`:`var(--border-color)`};
    border-radius: var(--radius-sm);
    background: ${({$primary:e})=>e?`var(--accent-primary)`:`transparent`};
    color: ${({$primary:e})=>e?`#0b0714`:`var(--text-primary)`};
    font: inherit;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;

    &:disabled {
        opacity: 0.5;
        cursor: default;
    }

    &:hover:not(:disabled) {
        background: ${({$primary:e})=>e?`var(--accent-primary)`:`var(--bg-card-hover)`};
    }
`,Yf=K(Jf).attrs({$primary:!0})``,Xf=K(Jf).attrs({$primary:!1})``;async function Zf(){return E.available?await $():[]}function Qf(e){return E.on(t=>{t.type===`bots.changed`&&$().then(e,()=>{})})}async function $f(e){E.available&&await E.request(`bots.remove`,{userId:e})}async function ep(e){return E.available?await E.request(`bots.export`,{format:e}):{saved:!1,count:0}}async function $(){return(await Tc(`/bots`)).rows.map(e=>({userId:String(e.userId??``),displayName:String(e.name??``),threat:Number(e.threat??0),reasons:Qu(String(e.reasons??``)),avatarUrl:String(e.avatar??``)||void 0,trust:String(e.trust??``)||void 0,platform:String(e.platform??``)||void 0,dateJoined:String(e.dateJoined??``)||void 0,firstSeen:Number(e.firstSeen??0),lastSeen:Number(e.lastSeen??0),sightings:Number(e.sightings??0)}))}function tp({signedIn:e}){let t=O(),n=k(),[r,i]=(0,_.useState)([]),[a,o]=(0,_.useState)(!1),[s,c]=(0,_.useState)(null),[l,u]=(0,_.useState)(!1),[d,f]=(0,_.useState)(null),p=(0,_.useRef)(!1);(0,_.useEffect)(()=>{let e=!1,t=Qf(t=>{e||(p.current=!0,i(t))});return Zf().then(t=>{!e&&!p.current&&i(t)},()=>{}),()=>{e=!0,t()}},[]);let m=e=>{u(!0),f(null),ep(e).then(e=>{f({ok:e.saved,text:e.saved?t(`exported_count_bots_to_path`,{count:e.count,path:e.path??``}):t(`error.bots_export`)})},e=>{f({ok:!1,text:e instanceof Error?e.message:String(e)})}).finally(()=>{u(!1),window.setTimeout(()=>f(null),6e3)})},h=e=>{i(t=>t.filter(t=>t.userId!==e.userId)),$f(e.userId).then(()=>void 0,()=>{Zf().then(i,()=>void 0)})};return(0,D.jsxs)(sp,{children:[(0,D.jsxs)(cp,{children:[(0,D.jsxs)(lp,{children:[(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`h2`,{children:t(`bot_list`)}),(0,D.jsx)(`p`,{children:t(`every_account_anti_bot_has_detected_as_a_bot_newest_first_and_repeats_are_merged`)}),!e&&(0,D.jsx)(up,{children:t(`bots_are_found_from_the_name_avatar_and_profile_while_signed_out_only_the_log_based_checks_run`)})]}),(0,D.jsxs)(dp,{children:[(0,D.jsx)(fp,{children:t(`count_bot_s`,{count:r.length})}),(0,D.jsx)(pp,{disabled:r.length===0||l,onClick:()=>m(`json`),type:`button`,children:t(`export_as_json`)}),(0,D.jsx)(pp,{disabled:r.length===0||l,onClick:()=>m(`csv`),type:`button`,children:t(`export_as_csv`)}),(0,D.jsx)(mp,{$editing:a,onClick:()=>o(e=>!e),type:`button`,children:t(a?`done`:`edit`)})]})]}),a&&(0,D.jsx)(hp,{children:t(`only_edit_mode_can_remove_a_bot_so_an_accidental_click_cannot_delete_it`)}),d&&(0,D.jsx)(gp,{$ok:d.ok,children:d.text}),(0,D.jsxs)(_p,{$editing:a,children:[(0,D.jsx)(`span`,{}),(0,D.jsx)(`span`,{children:t(`user`)}),(0,D.jsx)(`span`,{children:t(`threat`)}),(0,D.jsx)(`span`,{children:t(`trust`)}),(0,D.jsx)(`span`,{children:t(`platform`)}),(0,D.jsx)(`span`,{children:t(`last_seen`)}),(0,D.jsx)(`span`,{children:t(`times_seen`)}),a&&(0,D.jsx)(`span`,{})]}),(0,D.jsx)(vp,{children:r.length===0?(0,D.jsx)(kp,{children:t(`no_bots_detected_yet`)}):r.map(e=>(0,D.jsxs)(yp,{$editing:a,"data-user-id":e.userId,onClick:()=>{a||c(np(e))},children:[(0,D.jsx)(bp,{children:e.avatarUrl?(0,D.jsx)(xp,{$src:e.avatarUrl}):(0,D.jsx)(Sp,{children:e.displayName.slice(0,1)})}),(0,D.jsxs)(Cp,{children:[(0,D.jsx)(wp,{title:e.dateJoined?t(`joined_vr_chat_date`,{date:e.dateJoined}):void 0,children:e.displayName||t(`unknown_user`)}),(0,D.jsx)(Tp,{title:`${t(`reasons`)}: ${rp(e.reasons,t)}`,children:ip(e.reasons,t)})]}),(0,D.jsx)(Ep,{$score:e.threat,children:e.threat}),(0,D.jsx)(Dp,{children:e.trust||`—`}),(0,D.jsx)(Dp,{children:gd(e.platform,t)}),(0,D.jsx)(Dp,{title:`${t(`first_seen`)}: ${op(e.firstSeen,n)}`,children:op(e.lastSeen,n)}),(0,D.jsx)(Dp,{children:e.sightings}),a&&(0,D.jsxs)(Op,{onClick:t=>{t.stopPropagation(),h(e)},title:t(`remove`),type:`button`,children:[(0,D.jsx)(Ns,{size:12}),t(`remove`)]})]},e.userId))})]}),s&&(0,D.jsx)(ld,{user:s,now:Date.now(),onClose:()=>c(null)})]})}function np(e){return{userId:e.userId,name:e.displayName,local:!1,joinedAt:``,avatarUrl:e.avatarUrl,iconUrl:e.avatarUrl,trust:e.trust,platform:e.platform,dateJoined:e.dateJoined,threat:e.threat,threatReasons:e.reasons,profileLoaded:!0,avatarLoaded:!0}}function rp(e,t){return e.map(e=>`${ap(e,t)} ${e.weight>0?`+`:``}${e.weight}`).join(` · `)}function ip(e,t){return e.map(e=>t(e.text,e.detail?{days:e.detail,years:Math.floor(Number(e.detail)/365)}:void 0)).join(` · `)}function ap(e,t){return t(e.text,e.detail?{days:e.detail,years:Math.floor(Number(e.detail)/365)}:void 0)}function op(e,t){return new Date(e).toLocaleString(t,{year:`numeric`,month:`short`,day:`numeric`,hour:`2-digit`,minute:`2-digit`})}var sp=K.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
`,cp=K.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`,lp=K.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    padding: 14px 16px;
    border-bottom: 1px solid var(--border-color);

    h2 {
        font-size: 14px;
        font-weight: 600;
    }

    p {
        margin-top: 2px;
        font-size: 11px;
        color: var(--text-secondary);
    }
`,up=K.p`
    margin-top: 5px !important;
    color: var(--text-muted) !important;
`,dp=K.div`
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
`,fp=K.span`
    flex-shrink: 0;
    font-family: var(--font-mono);
    font-size: 9.5px;
    color: var(--text-muted);
`,pp=K.button`
    padding: 5px 9px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--text-secondary);
    font: inherit;
    font-size: 10px;
    white-space: nowrap;
    cursor: pointer;

    &:hover:not(:disabled) {
        border-color: var(--border-color-hover);
        color: var(--text-primary);
    }

    &:disabled {
        opacity: 0.45;
        cursor: default;
    }
`,mp=K.button`
    padding: 5px 10px;
    border: 1px solid ${({$editing:e})=>e?`rgba(251, 113, 133, 0.6)`:`var(--border-color)`};
    border-radius: var(--radius-sm);
    background: ${({$editing:e})=>e?`rgba(251, 113, 133, 0.12)`:`transparent`};
    color: ${({$editing:e})=>e?`#fb7185`:`var(--text-secondary)`};
    font: inherit;
    font-size: 10px;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
        border-color: var(--border-color-hover);
        color: var(--text-primary);
    }
`,hp=K.p`
    margin: 0;
    padding: 7px 16px;
    border-bottom: 1px solid var(--border-color);
    font-size: 10px;
    color: #fb7185;
`,gp=K.div`
    margin: 10px 16px 0;
    padding: 8px 12px;
    border: 1px solid ${({$ok:e})=>e?`rgba(74, 222, 128, 0.45)`:`rgba(251, 113, 133, 0.45)`};
    border-radius: var(--radius-sm);
    background: ${({$ok:e})=>e?`rgba(74, 222, 128, 0.1)`:`rgba(251, 113, 133, 0.1)`};
    color: ${({$ok:e})=>e?`#4ade80`:`#fb7185`};
    font-size: 11px;
`,_p=K.div`
    display: grid;
    grid-template-columns: ${({$editing:e})=>e?`32px minmax(0, 1.4fr) 56px 92px 96px 138px 64px 92px`:`32px minmax(0, 1.4fr) 56px 92px 96px 138px 64px`};
    gap: 10px;
    align-items: center;
    padding: 7px 16px;
    border-bottom: 1px solid var(--border-color);
    font-size: 9.5px;
    color: var(--text-muted);
`,vp=K.div`
    flex: 1;
    min-height: 0;
    overflow-y: auto;
`,yp=K.div`
    display: grid;
    grid-template-columns: ${({$editing:e})=>e?`32px minmax(0, 1.4fr) 56px 92px 96px 138px 64px 92px`:`32px minmax(0, 1.4fr) 56px 92px 96px 138px 64px`};
    gap: 10px;
    align-items: center;
    padding: 8px 16px;
    border-bottom: 1px solid var(--border-color);
    cursor: ${({$editing:e})=>e?`default`:`pointer`};

    &:last-child {
        border-bottom: 0;
    }

    &:hover {
        background: ${({$editing:e})=>e?`transparent`:`rgba(167, 139, 250, 0.06)`};
    }
`,bp=K.span`
    display: flex;
    align-items: center;
    justify-content: center;
`,xp=K.span`
    display: block;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: var(--bg-primary) center / cover no-repeat;
    background-image: ${({$src:e})=>e?`url("${e}")`:`none`};
    box-shadow: inset 0 0 0 1px var(--border-color);
`,Sp=K(xp)`
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--text-muted);
    font-size: 11px;
    font-weight: 600;
`,Cp=K.span`
    display: flex;
    flex-direction: column;
    gap: 2px;
    min-width: 0;
`,wp=K.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 11.5px;
`,Tp=K.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 9.5px;
    color: var(--text-muted);
`,Ep=K.span`
    justify-self: start;
    padding: 2px 7px;
    border-radius: 999px;
    background: ${({$score:e})=>e>=100?`rgba(251, 113, 133, 0.18)`:`rgba(251, 191, 36, 0.16)`};
    color: ${({$score:e})=>e>=100?`#fb7185`:`#fbbf24`};
    font-family: var(--font-mono);
    font-size: 9.5px;
    font-weight: 600;
`,Dp=K.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 10px;
    color: var(--text-secondary);
`,Op=K.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 3px 7px;
    border: 1px solid rgba(251, 113, 133, 0.45);
    border-radius: var(--radius-sm);
    background: rgba(251, 113, 133, 0.1);
    color: #fb7185;
    font: inherit;
    font-size: 9.5px;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
        background: rgba(251, 113, 133, 0.2);
    }
`,kp=K.p`
    padding: 26px 16px;
    text-align: center;
    font-size: 11.5px;
    color: var(--text-muted);
`;async function Ap(e){return await E.request(`debug.user`,{userId:e},6e4)}async function jp(){return(await E.request(`debug.closeVrchat`,void 0,6e4)).ok}async function Mp(){return await E.request(`debug.safeMode`,void 0,3e4)}async function Np(){return await E.request(`debug.avatar`,void 0,3e4)}async function Pp(){return(await E.request(`debug.fakeInstance`,void 0,3e4)).on}async function Fp(){return(await E.request(`debug.fakeOperations`,void 0,3e4)).on}async function Ip(){return await E.request(`osc.status`)}async function Lp(e){return await E.request(`osc.test`,{port:e},15e3)}function Rp(){return(0,D.jsxs)(Gp,{children:[(0,D.jsx)(zp,{}),(0,D.jsx)(Bp,{}),(0,D.jsx)(Hp,{}),(0,D.jsx)(Up,{}),(0,D.jsx)(Wp,{})]})}function zp(){let e=O(),[t,n]=(0,_.useState)(null),[r,i]=(0,_.useState)(null),[a,o]=(0,_.useState)(null),[s,c]=(0,_.useState)(``),l=async e=>{o(e),c(``);try{let t=e===`instance`?await Pp():await Fp();e===`instance`?n(t):i(t)}catch(e){c(e instanceof Error?e.message:String(e))}finally{o(null)}};return(0,D.jsxs)(Kp,{children:[(0,D.jsx)(`h2`,{children:e(`fake_data`)}),(0,D.jsx)(`p`,{children:e(`placeholder_players_and_actions_for_screenshots_nothing_is_stored`)}),(0,D.jsxs)(Jp,{children:[(0,D.jsx)(Zp,{disabled:a!==null,onClick:()=>void l(`instance`),type:`button`,children:e(a===`instance`?`working`:`fake_instance_list`)}),(0,D.jsx)(Zp,{disabled:a!==null,onClick:()=>void l(`operations`),type:`button`,children:e(a===`operations`?`working`:`fake_operation_history`)})]}),t!==null||r!==null?(0,D.jsx)(Yp,{$failed:!1,children:e(t||r?`showing_placeholder_data`:`showing_real_data`)}):null,s&&(0,D.jsx)(Yp,{$failed:!0,children:s})]})}function Bp(){let e=O(),[t,n]=(0,_.useState)(!1),[r,i]=(0,_.useState)(``),[a,o]=(0,_.useState)(!1),s=async()=>{n(!0),i(``),o(!1);try{let t=await jp();o(!t),i(e(t?`vr_chat_closed`:`vr_chat_did_not_close_is_it_running`))}catch(e){o(!0),i(e instanceof Error?e.message:String(e))}finally{n(!1)}};return(0,D.jsxs)(Kp,{children:[(0,D.jsx)(`h2`,{children:e(`close_vr_chat`)}),(0,D.jsx)(`p`,{children:e(`asks_vr_chat_to_quit_normally_so_the_client_tells_the_instance_it_is_leaving`)}),(0,D.jsx)(Jp,{children:(0,D.jsx)(Zp,{disabled:t,onClick:()=>void s(),type:`button`,children:e(t?`working`:`close_vr_chat`)})}),r&&(0,D.jsx)(Yp,{$failed:a,children:r})]})}function Vp({label:e,value:t}){return(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(`dt`,{children:e}),(0,D.jsx)(`dd`,{children:t})]})}function Hp(){let e=O(),[t,n]=(0,_.useState)(!1),[r,i]=(0,_.useState)(``),[a,o]=(0,_.useState)(!1),[s,c]=(0,_.useState)(null),l=()=>void Ip().then(c,()=>c(null));(0,_.useEffect)(()=>{l()},[]);let u=async()=>{n(!0),i(``),o(!1);try{let t=await Mp();o(!t.ok),i(t.ok?e(`safe_mode_request_sent`):e(`vr_chat_is_not_listening_for_osc_enable_it_in_the_action_menu`)),l()}catch(e){o(!0),i(e instanceof Error?e.message:String(e))}finally{n(!1)}};return(0,D.jsxs)(Kp,{children:[(0,D.jsx)(`h2`,{children:e(`safe_mode_osc`)}),(0,D.jsx)(`p`,{children:e(`presses_vr_chat_s_panic_button_over_osc_which_replaces_every_non_friend_avatar_at_once`)}),(0,D.jsx)(tm,{children:(0,D.jsx)(Vp,{label:e(`osc`),value:s?.listening?e(`listening_on_port_port`,{port:s.port}):e(`not_listening`)})}),(0,D.jsx)(Jp,{children:(0,D.jsx)(Zp,{disabled:t,onClick:()=>void u(),type:`button`,children:e(t?`working`:`safe_mode_osc`)})}),r&&(0,D.jsx)(Yp,{$failed:a,children:r})]})}function Up(){let e=O(),[t,n]=(0,_.useState)(!1),[r,i]=(0,_.useState)(``),[a,o]=(0,_.useState)(!1),s=async()=>{n(!0),i(``),o(!1);try{let t=await Np();o(!t.ok),i(t.ok?e(`avatar_changed`):t.already?e(`already_wearing_that_avatar`):t.configured?e(`vr_chat_is_not_listening_for_osc_enable_it_in_the_action_menu`):e(`set_the_avatar_id_in_the_settings_first`))}catch(e){o(!0),i(e instanceof Error?e.message:String(e))}finally{n(!1)}};return(0,D.jsxs)(Kp,{children:[(0,D.jsx)(`h2`,{children:e(`switch_avatar_osc`)}),(0,D.jsx)(`p`,{children:e(`asks_vr_chat_to_wear_the_avatar_id_from_the_settings`)}),(0,D.jsx)(Jp,{children:(0,D.jsx)(Zp,{disabled:t,onClick:()=>void s(),type:`button`,children:e(t?`working`:`switch_avatar_osc`)})}),r&&(0,D.jsx)(Yp,{$failed:a,children:r})]})}function Wp(){let e=O(),[t,n]=(0,_.useState)(``),[r,i]=(0,_.useState)(!1),[a,o]=(0,_.useState)(``),[s,c]=(0,_.useState)(null),l=async()=>{i(!0),o(``),c(null);try{c(await Ap(t))}catch(e){o(e instanceof Error?e.message:String(e))}finally{i(!1)}};return(0,D.jsxs)(Kp,{children:[(0,D.jsx)(`h2`,{children:e(`user_check`)}),(0,D.jsx)(`p`,{children:e(`paste_a_vr_chat_user_id_or_a_profile_link_to_see_how_it_would_be_scored`)}),(0,D.jsxs)(qp,{onSubmit:e=>{e.preventDefault(),l()},children:[(0,D.jsx)(Xp,{onChange:e=>n(e.target.value),placeholder:`usr_… or https://vrchat.com/home/user/usr_…`,value:t}),(0,D.jsx)(Zp,{disabled:r||t.trim().length===0,type:`submit`,children:e(r?`checking`:`check`)})]}),a&&(0,D.jsx)(Qp,{children:a}),s&&(0,D.jsxs)($p,{children:[(0,D.jsx)(em,{$score:s.threat,children:s.threat}),(0,D.jsxs)(tm,{children:[(0,D.jsx)(Vp,{label:e(`name`),value:s.displayName}),(0,D.jsx)(Vp,{label:e(`user_id`),value:s.id}),(0,D.jsx)(Vp,{label:e(`rank`),value:s.trust??e(`unknown`)}),(0,D.jsx)(Vp,{label:e(`joined`),value:s.dateJoined??e(`unknown`)}),(0,D.jsx)(Vp,{label:e(`platform`),value:s.platform??e(`unknown`)}),(0,D.jsx)(Vp,{label:e(`avatar`),value:s.avatarName??(s.isRobot?e(`robot_default`):e(`unknown`))})]}),(0,D.jsx)(nm,{children:s.reasons.length>0?s.reasons.map(t=>(0,D.jsxs)(`li`,{children:[e(t.text,t.detail?{days:t.detail,years:Math.floor(Number(t.detail)/365)}:void 0),(0,D.jsx)(rm,{$up:t.weight>0,children:t.weight>0?`+${t.weight}`:t.weight})]},t.text)):(0,D.jsx)(`li`,{children:e(`no_signal_matched`)})})]})]})}var Gp=K.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 16px;
    min-height: 0;
    max-width: 720px;
    overflow: auto;
`,Kp=K.section`
    display: flex;
    flex-direction: column;
    gap: 14px;
    padding: 20px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);

    h2 {
        font-size: 15px;
        font-weight: 600;
    }

    p {
        font-size: 12px;
        line-height: 1.5;
        color: var(--text-secondary);
    }
`,qp=K.form`
    display: flex;
    align-items: center;
    gap: 10px;
`,Jp=K.div`
    display: flex;
    align-items: center;
    gap: 10px;
`,Yp=K.p`
    font-family: var(--font-mono);
    font-size: 11px;
    color: ${({$failed:e})=>e?`#f87171`:`#4ade80`};
`,Xp=K.input`
    flex: 1;
    min-width: 0;
    padding: 9px 11px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: var(--bg-primary);
    color: var(--text-primary);
    font: inherit;
    font-family: var(--font-mono);
    font-size: 12px;

    &:focus {
        outline: 2px solid var(--border-color-focus);
        outline-offset: 1px;
    }
`,Zp=K.button`
    padding: 8px 14px;
    border: 1px solid transparent;
    border-radius: var(--radius-sm);
    background: var(--accent-primary);
    color: #0b0714;
    font: inherit;
    font-size: 12px;
    font-weight: 600;
    cursor: pointer;

    &:disabled {
        opacity: 0.5;
        cursor: default;
    }
`,Qp=K.p`
    font-family: var(--font-mono);
    font-size: 11px;
    color: #f87171;
`,$p=K.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 14px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: var(--bg-primary);
`,em=K.strong`
    font-family: var(--font-mono);
    font-size: 26px;
    font-weight: 600;
    color: ${({$score:e})=>e>=70?`#f87171`:e>=40?`#fbbf24`:`#4ade80`};
`,tm=K.dl`
    display: grid;
    grid-template-columns: 90px minmax(0, 1fr);
    gap: 4px 12px;
    margin: 0;

    dt {
        font-size: 11px;
        color: var(--text-muted);
    }

    dd {
        margin: 0;
        overflow: hidden;
        font-family: var(--font-mono);
        font-size: 11px;
        color: var(--text-secondary);
        text-overflow: ellipsis;
    }
`,nm=K.ul`
    display: flex;
    flex-direction: column;
    gap: 3px;
    margin: 0;
    padding-left: 16px;
    font-size: 11px;
    color: var(--text-secondary);
`,rm=K.b`
    margin-left: 6px;
    color: ${({$up:e})=>e?`#fca5a5`:`#86efac`};
`,im=[`debug`,`info`,`warning`,`error`],am={debug:`debug`,info:`info`,warning:`warning`,error:`error`},om={debug:`DBG`,info:`INF`,warning:`WRN`,error:`ERR`},sm=e=>e===`error`?`#fb7185`:e===`warning`?`#fbbf24`:e===`info`?`#60a5fa`:e===`debug`?`#6f6885`:`transparent`;function cm({log:e}){let t=O(),{status:n,lines:r,clear:i}=e,[a,o]=(0,_.useState)(``),[s,c]=(0,_.useState)(new Set),[l,u]=(0,_.useState)(!0),[d,f]=(0,_.useState)(!1),[p,m]=(0,_.useState)(null),h=(0,_.useRef)(null),g=(0,_.useRef)(!1),v=(0,_.useMemo)(()=>um(r,a,s),[r,a,s]),y=r.at(-1)?.id??0;(0,_.useEffect)(()=>{let e=h.current;if(!l||!e)return;let t=0,n=0,r=0;g.current=!0;let i=()=>{e.scrollTop=e.scrollHeight};return i(),t=window.requestAnimationFrame(()=>{i(),n=window.requestAnimationFrame(i)}),r=window.setTimeout(()=>{i(),g.current=!1},120),()=>{window.cancelAnimationFrame(t),window.cancelAnimationFrame(n),window.clearTimeout(r),g.current=!1}},[y,l]),(0,_.useEffect)(()=>{if(!p)return;let e=window.setTimeout(()=>m(null),5e3);return()=>window.clearTimeout(e)},[p]);let b=e=>c(t=>{let n=new Set(t);return n.delete(e)||n.add(e),n});return(0,D.jsxs)(pm,{children:[(0,D.jsxs)(mm,{children:[(0,D.jsxs)(hm,{children:[(0,D.jsxs)(_m,{children:[(0,D.jsx)(js,{}),(0,D.jsx)(`input`,{"aria-label":t(`filter_log_lines`),onChange:e=>o(e.target.value),placeholder:t(`filter_lines`),spellCheck:!1,type:`search`,value:a}),a&&(0,D.jsx)(vm,{"aria-label":t(`clear_the_filter`),onClick:()=>o(``),type:`button`,children:(0,D.jsx)(Ms,{})})]}),(0,D.jsx)(gm,{}),(0,D.jsxs)(xm,{$active:l,onClick:()=>u(e=>!e),title:t(l?`stop_scrolling_as_new_lines_arrive`:`scroll_to_the_newest_line_again`),type:`button`,children:[(0,D.jsx)(Sm,{$active:l}),t(l?`following`:`paused`)]}),(0,D.jsxs)(xm,{disabled:r.length===0,onClick:i,title:t(`clear_the_view_the_log_itself_is_untouched`),type:`button`,children:[(0,D.jsx)(Ns,{}),t(`clear`)]}),(0,D.jsxs)(xm,{disabled:r.length===0||d,onClick:async()=>{m(null),f(!0);try{let e=await Gc();e.saved&&m({text:t(`exported_count_lines_to_path`,{count:e.lines,path:e.path??``})})}catch(e){m({text:e instanceof Error?e.message:String(e),error:!0})}finally{f(!1)}},title:t(`save_every_line_read_so_far_to_a_file`),type:`button`,children:[(0,D.jsx)(Ls,{}),t(d?`exporting`:`export`)]})]}),(0,D.jsx)(ym,{children:im.map(e=>(0,D.jsxs)(bm,{$level:e,$on:!s.has(e),onClick:()=>b(e),title:t(s.has(e)?`show_level_lines`:`hide_level_lines`,{level:t(am[e])}),type:`button`,children:[(0,D.jsx)(`i`,{}),t(am[e])]},e))})]}),p&&(0,D.jsxs)(Cm,{$error:p.error,children:[(0,D.jsx)(`span`,{children:p.text}),(0,D.jsx)(`button`,{"aria-label":t(`dismiss`),onClick:()=>m(null),type:`button`,children:(0,D.jsx)(Ms,{})})]}),(0,D.jsxs)(wm,{children:[Dc?r.length===0?n.running?n.exists?(0,D.jsx)(fm,{hint:t(`vr_chat_is_starting_lines_appear_here_as_soon_as_it_writes_them`),title:t(`waiting_for_the_log`)}):(0,D.jsx)(fm,{hint:t(`the_configured_log_folder_cannot_be_found_set_vr_chat_s_log_folder_in_settings`),title:t(`log_folder_not_found`)}):(0,D.jsx)(fm,{hint:t(`nothing_is_read_while_vr_chat_is_closed_its_log_appears_here_once_it_starts`),title:t(`vr_chat_is_not_running`)}):v.length===0?(0,D.jsx)(fm,{hint:a.trim()?t(`no_line_contains_query`,{query:a.trim()}):t(`every_line_is_hidden_by_the_level_filter`),title:t(`nothing_matches`)}):(0,D.jsx)(Tm,{onScroll:()=>{let e=h.current;if(!e||g.current)return;let t=e.scrollHeight-e.scrollTop-e.clientHeight<48;t!==l&&u(t)},ref:h,children:v.map(({line:e,level:n})=>e.level===`session`?(0,D.jsx)(Om,{children:t(`new_session`)},e.id):(0,D.jsx)(lm,{level:n,line:e,query:a},e.id))}):(0,D.jsx)(fm,{hint:t(`the_log_is_read_through_the_desktop_host_start_anti_bot_instead_of_the_browser_preview`),title:t(`desktop_host_required`)}),!l&&v.length>0&&(0,D.jsxs)(jm,{onClick:()=>u(!0),type:`button`,children:[(0,D.jsx)(Fs,{}),t(`jump_to_latest`)]})]}),(0,D.jsx)(Nm,{children:(0,D.jsx)(`span`,{children:v.length===r.length?t(`count_lines`,{count:r.length}):t(`visible_of_total_lines`,{visible:v.length,total:r.length})})})]})}var lm=(0,_.memo)(function({line:e,level:t,query:n}){return(0,D.jsxs)(Em,{$level:t,children:[(0,D.jsx)(Dm,{children:e.time}),(0,D.jsx)(km,{$level:t,children:e.level?om[t]??e.level:``}),(0,D.jsx)(Am,{$level:t,children:dm(e.message,n)})]})});function um(e,t,n){let r=t.trim().toLowerCase(),i=[],a=``;for(let t of e){t.level&&(a=t.level);let e=t.level||a;n.has(e)||(!r||t.message.toLowerCase().includes(r))&&i.push({line:t,level:e})}return i}function dm(e,t){let n=t.trim();if(!n)return e;let r=e.split(RegExp(`(${n.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`)})`,`gi`)),i=n.toLowerCase();return r.map((e,t)=>e.toLowerCase()===i?(0,D.jsx)(`mark`,{children:e},t):e)}function fm({title:e,hint:t,children:n}){return(0,D.jsxs)(Mm,{children:[(0,D.jsx)(ks,{size:28}),(0,D.jsx)(`h2`,{children:e}),(0,D.jsx)(`p`,{children:t}),n]})}var pm=K.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 10px;
    min-height: 0;
`,mm=K.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`,hm=K.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
`,gm=K.span`
    flex: 1;
`,_m=K.div`
    position: relative;
    display: flex;
    align-items: center;
    flex: 1;
    min-width: 180px;
    max-width: 360px;

    svg {
        position: absolute;
        left: 9px;
        color: var(--text-muted);
        pointer-events: none;
    }

    input {
        width: 100%;
        padding: 7px 28px 7px 30px;
        border: 1px solid var(--border-color);
        border-radius: var(--radius-sm);
        background: var(--bg-input);
        color: var(--text-primary);
        font: inherit;
        font-size: 12px;

        &::placeholder {
            color: var(--text-muted);
        }

        &:focus {
            outline: none;
            border-color: var(--border-color-hover);
        }

        &::-webkit-search-cancel-button {
            display: none;
        }
    }
`,vm=K.button`
    position: absolute;
    right: 6px;
    display: grid;
    place-items: center;
    width: 20px;
    height: 20px;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: var(--text-muted);
    cursor: pointer;

    &:hover {
        color: var(--text-primary);
        background: var(--bg-card-hover);
    }
`,ym=K.div`
    display: flex;
    gap: 4px;
`,bm=K.button`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 9px;
    border: 1px solid ${({$on:e,$level:t})=>e?`${sm(t)}66`:`var(--border-color)`};
    border-radius: 999px;
    background: ${({$on:e,$level:t})=>e?`${sm(t)}14`:`transparent`};
    color: ${({$on:e})=>e?`var(--text-primary)`:`var(--text-muted)`};
    font: inherit;
    font-family: var(--font-mono);
    font-size: 10px;
    cursor: pointer;
    opacity: ${({$on:e})=>e?1:.45};
    text-decoration: ${({$on:e})=>e?`none`:`line-through`};

    i {
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: ${({$on:e,$level:t})=>e?sm(t):`var(--text-muted)`};
    }

    &:hover {
        border-color: var(--border-color-hover);
    }
`,xm=K.button`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 10px;
    border: 1px solid ${({$active:e})=>e?`var(--border-color-hover)`:`var(--border-color)`};
    border-radius: var(--radius-sm);
    background: ${({$active:e})=>e?`rgba(167, 139, 250, 0.1)`:`var(--bg-card)`};
    color: ${({$active:e})=>e?`var(--accent-primary)`:`var(--text-secondary)`};
    font: inherit;
    font-family: var(--font-mono);
    font-size: 10px;
    cursor: pointer;

    &:hover:not(:disabled) {
        border-color: var(--border-color-hover);
        color: var(--text-primary);
    }

    &:disabled {
        opacity: 0.45;
        cursor: default;
    }
`,Sm=K.span`
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({$active:e})=>e?`var(--accent-primary)`:`var(--text-muted)`};
    box-shadow: ${({$active:e})=>e?`0 0 8px var(--accent-primary)`:`none`};
`,Cm=K.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 8px 12px;
    border: 1px solid ${({$error:e})=>e?`rgba(251, 113, 133, 0.3)`:`var(--border-color)`};
    border-radius: var(--radius-sm);
    background: ${({$error:e})=>e?`rgba(251, 113, 133, 0.08)`:`var(--bg-card)`};
    color: ${({$error:e})=>e?`var(--danger)`:`var(--text-secondary)`};
    font-size: 11px;

    span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    button {
        display: grid;
        flex-shrink: 0;
        place-items: center;
        border: 0;
        background: transparent;
        color: inherit;
        cursor: pointer;
    }
`,wm=K.section`
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: rgba(9, 7, 16, 0.6);
`,Tm=K.div`
    flex: 1;
    min-height: 0;
    overflow: auto;
    /* The view is pinned to the bottom by script; the browser's own anchoring would fight it. */
    overflow-anchor: none;
    padding: 6px 0 12px;
    font-family: var(--font-mono);
    font-size: 11.5px;
`,Em=K.div`
    display: grid;
    grid-template-columns: 62px 34px minmax(0, 1fr);
    gap: 10px;
    padding: 0 14px;
    border-left: 2px solid ${({$level:e})=>sm(e)};
    line-height: 1.7;
    content-visibility: auto;
    contain-intrinsic-size: auto 20px;

    &:hover {
        background: rgba(167, 139, 250, 0.06);
    }
`,Dm=K.span`
    color: var(--text-muted);
    white-space: nowrap;
`,Om=K.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 8px 14px;
    color: var(--text-muted);
    font-size: 9px;
    letter-spacing: 0.12em;
    text-transform: uppercase;

    &::before,
    &::after {
        content: "";
        height: 1px;
        flex: 1;
        background: var(--border-color);
    }

    &:hover {
        color: var(--text-secondary);
    }
`,km=K.span`
    color: ${({$level:e})=>sm(e)};
    font-size: 9px;
    letter-spacing: 0.04em;
    line-height: 1.95;
    opacity: 0.85;
`,Am=K.span`
    color: ${({$level:e})=>e===`error`?`#fecaca`:e===`warning`?`#fde68a`:`var(--text-secondary)`};
    white-space: pre-wrap;
    overflow-wrap: anywhere;

    mark {
        border-radius: 2px;
        background: rgba(167, 139, 250, 0.28);
        color: var(--text-primary);
    }
`,jm=K.button`
    position: absolute;
    right: 18px;
    bottom: 14px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 11px;
    border: 1px solid var(--border-color-hover);
    border-radius: 999px;
    background: var(--bg-secondary);
    color: var(--accent-primary);
    font: inherit;
    font-size: 11px;
    cursor: pointer;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.45);

    &:hover {
        background: var(--bg-card-hover);
    }
`,Mm=K.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 30px;
    text-align: center;

    svg {
        color: var(--text-muted);
    }

    h2 {
        font-size: 14px;
        font-weight: 600;
    }

    p {
        max-width: 460px;
        font-size: 12px;
        line-height: 1.65;
        color: var(--text-muted);
    }
`,Nm=K.footer`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 16px;
    padding: 0 2px;
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-muted);
`;async function Pm(){return E.available?await Rm():[]}async function Fm(){E.available&&await E.request(`operations.clear`)}async function Im(e){return E.available?await E.request(`operations.undo`,{id:e}):{ok:!1,message:`The desktop host is not available.`}}function Lm(e){return E.on(t=>{t.type===`operations.changed`&&Rm().then(e,()=>{})})}async function Rm(){return(await Tc(`/operations`)).rows.map(e=>({id:Number(e.id),at:Number(e.at),kind:String(e.kind),userId:String(e.userId),displayName:String(e.displayName),detail:String(e.detail),avatarUrl:String(e.avatar??``)||void 0,undone:Number(e.undone)!==0}))}function zm(){let e=O(),t=k(),[n,r]=(0,_.useState)([]),[i,a]=(0,_.useState)(null),[o,s]=(0,_.useState)(!1),[c,l]=(0,_.useState)(null),[u,d]=(0,_.useState)(null),f=(0,_.useRef)(!1);(0,_.useEffect)(()=>{let e=!1,t=Lm(t=>{e||(f.current=!0,r(t))});return Pm().then(t=>{!e&&!f.current&&r(t)},()=>{}),()=>{e=!0,t()}},[]);let p=()=>{o?(s(!1),Fm().then(()=>r([]),()=>{})):s(!0)},m=e=>{e.userId.length!==0&&Y(e.userId,e.displayName).then(a,()=>{})},h=t=>{l(t.id),Im(t.id).then(e=>{d({ok:e.ok,text:e.message})},()=>{d({ok:!1,text:e(`the_host_did_not_answer`)})}).finally(()=>{l(null),window.setTimeout(()=>d(null),6e3)})};return(0,D.jsxs)(Wm,{children:[(0,D.jsxs)(Gm,{children:[(0,D.jsxs)(Km,{children:[(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`h2`,{children:e(`operation_history`)}),(0,D.jsx)(`p`,{children:e(`every_block_chat_box_mute_and_avatar_interaction_change_as_it_happened`)})]}),(0,D.jsxs)(Jm,{children:[(0,D.jsx)(qm,{children:e(`count_action_s`,{count:n.length})}),(0,D.jsx)(Ym,{$confirming:o,disabled:n.length===0,onBlur:()=>s(!1),onClick:p,type:`button`,children:e(o?`confirm_clear`:`clear_history`)})]})]}),u&&(0,D.jsx)(Xm,{$ok:u.ok,children:u.text}),(0,D.jsx)(Zm,{children:n.length===0?(0,D.jsx)(sh,{children:e(`anti_bot_has_not_taken_an_automatic_action_yet`)}):n.map(n=>(0,D.jsxs)(Qm,{"data-user-id":n.userId||void 0,onClick:()=>m(n),children:[(0,D.jsx)($m,{$src:n.avatarUrl}),(0,D.jsx)(eh,{children:Bm(n.at,t)}),(0,D.jsx)(th,{$kind:n.kind,children:e(Vm(n.kind))}),(0,D.jsx)(nh,{children:n.displayName||e(`unknown_user`)}),(0,D.jsx)(rh,{title:n.detail,children:n.detail}),(0,D.jsxs)(ih,{children:[Hm(n)&&(0,D.jsx)(ah,{disabled:c===n.id,onClick:e=>{e.stopPropagation(),h(n)},type:`button`,children:c===n.id?e(`undoing`):e(`undo`)}),(0,D.jsxs)(oh,{disabled:n.userId.length===0,onClick:e=>{e.stopPropagation(),di(`https://vrchat.com/home/user/${n.userId}`)},title:e(`open_the_vr_chat_profile`),type:`button`,children:[(0,D.jsx)(Ws,{size:11}),e(`profile`)]})]})]},n.id))})]}),i&&(0,D.jsx)(ld,{user:i,now:Date.now(),onClose:()=>a(null)})]})}function Bm(e,t){return new Date(e).toLocaleString(t,{year:`numeric`,month:`short`,day:`numeric`,hour:`2-digit`,minute:`2-digit`,second:`2-digit`})}function Vm(e){switch(e){case`block`:return`blocked`;case`avatarInteractionOff`:return`avatar_interactions_off`;case`chatBoxHidden`:return`chat_box_hidden`;case`report`:return`reported`;case`closeVrchat`:return`closed_vr_chat`;case`safeMode`:return`safe_mode_on`;case`switchedAvatar`:return`switched_avatar`;case`returnHome`:return`returned_home`;case`rejectRequest`:return`request_rejected`;case`undoReject`:return`rejection_undone`;case`unblock`:return`unblocked`;case`avatarInteractionOn`:return`avatar_interactions_on`;case`chatBoxShown`:return`chat_box_shown`;default:return e}}function Hm(e){return e.undone?!1:e.kind===`block`||e.kind===`avatarInteractionOff`||e.kind===`chatBoxHidden`}function Um(e){switch(e){case`unblock`:case`avatarInteractionOn`:case`chatBoxShown`:case`undoReject`:return`#4ade80`;default:return`#fb7185`}}var Wm=K.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
`,Gm=K.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`,Km=K.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    padding: 14px 16px;
    border-bottom: 1px solid var(--border-color);

    h2 {
        font-size: 14px;
        font-weight: 600;
    }

    p {
        margin-top: 2px;
        font-size: 11px;
        color: var(--text-secondary);
    }
`,qm=K.span`
    flex-shrink: 0;
    font-family: var(--font-mono);
    font-size: 9.5px;
    color: var(--text-muted);
`,Jm=K.div`
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
`,Ym=K.button`
    padding: 5px 10px;
    border: 1px solid ${({$confirming:e})=>e?`rgba(251, 113, 133, 0.6)`:`var(--border-color)`};
    border-radius: var(--radius-sm);
    background: ${({$confirming:e})=>e?`rgba(251, 113, 133, 0.12)`:`transparent`};
    color: ${({$confirming:e})=>e?`#fb7185`:`var(--text-secondary)`};
    font: inherit;
    font-size: 10px;
    white-space: nowrap;
    cursor: pointer;

    &:hover:not(:disabled) {
        border-color: var(--border-color-hover);
        color: var(--text-primary);
    }

    &:disabled {
        opacity: 0.45;
        cursor: default;
    }
`,Xm=K.div`
    margin: 10px 16px 0;
    padding: 8px 12px;
    border: 1px solid ${({$ok:e})=>e?`rgba(74, 222, 128, 0.45)`:`rgba(251, 113, 133, 0.45)`};
    border-radius: var(--radius-sm);
    background: ${({$ok:e})=>e?`rgba(74, 222, 128, 0.1)`:`rgba(251, 113, 133, 0.1)`};
    color: ${({$ok:e})=>e?`#4ade80`:`#fb7185`};
    font-size: 11px;
`,Zm=K.div`
    flex: 1;
    min-height: 0;
    overflow-y: auto;
`,Qm=K.div`
    display: grid;
    grid-template-columns: 26px 160px 140px minmax(0, 150px) minmax(0, 1fr) 150px;
    gap: 12px;
    align-items: center;
    padding: 8px 16px;
    border-bottom: 1px solid var(--border-color);
    cursor: pointer;

    &:last-child {
        border-bottom: 0;
    }

    &:hover {
        background: rgba(167, 139, 250, 0.06);
    }
`,$m=K.span`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: var(--bg-primary) center / cover no-repeat;
    background-image: ${({$src:e})=>e?`url("${e}")`:`none`};
    box-shadow: inset 0 0 0 1px var(--border-color);
    color: var(--text-muted);
    font-size: 10px;
    font-weight: 600;
`,eh=K.span`
    font-family: var(--font-mono);
    font-size: 9.5px;
    color: var(--text-muted);
    white-space: nowrap;
`,th=K.span`
    font-size: 10.5px;
    color: ${({$kind:e})=>Um(e)};
    white-space: nowrap;
`,nh=K.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 11.5px;
`,rh=K.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: var(--font-mono);
    font-size: 9.5px;
    color: var(--text-muted);
`,ih=K.div`
    display: flex;
    justify-content: flex-end;
    gap: 6px;
`,ah=K.button`
    padding: 3px 8px;
    border: 1px solid rgba(251, 113, 133, 0.45);
    border-radius: var(--radius-sm);
    background: rgba(251, 113, 133, 0.1);
    color: #fb7185;
    font: inherit;
    font-size: 9.5px;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
        background: rgba(251, 113, 133, 0.2);
    }
`,oh=K.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    padding: 3px 7px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--text-secondary);
    font: inherit;
    font-size: 9.5px;
    white-space: nowrap;
    cursor: pointer;

    &:hover:not(:disabled) {
        border-color: var(--border-color-hover);
        color: var(--text-primary);
    }

    &:disabled {
        opacity: 0.4;
        cursor: default;
    }
`,sh=K.p`
    padding: 26px 16px;
    text-align: center;
    font-size: 11.5px;
    color: var(--text-muted);
`;async function ch(){return E.available?await fh():[]}async function lh(){E.available&&await E.request(`friendRequests.clear`)}async function uh(e){E.available&&await E.request(`friendRequests.undo`,{id:e})}function dh(e){return E.on(t=>{t.type===`friendRequests.changed`&&fh().then(e,()=>{})})}async function fh(){return(await Tc(`/requests`)).rows.map(e=>({id:String(e.id),userId:String(e.userId),createdAt:String(e.createdAt),active:Number(e.active)!==0,rejected:Number(e.rejected)!==0,firstSeen:Number(e.firstSeen),user:J(e,`user.`)}))}function ph({signedIn:e,onSignIn:t}){let n=O(),r=k(),[i,a]=(0,_.useState)([]),[o,s]=(0,_.useState)(null),[c,l]=(0,_.useState)(!1),u=(0,_.useRef)(!1);(0,_.useEffect)(()=>{let e=!1,t=dh(t=>{e||(u.current=!0,a(t))});return ch().then(t=>{!e&&!u.current&&a(t)},()=>{}),()=>{e=!0,t()}},[]);let d=i.filter(e=>e.active).length,f=()=>{c?(l(!1),lh().then(()=>a([]),()=>{})):l(!0)},p=e=>{uh(e.id)};return(0,D.jsxs)(_h,{children:[!e&&(0,D.jsxs)(vh,{children:[(0,D.jsxs)(yh,{children:[(0,D.jsx)(`strong`,{children:n(`not_signed_in`)}),(0,D.jsx)(`span`,{children:n(`sign_in_to_record_the_friend_requests_vr_chat_receives`)})]}),(0,D.jsx)(bh,{onClick:t,type:`button`,children:n(`sign_in`)})]}),(0,D.jsxs)(xh,{children:[(0,D.jsxs)(Sh,{children:[(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`h2`,{children:n(`friend_requests`)}),(0,D.jsx)(`p`,{children:i.length===0?n(`every_incoming_request_is_recorded_here_with_the_sender_s_profile`):n(`count_recorded_pending_still_pending`,{count:i.length,pending:d})})]}),(0,D.jsxs)(Ch,{children:[(0,D.jsx)(Th,{children:n(`faded_rows_are_no_longer_pending`)}),(0,D.jsx)(wh,{$confirming:c,disabled:i.length===0,onBlur:()=>l(!1),onClick:f,type:`button`,children:n(c?`confirm_clear`:`clear_history`)})]})]}),(0,D.jsxs)(Eh,{children:[(0,D.jsx)(`span`,{}),(0,D.jsx)(`span`,{children:n(`user`)}),(0,D.jsx)(`span`,{children:n(`trust`)}),(0,D.jsx)(`span`,{children:n(`pronouns`)}),(0,D.jsx)(`span`,{children:n(`status`)}),(0,D.jsx)(`span`,{children:n(`platform`)}),(0,D.jsx)(`span`,{children:n(`received`)})]}),(0,D.jsx)(Dh,{children:i.length===0?(0,D.jsx)(kh,{children:n(`no_friend_requests_recorded_yet`)}):mh(i,n,r).map(e=>(0,D.jsxs)(`section`,{children:[(0,D.jsx)(Oh,{children:e.day}),e.items.map(e=>(0,D.jsx)(cd,{badge:e.rejected?(0,D.jsx)(Ah,{children:n(`rejected`)}):void 0,dim:!e.active,now:e.firstSeen,onSelect:s,timeLabel:gh(e.firstSeen,r),trailing:e.rejected?(0,D.jsx)(jh,{onClick:t=>{t.stopPropagation(),p(e)},type:`button`,children:n(`undo`)}):void 0,user:e.user},e.id))]},e.day))})]}),o&&(0,D.jsx)(ld,{user:o,now:Date.now(),onClose:()=>s(null)})]})}function mh(e,t,n){let r=new Map;for(let i of e){let e=hh(i.firstSeen,t,n),a=r.get(e)??[];a.push(i),r.set(e,a)}return[...r].map(([e,t])=>({day:e,items:t}))}function hh(e,t,n){let r=new Date(e);return r.toDateString()===new Date().toDateString()?t(`today`):r.toLocaleDateString(n,{year:`numeric`,month:`short`,day:`numeric`})}function gh(e,t){return new Date(e).toLocaleTimeString(t,{hour:`2-digit`,minute:`2-digit`})}var _h=K.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 14px;
    min-height: 0;
`,vh=K.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 12px 14px;
    border: 1px solid rgba(251, 191, 36, 0.35);
    border-radius: var(--radius-md);
    background: rgba(251, 191, 36, 0.08);
`,yh=K.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;

    strong {
        font-size: 12px;
        color: #fbbf24;
    }

    span {
        font-size: 11px;
        line-height: 1.5;
        color: var(--text-secondary);
    }
`,bh=K.button`
    flex-shrink: 0;
    padding: 7px 12px;
    border: 1px solid rgba(251, 191, 36, 0.45);
    border-radius: var(--radius-sm);
    background: rgba(251, 191, 36, 0.12);
    color: #fbbf24;
    font: inherit;
    font-size: 11px;
    cursor: pointer;

    &:hover {
        background: rgba(251, 191, 36, 0.2);
    }
`,xh=K.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`,Sh=K.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    padding: 14px 16px;
    border-bottom: 1px solid var(--border-color);

    h2 {
        font-size: 14px;
        font-weight: 600;
    }

    p {
        margin-top: 2px;
        font-size: 11px;
        color: var(--text-secondary);
    }
`,Ch=K.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
`,wh=K.button`
    padding: 5px 10px;
    border: 1px solid ${({$confirming:e})=>e?`rgba(251, 113, 133, 0.6)`:`var(--border-color)`};
    border-radius: var(--radius-sm);
    background: ${({$confirming:e})=>e?`rgba(251, 113, 133, 0.12)`:`transparent`};
    color: ${({$confirming:e})=>e?`#fb7185`:`var(--text-secondary)`};
    font: inherit;
    font-size: 10px;
    white-space: nowrap;
    cursor: pointer;

    &:hover:not(:disabled) {
        border-color: var(--border-color-hover);
        color: var(--text-primary);
    }

    &:disabled {
        opacity: 0.45;
        cursor: default;
    }
`,Th=K.span`
    flex-shrink: 0;
    font-family: var(--font-mono);
    font-size: 9.5px;
    color: var(--text-muted);
`,Eh=K.div`
    display: grid;
    grid-template-columns: ${Ld(!0)};
    gap: 8px;
    padding: 8px 16px;
    border-bottom: 1px solid var(--border-color);
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 9px;
    letter-spacing: 0.1em;
    text-transform: uppercase;

    span {
        white-space: nowrap;
    }

    span:nth-last-child(2) {
        text-align: center;
    }

    span:last-child {
        text-align: right;
    }
`,Dh=K.div`
    flex: 1;
    min-height: 0;
    overflow-y: auto;
`,Oh=K.h3`
    position: sticky;
    top: 0;
    z-index: 1;
    padding: 6px 16px;
    border-bottom: 1px solid var(--border-color);
    background: var(--bg-secondary);
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 9.5px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
`,kh=K.p`
    padding: 26px 16px;
    text-align: center;
    font-size: 11.5px;
    color: var(--text-muted);
`,Ah=K.span`
    padding: 1px 6px;
    border-radius: 999px;
    background: rgba(251, 113, 133, 0.14);
    color: #fb7185;
    font-family: var(--font-mono);
    font-size: 9px;
    white-space: nowrap;
`,jh=K.button`
    padding: 3px 8px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--text-secondary);
    font: inherit;
    font-size: 9.5px;
    cursor: pointer;

    &:hover {
        border-color: var(--border-color-hover);
        color: var(--text-primary);
    }
`,Mh=bs`
    from {
        opacity: 0;
        transform: translateY(6px) scale(0.98);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
`,Nh=bs`
    from {
        opacity: 0;
        transform: translateY(-6px) scale(0.98);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
`,Ph=K.div`
    position: absolute;
    ${({$up:e})=>e?`bottom: calc(100% + 6px);`:`top: calc(100% + 5px);`}
    left: 0;
    min-width: 200px;
    max-height: 260px;
    overflow-y: auto;
    padding: 5px;
    border: 1px solid var(--border-color);
    border-radius: 10px;
    background: var(--bg-card);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
    z-index: 30;
    transform-origin: ${({$up:e})=>e?`bottom`:`top`};
    animation: ${({$up:e})=>e?Mh:Nh} 0.16s cubic-bezier(0.22, 1, 0.36, 1);
`,Fh=K.button`
    display: block;
    width: 100%;
    overflow: hidden;
    padding: 7px 9px;
    border: none;
    border-radius: 6px;
    background: ${({$active:e})=>e?`rgba(167, 139, 250, 0.16)`:`transparent`};
    color: ${({$active:e})=>e?`var(--text-primary)`:`var(--text-secondary)`};
    font: inherit;
    font-size: 11px;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
        background: rgba(167, 139, 250, 0.12);
        color: var(--text-primary);
    }
`,Ih=K.div`
    position: relative;
    display: inline-flex;
`,Lh=K.button`
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    min-width: 200px;
    padding: 8px 12px;
    border: 1px solid var(--border-color);
    border-radius: 8px;
    background: var(--bg-input);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    color: var(--text-primary);
    font: inherit;
    font-size: 12px;
    cursor: pointer;

    &:hover:not(:disabled) {
        border-color: var(--border-color-hover);
    }

    &:focus-visible {
        outline: none;
        border-color: var(--border-color-focus);
    }

    &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
    }
`,Rh=K.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`,zh=K.span`
    flex-shrink: 0;
    font-size: 0.7em;
    opacity: 0.75;
    transform: rotate(${({$open:e})=>e?`180deg`:`0`});
    transition: transform 0.18s ease;
`;function Bh(e,t,n){let[r,i]=(0,_.useState)({});return(0,_.useEffect)(()=>{if(!e)return;let r=()=>{let e=n.current?.getBoundingClientRect();if(!e)return;let r=t?e.top:window.innerHeight-e.bottom;i({maxHeight:Math.max(120,Math.floor(r-10))})};return r(),window.addEventListener(`resize`,r),()=>window.removeEventListener(`resize`,r)},[e,t,n]),r}function Vh({value:e,options:t,onChange:n,up:r,disabled:i,title:a}){let[o,s]=(0,_.useState)(!1),c=(0,_.useRef)(null),l=Bh(o,r,c);(0,_.useEffect)(()=>{if(!o)return;let e=()=>s(!1),t=t=>{c.current?.contains(t.target)||e()},n=t=>{t.key===`Escape`&&e()},r=()=>{document.hidden&&e()};return document.addEventListener(`pointerdown`,t),document.addEventListener(`keydown`,n),window.addEventListener(`blur`,e),document.addEventListener(`visibilitychange`,r),()=>{document.removeEventListener(`pointerdown`,t),document.removeEventListener(`keydown`,n),window.removeEventListener(`blur`,e),document.removeEventListener(`visibilitychange`,r)}},[o]);let u=t.find(t=>t.value===e)?.label??e;return(0,D.jsxs)(Ih,{onBlur:e=>{e.currentTarget.contains(e.relatedTarget)||s(!1)},ref:c,children:[(0,D.jsxs)(Lh,{"aria-expanded":o,"aria-haspopup":`listbox`,disabled:i,onClick:()=>s(e=>!e),title:a,type:`button`,children:[(0,D.jsx)(Rh,{children:u}),(0,D.jsx)(zh,{$open:o,children:`▾`})]}),o&&(0,D.jsx)(Ph,{$up:r,role:`listbox`,style:l,children:t.map(t=>(0,D.jsx)(Fh,{$active:t.value===e,"aria-selected":t.value===e,onClick:()=>{s(!1),n(t.value)},role:`option`,type:`button`,children:t.label},t.value))})]})}var Hh=`modulepreload`,Uh=function(e){return`/`+e},Wh={},Gh=function(e){return e.pathname.endsWith(`.css`)},Kh=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},qh=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=Uh(t,n);let r=s(t),i=Gh(r);return Kh(Wh,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:Hh,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{let i=a=>{t.removeEventListener(`load`,i),t.removeEventListener(`error`,i),a.type===`error`?n(Error(`Unable to preload CSS for ${r}`)):e(a)};t.addEventListener(`load`,i),t.addEventListener(`error`,i)})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Jh=(0,_.lazy)(()=>qh(()=>import(`./AttributionPage-VGC_Xjhr.js`).then(e=>({default:e.AttributionPage})),[])),Yh=`system`,Xh={en:`English`,ja:`日本語`,"zh-CN":`简体中文`,"zh-TW":`繁體中文`},Zh=[{id:`settings-language`,label:`language`},{id:`settings-appearance`,label:`appearance`},{id:`settings-startup`,label:`start_with_the_system`},{id:`settings-log-source`,label:`log_source`},{id:`settings-avatar-lookups`,label:`avatar_name_lookups`},{id:`settings-osc`,label:`osc`},{id:`settings-protection`,label:`automatic_protection`},{id:`settings-whitelist`,label:`whitelist`},{id:`settings-build`,label:`build`}];function Qh({info:e}){let t=O(),[n,r]=(0,_.useState)(``),[i,a]=(0,_.useState)(``),[o,s]=(0,_.useState)([]),[c,l]=(0,_.useState)(``),[u,d]=(0,_.useState)(!0),[f,p]=(0,_.useState)(!0),[m,h]=(0,_.useState)(!0),[g,v]=(0,_.useState)(!1),[y,b]=(0,_.useState)(!1),[x,S]=(0,_.useState)(!1),[C,ee]=(0,_.useState)(!1),[w,te]=(0,_.useState)(``),[T,ne]=(0,_.useState)(!0),[re,ie]=(0,_.useState)(!0),[ae,oe]=(0,_.useState)(70),[se,E]=(0,_.useState)([]),[ce,le]=(0,_.useState)(``),[ue,de]=(0,_.useState)([]),[fe,pe]=(0,_.useState)(Yh),[me,he]=(0,_.useState)(`system`),[ge,_e]=(0,_.useState)([]),[ve,ye]=(0,_.useState)(!1),[xe,Se]=(0,_.useState)(9e3),[k,Ce]=(0,_.useState)(null),[A,we]=(0,_.useState)(``),[Te,Ee]=(0,_.useState)(!1),[j,De]=(0,_.useState)(null),[Oe,ke]=(0,_.useState)(!1),[Ae,je]=(0,_.useState)(null),[Me,Ne]=(0,_.useState)(!1),[Pe,Fe]=(0,_.useState)(null),[Ie,Le]=(0,_.useState)(!1),[Re,ze]=(0,_.useState)(Zh[0].id),[Be,Ve]=(0,_.useState)(!1),[He,Ue]=(0,_.useState)(!1),[We,Ge]=(0,_.useState)(!1),[Ke,M]=(0,_.useState)(null),qe=(0,_.useRef)(0),Je=(0,_.useRef)(!1),Ye=(0,_.useRef)(0),Xe=async e=>{try{let t=await Ts();de(t),e<6&&t.some(e=>e.name===e.userId)&&window.setTimeout(()=>void Xe(e+1),1200)}catch{}},Ze=()=>{Ip().then(Ce,()=>Ce(null))},Qe=async()=>{Ee(!0),we(``);try{let e=await Lp(xe);we(e.sent?t(`sent_to_port_port_if_the_quick_menu_opened_osc_is_working`,{port:e.port}):t(`could_not_send_the_test_message`)),Ze()}catch(e){we(e instanceof Error?e.message:String(e))}finally{Ee(!1)}},$e=e=>{Se(e),window.clearTimeout(Ye.current),Ye.current=window.setTimeout(()=>void N({oscPort:e}),400)},et=e=>{r(e.logDirectory??``),a(e.defaultLogDirectory??``),s(e.avatarApiProviders??[]),d(e.autoBlock),p(e.autoDisableAvatarInteraction),h(e.autoHideChatBox),v(e.autoReport),b(e.autoCloseVrchat),S(e.autoSafeMode),ee(e.autoSafeAvatar),te(e.safeAvatarId??``),ne(e.skipCloseInVr),ie(e.autoRejectFriendRequests),oe(e.threatThreshold),E(e.whitelist??[]),pe(e.language??Yh),he(xs(e.theme)),ye(e.startHidden),Se(e.oscPort||9e3)};(0,_.useEffect)(()=>{Ss().then(e=>{et(e),Xe(0),Ze()},()=>M(t(`could_not_read_the_settings`)))},[]),(0,_.useEffect)(()=>{be().then(e=>_e(e.available),()=>_e([]))},[]),(0,_.useEffect)(()=>{li().then(De,()=>De(null))},[]),(0,_.useEffect)(()=>{mi().then(je,()=>void 0)},[]),(0,_.useEffect)(()=>{let e=yi(e=>{Fe(t=>t&&{...t,phase:e.phase,downloaded:e.downloaded,total:e.total,percent:e.percent,error:e.error??(e.phase===`error`?t.error:void 0)})}),t=bi(e=>{Fe(t=>t&&{...t,changelog:e.text})});return()=>{e(),t()}},[]),(0,_.useEffect)(()=>{let e=Zh.map(e=>document.getElementById(e.id));if(e.some(e=>e===null))return;let t=new IntersectionObserver(e=>{let t=e.filter(e=>e.isIntersecting).sort((e,t)=>e.boundingClientRect.top-t.boundingClientRect.top)[0];t&&ze(t.target.id)},{rootMargin:`-8% 0px -70% 0px`});return e.forEach(e=>t.observe(e)),()=>t.disconnect()},[]);let tt=e=>{ze(e),document.getElementById(e)?.scrollIntoView({behavior:`smooth`,block:`start`})},nt=n.trim(),rt=(e={})=>({logDirectory:nt,avatarApiProviders:o.map(e=>e.trim()).filter(e=>e.length>0),autoBlock:u,autoDisableAvatarInteraction:f,autoHideChatBox:m,autoReport:g,autoCloseVrchat:y,autoSafeMode:x,autoSafeAvatar:C,safeAvatarId:w.trim(),skipCloseInVr:T,autoRejectFriendRequests:re,threatThreshold:ae,whitelist:se,language:fe,theme:me,startHidden:ve,oscPort:xe,...e}),N=async(e={},t=!1)=>{M(null);try{let n=await Cs(rt(e));E(n.whitelist??[]),te(n.safeAvatarId??``),t&&Xe(0)}catch(e){M(e instanceof Error?e.message:String(e))}},it=e=>{pe(e),N({language:e})},at=e=>{he(e),N({theme:e})},ot=async e=>{ke(!0),M(null);try{De(await ui(e))}catch(e){M(e instanceof Error?e.message:String(e))}finally{ke(!1)}},st=async()=>{Ve(!0),M(null);try{et(await ws()),Xe(0),Ze(),Ge(!0),window.setTimeout(()=>Ge(!1),5e3)}catch(e){M(e instanceof Error?e.message:String(e))}finally{Ve(!1)}};(0,_.useEffect)(()=>{Pe?.phase!==`ready`||Je.current||(Je.current=!0,mt())},[Pe?.phase]);let ct=async()=>{M(null);try{await Wc()}catch(e){M(e instanceof Error?e.message:String(e))}},lt=async()=>{M(null);try{await fi()}catch(e){M(e instanceof Error?e.message:String(e))}},ut=async()=>{Ne(!0),je(null),M(null);try{je(await hi())}catch(e){M(e instanceof Error?e.message:String(e))}finally{Ne(!1)}},dt=async()=>{M(null);try{await pi(Ds)}catch(e){M(e instanceof Error?e.message:String(e))}},ft=async()=>{M(null),Je.current=!1,Fe({phase:`changelog`,changelog:``,downloaded:0,total:0,percent:0});try{let e=await gi();e.ok||Fe(t=>t&&{...t,phase:`error`,error:e.error??``})}catch(e){Fe(t=>t&&{...t,phase:`error`,error:e instanceof Error?e.message:String(e)})}},pt=async()=>{Fe(null);try{await _i()}catch(e){M(e instanceof Error?e.message:String(e))}},mt=async()=>{Fe(e=>e&&{...e,phase:`installing`});try{let e=await vi();e.ok||Fe(t=>t&&{...t,phase:`error`,error:e.error??``})}catch(e){Fe(t=>t&&{...t,phase:`error`,error:e instanceof Error?e.message:String(e)})}},ht=e=>{oe(e),window.clearTimeout(qe.current),qe.current=window.setTimeout(()=>void N({threatThreshold:e}),400)},gt=()=>{let e=c.trim();if(e.length===0||o.includes(e))return;let t=[...o,e];s(t),l(``),N({avatarApiProviders:t})},_t=e=>{let t=o.filter((t,n)=>n!==e);s(t),N({avatarApiProviders:t})},vt=()=>{let e=ce.trim();if(e.length===0||se.includes(e))return;let t=[...se,e];E(t),le(``),N({whitelist:t},!0)},yt=e=>{let t=se.filter(t=>t!==e);E(t),N({whitelist:t},!0)};return(0,D.jsxs)(rg,{children:[(0,D.jsxs)(og,{children:[(0,D.jsxs)(sg,{id:`settings-language`,children:[(0,D.jsx)(cg,{children:(0,D.jsx)(`h2`,{children:t(`language`)})}),(0,D.jsx)(lg,{children:(0,D.jsxs)(ug,{children:[(0,D.jsx)(hg,{children:t(`language`)}),(0,D.jsx)(Vh,{onChange:e=>void it(e),options:[{value:Yh,label:t(`system_default`)},...ge.map(e=>({value:e,label:Xh[e]??e}))],value:fe}),(0,D.jsx)(yg,{children:t(`language_used_by_both_the_interface_and_the_desktop_backend`)})]})})]}),(0,D.jsxs)(sg,{id:`settings-appearance`,children:[(0,D.jsx)(cg,{children:(0,D.jsx)(`h2`,{children:t(`appearance`)})}),(0,D.jsx)(lg,{children:(0,D.jsxs)(ug,{children:[(0,D.jsx)(hg,{children:t(`theme`)}),(0,D.jsx)(Vh,{onChange:e=>at(e),options:[{value:`system`,label:t(`follow_the_system`)},{value:`light`,label:t(`light`)},{value:`dark`,label:t(`dark`)}],value:me}),(0,D.jsx)(yg,{children:t(`applies_to_the_whole_interface`)})]})})]}),(0,D.jsxs)(sg,{id:`settings-startup`,children:[(0,D.jsx)(cg,{children:(0,D.jsx)(`h2`,{children:t(`start_with_the_system`)})}),(0,D.jsx)(lg,{children:(0,D.jsxs)(Rg,{children:[(0,D.jsx)(pl,{checked:j?.enabled??!1,disabled:Oe||!j?.supported,hint:t(`create_an_autostart_entry_for_this_user`),onChange:e=>void ot(e),title:t(`start_with_the_system`)}),(0,D.jsx)(pl,{checked:ve,hint:t(`open_in_the_tray_instead_of_showing_the_window`),onChange:e=>{ye(e),N({startHidden:e})},title:t(`start_hidden`)})]})})]}),(0,D.jsxs)(sg,{id:`settings-log-source`,children:[(0,D.jsx)(cg,{children:(0,D.jsx)(`h2`,{children:t(`log_source`)})}),(0,D.jsxs)(lg,{children:[(0,D.jsxs)(ug,{children:[(0,D.jsx)(hg,{children:t(`vr_chat_log_folder`)}),(0,D.jsx)(dg,{children:(0,D.jsx)(mg,{"aria-label":t(`vr_chat_log_folder`),onBlur:()=>void N(),onChange:e=>r(e.target.value),placeholder:t(`vr_chat_s_log_folder`),spellCheck:!1,value:n})}),(0,D.jsx)(yg,{children:t(`the_newest_log_in_this_folder_is_followed_while_vr_chat_is_running_nothing_is_read_while_it_is_closed`)})]}),(0,D.jsxs)(bg,{children:[(0,D.jsxs)(xg,{disabled:!Dc,onClick:ct,type:`button`,children:[(0,D.jsx)(Ps,{}),t(`open_folder`)]}),(0,D.jsx)(xg,{disabled:!i||nt===i,onClick:()=>{r(i),N({logDirectory:i})},type:`button`,children:t(`use_vr_chat_s_folder`)})]})]})]}),(0,D.jsxs)(sg,{id:`settings-avatar-lookups`,children:[(0,D.jsx)(cg,{children:(0,D.jsx)(`h2`,{children:t(`avatar_name_lookups`)})}),(0,D.jsx)(lg,{children:(0,D.jsxs)(ug,{children:[(0,D.jsx)(hg,{children:t(`api_endpoints`)}),(0,D.jsxs)(yg,{children:[t(`tried_in_order_the_first_name_wins_each_is_called_as`),(0,D.jsx)(`code`,{children:` ?fileId=file_…`}),` `,t(`and_must_answer_with_json_containing_a`),(0,D.jsx)(`code`,{children:` name`}),`.`]}),(0,D.jsxs)(fg,{children:[o.length===0&&(0,D.jsx)(pg,{children:t(`no_endpoint_avatar_names_stay_unknown`)}),o.map((e,n)=>(0,D.jsxs)(dg,{children:[(0,D.jsx)(mg,{"aria-label":t(`avatar_api_endpoint`),onBlur:()=>void N(),onChange:e=>{let t=[...o];t[n]=e.target.value,s(t)},spellCheck:!1,value:e}),(0,D.jsx)(xg,{"aria-label":t(`remove_endpoint`),onClick:()=>_t(n),type:`button`,children:(0,D.jsx)(Ns,{})})]},`${e}-${n}`))]}),(0,D.jsxs)(dg,{children:[(0,D.jsx)(mg,{"aria-label":t(`new_avatar_api_endpoint`),onChange:e=>l(e.target.value),placeholder:`https://example.com/avatars`,spellCheck:!1,value:c}),(0,D.jsx)(xg,{disabled:c.trim().length===0,onClick:gt,type:`button`,children:t(`add`)})]})]})})]}),(0,D.jsxs)(sg,{id:`settings-osc`,children:[(0,D.jsx)(cg,{children:(0,D.jsx)(`h2`,{children:t(`osc`)})}),(0,D.jsxs)(lg,{children:[(0,D.jsxs)(ug,{children:[(0,D.jsx)(hg,{children:t(`osc_port`)}),(0,D.jsx)(dg,{children:(0,D.jsx)(mg,{"aria-label":t(`osc_port`),max:65535,min:1,onChange:e=>$e(Number(e.target.value)||9e3),type:`number`,value:xe})}),(0,D.jsx)(yg,{children:t(`vr_chat_listens_on_9000_unless_it_was_started_with_a_custom_osc_port`)})]}),(0,D.jsxs)(ug,{children:[(0,D.jsxs)(dg,{children:[(0,D.jsx)(xg,{disabled:Te,onClick:()=>void Qe(),type:`button`,children:t(Te?`testing`:`test_connection`)}),(0,D.jsx)(yg,{children:t(`opens_vr_chat_s_quick_menu_when_osc_is_working`)})]}),(0,D.jsx)(yg,{children:k?.listening?k.detected>0&&k.detected!==xe?t(`vr_chat_reports_port_detected_anti_bot_sends_to_port`,{detected:k.detected,port:xe}):t(`vr_chat_is_advertising_osc_on_port_port`,{port:xe}):t(`vr_chat_is_not_advertising_osc_enable_it_in_the_action_menu`)}),A&&(0,D.jsx)(yg,{children:A})]})]})]}),(0,D.jsxs)(sg,{id:`settings-protection`,children:[(0,D.jsx)(cg,{children:(0,D.jsx)(`h2`,{children:t(`automatic_protection`)})}),(0,D.jsxs)(lg,{children:[(0,D.jsxs)(ug,{children:[(0,D.jsx)(hg,{children:t(`threat_threshold`)}),(0,D.jsx)(dg,{children:(0,D.jsx)(Lg,{min:0,onChange:e=>ht(Number(e.target.value)),step:10,type:`number`,value:ae})}),(0,D.jsx)(yg,{children:t(`any_user_at_or_above_this_score_is_acted_on_the_score_is_a_guess_and_can_be_wrong_friends_and_whitelisted_users_are_never_acted_on`)})]}),(0,D.jsxs)(Rg,{children:[(0,D.jsx)(pl,{checked:u,hint:t(`block_the_user_vr_chat_may_then_refuse_to_send_them_your_avatar_if_it_checks_blocks_on_the_server_it_may_also_have_no_effect`),onChange:e=>{d(e),N({autoBlock:e})},title:t(`block_the_user`)}),(0,D.jsx)(pl,{checked:f,hint:t(`turn_the_user_s_avatar_interactions_off_so_their_avatar_cannot_trigger_anything_on_yours`),onChange:e=>{p(e),N({autoDisableAvatarInteraction:e})},title:t(`disable_avatar_interactions`)}),(0,D.jsx)(pl,{checked:m,hint:t(`hide_the_user_s_chat_box_so_they_cannot_flood_or_harass_through_it`),onChange:e=>{h(e),N({autoHideChatBox:e})},title:t(`hide_the_chat_box`)}),(0,D.jsx)(pl,{checked:g,hint:t(`report_the_user_to_vr_chat_for_client_modding_hacking_vr_chat_keeps_one_report_per_user_and_refuses_a_second_one_a_refused_report_is_not_recorded`),onChange:e=>{v(e),N({autoReport:e})},title:t(`report_the_user`)}),(0,D.jsx)(pl,{checked:x,hint:t(`turn_on_vr_chat_s_safe_mode_over_osc_when_a_user_reaches_the_threshold_so_every_non_friend_avatar_is_replaced_at_once_it_needs_osc_enabled_in_vr_chat_and_stays_on_until_you_turn_it_off`),onChange:e=>{S(e),N({autoSafeMode:e})},requires:t(`requires_osc`),title:t(`safe_mode_osc`)}),(0,D.jsx)(pl,{checked:C,hint:t(`switch_to_another_avatar_over_osc_when_a_user_reaches_the_threshold_it_is_not_switched_back`),onChange:e=>{ee(e),N({autoSafeAvatar:e})},requires:t(`requires_osc`),title:t(`switch_avatar_osc`)}),(0,D.jsxs)(zg,{children:[(0,D.jsx)(hg,{children:t(`safe_avatar_id`)}),(0,D.jsx)(ng,{disabled:!C,onBlur:()=>void N(),onChange:te,placeholder:`avtr_… or https://vrchat.com/home/avatar/avtr_…`,value:w}),(0,D.jsx)(yg,{children:t(`only_avatars_in_your_favourites_your_recents_or_your_own_uploads_can_be_used_paste_the_avatar_s_link_or_its_id_avtr`)})]}),(0,D.jsx)(pl,{checked:y,hint:t(`close_vr_chat_so_the_client_has_as_little_chance_as_possible_to_download_and_cache_their_avatar`)+` `+t(`when_vr_chat_really_quits_the_osc_actions_are_skipped_because_there_is_nothing_left_to_protect`),onChange:e=>{b(e),N({autoCloseVrchat:e})},title:t(`close_vr_chat`)}),(0,D.jsx)(pl,{checked:T,disabled:!y,hint:t(`do_not_close_vr_chat_while_a_vr_headset_is_in_use_quitting_from_vr_is_disruptive`),onChange:e=>{ne(e),N({skipCloseInVr:e})},title:t(`skip_while_in_vr`)}),(0,D.jsx)(pl,{checked:re,hint:t(`reject_friend_requests_from_any_user_at_or_above_the_threshold_vr_chat_s_notification_is_hidden_and_only_the_block_avatar_interaction_and_chat_box_actions_are_applied_to_the_sender_the_request_stays_in_anti_bot_s_list_as_rejected_where_it_can_be_undone`),onChange:e=>{ie(e),N({autoRejectFriendRequests:e})},title:t(`reject_friend_requests`)})]})]})]}),(0,D.jsxs)(sg,{id:`settings-whitelist`,children:[(0,D.jsx)(cg,{children:(0,D.jsx)(`h2`,{children:t(`whitelist`)})}),(0,D.jsxs)(lg,{children:[(0,D.jsxs)(ug,{children:[(0,D.jsx)(hg,{children:t(`add_a_user`)}),(0,D.jsxs)(dg,{children:[(0,D.jsx)(mg,{"aria-label":t(`whitelisted_user_id`),onChange:e=>le(e.target.value),placeholder:`usr_… or https://vrchat.com/home/user/usr_…`,spellCheck:!1,value:ce}),(0,D.jsx)(xg,{disabled:ce.trim().length===0,onClick:vt,type:`button`,children:t(`add`)})]}),(0,D.jsx)(yg,{children:t(`paste_a_vr_chat_user_id_or_profile_link_whitelisted_users_get_a_white_row_and_no_automatic_action`)})]}),(0,D.jsxs)(Bg,{children:[se.length===0&&(0,D.jsx)(pg,{children:t(`nobody_is_whitelisted`)}),se.map(e=>{let n=ue.find(t=>t.userId===e);return(0,D.jsxs)(Vg,{children:[(0,D.jsx)(Hg,{$src:n?.iconUrl??n?.avatarUrl}),(0,D.jsxs)(Ug,{children:[(0,D.jsx)(`strong`,{children:n?.name??e}),(0,D.jsx)(`span`,{children:n?.trust??e})]}),(0,D.jsx)(xg,{"aria-label":t(`remove_from_whitelist`),onClick:()=>yt(e),type:`button`,children:(0,D.jsx)(Ns,{})})]},e)})]})]})]}),Ke&&(0,D.jsx)(Sg,{children:Ke}),(0,D.jsxs)(sg,{id:`settings-build`,children:[(0,D.jsx)(cg,{children:(0,D.jsx)(`h2`,{children:t(`build`)})}),(0,D.jsxs)(lg,{children:[(0,D.jsxs)(ug,{children:[(0,D.jsx)(hg,{children:t(`version`)}),(0,D.jsx)(vg,{$mono:!0,children:e?`v${e.version} · ${e.platform}`:t(`browser_preview`)}),(0,D.jsx)(yg,{children:t(`read_from_the_executable_the_interface_is_running_in`)})]}),(0,D.jsxs)(bg,{children:[(0,D.jsxs)(xg,{disabled:Me,onClick:()=>void ut(),type:`button`,children:[(0,D.jsx)(Ys,{}),t(Me?`checking`:`check_for_updates`)]}),Ae?.available&&(0,D.jsxs)(xg,{onClick:()=>void dt(),type:`button`,children:[(0,D.jsx)(Ws,{size:16}),t(`open_release_page`)]}),Ae?.available&&e?.platform===`windows`&&(0,D.jsxs)(xg,{onClick:()=>void ft(),type:`button`,children:[(0,D.jsx)(Ls,{}),t(`download_and_install`)]}),(0,D.jsxs)(xg,{onClick:()=>void lt(),type:`button`,children:[(0,D.jsx)(Ps,{}),t(`open_log_folder`)]})]}),Ae&&(Ae.available?(0,D.jsx)(Cg,{children:t(`version_version_is_available`,{version:Ae.latest})}):(0,D.jsx)(yg,{children:t(`up_to_date_version_is_the_newest_version`,{version:Ae.current})})),e?.logDirectory&&(0,D.jsxs)(ug,{children:[(0,D.jsx)(hg,{children:t(`log_files_are_written_to`)}),(0,D.jsx)(vg,{$mono:!0,children:e.logDirectory})]})]})]}),(0,D.jsxs)(Ng,{children:[(0,D.jsxs)(Pg,{$confirming:He,disabled:Be,onBlur:()=>Ue(!1),onClick:()=>{He?(Ue(!1),st()):Ue(!0)},type:`button`,children:[(0,D.jsx)(Ns,{size:14}),t(He?`confirm_reset_every_setting`:`reset_to_defaults`)]}),We&&(0,D.jsx)(Fg,{children:t(`settings_restored_to_their_defaults`)})]}),(0,D.jsx)(Ig,{onClick:()=>Le(!0),type:`button`,children:t(`open_source_attribution`)}),(0,D.jsx)(_.Suspense,{fallback:null,children:Ie&&(0,D.jsx)(Jh,{onClose:()=>Le(!1)})})]}),(0,D.jsx)(ig,{children:Zh.map(e=>(0,D.jsx)(ag,{$active:Re===e.id,onClick:()=>tt(e.id),type:`button`,children:t(e.label)},e.id))}),Pe&&(0,D.jsx)(wg,{children:(0,D.jsxs)(Tg,{"aria-modal":`true`,role:`dialog`,children:[(0,D.jsxs)(Eg,{children:[(0,D.jsx)(Ls,{size:20}),(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`h2`,{children:t(`updating_anti_bot`)}),(0,D.jsx)(`p`,{children:Ae?.latest?t(`version_version`,{version:Ae.latest}):t(`preparing_the_update`)})]})]}),(0,D.jsx)(Dg,{children:t(`changelog`)}),(0,D.jsx)(Og,{children:Pe.changelog?(0,D.jsx)(si,{source:Pe.changelog}):Pe.phase===`changelog`?t(`loading_the_changelog`):t(`the_changelog_could_not_be_loaded`)}),(0,D.jsxs)(kg,{children:[(0,D.jsx)(`span`,{children:$h(Pe.phase,t)}),(0,D.jsx)(`span`,{children:eg(Pe)})]}),(0,D.jsx)(Ag,{children:(0,D.jsx)(jg,{$percent:Math.max(0,Math.min(100,Pe.percent))})}),Pe.error&&(0,D.jsx)(Sg,{children:Pe.error}),(0,D.jsxs)(Mg,{children:[(Pe.phase===`changelog`||Pe.phase===`downloading`)&&(0,D.jsx)(xg,{onClick:()=>void pt(),type:`button`,children:t(`cancel`)}),Pe.phase===`installing`&&(0,D.jsx)(xg,{disabled:!0,type:`button`,children:t(`installing`)}),(Pe.phase===`error`||Pe.phase===`cancelled`)&&(0,D.jsx)(xg,{onClick:()=>Fe(null),type:`button`,children:t(`close`)})]})]})})]})}function $h(e,t){switch(e){case`changelog`:return t(`preparing_the_update`);case`downloading`:return t(`downloading_the_update`);case`ready`:return t(`download_complete`);case`cancelled`:return t(`update_cancelled`);case`error`:return t(`the_update_failed`);case`installing`:return t(`installing`);default:return``}}function eg(e){return e.total>0?`${tg(e.downloaded)} / ${tg(e.total)}`:e.downloaded>0?tg(e.downloaded):``}function tg(e){if(e<=0)return`0 B`;let t=[`B`,`KB`,`MB`,`GB`];for(var n=e,r=0;n>=1024&&r<t.length-1;)n/=1024,r++;return`${n.toFixed(r===0||n>=10?0:1)} ${t[r]}`}function ng({value:e,onChange:t,onBlur:n,placeholder:r,disabled:i}){let a=O(),[o,s]=(0,_.useState)(!1);return(0,D.jsxs)(gg,{children:[(0,D.jsx)(mg,{disabled:i,onBlur:n,onChange:e=>t(e.target.value),placeholder:r,spellCheck:!1,type:o?`text`:`password`,value:e}),(0,D.jsx)(_g,{"aria-label":a(o?`hide_the_avatar_id`:`show_the_avatar_id`),onClick:()=>s(e=>!e),type:`button`,children:o?(0,D.jsx)(Hs,{size:14}):(0,D.jsx)(Vs,{size:14})})]})}var rg=K.div`
    display: flex;
    align-items: flex-start;
    gap: 20px;
    /* The cards take the window's width; nothing caps them at a reading column. */
    width: 100%;
    min-width: 0;
`,ig=K.nav`
    position: sticky;
    top: 0;
    z-index: 10;
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    gap: 2px;
    width: 144px;
    flex-shrink: 0;
    padding-top: 2px;
    user-select: none;

    @media (max-width: 1050px) {
        display: none;
    }
`,ag=K.button`
    width: 100%;
    overflow: hidden;
    padding: 6px 9px;
    border: 0;
    border-radius: 7px;
    background: ${({$active:e})=>e?`rgba(167, 139, 250, 0.16)`:`transparent`};
    color: ${({$active:e})=>e?`var(--text-primary)`:`var(--text-muted)`};
    font: inherit;
    font-size: 10.5px;
    font-weight: ${({$active:e})=>e?`600`:`500`};
    line-height: 1.35;
    text-align: left;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
        background: var(--bg-card-hover);
        color: var(--text-primary);
    }
`,og=K.div`
    display: flex;
    flex: 1 1 auto;
    flex-direction: column;
    gap: 18px;
    min-width: 0;
`,sg=K.section`
    display: flex;
    flex-direction: column;
    gap: 10px;
    scroll-margin-top: 24px;
`,cg=K.div`
    h2 {
        font-size: 13px;
        font-weight: 600;
    }
`,lg=K.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 18px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`,ug=K.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`,dg=K.div`
    display: flex;
    align-items: center;
    gap: 8px;
`,fg=K.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`,pg=K.span`
    font-size: 11px;
    color: var(--text-muted);
`,mg=K.input`
    flex: 1;
    min-width: 0;
    padding: 8px 10px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: var(--bg-input);
    color: var(--text-primary);
    font: inherit;
    font-family: var(--font-mono);
    font-size: 11px;

    &::placeholder {
        color: var(--text-muted);
    }

    &:focus {
        outline: none;
        border-color: var(--border-color-hover);
    }
`,hg=K.span`
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
`,gg=K.div`
    position: relative;
    display: flex;

    input {
        width: 100%;
        padding-right: 34px;
    }
`,_g=K.button`
    position: absolute;
    top: 50%;
    right: 6px;
    transform: translateY(-50%);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 22px;
    height: 22px;
    border: 0;
    border-radius: var(--radius-sm);
    background: transparent;
    color: var(--text-muted);
    cursor: pointer;

    &:hover {
        background: var(--bg-card-hover);
        color: var(--text-primary);
    }
`,vg=K.span`
    font-family: ${({$mono:e})=>e?`var(--font-mono)`:`var(--font-sans)`};
    font-size: 12px;
    color: var(--text-primary);
    overflow-wrap: anywhere;
`,yg=K.span`
    font-size: 10px;
    line-height: 1.5;
    color: var(--text-muted);

    code {
        font-family: var(--font-mono);
    }
`,bg=K.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`,xg=K.button`
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 8px 12px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: var(--bg-input);
    color: var(--text-secondary);
    font: inherit;
    font-size: 11px;
    white-space: nowrap;
    cursor: pointer;

    &:hover:not(:disabled) {
        border-color: var(--border-color-hover);
        color: var(--text-primary);
    }

    &:disabled {
        opacity: 0.4;
        cursor: default;
    }
`,Sg=K.span`
    color: var(--danger);
    font-size: 11px;
`,Cg=K.span`
    font-size: 11px;
    color: var(--accent-primary);
`,wg=K.div`
    position: fixed;
    inset: 0;
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: rgba(4, 3, 10, 0.72);
    backdrop-filter: blur(6px);
`,Tg=K.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    width: min(760px, 94vw);
    max-height: 88vh;
    padding: 20px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.55);
`,Eg=K.div`
    display: flex;
    gap: 12px;

    svg {
        flex-shrink: 0;
        margin-top: 2px;
        color: var(--accent-primary);
    }

    h2 {
        font-size: 15px;
        font-weight: 600;
    }

    p {
        margin-top: 2px;
        font-size: 11px;
        color: var(--text-secondary);
    }
`,Dg=K.span`
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
`,Og=K.div`
    min-height: 130px;
    max-height: 42vh;
    margin: 0;
    padding: 12px 14px;
    overflow: auto;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: var(--bg-primary);
    color: var(--text-secondary);
    font-size: 11.5px;
    line-height: 1.6;
    overflow-wrap: anywhere;

    h1, h2, h3, h4, h5, h6 {
        margin: 14px 0 6px;
        color: var(--text-primary);
        font-size: 13px;
        line-height: 1.35;
    }

    h1 {
        margin-top: 0;
        font-size: 15px;
    }

    h2 {
        font-size: 13.5px;
    }

    h3 {
        font-size: 12.5px;
    }

    p, ul, ol, blockquote {
        margin: 7px 0;
    }

    ul, ol {
        padding-left: 18px;
    }

    li {
        margin: 3px 0;
    }

    li::marker {
        color: var(--text-muted);
    }

    a {
        color: var(--accent-primary);
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }

    code {
        padding: 1px 4px;
        border-radius: 4px;
        background: var(--bg-input);
        font-family: var(--font-mono);
        font-size: 10.5px;
    }

    pre {
        margin: 8px 0;
        padding: 10px;
        overflow: auto;
        border-radius: var(--radius-sm);
        background: var(--bg-input);
    }

    pre code {
        padding: 0;
        background: none;
    }

    blockquote {
        padding-left: 10px;
        border-left: 2px solid var(--border-color);
        color: var(--text-muted);
    }

    hr {
        margin: 12px 0;
        border: none;
        border-top: 1px solid var(--border-color);
    }

    table {
        border-collapse: collapse;
        font-size: 10.5px;
    }

    th, td {
        padding: 4px 8px;
        border: 1px solid var(--border-color);
        text-align: left;
    }

    th {
        color: var(--text-primary);
    }

    img {
        max-width: 100%;
    }
`,kg=K.div`
    display: flex;
    justify-content: space-between;
    gap: 12px;
    font-family: var(--font-mono);
    font-size: 10.5px;
    color: var(--text-secondary);
`,Ag=K.div`
    height: 8px;
    overflow: hidden;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
`,jg=K.div`
    width: ${({$percent:e})=>`${e}%`};
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, rgba(167, 139, 250, 0.7), var(--accent-primary));
    transition: width 180ms ease;
`,Mg=K.div`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
`,Ng=K.div`
    display: flex;
    align-items: center;
    gap: 10px;
`,Pg=K.button`
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 7px 11px;
    border: 1px solid ${({$confirming:e})=>e?`rgba(251, 113, 133, 0.6)`:`var(--border-color)`};
    border-radius: var(--radius-sm);
    background: ${({$confirming:e})=>e?`rgba(251, 113, 133, 0.12)`:`transparent`};
    color: ${({$confirming:e})=>e?`#fb7185`:`var(--text-secondary)`};
    font: inherit;
    font-size: 10.5px;
    white-space: nowrap;
    cursor: pointer;

    &:hover:not(:disabled) {
        border-color: var(--border-color-hover);
        color: var(--text-primary);
    }

    &:disabled {
        opacity: 0.45;
        cursor: default;
    }
`,Fg=K.span`
    color: #4ade80;
    font-size: 10.5px;
`,Ig=K.button`
    align-self: flex-start;
    padding: 0;
    border: none;
    background: none;
    color: var(--text-muted);
    font-size: 10.5px;
    text-decoration: underline;
    text-underline-offset: 3px;
    cursor: pointer;

    &:hover {
        color: var(--text-secondary);
    }
`,Lg=K.input`
    width: 120px;
    padding: 7px 10px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: var(--bg-input);
    color: var(--text-primary);
    font-family: var(--font-mono);
    font-size: 12px;
`,Rg=K.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`,zg=K.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-left: 24px;
`,Bg=K.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`,Vg=K.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 8px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: rgba(255, 255, 255, 0.05);
`,Hg=K.span`
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    border-radius: 50%;
    background: var(--bg-primary) center / cover no-repeat;
    background-image: ${({$src:e})=>e?`url("${e}")`:`none`};
    box-shadow: inset 0 0 0 1px var(--border-color);
`,Ug=K.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    min-width: 0;

    strong {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 12px;
        font-weight: 500;
    }

    span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-family: var(--font-mono);
        font-size: 9.5px;
        color: var(--text-muted);
    }
`,Wg=bs`
    from {
        opacity: 0;
        transform: translateY(8px) scale(0.995);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
`,Gg={logs:{title:`vr_chat_log`,subtitle:`live_output_of_vr_chat_s_log_while_it_is_running`},instance:{title:`instance`,subtitle:`players_in_your_vr_chat_instance_from_the_api_once_signed_in`},batch:{title:`batch_actions`,subtitle:`apply_the_moderation_actions_enabled_under_automatic_protection_to_a_list_of_vr_chat_users`},requests:{title:`friend_requests`,subtitle:`every_incoming_request_anti_bot_has_recorded_with_the_sender_s_profile`},operations:{title:`operations`,subtitle:`the_automatic_actions_anti_bot_has_taken_newest_first`},bots:{title:`bot_list`,subtitle:`every_account_anti_bot_has_detected_as_a_bot_newest_first_and_repeats_are_merged`},account:{title:`account`,subtitle:`sign_in_to_vr_chat_so_the_instance_comes_from_the_api_not_the_log`},settings:{title:`settings`,subtitle:`where_the_log_comes_from_and_what_anti_bot_does_with_it`},debug:{title:`debug`,subtitle:`tools_that_only_a_debug_build_shows`}};function Kg(){let e=O(),[t,n]=(0,_.useState)(`logs`),[r,i]=(0,_.useState)(null),[a,o]=(0,_.useState)(null),[s,c]=(0,_.useState)(!1),[l,u]=(0,_.useState)(!1),[d,f]=(0,_.useState)(null),[p,m]=(0,_.useState)(`system`),h=Ee(),g=Jc(),{auth:v,ready:y}=fl(),b=v.state===`loggedIn`;Pe(p),(0,_.useEffect)(()=>{b&&c(!1)},[b]),(0,_.useEffect)(()=>u(!1),[b]),(0,_.useEffect)(()=>{ci().then(i,()=>i(null))},[]),(0,_.useEffect)(()=>(Ss().then(e=>m(xs(e.theme)),()=>void 0),E.on(e=>{e.type===`settings.changed`&&m(xs(e.data?.theme))})),[]),(0,_.useEffect)(()=>{mi().then(o,()=>void 0)},[]),(0,_.useEffect)(()=>{if(t!==`settings`||!d)return;let e=window.requestAnimationFrame(()=>{document.getElementById(d)?.scrollIntoView({behavior:`smooth`,block:`start`}),f(null)});return()=>window.cancelAnimationFrame(e)},[t,d]),(0,_.useEffect)(()=>{let e=window.setTimeout(()=>E.send({type:`app.ready`}),200);return()=>window.clearTimeout(e)},[]),(0,_.useEffect)(()=>E.on(e=>{if(e.type===`auth.expired`){c(!0),n(`account`);return}if(e.type===`app.update`||e.type===`update.checked`){o(e.data??null);return}if(e.type!==`app.navigate`)return;let t=e.data?.page;t&&n(t)}),[]);let{title:x,subtitle:S}=Gg[t];return(0,D.jsxs)(qg,{$rounded:h,children:[(0,D.jsx)(cc,{}),(0,D.jsxs)(Jg,{children:[(0,D.jsx)($s,{debug:r?.debug??!1,onNavigate:n,page:t,status:g.status}),(0,D.jsxs)(Yg,{children:[(0,D.jsxs)(Xg,{children:[(0,D.jsxs)(Zg,{children:[(0,D.jsx)(`h1`,{children:e(x)}),(0,D.jsx)(`p`,{children:e(S)})]},t),(0,D.jsx)(Qg,{children:!b&&!l&&(0,D.jsxs)($g,{children:[(0,D.jsx)(e_,{onClick:()=>n(`account`),type:`button`,children:e(s?`session_expired_automatic_protection_is_off`:`not_signed_in_detection_accuracy_and_automatic_actions_are_unavailable`)}),(0,D.jsx)(t_,{"aria-label":e(`dismiss`),onClick:()=>u(!0),title:e(`dismiss`),type:`button`,children:(0,D.jsx)(Ms,{size:11})})]})})]}),(0,D.jsx)(n_,{$flush:t!==`settings`,children:t===`logs`?(0,D.jsx)(cm,{log:g}):t===`instance`?(0,D.jsx)(sd,{signedIn:b,onSignIn:()=>n(`account`)}):t===`batch`?(0,D.jsx)(Af,{signedIn:b,onSignIn:()=>n(`account`)}):t===`requests`?(0,D.jsx)(ph,{signedIn:b,onSignIn:()=>n(`account`)}):t===`operations`?(0,D.jsx)(zm,{}):t===`bots`?(0,D.jsx)(tp,{signedIn:b}):t===`account`?(0,D.jsx)(vl,{initial:v,ready:y,expired:s}):t===`debug`?(0,D.jsx)(Rp,{}):(0,D.jsx)(Qh,{info:r})},t),(0,D.jsx)(r_,{children:(0,D.jsxs)(i_,{children:[(0,D.jsx)(a_,{children:r?`v${r.version} · ${r.platform}`:e(`browser_preview`)}),r?.debug&&(0,D.jsx)(o_,{title:e(`debug`),children:e(`debug`)}),a?.available&&(0,D.jsx)(s_,{"aria-label":e(`version_version_is_available`,{version:a.latest}),onClick:()=>{n(`settings`),f(`settings-build`)},title:e(`version_version_is_available`,{version:a.latest}),type:`button`})]})})]})]}),(0,D.jsx)(De,{}),(0,D.jsx)(bc,{})]})}var qg=K.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    background: var(--bg-primary);

    /* An undecorated window gets no frame from the compositor, so the corners are drawn here. */
    border-radius: ${({$rounded:e})=>e?`10px`:`0`};
    box-shadow: ${({$rounded:e})=>e?`inset 0 0 0 1px var(--border-color)`:`none`};
`,Jg=K.div`
    display: flex;
    flex: 1;
    min-height: 0;
    background: radial-gradient(1100px 620px at 18% -10%, rgba(139, 92, 246, 0.12), transparent 60%),
    radial-gradient(900px 500px at 110% 15%, rgba(99, 102, 241, 0.12), transparent 55%),
    var(--bg-primary);
`,Yg=K.main`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
`,Xg=K.header`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
    padding: 22px 26px 16px;
    border-bottom: 1px solid var(--border-color);
`,Zg=K.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
    animation: ${Wg} 0.18s cubic-bezier(0.22, 1, 0.36, 1);

    h1 {
        font-size: 20px;
        font-weight: 600;
        letter-spacing: -0.02em;
    }

    p {
        font-size: 12px;
        color: var(--text-secondary);
    }
`,Qg=K.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding-top: 4px;
`,$g=K.div`
    display: flex;
    align-items: center;
    gap: 2px;
    padding: 3px 4px 3px 10px;
    border: 1px solid rgba(251, 191, 36, 0.45);
    border-radius: 999px;
    background: rgba(251, 191, 36, 0.12);
    color: #fbbf24;
    font-family: var(--font-mono);
    font-size: 10px;
    white-space: nowrap;
`,e_=K.button`
    padding: 2px 0;
    border: 0;
    background: transparent;
    color: inherit;
    font: inherit;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
    }
`,t_=K.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 18px;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: transparent;
    color: inherit;
    opacity: 0.7;
    cursor: pointer;

    &:hover {
        background: rgba(251, 191, 36, 0.2);
        opacity: 1;
    }
`,n_=K.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
    padding: ${({$flush:e})=>e?`16px 26px 18px`:`22px 30px 30px`};
    overflow: ${({$flush:e})=>e?`hidden`:`auto`};
    animation: ${Wg} 0.18s cubic-bezier(0.22, 1, 0.36, 1);
`,r_=K.footer`
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    padding: 7px 26px;
    border-top: 1px solid var(--border-color);
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-muted);
`,i_=K.span`
    display: inline-flex;
    align-items: center;
    gap: 7px;
    min-width: 0;
`,a_=K.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`,o_=K.span`
    flex-shrink: 0;
    padding: 1px 5px;
    border: 1px solid rgba(251, 191, 36, 0.35);
    border-radius: 4px;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: #fbbf24;
    background: rgba(251, 191, 36, 0.14);
`,s_=K.button`
    width: 7px;
    height: 7px;
    flex-shrink: 0;
    padding: 0;
    border: 0;
    border-radius: 50%;
    background: var(--accent-primary);
    box-shadow: 0 0 0 3px rgba(167, 139, 250, 0.14), 0 0 10px rgba(167, 139, 250, 0.55);
    cursor: pointer;
    transition: transform 120ms ease, box-shadow 120ms ease;

    &:hover {
        transform: scale(1.25);
        box-shadow: 0 0 0 4px rgba(167, 139, 250, 0.2), 0 0 14px rgba(167, 139, 250, 0.7);
    }

    &:focus-visible {
        outline: 2px solid var(--border-color-focus);
        outline-offset: 3px;
    }
`;document.documentElement.dataset.theme=window.matchMedia(`(prefers-color-scheme: dark)`).matches?`dark`:`light`;var c_=document.getElementById(`root`);c_&&(0,v.createRoot)(c_).render((0,D.jsx)(_.StrictMode,{children:(0,D.jsx)(Ce,{children:(0,D.jsx)(Kg,{})})}));export{c as a,u as i,O as n,ve as r,K as t};