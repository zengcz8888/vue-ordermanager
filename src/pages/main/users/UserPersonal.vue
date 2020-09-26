<template>
    <div class="pers_div">
        <template>
            <div>
                <span>管理员信息</span>
                <el-divider></el-divider>
                <el-form  status-icon  ref="ruleForm" label-width="100px" class="demo-ruleForm" >

                    <el-form-item label="管理员id:" prop="user">
                        <span v-show="show" @click="clickShow" >{{ id }}</span>
                        <el-input type="text" v-show="!show" v-model="id" autocomplete="off"></el-input>
                    </el-form-item>
    
                <el-divider></el-divider>

                <el-form-item label="账号：" prop="user">
                        <span v-show="show" @click="clickShow" >{{ account }}</span>
                        <el-input type="text"  v-show="!show" v-model="account " autocomplete="off"></el-input>
                </el-form-item>
                
                
                <el-divider></el-divider>

                <el-form-item label="用户组：" prop="user">
                        <span v-show="show" @click="clickShow">{{ userGroup }}</span>
                        <el-select v-model="userGroup" placeholder="请选择用户组" v-show="!show">
                            <el-option :label="userGroup" :value="userGroup"></el-option>
                            <el-option label="普通管理员" value="普通管理员"></el-option>
                        </el-select>
                </el-form-item>

                
                <el-divider></el-divider>
                <el-form-item label="创建时间：" prop="user">
                    <span >{{ ctimee }}</span>
                </el-form-item>
                
                <el-divider></el-divider>

                <p>
                    管理员头像：<img :src="imgUrl" alt="">
                    <el-upload
                    class="avatar-uploader"
                    :action="USERS_IMG_ACC"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    
                    :data="data"
                    >
                    <!-- <img v-if="imageUrl" :src="imageUrl" class="avatar"> -->
                    
                    <i  class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                </p> 
                <el-divider></el-divider>
                <el-button v-show="!show" @click="clickBtn">保存</el-button>
                </el-form>
            </div>
            
        </template>
    </div>
</template>

<script>
import { accountinfo,USERS_IMG_ACC,useredit } from '@/api/apis'
import { getChinatime } from '@/utils/utils'
    export default {
        data(){
            return{
                id:localStorage.getItem('id'),
                ctimee:'',
                account:'',
                userGroup:'',
                imgUrl:'',
                data:{},
                show:true,
                USERS_IMG_ACC:''
                
            }
        },
        methods:{
            handleAvatarSuccess(res) {
                if(res.code == 0){
                    this.$bus.$emit('imgfinish')
                }
            },
            
            clickShow(){
                this.show = !this.show
            },
            clickBtn(){
                this.show = !this.show
                
                    
                    this.$confirm("此操作将永久修改数据, 是否继续?", {
                    confirmButtonText: "继续修改",
                    cancelButtonText: "不了",
                    type: "warning"
                }).then(() => {
                    let obj = {id:this.id,account:this.account,userGroup:this.userGroup}
                    useredit(obj).then(res => {
                        
                        if (res.data.code == 0){
                            this.$message({
                                type: "success",
                                message: "修改成功!"
                            });
                        }
                    });

                    this.$message({
                        type: "success",
                        message: "修改成功!"
                    });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消修改"
                        });
                    });
                
            }
        },
        created(){
            this.USERS_IMG_ACC = USERS_IMG_ACC
            this.data = {id:this.id};
            accountinfo(this.id).then(res => {
                    
                    
                        
                        this.ctimee = getChinatime(res.data.accountInfo.ctime)
                        this.account = res.data.accountInfo.account
                        this.userGroup = res.data.accountInfo.userGroup
                        this.imgUrl = res.data.accountInfo.imgUrl
                        
                    
                    
                    
                    
                
            })
        }
    }
</script>

<style lang="less" scoped>
.pers_div{
        height: 700px;
        background: #fff;
        border-radius: 5px;
        padding: 20px;
        img{
            width: 40px;
            height: 40px;
            margin-right: 10px;
        }
        p{
            display: flex;
            align-items: center;
        }
}
.avatar-uploader .el-upload,.avatar-uploader-icon {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 40px;
        height: 40px;
        line-height: 40px;
        text-align: center;
    }
    .avatar {
        width: 40px;
        height: 40px;
        display: block;
    }
    
    
</style>