import request from '@/utils/request'

export function route(query) {
  return request({
    url: '/route/index',
    methods: 'get',
    params: query
  })
}

