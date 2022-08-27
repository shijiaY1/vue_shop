<template>
  <div>
    <!-- 商品分类三级列表（鼠标弹出的那个） -->
    <typeNav/>
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑：按钮带一个叉叉 筛选用 -->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#" style="color: white">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="removeCategoryName">×</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="removeTradeMark">×</i>
            </li>
            <!--平台的售卖的属性值展示 -->
            <li class="with-x" v-for="(attrValue, index) in searchParams.props" :key="index">
              {{ attrValue.split(":")[1] }}
              <i @click="removeAttr(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector 属于search路由的子组件，就是目录的另外一个文件-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!--价格结构-->
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a>综合<span v-show="isOne" class="iconfont" :class="{ 'icon-up': isAsc, 'icon-down': isDesc }"></span></a>
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a>价格<span v-show="isTwo" class="iconfont" :class="{ 'icon-up': isAsc, 'icon-down': isDesc }"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <!--商品销售列表-->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(good,index) in goodsList" :key="good.id"
                  v-if="good.defaultImg !== '1' && good.defaultImg !== null &&good.defaultImg !== 'http://47.93.148.192:8080/group1/M00/03/84/rBHu8mHYI2mAHNV_AAGdmwKNHNs174.jpg'&&good.id <= 100">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`/detail/${good.id}`" v-show="good.id <= 100">
                      <img v-lazy="good.defaultImg"/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong v-show="good.id <= 100">
                      <em>¥ </em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr" v-show="good.id <= 100">
                    <a target="_blank" href="item.html" :title="good.title">{{ good.title }}</a>
                  </div>
                  <div class="commit" v-show="good.id <= 100">
                    <i class="command">已有 <span>{{ Math.round(good.price - good.price * 0.4) * 2 }}</span> 人评价</i>
                  </div>
                  <div class="operate" v-show="good.id <= 100">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!--分页-->
          <!--<Pagination  :pageNo="8"  :pageSize="3" :total="91" :continues="5"/>-->
          <Pagination
              :pageNo="searchParams.pageNo"
              :pageSize="searchParams.pageSize"
              :total="total"
              :continues="5"
              @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from './SearchSelector/SearchSelector'
import {mapState} from 'vuex'
import {mapGetters} from 'vuex'

