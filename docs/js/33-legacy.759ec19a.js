"use strict";(self["webpackChunkform_design_test"]=self["webpackChunkform_design_test"]||[]).push([[33],{6033:function(e,t,n){n.r(t);var c=n(8701),s=n.n(c),o=n(5082),a=(n(2100),n(6216)),i=(n(2222),n(1249),n(2325));function r(e,t){a.Z.confirm((0,o.Z)((0,o.Z)({},t.dialog),{},{message:"<p>".concat(t.dialog.message,'</p><p \n    style="margin-top:10px;color:#ac242e;font-size:').concat(i.Z.changeRem("12px"),'"\n    >温馨提示：若不能自动调起短信页面，请手动发送内容"').concat(e.content,'"到"').concat(e.addressee,'"</p>')})).then((function(){return i.Z.isQQInternalBrowser()||"iOS"===i.Z.checkDevice()&&i.Z.isUCBrowser()?window.location.href="sms:".concat(e.addressee):"iOS"===i.Z.checkDevice()?window.location.href="sms:".concat(e.addressee,"&body=").concat(e.content):window.location.href="sms:".concat(e.addressee,"?body=").concat(e.content)})).catch((function(){}))}function l(e,t){var n=["col1"===t.styleType?"col-12":"col-6"];return e("ul",{class:"flex flex-wrap"},[t.smslist.map((function(c,o){return e("li",{class:n,key:o},[e("div",{class:"flex flex-center",style:{padding:i.Z.changeRem(t.style.btnPadding)}},[t.isImgBtn?e("img",s()([{},{directives:[{name:"lazy",value:c.img}]},{attrs:{alt:"图片按钮",width:"100%"},on:{click:function(){return r(c,t)}}}])):e("button",{class:"wg-button",style:i.Z.formatStyle(t.style.btnStyle),on:{click:function(){return r(c,t)}}},[c.btnText])])])}))])}t["default"]={functional:!0,props:{item:{type:Object,required:!0}},render:function(e,t){var n=t.props.item;return e("div",{class:"wg-sms clearfix",style:n.style},[l(e,n)])}}}}]);