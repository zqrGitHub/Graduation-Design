import Vue from "vue";
import VueRouter from "vue-router";
// import HomeView from '../views/HomeView.vue'
// 学生界面的路由
import Login from "../views/login.vue";
import home from "../views/student/home.vue";
import PersonalInformation from "../views/student/personalInformation.vue";
import ssxx from "../views/student/ssxx.vue";
import shbx from "../views/student/shbx.vue";
import bxsq from "../views/student/bxsq.vue";
import qjsq from "../views/student/qjsq.vue";
import wcqj from "../views/student/wcqj.vue";
import xyk from "../views/student/xyk.vue";
import Welcome from "../views/Welcome.vue";
// 管理员界面路由
import AdminHome from "../views/admin/adminhome.vue";
import AdInformation from "../views/admin/adInformation.vue";
import Adlygl from "../views/admin/lygl.vue";
import Adyhxq from "../views/admin/yhqx.vue";
import Adxsgl from "../views/admin/xsgl.vue";
import Adbxsq from "../views/admin/bxsq.vue";
import Adqjsq from "../views/admin/qjsq.vue";
import Adsspf from "../views/admin/sspf.vue";
// 404报错
import NotFound from "../components/NotFound.vue";
// 测试页面
import Test from "../views/test.vue";

Vue.use(VueRouter);

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  // 管理员路由
  {
    path: "/adminhome",
    name: "adminhome",
    component: AdminHome,
    redirect: "/adminhome/adgrxx",
    children: [
      {
        path: "adgrxx",
        name: "AdInformation",
        component: AdInformation,
      },
      {
        path: "adlygl",
        name: "Adlygl",
        component: Adlygl,
      },
      {
        path: "adyhqx",
        name: "adyhqx",
        component: Adyhxq,
      },
      {
        path: "adxsgl",
        name: "adxsgl",
        component: Adxsgl,
      },
      {
        path: "adbxsq",
        name: "adbxsq",
        component: Adbxsq,
      },
      {
        path: "adqjsq",
        name: "adqjsq",
        component: Adqjsq,
      },
      {
        path: "adxyk",
        name: "xyk",
        component: xyk,
      },
      {
        path: "adsspf",
        name: "adsspf",
        component: Adsspf,
      },
    ],
  },
  // 学生路由
  {
    path: "/home",
    name: "home",
    component: home,
    redirect: "/home/welcome", //路由重定向
    children: [
      {
        path: "welcome",
        name: "Welcome",
        component: Welcome,
      },
      {
        path: "grxx",
        name: "PersonalInformation",
        component: PersonalInformation,
      },
      {
        path: "ssxx",
        name: "ssxx",
        component: ssxx,
      },
      {
        path: "shbx",
        name: "shbx",
        component: shbx,
      },
      {
        path: "bxsq",
        name: "bxsq",
        component: bxsq,
      },
      {
        path: "qjsq",
        name: "qjsq",
        component: qjsq,
      },
      {
        path: "wcqj",
        name: "wcqj",
        component: wcqj,
      },
      {
        path: "xyk",
        name: "xyk",
        component: xyk,
      },
    ],
  },
  {
    path: "/test",
    name: "test",
    component: Test,
  },
  // 404匹配
  { path: "/:pathMatch(.*)*", name: "NotFound", component: NotFound },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// 前置路由守卫(判断是否登陆)
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("username");
  const adtoken = localStorage.getItem("adminusername");
  if (!token && !adtoken && to.path != "/") {
    return next({ path: "/" });
  }
  next();
});

export default router;
