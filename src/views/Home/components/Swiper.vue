<template>
	<div class="home-swiper">
	  <swiper :options="swiperOption" ref="mySwiper" v-if=" list.length > 0">
	    <swiper-slide v-for="item of list" :key="item" v-show=" list.length > 0">
			<img :src="require('images/'+item)"   class="swiper-img"/>
	    </swiper-slide>
	  </swiper>
  </div>
</template>
<script>
  export default {
    name: 'homeSwiper',
		props: {
			list: Array
		},
    data() {
      return {
        swiperOption: {
        	loop: true,
        	autoplay: {
        		delay: 5000,
        		disableOnInteraction: false,
        	},
        	effect: 'fade'
        }
      }
    },

  }
</script>

<style lang="scss" scoped>
@import 'css/base.scss';
.swiper-img{
		width: 100%;
}

</style>

