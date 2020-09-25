<template>
    <div class="user_div">
        <div class="title_div">
            账号列表
        </div>

        <el-table :data="tableData" ref="chcked" style="width: 100%;height:310px" @selection-change="selectionChange" v-loading="loading" element-loading-text="拼命加载中">  <!--  -->
            <el-table-column type="selection" width="55"> </el-table-column>

            <el-table-column label="账号名称" prop="account">
                <template slot-scope="scope">
                    <span v-show="!scope.row.isedit">{{scope.row.account}}</span>
                    <el-input v-show="scope.row.isedit" v-model="scope.row.account" />
                </template>
            </el-table-column>

            <el-table-column label="用户组" prop="userGroup">
                <template slot-scope="scope">
                    <span v-show="!scope.row.isedit">{{scope.row.userGroup}}</span>
                    <el-input v-show="scope.row.isedit" v-model="scope.row.userGroup" />
                </template>
            </el-table-column>
            <el-table-column label="创建时间" prop="ctime">
                <template slot-scope="scope">
                    <span v-show="!scope.row.isedit">{{scope.row.ctime}}</span>
                    <el-input v-show="scope.row.isedit" v-model="scope.row.ctime" />
                </template>
            </el-table-column>

            <el-table-column prop="address" label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" @click="clickEdit(scope)">{{ scope.row.isedit ? '完成' : '编辑' }}</el-button> 
                    <el-button size="mini" type="danger" @click="clickDele(scope)">删除</el-button>
                </template>
            </el-table-column>

        </el-table>
        
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentpage"
            :page-sizes="[5,10,15]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
    ></el-pagination>

        <el-button type="danger" @click="removeAll">批量删除</el-button>
        <el-button type="primary" @click="cancelAll" >取消选择</el-button>
    </div>
</template>

<script> 
import { userlist,userdel,userbatchdel,useredit } from '@/api/apis' 
import { getChinatime } from '@/utils/utils'

    export default {
        data(){
            return{
                tableData:[],
                currentpage: 1, 
                pagesize: 5, 
                total: 50 ,
                selectarr:[],
                ised:[],
                loading:true
            }
        },
        methods:{
            getuserlist(){
                this.isloading = true;
                userlist(this.currentpage,this.pagesize).then(res => {
                let arr = res.data.data
                for(let obj of arr){
                    obj.ctime = getChinatime(obj.ctime)
                    obj.isedit = false
                }
                this.tableData = arr
                this.total = res.data.total
                this.loading = false
            })
            },
            handleSizeChange(newpagesize){
                this.pagesize = newpagesize
                this.getuserlist()
            },
            handleCurrentChange(newpage) {
                this.currentpage = newpage
                this.getuserlist()
            },
            clickEdit(scope){
                if(scope.row.isedit){
                    scope.row.isedit = false
                    this.$confirm("此操作将永久修改数据, 是否继续?", {
                    confirmButtonText: "继续修改",
                    cancelButtonText: "不了",
                    type: "warning"
                }).then(() => {
                    let obj = {id:scope.row.id,account:scope.row.account,userGroup:scope.row.userGroup}
                    useredit(obj).then(res => {
                        console.log(scope.row.id,scope.row.account,scope.row.userGroup)
                        if (res.data.code == 0) this.getuserlist();
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
                }else{
                    scope.row.isedit = true
                }
                    
            },
            clickDele(scope){
                console.log(scope.row)
                this.$confirm("此操作将永久删除数据, 是否继续?", {
                    confirmButtonText: "狠心删除",
                    cancelButtonText: "保留数据",
                    type: "warning"
                }).then(() => {
                    userdel(scope.row.id).then(res => {
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
            selectionChange(arr) {
                this.selectarr = arr.map(obj => obj.id)
                this.ised = arr.map(obj => obj.isedit)
            },
            removeAll(){
                this.$confirm("此操作将永久删除数据, 是否继续?", {
                    confirmButtonText: "狠心删除",
                    cancelButtonText: "保留数据",
                    type: "warning"
                }).then(() => {
                    userbatchdel(JSON.stringify(this.selectarr)).then(res => {
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
            cancelAll(){
                this.$message({
                    type: "info",
                    message: "已取消删除"
                });
                this.$refs.chcked.toggleAllSelection()
            }
        },
        created(){
            this.getuserlist()
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