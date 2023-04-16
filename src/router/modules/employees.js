// 导出员工的路由规则
export default {
  path: '/employees',
  component: () => import('@/layout'),
  children: [
    {
      path: '', // 默认路由，表示/employees同时显示layout还有员工主页
      name: 'employees',
      component: () => import('@/views/employees'),
      //  路由元信息，存储数据的地方，可以存储任何内容
      meta: {
        title: '员工管理', // 左侧导航会读取这里的title属性
        icon: 'people'
      }
    }
  ]
}
