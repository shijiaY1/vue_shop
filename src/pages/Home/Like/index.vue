<template>
  <!-- 猜你喜欢 -->
  <div class="like">
    <div class="py-container">
      <div class="title">
        <h3 class="fl">猜你喜欢</h3>
        <a href="javascript:;" class="fr tip changeBnt">---</a>
      </div>
      <div class="bd">
        <ul class="favourate">
          <li>
            <img src="../image/like_01.jpg" alt="" />
            <div class="like-text">
              <p>商务记事本软皮面b5笔记本子简约文艺复古</p>
              <h3>¥16.00</h3>
            </div>
          </li>
          <li>
            <img src="../image/like_02.jpg" alt="" />
            <div class="like-text">
              <p>美国Carver陆地冲浪滑板 29.5" Swallow艺术款</p>
              <h3>¥1750.00</h3>
            </div>
          </li>
          <li>
            <img src="../image/like_03.jpg" alt="" />
            <div class="like-text">
              <p>10斤混合组合混搭新鲜水果进口礼盒装高端送礼</p>
              <h3>¥322.00</h3>
            </div>
          </li>
          <li>
            <img src="../image/like_04.jpg" alt="" />
            <div class="like-text">
              <p>GeeCoffee「翡翠庄园红标瑰夏水洗」精品咖啡豆</p>
              <h3>¥699.00</h3>
            </div>
          </li>
          <li>
            <img src="../image/like_05.jpg" alt="" />
            <div class="like-text">
              <p>CORONA科罗娜墨西哥风味啤酒330ml*18瓶装</p>
              <h3>¥186.00</h3>
            </div>
          </li>
          <li>
            <img src="../image/like_06.jpg" alt="" />
            <div class="like-text">
              <p>「paperblanks」梵高的鸢尾花系列手帐记事本</p>
              <h3>¥36.00</h3>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Like"
}
</script>

<style scoped lang="less">
  .like {
  margin-top: 15px;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .title {
      overflow: hidden;

      .fl {
        float: left;
        font-size: 20px;
        line-height: 50px;
      }

      .fr {
        float: right;
        width: 77px;
        height: 25px;
        background-position: 182px -104px;
        line-height: 30px;
        font-size: 12px;
        font-weight: 400;
        color: #666;
        text-decoration: none;
      }
    }

    .bd {
      .favourate {
        border: 4px solid #baa8a8;
        overflow: hidden;
        padding: 3px 3px;
        box-sizing: border-box;
        display: flex;

        li {
          height: 250px;
          margin: 0 1px;
          overflow: hidden;
          background: #e8e8e8;
          position: relative;
          width: 16.667%;
          display: flex;
          flex-direction: column;
          align-items: center;
          cursor: pointer;

          img {
            margin-top: 5px;
            width: 160px;
            height: 142px;
            transition: all 800ms;
            border-radius:10px;

            &:hover {
              opacity: 0.8;
              transform: scale(1.1);
              border-radius:20px;
            }
          }

          .like-text {
            padding: 0;
            width: 142px;

            p {
              margin: 12px 0;
            }

            h3 {
              color: #df3033;
              font-size: 20px;
              line-height:25px;
              margin: 7px 0;
              font-weight: 700;
            }
          }
        }
      }
    }
  }
}
</style>