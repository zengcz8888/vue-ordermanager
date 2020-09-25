<template>
    <div class="user_div">
        <div class="title_div">
            添加账号
        </div>
        <el-form  status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width:300px">

            <el-form-item label="账号" prop="user">
                <el-input type="text" v-model="acc" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model="pwd" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="用户组" prop="region">
                <el-select v-model="usergroup" placeholder="请选择用户组">
                    <el-option v-for="(item) in list" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    
                </el-select>
            </el-form-item>
            <p v-show="show" style="color:red" class="title_p">{{ errormsg }}</p>
            <el-form-item>
                <el-button type="primary" @click="clickAdd">提交</el-button>
                <el-button @click="clickDele">重置</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
import { useradd } from '@/api/apis'
    export default {
        data() {
            
        return {
            
            pwd:'', 
            acc:'',
            list:[
                {
                    label:'超级管理员',
                    value:'超级管理员'
                },
                {
                    label:'普通管理员',
                    value:'普通管理员'
                }
            ],
            usergroup:'超级管理员',
            errormsg:'x 添加账号失败！请重新填写',
            show:false
        };
    },
    methods: {
        clickAdd(){
            console.log(useradd);
            useradd({account:this.acc,password:this.pwd,userGroup:this.usergroup}).then(res => {
                if(res.data.code == 0){
                    this.acc = ''
                    this.pwd = ''
                    this.usergroup = '超级管理员'
                    this.$message({
                        message:'账户创建成功！',
                        type:'success'
                    })
                }else{
                    this.show = true
                }
            })
                
            
        },
        clickDele(){
            this.acc = ''
            this.pwd = ''
            this.usergroup = '超级管理员'  
            this.$message({
                message:'重置成功！',
                type:'success'
            })     
        }
    }
}            
</script>

<style lang="less" scoped>
    .user_div{
        
        background: #fff;
        border-radius: 5px;
        padding: 20px;
        .title_div{
            border-bottom:1px solid #ccc; 
            padding-bottom: 10px;
            
        }
        .title_p{
                margin-left: 90px;
            }
    }
</style>