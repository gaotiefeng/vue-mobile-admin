import request from '@/utils/request'

/**
 * @param {*} query 
 */
export function index(query) {
  return request({
    url: '/admin/index',
    method: 'get',
    params: query,
  })
}