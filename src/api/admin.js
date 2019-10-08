import request from '@/utils/request'

export function getList(query) {
  return request({
    url: 'admin/index',
    method: 'get',
    params: query
  })
}
