<template>
  <!--今日推荐-->
  <div class="today-recommend">
    <div class="py-container">
      <ul class="recommend">
        <li class="clock" >
          <div class="time">
            <img src="../image/clock.png" />
            <h3>今日推荐</h3>
          </div>
        </li>
        <li class="banner">
          <img src="../image/today01.png" />
        </li>
        <li class="banner">
          <img src="../image/today02.png" />
        </li>
        <li class="banner">
          <img src="../image/today03.png" />
        </li>
        <li class="banner">
          <img src="../image/today04.png" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Recommend"
}
</script>

<style scoped lang="less">
.today-recommend {
  .py-container {
    width: 1200px;
    margin: 0 auto;

    .recommend {
      height: 165px;
      background-color: #eaeaea;
      margin: 10px 0;
      //display: block;
      list-style: none;


      .clock {
        width: 17.80%;
        background-color: #4f4b4b;
        color: #fff;
        font-size: 18px;
        text-align: center;
        float:left;

        .time {
          padding: 30px 0;
        }


        h3 {
          margin: 9px 0;
          font-weight: 700;
          font-size: 20px;
          line-height: 30.06px;
        }
      }

      .banner {
        width: 20.53%;
        background-color: #4f4b4b;
        float:left;

        img {
          padding-top: 2px;
          width: 100%;
          height: 100%;
          transition: all 1s;
          opacity: 0.9;
          border-radius: 10px;

          &:hover {
            opacity: 0.7;
            border-radius: 25px;
          }
        }
      }
    }
  }
}
</style>