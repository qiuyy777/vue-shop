<template>
	<transition name="login-modal" mode="out-in">
		<div class="login">
			<nav-head :showInput="false"></nav-head>                      
			<router-link to="signup" tag="p" class="right-word">注册</router-link>
			<div class="username-box">
				<input type="text" v-model ="userName" placeholder="用户名" ref="userName">
				<i class="underline-show"></i>
				<i class="y-font icon-close" v-show="userName" @click="clearInput('name')"></i>           
			</div>
			<div class="password-box">
				<input type ="password" v-model ="userPwd" placeholder="密码" ref="userPwd">
				<i class="underline-show"></i>
				<i class="y-font icon-close " v-show = "userPwd" @click="clearInput('pwd')"></i>
			</div>
			<input class="do-login" type="submit" @click="login" value="登  录">
			<p class="right-word">忘记密码</p>
			<p class="warning-tip" v-show="true" style="height:30px;">{{ warningTip}}</p>
		</div>
	</transition>
</template>
<script>
import NavHead from 'components/NavHead'
import axios from 'axios'
import { mapGetters, mapActions } from 'vuex'

	export default {
		name:'Login',
		data(){
			return{
			userName:'',
			userPwd:'',
			warningTip:'',
			}
		},
		components:{
			NavHead
		},
		computed:{
			...mapGetters(['nickName','cartCount'])
		},
		methods:{
			...mapActions(['updateAll']),
			ifEmpty(){
					if(this.userName.length !== 0 && this.userPwd.length !== 0 ){
						this.warningTip = ""
					}else{
						this.warningTip = "请填写完整"
					}
			},
			login(){
				this.ifEmpty()
				//如果有提示信息，停留在当前页
				//提示信息为空，请求登录
				if(this.warningTip.length === 0){
					axios.post('/users/login',{
						userName:this.userName,
						userPwd:this.userPwd
					}).then((response)=>{
						let res = response.data
						if(res.status === '0'){
							this.warningTip = ''
							this.updateAll(res.result.userName)
							this.$router.push('/user')
						}
						else {
							this.warningTip = '账户或密码错误'
						}
				})
				}                 
			},
			clearInput(i){
				if(i === 'pwd'){
					this.userPwd = ''
					this.$refs.userPwd.focus()

				}else{
					this.userName = ''
					this.$refs.userName.focus()
				}
			}
		}
	}

</script>
<style  lang='scss' scoped>
@import 'css/base.scss';

//登录页整体
.login {
	padding-left: .2rem;
	padding-right: .2rem;
	font-size: $font-m;
	input {
		height: $head-wrap;
		line-height: $head-wrap;
		width: 100%;
		padding: 0 .1rem;
		display: block; 
		box-sizing: border-box;
	}
}

//右侧字样式
.right-word {
	text-align: right;        
	line-height: .8rem;
	color:$media-gray;
}

//账号密码输入框
.username-box,.password-box{
	position: relative;
	height: $head-wrap;
	width: 100%;
	box-sizing: border-box;
	.underline-show {
		width: 100%;
		height: 4px;
		display: block;
		background: $themeColor;
		position: absolute;
		bottom: 0;
		left: 0;
		transform: scale(0,0);
		transition:all .4s ease-in;
	}
	.icon-close {
		position:absolute;
		right: 0;
		top: 18px;
		font-size: $icon-s;
	}

	input:focus {
		+ .underline-show{
			transform: scale(1,1);
		}
	}  
}

//登录按钮
.do-login {
	background: $themeColor;
	color: $white;
	text-align: center;
	margin-top: .4rem;
	border-radius: .1rem;
	font-size:$font-l;

}

//提示信息
.warning-tip {
	color: $red;
}

//进入动画样式
.login-modal-enter,.login-modal-leave-to{
	 transform: scale(0,0);
}
.login-modal-enter-to{
	 transform: scale(1,1);
}
.login-modal-enter-active{
		 transition: all .3s ease;
}
.login-modal-leave-to{
		opacity: 0;
}
.login-modal-leave-active {
	transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
</style>
