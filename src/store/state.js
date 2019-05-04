import { loadSearch } from 'common/localStorage'


const state = {
	nickName: '点击登录',
	cartCount: 0,
	loginFlag: false,
	searchHistory: loadSearch(),
}



export default state