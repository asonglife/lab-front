import Vue from 'vue'
import Router from 'vue-router'
import Home from 'view/home/home.vue'
import News from 'view/news/news.vue'
import Members from 'view/members/members.vue'
import Science from 'view/science/science.vue'
import Backend from 'view/backend/backend.vue'
import Homepage from 'view/home/homepage.vue'
Vue.use(Router)

export default new Router({
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

    }, {
      path: '/backend',
      name: 'Backend',
      component: Backend
    },
    {
      path: '/science',
      name: 'Science',
      component: Science
    }

    ]

  }
  ]
})
