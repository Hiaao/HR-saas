// 导出员工的路由规则
export default {
  path: '/salarys',
  component: () => import('@/layout'),
  children: [
    {
      path: '',
      name: 'salarys',
      component: () => import('@/views/salarys'),
      meta: {
        title: '工资',
        icon: 'money'
      }
    }
  ]
}

