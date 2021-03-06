// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/vuex/store'
import func from './public/func';
import api from './public/api';

Vue.config.productionTip = false
Vue.use(ElementUI);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})

// Vue.prototype.func = func;
Vue.prototype.api = api;

Vue.prototype.Message = function(txt, type) {
    this.$message({
        showClose: true,
        message: txt,
        type: type
    });
}