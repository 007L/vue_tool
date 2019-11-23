import Vue from 'vue'
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

import {setStore} from '../common/utils/storageUtil'

export default {
  [RECEIVE_SELLER](state, {seller}){
    state.seller = seller
  },
  [RECEIVE_RATINGS](state, {ratings}){
    state.ratings = ratings
  },
  [RECEIVE_GOODS](state, {goods}){
    state.goods = goods
  },
  [INCREMENT_COUNT](state, {food}){
    if(food.count){
      food.count++
    }else{
      //添加属性
      Vue.set(food, 'count', 1)
      // food.count = 1 // 初始化时点击增加，给count赋值为 1
    }
  },
  [DECREMENT_COUNT](state, {food}){
    if(food.count>0){
      food.count--
    }
  },

  [CLEAR_CART](state, {foods}){
    foods.forEach(food => {
      food.count = 0
    })
  },

  //获取用户信息存入vuex
  [GET_USERINFO](state, {info}) {
    if (state.userInfo && (state.userInfo.username !== info.username)) {
      return
    }
    if (!state.login) {
      return
    }
    if (!info.message) {
      state.userInfo = {...info}
    } else {
      state.userInfo = null
    }
  },

  // 记录用户信息
  [RECORD_USERINFO](state, {info}) {
    state.userInfo = info;
    state.login = true
    setStore('user_id', info.user_id);
  },

}
