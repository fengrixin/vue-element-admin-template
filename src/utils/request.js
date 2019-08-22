import axios from 'axios'
import {MessageBox, Message} from 'element-ui'
import store from '@/store'
import {getToken} from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})
const debug = true

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (debug) {
      console.log('----- ' + config.method + ' request -----')
      console.log(config.baseURL + config.url)
      if (config.method == 'get') {
        // if (config.params) console.log(JSON.stringify(config.params, null, '\t')); // 格式化输出
        if (config.params) console.log(config.params)
      } else {
        // if (config.data) console.log(JSON.stringify(config.data, null, '\t')); // 格式化输出
        if (config.data) console.log(config.data)
      }
    }

    if (store.getters.token) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['X-Token'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    if (debug) {
      console.log('----- response -----')
      // console.log(JSON.stringify(response.data, null, '\t')); // 格式化输出
      console.log(response.data)
    }

    if (response.data.code === 20000) {
      return response.data
    } else {
      Message({
        message: response.data.msg,
        type: 'error',
        duration: 3 * 1000
      })
      if (response.data.code === -1 || response.data.code === 500) {
        store.dispatch('user/resetToken')
        router.push('/login')
      }
      return Promise.reject(response.data)
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service

/**
 * 封装 GET 请求
 * @param params
 * @returns {Promise<any>}
 */
export function get(params) {
  return new Promise((resolve, reject) => {
    service.get(params.url, {
      params: params.data ? params.data : {}
    }).then(res => {
      if (res.code === 200) {
        resolve(res.data)
      } else {
        resolve(res)
      }
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 封装 POST 请求
 * @param params
 * @returns {Promise<any>}
 */
export function post(params) {
  return new Promise((resolve, reject) => {
    service.post(params.url, params.data ? params.data : {})
      .then(res => {
        if (res.code === 200) {
          resolve(res.data)
        } else {
          resolve(res)
        }
      }).catch(err => {
        reject(err)
      }
    )
  })
}

/**
 * 封装 PUT 请求
 * @param params
 * @returns {Promise<any>}
 */
export function put(params) {
  return new Promise((resolve, reject) => {
    service.put(params.url, params.data ? params.data : {})
      .then(res => {
        if (res.code === 200) {
          resolve(res.data)
        } else {
          resolve(res)
        }
      }, err => {
        reject(err)
      })
  })
}

/**
 * 封装 DELETE 请求
 * @param params
 * @returns {Promise<any>}
 */
export function del(params) {
  return new Promise((resolve, reject) => {
    service.delete(params.url, {
      data: params.data ? params.data : {}
    }).then(res => {
      if (res.code === 200) {
        resolve(res.data)
      } else {
        resolve(res)
      }
    }, err => {
      reject(err)
    })
  })
}
