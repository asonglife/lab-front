import Vue from 'vue'
import Router from 'vue-router'
import Home from 'view/home/home.vue'
import News from 'view/news/news.vue'
import Members from 'view/members/members.vue'
import Science from 'view/science/science.vue'
import Backend from 'view/backend/backend.vue'
import scienceDetail from 'view/science/scienceDetail.vue'
import Homepage from 'view/home/homepage.vue'
import membersDetail from 'view/members/membersDetail.vue'
import newsDetail from 'view/news/newsDetail.vue'
import Login from 'view/backend/login/login.vue'
import Managemember from 'view/backend/system/manage/managemember.vue'
import Managenews from 'view/backend/system/manage/managenews.vue'
import Uploadnews from 'view/backend/system/manage/uploadnews.vue'
import Managecaptial from 'view/backend/system/manage/managecaptial.vue'
import Personalcenter from 'view/backend/system/manage/personalcenter.vue'
import Captialgraph from 'view/backend/system/manage/captialgraph.vue'
Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'hash',
  routes: [{

    path: '/',
    redirect: '/homepage'
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [{
      path: '/homepage',
      name: 'Homepage',
      component: Homepage
    },
    {
      path: '/news',
      name: 'News',
      component: News
    }, {
      path: '/members',
      name: 'Members',
      component: Members

    },
    {
      path: '/science',
      name: 'Science',
      component: Science
    }, {
      path: 'membersdetail/:id',
      name: 'membersDetail',
      component: membersDetail
    }, {
      path: 'newsdetail/:id',
      name: 'newsDetail',
      component: newsDetail
    }, {
      path: 'scienceDetail/:id',
      name: 'scienceDetail',
      component: scienceDetail
    }

    ]

  }, {
    path: '/backend',
    name: 'Backend',
    component: Backend,
    meta: {
      requireAuth: true
    },
    children: [{
      path: 'managemember',
      name: 'Managemember',
      component: Managemember,
      meta: {
        requireAuth: true
      }
    },
    {
      path: 'managenews',
      name: 'Managenews',
      component: Managenews,
      meta: {
        requireAuth: true
      }
    }, {
      path: 'uploadnews',
      name: 'Uploadnews',
      component: Uploadnews,
      meta: {
        requireAuth: true
      }
    }, {
      path: 'managecaptial',
      name: 'Managecaptial',
      component: Managecaptial,
      meta: {
        requireAuth: true
      }
    }, {
      path: 'personalcenter',
      name: 'Personalcenter',
      component: Personalcenter,
      meta: {
        requireAuth: true
      }
    }, {
      path: 'captialgraph',
      name: 'Captialgraph',
      component: Captialgraph,
      meta: {
        requireAuth: true
      }

    }
    ]
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }

  ]
})
