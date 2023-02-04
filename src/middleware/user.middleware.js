/* 用户模块中间件 */
const { getUserInfo } = require("../service/user.service");

const { userFormatError, userAlreadyExited ,userRegisterError} = require("../constant/err.type");

const bcrypt = require('bcryptjs')

//验证用户名和密码是否为空
const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  if (!user_name || !password) {
    console.error("用户名或密码为空", ctx.request.body);
    ctx.app.emit("error", userFormatError, ctx);
    return;
  }
  await next();
};

// 验证用户名是否已经存在
const userNameValidator = async (ctx, next) => {
  const { user_name } = ctx.request.body;
  try {
    const res = await getUserInfo({ user_name })
    if (res) {
      console.error("用户名已存在", ctx.request.body);
      ctx.app.emit("error", userAlreadyExited, ctx);
      return;
    }
  } catch (error) {
    console.error('用户注册出现未知错误',error)
    ctx.app.emit('error',userRegisterError,ctx)
  }
  await next();
};

// 密码加密中间件
const cryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  // 加盐
  const salt = bcrypt.genSaltSync(10); //加盐的次数
  const hash = bcrypt.hashSync(password, salt); //hash保存的是密文
  ctx.request.body.password = hash;
  await next();
};

module.exports = { userNameValidator, userValidator, cryptPassword };
