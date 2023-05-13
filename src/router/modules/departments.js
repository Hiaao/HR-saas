// 导出员工的路由规则
export default {
  path: '/departments',
  name: 'departments',
  component: () => import('@/layout'),
  children: [
    {
      path: '',
      component: () => import('@/views/departments'),
      meta: {
        title: '组织架构',
        icon: 'tree'
      }
    }
  ]
}

