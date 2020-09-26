<template>
    <div class="order">
        <div class="title_div">
            时间范围
            <el-time-picker is-range v-model="value1" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
            <el-button type="primary" style="marginLeft:10px" size="small">查询</el-button>
        </div>
        <div id="echarts">
            
        </div>
    </div>
</template>

<script>
import echarts from 'echarts'
// import { totaldata } from '@/api/apis'
    export default {
        data(){
            return{
                value1:''
            }
        },
        mounted(){

            let myecharts = echarts.init(document.getElementById('echarts'))
            let option = {
                title: {
                    text: '堆叠区域图'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data: ['商品销量', '广告', '视频广告', '直接访问', '搜索引擎']
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: '商品销量',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: [120, 132, 101, 134, 90, 230, 210]
                    },
                    {
                        name: '广告',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: [220, 182, 191, 234, 290, 330, 310]
                    },
                    {
                        name: '视频广告',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: [150, 232, 201, 154, 190, 330, 410]
                    },
                    {
                        name: '直接访问',
                        type: 'line',
                        stack: '总量',
                        areaStyle: {},
                        data: [320, 332, 301, 334, 390, 330, 320]
                    },
                    {
                        name: '搜索引擎',
                        type: 'line',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        areaStyle: {},
                        data: [820, 932, 901, 934, 1290, 1330, 1320]
                    }
                    
                ]
                
};
            myecharts.setOption(option)
        }
    }
</script>

<style lang="less" scoped>
    .title_div{
        color: #808080;
        margin-bottom: 20px;
    }
    .main_div{
        height: 100%;
        background: #fff;
    }
    #echarts{
        width: 100%;
        height: 400px;
    }
    .order{
        background: #fff;
        padding: 20px;
        border-radius: 5px;
    }
</style>