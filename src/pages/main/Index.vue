<template>
    <div class="index_div">
        <el-row :gutter="20">
            <el-col :span="6" v-for="(item,index) in list" :key="index">
                <div class="grid-content bg-purple">
                    <img :src="item.img" alt="">
                    <div class="font_div">
                        <p class="name_p">{{ item.name }}</p>
                        <p>{{ item.num }}</p>
                    </div>
                </div>
            </el-col>
        </el-row>
        <div id="echarts">

        </div>
    </div>
</template>

<script>
import echarts from 'echarts'
import { totaldata } from '@/api/apis'
    export default {
        data(){
            return{
                
                list:[
                    {
                        img:require('../../assets/imgs/d.png'),
                        name:'总订单',
                        num:10000,
                    },
                    {
                        img:require('../../assets/imgs/j.png'),
                        name:'总销售额',
                        num:10000,
                    },
                    {
                        img:require('../../assets/imgs/d_2.png'),
                        name:'今日订单数',
                        num:10000,
                    },
                    {
                        img:require('../../assets/imgs/j_2.png'),
                        name:'今日销售额',
                        num:10000,
                    },
                ],
                
            }
        },
        mounted(){

            totaldata().then(res => {
                
                this.list[0].num = res.data.totalOrder
                this.list[1].num = res.data.totalAmount
                this.list[2].num = res.data.todayOrder
                this.list[3].num = res.data.totayAmount

                let myecharts = echarts.init(document.getElementById('echarts'))

                let option = {
                    title: {
                        text: '数据统计'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['金额数据', '订单数据', '注册人数', '管理员人数']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: res.data.xData
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            name: '金额数据',
                            type: 'line',
                            stack: '总量',
                            data: res.data.amountData
                        },
                        {
                            name: '订单数据',
                            type: 'line',
                            stack: '总量',
                            data: res.data.orderData
                        },
                        {
                            name: '注册人数',
                            type: 'line',
                            stack: '总量',
                            data: [150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name: '管理人数',
                            type: 'line',
                            stack: '总量',
                            data: [320, 332, 301, 334, 390, 330, 320]
                        },
                        
                    ]
                };

                myecharts.setOption(option)
            })


            

        },
        created(){
            
        }
    }
</script>

<style lang="less" scoped>
    .index_div{
        padding: 10px;
        background: #fff;
        .font_div{
            text-align: center;
            margin-top: 10px;
            
        }
        .name_p{
            color: #fff;
            margin-bottom: 10px;
        }
    }
    .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  
  .bg-purple {
    background:#545c64;
  }
  
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
    display: flex;
    justify-content: space-between;
    padding: 10px 10px;
    
    img{
        width: 70px;
    }
  }
  .row-bg {
    padding: 10px 0;
    background-color: #fff;
  }
  #echarts{
      width: 100%;
      height: 400px;
  }
</style>