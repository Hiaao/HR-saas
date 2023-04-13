// 导出员工的路由规则
export default {
  path: '/departments',
  component: () => import('@/layout'),
  children: [
    {
      path: '',
      name: 'departments',
      component: () => import('@/views/departments'),
      meta: {
        title: '组织架构'
      }
    }
  ]
}

