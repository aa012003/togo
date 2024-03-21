/* eslint-disable vue/multi-word-component-names */
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faLine, faFacebookSquare, faInstagram, fab,
} from '@fortawesome/free-brands-svg-icons';
import {
  faShoppingCart, faMagnifyingGlass, faPlus, faMinus,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import './assets/all.scss';
import { date, currency } from '@/methods/filters';
// VeeValidate
import {
  Field, Form, ErrorMessage, configure, defineRule,
} from 'vee-validate';
import * as AllRules from '@vee-validate/rules/dist/vee-validate-rules.esm';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

import App from './App.vue';
import router from './router';

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

configure({
  generateMessage: localize({ zh_TW: zhTW }),
  validateOnInput: true,
});
setLocale('zh_TW');

const app = createApp(App);
library.add(
  faShoppingCart,
  faPlus,
  faMinus,
  faInstagram,
  faFacebookSquare,
  faMagnifyingGlass,
  faLine,
);
app.config.globalProperties.$filters = {
  date,
  currency,
};
app.use(createPinia());
app.use(router);
app.component('VField', Field);
app.component('VForm', Form);
app.component('ErrorMessage', ErrorMessage);
app.mount('#app');
app.component('font-awesome-icon', FontAwesomeIcon, fab);
app.component('Loading', Loading);
