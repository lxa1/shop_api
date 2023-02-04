/* 用户操作控制 */ 

const { createUser } = require("../service/user.service.js");

const {userRegisterError} =require("../constant/err.type")
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
        message: '用户注册成功',
        result: {
          id: res.id,
          user_name:res.user_name
        }
      };
    } catch (error) {
      console.error('用户注册出现未知错误',error)
      ctx.app.emit('error',userRegisterError,ctx)
    }
    
  }
  async login(ctx, next) {
    ctx.body = "登陆成功";
  }
}
module.exports = new UserController();
