<template>
    <div class="shop_div">
        <div class="title_div">
            <p>店铺管理</p>
            <el-button type="primary" size='mini'>保存</el-button>
        </div>
        <el-form ref="form" :model="sizeForm" label-width="80px" size="mini" style="width:500px">

            <el-form-item label="店铺名称">
                <el-input v-model="sizeForm.name" placeholder="粥品官纺（天府新谷）"></el-input>
            </el-form-item>

            <el-form-item label="店铺公告">
                <el-input type="textarea" v-model="sizeForm.des" size="mini"></el-input>
            </el-form-item>

            <el-form-item label="店铺头像">
                
            </el-form-item>

            <el-form-item label="店铺图片">
                
            </el-form-item>

            <el-form-item label="配送费">
                <el-input v-model="sizeForm.resource" size="medium"></el-input>
            </el-form-item>

            <el-form-item label="配送时间">
                <el-input v-model="sizeForm.resource" size="medium"></el-input>
            </el-form-item>

            <el-form-item label="配送描述">
                <el-input v-model="sizeForm.resource" size="medium"></el-input>
            </el-form-item>

            <el-form-item label="店铺评分">
                <el-input v-model="sizeForm.resource" size="medium"></el-input>
            </el-form-item>

            <el-form-item label="销量">
                <el-input v-model="sizeForm.resource" size="medium"></el-input>
            </el-form-item>

            <el-form-item label="活动">
                <el-checkbox v-model="checked">在线支付满28减5</el-checkbox>
                <el-checkbox v-model="checked">VC无限橙果汁全场8折</el-checkbox>
                <el-checkbox v-model="checked">单人精彩套餐</el-checkbox>
                <el-checkbox v-model="checked">特价饮品8折抢购</el-checkbox>
                <el-checkbox v-model="checked">单人特色套餐</el-checkbox>
            </el-form-item>

            <el-form-item label="营业时间">
                <el-time-picker is-range v-model="value1" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择间范围"></el-time-picker>
            </el-form-item>

                
        </el-form>
    </div>
</template>

<script>
  export default {
    data() {
      return {
        sizeForm: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          des:''
        },
        value2:'',
        value1:'',
        checked:''
      };
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    }
  };
</script>

<style lang="less" scoped>
    
    .shop_div{
        height: 700px;
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