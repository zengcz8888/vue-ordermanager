<template>
    <div class="shop_div">
        <div class="title_div">
            <p>店铺管理</p>
            <el-button type="primary" size='mini' @click="clickedit">保存</el-button>
        </div>
        <el-form label-width="80px" size="mini" style="width:500px">

            <el-form-item label="店铺名称">
                <el-input v-model="name" placeholder="粥品官纺（天府新谷）"></el-input>
            </el-form-item>

            <el-form-item label="店铺公告">
                <el-input type="textarea" v-model="bulletin"  rows="6"></el-input>
            </el-form-item>

            <el-form-item label="店铺头像">
                <el-upload
                
                :action="UPLOAD_IMG_SHOP"
                :show-file-list="false"
                :on-success="avatarUploadSuccess"
                >
                <img :src="avatar == ''?'':ITEMS_IMG_SHOP+avatar">
                
                </el-upload>
                
            </el-form-item>

            <el-form-item label="店铺图片">
                <div style="display:flex;width:400px;justify-content: space-between;flex-wrap: wrap;">
                    <el-upload 
                class="avatar-uploader"
                :action="UPLOAD_IMG_SHOP"
                list-type="picture-card"
                :on-success="shopimgsUploadSuccess"
                :on-remove="removeImg"
                :file-list="shopimgs"
                >
                
                <i class="el-icon-plus "></i>
                </el-upload>
                
                </div>
            </el-form-item>

            <el-form-item label="配送费">
                <el-input v-model="deliveryPrice" size="medium"></el-input>
            </el-form-item>

            <el-form-item label="配送时间">
                <el-input v-model="deliveryTime" size="medium"></el-input>
            </el-form-item>

            <el-form-item label="配送描述">
                <el-input v-model="description" size="medium"></el-input>
            </el-form-item>

            <el-form-item label="店铺评分">
                <el-input v-model="score" size="medium"></el-input>
            </el-form-item>

            <el-form-item label="销量">
                <el-input v-model="sellCount" size="medium"></el-input>
            </el-form-item>

            <el-form-item label="活动" >
                <template>
                    
                        <el-button @click="clickAdd" type="primary">添加活动</el-button>

                    <el-tooltip class="item" effect="dark" content="选中活动点击删除" placement="top-start">
                        <el-button @click="clickdel" type="danger">删除活动</el-button>
                    </el-tooltip> 
                    
                    <el-input type="text" v-model="active" style="margin-top:10px"/>
                </template>
                <el-checkbox-group v-model="activeName">
                    <el-checkbox v-for="item in activelist" :key="item" :label="item"></el-checkbox>
                </el-checkbox-group>
            </el-form-item>

            <el-form-item label="营业时间">
                <el-time-picker type="datetimerange" is-range v-model="date" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择间范围"></el-time-picker>
            </el-form-item>

                
        </el-form>
    </div>
</template>

<script>
import { info,UPLOAD_IMG_SHOP,ITEMS_IMG_SHOP,shopedit } from '@/api/apis'
import { getChinatime } from "@/utils/utils";
    export default {
        data() {
            return {
                name:'',
                bulletin:'',
                avatar:'',
                deliveryPrice:0,
                deliveryTime:0,
                description:'',
                score:0,
                sellCount:0,
                supports:[],
                pics:[],
                date:[],
                minPrice:'',
                
                imgUrl:'',
                id:0,
                
                shopimgs: [],
                dialogImageUrl:'',
                activeName:[],//选中的
                activelist:[],//所有的
                active:'',

                UPLOAD_IMG_SHOP:'',
                ITEMS_IMG_SHOP:'',
            };
        },
        methods: {
            clickAdd(){
                this.activelist.push(this.active)
                this.supports = this.activelist
            },
            clickdel(){
                
                let arr = this.activelist.filter((x) => {
                    return  !this.activeName.includes(x)
                })
                this.activelist = arr
                this.supports = this.activelist
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            avatarUploadSuccess(res) {
                if (res.code == 0) {
                    this.avatar = res.imgUrl;
                    this.$message({
                        type: "success",
                        message: "店铺头像上传成功"
                    });
                }
            },
            shopimgsUploadSuccess(res){
                if (res.code == 0) this.pics.push(res.imgUrl);
            },
            removeImg(res) {
                this.pics.splice(this.pics.indexOf(res.name), 1);
            },
            clickedit(){
                    
                    let obj = {
                        id:this.id,
                        name:this.name,
                        bulletin:this.bulletin,
                        avatar:this.avatar,
                        deliveryPrice:this.deliveryPrice,
                        deliveryTime:this.deliveryTime,
                        description:this.description,
                        score:this.score,
                        sellCount:this.sellCount,
                        supports: JSON.stringify(this.supports),
                        date: JSON.stringify([
                            getChinatime(this.date[0]),
                            getChinatime(this.date[1])
                        ]),
                        pics: JSON.stringify(this.pics)
                    }
                    
                    shopedit(obj).then(res => {
                        if (res.data.code == 0) {
                            
                            this.$message({
                                type: "success",
                                message: "保存成功!"
                            });
                        }
                    });


                    
            }
        },
        created(){

            
            this.ITEMS_IMG_SHOP = ITEMS_IMG_SHOP
            this.UPLOAD_IMG_SHOP = UPLOAD_IMG_SHOP
            info().then(res => {
                for(let key in res.data.data){
                    this[key] = res.data.data[key]
                }
                this.activelist = [...this.activelist,...this.supports]
                
                this.shopimgs = this.pics.map(imgstr => {
                    return{
                        name:imgstr,
                        url:ITEMS_IMG_SHOP + imgstr
                    }
                })
                
            })
        }
    };
</script>

<style lang="less" scoped>
    
    .shop_div{
        height: 1400px;
        background: #fff;
        border-radius: 5px;
    }
    .title_div{
        display: flex;
        justify-content: space-between;
        border-bottom: 1px solid #ccc;
        padding: 10px;
        margin-bottom: 20px;
        
    }
    .avatar-uploader .el-upload ,.avatar-uploader-icon{
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
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>