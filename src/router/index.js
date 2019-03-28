import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import FundList from '@/components/fund/FundList'
import TodayFundJson from '@/components/fund/TodayFundJson'
import IndexInfo from '@/components/index/IndexInfo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: '主页',
      component: Home,
      children: [
        {
          path: '/fundlist',
          name: '基金实时列表',
          component: FundList
        },
        {
          path: '/todayFundJson',
          name: '今日基金配置',
          component: TodayFundJson
        },
        {
          path: '/indexInfo',
          name: '指数信息',
          component: IndexInfo
        }
      ]
    }
  ]
})
