<template>
	<div class="sorts">
	  	<nav-head @focused="$router.push('/search')"></nav-head>
	  	<div class="sort-wrap">	  	
			<ul class="left">
				<li 
				v-for="(item,index) in sortsJson"   
				@click="changebackGround(index)" 
				:class="{liActive:index==num}"
				:key="index">
				<span>{{item.name}}</span>
				</li>
			</ul>
			<ul class="right" v-for="(key,value) in sortsJson" :key="value" v-show="value===num">
				<li v-for="(moreDetail,index) in key.detail " :key="index">
					<a href="javascript:void(0);">
						<img v-lazy="require('images/sorts/cellphone.png')" alt="">
						<p>{{moreDetail}}</p>
					</a>
				</li>
			</ul>
		</div>
		<foot></foot>
	</div>
</template>
<script>
import NavHead from 'components/NavHead'
import Foot from 'components/Foot'
import sortsData from 'common/sorts.js'

import axios from 'axios'
export default {
	name:'Sorts',
	data(){
		return {
			toggleClass: false,
			num: 0,
			sortsJson: sortsData,
		}
  },
	components:{
		NavHead,Foot
	},
	methods:{
		changebackGround(n){
			this.toggleClass = !this.toggleClass
			this.num = n
		},
	}
}

</script>
<style lang="scss" scoped>
@import 'css/base.scss';

.sorts{
	width:100%;
	height:100%;
	box-sizing:border-box;
	position:absolute;
	left: 0;
	top: 0;
}
.sort-wrap{
	width:100%;
	height:100%;
	box-sizing:border-box;
	padding: $head-wrap 0;
	overflow:hidden;
	display: flex;
	text-align: center;
	>ul {
		overflow-y: scroll;
	}
}

.left {
	flex: 1;
	border-right: 1px solid $white-gray;
	li {
		height: $head-wrap;
		line-height: 30px;
		text-align:center;
		box-sizing: border-box;
		padding: .2rem .35rem;
		span {
			display: block;
			position: relative;
		//左侧分类选种样式
			&:after {
				content: "";
				display: block;
				position: absolute;
				width: 100%;
				height: 100%;
				border-radius: 15px;
				top: 0;
				z-index: -1;
				transform: scale(0,0);
				transition: all .5s linear;
				transform-origin: 50% 50%;
			}
		}
	}
	.liActive {
		span:after {
			background: $themeColor;
			transform: scale(1,1);
			transform-origin: 50% 50%;
		}
	}
}
.right{
	flex: 2;
	right: 0;
	padding: .2rem;
	display:flex;
	justify-content:start;
	flex-flow:wrap;
	align-content:flex-start;

	li {
		width:33.33333%;
		margin-bottom: .5rem;
		overflow:hidden;

		p{
			@extend .text-ellipsis;

		}
		img {
			width: 100%;
		}
	}
}

</style>
