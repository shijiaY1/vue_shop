//路由的配置信息
import Home from "@/pages/Home";
import Search from "@/pages/Search";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Detail from "@/pages/Detail";
import AddCartSuccess from "@/pages/AddCartSuccess";
import ShopCart from "@/pages/ShopCart";
import Trade from '@/pages/Trade'
import Pay from '@/pages/Pay'
import PaySuccess from '@/pages/PaySuccess/index'
import Center from '@/pages/Center'
//引入二级路由组件
import MyOrder from '@/pages/Center/myOrder'
import GroupOrder from '@/pages/Center/groupOrder'

export default [
    {
        path: "/home",
        component: Home,
        //给路由组件附上meta属性 ， meta里的show为是否显示的属性！
        meta: {show: true}
    },
    {
        path: '/search/:keyword?',
        component: Search,
        meta: {show: true},
        name: 'search',
        props: route => ({keyword3: route.params.keyword, keyword4: route.query.keyword2})
        //路由组件传递props数据  布尔值写法
        //props:true,

        //对象写法：
        //props:{a:1,b:2},

        //函数写法 --- 最常用 可以把params参数，query参数，通过props传递给路由组件
        /*            props:($route)=>{
                        return{
                            keyword:$route.params.keyword,k:$route.query.k
                        };
                    }*/
    },
    {
        path: "/login",
        component: Login,
        meta: {show: false}
    },
    {
        path: "/register",
        component: Register,
        meta: {show: false}
    },
    // 重定向 在项目跑起来的时候，访问/， 立马让它定向到首页
    {
        path: '*',
        redirect: "/home"
    },
    {
        path: "/detail/:skuid",
        component: Detail,
        meta: {show: true}
    },
    {
        name: 'addcartsuccess',
        path: "/addcartsuccess",
        component: AddCartSuccess,
        meta: {show: true}
    },
    {
        name: 'shopcart',
        path: "/shopcart",
        component: ShopCart,
        meta: {show: true}
    },
    {
        path: '/trade',
        component: Trade,
        /* 只能从购物车界面, 才能跳转到交易界面 */
        beforeEnter(to, from, next) {
            if (from.path === '/shopcart') {
                next()
            } else {
                next('/shopcart')
            }
        }
    },
    {
        name: 'pay',
        path: "/pay",
        component: Pay,
        meta: {show: true},
        /* 只能从交易界面, 才能跳转到支付界面 */
        beforeEnter(to, from, next) {
            if (from.path === '/trade') {
                next()
            } else {
                next('/trade')
            }
        }
    },
    {
        name: 'paysuccess',
        path: "/paysuccess",
        component: PaySuccess,
        meta: {show: true}
    },
    {
        name: 'center',
        path: "/center",
        component: Center,
        meta: {show: true},
        //二级路由组件
        children:[
            {
                path:'myorder',
                component:MyOrder,
            },
            {
                path: 'grouporder',
                component: GroupOrder,
            },
            {
              path:'/center',
              redirect:'/center/myorder',
            },
        ]
    },
]