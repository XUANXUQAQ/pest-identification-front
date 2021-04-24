/*
 * @Description: axios的简易封装，加载条展示
 * @Author: 蒋淦
 */

import axios from 'axios';
import { Message } from 'element-ui';
import NProgress from 'nprogress';

/**
 * 开发与生产环境的代理设置
 */
const baseURL = '/api';
// if (process.env.NODE_ENV === 'production') {
//   baseURL = 'http://rjgc.club:8087';
// }

// 创建axios实例，最多12秒的请求时延
const http = axios.create({
  timeout: 1000 * 12,
  baseURL,
});

/**
 * 请求拦截器
 */
http.interceptors.request.use(
  (config) => {
    // 请求开始时，启动加载条
    NProgress.start();
    return config;
  },
  (error) => Promise.reject(error),
);

/**
 * 响应拦截器
 */
http.interceptors.response.use(
  (config) => {
    // 请求响应时，关闭进度条
    NProgress.done();

    if (config.status === 200) {
      const { data } = config;
      const { code, result } = data;
      if (code === 20000) {
        return Promise.resolve(result);
      }
    }
    Message({
      // eslint-disable-next-line no-undef
      message: data.message,
      type: 'error',
      duration: 1000,
      showClose: true,
    });
    return Promise.reject(config);
  },
  (error) => {
    // 请求响应时，关闭进度条
    NProgress.done();
    const { response } = error;

    if (response) {
      // 请求已发出，但是不在2xx的范围
      Message({
        message: '请求发生错误',
        type: 'error',
        duration: 1000,
        showClose: true,
      });
      return Promise.reject(response);
    }
    return Promise.reject(error);
  },
);

export default http;
