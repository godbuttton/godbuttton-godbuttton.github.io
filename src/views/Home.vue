<template>
<div class="home-container" >
  <el-row >
    <el-col :span="2" >
      <div class="img-box">
       
      </div>
    </el-col>
     <el-col :span="19">
        <el-menu default-active="2-1" theme="dark" class="el-menu-demo" mode="horizontal" @select="handleSelect">
        <router-link :to="{name:'main'}"><el-menu-item index="1">首页</el-menu-item></router-link>
        <router-link :to="{name:'music'}"><el-menu-item index="2">音乐</el-menu-item></router-link>
        <router-link :to="{name:'blog'}"><el-menu-item index="3">blog</el-menu-item></router-link>
        <router-link :to="{name:'about'}"> <el-menu-item index="4">关于我</el-menu-item></router-link>
      </el-menu>
    </el-col>
    <el-col :span="3"  >
      <div class="header">
        <el-autocomplete
          v-model="searchIn"
          :fetch-suggestions="querySearch"
          placeholder="请输入内容"
          :trigger-on-focus="false"
          @select="handleSelect"
         ></el-autocomplete>
      </div>
    </el-col>
  </el-row>
  <el-row>
     <router-view ></router-view>
  </el-row>
</div>
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
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.home-container{
    background-color:#373D41;
    height:100%;
   .img-box {
      width:100%;
      height:60px;
      background-color:green;
  }
   .header{
     
     width:100%;
     height:60px;
     background-color:#324157;
    line-height:60px;
     .search{
       margin-right:16px
     }
   } 
}
</style>
