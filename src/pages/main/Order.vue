<template>
    <div class="order_div">
        <div class="title_div">
            <el-form ref="form" :model="form" label-width="80px" style="display:flex;flexWrap: wrap;">
                <el-form-item label="订单号">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>

                <el-form-item label="收货人">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>

                <el-form-item label="手机号">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>

                <el-form-item label="订单状态">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="区域一" value="shanghai"></el-option>
                    <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="订单状态">
                    <el-time-picker is-range v-model="value1" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
                </el-form-item>

                <el-button type="primary" size="mini" style="height:38px;marginLeft:10px">查询</el-button>

            </el-form>
        </div>
        <el-table :data="tableData" style="width: 100%;">
            <el-table-column prop="name" label="订单号"></el-table-column>
            <el-table-column prop="date" label="下单时间"></el-table-column>
            <el-table-column prop="address" label="手机号"></el-table-column>
            <el-table-column prop="" label="配送地址"></el-table-column>
            <el-table-column prop="" label="送达时间"></el-table-column>
            <el-table-column prop="" label="用户备注"></el-table-column>
            <el-table-column prop="" label="订单金额"></el-table-column>
            <el-table-column prop="" label="订单状态"></el-table-column>
            <el-table-column  label="操作">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small">编辑</el-button>
                </template>
            </el-table-column>
            
        </el-table>
        <el-pagination  :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400" style="marginTop:20px;"></el-pagination>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                form: {
                name: '',
                region: '',
                date1: '',
                date2: '',
                delivery: false,
                type: [],
                resource: '',
                desc: ''
                },
                currentPage1: 5,
                currentPage2: 5,
                currentPage3: 5,
                currentPage4: 4,
                tableData: [
                    {
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                    }, 
                    {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                    }, 
                    {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                    }, 
                    {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                    }
                ],
                value1:''
            }
        },
        methods: {
            handleSizeChange(val) {
                
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        },
    }
</script>

<style lang="less" scoped>
    .order_div{
        height: 700px;
        background: #fff;
        border-radius: 5px;
        padding: 20px;
        .title_div{
            margin-bottom: 40px;
        }
    }
</style>