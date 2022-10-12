// import pageTools from './pageTools'
// const components = [pageTools]
// export default {
//   install: function(Vue) {
//     components.forEach(ele => {
//       Vue.component(ele.name, ele)
//     })
//   }
// }
import * as filter from '@/filters'
const fn = require.context('./', true, /\.vue$/)
console.dir(fn)
const components = fn.keys().map(ele => {
  return fn(ele)
})
export default (Vue) => {
  components.forEach(element => {
    Vue.component(element.default.name, element.default)
  })
  Object.keys(filter).forEach(ele => {
    Vue.filter(ele, filter[ele])
  })
}
