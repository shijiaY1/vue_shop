<template>
  <div class="login-container g-container">
    <!-- 登录 -->
    <div class="login-wrap">
      <div class="login">
        <div class="loginform">
          <ul class="tab clearFix">
            <li>
              <a href="##" style="border-right: 0;">扫描登录</a>
            </li>
            <li>
              <a href="##" class="current">账户登录</a>
            </li>
          </ul>

          <div class="content">
            <form>
              <div class="input-text clearFix">
                <span></span>
                <input type="text" placeholder="邮箱/用户名/手机号" v-model="phone">
              </div>
              <div class="input-text clearFix">
                <span class="pwd"></span>
                <input type="password" placeholder="请输入密码" v-model="password">
              </div>
              <div class="setting clearFix">
                <label class="checkbox inline">
                  <input name="m1" type="checkbox" value="2" checked="">
                  自动登录
                </label>
                <span class="forget">忘记密码？</span>
              </div>
              <button class="btn" @click.prevent="userLogin" @keyup.enter="userLogin">登&nbsp;&nbsp;录</button>
            </form>

            <div class="call clearFix">
              <ul>
                <li><img src="./images/qq.png" alt=""></li>
                <li><img src="./images/sina.png" alt=""></li>
                <li><img src="./images/ali.png" alt=""></li>
                <li><img src="./images/weixin.png" alt=""></li>
              </ul>
              <router-link class="register" to="/register">立即注册</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div style="height: 160px"></div>
    <!-- 底部 -->
    <div class="copyright">
      <ul>
        <li>关于我们</li>
        <li>联系我们</li>
        <li>联系客服</li>
        <li>商家入驻</li>
        <li>营销中心</li>
        <li>手机尚品汇</li>
        <li>销售联盟</li>
        <li>校园社区</li>
      </ul>
      <div class="address">地址：广东省珠海市珠海科技学院</div>
      <div class="beian">粤ICP备12345678号
      </div>
      <div style="padding-bottom: 80px">
        <div class="kuang">
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
          <div class="bubble"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import maoboli from "@/components/try/maoboli/maoboli.css"
import cysk from  "@/components/try/cysk/cysk.css"
import qipao from  "@/components/try/qipao/qipao.css"

export default {
  name: 'Login',
  data() {
    return {
      phone: "",
      password: "",
    };
  },
  methods: {
    //登录的回调函数
    async userLogin() {
      try {
        //登录成功
        const {phone, password} = this;
        phone && password && (await this.$store.dispatch("userLogin", {phone, password}));
        //登录的路由组件：看路由当中是否包含query参数，有：调到query参数指定路由，没有：调到home
        let toPath = this.$route.query.redirect || "/home";
        this.$router.push(toPath);
      } catch (error) {
        alert(error.message);
      }
    },
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .login-wrap {
    height: 487px;
    //background-color: #cbbbbb;

    .login {
      width: 1200px;
      height: 530px;
      margin-left: auto;
      margin-right: auto;
      margin-top: 25px;
      box-shadow: 0 0.3px 0.7px rgba(0, 0, 0, 0.126), 0 0.9px 1.7px rgba(0, 0, 0, 0.179), 0 1.8px 3.5px rgba(0, 0, 0, 0.224), 0 3.7px 7.3px rgba(0, 0, 0, 0.277), 0 10px 20px rgba(0, 0, 0, 0.4);
      transition: 0.5s ease;
      backdrop-filter: blur(20px);
      background: url(https://i.loli.net/2019/11/17/GAYyzeKsiWjP5qO.jpg);
      opacity: 0.9;
    }

    .loginform {
      width: 480px;
      height: 406px;
      box-sizing: border-box;
      float: right;
      margin-right: 2%;
      top: 45px;
      position: relative;
      padding: 15px;
      box-shadow: 0 0.3px 0.7px rgba(0, 0, 0, 0.126), 0 0.9px 1.7px rgba(0, 0, 0, 0.179), 0 1.8px 3.5px rgba(0, 0, 0, 0.224), 0 3.7px 7.3px rgba(0, 0, 0, 0.277), 0 10px 20px rgba(0, 0, 0, 0.4);
      //background-image: radial-gradient(#e7dfdf, #f6f4f4);



      .tab {

        li {
          width: 50%;
          float: left;
          text-align: center;

          a {
            width: 100%;
            display: block;
            height: 50px;
            line-height: 50px;
            font-size: 20px;
            font-weight: 700;
            color: #333;
            border: 1px solid #726666;
            box-sizing: border-box;
            text-decoration: none;

          }

          .current {
            border-top-color: #726666;
            background-color: #f1ebeb;
            color: #e1251b;
          }
        }
      }

      .content {
        width: 450px;
        height: 316px;
        box-sizing: border-box;
        border: 1px solid #726666;
        border-top: none;
        padding: 18px;

        form {
          margin: 20px 0 18px 0;
          font-size: 13px;
          line-height: 18px;

          .input-text {
            margin-bottom: 16px;
            margin-left: 15px;

            span {
              float: left;
              width: 37px;
              height: 32px;
              border: 1px solid #ccc;
              background: url(../../assets/images/icons.png) no-repeat -10px -201px;
              box-sizing: border-box;
              border-radius: 2px 0 0 2px;
            }

            .pwd {
              background-position: -72px -201px;
            }

            input {
              width: 330px;
              height: 32px;
              box-sizing: border-box;
              border: 1px solid #ccc;
              border-left: none;
              float: left;
              font-size: 14px;
              line-height: 22px;
              padding: 6px 8px;

              border-radius: 0 2px 2px 0;
              outline: none;
            }
          }

          .setting {
            label {
              margin-left: 15px;
              float: left;
              font-size: 13px;
            }

            .forget {
              float: right;
            }
          }

          .btn {
            background-color: #cf443e;
            padding: 6px;
            border-radius: 0;
            font-size: 16px;
            font-family: 微软雅黑;
            word-spacing: 4px;
            border: 1px solid #e1251b;
            color: #fff;
            width: 100%;
            height: 36px;
            margin-top: 25px;
            outline: none;
            border-radius: 5px;
            transition: all 600ms;
          }
          .btn:hover {
            background-color: #ab0b00;
          }
        }

        .call {
          margin-top: 30px;

          ul {
            float: left;

            li {
              float: left;
              margin-right: 5px;
            }
          }

          .register {
            float: right;
            font-size: 15px;
            line-height: 38px;
          }

          .register:hover {
            color: #4cb9fc;
            text-decoration: underline;
          }
        }

      }
    }
  }

  .copyright {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    line-height: 24px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #514949;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }

}
</style>