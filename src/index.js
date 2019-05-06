import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import './assets/font/iconfont.css'
import VueLazyload from 'vue-lazyload'
import infiniteScroll from 'vue-infinite-scroll'
import fastClick from 'fastclick'
import swiper from 'vue-awesome-swiper'
import Vuex from 'vuex'

import store from './store'
import { getCartCount, } from 'common/mixins.js'

// 一定记得要引入
import 'swiper/dist/css/swiper.css'

fastClick.attach(document.body)

Vue.use(infiniteScroll);
Vue.use(swiper);
Vue.use(VueLazyload, {
    loading: require('@/assets/images/loading-bars.svg'),
    try: 3, // default 1
    lazyComponent: true
})

Vue.use(Vuex);
import { mapState, mapActions } from 'vuex'
new Vue({
    el: '#app',
    store,
    router,
    mounted() {
        this.checkLogin()

    },
    methods: {
        ...mapActions(['updateAll', 'updateCartCount']),
        checkLogin() {
            axios.get('/users/checkLogin').then((response) => {
                var res = response.data;
                if (res.status === '0') {
                    this.updateAll(res.result)
                    this.getCartNum()
                } else {
                    return
                }
            });
        },
        getCartNum() {
            axios.get('/cart/list').then((response) => {
                let res = response.data
                if (res.status === '0') {
                    let cartList = res.result
                    if (cartList.length > 0) {
                        let cartNum = 0
                        cartList.forEach((item) => {
                            cartNum += parseInt(item.productNum)
                        })
                        this.updateCartCount(cartNum)
                    } else {
                        this.updateCartCount(0)
                    }

                }
            })
        },
    },

})