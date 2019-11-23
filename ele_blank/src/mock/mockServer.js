import Mock from 'mockjs'
//引入json数据
import data from './data.json'

// Mock.mock('url', 模板)
Mock.mock('/api1/goods', {
  code: 0,
  data: data.goods
})
Mock.mock('/api1/ratings', {
  code: 0,
  data: data.ratings
})
Mock.mock('/api1/seller', {
  code: 0,
  data: data.seller
})

// export default xxx  不用暴露，只需入口文件引入，即加载整个文件
