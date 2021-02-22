import axios from 'axios'

export function getCountries() {
  return axios({
    url: '/common/countryData',
    method: 'get'
  })
}