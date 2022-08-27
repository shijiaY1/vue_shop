<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all" style="cursor: pointer ;font-size: 18px;color:#e2dada!important;">全部商品分类</h2>
        <!-- 过渡动画 -->
        <transition name="sort">
          <!-- 三级联动 -->
          <div class="sort" v-show="show">
            <!-- 利用事件的委派+编程式导航实现路由的跳转与传递参数 -->
            <div class="all-sort-list2" @click="goSearch">
              <div class="item" v-for="(c1,index) in categoryList" :key="c1.categoryId" v-show="c1.categoryId <= 17">
                <h3
                    :class="{cur:currentIndex==index}"
                    @mouseenter="changeIndex(index)">
                  <a style="cursor: pointer"
                      :data-categoryName="c1.categoryName"
                      :data-category1Id="c1.categoryId"
                  >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 二级分类 -->
                <div class="item-list clearfix" v-show="currentIndex === index">
                  <div class="subitem" v-for="(c2,index) in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a style="cursor: pointer;color:#e2dada"
                            :data-categoryName="c2.categoryName"
                            :data-category2Id="c2.categoryId"
                        >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <!-- 三级分类 -->
                        <em v-for="(c3,index) in c2.categoryChild" :key="c3.categoryId">
                          <a style="cursor: pointer;color:#1f220f"
                              :data-categoryName="c3.categoryName"
                              :data-category3Id="c3.categoryId"
                          >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav allShou Baiye">
        <ul>
          <li @click="TypeNavP"><a>今日新品</a></li>
          <li @click="TypeNavP"><a>热销排行</a></li>
          <li @click="TypeNavP"><a>历史排行</a></li>
          <li @click="TypeNavP"><a>电子天地</a></li>
          <li @click="TypeNavP"><a>服装购</a></li>
          <li @click="TypeNavP"><a>团购</a></li>
          <li @click="TypeNavP"><a>同校购</a></li>
          <li @click="TypeNavP"><a>账号共享</a></li>
        </ul>
      </nav>
    </div>
  </div>
