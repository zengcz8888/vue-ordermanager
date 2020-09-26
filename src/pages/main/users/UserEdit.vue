<template>
    <div class="user_div">
        <div class="title_div">
            修改密码
        </div>
        <el-form  status-icon   label-width="100px" class="demo-ruleForm" style="width:300px">

            <el-form-item label="原密码" prop="user">
                <el-input type="text" v-model="oldPwd" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="新密码" prop="pass">
                <el-input type="password" v-model="newPwd" autocomplete="off"></el-input>
            </el-form-item>

            <el-form-item label="确认新密码" prop="pass">
                <el-input type="password" v-model="firmpwd" autocomplete="off"></el-input>
            </el-form-item>
            
            <el-form-item>
                <el-button type="primary" @click="clickSub">提交</el-button>
                <el-button >重置</el-button>
            </el-form-item>

        </el-form>
    </div>
</template>

<script>
import { usercheckoldpwd,usereditpwd } from '@/api/apis'
    export default {
        data() {
            return {
                oldPwd:'',
                newPwd:'',
                firmpwd:'',
                id:''
            };
        },
        methods: {
            clickSub() {
                this.id = localStorage.getItem('id')
                    
                
                    if(this.firmpwd != '' && this.oldPwd !='' && this.newPwd !=''){
                        this.$confirm("此操作将永久修改密码, 是否继续?", {
                            confirmButtonText: "继续修改",
                            cancelButtonText: "我再想想",
                            type: "warning"
                        }).then(() => {
                        
                                usercheckoldpwd(this.oldPwd,this.id).then(res => {
                                    if (res.data.code == 0){
                                        if(this.newPwd == this.firmpwd){
                                            usereditpwd({newPwd:this.newPwd,id:this.id}).then(res => {
                                                if(res.data.code == 0) this.getuserlist();
                                            })
                                        }
                                        
                                    }
                                })

                        this.$message({
                            type: "success",
                            message: "修改成功!"
                        });
                        })
                        .catch(() => {
                            this.$message({
                                type: "info",
                                message: "修改失败"
                            });
                        });
                    }else{
                        this.$message({
                            type: "info",
                            message: "已取消修改"
                        });
                    }
                    
                    

                    
                

            },
            
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
            margin-bottom: 20px;
        }
    }
</style>