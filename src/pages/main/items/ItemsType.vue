<template>
    <div class="item_div">
        <div class="title_div">
            <p>商品分类</p>
            <el-button type="primary" size='mini' @click="show = true">添加分类</el-button>
        </div>
        <el-table :data="tableData" style="width: 100%;">

            <el-table-column prop="id" label="序号"></el-table-column>

            <el-table-column label="分类名称" width="300px">
                <template slot-scope="scope">
                    <span v-show="!scope.row.isedit">{{ scope.row.cateName }}</span>
                    <el-input type="text" v-show="scope.row.isedit" v-model="scope.row.cateName" />
                </template>
            </el-table-column>

            <el-table-column label="是否启用" width="300px">
                <template slot-scope="scope">
                    <el-switch :disabled="!scope.row.isedit" v-model="scope.row.state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="300px">
                <template slot-scope="scope">
                    <el-button size="mini" @click="clickEdit(scope)">{{ scope.row.isedit ? '完成': '编辑' }}</el-button>
                    <el-button size="mini" type="danger" @click="clickDelete(scope)">删除</el-button>
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

        <el-dialog title="添加分类" :visible.sync="show" width="30%">

            <el-form label-width="80px">
                <el-form-item label="分类名称">
                    <el-input v-model="cateName"></el-input>
                </el-form-item>
                <el-form-item label="是否启用">
                    <el-switch v-model="state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
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
import { itemcatelist,itemeditcate,itemaddcate,itemdelcate } from '@/api/apis'
    export default {
        data(){
            return{
                tableData: [],
                currentPage: 1,
                pagesize: 5, 
                total: 50 ,
                show:false,
                state:true,
                cateName:''
            }
        },
        methods: {
            
            getitemlist(){
                itemcatelist(this.currentPage,this.pagesize).then(res => {
                    let dataarr = res.data.data
                    
                    for(let i=0;i<dataarr.length;i++){
                        dataarr[i].state = dataarr[i].state == 1
                        dataarr[i].isedit = false
                    }
                    this.tableData = dataarr
                    this.total = res.data.total
                })
            },
            handleSizeChange(newpagesize){
                this.pagesize = newpagesize
                this.getitemlist()
            },
            handleCurrentChange(newpage) {
                this.currentPage = newpage
                this.getitemlist()
            },
            clickEdit(scope){
                
                if(scope.row.isedit){
                    itemeditcate(scope.row).then(res => {
                        if(res.data.code == 0){
                            this.$message({
                                message: "店铺分类修改成功",
                                type: "success"
                            });
                            scope.row.isedit = false;
                        }
                        
                    })
                }else{
                    scope.row.isedit = true
                }
            },
            clickDelete(scope){
                

                this.$confirm("此操作将永久删除数据, 是否继续?", {
                    confirmButtonText: "狠心删除",
                    cancelButtonText: "保留数据",
                    type: "warning"
                }).then(() => {
                    itemdelcate(scope.row.id).then(res => {
                        if(res.data.code == 0) this.getitemlist()
                            
                        
                    })

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
            clickChangeItems(){
                if(this.cateName != ''&& this.state != ''){
                    itemaddcate({cateName:this.cateName,state:this.state}).then(res => {
                    if(res.data.code == 0){
                        this.$message({
                            type: "success",
                            message: "添加商品分类成功！"
                        });
                        this.getitemlist()
                        this.cateName = ''
                        this.state = ''
                    }
                })
                }else{
                    this.$message({
                        type: "success",
                        message: "添加商品分类失败！"
                    });
                }
                
            }
        
        },
        created(){
            this.getitemlist()
        }
    }
    
</script>

<style lang="less" scoped>
    .item_div{
        
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
</style>