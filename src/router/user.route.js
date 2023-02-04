const Router = require("koa-router");

const router = new Router({ prefix: "/users" });

const { register, login } = require("../controller/user.controller");

const {
  userNameValidator,
  userValidator,
  cryptPassword,
} = require("../middleware/user.middleware");

router.post(
  "/register",
  userValidator,
  userNameValidator,
  cryptPassword,
  register
);

router.post("/login", login);

module.exports = router;
