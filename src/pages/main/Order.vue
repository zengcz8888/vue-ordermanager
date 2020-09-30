<template>
    <div class="order_div">
        <div class="title_div">
            <el-form label-width="80px" :inline="true" style="display:flex;flexWrap: wrap;" class="demo-form-inline">
                <el-form-item label="订单号">
                    <el-input v-model="orderNo" placeholder="订单号"></el-input>
                </el-form-item>

                <el-form-item label="收货人">
                    <el-input v-model="consignee" placeholder="收货人"></el-input>
                </el-form-item>

                <el-form-item label="手机号">
                    <el-input v-model="phone" placeholder="手机号"></el-input>
                </el-form-item>

                <el-form-item label="订单状态">
                    <el-select v-model="orderState" placeholder="订单状态">
                        <el-option v-for="item in option" :key="item" :label="item" :value="item"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="选择时间">
                    <el-time-picker is-range v-model="date" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
                </el-form-item>

                <el-button type="primary" size="mini" style="height:38px;marginLeft:10px" @click="clickSearch">查询</el-button>

            </el-form>
        </div>
        <el-table :data="tableData">
            <el-table-column prop="orderNo" label="订单号">
                <template slot-scope="scope">
                    <span v-show="!isedit">{{scope.row.orderNo}}</span>
                    <el-input v-show="isedit" v-model="scope.row.orderNo" />
                </template>
            </el-table-column>
            <el-table-column prop="orderTime" label="下单时间">
                <template slot-scope="scope">
                    <span v-show="!isedit">{{scope.row.orderTime}}</span>
                    <el-input v-show="isedit" v-model="scope.row.orderTime" />
                </template>
            </el-table-column>
            <el-table-column prop="phone" label="手机号">
                <template slot-scope="scope">
                    <span v-show="!isedit">{{scope.row.phone}}</span>
                    <el-input v-show="isedit" v-model="scope.row.phone" />
                </template>
            </el-table-column>
            <el-table-column prop="deliverAddress" label="配送地址">
                <template slot-scope="scope">
                    <span v-show="!isedit">{{scope.row.deliverAddress}}</span>
                    <el-input v-show="isedit" v-model="scope.row.deliverAddress" />
                </template>
            </el-table-column>
            <el-table-column prop="deliveryTime" label="送达时间">
                <template slot-scope="scope">
                    <span v-show="!isedit">{{scope.row.deliveryTime}}</span>
                    <el-input v-show="isedit" v-model="scope.row.deliveryTime" />
                </template>
            </el-table-column>
            <el-table-column prop="remarks" label="用户备注">
                <template slot-scope="scope">
                    <span v-show="!isedit">{{scope.row.remarks}}</span>
                    <el-input v-show="isedit" v-model="scope.row.remarks" />
                </template>
            </el-table-column>
            <el-table-column prop="orderAmount" label="订单金额">
                <template slot-scope="scope">
                    <span v-show="!isedit">{{scope.row.orderAmount}}</span>
                    <el-input v-show="isedit" v-model="scope.row.orderAmount" />
                </template>
            </el-table-column>
            <el-table-column prop="orderState" label="订单状态">
                <template slot-scope="scope">
                    <span v-show="!isedit">{{scope.row.orderState}}</span>
                    <el-input v-show="isedit" v-model="scope.row.orderState" />
                </template>
            </el-table-column>
            <el-table-column  label="操作" fixed="right">
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope)" type="text" size="small">查看</el-button>
                    <el-button type="text" size="small" @click="clickedit(scope)">{{ isedit ? '完成' : '编辑' }}</el-button>
                </template>
            </el-table-column>
            
        </el-table>
        <el-pagination 
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage" 
        :page-sizes="[5, 20, 30, 40]" 
        :page-size="pageSize" 
        layout="total, sizes, prev, pager, next, jumper" 
        :total="total" style="marginTop:20px;"
        >
        </el-pagination>

        <el-dialog title="订单详情" :visible.sync="show" width="30%">
            
            <template>
                    <el-form label-position="left" inline class="demo-table-expand">

                        <el-form-item label="订单 ID">
                            <span>{{ obj.id }}</span>
                        </el-form-item>
                        <el-divider></el-divider>
                        <el-form-item label="订单号">
                            <span>{{ obj.orderNo }}</span>
                        </el-form-item>
                        <el-divider></el-divider>
                        <el-form-item label="下单时间">
                            <span>{{ obj.orderTime }}</span>
                        </el-form-item>
                        <el-divider></el-divider>
                        <el-form-item label="联系电话">
                            <span>{{ obj.phone }}</span>
                        </el-form-item>
                        <el-divider></el-divider>
                        <el-form-item label="收货人">
                            <span>{{ obj.consignee }}</span>
                        </el-form-item>
                        <el-divider></el-divider>
                        <el-form-item label="送货地址">
                            <span>{{ obj.deliverAddress }}</span>
                        </el-form-item>
                        <el-divider></el-divider>
                        <el-form-item label="送达时间">
                            <span>{{ obj.deliveryTime }}</span>
                        </el-form-item>
                        <el-divider></el-divider>
                        <el-form-item label="备注">
                            <span>{{ obj.remarks }}</span>
                        </el-form-item>
                        <el-divider></el-divider>
                        <el-form-item label="订单金额">
                            <span>{{ obj.orderAmount }}</span>
                        </el-form-item>
                        <el-divider></el-divider>
                        <el-form-item label="订单状态">
                            <span>{{ obj.orderState }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            
            
            




            <span slot="footer" class="dialog-footer">
                <el-button @click="show=false">取 消</el-button>
                <el-button type="primary" @click="show = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { order,detail,edit } from '@/api/apis'
import { getChinatime } from '@/utils/utils'
    export default {
        data(){
            return{
                
                currentPage: 1,
                pageSize:5,
                tableData: [],
                total: 50 ,
                show:false,
                obj:{},
                isedit:false,

                option: ["已完成", "派送中", "已受理", "全部"],
                orderNo: "", 
                consignee: "", 
                phone: "", 
                orderState: "", 
                date: [new Date("1998-11-07 16:42:20"), new Date()],
            }
        },
        methods: {
            getorderlist(paramsex){
                order({currentPage:this.currentPage,pageSize:this.pageSize,...paramsex}).then(res => {
                    let arr = res.data.data
                    for(let obj of arr){
                        obj.deliveryTime = getChinatime(obj.deliveryTime)
                        obj.orderTime = getChinatime(obj.orderTime)
                    }
                    this.tableData = arr
                    this.total = res.data.total
                    console.log(res)
                })
            },
            handleSizeChange(newpagesize) {
                this.pageSize = newpagesize
                this.getorderlist()
            },
            handleCurrentChange(newpage) {
                this.currentPage = newpage
                this.getorderlist(this.paramsex)
            },
            handleClick(scope){
                
                this.show = true
                detail(scope.row.id).then(res => {

                    this.obj = res.data.data
                    this.obj.orderTime = getChinatime(res.data.data.orderTime)
                    this.obj.deliveryTime = getChinatime(res.data.data.deliveryTime)

                })
            },
            clickedit(scope){
                console.log(scope)
                if(this.isedit){
                    this.isedit = false
                    this.$confirm("此操作将永久修改数据, 是否继续?", {
                    confirmButtonText: "继续修改",
                    cancelButtonText: "不了",
                    type: "warning"
                }).then(() => {
                    let obj = {
                        id: scope.row.id,
                        orderNo: scope.row.orderNo,
                        orderTime: scope.row.orderTime,
                        phone: scope.row.phone,
                        deliveryTime: scope.row.deliveryTime,
                        deliverAddress: scope.row.deliverAddress,
                        remarks: scope.row.remarks,
                        orderAmount: scope.row.orderAmount,
                        orderState: scope.row.orderState,
                        consignee: scope.row.consignee
                        
                    }
                    
                    edit(obj).then(res => {
                        console.log(res)
                        if (res.data.code == 0) {
                            this.getorderlist()
                            
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
                }else{
                    this.isedit = true
                }
                
            },
            clickSearch(){
                let { orderNo, consignee, phone, orderState } = this;

                
                let paramsex = {};
                if (orderNo != "") paramsex.orderNo = orderNo;
                if (consignee != "") paramsex.consignee = consignee;
                if (phone != "") paramsex.phone = phone;
                if (orderState != "" && orderState != "全部") paramsex.orderState = orderState;
                if (this.date)
                    paramsex.date = JSON.stringify([
                    getChinatime(this.date[0]),
                    getChinatime(this.date[1])
                    ]);

                this.paramsex = paramsex;

                this.getorderlist(this.paramsex);
            }
        },
        created(){
            this.getorderlist()
        }
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