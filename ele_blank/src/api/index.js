/*import axios from 'axios'
export function requestSeller(){
    return axios.get('/api1/seller')
}
export function requestRatings(){
    return axios.get('/api1/ratings')
}
export function requestGoods(){
    return axios.get('/api1/goods')
}*/
import ajax from './ajax'
import fetch from './fetch'

export const requestSeller = ()=> ajax('/api1/seller')
export const requestRatings = ()=> ajax('/api1/ratings')
export const requestGoods = ()=> ajax('/api1/goods')

/**
 * 获取用户信息(根据会话)
 */
export const getUser = () => fetch('/v1/user')

/**
 * 获取msite商铺列表(根据经纬度)
 */
export const getShopList = (latitude, longitude) => fetch('/shopping/restaurants', {latitude, longitude})

/**
 * 获取msite页面地址信息(根据经纬度串)
 */
export const msiteAdress = geohash => fetch('/v2/pois/' + geohash)

/**
 * 获取msite页面食品分类列表
 */
export const msiteFoodTypes = geohash => fetch('/v2/index_entry', {
  geohash,
  group_type: '1',
  'flags[]': 'F'
})

/**
 * 获取图片验证码
 */
export const getcaptchas = () => fetch('/v1/captchas', {}, 'POST')

/**
 * 账号密码登录
 */
export const accountLogin = (username, password, captcha_code) => fetch('/v2/login', {
  username,
  password,
  captcha_code
}, 'POST')


/*注意: 下面2个接口不可用*/

/**
 * 获取短信验证码
 */
export const mobileCode = phone => ajax('/test/sendcode', {phone})

/**
 * 手机号登录
 */
export const phoneLogin = (phone, code) => ajax('/test/login', {phone, code}, 'POST')



