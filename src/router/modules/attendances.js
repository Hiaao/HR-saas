// 导出员工的路由规则
export default {
  path: '/attendances',
  component: () => import('@/layout'),
  children: [
    {
      path: '',
      name: 'attendances',
      component: () => import('@/views/attendances'),
      meta: {
        title: '考勤'
      }
    }
  ]
}

