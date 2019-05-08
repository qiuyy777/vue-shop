<template>
  <div class="cart">
		<nav-head :showInput="false" :showScan="false" :rightIcon="false">
			<p slot="headTitle">
				<span  @click="changeDelFlag" v-if="!delItemFlag">编辑</span>
				<span  @click="changeDelFlag" v-else>取消</span>
			</p>
		</nav-head>
		<cart-item-list 
		class="cart-goods"
		v-if="cartList.length>0"
		:list="cartList"  
		:numEdit="true" 
		:checkOption="true" 
		:itemNum="false"
		@numchange="editCart"
		@setNum="setNum"
		@choose="selectItem"
		>
		</cart-item-list>
		<div class="cart-check">
			<span   @click="changeAll">
				<i  class="y-font icon-check"  v-bind:class="{'selected':checkAllFlag}"></i>
				全选
			</span>
			<transition name="toggle-btm">
				<div class="checkout" v-if="!delItemFlag">          
					<span>总计：{{totalAmount}}元</span>
					<span @click="checkout">结算</span>
				</div>
				<div class="delete-btn" v-else >
					<span @click="deleteItem">删除</span>
				</div>
			</transition>
		</div>
		<modal ref="modal" @close="closeModal"></modal>
	</div>
</template>
<script>
	import NavHead from 'components/NavHead'
	import CartItemList from 'components/ItemList'
	import Modal from 'components/Modal'
	import axios from 'axios'
	import { mapGetters ,mapActions} from 'vuex'
	import { modalControl} from 'common/mixins.js'

	export default {
		name:'cart',
		components:{
			NavHead,
			Modal,
			CartItemList
		},
		data(){
			return {
				delItemFlag: false, 
				cartList: [],
				checkAllFlag: false,
				checkoutFlag: false
			}
		},
		computed: {
			...mapGetters(['loginFlag']),
			totalAmount(){
				let totalPrice = 0
				this.cartList.forEach((item) => {
					if(item.ifSelected){
							totalPrice += item.salePrice*item.productNum
					}
				})
				return totalPrice
			},
			checkedNum(){
				let selectedNum = this.cartList.filter((item) => {
					return item.ifSelected === true
				})
				return selectedNum.length
			},
		},
		mounted() {
			this.getCartList()
		},
		beforeDestroy(){
			this.clearCheck()
		},
		mixins:[modalControl],
		methods:{
			...mapActions(['updateAll','updateCartCount']),
			getCartList(){
				axios.get("/cart/list").then((response) => {
					let res = response.data
					if(res.status === "0"){
						this.cartList = res.result
						this.checkAll()
					}
				})
			},
			editCart(flag,item){
				if(flag == 'add'){
					item.productNum ++ 
				}else{
					item.productNum <= 1 ? '1' : item.productNum -- 
				}
				this.setNum(item,item.productNum)
			},
			setNum(item,num){
				axios.post("/cart/edit",{
					productId:item.productId,
					productNum:num
				})
			},
			clearCheck(){
					if(!this.checkoutFlag){
						axios.post("/cart/selectAll",{
							checkAll:this.checkAllFlag
						})
					}
			},
			changeAll(){
				if (this.cartList.length > 0){
					this.checkAllFlag = !this.checkAllFlag
					this.cartList.forEach((item) => {
						item.ifSelected = this.checkAllFlag
					})
					axios.post("/cart/selectAll",{
						checkAll:this.checkAllFlag
					})
				}
			},
			selectItem(item){
				item.ifSelected = !item.ifSelected
				axios.post("/cart/select",{
					productId:item.productId,
					itemChecked:item.ifSelected
				})
				this.checkAll()
			},
			changeDelFlag () {
				this.delItemFlag = !this.delItemFlag
			},
			deleteItem(){
				if( this.delItemFlag && this.checkedNum > 0){
					axios.post("/cart/delete",{
						delAll:this.checkAllFlag
					}).then((response) => {
						let res = response.data
						if(res.status == '0'){                  
							this.getCartList()
						}
					})	
				}
			},
			checkout(){
				if(this.checkedNum > 0){
					this.checkoutFlag = true 
					this.$router.push({
						path:"/orderconfirm"
					})
				}else{
					this.showModal('未选中商品')
					this.checkoutFlag = false
				}
			},
			checkAll(){
				if(this.cartList.length > 0 && this.checkedNum === this.cartList.length){
					this.checkAllFlag = true 
				}else {
					this.checkAllFlag = false
				}         			
			}
		}
	}
</script>
<style lang="scss" scoped>
@import 'css/base.scss';

.cart-check {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	display:flex;
	justify-content:space-between;
	height: $header-h;
	line-height: $header-h;
	background: $deep-gray;
	color: $white;
	font-size: $font-m;
	i{      
		color:$white;
		font-size: $icon-m;
		margin: 0 10px;
		vertical-align:-1px;
			
	}
	.selected {
		color: $orange;
	}
}
.checkout,.delete-btn {
		float: right;
		span:first-child {
			padding-right: 10px;
		}
		span:last-child {
			background: $orange;
			display: inline-block;
			width: 1.5rem;
			height: 100%;
			text-align: center;
			font-size: $font-l;
		}
}
</style>

