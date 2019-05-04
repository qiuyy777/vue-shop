<template>
    <transition name="mask">
        <div class="mask" v-show="showFlag">
            <transition name="warningModal">
                <div class="warning-box">
                    <i class="y-font icon-close" @click="hideModal"></i>
                    <p>{{warningMsg}}</p>
                </div>
            </transition>
        </div>
    </transition>
</template>
<script>
    export default {
        // props:{
        //     warningMsg:String
        // },
        data(){
        	return { 
				showFlag:false,
                warningMsg:''
        	}
        },
        methods:{
        	hide(){
        		this.showFlag = false
        	},
        	show(msg){
        		this.showFlag = true
                this.warningMsg = msg
        	},
            hideModal(){
                this.$emit('close')
            }
        }
    }
</script>
<style  lang="scss" scoped>

@import '@/assets/css/base.scss';

.warning-box{
    width: 3.6rem;
    padding: .4rem .2rem;
    box-sizing: border-box;
    text-align: center;
    background: $white;
    margin: 2rem auto;
    position: relative;
    border-radius:.2rem;
    font-size:$font-s;
}

.icon-close{
    position:absolute;
    top:.1rem;
    right:.1rem;
    font-size:$icon-s;
}

.mask-enter{
    opacity:0;
}

.mask-enter-to{
    opacity:1;
}

.mask-enter-active{
    transition:all .3s;
}
.mask-leave-to{
    opacity:0;
}
.mask-leave-active{
    transition:all .3s;
    transition-delay:.2s;
}
.warningModal-enter-active {
  transition: all .3s ease;
}
.warningModal-leave-active {
  transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.warningModal-enter, .warningModal-leave-to{
  transform: translateY(10px);
  opacity: 0;
}
</style>