export default {
  name: 'Search',
  data() {
    //带给服务器的参数
    return {
      searchParams: {
        //产品相应的id
        category1Id: "",
        category2Id: "",
        category3Id: "",
        //产品的名字
        categoryName: "",
        //搜索的关键字
        keyword: "",
        //排序:初始状态应该是综合且降序
        order: "1:desc",
        //当前是第几页
        pageNo: 1,
        //每一页展示条数
        pageSize: 15,
        //平台属性的操作
        props: [],
        //品牌
        trademark: "",
      },
    };
  },
  components: {
    SearchSelector
  },
  //在挂载之前调用一次|可以在发请求之前将带有参数进行修改【在mounted函数之前】
  beforeMount() {
    //在发请求之前，把接口需要传递参数，进行整理（在给服务器发请求之前，把参数整理好，服务器就会返回查询的数据）
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  //组件挂载完毕只执行一次
  mounted() {
    //在发生请求之前带给服务器参数【searchParams参数发生变化,有数值带给服务器】
    this.getData();
  },
  computed: {
    //mapGetters 里面的写法 传递的是数组，因为getters的计算是没有划分模块的【没有home、search之分】，只要仓库中有叫对应属性的【比如我在home的仓库中写的】都能捞到
    ...mapGetters(['goodsList']),
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
    //获取search模块展示产品一共多少数据
    ...mapState({
      total: (state) => state.search.searchList.total,
    }),
  },
  methods: {
    //向服务器发请求获取search模块数据（根据参数的不同返回不同的数据进行展示）
    getData() {
      this.$store.dispatch('getSearchList', this.searchParams);
    },
    //删除分类的名字
    removeCategoryName() {
      //把带给服务器的参数置空了，还需要向服务器发请求
      //带给服务器参数说明可有可无的：如果属性值为空的字符串还是会把相应的字段带给服务器
      //但是你把相应的字段变为undefined，当前这个字段不会带给服务器
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      //再次发送请求
      this.getData();
      //地址栏也需要需改：进行路由跳转(现在的路由跳转只是跳转到自己这里)
      //严谨：本意是删除query，如果路径当中出现params不应该删除，路由跳转的时候应该带着
      if (this.$route.params) {
        this.$router.push({name: "search", params: this.$route.params});
      }
    },
    //删除关键字
    removeKeyword() {
      //给服务器带的参数searchParams的keyword置空
      this.searchParams.keyword = undefined;
      //再次发请求
      this.getData();
      //通知兄弟组件Header清除关键字 --- 搜索框置空
      this.$bus.$emit("clear");
      //进行路由的跳转
      if (this.$route.query) {
        this.$router.push({name: "search", query: this.$route.query});
      }
    },
    //删除品牌的信息
    removeTradeMark() {
      //将品牌信息置空
      this.searchParams.trademark = undefined;
      //再次发请求
      this.getData();
    },
    //品牌的自定义事件回调
    trademarkInfo(trademark) {
      //1:整理品牌字段的参数  "ID:品牌名称"
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      //再次发请求获取search模块列表数据进行展示
      this.getData();
    },
    //收集商品平台属性地方回调函数（自定义事件）
    attrInfo(attr, attrValue) {
      //["属性ID:属性值:属性名"]
      //console.log(attr, attrValue);
      //参数格式整理好
      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      //数组去重 放置同一个元素点击多次导致面包屑重复
      if (this.searchParams.props.indexOf(props) == -1)
        this.searchParams.props.push(props);
      //再次发请求
      this.getData();
    },
    //removeAttr删除售卖的属性
    removeAttr(index) {
      //再次整理参数
      this.searchParams.props.splice(index, 1);
      //再次发请求
      this.getData();
    },
    //排序的操作
    changeOrder(flag) {
      //flag:用户每一次点击li标签的时候，用于区分是综合（1）还是价格（2）
      //现获取order初始状态【咱们需要通过初始状态去判断接下来做什么】
      let originOrder = this.searchParams.order;
      //切割
      let orginsFlag = originOrder.split(":")[0];
      let originSort = originOrder.split(":")[1];
      //console.log(originOrder , orginsFlag , originSort)
      //新的排序方式
      let newOrder = "";
      //判断的是多次点击的是不是同一个按钮  同一个就一定是综合
      if (flag == orginsFlag) {
        newOrder = `${orginsFlag}:${originSort == "desc" ? "asc" : "desc"}`;
      } else {
        //点击不是同一个按钮
        newOrder = `${flag}:${"desc"}`;
      }
      //需要给order重新赋值
      this.searchParams.order = newOrder;
      //再次发请求
      this.getData();
    },
    //自定义事件的回调函数---获取当前第几页
    getPageNo(pageNo) {
      //整理带给服务器参数
      this.searchParams.pageNo = pageNo;
      //console.log(pageNo);
      //再次发请求
      this.getData();
    },

  },
  //数据监听：监听组件实例身上的属性的属性值变化
  watch: {
    //监听路由的信息是否发生变化，如果发生变化，再次发起请求
    $route(newValue, oldValue) {
      //每一次请求完毕，应该把相应的1、2、3级分类的id置空的，让他接受下一次的相应1、2、3

      //分类名字与关键字不用清理：因为每一次路由发生变化的时候，都会给他赋予新的数据
      //每一次请求完毕，应该把响应的1、2、3级分类的id置空，让它接受下一次的响应的1、2、3 级id
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      //再次发请求之前整理带给服务器参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      //再次发起ajax请求
      this.getData();
    },
  },

}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #eae0e0;
          background: #292727;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #3c3636;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #e3dbdb;
          border: 1px solid #000000;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #0e0e0e;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #2f2a2a;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 30px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 200px;
                height: 235px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 20px;
                color: #f5f0f0;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 48px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #efe8e8;
                  text-decoration: none;
                  font-size: 13px;
                  transition: all 500ms;
                }

                a:hover {
                  color: #6cb2c6;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #f5f0f0;

                span {
                  font-weight: 700;
                  color: #f83636;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #211f1f;
                  color: #282525;
                  transition: all 500ms;

                  &:hover {
                    border: 1px solid #1a1919;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #211f1f;
                  color: #282525;
                  transition: all 500ms;

                  &:hover {
                    border: 1px solid #1a1919;
                    background-color: #666;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
