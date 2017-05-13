<template>

  <el-row class="home-container">
    <el-col :span="2"  class="slider">
        <div class="logo">
            <img src="../assets/logo.png"/>
        </div>
        <el-menu default-active="2-1" theme="dark" class="el-menu-demo" mode="vertical" @select="handleSelect">
        <router-link :to="{name:'devices'}"><el-menu-item index="1">设备管理</el-menu-item></router-link>
        <router-link :to="{name:'apps'}"><el-menu-item index="2">应用管理</el-menu-item></router-link>
        <router-link :to="{name:'testcases'}"><el-menu-item index="3">脚本管理</el-menu-item></router-link>
        <router-link :to="{name:'tasks'}"> <el-menu-item index="4">联测任务</el-menu-item></router-link>
        <router-link :to="{name:'accounts'}"> <el-menu-item index="5">账号体系</el-menu-item></router-link>
        <router-link :to="{name:'help'}"> <el-menu-item index="6"> 使用帮助</el-menu-item></router-link>
        </el-menu>
    </el-col>

    <router-view ></router-view>
     <el-col :span="22" style="background-color:red">
         <h2>这是control</h2>
          <router-view ></router-view>
    </el-col>
  </el-row >

</template>

<script>
  
  export default {
    name: 'hello',
    data() {
      return {
        searchIn:'',
      }
    },
    methods:{
      handleSelect(){

      },
       querySearch(queryString, cb) {
       
      },
    }
  }
</script>
<style scoped lang="less">
.home-container{
   width: 100%;
   height: 100%;
   .logo{
     margin-top: 22px;
     margin-right: 15px;
     margin-bottom: 22px;
     cursor: pointer;
     text-align: center;
   }
   .slider{
     background: url(../assets/control_bg.jpg) no-repeat top center;
     background-size: 100% auto;
     height: 100%;
     width: 166px;
     .el-menu--dark{
       background-color:transparent;
       text-align: center;
     }
     a{
      text-decoration: none;
     }
   }
}
</style>
