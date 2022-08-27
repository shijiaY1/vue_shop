<template>
  <div class="trade-container">
    <h3 class="title">填写并核对订单信息</h3>
    <div class="content">
      <h5 class="receive">收件人信息</h5>
      <div
          class="address clearFix"
          v-for="(address, index) in addressInfo"
          :key="address.id"
      >
        <span class="username " :class="{ selected: address.isDefault == 1 }">{{
            address.consignee
          }}</span>
        <p @click="changeDefault(address, addressInfo)">
          <span class="s1">{{ address.fullAddress }}</span>
          <span class="s2">{{ address.phoneNum }}</span>
          <span class="s3" v-show="address.isDefault == 1">默认地址</span>
        </p>
      </div>
      <div class="address clearFix" v-if="addressInfo.length == 0">
        <span class="username ">
          dodos
        </span>
        <p>
          <span class="s1">广东省珠海市</span>
          <span class="s2">金湾区三灶镇珠海科技学院 榕园五栋657</span>
          <span class="s3">默认地址</span>
        </p>
      </div>
      <div class="line"></div>
      <h5 class="pay">支付方式</h5>
      <div class="address clearFix">
        <span class="username selected">在线支付</span>
        <span class="username" style="margin-left:5px;">货到付款</span>
      </div>
      <div class="line"></div>
      <h5 class="pay">送货清单</h5>
      <div class="way">
        <h5>配送方式</h5>
        <div class="info clearFix">
          <span class="s1">顺丰快递</span>
          <p>配送时间：预计6月10日（周五）09:00-15:00送达</p>
        </div>
      </div>
      <div class="detail">
        <h5>商品清单</h5>
        <ul
            class="list clearFix"
            v-for="(order, index) in orderInfo.detailArrayList"
            :key="order.skuId"
        >
          <li>
            <img :src="order.imgUrl" alt="" style="width:100px;height:100px"/>
          </li>
          <li>
            <p>{{ order.skuName }}</p>
            <h4>7天无理由退货</h4>
          </li>
          <li>
            <h3 style="margin-left: 10px">￥{{ order.orderPrice }}.00</h3>
          </li>
          <li style="margin-left: 12px;font-weight: bold">数量：{{ order.skuNum }}</li>
        </ul>
      </div>
      <div class="bbs">
        <h5>买家留言：</h5>
        <textarea
            placeholder="建议留言前先与商家沟通确认"
            class="remarks-cont"
            v-model="msg"
        ></textarea>
      </div>
      <div class="line"></div>
      <div class="bill">
        <h5>发票信息：</h5>
        <div>普通发票（电子） 个人 明细</div>
        <h5>使用优惠/抵用</h5>
      </div>
    </div>
    <div class="money clearFix">
      <ul>
        <li>
          <b style="font-size: 13px;color: #d9caca"
          ><i>{{ orderInfo.totalNum }}</i
          >件商品，总商品金额:</b
          >
          <span style="font-size: 13px;color: #ece5e5;margin-right: 6px">¥{{ orderInfo.totalAmount }}.00</span>
        </li>
        <li>
          <b style="font-size: 13px;color: #d9caca">返现：</b>
          <span style="font-size: 13px;color: #ece5e5;margin-right: 6px">0.00</span>
        </li>
        <li>
          <b style="font-size: 13px;color: #d9caca">运费：</b>
          <span style="font-size: 13px;color: #ece5e5;margin-right: 6px">0.00</span>
        </li>
      </ul>
    </div>
    <div class="trade">
      <div class="price">
        应付金额: <span style="margin-left: 3px">¥{{ orderInfo.totalAmount }}.00</span>
      </div>
      <div class="receiveInfo">
        寄送至:
        <span>{{ userDefaultAddress.fullAddress }}</span>
        <span v-if="addressInfo.length == 0" style="display: block">广东省珠海市 金湾区三灶镇珠海科技学院 榕园五栋657</span>
        收货人：<span>{{ userDefaultAddress.consignee }}</span>
        <span v-if="addressInfo.length == 0">dodos </span>
        <span v-if="addressInfo.length == 0"> 13697720777</span>
        <span>{{ userDefaultAddress.phoneNum }}</span>
      </div>
    </div>
    <div class="sub clearFix">
      <a class="subBtn" @click="submitOrder">提交订单</a>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex";

export default {
  name: 'Trade',
  data() {
    return {
      //收集买家的留言信息
      msg: "",
      //订单号
      orderId: "",
    };
  },
  //生命周期函数:挂载完毕
  mounted() {
    this.$store.dispatch("getUserAddress");
    this.$store.dispatch("getOrderInfo");
  },
  computed: {
    ...mapState({
      addressInfo: (state) => state.trade.address,
      orderInfo: (state) => state.trade.orderInfo,
    }),
    //将来提交订单最终选中地址
    userDefaultAddress() {
      //find:查找数组当中符合条件的元素返回，最为最终结果
      return this.addressInfo.find((item) => item.isDefault == 1) || {};
    },
  },
  methods: {
    //修改默认地址
    changeDefault(address, addressInfo) {
      //全部的isDefault为零
      addressInfo.forEach((item) => (item.isDefault = 0));
      address.isDefault = 1;
    },
    //提交订单
    async submitOrder() {
      //交易编码
      let {tradeNo} = this.orderInfo;
      //其余的六个参数
      let data = {
        consignee: this.userDefaultAddress.consignee, //最终收件人的名字
        consigneeTel: this.userDefaultAddress.phoneNum, //最终收件人的手机号
        deliveryAddress: this.userDefaultAddress.fullAddress, //收件人的地址
        paymentWay: "ONLINE", //支付方式
        orderComment: this.msg, //买家的留言信息
        orderDetailList: this.orderInfo.detailArrayList, //商品清单
      };
      //需要带参数的：tradeNo
      let result = await this.$API.reqSubmitOrder(tradeNo, data);
      //提交订单成功
      if (result.code == 200) {
        this.orderId = result.data;
        //路由跳转 + 路由传递参数
        this.$router.push('/pay?orderId=' + this.orderId);
        //提交的订单失败
      } else {
        alert(result.data);
      }
    },
  },
}
</script>

