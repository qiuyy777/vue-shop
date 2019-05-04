import * as types from './mutations-types'
import {saveSearch, clearSearch, deleteSearch} from 'common/localStorage'
export const  updateCartCount = function ({commit},tf) {
	commit(types.UPDATE_CARTCOUNT, tf)

}

export const 	updateAll  = function ({state,commit},userName){
	let newFlag = !state.loginFlag
	
	if(userName!='点击登录'){
		commit(types.UPDATE_USERINFO,userName);
		commit(types.UPDATE_LOGIN_FLAG,true)
	}else{
		commit(types.UPDATE_USERINFO,'点击登录')
		commit(types.UPDATE_LOGIN_FLAG,false)
	}
}

export const editCartCount = function ({state,getters,dispatch},t){
	let num = getters.cartCount
	if(t === "plus"){
		num++
		dispatch('updateCartCount', num)
	}else {
		num--
		dispatch('updateCartCount', num)
	}
} 

export const saveSearchHistory = function ({commit}, query) {
	commit(types.UPDATE_SEARCH_HISTORY, saveSearch(query))
}

export const deleteSearchHistory = function ({commit}, query) {
	commit(types.UPDATE_SEARCH_HISTORY, deleteSearch(query))
}

export const clearSearchHistory = function ({commit}) {
	commit(types.UPDATE_SEARCH_HISTORY, clearSearch())
}