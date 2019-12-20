import axios from 'axios';
import { getUserInfo } from './auth.service';
import { Message } from 'element-ui';
import configService from './config.service';
import router from '@/router'
const url = configService.domain;

// 创建一个axios
const requestService = axios.create({
  baseURL: url
});

/**
 * 请求拦截
 */
requestService.interceptors.request.use(config => {
  // 不是登录页面，请求头加上token值
  if (config.url !== '/login') {
    config.headers['x-auth-token'] = JSON.parse(getUserInfo()).token;
    config.headers['x-project-id'] = JSON.parse(getUserInfo()).projectId;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

/**
 * 响应拦截
 */
requestService.interceptors.response.use(
  response => {
    const res = response.data;
    if (res.code === '401') {
      router.push({ name: '401' })
    } else {
      return res;
    }
  },
  // 成功后的回调
  error => {
    console.log('err' + error); // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default requestService;
