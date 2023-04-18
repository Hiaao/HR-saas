// 导出员工的路由规则
export default {
  path: '/setting',
  component: () => import('@/layout'),
  children: [
    {
      path: '',
      name: 'setting',
      component: () => import('@/views/setting'),
      meta: {
        title: '公司设置',
        icon: 'setting'
      }
    }
  ]
}

