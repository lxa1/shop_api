/* 
  购物车模块
*/

const Router = require("koa-router");
const router = new Router({ prefix: "/cart" });

const { auth } = require("../middleware/auth.middleware");

const { add, getCart, update ,remove,selectAll,deSelectAll} = require("../controller/cart.controller.js");

const { validator } = require("../middleware/cart.middleware");

// 添加到购物车
router.post(
  "/add",
  auth,
  validator({ goods_id: { type: "number", required: true } }),
  add
);
// 获取购物车信息
router.get("/", auth, getCart);

// 更新购物车信息
router.patch(
  "/update/:id",
  auth,
  validator({
    number: { type: "number", required: false },
    selected: { type: "bool", required: false },
  }),
  update
);

// 删除购物车
router.delete('/', auth, remove)

// 全选
router.post('/selectAll', auth, selectAll)


// 全不选
router.post('/deSelectAll',auth,deSelectAll)

module.exports = router;
