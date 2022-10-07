// import pageTools from './pageTools'
// const components = [pageTools]
// export default {
//   install: function(Vue) {
//     components.forEach(ele => {
//       Vue.component(ele.name, ele)
//     })
//   }
// }
const fn = require.context('./', true, /\.vue$/)
console.dir(fn)
const components = fn.keys().map(ele => {
  return fn(ele)
})
console.log(components)
export default (Vue) => {
  components.forEach(element => {
    Vue.component(element.default.name, element.default)
  })
}
