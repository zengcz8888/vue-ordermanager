<template>
    <div class="log_div">
        <div class="log_box">
            <h4>激情外卖管理系统登录</h4>
            <el-input placeholder="请输入内容" v-model="acc" clearable prefix-icon="el-icon-user-solid" class="input"></el-input>
            
            <el-input placeholder="请输入密码" v-model="pwd" show-password prefix-icon="el-icon-lock" class="input"></el-input>
            <p class="error-p">{{ errormsg }}</p>
            <el-button type="danger" style="width:100%;" @click="clickLog">登录</el-button>
        </div>
    </div>
</template>

<script>
import {login} from '@/api/apis'
    export default {
        
    data() {
        return {
            acc:'',
            pwd:'',
            errormsg:'',
            si:true,
        }
    },
    methods: {
        clickLog(){
            let obj = {account: this.acc, password: this.pwd}
            if(!this.si) return
            setTimeout(() => {
                this.si = true
            },3000)
            this.si = false 
            login(obj).then(res => {
                if(res.data.code == 0) {
                    localStorage.token = res.data.token
                    localStorage.role = res.data.role
                    localStorage.acc = this.acc
                    localStorage.id = res.data.id

                    this.$router.push('/main/index')
                    this.$message({
                        message:'用户登录成功！',
                        type:'success'
                    })
                }else this.errormsg = res.data.msg
                
            })
        }
    },
    
    }
</script>

<style lang="less" scoped>
@back:#b81d18;
    .log_div{
        height: 100%;
        background: @back;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url('../assets/imgs/10 (17).jpg') no-repeat center center;
        opacity:10;
        
    }
    .log_box{
        width: 300px;
        height: 220px;
        background: #c0201b96 ;
        padding: 10px;
        border-radius: 5px;
        h4{
            margin-bottom: 20px;
            color: #fff;
            text-align: center;
        }
        .input{
            margin-bottom: 20px;
        }
        .error-p {
            color: red;
            font-size: 12px;
        }
    }
    
</style>