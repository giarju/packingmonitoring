(function(e){function t(t){for(var a,o,c=t[0],u=t[1],l=t[2],s=0,d=[];s<c.length;s++)o=c[s],Object.prototype.hasOwnProperty.call(r,o)&&r[o]&&d.push(r[o][0]),r[o]=0;for(a in u)Object.prototype.hasOwnProperty.call(u,a)&&(e[a]=u[a]);f&&f(t);while(d.length)d.shift()();return i.push.apply(i,l||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],a=!0,o=1;o<n.length;o++){var c=n[o];0!==r[c]&&(a=!1)}a&&(i.splice(t--,1),e=u(u.s=n[0]))}return e}var a={},o={app:0},r={app:0},i=[];function c(e){return u.p+"js/"+({about:"about"}[e]||e)+"."+{about:"8837d9d3","chunk-29590bba":"e8757097","chunk-2d0d6d35":"0116915b","chunk-2d2086b7":"7c6abb01","chunk-310fe6a0":"bef5aafe","chunk-aa6847d2":"760f18be","chunk-1e57c2b8":"c0a385c0","chunk-7ddb5a14":"71c1d7f0","chunk-fe0632fa":"1903899c"}[e]+".js"}function u(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,u),n.l=!0,n.exports}u.e=function(e){var t=[],n={"chunk-1e57c2b8":1};o[e]?t.push(o[e]):0!==o[e]&&n[e]&&t.push(o[e]=new Promise((function(t,n){for(var a="css/"+({about:"about"}[e]||e)+"."+{about:"31d6cfe0","chunk-29590bba":"31d6cfe0","chunk-2d0d6d35":"31d6cfe0","chunk-2d2086b7":"31d6cfe0","chunk-310fe6a0":"31d6cfe0","chunk-aa6847d2":"31d6cfe0","chunk-1e57c2b8":"8ef25785","chunk-7ddb5a14":"31d6cfe0","chunk-fe0632fa":"31d6cfe0"}[e]+".css",r=u.p+a,i=document.getElementsByTagName("link"),c=0;c<i.length;c++){var l=i[c],s=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(s===a||s===r))return t()}var d=document.getElementsByTagName("style");for(c=0;c<d.length;c++){l=d[c],s=l.getAttribute("data-href");if(s===a||s===r)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var a=t&&t.target&&t.target.src||r,i=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=a,delete o[e],f.parentNode.removeChild(f),n(i)},f.href=r;var b=document.getElementsByTagName("head")[0];b.appendChild(f)})).then((function(){o[e]=0})));var a=r[e];if(0!==a)if(a)t.push(a[2]);else{var i=new Promise((function(t,n){a=r[e]=[t,n]}));t.push(a[2]=i);var l,s=document.createElement("script");s.charset="utf-8",s.timeout=120,u.nc&&s.setAttribute("nonce",u.nc),s.src=c(e);var d=new Error;l=function(t){s.onerror=s.onload=null,clearTimeout(f);var n=r[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),o=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+a+": "+o+")",d.name="ChunkLoadError",d.type=a,d.request=o,n[1](d)}r[e]=void 0}};var f=setTimeout((function(){l({type:"timeout",target:s})}),12e4);s.onerror=s.onload=l,document.head.appendChild(s)}return Promise.all(t)},u.m=e,u.c=a,u.d=function(e,t,n){u.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},u.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},u.t=function(e,t){if(1&t&&(e=u(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(u.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)u.d(n,a,function(t){return e[t]}.bind(null,a));return n},u.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return u.d(t,"a",t),t},u.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},u.p="/",u.oe=function(e){throw console.error(e),e};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],s=l.push.bind(l);l.push=t,l=l.slice();for(var d=0;d<l.length;d++)t(l[d]);var f=s;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var a=n("2b0e"),o=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"header"}},[n("Header")],1),n("div",{attrs:{id:"navigation-bar"}},[e.loggedin?n("Navigation"):e._e()],1),n("div",{attrs:{id:"route-view"}},[n("router-view")],1)])},r=[],i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("b-navbar",{attrs:{toggleable:"",type:"dark",variant:"dark",fixed:"bottom"}},[n("b-collapse",{staticClass:"collapse",attrs:{id:"nav-collapse","is-nav":""}},[n("b-navbar-nav",{staticClass:"container align-items-center"},["1"===e.job||"0"===e.job?n("b-nav-item",{attrs:{to:"/register"}},[e._v("Daftar")]):e._e(),"0"===e.job?n("b-nav-item",{attrs:{to:"/login"}},[e._v("Login")]):e._e(),"1"===e.job||"0"===e.job?n("b-nav-item",{attrs:{to:"/listpo"}},[e._v("List PO")]):e._e(),"2"===e.job||"0"===e.job?n("b-nav-item",{attrs:{to:"/checklist"}},[e._v("Checklist")]):e._e(),"3"===e.job||"0"===e.job?n("b-nav-item",{attrs:{to:"/weighing"}},[e._v("Timbang")]):e._e(),"1"===e.job||"0"===e.job?n("b-nav-item",{attrs:{to:"/setting"}},[e._v("Setting")]):e._e()],1)],1),n("b-collapse",{staticClass:"collapse",attrs:{id:"user-collapse","is-nav":""}},[n("b-navbar-nav",{staticClass:"container align-items-left"},[n("b-nav-item",{on:{click:e.logout_click}},[e._v("Logout")])],1)],1),n("b-navbar-toggle",{staticClass:"mx-4",attrs:{target:"user-collapse"}},[[n("b-icon",{attrs:{icon:"person-fill"}})]],2),n("b-navbar-toggle",{staticClass:"mx-4",attrs:{target:"nav-collapse"}})],1)},c=[],u={name:"navigation",props:{},data:function(){return{job:localStorage.getItem("job")}},methods:{logout_click:function(){localStorage.removeItem("jwt"),localStorage.removeItem("job"),localStorage.removeItem("base"),this.$root.$emit("check_login",!1),this.$router.push("/login")}}},l=u,s=n("2877"),d=Object(s["a"])(l,i,c,!1,null,null,null),f=d.exports,b=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("b-navbar",{attrs:{type:"light",variant:"light",fixed:"top"}},[n("b-navbar-brand",{staticClass:"container",attrs:{type:"dark"}},[e._v("CPI")])],1)},h=[],g={name:"Header",props:{}},m=g,p=Object(s["a"])(m,b,h,!1,null,null,null),v=p.exports,k={name:"app",components:{Navigation:f,Header:v},data:function(){return{loggedin:null!=localStorage.getItem("jwt")}},mounted:function(){var e=this;this.$root.$on("check_login",(function(t){e.loggedin=t}))}},_=k,j=(n("5c0b"),Object(s["a"])(_,o,r,!1,null,null,null)),w=j.exports,y=n("9483");Object(y["a"])("".concat("/","service-worker.js"),{ready:function(){console.log("App is being served from cache by a service worker.\nFor more details, visit https://goo.gl/AFskqB")},registered:function(){console.log("Service worker has been registered.")},cached:function(){console.log("Content has been cached for offline use.")},updatefound:function(){console.log("New content is downloading.")},updated:function(){console.log("New content is available; please refresh.")},offline:function(){console.log("No internet connection found. App is running in offline mode.")},error:function(e){console.error("Error during service worker registration:",e)}});n("d3b7"),n("3ca3"),n("ddb0");var S=n("8c4f");a["default"].use(S["a"]);var P=[{path:"/",name:"Home",component:function(){return Promise.all([n.e("chunk-29590bba"),n.e("chunk-2d2086b7")]).then(n.bind(null,"a55b"))},meta:{guest:!0}},{path:"/weighing",name:"Weighing",component:function(){return Promise.all([n.e("chunk-29590bba"),n.e("chunk-aa6847d2"),n.e("chunk-1e57c2b8")]).then(n.bind(null,"2ef7"))},meta:{requiresAuth:!0,is_weighing:!0}},{path:"/listpo",name:"Listpo",component:function(){return Promise.all([n.e("chunk-29590bba"),n.e("chunk-fe0632fa")]).then(n.bind(null,"b032"))},meta:{requiresAuth:!0,is_coordmain:!0}},{path:"/setting",name:"Setting",component:function(){return Promise.all([n.e("chunk-29590bba"),n.e("chunk-310fe6a0")]).then(n.bind(null,"4ef5"))},meta:{requiresAuth:!0,is_coordmain:!0}},{path:"/login",name:"Login",component:function(){return Promise.all([n.e("chunk-29590bba"),n.e("chunk-2d2086b7")]).then(n.bind(null,"a55b"))},meta:{guest:!0}},{path:"/register",name:"Register",component:function(){return Promise.all([n.e("chunk-29590bba"),n.e("chunk-2d0d6d35")]).then(n.bind(null,"73cf"))},meta:{is_register:!0,requiresAuth:!0}},{path:"/checklist",name:"Checklist",component:function(){return Promise.all([n.e("chunk-29590bba"),n.e("chunk-aa6847d2"),n.e("chunk-7ddb5a14")]).then(n.bind(null,"503b"))},meta:{requiresAuth:!0,is_checklist:!0}},{path:"/about",name:"About",component:function(){return n.e("about").then(n.bind(null,"f820"))},meta:{guest:!0}}],C=new S["a"]({mode:"history",base:"/",routes:P});C.beforeEach((function(e,t,n){if(e.matched.some((function(e){return e.meta.requiresAuth})))if(null==localStorage.getItem("jwt"))n({path:"/Login"});else{var a=localStorage.getItem("job"),o=localStorage.getItem("base");null==o?n({path:"/Login"}):e.matched.some((function(e){return e.meta.is_coordmain}))?"1"===a||"0"===a?n():n({path:o}):e.matched.some((function(e){return e.meta.is_checklist}))?"2"===a||"0"===a?n():n({path:o}):e.matched.some((function(e){return e.meta.is_weighing}))?"3"===a||"0"===a?n():n({path:o}):e.matched.some((function(e){return e.meta.is_register}))?"1"===a||"0"===a?n():n({path:o}):n({path:"/login"})}else if(null==localStorage.getItem("jwt"))n();else{var r=localStorage.getItem("base");n({path:r})}}));var O=C,A=n("5f5b"),x=n("b1e0"),E=(n("f9e3"),n("2dd8"),n("8e27")),I=n.n(E),L=n("5132"),N=n.n(L),q=n("bb6f"),T=n.n(q),$=I()({rejectUnauthorized:!1});a["default"].use(A["a"]),a["default"].use(x["a"]),a["default"].use(T.a),a["default"].use(new N.a({debug:!0,connection:$})),a["default"].config.productionTip=!1,new a["default"]({router:O,render:function(e){return e(w)}}).$mount("#app")},"5c0b":function(e,t,n){"use strict";n("9c0c")},"9c0c":function(e,t,n){}});
//# sourceMappingURL=app.a79fafc5.js.map