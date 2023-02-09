/* 
  订单模块
*/

const Router = require("koa-router");
const router = new Router({ prefix: "/order" });

const { auth } = require("../middleware/auth.middleware");
const { add ,getOrder,getAllOrder,update} = require('../controller/order.controller.js')
const {validator,validateTotal,validatorIdAndUserId}=require('../middleware/order.middleware')

router.post('/add', auth, validator({
  address_id: 'int',
  goods_info: 'array',
  total:'string'
}), validateTotal, add)

router.get("/", auth, validator({
  page_num:{type:"string",required:false},
  page_size:{type:"string",required:false},
  status:{type:"string",required:false}
}), getAllOrder)

router.get('/:id', auth, getOrder)

router.patch('/update/:id', auth, validator({
  address_id: { type: 'number', required: false },
  status:{type:'number',required:false}
}),validatorIdAndUserId,update)

module.exports=router