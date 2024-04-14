import{a as h}from"./axios-CV48_vsH.js";import{_ as w,S as l,r as b,o as d,c,d as i,b as e,F as C,e as L,t as v,w as q,B as T,C as x,D as V,g as U,n as y}from"./index-BZpAAvGB.js";var E={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"joychiang",BASE_URL:"/production-sub-path/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:f,VITE_PATH:_}=E,S={data(){return{form:{user:{name:"",email:"",tel:"",address:"",message:""}},status:{addCartLoading:"",cartQtyLoading:"",removeLoading:""},carts:{},isLoading:!1}},methods:{changeCartQty(n,t=1){const r={product_id:n.product_id,qty:t};this.status.cartQtyLoading=n.id,h.put(`${f}/api/${_}/cart/${n.id}`,{data:r}).then(()=>{this.status.cartQtyLoading="",this.getCart()}).catch(m=>{l.fire(m.data.message)})},removeCartItem(n){this.status.removeLoading=n;const t=l.mixin({customClass:{confirmButton:"btn btn-danger m-1",cancelButton:"btn btn-outline-danger m-1"},buttonsStyling:!1});t.fire({title:"確定要刪除嗎?",icon:"warning",showCancelButton:!0,confirmButtonText:"確定",cancelButtonText:"取消",reverseButtons:!0}).then(r=>{r.isConfirmed?(t.fire({title:"已刪除成功",icon:"success"}),h.delete(`${f}/api/${_}/cart/${n}`).then(m=>{l.fire(m.data.message),this.status.removeLoading="",this.getCart()}).catch(m=>{l.fire(m.data.message)})):r.dismiss===l.DismissReason.cancel&&t.fire({title:"已取消刪除",icon:"error"})})},removeAllCart(){const n=l.mixin({customClass:{confirmButton:"btn btn-danger m-1",cancelButton:"btn btn-outline-danger m-1"},buttonsStyling:!1});n.fire({title:"確定要刪除嗎?",icon:"warning",showCancelButton:!0,confirmButtonText:"確定",cancelButtonText:"取消",reverseButtons:!0}).then(t=>{t.isConfirmed?(n.fire({title:"已刪除成功",icon:"success"}),h.delete(`${f}/api/${_}/carts`).then(r=>{l.fire(r.data.message),this.status.removeLoading="",this.getCart()}).catch(r=>{l.fire(r.response.data.message)})):t.dismiss===l.DismissReason.cancel&&n.fire({title:"已取消刪除",icon:"error"})})},createOrder(){const n=this.form;h.post(`${f}/api/${_}/order`,{data:n}).then(t=>{l.fire(t.data.message),this.$refs.form.resetForm(),this.getCart()}).catch(t=>{l.fire(t.response.data.message)})},getCart(){this.isLoading=!0,h.get(`${f}/api/${_}/cart`).then(n=>{this.carts=n.data.data,this.isLoading=!1}).catch(n=>{l.fire(n.response.data.message)})}},mounted(){this.getCart()}},M={class:"container"},D={class:"text-end"},I={key:0,class:"text-center mt-7"},Q={class:"table align-middle"},R=e("thead",null,[e("tr",null,[e("th"),e("th",null,"圖片"),e("th",{style:{width:"300px"}},"品名"),e("th",{style:{width:"200px"}},"數量"),e("th",{class:"text-end"},"單價")])],-1),A=["onClick"],z={key:0,class:"fas fa-spinner fa-pulse"},H=e("div",null," x ",-1),N=["src"],O={class:"input-group input-group-sm"},P={class:"input-group"},j=["onClick","disabled"],F=["onClick"],W=e("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-trash",viewBox:"0 0 16 16"},[e("path",{d:`M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5
                        0 0 1-1 0V6a.5.5 0 0
                        1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0
                        0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z`}),e("path",{d:`M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0
                        1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1
                        1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0
                        1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0
                        0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z`})],-1),G=[W],J=["onUpdate:modelValue","disabled"],K=["onClick"],X={class:"text-end"},Y=e("small",{class:"text-success"},"折扣價：",-1),Z=e("td",{colspan:"4",class:"text-end"},"總計",-1),$={class:"text-end"},ee=e("td",{colspan:"4",class:"text-end text-success"},"折扣價",-1),te={class:"text-end text-success"},se={class:"container"},oe={class:"my-5 row justify-content-center"},ne={class:"mb-3"},ae=e("label",{for:"email",class:"form-label"},"Email",-1),le={class:"mb-3"},ie=e("label",{for:"name",class:"form-label"},"收件人姓名",-1),re={class:"mb-3"},de=e("label",{for:"tel",class:"form-label"},"收件人電話",-1),ce={class:"mb-3"},me=e("label",{for:"address",class:"form-label"},"收件人地址",-1),ue={class:"mb-3"},he=e("label",{for:"message",class:"form-label"},"留言",-1),fe=e("div",{class:"text-center"},[e("button",{type:"submit",class:"btn btn-danger"},"送出訂單")],-1);function _e(n,t,r,m,o,u){const B=b("loading"),p=b("v-field"),g=b("errorMessage"),k=b("v-form");return d(),c(C,null,[i(B,{active:o.isLoading,"onUpdate:active":t[0]||(t[0]=s=>o.isLoading=s),"can-cancel":!0,"on-cancel":n.onCancel,"is-full-page":n.fullPage},null,8,["active","on-cancel","is-full-page"]),e("div",M,[e("div",D,[o.carts&&o.carts.carts&&o.carts.carts.length===0?(d(),c("h4",I,"目前購物車沒有商品")):(d(),c("button",{key:1,class:"btn btn-outline-danger mt-3 mb-3",type:"button",onClick:t[1]||(t[1]=s=>u.removeAllCart())},"清空購物車"))]),e("table",Q,[R,e("tbody",null,[(d(!0),c(C,null,L(o.carts.carts,s=>(d(),c("tr",{key:s.id},[e("td",null,[e("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:a=>u.removeCartItem(s.id)},[s.id===o.status.removeLoading?(d(),c("i",z)):T("",!0),H],8,A)]),e("td",null,[e("img",{src:s.product.imageUrl,alt:"產品圖片",class:"object-fit-cover",height:"100px"},null,8,N)]),e("td",null,v(s.product.title),1),e("td",null,[e("div",O,[e("div",P,[s.qty>1?(d(),c("button",{key:0,type:"button",class:"btn btn-outline-secondary",onClick:a=>{s.qty--,u.changeCartQty(s,s.qty)},disabled:s.qty===1},"-",8,j)):(d(),c("button",{key:1,type:"button",class:"btn btn-outline-danger",onClick:a=>u.removeCartItem(s.id)},G,8,F)),x(e("input",{min:"1",type:"number",class:"form-control text-center","onUpdate:modelValue":a=>s.qty=a,style:{"padding-left":"20px"},disabled:s.id===o.status.cartQtyLoading,readonly:""},null,8,J),[[V,s.qty]]),e("button",{type:"button",class:"btn btn-outline-secondary",onClick:a=>{s.qty++,u.changeCartQty(s,s.qty)}},"+",8,K)])])]),e("td",X,[Y,U(" "+v(s.total),1)])]))),128))]),e("tfoot",null,[e("tr",null,[Z,e("td",$,v(o.carts.total),1)]),e("tr",null,[ee,e("td",te,v(o.carts.final_total),1)])])])]),e("div",se,[e("div",oe,[i(k,{ref:"form",class:"col-md-6",onSubmit:u.createOrder},{default:q(({errors:s})=>[e("div",ne,[ae,i(p,{id:"email",name:"email",type:"email",class:y(["form-control",{"is-invalid":s.email}]),placeholder:"請輸入 Email",rules:"email|required",modelValue:o.form.user.email,"onUpdate:modelValue":t[2]||(t[2]=a=>o.form.user.email=a)},null,8,["class","modelValue"]),i(g,{name:"email",class:"invalid-feedback"})]),e("div",le,[ie,i(p,{id:"name",name:"姓名",type:"text",class:y(["form-control",{"is-invalid":s.姓名}]),placeholder:"請輸入姓名",rules:"required",modelValue:o.form.user.name,"onUpdate:modelValue":t[3]||(t[3]=a=>o.form.user.name=a)},null,8,["class","modelValue"]),i(g,{name:"姓名",class:"invalid-feedback"})]),e("div",re,[de,i(p,{id:"tel",name:"電話",type:"tel",class:y(["form-control",{"is-invalid":s.電話}]),placeholder:"請輸入電話",rules:"required|min:8|max:10",modelValue:o.form.user.tel,"onUpdate:modelValue":t[4]||(t[4]=a=>o.form.user.tel=a),modelModifiers:{trim:!0}},null,8,["class","modelValue"]),i(g,{name:"電話",class:"invalid-feedback"})]),e("div",ce,[me,i(p,{id:"address",name:"地址",type:"text",class:y(["form-control",{"is-invalid":s.地址}]),placeholder:"請輸入地址",rules:"required",modelValue:o.form.user.address,"onUpdate:modelValue":t[5]||(t[5]=a=>o.form.user.address=a)},null,8,["class","modelValue"]),i(g,{name:"地址",class:"invalid-feedback"})]),e("div",ue,[he,x(e("textarea",{id:"message",class:"form-control",cols:"30",rows:"10","onUpdate:modelValue":t[6]||(t[6]=a=>o.form.message=a)},null,512),[[V,o.form.message]])]),fe]),_:1},8,["onSubmit"])])])],64)}const be=w(S,[["render",_e]]);export{be as default};
