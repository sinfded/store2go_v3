(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{633:function(t,e,n){"use strict";n.r(e);var r=n(580),o=n(603),c=n(591),l=n(691),d=n(613),h=n(168),f=n(590),m=n(98),v=n(593),x=n(618),y=(n(51),n(6)),_=n(5),k=n(16),P=n(17),C=n(9),w=n(1),O=(n(24),n(8),n(110),n(68));function M(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=Object(C.a)(t);if(e){var o=Object(C.a)(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return Object(P.a)(this,n)}}var j=function(t,e,n,desc){var r,o=arguments.length,c=o<3?e:null===desc?desc=Object.getOwnPropertyDescriptor(e,n):desc;if("object"===("undefined"==typeof Reflect?"undefined":Object(w.a)(Reflect))&&"function"==typeof Reflect.decorate)c=Reflect.decorate(t,e,n,desc);else for(var i=t.length-1;i>=0;i--)(r=t[i])&&(c=(o<3?r(c):o>3?r(e,n,c):r(e,n))||c);return o>3&&c&&Object.defineProperty(e,n,c),c},B=function(t){Object(k.a)(n,t);var e=M(n);function n(){var t;return Object(y.a)(this,n),(t=e.apply(this,arguments)).selectedMethod="cash",t.amountPaid=0,t.methods=[{text:"Cash",value:"cash",icon:"mdi-cash",disable:!1},{text:"Credit Card",value:"credit_card",icon:"mdi-credit-card-outline",disable:!0},{text:"Debit Card",value:"debit_card",icon:"mdi-credit-card-outline",disable:!0},{text:"Cheque",value:"cheque",icon:"mdi-checkbook",disable:!1}].sort((function(a,b){return a.disable===b.disable?0:a.disable?1:-1})),t.banks=["BDO Unibank","Bank of the Philippine Islands","Land Bank of the Phlippines","Unionbank","Bank of Makati","East West Bank","Philippine National Bank","Development Bank of the Philippines","Metrobank","China Bank"].sort(),t}return Object(_.a)(n,[{key:"change",get:function(){return this.amountPaid<this.toPay?0:this.amountPaid-this.toPay}},{key:"due",get:function(){return this.amountPaid<this.toPay?this.toPay-this.amountPaid:0}},{key:"paid",get:function(){return this.amountPaid<this.toPay?this.amountPaid:this.toPay}},{key:"currencyFormat",value:function(t){return new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP"}).format(t)}},{key:"savePrint",value:function(){this.$emit("closeModal")}}]),n}(O.Vue);j([Object(O.Prop)()],B.prototype,"showModal",void 0),j([Object(O.Prop)()],B.prototype,"toPay",void 0);var R=B=j([Object(O.Component)({})],B),D=n(72),component=Object(D.a)(R,(function(){var t=this,e=t._self._c;t._self._setupProxy;return e(d.a,{attrs:{persistent:"","max-width":"400px"},model:{value:t.showModal,callback:function(e){t.showModal=e},expression:"showModal"}},[e(o.a,{attrs:{rounded:"lg"}},[e(m.a,{staticClass:"px-3 py-2",attrs:{dark:"",color:"primary"}},[e(f.a,{attrs:{"no-gutters":"",align:"center"}},[e("span",{staticClass:"text-subtitle-1 font-weight-medium"},[t._v("Payment Method")]),t._v(" "),e(v.a),t._v(" "),e(r.a,{staticClass:"mr-n2",attrs:{icon:""},on:{click:function(e){return t.$emit("closeModal")}}},[e(h.a,[t._v("mdi-close")])],1)],1)],1),t._v(" "),e(m.a,{staticClass:"px-2 pt-3 pb-1 d-flex flex-wrap",attrs:{width:"100%"}},t._l(t.methods,(function(n,o){return e(r.a,{key:o,staticClass:"mx-1 mb-2 white--text",attrs:{disabled:n.disable,color:"teal",outlined:t.selectedMethod!=n.value},on:{click:function(e){t.selectedMethod=n.value}}},[e(h.a,{staticClass:"mr-1",attrs:{size:"28"}},[t._v(t._s(n.icon))]),t._v(t._s(n.text)+"\n            ")],1)})),1),t._v(" "),e(m.a,{staticClass:"px-3"},[e("span",{staticClass:"text-subtitle-1 font-weight-medium grey--text text--darken-2 pb-1"},[t._v("Details")]),t._v(" "),"cash"==t.selectedMethod?e("div",[e(x.a,{attrs:{outlined:"",label:"Amount",autofocus:"",dense:"","hide-details":"","prepend-inner-icon":"mdi-currency-php"},model:{value:t.amountPaid,callback:function(e){t.amountPaid=e},expression:"amountPaid"}})],1):t._e(),t._v(" "),"cheque"==t.selectedMethod?e("div",[e(f.a,{attrs:{"no-gutters":""}},[e(c.a,{staticClass:"pr-1 mb-2",attrs:{cols:"8"}},[e(l.a,{attrs:{items:t.banks,label:"Bank",autofocus:"",outlined:"",dense:"","hide-details":"","prepend-inner-icon":"mdi-bank"}})],1),t._v(" "),e(c.a,{staticClass:"pl-1 mb-2",attrs:{cols:"4"}},[e(x.a,{attrs:{label:"Branch",outlined:"",dense:"","hide-details":"","prepend-inner-icon":"mdi-map-marker"}})],1),t._v(" "),e(c.a,{staticClass:"mb-2",attrs:{cols:"12"}},[e(x.a,{attrs:{label:"Check #",outlined:"",dense:"","hide-details":"","prepend-inner-icon":"mdi-numeric"}})],1),t._v(" "),e(c.a,{attrs:{cols:"12"}},[e(x.a,{attrs:{label:"Amount",outlined:"",dense:"","hide-details":"","prepend-inner-icon":"mdi-currency-php"},model:{value:t.amountPaid,callback:function(e){t.amountPaid=e},expression:"amountPaid"}})],1)],1)],1):t._e(),t._v(" "),e("div",{staticClass:"py-2"},[e(f.a,{attrs:{"no-gutters":""}},[e(c.a,{staticClass:"px-3 text-center font-weight-bold grey lighten-3 rounded-l-lg",attrs:{cols:"6"}},[e(m.a,{staticClass:"text-left grey--text text--darken-1",attrs:{width:"100%",color:"transparent"}},[t._v("PAID\n                        ")]),t._v(" "),e("span",{staticClass:"text-h5 font-weight-bold grey--text text--darken-2"},[t._v(t._s(t.currencyFormat(t.paid)))])],1),t._v(" "),e(c.a,{staticClass:"px-3 text-center font-weight-bold red lighten-4 rounded-r-lg",attrs:{cols:"6"}},[e(m.a,{staticClass:"text-left grey--text text--darken-1",attrs:{width:"100%",color:"transparent"}},[t._v("DUE\n                        ")]),t._v(" "),e("span",{staticClass:"text-h5 font-weight-bold red--text text--lighten-1"},[t._v(t._s(t.currencyFormat(t.due)))])],1),t._v(" "),"cash"==t.selectedMethod?e(c.a,{staticClass:"px-3 mt-2 text-center font-weight-bold amber lighten-4 rounded-lg",attrs:{cols:"12"}},[e(m.a,{staticClass:"text-left grey--text text--darken-1",attrs:{width:"100%",color:"transparent"}},[t._v("CHANGE\n                        ")]),t._v(" "),e("span",{staticClass:"text-h5 font-weight-bold amber--text text--darken-2"},[t._v(t._s(t.currencyFormat(t.change)))])],1):t._e()],1)],1)]),t._v(" "),e(m.a,{staticClass:"pa-3 pt-1"},[e(r.a,{staticClass:"rounded-lg",attrs:{block:"",large:"",color:"primary",disabled:t.amountPaid<t.toPay},on:{click:t.savePrint}},[t._v("\n                Save & Print Receipt\n            ")])],1)],1)],1)}),[],!1,null,null,null);e.default=component.exports}}]);