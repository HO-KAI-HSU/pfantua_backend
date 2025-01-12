import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/Account.vue')
  },
  {
    path: '/regulations',
    name: 'RegulationList',
    component: () => import('../views/RegulationList.vue')
  },
  {
    path: '/regulation/:id',
    name: 'Regulation',
    component: () => import('../views/RegulationItem.vue')
  },
  {
    path: '/collageHeadElections',
    name: 'CollageHeadElectionList',
    component: () => import('../views/CollageHeadElectionList.vue')
  },
  {
    path: '/collageHeadElection/:id',
    name: 'CollageHeadElection',
    component: () => import('../views/CollageHeadElection.vue')
  },
  {
    path: '/activityHistories',
    name: 'ActivityHistoryList',
    component: () => import('../views/ActivityHistoryList.vue')
  },
  {
    path: '/activityHistory/:id',
    name: 'ActivityHistory',
    component: () => import('../views/ActivityHistory.vue')
  },
  {
    path: '/relatedResources',
    name: 'RelatedResourceList',
    component: () => import('../views/RelatedResource.vue')
  },
  {
    path: '/collageInfo',
    name: 'CollageInfo',
    component: () => import('../views/CollageInfo.vue')
  },
  {
    path: '/collageColleagues',
    name: 'CollageColleagueList',
    component: () => import('../views/CollageColleagueList.vue')
  },
  {
    path: '/collageColleague/:id',
    name: 'CollageColleague',
    component: () => import('../views/CollageColleague.vue')
  },
  {
    path: '/collageDepartment',
    name: 'CollageDepartment',
    component: () => import('../views/CollageDepartment.vue')
  },
  {
    path: '/collageCourse',
    name: 'CollageCourse',
    component: () => import('../views/CollageCourse.vue')
  },
  {
    path: '/banner',
    name: 'Banner',
    component: () => import('../views/Banner.vue')
  },
  {
    path: '/css',
    name: 'Css',
    component: () => import('../views/Css.vue')
  },
  {
    path: '/setting',
    name: 'Setting',
    component: () => import('../views/Setting.vue')
  },
  {
    path: '/news',
    name: 'NewsList',
    component: () => import('../views/NewsList.vue')
  },
  {
    path: '/news/:id',
    name: 'News',
    component: () => import('../views/News.vue')
  },
]

const router = new VueRouter({
  routes
})

export default router
