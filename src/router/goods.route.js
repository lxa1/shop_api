/* 
  商品路由模块
*/

const Router = require("koa-router");

const router = new Router({ prefix: "/goods" });

const { upload, addGoods } = require("../controller/goods.controller");

const { auth, hasAdminPermission } = require("../middleware/auth.middleware");

const { validator } = require("../middleware/goods.middleware");

router.post("/upload", auth, hasAdminPermission, upload);

router.post("/add", auth, hasAdminPermission, validator, addGoods);

module.exports = router;
