<template>
  <div class="header">
     <slot name='left'></slot>
     <slot name='right'></slot>
  </div>
</template>
<script>
    export default {
    
    }
</script>
<style lang="less">
    .header{
        width:100%;
        height:39px;
        background: #FFFFFF;
        box-shadow: 0 5px 5px #dededf;
        position: relative;
    }
</style>


