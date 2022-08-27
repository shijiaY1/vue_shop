<template>
  <div class="register-container g-container">
    <!-- 注册内容 -->
    <div class="register">
      <h3>注册新用户
        <span class="go">已经注册，去 <a href="http://localhost:8080/#/login" target="_blank">登陆</a>
        </span>
      </h3>
      <div class="content">
        <label>手机号:</label>
        <input
            placeholder="请输入你的手机号"
            v-model="phone"
            name="phone"
            v-validate="{ required: true, regex: /^[1](([3][0-9])|([4][0,1,4-9])|([5][0-3,5-9])|([6][2,5,6,7])|([7][0-8])|([8][0-9])|([9][0-3,5-9]))[0-9]{8}$/ }"
            :class="{ invalid: errors.has('phone') }"
        />
        <span class="error-msg">{{ errors.first("phone") }}</span>
      </div>
      <div class="content">
        <label>验证码:</label>
        <input
            placeholder="请输入你的验证码"
            v-model="code"
            name="code"
            v-validate="{ required: true, regex: /^\d{6}$/ }"
            :class="{ invalid: errors.has('code') }"
        />
        <button class="button_yanZhen" @click="getCode">获取验证码</button>
        <!--<img ref="code" src="http://182.92.128.115/api/user/passport/code" alt="code">-->
        <span class="error-msg">{{ errors.first("code") }}</span>
      </div>
      <div class="content">
        <label>登录密码:</label>
        <input
            placeholder="请输入你的密码"
            v-model="password"
            name="password"
            v-validate="{ required: true, regex: /^[0-9A-Za-z]{8,20}$/ }"
            :class="{ invalid: errors.has('password') }"
        />
        <span class="error-msg">{{ errors.first("password") }}</span>
      </div>
      <div class="content">
        <label>确认密码:</label>
        <input
            placeholder="请输入确认密码"
            v-model="password1"
            name="password1"
            v-validate="{ required: true, is: password }"
            :class="{ invalid: errors.has('password1') }"
        />
        <span class="error-msg">{{ errors.first("password1") }}</span>
      </div>
      <div class="controls">
        <input
            type="checkbox"
            v-model="agree"
            name="agree"
            v-validate="{ required: true, tongyi: true }"
            :class="{ invalid: errors.has('agree') }"
        />
        <span>同意协议并注册《尚品汇用户协议》</span>
        <span class="error-msg">{{ errors.first("agree") }}</span>
      </div>
      <div class="btn">
        <button @click="userRegister">完成注册</button>
      </div>
    </div>
    <div style="height: 100px">
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
      <div class="address" style="margin-bottom: 5px">地址：广东省珠海市珠海科技学院</div>
      <div class="beian" style="margin-bottom: 5px">粤ICP备12345678号</div>
      <div style="padding-bottom: 50px"></div>
    </div>
  </div>
</template>

<script>
import qipao from "@/components/try/qipao/qipao.css"

export default {
  name: 'Register',
  data() {
    return {
      // 收集表单数据--手机号
      phone: "",
      //验证码
      code: "",
      //密码
      password: "",
      //确认密码
      password1: "",
      //是否同意
      agree: true,
    };
  },
  methods: {
    //获取验证码
    async getCode() {
      //简单判断一下---至少用数据
      try {
        //如果获取到验证码
        const {phone} = this;
        phone && (await this.$store.dispatch("getCode", phone));
        //将组件的code属性值变为仓库中验证码[验证码直接自己填写了]
        this.code = this.$store.state.user.code;
      } catch (error) {
      }
    },
    //用户注册
    async userRegister() {
      const success = await this.$validator.validateAll();
      if(success){
        try {
          //如果成功 -- 路由跳转到登录
          const {phone, code, password, password1} = this;
          (phone && code && password == password1) && await this.$store.dispatch('UserRegister', {phone, code, password});
          //注册成功进行路由的跳转
          this.$router.push("/login");
        } catch (error) {
          //验证验证码的
          alert(error.message);
        }
      }
    }
  },

}
</script>

<style lang="less" scoped>
.register-container {
  .register {
    width: 1200px;
    min-height: 520px;
    border: 2px solid rgb(223, 223, 223);
    box-shadow: 0 0.6px 0.7px rgba(0, 0, 0, 0.126), 0 0.9px 1.7px rgba(0, 0, 0, 0.179), 0 1.8px 3.5px rgba(0, 0, 0, 0.224), 0 3.7px 7.3px rgba(0, 0, 0, 0.277), 0 10px 20px rgba(0, 0, 0, 0.4);
    margin-left: auto;
    margin-right: auto;
    margin-top: 30px;


    h3 {
      background: #e3dbdb;
      margin: 0;
      padding: 7px 15px;
      color: #333;
      border-bottom: 1px solid #dfdfdf;
      font-size: 21px;
      line-height: 30.06px;

      span {
        font-size: 15px;
        float: right;

        a {
          color: #e1251b;
        }
      }
    }

    div:nth-of-type(1) {
      margin-top: 40px;
    }

    .content {
      padding-left: 390px;
      margin-bottom: 18px;
      position: relative;

      label {
        font-size: 15px;
        width: 96px;
        text-align: right;
        display: inline-block;
        font-weight: bold;
        margin-right: 5px;
      }

      input {
        width: 270px;
        height: 38px;
        padding-left: 8px;
        box-sizing: border-box;
        margin-left: 5px;
        outline: none;
        border: 1px solid #999;
      }

      img {
        vertical-align: sub;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .controls {
      text-align: center;
      position: relative;

      input {
        vertical-align: middle;
      }

      .error-msg {
        position: absolute;
        top: 100%;
        left: 495px;
        color: red;
      }
    }

    .btn {
      text-align: center;
      line-height: 36px;
      margin: 17px 0 0 55px;

      button {
        outline: none;
        width: 270px;
        height: 36px;
        background: #e1251b;
        color: #fff !important;
        display: inline-block;
        font-size: 16px;
      }
    }
  }

  .copyright {
    width: 1200px;
    margin-top: 35px;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    line-height: 26px;

    ul {
      li {
        display: inline-block;
        border-right: 1px solid #514949;
        padding: 0 20px;
        margin: 15px 0;
      }
    }
  }

  .button_yanZhen {
    width: 80px;
    height: 30px;
    margin-left: 15px;
    cursor: pointer;
    color: #4c9bfc;
  }
}
</style>