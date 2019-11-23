import {
  RECEIVE_SELLER,
  RECEIVE_RATINGS,
  RECEIVE_GOODS,
  INCREMENT_COUNT,
  DECREMENT_COUNT,
  CLEAR_CART,
  GET_USERINFO,
  RECORD_USERINFO
} from './mutations-type'
import {
  requestSeller,
  requestRatings,
  requestGoods,
  getUser
} from '../api'

export default {
  // 发送请求函数编写在api文件中，actions文件只需调用对应的ajax请求
  async requestSeller({commit}, cb){
    //同步编写代码，异步执行
    const result = await requestSeller()
    if(result.code === 0){
      const seller = result.data
      commit(RECEIVE_SELLER, {seller})
      cb && cb()
    }
  },
  async requestRatings({commit}, cb){
    const result = await requestRatings()
    if(result.code === 0){
      const ratings = result.data
      commit(RECEIVE_RATINGS, {ratings})
      cb && cb()
    }
  },
  async requestGoods({commit}, cb){
    const result = await requestGoods()
      if(result.code === 0){
        const goods = result.data
        commit(RECEIVE_GOODS, {goods})
        cb && cb()
      }
  },

  updateFoodCount({commit}, {food, isAdd}){
    if(isAdd){
      commit(INCREMENT_COUNT, {food})
    }else {
      commit(DECREMENT_COUNT, {food})
    }
  },

  clearCart({commit}, foods){
    commit(CLEAR_CART, {foods})
  },

  async getUserInfo({commit, state}) {
    const info = await getUser()
    commit(GET_USERINFO, {info})
  },

  recordUserinfo({commit}, info) {
    commit(RECORD_USERINFO, {info})
  },
}
