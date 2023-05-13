// 导出员工的路由规则
export default {
  path: '/employees',
  name: 'employees',
  component: () => import('@/layout'),
  children: [
    {
      path: '', // 默认路由，表示/employees同时显示layout还有员工主页
      component: () => import('@/views/employees'),
      //  路由元信息，存储数据的地方，可以存储任何内容
      meta: {
        title: '员工管理', // 左侧导航会读取这里的title属性
        icon: 'people'
      }
    },
    {
      path: 'detail/:id', // : 表示动态传参，? 表示该参数可传可不传
      component: () => import('@/views/employees/detail'),
      hidden: true, // 不在左侧菜单显示
      meta: {
        title: '员工详情' // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
      }
    },
    {
      path: 'print/:id',
      component: () => import('@/views/employees/print'),
      hidden: true
    }
  ]
}
