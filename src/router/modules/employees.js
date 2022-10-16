import Layout from '@/layout'

export default {
  path: '/employees',
  component: Layout,
  children: [
    {
      path: '',
      name: 'Employees',
      component: () => import('@/views/employees/index.vue'),
      meta: { title: '员工', icon: 'people' }
    },
    {
      path: '/employees/detail/:id',
      hidden: true,
      component: () => import('@/views/employees/detail.vue')
    },
    {
      path: 'print/:id',
      hidden: true,
      component: () => import('@/views/employees/components/print.vue')
    }
  ]
}
