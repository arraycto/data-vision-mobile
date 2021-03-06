import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/main.scss'
import ECharts from 'echarts'
import VueECharts from 'vue-echarts'

Vue.config.productionTip = false
Vue.prototype.$echarts = ECharts
Vue.component('vue-echart', VueECharts)

Vue.prototype.$initMap = window.initMap
Vue.prototype.$mapv = window.mapv
Vue.prototype.$purpleStyle = window.purpleStyle
Vue.prototype.$mapvgl = window.mapvgl

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
