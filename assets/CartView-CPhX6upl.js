import{a as m}from"./axios-CV48_vsH.js";import{S as c}from"./sweetalert2.all-DYqKAeLx.js";import{_ as w,r as p,o as i,c as d,d as n,b as e,F as V,e as q,t as g,w as U,A as C,B as x,g as E,v as b}from"./index-BqSyj61t.js";var S={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"joychiang",BASE_URL:"/togo/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:u,VITE_PATH:_}=S,T={data(){return{form:{user:{name:"",email:"",tel:"",address:""},message:""},status:{addCartLoading:"",cartQtyLoading:"",removeLoading:""},carts:{},isLoading:!1}},methods:{changeCartQty(o,s=1){const v={product_id:o.product_id,qty:s};this.status.cartQtyLoading=o.id,m.put(`${u}/api/${_}/cart/${o.id}`,{data:v}).then(()=>{this.status.cartQtyLoading="",this.getCart()}).catch(y=>{c.fire(y.data.message)})},removeCartItem(o){this.status.removeLoading=o,m.delete(`${u}/api/${_}/cart/${o}`).then(s=>{c.fire(s.data.message),this.status.removeLoading="",this.getCart()}).catch(s=>{console.log(s)})},removeAllCart(){m.delete(`${u}/api/${_}/carts`).then(o=>{c.fire(o.data.message),this.getCart()}).catch(o=>{c.fire(o.data.message)})},createOrder(){const o=this.form;m.post(`${u}/api/${_}/order`,{data:o}).then(s=>{c.fire(s.data.message),this.$refs.form.resetForm(),this.getCart()}).catch(s=>{c.fire(s.response.data.message)})},getCart(){this.isLoading=!0,m.get(`${u}/api/${_}/cart`).then(o=>{this.carts=o.data.data,this.isLoading=!1})}},mounted(){this.getCart()}},A={class:"container"},I={class:"text-end"},Q={class:"table align-middle"},B=e("thead",null,[e("tr",null,[e("th"),e("th",null,"品名"),e("th",{style:{width:"300px"}},"數量/單位"),e("th",{style:{width:"200px"}},"數量"),e("th",{class:"text-end"},"單價")])],-1),M=["onClick"],z={key:0,class:"fas fa-spinner fa-pulse"},D={key:1},H=["src"],R={class:"input-group input-group-sm"},O={class:"input-group mb-3"},P=["onClick","disabled"],j=["onClick"],F=e("svg",{xmlns:"http://www.w3.org/2000/svg",width:"16",height:"16",fill:"currentColor",class:"bi bi-trash",viewBox:"0 0 16 16"},[e("path",{d:`M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5
                        0 0 1-1 0V6a.5.5 0 0
                        1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0
                        0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z`}),e("path",{d:`M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0
                        1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1
                        1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0
                        1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0
                        0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z`})],-1),N=[F],G=["onUpdate:modelValue","disabled"],J=["onClick"],K={class:"text-end"},W=e("small",{class:"text-success"},"折扣價：",-1),X=e("td",{colspan:"4",class:"text-end"},"總計",-1),Y={class:"text-end"},Z=e("td",{colspan:"4",class:"text-end text-success"},"折扣價",-1),$={class:"text-end text-success"},ee={class:"my-5 row justify-content-center"},te={class:"mb-3"},se=e("label",{for:"email",class:"form-label"},"Email",-1),oe={class:"mb-3"},ae=e("label",{for:"name",class:"form-label"},"收件人姓名",-1),le={class:"mb-3"},ne=e("label",{for:"tel",class:"form-label"},"收件人電話",-1),ie={class:"mb-3"},de=e("label",{for:"address",class:"form-label"},"收件人地址",-1),re={class:"mb-3"},ce=e("label",{for:"message",class:"form-label"},"留言",-1),me=e("div",{class:"text-center"},[e("button",{type:"submit",class:"btn btn-danger"},"送出訂單")],-1);function ue(o,s,v,y,a,r){const k=p("loading"),h=p("v-field"),f=p("error-message"),L=p("v-form");return i(),d(V,null,[n(k,{active:a.isLoading,"onUpdate:active":s[0]||(s[0]=t=>a.isLoading=t),"can-cancel":!0,"on-cancel":o.onCancel,"is-full-page":o.fullPage},null,8,["active","on-cancel","is-full-page"]),e("div",A,[e("div",I,[e("button",{class:"btn btn-outline-danger mt-3 mb-3",type:"button",onClick:s[1]||(s[1]=t=>r.removeAllCart())},"清空購物車")]),e("table",Q,[B,e("tbody",null,[(i(!0),d(V,null,q(a.carts.carts,t=>(i(),d("tr",{key:t.id},[e("td",null,[e("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:l=>r.removeCartItem(t.id)},[t.id===a.status.removeLoading?(i(),d("i",z)):(i(),d("div",D," x "))],8,M)]),e("td",null,[e("img",{src:t.product.imageUrl,alt:"",class:"object-fit-cover",height:"100px"},null,8,H)]),e("td",null,g(t.product.title),1),e("td",null,[e("div",R,[e("div",O,[t.qty>1?(i(),d("button",{key:0,type:"button",class:"btn btn-outline-secondary",onClick:l=>{t.qty--,r.changeCartQty(t,t.qty)},disabled:t.qty===1},"-",8,P)):(i(),d("button",{key:1,type:"button",class:"btn btn-outline-danger",onClick:l=>r.removeCartItem(t.id)},N,8,j)),C(e("input",{min:"1",type:"number",class:"form-control text-end","onUpdate:modelValue":l=>t.qty=l,disabled:t.id===a.status.cartQtyLoading,readonly:""},null,8,G),[[x,t.qty]]),e("button",{type:"button",class:"btn btn-outline-secondary",onClick:l=>{t.qty++,r.changeCartQty(t,t.qty)}},"+",8,J)])])]),e("td",K,[W,E(" "+g(t.total),1)])]))),128))]),e("tfoot",null,[e("tr",null,[X,e("td",Y,g(a.carts.total),1)]),e("tr",null,[Z,e("td",$,g(a.carts.final_total),1)])])])]),e("div",ee,[n(L,{ref:"form",class:"col-md-6",onSubmit:r.createOrder},{default:U(({errors:t})=>[e("div",te,[se,n(h,{id:"email",name:"email",type:"email",class:b(["form-control",{"is-invalid":t.email}]),placeholder:"請輸入 Email",rules:"email|required",modelValue:a.form.user.email,"onUpdate:modelValue":s[2]||(s[2]=l=>a.form.user.email=l)},null,8,["class","modelValue"]),n(f,{name:"email",class:"invalid-feedback"})]),e("div",oe,[ae,n(h,{id:"name",name:"姓名",type:"text",class:b(["form-control",{"is-invalid":t.姓名}]),placeholder:"請輸入姓名",rules:"required",modelValue:a.form.user.name,"onUpdate:modelValue":s[3]||(s[3]=l=>a.form.user.name=l)},null,8,["class","modelValue"]),n(f,{name:"姓名",class:"invalid-feedback"})]),e("div",le,[ne,n(h,{id:"tel",name:"電話",type:"text",class:b(["form-control",{"is-invalid":t.電話}]),placeholder:"請輸入電話",rules:"required|min:8|max:10",modelValue:a.form.user.tel,"onUpdate:modelValue":s[4]||(s[4]=l=>a.form.user.tel=l)},null,8,["class","modelValue"]),n(f,{name:"電話",class:"invalid-feedback"})]),e("div",ie,[de,n(h,{id:"address",name:"地址",type:"text",class:b(["form-control",{"is-invalid":t.地址}]),placeholder:"請輸入地址",rules:"required",modelValue:a.form.user.address,"onUpdate:modelValue":s[5]||(s[5]=l=>a.form.user.address=l)},null,8,["class","modelValue"]),n(f,{name:"地址",class:"invalid-feedback"})]),e("div",re,[ce,C(e("textarea",{id:"message",class:"form-control",cols:"30",rows:"10","onUpdate:modelValue":s[6]||(s[6]=l=>a.form.message=l)},null,512),[[x,a.form.message]])]),me]),_:1},8,["onSubmit"])])],64)}const pe=w(T,[["render",ue]]);export{pe as default};
