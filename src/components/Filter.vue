<template>
	<div class="filter-row" ref="filterRow">
		<div class="filter-box" :class="{sortsFix: fixTop}">
			<slot name="SectionName"></slot>	
		  	<ul class="filter-column bottom-line">
	  			<li>
	  				<span>综合</span>
	  				<i class="y-font icon-d-arrow"></i>
	  			</li>
	  			<li><span>销量</span></li>
	  			<li><span>评价</span></li>
	  			<li>
					<span>价格</span>
	  				<span class="price-icon">  				
	  					<i class="y-font icon-t-arrow"></i>
	  					<i class="y-font icon-d-arrow"></i>
	  				</span>
	  			</li>
	  			<li @click="filterShow(true)">
	  				筛选
	  				<i class="y-font icon-filter"></i>
	  			</li>
	  		</ul>
  		</div>
  		<slot name="productsList"></slot>
  	</div>
</template>
<script>

export default {
	name: 'FilterRow',
	data () {
		return {
			fixTop: false
		}
	},
	mounted () {
		window.addEventListener('scroll',this.belowSearchBox)
	},
	beforeDestroy() {
		window.removeEventListener('scroll',this.belowSearchBox)	
	},
	methods: {
		belowSearchBox () {
		  let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
		  let offsetTop = this.$refs.filterRow.offsetTop
		  this.fixTop =  scrollTop  > offsetTop -60
		},
	}

}
</script>
<style lang="scss" scoped>
@import 'css/base.scss';

.filter-row {
	.filter-box {
		width: 100%;
	}
	h4 {
		background: $themeColor;
		padding: 10px;
		font-size: $font-m;
	}
	.y-font {
		font-size: $icon-xs;
		vertical-align: middle;
	}
}

//搜索页筛选栏的单独样式
.search {
	.filter-row {
		padding-top: $head-wrap;
	}
	.filter-box {
		position: fixed;
		top: $head-wrap;
		left: 0;
		z-index: 200;
	}

}

//筛选栏固定到顶部样式
.sortsFix {
	position: fixed;
	top: $head-wrap;
	left: 0;
	z-index: 200;
}

//筛选栏样式
.filter-column {
	background: $white;
	display: flex;
	justify-content: space-between;
	box-sizing: border-box;
	font-size: $font-s;
	padding: 10px;
	li {
		line-height: 30px;
		.price-icon{
			width: $icon-xs;
			display: inline-block;
			line-height: 9px;
			vertical-align: -5px;
		}
	}
}

//产品列表样式
.item-list {
	li {
		height: $head-wrap;
		padding: .1rem .2rem;
		display: flex;
		justify-content: space-between;
		.item-price {
			color: $orange;
		}
		.item-operation {
			position: absolute;
			right: 0;
			bottom: 0;
		}

	}
}


</style>
