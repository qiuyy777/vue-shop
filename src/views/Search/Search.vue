<template>
  <div class="search">
  	<search-nav  @query="wordChange"  ref="searchBox"  @pressenter="searchAll" >
  	</search-nav>
    <div v-if="!searching">
      <div v-if="!keyword">
        <div  class="search-info" >
              <h4>搜索历史                        
                <i class="y-font icon-delete" @click="clearSearchHistory"></i>
              </h4>
              <div class="history-keywords" v-if="searchHistory.length">
               
                <span 
                v-for="(item,index) in searchHistory" 
                :key="index" 
                @click="setKeyword(item)">{{item}}
                </span>
              </div>
              <p v-else>暂无搜索历史</p>
        </div>                   
      </div>
      <ul class="search-result" v-else>
          <li 
          v-for="(item,index) in searchResult" 
          @click= "setKeyword(item.productName)" :key="index">
          {{item.productName}}
          </li>
          <no-result v-show = "!searchResult.length" tag="li"></no-result> 
      </ul>
    </div>
    <div v-else>    
      <item-filter v-if= "searchResult.length">
          <item-list 
          slot="productsList" 
          :list="searchResult" 
          :itemNum="false" 
          :checkOption="false" 
          :cartIcon="true"
          >
          </item-list >
      </item-filter>
      <no-result v-else></no-result>      
    </div>
  </div>
</template>
<script>
import SearchNav from 'components/NavHead'
import ItemFilter from 'components/Filter'
import Loading from 'components/Onloading'
import ItemList from 'components/ItemList'
import NoResult from 'components/NoResult'
import {mapGetters, mapMutations, mapActions} from 'vuex'
import axios from 'axios'

export default {
	name:'Search',
    data(){
	    return {
	      keyword:'',
	      searchResult: [],
        searching:false,
        onloading: true
    	}
  	},
  	components:{
  		SearchNav,
  		ItemFilter,
      ItemList,
      NoResult,
      Loading
  	},
    computed:{
      ...mapGetters(['searchHistory'])
    },
    methods:{
      ...mapActions(['saveSearchHistory','deleteSearchHistory','clearSearchHistory']),
      wordChange(kw) {
        this.keyword = kw
      },
      searchWord(){
        this.onloading = true
        axios.get('/home/search',{
          params:{
            keyword:this.keyword
          }
        }).then((response)=>{
          let res = response.data
          if(res.status === '0'){
            this.searchResult = res.result
            this.onloading = false
          }
        })
      },
      searchAll(){
        if(this.keyword){     
          this.searching = true
          this.saveSearchHistory(this.keyword)
        }
      },
      setKeyword(item){
        this.$refs.searchBox.setKeyword(item)
        this.searchAll()
      },
  },
  watch:{
    keyword(nw){
        if(nw){
          this.searchWord(nw)
        }else{
          this.searching = false
        }
    }
  }
}
</script>

<style lang="scss" scoped>
@import 'css/base.scss';

.search-info {
    padding:10px;
    height: 100%;
    width: 100%;
    box-sizing:border-box;
    overflow-y: scroll; 
    h4 {
      line-height:28px;
      font-size:16px;
    }
    p{
      text-align:center;
      line-height:28px;
    }
    i {
      float:right;
      font-size: $icon-s;
    }
    span {
      font-size: $font-xs;
      line-height: $font-l;
      padding: 2px  5px;
      display:inline-block;
      border-radius: 5px;
      margin: 5px;
      background: $themeColor;
      color: $white;
    }
}

.search-result {
  padding: .2rem;
  li {
    font-size: $font-s;
    margin-top: .2rem;
    border-bottom: 1px solid $white;
  }
}

</style>