</template>
<script>
//引入
import {mapState} from 'vuex';
//引入lodash  引入方式：是把lodash里面throttle功能引入
//最好的引入方式，按需加载
import throttle from "lodash/throttle";
import Baiye from "@/components/try/Baiye.css"
export default {
  name: "TypeNav",
  //但组件挂载完毕，我们就可以向服务器发送请求
  data() {
    return {
      //存储用户鼠标移动时，移到哪个一级分类
      currentIndex: -1,
      //商品分类的显示与隐藏
      show: true
    };
  },
  mounted() {
    //当组件挂载完毕，让show的属性变为false 通过路由判断:如果不是home路由，那么将typeNav进行隐藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  //把上面import的映射为组件身上的一个实例
  computed: {
    ...mapState({
      //对象的写法中，右侧需要一个函数，当使用这个计算属性的时候，右侧的函数会立即执行一次
      //会注入一个参数state，其实即为大仓属中的数据
      categoryList: (state) => state.home.categoryList,
    }),
  },
  methods: {
    //鼠标进入修改响应式数据currentIndex属性 --- 也就是说鼠标在html中获取的index参数值被接收到这来了
    //throttle 回调函数别用箭头函数，因为可能会出现上下文this问题
    changeIndex: throttle(function (index) {
      /*
        1.index:鼠标移上某一个一级分类的索引值
        2.在正常情况下（用户慢慢操作），鼠标进入，，每一个一级分类h3，都会触发鼠标进入事件
        3.非正常情况（用户操作很快），本身全部的一级分类都应该触发鼠标进入事件，但是经过测试，只有部分h3 触发了
          就是由于用户的操作行为过快，导致浏览器反应不过来，如果当前的回调函数中存在着大量的业务，有可能出现卡顿现象。
      */
      this.currentIndex = index;
    }, 20),

    //进行路由跳转的方法
    goSearch(event) {
      //最好的解决方案：编程式导航 + 事件委派
      //利用事件的委派存在一些问题：1.因为在父元素中下面存在许多标签，不能保证点击的一定是父元素中的<a/>标签（所有子节点都把点击事件委托给了父节点）
      //2.如何获取路由跳转时传递的参数[1、2、3级分类的产品的名字、id]

      //解决：第一个问题：把所有的子节点当中的a标签，全部加上自定义属性data-categoryName ，其余的子节点没有该属性，
      // 再利用event（事件对象，可以获取到当前触发这个事件的节点）
      let element = event.target;
      //获取到当前触发时这个事件的节点【它有可能时h3、a、dt、dl】，要是带有data-categoryname属性这样的节点，它一定是a标签
      //节点有一个属性dataset属性，它可以获取节点的自定义属性或属性值。 --点击的是a标签，才能获取到它身上的自定义属性data-categoryName="c1.categoryName"
      //解构：
      let {categoryname, category1id, category2id, category3id} = element.dataset;
      //如果标签的身上拥有自定义属性data-categoryName，它一定是a标签
      if (categoryname) {
        //整理路由跳转的参数
        let location = {name: "search"};
        let query = {categoryName: categoryname};
        //判断：一级分类、二级分类、三级分类的a标签
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        //如果路由跳转的时候，带有params参数，顺便传递过去
        //当我们点击三级菜单传递数据过去search时 query有参，params无参数，当使用搜索框的时候query无参数，params有参数
        if (this.$route.params) {
          location.params = this.$route.params;
          //整理完参数
          location.query = query;
          //路由的跳转
          this.$router.push(location);
        }
      }
    },
    //一级分类鼠标移出事件回调
    leaveIndex() {
      //鼠标移出的时候，让currentIndex = -1
      this.currentIndex = -1;
      if (this.$route.path !== "/home") {
        this.show = false;
      }
    },
    //当鼠标移入的时候，让商品分类列表进行展示
    enterShow() {
      this.show = true;
    },
    //点击首栏弹出提示信息
    TypeNavP(){
      alert('很抱歉，该栏目暂时还未开放,敬请期待');
    }
  }
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #1f1f1f;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      line-height: 50px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        margin: 0 20px;
        padding-left: 15px;
        line-height: 40px;
        font-size: 18px;
        color: #ffffff;

      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 50px;
      width: 210px;
      height: 476px;
      position: absolute;
      background-image: radial-gradient(#8d7979, #211f1f);
      //opacity: 0.9;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 28px;
            font-size: 14px;
            font-weight: 600;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #e2dada;
            }
          }
          h3:hover{
            font-size: 16px;
          }

          .item-list {
            //display: none;
            position: absolute;
            width: 500px;
            min-height: 476px;
            background-image: radial-gradient(#e9dfdf, #604c4c);
            opacity: 0.9;
            left: 200px;
            border: 1px solid #302b2b;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eeeeee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 80px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                  font-size: 13px
                }
                dt:hover{
                  font-size: 18px;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #0a0000;
                    opacity: 1;
                    font-size: 12px;
                    font-weight: bold
                  }
                  em:hover{
                    font-size: 15px;
                  }
                }
              }
            }
          }

          /*
                    &:hover {
                      .item-list {
                        display: block;
                      }
                    }*/
        }

        .cur {
          background: #031c26;
        }
      }
    }
    .allShou{
      a:hover{
        background-color: skyblue;
      }
      a{
        cursor: pointer;
      }
    }

    //过渡动画的样式
    //过渡动画开始状态（进入）
    .sort-enter {
      height: 0px;
      //transform: rotate(0deg);
      opacity: 0;
    }

    //过渡动画的结束状态
    .sort-enter-to {
      height: 473px;
      //transform: rotate(360deg);
      opacity: 1;
    }

    //定义动画的时间与速率
    .sort-enter-active {
      transition: all .8s linear;
      overflow: hidden;
    }
  }
}
</style>