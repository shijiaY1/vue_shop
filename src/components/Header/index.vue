<template>
  <!-- 头部 -->
  <header class="header">
    <!-- 头部的第一行 -->
    <div class="top">
      <div class="container">
        <div class="loginList">
          <p style="color: #cbc0c0">校园商城欢迎您！</p>
          <!-- 没有用户名：未登录 -->
          <p v-if="!userName" >
            <!-- 声明式导航：router-link务必要有to属性 -->
            <router-link to="/login" style="font-size: 15px;color: #cdb9b9">登录</router-link>
            <router-link class="register" to="/register" style="font-size: 15px;color: #cdb9b9">免费注册</router-link>
          </p>
          <!-- 登录了 -->
          <p v-else>
            <a style="color: #cdb9b9">用户：{{ userName }} </a>
            <a style="color: #cdb9b9" class="register" @click="logout">退出登录</a>
          </p>
        </div>
        <div class="typeList">
          <router-link to="/center">我的订单</router-link>
          <router-link to="/shopcart">我的购物车</router-link>
          <a><router-link to="/canvasball1">商城会员</router-link></a>
          <a href="###">企业采购</a>
          <a href="###">关注我们</a>
          <a href="###">合作招商</a>
          <a href="###">商家后台</a>
        </div>
      </div>
    </div>
    <!--头部第二行 搜索区域-->
    <div class="bottom">
      <h1 class="logoArea">
        <!-- <router-link class="logo" title="尚品汇" href="###" target="_blank" to="/home"> -->
        <router-link class="logo" to="/home">
          <h1 class="trylight">&nbsp;校园商城&nbsp;</h1>
        </router-link>
      </h1>
      <div class="searchArea">
        <form action="###" class="searchForm">
          <!-- 收集文本框的数据 -->
          <input type="text" id="autocomplete" class="input-error input-xxlarge"
                 v-model="keyword"
          />
          <!-- 编程式导航 -->
          <button class="night" type="button" @click="goSearch" target="blank">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            搜索
          </button>
        </form>
      </div>
    </div>
  </header>
</template>

<script>
import night from "@/components/try/night.css"
import BaoL from "@/components/try/BaoL/BaoL.css"
export default {
  name: "Header",
  data() {
    return {
      keyword: ''
    }
  },
  methods: {
    //搜索按钮的回调函数，需要向search 路由进行跳转
    goSearch() {
      //路由传参
      //第一种：字符串形式传参 (this.keyword.toUpperCase() 将字符串转化为大写的形式)
      //this.$router.push('/search/' + this.keyword+"?k="+this.keyword.toUpperCase());

      //第二种：模板字符串
      //this.$router.push(`/search/${this.keyword}?k=${this.keyword.toUpperCase()}`)

      //第三种：对象  -- 主流
      //this.$router.push({name:"search",params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}},()=>{},(error)=>{})
      //如果搜索之前存在query参数,那么把query也带过去
      if (this.$route.query) {
        let loction = {name: "search", params: {keyword: this.keyword || undefined}}
        //把query带过去
        loction.query = this.$route.query;
        this.$router.push(loction);
      }
      console.log(this.$router);
    },
    //退出登录
    async logout() {
      //退出登录需要做的事情
      //1:需要发请求，通知服务器退出登录【清除一些数据：token】
      //2:清除项目当中的数据【userInfo、token】
      try {
        //如果退出成功
        await this.$store.dispatch('userLogout');
        //回到首页
        this.$router.push('/home');
      } catch (error) {
        alert(error.message);
      }
    }
  },
  mounted() {
    ////通过全局事件总线清除关键字
    this.$bus.$on("clear", () => {
      this.keyword = '';
    })
  },
  computed: {
    //用户名信息
    userName() {
      return this.$store.state.user.userInfo.name;
    }
  }
}
</script>

<style scoped lang="less">

.header {
  & > .top {
    height: 20px;
    line-height: 20px;

    .container {
      width: 1200px;
      margin: 0 auto;
      overflow: hidden;

      .loginList {
        float: left;

        p {
          float: left;
          margin-right: 10px;

          .register {
            border-left: 1px solid #b3aeae;
            padding: 0 5px;
            margin-left: 5px;
            cursor: pointer;
          }

        }
      }

      .typeList {
        float: right;

        a {
          padding: 0 10px;
          font-size: 15px;
          color: #cdb9b9;

          &
          + a {
            border-left: 1px solid #b3aeae;
          }

        }

      }

    }
  }

  &
  > .bottom {
    width: 1200px;
    height: 100px;
    margin: 0 auto;
    overflow: hidden;

    .logoArea {
      float: left;

      .logo {

        img {
          width: 175px;
          margin: 25px 45px;
        }

      }
    }

    .searchArea {
      float: right;
      margin-top: 35px;

      .searchForm {
        overflow: hidden;

        input {
          box-sizing: border-box;
          width: 530px;
          height: 41px;
          padding: 0px 12px;
          border: 2px solid #ae938f;
          float: left;
          font-size: 15px;

          &
          :focus {
            outline: none;
          }

        }

        button {
          height: 42px;
          width: 78px;
          float: left;
          cursor: pointer;
          &
          :focus {
            //outline: none;
          }

        }
      }
    }
  }
  .trylight{
    margin-top: 10px;
      font-size: 35px;
      text-transform: uppercase;
      letter-spacing: 15px;
      color: rgb(208, 217, 233);
      -webkit-box-reflect: below 1px linear-gradient(transparent , rgb(221, 210, 210));
      animation: san 4s linear infinite;
    @keyframes san{
      0%,15%,50%,52%,70%,90%,99.1%{
        color: rgb(223, 226, 245);
        filter: blur(1px);
      }
      12%,15.1%,60%,70.1%,90.5%,100%{
        color: rgb(255, 255, 255);
        text-shadow: 0 0 3px rgb(255, 255, 255),
        0 0 25px rgb(255, 255, 255),
        0 0 35px rgb(208, 210, 212),
        0 0 105px rgb(93, 98, 107),
        0 0 155px rgb(234, 243, 243);
        filter: blur(1px);
      }
    }
  }
}

</style>
