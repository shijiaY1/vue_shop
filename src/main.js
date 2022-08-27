import Vue from 'vue'
import App from './App.vue'
//三级联动组件---全局组件
import TypeNav from '@/components/TypeNav';

//第一个参数：全局组件的名字，第二个参数：哪一个组件    TypeNav.name获取组件名字
Vue.component(TypeNav.name, TypeNav)


//引入路由：
import router from '@/router';
//Vue.config.productionTip = false

//引入仓库
import store from '@/store';

//引入MockServer.js --- mock（虚拟）数据
import '@/mock/mockServe';

//引入swiper样式
import "swiper/css/swiper.css"

//引入全局组件Carsousel
import Carsousel from "@/components/Carousel"
//注册全局组件Carsousel
Vue.component(Carsousel.name, Carsousel);

//统一接口api文件夹里面全部请求函数
//统一引入
import * as API from '@/api';

//引入分页器
import Pagination from '@/components/Pagination'

//引入element-ui
import {Button, MessageBox} from 'element-ui';

import atm from '@/assets/lazy.jpg'
//引入vue-lazyload
import VueLazyload from 'vue-lazyload'
//注册插件
Vue.use(VueLazyload,{
    //懒加载默认的图片
    loading:atm
});

//引入自定义插件
import myPlugins from '@/pages/plugins/myPlugins';
Vue.use(myPlugins,{
    name:'upper'
});


Vue.component(Button.name, Button);
//ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;


//注册分页器
Vue.component(Pagination.name, Pagination);
new Vue({
    render: (h) => h(App),

    //全局事件总线$bus的配置
    beforeCreate() {
        Vue.prototype.$bus = this;
        Vue.prototype.$API = API;
    },


    //注册路由:底下的写法是KV一致省略V【router 小写的】
    //注册路由信息：当这里书写router的时候，组件身上都拥有$route，$router属性
    router,
    //注册仓库 组件实例的身上会多一个$store属性
    store,
}).$mount('#app')

//引入表单校验插件
import "@/pages/plugins/validate";
new Vue({
    render: (h) => h(App),
    //全局事件总线$bus配置
    beforeCreate() {
        Vue.prototype.$bus = this;
        Vue.prototype.$API = API;
    },
    //需要把router进行注册
    //可以让全部的组件（非路由|路由组件）都可以获取到$route|$router属性
    //$route(路由)：可以获取到路由信息（path、query、params）
    //$router:进行编程式导航路由跳转push||replace
    router,
    //在入口文件这里注册store,在每一个组件的身上都拥有一个$store这个属性
    store,
}).$mount("#app");

/*
{
    render:h=>h(App)
}
--------> 等价于
{
    render:function(creatElement){
        return creatElement(App);
    }
}

总结
1、ES6的写法，表示Vue实例选项对象的render方法作为一个函数，接受传入的参数h函数，返回h(App)的函数调用结果
2、Vue在创建Vue实例时，通过调用render方法来渲染实例的DOM树
3、Vue在调用render方法时，会传入一个createElement函数作为参数，也就是这里的h的实参是createElement函数，然后createElement会以App为参数进行调用

//测试
import {reqCategoryList} from "@/api";
reqCategoryList();
*/