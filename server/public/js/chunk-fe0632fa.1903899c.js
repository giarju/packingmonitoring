(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-fe0632fa"],{"1dde":function(t,e,r){var n=r("d039"),a=r("b622"),i=r("2d00"),o=a("species");t.exports=function(t){return i>=51||!n((function(){var e=[],r=e.constructor={};return r[o]=function(){return{foo:1}},1!==e[t](Boolean).foo}))}},"65f0":function(t,e,r){var n=r("861d"),a=r("e8b5"),i=r("b622"),o=i("species");t.exports=function(t,e){var r;return a(t)&&(r=t.constructor,"function"!=typeof r||r!==Array&&!a(r.prototype)?n(r)&&(r=r[o],null===r&&(r=void 0)):r=void 0),new(void 0===r?Array:r)(0===e?0:e)}},b032:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container home"},[r("b-row",{staticClass:"container my-3"},[r("b-button",{attrs:{size:"md",variant:"dark"},on:{click:t.refresh}},[t._v(" Perbaharui ")])],1),r("h6",[t._v("Pesanan")]),r("div",{staticClass:"mt-3 scrollable",attrs:{id:"list-material"}},[r("b-table",{attrs:{striped:"",hover:"",fixed:"",filter:"0","filter-included-fields":t.order_status,fields:t.order_fields,items:t.order_items,"head-variant":"dark"},scopedSlots:t._u([{key:"cell(action)",fn:function(e){return[r("b-button",{attrs:{size:"sm",variant:"primary"},on:{click:function(r){return t.to_modal_click(e.item.status_now,1,e.item.po_code,"weigh_modal_ref")}}},[t._v(" Timbang ")])]}}])}),r("b-modal",{ref:"weigh_modal_ref",attrs:{centered:"","hide-header":"","hide-footer":"",id:"weigh_modal"}},[r("h4",[t._v(" Apakah ingin mencetak QR Code dan memulai penimbangan? ")]),r("br"),r("br"),r("br"),r("br"),r("b-button",{staticClass:"m-2",attrs:{variant:"primary"},on:{click:function(e){return t.action_click(t.sel_status_now,t.sel_chg,t.sel_po_code,!0,"weigh_modal_ref")}}},[t._v(" Cetak dan Timbang ")]),r("b-button",{staticClass:"m-2",attrs:{variant:"secondary"},on:{click:function(e){return t.action_click(t.sel_status_now,t.sel_chg,t.sel_po_code,!1,"weigh_modal_ref")}}},[t._v(" Timbang ")]),r("b-button",{staticClass:"m-2",attrs:{variant:"danger"},on:{click:function(e){return t.action_click(-99,0,t.sel_po_code,!1,"weigh_modal_ref")}}},[t._v(" Hapus ")]),r("b-button",{staticClass:"m-2",attrs:{variant:"dark"},on:{click:function(e){return t.hide_modal("weigh_modal_ref")}}},[t._v(" Tidak ")])],1)],1),r("hr"),r("h6",[t._v("Sedang Ditimbang")]),r("div",{staticClass:"mt-3 scrollable",attrs:{id:"list-material"}},[r("b-table",{attrs:{striped:"",hover:"",fixed:"",filter:"1","filter-included-fields":t.order_status,fields:t.order_fields,items:t.order_items,"head-variant":"dark"},scopedSlots:t._u([{key:"cell(action)",fn:function(e){return[r("b-button",{attrs:{size:"sm",variant:"danger"},on:{click:function(r){return t.to_modal_click(e.item.status_now,-1,e.item.po_code,"cancel_modal_ref")}}},[t._v(" Batal ")])]}}])}),r("b-modal",{ref:"cancel_modal_ref",attrs:{centered:"","hide-header":"","hide-footer":"",id:"cancel_modal"}},[r("h4",[t._v(" Apakah Anda yakin? ")]),r("br"),r("br"),r("br"),r("br"),r("b-button",{staticClass:"m-2",attrs:{variant:"primary"},on:{click:function(e){return t.action_click(t.sel_status_now,t.sel_chg,t.sel_po_code,!1,"cancel_modal_ref")}}},[t._v(" Ya ")]),r("b-button",{staticClass:"m-2",attrs:{variant:"danger"},on:{click:function(e){return t.hide_modal("cancel_modal_ref")}}},[t._v(" Tidak ")])],1)],1),r("hr"),r("h6",[t._v("Sudah Selesai")]),r("div",{staticClass:"mt-3 scrollable",attrs:{id:"list-material"}},[r("b-table",{attrs:{striped:"",hover:"",fixed:"",filter:"2","filter-included-fields":t.order_status,fields:t.order_fields,items:t.order_items,"head-variant":"dark"},scopedSlots:t._u([{key:"cell(action)",fn:function(e){return[r("b-button",{attrs:{size:"sm",variant:"primary"},on:{click:function(r){return t.to_modal_click(e.item.status_now,1,e.item.po_code,"cancel_modal_ref")}}},[t._v(" Selesai ")])]}}])})],1)],1)},a=[],i=(r("c740"),r("d81d"),r("bc3a")),o=r.n(i),s={name:"CoordMain",components:{},data:function(){return{sel_status_now:0,sel_chg:0,sel_po_code:0,sel_print:!1,order_status:["status_now"],order_fields:[{key:"po_code",label:"Po"},{key:"feed_code",label:"Feed"},{key:"batch_num",label:"Jmlh Batch"},{key:"priority_num",label:"Prioritas"},{key:"checklist",label:"Cek"},{key:"action",label:"Aksi"}],order_items:[]}},methods:{hide_modal:function(t){this.$refs[t].hide()},to_modal_click:function(t,e,r,n){this.sel_status_now=t,this.sel_chg=e,this.sel_po_code=r,this.$refs[n].show()},action_click:function(t,e,r,n,a){var i=parseInt(t)+e,s=this.order_items.map((function(t){return t.po_code})).findIndex((function(t){return t===r})),c=0;-1!==s&&(c=this.order_items[s].batch_num),0===parseInt(t)&&n?o.a.post("/api/printer",{timeout:5e3,po_code:r,batch_num:c}).then((function(t){console.log(t),o.a.put("/api/listpo/update",{timeout:5e3,status:i,po_code:r}).then((function(t){console.log(t)})).catch((function(t){console.error(t)}))})).catch((function(t){console.error(t)})):o.a.put("/api/listpo/update",{timeout:5e3,status:i,po_code:r}).then((function(t){console.log(t)})).catch((function(t){console.error(t)})),-1!==s&&(this.order_items[s].status_now=i),this.$refs[a].hide()},refresh:function(){var t=this;o.a.get("/api/listpo",{timeout:5e3}).then((function(e){e.data.length>0&&(t.order_items=e.data)})).catch((function(t){console.error(t)}))}}},c=s,l=r("2877"),d=Object(l["a"])(c,n,a,!1,null,null,null);e["default"]=d.exports},b727:function(t,e,r){var n=r("0366"),a=r("44ad"),i=r("7b0b"),o=r("50c4"),s=r("65f0"),c=[].push,l=function(t){var e=1==t,r=2==t,l=3==t,d=4==t,u=6==t,_=7==t,f=5==t||u;return function(m,h,b,p){for(var v,k,g=i(m),w=a(g),y=n(h,b,3),C=o(w.length),x=0,A=p||s,I=e?A(m,C):r||_?A(m,0):void 0;C>x;x++)if((f||x in w)&&(v=w[x],k=y(v,x,g),t))if(e)I[x]=k;else if(k)switch(t){case 3:return!0;case 5:return v;case 6:return x;case 2:c.call(I,v)}else switch(t){case 4:return!1;case 7:c.call(I,v)}return u?-1:l||d?d:I}};t.exports={forEach:l(0),map:l(1),filter:l(2),some:l(3),every:l(4),find:l(5),findIndex:l(6),filterOut:l(7)}},c740:function(t,e,r){"use strict";var n=r("23e7"),a=r("b727").findIndex,i=r("44d2"),o="findIndex",s=!0;o in[]&&Array(1)[o]((function(){s=!1})),n({target:"Array",proto:!0,forced:s},{findIndex:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}}),i(o)},d81d:function(t,e,r){"use strict";var n=r("23e7"),a=r("b727").map,i=r("1dde"),o=i("map");n({target:"Array",proto:!0,forced:!o},{map:function(t){return a(this,t,arguments.length>1?arguments[1]:void 0)}})},e8b5:function(t,e,r){var n=r("c6b6");t.exports=Array.isArray||function(t){return"Array"==n(t)}}}]);
//# sourceMappingURL=chunk-fe0632fa.1903899c.js.map