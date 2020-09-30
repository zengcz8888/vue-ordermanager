<template>
    <el-container>
        <el-aside width="auto">
            <template style="width:100%;">
                <img :src="ITEMS_IMG_SHOP+avartar" alt="" :style="width">
                <p v-show="show" style="color:#fff;font-size:20px;text-align: center;">外卖管理平台</p>
            </template>
            
            <el-menu :default-active="hash" class="el-menu-vertical-demo" :collapse="isCollapse" background-color="#545c64" text-color="#fff"  active-text-color="#ffd04b" router unique-opened>

                <template v-for='(item,index) in powerarr'>

                    <el-submenu v-if="item.children" :index="item.index"  :key="index">
                        
                        <template slot="title">
                            <i :class="item.i"></i>
                            <span>{{ item.name }}</span>
                        </template>

                        <el-menu-item v-for="(items) in item.children" :key="items.name" :index="items.index">{{ items.name }}</el-menu-item>
                        
                    </el-submenu>
                    
                    <el-menu-item v-else :index="item.index"  :key="index">
                        <i :class="item.i"></i>
                        <span slot="title">{{ item.name }}</span>
                    </el-menu-item>

                </template>

            </el-menu>
        </el-aside>


        <el-container>

        <el-header  style="border-bottom:1px solid #ccc">

            <div style="display:flex;align-items: center;">
                <i :class="clas" @click="clickSw"></i>
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    
                    <el-breadcrumb-item v-for="item in breadlist" :key="item" style="margin-left:10px">{{item}}</el-breadcrumb-item>
                    
                </el-breadcrumb>
            </div>

            <div class="user_img">
                <p @click="clickLog">{{ username }}</p>
                <img :src="imgUrl" alt="" style="width:50px;border-radius:50%"  @click="clickpersonal" />
            </div>
        </el-header>

        <el-main>
            
                <router-view></router-view>
            
        </el-main>

        </el-container>
    </el-container>


</template>

<script>
import { checktoKen,accountinfo,ITEMS_IMG_SHOP,info} from "@/api/apis";
export default {
    data(){
        return{
            username:'',
            imgUrl:'',
            avartar:'',
            isCollapse: true,
            list:[
                {
                    index:'/main/index',
                    i:'el-icon-s-home',
                    name:'后台首页',
                    roles:['super','normal', "power3"]
                },

                {
                    index:'/main/order',
                    i:'el-icon-document',
                    name:'订单管理',
                    roles:['super','normal', "power3"]
                },
                
                {
                    index:'3',
                    i:'el-icon-shopping-bag-1',
                    name:'商品管理',
                    roles:['super'],
                    children:[
                        {
                            index:'/main/items/itemslist',
                            name:'商品列表'
                        },
                        {
                            index:'/main/items/additem',
                            name:'添加商品'
                        },
                        {
                            index:'/main/items/itemstype',
                            name:'商品分类'
                        }
                    ]
                },

                {
                    index:'/main/shopmanager',
                    i:'el-icon-s-shop',
                    name:'店铺管理',
                    roles:['super']
                },

                {
                    index:'5',
                    i:'el-icon-user',
                    name:'账号管理',
                    roles:['super'],
                    children:[
                        {
                            index:'/main/users/userlist',
                            name:'账号列表'
                        },
                        {
                            index:'/main/users/useradd',
                            name:'添加账号'},
                        {
                            index:'/main/users/useredit',
                            name:'修改密码'
                        },
                        
                    ]
                },
                
                {
                    index:'6',i:'el-icon-s-help',
                    name:'销售统计',
                    roles:['super'],
                    children:[
                        {
                            index:'/main/count/statistics',
                            name:'商品统计'
                        },{
                            index:'/main/count/salecount',
                            name:'订单统计'
                        }
                    ]
                }
            ],
            breadlist:[],
            hash:'/main/index',
            ITEMS_IMG_SHOP:'',
            show:false,
            width:'width:70px;height:60px',
            clas:'el-icon-minus'
        }
    },
    computed:{
        powerarr(){
            let newarr = this.list.filter((item) => {
                return item.roles.includes(localStorage.role)
            })
            return newarr
        }
        
    },
    methods:{
        clickSw(){
            this.isCollapse = this.isCollapse == true ?false :true
            this.clas = this.clas == 'el-icon-minus' ?  'el-icon-plus': 'el-icon-minus'
            this.width = this.width == 'width:70px;height:60px' ? 'width:200px;height:60px':  'width:70px;height:60px'
            
                this.show = !this.show
            
            
        },
        clickLog(){
            if(this.username =='请登录'){
                this.$router.push('/')
            }
        },
        clickpersonal(){
            this.$router.push('/main/users/userpersonal')
        },
        refreshinfo(){
            accountinfo(localStorage.id).then(res => {
            this.imgUrl = res.data.accountInfo.imgUrl
            
            })
        },
        AvatarSuccess() {
            info().then(res => {
                this.avartar = res.data.data.avatar
            })
            
        },

    },
    created() {
        this.ITEMS_IMG_SHOP = ITEMS_IMG_SHOP
        
        this.hash = this.$route.path
        checktoKen(localStorage.token).then(res => {
        if (res.data.code == 0) {
            
            this.username = localStorage.acc;
            
        } else {
            
            this.username = "请登录";
        }
        }),
        this.refreshinfo()
        this.AvatarSuccess()
        this.$bus.$on('imgfinish',() => this.refreshinfo())
        this.$bus.$on('avatar',() => this.AvatarSuccess())
        this.breadlist = this.$route.meta.breadlist;
  }
    ,
    watch:{
        $route(to){
            
            this.breadlist = to.meta.breadlist;
        }
    }
    

};
</script>

<style lang="less" scoped>
@base: #545c64;
@graybase:  #F56C6C;

.el-container{
    height: 100%;
    
}
.el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    background-color: #fff;
}

.el-aside {
    background-color: @base;
    
}

.el-main {
    background-color: @graybase;
}
.el-menu {
    border: 0;
}
.user_img{
    display: flex;
    align-items: center;
}
.el-tooltip{
    width: 40px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
  }
</style>