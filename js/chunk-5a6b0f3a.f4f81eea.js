(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5a6b0f3a"],{"9ed6":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"login-container"},[n("van-nav-bar",{attrs:{title:"登录 / 注册","left-arrow":""},on:{"click-left":function(t){return e.$router.back()}},scopedSlots:e._u([{key:"left",fn:function(){return[n("van-icon",{attrs:{name:"cross"}})]},proxy:!0}])}),n("van-form",{ref:"login-form",attrs:{"show-error-message":!1,"show-error":!1},on:{submit:e.onLogin,failed:e.onFailed}},[n("van-field",{attrs:{placeholder:"请输入手机号","left-icon":"phone-o",required:"",type:"number",center:"",name:"mobile",maxlength:"11",rules:e.formRules.mobile},model:{value:e.user.mobile,callback:function(t){e.$set(e.user,"mobile",t)},expression:"user.mobile"}}),n("van-field",{attrs:{center:"",clearable:"",type:"number","left-icon":"qr",required:"",maxlength:"6","show-error-message":"false",placeholder:"请输入短信验证码",name:"code",rules:e.formRules.code},scopedSlots:e._u([{key:"button",fn:function(){return[e.isCountDownShow?n("van-count-down",{attrs:{time:6e4,format:"ss s"},on:{finish:function(t){e.isCountDownShow=!1}}}):n("van-button",{attrs:{size:"mini",loading:e.isSendSmsLoding,type:"primary"},on:{click:function(t){return t.preventDefault(),e.onSendSms(t)}}},[e._v("发送验证码")])]},proxy:!0}]),model:{value:e.user.code,callback:function(t){e.$set(e.user,"code",t)},expression:"user.code"}}),n("div",{staticStyle:{margin:"16px"}},[n("van-button",{attrs:{round:"",block:"",type:"info",size:"small","native-type":"submit"}},[e._v("登录")])],1)],1)],1)},o=[],a=(n("b0c0"),n("96cf"),n("1da1")),s=n("c24f"),u={data:function(){return{user:{mobile:"13811111111",code:"246810"},isSendSmsLoding:!1,isCountDownShow:!1,formRules:{mobile:[{required:!0,message:"请输入手机号"},{pattern:/^1[3|5|7|8|9]\d{9}$/,message:"手机格式错误"}],code:[{required:!0,message:"请输入验证码"},{pattern:/^\d{6}$/,message:"验证码格式错误"}]}}},methods:{onLogin:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.$toast.loading({duration:0,forbidClick:!0,message:"登录中..."}),t.prev=1,t.next=4,Object(s["f"])(e.user);case 4:n=t.sent,r=n.data,console.log(r),e.$toast.success("登录成功！"),e.$store.commit("setUser",r.data),e.$router.push(e.$route.query.redirect||"/"),t.next=15;break;case 12:t.prev=12,t.t0=t["catch"](1),e.$toast.fail("登录失败！");case 15:case"end":return t.stop()}}),t,null,[[1,12]])})))()},onFailed:function(e){console.log(e),e.errors[0]&&this.$toast({message:e.errors[0].message})},onSendSms:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$refs["login-form"].validate("mobile");case 3:return e.isSendSmsLoding=!0,t.next=6,Object(s["g"])(e.user.mobile);case 6:e.isCountDownShow=!0,t.next=14;break;case 9:t.prev=9,t.t0=t["catch"](0),n="",n=t.t0&&t.t0.response&&429===t.t0.response.status?"发送太频繁了，请稍后重试":"mobile"===t.t0.name?t.t0.message:"发送失败，请稍后重试",e.$toast({message:n});case 14:e.isSendSmsLoding=!1;case 15:case"end":return t.stop()}}),t,null,[[0,9]])})))()}}},i=u,c=n("2877"),l=Object(c["a"])(i,r,o,!1,null,"48e04ab6",null);t["default"]=l.exports},b0c0:function(e,t,n){var r=n("83ab"),o=n("9bf2").f,a=Function.prototype,s=a.toString,u=/^\s*function ([^ (]*)/,i="name";r&&!(i in a)&&o(a,i,{configurable:!0,get:function(){try{return s.call(this).match(u)[1]}catch(e){return""}}})},c24f:function(e,t,n){"use strict";n.d(t,"f",(function(){return o})),n.d(t,"g",(function(){return a})),n.d(t,"c",(function(){return s})),n.d(t,"d",(function(){return u})),n.d(t,"a",(function(){return i})),n.d(t,"b",(function(){return c})),n.d(t,"e",(function(){return l})),n.d(t,"i",(function(){return d})),n.d(t,"h",(function(){return f}));var r=n("b775"),o=function(e){return Object(r["a"])({method:"post",url:"/app/v1_0/authorizations",data:e})},a=function(e){return Object(r["a"])({method:"GET",url:"/app/v1_0/sms/codes/".concat(e)})},s=function(){return Object(r["a"])({method:"GET",url:"/app/v1_0/user"})},u=function(){return Object(r["a"])({method:"GET",url:"/app/v1_0/user/channels"})},i=function(e){return Object(r["a"])({method:"POST",url:"/app/v1_0/user/followings",data:{target:e}})},c=function(e){return Object(r["a"])({method:"DELETE",url:"/app/v1_0/user/followings/".concat(e)})},l=function(){return Object(r["a"])({method:"GET",url:"/app/v1_0/user/profile"})},d=function(e){return Object(r["a"])({method:"PATCH",url:"/app/v1_0/user/profile",data:e})},f=function(e){return Object(r["a"])({method:"PATCH",url:"/app/v1_0/user/photo",data:e})}}}]);
//# sourceMappingURL=chunk-5a6b0f3a.f4f81eea.js.map