import {reqCategoryList, reqGetBannerList, reqGetFloorList} from "@/api";
//home模块的小仓库
const state = {
    //state中数据的默认初始值不能乱写，服务器返回的是对象，起始值就是对象，返回数组，起始值是数组。初始值是根据接口的返回值初始化的
    categoryList: [],
    //轮播图的数据
    bannerList: [],
    //floor轮播图数据
    floorList: [],
};
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    },
    GETFLOORLIST(state, floorList) {
        state.floorList = floorList;
    }
};
const actions = {
    //通过api里面的接口函数调用，向服务器发送请求，获取服务器数据
    async categoryList({commit}) {
        let result = await reqCategoryList();
        //console.log(result);
        if (result.code === 200) {
            //提交commit
            commit("CATEGORYLIST", result.data);
        }
    },
    //获取首页轮播图的数据
    async getBannerList({commit}) {
        let result = await reqGetBannerList();
        if (result.code === 200) {
            commit('GETBANNERLIST', result.data);
        }
    },
    //获取floor轮播图的数据
    async getFloorList({commit}) {
        let result = await reqGetFloorList();
        if (result.code === 200) {
            //提交到mutation
            commit('GETFLOORLIST',result.data);
        }
    }
};
//计算属性
const getters = {};

//对外暴露
export default {
    state,
    mutations,
    actions,
    getters
}