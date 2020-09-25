import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:5000'

export var ITEMS_IMG_UPLOAD = axios.defaults.baseURL+'/goods/goods_img_upload' 
export var ITEMS_IMG_URL = axios.defaults.baseURL+'/upload/imgs/goods_img/'

export var login = params => axios.post('/users/checkLogin',params)//

export var useradd = params => axios.post('/users/add',params)//

export var checktoKen = token => axios.get('/users/checktoKen',{params: {token}})//

export var userlist = (currentPage,pageSize) => axios.get('/users/list',{params:{currentPage,pageSize}})//

export var userdel = id => axios.get('/users/del',{params:{id}})//

export var userbatchdel = ids => axios.get('/users/batchdel',{params:{ids}})//

export var useredit = params => axios.post('/users/edit',params)

export var usercheckoldpwd = (oldPwd,id) => axios.get('/users/checkoldpwd',{params:{oldPwd,id}})//

export var usereditpwd = params => axios.post('/users/editpwd',params)//

export var useraccountinfo = params => axios.get('/users/accountinfo',{params:{params}})

export var useravatar_upload = params => axios.get('/users/avatar_upload',{params:{params}})//

export var accountinfo = id => axios.get('/users/accountinfo',{params:{id}})//


export var itemaddcate = params => axios.post('/goods/addcate',params)

export var itemcatelist = (currentPage,pageSize) => axios.get('/goods/catelist',{params:{currentPage,pageSize}})//

export var itemeditcate = params => axios.post('/goods/editcate',params)//

export var itemdelcate = id => axios.get('/goods/delcate',{params:{id}})

export var itemadd = params => axios.post('/goods/add',params)

export var categories = () => axios.get('/goods/categories')

export var goods_img_upload = () => axios.post('/goods/goods_img_upload')

export var itemlist = (currentPage,pageSize) => axios.get('/goods/list',{params:{currentPage,pageSize}})

export var itemdel = id => axios.get('/goods/del',{params:{id}})

export var itemedit = params => axios.post('/goods/edit',params)