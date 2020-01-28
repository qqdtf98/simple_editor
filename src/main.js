import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
// import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/css/mdb.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import VueHighlightJS from 'vue-highlightjs'
import hljs from 'highlight.js/lib/highlight'; 
import javascript from 'highlight.js/lib/languages/javascript';
 import css from 'highlight.js/lib/languages/css';
 import html from 'highlight.js/lib/languages/xml'; 
 
 hljs.registerLanguage('javascript', javascript);
 hljs.registerLanguage('css', css);
hljs.registerLanguage('html', html);


Vue.use(VueHighlightJS);
Vue.use(BootstrapVue)

Vue.config.productionTip = false

export const eventBus = new Vue()
new Vue({
  render: h => h(App)
}).$mount('#app')
