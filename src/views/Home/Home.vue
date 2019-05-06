<template>
  <div class="home">
  	<nav-header :showScan="true" :showCamera="true" @focused="jumpToSearch" ref="searchBox">
  	</nav-header>
  	<swiper :list='scrollImg'></swiper>
    <home-sorts :list="sortsIcon" ></home-sorts>
    <recommend  >
    	<h4 slot="SectionName">推荐:</h4>
    	<home-list :list="goodsList" slot="productsList" :cartIcon ="true" :loading="onloading"
    	@login="showModal('请登录')" >
  		<li class="view-more-normal" slot="loadMore" 
      v-infinite-scroll="loadMore" 
      infinite-scroll-disabled="busy" 
      infinite-scroll-distance="20">
  	   </li>
    	</home-list>
    </recommend>
    
    <foot></foot>
    <modal ref="modal" @close="closeModal"></modal>
  	<pendant></pendant>
  </div>
</template>
<script>
import NavHeader from 'components/NavHead'
import Swiper from './components/Swiper'
import HomeSorts from './components/HomeSorts'
import Recommend from 'components/Filter'
import HomeList from 'components/ItemList'
import Pendant from 'components/Pendant'
import Foot from 'components/Foot'
import Modal from 'components/Modal'

import axios from 'axios'

import {modalControl,forSearch} from 'common/mixins'
export default {
	mixins:[modalControl,forSearch],
	data(){
		return {
			page: 0,
			pageSize: 6,
			busy: false,
			goodsList: [],
			onloading: false,
			scrollImg: [
          'scroll-banner1.jpg',
          'scroll-banner2.jpg',
          'scroll-banner3.jpg',
          'scroll-banner4.jpg',
          'scroll-banner5.jpg'
    		],
			sortsIcon: [
				{src:'cellphone.png',desc:'手机'},
				{src:'PC.png',desc:'电脑'},
				{src:'tv.png',desc:'电视'},
				{src:'camera.png',desc:'相机'},
				{src:'monitor.png',desc:'摄像头'},
				{src:'wifi.png',desc:'路由器'},
				{src:'bike.png',desc:'出行'},
				{src:'health.png',desc:'健康'},					
				{src:'cable.png',desc:'配件'},
				{src:'UAV.png',desc:'无人机'},
				{src:'earphone.png',desc:'耳机'},
				{src:'ele-application.png',desc:'家电'},
				{src:'dailyuse.png',desc:'日用品'},
				{src:'furniture.png',desc:'家具'},
				{src:'bags.png',desc:'箱包'},
				{src:'shoes.png',desc:'鞋类'},
				{src:'cloth.png',desc:'服饰'},
				{src:'stationary.png',desc:'文具'},
			]
		}
	},
	components:{
		NavHeader,
		Swiper,
		HomeSorts,
		Recommend,
		HomeList,
		Foot,
		Pendant,
		Modal
	},
	mounted(){
		this.getGoodsList()
	},
	methods:{
		getGoodsList(flag){
			var param= {
				page:this.page,
        pageSize:this.pageSize,
	    };
      axios.get("/home/list",{
        params:param
      }).then((response)=>{
        var res = response.data        
        if(res.status === "0"){         
    			if(flag){
    			    this.goodsList = this.goodsList.concat(res.result.list)
    			    if(res.result.count < this.pageSize){
    			        this.busy = true
                  this.onloading = false

    			    }else{
    			        this.busy = false
    			    }
    			}else{
    				this.goodsList = res.result.list
    				this.busy = false
    			}
    			}else{
    				this.goodsList = []
    			}
    		});
    	  },
      loadMore() {
        this.busy = true
        this.onloading = true
        setTimeout(() => {
          this.page++
          this.getGoodsList(true)
        }, 1000)
    }
  }		
}

</script>

