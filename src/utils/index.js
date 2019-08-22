/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {null}
 */
export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) {
    return {}
  }
  return JSON.parse(
    '{"' +
    decodeURIComponent(search)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace(/\+/g, ' ') +
    '"}'
  )
}

/**
 * @param {Object} obj
 */
export function obj2Param(obj) {
  var paramArray = [];
  for (let key in obj) {
    paramArray.push(key + "=" + obj[key]);
  }
  let j = paramArray.join("&");
  return j;
}

/**
 * 获取流数据
 * @param url
 * @param data
 * @param method
 * @param success
 * @param fail
 */
export function getFlowFile(url, data, method, success, fail) {
  var xhr = new XMLHttpRequest();
  xhr.responseType = "blob";
  if (method.toUpperCase() === 'POST') {
    xhr.open(method, url, true);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(data));
  }
  if (method.toUpperCase() === 'GET') {
    xhr.open(method, url, true);
    xhr.send();
  }
  xhr.onload = function () {
    if (this.status === 200) {
      success(this.response);
    } else {
      fail(this.response);
    }
  }
}

/**
 * 将流数据转换成base64数据
 * @param data
 * @param success
 */
export function blobToBase64Img(data, success) {
  var reader = new FileReader();
  // 完整的base64 数据
  reader.readAsDataURL(data);
  reader.onloadend = function () {
    var base64 = this.result;
    success(base64);
  }
}

/**
 *description: 判断手机号
 *@return: true: 正确  false：错误
 */
export function checkPhone (phone) {
  return /^1[3|4|5|6|8|7|9][0-9]\d{8}$/.test(phone);
}
