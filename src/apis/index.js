import service from '@/utils/request'

export function getData () {
  return service({
    url: '/screen/mobile',
    method: 'get'
  })
}
