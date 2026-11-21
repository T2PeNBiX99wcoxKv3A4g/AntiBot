var e=Object.create,t=Object.defineProperty,n=Object.getOwnPropertyDescriptor,r=Object.getOwnPropertyNames,i=Object.getPrototypeOf,a=Object.prototype.hasOwnProperty,o=(e,t)=>()=>(t||(e((t={exports:{}}).exports,t,t.exports),e=null),t.exports),s=(e,i,o,s)=>{if(i&&typeof i==`object`||typeof i==`function`)for(var c=r(i),l=0,u=c.length,d;l<u;l++)d=c[l],!a.call(e,d)&&d!==o&&t(e,d,{get:(e=>i[e]).bind(null,d),enumerable:!(s=n(i,d))||s.enumerable});return e},c=(n,r,o)=>(o=n==null?{}:e(i(n)),s(r||!n||!n.__esModule||!a.call(n,`default`)?t(o,`default`,{value:n,enumerable:!0}):o,n));(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var l=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.portal`),r=Symbol.for(`react.fragment`),i=Symbol.for(`react.strict_mode`),a=Symbol.for(`react.profiler`),o=Symbol.for(`react.consumer`),s=Symbol.for(`react.context`),c=Symbol.for(`react.forward_ref`),l=Symbol.for(`react.suspense`),u=Symbol.for(`react.memo`),d=Symbol.for(`react.lazy`),f=Symbol.for(`react.activity`),p=Symbol.for(`react.view_transition`),m=Symbol.iterator;function h(e){return typeof e!=`object`||!e?null:(e=m&&e[m]||e[`@@iterator`],typeof e==`function`?e:null)}var g={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},_=Object.assign,v={};function y(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}y.prototype.isReactComponent={},y.prototype.setState=function(e,t){if(typeof e!=`object`&&typeof e!=`function`&&e!=null)throw Error(`takes an object of state variables to update or a function which returns an object of state variables.`);this.updater.enqueueSetState(this,e,t,`setState`)},y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,`forceUpdate`)};function b(){}b.prototype=y.prototype;function x(e,t,n){this.props=e,this.context=t,this.refs=v,this.updater=n||g}var S=x.prototype=new b;S.constructor=x,_(S,y.prototype),S.isPureReactComponent=!0;var C=Array.isArray;function ee(){}var w={H:null,A:null,T:null,S:null},te=Object.prototype.hasOwnProperty;function T(e,n,r){var i=r.ref;return{$$typeof:t,type:e,key:n,ref:i===void 0?null:i,props:r}}function ne(e,t){return T(e.type,t,e.props)}function E(e){return typeof e==`object`&&!!e&&e.$$typeof===t}function re(e){var t={"=":`=0`,":":`=2`};return`$`+e.replace(/[=:]/g,function(e){return t[e]})}var ie=/\/+/g;function ae(e,t){return typeof e==`object`&&e&&e.key!=null?re(``+e.key):t.toString(36)}function oe(e){switch(e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason;default:switch(typeof e.status==`string`?e.then(ee,ee):(e.status=`pending`,e.then(function(t){e.status===`pending`&&(e.status=`fulfilled`,e.value=t)},function(t){e.status===`pending`&&(e.status=`rejected`,e.reason=t)})),e.status){case`fulfilled`:return e.value;case`rejected`:throw e.reason}}throw e}function se(e,r,i,a,o){var s=typeof e;(s===`undefined`||s===`boolean`)&&(e=null);var c=!1;if(e===null)c=!0;else switch(s){case`bigint`:case`string`:case`number`:c=!0;break;case`object`:switch(e.$$typeof){case t:case n:c=!0;break;case d:return c=e._init,se(c(e._payload),r,i,a,o)}}if(c)return o=o(e),c=a===``?`.`+ae(e,0):a,C(o)?(i=``,c!=null&&(i=c.replace(ie,`$&/`)+`/`),se(o,r,i,``,function(e){return e})):o!=null&&(E(o)&&(o=ne(o,i+(o.key==null||e&&e.key===o.key?``:(``+o.key).replace(ie,`$&/`)+`/`)+c)),r.push(o)),1;c=0;var l=a===``?`.`:a+`:`;if(C(e))for(var u=0;u<e.length;u++)a=e[u],s=l+ae(a,u),c+=se(a,r,i,s,o);else if(u=h(e),typeof u==`function`)for(e=u.call(e),u=0;!(a=e.next()).done;)a=a.value,s=l+ae(a,u++),c+=se(a,r,i,s,o);else if(s===`object`){if(typeof e.then==`function`)return se(oe(e),r,i,a,o);throw r=String(e),Error(`Objects are not valid as a React child (found: `+(r===`[object Object]`?`object with keys {`+Object.keys(e).join(`, `)+`}`:r)+`). If you meant to render a collection of children, use an array instead.`)}return c}function ce(e,t,n){if(e==null)return e;var r=[],i=0;return se(e,r,``,``,function(e){return t.call(n,e,i++)}),r}function le(e){if(e._status===-1){var t=e._result,n=t();n.then(function(t){(e._status===0||e._status===-1)&&(e._status=1,e._result=t,n.status===void 0&&(n.status=`fulfilled`,n.value=t))},function(t){(e._status===0||e._status===-1)&&(e._status=2,e._result=t,n.status===void 0&&(n.status=`rejected`,n.reason=t))}),e._status===-1&&(e._status=0,e._result=n)}if(e._status===1)return e._result.default;throw e._result}var ue=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)};function D(e){var t=w.T,n={};n.types=t===null?null:t.types,w.T=n;try{var r=e(),i=w.S;i!==null&&i(n,r),typeof r==`object`&&r&&typeof r.then==`function`&&r.then(ee,ue)}catch(e){ue(e)}finally{t!==null&&n.types!==null&&(t.types=n.types),w.T=t}}function de(e){var t=w.T;if(t!==null){var n=t.types;n===null?t.types=[e]:n.indexOf(e)===-1&&n.push(e)}else D(de.bind(null,e))}var fe={map:ce,forEach:function(e,t,n){ce(e,function(){t.apply(this,arguments)},n)},count:function(e){var t=0;return ce(e,function(){t++}),t},toArray:function(e){return ce(e,function(e){return e})||[]},only:function(e){if(!E(e))throw Error(`React.Children.only expected to receive a single React element child.`);return e}};e.Activity=f,e.Children=fe,e.Component=y,e.Fragment=r,e.Profiler=a,e.PureComponent=x,e.StrictMode=i,e.Suspense=l,e.ViewTransition=p,e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=w,e.__COMPILER_RUNTIME={__proto__:null,c:function(e){return w.H.useMemoCache(e)}},e.addTransitionType=de,e.cache=function(e){return function(){return e.apply(null,arguments)}},e.cacheSignal=function(){return null},e.cloneElement=function(e,t,n){if(e==null)throw Error(`The argument must be a React element, but you passed `+e+`.`);var r=_({},e.props),i=e.key;if(t!=null)for(a in t.key!==void 0&&(i=``+t.key),t)!te.call(t,a)||a===`key`||a===`__self`||a===`__source`||a===`ref`&&t.ref===void 0||(r[a]=t[a]);var a=arguments.length-2;if(a===1)r.children=n;else if(1<a){for(var o=Array(a),s=0;s<a;s++)o[s]=arguments[s+2];r.children=o}return T(e.type,i,r)},e.createContext=function(e){return e={$$typeof:s,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null},e.Provider=e,e.Consumer={$$typeof:o,_context:e},e},e.createElement=function(e,t,n){var r,i={},a=null;if(t!=null)for(r in t.key!==void 0&&(a=``+t.key),t)te.call(t,r)&&r!==`key`&&r!==`__self`&&r!==`__source`&&(i[r]=t[r]);var o=arguments.length-2;if(o===1)i.children=n;else if(1<o){for(var s=Array(o),c=0;c<o;c++)s[c]=arguments[c+2];i.children=s}if(e&&e.defaultProps)for(r in o=e.defaultProps,o)i[r]===void 0&&(i[r]=o[r]);return T(e,a,i)},e.createRef=function(){return{current:null}},e.forwardRef=function(e){return{$$typeof:c,render:e}},e.isValidElement=E,e.lazy=function(e){return{$$typeof:d,_payload:{_status:-1,_result:e},_init:le}},e.memo=function(e,t){return{$$typeof:u,type:e,compare:t===void 0?null:t}},e.startTransition=D,e.unstable_useCacheRefresh=function(){return w.H.useCacheRefresh()},e.use=function(e){return w.H.use(e)},e.useActionState=function(e,t,n){return w.H.useActionState(e,t,n)},e.useCallback=function(e,t){return w.H.useCallback(e,t)},e.useContext=function(e){return w.H.useContext(e)},e.useDebugValue=function(){},e.useDeferredValue=function(e,t){return w.H.useDeferredValue(e,t)},e.useEffect=function(e,t){return w.H.useEffect(e,t)},e.useEffectEvent=function(e){return w.H.useEffectEvent(e)},e.useId=function(){return w.H.useId()},e.useImperativeHandle=function(e,t,n){return w.H.useImperativeHandle(e,t,n)},e.useInsertionEffect=function(e,t){return w.H.useInsertionEffect(e,t)},e.useLayoutEffect=function(e,t){return w.H.useLayoutEffect(e,t)},e.useMemo=function(e,t){return w.H.useMemo(e,t)},e.useOptimistic=function(e,t){return w.H.useOptimistic(e,t)},e.useReducer=function(e,t,n){return w.H.useReducer(e,t,n)},e.useRef=function(e){return w.H.useRef(e)},e.useState=function(e){return w.H.useState(e)},e.useSyncExternalStore=function(e,t,n){return w.H.useSyncExternalStore(e,t,n)},e.useTransition=function(){return w.H.useTransition()},e.version=`19.3.1`})),u=o(((e,t)=>{t.exports=l()})),d=o((e=>{function t(e,t){var n=e.length;e.push(t);a:for(;0<n;){var r=n-1>>>1,a=e[r];if(0<i(a,t))e[r]=t,e[n]=a,n=r;else break a}}function n(e){return e.length===0?null:e[0]}function r(e){if(e.length===0)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;a:for(var r=0,a=e.length,o=a>>>1;r<o;){var s=2*(r+1)-1,c=e[s],l=s+1,u=e[l];if(0>i(c,n))l<a&&0>i(u,c)?(e[r]=u,e[l]=n,r=l):(e[r]=c,e[s]=n,r=s);else if(l<a&&0>i(u,n))e[r]=u,e[l]=n,r=l;else break a}}return t}function i(e,t){var n=e.sortIndex-t.sortIndex;return n===0?e.id-t.id:n}if(e.unstable_now=void 0,typeof performance==`object`&&typeof performance.now==`function`){var a=performance;e.unstable_now=function(){return a.now()}}else{var o=Date,s=o.now();e.unstable_now=function(){return o.now()-s}}var c=[],l=[],u=1,d=null,f=3,p=!1,m=!1,h=!1,g=!1,_=typeof setTimeout==`function`?setTimeout:null,v=typeof clearTimeout==`function`?clearTimeout:null,y=typeof setImmediate<`u`?setImmediate:null;function b(e){for(var i=n(l);i!==null;){if(i.callback===null)r(l);else if(i.startTime<=e)r(l),i.sortIndex=i.expirationTime,t(c,i);else break;i=n(l)}}function x(e){if(h=!1,b(e),!m){if(n(c)!==null)m=!0,S||(S=!0,ne());else{var t=n(l);t!==null&&ie(x,t.startTime-e)}}}var S=!1,C=-1,ee=5,w=-1;function te(){return g?!0:!(e.unstable_now()-w<ee)}function T(){if(g=!1,S){var t=e.unstable_now();w=t;var i=!0;try{a:{m=!1,h&&(h=!1,v(C),C=-1),p=!0;var a=f;try{b:{for(b(t),d=n(c);d!==null&&!(d.expirationTime>t&&te());){var o=d.callback;if(typeof o==`function`){d.callback=null,f=d.priorityLevel;var s=o(d.expirationTime<=t);if(t=e.unstable_now(),typeof s==`function`){d.callback=s,b(t),i=!0;break b}d===n(c)&&r(c),b(t)}else r(c);d=n(c)}if(d!==null)i=!0;else{var u=n(l);u!==null&&ie(x,u.startTime-t),i=!1}}break a}finally{d=null,f=a,p=!1}i=void 0}}finally{i?ne():S=!1}}}var ne;if(typeof y==`function`)ne=function(){y(T)};else if(typeof MessageChannel<`u`){var E=new MessageChannel,re=E.port2;E.port1.onmessage=T,ne=function(){re.postMessage(null)}}else ne=function(){_(T,0)};function ie(t,n){C=_(function(){t(e.unstable_now())},n)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(e){e.callback=null},e.unstable_forceFrameRate=function(e){0>e||125<e?console.error(`forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported`):ee=0<e?Math.floor(1e3/e):5},e.unstable_getCurrentPriorityLevel=function(){return f},e.unstable_next=function(e){switch(f){case 1:case 2:case 3:var t=3;break;default:t=f}var n=f;f=t;try{return e()}finally{f=n}},e.unstable_requestPaint=function(){g=!0},e.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=f;f=e;try{return t()}finally{f=n}},e.unstable_scheduleCallback=function(r,i,a){var o=e.unstable_now();switch(typeof a==`object`&&a?(a=a.delay,a=typeof a==`number`&&0<a?o+a:o):a=o,r){case 1:var s=-1;break;case 2:s=250;break;case 5:s=1073741823;break;case 4:s=1e4;break;default:s=5e3}return s=a+s,r={id:u++,callback:i,priorityLevel:r,startTime:a,expirationTime:s,sortIndex:-1},a>o?(r.sortIndex=a,t(l,r),n(c)===null&&r===n(l)&&(h?(v(C),C=-1):h=!0,ie(x,a-o))):(r.sortIndex=s,t(c,r),m||p||(m=!0,S||(S=!0,ne()))),r},e.unstable_shouldYield=te,e.unstable_wrapCallback=function(e){var t=f;return function(){var n=f;f=t;try{return e.apply(this,arguments)}finally{f=n}}}})),f=o(((e,t)=>{t.exports=d()})),p=o((e=>{var t=u();function n(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function r(){}var i={d:{f:r,r:function(){throw Error(n(522))},D:r,C:r,L:r,m:r,X:r,S:r,M:r},p:0,findDOMNode:null},a=Symbol.for(`react.portal`),o=Symbol.for(`react.recoverable`),s=Symbol.for(`react.optimistic_key`);function c(e,t,n){var r=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:a,key:r==null?null:r===s?s:``+r,children:e,containerInfo:t,implementation:n}}var l=t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;function d(e,t){if(e===`font`)return``;if(typeof t==`string`)return t===`use-credentials`?t:``}e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE=i,e.browser=function(e){return{$$typeof:o,_reason:e}},e.createPortal=function(e,t){var r=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)throw Error(n(299));return c(e,t,null,r)},e.flushSync=function(e){var t=l.T,n=i.p;try{if(l.T=null,i.p=2,e)return e()}finally{l.T=t,i.p=n,i.d.f()}},e.preconnect=function(e,t){typeof e==`string`&&(t?(t=t.crossOrigin,t=typeof t==`string`?t===`use-credentials`?t:``:void 0):t=null,i.d.C(e,t))},e.prefetchDNS=function(e){typeof e==`string`&&i.d.D(e)},e.preinit=function(e,t){if(typeof e==`string`&&t&&typeof t.as==`string`){var n=t.as,r=d(n,t.crossOrigin),a=typeof t.integrity==`string`?t.integrity:void 0,o=typeof t.fetchPriority==`string`?t.fetchPriority:void 0;n===`style`?i.d.S(e,typeof t.precedence==`string`?t.precedence:void 0,{crossOrigin:r,integrity:a,fetchPriority:o}):n===`script`&&i.d.X(e,{crossOrigin:r,integrity:a,fetchPriority:o,nonce:typeof t.nonce==`string`?t.nonce:void 0})}},e.preinitModule=function(e,t){if(typeof e==`string`){if(typeof t==`object`&&t){if(t.as==null||t.as===`script`){var n=d(t.as,t.crossOrigin);i.d.M(e,{crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}}else t??i.d.M(e)}},e.preload=function(e,t){if(typeof e==`string`&&typeof t==`object`&&t&&typeof t.as==`string`){var n=t.as,r=d(n,t.crossOrigin);i.d.L(e,n,{crossOrigin:r,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,type:typeof t.type==`string`?t.type:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0,referrerPolicy:typeof t.referrerPolicy==`string`?t.referrerPolicy:void 0,imageSrcSet:typeof t.imageSrcSet==`string`?t.imageSrcSet:void 0,imageSizes:typeof t.imageSizes==`string`?t.imageSizes:void 0,media:typeof t.media==`string`?t.media:void 0})}},e.preloadModule=function(e,t){if(typeof e==`string`){if(t){var n=d(t.as,t.crossOrigin);i.d.m(e,{as:typeof t.as==`string`&&t.as!==`script`?t.as:void 0,crossOrigin:n,integrity:typeof t.integrity==`string`?t.integrity:void 0,nonce:typeof t.nonce==`string`?t.nonce:void 0,fetchPriority:typeof t.fetchPriority==`string`?t.fetchPriority:void 0})}else i.d.m(e)}},e.requestFormReset=function(e){i.d.r(e)},e.unstable_batchedUpdates=function(e,t){return e(t)},e.useFormState=function(e,t,n){return l.H.useFormState(e,t,n)},e.useFormStatus=function(){return l.H.useHostTransitionStatus()},e.version=`19.3.1`})),m=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=p()})),h=o((e=>{var t=f(),n=u(),r=m();function i(e){var t=`https://react.dev/errors/`+e;if(1<arguments.length){t+=`?args[]=`+encodeURIComponent(arguments[1]);for(var n=2;n<arguments.length;n++)t+=`&args[]=`+encodeURIComponent(arguments[n])}return`Minified React error #`+e+`; visit `+t+` for the full message or use the non-minified dev environment for full errors and additional helpful warnings.`}function a(e){return!(!e||e.nodeType!==1&&e.nodeType!==9&&e.nodeType!==11)}function o(e){for(var t=e,n=t;n&&!n.alternate;)t=n,t.flags&4098&&(e=t.return),n=t.return;for(;t.return;)t=t.return;return t.tag===3?e:null}function s(e){if(e.tag===13){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function c(e){if(e.tag===31){var t=e.memoizedState;if(t===null&&(e=e.alternate,e!==null&&(t=e.memoizedState)),t!==null)return t.dehydrated}return null}function l(e){if(o(e)!==e)throw Error(i(188))}function d(e){var t=e.alternate;if(!t){if(t=o(e),t===null)throw Error(i(188));return t===e?e:null}for(var n=e,r=t;;){var a=n.return;if(a===null)break;var s=a.alternate;if(s===null){if(r=a.return,r!==null){n=r;continue}break}if(a.child===s.child){for(s=a.child;s;){if(s===n)return l(a),e;if(s===r)return l(a),t;s=s.sibling}throw Error(i(188))}if(n.return!==r.return)n=a,r=s;else{for(var c=!1,u=a.child;u;){if(u===n){c=!0,n=a,r=s;break}if(u===r){c=!0,r=a,n=s;break}u=u.sibling}if(!c){for(u=s.child;u;){if(u===n){c=!0,n=s,r=a;break}if(u===r){c=!0,r=s,n=a;break}u=u.sibling}if(!c)throw Error(i(189))}}if(n.alternate!==r)throw Error(i(190))}if(n.tag!==3)throw Error(i(188));return n.stateNode.current===n?e:t}function p(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e;for(e=e.child;e!==null;){if(t=p(e),t!==null)return t;e=e.sibling}return null}function h(e,t,n,r,i,a){for(;e!==null;){if((e.tag===5||e.tag===27||e.tag===6)&&n(e,r,i,a)||(e.tag!==22||e.memoizedState===null)&&(t||e.tag!==5&&e.tag!==27)&&h(e.child,t,n,r,i,a))return!0;e=e.sibling}return!1}function g(e){for(e=e.return;e!==null;){if(e.tag===3||e.tag===5||e.tag===27)return e;e=e.return}return null}function _(e){var t=!1;for(e=e.return;e!==null&&(e.tag===4&&(t=!0),e.tag!==3&&e.tag!==5&&e.tag!==27);)e=e.return;return t}function v(e){var t=[null,null],n=g(e);return n===null||y(t,e,n.child,{foundSelf:!1}),t}function y(e,t,n,r){for(;n!==null;){if(n===t)r.foundSelf=!0;else if(n.tag===5||n.tag===27||n.tag===6){if(r.foundSelf)return e[1]=n,!0;e[0]=n}else if((n.tag!==22||n.memoizedState===null)&&y(e,t,n.child,r))return!0;n=n.sibling}return!1}function b(e){switch(e.tag){case 5:case 27:case 6:return e.stateNode;case 3:return e.stateNode.containerInfo;default:throw Error(i(559))}}var x=null,S=null;function C(e,t,n){return e===n||e===t&&(x=e,!0)}function ee(e,t,n){return e===n?(S=e,!1):e===t&&(S!==null&&(x=e),!0)}function w(e){if(e===null)return null;do e=e===null?null:e.return;while(e&&e.tag!==5&&e.tag!==27&&e.tag!==3);return e||null}function te(e,t,n){for(var r=0,i=e;i;i=n(i))r++;i=0;for(var a=t;a;a=n(a))i++;for(;0<r-i;)e=n(e),r--;for(;0<i-r;)t=n(t),i--;for(;r--;){if(e===t||t!==null&&e===t.alternate)return e;e=n(e),t=n(t)}return null}var T=Object.assign,ne=Symbol.for(`react.element`),E=Symbol.for(`react.transitional.element`),re=Symbol.for(`react.portal`),ie=Symbol.for(`react.fragment`),ae=Symbol.for(`react.strict_mode`),oe=Symbol.for(`react.profiler`),se=Symbol.for(`react.consumer`),ce=Symbol.for(`react.context`),le=Symbol.for(`react.forward_ref`),ue=Symbol.for(`react.suspense`),D=Symbol.for(`react.suspense_list`),de=Symbol.for(`react.memo`),fe=Symbol.for(`react.lazy`),pe=Symbol.for(`react.activity`),O=Symbol.for(`react.legacy_hidden`),k=Symbol.for(`react.memo_cache_sentinel`),me=Symbol.for(`react.view_transition`),he=Symbol.for(`react.recoverable`),ge=Symbol.iterator;function _e(e){return typeof e!=`object`||!e?null:(e=ge&&e[ge]||e[`@@iterator`],typeof e==`function`?e:null)}var ve=Symbol.for(`react.client.reference`);function ye(e){if(e==null)return null;if(typeof e==`function`)return e.$$typeof===ve?null:e.displayName||e.name||null;if(typeof e==`string`)return e;switch(e){case ie:return`Fragment`;case oe:return`Profiler`;case ae:return`StrictMode`;case ue:return`Suspense`;case D:return`SuspenseList`;case pe:return`Activity`;case me:return`ViewTransition`}if(typeof e==`object`)switch(e.$$typeof){case re:return`Portal`;case ce:return e.displayName||`Context`;case se:return(e._context.displayName||`Context`)+`.Consumer`;case le:var t=e.render;return e=e.displayName,e||=(e=t.displayName||t.name||``,e===``?`ForwardRef`:`ForwardRef(`+e+`)`),e;case de:return t=e.displayName||null,t===null?ye(e.type)||`Memo`:t;case fe:t=e._payload,e=e._init;try{return ye(e(t))}catch{}}return null}var be=Array.isArray,A=n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,j=r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE,xe={pending:!1,data:null,method:null,action:null},M=[],Se=-1;function Ce(e){return{current:e}}function we(e){0>Se||(e.current=M[Se],M[Se]=null,Se--)}function N(e,t){Se++,M[Se]=e.current,e.current=t}var Te=Ce(null),Ee=Ce(null),De=Ce(null),Oe=Ce(null);function ke(e,t){switch(N(De,t),N(Ee,e),N(Te,null),t.nodeType){case 9:case 11:e=(e=t.documentElement)&&(e=e.namespaceURI)?up(e):0;break;default:if(e=t.tagName,t=t.namespaceURI)t=up(t),e=dp(t,e);else switch(e){case`svg`:e=1;break;case`math`:e=2;break;default:e=0}}we(Te),N(Te,e)}function Ae(){we(Te),we(Ee),we(De)}function je(e){var t=e.memoizedState;t!==null&&(sh._currentValue=t.memoizedState,N(Oe,e)),t=Te.current;var n=dp(t,e.type);t!==n&&(N(Ee,e),N(Te,n))}function Me(e){Ee.current===e&&(we(Te),we(Ee)),Oe.current===e&&(we(Oe),sh._currentValue=xe)}var Ne,Pe;function Fe(e){if(Ne===void 0)try{throw Error()}catch(e){var t=e.stack.trim().match(/\n( *(at )?)/);Ne=t&&t[1]||``,Pe=-1<e.stack.indexOf(`
    at`)?` (<anonymous>)`:-1<e.stack.indexOf(`@`)?`@unknown:0:0`:``}return`
`+Ne+e+Pe}var Ie=!1;function Le(e,t){if(!e||Ie)return``;Ie=!0;var n=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{var r={DetermineComponentFrameRoot:function(){try{if(t){var n=function(){throw Error()};if(Object.defineProperty(n.prototype,"props",{set:function(){throw Error()}}),typeof Reflect==`object`&&Reflect.construct){try{Reflect.construct(n,[])}catch(e){var r=e}Reflect.construct(e,[],n)}else{try{n.call()}catch(e){r=e}n=!1;try{var i=Object.getOwnPropertyDescriptor(e.prototype,`props`);Object.defineProperty(e.prototype,"props",{configurable:!0,set:function(){throw Error()}}),n=!0,new e}finally{n&&(i===void 0?delete e.prototype.props:Object.defineProperty(e.prototype,"props",i))}}}else{try{throw Error()}catch(e){r=e}(n=e())&&typeof n.catch==`function`&&n.catch(function(){})}}catch(e){if(e&&r&&typeof e.stack==`string`)return[e.stack,r.stack]}return[null,null]}};r.DetermineComponentFrameRoot.displayName=`DetermineComponentFrameRoot`;var i=Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot,`name`);i&&i.configurable&&Object.defineProperty(r.DetermineComponentFrameRoot,"name",{value:`DetermineComponentFrameRoot`});var a=r.DetermineComponentFrameRoot(),o=a[0],s=a[1];if(o&&s){var c=o.split(`
`),l=s.split(`
`);for(i=r=0;r<c.length&&!c[r].includes(`DetermineComponentFrameRoot`);)r++;for(;i<l.length&&!l[i].includes(`DetermineComponentFrameRoot`);)i++;if(r===c.length||i===l.length)for(r=c.length-1,i=l.length-1;1<=r&&0<=i&&c[r]!==l[i];)i--;for(;1<=r&&0<=i;r--,i--)if(c[r]!==l[i]){if(r!==1||i!==1)do if(r--,i--,0>i||c[r]!==l[i]){var u=`
`+c[r].replace(` at new `,` at `);return e.displayName&&u.includes(`<anonymous>`)&&(u=u.replace(`<anonymous>`,e.displayName)),u}while(1<=r&&0<=i);break}}}finally{Ie=!1,Error.prepareStackTrace=n}return(n=e?e.displayName||e.name:``)?Fe(n):``}function Re(e,t){switch(e.tag){case 26:case 27:case 5:return Fe(e.type);case 16:return Fe(`Lazy`);case 13:return e.child!==t&&t!==null?Fe(`Suspense Fallback`):Fe(`Suspense`);case 19:return Fe(`SuspenseList`);case 0:case 15:return Le(e.type,!1);case 11:return Le(e.type.render,!1);case 1:return Le(e.type,!0);case 31:return Fe(`Activity`);case 30:return Fe(`ViewTransition`);default:return``}}function ze(e){try{var t=``,n=null;do t+=Re(e,n),n=e,e=e.return;while(e);return t}catch(e){return`
Error generating stack: `+e.message+`
`+e.stack}}var Be=Object.prototype.hasOwnProperty,Ve=t.unstable_scheduleCallback,He=t.unstable_cancelCallback,Ue=t.unstable_shouldYield,We=t.unstable_requestPaint,Ge=t.unstable_now,Ke=t.unstable_getCurrentPriorityLevel,qe=t.unstable_ImmediatePriority,Je=t.unstable_UserBlockingPriority,Ye=t.unstable_NormalPriority,Xe=t.unstable_LowPriority,Ze=t.unstable_IdlePriority,Qe=t.log,$e=t.unstable_setDisableYieldValue,et=null,P=null;function tt(e){if(typeof Qe==`function`&&$e(e),P&&typeof P.setStrictMode==`function`)try{P.setStrictMode(et,e)}catch{}}var nt=Math.clz32?Math.clz32:at,rt=Math.log,it=Math.LN2;function at(e){return e>>>=0,e===0?32:31-(rt(e)/it|0)|0}var ot=256,st=262144,ct=4194304;function lt(e){var t=e&42;if(t!==0)return t;switch(e&-e){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:return 64;case 128:return 128;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:return e&-e;case 262144:case 524288:case 1048576:case 2097152:return e&3932160;case 4194304:case 8388608:case 16777216:case 33554432:return e&62914560;case 67108864:return 67108864;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 0;default:return e}}function F(e,t,n){var r=e.pendingLanes;if(r===0)return 0;var i=0,a=e.suspendedLanes,o=e.pingedLanes;e=e.warmLanes;var s=r&134217727;return s===0?(s=r&~a,s===0?o===0?n||(n=r&~e,n!==0&&(i=lt(n))):i=lt(o):i=lt(s)):(r=s&~a,r===0?(o&=s,o===0?n||(n=s&~e,n!==0&&(i=lt(n))):i=lt(o)):i=lt(r)),i===0?0:t!==0&&t!==i&&(t&a)===0&&(a=i&-i,n=t&-t,a>=n||a===32&&n&4194048)?t:i}function ut(e,t){return(e.pendingLanes&~(e.suspendedLanes&~e.pingedLanes)&t)===0}function I(e,t){t&8&&(t|=t&32);var n=e.entangledLanes;if(n!==0)for(e=e.entanglements,n&=t;0<n;){var r=31-nt(n),i=1<<r;t|=e[r],n&=~i}return t}function dt(e,t){switch(e){case 1:case 2:case 4:case 8:case 64:return t+250;case 16:case 32:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t+5e3;case 4194304:case 8388608:case 16777216:case 33554432:return-1;case 67108864:case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function ft(){var e=ct;return ct<<=1,!(ct&62914560)&&(ct=4194304),e}function pt(e){for(var t=[],n=0;31>n;n++)t.push(e);return t}function mt(e,t){e.pendingLanes|=t,t!==268435456&&(e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0)}function ht(e,t,n,r,i,a){var o=e.pendingLanes;e.pendingLanes=n,e.suspendedLanes=0,e.pingedLanes=0,e.warmLanes=0,e.expiredLanes&=n,e.entangledLanes&=n,e.errorRecoveryDisabledLanes&=n,e.shellSuspendCounter=0;var s=e.entanglements,c=e.expirationTimes,l=e.hiddenUpdates;for(n=o&~n;0<n;){var u=31-nt(n),d=1<<u;s[u]=0,c[u]=-1;var f=l[u];if(f!==null)for(l[u]=null,u=0;u<f.length;u++){var p=f[u];p!==null&&(p.lane&=-536870913)}n&=~d}r!==0&&gt(e,r,0),a!==0&&i===0&&e.tag!==0&&(e.suspendedLanes|=a&~(o&~t))}function gt(e,t,n){e.pendingLanes|=t,e.suspendedLanes&=~t;var r=31-nt(t);e.entangledLanes|=t,e.entanglements[r]=e.entanglements[r]|1073741824|n&261930}function _t(e,t){var n=e.entangledLanes|=t;for(e=e.entanglements;n;){var r=31-nt(n),i=1<<r;i&t|e[r]&t&&(e[r]|=t),n&=~i}}function vt(e,t){var n=t&-t;return n=n&42?1:yt(n),(n&(e.suspendedLanes|t))===0?n:0}function yt(e){switch(e){case 2:e=1;break;case 8:e=4;break;case 32:e=16;break;case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:e=128;break;case 268435456:e=134217728;break;default:e=0}return e}function bt(e){return e&=-e,2<e?8<e?e&134217727?32:268435456:8:2}function xt(){var e=j.p;return e===0?(e=window.event,e===void 0?32:Ch(e.type)):e}function St(e,t){var n=j.p;try{return j.p=e,t()}finally{j.p=n}}var Ct=Math.random().toString(36).slice(2),wt=`__reactFiber$`+Ct,Tt=`__reactProps$`+Ct,Et=`__reactContainer$`+Ct,Dt=`__reactEvents$`+Ct,Ot=`__reactListeners$`+Ct,kt=`__reactHandles$`+Ct,At=`__reactResources$`+Ct,jt=`__reactMarker$`+Ct,Mt=`__reactLoad$`+Ct;function Nt(e){delete e[wt],delete e[Tt],delete e[Ot],delete e[kt]}function Pt(e){var t;if(t=e[wt])return t;for(var n=e.parentNode;n;){if(t=n[Et]||n[wt]){if(n=t.alternate,t.child!==null||n!==null&&n.child!==null)for(e=fm(e);e!==null;){if(n=e[wt])return n;e=fm(e)}return t}e=n,n=e.parentNode}return null}function Ft(e){if(e=e[wt]||e[Et]){var t=e.tag;if(t===5||t===6||t===13||t===31||t===26||t===27||t===3)return e}return null}function It(e){var t=e.tag;if(t===5||t===26||t===27||t===6)return e.stateNode;throw Error(i(33))}function Lt(e){var t=e[At];return t||=e[At]={hoistableStyles:new Map,hoistableScripts:new Map},t}function Rt(e){e[jt]=!0}function zt(e){e[Mt]=void 0}var Bt=new Set,Vt={};function Ht(e,t){Ut(e,t),Ut(e+`Capture`,t)}function Ut(e,t){for(Vt[e]=t,e=0;e<t.length;e++)Bt.add(t[e])}var Wt=RegExp(`^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$`),Gt={},Kt={};function qt(e){return Be.call(Kt,e)?!0:Be.call(Gt,e)?!1:Wt.test(e)?Kt[e]=!0:(Gt[e]=!0,!1)}var L=!1;function Jt(){var e=L;return L=!1,e}function Yt(e,t,n){if(qt(t)){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:e.removeAttribute(t);return;case`boolean`:var r=t.toLowerCase().slice(0,5);if(r!==`data-`&&r!==`aria-`){e.removeAttribute(t);return}}e.setAttribute(t,n)}}}function Xt(e,t,n){if(n===null)e.removeAttribute(t);else{switch(typeof n){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(t);return}e.setAttribute(t,n)}}function Zt(e,t,n,r){if(r===null)e.removeAttribute(n);else{switch(typeof r){case`undefined`:case`function`:case`symbol`:case`boolean`:e.removeAttribute(n);return}e.setAttributeNS(t,n,r)}}function Qt(e){switch(typeof e){case`bigint`:case`boolean`:case`number`:case`string`:case`undefined`:return e;case`object`:return e;default:return``}}function $t(e){var t=e.type;return(e=e.nodeName)&&e.toLowerCase()===`input`&&(t===`checkbox`||t===`radio`)}function en(e,t,n){var r=Object.getOwnPropertyDescriptor(e.constructor.prototype,t);if(!e.hasOwnProperty(t)&&r!==void 0&&typeof r.get==`function`&&typeof r.set==`function`){var i=r.get,a=r.set;return Object.defineProperty(e,t,{configurable:!0,get:function(){return i.call(this)},set:function(e){n=``+e,a.call(this,e)}}),Object.defineProperty(e,t,{enumerable:r.enumerable}),{getValue:function(){return n},setValue:function(e){n=``+e},stopTracking:function(){e._valueTracker=null,delete e[t]}}}}function R(e){if(!e._valueTracker){var t=$t(e)?`checked`:`value`;e._valueTracker=en(e,t,``+e[t])}}function tn(e){if(!e)return!1;var t=e._valueTracker;if(!t)return!0;var n=t.getValue(),r=``;return e&&(r=$t(e)?e.checked?`true`:`false`:e.value),e=r,e!==n&&(t.setValue(e),!0)}var nn=/[\n"\\]/g;function rn(e){return e.replace(nn,function(e){return`\\`+e.charCodeAt(0).toString(16)+` `})}function an(e,t,n,r,i,a,o,s){e.name=``,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`?e.type=o:e.removeAttribute(`type`),t==null?o!==`submit`&&o!==`reset`||e.removeAttribute(`value`):o===`number`?(t===0&&e.value===``||e.value!=t)&&(e.value=``+Qt(t)):e.value!==``+Qt(t)&&(e.value=``+Qt(t)),t==null?n==null?r!=null&&e.removeAttribute(`value`):sn(e,Qt(n)):o===`number`&&e.value==t?sn(e,Qt(e.value)):sn(e,Qt(t)),i==null&&a!=null&&(e.defaultChecked=!!a),i!=null&&(e.checked=i&&typeof i!=`function`&&typeof i!=`symbol`),s!=null&&typeof s!=`function`&&typeof s!=`symbol`&&typeof s!=`boolean`?e.name=``+Qt(s):e.removeAttribute(`name`)}function on(e,t,n,r,i,a,o,s){if(a!=null&&typeof a!=`function`&&typeof a!=`symbol`&&typeof a!=`boolean`&&(e.type=a),t!=null||n!=null){if(!(a!==`submit`&&a!==`reset`||t!=null)){R(e);return}n=n==null?``:``+Qt(n),t=t==null?n:``+Qt(t),s||t===e.value||(e.value=t),e.defaultValue=t}r??=i,r=typeof r!=`function`&&typeof r!=`symbol`&&!!r,e.checked=s?e.checked:!!r,e.defaultChecked=!!r,o!=null&&typeof o!=`function`&&typeof o!=`symbol`&&typeof o!=`boolean`&&(e.name=o),R(e)}function sn(e,t){e.defaultValue!==``+t&&(e.defaultValue=``+t)}function cn(e,t,n,r){if(e=e.options,t){t={};for(var i=0;i<n.length;i++)t[`$`+n[i]]=!0;for(n=0;n<e.length;n++)i=t.hasOwnProperty(`$`+e[n].value),e[n].selected!==i&&(e[n].selected=i),i&&r&&(e[n].defaultSelected=!0)}else{for(n=``+Qt(n),t=null,i=0;i<e.length;i++){if(e[i].value===n){e[i].selected=!0,r&&(e[i].defaultSelected=!0);return}t!==null||e[i].disabled||(t=e[i])}t!==null&&(t.selected=!0)}}function ln(e,t,n){t!=null&&(t=``+Qt(t),t!==e.value&&(e.value=t),n==null)?e.defaultValue!==t&&(e.defaultValue=t):e.defaultValue=n==null?``:``+Qt(n)}function un(e,t,n,r){if(t==null){if(r!=null){if(n!=null)throw Error(i(92));if(be(r)){if(1<r.length)throw Error(i(93));r=r[0]}n=r}n??=``,t=n}n=Qt(t),e.defaultValue=n,r=e.textContent,r===n&&r!==``&&r!==null&&(e.value=r),R(e)}function dn(e,t){if(t){var n=e.firstChild;if(n&&n===e.lastChild&&n.nodeType===3){n.nodeValue=t;return}}e.textContent=t}var fn=new Set(`animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp`.split(` `));function pn(e,t,n){var r=t.indexOf(`--`)===0;n==null||typeof n==`boolean`||n===``?r?e.setProperty(t,``):t===`float`?e.cssFloat=``:e[t]=``:r?e.setProperty(t,n):typeof n!=`number`||n===0||fn.has(t)?t===`float`?e.cssFloat=n:e[t]=(``+n).trim():e[t]=n+`px`}function mn(e,t,n){if(t!=null&&typeof t!=`object`)throw Error(i(62));if(e=e.style,n!=null){for(var r in n)!n.hasOwnProperty(r)||t!=null&&t.hasOwnProperty(r)||(r.indexOf(`--`)===0?e.setProperty(r,``):r===`float`?e.cssFloat=``:e[r]=``,L=!0);for(var a in t)r=t[a],t.hasOwnProperty(a)&&n[a]!==r&&(pn(e,a,r),L=!0)}else for(var o in t)t.hasOwnProperty(o)&&pn(e,o,t[o])}function hn(e){if(e.indexOf(`-`)===-1)return!1;switch(e){case`annotation-xml`:case`color-profile`:case`font-face`:case`font-face-src`:case`font-face-uri`:case`font-face-format`:case`font-face-name`:case`missing-glyph`:return!1;default:return!0}}var gn=new Map([[`acceptCharset`,`accept-charset`],[`htmlFor`,`for`],[`httpEquiv`,`http-equiv`],[`crossOrigin`,`crossorigin`],[`accentHeight`,`accent-height`],[`alignmentBaseline`,`alignment-baseline`],[`arabicForm`,`arabic-form`],[`baselineShift`,`baseline-shift`],[`capHeight`,`cap-height`],[`clipPath`,`clip-path`],[`clipRule`,`clip-rule`],[`colorInterpolation`,`color-interpolation`],[`colorInterpolationFilters`,`color-interpolation-filters`],[`colorProfile`,`color-profile`],[`colorRendering`,`color-rendering`],[`dominantBaseline`,`dominant-baseline`],[`enableBackground`,`enable-background`],[`fillOpacity`,`fill-opacity`],[`fillRule`,`fill-rule`],[`floodColor`,`flood-color`],[`floodOpacity`,`flood-opacity`],[`fontFamily`,`font-family`],[`fontSize`,`font-size`],[`fontSizeAdjust`,`font-size-adjust`],[`fontStretch`,`font-stretch`],[`fontStyle`,`font-style`],[`fontVariant`,`font-variant`],[`fontWeight`,`font-weight`],[`glyphName`,`glyph-name`],[`glyphOrientationHorizontal`,`glyph-orientation-horizontal`],[`glyphOrientationVertical`,`glyph-orientation-vertical`],[`horizAdvX`,`horiz-adv-x`],[`horizOriginX`,`horiz-origin-x`],[`imageRendering`,`image-rendering`],[`letterSpacing`,`letter-spacing`],[`lightingColor`,`lighting-color`],[`markerEnd`,`marker-end`],[`markerMid`,`marker-mid`],[`markerStart`,`marker-start`],[`maskType`,`mask-type`],[`overlinePosition`,`overline-position`],[`overlineThickness`,`overline-thickness`],[`paintOrder`,`paint-order`],[`panose-1`,`panose-1`],[`pointerEvents`,`pointer-events`],[`renderingIntent`,`rendering-intent`],[`shapeRendering`,`shape-rendering`],[`stopColor`,`stop-color`],[`stopOpacity`,`stop-opacity`],[`strikethroughPosition`,`strikethrough-position`],[`strikethroughThickness`,`strikethrough-thickness`],[`strokeDasharray`,`stroke-dasharray`],[`strokeDashoffset`,`stroke-dashoffset`],[`strokeLinecap`,`stroke-linecap`],[`strokeLinejoin`,`stroke-linejoin`],[`strokeMiterlimit`,`stroke-miterlimit`],[`strokeOpacity`,`stroke-opacity`],[`strokeWidth`,`stroke-width`],[`textAnchor`,`text-anchor`],[`textDecoration`,`text-decoration`],[`textRendering`,`text-rendering`],[`transformOrigin`,`transform-origin`],[`underlinePosition`,`underline-position`],[`underlineThickness`,`underline-thickness`],[`unicodeBidi`,`unicode-bidi`],[`unicodeRange`,`unicode-range`],[`unitsPerEm`,`units-per-em`],[`vAlphabetic`,`v-alphabetic`],[`vHanging`,`v-hanging`],[`vIdeographic`,`v-ideographic`],[`vMathematical`,`v-mathematical`],[`vectorEffect`,`vector-effect`],[`vertAdvY`,`vert-adv-y`],[`vertOriginX`,`vert-origin-x`],[`vertOriginY`,`vert-origin-y`],[`wordSpacing`,`word-spacing`],[`writingMode`,`writing-mode`],[`xmlnsXlink`,`xmlns:xlink`],[`xHeight`,`x-height`]]),_n=/^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;function vn(e){return _n.test(``+e)?`javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')`:e}function yn(){}var bn=null;function xn(e){return e=e.target||e.srcElement||window,e.correspondingUseElement&&(e=e.correspondingUseElement),e.nodeType===3?e.parentNode:e}var Sn=null,Cn=null;function wn(e){var t=Ft(e);if(t&&(e=t.stateNode)){var n=e[Tt]||null;a:switch(e=t.stateNode,t.type){case`input`:if(an(e,n.value,n.defaultValue,n.defaultValue,n.checked,n.defaultChecked,n.type,n.name),t=n.name,n.type===`radio`&&t!=null){for(n=e;n.parentNode;)n=n.parentNode;for(n=n.querySelectorAll(`input[name="`+rn(``+t)+`"][type="radio"]`),t=0;t<n.length;t++){var r=n[t];if(r!==e&&r.form===e.form){var a=r[Tt]||null;if(!a)throw Error(i(90));an(r,a.value,a.defaultValue,a.defaultValue,a.checked,a.defaultChecked,a.type,a.name)}}for(t=0;t<n.length;t++)r=n[t],r.form===e.form&&tn(r)}break a;case`textarea`:ln(e,n.value,n.defaultValue);break a;case`select`:t=n.value,t!=null&&cn(e,!!n.multiple,t,!1)}}}var Tn=!1;function En(e,t,n){if(Tn)return e(t,n);Tn=!0;try{return e(t)}finally{if(Tn=!1,(Sn!==null||Cn!==null)&&(Rd(),Sn&&(t=Sn,e=Cn,Cn=Sn=null,wn(t),e)))for(t=0;t<e.length;t++)wn(e[t])}}function Dn(e,t){var n=e.stateNode;if(n===null)return null;var r=n[Tt]||null;if(r===null)return null;n=r[t];a:switch(t){case`onClick`:case`onClickCapture`:case`onDoubleClick`:case`onDoubleClickCapture`:case`onMouseDown`:case`onMouseDownCapture`:case`onMouseMove`:case`onMouseMoveCapture`:case`onMouseUp`:case`onMouseUpCapture`:case`onMouseEnter`:(r=!r.disabled)||(e=e.type,r=e!==`button`&&e!==`input`&&e!==`select`&&e!==`textarea`),e=!r;break a;default:e=!1}if(e)return null;if(n&&typeof n!=`function`)throw Error(i(231,t,typeof n));return n}var On=typeof window<`u`&&window.document!==void 0&&window.document.createElement!==void 0,kn=!1;if(On)try{var An={};Object.defineProperty(An,"passive",{get:function(){kn=!0}}),window.addEventListener(`test`,An,An),window.removeEventListener(`test`,An,An)}catch{kn=!1}var jn=null,Mn=null,Nn=null;function Pn(){if(Nn)return Nn;var e,t=Mn,n=t.length,r,i=`value`in jn?jn.value:jn.textContent,a=i.length;for(e=0;e<n&&t[e]===i[e];e++);var o=n-e;for(r=1;r<=o&&t[n-r]===i[a-r];r++);return Nn=i.slice(e,1<r?1-r:void 0)}function Fn(e){var t=e.keyCode;return`charCode`in e?(e=e.charCode,e===0&&t===13&&(e=13)):e=t,e===10&&(e=13),32<=e||e===13?e:0}function In(){return!0}function Ln(){return!1}function Rn(e){function t(t,n,r,i,a){for(var o in this._reactName=t,this._targetInst=r,this.type=n,this.nativeEvent=i,this.target=a,this.currentTarget=null,e)e.hasOwnProperty(o)&&(t=e[o],this[o]=t?t(i):i[o]);return this.isDefaultPrevented=(i.defaultPrevented==null?!1===i.returnValue:i.defaultPrevented)?In:Ln,this.isPropagationStopped=Ln,this}return T(t.prototype,{preventDefault:function(){this.defaultPrevented=!0;var e=this.nativeEvent;e&&(e.preventDefault?e.preventDefault():typeof e.returnValue!=`unknown`&&(e.returnValue=!1),this.isDefaultPrevented=In)},stopPropagation:function(){var e=this.nativeEvent;e&&(e.stopPropagation?e.stopPropagation():typeof e.cancelBubble!=`unknown`&&(e.cancelBubble=!0),this.isPropagationStopped=In)},persist:function(){},isPersistent:In}),t}var zn={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(e){return e.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},Bn=Rn(zn),Vn=T({},zn,{view:0,detail:0}),Hn=Rn(Vn),Un,Wn,Gn,Kn=T({},Vn,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:rr,button:0,buttons:0,relatedTarget:function(e){return e.relatedTarget===void 0?e.fromElement===e.srcElement?e.toElement:e.fromElement:e.relatedTarget},movementX:function(e){return`movementX`in e?e.movementX:(e!==Gn&&(Gn&&e.type===`mousemove`?(Un=e.screenX-Gn.screenX,Wn=e.screenY-Gn.screenY):Wn=Un=0,Gn=e),Un)},movementY:function(e){return`movementY`in e?e.movementY:Wn}}),qn=Rn(Kn),Jn=Rn(T({},Kn,{dataTransfer:0})),Yn=Rn(T({},Vn,{relatedTarget:0})),Xn=Rn(T({},zn,{animationName:0,elapsedTime:0,pseudoElement:0})),Zn=Rn(T({},zn,{clipboardData:function(e){return`clipboardData`in e?e.clipboardData:window.clipboardData}})),Qn=Rn(T({},zn,{data:0})),$n={Esc:`Escape`,Spacebar:` `,Left:`ArrowLeft`,Up:`ArrowUp`,Right:`ArrowRight`,Down:`ArrowDown`,Del:`Delete`,Win:`OS`,Menu:`ContextMenu`,Apps:`ContextMenu`,Scroll:`ScrollLock`,MozPrintableKey:`Unidentified`},er={8:`Backspace`,9:`Tab`,12:`Clear`,13:`Enter`,16:`Shift`,17:`Control`,18:`Alt`,19:`Pause`,20:`CapsLock`,27:`Escape`,32:` `,33:`PageUp`,34:`PageDown`,35:`End`,36:`Home`,37:`ArrowLeft`,38:`ArrowUp`,39:`ArrowRight`,40:`ArrowDown`,45:`Insert`,46:`Delete`,112:`F1`,113:`F2`,114:`F3`,115:`F4`,116:`F5`,117:`F6`,118:`F7`,119:`F8`,120:`F9`,121:`F10`,122:`F11`,123:`F12`,144:`NumLock`,145:`ScrollLock`,224:`Meta`},tr={Alt:`altKey`,Control:`ctrlKey`,Meta:`metaKey`,Shift:`shiftKey`};function nr(e){var t=this.nativeEvent;return t.getModifierState?t.getModifierState(e):(e=tr[e])?!!t[e]:!1}function rr(){return nr}var ir=Rn(T({},Vn,{key:function(e){if(e.key){var t=$n[e.key]||e.key;if(t!==`Unidentified`)return t}return e.type===`keypress`?(e=Fn(e),e===13?`Enter`:String.fromCharCode(e)):e.type===`keydown`||e.type===`keyup`?er[e.keyCode]||`Unidentified`:``},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:rr,charCode:function(e){return e.type===`keypress`?Fn(e):0},keyCode:function(e){return e.type===`keydown`||e.type===`keyup`?e.keyCode:0},which:function(e){return e.type===`keypress`?Fn(e):e.type===`keydown`||e.type===`keyup`?e.keyCode:0}})),ar=Rn(T({},Kn,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0})),or=Rn(T({},zn,{submitter:0})),sr=Rn(T({},Vn,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:rr})),cr=Rn(T({},zn,{propertyName:0,elapsedTime:0,pseudoElement:0})),lr=Rn(T({},Kn,{deltaX:function(e){return`deltaX`in e?e.deltaX:`wheelDeltaX`in e?-e.wheelDeltaX:0},deltaY:function(e){return`deltaY`in e?e.deltaY:`wheelDeltaY`in e?-e.wheelDeltaY:`wheelDelta`in e?-e.wheelDelta:0},deltaZ:0,deltaMode:0})),ur=Rn(T({},zn,{newState:0,oldState:0,source:0})),dr=[9,13,27,32],fr=On&&`CompositionEvent`in window,pr=null;On&&`documentMode`in document&&(pr=document.documentMode);var mr=On&&`TextEvent`in window&&!pr,hr=On&&(!fr||pr&&8<pr&&11>=pr),gr=` `,_r=!1;function vr(e,t){switch(e){case`keyup`:return dr.indexOf(t.keyCode)!==-1;case`keydown`:return t.keyCode!==229;case`keypress`:case`mousedown`:case`focusout`:return!0;default:return!1}}function yr(e){return e=e.detail,typeof e==`object`&&`data`in e?e.data:null}var br=!1;function xr(e,t){switch(e){case`compositionend`:return yr(t);case`keypress`:return t.which===32?(_r=!0,gr):null;case`textInput`:return e=t.data,e===gr&&_r?null:e;default:return null}}function Sr(e,t){if(br)return e===`compositionend`||!fr&&vr(e,t)?(e=Pn(),Nn=Mn=jn=null,br=!1,e):null;switch(e){case`paste`:return null;case`keypress`:if(!(t.ctrlKey||t.altKey||t.metaKey)||t.ctrlKey&&t.altKey){if(t.char&&1<t.char.length)return t.char;if(t.which)return String.fromCharCode(t.which)}return null;case`compositionend`:return hr&&t.locale!==`ko`?null:t.data;default:return null}}var Cr={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function wr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t===`input`?!!Cr[e.type]:t===`textarea`}function Tr(e,t,n,r){Sn?Cn?Cn.push(r):Cn=[r]:Sn=r,t=qf(t,`onChange`),0<t.length&&(n=new Bn(`onChange`,`change`,null,n,r),e.push({event:n,listeners:t}))}var Er=null,Dr=null;function Or(e){Bf(e,0)}function kr(e){if(tn(It(e)))return e}function Ar(e,t){if(e===`change`)return t}var jr=!1;if(On){var Mr;if(On){var Nr=`oninput`in document;if(!Nr){var Pr=document.createElement(`div`);Pr.setAttribute(`oninput`,`return;`),Nr=typeof Pr.oninput==`function`}Mr=Nr}else Mr=!1;jr=Mr&&(!document.documentMode||9<document.documentMode)}function Fr(){Er&&(Er.detachEvent(`onpropertychange`,Ir),Dr=Er=null)}function Ir(e){if(e.propertyName===`value`&&kr(Dr)){var t=[];Tr(t,Dr,e,xn(e)),En(Or,t)}}function Lr(e,t,n){e===`focusin`?(Fr(),Er=t,Dr=n,Er.attachEvent(`onpropertychange`,Ir)):e===`focusout`&&Fr()}function Rr(e){if(e===`selectionchange`||e===`keyup`||e===`keydown`)return kr(Dr)}function zr(e,t){if(e===`click`)return kr(t)}function Br(e,t){if(e===`input`||e===`change`)return kr(t)}function Vr(e,t){return e===t&&(e!==0||1/e==1/t)||e!==e&&t!==t}var Hr=typeof Object.is==`function`?Object.is:Vr;function Ur(e,t){if(Hr(e,t))return!0;if(typeof e!=`object`||!e||typeof t!=`object`||!t)return!1;var n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(r=0;r<n.length;r++){var i=n[r];if(!Be.call(t,i)||!Hr(e[i],t[i]))return!1}return!0}function Wr(e){if(e||=typeof document<`u`?document:void 0,e===void 0)return null;try{return e.activeElement||e.body}catch{return e.body}}function Gr(e){for(;e&&e.firstChild;)e=e.firstChild;return e}function Kr(e,t){var n=Gr(e);e=0;for(var r;n;){if(n.nodeType===3){if(r=e+n.textContent.length,e<=t&&r>=t)return{node:n,offset:t-e};e=r}a:{for(;n;){if(n.nextSibling){n=n.nextSibling;break a}n=n.parentNode}n=void 0}n=Gr(n)}}function qr(e,t){return e&&t?e===t?!0:e&&e.nodeType===3?!1:t&&t.nodeType===3?qr(e,t.parentNode):`contains`in e?e.contains(t):e.compareDocumentPosition?!!(e.compareDocumentPosition(t)&16):!1:!1}function z(e){e=e!=null&&e.ownerDocument!=null&&e.ownerDocument.defaultView!=null?e.ownerDocument.defaultView:window;for(var t=Wr(e.document);t instanceof e.HTMLIFrameElement;){try{var n=typeof t.contentWindow.location.href==`string`}catch{n=!1}if(n)e=t.contentWindow;else break;t=Wr(e.document)}return t}function Jr(e){var t=e&&e.nodeName&&e.nodeName.toLowerCase();return t&&(t===`input`&&(e.type===`text`||e.type===`search`||e.type===`tel`||e.type===`url`||e.type===`password`)||t===`textarea`||e.contentEditable===`true`)}var Yr=On&&`documentMode`in document&&11>=document.documentMode,Xr=null,Zr=null,Qr=null,$r=!1;function ei(e,t,n){var r=n.window===n?n.document:n.nodeType===9?n:n.ownerDocument;$r||Xr==null||Xr!==Wr(r)||(r=Xr,`selectionStart`in r&&Jr(r)?r={start:r.selectionStart,end:r.selectionEnd}:(r=(r.ownerDocument&&r.ownerDocument.defaultView||window).getSelection(),r={anchorNode:r.anchorNode,anchorOffset:r.anchorOffset,focusNode:r.focusNode,focusOffset:r.focusOffset}),Qr&&Ur(Qr,r)||(Qr=r,r=qf(Zr,`onSelect`),0<r.length&&(t=new Bn(`onSelect`,`select`,null,t,n),e.push({event:t,listeners:r}),t.target=Xr)))}function ti(e,t){var n={};return n[e.toLowerCase()]=t.toLowerCase(),n[`Webkit`+e]=`webkit`+t,n[`Moz`+e]=`moz`+t,n}var ni={animationend:ti(`Animation`,`AnimationEnd`),animationiteration:ti(`Animation`,`AnimationIteration`),animationstart:ti(`Animation`,`AnimationStart`),transitionrun:ti(`Transition`,`TransitionRun`),transitionstart:ti(`Transition`,`TransitionStart`),transitioncancel:ti(`Transition`,`TransitionCancel`),transitionend:ti(`Transition`,`TransitionEnd`)},ri={},ii={};On&&(ii=document.createElement(`div`).style,`AnimationEvent`in window||(delete ni.animationend.animation,delete ni.animationiteration.animation,delete ni.animationstart.animation),`TransitionEvent`in window||delete ni.transitionend.transition);function ai(e){if(ri[e])return ri[e];if(!ni[e])return e;var t=ni[e],n;for(n in t)if(t.hasOwnProperty(n)&&n in ii)return ri[e]=t[n];return e}var oi=ai(`animationend`),si=ai(`animationiteration`),ci=ai(`animationstart`),li=ai(`transitionrun`),ui=ai(`transitionstart`),di=ai(`transitioncancel`),B=ai(`transitionend`),fi=new Map,pi=`abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error fullscreenChange fullscreenError gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel`.split(` `);pi.push(`scrollEnd`);function mi(e,t){fi.set(e,t),Ht(t,[e])}var hi=0;function gi(e,t){if(e.name!=null&&e.name!==`auto`)return e.name;if(t.autoName!==null)return t.autoName;e=yd.identifierPrefix;var n=hi++;return e=`_`+e+`t_`+n.toString(32)+`_`,t.autoName=e}function _i(e){if(e==null||typeof e==`string`)return e;var t=null,n=Dd;if(n!==null)for(var r=0;r<n.length;r++){var i=e[n[r]];if(i!=null){if(i===`none`)return`none`;t=t==null?i:t+(` `+i)}}return t??e.default}function vi(e,t){return e=_i(e),t=_i(t),t==null?e===`auto`?null:e:t===`auto`?null:t}var yi=typeof reportError==`function`?reportError:function(e){if(typeof window==`object`&&typeof window.ErrorEvent==`function`){var t=new window.ErrorEvent(`error`,{bubbles:!0,cancelable:!0,message:typeof e==`object`&&e&&typeof e.message==`string`?String(e.message):String(e),error:e});if(!window.dispatchEvent(t))return}else if(typeof process==`object`&&typeof process.emit==`function`){process.emit(`uncaughtException`,e);return}console.error(e)},bi=[],xi=0,Si=0;function Ci(){for(var e=xi,t=Si=xi=0;t<e;){var n=bi[t];bi[t++]=null;var r=bi[t];bi[t++]=null;var i=bi[t];bi[t++]=null;var a=bi[t];if(bi[t++]=null,r!==null&&i!==null){var o=r.pending;o===null?i.next=i:(i.next=o.next,o.next=i),r.pending=i}a!==0&&Ei(n,i,a)}}function wi(e,t,n,r){bi[xi++]=e,bi[xi++]=t,bi[xi++]=n,bi[xi++]=r,Si|=r,e.lanes|=r,e=e.alternate,e!==null&&(e.lanes|=r)}function V(e,t,n,r){return wi(e,t,n,r),Di(e)}function Ti(e,t){return wi(e,null,null,t),Di(e)}function Ei(e,t,n){e.lanes|=n;var r=e.alternate;r!==null&&(r.lanes|=n);for(var i=!1,a=e.return;a!==null;)a.childLanes|=n,r=a.alternate,r!==null&&(r.childLanes|=n),a.tag===22&&(e=a.stateNode,e===null||e._visibility&1||(i=!0)),e=a,a=a.return;return e.tag===3?(a=e.stateNode,i&&t!==null&&(i=31-nt(n),e=a.hiddenUpdates,r=e[i],r===null?e[i]=[t]:r.push(t),t.lane=n|536870912),a):null}function Di(e){if(50<Od)throw Od=0,kd=null,Error(i(185));for(var t=e.return;t!==null;)e=t,t=e.return;return e.tag===3?e.stateNode:null}var Oi={};function ki(e,t,n,r){this.tag=e,this.key=n,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.refCleanup=this.ref=null,this.pendingProps=t,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=r,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function Ai(e,t,n,r){return new ki(e,t,n,r)}function ji(e){return e=e.prototype,!(!e||!e.isReactComponent)}function Mi(e,t){var n=e.alternate;return n===null?(n=Ai(e.tag,t,e.key,e.mode),n.elementType=e.elementType,n.type=e.type,n.stateNode=e.stateNode,n.alternate=e,e.alternate=n):(n.pendingProps=t,n.type=e.type,n.flags=0,n.subtreeFlags=0,n.deletions=null),n.flags=e.flags&1206910976,n.childLanes=e.childLanes,n.lanes=e.lanes,n.child=e.child,n.memoizedProps=e.memoizedProps,n.memoizedState=e.memoizedState,n.updateQueue=e.updateQueue,t=e.dependencies,n.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext},n.sibling=e.sibling,n.index=e.index,n.ref=e.ref,n.refCleanup=e.refCleanup,n}function Ni(e,t){e.flags&=1206910978;var n=e.alternate;return n===null?(e.childLanes=0,e.lanes=t,e.child=null,e.subtreeFlags=0,e.memoizedProps=null,e.memoizedState=null,e.updateQueue=null,e.dependencies=null,e.stateNode=null):(e.childLanes=n.childLanes,e.lanes=n.lanes,e.child=n.child,e.subtreeFlags=0,e.deletions=null,e.memoizedProps=n.memoizedProps,e.memoizedState=n.memoizedState,e.updateQueue=n.updateQueue,e.type=n.type,t=n.dependencies,e.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),e}function Pi(e,t,n,r,a,o){var s=0;if(r=e,typeof r==`function`)ji(r)&&(s=1);else if(typeof r==`string`)s=qm(e,n,Te.current)?26:e===`html`||e===`head`||e===`body`?27:5;else a:switch(r){case pe:return e=Ai(31,n,t,a),e.elementType=pe,e.lanes=o,e;case ie:return Fi(n.children,a,o,t);case ae:s=8,a|=24;break;case oe:return e=Ai(12,n,t,a|2),e.elementType=oe,e.lanes=o,e;case ue:return e=Ai(13,n,t,a),e.elementType=ue,e.lanes=o,e;case D:return e=Ai(19,n,t,a),e.elementType=D,e.lanes=o,e;case O:case me:return e=a|32,e=Ai(30,n,t,e),e.elementType=me,e.lanes=o,e.stateNode={autoName:null,paired:null,clones:null,ref:null},e;default:if(typeof r==`object`&&r)switch(r.$$typeof){case ce:s=10;break a;case se:s=9;break a;case le:s=11;break a;case de:s=14;break a;case fe:s=16,r=null;break a}s=29,n=Error(i(130,e===null?`null`:typeof e,``)),r=null}return t=Ai(s,n,t,a),t.elementType=e,t.type=r,t.lanes=o,t}function Fi(e,t,n,r){return e=Ai(7,e,r,t),e.lanes=n,e}function Ii(e,t,n){return e=Ai(6,e,null,t),e.lanes=n,e}function Li(e){var t=Ai(18,null,null,0);return t.stateNode=e,t}function Ri(e,t,n){return t=Ai(4,e.children===null?[]:e.children,e.key,t),t.lanes=n,t.stateNode={containerInfo:e.containerInfo,pendingChildren:null,implementation:e.implementation},t}var zi=new WeakMap;function Bi(e,t){if(typeof e==`object`&&e){var n=zi.get(e);return n===void 0?(t={value:e,source:t,stack:ze(t)},zi.set(e,t),t):n}return{value:e,source:t,stack:ze(t)}}var Vi=[],Hi=0,Ui=null,Wi=0,Gi=[],Ki=0,qi=null,Ji=1,Yi=``;function Xi(e,t){Vi[Hi++]=Wi,Vi[Hi++]=Ui,Ui=e,Wi=t}function Zi(e,t,n){Gi[Ki++]=Ji,Gi[Ki++]=Yi,Gi[Ki++]=qi,qi=e;var r=Ji;e=Yi;var i=32-nt(r)-1;r&=~(1<<i),n+=1;var a=32-nt(t)+i;if(30<a){var o=i-i%5;a=(r&(1<<o)-1).toString(32),r>>=o,i-=o,Ji=1<<32-nt(t)+i|n<<i|r,Yi=a+e}else Ji=1<<a|n<<i|r,Yi=e}function Qi(e){e.return!==null&&(Xi(e,1),Zi(e,1,0))}function $i(e){for(;e===Ui;)Ui=Vi[--Hi],Vi[Hi]=null,Wi=Vi[--Hi],Vi[Hi]=null;for(;e===qi;)qi=Gi[--Ki],Gi[Ki]=null,Yi=Gi[--Ki],Gi[Ki]=null,Ji=Gi[--Ki],Gi[Ki]=null}function ea(e,t){Gi[Ki++]=Ji,Gi[Ki++]=Yi,Gi[Ki++]=qi,Ji=t.id,Yi=t.overflow,qi=e}var ta=null,na=null,H=!1,ra=null,ia=!1,aa=Error(i(519));function oa(e){throw fa(Bi(Error(i(418,1<arguments.length&&arguments[1]!==void 0&&arguments[1]?`text`:`HTML`,``)),e)),aa}function sa(e){var t=e.stateNode,n=e.type,r=e.memoizedProps;switch(t[wt]=e,t[Tt]=r,n){case`dialog`:$(`cancel`,t),$(`close`,t);break;case`iframe`:case`object`:case`embed`:$(`load`,t);break;case`video`:case`audio`:for(n=0;n<Rf.length;n++)$(Rf[n],t);break;case`source`:$(`error`,t);break;case`img`:case`image`:case`link`:$(`error`,t),$(`load`,t);break;case`details`:$(`toggle`,t);break;case`input`:$(`invalid`,t),on(t,r.value,r.defaultValue,r.checked,r.defaultChecked,r.type,r.name,!0);break;case`select`:$(`invalid`,t);break;case`textarea`:$(`invalid`,t),un(t,r.value,r.defaultValue,r.children)}n=r.children,typeof n!=`string`&&typeof n!=`number`&&typeof n!=`bigint`||t.textContent===``+n||!0===r.suppressHydrationWarning||$f(t.textContent,n)?(r.popover!=null&&($(`beforetoggle`,t),$(`toggle`,t)),r.onScroll!=null&&$(`scroll`,t),r.onScrollEnd!=null&&$(`scrollend`,t),r.onClick!=null&&(t.onclick=yn),t=!0):t=!1,t||oa(e,!0)}function ca(e){for(ta=e.return;ta;)switch(ta.tag){case 5:case 31:case 13:ia=!1;return;case 27:case 3:ia=!0;return;default:ta=ta.return}}function la(e){if(e!==ta)return!1;if(!H)return ca(e),H=!0,!1;var t=e.tag,n;if((n=t!==3&&t!==27)&&((n=t===5)&&(n=e.type,n=n===`form`||n===`button`||pp(e.type,e.memoizedProps)),n=!n),n&&na&&oa(e),ca(e),t===13){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));na=dm(e)}else if(t===31){if(e=e.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(317));na=dm(e)}else t===27?(t=na,Sp(e.type)?(e=um,um=null,na=e):na=t):na=ta?lm(e.stateNode.nextSibling):null;return!0}function ua(){na=ta=null,H=!1}function da(){var e=ra;return e!==null&&(dd===null?dd=e:dd.push.apply(dd,e),ra=null),e}function fa(e){ra===null?ra=[e]:ra.push(e)}var pa=Ce(null),ma=null,ha=null;function ga(e,t,n){N(pa,t._currentValue),t._currentValue=n}function _a(e){e._currentValue=pa.current,we(pa)}function va(e,t,n){for(;e!==null;){var r=e.alternate;if((e.childLanes&t)===t?r!==null&&(r.childLanes&t)!==t&&(r.childLanes|=t):(e.childLanes|=t,r!==null&&(r.childLanes|=t)),e===n)break;e=e.return}}function ya(e,t,n,r){var a=e.child;for(a!==null&&(a.return=e);a!==null;){var o=a.dependencies;if(o!==null){var s=a.child;o=o.firstContext;a:for(;o!==null;){var c=o;o=a;for(var l=0;l<t.length;l++)if(c.context===t[l]){o.lanes|=n,c=o.alternate,c!==null&&(c.lanes|=n),va(o.return,n,e),r||(s=null);break a}o=c.next}}else if(a.tag===18){if(s=a.return,s===null)throw Error(i(341));s.lanes|=n,o=s.alternate,o!==null&&(o.lanes|=n),va(s,n,e),s=null}else a.tag===13&&a.memoizedState!==null&&a.memoizedState.dehydrated===null?(a.lanes|=n,s=a.alternate,s!==null&&(s.lanes|=n),va(a.return,n,e),s=a.child,s=s===null?null:s.sibling):s=a.child;if(s!==null)s.return=a;else for(s=a;s!==null;){if(s===e){s=null;break}if(a=s.sibling,a!==null){a.return=s.return,s=a;break}s=s.return}a=s}}function ba(e,t,n,r){e=null;for(var a=t,o=!1;a!==null;){if(!o){if(a.flags&524288)o=!0;else if(a.flags&262144)break}if(a.tag===10){var s=a.alternate;if(s===null)throw Error(i(387));if(s=s.memoizedProps,s!==null){var c=a.type;Hr(a.pendingProps.value,s.value)||(e===null?e=[c]:e.push(c))}}else if(a===Oe.current){if(s=a.alternate,s===null)throw Error(i(387));s.memoizedState.memoizedState!==a.memoizedState.memoizedState&&(e===null?e=[sh]:e.push(sh))}a=a.return}return e!==null&&ya(t,e,n,r),t.flags|=262144,e!==null}function xa(e){for(e=e.firstContext;e!==null;){if(!Hr(e.context._currentValue,e.memoizedValue))return!0;e=e.next}return!1}function Sa(e){ma=e,ha=null,e=e.dependencies,e!==null&&(e.firstContext=null)}function Ca(e){return Ta(ma,e)}function wa(e,t){return ma===null&&Sa(e),Ta(e,t)}function Ta(e,t){var n=t._currentValue;if(t={context:t,memoizedValue:n,next:null},ha===null){if(e===null)throw Error(i(308));ha=t,e.dependencies={lanes:0,firstContext:t},e.flags|=524288}else ha=ha.next=t;return n}var Ea=typeof AbortController<`u`?AbortController:function(){var e=[],t=this.signal={aborted:!1,addEventListener:function(t,n){e.push(n)}};this.abort=function(){t.aborted=!0,e.forEach(function(e){return e()})}},Da=t.unstable_scheduleCallback,Oa=t.unstable_NormalPriority,ka={$$typeof:ce,Consumer:null,Provider:null,_currentValue:null,_currentValue2:null,_threadCount:0};function Aa(){return{controller:new Ea,data:new Map,refCount:0}}function ja(e){e.refCount--,e.refCount===0&&Da(Oa,function(){e.controller.abort()})}function Ma(e,t){if(e.pendingLanes&4194048){var n=e.transitionTypes;for(n===null&&(n=e.transitionTypes=[]),e=0;e<t.length;e++){var r=t[e];n.indexOf(r)===-1&&n.push(r)}}}var Na=null;function Pa(e){var t=e.transitionTypes;return e.transitionTypes=null,t}var Fa=null,Ia=0,La=0,Ra=null;function za(e,t){if(Fa===null){var n=Fa=[];Ia=0,La=Nf(),Ra={status:`pending`,value:void 0,then:function(e){n.push(e)}}}return Ia++,t.then(Ba,Ba),t}function Ba(){if(--Ia===0&&(Na=null,Fa!==null)){Ra!==null&&(Ra.status=`fulfilled`);var e=Fa;Fa=null,La=0,Ra=null;for(var t=0;t<e.length;t++)(0,e[t])()}}function Va(e,t){var n=[],r={status:`pending`,value:null,reason:null,then:function(e){n.push(e)}};return e.then(function(){r.status=`fulfilled`,r.value=t;for(var e=0;e<n.length;e++)(0,n[e])(t)},function(e){for(r.status=`rejected`,r.reason=e,e=0;e<n.length;e++)(0,n[e])(void 0)}),r}var Ha=A.S;A.S=function(e,t){if(md=Ge(),typeof t==`object`&&t&&typeof t.then==`function`&&za(e,t),Na!==null)for(var n=yf;n!==null;)Ma(n,Na),n=n.next;if(n=e.types,n!==null){for(var r=yf;r!==null;)Ma(r,n),r=r.next;if(La!==0){r=Na,r===null&&(r=Na=[]);for(var i=0;i<n.length;i++){var a=n[i];r.indexOf(a)===-1&&r.push(a)}}}Ha!==null&&Ha(e,t)};var Ua=Ce(null);function Wa(){var e=Ua.current;return e===null?Qu.pooledCache:e}function Ga(e,t){t===null?N(Ua,Ua.current):N(Ua,t.pool)}function Ka(){var e=Wa();return e===null?null:{parent:ka._currentValue,pool:e}}var qa=Error(i(460)),Ja=Error(i(474)),Ya=Error(i(542)),Xa={then:function(){}};function Za(e){return e=e.status,e===`fulfilled`||e===`rejected`}function Qa(e,t,n){switch(n=e[n],n===void 0?e.push(t):n!==t&&(t.then(yn,yn),t=n),t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,no(e),e===void 0&&!(`reason`in t)?Error(i(600)):e;default:if(typeof t.status==`string`)t.then(yn,yn);else{if(e=Qu,e!==null&&100<e.shellSuspendCounter)throw Error(i(482));e=t,e.status=`pending`,e.then(function(e){if(t.status===`pending`){var n=t;n.status=`fulfilled`,n.value=e}},function(e){if(t.status===`pending`){var n=t;n.status=`rejected`,n.reason=e}})}switch(t.status){case`fulfilled`:return t.value;case`rejected`:throw e=t.reason,no(e),e}throw eo=t,qa}}function $a(e){try{var t=e._init;return t(e._payload)}catch(e){throw typeof e==`object`&&e&&typeof e.then==`function`?(eo=e,qa):e}}var eo=null;function to(){if(eo===null)throw Error(i(459));var e=eo;return eo=null,e}function no(e){if(e===qa||e===Ya)throw Error(i(483))}var ro=null,io=0;function ao(e){var t=io;return io+=1,ro===null&&(ro=[]),Qa(ro,e,t)}function oo(e,t){t=t.props.ref,e.ref=t===void 0?null:t}function so(e,t){throw t.$$typeof===ne?Error(i(525)):(e=Object.prototype.toString.call(t),Error(i(31,e===`[object Object]`?`object with keys {`+Object.keys(t).join(`, `)+`}`:e)))}function co(e){function t(t,n){if(e){var r=t.deletions;r===null?(t.deletions=[n],t.flags|=16):r.push(n)}}function n(n,r){if(!e)return null;for(;r!==null;)t(n,r),r=r.sibling;return null}function r(e){for(var t=new Map;e!==null;)e.key===null?t.set(e.index,e):t.set(e.key,e),e=e.sibling;return t}function a(e,t){return e=Mi(e,t),e.index=0,e.sibling=null,e}function o(t,n,r){return t.index=r,e?(r=t.alternate,r===null?(t.flags|=134217730,n):(r=r.index,r<n?(t.flags|=2,n):r)):(t.flags|=1048576,n)}function s(t){return e&&t.alternate===null&&(t.flags|=134217730),t}function c(e,t,n,r){return t===null||t.tag!==6?(t=Ii(n,e.mode,r),t.return=e,t):(t=a(t,n),t.return=e,t)}function l(e,t,n,r){var i=n.type;return i===ie?(e=d(e,t,n.props.children,r,n.key),oo(e,n),e):t!==null&&(t.elementType===i||typeof i==`object`&&i&&i.$$typeof===fe&&$a(i)===t.type)?(t=a(t,n.props),oo(t,n),t.return=e,t):(t=Pi(n.type,n.key,n.props,null,e.mode,r),oo(t,n),t.return=e,t)}function u(e,t,n,r){return t===null||t.tag!==4||t.stateNode.containerInfo!==n.containerInfo||t.stateNode.implementation!==n.implementation?(t=Ri(n,e.mode,r),t.return=e,t):(t=a(t,n.children||[]),t.return=e,t)}function d(e,t,n,r,i){return t===null||t.tag!==7?(t=Fi(n,e.mode,r,i),t.return=e,t):(t=a(t,n),t.return=e,t)}function f(e,t,n){if(typeof t==`string`&&t!==``||typeof t==`number`||typeof t==`bigint`)return t=Ii(``+t,e.mode,n),t.return=e,t;if(typeof t==`object`&&t){switch(t.$$typeof){case E:return n=Pi(t.type,t.key,t.props,null,e.mode,n),oo(n,t),n.return=e,n;case re:return t=Ri(t,e.mode,n),t.return=e,t;case fe:return t=$a(t),f(e,t,n)}if(be(t)||_e(t))return t=Fi(t,e.mode,n,null),t.return=e,t;if(typeof t.then==`function`)return f(e,ao(t),n);if(t.$$typeof===ce)return f(e,wa(e,t),n);so(e,t)}return null}function p(e,t,n,r){var i=t===null?null:t.key;if(typeof n==`string`&&n!==``||typeof n==`number`||typeof n==`bigint`)return i===null?c(e,t,``+n,r):null;if(typeof n==`object`&&n){switch(n.$$typeof){case E:return n.key===i?l(e,t,n,r):null;case re:return n.key===i?u(e,t,n,r):null;case fe:return n=$a(n),p(e,t,n,r)}if(be(n)||_e(n))return i===null?d(e,t,n,r,null):null;if(typeof n.then==`function`)return p(e,t,ao(n),r);if(n.$$typeof===ce)return p(e,t,wa(e,n),r);so(e,n)}return null}function m(e,t,n,r,i){if(typeof r==`string`&&r!==``||typeof r==`number`||typeof r==`bigint`)return e=e.get(n)||null,c(t,e,``+r,i);if(typeof r==`object`&&r){switch(r.$$typeof){case E:return e=e.get(r.key===null?n:r.key)||null,l(t,e,r,i);case re:return e=e.get(r.key===null?n:r.key)||null,u(t,e,r,i);case fe:return r=$a(r),m(e,t,n,r,i)}if(be(r)||_e(r))return e=e.get(n)||null,d(t,e,r,i,null);if(typeof r.then==`function`)return m(e,t,n,ao(r),i);if(r.$$typeof===ce)return m(e,t,n,wa(t,r),i);so(t,r)}return null}function h(i,a,s,c){for(var l=null,u=null,d=a,h=a=0,g=null;d!==null&&h<s.length;h++){d.index>h?(g=d,d=null):g=d.sibling;var _=p(i,d,s[h],c);if(_===null){d===null&&(d=g);break}e&&d&&_.alternate===null&&t(i,d),a=o(_,a,h),u===null?l=_:u.sibling=_,u=_,d=g}if(h===s.length)return n(i,d),H&&Xi(i,h),l;if(d===null){for(;h<s.length;h++)d=f(i,s[h],c),d!==null&&(a=o(d,a,h),u===null?l=d:u.sibling=d,u=d);return H&&Xi(i,h),l}for(d=r(d);h<s.length;h++)g=m(d,i,h,s[h],c),g!==null&&(e&&(_=g.alternate,_!==null&&d.delete(_.key===null?h:_.key)),a=o(g,a,h),u===null?l=g:u.sibling=g,u=g);return e&&d.forEach(function(e){return t(i,e)}),H&&Xi(i,h),l}function g(a,s,c,l){if(c==null)throw Error(i(151));for(var u=null,d=null,h=s,g=s=0,_=null,v=c.next();h!==null&&!v.done;g++,v=c.next()){h.index>g?(_=h,h=null):_=h.sibling;var y=p(a,h,v.value,l);if(y===null){h===null&&(h=_);break}e&&h&&y.alternate===null&&t(a,h),s=o(y,s,g),d===null?u=y:d.sibling=y,d=y,h=_}if(v.done)return n(a,h),H&&Xi(a,g),u;if(h===null){for(;!v.done;g++,v=c.next())v=f(a,v.value,l),v!==null&&(s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return H&&Xi(a,g),u}for(h=r(h);!v.done;g++,v=c.next())v=m(h,a,g,v.value,l),v!==null&&(e&&(_=v.alternate,_!==null&&h.delete(_.key===null?g:_.key)),s=o(v,s,g),d===null?u=v:d.sibling=v,d=v);return e&&h.forEach(function(e){return t(a,e)}),H&&Xi(a,g),u}function _(e,r,o,c){if(typeof o==`object`&&o&&o.type===ie&&o.key===null&&o.props.ref===void 0&&(o=o.props.children),typeof o==`object`&&o){switch(o.$$typeof){case E:a:{for(var l=o.key;r!==null;){if(r.key===l){if(l=o.type,l===ie){if(r.tag===7){n(e,r.sibling),c=a(r,o.props.children),oo(c,o),c.return=e,e=c;break a}}else if(r.elementType===l||typeof l==`object`&&l&&l.$$typeof===fe&&$a(l)===r.type){n(e,r.sibling),c=a(r,o.props),oo(c,o),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}o.type===ie?(c=Fi(o.props.children,e.mode,c,o.key),oo(c,o),c.return=e,e=c):(c=Pi(o.type,o.key,o.props,null,e.mode,c),oo(c,o),c.return=e,e=c)}return s(e);case re:a:{for(l=o.key;r!==null;){if(r.key===l){if(r.tag===4&&r.stateNode.containerInfo===o.containerInfo&&r.stateNode.implementation===o.implementation){n(e,r.sibling),c=a(r,o.children||[]),c.return=e,e=c;break a}n(e,r);break}t(e,r),r=r.sibling}c=Ri(o,e.mode,c),c.return=e,e=c}return s(e);case fe:return o=$a(o),_(e,r,o,c)}if(be(o))return h(e,r,o,c);if(_e(o)){if(l=_e(o),typeof l!=`function`)throw Error(i(150));return o=l.call(o),g(e,r,o,c)}if(typeof o.then==`function`)return _(e,r,ao(o),c);if(o.$$typeof===ce)return _(e,r,wa(e,o),c);so(e,o)}return typeof o==`string`&&o!==``||typeof o==`number`||typeof o==`bigint`?(o=``+o,r!==null&&r.tag===6?(n(e,r.sibling),c=a(r,o),c.return=e,e=c):(n(e,r),c=Ii(o,e.mode,c),c.return=e,e=c),s(e)):n(e,r)}return function(e,t,n,r){try{io=0;var i=_(e,t,n,r);return ro=null,i}catch(t){if(t===qa||t===Ya)throw t;var a=Ai(29,t,null,e.mode);return a.lanes=r,a.return=e,a}}}var lo=co(!0),uo=co(!1),fo=!1;function po(e){e.updateQueue={baseState:e.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,lanes:0,hiddenCallbacks:null},callbacks:null}}function mo(e,t){e=e.updateQueue,t.updateQueue===e&&(t.updateQueue={baseState:e.baseState,firstBaseUpdate:e.firstBaseUpdate,lastBaseUpdate:e.lastBaseUpdate,shared:e.shared,callbacks:null})}function ho(e){return{lane:e,tag:0,payload:null,callback:null,next:null}}function go(e,t,n){var r=e.updateQueue;if(r===null)return null;if(r=r.shared,J&2){var i=r.pending;return i===null?t.next=t:(t.next=i.next,i.next=t),r.pending=t,t=Di(e),Ei(e,null,n),t}return wi(e,r,t,n),Di(e)}function _o(e,t,n){if(t=t.updateQueue,t!==null&&(t=t.shared,n&4194048)){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,_t(e,n)}}function vo(e,t){var n=e.updateQueue,r=e.alternate;if(r!==null&&(r=r.updateQueue,n===r)){var i=null,a=null;if(n=n.firstBaseUpdate,n!==null){do{var o={lane:n.lane,tag:n.tag,payload:n.payload,callback:null,next:null};a===null?i=a=o:a=a.next=o,n=n.next}while(n!==null);a===null?i=a=t:a=a.next=t}else i=a=t;n={baseState:r.baseState,firstBaseUpdate:i,lastBaseUpdate:a,shared:r.shared,callbacks:r.callbacks},e.updateQueue=n}else e=n.lastBaseUpdate,e===null?n.firstBaseUpdate=t:e.next=t,n.lastBaseUpdate=t}var yo=!1;function bo(){if(yo){var e=Ra;if(e!==null)throw e}}function xo(e,t,n,r){yo=!1;var i=e.updateQueue;fo=!1;var a=i.firstBaseUpdate,o=i.lastBaseUpdate,s=i.shared.pending;if(s!==null){i.shared.pending=null;var c=s,l=c.next;c.next=null,o===null?a=l:o.next=l,o=c;var u=e.alternate;u!==null&&(u=u.updateQueue,s=u.lastBaseUpdate,s!==o&&(s===null?u.firstBaseUpdate=l:s.next=l,u.lastBaseUpdate=c))}if(a!==null){var d=i.baseState;o=0,u=l=c=null,s=a;do{var f=s.lane&-536870913,p=f!==s.lane;if(p?(X&f)===f:(r&f)===f){f!==0&&f===La&&(yo=!0),u!==null&&(u=u.next={lane:0,tag:s.tag,payload:s.payload,callback:null,next:null});a:{var m=e,h=s;f=t;var g=n;switch(h.tag){case 1:if(m=h.payload,typeof m==`function`){d=m.call(g,d,f);break a}d=m;break a;case 3:m.flags=m.flags&-65537|128;case 0:if(m=h.payload,f=typeof m==`function`?m.call(g,d,f):m,f==null)break a;d=T({},d,f);break a;case 2:fo=!0}}f=s.callback,f!==null&&(e.flags|=64,p&&(e.flags|=8192),p=i.callbacks,p===null?i.callbacks=[f]:p.push(f))}else p={lane:f,tag:s.tag,payload:s.payload,callback:s.callback,next:null},u===null?(l=u=p,c=d):u=u.next=p,o|=f;if(s=s.next,s===null){if(s=i.shared.pending,s===null)break;p=s,s=p.next,p.next=null,i.lastBaseUpdate=p,i.shared.pending=null}}while(1);u===null&&(c=d),i.baseState=c,i.firstBaseUpdate=l,i.lastBaseUpdate=u,a===null&&(i.shared.lanes=0),ad|=o,e.lanes=o,e.memoizedState=d}}function So(e,t){if(typeof e!=`function`)throw Error(i(191,e));e.call(t)}function Co(e,t){var n=e.callbacks;if(n!==null)for(e.callbacks=null,e=0;e<n.length;e++)So(n[e],t)}var wo=Ce(null),To=Ce(0);function Eo(e,t){e=rd,N(To,e),N(wo,t),rd=e|t.baseLanes}function Do(){N(To,rd),N(wo,wo.current)}function Oo(){rd=To.current,we(wo),we(To)}var ko=Ce(null),Ao=null;function jo(e){var t=e.alternate;N(Io,Io.current&1),N(ko,e),Ao===null&&(t===null||wo.current!==null||t.memoizedState!==null)&&(Ao=e)}function Mo(e){N(Io,Io.current),N(ko,e),Ao===null&&(Ao=e)}function No(e){e.tag===22?(N(Io,Io.current),N(ko,e),Ao===null&&(Ao=e)):Po()}function Po(){N(Io,Io.current),N(ko,ko.current)}function Fo(e){we(ko),Ao===e&&(Ao=null),we(Io)}var Io=Ce(0);function Lo(e,t){N(ko,ko.current),N(Io,t)}function Ro(e){we(Io),we(ko),Ao===e&&(Ao=null)}function zo(e){for(var t=e;t!==null;){if(t.tag===13){var n=t.memoizedState;if(n!==null&&(n=n.dehydrated,n===null||om(n)||sm(n)))return t}else if(t.tag===19&&t.memoizedProps.revealOrder!==`independent`){if(t.flags&128)return t}else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return null;t=t.return}t.sibling.return=t.return,t=t.sibling}return null}var Bo=0,U=null,W=null,Vo=null,Ho=!1,Uo=!1,Wo=!1,Go=0,Ko=0,qo=null,Jo=0;function Yo(){throw Error(i(321))}function Xo(e,t){if(t===null)return!1;for(var n=0;n<t.length&&n<e.length;n++)if(!Hr(e[n],t[n]))return!1;return!0}function Zo(e,t,n,r,i,a){return Bo=a,U=t,t.memoizedState=null,t.updateQueue=null,t.lanes=0,A.H=e===null||e.memoizedState===null?pc:mc,Wo=!1,a=n(r,i),Wo=!1,Uo&&(a=$o(t,n,r,i)),Qo(e),a}function Qo(e){A.H=fc;var t=W!==null&&W.next!==null;if(Bo=0,Vo=W=U=null,Ho=!1,Ko=0,qo=null,t)throw Error(i(300));e===null||jc||(e=e.dependencies,e!==null&&xa(e)&&(jc=!0))}function $o(e,t,n,r){U=e;var a=0;do{if(Uo&&(qo=null),Ko=0,Uo=!1,25<=a)throw Error(i(301));if(a+=1,Vo=W=null,e.updateQueue!=null){var o=e.updateQueue;o.lastEffect=null,o.events=null,o.stores=null,o.memoCache!=null&&(o.memoCache.index=0)}A.H=hc,o=t(n,r)}while(Uo);return o}function es(){var e=A.H,t=e.useState()[0];return t=typeof t.then==`function`?ss(t):t,e=e.useState()[0],(W===null?null:W.memoizedState)!==e&&(U.flags|=1024),t}function ts(){var e=Go!==0;return Go=0,e}function ns(e,t,n){t.updateQueue=e.updateQueue,t.flags&=-2053,e.lanes&=~n}function rs(e){if(Ho){for(e=e.memoizedState;e!==null;){var t=e.queue;t!==null&&(t.pending=null),e=e.next}Ho=!1}Bo=0,Vo=W=U=null,Uo=!1,Ko=Go=0,qo=null}function is(){var e={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Vo===null?U.memoizedState=Vo=e:Vo=Vo.next=e,Vo}function as(){if(W===null){var e=U.alternate;e=e===null?null:e.memoizedState}else e=W.next;var t=Vo===null?U.memoizedState:Vo.next;if(t!==null)Vo=t,W=e;else{if(e===null)throw U.alternate===null?Error(i(467)):Error(i(310));W=e,e={memoizedState:W.memoizedState,baseState:W.baseState,baseQueue:W.baseQueue,queue:W.queue,next:null},Vo===null?U.memoizedState=Vo=e:Vo=Vo.next=e}return Vo}function os(){return{lastEffect:null,events:null,stores:null,memoCache:null}}function ss(e){var t=Ko;return Ko+=1,qo===null&&(qo=[]),e=Qa(qo,e,t),t=U,(Vo===null?t.memoizedState:Vo.next)===null&&(t=t.alternate,A.H=t===null||t.memoizedState===null?pc:mc),e}function G(e){if(typeof e==`object`&&e){if(typeof e.then==`function`)return ss(e);if(e.$$typeof===he)return;if(e.$$typeof===ce)return Ca(e)}throw Error(i(438,String(e)))}function cs(e){var t=null,n=U.updateQueue;if(n!==null&&(t=n.memoCache),t==null){var r=U.alternate;r!==null&&(r=r.updateQueue,r!==null&&(r=r.memoCache,r!=null&&(t={data:r.data.map(function(e){return e.slice()}),index:0})))}if(t??={data:[],index:0},n===null&&(n=os(),U.updateQueue=n),n.memoCache=t,n=t.data[t.index],n===void 0)for(n=t.data[t.index]=Array(e),r=0;r<e;r++)n[r]=k;return t.index++,n}function ls(e,t){return typeof t==`function`?t(e):t}function us(e){return ds(as(),W,e)}function ds(e,t,n){var r=e.queue;if(r===null)throw Error(i(311));r.lastRenderedReducer=n;var a=e.baseQueue,o=r.pending;if(o!==null){if(a!==null){var s=a.next;a.next=o.next,o.next=s}t.baseQueue=a=o,r.pending=null}if(o=e.baseState,a===null)e.memoizedState=o;else{t=a.next;var c=s=null,l=null,u=t,d=!1;do{var f=u.lane&-536870913;if(f===u.lane?(Bo&f)===f:(X&f)===f){var p=u.revertLane;if(p===0)l!==null&&(l=l.next={lane:0,revertLane:0,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null}),f===La&&(d=!0);else if((Bo&p)===p){u=u.next,p===La&&(d=!0);continue}else f={lane:0,revertLane:u.revertLane,gesture:null,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=f,s=o):l=l.next=f,U.lanes|=p,ad|=p;f=u.action,Wo&&n(o,f),o=u.hasEagerState?u.eagerState:n(o,f)}else p={lane:f,revertLane:u.revertLane,gesture:u.gesture,action:u.action,hasEagerState:u.hasEagerState,eagerState:u.eagerState,next:null},l===null?(c=l=p,s=o):l=l.next=p,U.lanes|=f,ad|=f;u=u.next}while(u!==null&&u!==t);if(l===null?s=o:l.next=c,!Hr(o,e.memoizedState)&&(jc=!0,d&&(n=Ra,n!==null)))throw n;e.memoizedState=o,e.baseState=s,e.baseQueue=l,r.lastRenderedState=o}return a===null&&(r.lanes=0),[e.memoizedState,r.dispatch]}function fs(e){var t=as(),n=t.queue;if(n===null)throw Error(i(311));n.lastRenderedReducer=e;var r=n.dispatch,a=n.pending,o=t.memoizedState;if(a!==null){n.pending=null;var s=a=a.next;do o=e(o,s.action),s=s.next;while(s!==a);Hr(o,t.memoizedState)||(jc=!0),t.memoizedState=o,t.baseQueue===null&&(t.baseState=o),n.lastRenderedState=o}return[o,r]}function ps(e,t,n){var r=U,a=as(),o=H;if(o){if(n===void 0)throw Error(i(407));n=n()}else n=t();var s=!Hr((W||a).memoizedState,n);if(s&&(a.memoizedState=n,jc=!0),a=a.queue,Rs(gs.bind(null,r,a,e),[e]),e=a.getSnapshot!==t||s||Vo!==null&&!!(Vo.memoizedState.tag&1),Ns(e?9:8,{destroy:void 0},hs.bind(null,r,a,n,t),null),e){if(r.flags|=2048,Qu===null)throw Error(i(349));o||Bo&127||ms(r,t,n)}return n}function ms(e,t,n){e.flags|=16384,e={getSnapshot:t,value:n},t=U.updateQueue,t===null?(t=os(),U.updateQueue=t,t.stores=[e]):(n=t.stores,n===null?t.stores=[e]:n.push(e))}function hs(e,t,n,r){t.value=n,t.getSnapshot=r,_s(t)&&vs(e)}function gs(e,t,n){return n(function(){_s(t)&&vs(e)})}function _s(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!Hr(e,n)}catch{return!0}}function vs(e){var t=Ti(e,2);t!==null&&Nd(t,e,2)}function ys(e){var t=is();if(typeof e==`function`){var n=e;if(e=n(),Wo){tt(!0);try{n()}finally{tt(!1)}}}return t.memoizedState=t.baseState=e,t.queue={pending:null,lanes:0,dispatch:null,lastRenderedReducer:ls,lastRenderedState:e},t}function bs(e,t,n,r){return e.baseState=n,ds(e,W,typeof r==`function`?r:ls)}function xs(e,t,n,r,a){if(lc(e))throw Error(i(485));if(e=t.action,e!==null){var o={payload:a,action:e,next:null,isTransition:!0,status:`pending`,value:null,reason:null,listeners:[],then:function(e){o.listeners.push(e)}};A.T===null?o.isTransition=!1:n(!0),r(o),n=t.pending,n===null?(o.next=t.pending=o,Ss(t,o)):(o.next=n.next,t.pending=n.next=o)}}function Ss(e,t){var n=t.action,r=t.payload,i=e.state;if(t.isTransition){var a=A.T,o={};o.types=a===null?null:a.types,A.T=o;try{var s=n(i,r),c=A.S;c!==null&&c(o,s),Cs(e,t,s)}catch(n){Ts(e,t,n)}finally{a!==null&&o.types!==null&&(a.types=o.types),A.T=a}}else try{a=n(i,r),Cs(e,t,a)}catch(n){Ts(e,t,n)}}function Cs(e,t,n){typeof n==`object`&&n&&typeof n.then==`function`?n.then(function(n){ws(e,t,n)},function(n){return Ts(e,t,n)}):ws(e,t,n)}function ws(e,t,n){t.status=`fulfilled`,t.value=n,Es(t),e.state=n,t=e.pending,t!==null&&(n=t.next,n===t?e.pending=null:(n=n.next,t.next=n,Ss(e,n)))}function Ts(e,t,n){var r=e.pending;if(e.pending=null,r!==null){r=r.next;do t.status=`rejected`,t.reason=n,Es(t),t=t.next;while(t!==r)}e.action=null}function Es(e){e=e.listeners;for(var t=0;t<e.length;t++)(0,e[t])()}function Ds(e,t){return t}function Os(e,t){if(H){var n=Qu.formState;if(n!==null){a:{var r=U;if(H){if(na){b:{for(var i=na,a=ia;i.nodeType!==8;)if(!a||(i=lm(i.nextSibling),i===null)){i=null;break b}a=i.data,i=a===`F!`||a===`F`?i:null}if(i){na=lm(i.nextSibling),r=i.data===`F!`;break a}}oa(r)}r=!1}r&&(t=n[0])}}return n=is(),n.memoizedState=n.baseState=t,r={pending:null,lanes:0,dispatch:null,lastRenderedReducer:Ds,lastRenderedState:t},n.queue=r,n=oc.bind(null,U,r),r.dispatch=n,r=ys(!1),a=cc.bind(null,U,!1,r.queue),r=is(),i={state:t,dispatch:null,action:e,pending:null},r.queue=i,n=xs.bind(null,U,i,a,n),i.dispatch=n,r.memoizedState=e,[t,n,!1]}function ks(e){return As(as(),W,e)}function As(e,t,n){if(t=ds(e,t,Ds)[0],e=us(ls)[0],typeof t==`object`&&t&&typeof t.then==`function`)try{var r=ss(t)}catch(e){throw e===qa?Ya:e}else r=t;t=as();var i=t.queue,a=i.dispatch;return n!==t.memoizedState&&(U.flags|=2048,Ns(9,{destroy:void 0},js.bind(null,i,n),null)),[r,a,e]}function js(e,t){e.action=t}function Ms(e){var t=as(),n=W;if(n!==null)return As(t,n,e);as(),t=t.memoizedState,n=as();var r=n.queue.dispatch;return n.memoizedState=e,[t,r,!1]}function Ns(e,t,n,r){return e={tag:e,create:n,deps:r,inst:t,next:null},t=U.updateQueue,t===null&&(t=os(),U.updateQueue=t),n=t.lastEffect,n===null?t.lastEffect=e.next=e:(r=n.next,n.next=e,e.next=r,t.lastEffect=e),e}function Ps(){return as().memoizedState}function Fs(e,t,n,r){var i=is();U.flags|=e,i.memoizedState=Ns(1|t,{destroy:void 0},n,r===void 0?null:r)}function Is(e,t,n,r){var i=as();r=r===void 0?null:r;var a=i.memoizedState.inst;W!==null&&r!==null&&Xo(r,W.memoizedState.deps)?i.memoizedState=Ns(t,a,n,r):(U.flags|=e,i.memoizedState=Ns(1|t,a,n,r))}function Ls(e,t){Fs(8390656,8,e,t)}function Rs(e,t){Is(2048,8,e,t)}function zs(e){U.flags|=4;var t=U.updateQueue;if(t===null)t=os(),U.updateQueue=t,t.events=[e];else{var n=t.events;n===null?t.events=[e]:n.push(e)}}function Bs(e){var t=as().memoizedState;return zs({ref:t,nextImpl:e}),function(){if(J&2)throw Error(i(440));return t.impl.apply(void 0,arguments)}}function Vs(e,t){return Is(4,2,e,t)}function Hs(e,t){return Is(4,4,e,t)}function Us(e,t){if(typeof t==`function`){e=e();var n=t(e);return function(){typeof n==`function`?n():t(null)}}if(t!=null)return e=e(),t.current=e,function(){t.current=null}}function Ws(e,t,n){n=n==null?null:n.concat([e]),Is(4,4,Us.bind(null,t,e),n)}function Gs(){}function Ks(e,t){var n=as();t=t===void 0?null:t;var r=n.memoizedState;return t!==null&&Xo(t,r[1])?r[0]:(n.memoizedState=[e,t],e)}function qs(e,t){var n=as();t=t===void 0?null:t;var r=n.memoizedState;if(t!==null&&Xo(t,r[1]))return r[0];if(r=e(),Wo){tt(!0);try{e()}finally{tt(!1)}}return n.memoizedState=[r,t],r}function Js(e,t,n){return n===void 0||Bo&1073741824&&!(X&261930)?e.memoizedState=t:(e.memoizedState=n,e=jd(),U.lanes|=e,ad|=e,n)}function Ys(e,t,n,r){return Hr(n,t)?n:wo.current===null?!(Bo&106)||Bo&1073741824&&!(X&261930)?(jc=!0,e.memoizedState=n):(e=jd(),U.lanes|=e,ad|=e,t):(e=Js(e,n,r),Hr(e,t)||(jc=!0),e)}function Xs(e,t,n,r,i){var a=j.p;j.p=a!==0&&8>a?a:8;var o=A.T,s={};s.types=o===null?null:o.types,A.T=s,cc(e,!1,t,n);try{var c=i(),l=A.S;l!==null&&l(s,c),typeof c==`object`&&c&&typeof c.then==`function`?sc(e,t,Va(c,r),Ad(e)):sc(e,t,r,Ad(e))}catch(n){sc(e,t,{then:function(){},status:`rejected`,reason:n},Ad())}finally{j.p=a,o!==null&&s.types!==null&&(o.types=s.types),A.T=o}}function Zs(){}function Qs(e,t,n,r){if(e.tag!==5)throw Error(i(476));var a=$s(e).queue;Xs(e,a,t,xe,n===null?Zs:function(){return ec(e),n(r)})}function $s(e){var t=e.memoizedState;if(t!==null)return t;t={memoizedState:xe,baseState:xe,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ls,lastRenderedState:xe},next:null};var n={};return t.next={memoizedState:n,baseState:n,baseQueue:null,queue:{pending:null,lanes:0,dispatch:null,lastRenderedReducer:ls,lastRenderedState:n},next:null},e.memoizedState=t,e=e.alternate,e!==null&&(e.memoizedState=t),t}function ec(e){var t=$s(e);t.next===null&&(t=e.alternate.memoizedState),sc(e,t.next.queue,{},Ad())}function tc(){return Ca(sh)}function nc(){return as().memoizedState}function rc(){return as().memoizedState}function ic(e){for(var t=e.return;t!==null;){switch(t.tag){case 24:case 3:var n=Ad();e=ho(n);var r=go(t,e,n);r!==null&&(Nd(r,t,n),_o(r,t,n)),t={cache:Aa()},e.payload=t;return}t=t.return}}function ac(e,t,n){var r=Ad();n={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null},lc(e)?uc(t,n):(n=V(e,t,n,r),n!==null&&(Nd(n,e,r),dc(n,t,r)))}function oc(e,t,n){sc(e,t,n,Ad())}function sc(e,t,n,r){var i={lane:r,revertLane:0,gesture:null,action:n,hasEagerState:!1,eagerState:null,next:null};if(lc(e))uc(t,i);else{var a=e.alternate;if(e.lanes===0&&(a===null||a.lanes===0)&&(a=t.lastRenderedReducer,a!==null))try{var o=t.lastRenderedState,s=a(o,n);if(i.hasEagerState=!0,i.eagerState=s,Hr(s,o))return wi(e,t,i,0),Qu===null&&Ci(),!1}catch{}if(n=V(e,t,i,r),n!==null)return Nd(n,e,r),dc(n,t,r),!0}return!1}function cc(e,t,n,r){if(r={lane:2,revertLane:Nf(),gesture:null,action:r,hasEagerState:!1,eagerState:null,next:null},lc(e)){if(t)throw Error(i(479))}else t=V(e,n,r,2),t!==null&&Nd(t,e,2)}function lc(e){var t=e.alternate;return e===U||t!==null&&t===U}function uc(e,t){Uo=Ho=!0;var n=e.pending;n===null?t.next=t:(t.next=n.next,n.next=t),e.pending=t}function dc(e,t,n){if(n&4194048){var r=t.lanes;r&=e.pendingLanes,n|=r,t.lanes=n,_t(e,n)}}var fc={readContext:Ca,use:G,useCallback:Yo,useContext:Yo,useEffect:Yo,useImperativeHandle:Yo,useLayoutEffect:Yo,useInsertionEffect:Yo,useMemo:Yo,useReducer:Yo,useRef:Yo,useState:Yo,useDebugValue:Yo,useDeferredValue:Yo,useTransition:Yo,useSyncExternalStore:Yo,useId:Yo,useHostTransitionStatus:Yo,useFormState:Yo,useActionState:Yo,useOptimistic:Yo,useMemoCache:Yo,useCacheRefresh:Yo,useEffectEvent:Yo},pc={readContext:Ca,use:G,useCallback:function(e,t){return is().memoizedState=[e,t===void 0?null:t],e},useContext:Ca,useEffect:Ls,useImperativeHandle:function(e,t,n){n=n==null?null:n.concat([e]),Fs(4194308,4,Us.bind(null,t,e),n)},useLayoutEffect:function(e,t){return Fs(4194308,4,e,t)},useInsertionEffect:function(e,t){Fs(4,2,e,t)},useMemo:function(e,t){var n=is();t=t===void 0?null:t;var r=e();if(Wo){tt(!0);try{e()}finally{tt(!1)}}return n.memoizedState=[r,t],r},useReducer:function(e,t,n){var r=is();if(n!==void 0){var i=n(t);if(Wo){tt(!0);try{n(t)}finally{tt(!1)}}}else i=t;return r.memoizedState=r.baseState=i,e={pending:null,lanes:0,dispatch:null,lastRenderedReducer:e,lastRenderedState:i},r.queue=e,e=e.dispatch=ac.bind(null,U,e),[r.memoizedState,e]},useRef:function(e){var t=is();return e={current:e},t.memoizedState=e},useState:function(e){e=ys(e);var t=e.queue,n=oc.bind(null,U,t);return t.dispatch=n,[e.memoizedState,n]},useDebugValue:Gs,useDeferredValue:function(e,t){return Js(is(),e,t)},useTransition:function(){var e=ys(!1);return e=Xs.bind(null,U,e.queue,!0,!1),is().memoizedState=e,[!1,e]},useSyncExternalStore:function(e,t,n){var r=U,a=is();if(H){if(n===void 0)throw Error(i(407));n=n()}else{if(n=t(),Qu===null)throw Error(i(349));X&127||ms(r,t,n)}a.memoizedState=n;var o={value:n,getSnapshot:t};return a.queue=o,Ls(gs.bind(null,r,o,e),[e]),r.flags|=2048,Ns(9,{destroy:void 0},hs.bind(null,r,o,n,t),null),n},useId:function(){var e=is(),t=Qu.identifierPrefix;if(H){var n=Yi,r=Ji;n=(r&~(1<<32-nt(r)-1)).toString(32)+n,t=`_`+t+`R_`+n,n=Go++,0<n&&(t+=`H`+n.toString(32)),t+=`_`}else n=Jo++,t=`_`+t+`r_`+n.toString(32)+`_`;return e.memoizedState=t},useHostTransitionStatus:tc,useFormState:Os,useActionState:Os,useOptimistic:function(e){var t=is();t.memoizedState=t.baseState=e;var n={pending:null,lanes:0,dispatch:null,lastRenderedReducer:null,lastRenderedState:null};return t.queue=n,t=cc.bind(null,U,!0,n),n.dispatch=t,[e,t]},useMemoCache:cs,useCacheRefresh:function(){return is().memoizedState=ic.bind(null,U)},useEffectEvent:function(e){var t=is(),n={impl:e};return t.memoizedState=n,function(){if(J&2)throw Error(i(440));return n.impl.apply(void 0,arguments)}}},mc={readContext:Ca,use:G,useCallback:Ks,useContext:Ca,useEffect:Rs,useImperativeHandle:Ws,useInsertionEffect:Vs,useLayoutEffect:Hs,useMemo:qs,useReducer:us,useRef:Ps,useState:function(){return us(ls)},useDebugValue:Gs,useDeferredValue:function(e,t){return Ys(as(),W.memoizedState,e,t)},useTransition:function(){var e=us(ls)[0],t=as().memoizedState;return[typeof e==`boolean`?e:ss(e),t]},useSyncExternalStore:ps,useId:nc,useHostTransitionStatus:tc,useFormState:ks,useActionState:ks,useOptimistic:function(e,t){return bs(as(),W,e,t)},useMemoCache:cs,useCacheRefresh:rc,useEffectEvent:Bs},hc={readContext:Ca,use:G,useCallback:Ks,useContext:Ca,useEffect:Rs,useImperativeHandle:Ws,useInsertionEffect:Vs,useLayoutEffect:Hs,useMemo:qs,useReducer:fs,useRef:Ps,useState:function(){return fs(ls)},useDebugValue:Gs,useDeferredValue:function(e,t){var n=as();return W===null?Js(n,e,t):Ys(n,W.memoizedState,e,t)},useTransition:function(){var e=fs(ls)[0],t=as().memoizedState;return[typeof e==`boolean`?e:ss(e),t]},useSyncExternalStore:ps,useId:nc,useHostTransitionStatus:tc,useFormState:Ms,useActionState:Ms,useOptimistic:function(e,t){var n=as();return W===null?(n.baseState=e,[e,n.queue.dispatch]):bs(n,W,e,t)},useMemoCache:cs,useCacheRefresh:rc,useEffectEvent:Bs};function gc(e,t,n,r){t=e.memoizedState,n=n(r,t),n=n==null?t:T({},t,n),e.memoizedState=n,e.lanes===0&&(e.updateQueue.baseState=n)}var _c={enqueueSetState:function(e,t,n){e=e._reactInternals;var r=Ad(),i=ho(r);i.payload=t,n!=null&&(i.callback=n),t=go(e,i,r),t!==null&&(Nd(t,e,r),_o(t,e,r))},enqueueReplaceState:function(e,t,n){e=e._reactInternals;var r=Ad(),i=ho(r);i.tag=1,i.payload=t,n!=null&&(i.callback=n),t=go(e,i,r),t!==null&&(Nd(t,e,r),_o(t,e,r))},enqueueForceUpdate:function(e,t){e=e._reactInternals;var n=Ad(),r=ho(n);r.tag=2,t!=null&&(r.callback=t),t=go(e,r,n),t!==null&&(Nd(t,e,n),_o(t,e,n))}};function vc(e,t,n,r,i,a,o){return e=e.stateNode,typeof e.shouldComponentUpdate==`function`?e.shouldComponentUpdate(r,a,o):t.prototype&&t.prototype.isPureReactComponent?!Ur(n,r)||!Ur(i,a):!0}function yc(e,t,n,r){e=t.state,typeof t.componentWillReceiveProps==`function`&&t.componentWillReceiveProps(n,r),typeof t.UNSAFE_componentWillReceiveProps==`function`&&t.UNSAFE_componentWillReceiveProps(n,r),t.state!==e&&_c.enqueueReplaceState(t,t.state,null)}function bc(e,t){var n=t;if(`ref`in t)for(var r in n={},t)r!==`ref`&&(n[r]=t[r]);if(e=e.defaultProps)for(var i in n===t&&(n=T({},n)),e)n[i]===void 0&&(n[i]=e[i]);return n}function xc(e){yi(e)}function Sc(e){console.error(e)}function Cc(e){yi(e)}function wc(e,t){try{var n=e.onUncaughtError;n(t.value,{componentStack:t.stack})}catch(e){setTimeout(function(){throw e})}}function Tc(e,t,n){try{var r=e.onCaughtError;r(n.value,{componentStack:n.stack,errorBoundary:t.tag===1?t.stateNode:null})}catch(e){setTimeout(function(){throw e})}}function Ec(e,t,n){return n=ho(n),n.tag=3,n.payload={element:null},n.callback=function(){wc(e,t)},n}function Dc(e){return e=ho(e),e.tag=3,e}function Oc(e,t,n,r){var i=n.type.getDerivedStateFromError;if(typeof i==`function`){var a=r.value;e.payload=function(){return i(a)},e.callback=function(){Tc(t,n,r)}}var o=n.stateNode;o!==null&&typeof o.componentDidCatch==`function`&&(e.callback=function(){Tc(t,n,r),typeof i!=`function`&&(_d===null?_d=new Set([this]):_d.add(this));var e=r.stack;this.componentDidCatch(r.value,{componentStack:e===null?``:e})})}function kc(e,t,n,r,a){if(n.flags|=32768,typeof r==`object`&&r&&typeof r.then==`function`){if(t=n.alternate,t!==null&&ba(t,n,a,!0),n=ko.current,n!==null){switch(n.tag){case 31:case 13:case 19:return Ao===null?Gd():n.alternate===null&&id===0&&(id=3),n.flags&=-257,n.flags|=65536,n.lanes=a,r===Xa?n.flags|=16384:(t=n.updateQueue,t===null?n.updateQueue=new Set([r]):t.add(r),pf(e,r,a)),!1;case 22:return n.flags|=65536,r===Xa?n.flags|=16384:(t=n.updateQueue,t===null?(t={transitions:null,markerInstances:null,retryQueue:new Set([r])},n.updateQueue=t):(n=t.retryQueue,n===null?t.retryQueue=new Set([r]):n.add(r)),pf(e,r,a)),!1}throw Error(i(435,n.tag))}return pf(e,r,a),Gd(),!1}if(H)return t=ko.current,t===null?(r!==aa&&(t=Error(i(423),{cause:r}),fa(Bi(t,n))),e=e.current.alternate,e.flags|=65536,a&=-a,e.lanes|=a,r=Bi(r,n),a=Ec(e.stateNode,r,a),vo(e,a),id!==4&&(id=2)):(!(t.flags&65536)&&(t.flags|=256),t.flags|=65536,t.lanes=a,r!==aa&&(e=Error(i(422),{cause:r}),fa(Bi(e,n)))),!1;var o=Error(i(520),{cause:r});if(o=Bi(o,n),ud===null?ud=[o]:ud.push(o),id!==4&&(id=2),t===null)return!0;r=Bi(r,n),n=t;do{switch(n.tag){case 3:return n.flags|=65536,e=a&-a,n.lanes|=e,e=Ec(n.stateNode,r,e),vo(n,e),!1;case 1:if(t=n.type,o=n.stateNode,!(n.flags&128)&&(typeof t.getDerivedStateFromError==`function`||o!==null&&typeof o.componentDidCatch==`function`&&(_d===null||!_d.has(o))))return n.flags|=65536,a&=-a,n.lanes|=a,a=Dc(a),Oc(a,e,n,r),vo(n,a),!1;break;case 22:if(n.memoizedState!==null)return n.flags|=65536,!1}n=n.return}while(n!==null);return!1}var Ac=Error(i(461)),jc=!1;function Mc(e,t,n,r){t.child=e===null?uo(t,null,n,r):lo(t,e.child,n,r)}function Nc(e,t,n,r,i){n=n.render;var a=t.ref;if(`ref`in r){var o={};for(var s in r)s!==`ref`&&(o[s]=r[s])}else o=r;return Sa(t),r=Zo(e,t,n,o,a,i),s=ts(),e!==null&&!jc?(ns(e,t,i),sl(e,t,i)):(H&&s&&Qi(t),t.flags|=1,Mc(e,t,r,i),t.child)}function Pc(e,t,n,r,i){if(e===null){var a=n.type;return typeof a==`function`&&!ji(a)&&a.defaultProps===void 0&&n.compare===null?(t.tag=15,t.type=a,Fc(e,t,a,r,i)):(e=Pi(n.type,null,r,t,t.mode,i),e.ref=t.ref,e.return=t,t.child=e)}if(a=e.child,!cl(e,i)){var o=a.memoizedProps;if(n=n.compare,n=n===null?Ur:n,n(o,r)&&e.ref===t.ref)return sl(e,t,i)}return t.flags|=1,e=Mi(a,r),e.ref=t.ref,e.return=t,t.child=e}function Fc(e,t,n,r,i){if(e!==null){var a=e.memoizedProps;if(Ur(a,r)&&e.ref===t.ref){if(jc=!1,t.pendingProps=r=a,cl(e,i))e.flags&131072&&(jc=!0);else return t.lanes=e.lanes,sl(e,t,i)}}return Uc(e,t,n,r,i)}function Ic(e,t,n,r){var i=r.children,a=e===null?null:e.memoizedState;if(e===null&&t.stateNode===null&&(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),r.mode===`hidden`){if(t.flags&128){if(a=a===null?n:a.baseLanes|n,e!==null){for(r=t.child=e.child,i=0;r!==null;)i=i|r.lanes|r.childLanes,r=r.sibling;r=i&~a}else r=0,t.child=null;return Rc(e,t,a,n,r)}if(n&536870912)t.memoizedState={baseLanes:0,cachePool:null},e!==null&&Ga(t,a===null?null:a.cachePool),a===null?Do():Eo(t,a),No(t);else return r=t.lanes=536870912,Rc(e,t,a===null?n:a.baseLanes|n,n,r)}else a===null?(e!==null&&Ga(t,null),Do(),Po()):(Ga(t,a.cachePool),Eo(t,a),Po(),t.memoizedState=null);return Mc(e,t,i,n),t.child}function Lc(e,t){return e!==null&&e.tag===22||t.stateNode!==null||(t.stateNode={_visibility:1,_pendingMarkers:null,_retryCache:null,_transitions:null}),t.sibling}function Rc(e,t,n,r,i){var a=Wa();return a=a===null?null:{parent:ka._currentValue,pool:a},t.memoizedState={baseLanes:n,cachePool:a},e!==null&&Ga(t,null),Do(),No(t),e!==null&&ba(e,t,r,!0),t.childLanes=i,null}function zc(e,t){return t=Qc({mode:t.mode,children:t.children},e.mode),t.ref=e.ref,e.child=t,t.return=e,t}function Bc(e,t,n){return lo(t,e.child,null,n),e=zc(t,t.pendingProps),e.flags|=2,Fo(t),t.memoizedState=null,e}function Vc(e,t,n){var r=t.pendingProps,a=!!(t.flags&128);if(t.flags&=-129,e===null){if(H){if(r.mode===`hidden`)return e=zc(t,r),t.lanes=536870912,e.memoizedState={baseLanes:0,cachePool:null},Lc(null,e);if(Mo(t),(e=na)?(e=am(e,ia),e=e!==null&&e.data===`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:qi===null?null:{id:Ji,overflow:Yi},retryLane:536870912,hydrationErrors:null},n=Li(e),n.return=t,t.child=n,ta=t,na=null)):e=null,e===null)throw oa(t);return t.lanes=536870912,null}return zc(t,r)}var o=e.memoizedState;if(o!==null){var s=o.dehydrated;if(Mo(t),a){if(t.flags&256)t.flags&=-257,t=Bc(e,t,n);else if(t.memoizedState!==null)t.child=e.child,t.flags|=128,t=null;else throw Error(i(558))}else if(jc||ba(e,t,n,!1),a=(n&e.childLanes)!==0,jc||a){if(wo.current===null){if(r=Qu,r!==null&&(s=vt(r,n),s!==0&&s!==o.retryLane))throw o.retryLane=s,Ti(e,s),Nd(r,e,s),Ac;Gd()}t=Bc(e,t,n)}else e=o.treeContext,na=lm(s.nextSibling),ta=t,H=!0,ra=null,ia=!1,e!==null&&ea(t,e),t=zc(t,r),t.flags|=134221824;return t}return e=Mi(e.child,{mode:r.mode,children:r.children}),e.ref=t.ref,t.child=e,e.return=t,e}function Hc(e,t){var n=t.ref;if(n===null)e!==null&&e.ref!==null&&(t.flags|=4194816);else{if(typeof n!=`function`&&typeof n!=`object`)throw Error(i(284));(e===null||e.ref!==n)&&(t.flags|=4194816)}}function Uc(e,t,n,r,i){return Sa(t),n=Zo(e,t,n,r,void 0,i),r=ts(),e!==null&&!jc?(ns(e,t,i),sl(e,t,i)):(H&&r&&Qi(t),t.flags|=1,Mc(e,t,n,i),t.child)}function Wc(e,t,n,r,i,a){return Sa(t),t.updateQueue=null,n=$o(t,r,n,i),Qo(e),r=ts(),e!==null&&!jc?(ns(e,t,a),sl(e,t,a)):(H&&r&&Qi(t),t.flags|=1,Mc(e,t,n,a),t.child)}function Gc(e,t,n,r,i){if(Sa(t),t.stateNode===null){var a=Oi,o=n.contextType;typeof o==`object`&&o&&(a=Ca(o)),a=new n(r,a),t.memoizedState=a.state!==null&&a.state!==void 0?a.state:null,a.updater=_c,t.stateNode=a,a._reactInternals=t,a=t.stateNode,a.props=r,a.state=t.memoizedState,a.refs={},po(t),o=n.contextType,a.context=typeof o==`object`&&o?Ca(o):Oi,a.state=t.memoizedState,o=n.getDerivedStateFromProps,typeof o==`function`&&(gc(t,n,o,r),a.state=t.memoizedState),typeof n.getDerivedStateFromProps==`function`||typeof a.getSnapshotBeforeUpdate==`function`||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(o=a.state,typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount(),o!==a.state&&_c.enqueueReplaceState(a,a.state,null),xo(t,r,a,i),bo(),a.state=t.memoizedState),typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!0}else if(e===null){a=t.stateNode;var s=t.memoizedProps,c=bc(n,s);a.props=c;var l=a.context,u=n.contextType;o=Oi,typeof u==`object`&&u&&(o=Ca(u));var d=n.getDerivedStateFromProps;u=typeof d==`function`||typeof a.getSnapshotBeforeUpdate==`function`,s=t.pendingProps!==s,u||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(s||l!==o)&&yc(t,a,r,o),fo=!1;var f=t.memoizedState;a.state=f,xo(t,r,a,i),bo(),l=t.memoizedState,s||f!==l||fo?(typeof d==`function`&&(gc(t,n,d,r),l=t.memoizedState),(c=fo||vc(t,n,c,r,f,l,o))?(u||typeof a.UNSAFE_componentWillMount!=`function`&&typeof a.componentWillMount!=`function`||(typeof a.componentWillMount==`function`&&a.componentWillMount(),typeof a.UNSAFE_componentWillMount==`function`&&a.UNSAFE_componentWillMount()),typeof a.componentDidMount==`function`&&(t.flags|=4194308)):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),t.memoizedProps=r,t.memoizedState=l),a.props=r,a.state=l,a.context=o,r=c):(typeof a.componentDidMount==`function`&&(t.flags|=4194308),r=!1)}else{a=t.stateNode,mo(e,t),o=t.memoizedProps,u=bc(n,o),a.props=u,d=t.pendingProps,f=a.context,l=n.contextType,c=Oi,typeof l==`object`&&l&&(c=Ca(l)),s=n.getDerivedStateFromProps,(l=typeof s==`function`||typeof a.getSnapshotBeforeUpdate==`function`)||typeof a.UNSAFE_componentWillReceiveProps!=`function`&&typeof a.componentWillReceiveProps!=`function`||(o!==d||f!==c)&&yc(t,a,r,c),fo=!1,f=t.memoizedState,a.state=f,xo(t,r,a,i),bo();var p=t.memoizedState;o!==d||f!==p||fo||e!==null&&e.dependencies!==null&&xa(e.dependencies)?(typeof s==`function`&&(gc(t,n,s,r),p=t.memoizedState),(u=fo||vc(t,n,u,r,f,p,c)||e!==null&&e.dependencies!==null&&xa(e.dependencies))?(l||typeof a.UNSAFE_componentWillUpdate!=`function`&&typeof a.componentWillUpdate!=`function`||(typeof a.componentWillUpdate==`function`&&a.componentWillUpdate(r,p,c),typeof a.UNSAFE_componentWillUpdate==`function`&&a.UNSAFE_componentWillUpdate(r,p,c)),typeof a.componentDidUpdate==`function`&&(t.flags|=4),typeof a.getSnapshotBeforeUpdate==`function`&&(t.flags|=1024)):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),t.memoizedProps=r,t.memoizedState=p),a.props=r,a.state=p,a.context=c,r=u):(typeof a.componentDidUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=4),typeof a.getSnapshotBeforeUpdate!=`function`||o===e.memoizedProps&&f===e.memoizedState||(t.flags|=1024),r=!1)}return a=r,Hc(e,t),r=!!(t.flags&128),a||r?(a=t.stateNode,n=r&&typeof n.getDerivedStateFromError!=`function`?null:a.render(),t.flags|=1,e!==null&&r?(t.child=lo(t,e.child,null,i),t.child=lo(t,null,n,i)):Mc(e,t,n,i),t.memoizedState=a.state,e=t.child):e=sl(e,t,i),e}function Kc(e,t,n,r){return ua(),t.flags|=256,Mc(e,t,n,r),t.child}var qc={dehydrated:null,treeContext:null,retryLane:0,hydrationErrors:null};function Jc(e){return{baseLanes:e,cachePool:Ka()}}function Yc(e,t,n){return e=e===null?0:e.childLanes&~n,t&&(e|=cd),e}function Xc(e,t,n){var r=t.pendingProps,i=!1,a=!!(t.flags&128),o;if((o=a)||(o=e!==null&&e.memoizedState===null?!1:!!(Io.current&2)),o&&(i=!0,t.flags&=-129),o=!!(t.flags&32),t.flags&=-33,e===null){if(H){if(i?jo(t):Po(),(e=na)?(e=am(e,ia),e=e!==null&&e.data!==`&`?e:null,e!==null&&(t.memoizedState={dehydrated:e,treeContext:qi===null?null:{id:Ji,overflow:Yi},retryLane:536870912,hydrationErrors:null},n=Li(e),n.return=t,t.child=n,ta=t,na=null)):e=null,e===null)throw oa(t);return t.lanes=sm(e)?32:536870912,null}return a=r.children,r=r.fallback,i?(Po(),i=t.mode,a=Qc({mode:`hidden`,children:a},i),r=Fi(r,i,n,null),a.return=t,r.return=t,a.sibling=r,t.child=a,r=t.child,r.memoizedState=Jc(n),r.childLanes=Yc(e,o,n),t.memoizedState=qc,Lc(null,r)):(jo(t),Zc(t,a))}var s=e.memoizedState;if(s!==null){var c=s.dehydrated;if(c!==null)return el(e,t,a,o,r,c,s,n)}return i?(Po(),i=r.fallback,a=t.mode,s=e.child,c=s.sibling,r=Mi(s,{mode:`hidden`,children:r.children}),r.subtreeFlags=s.subtreeFlags&1206910976,c===null?(i=Fi(i,a,n,null),i.flags|=2):i=Mi(c,i),i.return=t,r.return=t,r.sibling=i,t.child=r,Lc(null,r),r=t.child,i=e.child.memoizedState,i===null?i=Jc(n):(a=i.cachePool,a===null?a=Ka():(s=ka._currentValue,a=a.parent===s?a:{parent:s,pool:s}),i={baseLanes:i.baseLanes|n,cachePool:a}),r.memoizedState=i,r.childLanes=Yc(e,o,n),t.memoizedState=qc,Lc(e.child,r)):(jo(t),n=e.child,e=n.sibling,n=Mi(n,{mode:`visible`,children:r.children}),n.return=t,n.sibling=null,e!==null&&(o=t.deletions,o===null?(t.deletions=[e],t.flags|=16):o.push(e)),t.child=n,t.memoizedState=null,n)}function Zc(e,t){return t=Qc({mode:`visible`,children:t},e.mode),t.return=e,e.child=t}function Qc(e,t){return e=Ai(22,e,null,t),e.lanes=0,e}function $c(e,t,n){return lo(t,e.child,null,n),e=Zc(t,t.pendingProps.children),e.flags|=2,t.memoizedState=null,e}function el(e,t,n,r,a,o,s,c){if(n)return t.flags&256?(jo(t),t.flags&=-257,$c(e,t,c)):t.memoizedState===null?(Po(),o=a.fallback,s=t.mode,a=Qc({mode:`visible`,children:a.children},s),o=Fi(o,s,c,null),o.flags|=2,a.return=t,o.return=t,a.sibling=o,t.child=a,lo(t,e.child,null,c),a=t.child,a.memoizedState=Jc(c),a.childLanes=Yc(e,r,c),t.memoizedState=qc,Lc(null,a)):(Po(),t.child=e.child,t.flags|=128,null);if(jo(t),sm(o)){if(r=o.nextSibling&&o.nextSibling.dataset,r)var l=r.dgst;return r=l,r!==``&&(a=Error(i(419)),a.stack=``,a.digest=r,fa({value:a,source:null,stack:null})),$c(e,t,c)}if(jc||ba(e,t,c,!1),r=(c&e.childLanes)!==0,jc||r){if(wo.current!==null)return $c(e,t,c);if(r=Qu,r!==null&&(a=vt(r,c),a!==0&&a!==s.retryLane))throw s.retryLane=a,Ti(e,a),Nd(r,e,a),Ac;return om(o)||Gd(),$c(e,t,c)}return om(o)?(t.flags|=192,t.child=e.child,null):(e=s.treeContext,na=lm(o.nextSibling),ta=t,H=!0,ra=null,ia=!1,e!==null&&ea(t,e),t=Zc(t,a.children),t.flags|=134221824,t)}function tl(e,t,n){e.lanes|=t;var r=e.alternate;r!==null&&(r.lanes|=t),va(e.return,t,n)}function nl(e){for(var t=null;e!==null;){var n=e.alternate;n!==null&&zo(n)===null&&(t=e),e=e.sibling}return t}function rl(e,t,n,r,i,a){var o=e.memoizedState;o===null?e.memoizedState={isBackwards:t,rendering:null,renderingStartTime:0,last:r,tail:n,tailMode:i,treeForkCount:a}:(o.isBackwards=t,o.rendering=null,o.renderingStartTime=0,o.last=r,o.tail=n,o.tailMode=i,o.treeForkCount=a)}function il(e){var t=e.child;for(e.child=null;t!==null;){var n=t.sibling;t.sibling=e.child,e.child=t,t=n}}function al(e,t,n){var r=t.pendingProps,i=r.revealOrder,a=r.tail;r=r.children;var o=Io.current;if(t.flags&128)return Lo(t,o),null;var s=!!(o&2);if(s?(o=o&1|2,t.flags|=128):o&=1,Lo(t,o),i===`backwards`&&e!==null?(il(e),Mc(e,t,r,n),il(e)):Mc(e,t,r,n),r=H?Wi:0,!s&&e!==null&&e.flags&128)a:for(e=t.child;e!==null;){if(e.tag===13)e.memoizedState!==null&&tl(e,n,t);else if(e.tag===19)tl(e,n,t);else if(e.child!==null){e.child.return=e,e=e.child;continue}if(e===t)break a;for(;e.sibling===null;){if(e.return===null||e.return===t)break a;e=e.return}e.sibling.return=e.return,e=e.sibling}switch(i){case`backwards`:n=nl(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null,il(t)),rl(t,!0,i,null,a,r);break;case`unstable_legacy-backwards`:for(n=null,i=t.child,t.child=null;i!==null;){if(e=i.alternate,e!==null&&zo(e)===null){t.child=i;break}e=i.sibling,i.sibling=n,n=i,i=e}rl(t,!0,n,null,a,r);break;case`together`:rl(t,!1,null,null,void 0,r);break;case`independent`:t.memoizedState=null;break;default:n=nl(t.child),n===null?(i=t.child,t.child=null):(i=n.sibling,n.sibling=null),rl(t,!1,i,n,a,r)}return t.child}function ol(e,t,n){var r=t.pendingProps;return ga(t,t.type,r.value),Mc(e,t,r.children,n),t.child}function sl(e,t,n){if(e!==null&&(t.dependencies=e.dependencies),ad|=t.lanes,(n&t.childLanes)===0){if(e!==null){if(ba(e,t,n,!1),(n&t.childLanes)===0)return null}else return null}if(e!==null&&t.child!==e.child)throw Error(i(153));if(t.child!==null){for(e=t.child,n=Mi(e,e.pendingProps),t.child=n,n.return=t;e.sibling!==null;)e=e.sibling,n=n.sibling=Mi(e,e.pendingProps),n.return=t;n.sibling=null}return t.child}function cl(e,t){return(e.lanes&t)!==0||(e=e.dependencies,!!(e!==null&&xa(e)))}function ll(e,t,n){switch(t.tag){case 3:ke(t,t.stateNode.containerInfo),ga(t,ka,e.memoizedState.cache),ua();break;case 27:case 5:je(t);break;case 4:ke(t,t.stateNode.containerInfo);break;case 10:ga(t,t.type,t.memoizedProps.value);break;case 31:if(t.memoizedState!==null)return t.flags|=128,Mo(t),null;break;case 13:var r=t.memoizedState;if(r!==null){if(r.dehydrated!==null)return jo(t),t.flags|=128,null;r=ba(e,t,n,!1);var i=t.child.childLanes;return r||(n&i)!==0?Xc(e,t,n):(jo(t),e=sl(e,t,n),e===null?null:e.sibling)}jo(t);break;case 19:if(t.flags&128)return al(e,t,n);if(i=!!(e.flags&128),r=(n&t.childLanes)!==0,r||=(ba(e,t,n,!1),(n&t.childLanes)!==0),i){if(r)return al(e,t,n);t.flags|=128}if(i=t.memoizedState,i!==null&&(i.rendering=null,i.tail=null,i.lastEffect=null),Lo(t,Io.current),r)break;return null;case 22:return t.lanes=0,Ic(e,t,n,t.pendingProps);case 24:ga(t,ka,e.memoizedState.cache)}return sl(e,t,n)}function ul(e,t,n){if(e!==null){if(e.memoizedProps!==t.pendingProps)jc=!0;else{if(!cl(e,n)&&!(t.flags&128))return jc=!1,ll(e,t,n);jc=!!(e.flags&131072)}}else jc=!1,H&&t.flags&1048576&&Zi(t,Wi,t.index);switch(t.lanes=0,t.tag){case 16:a:{var r=t.pendingProps;if(e=$a(t.elementType),t.type=e,typeof e==`function`)ji(e)?(r=bc(e,r),t.tag=1,t=Gc(null,t,e,r,n)):(t.tag=0,t=Uc(null,t,e,r,n));else{if(e!=null){var a=e.$$typeof;if(a===le){t.tag=11,t=Nc(null,t,e,r,n);break a}if(a===de){t.tag=14,t=Pc(null,t,e,r,n);break a}if(a===ce){t.tag=10,t.type=e,t=ol(null,t,n);break a}}throw t=ye(e)||e,Error(i(306,t,``))}}return t;case 0:return Uc(e,t,t.type,t.pendingProps,n);case 1:return r=t.type,a=bc(r,t.pendingProps),Gc(e,t,r,a,n);case 3:a:{if(ke(t,t.stateNode.containerInfo),e===null)throw Error(i(387));r=t.pendingProps;var o=t.memoizedState;a=o.element,mo(e,t),xo(t,r,null,n);var s=t.memoizedState;if(r=s.cache,ga(t,ka,r),r!==o.cache&&ya(t,[ka],n,!0),bo(),r=s.element,o.isDehydrated){if(o={element:r,isDehydrated:!1,cache:s.cache},t.updateQueue.baseState=o,t.memoizedState=o,t.flags&256){t=Kc(e,t,r,n);break a}if(r!==a){a=Bi(Error(i(424)),t),fa(a),t=Kc(e,t,r,n);break a}switch(e=t.stateNode.containerInfo,e.nodeType){case 9:e=e.body;break;default:e=e.nodeName===`HTML`?e.ownerDocument.body:e}for(na=lm(e.firstChild),ta=t,H=!0,ra=null,ia=!0,n=uo(t,null,r,n),t.child=n;n;)n.flags=n.flags&-3|134221824,n=n.sibling}else{if(ua(),r===a){t=sl(e,t,n);break a}Mc(e,t,r,n)}t=t.child}return t;case 26:return Hc(e,t),e===null?(n=Nm(t.type,null,t.pendingProps,null))?t.memoizedState=n:H||(t.stateNode=fp(t.type,t.pendingProps,De.current,t)):t.memoizedState=Nm(t.type,e.memoizedProps,t.pendingProps,e.memoizedState),null;case 27:return je(t),e===null&&H&&(r=t.stateNode=hm(t.type,t.pendingProps,De.current),ta=t,ia=!0,a=na,Sp(t.type)?(um=a,na=lm(r.firstChild)):na=a),Mc(e,t,t.pendingProps.children,n),Hc(e,t),e===null&&(t.flags|=4194304),t.child;case 5:return e===null&&H&&((a=r=na)&&(r=rm(r,t.type,t.pendingProps,ia),r===null?a=!1:(t.stateNode=r,ta=t,na=lm(r.firstChild),ia=!1,a=!0)),a||oa(t)),je(t),a=t.type,o=t.pendingProps,s=e===null?null:e.memoizedProps,r=o.children,pp(a,o)?r=null:s!==null&&pp(a,s)&&(t.flags|=32),t.memoizedState!==null&&(a=Zo(e,t,es,null,null,n),sh._currentValue=a),Hc(e,t),Mc(e,t,r,n),t.child;case 6:return e===null&&H&&((e=n=na)&&(n=im(n,t.pendingProps,ia),n===null?e=!1:(t.stateNode=n,ta=t,na=null,e=!0)),e||oa(t)),null;case 13:return Xc(e,t,n);case 4:return ke(t,t.stateNode.containerInfo),r=t.pendingProps,e===null?t.child=lo(t,null,r,n):Mc(e,t,r,n),t.child;case 11:return Nc(e,t,t.type,t.pendingProps,n);case 7:return r=t.pendingProps,Hc(e,t),Mc(e,t,r,n),t.child;case 8:return Mc(e,t,t.pendingProps.children,n),t.child;case 12:return Mc(e,t,t.pendingProps.children,n),t.child;case 10:return ol(e,t,n);case 9:return a=t.type._context,r=t.pendingProps.children,Sa(t),a=Ca(a),r=r(a),t.flags|=1,Mc(e,t,r,n),t.child;case 14:return Pc(e,t,t.type,t.pendingProps,n);case 15:return Fc(e,t,t.type,t.pendingProps,n);case 19:return al(e,t,n);case 31:return Vc(e,t,n);case 22:return Ic(e,t,n,t.pendingProps);case 24:return Sa(t),r=Ca(ka),e===null?(a=Wa(),a===null&&(a=Qu,o=Aa(),a.pooledCache=o,o.refCount++,o!==null&&(a.pooledCacheLanes|=n),a=o),t.memoizedState={parent:r,cache:a},po(t),ga(t,ka,a)):((e.lanes&n)!==0&&(mo(e,t),xo(t,null,null,n),bo()),a=e.memoizedState,o=t.memoizedState,a.parent===r?(r=o.cache,ga(t,ka,r),r!==a.cache&&ya(t,[ka],n,!0)):(a={parent:r,cache:r},t.memoizedState=a,t.lanes===0&&(t.memoizedState=t.updateQueue.baseState=a),ga(t,ka,r))),Mc(e,t,t.pendingProps.children,n),t.child;case 30:return t.stateNode===null&&(t.stateNode={autoName:null,paired:null,clones:null,ref:null}),r=t.pendingProps,r.name!=null&&r.name!==`auto`?t.flags|=e===null?18882560:18874368:H&&Qi(t),e!==null&&e.memoizedProps.name!==r.name?t.flags|=4194816:Hc(e,t),Mc(e,t,r.children,n),t.child;case 29:throw t.pendingProps}throw Error(i(156,t.tag))}function dl(e){e.flags|=4}function fl(e,t,n,r,i){var a;if((a=!!(e.mode&32))&&(a=n===null?Jm(t,r):Jm(t,r)&&(r.src!==n.src||r.srcSet!==n.srcSet)),a){if(e.flags|=16777216,(i&335544128)===i){if(e.stateNode.complete)e.flags|=8192;else if(Hd())e.flags|=8192;else throw eo=Xa,Ja}}else e.flags&=-16777217}function pl(e,t){if(t.type!==`stylesheet`||t.state.loading&4)e.flags&=-16777217;else if(e.flags|=16777216,!Ym(t)){if(Hd())e.flags|=8192;else throw eo=Xa,Ja}}function ml(e,t){t!==null&&(e.flags|=4),e.flags&16384&&(t=e.tag===22?536870912:ft(),e.lanes|=t,ld|=t)}function hl(e,t){if(!H)switch(e.tailMode){case`visible`:break;case`collapsed`:for(var n=e.tail,r=null;n!==null;)n.alternate!==null&&(r=n),n=n.sibling;r===null?t||e.tail===null?e.tail=null:e.tail.sibling=null:r.sibling=null;break;default:for(t=e.tail,n=null;t!==null;)t.alternate!==null&&(n=t),t=t.sibling;n===null?e.tail=null:n.sibling=null}}function K(e){var t=e.alternate!==null&&e.alternate.child===e.child,n=0,r=0;if(t)for(var i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags&1206910976,r|=i.flags&1206910976,i.return=e,i=i.sibling;else for(i=e.child;i!==null;)n|=i.lanes|i.childLanes,r|=i.subtreeFlags,r|=i.flags,i.return=e,i=i.sibling;return e.subtreeFlags|=r,e.childLanes=n,t}function gl(e,t,n){var r=t.pendingProps;switch($i(t),t.tag){case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return K(t),null;case 1:return K(t),null;case 3:return n=t.stateNode,r=null,e!==null&&(r=e.memoizedState.cache),t.memoizedState.cache!==r&&(t.flags|=2048),_a(ka),Ae(),n.pendingContext&&(n.context=n.pendingContext,n.pendingContext=null),(e===null||e.child===null)&&(la(t)?dl(t):e===null||e.memoizedState.isDehydrated&&!(t.flags&256)||(t.flags|=1024,da())),K(t),null;case 26:var a=t.type,o=t.memoizedState;return e===null?(dl(t),o===null?(K(t),fl(t,a,null,r,n)):(K(t),pl(t,o))):o?o===e.memoizedState?(K(t),t.flags&=-16777217):(dl(t),K(t),pl(t,o)):(e=e.memoizedProps,e!==r&&dl(t),K(t),fl(t,a,e,r,n)),null;case 27:if(Me(t),n=De.current,a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&dl(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return K(t),t.subtreeFlags&=-33554433,null}e=Te.current,la(t)?sa(t,e):(e=hm(a,r,n),t.stateNode=e,dl(t))}return K(t),t.subtreeFlags&=-33554433,null;case 5:if(Me(t),a=t.type,e!==null&&t.stateNode!=null)e.memoizedProps!==r&&dl(t);else{if(!r){if(t.stateNode===null)throw Error(i(166));return K(t),t.subtreeFlags&=-33554433,null}if(o=Te.current,la(t))sa(t,o);else{var s=lp(De.current);switch(o){case 1:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case 2:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;default:switch(a){case`svg`:o=s.createElementNS(`http://www.w3.org/2000/svg`,a);break;case`math`:o=s.createElementNS(`http://www.w3.org/1998/Math/MathML`,a);break;case`script`:o=s.createElement(`div`),o.innerHTML=`<script><\/script>`,o=o.removeChild(o.firstChild);break;case`select`:o=typeof r.is==`string`?s.createElement(`select`,{is:r.is}):s.createElement(`select`),r.multiple?o.multiple=!0:r.size&&(o.size=r.size);break;default:o=typeof r.is==`string`?s.createElement(a,{is:r.is}):s.createElement(a)}}o[wt]=t,o[Tt]=r;a:for(s=t.child;s!==null;){if(s.tag===5||s.tag===6)o.appendChild(s.stateNode);else if(s.tag!==4&&s.tag!==27&&s.child!==null){s.child.return=s,s=s.child;continue}if(s===t)break a;for(;s.sibling===null;){if(s.return===null||s.return===t)break a;s=s.return}s.sibling.return=s.return,s=s.sibling}t.stateNode=o;a:switch(np(o,a,r),a){case`button`:case`input`:case`select`:case`textarea`:r=!!r.autoFocus;break a;case`img`:r=!0;break a;default:r=!1}r&&dl(t)}}return K(t),t.subtreeFlags&=-33554433,fl(t,t.type,e===null?null:e.memoizedProps,t.pendingProps,n),null;case 6:if(e&&t.stateNode!=null)e.memoizedProps!==r&&dl(t);else{if(typeof r!=`string`&&t.stateNode===null)throw Error(i(166));if(e=De.current,la(t)){if(e=t.stateNode,n=t.memoizedProps,r=null,a=ta,a!==null)switch(a.tag){case 27:case 5:r=a.memoizedProps}e[wt]=t,e=!!(e.nodeValue===n||r!==null&&!0===r.suppressHydrationWarning||$f(e.nodeValue,n)),e||oa(t,!0)}else e=lp(e).createTextNode(r),e[wt]=t,t.stateNode=e}return K(t),null;case 31:if(n=t.memoizedState,e===null||e.memoizedState!==null){if(r=la(t),n!==null){if(e===null){if(!r)throw Error(i(318));if(e=t.memoizedState,e=e===null?null:e.dehydrated,!e)throw Error(i(557));e[wt]=t}else ua(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;K(t),e=!1}else n=da(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=n),e=!0;if(!e)return t.flags&256?(Fo(t),t):(Fo(t),null);if(t.flags&128)throw Error(i(558))}return K(t),null;case 13:if(r=t.memoizedState,e===null||e.memoizedState!==null&&e.memoizedState.dehydrated!==null){if(a=la(t),r!==null&&r.dehydrated!==null){if(e===null){if(!a)throw Error(i(318));if(a=t.memoizedState,a=a===null?null:a.dehydrated,!a)throw Error(i(317));a[wt]=t}else ua(),!(t.flags&128)&&(t.memoizedState=null),t.flags|=4;K(t),a=!1}else a=da(),e!==null&&e.memoizedState!==null&&(e.memoizedState.hydrationErrors=a),a=!0;if(!a)return t.flags&256?(Fo(t),t):(Fo(t),null)}return Fo(t),t.flags&128?(t.lanes=n,t):(n=r!==null,e=e!==null&&e.memoizedState!==null,n&&(r=t.child,a=null,r.alternate!==null&&r.alternate.memoizedState!==null&&r.alternate.memoizedState.cachePool!==null&&(a=r.alternate.memoizedState.cachePool.pool),o=null,r.memoizedState!==null&&r.memoizedState.cachePool!==null&&(o=r.memoizedState.cachePool.pool),o!==a&&(r.flags|=2048)),n!==e&&n&&(t.child.flags|=8192),ml(t,t.updateQueue),K(t),null);case 4:return Ae(),e===null&&Uf(t.stateNode.containerInfo),t.flags|=67108864,K(t),null;case 10:return _a(t.type),K(t),null;case 19:if(Ro(t),r=t.memoizedState,r===null)return K(t),null;if(a=!!(t.flags&128),o=r.rendering,o===null){if(a)hl(r,!1);else{if(id!==0||e!==null&&e.flags&128)for(e=t.child;e!==null;){if(o=zo(e),o!==null){for(t.flags|=128,hl(r,!1),e=o.updateQueue,t.updateQueue=e,ml(t,e),t.subtreeFlags=0,e=n,n=t.child;n!==null;)Ni(n,e),n=n.sibling;return Lo(t,Io.current&1|2),H&&Xi(t,r.treeForkCount),t.child}e=e.sibling}r.tail!==null&&Ge()>hd&&(t.flags|=128,a=!0,hl(r,!1),t.lanes=4194304)}}else{if(!a){if(e=zo(o),e!==null){if(t.flags|=128,a=!0,e=e.updateQueue,t.updateQueue=e,ml(t,e),hl(r,!0),r.tail===null&&r.tailMode!==`collapsed`&&r.tailMode!==`visible`&&!o.alternate&&!H)return K(t),null}else 2*Ge()-r.renderingStartTime>hd&&n!==536870912&&(t.flags|=128,a=!0,hl(r,!1),t.lanes=4194304)}r.isBackwards?(o.sibling=t.child,t.child=o):(e=r.last,e===null?t.child=o:e.sibling=o,r.last=o)}if(r.tail!==null){e=r.tail;a:{for(n=e;n!==null;){if(n.alternate!==null){n=!1;break a}n=n.sibling}n=!0}return r.rendering=e,r.tail=e.sibling,r.renderingStartTime=Ge(),e.sibling=null,o=Io.current,o=a?o&1|2:o&1,r.tailMode===`visible`||r.tailMode===`collapsed`||!n||H?Lo(t,o):(n=o,N(ko,t),N(Io,n),Ao===null&&(Ao=t)),H&&Xi(t,r.treeForkCount),e}return K(t),null;case 22:case 23:return Fo(t),Oo(),r=t.memoizedState!==null,e===null?r&&(t.flags|=8192):e.memoizedState!==null!==r&&(t.flags|=8192),r?n&536870912&&!(t.flags&128)&&(K(t),t.subtreeFlags&6&&(t.flags|=8192)):K(t),n=t.updateQueue,n!==null&&ml(t,n.retryQueue),n=null,e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),r=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(r=t.memoizedState.cachePool.pool),r!==n&&(t.flags|=2048),e!==null&&we(Ua),null;case 24:return n=null,e!==null&&(n=e.memoizedState.cache),t.memoizedState.cache!==n&&(t.flags|=2048),_a(ka),K(t),null;case 25:return null;case 30:return t.flags|=33554432,K(t),null}throw Error(i(156,t.tag))}function _l(e,t){switch($i(t),t.tag){case 1:return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 3:return _a(ka),Ae(),e=t.flags,e&65536&&!(e&128)?(t.flags=e&-65537|128,t):null;case 26:case 27:case 5:return Me(t),null;case 31:if(t.memoizedState!==null){if(Fo(t),t.alternate===null)throw Error(i(340));ua()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 13:if(Fo(t),e=t.memoizedState,e!==null&&e.dehydrated!==null){if(t.alternate===null)throw Error(i(340));ua()}return e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 19:return Ro(t),e=t.flags,e&65536?(t.flags=e&-65537|128,e=t.memoizedState,e!==null&&(e.rendering=null,e.tail=null),t.flags|=4,t):null;case 4:return Ae(),null;case 10:return _a(t.type),null;case 22:case 23:return Fo(t),Oo(),e!==null&&we(Ua),e=t.flags,e&65536?(t.flags=e&-65537|128,t):null;case 24:return _a(ka),null;case 25:return null;default:return null}}function vl(e,t){switch($i(t),t.tag){case 3:_a(ka),Ae();break;case 26:case 27:case 5:Me(t);break;case 4:Ae();break;case 31:t.memoizedState!==null&&Fo(t);break;case 13:Fo(t);break;case 19:Ro(t);break;case 10:_a(t.type);break;case 22:case 23:Fo(t),Oo(),e!==null&&we(Ua);break;case 24:_a(ka)}}function yl(e,t){try{var n=t.updateQueue,r=n===null?null:n.lastEffect;if(r!==null){var i=r.next;n=i;do{if((n.tag&e)===e){r=void 0;var a=n.create,o=n.inst;r=a(),o.destroy=r}n=n.next}while(n!==i)}}catch(e){Q(t,t.return,e)}}function bl(e,t,n){try{var r=t.updateQueue,i=r===null?null:r.lastEffect;if(i!==null){var a=i.next;r=a;do{if((r.tag&e)===e){var o=r.inst,s=o.destroy;if(s!==void 0){o.destroy=void 0,i=t;var c=n,l=s;try{l()}catch(e){Q(i,c,e)}}}r=r.next}while(r!==a)}}catch(e){Q(t,t.return,e)}}function xl(e){var t=e.updateQueue;if(t!==null){var n=e.stateNode;try{Co(t,n)}catch(t){Q(e,e.return,t)}}}function Sl(e,t,n){n.props=bc(e.type,e.memoizedProps),n.state=e.memoizedState;try{n.componentWillUnmount()}catch(n){Q(e,t,n)}}function Cl(e,t){try{var n=e.ref;if(n!==null){switch(e.tag){case 26:case 27:case 5:var r=e.stateNode;break;case 30:var i=e.stateNode,a=gi(e.memoizedProps,i);(i.ref===null||i.ref.name!==a)&&(i.ref=Pp(a)),r=i.ref;break;case 7:if(e.stateNode===null){var o=new Fp(e);h(e.child,!1,Qp,o,void 0,void 0),e.stateNode=o}r=e.stateNode;break;default:r=e.stateNode}typeof n==`function`?e.refCleanup=n(r):n.current=r}}catch(n){Q(e,t,n)}}function wl(e,t){var n=e.ref,r=e.refCleanup;if(n!==null){if(typeof r==`function`)try{r()}catch(n){Q(e,t,n)}finally{e.refCleanup=null,e=e.alternate,e!=null&&(e.refCleanup=null)}else if(typeof n==`function`)try{n(null)}catch(n){Q(e,t,n)}else n.current=null}}function Tl(e,t){if((e.tag===5||e.tag===27||e.tag===6)&&e.alternate===null&&t!==null)for(var n=0;n<t.length;n++)em(e.stateNode,t[n])}function El(e){for(var t=e.return;t!==null&&(kl(t)&&em(e.stateNode,t.stateNode),!Ol(t));)t=t.return}function Dl(e){for(var t=e.return;t!==null&&(kl(t)&&tm(e.stateNode,t.stateNode),!Ol(t));)t=t.return}function Ol(e){return e.tag===5||e.tag===3||e.tag===27}function kl(e){return e&&e.tag===7&&e.stateNode!==null}function Al(e){var t=e.type,n=e.memoizedProps,r=e.stateNode;try{a:switch(t){case`button`:case`input`:case`select`:case`textarea`:n.autoFocus&&r.focus();break a;case`img`:n.src?r.src=n.src:n.srcSet&&(r.srcset=n.srcSet)}}catch(t){Q(e,e.return,t)}}function jl(e,t,n){try{var r=e.stateNode;ip(r,e.type,n,t),r[Tt]=t}catch(t){Q(e,e.return,t)}}function Ml(e){return e.tag===5||e.tag===3||e.tag===26||e.tag===27&&Sp(e.type)||e.tag===4}function Nl(e){a:for(;;){for(;e.sibling===null;){if(e.return===null||Ml(e.return))return null;e=e.return}for(e.sibling.return=e.return,e=e.sibling;e.tag!==5&&e.tag!==6&&e.tag!==18;){if(e.tag===27&&Sp(e.type)||e.flags&2||e.child===null||e.tag===4)continue a;e.child.return=e,e=e.child}if(!(e.flags&2))return e.stateNode}}function Pl(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?(n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n).insertBefore(i,t):(t=n.nodeType===9?n.body:n.nodeName===`HTML`?n.ownerDocument.body:n,t.appendChild(i),n=n._reactRootContainer,n!=null||t.onclick!==null||(t.onclick=yn)),Tl(e,r),L=!0;else if(i!==4&&(i===27&&(Tl(e,r),r=null,Sp(e.type)&&(n=e.stateNode,t=null)),e=e.child,e!==null))for(Pl(e,t,n,r),e=e.sibling;e!==null;)Pl(e,t,n,r),e=e.sibling}function Fl(e,t,n,r){var i=e.tag;if(i===5||i===6)i=e.stateNode,t?n.insertBefore(i,t):n.appendChild(i),Tl(e,r),L=!0;else if(i!==4&&(i===27&&(Tl(e,r),r=null,Sp(e.type)&&(n=e.stateNode)),e=e.child,e!==null))for(Fl(e,t,n,r),e=e.sibling;e!==null;)Fl(e,t,n,r),e=e.sibling}function Il(e){var t=e.stateNode,n=e.memoizedProps;try{for(var r=e.type,i=t.attributes;i.length;)t.removeAttributeNode(i[0]);np(t,r,n),t[wt]=e,t[Tt]=n}catch(t){Q(e,e.return,t)}}var Ll=!1,Rl=null;function zl(e){(e.tag===30||e.subtreeFlags&33554432)&&(Ll=!0)}var Bl=null;function Vl(){var e=Bl;return Bl=null,e}var Hl=0;function Ul(e,t,n,r,i){return Hl=0,Wl(e.child,t,n,r,i)}function Wl(e,t,n,r,i){for(var a=!1;e!==null;){if(e.tag===5){var o=e.stateNode;if(r!==null){var s=Op(o);r.push(s),s.view&&(a=!0)}else a||Op(o).view&&(a=!0);Ll=!0,Tp(o,Hl===0?t:t+`_`+Hl,n),Hl++}else e.tag===22&&e.memoizedState!==null||e.tag===30&&i||Wl(e.child,t,n,r,i)&&(a=!0);e=e.sibling}return a}function Gl(e,t){for(;e!==null;)e.tag===5?Ep(e.stateNode,e.memoizedProps):e.tag===22&&e.memoizedState!==null||e.tag===30&&t||Gl(e.child,t),e=e.sibling}function Kl(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if((e.tag!==22||e.memoizedState===null)&&(Kl(e),e.tag===30&&e.flags&18874368&&e.stateNode.paired)){var t=e.memoizedProps;if(t.name==null||t.name===`auto`)throw Error(i(544));var n=t.name;t=vi(t.default,t.share),t!==`none`&&(Ul(e,n,t,null,!1)||Gl(e.child,!1))}e=e.sibling}}function ql(e,t){if(e.tag===30){var n=e.stateNode,r=e.memoizedProps,i=gi(r,n),a=vi(r.default,n.paired?r.share:r.enter);a===`none`?Kl(e):Ul(e,i,a,null,!1)?(Kl(e),n.paired||t||Md(e,r.onEnter)):Gl(e.child,!1)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)ql(e,t),e=e.sibling;else Kl(e)}function Jl(e){if(Rl!==null&&Rl.size!==0){var t=Rl;if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var n=e.memoizedProps,r=n.name;if(r!=null&&r!==`auto`){var i=t.get(r);if(i!==void 0){var a=vi(n.default,n.share);if(a!==`none`&&(Ul(e,r,a,null,!1)?(a=e.stateNode,i.paired=a,a.paired=i,Md(e,n.onShare)):Gl(e.child,!1)),t.delete(r),t.size===0)break}}}Jl(e)}e=e.sibling}}}function Yl(e){if(e.tag===30){var t=e.memoizedProps,n=gi(t,e.stateNode),r=Rl===null?void 0:Rl.get(n),i=vi(t.default,r===void 0?t.exit:t.share);i!==`none`&&(Ul(e,n,i,null,!1)?r===void 0?Md(e,t.onExit):(i=e.stateNode,r.paired=i,i.paired=r,Rl.delete(n),Md(e,t.onShare)):Gl(e.child,!1)),Rl!==null&&Jl(e)}else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Yl(e),e=e.sibling;else Rl!==null&&Jl(e)}function Xl(e){for(e=e.child;e!==null;){if(e.tag===30){var t=e.memoizedProps,n=gi(t,e.stateNode);t=vi(t.default,t.update),e.flags&=-5,t!==`none`&&Ul(e,n,t,e.memoizedState=[],!1)}else e.subtreeFlags&33554432&&Xl(e);e=e.sibling}}function Zl(e){if(e.subtreeFlags&18874368)for(e=e.child;e!==null;){if(e.tag!==22||e.memoizedState===null){if(e.tag===30&&e.flags&18874368){var t=e.stateNode;t.paired!==null&&(t.paired=null,Gl(e.child,!1))}Zl(e)}e=e.sibling}}function Ql(e){if(e.tag===30)e.stateNode.paired=null,Gl(e.child,!1),Zl(e);else if(e.subtreeFlags&33554432)for(e=e.child;e!==null;)Ql(e),e=e.sibling;else Zl(e)}function $l(e){for(e=e.child;e!==null;)e.tag===30?Gl(e.child,!1):e.subtreeFlags&33554432&&$l(e),e=e.sibling}function eu(e,t,n,r,i,a,o){for(var s=!1;t!==null;){if(t.tag===5){var c=t.stateNode;if(a!==null&&Hl<a.length){var l=a[Hl],u=Op(c);(l.view||u.view)&&(s=!0);var d;if(d=!(e.flags&4)){if(u.clip)d=!0;else{d=l.rect;var f=u.rect;d=d.y!==f.y||d.x!==f.x||d.height!==f.height||d.width!==f.width}}d&&(e.flags|=4),u.abs?u=!l.abs:(l=l.rect,u=u.rect,u=l.height!==u.height||l.width!==u.width),u&&(e.flags|=32)}else e.flags|=32;e.flags&4&&Tp(c,Hl===0?n:n+`_`+Hl,i),s&&e.flags&4||(Bl===null&&(Bl=[]),Bl.push(c,Hl===0?r:r+`_`+Hl,t.memoizedProps)),Hl++}else(t.tag!==22||t.memoizedState===null)&&(t.tag===30&&o?e.flags|=t.flags&32:eu(e,t.child,n,r,i,a,o)&&(s=!0));t=t.sibling}return s}function tu(e,t){for(e=e.child;e!==null;){if(e.tag===30){var n=e.memoizedProps,r=e.stateNode,i=gi(n,r),a=vi(n.default,n.update);if(t){r=r.clones;var o=r===null?null:r.map(kp)}else o=e.memoizedState,e.memoizedState=null;r=e;var s=e.child;Hl=0,i=eu(r,s,i,i,a,o,!1),e.flags&4&&i&&(t||Md(e,n.onUpdate))}else e.subtreeFlags&33554432&&tu(e,t);e=e.sibling}}var nu=!1,q=!1,ru=!1,iu=!1,au=typeof WeakSet==`function`?WeakSet:Set,ou=null,su=!1,cu=!1,lu=!1,uu=!1;function du(e,t,n){if(e=e.containerInfo,sp=gh,e=z(e),Jr(e)){if(`selectionStart`in e)var r={start:e.selectionStart,end:e.selectionEnd};else a:{r=(r=e.ownerDocument)&&r.defaultView||window;var i=r.getSelection&&r.getSelection();if(i&&i.rangeCount!==0){r=i.anchorNode;var a=i.anchorOffset,o=i.focusNode;i=i.focusOffset;try{r.nodeType,o.nodeType}catch{r=null;break a}var s=0,c=-1,l=-1,u=0,d=0,f=e,p=null;b:for(;;){for(var m;f!==r||a!==0&&f.nodeType!==3||(c=s+a),f!==o||i!==0&&f.nodeType!==3||(l=s+i),f.nodeType===3&&(s+=f.nodeValue.length),(m=f.firstChild)!==null;)p=f,f=m;for(;;){if(f===e)break b;if(p===r&&++u===a&&(c=s),p===o&&++d===i&&(l=s),(m=f.nextSibling)!==null)break;f=p,p=f.parentNode}f=m}r=c===-1||l===-1?null:{start:c,end:l}}else r=null}r||={start:0,end:0}}else r=null;for(cp={focusedElem:e,selectionRange:r},gh=!1,n=(n&335544064)===n,ou=t,t=n?9270:1024;ou!==null;){if(e=ou,n&&(r=e.deletions,r!==null))for(a=0;a<r.length;a++)n&&Yl(r[a]);if(e.alternate===null&&e.flags&2)n&&zl(e),fu(n);else{if(e.tag===22){if(r=e.alternate,e.memoizedState!==null){r!==null&&r.memoizedState===null&&n&&Yl(r),fu(n);continue}if(r!==null&&r.memoizedState!==null){n&&zl(e),fu(n);continue}}r=e.child,(e.subtreeFlags&t)!==0&&r!==null?(r.return=e,ou=r):(n&&Xl(e),fu(n))}}Rl=null}function fu(e){for(;ou!==null;){var t=ou,n=e,r=t.alternate,a=t.flags;switch(t.tag){case 0:case 11:case 15:break;case 1:if(a&1024&&r!==null){n=void 0,a=r.memoizedProps,r=r.memoizedState;var o=t.stateNode;try{var s=bc(t.type,a);n=o.getSnapshotBeforeUpdate(s,r),o.__reactInternalSnapshotBeforeUpdate=n}catch(e){Q(t,t.return,e)}}break;case 3:if(a&1024){if(r=t.stateNode.containerInfo,n=r.nodeType,n===9)nm(r);else if(n===1)switch(r.nodeName){case`HEAD`:case`HTML`:case`BODY`:nm(r);break;default:r.textContent=``}}break;case 5:case 26:case 27:case 6:case 4:case 17:break;case 30:n&&r!==null&&(n=gi(r.memoizedProps,r.stateNode),a=t.memoizedProps,a=vi(a.default,a.update),a!==`none`&&Ul(r,n,a,r.memoizedState=[],!0));break;default:if(a&1024)throw Error(i(163))}if(r=t.sibling,r!==null){r.return=t.return,ou=r;break}ou=t.return}}function pu(e,t,n){var r=n.flags;switch(n.tag){case 0:case 11:case 15:Nu(e,n),r&4&&yl(5,n);break;case 1:if(Nu(e,n),r&4){if(e=n.stateNode,t===null)try{e.componentDidMount()}catch(e){Q(n,n.return,e)}else{var i=bc(n.type,t.memoizedProps);t=t.memoizedState;try{e.componentDidUpdate(i,t,e.__reactInternalSnapshotBeforeUpdate)}catch(e){Q(n,n.return,e)}}}r&64&&xl(n),r&512&&Cl(n,n.return);break;case 3:if(Nu(e,n),r&64&&(e=n.updateQueue,e!==null)){if(t=null,n.child!==null)switch(n.child.tag){case 27:case 5:t=n.child.stateNode;break;case 1:t=n.child.stateNode}try{Co(e,t)}catch(e){Q(n,n.return,e)}}break;case 27:t===null&&r&4&&Il(n);case 26:case 5:Nu(e,n),t===null&&r&4&&Al(n),r&512&&Cl(n,n.return);break;case 12:Nu(e,n);break;case 31:Nu(e,n),r&4&&Su(e,n);break;case 13:Nu(e,n),r&4&&Cu(e,n),r&64&&(e=n.memoizedState,e!==null&&(e=e.dehydrated,e!==null&&(n=gf.bind(null,n),cm(e,n))));break;case 22:if(r=n.memoizedState!==null||nu,!r){var a=t!==null&&t.memoizedState!==null||q;t=nu,i=q,nu=r,(q=a)&&!i?(r=2,n.subtreeFlags&8772&&(r|=1),Fu(e,n,r)):Nu(e,n),nu=t,q=i}break;case 30:Nu(e,n),r&512&&Cl(n,n.return);break;case 7:r&512&&Cl(n,n.return);default:Nu(e,n)}}function mu(e,t){for(e=e.child;e!==null;)hu(e,t),e=e.sibling}function hu(e,t){switch(e.tag){case 5:case 26:try{var n=e.stateNode;if(t){var r=n.style;typeof r.setProperty==`function`?r.setProperty(`display`,`none`,`important`):r.display=`none`}else{var i=e.stateNode,a=e.memoizedProps.style,o=a!=null&&a.hasOwnProperty(`display`)?a.display:null;i.style.display=o==null||typeof o==`boolean`?``:(``+o).trim()}}catch(t){Q(e,e.return,t)}gu(e,t);break;case 6:try{e.stateNode.nodeValue=t?``:e.memoizedProps,L=!0}catch(t){Q(e,e.return,t)}break;case 18:try{var s=e.stateNode;t?wp(s,!0):wp(e.stateNode,!1)}catch(t){Q(e,e.return,t)}break;case 22:case 23:e.memoizedState===null&&mu(e,t);break;default:mu(e,t)}}function gu(e,t){if(e.subtreeFlags&67108864)for(e=e.child;e!==null;){a:{var n=e,r=t;switch(n.tag){case 4:hu(n,r);break a;case 22:n.memoizedState===null&&gu(n,r);break a;default:gu(n,r)}}e=e.sibling}}function _u(e){var t=e.alternate;t!==null&&(e.alternate=null,_u(t)),e.child=null,e.deletions=null,e.sibling=null,e.tag===5&&(t=e.stateNode,t!==null&&Nt(t)),e.stateNode=null,e.return=null,e.dependencies=null,e.memoizedProps=null,e.memoizedState=null,e.pendingProps=null,e.stateNode=null,e.updateQueue=null}var vu=null,yu=!1;function bu(e,t,n){for(n=n.child;n!==null;)xu(e,t,n),n=n.sibling}function xu(e,t,n){if(P&&typeof P.onCommitFiberUnmount==`function`)try{P.onCommitFiberUnmount(et,n)}catch{}switch(n.tag){case 26:q||wl(n,t),bu(e,t,n),n.memoizedState?n.memoizedState.count--:n.stateNode&&!q&&(n=n.stateNode,n.parentNode.removeChild(n));break;case 27:q||wl(n,t),Dl(n);var r=vu,i=yu;Sp(n.type)&&(vu=n.stateNode,yu=!1),bu(e,t,n),gm(n.stateNode,n.type,n.memoizedProps),vu=r,yu=i;break;case 5:q||wl(n,t),Dl(n);case 6:if(n.tag===6&&Dl(n),r=vu,i=yu,vu=null,bu(e,t,n),vu=r,yu=i,vu!==null){if(yu)try{(vu.nodeType===9?vu.body:vu.nodeName===`HTML`?vu.ownerDocument.body:vu).removeChild(n.stateNode),L=!0}catch(e){Q(n,t,e)}else try{vu.removeChild(n.stateNode),L=!0}catch(e){Q(n,t,e)}}break;case 18:vu!==null&&(yu?(e=vu,Cp(e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,n.stateNode),Hh(e)):Cp(vu,n.stateNode));break;case 4:r=vu,i=yu,vu=n.stateNode.containerInfo,yu=!0,bu(e,t,n),vu=r,yu=i;break;case 0:case 11:case 14:case 15:bl(2,n,t),q||bl(4,n,t),bu(e,t,n);break;case 1:q||(wl(n,t),r=n.stateNode,typeof r.componentWillUnmount==`function`&&Sl(n,t,r)),bu(e,t,n);break;case 21:bu(e,t,n);break;case 22:q=(r=q)||n.memoizedState!==null,bu(e,t,n),q=r;break;case 30:wl(n,t),bu(e,t,n);break;case 7:q||wl(n,t),bu(e,t,n);break;default:bu(e,t,n)}}function Su(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null))){e=e.dehydrated;try{Hh(e)}catch(e){Q(t,t.return,e)}}}function Cu(e,t){if(t.memoizedState===null&&(e=t.alternate,e!==null&&(e=e.memoizedState,e!==null&&(e=e.dehydrated,e!==null))))try{Hh(e)}catch(e){Q(t,t.return,e)}}function wu(e){switch(e.tag){case 31:case 13:case 19:var t=e.stateNode;return t===null&&(t=e.stateNode=new au),t;case 22:return e=e.stateNode,t=e._retryCache,t===null&&(t=e._retryCache=new au),t;default:throw Error(i(435,e.tag))}}function Tu(e,t){var n=wu(e);t.forEach(function(t){if(!n.has(t)){n.add(t);var r=_f.bind(null,e,t);t.then(r,r)}})}function Eu(e,t,n){var r=t.deletions;if(r!==null)for(var a=0;a<r.length;a++){var o=r[a],s=e,c=t,l=c;a:for(;l!==null;){switch(l.tag){case 27:if(Sp(l.type)){vu=l.stateNode,yu=!1;break a}break;case 5:vu=l.stateNode,yu=!1;break a;case 3:case 4:vu=l.stateNode.containerInfo,yu=!0;break a}l=l.return}if(vu===null)throw Error(i(160));xu(s,c,o),vu=null,yu=!1,s=o.alternate,s!==null&&(s.return=null),o.return=null}if(t.subtreeFlags&13886)for(t=t.child;t!==null;)Ou(t,e,n),t=t.sibling}var Du=null;function Ou(e,t,n){var r=e.alternate,a=e.flags;switch(e.tag){case 0:case 11:case 14:case 15:if(a&4&&(r=e.updateQueue,r=r===null?null:r.events,r!==null))for(var o=0;o<r.length;o++){var s=r[o];s.ref.impl=s.nextImpl}Eu(t,e,n),ku(e),a&4&&(bl(3,e,e.return),yl(3,e),bl(5,e,e.return));break;case 1:Eu(t,e,n),ku(e),a&512&&(q||r===null||wl(r,r.return)),a&64&&nu&&(e=e.updateQueue,e!==null&&(t=e.callbacks,t!==null&&(n=e.shared.hiddenCallbacks,e.shared.hiddenCallbacks=n===null?t:n.concat(t))));break;case 26:if(o=Du,Eu(t,e,n),ku(e),a&512&&(q||r===null||wl(r,r.return)),a&4){if(a=r===null?null:r.memoizedState,n=e.memoizedState,r===null){if(n===null){if(e.stateNode===null){if(nu)e.stateNode=fp(e.type,e.memoizedProps,t.containerInfo,e);else{a:{t=e.type,n=e.memoizedProps,a=o.ownerDocument||o;b:switch(t){case`title`:r=a.getElementsByTagName(`title`)[0],(!r||r[jt]||r[wt]||r.namespaceURI===`http://www.w3.org/2000/svg`||r.hasAttribute(`itemprop`))&&(r=a.createElement(t),a.head.insertBefore(r,a.querySelector(`head > title`))),np(r,t,n),r[wt]=e,Rt(r),t=r;break a;case`link`:if(o=Gm(`link`,`href`,a).get(t+(n.href||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`href`)===(n.href==null||n.href===``?null:n.href)&&r.getAttribute(`rel`)===(n.rel==null?null:n.rel)&&r.getAttribute(`title`)===(n.title==null?null:n.title)&&r.getAttribute(`crossorigin`)===(n.crossOrigin==null?null:n.crossOrigin)){o.splice(s,1);break b}}r=a.createElement(t),np(r,t,n),a.head.appendChild(r);break;case`meta`:if(o=Gm(`meta`,`content`,a).get(t+(n.content||``))){for(s=0;s<o.length;s++)if(r=o[s],r.getAttribute(`content`)===(n.content==null?null:``+n.content)&&r.getAttribute(`name`)===(n.name==null?null:n.name)&&r.getAttribute(`property`)===(n.property==null?null:n.property)&&r.getAttribute(`http-equiv`)===(n.httpEquiv==null?null:n.httpEquiv)&&r.getAttribute(`charset`)===(n.charSet==null?null:n.charSet)){o.splice(s,1);break b}}r=a.createElement(t),np(r,t,n),a.head.appendChild(r);break;default:throw Error(i(468,t))}r[wt]=e,Rt(r),t=r}e.stateNode=t}}else nu||Km(o,e.type,e.stateNode)}else e.stateNode=Bm(o,n,e.memoizedProps)}else a===n?n===null&&e.stateNode!==null&&jl(e,e.memoizedProps,r.memoizedProps):(a===null?(t=r.stateNode,t===null||q||t.parentNode.removeChild(t)):a.count--,n===null?nu||Km(o,e.type,e.stateNode):Bm(o,n,e.memoizedProps))}break;case 27:Eu(t,e,n),ku(e),a&512&&(q||r===null||wl(r,r.return)),r!==null&&a&4&&jl(e,e.memoizedProps,r.memoizedProps);break;case 5:if(o=ru,ru=!1,Eu(t,e,n),ru=o,ku(e),a&512&&(q||r===null||wl(r,r.return)),e.flags&32){t=e.stateNode;try{dn(t,``),L=!0}catch(t){Q(e,e.return,t)}}a&4&&e.stateNode!=null&&(t=e.memoizedProps,jl(e,t,r===null?t:r.memoizedProps)),a&1024&&(iu=!0);break;case 6:if(Eu(t,e,n),ku(e),a&4){if(e.stateNode===null)throw Error(i(162));t=e.memoizedProps,n=e.stateNode;try{n.nodeValue=t,L=!0}catch(t){Q(e,e.return,t)}}break;case 3:if(L=!1,Wm=null,o=Du,Du=bm(t.containerInfo),Eu(t,e,n),Du=o,ku(e),a&4&&r!==null&&r.memoizedState.isDehydrated)try{Hh(t.containerInfo)}catch(t){Q(e,e.return,t)}iu&&(iu=!1,Au(e)),L=!1;break;case 4:a=ru,ru=nu,r=Jt(),o=Du,Du=bm(e.stateNode.containerInfo),Eu(t,e,n),ku(e),Du=o,L&&cu&&(lu=!0),L=r,ru=a;break;case 12:Eu(t,e,n),ku(e);break;case 31:Eu(t,e,n),ku(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Tu(e,t)));break;case 13:Eu(t,e,n),ku(e),e.child.flags&8192&&e.memoizedState!==null!=(r!==null&&r.memoizedState!==null)&&(pd=Ge()),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Tu(e,t)));break;case 22:o=e.memoizedState!==null,s=r!==null&&r.memoizedState!==null;var c=nu,l=q,u=ru;nu=c||o,ru=u||o,q=l||s,Eu(t,e,n),q=l,ru=u,nu=c,ku(e),a&8192&&(t=e.stateNode,t._visibility=o?t._visibility&-2:t._visibility|1,!o||r===null||s||nu||q||(t=s||q,n=nu,r=q,nu=o||nu,q=t,Pu(e,2),nu=n,q=r),!o&&ru||mu(e,o)),a&4&&(t=e.updateQueue,t!==null&&(n=t.retryQueue,n!==null&&(t.retryQueue=null,Tu(e,n))));break;case 19:Eu(t,e,n),ku(e),a&4&&(t=e.updateQueue,t!==null&&(e.updateQueue=null,Tu(e,t)));break;case 30:a&512&&(q||r===null||wl(r,r.return)),a=Jt(),o=cu,s=(n&335544064)===n,c=e.memoizedProps,cu=s&&vi(c.default,c.update)!==`none`,Eu(t,e,n),ku(e),s&&r!==null&&L&&(e.flags|=4),cu=o,L=a;break;case 21:break;case 7:a&512&&(q||r===null||wl(r,r.return)),r&&r.stateNode!==null&&(r.stateNode._fragmentFiber=e);default:Eu(t,e,n),ku(e)}}function ku(e){var t=e.flags;if(t&2){try{for(var n,r=e.return;r!==null;){if(Ml(r)){n=r;break}r=r.return}r=null;for(var a=e.return;a!==null;){if(kl(a)){var o=a.stateNode;r===null?r=[o]:r.push(o)}if(Ol(a))break;a=a.return}var s=r;if(n==null)throw Error(i(160));switch(n.tag){case 27:var c=n.stateNode;Fl(e,Nl(e),c,s);break;case 5:var l=n.stateNode;n.flags&32&&(dn(l,``),n.flags&=-33),Fl(e,Nl(e),l,s);break;case 3:case 4:var u=n.stateNode.containerInfo;Pl(e,Nl(e),u,s);break;default:throw Error(i(161))}}catch(t){Q(e,e.return,t)}e.flags&=-3}t&4096&&(e.flags&=-4097)}function Au(e){if(e.subtreeFlags&1024)for(e=e.child;e!==null;){var t=e;Au(t),t.tag===5&&t.flags&1024&&(t=t.stateNode,gh=!0,t.reset(),gh=!1),e=e.sibling}}function ju(e,t){if(t.subtreeFlags&9270)for(t=t.child;t!==null;)Mu(t,e),t=t.sibling;else tu(t,!1)}function Mu(e,t){var n=e.alternate;if(n===null)ql(e,!1);else switch(e.tag){case 3:if(uu=su=!1,Vl(),ju(t,e),!su&&!lu){if(e=Bl,e!==null)for(var r=0;r<e.length;r+=3){n=e[r];var i=e[r+1];Ep(n,e[r+2]),n=n.ownerDocument.documentElement,n!==null&&n.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(`+i+`)`})}e=t.containerInfo,e=e.nodeType===9?e.documentElement:e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===``&&(e.style.viewTransitionName=`none`,e.animate({opacity:[0,0],pointerEvents:[`none`,`none`]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition-group(root)`}),e.animate({width:[0,0],height:[0,0]},{duration:0,fill:`forwards`,pseudoElement:`::view-transition`})),uu=!0}Bl=null;break;case 5:ju(t,e);break;case 4:r=su,su=!1,ju(t,e),su&&(lu=!0),su=r;break;case 22:e.memoizedState===null&&(n.memoizedState===null?ju(t,e):ql(e,!1));break;case 30:r=su,i=Vl(),su=!1,ju(t,e),su&&(e.flags|=4);var a=e.memoizedProps,o=e.stateNode;t=gi(a,o),o=gi(n.memoizedProps,o);var s=vi(a.default,a.update);s===`none`?t=!1:(a=n.memoizedState,n.memoizedState=null,n=e.child,Hl=0,t=eu(e,n,t,o,s,a,!0),Hl!==(a===null?0:a.length)&&(e.flags|=32)),e.flags&4&&t?(Md(e,e.memoizedProps.onUpdate),Bl=i):i!==null&&(i.push.apply(i,Bl),Bl=i),su=e.flags&32?!0:r;break;default:ju(t,e)}}function Nu(e,t){if(t.subtreeFlags&8772)for(t=t.child;t!==null;)pu(e,t.alternate,t),t=t.sibling}function Pu(e,t){for(e=e.child;e!==null;){var n=e,r=t;switch(n.tag){case 0:case 11:case 14:case 15:bl(4,n,n.return),Pu(n,r);break;case 1:wl(n,n.return);var i=n.stateNode;typeof i.componentWillUnmount==`function`&&Sl(n,n.return,i),Pu(n,r);break;case 27:r&2&&gm(n.stateNode,n.type,n.memoizedProps);case 5:wl(n,n.return),n.tag!==5&&n.tag!==27||Dl(n),Pu(n,r);break;case 6:Dl(n);break;case 26:wl(n,n.return),i=n.stateNode,n.memoizedState!==null||i===null||q||i.parentNode.removeChild(i),Pu(n,r);break;case 22:n.memoizedState===null&&Pu(n,r);break;case 30:wl(n,n.return),Pu(n,r);break;case 7:wl(n,n.return);default:Pu(n,r)}e=e.sibling}}function Fu(e,t,n){for(n=t.subtreeFlags&8772?n:n&-2,t=t.child;t!==null;){var r=t.alternate,i=e,a=t,o=a.flags,s=!!(n&1);switch(a.tag){case 0:case 11:case 15:Fu(i,a,n),yl(4,a);break;case 1:if(Fu(i,a,n),r=a,i=r.stateNode,typeof i.componentDidMount==`function`)try{i.componentDidMount()}catch(e){Q(r,r.return,e)}if(r=a,i=r.updateQueue,i!==null){var c=r.stateNode;try{var l=i.shared.hiddenCallbacks;if(l!==null)for(i.shared.hiddenCallbacks=null,i=0;i<l.length;i++)So(l[i],c)}catch(e){Q(r,r.return,e)}}s&&o&64&&xl(a),Cl(a,a.return);break;case 27:n&2&&Il(a);case 5:a.tag!==5&&a.tag!==27||El(a),Fu(i,a,n),s&&r===null&&o&4&&Al(a),Cl(a,a.return);break;case 6:El(a);break;case 26:c=a.stateNode,a.memoizedState!==null||c===null||nu||Km(bm(c.ownerDocument),a.type,c),Fu(i,a,n),s&&r===null&&o&4&&Al(a),Cl(a,a.return);break;case 12:Fu(i,a,n);break;case 31:Fu(i,a,n),s&&o&4&&Su(i,a);break;case 13:Fu(i,a,n),s&&o&4&&Cu(i,a);break;case 22:a.memoizedState===null&&Fu(i,a,n),Cl(a,a.return);break;case 30:Fu(i,a,n),Cl(a,a.return);break;case 7:Cl(a,a.return);default:Fu(i,a,n)}t=t.sibling}}function Iu(e,t){var n=null;e!==null&&e.memoizedState!==null&&e.memoizedState.cachePool!==null&&(n=e.memoizedState.cachePool.pool),e=null,t.memoizedState!==null&&t.memoizedState.cachePool!==null&&(e=t.memoizedState.cachePool.pool),e!==n&&(e!=null&&e.refCount++,n!=null&&ja(n))}function Lu(e,t){e=null,t.alternate!==null&&(e=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==e&&(t.refCount++,e!=null&&ja(e))}function Ru(e,t,n,r){var i=(n&335544064)===n;if(t.subtreeFlags&(i?10262:10256))for(t=t.child;t!==null;)zu(e,t,n,r),t=t.sibling;else i&&$l(t)}function zu(e,t,n,r){var i=(n&335544064)===n;i&&t.alternate===null&&t.return!==null&&t.return.alternate!==null&&Ql(t);var a=t.flags;switch(t.tag){case 0:case 11:case 15:Ru(e,t,n,r),a&2048&&yl(9,t);break;case 1:Ru(e,t,n,r);break;case 3:Ru(e,t,n,r),i&&uu&&(e=e.containerInfo,e=e.nodeType===9?e.body:e.nodeName===`HTML`?e.ownerDocument.body:e,e.style.viewTransitionName===`root`&&(e.style.viewTransitionName=``),e=e.ownerDocument.documentElement,e!==null&&e.style.viewTransitionName===`none`&&(e.style.viewTransitionName=``)),a&2048&&(a=null,t.alternate!==null&&(a=t.alternate.memoizedState.cache),t=t.memoizedState.cache,t!==a&&(t.refCount++,a!=null&&ja(a)));break;case 12:if(a&2048){Ru(e,t,n,r),a=t.stateNode;try{var o=t.memoizedProps,s=o.id,c=o.onPostCommit;typeof c==`function`&&c(s,t.alternate===null?`mount`:`update`,a.passiveEffectDuration,-0)}catch(e){Q(t,t.return,e)}}else Ru(e,t,n,r);break;case 31:Ru(e,t,n,r);break;case 13:Ru(e,t,n,r);break;case 23:break;case 22:o=t.stateNode,s=t.alternate,t.memoizedState===null?(i&&s!==null&&s.memoizedState!==null&&Ql(t),o._visibility&2?Ru(e,t,n,r):(o._visibility|=2,Bu(e,t,n,r,!!(t.subtreeFlags&10256)||!1))):(i&&s!==null&&s.memoizedState===null&&Ql(s),o._visibility&2?Ru(e,t,n,r):Vu(e,t)),a&2048&&Iu(s,t);break;case 24:Ru(e,t,n,r),a&2048&&Lu(t.alternate,t);break;case 30:i&&(a=t.alternate,a!==null&&(Gl(a.child,!0),Gl(t.child,!0))),Ru(e,t,n,r);break;default:Ru(e,t,n,r)}}function Bu(e,t,n,r,i){for(i&&=!!(t.subtreeFlags&10256)||!1,t=t.child;t!==null;){var a=e,o=t,s=n,c=r,l=o.flags;switch(o.tag){case 0:case 11:case 15:Bu(a,o,s,c,i),yl(8,o);break;case 23:break;case 22:var u=o.stateNode;o.memoizedState===null?(u._visibility|=2,Bu(a,o,s,c,i)):u._visibility&2?Bu(a,o,s,c,i):Vu(a,o),i&&l&2048&&Iu(o.alternate,o);break;case 24:Bu(a,o,s,c,i),i&&l&2048&&Lu(o.alternate,o);break;default:Bu(a,o,s,c,i)}t=t.sibling}}function Vu(e,t){if(t.subtreeFlags&10256)for(t=t.child;t!==null;){var n=e,r=t,i=r.flags;switch(r.tag){case 22:Vu(n,r),i&2048&&Iu(r.alternate,r);break;case 24:Vu(n,r),i&2048&&Lu(r.alternate,r);break;default:Vu(n,r)}t=t.sibling}}var Hu=8192;function Uu(e,t,n){if(e.subtreeFlags&Hu)for(e=e.child;e!==null;)Wu(e,t,n),e=e.sibling}function Wu(e,t,n){switch(e.tag){case 26:Uu(e,t,n),e.flags&Hu&&(e.memoizedState===null?(e=e.stateNode,(t&335544128)===t&&Zm(n,e)):Qm(n,Du,e.memoizedState,e.memoizedProps));break;case 5:Uu(e,t,n),e.flags&Hu&&(e=e.stateNode,(t&335544128)===t&&Zm(n,e));break;case 3:case 4:var r=Du;Du=bm(e.stateNode.containerInfo),Uu(e,t,n),Du=r;break;case 22:e.memoizedState===null&&(r=e.alternate,r!==null&&r.memoizedState!==null?(r=Hu,Hu=16777216,Uu(e,t,n),Hu=r):Uu(e,t,n));break;case 30:if((e.flags&Hu)!==0&&(r=e.memoizedProps.name,r!=null&&r!==`auto`)){var i=e.stateNode;i.paired=null,Rl===null&&(Rl=new Map),Rl.set(r,i)}Uu(e,t,n);break;default:Uu(e,t,n)}}function Gu(e){var t=e.alternate;if(t!==null&&(e=t.child,e!==null)){t.child=null;do t=e.sibling,e.sibling=null,e=t;while(e!==null)}}function Ku(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];ou=r,Yu(r,e)}Gu(e)}if(e.subtreeFlags&10256)for(e=e.child;e!==null;)qu(e),e=e.sibling}function qu(e){switch(e.tag){case 0:case 11:case 15:Ku(e),e.flags&2048&&bl(9,e,e.return);break;case 3:Ku(e);break;case 12:Ku(e);break;case 22:var t=e.stateNode;e.memoizedState!==null&&t._visibility&2&&(e.return===null||e.return.tag!==13)?(t._visibility&=-3,Ju(e)):Ku(e);break;default:Ku(e)}}function Ju(e){var t=e.deletions;if(e.flags&16){if(t!==null)for(var n=0;n<t.length;n++){var r=t[n];ou=r,Yu(r,e)}Gu(e)}for(e=e.child;e!==null;){switch(t=e,t.tag){case 0:case 11:case 15:bl(8,t,t.return),Ju(t);break;case 22:n=t.stateNode,n._visibility&2&&(n._visibility&=-3,Ju(t));break;default:Ju(t)}e=e.sibling}}function Yu(e,t){for(;ou!==null;){var n=ou;switch(n.tag){case 0:case 11:case 15:bl(8,n,t);break;case 23:case 22:if(n.memoizedState!==null&&n.memoizedState.cachePool!==null){var r=n.memoizedState.cachePool.pool;r!=null&&r.refCount++}break;case 24:ja(n.memoizedState.cache)}if(r=n.child,r!==null)r.return=n,ou=r;else a:for(n=e;ou!==null;){r=ou;var i=r.sibling,a=r.return;if(_u(r),r===n){ou=null;break a}if(i!==null){i.return=a,ou=i;break a}ou=a}}}var Xu={getCacheForType:function(e){var t=Ca(ka),n=t.data.get(e);return n===void 0&&(n=e(),t.data.set(e,n)),n},cacheSignal:function(){return Ca(ka).controller.signal}},Zu=typeof WeakMap==`function`?WeakMap:Map,J=0,Qu=null,Y=null,X=0,Z=0,$u=null,ed=!1,td=!1,nd=!1,rd=0,id=0,ad=0,od=0,sd=0,cd=0,ld=0,ud=null,dd=null,fd=!1,pd=0,md=0,hd=1/0,gd=null,_d=null,vd=0,yd=null,bd=null,xd=0,Sd=0,Cd=null,wd=null,Td=null,Ed=null,Dd=null,Od=0,kd=null;function Ad(){return J&2&&X!==0?X&-X:A.T===null?xt():Nf()}function jd(){if(cd===0){if(!(X&536870912)||H){var e=st;st<<=1,!(st&3932160)&&(st=262144),cd=e}else cd=536870912}return e=ko.current,e!==null&&(e.flags|=32),cd}function Md(e,t){if(t!=null){var n=e.stateNode,r=n.ref;r===null&&(r=n.ref=Pp(gi(e.memoizedProps,n))),Ed===null&&(Ed=[]),Ed.push(t.bind(null,r))}}function Nd(e,t,n){(e===Qu&&(Z===2||Z===9)||e.cancelPendingCommit!==null)&&(Bd(e,0),Ld(e,X,cd,!1)),mt(e,n),J&2&&e===Qu||(e===Qu&&(!(J&2)&&(od|=n),id===4&&Ld(e,X,cd,!1)),Tf(e))}function Pd(e,t,n){if(J&6)throw Error(i(327));var r=!n&&!(t&127)&&(t&e.expiredLanes)===0||ut(e,t),a=r?Jd(e,t):Kd(e,t,!0),o=r;do{if(a===0){td&&!r&&Ld(e,t,0,!1);break}if(n=e.current.alternate,o&&!Id(n))a=Kd(e,t,!1),o=!1;else{if(a===2){if(o=t,e.errorRecoveryDisabledLanes&o)var s=0;else s=e.pendingLanes&-536870913,s=s===0?s&536870912?536870912:0:s;if(s!==0){t=s;a:{var c=e;a=ud;var l=c.current.memoizedState.isDehydrated;if(l&&(Bd(c,s).flags|=256),s=Kd(c,s,!1),s!==2&&s!==6){if(nd&&!l){c.errorRecoveryDisabledLanes|=o,od|=o,a=4;break a}o=dd,dd=a,o!==null&&(dd===null?dd=o:dd.push.apply(dd,o))}a=s}if(o=!1,a!==2)continue}}if(a===1){Bd(e,0),Ld(e,t,0,!0);break}a:{switch(r=e,o=a,o){case 0:case 1:throw Error(i(345));case 4:if((t&4194048)!==t&&(t&62914560)!==t)break;case 6:Ld(r,t,cd,!ed);break a;case 2:dd=null;break;case 3:case 5:break;default:throw Error(i(329))}if((t&62914560)===t&&(a=pd+300-Ge(),10<a)){if(Ld(r,t,cd,!ed),F(r,0,!0)!==0)break a;xd=t,r.timeoutHandle=gp(Fd.bind(null,r,n,dd,gd,fd,t,cd,od,ld,ed,o,`Throttled`,-0,0),a);break a}Fd(r,n,dd,gd,fd,t,cd,od,ld,ed,o,null,-0,0)}break}}while(1);Tf(e)}function Fd(e,t,n,r,i,a,o,s,c,l,u,d,f,p){e.timeoutHandle=-1;var m=t.subtreeFlags,h=(a&335544064)===a;d=null,(h||m&8192||(m&16785408)==16785408)&&(d={stylesheets:null,count:0,imgCount:0,imgBytes:0,suspenseyImages:[],waitingForImages:!0,waitingForViewTransition:!1,unsuspend:yn},Rl=null,Wu(t,a,d),h&&(m=d,h=e.containerInfo,h=(h.nodeType===9?h:h.ownerDocument).__reactViewTransition,h!=null&&(m.count++,m.waitingForViewTransition=!0,m=nh.bind(m),h.finished.then(m,m))),m=(a&62914560)===a?pd-Ge():(a&4194048)===a?md-Ge():0,m=eh(d,m),m!==null)?(xd=a,e.cancelPendingCommit=m(tf.bind(null,e,t,a,n,r,i,o,s,c,l,u,d,null,f,p)),Ld(e,a,o,!l)):tf(e,t,a,n,r,i,o,s,c,l,u,d)}function Id(e){for(var t=e;;){var n=t.tag;if((n===0||n===11||n===15)&&t.flags&16384&&(n=t.updateQueue,n!==null&&(n=n.stores,n!==null)))for(var r=0;r<n.length;r++){var i=n[r],a=i.getSnapshot;i=i.value;try{if(!Hr(a(),i))return!1}catch{return!1}}if(n=t.child,t.subtreeFlags&16384&&n!==null)n.return=t,t=n;else{if(t===e)break;for(;t.sibling===null;){if(t.return===null||t.return===e)return!0;t=t.return}t.sibling.return=t.return,t=t.sibling}}return!0}function Ld(e,t,n,r){t=I(e,t),t&=~sd,t&=~od,e.suspendedLanes|=t,e.pingedLanes&=~t,r&&(e.warmLanes|=t),r=e.expirationTimes;for(var i=t;0<i;){var a=31-nt(i),o=1<<a;r[a]=-1,i&=~o}n!==0&&gt(e,n,t)}function Rd(){return J&6?!0:(Ef(0,!1),!1)}function zd(){if(Y!==null){if(Z===0)var e=Y.return;else e=Y,ha=ma=null,rs(e),ro=null,io=0,e=Y;for(;e!==null;)vl(e.alternate,e),e=e.return;Y=null}}function Bd(e,t){var n=e.timeoutHandle;return n!==-1&&(e.timeoutHandle=-1,_p(n)),n=e.cancelPendingCommit,n!==null&&(e.cancelPendingCommit=null,n()),xd=0,zd(),Qu=e,Y=n=Mi(e.current,null),X=t,Z=0,$u=null,ed=!1,td=ut(e,t),nd=!1,ld=cd=sd=od=ad=id=0,dd=ud=null,fd=!1,rd=I(e,t),Ci(),n}function Vd(e,t){U=null,A.H=fc,t===qa||t===Ya?(t=to(),Z=3):t===Ja?(t=to(),Z=4):Z=t===Ac?8:typeof t==`object`&&t&&typeof t.then==`function`?6:1,$u=t,Y===null&&(id=1,wc(e,Bi(t,e.current)))}function Hd(){var e=ko.current;return e===null?!0:(X&4194048)===X?Ao===null:(X&62914560)===X||X&536870912?e===Ao:!1}function Ud(){var e=A.H;return A.H=fc,e===null?fc:e}function Wd(){var e=A.A;return A.A=Xu,e}function Gd(){id=4,ed||(X&4194048)!==X&&ko.current!==null||(td=!0),!(ad&134217727)&&!(od&134217727)||Qu===null||Ld(Qu,X,cd,!1)}function Kd(e,t,n){var r=J;J|=2;var i=Ud(),a=Wd();(Qu!==e||X!==t)&&(gd=null,Bd(e,t)),t=!1;var o=id;a:do try{if(Z!==0&&Y!==null){var s=Y,c=$u;switch(Z){case 8:zd(),o=6;break a;case 3:case 2:case 9:case 6:ko.current===null&&(t=!0);var l=Z;if(Z=0,$u=null,Qd(e,s,c,l),n&&td){o=0;break a}break;default:l=Z,Z=0,$u=null,Qd(e,s,c,l)}}qd(),o=id;break}catch(t){Vd(e,t)}while(1);return t&&e.shellSuspendCounter++,ha=ma=null,J=r,A.H=i,A.A=a,Y===null&&(Qu=null,X=0,Ci()),o}function qd(){for(;Y!==null;)Xd(Y)}function Jd(e,t){var n=J;J|=2;var r=Ud(),a=Wd();Qu!==e||X!==t?(gd=null,hd=Ge()+500,Bd(e,t)):td=ut(e,t);a:do try{if(Z!==0&&Y!==null){t=Y;var o=$u;b:switch(Z){case 1:Z=0,$u=null,Qd(e,t,o,1);break;case 2:case 9:if(Za(o)){Z=0,$u=null,Zd(t);break}t=function(){Z!==2&&Z!==9||Qu!==e||(Z=7),Tf(e)},o.then(t,t);break a;case 3:Z=7;break a;case 4:Z=5;break a;case 7:Za(o)?(Z=0,$u=null,Zd(t)):(Z=0,$u=null,Qd(e,t,o,7));break;case 5:var s=null;switch(Y.tag){case 26:s=Y.memoizedState;case 5:case 27:var c=Y;if(s?Ym(s):c.stateNode.complete){Z=0,$u=null;var l=c.sibling;if(l!==null)Y=l;else{var u=c.return;u===null?Y=null:(Y=u,$d(u))}break b}}Z=0,$u=null,Qd(e,t,o,5);break;case 6:Z=0,$u=null,Qd(e,t,o,6);break;case 8:zd(),id=6;break a;default:throw Error(i(462))}}Yd();break}catch(t){Vd(e,t)}while(1);return ha=ma=null,A.H=r,A.A=a,J=n,Y===null?(Qu=null,X=0,Ci(),id):0}function Yd(){for(;Y!==null&&!Ue();)Xd(Y)}function Xd(e){var t=ul(e.alternate,e,rd);e.memoizedProps=e.pendingProps,t===null?$d(e):Y=t}function Zd(e){var t=e,n=t.alternate;switch(t.tag){case 15:case 0:t=Wc(n,t,t.pendingProps,t.type,void 0,X);break;case 11:t=Wc(n,t,t.pendingProps,t.type.render,t.ref,X);break;case 5:rs(t);var r=t;r===ta&&(H?(ca(r),r.tag===5&&r.stateNode!=null&&(na=r.stateNode)):(ca(r),H=!0));default:vl(n,t),t=Y=Ni(t,rd),t=ul(n,t,rd)}e.memoizedProps=e.pendingProps,t===null?$d(e):Y=t}function Qd(e,t,n,r){ha=ma=null,rs(t),ro=null,io=0;var i=t.return;try{if(kc(e,i,t,n,X)){id=1,wc(e,Bi(n,e.current)),Y=null;return}}catch(t){if(i!==null)throw Y=i,t;id=1,wc(e,Bi(n,e.current)),Y=null;return}t.flags&32768?(H||r===1?e=!0:td||X&536870912?e=!1:(ed=e=!0,(r===2||r===9||r===3||r===6)&&(r=ko.current,r!==null&&r.tag===13&&(r.flags|=16384))),ef(t,e)):$d(t)}function $d(e){var t=e;do{if(t.flags&32768){ef(t,ed);return}e=t.return;var n=gl(t.alternate,t,rd);if(n!==null){Y=n;return}if(t=t.sibling,t!==null){Y=t;return}Y=t=e}while(t!==null);id===0&&(id=5)}function ef(e,t){do{var n=_l(e.alternate,e);if(n!==null){n.flags&=32767,Y=n;return}if(n=e.return,n!==null&&(n.flags|=32768,n.subtreeFlags=0,n.deletions=null),!t&&(e=e.sibling,e!==null)){Y=e;return}Y=e=n}while(e!==null);id=6,Y=null}function tf(e,t,n,r,a,o,s,c,l,u,d,f){e.cancelPendingCommit=null;do uf();while(vd!==0);if(J&6)throw Error(i(327));if(t!==null){if(t===e.current)throw Error(i(177));e===Qu&&(Y=Qu=null,X=0),bd=t,yd=e,xd=n,Cd=a,wd=r,nf(e,t,n,s,c,l,f)}}function nf(e,t,n,r,i,a,o){var s=t.lanes|t.childLanes;if(Sd=s,s|=Si,ht(e,n,s,r,i,a),Ed=null,(n&335544064)===n?(Dd=Pa(e),r=10262):(Dd=null,r=10256),(t.subtreeFlags&r)!==0||(t.flags&r)!==0?(e.callbackNode=null,e.callbackPriority=0,vf(Ye,function(){return df(),null})):(e.callbackNode=null,e.callbackPriority=0),Ll=!1,r=!!(t.flags&13878),t.subtreeFlags&13878||r){r=A.T,A.T=null,i=j.p,j.p=2,a=J,J|=4;try{du(e,t,n)}finally{J=a,j.p=i,A.T=r}}vd=1,Ll?Td=Mp(o,e.containerInfo,Dd,of,sf,af,cf,df,rf,null,null):(of(),sf(),cf())}function rf(e){if(vd!==0){var t=yd.onRecoverableError;t(e,{componentStack:null})}}function af(){vd===3&&(vd=0,Mu(bd,yd),vd=4)}function of(){if(vd===1){vd=0;var e=yd,t=bd,n=xd,r=!!(t.flags&13878);if(t.subtreeFlags&13878||r){r=A.T,A.T=null;var i=j.p;j.p=2;var a=J;J|=4;try{cu=lu=!1,Ou(t,e,n),n=cp;var o=z(e.containerInfo),s=n.focusedElem,c=n.selectionRange;if(o!==s&&s&&s.ownerDocument&&qr(s.ownerDocument.documentElement,s)){if(c!==null&&Jr(s)){var l=c.start,u=c.end;if(u===void 0&&(u=l),`selectionStart`in s)s.selectionStart=l,s.selectionEnd=Math.min(u,s.value.length);else{var d=s.ownerDocument||document,f=d&&d.defaultView||window;if(f.getSelection){var p=f.getSelection(),m=s.textContent.length,h=Math.min(c.start,m),g=c.end===void 0?h:Math.min(c.end,m);!p.extend&&h>g&&(o=g,g=h,h=o);var _=Kr(s,h),v=Kr(s,g);if(_&&v&&(p.rangeCount!==1||p.anchorNode!==_.node||p.anchorOffset!==_.offset||p.focusNode!==v.node||p.focusOffset!==v.offset)){var y=d.createRange();y.setStart(_.node,_.offset),p.removeAllRanges(),h>g?(p.addRange(y),p.extend(v.node,v.offset)):(y.setEnd(v.node,v.offset),p.addRange(y))}}}}for(d=[],p=s;p=p.parentNode;)p.nodeType===1&&d.push({element:p,left:p.scrollLeft,top:p.scrollTop});for(typeof s.focus==`function`&&s.focus(),s=0;s<d.length;s++){var b=d[s];b.element.scrollLeft=b.left,b.element.scrollTop=b.top}}gh=!!sp,cp=sp=null}finally{J=a,j.p=i,A.T=r}}e.current=t,vd=2}}function sf(){if(vd===2){vd=0;var e=yd,t=bd,n=!!(t.flags&8772);if(t.subtreeFlags&8772||n){n=A.T,A.T=null;var r=j.p;j.p=2;var i=J;J|=4;try{pu(e,t.alternate,t)}finally{J=i,j.p=r,A.T=n}}vd=3}}function cf(){if(vd===4||vd===3){vd=0;var e=Td;Td=null,We();var t=yd,n=bd,r=xd,i=wd,a=(r&335544064)===r?10262:10256;if((n.subtreeFlags&a)!==0||(n.flags&a)!==0?vd=5:(vd=0,bd=yd=null,lf(t,t.pendingLanes)),a=t.pendingLanes,a===0&&(_d=null),bt(r),n=n.stateNode,P&&typeof P.onCommitFiberRoot==`function`)try{P.onCommitFiberRoot(et,n,void 0,(n.current.flags&128)==128)}catch{}if(i!==null){n=A.T,a=j.p,j.p=2,A.T=null;try{for(var o=t.onRecoverableError,s=0;s<i.length;s++){var c=i[s];o(c.value,{componentStack:c.stack})}}finally{A.T=n,j.p=a}}if(i=Ed,o=Dd,Dd=null,i!==null&&(Ed=null,o===null&&(o=[]),e!==null))for(c=0;c<i.length;c++)n=(0,i[c])(o),n!==void 0&&e.finished.finally(n);xd&3&&uf(),Tf(t),a=t.pendingLanes,r&261930&&a&42?t===kd?Od++:(Od=0,kd=t):(Od=0,kd=null),Ef(0,!1)}}function lf(e,t){(e.pooledCacheLanes&=t)===0&&(t=e.pooledCache,t!=null&&(e.pooledCache=null,ja(t)))}function uf(){return Td!==null&&(Td.skipTransition(),Td=null),of(),sf(),cf(),df()}function df(){if(vd!==5)return!1;var e=yd,t=Sd;Sd=0;var n=bt(xd),r=A.T,a=j.p;try{j.p=32>n?32:n,A.T=null,n=Cd,Cd=null;var o=yd,s=xd;if(vd=0,bd=yd=null,xd=0,J&6)throw Error(i(331));var c=J;if(J|=4,qu(o.current),zu(o,o.current,s,n),J=c,Ef(0,!1),P&&typeof P.onPostCommitFiberRoot==`function`)try{P.onPostCommitFiberRoot(et,o)}catch{}return!0}finally{j.p=a,A.T=r,lf(e,t)}}function ff(e,t,n){t=Bi(n,t),t=Ec(e.stateNode,t,2),e=go(e,t,2),e!==null&&(mt(e,2),Tf(e))}function Q(e,t,n){if(e.tag===3)ff(e,e,n);else for(;t!==null;){if(t.tag===3){ff(t,e,n);break}if(t.tag===1){var r=t.stateNode;if(typeof t.type.getDerivedStateFromError==`function`||typeof r.componentDidCatch==`function`&&(_d===null||!_d.has(r))){e=Bi(n,e),n=Dc(2),r=go(t,n,2),r!==null&&(Oc(n,r,t,e),mt(r,2),Tf(r));break}}t=t.return}}function pf(e,t,n){var r=e.pingCache;if(r===null){r=e.pingCache=new Zu;var i=new Set;r.set(t,i)}else i=r.get(t),i===void 0&&(i=new Set,r.set(t,i));i.has(n)||(nd=!0,i.add(n),e=mf.bind(null,e,t,n),t.then(e,e))}function mf(e,t,n){var r=e.pingCache;r!==null&&r.delete(t),e.pingedLanes|=e.suspendedLanes&n,e.warmLanes&=~n,Qu===e&&(X&n)===n&&(id===4||id===3&&(X&62914560)===X&&300>Ge()-pd?J&2?sd|=n:Bd(e,0):sd|=n,ld===X&&(ld=0)),Tf(e)}function hf(e,t){t===0&&(t=ft()),e=Ti(e,t),e!==null&&(mt(e,t),Tf(e))}function gf(e){var t=e.memoizedState,n=0;t!==null&&(n=t.retryLane),hf(e,n)}function _f(e,t){var n=0;switch(e.tag){case 31:case 13:var r=e.stateNode,a=e.memoizedState;a!==null&&(n=a.retryLane);break;case 19:r=e.stateNode;break;case 22:r=e.stateNode._retryCache;break;default:throw Error(i(314))}r!==null&&r.delete(t),hf(e,n)}function vf(e,t){return Ve(e,t)}var yf=null,bf=null,xf=!1,Sf=!1,Cf=!1,wf=0;function Tf(e){e!==bf&&e.next===null&&(bf===null?yf=bf=e:bf=bf.next=e),Sf=!0,xf||(xf=!0,Mf())}function Ef(e,t){if(!Cf&&Sf){Cf=!0;do for(var n=!1,r=yf;r!==null;){if(!t){if(e!==0){var i=r.pendingLanes;if(i===0)var a=0;else{var o=r.suspendedLanes,s=r.pingedLanes;a=(1<<31-nt(42|e)+1)-1,a&=i&~(o&~s),a=a&201326741?a&201326741|1:a?a|2:0}a!==0&&(n=!0,jf(r,a))}else a=X,a=F(r,r===Qu?a:0,r.cancelPendingCommit!==null||r.timeoutHandle!==-1),!(a&3)||ut(r,a)||(n=!0,jf(r,a))}r=r.next}while(n);Cf=!1}}function Df(){Of()}function Of(){Sf=xf=!1;var e=0;wf!==0&&hp()&&(e=wf);for(var t=Ge(),n=null,r=yf;r!==null;){var i=r.next,a=kf(r,t);a===0?(r.next=null,n===null?yf=i:n.next=i,i===null&&(bf=n)):(n=r,(e!==0||a&3)&&(Sf=!0)),r=i}vd!==0&&vd!==5||Ef(e,!1),wf!==0&&(wf=0)}function kf(e,t){for(var n=e.suspendedLanes,r=e.pingedLanes,i=e.expirationTimes,a=e.pendingLanes&-62914561;0<a;){var o=31-nt(a),s=1<<o,c=i[o];c===-1?((s&n)===0||(s&r)!==0)&&(i[o]=dt(s,t)):c<=t&&(e.expiredLanes|=s),a&=~s}if(t=Qu,n=X,n=F(e,e===t?n:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r=e.callbackNode,n===0||e===t&&(Z===2||Z===9)||e.cancelPendingCommit!==null)return r!==null&&r!==null&&He(r),e.callbackNode=null,e.callbackPriority=0;if(!(n&3)||ut(e,n)){if(t=n&-n,t===e.callbackPriority)return t;switch(r!==null&&He(r),bt(n)){case 2:case 8:n=Je;break;case 32:n=Ye;break;case 268435456:n=Ze;break;default:n=Ye}return r=Af.bind(null,e),n=Ve(n,r),e.callbackPriority=t,e.callbackNode=n,t}return r!==null&&r!==null&&He(r),e.callbackPriority=2,e.callbackNode=null,2}function Af(e,t){if(vd!==0&&vd!==5)return e.callbackNode=null,e.callbackPriority=0,null;var n=e.callbackNode;if(uf()&&e.callbackNode!==n)return null;var r=X;return r=F(e,e===Qu?r:0,e.cancelPendingCommit!==null||e.timeoutHandle!==-1),r===0?null:(Pd(e,r,t),kf(e,Ge()),e.callbackNode!=null&&e.callbackNode===n?Af.bind(null,e):null)}function jf(e,t){if(uf())return null;Pd(e,t,!0)}function Mf(){bp(function(){J&6?Ve(qe,Df):Of()})}function Nf(){if(wf===0){var e=La;e===0&&(e=ot,ot<<=1,!(ot&261888)&&(ot=256)),wf=e}return wf}function Pf(e){return e==null||typeof e==`symbol`||typeof e==`boolean`?null:typeof e==`function`?e:vn(e)}function Ff(e,t,n,r,i){if(t===`submit`&&n&&n.stateNode===i){var a=Pf((i[Tt]||null).action),o=r.submitter;o&&(t=(t=o[Tt]||null)?Pf(t.formAction):o.getAttribute(`formAction`),t!==null&&(a=t,o=null));var s=new Bn(`action`,`action`,null,r,i);e.push({event:s,listeners:[{instance:null,listener:function(){if(r.defaultPrevented){if(wf!==0){var e=new FormData(i,o);Qs(n,{pending:!0,data:e,method:i.method,action:a},null,e)}}else typeof a==`function`&&(s.preventDefault(),e=new FormData(i,o),Qs(n,{pending:!0,data:e,method:i.method,action:a},a,e))},currentTarget:i}]})}}for(var If=0;If<pi.length;If++){var Lf=pi[If];mi(Lf.toLowerCase(),`on`+(Lf[0].toUpperCase()+Lf.slice(1)))}mi(oi,`onAnimationEnd`),mi(si,`onAnimationIteration`),mi(ci,`onAnimationStart`),mi(`dblclick`,`onDoubleClick`),mi(`focusin`,`onFocus`),mi(`focusout`,`onBlur`),mi(li,`onTransitionRun`),mi(ui,`onTransitionStart`),mi(di,`onTransitionCancel`),mi(B,`onTransitionEnd`),Ut(`onMouseEnter`,[`mouseout`,`mouseover`]),Ut(`onMouseLeave`,[`mouseout`,`mouseover`]),Ut(`onPointerEnter`,[`pointerout`,`pointerover`]),Ut(`onPointerLeave`,[`pointerout`,`pointerover`]),Ht(`onChange`,`change click focusin focusout input keydown keyup selectionchange`.split(` `)),Ht(`onSelect`,`focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange`.split(` `)),Ht(`onBeforeInput`,[`compositionend`,`keypress`,`textInput`,`paste`]),Ht(`onCompositionEnd`,`compositionend focusout keydown keypress keyup mousedown`.split(` `)),Ht(`onCompositionStart`,`compositionstart focusout keydown keypress keyup mousedown`.split(` `)),Ht(`onCompositionUpdate`,`compositionupdate focusout keydown keypress keyup mousedown`.split(` `));var Rf=`abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting`.split(` `),zf=new Set(`beforetoggle cancel close invalid load scroll scrollend toggle`.split(` `).concat(Rf));function Bf(e,t){t=!!(t&4);for(var n=0;n<e.length;n++){var r=e[n],i=r.event;r=r.listeners;a:{var a=void 0;if(t)for(var o=r.length-1;0<=o;o--){var s=r[o],c=s.instance,l=s.currentTarget;if(s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){yi(e)}i.currentTarget=null,a=c}else for(o=0;o<r.length;o++){if(s=r[o],c=s.instance,l=s.currentTarget,s=s.listener,c!==a&&i.isPropagationStopped())break a;a=s,i.currentTarget=l;try{a(i)}catch(e){yi(e)}i.currentTarget=null,a=c}}}}function $(e,t){var n=t[Dt];n===void 0&&(n=t[Dt]=new Set);var r=e+`__bubble`;n.has(r)||(Wf(t,e,2,!1),n.add(r))}function Vf(e,t,n){var r=0;t&&(r|=4),Wf(n,e,r,t)}var Hf=`_reactListening`+Math.random().toString(36).slice(2);function Uf(e){if(!e[Hf]){e[Hf]=!0,Bt.forEach(function(t){t!==`selectionchange`&&(zf.has(t)||Vf(t,!1,e),Vf(t,!0,e))});var t=e.nodeType===9?e:e.ownerDocument;t===null||t[Hf]||(t[Hf]=!0,Vf(`selectionchange`,!1,t))}}function Wf(e,t,n,r){switch(Ch(t)){case 2:var i=_h;break;case 8:i=vh;break;default:i=yh}n=i.bind(null,t,n,e),i=void 0,!kn||t!==`touchstart`&&t!==`touchmove`&&t!==`wheel`||(i=!0),r?i===void 0?e.addEventListener(t,n,!0):e.addEventListener(t,n,{capture:!0,passive:i}):i===void 0?e.addEventListener(t,n,!1):e.addEventListener(t,n,{passive:i})}function Gf(e,t,n,r,i){var a=r;if(!(t&1)&&!(t&2)&&r!==null)a:for(;;){if(r===null)return;var s=r.tag;if(s===3||s===4){var c=r.stateNode.containerInfo;if(c===i)break;if(s===4)for(s=r.return;s!==null;){var l=s.tag;if((l===3||l===4)&&s.stateNode.containerInfo===i)return;s=s.return}for(;c!==null;){if(s=Pt(c),s===null)return;if(l=s.tag,l===5||l===6||l===26||l===27){r=a=s;continue a}c=c.parentNode}}r=r.return}En(function(){var r=a,i=xn(n),s=[];a:{var c=fi.get(e);if(c!==void 0){var l=Bn,u=e;switch(e){case`keypress`:if(Fn(n)===0)break a;case`keydown`:case`keyup`:l=ir;break;case`focusin`:u=`focus`,l=Yn;break;case`focusout`:u=`blur`,l=Yn;break;case`beforeblur`:case`afterblur`:l=Yn;break;case`click`:if(n.button===2)break a;case`auxclick`:case`dblclick`:case`mousedown`:case`mousemove`:case`mouseup`:case`mouseout`:case`mouseover`:case`contextmenu`:l=qn;break;case`drag`:case`dragend`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`dragstart`:case`drop`:l=Jn;break;case`touchcancel`:case`touchend`:case`touchmove`:case`touchstart`:l=sr;break;case oi:case si:case ci:l=Xn;break;case B:l=cr;break;case`scroll`:case`scrollend`:l=Hn;break;case`wheel`:l=lr;break;case`copy`:case`cut`:case`paste`:l=Zn;break;case`gotpointercapture`:case`lostpointercapture`:case`pointercancel`:case`pointerdown`:case`pointermove`:case`pointerout`:case`pointerover`:case`pointerup`:l=ar;break;case`submit`:l=or;break;case`toggle`:case`beforetoggle`:l=ur}var d=!!(t&4),f=!d&&(e===`scroll`||e===`scrollend`),p=d?c===null?null:c+`Capture`:c;d=[];for(var m=r,h;m!==null;){var g=m;if(h=g.stateNode,g=g.tag,g!==5&&g!==26&&g!==27||h===null||p===null||(g=Dn(m,p),g!=null&&d.push(Kf(m,g,h))),f)break;m=m.return}0<d.length&&(c=new l(c,u,null,n,i),s.push({event:c,listeners:d}))}}if(!(t&7)){a:{if(l=e===`mouseover`||e===`pointerover`,c=e===`mouseout`||e===`pointerout`,l&&n!==bn&&(u=n.relatedTarget||n.fromElement)&&(Pt(u)||u[Et]))break a;(c||l)&&(u=i.window===i?i:(l=i.ownerDocument)?l.defaultView||l.parentWindow:window,c?(l=n.relatedTarget||n.toElement,c=r,l=l?Pt(l):null,l!==null&&(f=o(l),d=l.tag,l!==f||d!==5&&d!==27&&d!==6)&&(l=null)):(c=null,l=r),c!==l&&(d=qn,g=`onMouseLeave`,p=`onMouseEnter`,m=`mouse`,(e===`pointerout`||e===`pointerover`)&&(d=ar,g=`onPointerLeave`,p=`onPointerEnter`,m=`pointer`),f=c==null?u:It(c),h=l==null?u:It(l),u=new d(g,m+`leave`,c,n,i),u.target=f,u.relatedTarget=h,g=null,Pt(i)===r&&(d=new d(p,m+`enter`,l,n,i),d.target=h,d.relatedTarget=f,g=d),f=g,d=c&&l?te(c,l,Jf):null,c!==null&&Yf(s,u,c,d,!1),l!==null&&f!==null&&Yf(s,f,l,d,!0)))}a:{if(c=r?It(r):window,l=c.nodeName&&c.nodeName.toLowerCase(),l===`select`||l===`input`&&c.type===`file`)var _=Ar;else if(wr(c)){if(jr)_=Br;else{_=Rr;var v=Lr}}else l=c.nodeName,!l||l.toLowerCase()!==`input`||c.type!==`checkbox`&&c.type!==`radio`?r&&hn(r.elementType)&&(_=Ar):_=zr;if(_&&=_(e,r)){Tr(s,_,n,i);break a}v&&v(e,c,r)}switch(v=r?It(r):window,e){case`focusin`:(wr(v)||v.contentEditable===`true`)&&(Xr=v,Zr=r,Qr=null);break;case`focusout`:Qr=Zr=Xr=null;break;case`mousedown`:$r=!0;break;case`contextmenu`:case`mouseup`:case`dragend`:$r=!1,ei(s,n,i);break;case`selectionchange`:if(Yr)break;case`keydown`:case`keyup`:ei(s,n,i)}var y;if(fr)b:{switch(e){case`compositionstart`:var b=`onCompositionStart`;break b;case`compositionend`:b=`onCompositionEnd`;break b;case`compositionupdate`:b=`onCompositionUpdate`;break b}b=void 0}else br?vr(e,n)&&(b=`onCompositionEnd`):e===`keydown`&&n.keyCode===229&&(b=`onCompositionStart`);b&&(hr&&n.locale!==`ko`&&(br||b!==`onCompositionStart`?b===`onCompositionEnd`&&br&&(y=Pn()):(jn=i,Mn=`value`in jn?jn.value:jn.textContent,br=!0)),v=qf(r,b),0<v.length&&(b=new Qn(b,e,null,n,i),s.push({event:b,listeners:v}),y?b.data=y:(y=yr(n),y!==null&&(b.data=y)))),(y=mr?xr(e,n):Sr(e,n))&&(b=qf(r,`onBeforeInput`),0<b.length&&(v=new Qn(`onBeforeInput`,`beforeinput`,null,n,i),s.push({event:v,listeners:b}),v.data=y)),Ff(s,e,r,n,i)}Bf(s,t)})}function Kf(e,t,n){return{instance:e,listener:t,currentTarget:n}}function qf(e,t){for(var n=t+`Capture`,r=[];e!==null;){var i=e,a=i.stateNode;if(i=i.tag,i!==5&&i!==26&&i!==27||a===null||(i=Dn(e,n),i!=null&&r.unshift(Kf(e,i,a)),i=Dn(e,t),i!=null&&r.push(Kf(e,i,a))),e.tag===3)return r;e=e.return}return[]}function Jf(e){if(e===null)return null;do e=e.return;while(e&&e.tag!==5&&e.tag!==27);return e||null}function Yf(e,t,n,r,i){for(var a=t._reactName,o=[];n!==null&&n!==r;){var s=n,c=s.alternate,l=s.stateNode;if(s=s.tag,c!==null&&c===r)break;s!==5&&s!==26&&s!==27||l===null||(c=l,i?(l=Dn(n,a),l!=null&&o.unshift(Kf(n,l,c))):i||(l=Dn(n,a),l!=null&&o.push(Kf(n,l,c)))),n=n.return}o.length!==0&&e.push({event:t,listeners:o})}var Xf=/\r\n?/g,Zf=/\u0000|\uFFFD/g;function Qf(e){return(typeof e==`string`?e:``+e).replace(Xf,`
`).replace(Zf,``)}function $f(e,t){return t=Qf(t),Qf(e)===t}function ep(e,t,n,r,a,o){switch(n){case`children`:if(typeof r==`string`)t===`body`||t===`textarea`&&r===``||dn(e,r);else if(typeof r==`number`||typeof r==`bigint`)t!==`body`&&dn(e,``+r);else return;break;case`className`:Xt(e,`class`,r);break;case`tabIndex`:Xt(e,`tabindex`,r);break;case`dir`:case`role`:case`viewBox`:case`width`:case`height`:Xt(e,n,r);break;case`style`:mn(e,r,o);return;case`data`:if(t!==`object`){Xt(e,`data`,r);break}case`src`:case`href`:if(r===``&&(t!==`a`||n!==`href`)||r==null||typeof r==`function`||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=vn(r),e.setAttribute(n,r);break;case`action`:case`formAction`:if(typeof r==`function`){e.setAttribute(n,`javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')`);break}if(typeof o==`function`&&(n===`formAction`?(t!==`input`&&ep(e,t,`name`,a.name,a,null),ep(e,t,`formEncType`,a.formEncType,a,null),ep(e,t,`formMethod`,a.formMethod,a,null),ep(e,t,`formTarget`,a.formTarget,a,null)):(ep(e,t,`encType`,a.encType,a,null),ep(e,t,`method`,a.method,a,null),ep(e,t,`target`,a.target,a,null))),r==null||typeof r==`symbol`||typeof r==`boolean`){e.removeAttribute(n);break}r=vn(r),e.setAttribute(n,r);break;case`onClick`:r!=null&&(e.onclick=yn);return;case`onScroll`:r!=null&&$(`scroll`,e);return;case`onScrollEnd`:r!=null&&$(`scrollend`,e);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`multiple`:e.multiple=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`muted`:e.muted=r&&typeof r!=`function`&&typeof r!=`symbol`;break;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`defaultValue`:case`defaultChecked`:case`innerHTML`:case`ref`:break;case`autoFocus`:break;case`xlinkHref`:if(r==null||typeof r==`function`||typeof r==`boolean`||typeof r==`symbol`){e.removeAttribute(`xlink:href`);break}n=vn(r),e.setAttributeNS(`http://www.w3.org/1999/xlink`,`xlink:href`,n);break;case`contentEditable`:case`spellCheck`:case`draggable`:case`value`:case`autoReverse`:case`externalResourcesRequired`:case`focusable`:case`preserveAlpha`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`inert`:case`allowFullScreen`:case`async`:case`autoPlay`:case`controls`:case`credentialless`:case`default`:case`defer`:case`disabled`:case`disablePictureInPicture`:case`disableRemotePlayback`:case`formNoValidate`:case`hidden`:case`loop`:case`noModule`:case`noValidate`:case`open`:case`playsInline`:case`readOnly`:case`required`:case`reversed`:case`scoped`:case`seamless`:case`itemScope`:r&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,``):e.removeAttribute(n);break;case`capture`:case`download`:!0===r?e.setAttribute(n,``):!1!==r&&r!=null&&typeof r!=`function`&&typeof r!=`symbol`?e.setAttribute(n,r):e.removeAttribute(n);break;case`cols`:case`rows`:case`size`:case`span`:r!=null&&typeof r!=`function`&&typeof r!=`symbol`&&!isNaN(r)&&1<=r?e.setAttribute(n,r):e.removeAttribute(n);break;case`rowSpan`:case`start`:r==null||typeof r==`function`||typeof r==`symbol`||isNaN(r)?e.removeAttribute(n):e.setAttribute(n,r);break;case`popover`:$(`beforetoggle`,e),$(`toggle`,e),Yt(e,`popover`,r);break;case`xlinkActuate`:Zt(e,`http://www.w3.org/1999/xlink`,`xlink:actuate`,r);break;case`xlinkArcrole`:Zt(e,`http://www.w3.org/1999/xlink`,`xlink:arcrole`,r);break;case`xlinkRole`:Zt(e,`http://www.w3.org/1999/xlink`,`xlink:role`,r);break;case`xlinkShow`:Zt(e,`http://www.w3.org/1999/xlink`,`xlink:show`,r);break;case`xlinkTitle`:Zt(e,`http://www.w3.org/1999/xlink`,`xlink:title`,r);break;case`xlinkType`:Zt(e,`http://www.w3.org/1999/xlink`,`xlink:type`,r);break;case`xmlBase`:Zt(e,`http://www.w3.org/XML/1998/namespace`,`xml:base`,r);break;case`xmlLang`:Zt(e,`http://www.w3.org/XML/1998/namespace`,`xml:lang`,r);break;case`xmlSpace`:Zt(e,`http://www.w3.org/XML/1998/namespace`,`xml:space`,r);break;case`is`:Yt(e,`is`,r);break;case`innerText`:case`textContent`:return;default:if(!(2<n.length)||n[0]!==`o`&&n[0]!==`O`||n[1]!==`n`&&n[1]!==`N`)n=gn.get(n)||n,Yt(e,n,r);else return}L=!0}function tp(e,t,n,r,a,o){switch(n){case`style`:mn(e,r,o);return;case`dangerouslySetInnerHTML`:if(r!=null){if(typeof r!=`object`||!(`__html`in r))throw Error(i(61));if(n=r.__html,n!=null){if(a.children!=null)throw Error(i(60));o?.__html!==n&&(e.innerHTML=n)}}break;case`children`:if(typeof r==`string`)dn(e,r);else if(typeof r==`number`||typeof r==`bigint`)dn(e,``+r);else return;break;case`onScroll`:r!=null&&$(`scroll`,e);return;case`onScrollEnd`:r!=null&&$(`scrollend`,e);return;case`onClick`:r!=null&&(e.onclick=yn);return;case`suppressContentEditableWarning`:case`suppressHydrationWarning`:case`innerHTML`:case`ref`:return;case`innerText`:case`textContent`:return;default:if(!Vt.hasOwnProperty(n))a:{if(n[0]===`o`&&n[1]===`n`&&(a=n.endsWith(`Capture`),o=n.slice(2,a?n.length-7:void 0),t=e[Tt]||null,t=t==null?null:t[n],typeof t==`function`&&e.removeEventListener(o,t,a),typeof r==`function`)){typeof t!=`function`&&t!==null&&(n in e?e[n]=null:e.hasAttribute(n)&&e.removeAttribute(n)),e.addEventListener(o,r,a);break a}L=!0,n in e?e[n]=r:!0===r?e.setAttribute(n,``):Yt(e,n,r)}return}L=!0}function np(e,t,n){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`img`:$(`error`,e),$(`load`,e);var r=!1,a=!1,o;for(o in n)if(n.hasOwnProperty(o)){var s=n[o];if(s!=null)switch(o){case`src`:r=!0;break;case`srcSet`:a=!0;break;case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:ep(e,t,o,s,n,null)}}a&&ep(e,t,`srcSet`,n.srcSet,n,null),r&&ep(e,t,`src`,n.src,n,null);return;case`input`:$(`invalid`,e);var c=o=s=a=null,l=null,u=null;for(r in n)if(n.hasOwnProperty(r)){var d=n[r];if(d!=null)switch(r){case`name`:a=d;break;case`type`:s=d;break;case`checked`:l=d;break;case`defaultChecked`:u=d;break;case`value`:o=d;break;case`defaultValue`:c=d;break;case`children`:case`dangerouslySetInnerHTML`:if(d!=null)throw Error(i(137,t));break;default:ep(e,t,r,d,n,null)}}on(e,o,c,l,u,s,a,!1);return;case`select`:for(a in $(`invalid`,e),r=s=o=null,n)if(n.hasOwnProperty(a)&&(c=n[a],c!=null))switch(a){case`value`:o=c;break;case`defaultValue`:s=c;break;case`multiple`:r=c;default:ep(e,t,a,c,n,null)}t=o,n=s,e.multiple=!!r,t==null?n!=null&&cn(e,!!r,n,!0):cn(e,!!r,t,!1);return;case`textarea`:for(s in $(`invalid`,e),o=a=r=null,n)if(n.hasOwnProperty(s)&&(c=n[s],c!=null))switch(s){case`value`:r=c;break;case`defaultValue`:a=c;break;case`children`:o=c;break;case`dangerouslySetInnerHTML`:if(c!=null)throw Error(i(91));break;default:ep(e,t,s,c,n,null)}un(e,r,a,o);return;case`option`:for(l in n)if(n.hasOwnProperty(l)&&(r=n[l],r!=null))switch(l){case`selected`:e.selected=r&&typeof r!=`function`&&typeof r!=`symbol`;break;default:ep(e,t,l,r,n,null)}return;case`dialog`:$(`beforetoggle`,e),$(`toggle`,e),$(`cancel`,e),$(`close`,e);break;case`iframe`:case`object`:$(`load`,e);break;case`video`:case`audio`:for(r=0;r<Rf.length;r++)$(Rf[r],e);break;case`image`:$(`error`,e),$(`load`,e);break;case`details`:$(`toggle`,e);break;case`embed`:case`source`:case`link`:$(`error`,e),$(`load`,e);case`area`:case`base`:case`br`:case`col`:case`hr`:case`keygen`:case`meta`:case`param`:case`track`:case`wbr`:case`menuitem`:for(u in n)if(n.hasOwnProperty(u)&&(r=n[u],r!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:throw Error(i(137,t));default:ep(e,t,u,r,n,null)}return;default:if(hn(t)){for(d in n)n.hasOwnProperty(d)&&(r=n[d],r!==void 0&&tp(e,t,d,r,n,void 0));return}}for(c in n)n.hasOwnProperty(c)&&(r=n[c],r!=null&&ep(e,t,c,r,n,null))}var rp={};function ip(e,t,n,r){switch(t){case`div`:case`span`:case`svg`:case`path`:case`a`:case`g`:case`p`:case`li`:break;case`input`:var a=null,o=null,s=null,c=null,l=null,u=null,d=null;for(m in n){var f=n[m];if(n.hasOwnProperty(m)&&f!=null)switch(m){case`checked`:break;case`value`:break;case`defaultValue`:l=f;default:r.hasOwnProperty(m)||ep(e,t,m,null,r,f)}}for(var p in r){var m=r[p];if(f=n[p],r.hasOwnProperty(p)&&(m!=null||f!=null))switch(p){case`type`:m!==f&&(L=!0),o=m;break;case`name`:m!==f&&(L=!0),a=m;break;case`checked`:m!==f&&(L=!0),u=m;break;case`defaultChecked`:m!==f&&(L=!0),d=m;break;case`value`:m!==f&&(L=!0),s=m;break;case`defaultValue`:m!==f&&(L=!0),c=m;break;case`children`:case`dangerouslySetInnerHTML`:if(m!=null)throw Error(i(137,t));break;default:m!==f&&ep(e,t,p,m,r,f)}}an(e,s,c,l,u,d,o,a);return;case`select`:for(o in m=s=c=p=null,n)if(l=n[o],n.hasOwnProperty(o)&&l!=null)switch(o){case`value`:break;case`multiple`:m=l;default:r.hasOwnProperty(o)||ep(e,t,o,null,r,l)}for(a in r)if(o=r[a],l=n[a],r.hasOwnProperty(a)&&(o!=null||l!=null))switch(a){case`value`:o!==l&&(L=!0),p=o;break;case`defaultValue`:o!==l&&(L=!0),c=o;break;case`multiple`:o!==l&&(L=!0),s=o;default:o!==l&&ep(e,t,a,o,r,l)}t=c,n=s,r=m,p==null?!!r!=!!n&&(t==null?cn(e,!!n,n?[]:``,!1):cn(e,!!n,t,!0)):cn(e,!!n,p,!1);return;case`textarea`:for(c in m=p=null,n)if(a=n[c],n.hasOwnProperty(c)&&a!=null&&!r.hasOwnProperty(c))switch(c){case`value`:break;case`children`:break;default:ep(e,t,c,null,r,a)}for(s in r)if(a=r[s],o=n[s],r.hasOwnProperty(s)&&(a!=null||o!=null))switch(s){case`value`:a!==o&&(L=!0),p=a;break;case`defaultValue`:a!==o&&(L=!0),m=a;break;case`children`:break;case`dangerouslySetInnerHTML`:if(a!=null)throw Error(i(91));break;default:a!==o&&ep(e,t,s,a,r,o)}ln(e,p,m);return;case`option`:for(var h in n)if(p=n[h],n.hasOwnProperty(h)&&p!=null&&!r.hasOwnProperty(h))switch(h){case`selected`:e.selected=!1;break;default:ep(e,t,h,null,r,p)}for(l in r)if(p=r[l],m=n[l],r.hasOwnProperty(l)&&p!==m&&(p!=null||m!=null))switch(l){case`selected`:p!==m&&(L=!0),e.selected=p&&typeof p!=`function`&&typeof p!=`symbol`;break;default:ep(e,t,l,p,r,m)}return;case`img`:case`link`:case`area`:case`base`:case`br`:case`col`:case`embed`:case`hr`:case`keygen`:case`meta`:case`param`:case`source`:case`track`:case`wbr`:case`menuitem`:for(var g in n)p=n[g],n.hasOwnProperty(g)&&p!=null&&!r.hasOwnProperty(g)&&ep(e,t,g,null,r,p);for(u in r)if(p=r[u],m=n[u],r.hasOwnProperty(u)&&p!==m&&(p!=null||m!=null))switch(u){case`children`:case`dangerouslySetInnerHTML`:if(p!=null)throw Error(i(137,t));break;default:ep(e,t,u,p,r,m)}return;default:if(hn(t)){for(var _ in n)p=n[_],n.hasOwnProperty(_)&&p!==void 0&&!r.hasOwnProperty(_)&&tp(e,t,_,void 0,r,p);for(d in r)p=r[d],m=n[d],!r.hasOwnProperty(d)||p===m||p===void 0&&m===void 0||tp(e,t,d,p,r,m);return}}for(var v in n)p=n[v],n.hasOwnProperty(v)&&p!=null&&!r.hasOwnProperty(v)&&ep(e,t,v,null,r,p);for(f in r)p=r[f],m=n[f],!r.hasOwnProperty(f)||p===m||p==null&&m==null||ep(e,t,f,p,r,m)}function ap(e){switch(e){case`css`:case`script`:case`font`:case`img`:case`image`:case`input`:case`link`:return!0;default:return!1}}function op(){if(typeof performance.getEntriesByType==`function`){for(var e=0,t=0,n=performance.getEntriesByType(`resource`),r=0;r<n.length;r++){var i=n[r],a=i.transferSize,o=i.initiatorType,s=i.duration;if(a&&s&&ap(o)){for(o=0,s=i.responseEnd,r+=1;r<n.length;r++){var c=n[r],l=c.startTime;if(l>s)break;var u=c.transferSize,d=c.initiatorType;u&&ap(d)&&(c=c.responseEnd,o+=u*(c<s?1:(s-l)/(c-l)))}if(--r,t+=8*(a+o)/(i.duration/1e3),e++,10<e)break}}if(0<e)return t/e/1e6}return navigator.connection&&(e=navigator.connection.downlink,typeof e==`number`)?e:5}var sp=null,cp=null;function lp(e){return e.nodeType===9?e:e.ownerDocument}function up(e){switch(e){case`http://www.w3.org/2000/svg`:return 1;case`http://www.w3.org/1998/Math/MathML`:return 2;default:return 0}}function dp(e,t){if(e===0)switch(t){case`svg`:return 1;case`math`:return 2;default:return 0}return e===1&&t===`foreignObject`?0:e}function fp(e,t,n,r){return n=lp(n).createElement(e),n[wt]=r,n[Tt]=t,np(n,e,t),Rt(n),n}function pp(e,t){return e===`textarea`||e===`noscript`||typeof t.children==`string`||typeof t.children==`number`||typeof t.children==`bigint`||typeof t.dangerouslySetInnerHTML==`object`&&t.dangerouslySetInnerHTML!==null&&t.dangerouslySetInnerHTML.__html!=null}var mp=null;function hp(){var e=window.event;return e&&e.type===`popstate`?e!==mp&&(mp=e,!0):(mp=null,!1)}var gp=typeof setTimeout==`function`?setTimeout:void 0,_p=typeof clearTimeout==`function`?clearTimeout:void 0,vp=typeof Promise==`function`?Promise:void 0,yp=typeof requestAnimationFrame==`function`?requestAnimationFrame:gp,bp=typeof queueMicrotask==`function`?queueMicrotask:vp===void 0?gp:function(e){return vp.resolve(null).then(e).catch(xp)};function xp(e){setTimeout(function(){throw e})}function Sp(e){return e===`head`}function Cp(e,t){var n=t,r=0;do{var i=n.nextSibling;if(e.removeChild(n),i&&i.nodeType===8){if(n=i.data,n===`/$`||n===`/&`){if(r===0){e.removeChild(i),Hh(t);return}r--}else if(n===`$`||n===`$?`||n===`$~`||n===`$!`||n===`&`)r++;else if(n===`html`)_m(e.ownerDocument.documentElement);else if(n===`head`){n=e.ownerDocument.head,_m(n);for(var a=n.firstChild;a;){var o=a.nextSibling,s=a.nodeName;a[jt]||s===`SCRIPT`||s===`STYLE`||s===`LINK`&&a.rel.toLowerCase()===`stylesheet`||n.removeChild(a),a=o}}else n===`body`&&_m(e.ownerDocument.body)}n=i}while(n);Hh(t)}function wp(e,t){var n=e;e=0;do{var r=n.nextSibling;if(n.nodeType===1?t?(n._stashedDisplay=n.style.display,n.style.display=`none`):(n.style.display=n._stashedDisplay||``,n.getAttribute(`style`)===``&&n.removeAttribute(`style`)):n.nodeType===3&&(t?(n._stashedText=n.nodeValue,n.nodeValue=``):n.nodeValue=n._stashedText||``),r&&r.nodeType===8){if(n=r.data,n===`/$`){if(e===0)break;e--}else n!==`$`&&n!==`$?`&&n!==`$~`&&n!==`$!`||e++}n=r}while(n)}function Tp(e,t,n){if(t=CSS.escape(t)===t?t:`r-`+btoa(t).replace(/=/g,``),e.style.viewTransitionName=t,n!=null&&(e.style.viewTransitionClass=n),n=getComputedStyle(e),n.display===`inline`){if(t=e.getClientRects(),t.length===1)var r=1;else for(var i=r=0;i<t.length;i++){var a=t[i];0<a.width&&0<a.height&&r++}r===1&&(e=e.style,e.display=t.length===1?`inline-block`:`block`,e.marginTop=`-`+n.paddingTop,e.marginBottom=`-`+n.paddingBottom)}}function Ep(e,t){e=e.style,t=t.style;var n=t==null?null:t.hasOwnProperty(`viewTransitionName`)?t.viewTransitionName:t.hasOwnProperty(`view-transition-name`)?t[`view-transition-name`]:null;e.viewTransitionName=n==null||typeof n==`boolean`?``:(``+n).trim(),n=t==null?null:t.hasOwnProperty(`viewTransitionClass`)?t.viewTransitionClass:t.hasOwnProperty(`view-transition-class`)?t[`view-transition-class`]:null,e.viewTransitionClass=n==null||typeof n==`boolean`?``:(``+n).trim(),e.display===`inline-block`&&(t==null?e.display=e.margin=``:(n=t.display,e.display=n==null||typeof n==`boolean`?``:n,n=t.margin,n==null?(n=t.hasOwnProperty(`marginTop`)?t.marginTop:t[`margin-top`],e.marginTop=n==null||typeof n==`boolean`?``:n,t=t.hasOwnProperty(`marginBottom`)?t.marginBottom:t[`margin-bottom`],e.marginBottom=t==null||typeof t==`boolean`?``:t):e.margin=n))}function Dp(e,t,n){return n=n.ownerDocument.defaultView,{rect:e,abs:t.position===`absolute`||t.position===`fixed`,clip:t.clipPath!==`none`||t.overflow!==`visible`||t.filter!==`none`||t.mask!==`none`||t.mask!==`none`||t.borderRadius!==`0px`,view:0<=e.bottom&&0<=e.right&&e.top<=n.innerHeight&&e.left<=n.innerWidth}}function Op(e){return Dp(e.getBoundingClientRect(),getComputedStyle(e),e)}function kp(e){var t=e.getBoundingClientRect();t=new DOMRect(t.x+2e4,t.y+2e4,t.width,t.height);var n=getComputedStyle(e);return Dp(t,n,e)}function Ap(e){return e.documentElement.clientHeight}function jp(e){this.addEventListener(`load`,e),this.addEventListener(`error`,e)}function Mp(e,t,n,r,i,a,o,s,c){var l=t.nodeType===9?t:t.ownerDocument;try{var u=l.startViewTransition({update:function(){var t=l.defaultView,n=t.navigation&&t.navigation.transition,o=l.fonts.status;r();var s=[];if(o===`loaded`&&(Ap(l),l.fonts.status===`loading`&&s.push(l.fonts.ready)),o=s.length,e!==null)for(var c=e.suspenseyImages,u=0,d=0;d<c.length;d++){var f=c[d];if(!f.complete){var p=f.getBoundingClientRect();if(0<p.bottom&&0<p.right&&p.top<t.innerHeight&&p.left<t.innerWidth){if(u+=Xm(f),u>$m){s.length=o;break}f=new Promise(jp.bind(f)),s.push(f)}}}if(0<s.length)return t=Promise.race([Promise.all(s),new Promise(function(e){return setTimeout(e,500)})]).then(i,i),(n?Promise.allSettled([n.finished,t]):t).then(a,a);if(i(),n)return n.finished.then(a,a);a()},types:n});l.__reactViewTransition=u;var d=[];return u.ready.then(function(){for(var e=l.documentElement.getAnimations({subtree:!0}),t=0;t<e.length;t++){var n=e[t],r=n.effect,i=r.pseudoElement;if(i!=null&&i.startsWith(`::view-transition`)){d.push(n),n=r.getKeyframes();for(var a=i=void 0,s=!0,c=0;c<n.length;c++){var u=n[c],f=u.width;if(i===void 0)i=f;else if(i!==f){s=!1;break}if(f=u.height,a===void 0)a=f;else if(a!==f){s=!1;break}delete u.width,delete u.height,u.transform===`none`&&delete u.transform}s&&i!==void 0&&a!==void 0&&(r.setKeyframes(n),s=getComputedStyle(r.target,r.pseudoElement),s.width!==i||s.height!==a)&&(s=n[0],s.width=i,s.height=a,s=n[n.length-1],s.width=i,s.height=a,r.setKeyframes(n))}}o()},function(e){l.__reactViewTransition===u&&(l.__reactViewTransition=null);try{if(typeof e==`object`&&e)switch(e.name){case`InvalidStateError`:(e.message===`View transition was skipped because document visibility state is hidden.`||e.message===`Skipping view transition because document visibility state has become hidden.`||e.message===`Skipping view transition because viewport size changed.`||e.message===`Transition was aborted because of invalid state`)&&(e=null)}e!==null&&c(e)}finally{r(),i(),o()}}),u.finished.finally(function(){for(var e=0;e<d.length;e++)d[e].cancel();l.__reactViewTransition===u&&(l.__reactViewTransition=null),s()}),u}catch{return r(),i(),o(),null}}function Np(e,t){this._scope=document.documentElement,this._selector=`::view-transition-`+e+`(`+t+`)`}Np.prototype.animate=function(e,t){return t=typeof t==`number`?{duration:t}:T({},t),t.pseudoElement=this._selector,this._scope.animate(e,t)},Np.prototype.getAnimations=function(){for(var e=this._scope,t=this._selector,n=e.getAnimations({subtree:!0}),r=[],i=0;i<n.length;i++){var a=n[i].effect;a!==null&&a.target===e&&a.pseudoElement===t&&r.push(n[i])}return r},Np.prototype.getComputedStyle=function(){return getComputedStyle(this._scope,this._selector)};function Pp(e){return{name:e,group:new Np(`group`,e),imagePair:new Np(`image-pair`,e),old:new Np(`old`,e),new:new Np(`new`,e)}}function Fp(e){this._fragmentFiber=e,this._observers=this._eventListeners=null}Fp.prototype.addEventListener=function(e,t,n){var r=null,i=null;if(!(n!=null&&typeof n!=`boolean`&&(r=n.signal||null,r!==null&&r.aborted))){this._eventListeners===null&&(this._eventListeners=[]);var a=this._eventListeners;if(Bp(a,e,t,n)===-1){var o=this,s=t;n!=null&&typeof n!=`boolean`&&!0===n.once&&(s=function(r){o.removeEventListener(e,t,n),typeof t==`function`?t.call(this,r):t.handleEvent(r)}),r!==null&&(i=o.removeEventListener.bind(o,e,t,n),r.addEventListener(`abort`,i,{once:!0}),i=r.removeEventListener.bind(r,`abort`,i)),r=Rp(n),a.push({type:e,listener:t,optionsOrUseCapture:n,attachedListener:s,cleanup:i}),h(this._fragmentFiber.child,!1,Ip,e,s,r)}this._eventListeners=a}};function Ip(e,t,n,r){return b(e).addEventListener(t,n,r),!1}Fp.prototype.removeEventListener=function(e,t,n){var r=this._eventListeners;if(r!==null&&(t=Bp(r,e,t,n),t!==-1)){var i=r[t];n=i.attachedListener;var a=i.cleanup;i=Rp(i.optionsOrUseCapture),h(this._fragmentFiber.child,!1,Lp,e,n,i),r.splice(t,1),a!==null&&a()}};function Lp(e,t,n,r){return b(e).removeEventListener(t,n,r),!1}function Rp(e){return e!=null&&typeof e!=`boolean`&&(!0===e.once||e.signal instanceof AbortSignal)?{capture:e.capture,passive:e.passive}:e}function zp(e){return e==null?`c=0`:typeof e==`boolean`?`c=`+(e?`1`:`0`):`c=`+(e.capture?`1`:`0`)}function Bp(e,t,n,r){if(e.length===0)return-1;r=zp(r);for(var i=0;i<e.length;i++){var a=e[i];if(a.type===t&&a.listener===n&&zp(a.optionsOrUseCapture)===r)return i}return-1}Fp.prototype.dispatchEvent=function(e){var t=g(this._fragmentFiber);if(t===null)return!0;t=b(t);var n=this._eventListeners;if(n!==null&&0<n.length||!e.bubbles){var r=t.nodeType===9?t.createComment(``):document.createTextNode(``);if(n)for(var i=0;i<n.length;i++){var a=n[i];r.addEventListener(a.type,a.attachedListener,Rp(a.optionsOrUseCapture))}if(t.appendChild(r),e=r.dispatchEvent(e),n)for(i=0;i<n.length;i++)a=n[i],r.removeEventListener(a.type,a.attachedListener,Rp(a.optionsOrUseCapture));return t.removeChild(r),e}return t.dispatchEvent(e)},Fp.prototype.focus=function(e){h(this._fragmentFiber.child,!0,Vp,e,void 0,void 0)};function Vp(e,t){return e.tag!==6&&(e=b(e),pm(e,t))}Fp.prototype.focusLast=function(e){var t=[];h(this._fragmentFiber.child,!0,Hp,t,void 0,void 0);for(var n=t.length-1;0<=n&&!Vp(t[n],e);n--);};function Hp(e,t){return t.push(e),!1}Fp.prototype.blur=function(){var e=g(this._fragmentFiber);e!==null&&(e=b(e),e=lp(e).activeElement,e!==null&&h(this._fragmentFiber.child,!1,Up,e,void 0,void 0))};function Up(e,t){return e.tag!==6&&(e=b(e),e===t||e.contains(t)?(t.blur(),!0):!1)}Fp.prototype.observeUsing=function(e){this._observers===null&&(this._observers=new Set),this._observers.add(e),h(this._fragmentFiber.child,!1,Wp,e,void 0,void 0)};function Wp(e,t){return e.tag===6||(e=b(e),t.observe(e)),!1}Fp.prototype.unobserveUsing=function(e){var t=this._observers;if(t!==null&&t.has(e)){t.delete(e),h(this._fragmentFiber.child,!1,Gp,e,void 0,void 0);for(var n=t=0;n<Kp.length;n++){var r=Kp[n];r.fragmentInstance===this&&r.observer===e?e.unobserve(r.instance):Kp[t++]=r}Kp.length=t}};function Gp(e,t){return e.tag===6||(e=b(e),t.unobserve(e)),!1}var Kp=[],qp=!1;function Jp(e,t,n){Kp.push({fragmentInstance:e,observer:t,instance:n}),qp||(qp=!0,mm(function(){qp=!1;var e=Kp;Kp=[];for(var t=0;t<e.length;t++){var n=e[t];n.observer.unobserve(n.instance)}}))}Fp.prototype.getClientRects=function(){var e=[];return h(this._fragmentFiber.child,!1,Yp,e,void 0,void 0),e};function Yp(e,t){if(e.tag===6){e=e.stateNode;var n=e.ownerDocument.createRange();n.selectNodeContents(e),t.push.apply(t,n.getClientRects())}else e=b(e),t.push.apply(t,e.getClientRects());return!1}Fp.prototype.getRootNode=function(e){var t=g(this._fragmentFiber);return t===null?this:b(t).getRootNode(e)},Fp.prototype.compareDocumentPosition=function(e){var t=g(this._fragmentFiber);if(t===null)return Node.DOCUMENT_POSITION_DISCONNECTED;var n=[];h(this._fragmentFiber.child,!1,Hp,n,void 0,void 0);var r=b(t);if(n.length===0){if(n=r,_(this._fragmentFiber)){a:{for(t=this._fragmentFiber.return;t!==null;){if(t.tag===4){t=t.stateNode.containerInfo;break a}if(t.tag===3||t.tag===5||t.tag===27)break;t=t.return}t=null}t!=null&&(n=t)}t=this._fragmentFiber;var i=r=n.compareDocumentPosition(e);return n===e?i=Node.DOCUMENT_POSITION_CONTAINS:r&Node.DOCUMENT_POSITION_CONTAINED_BY&&(n=v(t)[1],n===null?i=Node.DOCUMENT_POSITION_PRECEDING:(e=b(n).compareDocumentPosition(e),i=e===0||e&Node.DOCUMENT_POSITION_FOLLOWING?Node.DOCUMENT_POSITION_FOLLOWING:Node.DOCUMENT_POSITION_PRECEDING)),i|=Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC}t=b(n[0]),i=b(n[n.length-1]);var a=_(this._fragmentFiber)?t.parentElement:r;if(a==null)return Node.DOCUMENT_POSITION_DISCONNECTED;r=a.compareDocumentPosition(t)&Node.DOCUMENT_POSITION_CONTAINED_BY,a=a.compareDocumentPosition(i)&Node.DOCUMENT_POSITION_CONTAINED_BY;var o=t.compareDocumentPosition(e),s=i.compareDocumentPosition(e),c=o&Node.DOCUMENT_POSITION_CONTAINED_BY||s&Node.DOCUMENT_POSITION_CONTAINED_BY;return s=r&&a&&o&Node.DOCUMENT_POSITION_FOLLOWING&&s&Node.DOCUMENT_POSITION_PRECEDING,t=r&&t===e||a&&i===e||c||s?Node.DOCUMENT_POSITION_CONTAINED_BY:!r&&t===e||!a&&i===e?Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC:o,t&Node.DOCUMENT_POSITION_DISCONNECTED||t&Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC||Xp(t,this._fragmentFiber,n[0],n[n.length-1],e)?t:Node.DOCUMENT_POSITION_IMPLEMENTATION_SPECIFIC};function Xp(e,t,n,r,i){var a=Pt(i);if(e&Node.DOCUMENT_POSITION_CONTAINED_BY){if(n=!!a)a:{for(;a!==null;){if(a.tag===7&&(a===t||a.alternate===t)){n=!0;break a}a=a.return}n=!1}return n}if(e&Node.DOCUMENT_POSITION_CONTAINS){if(a===null)return a=i.ownerDocument,i===a||i===a.documentElement||i===a.body;a:{for(a=t,t=g(t);a!==null;){if(!(a.tag!==5&&a.tag!==3&&a.tag!==27||a!==t&&a.alternate!==t)){a=!0;break a}a=a.return}a=!1}return a}return e&Node.DOCUMENT_POSITION_PRECEDING?((t=!!a)&&!(t=a===n)&&(t=te(n,a,w),t===null?t=!1:(h(t,!0,C,a,n),a=x,x=null,t=a!==null)),t):e&Node.DOCUMENT_POSITION_FOLLOWING?((t=!!a)&&!(t=a===r)&&(t=te(r,a,w),t===null?t=!1:(h(t,!0,ee,a,r),a=x,S=x=null,t=a!==null)),t):!1}function Zp(e,t){var n=e.ownerDocument.createRange();n.selectNodeContents(e),e=n.getBoundingClientRect(),window.scrollTo(window.scrollX+e.left,t?window.scrollY+e.top:window.scrollY+e.bottom-window.innerHeight)}Fp.prototype.scrollIntoView=function(e){if(typeof e==`object`)throw Error(i(566));var t=[];h(this._fragmentFiber.child,!1,Hp,t,void 0,void 0);var n=!1!==e;if(t.length===0){var r=v(this._fragmentFiber);if(r=n?r[1]||r[0]||g(this._fragmentFiber):r[0]||r[1],r===null)return;if(r.tag===6){e=b(r),Zp(e,n);return}if(r=b(r),r.nodeType!==9){if(r.nodeType===11){n=`host`in r?r.host:null,n!==null&&n.scrollIntoView(e);return}r.scrollIntoView(e)}}for(r=n?t.length-1:0;r!==(n?-1:t.length);){var a=t[r];a.tag===6?(a=b(a),Zp(a,n)):b(a).scrollIntoView(e),r+=n?-1:1}};function Qp(e,t){return e=b(e),$p(e,t),!1}function $p(e,t){e.reactFragments??=new Set,e.reactFragments.add(t)}function em(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.addEventListener(i.type,i.attachedListener,Rp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){for(var r=0,i=0;i<Kp.length;i++){var a=Kp[i];(a.fragmentInstance!==t||a.observer!==n||a.instance!==e)&&(Kp[r++]=a)}Kp.length=r,n.observe(e)}),$p(e,t))}function tm(e,t){var n=t._eventListeners;if(n!==null)for(var r=0;r<n.length;r++){var i=n[r];e.removeEventListener(i.type,i.attachedListener,Rp(i.optionsOrUseCapture))}e.nodeType!==3&&(n=t._observers,n!==null&&n.forEach(function(n){typeof n.rootMargin==`string`?Jp(t,n,e):n.unobserve(e)}),e.reactFragments!=null&&e.reactFragments.delete(t))}function nm(e){var t=e.firstChild;for(t&&t.nodeType===10&&(t=t.nextSibling);t;){var n=t;switch(t=t.nextSibling,n.nodeName){case`HTML`:case`HEAD`:case`BODY`:nm(n),Nt(n);continue;case`SCRIPT`:case`STYLE`:continue;case`LINK`:if(n.rel.toLowerCase()===`stylesheet`)continue}e.removeChild(n)}}function rm(e,t,n,r){for(;e.nodeType===1;){var i=n;if(e.nodeName.toLowerCase()!==t.toLowerCase()){if(!r&&(e.nodeName!==`INPUT`||e.type!==`hidden`))break}else if(!r){if(t===`input`&&e.type===`hidden`){var a=i.name==null?null:``+i.name;if(i.type===`hidden`&&e.getAttribute(`name`)===a)return e}else return e}else if(!e[jt])switch(t){case`meta`:if(!e.hasAttribute(`itemprop`))break;return e;case`link`:if(a=e.getAttribute(`rel`),a===`stylesheet`&&e.hasAttribute(`data-precedence`)||a!==i.rel||e.getAttribute(`href`)!==(i.href==null||i.href===``?null:i.href)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin)||e.getAttribute(`title`)!==(i.title==null?null:i.title))break;return e;case`style`:if(e.hasAttribute(`data-precedence`))break;return e;case`script`:if(a=e.getAttribute(`src`),(a!==(i.src==null?null:i.src)||e.getAttribute(`type`)!==(i.type==null?null:i.type)||e.getAttribute(`crossorigin`)!==(i.crossOrigin==null?null:i.crossOrigin))&&a&&e.hasAttribute(`async`)&&!e.hasAttribute(`itemprop`))break;return e;default:return e}if(e=lm(e.nextSibling),e===null)break}return null}function im(e,t,n){if(t===``)return null;for(;e.nodeType!==3;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!n||(e=lm(e.nextSibling),e===null))return null;return e}function am(e,t){for(;e.nodeType!==8;)if((e.nodeType!==1||e.nodeName!==`INPUT`||e.type!==`hidden`)&&!t||(e=lm(e.nextSibling),e===null))return null;return e}function om(e){return e.data===`$?`||e.data===`$~`}function sm(e){return e.data===`$!`||e.data===`$?`&&e.ownerDocument.readyState!==`loading`}function cm(e,t){var n=e.ownerDocument;if(e.data===`$~`)e._reactRetry=t;else if(e.data!==`$?`||n.readyState!==`loading`)t();else{var r=function(){t(),n.removeEventListener(`DOMContentLoaded`,r)};n.addEventListener(`DOMContentLoaded`,r),e._reactRetry=r}}function lm(e){for(;e!=null;e=e.nextSibling){var t=e.nodeType;if(t===1||t===3)break;if(t===8){if(t=e.data,t===`$`||t===`$!`||t===`$?`||t===`$~`||t===`&`||t===`F!`||t===`F`)break;if(t===`/$`||t===`/&`)return null}}return e}var um=null;function dm(e){e=e.nextSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`/$`||n===`/&`){if(t===0)return lm(e.nextSibling);t--}else n!==`$`&&n!==`$!`&&n!==`$?`&&n!==`$~`&&n!==`&`||t++}e=e.nextSibling}return null}function fm(e){e=e.previousSibling;for(var t=0;e;){if(e.nodeType===8){var n=e.data;if(n===`$`||n===`$!`||n===`$?`||n===`$~`||n===`&`){if(t===0)return e;t--}else n!==`/$`&&n!==`/&`||t++}e=e.previousSibling}return null}function pm(e,t){function n(){r=!0}if(e.ownerDocument.activeElement===e)return!0;var r=!1;try{e.ownerDocument.addEventListener(`focus`,n,!0),(e.focus||HTMLElement.prototype.focus).call(e,t)}finally{e.ownerDocument.removeEventListener(`focus`,n,!0)}return r}function mm(e){yp(function(){yp(function(t){return e(t)})})}function hm(e,t,n){switch(t=lp(n),e){case`html`:if(e=t.documentElement,!e)throw Error(i(452));return e;case`head`:if(e=t.head,!e)throw Error(i(453));return e;case`body`:if(e=t.body,!e)throw Error(i(454));return e;default:throw Error(i(451))}}function gm(e,t,n){for(var r in n){var i=n[r];n.hasOwnProperty(r)&&i!=null&&ep(e,t,r,null,rp,i)}n.dangerouslySetInnerHTML!=null&&(e.textContent=``),e.onclick===yn&&(e.onclick=null),Nt(e)}function _m(e){for(var t=e.attributes;t.length;)e.removeAttributeNode(t[0]);Nt(e)}var vm=new Map,ym=new Set;function bm(e){if(typeof e.getRootNode==`function`){var t=e.getRootNode();if(t.nodeType===9||t.nodeType===11)return t}return e.nodeType===9?e:e.ownerDocument}var xm=j.d;j.d={f:Sm,r:Cm,D:Em,C:Dm,L:Om,m:km,X:jm,S:Am,M:Mm};function Sm(){var e=xm.f(),t=Rd();return e||t}function Cm(e){var t=Ft(e);t!==null&&t.tag===5&&t.type===`form`?ec(t):xm.r(e)}var wm=typeof document>`u`?null:document;function Tm(e,t,n){var r=wm;if(r&&typeof t==`string`&&t){var i=rn(t);i=`link[rel="`+e+`"][href="`+i+`"]`,typeof n==`string`&&(i+=`[crossorigin="`+n+`"]`),ym.has(i)||(ym.add(i),e={rel:e,crossOrigin:n,href:t},r.querySelector(i)===null&&(t=r.createElement(`link`),np(t,`link`,e),Rt(t),r.head.appendChild(t)))}}function Em(e){xm.D(e),Tm(`dns-prefetch`,e,null)}function Dm(e,t){xm.C(e,t),Tm(`preconnect`,e,t)}function Om(e,t,n){xm.L(e,t,n);var r=wm;if(r&&e&&t){var i=`link[rel="preload"][as="`+rn(t)+`"]`;t===`image`&&n&&n.imageSrcSet?(i+=`[imagesrcset="`+rn(n.imageSrcSet)+`"]`,typeof n.imageSizes==`string`&&(i+=`[imagesizes="`+rn(n.imageSizes)+`"]`)):i+=`[href="`+rn(e)+`"]`;var a=i;switch(t){case`style`:a=Pm(e);break;case`script`:a=Rm(e)}if(!(vm.has(a)||(e=T({rel:`preload`,href:t===`image`&&n&&n.imageSrcSet?void 0:e,as:t},n),vm.set(a,e),r.querySelector(i)!==null||t===`style`&&r.querySelector(Fm(a))||t===`script`&&r.querySelector(zm(a))))){var o=r.createElement(`link`);np(o,`link`,e),t===`style`&&(o[Mt]=!0,o.onload=o.onerror=function(){zt(o)}),Rt(o),r.head.appendChild(o)}}}function km(e,t){xm.m(e,t);var n=wm;if(n&&e){var r=t&&typeof t.as==`string`?t.as:`script`,i=`link[rel="modulepreload"][as="`+rn(r)+`"][href="`+rn(e)+`"]`,a=i;switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:a=Rm(e)}if(!vm.has(a)&&(e=T({rel:`modulepreload`,href:e},t),vm.set(a,e),n.querySelector(i)===null)){switch(r){case`audioworklet`:case`paintworklet`:case`serviceworker`:case`sharedworker`:case`worker`:case`script`:if(n.querySelector(zm(a)))return}r=n.createElement(`link`),np(r,`link`,e),Rt(r),n.head.appendChild(r)}}}function Am(e,t,n){xm.S(e,t,n);var r=wm;if(r&&e){var i=Lt(r).hoistableStyles,a=Pm(e);t||=`default`;var o=i.get(a);if(!o){var s={loading:0,preload:null};if(o=r.querySelector(Fm(a)))s.loading=5;else{e=T({rel:`stylesheet`,href:e,"data-precedence":t},n),(n=vm.get(a))&&Hm(e,n);var c=o=r.createElement(`link`);Rt(c),np(c,`link`,e),c._p=new Promise(function(e,t){c.onload=e,c.onerror=t}),c.addEventListener(`load`,function(){s.loading|=1}),c.addEventListener(`error`,function(){s.loading|=2}),s.loading|=4,Vm(o,t,r)}o={type:`stylesheet`,instance:o,count:1,state:s},i.set(a,o)}}}function jm(e,t){xm.X(e,t);var n=wm;if(n&&e){var r=Lt(n).hoistableScripts,i=Rm(e),a=r.get(i);a||(a=n.querySelector(zm(i)),a||(e=T({src:e,async:!0},t),(t=vm.get(i))&&Um(e,t),a=n.createElement(`script`),Rt(a),np(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Mm(e,t){xm.M(e,t);var n=wm;if(n&&e){var r=Lt(n).hoistableScripts,i=Rm(e),a=r.get(i);a||(a=n.querySelector(zm(i)),a||(e=T({src:e,async:!0,type:`module`},t),(t=vm.get(i))&&Um(e,t),a=n.createElement(`script`),Rt(a),np(a,`link`,e),n.head.appendChild(a)),a={type:`script`,instance:a,count:1,state:null},r.set(i,a))}}function Nm(e,t,n,r){var a=(a=De.current)?bm(a):null;if(!a)throw Error(i(446));switch(e){case`meta`:case`title`:return null;case`style`:return typeof n.precedence==`string`&&typeof n.href==`string`?(n=Pm(n.href),t=Lt(a).hoistableStyles,r=t.get(n),r||(r={type:`style`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};case`link`:if(n.rel===`stylesheet`&&typeof n.href==`string`&&typeof n.precedence==`string`){e=Pm(n.href);var o=Lt(a).hoistableStyles,s=o.get(e);if(s||(a=a.ownerDocument||a,s={type:`stylesheet`,instance:null,count:0,state:{loading:0,preload:null}},o.set(e,s),(o=a.querySelector(Fm(e)))?o._p||(s.instance=o,s.state.loading=5):(o=vm.get(e),o||(o={rel:`preload`,as:`style`,href:n.href,crossOrigin:n.crossOrigin,integrity:n.integrity,media:n.media,hrefLang:n.hrefLang,referrerPolicy:n.referrerPolicy},vm.set(e,o)),Lm(a,e,o,s.state))),t&&r===null)throw Error(i(528,``));return s}if(t&&r!==null)throw Error(i(529,``));return null;case`script`:return t=n.async,n=n.src,typeof n==`string`&&t&&typeof t!=`function`&&typeof t!=`symbol`?(n=Rm(n),t=Lt(a).hoistableScripts,r=t.get(n),r||(r={type:`script`,instance:null,count:0,state:null},t.set(n,r)),r):{type:`void`,instance:null,count:0,state:null};default:throw Error(i(444,e))}}function Pm(e){return`href="`+rn(e)+`"`}function Fm(e){return`link[rel="stylesheet"][`+e+`]`}function Im(e){return T({},e,{"data-precedence":e.precedence,precedence:null})}function Lm(e,t,n,r){if(t=e.querySelector(`link[rel="preload"][as="style"][`+t+`]`)){if(!0!==t[Mt]){r.loading=1;return}}else t=e.createElement(`link`),t[Mt]=!0,t.onload=t.onerror=zt.bind(null,t),np(t,`link`,n),Rt(t),e.head.appendChild(t);r.preload=t,t.addEventListener(`load`,function(){return r.loading|=1}),t.addEventListener(`error`,function(){return r.loading|=2})}function Rm(e){return`[src="`+rn(e)+`"]`}function zm(e){return`script[async]`+e}function Bm(e,t,n){if(t.count++,t.instance===null)switch(t.type){case`style`:var r=e.querySelector(`style[data-href~="`+rn(n.href)+`"]`);if(r)return t.instance=r,Rt(r),r;var a=T({},n,{"data-href":n.href,"data-precedence":n.precedence,href:null,precedence:null});return r=(e.ownerDocument||e).createElement(`style`),Rt(r),np(r,`style`,a),Vm(r,n.precedence,e),t.instance=r;case`stylesheet`:a=Pm(n.href);var o=e.querySelector(Fm(a));if(o)return t.state.loading|=4,t.instance=o,Rt(o),o;r=Im(n),(a=vm.get(a))&&Hm(r,a),o=(e.ownerDocument||e).createElement(`link`),Rt(o);var s=o;return s._p=new Promise(function(e,t){s.onload=e,s.onerror=t}),np(o,`link`,r),t.state.loading|=4,Vm(o,n.precedence,e),t.instance=o;case`script`:return o=Rm(n.src),(a=e.querySelector(zm(o)))?(t.instance=a,Rt(a),a):(r=n,(a=vm.get(o))&&(r=T({},n),Um(r,a)),e=e.ownerDocument||e,a=e.createElement(`script`),Rt(a),np(a,`link`,r),e.head.appendChild(a),t.instance=a);case`void`:return null;default:throw Error(i(443,t.type))}else t.type===`stylesheet`&&!(t.state.loading&4)&&(r=t.instance,t.state.loading|=4,Vm(r,n.precedence,e));return t.instance}function Vm(e,t,n){for(var r=n.querySelectorAll(`link[rel="stylesheet"][data-precedence],style[data-precedence]`),i=r.length?r[r.length-1]:null,a=i,o=0;o<r.length;o++){var s=r[o];if(s.dataset.precedence===t)a=s;else if(a!==i)break}a?a.parentNode.insertBefore(e,a.nextSibling):(t=n.nodeType===9?n.head:n,t.insertBefore(e,t.firstChild))}function Hm(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.title??=t.title}function Um(e,t){e.crossOrigin??=t.crossOrigin,e.referrerPolicy??=t.referrerPolicy,e.integrity??=t.integrity}var Wm=null;function Gm(e,t,n){if(Wm===null){var r=new Map,i=Wm=new Map;i.set(n,r)}else i=Wm,r=i.get(n),r||(r=new Map,i.set(n,r));if(r.has(e))return r;for(r.set(e,null),n=n.getElementsByTagName(e),i=0;i<n.length;i++){var a=n[i];if(!(a[jt]||a[wt]||e===`link`&&a.getAttribute(`rel`)===`stylesheet`)&&a.namespaceURI!==`http://www.w3.org/2000/svg`){var o=a.getAttribute(t)||``;o=e+o;var s=r.get(o);s?s.push(a):r.set(o,[a])}}return r}function Km(e,t,n){e=e.ownerDocument||e,e.head.insertBefore(n,t===`title`?e.querySelector(`head > title`):null)}function qm(e,t,n){if(n===1||t.itemProp!=null)return!1;switch(e){case`meta`:case`title`:return!0;case`style`:if(typeof t.precedence!=`string`||typeof t.href!=`string`||t.href===``)break;return!0;case`link`:if(typeof t.rel!=`string`||typeof t.href!=`string`||t.href===``||t.onLoad||t.onError)break;switch(t.rel){case`stylesheet`:return e=t.disabled,typeof t.precedence==`string`&&e==null;default:return!0}case`script`:if(t.async&&typeof t.async!=`function`&&typeof t.async!=`symbol`&&!t.onLoad&&!t.onError&&t.src&&typeof t.src==`string`)return!0}return!1}function Jm(e,t){return e===`img`&&t.src!=null&&t.src!==``&&t.onLoad==null&&t.loading!==`lazy`}function Ym(e){return!(e.type===`stylesheet`&&!(e.state.loading&3))}function Xm(e){return(e.width||100)*(e.height||100)*(typeof devicePixelRatio==`number`?devicePixelRatio:1)*.25}function Zm(e,t){typeof t.decode==`function`&&(e.imgCount++,t.complete||(e.imgBytes+=Xm(t),e.suspenseyImages.push(t)),e=rh.bind(e),t.decode().then(e,e))}function Qm(e,t,n,r){if(n.type===`stylesheet`&&(typeof r.media!=`string`||!1!==matchMedia(r.media).matches)&&!(n.state.loading&4)){if(n.instance===null){var i=Pm(r.href),a=t.querySelector(Fm(i));if(a){t=a._p,typeof t==`object`&&t&&typeof t.then==`function`&&(e.count++,e=nh.bind(e),t.then(e,e)),n.state.loading|=4,n.instance=a,Rt(a);return}a=t.ownerDocument||t,r=Im(r),(i=vm.get(i))&&Hm(r,i),a=a.createElement(`link`),Rt(a);var o=a;o._p=new Promise(function(e,t){o.onload=e,o.onerror=t}),np(a,`link`,r),n.instance=a}e.stylesheets===null&&(e.stylesheets=new Map),e.stylesheets.set(n,t),(t=n.state.preload)&&!(n.state.loading&3)&&(e.count++,n=nh.bind(e),t.addEventListener(`load`,n),t.addEventListener(`error`,n))}}var $m=0;function eh(e,t){return e.stylesheets&&e.count===0&&ah(e,e.stylesheets),0<e.count||0<e.imgCount?function(n){var r=setTimeout(function(){if(e.stylesheets&&ah(e,e.stylesheets),e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}},6e4+t);0<e.imgBytes&&$m===0&&($m=62500*op());var i=setTimeout(function(){if(e.waitingForImages=!1,e.count===0&&(e.stylesheets&&ah(e,e.stylesheets),e.unsuspend)){var t=e.unsuspend;e.unsuspend=null,t()}},(e.imgBytes>$m?50:800)+t);return e.unsuspend=n,function(){e.unsuspend=null,clearTimeout(r),clearTimeout(i)}}:null}function th(e){if(e.count===0&&(e.imgCount===0||!e.waitingForImages)){if(e.stylesheets)ah(e,e.stylesheets);else if(e.unsuspend){var t=e.unsuspend;e.unsuspend=null,t()}}}function nh(){this.count--,th(this)}function rh(){this.imgCount--,th(this)}var ih=null;function ah(e,t){e.stylesheets=null,e.unsuspend!==null&&(e.count++,ih=new Map,t.forEach(oh,e),ih=null,nh.call(e))}function oh(e,t){if(!(t.state.loading&4)){var n=ih.get(e);if(n)var r=n.get(null);else{n=new Map,ih.set(e,n);for(var i=e.querySelectorAll(`link[data-precedence],style[data-precedence]`),a=0;a<i.length;a++){var o=i[a];(o.nodeName===`LINK`||o.getAttribute(`media`)!==`not all`)&&(n.set(o.dataset.precedence,o),r=o)}r&&n.set(null,r)}i=t.instance,o=i.getAttribute(`data-precedence`),a=n.get(o)||r,a===r&&n.set(null,i),n.set(o,i),this.count++,r=nh.bind(this),i.addEventListener(`load`,r),i.addEventListener(`error`,r),a?a.parentNode.insertBefore(i,a.nextSibling):(e=e.nodeType===9?e.head:e,e.insertBefore(i,e.firstChild)),t.state.loading|=4}}var sh={$$typeof:ce,Provider:null,Consumer:null,_currentValue:xe,_currentValue2:xe,_threadCount:0};function ch(e,t,n,r,i,a,o,s,c){this.tag=1,this.containerInfo=e,this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.next=this.pendingContext=this.context=this.cancelPendingCommit=null,this.callbackPriority=0,this.expirationTimes=pt(-1),this.entangledLanes=this.shellSuspendCounter=this.errorRecoveryDisabledLanes=this.expiredLanes=this.warmLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=pt(0),this.hiddenUpdates=pt(null),this.identifierPrefix=r,this.onUncaughtError=i,this.onCaughtError=a,this.onRecoverableError=o,this.pooledCache=null,this.pooledCacheLanes=0,this.formState=c,this.transitionTypes=null,this.incompleteTransitions=new Map}function lh(e,t,n,r,i,a,o,s,c,l,u,d){return e=new ch(e,t,n,o,c,l,u,d,s),t=1,!0===a&&(t|=24),a=Ai(3,null,null,t),e.current=a,a.stateNode=e,t=Aa(),t.refCount++,e.pooledCache=t,t.refCount++,a.memoizedState={element:r,isDehydrated:n,cache:t},po(a),e}function uh(e){return e?(e=Oi,e):Oi}function dh(e,t,n,r,i,a){i=uh(i),r.context===null?r.context=i:r.pendingContext=i,r=ho(t),r.payload={element:n},a=a===void 0?null:a,a!==null&&(r.callback=a),n=go(e,r,t),n!==null&&(Nd(n,e,t),_o(n,e,t))}function fh(e,t){if(e=e.memoizedState,e!==null&&e.dehydrated!==null){var n=e.retryLane;e.retryLane=n!==0&&n<t?n:t}}function ph(e,t){fh(e,t),(e=e.alternate)&&fh(e,t)}function mh(e){if(e.tag===13||e.tag===31){var t=Ti(e,67108864);t!==null&&Nd(t,e,67108864),ph(e,67108864)}}function hh(e){if(e.tag===13||e.tag===31){var t=Ad();t=yt(t);var n=Ti(e,t);n!==null&&Nd(n,e,t),ph(e,t)}}var gh=!0;function _h(e,t,n,r){var i=A.T;A.T=null;var a=j.p;try{j.p=2,yh(e,t,n,r)}finally{j.p=a,A.T=i}}function vh(e,t,n,r){var i=A.T;A.T=null;var a=j.p;try{j.p=8,yh(e,t,n,r)}finally{j.p=a,A.T=i}}function yh(e,t,n,r){if(gh){var i=bh(r);if(i===null)Gf(e,t,r,xh,n),Mh(e,r);else if(Ph(i,e,t,n,r))r.stopPropagation();else if(Mh(e,r),t&4&&-1<jh.indexOf(e)){for(;i!==null;){var a=Ft(i);if(a!==null)switch(a.tag){case 3:if(a=a.stateNode,a.current.memoizedState.isDehydrated){var o=lt(a.pendingLanes);if(o!==0){var s=a;for(s.pendingLanes|=2,s.entangledLanes|=2;o;){var c=1<<31-nt(o);s.entanglements[1]|=c,o&=~c}Tf(a),!(J&6)&&(hd=Ge()+500,Ef(0,!1))}}break;case 31:case 13:s=Ti(a,2),s!==null&&Nd(s,a,2),Rd(),ph(a,2)}if(a=bh(r),a===null&&Gf(e,t,r,xh,n),a===i)break;i=a}i!==null&&r.stopPropagation()}else Gf(e,t,r,null,n)}}function bh(e){return e=xn(e),Sh(e)}var xh=null;function Sh(e){if(xh=null,e=Pt(e),e!==null){var t=o(e);if(t===null)e=null;else{var n=t.tag;if(n===13){if(e=s(t),e!==null)return e;e=null}else if(n===31){if(e=c(t),e!==null)return e;e=null}else if(n===3){if(t.stateNode.current.memoizedState.isDehydrated)return t.tag===3?t.stateNode.containerInfo:null;e=null}else t!==e&&(e=null)}}return xh=e,null}function Ch(e){switch(e){case`beforetoggle`:case`cancel`:case`click`:case`close`:case`contextmenu`:case`copy`:case`cut`:case`auxclick`:case`dblclick`:case`dragend`:case`dragstart`:case`drop`:case`focusin`:case`focusout`:case`input`:case`invalid`:case`keydown`:case`keypress`:case`keyup`:case`mousedown`:case`mouseup`:case`paste`:case`pause`:case`play`:case`pointercancel`:case`pointerdown`:case`pointerup`:case`ratechange`:case`reset`:case`seeked`:case`submit`:case`toggle`:case`touchcancel`:case`touchend`:case`touchstart`:case`volumechange`:case`change`:case`selectionchange`:case`textInput`:case`compositionstart`:case`compositionend`:case`compositionupdate`:case`beforeblur`:case`afterblur`:case`beforeinput`:case`blur`:case`fullscreenchange`:case`fullscreenerror`:case`focus`:case`hashchange`:case`popstate`:case`select`:case`selectstart`:return 2;case`drag`:case`dragenter`:case`dragexit`:case`dragleave`:case`dragover`:case`mousemove`:case`mouseout`:case`mouseover`:case`pointermove`:case`pointerout`:case`pointerover`:case`resize`:case`scroll`:case`touchmove`:case`wheel`:case`mouseenter`:case`mouseleave`:case`pointerenter`:case`pointerleave`:return 8;case`message`:switch(Ke()){case qe:return 2;case Je:return 8;case Ye:case Xe:return 32;case Ze:return 268435456;default:return 32}default:return 32}}var wh=!1,Th=null,Eh=null,Dh=null,Oh=new Map,kh=new Map,Ah=[],jh=`mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset`.split(` `);function Mh(e,t){switch(e){case`focusin`:case`focusout`:Th=null;break;case`dragenter`:case`dragleave`:Eh=null;break;case`mouseover`:case`mouseout`:Dh=null;break;case`pointerover`:case`pointerout`:Oh.delete(t.pointerId);break;case`gotpointercapture`:case`lostpointercapture`:kh.delete(t.pointerId)}}function Nh(e,t,n,r,i,a){return e===null||e.nativeEvent!==a?(e={blockedOn:t,domEventName:n,eventSystemFlags:r,nativeEvent:a,targetContainers:[i]},t!==null&&(t=Ft(t),t!==null&&mh(t)),e):(e.eventSystemFlags|=r,t=e.targetContainers,i!==null&&t.indexOf(i)===-1&&t.push(i),e)}function Ph(e,t,n,r,i){switch(t){case`focusin`:return Th=Nh(Th,e,t,n,r,i),!0;case`dragenter`:return Eh=Nh(Eh,e,t,n,r,i),!0;case`mouseover`:return Dh=Nh(Dh,e,t,n,r,i),!0;case`pointerover`:var a=i.pointerId;return Oh.set(a,Nh(Oh.get(a)||null,e,t,n,r,i)),!0;case`gotpointercapture`:return a=i.pointerId,kh.set(a,Nh(kh.get(a)||null,e,t,n,r,i)),!0}return!1}function Fh(e){var t=Pt(e.target);if(t!==null){var n=o(t);if(n!==null){if(t=n.tag,t===13){if(t=s(n),t!==null){e.blockedOn=t,St(e.priority,function(){hh(n)});return}}else if(t===31){if(t=c(n),t!==null){e.blockedOn=t,St(e.priority,function(){hh(n)});return}}else if(t===3&&n.stateNode.current.memoizedState.isDehydrated){e.blockedOn=n.tag===3?n.stateNode.containerInfo:null;return}}}e.blockedOn=null}function Ih(e){if(e.blockedOn!==null)return!1;for(var t=e.targetContainers;0<t.length;){var n=bh(e.nativeEvent);if(n===null){n=e.nativeEvent;var r=new n.constructor(n.type,n);bn=r,n.target.dispatchEvent(r),bn=null}else return t=Ft(n),t!==null&&mh(t),e.blockedOn=n,!1;t.shift()}return!0}function Lh(e,t,n){Ih(e)&&n.delete(t)}function Rh(){wh=!1,Th!==null&&Ih(Th)&&(Th=null),Eh!==null&&Ih(Eh)&&(Eh=null),Dh!==null&&Ih(Dh)&&(Dh=null),Oh.forEach(Lh),kh.forEach(Lh)}function zh(e,n){e.blockedOn===n&&(e.blockedOn=null,wh||(wh=!0,t.unstable_scheduleCallback(t.unstable_NormalPriority,Rh)))}var Bh=null;function Vh(e){Bh!==e&&(Bh=e,t.unstable_scheduleCallback(t.unstable_NormalPriority,function(){Bh===e&&(Bh=null);for(var t=0;t<e.length;t+=3){var n=e[t],r=e[t+1],i=e[t+2];if(typeof r!=`function`){if(Sh(r||n)===null)continue;break}var a=Ft(n);a!==null&&(e.splice(t,3),t-=3,Qs(a,{pending:!0,data:i,method:n.method,action:r},r,i))}}))}function Hh(e){function t(t){return zh(t,e)}Th!==null&&zh(Th,e),Eh!==null&&zh(Eh,e),Dh!==null&&zh(Dh,e),Oh.forEach(t),kh.forEach(t);for(var n=0;n<Ah.length;n++){var r=Ah[n];r.blockedOn===e&&(r.blockedOn=null)}for(;0<Ah.length&&(n=Ah[0],n.blockedOn===null);)Fh(n),n.blockedOn===null&&Ah.shift();if(n=(e.ownerDocument||e).$$reactFormReplay,n!=null)for(r=0;r<n.length;r+=3){var i=n[r],a=n[r+1],o=i[Tt]||null;if(typeof a==`function`)o||Vh(n);else if(o){var s=null;if(a&&a.hasAttribute(`formAction`)){if(i=a,o=a[Tt]||null)s=o.formAction;else if(Sh(i)!==null)continue}else s=o.action;typeof s==`function`?n[r+1]=s:(n.splice(r,3),r-=3),Vh(n)}}}function Uh(){function e(e){e.canIntercept&&e.info===`react-transition`&&e.intercept({handler:function(){return new Promise(function(e){return i=e})},focusReset:`manual`,scroll:`manual`})}function t(){i!==null&&(i(),i=null),r||setTimeout(n,20)}function n(){if(!r&&!navigation.transition){var e=navigation.currentEntry;e&&e.url!=null&&navigation.navigate(e.url,{state:e.getState(),info:`react-transition`,history:`replace`})}}if(typeof navigation==`object`){var r=!1,i=null;return navigation.addEventListener(`navigate`,e),navigation.addEventListener(`navigatesuccess`,t),navigation.addEventListener(`navigateerror`,t),setTimeout(n,100),function(){r=!0,navigation.removeEventListener(`navigate`,e),navigation.removeEventListener(`navigatesuccess`,t),navigation.removeEventListener(`navigateerror`,t),i!==null&&(i(),i=null)}}}function Wh(e){this._internalRoot=e}Gh.prototype.render=Wh.prototype.render=function(e){var t=this._internalRoot;if(t===null)throw Error(i(409));var n=t.current;dh(n,Ad(),e,t,null,null)},Gh.prototype.unmount=Wh.prototype.unmount=function(){var e=this._internalRoot;if(e!==null){this._internalRoot=null;var t=e.containerInfo;dh(e.current,2,null,e,null,null),Rd(),t[Et]=null}};function Gh(e){this._internalRoot=e}Gh.prototype.unstable_scheduleHydration=function(e){if(e){var t=xt();e={blockedOn:null,target:e,priority:t};for(var n=0;n<Ah.length&&t!==0&&t<Ah[n].priority;n++);Ah.splice(n,0,e),n===0&&Fh(e)}};var Kh=n.version;if(Kh!==`19.3.1`)throw Error(i(527,Kh,`19.3.1`));j.findDOMNode=function(e){var t=e._reactInternals;if(t===void 0)throw typeof e.render==`function`?Error(i(188)):(e=Object.keys(e).join(`,`),Error(i(268,e)));return e=d(t),e=e===null?null:p(e),e=e===null?null:e.stateNode,e};var qh={bundleType:0,version:`19.3.1`,rendererPackageName:`react-dom`,currentDispatcherRef:A,reconcilerVersion:`19.3.1`};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`){var Jh=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!Jh.isDisabled&&Jh.supportsFiber)try{et=Jh.inject(qh),P=Jh}catch{}}e.createRoot=function(e,t){if(!a(e))throw Error(i(299));var n=!1,r=``,o=xc,s=Sc,c=Cc;return t!=null&&(!0===t.unstable_strictMode&&(n=!0),t.identifierPrefix!==void 0&&(r=t.identifierPrefix),t.onUncaughtError!==void 0&&(o=t.onUncaughtError),t.onCaughtError!==void 0&&(s=t.onCaughtError),t.onRecoverableError!==void 0&&(c=t.onRecoverableError)),t=lh(e,1,!1,null,null,n,r,null,o,s,c,Uh),e[Et]=t.current,Uf(e),new Wh(t)}})),g=o(((e,t)=>{function n(){if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<`u`&&typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE==`function`)try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n)}catch(e){console.error(e)}}n(),t.exports=h()})),_=c(u(),1),v=g(),y=15e3,b=new Set,x=new Map,S=!1,C=0,ee;function w(){return typeof window<`u`&&typeof window.external?.sendMessage==`function`}function te(){S||(S=!0,typeof window<`u`&&typeof window.external?.receiveMessage==`function`&&window.external.receiveMessage(e=>T(e)))}function T(e){let t;try{t=JSON.parse(e)}catch(t){console.warn(`[Native] Received a non-JSON message:`,e,t);return}let n=typeof t.id==`string`?t.id:void 0,r=n?x.get(n):void 0;n&&r&&(x.delete(n),clearTimeout(r.timeoutId),t.ok===!1?r.reject(Error(typeof t.error==`string`?t.error:`Native request failed.`)):r.resolve(t.data)),b.forEach(e=>{try{e(t)}catch(e){console.error(`[Native] Message handler threw:`,e)}})}function ne(){if(ee!==void 0)return;let e=()=>{if(!w())return;let e=document.getElementById(`root`),t=e!==null&&e.childElementCount===0;window.external.sendMessage(JSON.stringify({type:`webview.heartbeat`,payload:{blank:t}}))};e(),ee=setInterval(e,5e3)}var E={get available(){return w()},send(e){w()?(te(),window.external.sendMessage(JSON.stringify(e)),e.type===`app.ready`&&ne()):console.debug(`[Native] Bridge unavailable, dropping message:`,e)},request(e,t,n=y){if(!w())return Promise.reject(Error(`Native bridge is not available.`));te();let r=`req-${++C}-${Date.now()}`;return new Promise((i,a)=>{let o=setTimeout(()=>{x.delete(r),a(Error(`Native request '${e}' timed out after ${n}ms.`))},n);x.set(r,{resolve:i,reject:a,timeoutId:o}),window.external.sendMessage(JSON.stringify({type:e,id:r,payload:t}))})},on(e){return te(),b.add(e),()=>b.delete(e)}},re=1112886864,ie=1,ae=32,oe=new TextDecoder,se=class{baseTask=null;options;constructor(e){this.options=e}base(){return E.available?(this.baseTask??=E.request(this.options.baseMessage).then(e=>{let t=e?.[this.options.baseField??`base`];return typeof t==`string`?t:``},()=>(this.baseTask=null,``)),this.baseTask):Promise.resolve(``)}reset(){this.baseTask=null}async readBlock(e,t){let n=await this.base();if(!n)throw Error(`The data server is not running.`);let r=await fetch(this.join(n,e),this.request(t));if(!r.ok)throw Error(`The data request failed (${r.status}).`);let i=ce(await r.arrayBuffer()),a=Number(r.headers.get(`x-data-total`)??``);return Number.isFinite(a)&&a>=i.count&&(i.total=a),i}async bytes(e,t){let n=await this.response(e,t);return new Uint8Array(await n.arrayBuffer())}async url(e){let t=await this.base();if(!t)throw Error(`The data server is not running.`);return this.join(t,e)}image(e){return this.url(e)}async response(e,t){let n=await this.base();if(!n)throw Error(`The data server is not running.`);let r=await fetch(this.join(n,e),this.request(t));if(!r.ok)throw Error(`The data request failed (${r.status}).`);return r}request(e){return{cache:this.options.cache??`no-cache`,headers:this.options.headers,...e}}join(e,t){return`${e.replace(/\/+$/,``)}/${t.replace(/^\/+/,``)}`}};function ce(e){let t=new DataView(e);if(e.byteLength<ae||t.getUint32(0,!0)!==re)throw Error(`Not a data block.`);if(t.getUint16(4,!0)!==ie)throw Error(`This build cannot read that data block.`);let n=t.getUint16(6,!0),r=t.getUint32(8,!0),i=t.getUint32(12,!0),a=t.getUint32(16,!0),o=t.getUint32(20,!0),s=t.getUint32(24,!0),c=ae,l=()=>{let n=t.getUint16(c,!0);c+=2;let r=oe.decode(new Uint8Array(e,c,n));return c+=n,r},u=[];for(let e=0;e<i+a;e++)u.push(l());let d={};for(let e=0;e<o;e++){let e=l();d[e]=l()}let f=new Uint8Array(e,e.byteLength-s,s),p=(e,t)=>oe.decode(f.subarray(e,e+t)),m=Array(r);for(let e=0;e<r;e++){let n={};for(let e=0;e<i;e++)n[u[e]]=p(t.getUint32(c,!0),t.getUint16(c+4,!0)),c+=6;for(let e=0;e<a;e++)n[u[i+e]]=t.getFloat64(c,!0),c+=8;m[e]=n}return{kind:n,meta:d,columns:{text:u.slice(0,i),number:u.slice(i)},rows:m,count:r,total:r}}var le=o((e=>{var t=Symbol.for(`react.transitional.element`),n=Symbol.for(`react.fragment`);function r(e,n,r){var i=null;if(r!==void 0&&(i=``+r),n.key!==void 0&&(i=``+n.key),`key`in n)for(var a in r={},n)a!==`key`&&(r[a]=n[a]);else r=n;return n=r.ref,{$$typeof:t,type:e,key:i,ref:n===void 0?null:n,props:r}}e.Fragment=n,e.jsx=r,e.jsxs=r})),ue=o(((e,t)=>{t.exports=le()})),D=ue();function de(e){let t=new Map;for(let[n,r]of Object.entries(e)){let e=n.toLowerCase();t.has(e)||t.set(e,r)}return(e,n)=>{let r=t.get(e.toLowerCase())??e;return n?r.replace(/\{(\w+)}/g,(e,t)=>t in n?String(n[t]):e):r}}async function fe(e){return E.available?await E.request(`i18n.get`,e?{locale:e}:void 0):{locale:`en`,strings:{},available:[`en`]}}var pe=(0,_.createContext)(de({})),O=(0,_.createContext)(`en`);function k(){return(0,_.useContext)(pe)}function me(){return(0,_.useContext)(O)}var he=({children:e})=>{let[t,n]=(0,_.useState)(()=>de({})),[r,i]=(0,_.useState)(`en`);return(0,_.useEffect)(()=>{let e=!1,t=async()=>{try{let t=await fe();if(e)return;n(()=>de(t.strings)),i(t.locale)}catch{}};t();let r=E.on(e=>{e.type===`settings.changed`&&t()});return()=>{e=!0,r()}},[]),(0,_.useEffect)(()=>{document.documentElement.lang=r},[r]),(0,D.jsx)(pe.Provider,{value:t,children:(0,D.jsx)(O.Provider,{value:r,children:e})})},ge=e=>E.send({type:e});function _e(){let[e,t]=(0,_.useState)(!1);return(0,_.useEffect)(()=>{if(E.available)return E.on(e=>{if(e.type!==`window.state`)return;let n=e.data;typeof n?.maximized==`boolean`&&t(n.maximized)})},[]),{maximized:e,minimize:()=>ge(`window.minimize`),toggleMaximize:()=>ge(`window.toggleMaximize`),close:()=>ge(`window.close`)}}function ve(){return{onMouseDown:()=>ge(`window.drag`),onDoubleClick:()=>ge(`window.toggleMaximize`)}}function ye(){let[e,t]=(0,_.useState)(!1),{maximized:n}=_e();return(0,_.useEffect)(()=>{if(!E.available)return;let e=!1;return E.request(`app.info`).then(n=>{e||t(n.rounded===!0)}).catch(()=>void 0),()=>{e=!0}},[]),(0,_.useEffect)(()=>{document.documentElement.classList.toggle(`window-rounded`,e)},[e]),e&&!n}var be=[[`top`,{top:0,left:8,right:8,height:5,cursor:`ns-resize`}],[`bottom`,{bottom:0,left:8,right:8,height:5,cursor:`ns-resize`}],[`left`,{top:8,bottom:8,left:0,width:5,cursor:`ew-resize`}],[`right`,{top:8,bottom:8,right:0,width:5,cursor:`ew-resize`}],[`topleft`,{top:0,left:0,width:10,height:10,cursor:`nwse-resize`}],[`topright`,{top:0,right:0,width:10,height:10,cursor:`nesw-resize`}],[`bottomleft`,{bottom:0,left:0,width:10,height:10,cursor:`nesw-resize`}],[`bottomright`,{bottom:0,right:0,width:10,height:10,cursor:`nwse-resize`}]];function A(){return(0,D.jsx)(D.Fragment,{children:be.map(([e,t])=>(0,D.jsx)(`div`,{onMouseDown:t=>{t.preventDefault(),E.send({type:`window.resize`,payload:{direction:e}})},style:{position:`fixed`,zIndex:1e3,...t}},e))})}var j=`(prefers-color-scheme: dark)`;function xe(e,t){return e===`system`?t?`dark`:`light`:e}function M(){return typeof window<`u`&&window.matchMedia(j).matches}function Se(e){let[t,n]=(0,_.useState)(M);(0,_.useEffect)(()=>{let e=window.matchMedia(j),t=()=>n(e.matches);return t(),e.addEventListener(`change`,t),()=>e.removeEventListener(`change`,t)},[]);let r=xe(e,t);return(0,_.useEffect)(()=>{document.documentElement.dataset.theme=r},[r]),r}function Ce(e,t){this.v=e,this.k=t}function we(e,t){(t==null||t>e.length)&&(t=e.length);for(var n=0,r=Array(t);n<t;n++)r[n]=e[n];return r}function N(e){if(Array.isArray(e))return e}function Te(e,t){var n=e==null?null:typeof Symbol<`u`&&e[Symbol.iterator]||e[`@@iterator`];if(n!=null){var r,i,a,o,s=[],c=!0,l=!1;try{if(a=(n=n.call(e)).next,t===0){if(Object(n)!==n)return;c=!1}else for(;!(c=(r=a.call(n)).done)&&(s.push(r.value),s.length!==t);c=!0);}catch(e){l=!0,i=e}finally{try{if(!c&&n.return!=null&&(o=n.return(),Object(o)!==o))return}finally{if(l)throw i}}return s}}function Ee(){throw TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}function De(e,t){return N(e)||Te(e,t)||Oe(e,t)||Ee()}function Oe(e,t){if(e){if(typeof e==`string`)return we(e,t);var n={}.toString.call(e).slice(8,-1);return n===`Object`&&e.constructor&&(n=e.constructor.name),n===`Map`||n===`Set`?Array.from(e):n===`Arguments`||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?we(e,t):void 0}}function ke(e){var t,n;function r(t,n){try{var a=e[t](n),o=a.value,s=o instanceof Ce;Promise.resolve(s?o.v:o).then(function(n){if(s){var c=t===`return`&&o.k?t:`next`;if(!o.k||n.done)return r(c,n);n=e[c](n).value}i(!!a.done,n)},function(e){r(`throw`,e)})}catch(e){i(2,e)}}function i(e,i){e===2?t.reject(i):t.resolve({value:i,done:e}),(t=t.next)?r(t.key,t.arg):n=null}this._invoke=function(e,i){return new Promise(function(a,o){var s={key:e,arg:i,resolve:a,reject:o,next:null};n?n=n.next=s:(t=n=s,r(e,i))})},typeof e.return!=`function`&&(this.return=void 0)}ke.prototype[typeof Symbol==`function`&&Symbol.asyncIterator||`@@asyncIterator`]=function(){return this},ke.prototype.next=function(e){return this._invoke(`next`,e)},ke.prototype.throw=function(e){return this._invoke(`throw`,e)},ke.prototype.return=function(e){return this._invoke(`return`,e)};var Ae=Object.entries,je=Object.setPrototypeOf,Me=Object.isFrozen,Ne=Object.getPrototypeOf,Pe=Object.getOwnPropertyDescriptor,Fe=Object.freeze,Ie=Object.seal,Le=Object.create,Re=typeof Reflect<`u`&&Reflect,ze=Re.apply,Be=Re.construct;Fe||=function(e){return e},Ie||=function(e){return e},ze||=function(e,t){var n=[...arguments].slice(2);return e.apply(t,n)},Be||=function(e){return new e(...[...arguments].slice(1))};var Ve=F(Array.prototype.forEach);Array.prototype.indexOf;var He=F(Array.prototype.lastIndexOf),Ue=F(Array.prototype.pop),We=F(Array.prototype.push),Ge=F(Array.prototype.slice),Ke=F(Array.prototype.splice),qe=Array.isArray,Je=ut(Set),Ye=F(Set.prototype.add),Xe=F(Set.prototype.has),Ze=F(String.prototype.toLowerCase),Qe=F(String.prototype.toString),$e=F(String.prototype.match),et=F(String.prototype.replace),P=F(String.prototype.indexOf),tt=F(String.prototype.trim),nt=F(Number.prototype.toString),rt=F(Boolean.prototype.toString),it=typeof BigInt>`u`?null:F(BigInt.prototype.toString),at=typeof Symbol>`u`?null:F(Symbol.prototype.toString),ot=F(Object.prototype.hasOwnProperty),st=F(Object.prototype.toString),ct=F(RegExp.prototype.test),lt=ut(TypeError);function F(e){return function(t){t instanceof RegExp&&(t.lastIndex=0);var n=[...arguments].slice(1);return ze(e,t,n)}}function ut(e){return function(){return Be(e,[...arguments])}}function I(e,t){let n=arguments.length>2&&arguments[2]!==void 0?arguments[2]:Ze;if(je&&je(e,null),!qe(t))return e;let r=t.length;for(;r--;){let i=t[r];if(typeof i==`string`){let e=n(i);e!==i&&(Me(t)||(t[r]=e),i=e)}e[i]=!0}return e}function dt(e){for(let t=0;t<e.length;t++)ot(e,t)||(e[t]=null);return e}function ft(e){let t=Le(null);for(let r of Ae(e)){var n=De(r,2);let i=n[0],a=n[1];ot(e,i)&&(t[i]=qe(a)?dt(a):a&&typeof a==`object`&&a.constructor===Object?ft(a):a)}return t}function pt(e){switch(typeof e){case`string`:return e;case`number`:return nt(e);case`boolean`:return rt(e);case`bigint`:return it?it(e):`0`;case`symbol`:return at?at(e):`Symbol()`;case`undefined`:return st(e);case`function`:case`object`:{if(e===null)return st(e);let t=e,n=mt(t,`toString`);if(typeof n==`function`){let e=n(t);return typeof e==`string`?e:st(e)}return st(e)}default:return st(e)}}function mt(e,t){for(;e!==null;){let n=Pe(e,t);if(n){if(n.get)return F(n.get);if(typeof n.value==`function`)return F(n.value)}e=Ne(e)}function n(){return null}return n}function ht(e,t){for(;e!==null;){let n=Pe(e,t);if(n)return n.get?F(n.get):null;e=Ne(e)}return null}function gt(e){try{return ct(e,``),!0}catch{return!1}}var _t=Fe(`a.abbr.acronym.address.area.article.aside.audio.b.bdi.bdo.big.blink.blockquote.body.br.button.canvas.caption.center.cite.code.col.colgroup.content.data.datalist.dd.decorator.del.details.dfn.dialog.dir.div.dl.dt.element.em.fieldset.figcaption.figure.font.footer.form.h1.h2.h3.h4.h5.h6.head.header.hgroup.hr.html.i.img.input.ins.kbd.label.legend.li.main.map.mark.marquee.menu.menuitem.meter.nav.nobr.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.shadow.slot.small.source.spacer.span.strike.strong.style.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.track.tt.u.ul.var.video.wbr`.split(`.`)),vt=Fe(`svg.a.altglyph.altglyphdef.altglyphitem.animatecolor.animatemotion.animatetransform.circle.clippath.defs.desc.ellipse.enterkeyhint.exportparts.filter.font.g.glyph.glyphref.hkern.image.inputmode.line.lineargradient.marker.mask.metadata.mpath.part.path.pattern.polygon.polyline.radialgradient.rect.stop.style.switch.symbol.text.textpath.title.tref.tspan.view.vkern`.split(`.`)),yt=Fe([`feBlend`,`feColorMatrix`,`feComponentTransfer`,`feComposite`,`feConvolveMatrix`,`feDiffuseLighting`,`feDisplacementMap`,`feDistantLight`,`feDropShadow`,`feFlood`,`feFuncA`,`feFuncB`,`feFuncG`,`feFuncR`,`feGaussianBlur`,`feImage`,`feMerge`,`feMergeNode`,`feMorphology`,`feOffset`,`fePointLight`,`feSpecularLighting`,`feSpotLight`,`feTile`,`feTurbulence`]),bt=Fe([`animate`,`color-profile`,`cursor`,`discard`,`font-face`,`font-face-format`,`font-face-name`,`font-face-src`,`font-face-uri`,`foreignobject`,`hatch`,`hatchpath`,`mesh`,`meshgradient`,`meshpatch`,`meshrow`,`missing-glyph`,`script`,`set`,`solidcolor`,`unknown`,`use`]),xt=Fe(`math.menclose.merror.mfenced.mfrac.mglyph.mi.mlabeledtr.mmultiscripts.mn.mo.mover.mpadded.mphantom.mroot.mrow.ms.mspace.msqrt.mstyle.msub.msup.msubsup.mtable.mtd.mtext.mtr.munder.munderover.mprescripts`.split(`.`)),St=Fe([`maction`,`maligngroup`,`malignmark`,`mlongdiv`,`mscarries`,`mscarry`,`msgroup`,`mstack`,`msline`,`msrow`,`semantics`,`annotation`,`annotation-xml`,`mprescripts`,`none`]),Ct=Fe([`#text`]),wt=Fe(`accept.action.align.alt.autocapitalize.autocomplete.autopictureinpicture.autoplay.background.bgcolor.border.capture.cellpadding.cellspacing.checked.cite.class.clear.color.cols.colspan.command.commandfor.controls.controlslist.coords.crossorigin.datetime.decoding.default.dir.disabled.disablepictureinpicture.disableremoteplayback.download.draggable.enctype.enterkeyhint.exportparts.face.for.headers.height.hidden.high.href.hreflang.id.inert.inputmode.integrity.ismap.kind.label.lang.list.loading.loop.low.max.maxlength.media.method.min.minlength.multiple.muted.name.nonce.noshade.novalidate.nowrap.open.optimum.part.pattern.placeholder.playsinline.popover.popovertarget.popovertargetaction.poster.preload.pubdate.radiogroup.readonly.rel.required.rev.reversed.role.rows.rowspan.spellcheck.scope.selected.shape.size.sizes.slot.span.srclang.start.src.srcset.step.style.summary.tabindex.title.translate.type.usemap.valign.value.width.wrap.xmlns`.split(`.`)),Tt=Fe(`accent-height.accumulate.additive.alignment-baseline.amplitude.ascent.attributename.attributetype.azimuth.basefrequency.baseline-shift.begin.bias.by.class.clip.clippathunits.clip-path.clip-rule.color.color-interpolation.color-interpolation-filters.color-profile.color-rendering.cx.cy.d.dx.dy.diffuseconstant.direction.display.divisor.dominant-baseline.dur.edgemode.elevation.end.exponent.fill.fill-opacity.fill-rule.filter.filterunits.flood-color.flood-opacity.font-family.font-size.font-size-adjust.font-stretch.font-style.font-variant.font-weight.fx.fy.g1.g2.glyph-name.glyphref.gradientunits.gradienttransform.height.href.id.image-rendering.in.in2.intercept.k.k1.k2.k3.k4.kerning.keypoints.keysplines.keytimes.lang.lengthadjust.letter-spacing.kernelmatrix.kernelunitlength.lighting-color.local.marker-end.marker-mid.marker-start.markerheight.markerunits.markerwidth.maskcontentunits.maskunits.max.mask.mask-type.media.method.mode.min.name.numoctaves.offset.operator.opacity.order.orient.orientation.origin.overflow.paint-order.path.pathlength.patterncontentunits.patterntransform.patternunits.pointer-events.points.preservealpha.preserveaspectratio.primitiveunits.r.rx.ry.radius.refx.refy.repeatcount.repeatdur.restart.result.rotate.scale.seed.shape-rendering.slope.specularconstant.specularexponent.spreadmethod.startoffset.stddeviation.stitchtiles.stop-color.stop-opacity.stroke-dasharray.stroke-dashoffset.stroke-linecap.stroke-linejoin.stroke-miterlimit.stroke-opacity.stroke.stroke-width.style.surfacescale.systemlanguage.tabindex.tablevalues.targetx.targety.transform.transform-origin.text-anchor.text-decoration.text-orientation.text-rendering.textlength.type.u1.u2.unicode.values.vector-effect.viewbox.visibility.version.vert-adv-y.vert-origin-x.vert-origin-y.width.word-spacing.wrap.writing-mode.xchannelselector.ychannelselector.x.x1.x2.xmlns.y.y1.y2.z.zoomandpan`.split(`.`)),Et=Fe(`accent.accentunder.align.bevelled.close.columnalign.columnlines.columnspacing.columnspan.denomalign.depth.dir.display.displaystyle.encoding.fence.frame.height.href.id.largeop.length.linethickness.lquote.lspace.mathbackground.mathcolor.mathsize.mathvariant.maxsize.minsize.movablelimits.notation.numalign.open.rowalign.rowlines.rowspacing.rowspan.rspace.rquote.scriptlevel.scriptminsize.scriptsizemultiplier.selection.separator.separators.stretchy.subscriptshift.supscriptshift.symmetric.voffset.width.xmlns`.split(`.`)),Dt=Fe([`xlink:href`,`xml:id`,`xlink:title`,`xml:space`,`xmlns:xlink`]),Ot=Ie(/{{[\w\W]*|^[\w\W]*}}/g),kt=Ie(/<%[\w\W]*|^[\w\W]*%>/g),At=Ie(/\${[\w\W]*/g),jt=Ie(/^data-[\-\w.\u00B7-\uFFFF]+$/),Mt=Ie(/^aria-[\-\w]+$/),Nt=Ie(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp|matrix):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),Pt=Ie(/^(?:\w+script|data):/i),Ft=Ie(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),It=Ie(/^html$/i),Lt=Ie(/^[a-z][.\w]*(-[.\w]+)+$/i),Rt=Ie(/<[/\w!]/g),zt=Ie(/<[/\w]/g),Bt=Ie(/<\/no(script|embed|frames)/i),Vt=Ie(/\/>/i),Ht={element:1,attribute:2,text:3,cdataSection:4,entityReference:5,entityNode:6,processingInstruction:7,comment:8,document:9,documentType:10,documentFragment:11,notation:12},Ut=Fe(I({},[`style`,`script`,`xmp`,`iframe`,`noembed`,`noframes`,`plaintext`,`noscript`])),Wt=function(){return typeof window>`u`?null:window},Gt=function(e,t){if(typeof e!=`object`||typeof e.createPolicy!=`function`)return null;let n=null,r=`data-tt-policy-suffix`;t&&t.hasAttribute(r)&&(n=t.getAttribute(r));let i=`dompurify`+(n?`#`+n:``);try{return e.createPolicy(i,{createHTML(e){return e},createScriptURL(e){return e}})}catch{return console.warn(`TrustedTypes policy `+i+` could not be created.`),null}},Kt=function(){return{afterSanitizeAttributes:[],afterSanitizeElements:[],afterSanitizeShadowDOM:[],beforeSanitizeAttributes:[],beforeSanitizeElements:[],beforeSanitizeShadowDOM:[],uponSanitizeAttribute:[],uponSanitizeElement:[],uponSanitizeShadowNode:[]}},qt=function(e,t,n,r){return ot(e,t)&&qe(e[t])?I(r.base?ft(r.base):{},e[t],r.transform):n},L=function(e,t,n){let r=ot(e,t)?e[t]:void 0;return r&&typeof r==`object`?ft(r):n()};function Jt(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:Wt(),t=e=>Jt(e);if(t.version=`3.4.17`,t.removed=[],!e||!e.document||e.document.nodeType!==Ht.document||!e.Element)return t.isSupported=!1,t;let n=e.document,r=n,i=r.currentScript;e.DocumentFragment;let a=e.HTMLTemplateElement,o=e.Node,s=e.Element,c=e.NodeFilter;e.NamedNodeMap===void 0&&(e.NamedNodeMap||e.MozNamedAttrMap),e.HTMLFormElement;let l=e.DOMParser,u=e.trustedTypes,d=s.prototype,f=mt(d,`cloneNode`),p=mt(d,`remove`),m=mt(d,`removeAttributeNode`),h=mt(d,`nextSibling`),g=mt(d,`childNodes`),_=mt(d,`parentNode`),v=mt(d,`shadowRoot`),y=mt(d,`attributes`),b=o&&o.prototype?mt(o.prototype,`nodeType`):null,x=o&&o.prototype?mt(o.prototype,`nodeName`):null,S=o&&o.prototype?mt(o.prototype,`ownerDocument`):null,C=function(e){return b?b(e):e.nodeType},ee=function(e){return x?x(e):e.nodeName},w=ht(d,`namespaceURI`),te=function(e){return w?w(e):e.namespaceURI};if(typeof a==`function`){let e=n.createElement(`template`);e.content&&e.content.ownerDocument&&(n=e.content.ownerDocument)}let T,ne=``,E,re=!1,ie=0,ae=function(){if(ie>0)throw lt(`A configured TRUSTED_TYPES_POLICY callback (createHTML or createScriptURL) must not call DOMPurify.sanitize, as that causes infinite recursion. Do not pass a policy whose callbacks wrap DOMPurify as TRUSTED_TYPES_POLICY; see the "DOMPurify and Trusted Types" section of the README.`)},oe=function(e){ae(),ie++;try{return T.createHTML(e)}finally{ie--}},se=function(e){ae(),ie++;try{return T.createScriptURL(e)}finally{ie--}},ce=function(){return re||=(E=Gt(u,i),!0),E},le=n,ue=le.implementation,D=le.createNodeIterator,de=le.createDocumentFragment,fe=le.getElementsByTagName,pe=r.importNode,O=Kt();t.isSupported=typeof Ae==`function`&&typeof _==`function`&&ue&&ue.createHTMLDocument!==void 0;let k=Ot,me=kt,he=At,ge=jt,_e=Mt,ve=Pt,ye=Ft,be=Lt,A=Nt,j=null,xe=I({},[..._t,...vt,...yt,...xt,...Ct]),M=null,Se=I({},[...wt,...Tt,...Et,...Dt]),Ce=Object.seal(Le(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),we=null,N=null,Te=Object.seal(Le(null,{tagCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeCheck:{writable:!0,configurable:!1,enumerable:!0,value:null}})),Ee=!0,De=!0,Oe=!1,ke=!0,je=!1,Me=!0,Ne=!1,Pe=!1,Re=null,ze=null,Be=!1,nt=!1,rt=!1,it=!1,at=!0,st=!1,F=`user-content-`,ut=!0,dt=!1,Yt=null,Xt={},Zt=null,Qt=I({},`annotation-xml.audio.colgroup.desc.foreignobject.head.iframe.math.mi.mn.mo.ms.mtext.noembed.noframes.noscript.plaintext.script.selectedcontent.style.svg.template.thead.title.video.xmp`.split(`.`)),$t=null,en=I({},[`audio`,`video`,`img`,`source`,`image`,`track`]),R=null,tn=I({},[`alt`,`class`,`for`,`id`,`label`,`name`,`pattern`,`placeholder`,`role`,`summary`,`title`,`value`,`style`,`xmlns`]),nn=`http://www.w3.org/1998/Math/MathML`,rn=`http://www.w3.org/2000/svg`,an=`http://www.w3.org/1999/xhtml`,on=an,sn=!1,cn=null,ln=I({},[nn,rn,an],Qe),un=Fe([`mi`,`mo`,`mn`,`ms`,`mtext`]),dn=I({},un),fn=Fe([`annotation-xml`]),pn=I({},fn),mn=I({},[`title`,`style`,`font`,`a`,`script`]),hn=null,gn=[`application/xhtml+xml`,`text/html`],_n=null,vn=null,yn=n.createElement(`form`),bn=function(e){return e instanceof RegExp||e instanceof Function},xn=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};if(vn&&vn===e)return;e&&typeof e==`object`||(e={}),e=ft(e),hn=gn.indexOf(e.PARSER_MEDIA_TYPE)===-1?`text/html`:e.PARSER_MEDIA_TYPE,_n=hn===`application/xhtml+xml`?Qe:Ze,j=qt(e,`ALLOWED_TAGS`,xe,{transform:_n}),M=qt(e,`ALLOWED_ATTR`,Se,{transform:_n}),cn=qt(e,`ALLOWED_NAMESPACES`,ln,{transform:Qe}),R=qt(e,`ADD_URI_SAFE_ATTR`,tn,{transform:_n,base:tn}),$t=qt(e,`ADD_DATA_URI_TAGS`,en,{transform:_n,base:en}),Zt=qt(e,`FORBID_CONTENTS`,Qt,{transform:_n}),we=qt(e,`FORBID_TAGS`,ft({}),{transform:_n}),N=qt(e,`FORBID_ATTR`,ft({}),{transform:_n}),Xt=ot(e,`USE_PROFILES`)?e.USE_PROFILES&&typeof e.USE_PROFILES==`object`?ft(e.USE_PROFILES):e.USE_PROFILES:!1,Ee=e.ALLOW_ARIA_ATTR!==!1,De=e.ALLOW_DATA_ATTR!==!1,Oe=e.ALLOW_UNKNOWN_PROTOCOLS||!1,ke=e.ALLOW_SELF_CLOSE_IN_ATTR!==!1,je=e.SAFE_FOR_TEMPLATES||!1,Me=e.SAFE_FOR_XML!==!1,Ne=e.WHOLE_DOCUMENT||!1,nt=e.RETURN_DOM||!1,rt=e.RETURN_DOM_FRAGMENT||!1,it=e.RETURN_TRUSTED_TYPE||!1,Be=e.FORCE_BODY||!1,at=e.SANITIZE_DOM!==!1,st=e.SANITIZE_NAMED_PROPS||!1,ut=e.KEEP_CONTENT!==!1,dt=e.IN_PLACE||!1,A=gt(e.ALLOWED_URI_REGEXP)?e.ALLOWED_URI_REGEXP:Nt,on=typeof e.NAMESPACE==`string`?e.NAMESPACE:an,dn=L(e,`MATHML_TEXT_INTEGRATION_POINTS`,()=>I({},un)),pn=L(e,`HTML_INTEGRATION_POINTS`,()=>I({},fn));let t=L(e,`CUSTOM_ELEMENT_HANDLING`,()=>Le(null));if(Ce=Le(null),ot(t,`tagNameCheck`)&&bn(t.tagNameCheck)&&(Ce.tagNameCheck=t.tagNameCheck),ot(t,`attributeNameCheck`)&&bn(t.attributeNameCheck)&&(Ce.attributeNameCheck=t.attributeNameCheck),ot(t,`allowCustomizedBuiltInElements`)&&typeof t.allowCustomizedBuiltInElements==`boolean`&&(Ce.allowCustomizedBuiltInElements=t.allowCustomizedBuiltInElements),Ie(Ce),je&&(De=!1),rt&&(nt=!0),Xt&&(j=I({},Ct),M=Le(null),Xt.html===!0&&(I(j,_t),I(M,wt)),Xt.svg===!0&&(I(j,vt),I(M,Tt),I(M,Dt)),Xt.svgFilters===!0&&(I(j,yt),I(M,Tt),I(M,Dt)),Xt.mathMl===!0&&(I(j,xt),I(M,Et),I(M,Dt))),Te.tagCheck=null,Te.attributeCheck=null,ot(e,`ADD_TAGS`)&&(typeof e.ADD_TAGS==`function`?Te.tagCheck=e.ADD_TAGS:qe(e.ADD_TAGS)&&(j===xe&&(j=ft(j)),I(j,e.ADD_TAGS,_n))),ot(e,`ADD_ATTR`)&&(typeof e.ADD_ATTR==`function`?Te.attributeCheck=e.ADD_ATTR:qe(e.ADD_ATTR)&&(M===Se&&(M=ft(M)),I(M,e.ADD_ATTR,_n))),ot(e,`ADD_FORBID_CONTENTS`)&&qe(e.ADD_FORBID_CONTENTS)&&(Zt===Qt&&(Zt=ft(Zt)),I(Zt,e.ADD_FORBID_CONTENTS,_n)),ut&&(j[`#text`]=!0),Ne&&I(j,[`html`,`head`,`body`]),j.table&&(I(j,[`tbody`]),delete we.tbody),e.TRUSTED_TYPES_POLICY){if(typeof e.TRUSTED_TYPES_POLICY.createHTML!=`function`)throw lt(`TRUSTED_TYPES_POLICY configuration option must provide a "createHTML" hook.`);if(typeof e.TRUSTED_TYPES_POLICY.createScriptURL!=`function`)throw lt(`TRUSTED_TYPES_POLICY configuration option must provide a "createScriptURL" hook.`);let t=T;T=e.TRUSTED_TYPES_POLICY;try{ne=oe(``)}catch(e){throw T=t,e}}else e.TRUSTED_TYPES_POLICY===null?(T=void 0,ne=``):(T===void 0&&(T=ce()),T&&typeof ne==`string`&&(ne=oe(``)));Fe&&Fe(e),vn=e},Sn=I({},[...vt,...yt,...bt]),Cn=I({},[...xt,...St]),wn=function(e,t,n){return t.namespaceURI===an?e===`svg`:t.namespaceURI===nn?e===`svg`&&(n===`annotation-xml`||dn[n]):!!Sn[e]},Tn=function(e,t,n){return t.namespaceURI===an?e===`math`:t.namespaceURI===rn?e===`math`&&pn[n]:!!Cn[e]},En=function(e,t,n){return t.namespaceURI===rn&&!pn[n]||t.namespaceURI===nn&&!dn[n]?!1:!Cn[e]&&(mn[e]||!Sn[e])},Dn=function(e){let t=te(e),n=Ze(ee(e)),r=_(e),i,a;return r&&C(r)===Ht.element?(i={namespaceURI:te(r)},a=Ze(ee(r))):(i={namespaceURI:on},a=`template`),cn[t]?t===rn?wn(n,i,a):t===nn?Tn(n,i,a):t===an?En(n,i,a):!!(hn===`application/xhtml+xml`&&cn[t]):!1},On=function(e){We(t.removed,{element:e});try{_(e).removeChild(e)}catch{if(p(e),!_(e))throw lt(`a node selected for removal could not be detached from its tree and cannot be safely returned; refusing to sanitize in place`)}},kn=function(e,t,n){try{m(e,t)}catch{try{e.removeAttribute(n)}catch{}}},An=function(e){Pn(e);let t=g(e);t&&Ve(Ge(t),e=>{try{p(e)}catch{}});let n=C(e)===Ht.element?y(e):null;if(n)for(let t=n.length-1;t>=0;--t){let r=n[t],i=r&&r.name;typeof i==`string`&&kn(e,r,i)}},jn=function(e,n,r){if(!r)try{r=n.getAttributeNode(e)}catch{r=null}We(t.removed,{attribute:r||null,from:n});try{r?m(n,r):n.removeAttribute(e)}catch{try{n.removeAttribute(e)}catch{}}if(e===`is`){if(nt||rt)try{On(n)}catch{}else try{n.setAttribute(e,``)}catch{}}},Mn=function(e){let t=y(e);if(t)for(let n=t.length-1;n>=0;--n){let r=t[n],i=r&&r.name;typeof i!=`string`||M[_n(i)]||kn(e,r,i)}},Nn=function(e,t){let n=arguments.length>2&&arguments[2]!==void 0&&arguments[2],r=[e];for(;r.length>0;){let e=r.pop();if(t(e)===!1)continue;if(n&&C(e)===Ht.element){let t=v(e);Yn(t)&&r.push(t)}let i=g(e);if(i)for(let e=i.length-1;e>=0;--e)r.push(i[e])}},Pn=function(e){Nn(e,e=>{C(e)===Ht.element&&Mn(e)})},Fn=function(e){let t=[];return Nn(e,e=>{t.push(e)},!0),t},In=function(e,t){let n=Je();Ve(Fn(e),e=>{C(e)===Ht.element&&Ye(n,e)}),Ve(t,e=>{C(e)===Ht.element&&!Xe(n,e)&&Mn(e)})},Ln=function(e,n){let r=!1;return Ve(t.removed,t=>{t.element&&(r||=t.element===e,Pn(t.element))}),In(e,n),r},Rn=function(e,t){let n=Yt,r=null,i=()=>(r||(r=Je(),Ve(t,e=>{Ye(r,e)})),r);for(let t=0;;t++){let r=Fn(e),a=[e],o=!1;if(Ve(r,e=>{C(e)===Ht.documentFragment?We(a,e):!o&&!Xe(n,e)&&(o=Xe(i(),e))}),!o)return;if(t>=8)throw lt(`the tree kept changing during in-place sanitization; refusing to return it`);Ve(a,(t,n)=>{zn(t,n>0,e,i())})}},zn=function(e,t,n,r){let i=Wn(e),a;for(;a=i.nextNode();)Xe(r,a)&&!Xe(Yt,a)&&(t&&Zn(O.uponSanitizeShadowNode,a,null),rr(a,n),ur(a,n),Yn(a.content)&&dr(a.content))},Bn=function(e){Yt&&Ye(Yt,e)},Vn=function(e,t){return Me?e===`patchsrc`||e===`for`&&t!==`label`&&t!==`output`:!1},Hn=function(e){Me&&Nn(e,e=>{let t=C(e);if(t===Ht.processingInstruction||t===Ht.comment&&ct(zt,e.data)){try{p(e)}catch{}return!1}if(t===Ht.element){let t=e,n=_n(ee(e));try{t.hasAttribute&&t.hasAttribute(`patchsrc`)&&t.removeAttribute(`patchsrc`),t.hasAttribute&&t.hasAttribute(`for`)&&Vn(`for`,n)&&t.removeAttribute(`for`)}catch{}}return!0})},Un=function(e){let t=null,r=null;if(Be)e=`<remove></remove>`+e;else{let t=$e(e,/^[\r\n\t ]+/);r=t&&t[0]}hn===`application/xhtml+xml`&&on===an&&(e=`<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>`+e+`</body></html>`);let i=T?oe(e):e;if(on===an)try{t=new l().parseFromString(i,hn)}catch{}if(!t||!t.documentElement){t=ue.createDocument(on,`template`,null);try{t.documentElement.innerHTML=sn?ne:i}catch{}}let a=t.body||t.documentElement;return e&&r&&a.insertBefore(n.createTextNode(r),a.childNodes[0]||null),on===an?fe.call(t,Ne?`html`:`body`)[0]:Ne?t.documentElement:a},Wn=function(e){let t=S?S(e):e.ownerDocument;return D.call(t||e,e,c.SHOW_ELEMENT|c.SHOW_COMMENT|c.SHOW_TEXT|c.SHOW_PROCESSING_INSTRUCTION|c.SHOW_CDATA_SECTION,null)},Gn=function(e){return e=et(e,k,` `),e=et(e,me,` `),e=et(e,he,` `),e},Kn=function(e){qn(e);let t=e.querySelectorAll?.call(e,`template`);t&&Ve(t,e=>{Yn(e.content)&&Kn(e.content)})},qn=function(e){e.normalize();let t=S?S(e):e.ownerDocument,n=D.call(t||e,e,c.SHOW_TEXT|c.SHOW_COMMENT|c.SHOW_CDATA_SECTION|c.SHOW_PROCESSING_INSTRUCTION,null),r=n.nextNode();for(;r;)r.data=Gn(r.data),r=n.nextNode()},Jn=function(e){let t=x?x(e):null;return typeof t!=`string`||_n(t)!==`form`?!1:typeof e.nodeName!=`string`||typeof e.textContent!=`string`||typeof e.removeChild!=`function`||e.attributes!==y(e)||typeof e.removeAttribute!=`function`||typeof e.removeAttributeNode!=`function`||typeof e.getAttributeNode!=`function`||typeof e.setAttribute!=`function`||typeof e.namespaceURI!=`string`||typeof e.insertBefore!=`function`||typeof e.hasChildNodes!=`function`||e.nodeType!==b(e)||e.childNodes!==g(e)},Yn=function(e){if(!b||typeof e!=`object`||!e)return!1;try{return b(e)===Ht.documentFragment}catch{return!1}},Xn=function(e){if(!b||typeof e!=`object`||!e)return!1;try{return typeof b(e)==`number`}catch{return!1}};function Zn(e,n,r){e.length!==0&&Ve(e,e=>{e.call(t,n,r,vn)})}let Qn=function(e,t){return!!(Me&&e.hasChildNodes()&&!Xn(e.firstElementChild)&&ct(Rt,e.textContent)&&ct(Rt,e.innerHTML)||Me&&Ut[t]&&C(e)===Ht.element&&te(e)===an&&(Xn(e.firstElementChild)||typeof e.textContent==`string`&&ct(Rt,e.textContent))||e.nodeType===Ht.processingInstruction||Me&&e.nodeType===Ht.comment&&ct(zt,e.data))},$n=function(e,t){return e instanceof RegExp?ct(e,t):e instanceof Function&&!!e(t,...[...arguments].slice(2))},er=function(e,t,n){if(!we[t]&&or(t)&&$n(Ce.tagNameCheck,t))return!1;if(ut&&!Zt[t]&&!Zt[Ze(t)]){let t=_(e),r=g(e);if(r&&t){let i=r.length;for(let a=i-1;a>=0;--a){let i=e===n?f(r[a],!0):r[a];t.insertBefore(i,h(e))}}}return On(e),!0},tr=function(e,t,n,r){return e.length===0?t:t===n||t===r?ft(t):t},nr=function(e,t){return e===t||_(e)!==null?!1:(dt&&Pn(e),!0)},rr=function(e,n){if(Bn(e),Zn(O.beforeSanitizeElements,e,null),nr(e,n))return!0;if(Jn(e))return On(e),!0;let r=_n(ee(e));if(j=tr(O.uponSanitizeElement,j,xe,Re),Zn(O.uponSanitizeElement,e,{tagName:r,allowedTags:j}),nr(e,n))return!0;if(Qn(e,r))return On(e),!0;if(we[r]||!(Te.tagCheck instanceof Function&&Te.tagCheck(r))&&!j[r]){let t=er(e,r,n);return t===!1&&(Zn(O.afterSanitizeElements,e,null),nr(e,n))?!0:t}if(C(e)===Ht.element&&!Dn(e)||(r===`noscript`||r===`noembed`||r===`noframes`)&&ct(Bt,e.innerHTML))return On(e),!0;if(je&&e.nodeType===Ht.text){let n=Gn(e.textContent);e.textContent!==n&&(We(t.removed,{element:e.cloneNode()}),e.textContent=n)}return Zn(O.afterSanitizeElements,e,null),nr(e,n)},ir=function(e,t,r){if(N[t]||Vn(t,e)||at&&(t===`id`||t===`name`)&&(r in n||r in yn))return!1;let i=M[t]||Te.attributeCheck instanceof Function&&Te.attributeCheck(t,e);return De&&ct(ge,t)||Ee&&ct(_e,t)?!0:i?R[t]||ct(A,et(r,ye,``))||(t===`src`||t===`xlink:href`||t===`href`)&&e!==`script`&&P(r,`data:`)===0&&$t[e]||Oe&&!ct(ve,et(r,ye,``))?!0:!r:or(e)&&$n(Ce.tagNameCheck,e)&&$n(Ce.attributeNameCheck,t,e)||t===`is`&&Ce.allowCustomizedBuiltInElements&&$n(Ce.tagNameCheck,r)},ar=I({},[`annotation-xml`,`color-profile`,`font-face`,`font-face-format`,`font-face-name`,`font-face-src`,`font-face-uri`,`missing-glyph`]),or=function(e){return!ar[Ze(e)]&&ct(be,e)},sr=function(e,t,n,r){if(T&&typeof u==`object`&&typeof u.getAttributeType==`function`&&!n)switch(u.getAttributeType(e,t)){case`TrustedHTML`:return oe(r);case`TrustedScriptURL`:return se(r)}return r},cr=function(e,t,n,r){try{return n?e.setAttributeNS(n,t,r):e.setAttribute(t,r),!Jn(e)||(On(e),!1)}catch{return jn(t,e),!1}},lr=function(e,t){return Me&&ct(/((--!?|])>)|<\/(style|script|title|xmp|textarea|noscript|iframe|noembed|noframes)/i,t)?!0:Ze(e)===`attributename`&&$e(t,`href`)!==null},ur=function(e,n){if(Zn(O.beforeSanitizeAttributes,e,null),nr(e,n))return;let r=e.attributes;if(!r||Jn(e))return;M=tr(O.uponSanitizeAttribute,M,Se,ze);let i={attrName:``,attrValue:``,keepAttr:!0,allowedAttributes:M,forceKeepAttr:void 0},a=r.length,o=_n(e.nodeName);for(;a--;){let n=r[a],s=n.name,c=n.namespaceURI,l=n.value,u=_n(s),d=l,f=s===`value`?d:tt(d),p=!1;i.attrName=u,i.attrValue=f,i.keepAttr=!0,i.forceKeepAttr=void 0,Zn(O.uponSanitizeAttribute,e,i),f=i.attrValue,st&&(u===`id`||u===`name`)&&P(f,F)!==0&&(jn(s,e,n),f=F+f,p=!0),lr(s,f)?jn(s,e,n):i.forceKeepAttr||(i.keepAttr?!ke&&ct(Vt,f)?jn(s,e,n):(je&&(f=Gn(f)),ir(o,u,f)?(f=sr(o,u,c,f),f!==d&&cr(e,s,c,f)&&p&&Ue(t.removed)):jn(s,e,n)):jn(s,e,n))}Zn(O.afterSanitizeAttributes,e,null),nr(e,n)},dr=function(e){let t=null,n=Wn(e);for(Zn(O.beforeSanitizeShadowDOM,e,null);t=n.nextNode();)if(Zn(O.uponSanitizeShadowNode,t,null),rr(t,e),ur(t,e),Yn(t.content)&&dr(t.content),C(t)===Ht.element){let e=v(t);Yn(e)&&(fr(e),dr(e))}je&&qn(e),Zn(O.afterSanitizeShadowDOM,e,null)},fr=function(e){let t=[{node:e,shadow:null}];for(;t.length>0;){let e=t.pop();if(e.shadow){dr(e.shadow);continue}let n=e.node,r=C(n)===Ht.element,i=g(n);if(i)for(let e=i.length-1;e>=0;--e)t.push({node:i[e],shadow:null});if(r){let e=x?x(n):null;if(typeof e==`string`&&_n(e)===`template`){let e=n.content;Yn(e)&&t.push({node:e,shadow:null})}}if(r){let e=v(n);Yn(e)&&t.push({node:null,shadow:e},{node:e,shadow:null})}}};return t.sanitize=function(e){let n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},i=null,a=null,o=null,s=null;if(sn=!e,sn&&(e=`<!-->`),typeof e!=`string`&&!Xn(e)&&(e=pt(e),typeof e!=`string`))throw lt(`dirty is not a string, aborting`);if(!t.isSupported)return e;Pe?(j=Re,M=ze):xn(n),(O.uponSanitizeElement.length>0||O.uponSanitizeAttribute.length>0)&&(j=ft(j)),O.uponSanitizeAttribute.length>0&&(M=ft(M)),t.removed=[];let c=dt&&typeof e!=`string`&&Xn(e),l=[],u=Yt;if(c){Hn(e);let t=ee(e);if(typeof t==`string`){let n=_n(t);if(!j[n]||we[n])throw An(e),lt(`root node is forbidden and cannot be sanitized in-place`)}if(Jn(e))throw An(e),lt(`root node is clobbered and cannot be sanitized in-place`);l=Fn(e),Yt=Je()}else if(Xn(e))i=Un(`<!---->`),a=i.ownerDocument.importNode(e,!0),a.nodeType===Ht.element&&a.nodeName===`BODY`||a.nodeName===`HTML`?i=a:i.appendChild(a),fr(i);else{if(!nt&&!je&&!Ne&&e.indexOf(`<`)===-1)return T&&it?oe(e):e;if(i=Un(e),!i)return nt?null:it?ne:``}i&&Be&&On(i.firstChild);let d=c?e:i;try{c&&fr(e);let t=Wn(d);for(;o=t.nextNode();)rr(o,d),ur(o,d),Yn(o.content)&&dr(o.content);c&&Rn(e,l)}catch(t){throw c&&(An(e),Ln(e,l)),t}finally{Yt=u}if(c){if(Ln(e,l))throw lt(`a node selected for removal could not be safely returned; refusing to sanitize in place`);return je&&Kn(e),e}if(nt){if(je&&Kn(i),rt)for(s=de.call(i.ownerDocument);i.firstChild;)s.appendChild(i.firstChild);else s=i;return(M.shadowroot||M.shadowrootmode)&&(s=pe.call(r,s,!0)),s}let f=Ne?i.outerHTML:i.innerHTML;return Ne&&j[`!doctype`]&&i.ownerDocument&&i.ownerDocument.doctype&&i.ownerDocument.doctype.name&&ct(It,i.ownerDocument.doctype.name)&&(f=`<!DOCTYPE `+i.ownerDocument.doctype.name+`>
`+f),je&&(f=Gn(f)),T&&it?oe(f):f},t.setConfig=function(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{};xn(e),Pe=!0,Re=j,ze=M},t.clearConfig=function(){vn=null,Pe=!1,Re=null,ze=null,T=E,ne=``},t.isValidAttribute=function(e,t,n){vn||xn({});let r=_n(e),i=_n(t);return typeof n==`string`&&(lr(t,n)||!ke&&ct(Vt,n))?!1:ir(r,i,n)},t.addHook=function(e,t){typeof t==`function`&&ot(O,e)&&We(O[e],t)},t.removeHook=function(e,t){if(ot(O,e)){if(t!==void 0){let n=He(O[e],t);return n===-1?void 0:Ke(O[e],n,1)[0]}return Ue(O[e])}},t.removeHooks=function(e){ot(O,e)&&(O[e]=[])},t.removeAllHooks=function(){O=Kt()},t}var Yt=Jt();function Xt(){return{async:!1,breaks:!1,extensions:null,gfm:!0,hooks:null,pedantic:!1,renderer:null,silent:!1,tokenizer:null,walkTokens:null}}var Zt=Xt();function Qt(e){Zt=e}var $t={exec:()=>null};function en(e){let t=[];return n=>{let r=Math.max(0,Math.min(3,n-1)),i=t[r];return i||(i=e(r),t[r]=i),i}}function R(e,t=``){let n=typeof e==`string`?e:e.source,r={replace:(e,t)=>{let i=typeof t==`string`?t:t.source;return i=i.replace(nn.caret,`$1`),n=n.replace(e,i),r},getRegex:()=>new RegExp(n,t)};return r}var tn=((e=``)=>{try{return!!RegExp(`(?<=1)(?<!1)`+e)}catch{return!1}})(),nn={codeRemoveIndent:/^(?: {0,3}\t| {1,4})/gm,listInterruptsParagraph:/^ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/,outputLinkReplace:/\\([\[\]])/g,indentCodeCompensation:/^(\s+)(?:```)/,beginningSpace:/^\s+/,endingHash:/#$/,startingSpaceChar:/^ /,endingSpaceChar:/ $/,endingSpaceTabChar:/[ \t]$/,nonSpaceChar:/[^ ]/,newLineCharGlobal:/\n/g,tabCharGlobal:/\t/g,leadingSpaceTab:/^[ \t]+/,multipleSpaceGlobal:/\s+/g,blankLine:/^[ \t]*$/,doubleBlankLine:/\n[ \t]*\n[ \t]*$/,blockquoteStart:/^ {0,3}>/,blockquoteSetextReplace:/\n {0,3}((?:=+|-+)[ \t]*)(?=\n|$)/g,blockquoteSetextReplace2:/^ {0,3}>[ \t]?/gm,blockquoteMarkerWhitespace:/^( {0,3}>)([ \t]+)/gm,listReplaceNesting:/^ {1,4}(?=( {4})*[^ ])/g,listIsTask:/^\[[ xX]\][ \t]+\S/,listReplaceTask:/^\[[ xX]\][ \t]+/,listTaskCheckbox:/\[[ xX]\]/,anyLine:/\n.*\n/,hrefBrackets:/^<(.*)>$/,tableDelimiter:/[:|]/,tableAlignChars:/^\||\| *$/g,tableRowBlankLine:/\n[ \t]*$/,tableAlignRight:/^ *-+: *$/,tableAlignCenter:/^ *:-+: *$/,tableAlignLeft:/^ *:-+ *$/,startATag:/^<a /i,endATag:/^<\/a>/i,startPreScriptTag:/^<(pre|code|kbd|script)(\s|>)/i,endPreScriptTag:/^<\/(pre|code|kbd|script)(\s|>)/i,startAngleBracket:/^</,endAngleBracket:/>$/,pedanticHrefTitle:/^([^'"]*[^\s])\s+(['"])(.*)\2/,unicodeAlphaNumeric:/[\p{L}\p{N}]/u,numericCharacterReference:/&#(?:(\d{1,7})|[Xx]([A-Fa-f0-9]{1,6}));/,numericCharacterReferenceOrAmpersand:/&#(?:(\d{1,7})|[Xx]([A-Fa-f0-9]{1,6}));|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,escapeTest:/[&<>"']/,escapeReplace:/[&<>"']/g,escapeTestNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,escapeReplaceNoEncode:/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/g,caret:/(^|[^\[])\^/g,percentDecode:/%25/g,findPipe:/\|/g,splitPipe:/ \|/,slashPipe:/\\\|/g,carriageReturn:/\r\n|\r/g,spaceLine:/^ +$/gm,notSpaceStart:/^\S*/,endingNewline:/\n$/,listItemRegex:e=>RegExp(`^( {0,3}${e})((?:[	 ][^\\n]*)?(?:\\n|$))`),nextBulletRegex:en(e=>RegExp(`^ {0,${e}}(?:[*+-]|\\d{1,9}[.)])((?:[ 	][^\\n]*)?(?:\\n|$))`)),hrRegex:en(e=>RegExp(`^ {0,${e}}((?:-[ 	]*){3,}|(?:_[ 	]*){3,}|(?:\\*[ 	]*){3,})(?:\\n+|$)`)),fencesBeginRegex:en(e=>RegExp(`^ {0,${e}}(?:\`\`\`|~~~)`)),headingBeginRegex:en(e=>RegExp(`^ {0,${e}}#{1,6}(?:\\s|$)`)),pedanticHeadingBeginRegex:en(e=>RegExp(`^ {0,${e}}#`)),htmlBeginRegex:en(e=>RegExp(`^ {0,${e}}(?:</?(?:${vn})(?: +|$|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)`,`i`)),blockquoteBeginRegex:en(e=>RegExp(`^ {0,${e}}>`)),nestedContainerMarkers:/^(?: {0,3}(?:(?:[*+-]|\d{1,9}[.)])[ \t]+|>[ \t]?))+/},rn=/^(?:[ \t]*(?:\n|$))+/,an=/^((?: {4}| {0,3}\t)[^\n]+(?:\n(?:[ \t]*(?:\n|$))*)?)+/,on=/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}(?:(?=`)\1`*|(?=~)\1~*) *(?=\n|$)|$)/,sn=/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,cn=/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,ln=/ {0,3}(?:[*+-]|\d{1,9}[.)])/,un=/^(?!bull |blockCode|fences|blockquote|heading|html|table)((?:.|\n(?!\s*?\n|bull |fences|blockquote|heading|hr|html|table))+?)\n {0,3}(=+|-+)[ \t]*(?:\n+|$)/,dn=R(un).replace(/bull/g,ln).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}(?:\s|$)/).replace(/hr/g,/ {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/\|table/g,``).getRegex(),fn=R(un).replace(/bull/g,ln).replace(/blockCode/g,/(?: {4}| {0,3}\t)/).replace(/fences/g,/ {0,3}(?:`{3,}|~{3,})/).replace(/blockquote/g,/ {0,3}>/).replace(/heading/g,/ {0,3}#{1,6}(?:\s|$)/).replace(/hr/g,/ {0,3}(?:(?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/).replace(/html/g,/ {0,3}<[^\n>]+>\n/).replace(/table/g,/ {0,3}\|?(?:[:\- ]*\|)+[\:\- ]*\n/).getRegex(),pn=/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table|[ \t]+\n)[^\n]+)*)/,mn=/^[^\n]+/,hn=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\\n]|\n(?![ \t]*\n))+/,gn=R(/^ {0,3}\[(label)\]: *(?:\n[ \t]*)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n[ \t]*)?| *\n[ \t]*)(title))? *(?:\n+|$)/).replace(`label`,hn).replace(`title`,/(?:"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\\n]|\n(?!\n))*'|\((?:\\[\s\S]|[^()\\])*\))/).getRegex(),_n=R(/^(bull)([ \t][^\n]*?)?(?:\n|$)/).replace(/bull/g,ln).getRegex(),vn=`address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|search|section|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul`,yn=/<!--(?:-?>|[\s\S]*?(?:-->|$))/,bn=R(`^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n*|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>[^\\n]*\\n*|$)|<![A-Z][\\s\\S]*?(?:>[^\\n]*\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>[^\\n]*\\n*|$)|</?(tag)(?:[ \\t]+|\\n|/?>|$)[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|<(?!(?:script|pre|style|textarea)(?![a-z0-9-]))([a-z][a-z0-9-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$)|</[a-z][a-z0-9-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n[ 	]*)+\\n|$))`,`i`).replace(`comment`,yn).replace(`tag`,vn).replace(`attribute`,/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),xn=e=>R(pn).replace(`hr`,sn).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`|lheading`,``).replace(`|table`,``).replace(`blockquote`,` {0,3}>`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace(`list`,e).replace(`html`,` {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)`).replace(`tag`,vn).getRegex(),Sn=xn(/ {0,3}(?:[*+-]|1[.)])[ \t]+[^ \t\n]/),Cn=xn(/ {0,3}(?:[*+-]|\d{1,9}[.)])(?:[ \t]|\n|$)/),wn={blockquote:R(/^( {0,3}> ?(?:(?![ \t]*(?:\n|$))(paragraph)|[^\n]*)(?:\n|$))+/).replace(`paragraph`,Cn).getRegex(),code:an,def:gn,fences:on,heading:cn,hr:sn,html:bn,lheading:dn,list:_n,newline:rn,paragraph:Sn,table:$t,text:mn},Tn=R(`^ *([^\\n ].*)\\n {0,3}((?:\\| *)?:?-+:? *(?:\\| *:?-+:? *)*(?:\\| *)?)(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)`).replace(`hr`,sn).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`blockquote`,` {0,3}>`).replace(`code`,`(?: {4}| {0,3}	)[^\\n]`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace(`list`,` {0,3}(?:[*+-]|1[.)])[ \\t]`).replace(`html`,` {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)`).replace(`tag`,vn).getRegex(),En={...wn,lheading:fn,table:Tn,paragraph:R(pn).replace(`hr`,sn).replace(`heading`,` {0,3}#{1,6}(?:\\s|$)`).replace(`|lheading`,``).replace(`table`,Tn).replace(`blockquote`,` {0,3}>`).replace(`fences`," {0,3}(?:`{3,}(?=[^`\\n]*(?:\\n|$))|~~~)[^\\n]*(?:\\n|$)").replace(`list`,` {0,3}(?:[*+-]|1[.)])[ \\t]+[^ \\t\\n]`).replace(`html`,` {0,3}(?:</?(?:tag)(?: +|\\n|/?>)|<(?:(?:script|pre|style|textarea)(?:[\\s>]|$)|!--)|<\\?|<![A-Za-z]|<!\\[CDATA\\[)`).replace(`tag`,vn).getRegex()},Dn={...wn,html:R(`^ *(?:comment(?: *\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1>(?: *\\n{2,}|\\s*$)|<tag(?:"[^"]*"|'[^']*'|\\s[^'"/>\\s]*)*?/?>(?: *\\n{2,}|\\s*$))`).replace(`comment`,yn).replace(/tag/g,`(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b`).getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:$t,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:R(pn).replace(`hr`,sn).replace(`heading`,` *#{1,6} *[^
]`).replace(`lheading`,dn).replace(`|table`,``).replace(`blockquote`,` {0,3}>`).replace(`|fences`,``).replace(`|list`,``).replace(`|html`,``).replace(`|tag`,``).getRegex()},On=/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,kn=/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,An=/^( {2,}|\\)\n(?!\s*$)[ \t]*/,jn=/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,Mn=/[\p{P}\p{S}]/u,Nn=/[\s\p{P}\p{S}]/u,Pn=/[^\s\p{P}\p{S}]/u,Fn=R(/^((?![*_])punctSpace)/,`u`).replace(/punctSpace/g,Nn).getRegex(),In=/[\p{Pi}\p{Ps}"']/u,Ln=/(?!~)[\p{P}\p{S}]/u,Rn=/(?!~)[\s\p{P}\p{S}]/u,zn=/(?:[^\s\p{P}\p{S}]|~)/u,Bn=R(/link|precode-code|html/,`g`).replace(`link`,/\[(?:[^\[\]`]|(?<a>`+)[^`]+\k<a>(?!`))*?\]\((?:\\[\s\S]|[^\\\(\)]|\((?:\\[\s\S]|[^\\\(\)])*\))*\)/).replace(`precode-`,tn?"(?<!`)()":"(^^|[^`])").replace(`code`,/(?<b>`+)[^`]+\k<b>(?!`)/).replace(`html`,/<(?! )[^<>]*?>/).getRegex(),Vn=/^(?:\*+(?:((?!\*)punct)|([^\s*]))?)|^_+(?:((?!_)punct)|([^\s_]))?/,Hn=R(Vn,`u`).replace(/punct/g,Mn).getRegex(),Un=R(Vn,`u`).replace(/punct/g,Ln).getRegex(),Wn=R(/^(?:\*+(?:((?!\*)(?!openQuote)punct)|([^\s*]))?)|^_+(?:((?!_)(?!openQuote)punct)|([^\s_]))?/,`u`).replace(/openQuote/g,In).replace(/punct/g,Mn).getRegex(),Gn=`^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)punctSpace(\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|notPunctSpace(\\*+)(?=notPunctSpace)`,Kn=R(Gn,`gu`).replace(/notPunctSpace/g,Pn).replace(/punctSpace/g,Nn).replace(/punct/g,Mn).getRegex(),qn=R(Gn,`gu`).replace(/notPunctSpace/g,zn).replace(/punctSpace/g,Rn).replace(/punct/g,Ln).getRegex(),Jn=R(`^[^_*]*?__[^_*]*?\\*[^_*]*?(?=__)|[^*]+(?=[^*])|(?!\\*)punct(\\*+)(?=[\\s]|$)|notPunctSpace(\\*+)(?!\\*)(?=punctSpace|$)|(?!\\*)[\\s](\\*+)(?=notPunctSpace)|[\\s](\\*+)(?!\\*)(?=punct)|(?!\\*)punct(\\*+)(?!\\*)(?=punct)|(?:(?!\\*)punct|notPunctSpace)(\\*+)(?!\\*)(?=notPunctSpace)`,`gu`).replace(/notPunctSpace/g,Pn).replace(/punctSpace/g,Nn).replace(/punct/g,Mn).getRegex(),Yn=R(`^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)punctSpace(_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)`,`gu`).replace(/notPunctSpace/g,Pn).replace(/punctSpace/g,Nn).replace(/punct/g,Mn).getRegex(),Xn=R(`^[^_*]*?\\*\\*[^_*]*?_[^_*]*?(?=\\*\\*)|[^_]+(?=[^_])|(?!_)punct(_+)(?=[\\s]|$)|notPunctSpace(_+)(?!_)(?=punctSpace|$)|(?!_)[\\s](_+)(?=notPunctSpace)|[\\s](_+)(?!_)(?=punct)|(?!_)punct(_+)(?!_)(?=punct)|(?:(?!_)punct|notPunctSpace)(_+)(?!_)(?=notPunctSpace)`,`gu`).replace(/notPunctSpace/g,Pn).replace(/punctSpace/g,Nn).replace(/punct/g,Mn).getRegex(),Zn=R(/^~~?(?:((?!~)punct)|[^\s~])/,`u`).replace(/punct/g,Mn).getRegex(),Qn=R(`^[^~]+(?=[^~])|(?!~)punct(~~?)(?=[\\s]|$)|notPunctSpace(~~?)(?!~)(?=punctSpace|$)|(?!~)punctSpace(~~?)(?=notPunctSpace)|[\\s](~~?)(?!~)(?=punct)|(?!~)punct(~~?)(?!~)(?=punct)|notPunctSpace(~~?)(?=notPunctSpace)`,`gu`).replace(/notPunctSpace/g,Pn).replace(/punctSpace/g,Nn).replace(/punct/g,Mn).getRegex(),$n=R(/\\(punct)/,`gu`).replace(/punct/g,Mn).getRegex(),er=R(/(`+)(?:[^`]|[^`][\s\S]*?[^`])\1(?!`)|`+|\\(punct)/,`gu`).replace(/punct/g,Mn).getRegex(),tr=R(/^<(scheme:[^\s\x00-\x1f<>]*|email)>/).replace(`scheme`,/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/).replace(`email`,/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/).getRegex(),nr=R(yn).replace(`(?:-->|$)`,`-->`).getRegex(),rr=R(`^comment|^</[a-zA-Z][a-zA-Z0-9-]*\\s*>|^<[a-zA-Z][a-zA-Z0-9-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>`).replace(`comment`,nr).replace(`attribute`,/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/).getRegex(),ir=/\[(?:\\[\s\S]|[^\[\]\\])*\]/,ar=R(/(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\])|[^\[\]\\`])*?/).replace(`brackets`,ir).getRegex(),or=R(/^!?\[(label)\]\([ \t\n]*(href)(?:(?:[ \t]+(?:\n[ \t]*)?|\n[ \t]*)(title))?[ \t\n]*\)/).replace(`label`,ar).replace(`href`,/<(?:\\.|[^\n<>\\])+>|[^ \t\n\x00-\x1f]+|(?=\))/).replace(`title`,/"(?:\\[\s\S]|[^"\\])*"|'(?:\\[\s\S]|[^'\\])*'|\((?:\\[\s\S]|[^)\\])*\)/).getRegex(),sr=R(/^!?\[(label)\]\[(ref)\]/).replace(`label`,ar).replace(`ref`,hn).getRegex(),cr=R(/^!?\[(ref)\](?:\[\])?/).replace(`ref`,hn).getRegex(),lr=/(?!\s*\])(?:\\[\s\S]|[^\[\]\\]){1,999}/,ur=R(/(?:[^\[\]\\`]*(?:\[(?:brackets|\\[\s\S]|[^\[\]\\])*\]|\\[\s\S]|`+(?!`)[^`]*?`+(?!`)|``+(?=\]))){0,999}?[^\[\]\\`]*?/).replace(`brackets`,ir).getRegex(),dr=R(`reflink|nolink(?!\\()`,`g`).replace(`reflink`,R(/^!?\[(label)\]\[(ref)\]/).replace(`label`,ur).replace(`ref`,lr).getRegex()).replace(`nolink`,R(/^!?\[(ref)\](?:\[\])?/).replace(`ref`,lr).getRegex()).getRegex(),fr=/[hH][tT][tT][pP][sS]?|[fF][tT][pP]/,pr=R(/(?:mailto:email|xmpp:email(?:\/[A-Za-z0-9@.]+)?)/).replace(/email/g,/[A-Za-z0-9._+-]+@[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(),mr={_backpedal:$t,anyPunctuation:$n,anyPunctuationOutsideCode:er,autolink:tr,blockSkip:Bn,br:An,code:kn,del:$t,delLDelim:$t,delRDelim:$t,emStrongLDelim:Hn,emStrongRDelimAst:Kn,emStrongRDelimUnd:Yn,escape:On,link:or,nolink:cr,punctuation:Fn,reflink:sr,reflinkSearch:dr,tag:rr,text:jn,url:$t},hr={...mr,emStrongLDelim:Wn,emStrongRDelimAst:Jn,emStrongRDelimUnd:Xn,link:R(/^!?\[(label)\]\((.*?)\)/).replace(`label`,ar).getRegex(),reflink:R(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace(`label`,ar).getRegex()},gr={...mr,emStrongRDelimAst:qn,emStrongLDelim:Un,delLDelim:Zn,delRDelim:Qn,url:R(/^emailProtocol|^((?:protocol):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/).replace(`emailProtocol`,pr).replace(`protocol`,fr).replace(`email`,/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![\w-])/).getRegex(),_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])((?:\\[\s\S]|[^\\])*?(?:\\[\s\S]|[^\s~\\]))\1(?=[^~]|$)/,text:R(/^(?:[^a-zA-Z0-9](?=emailProtocol)|(`+|~+|[^`~])(?:(?=[`~])|(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|protocol:\/\/|wwwStart|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9](?=emailProtocol)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@))))/).replace(`protocol`,fr).replace(/emailProtocol/g,/(?:mailto|xmpp):/).replace(`wwwStart`,tn?`(?<![^\\s*_~(])www\\.`:`www\\.`).getRegex()},_r={...gr,br:R(An).replace(`{2,}`,`*`).getRegex(),text:R(gr.text).replace(`\\b_`,`\\b_| {2,}\\n`).replace(/\{2,\}/g,`*`).getRegex()},vr={normal:wn,gfm:En,pedantic:Dn},yr={normal:mr,gfm:gr,breaks:_r,pedantic:hr},br={"&":`&amp;`,"<":`&lt;`,">":`&gt;`,'"':`&quot;`,"'":`&#39;`},xr=e=>br[e];function Sr(e,t){if(t){if(nn.escapeTest.test(e))return e.replace(nn.escapeReplace,xr)}else if(nn.escapeTestNoEncode.test(e))return e.replace(nn.escapeReplaceNoEncode,xr);return e}function Cr(e){return nn.numericCharacterReference.test(e)?e.replace(nn.numericCharacterReferenceOrAmpersand,(e,t,n)=>{if(t===void 0&&n===void 0)return`&amp;`;let r=t===void 0?Number.parseInt(n,16):Number.parseInt(t,10);return r===0||r>1114111||r>=55296&&r<=57343?`�`:r===38?`&amp;`:String.fromCodePoint(r)}):e}function wr(e){try{e=encodeURI(e).replace(nn.percentDecode,`%`)}catch{return null}return e}function Tr(e,t){let n=e.replace(nn.findPipe,(e,t,n)=>{let r=!1,i=t;for(;--i>=0&&n[i]===`\\`;)r=!r;return r?`|`:` |`}).split(nn.splitPipe),r=0;if(n[0].trim()||n.shift(),n.length>0&&!n.at(-1)?.trim()&&n.pop(),t){if(n.length>t)n.splice(t);else for(;n.length<t;)n.push(``)}for(;r<n.length;r++)n[r]=n[r].trim().replace(nn.slashPipe,`|`);return n}function Er(e,t,n){let r=e.length;if(r===0)return``;let i=0;for(;i<r;){let a=e.charAt(r-i-1);if(a===t&&!n)i++;else if(a!==t&&n)i++;else break}return e.slice(0,r-i)}function Dr(e){let t=e.split(`
`),n=t.length-1;for(;n>=0&&nn.blankLine.test(t[n]);)n--;return t.length-n<=2?e:t.slice(0,n+1).join(`
`)}function Or(e){return e.trim().replace(nn.multipleSpaceGlobal,` `).toLowerCase().toUpperCase().toLowerCase()}function kr(e,t){if(e.indexOf(t[0])===-1&&e.indexOf(t[1])===-1)return-1;let n=0;for(let r=0;r<e.length;r++)if(e[r]===`\\`)r++;else if(e[r]===t[0])n++;else if(e[r]===t[1]&&(n--,n<0))return r;return n>0?-2:-1}var Ar=new WeakMap;function jr(e){let t={"*":-1,_:-1},n=-1,r=e.length;for(let i=0;i<r;i++){let a=e[i];if(a!==`*`&&a!==`_`&&a!==`~`)continue;let o=i===0?`
`:e[i-1],s=i+1;for(;s<r&&e[s]===a;)s++;o!==` `&&o!==`	`&&o!==`
`&&o!==`\r`&&o!==`\f`&&(a===`~`?n=i:t[a]=i),i=s-1}return{maskedSrc:e,lastPossibleEmStrongCloserIndex:t,lastPossibleDelCloserIndex:n}}function Mr(e,t){let n=jr(t),r=Ar.get(e);r?r.push(n):Ar.set(e,[n])}function Nr(e){let t=Ar.get(e);t&&(t.pop(),t.length===0&&Ar.delete(e))}function Pr(e,t,n){let r=Ar.get(e)?.at(-1);return r&&r.maskedSrc===t?r.lastPossibleEmStrongCloserIndex[n]:jr(t).lastPossibleEmStrongCloserIndex[n]}function Fr(e,t){let n=Ar.get(e)?.at(-1);return n&&n.maskedSrc===t?n.lastPossibleDelCloserIndex:jr(t).lastPossibleDelCloserIndex}function Ir(e,t=0){let n=t,r=``;for(let t of e)if(t===`	`){let e=4-n%4;r+=` `.repeat(e),n+=e}else r+=t,n++;return r}function Lr(e,t,n,r,i){let a=t.href,o=t.title||null,s=e[1].replace(i.other.outputLinkReplace,`$1`),c=e[0].charAt(0)===`!`,l=r.state.inLink,u=r.state.linkEmitted,d=r.state.inRawBlock;r.state.inLink=!0,r.state.linkEmitted=!1;let f=r.inlineTokens(s),p=r.state.linkEmitted;if(r.state.linkEmitted=u,r.state.inLink=l,!c){if(p){r.state.inRawBlock=d;return}r.state.linkEmitted=!0}return{type:c?`image`:`link`,raw:n,href:a,title:o,text:s,tokens:f}}function Rr(e,t,n){let r=e.match(n.other.indentCodeCompensation);if(r===null)return t;let i=r[1];return t.split(`
`).map(e=>{let t=e.match(n.other.beginningSpace);if(t===null)return e;let[r]=t;return e.slice(Math.min(r.length,i.length))}).join(`
`)}function zr(e,t,n,r){if(!t.includes(`<`))return!1;for(let i=0;i<t.length;i++){if(t[i]===`\\`){i++;continue}if(t[i]==="`"){let e=r.inline.code.exec(t.slice(i));if(e){i+=e[0].length-1;continue}}if(t[i]!==`<`)continue;let a=e.slice(n+i),o=r.inline.tag.exec(a)||r.inline.autolink.exec(a);if(o){if(o[0].length>t.length-i)return!0;i+=o[0].length-1}}return!1}var Br=class{options;rules;lexer;constructor(e){this.options=e||Zt}space(e){let t=this.rules.block.newline.exec(e);if(t&&t[0].length>0)return{type:`space`,raw:t[0]}}code(e){let t=this.rules.block.code.exec(e);if(t){let e=this.options.pedantic?t[0]:Dr(t[0]);return{type:`code`,raw:e,codeBlockStyle:`indented`,text:e.replace(this.rules.other.codeRemoveIndent,``)}}}fences(e){let t=this.rules.block.fences.exec(e);if(t){let e=t[0],n=Rr(e,t[3]||``,this.rules);return{type:`code`,raw:e,lang:t[2]?t[2].trim().replace(this.rules.inline.anyPunctuation,`$1`):t[2],text:n}}}heading(e){let t=this.rules.block.heading.exec(e);if(t){let e=t[2].trim();if(this.rules.other.endingHash.test(e)){let t=Er(e,`#`);(this.options.pedantic||!t||this.rules.other.endingSpaceTabChar.test(t))&&(e=t.trim())}return{type:`heading`,raw:Er(t[0],`
`),depth:t[1].length,text:e,tokens:this.lexer.inline(e)}}}hr(e){let t=this.rules.block.hr.exec(e);if(t)return{type:`hr`,raw:Er(t[0],`
`)}}blockquote(e){let t=this.rules.block.blockquote.exec(e);if(t){let e=Er(t[0],`
`).split(`
`),n=``,r=``,i=[];for(;e.length>0;){let t=!1,a=[],o=0;for(;o<e.length;o++)if(this.rules.other.blockquoteStart.test(e[o]))a.push(e[o]),t=!0;else if(!t)a.push(e[o]);else break;e=e.slice(o);let s=a.join(`
`),c=s.replace(this.rules.other.blockquoteMarkerWhitespace,(e,t,n)=>t+Ir(n,t.length)).replace(this.rules.other.blockquoteSetextReplace,`
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
`,1)[0],d=t[1].length,f=this.options.pedantic?Ir(u,d):u.replace(this.rules.other.leadingSpaceTab,e=>Ir(e,d)),p=e.split(`
`,1)[0],m=!f.trim(),h=0;if(this.options.pedantic?(h=2,a=f.trimStart()):m?h=d+1:(h=f.search(this.rules.other.nonSpaceChar),h=h>4?1:h,a=f.slice(h),h+=d),m&&this.rules.other.blankLine.test(p)&&(e=e.substring(p.length+1),i=!0),!i){let t=this.rules.other.nextBulletRegex(h),n=this.rules.other.hrRegex(h),r=this.rules.other.fencesBeginRegex(h),i=this.options.pedantic?this.rules.other.pedanticHeadingBeginRegex(h):this.rules.other.headingBeginRegex(h),o=this.rules.other.htmlBeginRegex(h),s=this.rules.other.blockquoteBeginRegex(h),c=!1;for(;e;){let l=e.split(`
`,1)[0],u;if(p=l,this.options.pedantic?(p=p.replace(this.rules.other.listReplaceNesting,`  `),u=p):u=p.replace(this.rules.other.leadingSpaceTab,e=>Ir(e)),r.test(p)||i.test(p)||o.test(p)||s.test(p)||t.test(p)||n.test(p))break;if(u.search(this.rules.other.nonSpaceChar)>=h||!p.trim())a+=`
`+u.slice(h),c=!1;else{if(m||f.replace(this.rules.other.tabCharGlobal,`    `).search(this.rules.other.nonSpaceChar)>=4||r.test(f)||i.test(f)||o.test(f)||n.test(f))break;if(!this.options.pedantic&&!c){let e=f.replace(this.rules.other.nestedContainerMarkers,``);if(this.rules.block.fences.test(e)||this.rules.block.heading.test(e)||this.rules.block.hr.test(e))break}let e=!this.options.pedantic&&/^ {0,3}(?:=+|-+) *$/.test(p)&&this.rules.block.lheading.test(`${f}
${p}`)?`    ${u.replace(/^ {0,3}/,``)}`:p;a+=`
`+e,c=!0}m=!p.trim(),e=e.substring(l.length+1),f=u.slice(h)}}let g=n.slice(l,r());o.loose||(c?o.loose=!0:this.rules.other.doubleBlankLine.test(g)&&(c=!0)),o.items.push({type:`list_item`,raw:g,task:!!this.options.gfm&&this.rules.other.listIsTask.test(a),loose:!1,text:a,tokens:[]})}let l=o.items.at(-1);if(l)l.raw=l.raw.trimEnd(),l.text=l.text.trimEnd();else return;o.raw=n.slice(0,r()).trimEnd();for(let e of o.items)if(this.lexer.state.top=!1,e.tokens=this.lexer.blockTokens(e.text,[]),!o.loose){let t=e.tokens.filter(e=>e.type===`space`);o.loose=t.length>0&&t.some(e=>this.rules.other.anyLine.test(e.raw))}for(let e of o.items){let t=e.tokens[0];if(e.task&&(t?.type===`text`||t?.type===`paragraph`)){e.text=e.text.replace(this.rules.other.listReplaceTask,``),t.raw=t.raw.replace(this.rules.other.listReplaceTask,``),t.text=t.text.replace(this.rules.other.listReplaceTask,``);for(let e=this.lexer.inlineQueue.length-1;e>=0;e--)if(this.rules.other.listIsTask.test(this.lexer.inlineQueue[e].src)){this.lexer.inlineQueue[e].src=this.lexer.inlineQueue[e].src.replace(this.rules.other.listReplaceTask,``);break}let n=this.rules.other.listTaskCheckbox.exec(e.raw);if(n){let t={type:`checkbox`,raw:n[0]+` `,checked:n[0]!==`[ ]`};e.checked=t.checked,o.loose?e.tokens[0]&&[`paragraph`,`text`].includes(e.tokens[0].type)&&`tokens`in e.tokens[0]&&e.tokens[0].tokens?(e.tokens[0].raw=t.raw+e.tokens[0].raw,e.tokens[0].text=t.raw+e.tokens[0].text,e.tokens[0].tokens.unshift(t)):e.tokens.unshift({type:`paragraph`,raw:t.raw,text:t.raw,tokens:[t]}):e.tokens.unshift(t)}}else e.task&&=!1}if(o.loose)for(let e of o.items){e.loose=!0;for(let t of e.tokens)t.type===`text`&&(t.type=`paragraph`)}return o}}html(e){let t=this.rules.block.html.exec(e);if(t){let e=Dr(t[0]);return{type:`html`,block:!0,raw:e,pre:t[1]===`pre`||t[1]===`script`||t[1]===`style`,text:e}}}def(e){let t=this.rules.block.def.exec(e);if(t){if(!this.rules.other.startAngleBracket.test(t[2])&&kr(t[2],`()`)!==-1)return;let e=Or(t[1]),n=t[2]?t[2].replace(this.rules.other.hrefBrackets,`$1`).replace(this.rules.inline.anyPunctuation,`$1`):``,r=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline.anyPunctuation,`$1`):t[3];return{type:`def`,tag:e,raw:Er(t[0],`
`),href:n,title:r}}}table(e){let t=this.rules.block.table.exec(e);if(!t||!this.rules.other.tableDelimiter.test(t[2]))return;let n=Tr(t[1]),r=t[2].replace(this.rules.other.tableAlignChars,``).split(`|`),i=t[3]?.trim()?t[3].replace(this.rules.other.tableRowBlankLine,``).split(`
`):[],a={type:`table`,raw:Er(t[0],`
`),header:[],align:[],rows:[]};if(n.length===r.length){for(let e of r)this.rules.other.tableAlignRight.test(e)?a.align.push(`right`):this.rules.other.tableAlignCenter.test(e)?a.align.push(`center`):this.rules.other.tableAlignLeft.test(e)?a.align.push(`left`):a.align.push(null);for(let e=0;e<n.length;e++)a.header.push({text:n[e],tokens:this.lexer.inline(n[e]),header:!0,align:a.align[e]});for(let e of i)a.rows.push(Tr(e,a.header.length).map((e,t)=>({text:e,tokens:this.lexer.inline(e),header:!1,align:a.align[t]})));return a}}lheading(e){let t=this.rules.block.lheading.exec(e);if(t){let e=t[1].trim();return{type:`heading`,raw:Er(t[0],`
`),depth:t[2].charAt(0)===`=`?1:2,text:e,tokens:this.lexer.inline(e)}}}paragraph(e){let t=this.rules.block.paragraph.exec(e);if(t){let e=t[1].charAt(t[1].length-1)===`
`?t[1].slice(0,-1):t[1];return{type:`paragraph`,raw:t[0],text:e,tokens:this.lexer.inline(e)}}}text(e){let t=this.rules.block.text.exec(e);if(t)return{type:`text`,raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}}escape(e){let t=this.rules.inline.escape.exec(e);if(t)return{type:`escape`,raw:t[0],text:t[1]}}tag(e){let t=this.rules.inline.tag.exec(e);if(t)return!this.lexer.state.inLink&&this.rules.other.startATag.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&this.rules.other.endATag.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&this.rules.other.startPreScriptTag.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&this.rules.other.endPreScriptTag.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:`html`,raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,block:!1,text:t[0]}}link(e){if(this.lexer.state.linkParenPossible===!1)return;let t=this.rules.inline.link.exec(e);if(t){let n=t[0].charAt(0)===`!`?2:1;if(!this.options.pedantic&&zr(e,t[1],n,this.rules))return;let r=t[2].trim();if(!this.options.pedantic&&this.rules.other.startAngleBracket.test(r)){if(!this.rules.other.endAngleBracket.test(r))return;let e=Er(r.slice(0,-1),`\\`);if((r.length-e.length)%2==0)return}else{let e=kr(t[2],`()`);if(e===-2)return;if(e>-1){let n=(t[0].indexOf(`!`)===0?5:4)+t[1].length+e;t[2]=t[2].substring(0,e),t[0]=t[0].substring(0,n).trim(),t[3]=``}}let i=Er(t[0].slice(0,-1),`\\`);if((t[0].length-i.length)%2==0)return;let a=t[2],o=``;if(this.options.pedantic){let e=this.rules.other.pedanticHrefTitle.exec(a);e&&(a=e[1],o=e[3])}else o=t[3]?t[3].slice(1,-1):``;return a=a.trim(),this.rules.other.startAngleBracket.test(a)&&(a=this.options.pedantic&&!this.rules.other.endAngleBracket.test(r)?a.slice(1):a.slice(1,-1)),Lr(t,{href:a&&a.replace(this.rules.inline.anyPunctuation,`$1`),title:o&&o.replace(this.rules.inline.anyPunctuation,`$1`)},t[0],this.lexer,this.rules)}}reflink(e,t){let n;if((n=this.rules.inline.reflink.exec(e))||(n=this.rules.inline.nolink.exec(e))){let r=n[0].charAt(0)===`!`?2:1;if(!this.options.pedantic&&zr(e,n[1],r,this.rules))return;let i=t[Or(n[2]||n[1])];if(!i){let e=n[0].charAt(0);return{type:`text`,raw:e,text:e}}return Lr(n,i,n[0],this.lexer,this.rules)}}emStrong(e,t,n=``){let r=this.rules.inline.emStrongLDelim.exec(e);if(!r||!r[1]&&!r[2]&&!r[3]&&!r[4])return;let i=r[0][0],a=n===i,o=t.length-e.length,s=o;for(;!this.options.pedantic&&s>0&&t[s-1]===i;)s--;let c=[...t.slice(Math.max(0,s-2),s)].at(-1)??``,l=c===`*`||c===`_`||!!this.rules.inline.punctuation.exec(c);s<o&&(n=c);let u=s<o?l:n===`*`||n===`_`||!!this.rules.inline.punctuation.exec(n);if(r[4]&&n.match(this.rules.other.unicodeAlphaNumeric))return;let d=r[1]||r[3]||``;if(!d||!n||u){let n=[...r[0]].length-1,u,f,p=n,m=0,h=o-s+n,g=!this.options.pedantic&&!!c.trim()&&(!!d||i===`*`&&!l);if(i!==`*`&&i!==`_`)return;let _=i===`*`?this.rules.inline.emStrongRDelimAst:this.rules.inline.emStrongRDelimUnd,v=Pr(this,t,i),y=t.length-e.length+n;if(v<y)return;t=t.slice(-1*e.length+n);let b=v-y;for(_.lastIndex=0;(r=_.exec(t))!==null&&!(r.index>b);){if(u=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!u)continue;if(f=[...u].length,r[3]||r[4]){p+=f;continue}if(r[5]||r[6]||g){if(a&&(r[5]||r[6]))break;if(h%3&&!((h+f)%3)){m+=f;continue}}if(p-=f,p>0)continue;f=Math.min(f,f+p+m);let t=[...r[0]][0].length,i=e.slice(0,n+r.index+t+f);if(Math.min(n,f)%2){let e=i.slice(1,-1);return{type:`em`,raw:i,text:e,tokens:this.lexer.inlineTokens(e)}}let o=i.slice(2,-2);return{type:`strong`,raw:i,text:o,tokens:this.lexer.inlineTokens(o)}}}}codespan(e){let t=this.rules.inline.code.exec(e);if(t){let e=t[2].replace(this.rules.other.newLineCharGlobal,` `),n=this.rules.other.nonSpaceChar.test(e),r=this.rules.other.startingSpaceChar.test(e)&&this.rules.other.endingSpaceChar.test(e);return n&&r&&(e=e.substring(1,e.length-1)),{type:`codespan`,raw:t[0],text:e}}}br(e){let t=this.rules.inline.br.exec(e);if(t)return{type:`br`,raw:t[0]}}del(e,t,n=``){let r=this.rules.inline.delLDelim.exec(e);if(r&&(!r[1]||!n||this.rules.inline.punctuation.exec(n))){let n=[...r[0]].length-1,i,a,o=n,s=this.rules.inline.delRDelim,c=Fr(this,t),l=t.length-e.length+n;if(c<l)return;t=t.slice(-1*e.length+n);let u=c-l;for(s.lastIndex=0;(r=s.exec(t))!==null&&!(r.index>u);){if(i=r[1]||r[2]||r[3]||r[4]||r[5]||r[6],!i||(a=[...i].length,a!==n))continue;if(r[3]||r[4]){o+=a;continue}if(o-=a,o>0)continue;a=Math.min(a,a+o);let t=[...r[0]][0].length,s=e.slice(0,n+r.index+t+a),c=s.slice(n,-n);return{type:`del`,raw:s,text:c,tokens:this.lexer.inlineTokens(c)}}}}autolink(e){let t=this.rules.inline.autolink.exec(e);if(t){let e,n;return t[2]===`@`?(e=t[1],n=`mailto:`+e):(e=t[1],n=e),{type:`link`,raw:t[0],text:e,href:n,autolink:!0,tokens:[{type:`text`,raw:e,text:e}]}}}url(e){let t;if(t=this.rules.inline.url.exec(e)){let e,n;if(t[2]===`@`)e=t[0],n=`mailto:`+e;else{let r;do r=t[0],t[0]=this.rules.inline._backpedal.exec(t[0])?.[0]??``;while(r!==t[0]);e=t[0],n=t[1]===`www.`?`http://`+t[0]:t[0]}return{type:`link`,raw:t[0],text:e,href:n,autolink:!0,tokens:[{type:`text`,raw:e,text:e}]}}}inlineText(e){let t=this.rules.inline.text.exec(e);if(t){let e=this.lexer.state.inRawBlock;return{type:`text`,raw:t[0],text:e?t[0]:Cr(t[0]),escaped:e}}}},Vr=class e{tokens;options;state;inlineQueue;tokenizer;constructor(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||Zt,this.options.tokenizer=this.options.tokenizer||new Br,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,linkEmitted:!1,linkParenPossible:!0,top:!0};let t={other:nn,block:vr.normal,inline:yr.normal};this.options.pedantic?(t.block=vr.pedantic,t.inline=yr.pedantic):this.options.gfm&&(t.block=vr.gfm,t.inline=this.options.breaks?yr.breaks:yr.gfm),this.tokenizer.rules=t}static get rules(){return{block:vr,inline:yr}}static lex(t,n){return new e(n).lex(t)}static lexInline(t,n){return new e(n).inlineTokens(t)}lex(e){e=e.replace(nn.carriageReturn,`
`),this.blockTokens(e,this.tokens);for(let e=0;e<this.inlineQueue.length;e++){let t=this.inlineQueue[e];this.state.inRawBlock=!1,this.inlineTokens(t.src,t.tokens)}return this.inlineQueue=[],this.tokens}blockTokens(e,t=[],n=!1){this.tokenizer.lexer=this;let r=this.state.lastToken;this.options.pedantic&&(e=e.replace(nn.tabCharGlobal,`    `).replace(nn.spaceLine,``));let i=1/0;for(;e;){if(e.length<i)i=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}this.state.lastToken=t.at(-1);let r;if(this.options.extensions?.block?.some(n=>(r=n.call({lexer:this},e,t))?(e=e.substring(r.raw.length),t.push(r),!0):!1))continue;if(r=this.tokenizer.space(e)){e=e.substring(r.raw.length);let n=t.at(-1);r.raw.length===1&&n!==void 0?n.raw+=`
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
`+r.text,this.inlineQueue.pop(),this.inlineQueue.at(-1).src=n.text):t.push(r)}else if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return this.state.top=!0,this.state.lastToken=r,t}inline(e,t=[]){return this.inlineQueue.push({src:e,tokens:t}),t}linkInText(e){if(!e.includes(`[`))return!1;let t=this.tokenizer.rules.inline.link;for(let n of e.matchAll(this.tokenizer.rules.inline.blockSkip))if(t.test(n[0])&&e.charAt(n.index-1)!==`!`)return!0;for(let t of e.matchAll(this.tokenizer.rules.inline.reflinkSearch)){let e=t[0],n=e.lastIndexOf(`[`);if(e.charAt(0)!==`!`&&Object.hasOwn(this.tokens.links,Or(e.slice(n+1,-1)))&&!(n>1&&this.linkInText(e.slice(1,n-1))))return!0}return!1}inlineTokens(e,t=[]){this.tokenizer.lexer=this;let n=this.state.linkParenPossible;this.state.linkParenPossible=n&&e.includes(`)`);try{return this.#e(e,t)}finally{this.state.linkParenPossible=n}}#e(e,t){let n=e.includes(`*`)||e.includes(`_`)||e.includes(`~`)||this.options.hooks?.emStrongMask||this.tokenizer.emStrong!==Br.prototype.emStrong||this.tokenizer.del!==Br.prototype.del?this.#r(e):e;Mr(this.tokenizer,n);try{return this.#t(e,n,t)}finally{Nr(this.tokenizer)}}#t(e,t,n){let r=!1,i=``,a=1/0;for(;e;){if(e.length<a)a=e.length;else{this.infiniteLoopError(e.charCodeAt(0));break}r||(i=``),r=!1;let o;if(this.options.extensions?.inline?.some(t=>(o=t.call({lexer:this},e,n))?(e=e.substring(o.raw.length),n.push(o),!0):!1))continue;if((o=this.tokenizer.escape(e))||(o=this.tokenizer.tag(e))||(o=this.tokenizer.link(e))){e=e.substring(o.raw.length),n.push(o);continue}if(o=this.tokenizer.reflink(e,this.tokens.links)){e=e.substring(o.raw.length);let t=n.at(-1);o.type===`text`&&t?.type===`text`?(t.raw+=o.raw,t.text+=o.text):n.push(o);continue}if((o=this.tokenizer.emStrong(e,t,i))||(o=this.tokenizer.codespan(e))||(o=this.tokenizer.br(e))||(o=this.tokenizer.del(e,t,i))||(o=this.tokenizer.autolink(e))||!this.state.inLink&&(o=this.tokenizer.url(e))){e=e.substring(o.raw.length),n.push(o);continue}let s=e;if(this.options.extensions?.startInline){let t=1/0,n=e.slice(1),r;this.options.extensions.startInline.forEach(e=>{r=e.call({lexer:this},n),typeof r==`number`&&r>=0&&(t=Math.min(t,r))}),t<1/0&&t>=0&&(s=e.substring(0,t+1))}if(o=this.tokenizer.inlineText(s)){e=e.substring(o.raw.length),o.raw.slice(-1)!==`_`&&(i=o.raw.slice(-1)),r=!0;let t=n.at(-1);t?.type===`text`?(t.raw+=o.raw,t.text+=o.text):n.push(o)}else if(e){this.infiniteLoopError(e.charCodeAt(0));break}}return n}#n(e){let{blockSkip:t,tag:n,autolink:r}=this.tokenizer.rules.inline,i=``,a=0,o;for(t.lastIndex=0;o=t.exec(e);){let s=o.index+(o[2]?o[2].length:0),c=o.index+o[0].length;if(e.charAt(s)===`<`){let i=e.slice(s),a=n.exec(i)||r.exec(i);if(!a){t.lastIndex=s+1;continue}c=s+a[0].length,t.lastIndex=c}i+=e.slice(a,s)+`[`+`a`.repeat(c-s-2)+`]`,a=c}return i+e.slice(a)}#r(e){let t=e;if(this.tokens.links&&e.includes(`[`)){let e=this.tokenizer.rules.inline.reflinkSearch,n=t=>{let r=t.lastIndexOf(`[`);if(!Object.hasOwn(this.tokens.links,Or(t.slice(r+1,-1))))return t;if(r>1&&t.charAt(0)!==`!`){let i=t.slice(1,r-1);if(this.linkInText(i))return`[`+i.replace(e,n)+`][`+`a`.repeat(t.length-r-2)+`]`}return`[`+`a`.repeat(t.length-2)+`]`};t=t.replace(e,n)}return t=t.replace(this.tokenizer.rules.inline.anyPunctuationOutsideCode,(e,t,n)=>n?`+`.repeat(e.length):t?t+e.slice(t.length,-t.length).replace(/`/g,`+`)+t:e),t=this.#n(t),t=this.options.hooks?.emStrongMask?.call({lexer:this},t)??t,t}infiniteLoopError(e){let t=`Infinite loop on byte: `+e;if(this.options.silent)console.error(t);else throw Error(t)}},Hr=class{options;parser;constructor(e){this.options=e||Zt}space(e){return``}code({text:e,lang:t,escaped:n}){let r=(t||``).match(nn.notSpaceStart)?.[0],i=e?e.replace(nn.endingNewline,``)+`
`:``;return r?`<pre><code class="language-`+Sr(r)+`">`+(n?i:Sr(i,!0))+`</code></pre>
`:`<pre><code>`+(n?i:Sr(i,!0))+`</code></pre>
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
`}strong({tokens:e}){return`<strong>${this.parser.parseInline(e)}</strong>`}em({tokens:e}){return`<em>${this.parser.parseInline(e)}</em>`}codespan({text:e}){return`<code>${Sr(e,!0)}</code>`}br(e){return`<br>`}del({tokens:e}){return`<del>${this.parser.parseInline(e)}</del>`}link({href:e,title:t,text:n,tokens:r,autolink:i}){let a=i?Sr(n,!0):this.parser.parseInline(r),o=wr(e);if(o===null)return a;e=Sr(o,i);let s=`<a href="`+e+`"`;return t&&(s+=` title="`+Sr(t)+`"`),s+=`>`+a+`</a>`,s}image({href:e,title:t,text:n,tokens:r}){r&&(n=this.parser.parseInline(r,this.parser.textRenderer));let i=wr(e);if(i===null)return Sr(n);e=i;let a=`<img src="${Sr(e)}" alt="${Sr(n)}"`;return t&&(a+=` title="${Sr(t)}"`),a+=`>`,a}text(e){return`tokens`in e&&e.tokens?this.parser.parseInline(e.tokens):`escaped`in e&&e.escaped?e.text:Sr(e.text)}},Ur=class{parser;strong({text:e,tokens:t}){return t?this.parser.parseInline(t,this):e}em({text:e,tokens:t}){return t?this.parser.parseInline(t,this):e}codespan({text:e}){return e}del({text:e,tokens:t}){return t?this.parser.parseInline(t,this):e}html({text:e}){return e}text({text:e}){return e}link({text:e,tokens:t}){return t?this.parser.parseInline(t,this):e}image({text:e,tokens:t}){return t?this.parser.parseInline(t,this):e}br(){return`
`}checkbox({raw:e}){return e}},Wr=class e{options;renderer;textRenderer;constructor(e){this.options=e||Zt,this.options.renderer=this.options.renderer||new Hr,this.renderer=this.options.renderer,this.renderer.options=this.options,this.renderer.parser=this,this.textRenderer=new Ur,this.textRenderer.parser=this}static parse(t,n){return new e(n).parse(t)}static parseInline(t,n){return new e(n).parseInline(t)}parse(e){this.renderer.parser=this;let t=``;for(let n=0;n<e.length;n++){let r=e[n];if(this.options.extensions?.renderers?.[r.type]){let e=r,n=this.options.extensions.renderers[e.type].call({parser:this},e);if(n!==!1||![`space`,`hr`,`heading`,`code`,`table`,`blockquote`,`list`,`checkbox`,`html`,`def`,`paragraph`,`text`].includes(e.type)){t+=n===!1?``:n??``;continue}}let i=r;switch(i.type){case`space`:t+=this.renderer.space(i);break;case`hr`:t+=this.renderer.hr(i);break;case`heading`:t+=this.renderer.heading(i);break;case`code`:t+=this.renderer.code(i);break;case`table`:t+=this.renderer.table(i);break;case`blockquote`:t+=this.renderer.blockquote(i);break;case`list`:t+=this.renderer.list(i);break;case`checkbox`:t+=this.renderer.checkbox(i);break;case`html`:t+=this.renderer.html(i);break;case`def`:t+=this.renderer.def(i);break;case`paragraph`:t+=this.renderer.paragraph(i);break;case`text`:t+=this.renderer.text(i);break;default:{let e=`Token with "`+i.type+`" type was not found.`;if(this.options.silent)return console.error(e),``;throw Error(e)}}}return t}parseInline(e,t=this.renderer){this.renderer.parser=this;let n=``;for(let r=0;r<e.length;r++){let i=e[r];if(this.options.extensions?.renderers?.[i.type]){let e=this.options.extensions.renderers[i.type].call({parser:this},i);if(e!==!1||![`escape`,`html`,`link`,`image`,`checkbox`,`strong`,`em`,`codespan`,`br`,`del`,`text`].includes(i.type)){n+=e===!1?``:e??``;continue}}let a=i;switch(a.type){case`escape`:n+=t.text(a);break;case`html`:n+=t.html(a);break;case`link`:n+=t.link(a);break;case`image`:n+=t.image(a);break;case`checkbox`:n+=t.checkbox(a);break;case`strong`:n+=t.strong(a);break;case`em`:n+=t.em(a);break;case`codespan`:n+=t.codespan(a);break;case`br`:n+=t.br(a);break;case`del`:n+=t.del(a);break;case`text`:n+=t.text(a);break;default:{let e=`Token with "`+a.type+`" type was not found.`;if(this.options.silent)return console.error(e),``;throw Error(e)}}}return n}},Gr=class{options;block;constructor(e){this.options=e||Zt}static passThroughHooks=new Set([`preprocess`,`postprocess`,`processAllTokens`,`emStrongMask`]);static passThroughHooksRespectAsync=new Set([`preprocess`,`postprocess`,`processAllTokens`]);preprocess(e){return e}postprocess(e){return e}processAllTokens(e){return e}emStrongMask(e){return e}provideLexer(e=this.block){return e?Vr.lex:Vr.lexInline}provideParser(e=this.block){return e?Wr.parse:Wr.parseInline}};function Kr(e,t){if(Array.isArray(t))for(let n=0;n<t.length;n++)e.push(t[n]);else e.push(t)}var qr=new class{defaults=Xt();options=this.setOptions;parse=this.parseMarkdown(!0);parseInline=this.parseMarkdown(!1);Parser=Wr;Renderer=Hr;TextRenderer=Ur;Lexer=Vr;Tokenizer=Br;Hooks=Gr;constructor(...e){this.use(...e)}walkTokens(e,t){let n=[];for(let r of e)switch(Kr(n,t.call(this,r)),r.type){case`table`:{let e=r;for(let r of e.header)Kr(n,this.walkTokens(r.tokens,t));for(let r of e.rows)for(let e of r)Kr(n,this.walkTokens(e.tokens,t));break}case`list`:{let e=r;Kr(n,this.walkTokens(e.items,t));break}default:{let e=r;this.defaults.extensions?.childTokens?.[e.type]?this.defaults.extensions.childTokens[e.type].forEach(r=>{let i=e[r].flat(1/0);Kr(n,this.walkTokens(i,t))}):e.tokens&&Kr(n,this.walkTokens(e.tokens,t))}}return n}use(...e){let t=this.defaults.extensions||{renderers:Object.create(null),childTokens:Object.create(null)};return e.forEach(e=>{let n={...e};if(n.async=this.defaults.async||n.async||!1,e.extensions&&(e.extensions.forEach(e=>{if(!e.name)throw Error(`extension name required`);if(`renderer`in e){let n=t.renderers[e.name];n?t.renderers[e.name]=function(...t){let r=e.renderer.apply(this,t);return r===!1&&(r=n.apply(this,t)),r}:t.renderers[e.name]=e.renderer}if(`tokenizer`in e){if(!e.level||e.level!==`block`&&e.level!==`inline`)throw Error(`extension level must be 'block' or 'inline'`);let n=t[e.level];n?n.unshift(e.tokenizer):t[e.level]=[e.tokenizer],e.start&&(e.level===`block`?t.startBlock?t.startBlock.push(e.start):t.startBlock=[e.start]:e.level===`inline`&&(t.startInline?t.startInline.push(e.start):t.startInline=[e.start]))}`childTokens`in e&&e.childTokens&&(t.childTokens[e.name]=e.childTokens)}),n.extensions=t),e.renderer){let t=this.defaults.renderer||new Hr(this.defaults);for(let n in e.renderer){if(!(n in t))throw Error(`renderer '${n}' does not exist`);if([`options`,`parser`].includes(n))continue;let r=n,i=e.renderer[r],a=t[r];t[r]=(...e)=>{let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n===!1?``:n??``}}n.renderer=t}if(e.tokenizer){let t=this.defaults.tokenizer||new Br(this.defaults);for(let n in e.tokenizer){if(!(n in t))throw Error(`tokenizer '${n}' does not exist`);if([`options`,`rules`,`lexer`].includes(n))continue;let r=n,i=e.tokenizer[r],a=t[r];t[r]=(...e)=>{let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n}}n.tokenizer=t}if(e.hooks){let t=this.defaults.hooks||new Gr;for(let n in e.hooks){if(!(n in t))throw Error(`hook '${n}' does not exist`);if([`options`,`block`].includes(n))continue;let r=n,i=e.hooks[r],a=t[r];t[r]=Gr.passThroughHooks.has(n)?e=>{if(t.options.async&&Gr.passThroughHooksRespectAsync.has(n))return(async()=>{let n=await i.call(t,e);return a.call(t,n)})();let r=i.call(t,e);return a.call(t,r)}:(...e)=>{if(t.options.async)return(async()=>{let n=await i.apply(t,e);return n===!1&&(n=await a.apply(t,e)),n})();let n=i.apply(t,e);return n===!1&&(n=a.apply(t,e)),n}}n.hooks=t}if(e.walkTokens){let t=this.defaults.walkTokens,r=e.walkTokens;n.walkTokens=function(e){let n=[];return Kr(n,r.call(this,e)),t&&Kr(n,t.call(this,e)),n}}this.defaults={...this.defaults,...n}}),this}setOptions(e){return this.defaults={...this.defaults,...e},this}lexer(e,t){return Vr.lex(e,t??this.defaults)}parser(e,t){return Wr.parse(e,t??this.defaults)}parseMarkdown(e){return(t,n)=>{let r={...n},i={...this.defaults,...r},a=this.onError(!!i.silent,!!i.async);if(this.defaults.async===!0&&r.async===!1)return a(Error(`marked(): The async option was set to true by an extension. Remove async: false from the parse options object to return a Promise.`));if(typeof t>`u`||t===null)return a(Error(`marked(): input parameter is undefined or null`));if(typeof t!=`string`)return a(Error(`marked(): input parameter is of type `+Object.prototype.toString.call(t)+`, string expected`));if(i.hooks&&(i.hooks.options=i,i.hooks.block=e),i.async)return(async()=>{let n=i.hooks?await i.hooks.preprocess(t):t,r=await(i.hooks?await i.hooks.provideLexer(e):e?Vr.lex:Vr.lexInline)(n,i),a=i.hooks?await i.hooks.processAllTokens(r):r;i.walkTokens&&await Promise.all(this.walkTokens(a,i.walkTokens));let o=await(i.hooks?await i.hooks.provideParser(e):e?Wr.parse:Wr.parseInline)(a,i);return i.hooks?await i.hooks.postprocess(o):o})().catch(a);try{i.hooks&&(t=i.hooks.preprocess(t));let n=(i.hooks?i.hooks.provideLexer(e):e?Vr.lex:Vr.lexInline)(t,i);i.hooks&&(n=i.hooks.processAllTokens(n)),i.walkTokens&&this.walkTokens(n,i.walkTokens);let r=(i.hooks?i.hooks.provideParser(e):e?Wr.parse:Wr.parseInline)(n,i);return i.hooks&&(r=i.hooks.postprocess(r)),r}catch(e){return a(e)}}}onError(e,t){return n=>{if(n.message+=`
Please report this to https://github.com/markedjs/marked.`,e){let e=`<p>An error occurred:</p><pre>`+Sr(n.message+``,!0)+`</pre>`;return t?Promise.resolve(e):e}if(t)return Promise.reject(n);throw n}}};function z(e,t){return qr.parse(e,t)}z.options=z.setOptions=function(e){return qr.setOptions(e),z.defaults=qr.defaults,Qt(z.defaults),z},z.getDefaults=Xt,z.defaults=Zt;function Jr(...e){return qr.use(...e),z.defaults=qr.defaults,Qt(z.defaults),z}z.use=Jr,z.walkTokens=function(e,t){return qr.walkTokens(e,t)},z.parseInline=qr.parseInline,z.Parser=Wr,z.parser=Wr.parse,z.Renderer=Hr,z.TextRenderer=Ur,z.Lexer=Vr,z.lexer=Vr.lex,z.Tokenizer=Br,z.Hooks=Gr,z.parse=z,z.options,z.setOptions,z.walkTokens,z.parseInline,Wr.parse,Vr.lex;function Yr({source:e,className:t}){let n=(0,_.useMemo)(()=>Yt.sanitize(z.parse(e,{async:!1,gfm:!0})),[e]);return(0,D.jsx)(`div`,{className:t,dangerouslySetInnerHTML:{__html:n}})}async function Xr(){return E.available?await E.request(`app.info`):{version:`dev`,platform:`web`,logDirectory:``,rounded:!1,debug:!1}}async function Zr(){return E.available?await E.request(`app.startup`):{supported:!1,enabled:!1}}async function Qr(e){return await E.request(`app.setStartup`,{enabled:e})}async function $r(e){E.available?await E.request(`system.openUrl`,{url:e}):window.open(e,`_blank`,`noreferrer`)}async function ei(){E.available&&await li(`update.openLogs`)}async function ti(e){E.available?await li(`update.openRelease`):e&&window.open(e,`_blank`,`noreferrer`)}async function ni(){return E.available?await E.request(`update.status`)??null:null}async function ri(){return E.available?await E.request(`update.check`):{current:`dev`,latest:`dev`,available:!1}}async function ii(){return E.available?await E.request(`update.download`,void 0,3e4):{ok:!1,error:`The desktop host is not available.`}}async function ai(){await li(`update.cancel`)}async function oi(){return E.available?await E.request(`update.install`,void 0,3e4):{ok:!1,error:`The desktop host is not available.`}}function si(e){return E.on(t=>{t.type===`update.progress`&&e(t.data)})}function ci(e){return E.on(t=>{t.type===`update.changelog`&&e(t.data)})}async function li(e,t,n=3e4){let r=await E.request(e,t,n);if(!r.ok)throw Error(r.error??`The action failed.`)}var ui=`-ms-`,di=`-moz-`,B=`-webkit-`,fi=`comm`,pi=`rule`,mi=`decl`,hi=`@import`,gi=`@namespace`,_i=`@keyframes`,vi=`@layer`,yi=Math.abs,bi=String.fromCharCode,xi=Object.assign;function Si(e,t){return Ei(e,0)^45?(((t<<2^Ei(e,0))<<2^Ei(e,1))<<2^Ei(e,2))<<2^Ei(e,3):0}function Ci(e){return e.trim()}function wi(e,t){return(e=t.exec(e))?e[0]:e}function V(e,t,n){return e.replace(t,n)}function Ti(e,t,n){return e.indexOf(t,n)}function Ei(e,t){return e.charCodeAt(t)|0}function Di(e,t,n){return e.slice(t,n)}function Oi(e){return e.length}function ki(e){return e.length}function Ai(e,t){return t.push(e),e}function ji(e,t){return e.map(t).join(``)}function Mi(e,t){return e.filter(function(e){return!wi(e,t)})}var Ni=1,Pi=1,Fi=0,Ii=0,Li=0,Ri=``;function zi(e,t,n,r,i,a,o,s){return{value:e,root:t,parent:n,type:r,props:i,children:a,line:Ni,column:Pi,length:o,return:``,siblings:s}}function Bi(e,t){return xi(zi(``,null,null,``,null,null,0,e.siblings),e,{length:-e.length},t)}function Vi(e){for(;e.root;)e=Bi(e.root,{children:[e]});Ai(e,e.siblings)}function Hi(){return Li}function Ui(){return Li=Ii>0?Ei(Ri,--Ii):0,Pi--,Li===10&&(Pi=1,Ni--),Li}function Wi(){return Li=Ii<Fi?Ei(Ri,Ii++):0,Pi++,Li===10&&(Pi=1,Ni++),Li}function Gi(){return Ei(Ri,Ii)}function Ki(){return Ii}function qi(e,t){return Di(Ri,e,t)}function Ji(e){switch(e){case 0:case 9:case 10:case 13:case 32:return 5;case 33:case 43:case 44:case 47:case 62:case 64:case 126:case 59:case 123:case 125:return 4;case 58:return 3;case 34:case 39:case 40:case 91:return 2;case 41:case 93:return 1}return 0}function Yi(e){return Ni=Pi=1,Fi=Oi(Ri=e),Ii=0,[]}function Xi(e){return Ri=``,e}function Zi(e){return Ci(qi(Ii-1,ea(e===91?e+2:e===40?e+1:e)))}function Qi(e){for(;(Li=Gi())&&Li<33;)Wi();return Ji(e)>2||Ji(Li)>3?``:` `}function $i(e,t){for(;--t&&Wi()&&!(Li<48||Li>102||Li>57&&Li<65||Li>70&&Li<97););return qi(e,Ki()+(t<6&&Gi()==32&&Wi()==32))}function ea(e){for(;Wi();)switch(Li){case e:return Ii;case 34:case 39:e!==34&&e!==39&&ea(Li);break;case 40:e===41&&ea(e);break;case 92:Wi()}return Ii}function ta(e,t){for(;Wi()&&e+Li!==57&&(e+Li!==84||Gi()!==47););return`/*`+qi(t,Ii-1)+`*`+bi(e===47?e:Wi())}function na(e){for(;!Ji(Gi());)Wi();return qi(e,Ii)}function H(e){return Xi(ra(``,null,null,null,[``],e=Yi(e),0,[0],e))}function ra(e,t,n,r,i,a,o,s,c){for(var l=0,u=0,d=o,f=0,p=0,m=0,h=1,g=1,_=1,v=0,y=``,b=i,x=a,S=r,C=y;g;)switch(m=v,v=Wi()){case 40:if(m!=108&&Ei(C,d-1)==58){Ti(C+=V(Zi(v),`&`,`&\f`),`&\f`,yi(l?s[l-1]:0))!=-1&&(_=-1);break}case 34:case 39:case 91:C+=Zi(v);break;case 9:case 10:case 13:case 32:C+=Qi(m);break;case 92:C+=$i(Ki()-1,7);continue;case 47:switch(Gi()){case 42:case 47:Ai(aa(ta(Wi(),Ki()),t,n,c),c),(Ji(m||1)==5||Ji(Gi()||1)==5)&&Oi(C)&&Di(C,-1,void 0)!==` `&&(C+=` `);break;default:C+=`/`}break;case 123*h:s[l++]=Oi(C)*_;case 125*h:case 59:case 0:switch(v){case 0:case 125:g=0;case 59+u:_==-1&&(C=V(C,/\f/g,``)),p>0&&(Oi(C)-d||h===0&&m===47)&&Ai(p>32?oa(C+`;`,r,n,d-1,c):oa(V(C,` `,``)+`;`,r,n,d-2,c),c);break;case 59:C+=`;`;default:if(Ai(S=ia(C,t,n,l,u,i,s,y,b=[],x=[],d,a),a),v===123){if(u===0)ra(C,t,S,S,b,a,d,s,x);else{switch(f){case 99:if(Ei(C,3)===110)break;case 108:if(Ei(C,2)===97)break;default:u=0;case 100:case 109:case 115:}u?ra(e,S,S,r&&Ai(ia(e,S,S,0,0,i,s,y,i,b=[],d,x),x),i,x,d,s,r?b:x):ra(C,S,S,S,[``],x,0,s,x)}}}l=u=p=0,h=_=1,y=C=``,d=o;break;case 58:d=1+Oi(C),p=m;default:if(h<1){if(v==123)--h;else if(v==125&&h++==0&&Ui()==125)continue}switch(C+=bi(v),v*h){case 38:_=u>0?1:(C+=`\f`,-1);break;case 44:s[l++]=(Oi(C)-1)*_,_=1;break;case 64:Gi()===45&&(C+=Zi(Wi())),f=Gi(),u=d=Oi(y=C+=na(Ki())),v++;break;case 45:m===45&&Oi(C)==2&&(h=0)}}return a}function ia(e,t,n,r,i,a,o,s,c,l,u,d){for(var f=i-1,p=i===0?a:[``],m=ki(p),h=0,g=0,_=0;h<r;++h)for(var v=0,y=Di(e,f+1,f=yi(g=o[h])),b=e;v<m;++v)(b=Ci(g>0?p[v]+` `+y:V(y,/&\f/g,p[v])))&&(c[_++]=b);return zi(e,t,n,i===0?pi:s,c,l,u,d)}function aa(e,t,n,r){return zi(e,t,n,fi,bi(Hi()),Di(e,2,-2),0,r)}function oa(e,t,n,r,i){return zi(e,t,n,mi,Di(e,0,r),Di(e,r+1,-1),r,i)}function sa(e,t,n){switch(Si(e,t)){case 5103:return B+`print-`+e+e;case 5737:case 4201:case 3177:case 3433:case 1641:case 4457:case 2921:case 5572:case 6356:case 5844:case 3191:case 6645:case 3005:case 4215:case 6389:case 5109:case 5365:case 5621:case 3829:case 6391:case 5879:case 5623:case 6135:case 4599:return B+e+e;case 4855:return B+e.replace(`add`,`source-over`).replace(`substract`,`source-out`).replace(`intersect`,`source-in`).replace(`exclude`,`xor`)+e;case 4789:return di+e+e;case 5349:case 4246:case 4810:case 6968:case 2756:return B+e+di+e+ui+e+e;case 5936:switch(Ei(e,t+11)){case 114:return B+e+ui+V(e,/[svh]\w+-[tblr]{2}/,`tb`)+e;case 108:return B+e+ui+V(e,/[svh]\w+-[tblr]{2}/,`tb-rl`)+e;case 45:return B+e+ui+V(e,/[svh]\w+-[tblr]{2}/,`lr`)+e}case 6828:case 4268:case 2903:return B+e+ui+e+e;case 6165:return B+e+ui+`flex-`+e+e;case 5187:return B+e+V(e,/(\w+).+(:[^]+)/,B+`box-$1$2`+ui+`flex-$1$2`)+e;case 5443:return B+e+ui+`flex-item-`+V(e,/flex-|-self/g,``)+(wi(e,/flex-|baseline/)?``:ui+`grid-row-`+V(e,/flex-|-self/g,``))+e;case 4675:return B+e+ui+`flex-line-pack`+V(e,/align-content|flex-|-self/g,``)+e;case 5548:return B+e+ui+V(e,`shrink`,`negative`)+e;case 5292:return B+e+ui+V(e,`basis`,`preferred-size`)+e;case 6060:return B+`box-`+V(e,`-grow`,``)+B+e+ui+V(e,`grow`,`positive`)+e;case 4554:return B+V(e,/([^-])(transform)/g,`$1`+B+`$2`)+e;case 6187:return V(V(V(e,/(zoom-|grab)/,B+`$1`),/(image-set)/,B+`$1`),e,``)+e;case 5495:case 3959:return V(e,/(image-set\([^]*)/,B+"$1$`$1");case 4968:return V(V(e,/(.+:)(flex-)?(.*)/,B+`box-pack:$3`+ui+`flex-pack:$3`),/space-between/,`justify`)+B+e+e;case 4200:if(!wi(e,/flex-|baseline/))return ui+`grid-column-align`+Di(e,t)+e;break;case 2592:case 3360:return ui+V(e,`template-`,``)+e;case 4384:case 3616:return n&&n.some(function(e,n){return t=n,wi(e.props,/grid-\w+-end/)})?~Ti(e+(n=n[t].value),`span`,0)?e:ui+V(e,`-start`,``)+e+ui+`grid-row-span:`+(~Ti(n,`span`,0)?wi(n,/\d+/):+wi(n,/\d+/)-wi(e,/\d+/))+`;`:ui+V(e,`-start`,``)+e;case 4896:case 4128:return n&&n.some(function(e){return wi(e.props,/grid-\w+-start/)})?e:ui+V(V(e,`-end`,`-span`),`span `,``)+e;case 4095:case 3583:case 4068:case 2532:return V(e,/(.+)-inline(.+)/,B+`$1$2`)+e;case 8116:case 7059:case 5753:case 5535:case 5445:case 5701:case 4933:case 4677:case 5533:case 5789:case 5021:case 4765:if(Oi(e)-1-t>6)switch(Ei(e,t+1)){case 109:if(Ei(e,t+4)!==45)break;case 102:return V(e,/(.+:)(.+)-([^]+)/,`$1`+B+`$2-$3$1`+di+(Ei(e,t+3)==108?`$3`:`$2-$3`))+e;case 115:return~Ti(e,`stretch`,0)?sa(V(e,`stretch`,`fill-available`),t,n)+e:e}break;case 5152:case 5920:return V(e,/(.+?):(\d+)(\s*\/\s*(span)?\s*(\d+))?(.*)/,function(t,n,r,i,a,o,s){return ui+n+`:`+r+s+(i?ui+n+`-span:`+(a?o:+o-r)+s:``)+e});case 4949:if(Ei(e,t+6)===121)return V(e,`:`,`:`+B)+e;break;case 6444:switch(Ei(e,Ei(e,14)===45?18:11)){case 120:return V(e,/(.+:)([^;\s!]+)(;|(\s+)?!.+)?/,`$1`+B+(Ei(e,14)===45?`inline-`:``)+`box$3$1`+B+`$2$3$1`+ui+`$2box$3`)+e;case 100:return V(e,`:`,`:`+ui)+e}break;case 5719:case 2647:case 2135:case 3927:case 2391:return V(e,`scroll-`,`scroll-snap-`)+e}return e}function ca(e,t){for(var n=``,r=0;r<e.length;r++)n+=t(e[r],r,e,t)||``;return n}function la(e,t,n,r){switch(e.type){case vi:if(e.children.length)break;case hi:case gi:case mi:return e.return=e.return||e.value;case fi:return``;case _i:return e.return=e.value+`{`+ca(e.children,r)+`}`;case pi:if(!Oi(e.value=e.props.join(`,`)))return``}return Oi(n=ca(e.children,r))?e.return=e.value+`{`+n+`}`:``}function ua(e){var t=ki(e);return function(n,r,i,a){for(var o=``,s=0;s<t;s++)o+=e[s](n,r,i,a)||``;return o}}function da(e){return function(t){t.root||(t=t.return)&&e(t)}}function fa(e,t,n,r){if(e.length>-1&&!e.return)switch(e.type){case mi:e.return=sa(e.value,e.length,n);return;case _i:return ca([Bi(e,{value:V(e.value,`@`,`@`+B)})],r);case pi:if(e.length)return ji(n=e.props,function(t){switch(wi(t,r=/(::plac\w+|:read-\w+)/)){case`:read-only`:case`:read-write`:Vi(Bi(e,{props:[V(t,/:(read-\w+)/,`:`+di+`$1`)]})),Vi(Bi(e,{props:[t]})),xi(e,{props:Mi(n,r)});break;case`::placeholder`:Vi(Bi(e,{props:[V(t,/:(plac\w+)/,`:`+B+`input-$1`)]})),Vi(Bi(e,{props:[V(t,/:(plac\w+)/,`:`+di+`$1`)]})),Vi(Bi(e,{props:[V(t,/:(plac\w+)/,ui+`input-$1`)]})),Vi(Bi(e,{props:[t]})),xi(e,{props:Mi(n,r)})}return``})}}function pa(e,...t){return Error(`An error occurred. See https://github.com/styled-components/styled-components/blob/main/packages/styled-components/src/utils/errors.md#${e} for more information.${t.length>0?` Args: ${t.join(`, `)}`:``}`)}var ma=typeof process<`u`&&({}.REACT_APP_SC_ATTR||{}.SC_ATTR)||`data-styled`,ha=`active`,ga=`data-styled-version`,_a=`6.6.0`,va=`/*!sc*/
`,ya=typeof window<`u`&&typeof document<`u`;if(!_.createContext)throw pa(19);function ba(e){if(typeof process<`u`){let t={}[e];if(t!==void 0&&t!==``)return t!==`false`}}var xa=!!(typeof SC_DISABLE_SPEEDY==`boolean`?SC_DISABLE_SPEEDY:ba(`REACT_APP_SC_DISABLE_SPEEDY`)??ba(`SC_DISABLE_SPEEDY`)??(typeof process<`u`&&!1)),Sa=`sc-keyframes-`,Ca=new Map,wa=new Map,Ta=1,Ea=e=>{if(Ca.has(e))return Ca.get(e);for(;wa.has(Ta);)Ta++;let t=Ta++;return Ca.set(e,t),wa.set(t,e),t},Da=e=>wa.get(e),Oa=(e,t)=>{Ta=t+1,Ca.set(e,t),wa.set(t,e)},ka=Object.freeze([]),Aa=Object.freeze({});function ja(e,t,n=Aa){return e.theme!==n.theme&&e.theme||t||n.theme}var Ma=/[!"#$%&'()*+,./:;<=>?@[\\\]^`{|}~-]+/g,Na=/(^-|-$)/g;function Pa(e){return e.replace(Ma,`-`).replace(Na,``)}var Fa=/(a)(d)/gi,Ia=e=>String.fromCharCode(e+(e>25?39:97));function La(e){let t,n=``;for(t=Math.abs(e);t>52;t=t/52|0)n=Ia(t%52)+n;return(Ia(t%52)+n).replace(Fa,`$1-$2`)}var Ra=5381,za=(e,t)=>{let n=t.length;for(;n;)e=33*e^t.charCodeAt(--n);return e},Ba=e=>za(Ra,e);function Va(e){return La(Ba(e)>>>0)}function Ha(e){return e.displayName||e.name||`Component`}function Ua(e){return typeof e==`string`&&!0}function Wa(e){return Ua(e)?`styled.${e}`:`Styled(${Ha(e)})`}var Ga=Symbol.for(`react.memo`),Ka=Symbol.for(`react.forward_ref`),qa={contextType:!0,defaultProps:!0,displayName:!0,getDerivedStateFromError:!0,getDerivedStateFromProps:!0,propTypes:!0,type:!0},Ja={name:!0,length:!0,prototype:!0,caller:!0,callee:!0,arguments:!0,arity:!0},Ya={$$typeof:!0,compare:!0,defaultProps:!0,displayName:!0,propTypes:!0,type:!0},Xa={[Ka]:{$$typeof:!0,render:!0,defaultProps:!0,displayName:!0,propTypes:!0},[Ga]:Ya};function Za(e){return(`type`in(t=e)&&t.type.$$typeof)===Ga?Ya:`$$typeof`in e?Xa[e.$$typeof]:qa;var t}var Qa=Object.defineProperty,$a=Object.getOwnPropertyNames,eo=Object.getOwnPropertySymbols,to=Object.getOwnPropertyDescriptor,no=Object.getPrototypeOf,ro=Object.prototype;function io(e,t,n){if(typeof t!=`string`){let r=no(t);r&&r!==ro&&io(e,r,n);let i=$a(t).concat(eo(t)),a=Za(e),o=Za(t);for(let r=0;r<i.length;++r){let s=i[r];if(!(s in Ja||n&&n[s]||o&&s in o||a&&s in a)){let n=to(t,s);try{Qa(e,s,n)}catch{}}}}return e}function ao(e){return typeof e==`function`}var oo=Symbol.for(`react.forward_ref`);function so(e){return e!=null&&(typeof e==`object`||typeof e==`function`)&&e.$$typeof===oo&&`styledComponentId`in e}function co(e,t){return e&&t?e+` `+t:e||t||``}function lo(e,t){return e.join(t||``)}function uo(e){return typeof e==`object`&&!!e&&e.constructor.name===Object.name&&!(`props`in e&&e.$$typeof)}function fo(e,t,n=!1){if(!n&&!uo(e)&&!Array.isArray(e))return t;if(Array.isArray(t))for(let n=0;n<t.length;n++)e[n]=fo(e[n],t[n]);else if(uo(t))for(let n in t)e[n]=fo(e[n],t[n]);return e}function po(e,t){Object.defineProperty(e,"toString",{value:t})}var mo=class{constructor(e){this.groupSizes=new Uint32Array(512),this.length=512,this.tag=e,this._cGroup=0,this._cIndex=0}indexOfGroup(e){if(e===this._cGroup)return this._cIndex;let t=this._cIndex;if(e>this._cGroup)for(let n=this._cGroup;n<e;n++)t+=this.groupSizes[n];else for(let n=this._cGroup-1;n>=e;n--)t-=this.groupSizes[n];return this._cGroup=e,this._cIndex=t,t}insertRules(e,t){if(e>=this.groupSizes.length){let t=this.groupSizes,n=t.length,r=n;for(;e>=r;)if(r<<=1,r<0)throw pa(16,`${e}`);this.groupSizes=new Uint32Array(r),this.groupSizes.set(t),this.length=r;for(let e=n;e<r;e++)this.groupSizes[e]=0}let n=this.indexOfGroup(e+1),r=0;for(let i=0,a=t.length;i<a;i++)this.tag.insertRule(n,t[i])&&(this.groupSizes[e]++,n++,r++);r>0&&this._cGroup>e&&(this._cIndex+=r)}clearGroup(e){if(e<this.length){let t=this.groupSizes[e],n=this.indexOfGroup(e),r=n+t;this.groupSizes[e]=0;for(let e=n;e<r;e++)this.tag.deleteRule(n);t>0&&this._cGroup>e&&(this._cIndex-=t)}}getGroup(e){let t=``;if(e>=this.length||this.groupSizes[e]===0)return t;let n=this.groupSizes[e],r=this.indexOfGroup(e),i=r+n;for(let e=r;e<i;e++)t+=this.tag.getRule(e)+va;return t}},ho=`style[${ma}][${ga}="${_a}"]`,go=RegExp(`^${ma}\\.g(\\d+)\\[id="([\\w\\d-]+)"\\].*?"([^"]*)`),_o=e=>typeof ShadowRoot<`u`&&e instanceof ShadowRoot||`host`in e&&e.nodeType===11,vo=e=>{if(!e)return document;if(_o(e))return e;if(`getRootNode`in e){let t=e.getRootNode();if(_o(t))return t}return document},yo=(e,t,n)=>{let r=n.split(`,`),i;for(let n=0,a=r.length;n<a;n++)(i=r[n])&&e.registerName(t,i)},bo=(e,t)=>{let n=(t.textContent??``).split(va),r=[];for(let t=0,i=n.length;t<i;t++){let i=n[t].trim();if(!i)continue;let a=i.match(go);if(a){let t=0|parseInt(a[1],10),n=a[2];t!==0&&(Oa(n,t),yo(e,n,a[3]),e.getTag().insertRules(t,r)),r.length=0}else r.push(i)}},xo=e=>{let t=vo(e.options.target).querySelectorAll(ho);for(let n=0,r=t.length;n<r;n++){let r=t[n];r&&r.getAttribute(ma)!==ha&&(bo(e,r),r.parentNode&&r.parentNode.removeChild(r))}},So=!1;function Co(){if(!1!==So)return So;if(typeof document<`u`){let e=document.head.querySelector(`meta[property="csp-nonce"]`);if(e)return So=e.nonce||e.getAttribute(`content`)||void 0;let t=document.head.querySelector(`meta[name="sc-nonce"]`);if(t)return So=t.getAttribute(`content`)||void 0}return So=typeof __webpack_nonce__<`u`?__webpack_nonce__:void 0}var wo=(e,t)=>{if(typeof document>`u`)throw pa(20);let n=document.head,r=e||n,i=document.createElement(`style`),a=(e=>{let t=Array.from(e.querySelectorAll(`style[${ma}]`));return t[t.length-1]})(r),o=a===void 0?null:a.nextSibling;i.setAttribute(ma,ha),i.setAttribute(ga,_a);let s=t||Co();return s&&i.setAttribute(`nonce`,s),r.insertBefore(i,o),i},To=class{constructor(e,t){this.element=wo(e,t),this.element.appendChild(document.createTextNode(``)),this.sheet=(e=>{if(e.sheet)return e.sheet;let t=e.getRootNode().styleSheets??document.styleSheets;for(let n=0,r=t.length;n<r;n++){let r=t[n];if(r.ownerNode===e)return r}throw pa(17)})(this.element),this.length=0}insertRule(e,t){try{return this.sheet.insertRule(t,e),this.length++,!0}catch{return!1}}deleteRule(e){this.sheet.deleteRule(e),this.length--}getRule(e){let t=this.sheet.cssRules[e];return t&&t.cssText?t.cssText:``}},Eo=class{constructor(e,t){this.element=wo(e,t),this.nodes=this.element.childNodes,this.length=0}insertRule(e,t){if(e<=this.length&&e>=0){let n=document.createTextNode(t);return this.element.insertBefore(n,this.nodes[e]||null),this.length++,!0}return!1}deleteRule(e){this.element.removeChild(this.nodes[e]),this.length--}getRule(e){return e<this.length?this.nodes[e].textContent:``}},Do=ya,Oo={isServer:!ya,useCSSOMInjection:!xa},ko=class e{static registerId(e){return Ea(e)}constructor(e=Aa,t={},n){this.options=Object.assign(Object.assign({},Oo),e),this.gs=t,this.keyframeIds=new Set,this.names=new Map(n),this.server=!!e.isServer,!this.server&&ya&&Do&&(Do=!1,xo(this)),po(this,()=>(e=>{let t=e.getTag(),{length:n}=t,r=``;for(let i=0;i<n;i++){let n=Da(i);if(n===void 0)continue;let a=e.names.get(n);if(a===void 0||!a.size)continue;let o=t.getGroup(i);if(o.length===0)continue;let s=ma+`.g`+i+`[id="`+n+`"]`,c=``;for(let e of a)e.length>0&&(c+=e+`,`);r+=o+s+`{content:"`+c+`"}/*!sc*/
`}return r})(this))}rehydrate(){!this.server&&ya&&xo(this)}reconstructWithOptions(t,n=!0){let r=new e(Object.assign(Object.assign({},this.options),t),this.gs,n&&this.names||void 0);return r.keyframeIds=new Set(this.keyframeIds),!this.server&&ya&&t.target!==this.options.target&&vo(this.options.target)!==vo(t.target)&&xo(r),r}allocateGSInstance(e){return this.gs[e]=(this.gs[e]||0)+1}getTag(){return this.tag||=(e=(({useCSSOMInjection:e,target:t,nonce:n})=>e?new To(t,n):new Eo(t,n))(this.options),new mo(e));var e}hasNameForId(e,t){var n;return(n=this.names.get(e)?.has(t))!=null&&n}registerName(e,t){Ea(e),e.startsWith(Sa)&&this.keyframeIds.add(e);let n=this.names.get(e);n?n.add(t):this.names.set(e,new Set([t]))}insertRules(e,t,n){this.registerName(e,t),this.getTag().insertRules(Ea(e),n)}clearNames(e){this.names.has(e)&&this.names.get(e).clear()}clearRules(e){this.getTag().clearGroup(Ea(e)),this.clearNames(e)}clearTag(){this.tag=void 0}},Ao=new WeakSet,jo={animationIterationCount:1,aspectRatio:1,borderImageOutset:1,borderImageSlice:1,borderImageWidth:1,columnCount:1,columns:1,flex:1,flexGrow:1,flexShrink:1,gridRow:1,gridRowEnd:1,gridRowSpan:1,gridRowStart:1,gridColumn:1,gridColumnEnd:1,gridColumnSpan:1,gridColumnStart:1,fontWeight:1,lineHeight:1,opacity:1,order:1,orphans:1,scale:1,tabSize:1,widows:1,zIndex:1,zoom:1,WebkitLineClamp:1,fillOpacity:1,floodOpacity:1,stopOpacity:1,strokeDasharray:1,strokeDashoffset:1,strokeMiterlimit:1,strokeOpacity:1,strokeWidth:1};function Mo(e,t){return t==null||typeof t==`boolean`||t===``?``:typeof t!=`number`||t===0||e in jo||e.startsWith(`--`)?String(t).trim():t+`px`}var No=47;function Po(e){if(e.charCodeAt(0)===45&&e.charCodeAt(1)===45)return e;let t=``;for(let n=0;n<e.length;n++){let r=e.charCodeAt(n);t+=r>=65&&r<=90?`-`+String.fromCharCode(r+32):e[n]}return t.startsWith(`ms-`)?`-`+t:t}var Fo=Symbol.for(`sc-keyframes`);function Io(e){return typeof e==`object`&&!!e&&Fo in e}function Lo(e){return ao(e)&&!(e.prototype&&e.prototype.isReactComponent)}var Ro=e=>e==null||!1===e||e===``,zo=Symbol.for(`react.client.reference`);function Bo(e){return e.$$typeof===zo}function U(e,t){for(let n in e){let r=e[n];e.hasOwnProperty(n)&&!Ro(r)&&(Array.isArray(r)&&Ao.has(r)||ao(r)?t.push(Po(n)+`:`,r,`;`):uo(r)?(t.push(n+` {`),U(r,t),t.push(`}`)):t.push(Po(n)+`: `+Mo(n,r)+`;`))}}function W(e,t,n,r,i=[]){if(Ro(e))return i;let a=typeof e;if(a===`string`)return i.push(e),i;if(a===`function`)return Bo(e)?i:Lo(e)&&t?W(e(t),t,n,r,i):(i.push(e),i);if(Array.isArray(e)){for(let a=0;a<e.length;a++)W(e[a],t,n,r,i);return i}return so(e)?(i.push(`.${e.styledComponentId}`),i):Io(e)?(n?(e.inject(n,r),i.push(e.getName(r))):i.push(e),i):Bo(e)?i:uo(e)&&e.toString===Object.prototype.toString?(U(e,i),i):(i.push(e.toString()),i)}var Vo=Ba(_a),Ho=class{constructor(e,t,n){this.rules=e,this.componentId=t,this.baseHash=za(Vo,t),this.baseStyle=n,ko.registerId(t)}generateAndInjectStyles(e,t,n){let r=this.baseStyle?this.baseStyle.generateAndInjectStyles(e,t,n):``;{let i=``;for(let r=0;r<this.rules.length;r++){let a=this.rules[r];if(typeof a==`string`)i+=a;else if(a){if(Lo(a)){let r=a(e);typeof r==`string`?i+=r:r!=null&&!1!==r&&(i+=lo(W(r,e,t,n)))}else i+=lo(W(a,e,t,n))}}if(i){this.dynamicNameCache||=new Map;let e=n.hash?n.hash+i:i,a=this.dynamicNameCache.get(e);if(!a){if(a=La(za(za(this.baseHash,n.hash),i)>>>0),this.dynamicNameCache.size>=200){let e=this.dynamicNameCache.keys().next().value;e!==void 0&&this.dynamicNameCache.delete(e)}this.dynamicNameCache.set(e,a)}if(!t.hasNameForId(this.componentId,a)){let e=n(i,`.`+a,void 0,this.componentId);t.insertRules(this.componentId,a,e)}r=co(r,a)}}return r}},Uo=/&/g;function Wo(e,t){let n=0;for(;--t>=0&&e.charCodeAt(t)===92;)n++;return!(1&~n)}function Go(e){let t=e.length,n=``,r=0,i=0,a=0,o=!1,s=!1;for(let c=0;c<t;c++){let l=e.charCodeAt(c);if(a!==0||o||l!==No||e.charCodeAt(c+1)!==42){if(o)l===42&&e.charCodeAt(c+1)===No&&(o=!1,c++);else if(l!==34&&l!==39||Wo(e,c)){if(a===0){if(l===123)i++;else if(l===125){if(i--,i<0){s=!0;let n=c+1;for(;n<t;){let t=e.charCodeAt(n);if(t===59||t===10)break;n++}n<t&&e.charCodeAt(n)===59&&n++,i=0,c=n-1,r=n;continue}i===0&&(n+=e.substring(r,c+1),r=c+1)}else l===59&&i===0&&(n+=e.substring(r,c+1),r=c+1)}}else a===0?a=l:a===l&&(a=0)}else o=!0,c++}return s||i!==0||a!==0?(r<t&&i===0&&a===0&&(n+=e.substring(r)),n):e}function Ko(e,t){let n=t+` `,r=`,`+n;for(let i=0;i<e.length;i++){let a=e[i];if(a.type===`rule`){a.value=(n+a.value).replaceAll(`,`,r);let e=a.props,t=[];for(let r=0;r<e.length;r++)t[r]=n+e[r];a.props=t}Array.isArray(a.children)&&a.type!==`@keyframes`&&Ko(a.children,t)}return e}function qo({options:e=Aa,plugins:t=ka}=Aa){let n,r,i,a=(e,t,i)=>i.startsWith(r)&&i.endsWith(r)&&i.replaceAll(r,``).length>0?`.${n}`:e,o=t.slice();o.push(e=>{e.type===`rule`&&e.value.includes(`&`)&&(i||=RegExp(`\\${r}\\b`,`g`),e.props[0]=e.props[0].replace(Uo,r).replace(i,a))}),e.prefix&&o.push(fa),o.push(la);let s=[],c=ua(o.concat(da(e=>s.push(e)))),l=(t,a=``,o=``,l=`&`)=>{n=l,r=a,i=void 0;let u=function(e){let t=e.indexOf(`//`)!==-1,n=e.indexOf(`}`)!==-1;if(!t&&!n)return e;if(!t)return Go(e);let r=e.length,i=``,a=0,o=0,s=0,c=0,l=0,u=!1;for(;o<r;){let t=e.charCodeAt(o);if(t!==34&&t!==39||Wo(e,o)){if(s===0){if(t===No&&o+1<r&&e.charCodeAt(o+1)===42){for(o+=2;o+1<r&&(e.charCodeAt(o)!==42||e.charCodeAt(o+1)!==No);)o++;o+=2}else if(t!==40){if(t!==41){if(c>0)o++;else if(t===42&&o+1<r&&e.charCodeAt(o+1)===No)i+=e.substring(a,o),o+=2,a=o,u=!0;else if(t===No&&o+1<r&&e.charCodeAt(o+1)===No){for(i+=e.substring(a,o);o<r&&e.charCodeAt(o)!==10;)o++;a=o,u=!0}else t===123?l++:t===125&&l--,o++}else c>0&&c--,o++}else c++,o++}else o++}else s===0?s=t:s===t&&(s=0),o++}return u?(a<r&&(i+=e.substring(a)),l===0?i:Go(i)):l===0?e:Go(e)}(t),d=H(o||a?o+` `+a+` { `+u+` }`:u);return e.namespace&&(d=Ko(d,e.namespace)),s=[],ca(d,c),s},u=e,d=Ra;for(let e=0;e<t.length;e++)t[e].name||pa(15),d=za(d,t[e].name);return u!=null&&u.namespace&&(d=za(d,u.namespace)),u!=null&&u.prefix&&(d=za(d,`p`)),l.hash=d===Ra?``:d.toString(),l}var Jo=new ko,Yo=qo(),Xo=_.createContext({shouldForwardProp:void 0,styleSheet:Jo,stylis:Yo,stylisPlugins:void 0});Xo.Consumer;function Zo(){return _.useContext(Xo)}var Qo=_.createContext(void 0);Qo.Consumer;var $o={};function es(e,t){let n=typeof e==`string`?Pa(e):`sc`;$o[n]=($o[n]||0)+1;let r=n+`-`+Va(_a+n+$o[n]);return t?t+`-`+r:r}function ts(e,t,n){let r=so(e),i=e,a=!Ua(e),{attrs:o=ka,componentId:s=es(t.displayName,t.parentComponentId),displayName:c=Wa(e)}=t,l=t.displayName&&t.componentId?Pa(t.displayName)+`-`+t.componentId:t.componentId||s,u=r&&i.attrs?i.attrs.concat(o).filter(Boolean):o,{shouldForwardProp:d}=t;if(r&&i.shouldForwardProp){let e=i.shouldForwardProp;if(t.shouldForwardProp){let n=t.shouldForwardProp;d=(t,r)=>e(t,r)&&n(t,r)}else d=e}let f=new Ho(n,l,r?i.componentStyle:void 0);function p(e,t){return function(e,t,n){let{attrs:r,componentStyle:i,defaultProps:a,foldedComponentIds:o,styledComponentId:s,target:c}=e,l=_.useContext(Qo),u=Zo(),d=e.shouldForwardProp||u.shouldForwardProp,f=ja(t,l,a)||Aa,[p,m]=function(e,t,n){let r=Object.assign(Object.assign({},t),{className:void 0,theme:n}),i=null,a=e.length>1;for(let t=0;t<e.length;t++){let n=e[t],o=ao(n)?n(a?Object.assign({},r):r):n;for(let e in o)e===`className`?r.className=co(r.className,o[e]):e===`style`?r.style=Object.assign(Object.assign({},r.style),o[e]):o[e]===void 0?e in r&&(r[e]!==void 0&&(i||=[]).push(e),r[e]=void 0):r[e]=o[e]}return`className`in t&&typeof t.className==`string`&&(r.className=co(r.className,t.className)),[r,i]}(r,t,f),h=i.generateAndInjectStyles(p,u.styleSheet,u.stylis),g=p.as||c,v=Ua(g),y=function(e,t,n,r,i,a){let o={};for(let s in e)s[0]===`$`||s===`as`||s===`theme`&&e.theme===n||(s===`forwardedAs`?e.forwardedAs!==void 0&&(o.as=e.forwardedAs):e[s]===void 0?s===`className`||i||a!==null&&a.indexOf(s)!==-1||r&&!r(s,t)||(o[s]=void 0):r&&!r(s,t)||(o[s]=e[s]));return o}(p,g,f,d,v,m),b=co(o,s);return h&&(b+=` `+h),p.className&&(b+=` `+p.className),y[v&&g.includes(`-`)?`class`:`className`]=b,n&&(y.ref=n),(0,_.createElement)(g,y)}(m,e,t)}p.displayName=c;let m=_.forwardRef(p);return m.attrs=u,m.componentStyle=f,m.displayName=c,m.shouldForwardProp=d,m.foldedComponentIds=r?co(i.foldedComponentIds,i.styledComponentId):``,m.styledComponentId=l,m.target=r?i.target:e,Object.defineProperty(m,"defaultProps",{get(){return this._foldedDefaultProps},set(e){this._foldedDefaultProps=r?function(e,...t){for(let n of t)fo(e,n,!0);return e}({},i.defaultProps,e):e}}),po(m,()=>`.${m.styledComponentId}`),a&&io(m,e,{attrs:!0,componentStyle:!0,displayName:!0,foldedComponentIds:!0,shouldForwardProp:!0,styledComponentId:!0,target:!0}),m}var ns=new Set(`a.abbr.address.area.article.aside.audio.b.bdi.bdo.blockquote.body.button.br.canvas.caption.cite.code.col.colgroup.data.datalist.dd.del.details.dfn.dialog.div.dl.dt.em.embed.fieldset.figcaption.figure.footer.form.h1.h2.h3.h4.h5.h6.header.hgroup.hr.html.i.iframe.img.input.ins.kbd.label.legend.li.main.map.mark.menu.meter.nav.object.ol.optgroup.option.output.p.picture.pre.progress.q.rp.rt.ruby.s.samp.search.section.select.slot.small.span.strong.sub.summary.sup.table.tbody.td.template.textarea.tfoot.th.thead.time.tr.u.ul.var.video.wbr.circle.clipPath.defs.ellipse.feBlend.feColorMatrix.feComponentTransfer.feComposite.feConvolveMatrix.feDiffuseLighting.feDisplacementMap.feDistantLight.feDropShadow.feFlood.feFuncA.feFuncB.feFuncG.feFuncR.feGaussianBlur.feImage.feMerge.feMergeNode.feMorphology.feOffset.fePointLight.feSpecularLighting.feSpotLight.feTile.feTurbulence.filter.foreignObject.g.image.line.linearGradient.marker.mask.path.pattern.polygon.polyline.radialGradient.rect.stop.svg.switch.symbol.text.textPath.tspan.use`.split(`.`));function rs(e,t){let n=[e[0]];for(let r=0,i=t.length;r<i;r+=1)n.push(t[r],e[r+1]);return n}var is=e=>(Ao.add(e),e);function as(e,...t){if(ao(e)||uo(e))return is(W(rs(ka,[e,...t])));let n=e;return t.length===0&&n.length===1&&typeof n[0]==`string`?W(n):is(W(rs(n,t)))}function os(e,t,n=Aa){if(!t)throw pa(1,t);let r=(r,...i)=>e(t,n,as(r,...i));return r.attrs=r=>os(e,t,Object.assign(Object.assign({},n),{attrs:Array.prototype.concat(n.attrs,r).filter(Boolean)})),r.withConfig=r=>os(e,t,Object.assign(Object.assign({},n),r)),r}var ss=e=>os(ts,e),G=ss;ns.forEach(e=>{G[e]=ss(e)});var cs,ls=class{constructor(e,t){this[cs]=!0,this.inject=(e,t=Yo)=>{let n=this.getName(t);if(!e.hasNameForId(this.id,n)){let r=t(this.rules,n,`@keyframes`);e.insertRules(this.id,n,r)}},this.name=e,this.id=Sa+e,this.rules=t,Ea(this.id),po(this,()=>{throw pa(12,String(this.name))})}getName(e=Yo){return e.hash?this.name+La(e.hash>>>0):this.name}};function us(e,...t){let n=lo(as(e,...t));return new ls(Va(n),n)}cs=Fo,`${ma}`,`${ma}`,`${ma}`;var ds={logDirectory:``,defaultLogDirectory:``,avatarApiProviders:[],autoBlock:!0,autoDisableAvatarInteraction:!0,autoHideChatBox:!0,autoCloseVrchat:!1,autoSafeMode:!1,autoSafeAvatar:!1,safeAvatarId:``,skipCloseInVr:!0,autoRejectFriendRequests:!0,threatThreshold:70,whitelist:[],language:`system`,theme:`system`,startHidden:!1,oscPort:0};function fs(e){return e===`light`||e===`dark`?e:`system`}async function ps(){return E.available?await E.request(`settings.get`):ds}async function ms(e){return E.available?await E.request(`settings.save`,e):{...ds,...e}}async function hs(){return E.available?await E.request(`settings.reset`):{...ds}}async function gs(){return E.available?await E.request(`whitelist.people`):[]}async function _s(e,t){if(!E.available)return[];let n=await ps(),r=n.whitelist.filter(t=>t!==e);return t&&r.push(e),(await ms({...n,whitelist:r})).whitelist}var vs=`https://github.com/T2PeNBiX99wcoxKv3A4g/AntiBot/releases/latest`,ys=e=>({width:e,height:e,viewBox:`0 0 24 24`,fill:`none`,stroke:`currentColor`,strokeWidth:1.8,strokeLinecap:`round`,strokeLinejoin:`round`,"aria-hidden":!0});function bs({size:e=18}){return(0,D.jsxs)(`svg`,{...ys(e),children:[(0,D.jsx)(`path`,{d:`M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z`}),(0,D.jsx)(`path`,{d:`M14 3v5h5M8.5 13h7M8.5 17h4`})]})}function xs({size:e=18}){return(0,D.jsxs)(`svg`,{...ys(e),children:[(0,D.jsx)(`path`,{d:`M4 7h16M4 17h16`}),(0,D.jsx)(`circle`,{cx:`9`,cy:`7`,r:`2`}),(0,D.jsx)(`circle`,{cx:`15`,cy:`17`,r:`2`})]})}function Ss({size:e=16}){return(0,D.jsxs)(`svg`,{...ys(e),children:[(0,D.jsx)(`circle`,{cx:`11`,cy:`11`,r:`6.5`}),(0,D.jsx)(`path`,{d:`m16 16 4.5 4.5`})]})}function Cs({size:e=16}){return(0,D.jsx)(`svg`,{...ys(e),children:(0,D.jsx)(`path`,{d:`M6 6l12 12M18 6 6 18`})})}function ws({size:e=16}){return(0,D.jsx)(`svg`,{...ys(e),children:(0,D.jsx)(`path`,{d:`M4 7h16M9 7V5h6v2M6.5 7l1 13h9l1-13M10 11v5M14 11v5`})})}function Ts({size:e=16}){return(0,D.jsx)(`svg`,{...ys(e),children:(0,D.jsx)(`path`,{d:`M3 7a2 2 0 0 1 2-2h4l2 2h6a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z`})})}function Es({size:e=16}){return(0,D.jsx)(`svg`,{...ys(e),children:(0,D.jsx)(`path`,{d:`M12 5v14M6 13l6 6 6-6`})})}function Ds({size:e=18}){return(0,D.jsxs)(`svg`,{...ys(e),children:[(0,D.jsx)(`circle`,{cx:`9`,cy:`8`,r:`3.2`}),(0,D.jsx)(`path`,{d:`M3 19c0-3.3 2.7-5.6 6-5.6s6 2.3 6 5.6`}),(0,D.jsx)(`path`,{d:`M15.8 5.2a3.2 3.2 0 0 1 0 5.9M17.4 13.8c2.1.6 3.6 2.3 3.6 4.4`})]})}function Os({size:e=16}){return(0,D.jsxs)(`svg`,{...ys(e),children:[(0,D.jsx)(`path`,{d:`M12 3v11M8 10l4 4 4-4`}),(0,D.jsx)(`path`,{d:`M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2`})]})}function ks({size:e=18}){return(0,D.jsxs)(`svg`,{...ys(e),children:[(0,D.jsx)(`circle`,{cx:`12`,cy:`8`,r:`3.6`}),(0,D.jsx)(`path`,{d:`M4.5 20c0-3.9 3.4-6.6 7.5-6.6s7.5 2.7 7.5 6.6`})]})}function As({size:e=18}){return(0,D.jsxs)(`svg`,{...ys(e),children:[(0,D.jsx)(`path`,{d:`M12 3l7 2.8v5.4c0 4.3-2.9 7.6-7 9.8-4.1-2.2-7-5.5-7-9.8V5.8z`}),(0,D.jsx)(`path`,{d:`m9.2 12.1 2 2 3.6-3.8`})]})}function js({size:e=18}){return(0,D.jsxs)(`svg`,{...ys(e),children:[(0,D.jsx)(`circle`,{cx:`8`,cy:`8`,r:`3.4`}),(0,D.jsx)(`path`,{d:`m10.6 10.6 8 8M15.5 15.5l2-2M18 18l2-2`})]})}function Ms({size:e=16}){return(0,D.jsxs)(`svg`,{...ys(e),children:[(0,D.jsx)(`path`,{d:`M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6z`}),(0,D.jsx)(`circle`,{cx:`12`,cy:`12`,r:`2.6`})]})}function Ns({size:e=16}){return(0,D.jsxs)(`svg`,{...ys(e),children:[(0,D.jsx)(`path`,{d:`M4 4l16 16`}),(0,D.jsx)(`path`,{d:`M9.9 5.2A10.7 10.7 0 0 1 12 5c6.1 0 9.5 7 9.5 7a16 16 0 0 1-3 3.6M6.2 7.3A16.6 16.6 0 0 0 2.5 12s3.4 7 9.5 7a10.4 10.4 0 0 0 4-.8`})]})}function Ps({size:e=14}){return(0,D.jsxs)(`svg`,{...ys(e),children:[(0,D.jsx)(`rect`,{x:`5`,y:`10`,width:`14`,height:`10`,rx:`2`}),(0,D.jsx)(`path`,{d:`M8 10V7a4 4 0 0 1 8 0v3`})]})}function Fs({size:e=14}){return(0,D.jsxs)(`svg`,{...ys(e),children:[(0,D.jsx)(`path`,{d:`M14 4h6v6`}),(0,D.jsx)(`path`,{d:`M20 4l-9 9`}),(0,D.jsx)(`path`,{d:`M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6`})]})}function Is({size:e=18}){return(0,D.jsxs)(`svg`,{...ys(e),children:[(0,D.jsx)(`path`,{d:`M6 9a6 6 0 0 1 12 0c0 4 1.5 5.5 2 6H4c.5-.5 2-2 2-6z`}),(0,D.jsx)(`path`,{d:`M10 19a2 2 0 0 0 4 0`})]})}function Ls({size:e=18}){return(0,D.jsxs)(`svg`,{...ys(e),children:[(0,D.jsx)(`path`,{d:`M4 6h2m3 0h11M4 12h2m3 0h11M4 18h2m3 0h7`}),(0,D.jsx)(`path`,{d:`m14.5 17.5 1.5 1.5 3-3`})]})}function Rs({size:e=12}){return(0,D.jsxs)(`svg`,{...ys(e),children:[(0,D.jsx)(`circle`,{cx:`12`,cy:`12`,r:`9`}),(0,D.jsx)(`path`,{d:`M12 7.5v5.5`}),(0,D.jsx)(`path`,{d:`M12 16.5h.01`})]})}function zs({size:e=16}){return(0,D.jsxs)(`svg`,{...ys(e),children:[(0,D.jsx)(`path`,{d:`M3 12a9 9 0 0 1 9-9c2.5 0 4.9 1 6.7 2.7L21 8`}),(0,D.jsx)(`path`,{d:`M21 3v5h-5`}),(0,D.jsx)(`path`,{d:`M21 12a9 9 0 0 1-9 9c-2.5 0-4.9-1-6.7-2.7L3 16`}),(0,D.jsx)(`path`,{d:`M8 16H3v5`})]})}var Bs=[{id:`logs`,label:`log_viewer`,icon:bs},{id:`instance`,label:`instance`,icon:Ds},{id:`batch`,label:`batch_actions`,icon:Ls},{id:`requests`,label:`friend_requests`,icon:Is},{id:`operations`,label:`operations`,icon:As},{id:`account`,label:`account`,icon:ks},{id:`settings`,label:`settings`,icon:xs}],Vs={id:`debug`,label:`debug`,icon:Rs},Hs=us`
    0%, 100% {
        box-shadow: 0 0 0 0 rgba(167, 139, 250, 0.45);
    }
    50% {
        box-shadow: 0 0 0 4px rgba(167, 139, 250, 0);
    }
`;function Us({page:e,onNavigate:t,status:n,debug:r}){let i=k(),a=r?[...Bs,Vs]:Bs;return(0,D.jsxs)(Ws,{children:[(0,D.jsx)(Gs,{children:a.map(({id:n,label:r,icon:a})=>(0,D.jsxs)(Ks,{$active:e===n,onClick:()=>t(n),type:`button`,children:[(0,D.jsx)(a,{size:18}),(0,D.jsx)(`span`,{children:i(r)})]},n))}),(0,D.jsxs)(qs,{children:[(0,D.jsx)(Js,{children:i(`vr_chat`)}),(0,D.jsxs)(Ys,{$active:n.running,children:[(0,D.jsx)(Xs,{$active:n.running}),n.running?i(`running`):i(`not_running`)]})]})]})}var Ws=G.aside`
    display: flex;
    flex-direction: column;
    gap: 22px;
    width: 218px;
    flex-shrink: 0;
    padding: 16px 14px 18px;
    background: var(--chrome-bg);
    border-right: 1px solid var(--border-color);
`,Gs=G.nav`
    display: flex;
    flex-direction: column;
    gap: 3px;
`,Ks=G.button`
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

    ${({$active:e})=>e&&as`
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
`,qs=G.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
    margin-top: auto;
    padding: 12px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`,Js=G.span`
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
`,Ys=G.div`
    display: flex;
    align-items: center;
    gap: 7px;
    font-family: var(--font-mono);
    font-size: 12px;
    color: ${({$active:e})=>e?`var(--text-primary)`:`var(--text-muted)`};
`,Xs=G.span`
    width: 7px;
    height: 7px;
    flex-shrink: 0;
    border-radius: 50%;
    background: ${({$active:e})=>e?`var(--accent-primary)`:`var(--text-muted)`};
    animation: ${({$active:e})=>e?as`${Hs} 2s ease-in-out infinite`:`none`};
`;function Zs({size:e=20}){return(0,D.jsxs)(`svg`,{"aria-hidden":`true`,height:e,viewBox:`0 0 256 256`,width:e,children:[(0,D.jsx)(`defs`,{children:(0,D.jsxs)(`linearGradient`,{id:`brand-mark`,gradientUnits:`userSpaceOnUse`,x1:`8`,x2:`248`,y1:`8`,y2:`248`,children:[(0,D.jsx)(`stop`,{offset:`0`,stopColor:`#6366f1`}),(0,D.jsx)(`stop`,{offset:`1`,stopColor:`#a855f7`})]})}),(0,D.jsx)(`rect`,{fill:`url(#brand-mark)`,height:`240`,rx:`54`,width:`240`,x:`8`,y:`8`}),(0,D.jsx)(`circle`,{cx:`128`,cy:`98`,fill:`#f8fafc`,r:`40`}),(0,D.jsx)(`path`,{d:`M62 198c0-33.1 29.5-60 66-60s66 26.9 66 60z`,fill:`#f8fafc`}),(0,D.jsx)(`path`,{d:`M56 200 200 56`,stroke:`url(#brand-mark)`,strokeLinecap:`round`,strokeWidth:`18`})]})}function Qs(){let e=k(),t=_e(),n=ve();return(0,D.jsxs)($s,{children:[(0,D.jsxs)(ec,{children:[(0,D.jsx)(Zs,{size:19}),(0,D.jsx)(`strong`,{children:e(`anti_bot`)})]}),(0,D.jsx)(tc,{...n}),(0,D.jsxs)(nc,{children:[(0,D.jsx)(rc,{onClick:t.minimize,title:e(`minimize`),type:`button`,children:(0,D.jsx)(`svg`,{"aria-hidden":`true`,viewBox:`0 0 10 10`,children:(0,D.jsx)(`path`,{d:`M2 5h6`})})}),(0,D.jsx)(rc,{onClick:t.toggleMaximize,title:t.maximized?e(`restore`):e(`maximize`),type:`button`,children:t.maximized?(0,D.jsxs)(`svg`,{"aria-hidden":`true`,viewBox:`0 0 10 10`,children:[(0,D.jsx)(`rect`,{height:`6`,width:`6`,x:`3`,y:`1`}),(0,D.jsx)(`rect`,{height:`6`,width:`6`,x:`1`,y:`3`})]}):(0,D.jsx)(`svg`,{"aria-hidden":`true`,viewBox:`0 0 10 10`,children:(0,D.jsx)(`rect`,{height:`6`,width:`6`,x:`2`,y:`2`})})}),(0,D.jsx)(ic,{onClick:t.close,title:e(`close`),type:`button`,children:(0,D.jsx)(`svg`,{"aria-hidden":`true`,viewBox:`0 0 10 10`,children:(0,D.jsx)(`path`,{d:`m2 2 6 6M8 2 2 8`})})})]})]})}var $s=G.header`
    display: flex;
    align-items: stretch;
    height: 38px;
    flex-shrink: 0;
    background: var(--chrome-bg);
    border-bottom: 1px solid var(--border-color);
    user-select: none;
    -webkit-user-select: none;
`,ec=G.div`
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
`,tc=G.div`
    flex: 1;
    min-width: 24px;
`,nc=G.div`
    display: flex;
    flex-shrink: 0;
`,rc=G.button`
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
`,ic=G(rc)`
    &:hover {
        background: #e81123;
        color: #fff;
    }
`,ac=new Set([`button`,`checkbox`,`color`,`file`,`hidden`,`image`,`radio`,`range`,`reset`,`submit`]);function oc(e){return e?e instanceof HTMLTextAreaElement?!0:e instanceof HTMLInputElement?!ac.has(e.type):e instanceof HTMLElement&&e.isContentEditable:!1}function sc(e){for(let t=e;t;t=t.parentElement)if(oc(t))return t;return null}function cc(e,t){let n=e instanceof HTMLTextAreaElement?HTMLTextAreaElement.prototype:HTMLInputElement.prototype;Object.getOwnPropertyDescriptor(n,`value`)?.set?.call(e,t)}function lc(e,t){if(e.focus(),e.isContentEditable){document.execCommand(`insertText`,!1,t);return}let n=e,r=n.selectionStart??n.value.length,i=n.selectionEnd??r;cc(n,n.value.slice(0,r)+t+n.value.slice(i)),n.dispatchEvent(new Event(`input`,{bubbles:!0})),n.setSelectionRange(r+t.length,r+t.length)}function uc(){let e=k(),[t,n]=(0,_.useState)(null),[r,i]=(0,_.useState)(new Set),[a,o]=(0,_.useState)(``),s=(0,_.useRef)(0),c=e=>{o(e),window.clearTimeout(s.current),s.current=window.setTimeout(()=>o(``),1800)};(0,_.useEffect)(()=>{t?.userId&&ps().then(e=>i(new Set(e.whitelist)),()=>{})},[t]),(0,_.useEffect)(()=>{let e=e=>{let t=e.target instanceof Element?e.target:null,r=window.getSelection()?.toString().trim()??``,i=t?.closest(`[data-user-id]`),a=sc(t)??sc(document.activeElement instanceof Element?document.activeElement:null);!r&&!i&&!a?n(null):(e.preventDefault(),n({x:Math.max(8,Math.min(e.clientX,window.innerWidth-240)),y:Math.max(8,Math.min(e.clientY,window.innerHeight-260)),selection:r,editable:a,userId:i?.dataset.userId??null}))};return document.addEventListener(`contextmenu`,e),()=>document.removeEventListener(`contextmenu`,e)},[]),(0,_.useEffect)(()=>{if(!t)return;let e=()=>n(null),r=e=>{e.key===`Escape`&&n(null)},i=()=>{document.hidden&&e()};return window.addEventListener(`click`,e),window.addEventListener(`scroll`,e,!0),window.addEventListener(`resize`,e),window.addEventListener(`keydown`,r),window.addEventListener(`blur`,e),document.addEventListener(`visibilitychange`,i),()=>{window.removeEventListener(`click`,e),window.removeEventListener(`scroll`,e,!0),window.removeEventListener(`resize`,e),window.removeEventListener(`keydown`,r),window.removeEventListener(`blur`,e),document.removeEventListener(`visibilitychange`,i)}},[t]),(0,_.useEffect)(()=>()=>window.clearTimeout(s.current),[]);let l=async t=>{n(null);try{await navigator.clipboard.writeText(t),c(e(`copied`))}catch{}},u=async e=>{n(null);try{let t=await navigator.clipboard.readText();t&&lc(e,t)}catch{}},d=async(t,r)=>{n(null);try{await _s(t,r),i(e=>{let n=new Set(e);return r?n.add(t):n.delete(t),n}),window.dispatchEvent(new CustomEvent(`antibot:whitelist`,{detail:{userId:t,whitelisted:r}})),c(e(r?`added_to_whitelist`:`removed_from_whitelist`))}catch{}},f=t?.userId?r.has(t.userId):!1;return(0,D.jsxs)(D.Fragment,{children:[t&&(0,D.jsxs)(dc,{style:{left:t.x,top:t.y},children:[t.selection&&(0,D.jsx)(fc,{onClick:()=>void l(t.selection),type:`button`,children:e(`copy`)}),t.userId&&(0,D.jsx)(fc,{onClick:()=>void l(t.userId),type:`button`,children:e(`copy_id`)}),t.userId&&(0,D.jsx)(fc,{onClick:()=>void l(`https://vrchat.com/home/user/${t.userId}`),type:`button`,children:e(`copy_profile_url`)}),t.userId&&(0,D.jsx)(fc,{onClick:()=>void d(t.userId,!f),type:`button`,children:e(f?`remove_from_whitelist`:`add_to_whitelist`)}),t.editable&&(0,D.jsx)(fc,{onClick:()=>void u(t.editable),type:`button`,children:e(`paste`)})]}),a&&(0,D.jsx)(pc,{children:a})]})}var dc=G.div`
    position: fixed;
    z-index: 2000;
    min-width: 210px;
    padding: 4px;
    border: 1px solid var(--border-color);
    border-radius: 10px;
    background: var(--bg-card);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(16px);
`,fc=G.button`
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
`,pc=G.div`
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
`,mc=new se({baseMessage:`data.base`});function hc(e){return mc.readBlock(e)}var gc=E.available,_c={exists:!1,running:!1},vc=5e3,yc=3e3,bc=0,xc=-1;async function Sc(){if(!E.available)return{..._c,lines:[]};let e=await Ec(0,vc);return xc=e.generation,bc=e.lines.at(-1)?.id??bc,{exists:e.exists,running:e.running,lines:e.lines}}function Cc(e){return E.on(t=>{t.type===`log.changed`&&Ec(bc,yc).then(t=>{let n=xc>=0&&t.generation!==xc;xc=t.generation,bc=t.lines.at(-1)?.id??bc,e({exists:t.exists,running:t.running,reset:n,lines:t.lines})},()=>{})})}async function wc(){E.available&&await E.request(`log.openFolder`)}async function Tc(){return E.available?await E.request(`log.export`):{saved:!1,lines:0}}async function Ec(e,t){let n=await hc(`/log?after=${Math.max(0,e)}&limit=${t}`);return{exists:n.meta.exists===`1`,running:n.meta.running===`1`,generation:Number(n.meta.generation??0),lines:n.rows.map(e=>({id:Number(e.id),time:String(e.time),level:String(e.level),message:String(e.message)}))}}var Dc=3e3;function Oc(){let[e,t]=(0,_.useState)(_c),[n,r]=(0,_.useState)([]),i=(0,_.useRef)(0),a=(0,_.useRef)(!1);return(0,_.useEffect)(()=>{let e=!1,n=Cc(n=>{e||(a.current=!0,t({exists:n.exists??!1,running:n.running??!1}),r(e=>kc(e,n,i.current)))});return Sc().then(n=>{e||(a.current||t({exists:n.exists??!1,running:n.running??!1}),r(e=>Ac(e,n.lines,i.current)))},()=>{}),()=>{e=!0,n()}},[]),{status:e,lines:n,clear:()=>{i.current=n.at(-1)?.id??i.current,r([])}}}function kc(e,t,n){let r=t.lines.filter(e=>e.id>n);if(t.reset)return r.slice(-3e3);let i=[...e,...r];return i.length>Dc?i.slice(-3e3):i}function Ac(e,t,n){let r=e.at(-1)?.id??0,i=[...e,...t.filter(e=>e.id>r&&e.id>n)];return i.length>Dc?i.slice(-3e3):i}var jc={state:`loggedOut`,storage:`none`,twoFactorMethods:[],systemStorage:!1,systemStorageName:``,tpmStorage:!1,helloStorage:!1,softwareStorage:!1,storageChosen:!1,accounts:[],saved:[]};async function Mc(){return E.available?await E.request(`auth.state`):jc}async function Nc(e,t,n=!0,r=!0){return await E.request(`auth.login`,{username:e,password:t,rememberPassword:n,autoLogin:r},3e4)}async function Pc(e){return await E.request(`auth.login.saved`,{dir:e},12e4)}async function Fc(e){return await E.request(`auth.saved.forget`,{dir:e},3e4)}async function Ic(e,t){return await E.request(`auth.verify`,{method:e,code:t},3e4)}async function Lc(e,t){return await E.request(`auth.unlock`,{password:e,dir:t},12e4)}async function Rc(e){return await E.request(`auth.switch`,{dir:e},12e4)}async function zc(e){return await E.request(`auth.remove`,{dir:e},3e4)}async function Bc(){return await E.request(`auth.signin.cancel`,void 0,15e3)}async function Vc(e,t){return await E.request(`auth.storage.save`,{mode:e,password:t},3e4)}async function Hc(){return await E.request(`auth.logout`,void 0,3e4)}async function Uc(){return await E.request(`auth.device.start`,void 0,3e4)}async function Wc(e){return await E.request(`auth.device.poll`,{deviceCode:e},3e4)}function Gc(e){return E.on(t=>{t.type===`auth.changed`&&e(t.data)})}function Kc(){let[e,t]=(0,_.useState)(jc),[n,r]=(0,_.useState)(!1);return(0,_.useEffect)(()=>{let e=!1,n=Gc(n=>{e||(t(n),r(!0))});return Mc().then(n=>{e||(t(n),r(!0))},()=>{e||r(!0)}),()=>{e=!0,n()}},[]),{auth:e,ready:n}}function qc({checked:e,onChange:t,title:n,hint:r,disabled:i=!1,requires:a}){return(0,D.jsxs)(Jc,{children:[(0,D.jsxs)(Yc,{children:[(0,D.jsx)(`input`,{checked:e,disabled:i,onChange:e=>t(e.target.checked),type:`checkbox`}),(0,D.jsx)(`span`,{children:n}),a&&(0,D.jsx)(Zc,{children:a})]}),(0,D.jsx)(Xc,{children:r})]})}var Jc=G.label`
    display: flex;
    flex-direction: column;
    gap: 2px;
    cursor: pointer;
`,Yc=G.span`
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;

    input {
        accent-color: var(--accent-primary);
    }
`,Xc=G.span`
    padding-left: 24px;
    font-size: 10.5px;
    color: var(--text-muted);
`,Zc=G.span`
    padding: 1px 7px;
    border-radius: 999px;
    background: rgba(96, 165, 250, 0.14);
    color: #93c5fd;
    font-family: var(--font-mono);
    font-size: 9px;
`;function Qc({initial:e,ready:t=!1,expired:n=!1}){let r=k(),[i,a]=(0,_.useState)(e??jc),[o,s]=(0,_.useState)(t),[c,l]=(0,_.useState)(``),[u,d]=(0,_.useState)(!1),[f,p]=(0,_.useState)(!1),[m,h]=(0,_.useState)(!1),[g,v]=(0,_.useState)(null),[y,b]=(0,_.useState)(``);(0,_.useEffect)(()=>{let e=!1,t=Gc(t=>{e||(a(t),s(!0))});return Mc().then(t=>{e||(a(t),s(!0))},()=>{e||s(!0)}),()=>{e=!0,t()}},[]);let x=i.state===`loggedIn`;(0,_.useEffect)(()=>{x&&p(!1)},[x]);let S=async e=>{d(!0),l(``);try{return a(await e()),!0}catch(e){return l(e instanceof Error?e.message:String(e)),!1}finally{d(!1)}},C=e=>S(()=>Pc(e.dir)),ee=i.accounts.length>0,w=f||!x&&i.state===`loggedOut`&&!ee,te=w||i.state===`twoFactor`||i.state===`locked`&&!m,T=async e=>{if(l(``),e.storage===`password`)b(``),v(e);else{d(!0);try{let t=await Rc(e.dir);if(t.needsPassword){b(``),v(e);return}if(t.needsLogin){l(t.error??``),p(!0);return}if(!t.ok||!t.auth){l(t.error??``);return}a(t.auth)}catch(e){l(e instanceof Error?e.message:String(e))}finally{d(!1)}}},ne=async(e,t)=>{b(``),d(!0);try{a(await Lc(t,e.dir)),v(null)}catch(t){let n=t instanceof Error?t.message:String(t);b(n);let r=await Mc().catch(()=>null);r&&!r.accounts.some(t=>t.dir===e.dir&&t.stored)&&(a(r),b(``),v(null),l(n),p(!0))}finally{d(!1)}},E=async e=>{l(``),d(!0);try{a(await zc(e.dir))}catch(e){l(e instanceof Error?e.message:String(e))}finally{d(!1)}},re=async e=>{l(``),d(!0);try{a(await Fc(e.dir))}catch(e){l(e instanceof Error?e.message:String(e))}finally{d(!1)}},ie=()=>{p(!1),l(``),Bc().then(a,()=>{})};if(!o)return(0,D.jsx)(ml,{$wide:!0});let ae;return ae=i.state===`locked`&&!m?(0,D.jsx)(il,{auth:i,busy:u,error:c,run:S,onBrowse:ee?()=>h(!0):void 0}):i.state===`twoFactor`?(0,D.jsx)(rl,{auth:i,busy:u,error:c,run:S,onCancel:ee?ie:void 0}):w?(0,D.jsx)(nl,{auth:i,busy:u,error:c,onCancel:ee?ie:void 0,onForgetSaved:e=>void re(e),onSignedIn:e=>{a(e),p(!1)},onSignInSaved:e=>void C(e),run:S}):(0,D.jsxs)(D.Fragment,{children:[x&&(0,D.jsx)(al,{auth:i,busy:u,error:c,run:S}),x&&(0,D.jsx)(ll,{auth:i,busy:u,error:c,run:S},i.user?.id),(0,D.jsx)($c,{accounts:i.accounts,busy:u,onAdd:()=>{l(``),p(!0)},onRemove:e=>void E(e),onSwitch:e=>void T(e),signedIn:x}),c&&(0,D.jsx)(Ul,{children:c})]}),(0,D.jsxs)(ml,{$wide:te,children:[n&&(0,D.jsxs)(Wl,{role:`alert`,children:[(0,D.jsx)(As,{size:16}),(0,D.jsx)(`span`,{children:r(`vr_chat_session_expired_sign_in_again`)}),(0,D.jsx)(Gl,{disabled:u,onClick:()=>{l(``),p(!0)},type:`button`,children:r(`sign_in`)})]}),ae,g&&(0,D.jsx)(tl,{account:g,busy:u,error:y,onCancel:()=>{v(null),b(``)},onUnlock:e=>void ne(g,e)})]})}function $c({accounts:e,busy:t,signedIn:n,onAdd:r,onSwitch:i,onRemove:a}){let o=k();return(0,D.jsxs)(K,{children:[(0,D.jsxs)(Ol,{children:[(0,D.jsx)(Ds,{size:20}),(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`h2`,{children:o(`accounts`)}),(0,D.jsx)(`p`,{children:o(n?`switch_to_another_account_only_one_is_signed_in_at_a_time`:`pick_an_account_to_sign_in_with`)})]})]}),e.length>0&&(0,D.jsx)($l,{children:e.map(e=>{let r=e.active&&n,s=()=>{!t&&!r&&i(e)};return(0,D.jsxs)(eu,{$active:e.active,$clickable:!r,"aria-current":r?`true`:void 0,onClick:s,onKeyDown:e=>{(e.key===`Enter`||e.key===` `)&&(e.preventDefault(),s())},role:r?void 0:`button`,tabIndex:r?void 0:0,children:[(0,D.jsx)(tu,{$src:e.avatar,children:e.avatar?null:e.name.slice(0,1).toUpperCase()}),(0,D.jsxs)(nu,{children:[(0,D.jsx)(`strong`,{children:e.name}),(0,D.jsx)(`span`,{children:o(pl(e.storage))})]}),r?(0,D.jsx)(ru,{children:o(`signed_in`)}):(0,D.jsx)(q,{children:(0,D.jsx)(su,{"aria-label":o(`remove_account`),disabled:t,onClick:t=>{t.stopPropagation(),a(e)},type:`button`,children:(0,D.jsx)(ws,{size:14})})})]},e.dir)})}),(0,D.jsx)(Pl,{children:(0,D.jsx)(Ll,{disabled:t,onClick:r,type:`button`,children:o(`add_account`)})})]})}function el({accounts:e,busy:t,onSignIn:n,onForget:r}){let i=k();return(0,D.jsxs)(K,{children:[(0,D.jsxs)(Ol,{children:[(0,D.jsx)(js,{size:20}),(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`h2`,{children:i(`saved_accounts`)}),(0,D.jsx)(`p`,{children:i(`press_an_account_to_sign_in_with_its_saved_password`)})]})]}),(0,D.jsx)($l,{children:e.map(e=>(0,D.jsxs)(eu,{$active:!1,$clickable:!t,onClick:()=>{t||n(e)},onKeyDown:r=>{t||r.key!==`Enter`&&r.key!==` `||(r.preventDefault(),n(e))},role:`button`,tabIndex:0,children:[(0,D.jsx)(tu,{$src:e.avatar,children:e.avatar?null:e.name.slice(0,1).toUpperCase()}),(0,D.jsxs)(nu,{children:[(0,D.jsx)(`strong`,{children:e.name}),(0,D.jsx)(`span`,{children:e.autoLogin?i(`signs_in_automatically`):i(`manual_sign_in`)})]}),(0,D.jsx)(q,{children:(0,D.jsx)(su,{"aria-label":i(`forget_saved_password`),disabled:t,onClick:t=>{t.stopPropagation(),r(e)},title:i(`forget_saved_password`),type:`button`,children:(0,D.jsx)(ws,{size:14})})})]},e.dir))})]})}function tl({account:e,busy:t,error:n,onUnlock:r,onCancel:i}){let a=k(),[o,s]=(0,_.useState)(``);return(0,D.jsx)(Yl,{children:(0,D.jsxs)(Xl,{"aria-modal":`true`,role:`dialog`,children:[(0,D.jsxs)(Ol,{children:[(0,D.jsx)(js,{size:20}),(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`h2`,{children:a(`unlock_name`,{name:e.name})}),(0,D.jsx)(`p`,{children:a(`the_session_was_encrypted_with_a_key_derived_from_your_password_it_is_never_stored_so_it_has_to_be_typed_again`)})]})]}),(0,D.jsxs)(kl,{onSubmit:e=>{e.preventDefault(),r(o)},children:[(0,D.jsxs)(Al,{children:[(0,D.jsx)(Ml,{htmlFor:`switch-password`,children:a(`password`)}),(0,D.jsx)(cl,{autoComplete:`current-password`,autoFocus:!0,id:`switch-password`,onChange:s,value:o})]}),n&&(0,D.jsx)(Ul,{children:n}),(0,D.jsxs)(Pl,{children:[(0,D.jsx)(Il,{disabled:t,type:`submit`,children:a(t?`unlocking`:`unlock`)}),(0,D.jsx)(Ll,{disabled:t,onClick:i,type:`button`,children:a(`cancel`)})]})]})]})})}function nl({auth:e,busy:t,error:n,run:r,onSignedIn:i,onSignInSaved:a,onForgetSaved:o,onCancel:s}){let c=k(),[l,u]=(0,_.useState)(``),[d,f]=(0,_.useState)(``),[p,m]=(0,_.useState)(!0),[h,g]=(0,_.useState)(!0);return(0,D.jsx)(hl,{children:(0,D.jsxs)(_l,{children:[e.saved.length>0&&(0,D.jsx)(el,{accounts:e.saved,busy:t,onForget:o,onSignIn:a}),(0,D.jsxs)(vl,{children:[(0,D.jsxs)(yl,{children:[(0,D.jsxs)(bl,{children:[(0,D.jsx)(xl,{children:(0,D.jsx)(ks,{size:22})}),(0,D.jsx)(`h1`,{children:c(`sign_in_to_vr_chat`)}),(0,D.jsx)(`p`,{children:c(`use_your_vr_chat_account_or_scan_the_code_instead`)})]}),(0,D.jsxs)(kl,{onSubmit:e=>{e.preventDefault(),r(()=>Nc(l.trim(),d,p,p&&h))},children:[(0,D.jsxs)(Al,{children:[(0,D.jsx)(Ml,{htmlFor:`username`,children:c(`username_or_email`)}),(0,D.jsx)(sl,{onChange:u,value:l})]}),(0,D.jsxs)(Al,{children:[(0,D.jsx)(Ml,{htmlFor:`password`,children:c(`password`)}),(0,D.jsx)(cl,{autoComplete:`current-password`,id:`password`,onChange:f,value:d})]}),(0,D.jsxs)(jl,{children:[(0,D.jsx)(qc,{checked:p,hint:c(`keeps_this_account_s_password_on_this_device_encrypted_by_the_os_or_the_tpm`),onChange:e=>{m(e),e||g(!1)},title:c(`remember_password`)}),(0,D.jsx)(qc,{checked:h,disabled:!p,hint:c(`signs_in_with_the_saved_password_when_the_session_expires_vr_chat_may_still_ask_for_a_two_factor_code`),onChange:g,title:c(`sign_in_automatically`)})]}),n&&(0,D.jsx)(Ul,{children:n}),(0,D.jsx)(Rl,{disabled:t,type:`submit`,children:c(t?`signing_in`:`sign_in`)}),s&&(0,D.jsx)(Bl,{disabled:t,onClick:s,type:`button`,children:c(`cancel`)})]}),(0,D.jsx)(Kl,{children:c(`signing_in_is_optional_without_it_anti_bot_only_reads_vr_chat_s_local_log_so_the_instance_list_can_be_inaccurate_and_player_details_are_unavailable`)})]}),(0,D.jsxs)(Sl,{children:[(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`h2`,{children:c(`or_scan_to_sign_in`)}),(0,D.jsx)(`p`,{children:c(`approve_it_in_the_vr_chat_app_the_password_never_reaches_anti_bot`)})]}),(0,D.jsx)(ul,{onSignedIn:i})]})]})]})})}function rl({auth:e,busy:t,error:n,run:r,onCancel:i}){let a=k(),o=e.twoFactorMethods.length>0?e.twoFactorMethods:[`totp`,`otp`],[s,c]=(0,_.useState)(o[0]),[l,u]=(0,_.useState)(``);return(0,D.jsx)(hl,{children:(0,D.jsxs)(gl,{children:[(0,D.jsxs)(Ol,{children:[(0,D.jsx)(As,{size:20}),(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`h2`,{children:a(`two_factor_authentication`)}),(0,D.jsx)(`p`,{children:a(`vr_chat_wants_a_second_factor_before_it_hands_over_the_session`)})]})]}),(0,D.jsx)(Vl,{children:o.map(e=>(0,D.jsx)(Hl,{$active:s===e,onClick:()=>c(e),type:`button`,children:a(dl(e))},e))}),(0,D.jsxs)(kl,{onSubmit:e=>{e.preventDefault();let t=l.trim(),n=s===`otp`&&/^\d{8}$/.test(t)?`${t.slice(0,4)}-${t.slice(4)}`:t;r(()=>Ic(s,n))},children:[(0,D.jsxs)(Al,{children:[(0,D.jsx)(Ml,{htmlFor:`code`,children:a(fl(s))}),(0,D.jsx)(Nl,{autoComplete:`one-time-code`,autoFocus:!0,id:`code`,inputMode:`numeric`,onChange:e=>u(e.target.value),placeholder:`123456`,value:l})]}),n&&(0,D.jsx)(Ul,{children:n}),(0,D.jsx)(Rl,{disabled:t,type:`submit`,children:a(t?`verifying`:`verify`)}),i&&(0,D.jsx)(Bl,{disabled:t,onClick:i,type:`button`,children:a(`cancel`)})]})]})})}function il({auth:e,busy:t,error:n,run:r,onBrowse:i}){let a=k(),[o,s]=(0,_.useState)(``),c=e.storage===`hello`;return(0,D.jsx)(hl,{children:(0,D.jsxs)(gl,{children:[(0,D.jsxs)(Ol,{children:[(0,D.jsx)(js,{size:20}),(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`h2`,{children:a(c?`unlock_with_windows_hello`:`unlock_the_saved_session`)}),(0,D.jsx)(`p`,{children:a(c?`the_session_is_protected_by_windows_hello_confirm_with_your_pin_fingerprint_or_face`:`the_session_was_encrypted_with_a_key_derived_from_your_password_it_is_never_stored_so_it_has_to_be_typed_again`)})]})]}),(0,D.jsxs)(kl,{onSubmit:e=>{e.preventDefault(),r(()=>Lc(c?``:o))},children:[!c&&(0,D.jsxs)(Al,{children:[(0,D.jsx)(Ml,{htmlFor:`unlock-password`,children:a(`password`)}),(0,D.jsx)(cl,{autoComplete:`current-password`,autoFocus:!0,id:`unlock-password`,onChange:s,value:o})]}),n&&(0,D.jsx)(Ul,{children:n}),(0,D.jsx)(Rl,{disabled:t,type:`submit`,children:a(t?`unlocking`:c?`unlock_with_windows_hello`:`unlock`)}),(0,D.jsx)(Bl,{onClick:()=>void r(async()=>await Vc(`none`)),type:`button`,children:a(`forget_it`)}),i&&(0,D.jsx)(Bl,{disabled:t,onClick:i,type:`button`,children:a(`accounts`)})]})]})})}function al({auth:e,busy:t,error:n,run:r}){let i=k(),a=e.user,o=ol(a.status);return(0,D.jsx)(D.Fragment,{children:(0,D.jsxs)(K,{children:[(0,D.jsxs)(Zl,{children:[(0,D.jsx)(Ql,{$src:a.avatarUrl}),(0,D.jsxs)(iu,{children:[(0,D.jsx)(`h2`,{children:a.displayName}),(0,D.jsxs)(au,{children:[o&&(0,D.jsx)(ou,{$color:o.color}),(0,D.jsx)(`p`,{children:a.statusDescription||i(o?o.labelKey:`signed_in_to_vr_chat`)})]}),e.expiresAt&&(0,D.jsx)(`p`,{children:i(`session_expires_date`,{date:new Date(e.expiresAt).toLocaleDateString()})})]}),(0,D.jsx)(zl,{disabled:t,onClick:()=>void r(Hc),type:`button`,children:i(`sign_out`)})]}),n&&(0,D.jsx)(Ul,{children:n})]})})}function ol(e){switch(e){case`active`:return{labelKey:`online`,color:`#4ade80`};case`join me`:return{labelKey:`join_me`,color:`#60a5fa`};case`ask me`:return{labelKey:`ask_me`,color:`#fbbf24`};case`busy`:return{labelKey:`busy`,color:`#f87171`};case`offline`:return{labelKey:`offline`,color:`#94a3b8`};default:return e&&e.length>0?{labelKey:e,color:`#94a3b8`}:null}}function sl({value:e,onChange:t}){let n=k(),[r,i]=(0,_.useState)(!1);return(0,D.jsxs)(cu,{children:[(0,D.jsx)(Nl,{autoComplete:`username`,id:`username`,onChange:e=>t(e.target.value),placeholder:n(`username`),type:r?`text`:`password`,value:e}),(0,D.jsx)(lu,{"aria-label":n(r?`hide_the_username`:`show_the_username`),onClick:()=>i(e=>!e),type:`button`,children:r?(0,D.jsx)(Ns,{size:14}):(0,D.jsx)(Ms,{size:14})})]})}function cl({id:e,value:t,onChange:n,placeholder:r=`••••••••`,autoComplete:i,autoFocus:a}){let o=k(),[s,c]=(0,_.useState)(!1);return(0,D.jsxs)(cu,{children:[(0,D.jsx)(Nl,{autoComplete:i,autoFocus:a,id:e,onChange:e=>n(e.target.value),placeholder:r,type:s?`text`:`password`,value:t}),(0,D.jsx)(lu,{"aria-label":o(s?`hide_password`:`show_password`),onClick:()=>c(e=>!e),type:`button`,children:s?(0,D.jsx)(Ns,{size:14}):(0,D.jsx)(Ms,{size:14})})]})}function ll({auth:e,busy:t,error:n,run:r}){let i=k(),a=e.systemStorage,o=e.systemStorageName||`System protection`,s=e.tpmStorage,c=e.helloStorage,l=e.softwareStorage,u=e.storage!==`none`,d=e.state===`loggedIn`,[f,p]=(0,_.useState)(!u&&!e.storageChosen),[m,h]=(0,_.useState)(u?e.storage:`none`),[g,v]=(0,_.useState)(``),[y,b]=(0,_.useState)(``),[x,S]=(0,_.useState)(``);(0,_.useEffect)(()=>{(u||e.storageChosen)&&p(!1)},[u,e.storageChosen]);let C=()=>{h(u?e.storage:`none`),v(``),b(``),S(``),p(!0)},ee=m!==e.storage||m===`password`&&g.length>0||!e.storageChosen;return f?(0,D.jsx)(Yl,{children:(0,D.jsxs)(Xl,{"aria-modal":`true`,role:`dialog`,children:[(0,D.jsxs)(Ol,{children:[(0,D.jsx)(As,{size:20}),(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`h2`,{children:i(`keep_the_session_between_launches`)}),(0,D.jsx)(`p`,{children:i(`only_the_vr_chat_session_cookie_is_stored_never_your_password_every_mode_except_do_not_remember_encrypts_it_at_rest_the_difference_is_what_unlocks_it`)})]})]}),(0,D.jsxs)(uu,{children:[(0,D.jsxs)(du,{$active:m===`software`,$disabled:!l,onClick:()=>l&&h(`software`),type:`button`,children:[(0,D.jsxs)(fu,{children:[(0,D.jsx)(`strong`,{children:i(`software_key`)}),(0,D.jsx)(pu,{children:i(`obfuscation`)}),(0,D.jsx)(hu,{$tone:`weak`,children:i(`weak`)}),(0,D.jsx)(mu,{children:i(`linux`)})]}),(0,D.jsx)(`p`,{children:i(`aes_256_gcm_with_a_key_file_next_to_the_session_obfuscation_only_not_real_protection`)})]}),(0,D.jsxs)(du,{$active:m===`system`,$disabled:!a,onClick:()=>a&&h(`system`),type:`button`,children:[(0,D.jsxs)(fu,{children:[(0,D.jsx)(`strong`,{children:o}),(0,D.jsx)(pu,{children:i(`encrypted`)}),(0,D.jsx)(hu,{$tone:`fair`,children:i(`fair`)}),(0,D.jsx)(mu,{children:i(o===`Windows DPAPI`?`windows`:o===`System keyring`?`linux`:`windows_linux`)})]}),(0,D.jsx)(`p`,{children:i(o===`Windows DPAPI`?`encrypted_with_windows_dpapi_for_your_account_unlocks_automatically`:`held_in_the_desktop_keyring_unlocks_with_your_login_session`)})]}),(0,D.jsxs)(du,{$active:m===`tpm`,$disabled:!s,onClick:()=>s&&h(`tpm`),type:`button`,children:[(0,D.jsxs)(fu,{children:[(0,D.jsx)(`strong`,{children:i(`tpm`)}),(0,D.jsx)(pu,{children:i(`no_prompt`)}),(0,D.jsx)(hu,{$tone:`good`,children:i(`good`)}),(0,D.jsx)(mu,{children:i(`windows_linux`)})]}),(0,D.jsx)(`p`,{children:i(`aes_key_wrapped_by_this_machine_s_tpm_unlocks_automatically`)})]}),(0,D.jsxs)(du,{$active:m===`hello`,$disabled:!c,onClick:()=>c&&h(`hello`),type:`button`,children:[(0,D.jsxs)(fu,{children:[(0,D.jsx)(`strong`,{children:i(`windows_hello`)}),(0,D.jsx)(pu,{children:i(`pin_biometrics`)}),(0,D.jsx)(hu,{$tone:`strong`,children:i(`strong`)}),(0,D.jsx)(mu,{children:i(`windows`)})]}),(0,D.jsx)(`p`,{children:i(`windows_hello_confirms_it_is_you_before_unlocking`)})]}),(0,D.jsxs)(du,{$active:m===`password`,onClick:()=>h(`password`),type:`button`,children:[(0,D.jsxs)(fu,{children:[(0,D.jsx)(`strong`,{children:i(`password`)}),(0,D.jsx)(pu,{children:i(`asks_every_launch`)}),(0,D.jsx)(hu,{$tone:`strong`,children:i(`strong`)}),(0,D.jsx)(mu,{children:i(`windows_linux`)})]}),(0,D.jsx)(`p`,{children:i(`aes_256_gcm_with_a_key_derived_from_your_password_asked_each_launch`)})]}),(0,D.jsxs)(du,{$active:m===`none`,onClick:()=>h(`none`),type:`button`,children:[(0,D.jsxs)(fu,{children:[(0,D.jsx)(`strong`,{children:i(`do_not_remember`)}),(0,D.jsx)(pu,{children:i(`nothing_on_disk`)}),(0,D.jsx)(hu,{$tone:`safest`,children:i(`safest`)}),(0,D.jsx)(mu,{children:i(`windows_linux`)})]}),(0,D.jsx)(`p`,{children:i(`nothing_is_written_the_next_launch_signs_in_again`)})]})]}),m===`password`&&(0,D.jsxs)(Al,{children:[(0,D.jsx)(Ml,{htmlFor:`storage-password`,children:i(`password_for_this_session`)}),(0,D.jsx)(cl,{autoComplete:`current-password`,id:`storage-password`,onChange:v,value:g}),(0,D.jsx)(cl,{autoComplete:`current-password`,onChange:b,placeholder:i(`repeat_the_password`),value:y})]}),(x||n)&&(0,D.jsx)(Ul,{children:x||n}),(0,D.jsx)(Pl,{children:(0,D.jsx)(Il,{disabled:t||!d,onClick:()=>{if(!d)S(i(`sign_in_first`));else if(!ee)p(!1);else{if(m===`password`){if(g.length<1){S(i(`enter_the_password_that_unlocks_the_session`));return}if(g!==y){S(i(`the_passwords_do_not_match`));return}}S(``),r(()=>Vc(m,m===`password`?g:void 0)).then(e=>{e&&(v(``),b(``),p(!1))})}},type:`button`,children:i(t?`saving`:`save`)})})]})}):(0,D.jsx)(K,{children:(0,D.jsxs)(ql,{children:[(0,D.jsx)(Jl,{children:i(`currently_storage`,{storage:i(pl(e.storage))})}),(0,D.jsx)(Ll,{onClick:C,type:`button`,children:i(`change_save_method`)})]})})}function ul({onSignedIn:e}){let t=k(),[n,r]=(0,_.useState)(null),[i,a]=(0,_.useState)(``),[o,s]=(0,_.useState)(!1),[c,l]=(0,_.useState)(!0),u=(0,_.useRef)(!1),d=(0,_.useCallback)(async()=>{if(!u.current){u.current=!0,a(``),s(!1),l(!0);try{r(await Uc())}catch(e){a(e instanceof Error?e.message:String(e))}finally{u.current=!1,l(!1)}}},[]);(0,_.useEffect)(()=>{E.available?d():l(!1)},[d]),(0,_.useEffect)(()=>{if(!n)return;let t=!1,r=0,i=Math.max(n.interval,2)*1e3,o=Date.now()+Math.max(n.expiresIn,60)*1e3,c=async()=>{if(Date.now()>o)s(!0);else try{let o=await Wc(n.deviceCode);if(t)return;if(o.approved&&o.auth){e(o.auth);return}let l=o.reason??`pending`;if(l===`expired_token`){s(!0);return}if(l===`slow_down`)i+=5e3;else if(l===`rate_limited`)i=Math.max(i,15e3);else if(l!==`pending`&&l!==`authorization_pending`){a(l);return}r=window.setTimeout(()=>void c(),i)}catch(e){t||a(e instanceof Error?e.message:String(e))}};return r=window.setTimeout(()=>void c(),i),()=>{t=!0,window.clearTimeout(r)}},[n,e]);let f=!!i||o;return(0,D.jsxs)(Cl,{children:[(0,D.jsx)(wl,{$dim:!n||f,children:n?.qrDataUrl?(0,D.jsx)(vu,{alt:t(`device_sign_in`),src:n.qrDataUrl}):(0,D.jsx)(Tl,{children:t(c?`preparing_the_code`:`the_sign_in_code_is_unavailable`)})}),f?(0,D.jsxs)(El,{children:[(0,D.jsx)(`span`,{children:i||t(`the_code_expired_start_again`)}),(0,D.jsx)(Dl,{onClick:()=>void d(),type:`button`,children:t(`try_again`)})]}):(0,D.jsx)(El,{children:t(n?`waiting_for_approval`:`preparing_the_code`)}),n&&(0,D.jsx)(yu,{children:(0,D.jsx)(`a`,{href:n.url,rel:`noreferrer`,target:`_blank`,children:t(`open_the_link_instead`)})})]})}function dl(e){switch(e){case`totp`:return`authenticator`;case`emailOtp`:return`email_code`;default:return`recovery_code`}}function fl(e){switch(e){case`totp`:return`code_from_your_authenticator_app`;case`emailOtp`:return`code_vr_chat_emailed_you`;default:return`one_of_your_recovery_codes`}}function pl(e){switch(e){case`password`:return`password_encrypted`;case`system`:return`system_protected`;case`tpm`:return`tpm_protected`;case`hello`:return`windows_hello`;case`software`:return`software_key`;default:return`not_stored`}}var ml=G.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 16px;
    min-height: 0;
    max-width: ${({$wide:e})=>e?`none`:`720px`};
    overflow: auto;
`,hl=G.div`
    display: flex;
    flex: 1;
    min-height: 0;
    padding: 12px 0;
    overflow: auto;
`,K=G.section`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 20px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`,gl=G(K)`
    width: 100%;
    max-width: 420px;
    margin: auto;
`,_l=G.div`
    display: flex;
    flex-direction: column;
    gap: 14px;
    width: 100%;
    max-width: 640px;
    margin: auto;
`,vl=G.section`
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
`,yl=G.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 30px 28px;
`,bl=G.div`
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
`,xl=G.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: rgba(167, 139, 250, 0.14);
    color: var(--accent-primary);
`,Sl=G.div`
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
`,Cl=G.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
`,wl=G.div`
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
`,Tl=G.span`
    padding: 0 10px;
    color: #4b5563;
    font-family: var(--font-mono);
    font-size: 10px;
    line-height: 1.5;
    text-align: center;
`,El=G.p`
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
`,Dl=G.button`
    padding: 0;
    border: 0;
    background: transparent;
    color: var(--accent-primary);
    font: inherit;
    font-size: 10px;
    text-decoration: underline;
    cursor: pointer;
`,Ol=G.div`
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
`,kl=G.form`
    display: flex;
    flex-direction: column;
    gap: 12px;
`,Al=G.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`,jl=G.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 12px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: rgba(255, 255, 255, 0.015);
`,Ml=G.label`
    font-size: 11px;
    color: var(--text-secondary);
`,Nl=G.input`
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
`,Pl=G.div`
    display: flex;
    align-items: center;
    gap: 10px;
`,Fl=G.button`
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
`,Il=G(Fl).attrs({$primary:!0})``,Ll=G(Fl).attrs({$primary:!1})``,Rl=G(Il)`
    justify-content: center;
    padding: 10px 14px;
`,zl=G(Ll)`
    margin-left: auto;
`,Bl=G(Ll)`
    align-self: center;
`,Vl=G.div`
    display: flex;
    gap: 8px;
`,Hl=G.button`
    padding: 6px 11px;
    border: 1px solid ${({$active:e})=>e?`var(--accent-primary)`:`var(--border-color)`};
    border-radius: 999px;
    background: ${({$active:e})=>e?`rgba(167, 139, 250, 0.12)`:`transparent`};
    color: ${({$active:e})=>e?`var(--text-primary)`:`var(--text-secondary)`};
    font: inherit;
    font-size: 11px;
    cursor: pointer;
`,Ul=G.p`
    font-size: 12px;
    color: #f87171;
`,Wl=G.div`
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
`,Gl=G(Fl)`
    margin-left: auto;
    flex-shrink: 0;
    padding: 5px 10px;
    border-color: rgba(251, 191, 36, 0.45);
    color: #fbbf24;
    font-size: 11px;

    &:hover:not(:disabled) {
        background: rgba(251, 191, 36, 0.14);
    }
`,Kl=G.p`
    font-size: 11px;
    line-height: 1.5;
    color: var(--text-muted);
`,ql=G.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 12px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: var(--bg-primary);
`,Jl=G.span`
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-secondary);
`,Yl=G.div`
    position: fixed;
    inset: 0;
    z-index: 30;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: rgba(6, 4, 12, 0.72);
    backdrop-filter: blur(3px);
`,Xl=G.section`
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
`,Zl=G.div`
    display: flex;
    align-items: center;
    gap: 16px;
`,Ql=G.div`
    width: 64px;
    height: 64px;
    flex-shrink: 0;
    border-radius: 50%;
    background: var(--bg-primary) center / cover no-repeat;
    background-image: ${({$src:e})=>e?`url("${e}")`:`none`};
    box-shadow: inset 0 0 0 1px var(--border-color);
`,$l=G.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`,eu=G.div`
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
`,tu=G.div`
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
`,nu=G.div`
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
`,q=G.div`
    display: flex;
    align-items: center;
    gap: 6px;
    margin-left: auto;
`,ru=G.span`
    margin-left: auto;
    padding: 3px 9px;
    border-radius: 999px;
    background: rgba(167, 139, 250, 0.14);
    color: var(--accent-primary);
    font-family: var(--font-mono);
    font-size: 9px;
`,iu=G.div`
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
`,au=G.div`
    display: flex;
    align-items: center;
    gap: 6px;
`,ou=G.span`
    width: 8px;
    height: 8px;
    flex-shrink: 0;
    border-radius: 50%;
    background: ${({$color:e})=>e};
    box-shadow: 0 0 6px ${({$color:e})=>e};
`,su=G.button`
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
`,cu=G.div`
    position: relative;
    display: flex;

    input {
        width: 100%;
        padding-right: 34px;
    }
`,lu=G(su)`
    position: absolute;
    top: 50%;
    right: 6px;
    transform: translateY(-50%);
`,uu=G.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`,du=G.button`
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
`,fu=G.div`
    display: flex;
    align-items: center;
    gap: 8px;

    strong {
        font-size: 12px;
        font-weight: 600;
    }
`,pu=G.span`
    padding: 2px 7px;
    border-radius: 999px;
    background: var(--bg-primary);
    font-family: var(--font-mono);
    font-size: 9px;
    color: var(--text-muted);
`,mu=G.span`
    margin-left: auto;
    padding: 2px 7px;
    border-radius: 999px;
    background: rgba(167, 139, 250, 0.12);
    color: var(--accent-primary);
    font-family: var(--font-mono);
    font-size: 9px;
`,hu=G.span`
    padding: 2px 7px;
    border-radius: 999px;
    background: ${({$tone:e})=>_u(e)};
    color: ${({$tone:e})=>gu(e)};
    font-family: var(--font-mono);
    font-size: 9px;
`;function gu(e){switch(e){case`weak`:return`#f87171`;case`fair`:return`#fb923c`;case`good`:return`#fbbf24`;case`strong`:return`#4ade80`;default:return`#60a5fa`}}function _u(e){switch(e){case`weak`:return`rgba(248, 113, 113, 0.14)`;case`fair`:return`rgba(251, 146, 60, 0.14)`;case`good`:return`rgba(251, 191, 36, 0.14)`;case`strong`:return`rgba(74, 222, 128, 0.14)`;default:return`rgba(96, 165, 250, 0.14)`}}var vu=G.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`,yu=G.div`
    max-width: 100%;
    overflow: hidden;

    a {
        font-family: var(--font-mono);
        font-size: 10px;
        color: var(--accent-primary);
        word-break: break-all;
    }
`;async function bu(e){return E.available?await E.request(`batch.parse`,{text:e},18e4):{users:[],invalid:[]}}async function xu(e){return await E.request(`batch.run`,{userIds:e},3e4)}async function Su(){await E.request(`batch.stop`)}async function Cu(){return E.available?await E.request(`batch.state`):{running:!1,done:0,total:0,failed:0,cancelled:!1,outcomes:[],actions:[]}}function wu(e){return E.on(t=>{t.type===`batch.progress`&&e(t.data)})}function Tu(e){return E.on(t=>{t.type===`batch.finished`&&e(t.data)})}var Eu={running:!1,world:``,instance:``,users:[]},Du=1,Ou=2,ku=4,Au=8,ju=16,Mu=32;async function Nu(){return E.available?await Fu():Eu}function Pu(e){return E.on(t=>{t.type===`instance.changed`&&Fu().then(e,()=>{})})}async function Fu(){return Iu(await hc(`/instance`))}function Iu(e){let t=e.meta;return{running:t.running===`1`,world:t.world??``,instance:t.instance??``,users:e.rows.map(e=>Lu(e)),source:t.source===`api`||t.source===`log`?t.source:void 0,worldName:t.worldName,userCount:Number(t.userCount??0),capacity:Number(t.capacity??0),worldId:t.worldId,worldThumbnail:t.worldThumbnail,instanceType:t.instanceType,instanceRegion:t.instanceRegion,instanceOwnerId:t.instanceOwnerId,instanceShortName:t.instanceShortName,instanceNumber:t.instanceNumber,instanceDisplayName:t.instanceDisplayName,instanceRestricted:t.instanceRestricted===`1`,instanceAgeGated:t.instanceAgeGated===`1`}}function Lu(e,t=``){let n=Number(e[`${t}flags`]??0),r=n=>String(e[t+n]??``);return{userId:r(`userId`),name:r(`name`),local:(n&Du)!==0,joinedAt:r(`joined`),iconUrl:r(`icon`)||void 0,trust:r(`trust`)||void 0,status:r(`status`)||void 0,statusDescription:r(`statusText`)||void 0,pronouns:r(`pronouns`)||void 0,bio:r(`bio`)||void 0,dateJoined:r(`dateJoined`)||void 0,platform:r(`platform`)||void 0,avatarName:r(`avatarName`)||void 0,isRobot:(n&ku)!==0,isFriend:(n&Ou)!==0,threat:Number(e[`${t}threat`]??0),threatReasons:Ru(r(`reasons`)),whitelisted:(n&Au)!==0,profileLoaded:(n&ju)!==0,avatarLoaded:(n&Mu)!==0}}function Ru(e){return e?e.split(``).map(e=>{let[t,n,r]=e.split(`|`);return{text:t,weight:Number(n??0),detail:r||void 0}}):[]}async function zu(e,t){return await E.request(`user.describe`,{userId:e,displayName:t})}async function Bu(e){return E.available?(await E.request(`user.bio`,{userId:e})).bio??null:null}function Vu({signedIn:e,onSignIn:t}){let n=k(),[r,i]=(0,_.useState)(Eu),[a,o]=(0,_.useState)(null),[s,c]=(0,_.useState)(()=>Date.now()),l=(0,_.useRef)(!1);(0,_.useEffect)(()=>{let e=!1,t=Pu(t=>{e||(l.current=!0,i(t))});return Nu().then(t=>{!e&&!l.current&&i(t)},()=>{}),()=>{e=!0,t()}},[]),(0,_.useEffect)(()=>{let e=window.setInterval(()=>c(Date.now()),5e3);return()=>window.clearInterval(e)},[]),(0,_.useEffect)(()=>{let e=e=>{let t=e.detail;t&&i(e=>({...e,users:e.users.map(e=>e.userId===t.userId?{...e,whitelisted:t.whitelisted}:e)}))};return window.addEventListener(`antibot:whitelist`,e),()=>window.removeEventListener(`antibot:whitelist`,e)},[]);let{running:u,world:d,users:f,worldName:p,capacity:m,worldId:h=``,worldThumbnail:g,instanceType:v=``,instanceRegion:y=``,instanceNumber:b=``,instanceDisplayName:x=``,instanceRestricted:S=!1,instanceAgeGated:C=!1}=r,ee=qu(h,g),w=a?f.find(e=>e.userId===a)??null:null;return(0,D.jsxs)(X,{children:[!e&&(0,D.jsxs)(Z,{children:[(0,D.jsxs)($u,{children:[(0,D.jsx)(`strong`,{children:n(`not_signed_in`)}),(0,D.jsx)(`span`,{children:n(`only_vr_chat_s_local_log_is_read_the_player_list_and_instance_details_can_be_wrong_when_more_than_one_client_runs_and_status_platform_and_avatar_names_are_unavailable`)})]}),(0,D.jsx)(ed,{onClick:t,type:`button`,children:n(`sign_in`)})]}),gc?u?(0,D.jsxs)(D.Fragment,{children:[(0,D.jsxs)(td,{children:[(0,D.jsx)(nd,{$src:ee,children:(0,D.jsxs)(rd,{children:[(0,D.jsx)(ad,{children:n(`world`)}),(0,D.jsx)(id,{$link:h.length>0,onClick:h?()=>void $r(`https://vrchat.com/home/world/${h}`):void 0,title:h?n(`open_on_vrchat_com`):void 0,children:p||d||n(`key`)}),(0,D.jsx)(od,{children:(0,D.jsxs)(sd,{children:[y&&(0,D.jsx)(J,{region:y,t:n}),S&&(0,D.jsx)(Ps,{size:12}),C&&(0,D.jsx)(cd,{children:`18+`}),x||Qu(v,n),` ⋅ #`,b||n(`key`)]})})]})}),(0,D.jsxs)(dd,{children:[(0,D.jsx)(`strong`,{children:f.length}),(m??0)>0&&(0,D.jsx)(`span`,{children:n(`capacity_users`,{capacity:m??0})})]})]}),(0,D.jsxs)(fd,{children:[(0,D.jsxs)(md,{children:[(0,D.jsx)(`span`,{}),(0,D.jsx)(`span`,{children:n(`user`)}),(0,D.jsx)(`span`,{children:n(`trust`)}),(0,D.jsx)(`span`,{children:n(`pronouns`)}),(0,D.jsx)(`span`,{children:n(`status`)}),(0,D.jsx)(`span`,{children:n(`platform`)}),(0,D.jsx)(`span`,{title:n(`time_in_this_instance`),children:n(`time`)})]}),(0,D.jsx)(hd,{children:f.length===0?(0,D.jsx)(af,{children:n(`no_players_in_this_instance_yet`)}):f.map(e=>(0,D.jsx)(Hu,{user:e,now:s,onSelect:e=>o(e.userId)},e.userId))})]})]}):(0,D.jsx)(Y,{hint:n(`players_appear_here_as_vr_chat_writes_join_and_leave_lines_or_once_an_account_is_signed_in`),title:n(`vr_chat_is_not_running`)}):(0,D.jsx)(Y,{hint:n(`the_list_is_built_by_the_desktop_host`),title:n(`desktop_host_required`)}),w&&(0,D.jsx)(Uu,{user:w,now:s,onClose:()=>o(null)})]})}function Hu({user:e,now:t,onSelect:n,showTime:r=!0,timeLabel:i,dim:a=!1,tone:o,badge:s,trailing:c}){let l=k(),u=e.iconUrl??e.avatarUrl,d=Ju(e.status),f=e.threat??0,p=e.profileLoaded??!0,m=o??(e.local?`self`:e.whitelisted?`white`:f>0?`threat`:e.isFriend?`friend`:`none`);return(0,D.jsxs)(xd,{$tone:m,$threat:f,$showTime:r,$dim:a,"data-user-id":e.userId,"data-whitelisted":e.whitelisted?`true`:`false`,onClick:()=>n(e),children:[(0,D.jsx)(Sd,{children:u?(0,D.jsx)(Cd,{$src:u}):p?(0,D.jsx)(Ed,{children:e.name.slice(0,1)}):(0,D.jsx)(Td,{})}),(0,D.jsx)(jd,{children:(0,D.jsxs)(Md,{children:[(0,D.jsx)(`span`,{title:[e.platform,e.dateJoined&&l(`joined_vr_chat_date`,{date:e.dateJoined})].filter(Boolean).join(` · `),children:e.name}),f>0&&(0,D.jsxs)(Pd,{$score:f,title:(e.threatReasons??[]).map(e=>`${l(e.text,e.detail?{days:e.detail,years:Math.floor(Number(e.detail)/365)}:void 0)} ${e.weight>0?`+`:``}${e.weight}`).join(` · `),children:[(0,D.jsx)(Rs,{size:10}),f]}),s,e.local&&(0,D.jsx)(Wd,{children:l(`you`)})]})}),(0,D.jsx)(Od,{children:p?e.trust?(0,D.jsx)(Ud,{$trust:e.trust,children:e.trust}):(0,D.jsx)(Ad,{children:l(`key`)}):(0,D.jsx)(Dd,{})}),(0,D.jsx)(kd,{children:p?e.pronouns?(0,D.jsx)(Nd,{title:e.pronouns,children:e.pronouns}):(0,D.jsx)(Ad,{children:l(`key`)}):(0,D.jsx)(Dd,{})}),(0,D.jsx)(zd,{title:e.statusDescription||void 0,children:p?d?(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(Bd,{$color:d.color}),(0,D.jsx)(`span`,{children:e.statusDescription||l(d.labelKey)})]}):(0,D.jsx)(Ad,{children:l(`key`)}):(0,D.jsx)(Dd,{})}),(0,D.jsx)(Hd,{title:Yu(e.platform,l),children:p?Xu(e.platform,l):(0,D.jsx)(Dd,{})}),r&&(0,D.jsx)(qd,{children:c??i??Zu(e.joinedAt,t,l)})]})}function Uu({user:e,now:t,onClose:n}){let r=k(),[i,a]=(0,_.useState)(e.bio);(0,_.useEffect)(()=>{let e=e=>{e.key===`Escape`&&n()};return window.addEventListener(`keydown`,e),()=>window.removeEventListener(`keydown`,e)},[n]),(0,_.useEffect)(()=>{if(e.bio||e.userId.length===0){a(e.bio);return}let t=!1;return Bu(e.userId).then(e=>{!t&&e&&a(e)},()=>{}),()=>{t=!0}},[e.userId,e.bio]);let o=e.iconUrl??e.avatarUrl,s=Ju(e.status);return(0,D.jsx)(Jd,{onClick:n,children:(0,D.jsxs)(Yd,{"data-user-id":e.userId,"data-whitelisted":e.whitelisted?`true`:`false`,onClick:e=>e.stopPropagation(),children:[(0,D.jsx)(Xd,{$src:o,children:!o&&e.name.slice(0,1).toUpperCase()}),(0,D.jsxs)(Zd,{children:[(0,D.jsx)(`h2`,{children:e.name}),(0,D.jsxs)(Qd,{children:[e.trust&&(0,D.jsx)(Ud,{$trust:e.trust,children:e.trust}),e.whitelisted&&(0,D.jsx)(Rd,{children:r(`whitelisted`)}),e.local&&(0,D.jsx)(Wd,{children:r(`you`)})]}),(0,D.jsxs)($d,{children:[(0,D.jsxs)(ef,{children:[(0,D.jsx)(`span`,{children:r(`profile`)}),(0,D.jsxs)(tf,{onClick:()=>void $r(`https://vrchat.com/home/user/${e.userId}`),title:r(`open_on_vrchat_com`),type:`button`,children:[(0,D.jsx)(Fs,{size:12}),r(`open_on_vrchat_com`)]})]}),(0,D.jsx)(Ku,{status:s,text:e.statusDescription,t:r}),((e.threat??0)>0||(e.threatReasons?.length??0)>0)&&(0,D.jsxs)(ef,{children:[(0,D.jsx)(`span`,{children:r(`threat`)}),(0,D.jsxs)(Fd,{children:[(0,D.jsxs)(Pd,{$score:e.threat??0,children:[(0,D.jsx)(Rs,{size:10}),e.threat??0]}),(0,D.jsx)(Id,{children:(e.threatReasons??[]).map(e=>(0,D.jsxs)(Ld,{$up:e.weight>0,children:[r(e.text,e.detail?{days:e.detail,years:Math.floor(Number(e.detail)/365)}:void 0),(0,D.jsx)(`b`,{children:e.weight>0?`+${e.weight}`:e.weight})]},e.text))})]})]}),(0,D.jsx)(Gu,{label:r(`pronouns`),value:e.pronouns||r(`key`)}),(0,D.jsx)(Gu,{label:r(`platform`),value:Xu(e.platform,r)}),e.joinedAt&&(0,D.jsx)(Gu,{label:r(`in_this_instance`),value:Zu(e.joinedAt,t,r)}),(0,D.jsx)(Gu,{label:r(`avatar`),value:Wu(e,r)}),(0,D.jsx)(Gu,{label:r(`vr_chat_account_since`),value:e.dateJoined?new Date(e.dateJoined).toLocaleDateString():r(`key`)}),i&&(0,D.jsx)(nf,{children:i})]})]}),(0,D.jsx)(rf,{onClick:n,type:`button`,children:`×`})]})})}function Wu(e,t){return e.avatarName?e.avatarName:e.isRobot?t(`robot_default`):e.avatarLoaded??!1?t(`unknown`):t(`loading`)}function Gu({label:e,value:t}){return(0,D.jsxs)(ef,{children:[(0,D.jsx)(`span`,{children:e}),(0,D.jsx)(`code`,{title:t,children:t})]})}function Ku({status:e,text:t,t:n}){let r=t||n(e?e.labelKey:`key`);return(0,D.jsxs)(ef,{children:[(0,D.jsx)(`span`,{children:n(`status`)}),(0,D.jsxs)(Vd,{title:r,children:[e&&(0,D.jsx)(Bd,{$color:e.color}),(0,D.jsx)(`code`,{children:r})]})]})}function qu(e,t){let n=(0,_.useRef)({worldId:``,url:``});return t?n.current={worldId:e,url:t}:n.current.worldId!==e&&(n.current={worldId:e,url:``}),n.current.url}function Ju(e){switch(e){case`active`:return{labelKey:`online`,color:`#4ade80`};case`join me`:return{labelKey:`join_me`,color:`#60a5fa`};case`ask me`:return{labelKey:`ask_me`,color:`#fbbf24`};case`busy`:return{labelKey:`busy`,color:`#f87171`};case`offline`:return{labelKey:`offline`,color:`#94a3b8`};default:return e&&e.length>0?{labelKey:e,color:`#94a3b8`}:null}}function Yu(e,t){return e===`standalonewindows`?t(`pc_includes_both_desktop_and_pcvr_users_vr_chat_does_not_report_which_one`):void 0}function Xu(e,t){switch(e){case`standalonewindows`:return t(`pc_vr`);case`android`:return t(`quest`);case`ios`:return t(`i_os`);default:return e&&e.length>0?e:t(`key`)}}function Zu(e,t,n){if(!e)return n(`key`);let[r,i,a]=e.split(`:`).map(Number);if([r,i,a].some(Number.isNaN))return e;let o=new Date(t);o.setHours(r,i,a,0),o.getTime()>t&&o.setDate(o.getDate()-1);let s=Math.max(0,Math.floor((t-o.getTime())/1e3)),c=Math.floor(s/3600),l=Math.floor(s%3600/60);return c>0?n(`hours_h_minutes_m`,{hours:c,minutes:l}):n(`minutes_m`,{minutes:l})}function J({region:e,t}){switch(e.toLowerCase()){case`jp`:return(0,D.jsx)(ld,{title:t(`japan`),children:(0,D.jsxs)(`svg`,{viewBox:`0 0 30 20`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,D.jsx)(`rect`,{fill:`#fff`,height:`20`,width:`30`}),(0,D.jsx)(`circle`,{cx:`15`,cy:`10`,fill:`#bc002d`,r:`6`})]})});case`us`:case`use`:return(0,D.jsx)(ld,{title:t(`united_states`),children:(0,D.jsxs)(`svg`,{viewBox:`0 0 30 20`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,D.jsx)(`rect`,{fill:`#fff`,height:`20`,width:`30`}),(0,D.jsx)(`path`,{d:`M0 0h30v1.54H0zM0 3.08h30v1.54H0zM0 6.15h30v1.54H0zM0 9.23h30v1.54H0zM0 12.31h30v1.54H0zM0 15.38h30v1.54H0zM0 18.46h30V20H0z`,fill:`#b22234`}),(0,D.jsx)(`rect`,{fill:`#3c3b6e`,height:`10.77`,width:`12.6`})]})});case`eu`:return(0,D.jsx)(ld,{title:t(`europe`),children:(0,D.jsxs)(`svg`,{viewBox:`0 0 30 20`,xmlns:`http://www.w3.org/2000/svg`,children:[(0,D.jsx)(`rect`,{fill:`#003399`,height:`20`,width:`30`}),Array.from({length:12},(e,t)=>{let n=t/12*Math.PI*2;return(0,D.jsx)(`circle`,{cx:15+Math.cos(n)*4.6,cy:10+Math.sin(n)*4.6,fill:`#ffcc00`,r:`0.9`},t)})]})});default:return(0,D.jsx)(ud,{children:e.toUpperCase()})}}function Qu(e,t){switch(e){case`public`:return t(`public`);case`friends`:return t(`friends`);case`friends+`:case`hidden`:return t(`friends_2`);case`invite`:case`private`:return t(`invite`);case`invite+`:return t(`invite_2`);case`group`:return t(`group`);default:if(e?.startsWith(`group:`)){let n=e.slice(6);return t(n===`public`?`group_public`:n===`plus`?`group_2`:`group_members`)}return e&&e.length>0?e:t(`instance`)}}function Y({title:e,hint:t,children:n}){return(0,D.jsxs)(of,{children:[(0,D.jsx)(Ds,{size:28}),(0,D.jsx)(`h2`,{children:e}),(0,D.jsx)(`p`,{children:t}),n]})}var X=G.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 14px;
    min-height: 0;
`,Z=G.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 12px 14px;
    border: 1px solid rgba(251, 191, 36, 0.35);
    border-radius: var(--radius-md);
    background: rgba(251, 191, 36, 0.08);
`,$u=G.div`
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
`,ed=G.button`
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
`,td=G.section`
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    gap: 18px;
    overflow: hidden;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`,nd=G.div`
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
`,rd=G.div`
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    gap: 3px;
    min-width: 0;
    padding: 14px 16px;
`,id=G.h2`
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
`,ad=G.span`
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
`,od=G.div`
    display: flex;
    align-items: center;
    gap: 8px;
    min-width: 0;
`,sd=G.span`
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
`,cd=G.span`
    padding: 0 4px;
    border-radius: 3px;
    background: rgba(248, 113, 113, 0.16);
    color: #fca5a5;
    font-size: 9px;
`,ld=G.span`
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
`,ud=G.span`
    font-family: var(--font-mono);
    font-size: 9px;
    color: var(--text-muted);
`,dd=G.div`
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
`,fd=G.section`
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`,pd=e=>e?`34px minmax(110px, 1.1fr) 0.7fr 0.9fr 1.6fr 0.8fr minmax(64px, 0.5fr)`:`34px minmax(110px, 1.1fr) 0.7fr 0.9fr 1.6fr 0.8fr`,md=G.div`
    display: grid;
    grid-template-columns: ${pd(!0)};
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
`,hd=G.div`
    flex: 1;
    min-height: 0;
    overflow-y: auto;
`;function gd(e,t=!1){switch(e){case`self`:return t?`rgba(167, 139, 250, 0.16)`:`rgba(167, 139, 250, 0.09)`;case`friend`:return t?`rgba(255, 204, 0, 0.16)`:`rgba(255, 204, 0, 0.09)`;case`white`:return t?`rgba(255, 255, 255, 0.16)`:`rgba(255, 255, 255, 0.10)`;default:return t?`rgba(167, 139, 250, 0.06)`:`transparent`}}function _d(e,t=!1){return`rgba(255, 0, 0, ${((Math.min(Math.max(e,0),100)/100)**1.8*.7+(t?.08:0)).toFixed(3)})`}function vd(e,t=0){switch(e){case`self`:return`var(--accent-primary)`;case`friend`:return`#ffcc00`;case`white`:return`rgba(255, 255, 255, 0.5)`;case`threat`:return`rgba(255, 0, 0, ${(.1+Math.min(Math.max(t,0),100)/100*.9).toFixed(3)})`;default:return`transparent`}}function yd(e){return`hsl(${(48-Math.max(0,Math.min(100,e))/100*48).toFixed(0)}, 92%, 62%)`}function bd(e){return`hsla(${(48-Math.max(0,Math.min(100,e))/100*48).toFixed(0)}, 92%, 62%, 0.14)`}var xd=G.div`
    display: grid;
    grid-template-columns: ${({$showTime:e})=>pd(e)};
    gap: 8px;
    align-items: center;
    padding: 8px 16px;
    opacity: ${({$dim:e})=>e?.55:1};
    background: ${({$tone:e,$threat:t})=>e===`threat`?_d(t):gd(e)};
    border-left: 2px solid ${({$tone:e,$threat:t})=>vd(e,t)};
    border-bottom: 1px solid var(--border-color);
    cursor: pointer;

    &:last-child {
        border-bottom: 0;
    }

    &:hover {
        background: ${({$tone:e,$threat:t})=>e===`threat`?_d(t,!0):gd(e,!0)};
    }
`,Sd=G.span`
    display: flex;
    align-items: center;
    justify-content: flex-start;
`,Cd=G.span`
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: var(--bg-primary) center / cover no-repeat;
    background-image: ${({$src:e})=>e?`url("${e}")`:`none`};
    box-shadow: inset 0 0 0 1px var(--border-color);
`,wd=us`
    0%, 100% {
        opacity: 0.25;
    }
    50% {
        opacity: 0.65;
    }
`,Td=G.span`
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: var(--text-muted);
    animation: ${wd} 1.4s ease-in-out infinite;
`,Ed=G.span`
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
`,Dd=G.span`
    display: block;
    width: 62%;
    height: 8px;
    border-radius: 999px;
    background: var(--text-muted);
    animation: ${wd} 1.4s ease-in-out infinite;
`,Od=G.span`
    display: flex;
    align-items: center;
    min-width: 0;
`,kd=G.span`
    display: flex;
    align-items: center;
    min-width: 0;
    overflow: hidden;
`,Ad=G.span`
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 10.5px;
`,jd=G.span`
    display: flex;
    align-items: center;
    gap: 9px;
    min-width: 0;
    font-size: 12.5px;
    font-weight: 500;
`,Md=G.span`
    display: flex;
    align-items: center;
    gap: 7px;
    min-width: 0;

    > span:first-child {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`,Nd=G.span`
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
`,Pd=G.span`
    display: inline-flex;
    align-items: center;
    gap: 3px;
    padding: 1px 6px;
    border-radius: 999px;
    background: ${({$score:e})=>bd(e)};
    color: ${({$score:e})=>yd(e)};
    font-family: var(--font-mono);
    font-size: 9px;
    font-weight: 600;
    white-space: nowrap;
`,Fd=G.div`
    display: flex;
    align-items: flex-start;
    gap: 8px;
    min-width: 0;
`,Id=G.div`
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
    min-width: 0;
`,Ld=G.span`
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
`,Rd=G.span`
    padding: 1px 7px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.12);
    color: #fff;
    font-family: var(--font-mono);
    font-size: 9px;
`,zd=G.span`
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
`,Bd=G.span`
    width: 8px;
    height: 8px;
    flex-shrink: 0;
    border-radius: 50%;
    background: ${({$color:e})=>e};
    box-shadow: 0 0 6px ${({$color:e})=>e};
`,Vd=G.div`
    display: flex;
    align-items: center;
    gap: 6px;
    min-width: 0;

    code {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`,Hd=G.span`
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: var(--text-secondary);
    font-size: 11px;
`,Ud=G.span`
    display: inline-block;
    max-width: 100%;
    overflow: hidden;
    padding: 1px 6px;
    flex-shrink: 0;
    border-radius: 999px;
    background: ${({$trust:e})=>Kd(e)};
    color: ${({$trust:e})=>Gd(e)};
    font-family: var(--font-mono);
    font-size: 9px;
    text-overflow: ellipsis;
    white-space: nowrap;
`,Wd=G.span`
    padding: 1px 6px;
    border-radius: 999px;
    background: rgba(167, 139, 250, 0.16);
    color: var(--accent-primary);
    font-family: var(--font-mono);
    font-size: 9px;
`;function Gd(e){switch(e){case`Trusted User`:return`#c4b5fd`;case`Known User`:return`#93c5fd`;case`user`:return`#86efac`;case`new_user`:return`#fcd34d`;case`nuisance`:return`#fb7185`;default:return`#94a3b8`}}function Kd(e){switch(e){case`Trusted User`:return`rgba(167, 139, 250, 0.16)`;case`Known User`:return`rgba(96, 165, 250, 0.16)`;case`user`:return`rgba(74, 222, 128, 0.14)`;case`new_user`:return`rgba(250, 204, 21, 0.14)`;case`nuisance`:return`rgba(251, 113, 133, 0.16)`;default:return`rgba(148, 163, 184, 0.14)`}}var qd=G.span`
    text-align: right;
    color: var(--text-muted);
    font-family: var(--font-mono);
    font-size: 10.5px;
`,Jd=G.div`
    position: fixed;
    inset: 0;
    z-index: 20;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: rgba(6, 4, 12, 0.72);
    backdrop-filter: blur(3px);
`,Yd=G.div`
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
`,Xd=G.div`
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
`,Zd=G.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    min-width: 0;

    h2 {
        font-size: 17px;
        font-weight: 600;
    }
`,Qd=G.div`
    display: flex;
    gap: 6px;
`,$d=G.dl`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 4px;
`,ef=G.div`
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
`,tf=G.button`
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
`,nf=G.p`
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
`,rf=G.button`
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
`,af=G.div`
    padding: 32px;
    text-align: center;
    color: var(--text-muted);
    font-size: 12px;
`,of=G.div`
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
`;function sf({signedIn:e,onSignIn:t}){let n=k(),[r,i]=(0,_.useState)(``),[a,o]=(0,_.useState)([]),[s,c]=(0,_.useState)([]),[l,u]=(0,_.useState)(``),[d,f]=(0,_.useState)(!1),[p,m]=(0,_.useState)(!1),[h,g]=(0,_.useState)(!1),[v,y]=(0,_.useState)(0),[b,x]=(0,_.useState)(0),[S,C]=(0,_.useState)(0),[ee,w]=(0,_.useState)([]),[te,T]=(0,_.useState)(null),[ne,E]=(0,_.useState)(null),re=Date.now();(0,_.useEffect)(()=>{let e=!1;Cu().then(t=>{e||(g(t.running),y(t.done),x(t.total),C(t.failed),w(t.actions??[]),!t.running&&t.total>0&&T({cancelled:t.cancelled,done:t.done,total:t.total,failed:t.failed,error:t.error,outcomes:t.outcomes??[]}))},()=>{});let t=wu(e=>{g(e.running),y(e.done),x(e.total),C(e.failed)}),n=Tu(e=>{g(!1),m(!1),y(e.done),x(e.total),C(e.failed),T(e)});return()=>{e=!0,t(),n()}},[]);let ie=async()=>{f(!0),u(``),T(null),o([]),c([]),y(0),x(0),C(0),w([]);try{let e=await bu(r);o(e.users),c(e.invalid),e.error?u(e.error):e.users.length===0&&u(n(`no_valid_user_links_were_found`))}catch(e){u(e instanceof Error?e.message:String(e))}finally{f(!1)}},ae=async()=>{u(``),T(null);try{let e=await xu(a.map(e=>e.userId));if(!e.started){u(e.error??``);return}g(!0),y(0),x(e.total),C(0),w(e.actions??[])}catch(e){u(e instanceof Error?e.message:String(e))}},oe=async()=>{m(!0);try{await Su()}catch(e){u(e instanceof Error?e.message:String(e)),m(!1)}},se=b>0?Math.min(100,Math.round(v/b*100)):0;return(0,D.jsxs)(cf,{children:[!e&&(0,D.jsxs)(Sf,{children:[(0,D.jsxs)(Cf,{children:[(0,D.jsx)(`strong`,{children:n(`not_signed_in`)}),(0,D.jsx)(`span`,{children:n(`sign_in_first`)})]}),(0,D.jsx)(wf,{onClick:t,type:`button`,children:n(`sign_in`)})]}),(0,D.jsxs)(lf,{children:[(0,D.jsxs)(uf,{children:[(0,D.jsx)(Ls,{size:20}),(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`h2`,{children:n(`batch_actions`)}),(0,D.jsx)(`p`,{children:n(`apply_the_moderation_actions_enabled_under_automatic_protection_to_a_list_of_vr_chat_users`)})]})]}),(0,D.jsx)(df,{disabled:d||h,onChange:e=>{i(e.target.value),o([]),c([]),T(null),u(``)},placeholder:`https://vrchat.com/home/user/usr_…
usr_…`,spellCheck:!1,value:r}),(0,D.jsxs)(ff,{children:[(0,D.jsx)(Ef,{disabled:d||h||r.trim().length===0||!e,onClick:()=>void ie(),type:`button`,children:n(d?`parsing`:`parse_links`)}),(0,D.jsx)(Df,{disabled:h||d||a.length===0||!e,onClick:()=>void ae(),type:`button`,children:n(`batch_block`)}),h&&(0,D.jsx)(Df,{disabled:p,onClick:()=>void oe(),type:`button`,children:n(`stop`)}),(0,D.jsx)(Q,{children:n(`actions_follow_the_switches_under_automatic_protection`)})]}),l&&(0,D.jsx)(pf,{children:l})]}),s.length>0&&(0,D.jsxs)(lf,{children:[(0,D.jsxs)(uf,{children:[(0,D.jsx)(Rs,{size:18}),(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`h2`,{children:n(`invalid_lines`)}),(0,D.jsx)(`p`,{children:n(`these_lines_did_not_contain_a_user_link`)})]})]}),(0,D.jsx)(mf,{children:s.map((e,t)=>(0,D.jsx)(`li`,{title:e,children:e},`${t}-${e}`))})]}),(h||b>0)&&(0,D.jsxs)(lf,{children:[(0,D.jsxs)(hf,{children:[(0,D.jsx)(`span`,{children:n(`progress`)}),(0,D.jsxs)(`span`,{children:[v,` / `,b,S>0&&` · ${S} ${n(`failed`)}`]})]}),(0,D.jsx)(gf,{children:(0,D.jsx)(_f,{$percent:se})}),(0,D.jsxs)(vf,{children:[ee.length>0&&(0,D.jsx)(`span`,{children:ee.map(e=>n(e)).join(` · `)}),te&&!h&&(0,D.jsxs)(`span`,{children:[te.cancelled?n(`stopped`):n(`done`),te.error&&` · ${te.error}`]})]})]}),a.length>0&&(0,D.jsxs)(yf,{children:[(0,D.jsxs)(bf,{children:[(0,D.jsx)(`span`,{}),(0,D.jsx)(`span`,{children:n(`user`)}),(0,D.jsx)(`span`,{children:n(`trust`)}),(0,D.jsx)(`span`,{children:n(`pronouns`)}),(0,D.jsx)(`span`,{children:n(`status`)}),(0,D.jsx)(`span`,{children:n(`platform`)})]}),(0,D.jsx)(xf,{children:a.map(e=>(0,D.jsx)(Hu,{now:re,onSelect:E,showTime:!1,user:e},e.userId))})]}),ne&&(0,D.jsx)(Uu,{now:re,onClose:()=>E(null),user:ne})]})}var cf=G.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 14px;
    min-height: 0;
`,lf=G.section`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 16px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`,uf=G.div`
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
`,df=G.textarea`
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
`,ff=G.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
`,Q=G.span`
    font-size: 11px;
    color: var(--text-muted);
`,pf=G.p`
    font-size: 11px;
    line-height: 1.5;
    color: #f87171;
`,mf=G.ul`
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
`,hf=G.div`
    display: flex;
    justify-content: space-between;
    gap: 12px;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--text-secondary);
`,gf=G.div`
    height: 8px;
    overflow: hidden;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
`,_f=G.div`
    width: ${({$percent:e})=>`${e}%`};
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, rgba(167, 139, 250, 0.7), var(--accent-primary));
    transition: width 220ms ease;
`,vf=G.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    gap: 8px;
    font-size: 11px;
    color: var(--text-muted);
`,yf=G.section`
    display: flex;
    flex-direction: column;
    max-height: 48vh;
    min-height: 140px;
    overflow: hidden;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`,bf=G.div`
    display: grid;
    grid-template-columns: ${pd(!1)};
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
`,xf=G.div`
    flex: 1;
    min-height: 0;
    overflow-y: auto;
`,Sf=G.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 12px 14px;
    border: 1px solid rgba(251, 191, 36, 0.35);
    border-radius: var(--radius-md);
    background: rgba(251, 191, 36, 0.08);
`,Cf=G.div`
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
`,wf=G.button`
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
`,Tf=G.button`
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
`,Ef=G(Tf).attrs({$primary:!0})``,Df=G(Tf).attrs({$primary:!1})``;async function Of(e){return await E.request(`debug.user`,{userId:e},6e4)}async function kf(){return(await E.request(`debug.closeVrchat`,void 0,6e4)).ok}async function Af(){return await E.request(`debug.safeMode`,void 0,3e4)}async function jf(){return await E.request(`debug.avatar`,void 0,3e4)}async function Mf(){return(await E.request(`debug.fakeInstance`,void 0,3e4)).on}async function Nf(){return(await E.request(`debug.fakeOperations`,void 0,3e4)).on}async function Pf(){return await E.request(`osc.status`)}async function Ff(e){return await E.request(`osc.test`,{port:e},15e3)}function If(){return(0,D.jsxs)(Hf,{children:[(0,D.jsx)(Lf,{}),(0,D.jsx)(Rf,{}),(0,D.jsx)(Bf,{}),(0,D.jsx)($,{}),(0,D.jsx)(Vf,{})]})}function Lf(){let e=k(),[t,n]=(0,_.useState)(null),[r,i]=(0,_.useState)(null),[a,o]=(0,_.useState)(null),[s,c]=(0,_.useState)(``),l=async e=>{o(e),c(``);try{let t=e===`instance`?await Mf():await Nf();e===`instance`?n(t):i(t)}catch(e){c(e instanceof Error?e.message:String(e))}finally{o(null)}};return(0,D.jsxs)(Uf,{children:[(0,D.jsx)(`h2`,{children:e(`fake_data`)}),(0,D.jsx)(`p`,{children:e(`placeholder_players_and_actions_for_screenshots_nothing_is_stored`)}),(0,D.jsxs)(Gf,{children:[(0,D.jsx)(Jf,{disabled:a!==null,onClick:()=>void l(`instance`),type:`button`,children:e(a===`instance`?`working`:`fake_instance_list`)}),(0,D.jsx)(Jf,{disabled:a!==null,onClick:()=>void l(`operations`),type:`button`,children:e(a===`operations`?`working`:`fake_operation_history`)})]}),t!==null||r!==null?(0,D.jsx)(Kf,{$failed:!1,children:e(t||r?`showing_placeholder_data`:`showing_real_data`)}):null,s&&(0,D.jsx)(Kf,{$failed:!0,children:s})]})}function Rf(){let e=k(),[t,n]=(0,_.useState)(!1),[r,i]=(0,_.useState)(``),[a,o]=(0,_.useState)(!1),s=async()=>{n(!0),i(``),o(!1);try{let t=await kf();o(!t),i(e(t?`vr_chat_closed`:`vr_chat_did_not_close_is_it_running`))}catch(e){o(!0),i(e instanceof Error?e.message:String(e))}finally{n(!1)}};return(0,D.jsxs)(Uf,{children:[(0,D.jsx)(`h2`,{children:e(`close_vr_chat`)}),(0,D.jsx)(`p`,{children:e(`asks_vr_chat_to_quit_normally_so_the_client_tells_the_instance_it_is_leaving`)}),(0,D.jsx)(Gf,{children:(0,D.jsx)(Jf,{disabled:t,onClick:()=>void s(),type:`button`,children:e(t?`working`:`close_vr_chat`)})}),r&&(0,D.jsx)(Kf,{$failed:a,children:r})]})}function zf({label:e,value:t}){return(0,D.jsxs)(D.Fragment,{children:[(0,D.jsx)(`dt`,{children:e}),(0,D.jsx)(`dd`,{children:t})]})}function Bf(){let e=k(),[t,n]=(0,_.useState)(!1),[r,i]=(0,_.useState)(``),[a,o]=(0,_.useState)(!1),[s,c]=(0,_.useState)(null),l=()=>void Pf().then(c,()=>c(null));(0,_.useEffect)(()=>{l()},[]);let u=async()=>{n(!0),i(``),o(!1);try{let t=await Af();o(!t.ok),i(t.ok?e(`safe_mode_request_sent`):e(`vr_chat_is_not_listening_for_osc_enable_it_in_the_action_menu`)),l()}catch(e){o(!0),i(e instanceof Error?e.message:String(e))}finally{n(!1)}};return(0,D.jsxs)(Uf,{children:[(0,D.jsx)(`h2`,{children:e(`safe_mode_osc`)}),(0,D.jsx)(`p`,{children:e(`presses_vr_chat_s_panic_button_over_osc_which_replaces_every_non_friend_avatar_at_once`)}),(0,D.jsx)(Qf,{children:(0,D.jsx)(zf,{label:e(`osc`),value:s?.listening?e(`listening_on_port_port`,{port:s.port}):e(`not_listening`)})}),(0,D.jsx)(Gf,{children:(0,D.jsx)(Jf,{disabled:t,onClick:()=>void u(),type:`button`,children:e(t?`working`:`safe_mode_osc`)})}),r&&(0,D.jsx)(Kf,{$failed:a,children:r})]})}function $(){let e=k(),[t,n]=(0,_.useState)(!1),[r,i]=(0,_.useState)(``),[a,o]=(0,_.useState)(!1),s=async()=>{n(!0),i(``),o(!1);try{let t=await jf();o(!t.ok),i(t.ok?e(`avatar_changed`):t.already?e(`already_wearing_that_avatar`):t.configured?e(`vr_chat_is_not_listening_for_osc_enable_it_in_the_action_menu`):e(`set_the_avatar_id_in_the_settings_first`))}catch(e){o(!0),i(e instanceof Error?e.message:String(e))}finally{n(!1)}};return(0,D.jsxs)(Uf,{children:[(0,D.jsx)(`h2`,{children:e(`switch_avatar_osc`)}),(0,D.jsx)(`p`,{children:e(`asks_vr_chat_to_wear_the_avatar_id_from_the_settings`)}),(0,D.jsx)(Gf,{children:(0,D.jsx)(Jf,{disabled:t,onClick:()=>void s(),type:`button`,children:e(t?`working`:`switch_avatar_osc`)})}),r&&(0,D.jsx)(Kf,{$failed:a,children:r})]})}function Vf(){let e=k(),[t,n]=(0,_.useState)(``),[r,i]=(0,_.useState)(!1),[a,o]=(0,_.useState)(``),[s,c]=(0,_.useState)(null),l=async()=>{i(!0),o(``),c(null);try{c(await Of(t))}catch(e){o(e instanceof Error?e.message:String(e))}finally{i(!1)}};return(0,D.jsxs)(Uf,{children:[(0,D.jsx)(`h2`,{children:e(`user_check`)}),(0,D.jsx)(`p`,{children:e(`paste_a_vr_chat_user_id_or_a_profile_link_to_see_how_it_would_be_scored`)}),(0,D.jsxs)(Wf,{onSubmit:e=>{e.preventDefault(),l()},children:[(0,D.jsx)(qf,{onChange:e=>n(e.target.value),placeholder:`usr_… or https://vrchat.com/home/user/usr_…`,value:t}),(0,D.jsx)(Jf,{disabled:r||t.trim().length===0,type:`submit`,children:e(r?`checking`:`check`)})]}),a&&(0,D.jsx)(Yf,{children:a}),s&&(0,D.jsxs)(Xf,{children:[(0,D.jsx)(Zf,{$score:s.threat,children:s.threat}),(0,D.jsxs)(Qf,{children:[(0,D.jsx)(zf,{label:e(`name`),value:s.displayName}),(0,D.jsx)(zf,{label:e(`user_id`),value:s.id}),(0,D.jsx)(zf,{label:e(`rank`),value:s.trust??e(`unknown`)}),(0,D.jsx)(zf,{label:e(`joined`),value:s.dateJoined??e(`unknown`)}),(0,D.jsx)(zf,{label:e(`platform`),value:s.platform??e(`unknown`)}),(0,D.jsx)(zf,{label:e(`avatar`),value:s.avatarName??(s.isRobot?e(`robot_default`):e(`unknown`))})]}),(0,D.jsx)($f,{children:s.reasons.length>0?s.reasons.map(t=>(0,D.jsxs)(`li`,{children:[e(t.text,t.detail?{days:t.detail,years:Math.floor(Number(t.detail)/365)}:void 0),(0,D.jsx)(ep,{$up:t.weight>0,children:t.weight>0?`+${t.weight}`:t.weight})]},t.text)):(0,D.jsx)(`li`,{children:e(`no_signal_matched`)})})]})]})}var Hf=G.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 16px;
    min-height: 0;
    max-width: 720px;
    overflow: auto;
`,Uf=G.section`
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
`,Wf=G.form`
    display: flex;
    align-items: center;
    gap: 10px;
`,Gf=G.div`
    display: flex;
    align-items: center;
    gap: 10px;
`,Kf=G.p`
    font-family: var(--font-mono);
    font-size: 11px;
    color: ${({$failed:e})=>e?`#f87171`:`#4ade80`};
`,qf=G.input`
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
`,Jf=G.button`
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
`,Yf=G.p`
    font-family: var(--font-mono);
    font-size: 11px;
    color: #f87171;
`,Xf=G.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 14px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: var(--bg-primary);
`,Zf=G.strong`
    font-family: var(--font-mono);
    font-size: 26px;
    font-weight: 600;
    color: ${({$score:e})=>e>=70?`#f87171`:e>=40?`#fbbf24`:`#4ade80`};
`,Qf=G.dl`
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
`,$f=G.ul`
    display: flex;
    flex-direction: column;
    gap: 3px;
    margin: 0;
    padding-left: 16px;
    font-size: 11px;
    color: var(--text-secondary);
`,ep=G.b`
    margin-left: 6px;
    color: ${({$up:e})=>e?`#fca5a5`:`#86efac`};
`,tp=[`debug`,`info`,`warning`,`error`],np={debug:`debug`,info:`info`,warning:`warning`,error:`error`},rp={debug:`DBG`,info:`INF`,warning:`WRN`,error:`ERR`},ip=e=>e===`error`?`#fb7185`:e===`warning`?`#fbbf24`:e===`info`?`#60a5fa`:e===`debug`?`#6f6885`:`transparent`;function ap({log:e}){let t=k(),{status:n,lines:r,clear:i}=e,[a,o]=(0,_.useState)(``),[s,c]=(0,_.useState)(new Set),[l,u]=(0,_.useState)(!0),[d,f]=(0,_.useState)(!1),[p,m]=(0,_.useState)(null),h=(0,_.useRef)(null),g=(0,_.useMemo)(()=>op(r,a,s),[r,a,s]);(0,_.useEffect)(()=>{let e=h.current;if(!l||!e)return;let t=()=>{e.scrollTop=e.scrollHeight};t();let n=window.requestAnimationFrame(t),r=window.setTimeout(t,60);return()=>{window.cancelAnimationFrame(n),window.clearTimeout(r)}},[g,l]),(0,_.useEffect)(()=>{if(!p)return;let e=window.setTimeout(()=>m(null),5e3);return()=>window.clearTimeout(e)},[p]);let v=e=>c(t=>{let n=new Set(t);return n.delete(e)||n.add(e),n});return(0,D.jsxs)(lp,{children:[(0,D.jsxs)(up,{children:[(0,D.jsxs)(dp,{children:[(0,D.jsxs)(pp,{children:[(0,D.jsx)(Ss,{}),(0,D.jsx)(`input`,{"aria-label":t(`filter_log_lines`),onChange:e=>o(e.target.value),placeholder:t(`filter_lines`),spellCheck:!1,type:`search`,value:a}),a&&(0,D.jsx)(mp,{"aria-label":t(`clear_the_filter`),onClick:()=>o(``),type:`button`,children:(0,D.jsx)(Cs,{})})]}),(0,D.jsx)(fp,{}),(0,D.jsxs)(_p,{$active:l,onClick:()=>u(e=>!e),title:t(l?`stop_scrolling_as_new_lines_arrive`:`scroll_to_the_newest_line_again`),type:`button`,children:[(0,D.jsx)(vp,{$active:l}),t(l?`following`:`paused`)]}),(0,D.jsxs)(_p,{disabled:r.length===0,onClick:i,title:t(`clear_the_view_the_log_itself_is_untouched`),type:`button`,children:[(0,D.jsx)(ws,{}),t(`clear`)]}),(0,D.jsxs)(_p,{disabled:r.length===0||d,onClick:async()=>{m(null),f(!0);try{let e=await Tc();e.saved&&m({text:t(`exported_count_lines_to_path`,{count:e.lines,path:e.path??``})})}catch(e){m({text:e instanceof Error?e.message:String(e),error:!0})}finally{f(!1)}},title:t(`save_every_line_read_so_far_to_a_file`),type:`button`,children:[(0,D.jsx)(Os,{}),t(d?`exporting`:`export`)]})]}),(0,D.jsx)(hp,{children:tp.map(e=>(0,D.jsxs)(gp,{$level:e,$on:!s.has(e),onClick:()=>v(e),title:t(s.has(e)?`show_level_lines`:`hide_level_lines`,{level:t(np[e])}),type:`button`,children:[(0,D.jsx)(`i`,{}),t(np[e])]},e))})]}),p&&(0,D.jsxs)(yp,{$error:p.error,children:[(0,D.jsx)(`span`,{children:p.text}),(0,D.jsx)(`button`,{"aria-label":t(`dismiss`),onClick:()=>m(null),type:`button`,children:(0,D.jsx)(Cs,{})})]}),(0,D.jsxs)(bp,{children:[gc?r.length===0?n.running?n.exists?(0,D.jsx)(cp,{hint:t(`vr_chat_is_starting_lines_appear_here_as_soon_as_it_writes_them`),title:t(`waiting_for_the_log`)}):(0,D.jsx)(cp,{hint:t(`the_configured_log_folder_cannot_be_found_set_vr_chat_s_log_folder_in_settings`),title:t(`log_folder_not_found`)}):(0,D.jsx)(cp,{hint:t(`nothing_is_read_while_vr_chat_is_closed_its_log_appears_here_once_it_starts`),title:t(`vr_chat_is_not_running`)}):g.length===0?(0,D.jsx)(cp,{hint:a.trim()?t(`no_line_contains_query`,{query:a.trim()}):t(`every_line_is_hidden_by_the_level_filter`),title:t(`nothing_matches`)}):(0,D.jsx)(xp,{onScroll:()=>{let e=h.current;if(!e)return;let t=e.scrollHeight-e.scrollTop-e.clientHeight<48;t!==l&&u(t)},ref:h,children:g.map(({line:e,level:n})=>e.level===`session`?(0,D.jsx)(wp,{children:t(`new_session`)},e.id):(0,D.jsxs)(Sp,{$level:n,children:[(0,D.jsx)(Cp,{children:e.time}),(0,D.jsx)(Tp,{$level:n,children:e.level?rp[n]??e.level:``}),(0,D.jsx)(Ep,{$level:n,children:sp(e.message,a)})]},e.id))}):(0,D.jsx)(cp,{hint:t(`the_log_is_read_through_the_desktop_host_start_anti_bot_instead_of_the_browser_preview`),title:t(`desktop_host_required`)}),!l&&g.length>0&&(0,D.jsxs)(Dp,{onClick:()=>u(!0),type:`button`,children:[(0,D.jsx)(Es,{}),t(`jump_to_latest`)]})]}),(0,D.jsx)(kp,{children:(0,D.jsx)(`span`,{children:g.length===r.length?t(`count_lines`,{count:r.length}):t(`visible_of_total_lines`,{visible:g.length,total:r.length})})})]})}function op(e,t,n){let r=t.trim().toLowerCase(),i=[],a=``;for(let t of e){t.level&&(a=t.level);let e=t.level||a;n.has(e)||(!r||t.message.toLowerCase().includes(r))&&i.push({line:t,level:e})}return i}function sp(e,t){let n=t.trim();if(!n)return e;let r=e.split(RegExp(`(${n.replace(/[.*+?^${}()|[\]\\]/g,`\\$&`)})`,`gi`)),i=n.toLowerCase();return r.map((e,t)=>e.toLowerCase()===i?(0,D.jsx)(`mark`,{children:e},t):e)}function cp({title:e,hint:t,children:n}){return(0,D.jsxs)(Op,{children:[(0,D.jsx)(bs,{size:28}),(0,D.jsx)(`h2`,{children:e}),(0,D.jsx)(`p`,{children:t}),n]})}var lp=G.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 10px;
    min-height: 0;
`,up=G.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
`,dp=G.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 8px;
`,fp=G.span`
    flex: 1;
`,pp=G.div`
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
`,mp=G.button`
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
`,hp=G.div`
    display: flex;
    gap: 4px;
`,gp=G.button`
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 9px;
    border: 1px solid ${({$on:e,$level:t})=>e?`${ip(t)}66`:`var(--border-color)`};
    border-radius: 999px;
    background: ${({$on:e,$level:t})=>e?`${ip(t)}14`:`transparent`};
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
        background: ${({$on:e,$level:t})=>e?ip(t):`var(--text-muted)`};
    }

    &:hover {
        border-color: var(--border-color-hover);
    }
`,_p=G.button`
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
`,vp=G.span`
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: ${({$active:e})=>e?`var(--accent-primary)`:`var(--text-muted)`};
    box-shadow: ${({$active:e})=>e?`0 0 8px var(--accent-primary)`:`none`};
`,yp=G.div`
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
`,bp=G.section`
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
    overflow: hidden;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: rgba(9, 7, 16, 0.6);
`,xp=G.div`
    flex: 1;
    min-height: 0;
    overflow: auto;
    padding: 6px 0 12px;
    font-family: var(--font-mono);
    font-size: 11.5px;
`,Sp=G.div`
    display: grid;
    grid-template-columns: 62px 34px minmax(0, 1fr);
    gap: 10px;
    padding: 0 14px;
    border-left: 2px solid ${({$level:e})=>ip(e)};
    line-height: 1.7;
    content-visibility: auto;
    contain-intrinsic-size: auto 20px;

    &:hover {
        background: rgba(167, 139, 250, 0.06);
    }
`,Cp=G.span`
    color: var(--text-muted);
    white-space: nowrap;
`,wp=G.div`
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
`,Tp=G.span`
    color: ${({$level:e})=>ip(e)};
    font-size: 9px;
    letter-spacing: 0.04em;
    line-height: 1.95;
    opacity: 0.85;
`,Ep=G.span`
    color: ${({$level:e})=>e===`error`?`#fecaca`:e===`warning`?`#fde68a`:`var(--text-secondary)`};
    white-space: pre-wrap;
    overflow-wrap: anywhere;

    mark {
        border-radius: 2px;
        background: rgba(167, 139, 250, 0.28);
        color: var(--text-primary);
    }
`,Dp=G.button`
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
`,Op=G.div`
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
`,kp=G.footer`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 16px;
    padding: 0 2px;
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-muted);
`;async function Ap(){return E.available?await Pp():[]}async function jp(){E.available&&await E.request(`operations.clear`)}async function Mp(e){return E.available?await E.request(`operations.undo`,{id:e}):{ok:!1,message:`The desktop host is not available.`}}function Np(e){return E.on(t=>{t.type===`operations.changed`&&Pp().then(e,()=>{})})}async function Pp(){return(await hc(`/operations`)).rows.map(e=>({id:Number(e.id),at:Number(e.at),kind:String(e.kind),userId:String(e.userId),displayName:String(e.displayName),detail:String(e.detail),avatarUrl:String(e.avatar??``)||void 0,undone:Number(e.undone)!==0}))}function Fp(){let e=k(),t=me(),[n,r]=(0,_.useState)([]),[i,a]=(0,_.useState)(null),[o,s]=(0,_.useState)(!1),[c,l]=(0,_.useState)(null),[u,d]=(0,_.useState)(null),f=(0,_.useRef)(!1);(0,_.useEffect)(()=>{let e=!1,t=Np(t=>{e||(f.current=!0,r(t))});return Ap().then(t=>{!e&&!f.current&&r(t)},()=>{}),()=>{e=!0,t()}},[]);let p=()=>{o?(s(!1),jp().then(()=>r([]),()=>{})):s(!0)},m=e=>{e.userId.length!==0&&zu(e.userId,e.displayName).then(a,()=>{})},h=t=>{l(t.id),Mp(t.id).then(e=>{d({ok:e.ok,text:e.message})},()=>{d({ok:!1,text:e(`the_host_did_not_answer`)})}).finally(()=>{l(null),window.setTimeout(()=>d(null),6e3)})};return(0,D.jsxs)(Bp,{children:[(0,D.jsxs)(Vp,{children:[(0,D.jsxs)(Hp,{children:[(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`h2`,{children:e(`operation_history`)}),(0,D.jsx)(`p`,{children:e(`every_block_chat_box_mute_and_avatar_interaction_change_as_it_happened`)})]}),(0,D.jsxs)(Wp,{children:[(0,D.jsx)(Up,{children:e(`count_action_s`,{count:n.length})}),(0,D.jsx)(Gp,{$confirming:o,disabled:n.length===0,onBlur:()=>s(!1),onClick:p,type:`button`,children:e(o?`confirm_clear`:`clear_history`)})]})]}),u&&(0,D.jsx)(Kp,{$ok:u.ok,children:u.text}),(0,D.jsx)(qp,{children:n.length===0?(0,D.jsx)(rm,{children:e(`anti_bot_has_not_taken_an_automatic_action_yet`)}):n.map(n=>(0,D.jsxs)(Jp,{"data-user-id":n.userId||void 0,onClick:()=>m(n),children:[(0,D.jsx)(Yp,{$src:n.avatarUrl}),(0,D.jsx)(Xp,{children:Ip(n.at,t)}),(0,D.jsx)(Zp,{$kind:n.kind,children:e(Lp(n.kind))}),(0,D.jsx)(Qp,{children:n.displayName||e(`unknown_user`)}),(0,D.jsx)($p,{title:n.detail,children:n.detail}),(0,D.jsxs)(em,{children:[Rp(n)&&(0,D.jsx)(tm,{disabled:c===n.id,onClick:e=>{e.stopPropagation(),h(n)},type:`button`,children:c===n.id?e(`undoing`):e(`undo`)}),(0,D.jsxs)(nm,{disabled:n.userId.length===0,onClick:e=>{e.stopPropagation(),$r(`https://vrchat.com/home/user/${n.userId}`)},title:e(`open_the_vr_chat_profile`),type:`button`,children:[(0,D.jsx)(Fs,{size:11}),e(`profile`)]})]})]},n.id))})]}),i&&(0,D.jsx)(Uu,{user:i,now:Date.now(),onClose:()=>a(null)})]})}function Ip(e,t){return new Date(e).toLocaleString(t,{year:`numeric`,month:`short`,day:`numeric`,hour:`2-digit`,minute:`2-digit`,second:`2-digit`})}function Lp(e){switch(e){case`block`:return`blocked`;case`avatarInteractionOff`:return`avatar_interactions_off`;case`chatBoxHidden`:return`chat_box_hidden`;case`closeVrchat`:return`closed_vr_chat`;case`safeMode`:return`safe_mode_on`;case`switchedAvatar`:return`switched_avatar`;case`returnHome`:return`returned_home`;case`rejectRequest`:return`request_rejected`;case`undoReject`:return`rejection_undone`;case`unblock`:return`unblocked`;case`avatarInteractionOn`:return`avatar_interactions_on`;case`chatBoxShown`:return`chat_box_shown`;default:return e}}function Rp(e){return e.undone?!1:e.kind===`block`||e.kind===`avatarInteractionOff`||e.kind===`chatBoxHidden`}function zp(e){switch(e){case`unblock`:case`avatarInteractionOn`:case`chatBoxShown`:case`undoReject`:return`#4ade80`;default:return`#fb7185`}}var Bp=G.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
`,Vp=G.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`,Hp=G.div`
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
`,Up=G.span`
    flex-shrink: 0;
    font-family: var(--font-mono);
    font-size: 9.5px;
    color: var(--text-muted);
`,Wp=G.div`
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
`,Gp=G.button`
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
`,Kp=G.div`
    margin: 10px 16px 0;
    padding: 8px 12px;
    border: 1px solid ${({$ok:e})=>e?`rgba(74, 222, 128, 0.45)`:`rgba(251, 113, 133, 0.45)`};
    border-radius: var(--radius-sm);
    background: ${({$ok:e})=>e?`rgba(74, 222, 128, 0.1)`:`rgba(251, 113, 133, 0.1)`};
    color: ${({$ok:e})=>e?`#4ade80`:`#fb7185`};
    font-size: 11px;
`,qp=G.div`
    flex: 1;
    min-height: 0;
    overflow-y: auto;
`,Jp=G.div`
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
`,Yp=G.span`
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
`,Xp=G.span`
    font-family: var(--font-mono);
    font-size: 9.5px;
    color: var(--text-muted);
    white-space: nowrap;
`,Zp=G.span`
    font-size: 10.5px;
    color: ${({$kind:e})=>zp(e)};
    white-space: nowrap;
`,Qp=G.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 11.5px;
`,$p=G.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: var(--font-mono);
    font-size: 9.5px;
    color: var(--text-muted);
`,em=G.div`
    display: flex;
    justify-content: flex-end;
    gap: 6px;
`,tm=G.button`
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
`,nm=G.button`
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
`,rm=G.p`
    padding: 26px 16px;
    text-align: center;
    font-size: 11.5px;
    color: var(--text-muted);
`;async function im(){return E.available?await cm():[]}async function am(){E.available&&await E.request(`friendRequests.clear`)}async function om(e){E.available&&await E.request(`friendRequests.undo`,{id:e})}function sm(e){return E.on(t=>{t.type===`friendRequests.changed`&&cm().then(e,()=>{})})}async function cm(){return(await hc(`/requests`)).rows.map(e=>({id:String(e.id),userId:String(e.userId),createdAt:String(e.createdAt),active:Number(e.active)!==0,rejected:Number(e.rejected)!==0,firstSeen:Number(e.firstSeen),user:Lu(e,`user.`)}))}function lm({signedIn:e,onSignIn:t}){let n=k(),r=me(),[i,a]=(0,_.useState)([]),[o,s]=(0,_.useState)(null),[c,l]=(0,_.useState)(!1),u=(0,_.useRef)(!1);(0,_.useEffect)(()=>{let e=!1,t=sm(t=>{e||(u.current=!0,a(t))});return im().then(t=>{!e&&!u.current&&a(t)},()=>{}),()=>{e=!0,t()}},[]);let d=i.filter(e=>e.active).length,f=()=>{c?(l(!1),am().then(()=>a([]),()=>{})):l(!0)},p=e=>{om(e.id)};return(0,D.jsxs)(pm,{children:[!e&&(0,D.jsxs)(mm,{children:[(0,D.jsxs)(hm,{children:[(0,D.jsx)(`strong`,{children:n(`not_signed_in`)}),(0,D.jsx)(`span`,{children:n(`sign_in_to_record_the_friend_requests_vr_chat_receives`)})]}),(0,D.jsx)(gm,{onClick:t,type:`button`,children:n(`sign_in`)})]}),(0,D.jsxs)(_m,{children:[(0,D.jsxs)(vm,{children:[(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`h2`,{children:n(`friend_requests`)}),(0,D.jsx)(`p`,{children:i.length===0?n(`every_incoming_request_is_recorded_here_with_the_sender_s_profile`):n(`count_recorded_pending_still_pending`,{count:i.length,pending:d})})]}),(0,D.jsxs)(ym,{children:[(0,D.jsx)(xm,{children:n(`faded_rows_are_no_longer_pending`)}),(0,D.jsx)(bm,{$confirming:c,disabled:i.length===0,onBlur:()=>l(!1),onClick:f,type:`button`,children:n(c?`confirm_clear`:`clear_history`)})]})]}),(0,D.jsxs)(Sm,{children:[(0,D.jsx)(`span`,{}),(0,D.jsx)(`span`,{children:n(`user`)}),(0,D.jsx)(`span`,{children:n(`trust`)}),(0,D.jsx)(`span`,{children:n(`pronouns`)}),(0,D.jsx)(`span`,{children:n(`status`)}),(0,D.jsx)(`span`,{children:n(`platform`)}),(0,D.jsx)(`span`,{children:n(`received`)})]}),(0,D.jsx)(Cm,{children:i.length===0?(0,D.jsx)(Tm,{children:n(`no_friend_requests_recorded_yet`)}):um(i,n,r).map(e=>(0,D.jsxs)(`section`,{children:[(0,D.jsx)(wm,{children:e.day}),e.items.map(e=>(0,D.jsx)(Hu,{badge:e.rejected?(0,D.jsx)(Em,{children:n(`rejected`)}):void 0,dim:!e.active,now:e.firstSeen,onSelect:s,timeLabel:fm(e.firstSeen,r),trailing:e.rejected?(0,D.jsx)(Dm,{onClick:t=>{t.stopPropagation(),p(e)},type:`button`,children:n(`undo`)}):void 0,user:e.user},e.id))]},e.day))})]}),o&&(0,D.jsx)(Uu,{user:o,now:Date.now(),onClose:()=>s(null)})]})}function um(e,t,n){let r=new Map;for(let i of e){let e=dm(i.firstSeen,t,n),a=r.get(e)??[];a.push(i),r.set(e,a)}return[...r].map(([e,t])=>({day:e,items:t}))}function dm(e,t,n){let r=new Date(e);return r.toDateString()===new Date().toDateString()?t(`today`):r.toLocaleDateString(n,{year:`numeric`,month:`short`,day:`numeric`})}function fm(e,t){return new Date(e).toLocaleTimeString(t,{hour:`2-digit`,minute:`2-digit`})}var pm=G.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 14px;
    min-height: 0;
`,mm=G.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    padding: 12px 14px;
    border: 1px solid rgba(251, 191, 36, 0.35);
    border-radius: var(--radius-md);
    background: rgba(251, 191, 36, 0.08);
`,hm=G.div`
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
`,gm=G.button`
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
`,_m=G.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`,vm=G.div`
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
`,ym=G.div`
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
`,bm=G.button`
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
`,xm=G.span`
    flex-shrink: 0;
    font-family: var(--font-mono);
    font-size: 9.5px;
    color: var(--text-muted);
`,Sm=G.div`
    display: grid;
    grid-template-columns: ${pd(!0)};
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
`,Cm=G.div`
    flex: 1;
    min-height: 0;
    overflow-y: auto;
`,wm=G.h3`
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
`,Tm=G.p`
    padding: 26px 16px;
    text-align: center;
    font-size: 11.5px;
    color: var(--text-muted);
`,Em=G.span`
    padding: 1px 6px;
    border-radius: 999px;
    background: rgba(251, 113, 133, 0.14);
    color: #fb7185;
    font-family: var(--font-mono);
    font-size: 9px;
    white-space: nowrap;
`,Dm=G.button`
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
`,Om=us`
    from {
        opacity: 0;
        transform: translateY(6px) scale(0.98);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
`,km=us`
    from {
        opacity: 0;
        transform: translateY(-6px) scale(0.98);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
`,Am=G.div`
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
    animation: ${({$up:e})=>e?Om:km} 0.16s cubic-bezier(0.22, 1, 0.36, 1);
`,jm=G.button`
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
`,Mm=G.div`
    position: relative;
    display: inline-flex;
`,Nm=G.button`
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
`,Pm=G.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`,Fm=G.span`
    flex-shrink: 0;
    font-size: 0.7em;
    opacity: 0.75;
    transform: rotate(${({$open:e})=>e?`180deg`:`0`});
    transition: transform 0.18s ease;
`;function Im(e,t,n){let[r,i]=(0,_.useState)({});return(0,_.useEffect)(()=>{if(!e)return;let r=()=>{let e=n.current?.getBoundingClientRect();if(!e)return;let r=t?e.top:window.innerHeight-e.bottom;i({maxHeight:Math.max(120,Math.floor(r-10))})};return r(),window.addEventListener(`resize`,r),()=>window.removeEventListener(`resize`,r)},[e,t,n]),r}function Lm({value:e,options:t,onChange:n,up:r,disabled:i,title:a}){let[o,s]=(0,_.useState)(!1),c=(0,_.useRef)(null),l=Im(o,r,c);(0,_.useEffect)(()=>{if(!o)return;let e=()=>s(!1),t=t=>{c.current?.contains(t.target)||e()},n=t=>{t.key===`Escape`&&e()},r=()=>{document.hidden&&e()};return document.addEventListener(`pointerdown`,t),document.addEventListener(`keydown`,n),window.addEventListener(`blur`,e),document.addEventListener(`visibilitychange`,r),()=>{document.removeEventListener(`pointerdown`,t),document.removeEventListener(`keydown`,n),window.removeEventListener(`blur`,e),document.removeEventListener(`visibilitychange`,r)}},[o]);let u=t.find(t=>t.value===e)?.label??e;return(0,D.jsxs)(Mm,{onBlur:e=>{e.currentTarget.contains(e.relatedTarget)||s(!1)},ref:c,children:[(0,D.jsxs)(Nm,{"aria-expanded":o,"aria-haspopup":`listbox`,disabled:i,onClick:()=>s(e=>!e),title:a,type:`button`,children:[(0,D.jsx)(Pm,{children:u}),(0,D.jsx)(Fm,{$open:o,children:`▾`})]}),o&&(0,D.jsx)(Am,{$up:r,role:`listbox`,style:l,children:t.map(t=>(0,D.jsx)(jm,{$active:t.value===e,"aria-selected":t.value===e,onClick:()=>{s(!1),n(t.value)},role:`option`,type:`button`,children:t.label},t.value))})]})}var Rm=`modulepreload`,zm=function(e){return`/`+e},Bm={},Vm=function(e){return e.pathname.endsWith(`.css`)},Hm=function(e,t,n){if(t in e)return e[t];let r=n();if(!r){e[t]=void 0;return}let i=r.then(()=>{e[t]=void 0},n=>{throw e[t]=void 0,n});return e[t]=i,i},Um=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e,i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}function s(e){return import.meta.resolve?new URL(import.meta.resolve(e)):new URL(e,import.meta.url)}r=o(t.map(t=>{t=zm(t,n);let r=s(t),i=Vm(r);return Hm(Bm,r.href,()=>{if(e===void 0){e={all:new Set,styles:new Set};let t=document.getElementsByTagName(`link`);for(let n=t.length-1;n>=0;n--){let r=t[n];e.all.add(r.href),r.rel===`stylesheet`&&e.styles.add(r.href)}}if((i?e.styles:e.all).has(r.href))return;let t=document.createElement(`link`);if(t.rel=i?`stylesheet`:Rm,i||(t.as=`script`),t.crossOrigin=``,t.href=r.href,a&&t.setAttribute(`nonce`,a),document.head.appendChild(t),i)return new Promise((e,n)=>{let i=a=>{t.removeEventListener(`load`,i),t.removeEventListener(`error`,i),a.type===`error`?n(Error(`Unable to preload CSS for ${r}`)):e(a)};t.addEventListener(`load`,i),t.addEventListener(`error`,i)})})}).filter(e=>e!==void 0))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})},Wm=(0,_.lazy)(()=>Um(()=>import(`./AttributionPage-BLayEq0p.js`).then(e=>({default:e.AttributionPage})),[])),Gm=`system`,Km={en:`English`,ja:`日本語`,"zh-CN":`简体中文`,"zh-TW":`繁體中文`},qm=[{id:`settings-language`,label:`language`},{id:`settings-appearance`,label:`appearance`},{id:`settings-startup`,label:`start_with_the_system`},{id:`settings-log-source`,label:`log_source`},{id:`settings-avatar-lookups`,label:`avatar_name_lookups`},{id:`settings-osc`,label:`osc`},{id:`settings-protection`,label:`automatic_protection`},{id:`settings-whitelist`,label:`whitelist`},{id:`settings-build`,label:`build`}];function Jm({info:e}){let t=k(),[n,r]=(0,_.useState)(``),[i,a]=(0,_.useState)(``),[o,s]=(0,_.useState)([]),[c,l]=(0,_.useState)(``),[u,d]=(0,_.useState)(!0),[f,p]=(0,_.useState)(!0),[m,h]=(0,_.useState)(!0),[g,v]=(0,_.useState)(!1),[y,b]=(0,_.useState)(!1),[x,S]=(0,_.useState)(!1),[C,ee]=(0,_.useState)(``),[w,te]=(0,_.useState)(!0),[T,ne]=(0,_.useState)(!0),[E,re]=(0,_.useState)(70),[ie,ae]=(0,_.useState)([]),[oe,se]=(0,_.useState)(``),[ce,le]=(0,_.useState)([]),[ue,de]=(0,_.useState)(Gm),[pe,O]=(0,_.useState)(`system`),[me,he]=(0,_.useState)([]),[ge,_e]=(0,_.useState)(!1),[ve,ye]=(0,_.useState)(9e3),[be,A]=(0,_.useState)(null),[j,xe]=(0,_.useState)(``),[M,Se]=(0,_.useState)(!1),[Ce,we]=(0,_.useState)(null),[N,Te]=(0,_.useState)(!1),[Ee,De]=(0,_.useState)(null),[Oe,ke]=(0,_.useState)(!1),[Ae,je]=(0,_.useState)(null),[Me,Ne]=(0,_.useState)(!1),[Pe,Fe]=(0,_.useState)(qm[0].id),[Ie,Le]=(0,_.useState)(!1),[Re,ze]=(0,_.useState)(!1),[Be,Ve]=(0,_.useState)(!1),[He,Ue]=(0,_.useState)(null),We=(0,_.useRef)(0),Ge=(0,_.useRef)(!1),Ke=(0,_.useRef)(0),qe=async e=>{try{let t=await gs();le(t),e<6&&t.some(e=>e.name===e.userId)&&window.setTimeout(()=>void qe(e+1),1200)}catch{}},Je=()=>{Pf().then(A,()=>A(null))},Ye=async()=>{Se(!0),xe(``);try{let e=await Ff(ve);xe(e.sent?t(`sent_to_port_port_if_the_quick_menu_opened_osc_is_working`,{port:e.port}):t(`could_not_send_the_test_message`)),Je()}catch(e){xe(e instanceof Error?e.message:String(e))}finally{Se(!1)}},Xe=e=>{ye(e),window.clearTimeout(Ke.current),Ke.current=window.setTimeout(()=>void P({oscPort:e}),400)},Ze=e=>{r(e.logDirectory??``),a(e.defaultLogDirectory??``),s(e.avatarApiProviders??[]),d(e.autoBlock),p(e.autoDisableAvatarInteraction),h(e.autoHideChatBox),v(e.autoCloseVrchat),b(e.autoSafeMode),S(e.autoSafeAvatar),ee(e.safeAvatarId??``),te(e.skipCloseInVr),ne(e.autoRejectFriendRequests),re(e.threatThreshold),ae(e.whitelist??[]),de(e.language??Gm),O(fs(e.theme)),_e(e.startHidden),ye(e.oscPort||9e3)};(0,_.useEffect)(()=>{ps().then(e=>{Ze(e),qe(0),Je()},()=>Ue(t(`could_not_read_the_settings`)))},[]),(0,_.useEffect)(()=>{fe().then(e=>he(e.available),()=>he([]))},[]),(0,_.useEffect)(()=>{Zr().then(we,()=>we(null))},[]),(0,_.useEffect)(()=>{ni().then(De,()=>void 0)},[]),(0,_.useEffect)(()=>{let e=si(e=>{je(t=>t&&{...t,phase:e.phase,downloaded:e.downloaded,total:e.total,percent:e.percent,error:e.error??(e.phase===`error`?t.error:void 0)})}),t=ci(e=>{je(t=>t&&{...t,changelog:e.text})});return()=>{e(),t()}},[]),(0,_.useEffect)(()=>{let e=qm.map(e=>document.getElementById(e.id));if(e.some(e=>e===null))return;let t=new IntersectionObserver(e=>{let t=e.filter(e=>e.isIntersecting).sort((e,t)=>e.boundingClientRect.top-t.boundingClientRect.top)[0];t&&Fe(t.target.id)},{rootMargin:`-8% 0px -70% 0px`});return e.forEach(e=>t.observe(e)),()=>t.disconnect()},[]);let Qe=e=>{Fe(e),document.getElementById(e)?.scrollIntoView({behavior:`smooth`,block:`start`})},$e=n.trim(),et=(e={})=>({logDirectory:$e,avatarApiProviders:o.map(e=>e.trim()).filter(e=>e.length>0),autoBlock:u,autoDisableAvatarInteraction:f,autoHideChatBox:m,autoCloseVrchat:g,autoSafeMode:y,autoSafeAvatar:x,safeAvatarId:C.trim(),skipCloseInVr:w,autoRejectFriendRequests:T,threatThreshold:E,whitelist:ie,language:ue,theme:pe,startHidden:ge,oscPort:ve,...e}),P=async(e={},t=!1)=>{Ue(null);try{let n=await ms(et(e));ae(n.whitelist??[]),ee(n.safeAvatarId??``),t&&qe(0)}catch(e){Ue(e instanceof Error?e.message:String(e))}},tt=e=>{de(e),P({language:e})},nt=e=>{O(e),P({theme:e})},rt=async e=>{Te(!0),Ue(null);try{we(await Qr(e))}catch(e){Ue(e instanceof Error?e.message:String(e))}finally{Te(!1)}},it=async()=>{Le(!0),Ue(null);try{Ze(await hs()),qe(0),Je(),Ve(!0),window.setTimeout(()=>Ve(!1),5e3)}catch(e){Ue(e instanceof Error?e.message:String(e))}finally{Le(!1)}};(0,_.useEffect)(()=>{Ae?.phase!==`ready`||Ge.current||(Ge.current=!0,ut())},[Ae?.phase]);let at=async()=>{Ue(null);try{await wc()}catch(e){Ue(e instanceof Error?e.message:String(e))}},ot=async()=>{Ue(null);try{await ei()}catch(e){Ue(e instanceof Error?e.message:String(e))}},st=async()=>{ke(!0),De(null),Ue(null);try{De(await ri())}catch(e){Ue(e instanceof Error?e.message:String(e))}finally{ke(!1)}},ct=async()=>{Ue(null);try{await ti(vs)}catch(e){Ue(e instanceof Error?e.message:String(e))}},lt=async()=>{Ue(null),Ge.current=!1,je({phase:`changelog`,changelog:``,downloaded:0,total:0,percent:0});try{let e=await ii();e.ok||je(t=>t&&{...t,phase:`error`,error:e.error??``})}catch(e){je(t=>t&&{...t,phase:`error`,error:e instanceof Error?e.message:String(e)})}},F=async()=>{je(null);try{await ai()}catch(e){Ue(e instanceof Error?e.message:String(e))}},ut=async()=>{je(e=>e&&{...e,phase:`installing`});try{let e=await oi();e.ok||je(t=>t&&{...t,phase:`error`,error:e.error??``})}catch(e){je(t=>t&&{...t,phase:`error`,error:e instanceof Error?e.message:String(e)})}},I=e=>{re(e),window.clearTimeout(We.current),We.current=window.setTimeout(()=>void P({threatThreshold:e}),400)},dt=()=>{let e=c.trim();if(e.length===0||o.includes(e))return;let t=[...o,e];s(t),l(``),P({avatarApiProviders:t})},ft=e=>{let t=o.filter((t,n)=>n!==e);s(t),P({avatarApiProviders:t})},pt=()=>{let e=oe.trim();if(e.length===0||ie.includes(e))return;let t=[...ie,e];ae(t),se(``),P({whitelist:t},!0)},mt=e=>{let t=ie.filter(t=>t!==e);ae(t),P({whitelist:t},!0)};return(0,D.jsxs)($m,{children:[(0,D.jsxs)(nh,{children:[(0,D.jsxs)(rh,{id:`settings-language`,children:[(0,D.jsx)(ih,{children:(0,D.jsx)(`h2`,{children:t(`language`)})}),(0,D.jsx)(ah,{children:(0,D.jsxs)(oh,{children:[(0,D.jsx)(dh,{children:t(`language`)}),(0,D.jsx)(Lm,{onChange:e=>void tt(e),options:[{value:Gm,label:t(`system_default`)},...me.map(e=>({value:e,label:Km[e]??e}))],value:ue}),(0,D.jsx)(hh,{children:t(`language_used_by_both_the_interface_and_the_desktop_backend`)})]})})]}),(0,D.jsxs)(rh,{id:`settings-appearance`,children:[(0,D.jsx)(ih,{children:(0,D.jsx)(`h2`,{children:t(`appearance`)})}),(0,D.jsx)(ah,{children:(0,D.jsxs)(oh,{children:[(0,D.jsx)(dh,{children:t(`theme`)}),(0,D.jsx)(Lm,{onChange:e=>nt(e),options:[{value:`system`,label:t(`follow_the_system`)},{value:`light`,label:t(`light`)},{value:`dark`,label:t(`dark`)}],value:pe}),(0,D.jsx)(hh,{children:t(`applies_to_the_whole_interface`)})]})})]}),(0,D.jsxs)(rh,{id:`settings-startup`,children:[(0,D.jsx)(ih,{children:(0,D.jsx)(`h2`,{children:t(`start_with_the_system`)})}),(0,D.jsx)(ah,{children:(0,D.jsxs)(Ph,{children:[(0,D.jsx)(qc,{checked:Ce?.enabled??!1,disabled:N||!Ce?.supported,hint:t(`create_an_autostart_entry_for_this_user`),onChange:e=>void rt(e),title:t(`start_with_the_system`)}),(0,D.jsx)(qc,{checked:ge,hint:t(`open_in_the_tray_instead_of_showing_the_window`),onChange:e=>{_e(e),P({startHidden:e})},title:t(`start_hidden`)})]})})]}),(0,D.jsxs)(rh,{id:`settings-log-source`,children:[(0,D.jsx)(ih,{children:(0,D.jsx)(`h2`,{children:t(`log_source`)})}),(0,D.jsxs)(ah,{children:[(0,D.jsxs)(oh,{children:[(0,D.jsx)(dh,{children:t(`vr_chat_log_folder`)}),(0,D.jsx)(sh,{children:(0,D.jsx)(uh,{"aria-label":t(`vr_chat_log_folder`),onBlur:()=>void P(),onChange:e=>r(e.target.value),placeholder:t(`vr_chat_s_log_folder`),spellCheck:!1,value:n})}),(0,D.jsx)(hh,{children:t(`the_newest_log_in_this_folder_is_followed_while_vr_chat_is_running_nothing_is_read_while_it_is_closed`)})]}),(0,D.jsxs)(gh,{children:[(0,D.jsxs)(_h,{disabled:!gc,onClick:at,type:`button`,children:[(0,D.jsx)(Ts,{}),t(`open_folder`)]}),(0,D.jsx)(_h,{disabled:!i||$e===i,onClick:()=>{r(i),P({logDirectory:i})},type:`button`,children:t(`use_vr_chat_s_folder`)})]})]})]}),(0,D.jsxs)(rh,{id:`settings-avatar-lookups`,children:[(0,D.jsx)(ih,{children:(0,D.jsx)(`h2`,{children:t(`avatar_name_lookups`)})}),(0,D.jsx)(ah,{children:(0,D.jsxs)(oh,{children:[(0,D.jsx)(dh,{children:t(`api_endpoints`)}),(0,D.jsxs)(hh,{children:[t(`tried_in_order_the_first_name_wins_each_is_called_as`),(0,D.jsx)(`code`,{children:` ?fileId=file_…`}),` `,t(`and_must_answer_with_json_containing_a`),(0,D.jsx)(`code`,{children:` name`}),`.`]}),(0,D.jsxs)(ch,{children:[o.length===0&&(0,D.jsx)(lh,{children:t(`no_endpoint_avatar_names_stay_unknown`)}),o.map((e,n)=>(0,D.jsxs)(sh,{children:[(0,D.jsx)(uh,{"aria-label":t(`avatar_api_endpoint`),onBlur:()=>void P(),onChange:e=>{let t=[...o];t[n]=e.target.value,s(t)},spellCheck:!1,value:e}),(0,D.jsx)(_h,{"aria-label":t(`remove_endpoint`),onClick:()=>ft(n),type:`button`,children:(0,D.jsx)(ws,{})})]},`${e}-${n}`))]}),(0,D.jsxs)(sh,{children:[(0,D.jsx)(uh,{"aria-label":t(`new_avatar_api_endpoint`),onChange:e=>l(e.target.value),placeholder:`https://example.com/avatars`,spellCheck:!1,value:c}),(0,D.jsx)(_h,{disabled:c.trim().length===0,onClick:dt,type:`button`,children:t(`add`)})]})]})})]}),(0,D.jsxs)(rh,{id:`settings-osc`,children:[(0,D.jsx)(ih,{children:(0,D.jsx)(`h2`,{children:t(`osc`)})}),(0,D.jsxs)(ah,{children:[(0,D.jsxs)(oh,{children:[(0,D.jsx)(dh,{children:t(`osc_port`)}),(0,D.jsx)(sh,{children:(0,D.jsx)(uh,{"aria-label":t(`osc_port`),max:65535,min:1,onChange:e=>Xe(Number(e.target.value)||9e3),type:`number`,value:ve})}),(0,D.jsx)(hh,{children:t(`vr_chat_listens_on_9000_unless_it_was_started_with_a_custom_osc_port`)})]}),(0,D.jsxs)(oh,{children:[(0,D.jsxs)(sh,{children:[(0,D.jsx)(_h,{disabled:M,onClick:()=>void Ye(),type:`button`,children:t(M?`testing`:`test_connection`)}),(0,D.jsx)(hh,{children:t(`opens_vr_chat_s_quick_menu_when_osc_is_working`)})]}),(0,D.jsx)(hh,{children:be?.listening?be.detected>0&&be.detected!==ve?t(`vr_chat_reports_port_detected_anti_bot_sends_to_port`,{detected:be.detected,port:ve}):t(`vr_chat_is_advertising_osc_on_port_port`,{port:ve}):t(`vr_chat_is_not_advertising_osc_enable_it_in_the_action_menu`)}),j&&(0,D.jsx)(hh,{children:j})]})]})]}),(0,D.jsxs)(rh,{id:`settings-protection`,children:[(0,D.jsx)(ih,{children:(0,D.jsx)(`h2`,{children:t(`automatic_protection`)})}),(0,D.jsxs)(ah,{children:[(0,D.jsxs)(oh,{children:[(0,D.jsx)(dh,{children:t(`threat_threshold`)}),(0,D.jsx)(sh,{children:(0,D.jsx)(Nh,{min:0,onChange:e=>I(Number(e.target.value)),step:10,type:`number`,value:E})}),(0,D.jsx)(hh,{children:t(`any_user_at_or_above_this_score_is_acted_on_the_score_is_a_guess_and_can_be_wrong_friends_and_whitelisted_users_are_never_acted_on`)})]}),(0,D.jsxs)(Ph,{children:[(0,D.jsx)(qc,{checked:u,hint:t(`block_the_user_vr_chat_may_then_refuse_to_send_them_your_avatar_if_it_checks_blocks_on_the_server_it_may_also_have_no_effect`),onChange:e=>{d(e),P({autoBlock:e})},title:t(`block_the_user`)}),(0,D.jsx)(qc,{checked:f,hint:t(`turn_the_user_s_avatar_interactions_off_so_their_avatar_cannot_trigger_anything_on_yours`),onChange:e=>{p(e),P({autoDisableAvatarInteraction:e})},title:t(`disable_avatar_interactions`)}),(0,D.jsx)(qc,{checked:m,hint:t(`hide_the_user_s_chat_box_so_they_cannot_flood_or_harass_through_it`),onChange:e=>{h(e),P({autoHideChatBox:e})},title:t(`hide_the_chat_box`)}),(0,D.jsx)(qc,{checked:y,hint:t(`turn_on_vr_chat_s_safe_mode_over_osc_when_a_user_reaches_the_threshold_so_every_non_friend_avatar_is_replaced_at_once_it_needs_osc_enabled_in_vr_chat_and_stays_on_until_you_turn_it_off`),onChange:e=>{b(e),P({autoSafeMode:e})},requires:t(`requires_osc`),title:t(`safe_mode_osc`)}),(0,D.jsx)(qc,{checked:x,hint:t(`switch_to_another_avatar_over_osc_when_a_user_reaches_the_threshold_it_is_not_switched_back`),onChange:e=>{S(e),P({autoSafeAvatar:e})},requires:t(`requires_osc`),title:t(`switch_avatar_osc`)}),(0,D.jsxs)(Fh,{children:[(0,D.jsx)(dh,{children:t(`safe_avatar_id`)}),(0,D.jsx)(Qm,{disabled:!x,onBlur:()=>void P(),onChange:ee,placeholder:`avtr_… or https://vrchat.com/home/avatar/avtr_…`,value:C}),(0,D.jsx)(hh,{children:t(`only_avatars_in_your_favourites_your_recents_or_your_own_uploads_can_be_used_paste_the_avatar_s_link_or_its_id_avtr`)})]}),(0,D.jsx)(qc,{checked:g,hint:t(`close_vr_chat_so_the_client_has_as_little_chance_as_possible_to_download_and_cache_their_avatar`)+` `+t(`when_vr_chat_really_quits_the_osc_actions_are_skipped_because_there_is_nothing_left_to_protect`),onChange:e=>{v(e),P({autoCloseVrchat:e})},title:t(`close_vr_chat`)}),(0,D.jsx)(qc,{checked:w,disabled:!g,hint:t(`do_not_close_vr_chat_while_a_vr_headset_is_in_use_quitting_from_vr_is_disruptive`),onChange:e=>{te(e),P({skipCloseInVr:e})},title:t(`skip_while_in_vr`)}),(0,D.jsx)(qc,{checked:T,hint:t(`reject_friend_requests_from_any_user_at_or_above_the_threshold_vr_chat_s_notification_is_hidden_and_only_the_block_avatar_interaction_and_chat_box_actions_are_applied_to_the_sender_the_request_stays_in_anti_bot_s_list_as_rejected_where_it_can_be_undone`),onChange:e=>{ne(e),P({autoRejectFriendRequests:e})},title:t(`reject_friend_requests`)})]})]})]}),(0,D.jsxs)(rh,{id:`settings-whitelist`,children:[(0,D.jsx)(ih,{children:(0,D.jsx)(`h2`,{children:t(`whitelist`)})}),(0,D.jsxs)(ah,{children:[(0,D.jsxs)(oh,{children:[(0,D.jsx)(dh,{children:t(`add_a_user`)}),(0,D.jsxs)(sh,{children:[(0,D.jsx)(uh,{"aria-label":t(`whitelisted_user_id`),onChange:e=>se(e.target.value),placeholder:`usr_… or https://vrchat.com/home/user/usr_…`,spellCheck:!1,value:oe}),(0,D.jsx)(_h,{disabled:oe.trim().length===0,onClick:pt,type:`button`,children:t(`add`)})]}),(0,D.jsx)(hh,{children:t(`paste_a_vr_chat_user_id_or_profile_link_whitelisted_users_get_a_white_row_and_no_automatic_action`)})]}),(0,D.jsxs)(Ih,{children:[ie.length===0&&(0,D.jsx)(lh,{children:t(`nobody_is_whitelisted`)}),ie.map(e=>{let n=ce.find(t=>t.userId===e);return(0,D.jsxs)(Lh,{children:[(0,D.jsx)(Rh,{$src:n?.iconUrl??n?.avatarUrl}),(0,D.jsxs)(zh,{children:[(0,D.jsx)(`strong`,{children:n?.name??e}),(0,D.jsx)(`span`,{children:n?.trust??e})]}),(0,D.jsx)(_h,{"aria-label":t(`remove_from_whitelist`),onClick:()=>mt(e),type:`button`,children:(0,D.jsx)(ws,{})})]},e)})]})]})]}),He&&(0,D.jsx)(vh,{children:He}),(0,D.jsxs)(rh,{id:`settings-build`,children:[(0,D.jsx)(ih,{children:(0,D.jsx)(`h2`,{children:t(`build`)})}),(0,D.jsxs)(ah,{children:[(0,D.jsxs)(oh,{children:[(0,D.jsx)(dh,{children:t(`version`)}),(0,D.jsx)(mh,{$mono:!0,children:e?`v${e.version} · ${e.platform}`:t(`browser_preview`)}),(0,D.jsx)(hh,{children:t(`read_from_the_executable_the_interface_is_running_in`)})]}),(0,D.jsxs)(gh,{children:[(0,D.jsxs)(_h,{disabled:Oe,onClick:()=>void st(),type:`button`,children:[(0,D.jsx)(zs,{}),t(Oe?`checking`:`check_for_updates`)]}),Ee?.available&&(0,D.jsxs)(_h,{onClick:()=>void ct(),type:`button`,children:[(0,D.jsx)(Fs,{size:16}),t(`open_release_page`)]}),Ee?.available&&e?.platform===`windows`&&(0,D.jsxs)(_h,{onClick:()=>void lt(),type:`button`,children:[(0,D.jsx)(Os,{}),t(`download_and_install`)]}),(0,D.jsxs)(_h,{onClick:()=>void ot(),type:`button`,children:[(0,D.jsx)(Ts,{}),t(`open_log_folder`)]})]}),Ee&&(Ee.available?(0,D.jsx)(yh,{children:t(`version_version_is_available`,{version:Ee.latest})}):(0,D.jsx)(hh,{children:t(`up_to_date_version_is_the_newest_version`,{version:Ee.current})})),e?.logDirectory&&(0,D.jsxs)(oh,{children:[(0,D.jsx)(dh,{children:t(`log_files_are_written_to`)}),(0,D.jsx)(mh,{$mono:!0,children:e.logDirectory})]})]})]}),(0,D.jsxs)(kh,{children:[(0,D.jsxs)(Ah,{$confirming:Re,disabled:Ie,onBlur:()=>ze(!1),onClick:()=>{Re?(ze(!1),it()):ze(!0)},type:`button`,children:[(0,D.jsx)(ws,{size:14}),t(Re?`confirm_reset_every_setting`:`reset_to_defaults`)]}),Be&&(0,D.jsx)(jh,{children:t(`settings_restored_to_their_defaults`)})]}),(0,D.jsx)(Mh,{onClick:()=>Ne(!0),type:`button`,children:t(`open_source_attribution`)}),(0,D.jsx)(_.Suspense,{fallback:null,children:Me&&(0,D.jsx)(Wm,{onClose:()=>Ne(!1)})})]}),(0,D.jsx)(eh,{children:qm.map(e=>(0,D.jsx)(th,{$active:Pe===e.id,onClick:()=>Qe(e.id),type:`button`,children:t(e.label)},e.id))}),Ae&&(0,D.jsx)(bh,{children:(0,D.jsxs)(xh,{"aria-modal":`true`,role:`dialog`,children:[(0,D.jsxs)(Sh,{children:[(0,D.jsx)(Os,{size:20}),(0,D.jsxs)(`div`,{children:[(0,D.jsx)(`h2`,{children:t(`updating_anti_bot`)}),(0,D.jsx)(`p`,{children:Ee?.latest?t(`version_version`,{version:Ee.latest}):t(`preparing_the_update`)})]})]}),(0,D.jsx)(Ch,{children:t(`changelog`)}),(0,D.jsx)(wh,{children:Ae.changelog?(0,D.jsx)(Yr,{source:Ae.changelog}):Ae.phase===`changelog`?t(`loading_the_changelog`):t(`the_changelog_could_not_be_loaded`)}),(0,D.jsxs)(Th,{children:[(0,D.jsx)(`span`,{children:Ym(Ae.phase,t)}),(0,D.jsx)(`span`,{children:Xm(Ae)})]}),(0,D.jsx)(Eh,{children:(0,D.jsx)(Dh,{$percent:Math.max(0,Math.min(100,Ae.percent))})}),Ae.error&&(0,D.jsx)(vh,{children:Ae.error}),(0,D.jsxs)(Oh,{children:[(Ae.phase===`changelog`||Ae.phase===`downloading`)&&(0,D.jsx)(_h,{onClick:()=>void F(),type:`button`,children:t(`cancel`)}),Ae.phase===`installing`&&(0,D.jsx)(_h,{disabled:!0,type:`button`,children:t(`installing`)}),(Ae.phase===`error`||Ae.phase===`cancelled`)&&(0,D.jsx)(_h,{onClick:()=>je(null),type:`button`,children:t(`close`)})]})]})})]})}function Ym(e,t){switch(e){case`changelog`:return t(`preparing_the_update`);case`downloading`:return t(`downloading_the_update`);case`ready`:return t(`download_complete`);case`cancelled`:return t(`update_cancelled`);case`error`:return t(`the_update_failed`);case`installing`:return t(`installing`);default:return``}}function Xm(e){return e.total>0?`${Zm(e.downloaded)} / ${Zm(e.total)}`:e.downloaded>0?Zm(e.downloaded):``}function Zm(e){if(e<=0)return`0 B`;let t=[`B`,`KB`,`MB`,`GB`];for(var n=e,r=0;n>=1024&&r<t.length-1;)n/=1024,r++;return`${n.toFixed(r===0||n>=10?0:1)} ${t[r]}`}function Qm({value:e,onChange:t,onBlur:n,placeholder:r,disabled:i}){let a=k(),[o,s]=(0,_.useState)(!1);return(0,D.jsxs)(fh,{children:[(0,D.jsx)(uh,{disabled:i,onBlur:n,onChange:e=>t(e.target.value),placeholder:r,spellCheck:!1,type:o?`text`:`password`,value:e}),(0,D.jsx)(ph,{"aria-label":a(o?`hide_the_avatar_id`:`show_the_avatar_id`),onClick:()=>s(e=>!e),type:`button`,children:o?(0,D.jsx)(Ns,{size:14}):(0,D.jsx)(Ms,{size:14})})]})}var $m=G.div`
    display: flex;
    align-items: flex-start;
    gap: 20px;
    max-width: 960px;
`,eh=G.nav`
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
`,th=G.button`
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
`,nh=G.div`
    display: flex;
    flex-direction: column;
    gap: 18px;
    max-width: 760px;
    min-width: 0;
`,rh=G.section`
    display: flex;
    flex-direction: column;
    gap: 10px;
    scroll-margin-top: 24px;
`,ih=G.div`
    h2 {
        font-size: 13px;
        font-weight: 600;
    }
`,ah=G.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    padding: 18px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-md);
    background: var(--bg-card);
`,oh=G.div`
    display: flex;
    flex-direction: column;
    gap: 5px;
`,sh=G.div`
    display: flex;
    align-items: center;
    gap: 8px;
`,ch=G.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`,lh=G.span`
    font-size: 11px;
    color: var(--text-muted);
`,uh=G.input`
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
`,dh=G.span`
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
`,fh=G.div`
    position: relative;
    display: flex;

    input {
        width: 100%;
        padding-right: 34px;
    }
`,ph=G.button`
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
`,mh=G.span`
    font-family: ${({$mono:e})=>e?`var(--font-mono)`:`var(--font-sans)`};
    font-size: 12px;
    color: var(--text-primary);
    overflow-wrap: anywhere;
`,hh=G.span`
    font-size: 10px;
    line-height: 1.5;
    color: var(--text-muted);

    code {
        font-family: var(--font-mono);
    }
`,gh=G.div`
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
`,_h=G.button`
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
`,vh=G.span`
    color: var(--danger);
    font-size: 11px;
`,yh=G.span`
    font-size: 11px;
    color: var(--accent-primary);
`,bh=G.div`
    position: fixed;
    inset: 0;
    z-index: 200;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 24px;
    background: rgba(4, 3, 10, 0.72);
    backdrop-filter: blur(6px);
`,xh=G.div`
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
`,Sh=G.div`
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
`,Ch=G.span`
    font-size: 9px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
`,wh=G.div`
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
`,Th=G.div`
    display: flex;
    justify-content: space-between;
    gap: 12px;
    font-family: var(--font-mono);
    font-size: 10.5px;
    color: var(--text-secondary);
`,Eh=G.div`
    height: 8px;
    overflow: hidden;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.06);
`,Dh=G.div`
    width: ${({$percent:e})=>`${e}%`};
    height: 100%;
    border-radius: inherit;
    background: linear-gradient(90deg, rgba(167, 139, 250, 0.7), var(--accent-primary));
    transition: width 180ms ease;
`,Oh=G.div`
    display: flex;
    justify-content: flex-end;
    gap: 8px;
`,kh=G.div`
    display: flex;
    align-items: center;
    gap: 10px;
`,Ah=G.button`
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
`,jh=G.span`
    color: #4ade80;
    font-size: 10.5px;
`,Mh=G.button`
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
`,Nh=G.input`
    width: 120px;
    padding: 7px 10px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: var(--bg-input);
    color: var(--text-primary);
    font-family: var(--font-mono);
    font-size: 12px;
`,Ph=G.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`,Fh=G.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
    padding-left: 24px;
`,Ih=G.div`
    display: flex;
    flex-direction: column;
    gap: 6px;
`,Lh=G.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 6px 8px;
    border: 1px solid var(--border-color);
    border-radius: var(--radius-sm);
    background: rgba(255, 255, 255, 0.05);
`,Rh=G.span`
    width: 30px;
    height: 30px;
    flex-shrink: 0;
    border-radius: 50%;
    background: var(--bg-primary) center / cover no-repeat;
    background-image: ${({$src:e})=>e?`url("${e}")`:`none`};
    box-shadow: inset 0 0 0 1px var(--border-color);
`,zh=G.div`
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
`,Bh=us`
    from {
        opacity: 0;
        transform: translateY(8px) scale(0.995);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
`,Vh={logs:{title:`vr_chat_log`,subtitle:`live_output_of_vr_chat_s_log_while_it_is_running`},instance:{title:`instance`,subtitle:`players_in_your_vr_chat_instance_from_the_api_once_signed_in`},batch:{title:`batch_actions`,subtitle:`apply_the_moderation_actions_enabled_under_automatic_protection_to_a_list_of_vr_chat_users`},requests:{title:`friend_requests`,subtitle:`every_incoming_request_anti_bot_has_recorded_with_the_sender_s_profile`},operations:{title:`operations`,subtitle:`the_automatic_actions_anti_bot_has_taken_newest_first`},account:{title:`account`,subtitle:`sign_in_to_vr_chat_so_the_instance_comes_from_the_api_not_the_log`},settings:{title:`settings`,subtitle:`where_the_log_comes_from_and_what_anti_bot_does_with_it`},debug:{title:`debug`,subtitle:`tools_that_only_a_debug_build_shows`}};function Hh(){let e=k(),[t,n]=(0,_.useState)(`logs`),[r,i]=(0,_.useState)(null),[a,o]=(0,_.useState)(null),[s,c]=(0,_.useState)(!1),[l,u]=(0,_.useState)(null),[d,f]=(0,_.useState)(`system`),p=ye(),m=Oc(),{auth:h,ready:g}=Kc(),v=h.state===`loggedIn`;Se(d),(0,_.useEffect)(()=>{v&&c(!1)},[v]),(0,_.useEffect)(()=>{Xr().then(i,()=>i(null))},[]),(0,_.useEffect)(()=>(ps().then(e=>f(fs(e.theme)),()=>void 0),E.on(e=>{e.type===`settings.changed`&&f(fs(e.data?.theme))})),[]),(0,_.useEffect)(()=>{ni().then(o,()=>void 0)},[]),(0,_.useEffect)(()=>{if(t!==`settings`||!l)return;let e=window.requestAnimationFrame(()=>{document.getElementById(l)?.scrollIntoView({behavior:`smooth`,block:`start`}),u(null)});return()=>window.cancelAnimationFrame(e)},[t,l]),(0,_.useEffect)(()=>{let e=window.setTimeout(()=>E.send({type:`app.ready`}),200);return()=>window.clearTimeout(e)},[]),(0,_.useEffect)(()=>E.on(e=>{if(e.type===`auth.expired`){c(!0),n(`account`);return}if(e.type===`app.update`||e.type===`update.checked`){o(e.data??null);return}if(e.type!==`app.navigate`)return;let t=e.data?.page;t&&n(t)}),[]);let{title:y,subtitle:b}=Vh[t];return(0,D.jsxs)(Uh,{$rounded:p,children:[(0,D.jsx)(Qs,{}),(0,D.jsxs)(Wh,{children:[(0,D.jsx)(Us,{debug:r?.debug??!1,onNavigate:n,page:t,status:m.status}),(0,D.jsxs)(Gh,{children:[(0,D.jsxs)(Kh,{children:[(0,D.jsxs)(qh,{children:[(0,D.jsx)(`h1`,{children:e(y)}),(0,D.jsx)(`p`,{children:e(b)})]},t),(0,D.jsx)(Jh,{children:!v&&(0,D.jsx)(Yh,{onClick:()=>n(`account`),type:`button`,children:e(s?`session_expired_automatic_protection_is_off`:`not_signed_in_only_the_log_is_available`)})})]}),(0,D.jsx)(Xh,{$flush:t!==`settings`,children:t===`logs`?(0,D.jsx)(ap,{log:m}):t===`instance`?(0,D.jsx)(Vu,{signedIn:v,onSignIn:()=>n(`account`)}):t===`batch`?(0,D.jsx)(sf,{signedIn:v,onSignIn:()=>n(`account`)}):t===`requests`?(0,D.jsx)(lm,{signedIn:v,onSignIn:()=>n(`account`)}):t===`operations`?(0,D.jsx)(Fp,{}):t===`account`?(0,D.jsx)(Qc,{initial:h,ready:g,expired:s}):t===`debug`?(0,D.jsx)(If,{}):(0,D.jsx)(Jm,{info:r})},t),(0,D.jsx)(Zh,{children:(0,D.jsxs)(Qh,{children:[(0,D.jsx)($h,{children:r?`v${r.version} · ${r.platform}`:e(`browser_preview`)}),r?.debug&&(0,D.jsx)(eg,{title:e(`debug`),children:e(`debug`)}),a?.available&&(0,D.jsx)(tg,{"aria-label":e(`version_version_is_available`,{version:a.latest}),onClick:()=>{n(`settings`),u(`settings-build`)},title:e(`version_version_is_available`,{version:a.latest}),type:`button`})]})})]})]}),(0,D.jsx)(A,{}),(0,D.jsx)(uc,{})]})}var Uh=G.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    overflow: hidden;
    background: var(--bg-primary);

    /* An undecorated window gets no frame from the compositor, so the corners are drawn here. */
    border-radius: ${({$rounded:e})=>e?`10px`:`0`};
    box-shadow: ${({$rounded:e})=>e?`inset 0 0 0 1px var(--border-color)`:`none`};
`,Wh=G.div`
    display: flex;
    flex: 1;
    min-height: 0;
    background: radial-gradient(1100px 620px at 18% -10%, rgba(139, 92, 246, 0.12), transparent 60%),
    radial-gradient(900px 500px at 110% 15%, rgba(99, 102, 241, 0.12), transparent 55%),
    var(--bg-primary);
`,Gh=G.main`
    display: flex;
    flex-direction: column;
    flex: 1;
    min-width: 0;
`,Kh=G.header`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 20px;
    padding: 22px 26px 16px;
    border-bottom: 1px solid var(--border-color);
`,qh=G.div`
    display: flex;
    flex-direction: column;
    gap: 3px;
    animation: ${Bh} 0.18s cubic-bezier(0.22, 1, 0.36, 1);

    h1 {
        font-size: 20px;
        font-weight: 600;
        letter-spacing: -0.02em;
    }

    p {
        font-size: 12px;
        color: var(--text-secondary);
    }
`,Jh=G.div`
    display: flex;
    align-items: center;
    gap: 8px;
    padding-top: 4px;
`,Yh=G.button`
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
    transition: background 140ms ease, border-color 140ms ease, transform 140ms ease;

    &:hover {
        background: rgba(251, 191, 36, 0.2);
        border-color: rgba(251, 191, 36, 0.7);
        transform: translateY(-1px);
    }

    &:active {
        transform: translateY(0);
    }
`,Xh=G.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    min-height: 0;
    padding: ${({$flush:e})=>e?`16px 26px 18px`:`22px 30px 30px`};
    overflow: ${({$flush:e})=>e?`hidden`:`auto`};
    animation: ${Bh} 0.18s cubic-bezier(0.22, 1, 0.36, 1);
`,Zh=G.footer`
    display: flex;
    justify-content: flex-end;
    gap: 16px;
    padding: 7px 26px;
    border-top: 1px solid var(--border-color);
    font-family: var(--font-mono);
    font-size: 10px;
    color: var(--text-muted);
`,Qh=G.span`
    display: inline-flex;
    align-items: center;
    gap: 7px;
    min-width: 0;
`,$h=G.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`,eg=G.span`
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
`,tg=G.button`
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
`;document.documentElement.dataset.theme=window.matchMedia(`(prefers-color-scheme: dark)`).matches?`dark`:`light`;var ng=document.getElementById(`root`);ng&&(0,v.createRoot)(ng).render((0,D.jsx)(_.StrictMode,{children:(0,D.jsx)(he,{children:(0,D.jsx)(Hh,{})})}));export{c as a,u as i,k as n,ue as r,G as t};