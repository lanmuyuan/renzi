import Layout from '@/layout'

export default {
  path: '/social',
  component: Layout,
  children: [
    {
      path: '',
      name: 'Social',
      component: () => import('@/views/social/index.vue'),
      meta: { title: '社保', icon: 'table' }
    }
  ]
}
