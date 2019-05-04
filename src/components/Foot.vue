<template>
	<div class="site-end" ref="foot">
			<router-link to="home">
				<i class="y-font icon-home"></i><br>
				<span>主页</span>
			</router-link>
			<router-link to="sorts">
				<i class="y-font icon-sorts"></i><br>
				<span>分类</span>
			</router-link>
			<a href="javscript:void(0);" class="cart-icon" @click="redirectTo('cart')">
				<i class="y-font icon-cart "></i><br>
				<span>购物车</span>
				<span class="cart-num" ref="cartNum">{{cartCount}}</span>
			</a>		
			<a  href="javscript:void(0);" @click="redirectTo('order')">
				<i class="y-font icon-order"></i><br>
				<span>订单</span>
			</a>
			<router-link to="user">
				<i class="y-font icon-user-portrait"></i><br>
				<span>我的</span>
			</router-link>
		<modal ref="modal" @close="closeModal"></modal>
	</div>
</template>
<script>
	import { mapGetters } from 'vuex'
	import Modal from 'components/Modal'

	import { modalControl} from 'common/mixins'

	export default {
		name:'Foot',
		components:{
			Modal
		},
		computed:{
    		...mapGetters(['cartCount','loginFlag']),
  		},
  	mixins:[modalControl],
		methods:{
		    redirectTo(path){
		    	if(!this.loginFlag){
						this.showModal('请登录')
					}
					else{
						this.closeModal()
						this.$router.push("/"+ path)
					}
		    },
		}
	}
</script>
<style lang="scss" scoped>
@import '../assets/css/base.scss';

.site-end {
	width:100%;
	height:$head-wrap;
	padding: 3px 5px;
	box-sizing:border-box;
	position: fixed;
	left: 0;
	bottom: 0;
	text-align: center;
	display: flex;
	justify-content: space-around;
	color: $media-gray;
	background: $white-gray;
	z-index: 200;
	.y-font {
		font-size: $icon-m;
	}

}
.cart-icon {
 	position: relative;
}
.cart-num {
color: $white;
width:auto;
padding:0 4px;
line-height: 16px;
border-radius: 16px;
position: absolute;
right: -10px;
top: 0;
background: $orange;
text-align: center;
font-size: 12px;
}
</style>
