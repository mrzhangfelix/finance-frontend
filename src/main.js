// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {getRequest} from './utils/api'
import {postRequest} from './utils/api'
import {deleteRequest} from './utils/api'
import {putRequest} from './utils/api'
import {isNotNullORBlank} from './utils/utils'
import './utils/filter_utils'
import 'font-awesome/css/font-awesome.min.css'
import VCharts from 'v-charts'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VCharts)

Vue.prototype.getRequest = getRequest;
Vue.prototype.postRequest = postRequest;
Vue.prototype.deleteRequest = deleteRequest;
Vue.prototype.putRequest = putRequest;
Vue.prototype.isNotNullORBlank = isNotNullORBlank;


new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
})
