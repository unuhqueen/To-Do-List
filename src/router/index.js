import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.

    // arrow function, arrow 뒤에가 함수 내용
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/test2",
    name: "Test2",
    component: () =>
      import(/* webpackChunkName: "test" */ "../views/Test2.vue"),
  },
  {
    path: "/test3",
    name: "Test3",
    component: () =>
      import(/* webpackChunkName: "test" */ "../views/Test3.vue"),
  },
];

const router = new VueRouter({
  // 새로고침 없이 연속적으로 렌더링, index.html로 request를 보내서 url에 맞는 해당 component를 연다.
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
