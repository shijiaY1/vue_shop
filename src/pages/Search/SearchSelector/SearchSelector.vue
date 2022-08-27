<template>
  <div class="clearfix selector">
    <div class="type-wrap logo">
      <div class="fl key brand">品牌</div>
      <div class="value logos">
        <!-- 品牌地方 -->
        <ul class="logo-list">
          <li v-for="(trademark, index) in trademarkList" :key="trademark.tmId" @click="tradeMatkHandler(trademark)" style="cursor: pointer" v-show="trademark.tmName !== '尚硅谷'">
            {{ trademark.tmName }}
          </li>
        </ul>
      </div>
      <div class="ext">
        <a href="javascript:void(0);" class="sui-btn">多选</a>
        <a href="javascript:void(0);" style="color: white;margin-left: 10px">更多</a>
      </div>
    </div>
    <!-- 平台售卖属性的地方 -->
    <div class="type-wrap" v-for="(attr, index) in attrsList" :key="attr.attrId" style="cursor: pointer" v-show="attr.attrId == 106 || attr.attrId == 107 || attr.attrId == 23 ||attr.attrId == 24 || attr.attrId == 111 || attr.attrId == 112 ||attr.attrId == 25">
      <!-- 平台售卖属性:比如说颜色 -->
      <div class="fl key">{{ attr.attrName }}</div>
      <div class="fl value">
        <ul class="type-list">
          <!-- 平台相应售卖的属性的属性值:粉色，蓝色，黑色... -->
          <li v-for="(attrValue, index) in attr.attrValueList" :key="attrValue" @click="attrInfo(attr,attrValue)">
            <a>{{ attrValue }}</a>
          </li>
        </ul>
      </div>
      <div class="fl ext"></div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
  export default {
    name: 'SearchSelector',
    computed: {
      //平台数据 品牌属性
      ...mapGetters(["trademarkList", "attrsList"]),
    },
    methods: {
      //品牌的事件处理函数
      tradeMatkHandler(trademark) {
        //点击了品牌（苹果），还是需要整理参数，向服务器发请求获取相应的数据进行展示
        //老师问题：在那个组件中发请求，父组件?
        //为什么那,因为父组件中searchParams参数是带给服务器参数，子组件组件把你点击的品牌的信息，需要给父组件传递过去---自定义事件
        this.$emit('trademarkInfo',trademark);
      },
      //平台售卖属性值的点击事件
      attrInfo(attr,attrValue){
        //["属性ID:属性值:属性名"]
        this.$emit("attrInfo",attr,attrValue);
      }
    },
  }
</script>

<style lang="less" scoped>
  .selector {
    border: 1px solid #ddd;
    margin-bottom: 5px;
    overflow: hidden;

    .logo {
      border-top: 0;
      margin: 0;
      position: relative;
      overflow: hidden;

      .key {
        padding-bottom: 87px !important;
      }
    }

    .type-wrap {
      margin: 0;
      position: relative;
      border-top: 1px solid #e9e2e2;
      overflow: hidden;

      .key {
        width: 100px;
        background: #e3dbdb;
        line-height: 26px;
        text-align: right;
        padding: 10px 10px 0 15px;
        float: left;
        font-size: 14px;
        font-weight: bolder;
        color: #3b3535;
      }

      .value {
        overflow: hidden;
        padding: 10px 0 0 15px;
        color: #333;
        margin-left: 120px;

        .logo-list {
          li {
            float: left;
            border: 1px solid #e4e4e4;
            margin: -1px -1px 0 0;
            width: 105px;
            height: 52px;
            text-align: center;
            line-height: 52px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-weight: 700;
            color: #f5f1f1;
            font-style: italic;
            font-size: 15px;

            img {
              max-width: 100%;
              vertical-align: middle;
            }
          }
        }

        .type-list {
          li {
            float: left;
            display: block;
            margin-right: 30px;
            line-height: 26px;

            a {
              text-decoration: none;
              color: #f1ebeb;
              font-size: 13px;
              font-weight: 500;
              transition: all 1s;
            }
            a:hover {
              //font-weight: bold;
              color: #d4c9c9;
            }
          }
        }
      }

      .ext {
        position: absolute;
        top: 10px;
        right: 10px;

        .sui-btn {
          display: inline-block;
          padding: 2px 14px;
          box-sizing: border-box;
          margin-bottom: 0;
          font-size: 12px;
          line-height: 18px;
          text-align: center;
          vertical-align: middle;
          cursor: pointer;
          padding: 0 10px;
          background: #ece6e6;
          border: 1px solid #d5d5d5;
        }

        a {
          color: #666;
        }
      }
    }
  }
</style>