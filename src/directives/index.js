export const imgerror = {
  inserted(el, banding, vnode) {
    // 绑定的dom元素
    console.log(el)
    // 指令的相关信息
    console.log(banding)
    // 虚拟dom元素
    console.log(vnode)
    el.onerror = function() {
      el.src = banding.value
    }
  }
}
