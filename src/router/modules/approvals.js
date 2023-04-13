// 导出员工的路由规则
export default {
  path: '/approvals',
  component: () => import('@/layout'),
  children: [
    {
      path: '',
      name: 'approvals',
      component: () => import('@/views/approvals'),
      meta: {
        title: '审批'
      }
    }
  ]
}
