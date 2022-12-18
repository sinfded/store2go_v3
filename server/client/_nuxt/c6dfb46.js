(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{694:function(t,e,r){"use strict";r.r(e);var n=r(595),l=r(580),o=r(699),c=r(591),d=r(597),f=r(168),h=r(687),m=r(590),v=r(98),x=r(686),_=(r(51),r(0)),y=r(6),O=r(5),k=r(16),C=r(17),w=r(9),j=r(1),S=(r(59),r(24),r(8),r(21),r(26),r(81),r(68)),$=r(611),M=r(641);function z(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=Object(w.a)(t);if(e){var l=Object(w.a)(this).constructor;r=Reflect.construct(n,arguments,l)}else r=n.apply(this,arguments);return Object(C.a)(this,r)}}var A=function(t,e,r,desc){var n,l=arguments.length,o=l<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,r):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(j.a)(Reflect))&&"function"==typeof Reflect.decorate)o=Reflect.decorate(t,e,r,desc);else for(var i=t.length-1;i>=0;i--)(n=t[i])&&(o=(l<3?n(o):l>3?n(e,r,o):n(e,r))||o);return l>3&&o&&Object.defineProperty(e,r,o),o},R=function(t){Object(k.a)(l,t);var e,r,n=z(l);function l(){var t;return Object(y.a)(this,l),(t=n.apply(this,arguments)).searchBG="accent",t.selectedOrders=[],t.page=1,t.numOfItems=10,t.numOfPages=10,t.currentOrderId=localStorage.getItem("currentOrderId")||"",t.orderModal={modal:!1,title:"",product:null,method:""},t.optionBtn=!1,t.filter={show:!1,brand:"",category:"",supplier:""},t.orders=[],t}return Object(O.a)(l,[{key:"getSubtotal",value:function(t){return t.items.reduce((function(t,e){return t+e.subtotal}),0)}},{key:"convertToLongDate",value:function(t){var e=new Date(t),r=e.getDate(),n=["January","February","March","April","May","June","July","August","September","October","November","December"][e.getMonth()],l=e.getFullYear(),o=e.getHours()>12?e.getHours()-11:e.getHours()+1,c=e.getMinutes(),d=(e.getSeconds(),e.getHours()>12?"PM":"AM");return"".concat(n," ").concat(r,", ").concat(l," ").concat(o,":").concat(c," ").concat(d)}},{key:"selectOrder",value:function(t){this.selectedOrders.find((function(e){return e==t}))?this.selectedOrders=this.selectedOrders.filter((function(e){return e!=t})):this.selectedOrders.push(t)}},{key:"emptySelected",value:function(){this.selectedOrders=[]}},{key:"checkSelected",value:function(t){return!!this.selectedOrders.find((function(e){return e==t}))}},{key:"filterReset",value:function(){this.filter={show:!0,brand:"",category:"",supplier:""}}},{key:"refreshTable",value:function(){this.emptySelected(),this.getOrders(),this.$order.getPendingOrders(),this.selectedOrders=[],this.orderModal.modal=!1}},{key:"getOrders",value:(r=Object(_.a)(regeneratorRuntime.mark((function t(){var e=this;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,this.$order.getAllOrders(this.page,this.numOfItems).then((function(data){e.orders=data})).catch((function(t){return console.error(t)}));case 2:case"end":return t.stop()}}),t,this)}))),function(){return r.apply(this,arguments)})},{key:"mounted",value:(e=Object(_.a)(regeneratorRuntime.mark((function t(){var e,r;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return e=this.$refs.orderContainer.$el,t.next=3,this.$order.getOrdersCount();case 3:return r=t.sent,null!=e&&(this.numOfItems=Math.floor((e.scrollHeight-8)/64),this.numOfPages=Math.ceil(r/this.numOfItems)),t.next=7,this.getOrders();case 7:case"end":return t.stop()}}),t,this)}))),function(){return e.apply(this,arguments)})},{key:"onPageChange",value:function(){this.getOrders()}}]),l}(S.Vue);A([Object(S.Watch)("page")],R.prototype,"onPageChange",null);var B=R=A([Object(S.Component)({layout:"main",middleware:"authenticated",components:{ProductSearchBar:$.default,OrderModal:M.default}})],R),P=r(72),component=Object(P.a)(B,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e(d.a,{staticClass:"pa-0 ma-0 fill-height",attrs:{fluid:""}},[e(v.a,{staticClass:"d-flex",attrs:{width:"100%",height:"100%",color:"transparent"}},[e(v.a,{staticClass:"d-flex flex-grow-1 flex-column justify-start",attrs:{height:"100%",color:"transparent"}},[e("div",{staticClass:"d-flex mb-4 align-center"},[e(v.a,{staticClass:"flex-grow-1 d-flex align-center text-subtitle-2 font-weight-regular",attrs:{height:"48",elevation:"0",rounded:"lg"}},[e("ProductSearchBar")],1),t._v(" "),e(l.a,{staticClass:"ml-4 rounded-lg text-capitalize text-subtitle-2",attrs:{height:"48",width:t.$vuetify.breakpoint.smAndUp?"":"48",elevation:"2",color:"primary",fab:!t.$vuetify.breakpoint.smAndUp},on:{click:function(e){t.orderModal.modal=!0}}},[e(f.a,{class:[t.$vuetify.breakpoint.smAndUp?"mr-2 ":""]},[t._v("mdi-clipboard-plus-outline")]),t._v(" "),t.$vuetify.breakpoint.smAndUp?e("span",[t._v("New Order")]):t._e()],1)],1),t._v(" "),e(v.a,{staticClass:"flex-grow-1 d-flex flex-column overflow-hidden",staticStyle:{position:"relative"},attrs:{width:"100%",height:"100%",elevation:"2",rounded:"lg"}},[e(v.a,{staticClass:"px-5 py-3 text-sm-subtitle-2 text-caption font-weight-bold rounded-t-lg d-flex align-center justify-center",attrs:{color:"primary",dark:""}},[e(o.a,{staticClass:"ma-0 mt-n1 mr-2",attrs:{"hide-details":"",value:t.selectedOrders.length>0,indeterminate:t.selectedOrders.length>0,disabled:t.selectedOrders.length<1},on:{change:t.emptySelected}}),t._v(" "),e(m.a,{attrs:{"no-gutters":"",align:"center"}},[e(c.a,{attrs:{cols:"2",md:"1"}},[t._v("Order ID")]),t._v(" "),e(c.a,{attrs:{cols:"3"}},[t._v("Date")]),t._v(" "),e(c.a,{attrs:{cols:"2"}},[t._v("Customer")]),t._v(" "),e(c.a,{attrs:{cols:"2"}},[t._v("Status")]),t._v(" "),e(c.a,{staticClass:"text-center",attrs:{cols:"1"}},[t._v("Items")]),t._v(" "),e(c.a,{staticClass:"text-center",attrs:{cols:"2",md:"3"}},[t._v("Subtotal")])],1)],1),t._v(" "),e(v.a,{ref:"orderContainer",staticClass:"flex-grow-1 overflow-y-auto px-2 pt-2",attrs:{color:"transparent",width:"100%"}},t._l(t.orders,(function(r,n){return e(v.a,{key:n,staticClass:"mb-2 px-3 d-flex align-center text-sm-subtitle-2 text-caption font-weight-medium grey--text text--darken-2",attrs:{height:"56",elevation:"1",rounded:"lg"}},[e(o.a,{staticClass:"ma-0 mt-n1 mr-2",attrs:{"hide-details":"",value:t.checkSelected(r.id)},on:{change:function(e){return t.selectOrder(r.id)}}}),t._v(" "),e(m.a,{attrs:{"no-gutters":"",align:"center"}},[e(c.a,{attrs:{cols:"2",md:"1"}},[e("nuxt-link",{staticClass:"text-decoration-none",attrs:{to:"/orders/".concat(r.id)}},[t._v("\n                  #"+t._s(t.$format.orderIdFormat(r.orderId))+"\n                ")])],1),t._v(" "),e(c.a,{attrs:{cols:"3"}},[t._v(t._s(new Date(r.createdAt).toLocaleString()))]),t._v(" "),e(c.a,{attrs:{cols:"2"}},[t._v("\n                "+t._s(r.customer)+"\n              ")]),t._v(" "),r.id!=t.currentOrderId?e(c.a,{staticClass:"d-flex align-center justify-start",attrs:{cols:"2"}},["pending"==r.status?e(v.a,{staticClass:"pr-2 rounded-lg text-caption font-weight-bold amber--text text--darken-1 d-flex align-center text-capitalize",attrs:{height:"20",color:"amber lighten-5"}},[e(f.a,{attrs:{color:"amber",size:"20"}},[t._v("mdi-circle-medium")]),t._v("\n                  "+t._s(r.status)+"\n                ")],1):"fulfilled"==r.status?e(v.a,{staticClass:"pr-2 rounded-lg text-caption font-weight-bold green--text text--darken-1 d-flex align-center text-capitalize",attrs:{height:"20",color:"green lighten-5"}},[e(f.a,{attrs:{color:"green",size:"20"}},[t._v("mdi-circle-medium")]),t._v("\n                  "+t._s(r.status)+"\n                ")],1):e(v.a,{staticClass:"pr-2 rounded-lg text-caption font-weight-bold red--text text--darken-1 d-flex align-center text-capitalize",attrs:{height:"20",color:"red lighten-5"}},[e(f.a,{attrs:{color:"red",size:"20"}},[t._v("mdi-circle-medium")]),t._v("\n                  "+t._s(r.status)+"\n                ")],1)],1):e(c.a,{staticClass:"d-flex align-center justify-start",attrs:{cols:"2"}},[e(v.a,{staticClass:"pr-2 rounded-lg text-caption font-weight-bold primary--text text--darken-1 d-flex align-center text-capitalize",attrs:{height:"20",color:"primary lighten-5"}},[e(f.a,{attrs:{color:"primary",size:"20"}},[t._v("mdi-circle-medium")]),t._v("\n                  Current\n                ")],1)],1),t._v(" "),e(c.a,{staticClass:"text-center",attrs:{cols:"1"}},[t._v("\n                "+t._s(r.items.length)+"\n              ")]),t._v(" "),e(c.a,{staticClass:"d-flex align-center justify-center",attrs:{cols:"2",md:"3"}},[t._v("\n                "+t._s(t.$format.currencyFormat(t.getSubtotal(r)))+"\n              ")])],1)],1)})),1),t._v(" "),e(x.a,{directives:[{name:"show",rawName:"v-show",value:t.selectedOrders.length>0&&!t.$vuetify.breakpoint.mdAndUp,expression:"selectedOrders.length > 0 && !$vuetify.breakpoint.mdAndUp"}],staticClass:"mr-n2 mb-n2",attrs:{absolute:"",right:"",bottom:"",direction:"top",transition:"slide-y-reverse"},scopedSlots:t._u([{key:"activator",fn:function(){return[e(n.a,{attrs:{content:t.selectedOrders.length,value:t.selectedOrders.length,color:"grey",overlap:""}},[e(l.a,{attrs:{color:"primary",dark:"",fab:"",height:"40",width:"40"},model:{value:t.optionBtn,callback:function(e){t.optionBtn=e},expression:"optionBtn"}},[t.optionBtn?e(f.a,{on:{click:t.emptySelected}},[t._v("\n                  mdi-close\n                ")]):e(f.a,[t._v(" mdi-menu-up ")])],1)],1)]},proxy:!0}]),model:{value:t.optionBtn,callback:function(e){t.optionBtn=e},expression:"optionBtn"}},[t._v(" "),e(l.a,{attrs:{disabled:t.selectedOrders.length>1,fab:"",small:"",dark:1==t.selectedOrders.length,color:"blue lighten-1"}},[e(f.a,{attrs:{size:"22"}},[t._v("mdi-content-copy")])],1),t._v(" "),e(l.a,{attrs:{disabled:t.selectedOrders.length>1,fab:"",small:"",dark:1==t.selectedOrders.length,color:"green lighten-1"}},[e(f.a,{attrs:{size:"22"}},[t._v("mdi-pencil-outline")])],1),t._v(" "),e(l.a,{attrs:{fab:"",small:"",color:"red lighten-1",dark:t.selectedOrders.length>0}},[e(f.a,{attrs:{size:"22"}},[t._v("mdi-trash-can-outline")])],1)],1)],1),t._v(" "),e(v.a,{staticClass:"mt-4 d-flex align-center justify-end",attrs:{width:"100%",color:"transparent"}},[t.selectedOrders.length>0&&t.$vuetify.breakpoint.mdAndUp?e(v.a,{staticClass:"flex-grow-1 d-flex px-3 align-center justify-space-between",attrs:{rounded:"lg",height:"56",elevation:"2"}},[e("div",{staticClass:"ml-n2 d-flex align-center"},[e(l.a,{staticClass:"mr-1",attrs:{plain:"",fab:"",height:"36",width:"36"},on:{click:t.emptySelected}},[e(f.a,[t._v("mdi-close")])],1),t._v(" "),e(v.a,{staticClass:"py-2 px-4 d-flex justify-center align-center rounded-pill text-subtitle-2 font-weight-bold",attrs:{height:"24",dark:"",color:"grey"}},[t._v("\n              "+t._s(t.selectedOrders.length)+"\n            ")]),t._v(" "),e("span",{staticClass:"text-subtitle-2 ml-2"},[t._v(t._s(t.selectedOrders.length>1?"items":"item")+"\n              selected")])],1),t._v(" "),e("div",[e(l.a,{staticClass:"rounded-lg text-capitalize white--text text-subtitle-2",attrs:{color:"blue lighten-1",disabled:t.selectedOrders.length>1}},[e(f.a,{staticClass:"ml-n2 mr-2"},[t._v("mdi-content-copy")]),t._v(" Clone\n            ")],1),t._v(" "),e(l.a,{staticClass:"rounded-lg text-capitalize ml-2 white--text text-subtitle-2",attrs:{color:"green lighten-1",disabled:t.selectedOrders.length>1}},[e(f.a,{staticClass:"ml-n2 mr-2"},[t._v("mdi-pencil-outline")]),t._v(" Edit\n            ")],1),t._v(" "),e(l.a,{staticClass:"rounded-lg text-capitalize ml-2 text-subtitle-2",attrs:{dark:"",color:"red lighten-1"},on:{click:function(e){return t.$order.removeOrders(t.selectedOrders)}}},[e(f.a,{staticClass:"ml-n2 mr-2"},[t._v("mdi-trash-can-outline")]),t._v(" Delete\n            ")],1)],1)]):t._e(),t._v(" "),e(v.a,{staticClass:"d-flex justify-center align-center px-1",class:[t.$vuetify.breakpoint.smAndUp?"ml-4":"ma-0"],attrs:{rounded:"lg",elevation:"2",height:"56",width:t.$vuetify.breakpoint.smAndUp?"auto":"100%"}},[e(h.a,{attrs:{length:t.numOfPages,"total-visible":5},model:{value:t.page,callback:function(e){t.page=e},expression:"page"}})],1)],1)],1),t._v(" "),t.$vuetify.breakpoint.lgAndUp?e(v.a,{staticClass:"rounded-lg ml-4",attrs:{width:"30%","min-width":"350",Cracker:"",elevation:"1"}}):t._e()],1),t._v(" "),e("OrderModal",{attrs:{orderModal:t.orderModal.modal},on:{closeModal:t.refreshTable}})],1)}),[],!1,null,null,null);e.default=component.exports;installComponents(component,{OrderModal:r(641).default})}}]);