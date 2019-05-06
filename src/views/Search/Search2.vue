<template>
  <div class="search">
  	<search-nav  @query="wordChange"  ref="searchBox"  @pressenter="searchAll" >
  	</search-nav>
   <div v-if="!searching">
      <div v-if="!keyword">
        <div class="search-info" > 
            <div class="discovery">
              <h4>热门搜索</h4>
              <span v-for="(item,index) in hotSearch"  @click='setKeyword(item)'>{{item}}</span>
            </div>
            <div 
            class="history" 
            v-if="searchHistoryLength">
              <h4>搜索历史                        
              <i class="y-font icon-delete" @click="clearSearchHistory">
              </i>
              </h4>
              <span 
              v-for="(item,index) in searchHistory" 
              :key="index" 
              @click="setKeyword(item)">{{item}}
              </span>
            </div>                   
        </div>
      </div>
      <ul class="search-result" v-else>
        <li 
        v-for="item in searchResult" 
        @click= "setKeyword(item.productName)">
        {{item.productName}}
        </li>
        <li class="no-result" v-show= "!searchResult.length">
        <div  style="width:100px;height:100px;"></div>
        <span>臣妾查不到</span>
        </li> 
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
      <loading v-if="searching"></loading>
      <div class="no-result" v-else >
        <div  style="width:100px;height:100px;"></div>
        <span>臣妾查不到</span>
      </div> 
    </div>
  </div>
</template>
<script>
import SearchNav from 'components/NavHead'
import ItemFilter from 'components/Filter'
import Loading from 'components/Onloading'
import ItemList from 'components/ItemList'
import {mapGetters, mapMutations, mapActions} from 'vuex'
import axios from 'axios'

export default {
	name:'Search',
    data(){
	    return {
	      keyword:'',
	      searchResult: [],
        searching:false,
        onloading: true,
        hotSearch:['纸巾','牙膏','充电宝','手机','奶粉','水果','短袖','维生素']
    	}
  	},
  	components:{
  		SearchNav,
  		ItemFilter,
      ItemList,
      Loading
  	},
    computed:{
          ...mapGetters([
      'searchHistory'
    ]),
    searchHistoryLength(){
        return this.searchHistory.length>0? true :false
    }
 },
    methods:{
         ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory','clearSearchHistory'
    ]),
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
        this.searching = true
        this.saveSearchHistory(this.keyword)
      },
      wordChange(kw) {
        this.keyword = kw
      },
      setKeyword(item){
        this.searching = true
        this.$refs.searchBox.setKeyword(item)
        this.saveSearchHistory(item)
      },
  },
  watch:{
    keyword(nw){
        if(nw !== "" ){
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

  >div{
    margin-bottom: 20px;
    padding: 10px;
    p {
      font-size: $font-s;
      line-height: 32px;
      i {
          text-align:right;
      }
    }
    span{
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
}

.search-result {
  padding: .2rem;
  li {
    font-size: $font-s;
    margin-top: .2rem;
    border-bottom: 1px solid $white;
  }
}

.no-result {
  height:180px;
  width:100%;
  text-align:center;
  >div{
    background:url('../../assets/images/cry.jpg') no-repeat;
    background-size:50px;
    margin:auto;
    background-size:100px;
  }
}
</style>
