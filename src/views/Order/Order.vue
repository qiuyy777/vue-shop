<template>
	<div class="order">
		<order-nav :showInput="false" :rightIcon="false" :leftIcon="false">
			<p slot="headTitle">订单列表</p>
		</order-nav>
		<div v-if="orderList.length">
			<div v-for="(item,index) in orderList" class="order-list-wrap" :key="index">
				<item-list :list="item.itemList" class="bottom-dash" :itemNum="true"></item-list>
				<p class="total"><strong>总额:￥{{item.total}}</strong></p>								
				<p v-for="(addr,index) in item.addressInfo" :key="index">
					<span>收货人：{{addr.receiver}}</span><br>
					<span>联系方式：{{addr.tel}}</span><br>
					<span>地址：{{addr.addressDetail}}</span>
				</p>
				<p >下单时间：{{item.createDate}}</p>
				<p >订单编号：{{item.orderId}}</p>
			</div>
		</div>
		<foot></foot>
	</div>
</template>
<script>
	import axios from 'axios'
	import OrderNav from 'components/NavHead'
	import Foot from 'components/Foot'
	import ItemList from 'components/ItemList'
	export default {
		name:'OrderList',
		data(){
			return {
				orderList:[],
				inputWord:'查询订单'
			}
		},
		components:{
			OrderNav,
			Foot,
			ItemList
		},
		computed:{
			addressLimit(){
				return this.addressList.slice(0,this.limit);
			},
			totalPrice(){
				return this.orderList.reduce((prev, curr) => prev + curr.salePrice*curr.productNum,0);
			}
		},
		mounted(){
			this.init();
		},
		methods:{
			init(){
				axios.get('/order/list').then((response)=>{
					let res = response.data
					if(res.status === '0'){
						this.orderList = res.result
					}
				});
			}
		}
	}
</script>
<style lang ='sass' scoped>
@import 'css/base.scss';
.order {
	background: $white-gray;
}
.order-list-wrap {
	background: $white;
	margin-bottom: .2rem;
	padding: .1rem;
	>p {
		line-height: 20px;
		font-size: $font-xs;
	}
	.total {
		text-align:right;
		font-size: $font-s;
		line-height: 30px;
		color: $orange;
	}
}




</style>