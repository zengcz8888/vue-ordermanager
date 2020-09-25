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
    </div>
</template>

<script>
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
                ]
            }
        }
    }
</script>

<style lang="less" scoped>
    .index_div{
        padding: 10px;
        .font_div{
            text-align: center;
            margin-top: 10px;
            
        }
        .name_p{
            color: #D9D9D9;
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
    background: #fff;
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
    background-color: #f9fafc;
  }
</style>