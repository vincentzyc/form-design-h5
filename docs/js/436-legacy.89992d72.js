"use strict";(self["webpackChunkform_design_test"]=self["webpackChunkform_design_test"]||[]).push([[436],{6436:function(t,i,e){e.r(i),e.d(i,{default:function(){return z}});e(1958),e(9653),e(9554),e(1539),e(4747),e(1249);var n=e(855);function s(t){var i=window.getComputedStyle(t),e="none"===i.display,n=null===t.offsetParent&&"fixed"!==i.position;return e||n}var o=e(5781),h=e(7799),r=e(4535),a=e(3969),c=e(9435),u=e(5590),l=(0,n.d)("swipe"),f=l[0],d=l[1],v=f({mixins:[a.D,(0,c.G)("vanSwipe"),(0,u.X)((function(t,i){t(window,"resize",this.resize,!0),t(window,"orientationchange",this.resize,!0),t(window,"visibilitychange",this.onVisibilityChange),i?this.initialize():this.clear()}))],props:{width:[Number,String],height:[Number,String],autoplay:[Number,String],vertical:Boolean,lazyRender:Boolean,indicatorColor:String,loop:{type:Boolean,default:!0},duration:{type:[Number,String],default:500},touchable:{type:Boolean,default:!0},initialSwipe:{type:[Number,String],default:0},showIndicators:{type:Boolean,default:!0},stopPropagation:{type:Boolean,default:!0}},data:function(){return{rect:null,offset:0,active:0,deltaX:0,deltaY:0,swiping:!1,computedWidth:0,computedHeight:0}},watch:{children:function(){this.initialize()},initialSwipe:function(){this.initialize()},autoplay:function(t){t>0?this.autoPlay():this.clear()}},computed:{count:function(){return this.children.length},maxCount:function(){return Math.ceil(Math.abs(this.minOffset)/this.size)},delta:function(){return this.vertical?this.deltaY:this.deltaX},size:function(){return this[this.vertical?"computedHeight":"computedWidth"]},trackSize:function(){return this.count*this.size},activeIndicator:function(){return(this.active+this.count)%this.count},isCorrectDirection:function(){var t=this.vertical?"vertical":"horizontal";return this.direction===t},trackStyle:function(){var t={transitionDuration:(this.swiping?0:this.duration)+"ms",transform:"translate"+(this.vertical?"Y":"X")+"("+this.offset+"px)"};if(this.size){var i=this.vertical?"height":"width",e=this.vertical?"width":"height";t[i]=this.trackSize+"px",t[e]=this[e]?this[e]+"px":""}return t},indicatorStyle:function(){return{backgroundColor:this.indicatorColor}},minOffset:function(){return(this.vertical?this.rect.height:this.rect.width)-this.size*this.count}},mounted:function(){this.bindTouchEvent(this.$refs.track)},methods:{initialize:function(t){if(void 0===t&&(t=+this.initialSwipe),this.$el&&!s(this.$el)){clearTimeout(this.timer);var i={width:this.$el.offsetWidth,height:this.$el.offsetHeight};this.rect=i,this.swiping=!0,this.active=t,this.computedWidth=+this.width||i.width,this.computedHeight=+this.height||i.height,this.offset=this.getTargetOffset(t),this.children.forEach((function(t){t.offset=0})),this.autoPlay()}},resize:function(){this.initialize(this.activeIndicator)},onVisibilityChange:function(){document.hidden?this.clear():this.autoPlay()},onTouchStart:function(t){this.touchable&&(this.clear(),this.touchStartTime=Date.now(),this.touchStart(t),this.correctPosition())},onTouchMove:function(t){this.touchable&&this.swiping&&(this.touchMove(t),this.isCorrectDirection&&((0,o.PF)(t,this.stopPropagation),this.move({offset:this.delta})))},onTouchEnd:function(){if(this.touchable&&this.swiping){var t=this.size,i=this.delta,e=Date.now()-this.touchStartTime,n=i/e,s=Math.abs(n)>.25||Math.abs(i)>t/2;if(s&&this.isCorrectDirection){var o=this.vertical?this.offsetY:this.offsetX,h=0;h=this.loop?o>0?i>0?-1:1:0:-Math[i>0?"ceil":"floor"](i/t),this.move({pace:h,emitChange:!0})}else i&&this.move({pace:0});this.swiping=!1,this.autoPlay()}},getTargetActive:function(t){var i=this.active,e=this.count,n=this.maxCount;return t?this.loop?(0,r.w6)(i+t,-1,e):(0,r.w6)(i+t,0,n):i},getTargetOffset:function(t,i){void 0===i&&(i=0);var e=t*this.size;this.loop||(e=Math.min(e,-this.minOffset));var n=i-e;return this.loop||(n=(0,r.w6)(n,this.minOffset,0)),n},move:function(t){var i=t.pace,e=void 0===i?0:i,n=t.offset,s=void 0===n?0:n,o=t.emitChange,h=this.loop,r=this.count,a=this.active,c=this.children,u=this.trackSize,l=this.minOffset;if(!(r<=1)){var f=this.getTargetActive(e),d=this.getTargetOffset(f,s);if(h){if(c[0]&&d!==l){var v=d<l;c[0].offset=v?u:0}if(c[r-1]&&0!==d){var p=d>0;c[r-1].offset=p?-u:0}}this.active=f,this.offset=d,o&&f!==a&&this.$emit("change",this.activeIndicator)}},prev:function(){var t=this;this.correctPosition(),this.resetTouchStatus(),(0,h.d1)((function(){t.swiping=!1,t.move({pace:-1,emitChange:!0})}))},next:function(){var t=this;this.correctPosition(),this.resetTouchStatus(),(0,h.d1)((function(){t.swiping=!1,t.move({pace:1,emitChange:!0})}))},swipeTo:function(t,i){var e=this;void 0===i&&(i={}),this.correctPosition(),this.resetTouchStatus(),(0,h.d1)((function(){var n;n=e.loop&&t===e.count?0===e.active?0:t:t%e.count,i.immediate?(0,h.d1)((function(){e.swiping=!1})):e.swiping=!1,e.move({pace:n-e.active,emitChange:!0})}))},correctPosition:function(){this.swiping=!0,this.active<=-1&&this.move({pace:this.count}),this.active>=this.count&&this.move({pace:-this.count})},clear:function(){clearTimeout(this.timer)},autoPlay:function(){var t=this,i=this.autoplay;i>0&&this.count>1&&(this.clear(),this.timer=setTimeout((function(){t.next(),t.autoPlay()}),i))},genIndicator:function(){var t=this,i=this.$createElement,e=this.count,n=this.activeIndicator,s=this.slots("indicator");return s||(this.showIndicators&&e>1?i("div",{class:d("indicators",{vertical:this.vertical})},[Array.apply(void 0,Array(e)).map((function(e,s){return i("i",{class:d("indicator",{active:s===n}),style:s===n?t.indicatorStyle:null})}))]):void 0)}},render:function(){var t=arguments[0];return t("div",{class:d()},[t("div",{ref:"track",style:this.trackStyle,class:d("track",{vertical:this.vertical})},[this.slots()]),this.genIndicator()])}}),p=e(9299),m=(0,n.d)("swipe-item"),g=m[0],w=m[1],y=g({mixins:[(0,c.j)("vanSwipe")],data:function(){return{offset:0,inited:!1,mounted:!1}},mounted:function(){var t=this;this.$nextTick((function(){t.mounted=!0}))},computed:{style:function(){var t={},i=this.parent,e=i.size,n=i.vertical;return e&&(t[n?"height":"width"]=e+"px"),this.offset&&(t.transform="translate"+(n?"Y":"X")+"("+this.offset+"px)"),t},shouldRender:function(){var t=this.index,i=this.inited,e=this.parent,n=this.mounted;if(!e.lazyRender||i)return!0;if(!n)return!1;var s=e.activeIndicator,o=e.count-1,h=0===s&&e.loop?o:s-1,r=s===o&&e.loop?0:s+1,a=t===s||t===h||t===r;return a&&(this.inited=!0),a}},render:function(){var t=arguments[0];return t("div",{class:w(),style:this.style,on:(0,p.Z)({},this.$listeners)},[this.shouldRender&&this.slots()])}}),S=e(2325),z={functional:!0,props:{item:{type:Object,required:!0}},render:function(t,i){var e=i.props.item,n={margin:e.style.margin},s={width:"100%",maxWidth:"640px",height:S.Z.changeRem(e.style.height+"px")},o=e.value.map((function(i,e){return t(y,{key:e},[t("a",{attrs:{href:i.url}},[t("img",{attrs:{src:i.image,width:"100%",height:"100%"}})])])}));return t("div",{class:"wg-imgslide"},[t("div",{style:n},[t(v,{attrs:{autoplay:e.interval},style:s},[o])])])}}}}]);