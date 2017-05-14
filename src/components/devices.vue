<template>
    <div>
        <h1 @click='dd'>devices</h1>
        <div v-text="geyan.hitokoto">
        </div>
        <p v-text="'--'+geyan.from"></p>
    </div>
</template>
<script>
    
    export default{
        data(){
            return {
                geyan:''
            }
        },
        methods:{
            dd(){
                var that=this; 
                this.$http.get('http://api.hitokoto.cn/?c=a&encode=json').then(function(response){
                    that.geyan=response.data
                })
            }
        }
    }
</script>
<style scoped lang="less">
    h1{ color:red}
</style>