<template>
	<div class="co-header">
		<div v-if="leftIcon">
			<i class="y-font icon-scan" v-if="showScan"></i>
			<i class="y-font icon-back" @click="$router.history.go(-1)" v-else></i>
		</div>
		<div class="search-box" v-if="showInput">
			<i class="y-font icon-search"></i>
			<input ref="searchInput" type="text" 
			:placeholder="searchWord" 
			@focus="focusOperation"
			v-model ="keyword"
			@keyup.enter="doSearch"
			>
			<i class="y-font icon-close"  @click="clearInput" v-if="keyword"></i>
		</div>
		<slot name="headTitle"></slot>
		<div v-if="rightIcon">
			<i class="y-font icon-photo"  v-if="showCamera"></i>
			<i @click = "$router.push('home')" class="y-font icon-home" v-else></i>
		</div>
	</div>
</template>
<script>
import { debounce } from 'common/util'
	export default {
		props:{
			searchWord: {
				type: String,
				default: '请输入关键词'
			},
			showScan: {
				type:Boolean,
				default:false
			},
			showCamera: {
				type:Boolean,
				default:false
			},
			showInput: {
				type:Boolean,
				default:true				
			},
			rightIcon: {
				type: Boolean,
				default: true					
			},			
			leftIcon: {
				type:Boolean,
				default:true					
			}
		},
		data () {
			return {
				keyword:''
			}
		},
  //当input为空显示历史搜索记录
  //当input不为空且没有按下enter键，
    //--在每次输入框变化的时候进行异步查询，显示简单的查询结果列表
  //当按下enter键盘，添加到历史查询记录，并显示查询的详情。
		created(){
			this.$watch('keyword',debounce((newKeyword) => {
				this.$emit('query',newKeyword)
			},20))
		},
		methods: {
			focusOperation(){
				this.$emit('focused')
			},
			clearInput() {
					this.keyword = ''
			},
			blur() {
				this.$refs.searchInput.blur()
			},
			setKeyword(kw){
				this.keyword = kw
			},
			doSearch(){
				this.$emit('pressenter')
				this.blur()
			}
		}, 
	}
</script>
<style lang="scss" scoped>
@import 'css/base.scss';

.co-header {
	  width: 100%;
    height: $head-wrap;
    line-height: $header-h;
    background: $themeColor;
    padding: 5px;
    box-sizing: border-box;
    position:fixed;
    top:0;
    left:0;
    z-index:200;
	  display: flex;
  	justify-content:space-between;
	  font-size:$font-m;
	.y-font {
		font-size:$icon-m;
	}
}
.search-box {
	height: $header-h;
	flex: 1;
	border-radius: 20px;
	background: $white;
	margin:0  5px;
	position: relative;
	padding:0 30px;
	.icon-search,.icon-close,.icon-photo {
		position: absolute;
		top:0;
	}
	.icon-search {
		left: 5px;
	}
	.icon-close,.icon-photo {
		right: 5px;
	}
	input{
		display:block;
		height:100%;
		width:100%;
		box-sizing:border-box;
		background: none;
		font-size:$font-m;
		
	}
}

</style>
