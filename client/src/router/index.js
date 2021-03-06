import Vue from 'vue';
import VueRouter from 'vue-router';
import Login from '../views/Login.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/login',
		name: 'Login',
		component: Login,
	},
	{
		path: '/signup',
		name: 'Signup',
		component: () => import('../views/Signup.vue'),
	},
	{
		path: '/main',
		name: 'Main',
		component: () => import('../views/Main.vue'),
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

export default router;
