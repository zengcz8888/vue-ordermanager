<template>
    <div class="item_div">
        <div class="title_div">
            商品列表
        </div>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <el-form label-position="left" inline class="demo-table-expand">

                        <el-form-item label="商品 ID">
                            <span>{{ scope.row.id }}</span>
                        </el-form-item>

                        <el-form-item label="商品名称">
                            <span>{{ scope.row.name }}</span>
                        </el-form-item>

                        <el-form-item label="商品分类">
                            <span>{{ scope.row.category }}</span>
                        </el-form-item>

                        <el-form-item label="商品价格">
                            <span>{{ scope.row.price }}</span>
                        </el-form-item>

                        <el-form-item label="商品图片">
                            <span>{{ scope.row.imgUrl }}</span>
                        </el-form-item>

                        <el-form-item label="创建时间">
                            <span>{{ scope.row.ctime }}</span>
                        </el-form-item>
                        
                        <el-form-item label="商品评价">
                            <span>{{ scope.row.rating }}</span>
                        </el-form-item>

                        <el-form-item label="商品销量">
                            <span>{{ scope.row.sellCount }}</span>
                        </el-form-item>

                        <el-form-item label="商品描述">
                            <span>{{ scope.row.goodsDesc }}</span>
                        </el-form-item>
                    </el-form>
                </template>

            </el-table-column>
            <el-table-column label="商品名称" prop="name"></el-table-column>
            <el-table-column label="所属分类" prop="category"></el-table-column>
            <el-table-column label="商品价格" prop="price"></el-table-column>
            <el-table-column label="商品图片">
                <template slot-scope="scope">
                    <img style="width: 60px;height:60px" :src="ITEMS_IMG_URL + scope.row.imgUrl" />
                </template>
            </el-table-column>
            <el-table-column label="商品描述" prop="goodsDesc"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="clickEdit(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="clickDele(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination  
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage" 
        :page-sizes="[5,10,20]" 
        :page-size="pagesize" 
        layout="total, sizes, prev, pager, next, jumper" 
        :total="total" 
        style="marginTop:20px;"
        ></el-pagination>

        <el-dialog title="编辑商品数据" :visible.sync="show" width="30%">
            

            <el-form label-width="80px">
                <el-form-item label="商品名称">
                    <el-input v-model="obj.name"></el-input>
                </el-form-item>

                <el-form-item label="商品分类">
                    <el-select v-model="obj.category" placeholder="请选择商品类型">
                        <el-option v-for="(item) in categorieslist" :key="item.cateName" :label="item.cateName" :value="item.cateName"></el-option>
                        
                    </el-select>
                </el-form-item>

                <el-form-item label="商品价格">
                    <el-input-number v-model="obj.price" :min="1"  label="描述文字"></el-input-number>
                </el-form-item>

                <el-form-item label="商品图片">
                    <el-upload
                    class="avatar-uploader"
                    :action="ITEMS_IMG_UPLOAD"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    >
                    
                    <i v-show="!obj.imgUrl" class="el-icon-plus avatar-uploader-icon"></i>
                    <img v-show="obj.imgUrl" :src="ITEMS_IMG_URL+obj.imgUrl" alt="" style="width:178px;height:178px">
                    </el-upload>
                </el-form-item>

                <el-form-item label="商品描述">
                    <el-input type="textarea" v-model="obj.goodsDesc"></el-input>
                </el-form-item>
            </el-form>
            
            
            




            <span slot="footer" class="dialog-footer">
                <el-button @click="show=false">取 消</el-button>
                <el-button type="primary" @click="clickChangeItems">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { itemlist,ITEMS_IMG_URL,itemdel,ITEMS_IMG_UPLOAD,categories,itemedit } from '@/api/apis'
import { getChinatime } from '@/utils/utils'
    export default {
        data(){
            return{
                tableData: [],
                currentPage: 1,
                pagesize: 5, 
                total: 50 ,
                ITEMS_IMG_URL:'',
                show:false,
                ITEMS_IMG_UPLOAD:'',
                obj:{},
                categorieslist: []
            }
        },
        methods:{
            getuserlist(){
                itemlist(this.currentPage,this.pagesize).then(res => {
                    let arr = res.data.data
                    for(let obj of arr){
                        obj.ctime = getChinatime(obj.ctime)
                        obj.isedit = false
                    }
                    this.tableData = arr
                    this.total = res.data.total
                })
            },
            handleSizeChange(newpagesize){
                this.pagesize = newpagesize
                this.getuserlist()
            },
            handleCurrentChange(newpage) {
                this.currentPage = newpage
                this.getuserlist()
            },
            handleAvatarSuccess(res) {
                if (res.code == 0) {
                    this.obj.imgUrl = res.imgUrl;
                }
            },
            clickEdit(row){
                console.log(row)
                categories().then(res => {
                    this.categorieslist = res.data.categories;
                });
                this.obj = { ...row };
                this.show = true
            },
            clickChangeItems(){
                delete this.obj.rating;
                delete this.obj.ratings;
                delete this.obj.sellCount;

                itemedit(this.obj).then(res => {
                    if (res.data.code == 0) {
                    this.$message({
                        type: "success",
                        message: "商品数据修改成功！"
                    });
                    
                    this.getuserlist()
                    
                    this.show = false;
                    }
                });
            },
            clickDele(scope){
                console.log(scope.row)
                this.$confirm("此操作将永久删除数据, 是否继续?", {
                    confirmButtonText: "狠心删除",
                    cancelButtonText: "保留数据",
                    type: "warning"
                }).then(() => {
                    itemdel(scope).then(res => {
                        if (res.data.code == 0) this.getuserlist();
                    });

                    this.$message({
                        type: "success",
                        message: "删除成功!"
                    });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });
            },
        },
        created(){
            this.ITEMS_IMG_URL = ITEMS_IMG_URL
            this.ITEMS_IMG_UPLOAD = ITEMS_IMG_UPLOAD
            this.getuserlist()
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

    .demo-table-expand {
        font-size: 0;
    }
    .demo-table-expand label {
        width: 90px;
        color: #99a9bf;
    }
    .demo-table-expand .el-form-item {
        margin-right: 0;
        margin-bottom: 0;
        width: 50%;
    }
</style>