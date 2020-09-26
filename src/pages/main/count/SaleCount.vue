<template>
    <div class="order">
        <div class="title_div">
            时间范围
            <el-date-picker 
            is-range 
            v-model="date" 
            type="datetimerange"
            range-separator="至" 
            start-placeholder="开始时间" 
            end-placeholder="结束时间" 
            placeholder="选择时间范围"
            ></el-date-picker>
            <el-button type="primary" style="marginLeft:10px"  @click="clickSearch" size="small" icon="el-icon-search">查询</el-button>
        </div>
        <div id="myecharts">
            
        </div>
    </div>
</template>

<script>
import echarts from 'echarts'
import { ordertotal } from '@/api/apis'
import { getChinatime } from '@/utils/utils'
    export default {
        data(){
            return{
                date:[]
            }
        },
        methods:{
            clickSearch(){
                let timestr = JSON.stringify([
                    getChinatime(this.date[0]),
                    getChinatime(this.date[1])
                ]);
                this.echarts(timestr);
            },
            echarts(){
                ordertotal('["2020-01-01 00:00:00", "2020-10-10 00:00:00"]').then(res => {
                
                let arr = res.data.data;

                for (let obj of arr) {
                    obj.orderTime = getChinatime(obj.orderTime);
                }
            
            
                
                let myecharts = echarts.init(document.getElementById('myecharts'))
                let option = {
                    xAxis: {
                        type: 'category',
                        data: arr.map(obj => obj.orderTime)
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: arr.map(obj => obj.orderAmount),
                        type: 'bar'
                    }]
                };
                myecharts.setOption(option)
            })
            }
        },
        mounted(){
            this.echarts()
            
        }
    }
</script>

<style lang="less" scoped>
    .title_div{
        color: #fff;
        margin-bottom: 20px;
    }
    .main_div{
        height: 100%;
        background: #fff;
    }
    #myecharts{
        width: 100%;
        height: 400px;
        
    }
    .order{
        background: #fff;
        padding: 20px;
        border-radius: 5px;
    }
</style>