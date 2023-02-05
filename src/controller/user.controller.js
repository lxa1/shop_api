/* 用户操作控制 */
const jwt = require("jsonwebtoken");

const {
  createUser,
  getUserInfo,
  updateById,
} = require("../service/user.service.js");

const {
  userRegisterError,
  loginError,
  updatePasswordError,
} = require("../constant/err.type");

const { JWT_SECRET } = require("../config/config.default");
class UserController {
  // 用户注册操作
  async register(ctx, next) {
    // 获取数据
    const { user_name, password } = ctx.request.body;

    // 操作
    try {
      const res = await createUser(user_name, password);
      ctx.body = {
        code: 0,
        message: "用户注册成功",
        result: {
          id: res.id,
          user_name: res.user_name,
        },
      };
    } catch (error) {
      console.error("用户注册出现未知错误", error);
      ctx.app.emit("error", userRegisterError, ctx);
    }
  }

  //登录
  async login(ctx, next) {
    const { user_name } = ctx.request.body;
    try {
      const { password, ...res } = await getUserInfo({ user_name });
      const token = jwt.sign(res, JWT_SECRET, { expiresIn: "1d" });
      ctx.body = {
        code: 0,
        message: "用户登陆成功",
        result: {
          token,
        },
      };
    } catch (error) {
      console.error(error);
      ctx.app.emit("error", loginError, ctx);
    }
  }

  // 修改密码
  async updatePassword(ctx, next) {
    try {
      const { id } = ctx.state.user;
      const { password } = ctx.request.body;
      const res = await updateById(id, { password });
      if (res) {
        ctx.body = {
          code: "10000",
          message: "密码修改成功",
          result: "",
        };
      }
    } catch (error) {
      console.error("密码修改失败", error);
      ctx.app.emit("error", updatePasswordError, ctx);
    }
  }
}
module.exports = new UserController();
