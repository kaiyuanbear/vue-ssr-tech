import Todo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'

export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    // path: '/app/:id',
    path: '/app/:id',
    component: Todo,
    // component: () => import('../views/todo/todo.vue'),
    // components: {
    //   default: Todo,
    //   mi: Login
    // },
    name: 'app',
    meta: {
      title: '这是app',
      description: 'application'
    },
    props: true // 路径上的id可以作为组件中的props传入，实现$route的解耦
    // children: [
    //   {
    //     path: 'test',
    //     component: Login
    //   }
    // ]
  },
  {
    path: '/login',
    // components: {
    //   default: Login,
    //   mi: Todo
    // }
    component: () => import('../views/login/login.vue')
  }
]
