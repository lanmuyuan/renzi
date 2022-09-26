import request from '@/utils/request'
/**
 *  登录请求接口
 * @param {Object} data
 * @returns Promise
 */
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'POST',
    data
  })
}
