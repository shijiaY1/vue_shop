<template>
  <div style="background-image: radial-gradient(#c3bcbc,#242222);background-size:contain;min-width: 1350px ">
    <Header></Header>
    <!--  路由组件出口的地方  -->
    <router-view></router-view>
    <!-- footer组件 在home search下是显示的 ， 在登录、注册下是隐藏的 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
//引入
import Header from './components/Header'
import Footer from './components/Footer'
//注册
export default {
  name: '',
  components:{
    Header,
    Footer
  },
  mounted() {
    //通知vuex发请求，获取数据，存储于仓库当中   ---   派发一个action | 获取商品分类的三级列表的数据
    this.$store.dispatch('categoryList')
  }
}
</script>

<style>


</style>
