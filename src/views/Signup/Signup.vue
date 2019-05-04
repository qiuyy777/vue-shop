<template>
    <transition name="signup-modal" mode="in-out">
        <div class="signup">
            <nav-head :showInput="false"></nav-head>    
            <router-link to="/login" class="do-login">登录</router-link>
            <form>
                <div class="input-wrap">
                    <i class="y-font icon-user"></i>            
                    <input type="text" placeholder="用户名为6-15个字符" v-model="userName"  @blur="checkName">
                </div>
                <div class="input-wrap">
                    <i class="y-font icon-email"></i>   
                    <input type="email" placeholder="邮箱用于找回密码" v-model="userEmail"  @blur="checkEmail">
                </div>
                <div class="input-wrap">
                    <i class="y-font icon-pwd"></i> 
                    <input type="password" placeholder="密码长度为8-20个字符" v-model="userPwd"  @blur="checkPwd">
                </div>
                <div class="input-wrap">
                    <i class="y-font icon-re-pwd"></i> 
                    <input type="password" placeholder="请再次输入密码" v-model="reUserPwd"  @blur="checkRePwd">
    		    </div>
                <button class="do-regist" @click="doRegist">注册</button>
                <p class="warning-tip">{{errTip}}</p>
            </form>
            <modal ref="modal" @close="closeModal"></modal>
            
        </div>
    </transition>
</template>
<script>
import NavHead from 'components/NavHead'
import Modal from 'components/Modal'
import {modalControl} from 'common/mixins'
import axios from 'axios'
    export default {
        name:'Signup',
        data(){
            return {
              userName:'',
              userEmail:'', 
              userPwd:'',
              reUserPwd:'', 
              errTip:'',
              timer: null,
            }
        },
        components: {
            NavHead,
            Modal
        },
        mixins:[modalControl],
        methods: {
            closeModal(){
                this.$emit('close')
            },
            redirectLoginModal(){
                this.$emit('login')
            },
            checkName(){
                let nameRegx = /(\w|\d){6,20}$/
                if(this.userName.length){
                    if(nameRegx.test(this.userName)){
                        axios.get('/users/checkUserName',{
                            params:{userName:this.userName}
                        }).then((response) => {
                            let res = response.data
                            if(res.status === '0'){
                                this.errTip = res.result.length > 0 ? '用户名已被注册' : ''
                            }
                        })
                    }else{
                        this.errTip = '用户名格式不正确'
                    }                     
                }else{
                    this.errTip = '请填写用户名'
                }
            },
            checkEmail(){
                let emailRegx = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
                if(this.userEmail.length ){
                    if(emailRegx.test(this.userEmail)){
                        axios.get('/users/checkEmail',{
                            params:{userEmail:this.userEmail}
                        }).then((response)=>{
                            let res= response.data
                            if(res.status === '0'){
                                this.errTip = res.result.length > 0 ? '邮箱已被注册' : ''
                            }
                        })
                       
                    }else{
                        this.errTip = '邮箱格式不正确'
                    }
                }else{
                    this.errTip = '请填写邮箱'
                }
            },
            checkPwd(){
                let pwdRegx = /(\w|\d){8,20}$/
                if(this.userPwd.length){
                    if(!pwdRegx.test(this.userPwd)){
                        this.errTip = '密码格式不正确'
                    }else{
                         this.errTip = ''
                    }
                }else{
                    this.errTip = '请输入密码'
                }
            },
            checkRePwd(){
                if(this.reUserPwd.length){
                    if(this.userPwd === this.reUserPwd) {
                        this.errTip = ''
                    }else{
                        this.errTip = '两次密码输入不一致'
                    }
                }else{
                    this.errTip = '请再次输入密码' 
                }

            },
            doRegist(){
                if(this.errTip.length === 0){
                    let _this = this
                    axios.post('/users/signup',{
                        userName:this.userName,
                        userEmail:this.userEmail,
                        userPwd:this.userPwd
                    }).then((response) => {
                        let res = response.data
                        if(res.status === '0'){
                            this.showModal('注册成功,返回登录页')
                            this.timer = setTimeout(function(){
                                _this.closeModal()
                                _this.$router.push('/login')
                            },3000)
                            
                        }else{
                            this.timer = null;
                        }
                    })
                }
            }
        }
    }

</script>
<style lang='scss' scoped>
@import 'css/base.scss';
.signup {
    color: $deep-gray;
    font-size: $font-m;
    box-sizing: border-box;
    .do-login {
        display: block;
        text-align: right;
        margin-right: .3rem;
        line-height: $header-h;
    }
}
form {
    padding:0 .2rem;
}
.input-wrap {
    width: 100%;
    height: $header-h;
    background: $white-gray;
    display: flex;
    justify-content: start;
    line-height: $header-h;
    border-bottom: 2px solid $white;
    i {
        width: 50px;
        font-size:$icon-m;
        text-align:center;
    }
}

input {
    flex: 1;
    width:100%;
    background: $white-gray;
    line-height: $header-h;
}

.warning-tip{
    color:$red;
}
.do-regist {
    width: 100%;
    background: $themeColor;
    color: $white;
    text-align: center;
    height: $header-h;
    line-height: $header-h;
    margin-top: .4rem;
    border-radius: .1rem;
    font-size:$font-l;

}
p{
    margin-top: .3rem;
}


.signup-modal-enter,.signup-modal-leave-to{
   transform: scale(0,0);
}
.signup-modal-enter-to{
   transform: scale(1,1);
}
.signup-modal-enter-active{
     transition: all .3s ease;
}
.signup-modal-leave-to{
    opacity: 0;
}
.signup-modal-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
</style>