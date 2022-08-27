// 模拟数据源的Ajax
//对于axios进行二次封装
//先引进axios
import axios from "axios";
//引入nprogress进度条
//引入进度条样式
import nprogress from 'nprogress';
import "nprogress/nprogress.css";
//打印出来的start方法代表进度条开始  done：代表进度条结束
//console.log(nprogress);



//1.利用axios对象的方法 create 去创建一个axios实例
//2.request就是axios，只不过要稍微配置一下
const requests = axios.create({
    //配置对象  发送请求时，让接口的路径中都带有/api
    //作用：让： http://xxx.xxx:8080  -->  http://xxx.xxx:8080/api  (会默认在相应位置上带上api)
    baseURL:"/mock",
    //代表请求超时的时间为5s
    timeout:5000,

});
//请求拦截器，在发请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些处理
requests.interceptors.request.use((config)=>{

    //进度条开始
    nprogress.start();
    //config 是一个配置对象，对象里面有一个属性很重要，header请求头
    return config;
});

//响应拦截器 相应成功/失败的回调
requests.interceptors.response.use((res)=>{
    //进度条结束
    nprogress.done();
    //服务器成功的回调函数，服务器相应数据回来以后，相应拦截器可以检测到，可以做一些事情
    return res.data;
},(error)=>{
    //服务器响应失败的回调函数 终止promise
    return Promise.reject(new Error("false"));
});

//对外暴露
export default  requests;