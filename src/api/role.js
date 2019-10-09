import request from '@/utils/request'

export function route(query) {
  return request({
    url: '/role/index',
    methods: 'get',
    params: query
  })
}

