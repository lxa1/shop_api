/* 
  地址模块
*/
const Router = require("koa-router");
const router = new Router({ prefix: "/address" });

const { auth } = require("../middleware/auth.middleware");
const { validator ,validatorIdAndUserId} = require("../middleware/address.middleware");
const { add, getAddress, update ,remove} = require("../controller/address.controller");


// 添加地址
router.post(
  "/add",
  auth,
  validator({
    consignee: "string",
    phone: {
      type: "string",
      format: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
    },
    address: "string",
    is_default: "bool",
  }),
  add
);

// 获取地址列表
router.get("/", auth, getAddress);


// 更新地址信息
router.put(
  "/update/:id",
  auth,
  validator({
    consignee: "string",
    phone: {
      type: "string",
      format: /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
    },
    address: "string",
    is_default: "bool",
  }),
  validatorIdAndUserId,
  update
);


// 删除地址
router.delete('/:id',auth,validatorIdAndUserId,remove)

module.exports = router;
