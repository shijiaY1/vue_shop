//vuex
import Vue from 'vue';
import Vuex from 'vuex'
//需要使用插件一次
Vue.use(Vuex);
//引入小仓库
import home from './home';
import search from './search';
import detail from './detail';
import shopcart from "@/store/shopcart/shopcart";
import user from "@/store/user/user";
import trade from "@/store/trade/trade";
//对外暴露Store类的一个实例
export default new Vuex.Store({
    //实现vuex仓库模块式开发存储数据
    modules: {
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
});

/*
export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
});



    //基本核心组件
    //仓库存储数据的地方
    const state = {
        count:1
    };
    //修改state的唯一手段
    const mutations = {
        ADD(state,count){
            state.count++;
        },
        REDUCE(state,count){
            state.count--;
        }
    };
    //处理action的地方，可以书写自己的业务与逻辑，也可以处理异步
    const actions = {
        //这里可以书写业务逻辑，但是不能修改state  --三连环
        add({commit}){
            commit('ADD');
        },
        reduce({commit}){
            commit('REDUCE')
        }
    };
    //理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
    const getters = {};
*/