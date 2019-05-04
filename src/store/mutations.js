import * as types from './mutations-types'

const mutation = {
	[types.UPDATE_CARTCOUNT](state, cartNum) {
		state.cartCount = cartNum
	},
	[types.UPDATE_USERINFO](state, userName){
		state.nickName = userName
	},
	[types.UPDATE_LOGIN_FLAG](state, login){
		state.loginFlag = login
	},
	[types.UPDATE_SEARCH_HISTORY](state, searchHistory){
		state.searchHistory = searchHistory
	}
}
export default mutation