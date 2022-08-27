<template>
  <!--列表-->
  <div class="list-container">
    <div class="sortList clearfix">
      <div class="center">
        <Carsousel :list="bannerList"/>
      </div>
      <div class="right">
        <div class="news">
          <h4>
            <em class="fl">商城快报</em>
            <span class="fr tip">更多 ></span>
          </h4>
          <div class="clearix"></div>
          <ul class="news-list unstyled">
            <li>
              <span class="bold">[公告]</span> 张文宏谈未来抗疫要有三个武器
            </li>
            <li>
              <span class="bold">[新闻]</span> 就长这个样子？iPhone 14外观再曝：这个感叹号不能忍！
            </li>
            <li>
              <span class="bold">[新闻]</span> 土坑酸菜被点名 康师傅回应
            </li>
            <li>
              <span class="bold">[特惠]</span> 今日买手机送贴膜服务
            </li>
            <li>
              <span class="bold">[动态]</span> 动作RPG游戏《艾尔登法环》上线
            </li>
            <li>
              <span class="bold">[新闻]</span> 罗永浩称债务还得七七八八：新公司不叫锤子！
            </li>
          </ul>
        </div>
        <ul class="lifeservices">
          <li class=" life-item ">
            <i class="list-item"></i>
            <span class="service-intro">话费</span>
          </li>
          <li class=" life-item ">
            <i class="list-item"></i>
            <span class="service-intro">机票</span>
          </li>
          <li class=" life-item ">
            <i class="list-item"></i>
            <span class="service-intro">电影票</span>
          </li>
          <li class=" life-item ">
            <i class="list-item"></i>
            <span class="service-intro">游戏</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">彩票</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">加油站</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">酒店</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">火车票</span>
          </li>
          <li class=" life-item ">
            <i class="list-item"></i>
            <span class="service-intro">众筹</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">理财</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">礼品卡</span>
          </li>
          <li class=" life-item">
            <i class="list-item"></i>
            <span class="service-intro">白条</span>
          </li>
        </ul>
<!--        <div class="ads">
          <img src="../image/ad1.png"/>
        </div>-->
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex';
// import Swiper from 'swiper';

export default {
  name: "ListContainer",
  mounted() {
    //派发action：通过vuex发起ajax请求，将数据存储在仓库当中
    this.$store.dispatch('getBannerList');
  },
  computed: {
    ...mapState({
      bannerList: state => state.home.bannerList
    })
  },
/*  watch: {
    //监听bannerList数据的变化 -- 由一个空数组变为数组里面有四个元素
    //对象写法
    bannerList: {
      immediate: true,
      //回调函数
      handler(newValue, oldValue) {
        //通过watch监听bannerList属性的属性值的变化
        //如果执行了handler方法了，代表我们组件实例身上这个属性的属性值已经有了【数组：四个元素】
        this.$nextTick(() => {
          //当我们已经执行这个回调的时候：保证服务器数据已经回来了，v-for也已经执行完毕了【轮播图的结构一定有了】
          var mySwiper = new Swiper(this.$refs.mySwiper, {
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
        });
      }
    }
  }*/
}
</script>

<style scoped lang="less">
.list-container {
  width: 1200px;
  margin: 0 auto;

  .sortList {
    height: 464px;
    padding-left: 210px;

    .center {
      box-sizing: border-box;
      width: 740px;
      height: 100%;
      padding: 2px;
      border-bottom: 2px solid #000000;
      float: left;
      transition: all 1s;
    }
    .center:hover {
      opacity: 0.8;
      cursor: pointer;
    }

    .right {
      float: left;
      width: 250px;
      padding-top: 5px;

      .news {
        border: 1px solid #e4e4e4;
        margin-top: 5px;

        h4 {
          border-bottom: 1px solid #e4e4e4;
          padding: 5px 10px;
          margin: 5px 5px 0;
          line-height: 22px;
          overflow: hidden;
          font-size: 14px;

          .fl {
            float: left;
            font-size: 16px;
            font-weight:bolder;
            color: #e3d8d8;
          }

          .fr {
            float: right;
            font-size: 12px;
            color: #d4bebe;
            cursor: pointer;
          }
          .fr:hover {
            font-size: 13px;
            color: #736b6b;
          }
        }

        .news-list {
          padding: 5px 15px;
          line-height: 26px;
          color:#d4bebe;
          cursor: pointer;

          .bold {
            font-weight: 700;
          }
        }
        .news-list li:hover{
          color: #ffffff;
        }
      }

      .lifeservices {
        border-right: 1px solid #e4e4e4;
        overflow: hidden;
        display: flex;
        flex-wrap: wrap;

        .life-item {
          border-left: 1px solid #d4bebe;
          border-bottom: 1px solid #d4bebe;
          margin-right: -1px;
          height: 64px;
          text-align: center;
          position: relative;
          cursor: pointer;
          width: 25%;

          .list-item {
            background-image: url(../image/icons.png);
            width: 61px;
            height: 40px;
            display: block;
            opacity: 0.8;
          }
          .list-item:hover{
            opacity: 1;
          }

          .service-intro {
            line-height: 22px;
            width: 60px;
            display: block;
            color:#d4bebe;
          }
          .service-intro:hover{
            font-size: 13px;
            color: white;
          }

          &:nth-child(1) {
            .list-item {
              background-position: 0px -5px;
            }
          }

          &:nth-child(2) {
            .list-item {
              background-position: -62px -5px;
            }
          }

          &:nth-child(3) {
            .list-item {
              background-position: -126px -5px;
            }
          }

          &:nth-child(4) {
            .list-item {
              background-position: -190px -5px;
            }
          }

          &:nth-child(5) {
            .list-item {
              background-position: 0px -76px;
            }
          }

          &:nth-child(6) {
            .list-item {
              background-position: -62px -76px;
            }
          }

          &:nth-child(7) {
            .list-item {
              background-position: -126px -76px;
            }
          }

          &:nth-child(8) {
            .list-item {
              background-position: -190px -76px;
            }
          }

          &:nth-child(9) {
            .list-item {
              background-position: 0px -146px;
            }
          }

          &:nth-child(10) {
            .list-item {
              background-position: -62px -146px;
            }
          }

          &:nth-child(11) {
            .list-item {
              background-position: -126px -146px;
            }
          }

          &:nth-child(12) {
            .list-item {
              background-position: -190px -146px;
            }
          }
        }
      }

      .ads {
        margin-top: 5px;

        img {
          opacity: 0.8;
          transition: all 400ms;

          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>