<template>
  <!-- 底部 -->
  <div class="footer">
    <div class="footer-container">
      <div class="footerList">
        <div class="footerItem">
          <h4>购物指南</h4>
          <ul class="footerItemCon">
            <li>购物流程</li>
            <li>会员介绍</li>
            <li>生活旅行/团购</li>
            <li>常见问题</li>
            <li>购物指南</li>
          </ul>

        </div>
        <div class="footerItem">
          <h4>配送方式</h4>
          <ul class="footerItemCon">
            <li>上门自提</li>
            <li>211限时达</li>
            <li>配送服务查询</li>
            <li>配送费收取标准</li>
            <li>海外配送</li>
          </ul>
        </div>
        <div class="footerItem">
          <h4>支付方式</h4>
          <ul class="footerItemCon">
            <li>货到付款</li>
            <li>在线支付</li>
            <li>分期付款</li>
            <li>邮局汇款</li>
            <li>公司转账</li>
          </ul>
        </div>
        <div class="footerItem">
          <h4>售后服务</h4>
          <ul class="footerItemCon">
            <li>售后政策</li>
            <li>价格保护</li>
            <li>退款说明</li>
            <li>返修/退换货</li>
            <li>取消订单</li>
          </ul>
        </div>
        <div class="footerItem">
          <h4>特色服务</h4>
          <ul class="footerItemCon">
            <li>夺宝岛</li>
            <li>DIY装机</li>
            <li>延保服务</li>
            <li>校园卡充值</li>
            <li>查看营业状态</li>
          </ul>
        </div>
        <div class="footerItem">
          <h4 style="margin-bottom: 5px">帮助中心</h4>
          <img class="imgBi" src="../../../public/images/lianxi.jpg" height="140" width="150"/>
        </div>
      </div>
      <div class="copyright">
        <ul class="helpLink">
          <li>关于我们
            <span class="space"></span>
          </li>
          <li>联系我们
            <span class="space"></span>
          </li>
          <li>客服平台
            <span class="space"></span>
          </li>
          <li>商家入驻
            <span class="space"></span>
          </li>
          <li>营销中心
            <span class="space"></span>
          </li>
          <li>友情链接
            <span class="space"></span>
          </li>
          <li>实习招聘
            <span class="space"></span>
          </li>
          <li>社会招聘
            <span class="space"></span>
          </li>
          <li>支持赞助
          </li>
        </ul>
        <p style="color: #d9cece;">地址：广东省珠海市珠海科技学院计算机学院</p>
        <p style="color: #d9cece;">粤ICP备12345678号</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer"
}
</script>

<style scoped lang="less">
.footer {

  .footer-container {
    width: 1200px;
    margin: 0 auto;
    padding: 0 15px;

    .footerList {
      padding-top: 20px;
      border-bottom: 1px solid #e4e1e1;
      border-top: 1px solid #e4e1e1;
      overflow: hidden;
      padding-left: 40px;

      .footerItem {
        width: 16.6666667%;
        float: left;

        h4 {
          font-size: 15px;
          color: #e2d5d5;
          padding-bottom: 3px;
        }

        .footerItemCon {
          li {
            line-height: 18px;
            color: #cdbcbc;
          }
        }

        &:last-child img {
          width: 121px;
        }
      }
    }

    .copyright {
      padding: 20px;

      .helpLink {
        text-align: center;

        li {
          display: inline;
          color: #d9cece;

          .space {
            border-left: 1px solid #666;
            width: 1px;
            height: 13px;
            background: #666;
            margin: 8px 10px;
          }
        }
      }

      p {
        margin: 10px 0;
        text-align: center;
      }
    }
    .imgBi{
      border-radius: 50px;
      opacity: 0.03;
      transition-property:opacity, border-radius;
      transition-duration:1.5s;
      transition-timing-function:linear;
    }
    .imgBi:hover{
      opacity: 1;
      border-radius: 10px;
    }
  }
}
</style>