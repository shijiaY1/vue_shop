<template>
  <!-- 商品排行 -->
  <div class="rank">
    <div class="tab">
<!--      <div class="container1">
        <span style="&#45;&#45;i:1;"></span>
        <span style="&#45;&#45;i:2;"></span>
        <span style="&#45;&#45;i:3;"></span>
        <span style="&#45;&#45;i:4;"></span>
        <span style="&#45;&#45;i:5;"></span>
        <span style="&#45;&#45;i:6;"></span>
        <span style="&#45;&#45;i:7;"></span>
        <span style="&#45;&#45;i:8;"></span>
        <span style="&#45;&#45;i:9;"></span>
        <span style="&#45;&#45;i:10;"></span>
      </div>-->
      <div class="tab-tit clearfix">
        <a href="javascript:;" class="on">
          <p class="img">
            <i></i>
          </p>
          <p class="text">热卖排行</p>
        </a>
        <a href="javascript:;">
          <p class="img">
            <i></i>
          </p>
          <p class="text">特价排行</p>
        </a>
        <a href="javascript:;">
          <p class="img">
            <i></i>
          </p>
          <p class="text">新品排行</p>
        </a>
      </div>
    </div>
    <div class="content">
      <ul>
        <li>
          <div class="img-item">
            <p class="tab-pic">
              <a href="#">
                <img src="../image/1.jpg" />
              </a>
            </p>
            <div class="tab-info">
              <div class="info-title">
                <a href="#">【影像旗舰】索尼(SONY)Xperia 1 12+256GB/512GB骁龙888微单技术</a>
              </div>
              <p class="info-price">价格：¥7999.00</p>
            </div>
          </div>
          <div class="img-item">
            <p class="tab-pic">
              <a href="#">
                <img src="../image/2.jpg" />
              </a>
            </p>
            <div class="tab-info">
              <div class="info-title">
                <a href="http://localhost:8080/#/detail/31">&nbsp;华为S49AG950NC奥德赛Neo G9 49寸5K240hz MINILED HDMI2.1显示器</a>
              </div>
              <p class="info-price">价格：¥8888.00</p>
            </div>
          </div>
          <div class="img-item">
            <p class="tab-pic">
              <a href="#">
                <img src="../image/3.jpg" />
              </a>
            </p>
            <div class="tab-info">
              <div class="info-title">
                <a href="http://localhost:8080/#/detail/13">【24期免息】Huawei/华为 P50 Pocket 折叠手机</a>
              </div>
              <p class="info-price">价格：¥8988.00</p>
            </div>
          </div>
          <div class="img-item">
            <p class="tab-pic">
              <a href="#">
                <img src="../image/5.jpg" />
              </a>
            </p>
            <div class="tab-info">
              <div class="info-title">
                <a href="#">【任天堂Switch游戏】 NS塞尔达传说 荒野之息 动作冒险</a>
              </div>
              <p class="info-price">定金：¥399.00</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import BaoL from "@/components/try/BaoL/BaoL.css"
export default {
  name: "Rank"
}
</script>

<style scoped lang="less">
.rank {
  width: 1200px;
  margin: 0 auto;

  .tab {
    margin: 0 auto;
    //overflow: hidden;
    width: 312px;

    .tab-tit {
      text-align: center;

      a {
        display: block;
        padding: 0 18px;
        float: left;
        text-decoration: none;
        font-size: 16px;
        color: #999;

        p {
          margin: 5px 0;
        }

        .img {
          i {
            width: 35px;
            height: 35px;
            display: block;
            background: url(../image/bg0.png);
            margin-left: 10px;
            opacity: 0.1;
            transition: all 1s;
          }
          i:hover {
            opacity: 1;
          }
        }

        .text {
          line-height: 28px;
          transition: all 1s;
          color: #240306;
        }
        .text:hover {
          color: #e60012;
        }
      }

      .on {
        color: #e60012;

        .img {
          i {
            background-position: -35px 0;
          }
        }
      }
    }
  }

  .content {
    overflow: hidden;
    padding: 10px;

    ul {
      li {
        overflow: hidden;
        list-style: none;
        line-height: 18px;

        .img-item {
          border: 1px solid #030000;
          width: 250px;
          float: left;
          overflow: hidden;
          margin: 0 18px 15px;
          background: #fff;

          .tab-pic {
            width: 230px;
            height: 210px;
            overflow: hidden;
            text-align: center;
            margin: 8px auto 12px;

            a {
              img {
                width: 225px;
                height: 200px;
                border-radius: 15px;
                border: 1px solid #ffffff;
                transition: all 1s;
              }
              img:hover{
                border-radius: 25px;
                border: 3px solid #625b5b;
              }
            }
          }

          .tab-info {
            background: #fafafa;

            .info-title {
              height: 50px;
              line-height: 28px;
              overflow: hidden;
              margin: 0 auto;
              padding-left: 10px;

              a {
                color: #333;
                transition: all 300ms;
                text-decoration: none;
              }
              a:hover {
                color: #0077ff;
              }
            }

            .info-price {
              font-size: 18px;
              color: #e1251b;
              height: 35px;
              padding-left: 10px;
              display: block;
              line-height: 24px;
              margin: 10px auto 0;
            }
          }
        }
      }
    }
  }
}
</style>