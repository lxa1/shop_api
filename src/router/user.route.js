const Router = require("koa-router");

const router = new Router({ prefix: "/users" });

const {
  register,
  login,
  updatePassword,
} = require("../controller/user.controller");

const { auth } = require("../middleware/auth.middleware");

const {
  userNameValidator,
  userValidator,
  cryptPassword,
  verifyLogin,
  IsSamePassword,
} = require("../middleware/user.middleware");

// 注册路由
router.post(
  "/register",
  userValidator,
  userNameValidator,
  cryptPassword,
  register
);

// 登录路由
router.post("/login", userValidator, verifyLogin, login);

// 修改密码路由
router.patch("/", auth, IsSamePassword, cryptPassword, updatePassword);

module.exports = router;
