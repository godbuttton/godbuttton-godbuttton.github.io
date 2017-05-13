<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
  background-color:#EBEBEB;
  height:100%;
  position:fixed;
  font-size: 14px;
  left:0;
  right:0;
  top:0;
  bottom:0;
}
</style>
