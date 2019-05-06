<template>
	<div>
		<ul class="item-list">		
			<li v-for="item in listData " :key="item.productId" class="bottom-line">
				<div class="check-icon" v-show = "checkOption">
					<i  @click="checkItem(item)" class="y-font icon-check" v-bind:class="{'selected':item.ifSelected}"></i>		
				</div>
				<div class="item-desc" v-if="item.productName">
					<div class="item-img">
						<a href="javascript:void(0);">
							<img class="mini-cover" v-lazy="require('images/goodsList/'+item.productImage)">
						</a>
					</div>
					<div class="item-text">
						<p>{{item.productName}}</p>
						<p class="item-price">￥{{item.salePrice}}</p>
						<p class="item-qty" v-if="itemNum">x{{item.productNum}}</p>
					</div>
				</div>
				<p class="item-qty-edit" slot="operation" v-show="numEdit">
					<span class="plus" @click="editCart('add',item)">+</span>
					<input v-model="item.productNum" @change="setNum($event,item)">
					<span class="minus" @click="editCart('minus',item)">-</span>
				</p>
				<p v-show="cartIcon">
					<i class="y-font icon-cart" @click="addCart(item)" ></i>
				</p>
			</li>
			
			<li v-if = "loading != null" class="no-more">
				<loading v-if="loading"></loading>
				<p v-else>到底了</p>
			</li>
			<slot name = "loadMore"></slot>
		</ul>
	 </div>
</template>
<script>
import Loading from 'components/Onloading'
import axios from 'axios'
import { mapGetters , mapActions} from 'vuex'
export default {
	name:'ItemList',
	props:{
		list: Array,
		loading:{
			type:Boolean,
			default: null
		},		
		checkOption:{
			type:Boolean,
			default: false
		},
		numEdit:{
			type:Boolean,
			default: false
		},
		cartIcon:{
			type:Boolean,
			default: false
		},
		itemNum:{
			type:Boolean,
			default: false
		}

	},
	data(){
		return {
			listData:[]
		}
	},
	components: {
		Loading
	},
	computed:{
		...mapGetters(['loginFlag'])
	},
	methods:{
		...mapActions(['editCartCount']),
		setNum ($event,item) {
			let inputNum = $event.target.value
			if(inputNum === "0" || null){
				this.$emit('setNum',item,"1")
			}else{
				this.$emit('setNum',item,inputNum)
			}			
		},
		checkItem(item){
			this.$emit("choose",item)

		},
		editCart (edit,item) {
			this.$emit("numchange",edit,item)
		},
		addCart(item){
			if(this.loginFlag === false){
			this.$emit('login')
			}else{
				this.editCartCount("plus")
				axios.post("/cart/add",{
					productId:item.productId
				})
			}
		}
	},
	watch:{
		list: {
			immediate: true,
			handler (nw) {
				this.listData = nw
			}
		}
	}
}
</script>
<style lang="scss" scoped>
@import 'css/base.scss';

.item-list {
	font-size:$font-s;
}

li {
	height: $itemList-h;
	padding: 10px 5px;
	display: flex;
	justify-content: space-between;
	.icon-check {
		line-height: $itemList-h;
		font-size: $icon-m;
		margin: 0 5px;
	}

	&:nth-last-child(-n+2){
		border-bottom:0;
	}

}


.item-desc {
	flex:1;
	display: flex;
	justify-content: start;
	margin-left:10px;
	.item-img {
		a{
			display:block;
			width: $head-wrap;
			margin-top:10px;
			font-size:0;		
			img{
				width:100%;
			}
		}
	}
	.item-text {
		flex:1;
		display:flex;
		flex-direction:column;
		justify-content:space-between;
		margin-left:10px;
		.item-qty {
			font-size: $font-xs;
		}
	}
}

.item-qty-edit {
	margin-top:20px;
	span,input {
		float: right;
		padding: 3px 6px;
		border:1px solid $orange;
		text-align: center;
		font-size: $font-xs;
		height: 18px;
		line-height: 18px;
	}

	span:first-child {
		border-left: none;
	}

	span:last-child {
		border-right: none;
	}

	input {
		max-width: 20px;
		//解决ipad mini4中,chrome浏览器打开,input有圆角
		border-radius: 0;

	}
}

.icon-cart{
	font-size: $icon-l;
	line-height:$header-h;

}
.item-price,.selected {
	color: $orange;
}

.order-confirm,.order {
	.item-price,.item-qty {
		text-align:right;
	}
}

.no-more{
	height: $itemList-h;
	justify-content: space-around;
	align-items:center;
	p {
		color:$themeColor;
	}
	p:before,p:after {
		content:"------";
		padding: 0 10px;
		
	}
}
</style>
