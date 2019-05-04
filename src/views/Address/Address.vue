<template>
	<div class="address">
		<nav-head  :showInput="false" :rightIcon="false">		
			<h3 slot="headTitle">收货地址 </h3>
		</nav-head>
		<p @click="showAddreModal(true)" class="add-address">新增地址</p>	
		<ul  class="address-list">
			<li class="deep-gray-active" 
			v-for = "(item,index) in addressList" 
			:key="index" 
			v-bind:class="{'check':index === 0}">
				<i class="y-font icon-delete" @click="delAddr(item,index)"></i>
				<p class="receiver">收件人：{{item.receiver}}</p>
				<p class="cellphone">联系方式：{{item.tel}}</p>
				<p class="cityinfo">收件地址：{{item.addressDetail}}</p>
				<p class="addrDefault" v-if="index===0"><strong>默认地址</strong></p>
				<p class="modify-address" v-else>
					<a href="javascript:void(0);"
					 @click="setDefault(item.addressId)">设为默认地址
					</a>
				</p>
			</li>				
		</ul>
		<div class="mask" v-show="addrModalShow">
			<div class="add-new-addr">
					<h3>添加新地址</h3>
					<div class="login-form">
						<i 
						class="y-font icon-close" 
						@click="showAddreModal(false)"></i>
						<input 
						type ="textarea" 
						placeholder="收货人" 
						v-model="newAddr.receiver" 
						name="receiver" />				
						<input 
						type ="textarea" 
						placeholder="联系方式" 
						v-model="newAddr.telNum" 
						name="cellphone"/>
						<input 
						type ="textarea" 
						placeholder="收货地址" 
						v-model="newAddr.addr" 
						name="addr"/>
	            <div class="save-addr"  @click="saveAddr"  >保存</div>   
					</div>
			</div>
		</div>
		<modal ref="modal" @close="closeModal"></modal>
	</div>
</template>
<script>
	import axios from 'axios'
	import Foot from 'components/Foot'
	import Modal from 'components/Modal'
	import {modalControl} from 'common/mixins.js'
	import NavHead from 'components/NavHead'
	export default {
		name:'Address',
		components:{
			Modal,
			NavHead,
			Foot
		},
		data(){
			return{
				checkIndex:0,
				addressList:[],
				limit:3,
				addrModalShow:false,
				newAddr:{
					receiver:'',
					telNum:'',
					addr:'',
				},
				defaultTag:false,
			}
		},
		mounted(){
			this.init();
		},
		mixins:[modalControl],			
		methods:{
			init(){
				axios.get('/address/list').then((response)=>{
					let res = response.data
					if(res.status === '0'){
						if(typeof(res.result.addressList) === "null"){
							this.addressList = [ ]
						}else{
							this.addressList = res.result.addressList
							this.shiftAddr();
						}
					}
				});
			},
			setDefault(addressId) {
				axios.post('/address/setDefault',{
					addrId:addressId
				}).then((response) => {
					let res = response.data
            if(res.status == '0'){
            		this.init()
            }										
				});
			},
			//总是将默认的地址放在第一个
			shiftAddr() {
				for(let i = 0 ; i < this.addressList.length; i++ ){
					if(this.addressList[i].isDefault === true){
						let theFirst = this.addressList[0];
						this.addressList[0] = this.addressList[i];
						this.addressList[i] = theFirst;
					}
				}
			},
			saveAddr() {
				var isDefault = this.addressList.length > 0 ? false : true
				axios.post('/address/add',{
					'receiver': this.newAddr.receiver,
					'telNum': this.newAddr.telNum,
					'addr': this.newAddr.addr,
					'isDefault': isDefault								
				}).then((response)=>{
					let res = response.data;
					if(res.status === '0'){
						this.init()
						this.showAddreModal(false)
						this.newAddr = {
							receiver:'',
							telNum:'',
							addr:'',
						}
					}
				});
			},
			showAddreModal(tf){
				this.addrModalShow = tf
			},
			delAddr(item,index) {
			/*至少保留一条地址*/
			    let _index = index
				if(this.addressList.length === 1) {
					this.showModal('至少保留一个收货地址')
				}else {
				//删除的数据是否为默认地址
				//如果不是默认值地址，直接删除
					if(_index != 0) {
						axios.post('/address/delete',{addrId:item.addressId}).then((response) => {
							let res = response.data
							if(res.status === '0'){
								this.init()
							}
						});
					}else {
						let newDefaultIndex = this.addressList[1].addressId;
						axios.post('/address/delete',{addrId:item.addressId}).then((response) => {
							let res = response.data
							if(res.status === '0'){
								this.setDefault(newDefaultIndex)
							}
						});
					}					
				}
			}
		}
	}
</script>
<style lang ='sass' scoped>
@import 'css/base.scss';
.add-address {
	line-height: .8rem;
	text-align :right;
	padding: 0 .2rem;
}
.address-header {
	width: 100%;
	div{
		background: $themeColor;
		>h3 {
			line-height: 1rem;
			padding: 0 .2rem;
			width:100%;
			font-size: $font-m;
		}
	}
	>p{
		text-align: right;
		line-height:.8rem;
		padding-right: .2rem;
	}
}

/* 地址列表中内容的样式 */
.address-list {
	width: 100%;
	padding:0 .2rem;
	box-sizing: border-box;
	li{
	    padding: .2rem;
	    box-sizing: border-box;
	    border: 1px solid $light-gray;
	    color: $media-gray;
	    font-size:$font-xs;
	    line-height: .21rem;
	    margin-bottom: .17rem;
	    position:relative;
	    .icon-delete {
	    	color: $light-gray;
	    	position: absolute;
	    	right: .2rem;
	    	top: .2rem;
	    	font-size: $icon-m;
	    }
	    p{
	    	line-height: 1.4;
	    }
	}
	.check{
		border-color: $themeColor;
	}
}


/* 修改收货地址 */
.address-list .modify-address,.address-list .addrDefault{
	text-align:right;
	margin-top: .28rem;

}
.address-list .modify-address {
	a {
		color: $media-gray;
	}
}
.address-list .addrDefault {
	line-height:0;
}

/* 添加地址样式 */
.address-list .add-address{
	text-align: center;
	color: $media-gray;
}
.mask .add-new-addr{
	width:100%;
	box-sizing:border-box;
	padding: .2rem;
	position: absolute;
	bottom: 0;
	left:0;
	h3{
		text-align: center;
		line-height:.6rem;
	}
	.icon-close {
		position:absolute;
		right: .2rem;
		top: .2rem;
		font-size:$icon-s;
	}
	input,.save-addr{
		width:98%;
		height: .6rem;
		margin-top: .1rem;
		line-height: .6rem;
		padding: 0;
		padding-left: 5px;

	}
	.save-addr{
		background: $orange;
		color: $white;
		font-size: $font-s;
		text-align: center;
	}
}



</style>