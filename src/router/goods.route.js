/* 
  商品路由模块
*/

const Router = require("koa-router");

const router = new Router({ prefix: "/goods" });

const {
  upload,
  addGoods,
  update,
  remove,
  restore,
  getGoods,
} = require("../controller/goods.controller");

const { auth, hasAdminPermission } = require("../middleware/auth.middleware");

const { validator } = require("../middleware/goods.middleware");

router.post("/upload", auth, hasAdminPermission, upload);

router.post("/add", auth, hasAdminPermission, validator, addGoods);

router.put("/update/:id", auth, hasAdminPermission, validator, update);

router.post("/:id/off", auth, hasAdminPermission, remove);

router.post("/:id/on", auth, hasAdminPermission, restore);

router.get("/", getGoods);

module.exports = router;
