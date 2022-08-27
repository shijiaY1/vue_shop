<template>
  <!--轮播图-->
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide imgBak" v-for="(carousel,index) in list" :key="carousel.id">
        <img :src="carousel.imgUrl"/>
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper';
export default {
  name: "Carsousel",
  props:['list'],
  watch: {
    list: {
      //立即监听,不管数据有没有变化
      immediate: true,
      handler() {
        //只能检测到数据已经有了，但是v-for动态渲染的结构我们还是没有办法完全确定的，所以还是得用到nextTick
        this.$nextTick(() => {
          var mySwiper = new Swiper(this.$refs.cur, {
            loop: true, // 循环模式选项
            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              //点击小球的时候也可以切换图片
              clickable: true,
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
          })
        })
      }
    },
  }
}
</script>

<style scoped>

</style>