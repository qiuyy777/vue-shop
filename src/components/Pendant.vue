<template>
  <div class="pendant">
  	<span class="scroll-top" ref="backToTop" @click="goTop">
  		<i class="y-font icon-go-top"></i><br>
  	</span>
  </div>
</template>	

<script>

import { mapState } from 'vuex'
	export default {
  data () {
    return {
      isTop: true,
    }
  },
  mounted () {
    this.needScroll()
  },
  methods: {
    needScroll () {
      let clientHeight = document.documentElement.clientHeight
      let obtn = this.$refs.backToTop;
      window.onscroll = function () {
        let oH = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (oH >= clientHeight/3) {
          obtn.style.display = 'block'
        } else {
          obtn.style.display = 'none'
        }
        this.isTop = false
      }
    },
    goTop () {
        window.scrollTo(0,0)
    },    
  }
	}
</script>

<style lang="scss" scoped>	
@import 'css/base.scss';

.pendant {
	position: fixed;
	right:0;
	bottom: 1rem;
	text-align:center;
	a,span {
    color:$media-gray;
  }
	.y-font {
		font-size: $icon-m;
	}
  .icon-go-top {
    font-size: $icon-l;
  }
	
}

.scroll-top {
	margin-top: .2rem;
	display: none;
}
</style>
	
