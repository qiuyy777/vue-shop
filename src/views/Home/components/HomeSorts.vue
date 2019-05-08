<template>
	<div class="home-sorts">
		<swiper :options="swiperOption" ref="mySwiper" >
			<swiper-slide v-for="(page,index) in pages" :key="index">
				<div  v-for = "item in page" :key="item.src" class="eachClass">
					<img :src="require('images/sorts/'+item.src)" alt="" class="icons-img">
					<p>{{item.desc}}</p>
				</div>
			</swiper-slide>
			<div class="swiper-pagination"  slot="pagination"></div>
		</swiper >
  	</div>
</template>
<script>

export default {
	name: 'HomeSorts',
	props: {
		list:Array
	},
  data () {
    return {
      swiperOption: {
        autoplay: false,

		pagination: {
				 el: '.swiper-pagination',
				 clickable: true,

			},

      }
    }
  },
	computed: {
		pages () {
			const pages = []
			this.list.forEach((item,index) => {
				const page = Math.floor(index / 10)
				if(!pages[page]){
					pages[page] = []
				}
				pages[page].push(item)
			})
			return pages
		},

	},

}
</script>
<style lang="scss" scoped>
@import 'css/base.scss';

.home-sorts {
	font-size: $font-s;
	padding: .2rem 0;
    .swiper-slide {
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: start;
		box-sizing: border-box;
	}	
}
.eachClass {
	width: 20%;
	text-align: center;
	margin-bottom: .3rem;	
}
.icons-img {
	width: .8rem;
}


.home-sorts /deep/ {
	.swiper-pagination { 
		bottom: 0;
	}
	.swiper-slide,.swiper-pagination-bullet{

		transition:all .3s ease-in;
	}
	.swiper-pagination-bullet{
		width: .1rem;
		height: .1rem;
		border-radius: .1rem;
	}
	.swiper-pagination-bullet-active{
		width: .4rem;
		background:$themeColor;
	}
}

</style>
