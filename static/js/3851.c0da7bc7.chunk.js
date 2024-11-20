"use strict";(self.webpackChunkemilus=self.webpackChunkemilus||[]).push([[3851],{43851:function(e,t,n){n.r(t),n.d(t,{Invoice:function(){return j},default:function(){return f}});var s=n(15671),a=n(43144),r=n(60136),i=n(29388),c=n(72791),l=n(78803),d=n(63345),o=n(79797),u=n(87309),h=[{key:"1",product:"Samsung Galaxy S20+",quantity:2,price:899},{key:"2",product:"SonicGear Evo 9 BTMI Speaker",quantity:1,price:199},{key:"3",product:"Sharp Aquos 40-Inch Easy Smart LED TV",quantity:1,price:977}],x=n(30948),p=n(80184),m=d.Z.Column,j=function(e){(0,r.Z)(n,e);var t=(0,i.Z)(n);function n(){return(0,s.Z)(this,n),t.apply(this,arguments)}return(0,a.Z)(n,[{key:"total",value:function(){var e=0;return h.forEach((function(t){e+=t.price})),e}},{key:"render",value:function(){return(0,p.jsx)("div",{className:"container",children:(0,p.jsxs)(o.Z,{children:[(0,p.jsxs)("div",{className:"d-md-flex justify-content-md-between",children:[(0,p.jsxs)("div",{children:[(0,p.jsx)("img",{src:"/img/logo.png",alt:""}),(0,p.jsx)("address",{children:(0,p.jsxs)("p",{children:[(0,p.jsx)("span",{className:"font-weight-semibold text-dark font-size-md",children:"Emilus, Inc."}),(0,p.jsx)("br",{}),(0,p.jsx)("span",{children:"9498 Harvard Street"}),(0,p.jsx)("br",{}),(0,p.jsx)("span",{children:"Fairfield, Chicago Town 06824"}),(0,p.jsx)("br",{}),(0,p.jsx)("abbr",{className:"text-dark",title:"Phone",children:"Phone:"}),(0,p.jsx)("span",{children:"(123) 456-7890"})]})})]}),(0,p.jsxs)("div",{className:"mt-3 text-right",children:[(0,p.jsx)("h2",{className:"mb-1 font-weight-semibold",children:"Invoice #9972"}),(0,p.jsx)("p",{children:"25/7/2018"}),(0,p.jsx)("address",{children:(0,p.jsxs)("p",{children:[(0,p.jsx)("span",{className:"font-weight-semibold text-dark font-size-md",children:"Genting Holdings."}),(0,p.jsx)("br",{}),(0,p.jsx)("span",{children:"8626 Maiden Dr. "}),(0,p.jsx)("br",{}),(0,p.jsx)("span",{children:"Niagara Falls, New York 14304"})]})})]})]}),(0,p.jsxs)("div",{className:"mt-4",children:[(0,p.jsxs)(d.Z,{dataSource:h,pagination:!1,className:"mb-5",children:[(0,p.jsx)(m,{title:"No.",dataIndex:"key"},"key"),(0,p.jsx)(m,{title:"Product",dataIndex:"product"},"product"),(0,p.jsx)(m,{title:"Quantity",dataIndex:"quantity"},"quantity"),(0,p.jsx)(m,{title:"Price",render:function(e){return(0,p.jsx)(x.Z,{displayType:"text",value:(Math.round(100*e.price)/100).toFixed(2),prefix:"$",thousandSeparator:!0})}},"price"),(0,p.jsx)(m,{title:"Total",render:function(e){return(0,p.jsx)(x.Z,{displayType:"text",value:(Math.round(e.price*e.quantity*100)/100).toFixed(2),prefix:"$",thousandSeparator:!0})}},"total")]}),(0,p.jsx)("div",{className:"d-flex justify-content-end",children:(0,p.jsxs)("div",{className:"text-right ",children:[(0,p.jsxs)("div",{className:"border-bottom",children:[(0,p.jsxs)("p",{className:"mb-2",children:[(0,p.jsx)("span",{children:"Sub - Total amount: "}),(0,p.jsx)(x.Z,{displayType:"text",value:(Math.round(100*this.total())/100).toFixed(2),prefix:"$",thousandSeparator:!0})]}),(0,p.jsxs)("p",{children:["vat (10%) : ",(Math.round(this.total()/100*10*100)/100).toFixed(2)]})]}),(0,p.jsxs)("h2",{className:"font-weight-semibold mt-3",children:[(0,p.jsx)("span",{className:"mr-1",children:"Grand Total: "}),(0,p.jsx)(x.Z,{displayType:"text",value:(Math.round(100*this.total())/100-this.total()/100*10).toFixed(2),prefix:"$",thousandSeparator:!0})]})]})}),(0,p.jsx)("p",{className:"mt-5",children:(0,p.jsx)("small",{children:"In exceptional circumstances, Financial Services can provide an urgent manually processed special cheque. Note, however, that urgent special cheques should be requested only on an emergency basis as manually produced cheques involve duplication of effort and considerable staff resources. Requests need to be supported by a letter explaining the circumstances to justify the special cheque payment"})})]}),(0,p.jsx)("hr",{className:"d-print-none"}),(0,p.jsx)("div",{className:"text-right d-print-none",children:(0,p.jsxs)(u.ZP,{type:"primary",onClick:function(){return window.print()},children:[(0,p.jsx)(l.Z,{type:"printer"}),(0,p.jsx)("span",{className:"ml-1",children:"Print"})]})})]})})}}]),n}(c.Component),f=j},78803:function(e,t,n){n.d(t,{Z:function(){return l}});var s=n(1413),a=n(72791),r={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M820 436h-40c-4.4 0-8 3.6-8 8v40c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-40c0-4.4-3.6-8-8-8zm32-104H732V120c0-4.4-3.6-8-8-8H300c-4.4 0-8 3.6-8 8v212H172c-44.2 0-80 35.8-80 80v328c0 17.7 14.3 32 32 32h168v132c0 4.4 3.6 8 8 8h424c4.4 0 8-3.6 8-8V772h168c17.7 0 32-14.3 32-32V412c0-44.2-35.8-80-80-80zM360 180h304v152H360V180zm304 664H360V568h304v276zm200-140H732V500H292v204H160V412c0-6.6 5.4-12 12-12h680c6.6 0 12 5.4 12 12v292z"}}]},name:"printer",theme:"outlined"},i=n(8711),c=function(e,t){return a.createElement(i.Z,(0,s.Z)((0,s.Z)({},e),{},{ref:t,icon:r}))};c.displayName="PrinterOutlined";var l=a.forwardRef(c)}}]);
//# sourceMappingURL=3851.c0da7bc7.chunk.js.map