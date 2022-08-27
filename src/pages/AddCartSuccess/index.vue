<template>
  <div class="cart-complete-wrap">
    <div class="cart-complete">
      <h3><i class="sui-icon icon-pc-right"></i>商品已成功加入购物车！</h3>
      <div class="goods">
        <div class="left-good">
          <div class="left-pic">
            <img :src="skuInfo.skuDefaultImg" />
          </div>
          <div class="right-info">
            <p class="title">{{ skuInfo.skuName }}</p>
            <p class="attr">
              {{ skuInfo.skuDesc }} 数量:{{ $route.query.skuNum }}
            </p>
          </div>
        </div>
        <div class="right-gocart">
          <router-link class="sui-btn btn-xlarge" :to="`/detail/${skuInfo.id}`">查看商品详情</router-link>

          <router-link to="/shopcart">去购物车结算</router-link>
        </div>
      </div>
    </div>
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
</template>

<script>
import qipao from  "@/components/try/qipao/qipao.css"
export default {
  name: "AddCartSuccess",
  computed: {
    skuInfo() {
      return JSON.parse(sessionStorage.getItem("SKUINFO"));
    },
  },
};
</script>

<style lang="less" scoped>
.cart-complete-wrap {
  margin-top: 50px;
  //background-color: #f4f4f4;

  .cart-complete {
    width: 1200px;
    min-height: 520px;
    margin: 0 auto;

    h3 {
      font-weight: 400;
      font-size: 18px;
      color: #e2d5d5;
      padding-top: 15px;
      padding-bottom: 20px;
      margin: 0;

      .icon-pc-right {
        background-color: #e0d0d0;
        border: 2px solid #1a1919;
        padding: 5px;
        margin-right: 8px;
        border-radius: 15px;
      }
    }

    .goods {
      overflow: hidden;
      padding: 10px 0;

      .left-good {
        float: left;

        .left-pic {
          border: 1px solid #dfdfdf;
          width: 60px;
          float: left;
          img {
            width: 60px;
            height: 60px;
          }
        }

        .right-info {
          color: #444;
          float: left;
          margin-left: 10px;

          .title {
            width: 95%;
            line-height: 28px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: 15px;
            font-weight: bold;
            padding-bottom: 4px;
          }

          .attr {
            width: 95%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            color: #e2d5d5;
            font-size: 13px;
          }
        }
      }

      .right-gocart {
        float: right;

        a {
          padding: 7px 36px;
          margin-right: 10px;
          font-size: 15px;
          line-height: 22px;
          color: #333;
          background-color: #e2e2e2;
          text-decoration: none;
          box-sizing: border-box;
          border: 1px solid #8f8f8f;
          opacity: 0.9;
          border-radius: 30px;
          transition: all 1s;
        }

        a:hover {
          background-color: #f7f7f7;
          border: 1px solid #6d6b6b;
          opacity: 1;
        }

        a:active {
          background-color: #e1e1e1;
          border: 1px solid #d5d5d5;
        }

        .btn-danger {
          background-color: #e1251b;
          color: #fff;
        }

        .btn-danger:hover {
          background-color: #e1251b;
        }
      }
    }
  }
}
</style>
