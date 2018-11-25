import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
//import VueSweetalert2 from 'vue-sweetalert2';
Vue.use(VueRouter)

const HomeLayout = Vue.component('HomeLayout',require('./components/layout/home.vue'));
const Profile = Vue.component('Profile',require('./components/layout/profile.vue'));
const Admin = Vue.component('Admin',require('./components/layout/admin.vue'));
const routes = [
    {
        name: 'HomeLayout',
        path: '/',
        component: HomeLayout
    },
    {
        name: 'Profile',
        path: '/profile',
        component: Profile
    },
    {
        name: 'Admin',
        path: '/admin',
        component: Admin
    }
]

const router = new VueRouter({mode: 'history', routes: routes});

router.beforeEach((to, from, next) => {

    // check if the route requires authentication and user is not logged in
    if (to.matched.some(route => route.meta.requiresAuth) && !store.state.isLoggedIn) {
        // redirect to login page
        next({ name: 'HomeLayout' })
        return
    }

    if(to.path === '/profile' && !store.state.isLoggedIn) {
        next({ name: 'HomeLayout' })
        return
    }
    if(to.path === '/admin' && !store.state.isLoggedIn) {
        next({ name: 'HomeLayout' })
        return
    }
    next()
})

export default router