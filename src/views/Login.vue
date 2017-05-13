<template>
    <div class="container">
        <h1 class="title">系统登录</h1>
        <el-form v-model="login" class="form" label-position="right"  label-width="80px" >
            <el-form-item label="用户名:" prop="userName">
                <el-input v-model="login.userName"></el-input>
            </el-form-item>
             <el-form-item label="密码:" prop="passWord">
                <el-input v-model="login.passWord" type="password"></el-input>
            </el-form-item>
             <el-form-item  prop="passWord">
             <div class="remember">
                <el-checkbox v-model="login.isRemember" name="type" >记住密码</el-checkbox>
            </div>
            </el-form-item>
        </el-form>
        <div class="button-container">
         <el-button type="primary" class="button"  @click="goLogin">登录</el-button>
         </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                login:{
                    userName:'admin',
                    passWord:'123456',
                    isRemember:true
                }
            }
        },
        methods:{
            goLogin:function(){
                console.log(this.login)
                 this.$router.push("./control")
            }
        }
    }
</script >
<style lang="less" scoped>
    .container{
        margin:0;
        background-color:#1F2D3D;
        color:white;
        background-color:white;
        padding:16px 0px 30px;
        width:400px;
        margin:150px auto 0 auto;
        border-radius:3px;
        .title{
            font-size:20px;
            font-weight:600;
            color:#1F2D3D;
            text-align:center;
            margin-bottom:20px;
        }
        .form{
        padding:0px 20px 0px 2px;
        text-align:center;
          .remember{
              text-align:left;
          }
           
        }
        .button-container{
            text-align:center;
             .button{
                width:90%;
            }
        }
    }

</style>