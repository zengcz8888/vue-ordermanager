<template>
    <div class="log_div">
        <div class="log_box">
            <h4>系统登录</h4>
            <el-input placeholder="请输入内容" v-model="acc" clearable prefix-icon="el-icon-user-solid" class="input"></el-input>
            
            <el-input placeholder="请输入密码" v-model="pwd" show-password prefix-icon="el-icon-lock" class="input"></el-input>
            <p class="error-p">{{ errormsg }}</p>
            <el-button  style="width:100%; background:#004687; border:1px solid #004687; color:#fff" @click="clickLog">登录</el-button>
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
            errormsg:''
        }
    },
    methods: {
        clickLog(){
            let obj = {account: this.acc, password: this.pwd}

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
                // res.data.msg
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
    }
    .log_box{
        width: 300px;
        height: 220px;
        background:  #202020;
        padding: 10px;
        
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