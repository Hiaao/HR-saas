// 导出员工的路由规则
export default {
  path: '/permission',
  component: () => import('@/layout'),
  children: [
    {
      path: '',
      name: 'permission',
      component: () => import('@/views/permission'),
      meta: {
        title: '权限管理',
        icon: 'lock'
      }
    }
  ]
}

