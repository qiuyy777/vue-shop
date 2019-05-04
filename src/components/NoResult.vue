<template>
  <div class="no-result">
    <div></div>
    <span>没有匹配结果</span>
  </div> 
</template>
<script>
export default {

}

</script>
<style lang="scss">
.no-result {
  height:180px;
  width:100%;
  text-align:center;
  >div{
    width:100px;
    height:100px;
    background:url('../assets/images/cry.jpg') no-repeat;
    background-size:50px;
    margin:auto;
    background-size:100px;
  }
}
</style>