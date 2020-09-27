<template>
    <div class="item_div">
        <div class="title_div">
            添加商品
        </div>
        <el-form label-width="80px" style="width:400px">

            <el-form-item label="商品名称">
                <el-input v-model="name"></el-input>
            </el-form-item>

            <el-form-item label="商品分类">
                <el-select v-model="category" placeholder="请选择商品类型">
                    <el-option v-for="(item) in list" :key="item.cateName" :label="item.cateName" :value="item.cateName"></el-option>
                    
                </el-select>
            </el-form-item>

            <el-form-item label="商品价格">
                <el-input-number v-model="price" @change="handleChange" :min="1"  label="描述文字"></el-input-number>
            </el-form-item>

            <el-form-item label="商品图片">
                <el-upload
                class="avatar-uploader"
                :action="ITEMS_IMG_UPLOAD"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                >
                
                <i v-show="imgUrl == ''" class="el-icon-plus avatar-uploader-icon"></i>
                <img v-show="imgUrl != ''" :src="ITEMS_IMG_URL+imgUrl" alt="" style="width:178px;height:178px">
                </el-upload>
            </el-form-item>

            <el-form-item label="商品描述">
                <el-input type="textarea" v-model="goodsDesc" rows="3"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="clickAdd">添加商品</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
import { itemadd,categories,ITEMS_IMG_UPLOAD,ITEMS_IMG_URL } from '@/api/apis'
export default {
    data() {
        return {
            name:'',
            price:'1',
            category:'',
            goodsDesc:'',
            imgUrl:'',
            list:[],
            ITEMS_IMG_UPLOAD:'',
            ITEMS_IMG_URL:''
        }
    },
    methods: {
        clickAdd() {
            if(this.category !='' &&this.goodsDesc !='' && this.imgUrl !='' &&this.name != ''){
                itemadd({
                    name:this.name,
                    category:this.category,
                    price:this.price,
                    imgUrl:this.imgUrl,
                    goodsDesc:this.goodsDesc
                }).then(res => {
                    if(res.data.code ==0){
                        this.name = '',
                        this.price = '1',
                        this.category = '',
                        this.goodsDesc = '',
                        this.$message({
                            message:'商品添加成功！',
                            type:'success'
                            
                        })
                    }
                })
            }else{
                this.$message({
                    message:'不能为空！',
                    type:'success'
                })
            }
        },
        handleChange(value) {
            console.log(value);
        },
        handleAvatarSuccess(res) {
            if(res.code == 0){
                this.imgUrl = res.imgUrl
                
            }
        },
        
    },
    created(){
        this.ITEMS_IMG_UPLOAD = ITEMS_IMG_UPLOAD
        this.ITEMS_IMG_URL = ITEMS_IMG_URL
        categories().then(res => {
            this.list = res.data.categories
            this.category = res.data.categories[0].cateName
        })
    }
}

</script>

<style lang="less" scoped>
    .item_div{
        
        background: #fff;
        border-radius: 5px;
        padding: 20px;
        .title_div{
            border-bottom:1px solid #ccc; 
            padding-bottom: 10px;
            margin-bottom: 20px;
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