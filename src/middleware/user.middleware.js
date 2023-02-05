/* 用户模块中间件 */
const { getUserInfo } = require("../service/user.service");

const {
  userFormatError,
  userAlreadyExited,
  userRegisterError,
  userDoesNotExist,
  invalidPassword,
  loginError,
  samePasswordError,
  updatePasswordError,
} = require("../constant/err.type");

const bcrypt = require("bcryptjs");

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
    const res = await getUserInfo({ user_name });
    if (res) {
      console.error("用户名已存在", ctx.request.body);
      ctx.app.emit("error", userAlreadyExited, ctx);
      return;
    }
  } catch (error) {
    console.error("用户注册出现未知错误", error);
    ctx.app.emit("error", userRegisterError, ctx);
  }
  await next();
};

// 验证要修改的密码与之前的密码是否相同
const IsSamePassword = async (ctx,next)=>{
  const { user_name } = ctx.state.user
  const { password } = ctx.request.body
  try {
    const res = await getUserInfo({ user_name })
    if (bcrypt.compareSync(password, res.password)) {
      console.error('密码与之前密码一致，请重新修改')
      ctx.app.emit('error', samePasswordError, ctx)
      return 
    }
  } catch (error) {
    console.error('密码修改失败', error)
    ctx.app.emit('error', updatePasswordError, ctx)
    return 
  }
  await next() 
}

// 密码加密中间件
const cryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body;
  // 加盐
  const salt = bcrypt.genSaltSync(10); //加盐的次数
  const hash = bcrypt.hashSync(password, salt); //hash保存的是密文
  ctx.request.body.password = hash;
  await next();
};

// 验证用户名是否存在,用户账号密码是否匹配
const verifyLogin = async (ctx, next) => {
  const { user_name, password } = ctx.request.body;
  try {
    // 验证账号是否存在
    const res = await getUserInfo({ user_name });
    if (!res) {
      console.error("用户名不存在", { user_name });
      ctx.app.emit("error", userDoesNotExist, ctx);
      return;
    }

    // 验证密码是否正确
    if (!bcrypt.compareSync(password, res.password)) {
      console.error("密码错误", { user_name });
      ctx.app.emit("error", invalidPassword, ctx);
      return;
    }
  } catch (error) {
    console.error(error);
    ctx.app.emit("error", loginError, ctx);
    return;
  }
  await next();
};
module.exports = {
  userNameValidator,
  userValidator,
  cryptPassword,
  verifyLogin,
  IsSamePassword,
};
