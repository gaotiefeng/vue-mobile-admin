import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/route/index',
    methods: 'get',
    params: query
  })
}

export function del(query) {
  return request({
    url: '/route/delete',
    methods: 'post',
    params: query
  })
}
