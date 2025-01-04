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
    path: '/lessons',
    name: 'LessonList',
    component: () => import('../views/LessonList.vue')
  },
  {
    path: '/lesson/:id',
    name: 'Lesson',
    component: () => import('../views/Lesson.vue')
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
    path: '/members',
    name: 'MemberList',
    component: () => import('../views/MemberList.vue')
  },
  {
    path: '/member/:id',
    name: 'Member',
    component: () => import('../views/Member.vue')
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
