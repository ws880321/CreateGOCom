import Vue from 'vue'
import App from './App.vue'
import router from './router'
import echarts from 'echarts'
import store from './store'
import './plugins/ant-design-vue.js'
Vue.prototype.$echarts = echarts

import { createComponent, runtimeServer } from "./assets/js/go-coms.es5.js";

runtimeServer.setAppStore(store);
Vue.prototype.createComponent = createComponent;  //创建组件实例方法
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
