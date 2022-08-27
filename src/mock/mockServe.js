//先引入 mockjs 模块
import Mock from 'mockjs';
//把JSON数据格式引入进来
import banner from './banner.json';
import floor from './floors.json';

//mock数据 Mock:对象 mock():方法 --要有两个参数：第一个参数：请求地址 | 第二个参数：请求数据
Mock.mock("/mock/banner",{code:200,data:banner}); //模拟首页大的轮播图的数据
Mock.mock("/mock/floor",{code:200,data:floor});