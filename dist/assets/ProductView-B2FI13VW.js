import{a as v}from"./axios-CV48_vsH.js";import{_ as f,S as y,a as b,r as p,o as i,c,b as t,d as a,F as d,e as _,t as r,g as l,C as L,E as T,w as m,y as g}from"./index-BZpAAvGB.js";import{c as k}from"./cartStore-DF1bjGJI.js";var V={VITE_URL:"https://vue3-course-api.hexschool.io/v2",VITE_PATH:"joychiang",BASE_URL:"/production-sub-path/",MODE:"production",DEV:!1,PROD:!0,SSR:!1};const{VITE_URL:w,VITE_PATH:x}=V,C={data(){return{qty:1,product:{},isLoading:!1}},watch:{product(){this.qty=1}},methods:{getProduct(){const n=this.$route.params.productId;this.isLoading=!0,v.get(`${w}/api/${x}/product/${n}`).then(s=>{this.product=s.data.product,this.isLoading=!1}).catch(s=>{y.fire(s.response.data.message),this.isLoading=!1})},...b(k,["addToCart"])},mounted(){this.getProduct()}},E={class:"container"},S={class:"mt-4 mb-9 row"},P={class:"col-md-6 text-center"},R=["src"],U={class:"col-md-6 mt-4 mb-7 text-secondary"},q={class:"mb-3"},D={class:"text-danger"},I={class:"text-secondary h6"},N={class:"input-group"},A=["value"];function B(n,s,M,j,e,F){const h=p("loading"),u=p("RouterLink");return i(),c(d,null,[t("div",null,[a(h,{active:e.isLoading,"onUpdate:active":s[0]||(s[0]=o=>e.isLoading=o),"can-cancel":!0,"on-cancel":n.onCancel,"is-full-page":n.fullPage},null,8,["active","on-cancel","is-full-page"]),(i(!0),c(d,null,_(n.categories,o=>(i(),c("li",{key:o},[a(u,{to:`/products?category=${o}`,class:"nav-item nav-link text-nowrap px-2"},{default:m(()=>[l(r(o),1)]),_:2},1032,["to"])]))),128))]),t("div",E,[t("div",S,[t("div",P,[t("img",{src:e.product.imageUrl,alt:"產品圖片",class:"object-fit-cover",height:"351px"},null,8,R)]),t("div",U,[t("h2",q,r(e.product.title),1),t("p",null,r(e.product.description),1),t("p",null,r(e.product.content),1),t("h5",D,[t("del",I,"NT$"+r(e.product.origin_price),1),l(" NT$"+r(e.product.price),1)]),t("div",N,[L(t("select",{name:"",id:"",class:"form-select mb-3","onUpdate:modelValue":s[1]||(s[1]=o=>e.qty=o)},[(i(),c(d,null,_(20,o=>t("option",{value:o,key:o},r(o),9,A)),64))],512),[[T,e.qty]])]),a(u,{to:"/cart",class:"btn btn-outline-secondary btn-block rounded-0 py-2",onClick:s[2]||(s[2]=g(o=>n.addToCart(e.product.id),["prevent"]))},{default:m(()=>[l("直接購買")]),_:1}),t("a",{class:"btn btn-secondary btn-block rounded-0 py-2",onClick:s[3]||(s[3]=g(o=>n.addToCart(e.product.id,e.qty),["prevent"]))},"加入購物車")])])])],64)}const G=f(C,[["render",B]]);export{G as default};