<style lang="less" scoped>
.trade-container {
  .title {
    width: 1200px;
    margin: 15px auto;
    font-size: 22px;
    border-bottom: 1px solid #e3d9d9;
    padding-bottom: 10px;
    line-height: 21px;
    color: #e3d9d9;
  }

  .content {
    width: 1200px;
    margin: 10px auto 0;
    border: 1px solid rgb(221, 221, 221);
    padding: 20px;
    box-sizing: border-box;

    .receive,
    .pay {
      font-size: 16px;
      line-height: 24px;
      margin: 12px 0;
    }

    .address {
      padding-left: 20px;
      margin-bottom: 15px;

      .username {
        float: left;
        width: 100px;
        height: 30px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #e3d9d9;
        position: relative;
        font-size: 14px;
        color: #e3d9d9;
      }

      .username::after {
        content: "";
        display: none;
        width: 13px;
        height: 13px;
        position: absolute;
        right: 0;
        bottom: 0;
        //background: url(./images/choosed.png) no-repeat;
      }

      .username.selected {
        border-color: #242222;
        background-color: #2b2828;
      }

      .username.selected::after {
        display: block;
      }

      p {
        width: 610px;
        float: left;
        line-height: 30px;
        margin-left: 10px;
        padding-left: 5px;
        cursor: pointer;
        font-size: 13px;
        border-bottom: 1px solid #2b2828;

        .s1 {
          float: left;

        }

        .s2 {
          float: left;
          margin: 0 5px;
        }

        .s3 {
          float: left;
          width: 56px;
          height: 18px;
          line-height: 18px;
          margin-left: 10px;
          background-color: #878787;
          color: #fff;
          margin-top: 4px;
          text-align: center;
        }
      }

      p:hover {
        background-color: #ddd;
      }
    }

    .line {
      height: 1px;
      background-color: #ddd;
    }

    .way {
      width: 1080px;
      height: 110px;
      background: #e3dbdb;
      padding: 15px;
      margin: 0 auto;

      h5 {
        line-height: 50px;
        font-size: 14px;
      }

      .info {
        margin-top: 10px;

        .s1 {
          float: left;
          border: 1px solid #dddddd;
          width: 120px;
          height: 30px;
          line-height: 30px;
          text-align: center;
          margin-right: 10px;
          font-size: 13px;
          font-weight: bold;
        }

        p {
          line-height: 30px;
          font-size: 12px;
        }
      }
    }

    .detail {
      width: 1080px;

      background: #fde8ea;
      padding: 15px;
      margin: 2px auto 0;

      h5 {
        line-height: 50px;
      }

      .list {
        display: flex;
        //justify-content: space-between;

        li {
          line-height: 25px;

          p {
            margin-bottom: 20px;
            margin-left: 20px;
            font-size: 13px;
          }

          h4 {
            color: #c81623;
            font-weight: 400;
            margin-left: 15px;
          }

          h3 {

            color: #e12228;
          }
        }
      }
    }

    .bbs {
      margin-bottom: 15px;

      h5 {
        line-height: 50px;
        font-size: 13px;
      }

      textarea {
        width: 100%;
        border-color: #d9caca;
        line-height: 3;
        outline: none;
        resize: none;
      }
    }

    .bill {
      h5 {
        line-height: 50px;
        font-size: 13px;
      }

      div {
        padding-left: 15px;
        color: #d9caca;
      }
    }
  }

  .money {
    width: 1200px;
    margin: 20px auto;
    border: 1px solid #d9caca;

    ul {
      width: 230px;
      float: right;

      li {
        line-height: 30px;
        display: flex;
        justify-content: space-between;

        i {
          color: red;
          font-size: 13px;
          margin-right: 3px;
        }
      }
    }
  }

  .trade {
    box-sizing: border-box;
    width: 1200px;
    padding: 10px;
    margin: 10px auto;
    text-align: right;
    background-color: #fde8ea;
    border: 1px solid #ddd;

    div {
      line-height: 30px;
    }

    .price span {
      color: #e12228;
      font-weight: 700;
      font-size: 14px;
    }

    .receiveInfo {
      color: #473e3e;
    }
  }

  .sub {
    width: 1200px;
    margin: 0 auto 10px;

    .subBtn {
      float: right;
      width: 140px;
      height: 56px;
      font: 700 18px "微软雅黑";
      line-height: 56px;
      text-align: center;
      background-color: #ece5e5;
      color: #1f1d1d;
      cursor: pointer;
      transition: all 600ms;
      border-radius: 5px;
    }
    .subBtn:hover {
      border-radius: 10px;
      color: #393434;
      background-color: #d7c8c7;
    }
  }

}
</style>