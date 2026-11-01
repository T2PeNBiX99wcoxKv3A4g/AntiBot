var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t,t.exports),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.for(`react.view_transition`),m=Symbol.iterator;function h(e){return typeof e!=`object`||!e?null:(e=m&&e[m]||e[`@@iterator`],typeof e==`function`?e:null)}var g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},_=Object.assign,v={};function y(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}y.prototype.isReactComponent={},y.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function b(){}b.prototype=y.prototype;function x(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}var S=x.prototype=new b;S.constructor=x,_(S,y.prototype),S.isPureReactComponent=!0;var C=Array.isArray;function ee(){}var w={H:null,A:null,T:null,S:null},te=Object.prototype.hasOwnProperty;function T(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function ne(e,t){return T(e.type,t,e.props)}function re(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function E(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var ie=/\/+/g;function ae(e,t){return typeof e==`object`&&e&&e.key!=null?E(``+e.key):t.toString(36)}function oe(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(ee,ee):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function se(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,se(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+ae(e,0):a,C(o)?(i=``,c!=null&&(i=c.replace(ie,`$&/`)+`/`),se(o,r,i,``,function(e){return e})):o!=null&&(re(o)&&(o=ne(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(ie,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(C(e))for(var u=0;u<e.length;u++)a=e[u],s=l+ae(a,u),c+=se(a,r,i,s,o);else if(u=h(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+ae(a,u++),c+=se(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return se(oe(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function D(e,t,n){if(e==null)return e;var r=[],i=0;return se(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function ce(e){if(e._status===-1){var t=e._result,n=t();n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t,n.status===void 0&&(n.status=`fulfilled`,n.value=t))},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t,n.status===void 0&&(n.status=`rejected`,n.reason=t))}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var le=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)};function ue(e){var t=w.T,n={};n.types=t===null?null:t.types,w.T=n;try{var r=e(),i=w.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(ee,le)}catch(e){le(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),w.T=t}}function de(e){var t=w.T;if(t!==null){var n=t.types;n===null?t.types=[e]:n.indexOf(e)===-1&&n.push(e)}else ue(de.bind(null,e))}var fe={map:D,forEach:function(e,t,n){D(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return D(e,function(){t++}),t},toArray:function(e){return D(e,function(e){return e})||[]},only:function(e){if(!re(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=fe,e.Component=y,e.Fragment=r,e.Profiler=a,e.PureComponent=x,e.StrictMode=i,e.Suspense=l,e.ViewTransition=p,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=w,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return w.H.useMemoCache(e)}},e.addTransitionType=de,e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=_({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!te.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return T(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)te.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return T(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=re,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:ce}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=ue,e.unstable_useCacheRefresh=function(){return w.H.useCacheRefresh()},e.use=function(e){return w.H.use(e)},e.useActionState=function(e,t,n){return w.H.useActionState(e,t,n)},e.useCallback=function(e,t){return w.H.useCallback(e,t)},e.useContext=function(e){return w.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return w.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return w.H.useEffect(e,t)},e.useEffectEvent=function(e){return w.H.useEffectEvent(e)},e.useId=function(){return w.H.useId()},e.useImperativeHandle=function(e,t,n){return w.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return w.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return w.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return w.H.useMemo(e,t)},e.useOptimistic=function(e,t){return w.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return w.H.useReducer(e,t,n)},e.useRef=function(e){return w.H.useRef(e)},e.useState=function(e){return w.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return w.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return w.H.useTransition()},e.version=`19.3.1`})),u=o(((e,t)=>{t.exports=l()})),d=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m){if(n(c)!==null)m=!0,S||(S=!0,ne());else{var t=n(l);t!==null&&ie(x,t.startTime-e)}}}var S=!1,C=-1,ee=5,w=-1;function te(){return g?!0:!(e.unstable_now()-w<ee)}function T(){if(g=!1,S){var t=e.unstable_now();w=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&te());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&ie(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?ne():S=!1}}}var ne;if(typeof y==`function`)ne=function(){y(T)};else if(typeof MessageChannel<`u`){var re=new MessageChannel,E=re.port2;re.port1.onmessage=T,ne=function(){E.postMessage(null)}}else ne=function(){_(T,0)};function ie(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):ee=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,ie(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,ne()))),r},e.unstable_shouldYield=te,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),f=o(((e,t)=>{t.exports=d()})),p=o((e=>{var t=u();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`),o=Symbol.for(`react.recoverable`),s=Symbol.for(`react.optimistic_key`);function c(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:r===s?s:``+r,children:e,containerInfo:t,implementation:n}}var l=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.browser=function(e){return{$$typeof:o,_reason:e}},e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return c(e,t,null,r)},e.flushSync=function(e){var t=l.T,n=i.p;try{if(l.T=null,i.p=2,e)return e()}finally{l.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=d(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`){if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=d(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}}else t??i.d.M(e)}},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=d(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`){if(t){var n=d(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}else i.d.m(e)}},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return l.H.useFormState(e,t,n)},e.useFormStatus=function(){return l.H.useHostTransitionStatus()},e.version=`19.3.1`})),m=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=p()})),h=o((e=>{var t=f(),n=u(),r=m();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){for(var t=e,n=t;n&&!n.alternate;)t=n,t.flags&4098&&(e=t.return),n=t.return;for(;t.return;)t=t.return;return t.tag===3?e:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function d(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function p(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=p(e),t!==null)return t;e=e.sibling}return null}function h(e,t,n,r,i,a){for(;e!==null;){if((e.tag===5||e.tag===27||e.tag===6)&&n(e,r,i,a)||(e.tag!==22||e.memoizedState===null)&&(t||e.tag!==5&&e.tag!==27)&&h(e.child,t,n,r,i,a))return!0;e=e.sibling}return!1}function g(e){for(e=e.return;e!==null;){if(e.tag===3||e.tag===5||e.tag===27)return e;e=e.return}return null}function _(e){var t=!1;for(e=e.return;e!==null&&(e.tag===4&&(t=!0),e.tag!==3&&e.tag!==5&&e.tag!==27);)e=e.return;return t}function v(e){var t=[null,null],n=g(e);return n===null||y(t,e,n.child,{foundSelf:!1}),t}function y(e,t,n,r){for(;n!==null;){if(n===t)r.foundSelf=!0;else if(n.tag===5||n.tag===27||n.tag===6){if(r.foundSelf)return e[1]=n,!0;e[0]=n}else if((n.tag!==22||n.memoizedState===null)&&y(e,t,n.child,r))return!0;n=n.sibling}return!1}function b(e){switch(e.tag){case 5:case 27:case 6:return e.stateNode;case 3:return e.stateNode.containerInfo;default:throw Error(i(559))}}var x=null,S=null;function C(e,t,n){return e===n||e===t&&(x=e,!0)}function ee(e,t,n){return e===n?(S=e,!1):e===t&&(S!==null&&(x=e),!0)}function w(e){if(e===null)return null;do e=e===null?null:e.return;while(e&&e.tag!==5&&e.tag!==27&&e.tag!==3);return e||null}function te(e,t,n){for(var r=0,i=e;i;i=n(i))r++;i=0;for(var a=t;a;a=n(a))i++;for(;0<r-i;)e=n(e),r--;for(;0<i-r;)t=n(t),i--;for(;r--;){if(e===t||t!==null&&e===t.alternate)return e;e=n(e),t=n(t)}return null}var T=Object.assign,ne=Symbol.for(`react.element`),re=Symbol.for(`react.transitional.element`),E=Symbol.for(`react.portal`),ie=Symbol.for(`react.fragment`),ae=Symbol.for(`react.strict_mode`),oe=Symbol.for(`react.profiler`),se=Symbol.for(`react.consumer`),D=Symbol.for(`react.context`),ce=Symbol.for(`react.forward_ref`),le=Symbol.for(`react.suspense`),ue=Symbol.for(`react.suspense_list`),de=Symbol.for(`react.memo`),fe=Symbol.for(`react.lazy`),pe=Symbol.for(`react.activity`),me=Symbol.for(`react.legacy_hidden`),he=Symbol.for(`react.memo_cache_sentinel`),O=Symbol.for(`react.view_transition`),ge=Symbol.for(`react.recoverable`),k=Symbol.iterator;function _e(e){return typeof e!=`object`||!e?null:(e=k&&e[k]||e[`@@iterator`],typeof e==`function`?e:null)}var ve=Symbol.for(`react.client.reference`);function ye(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===ve?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case ie:return`Fragment`;case oe:return`Profiler`;case ae:return`StrictMode`;case le:return`Suspense`;case ue:return`SuspenseList`;case pe:return`Activity`;case O:return`ViewTransition`}if(typeof e==`object`)switch(e.$$typeof){case E:return`Portal`;case D:return e.displayName||`Context`;case se:return(e._context.displayName||`Context`)+`.Consumer`;case ce:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case de:return t=e.displayName||null,t===null?ye(e.type)||`Memo`:t;case fe:t=e._payload,e=e._init;try{return ye(e(t))}catch{}}return null}var be=Array.isArray,A=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,j=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,xe={pending:!1,data:null,method:null,action:null},Se=[],M=-1;function Ce(e){return{current:e}}function we(e){0>M||(e.current=Se[M],Se[M]=null,M--)}function N(e,t){M++,Se[M]=e.current,e.current=t}var Te=Ce(null),P=Ce(null),Ee=Ce(null),F=Ce(null);function De(e,t){switch(N(Ee,t),N(P,e),N(Te,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?up(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=up(t),e=dp(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}we(Te),N(Te,e)}function Oe(){we(Te),we(P),we(Ee)}function ke(e){var t=e.memoizedState;t!==null&&(sh._currentValue=t.memoizedState,N(F,e)),t=Te.current;var n=dp(t,e.type);t!==n&&(N(P,e),N(Te,n))}function Ae(e){P.current===e&&(we(Te),we(P)),F.current===e&&(we(F),sh._currentValue=xe)}var je,Me;function Ne(e){if(je===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);je=t&&t[1]||``,Me=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+je+e+Me}var Pe=!1;function Fe(e,t){if(!e||Pe)return``;Pe=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}n=!1;try{var i=Object.getOwnPropertyDescriptor(e.prototype,`props`);Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),n=!0,new e}finally{n&&(i===void 0?delete e.prototype.props:Object.defineProperty(e.prototype,"props",i))}}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{Pe=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?Ne(n):``}function Ie(e,t){switch(e.tag){case 26:case 27:case 5:return Ne(e.type);case 16:return Ne(`Lazy`);case 13:return e.child!==t&&t!==null?Ne(`Suspense Fallback`):Ne(`Suspense`);case 19:return Ne(`SuspenseList`);case 0:case 15:return Fe(e.type,!1);case 11:return Fe(e.type.render,!1);case 1:return Fe(e.type,!0);case 31:return Ne(`Activity`);case 30:return Ne(`ViewTransition`);default:return``}}function Le(e){try{var t=``,n=null;do t+=Ie(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Re=Object.prototype.hasOwnProperty,ze=t.unstable_scheduleCallback,Be=t.unstable_cancelCallback,Ve=t.unstable_shouldYield,He=t.unstable_requestPaint,Ue=t.unstable_now,We=t.unstable_getCurrentPriorityLevel,Ge=t.unstable_ImmediatePriority,Ke=t.unstable_UserBlockingPriority,qe=t.unstable_NormalPriority,Je=t.unstable_LowPriority,Ye=t.unstable_IdlePriority,Xe=t.log,Ze=t.unstable_setDisableYieldValue,Qe=null,$e=null;function et(e){if(typeof Xe==`function`&&Ze(e),$e&&typeof $e.setStrictMode==`function`)try{$e.setStrictMode(Qe,e)}catch{}}var tt=Math.clz32?Math.clz32:it,nt=Math.log,rt=Math.LN2;function it(e){return e>>>=0,e===0?32:31-(nt(e)/rt|0)|0}var at=256,ot=262144,st=4194304;function ct(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function lt(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=ct(n))):i=ct(o):i=ct(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=ct(n))):i=ct(o)):i=ct(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function ut(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function dt(e,t){t&8&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var r=31-tt(n),i=1<<r;t|=e[r],n&=~i}return t}function ft(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function pt(){var e=st;return st<<=1,!(st&62914560)&&(st=4194304),e}function mt(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function ht(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function gt(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-tt(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&_t(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function _t(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-tt(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function vt(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-tt(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function yt(e,t){var n=t&-t;return n=n&42?1:bt(n),(n&(e.suspendedLanes|t))===0?n:0}function bt(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function xt(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function St(){var e=j.p;return e===0?(e=window.event,e===void 0?32:Ch(e.type)):e}function Ct(e,t){var n=j.p;try{return j.p=e,t()}finally{j.p=n}}var wt=Math.random().toString(36).slice(2),Tt=`__reactFiber$`+wt,Et=`__reactProps$`+wt,Dt=`__reactContainer$`+wt,Ot=`__reactEvents$`+wt,kt=`__reactListeners$`+wt,At=`__reactHandles$`+wt,jt=`__reactResources$`+wt,Mt=`__reactMarker$`+wt,Nt=`__reactLoad$`+wt;function Pt(e){delete e[Tt],delete e[Et],delete e[kt],delete e[At]}function Ft(e){var t;if(t=e[Tt])return t;for(var n=e.parentNode;n;){if(t=n[Dt]||n[Tt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=fm(e);e!==null;){if(n=e[Tt])return n;e=fm(e)}return t}e=n,n=e.parentNode}return null}function It(e){if(e=e[Tt]||e[Dt]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function Lt(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function Rt(e){var t=e[jt];return t||=e[jt]={hoistableStyles:new Map,hoistableScripts:new Map},t}function zt(e){e[Mt]=!0}function Bt(e){e[Nt]=void 0}var Vt=new Set,Ht={};function Ut(e,t){Wt(e,t),Wt(e+`Capture`,t)}function Wt(e,t){for(Ht[e]=t,e=0;e<t.length;e++)Vt.add(t[e])}var Gt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Kt={},qt={};function Jt(e){return Re.call(qt,e)?!0:Re.call(Kt,e)?!1:Gt.test(e)?qt[e]=!0:(Kt[e]=!0,!1)}var I=!1;function Yt(){var e=I;return I=!1,e}function Xt(e,t,n){if(Jt(t)){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,n)}}}function Zt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,n)}}function Qt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,r)}}function $t(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function en(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function tn(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function nn(e){if(!e._valueTracker){var t=en(e)?`checked`:`value`;e._valueTracker=tn(e,t,``+e[t])}}function rn(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=en(e)?e.checked?`true`:`false`:e.value),e=r,e!==n&&(t.setValue(e),!0)}var an=/[\n"\\]/g;function on(e){return e.replace(an,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function sn(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+$t(t)):e.value!==``+$t(t)&&(e.value=``+$t(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):ln(e,$t(n)):o===`number`&&e.value==t?ln(e,$t(e.value)):ln(e,$t(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+$t(s):e.removeAttribute(`name`)}function cn(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){nn(e);return}n=n==null?``:``+$t(n),t=t==null?n:``+$t(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),nn(e)}function ln(e,t){e.defaultValue!==``+t&&(e.defaultValue=``+t)}function un(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+$t(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function dn(e,t,n){t!=null&&(t=``+$t(t),t!==e.value&&(e.value=t),n==null)?e.defaultValue!==t&&(e.defaultValue=t):e.defaultValue=n==null?``:``+$t(n)}function fn(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(be(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=$t(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),nn(e)}function pn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var mn=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function hn(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||mn.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function gn(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``,I=!0);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&(hn(e,a,r),I=!0)}else for(var o in t)t.hasOwnProperty(o)&&hn(e,o,t[o])}function _n(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var vn=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`maskType`,`mask-type`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),yn=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function bn(e){return yn.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function xn(){}var Sn=null;function Cn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var wn=null,Tn=null;function En(e){var t=It(e);if(t&&(e=t.stateNode)){var n=e[Et]||null;a:switch(e=t.stateNode,t.type){case`input`:if(sn(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+on(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[Et]||null;if(!a)throw Error(i(90));sn(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&rn(r)}break a;case`textarea`:dn(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&un(e,!!n.multiple,t,!1)}}}var Dn=!1;function On(e,t,n){if(Dn)return e(t,n);Dn=!0;try{return e(t)}finally{if(Dn=!1,(wn!==null||Tn!==null)&&(zd(),wn&&(t=wn,e=Tn,Tn=wn=null,En(t),e)))for(t=0;t<e.length;t++)En(e[t])}}function kn(e,t){var n=e.stateNode;if(n===null)return null;var r=n[Et]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=e!==`button`&&e!==`input`&&e!==`select`&&e!==`textarea`),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var An=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,jn=!1;if(An)try{var Mn={};Object.defineProperty(Mn,"passive",{get:function(){jn=!0}}),window.addEventListener(`test`,Mn,Mn),window.removeEventListener(`test`,Mn,Mn)}catch{jn=!1}var Nn=null,Pn=null,Fn=null;function In(){if(Fn)return Fn;var e,t=Pn,n=t.length,r,i=`value`in Nn?Nn.value:Nn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return Fn=i.slice(e,1<r?1-r:void 0)}function Ln(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function Rn(){return!0}function zn(){return!1}function Bn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?Rn:zn,this.isPropagationStopped=zn,this}return T(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=Rn)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=Rn)},persist:function(){},isPersistent:Rn}),t}var Vn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Hn=Bn(Vn),Un=T({},Vn,{view:0,detail:0}),Wn=Bn(Un),Gn,Kn,qn,Jn=T({},Un,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:ar,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==qn&&(qn&&e.type===`mousemove`?(Gn=e.screenX-qn.screenX,Kn=e.screenY-qn.screenY):Kn=Gn=0,qn=e),Gn)},movementY:function(e){return`movementY`in e?e.movementY:Kn}}),Yn=Bn(Jn),Xn=Bn(T({},Jn,{dataTransfer:0})),Zn=Bn(T({},Un,{relatedTarget:0})),Qn=Bn(T({},Vn,{animationName:0,elapsedTime:0,pseudoElement:0})),$n=Bn(T({},Vn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),er=Bn(T({},Vn,{data:0})),tr={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},nr={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},rr={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function ir(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=rr[e])?!!t[e]:!1}function ar(){return ir}var or=Bn(T({},Un,{key:function(e){if(e.key){var t=tr[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=Ln(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?nr[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:ar,charCode:function(e){return e.type===`keypress`?Ln(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?Ln(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),sr=Bn(T({},Jn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),cr=Bn(T({},Vn,{submitter:0})),lr=Bn(T({},Un,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:ar})),L=Bn(T({},Vn,{propertyName:0,elapsedTime:0,pseudoElement:0})),ur=Bn(T({},Jn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),dr=Bn(T({},Vn,{newState:0,oldState:0,source:0})),fr=[9,13,27,32],pr=An&&`CompositionEvent`in window,mr=null;An&&`documentMode`in document&&(mr=document.documentMode);var hr=An&&`TextEvent`in window&&!mr,gr=An&&(!pr||mr&&8<mr&&11>=mr),_r=` `,vr=!1;function yr(e,t){switch(e){case`keyup`:return fr.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function br(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var xr=!1;function Sr(e,t){switch(e){case`compositionend`:return br(t);case`keypress`:return t.which===32?(vr=!0,_r):null;case`textInput`:return e=t.data,e===_r&&vr?null:e;default:return null}}function Cr(e,t){if(xr)return e===`compositionend`||!pr&&yr(e,t)?(e=In(),Fn=Pn=Nn=null,xr=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return gr&&t.locale!==`ko`?null:t.data;default:return null}}var wr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function Tr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!wr[e.type]:t===`textarea`}function Er(e,t,n,r){wn?Tn?Tn.push(r):Tn=[r]:wn=r,t=Jf(t,`onChange`),0<t.length&&(n=new Hn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var Dr=null,Or=null;function kr(e){Vf(e,0)}function Ar(e){if(rn(Lt(e)))return e}function jr(e,t){if(e===`change`)return t}var Mr=!1;if(An){var Nr;if(An){var Pr=`oninput`in document;if(!Pr){var Fr=document.createElement(`div`);Fr.setAttribute(`oninput`,`return;`),Pr=typeof Fr.oninput==`function`}Nr=Pr}else Nr=!1;Mr=Nr&&(!document.documentMode||9<document.documentMode)}function Ir(){Dr&&(Dr.detachEvent(`onpropertychange`,Lr),Or=Dr=null)}function Lr(e){if(e.propertyName===`value`&&Ar(Or)){var t=[];Er(t,Or,e,Cn(e)),On(kr,t)}}function Rr(e,t,n){e===`focusin`?(Ir(),Dr=t,Or=n,Dr.attachEvent(`onpropertychange`,Lr)):e===`focusout`&&Ir()}function zr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return Ar(Or)}function Br(e,t){if(e===`click`)return Ar(t)}function Vr(e,t){if(e===`input`||e===`change`)return Ar(t)}function Hr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Ur=typeof Object.is==`function`?Object.is:Hr;function Wr(e,t){if(Ur(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Re.call(t,i)||!Ur(e[i],t[i]))return!1}return!0}function Gr(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}function Kr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function qr(e,t){var n=Kr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Kr(n)}}function Jr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?Jr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function Yr(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Gr(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Gr(e.document)}return t}function Xr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Zr=An&&`documentMode`in document&&11>=document.documentMode,Qr=null,$r=null,ei=null,ti=!1;function ni(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;ti||Qr==null||Qr!==Gr(r)||(r=Qr,`selectionStart`in r&&Xr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),ei&&Wr(ei,r)||(ei=r,r=Jf($r,`onSelect`),0<r.length&&(t=new Hn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Qr)))}function ri(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var ii={animationend:ri(`Animation`,`AnimationEnd`),animationiteration:ri(`Animation`,`AnimationIteration`),animationstart:ri(`Animation`,`AnimationStart`),transitionrun:ri(`Transition`,`TransitionRun`),transitionstart:ri(`Transition`,`TransitionStart`),transitioncancel:ri(`Transition`,`TransitionCancel`),transitionend:ri(`Transition`,`TransitionEnd`)},ai={},oi={};An&&(oi=document.createElement(`div`).style,`AnimationEvent`in window||(delete ii.animationend.animation,delete ii.animationiteration.animation,delete ii.animationstart.animation),`TransitionEvent`in window||delete ii.transitionend.transition);function si(e){if(ai[e])return ai[e];if(!ii[e])return e;var t=ii[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in oi)return ai[e]=t[n];return e}var ci=si(`animationend`),li=si(`animationiteration`),ui=si(`animationstart`),di=si(`transitionrun`),fi=si(`transitionstart`),pi=si(`transitioncancel`),mi=si(`transitionend`),hi=new Map,gi=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);gi.push(`scrollEnd`);function _i(e,t){hi.set(e,t),Ut(t,[e])}var vi=0;function yi(e,t){if(e.name!=null&&e.name!==`auto`)return e.name;if(t.autoName!==null)return t.autoName;e=bd.identifierPrefix;var n=vi++;return e=`_`+e+`t_`+n.toString(32)+`_`,t.autoName=e}function bi(e){if(e==null||typeof e==`string`)return e;var t=null,n=Od;if(n!==null)for(var r=0;r<n.length;r++){var i=e[n[r]];if(i!=null){if(i===`none`)return`none`;t=t==null?i:t+(` `+i)}}return t??e.default}function xi(e,t){return e=bi(e),t=bi(t),t==null?e===`auto`?null:e:t===`auto`?null:t}var Si=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},Ci=[],wi=0,Ti=0;function Ei(){for(var e=wi,t=Ti=wi=0;t<e;){var n=Ci[t];Ci[t++]=null;var r=Ci[t];Ci[t++]=null;var i=Ci[t];Ci[t++]=null;var a=Ci[t];if(Ci[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&Ai(n,i,a)}}function Di(e,t,n,r){Ci[wi++]=e,Ci[wi++]=t,Ci[wi++]=n,Ci[wi++]=r,Ti|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function Oi(e,t,n,r){return Di(e,t,n,r),ji(e)}function ki(e,t){return Di(e,null,null,t),ji(e)}function Ai(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-tt(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function ji(e){if(50<kd)throw kd=0,Ad=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Mi={};function Ni(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Pi(e,t,n,r){return new Ni(e,t,n,r)}function Fi(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Ii(e,t){var n=e.alternate;return n===null?(n=Pi(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&1206910976,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Li(e,t){e.flags&=1206910978;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Ri(e,t,n,r,a,o){var s=0;if(r=e,typeof r==`function`)Fi(r)&&(s=1);else if(typeof r==`string`)s=qm(e,n,Te.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(r){case pe:return e=Pi(31,n,t,a),e.elementType=pe,e.lanes=o,e;case ie:return zi(n.children,a,o,t);case ae:s=8,a|=24;break;case oe:return e=Pi(12,n,t,a|2),e.elementType=oe,e.lanes=o,e;case le:return e=Pi(13,n,t,a),e.elementType=le,e.lanes=o,e;case ue:return e=Pi(19,n,t,a),e.elementType=ue,e.lanes=o,e;case me:case O:return e=a|32,e=Pi(30,n,t,e),e.elementType=O,e.lanes=o,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof r==`object`&&r)switch(r.$$typeof){case D:s=10;break a;case se:s=9;break a;case ce:s=11;break a;case de:s=14;break a;case fe:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=Pi(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function zi(e,t,n,r){return e=Pi(7,e,r,t),e.lanes=n,e}function Bi(e,t,n){return e=Pi(6,e,null,t),e.lanes=n,e}function Vi(e){var t=Pi(18,null,null,0);return t.stateNode=e,t}function Hi(e,t,n){return t=Pi(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var Ui=new WeakMap;function Wi(e,t){if(typeof e==`object`&&e){var n=Ui.get(e);return n===void 0?(t={value:e,source:t,stack:Le(t)},Ui.set(e,t),t):n}return{value:e,source:t,stack:Le(t)}}var Gi=[],Ki=0,qi=null,Ji=0,Yi=[],Xi=0,Zi=null,Qi=1,$i=``;function ea(e,t){Gi[Ki++]=Ji,Gi[Ki++]=qi,qi=e,Ji=t}function ta(e,t,n){Yi[Xi++]=Qi,Yi[Xi++]=$i,Yi[Xi++]=Zi,Zi=e;var r=Qi;e=$i;var i=32-tt(r)-1;r&=~(1<<i),n+=1;var a=32-tt(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Qi=1<<32-tt(t)+i|n<<i|r,$i=a+e}else Qi=1<<a|n<<i|r,$i=e}function na(e){e.return!==null&&(ea(e,1),ta(e,1,0))}function ra(e){for(;e===qi;)qi=Gi[--Ki],Gi[Ki]=null,Ji=Gi[--Ki],Gi[Ki]=null;for(;e===Zi;)Zi=Yi[--Xi],Yi[Xi]=null,$i=Yi[--Xi],Yi[Xi]=null,Qi=Yi[--Xi],Yi[Xi]=null}function ia(e,t){Yi[Xi++]=Qi,Yi[Xi++]=$i,Yi[Xi++]=Zi,Qi=t.id,$i=t.overflow,Zi=e}var aa=null,R=null,z=!1,oa=null,sa=!1,ca=Error(i(519));function la(e){throw ha(Wi(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),ca}function ua(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[Tt]=e,t[Et]=r,n){case`dialog`:Q(`cancel`,t),Q(`close`,t);break;case`iframe`:case`object`:case`embed`:Q(`load`,t);break;case`video`:case`audio`:for(n=0;n<zf.length;n++)Q(zf[n],t);break;case`source`:Q(`error`,t);break;case`img`:case`image`:case`link`:Q(`error`,t),Q(`load`,t);break;case`details`:Q(`toggle`,t);break;case`input`:Q(`invalid`,t),cn(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:Q(`invalid`,t);break;case`textarea`:Q(`invalid`,t),fn(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||ep(t.textContent,n)?(r.popover!=null&&(Q(`beforetoggle`,t),Q(`toggle`,t)),r.onScroll!=null&&Q(`scroll`,t),r.onScrollEnd!=null&&Q(`scrollend`,t),r.onClick!=null&&(t.onclick=xn),t=!0):t=!1,t||la(e,!0)}function da(e){for(aa=e.return;aa;)switch(aa.tag){case 5:case 31:case 13:sa=!1;return;case 27:case 3:sa=!0;return;default:aa=aa.return}}function fa(e){if(e!==aa)return!1;if(!z)return da(e),z=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=n===`form`||n===`button`||pp(e.type,e.memoizedProps)),n=!n),n&&R&&la(e),da(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));R=dm(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));R=dm(e)}else t===27?(t=R,Sp(e.type)?(e=um,um=null,R=e):R=t):R=aa?lm(e.stateNode.nextSibling):null;return!0}function pa(){R=aa=null,z=!1}function ma(){var e=oa;return e!==null&&(fd===null?fd=e:fd.push.apply(fd,e),oa=null),e}function ha(e){oa===null?oa=[e]:oa.push(e)}var ga=Ce(null),_a=null,va=null;function ya(e,t,n){N(ga,t._currentValue),t._currentValue=n}function ba(e){e._currentValue=ga.current,we(ga)}function xa(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function Sa(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),xa(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),xa(s,n,e),s=null}else a.tag===13&&a.memoizedState!==null&&a.memoizedState.dehydrated===null?(a.lanes|=n,s=a.alternate,s!==null&&(s.lanes|=n),xa(a.return,n,e),s=a.child,s=s===null?null:s.sibling):s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function Ca(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;Ur(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===F.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[sh]:e.push(sh))}a=a.return}return e!==null&&Sa(t,e,n,r),t.flags|=262144,e!==null}function wa(e){for(e=e.firstContext;e!==null;){if(!Ur(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Ta(e){_a=e,va=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Ea(e){return Oa(_a,e)}function Da(e,t){return _a===null&&Ta(e),Oa(e,t)}function Oa(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},va===null){if(e===null)throw Error(i(308));va=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else va=va.next=t;return n}var ka=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},Aa=t.unstable_scheduleCallback,ja=t.unstable_NormalPriority,B={$$typeof:D,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Ma(){return{controller:new ka,data:new Map,refCount:0}}function Na(e){e.refCount--,e.refCount===0&&Aa(ja,function(){e.controller.abort()})}function Pa(e,t){if(e.pendingLanes&4194048){var n=e.transitionTypes;for(n===null&&(n=e.transitionTypes=[]),e=0;e<t.length;e++){var r=t[e];n.indexOf(r)===-1&&n.push(r)}}}var Fa=null;function Ia(e){var t=e.transitionTypes;return e.transitionTypes=null,t}var La=null,Ra=0,za=0,Ba=null;function Va(e,t){if(La===null){var n=La=[];Ra=0,za=Pf(),Ba={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return Ra++,t.then(Ha,Ha),t}function Ha(){if(--Ra===0&&(Fa=null,La!==null)){Ba!==null&&(Ba.status=`fulfilled`);var e=La;La=null,za=0,Ba=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Ua(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var Wa=A.S;A.S=function(e,t){if(hd=Ue(),typeof t==`object`&&t&&typeof t.then==`function`&&Va(e,t),Fa!==null)for(var n=bf;n!==null;)Pa(n,Fa),n=n.next;if(n=e.types,n!==null){for(var r=bf;r!==null;)Pa(r,n),r=r.next;if(za!==0){r=Fa,r===null&&(r=Fa=[]);for(var i=0;i<n.length;i++){var a=n[i];r.indexOf(a)===-1&&r.push(a)}}}Wa!==null&&Wa(e,t)};var Ga=Ce(null);function Ka(){var e=Ga.current;return e===null?q.pooledCache:e}function qa(e,t){t===null?N(Ga,Ga.current):N(Ga,t.pool)}function Ja(){var e=Ka();return e===null?null:{parent:B._currentValue,pool:e}}var Ya=Error(i(460)),Xa=Error(i(474)),Za=Error(i(542)),Qa={then:function(){}};function $a(e){return e=e.status,e===`fulfilled`||e===`rejected`}function eo(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(xn,xn),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,io(e),e===void 0&&!(`reason`in t)?Error(i(600)):e;default:if(typeof t.status==`string`)t.then(xn,xn);else{if(e=q,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,io(e),e}throw no=t,Ya}}function to(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(no=e,Ya):e}}var no=null;function ro(){if(no===null)throw Error(i(459));var e=no;return no=null,e}function io(e){if(e===Ya||e===Za)throw Error(i(483))}var ao=null,oo=0;function so(e){var t=oo;return oo+=1,ao===null&&(ao=[]),eo(ao,e,t)}function co(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function lo(e,t){throw t.$$typeof===ne?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function uo(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=Ii(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=134217730,n):(r=r.index,r<n?(t.flags|=2,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=134217730),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=Bi(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===ie?(e=d(e,t,n.props.children,r,n.key),co(e,n),e):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===fe&&to(i)===t.type)?(t=a(t,n.props),co(t,n),t.return=e,t):(t=Ri(n.type,n.key,n.props,null,e.mode,r),co(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=Hi(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=zi(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=Bi(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case re:return n=Ri(t.type,t.key,t.props,null,e.mode,n),co(n,t),n.return=e,n;case E:return t=Hi(t,e.mode,n),t.return=e,t;case fe:return t=to(t),f(e,t,n)}if(be(t)||_e(t))return t=zi(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,so(t),n);if(t.$$typeof===D)return f(e,Da(e,t),n);lo(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case re:return n.key===i?l(e,t,n,r):null;case E:return n.key===i?u(e,t,n,r):null;case fe:return n=to(n),p(e,t,n,r)}if(be(n)||_e(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,so(n),r);if(n.$$typeof===D)return p(e,t,Da(e,n),r);lo(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case re:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case E:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case fe:return r=to(r),m(e,t,n,r,i)}if(be(r)||_e(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,so(r),i);if(r.$$typeof===D)return m(e,t,n,Da(t,r),i);lo(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),z&&ea(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return z&&ea(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&(_=g.alternate,_!==null&&d.delete(_.key===null?h:_.key)),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),z&&ea(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),z&&ea(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return z&&ea(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&(_=v.alternate,_!==null&&h.delete(_.key===null?g:_.key)),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),z&&ea(a,g),u}function _(e,r,o,c){if(typeof o==`object`&&o&&o.type===ie&&o.key===null&&o.props.ref===void 0&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case re:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===ie){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),co(c,o),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===fe&&to(l)===r.type){n(e,r.sibling),c=a(r,o.props),co(c,o),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}o.type===ie?(c=zi(o.props.children,e.mode,c,o.key),co(c,o),c.return=e,e=c):(c=Ri(o.type,o.key,o.props,null,e.mode,c),co(c,o),c.return=e,e=c)}return s(e);case E:a:{for(l=o.key;r!==null;){if(r.key===l){if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}c=Hi(o,e.mode,c),c.return=e,e=c}return s(e);case fe:return o=to(o),_(e,r,o,c)}if(be(o))return h(e,r,o,c);if(_e(o)){if(l=_e(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return _(e,r,so(o),c);if(o.$$typeof===D)return _(e,r,Da(e,o),c);lo(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=Bi(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{oo=0;var i=_(e,t,n,r);return ao=null,i}catch(t){if(t===Ya||t===Za)throw t;var a=Pi(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var fo=uo(!0),po=uo(!1),mo=!1;function ho(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function go(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function _o(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function vo(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,K&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=ji(e),Ai(e,null,n),t}return Di(e,r,t,n),ji(e)}function yo(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,vt(e,n)}}function bo(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n}else e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var xo=!1;function So(){if(xo){var e=Ba;if(e!==null)throw e}}function Co(e,t,n,r){xo=!1;var i=e.updateQueue;mo=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(Y&f)===f:(r&f)===f){f!==0&&f===za&&(xo=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,h=s;f=t;var g=n;switch(h.tag){case 1:if(m=h.payload,typeof m==`function`){d=m.call(g,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=h.payload,f=typeof m==`function`?m.call(g,d,f):m,f==null)break a;d=T({},d,f);break a;case 2:mo=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),od|=o,e.lanes=o,e.memoizedState=d}}function wo(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function To(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)wo(n[e],t)}var Eo=Ce(null),Do=Ce(0);function Oo(e,t){e=id,N(Do,e),N(Eo,t),id=e|t.baseLanes}function ko(){N(Do,id),N(Eo,Eo.current)}function Ao(){id=Do.current,we(Eo),we(Do)}var jo=Ce(null),Mo=null;function No(e){var t=e.alternate;N(Ro,Ro.current&1),N(jo,e),Mo===null&&(t===null||Eo.current!==null||t.memoizedState!==null)&&(Mo=e)}function Po(e){N(Ro,Ro.current),N(jo,e),Mo===null&&(Mo=e)}function Fo(e){e.tag===22?(N(Ro,Ro.current),N(jo,e),Mo===null&&(Mo=e)):Io()}function Io(){N(Ro,Ro.current),N(jo,jo.current)}function Lo(e){we(jo),Mo===e&&(Mo=null),we(Ro)}var Ro=Ce(0);function zo(e,t){N(jo,jo.current),N(Ro,t)}function Bo(e){we(Ro),we(jo),Mo===e&&(Mo=null)}function Vo(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||om(n)||sm(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==`independent`){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Ho=0,V=null,H=null,Uo=null,Wo=!1,Go=!1,Ko=!1,qo=0,Jo=0,Yo=null,Xo=0;function Zo(){throw Error(i(321))}function Qo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Ur(e[n],t[n]))return!1;return!0}function $o(e,t,n,r,i,a){return Ho=a,V=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,A.H=e===null||e.memoizedState===null?gc:_c,Ko=!1,a=n(r,i),Ko=!1,Go&&(a=ts(t,n,r,i)),es(e),a}function es(e){A.H=hc;var t=H!==null&&H.next!==null;if(Ho=0,Uo=H=V=null,Wo=!1,Jo=0,Yo=null,t)throw Error(i(300));e===null||Pc||(e=e.dependencies,e!==null&&wa(e)&&(Pc=!0))}function ts(e,t,n,r){V=e;var a=0;do{if(Go&&(Yo=null),Jo=0,Go=!1,25<=a)throw Error(i(301));if(a+=1,Uo=H=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}A.H=vc,o=t(n,r)}while(Go);return o}function ns(){var e=A.H,t=e.useState()[0];return t=typeof t.then==`function`?ls(t):t,e=e.useState()[0],(H===null?null:H.memoizedState)!==e&&(V.flags|=1024),t}function rs(){var e=qo!==0;return qo=0,e}function is(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function as(e){if(Wo){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Wo=!1}Ho=0,Uo=H=V=null,Go=!1,Jo=qo=0,Yo=null}function os(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Uo===null?V.memoizedState=Uo=e:Uo=Uo.next=e,Uo}function ss(){if(H===null){var e=V.alternate;e=e===null?null:e.memoizedState}else e=H.next;var t=Uo===null?V.memoizedState:Uo.next;if(t!==null)Uo=t,H=e;else{if(e===null)throw V.alternate===null?Error(i(467)):Error(i(310));H=e,e={memoizedState:H.memoizedState,baseState:H.baseState,baseQueue:H.baseQueue,queue:H.queue,next:null},Uo===null?V.memoizedState=Uo=e:Uo=Uo.next=e}return Uo}function cs(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ls(e){var t=Jo;return Jo+=1,Yo===null&&(Yo=[]),e=eo(Yo,e,t),t=V,(Uo===null?t.memoizedState:Uo.next)===null&&(t=t.alternate,A.H=t===null||t.memoizedState===null?gc:_c),e}function us(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return ls(e);if(e.$$typeof===ge)return;if(e.$$typeof===D)return Ea(e)}throw Error(i(438,String(e)))}function ds(e){var t=null,n=V.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=V.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=cs(),V.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=he;return t.index++,n}function fs(e,t){return typeof t==`function`?t(e):t}function ps(e){return ms(ss(),H,e)}function ms(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(Ho&f)===f:(Y&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===za&&(d=!0);else if((Ho&p)===p){u=u.next,p===za&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,V.lanes|=p,od|=p;f=u.action,Ko&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,V.lanes|=f,od|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!Ur(o,e.memoizedState)&&(Pc=!0,d&&(n=Ba,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function hs(e){var t=ss(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);Ur(o,t.memoizedState)||(Pc=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function gs(e,t,n){var r=V,a=ss(),o=z;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!Ur((H||a).memoizedState,n);if(s&&(a.memoizedState=n,Pc=!0),a=a.queue,Vs(ys.bind(null,r,a,e),[e]),e=a.getSnapshot!==t||s||Uo!==null&&!!(Uo.memoizedState.tag&1),Is(e?9:8,{destroy:void 0},vs.bind(null,r,a,n,t),null),e){if(r.flags|=2048,q===null)throw Error(i(349));o||Ho&127||_s(r,t,n)}return n}function _s(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=V.updateQueue,t===null?(t=cs(),V.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function vs(e,t,n,r){t.value=n,t.getSnapshot=r,bs(t)&&xs(e)}function ys(e,t,n){return n(function(){bs(t)&&xs(e)})}function bs(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Ur(e,n)}catch{return!0}}function xs(e){var t=ki(e,2);t!==null&&Pd(t,e,2)}function Ss(e){var t=os();if(typeof e==`function`){var n=e;if(e=n(),Ko){et(!0);try{n()}finally{et(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:fs,lastRenderedState:e},t}function Cs(e,t,n,r){return e.baseState=n,ms(e,H,typeof r==`function`?r:fs)}function ws(e,t,n,r,a){if(fc(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};A.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,Ts(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Ts(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=A.T,o={};o.types=a===null?null:a.types,A.T=o;try{var s=n(i,r),c=A.S;c!==null&&c(o,s),Es(e,t,s)}catch(n){Os(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),A.T=a}}else try{a=n(i,r),Es(e,t,a)}catch(n){Os(e,t,n)}}function Es(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){Ds(e,t,n)},function(n){return Os(e,t,n)}):Ds(e,t,n)}function Ds(e,t,n){t.status=`fulfilled`,t.value=n,ks(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Ts(e,n)))}function Os(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,ks(t),t=t.next;while(t!==r)}e.action=null}function ks(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function As(e,t){return t}function js(e,t){if(z){var n=q.formState;if(n!==null){a:{var r=V;if(z){if(R){b:{for(var i=R,a=sa;i.nodeType!==8;)if(!a||(i=lm(i.nextSibling),i===null)){i=null;break b}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){R=lm(i.nextSibling),r=i.data===`F!`;break a}}la(r)}r=!1}r&&(t=n[0])}}return n=os(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:As,lastRenderedState:t},n.queue=r,n=lc.bind(null,V,r),r.dispatch=n,r=Ss(!1),a=dc.bind(null,V,!1,r.queue),r=os(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=ws.bind(null,V,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function Ms(e){return Ns(ss(),H,e)}function Ns(e,t,n){if(t=ms(e,t,As)[0],e=ps(fs)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=ls(t)}catch(e){throw e===Ya?Za:e}else r=t;t=ss();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(V.flags|=2048,Is(9,{destroy:void 0},Ps.bind(null,i,n),null)),[r,a,e]}function Ps(e,t){e.action=t}function Fs(e){var t=ss(),n=H;if(n!==null)return Ns(t,n,e);ss(),t=t.memoizedState,n=ss();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function Is(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=V.updateQueue,t===null&&(t=cs(),V.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function Ls(){return ss().memoizedState}function Rs(e,t,n,r){var i=os();V.flags|=e,i.memoizedState=Is(1|t,{destroy:void 0},n,r===void 0?null:r)}function zs(e,t,n,r){var i=ss();r=r===void 0?null:r;var a=i.memoizedState.inst;H!==null&&r!==null&&Qo(r,H.memoizedState.deps)?i.memoizedState=Is(t,a,n,r):(V.flags|=e,i.memoizedState=Is(1|t,a,n,r))}function Bs(e,t){Rs(8390656,8,e,t)}function Vs(e,t){zs(2048,8,e,t)}function Hs(e){V.flags|=4;var t=V.updateQueue;if(t===null)t=cs(),V.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function Us(e){var t=ss().memoizedState;return Hs({ref:t,nextImpl:e}),function(){if(K&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function Ws(e,t){return zs(4,2,e,t)}function Gs(e,t){return zs(4,4,e,t)}function Ks(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function qs(e,t,n){n=n==null?null:n.concat([e]),zs(4,4,Ks.bind(null,t,e),n)}function Js(){}function Ys(e,t){var n=ss();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&Qo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function Xs(e,t){var n=ss();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&Qo(t,r[1]))return r[0];if(r=e(),Ko){et(!0);try{e()}finally{et(!1)}}return n.memoizedState=[r,t],r}function Zs(e,t,n){return n===void 0||Ho&1073741824&&!(Y&261930)?e.memoizedState=t:(e.memoizedState=n,e=Md(),V.lanes|=e,od|=e,n)}function Qs(e,t,n,r){return Ur(n,t)?n:Eo.current===null?!(Ho&106)||Ho&1073741824&&!(Y&261930)?(Pc=!0,e.memoizedState=n):(e=Md(),V.lanes|=e,od|=e,t):(e=Zs(e,n,r),Ur(e,t)||(Pc=!0),e)}function $s(e,t,n,r,i){var a=j.p;j.p=a!==0&&8>a?a:8;var o=A.T,s={};s.types=o===null?null:o.types,A.T=s,dc(e,!1,t,n);try{var c=i(),l=A.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?uc(e,t,Ua(c,r),jd(e)):uc(e,t,r,jd(e))}catch(n){uc(e,t,{then:function(){},status:`rejected`,reason:n},jd())}finally{j.p=a,o!==null&&s.types!==null&&(o.types=s.types),A.T=o}}function ec(){}function tc(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=nc(e).queue;$s(e,a,t,xe,n===null?ec:function(){return rc(e),n(r)})}function nc(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:xe,baseState:xe,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:fs,lastRenderedState:xe},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:fs,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function rc(e){var t=nc(e);t.next===null&&(t=e.alternate.memoizedState),uc(e,t.next.queue,{},jd())}function ic(){return Ea(sh)}function ac(){return ss().memoizedState}function oc(){return ss().memoizedState}function sc(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=jd();e=_o(n);var r=vo(t,e,n);r!==null&&(Pd(r,t,n),yo(r,t,n)),t={cache:Ma()},e.payload=t;return}t=t.return}}function cc(e,t,n){var r=jd();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},fc(e)?pc(t,n):(n=Oi(e,t,n,r),n!==null&&(Pd(n,e,r),mc(n,t,r)))}function lc(e,t,n){uc(e,t,n,jd())}function uc(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(fc(e))pc(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Ur(s,o))return Di(e,t,i,0),q===null&&Ei(),!1}catch{}if(n=Oi(e,t,i,r),n!==null)return Pd(n,e,r),mc(n,t,r),!0}return!1}function dc(e,t,n,r){if(r={lane:2,revertLane:Pf(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},fc(e)){if(t)throw Error(i(479))}else t=Oi(e,n,r,2),t!==null&&Pd(t,e,2)}function fc(e){var t=e.alternate;return e===V||t!==null&&t===V}function pc(e,t){Go=Wo=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function mc(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,vt(e,n)}}var hc={readContext:Ea,use:us,useCallback:Zo,useContext:Zo,useEffect:Zo,useImperativeHandle:Zo,useLayoutEffect:Zo,useInsertionEffect:Zo,useMemo:Zo,useReducer:Zo,useRef:Zo,useState:Zo,useDebugValue:Zo,useDeferredValue:Zo,useTransition:Zo,useSyncExternalStore:Zo,useId:Zo,useHostTransitionStatus:Zo,useFormState:Zo,useActionState:Zo,useOptimistic:Zo,useMemoCache:Zo,useCacheRefresh:Zo,useEffectEvent:Zo},gc={readContext:Ea,use:us,useCallback:function(e,t){return os().memoizedState=[e,t===void 0?null:t],e},useContext:Ea,useEffect:Bs,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),Rs(4194308,4,Ks.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Rs(4194308,4,e,t)},useInsertionEffect:function(e,t){Rs(4,2,e,t)},useMemo:function(e,t){var n=os();t=t===void 0?null:t;var r=e();if(Ko){et(!0);try{e()}finally{et(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=os();if(n!==void 0){var i=n(t);if(Ko){et(!0);try{n(t)}finally{et(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=cc.bind(null,V,e),[r.memoizedState,e]},useRef:function(e){var t=os();return e={current:e},t.memoizedState=e},useState:function(e){e=Ss(e);var t=e.queue,n=lc.bind(null,V,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Js,useDeferredValue:function(e,t){return Zs(os(),e,t)},useTransition:function(){var e=Ss(!1);return e=$s.bind(null,V,e.queue,!0,!1),os().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=V,a=os();if(z){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),q===null)throw Error(i(349));Y&127||_s(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,Bs(ys.bind(null,r,o,e),[e]),r.flags|=2048,Is(9,{destroy:void 0},vs.bind(null,r,o,n,t),null),n},useId:function(){var e=os(),t=q.identifierPrefix;if(z){var n=$i,r=Qi;n=(r&~(1<<32-tt(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=qo++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=Xo++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:ic,useFormState:js,useActionState:js,useOptimistic:function(e){var t=os();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=dc.bind(null,V,!0,n),n.dispatch=t,[e,t]},useMemoCache:ds,useCacheRefresh:function(){return os().memoizedState=sc.bind(null,V)},useEffectEvent:function(e){var t=os(),n={impl:e};return t.memoizedState=n,function(){if(K&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},_c={readContext:Ea,use:us,useCallback:Ys,useContext:Ea,useEffect:Vs,useImperativeHandle:qs,useInsertionEffect:Ws,useLayoutEffect:Gs,useMemo:Xs,useReducer:ps,useRef:Ls,useState:function(){return ps(fs)},useDebugValue:Js,useDeferredValue:function(e,t){return Qs(ss(),H.memoizedState,e,t)},useTransition:function(){var e=ps(fs)[0],t=ss().memoizedState;return[typeof e==`boolean`?e:ls(e),t]},useSyncExternalStore:gs,useId:ac,useHostTransitionStatus:ic,useFormState:Ms,useActionState:Ms,useOptimistic:function(e,t){return Cs(ss(),H,e,t)},useMemoCache:ds,useCacheRefresh:oc,useEffectEvent:Us},vc={readContext:Ea,use:us,useCallback:Ys,useContext:Ea,useEffect:Vs,useImperativeHandle:qs,useInsertionEffect:Ws,useLayoutEffect:Gs,useMemo:Xs,useReducer:hs,useRef:Ls,useState:function(){return hs(fs)},useDebugValue:Js,useDeferredValue:function(e,t){var n=ss();return H===null?Zs(n,e,t):Qs(n,H.memoizedState,e,t)},useTransition:function(){var e=hs(fs)[0],t=ss().memoizedState;return[typeof e==`boolean`?e:ls(e),t]},useSyncExternalStore:gs,useId:ac,useHostTransitionStatus:ic,useFormState:Fs,useActionState:Fs,useOptimistic:function(e,t){var n=ss();return H===null?(n.baseState=e,[e,n.queue.dispatch]):Cs(n,H,e,t)},useMemoCache:ds,useCacheRefresh:oc,useEffectEvent:Us};function yc(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:T({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var bc={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=jd(),i=_o(r);i.payload=t,n!=null&&(i.callback=n),t=vo(e,i,r),t!==null&&(Pd(t,e,r),yo(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=jd(),i=_o(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=vo(e,i,r),t!==null&&(Pd(t,e,r),yo(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=jd(),r=_o(n);r.tag=2,t!=null&&(r.callback=t),t=vo(e,r,n),t!==null&&(Pd(t,e,n),yo(t,e,n))}};function xc(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Wr(n,r)||!Wr(i,a):!0}function Sc(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&bc.enqueueReplaceState(t,t.state,null)}function Cc(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=T({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function wc(e){Si(e)}function Tc(e){console.error(e)}function Ec(e){Si(e)}function Dc(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Oc(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function kc(e,t,n){return n=_o(n),n.tag=3,n.payload={element:null},n.callback=function(){Dc(e,t)},n}function Ac(e){return e=_o(e),e.tag=3,e}function jc(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){Oc(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){Oc(t,n,r),typeof i!=`function`&&(vd===null?vd=new Set([this]):vd.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function Mc(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&Ca(t,n,a,!0),n=jo.current,n!==null){switch(n.tag){case 31:case 13:case 19:return Mo===null?Kd():n.alternate===null&&ad===0&&(ad=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===Qa?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),mf(e,r,a)),!1;case 22:return n.flags|=65536,r===Qa?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),mf(e,r,a)),!1}throw Error(i(435,n.tag))}return mf(e,r,a),Kd(),!1}if(z)return t=jo.current,t===null?(r!==ca&&(t=Error(i(423),{cause:r}),ha(Wi(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=Wi(r,n),a=kc(e.stateNode,r,a),bo(e,a),ad!==4&&(ad=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==ca&&(e=Error(i(422),{cause:r}),ha(Wi(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=Wi(o,n),dd===null?dd=[o]:dd.push(o),ad!==4&&(ad=2),t===null)return!0;r=Wi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=kc(n.stateNode,r,e),bo(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(vd===null||!vd.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Ac(a),jc(a,e,n,r),bo(n,a),!1;break;case 22:if(n.memoizedState!==null)return n.flags|=65536,!1}n=n.return}while(n!==null);return!1}var Nc=Error(i(461)),Pc=!1;function Fc(e,t,n,r){t.child=e===null?po(t,null,n,r):fo(t,e.child,n,r)}function Ic(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return Ta(t),r=$o(e,t,n,o,a,i),s=rs(),e!==null&&!Pc?(is(e,t,i),ul(e,t,i)):(z&&s&&na(t),t.flags|=1,Fc(e,t,r,i),t.child)}function Lc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!Fi(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,Rc(e,t,a,r,i)):(e=Ri(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!dl(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Wr:n,n(o,r)&&e.ref===t.ref)return ul(e,t,i)}return t.flags|=1,e=Ii(a,r),e.ref=t.ref,e.return=t,t.child=e}function Rc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Wr(a,r)&&e.ref===t.ref){if(Pc=!1,t.pendingProps=r=a,dl(e,i))e.flags&131072&&(Pc=!0);else return t.lanes=e.lanes,ul(e,t,i)}}return Kc(e,t,n,r,i)}function zc(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return Vc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&qa(t,a===null?null:a.cachePool),a===null?ko():Oo(t,a),Fo(t);else return r=t.lanes=536870912,Vc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&qa(t,null),ko(),Io()):(qa(t,a.cachePool),Oo(t,a),Io(),t.memoizedState=null);return Fc(e,t,i,n),t.child}function Bc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Vc(e,t,n,r,i){var a=Ka();return a=a===null?null:{parent:B._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&qa(t,null),ko(),Fo(t),e!==null&&Ca(e,t,r,!0),t.childLanes=i,null}function Hc(e,t){return t=tl({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Uc(e,t,n){return fo(t,e.child,null,n),e=Hc(t,t.pendingProps),e.flags|=2,Lo(t),t.memoizedState=null,e}function Wc(e,t,n){var r=t.pendingProps,a=!!(t.flags&128);if(t.flags&=-129,e===null){if(z){if(r.mode===`hidden`)return e=Hc(t,r),t.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},Bc(null,e);if(Po(t),(e=R)?(e=am(e,sa),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Zi===null?null:{id:Qi,overflow:$i},retryLane:536870912,hydrationErrors:null},n=Vi(e),n.return=t,t.child=n,aa=t,R=null)):e=null,e===null)throw la(t);return t.lanes=536870912,null}return Hc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(Po(t),a){if(t.flags&256)t.flags&=-257,t=Uc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558))}else if(Pc||Ca(e,t,n,!1),a=(n&e.childLanes)!==0,Pc||a){if(Eo.current===null){if(r=q,r!==null&&(s=yt(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,ki(e,s),Pd(r,e,s),Nc;Kd()}t=Uc(e,t,n)}else e=o.treeContext,R=lm(s.nextSibling),aa=t,z=!0,oa=null,sa=!1,e!==null&&ia(t,e),t=Hc(t,r),t.flags|=134221824;return t}return e=Ii(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Gc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function Kc(e,t,n,r,i){return Ta(t),n=$o(e,t,n,r,void 0,i),r=rs(),e!==null&&!Pc?(is(e,t,i),ul(e,t,i)):(z&&r&&na(t),t.flags|=1,Fc(e,t,n,i),t.child)}function qc(e,t,n,r,i,a){return Ta(t),t.updateQueue=null,n=ts(t,r,n,i),es(e),r=rs(),e!==null&&!Pc?(is(e,t,a),ul(e,t,a)):(z&&r&&na(t),t.flags|=1,Fc(e,t,n,a),t.child)}function Jc(e,t,n,r,i){if(Ta(t),t.stateNode===null){var a=Mi,o=n.contextType;typeof o==`object`&&o&&(a=Ea(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=bc,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},ho(t),o=n.contextType,a.context=typeof o==`object`&&o?Ea(o):Mi,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(yc(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&bc.enqueueReplaceState(a,a.state,null),Co(t,r,a,i),So(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=Cc(n,s);a.props=c;var l=a.context,u=n.contextType;o=Mi,typeof u==`object`&&u&&(o=Ea(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&Sc(t,a,r,o),mo=!1;var f=t.memoizedState;a.state=f,Co(t,r,a,i),So(),l=t.memoizedState,s||f!==l||mo?(typeof d==`function`&&(yc(t,n,d,r),l=t.memoizedState),(c=mo||xc(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,go(e,t),o=t.memoizedProps,u=Cc(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=Mi,typeof l==`object`&&l&&(c=Ea(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&Sc(t,a,r,c),mo=!1,f=t.memoizedState,a.state=f,Co(t,r,a,i),So();var p=t.memoizedState;o!==d||f!==p||mo||e!==null&&e.dependencies!==null&&wa(e.dependencies)?(typeof s==`function`&&(yc(t,n,s,r),p=t.memoizedState),(u=mo||xc(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&wa(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,Gc(e,t),r=!!(t.flags&128),a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=fo(t,e.child,null,i),t.child=fo(t,null,n,i)):Fc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=ul(e,t,i),e}function Yc(e,t,n,r){return pa(),t.flags|=256,Fc(e,t,n,r),t.child}var Xc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Zc(e){return{baseLanes:e,cachePool:Ja()}}function Qc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=ld),e}function $c(e,t,n){var r=t.pendingProps,i=!1,a=!!(t.flags&128),o;if((o=a)||(o=e!==null&&e.memoizedState===null?!1:!!(Ro.current&2)),o&&(i=!0,t.flags&=-129),o=!!(t.flags&32),t.flags&=-33,e===null){if(z){if(i?No(t):Io(),(e=R)?(e=am(e,sa),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:Zi===null?null:{id:Qi,overflow:$i},retryLane:536870912,hydrationErrors:null},n=Vi(e),n.return=t,t.child=n,aa=t,R=null)):e=null,e===null)throw la(t);return t.lanes=sm(e)?32:536870912,null}return a=r.children,r=r.fallback,i?(Io(),i=t.mode,a=tl({mode:`hidden`,children:a},i),r=zi(r,i,n,null),a.return=t,r.return=t,a.sibling=r,t.child=a,r=t.child,r.memoizedState=Zc(n),r.childLanes=Qc(e,o,n),t.memoizedState=Xc,Bc(null,r)):(No(t),el(t,a))}var s=e.memoizedState;if(s!==null){var c=s.dehydrated;if(c!==null)return rl(e,t,a,o,r,c,s,n)}return i?(Io(),i=r.fallback,a=t.mode,s=e.child,c=s.sibling,r=Ii(s,{mode:`hidden`,children:r.children}),r.subtreeFlags=s.subtreeFlags&1206910976,c===null?(i=zi(i,a,n,null),i.flags|=2):i=Ii(c,i),i.return=t,r.return=t,r.sibling=i,t.child=r,Bc(null,r),r=t.child,i=e.child.memoizedState,i===null?i=Zc(n):(a=i.cachePool,a===null?a=Ja():(s=B._currentValue,a=a.parent===s?a:{parent:s,pool:s}),i={baseLanes:i.baseLanes|n,cachePool:a}),r.memoizedState=i,r.childLanes=Qc(e,o,n),t.memoizedState=Xc,Bc(e.child,r)):(No(t),n=e.child,e=n.sibling,n=Ii(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=n,t.memoizedState=null,n)}function el(e,t){return t=tl({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function tl(e,t){return e=Pi(22,e,null,t),e.lanes=0,e}function nl(e,t,n){return fo(t,e.child,null,n),e=el(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function rl(e,t,n,r,a,o,s,c){if(n)return t.flags&256?(No(t),t.flags&=-257,nl(e,t,c)):t.memoizedState===null?(Io(),o=a.fallback,s=t.mode,a=tl({mode:`visible`,children:a.children},s),o=zi(o,s,c,null),o.flags|=2,a.return=t,o.return=t,a.sibling=o,t.child=a,fo(t,e.child,null,c),a=t.child,a.memoizedState=Zc(c),a.childLanes=Qc(e,r,c),t.memoizedState=Xc,Bc(null,a)):(Io(),t.child=e.child,t.flags|=128,null);if(No(t),sm(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var l=r.dgst;return r=l,r!==``&&(a=Error(i(419)),a.stack=``,a.digest=r,ha({value:a,source:null,stack:null})),nl(e,t,c)}if(Pc||Ca(e,t,c,!1),r=(c&e.childLanes)!==0,Pc||r){if(Eo.current!==null)return nl(e,t,c);if(r=q,r!==null&&(a=yt(r,c),a!==0&&a!==s.retryLane))throw s.retryLane=a,ki(e,a),Pd(r,e,a),Nc;return om(o)||Kd(),nl(e,t,c)}return om(o)?(t.flags|=192,t.child=e.child,null):(e=s.treeContext,R=lm(o.nextSibling),aa=t,z=!0,oa=null,sa=!1,e!==null&&ia(t,e),t=el(t,a.children),t.flags|=134221824,t)}function il(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),xa(e.return,t,n)}function al(e){for(var t=null;e!==null;){var n=e.alternate;n!==null&&Vo(n)===null&&(t=e),e=e.sibling}return t}function ol(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function sl(e){var t=e.child;for(e.child=null;t!==null;){var n=t.sibling;t.sibling=e.child,e.child=t,t=n}}function cl(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=Ro.current;if(t.flags&128)return zo(t,o),null;var s=!!(o&2);if(s?(o=o&1|2,t.flags|=128):o&=1,zo(t,o),i===`backwards`&&e!==null?(sl(e),Fc(e,t,r,n),sl(e)):Fc(e,t,r,n),r=z?Ji:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&il(e,n,t);else if(e.tag===19)il(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`backwards`:n=al(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null,sl(t)),ol(t,!0,i,null,a,r);break;case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&Vo(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}ol(t,!0,n,null,a,r);break;case`together`:ol(t,!1,null,null,void 0,r);break;case`independent`:t.memoizedState=null;break;default:n=al(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),ol(t,!1,i,n,a,r)}return t.child}function ll(e,t,n){var r=t.pendingProps;return ya(t,t.type,r.value),Fc(e,t,r.children,n),t.child}function ul(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),od|=t.lanes,(n&t.childLanes)===0){if(e!==null){if(Ca(e,t,n,!1),(n&t.childLanes)===0)return null}else return null}if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=Ii(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Ii(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function dl(e,t){return(e.lanes&t)!==0||(e=e.dependencies,!!(e!==null&&wa(e)))}function fl(e,t,n){switch(t.tag){case 3:De(t,t.stateNode.containerInfo),ya(t,B,e.memoizedState.cache),pa();break;case 27:case 5:ke(t);break;case 4:De(t,t.stateNode.containerInfo);break;case 10:ya(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Po(t),null;break;case 13:var r=t.memoizedState;if(r!==null){if(r.dehydrated!==null)return No(t),t.flags|=128,null;r=Ca(e,t,n,!1);var i=t.child.childLanes;return r||(n&i)!==0?$c(e,t,n):(No(t),e=ul(e,t,n),e===null?null:e.sibling)}No(t);break;case 19:if(t.flags&128)return cl(e,t,n);if(i=!!(e.flags&128),r=(n&t.childLanes)!==0,r||=(Ca(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return cl(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),zo(t,Ro.current),r)break;return null;case 22:return t.lanes=0,zc(e,t,n,t.pendingProps);case 24:ya(t,B,e.memoizedState.cache)}return ul(e,t,n)}function pl(e,t,n){if(e!==null){if(e.memoizedProps!==t.pendingProps)Pc=!0;else{if(!dl(e,n)&&!(t.flags&128))return Pc=!1,fl(e,t,n);Pc=!!(e.flags&131072)}}else Pc=!1,z&&t.flags&1048576&&ta(t,Ji,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=to(t.elementType),t.type=e,typeof e==`function`)Fi(e)?(r=Cc(e,r),t.tag=1,t=Jc(null,t,e,r,n)):(t.tag=0,t=Kc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===ce){t.tag=11,t=Ic(null,t,e,r,n);break a}if(a===de){t.tag=14,t=Lc(null,t,e,r,n);break a}if(a===D){t.tag=10,t.type=e,t=ll(null,t,n);break a}}throw t=ye(e)||e,Error(i(306,t,``))}}return t;case 0:return Kc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=Cc(r,t.pendingProps),Jc(e,t,r,a,n);case 3:a:{if(De(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,go(e,t),Co(t,r,null,n);var s=t.memoizedState;if(r=s.cache,ya(t,B,r),r!==o.cache&&Sa(t,[B],n,!0),So(),r=s.element,o.isDehydrated){if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=Yc(e,t,r,n);break a}if(r!==a){a=Wi(Error(i(424)),t),ha(a),t=Yc(e,t,r,n);break a}switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(R=lm(e.firstChild),aa=t,z=!0,oa=null,sa=!0,n=po(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|134221824,n=n.sibling}else{if(pa(),r===a){t=ul(e,t,n);break a}Fc(e,t,r,n)}t=t.child}return t;case 26:return Gc(e,t),e===null?(n=Nm(t.type,null,t.pendingProps,null))?t.memoizedState=n:z||(t.stateNode=fp(t.type,t.pendingProps,Ee.current,t)):t.memoizedState=Nm(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return ke(t),e===null&&z&&(r=t.stateNode=hm(t.type,t.pendingProps,Ee.current),aa=t,sa=!0,a=R,Sp(t.type)?(um=a,R=lm(r.firstChild)):R=a),Fc(e,t,t.pendingProps.children,n),Gc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&z&&((a=r=R)&&(r=rm(r,t.type,t.pendingProps,sa),r===null?a=!1:(t.stateNode=r,aa=t,R=lm(r.firstChild),sa=!1,a=!0)),a||la(t)),ke(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,pp(a,o)?r=null:s!==null&&pp(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=$o(e,t,ns,null,null,n),sh._currentValue=a),Gc(e,t),Fc(e,t,r,n),t.child;case 6:return e===null&&z&&((e=n=R)&&(n=im(n,t.pendingProps,sa),n===null?e=!1:(t.stateNode=n,aa=t,R=null,e=!0)),e||la(t)),null;case 13:return $c(e,t,n);case 4:return De(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=fo(t,null,r,n):Fc(e,t,r,n),t.child;case 11:return Ic(e,t,t.type,t.pendingProps,n);case 7:return r=t.pendingProps,Gc(e,t),Fc(e,t,r,n),t.child;case 8:return Fc(e,t,t.pendingProps.children,n),t.child;case 12:return Fc(e,t,t.pendingProps.children,n),t.child;case 10:return ll(e,t,n);case 9:return a=t.type._context,r=t.pendingProps.children,Ta(t),a=Ea(a),r=r(a),t.flags|=1,Fc(e,t,r,n),t.child;case 14:return Lc(e,t,t.type,t.pendingProps,n);case 15:return Rc(e,t,t.type,t.pendingProps,n);case 19:return cl(e,t,n);case 31:return Wc(e,t,n);case 22:return zc(e,t,n,t.pendingProps);case 24:return Ta(t),r=Ea(B),e===null?(a=Ka(),a===null&&(a=q,o=Ma(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},ho(t),ya(t,B,a)):((e.lanes&n)!==0&&(go(e,t),Co(t,null,null,n),So()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,ya(t,B,r),r!==a.cache&&Sa(t,[B],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),ya(t,B,r))),Fc(e,t,t.pendingProps.children,n),t.child;case 30:return t.stateNode===null&&(t.stateNode={autoName:null,paired:null,clones:null,ref:null}),r=t.pendingProps,r.name!=null&&r.name!==`auto`?t.flags|=e===null?18882560:18874368:z&&na(t),e!==null&&e.memoizedProps.name!==r.name?t.flags|=4194816:Gc(e,t),Fc(e,t,r.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function ml(e){e.flags|=4}function hl(e,t,n,r,i){var a;if((a=!!(e.mode&32))&&(a=n===null?Jm(t,r):Jm(t,r)&&(r.src!==n.src||r.srcSet!==n.srcSet)),a){if(e.flags|=16777216,(i&335544128)===i){if(e.stateNode.complete)e.flags|=8192;else if(Ud())e.flags|=8192;else throw no=Qa,Xa}}else e.flags&=-16777217}function gl(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Ym(t)){if(Ud())e.flags|=8192;else throw no=Qa,Xa}}function _l(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:pt(),e.lanes|=t,ud|=t)}function vl(e,t){if(!z)switch(e.tailMode){case`visible`:break;case`collapsed`:for(var n=e.tail,r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null;break;default:for(t=e.tail,n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null}}function U(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&1206910976,r|=i.flags&1206910976,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function yl(e,t,n){var r=t.pendingProps;switch(ra(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return U(t),null;case 1:return U(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),ba(B),Oe(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(fa(t)?ml(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,ma())),U(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(ml(t),o===null?(U(t),hl(t,a,null,r,n)):(U(t),gl(t,o))):o?o===e.memoizedState?(U(t),t.flags&=-16777217):(ml(t),U(t),gl(t,o)):(e=e.memoizedProps,e!==r&&ml(t),U(t),hl(t,a,e,r,n)),null;case 27:if(Ae(t),n=Ee.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&ml(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return U(t),t.subtreeFlags&=-33554433,null}e=Te.current,fa(t)?ua(t,e):(e=hm(a,r,n),t.stateNode=e,ml(t))}return U(t),t.subtreeFlags&=-33554433,null;case 5:if(Ae(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&ml(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return U(t),t.subtreeFlags&=-33554433,null}if(o=Te.current,fa(t))ua(t,o);else{var s=lp(Ee.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[Tt]=t,o[Et]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(np(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&ml(t)}}return U(t),t.subtreeFlags&=-33554433,hl(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&ml(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=Ee.current,fa(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=aa,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[Tt]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||ep(e.nodeValue,n)),e||la(t,!0)}else e=lp(e).createTextNode(r),e[Tt]=t,t.stateNode=e}return U(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=fa(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[Tt]=t}else pa(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;U(t),e=!1}else n=ma(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(Lo(t),t):(Lo(t),null);if(t.flags&128)throw Error(i(558))}return U(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=fa(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[Tt]=t}else pa(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;U(t),a=!1}else a=ma(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(Lo(t),t):(Lo(t),null)}return Lo(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),_l(t,t.updateQueue),U(t),null);case 4:return Oe(),e===null&&Wf(t.stateNode.containerInfo),t.flags|=67108864,U(t),null;case 10:return ba(t.type),U(t),null;case 19:if(Bo(t),r=t.memoizedState,r===null)return U(t),null;if(a=!!(t.flags&128),o=r.rendering,o===null){if(a)vl(r,!1);else{if(ad!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=Vo(e),o!==null){for(t.flags|=128,vl(r,!1),e=o.updateQueue,t.updateQueue=e,_l(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)Li(n,e),n=n.sibling;return zo(t,Ro.current&1|2),z&&ea(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Ue()>gd&&(t.flags|=128,a=!0,vl(r,!1),t.lanes=4194304)}}else{if(!a){if(e=Vo(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,_l(t,e),vl(r,!0),r.tail===null&&r.tailMode!==`collapsed`&&r.tailMode!==`visible`&&!o.alternate&&!z)return U(t),null}else 2*Ue()-r.renderingStartTime>gd&&n!==536870912&&(t.flags|=128,a=!0,vl(r,!1),t.lanes=4194304)}r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}if(r.tail!==null){e=r.tail;a:{for(n=e;n!==null;){if(n.alternate!==null){n=!1;break a}n=n.sibling}n=!0}return r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Ue(),e.sibling=null,o=Ro.current,o=a?o&1|2:o&1,r.tailMode===`visible`||r.tailMode===`collapsed`||!n||z?zo(t,o):(n=o,N(jo,t),N(Ro,n),Mo===null&&(Mo=t)),z&&ea(t,r.treeForkCount),e}return U(t),null;case 22:case 23:return Lo(t),Ao(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(U(t),t.subtreeFlags&6&&(t.flags|=8192)):U(t),n=t.updateQueue,n!==null&&_l(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&we(Ga),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),ba(B),U(t),null;case 25:return null;case 30:return t.flags|=33554432,U(t),null}throw Error(i(156,t.tag))}function bl(e,t){switch(ra(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return ba(B),Oe(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Ae(t),null;case 31:if(t.memoizedState!==null){if(Lo(t),t.alternate===null)throw Error(i(340));pa()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Lo(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));pa()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Bo(t),e=t.flags,e&65536?(t.flags=e&-65537|128,e=t.memoizedState,e!==null&&(e.rendering=null,e.tail=null),t.flags|=4,t):null;case 4:return Oe(),null;case 10:return ba(t.type),null;case 22:case 23:return Lo(t),Ao(),e!==null&&we(Ga),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return ba(B),null;case 25:return null;default:return null}}function xl(e,t){switch(ra(t),t.tag){case 3:ba(B),Oe();break;case 26:case 27:case 5:Ae(t);break;case 4:Oe();break;case 31:t.memoizedState!==null&&Lo(t);break;case 13:Lo(t);break;case 19:Bo(t);break;case 10:ba(t.type);break;case 22:case 23:Lo(t),Ao(),e!==null&&we(Ga);break;case 24:ba(B)}}function Sl(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Z(t,t.return,e)}}function Cl(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Z(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Z(t,t.return,e)}}function wl(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{To(t,n)}catch(t){Z(e,e.return,t)}}}function Tl(e,t,n){n.props=Cc(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Z(e,t,n)}}function El(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:var i=e.stateNode,a=yi(e.memoizedProps,i);(i.ref===null||i.ref.name!==a)&&(i.ref=Pp(a)),r=i.ref;break;case 7:if(e.stateNode===null){var o=new Fp(e);h(e.child,!1,Qp,o,void 0,void 0),e.stateNode=o}r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Z(e,t,n)}}function Dl(e,t){var n=e.ref,r=e.refCleanup;if(n!==null){if(typeof r==`function`)try{r()}catch(n){Z(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Z(e,t,n)}else n.current=null}}function Ol(e,t){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&t!==null)for(var n=0;n<t.length;n++)em(e.stateNode,t[n])}function kl(e){for(var t=e.return;t!==null&&(Ml(t)&&em(e.stateNode,t.stateNode),!jl(t));)t=t.return}function Al(e){for(var t=e.return;t!==null&&(Ml(t)&&tm(e.stateNode,t.stateNode),!jl(t));)t=t.return}function jl(e){return e.tag===5||e.tag===3||e.tag===27}function Ml(e){return e&&e.tag===7&&e.stateNode!==null}function Nl(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Z(e,e.return,t)}}function Pl(e,t,n){try{var r=e.stateNode;ip(r,e.type,n,t),r[Et]=t}catch(t){Z(e,e.return,t)}}function Fl(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Sp(e.type)||e.tag===4}function Il(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Fl(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Sp(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Ll(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(i,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(i),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=xn)),Ol(e,r),I=!0;else if(i!==4&&(i===27&&(Ol(e,r),r=null,Sp(e.type)&&(n=e.stateNode,t=null)),e=e.child,e!==null))for(Ll(e,t,n,r),e=e.sibling;e!==null;)Ll(e,t,n,r),e=e.sibling}function Rl(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?n.insertBefore(i,t):n.appendChild(i),Ol(e,r),I=!0;else if(i!==4&&(i===27&&(Ol(e,r),r=null,Sp(e.type)&&(n=e.stateNode)),e=e.child,e!==null))for(Rl(e,t,n,r),e=e.sibling;e!==null;)Rl(e,t,n,r),e=e.sibling}function zl(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);np(t,r,n),t[Tt]=e,t[Et]=n}catch(t){Z(e,e.return,t)}}var Bl=!1,Vl=null;function Hl(e){(e.tag===30||e.subtreeFlags&33554432)&&(Bl=!0)}var Ul=null;function Wl(){var e=Ul;return Ul=null,e}var Gl=0;function Kl(e,t,n,r,i){return Gl=0,ql(e.child,t,n,r,i)}function ql(e,t,n,r,i){for(var a=!1;e!==null;){if(e.tag===5){var o=e.stateNode;if(r!==null){var s=Op(o);r.push(s),s.view&&(a=!0)}else a||Op(o).view&&(a=!0);Bl=!0,Tp(o,Gl===0?t:t+`_`+Gl,n),Gl++}else e.tag===22&&e.memoizedState!==null||e.tag===30&&i||ql(e.child,t,n,r,i)&&(a=!0);e=e.sibling}return a}function Jl(e,t){for(;e!==null;)e.tag===5?Ep(e.stateNode,e.memoizedProps):e.tag===22&&e.memoizedState!==null||e.tag===30&&t||Jl(e.child,t),e=e.sibling}function Yl(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(Yl(e),e.tag===30&&e.flags&18874368&&e.stateNode.paired)){var t=e.memoizedProps;if(t.name==null||t.name===`auto`)throw Error(i(544));var n=t.name;t=xi(t.default,t.share),t!==`none`&&(Kl(e,n,t,null,!1)||Jl(e.child,!1))}e=e.sibling}}function Xl(e,t){if(e.tag===30){var n=e.stateNode,r=e.memoizedProps,i=yi(r,n),a=xi(r.default,n.paired?r.share:r.enter);a===`none`?Yl(e):Kl(e,i,a,null,!1)?(Yl(e),n.paired||t||Nd(e,r.onEnter)):Jl(e.child,!1)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Xl(e,t),e=e.sibling;else Yl(e)}function Zl(e){if(Vl!==null&&Vl.size!==0){var t=Vl;if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var n=e.memoizedProps,r=n.name;if(r!=null&&r!==`auto`){var i=t.get(r);if(i!==void 0){var a=xi(n.default,n.share);if(a!==`none`&&(Kl(e,r,a,null,!1)?(a=e.stateNode,i.paired=a,a.paired=i,Nd(e,n.onShare)):Jl(e.child,!1)),t.delete(r),t.size===0)break}}}Zl(e)}e=e.sibling}}}function Ql(e){if(e.tag===30){var t=e.memoizedProps,n=yi(t,e.stateNode),r=Vl===null?void 0:Vl.get(n),i=xi(t.default,r===void 0?t.exit:t.share);i!==`none`&&(Kl(e,n,i,null,!1)?r===void 0?Nd(e,t.onExit):(i=e.stateNode,r.paired=i,i.paired=r,Vl.delete(n),Nd(e,t.onShare)):Jl(e.child,!1)),Vl!==null&&Zl(e)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Ql(e),e=e.sibling;else Vl!==null&&Zl(e)}function $l(e){for(e=e.child;e!==null;){if(e.tag===30){var t=e.memoizedProps,n=yi(t,e.stateNode);t=xi(t.default,t.update),e.flags&=-5,t!==`none`&&Kl(e,n,t,e.memoizedState=[],!1)}else e.subtreeFlags&33554432&&$l(e);e=e.sibling}}function eu(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var t=e.stateNode;t.paired!==null&&(t.paired=null,Jl(e.child,!1))}eu(e)}e=e.sibling}}function tu(e){if(e.tag===30)e.stateNode.paired=null,Jl(e.child,!1),eu(e);else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)tu(e),e=e.sibling;else eu(e)}function nu(e){for(e=e.child;e!==null;)e.tag===30?Jl(e.child,!1):e.subtreeFlags&33554432&&nu(e),e=e.sibling}function ru(e,t,n,r,i,a,o){for(var s=!1;t!==null;){if(t.tag===5){var c=t.stateNode;if(a!==null&&Gl<a.length){var l=a[Gl],u=Op(c);(l.view||u.view)&&(s=!0);var d;if(d=!(e.flags&4)){if(u.clip)d=!0;else{d=l.rect;var f=u.rect;d=d.y!==f.y||d.x!==f.x||d.height!==f.height||d.width!==f.width}}d&&(e.flags|=4),u.abs?u=!l.abs:(l=l.rect,u=u.rect,u=l.height!==u.height||l.width!==u.width),u&&(e.flags|=32)}else e.flags|=32;e.flags&4&&Tp(c,Gl===0?n:n+`_`+Gl,i),s&&e.flags&4||(Ul===null&&(Ul=[]),Ul.push(c,Gl===0?r:r+`_`+Gl,t.memoizedProps)),Gl++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&o?e.flags|=t.flags&32:ru(e,t.child,n,r,i,a,o)&&(s=!0));t=t.sibling}return s}function iu(e,t){for(e=e.child;e!==null;){if(e.tag===30){var n=e.memoizedProps,r=e.stateNode,i=yi(n,r),a=xi(n.default,n.update);if(t){r=r.clones;var o=r===null?null:r.map(kp)}else o=e.memoizedState,e.memoizedState=null;r=e;var s=e.child;Gl=0,i=ru(r,s,i,i,a,o,!1),e.flags&4&&i&&(t||Nd(e,n.onUpdate))}else e.subtreeFlags&33554432&&iu(e,t);e=e.sibling}}var au=!1,W=!1,ou=!1,su=!1,cu=typeof WeakSet==`function`?WeakSet:Set,lu=null,uu=!1,du=!1,fu=!1,pu=!1;function mu(e,t,n){if(e=e.containerInfo,sp=gh,e=Yr(e),Xr(e)){if(`selectionStart`in e)var r={start:e.selectionStart,end:e.selectionEnd};else a:{r=(r=e.ownerDocument)&&r.defaultView||window;var i=r.getSelection&&r.getSelection();if(i&&i.rangeCount!==0){r=i.anchorNode;var a=i.anchorOffset,o=i.focusNode;i=i.focusOffset;try{r.nodeType,o.nodeType}catch{r=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==r||a!==0&&f.nodeType!==3||(c=s+a),f!==o||i!==0&&f.nodeType!==3||(l=s+i),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===r&&++u===a&&(c=s),p===o&&++d===i&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}r=c===-1||l===-1?null:{start:c,end:l}}else r=null}r||={start:0,end:0}}else r=null;for(cp={focusedElem:e,selectionRange:r},gh=!1,n=(n&335544064)===n,lu=t,t=n?9270:1024;lu!==null;){if(e=lu,n&&(r=e.deletions,r!==null))for(a=0;a<r.length;a++)n&&Ql(r[a]);if(e.alternate===null&&e.flags&2)n&&Hl(e),hu(n);else{if(e.tag===22){if(r=e.alternate,e.memoizedState!==null){r!==null&&r.memoizedState===null&&n&&Ql(r),hu(n);continue}if(r!==null&&r.memoizedState!==null){n&&Hl(e),hu(n);continue}}r=e.child,(e.subtreeFlags&t)!==0&&r!==null?(r.return=e,lu=r):(n&&$l(e),hu(n))}}Vl=null}function hu(e){for(;lu!==null;){var t=lu,n=e,r=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 15:break;case 1:if(a&1024&&r!==null){n=void 0,a=r.memoizedProps,r=r.memoizedState;var o=t.stateNode;try{var s=Cc(t.type,a);n=o.getSnapshotBeforeUpdate(s,r),o.__reactInternalSnapshotBeforeUpdate=n}catch(e){Z(t,t.return,e)}}break;case 3:if(a&1024){if(r=t.stateNode.containerInfo,n=r.nodeType,n===9)nm(r);else if(n===1)switch(r.nodeName){case`HEAD`:case`HTML`:case`BODY`:nm(r);break;default:r.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:n&&r!==null&&(n=yi(r.memoizedProps,r.stateNode),a=t.memoizedProps,a=xi(a.default,a.update),a!==`none`&&Kl(r,n,a,r.memoizedState=[],!0));break;default:if(a&1024)throw Error(i(163))}if(r=t.sibling,r!==null){r.return=t.return,lu=r;break}lu=t.return}}function gu(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:Fu(e,n),r&4&&Sl(5,n);break;case 1:if(Fu(e,n),r&4){if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Z(n,n.return,e)}else{var i=Cc(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Z(n,n.return,e)}}}r&64&&wl(n),r&512&&El(n,n.return);break;case 3:if(Fu(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{To(e,t)}catch(e){Z(n,n.return,e)}}break;case 27:t===null&&r&4&&zl(n);case 26:case 5:Fu(e,n),t===null&&r&4&&Nl(n),r&512&&El(n,n.return);break;case 12:Fu(e,n);break;case 31:Fu(e,n),r&4&&wu(e,n);break;case 13:Fu(e,n),r&4&&Tu(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=_f.bind(null,n),cm(e,n))));break;case 22:if(r=n.memoizedState!==null||au,!r){var a=t!==null&&t.memoizedState!==null||W;t=au,i=W,au=r,(W=a)&&!i?(r=2,n.subtreeFlags&8772&&(r|=1),Lu(e,n,r)):Fu(e,n),au=t,W=i}break;case 30:Fu(e,n),r&512&&El(n,n.return);break;case 7:r&512&&El(n,n.return);default:Fu(e,n)}}function _u(e,t){for(e=e.child;e!==null;)vu(e,t),e=e.sibling}function vu(e,t){switch(e.tag){case 5:case 26:try{var n=e.stateNode;if(t){var r=n.style;typeof r.setProperty==`function`?r.setProperty(`display`,`none`,`important`):r.display=`none`}else{var i=e.stateNode,a=e.memoizedProps.style,o=a!=null&&a.hasOwnProperty(`display`)?a.display:null;i.style.display=o==null||typeof o==`boolean`?``:(``+o).trim()}}catch(t){Z(e,e.return,t)}yu(e,t);break;case 6:try{e.stateNode.nodeValue=t?``:e.memoizedProps,I=!0}catch(t){Z(e,e.return,t)}break;case 18:try{var s=e.stateNode;t?wp(s,!0):wp(e.stateNode,!1)}catch(t){Z(e,e.return,t)}break;case 22:case 23:e.memoizedState===null&&_u(e,t);break;default:_u(e,t)}}function yu(e,t){if(e.subtreeFlags&67108864)for(e=e.child;e!==null;){a:{var n=e,r=t;switch(n.tag){case 4:vu(n,r);break a;case 22:n.memoizedState===null&&yu(n,r);break a;default:yu(n,r)}}e=e.sibling}}function bu(e){var t=e.alternate;t!==null&&(e.alternate=null,bu(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Pt(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var G=null,xu=!1;function Su(e,t,n){for(n=n.child;n!==null;)Cu(e,t,n),n=n.sibling}function Cu(e,t,n){if($e&&typeof $e.onCommitFiberUnmount==`function`)try{$e.onCommitFiberUnmount(Qe,n)}catch{}switch(n.tag){case 26:W||Dl(n,t),Su(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&!W&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:W||Dl(n,t),Al(n);var r=G,i=xu;Sp(n.type)&&(G=n.stateNode,xu=!1),Su(e,t,n),gm(n.stateNode,n.type,n.memoizedProps),G=r,xu=i;break;case 5:W||Dl(n,t),Al(n);case 6:if(n.tag===6&&Al(n),r=G,i=xu,G=null,Su(e,t,n),G=r,xu=i,G!==null){if(xu)try{(G.nodeType===9?G.body:G.nodeName===`HTML`?G.ownerDocument.body:G).removeChild(n.stateNode),I=!0}catch(e){Z(n,t,e)}else try{G.removeChild(n.stateNode),I=!0}catch(e){Z(n,t,e)}}break;case 18:G!==null&&(xu?(e=G,Cp(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Hh(e)):Cp(G,n.stateNode));break;case 4:r=G,i=xu,G=n.stateNode.containerInfo,xu=!0,Su(e,t,n),G=r,xu=i;break;case 0:case 11:case 14:case 15:Cl(2,n,t),W||Cl(4,n,t),Su(e,t,n);break;case 1:W||(Dl(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Tl(n,t,r)),Su(e,t,n);break;case 21:Su(e,t,n);break;case 22:W=(r=W)||n.memoizedState!==null,Su(e,t,n),W=r;break;case 30:Dl(n,t),Su(e,t,n);break;case 7:W||Dl(n,t),Su(e,t,n);break;default:Su(e,t,n)}}function wu(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Hh(e)}catch(e){Z(t,t.return,e)}}}function Tu(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Hh(e)}catch(e){Z(t,t.return,e)}}function Eu(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new cu),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new cu),t;default:throw Error(i(435,e.tag))}}function Du(e,t){var n=Eu(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=vf.bind(null,e,t);t.then(r,r)}})}function Ou(e,t,n){var r=t.deletions;if(r!==null)for(var a=0;a<r.length;a++){var o=r[a],s=e,c=t,l=c;a:for(;l!==null;){switch(l.tag){case 27:if(Sp(l.type)){G=l.stateNode,xu=!1;break a}break;case 5:G=l.stateNode,xu=!1;break a;case 3:case 4:G=l.stateNode.containerInfo,xu=!0;break a}l=l.return}if(G===null)throw Error(i(160));Cu(s,c,o),G=null,xu=!1,s=o.alternate,s!==null&&(s.return=null),o.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Au(t,e,n),t=t.sibling}var ku=null;function Au(e,t,n){var r=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(a&4&&(r=e.updateQueue,r=r===null?null:r.events,r!==null))for(var o=0;o<r.length;o++){var s=r[o];s.ref.impl=s.nextImpl}Ou(t,e,n),ju(e),a&4&&(Cl(3,e,e.return),Sl(3,e),Cl(5,e,e.return));break;case 1:Ou(t,e,n),ju(e),a&512&&(W||r===null||Dl(r,r.return)),a&64&&au&&(e=e.updateQueue,e!==null&&(t=e.callbacks,t!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?t:n.concat(t))));break;case 26:if(o=ku,Ou(t,e,n),ju(e),a&512&&(W||r===null||Dl(r,r.return)),a&4){if(a=r===null?null:r.memoizedState,n=e.memoizedState,r===null){if(n===null){if(e.stateNode===null){if(au)e.stateNode=fp(e.type,e.memoizedProps,t.containerInfo,e);else{a:{t=e.type,n=e.memoizedProps,a=o.ownerDocument||o;b:switch(t){case`title`:r=a.getElementsByTagName(`title`)[0],(!r||r[Mt]||r[Tt]||r.namespaceURI===`http://www.w3.org/2000/svg`||r.hasAttribute(`itemprop`))&&(r=a.createElement(t),a.head.insertBefore(r,a.querySelector(`head > title`))),np(r,t,n),r[Tt]=e,zt(r),t=r;break a;case`link`:if(o=Gm(`link`,`href`,a).get(t+(n.href||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&r.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&r.getAttribute(`title`)===(n.title==null?null:n.title)&&r.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){o.splice(s,1);break b}}r=a.createElement(t),np(r,t,n),a.head.appendChild(r);break;case`meta`:if(o=Gm(`meta`,`content`,a).get(t+(n.content||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`content`)===(n.content==null?null:``+n.content)&&r.getAttribute(`name`)===(n.name==null?null:n.name)&&r.getAttribute(`property`)===(n.property==null?null:n.property)&&r.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&r.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){o.splice(s,1);break b}}r=a.createElement(t),np(r,t,n),a.head.appendChild(r);break;default:throw Error(i(468,t))}r[Tt]=e,zt(r),t=r}e.stateNode=t}}else au||Km(o,e.type,e.stateNode)}else e.stateNode=Bm(o,n,e.memoizedProps)}else a===n?n===null&&e.stateNode!==null&&Pl(e,e.memoizedProps,r.memoizedProps):(a===null?(t=r.stateNode,t===null||W||t.parentNode.removeChild(t)):a.count--,n===null?au||Km(o,e.type,e.stateNode):Bm(o,n,e.memoizedProps))}break;case 27:Ou(t,e,n),ju(e),a&512&&(W||r===null||Dl(r,r.return)),r!==null&&a&4&&Pl(e,e.memoizedProps,r.memoizedProps);break;case 5:if(o=ou,ou=!1,Ou(t,e,n),ou=o,ju(e),a&512&&(W||r===null||Dl(r,r.return)),e.flags&32){t=e.stateNode;try{pn(t,``),I=!0}catch(t){Z(e,e.return,t)}}a&4&&e.stateNode!=null&&(t=e.memoizedProps,Pl(e,t,r===null?t:r.memoizedProps)),a&1024&&(su=!0);break;case 6:if(Ou(t,e,n),ju(e),a&4){if(e.stateNode===null)throw Error(i(162));t=e.memoizedProps,n=e.stateNode;try{n.nodeValue=t,I=!0}catch(t){Z(e,e.return,t)}}break;case 3:if(I=!1,Wm=null,o=ku,ku=bm(t.containerInfo),Ou(t,e,n),ku=o,ju(e),a&4&&r!==null&&r.memoizedState.isDehydrated)try{Hh(t.containerInfo)}catch(t){Z(e,e.return,t)}su&&(su=!1,Mu(e)),I=!1;break;case 4:a=ou,ou=au,r=Yt(),o=ku,ku=bm(e.stateNode.containerInfo),Ou(t,e,n),ju(e),ku=o,I&&du&&(fu=!0),I=r,ou=a;break;case 12:Ou(t,e,n),ju(e);break;case 31:Ou(t,e,n),ju(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Du(e,t)));break;case 13:Ou(t,e,n),ju(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(md=Ue()),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Du(e,t)));break;case 22:o=e.memoizedState!==null,s=r!==null&&r.memoizedState!==null;var c=au,l=W,u=ou;au=c||o,ou=u||o,W=l||s,Ou(t,e,n),W=l,ou=u,au=c,ju(e),a&8192&&(t=e.stateNode,t._visibility=o?t._visibility&-2:t._visibility|1,!o||r===null||s||au||W||(t=s||W,n=au,r=W,au=o||au,W=t,Iu(e,2),au=n,W=r),!o&&ou||_u(e,o)),a&4&&(t=e.updateQueue,t!==null&&(n=t.retryQueue,n!==null&&(t.retryQueue=null,Du(e,n))));break;case 19:Ou(t,e,n),ju(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Du(e,t)));break;case 30:a&512&&(W||r===null||Dl(r,r.return)),a=Yt(),o=du,s=(n&335544064)===n,c=e.memoizedProps,du=s&&xi(c.default,c.update)!==`none`,Ou(t,e,n),ju(e),s&&r!==null&&I&&(e.flags|=4),du=o,I=a;break;case 21:break;case 7:a&512&&(W||r===null||Dl(r,r.return)),r&&r.stateNode!==null&&(r.stateNode._fragmentFiber=e);default:Ou(t,e,n),ju(e)}}function ju(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Fl(r)){n=r;break}r=r.return}r=null;for(var a=e.return;a!==null;){if(Ml(a)){var o=a.stateNode;r===null?r=[o]:r.push(o)}if(jl(a))break;a=a.return}var s=r;if(n==null)throw Error(i(160));switch(n.tag){case 27:var c=n.stateNode;Rl(e,Il(e),c,s);break;case 5:var l=n.stateNode;n.flags&32&&(pn(l,``),n.flags&=-33),Rl(e,Il(e),l,s);break;case 3:case 4:var u=n.stateNode.containerInfo;Ll(e,Il(e),u,s);break;default:throw Error(i(161))}}catch(t){Z(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Mu(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Mu(t),t.tag===5&&t.flags&1024&&(t=t.stateNode,gh=!0,t.reset(),gh=!1),e=e.sibling}}function Nu(e,t){if(t.subtreeFlags&9270)for(t=t.child;t!==null;)Pu(t,e),t=t.sibling;else iu(t,!1)}function Pu(e,t){var n=e.alternate;if(n===null)Xl(e,!1);else switch(e.tag){case 3:if(pu=uu=!1,Wl(),Nu(t,e),!uu&&!fu){if(e=Ul,e!==null)for(var r=0;r<e.length;r+=3){n=e[r];var i=e[r+1];Ep(n,e[r+2]),n=n.ownerDocument.documentElement,n!==null&&n.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(`+i+`)`})}e=t.containerInfo,e=e.nodeType===9?e.documentElement:e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===``&&(e.style.viewTransitionName=`none`,e.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(root)`}),e.animate({width:[0,0],height:[0,0]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition`})),pu=!0}Ul=null;break;case 5:Nu(t,e);break;case 4:r=uu,uu=!1,Nu(t,e),uu&&(fu=!0),uu=r;break;case 22:e.memoizedState===null&&(n.memoizedState===null?Nu(t,e):Xl(e,!1));break;case 30:r=uu,i=Wl(),uu=!1,Nu(t,e),uu&&(e.flags|=4);var a=e.memoizedProps,o=e.stateNode;t=yi(a,o),o=yi(n.memoizedProps,o);var s=xi(a.default,a.update);s===`none`?t=!1:(a=n.memoizedState,n.memoizedState=null,n=e.child,Gl=0,t=ru(e,n,t,o,s,a,!0),Gl!==(a===null?0:a.length)&&(e.flags|=32)),e.flags&4&&t?(Nd(e,e.memoizedProps.onUpdate),Ul=i):i!==null&&(i.push.apply(i,Ul),Ul=i),uu=e.flags&32?!0:r;break;default:Nu(t,e)}}function Fu(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)gu(e,t.alternate,t),t=t.sibling}function Iu(e,t){for(e=e.child;e!==null;){var n=e,r=t;switch(n.tag){case 0:case 11:case 14:case 15:Cl(4,n,n.return),Iu(n,r);break;case 1:Dl(n,n.return);var i=n.stateNode;typeof i.componentWillUnmount==`function`&&Tl(n,n.return,i),Iu(n,r);break;case 27:r&2&&gm(n.stateNode,n.type,n.memoizedProps);case 5:Dl(n,n.return),n.tag!==5&&n.tag!==27||Al(n),Iu(n,r);break;case 6:Al(n);break;case 26:Dl(n,n.return),i=n.stateNode,n.memoizedState!==null||i===null||W||i.parentNode.removeChild(i),Iu(n,r);break;case 22:n.memoizedState===null&&Iu(n,r);break;case 30:Dl(n,n.return),Iu(n,r);break;case 7:Dl(n,n.return);default:Iu(n,r)}e=e.sibling}}function Lu(e,t,n){for(n=t.subtreeFlags&8772?n:n&-2,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags,s=!!(n&1);switch(a.tag){case 0:case 11:case 15:Lu(i,a,n),Sl(4,a);break;case 1:if(Lu(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Z(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var c=r.stateNode;try{var l=i.shared.hiddenCallbacks;if(l!==null)for(i.shared.hiddenCallbacks=null,i=0;i<l.length;i++)wo(l[i],c)}catch(e){Z(r,r.return,e)}}s&&o&64&&wl(a),El(a,a.return);break;case 27:n&2&&zl(a);case 5:a.tag!==5&&a.tag!==27||kl(a),Lu(i,a,n),s&&r===null&&o&4&&Nl(a),El(a,a.return);break;case 6:kl(a);break;case 26:c=a.stateNode,a.memoizedState!==null||c===null||au||Km(bm(c.ownerDocument),a.type,c),Lu(i,a,n),s&&r===null&&o&4&&Nl(a),El(a,a.return);break;case 12:Lu(i,a,n);break;case 31:Lu(i,a,n),s&&o&4&&wu(i,a);break;case 13:Lu(i,a,n),s&&o&4&&Tu(i,a);break;case 22:a.memoizedState===null&&Lu(i,a,n),El(a,a.return);break;case 30:Lu(i,a,n),El(a,a.return);break;case 7:El(a,a.return);default:Lu(i,a,n)}t=t.sibling}}function Ru(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&Na(n))}function zu(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&Na(e))}function Bu(e,t,n,r){var i=(n&335544064)===n;if(t.subtreeFlags&(i?10262:10256))for(t=t.child;t!==null;)Vu(e,t,n,r),t=t.sibling;else i&&nu(t)}function Vu(e,t,n,r){var i=(n&335544064)===n;i&&t.alternate===null&&t.return!==null&&t.return.alternate!==null&&tu(t);var a=t.flags;switch(t.tag){case 0:case 11:case 15:Bu(e,t,n,r),a&2048&&Sl(9,t);break;case 1:Bu(e,t,n,r);break;case 3:Bu(e,t,n,r),i&&pu&&(e=e.containerInfo,e=e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,e.style.viewTransitionName===`root`&&(e.style.viewTransitionName=``),e=e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===`none`&&(e.style.viewTransitionName=``)),a&2048&&(a=null,t.alternate!==null&&(a=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==a&&(t.refCount++,a!=null&&Na(a)));break;case 12:if(a&2048){Bu(e,t,n,r),a=t.stateNode;try{var o=t.memoizedProps,s=o.id,c=o.onPostCommit;typeof c==`function`&&c(s,t.alternate===null?`mount`:`update`,a.passiveEffectDuration,-0)}catch(e){Z(t,t.return,e)}}else Bu(e,t,n,r);break;case 31:Bu(e,t,n,r);break;case 13:Bu(e,t,n,r);break;case 23:break;case 22:o=t.stateNode,s=t.alternate,t.memoizedState===null?(i&&s!==null&&s.memoizedState!==null&&tu(t),o._visibility&2?Bu(e,t,n,r):(o._visibility|=2,Hu(e,t,n,r,!!(t.subtreeFlags&10256)||!1))):(i&&s!==null&&s.memoizedState===null&&tu(s),o._visibility&2?Bu(e,t,n,r):Uu(e,t)),a&2048&&Ru(s,t);break;case 24:Bu(e,t,n,r),a&2048&&zu(t.alternate,t);break;case 30:i&&(a=t.alternate,a!==null&&(Jl(a.child,!0),Jl(t.child,!0))),Bu(e,t,n,r);break;default:Bu(e,t,n,r)}}function Hu(e,t,n,r,i){for(i&&=!!(t.subtreeFlags&10256)||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Hu(a,o,s,c,i),Sl(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Hu(a,o,s,c,i)):u._visibility&2?Hu(a,o,s,c,i):Uu(a,o),i&&l&2048&&Ru(o.alternate,o);break;case 24:Hu(a,o,s,c,i),i&&l&2048&&zu(o.alternate,o);break;default:Hu(a,o,s,c,i)}t=t.sibling}}function Uu(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Uu(n,r),i&2048&&Ru(r.alternate,r);break;case 24:Uu(n,r),i&2048&&zu(r.alternate,r);break;default:Uu(n,r)}t=t.sibling}}var Wu=8192;function Gu(e,t,n){if(e.subtreeFlags&Wu)for(e=e.child;e!==null;)Ku(e,t,n),e=e.sibling}function Ku(e,t,n){switch(e.tag){case 26:Gu(e,t,n),e.flags&Wu&&(e.memoizedState===null?(e=e.stateNode,(t&335544128)===t&&Zm(n,e)):Qm(n,ku,e.memoizedState,e.memoizedProps));break;case 5:Gu(e,t,n),e.flags&Wu&&(e=e.stateNode,(t&335544128)===t&&Zm(n,e));break;case 3:case 4:var r=ku;ku=bm(e.stateNode.containerInfo),Gu(e,t,n),ku=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=Wu,Wu=16777216,Gu(e,t,n),Wu=r):Gu(e,t,n));break;case 30:if((e.flags&Wu)!==0&&(r=e.memoizedProps.name,r!=null&&r!==`auto`)){var i=e.stateNode;i.paired=null,Vl===null&&(Vl=new Map),Vl.set(r,i)}Gu(e,t,n);break;default:Gu(e,t,n)}}function qu(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Ju(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];lu=r,Zu(r,e)}qu(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)Yu(e),e=e.sibling}function Yu(e){switch(e.tag){case 0:case 11:case 15:Ju(e),e.flags&2048&&Cl(9,e,e.return);break;case 3:Ju(e);break;case 12:Ju(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Xu(e)):Ju(e);break;default:Ju(e)}}function Xu(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];lu=r,Zu(r,e)}qu(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:Cl(8,t,t.return),Xu(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Xu(t));break;default:Xu(t)}e=e.sibling}}function Zu(e,t){for(;lu!==null;){var n=lu;switch(n.tag){case 0:case 11:case 15:Cl(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:Na(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,lu=r;else a:for(n=e;lu!==null;){r=lu;var i=r.sibling,a=r.return;if(bu(r),r===n){lu=null;break a}if(i!==null){i.return=a,lu=i;break a}lu=a}}}var Qu={getCacheForType:function(e){var t=Ea(B),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Ea(B).controller.signal}},$u=typeof WeakMap==`function`?WeakMap:Map,K=0,q=null,J=null,Y=0,X=0,ed=null,td=!1,nd=!1,rd=!1,id=0,ad=0,od=0,sd=0,cd=0,ld=0,ud=0,dd=null,fd=null,pd=!1,md=0,hd=0,gd=1/0,_d=null,vd=null,yd=0,bd=null,xd=null,Sd=0,Cd=0,wd=null,Td=null,Ed=null,Dd=null,Od=null,kd=0,Ad=null;function jd(){return K&2&&Y!==0?Y&-Y:A.T===null?St():Pf()}function Md(){if(ld===0){if(!(Y&536870912)||z){var e=ot;ot<<=1,!(ot&3932160)&&(ot=262144),ld=e}else ld=536870912}return e=jo.current,e!==null&&(e.flags|=32),ld}function Nd(e,t){if(t!=null){var n=e.stateNode,r=n.ref;r===null&&(r=n.ref=Pp(yi(e.memoizedProps,n))),Dd===null&&(Dd=[]),Dd.push(t.bind(null,r))}}function Pd(e,t,n){(e===q&&(X===2||X===9)||e.cancelPendingCommit!==null)&&(Vd(e,0),Rd(e,Y,ld,!1)),ht(e,n),K&2&&e===q||(e===q&&(!(K&2)&&(sd|=n),ad===4&&Rd(e,Y,ld,!1)),Ef(e))}function Fd(e,t,n){if(K&6)throw Error(i(327));var r=!n&&!(t&127)&&(t&e.expiredLanes)===0||ut(e,t),a=r?Yd(e,t):qd(e,t,!0),o=r;do{if(a===0){nd&&!r&&Rd(e,t,0,!1);break}if(n=e.current.alternate,o&&!Ld(n))a=qd(e,t,!1),o=!1;else{if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=dd;var l=c.current.memoizedState.isDehydrated;if(l&&(Vd(c,s).flags|=256),s=qd(c,s,!1),s!==2&&s!==6){if(rd&&!l){c.errorRecoveryDisabledLanes|=o,sd|=o,a=4;break a}o=fd,fd=a,o!==null&&(fd===null?fd=o:fd.push.apply(fd,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){Vd(e,0),Rd(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t&&(t&62914560)!==t)break;case 6:Rd(r,t,ld,!td);break a;case 2:fd=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=md+300-Ue(),10<a)){if(Rd(r,t,ld,!td),lt(r,0,!0)!==0)break a;Sd=t,r.timeoutHandle=gp(Id.bind(null,r,n,fd,_d,pd,t,ld,sd,ud,td,o,`Throttled`,-0,0),a);break a}Id(r,n,fd,_d,pd,t,ld,sd,ud,td,o,null,-0,0)}break}}while(1);Ef(e)}function Id(e,t,n,r,i,a,o,s,c,l,u,d,f,p){e.timeoutHandle=-1;var m=t.subtreeFlags,h=(a&335544064)===a;d=null,(h||m&8192||(m&16785408)==16785408)&&(d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:xn},Vl=null,Ku(t,a,d),h&&(m=d,h=e.containerInfo,h=(h.nodeType===9?h:h.ownerDocument).__reactViewTransition,h!=null&&(m.count++,m.waitingForViewTransition=!0,m=nh.bind(m),h.finished.then(m,m))),m=(a&62914560)===a?md-Ue():(a&4194048)===a?hd-Ue():0,m=eh(d,m),m!==null)?(Sd=a,e.cancelPendingCommit=m(nf.bind(null,e,t,a,n,r,i,o,s,c,l,u,d,null,f,p)),Rd(e,a,o,!l)):nf(e,t,a,n,r,i,o,s,c,l,u,d)}function Ld(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Ur(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Rd(e,t,n,r){t=dt(e,t),t&=~cd,t&=~sd,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-tt(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&_t(e,n,t)}function zd(){return K&6?!0:(Df(0,!1),!1)}function Bd(){if(J!==null){if(X===0)var e=J.return;else e=J,va=_a=null,as(e),ao=null,oo=0,e=J;for(;e!==null;)xl(e.alternate,e),e=e.return;J=null}}function Vd(e,t){var n=e.timeoutHandle;return n!==-1&&(e.timeoutHandle=-1,_p(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),Sd=0,Bd(),q=e,J=n=Ii(e.current,null),Y=t,X=0,ed=null,td=!1,nd=ut(e,t),rd=!1,ud=ld=cd=sd=od=ad=0,fd=dd=null,pd=!1,id=dt(e,t),Ei(),n}function Hd(e,t){V=null,A.H=hc,t===Ya||t===Za?(t=ro(),X=3):t===Xa?(t=ro(),X=4):X=t===Nc?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,ed=t,J===null&&(ad=1,Dc(e,Wi(t,e.current)))}function Ud(){var e=jo.current;return e===null?!0:(Y&4194048)===Y?Mo===null:(Y&62914560)===Y||Y&536870912?e===Mo:!1}function Wd(){var e=A.H;return A.H=hc,e===null?hc:e}function Gd(){var e=A.A;return A.A=Qu,e}function Kd(){ad=4,td||(Y&4194048)!==Y&&jo.current!==null||(nd=!0),!(od&134217727)&&!(sd&134217727)||q===null||Rd(q,Y,ld,!1)}function qd(e,t,n){var r=K;K|=2;var i=Wd(),a=Gd();(q!==e||Y!==t)&&(_d=null,Vd(e,t)),t=!1;var o=ad;a:do try{if(X!==0&&J!==null){var s=J,c=ed;switch(X){case 8:Bd(),o=6;break a;case 3:case 2:case 9:case 6:jo.current===null&&(t=!0);var l=X;if(X=0,ed=null,$d(e,s,c,l),n&&nd){o=0;break a}break;default:l=X,X=0,ed=null,$d(e,s,c,l)}}Jd(),o=ad;break}catch(t){Hd(e,t)}while(1);return t&&e.shellSuspendCounter++,va=_a=null,K=r,A.H=i,A.A=a,J===null&&(q=null,Y=0,Ei()),o}function Jd(){for(;J!==null;)Zd(J)}function Yd(e,t){var n=K;K|=2;var r=Wd(),a=Gd();q!==e||Y!==t?(_d=null,gd=Ue()+500,Vd(e,t)):nd=ut(e,t);a:do try{if(X!==0&&J!==null){t=J;var o=ed;b:switch(X){case 1:X=0,ed=null,$d(e,t,o,1);break;case 2:case 9:if($a(o)){X=0,ed=null,Qd(t);break}t=function(){X!==2&&X!==9||q!==e||(X=7),Ef(e)},o.then(t,t);break a;case 3:X=7;break a;case 4:X=5;break a;case 7:$a(o)?(X=0,ed=null,Qd(t)):(X=0,ed=null,$d(e,t,o,7));break;case 5:var s=null;switch(J.tag){case 26:s=J.memoizedState;case 5:case 27:var c=J;if(s?Ym(s):c.stateNode.complete){X=0,ed=null;var l=c.sibling;if(l!==null)J=l;else{var u=c.return;u===null?J=null:(J=u,ef(u))}break b}}X=0,ed=null,$d(e,t,o,5);break;case 6:X=0,ed=null,$d(e,t,o,6);break;case 8:Bd(),ad=6;break a;default:throw Error(i(462))}}Xd();break}catch(t){Hd(e,t)}while(1);return va=_a=null,A.H=r,A.A=a,K=n,J===null?(q=null,Y=0,Ei(),ad):0}function Xd(){for(;J!==null&&!Ve();)Zd(J)}function Zd(e){var t=pl(e.alternate,e,id);e.memoizedProps=e.pendingProps,t===null?ef(e):J=t}function Qd(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=qc(n,t,t.pendingProps,t.type,void 0,Y);break;case 11:t=qc(n,t,t.pendingProps,t.type.render,t.ref,Y);break;case 5:as(t);var r=t;r===aa&&(z?(da(r),r.tag===5&&r.stateNode!=null&&(R=r.stateNode)):(da(r),z=!0));default:xl(n,t),t=J=Li(t,id),t=pl(n,t,id)}e.memoizedProps=e.pendingProps,t===null?ef(e):J=t}function $d(e,t,n,r){va=_a=null,as(t),ao=null,oo=0;var i=t.return;try{if(Mc(e,i,t,n,Y)){ad=1,Dc(e,Wi(n,e.current)),J=null;return}}catch(t){if(i!==null)throw J=i,t;ad=1,Dc(e,Wi(n,e.current)),J=null;return}t.flags&32768?(z||r===1?e=!0:nd||Y&536870912?e=!1:(td=e=!0,(r===2||r===9||r===3||r===6)&&(r=jo.current,r!==null&&r.tag===13&&(r.flags|=16384))),tf(t,e)):ef(t)}function ef(e){var t=e;do{if(t.flags&32768){tf(t,td);return}e=t.return;var n=yl(t.alternate,t,id);if(n!==null){J=n;return}if(t=t.sibling,t!==null){J=t;return}J=t=e}while(t!==null);ad===0&&(ad=5)}function tf(e,t){do{var n=bl(e.alternate,e);if(n!==null){n.flags&=32767,J=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){J=e;return}J=e=n}while(e!==null);ad=6,J=null}function nf(e,t,n,r,a,o,s,c,l,u,d,f){e.cancelPendingCommit=null;do df();while(yd!==0);if(K&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));e===q&&(J=q=null,Y=0),xd=t,bd=e,Sd=n,wd=a,Td=r,rf(e,t,n,s,c,l,f)}}function rf(e,t,n,r,i,a,o){var s=t.lanes|t.childLanes;if(Cd=s,s|=Ti,gt(e,n,s,r,i,a),Dd=null,(n&335544064)===n?(Od=Ia(e),r=10262):(Od=null,r=10256),(t.subtreeFlags&r)!==0||(t.flags&r)!==0?(e.callbackNode=null,e.callbackPriority=0,yf(qe,function(){return ff(),null})):(e.callbackNode=null,e.callbackPriority=0),Bl=!1,r=!!(t.flags&13878),t.subtreeFlags&13878||r){r=A.T,A.T=null,i=j.p,j.p=2,a=K,K|=4;try{mu(e,t,n)}finally{K=a,j.p=i,A.T=r}}yd=1,Bl?Ed=Mp(o,e.containerInfo,Od,sf,cf,of,lf,ff,af,null,null):(sf(),cf(),lf())}function af(e){if(yd!==0){var t=bd.onRecoverableError;t(e,{componentStack:null})}}function of(){yd===3&&(yd=0,Pu(xd,bd),yd=4)}function sf(){if(yd===1){yd=0;var e=bd,t=xd,n=Sd,r=!!(t.flags&13878);if(t.subtreeFlags&13878||r){r=A.T,A.T=null;var i=j.p;j.p=2;var a=K;K|=4;try{du=fu=!1,Au(t,e,n),n=cp;var o=Yr(e.containerInfo),s=n.focusedElem,c=n.selectionRange;if(o!==s&&s&&s.ownerDocument&&Jr(s.ownerDocument.documentElement,s)){if(c!==null&&Xr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=qr(s,h),v=qr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}gh=!!sp,cp=sp=null}finally{K=a,j.p=i,A.T=r}}e.current=t,yd=2}}function cf(){if(yd===2){yd=0;var e=bd,t=xd,n=!!(t.flags&8772);if(t.subtreeFlags&8772||n){n=A.T,A.T=null;var r=j.p;j.p=2;var i=K;K|=4;try{gu(e,t.alternate,t)}finally{K=i,j.p=r,A.T=n}}yd=3}}function lf(){if(yd===4||yd===3){yd=0;var e=Ed;Ed=null,He();var t=bd,n=xd,r=Sd,i=Td,a=(r&335544064)===r?10262:10256;if((n.subtreeFlags&a)!==0||(n.flags&a)!==0?yd=5:(yd=0,xd=bd=null,uf(t,t.pendingLanes)),a=t.pendingLanes,a===0&&(vd=null),xt(r),n=n.stateNode,$e&&typeof $e.onCommitFiberRoot==`function`)try{$e.onCommitFiberRoot(Qe,n,void 0,(n.current.flags&128)==128)}catch{}if(i!==null){n=A.T,a=j.p,j.p=2,A.T=null;try{for(var o=t.onRecoverableError,s=0;s<i.length;s++){var c=i[s];o(c.value,{componentStack:c.stack})}}finally{A.T=n,j.p=a}}if(i=Dd,o=Od,Od=null,i!==null&&(Dd=null,o===null&&(o=[]),e!==null))for(c=0;c<i.length;c++)n=(0,i[c])(o),n!==void 0&&e.finished.finally(n);Sd&3&&df(),Ef(t),a=t.pendingLanes,r&261930&&a&42?t===Ad?kd++:(kd=0,Ad=t):(kd=0,Ad=null),Df(0,!1)}}function uf(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,Na(t)))}function df(){return Ed!==null&&(Ed.skipTransition(),Ed=null),sf(),cf(),lf(),ff()}function ff(){if(yd!==5)return!1;var e=bd,t=Cd;Cd=0;var n=xt(Sd),r=A.T,a=j.p;try{j.p=32>n?32:n,A.T=null,n=wd,wd=null;var o=bd,s=Sd;if(yd=0,xd=bd=null,Sd=0,K&6)throw Error(i(331));var c=K;if(K|=4,Yu(o.current),Vu(o,o.current,s,n),K=c,Df(0,!1),$e&&typeof $e.onPostCommitFiberRoot==`function`)try{$e.onPostCommitFiberRoot(Qe,o)}catch{}return!0}finally{j.p=a,A.T=r,uf(e,t)}}function pf(e,t,n){t=Wi(n,t),t=kc(e.stateNode,t,2),e=vo(e,t,2),e!==null&&(ht(e,2),Ef(e))}function Z(e,t,n){if(e.tag===3)pf(e,e,n);else for(;t!==null;){if(t.tag===3){pf(t,e,n);break}if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(vd===null||!vd.has(r))){e=Wi(n,e),n=Ac(2),r=vo(t,n,2),r!==null&&(jc(n,r,t,e),ht(r,2),Ef(r));break}}t=t.return}}function mf(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new $u;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(rd=!0,i.add(n),e=hf.bind(null,e,t,n),t.then(e,e))}function hf(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,q===e&&(Y&n)===n&&(ad===4||ad===3&&(Y&62914560)===Y&&300>Ue()-md?K&2?cd|=n:Vd(e,0):cd|=n,ud===Y&&(ud=0)),Ef(e)}function gf(e,t){t===0&&(t=pt()),e=ki(e,t),e!==null&&(ht(e,t),Ef(e))}function _f(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),gf(e,n)}function vf(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),gf(e,n)}function yf(e,t){return ze(e,t)}var bf=null,xf=null,Sf=!1,Cf=!1,wf=!1,Tf=0;function Ef(e){e!==xf&&e.next===null&&(xf===null?bf=xf=e:xf=xf.next=e),Cf=!0,Sf||(Sf=!0,Nf())}function Df(e,t){if(!wf&&Cf){wf=!0;do for(var n=!1,r=bf;r!==null;){if(!t){if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-tt(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,Mf(r,a))}else a=Y,a=lt(r,r===q?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||ut(r,a)||(n=!0,Mf(r,a))}r=r.next}while(n);wf=!1}}function Of(){kf()}function kf(){Cf=Sf=!1;var e=0;Tf!==0&&hp()&&(e=Tf);for(var t=Ue(),n=null,r=bf;r!==null;){var i=r.next,a=Af(r,t);a===0?(r.next=null,n===null?bf=i:n.next=i,i===null&&(xf=n)):(n=r,(e!==0||a&3)&&(Cf=!0)),r=i}yd!==0&&yd!==5||Df(e,!1),Tf!==0&&(Tf=0)}function Af(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-tt(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=ft(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=q,n=Y,n=lt(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(X===2||X===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&Be(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||ut(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&Be(r),xt(n)){case 2:case 8:n=Ke;break;case 32:n=qe;break;case 268435456:n=Ye;break;default:n=qe}return r=jf.bind(null,e),n=ze(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&Be(r),e.callbackPriority=2,e.callbackNode=null,2}function jf(e,t){if(yd!==0&&yd!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(df()&&e.callbackNode!==n)return null;var r=Y;return r=lt(e,e===q?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(Fd(e,r,t),Af(e,Ue()),e.callbackNode!=null&&e.callbackNode===n?jf.bind(null,e):null)}function Mf(e,t){if(df())return null;Fd(e,t,!0)}function Nf(){bp(function(){K&6?ze(Ge,Of):kf()})}function Pf(){if(Tf===0){var e=za;e===0&&(e=at,at<<=1,!(at&261888)&&(at=256)),Tf=e}return Tf}function Ff(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:bn(e)}function If(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=Ff((i[Et]||null).action),o=r.submitter;o&&(t=(t=o[Et]||null)?Ff(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new Hn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(Tf!==0){var e=new FormData(i,o);tc(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=new FormData(i,o),tc(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var Lf=0;Lf<gi.length;Lf++){var Rf=gi[Lf];_i(Rf.toLowerCase(),`on`+(Rf[0].toUpperCase()+Rf.slice(1)))}_i(ci,`onAnimationEnd`),_i(li,`onAnimationIteration`),_i(ui,`onAnimationStart`),_i(`dblclick`,`onDoubleClick`),_i(`focusin`,`onFocus`),_i(`focusout`,`onBlur`),_i(di,`onTransitionRun`),_i(fi,`onTransitionStart`),_i(pi,`onTransitionCancel`),_i(mi,`onTransitionEnd`),Wt(`onMouseEnter`,[`mouseout`,`mouseover`]),Wt(`onMouseLeave`,[`mouseout`,`mouseover`]),Wt(`onPointerEnter`,[`pointerout`,`pointerover`]),Wt(`onPointerLeave`,[`pointerout`,`pointerover`]),Ut(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),Ut(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),Ut(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),Ut(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),Ut(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),Ut(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var zf=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),Bf=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(zf));function Vf(e,t){t=!!(t&4);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Si(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){Si(e)}i.currentTarget=null,a=c}}}}function Q(e,t){var n=t[Ot];n===void 0&&(n=t[Ot]=new Set);var r=e+`__bubble`;n.has(r)||(Gf(t,e,2,!1),n.add(r))}function Hf(e,t,n){var r=0;t&&(r|=4),Gf(n,e,r,t)}var Uf=`_reactListening`+Math.random().toString(36).slice(2);function Wf(e){if(!e[Uf]){e[Uf]=!0,Vt.forEach(function(t){t!==`selectionchange`&&(Bf.has(t)||Hf(t,!1,e),Hf(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Uf]||(t[Uf]=!0,Hf(`selectionchange`,!1,t))}}function Gf(e,t,n,r){switch(Ch(t)){case 2:var i=_h;break;case 8:i=vh;break;default:i=yh}n=i.bind(null,t,n,e),i=void 0,!jn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function Kf(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=Ft(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}On(function(){var r=a,i=Cn(n),s=[];a:{var c=hi.get(e);if(c!==void 0){var l=Hn,u=e;switch(e){case`keypress`:if(Ln(n)===0)break a;case`keydown`:case`keyup`:l=or;break;case`focusin`:u=`focus`,l=Zn;break;case`focusout`:u=`blur`,l=Zn;break;case`beforeblur`:case`afterblur`:l=Zn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=Yn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=Xn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=lr;break;case ci:case li:case ui:l=Qn;break;case mi:l=L;break;case`scroll`:case`scrollend`:l=Wn;break;case`wheel`:l=ur;break;case`copy`:case`cut`:case`paste`:l=$n;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=sr;break;case`submit`:l=cr;break;case`toggle`:case`beforetoggle`:l=dr}var d=!!(t&4),f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=kn(m,p),g!=null&&d.push(qf(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(l=e===`mouseover`||e===`pointerover`,c=e===`mouseout`||e===`pointerout`,l&&n!==Sn&&(u=n.relatedTarget||n.fromElement)&&(Ft(u)||u[Dt]))break a;(c||l)&&(u=i.window===i?i:(l=i.ownerDocument)?l.defaultView||l.parentWindow:window,c?(l=n.relatedTarget||n.toElement,c=r,l=l?Ft(l):null,l!==null&&(f=o(l),d=l.tag,l!==f||d!==5&&d!==27&&d!==6)&&(l=null)):(c=null,l=r),c!==l&&(d=Yn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=sr,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=c==null?u:Lt(c),h=l==null?u:Lt(l),u=new d(g,m+`leave`,c,n,i),u.target=f,u.relatedTarget=h,g=null,Ft(i)===r&&(d=new d(p,m+`enter`,l,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,d=c&&l?te(c,l,Yf):null,c!==null&&Xf(s,u,c,d,!1),l!==null&&f!==null&&Xf(s,f,l,d,!0)))}a:{if(c=r?Lt(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var _=jr;else if(Tr(c)){if(Mr)_=Vr;else{_=zr;var v=Rr}}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&_n(r.elementType)&&(_=jr):_=Br;if(_&&=_(e,r)){Er(s,_,n,i);break a}v&&v(e,c,r)}switch(v=r?Lt(r):window,e){case`focusin`:(Tr(v)||v.contentEditable===`true`)&&(Qr=v,$r=r,ei=null);break;case`focusout`:ei=$r=Qr=null;break;case`mousedown`:ti=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:ti=!1,ni(s,n,i);break;case`selectionchange`:if(Zr)break;case`keydown`:case`keyup`:ni(s,n,i)}var y;if(pr)b:{switch(e){case`compositionstart`:var b=`onCompositionStart`;break b;case`compositionend`:b=`onCompositionEnd`;break b;case`compositionupdate`:b=`onCompositionUpdate`;break b}b=void 0}else xr?yr(e,n)&&(b=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(b=`onCompositionStart`);b&&(gr&&n.locale!==`ko`&&(xr||b!==`onCompositionStart`?b===`onCompositionEnd`&&xr&&(y=In()):(Nn=i,Pn=`value`in Nn?Nn.value:Nn.textContent,xr=!0)),v=Jf(r,b),0<v.length&&(b=new er(b,e,null,n,i),s.push({event:b,listeners:v}),y?b.data=y:(y=br(n),y!==null&&(b.data=y)))),(y=hr?Sr(e,n):Cr(e,n))&&(b=Jf(r,`onBeforeInput`),0<b.length&&(v=new er(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:v,listeners:b}),v.data=y)),If(s,e,r,n,i)}Vf(s,t)})}function qf(e,t,n){return{instance:e,listener:t,currentTarget:n}}function Jf(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=kn(e,n),i!=null&&r.unshift(qf(e,i,a)),i=kn(e,t),i!=null&&r.push(qf(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Yf(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Xf(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=kn(n,a),l!=null&&o.unshift(qf(n,l,c))):i||(l=kn(n,a),l!=null&&o.push(qf(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Zf=/\r\n?/g,Qf=/\u0000|\uFFFD/g;function $f(e){return(typeof e==`string`?e:``+e).replace(Zf,`
`).replace(Qf,``)}function ep(e,t){return t=$f(t),$f(e)===t}function $(e,t,n,r,a,o){switch(n){case`children`:if(typeof r==`string`)t===`body`||t===`textarea`&&r===``||pn(e,r);else if(typeof r==`number`||typeof r==`bigint`)t!==`body`&&pn(e,``+r);else return;break;case`className`:Zt(e,`class`,r);break;case`tabIndex`:Zt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:Zt(e,n,r);break;case`style`:gn(e,r,o);return;case`data`:if(t!==`object`){Zt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)||r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=bn(r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}if(typeof o==`function`&&(n===`formAction`?(t!==`input`&&$(e,t,`name`,a.name,a,null),$(e,t,`formEncType`,a.formEncType,a,null),$(e,t,`formMethod`,a.formMethod,a,null),$(e,t,`formTarget`,a.formTarget,a,null)):($(e,t,`encType`,a.encType,a,null),$(e,t,`method`,a.method,a,null),$(e,t,`target`,a.target,a,null))),r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=bn(r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=xn);return;case`onScroll`:r!=null&&Q(`scroll`,e);return;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=bn(r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`credentialless`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:Q(`beforetoggle`,e),Q(`toggle`,e),Xt(e,`popover`,r);break;case`xlinkActuate`:Qt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:Qt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:Qt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:Qt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:Qt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:Qt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:Qt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:Qt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:Qt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Xt(e,`is`,r);break;case`innerText`:case`textContent`:return;default:if(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)n=vn.get(n)||n,Xt(e,n,r);else return}I=!0}function tp(e,t,n,r,a,o){switch(n){case`style`:gn(e,r,o);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`children`:if(typeof r==`string`)pn(e,r);else if(typeof r==`number`||typeof r==`bigint`)pn(e,``+r);else return;break;case`onScroll`:r!=null&&Q(`scroll`,e);return;case`onScrollEnd`:r!=null&&Q(`scrollend`,e);return;case`onClick`:r!=null&&(e.onclick=xn);return;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:return;case`innerText`:case`textContent`:return;default:if(!Ht.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),o=n.slice(2,a?n.length-7:void 0),t=e[Et]||null,t=t==null?null:t[n],typeof t==`function`&&e.removeEventListener(o,t,a),typeof r==`function`)){typeof t!=`function`&&t!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(o,r,a);break a}I=!0,n in e?e[n]=r:!0===r?e.setAttribute(n,``):Xt(e,n,r)}return}I=!0}function np(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:Q(`error`,e),Q(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,o,s,n,null)}}a&&$(e,t,`srcSet`,n.srcSet,n,null),r&&$(e,t,`src`,n.src,n,null);return;case`input`:Q(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:$(e,t,r,d,n,null)}}cn(e,o,c,l,u,s,a,!1);return;case`select`:for(a in Q(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:$(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&un(e,!!r,n,!0):un(e,!!r,t,!1);return;case`textarea`:for(s in Q(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:$(e,t,s,c,n,null)}fn(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:$(e,t,l,r,n,null)}return;case`dialog`:Q(`beforetoggle`,e),Q(`toggle`,e),Q(`cancel`,e),Q(`close`,e);break;case`iframe`:case`object`:Q(`load`,e);break;case`video`:case`audio`:for(r=0;r<zf.length;r++)Q(zf[r],e);break;case`image`:Q(`error`,e),Q(`load`,e);break;case`details`:Q(`toggle`,e);break;case`embed`:case`source`:case`link`:Q(`error`,e),Q(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:$(e,t,u,r,n,null)}return;default:if(_n(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&tp(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&$(e,t,c,r,n,null))}var rp={};function ip(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||$(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:m!==f&&(I=!0),o=m;break;case`name`:m!==f&&(I=!0),a=m;break;case`checked`:m!==f&&(I=!0),u=m;break;case`defaultChecked`:m!==f&&(I=!0),d=m;break;case`value`:m!==f&&(I=!0),s=m;break;case`defaultValue`:m!==f&&(I=!0),c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&$(e,t,p,m,r,f)}}sn(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||$(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:o!==l&&(I=!0),p=o;break;case`defaultValue`:o!==l&&(I=!0),c=o;break;case`multiple`:o!==l&&(I=!0),s=o;default:o!==l&&$(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?un(e,!!n,n?[]:``,!1):un(e,!!n,t,!0)):un(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:$(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:a!==o&&(I=!0),p=a;break;case`defaultValue`:a!==o&&(I=!0),m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&$(e,t,s,a,r,o)}dn(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:$(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:p!==m&&(I=!0),e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:$(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&$(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:$(e,t,u,p,r,m)}return;default:if(_n(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&tp(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||tp(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&$(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||$(e,t,f,p,r,m)}function ap(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function op(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&ap(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&ap(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var sp=null,cp=null;function lp(e){return e.nodeType===9?e:e.ownerDocument}function up(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function dp(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function fp(e,t,n,r){return n=lp(n).createElement(e),n[Tt]=r,n[Et]=t,np(n,e,t),zt(n),n}function pp(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var mp=null;function hp(){var e=window.event;return e&&e.type===`popstate`?e!==mp&&(mp=e,!0):(mp=null,!1)}var gp=typeof setTimeout==`function`?setTimeout:void 0,_p=typeof clearTimeout==`function`?clearTimeout:void 0,vp=typeof Promise==`function`?Promise:void 0,yp=typeof requestAnimationFrame==`function`?requestAnimationFrame:gp,bp=typeof queueMicrotask==`function`?queueMicrotask:vp===void 0?gp:function(e){return vp.resolve(null).then(e).catch(xp)};function xp(e){setTimeout(function(){throw e})}function Sp(e){return e===`head`}function Cp(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8){if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Hh(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)_m(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,_m(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[Mt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&_m(e.ownerDocument.body)}n=i}while(n);Hh(t)}function wp(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8){if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++}n=r}while(n)}function Tp(e,t,n){if(t=CSS.escape(t)===t?t:`r-`+btoa(t).replace(/=/g,``),e.style.viewTransitionName=t,n!=null&&(e.style.viewTransitionClass=n),n=getComputedStyle(e),n.display===`inline`){if(t=e.getClientRects(),t.length===1)var r=1;else for(var i=r=0;i<t.length;i++){var a=t[i];0<a.width&&0<a.height&&r++}r===1&&(e=e.style,e.display=t.length===1?`inline-block`:`block`,e.marginTop=`-`+n.paddingTop,e.marginBottom=`-`+n.paddingBottom)}}function Ep(e,t){e=e.style,t=t.style;var n=t==null?null:t.hasOwnProperty(`viewTransitionName`)?t.viewTransitionName:t.hasOwnProperty(`view-transition-name`)?t[`view-transition-name`]:null;e.viewTransitionName=n==null||typeof n==`boolean`?``:(``+n).trim(),n=t==null?null:t.hasOwnProperty(`viewTransitionClass`)?t.viewTransitionClass:t.hasOwnProperty(`view-transition-class`)?t[`view-transition-class`]:null,e.viewTransitionClass=n==null||typeof n==`boolean`?``:(``+n).trim(),e.display===`inline-block`&&(t==null?e.display=e.margin=``:(n=t.display,e.display=n==null||typeof n==`boolean`?``:n,n=t.margin,n==null?(n=t.hasOwnProperty(`marginTop`)?t.marginTop:t[`margin-top`],e.marginTop=n==null||typeof n==`boolean`?``:n,t=t.hasOwnProperty(`marginBottom`)?t.marginBottom:t[`margin-bottom`],e.marginBottom=t==null||typeof t==`boolean`?``:t):e.margin=n))}function Dp(e,t,n){return n=n.ownerDocument.defaultView,{rect:e,abs:t.position===`absolute`||t.position===`fixed`,clip:t.clipPath!==`none`||t.overflow!==`visible`||t.filter!==`none`||t.mask!==`none`||t.mask!==`none`||t.borderRadius!==`0px`,view:0<=e.bottom&&0<=e.right&&e.top<=n.innerHeight&&e.left<=n.innerWidth}}function Op(e){return Dp(e.getBoundingClientRect(),getComputedStyle(e),e)}function kp(e){var t=e.getBoundingClientRect();t=new DOMRect(t.x+2e4,t.y+2e4,t.width,t.height);var n=getComputedStyle(e);return Dp(t,n,e)}function Ap(e){return e.documentElement.clientHeight}function jp(e){this.addEventListener(`load`,e),this.addEventListener(`error`,e)}function Mp(e,t,n,r,i,a,o,s,c){var l=t.nodeType===9?t:t.ownerDocument;try{var u=l.startViewTransition({update:function(){var t=l.defaultView,n=t.navigation&&t.navigation.transition,o=l.fonts.status;r();var s=[];if(o===`loaded`&&(Ap(l),l.fonts.status===`loading`&&s.push(l.fonts.ready)),o=s.length,e!==null)for(var c=e.suspenseyImages,u=0,d=0;d<c.length;d++){var f=c[d];if(!f.complete){var p=f.getBoundingClientRect();if(0<p.bottom&&0<p.right&&p.top<t.innerHeight&&p.left<t.innerWidth){if(u+=Xm(f),u>$m){s.length=o;break}f=new Promise(jp.bind(f)),s.push(f)}}}if(0<s.length)return t=Promise.race([Promise.all(s),new Promise(function(e){return setTimeout(e,500)})]).then(i,i),(n?Promise.allSettled([n.finished,t]):t).then(a,a);if(i(),n)return n.finished.then(a,a);a()},types:n});l.__reactViewTransition=u;var d=[];return u.ready.then(function(){for(var e=l.documentElement.getAnimations({subtree:!0}),t=0;t<e.length;t++){var n=e[t],r=n.effect,i=r.pseudoElement;if(i!=null&&i.startsWith(`::view-transition`)){d.push(n),n=r.getKeyframes();for(var a=i=void 0,s=!0,c=0;c<n.length;c++){var u=n[c],f=u.width;if(i===void 0)i=f;else if(i!==f){s=!1;break}if(f=u.height,a===void 0)a=f;else if(a!==f){s=!1;break}delete u.width,delete u.height,u.transform===`none`&&delete u.transform}s&&i!==void 0&&a!==void 0&&(r.setKeyframes(n),s=getComputedStyle(r.target,r.pseudoElement),s.width!==i||s.height!==a)&&(s=n[0],s.width=i,s.height=a,s=n[n.length-1],s.width=i,s.height=a,r.setKeyframes(n))}}o()},function(e){l.__reactViewTransition===u&&(l.__reactViewTransition=null);try{if(typeof e==`object`&&e)switch(e.name){case`InvalidStateError`:(e.message===`View transition was skipped because document visibility state is hidden.`||e.message===`Skipping view transition because document visibility state has become hidden.`||e.message===`Skipping view transition because viewport size changed.`||e.message===`Transition was aborted because of invalid state`)&&(e=null)}e!==null&&c(e)}finally{r(),i(),o()}}),u.finished.finally(function(){for(var e=0;e<d.length;e++)d[e].cancel();l.__reactViewTransition===u&&(l.__reactViewTransition=null),s()}),u}catch{return r(),i(),o(),null}}function Np(e,t){this._scope=document.documentElement,this._selector=`::view-transition-`+e+`(`+t+`)`}Np.prototype.animate=function(e,t){return t=typeof t==`number`?{duration:t}:T({},t),t.pseudoElement=this._selector,this._scope.animate(e,t)},Np.prototype.getAnimations=function(){for(var e=this._scope,t=this._selector,n=e.getAnimations({subtree:!0}),r=[],i=0;i<n.length;i++){var a=n[i].effect;a!==null&&a.target===e&&a.pseudoElement===t&&r.push(n[i])}return r},Np.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function Pp(e){return{name:e,group:new Np(`group`,e),imagePair:new Np(`image-pair`,e),old:new Np(`old`,e),new:new Np(`new`,e)}}function Fp(e){this._fragmentFiber=e,this._observers=this._eventListeners=null}Fp.prototype.addEventListener=function(e,t,n){var r=null,i=null;if(!(n!=null&&typeof n!=`boolean`&&(r=n.signal||null,r!==null&&r.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var a=this._eventListeners;if(Bp(a,e,t,n)===-1){var o=this,s=t;n!=null&&typeof n!=`boolean`&&!0===n.once&&(s=function(r){o.removeEventListener(e,t,n),typeof t==`function`?t.call(this,r):t.handleEvent(r)}),r!==null&&(i=o.removeEventListener.bind(o,e,t,n),r.addEventListener(`abort`,i,{once:!0}),i=r.removeEventListener.bind(r,`abort`,i)),r=Rp(n),a.push({type:e,listener:t,optionsOrUseCapture:n,attachedListener:s,cleanup:i}),h(this._fragmentFiber.child,!1,Ip,e,s,r)}this._eventListeners=a}};function Ip(e,t,n,r){return b(e).addEventListener(t,n,r),!1}Fp.prototype.removeEventListener=function(e,t,n){var r=this._eventListeners;if(r!==null&&(t=Bp(r,e,t,n),t!==-1)){var i=r[t];n=i.attachedListener;var a=i.cleanup;i=Rp(i.optionsOrUseCapture),h(this._fragmentFiber.child,!1,Lp,e,n,i),r.splice(t,1),a!==null&&a()}};function Lp(e,t,n,r){return b(e).removeEventListener(t,n,r),!1}function Rp(e){return e!=null&&typeof e!=`boolean`&&(!0===e.once||e.signal instanceof AbortSignal)?{capture:e.capture,passive:e.passive}:e}function zp(e){return e==null?`c=0`:typeof e==`boolean`?`c=`+(e?`1`:`0`):`c=`+(e.capture?`1`:`0`)}function Bp(e,t,n,r){if(e.length===0)return-1;r=zp(r);for(var i=0;i<e.length;i++){var a=e[i];if(a.type===t&&a.listener===n&&zp(a.optionsOrUseCapture)===r)return i}return-1}Fp.prototype.dispatchEvent=function(e){var t=g(this._fragmentFiber);if(t===null)return!0;t=b(t);var n=this._eventListeners;if(n!==null&&0<n.length||!e.bubbles){var r=t.nodeType===9?t.createComment(``):document.createTextNode(``);if(n)for(var i=0;i<n.length;i++){var a=n[i];r.addEventListener(a.type,a.attachedListener,Rp(a.optionsOrUseCapture))}if(t.appendChild(r),e=r.dispatchEvent(e),n)for(i=0;i<n.length;i++)a=n[i],r.removeEventListener(a.type,a.attachedListener,Rp(a.optionsOrUseCapture));return t.removeChild(r),e}return t.dispatchEvent(e)},Fp.prototype.focus=function(e){h(this._fragmentFiber.child,!0,Vp,e,void 0,void 0)};function Vp(e,t){return e.tag!==6&&(e=b(e),pm(e,t))}Fp.prototype.focusLast=function(e){var t=[];h(this._fragmentFiber.child,!0,Hp,t,void 0,void 0);for(var n=t.length-1;0<=n&&!Vp(t[n],e);n--);};function Hp(e,t){return t.push(e),!1}Fp.prototype.blur=function(){var e=g(this._fragmentFiber);e!==null&&(e=b(e),e=lp(e).activeElement,e!==null&&h(this._fragmentFiber.child,!1,Up,e,void 0,void 0))};function Up(e,t){return e.tag!==6&&(e=b(e),e===t||e.contains(t)?(t.blur(),!0):!1)}Fp.prototype.observeUsing=function(e){this._observers===null&&(this._observers=new Set),this._observers.add(e),h(this._fragmentFiber.child,!1,Wp,e,void 0,void 0)};function Wp(e,t){return e.tag===6||(e=b(e),t.observe(e)),!1}Fp.prototype.unobserveUsing=function(e){var t=this._observers;if(t!==null&&t.has(e)){t.delete(e),h(this._fragmentFiber.child,!1,Gp,e,void 0,void 0);for(var n=t=0;n<Kp.length;n++){var r=Kp[n];r.fragmentInstance===this&&r.observer===e?e.unobserve(r.instance):Kp[t++]=r}Kp.length=t}};function Gp(e,t){return e.tag===6||(e=b(e),t.unobserve(e)),!1}var Kp=[],qp=!1;function Jp(e,t,n){Kp.push({fragmentInstance:e,observer:t,instance:n}),qp||(qp=!0,mm(function(){qp=!1;var e=Kp;Kp=[];for(var t=0;t<e.length;t++){var n=e[t];n.observer.unobserve(n.instance)}}))}Fp.prototype.getClientRects=function(){var e=[];return h(this._fragmentFiber.child,!1,Yp,e,void 0,void 0),e};function Yp(e,t){if(e.tag===6){e=e.stateNode;var n=e.ownerDocument.createRange();n.selectNodeContents(e),t.push.apply(t,n.getClientRects())}else e=b(e),t.push.apply(t,e.getClientRects());return!1}Fp.prototype.getRootNode=function(e){var t=g(this._fragmentFiber);return t===null?this:b(t).getRootNode(e)},Fp.prototype.compareDocumentPosition=function(e){var t=g(this._fragmentFiber);if(t===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var n=[];h(this._fragmentFiber.child,!1,Hp,n,void 0,void 0);var r=b(t);if(n.length===0){if(n=r,_(this._fragmentFiber)){a:{for(t=this._fragmentFiber.return;t!==null;){if(t.tag===4){t=t.stateNode.containerInfo;break a}if(t.tag===3||t.tag===5||t.tag===27)break;t=t.return}t=null}t!=null&&(n=t)}t=this._fragmentFiber;var i=r=n.compareDocumentPosition(e);return n===e?i=Node.DOCUMENT_POSITION_CONTAINS:r&Node.DOCUMENT_POSITION_CONTAINED_BY&&(n=v(t)[1],n===null?i=Node.DOCUMENT_POSITION_PRECEDING:(e=b(n).compareDocumentPosition(e),i=e===0||e&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),i|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}t=b(n[0]),i=b(n[n.length-1]);var a=_(this._fragmentFiber)?t.parentElement:r;if(a==null)return Node.DOCUMENT_POSITION_DISCONNECTED;r=a.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY,a=a.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_CONTAINED_BY;var o=t.compareDocumentPosition(e),s=i.compareDocumentPosition(e),c=o&Node.DOCUMENT_POSITION_CONTAINED_BY||s&Node.DOCUMENT_POSITION_CONTAINED_BY;return s=r&&a&&o&Node.DOCUMENT_POSITION_FOLLOWING&&s&Node.DOCUMENT_POSITION_PRECEDING,t=r&&t===e||a&&i===e||c||s?Node.DOCUMENT_POSITION_CONTAINED_BY:!r&&t===e||!a&&i===e?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:o,t&Node.DOCUMENT_POSITION_DISCONNECTED||t&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||Xp(t,this._fragmentFiber,n[0],n[n.length-1],e)?t:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function Xp(e,t,n,r,i){var a=Ft(i);if(e&Node.DOCUMENT_POSITION_CONTAINED_BY){if(n=!!a)a:{for(;a!==null;){if(a.tag===7&&(a===t||a.alternate===t)){n=!0;break a}a=a.return}n=!1}return n}if(e&Node.DOCUMENT_POSITION_CONTAINS){if(a===null)return a=i.ownerDocument,i===a||i===a.documentElement||i===a.body;a:{for(a=t,t=g(t);a!==null;){if(!(a.tag!==5&&a.tag!==3&&a.tag!==27||a!==t&&a.alternate!==t)){a=!0;break a}a=a.return}a=!1}return a}return e&Node.DOCUMENT_POSITION_PRECEDING?((t=!!a)&&!(t=a===n)&&(t=te(n,a,w),t===null?t=!1:(h(t,!0,C,a,n),a=x,x=null,t=a!==null)),t):e&Node.DOCUMENT_POSITION_FOLLOWING?((t=!!a)&&!(t=a===r)&&(t=te(r,a,w),t===null?t=!1:(h(t,!0,ee,a,r),a=x,S=x=null,t=a!==null)),t):!1}function Zp(e,t){var n=e.ownerDocument.createRange();n.selectNodeContents(e),e=n.getBoundingClientRect(),window.scrollTo(window.scrollX+e.left,t?window.scrollY+e.top:window.scrollY+e.bottom-window.innerHeight)}Fp.prototype.scrollIntoView=function(e){if(typeof e==`object`)throw Error(i(566));var t=[];h(this._fragmentFiber.child,!1,Hp,t,void 0,void 0);var n=!1!==e;if(t.length===0){var r=v(this._fragmentFiber);if(r=n?r[1]||r[0]||g(this._fragmentFiber):r[0]||r[1],r===null)return;if(r.tag===6){e=b(r),Zp(e,n);return}if(r=b(r),r.nodeType!==9){if(r.nodeType===11){n=`host`in r?r.host:null,n!==null&&n.scrollIntoView(e);return}r.scrollIntoView(e)}}for(r=n?t.length-1:0;r!==(n?-1:t.length);){var a=t[r];a.tag===6?(a=b(a),Zp(a,n)):b(a).scrollIntoView(e),r+=n?-1:1}};function Qp(e,t){return e=b(e),$p(e,t),!1}function $p(e,t){e.reactFragments??=new Set,e.reactFragments.add(t)}function em(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.addEventListener(i.type,i.attachedListener,Rp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){for(var r=0,i=0;i<Kp.length;i++){var a=Kp[i];(a.fragmentInstance!==t||a.observer!==n||a.instance!==e)&&(Kp[r++]=a)}Kp.length=r,n.observe(e)}),$p(e,t))}function tm(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.removeEventListener(i.type,i.attachedListener,Rp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){typeof n.rootMargin==`string`?Jp(t,n,e):n.unobserve(e)}),e.reactFragments!=null&&e.reactFragments.delete(t))}function nm(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:nm(n),Pt(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function rm(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r){if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e}else if(!e[Mt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=lm(e.nextSibling),e===null)break}return null}function im(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=lm(e.nextSibling),e===null))return null;return e}function am(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=lm(e.nextSibling),e===null))return null;return e}function om(e){return e.data===`$?`||e.data===`$~`}function sm(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function cm(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function lm(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var um=null;function dm(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return lm(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function fm(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function pm(e,t){function n(){r=!0}if(e.ownerDocument.activeElement===e)return!0;var r=!1;try{e.ownerDocument.addEventListener(`focus`,n,!0),(e.focus||HTMLElement.prototype.focus).call(e,t)}finally{e.ownerDocument.removeEventListener(`focus`,n,!0)}return r}function mm(e){yp(function(){yp(function(t){return e(t)})})}function hm(e,t,n){switch(t=lp(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function gm(e,t,n){for(var r in n){var i=n[r];n.hasOwnProperty(r)&&i!=null&&$(e,t,r,null,rp,i)}n.dangerouslySetInnerHTML!=null&&(e.textContent=``),e.onclick===xn&&(e.onclick=null),Pt(e)}function _m(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Pt(e)}var vm=new Map,ym=new Set;function bm(e){if(typeof e.getRootNode==`function`){var t=e.getRootNode();if(t.nodeType===9||t.nodeType===11)return t}return e.nodeType===9?e:e.ownerDocument}var xm=j.d;j.d={f:Sm,r:Cm,D:Em,C:Dm,L:Om,m:km,X:jm,S:Am,M:Mm};function Sm(){var e=xm.f(),t=zd();return e||t}function Cm(e){var t=It(e);t!==null&&t.tag===5&&t.type===`form`?rc(t):xm.r(e)}var wm=typeof document>`u`?null:document;function Tm(e,t,n){var r=wm;if(r&&typeof t==`string`&&t){var i=on(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),ym.has(i)||(ym.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),np(t,`link`,e),zt(t),r.head.appendChild(t)))}}function Em(e){xm.D(e),Tm(`dns-prefetch`,e,null)}function Dm(e,t){xm.C(e,t),Tm(`preconnect`,e,t)}function Om(e,t,n){xm.L(e,t,n);var r=wm;if(r&&e&&t){var i=`link[rel="preload"][as="`+on(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+on(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+on(n.imageSizes)+`"]`)):i+=`[href="`+on(e)+`"]`;var a=i;switch(t){case`style`:a=Pm(e);break;case`script`:a=Rm(e)}if(!(vm.has(a)||(e=T({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),vm.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(Fm(a))||t===`script`&&r.querySelector(zm(a))))){var o=r.createElement(`link`);np(o,`link`,e),t===`style`&&(o[Nt]=!0,o.onload=o.onerror=function(){Bt(o)}),zt(o),r.head.appendChild(o)}}}function km(e,t){xm.m(e,t);var n=wm;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+on(r)+`"][href="`+on(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Rm(e)}if(!vm.has(a)&&(e=T({rel:`modulepreload`,href:e},t),vm.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(zm(a)))return}r=n.createElement(`link`),np(r,`link`,e),zt(r),n.head.appendChild(r)}}}function Am(e,t,n){xm.S(e,t,n);var r=wm;if(r&&e){var i=Rt(r).hoistableStyles,a=Pm(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(Fm(a)))s.loading=5;else{e=T({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=vm.get(a))&&Hm(e,n);var c=o=r.createElement(`link`);zt(c),np(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Vm(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function jm(e,t){xm.X(e,t);var n=wm;if(n&&e){var r=Rt(n).hoistableScripts,i=Rm(e),a=r.get(i);a||(a=n.querySelector(zm(i)),a||(e=T({src:e,async:!0},t),(t=vm.get(i))&&Um(e,t),a=n.createElement(`script`),zt(a),np(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Mm(e,t){xm.M(e,t);var n=wm;if(n&&e){var r=Rt(n).hoistableScripts,i=Rm(e),a=r.get(i);a||(a=n.querySelector(zm(i)),a||(e=T({src:e,async:!0,type:`module`},t),(t=vm.get(i))&&Um(e,t),a=n.createElement(`script`),zt(a),np(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Nm(e,t,n,r){var a=(a=Ee.current)?bm(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(n=Pm(n.href),t=Rt(a).hoistableStyles,r=t.get(n),r||(r={type:`style`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Pm(n.href);var o=Rt(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(Fm(e)))?o._p||(s.instance=o,s.state.loading=5):(o=vm.get(e),o||(o={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},vm.set(e,o)),Lm(a,e,o,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(n=Rm(n),t=Rt(a).hoistableScripts,r=t.get(n),r||(r={type:`script`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Pm(e){return`href="`+on(e)+`"`}function Fm(e){return`link[rel="stylesheet"][`+e+`]`}function Im(e){return T({},e,{"data-precedence":e.precedence,precedence:null})}function Lm(e,t,n,r){if(t=e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)){if(!0!==t[Nt]){r.loading=1;return}}else t=e.createElement(`link`),t[Nt]=!0,t.onload=t.onerror=Bt.bind(null,t),np(t,`link`,n),zt(t),e.head.appendChild(t);r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2})}function Rm(e){return`[src="`+on(e)+`"]`}function zm(e){return`script[async]`+e}function Bm(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+on(n.href)+`"]`);if(r)return t.instance=r,zt(r),r;var a=T({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),zt(r),np(r,`style`,a),Vm(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Pm(n.href);var o=e.querySelector(Fm(a));if(o)return t.state.loading|=4,t.instance=o,zt(o),o;r=Im(n),(a=vm.get(a))&&Hm(r,a),o=(e.ownerDocument||e).createElement(`link`),zt(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),np(o,`link`,r),t.state.loading|=4,Vm(o,n.precedence,e),t.instance=o;case`script`:return o=Rm(n.src),(a=e.querySelector(zm(o)))?(t.instance=a,zt(a),a):(r=n,(a=vm.get(o))&&(r=T({},n),Um(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),zt(a),np(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Vm(r,n.precedence,e));return t.instance}function Vm(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Hm(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function Um(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Wm=null;function Gm(e,t,n){if(Wm===null){var r=new Map,i=Wm=new Map;i.set(n,r)}else i=Wm,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[Mt]||a[Tt]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Km(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function qm(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Jm(e,t){return e===`img`&&t.src!=null&&t.src!==``&&t.onLoad==null&&t.loading!==`lazy`}function Ym(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Xm(e){return(e.width||100)*(e.height||100)*(typeof devicePixelRatio==`number`?devicePixelRatio:1)*.25}function Zm(e,t){typeof t.decode==`function`&&(e.imgCount++,t.complete||(e.imgBytes+=Xm(t),e.suspenseyImages.push(t)),e=rh.bind(e),t.decode().then(e,e))}function Qm(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Pm(r.href),a=t.querySelector(Fm(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=nh.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,zt(a);return}a=t.ownerDocument||t,r=Im(r),(i=vm.get(i))&&Hm(r,i),a=a.createElement(`link`),zt(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),np(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=nh.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var $m=0;function eh(e,t){return e.stylesheets&&e.count===0&&ah(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&ah(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&$m===0&&($m=62500*op());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&ah(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>$m?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function th(e){if(e.count===0&&(e.imgCount===0||!e.waitingForImages)){if(e.stylesheets)ah(e,e.stylesheets);else if(e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}}}function nh(){this.count--,th(this)}function rh(){this.imgCount--,th(this)}var ih=null;function ah(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,ih=new Map,t.forEach(oh,e),ih=null,nh.call(e))}function oh(e,t){if(!(t.state.loading&4)){var n=ih.get(e);if(n)var r=n.get(null);else{n=new Map,ih.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=nh.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var sh={$$typeof:D,Provider:null,Consumer:null,_currentValue:xe,_currentValue2:xe,_threadCount:0};function ch(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=mt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=mt(0),this.hiddenUpdates=mt(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.transitionTypes=null,this.incompleteTransitions=new Map}function lh(e,t,n,r,i,a,o,s,c,l,u,d){return e=new ch(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=Pi(3,null,null,t),e.current=a,a.stateNode=e,t=Ma(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},ho(a),e}function uh(e){return e?(e=Mi,e):Mi}function dh(e,t,n,r,i,a){i=uh(i),r.context===null?r.context=i:r.pendingContext=i,r=_o(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=vo(e,r,t),n!==null&&(Pd(n,e,t),yo(n,e,t))}function fh(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ph(e,t){fh(e,t),(e=e.alternate)&&fh(e,t)}function mh(e){if(e.tag===13||e.tag===31){var t=ki(e,67108864);t!==null&&Pd(t,e,67108864),ph(e,67108864)}}function hh(e){if(e.tag===13||e.tag===31){var t=jd();t=bt(t);var n=ki(e,t);n!==null&&Pd(n,e,t),ph(e,t)}}var gh=!0;function _h(e,t,n,r){var i=A.T;A.T=null;var a=j.p;try{j.p=2,yh(e,t,n,r)}finally{j.p=a,A.T=i}}function vh(e,t,n,r){var i=A.T;A.T=null;var a=j.p;try{j.p=8,yh(e,t,n,r)}finally{j.p=a,A.T=i}}function yh(e,t,n,r){if(gh){var i=bh(r);if(i===null)Kf(e,t,r,xh,n),Mh(e,r);else if(Ph(i,e,t,n,r))r.stopPropagation();else if(Mh(e,r),t&4&&-1<jh.indexOf(e)){for(;i!==null;){var a=It(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=ct(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-tt(o);s.entanglements[1]|=c,o&=~c}Ef(a),!(K&6)&&(gd=Ue()+500,Df(0,!1))}}break;case 31:case 13:s=ki(a,2),s!==null&&Pd(s,a,2),zd(),ph(a,2)}if(a=bh(r),a===null&&Kf(e,t,r,xh,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Kf(e,t,r,null,n)}}function bh(e){return e=Cn(e),Sh(e)}var xh=null;function Sh(e){if(xh=null,e=Ft(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return xh=e,null}function Ch(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`fullscreenerror`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`resize`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(We()){case Ge:return 2;case Ke:return 8;case qe:case Je:return 32;case Ye:return 268435456;default:return 32}default:return 32}}var wh=!1,Th=null,Eh=null,Dh=null,Oh=new Map,kh=new Map,Ah=[],jh=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Mh(e,t){switch(e){case`focusin`:case`focusout`:Th=null;break;case`dragenter`:case`dragleave`:Eh=null;break;case`mouseover`:case`mouseout`:Dh=null;break;case`pointerover`:case`pointerout`:Oh.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:kh.delete(t.pointerId)}}function Nh(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=It(t),t!==null&&mh(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Ph(e,t,n,r,i){switch(t){case`focusin`:return Th=Nh(Th,e,t,n,r,i),!0;case`dragenter`:return Eh=Nh(Eh,e,t,n,r,i),!0;case`mouseover`:return Dh=Nh(Dh,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return Oh.set(a,Nh(Oh.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,kh.set(a,Nh(kh.get(a)||null,e,t,n,r,i)),!0}return!1}function Fh(e){var t=Ft(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,Ct(e.priority,function(){hh(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,Ct(e.priority,function(){hh(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ih(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=bh(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);Sn=r,n.target.dispatchEvent(r),Sn=null}else return t=It(n),t!==null&&mh(t),e.blockedOn=n,!1;t.shift()}return!0}function Lh(e,t,n){Ih(e)&&n.delete(t)}function Rh(){wh=!1,Th!==null&&Ih(Th)&&(Th=null),Eh!==null&&Ih(Eh)&&(Eh=null),Dh!==null&&Ih(Dh)&&(Dh=null),Oh.forEach(Lh),kh.forEach(Lh)}function zh(e,n){e.blockedOn===n&&(e.blockedOn=null,wh||(wh=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,Rh)))}var Bh=null;function Vh(e){Bh!==e&&(Bh=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){Bh===e&&(Bh=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(Sh(r||n)===null)continue;break}var a=It(n);a!==null&&(e.splice(t,3),t-=3,tc(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Hh(e){function t(t){return zh(t,e)}Th!==null&&zh(Th,e),Eh!==null&&zh(Eh,e),Dh!==null&&zh(Dh,e),Oh.forEach(t),kh.forEach(t);for(var n=0;n<Ah.length;n++){var r=Ah[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<Ah.length&&(n=Ah[0],n.blockedOn===null);)Fh(n),n.blockedOn===null&&Ah.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[Et]||null;if(typeof a==`function`)o||Vh(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[Et]||null)s=o.formAction;else if(Sh(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Vh(n)}}}function Uh(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Wh(e){this._internalRoot=e}Gh.prototype.render=Wh.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;dh(n,jd(),e,t,null,null)},Gh.prototype.unmount=Wh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;dh(e.current,2,null,e,null,null),zd(),t[Dt]=null}};function Gh(e){this._internalRoot=e}Gh.prototype.unstable_scheduleHydration=function(e){if(e){var t=St();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Ah.length&&t!==0&&t<Ah[n].priority;n++);Ah.splice(n,0,e),n===0&&Fh(e)}};var Kh=n.version;if(Kh!==`19.3.1`)throw Error(i(527,Kh,`19.3.1`));j.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=d(t),e=e===null?null:p(e),e=e===null?null:e.stateNode,e};var qh={bundleType:0,version:`19.3.1`,rendererPackageName:`react-dom`,currentDispatcherRef:A,reconcilerVersion:`19.3.1`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var Jh=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Jh.isDisabled&&Jh.supportsFiber)try{Qe=Jh.inject(qh),$e=Jh}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=wc,s=Tc,c=Ec;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=lh(e,1,!1,null,null,n,r,null,o,s,c,Uh),e[Dt]=t.current,Wf(e),new Wh(t)}})),g=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=h()})),_=c(u(),1),v=g(),y=15e3,b=new Set,x=new Map,S=!1,C=0;function ee(){return typeof window<`u`&&typeof window.external?.sendMessage==`function`}function w(){S||(S=!0,typeof window<`u`&&typeof window.external?.receiveMessage==`function`&&window.external.receiveMessage(e=>te(e)))}function te(e){let t;try{t=JSON.parse(e)}catch(t){console.warn(`[Native] Received a non-JSON message:`,e,t);return}let n=typeof t.id==`string`?t.id:void 0,r=n?x.get(n):void 0;n&&r&&(x.delete(n),clearTimeout(r.timeoutId),t.ok===!1?r.reject(Error(typeof t.error==`string`?t.error:`Native request failed.`)):r.resolve(t.data)),b.forEach(e=>{try{e(t)}catch(e){console.error(`[Native] Message handler threw:`,e)}})}var T={get available(){return ee()},send(e){ee()?(w(),window.external.sendMessage(JSON.stringify(e))):console.debug(`[Native] Bridge unavailable, dropping message:`,e)},request(e,t,n=y){if(!ee())return Promise.reject(Error(`Native bridge is not available.`));w();let r=`req-${++C}-${Date.now()}`;return new Promise((i,a)=>{let o=setTimeout(()=>{x.delete(r),a(Error(`Native request '${e}' timed out after ${n}ms.`))},n);x.set(r,{resolve:i,reject:a,timeoutId:o}),window.external.sendMessage(JSON.stringify({type:e,id:r,payload:t}))})},on(e){return w(),b.add(e),()=>b.delete(e)}},ne=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),re=o(((e,t)=>{t.exports=ne()})),E=re();function ie(e){return(t,n)=>{let r=e[t]??t;return n?r.replace(/\{(\w+)}/g,(e,t)=>t in n?String(n[t]):e):r}}async function ae(e){return T.available?await T.request(`i18n.get`,e?{locale:e}:void 0):{locale:`en`,strings:{},available:[`en`]}}var oe=(0,_.createContext)(ie({})),se=(0,_.createContext)(`en`);function D(){return(0,_.useContext)(oe)}function ce(){return(0,_.useContext)(se)}var le=({children:e})=>{let[t,n]=(0,_.useState)(()=>ie({})),[r,i]=(0,_.useState)(`en`);return(0,_.useEffect)(()=>{let e=!1,t=async()=>{try{let t=await ae();if(e)return;n(()=>ie(t.strings)),i(t.locale)}catch{}};t();let r=T.on(e=>{e.type===`settings.changed`&&t()});return()=>{e=!0,r()}},[]),(0,_.useEffect)(()=>{document.documentElement.lang=r},[r]),(0,E.jsx)(oe.Provider,{value:t,children:(0,E.jsx)(se.Provider,{value:r,children:e})})},ue=e=>T.send({type:e});function de(){let[e,t]=(0,_.useState)(!1);return(0,_.useEffect)(()=>{if(T.available)return T.on(e=>{if(e.type!==`window.state`)return;let n=e.data;typeof n?.maximized==`boolean`&&t(n.maximized)})},[]),{maximized:e,minimize:()=>ue(`window.minimize`),toggleMaximize:()=>ue(`window.toggleMaximize`),close:()=>ue(`window.close`)}}function fe(){return{onMouseDown:()=>ue(`window.drag`),onDoubleClick:()=>ue(`window.toggleMaximize`)}}function pe(){let[e,t]=(0,_.useState)(!1),{maximized:n}=de();return(0,_.useEffect)(()=>{if(!T.available)return;let e=!1;return T.request(`app.info`).then(n=>{e||t(n.rounded===!0)}).catch(()=>void 0),()=>{e=!0}},[]),(0,_.useEffect)(()=>{document.documentElement.classList.toggle(`window-rounded`,e)},[e]),e&&!n}var me=[[`top`,{top:0,left:8,right:8,height:5,cursor:`ns-resize`}],[`bottom`,{bottom:0,left:8,right:8,height:5,cursor:`ns-resize`}],[`left`,{top:8,bottom:8,left:0,width:5,cursor:`ew-resize`}],[`right`,{top:8,bottom:8,right:0,width:5,cursor:`ew-resize`}],[`topleft`,{top:0,left:0,width:10,height:10,cursor:`nwse-resize`}],[`topright`,{top:0,right:0,width:10,height:10,cursor:`nesw-resize`}],[`bottomleft`,{bottom:0,left:0,width:10,height:10,cursor:`nesw-resize`}],[`bottomright`,{bottom:0,right:0,width:10,height:10,cursor:`nwse-resize`}]];function he(){return(0,E.jsx)(E.Fragment,{children:me.map(([e,t])=>(0,E.jsx)(`div`,{onMouseDown:t=>{t.preventDefault(),T.send({type:`window.resize`,payload:{direction:e}})},style:{position:`fixed`,zIndex:1e3,...t}},e))})}var O=`-ms-`,ge=`-moz-`,k=`-webkit-`,_e=`comm`,ve=`rule`,ye=`decl`,be=`@import`,A=`@namespace`,j=`@keyframes`,xe=`@layer`,Se=Math.abs,M=String.fromCharCode,Ce=Object.assign;function we(e,t){return F(e,0)^45?(((t<<2^F(e,0))<<2^F(e,1))<<2^F(e,2))<<2^F(e,3):0}function N(e){return e.trim()}function Te(e,t){return(e=t.exec(e))?e[0]:e}function P(e,t,n){return e.replace(t,n)}function Ee(e,t,n){return e.indexOf(t,n)}function F(e,t){return e.charCodeAt(t)|0}function De(e,t,n){return e.slice(t,n)}function Oe(e){return e.length}function ke(e){return e.length}function Ae(e,t){return t.push(e),e}function je(e,t){return e.map(t).join(``)}function Me(e,t){return e.filter(function(e){return!Te(e,t)})}var Ne=1,Pe=1,Fe=0,Ie=0,Le=0,Re=``;function ze(e,t,n,r,i,a,o,s){return{value:e,root:t,parent:n,type:r,props:i,children:a,line:Ne,column:Pe,length:o,return:``,siblings:s}}function Be(e,t){return Ce(ze(``,null,null,``,null,null,0,e.siblings),e,{length:-e.length},t)}function Ve(e){for(;e.root;)e=Be(e.root,{children:[e]});Ae(e,e.siblings)}function He(){return Le}function Ue(){return Le=Ie>0?F(Re,--Ie):0,Pe--,Le===10&&(Pe=1,Ne--),Le}function We(){return Le=Ie<Fe?F(Re,Ie++):0,Pe++,Le===10&&(Pe=1,Ne++),Le}function Ge(){return F(Re,Ie)}function Ke(){return Ie}function qe(e,t){return De(Re,e,t)}function Je(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Ye(e){return Ne=Pe=1,Fe=Oe(Re=e),Ie=0,[]}function Xe(e){return Re=``,e}function Ze(e){return N(qe(Ie-1,et(e===91?e+2:e===40?e+1:e)))}function Qe(e){for(;(Le=Ge())&&Le<33;)We();return Je(e)>2||Je(Le)>3?``:` `}function $e(e,t){for(;--t&&We()&&!(Le<48||Le>102||Le>57&&Le<65||Le>70&&Le<97););return qe(e,Ke()+(t<6&&Ge()==32&&We()==32))}function et(e){for(;We();)switch(Le){case e:return Ie;case 34:case 39:e!==34&&e!==39&&et(Le);break;case 40:e===41&&et(e);break;case 92:We()}return Ie}function tt(e,t){for(;We()&&e+Le!==57&&(e+Le!==84||Ge()!==47););return`/*`+qe(t,Ie-1)+`*`+M(e===47?e:We())}function nt(e){for(;!Je(Ge());)We();return qe(e,Ie)}function rt(e){return Xe(it(``,null,null,null,[``],e=Ye(e),0,[0],e))}function it(e,t,n,r,i,a,o,s,c){for(var l=0,u=0,d=o,f=0,p=0,m=0,h=1,g=1,_=1,v=0,y=``,b=i,x=a,S=r,C=y;g;)switch(m=v,v=We()){case 40:if(m!=108&&F(C,d-1)==58){Ee(C+=P(Ze(v),`&`,`&\f`),`&\f`,Se(l?s[l-1]:0))!=-1&&(_=-1);break}case 34:case 39:case 91:C+=Ze(v);break;case 9:case 10:case 13:case 32:C+=Qe(m);break;case 92:C+=$e(Ke()-1,7);continue;case 47:switch(Ge()){case 42:case 47:Ae(ot(tt(We(),Ke()),t,n,c),c),(Je(m||1)==5||Je(Ge()||1)==5)&&Oe(C)&&De(C,-1,void 0)!==` `&&(C+=` `);break;default:C+=`/`}break;case 123*h:s[l++]=Oe(C)*_;case 125*h:case 59:case 0:switch(v){case 0:case 125:g=0;case 59+u:_==-1&&(C=P(C,/\f/g,``)),p>0&&(Oe(C)-d||h===0&&m===47)&&Ae(p>32?st(C+`;`,r,n,d-1,c):st(P(C,` `,``)+`;`,r,n,d-2,c),c);break;case 59:C+=`;`;default:if(Ae(S=at(C,t,n,l,u,i,s,y,b=[],x=[],d,a),a),v===123){if(u===0)it(C,t,S,S,b,a,d,s,x);else{switch(f){case 99:if(F(C,3)===110)break;case 108:if(F(C,2)===97)break;default:u=0;case 100:case 109:case 115:}u?it(e,S,S,r&&Ae(at(e,S,S,0,0,i,s,y,i,b=[],d,x),x),i,x,d,s,r?b:x):it(C,S,S,S,[``],x,0,s,x)}}}l=u=p=0,h=_=1,y=C=``,d=o;break;case 58:d=1+Oe(C),p=m;default:if(h<1){if(v==123)--h;else if(v==125&&h++==0&&Ue()==125)continue}switch(C+=M(v),v*h){case 38:_=u>0?1:(C+=`\f`,-1);break;case 44:s[l++]=(Oe(C)-1)*_,_=1;break;case 64:Ge()===45&&(C+=Ze(We())),f=Ge(),u=d=Oe(y=C+=nt(Ke())),v++;break;case 45:m===45&&Oe(C)==2&&(h=0)}}return a}function at(e,t,n,r,i,a,o,s,c,l,u,d){for(var f=i-1,p=i===0?a:[``],m=ke(p),h=0,g=0,_=0;h<r;++h)for(var v=0,y=De(e,f+1,f=Se(g=o[h])),b=e;v<m;++v)(b=N(g>0?p[v]+` `+y:P(y,/&\f/g,p[v])))&&(c[_++]=b);return ze(e,t,n,i===0?ve:s,c,l,u,d)}function ot(e,t,n,r){return ze(e,t,n,_e,M(He()),De(e,2,-2),0,r)}function st(e,t,n,r,i){return ze(e,t,n,ye,De(e,0,r),De(e,r+1,-1),r,i)}function ct(e,t,n){switch(we(e,t)){case 5103:return k+`print-`+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return k+e+e;case 4855:return k+e.replace(`add`,`source-over`).replace(`substract`,`source-out`).replace(`intersect`,`source-in`).replace(`exclude`,`xor`)+e;case 4789:return ge+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return k+e+ge+e+O+e+e;case 5936:switch(F(e,t+11)){case 114:return k+e+O+P(e,/[svh]\w+-[tblr]{2}/,`tb`)+e;case 108:return k+e+O+P(e,/[svh]\w+-[tblr]{2}/,`tb-rl`)+e;case 45:return k+e+O+P(e,/[svh]\w+-[tblr]{2}/,`lr`)+e}case 6828:case 4268:case 2903:return k+e+O+e+e;case 6165:return k+e+O+`flex-`+e+e;case 5187:return k+e+P(e,/(\w+).+(:[^]+)/,k+`box-$1$2`+O+`flex-$1$2`)+e;case 5443:return k+e+O+`flex-item-`+P(e,/flex-|-self/g,``)+(Te(e,/flex-|baseline/)?``:O+`grid-row-`+P(e,/flex-|-self/g,``))+e;case 4675:return k+e+O+`flex-line-pack`+P(e,/align-content|flex-|-self/g,``)+e;case 5548:return k+e+O+P(e,`shrink`,`negative`)+e;case 5292:return k+e+O+P(e,`basis`,`preferred-size`)+e;case 6060:return k+`box-`+P(e,`-grow`,``)+k+e+O+P(e,`grow`,`positive`)+e;case 4554:return k+P(e,/([^-])(transform)/g,`$1`+k+`$2`)+e;case 6187:return P(P(P(e,/(zoom-|grab)/,k+`$1`),/(image-set)/,k+`$1`),e,``)+e;case 5495:case 3959:return P(e,/(image-set\([^]*)/,k+"$1$`$1");case 4968:return P(P(e,/(.+:)(flex-)?(.*)/,k+`box-pack:$3`+O+`flex-pack:$3`),/space-between/,`justify`)+k+e+e;case 4200:if(!Te(e,/flex-|baseline/))return O+`grid-column-align`+De(e,t)+e;break;case 2592:case 3360:return O+P(e,`template-`,``)+e;case 4384:case 3616:return n&&n.some(function(e,n){return t=n,Te(e.props,/grid-\w+-end/)})?~Ee(e+(n=n[t].value),`span`,0)?e:O+P(e,`-start`,``)+e+O+`grid-row-span:`+(~Ee(n,`span`,0)?Te(n,/\d+/):+Te(n,/\d+/)-Te(e,/\d+/))+`;`:O+P(e,`-start`,``)+e;case 4896:case 4128:return n&&n.some(function(e){return Te(e.props,/grid-\w+-start/)})?e:O+P(P(e,`-end`,`-span`),`span `,``)+e;case 4095:case 3583:case 4068:case 2532:return P(e,/(.+)-inline(.+)/,k+`$1$2`)+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(Oe(e)-1-t>6)switch(F(e,t+1)){case 109:if(F(e,t+4)!==45)break;case 102:return P(e,/(.+:)(.+)-([^]+)/,`$1`+k+`$2-$3$1`+ge+(F(e,t+3)==108?`$3`:`$2-$3`))+e;case 115:return~Ee(e,`stretch`,0)?ct(P(e,`stretch`,`fill-available`),t,n)+e:e}break;case 5152:case 5920:return P(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(t,n,r,i,a,o,s){return O+n+`:`+r+s+(i?O+n+`-span:`+(a?o:+o-r)+s:``)+e});case 4949:if(F(e,t+6)===121)return P(e,`:`,`:`+k)+e;break;case 6444:switch(F(e,F(e,14)===45?18:11)){case 120:return P(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,`$1`+k+(F(e,14)===45?`inline-`:``)+`box$3$1`+k+`$2$3$1`+O+`$2box$3`)+e;case 100:return P(e,`:`,`:`+O)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return P(e,`scroll-`,`scroll-snap-`)+e}return e}function lt(e,t){for(var n=``,r=0;r<e.length;r++)n+=t(e[r],r,e,t)||``;return n}function ut(e,t,n,r){switch(e.type){case xe:if(e.children.length)break;case be:case A:case ye:return e.return=e.return||e.value;case _e:return``;case j:return e.return=e.value+`{`+lt(e.children,r)+`}`;case ve:if(!Oe(e.value=e.props.join(`,`)))return``}return Oe(n=lt(e.children,r))?e.return=e.value+`{`+n+`}`:``}function dt(e){var t=ke(e);return function(n,r,i,a){for(var o=``,s=0;s<t;s++)o+=e[s](n,r,i,a)||``;return o}}function ft(e){return function(t){t.root||(t=t.return)&&e(t)}}function pt(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case ye:e.return=ct(e.value,e.length,n);return;case j:return lt([Be(e,{value:P(e.value,`@`,`@`+k)})],r);case ve:if(e.length)return je(n=e.props,function(t){switch(Te(t,r=/(::plac\w+|:read-\w+)/)){case`:read-only`:case`:read-write`:Ve(Be(e,{props:[P(t,/:(read-\w+)/,`:`+ge+`$1`)]})),Ve(Be(e,{props:[t]})),Ce(e,{props:Me(n,r)});break;case`::placeholder`:Ve(Be(e,{props:[P(t,/:(plac\w+)/,`:`+k+`input-$1`)]})),Ve(Be(e,{props:[P(t,/:(plac\w+)/,`:`+ge+`$1`)]})),Ve(Be(e,{props:[P(t,/:(plac\w+)/,O+`input-$1`)]})),Ve(Be(e,{props:[t]})),Ce(e,{props:Me(n,r)})}return``})}}function mt(e,...t){return Error(`An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#${e} for more information.${t.length>0?` Args: ${t.join(`, `)}`:``}`)}var ht=typeof process<`u`&&({}.REACT_APP_SC_ATTR||{}.SC_ATTR)||`data-styled`,gt=`active`,_t=`data-styled-version`,vt=`6.6.0`,yt=`/*!sc*/
`,bt=typeof window<`u`&&typeof document<`u`;if(!_.createContext)throw mt(19);function xt(e){if(typeof process<`u`){let t={}[e];if(t!==void 0&&t!==``)return t!==`false`}}var St=!!(typeof SC_DISABLE_SPEEDY==`boolean`?SC_DISABLE_SPEEDY:xt(`REACT_APP_SC_DISABLE_SPEEDY`)??xt(`SC_DISABLE_SPEEDY`)??(typeof process<`u`&&!1)),Ct=`sc-keyframes-`,wt=new Map,Tt=new Map,Et=1,Dt=e=>{if(wt.has(e))return wt.get(e);for(;Tt.has(Et);)Et++;let t=Et++;return wt.set(e,t),Tt.set(t,e),t},Ot=e=>Tt.get(e),kt=(e,t)=>{Et=t+1,wt.set(e,t),Tt.set(t,e)},At=Object.freeze([]),jt=Object.freeze({});function Mt(e,t,n=jt){return e.theme!==n.theme&&e.theme||t||n.theme}var Nt=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Pt=/(^-|-$)/g;function Ft(e){return e.replace(Nt,`-`).replace(Pt,``)}var It=/(a)(d)/gi,Lt=e=>String.fromCharCode(e+(e>25?39:97));function Rt(e){let t,n=``;for(t=Math.abs(e);t>52;t=t/52|0)n=Lt(t%52)+n;return(Lt(t%52)+n).replace(It,`$1-$2`)}var zt=5381,Bt=(e,t)=>{let n=t.length;for(;n;)e=33*e^t.charCodeAt(--n);return e},Vt=e=>Bt(zt,e);function Ht(e){return Rt(Vt(e)>>>0)}function Ut(e){return e.displayName||e.name||`Component`}function Wt(e){return typeof e==`string`&&!0}function Gt(e){return Wt(e)?`styled.${e}`:`Styled(${Ut(e)})`}var Kt=Symbol.for(`react.memo`),qt=Symbol.for(`react.forward_ref`),Jt={contextType:!0,defaultProps:!0,displayName:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,propTypes:!0,type:!0},I={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},Yt={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Xt={[qt]:{$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},[Kt]:Yt};function Zt(e){return(`type`in(t=e)&&t.type.$$typeof)===Kt?Yt:`$$typeof`in e?Xt[e.$$typeof]:Jt;var t}var Qt=Object.defineProperty,$t=Object.getOwnPropertyNames,en=Object.getOwnPropertySymbols,tn=Object.getOwnPropertyDescriptor,nn=Object.getPrototypeOf,rn=Object.prototype;function an(e,t,n){if(typeof t!=`string`){let r=nn(t);r&&r!==rn&&an(e,r,n);let i=$t(t).concat(en(t)),a=Zt(e),o=Zt(t);for(let r=0;r<i.length;++r){let s=i[r];if(!(s in I||n&&n[s]||o&&s in o||a&&s in a)){let n=tn(t,s);try{Qt(e,s,n)}catch{}}}}return e}function on(e){return typeof e==`function`}var sn=Symbol.for(`react.forward_ref`);function cn(e){return e!=null&&(typeof e==`object`||typeof e==`function`)&&e.$$typeof===sn&&`styledComponentId`in e}function ln(e,t){return e&&t?e+` `+t:e||t||``}function un(e,t){return e.join(t||``)}function dn(e){return typeof e==`object`&&!!e&&e.constructor.name===Object.name&&!(`props`in e&&e.$$typeof)}function fn(e,t,n=!1){if(!n&&!dn(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(let n=0;n<t.length;n++)e[n]=fn(e[n],t[n]);else if(dn(t))for(let n in t)e[n]=fn(e[n],t[n]);return e}function pn(e,t){Object.defineProperty(e,"toString",{value:t})}var mn=class{constructor(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e,this._cGroup=0,this._cIndex=0}indexOfGroup(e){if(e===this._cGroup)return this._cIndex;let t=this._cIndex;if(e>this._cGroup)for(let n=this._cGroup;n<e;n++)t+=this.groupSizes[n];else for(let n=this._cGroup-1;n>=e;n--)t-=this.groupSizes[n];return this._cGroup=e,this._cIndex=t,t}insertRules(e,t){if(e>=this.groupSizes.length){let t=this.groupSizes,n=t.length,r=n;for(;e>=r;)if(r<<=1,r<0)throw mt(16,`${e}`);this.groupSizes=new Uint32Array(r),this.groupSizes.set(t),this.length=r;for(let e=n;e<r;e++)this.groupSizes[e]=0}let n=this.indexOfGroup(e+1),r=0;for(let i=0,a=t.length;i<a;i++)this.tag.insertRule(n,t[i])&&(this.groupSizes[e]++,n++,r++);r>0&&this._cGroup>e&&(this._cIndex+=r)}clearGroup(e){if(e<this.length){let t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(let e=n;e<r;e++)this.tag.deleteRule(n);t>0&&this._cGroup>e&&(this._cIndex-=t)}}getGroup(e){let t=``;if(e>=this.length||this.groupSizes[e]===0)return t;let n=this.groupSizes[e],r=this.indexOfGroup(e),i=r+n;for(let e=r;e<i;e++)t+=this.tag.getRule(e)+yt;return t}},hn=`style[${ht}][${_t}="${vt}"]`,gn=RegExp(`^${ht}\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)`),_n=e=>typeof ShadowRoot<`u`&&e instanceof ShadowRoot||`host`in e&&e.nodeType===11,vn=e=>{if(!e)return document;if(_n(e))return e;if(`getRootNode`in e){let t=e.getRootNode();if(_n(t))return t}return document},yn=(e,t,n)=>{let r=n.split(`,`),i;for(let n=0,a=r.length;n<a;n++)(i=r[n])&&e.registerName(t,i)},bn=(e,t)=>{let n=(t.textContent??``).split(yt),r=[];for(let t=0,i=n.length;t<i;t++){let i=n[t].trim();if(!i)continue;let a=i.match(gn);if(a){let t=0|parseInt(a[1],10),n=a[2];t!==0&&(kt(n,t),yn(e,n,a[3]),e.getTag().insertRules(t,r)),r.length=0}else r.push(i)}},xn=e=>{let t=vn(e.options.target).querySelectorAll(hn);for(let n=0,r=t.length;n<r;n++){let r=t[n];r&&r.getAttribute(ht)!==gt&&(bn(e,r),r.parentNode&&r.parentNode.removeChild(r))}},Sn=!1;function Cn(){if(!1!==Sn)return Sn;if(typeof document<`u`){let e=document.head.querySelector(`meta[property="csp-nonce"]`);if(e)return Sn=e.nonce||e.getAttribute(`content`)||void 0;let t=document.head.querySelector(`meta[name="sc-nonce"]`);if(t)return Sn=t.getAttribute(`content`)||void 0}return Sn=typeof __webpack_nonce__<`u`?__webpack_nonce__:void 0}var wn=(e,t)=>{if(typeof document>`u`)throw mt(20);let n=document.head,r=e||n,i=document.createElement(`style`),a=(e=>{let t=Array.from(e.querySelectorAll(`style[${ht}]`));return t[t.length-1]})(r),o=a===void 0?null:a.nextSibling;i.setAttribute(ht,gt),i.setAttribute(_t,vt);let s=t||Cn();return s&&i.setAttribute(`nonce`,s),r.insertBefore(i,o),i},Tn=class{constructor(e,t){this.element=wn(e,t),this.element.appendChild(document.createTextNode(``)),this.sheet=(e=>{if(e.sheet)return e.sheet;let t=e.getRootNode().styleSheets??document.styleSheets;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(r.ownerNode===e)return r}throw mt(17)})(this.element),this.length=0}insertRule(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch{return!1}}deleteRule(e){this.sheet.deleteRule(e),this.length--}getRule(e){let t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:``}},En=class{constructor(e,t){this.element=wn(e,t),this.nodes=this.element.childNodes,this.length=0}insertRule(e,t){if(e<=this.length&&e>=0){let n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1}deleteRule(e){this.element.removeChild(this.nodes[e]),this.length--}getRule(e){return e<this.length?this.nodes[e].textContent:``}},Dn=bt,On={isServer:!bt,useCSSOMInjection:!St},kn=class e{static registerId(e){return Dt(e)}constructor(e=jt,t={},n){this.options=Object.assign(Object.assign({},On),e),this.gs=t,this.keyframeIds=new Set,this.names=new Map(n),this.server=!!e.isServer,!this.server&&bt&&Dn&&(Dn=!1,xn(this)),pn(this,()=>(e=>{let t=e.getTag(),{length:n}=t,r=``;for(let i=0;i<n;i++){let n=Ot(i);if(n===void 0)continue;let a=e.names.get(n);if(a===void 0||!a.size)continue;let o=t.getGroup(i);if(o.length===0)continue;let s=ht+`.g`+i+`[id="`+n+`"]`,c=``;for(let e of a)e.length>0&&(c+=e+`,`);r+=o+s+`{content:"`+c+`"}/*!sc*/
`}return r})(this))}rehydrate(){!this.server&&bt&&xn(this)}reconstructWithOptions(t,n=!0){let r=new e(Object.assign(Object.assign({},this.options),t),this.gs,n&&this.names||void 0);return r.keyframeIds=new Set(this.keyframeIds),!this.server&&bt&&t.target!==this.options.target&&vn(this.options.target)!==vn(t.target)&&xn(r),r}allocateGSInstance(e){return this.gs[e]=(this.gs[e]||0)+1}getTag(){return this.tag||=(e=(({useCSSOMInjection:e,target:t,nonce:n})=>e?new Tn(t,n):new En(t,n))(this.options),new mn(e));var e}hasNameForId(e,t){var n;return(n=this.names.get(e)?.has(t))!=null&&n}registerName(e,t){Dt(e),e.startsWith(Ct)&&this.keyframeIds.add(e);let n=this.names.get(e);n?n.add(t):this.names.set(e,new Set([t]))}insertRules(e,t,n){this.registerName(e,t),this.getTag().insertRules(Dt(e),n)}clearNames(e){this.names.has(e)&&this.names.get(e).clear()}clearRules(e){this.getTag().clearGroup(Dt(e)),this.clearNames(e)}clearTag(){this.tag=void 0}},An=new WeakSet,jn={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexShrink:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function Mn(e,t){return t==null||typeof t==`boolean`||t===``?``:typeof t!=`number`||t===0||e in jn||e.startsWith(`--`)?String(t).trim():t+`px`}var Nn=47;function Pn(e){if(e.charCodeAt(0)===45&&e.charCodeAt(1)===45)return e;let t=``;for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);t+=r>=65&&r<=90?`-`+String.fromCharCode(r+32):e[n]}return t.startsWith(`ms-`)?`-`+t:t}var Fn=Symbol.for(`sc-keyframes`);function In(e){return typeof e==`object`&&!!e&&Fn in e}function Ln(e){return on(e)&&!(e.prototype&&e.prototype.isReactComponent)}var Rn=e=>e==null||!1===e||e===``,zn=Symbol.for(`react.client.reference`);function Bn(e){return e.$$typeof===zn}function Vn(e,t){for(let n in e){let r=e[n];e.hasOwnProperty(n)&&!Rn(r)&&(Array.isArray(r)&&An.has(r)||on(r)?t.push(Pn(n)+`:`,r,`;`):dn(r)?(t.push(n+` {`),Vn(r,t),t.push(`}`)):t.push(Pn(n)+`: `+Mn(n,r)+`;`))}}function Hn(e,t,n,r,i=[]){if(Rn(e))return i;let a=typeof e;if(a===`string`)return i.push(e),i;if(a===`function`)return Bn(e)?i:Ln(e)&&t?Hn(e(t),t,n,r,i):(i.push(e),i);if(Array.isArray(e)){for(let a=0;a<e.length;a++)Hn(e[a],t,n,r,i);return i}return cn(e)?(i.push(`.${e.styledComponentId}`),i):In(e)?(n?(e.inject(n,r),i.push(e.getName(r))):i.push(e),i):Bn(e)?i:dn(e)&&e.toString===Object.prototype.toString?(Vn(e,i),i):(i.push(e.toString()),i)}var Un=Vt(vt),Wn=class{constructor(e,t,n){this.rules=e,this.componentId=t,this.baseHash=Bt(Un,t),this.baseStyle=n,kn.registerId(t)}generateAndInjectStyles(e,t,n){let r=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n):``;{let i=``;for(let r=0;r<this.rules.length;r++){let a=this.rules[r];if(typeof a==`string`)i+=a;else if(a){if(Ln(a)){let r=a(e);typeof r==`string`?i+=r:r!=null&&!1!==r&&(i+=un(Hn(r,e,t,n)))}else i+=un(Hn(a,e,t,n))}}if(i){this.dynamicNameCache||=new Map;let e=n.hash?n.hash+i:i,a=this.dynamicNameCache.get(e);if(!a){if(a=Rt(Bt(Bt(this.baseHash,n.hash),i)>>>0),this.dynamicNameCache.size>=200){let e=this.dynamicNameCache.keys().next().value;e!==void 0&&this.dynamicNameCache.delete(e)}this.dynamicNameCache.set(e,a)}if(!t.hasNameForId(this.componentId,a)){let e=n(i,`.`+a,void 0,this.componentId);t.insertRules(this.componentId,a,e)}r=ln(r,a)}}return r}},Gn=/&/g;function Kn(e,t){let n=0;for(;--t>=0&&e.charCodeAt(t)===92;)n++;return!(1&~n)}function qn(e){let t=e.length,n=``,r=0,i=0,a=0,o=!1,s=!1;for(let c=0;c<t;c++){let l=e.charCodeAt(c);if(a!==0||o||l!==Nn||e.charCodeAt(c+1)!==42){if(o)l===42&&e.charCodeAt(c+1)===Nn&&(o=!1,c++);else if(l!==34&&l!==39||Kn(e,c)){if(a===0){if(l===123)i++;else if(l===125){if(i--,i<0){s=!0;let n=c+1;for(;n<t;){let t=e.charCodeAt(n);if(t===59||t===10)break;n++}n<t&&e.charCodeAt(n)===59&&n++,i=0,c=n-1,r=n;continue}i===0&&(n+=e.substring(r,c+1),r=c+1)}else l===59&&i===0&&(n+=e.substring(r,c+1),r=c+1)}}else a===0?a=l:a===l&&(a=0)}else o=!0,c++}return s||i!==0||a!==0?(r<t&&i===0&&a===0&&(n+=e.substring(r)),n):e}function Jn(e,t){let n=t+` `,r=`,`+n;for(let i=0;i<e.length;i++){let a=e[i];if(a.type===`rule`){a.value=(n+a.value).replaceAll(`,`,r);let e=a.props,t=[];for(let r=0;r<e.length;r++)t[r]=n+e[r];a.props=t}Array.isArray(a.children)&&a.type!==`@keyframes`&&Jn(a.children,t)}return e}function Yn({options:e=jt,plugins:t=At}=jt){let n,r,i,a=(e,t,i)=>i.startsWith(r)&&i.endsWith(r)&&i.replaceAll(r,``).length>0?`.${n}`:e,o=t.slice();o.push(e=>{e.type===`rule`&&e.value.includes(`&`)&&(i||=RegExp(`\\${r}\\b`,`g`),e.props[0]=e.props[0].replace(Gn,r).replace(i,a))}),e.prefix&&o.push(pt),o.push(ut);let s=[],c=dt(o.concat(ft(e=>s.push(e)))),l=(t,a=``,o=``,l=`&`)=>{n=l,r=a,i=void 0;let u=function(e){let t=e.indexOf(`//`)!==-1,n=e.indexOf(`}`)!==-1;if(!t&&!n)return e;if(!t)return qn(e);let r=e.length,i=``,a=0,o=0,s=0,c=0,l=0,u=!1;for(;o<r;){let t=e.charCodeAt(o);if(t!==34&&t!==39||Kn(e,o)){if(s===0){if(t===Nn&&o+1<r&&e.charCodeAt(o+1)===42){for(o+=2;o+1<r&&(e.charCodeAt(o)!==42||e.charCodeAt(o+1)!==Nn);)o++;o+=2}else if(t!==40){if(t!==41){if(c>0)o++;else if(t===42&&o+1<r&&e.charCodeAt(o+1)===Nn)i+=e.substring(a,o),o+=2,a=o,u=!0;else if(t===Nn&&o+1<r&&e.charCodeAt(o+1)===Nn){for(i+=e.substring(a,o);o<r&&e.charCodeAt(o)!==10;)o++;a=o,u=!0}else t===123?l++:t===125&&l--,o++}else c>0&&c--,o++}else c++,o++}else o++}else s===0?s=t:s===t&&(s=0),o++}return u?(a<r&&(i+=e.substring(a)),l===0?i:qn(i)):l===0?e:qn(e)}(t),d=rt(o||a?o+` `+a+` { `+u+` }`:u);return e.namespace&&(d=Jn(d,e.namespace)),s=[],lt(d,c),s},u=e,d=zt;for(let e=0;e<t.length;e++)t[e].name||mt(15),d=Bt(d,t[e].name);return u!=null&&u.namespace&&(d=Bt(d,u.namespace)),u!=null&&u.prefix&&(d=Bt(d,`p`)),l.hash=d===zt?``:d.toString(),l}var Xn=new kn,Zn=Yn(),Qn=_.createContext({shouldForwardProp:void 0,styleSheet:Xn,stylis:Zn,stylisPlugins:void 0});Qn.Consumer;function $n(){return _.useContext(Qn)}var er=_.createContext(void 0);er.Consumer;var tr={};function nr(e,t){let n=typeof e==`string`?Ft(e):`sc`;tr[n]=(tr[n]||0)+1;let r=n+`-`+Ht(vt+n+tr[n]);return t?t+`-`+r:r}function rr(e,t,n){let r=cn(e),i=e,a=!Wt(e),{attrs:o=At,componentId:s=nr(t.displayName,t.parentComponentId),displayName:c=Gt(e)}=t,l=t.displayName&&t.componentId?Ft(t.displayName)+`-`+t.componentId:t.componentId||s,u=r&&i.attrs?i.attrs.concat(o).filter(Boolean):o,{shouldForwardProp:d}=t;if(r&&i.shouldForwardProp){let e=i.shouldForwardProp;if(t.shouldForwardProp){let n=t.shouldForwardProp;d=(t,r)=>e(t,r)&&n(t,r)}else d=e}let f=new Wn(n,l,r?i.componentStyle:void 0);function p(e,t){return function(e,t,n){let{attrs:r,componentStyle:i,defaultProps:a,foldedComponentIds:o,styledComponentId:s,target:c}=e,l=_.useContext(er),u=$n(),d=e.shouldForwardProp||u.shouldForwardProp,f=Mt(t,l,a)||jt,[p,m]=function(e,t,n){let r=Object.assign(Object.assign({},t),{className:void 0,theme:n}),i=null,a=e.length>1;for(let t=0;t<e.length;t++){let n=e[t],o=on(n)?n(a?Object.assign({},r):r):n;for(let e in o)e===`className`?r.className=ln(r.className,o[e]):e===`style`?r.style=Object.assign(Object.assign({},r.style),o[e]):o[e]===void 0?e in r&&(r[e]!==void 0&&(i||=[]).push(e),r[e]=void 0):r[e]=o[e]}return`className`in t&&typeof t.className==`string`&&(r.className=ln(r.className,t.className)),[r,i]}(r,t,f),h=i.generateAndInjectStyles(p,u.styleSheet,u.stylis),g=p.as||c,v=Wt(g),y=function(e,t,n,r,i,a){let o={};for(let s in e)s[0]===`$`||s===`as`||s===`theme`&&e.theme===n||(s===`forwardedAs`?e.forwardedAs!==void 0&&(o.as=e.forwardedAs):e[s]===void 0?s===`className`||i||a!==null&&a.indexOf(s)!==-1||r&&!r(s,t)||(o[s]=void 0):r&&!r(s,t)||(o[s]=e[s]));return o}(p,g,f,d,v,m),b=ln(o,s);return h&&(b+=` `+h),p.className&&(b+=` `+p.className),y[v&&g.includes(`-`)?`class`:`className`]=b,n&&(y.ref=n),(0,_.createElement)(g,y)}(m,e,t)}p.displayName=c;let m=_.forwardRef(p);return m.attrs=u,m.componentStyle=f,m.displayName=c,m.shouldForwardProp=d,m.foldedComponentIds=r?ln(i.foldedComponentIds,i.styledComponentId):``,m.styledComponentId=l,m.target=r?i.target:e,Object.defineProperty(m,"defaultProps",{get(){return this._foldedDefaultProps},set(e){this._foldedDefaultProps=r?function(e,...t){for(let n of t)fn(e,n,!0);return e}({},i.defaultProps,e):e}}),pn(m,()=>`.${m.styledComponentId}`),a&&an(m,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),m}var ir=new Set(`a.abbr.address.area.article.aside.audio.b.bdi.bdo.blockquote.body.button.br.canvas.caption.cite.code.col.colgroup.data.datalist.dd.del.details.dfn.dialog.div.dl.dt.em.embed.fieldset.figcaption.figure.footer.form.h1.h2.h3.h4.h5.h6.header.hgroup.hr.html.i.iframe.img.input.ins.kbd.label.legend.li.main.map.mark.menu.meter.nav.object.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.slot.small.span.strong.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.u.ul.var.video.wbr.circle.clipPath.defs.ellipse.feBlend.feColorMatrix.feComponentTransfer.feComposite.feConvolveMatrix.feDiffuseLighting.feDisplacementMap.feDistantLight.feDropShadow.feFlood.feFuncA.feFuncB.feFuncG.feFuncR.feGaussianBlur.feImage.feMerge.feMergeNode.feMorphology.feOffset.fePointLight.feSpecularLighting.feSpotLight.feTile.feTurbulence.filter.foreignObject.g.image.line.linearGradient.marker.mask.path.pattern.polygon.polyline.radialGradient.rect.stop.svg.switch.symbol.text.textPath.tspan.use`.split(`.`));function ar(e,t){let n=[e[0]];for(let r=0,i=t.length;r<i;r+=1)n.push(t[r],e[r+1]);return n}var or=e=>(An.add(e),e);function sr(e,...t){if(on(e)||dn(e))return or(Hn(ar(At,[e,...t])));let n=e;return t.length===0&&n.length===1&&typeof n[0]==`string`?Hn(n):or(Hn(ar(n,t)))}function cr(e,t,n=jt){if(!t)throw mt(1,t);let r=(r,...i)=>e(t,n,sr(r,...i));return r.attrs=r=>cr(e,t,Object.assign(Object.assign({},n),{attrs:Array.prototype.concat(n.attrs,r).filter(Boolean)})),r.withConfig=r=>cr(e,t,Object.assign(Object.assign({},n),r)),r}var lr=e=>cr(rr,e),L=lr;ir.forEach(e=>{L[e]=lr(e)});var ur,dr=class{constructor(e,t){this[ur]=!0,this.inject=(e,t=Zn)=>{let n=this.getName(t);if(!e.hasNameForId(this.id,n)){let r=t(this.rules,n,`@keyframes`);e.insertRules(this.id,n,r)}},this.name=e,this.id=Ct+e,this.rules=t,Dt(this.id),pn(this,()=>{throw mt(12,String(this.name))})}getName(e=Zn){return e.hash?this.name+Rt(e.hash>>>0):this.name}};function fr(e,...t){let n=un(sr(e,...t));return new dr(Ht(n),n)}ur=Fn,`${ht}`,`${ht}`,`${ht}`;async function pr(){return T.available?await T.request(`app.info`):{version:`dev`,platform:`web`,rounded:!1,debug:!1}}async function mr(){return T.available?await T.request(`app.startup`):{supported:!1,enabled:!1}}async function hr(e){return await T.request(`app.setStartup`,{enabled:e})}async function gr(e){T.available?await T.request(`system.openUrl`,{url:e}):window.open(e,`_blank`,`noreferrer`)}var _r=e=>({width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:1.8,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":!0});function vr({size:e=18}){return(0,E.jsxs)(`svg`,{..._r(e),children:[(0,E.jsx)(`path`,{d:`M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z`}),(0,E.jsx)(`path`,{d:`M14 3v5h5M8.5 13h7M8.5 17h4`})]})}function yr({size:e=18}){return(0,E.jsxs)(`svg`,{..._r(e),children:[(0,E.jsx)(`path`,{d:`M4 7h16M4 17h16`}),(0,E.jsx)(`circle`,{cx:`9`,cy:`7`,r:`2`}),(0,E.jsx)(`circle`,{cx:`15`,cy:`17`,r:`2`})]})}function br({size:e=16}){return(0,E.jsxs)(`svg`,{..._r(e),children:[(0,E.jsx)(`circle`,{cx:`11`,cy:`11`,r:`6.5`}),(0,E.jsx)(`path`,{d:`m16 16 4.5 4.5`})]})}function xr({size:e=16}){return(0,E.jsx)(`svg`,{..._r(e),children:(0,E.jsx)(`path`,{d:`M6 6l12 12M18 6 6 18`})})}function Sr({size:e=16}){return(0,E.jsx)(`svg`,{..._r(e),children:(0,E.jsx)(`path`,{d:`M4 7h16M9 7V5h6v2M6.5 7l1 13h9l1-13M10 11v5M14 11v5`})})}function Cr({size:e=16}){return(0,E.jsx)(`svg`,{..._r(e),children:(0,E.jsx)(`path`,{d:`M3 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z`})})}function wr({size:e=16}){return(0,E.jsx)(`svg`,{..._r(e),children:(0,E.jsx)(`path`,{d:`M12 5v14M6 13l6 6 6-6`})})}function Tr({size:e=18}){return(0,E.jsxs)(`svg`,{..._r(e),children:[(0,E.jsx)(`circle`,{cx:`9`,cy:`8`,r:`3.2`}),(0,E.jsx)(`path`,{d:`M3 19c0-3.3 2.7-5.6 6-5.6s6 2.3 6 5.6`}),(0,E.jsx)(`path`,{d:`M15.8 5.2a3.2 3.2 0 0 1 0 5.9M17.4 13.8c2.1.6 3.6 2.3 3.6 4.4`})]})}function Er({size:e=16}){return(0,E.jsxs)(`svg`,{..._r(e),children:[(0,E.jsx)(`path`,{d:`M12 3v11M8 10l4 4 4-4`}),(0,E.jsx)(`path`,{d:`M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2`})]})}function Dr({size:e=18}){return(0,E.jsxs)(`svg`,{..._r(e),children:[(0,E.jsx)(`circle`,{cx:`12`,cy:`8`,r:`3.6`}),(0,E.jsx)(`path`,{d:`M4.5 20c0-3.9 3.4-6.6 7.5-6.6s7.5 2.7 7.5 6.6`})]})}function Or({size:e=18}){return(0,E.jsxs)(`svg`,{..._r(e),children:[(0,E.jsx)(`path`,{d:`M12 3l7 2.8v5.4c0 4.3-2.9 7.6-7 9.8-4.1-2.2-7-5.5-7-9.8V5.8z`}),(0,E.jsx)(`path`,{d:`m9.2 12.1 2 2 3.6-3.8`})]})}function kr({size:e=18}){return(0,E.jsxs)(`svg`,{..._r(e),children:[(0,E.jsx)(`circle`,{cx:`8`,cy:`8`,r:`3.4`}),(0,E.jsx)(`path`,{d:`m10.6 10.6 8 8M15.5 15.5l2-2M18 18l2-2`})]})}function Ar({size:e=16}){return(0,E.jsxs)(`svg`,{..._r(e),children:[(0,E.jsx)(`path`,{d:`M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6z`}),(0,E.jsx)(`circle`,{cx:`12`,cy:`12`,r:`2.6`})]})}function jr({size:e=16}){return(0,E.jsxs)(`svg`,{..._r(e),children:[(0,E.jsx)(`path`,{d:`M4 4l16 16`}),(0,E.jsx)(`path`,{d:`M9.9 5.2A10.7 10.7 0 0 1 12 5c6.1 0 9.5 7 9.5 7a16 16 0 0 1-3 3.6M6.2 7.3A16.6 16.6 0 0 0 2.5 12s3.4 7 9.5 7a10.4 10.4 0 0 0 4-.8`})]})}function Mr({size:e=14}){return(0,E.jsxs)(`svg`,{..._r(e),children:[(0,E.jsx)(`rect`,{x:`5`,y:`10`,width:`14`,height:`10`,rx:`2`}),(0,E.jsx)(`path`,{d:`M8 10V7a4 4 0 0 1 8 0v3`})]})}function Nr({size:e=14}){return(0,E.jsxs)(`svg`,{..._r(e),children:[(0,E.jsx)(`path`,{d:`M14 4h6v6`}),(0,E.jsx)(`path`,{d:`M20 4l-9 9`}),(0,E.jsx)(`path`,{d:`M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6`})]})}function Pr({size:e=18}){return(0,E.jsxs)(`svg`,{..._r(e),children:[(0,E.jsx)(`path`,{d:`M6 9a6 6 0 0 1 12 0c0 4 1.5 5.5 2 6H4c.5-.5 2-2 2-6z`}),(0,E.jsx)(`path`,{d:`M10 19a2 2 0 0 0 4 0`})]})}function Fr({size:e=12}){return(0,E.jsxs)(`svg`,{..._r(e),children:[(0,E.jsx)(`circle`,{cx:`12`,cy:`12`,r:`9`}),(0,E.jsx)(`path`,{d:`M12 7.5v5.5`}),(0,E.jsx)(`path`,{d:`M12 16.5h.01`})]})}var Ir=[{id:`logs`,label:`Log viewer`,icon:vr},{id:`instance`,label:`Instance`,icon:Tr},{id:`requests`,label:`Friend requests`,icon:Pr},{id:`operations`,label:`Operations`,icon:Or},{id:`account`,label:`Account`,icon:Dr},{id:`settings`,label:`Settings`,icon:yr}],Lr={id:`debug`,label:`Debug`,icon:Fr};function Rr({page:e,onNavigate:t,status:n,debug:r}){let i=D(),a=r?[...Ir,Lr]:Ir;return(0,E.jsxs)(zr,{children:[(0,E.jsx)(Br,{children:a.map(({id:n,label:r,icon:a})=>(0,E.jsxs)(Vr,{$active:e===n,onClick:()=>t(n),type:`button`,children:[(0,E.jsx)(a,{size:18}),(0,E.jsx)(`span`,{children:i(r)})]},n))}),(0,E.jsxs)(Hr,{children:[(0,E.jsx)(Ur,{children:i(`VRChat`)}),(0,E.jsxs)(Wr,{$active:n.running,children:[(0,E.jsx)(Gr,{$active:n.running}),n.running?i(`running`):i(`not running`)]})]})]})}var zr=L.aside`
    display: flex;
    flex-direction: column;
    gap: 22px;
    width: 218px;
    flex-shrink: 0;
    padding: 16px 14px 18px;
    background: rgba(8, 7, 15, 0.9);
    border-right: 1px solid var(--border-color);
`,Br=L.nav`
    display: flex;
    flex-direction: column;
    gap: 3px;
`,Vr=L.button`
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

    svg {
        color: ${({$active:e})=>e?`var(--accent-primary)`:`var(--text-muted)`};
    }

    &:hover {
        background: var(--bg-card-hover);
        border-color: var(--border-color);
        color: var(--text-primary);
    }

    &:focus-visible {
        outline: 2px solid var(--border-color-focus);
        outline-offset: 1px;
    }
`,Hr=L.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: auto;
    padding: 12px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`,Ur=L.span`
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
`,Wr=L.div`
    display: flex;
    align-items: center;
    gap: 7px;
    font-family: var(--font-mono);
    font-size: 12px;
    color: ${({$active:e})=>e?`var(--text-primary)`:`var(--text-muted)`};
`,Gr=L.span`
    width: 7px;
    height: 7px;
    flex-shrink: 0;
    border-radius: 50%;
    background: ${({$active:e})=>e?`var(--accent-primary)`:`var(--text-muted)`};
    box-shadow: ${({$active:e})=>e?`0 0 8px var(--accent-primary)`:`none`};
`;function Kr({size:e=20}){return(0,E.jsxs)(`svg`,{"aria-hidden":`true`,height:e,viewBox:`0 0 256 256`,width:e,children:[(0,E.jsx)(`defs`,{children:(0,E.jsxs)(`linearGradient`,{id:`brand-mark`,gradientUnits:`userSpaceOnUse`,x1:`8`,x2:`248`,y1:`8`,y2:`248`,children:[(0,E.jsx)(`stop`,{offset:`0`,stopColor:`#6366f1`}),(0,E.jsx)(`stop`,{offset:`1`,stopColor:`#a855f7`})]})}),(0,E.jsx)(`rect`,{fill:`url(#brand-mark)`,height:`240`,rx:`54`,width:`240`,x:`8`,y:`8`}),(0,E.jsx)(`circle`,{cx:`128`,cy:`98`,fill:`#f8fafc`,r:`40`}),(0,E.jsx)(`path`,{d:`M62 198c0-33.1 29.5-60 66-60s66 26.9 66 60z`,fill:`#f8fafc`}),(0,E.jsx)(`path`,{d:`M56 200 200 56`,stroke:`url(#brand-mark)`,strokeLinecap:`round`,strokeWidth:`18`})]})}function qr(){let e=D(),t=de(),n=fe();return(0,E.jsxs)(Jr,{children:[(0,E.jsxs)(Yr,{children:[(0,E.jsx)(Kr,{size:19}),(0,E.jsx)(`strong`,{children:e(`AntiBot`)})]}),(0,E.jsx)(Xr,{...n}),(0,E.jsxs)(Zr,{children:[(0,E.jsx)(Qr,{onClick:t.minimize,title:e(`Minimize`),type:`button`,children:(0,E.jsx)(`svg`,{"aria-hidden":`true`,viewBox:`0 0 10 10`,children:(0,E.jsx)(`path`,{d:`M2 5h6`})})}),(0,E.jsx)(Qr,{onClick:t.toggleMaximize,title:t.maximized?e(`Restore`):e(`Maximize`),type:`button`,children:t.maximized?(0,E.jsxs)(`svg`,{"aria-hidden":`true`,viewBox:`0 0 10 10`,children:[(0,E.jsx)(`rect`,{height:`6`,width:`6`,x:`3`,y:`1`}),(0,E.jsx)(`rect`,{height:`6`,width:`6`,x:`1`,y:`3`})]}):(0,E.jsx)(`svg`,{"aria-hidden":`true`,viewBox:`0 0 10 10`,children:(0,E.jsx)(`rect`,{height:`6`,width:`6`,x:`2`,y:`2`})})}),(0,E.jsx)($r,{onClick:t.close,title:e(`Close`),type:`button`,children:(0,E.jsx)(`svg`,{"aria-hidden":`true`,viewBox:`0 0 10 10`,children:(0,E.jsx)(`path`,{d:`m2 2 6 6M8 2 2 8`})})})]})]})}var Jr=L.header`
    display: flex;
    align-items: stretch;
    height: 38px;
    flex-shrink: 0;
    background: rgba(8, 7, 15, 0.96);
    border-bottom: 1px solid var(--border-color);
    user-select: none;
    -webkit-user-select: none;
`,Yr=L.div`
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
`,Xr=L.div`
    flex: 1;
    min-width: 24px;
`,Zr=L.div`
    display: flex;
    flex-shrink: 0;
`,Qr=L.button`
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
`,$r=L(Qr)`
    &:hover {
        background: #e81123;
        color: #fff;
    }
`,ei=T.available,ti={exists:!1,running:!1};async function ni(){return T.available?await T.request(`log.snapshot`):{...ti,lines:[]}}function ri(e){return T.on(t=>{t.type===`log.lines`&&e(t.data)})}async function ii(){T.available&&await T.request(`log.openFolder`)}async function ai(){return T.available?await T.request(`log.export`):{saved:!1,lines:0}}var oi=3e3;function si(){let[e,t]=(0,_.useState)(ti),[n,r]=(0,_.useState)([]),i=(0,_.useRef)(0),a=(0,_.useRef)(!1);return(0,_.useEffect)(()=>{let e=!1,n=ri(n=>{e||(a.current=!0,t({exists:n.exists??!1,running:n.running??!1}),r(e=>ci(e,n,i.current)))});return ni().then(n=>{e||(a.current||t({exists:n.exists??!1,running:n.running??!1}),r(e=>li(e,n.lines,i.current)))},()=>{}),()=>{e=!0,n()}},[]),{status:e,lines:n,clear:()=>{i.current=n.at(-1)?.id??i.current,r([])}}}function ci(e,t,n){let r=t.lines.filter(e=>e.id>n);if(t.reset)return r.slice(-3e3);let i=[...e,...r];return i.length>oi?i.slice(-3e3):i}function li(e,t,n){let r=e.at(-1)?.id??0,i=[...e,...t.filter(e=>e.id>r&&e.id>n)];return i.length>oi?i.slice(-3e3):i}var ui={state:`loggedOut`,storage:`none`,twoFactorMethods:[],systemStorage:!1,systemStorageName:``,tpmStorage:!1,helloStorage:!1,softwareStorage:!1,storageChosen:!1,accounts:[]};async function di(){return T.available?await T.request(`auth.state`):ui}async function fi(e,t){return await T.request(`auth.login`,{username:e,password:t},3e4)}async function pi(e,t){return await T.request(`auth.verify`,{method:e,code:t},3e4)}async function mi(e,t){return await T.request(`auth.unlock`,{password:e,dir:t},12e4)}async function hi(e){return await T.request(`auth.switch`,{dir:e},12e4)}async function gi(e){return await T.request(`auth.remove`,{dir:e},3e4)}async function _i(){return await T.request(`auth.signin.cancel`,void 0,15e3)}async function vi(e,t){return await T.request(`auth.storage.save`,{mode:e,password:t},3e4)}async function yi(){return await T.request(`auth.logout`,void 0,3e4)}async function bi(){return await T.request(`auth.device.start`,void 0,3e4)}async function xi(e){return await T.request(`auth.device.poll`,{deviceCode:e},3e4)}function Si(e){return T.on(t=>{t.type===`auth.changed`&&e(t.data)})}function Ci(){let[e,t]=(0,_.useState)(ui),[n,r]=(0,_.useState)(!1);return(0,_.useEffect)(()=>{let e=!1,n=Si(n=>{e||(t(n),r(!0))});return di().then(n=>{e||(t(n),r(!0))},()=>{e||r(!0)}),()=>{e=!0,n()}},[]),{auth:e,ready:n}}function wi({initial:e,ready:t=!1}){let[n,r]=(0,_.useState)(e??ui),[i,a]=(0,_.useState)(t),[o,s]=(0,_.useState)(``),[c,l]=(0,_.useState)(!1),[u,d]=(0,_.useState)(!1),[f,p]=(0,_.useState)(!1),[m,h]=(0,_.useState)(null),[g,v]=(0,_.useState)(``);(0,_.useEffect)(()=>{let e=!1,t=Si(t=>{e||(r(t),a(!0))});return di().then(t=>{e||(r(t),a(!0))},()=>{e||a(!0)}),()=>{e=!0,t()}},[]);let y=n.state===`loggedIn`;(0,_.useEffect)(()=>{y&&d(!1)},[y]);let b=async e=>{l(!0),s(``);try{return r(await e()),!0}catch(e){return s(e instanceof Error?e.message:String(e)),!1}finally{l(!1)}},x=n.accounts.length>0,S=u||!y&&n.state===`loggedOut`&&!x,C=S||n.state===`twoFactor`||n.state===`locked`&&!f,ee=async e=>{if(s(``),e.storage===`password`)v(``),h(e);else{l(!0);try{let t=await hi(e.dir);if(t.needsPassword){v(``),h(e);return}if(!t.ok||!t.auth){s(t.error??``);return}r(t.auth)}catch(e){s(e instanceof Error?e.message:String(e))}finally{l(!1)}}},w=async(e,t)=>{v(``),l(!0);try{r(await mi(t,e.dir)),h(null)}catch(e){v(e instanceof Error?e.message:String(e))}finally{l(!1)}},te=async e=>{s(``),l(!0);try{r(await gi(e.dir))}catch(e){s(e instanceof Error?e.message:String(e))}finally{l(!1)}},T=()=>{d(!1),s(``),_i().then(r,()=>{})};if(!i)return(0,E.jsx)(zi,{$wide:!0});let ne;return ne=n.state===`locked`&&!f?(0,E.jsx)(ki,{auth:n,busy:c,error:o,run:b,onBrowse:x?()=>p(!0):void 0}):n.state===`twoFactor`?(0,E.jsx)(Oi,{auth:n,busy:c,error:o,run:b,onCancel:x?T:void 0}):S?(0,E.jsx)(Di,{busy:c,error:o,onCancel:x?T:void 0,onSignedIn:e=>{r(e),d(!1)},run:b}):(0,E.jsxs)(E.Fragment,{children:[y&&(0,E.jsx)(Ai,{auth:n,busy:c,error:o,run:b}),(0,E.jsx)(Ti,{accounts:n.accounts,busy:c,onAdd:()=>{s(``),d(!0)},onRemove:e=>void te(e),onSwitch:e=>void ee(e),signedIn:y}),o&&(0,E.jsx)(da,{children:o})]}),(0,E.jsxs)(zi,{$wide:C,children:[ne,y&&(0,E.jsx)(Pi,{auth:n,busy:c,error:o,run:b},n.user?.id),m&&(0,E.jsx)(Ei,{account:m,busy:c,error:g,onCancel:()=>{h(null),v(``)},onUnlock:e=>void w(m,e)})]})}function Ti({accounts:e,busy:t,signedIn:n,onAdd:r,onSwitch:i,onRemove:a}){let o=D();return(0,E.jsxs)(Vi,{children:[(0,E.jsxs)($i,{children:[(0,E.jsx)(Tr,{size:20}),(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`h2`,{children:o(`Accounts`)}),(0,E.jsx)(`p`,{children:o(n?`Switch to another account; only one is signed in at a time.`:`Pick an account to sign in with.`)})]})]}),e.length>0&&(0,E.jsx)(ya,{children:e.map(e=>{let r=e.active&&n,s=()=>{!t&&!r&&i(e)};return(0,E.jsxs)(ba,{$active:e.active,$clickable:!r,"aria-current":r?`true`:void 0,onClick:s,onKeyDown:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),s())},role:r?void 0:`button`,tabIndex:r?void 0:0,children:[(0,E.jsx)(xa,{$src:e.avatar,children:e.avatar?null:e.name.slice(0,1).toUpperCase()}),(0,E.jsxs)(Sa,{children:[(0,E.jsx)(`strong`,{children:e.name}),(0,E.jsx)(`span`,{children:o(Ri(e.storage))})]}),r?(0,E.jsx)(wa,{children:o(`Signed in`)}):(0,E.jsx)(Ca,{children:(0,E.jsx)(Oa,{"aria-label":o(`Remove account`),disabled:t,onClick:t=>{t.stopPropagation(),a(e)},type:`button`,children:(0,E.jsx)(Sr,{size:14})})})]},e.dir)})}),(0,E.jsx)(ia,{children:(0,E.jsx)(z,{disabled:t,onClick:r,type:`button`,children:o(`Add account`)})})]})}function Ei({account:e,busy:t,error:n,onUnlock:r,onCancel:i}){let a=D(),[o,s]=(0,_.useState)(``);return(0,E.jsx)(ha,{children:(0,E.jsxs)(ga,{"aria-modal":`true`,role:`dialog`,children:[(0,E.jsxs)($i,{children:[(0,E.jsx)(kr,{size:20}),(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`h2`,{children:a(`Unlock {name}`,{name:e.name})}),(0,E.jsx)(`p`,{children:a(`The session was encrypted with a key derived from your password. It is never stored, so it has to be typed again.`)})]})]}),(0,E.jsxs)(ea,{onSubmit:e=>{e.preventDefault(),r(o)},children:[(0,E.jsxs)(ta,{children:[(0,E.jsx)(na,{htmlFor:`switch-password`,children:a(`Password`)}),(0,E.jsx)(Ni,{autoComplete:`current-password`,autoFocus:!0,id:`switch-password`,onChange:s,value:o})]}),n&&(0,E.jsx)(da,{children:n}),(0,E.jsxs)(ia,{children:[(0,E.jsx)(R,{disabled:t,type:`submit`,children:a(t?`Unlocking…`:`Unlock`)}),(0,E.jsx)(z,{disabled:t,onClick:i,type:`button`,children:a(`Cancel`)})]})]})]})})}function Di({busy:e,error:t,run:n,onSignedIn:r,onCancel:i}){let a=D(),[o,s]=(0,_.useState)(``),[c,l]=(0,_.useState)(``);return(0,E.jsx)(Bi,{children:(0,E.jsxs)(Ui,{children:[(0,E.jsxs)(Wi,{children:[(0,E.jsxs)(Gi,{children:[(0,E.jsx)(Ki,{children:(0,E.jsx)(Dr,{size:22})}),(0,E.jsx)(`h1`,{children:a(`Sign in to VRChat`)}),(0,E.jsx)(`p`,{children:a(`The password is used for this one request and is never stored.`)})]}),(0,E.jsxs)(ea,{onSubmit:e=>{e.preventDefault(),n(()=>fi(o.trim(),c))},children:[(0,E.jsxs)(ta,{children:[(0,E.jsx)(na,{htmlFor:`username`,children:a(`Username or email`)}),(0,E.jsx)(Mi,{onChange:s,value:o})]}),(0,E.jsxs)(ta,{children:[(0,E.jsx)(na,{htmlFor:`password`,children:a(`Password`)}),(0,E.jsx)(Ni,{autoComplete:`current-password`,id:`password`,onChange:l,value:c})]}),t&&(0,E.jsx)(da,{children:t}),(0,E.jsx)(oa,{disabled:e,type:`submit`,children:a(e?`Signing in…`:`Sign in`)}),i&&(0,E.jsx)(ca,{disabled:e,onClick:i,type:`button`,children:a(`Cancel`)})]}),(0,E.jsx)(fa,{children:a(`Signing in is optional. Without it AntiBot only reads VRChat's local log, so the instance list can be inaccurate and player details are unavailable. The password is used for this one request and is never stored; the session is kept out of the settings folder.`)})]}),(0,E.jsxs)(qi,{children:[(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`h2`,{children:a(`Or scan to sign in`)}),(0,E.jsx)(`p`,{children:a(`Approve it in the VRChat app; the password never reaches AntiBot.`)})]}),(0,E.jsx)(Fi,{onSignedIn:r})]})]})})}function Oi({auth:e,busy:t,error:n,run:r,onCancel:i}){let a=D(),o=e.twoFactorMethods.length>0?e.twoFactorMethods:[`totp`,`otp`],[s,c]=(0,_.useState)(o[0]),[l,u]=(0,_.useState)(``);return(0,E.jsx)(Bi,{children:(0,E.jsxs)(Hi,{children:[(0,E.jsxs)($i,{children:[(0,E.jsx)(Or,{size:20}),(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`h2`,{children:a(`Two-factor authentication`)}),(0,E.jsx)(`p`,{children:a(`VRChat wants a second factor before it hands over the session.`)})]})]}),(0,E.jsx)(la,{children:o.map(e=>(0,E.jsx)(ua,{$active:s===e,onClick:()=>c(e),type:`button`,children:a(Ii(e))},e))}),(0,E.jsxs)(ea,{onSubmit:e=>{e.preventDefault();let t=l.trim(),n=s===`otp`&&/^\d{8}$/.test(t)?`${t.slice(0,4)}-${t.slice(4)}`:t;r(()=>pi(s,n))},children:[(0,E.jsxs)(ta,{children:[(0,E.jsx)(na,{htmlFor:`code`,children:a(Li(s))}),(0,E.jsx)(ra,{autoComplete:`one-time-code`,autoFocus:!0,id:`code`,inputMode:`numeric`,onChange:e=>u(e.target.value),placeholder:`123456`,value:l})]}),n&&(0,E.jsx)(da,{children:n}),(0,E.jsx)(oa,{disabled:t,type:`submit`,children:a(t?`Verifying…`:`Verify`)}),i&&(0,E.jsx)(ca,{disabled:t,onClick:i,type:`button`,children:a(`Cancel`)})]})]})})}function ki({auth:e,busy:t,error:n,run:r,onBrowse:i}){let a=D(),[o,s]=(0,_.useState)(``),c=e.storage===`hello`;return(0,E.jsx)(Bi,{children:(0,E.jsxs)(Hi,{children:[(0,E.jsxs)($i,{children:[(0,E.jsx)(kr,{size:20}),(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`h2`,{children:a(c?`Unlock with Windows Hello`:`Unlock the saved session`)}),(0,E.jsx)(`p`,{children:a(c?`The session is protected by Windows Hello. Confirm with your PIN, fingerprint or face.`:`The session was encrypted with a key derived from your password. It is never stored, so it has to be typed again.`)})]})]}),(0,E.jsxs)(ea,{onSubmit:e=>{e.preventDefault(),r(()=>mi(c?``:o))},children:[!c&&(0,E.jsxs)(ta,{children:[(0,E.jsx)(na,{htmlFor:`unlock-password`,children:a(`Password`)}),(0,E.jsx)(Ni,{autoComplete:`current-password`,autoFocus:!0,id:`unlock-password`,onChange:s,value:o})]}),n&&(0,E.jsx)(da,{children:n}),(0,E.jsx)(oa,{disabled:t,type:`submit`,children:a(t?`Unlocking…`:c?`Unlock with Windows Hello`:`Unlock`)}),(0,E.jsx)(ca,{onClick:()=>void r(async()=>await vi(`none`)),type:`button`,children:a(`Forget it`)}),i&&(0,E.jsx)(ca,{disabled:t,onClick:i,type:`button`,children:a(`Accounts`)})]})]})})}function Ai({auth:e,busy:t,error:n,run:r}){let i=D(),a=e.user,o=ji(a.status);return(0,E.jsx)(E.Fragment,{children:(0,E.jsxs)(Vi,{children:[(0,E.jsxs)(_a,{children:[(0,E.jsx)(va,{$src:a.avatarUrl}),(0,E.jsxs)(Ta,{children:[(0,E.jsx)(`h2`,{children:a.displayName}),(0,E.jsxs)(Ea,{children:[o&&(0,E.jsx)(Da,{$color:o.color}),(0,E.jsx)(`p`,{children:a.statusDescription||i(o?o.labelKey:`Signed in to VRChat`)})]}),e.expiresAt&&(0,E.jsx)(`p`,{children:i(`Session expires {date}`,{date:new Date(e.expiresAt).toLocaleDateString()})})]}),(0,E.jsx)(sa,{disabled:t,onClick:()=>void r(yi),type:`button`,children:i(`Sign out`)})]}),n&&(0,E.jsx)(da,{children:n})]})})}function ji(e){switch(e){case`active`:return{labelKey:`Online`,color:`#4ade80`};case`join me`:return{labelKey:`Join Me`,color:`#60a5fa`};case`ask me`:return{labelKey:`Ask Me`,color:`#fbbf24`};case`busy`:return{labelKey:`Busy`,color:`#f87171`};case`offline`:return{labelKey:`Offline`,color:`#94a3b8`};default:return e&&e.length>0?{labelKey:e,color:`#94a3b8`}:null}}function Mi({value:e,onChange:t}){let n=D(),[r,i]=(0,_.useState)(!1);return(0,E.jsxs)(ka,{children:[(0,E.jsx)(ra,{autoComplete:`username`,id:`username`,onChange:e=>t(e.target.value),placeholder:n(`username`),type:r?`text`:`password`,value:e}),(0,E.jsx)(Aa,{"aria-label":n(r?`Hide the username`:`Show the username`),onClick:()=>i(e=>!e),type:`button`,children:r?(0,E.jsx)(jr,{size:14}):(0,E.jsx)(Ar,{size:14})})]})}function Ni({id:e,value:t,onChange:n,placeholder:r=`••••••••`,autoComplete:i,autoFocus:a}){let o=D(),[s,c]=(0,_.useState)(!1);return(0,E.jsxs)(ka,{children:[(0,E.jsx)(ra,{autoComplete:i,autoFocus:a,id:e,onChange:e=>n(e.target.value),placeholder:r,type:s?`text`:`password`,value:t}),(0,E.jsx)(Aa,{"aria-label":o(s?`Hide password`:`Show password`),onClick:()=>c(e=>!e),type:`button`,children:s?(0,E.jsx)(jr,{size:14}):(0,E.jsx)(Ar,{size:14})})]})}function Pi({auth:e,busy:t,error:n,run:r}){let i=D(),a=e.systemStorage,o=e.systemStorageName||`System protection`,s=e.tpmStorage,c=e.helloStorage,l=e.softwareStorage,u=e.storage!==`none`,d=e.state===`loggedIn`,[f,p]=(0,_.useState)(!u&&!e.storageChosen),[m,h]=(0,_.useState)(u?e.storage:`none`),[g,v]=(0,_.useState)(``),[y,b]=(0,_.useState)(``),[x,S]=(0,_.useState)(``);(0,_.useEffect)(()=>{(u||e.storageChosen)&&p(!1)},[u,e.storageChosen]);let C=()=>{h(u?e.storage:`none`),v(``),b(``),S(``),p(!0)},ee=m!==e.storage||m===`password`&&g.length>0||!e.storageChosen;return f?(0,E.jsx)(ha,{children:(0,E.jsxs)(ga,{"aria-modal":`true`,role:`dialog`,children:[(0,E.jsxs)($i,{children:[(0,E.jsx)(Or,{size:20}),(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`h2`,{children:i(`Keep the session between launches`)}),(0,E.jsx)(`p`,{children:i(`Only the VRChat session cookie is stored, never your password. Every mode except "Do not remember" encrypts it at rest; the difference is what unlocks it.`)})]})]}),(0,E.jsxs)(ja,{children:[(0,E.jsxs)(B,{$active:m===`software`,$disabled:!l,onClick:()=>l&&h(`software`),type:`button`,children:[(0,E.jsxs)(Ma,{children:[(0,E.jsx)(`strong`,{children:i(`Software key`)}),(0,E.jsx)(Na,{children:i(`obfuscation`)}),(0,E.jsx)(Fa,{$tone:`weak`,children:i(`weak`)}),(0,E.jsx)(Pa,{children:i(`Linux`)})]}),(0,E.jsx)(`p`,{children:i(`AES-256-GCM with a key file next to the session; obfuscation only, not real protection.`)})]}),(0,E.jsxs)(B,{$active:m===`system`,$disabled:!a,onClick:()=>a&&h(`system`),type:`button`,children:[(0,E.jsxs)(Ma,{children:[(0,E.jsx)(`strong`,{children:o}),(0,E.jsx)(Na,{children:i(`encrypted`)}),(0,E.jsx)(Fa,{$tone:`fair`,children:i(`fair`)}),(0,E.jsx)(Pa,{children:i(o===`Windows DPAPI`?`Windows`:o===`System keyring`?`Linux`:`Windows · Linux`)})]}),(0,E.jsx)(`p`,{children:i(o===`Windows DPAPI`?`Encrypted with Windows DPAPI for your account; unlocks automatically.`:`Held in the desktop keyring; unlocks with your login session.`)})]}),(0,E.jsxs)(B,{$active:m===`tpm`,$disabled:!s,onClick:()=>s&&h(`tpm`),type:`button`,children:[(0,E.jsxs)(Ma,{children:[(0,E.jsx)(`strong`,{children:i(`TPM`)}),(0,E.jsx)(Na,{children:i(`no prompt`)}),(0,E.jsx)(Fa,{$tone:`good`,children:i(`good`)}),(0,E.jsx)(Pa,{children:i(`Windows · Linux`)})]}),(0,E.jsx)(`p`,{children:i(`AES key wrapped by this machine's TPM; unlocks automatically.`)})]}),(0,E.jsxs)(B,{$active:m===`hello`,$disabled:!c,onClick:()=>c&&h(`hello`),type:`button`,children:[(0,E.jsxs)(Ma,{children:[(0,E.jsx)(`strong`,{children:i(`Windows Hello`)}),(0,E.jsx)(Na,{children:i(`PIN / biometrics`)}),(0,E.jsx)(Fa,{$tone:`strong`,children:i(`strong`)}),(0,E.jsx)(Pa,{children:i(`Windows`)})]}),(0,E.jsx)(`p`,{children:i(`Windows Hello confirms it is you before unlocking.`)})]}),(0,E.jsxs)(B,{$active:m===`password`,onClick:()=>h(`password`),type:`button`,children:[(0,E.jsxs)(Ma,{children:[(0,E.jsx)(`strong`,{children:i(`Password`)}),(0,E.jsx)(Na,{children:i(`asks every launch`)}),(0,E.jsx)(Fa,{$tone:`strong`,children:i(`strong`)}),(0,E.jsx)(Pa,{children:i(`Windows · Linux`)})]}),(0,E.jsx)(`p`,{children:i(`AES-256-GCM with a key derived from your password; asked each launch.`)})]}),(0,E.jsxs)(B,{$active:m===`none`,onClick:()=>h(`none`),type:`button`,children:[(0,E.jsxs)(Ma,{children:[(0,E.jsx)(`strong`,{children:i(`Do not remember`)}),(0,E.jsx)(Na,{children:i(`nothing on disk`)}),(0,E.jsx)(Fa,{$tone:`safest`,children:i(`safest`)}),(0,E.jsx)(Pa,{children:i(`Windows · Linux`)})]}),(0,E.jsx)(`p`,{children:i(`Nothing is written; the next launch signs in again.`)})]})]}),m===`password`&&(0,E.jsxs)(ta,{children:[(0,E.jsx)(na,{htmlFor:`storage-password`,children:i(`Password for this session`)}),(0,E.jsx)(Ni,{autoComplete:`current-password`,id:`storage-password`,onChange:v,value:g}),(0,E.jsx)(Ni,{autoComplete:`current-password`,onChange:b,placeholder:i(`repeat the password`),value:y})]}),(x||n)&&(0,E.jsx)(da,{children:x||n}),(0,E.jsx)(ia,{children:(0,E.jsx)(R,{disabled:t||!d,onClick:()=>{if(!d)S(i(`Sign in first.`));else if(!ee)p(!1);else{if(m===`password`){if(g.length<1){S(i(`Enter the password that unlocks the session.`));return}if(g!==y){S(i(`The passwords do not match.`));return}}S(``),r(()=>vi(m,m===`password`?g:void 0)).then(e=>{e&&(v(``),b(``),p(!1))})}},type:`button`,children:i(t?`Saving…`:`Save`)})})]})}):(0,E.jsx)(Vi,{children:(0,E.jsxs)(pa,{children:[(0,E.jsx)(ma,{children:i(`Currently: {storage}`,{storage:i(Ri(e.storage))})}),(0,E.jsx)(z,{onClick:C,type:`button`,children:i(`Change save method`)})]})})}function Fi({onSignedIn:e}){let t=D(),[n,r]=(0,_.useState)(null),[i,a]=(0,_.useState)(``),[o,s]=(0,_.useState)(!1),[c,l]=(0,_.useState)(!0),u=(0,_.useRef)(!1),d=(0,_.useCallback)(async()=>{if(!u.current){u.current=!0,a(``),s(!1),l(!0);try{r(await bi())}catch(e){a(e instanceof Error?e.message:String(e))}finally{u.current=!1,l(!1)}}},[]);(0,_.useEffect)(()=>{T.available?d():l(!1)},[d]),(0,_.useEffect)(()=>{if(!n)return;let t=!1,r=0,i=Math.max(n.interval,2)*1e3,o=Date.now()+Math.max(n.expiresIn,60)*1e3,c=async()=>{if(Date.now()>o)s(!0);else try{let o=await xi(n.deviceCode);if(t)return;if(o.approved&&o.auth){e(o.auth);return}let l=o.reason??`pending`;if(l===`expired_token`){s(!0);return}if(l===`slow_down`)i+=5e3;else if(l===`rate_limited`)i=Math.max(i,15e3);else if(l!==`pending`&&l!==`authorization_pending`){a(l);return}r=window.setTimeout(()=>void c(),i)}catch(e){t||a(e instanceof Error?e.message:String(e))}};return r=window.setTimeout(()=>void c(),i),()=>{t=!0,window.clearTimeout(r)}},[n,e]);let f=!!i||o;return(0,E.jsxs)(Ji,{children:[(0,E.jsx)(Yi,{$dim:!n||f,children:n?.qrDataUrl?(0,E.jsx)(Ra,{alt:t(`Device sign-in`),src:n.qrDataUrl}):(0,E.jsx)(Xi,{children:t(c?`Preparing the code…`:`The sign-in code is unavailable.`)})}),f?(0,E.jsxs)(Zi,{children:[(0,E.jsx)(`span`,{children:i||t(`The code expired. Start again.`)}),(0,E.jsx)(Qi,{onClick:()=>void d(),type:`button`,children:t(`Try again`)})]}):(0,E.jsx)(Zi,{children:t(n?`Waiting for approval…`:`Preparing the code…`)}),n&&(0,E.jsx)(za,{children:(0,E.jsx)(`a`,{href:n.url,rel:`noreferrer`,target:`_blank`,children:t(`Open the link instead`)})})]})}function Ii(e){switch(e){case`totp`:return`Authenticator`;case`emailOtp`:return`Email code`;default:return`Recovery code`}}function Li(e){switch(e){case`totp`:return`Code from your authenticator app`;case`emailOtp`:return`Code VRChat emailed you`;default:return`One of your recovery codes`}}function Ri(e){switch(e){case`password`:return`password-encrypted`;case`system`:return`system-protected`;case`tpm`:return`TPM-protected`;case`hello`:return`Windows Hello`;case`software`:return`software key`;default:return`not stored`}}var zi=L.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 16px;
    min-height: 0;
    max-width: ${({$wide:e})=>e?`none`:`720px`};
    overflow: auto;
`,Bi=L.div`
    display: flex;
    flex: 1;
    min-height: 0;
    padding: 12px 0;
    overflow: auto;
`,Vi=L.section`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`,Hi=L(Vi)`
    width: 100%;
    max-width: 420px;
    margin: auto;
`,Ui=L.section`
    display: grid;
    grid-template-columns: minmax(0, 1fr) 272px;
    width: 100%;
    max-width: 640px;
    margin: auto;
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
`,Wi=L.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 30px 28px;
`,Gi=L.div`
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
`,Ki=L.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: rgba(167, 139, 250, 0.14);
    color: var(--accent-primary);
`,qi=L.div`
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
`,Ji=L.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
`,Yi=L.div`
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
`,Xi=L.span`
    padding: 0 10px;
    color: #4b5563;
    font-family: var(--font-mono);
    font-size: 10px;
    line-height: 1.5;
    text-align: center;
`,Zi=L.p`
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
`,Qi=L.button`
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--accent-primary);
    font: inherit;
    font-size: 10px;
    text-decoration: underline;
    cursor: pointer;
`,$i=L.div`
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
`,ea=L.form`
    display: flex;
    flex-direction: column;
    gap: 12px;
`,ta=L.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`,na=L.label`
    font-size: 11px;
    color: var(--text-secondary);
`,ra=L.input`
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
`,ia=L.div`
    display: flex;
    align-items: center;
    gap: 10px;
`,aa=L.button`
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
`,R=L(aa).attrs({$primary:!0})``,z=L(aa).attrs({$primary:!1})``,oa=L(R)`
    justify-content: center;
    padding: 10px 14px;
`,sa=L(z)`
    margin-left: auto;
`,ca=L(z)`
    align-self: center;
`,la=L.div`
    display: flex;
    gap: 8px;
`,ua=L.button`
    padding: 6px 11px;
    border: 1px solid ${({$active:e})=>e?`var(--accent-primary)`:`var(--border-color)`};
    border-radius: 999px;
    background: ${({$active:e})=>e?`rgba(167, 139, 250, 0.12)`:`transparent`};
    color: ${({$active:e})=>e?`var(--text-primary)`:`var(--text-secondary)`};
    font: inherit;
    font-size: 11px;
    cursor: pointer;
`,da=L.p`
    font-size: 12px;
    color: #f87171;
`,fa=L.p`
    font-size: 11px;
    line-height: 1.5;
    color: var(--text-muted);
`,pa=L.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 12px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: var(--bg-primary);
`,ma=L.span`
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-secondary);
`,ha=L.div`
    position: fixed;
    inset: 0;
    z-index: 30;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: rgba(6, 4, 12, 0.72);
    backdrop-filter: blur(3px);
`,ga=L.section`
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
`,_a=L.div`
    display: flex;
    align-items: center;
    gap: 16px;
`,va=L.div`
    width: 64px;
    height: 64px;
    flex-shrink: 0;
    border-radius: 50%;
    background: var(--bg-primary) center / cover no-repeat;
    background-image: ${({$src:e})=>e?`url("${e}")`:`none`};
    box-shadow: inset 0 0 0 1px var(--border-color);
`,ya=L.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`,ba=L.div`
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
`,xa=L.div`
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
`,Sa=L.div`
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
`,Ca=L.div`
    display: flex;
    align-items: center;
    gap: 6px;
    margin-left: auto;
`,wa=L.span`
    margin-left: auto;
    padding: 3px 9px;
    border-radius: 999px;
    background: rgba(167, 139, 250, 0.14);
    color: var(--accent-primary);
    font-family: var(--font-mono);
    font-size: 9px;
`,Ta=L.div`
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
`,Ea=L.div`
    display: flex;
    align-items: center;
    gap: 6px;
`,Da=L.span`
    width: 8px;
    height: 8px;
    flex-shrink: 0;
    border-radius: 50%;
    background: ${({$color:e})=>e};
    box-shadow: 0 0 6px ${({$color:e})=>e};
`,Oa=L.button`
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
`,ka=L.div`
    position: relative;
    display: flex;

    input {
        width: 100%;
        padding-right: 34px;
    }
`,Aa=L(Oa)`
    position: absolute;
    top: 50%;
    right: 6px;
    transform: translateY(-50%);
`,ja=L.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`,B=L.button`
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
`,Ma=L.div`
    display: flex;
    align-items: center;
    gap: 8px;

    strong {
        font-size: 12px;
        font-weight: 600;
    }
`,Na=L.span`
    padding: 2px 7px;
    border-radius: 999px;
    background: var(--bg-primary);
    font-family: var(--font-mono);
    font-size: 9px;
    color: var(--text-muted);
`,Pa=L.span`
    margin-left: auto;
    padding: 2px 7px;
    border-radius: 999px;
    background: rgba(167, 139, 250, 0.12);
    color: var(--accent-primary);
    font-family: var(--font-mono);
    font-size: 9px;
`,Fa=L.span`
    padding: 2px 7px;
    border-radius: 999px;
    background: ${({$tone:e})=>La(e)};
    color: ${({$tone:e})=>Ia(e)};
    font-family: var(--font-mono);
    font-size: 9px;
`;function Ia(e){switch(e){case`weak`:return`#f87171`;case`fair`:return`#fb923c`;case`good`:return`#fbbf24`;case`strong`:return`#4ade80`;default:return`#60a5fa`}}function La(e){switch(e){case`weak`:return`rgba(248, 113, 113, 0.14)`;case`fair`:return`rgba(251, 146, 60, 0.14)`;case`good`:return`rgba(251, 191, 36, 0.14)`;case`strong`:return`rgba(74, 222, 128, 0.14)`;default:return`rgba(96, 165, 250, 0.14)`}}var Ra=L.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`,za=L.div`
    max-width: 100%;
    overflow: hidden;

    a {
        font-family: var(--font-mono);
        font-size: 10px;
        color: var(--accent-primary);
        word-break: break-all;
    }
`;async function Ba(e){return await T.request(`debug.user`,{userId:e},6e4)}async function Va(){return(await T.request(`debug.closeVrchat`,void 0,6e4)).ok}function Ha(){return(0,E.jsxs)(Ka,{children:[(0,E.jsx)(Ua,{}),(0,E.jsx)(Ga,{})]})}function Ua(){let e=D(),[t,n]=(0,_.useState)(!1),[r,i]=(0,_.useState)(``),[a,o]=(0,_.useState)(!1),s=async()=>{n(!0),i(``),o(!1);try{let t=await Va();o(!t),i(e(t?`VRChat closed.`:`VRChat did not close. Is it running?`))}catch(e){o(!0),i(e instanceof Error?e.message:String(e))}finally{n(!1)}};return(0,E.jsxs)(qa,{children:[(0,E.jsx)(`h2`,{children:e(`Close VRChat`)}),(0,E.jsx)(`p`,{children:e(`Asks VRChat to quit normally, so the client tells the instance it is leaving.`)}),(0,E.jsx)(Ya,{children:(0,E.jsx)(Qa,{disabled:t,onClick:()=>void s(),type:`button`,children:e(t?`Working…`:`Close VRChat`)})}),r&&(0,E.jsx)(Xa,{$failed:a,children:r})]})}function Wa({label:e,value:t}){return(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(`dt`,{children:e}),(0,E.jsx)(`dd`,{children:t})]})}function Ga(){let e=D(),[t,n]=(0,_.useState)(``),[r,i]=(0,_.useState)(!1),[a,o]=(0,_.useState)(``),[s,c]=(0,_.useState)(null),l=async()=>{i(!0),o(``),c(null);try{c(await Ba(t))}catch(e){o(e instanceof Error?e.message:String(e))}finally{i(!1)}};return(0,E.jsxs)(qa,{children:[(0,E.jsx)(`h2`,{children:e(`User check`)}),(0,E.jsx)(`p`,{children:e(`Paste a VRChat user id or a profile link to see how it would be scored.`)}),(0,E.jsxs)(Ja,{onSubmit:e=>{e.preventDefault(),l()},children:[(0,E.jsx)(Za,{onChange:e=>n(e.target.value),placeholder:`usr_… or https://vrchat.com/home/user/usr_…`,value:t}),(0,E.jsx)(Qa,{disabled:r||t.trim().length===0,type:`submit`,children:e(r?`Checking…`:`Check`)})]}),a&&(0,E.jsx)($a,{children:a}),s&&(0,E.jsxs)(eo,{children:[(0,E.jsxs)(to,{$score:s.threat,children:[s.threat,`%`]}),(0,E.jsxs)(no,{children:[(0,E.jsx)(Wa,{label:e(`Name`),value:s.displayName}),(0,E.jsx)(Wa,{label:e(`User ID`),value:s.id}),(0,E.jsx)(Wa,{label:e(`Rank`),value:s.trust??e(`Unknown`)}),(0,E.jsx)(Wa,{label:e(`Joined`),value:s.dateJoined??e(`Unknown`)}),(0,E.jsx)(Wa,{label:e(`Platform`),value:s.platform??e(`Unknown`)}),(0,E.jsx)(Wa,{label:e(`Avatar`),value:s.avatarName??(s.isRobot?e(`Robot (default)`):e(`Unknown`))})]}),(0,E.jsx)(ro,{children:s.reasons.length>0?s.reasons.map(e=>(0,E.jsx)(`li`,{children:e},e)):(0,E.jsx)(`li`,{children:e(`No signal matched.`)})})]})]})}var Ka=L.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 16px;
    min-height: 0;
    max-width: 720px;
    overflow: auto;
`,qa=L.section`
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
`,Ja=L.form`
    display: flex;
    align-items: center;
    gap: 10px;
`,Ya=L.div`
    display: flex;
    align-items: center;
    gap: 10px;
`,Xa=L.p`
    font-family: var(--font-mono);
    font-size: 11px;
    color: ${({$failed:e})=>e?`#f87171`:`#4ade80`};
`,Za=L.input`
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
`,Qa=L.button`
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
`,$a=L.p`
    font-family: var(--font-mono);
    font-size: 11px;
    color: #f87171;
`,eo=L.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 14px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: var(--bg-primary);
`,to=L.strong`
    font-family: var(--font-mono);
    font-size: 26px;
    font-weight: 600;
    color: ${({$score:e})=>e>=70?`#f87171`:e>=40?`#fbbf24`:`#4ade80`};
`,no=L.dl`
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
`,ro=L.ul`
    display: flex;
    flex-direction: column;
    gap: 3px;
    margin: 0;
    padding-left: 16px;
    font-size: 11px;
    color: var(--text-secondary);
`,io={running:!1,world:``,instance:``,users:[]};async function ao(){return T.available?await T.request(`instance.snapshot`):io}function oo(e){return T.on(t=>{t.type===`instance.changed`&&e(t.data)})}async function so(e,t){return await T.request(`user.describe`,{userId:e,displayName:t})}async function co(e){return T.available?(await T.request(`user.bio`,{userId:e})).bio??null:null}function lo({signedIn:e,onSignIn:t}){let n=D(),[r,i]=(0,_.useState)(io),[a,o]=(0,_.useState)(null),[s,c]=(0,_.useState)(()=>Date.now()),l=(0,_.useRef)(!1);(0,_.useEffect)(()=>{let e=!1,t=oo(t=>{e||(l.current=!0,i(t))});return ao().then(t=>{!e&&!l.current&&i(t)},()=>{}),()=>{e=!0,t()}},[]),(0,_.useEffect)(()=>{let e=window.setInterval(()=>c(Date.now()),5e3);return()=>window.clearInterval(e)},[]);let{running:u,world:d,users:f,worldName:p,capacity:m,worldId:h=``,worldThumbnail:g,instanceType:v=``,instanceRegion:y=``,instanceNumber:b=``,instanceDisplayName:x=``,instanceRestricted:S=!1,instanceAgeGated:C=!1}=r,ee=go(h,g),w=a?f.find(e=>e.userId===a)??null:null;return(0,E.jsxs)(wo,{children:[!e&&(0,E.jsxs)(To,{children:[(0,E.jsxs)(Eo,{children:[(0,E.jsx)(`strong`,{children:n(`Not signed in`)}),(0,E.jsx)(`span`,{children:n(`Only VRChat's local log is read. The player list and instance details can be wrong when more than one client runs, and status, platform and avatar names are unavailable.`)})]}),(0,E.jsx)(Do,{onClick:t,type:`button`,children:n(`Sign in`)})]}),ei?u?(0,E.jsxs)(E.Fragment,{children:[(0,E.jsxs)(Oo,{children:[(0,E.jsx)(ko,{$src:ee,children:(0,E.jsxs)(Ao,{children:[(0,E.jsx)(Mo,{children:n(`World`)}),(0,E.jsx)(jo,{$link:h.length>0,onClick:h?()=>void gr(`https://vrchat.com/home/world/${h}`):void 0,title:h?n(`Open on vrchat.com`):void 0,children:p||d||n(`—`)}),(0,E.jsx)(No,{children:(0,E.jsxs)(Po,{children:[y&&(0,E.jsx)(xo,{region:y,t:n}),S&&(0,E.jsx)(Mr,{size:12}),C&&(0,E.jsx)(Fo,{children:`18+`}),x||So(v,n),` ⋅ #`,b||n(`—`)]})})]})}),(0,E.jsxs)(Ro,{children:[(0,E.jsx)(`strong`,{children:f.length}),(m??0)>0&&(0,E.jsx)(`span`,{children:n(`/ {capacity} users`,{capacity:m??0})})]})]}),(0,E.jsxs)(zo,{children:[(0,E.jsxs)(Vo,{children:[(0,E.jsx)(`span`,{}),(0,E.jsx)(`span`,{children:n(`User`)}),(0,E.jsx)(`span`,{children:n(`Trust`)}),(0,E.jsx)(`span`,{children:n(`Pronouns`)}),(0,E.jsx)(`span`,{children:n(`Status`)}),(0,E.jsx)(`span`,{children:n(`Platform`)}),(0,E.jsx)(`span`,{title:n(`Time in this instance`),children:n(`Time`)})]}),(0,E.jsx)(Ho,{children:f.length===0?(0,E.jsx)(ks,{children:n(`No players in this instance yet.`)}):f.map(e=>(0,E.jsx)(uo,{user:e,now:s,onSelect:e=>o(e.userId)},e.userId))})]})]}):(0,E.jsx)(Co,{hint:n(`Players appear here as VRChat writes join and leave lines, or once an account is signed in.`),title:n(`VRChat is not running`)}):(0,E.jsx)(Co,{hint:n(`The list is built by the desktop host.`),title:n(`Desktop host required`)}),w&&(0,E.jsx)(fo,{user:w,now:s,onClose:()=>o(null)})]})}function uo({user:e,now:t,onSelect:n,showTime:r=!0,timeLabel:i,dim:a=!1,tone:o,badge:s,trailing:c}){let l=D(),u=e.iconUrl??e.avatarUrl,d=_o(e.status),f=e.threat??0,p=e.profileLoaded??!0,m=o??(e.local?`self`:e.whitelisted?`white`:f>0?`threat`:e.isFriend?`friend`:`none`);return(0,E.jsxs)(Ko,{$tone:m,$threat:f,$showTime:r,$dim:a,onClick:()=>n(e),children:[(0,E.jsx)(qo,{children:u?(0,E.jsx)(Jo,{$src:u}):p?(0,E.jsx)(Zo,{children:e.name.slice(0,1)}):(0,E.jsx)(Xo,{})}),(0,E.jsx)(ns,{children:(0,E.jsxs)(rs,{children:[(0,E.jsx)(`span`,{title:[e.platform,e.dateJoined&&l(`joined VRChat {date}`,{date:e.dateJoined})].filter(Boolean).join(` · `),children:e.name}),f>0&&(0,E.jsxs)(as,{$score:f,title:(e.threatReasons??[]).map(e=>l(e)).join(` · `),children:[(0,E.jsx)(Fr,{size:10}),f,`%`]}),s,e.isRobot&&(0,E.jsx)(hs,{children:l(`robot`)}),e.local&&(0,E.jsx)(ms,{children:l(`you`)})]})}),(0,E.jsx)($o,{children:p?e.trust?(0,E.jsx)(ps,{$trust:e.trust,children:e.trust}):(0,E.jsx)(ts,{children:l(`—`)}):(0,E.jsx)(Qo,{})}),(0,E.jsx)(es,{children:p?e.pronouns?(0,E.jsx)(is,{title:e.pronouns,children:e.pronouns}):(0,E.jsx)(ts,{children:l(`—`)}):(0,E.jsx)(Qo,{})}),(0,E.jsx)(ls,{title:e.statusDescription||void 0,children:p?d?(0,E.jsxs)(E.Fragment,{children:[(0,E.jsx)(us,{$color:d.color}),(0,E.jsx)(`span`,{children:e.statusDescription||l(d.labelKey)})]}):(0,E.jsx)(ts,{children:l(`—`)}):(0,E.jsx)(Qo,{})}),(0,E.jsx)(fs,{title:vo(e.platform,l),children:p?yo(e.platform,l):(0,E.jsx)(Qo,{})}),r&&(0,E.jsx)(vs,{children:c??i??bo(e.joinedAt,t,l)})]})}function fo({user:e,now:t,onClose:n}){let r=D(),[i,a]=(0,_.useState)(e.bio);(0,_.useEffect)(()=>{let e=e=>{e.key===`Escape`&&n()};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[n]),(0,_.useEffect)(()=>{if(e.bio||e.userId.length===0){a(e.bio);return}let t=!1;return co(e.userId).then(e=>{!t&&e&&a(e)},()=>{}),()=>{t=!0}},[e.userId,e.bio]);let o=e.iconUrl??e.avatarUrl,s=_o(e.status);return(0,E.jsx)(ys,{onClick:n,children:(0,E.jsxs)(bs,{onClick:e=>e.stopPropagation(),children:[(0,E.jsx)(xs,{$src:o,children:!o&&e.name.slice(0,1).toUpperCase()}),(0,E.jsxs)(Ss,{children:[(0,E.jsx)(`h2`,{children:e.name}),(0,E.jsxs)(Cs,{children:[e.trust&&(0,E.jsx)(ps,{$trust:e.trust,children:e.trust}),e.isRobot&&(0,E.jsx)(hs,{children:r(`robot`)}),e.whitelisted&&(0,E.jsx)(cs,{children:r(`whitelisted`)}),e.local&&(0,E.jsx)(ms,{children:r(`you`)})]}),(0,E.jsxs)(ws,{children:[(0,E.jsxs)(Ts,{children:[(0,E.jsx)(`span`,{children:r(`Profile`)}),(0,E.jsxs)(Es,{onClick:()=>void gr(`https://vrchat.com/home/user/${e.userId}`),title:r(`Open on vrchat.com`),type:`button`,children:[(0,E.jsx)(Nr,{size:12}),r(`Open on vrchat.com`)]})]}),(0,E.jsx)(ho,{status:s,text:e.statusDescription,t:r}),(e.threat??0)>0&&(0,E.jsxs)(Ts,{children:[(0,E.jsx)(`span`,{children:r(`Threat`)}),(0,E.jsxs)(os,{children:[(0,E.jsxs)(as,{$score:e.threat,children:[(0,E.jsx)(Fr,{size:10}),e.threat,`%`]}),(0,E.jsx)(ss,{children:(e.threatReasons??[]).map(e=>r(e)).join(` · `)})]})]}),(0,E.jsx)(mo,{label:r(`Pronouns`),value:e.pronouns||r(`—`)}),(0,E.jsx)(mo,{label:r(`Platform`),value:yo(e.platform,r)}),e.joinedAt&&(0,E.jsx)(mo,{label:r(`In this instance`),value:bo(e.joinedAt,t,r)}),(0,E.jsx)(mo,{label:r(`Avatar`),value:po(e,r)}),(0,E.jsx)(mo,{label:r(`VRChat account since`),value:e.dateJoined?new Date(e.dateJoined).toLocaleDateString():r(`—`)}),i&&(0,E.jsx)(Ds,{children:i})]})]}),(0,E.jsx)(Os,{onClick:n,type:`button`,children:`×`})]})})}function po(e,t){return e.avatarName?e.avatarName:e.isRobot?t(`Robot (default)`):e.avatarLoaded??!1?t(`Unknown`):t(`Loading…`)}function mo({label:e,value:t}){return(0,E.jsxs)(Ts,{children:[(0,E.jsx)(`span`,{children:e}),(0,E.jsx)(`code`,{title:t,children:t})]})}function ho({status:e,text:t,t:n}){let r=t||n(e?e.labelKey:`—`);return(0,E.jsxs)(Ts,{children:[(0,E.jsx)(`span`,{children:n(`Status`)}),(0,E.jsxs)(ds,{title:r,children:[e&&(0,E.jsx)(us,{$color:e.color}),(0,E.jsx)(`code`,{children:r})]})]})}function go(e,t){let n=(0,_.useRef)({worldId:``,url:``});return t?n.current={worldId:e,url:t}:n.current.worldId!==e&&(n.current={worldId:e,url:``}),n.current.url}function _o(e){switch(e){case`active`:return{labelKey:`Online`,color:`#4ade80`};case`join me`:return{labelKey:`Join Me`,color:`#60a5fa`};case`ask me`:return{labelKey:`Ask Me`,color:`#fbbf24`};case`busy`:return{labelKey:`Busy`,color:`#f87171`};case`offline`:return{labelKey:`Offline`,color:`#94a3b8`};default:return e&&e.length>0?{labelKey:e,color:`#94a3b8`}:null}}function vo(e,t){return e===`standalonewindows`?t(`PC includes both desktop and PCVR users; VRChat does not report which one.`):void 0}function yo(e,t){switch(e){case`standalonewindows`:return t(`PC/VR`);case`android`:return t(`Quest`);case`ios`:return t(`iOS`);default:return e&&e.length>0?e:t(`—`)}}function bo(e,t,n){if(!e)return n(`—`);let[r,i,a]=e.split(`:`).map(Number);if([r,i,a].some(Number.isNaN))return e;let o=new Date(t);o.setHours(r,i,a,0),o.getTime()>t&&o.setDate(o.getDate()-1);let s=Math.max(0,Math.floor((t-o.getTime())/1e3)),c=Math.floor(s/3600),l=Math.floor(s%3600/60);return c>0?n(`{hours}h {minutes}m`,{hours:c,minutes:l}):n(`{minutes}m`,{minutes:l})}function xo({region:e,t}){switch(e.toLowerCase()){case`jp`:return(0,E.jsx)(Io,{title:t(`Japan`),children:(0,E.jsxs)(`svg`,{viewBox:`0 0 30 20`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,E.jsx)(`rect`,{fill:`#fff`,height:`20`,width:`30`}),(0,E.jsx)(`circle`,{cx:`15`,cy:`10`,fill:`#bc002d`,r:`6`})]})});case`us`:case`use`:return(0,E.jsx)(Io,{title:t(`United States`),children:(0,E.jsxs)(`svg`,{viewBox:`0 0 30 20`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,E.jsx)(`rect`,{fill:`#fff`,height:`20`,width:`30`}),(0,E.jsx)(`path`,{d:`M0 0h30v1.54H0zM0 3.08h30v1.54H0zM0 6.15h30v1.54H0zM0 9.23h30v1.54H0zM0 12.31h30v1.54H0zM0 15.38h30v1.54H0zM0 18.46h30V20H0z`,fill:`#b22234`}),(0,E.jsx)(`rect`,{fill:`#3c3b6e`,height:`10.77`,width:`12.6`})]})});case`eu`:return(0,E.jsx)(Io,{title:t(`Europe`),children:(0,E.jsxs)(`svg`,{viewBox:`0 0 30 20`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,E.jsx)(`rect`,{fill:`#003399`,height:`20`,width:`30`}),Array.from({length:12},(e,t)=>{let n=t/12*Math.PI*2;return(0,E.jsx)(`circle`,{cx:15+Math.cos(n)*4.6,cy:10+Math.sin(n)*4.6,fill:`#ffcc00`,r:`0.9`},t)})]})});default:return(0,E.jsx)(Lo,{children:e.toUpperCase()})}}function So(e,t){switch(e){case`public`:return t(`Public`);case`friends`:return t(`Friends`);case`friends+`:case`hidden`:return t(`Friends+`);case`invite`:case`private`:return t(`Invite`);case`invite+`:return t(`Invite+`);case`group`:return t(`Group`);default:if(e?.startsWith(`group:`)){let n=e.slice(6);return t(n===`public`?`Group Public`:n===`plus`?`Group+`:`Group Members`)}return e&&e.length>0?e:t(`Instance`)}}function Co({title:e,hint:t,children:n}){return(0,E.jsxs)(As,{children:[(0,E.jsx)(Tr,{size:28}),(0,E.jsx)(`h2`,{children:e}),(0,E.jsx)(`p`,{children:t}),n]})}var wo=L.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 14px;
    min-height: 0;
`,To=L.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 12px 14px;
    border: 1px solid rgba(251, 191, 36, 0.35);
    border-radius: var(--radius-md);
    background: rgba(251, 191, 36, 0.08);
`,Eo=L.div`
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
`,Do=L.button`
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
`,Oo=L.section`
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    gap: 18px;
    overflow: hidden;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`,ko=L.div`
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
        rgba(8, 7, 15, 0.68) 0%,
        rgba(8, 7, 15, 0.3) 55%,
        rgba(8, 7, 15, 0) 100%);
    }
`,Ao=L.div`
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
    padding: 14px 16px;
`,jo=L.h2`
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
`,Mo=L.span`
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
`,No=L.div`
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
`,Po=L.span`
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
`,Fo=L.span`
    padding: 0 4px;
    border-radius: 3px;
    background: rgba(248, 113, 113, 0.16);
    color: #fca5a5;
    font-size: 9px;
`,Io=L.span`
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
`,Lo=L.span`
    font-family: var(--font-mono);
    font-size: 9px;
    color: var(--text-muted);
`,Ro=L.div`
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
`,zo=L.section`
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`,Bo=e=>e?`34px minmax(110px, 1.1fr) 0.7fr 0.9fr 1.6fr 0.8fr minmax(64px, 0.5fr)`:`34px minmax(110px, 1.1fr) 0.7fr 0.9fr 1.6fr 0.8fr`,Vo=L.div`
    display: grid;
    grid-template-columns: ${Bo(!0)};
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
`,Ho=L.div`
    flex: 1;
    min-height: 0;
    overflow-y: auto;
`;function V(e,t=!1){switch(e){case`self`:return t?`rgba(167, 139, 250, 0.16)`:`rgba(167, 139, 250, 0.09)`;case`friend`:return t?`rgba(255, 204, 0, 0.16)`:`rgba(255, 204, 0, 0.09)`;case`white`:return t?`rgba(255, 255, 255, 0.16)`:`rgba(255, 255, 255, 0.10)`;default:return t?`rgba(167, 139, 250, 0.06)`:`transparent`}}function H(e,t=!1){return`rgba(255, 0, 0, ${((Math.min(Math.max(e,0),100)/100)**1.8*.7+(t?.08:0)).toFixed(3)})`}function Uo(e,t=0){switch(e){case`self`:return`var(--accent-primary)`;case`friend`:return`#ffcc00`;case`white`:return`rgba(255, 255, 255, 0.5)`;case`threat`:return`rgba(255, 0, 0, ${(.1+Math.min(Math.max(t,0),100)/100*.9).toFixed(3)})`;default:return`transparent`}}function Wo(e){return`hsl(${(48-Math.max(0,Math.min(100,e))/100*48).toFixed(0)}, 92%, 62%)`}function Go(e){return`hsla(${(48-Math.max(0,Math.min(100,e))/100*48).toFixed(0)}, 92%, 62%, 0.14)`}var Ko=L.div`
    display: grid;
    grid-template-columns: ${({$showTime:e})=>Bo(e)};
    gap: 8px;
    align-items: center;
    padding: 8px 16px;
    opacity: ${({$dim:e})=>e?.55:1};
    background: ${({$tone:e,$threat:t})=>e===`threat`?H(t):V(e)};
    border-left: 2px solid ${({$tone:e,$threat:t})=>Uo(e,t)};
    border-bottom: 1px solid var(--border-color);
    cursor: pointer;

    &:last-child {
        border-bottom: 0;
    }

    &:hover {
        background: ${({$tone:e,$threat:t})=>e===`threat`?H(t,!0):V(e,!0)};
    }
`,qo=L.span`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`,Jo=L.span`
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: var(--bg-primary) center / cover no-repeat;
    background-image: ${({$src:e})=>e?`url("${e}")`:`none`};
    box-shadow: inset 0 0 0 1px var(--border-color);
`,Yo=fr`
    0%, 100% {
        opacity: 0.25;
    }
    50% {
        opacity: 0.65;
    }
`,Xo=L.span`
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: var(--text-muted);
    animation: ${Yo} 1.4s ease-in-out infinite;
`,Zo=L.span`
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
`,Qo=L.span`
    display: block;
    width: 62%;
    height: 8px;
    border-radius: 999px;
    background: var(--text-muted);
    animation: ${Yo} 1.4s ease-in-out infinite;
`,$o=L.span`
    display: flex;
    align-items: center;
    min-width: 0;
`,es=L.span`
    display: flex;
    align-items: center;
    min-width: 0;
    overflow: hidden;
`,ts=L.span`
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 10.5px;
`,ns=L.span`
    display: flex;
    align-items: center;
    gap: 9px;
    min-width: 0;
    font-size: 12.5px;
    font-weight: 500;
`,rs=L.span`
    display: flex;
    align-items: center;
    gap: 7px;
    min-width: 0;

    > span:first-child {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`,is=L.span`
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
`,as=L.span`
    display: inline-flex;
    align-items: center;
    gap: 3px;
    padding: 1px 6px;
    border-radius: 999px;
    background: ${({$score:e})=>Go(e)};
    color: ${({$score:e})=>Wo(e)};
    font-family: var(--font-mono);
    font-size: 9px;
    font-weight: 600;
    white-space: nowrap;
`,os=L.div`
    display: flex;
    align-items: flex-start;
    gap: 8px;
    min-width: 0;
`,ss=L.span`
    color: var(--text-secondary);
    font-size: 11px;
    line-height: 1.5;
`,cs=L.span`
    padding: 1px 7px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.12);
    color: #fff;
    font-family: var(--font-mono);
    font-size: 9px;
`,ls=L.span`
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
`,us=L.span`
    width: 8px;
    height: 8px;
    flex-shrink: 0;
    border-radius: 50%;
    background: ${({$color:e})=>e};
    box-shadow: 0 0 6px ${({$color:e})=>e};
`,ds=L.div`
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;

    code {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`,fs=L.span`
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--text-secondary);
    font-size: 11px;
`,ps=L.span`
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    padding: 1px 6px;
    flex-shrink: 0;
    border-radius: 999px;
    background: ${({$trust:e})=>_s(e)};
    color: ${({$trust:e})=>gs(e)};
    font-family: var(--font-mono);
    font-size: 9px;
    text-overflow: ellipsis;
    white-space: nowrap;
`,ms=L.span`
    padding: 1px 6px;
    border-radius: 999px;
    background: rgba(167, 139, 250, 0.16);
    color: var(--accent-primary);
    font-family: var(--font-mono);
    font-size: 9px;
`,hs=L.span`
    padding: 1px 6px;
    flex-shrink: 0;
    border-radius: 999px;
    background: rgba(248, 113, 113, 0.16);
    color: #fca5a5;
    font-family: var(--font-mono);
    font-size: 9px;
`;function gs(e){switch(e){case`Trusted User`:return`#c4b5fd`;case`Known User`:return`#93c5fd`;case`User`:return`#86efac`;case`New User`:return`#fcd34d`;case`Nuisance`:return`#fb7185`;default:return`#94a3b8`}}function _s(e){switch(e){case`Trusted User`:return`rgba(167, 139, 250, 0.16)`;case`Known User`:return`rgba(96, 165, 250, 0.16)`;case`User`:return`rgba(74, 222, 128, 0.14)`;case`New User`:return`rgba(250, 204, 21, 0.14)`;case`Nuisance`:return`rgba(251, 113, 133, 0.16)`;default:return`rgba(148, 163, 184, 0.14)`}}var vs=L.span`
    text-align: right;
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 10.5px;
`,ys=L.div`
    position: fixed;
    inset: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: rgba(6, 4, 12, 0.72);
    backdrop-filter: blur(3px);
`,bs=L.div`
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
`,xs=L.div`
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
`,Ss=L.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 0;

    h2 {
        font-size: 17px;
        font-weight: 600;
    }
`,Cs=L.div`
    display: flex;
    gap: 6px;
`,ws=L.dl`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 4px;
`,Ts=L.div`
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
`,Es=L.button`
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
`,Ds=L.p`
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
`,Os=L.button`
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
`,ks=L.div`
    padding: 32px;
    text-align: center;
    color: var(--text-muted);
    font-size: 12px;
`,As=L.div`
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
`,js=[`debug`,`info`,`warning`,`error`],Ms={debug:`Debug`,info:`Info`,warning:`Warning`,error:`Error`},Ns={debug:`DBG`,info:`INF`,warning:`WRN`,error:`ERR`},Ps=e=>e===`error`?`#fb7185`:e===`warning`?`#fbbf24`:e===`info`?`#60a5fa`:e===`debug`?`#6f6885`:`transparent`;function Fs({log:e}){let t=D(),{status:n,lines:r,clear:i}=e,[a,o]=(0,_.useState)(``),[s,c]=(0,_.useState)(new Set),[l,u]=(0,_.useState)(!0),[d,f]=(0,_.useState)(!1),[p,m]=(0,_.useState)(null),h=(0,_.useRef)(null),g=(0,_.useMemo)(()=>Is(r,a,s),[r,a,s]);(0,_.useEffect)(()=>{l&&h.current&&(h.current.scrollTop=h.current.scrollHeight)},[g,l]),(0,_.useEffect)(()=>{if(!p)return;let e=window.setTimeout(()=>m(null),5e3);return()=>window.clearTimeout(e)},[p]);let v=e=>c(t=>{let n=new Set(t);return n.delete(e)||n.add(e),n});return(0,E.jsxs)(zs,{children:[(0,E.jsxs)(Bs,{children:[(0,E.jsxs)(Vs,{children:[(0,E.jsxs)(Us,{children:[(0,E.jsx)(br,{}),(0,E.jsx)(`input`,{"aria-label":t(`Filter log lines`),onChange:e=>o(e.target.value),placeholder:t(`Filter lines…`),spellCheck:!1,type:`search`,value:a}),a&&(0,E.jsx)(Ws,{"aria-label":t(`Clear the filter`),onClick:()=>o(``),type:`button`,children:(0,E.jsx)(xr,{})})]}),(0,E.jsx)(Hs,{}),(0,E.jsxs)(qs,{$active:l,onClick:()=>u(e=>!e),title:t(l?`Stop scrolling as new lines arrive`:`Scroll to the newest line again`),type:`button`,children:[(0,E.jsx)(Js,{$active:l}),t(l?`Following`:`Paused`)]}),(0,E.jsxs)(qs,{disabled:r.length===0,onClick:i,title:t(`Clear the view; the log itself is untouched`),type:`button`,children:[(0,E.jsx)(Sr,{}),t(`Clear`)]}),(0,E.jsxs)(qs,{disabled:r.length===0||d,onClick:async()=>{m(null),f(!0);try{let e=await ai();e.saved&&m({text:t(`Exported {count} lines to {path}.`,{count:e.lines,path:e.path??``})})}catch(e){m({text:e instanceof Error?e.message:String(e),error:!0})}finally{f(!1)}},title:t(`Save every line read so far to a file`),type:`button`,children:[(0,E.jsx)(Er,{}),t(d?`Exporting…`:`Export`)]})]}),(0,E.jsx)(Gs,{children:js.map(e=>(0,E.jsxs)(Ks,{$level:e,$on:!s.has(e),onClick:()=>v(e),title:t(s.has(e)?`Show {level} lines`:`Hide {level} lines`,{level:t(Ms[e])}),type:`button`,children:[(0,E.jsx)(`i`,{}),t(Ms[e])]},e))})]}),p&&(0,E.jsxs)(Ys,{$error:p.error,children:[(0,E.jsx)(`span`,{children:p.text}),(0,E.jsx)(`button`,{"aria-label":t(`Dismiss`),onClick:()=>m(null),type:`button`,children:(0,E.jsx)(xr,{})})]}),(0,E.jsxs)(Xs,{children:[ei?r.length===0?n.running?n.exists?(0,E.jsx)(Rs,{hint:t(`VRChat is starting; lines appear here as soon as it writes them.`),title:t(`Waiting for the log`)}):(0,E.jsx)(Rs,{hint:t(`The configured log folder cannot be found. Set VRChat's log folder in Settings.`),title:t(`Log folder not found`)}):(0,E.jsx)(Rs,{hint:t(`Nothing is read while VRChat is closed. Its log appears here once it starts.`),title:t(`VRChat is not running`)}):g.length===0?(0,E.jsx)(Rs,{hint:a.trim()?t(`No line contains “{query}”.`,{query:a.trim()}):t(`Every line is hidden by the level filter.`),title:t(`Nothing matches`)}):(0,E.jsx)(Zs,{onScroll:()=>{let e=h.current;if(!e)return;let t=e.scrollHeight-e.scrollTop-e.clientHeight<48;t!==l&&u(t)},ref:h,children:g.map(({line:e,level:n})=>e.level===`session`?(0,E.jsx)(ec,{children:t(`new session`)},e.id):(0,E.jsxs)(Qs,{$level:n,children:[(0,E.jsx)($s,{children:e.time}),(0,E.jsx)(tc,{$level:n,children:e.level?Ns[n]??e.level:``}),(0,E.jsx)(nc,{$level:n,children:Ls(e.message,a)})]},e.id))}):(0,E.jsx)(Rs,{hint:t(`The log is read through the desktop host. Start AntiBot instead of the browser preview.`),title:t(`Desktop host required`)}),!l&&g.length>0&&(0,E.jsxs)(rc,{onClick:()=>u(!0),type:`button`,children:[(0,E.jsx)(wr,{}),t(`Jump to latest`)]})]}),(0,E.jsx)(ac,{children:(0,E.jsx)(`span`,{children:g.length===r.length?t(`{count} lines`,{count:r.length}):t(`{visible} of {total} lines`,{visible:g.length,total:r.length})})})]})}function Is(e,t,n){let r=t.trim().toLowerCase(),i=[],a=``;for(let t of e){t.level&&(a=t.level);let e=t.level||a;n.has(e)||(!r||t.message.toLowerCase().includes(r))&&i.push({line:t,level:e})}return i}function Ls(e,t){let n=t.trim();if(!n)return e;let r=e.split(RegExp(`(${n.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`)})`,`gi`)),i=n.toLowerCase();return r.map((e,t)=>e.toLowerCase()===i?(0,E.jsx)(`mark`,{children:e},t):e)}function Rs({title:e,hint:t,children:n}){return(0,E.jsxs)(ic,{children:[(0,E.jsx)(vr,{size:28}),(0,E.jsx)(`h2`,{children:e}),(0,E.jsx)(`p`,{children:t}),n]})}var zs=L.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 10px;
    min-height: 0;
`,Bs=L.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`,Vs=L.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
`,Hs=L.span`
    flex: 1;
`,Us=L.div`
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
`,Ws=L.button`
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
`,Gs=L.div`
    display: flex;
    gap: 4px;
`,Ks=L.button`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 9px;
    border: 1px solid ${({$on:e,$level:t})=>e?`${Ps(t)}66`:`var(--border-color)`};
    border-radius: 999px;
    background: ${({$on:e,$level:t})=>e?`${Ps(t)}14`:`transparent`};
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
        background: ${({$on:e,$level:t})=>e?Ps(t):`var(--text-muted)`};
    }

    &:hover {
        border-color: var(--border-color-hover);
    }
`,qs=L.button`
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
`,Js=L.span`
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({$active:e})=>e?`var(--accent-primary)`:`var(--text-muted)`};
    box-shadow: ${({$active:e})=>e?`0 0 8px var(--accent-primary)`:`none`};
`,Ys=L.div`
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
`,Xs=L.section`
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: rgba(9, 7, 16, 0.6);
`,Zs=L.div`
    flex: 1;
    min-height: 0;
    overflow: auto;
    padding: 6px 0 12px;
    font-family: var(--font-mono);
    font-size: 11.5px;
`,Qs=L.div`
    display: grid;
    grid-template-columns: 62px 34px minmax(0, 1fr);
    gap: 10px;
    padding: 0 14px;
    border-left: 2px solid ${({$level:e})=>Ps(e)};
    line-height: 1.7;
    content-visibility: auto;
    contain-intrinsic-size: auto 20px;

    &:hover {
        background: rgba(167, 139, 250, 0.06);
    }
`,$s=L.span`
    color: var(--text-muted);
    white-space: nowrap;
`,ec=L.div`
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
`,tc=L.span`
    color: ${({$level:e})=>Ps(e)};
    font-size: 9px;
    letter-spacing: 0.04em;
    line-height: 1.95;
    opacity: 0.85;
`,nc=L.span`
    color: ${({$level:e})=>e===`error`?`#fecaca`:e===`warning`?`#fde68a`:`var(--text-secondary)`};
    white-space: pre-wrap;
    overflow-wrap: anywhere;

    mark {
        border-radius: 2px;
        background: rgba(167, 139, 250, 0.28);
        color: var(--text-primary);
    }
`,rc=L.button`
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
`,ic=L.div`
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
`,ac=L.footer`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 16px;
    padding: 0 2px;
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-muted);
`;async function oc(){return T.available?await T.request(`operations.snapshot`):[]}async function sc(){T.available&&await T.request(`operations.clear`)}async function cc(e){return T.available?await T.request(`operations.undo`,{id:e}):{ok:!1,message:`The desktop host is not available.`}}function lc(e){return T.on(t=>{t.type===`operations.changed`&&e(t.data)})}function uc(){let e=D(),t=ce(),[n,r]=(0,_.useState)([]),[i,a]=(0,_.useState)(null),[o,s]=(0,_.useState)(!1),[c,l]=(0,_.useState)(null),[u,d]=(0,_.useState)(null),f=(0,_.useRef)(!1);(0,_.useEffect)(()=>{let e=!1,t=lc(t=>{e||(f.current=!0,r(t))});return oc().then(t=>{!e&&!f.current&&r(t)},()=>{}),()=>{e=!0,t()}},[]);let p=()=>{o?(s(!1),sc().then(()=>r([]),()=>{})):s(!0)},m=e=>{e.userId.length!==0&&so(e.userId,e.displayName).then(a,()=>{})},h=t=>{l(t.id),cc(t.id).then(e=>{d({ok:e.ok,text:e.message})},()=>{d({ok:!1,text:e(`The host did not answer.`)})}).finally(()=>{l(null),window.setTimeout(()=>d(null),6e3)})};return(0,E.jsxs)(hc,{children:[(0,E.jsxs)(gc,{children:[(0,E.jsxs)(_c,{children:[(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`h2`,{children:e(`Operation history`)}),(0,E.jsx)(`p`,{children:e(`Every block, chat-box mute and avatar-interaction change, as it happened.`)})]}),(0,E.jsxs)(yc,{children:[(0,E.jsx)(vc,{children:e(`{count} action(s)`,{count:n.length})}),(0,E.jsx)(bc,{$confirming:o,disabled:n.length===0,onBlur:()=>s(!1),onClick:p,type:`button`,children:e(o?`Confirm clear`:`Clear history`)})]})]}),u&&(0,E.jsx)(xc,{$ok:u.ok,children:u.text}),(0,E.jsx)(Sc,{children:n.length===0?(0,E.jsx)(Mc,{children:e(`AntiBot has not taken an automatic action yet.`)}):n.map(n=>(0,E.jsxs)(Cc,{onClick:()=>m(n),children:[(0,E.jsx)(wc,{$src:n.avatarUrl}),(0,E.jsx)(Tc,{children:dc(n.at,t)}),(0,E.jsx)(Ec,{$kind:n.kind,children:e(fc(n.kind))}),(0,E.jsx)(Dc,{children:n.displayName||e(`Unknown user`)}),(0,E.jsx)(Oc,{title:n.detail,children:n.detail}),(0,E.jsxs)(kc,{children:[pc(n)&&(0,E.jsx)(Ac,{disabled:c===n.id,onClick:e=>{e.stopPropagation(),h(n)},type:`button`,children:c===n.id?e(`Undoing…`):e(`Undo`)}),(0,E.jsxs)(jc,{disabled:n.userId.length===0,onClick:e=>{e.stopPropagation(),gr(`https://vrchat.com/home/user/${n.userId}`)},title:e(`Open the VRChat profile`),type:`button`,children:[(0,E.jsx)(Nr,{size:11}),e(`Profile`)]})]})]},n.id))})]}),i&&(0,E.jsx)(fo,{user:i,now:Date.now(),onClose:()=>a(null)})]})}function dc(e,t){return new Date(e).toLocaleString(t,{year:`numeric`,month:`short`,day:`numeric`,hour:`2-digit`,minute:`2-digit`,second:`2-digit`})}function fc(e){switch(e){case`block`:return`Blocked`;case`avatarInteractionOff`:return`Avatar interactions off`;case`chatBoxHidden`:return`Chat box hidden`;case`closeVrchat`:return`Closed VRChat`;case`returnHome`:return`Returned home`;case`rejectRequest`:return`Request rejected`;case`undoReject`:return`Rejection undone`;case`unblock`:return`Unblocked`;case`avatarInteractionOn`:return`Avatar interactions on`;case`chatBoxShown`:return`Chat box shown`;default:return e}}function pc(e){return e.undone?!1:e.kind===`block`||e.kind===`avatarInteractionOff`||e.kind===`chatBoxHidden`}function mc(e){switch(e){case`unblock`:case`avatarInteractionOn`:case`chatBoxShown`:case`undoReject`:return`#4ade80`;default:return`#fb7185`}}var hc=L.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
`,gc=L.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`,_c=L.div`
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
`,vc=L.span`
    flex-shrink: 0;
    font-family: var(--font-mono);
    font-size: 9.5px;
    color: var(--text-muted);
`,yc=L.div`
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
`,bc=L.button`
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
`,xc=L.div`
    margin: 10px 16px 0;
    padding: 8px 12px;
    border: 1px solid ${({$ok:e})=>e?`rgba(74, 222, 128, 0.45)`:`rgba(251, 113, 133, 0.45)`};
    border-radius: var(--radius-sm);
    background: ${({$ok:e})=>e?`rgba(74, 222, 128, 0.1)`:`rgba(251, 113, 133, 0.1)`};
    color: ${({$ok:e})=>e?`#4ade80`:`#fb7185`};
    font-size: 11px;
`,Sc=L.div`
    flex: 1;
    min-height: 0;
    overflow-y: auto;
`,Cc=L.div`
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
`,wc=L.span`
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
`,Tc=L.span`
    font-family: var(--font-mono);
    font-size: 9.5px;
    color: var(--text-muted);
    white-space: nowrap;
`,Ec=L.span`
    font-size: 10.5px;
    color: ${({$kind:e})=>mc(e)};
    white-space: nowrap;
`,Dc=L.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 11.5px;
`,Oc=L.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: var(--font-mono);
    font-size: 9.5px;
    color: var(--text-muted);
`,kc=L.div`
    display: flex;
    justify-content: flex-end;
    gap: 6px;
`,Ac=L.button`
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
`,jc=L.button`
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
`,Mc=L.p`
    padding: 26px 16px;
    text-align: center;
    font-size: 11.5px;
    color: var(--text-muted);
`;async function Nc(){return T.available?await T.request(`friendRequests.snapshot`):[]}async function Pc(){T.available&&await T.request(`friendRequests.clear`)}async function Fc(e){T.available&&await T.request(`friendRequests.undo`,{id:e})}function Ic(e){return T.on(t=>{t.type===`friendRequests.changed`&&e(t.data)})}function Lc({signedIn:e,onSignIn:t}){let n=D(),r=ce(),[i,a]=(0,_.useState)([]),[o,s]=(0,_.useState)(null),[c,l]=(0,_.useState)(!1),u=(0,_.useRef)(!1);(0,_.useEffect)(()=>{let e=!1,t=Ic(t=>{e||(u.current=!0,a(t))});return Nc().then(t=>{!e&&!u.current&&a(t)},()=>{}),()=>{e=!0,t()}},[]);let d=i.filter(e=>e.active).length,f=()=>{c?(l(!1),Pc().then(()=>a([]),()=>{})):l(!0)},p=e=>{Fc(e.id)};return(0,E.jsxs)(Vc,{children:[!e&&(0,E.jsxs)(Hc,{children:[(0,E.jsxs)(Uc,{children:[(0,E.jsx)(`strong`,{children:n(`Not signed in`)}),(0,E.jsx)(`span`,{children:n(`Sign in to record the friend requests VRChat receives.`)})]}),(0,E.jsx)(Wc,{onClick:t,type:`button`,children:n(`Sign in`)})]}),(0,E.jsxs)(Gc,{children:[(0,E.jsxs)(Kc,{children:[(0,E.jsxs)(`div`,{children:[(0,E.jsx)(`h2`,{children:n(`Friend requests`)}),(0,E.jsx)(`p`,{children:i.length===0?n(`Every incoming request is recorded here with the sender's profile.`):n(`{count} recorded · {pending} still pending`,{count:i.length,pending:d})})]}),(0,E.jsxs)(qc,{children:[(0,E.jsx)(Yc,{children:n(`Faded rows are no longer pending`)}),(0,E.jsx)(Jc,{$confirming:c,disabled:i.length===0,onBlur:()=>l(!1),onClick:f,type:`button`,children:n(c?`Confirm clear`:`Clear history`)})]})]}),(0,E.jsxs)(Xc,{children:[(0,E.jsx)(`span`,{}),(0,E.jsx)(`span`,{children:n(`User`)}),(0,E.jsx)(`span`,{children:n(`Trust`)}),(0,E.jsx)(`span`,{children:n(`Pronouns`)}),(0,E.jsx)(`span`,{children:n(`Status`)}),(0,E.jsx)(`span`,{children:n(`Platform`)}),(0,E.jsx)(`span`,{children:n(`Received`)})]}),(0,E.jsx)(Zc,{children:i.length===0?(0,E.jsx)($c,{children:n(`No friend requests recorded yet.`)}):Rc(i,n,r).map(e=>(0,E.jsxs)(`section`,{children:[(0,E.jsx)(Qc,{children:e.day}),e.items.map(e=>(0,E.jsx)(uo,{badge:e.rejected?(0,E.jsx)(el,{children:n(`rejected`)}):void 0,dim:!e.active,now:e.firstSeen,onSelect:s,timeLabel:Bc(e.firstSeen,r),trailing:e.rejected?(0,E.jsx)(tl,{onClick:t=>{t.stopPropagation(),p(e)},type:`button`,children:n(`Undo`)}):void 0,user:e.user},e.id))]},e.day))})]}),o&&(0,E.jsx)(fo,{user:o,now:Date.now(),onClose:()=>s(null)})]})}function Rc(e,t,n){let r=new Map;for(let i of e){let e=zc(i.firstSeen,t,n),a=r.get(e)??[];a.push(i),r.set(e,a)}return[...r].map(([e,t])=>({day:e,items:t}))}function zc(e,t,n){let r=new Date(e);return r.toDateString()===new Date().toDateString()?t(`Today`):r.toLocaleDateString(n,{year:`numeric`,month:`short`,day:`numeric`})}function Bc(e,t){return new Date(e).toLocaleTimeString(t,{hour:`2-digit`,minute:`2-digit`})}var Vc=L.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 14px;
    min-height: 0;
`,Hc=L.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 12px 14px;
    border: 1px solid rgba(251, 191, 36, 0.35);
    border-radius: var(--radius-md);
    background: rgba(251, 191, 36, 0.08);
`,Uc=L.div`
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
`,Wc=L.button`
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
`,Gc=L.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`,Kc=L.div`
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
`,qc=L.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
`,Jc=L.button`
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
`,Yc=L.span`
    flex-shrink: 0;
    font-family: var(--font-mono);
    font-size: 9.5px;
    color: var(--text-muted);
`,Xc=L.div`
    display: grid;
    grid-template-columns: ${Bo(!0)};
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
`,Zc=L.div`
    flex: 1;
    min-height: 0;
    overflow-y: auto;
`,Qc=L.h3`
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
`,$c=L.p`
    padding: 26px 16px;
    text-align: center;
    font-size: 11.5px;
    color: var(--text-muted);
`,el=L.span`
    padding: 1px 6px;
    border-radius: 999px;
    background: rgba(251, 113, 133, 0.14);
    color: #fb7185;
    font-family: var(--font-mono);
    font-size: 9px;
    white-space: nowrap;
`,tl=L.button`
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
`,nl={logDirectory:``,defaultLogDirectory:``,avatarApiProviders:[],autoBlock:!0,autoDisableAvatarInteraction:!0,autoHideChatBox:!0,autoCloseVrchat:!1,skipCloseInVr:!0,autoRejectFriendRequests:!0,threatThreshold:50,whitelist:[],language:`en`,startHidden:!1};async function rl(){return T.available?await T.request(`settings.get`):nl}async function il(e){return T.available?await T.request(`settings.save`,e):{...nl,...e}}async function al(){return T.available?await T.request(`whitelist.people`):[]}var ol=fr`
    from {
        opacity: 0;
        transform: translateY(6px) scale(0.98);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
`,sl=fr`
    from {
        opacity: 0;
        transform: translateY(-6px) scale(0.98);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
`,cl=L.div`
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
    animation: ${({$up:e})=>e?ol:sl} 0.16s cubic-bezier(0.22, 1, 0.36, 1);
`,ll=L.button`
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
`,ul=L.div`
    position: relative;
    display: inline-flex;
`,dl=L.button`
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
`,fl=L.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`,pl=L.span`
    flex-shrink: 0;
    font-size: 0.7em;
    opacity: 0.75;
    transform: rotate(${({$open:e})=>e?`180deg`:`0`});
    transition: transform 0.18s ease;
`;function ml(e,t,n){let[r,i]=(0,_.useState)({});return(0,_.useEffect)(()=>{if(!e)return;let r=()=>{let e=n.current?.getBoundingClientRect();if(!e)return;let r=t?e.top:window.innerHeight-e.bottom;i({maxHeight:Math.max(120,Math.floor(r-10))})};return r(),window.addEventListener(`resize`,r),()=>window.removeEventListener(`resize`,r)},[e,t,n]),r}function hl({value:e,options:t,onChange:n,up:r,disabled:i,title:a}){let[o,s]=(0,_.useState)(!1),c=(0,_.useRef)(null),l=ml(o,r,c);(0,_.useEffect)(()=>{if(!o)return;let e=e=>{c.current?.contains(e.target)||s(!1)},t=e=>{e.key===`Escape`&&s(!1)};return document.addEventListener(`mousedown`,e),document.addEventListener(`keydown`,t),()=>{document.removeEventListener(`mousedown`,e),document.removeEventListener(`keydown`,t)}},[o]);let u=t.find(t=>t.value===e)?.label??e;return(0,E.jsxs)(ul,{ref:c,children:[(0,E.jsxs)(dl,{"aria-expanded":o,"aria-haspopup":`listbox`,disabled:i,onClick:()=>s(e=>!e),title:a,type:`button`,children:[(0,E.jsx)(fl,{children:u}),(0,E.jsx)(pl,{$open:o,children:`▾`})]}),o&&(0,E.jsx)(cl,{$up:r,role:`listbox`,style:l,children:t.map(t=>(0,E.jsx)(ll,{$active:t.value===e,"aria-selected":t.value===e,onClick:()=>{s(!1),n(t.value)},role:`option`,type:`button`,children:t.label},t.value))})]})}var gl=`modulepreload`,_l=function(e){return`/`+e},vl={},U=function(e){return e.pathname.endsWith(`.css`)},yl=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},bl=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=_l(t,n);let r=s(t),i=U(r);return yl(vl,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:gl,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{t.addEventListener(`load`,e),t.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${r}`)))})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},xl=(0,_.lazy)(()=>bl(()=>import(`./AttributionPage-P2ofiWc1.js`).then(e=>({default:e.AttributionPage})),[])),Sl={en:`English`,ja:`日本語`,"zh-CN":`简体中文`,"zh-TW":`繁體中文`},Cl=[{id:`settings-language`,label:`Language`},{id:`settings-startup`,label:`Start with the system`},{id:`settings-log-source`,label:`Log source`},{id:`settings-avatar-lookups`,label:`Avatar name lookups`},{id:`settings-protection`,label:`Automatic protection`},{id:`settings-whitelist`,label:`Whitelist`},{id:`settings-build`,label:`Build`}];function wl({info:e}){let t=D(),[n,r]=(0,_.useState)(``),[i,a]=(0,_.useState)(``),[o,s]=(0,_.useState)([]),[c,l]=(0,_.useState)(``),[u,d]=(0,_.useState)(!0),[f,p]=(0,_.useState)(!0),[m,h]=(0,_.useState)(!0),[g,v]=(0,_.useState)(!1),[y,b]=(0,_.useState)(!0),[x,S]=(0,_.useState)(!0),[C,ee]=(0,_.useState)(50),[w,te]=(0,_.useState)([]),[T,ne]=(0,_.useState)(``),[re,ie]=(0,_.useState)([]),[oe,se]=(0,_.useState)(`en`),[ce,le]=(0,_.useState)([]),[ue,de]=(0,_.useState)(!1),[fe,pe]=(0,_.useState)(null),[me,he]=(0,_.useState)(!1),[O,ge]=(0,_.useState)(!1),[k,_e]=(0,_.useState)(Cl[0].id),[ve,ye]=(0,_.useState)(null),be=(0,_.useRef)(0),A=async e=>{try{let t=await al();ie(t),e<6&&t.some(e=>e.name===e.userId)&&window.setTimeout(()=>void A(e+1),1200)}catch{}};(0,_.useEffect)(()=>{rl().then(e=>{r(e.logDirectory??``),a(e.defaultLogDirectory??``),s(e.avatarApiProviders??[]),d(e.autoBlock),p(e.autoDisableAvatarInteraction),h(e.autoHideChatBox),v(e.autoCloseVrchat),b(e.skipCloseInVr),S(e.autoRejectFriendRequests),ee(e.threatThreshold),te(e.whitelist??[]),se(e.language??`en`),de(e.startHidden),A(0)},()=>ye(t(`Could not read the settings.`)))},[]),(0,_.useEffect)(()=>{ae().then(e=>le(e.available),()=>le([]))},[]),(0,_.useEffect)(()=>{mr().then(pe,()=>pe(null))},[]),(0,_.useEffect)(()=>{let e=Cl.map(e=>document.getElementById(e.id));if(e.some(e=>e===null))return;let t=new IntersectionObserver(e=>{let t=e.filter(e=>e.isIntersecting).sort((e,t)=>e.boundingClientRect.top-t.boundingClientRect.top)[0];t&&_e(t.target.id)},{rootMargin:`-8% 0px -70% 0px`});return e.forEach(e=>t.observe(e)),()=>t.disconnect()},[]);let j=e=>{_e(e),document.getElementById(e)?.scrollIntoView({behavior:`smooth`,block:`start`})},xe=n.trim(),Se=(e={})=>({logDirectory:xe,avatarApiProviders:o.map(e=>e.trim()).filter(e=>e.length>0),autoBlock:u,autoDisableAvatarInteraction:f,autoHideChatBox:m,autoCloseVrchat:g,skipCloseInVr:y,autoRejectFriendRequests:x,threatThreshold:C,whitelist:w,language:oe,startHidden:ue,...e}),M=async(e={},t=!1)=>{ye(null);try{let n=await il(Se(e));te(n.whitelist??[]),t&&A(0)}catch(e){ye(e instanceof Error?e.message:String(e))}},Ce=e=>{se(e),M({language:e})},we=async e=>{he(!0),ye(null);try{pe(await hr(e))}catch(e){ye(e instanceof Error?e.message:String(e))}finally{he(!1)}},N=async()=>{ye(null);try{await ii()}catch(e){ye(e instanceof Error?e.message:String(e))}},Te=e=>{ee(e),window.clearTimeout(be.current),be.current=window.setTimeout(()=>void M({threatThreshold:e}),400)},P=()=>{let e=c.trim();if(e.length===0||o.includes(e))return;let t=[...o,e];s(t),l(``),M({avatarApiProviders:t})},Ee=e=>{let t=o.filter((t,n)=>n!==e);s(t),M({avatarApiProviders:t})},F=()=>{let e=T.trim();if(e.length===0||w.includes(e))return;let t=[...w,e];te(t),ne(``),M({whitelist:t},!0)},De=e=>{let t=w.filter(t=>t!==e);te(t),M({whitelist:t},!0)};return(0,E.jsxs)(El,{children:[(0,E.jsxs)(kl,{children:[(0,E.jsxs)(Al,{id:`settings-language`,children:[(0,E.jsx)(jl,{children:(0,E.jsx)(`h2`,{children:t(`Language`)})}),(0,E.jsx)(Ml,{children:(0,E.jsxs)(Nl,{children:[(0,E.jsx)(Rl,{children:t(`Language`)}),(0,E.jsx)(hl,{onChange:e=>void Ce(e),options:ce.map(e=>({value:e,label:Sl[e]??e})),value:oe}),(0,E.jsx)(Bl,{children:t(`Language used by both the interface and the desktop backend.`)})]})})]}),(0,E.jsxs)(Al,{id:`settings-startup`,children:[(0,E.jsx)(jl,{children:(0,E.jsx)(`h2`,{children:t(`Start with the system`)})}),(0,E.jsx)(Ml,{children:(0,E.jsxs)(ql,{children:[(0,E.jsx)(Tl,{checked:fe?.enabled??!1,disabled:me||!fe?.supported,hint:t(`Create an autostart entry for this user.`),onChange:e=>void we(e),title:t(`Start with the system`)}),(0,E.jsx)(Tl,{checked:ue,hint:t(`Open in the tray instead of showing the window.`),onChange:e=>{de(e),M({startHidden:e})},title:t(`Start hidden`)})]})})]}),(0,E.jsxs)(Al,{id:`settings-log-source`,children:[(0,E.jsx)(jl,{children:(0,E.jsx)(`h2`,{children:t(`Log source`)})}),(0,E.jsxs)(Ml,{children:[(0,E.jsxs)(Nl,{children:[(0,E.jsx)(Rl,{children:t(`VRChat log folder`)}),(0,E.jsx)(Pl,{children:(0,E.jsx)(Ll,{"aria-label":t(`VRChat log folder`),onBlur:()=>void M(),onChange:e=>r(e.target.value),placeholder:t(`VRChat's log folder`),spellCheck:!1,value:n})}),(0,E.jsx)(Bl,{children:t(`The newest log in this folder is followed while VRChat is running. Nothing is read while it is closed.`)})]}),(0,E.jsxs)(Vl,{children:[(0,E.jsxs)(Hl,{disabled:!ei,onClick:N,type:`button`,children:[(0,E.jsx)(Cr,{}),t(`Open folder`)]}),(0,E.jsx)(Hl,{disabled:!i||xe===i,onClick:()=>{r(i),M({logDirectory:i})},type:`button`,children:t(`Use VRChat's folder`)})]})]})]}),(0,E.jsxs)(Al,{id:`settings-avatar-lookups`,children:[(0,E.jsx)(jl,{children:(0,E.jsx)(`h2`,{children:t(`Avatar name lookups`)})}),(0,E.jsx)(Ml,{children:(0,E.jsxs)(Nl,{children:[(0,E.jsx)(Rl,{children:t(`API endpoints`)}),(0,E.jsxs)(Bl,{children:[t(`Tried in order; the first name wins. Each is called as`),(0,E.jsx)(`code`,{children:` ?fileId=file_…`}),` `,t(`and must answer with JSON containing a`),(0,E.jsx)(`code`,{children:` name`}),`.`]}),(0,E.jsxs)(Fl,{children:[o.length===0&&(0,E.jsx)(Il,{children:t(`No endpoint; avatar names stay unknown.`)}),o.map((e,n)=>(0,E.jsxs)(Pl,{children:[(0,E.jsx)(Ll,{"aria-label":t(`Avatar API endpoint`),onBlur:()=>void M(),onChange:e=>{let t=[...o];t[n]=e.target.value,s(t)},spellCheck:!1,value:e}),(0,E.jsx)(Hl,{"aria-label":t(`Remove endpoint`),onClick:()=>Ee(n),type:`button`,children:(0,E.jsx)(Sr,{})})]},`${e}-${n}`))]}),(0,E.jsxs)(Pl,{children:[(0,E.jsx)(Ll,{"aria-label":t(`New avatar API endpoint`),onChange:e=>l(e.target.value),placeholder:`https://example.com/avatars`,spellCheck:!1,value:c}),(0,E.jsx)(Hl,{disabled:c.trim().length===0,onClick:P,type:`button`,children:t(`Add`)})]})]})})]}),(0,E.jsxs)(Al,{id:`settings-protection`,children:[(0,E.jsx)(jl,{children:(0,E.jsx)(`h2`,{children:t(`Automatic protection`)})}),(0,E.jsxs)(Ml,{children:[(0,E.jsxs)(Nl,{children:[(0,E.jsx)(Rl,{children:t(`Threat threshold`)}),(0,E.jsxs)(Pl,{children:[(0,E.jsx)(Gl,{max:100,min:0,onChange:e=>Te(Number(e.target.value)),step:5,type:`range`,value:C}),(0,E.jsxs)(Kl,{children:[C,`%`]})]}),(0,E.jsx)(Bl,{children:t(`At or above this score the actions below run. Friends and whitelisted users are never acted on.`)})]}),(0,E.jsxs)(ql,{children:[(0,E.jsx)(Tl,{checked:u,hint:t(`VRChat block: their avatar and interactions are hidden.`),onChange:e=>{d(e),M({autoBlock:e})},title:t(`Block the user`)}),(0,E.jsx)(Tl,{checked:f,hint:t(`Turn avatar interactions off for the user.`),onChange:e=>{p(e),M({autoDisableAvatarInteraction:e})},title:t(`Disable avatar interactions`)}),(0,E.jsx)(Tl,{checked:m,hint:t(`Mute the user's chat box.`),onChange:e=>{h(e),M({autoHideChatBox:e})},title:t(`Hide the chat box`)}),(0,E.jsx)(Tl,{checked:g,hint:t(`Close VRChat when a high-threat user appears. Leaving the instance is the only way to stop an avatar download in time.`),onChange:e=>{v(e),M({autoCloseVrchat:e})},title:t(`Close VRChat`)}),(0,E.jsx)(Tl,{checked:y,disabled:!g,hint:t(`Do not close VRChat while a VR headset is in use; quitting from VR is disruptive.`),onChange:e=>{b(e),M({skipCloseInVr:e})},title:t(`Skip while in VR`)}),(0,E.jsx)(Tl,{checked:x,hint:t(`Hide friend requests from high-threat users; undo from the request list.`),onChange:e=>{S(e),M({autoRejectFriendRequests:e})},title:t(`Reject friend requests`)})]})]})]}),(0,E.jsxs)(Al,{id:`settings-whitelist`,children:[(0,E.jsx)(jl,{children:(0,E.jsx)(`h2`,{children:t(`Whitelist`)})}),(0,E.jsxs)(Ml,{children:[(0,E.jsxs)(Nl,{children:[(0,E.jsx)(Rl,{children:t(`Add a user`)}),(0,E.jsxs)(Pl,{children:[(0,E.jsx)(Ll,{"aria-label":t(`Whitelisted user id`),onChange:e=>ne(e.target.value),placeholder:`usr_…`,spellCheck:!1,value:T}),(0,E.jsx)(Hl,{disabled:T.trim().length===0,onClick:F,type:`button`,children:t(`Add`)})]}),(0,E.jsx)(Bl,{children:t(`Paste a VRChat user id. Whitelisted users get a white row and no automatic action.`)})]}),(0,E.jsxs)(Zl,{children:[w.length===0&&(0,E.jsx)(Il,{children:t(`Nobody is whitelisted.`)}),w.map(e=>{let n=re.find(t=>t.userId===e);return(0,E.jsxs)(Ql,{children:[(0,E.jsx)($l,{$src:n?.iconUrl??n?.avatarUrl}),(0,E.jsxs)(eu,{children:[(0,E.jsx)(`strong`,{children:n?.name??e}),(0,E.jsx)(`span`,{children:n?.trust??e})]}),(0,E.jsx)(Hl,{"aria-label":t(`Remove from whitelist`),onClick:()=>De(e),type:`button`,children:(0,E.jsx)(Sr,{})})]},e)})]})]})]}),ve&&(0,E.jsx)(Ul,{children:ve}),(0,E.jsxs)(Al,{id:`settings-build`,children:[(0,E.jsx)(jl,{children:(0,E.jsx)(`h2`,{children:t(`Build`)})}),(0,E.jsx)(Ml,{children:(0,E.jsxs)(Nl,{children:[(0,E.jsx)(Rl,{children:t(`Version`)}),(0,E.jsx)(zl,{$mono:!0,children:e?`v${e.version} · ${e.platform}`:t(`browser preview`)}),(0,E.jsx)(Bl,{children:t(`Read from the executable the interface is running in.`)})]})})]}),(0,E.jsx)(Wl,{onClick:()=>ge(!0),type:`button`,children:t(`Open source attribution`)}),(0,E.jsx)(_.Suspense,{fallback:null,children:O&&(0,E.jsx)(xl,{onClose:()=>ge(!1)})})]}),(0,E.jsx)(Dl,{children:Cl.map(e=>(0,E.jsx)(Ol,{$active:k===e.id,onClick:()=>j(e.id),type:`button`,children:t(e.label)},e.id))})]})}function Tl({checked:e,onChange:t,title:n,hint:r,disabled:i=!1}){return(0,E.jsxs)(Jl,{children:[(0,E.jsxs)(Yl,{children:[(0,E.jsx)(`input`,{checked:e,disabled:i,onChange:e=>t(e.target.checked),type:`checkbox`}),(0,E.jsx)(`span`,{children:n})]}),(0,E.jsx)(Xl,{children:r})]})}var El=L.div`
    display: flex;
    align-items: flex-start;
    gap: 20px;
    max-width: 960px;
`,Dl=L.nav`
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
`,Ol=L.button`
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
`,kl=L.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    max-width: 760px;
    min-width: 0;
`,Al=L.section`
    display: flex;
    flex-direction: column;
    gap: 10px;
    scroll-margin-top: 24px;
`,jl=L.div`
    h2 {
        font-size: 13px;
        font-weight: 600;
    }
`,Ml=L.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 18px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`,Nl=L.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`,Pl=L.div`
    display: flex;
    align-items: center;
    gap: 8px;
`,Fl=L.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`,Il=L.span`
    font-size: 11px;
    color: var(--text-muted);
`,Ll=L.input`
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
`,Rl=L.span`
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
`,zl=L.span`
    font-family: ${({$mono:e})=>e?`var(--font-mono)`:`var(--font-sans)`};
    font-size: 12px;
    color: var(--text-primary);
    overflow-wrap: anywhere;
`,Bl=L.span`
    font-size: 10px;
    line-height: 1.5;
    color: var(--text-muted);

    code {
        font-family: var(--font-mono);
    }
`,Vl=L.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`,Hl=L.button`
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
`,Ul=L.span`
    color: var(--danger);
    font-size: 11px;
`,Wl=L.button`
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
`,Gl=L.input`
    flex: 1;
    accent-color: var(--accent-primary);
`,Kl=L.strong`
    width: 48px;
    text-align: right;
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--accent-primary);
`,ql=L.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`,Jl=L.label`
    display: flex;
    flex-direction: column;
    gap: 2px;
    cursor: pointer;
`,Yl=L.span`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;

    input {
        accent-color: var(--accent-primary);
    }
`,Xl=L.span`
    padding-left: 24px;
    font-size: 10.5px;
    color: var(--text-muted);
`,Zl=L.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`,Ql=L.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 8px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: rgba(255, 255, 255, 0.05);
`,$l=L.span`
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    border-radius: 50%;
    background: var(--bg-primary) center / cover no-repeat;
    background-image: ${({$src:e})=>e?`url("${e}")`:`none`};
    box-shadow: inset 0 0 0 1px var(--border-color);
`,eu=L.div`
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
`,tu={logs:{title:`VRChat log`,subtitle:`Live output of VRChat's log while it is running.`},instance:{title:`Instance`,subtitle:`Players in your VRChat instance, from the API once signed in.`},requests:{title:`Friend requests`,subtitle:`Every incoming request AntiBot has recorded, with the sender's profile.`},operations:{title:`Operations`,subtitle:`The automatic actions AntiBot has taken, newest first.`},account:{title:`Account`,subtitle:`Sign in to VRChat so the instance comes from the API, not the log.`},settings:{title:`Settings`,subtitle:`Where the log comes from, and what AntiBot does with it.`},debug:{title:`Debug`,subtitle:`Tools that only a debug build shows.`}};function nu(){let e=D(),[t,n]=(0,_.useState)(`logs`),[r,i]=(0,_.useState)(null),a=pe(),o=si(),{auth:s,ready:c}=Ci(),l=s.state===`loggedIn`;(0,_.useEffect)(()=>{pr().then(i,()=>i(null))},[]),(0,_.useEffect)(()=>{let e=window.setTimeout(()=>T.send({type:`app.ready`}),200);return()=>window.clearTimeout(e)},[]),(0,_.useEffect)(()=>T.on(e=>{if(e.type!==`app.navigate`)return;let t=e.data?.page;t&&n(t)}),[]);let{title:u,subtitle:d}=tu[t];return(0,E.jsxs)(ru,{$rounded:a,children:[(0,E.jsx)(qr,{}),(0,E.jsxs)(iu,{children:[(0,E.jsx)(Rr,{debug:r?.debug??!1,onNavigate:n,page:t,status:o.status}),(0,E.jsxs)(au,{children:[(0,E.jsxs)(W,{children:[(0,E.jsxs)(ou,{children:[(0,E.jsx)(`h1`,{children:e(u)}),(0,E.jsx)(`p`,{children:e(d)})]}),(0,E.jsx)(su,{children:!l&&(0,E.jsx)(cu,{onClick:()=>n(`account`),type:`button`,children:e(`Not signed in · only the log is available`)})})]}),(0,E.jsx)(lu,{$flush:t!==`settings`,children:t===`logs`?(0,E.jsx)(Fs,{log:o}):t===`instance`?(0,E.jsx)(lo,{signedIn:l,onSignIn:()=>n(`account`)}):t===`requests`?(0,E.jsx)(Lc,{signedIn:l,onSignIn:()=>n(`account`)}):t===`operations`?(0,E.jsx)(uc,{}):t===`account`?(0,E.jsx)(wi,{initial:s,ready:c}):t===`debug`?(0,E.jsx)(Ha,{}):(0,E.jsx)(wl,{info:r})}),(0,E.jsx)(uu,{children:(0,E.jsx)(`span`,{children:r?`v${r.version} · ${r.platform}`:e(`browser preview`)})})]})]}),(0,E.jsx)(he,{})]})}var ru=L.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    background: var(--bg-primary);

    /* An undecorated window gets no frame from the compositor, so the corners are drawn here. */
    border-radius: ${({$rounded:e})=>e?`10px`:`0`};
    box-shadow: ${({$rounded:e})=>e?`inset 0 0 0 1px var(--border-color)`:`none`};
`,iu=L.div`
    display: flex;
    flex: 1;
    min-height: 0;
    background: radial-gradient(1100px 620px at 18% -10%, rgba(139, 92, 246, 0.12), transparent 60%),
    radial-gradient(900px 500px at 110% 15%, rgba(99, 102, 241, 0.12), transparent 55%),
    var(--bg-primary);
`,au=L.main`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
`,W=L.header`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
    padding: 22px 26px 16px;
    border-bottom: 1px solid var(--border-color);
`,ou=L.div`
    display: flex;
    flex-direction: column;
    gap: 3px;

    h1 {
        font-size: 20px;
        font-weight: 600;
        letter-spacing: -0.02em;
    }

    p {
        font-size: 12px;
        color: var(--text-secondary);
    }
`,su=L.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding-top: 4px;
`,cu=L.button`
    display: flex;
    align-items: center;
    gap: 7px;
    padding: 6px 10px;
    border: 1px solid rgba(251, 191, 36, 0.45);
    border-radius: 999px;
    background: rgba(251, 191, 36, 0.12);
    color: #fbbf24;
    font-family: var(--font-mono);
    font-size: 10px;
    white-space: nowrap;
    cursor: pointer;

    &:hover {
        background: rgba(251, 191, 36, 0.2);
    }
`,lu=L.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
    padding: ${({$flush:e})=>e?`16px 26px 18px`:`22px 30px 30px`};
    overflow: ${({$flush:e})=>e?`hidden`:`auto`};
`,uu=L.footer`
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    padding: 7px 26px;
    border-top: 1px solid var(--border-color);
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-muted);

    span {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`,du=document.getElementById(`root`);du&&(0,v.createRoot)(du).render((0,E.jsx)(_.StrictMode,{children:(0,E.jsx)(le,{children:(0,E.jsx)(nu,{})})}));export{c as a,u as i,D as n,re as r,L as t};