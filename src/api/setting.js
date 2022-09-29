import request from '@/utils/request'
/**
 * 获取角色列表信息
 * @param {Object} params
 * @returns Promise
 */
export function getRoleList(params) {
  return request({
    url: '/sys/role',
    params
  })
}
/**
 * 新增角色
 * @param {Object} data
 * @returns Promise
 */
export function addRole(data) {
  return request({
    url: '/sys/role',
    method: 'POST',
    data
  })
}
/**
 * 编辑角色
 * @param {Object} data
 * @returns Promise
 */
export function updateRole(data) {
  return request({
    url: `/sys/role/${data.id}`,
    data,
    method: 'put'
  })
}
export function deleteRole(id) {
  return request({
    url: `/sys/role/${id}`,
    method: 'delete'
  })
}
export function getCompanyInfo(companyId) {
  return request({
    url: `/company/${companyId}`
  })
}
