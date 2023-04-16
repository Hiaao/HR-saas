// 导出员工的路由规则
export default {
  path: '/social',
  component: () => import('@/layout'),
  children: [
    {
      path: '',
      name: 'social',
      component: () => import('@/views/social'),
      meta: {
        title: '社保',
        icon: 'table'
      }
    }
  ]
}

