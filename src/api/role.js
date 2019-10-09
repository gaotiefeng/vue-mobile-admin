import request from '@/utils/request'

export function getList(query) {
  return request({
    url: '/role/index',
    methods: 'get',
    params: query
  })
}

export function del(query) {
  return request({
    url: '/role/delete',
    methods: 'post',
    params: query
  })
}

