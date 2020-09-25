<template>
    <div>
        <div class="title_div">
            时间范围
            <el-time-picker is-range v-model="value1" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围"></el-time-picker>
            <el-button type="primary" style="marginLeft:10px" size="small">查询</el-button>
        </div>
        <div class="main_div">
            1
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                value1:''
            }
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
</style>