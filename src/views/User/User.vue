<template>
	<div class="user">
		<div class="user-head">
            <a href= "javascript:void(0);" 
            class="y-font" 
            @click="doLogin">
	            <span class="avatar">
	            	<i class="y-font icon-user-portrait" :class="{'hasLogin':loginFlag}"></i>
	            </span>
		        <span  @click="doLogin">{{nickName}}</span>
            </a>
        </div>
        <div class="my-order">
        	<div class="all-order">
        		<h3>我的订单</h3>
        		<router-link to="order">查看全部
        			<i class="y-font icon-r-arrow"></i>
        		</router-link>
        	</div>
			<ul class="order-condition">
				<li v-for="(item,value) in orderCondition" :key="value">
					<i class="y-font" :class="item.className"></i>
					<p>{{item.title}}</p>
				</li>
			</ul>
		</div>
		<div class="divider"></div>
		<ul class="settings">
			<li>
				<img :src="require('images/svg/address.svg')">
				<a  @click="goToAddress" >收货地址</a>
			</li>
			<li @click="signOut">
				<img :src="require('images/svg/logout.svg')">
				<router-link to="user">退出登录</router-link>
			</li>
			<li>
				<img :src="require('images/svg/server.svg')">
				<router-link to="home">我的客服</router-link>
			</li>	
		</ul>
		<foot></foot>
		<modal ref="modal" @close="closeModal"></modal>	
	</div>
</template>
<script>
import Foot from 'components/Foot'
import Modal from 'components/Modal'
import NavHead from 'components/NavHead'
import axios from 'axios'
import { mapGetters,mapActions } from 'vuex'

import { modalControl} from 'common/mixins'

export default {
	name:'User',
	mixins:[modalControl],	
	components:{
		NavHead,
		Foot,
		Modal
	},
	data(){
		return{
			orderCondition:[
				{title:'待付款',className:"icon-unpaid"},
				{title:'待发货',className:"icon-parcel"},
				{title:'待收货',className:"icon-receive"},
				{title:'待评价',className:"icon-message"},
				{title:'退货退款',className:"icon-refund"}
			]
		}
	},
	created(){
		this.changeCartNum()
	},
	computed:{
		...mapGetters(['nickName','loginFlag'])
	},
	beforeMounted(){
		this.aimHeight = document.documentElement.clientHeight
	},
	methods: {
		...mapActions(['updateAll','updateCartCount']),
		doLogin(){
			if(!this.loginFlag){
				this.$router.push("/login")
			}
		},
		signOut(){
			if(this.loginFlag){
				axios.post("/users/logout").then((response) => {
					let res = response.data;
					if(res.status === '0'){
						this.updateAll('点击登录')
							this.updateCartCount('0')
							this.showModal('已退出')
					}
				})
			}else{
				this.$router.push({path:'/user'});
			}
		},
		goToAddress(){
			if(this.loginFlag){
				this.$router.push('/address')
			}else{
				this.showModal('请登录')
			}
		},
		changeCartNum(){
			if(this.loginFlag){
					axios.get('/cart/list').then((response) => {
							let res = response.data
							if(res.status == '0'){
									if(res.result.length>0){
										this.cartList = res.result
										this.updateCartCount(this.cartList)
									}else{
										this.cartList = []
										this.updateCartCount('0')
								}
							}
					})        		
			}else{
					this.updateCartCount('0')
			}
		}
	}
}

</script>

<style lang='scss' scoped>
@import 'css/base.scss';

.y-font {
	font-size:$icon-m;
}

.hasLogin {
	color:$themeColor;
}
.user-head {
	padding:10px;
	background:$themeColor;
	a {
		height: 60px;
		width:100%;
		display: block;
		line-height:60px;
		img {
			width:60px;
			height:60px;
			border-radius:30px;
			vertical-align:middle;
		}
		span {
			vertical-align:middle;
		}
	}
}

.my-order {
	width: 100%;
	height: 120px;	
	background: $themeColor;
	box-sizing: border-box;
	h3 {
		font-size: $font-m;
	}
	.all-order{
		padding: 10px 10px 0 10px;
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;
		a {
			color: $media-gray;
			font-size: $font-xs;
		}
		.y-font {
			vertical-align: middle;
			font-size: $icon-xs;
		}
	}
}

.avatar {
	width:60px;
	height:60px;
	display:inline-block;
	background:$white;
	border-radius:30px;
	text-align:center;
	line-height:60px;
	i {
		font-size:40px;
	}
	.login {
		color: $themeColor;
	}
}
.order-condition{
	height: 70px;
	display: flex;
	justify-content: space-between;
	>li{
		width: 100%;
		text-align: center;
		font-size:$font-xs;
		p{
			margin-top: 5px;
		}
	}
}
.settings{
	width: 100%;
	padding-top: .2rem;
	height: 6rem;
	background: $white;
	box-sizing: border-box;
	font-size: $font-s;
	margin-bottom:60px;
	li{
		height: .6rem;
		line-height: .6rem;
		padding-left: .28rem;
		padding-bottom: .1rem;
		img {
			width: .4rem;
			vertical-align: middle;
			padding-right: 10px;
		}
	}
}


</style>