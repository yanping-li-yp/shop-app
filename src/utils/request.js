import axios from 'axios' //封装http交互库
import qs from 'qs'
import router from '../router/index.js'

//axios请求地址
axios.defaults.baseURL = 'http://shop.ueoa.net'
//设置超时时间
axios.defaults.timeout = 5000
// post请求头

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.withcredentials = true

//请求拦截(请求发出前处理请求)
axios.interceptors.request.use((config) => {
  //const token = localStorage.getItem("adminToken")
  const token=localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = token
  }
  // Taost.loading({
	 //  message:'加载中...'
  // })
  return config;
}, (error) => {
  return Promise.reject(error);
});

// 响应拦截器（处理响应数据）
axios.interceptors.response.use(
  (res) => {
	  // Toast.clear();
    const ret = res.data
	// if (ret.code == 101){
	// 	// 直接让他退出单点登录
	// 	localStorage.setItem('token', '');
	// 	Location.href = '/login';
	// 	reject(ret.msg);
	// }
    return res
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 封装get方法
function get(url, data) {
  return new Promise((resolve, reject) => {
    axios.get(url, qs.stringify(data)).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data);
    })
  });
}

// 封装post方法
function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, qs.stringify(params)).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data);
    })
  });
}

// 封装post方法 对内方法
function del(url, params) {
  return new Promise((resolve, reject) => {
    axios.delete(url, params).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data);
    })
  });
}

// 封装post方法
function put(url, params) {
  //Promise 是es6  resolve//成功  reject、//失败 async  ...
  return new Promise((resolve, reject) => {
     //axios  method (url,data)
     //axios.put(url, params) //封装请求  统一处理 default host  请求拦截 响应拦截
    axios.put(url, params).then(res => {
      resolve(res.data);
    }).catch(err => {
      reject(err.data);
    })
  });
}

//对外接口 url：代表请求地址  method：请求方法，data：请求参数据
//调用方法：request({'http://www.baidu.com',get,[{wd:'123456'}]});
export function request({url,method,data}) {
  if (method == 'get') {
    return get(url, data);
  } else if (method == 'post') {
    return post(url, data);
  }else if (method == 'delete') {
    return del(url, data);
  }else if (method == 'put') {
    return put(url, data);
  }
}
//默认的外部接口
export default request
