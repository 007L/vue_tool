import axios from 'axios'

export default async function ajax(url='', data={}, type='GET') {
  return new Promise(function (resolve, reject) {
      let promise
      //整合请求参数（query参数数据）
      if(type === 'GET'){
        let dataStr = '' //数据拼接字符串
        Object.keys(data).forEach(key => {
          dataStr += key + '=' + data[key] + '&'
      })
      if (dataStr !== '') {
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'))
        url = url + '?' + dataStr
      }

      promise = axios.get(url)
    }else {
      promise = axios.post(url, data)
    }

    promise.then(response => {
              resolve(response.data)
            })
            .catch(error => {
              reject(error)
            })
  })
}

