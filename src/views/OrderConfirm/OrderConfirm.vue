<template>
	<div class="order-confirm">
		<nav-head :showInput="false">
			<h3 slot="headTitle">订单确认</h3>
         </nav-head> 
		<div class="wrap">
			<div class="receive-address">				
				<h3>收货地址:</h3>
				<p class="edit-addr">
					<i class="y-font icon-sorts" @click="$router.push('/address')"></i>
				</p>
				<div v-if="addr.length>0">
					<p>
						<strong>收货人：</strong>{{addr[0].receiver}}
					</p>
					<p>
						<strong>联系方式：{{addr[0].tel}}</strong>
					</p>
					<p>
						<strong>收货地址：</strong>中华人民共和国{{addr[0].addressDetail}}
					</p>
				</div>					
			</div>
			<div>
				<span v-for="item in itemList">{{item.isSelected}}</span>
			</div>
			<ul class="order-list">
				<li>
					<strong>订单详情：</strong>
				</li>
				<item-list 
				:list="itemChecked" 
				:itemNum="true" 
				class="bottom-dash">
				</item-list>
				<li class="total">
					<span>共计:</span>{{totalQTY}}件
					<span>总额:￥
						<strong class="amount">{{totalPrice}}</strong>
					</span>
				</li>					
			</ul>
			<div class="pay-it">
				<span  
				@click="sendOrder" 
				href="javascript:void(0);">
					<strong>确认</strong>
				</span>					
			</div>
		</div>	
		<modal ref="modal" class="warning-message"  @close="closeModal"></modal>
	</div>
</template>
<script>
	import axios from 'axios'
	import Modal from 'components/Modal'
	import NavHead from 'components/NavHead'
	import { modalControl} from 'common/mixins'
	import ItemList from 'components/ItemList'
	export default {		
		name:'orderConfirm',
		components:{
			Modal,
			NavHead,
			ItemList
		},
		data(){
			return{
				itemList: [],
				addr: '',
			}
		},
		computed:{
			totalPrice(){
				return this.itemList.reduce((prev, curr) => prev + curr.salePrice*curr.productNum,0);
			},
			totalQTY(){
				var totalItem = 0;
				this.itemList.forEach((item )=> {
					totalItem += Number(item.productNum)
				})
				return totalItem
			},
			itemChecked(){
				let itemCheck = []
				this.itemList.forEach((item)=>{
					item.ifSelected === true
					itemCheck.push(item)
				})
				return itemCheck
			}
		},
		mounted(){
			this.getAddr(),
			this.getCartList()
		},
		mixins:[modalControl],
		methods:{
			//获取购物车中选中的商品
			getCartList(){
        axios.get('/cart/list').then((response) => {
            let res = response.data
            if(res.status === '0'){
							let cartGoods = res.result.filter(item => {
            		 return item.ifSelected === true
            	})
            	this.itemList = cartGoods
            }
        })
      },
      //获取默认的地址
      getAddr(){
      	axios.get('/address/list').then((response) => {
      		let res = response.data
      		if(res.status === '0'){
	  				let allAddr = res.result
	  				this.addr = allAddr.addressList.filter(item => item.isDefault === true)
      		}
      	})
      },
      //下单
			sendOrder(){
				if(this.addr.length>0){
					axios.post('/order/placeOrder',{'total':this.totalPrice,'address':this.addr}).then((response) => {
						let res = response.data
						if(res.status === '0'){
							this.showModal('下单成功')
							this.$router.push('/home')

						}
					})
				}else{
						this.showModal('请添加收货地址')
				}
			}
		}
	}
</script>
<style lang ='sass' scoped>
@import 'css/base.scss';

.wrap {
    background: $white;
    padding: .2rem;
    box-sizing: border-box;
}

.edit-addr{
	text-align:right;
}
.receive-address {
	padding: .1rem 0;
	margin-bottom: .2rem;
	mar
	h3 {
		font-size: $font-s;
		text-align: left;
	}
	>div {
		margin-top: .1rem;
		border: 1px solid $light-gray;
		padding: .1rem;
		border-radius: 5px;
		position: relative;
		font-size: $font-xs;
		.icon-sorts {
			position: absolute;
			right: .1rem;
			top: .1rem;
		}
	}
}
.total {
	text-align: right;
	border-bottom:none;
	line-height:40px;
	strong {
		font-size: $font-m;
		color: $orange;
	}
}
.pay-it{
	span{
		display:block;
		text-align: center;
		width: 60px;
		height: 30px;
		line-height: 30px;
		float:right;
		color: $white;
		background: $orange;
		margin-top: 10px;
	}
}



</style>